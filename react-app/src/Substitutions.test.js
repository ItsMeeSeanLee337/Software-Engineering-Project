import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from 'react-router-dom';
//import RecipeSubstitutes from '../../Components/RecipeSubstitutes';
//import RecipeSubstitutes from '../../Pages/Substitutions';
import RecipeSubstitutes from './Pages/Substitutions.js';
import axios from 'axios';

jest.mock('axios'); // Mock axios for testing

const mockedData = ["honey", "butter", "pork"];

test('RecipeSubstitutes component', async () => {
  axios.get.mockResolvedValue({ data: mockedData }); // Mock the axios.get method to resolve with your data

  await act(async () => {
    render(
      <MemoryRouter>
        <RecipeSubstitutes userId={123} />
      </MemoryRouter>
    );
  });

  // Check if the user ingredients are rendered
  for (const ingredient of mockedData) {
    const ingredientElement = screen.getByText(ingredient);
    expect(ingredientElement).toBeInTheDocument();
  }

  // Click on a user ingredient to select it
  const selectedIngredient = screen.getByText(mockedData[0]);
  act(() => {
    selectedIngredient.click();
  });

  // Check if the substitutes for the selected ingredient are rendered
  for (const substitute of mockedData) {
    const substituteElement = screen.getByText(substitute);
    expect(substituteElement).toBeInTheDocument();
  }
});

// Add more tests to cover different scenarios and interactions with the component.
