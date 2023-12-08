import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import '../styles/tag_recipes.css'

function TaggedRecipes() {
  //used to get recipes from response
  const [recipes, setRecipes] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const dataToSend = urlParams.get('data');
  //ensuring each page is accessed by a logged in user
  const navigate = useNavigate(); 
  const [userType, setUserType] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

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
  }, []); 
  
  
  //When the user type is checked, will redirect makers to the landing page
  useEffect(()=>{
    //console.log("This is user param:",dataToSend)
    if(userType === 1 || userType === -1)
    {
      //console.log('navigating');
      navigate(`/`);
    }
  }, [userType])
  
  //setting selected tag to be the tag they clicked
  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  //fetching the tagged recipes 
  var response;
  useEffect(() => {
      const fetchTaggedRecipes = async () => {
        
        try {
          const apiUrl = `http://172.16.122.26:8080/getTaggedRecipes/${dataToSend}`;
  
          response = await axios.get(apiUrl);
          console.log("Succesfully got tagged recipes")
          //console.log('Response from request:', response.data);
          setRecipes(response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchTaggedRecipes();
    }, []);

  //ensuring that tags displayed are unique (so no duplicate tags if more than one recipe has the same tag name)
  const uniqueTags = [...new Set(recipes.map((recipe) => recipe.Tag))];

  //handles when a user wants to remove a tag from a recipe
  const removeTag = (id) => {
    //console.log("This is the crid for the tagged recipe: ", id);
    try{
      var apiUrlUnTag = `http://172.16.122.26:8080/untagRecipes/${id}`;
        axios.post(apiUrlUnTag)
          .then(response_tag => {
            if (response_tag.status === 200) {
              //console.log('Response:', response_tag.data);
              console.log("Removed tagged recipe")
              window.location.reload();
            } 
          })
          .catch(error => {
            console.error('Tag Error:', error);
            window.location.reload();
          });
    
        } catch {
          console.error('Tag Error:');
          window.location.reload();
        } 
  };
    

  return (
    <>
      <Navbar />
      <div >
        <div>
          <h3>Your Tags</h3>
          <div>
            {uniqueTags.map((tag) => (
              <div key={tag}>
                <br />
                <button data-testid="specific_tag_Button" id = 'specific_tag' onClick={() => handleTagClick(tag)}>{tag}</button>
                <br />
              </div>
            ))}
          </div>
        </div>
    
        <div className='flex-container-Tags'>
          <h3>Recipes for {selectedTag} tag </h3>
          {selectedTag && (
            <ul>
              {recipes
                .filter((recipe) => recipe.Tag === selectedTag)
                .map((recipe) => (
                  <li key={recipe.crID}>
                    <div className="recipe-box">
                      <p id = "tagRecipeTitle">Title: {recipe.Title}</p>
                      <p>Description: {recipe.Description}</p>
                      <p>Ingredients:</p>
                      <ul>
                        {Array.isArray(recipe.list) ? (
                          recipe.list.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          ))
                        ) : (
                          recipe.list.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          ))
                        )}
                      </ul>
                      <p>Notes: {recipe.notes}</p>

                      <button data-testid="remove_tag_Button" id ='removeTag' className = 'centerButtonCR'
                        onClick={() => removeTag(recipe.crID)}
                      >Untag this recipe</button>
                    </div>
                  </li>
                  
                ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );

};
    
export default TaggedRecipes;