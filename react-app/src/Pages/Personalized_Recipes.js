import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from './Navbar';
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

    console.log(selectedIngredients);
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

//Get the ingredients on page loading
useEffect(() => {
    const fetchTopIngredients = async () => {
      
      try {
        const apiUrl = `http://172.16.122.26:8080/topIngredients/${dataToSend}`;

        response = await axios.get(apiUrl);
        console.log('Response:', response.data);
        setTop1(response.data[0].ingredient)
        setTop2(response.data[1].ingredient)
        setTop3(response.data[2].ingredient)
       // setRecipes(response.data)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTopIngredients();
  }, []); // Empty dependency array ensures this effect runs once on mount

//On button press, search for the ingredients
let IngResponse;
  const handleIngredientSearch = async () => {
      
    try {
    
      const apiUrl = `http://172.16.122.26:8080/PersonalizedSearch`;
      const ingredients = selectedIngredients;
      console.log(ingredients)
      //IngResponse = await axios.post(apiUrl, {ingredients});
      //console.log('Response:', IngResponse.data);
        //setRecipes(IngResponse.data)

        setRecipes([
            { "id": "633338", "title": "Bacon Wrapped Filet Mignon" },
            { "id": "644387", "title": "Garlicky Kale" },
            { "id": "660158", "title": "Simple Vinaigrette" },
            { "id": "648729", "title": "Kale With Red Onion" },
            { "id": "651238", "title": "Simple Mashed Yams" }
          ])
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleSaveRecipe = async(index) =>
  {
    setSaveRecipe(true);
    // Hide the pop-up after 3 seconds
    setTimeout(() => {
      setSaveRecipe(false);
    }, 1000);
    setClickedIndex(index);
  }

  return (
    <>
    <Navbar></Navbar>
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", textAlign: "center"}}>
    <h1>Personalized Recipes</h1>
    <div>
        <h2>Your Top 3 Ingredients</h2>
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
          type="checkbox"
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
            >Ingredient Search</button>
            <button style={{margin: "10px"}}>Random Search</button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignContent: "center", textAlign: "center", justifyItems: "column", flexDirection: 'column', padding: 0 }}>
            {recipes.map((item, index) => (
            <li style={{margin: "10px", color: clickedIndex === index ? "green" : "black", cursor: "pointer"}} 
            key={item.id}
            onClick={() => handleSaveRecipe(index)}
            
            >
                {item.title}</li>
            ))}
            {saveRecipe && 
            <div>Recipe Saved</div>}
        </div>
    </div>
    </div>
    </>
  )
}

export default Personalized_Recipes