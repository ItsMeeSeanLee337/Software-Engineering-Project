import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for routing
import '../styles/homepage.css';

const HomePage = () => {
    const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    // Fetch random recipes from your server's /getRandomRecipes endpoint
    fetch('/getRandomRecipes')
      .then((response) => response.json())
      .then((data) => {
        setRandomRecipes(data);
      })
      .catch((error) => {
        console.error('Error fetching random recipes:', error);
      });
  }, []);


  return (
    <div className="homepage">
      <header>
        <h1>Welcome to Your Recipe App</h1>
      </header>
      <section className="links-container">
        <div className="link-box">
          <Link to="/Create_Edit_Personal_Bio">
            <img src="/images/editBio.jpg" alt="Edit Bio" />
            <h3>Edit Personal Bio</h3>
          </Link>
        </div>
        <div className="link-box">
          <Link to="/Display_Personal_Bio">
            <img src="/images/img1.png" alt="View Bio" />
            <h3>View Personal Bio</h3>
          </Link>
        </div>
        <div className="link-box">
          <Link to="/Login">
            <img src="/images/searchRecipe.jpg" alt="Look up Recipe" />
            <h3>Look up Recipe</h3>
          </Link>
        </div>
        <div className="link-box">
          <Link to="/nutritional_info">
            <img src="/images/searchIngredient.jpg" alt="Look up Ingredient" />
            <h3>Look up Ingredient</h3>
          </Link>
        </div>
        <div className="link-box">
          <Link to="/Create_Recipe">
            <img src="/images/createCustom" alt="Create Custom Recipe" />
            <h3>Create Custom Recipe</h3>
          </Link>
        </div>
        <div className="link-box">
          <Link to="/meal-planner">
            <img src="/images/mealPlanning.png" alt="Meal Planner" />
            <h3>Meal Planner</h3>
          </Link>
        </div>
      </section>
      <section className="custom-recipe-box">
        <h2>Featured Custom Recipes</h2>
        {randomRecipes.map((recipe, index) => (
          <div key={index} className="recipe-item">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
