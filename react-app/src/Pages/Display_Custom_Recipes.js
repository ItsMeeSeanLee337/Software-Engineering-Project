import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './Navbar'
import axios from 'axios';
import '../styles/displayCustomRecipe.css'
import { useHistory } from 'react-router-dom';
function Display_Custom_Recipes() {
const [recipes, setRecipes] = useState([]);
const [title, setNewTitle] = useState("")
const [steps, setNewStep] = useState("")
const [username, setNewUsername] = useState("");
var urlParams 
var dataToSend = null
try{
    urlParams = new URLSearchParams(window.location.search);
    dataToSend = urlParams.get('data');
    console.log(dataToSend);
    if (dataToSend === null){
      console.log('Redirecting to:', window.location.href);
      window.location.href = '/Login';
    }
}catch{
    window.location.href = '/Login';
}
  


var response;
useEffect(() => {
    const fetchData = async () => {
    
      try {
        //const apiUrl = 'http://localhost:8080/createRecipe';  
        const apiUrl = `http://172.16.122.26:8080/CustomRecipe/Display/${dataToSend}`;

        response = await axios.get(apiUrl);
        console.log('Response:', response.data);
        setRecipes(response.data)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once on mount

  
  
  const handleDelete = async (recipeID) =>  {
    const { Title, Description } = recipeID; // Assuming these are the correct properties
    console.log('Title:', Title);
    console.log('Description:', Description);
  
    // Call deleteRecipe and pass the necessary values
    await deleteRecipe(Title, Description, dataToSend);
  }

const deleteRecipe = async (title, steps, username) => {
  const apiUrl = 'http://172.16.122.26:8080/deleteCustomRecipe';

  try {
    const response = await axios.post(apiUrl, { title, steps, username });
    
    console.log('Response:', response);
    window.location.reload();
    
  } catch (error) {
    console.error('Error:', error);
  }
}

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
            <p>Steps: {recipe.Description}</p>
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
            <button className='centerButtonCR'
            onClick={() => handleDelete (recipe)}
            >Delete
            </button>
            <hr />
            
          </div>
        ))}</div>
        
    
    
    </div>

    </>
  )
}

export default Display_Custom_Recipes