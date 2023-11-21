import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for routing
//import '../styles/homepage.css';
import '../styles/substitutions.css';

const urlParams = new URLSearchParams(window.location.search);
  const dataToSend = urlParams.get('data');

const RecipeSubstitutes = ({ userId }) => {
  const [userIngredients, setUserIngredients] = useState([]); // State to store user-specific ingredients
  const [selectedIngredient, setSelectedIngredient] = useState(''); // State to store the selected ingredient for which substitutes will be displayed
  const [substitutes, setSubstitutes] = useState([]); // State to store the substitutes for the selected ingredient

  // Function to fetch user-specific ingredients
  var response;
  useEffect(() => {
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
        //`https://api.spoonacular.com/food/ingredients/${selectedIngredient}/substitutes?apiKey=248402bf586449c59ffe2b9624ff978a`
        `https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=${selectedIngredient}&apiKey=${apiKey}`
        //`https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=butter&apiKey=${apiKey}`
      );
      setSubstitutes(response.data.substitutes);
    } catch (error) {
      console.error('Error fetching substitutes:', error);
    }
  };

  // useEffect to fetch user ingredients when the component mounts
  //useEffect(() => {
    //fetchUserIngredients();
  //}, [userId]);

  // useEffect to fetch substitutes when the selectedIngredient changes
  useEffect(() => {
    if (selectedIngredient) {
      fetchSubstitutes();
    }
  }, [selectedIngredient]);

  return (
    <div className="container">
      <h2>Your Ingredients</h2>
      <ul className="ingredients-list">
        {userIngredients.map((ingredient, index) => (
          <li key={index} onClick={() => setSelectedIngredient(ingredient)} className="ingredients-list-item">
            {ingredient}
          </li>
        ))}
      </ul>
      {selectedIngredient && (
        <div>
          <h2>Substitutes for {selectedIngredient}:</h2>
          {substitutes && substitutes.length > 0 ? (
            <ul className="substitutes-list">
              {substitutes.map((substitute, index) => (
                <li key={index} className="substitutes-list-item">
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
  );
  
  
};

export default RecipeSubstitutes;
