import{render, screen, act,  cleanup, fireEvent, waitFor} from "@testing-library/react";
import renderer from "react-test-renderer"
import "@testing-library/jest-dom";
import {BrowserRouter as Router} from 'react-router-dom';
//import RecipeSubstitutes from '../../Components/RecipeSubstitutes';
//import RecipeSubstitutes from '../../Pages/Substitutions';
import Substitutions from '../Pages/Substitutions'


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

    //get the button
    const tryIngredientButton = screen.getByTestId('ingredient button');


    //click the button
    
    await waitFor(() => {
        expect(logSpy).toHaveBeenCalledWith("received substitutions");
    },{timeout:2000});
});

