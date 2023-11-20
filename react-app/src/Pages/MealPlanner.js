import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Login_Success from './Login_Success';
import { Navigate, useNavigate } from 'react-router-dom';
import '../styles/meal_planner.css'

function MealPlanner() {

    const navigate = useNavigate(); //used to navigate to another page
    const [userType, setUserType] = useState('');
    const urlParams = new URLSearchParams(window.location.search);
    const dataToSend = urlParams.get('data');
    //setting username
    const username = dataToSend;

    const [recipes, setRecipes] = useState(null);
    const [mealPlanRecipes, setmealPlanRecipes] = useState(false);
    const[DayRecipes, setDayRecipes] = useState(null);
    const [clickedDay, setClickedDay] = useState(null);


    const [showTextArea, setShowTextArea] = useState(false);
    const [dayText, setDayText] = useState('');
    const [recipeTagVisibility, setRecipeTagVisibility] = useState({})
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


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

      var response;
      useEffect(() => {
          const fetchData = async () => {
            try {
              const apiUrl = `http://172.16.122.26:8080/getMealPlannerRecipes/${dataToSend}`;
              response = await axios.get(apiUrl);
              console.log('Response from request:', response.data);
              setRecipes(response.data);
            } catch (error) {
              console.error('Error:', error);
            }
          };
      
          fetchData();
        }, []);

    
      
    const handleButtonClick = (day) => {
        // Handle button click for the specific day
        console.log(`Button clicked for ${day}`);
        setClickedDay(day);
        var responseday;
        const fetchDatas = async () => {
            try {
                const apiUrl = `http://172.16.122.26:8080/getDay/${day}`;
                responseday = await axios.get(apiUrl);
                console.log('Response from request:', responseday.data);
                setDayRecipes(responseday.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        fetchDatas();
    };

    const showMealPlanRecipes = () => {
        setmealPlanRecipes(!mealPlanRecipes);
      };

    const handleSaveText= (id) => {
        // You can save the text to a server or perform any other desired action here
        console.log("ID handle save text:", id);
        console.log('Text to save:', dayText);
        setShowTextArea(false); 
        setRecipeTagVisibility((prevVisibility) => ({
            ...prevVisibility,
          [id]: !prevVisibility[id],
        }));

        try{
            console.log("here now")
            const apiUrl = `http://172.16.122.26:8080/setDay/${id}`;
              axios.post(apiUrl, {username, dayText})
                .then(response_tag => {
                if (response_tag.status === 200) {
                    console.log('Response:', response_tag.data);
                    alert("Succesfully added recipe!")
                  } 
                })
                .catch(error => {
                  console.error('Tag Error:', error);
                  alert("Enter a valid day!")
                });
          
        } catch {
            console.error('Tag Error:');
        }
    };
      

      const addToDay = (id) => {
        // Handle button click for the specific day
        console.log('Button clicked for:', id);
        setRecipeTagVisibility((prevVisibility) => ({
            ...prevVisibility,
            [id]: !prevVisibility[id],
        }));   
    };

    const dropMeal = (id) => {
        console.log('Here in drop meal:' , id);

    };

    
    return (
        <>
          <Navbar />
          <div>Hello {username}! This is your meal planning page!</div>
          <div>
            <button onClick={showMealPlanRecipes}>Show Recipes</button>
          </div>
          <div className="r-container">
            {recipes && mealPlanRecipes &&
              Object.keys(recipes).map((index) => (
                <div key={index}>
                  <p>crID: {recipes[index].crID}</p>
                  <ul>
                    {recipes[index].recipes &&
                      recipes[index].recipes.map((recipe, recipeIndex) => (
                        <div key={recipeIndex} className="r-box">
                          <p>Title: {recipe.Title}</p>
                          <p>Description: {recipe.Description}</p>
                          <p>Ingredients: </p>
                          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap' }}>
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
                            className='centerButtonCR'
                            onClick={() => addToDay(recipe.crID)}
                          >
                            Add to:
                          </button>
                          
                          {recipeTagVisibility[recipe.crID] && (
                            <div>
                              <textarea
                                value={dayText}
                                onChange={(event) => setDayText(event.target.value)}
                                rows="2"
                                cols="10"
                              ></textarea>
                              <button onClick={() => handleSaveText(recipe.crID)}>Save</button>
                            </div>
                          )}
                          </ul>

                        </div>
                      ))}
                  </ul>
                </div>
              ))}
          </div>

          <div>
          <div >
            {DayRecipes &&
              Object.keys(DayRecipes).map((index) => (
                <div key={index}>
                  <p>crID: {DayRecipes[index].crID}</p>
                  <ul>
                    {DayRecipes[index].recipes &&
                      DayRecipes[index].recipes.map((recipe, recipeIndex) => (
                        <div key={recipeIndex} >
                          <p>Title: {recipe.Title}</p>

                         <button
                            className='centerButtonCR'
                            onClick={() => dropMeal(recipe.crID)}
                          >
                            Drop
                          </button>
                        
                        

                        </div>
                      ))}
                  </ul>
                </div>
              ))}
          </div>


          </div>
      
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {daysOfWeek.map((day, index) => (
              <div key={day} style={{ margin: '0 10px', textAlign: 'center' }}>
                <h2>{day}</h2>
                <button onClick={() => handleButtonClick(day)}>Click me</button>
              </div>
            ))}
          </div>
        </>
    ); 

};   
    export default MealPlanner;
