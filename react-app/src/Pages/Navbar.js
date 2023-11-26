import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import '../styles/navbar.css'
import NavDropDown from '../Modules/NavDropDown';
function Navbar(){
  const [dropVisible, setDropVisible] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const dataToSend = urlParams.get('data');
  const handleMouseEnter = () =>{
    setDropVisible(true);
  
  }
  
  const handleMouseLeave = () =>{
    setDropVisible(false);
  
  }
  


return(
    
    <div className='navbar'>
        <div className='navbar-logo'>
             Nutripro
        </div>
    <ul className='navbar-nav'>
      
      <li><Link to="/Login">Login</Link></li>
      <li><Link id='homeLink' to={`/HomePage?data=${dataToSend}`} className= "noDecoration" >HomePage</Link></li>
      <li><Link id = "goToBio" to={`/Bio?data=${dataToSend}`} className= "noDecoration" >Bio</Link></li>
      <li><Link id = "goToNutritionInfo" to={`/NutritionalInformation?data=${dataToSend}`} className= "noDecoration" >Nutritional Info</Link></li>
      <li><Link id='goToRecipeSearch' to={`/RecipeSearch?data=${dataToSend}`} className= "noDecoration" >Search Recipes</Link></li>
      <li><Link id= "goToMakerRecipes" to={`/display-maker-recipes?data=${dataToSend}`} className= "noDecoration" >Maker Recipes</Link></li>
      <li><Link id='goToPersonalizedRecipes' to={`/Personalized_Recipes?data=${dataToSend}`} className= "noDecoration" >Personalized Search</Link></li>
      <li
        onMouseEnter = {handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <Link to={`/Create_Recipe?data=${dataToSend}`} id = 'goToCreateRecipe' className= "noDecoration" >Create Recipe</Link>
        {dropVisible && <NavDropDown></NavDropDown>}
        </li>
    </ul>

    
    
  </div>
  


)

}
export default Navbar