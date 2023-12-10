import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './Navbar'
import axios from 'axios';
import '../styles/displayCustomRecipe.css'
import RecipeNotes from '../Modules/RecipeNotes';
import { useNavigate } from 'react-router-dom';
function Display_Maker_Recipes() {
  const [recipes, setRecipes] = useState([]); // Used to hold the recipes that are displayed
  const [userType, setUserType] = useState(''); //Used to verify the user type for page access
  const navigate = useNavigate(); //used to navigate to another page
  const urlParams = new URLSearchParams(window.location.search); //Gets the url of the page
  const dataToSend = urlParams.get('data'); //Gets the username passed to this page
  const [showPopup, setShowPopup] = useState(false); //Handles the saved recipe pop up

  //If no one is loggin in, they go to the landing page
  useEffect(() => {
    if (dataToSend === 'null' || dataToSend === null) {
      navigate(`/`);
    }
  }, [])

  //Check user type on page loading
  useEffect(() => {
    const checkUser = async () => {
      if (dataToSend !== "null") {
        try {
          const apiUrl = `http://172.16.122.26:8080/checkMaker/${dataToSend}`;
          response = await axios.get(apiUrl);
          setUserType(response.data[0].isMaker);
        } catch (error) {
          //This means an invalid user tried to access the system
          setUserType(-1);
        }
      };
    }
    checkUser();
  }, []); // Empty dependency array ensures this effect runs once


  //When the user type is checked, will redirect makers to the landing page
  useEffect(() => {
    if (userType === 1 || userType === -1) {
      navigate(`/`);
    }
  }, [userType])




  var response;
  /*
    Runs upon the page loading
    Will get the recipes that recipe makers have made from the database
    Will populate the recipes useState so they can be displayed
  */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `http://172.16.122.26:8080/MakerRecipes/Display`;
        response = await axios.get(apiUrl);
        console.log("Got recipes successfully")
        setRecipes(response.data)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once

  

  /*
    Runs when a user clicks the save button
    Will do all of the error checking for the recipe fields
    Will pass the three fields to the function that handles the server endpoint
  */
  const handleSave = async (recipeID) => {
    const { Title, Description } = recipeID; 
    var ri = recipeID.list.ingredients;
    if (Title !== "" || Title !== undefined) {
      console.log("Title is filled")
    }
    if (Description !== "" || Description !== undefined) {
      console.log("Description is filled")
    }
    if (ri !== "" || ri !== undefined) {
      console.log("Ingredients are filled")
    }
    //Wait for the function save recipe to finish
    await saveRecipe(Title, Description, ri, dataToSend);
  }

  //Unit tested
  //Copy this recipe and put it into the user's own custom recipes
  //Utilizes the same endpoint as create recipe since it is in the same format
  const saveRecipe = async (title, steps, ingredients, username) => {
    const apiUrl = `http://172.16.122.26:8080/createRecipe/${username}`;
    console.log(ingredients);
    try {
      const response = await axios.post(apiUrl, { title, steps, ingredients });
      console.log("Recipe Saved To Library")
      setShowPopup(true);
      // Handles the pop up showing upon successful insertion
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
            <div className='recipeItem' id='map' key={recipe.crID}>
              <h4 id="title" className='recipeTitle'>Title</h4>
              <p id="makerTitle" className='recipeTitle'>{recipe.Title}</p>
              <h4 id="steps" className='recipeTitle'>Steps</h4>
              <textarea
                id="makerSteps"
                rows={6}
                className='recipeSteps textareaSteps'
                maxLength={100}
              >
                {recipe.Description}</textarea>
              <h4 id="ing" className='recipeTitle'>Ingredients</h4>
              <ul className='recipeIngredients'>
                {Array.isArray(recipe.list) ? (
                  // For the first type of ingredient structure
                  recipe.list.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))
                ) : (
                  // For the second type of ingredient structure
                  recipe.list.ingredients.map((ingredient, index) => (
                    <li id="makerIng" key={index}>{ingredient}</li>
                  ))
                )}
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