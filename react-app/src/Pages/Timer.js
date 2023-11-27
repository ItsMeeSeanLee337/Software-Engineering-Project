import Navbar from './Navbar';
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
    <div>
      <Navbar></Navbar>
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          maxWidth: '600px',
          margin: '20px auto',
          padding: '20px',
        }}
      >
        <h1 style={{ color: '#333' }}>Timer</h1>

        {/* Timer display */}
        <p
          id="timer"
          style={{
            fontSize: '24px',
            marginBottom: '20px',
          }}
        >
          {displayTime()}
        </p>

        {/* Increment and Decrement buttons */}
        <button
          className="increment-button"
          onClick={incrementMinutes}
          disabled={isRunning}
          style={{
            fontSize: '16px',
            padding: '10px 20px',
            margin: '5px',
            cursor: 'pointer',
            backgroundColor: 'white',
            color: '#333',
            border: '1px solid #ccc',
          }}
        >
          Increment
        </button>
        <button
          className="decrement-button"
          onClick={decrementMinutes}
          disabled={isRunning}
          style={{
            fontSize: '16px',
            padding: '10px 20px',
            margin: '5px',
            cursor: 'pointer',
            backgroundColor: 'white',
            color: '#333',
            border: '1px solid #ccc',
          }}
        >
          Decrement
        </button>

        {/* Start button */}
        <button
          className="start-button"
          onClick={startTimer}
          disabled={isRunning}
          style={{
            fontSize: '16px',
            padding: '10px 20px',
            margin: '5px',
            cursor: 'pointer',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
          }}
        >
          {isRunning ? 'Running...' : 'Start'}
        </button>

        {/* Expired message and restart button */}
        {expiredMessage && (
          <div>
            <p>{expiredMessage}</p>
            <button
              onClick={() => setTimerDuration(5)}
              style={{
                fontSize: '16px',
                padding: '10px 20px',
                cursor: 'pointer',
              }}
            >
              Restart Timer
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default TimerApp;
