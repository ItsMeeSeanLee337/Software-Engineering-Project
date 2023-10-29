import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/bio.css'
import Login_Success from './Login_Success';

function Create_Edit_Personal_Bio() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [bio, setBio] = useState("");
    const [favoriteFood, setfavoriteFood] = useState("");
    const [favoriteRecipe, setfavoriteRecipe] = useState("");

    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');
    const username = decodeURIComponent(data);

      
    function handleBio (event) {
        setBio(event.target.value);
        console.log("changed bio");
    };

    function handlefavoriteFood (event) {
        setfavoriteFood(event.target.value);
        console.log("changed food");
    };

    function handlefavoriteRecipe (event) {
        setfavoriteRecipe(event.target.value);
        console.log("changed recipe");
    };

    const handleBack = async (event) => {
        console.log("moved to home page");
        event.preventDefault();
        const dataToSend = encodeURIComponent(username)
        window.location.href = `/Login_Success?data=${dataToSend}`;
    }

    useEffect(() => {
        console.log("selected image", selectedImage);
      }, [selectedImage]);

      const handleImageSelect = (imgUrl) => {
        setSelectedImage(imgUrl);
      };

    function handleSubmit (event) {
        event.preventDefault();
        console.log("submitted!");
        console.log("username", username);
        console.log("bio", bio);
        console.log("fav food", favoriteFood);
        console.log("fav recipe", favoriteRecipe);
        console.log("img", selectedImage);
        const apiUrl = 'http://172.16.122.26:8080/createEditBio';
        axios.post(apiUrl, { username, bio, favoriteFood, favoriteRecipe, selectedImage })
          .then(response => {
            if (response.status === 200) {
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
          <button onClick={() => handleImageSelect(('img1'))}>Select Image 1</button>
        </div>
        <div>
          <img 
          src={require('../images/img2.png')} 
          alt="Image 2" 
          style={{ width: '100px', height: '100px' }}
          />
          <button onClick={() => handleImageSelect(('img2'))}>Select Image 2</button>
        </div>
        <div>
        <button onClick={() => handleImageSelect("")}>No image</button>
        </div>
        </div>
        </div>
        <h1 className='text'>About Me:</h1>
        <textarea
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
          rows="5"
          cols="30"
          value={favoriteRecipe}
          onChange={handlefavoriteRecipe}
          placeholder="What's your favorite recipe?"
        />
        <div>
          <button onClick={handleSubmit}>Update</button>
        </div>
      </div>
    

    )

};


export default Create_Edit_Personal_Bio;