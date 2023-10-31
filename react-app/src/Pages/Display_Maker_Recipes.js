import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './Navbar'
import axios from 'axios';
import '../styles/displayCustomRecipe.css'
import { useHistory } from 'react-router-dom';
import RecipeNotes from '../Modules/RecipeNotes';
function Display_Custom_Recipes() {
const [recipes, setRecipes] = useState([]);
const [title, setNewTitle] = useState("")
const [steps, setNewStep] = useState("")
const [username, setNewUsername] = useState("");
const [recipeIngredients, setRecipeIngredients] = useState([]);
const [notesVisible, setNotesVisible] = useState(false);
const [fillNotes, setfillNotes] = useState("");
const [crid, setcrid] = useState('');
var urlParams 
var dataToSend = null
var passID = '';
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
  


useEffect(() => {
    console.log("useeffect crid", crid)
    getNotes(crid);
}, [crid]);


var response;
useEffect(() => {
    const fetchData = async () => {
      
      try {
        //const apiUrl = 'http://localhost:8080/createRecipe';  
        const apiUrl = `http://172.16.122.26:8080/MakerRecipes/Display`;

        response = await axios.get(apiUrl);
        console.log('Response:', response.data);
        setRecipes(response.data)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once on mount

  

  
  const handleSave = async (recipeID) =>  {
    const { Title, Description } = recipeID; // Assuming these are the correct properties
    var ri = recipeID.list.ingredients;
    console.log("Recipe ing in maker: " ,ri);
    console.log('Title:', Title);
    console.log('Description:', Description);
  
    // Call deleteRecipe and pass the necessary values
    await saveRecipe(Title, Description, ri, dataToSend);
  }


const showNotes = (id) =>{
  console.log("This is id", id);
    passID = id;
    setcrid(passID);
    //getNotes(id);
}

const getNotes = async (id) =>{

  try {
    //const apiUrl = 'http://localhost:8080/createRecipe';  
    const apiUrl = `http://172.16.122.26:8080/getRecipeNotes/${id}`;
    console.log(id)
    var response = await axios.get(apiUrl, id);
    console.log('Response:', response.data);
    var newNotes = response.data[0].notes;
    setfillNotes(response.data[0].notes);
    console.log(fillNotes);
    console.log("This is new notes" ,newNotes);
    setNotesVisible(!notesVisible);
  } catch (error) {
    console.error('Error:', error); 
  }

}

useEffect(() => {
  // This code inside the useEffect will run after setfillNotes is updated.
  // You can perform actions that depend on the updated state here.
  //console.log('fillNotes has been updated:', fillNotes);
}, [fillNotes]);



//Copy this recipe and put it into the user's own custom recipes
const saveRecipe = async (title, steps, ingredients, username) => {
  const apiUrl = `http://172.16.122.26:8080/createRecipe/${username}`;
  console.log(ingredients);
  try {
    const response = await axios.post(apiUrl, { title, steps, ingredients});
    
  } catch (error) {
    console.error('Error:', error);
  }
}




  return (
    <>
    <Navbar></Navbar>
    <div className='flex-container-CR'>
        <h3>Recipes from Recipe Makers</h3>
        <div>
            {recipes.map(recipe => (
          <div className = 'recipeItem' id='map' key={recipe.crID}>
            <h4 className='recipeTitle'>Title</h4>
            <p className='recipeTitle'>{recipe.Title}</p>
            <h4 className='recipeTitle'>Steps</h4>
            <p className='recipeSteps'>{recipe.Description}</p>
            <h4 className='recipeTitle'>Ingredients</h4>
            <ul className= 'recipeIngredients'>
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
              {notesVisible && <RecipeNotes 
              visible = {notesVisible} 
              className= 'showNotesPopUp'
              setVisible = {setNotesVisible}
              crID = {crid}
              fillNotes = {fillNotes}
              setfillNotes={setfillNotes}
              setcrid={setcrid}
              ></RecipeNotes>}
                  <button className='centerButtonCR'
                    onClick={() => handleSave(recipe)}
                  >Save
                  </button>
                  <button className='centerButtonCR'
                    onClick={() => showNotes(recipe.crID)}
                  >Notes
                  </button>
                </ul>
            
            
            
          </div>
        ))}</div>
        
    
    
    </div>
      
    </>
  )
}

export default Display_Custom_Recipes