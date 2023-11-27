import{render, screen, act,  cleanup, fireEvent, waitFor} from "@testing-library/react";
import renderer from "react-test-renderer"
import "@testing-library/jest-dom";
import {BrowserRouter as Router} from 'react-router-dom';
import Display_Maker_Recipes from "../../Pages/Display_Maker_Recipes";


test('FetchData testing', async () => {
  const logSpy = jest.spyOn(console, 'log');
  const url = `${window.location.pathname}?data=testing`;
  window.history.pushState({}, '', url);
  await act(async () => {
    render(
      <Router>
        <Display_Maker_Recipes/>
      </Router>
    );
  });
    
    await waitFor(() =>{
      expect(logSpy).toHaveBeenCalledWith('Got recipes successfully');
    }) 
    
});

test('handleSave testing', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testing`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <Display_Maker_Recipes/>
        </Router>
      );
    });
      
    await waitFor(() =>{
      //Get the show notes button
      const saveRecipeButton = screen.getAllByTestId('saveRecipeButton');
      //click the button
      fireEvent.click(saveRecipeButton[0]);
    })
    
    //Get both the okay from fetch recipes and save notes
    await waitFor(() =>{
        //Indicates recipes were loaded correctly
        expect(logSpy).toHaveBeenCalledWith('Got recipes successfully');
        //Indicated the title from the recipe being saved is filled
        expect(logSpy).toHaveBeenCalledWith("Title is filled");
        //Indicated the Description from the recipe being saved is filled
        expect(logSpy).toHaveBeenCalledWith("Description is filled");
        //Indicated the Ingredients from the recipe being saved is filled
        expect(logSpy).toHaveBeenCalledWith("Ingredients are filled");
    }) 
      
  });

test('saveRecipe testing', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testing`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <Display_Maker_Recipes/>
        </Router>
      );
    });
      
    await waitFor(() =>{
      //Get the show notes button
      const saveRecipeButton = screen.getAllByTestId('saveRecipeButton');
      //click the button
      fireEvent.click(saveRecipeButton[0]);
    })
    
    //Get both the okay from fetch recipes and save notes
    await waitFor(() =>{
       //Indicates recipes were loaded correctly
       expect(logSpy).toHaveBeenCalledWith('Got recipes successfully');
       //Indicated the title from the recipe being saved is filled
       expect(logSpy).toHaveBeenCalledWith("Title is filled");
       //Indicated the Description from the recipe being saved is filled
       expect(logSpy).toHaveBeenCalledWith("Description is filled");
       //Indicated the Ingredients from the recipe being saved is filled
       expect(logSpy).toHaveBeenCalledWith("Ingredients are filled");
       //Indicated the server saved the recipe successfully and it go to this step
       expect(logSpy).toHaveBeenCalledWith("Recipe Saved To Library");
    }) 
      
  });