const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8083;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/home', (req, res) => {
  res.json({ message: 'Hello FROM the server!' });
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  console.log('This is the username:', username)
  console.log('This is the password:', password)
  res.json({ message: 'Recieved Data'});
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});