import React, { useState } from 'react';
import Navbar from './Navbar';

function RecipeSearch() {
  const [nameOfRecipe, setnameOfRecipe] = useState('');
  const [recipes, setRecipes] = useState([]);
  const testJson = {
    "results": [
        {
            "readyInMinutes": 45,
            "sourceUrl": "http://www.foodista.com/recipe/TNLH8XSQ/apple-pie-pancakes",
            "image": "Apple-Pie-Pancakes-632577.jpg",
            "servings": 4,
            "id": 632577,
            "title": "Apple Pie Pancakes"
        },
        {
            "readyInMinutes": 45,
            "sourceUrl": "http://www.foodista.com/recipe/PPR5SMZ3/autumn-apple-pie",
            "image": "autumn-apple-pie-633089.jpg",
            "servings": 10,
            "id": 633089,
            "title": "Autumn Apple Pie"
        },
        {
            "readyInMinutes": 45,
            "sourceUrl": "https://www.foodista.com/recipe/PK4W7MF2/bon-apple-tite-cinnamon-rolls",
            "image": "Bon-Apple-Tite-Cinnamon-Rolls-635649.jpg",
            "servings": 5,
            "id": 635649,
            "title": "Bon “Apple” Tite Cinnamon Rolls"
        },
        {
            "readyInMinutes": 45,
            "sourceUrl": "http://www.foodista.com/recipe/8D2Y2FP4/brandy-apple-mini-pies-with-cornmeal-crust",
            "image": "Brandy-Apple-Mini-Pies-With-Cornmeal-Crust-635907.jpg",
            "servings": 16,
            "id": 635907,
            "title": "Brandy-Apple Mini Pies With Cornmeal Crust"
        },
        {
            "readyInMinutes": 45,
            "sourceUrl": "http://www.foodista.com/recipe/P5XGZL3X/wildwood-ovens-bourbon-apple-glazed-cedar-plank-salmon",
            "image": "Wildwood-Ovens-Bourbon-Apple-Glazed-Cedar-Plank-Salmon-665352.jpg",
            "servings": 6,
            "id": 665352,
            "title": "Wildwood Ovens Bourbon Apple Glazed Cedar Plank Salmon"
        },
        {
            "readyInMinutes": 45,
            "sourceUrl": "https://www.foodista.com/recipe/BVKG5VJM/apple-roasted-pork-loin",
            "image": "Apple-Roasted-Pork-Loin-632590.jpg",
            "servings": 6,
            "id": 632590,
            "title": "Apple Roasted Pork Loin"
        },
        {
            "readyInMinutes": 45,
            "sourceUrl": "http://www.foodista.com/recipe/HVWXW5F2/apple-sausage-galette",
            "image": "Apple-Sausage-Galette-632594.png",
            "servings": 4,
            "id": 632594,
            "title": "Apple Sausage Galette"
        },
        {
            "readyInMinutes": 105,
            "sourceUrl": "https://maplewoodroad.com/moms-jewish-apple-cake-recipe/",
            "image": "moms-jewish-apple-cake-1697555.jpg",
            "servings": 12,
            "author": "maplewoodroad",
            "id": 1697555,
            "title": "Mom's Jewish Apple Cake"
        },
        {
            "readyInMinutes": 45,
            "sourceUrl": "http://www.foodista.com/recipe/VLR7HJQN/apple-spinach-soup",
            "image": "Apple-spinach-soup-632598.jpg",
            "servings": 2,
            "id": 632598,
            "title": "Apple spinach soup"
        },
        {
            "readyInMinutes": 35,
            "sourceUrl": "https://maplewoodroad.com/pork-chops-with-apple/",
            "image": "pork-chops-with-apple-a-taste-of-fall-in-30-minutes-1697559.jpg",
            "servings": 2,
            "author": "maplewoodroad",
            "id": 1697559,
            "title": "Pork Chops with Apple - a taste of fall in 30 minutes"
        }
    ],
    "baseUri": "https://spoonacular.com/recipeImages/",
    "offset": 0,
    "number": 10,
    "totalResults": 314,
    "processingTimeMs": 75,
    "expires": 1699915680391,
    "isStale": false
}

  const searchRecipes = async () => {
    const apiKey = '00298f1246234721b20874aa5f8c7c0f';

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/search?query=${nameOfRecipe}&apiKey=${apiKey}`
      );
      if (response.ok) {
        const data = await response.json()
        setRecipes(data.results);
        console.log(data.results)
        console.log(recipes)
      } else {
        // Handle API request error
        console.error('API request error');
      }
    } catch (error) {
      console.error('API request error:', error);
    }
  };
  
  const testFunction = async () => {
    setRecipes(JSON.parse(testJson))
    console.log(setRecipes)
  };

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <input
          type="text"
          placeholder="Search for a recipe"
          value={nameOfRecipe}
          onChange={(e) => setnameOfRecipe(e.target.value)}
        />
        <button onClick={searchRecipes}>Search</button>
      </div>

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeSearch;
