import Navbar from './Navbar';
import '../styles/registration.css'

import '../styles/assistant_features.css'; // Import the CSS file
import React, { useState, useEffect } from 'react';


function TimerApp() {
  const [timer, setTimer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(300); // Start with 5 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [expiredMessage, setExpiredMessage] = useState(null);

  const setTimerDuration = (minutes) => {
    clearInterval(timer);
    setTimeRemaining(minutes * 60);
    setIsRunning(false);
    setExpiredMessage(null);
  };

  const incrementMinutes = () => {
    setTimerDuration(Math.min(60, timeRemaining / 60 + 1));
  };

  const decrementMinutes = () => {
    setTimerDuration(Math.max(1, timeRemaining / 60 - 1));
  };

  const startTimer = () => {
    setIsRunning(true);
    const startTime = Date.now();
    const initialRemaining = timeRemaining;

    const updateTimer = () => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, initialRemaining - elapsedTime);

      setTimeRemaining(remaining);

      if (remaining > 0) {
        requestAnimationFrame(updateTimer);
      } else {
        setIsRunning(false);
        setExpiredMessage("Timer expired! Your recipe is ready!");
      }
    };

    updateTimer();
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTimeRemaining(0);
    clearTimeout(timer);
    setExpiredMessage(null);
  };

  const displayTime = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return `${padZero(minutes)}:${padZero(seconds)}`;
  };

  const padZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  useEffect(() => {
    if (timeRemaining > 0 && isRunning) {
      startTimer();
    }

    return () => {
      clearTimeout(timer);
    };
  }, [timeRemaining, isRunning, timer]);

  return (
    <div className="container">
      <h1>Timer</h1>

      {/* Timer display */}
      <p id="timer">{displayTime()}</p>

      {/* Increment and Decrement buttons */}
      <button className="increment-button" onClick={incrementMinutes} disabled={isRunning}>
        Increment
      </button>
      <button className="decrement-button" onClick={decrementMinutes} disabled={isRunning}>
        Decrement
      </button>

      {/* Start button */}
      <button className="start-button" onClick={startTimer} disabled={isRunning}>
        {isRunning ? "Running..." : "Start"}
      </button>

      {/* Expired message and restart button */}
      {expiredMessage && (
        <div>
          <p>{expiredMessage}</p>
          <button onClick={() => setTimerDuration(5)}>Restart Timer</button>
        </div>
      )}
    </div>
  );
}

export default TimerApp;
