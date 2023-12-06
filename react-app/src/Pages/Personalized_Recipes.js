import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
function Personalized_Recipes() {
  const urlParams = new URLSearchParams(window.location.search); //Used to get the window URL
  const dataToSend = urlParams.get('data'); //Used to get the username from the URL
  const [top1Ingredient, setTop1] = useState(''); //Holds an ingredient
  const [top2Ingredient, setTop2] = useState(''); //Holds an ingredient
  const [top3Ingredient, setTop3] = useState(''); //Holds an ingredient
  const [isChecked1, setIsChecked1] = useState(false); //For ingredient 1 checkbox state
  const [isChecked2, setIsChecked2] = useState(false); //For ingredient 2 checkbox state
  const [isChecked3, setIsChecked3] = useState(false); //For ingredient 3 checkbox state
  const [selectedIngredients, setSelectedIngredients] = useState([]); //Used to hold the selected ingredients
  const [recipes, setRecipes] = useState([]); //Holds the recipes from a search
  const [saveRecipe, setSaveRecipe] = useState(false); //Pop up to indicate recipe was saved
  const [clickedIndex, setClickedIndex] = useState(null); //Used for the highlighting of the boxes
  const navigate = useNavigate(); //used to navigate to another page 
  const [userType, setUserType] = useState(''); //User type to verify page access
  const apiKEY = 'KEY' //API key for the Spoonacular API
  
  //If no one is loggin in, they go to the landing page
  useEffect(() => {
    if (dataToSend === 'null' || dataToSend === null) {
      navigate(`/`);
    }
  }, [])
  
  //Check user type on page loading
  useEffect(() => {
    const checkUser = async () => {
      if(dataToSend !== "null"){
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
  useEffect(()=>{
    if(userType === 1 || userType === -1) //No recipe makers allowed
    {
      navigate(`/`);
    }
  }, [userType])


  //Getting the change for the check boxes
  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
  };
  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };
  const handleCheckboxChange3 = () => {
    setIsChecked3(!isChecked3);
  };

  //Variable for the server endpoint responses
  let response;

  //When the check box for ingredient 1 is selected, this will run to finish the change
  useEffect(() => {
    if (isChecked1) {
      const addIng = top1Ingredient;
      setSelectedIngredients(prev => [...prev, addIng])
    }
    else {
      const updatedItems = selectedIngredients.filter(item => item !== top1Ingredient);
      setSelectedIngredients(updatedItems);
    }
    console.log(isChecked1);
  }, [isChecked1]);

  //When the check box for ingredient 2 is selected, this will run to finish the change
  useEffect(() => {
    if (isChecked2) {
      const addIng = top2Ingredient;
      setSelectedIngredients(prev => [...prev, addIng])
    }
    else {
      const updatedItems = selectedIngredients.filter(item => item !== top2Ingredient);
      setSelectedIngredients(updatedItems);
    }
    console.log(isChecked2);
  }, [isChecked2]);

  //When the check box for ingredient 3 is selected, this will run to finish the change
  useEffect(() => {
    if (isChecked3) {
      const addIng = top3Ingredient;
      setSelectedIngredients(prev => [...prev, addIng])
    }
    else {
      const updatedItems = selectedIngredients.filter(item => item !== top3Ingredient);
      setSelectedIngredients(updatedItems);
    }
    console.log(isChecked3);
  }, [isChecked3]);

  //Unit tested
  //Get the ingredients on page loading
  //Will populate each ingredient useState with an ingredient recieved
  useEffect(() => {
    const fetchTopIngredients = async () => {
      try {
        const apiUrl = `http://172.16.122.26:8080/topIngredients/${dataToSend}`;
        response = await axios.get(apiUrl);
        setTop1(response.data[0].ingredient)
        setTop2(response.data[1].ingredient)
        setTop3(response.data[2].ingredient)
        console.log("Ingredients were fetched");
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchTopIngredients();
  }, []); // Empty dependency array ensures this effect runs once

  //Unit tested
  /*
    Run when a user hits the genereate new button
    Will get new ingredients from their saved recipes
    Will indicate that new recipes were recieved for unit test
  */
  const fetchTopIngredientsAgain = async () => {
    try {
      const apiUrl = `http://172.16.122.26:8080/topIngredients/${dataToSend}`;
      response = await axios.get(apiUrl);
      setTop1(response.data[0].ingredient)
      setTop2(response.data[1].ingredient)
      setTop3(response.data[2].ingredient)
      console.log("Fetched new ingredients")
    } catch (error) {
      console.error('Error:', error);
    }
  };


  //Unit Tested
  //On button press, search for the ingredients
  //Will check that the ingredients are valid for a search not being empty
  //The response back from the server will give 5 recipes
  //Will update the recipes useState with those recipes
  let IngResponse; //response for this endpoint
  const handleIngredientSearch = async () => {
    try {
      const apiUrl = `http://172.16.122.26:8080/PersonalizedSearch`;
      const ingredients = selectedIngredients;
      if (ingredients.length === 0 || ingredients === undefined || ingredients === false
        || ingredients === "") {
        console.log("No ingredients selected")
        return;
      }
      IngResponse = await axios.post(apiUrl, { ingredients });
      console.log("Got ingredient search")
      setRecipes(IngResponse.data)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  //Unit tested
  /*
    Run when the Random Search button is clicked
    Will contact our server endpoint for random recipes
    that the API supplies it with
    Updates the recipes useState with those recipes (only 3 recipes)
  */
  const handleRandomSearch = async () => {
    try {
      let randomResponse
      const apiUrl = `http://172.16.122.26:8080/PersonalizedRandomSearch`;
      randomResponse = await axios.post(apiUrl);
      console.log("Random recipes fetched")
      setRecipes(randomResponse.data)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //Unit tested
  /*
    Handles saving the recipe from the list that is generated
    Needs to query the api for the information of the recipe the user clicked
    as that data is not stored initially
    Will get the title, steps, and ingredients
    Needs to turn the ingredients into an array so it works with 
    create recipe endpoint
  */
  const handleSaveRecipe = async (index, id) => {
    var recipe;
    try {
      //Get the recipe information based on its id from the api
      const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKEY}`);
      if (response.ok) {
        //Turn the recipe into json data
        const data = await response.json()
        recipe = data;
        const { title } = recipe; // Get the title
        //Turn the ingredients in the JSON to an array using map
        const ingredients = recipe.analyzedInstructions[0].steps
          .flatMap((step) => step.ingredients)
          .map((ingredient) => ingredient.name);
        //Use a Set to remove duplicates
        const uniqueIngredients = [...new Set(ingredients)];
        const steps = recipe.analyzedInstructions[0].steps;
        //Put the steps together as a string since they are recieved as different objects
        const concatenatedSteps = steps.map((step) => step.step).join('\n');
        // Call saveRecipe and pass the necessary values
        await saveRecipeFinal(title, concatenatedSteps, uniqueIngredients, dataToSend, index);
      } else {
        // Handle API request error
        console.error('API request error');
      }
    } catch (error) {
      console.error('API request error:', error);
    }
  }

  //Unit tested
  /*
    After the recipe from the api is set up and the data is extracted
    We then use the createRecipe endpoint to save it to the user's profile
  */
  const saveRecipeFinal = async (title, steps, ingredients, username, index) => {
    const apiUrl = `http://172.16.122.26:8080/createRecipe/${username}`;
    console.log(ingredients);
    try {
      const response = await axios.post(apiUrl, { title, steps, ingredients });
      console.log("Recipe saved")
      setSaveRecipe(true);
      // Hide the pop-up
      setTimeout(() => {
        setSaveRecipe(false);
      }, 1000);
      setClickedIndex(index);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <>
      <Navbar></Navbar>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", textAlign: "center" }}>
        <h1>Personalized Recipes</h1>
        <div>
          <h2>Ingredients From Saved Recipes</h2>
          <div style={{ display: "flex", justifyContent: "center", alignContent: "center", textAlign: "center" }}>
            <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
              <li
                id='listItem1'
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 10px",
                  padding: "5px",
                  border: `2px solid ${isChecked1 ? '#008000' : '#ff0000'}`,
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
                onMouseOver={() => {
                  document.querySelector("#listItem1").style.border = "2px solid #ff0000";
                }}
                onMouseOut={() => {
                  document.querySelector("#listItem1").style.border = `2px solid ${isChecked1 ? '#008000' : '#ff0000'}`;
                }}
              >
                <input
                  id="ing1"
                  type="checkbox"
                  data-testid="input1"
                  style={{ marginRight: "5px" }}
                  checked={isChecked1}
                  onChange={handleCheckboxChange1}
                />
                {top1Ingredient}
              </li>
              <li
                id='listItem2'
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 10px",
                  padding: "5px",
                  border: `2px solid ${isChecked2 ? '#008000' : '#ff0000'}`,
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
                onMouseOver={() => {
                  document.querySelector("#listItem2").style.border = "2px solid #ff0000";
                }}
                onMouseOut={() => {
                  document.querySelector("#listItem2").style.border = `2px solid ${isChecked2 ? '#008000' : '#ff0000'}`;
                }}
              >
                <input
                  id="ing2"
                  data-testid="input2"
                  type="checkbox"
                  style={{ marginRight: "5px" }}
                  checked={isChecked2}
                  onChange={handleCheckboxChange2}
                />
                {top2Ingredient}
              </li>
              <li
                id='listItem3'
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 10px",
                  padding: "5px",
                  border: `2px solid ${isChecked3 ? '#008000' : '#ff0000'}`,
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
                onMouseOver={() => {
                  document.querySelector("#listItem3").style.border = "2px solid #ff0000";
                }}
                onMouseOut={() => {
                  document.querySelector("#listItem3").style.border = `2px solid ${isChecked3 ? '#008000' : '#ff0000'}`;
                }}
              >
                <input
                  id="ing3"
                  type="checkbox"
                  style={{ marginRight: "5px" }}
                  checked={isChecked3}
                  onChange={handleCheckboxChange3}
                />
                {top3Ingredient}
              </li>
            </ul>
          </div>
          <div id='recipeButtons' style={{ display: "flex", justifyContent: "center", alignContent: "center", textAlign: "center", justifyItems: "row", padding: 0 }}>
            <button style={{ margin: "10px" }}
              onClick={() => handleIngredientSearch()}
              id="ingredientSearchButton"
              data-testid="ingredientSearchButton"
            >Ingredient Search</button>
            <button style={{ margin: "10px" }}
              onClick={() => fetchTopIngredientsAgain()}
              data-testid="genereateNewButton"
            >Generate New</button>
            <button style={{ margin: "10px" }}
              id="randomButton"
              data-testid="randomButton"
              onClick={() => handleRandomSearch()}
            >Random Search</button>

          </div>
          <div style={{
            display: "flex", justifyContent: "center", alignContent: "center", textAlign: "center", justifyItems: "column", flexDirection: 'column', padding: 0, border: "2px solid #008000",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", maxWidth: "400px", margin: '10px auto'
          }}>
            {recipes.map((item, index) => (
              <li style={{ margin: "10px auto", color: clickedIndex === index ? "green" : "black", cursor: "pointer", listStyle: 'none' }}
                data-testid="recipeList"
                id="recipeList"
                key={item.id}
                onClick={() => handleSaveRecipe(index, item.id)}

              >
                {item.title}</li>
            ))}
          </div>
          {saveRecipe &&
            <div>Recipe Saved</div>}
        </div>
      </div>
    </>
  )
}

export default Personalized_Recipes