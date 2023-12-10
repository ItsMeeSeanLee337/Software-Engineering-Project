import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from 'react-router-dom';
//import TimerApp from '../../Components/TimerApp';
//import TimerApp from "../../Pages/Timer";
import TimerApp from "../Pages/Timer.js";
import Timer from "../Pages/Timer.js";


beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});


  test('Submit with all fields edited', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const url = `${window.location.pathname}?data=testing`;
    window.history.pushState({}, '', url);
    await act(async () => {
      render(
        <Router>
          <Timer />
        </Router>
      );});


    //get the button
    const tryIncrementButton = screen.getByTestId('increment button');

    //click the button
    fireEvent.click(tryIncrementButton);
    await waitFor(() => {
        expect(logSpy).toHaveBeenCalledWith("Incremented");
    });

    //get the button
    const tryDecrementButton = screen.getByTestId('decrement button');

    //click the button
    fireEvent.click(tryDecrementButton);
    await waitFor(() => {
        expect(logSpy).toHaveBeenCalledWith("Decremented");
    });
});


  