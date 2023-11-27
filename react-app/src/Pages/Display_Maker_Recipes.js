import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './Navbar'
import axios from 'axios';
import '../styles/displayCustomRecipe.css'
import { useHistory } from 'react-router-dom';
import RecipeNotes from '../Modules/RecipeNotes';
import { Navigate, useNavigate } from 'react-router-dom';
function Display_Maker_Recipes() {
const [recipes, setRecipes] = useState([]);
const [title, setNewTitle] = useState("")
const [steps, setNewStep] = useState("")
const [username, setNewUsername] = useState("");
const [recipeIngredients, setRecipeIngredients] = useState([]);
const [userType, setUserType] = useState('');
const [notesVisible, setNotesVisible] = useState(false);
const [fillNotes, setfillNotes] = useState("");
const [crid, setcrid] = useState('');
const navigate = useNavigate(); //used to navigate to another page
const urlParams = new URLSearchParams(window.location.search);
const dataToSend = urlParams.get('data');
const [showPopup, setShowPopup] = useState(false);
var passID = '';
//If no one is loggin in, they go to the landing page
useEffect(()=>{
  //console.log("This is user param:",dataToSend)
  if(dataToSend === 'null' || dataToSend === null)
  {
    //console.log('navigating');
    navigate(`/`);
  }
},[])

//Check user type on page loading
useEffect(() => {
  const checkUser = async () => {
    if(dataToSend !== "null"){
    try {
      //const apiUrl = 'http://localhost:8080/createRecipe';  
      
      const apiUrl = `http://172.16.122.26:8080/checkMaker/${dataToSend}`;

      response = await axios.get(apiUrl);
      //console.log('Response:', response.data);
      setUserType(response.data[0].isMaker);
    } catch (error) {
      //This means an invalid user tried to access the system
      setUserType(-1);
      //console.error('Error:', error);
    }
  };
  }
  checkUser();
}, []); // Empty dependency array ensures this effect runs once on mount


//When the user type is checked, will redirect makers to the landing page
useEffect(()=>{
  //console.log("This is user param:",dataToSend)
  if(userType === 1 || userType === -1)
  {
    //console.log('navigating');
    navigate(`/`);
  }
}, [userType])




var response;
useEffect(() => {
    const fetchData = async () => {
      
      try {
        //const apiUrl = 'http://localhost:8080/createRecipe';  
        const apiUrl = `http://172.16.122.26:8080/MakerRecipes/Display`;

        response = await axios.get(apiUrl);
        //console.log('Response:', response.data);
        console.log("Got recipes successfully")
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
    if(Title !== "" || Title !== undefined)
    {
      console.log("Title is filled")
    }
    if(Description !== "" || Description !== undefined)
    {
      console.log("Description is filled")
    }
    if(ri !== "" || ri !== undefined)
    {
      console.log("Ingredients are filled")
    }
    /* console.log("Recipe ing in maker: " ,ri);
    console.log('Title:', Title);
    console.log('Description:', Description); */
  
    // Call deleteRecipe and pass the necessary values
    await saveRecipe(Title, Description, ri, dataToSend);
  }



useEffect(() => {
  // This code inside the useEffect will run after setfillNotes is updated.
  // You can perform actions that depend on the updated state here.
  //console.log('fillNotes has been updated:', fillNotes);
}, [fillNotes]);


//Unit tested
//Copy this recipe and put it into the user's own custom recipes
const saveRecipe = async (title, steps, ingredients, username) => {
  const apiUrl = `http://172.16.122.26:8080/createRecipe/${username}`;
  console.log(ingredients);
  try {
    const response = await axios.post(apiUrl, { title, steps, ingredients});
    console.log("Recipe Saved To Library")
    setShowPopup(true);

    // Hide the pop-up after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
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
            <h4 id="title" className='recipeTitle'>Title</h4>
            <p id = "makerTitle" className='recipeTitle'>{recipe.Title}</p>
            <h4 id = "steps" className='recipeTitle'>Steps</h4>
            <textarea
            id = "makerSteps"
            rows={6}
             className='recipeSteps textareaSteps'
             maxLength={100}
             >
              {recipe.Description}</textarea>
            <h4 id = "ing" className='recipeTitle'>Ingredients</h4>
            <ul className= 'recipeIngredients'>
              {Array.isArray(recipe.list) ? (
                // For the first type of ingredient structure
                recipe.list.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))
              ) : (
                // For the second type of ingredient structure
                recipe.list.ingredients.map((ingredient, index) => (
                  <li id = "makerIng" key={index}>{ingredient}</li>
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
                    data-testid='saveRecipeButton'
                  >Save
                  </button>
                  {showPopup && (
                  <div className="popup">
                    <p>Recipe Saved!</p>
                  </div>
                )}
                </ul>
            
            
            
          </div>
        ))}</div>
        
    
    
    </div>
      
    </>
  )
}

export default Display_Maker_Recipes