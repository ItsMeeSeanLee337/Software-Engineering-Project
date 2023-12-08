import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/bio.css'
import { useNavigate } from 'react-router-dom';

//Allows user to create/edit their bio page
function Create_Edit_Personal_Bio() {
  var response;
  //used to navigate to another page
  const navigate = useNavigate(); 
  const [userType, setUserType] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  //variable for bio/about section
  const [bio, setBio] = useState("");
  //variable for fav food section
  const [favoriteFood, setfavoriteFood] = useState("");
  //variable for fav recipe section
  const [favoriteRecipe, setfavoriteRecipe] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const data = urlParams.get('data');
  const username = decodeURIComponent(data);

  useEffect(()=>{
    //console.log("This is user param:",data)
    if(data === 'null' || data === null)
    {
      //console.log('navigating');
      navigate(`/`);
    }
  },[])
  
  //Check user type on page loading
  useEffect(() => {
    const checkUser = async () => {
      if(data !== "null" || data !== null){
      try {
        //const apiUrl = 'http://localhost:8080/createRecipe';  
        
        const apiUrl = `http://172.16.122.26:8080/checkMaker/${data}`;

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
    //console.log("This is user param:",data)
    if(userType === 1 || userType === -1)
    {
      console.log('navigating');
      navigate(`/`);
    }
  }, [userType])


  //handles the bio/about field and sets the variable to that field
  function handleBio (event) {
    setBio(event.target.value);
    //console.log("changed bio");
  };

  //handles the favorite food field and sets the variable to that field
  function handlefavoriteFood (event) {
    setfavoriteFood(event.target.value);
    //console.log("changed food");
  };

  //handles the favorite recipe field and sets the variable to that field
  function handlefavoriteRecipe (event) {
    setfavoriteRecipe(event.target.value);
    //console.log("changed recipe");
  };

  //allows user to go back to their login success page
  const handleBack = async (event) => {
    //console.log("moved to home page");
    event.preventDefault();
    const dataToSend = encodeURIComponent(username)
    window.location.href = `/Login_Success?data=${dataToSend}`;
  }

  //automatically makes changes to whichever image was selected
  useEffect(() => {
      //console.log("selected image", selectedImage);
  }, [selectedImage]);

    //on click of image button set selected image associating with that button
  const handleImageSelect = (imgUrl) => {
    setSelectedImage(imgUrl);
  };

  //on click of Update button, send the username, bio/about field, favorite food, favorite recipe and image fields to the /createEditBio endpoint in server.js
  function handleSubmit (event) {
    event.preventDefault();
    const apiUrl = 'http://172.16.122.26:8080/createEditBio';
    axios.post(apiUrl, { username, bio, favoriteFood, favoriteRecipe, selectedImage })
      .then(response => {
        if (response.status === 200) {
          //if update was succesful, redirect to view bio page
          setBio ('');
          setfavoriteFood('');
          setfavoriteRecipe('');
          console.log("SUCCESS!");
          window.location.href = `/Display_Personal_Bio?data=${username}`;
        } 
      })
      .catch(error => {
        console.error('Error:', error);
      });
      
  };
  
  return (
      <div>
      <button type="button" onClick={handleBack}>Go Back to Home</button>
      <h1 className='text'>Welcome to your profile, {username}!</h1>
      <p>Once you are finished creating your profile, hit the update button to see your changes!</p>
      <br />
      <br />
      <div>
      <h1 className='text'>Choose a profile photo: </h1>
      <div style={{ display: 'flex' }}>
      <div>
        <img 
        src={require('../images/img1.png')} 
        alt="Image 1" 
        style={{ width: '100px', height: '100px' }}
        />
        <button data-testid="img1Button" id = 'img1' onClick={() => handleImageSelect(('img1'))}>Select Image 1</button>
      </div>
      <div>
        <img 
        src={require('../images/img2.png')} 
        alt="Image 2" 
        style={{ width: '100px', height: '100px' }}
        />
        <button data-testid="img2Button" id = 'img2' onClick={() => handleImageSelect(('img2'))}>Select Image 2</button>
      </div>
      <div>
      <button data-testid="no_img_Button" id = 'no_image' onClick={() => handleImageSelect("")}>No image</button>
      </div>
      </div>
      </div>
      <h1 className='text'>About Me:</h1>
      <textarea
        data-testid="aboutField"
        id = 'about'
        rows="5"
        cols="30"
        value={bio}
        onChange={handleBio}
        placeholder="Type something about yourself!"
      />
      <br />
      <br />
      <h1 className='text'>Favorite Food:</h1>
      <textarea
        data-testid="fav_foodField"
        id = 'fav_food'
        rows="5"
        cols="30"
        value={favoriteFood}
        onChange={handlefavoriteFood}
        placeholder="What's your favorite food?"
      />
      <br />
      <br />
      <h1 className='text'>Favorite Recipe:</h1>
      <textarea
        data-testid="fav_recipeField"
        id = 'fav_recipe'
        rows="5"
        cols="30"
        value={favoriteRecipe}
        onChange={handlefavoriteRecipe}
        placeholder="What's your favorite recipe?"
      />
      <div>
        <button data-testid="submitBioButton" id = 'submit_edit_bio' onClick={handleSubmit}>Update</button>
      </div>
    </div>
  
  )

};

export default Create_Edit_Personal_Bio;