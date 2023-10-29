import React from 'react'
import Navbar from './Navbar';

const urlParams = new URLSearchParams(window.location.search);
const dataToSend = urlParams.get('data');



function Home(){
    return(
        <div>
            <Navbar></Navbar>
            {dataToSend}
            This is the home page
        </div>
        
    )

}

export default Home