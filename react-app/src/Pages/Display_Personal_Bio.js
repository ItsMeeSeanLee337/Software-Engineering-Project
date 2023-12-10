import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/bio.css'
import { useNavigate } from 'react-router-dom';

//Displays the users bio page
function Display_Personal_Bio() {
  //used to navigate to another page
  const navigate = useNavigate(); 
  const [userType, setUserType] = useState('');
  //bio variable expects a list response
  const [bio, setBio] = useState([]);
  //gets the username data
  const urlParams = new URLSearchParams(window.location.search);
  const data = urlParams.get('data');
  const username = decodeURIComponent(data);
  const dataToSend = encodeURIComponent(username)

  var response;
  useEffect(()=>{
    console.log("This is user param:",data)
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
        setUserType(-1);
        console.error('Error:', error);
      }
    };
    }
    checkUser();
  }, []); // Empty dependency array ensures this effect runs once on mount
  
  
  //When the user type is checked, will redirect makers to the landing page
  useEffect(()=>{
    console.log("This is user param:",data)
    if(userType === 1 || userType === -1)
    {
      //console.log('navigating');
      navigate(`/`);
    }
  }, [userType])

  //automatically gets bio information and displays for the user accessing the /getBio endpoint on server.js using the users username
  useEffect(() => {
    const apiUrl = `http://172.16.122.26:8080/getBio`;
    axios.post(apiUrl, { username })
      .then((response) => {
        //sets bio variable (list) to the response
        setBio(response.data);
        console.log("Got Bio information succesfully!")
      })
      .catch((error) => {
        console.error('Retriving Bio Error:', error);
      });
  }, []);

  //user can click back to edit page if they want to edit their bio after viewing it
  const handleBackEdit = async (event) => {
    event.preventDefault();
    window.location.href = `/Create_Edit_Personal_Bio?data=${dataToSend}`;
  }

  //user can click back to login success page if they are done viewing their bio 
  const handleBackHome = async (event) => {
    event.preventDefault();
    window.location.href = `/Login_Success?data=${dataToSend}`;
  }
  
  return (
    <div>
      <button type="button" id='goToEditBio' onClick={handleBackEdit}>
        Go Back to Edit
      </button>
      <br />
      <br />
      <button type="button" onClick={handleBackHome}>
        Go Back to Home
      </button>
      <p>Welcome to your Bio, {username}! </p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        {bio.map((item, index) => (
          <div id="bioImage" key={index}>
            {item.imgUrl === 'img1' ? (
              <div>
                {
                  <img
                    src={require('../images/img1.png')}
                    alt="Image 1"
                    style={{ width: '300px', height: '300px' }}
                  />
                }
              </div>
            ) : item.imgUrl === 'img2' ? (
              <div>
                {
                  <img
                    src={require('../images/img2.png')}
                    alt="Image 2"
                    style={{ width: '300px', height: '300px' }}
                  />
                }
              </div>
            ) : (
              <div>{}</div>
            )}
  
            <h1 id="bioTitle" className='text'>
              Bio:
            </h1>
            <p id="bioText">{item.bio}</p>
            <h1 id="bioFoodHeader" className='text'>
              Favorite Food:
            </h1>
            <p id="bioFood">{item.favoriteFood}</p>
            <h1 id="bioRecipeHeader" className='text'>
              Favorite Recipe:
            </h1>
            <p id="bioRecipe">{item.favoriteRecipe}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Display_Personal_Bio;