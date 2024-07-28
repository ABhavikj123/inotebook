const connect =require('./db.cjs');
const express=require('express');
var cors=require('cors');
require('dotenv').config();

port=process.env.PORT
const app=express()
app.use(cors())
connect();
app.use(express.json())
app.use('/api/auth',require('./routes/auth.cjs'))
app.use('/api/notes',require('./routes/notes.cjs'))
app.listen(port)