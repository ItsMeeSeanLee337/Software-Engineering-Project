import{render, screen, act,  cleanup, fireEvent, waitFor} from "@testing-library/react";
import renderer from "react-test-renderer"
import "@testing-library/jest-dom";

import {BrowserRouter as Router} from 'react-router-dom';
//import HomePage from "../../Pages/HomePage"; 
import HomePage from "../Pages/HomePage";



  test('Submit with all fields edited', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=user10`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <HomePage />
        </Router>
      );
    });

    
    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith("received recipes");
  });
  });
