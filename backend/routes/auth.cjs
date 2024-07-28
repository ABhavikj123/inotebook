const express = require('express');
const router = express.Router();
const User = require('../models/User.cjs');
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser.cjs');
const JWT_SECRET = "BGHRTHGHRHFJTJERHRTYJ";

router.post('/createUser', [
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Enter valid password').isLength({ min: 5 })
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "sorry user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10)
        const secpass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const jwtData = jwt.sign(data, JWT_SECRET);
        success = true
        // (user=>res.json(user)).catch(err=>{console.log(err)
        // res.json({error:"Please enter a unique value for email"})})
        res.json({ success, jwtData })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error")
    }
})
router.post('/login', [
    body('email', 'Enter valid email').isEmail(),
    body('password', 'password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "please try to login with correct credentials" });
        }
        const passwordcomp = await bcrypt.compare(password, user.password);
        if (!passwordcomp) {

            return res.status(400).json({ success, error: "please try to login with correct credentials" });
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        const jwtData = jwt.sign(payload, JWT_SECRET);
        success = true
        res.json({ success, jwtData })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error")
    }
})
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error")
    }
})
module.exports = router