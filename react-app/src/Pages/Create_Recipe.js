import React, { useEffect } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import { useState } from 'react';
import '../styles/create_recipe.css'
import '../Modules/IngredientListForm'
import {useNavigate } from 'react-router-dom';
import IngredientList from '../Modules/IngredientListForm';
function Create_Recipe() {
  const [title, setNewTitle] = useState(""); //Used for the title field
  const [steps, setNewStep] = useState(""); //Used for the steps field
  const [ingredients, setNewIngredient] = useState(""); //Used for the ingredients field (also used in an array form)
  const [showPopup, setShowPopup] = useState(false); //Used to show the pop up after a recipe is added
  const urlParams = new URLSearchParams(window.location.search); //Used to search the url for the username
  const dataToSend = urlParams.get('data'); // Gets the username from the URL
  const navigate = useNavigate(); //used to navigate to another page
  const maxLineLength = 30; // Set max line length for formatting the box
  const [userType, setUserType] = useState(''); //Used on first page load to make sure the user is valid
  var response; //Used in various places to get a response

/*
    Runs on first page load
    Will made sure that the URL does include a username that was passed from a prior page
    Will redirect user to the landing page if they are not valid
*/
  useEffect(() => {
    //Make sure the username (which is the data to send) is not either vairation of NULL 
    if (dataToSend === 'null' || dataToSend == null) {
      navigate(`/`);
    }
  })

/*
    Runs on first page load
    Uses a server endpoint to make sure they are a valid user in the database
    Will redirect user to the landing page if they are not valid
*/
  useEffect(() => {
    const checkUser = async () => {
      if (dataToSend !== "null" || dataToSend !== null) {
        try {  
          const apiUrl = `http://172.16.122.26:8080/checkMaker/${dataToSend}`; //Query the api to check for this user
          response = await axios.get(apiUrl);
          setUserType(response.data[0].isMaker); //set the useState to whether they are a maker or not if they are valid
        } catch (error) {
          //This means an invalid user tried to access the system
          setUserType(-1);
        }
      };
    }
    checkUser();
  }, []); // Empty dependency array ensures this effect runs once on page load



  /*
      Runs on first page load
      When the user type is checked, will redirect makers to the landing page
      Will redirect user to the landing page if they are not valid
  */
  useEffect(() => {
    if (userType === -1) {
      navigate(`/`);
    }
  }, [userType])


  //Built in useState function so the text doesn't get reset
  function handleTitle(e) {
    e.preventDefault()
  }

  //Built in useState function so the text doesn't get reset
  function handleSteps(e) {
    e.preventDefault()
  }

  /*
    Uses a prop recieved from the IngredientListForm componenet when a user
    updates the ingredient list on the form
  */
  const updateIngredients = (updatedIngredients) => {
    setNewIngredient(updatedIngredients);
  };

  /*
    Handles the submitting of the recipes to the server endpoint
    It will show a pop up only upon a successful entry into the server
  */
  const handleSubmit = (event) => {
    event.preventDefault();
    //Make sure the fields aren't empty or invalid
    if (title === '' || title === null || steps === '' || steps === null || ingredients === '' || ingredients === null) {
      console.log('Field is empty');
    } else {
      const apiUrl = `http://172.16.122.26:8080/createRecipe/${dataToSend}`;

      //Send the post request to the server
      axios.post(apiUrl, { title, steps, ingredients })
        .then(() => {
          console.log("Recipe successfully inserted")
          //Upon successful insertion, show the pop on the page for 3 seconds
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 3000);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

  };

  /*
   Function to split the steps into lines
   Without this function, the text would go on forever
   Need to make the max only 30 characters before it goes to the next line
  */
  const splitStepsIntoLines = (steps, maxLength) => {
    const lines = []; //Make a new array to hold the text split into lines
    let currentLine = ''; //Base line for the text

    //Methodology: go through the entire text that is already present
    //If the user types a new line character, reflect that in the array we are building
    //If the user has typed a line that is over 30 characters, put that line into the array
    //and make a new line
    for (let i = 0; i < steps.length; i++) {
      if (steps[i] === '\n') {
        lines.push(currentLine);
        currentLine = '';
      } else {
        currentLine += steps[i];
        if (currentLine.length >= maxLength || i === steps.length - 1) {
          lines.push(currentLine);
          currentLine = '';
        }
      }
    }
    return lines;
  };

  //Custom length for the title
  const maxTitleLineLen = 28

  //Variable to hold the text the user is typing into the steps field
  //Uses the function to split it into lines instead of one large string
  const stepLines = splitStepsIntoLines(steps, maxLineLength);

  //Variable to hold the text the user is typing into the title field
  //Uses the function to split it into lines instead of one large string
  //Uses a slightly shorter length that came from testing
  const titleLines = splitStepsIntoLines(title, maxTitleLineLen);

  return (
    <>
      <Navbar />
      <div className="flex-container">
        <div className="center-container">
          <h1 className="header">Create a Custom Recipe</h1>
          <form className="form center" onSubmit={handleTitle}>
            <label htmlFor="Title" className="headerCompliment">
              Enter Recipe Title
            </label>
            <input
              data-testid="titleField"
              value={title}
              onChange={(e) => setNewTitle(e.target.value)}
              type="text"
              id="title"
              maxlength="60"
            />
          </form>
          <form className="form center" onSubmit={handleSteps}>
            <label htmlFor="Steps" className="headerCompliment">
              Enter Recipe Steps
            </label>
            <textarea
              value={steps}
              data-testid="stepsField"
              onChange={(e) => setNewStep(e.target.value)}
              id="steps"
              rows={"8"}
              cols={"30"}
              maxLength={"255"}
            />
          </form>
          <h5 className="alignCenter">
            The steps are your own convention
            <br />
            Be as thorough or verbose as needed
            <br />
            You can label the steps, write a paragraph,
            <br />
            however you want to format the steps.
            <br />
            <br />
            When writing the ingredients please list
            <br />
            The amount for each ingredient as well. Ex:
            <br />
            1 egg
            <br />
            1 lb spaghetti
            <br />
            3.5 oz pancetta
            <br />
            2 Tbsps olive oil
            <br />
            0.5 cup parmesan cheese
          </h5>
          <IngredientList updateIngredients={updateIngredients} />
          <button data-testid="addRecipeButton" id="addRecipeButton" className="buttonMargin" onClick={handleSubmit}>Create Recipe</button>
          <button id='create_recipe_button' className="buttonMargin" onClick={handleSubmit}>Create Recipe</button>
          {showPopup && (
            <div className="popup">
              <p id="recipeAdded">Recipe added!</p>
            </div>
          )}
        </div>
        <div className="displayRecipe">
          <div>
            <h3 className='alignCenter' >Title</h3>
            <ul className='alignCenter'>
              {titleLines.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
            <h3 className='alignCenter'>Steps</h3>
            <ul>
              {stepLines.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
            <h3 className='alignCenter'>Ingredients</h3>
            {ingredients && ingredients.map((ingredient, index) => (
              <div className='alignCenter iLMargin' key={index}>{ingredient}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Create_Recipe;