import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from 'react-router-dom';
//import TimerApp from '../../Components/TimerApp';
//import TimerApp from "../../Pages/Timer";
import TimerApp from "./Pages/Timer";
import Timer from "./Pages/Timer.js";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

/*test('TimerApp functionality', async () => {
  await act(async () => {
    render(<TimerApp />);
  });*/
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


        // Check if the initial timer display is correct
  /*const initialTimerDisplay = screen.getByText(/05:00/);
  expect(initialTimerDisplay).toBeInTheDocument();

  // Click the Increment button
  const incrementButton = screen.getByText(/Increment/i);
  fireEvent.click(incrementButton);

  // Check if the timer display is updated after incrementing
  const incrementedTimerDisplay = screen.getByText(/06:00/);
  expect(incrementedTimerDisplay).toBeInTheDocument();

  // Click the Decrement button
  const decrementButton = screen.getByText(/Decrement/i);
  fireEvent.click(decrementButton);

  // Check if the timer display is updated after decrementing
  const decrementedTimerDisplay = screen.getByText(/05:00/);
  expect(decrementedTimerDisplay).toBeInTheDocument();

  // Click the Start button
  const startButton = screen.getByText(/Start/i);
  fireEvent.click(startButton);

  // Fast-forward time by 1 second
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // Check if the timer display is updated after starting
  const updatedTimerDisplay = screen.getByText(/04:59/);
  expect(updatedTimerDisplay).toBeInTheDocument();

  // Click the Start button again
  fireEvent.click(startButton);

  // Fast-forward time to make the timer expire
  act(() => {
    jest.advanceTimersByTime(300000); // 5 minutes
  });

  // Check if the expired message is displayed
  const expiredMessage = screen.getByText(/Timer expired! Your recipe is ready!/i);
  expect(expiredMessage).toBeInTheDocument();

  // Click the Restart Timer button
  const restartTimerButton = screen.getByText(/Restart Timer/i);
  fireEvent.click(restartTimerButton);

  // Check if the timer is restarted
  const restartedTimerDisplay = screen.getByText(/05:00/);
  expect(restartedTimerDisplay).toBeInTheDocument(); */
});


  