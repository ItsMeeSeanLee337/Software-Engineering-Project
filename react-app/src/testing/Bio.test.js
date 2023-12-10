import{render, screen, act,  cleanup, fireEvent, waitFor} from "@testing-library/react";
import renderer from "react-test-renderer"
import "@testing-library/jest-dom";
import {BrowserRouter as Router} from 'react-router-dom';
import Create_Edit_Personal_Bio from '../Pages/Create_Edit_Personal_Bio.js';
import Display_Personal_Bio from '../Pages/Display_Personal_Bio.js';


test('Submit with all fields edited', async () => {
  const logSpy = jest.spyOn(console, 'log');
  const url = `${window.location.pathname}?data=testing`;
  window.history.pushState({}, '', url);
  await act(async () => {
    render(
      <Router>
        <Create_Edit_Personal_Bio />
      </Router>
    );
  });

    const img1Button = screen.getByTestId('img1Button');
    fireEvent.click(img1Button);
    
    //get the text box by id
    const aboutField = screen.getByTestId("aboutField");

    //input the data
    fireEvent.change(aboutField, {target: {value: "About me."}});

    //verify data was input
    expect(aboutField.value).toBe("About me.");


    //get the text box by id
    const fav_foodField = screen.getByTestId("fav_foodField");

    //input the data
    fireEvent.change(fav_foodField, {target: {value: "Food!"}});

    //verify data was input
    expect(fav_foodField.value).toBe("Food!");

    //get the text box by id
    const fav_recipeField = screen.getByTestId("fav_recipeField");

    //input the data
    fireEvent.change(fav_recipeField, {target: {value: "recipe"}});

    //verify data was input
    expect(fav_recipeField.value).toBe("recipe");

    //get the button
    const submitBioButton = screen.getByTestId('submitBioButton');

    //click the button
    fireEvent.click(submitBioButton);
    await waitFor(() => {
        expect(logSpy).toHaveBeenCalledWith('SUCCESS!');
});
    
});

test('Submit with editing only the image', async () => {
  const logSpy = jest.spyOn(console, 'log');
  const url = `${window.location.pathname}?data=testing`;
  window.history.pushState({}, '', url);
  await act(async () => {
    render(
      <Router>
        <Create_Edit_Personal_Bio />
      </Router>
    );
  });
  
  const img2Button = screen.getByTestId('img2Button');
  fireEvent.click(img2Button);

  const submitBioButton = screen.getByTestId('submitBioButton');
    
    //click the button
    fireEvent.click(submitBioButton);
    await waitFor(() => {
        expect(logSpy).toHaveBeenCalledWith('SUCCESS!');
});
    
});

test('Submit with editing all fields(part 1) then get from bio', async () => {
  const logSpy = jest.spyOn(console, 'log');
  const url = `${window.location.pathname}?data=testing`;
  window.history.pushState({}, '', url);
  await act(async () => {
    render(
      <Router>
        <Create_Edit_Personal_Bio />
      </Router>
    );
  });

  const no_img_Button = screen.getByTestId('no_img_Button');
  fireEvent.click(no_img_Button);
  
  //get the text box by id
  const aboutField = screen.getByTestId("aboutField");

  //input the data
  fireEvent.change(aboutField, {target: {value: "Edited about"}});

  //verify data was input
  expect(aboutField.value).toBe("Edited about");


  //get the text box by id
  const fav_foodField = screen.getByTestId("fav_foodField");

  //input the data
  fireEvent.change(fav_foodField, {target: {value: "Edited food"}});

  //verify data was input
  expect(fav_foodField.value).toBe("Edited food");

  //get the text box by id
  const fav_recipeField = screen.getByTestId("fav_recipeField");

  //input the data
  fireEvent.change(fav_recipeField, {target: {value: "Edited recipe"}});

  //verify data was input
  expect(fav_recipeField.value).toBe("Edited recipe");

  //get the button
  const submitBioButton = screen.getByTestId('submitBioButton');

  //click the button
  fireEvent.click(submitBioButton);
  await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith('SUCCESS!');
    
});

});

test('View Bio from inputs from (part 1)', async () => {
  const logSpy = jest.spyOn(console, 'log');
  const url = `${window.location.pathname}?data=testing`;
  window.history.pushState({}, '', url);
  await act(async () => {
    render(
      <Router>
        <Display_Personal_Bio />
      </Router>
    );
  });

  await waitFor(() =>{
    expect(logSpy).toHaveBeenCalledWith('Got Bio information succesfully!');
  }) 


});




