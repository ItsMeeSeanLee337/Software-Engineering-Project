import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const urlParams = new URLSearchParams(window.location.search);
const dataToSend = urlParams.get('data');

const RecipeSubstitutes = ({ userId }) => {
  const [userIngredients, setUserIngredients] = useState([]); // State to store user-specific ingredients
  const [selectedIngredient, setSelectedIngredient] = useState(''); // State to store the selected ingredient for which substitutes will be displayed
  const [substitutes, setSubstitutes] = useState([]); // State to store the substitutes for the selected ingredient

  // Function to fetch user-specific ingredients
  var response;
  useEffect(() => {
    console.log("received substitutions")
    const fetchTopIngredients = async () => {
      try {
        const apiUrl = `http://172.16.122.26:8080/listOfIngredients/${dataToSend}`;
        response = await axios.get(apiUrl);
        console.log('Response:', response.data);
        setUserIngredients(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTopIngredients();
  }, []); 

  // Function to fetch substitutes for a selected ingredient
  const fetchSubstitutes = async () => {
    try {
      const apiKey = '248402bf586449c59ffe2b9624ff978a';
      const response = await axios.get(
        `https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=${selectedIngredient}&apiKey=${apiKey}`
      );
      
      setSubstitutes(response.data.substitutes);
    } catch (error) {
      console.error('Error fetching substitutes:', error);
    }
  };

  // useEffect to fetch substitutes when the selectedIngredient changes
  useEffect(() => {
    if (selectedIngredient) {
      fetchSubstitutes();
    }
  }, [selectedIngredient]);

  return (
    <div>
      <Navbar></Navbar>
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <h2>Your Ingredients</h2>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
          gap: '10px',
        }}
      >
        {userIngredients.map((ingredient, index) => (
          <li
            key={index}
            onClick={() => setSelectedIngredient(ingredient)}
            data-testid="ingredient button"
            style={{
              backgroundColor: '#f0f0f0',
              padding: '10px',
              borderRadius: '5px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            {ingredient}
          </li>
        ))}
      </ul>
      {selectedIngredient && (
        <div>
          <h2
            style={{
              marginBottom: '20px',
            }}
          >
            Substitutes for {selectedIngredient}:
          </h2>
          {substitutes && substitutes.length > 0 ? (
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
              }}
            >
              {substitutes.map((substitute, index) => (
                <li
                  key={index}
                  style={{
                    backgroundColor: '#e0e0e0',
                    padding: '10px',
                    marginBottom: '5px',
                    borderRadius: '5px',
                  }}
                >
                  {substitute}
                </li>
              ))}
            </ul>
          ) : (
            <p>No known substitutes</p>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default RecipeSubstitutes;
