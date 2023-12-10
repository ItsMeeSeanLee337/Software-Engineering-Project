import{render, screen, act,  cleanup, fireEvent, waitFor} from "@testing-library/react";
import renderer from "react-test-renderer"
import "@testing-library/jest-dom";
import {BrowserRouter as Router} from 'react-router-dom';
//import RecipeSubstitutes from '../../Components/RecipeSubstitutes';
//import RecipeSubstitutes from '../../Pages/Substitutions';
import Substitutions from '../Pages/Substitutions'

/*jest.mock('axios'); // Mock axios for testing

const mockedData = ["honey", "butter", "pork"];

/*test('RecipeSubstitutes component', async () => {
  axios.get.mockResolvedValue({ data: mockedData }); // Mock the axios.get method to resolve with your data

  await act(async () => {
    render(
      <MemoryRouter>
        <RecipeSubstitutes userId={123} />
      </MemoryRouter>
    );
  });*/
  test('Submit with all fields edited', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testing`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <Substitutions />
        </Router>
      );});


      //get thebutton

   //const tryIngredientButton = screen.getByTestId("ingredient button");


    //click the button
    
    await waitFor(() => {
        expect(logSpy).toHaveBeenCalledWith("received substitutions");
    },{timeout:2000});

      // Check if the user ingredients are rendered
  /*for (const ingredient of mockedData) {
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
  }*/
});

