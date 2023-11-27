import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import NutritionalInformation from './nutritional_info';

describe('NutritionalInformation component', () => {
  it('fetches ingredient ID on button click', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Router>
        <NutritionalInformation />
      </Router>
    );
    
    const searchInput = getByPlaceholderText('Search for a food item');
    const searchButton = getByText('Search ID');

    fireEvent.change(searchInput, { target: { value: 'apple' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      // Use a regular expression or partial matching to handle variations in text
      expect(getByText(/ID of the top result:/)).toBeInTheDocument();
    });
  });

  it('displays nutritional information on analyze button click', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Router>
        <NutritionalInformation />
      </Router>
    );
    
    const searchInput = getByPlaceholderText('Search for a food item');
    const searchButton = getByText('Search ID');
    const analyzeButton = getByText('Analyze ID');


    fireEvent.change(searchInput, { target: { value: 'apple' } });
    fireEvent.click(searchButton);
    await waitFor(() => {
      // Use a regular expression or partial matching to handle variations in text
      expect(getByText(/ID of the top result:/)).toBeInTheDocument();
    });
    fireEvent.click(analyzeButton);

    await waitFor(() => {
      // Use regular expressions or partial matching for flexibility
      expect(getByText(/Nutritional Information for/)).toBeInTheDocument();
      expect(getByText(/Calories:/)).toBeInTheDocument();
      expect(getByText(/Protein:/)).toBeInTheDocument();
      expect(getByText(/Carbohydrates:/)).toBeInTheDocument();
      // Add assertions for other nutritional information as needed
    });
  });

  // Add more test cases for edge cases, error handling, etc. based on your component's behavior.
});
