import{render, screen, act,  cleanup, fireEvent, waitFor} from "@testing-library/react";
import renderer from "react-test-renderer"
import "@testing-library/jest-dom";
import {BrowserRouter as Router} from 'react-router-dom';
import Display_Custom_Recipes from '../Pages/Display_Custom_Recipes.js';
import MealPlanner from "../Pages/MealPlanner.js";



//adding meal to meal planner
test('Add meal to meal planner', async () => {
  const logSpy = jest.spyOn(console, 'log');
  const url = `${window.location.pathname}?data=testing`;
  window.history.pushState({}, '', url);
  await act(async () => {
    render(
      <Router>
        <Display_Custom_Recipes />
      </Router>
    );
  });

  await waitFor(() =>{
    expect(logSpy).toHaveBeenCalledWith('Got recipes successfully');
})

  const mealPlanButton = screen.getAllByTestId('mealPlanButton');
  fireEvent.click(mealPlanButton[0]);

  

  await waitFor(() =>{
    expect(logSpy).toHaveBeenCalledWith('Got recipes successfully');
    expect(logSpy).toHaveBeenCalledWith("Added recipie to meal planner!");
  }) 


});



//adding the same meal to the meal planner
test('Add meal thats already in the meal planner', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testing`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <Display_Custom_Recipes />
        </Router>
      );
    });
  
    await waitFor(() =>{
      expect(logSpy).toHaveBeenCalledWith('Got recipes successfully');
    }) 
  
    const mealPlanButton = screen.getAllByTestId('mealPlanButton');
    fireEvent.click(mealPlanButton[0]);
  
  
    await waitFor(() =>{
      expect(logSpy).toHaveBeenCalledWith('Got recipes successfully');
      expect(logSpy).toHaveBeenCalledWith("Meal already in planner!");
    }) 
  
  
  });



  
//view on meal planner and add to day 
test('View meal plan recipes and add to a day', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testing`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <MealPlanner />
        </Router>
      );
    });


    await waitFor(() =>{
        expect(logSpy).toHaveBeenCalledWith('Got meal planned recipes');
      }) 
  
    
    const showMealPlannedMeals = screen.getAllByTestId('showMealPlannedMeals');
    fireEvent.click(showMealPlannedMeals[0]);

    const addDayButton = screen.getAllByTestId('addDayButton');
    fireEvent.click(addDayButton[0]);

    const dayTextField = screen.getAllByTestId('dayTextField');
    fireEvent.change(dayTextField[0], {target: {value: "monday"}});
  
    const saveDayButton = screen.getAllByTestId("saveDayButton");
    fireEvent.click(saveDayButton[0]);

    await waitFor(() =>{
        expect(logSpy).toHaveBeenCalledWith('Got meal planned recipes');
        expect(logSpy).toHaveBeenCalledWith("Succesfully added recipe to ", "monday");
    }) 
  
  
  });

  test('View meal plan recipes and add to same day', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testing`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <MealPlanner />
        </Router>
      );
    });


    await waitFor(() =>{
        expect(logSpy).toHaveBeenCalledWith('Got meal planned recipes');
      }) 
  
    
    const showMealPlannedMeals = screen.getAllByTestId('showMealPlannedMeals');
    fireEvent.click(showMealPlannedMeals[0]);

    const addDayButton = screen.getAllByTestId('addDayButton');
    fireEvent.click(addDayButton[0]);

    const dayTextField = screen.getAllByTestId('dayTextField');
    fireEvent.change(dayTextField[0], {target: {value: "monday"}});
  
    const saveDayButton = screen.getAllByTestId("saveDayButton");
    fireEvent.click(saveDayButton[0]);

    await waitFor(() =>{
        expect(logSpy).toHaveBeenCalledWith('Got meal planned recipes');
        expect(logSpy).toHaveBeenCalledWith('Enter a valid day!');
    }) 
  
  
  });
 
  test('View meal plan recipes and add to another day (multiple days with same meal)', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testing`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <MealPlanner />
        </Router>
      );
    });


    await waitFor(() =>{
        expect(logSpy).toHaveBeenCalledWith('Got meal planned recipes');
      }) 
  
    
    const showMealPlannedMeals = screen.getAllByTestId('showMealPlannedMeals');
    fireEvent.click(showMealPlannedMeals[0]);

    const addDayButton = screen.getAllByTestId('addDayButton');
    fireEvent.click(addDayButton[0]);

    const dayTextField = screen.getAllByTestId('dayTextField');
    fireEvent.change(dayTextField[0], {target: {value: "friday"}});
  
    const saveDayButton = screen.getAllByTestId("saveDayButton");
    fireEvent.click(saveDayButton[0]);

    await waitFor(() =>{
        expect(logSpy).toHaveBeenCalledWith('Got meal planned recipes');
        expect(logSpy).toHaveBeenCalledWith("Succesfully added recipe to ", "friday");
    }) 
  
  
  });

  test('View meal plan recipes and add to invalid day', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testing`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <MealPlanner />
        </Router>
      );
    });


    await waitFor(() =>{
        expect(logSpy).toHaveBeenCalledWith('Got meal planned recipes');
      }) 
  
    
    const showMealPlannedMeals = screen.getAllByTestId('showMealPlannedMeals');
    fireEvent.click(showMealPlannedMeals[0]);

    const addDayButton = screen.getAllByTestId('addDayButton');
    fireEvent.click(addDayButton[0]);

    const dayTextField = screen.getAllByTestId('dayTextField');
    fireEvent.change(dayTextField[0], {target: {value: "tuesdaye"}});
  
    const saveDayButton = screen.getAllByTestId("saveDayButton");
    fireEvent.click(saveDayButton[0]);

    await waitFor(() =>{
        expect(logSpy).toHaveBeenCalledWith('Got meal planned recipes');
        expect(logSpy).toHaveBeenCalledWith('Enter a valid day!');
    }) 
  
  
  });
 
  //view meal on day
test('Select day and view recipe', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testing`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <MealPlanner />
        </Router>
      );
    });


    await waitFor(() =>{
        expect(logSpy).toHaveBeenCalledWith('Got meal planned recipes');
      }) 
  
    
    const clickDayButtonM = screen.getAllByTestId('clickDayButton');
    fireEvent.click(clickDayButtonM[0]);

    const clickDayButtonF = screen.getAllByTestId('clickDayButton');
    fireEvent.click(clickDayButtonF[4]);

    await waitFor(() =>{
        expect(logSpy).toHaveBeenCalledWith('Got meal planned recipes');
        expect(logSpy).toHaveBeenCalledWith("Got recipes for ", "Monday");
        expect(logSpy).toHaveBeenCalledWith("Got recipes for ", "Friday");
        
    }) 
  
  
  });
  


//drop meal for monday 
test('Drop the meal for monday', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testing`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <MealPlanner />
        </Router>
      );
    });


    await waitFor(() =>{
        expect(logSpy).toHaveBeenCalledWith('Got meal planned recipes');
      }) 
  
    
    const clickDayButtonM = screen.getAllByTestId('clickDayButton');
    fireEvent.click(clickDayButtonM[0]);

    await waitFor(() =>{
        expect(logSpy).toHaveBeenCalledWith("Got recipes for ", "Monday");
    }) 

    const dropM = screen.getAllByTestId('dropDayMealButton');
    fireEvent.click(dropM[0]);

    await waitFor(() =>{
        expect(logSpy).toHaveBeenCalledWith("Succesfully dropped meal for ", "Monday");
    }) 

  });



  test('Drop the meal from meal planner', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testing`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <MealPlanner />
        </Router>
      );
    });


    await waitFor(() =>{
        expect(logSpy).toHaveBeenCalledWith('Got meal planned recipes');
      }) 
  
    const showMealPlannedMeals = screen.getAllByTestId('showMealPlannedMeals');
    fireEvent.click(showMealPlannedMeals[0]);
  
    const dropMealButton = screen.getAllByTestId('dropMealButton');
    fireEvent.click(dropMealButton[0]);
    
    await waitFor(() =>{
        expect(logSpy).toHaveBeenCalledWith("Succesfully dropped meal from meal planner!");
    }) 

  });






  

    




