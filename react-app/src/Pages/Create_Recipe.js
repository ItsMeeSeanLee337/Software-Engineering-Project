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



function handleTitle(e){
  e.preventDefault()
}

function handleSteps(e){
  e.preventDefault()
}

//This is a function going to be passed as a prop to the child IngredientList
const updateIngredients = (updatedIngredients) => {
  setNewIngredient(updatedIngredients);
};


const handleSubmit = (event) => {
  event.preventDefault();
  const apiUrl = 'http://localhost:8080/createRecipe';  // Server Endpoint
  axios.post(apiUrl, { title, steps, ingredients }) // Using axios to send the variables to the server endpoint
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

  return (
    
    <div>
      <Navbar></Navbar>
      <div className='center container'>
        <h1 className='header'>Create a Custom Recipe</h1>
        <form className='form center'  onSubmit={handleTitle}>
          <label htmlFor='Title' className='headerCompliment'>Enter Recipe Title</label>
          <input value = {title} 
          onChange = {e => setNewTitle(e.target.value)} 
          type='text' 
          id="title" />
        </form>
        <form className='form center'  onSubmit={handleSteps}>
          <label htmlFor='Steps' className='headerCompliment'>Enter Recipe Steps</label>
          <textarea 
          value = {steps} 
          onChange = {e => setNewStep(e.target.value)} 
          id="steps"
          rows={"8"}
          cols={"30"}
          maxLength={"255"}
           />
        </form>
        <h5 className='alignCenter'>The steps are your own convention<br></br>
        Be as thorough or verbose as needed<br></br>
        You can label the steps, write a paragraph,<br></br> 
        however you want to format the steps</h5>
        <IngredientList updateIngredients={updateIngredients}/> {/* this passes the function to the child */}
        <button onClick={handleSubmit}>Create Recipe</button>
      </div>
    </div>
  )
}

export default Create_Recipe;