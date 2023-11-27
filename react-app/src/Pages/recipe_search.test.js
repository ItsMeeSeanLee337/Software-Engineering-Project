import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import RecipeSearch from './recipe_search';

describe('RecipeSearch', () => {
  it('renders search fields and buttons', () => {
    const { getByPlaceholderText, getByText, getByRole } = render(
      <Router>
        <RecipeSearch />
      </Router>
    );
    
    const searchInput = getByPlaceholderText('Search by name/ Ingredient');
    const searchByNameButton = getByText('Search by Name');
    const searchByIngredientButton = getByText('Search by Ingredient');
    const searchByDietButton = getByText('Search by Name & Diet');
    const dietSelect = getByRole('listbox');

    expect(searchInput).toBeInTheDocument();
    expect(searchByNameButton).toBeInTheDocument();
    expect(searchByIngredientButton).toBeInTheDocument(); 
    expect(searchByDietButton).toBeInTheDocument();
    expect(dietSelect).toBeInTheDocument();
  });

  it('searches recipes by name', async () => {
    const { getByPlaceholderText, getByText, getAllByRole } = render(
      <Router>
        <RecipeSearch />
      </Router>
    );
    
    const searchInput = getByPlaceholderText('Search by name/ Ingredient');
    const searchByNameButton = getByText('Search by Name');

    fireEvent.change(searchInput, { target: { value: 'Pizza' } });
    fireEvent.click(searchByNameButton);

    await waitFor(() => {
      const results = getAllByRole('listitem');
      expect(results.length).toBeGreaterThan(0);
    });
  });

  // You might want to add more test cases for searching by ingredient, diet, etc.
});
