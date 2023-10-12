import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/login.css'

function Login() {
  //sets the username and password variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  //handler every time we enter info in the username field, for now just indicates the changes to console
  function handleUsername (event) {
    setUsername(event.target.value);
    console.log("changed uname");
  };
  
  //handler every time we enter info in the password field, for now just indicates the changes to console
  function handlePassword (event) {
    setPassword(event.target.value);
    console.log("changed pass");
  };

  //handler for when we submit, indicates the username and pass to console and sends information to server
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted!");
    console.log("username", username);
    console.log("password", password);
    setUsername('');
    setPassword ('');
  
    try {
      //sending username and password values to the server
      const response = await axios.post('http://localhost:8080/login', {username, password});
      console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error('Error submitting form:', error);
    }

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
            type="password"
            value={password}
            onChange={handlePassword}
            required
          />
        </label>
        </div>
        <br />
      <button className = "login_button" type="submit">Login</button>
    </form>
    </div>
    </div>
  </div>
);
};


export default Login;