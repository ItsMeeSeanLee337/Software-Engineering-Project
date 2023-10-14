//This is the server.js file I have on the VM 
const express = require('express')
const db = require('./db')
const app = express()
const cors = require('cors')
const port = 8080
const bodyParser = require("body-parser");
 
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 

app.get('/Nutripro', async (req, res) => {
    try {
        const result = await db.pool.query("select * from User");
        res.send(result);
    } catch (err) {
        throw err;
    }
});
 

// Section for postman testing


// GET: Used for api/postman testing
app.get('/get', async (req, res) => {
    try {
        const result = await db.pool.query("SELECT * FROM User WHERE Username = 'testuser'");
        res.send(result);
    } catch (err) {
        throw err;
    }
});

app.post('/login', async (req, res) => {
    const { username } = req.body;
    const { password } = req.body;
    console.log('This is the username:', username);
    console.log('This is the password:', password);
    //res.json({ message: 'Recieved Data'});
    //const query = 'SELECT Username FROM User WHERE Username = ? AND Password = ?';
    //const values = [username, password];
    try {
        const connection = await db.pool.getConnection();
        const result = await connection.query('SELECT * FROM User WHERE username = ? AND password = ?', [username, password]);
        connection.release();
        console.log("This is the result: ", result);

        if (result.length >= 1) {
            // Valid login
            res.status(200).json({ message: JSON.stringify(result)});
            //res.send(JSON.stringify({ username, password }));
        } else {
            // Invalid login
            console.log("Invalid Login");
            res.status(401).json({ message: 'Invalid login credentials' });
        }
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
   
});



app.get('/getCustomRecipe', async (req, res) => {

    //Data from the post request
    try {
        const result = await db.pool.query("Select crID, Title, Description, il.ilID, list from CustomRecipe as cs JOIN IngredientList as il on cs.crID = il.ilID WHERE il.ilID = 123");
        res.send(result);
    } catch (err) {
        throw err;
    }

});
    


app.listen(port, () => console.log(`Listening on port ${port}`));