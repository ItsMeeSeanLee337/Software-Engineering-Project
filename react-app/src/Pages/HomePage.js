import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/homepage.css';
import axios from 'axios';
import Navbar from './Navbar';

const urlParams = new URLSearchParams(window.location.search);
  const dataToSend = urlParams.get('data');

  const HomePage = () => {
    const [randomRecipes, setRandomRecipes] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const apiUrl = `http://172.16.122.26:8080/getRandomRecipes/${dataToSend}`;
          const response = await axios.get(apiUrl);
          setRandomRecipes(response.data);
          console.log("received recipes")
        } catch (error) {
          console.error('Error fetching random recipes:', error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <>
     <Navbar />
    <div className="homepage">
      <header>
        <h1>Welcome!</h1>
      </header>
      <section className="links-container">
        <div className="link-box">
          <Link to={`/Create_Edit_Personal_Bio?data=${dataToSend}`}>
            <img src={require("../images/editBio.jpg")} alt="Edit Bio" />
            <h3>Edit Personal Bio</h3>
          </Link>
        </div>
        <div className="link-box">
          <Link to={`/Display_Personal_Bio?data=${dataToSend}`}>
            <img src={require("../images/img1.png")} alt="View Bio" />
            <h3>View Personal Bio</h3>
          </Link>
        </div>
        <div className="link-box">
          <Link to={`/RecipeSearch?data=${dataToSend}`}> 
            <img src={require("../images/searchRecipe.jpg")} alt="Look up Recipe" />
            <h3>Look up Recipe</h3>
          </Link>
        </div>
        <div className="link-box">
        <Link to={`/NutritionalInformation?data=${dataToSend}`} className= "noDecoration" >Nutritional Info
            <img src={require("../images/searchIngredient.jpg")} alt="Look up Ingredient" />
            <h3>Look up Ingredient</h3>
          </Link>
        </div>
        <div className="link-box">
          <Link to={`/Create_Recipe?data=${dataToSend}`}>
            <img src={require("../images/createCustom.jpg")} alt="Create Custom Recipe" />
            <h3>Create Custom Recipe</h3>
          </Link>
        </div>
        <div className="link-box">
          <Link to={`/meal-planner?data=${dataToSend}`}>
            <img src={require("../images/mealPlanning.png")} alt="Meal Planner" />
            <h3>Meal Planner</h3>
          </Link>
        </div>
      </section>
      <section className= "custom-recipe-box">
        <h2>Featured Custom Recipes</h2>
        {randomRecipes.map((recipe, index) => (
          <div key={index} className="recipe-item">
            <h3>{recipe.Title}</h3>
            <p>{recipe.Description}</p>
          </div>
        ))}
      </section>
    </div>
    </>
  );
};

export default HomePage;
