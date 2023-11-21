import{render, screen, act,  cleanup, fireEvent, waitFor} from "@testing-library/react";
import renderer from "react-test-renderer"
import "@testing-library/jest-dom";
import {BrowserRouter as Router} from 'react-router-dom';
import Create_Recipe from '../../Pages/Create_Recipe.js';


test('HandleSubmit with all fields', async () => {
  const logSpy = jest.spyOn(console, 'log');
  const url = `${window.location.pathname}?data=testing`;
  window.history.pushState({}, '', url);
  await act(async () => {
    render(
      <Router>
        <Create_Recipe />
      </Router>
    );
  });
    
    //get the text box by id
    const titleField = screen.getByTestId("titleField");

    //input the data
    fireEvent.change(titleField, {target: {value: "Test Title"}});

    //verify data was input
    expect(titleField.value).toBe("Test Title");

    //get the text box by id
    const stepsField = screen.getByTestId("stepsField");

    //input the data
    fireEvent.change(stepsField, {target: {value: "Test Steps"}});

    //verify data was input
    expect(stepsField.value).toBe("Test Steps");

    //get the text box by id
    const ingField = screen.getByTestId("ingField");

    //input the data
    fireEvent.change(ingField, {target: {value: "Test Ing"}});

    //verify data was input
    expect(ingField.value).toBe("Test Ing");

    //get the button
    const addRecipeButton = screen.getByTestId('addRecipeButton');

    //click the button
    fireEvent.click(addRecipeButton);
    await waitFor(() =>{
      expect(logSpy).toHaveBeenCalledWith('Recipe successfully inserted');
    }) 
    
});

test('HandleSubmit Title field missing', async () => {
  const logSpy = jest.spyOn(console, 'log');
  const url = `${window.location.pathname}?data=testing`;
  window.history.pushState({}, '', url);
  await act(async () => {
    render(
      <Router>
        <Create_Recipe />
      </Router>
    );
  });
    
    //get the text box by id
    const titleField = screen.getByTestId("titleField");

    //verify data was input
    expect(titleField.value).toBe("");

    //get the text box by id
    const stepsField = screen.getByTestId("stepsField");

    //input the data
    fireEvent.change(stepsField, {target: {value: "Test Steps"}});

    //verify data was input
    expect(stepsField.value).toBe("Test Steps");

    //get the text box by id
    const ingField = screen.getByTestId("ingField");

    //input the data
    fireEvent.change(ingField, {target: {value: "Test Ing"}});

    //verify data was input
    expect(ingField.value).toBe("Test Ing");

    //get the button
    const addRecipeButton = screen.getByTestId('addRecipeButton');

    //click the button
    fireEvent.click(addRecipeButton);
    await waitFor(() =>{
      expect(logSpy).toHaveBeenCalledWith('Field is empty');
    }) 
    
});

test('HandleSubmit Steps field missing', async () => {
  const logSpy = jest.spyOn(console, 'log');
  const url = `${window.location.pathname}?data=testing`;
  window.history.pushState({}, '', url);
  await act(async () => {
    render(
      <Router>
        <Create_Recipe />
      </Router>
    );
  });
    
    //get the text box by id
    const titleField = screen.getByTestId("titleField");

    fireEvent.change(titleField, {target: {value: "Test Title"}});

    //verify data was input
    expect(titleField.value).toBe("Test Title");

    //get the text box by id
    const stepsField = screen.getByTestId("stepsField");

   //Keep Steps blank

    //verify data was input
    expect(stepsField.value).toBe("");

    //get the text box by id
    const ingField = screen.getByTestId("ingField");

    //input the data
    fireEvent.change(ingField, {target: {value: "Test Ing"}});

    //verify data was input
    expect(ingField.value).toBe("Test Ing");

    //get the button
    const addRecipeButton = screen.getByTestId('addRecipeButton');

    //click the button
    fireEvent.click(addRecipeButton);
    await waitFor(() =>{
      expect(logSpy).toHaveBeenCalledWith('Field is empty');
    }) 
    
});

test('HandleSubmit Ingredients field missing', async () => {
  const logSpy = jest.spyOn(console, 'log');
  const url = `${window.location.pathname}?data=testing`;
  window.history.pushState({}, '', url);
  await act(async () => {
    render(
      <Router>
        <Create_Recipe />
      </Router>
    );
  });
    
    //get the text box by id
    const titleField = screen.getByTestId("titleField");

    //input the data
    fireEvent.change(titleField, {target: {value: "Test Title"}});

    //verify data was input
    expect(titleField.value).toBe("Test Title");

    //get the text box by id
    const stepsField = screen.getByTestId("stepsField");

    //input the data
    fireEvent.change(stepsField, {target: {value: "Test Steps"}});

    //verify data was input
    expect(stepsField.value).toBe("Test Steps");

    //get the text box by id
    const ingField = screen.getByTestId("ingField");

    //leave ingredients blank
   
    //verify data was not input
    expect(ingField.value).toBe("");

    //get the button
    const addRecipeButton = screen.getByTestId('addRecipeButton');

    //click the button
    fireEvent.click(addRecipeButton);
    await waitFor(() =>{
      expect(logSpy).toHaveBeenCalledWith('Field is empty');
    }) 
    
});

test('HandleSubmit All fields missing', async () => {
  const logSpy = jest.spyOn(console, 'log');
  const url = `${window.location.pathname}?data=testing`;
  window.history.pushState({}, '', url);
  await act(async () => {
    render(
      <Router>
        <Create_Recipe />
      </Router>
    );
  });
    
    //get the text box by id
    const titleField = screen.getByTestId("titleField");

    //input the data blank

    //verify data was not input
    expect(titleField.value).toBe("");

    //get the text box by id
    const stepsField = screen.getByTestId("stepsField");

    //input the data blank

    //verify data was not input
    expect(stepsField.value).toBe("");

    //get the text box by id
    const ingField = screen.getByTestId("ingField");

    //leave ingredients blank
   
    //verify data was not input
    expect(ingField.value).toBe("");

    //get the button
    const addRecipeButton = screen.getByTestId('addRecipeButton');

    //click the button
    fireEvent.click(addRecipeButton);
    await waitFor(() =>{
      expect(logSpy).toHaveBeenCalledWith('Field is empty');
    }) 
    
});