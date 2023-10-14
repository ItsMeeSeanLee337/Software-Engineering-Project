//import React from 'react'
import Navbar from './Navbar'
import React from 'react';

function Login_Success(){


    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');
    const username = decodeURIComponent(data);

    console.log("DATA: ", username);

    return(
        <div>
        <Navbar></Navbar>
        <p>Welcome to your page {username}!</p> 
    </div>
        
    )

}

export default Login_Success;