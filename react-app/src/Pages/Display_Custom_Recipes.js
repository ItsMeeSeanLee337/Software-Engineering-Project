import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './Navbar'
import axios from 'axios';
import '../styles/displayCustomRecipe.css'
import RecipeNotes from '../Modules/RecipeNotes';
import { useNavigate } from 'react-router-dom';


function Display_Custom_Recipes() {
  const [notesVisible, setNotesVisible] = useState(false); //Use state for notes pop up
  const [fillNotes, setfillNotes] = useState(""); //Text for the notes box
  const [crid, setcrid] = useState(''); //Used for any interation with a recipe so set the crid
  const [, setShowTextArea] = useState(false); // Used to show the tag text box
  const [tagText, settagText] = useState(''); // The text within the tag box
  const [recipeTagVisibility, setRecipeTagVisibility] = useState({}); //Hides the tag's box visibility 
  const navigate = useNavigate(); //used to navigate to another page
  const urlParams = new URLSearchParams(window.location.search); //Get the url from the page
  const dataToSend = urlParams.get('data'); //Get the username from the url parameters
  const [userType, setUserType] = useState(''); //Sets the user type upon the page loading
  const [recipes, setRecipes] = useState([]); //Holds the recipes that display on screen upon page load
  const username = dataToSend; //setting username
  var passID = ''; //Used to pass the crid to the notes component
  var response; //Gets the response from the different endpoints when needed
  /*
    When the recipe crid changes upon clicking the notes button
    This will get the corresponding notes from the database
    It reacts to any change to the crid variable
  */
  useEffect(() => {
    getNotes(crid);
  }, [crid]);

  /*
    Runs on first page load
    Will made sure that the URL does include a username that was passed from a prior page
    Will redirect user to the landing page if they are not valid
  */
  useEffect(() => {
    if (dataToSend === 'null' || dataToSend === null) {
      navigate(`/`);
    }
  }, [])

  /*
      Runs on first page load
      Uses a server endpoint to make sure they are a valid user in the database
      Will redirect user to the landing page if they are not valid
  */
  useEffect(() => {
    const checkUser = async () => {
      if (dataToSend !== "null" || dataToSend !== null) {
        try {
          const apiUrl = `http://172.16.122.26:8080/checkMaker/${dataToSend}`;
          response = await axios.get(apiUrl);
          setUserType(response.data[0].isMaker);
        } catch (error) {
          //This means an invalid user tried to access the system
          setUserType(-1); //set to -1 to denotes a bad user
        }
      };
    }
    checkUser();
  }, []); // Empty dependency array ensures this effect runs once

  /*
    Runs on first page load
    When the user type is checked, will redirect makers to the landing page
    Will redirect user to the landing page if they are not valid (Makers are valid here)
  */
  useEffect(() => {
    console.log("This is user param:", dataToSend)
    if (userType === -1) {
      //console.log('navigating');
      navigate(`/`);
    }
  }, [userType])

  /*
    Runs upon page loading
    Will get the recipes the user has saved to their library
    Will populate the recipes useState and use them to display on screen
  */
  useEffect(() => {
    //Unit tested
    const fetchData = async () => {
      try {  
        const apiUrl = `http://172.16.122.26:8080/CustomRecipe/Display/${dataToSend}`;
        response = await axios.get(apiUrl);
        console.log("Got recipes successfully")
        setRecipes(response.data)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []); 

  
  //Not unit tested
  //Endpoint unit testing covers this testing
  //Run when the delete button is hit; sets up the variable necessary to delete the recipe
  //Passes them to the delete recipe function
  const handleDelete = async (recipeID) => {
    const { crID } = recipeID; //Get the crid from the recipe that was passed
    await deleteRecipe(crID, dataToSend);
  }

  /*
    Changes the visibility of the notes on press
    Also passes the crid to the useState so the correct notes are shown
  */
  const showNotes = (id) => {
    passID = id;
    setcrid(passID);
  }

  //Unit tested
  /*
    When the crid is changed upon hitting the notes button, this function is run
    It will query the endpoint for the specific recipe's notes
    and fill the notes on screen with the text it recieved
  */
  const getNotes = async (id) => {
    try {
      const apiUrl = `http://172.16.122.26:8080/getRecipeNotes/${id}`;
      var response = await axios.get(apiUrl, id);
      setfillNotes(response.data[0].notes);
      console.log("Got notes");
      setNotesVisible(!notesVisible);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Not united tested since endpoint testing covers this
  /*
    Deletes the recipe from the data base given the crid of the recipe
    Will reload the page to reflect this change
  */
  const deleteRecipe = async (crID, username) => {
    const apiUrl = 'http://172.16.122.26:8080/deleteCustomRecipe';
    try {
      const response = await axios.post(apiUrl, { crID, username });
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  /*
    Used for the recipe tag
    Will both show and save the text in the tag upon clicking the
    save tag button
  */
  const handleSaveText = (id) => {
    setShowTextArea(false);
    setRecipeTagVisibility((prevVisibility) => ({
      ...prevVisibility,
      [id]: !prevVisibility[id],
    }));

    //insert into db for that crid
    try {
      const apiUrl = `http://172.16.122.26:8080/setTaggedRecipes/${id}`;
      axios.post(apiUrl, { username, tagText })
        .then(response_tag => {
          if (response_tag.status === 200) {
            console.log("Tag added!")
          }
        })
        .catch(error => {
          console.error('Tag Error:', error);
        });
    } catch {
      console.error('Tag Error:');
    }

  };


  //View all tagged recipies link
  const handleViewTags = async (event) => {
    event.preventDefault();
    window.location.href = `/TaggedRecipes?data=${dataToSend}`;

  }

  //handler for when add tag is clicked
  const handleTag = (id) => {
    //show text box
    setShowTextArea(true);
    //set the text box visible for only that specific recipe
    setRecipeTagVisibility((prevVisibility) => ({
      ...prevVisibility,
      [id]: !prevVisibility[id],
    }));
  };

  const handleNutritionalInfo = (recipe) => {
    // Navigate to the nutritional information page and pass the recipe details
    navigate(`/Custom_Recipe_Nutritioninfo?crID=${recipe.crID}&title=${recipe.Title}&description=${recipe.Description}&list=${JSON.stringify(recipe.list)}&data=${dataToSend}`);
  };
  
  /*
    Will pass a recipe into the meal planner upon clicking the button
    Will tell the user if it has been successfully added or not
  */
  const handleMealPlanner = (id) => {
    try {
      const apiUrl = `http://172.16.122.26:8080/setMealPlannerRecipes/${id}`;
      axios.post(apiUrl, { username })
        .then(response_tag => {
          if (response_tag.status === 200) {
            console.log("Added recipie to meal planner!")
            alert("Successfully added meal");
          }
        })
        .catch(error => {
          console.log("Meal already in planner!");
          alert("Meal already in planner!");
        });

    } catch (error) {
      console.error('MealPlan DB Error:', error);
    }
  };


  return (
    <>
      <Navbar></Navbar>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <button id='view_tags' className='centerButtonCR' type="button" onClick={handleViewTags}>View Tagged Recipes</button>
      </div>
      <div className='flex-container-CR'>
        <h3>Your Saved Custom Recipes</h3>
        <div>
          {recipes.map(recipe => (
            <div className='recipeItem' id='map' key={recipe.crID}>
              <h4 id='title' className='recipeTitle'>Title</h4>
              <p id="recipeTitle" className='recipeTitle'>{recipe.Title}</p>
              <h4 className='recipeTitle'>Steps</h4>
              <textarea
                rows={6}
                className='recipeSteps textareaSteps'
                maxLength={100}
              >
                {recipe.Description}</textarea>
              <h4 className='recipeTitle'>Ingredients</h4>
              <ul className='recipeIngredients'>
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

                <div>
                  <button
                    data-testid="tagButton"
                    id='tag'
                    className='centerButtonCR'
                    onClick={() => handleTag(recipe.crID)}
                  >Add Tag</button>

                  <button
                    data-testid="mealPlanButton"
                    id='meal_planner'
                    className='centerButtonCR'
                    onClick={() => handleMealPlanner(recipe.crID)}
                  >Add to Meal Planner</button>

                  {recipeTagVisibility[recipe.crID] && (
                    <div>
                      <textarea
                        data-testid="tagTextField"
                        id='tagText'
                        value={tagText}
                        onChange={(event) => settagText(event.target.value)}
                        rows="2"
                        cols="40"
                      ></textarea>
                      <button
                        data-testid="saveTagField"
                        id='saveTag'
                        onClick={() => handleSaveText(recipe.crID)}>Save</button>
                    </div>
                  )}
                </div>

                {notesVisible && <RecipeNotes
                  visible={notesVisible}
                  className='showNotesPopUp'
                  setVisible={setNotesVisible}
                  crID={crid}
                  fillNotes={fillNotes}
                  setfillNotes={setfillNotes}
                  setcrid={setcrid}
                ></RecipeNotes>}
                <button className='centerButtonCR'
                  onClick={() => handleDelete(recipe)}
                >Delete
                </button>
                <button className='centerButtonCR'
                  id='notes'
                  data-testid='showNotesButton'
                  onClick={() => showNotes(recipe.crID)}
                >Notes
                </button>

              </ul>
              <button className='centerButtonCR'
                onClick={() => handleNutritionalInfo(recipe)}
              >Nutritional Info
              </button>
            </div>
          ))}</div>
      </div>
    </>
  )
}

export default Display_Custom_Recipes