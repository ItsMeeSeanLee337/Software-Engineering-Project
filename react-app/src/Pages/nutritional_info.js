import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
function NutritionalInformation() {
  const [foodItem, setFoodItem] = useState('');
  const [ingredientID, setingredientID] = useState(null);
  const [calories, setCalories] = useState(null);
  const [fat, setFat] = useState(null);
  const [protein, setProtein] = useState(null);
  const [carbs, setCarbs] = useState(null);
  const navigate = useNavigate(); //used to navigate to another page
  const [userType, setUserType] = useState('');
  const urlParams = new URLSearchParams(window.location.search);
  const dataToSend = urlParams.get('data');
  var response;
  // Replace 'YOUR_API_KEY' with your actual Spoonacular API key
  const apiKey = '00298f1246234721b20874aa5f8c7c0f';
  
  /*useEffect(()=>{
    console.log("This is user param:",dataToSend)
    if(dataToSend === 'null' || dataToSend === null)
    {
      console.log('navigating');
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
        console.log('Response:', response.data);
        setUserType(response.data[0].isMaker);
      } catch (error) {
        //This means an invalid user tried to access the system
        setUserType(-1);
        console.error('Error:', error);
      }
    };
    }
    checkUser();
  }, []); // Empty dependency array ensures this effect runs once on mount
  
  
  //When the user type is checked, will redirect makers to the landing page
  useEffect(()=>{
    console.log("This is user param:",dataToSend)
    if(userType === 1 || userType === -1)
    {
      console.log('navigating');
      navigate(`/`);
    }
  }, [userType])*/

  const fetchIngredientID = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/food/ingredients/search?query=${foodItem}&apiKey=${apiKey}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.results.length > 0) {
          // Extract the ID of the first result
          const firstResult = data.results[0];
          const id = firstResult.id;

          // Now you have the ID of the top result
          console.log('ID of the top result:', id);

          // Update the state with the ID
          setingredientID(id);

          // Call the function to fetch nutritional information
          fetchNutritionalInformation(id);
        } else {
          setingredientID(null); // Food item not found
        }
      } else {
        // Handle API request error
        console.error('API request error');
      }
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  const fetchNutritionalInformation = async (ingredientId) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/food/ingredients/${ingredientID}/information?amount=1&apiKey=${apiKey}`
      );
      if (response.ok) {
        const data = await response.json();
        //const parsedData = JSON.parse(data);
        
        // Extract specific nutrient values
        const calorieData = data.nutrition.nutrients.find((nutrient) => nutrient.name === 'Calories').amount;
        const fatData = data.nutrition.nutrients.find((nutrient) => nutrient.name === 'Fat').amount;
        const proteinData = data.nutrition.nutrients.find((nutrient) => nutrient.name === 'Protein').amount;
        const carbData = data.nutrition.nutrients.find((nutrient) => nutrient.name === 'Carbohydrates').amount;

        setCalories(calorieData);
        setFat(fatData);
        setProtein(proteinData);
        setCarbs(carbData);
        console.log(calories)
        console.log(fat)
        console.log(protein)
        console.log(carbs)
      } else {
        // Handle the case where the food item is not found
        setCalories(null);
        setFat(null);
        setProtein(null);
        setCarbs(null);  
      }
    } catch (error) {
      // Handle any API request errors here
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <input
          type="text"
          placeholder="Search for a food item"
          value={foodItem}
          onChange={(e) => setFoodItem(e.target.value)}
        />
        <button onClick={fetchIngredientID}>Search ID</button>
      </div>
      <button onClick={fetchNutritionalInformation}>Analyze ID</button>
      {ingredientID ? (
        <p>ID of the top result: {ingredientID}</p>
      ) : (
        <p>No ID found for {foodItem}</p>
      )}
      {calories ? (
        <div>
          <div>
          <h2>Nutritional Information for {foodItem}:</h2>
          <p>Calories: {calories} kcal</p>
          <p>Protein: {protein} g</p>
          <p>Carbohydrates: {carbs} g</p>
          <p>Fat: {fat} g</p>
        </div>
        </div>
      ) : (
        <p>something went wrong for {foodItem}</p>
      )}
    </div>
    
  );
}

export default NutritionalInformation;