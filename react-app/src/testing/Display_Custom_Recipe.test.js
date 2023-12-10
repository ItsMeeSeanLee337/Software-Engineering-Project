import{render, screen, act,  cleanup, fireEvent, waitFor} from "@testing-library/react";
import renderer from "react-test-renderer"
import "@testing-library/jest-dom";
import {BrowserRouter as Router} from 'react-router-dom';
import Display_Custom_Recipes from "../Pages/Display_Custom_Recipes";


test('FetchData testing', async () => {
  const logSpy = jest.spyOn(console, 'log');
  const url = `${window.location.pathname}?data=testing`;
  window.history.pushState({}, '', url);
  await act(async () => {
    render(
      <Router>
        <Display_Custom_Recipes/>
      </Router>
    );
  });
    
    await waitFor(() =>{
      expect(logSpy).toHaveBeenCalledWith('Got recipes successfully');
    }) 
    
});

test('getNotes testing', async () => {
  const logSpy = jest.spyOn(console, 'log');
  const url = `${window.location.pathname}?data=testing`;
  window.history.pushState({}, '', url);
  await act(async () => {
    render(
      <Router>
        <Display_Custom_Recipes/>
      </Router>
    );
  });
    
  await waitFor(() =>{
    //Get the show notes button
    const showNotesButton = screen.getAllByTestId('showNotesButton');
    //click the button
    fireEvent.click(showNotesButton[0]);
  })
  
  //Get both the okay from fetch recipes and save notes
  await waitFor(() =>{
    expect(logSpy).toHaveBeenCalledWith('Got recipes successfully');
    expect(logSpy).toHaveBeenCalledWith("Got notes");
  }) 
    
});
/* 
test('saveNotes testing', async () => {
  const logSpy = jest.spyOn(console, 'log');
  const url = `${window.location.pathname}?data=testing`;
  window.history.pushState({}, '', url);
  await act(async () => {
    render(
      <Router>
        <Display_Custom_Recipes/>
      </Router>
    );
  });
    
  
    //Get the show notes button
    const showNotesButton = screen.getAllByTestId('showNotesButton');
    //click the button
    fireEvent.click(showNotesButton[0]);

    //get the notes text area
    const notesTextArea = screen.getAllByTestId('notesTextArea');

    //type some notes in there
    fireEvent.change(notesTextArea[0], {target: {value: "testing notes"}});

    //get the save notes button
    const saveNotesButton = screen.getAllByTestId("saveNotesButton");

    //click button to save the notes
    fireEvent.click(saveNotesButton[0]);
  
  
  //Get both the okay from fetch recipes and save notes
  await waitFor(() =>{
    expect(logSpy).toHaveBeenCalledWith('Got recipes successfully');
    expect(logSpy).toHaveBeenCalledWith("Got notes");
    expect(logSpy).toHaveBeenCalledWith("Response:", "Notes Updated");
  }) 
    
}); */