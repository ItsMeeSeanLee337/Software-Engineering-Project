import React, { useState } from 'react';
import '../styles/create_recipe.css'
const IngredientList = ({updateIngredients}) => {
  const [ingredients, setIngredients] = useState(['']);

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
    updateIngredients(updatedIngredients);  // Update parent's state with the updated ingredients
  };
  

  const addIngredient = () => {
    setIngredients(prevIngredients => [...prevIngredients, '']);
  };
  

  const removeIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
    updateIngredients(updatedIngredients);  // Update parent's state with the updated ingredients
  };


  return (
    <div>
      <h2 className='alignCenter'>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            <input
            id='ings'
              data-testid="ingField"
              type="text"
              placeholder={`Ingredient ${index + 1}`}
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
            />
            <button onClick={() => removeIngredient(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="button-container">
        <button id="addIngButton" onClick={addIngredient}>Add Ingredient</button>
      </div>
    </div>
  );
  
}

export default IngredientList;
