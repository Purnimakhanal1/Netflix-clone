import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import logos from '../../assets/logos.png' 
import { login_pg,signup } from '../../firebase'
import {  toast } from 'react-toastify';
const Login = () => {
  const navigate = useNavigate() // Add this
  const [signState, setSignState] = useState("Sign In")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const user_auth = async (event) => {
    event.preventDefault()
    try {
      if (signState === "Sign In") {
        console.log("Attempting to sign in with:", email, password);
        const user = await login_pg(email, password)
        if (user) {
          console.log("User signed in:", user);
          toast.success('Logged in successfully!')
          navigate('/home')
        } else {
          console.log("No user returned from login_pg");
          toast.error('Login failed. Please try again.');
        }
      } else {
        await signup(name, email, password)
        toast.success('Signed up successfully! Please log in.')
        setSignState("Sign In")
      }
    } catch (error) {
      console.error("Authentication error:", error)
      toast.error(error.message || 'An error occurred during authentication')
    }
  }
  
  return (
    <div className='login'>
      <img src={logos} className="login-logo" alt=""></img>
      <div className="login-form">
        <h1>{signState}</h1>
        <form >
          {signState==="Sign Up"?<input  value={name} onChange={(e)=>{setName(e.target.value)}}
           type="text" placeholder='Your name'/>:<></>}
          
          <input  value={email} onChange={(e)=>{setEmail(e.target.value)}} 
          type="email" placeholder='Email'/>
          <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} 
          placeholder='Password'/>
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox"/>
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState==="Sign In"?
            <p>New to Cinemythic? <span onClick={()=>{setSignState("Sign Up")}}>Sign Up Now</span></p>
            :<p>Already Have an account? <span onClick={()=>{setSignState("Sign In")}}>Sign In Now</span></p>
        }
          
          
        </div>
      </div>
      
    </div>
  )
}

export default Login
