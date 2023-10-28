import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
//import '../styles/bio.css'
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
              //testing this now
              //change query in server to updating based on what is filled out so if statemenyts with diff queries
              //after i figure this out, i wanna figure out how to include this part and the display part in one
              window.location.href = `/Display_Personal_Bio?data=${username}`;
            } 
          })
          .catch(error => {
            console.error('Error:', error);
          });
          
    };
    
    return (
        <div>
        <p>Welcome to your profile, {username}!</p>
        <p>Once you are finished creating your profile, hit the update button to see your changes!</p>
        <br />
        <br />
        <h1>Choose a profile photo: </h1>
        <div>
          <img src={require('../images/img1.png')} alt="Image 1" />
          <button onClick={() => handleImageSelect(('img1'))}>Select Image 1</button>
        </div>
        <div>
          <img src={require('../images/img2.png')} alt="Image 2" />
          <button onClick={() => handleImageSelect(('img2'))}>Select Image 2</button>
        </div>
        <div>
        <button onClick={() => handleImageSelect("")}>No image</button>
        </div>
        <h1>About Me:</h1>
        <textarea
          rows="5"
          cols="30"
          value={bio}
          onChange={handleBio}
          placeholder="Type something about yourself!"
          style={{ resize: 'both' }}
        />
        <br />
        <br />
        <h1>Favorite Food:</h1>
        <textarea
          rows="5"
          cols="30"
          value={favoriteFood}
          onChange={handlefavoriteFood}
          placeholder="What's your favorite food?"
          style={{ resize: 'both' }}
        />
        <br />
        <br />
        <h1>Favorite Recipe:</h1>
        <textarea
          rows="5"
          cols="30"
          value={favoriteRecipe}
          onChange={handlefavoriteRecipe}
          placeholder="What's your favorite recipe?"
          style={{ resize: 'both' }}
        />
        <div>
          <button onClick={handleSubmit}>Update</button>
        </div>
      </div>
    

    )

};


export default Create_Edit_Personal_Bio;