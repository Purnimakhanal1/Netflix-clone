import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logos from '../../assets/logos.png'

import {Search,Bell,User,ChevronDown} from "lucide-react";
import { logout } from '../../firebase';
const Navbar = () => {

  const navRef=useRef();
  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      if(window.scrollY >= 80){
        navRef.current.classList.add('nav-dark')
      }else{
        navRef.current.classList.remove('nav-dark')
      }
    })
  },[])
  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logos} alt=""></img>
        <ul>
         <li>Home</li>
         <li>Tv shows</li>
         <li>Movies</li>
         <li>New & Popular</li>
         <li>My List</li>
         <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <Search className='navbaricons'/>
        <p>Children</p>
        <Bell className='navbaricons'/>
        <div className="navbar-profile">
           <User className='navbaricons'/>
          <ChevronDown className='navbaricons'/>
          <div className="dropdown"> 
            <p onClick={()=>{logout()}}>Sign Out</p>
          </div>
        </div>  
        

      </div>
    </div>
  )
}

export default Navbar