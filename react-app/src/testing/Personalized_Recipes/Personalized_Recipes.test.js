import{render, screen, act,  cleanup, fireEvent, waitFor, findByTestId} from "@testing-library/react";
import renderer from "react-test-renderer"
import "@testing-library/jest-dom";
import {BrowserRouter as Router} from 'react-router-dom';
import Personalized_Recipes from "../../Pages/Personalized_Recipes";


test('FetchData testing', async () => {
  const logSpy = jest.spyOn(console, 'log');
  const url = `${window.location.pathname}?data=testing`;
  window.history.pushState({}, '', url);
  await act(async () => {
    render(
      <Router>
        <Personalized_Recipes/>
      </Router>
    );
  });
    
    await waitFor(() =>{
      //Indicates that the initial ingredients were found
      expect(logSpy).toHaveBeenCalledWith('Ingredients were fetched');
    }) 
    
});

test('Fetch Top Ingredients Again testing', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testing`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <Personalized_Recipes/>
        </Router>
      );
    });
      
    await waitFor(() =>{
        //Get the button to generate new ingredients
        const genereateNewButton = screen.getByTestId("genereateNewButton");
        //Click the button to get new ingredients
        fireEvent.click(genereateNewButton);
    })
      await waitFor(() =>{
        //Indicates that the initial ingredients were found
        expect(logSpy).toHaveBeenCalledWith('Ingredients were fetched');
        //Indicates that new ingredients were successfully generated
        expect(logSpy).toHaveBeenCalledWith('Fetched new ingredients');
      }) 
      
  });

  test('handleIngredientSearch testing with one ingredient', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testUser`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <Personalized_Recipes/>
        </Router>
      );
    });
      
    await waitFor(() =>{
        //Select an ingredient from the list
        const input1 = screen.getByTestId("input1");

        expect(input1).not.toBeChecked();

        //click the ingredient
        fireEvent.click(input1);

        expect(input1).toBeChecked();

        //Get the button to generate new ingredients
        const ingredientSearchButton = screen.getByTestId("ingredientSearchButton");
        //Click the button to get new ingredients
        fireEvent.click(ingredientSearchButton);
    })

      await waitFor(() =>{
        //Indicates that the initial ingredients were found
        expect(logSpy).toHaveBeenCalledWith('Ingredients were fetched');
        //Indicates that new ingredients were successfully generated
        expect(logSpy).toHaveBeenCalledWith('Got ingredient search');
      }) 
      
  });

  test('handleIngredientSearch testing with two ingredient', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testUser`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <Personalized_Recipes/>
        </Router>
      );
    });
      
    await waitFor(() =>{
        //Select an ingredient from the list
        const input1 = screen.getByTestId("input1");

        expect(input1).not.toBeChecked();

        //click the ingredient
        fireEvent.click(input1);

        expect(input1).toBeChecked();

         //Select an ingredient from the list
         const input2 = screen.getByTestId("input2");

         expect(input2).not.toBeChecked();
 
         //click the ingredient
         fireEvent.click(input2);
 
         expect(input2).toBeChecked();

        //Get the button to generate new ingredients
        const ingredientSearchButton = screen.getByTestId("ingredientSearchButton");
        //Click the button to get new ingredients
        fireEvent.click(ingredientSearchButton);
    })

      await waitFor(() =>{
        //Indicates that the initial ingredients were found
        expect(logSpy).toHaveBeenCalledWith('Ingredients were fetched');
        //Indicates that new ingredients were successfully generated
        expect(logSpy).toHaveBeenCalledWith('Got ingredient search');
      }) 
      
  });

  test('handleIngredientSearch testing with no ingredients', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testUser`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <Personalized_Recipes/>
        </Router>
      );
    });
      
    await waitFor(() =>{

        //Get the button to generate new ingredients
        const ingredientSearchButton = screen.getByTestId("ingredientSearchButton");
        //Click the button to get new ingredients
        fireEvent.click(ingredientSearchButton);
    })

      await waitFor(() =>{
        //Indicates that the initial ingredients were found
        expect(logSpy).toHaveBeenCalledWith('Ingredients were fetched');
        //Indicates that new ingredients were successfully generated
        expect(logSpy).toHaveBeenCalledWith('No ingredients selected');
      }) 
      
  });

  test('handleRandomSearch testing', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testing`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <Personalized_Recipes/>
        </Router>
      );
    });
      
    await waitFor(() =>{

        //Get the button to generate new ingredients
        const randomButton = screen.getByTestId("randomButton");
        //Click the button to get new ingredients
        fireEvent.click(randomButton);
    })

      await waitFor(() =>{
        //Indicates that the initial ingredients were found
        expect(logSpy).toHaveBeenCalledWith('Ingredients were fetched');
        //Indicates that new ingredients were successfully generated
        expect(logSpy).toHaveBeenCalledWith('Random recipes fetched');
      }, { timeout: 5000 }) 
      
  });

  //Only test using random to ensure a recipe is genereated for testing
  //Ingredient search can have no generations messing up the
  test('saveRecipeFinal testing ', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testing`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <Personalized_Recipes/>
        </Router>
      );
    });
      
    await waitFor(() =>{
        //Get the button to generate new ingredients
        const randomButton = screen.getByTestId("randomButton");
        //Click the button to get new ingredients
        fireEvent.click(randomButton);
        
        })
        await waitFor(() =>{
            //Get the recipes that were generated
            const recipeList = screen.getAllByTestId("recipeList");

            //make sure list isn't empty
            expect(recipeList.length).toBeGreaterThan(0);

            //Click the button to get new ingredients
            fireEvent.click(recipeList[0]);
        },{ timeout: 5000 })

   await waitFor(() =>{
     //Indicates that the initial ingredients were found
     expect(logSpy).toHaveBeenCalledWith('Ingredients were fetched');
     //Indicates that new ingredients were successfully generated
     expect(logSpy).toHaveBeenCalledWith('Random recipes fetched');
     //Indicates the recipe was saved
     expect(logSpy).toHaveBeenCalledWith('Recipe saved');

   },{ timeout: 10000 }) 
      
  });
