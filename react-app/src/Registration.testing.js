import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Registration from '../../Pages/Registration';

test('HandleSubmit with all fields', async () => {
  const logSpy = jest.spyOn(console, 'log');
  const url = `${window.location.pathname}`;
  window.history.pushState({}, '', url);
  await act(async () => {
    render(
      <Router>
        <Registration />
      </Router>
    );
  });

  // get the text box by id
  const firstnameField = screen.getByLabelText(/Firstname/i);

  // input the data
  fireEvent.change(firstnameField, { target: { value: "John" } });

  // verify data was input
  expect(firstnameField.value).toBe("John");

  // get the text box by id
  const lastnameField = screen.getByLabelText(/Lastname/i);

  // input the data
  fireEvent.change(lastnameField, { target: { value: "Doe" } });

  // get the text box by id
  const usernameField = screen.getByLabelText(/Username/i);

  // input the data
  fireEvent.change(usernameField, { target: { value: "john_doe" } });

  // get the text box by id
  const passwordField = screen.getByLabelText(/Password/i);

  // input the data
  fireEvent.change(passwordField, { target: { value: "password123" } });

  // get the text box by id
  const emailField = screen.getByLabelText(/Email/i);

  // input the data
  fireEvent.change(emailField, { target: { value: "john@example.com" } });

  // get the checkbox by id
  const checkbox = screen.getByLabelText(/Recipe Maker/i);

  // check the checkbox
  fireEvent.click(checkbox);

  // get the button
  const registerButton = screen.getByTestId('registerButton');

  // click the button
  fireEvent.click(registerButton);
  await waitFor(() => {
    expect(logSpy).toHaveBeenCalledWith("Submitted!");
    expect(logSpy).toHaveBeenCalledWith("firstname", "John");
    expect(logSpy).toHaveBeenCalledWith("lastname", "Doe");
    expect(logSpy).toHaveBeenCalledWith("username", "john_doe");
    expect(logSpy).toHaveBeenCalledWith("password", "password123");
    expect(logSpy).toHaveBeenCalledWith("email", "john@example.com");
    expect(logSpy).toHaveBeenCalledWith("isMaker ", true);
  });
});
