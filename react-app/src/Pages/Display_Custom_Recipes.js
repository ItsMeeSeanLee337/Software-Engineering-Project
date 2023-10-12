import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './Navbar'
import axios from 'axios';
import '../styles/displayCustomRecipe.css'
function Display_Custom_Recipes() {
const [recipes, setRecipes] = useState([]);
var response;
useEffect(() => {
    const fetchData = async () => {
    
      try {
        //const apiUrl = 'http://localhost:8080/createRecipe';  // Replace with your server endpoint
        const apiUrl = 'http://172.16.122.26:8080/CustomRecipe/Display/1';  // Replace with your server endpoint

        response = await axios.get(apiUrl);
        console.log('Response:', response.data);
        setRecipes(response.data)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once on mount


console.log("This is response:")
console.log(response)
console.log()


  return (
    <>
    <Navbar></Navbar>
    <div className='flex-container-CR'>
        <h3>Your Saved Custom Recipes</h3>
        <div>
            {recipes.map(recipe => (
          <div key={recipe.crID}>
            <p>Title: {recipe.Title}</p>
            <p>Description: {recipe.Description}</p>
            <p>Ingredients:</p>
            <ul>
              {Array.isArray(recipe.list) ? (
                // For the first type of ingredient structure
                recipe.list.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))
              ) : (
                // For the second type of ingredient structure
                recipe.list.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))
              )}
            </ul>
            <hr />
          </div>
        ))}</div>
        
    
    
    </div>

    </>
  )
}

export default Display_Custom_Recipes