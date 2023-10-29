import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function NutritionalInformation() {
  const [foodItem, setFoodItem] = useState('');
  const [ingredientID, setingredientID] = useState(null);
  const [calories, setCalories] = useState(null);
  

  const fetchIngredientID = async () => {
    // Replace 'YOUR_API_KEY' with your actual Spoonacular API key
    const apiKey = '00298f1246234721b20874aa5f8c7c0f';

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
    // Replace 'YOUR_API_KEY' with your actual Spoonacular API key
    const apiKey = '00298f1246234721b20874aa5f8c7c0f';

    try {
      const response = await fetch(
        `https://api.spoonacular.com/food/ingredients/${ingredientId}/information?apiKey=${apiKey}`
      );

      if (response.ok) {
        const data = await response.json();
        const parsedData = JSON.parse(data); // Parse the JSON string
        console.log(data)
        console.log(parsedData)

        setCalories(data.nutrition.nutrients[0].amount)
        
      }
    } catch (error) {
      console.error('Error fetching data:', error);
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
        <button onClick={fetchIngredientID}>Search</button>
      </div>
      {ingredientID ? (
        <p>ID of the top result: {ingredientID}</p>
      ) : (
        <p>No ID found for {foodItem}</p>
      )}
      {calories ? (
        <div>
          <h2>Nutritional Information for {foodItem}</h2>
          <ul>
            <li>Calories: {calories}</li>
          </ul>
        </div>
      ) : (
        <p>something went wrong</p>
      )}
    </div>
    
  );
}

export default NutritionalInformation;