import Navbar from './Navbar'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//A page on the navbar that allows user to select to go to their bio page and edit their bio page
function Bio(){
  //getting username data fro succesful login 
  const urlParams = new URLSearchParams(window.location.search);
  const data = urlParams.get('data');
  const username = decodeURIComponent(data);
  const dataToSend = encodeURIComponent(username);
  const [maker, setMaker] = useState('');
  //used to navigate to another page
  const navigate = useNavigate(); 
  const [userType, setUserType] = useState('');
  var response;
  console.log("DATA: ", username);

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
    
    
    //When the user type is checked, will redirect makers to the landing page
  useEffect(()=>{
      console.log("This is user param:",data)
      if(userType === 1 || userType === -1)
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
      navigate(`/create_recipe?data=${username}`);
    }
  }, [maker]);

  //if go to bio button is clicked, redirect to that page
  const handleGoToBio = async (event) => {
      console.log("moved to biopage");
      event.preventDefault();
      window.location.href = `/Display_Personal_Bio?data=${dataToSend}`;
  }

  //if create/edit bio is clicked, redirect to that page
  const handleCreateEditBio = async (event) => {
      console.log("moved to edit biopage");
      event.preventDefault();
      window.location.href = `/Create_Edit_Personal_Bio?data=${dataToSend}`;
  }

  return(
  <div>
      <Navbar></Navbar>
      <p>Welcome to your Bio page! Click on Create/Edit Bio to edit your bio and Go to Bio to view your bio!</p>
      <button id='goToEditBio'  type="button" onClick={handleCreateEditBio}>Create/Edit Bio</button>
      <br />
      <br />
      <button id='goToBioPage' type="button" onClick={handleGoToBio}>Go to Bio</button>
      <br />
      <br />
  </div> 
  )
};

export default Bio;