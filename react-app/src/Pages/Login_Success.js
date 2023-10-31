import Navbar from './Navbar'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import { Link } from 'react-router-dom';
function Login_Success(){
    //getting username data fro succesful login 
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');
    const username = decodeURIComponent(data);
    const [maker, setMaker] = useState('');
    const navigate = useNavigate(); //used to navigate to another page
    console.log("DATA: ", username);

    //Checking to see if the user is a recipe maker
    //Will send them to create custom recipe if they are
    useEffect(() => {
        const fetchData = async () => {
          
          try {
            //const apiUrl = 'http://localhost:8080/createRecipe';  
            const apiUrl = `http://172.16.122.26:8080/checkMaker/${username}`;
    
            const response = await axios.get(apiUrl);
            console.log('Response:', response.data[0].isMaker);
            setMaker(response.data[0].isMaker);
          } catch (error) {
            console.error('Error:', error);
          }
        };
        
        fetchData();
      }, []); // Empty dependency array ensures this effect runs once on mount

      //When maker is updated, this will run and redirect them if they are a maker
      useEffect(() => {
        if (maker === 1) {
          console.log('navigating');
          navigate(`/create_recipe?data=${username}`);
        }
      }, [maker]);

   
    const handleGoToBio = async (event) => {
        console.log("moved to biopage");
        event.preventDefault();
        const dataToSend = encodeURIComponent(username)
        window.location.href = `/Display_Personal_Bio?data=${dataToSend}`;
    }
    const handleCreateEditBio = async (event) => {
        console.log("moved to biopage");
        event.preventDefault();
        const dataToSend = encodeURIComponent(username)
        window.location.href = `/Create_Edit_Personal_Bio?data=${dataToSend}`;
    }

    return(
    <div>
        <Navbar></Navbar>
        <p>Welcome to your page {username}!</p> 
        <button type="button" onClick={handleCreateEditBio}>Create/Edit Bio</button>
        <br />
        <br />
        <button type="button" onClick={handleGoToBio}>Go to Bio</button>
        <br />
        <br />
        <a href="/">Logout</a> 

    </div>
        
    )

}

export default Login_Success;