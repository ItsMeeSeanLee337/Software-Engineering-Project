const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/home', (req, res) => {
  res.json({ message: 'Hello FROM the server!' });
});

/*
app.get('/login', (req, res) => {
  res.send('This is the login.');
});
*/

app.post('/login', (req, res) => {
  //const username = req.body;
  res.json({ message: 'Recieved Data'});
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});