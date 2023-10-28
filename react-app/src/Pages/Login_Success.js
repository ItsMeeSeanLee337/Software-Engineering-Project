import Navbar from './Navbar'
import React from 'react';
import Login from './Login';
import { Link } from 'react-router-dom';
function Login_Success(){
    //getting username data fro succesful login 
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');
    const username = decodeURIComponent(data);
    console.log("DATA: ", username);


    const handleGoToBio = async (event) => {
        console.log("moved to biopage");
        event.preventDefault();
        const dataToSend = encodeURIComponent(username)
        window.location.href = `/Display_Personal_Bio?data=${dataToSend}`;
    }
    const handleCreateEditBio = async (event) => {
        console.log("moved to biopage");
        event.preventDefault();
        const dataToSend = encodeURIComponent(username)
        window.location.href = `/Create_Edit_Personal_Bio?data=${dataToSend}`;
    }

    return(
    <div>
        <Navbar></Navbar>
        <p>Welcome to your page {username}!</p> 
        <button type="button" onClick={handleCreateEditBio}>Create/Edit Bio</button>
        <br />
        <br />
        <button type="button" onClick={handleGoToBio}>Go to Bio</button>
        <br />
        <br />
        <a href="/">Logout</a> 

    </div>
        
    )

}

export default Login_Success;