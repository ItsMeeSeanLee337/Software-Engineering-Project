import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

function NutritionalInformation() {
  const [foodItem, setFoodItem] = useState('');
  const [nutritionalInfo, setNutritionalInfo] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    // Replace 'YOUR_SPOONACULAR_API_KEY' with your actual API key
    const apiKey = 'YOUR_SPOONACULAR_API_KEY';

    try {
      const response = await axios.get(
        `https://api.spoonacular.com/food/ingredients/search?query=${foodItem}&apiKey=${apiKey}`
      );

      if (response.data.results && response.data.results.length > 0) {
        // Assuming the first result contains the desired information
        const firstResult = response.data.results[0];
        setNutritionalInfo(firstResult);
      } else {
        // Handle no results found
        setNutritionalInfo(null);
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
            {/* Add more nutritional information fields here */}
          </ul>
        </div>
      ) : (
        <p>No nutritional information found for the entered food item.</p>
      )}
    </div>
  );
}

export default NutritionalInformation;
