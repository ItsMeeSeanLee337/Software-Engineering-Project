const express = require('express');
const db = require('./db')
const app = express();
const cors = require('cors')
const axios = require('axios');
const bodyParser = require("body-parser");
const { createConnection } = require('mariadb');
const e = require('express');
const PORT = 8080;
const apiKEY = '522c838fa8034d6f870c425c713cbf84'
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

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
  var userID = await getUserID(username, res);
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

  //Have to see if they are a recipe maker account type and mark that on the CR

  var isMaker = await db.pool.query(`Select isMaker from User where userID = ${userID}`)
  const makerFinal = isMaker[0].isMaker
  console.log("In custom recipe isMake value: ", makerFinal)
  //Constructing query to insert the custom recipe into the table on DB with ilID
  const query_CR = 'INSERT INTO CustomRecipe (crID, Title, Description, ilID, isMakerRecipe) VALUES (?, ?, ?, ?, ?)';
  const values_CR = [ilID, title, steps, ilID, makerFinal];

  queryDatabase(query_CR, values_CR);

  //Now add it to the userrecipe table to link it to them
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

async function getUserID(Username, res) {
  try{
    var query = `SELECT UserID FROM User WHERE username = '${Username}';`;
    const result = await db.pool.query(query);
    console.log(result[0].UserID);
    return (result[0].UserID);
  }catch{
    res.status(400).send({ error: "Not a user" });
    throw new Error("Not a user");
  }
  
 
}


app.get('/CustomRecipe/Display/:username', async(req,res) =>{
  
  try {
    const username = req.params.username;
    console.log(username);
    var finalUserID = await getUserID(username, res);
  
  
  



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

app.get('/MakerRecipes/Display', async(req,res) =>{
  
  try {
  query = `
  SELECT CustomRecipe.crID, CustomRecipe.Title, CustomRecipe.Description, IngredientList.list
  FROM CustomRecipe
  JOIN IngredientList ON CustomRecipe.ilID = IngredientList.ilID
  WHERE CustomRecipe.isMakerRecipe = 1;
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
  res.status(400).send({ error: "invalid user" });
  return; // Stop further execution
}
})

app.post('/deleteCustomRecipe' , async(req,res)=>{
  console.log("here in deleteCustom");
  const {username} = req.body;
  const { crID } = req.body;
  console.log(username);
  console.log(crID)

  const userID = await getUserID(username, res);


  const query = `
  DELETE ur
  FROM CustomRecipe cr
  JOIN UserRecipes ur ON ur.crID = cr.crID
  JOIN User u ON u.UserID = ur.userID
  WHERE u.Username = '${username}'
  AND cr.crID = '${crID}';`


  try {
    const result = await db.pool.query(query);
    console.log(result);
    console.log(query);

    const query2 = `
    Delete from CustomRecipe where crID = ${crID};`


  try {
    const result = await db.pool.query(query);
    console.log(result);
    console.log(query);
    //res.send("Recipe Deleted");
    

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }
    
    

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }


  
  res.send("Recipe Deleted");

})


app.post('/saveRecipeNotes/:username', async (req, res) => {
  try{
  const username = req.params.username;
  console.log(username);
  var finalUserID = await getUserID(username, res);
  
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

app.get('/getRandomRecipes/:username', async (req, res) => {
  try {
      const username = req.params.username;
      var finalUserID = await getUserID(username,res);
      //userID = getUserID(username)
      const result = await db.pool.query(`SELECT CustomRecipe.Title, CustomRecipe.Description
      FROM CustomRecipe
      JOIN UserRecipes ON CustomRecipe.crID = UserRecipes.crID
      JOIN IngredientList ON CustomRecipe.ilID = IngredientList.ilID
      WHERE UserRecipes.userID = ${finalUserID} ORDER BY RAND() LIMIT 3`);
      
      /*const result = await db.pool.query(`SELECT title, description FROM CustomRecipe WHERE userID = ${finalUserID}
        ORDER BY RAND()
        LIMIT 3`);*/
        console.log(result)
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

//This is for display bio
app.post('/getBio', async(req,res) => {
  const {username} = req.body;
  console.log("This is the username: ", username);
  try {
    const connection = await db.pool.getConnection();
    const result = await connection.query('SELECT * FROM Bio WHERE username = ?', [username]);
    connection.release();
    console.log("This is the result: ", result);

    if (result.length >= 1) {
        // Valid login
        res.json(result);
        //res.send(JSON.stringify({ username, password }));
    } else {
        // Invalid login
        console.log("Invalid");
        res.status(401).json({ message: 'Invalid credentials' });
    }

  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }


});

//This is for create/edit bio
app.post('/createEditBio', async(req,res) => {
  const { username } = req.body;
  const { bio } = req.body;
  const { favoriteFood } = req.body;
  const { favoriteRecipe } = req.body;
  const {selectedImage} = req.body;
  //need to check if only image is updated and nothing else
  console.log('This is the values:', username, bio, favoriteFood, favoriteRecipe, selectedImage);
  try {
    const connection = await db.pool.getConnection();
    //just bio
    if (bio != '' && favoriteRecipe == '' && favoriteFood == '' && (selectedImage == '' || selectedImage == null)) {
      console.log("1");
      const result = await connection.query(`
      INSERT INTO Bio (Username, bio)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE bio = ?;
    `, [username, bio, bio]);

    console.log("This is the result: ", result);
    res.send("Added to db");

    //just favorite food
    } else if(favoriteFood != '' && bio == '' && favoriteRecipe == '' && (selectedImage == '' || selectedImage == null)) {
      console.log("2");

      const result = await connection.query(`
      INSERT INTO Bio (Username, favoriteFood)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE favoriteFood = ?;
    `, [username, favoriteFood, favoriteFood]);

    console.log("This is the result: ", result);
    res.send("Added to db");

    //just recipe
    } else if(favoriteRecipe != '' && bio == '' && favoriteFood == '' && (selectedImage == '' || selectedImage == null)) {
      console.log("3");
      const result = await connection.query(`
      INSERT INTO Bio (Username, favoriteRecipe)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE favoriteRecipe = ?;
    `, [username, favoriteRecipe, favoriteRecipe]);

    console.log("This is the result: ", result);
    res.send("Added to db");

    //just img
    } else if(selectedImage != '' && bio == '' && favoriteFood == '' && favoriteRecipe == '') {
      console.log("4");
      const result = await connection.query(`
      INSERT INTO Bio (Username, imgUrl)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE imgUrl = ?;
    `, [username, selectedImage, selectedImage]);

    console.log("This is the result: ", result);
    res.send("Added to db");

    //just bio and recipe
    } else if(bio != '' && favoriteRecipe != '' && favoriteFood == '' && (selectedImage == '' || selectedImage == null)) {
      console.log("5");
      const result = await connection.query(`
      INSERT INTO Bio (Username, bio, favoriteRecipe)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE bio = ?, favoriteRecipe = ?;
    `, [username, bio, favoriteRecipe, bio, favoriteRecipe]);

    console.log("This is the result: ", result);
    res.send("Added to db");

    //just bio and food
    } else if(bio != '' && favoriteFood != '' && favoriteRecipe == '' && (selectedImage == '' || selectedImage == null)) {
      console.log("6");
      const result = await connection.query(`
      INSERT INTO Bio (Username, bio, favoriteFood)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE bio = ?, favoriteFood = ?;
    `, [username, bio, favoriteFood, bio, favoriteFood]);

    console.log("This is the result: ", result);
    res.send("Added to db");

    //just bio and img
    }else if(bio != '' && selectedImage != '' && favoriteRecipe == '' && favoriteFood == ''){
      console.log("7");
      const result = await connection.query(`
      INSERT INTO Bio (Username, bio, imgUrl)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE bio = ?, imgUrl = ?;
    `, [username, bio, selectedImage, bio, selectedImage]);

    console.log("This is the result: ", result);
    res.send("Added to db");

    //just recipe and food
    } else if(favoriteRecipe != '' && favoriteFood != '' && bio == '' && (selectedImage == '' || selectedImage == null)) {
      console.log("8");
      const result = await connection.query(`
      INSERT INTO Bio (Username, favoriteFood, favoriteRecipe)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE favoriteFood = ?, favoriteRecipe = ?;
    `, [username, favoriteFood, favoriteRecipe, favoriteFood, favoriteRecipe]);

    console.log("This is the result: ", result);
    res.send("Added to db");

    //just food and img
    } else if(favoriteFood != '' && selectedImage != '' && bio == '' && favoriteRecipe == '') {
      console.log("9");
      const result = await connection.query(`
      INSERT INTO Bio (Username, favoriteFood, imgUrl)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE favoriteFood = ?, imgUrl = ?;
    `, [username, favoriteFood, selectedImage, favoriteFood, selectedImage]);

    console.log("This is the result: ", result);
    res.send("Added to db");

    //just recipe and img
    } else if (favoriteRecipe != '' && selectedImage != '' && bio == '' && favoriteFood == '') {
      console.log("10");
      const result = await connection.query(`
      INSERT INTO Bio (Username, favoriteRecipe, imgUrl)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE favoriteRecipe = ?, imgUrl = ?;
    `, [username, favoriteRecipe, selectedImage, favoriteRecipe, selectedImage]);

    console.log("This is the result: ", result);
    res.send("Added to db");

    //just bio food and recipe
    } else if(bio != '' && favoriteFood != '' && favoriteRecipe != '' && (selectedImage == '' || selectedImage == null) ) {
      console.log("11");
      const result = await connection.query(`
      INSERT INTO Bio (Username, bio, favoriteFood, favoriteRecipe)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE bio = ?, favoriteFood = ?, favoriteRecipe = ?;
    `, [username, bio, favoriteFood, favoriteRecipe, bio, favoriteFood, favoriteRecipe]);

    console.log("This is the result: ", result);
    res.send("Added to db");

    //just bio, food and img
    } else if(bio != '' && favoriteFood != '' && selectedImage != '' && favoriteRecipe == '' ) {
      console.log("12");
      const result = await connection.query(`
      INSERT INTO Bio (Username, bio, favoriteFood, imgUrl)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE bio = ?, favoriteFood = ?, imgUrl = ?;
    `, [username, bio, favoriteFood, selectedImage, bio, favoriteFood, selectedImage]);

    console.log("This is the result: ", result);
    res.send("Added to db");

    //just bio recipe and img
    } else if(bio != '' && favoriteRecipe != '' && selectedImage != '' && favoriteFood == '' ) {
      console.log("13");
      const result = await connection.query(`
      INSERT INTO Bio (Username, bio, favoriteRecipe, imgUrl)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE bio = ?, favoriteRecipe = ?, imgUrl = ?;
    `, [username, bio, favoriteRecipe, selectedImage, bio, favoriteRecipe, selectedImage]);

    console.log("This is the result: ", result);
    res.send("Added to db");

    //just food recipe and img
    } else if (favoriteFood != '' && favoriteRecipe != '' && selectedImage != '' && bio == '') {
      console.log("14");
      const result = await connection.query(`
      INSERT INTO Bio (Username, favoriteFood, favoriteRecipe, imgUrl)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE favoriteFood = ?, favoriteRecipe = ?, imgUrl = ?;
    `, [username, favoriteFood, favoriteRecipe, selectedImage, favoriteFood, favoriteRecipe, selectedImage]);

    console.log("This is the result: ", result);
    res.send("Added to db");

    //bio food recipe img
    } else {
      console.log("15");
        const result = await connection.query(`
        INSERT INTO Bio (Username, bio, favoriteFood, favoriteRecipe, imgUrl)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE bio = ?, favoriteFood = ?, favoriteRecipe = ?, imgUrl = ?;
      `, [username, bio, favoriteFood, favoriteRecipe, selectedImage, bio, favoriteFood, favoriteRecipe, selectedImage]);

      console.log("This is the result: ", result);
      res.send("Added to db");
      }

    } catch (error) {
    console.error('Error performing upsert operation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

app.get('/getTaggedRecipes/:username', async(req,res) =>{
  console.log("Inside get tagged recipes");
  try {
    const username = req.params.username;
    console.log("Username: ", username);
    var finalUserID = await getUserID(username, res);
    console.log("UserID: ", finalUserID);
  //select * so we can also get notes and display that
  query = `
  SELECT CustomRecipe.crID, CustomRecipe.Tag, CustomRecipe.Title, CustomRecipe.Description, IngredientList.list, CustomRecipe.notes
  FROM CustomRecipe
  JOIN UserRecipes ON CustomRecipe.crID = UserRecipes.crID
  JOIN IngredientList ON CustomRecipe.ilID = IngredientList.ilID
  WHERE UserRecipes.userID = ${finalUserID} AND CustomRecipe.Tag IS NOT NULL;
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
  return; 
}
});

app.post('/untagRecipes/:crID' , async(req, res) => {
  const crID = req.params.crID;
  try {
    const query = `
    Update CustomRecipe
    Set Tag = NULL
    where crID = ${crID};
    `;
    const result = await db.pool.query(query);
    console.log(result);
    console.log(query);
    res.send("Tag removed");

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }

});

app.post('/setTaggedRecipes/:crID', async(req, res) => {
  const crID = req.params.crID;
  console.log("This is the crID for taggedRecipes: ", crID);
  const {username} = req.body;
  const {tagText} = req.body;
  console.log("This is the crid: ", crID, "This is the text: ", tagText);
  //var finalUserID = await getUserID(username, res);
  if(tagText == '' || tagText == null) {
    res.send("Tag empty, db not updated")
    return;
  }

    try {
      const query = `
      Update CustomRecipe
      Set Tag = '${tagText}'
      where crID = ${crID}
      `;
      const result = await db.pool.query(query);
      console.log(result);
      console.log(query);
      res.send("Tags Updated");
  
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Internal Server Error');
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

app.post('/registration', async (req, res) => {
  const { firstname } = req.body;
  const { lastname } = req.body;
  const { username } = req.body;
  const { password } = req.body;
  const { email } = req.body;
  const { isMaker } = req.body;
  console.log('This is the firstname:', firstname);
  console.log('This is the lastname:', lastname);
  console.log('This is the username:', username);
  console.log('This is the password:', password);
  console.log('This is the email:', email);
  console.log("This is ismaker: ", isMaker)
 
  try {
      const connection = await db.pool.getConnection();
      const result = await connection.query('SELECT * FROM User WHERE username = ?', [username]);
      connection.release();
      console.log("This is the result: ", result);

      if (result.length >= 1) {
          // Username already exists so must choose another one
          console.log("Username already exists");
          res.status(401).json({ message: 'Username already exists' });
      } else {
          // Valid registration
          //INSERT INTO QUERY ***
          //Creating a unique UserID for database
        var userID = 0;

        //Have to make sure the primary key is unique
        //Checking the ingredientList table to ensure generated id is unique
        var isUnique = false;
        while(!isUnique)
        {
          while (!isUnique) {
            userID = Math.floor(Math.random() * 10000) + 1;
            console.log('Random integer for User ID:', userID);
        
            try {
              const rows = await db.pool.query(`SELECT UserID FROM User WHERE userID = ${userID}`);
              
              if (rows.length === 0) {
                isUnique = true;
                console.log('No rows found for userID:', userID);
              } else {
                isUnique = false;
                console.log('Rows found for userID:', userID);
              }
            } catch (error) {
              console.error('Query error:', error);
            }
          }
        }

          //const query = `INSERT INTO User (UserID, Firstname, Lastname, Username, Password, Email)
          //VALUES (${userID}, ${firstname}, ${lastname}, ${username}, ${password}, ${email}); `
          const query_CR = 'INSERT INTO User (UserID, Firstname, Lastname, Username, Password, Email, isMaker ) VALUES (?, ?, ?, ?, ?, ?, ?)';
          const values_CR = [userID, firstname, lastname, username, password, email, isMaker];
          queryDatabase(query_CR, values_CR);

          /*try {
            const result = await db.pool.query(query);
            console.log(result);
            console.log(query);
            res.send("Account added");
        
        
          } catch (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
          }*/

      }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
 
});

//Returns the JSON of [ { isMaker: 1 } ]


app.get('/checkMaker/:username', async (req,res)=>{
  try{

 
  const username = req.params.username;
  console.log(username);
  var finalUserID = await getUserID(username,res);

  //Query the database for the isMaker param
  const result = await db.pool.query(`Select isMaker from User where userID = ${finalUserID}`)
  console.log("here")
  if(result != null)
  {
    console.log("here", result[0].isMaker)
    if(result[0].isMaker != 1 && result[0].isMaker != 0)
    {
      res.status(400).send({ error: "Invalid isMaker value" });
    }
    else
    {
      console.log("sending maker result");
      res.send(result);
      
    }
  }
  else
  {
    res.status(400).send({ error: "Invalid isMaker was null" });
  }
}
catch{
    console.log("User was invalid")
}
})


app.get('/getCustomRecipe', async (req, res) => {

  //Data from the post request
  try {
      const result = await db.pool.query("Select crID, Title, Description, il.ilID, list from CustomRecipe as cs JOIN IngredientList as il on cs.crID = il.ilID WHERE il.ilID = 5090");
      res.send(result);
  } catch (err) {
      throw err;
  }

});


app.post('/saveSearchedRecipe', async (req,res) =>{
  const {summary} = req.body.summary;
  const {title} = req.body.title;
  const {ingredients} = req.body.ingredients;
  console.log("This is title ", title);
  console.log("This is summary", summary);
  console.log("This is ingredients", ingredients);

})

app.get('/topIngredients/:username', async (req, res) =>{

  try{
  //Get the userID for the user
  const username = req.params.username;
  console.log(username);
  var finalUserID = await getUserID(username,res);

  //Query the database for all ingredients from every recipe
  query = `
  SELECT IngredientList.list
  FROM CustomRecipe
  JOIN UserRecipes ON CustomRecipe.crID = UserRecipes.crID
  JOIN IngredientList ON CustomRecipe.ilID = IngredientList.ilID
  WHERE UserRecipes.userID = ${finalUserID};
  `;
  const result = await db.pool.query(query);
  console.log(result);

  //Turn ingredients from JSON in to a list of every single item repeated, not unique like a set
  var allIngredients = result.map(item => item.list.ingredients).flat();
  console.log(allIngredients);

  // Create an object to store the count of each ingredient
  const ingredientCount = {};

  // Count occurrences of each ingredient
  allIngredients.forEach(ingredient => {
    ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1;
  });

  // Convert the object into an array of { ingredient, count } pairs
  const countArray = Object.entries(ingredientCount).map(([ingredient, count]) => ({ ingredient, count }));

  // Sort the array in descending order based on count
  countArray.sort((a, b) => b.count - a.count);

  // Get the top 3 most common ingredients
  const top3Ingredients = countArray.slice(0, 3);

  console.log(top3Ingredients);
  res.send(top3Ingredients);
}
catch{
  res.status(404)
}
  


})

app.post("/PersonalizedSearch", async (req, res)=>{
  
  const {ingredients} = req.body;
  console.log("Ingredients in personalized search",ingredients);

  //Want to format ingredients like [ing1, ing2] -> "ing1,ing2"
  let ingredientString = ingredients.join(',');
  //Want to get rid of any whitespace
  ingredientString = ingredientString.replace(/\s/g, '')
  console.log(ingredientString)

  //Now we just have to query the api for the recipes matching those ingredients
  let apiQuery = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientString}&number=5&apiKey=${apiKEY}`

  let responseArray = [];
  axios(apiQuery)
  .then(result =>{
      console.log(result)

      //Get the title and id for each element
      result.data.forEach(element => {
        console.log(element.id)
        console.log(element.title)
        responseArray.push(element.id)
        responseArray.push(element.title)
      });
      console.log(responseArray);

      //Map each id to its title in a dictionary like way
      const finalJSON = {};
      for (let i = 0; i < responseArray.length; i += 2) {
        const id = responseArray[i];
        const title = responseArray[i + 1];
        finalJSON[id] = title;
      }

      const finalArray = [];
      //Give the keys a name of id and the titles a name of title
      for (let i = 0; i < responseArray.length; i += 2) {
        const id = responseArray[i];
        const title = responseArray[i + 1];
        finalArray.push({ id: id.toString(), title });
      }

      console.log(finalArray);
      
      res.send(finalArray);

      
  })
  //Want to get the titles and Ids from each recipe in the JSON
  
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});