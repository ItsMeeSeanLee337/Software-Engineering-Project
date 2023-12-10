import{render, screen, act,  cleanup, fireEvent, waitFor} from "@testing-library/react";
import renderer from "react-test-renderer"
import "@testing-library/jest-dom";
import {BrowserRouter as Router} from 'react-router-dom';
import Display_Custom_Recipes from '../Pages/Display_Custom_Recipes.js';
import TaggedRecipes from '../Pages/TaggedRecipes.js';


//adding tag
test('Add tag to recipe', async () => {
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

  const tagButton = screen.getAllByTestId('tagButton');
  fireEvent.click(tagButton[0]);

  const tagTextField = screen.getAllByTestId('tagTextField');
  fireEvent.change(tagTextField[0], {target: {value: "tag1"}});
  
  const saveTagField = screen.getAllByTestId("saveTagField");
  fireEvent.click(saveTagField[0]);

  await waitFor(() =>{
    expect(logSpy).toHaveBeenCalledWith('Got recipes successfully');
    expect(logSpy).toHaveBeenCalledWith("Tag added!");
  }) 


});

//view tag
test('View tagged recipe', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testing`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <TaggedRecipes />
        </Router>
      );
    });


    await waitFor(() =>{
        expect(logSpy).toHaveBeenCalledWith('Succesfully got tagged recipes');
      }) 
  
    
    
    const specific_tag_Button = screen.getAllByTestId('specific_tag_Button');
    fireEvent.click(specific_tag_Button[0]);
  
  
    await waitFor(() =>{
        expect(logSpy).toHaveBeenCalledWith('Succesfully got tagged recipes');
    }) 
  
  
  });


  //drop tagged recipe
  test('Drop tagged recipe', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testing`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <TaggedRecipes />
        </Router>
      );
    });


    await waitFor(() =>{
        expect(logSpy).toHaveBeenCalledWith('Succesfully got tagged recipes');
      }) 
  
    
    
    const specific_tag_Button = screen.getAllByTestId('specific_tag_Button');
    fireEvent.click(specific_tag_Button[0]);
  
  
    await waitFor(() =>{
        expect(logSpy).toHaveBeenCalledWith('Succesfully got tagged recipes');
    }) 

    const removeTag = screen.getAllByTestId('remove_tag_Button');
    fireEvent.click(removeTag[0]);

    await waitFor(() =>{
      expect(logSpy).toHaveBeenCalledWith('Removed tagged recipe');
  }) 
  
  
  });

    




