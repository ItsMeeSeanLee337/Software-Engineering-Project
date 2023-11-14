import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from './Navbar';
function Personalized_Recipes() {
    const urlParams = new URLSearchParams(window.location.search);
    const dataToSend = urlParams.get('data');
    const [top1Ingredient, setTop1] = useState('');
    const [top2Ingredient, setTop2] = useState('');
    const [top3Ingredient, setTop3] = useState('');
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);

  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
  };
  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };
  const handleCheckboxChange3 = () => {
    setIsChecked3(!isChecked3);
  };

    let response;

//Get the ingredients on page loading
useEffect(() => {
    const fetchTopIngredients = async () => {
      
      try {
        const apiUrl = `http://172.16.122.26:8080/topIngredients/${dataToSend}`;

        response = await axios.get(apiUrl);
        console.log('Response:', response.data);
        setTop1(response.data[0].ingredient)
        setTop2(response.data[1].ingredient)
        setTop3(response.data[2].ingredient)
       // setRecipes(response.data)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTopIngredients();
  }, []); // Empty dependency array ensures this effect runs once on mount


  return (
    <>
    <Navbar></Navbar>
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", textAlign: "center"}}>
    <h1>Personalized Recipes</h1>
    <div>
        <h2>Your Top 3 Ingredients</h2>
        <div style={{ display: "flex", justifyContent: "center", alignContent: "center", textAlign: "center" }}>
        <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
      <li
        id='listItem1'
        style={{
          display: "flex",
          alignItems: "center",
          margin: "0 10px",
          padding: "5px",
          border: `2px solid ${isChecked1 ? '#008000' : '#ff0000'}`,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
        onMouseOver={() => {
          document.querySelector("#listItem1").style.border = "2px solid #ff0000";
        }}
        onMouseOut={() => {
          document.querySelector("#listItem1").style.border = `2px solid ${isChecked1 ? '#008000' : '#ff0000'}`;
        }}
      >
        <input
          type="checkbox"
          style={{ marginRight: "5px" }}
          checked={isChecked1}
          onChange={handleCheckboxChange1}
        />
        {top1Ingredient}
      </li>
      <li
        id='listItem2'
        style={{
          display: "flex",
          alignItems: "center",
          margin: "0 10px",
          padding: "5px",
          border: `2px solid ${isChecked2 ? '#008000' : '#ff0000'}`,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
        onMouseOver={() => {
          document.querySelector("#listItem2").style.border = "2px solid #ff0000";
        }}
        onMouseOut={() => {
          document.querySelector("#listItem2").style.border = `2px solid ${isChecked2 ? '#008000' : '#ff0000'}`;
        }}
      >
        <input
          type="checkbox"
          style={{ marginRight: "5px" }}
          checked={isChecked2}
          onChange={handleCheckboxChange2}
        />
        {top2Ingredient}
      </li>
      <li
        id='listItem3'
        style={{
          display: "flex",
          alignItems: "center",
          margin: "0 10px",
          padding: "5px",
          border: `2px solid ${isChecked3 ? '#008000' : '#ff0000'}`,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
        onMouseOver={() => {
          document.querySelector("#listItem3").style.border = "2px solid #ff0000";
        }}
        onMouseOut={() => {
          document.querySelector("#listItem3").style.border = `2px solid ${isChecked3 ? '#008000' : '#ff0000'}`;
        }}
      >
        <input
          type="checkbox"
          style={{ marginRight: "5px" }}
          checked={isChecked3}
          onChange={handleCheckboxChange3}
        />
        {top3Ingredient}
      </li>

      {/* Repeat similar code for other list items */}
    </ul>
            </div>
    </div>
    </div>
    </>
  )
}

export default Personalized_Recipes