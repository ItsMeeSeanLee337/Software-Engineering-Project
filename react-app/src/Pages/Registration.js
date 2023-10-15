import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Registration = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


    const handleFirstnameChange = (event) => {
        setFirstname(event.target.value);
      };

    const handleLastnameChange = (event) => {
        setLastname(event.target.value);
      };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted!");
    console.log("firstname", firstname);
    console.log("lastname", lastname);
    console.log("username", username);
    console.log("password", password);
    console.log("email", email);

    const apiUrl = 'http://172.16.122.26:8080/registration';
    axios.post(apiUrl, {firstname, lastname, username, password, email})
      .then(response => {
        if (response.status === 200) {
          console.log('Response:', response.data);
          setFirstname('');
          setLastname('');
          setUsername('');
          setPassword ('');
          setEmail('');
          window.location.href = `/Login`;
        } 
      })
      .catch(error => {
        console.error('Error:', error);
        setUsername('');
        setPassword ('');
        alert('Invalid username or password! Try again.');
  });
};
  
  /*const handlesSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/registration', {
        firstname,
        lastname,
        username,
        password,
        email
      });
      console.log('Registration successful:', response.data);
      // Handle success, e.g., redirect to a dashboard or display a success message
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      // Handle error, e.g., display an error message to the user
    }
  };*/

  return (
    <div>
      <Navbar></Navbar>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Firstname:
          <input type="text" value={firstname} onChange={handleFirstnameChange} />
        </label>
        <br />
        <label>
          Lastname:
          <input type="text" value={lastname} onChange={handleLastnameChange} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Registration;
