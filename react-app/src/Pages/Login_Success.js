import Navbar from './Navbar'
import React from 'react';

function Login_Success(){
    //getting username data fro succesful login 
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');
    const username = decodeURIComponent(data);
    console.log("DATA: ", username);
    //from here we can query db and add their custom info to the page

    //handler for logout
    function handleLogout (event) {
        event.preventDefault();
        window.location.href = '/Home';
    }

    return(
        <div>
        <Navbar></Navbar>
        <p>Welcome to your page {username}!</p> 
        <button className = "logout_button" type="submit" onClick={handleLogout}>Logout</button>
    </div>
        
    )

}

export default Login_Success;