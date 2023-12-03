import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Substitutions from "./Pages/Substitutions.js";

  test('Submit with all fields edited', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testing`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <Substitutions />
        </Router>
      );});

    //get the button
    const tryIngredientButton = screen.getByTestId('ingredient button');

    //click the button
    fireEvent.click(tryIngredientButton);
    await waitFor(() => {
        expect(logSpy).toHaveBeenCalledWith("received substitutions");
    },{timeout:2000});
});

