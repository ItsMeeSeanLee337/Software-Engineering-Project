import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Login_Success from './Login_Success';
import { Navigate, useNavigate } from 'react-router-dom';
import '../styles/tag_recipes.css'

function TaggedRecipes() {
    const [tag, setTag] = useState("");
    const [recipes, setRecipes] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);
    const dataToSend = urlParams.get('data');
    const username = decodeURIComponent(dataToSend);
    console.log("DATA: ", username);
    const [crid, setcrid] = useState('');


    //ensuring each page is accessed by a logged in user
    const navigate = useNavigate(); 
    const [userType, setUserType] = useState('');

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
    }, []); 
    
    
    //When the user type is checked, will redirect makers to the landing page
    useEffect(()=>{
      console.log("This is user param:",dataToSend)
      if(userType === -1)
      {
        console.log('navigating');
        navigate(`/`);
      }
    }, [userType])
    

    

    //ensuring that tags displayed are unique (so no duplicate tags if more than one recipe has the same tag name)
    const [selectedTag, setSelectedTag] = useState(null);
    const handleTagClick = (tag) => {
      setSelectedTag(tag);
    };
    const uniqueTags = [...new Set(recipes.map((recipe) => recipe.Tag))];


    
    var response;
    useEffect(() => {
        const fetchData = async () => {
          
          try {
            const apiUrl = `http://172.16.122.26:8080/getTaggedRecipes/${dataToSend}`;
    
            response = await axios.get(apiUrl);
            console.log('Response from request:', response.data);
            setRecipes(response.data);
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchData();
      }, []);
      
      const removeTag = (id) => {
        console.log("This is the crid for the tagged recipe: ", id);
        try{
          var apiUrlUnTag = `http://172.16.122.26:8080/untagRecipes/${id}`;
          //we dont really care about response, just inserting data, when user clicks show tagged recipies then we care about response, this will be handled in a diff page though
            axios.post(apiUrlUnTag)
              .then(response_tag => {
                if (response_tag.status === 200) {
                  console.log('Response:', response_tag.data);
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

            
            console.log("This is the crid for the tagged recipe: ", id);

            

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
                    <button onClick={() => handleTagClick(tag)}>{tag}</button>
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
                          <p>Title: {recipe.Title}</p>
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

                          <button className = 'centerButtonCR'
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
      