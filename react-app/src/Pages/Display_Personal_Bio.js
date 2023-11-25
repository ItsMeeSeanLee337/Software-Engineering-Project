import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/bio.css'
import Login_Success from './Login_Success';
import { Navigate, useNavigate } from 'react-router-dom';

function Display_Personal_Bio() {
  const navigate = useNavigate(); //used to navigate to another page
  const [userType, setUserType] = useState('');
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

    const [bio, setBio] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');
    const username = decodeURIComponent(data);
    //console.log("username", username);

    const handleBackEdit = async (event) => {
      //console.log("moved to edit bio page");
      event.preventDefault();
      const dataToSend = encodeURIComponent(username)
      window.location.href = `/Create_Edit_Personal_Bio?data=${dataToSend}`;
  }

    const handleBackHome = async (event) => {
      //console.log("moved to edit bio page");
      event.preventDefault();
      const dataToSend = encodeURIComponent(username)
      window.location.href = `/Login_Success?data=${dataToSend}`;
  }

    
    useEffect(() => {
      // Make your Axios POST request and set the data state with the response
      const apiUrl = `http://172.16.122.26:8080/getBio`;
      axios.post(apiUrl, { username })
        .then((response) => {
          setBio(response.data);
          console.log("Got Bio information succesfully!")
          //console.log("This is the response: ", response.data)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, []); // Empty dependency array means this effect runs once when the component mounts
  


      return (
        <div>
        <button type="button" id='goToEditBio' onClick={handleBackEdit}>Go Back to Edit</button>
        <br />
        <br />
        <button type="button" onClick={handleBackHome}>Go Back to Home</button>
        <p>Welcome to your Bio, {username}! If you want to edit your bio please click on Go Back to Edit!</p>
        <div style = {{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        {bio.map((item, index) => (
          <div key={index}>
            {item.imgUrl === 'img1' ? (
            <div>
              {<img 
              src={require('../images/img1.png')} 
              alt="Image 1"
              style={{ width: '300px', height: '300px' }} 
              />}
            </div>
            ) : item.imgUrl === 'img2' ? (
            <div>
              {<img 
              src={require('../images/img2.png')} 
              alt="Image 2" 
              style={{ width: '300px', height: '300px' }}
              />}
            </div>
            ) : (
            <div>
              {}
            </div>
          )}

            <h1 className='text'>Bio: </h1>
            <p>{item.bio}</p>
            <h1 className='text'>Favorite Food: </h1>
            <p>{item.favoriteFood}</p>
            <h1 className='text'> Favorite Recipe: </h1>
            <p>{item.favoriteRecipe}</p>
          </div>
        ))}
      </div>
      </div>

      )
    

};



export default Display_Personal_Bio;
