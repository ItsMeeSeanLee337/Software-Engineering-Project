import React from 'react'
import {Link} from 'react-router-dom';
import '../styles/navbar.css'

function Navbar(){
return(
    
    <div className='navbar'>
        <div className='navbar-logo'>
             Nutripro
        </div>
    <ul className='navbar-nav'>
      <li><Link to="/Home">Home</Link></li>
      <li><Link to="/Login">Login</Link></li>
      <li><Link to="/Create_Recipe">Create Recipe</Link></li>
    </ul>
    
    
  </div>
  


)

}
export default Navbar