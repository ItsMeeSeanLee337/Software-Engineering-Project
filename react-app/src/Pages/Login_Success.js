import Navbar from './Navbar'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login_Success(){
    //getting username data fro succesful login 
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');
    const username = decodeURIComponent(data);
    const [maker, setMaker] = useState('');
    const navigate = useNavigate(); //used to navigate to another page
    const [userType, setUserType] = useState('');
    var response;
    console.log("username: ", username);

    useEffect(()=>{
        console.log("This is user param:",data)
        if(data === 'null' || data === null)
        {
          console.log('navigating');
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
      
      
      //When the user type is checked, will redirect non users to the landing page
      useEffect(()=>{
        console.log("This is user param:",data)
        if(userType === -1)
        {
          console.log('navigating');
          navigate(`/`);
        }
      }, [userType])

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
        console.log("Make number = ", maker)
        if (maker === 1) {
          console.log('navigating');
          navigate(`/Create_Recipe?data=${username}`);
        }
      }, [maker]);

    return(
    <div>
        <Navbar></Navbar>
        <p>Welcome to your page {username}!</p> 
        <a href="/">Logout</a> 

    </div>
        
    )

}

export default Login_Success;