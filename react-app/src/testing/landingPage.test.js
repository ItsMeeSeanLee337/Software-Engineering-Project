import React from 'react';
import { render } from '@testing-library/react';
import Home from '../Pages/Landing_page';

describe('Home Component', () => {
  test('renders welcome message', () => {
    const { getByText } = render(<Home />);
    const welcomeMessage = getByText('Welcome to Nutripro');
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('renders sign-up link', () => {
    const { getByText } = render(<Home />);
    const signUpLink = getByText('Sign Up Now');
    expect(signUpLink).toHaveAttribute('href', '/registration');
  });

  test('renders login link', () => {
    const { getByText } = render(<Home />);
    const loginLink = getByText('Login');
    expect(loginLink).toHaveAttribute('href', '/Login');
  });

  // You can add more tests for other elements, classes, etc.
});