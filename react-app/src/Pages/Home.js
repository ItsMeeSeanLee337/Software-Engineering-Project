import React from 'react'
import Navbar from './Navbar';

const urlParams = new URLSearchParams(window.location.search);
const dataToSend = urlParams.get('data');



function Home(){
    return(
        <div>
            <Navbar></Navbar>
            {dataToSend}
        </div>
        
    )

}

export default Home