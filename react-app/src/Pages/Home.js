import React from 'react'
import Navbar from './Navbar';
import { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';




function Home(){
    const navigate = useNavigate(); //used to navigate to another page
    const [userType, setUserType] = useState('');
    const urlParams = new URLSearchParams(window.location.search);
    const dataToSend = urlParams.get('data');
    var response;
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
      }, []); // Empty dependency array ensures this effect runs once on mount
      
      
      //When the user type is checked, will redirect makers to the landing page
      useEffect(()=>{
        console.log("This is user param:",dataToSend)
        if(userType === 1 || userType === -1)
        {
          console.log('navigating');
          navigate(`/`);
        }
      }, [userType])




    return(
        <div>
            <Navbar></Navbar>
            {dataToSend}
            This is the home page
        </div>
        
    )

}

export default Home