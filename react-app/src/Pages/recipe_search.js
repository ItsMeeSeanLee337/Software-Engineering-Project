import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function RecipeSearch() {
  var [query, setQuery] = useState('');
  const [diet, setDiet] = useState('');
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate(); //used to navigate to another page
  const [userType, setUserType] = useState('');
  const urlParams = new URLSearchParams(window.location.search);
  const dataToSend = urlParams.get('data');
  var response;
  useEffect(()=>{
    console.log("This is user param:",dataToSend)
    if(dataToSend === 'null' || dataToSend === null)
    {
      console.log('navigating');
      navigate(`/`);
    }
  },[])
  
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
    if(userType === 1 || userType === -1)
    {
      console.log('navigating');
      navigate(`/`);
    }
  }, [userType])

  const searchRecipesByName = async () => {
    const apiKey = 'APIKEY';

    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/search?query=${query}&apiKey=${apiKey}`);

      if (response.ok) {
        const data = await response.json()
        setRecipes(data.results);
        console.log(data.results)
      } else {
        // Handle API request error
        console.error('API request error');
      }
    } catch (error) {
      console.error('API request error:', error);
    }
  };
  
  const searchRecipesByDiet = async () => {
    const apiKey = 'APIKEY';

    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&diet=${diet}&apiKey=${apiKey}`);

      if (response.ok) {
        const data = await response.json()
        setRecipes(data.results);
        console.log(data.results)
      } else {
        // Handle API request error
        console.error('API request error');
      }
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  const searchByIngredients = async () => {
    const apiKey = 'APIKEY';

    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&apiKey=${apiKey}`);

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setRecipes(data);
        // I've got to be completely honest I have no idea why searching by ingredients wants "data" and not "data.results", I spent way too long figuring this out
      } else {
        // Handle API request error
        console.error('API request error');
      }
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleDietChange = (e) => {
    const optionValue = e.target.value;
    setDiet((prevDiet) => {
      const isSelected = prevDiet.includes(optionValue);

      if (isSelected) {
        // Remove the option if it's already selected
        return prevDiet.filter((item) => item !== optionValue);
      } else {
        // Add the option if it's not selected
        return [...prevDiet, optionValue];
      }
    });
  };

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <h1>Search for your recipes here.</h1> 
        <p>If searching by ingredients list your ingredients like this: apple, sugar, flour, etc. Otherwise just type in the name of your recipe</p>
        <input
          type="text"
          placeholder={`Search by name/ Ingredient`}
          value={query}
          onChange={handleChange}
        />
        <br></br>
        <select multiple value={diet} onChange={handleDietChange}>
          <option value="gluten free">Gluten Free</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="paleo">Paleo</option>
          <option value="ketogenic">Ketogenic</option>
          {/* Add more diet options as needed */}
        </select>
        <br></br>
        <button onClick={searchRecipesByName}>Search by Name</button>
        <br></br>
        <button onClick={searchByIngredients}>Search by Ingredient</button>
        <br></br>
        <button onClick={searchRecipesByDiet}>Search by Name & Diet</button>
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
