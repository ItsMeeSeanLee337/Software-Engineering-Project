import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function Custom_Recipe_Nutritioninfo() {
  const navigate = useNavigate(); //used to navigate to another page
  const urlParams = new URLSearchParams(window.location.search);
  const dataToSend = urlParams.get('data');
  const [userType, setUserType] = useState('');
  var response;


  const apiKey = 'KEY';
  const recipecrID = decodeURIComponent(urlParams.get('crID'));
  const recipeTitle = decodeURIComponent(urlParams.get('title'));
  const recipeDescription = decodeURIComponent(urlParams.get('description'));
  const recipeList = JSON.parse(decodeURIComponent(urlParams.get('list')));
  console.log("recipeList", recipeList)
  
  const [calories, setCalories] = useState(null);
  const [fat, setFat] = useState(null);
  const [protein, setProtein] = useState(null);
  const [carbs, setCarbs] = useState(null);
  const [recipe, setRecipe] = useState(
    {
      "title": recipeTitle,
      "ingredients": recipeList.ingredients,
      "instructions": recipeDescription
    }
  );

  useEffect(()=>{
      console.log("This is user param:",dataToSend)
      if(dataToSend === 'null' || dataToSend == null)
      {
        console.log('navigating');
        navigate(`/`);
      }
  })

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
    if(userType === -1)
    {
      console.log('navigating');
      navigate(`/`);
    }
  }, [userType])
  
  const analyzeRecipe = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/analyze?includeNutrition=true&apiKey=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(recipe)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          return response.json();
        })
        .then(data => {
          const calorieData = data.nutrition.nutrients.find((nutrient) => nutrient.name === 'Calories').amount;
          const fatData = data.nutrition.nutrients.find((nutrient) => nutrient.name === 'Fat').amount;
          const proteinData = data.nutrition.nutrients.find((nutrient) => nutrient.name === 'Protein').amount;
          const carbData = data.nutrition.nutrients.find((nutrient) => nutrient.name === 'Carbohydrates').amount;
          setCalories(calorieData);
          setProtein(proteinData);
          setFat(fatData);
          setCarbs(carbData);
          try{
            const apiUrl = `http://172.16.122.26:8080/setCustomRecipeNutrition/${recipecrID}`;
              axios.post(apiUrl, {calorieData, proteinData, fatData, carbData})
                .then(response_tag => {
                  if (response_tag.status === 200) {
                    console.log('Response:', response_tag.data);
          
                  } 
                })
                .catch(error => {
                  console.error('Nutrition Error:', error);
                });
          
              } catch {
                console.error('Nutrition Error:');
          }
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    } catch (error) {
        console.error('API request error:', error);
    }
  }

  return (
    <div>
      <Navbar></Navbar>
      <h4 className='recipeTitle'>Title</h4>
      <p className='recipeTitle'>{recipeTitle}</p>
      <h4 className='recipeDescription'>Description</h4>
      <p className='recipeDescription'>{recipeDescription}</p>
      <h4 className='recipeIngredients'>Ingredients</h4>
      <ul>
        {recipeList.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h4 className='recipeIngredients'>Nutrition Information</h4>
      <button onClick={() => analyzeRecipe()}>Get Nutrition Info</button>
      {calories ? (
        <div>
          <div>
          <p>Calories: {calories} kcal</p>
          <p>Protein: {protein} g</p>
          <p>Carbohydrates: {carbs} g</p>
          <p>Fat: {fat} g</p>
        </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default Custom_Recipe_Nutritioninfo;
