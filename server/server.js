const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
const PORT = 8080;

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/home', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

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




/*Used for Create Recipe Section */
app.post('/createRecipe', async (req, res) => {

  const { title } = req.body;
  const { steps } = req.body;
  const { ingredients } = req.body;
  console.log('Title:', title)
  console.log('steps:', steps)
  console.log('ingredients:', ingredients)
  res.status(200).send(`Title received: ${title}, Steps received ${steps}, Ingredients received: ${ingredients}`);
});

/* ----------------------------------------------- */

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Post: Used for api/postman testing
app.post('/postLogin', async (req, res) => {

  //Data from the post request
  const username = req.body.username;
  const password = req.body.password;
  
  console.log('Received username', username)
  console.log('Received password', password)

  res.send('Received login data: ' + JSON.stringify({ username, password }));

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