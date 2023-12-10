import React, { useState } from 'react';
import axios from 'axios'
import Navbar from './Navbar';
import '../styles/login.css'

//Allows a user to login to their account
function Login() {
  //sets the username and password variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [, setUserID] = useState([]);

  //handler every time we enter info in the username field sets username variable to the text entered
  function handleUsername (event) {
    setUsername(event.target.value);
    //debugging console.log statements:
   //console.log("changed uname");
  };
  
    //handler every time we enter info in the password field sets username variable to the text entered
  function handlePassword (event) {
    setPassword(event.target.value);
    //debugging console.log statements:
    //console.log("changed pass");
  };

  //handler for when we submit (clicked on Login button), sends username and password information to server
  const handleSubmit = async (event) => {
    event.preventDefault();
    //debugging console.log statements: 
      //console.log("Submitted!");
      //console.log("username", username);
      //console.log("password", password);
    //sending username and password variables to the /login endpoint in server.js
    const apiUrl = 'http://172.16.122.26:8080/login';; 
    axios.post(apiUrl, { username, password })
      .then(response => {
        if (response.status === 200) {
          console.log("Logged in!");
          //sending the username data to the login success page so that we can access the users data
          const dataToSend = encodeURIComponent(username)
          //clears the text field
          setUsername('');
          setPassword ('');
          setUserID(response);
          window.location.href = `/Login_Success?data=${dataToSend}`;
        } 
      })
      //if response was not ok, ex: invalid login, send a popup 
      .catch(error => {
        console.error('Login Error:', error);
        setUsername('');
        setPassword ('');
        alert('Invalid username or password! Try again.');
      });
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        <h2>Login</h2>
        <div className="form_box">
          <form onSubmit={handleSubmit}>
            <div className="up_label">
              <label>
                Username:
                <input
                  data-testid="usernameField"
                  id='username'
                  type="text"
                  value={username}
                  onChange={handleUsername}
                  required
                />
              </label>
            </div>
            <br />
            <div className="up_label">
              <label>
                Password:
                <input
                  data-testid="passwordField"
                  id='password'
                  type="password"
                  value={password}
                  onChange={handlePassword}
                  required
                />
              </label>
            </div>
            <br />
            <button data-testid="tryLoginButton" id="loginButton" className="login_button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default Login;