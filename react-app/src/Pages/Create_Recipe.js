import React from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import { useState } from 'react';
import '../styles/create_recipe.css'
import '../Modules/IngredientListForm'
import IngredientList from '../Modules/IngredientListForm';
function Create_Recipe() {
const [title, setNewTitle] = useState("")
const [steps, setNewStep] = useState("")
const [ingredients, setNewIngredient] = useState("")

const maxLineLength = 30; // Set max line length

function handleTitle(e){
  e.preventDefault()
}

function handleSteps(e){
  e.preventDefault()
}

const updateIngredients = (updatedIngredients) => {
  setNewIngredient(updatedIngredients);
};


const handleSubmit = (event) => {
  event.preventDefault();
  console.log('Ingredients:', ingredients);  // Log ingredients to console
  //const apiUrl = 'http://localhost:8080/createRecipe';  // Replace with your server endpoint
  const apiUrl = 'http://172.16.122.26:8080/createRecipe';  // Replace with your server endpoint

  axios.post(apiUrl, { title, steps, ingredients })
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

// Function to split the steps into lines
const splitStepsIntoLines = (steps, maxLength) => {
  const lines = [];
  let currentLine = '';
  
  for (let i = 0; i < steps.length; i++) {
    if (steps[i] === '\n') {
      lines.push(currentLine);
      currentLine = '';
    } else {
      currentLine += steps[i];
      if (currentLine.length >= maxLength || i === steps.length - 1) {
        lines.push(currentLine);
        currentLine = '';
      }
    }
  }
  
  return lines;
};


const maxTitleLineLen = 28

const stepLines = splitStepsIntoLines(steps, maxLineLength);
const titleLines = splitStepsIntoLines(title, maxTitleLineLen);

  return (
    
    <>
  <Navbar />
  <div className="flex-container">
    <div className="center-container">
      <h1 className="header">Create a Custom Recipe</h1>
      <form className="form center" onSubmit={handleTitle}>
        <label htmlFor="Title" className="headerCompliment">
          Enter Recipe Title
        </label>
        <input
          value={title}
          onChange={(e) => setNewTitle(e.target.value)}
          type="text"
          id="title"
          maxlength="60"
        />
      </form>
      <form className="form center" onSubmit={handleSteps}>
        <label htmlFor="Steps" className="headerCompliment">
          Enter Recipe Steps
        </label>
        <textarea
          value={steps}
          onChange={(e) => setNewStep(e.target.value)}
          id="steps"
          rows={"8"}
          cols={"30"}
          maxLength={"255"}
        />
      </form>
      <h5 className="alignCenter">
        The steps are your own convention
        <br />
        Be as thorough or verbose as needed
        <br />
        You can label the steps, write a paragraph,
        <br />
        however you want to format the steps
      </h5>
      <IngredientList updateIngredients={updateIngredients} />
      <button onClick={handleSubmit}>Create Recipe</button>
    </div>
    <div className="displayRecipe">
      <div>
        <h3 className='alignCenter'>Title</h3>
        <ul>
          {titleLines.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
        <h3 className='alignCenter'>Steps</h3>
        <ul>
          {stepLines.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
        <h3 className='alignCenter'>Ingredients</h3>
        {ingredients && ingredients.map((ingredient, index) => (
  <div className='alignCenter iLMargin' key={index}>{ingredient}</div>
))}
      </div>
    </div>
  </div>
</>
  )
}

export default Create_Recipe;