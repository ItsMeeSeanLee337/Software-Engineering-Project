// Import necessary modules and functions
import axios from 'axios';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const handleSubmit = require("../Pages/Create_Recipe.js")
const sum = require("../Pages/Create_Recipe.js")

// Mock axios to control its behavior during the test
jest.mock('axios');
 
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1,2)).toBe(3);
});

test('adds 1 + 2 to equal 3', () => {
  expect(handleSubmit()).toBe(3);
});

describe('handleSubmit function', () => {
  it('should handle form submission with non-empty fields', async () => {
    // Arrange
    const dataToSend = 'username'; // Replace with actual data
    const title = 'Sample Title';
    const steps = 'Sample Steps';
    const ingredients = 'Ingredient 1, Ingredient 2';

    // Mock the console.log function to spy on it
    jest.spyOn(console, 'log');

    // Mock the axios.post function to simulate a successful response
    axios.post.mockResolvedValueOnce({ data: 'Success' });

    // Act
    const result = await handleSubmit()

    // Assert
    expect(result).toBe('success');
    expect(console.log).toHaveBeenCalledWith('Field is not empty');
    expect(console.log).toHaveBeenCalledWith('Ingredients:', ingredients);
    expect(axios.post).toHaveBeenCalledWith(
      `http://172.16.122.26:8080/createRecipe/${dataToSend}`,
      { title, steps, ingredients }
    );

    // Additional assertions related to your specific component behavior
    // You may need to check if the pop-up is shown, etc.
  });

  it('should handle form submission with empty fields', () => {
    // Arrange
    const dataToSend = 'username'; // Replace with actual data
    const title = '';
    const steps = '';
    const ingredients = '';

    // Mock the console.log function to spy on it
    jest.spyOn(console, 'log');

    // Act
    const result = handleSubmit({
      preventDefault: jest.fn(), // Mock the preventDefault function
    }, title, steps, ingredients, dataToSend);

    // Assert
    expect(result).toBe('field is empty');
    expect(console.log).toHaveBeenCalledWith('Field is empty');
    // Additional assertions related to your specific component behavior
  });
});
