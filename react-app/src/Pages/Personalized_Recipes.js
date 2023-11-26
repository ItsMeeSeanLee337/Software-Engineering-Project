import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from './Navbar';
import { Navigate, useNavigate } from 'react-router-dom';
function Personalized_Recipes() {
    const urlParams = new URLSearchParams(window.location.search);
    const dataToSend = urlParams.get('data');
    const [top1Ingredient, setTop1] = useState('');
    const [top2Ingredient, setTop2] = useState('');
    const [top3Ingredient, setTop3] = useState('');
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [saveRecipe, setSaveRecipe] = useState(false);
    const [clickedIndex, setClickedIndex] = useState(null);
    const navigate = useNavigate(); //used to navigate to another page
    const [userType, setUserType] = useState('');
    const apiKEY = '248402bf586449c59ffe2b9624ff978a'
  
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
       // console.log('Response:', response.data);
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
     // console.log('navigating');
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

    let response;

//Debug to see the selected ingredients array
useEffect(() =>{

   //console.log(selectedIngredients);
},[selectedIngredients]);

//When the check box for ingredient 1 is selected, this will run to finish the change
useEffect(() =>{
    if(isChecked1)
    {
        const addIng = top1Ingredient;
        setSelectedIngredients(prev => [...prev, addIng])
        
    }
    else{
        const updatedItems = selectedIngredients.filter(item => item !== top1Ingredient);
        setSelectedIngredients(updatedItems);
    }
    console.log(isChecked1);
},[isChecked1]);

//When the check box for ingredient 1 is selected, this will run to finish the change
useEffect(() =>{
    if(isChecked2)
    {
        const addIng = top2Ingredient;
        setSelectedIngredients(prev => [...prev, addIng])
        
    }
    else{
        const updatedItems = selectedIngredients.filter(item => item !== top2Ingredient);
        setSelectedIngredients(updatedItems);
    }
    console.log(isChecked2);
},[isChecked2]);

//When the check box for ingredient 1 is selected, this will run to finish the change
useEffect(() =>{
    if(isChecked3)
    {
        const addIng = top3Ingredient;
        setSelectedIngredients(prev => [...prev, addIng])
        
    }
    else{
        const updatedItems = selectedIngredients.filter(item => item !== top3Ingredient);
        setSelectedIngredients(updatedItems);
    }
    console.log(isChecked3);
},[isChecked3]);

//Unit tested
//Get the ingredients on page loading
useEffect(() => {
    const fetchTopIngredients = async () => {
      
      try {
        const apiUrl = `http://172.16.122.26:8080/topIngredients/${dataToSend}`;

        response = await axios.get(apiUrl);
        //console.log('Response:', response.data);
        setTop1(response.data[0].ingredient)
        setTop2(response.data[1].ingredient)
        setTop3(response.data[2].ingredient)
       // setRecipes(response.data)
       console.log("Ingredients were fetched");
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTopIngredients();
  }, []); // Empty dependency array ensures this effect runs once on mount

//Unit tested
const fetchTopIngredientsAgain = async () => {
      
    try {
      const apiUrl = `http://172.16.122.26:8080/topIngredients/${dataToSend}`;

      response = await axios.get(apiUrl);
     // console.log('Response:', response.data);
      setTop1(response.data[0].ingredient)
      setTop2(response.data[1].ingredient)
      setTop3(response.data[2].ingredient)
      console.log("Fetched new ingredients")
     // setRecipes(response.data)
    } catch (error) {
      console.error('Error:', error);
    }
  };


//Unit Tested
//On button press, search for the ingredients
let IngResponse;
  const handleIngredientSearch = async () => {
      
    try {
      
      const apiUrl = `http://172.16.122.26:8080/PersonalizedSearch`;
      const ingredients = selectedIngredients;
      if(ingredients.length === 0 || ingredients === undefined || ingredients === false
      || ingredients === "")
      {
        console.log("No ingredients selected")
        return;
      }
      //console.log(ingredients)
      IngResponse = await axios.post(apiUrl, {ingredients});
      //console.log('Response:', IngResponse.data);
      console.log("Got ingredient search")
        setRecipes(IngResponse.data)

        /* setRecipes([
            { "id": "633338", "title": "Bacon Wrapped Filet Mignon" },
            { "id": "644387", "title": "Garlicky Kale" },
            { "id": "660158", "title": "Simple Vinaigrette" },
            { "id": "648729", "title": "Kale With Red Onion" },
            { "id": "651238", "title": "Simple Mashed Yams" }
          ]) */
    } catch (error) {
      console.error('Error:', error);
    }
  };
//Unit tested
  const handleRandomSearch = async () => {
      
    try {
    let randomResponse
      const apiUrl = `http://172.16.122.26:8080/PersonalizedRandomSearch`;
      randomResponse = await axios.post(apiUrl);
      //console.log('Response:', randomResponse.data);
      console.log("Random recipes fetched")
        setRecipes(randomResponse.data)
        /* setRecipes([
            { "id": "633338", "title": "Bacon Wrapped Filet Mignon" },
            { "id": "644387", "title": "Garlicky Kale" },
            { "id": "660158", "title": "Simple Vinaigrette" },
            { "id": "648729", "title": "Kale With Red Onion" },
            { "id": "651238", "title": "Simple Mashed Yams" }
          ]) */
    } catch (error) {
      console.error('Error:', error);
    }
  };

//Unit tested
  const handleSaveRecipe = async(index, id) =>
  {

    var recipe;
      //console.log('ID for recipe', id)
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKEY}`);
  
        if (response.ok) {
          const data = await response.json()
          recipe = data;
          //console.log(recipe)
          const { title } = recipe; 

    const ingredients = recipe.analyzedInstructions[0].steps
  .flatMap((step) => step.ingredients)
  .map((ingredient) => ingredient.name);
    // Use a Set to remove duplicates
  const uniqueIngredients = [...new Set(ingredients)];

   // console.log('Title:', title);

    //console.log('Ingredients:', uniqueIngredients);
    


  const steps = recipe.analyzedInstructions[0].steps;

  const concatenatedSteps = steps.map((step) => step.step).join('\n');

  //console.log(concatenatedSteps);
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
  const saveRecipeFinal = async (title, steps, ingredients, username, index) => {
    const apiUrl = `http://172.16.122.26:8080/createRecipe/${username}`;
    console.log(ingredients);
    try {
      const response = await axios.post(apiUrl, { title, steps, ingredients});
      console.log("Recipe saved")
      setSaveRecipe(true);
      // Hide the pop-up after 3 seconds
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
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", textAlign: "center"}}>
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
        id = "ing1"
          type="checkbox"
          data-testid= "input1"
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
        id = "ing2"
          data-testid= "input2"
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
        id = "ing3"
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
            <button style={{margin: "10px"}}
            onClick={() => handleIngredientSearch()}
            id = "ingredientSearchButton"
            data-testid = "ingredientSearchButton"
            >Ingredient Search</button>
            <button style={{margin: "10px"}}
            onClick={() => fetchTopIngredientsAgain()}
            data-testid = "genereateNewButton"
            >Generate New</button>
            <button style={{margin: "10px"}}
            id="randomButton"
            data-testid = "randomButton"
            onClick={() => handleRandomSearch()}
            >Random Search</button>
            
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignContent: "center", textAlign: "center", justifyItems: "column", flexDirection: 'column', padding: 0,  border: "2px solid #008000",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", maxWidth: "400px", margin: '10px auto'}}>
            {recipes.map((item, index) => (
            <li style={{margin: "10px auto", color: clickedIndex === index ? "green" : "black", cursor: "pointer", listStyle: 'none'}} 
            data-testid="recipeList"
            id = "recipeList"
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