const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());

app.get('/home', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});