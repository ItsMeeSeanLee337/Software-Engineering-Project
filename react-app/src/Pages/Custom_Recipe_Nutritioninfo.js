import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function Custom_Recipe_Nutritioninfo() {
  const apiKey = '00298f1246234721b20874aa5f8c7c0f';
  const urlParams = new URLSearchParams(window.location.search);
  const recipecrID = decodeURIComponent(urlParams.get('crID'));
  const recipeTitle = decodeURIComponent(urlParams.get('title'));
  const recipeDescription = decodeURIComponent(urlParams.get('description'));
  const recipeList = JSON.parse(decodeURIComponent(urlParams.get('list')));
  const [recipe, setRecipe] = useState(
    {
      "title": recipeTitle,
      "ingredients": recipeList,
      "instructions": recipeDescription
    }
  );
  const testRecipe = { // For the recipe it must be in this specific format, need to figure out how to get all custom recipes to adhere to this format
    "title": "Spaghetti Carbonara",
    "ingredients": [
        "1 lb spaghetti",
        "3.5 oz pancetta",
        "2 Tbsps olive oil",
        "1  egg",
        "0.5 cup parmesan cheese"
    ],
    "instructions": "Bring a large pot of water to a boil and season generously with salt. Add the pasta to the water once boiling and cook until al dente. Reserve 2 cups of cooking water and drain the pasta. "
  }; 
  const [calories, setCalories] = useState(null);
  const [fat, setFat] = useState(null);
  const [protein, setProtein] = useState(null);
  const [carbs, setCarbs] = useState(null);
  
  const testToSeeRecipe = async () => {
    console.log("recipecrID", recipecrID)
    console.log("recipeTitle", recipeTitle)
    console.log("recipeDescription", recipeDescription)
    console.log("recipeList", recipeList)
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
          console.log('Response:', data);
          console.log("post request was a success")
          // Handle the response data here
          const calorieData = data.nutrition.nutrients.find((nutrient) => nutrient.name === 'Calories').amount;
          const fatData = data.nutrition.nutrients.find((nutrient) => nutrient.name === 'Fat').amount;
          const proteinData = data.nutrition.nutrients.find((nutrient) => nutrient.name === 'Protein').amount;
          const carbData = data.nutrition.nutrients.find((nutrient) => nutrient.name === 'Carbohydrates').amount;
          setCalories(calorieData);
          setFat(fatData);
          setProtein(proteinData);
          setCarbs(carbData);
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
      <button onClick={() => testToSeeRecipe(recipe.crID)}>testbutton</button>
      <h4 className='recipeTitle'>Title</h4>
      <p className='recipeTitle'>{recipeTitle}</p>
      <h4 className='recipeDescription'>Description</h4>
      <p className='recipeDescription'>{recipeDescription}</p>
      <h4 className='recipeIngredients'>Ingredients</h4>
      <ul>
        {recipeList.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h4 className='recipeIngredients'>Nutrition Information</h4>
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
        <p>something went wrong</p>
      )}
    </div>
  );
}

export default Custom_Recipe_Nutritioninfo;
