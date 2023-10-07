import React, { useState } from 'react';
import '../styles/IngredientListForm.css'
const IngredientList = () => {
  const [ingredients, setIngredients] = useState(['']);

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  return (
    <div>
      <h2 className='alignCenter'>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            <input
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
        <button onClick={addIngredient}>Add Ingredient</button>
      </div>
    </div>
  );
  
}

export default IngredientList;