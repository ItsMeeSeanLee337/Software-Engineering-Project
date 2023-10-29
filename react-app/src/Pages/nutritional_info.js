import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

function NutritionalInformation() {
  const [foodItem, setFoodItem] = useState('');
  const [nutritionalInfo, setNutritionalInfo] = useState({
    calories: null,
    fats: null,
    protein: null,
    carbohydrates: null,
  });

  const handleSearch = async (e) => {
    e.preventDefault();

    // Replace 'YOUR_SPOONACULAR_API_KEY' with your actual API key
    const apiKey = '248402bf586449c59ffe2b9624ff978a';

    try {
      const response = await axios.get(
        `https://api.spoonacular.com/food/ingredients/search?query=${foodItem}&apiKey=${apiKey}`
      );

      if (response.data.results && response.data.results.length > 0) {
        // Assuming the first result contains the desired information
        const firstResult = response.data.results[0];

        // Extract nutritional information from firstResult
        const { nutrition } = firstResult;
        if (nutrition) {
          const { nutrients } = nutrition;
          const calories = nutrients.find((nutrient) => nutrient.name === 'Calories');
          const fats = nutrients.find((nutrient) => nutrient.name === 'Fat');
          const protein = nutrients.find((nutrient) => nutrient.name === 'Protein');
          const carbohydrates = nutrients.find((nutrient) => nutrient.name === 'Carbohydrates');

          setNutritionalInfo({
            calories: calories ? calories.amount : null,
            fats: fats ? fats.amount : null,
            protein: protein ? protein.amount : null,
            carbohydrates: carbohydrates ? carbohydrates.amount : null,
          });
        } else {
          // Handle the case where there is no nutritional information
          setNutritionalInfo({
            calories: null,
            fats: null,
            protein: null,
            carbohydrates: null,
          });
        }
      } else {
        // Handle no results found
        setNutritionalInfo({
          calories: null,
          fats: null,
          protein: null,
          carbohydrates: null,
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter a food item"
          value={foodItem}
          onChange={(e) => setFoodItem(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {nutritionalInfo ? (
        <div>
          <h2>Nutritional Information for {nutritionalInfo.name}</h2>
          <ul>
            <li>Calories: {nutritionalInfo.calories}</li>
            <li>Fats: {nutritionalInfo.fats}</li>
            <li>Protein: {nutritionalInfo.protein}</li>
            <li>Carbohydrates: {nutritionalInfo.carbohydrates}</li>
          </ul>
        </div>
      ) : (
        <p>No nutritional information found for the entered food item.</p>
      )}
    </div>
  );
}

export default NutritionalInformation;
