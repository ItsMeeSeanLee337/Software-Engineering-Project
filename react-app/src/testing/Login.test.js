import{render, screen, act,  cleanup, fireEvent, waitFor} from "@testing-library/react";
import renderer from "react-test-renderer"
import "@testing-library/jest-dom";
import {BrowserRouter as Router} from 'react-router-dom';
import Login from '../Pages/Login.js';


test('HandleSubmit with all fields', async () => {
  const logSpy = jest.spyOn(console, 'log');
  const url = `${window.location.pathname}`;
  window.history.pushState({}, '', url);
  await act(async () => {
    render(
      <Router>
        <Login />
      </Router>
    );
  });
    
    //get the text box by id
    const usernameField = screen.getByTestId("usernameField");

    //input the data
    fireEvent.change(usernameField, {target: {value: "testuser"}});

    //verify data was input
    expect(usernameField.value).toBe("testuser");

    //get the text box by id
    const passwordField = screen.getByTestId("passwordField");

    //input the data
    fireEvent.change(passwordField, {target: {value: "password123"}});

    //get the button
    const tryLoginButton = screen.getByTestId('tryLoginButton');

    //click the button
    fireEvent.click(tryLoginButton);
    await waitFor(() => {
        expect(logSpy).toHaveBeenCalledWith("Logged in!");
    });
    
});
