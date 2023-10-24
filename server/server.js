const express = require('express');
const db = require('./db')
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
const { createConnection } = require('mariadb');
const PORT = 8080;

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/home', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});


//This function can be used to query the data base to post things into it.
//Params: Query - the sql query you want to run "INSERT INTO CustomRecipe (crID, Title, Description, ilID) VALUES (?, ?, ?, ?)"
// The ?'s are not placeholders and they should be actually in your query variable
//Values - the values like sql which correspond to the ?'s
//Return - Doesn't really return anything, but you will be notified if the query was successful for not
function queryDatabase(query, values) {
  db.pool.getConnection()
    .then(conn => {
      conn.query(query, values)
        .then(rows => {
          console.log('Recipe inserted successfully:', rows.insertId);
          conn.end();  // Release the connection
        })
        .catch(error => {
          throw error;
        });
    })
    .catch(error => {
      console.log('Error connecting to MariaDB:', error);
    });

}


app.get('/Nutripro', async (req, res) => {
  try {
      const result = await db.pool.query("select * from User");
      res.send(result);
  } catch (err) {
      throw err;
  }
});

/*Used for Create Recipe Section */
app.post('/createRecipe/:username', async (req, res) => {
  try{
  const username = req.params.username;
  console.log(username);
  //Getting the parameters from the form
  const { title } = req.body;
  const { steps } = req.body;
  const { ingredients } = req.body;
  console.log('Title:', title)
  console.log('steps:', steps)
  console.log('ingredients:', ingredients)

  //Creating a unique ilID for the ingredients table
  var ilID = Math.floor(Math.random() * 10000) + 1;
  console.log('Random integer for ingredient ID:', ilID);

  //Have to make sure the primary key is unique
  //Checking the ingredientList table to ensure generated id is unique
  var isUnique = false;
  while(!isUnique)
  {
    while (!isUnique) {
      ilID = Math.floor(Math.random() * 10000) + 1;
      console.log('Random integer for ingredient ID:', ilID);
  
      try {
        const rows = await db.pool.query(`SELECT ilID FROM IngredientList WHERE ilID = ${ilID}`);
        
        if (rows.length === 0) {
          isUnique = true;
          console.log('No rows found for ilID:', ilID);
        } else {
          isUnique = false;
          console.log('Rows found for ilID:', ilID);
        }
      } catch (error) {
        console.error('Query error:', error);
      }
    }
}
  
    

  //Converting the ingredient array from the form into JSON
  const ingredientsJSONString = JSON.stringify({ingredients});
  console.log('JSON: ', ingredientsJSONString);

  //Constructing query to insert the ingredient list into the table on DB
  const query_IL = 'INSERT INTO IngredientList (ilID, list) VALUES (?, ?)';
  const values_IL = [ilID, ingredientsJSONString];

  //Preforming the query with the function
  queryDatabase(query_IL, values_IL);

  //Constructing query to insert the custom recipe into the table on DB with ilID
  const query_CR = 'INSERT INTO CustomRecipe (crID, Title, Description, ilID) VALUES (?, ?, ?, ?)';
  const values_CR = [ilID, title, steps, ilID];

  queryDatabase(query_CR, values_CR);

  //Now add it to the userrecipe table to link it to them

  var userID = await getUserID(username);

  const query_UR = 'Insert into UserRecipes(userID, crID) Values(?, ?);';
  const values_UR = [userID, ilID];

  queryDatabase(query_UR, values_UR);

  res.status(200).send(`Title received: ${title}, Steps received ${steps}, Ingredients received: ${ingredients}`);
} catch (error) {
  console.error('An error occurred with username:', error);
  return; // Stop further execution
}
});

/* ----------------------------------------------- */

async function getUserID(Username) {
  var query = `SELECT UserID FROM User WHERE username = '${Username}';`;
  const result = await db.pool.query(query);
  console.log(result[0].UserID);
  return (result[0].UserID);
 
}


app.get('/CustomRecipe/Display/:username', async(req,res) =>{
  
  try {
    const username = req.params.username;
    console.log(username);
  
  var finalUserID = await getUserID(username);



  query = `
  SELECT CustomRecipe.crID, CustomRecipe.Title, CustomRecipe.Description, IngredientList.list
  FROM CustomRecipe
  JOIN UserRecipes ON CustomRecipe.crID = UserRecipes.crID
  JOIN IngredientList ON CustomRecipe.ilID = IngredientList.ilID
  WHERE UserRecipes.userID = ${finalUserID};
  `;
  try {
    const result = await db.pool.query(query);
    console.log(result);
    console.log(query);
    res.send(result);
    

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }
} catch (error) {
  console.error('An error occurred with username:', error);
  return; // Stop further execution
}
})

app.post('/deleteCustomRecipe' , async(req,res)=>{
  console.log("here in deleteCustom");
  const {username} = req.body;
  const { title } = req.body;
  const { steps } = req.body;
  console.log('Title:', title)
  console.log('steps:', steps)
  console.log(username);

  const userID = await getUserID(username);


  const query = `
  DELETE cr, ur
  FROM CustomRecipe cr
  JOIN UserRecipes ur ON ur.crID = cr.crID
  JOIN User u ON u.UserID = ur.userID
  WHERE u.Username = '${username}'
  AND cr.Title = '${title}'
  AND cr.Description = '${steps}';`


  try {
    const result = await db.pool.query(query);
    console.log(result);
    console.log(query);
    res.send("Recipe Deleted");
    

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }


  

})


app.post('/saveRecipeNotes/:username', async (req, res) => {
  try{
  const username = req.params.username;
  console.log(username);
  var finalUserID = await getUserID(username);
  
  const {notes} = req.body;
  const {thiscrID} = req.body;
  console.log(notes);
  console.log(thiscrID);


  //Query for adding notes based on the userID to custom recipe table

    const query = `
    Update CustomRecipe
    Set notes = '${notes}'
    where crID = ${thiscrID};
    `;

    try {
      const result = await db.pool.query(query);
      console.log(result);
      console.log(query);
      res.send("Notes Updated");
      
  
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Internal Server Error');
    }

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }

});


app.get('/getRecipeNotes/:crID', async (req, res) => {
  try {
      const crID = req.params.crID;
      //const {crID} = req.body;
      console.log(crID)
      const result = await db.pool.query(`SELECT notes FROM CustomRecipe WHERE crID = ${crID}`);
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
      const result = await db.pool.query("Select crID, Title, Description, il.ilID, list from CustomRecipe as cs JOIN IngredientList as il on cs.crID = il.ilID WHERE il.ilID = 5090");
      res.send(result);
  } catch (err) {
      throw err;
  }

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});