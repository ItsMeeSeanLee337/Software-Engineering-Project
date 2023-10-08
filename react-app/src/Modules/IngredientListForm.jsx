import React, { useState } from 'react';
import '../styles/IngredientListForm.css'
const IngredientList = ({updateIngredients}) => { //({updateIngredients}) is the prop inherited from the parent
  const [ingredients, setIngredients] = useState(['']);


  //Any time something is typed, this function will run and update the var state
  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
    //Basically passing the variable to the parent/calling the function in the parent with this child's state
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
