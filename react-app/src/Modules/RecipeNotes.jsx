import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import popupnotes from '../styles/popupnotes'
function RecipeNotes({visible, setVisible, crID, fillNotes, setfillNotes, setcrid}) {
const [notes, setNotes] = useState('');
const [recipeNotes, setRecipeNotes] = useState("No Notes");
const urlParams = new URLSearchParams(window.location.search);
const dataToSend = urlParams.get('data');
const [thiscrID, setThiscrID] = useState(crID);
const closeNotes = () =>
{
    setVisible(false);
    setcrid("");
}


console.log("this crid", thiscrID)

useEffect(() => {
    // This code inside the useEffect will run after setfillNotes is updated.
    // You can perform actions that depend on the updated state here.
    console.log("crid in recipe: ", crID)
    //console.log('fillNotes has been updated:', fillNotes);

    // You can set the notesVisible state here if needed
  }, [crID]);


useEffect(() => {
    // This code inside the useEffect will run after setfillNotes is updated.
    // You can perform actions that depend on the updated state here.
    setNotes(fillNotes);
    //console.log('fillNotes has been updated:', fillNotes);

    // You can set the notesVisible state here if needed
  }, [fillNotes]);

function handleSaveNotes() {
    console.log("This is notes in recipe:", notes);
    const apiUrl = `http://172.16.122.26:8080/saveRecipeNotes/${dataToSend}`;
    
  axios.post(apiUrl, {notes, thiscrID})
    .then(response => {
      console.log('Response:', response.data);
      setcrid("");
      //setShowPopup(true);

    // Hide the pop-up after 3 seconds
    //setTimeout(() => {
    //  setShowPopup(false);
  //  }, 3000);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

    return (
   <div className='showNotesPopUp'>
   <div className='showNotesPopUpContext'>
    <textarea className='notesTextArea'
    rows={20}
    cols={100}
    onChange={(e) => setfillNotes(e.target.value)}
    value={fillNotes}></textarea>
    
    <br></br>
    <button className = 'notesButtons' onClick={closeNotes}>Close Notes</button>
    <p></p>
    <button onClick={handleSaveNotes}>Save Notes</button>
    </div>
   </div>
    
  )
}

export default RecipeNotes