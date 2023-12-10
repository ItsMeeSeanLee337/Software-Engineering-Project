import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './Navbar'
import axios from 'axios';
import '../styles/displayCustomRecipe.css'
import { useHistory } from 'react-router-dom';
import RecipeNotes from '../Modules/RecipeNotes';
import { Navigate, useNavigate } from 'react-router-dom';


function Display_Custom_Recipes() {

const [title, setNewTitle] = useState("")
const [steps, setNewStep] = useState("")
//const [username, setNewUsername] = useState("");
const [notesVisible, setNotesVisible] = useState(false);
const [fillNotes, setfillNotes] = useState("");
const [crid, setcrid] = useState('');
//for the tags 
const [showTextArea, setShowTextArea] = useState(false);
const [tagText, settagText] = useState('');
const [recipeTagVisibility, setRecipeTagVisibility] = useState({});

//for the MealPlanner

const navigate = useNavigate(); //used to navigate to another page

const urlParams = new URLSearchParams(window.location.search);
const dataToSend = urlParams.get('data');
const [userType, setUserType] = useState('');

const testRecipe1 = { // For the recipe it must be in this specific format, need to figure out how to get all custom recipes to adhere to this format
  "crID": 1,
  "Title": "Spaghetti Carbonara",
  "Description": "Bring a large pot of water to a boil and season generously with salt. Add the pasta to the water once boiling and cook until al dente. Reserve 2 cups of cooking water and drain the pasta. ",
  "list": {
    "ingredients": [
      "1 lb spaghetti",
      "3.5 oz pancetta",
      "2 Tbsps olive oil",
      "1 egg",
      "0.5 cup parmesan cheese"
    ]
  }
}; 

const testRecipe2 = { // For the recipe it must be in this specific format, need to figure out how to get all custom recipes to adhere to this format
  "crID": 2,
  "Title": "Grilled Cheese",
  "Description": "Make the grilled cheese sandwich",
  "list": {
    "ingredients":
    [
      "2 pc white bread",
      "3 slices cheddar cheese",
      "2 Tbsps olive oil",
      "1 egg",
      "2 Tbsps mayo sauce"
    ]
  }
}; 

const testRecipe3 = { // For the recipe it must be in this specific format, need to figure out how to get all custom recipes to adhere to this format
  "crID": 3,
  "Title": "Chicken Fried Rice",
  "Description": "Make the chicken fried rice ",
  "list": {
    ingredients:
    [
      "1 cup white rice",
      "1 lb chicken breast",
      "2 Tbsps olive oil",
      "1  egg",
      "2 Tbsps soy sauce"
    ]
  }
};
const [recipes, setRecipes] = useState([]);

//setting username
const username = dataToSend;


var passID = '';

useEffect(() => {
    console.log("useeffect crid", crid)
    getNotes(crid);
}, [crid]);

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
    if(dataToSend !== "null" || dataToSend !== null){
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
  console.log("This is user param:",dataToSend)
  if(userType === -1)

  {
    //console.log('navigating');
    navigate(`/`);
  }
}, [userType])

useEffect(() => {
    //console.log("useeffect crid", crid)
    getNotes(crid);
}, [crid]);


var response;
useEffect(() => {
  //Unit tested
    const fetchData = async () => {
      
      try {
        //const apiUrl = 'http://localhost:8080/createRecipe';  
        const apiUrl = `http://172.16.122.26:8080/CustomRecipe/Display/${dataToSend}`;

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

  
  //Not unit tested
  //Endpoint unit testing covers this testing
  const handleDelete = async (recipeID) =>  {
    const { Title, Description, crID } = recipeID; // Assuming these are the correct properties
    //console.log('Title:', Title);
    //console.log('Description:', Description);
    //console.log("CRID:", crID);
    // Call deleteRecipe and pass the necessary values
    await deleteRecipe(crID, dataToSend);
  }


const showNotes = (id) =>{
  //console.log("This is id", id);
    passID = id;
    setcrid(passID);

    //getNotes(id);
}

//Unit tested
const getNotes = async (id) =>{

  try {
    //const apiUrl = 'http://localhost:8080/createRecipe';  
    const apiUrl = `http://172.16.122.26:8080/getRecipeNotes/${id}`;
    //console.log(id)
    var response = await axios.get(apiUrl, id);
    ///console.log('Response:', response.data);
    var newNotes = response.data[0].notes;
    setfillNotes(response.data[0].notes);
    console.log("Got notes");
    //console.log("This is new notes" ,newNotes);
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

// Note united tested since endpoint testing covers this
const deleteRecipe = async (crID, username) => {
  const apiUrl = 'http://172.16.122.26:8080/deleteCustomRecipe';
  //console.log("CRID:", crID);
  try {
    const response = await axios.post(apiUrl, {crID, username });
    
    //console.log('Response:', response);
    window.location.reload();
    
  } catch (error) {
    console.error('Error:', error);
  }
}


const handleSaveText= (id) => {
  //console.log("ID handle save text:", id);
  //console.log('Text to save:', tagText);
  setShowTextArea(false); 
  setRecipeTagVisibility((prevVisibility) => ({
    ...prevVisibility,
    [id]: !prevVisibility[id],
  }));

  //insert into db for that crid
try{
  const apiUrl = `http://172.16.122.26:8080/setTaggedRecipes/${id}`;
    axios.post(apiUrl, {username, tagText})
      .then(response_tag => {
        if (response_tag.status === 200) {
          //console.log('Response:', response_tag.data);
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


//view all tagged recipies
const handleViewTags = async (event) => {
  event.preventDefault();
  //console.log("And the username: ", dataToSend);
  window.location.href = `/TaggedRecipes?data=${dataToSend}`;

}

//handler for when add tag is clicked
const handleTag = (id) => {
  //show text box
  setShowTextArea(true);
  //console.log("ID:", id);
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
  
const handleMealPlanner = (id) => {
  //console.log("ID:", id);
  //console.log("Inside handleMealPlanner");
  //console.log("This is the username: ", dataToSend);
  try{
    const apiUrl = `http://172.16.122.26:8080/setMealPlannerRecipes/${id}`;
      axios.post(apiUrl, {username})
        .then(response_tag => {
          if (response_tag.status === 200) {
            //console.log('Response:', response_tag.data);
            console.log("Added recipie to meal planner!")
            alert("Successfully added meal");
          } 
        })
        .catch(error => {
          console.log("Meal already in planner!");
          //console.error('Already in DB:', error);
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
        <button id = 'view_tags' className='centerButtonCR' type="button" onClick={handleViewTags}>View Tagged Recipes</button>
    </div>
    <div className='flex-container-CR'>
        <h3>Your Saved Custom Recipes</h3>
        <div>
            {recipes.map(recipe => (
          <div className = 'recipeItem' id='map' key={recipe.crID}>
            <h4 id = 'title' className='recipeTitle'>Title</h4>
            <p  id = "recipeTitle" className='recipeTitle'>{recipe.Title}</p>
            <h4 className='recipeTitle'>Steps</h4>
            <textarea
            rows={6}
             className='recipeSteps textareaSteps'
             maxLength={100}
             >
              {recipe.Description}</textarea>
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

              <div>
               <button 
                data-testid="tagButton"
                id = 'tag'
                className = 'centerButtonCR'
                onClick={() => handleTag(recipe.crID)}
                >Add Tag</button>

                <button
                data-testid="mealPlanButton" 
                id = 'meal_planner'
                className = 'centerButtonCR'
                onClick={() => handleMealPlanner(recipe.crID)}
                >Add to Meal Planner</button>

                {recipeTagVisibility[recipe.crID] && (
                <div>
                  <textarea
                    data-testid="tagTextField"
                    id = 'tagText'
                    value={tagText}
                    onChange={(event) => settagText(event.target.value)}
                    rows="2"
                    cols="40"
                  ></textarea>
                  <button 
                  data-testid="saveTagField"
                  id = 'saveTag'
                  onClick={() => handleSaveText(recipe.crID)}>Save</button>
                </div>
                )}
              </div>

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
                    onClick={() => handleDelete(recipe)}
                  >Delete
                  </button>
                  <button className='centerButtonCR'
                    id = 'notes'
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