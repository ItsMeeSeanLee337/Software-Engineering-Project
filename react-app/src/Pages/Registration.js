import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/registration.css'
import RecipeMakerToolTip from '../Modules/RecipeMakerToolTip';

const Registration = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isMaker, setIsMaker] = useState('0');
    const [toolTipVisible, setToolTipVisible] = useState(false);


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
  const handleIsMakerChange = (e) =>{
    setIsMaker(e.target.checked);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted!");
    console.log("firstname", firstname);
    console.log("lastname", lastname);
    console.log("username", username);
    console.log("password", password);
    console.log("email", email);
    console.log("isMaker ", isMaker);

    const apiUrl = 'http://172.16.122.26:8080/registration';
    axios.post(apiUrl, {firstname, lastname, username, password, email, isMaker})
      .then(response => {
        if (response.status === 200) {
          console.log('Response:', response.data);
          setFirstname('');
          setLastname('');
          setUsername('');
          setPassword ('');
          setEmail('');
          setIsMaker(false)
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
  
const showToolTip = async(e)=>{
    setToolTipVisible(true);
}
const hideToolTip = async(e)=>{
  setToolTipVisible(false);
}

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
      <div className="container">
        <h2>Register</h2>
        <div className="form_box">
          <form onSubmit={handleSubmit}>
            <div className="up_label">
              <label>
                Firstname:
                <input 
                id = 'firstname'
                type="text" 
                value={firstname} 
                onChange={handleFirstnameChange} />
              </label>
            </div>
            <br />
            <div className="up_label">
              <label>
                Lastname:
                <input 
                id = 'lastname'
                type="text" 
                value={lastname} 
                onChange={handleLastnameChange} />
              </label>
            </div>
            <br />
            <div className="up_label">
              <label>
                Username:
                <input 
                id = 'username'
                type="text" 
                value={username} 
                onChange={handleUsernameChange} />
              </label>
            </div>
            <br />
            <div className="up_label">
              <label>
                Password:
                <input 
                id = 'password'
                type="password" 
                value={password} 
                onChange={handlePasswordChange} />
              </label>
            </div>
            <br />
            <div className="up_label">
              <label>
                Email:
                <input 
                id = 'email'
                type="text" 
                value={email} 
                onChange={handleEmailChange} />
              </label>
            </div>
            <br />
            <div
            onMouseEnter={showToolTip}
            onMouseLeave={hideToolTip}>
            <label className='up_label'>
              <input
                id = 'checkbox'
                type="checkbox"
                value={isMaker}
                onChange={handleIsMakerChange}
              />
            Recipe Maker
            </label>
            {toolTipVisible && <RecipeMakerToolTip>
              </RecipeMakerToolTip>}
              
              </div>
              <br></br>
            <button 
            id = 'registerButton'
            data-testid="registerButton"
            className = "submit_button" 
            type="submit">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
}
  

export default Registration;
