import { render, screen, act, cleanup, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from 'react-router-dom';
//import HomePage from "../../Pages/HomePage"; 
import HomePage from "./Pages/HomePage";

/*test('Displays featured custom recipes', async () => {
  // Mock console.log
  const logSpy = jest.spyOn(console, 'log');

  // Mock the fetch function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ Title: 'Recipe 1', Description: 'Description 1' }]),
    })
  );*/
  test('Submit with all fields edited', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testing`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <HomePage />
        </Router>
      );
    });

  await act(async () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    // Assert that the welcome message is displayed
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome!');

  // Assert that the "Featured Custom Recipes" section is displayed
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Featured Custom Recipes');

  // Assert that the featured custom recipes are displayed
  expect(screen.getByText('Recipe 1')).toBeInTheDocument();
  expect(screen.getByText('Description 1')).toBeInTheDocument();

  // Assert that the fetch message is logged
  expect(logSpy).toHaveBeenCalledWith('Random Recipes:', [{ Title: 'Recipe 1', Description: 'Description 1' }]);
});
  });

  

// Add other test cases as needed based on your application's functionality
