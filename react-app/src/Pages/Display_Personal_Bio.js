import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
//import '../styles/bio.css'
import Login_Success from './Login_Success';

function Display_Personal_Bio() {
    const [bio, setBio] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');
    const username = decodeURIComponent(data);
    console.log("username", username);

    
    useEffect(() => {
      // Make your Axios POST request and set the data state with the response
      const apiUrl = `http://172.16.122.26:8080/getBio`;
      axios.post(apiUrl, { username })
        .then((response) => {
          setBio(response.data);
          console.log("This is the response: ", response.data)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, []); // Empty dependency array means this effect runs once when the component mounts
  


      return (
        <div>
        <h1>Welcome to your Bio! If you want to edit your bio please go back to you home page and click on Edit/Create Bio!</h1>
        {bio.map((item, index) => (
          <div key={index}>
            {item.imgUrl === 'img1' ? (
            <div>
              {<img src={require('../images/img1.png')} alt="Image 1" />}
            </div>
            ) : item.imgUrl === 'img2' ? (
            <div>
              {<img src={require('../images/img2.png')} alt="Image 2" />}
            </div>
            ) : (
            <div>
              {}
            </div>
          )}

            <p>Bio: {item.bio}</p>
            <p>Favorite Food: {item.favoriteFood}</p>
            <p>Favorite Recipe: {item.favoriteRecipe}</p>
          </div>
        ))}
      </div>

      )
    

};



export default Display_Personal_Bio;
