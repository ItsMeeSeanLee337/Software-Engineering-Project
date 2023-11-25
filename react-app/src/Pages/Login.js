import React, { useState } from 'react';
import axios from 'axios'
import Navbar from './Navbar';
import '../styles/login.css'

function Login() {
  //sets the username and password variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userID, setUserID] = useState([]);

  //handler every time we enter info in the username field, for now just indicates the changes to console
  function handleUsername (event) {
    setUsername(event.target.value);
   //console.log("changed uname");
  };
  
  //handler every time we enter info in the password field, for now just indicates the changes to console
  function handlePassword (event) {
    setPassword(event.target.value);
    //console.log("changed pass");
  };

  //handler for when we submit, indicates the username and pass to console and sends information to server
  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log("Submitted!");
    //console.log("username", username);
    //console.log("password", password);

    const apiUrl = 'http://172.16.122.26:8080/login';; 
    axios.post(apiUrl, { username, password })
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          const dataToSend = encodeURIComponent(username)
          setUsername('');
          setPassword ('');
          setUserID(response);
          window.location.href = `/Login_Success?data=${dataToSend}`;
        } 
      })
      .catch(error => {
        console.error('Error:', error);
        setUsername('');
        setPassword ('');
        alert('Invalid username or password! Try again.');
      });

  };

return (
  <div>
    <Navbar></Navbar>
    <div className = "container">
    <h2>Login</h2>
    <div className = "form_box">
    <form onSubmit={handleSubmit}>
      <div className = "up_label">
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
        <div className = "up_label">
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
      <button data-testid="tryLoginButton" id = "loginButton" className = "login_button" type="submit">Login</button>
    </form>
    </div>
    </div>
  </div>
);
};


export default Login;
