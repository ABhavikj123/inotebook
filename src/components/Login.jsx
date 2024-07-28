import React, { useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const {showalert}=props
    const [auth,setauth]=useState({email:"",password:""})
    let history1=useNavigate();
    const handlesubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch(`http://localhost:3000/api/auth/login`,{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({email:auth.email,password:auth.password})
          });
          const json= await response.json();
          if(json.success){
            localStorage.setItem('token',json.jwtData);
            history1('/');
            showalert('logged in successfully','success')
          }else{
            showalert('Invalid information','danger')
          }
    }
    const change=(e)=>{
        setauth({...auth,[e.target.name]:e.target.value})
    }
    return (
        <div className='container mt-3'>
            <h2>Login</h2>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={auth.email} onChange={change} name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={auth.password} onChange={change} name='password' />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
