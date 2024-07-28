import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"


const Signup = (props) => {
  const port=import.meta.env.PORT
  const [auth,setauth]=useState({name:"",email:"",password:"",cpassword:""})
    let history1=useNavigate();
    const handlesubmit=async(e)=>{
        e.preventDefault();
        const {name,email,password}=auth;
        const response=await fetch(`http://localhost:${port}/api/auth/createUser`,{
          
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({name,email,password})
          });
          const json= await response.json()
          if(json.success){
            localStorage.setItem('token',json.jwtData);
            history1('/');
            props.showalert('account created successfully','success')
          }else{
            props.showalert('Invalid information','danger')
          }
    }
    const change=(e)=>{
        setauth({...auth,[e.target.name]:e.target.value})
    }
  return (
    <div className='container'>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp"onChange={change}  />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={change}  />
          
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={change} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={change} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
