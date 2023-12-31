import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import '../styles/meal_planner.css'

function MealPlanner() {
  const navigate = useNavigate(); //used to navigate to another page
  const [userType, setUserType] = useState('');
  const urlParams = new URLSearchParams(window.location.search);
  const dataToSend = urlParams.get('data');
  //setting username
  const username = dataToSend;
  //gets the meal planner recipes from response
  const [recipes, setRecipes] = useState(null);
  //used for showing meal plan recipes
  const [mealPlanRecipes, setmealPlanRecipes] = useState(false);
  //gets the meal planner recipes for a specific from response
  const [DayRecipes, setDayRecipes] = useState(null);
  //gets the day that was clicked on meal planner
  const [clickedDay, setClickedDay] = useState(null);
  //textbox for entering day in recipes
  const [, setShowTextArea] = useState(false);
  //text entered in the text field
  const [dayText, setDayText] = useState('');
  const [recipeTagVisibility, setRecipeTagVisibility] = useState({})
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


  useEffect(()=>{
      //console.log("This is user param:",dataToSend)
      if(dataToSend === 'null' || dataToSend === null)
      {
        //console.log('navigating');
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
        //console.log('Response:', response.data);
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
    //("This is user param:",dataToSend)
    if(userType === 1 || userType === -1)
    {
      //console.log('navigating');
      navigate(`/`);
    }
  }, [userType])

    //gets the meal planned recipes that we saved from display recipe page
  var response;
  useEffect(() => {
    const fetchMealPlanRecipes = async () => {
      try {
        const apiUrl = `http://172.16.122.26:8080/getMealPlannerRecipes/${dataToSend}`;
        response = await axios.get(apiUrl);
        //console.log('Response from request:', response.data);
        console.log('Got meal planned recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchMealPlanRecipes();
  }, []);

  //gets the recipes saved from the meal planner for the specific day
  const handleButtonClickDay = (day) => {
    //console.log(`Button clicked for ${day}`);
    setClickedDay(day);
    try{
      const apiUrl = `http://172.16.122.26:8080/getDay/${day}`;
        axios.post(apiUrl, {username})
          .then(response => {
          if (response.status === 200) {
              console.log("Got recipes for ", day);
              //console.log('Response:', response.data);
              setDayRecipes(response.data);
          } 
        })
        .catch(error => {
          console.error('Get Day recipes error:', error);
        });
    } catch {
      console.error('Error:');
    }
  };

  //on click of show button shows all recipes saved to the meal planner
  const showMealPlanRecipes = () => {
      setmealPlanRecipes(!mealPlanRecipes);
  };

  //functionality for saving a meal to a day
  const handleSaveText= (id) => {
      setShowTextArea(false); 
      setRecipeTagVisibility((prevVisibility) => ({
          ...prevVisibility,
        [id]: !prevVisibility[id],
      }));
      try{
        const apiUrl = `http://172.16.122.26:8080/setDay/${id}`;
          axios.post(apiUrl, {username, dayText})
            .then(response_tag => {
            if (response_tag.status === 200) {
                //console.log('Response:', response_tag.data);
                console.log("Succesfully added recipe to ", dayText)
                alert("Succesfully added recipe!")
              } 
            })
            .catch(() => {
              console.log('Enter a valid day!');
              alert("Enter a valid day!")
            });
      } catch {
          console.error('Tag Error:');
      }
  };
    
  // Handle button click for the specific day
  const addToDay = (id) => {
    setRecipeTagVisibility((prevVisibility) => ({
        ...prevVisibility,
        [id]: !prevVisibility[id],
    }));   
  };

  //drops a meal planner recipe
  const dropMealPlanMeal = (id) => {
    try{
      const apiUrl = `http://172.16.122.26:8080/dropMealPlanMeal/${id}`;
        axios.post(apiUrl, {username})
          .then(response_tag => {
          if (response_tag.status === 200) {
              console.log("Succesfully dropped meal from meal planner!")
              alert("Succesfully dropped meal!");
              window.location.reload();
            } 
          })
          .catch(error => {
            console.error('Drop Meal Plan Meal Error:', error);
          });
    
    } catch {
      console.error('Error:');
    }
  };
  
  //drops a meal for a clicked day
  const dropMeal = (id) => {
    try{
      const apiUrl = `http://172.16.122.26:8080/dropMeal/${id}`;
        axios.post(apiUrl, {username, clickedDay})
          .then(response_tag => {
          if (response_tag.status === 200) {
              console.log("Succesfully dropped meal for ", clickedDay)
              alert("Succesfully dropped meal!");
              window.location.reload();
            } 
          })
          .catch(error => {
            console.error('Drop Meal Error:', error);
          });
    
    } catch {
        console.error('Error:');
    }
    
  };

  
  return (
    <>
      <Navbar />
      <div>Hello {username}! This is your meal planning page!</div>
      <div>
        <button data-testid="showMealPlannedMeals" id = 'show' onClick={showMealPlanRecipes}>Show Recipes</button>
      </div>
      <div className="r-container">
        {recipes && mealPlanRecipes &&
          Object.keys(recipes).map((index) => (
            <div key={index}>
              <ul>
                {recipes[index].recipes &&
                  recipes[index].recipes.map((recipe, recipeIndex) => (
                    <div key={recipeIndex} className="r-box">
                      <p>Title: {recipe.Title}</p>
                      <p>Description: {recipe.Description}</p>
                      <p>Calories: {recipe.calories}</p>
                      <p>Protein: {recipe.protein}</p>
                      <p>Fat: {recipe.fat}</p>
                      <p>Carbs: {recipe.carbs}</p>
                      <p>Ingredients: </p>
                      <ul>
                        {Array.isArray(recipe.list) ? (
                          // For the first type of ingredient structure
                          recipe.list.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          ))
                        ) : (
                          // For the second type of ingredient structure
                          recipe.list.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          ))
                        )}
  
                        <button
                          data-testid="addDayButton"
                          id = 'add_day'
                          className='centerButtonCR'
                          onClick={() => addToDay(recipe.crID)}
                        >
                          Add to day of week
                        </button>

                        <button
                          data-testid="dropMealButton"
                          id = 'drop'
                          className='centerButtonCR'
                          onClick={() => dropMealPlanMeal(recipe.crID)}
                        >
                          Remove from Meal Planner
                        </button>
  
                        {recipeTagVisibility[recipe.crID] && (
                          <div>
                            <textarea
                              data-testid="dayTextField"
                              id = 'dayText'
                              value={dayText}
                              onChange={(event) => setDayText(event.target.value)}
                              rows="2"
                              cols="10"
                            ></textarea>
                            <button data-testid="saveDayButton" id= 'saveDay' onClick={() => handleSaveText(recipe.crID)}>Save</button>
                          </div>
                        )}
                      </ul>
  
                    </div>
                  ))}
              </ul>
            </div>
          ))}
      </div>
  
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        {daysOfWeek.map((day) => (
          <div key={day} style={{ margin: '0 5px', textAlign: 'center' }}>
            <h2>{day}</h2>
            <button data-testid="clickDayButton" id = 'dayButton' onClick={() => handleButtonClickDay(day)}>Click me</button>
          </div>
        ))}
      </div>

      <div>
        <div>
        <p>Meal Planned Recipes for {clickedDay}</p>
          {DayRecipes &&
            Object.keys(DayRecipes).map((index) => (
              <div key={index}>
                <ul>
                  {DayRecipes[index].recipes &&
                    DayRecipes[index].recipes.map((recipe, recipeIndex) => (
                      <div key={recipeIndex} >
                        <p><b>{recipe.Title}</b></p>
                        <p>Calories: {recipe.calories}</p>
                        <p>Protein: {recipe.protein}</p>
                        <p>Fat: {recipe.fat}</p>
                        <p>Carbs: {recipe.carbs}</p>
                        <button
                          data-testid="dropDayMealButton"
                          id = 'dropDayMeal'
                          className='centerButtonCR'
                          onClick={() => dropMeal(recipe.crID)}
                        >
                          Drop Meal
                        </button>
  
                      </div>
                    ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </>
  );    
};   

export default MealPlanner;