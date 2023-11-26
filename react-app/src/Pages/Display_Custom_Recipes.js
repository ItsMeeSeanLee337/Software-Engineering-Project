import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './Navbar'
import axios from 'axios';
import '../styles/displayCustomRecipe.css'
import { useHistory } from 'react-router-dom';
import RecipeNotes from '../Modules/RecipeNotes';
import { Navigate, useNavigate } from 'react-router-dom';


function Display_Custom_Recipes() {

const [recipes, setRecipes] = useState([]);
const [title, setNewTitle] = useState("")
const [steps, setNewStep] = useState("")
const [username, setNewUsername] = useState("");
const [notesVisible, setNotesVisible] = useState(false);
const [fillNotes, setfillNotes] = useState("");
const [crid, setcrid] = useState('');
//for the tags 
const [showTextArea, setShowTextArea] = useState(false);
const [tagText, settagText] = useState('');
const [recipeTagVisibility, setRecipeTagVisibility] = useState({});

const navigate = useNavigate(); //used to navigate to another page

const urlParams = new URLSearchParams(window.location.search);
const dataToSend = urlParams.get('data');
const [userType, setUserType] = useState('');


var passID = '';

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
  //console.log("This is user param:",dataToSend)
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
    console.log('Title:', Title);
    console.log('Description:', Description);
    console.log("CRID:", crID);
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
  console.log("CRID:", crID);
  try {
    const response = await axios.post(apiUrl, {crID, username });
    
    console.log('Response:', response);
    window.location.reload();
    
  } catch (error) {
    console.error('Error:', error);
  }
}







const handleSaveText= (id) => {
  // You can save the text to a server or perform any other desired action here
  console.log("ID handle save text:", id);
  console.log('Text to save:', tagText);
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
          console.log('Response:', response_tag.data);

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
  console.log("And the username: ", dataToSend);
  window.location.href = `/TaggedRecipes?data=${dataToSend}`;

}


//handler for when add tag is clicked
const handleTag = (id) => {
  //show text box
  setShowTextArea(true);
  console.log("ID:", id);
  //set the text box visible for only that specific recipe
  setRecipeTagVisibility((prevVisibility) => ({
    ...prevVisibility,
    [id]: !prevVisibility[id],
  }));

};




  return (
    <>
    <Navbar></Navbar>
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <button id = "goToTaggedRecipes" className='centerButtonCR' type="button" onClick={handleViewTags}>View Tagged Recipes</button>
    </div>
    <div className='flex-container-CR'>
        <h3>Your Saved Custom Recipes</h3>
        <div>
            {recipes.map(recipe => (
          <div className = 'recipeItem' id='map' key={recipe.crID}>
            <h4 className='recipeTitle'>Title</h4>
            <p id = "recipeTitle" className='recipeTitle'>{recipe.Title}</p>
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
               <button className = 'centerButtonCR'
                id="addTagButton"
                onClick={() => handleTag(recipe.crID)}
                >Add Tag</button>
                {recipeTagVisibility[recipe.crID] && (
                <div>
                  <textarea
                  id = "tagTextArea"
                    value={tagText}
                    onChange={(event) => settagText(event.target.value)}
                    rows="2"
                    cols="40"
                  ></textarea>
                  <button id = "saveTagButton" onClick={() => handleSaveText(recipe.crID)}>Save</button>
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
                    data-testid='showNotesButton'
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