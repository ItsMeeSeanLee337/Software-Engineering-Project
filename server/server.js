const express = require('express');
const db = require('./db')
const app = express();
const cors = require('cors')
const axios = require('axios');
const bodyParser = require("body-parser");
const { createConnection } = require('mariadb');
const e = require('express');
const PORT = 8080;
const apiKEY = 'key'
const bcrypt = require('bcrypt');
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

// Unit Tested
/*Used for Create Recipe Section */
//Will insert a recipe into the database given a title, steps, and ingredients
app.post('/createRecipe/:username', async (req, res) => {
  try {
    const username = req.params.username; //Get the username from the parameter passed

    //Use a function to turn the username into the userID
    var userID = await getUserID(username, res);
    //Getting the parameters from the form
    const { title } = req.body;
    const { steps } = req.body;
    const { ingredients } = req.body;

    //Make sure the fields are valid
    //If they aren't return a JSON with an error message
    if (title === undefined || steps === undefined || ingredients === undefined) {
      let responseData = {
        error: "missing recipe field"
      };
      console.error(responseData);
      res.status(400).json(responseData);
      return; //Don't let the rest of the function run
    }

    //Creating a unique ilID for the ingredients table
    var ilID = Math.floor(Math.random() * 10000) + 1;
    console.log('Random integer for ingredient ID:', ilID);

    //Have to make sure the primary key is unique
    //Checking the ingredientList table to ensure generated id is unique
    var isUnique = false;
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

  //Constructing query to insert the custom recipe into the table on DB with ilID
  const query_CR = 'INSERT INTO CustomRecipe (crID, Title, Description, ilID, isMakerRecipe) VALUES (?, ?, ?, ?, ?)';
  const values_CR = [ilID, title, steps, ilID, makerFinal];

  queryDatabase(query_CR, values_CR);

  //Now add it to the userrecipe table to link it to them
  const query_UR = 'Insert into UserRecipes(userID, crID) Values(?, ?);';
  const values_UR = [userID, ilID];
      
  queryDatabase(query_UR, values_UR);
    
  //Construct a JSON with the final fields and data to send back
  let responseData = {
    title: title,
    steps: steps,
    ingredients: ingredients,
    message: 'Recipe successfully inserted'
  };

  res.status(200).json(responseData);
} catch (error) {
  let responseData = {
    error: 'Error inserting recipe'
  };
  console.log(responseData)
  res.status(400).json(responseData);
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


//Returns all of the custom recipe for a given user on request
app.get('/CustomRecipe/Display/:username', async (req, res) => {
  try {
    //Get the userID based on the username passed in the url params
    const username = req.params.username;
    console.log(username);
    var finalUserID = await getUserID(username, res);

    //Check if the username was given
    if (username === undefined) {
      let responseData = {
        error: 'No username for display recipes'
      };
      res.status(400).json(responseData)
      console.log(responseData)
    }

    //Query for the data base for the recipes
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

app.get('/MakerRecipes/Display', async (req, res) => {
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

/*
  Deletes a recipe from the data base given the crid and username
*/
app.post('/deleteCustomRecipe', async (req, res) => {
  console.log("here in deleteCustom");
  const { username } = req.body;
  const { crID } = req.body;
  console.log(username);
  console.log(crID)

  //Get the user id for the username
  const userID = await getUserID(username, res);

  //Construct the query to delete the recipe
  const query = `
  DELETE ur
  FROM CustomRecipe cr
  JOIN UserRecipes ur ON ur.crID = cr.crID
  JOIN User u ON u.UserID = ur.userID
  WHERE u.Username = '${username}'
  AND cr.crID = '${crID}';`

  //Try to delete the recipe
  try {
    const result = await db.pool.query(query);
    console.log(result);
    console.log(query);
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

/*
  Save the recipe notes for a user given the crid and the notes for the user
*/
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

/*
  Will get the notes for a given crid
*/
app.get('/getRecipeNotes/:crID', async (req, res) => {
  try {
      const crID = req.params.crID;
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

app.get('/listOfIngredients/:username', async (req, res) => {
  try {
    // Get the userID for the user
    const username = req.params.username;
    console.log(username);
    var finalUserID = await getUserID(username, res);

    // Query the database for all ingredients from every recipe
    query = `
      SELECT IngredientList.list
      FROM CustomRecipe
      JOIN UserRecipes ON CustomRecipe.crID = UserRecipes.crID
      JOIN IngredientList ON CustomRecipe.ilID = IngredientList.ilID
      WHERE UserRecipes.userID = ${finalUserID};
    `;
    const result = await db.pool.query(query);
    console.log(result);

    // Extract ingredients from the result and flatten the array
    const allIngredients = result.map((item) => item.list.ingredients).flat();
    console.log(allIngredients);

    // Get a list of unique ingredients using Set
    const uniqueIngredients = [...new Set(allIngredients)];

    console.log(uniqueIngredients);
    res.send(uniqueIngredients);
  } catch {
    res.status(404);
  }
});


//This is for displaying bio page for a user
app.post('/getBio', async(req,res) => {
  //passing in username from request body
  const {username} = req.body;
  console.log("This is the username: ", username);
  try {
    //Querying Bio table in DB to see if the user has created a bio
    const connection = await db.pool.getConnection();
    const result = await connection.query('SELECT * FROM Bio WHERE username = ?', [username]);
    connection.release();
    console.log("This is the result: ", result);

    if (result.length >= 1) {
        // Valid entry in bio
        res.json(result);
    } else {
        // User not found in bio
        console.log("Invalid");
        res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

});

//This is for create/edit bio updating db based on what user updated
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
      const result = await connection.query(`
      INSERT INTO Bio (Username, bio)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE bio = ?;
      `, [username, bio, bio]);
      res.send("Added to db");

    //just favorite food
    } else if(favoriteFood != '' && bio == '' && favoriteRecipe == '' && (selectedImage == '' || selectedImage == null)) {
      const result = await connection.query(`
      INSERT INTO Bio (Username, favoriteFood)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE favoriteFood = ?;
      `, [username, favoriteFood, favoriteFood]);
      res.send("Added to db");

    //just recipe
    } else if(favoriteRecipe != '' && bio == '' && favoriteFood == '' && (selectedImage == '' || selectedImage == null)) {
      const result = await connection.query(`
      INSERT INTO Bio (Username, favoriteRecipe)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE favoriteRecipe = ?;
      `, [username, favoriteRecipe, favoriteRecipe]);
      res.send("Added to db");
    //just img
    } else if(selectedImage != '' && bio == '' && favoriteFood == '' && favoriteRecipe == '') {
      const result = await connection.query(`
      INSERT INTO Bio (Username, imgUrl)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE imgUrl = ?;
      `, [username, selectedImage, selectedImage]);
      res.send("Added to db");

    //just bio and recipe
    } else if(bio != '' && favoriteRecipe != '' && favoriteFood == '' && (selectedImage == '' || selectedImage == null)) {
      const result = await connection.query(`
      INSERT INTO Bio (Username, bio, favoriteRecipe)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE bio = ?, favoriteRecipe = ?;
      `, [username, bio, favoriteRecipe, bio, favoriteRecipe]);
      res.send("Added to db");

    //just bio and food
    } else if(bio != '' && favoriteFood != '' && favoriteRecipe == '' && (selectedImage == '' || selectedImage == null)) {
      const result = await connection.query(`
      INSERT INTO Bio (Username, bio, favoriteFood)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE bio = ?, favoriteFood = ?;
      `, [username, bio, favoriteFood, bio, favoriteFood]);
      res.send("Added to db");

    //just bio and img
    }else if(bio != '' && selectedImage != '' && favoriteRecipe == '' && favoriteFood == ''){
      const result = await connection.query(`
      INSERT INTO Bio (Username, bio, imgUrl)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE bio = ?, imgUrl = ?;
      `, [username, bio, selectedImage, bio, selectedImage]);
      res.send("Added to db");

    //just recipe and food
    } else if(favoriteRecipe != '' && favoriteFood != '' && bio == '' && (selectedImage == '' || selectedImage == null)) {
      const result = await connection.query(`
      INSERT INTO Bio (Username, favoriteFood, favoriteRecipe)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE favoriteFood = ?, favoriteRecipe = ?;
      `, [username, favoriteFood, favoriteRecipe, favoriteFood, favoriteRecipe]);
      res.send("Added to db");

    //just food and img
    } else if(favoriteFood != '' && selectedImage != '' && bio == '' && favoriteRecipe == '') {
      const result = await connection.query(`
      INSERT INTO Bio (Username, favoriteFood, imgUrl)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE favoriteFood = ?, imgUrl = ?;
      `, [username, favoriteFood, selectedImage, favoriteFood, selectedImage]);
      res.send("Added to db");

    //just recipe and img
    } else if (favoriteRecipe != '' && selectedImage != '' && bio == '' && favoriteFood == '') {
      const result = await connection.query(`
      INSERT INTO Bio (Username, favoriteRecipe, imgUrl)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE favoriteRecipe = ?, imgUrl = ?;
      `, [username, favoriteRecipe, selectedImage, favoriteRecipe, selectedImage]);
      res.send("Added to db");

    //just bio food and recipe
    } else if(bio != '' && favoriteFood != '' && favoriteRecipe != '' && (selectedImage == '' || selectedImage == null) ) {
      const result = await connection.query(`
      INSERT INTO Bio (Username, bio, favoriteFood, favoriteRecipe)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE bio = ?, favoriteFood = ?, favoriteRecipe = ?;
      `, [username, bio, favoriteFood, favoriteRecipe, bio, favoriteFood, favoriteRecipe]);
      let response = {
        message: "Added to db",
        bio : bio,
        favoriteFood : favoriteFood,
        favoriteRecipe : favoriteRecipe
      }
      res.send(response);

    //just bio, food and img
    } else if(bio != '' && favoriteFood != '' && selectedImage != '' && favoriteRecipe == '' ) {
      console.log("12");
      const result = await connection.query(`
      INSERT INTO Bio (Username, bio, favoriteFood, imgUrl)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE bio = ?, favoriteFood = ?, imgUrl = ?;
      `, [username, bio, favoriteFood, selectedImage, bio, favoriteFood, selectedImage]);
      res.send("Added to db");

    //just bio recipe and img
    } else if(bio != '' && favoriteRecipe != '' && selectedImage != '' && favoriteFood == '' ) {
      const result = await connection.query(`
      INSERT INTO Bio (Username, bio, favoriteRecipe, imgUrl)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE bio = ?, favoriteRecipe = ?, imgUrl = ?;
      `, [username, bio, favoriteRecipe, selectedImage, bio, favoriteRecipe, selectedImage]);
      res.send("Added to db");

    //just food recipe and img
    } else if (favoriteFood != '' && favoriteRecipe != '' && selectedImage != '' && bio == '') {
      const result = await connection.query(`
      INSERT INTO Bio (Username, favoriteFood, favoriteRecipe, imgUrl)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE favoriteFood = ?, favoriteRecipe = ?, imgUrl = ?;
      `, [username, favoriteFood, favoriteRecipe, selectedImage, favoriteFood, favoriteRecipe, selectedImage]);
      res.send("Added to db");

    //bio food recipe img (update all)
    } else {
        const result = await connection.query(`
        INSERT INTO Bio (Username, bio, favoriteFood, favoriteRecipe, imgUrl)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE bio = ?, favoriteFood = ?, favoriteRecipe = ?, imgUrl = ?;
        `, [username, bio, favoriteFood, favoriteRecipe, selectedImage, bio, favoriteFood, favoriteRecipe, selectedImage]);
        res.send("Added to db");
      }
  } catch (error) {
    console.error('Error performing upsert operation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});

//getting all the tagged recipes 
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

//remove tag from recipe if user chooses to untag it
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
    let response = {
      message : "Tag Removed",
      crID : crID
    }
    res.status(200).json(response);

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }

});

//setting tags to recipes 
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
      let response = {
        message: "Tags Updated",
        crID : crID,
        tagText : tagText
      }
      res.status(200).json(response);
  
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Internal Server Error');
    }


});


async function comparePasswords(enteredPassword, storedHash) {
  try {
      const result = await bcrypt.compare(enteredPassword, storedHash);
      console.log('Comparison Result:', result);
      return 1;
  } catch (error) {
      console.error(error);
      return 0;
  }
}

//endpoint for login
app.post('/login', async (req, res) => {
  //getting the username and password from the request body
  const { username } = req.body;
  let { password } = req.body;

  const plaintextPassword = password; // Replace this with the actual user input
  //printing values to console
  console.log('This is the username:', username);
  console.log('This is the password:', password);
  try {
    //querying User table in DB to see if user exists
    const connection = await db.pool.getConnection();
    const result = await connection.query('SELECT * FROM User WHERE username = ? AND password = ?', [username, password]);
    connection.release();
    console.log("This is the result: ", result);
    
    if (result.length >= 1) {
      // Valid login
      console.log("This is password from result:", result[0].Password);
      res.status(200).json(result);
    } else {
      // Invalid login
      //Check for the encrypted password account type
      console.log("Hashed:", password);
      try {
        const connection = await db.pool.getConnection();
        const result = await connection.query('SELECT Password FROM User WHERE username = ?', [username]);
        connection.release();
        console.log("This is the result: ", result);
      
        if (result.length >= 1) {
          // Valid login
          //Valid result need to compare passwords and its stored hash
          let isSame = await bcrypt.compare(password, result[0].Password);
          if(isSame === true) {
            const result = await connection.query('SELECT * FROM User WHERE username = ?', [username]);
            res.status(200).json(result);
          } else {
              console.log("Invalid Login");
              res.status(401).json({ message: 'Invalid login credentials' });
          }
        } else {
          // Invalid login
          //Check for the encrypted password account type
          console.log("Invalid Login");
          res.status(401).json({ message: 'Invalid login credentials' });
        }
      } catch (error) {
          console.error('Database error:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        }      
    }
  } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
   
});

//setting recipes to save to meal planner based on the button they click for the recipe
app.post('/setMealPlannerRecipes/:crID', async(req, res) => {
  const crID = req.params.crID;
  console.log("This is the crID for setting meal planner recipies: ", crID);
  const {username} = req.body;
  console.log("This is the username for meal planner: ", username);

  try {
    var finalUserID = await getUserID(username, res);
    console.log("UserID: ", finalUserID);
    //needs to be an insert
    const query = `
      INSERT INTO MealPlanner (userID, crID, Username)
      VALUES (?, ?, ?)
    `;
    
    const result = await db.pool.query(query, [finalUserID, crID, username]);
    //res.send("Meal Plan Recipe added");


    let response = {
      message: "Meal Plan Recipe added",
      crID : crID,
      username : username
    }
    res.status(200).json(response);

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }

});

//get the recipes added to meal planner
app.get('/getMealPlannerRecipes/:username', async(req, res) => {
  console.log("Inside get mealplanned recipes");
  try {
    const username = req.params.username;
    console.log("Username: ", username);
    var finalUserID = await getUserID(username, res);
    console.log("UserID: ", finalUserID);
    //first query is to get the crids for each day (since a day can have multiple recipes)
    const query1 = `
    SELECT crID FROM MealPlanner WHERE userID = ${finalUserID};`;
    const result = await db.pool.query(query1);
    console.log("First query: ", result);

    // Extract crID values from the result
    const crIDValues = result.map(row => row.crID);

     // Array to store all recipe results
    const allRecipeResults = [];

    // Loop through each recipe (crID) and query the CustomRecipe table to get the recipe info such as title, description, ingredients, etc. 
    for (const crID of crIDValues) {
      const query2 = `SELECT CustomRecipe.crID, CustomRecipe.Title, CustomRecipe.Description, IngredientList.list, CustomRecipe.calories, CustomRecipe.protein, CustomRecipe.fat, CustomRecipe.carbs 
                      FROM CustomRecipe
                      JOIN UserRecipes ON CustomRecipe.crID = UserRecipes.crID
                      JOIN IngredientList ON CustomRecipe.ilID = IngredientList.ilID
                      WHERE UserRecipes.userID = ${finalUserID} AND CustomRecipe.crID = ${crID};`;
      const recipeResult = await db.pool.query(query2);

      // Push the result of each recipe info
      allRecipeResults.push({ crID, recipes: recipeResult });
      console.log('Recipe for crID', crID, ':', recipeResult);
    }
    res.send(allRecipeResults);

  } catch(error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }


});

//sets recipe to day
app.post('/setDay/:crID', async(req, res) => {
  const crID = req.params.crID;
  console.log("This is the crID for taggedRecipes: ", crID);
  const {username} = req.body;
  const {dayText} = req.body;
  const upperCaseDayText = dayText.toUpperCase();

  console.log("This is the crid: ", username, "This is the text: ", upperCaseDayText);
  try {
    //query DaysOfWeek table in DB to add the recipe id and the day of week for the specific userID/username
    var finalUserID = await getUserID(username, res);
    console.log("UserID: ", finalUserID);
    const query = `
      INSERT INTO DaysOfWeek (userID, Username, crID, dayOfWeek)
      VALUES (?, ?, ?, ?)
    `;
    const result = await db.pool.query(query, [finalUserID, username, crID, upperCaseDayText]);
    console.log(result);
    //res.send("Meal Plan Day added!");
    let response = {
      message: "Meal Plan Day set",
      crID : crID,
      username : username,
      dayText : upperCaseDayText
    }
    res.status(200).json(response);

  } catch (error) {
    console.error('Error executing query:', error);
    //res.status(500).send('Internal Server Error');
    let response = {
      message: "Invalid Day!",
    }
    res.status(500).json(response);
  }

});

//gets recipes for the requested day
app.post('/getDay/:day', async(req, res) => {
  console.log("Here in getDay")
  try {
    const day = req.params.day;
    const dayToUpper = day.toUpperCase();
    console.log("day: ", dayToUpper);
    const {username} = req.body;
    console.log("Username: ", username);
    var finalUserID = await getUserID(username, res);
    console.log("UserID: ", finalUserID);
    //first query is to get the crids for each day (since a day can have multiple recipes)
    const query1 = `
    SELECT crID FROM DaysOfWeek WHERE userID = '${finalUserID}' AND dayOfWeek = '${dayToUpper}';`;
    const result = await db.pool.query(query1);
    console.log("First query: ", result);
    
    const crIDValues = result.map(row => row.crID);
    const allDayRecipeResults = [];

    // Loop through each recipe (crID) and query the CustomRecipe table to get the recipe info such as title, description, ingredients, etc. 
    for (const crID of crIDValues) {
      const query2 = `SELECT CustomRecipe.crID, CustomRecipe.Title, CustomRecipe.Description, IngredientList.list, CustomRecipe.calories, CustomRecipe.protein, CustomRecipe.fat, CustomRecipe.carbs 
                      FROM CustomRecipe
                      JOIN UserRecipes ON CustomRecipe.crID = UserRecipes.crID
                      JOIN IngredientList ON CustomRecipe.ilID = IngredientList.ilID
                      WHERE UserRecipes.userID = ${finalUserID} AND CustomRecipe.crID = ${crID};`;
      const recipeResult = await db.pool.query(query2);

      // Push the result of each recipe 
      allDayRecipeResults.push({ crID, recipes: recipeResult });
      console.log('Recipe for crID', crID, ':', recipeResult);
    }
    res.send(allDayRecipeResults);

  } catch(error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }
});

//drops meal for the day
app.post('/dropMeal/:crID', async(req, res) => {
  const crID = req.params.crID;
  console.log("This is the crID for taggedRecipes: ", crID);
  const {username} = req.body;
  const {clickedDay} = req.body;
  const upperCaseDayText = clickedDay.toUpperCase();
  try {
    //delete where the day and crid and userid match the users request from the DaysOfWeek table in DB
    var finalUserID = await getUserID(username, res);
    console.log("UserID: ", finalUserID);
    const query = `
      DELETE FROM DaysOfWeek WHERE userID = '${finalUserID}' AND crID = '${crID}' AND dayOfWeek = '${upperCaseDayText}'
    `;
    const result = await db.pool.query(query);
    console.log(result);
    //res.send("Removed recipe!");
    let response = {
      message: "Removed recipe!",
      crID : crID,
      username : username,
      clickedDay : upperCaseDayText
    }
    res.status(200).json(response);


  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }
  
});

//drops the recipe from the meal planner
app.post('/dropMealPlanMeal/:crID', async(req, res) => {
  const crID = req.params.crID;
  console.log("This is the crID for dropping meal plan : ", crID);
  const {username} = req.body;
  try {
    //if deleting from meal planner we need to first delete the recipe from the meal planner table and then delete from days of week table
    //we dont want any days to contain the saved recipe if we want to remove the saved recipe from meal planner
    var finalUserID = await getUserID(username, res);
    console.log("UserID: ", finalUserID);
    //Deleting from MealPlanner table
    const query1 = `
      DELETE FROM MealPlanner WHERE userID = '${finalUserID}' AND crID = '${crID}' 
    `;
    const result1 = await db.pool.query(query1);
    //Deleting from DaysOfWeek table
    const query2 = `
    DELETE FROM DaysOfWeek WHERE userID = '${finalUserID}' AND crID = '${crID}' 
  `;
  const result2 = await db.pool.query(query2);
  //res.send("Removed recipe from meal planner and days!");
  let response = {
    message: "Removed recipe from meal planner and days!",
    crID : crID,
    username : username
  }
  res.status(200).json(response);

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }
});

const getEncryptedPassword = async function(plaintextPassword) {
  const saltRounds = 0;

  return new Promise((resolve, reject) => {
      bcrypt.hash(plaintextPassword, saltRounds, (err, hash) => {
          if (err) {
              // Handle error
              console.error(err);
              reject(err);
          } else {
              // Resolve with the hash value
              console.log('Hashed Password:', hash);
              resolve(hash);
          }
      });
  });
};


app.post('/registration', async (req, res) => {
  const { firstname } = req.body;
  const { lastname } = req.body;
  const { username } = req.body;
  var { password } = req.body;
  const { email } = req.body;
  const { isMaker } = req.body;
  console.log('This is the firstname:', firstname);
  console.log('This is the lastname:', lastname);
  console.log('This is the username:', username);
  console.log('This is the password:', password);
  console.log('This is the email:', email);
  console.log("This is ismaker: ", isMaker)

 

    
    
  if(password === "" || password === undefined)
  {
    let response = {
      message : "Password is blank",
    }
    res.status(401).json(response);
    return;
  }

  if(username === "" || username === undefined) 
  {
    let response = {
      message : "Username is blank",
    }
    res.status(401).json(response);
    return;
  }

  const plaintextPassword = password; // Replace this with the actual user input
  
    password = await getEncryptedPassword(plaintextPassword);
    console.log("This is hashed password again after function" , password);
 
  try {
    console.log("This is hashed password again" , password);
      const connection = await db.pool.getConnection();
      const result = await connection.query('SELECT * FROM User WHERE username = ?', [username]);
      connection.release();
      console.log("This is the result: ", result);

      if (result.length >= 1) {
          // Username already exists so must choose another one
          console.log("Username already exists");
          let response = {
            username : username,
            fistname : firstname,
            lastname : lastname,
            lastname : lastname,
            lastname : lastname,
            isMaker : isMaker
          }
          res.status(401).json(response);
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
  for (let i = countArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [countArray[i], countArray[j]] = [countArray[j], countArray[i]];
  }

  // Get the top 3 most common ingredients
  const top5Ingredients = countArray.slice(0, 5);

  console.log(top5Ingredients);
  res.send(top5Ingredients);
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

async function getRandomRecipes(numberOfRecipes) {
  const responseArray = [];

  // Make multiple calls to the "Random Recipe" endpoint
  for (let i = 0; i < numberOfRecipes; i++) {
    let apiQuery = `https://api.spoonacular.com/recipes/random?apiKey=${apiKEY}`
    const result = await axios(apiQuery)

      console.log(result.data.recipes)
          
      //Get the title and id for each element
      result.data.recipes.forEach(element => {
        console.log(element.id)
        console.log(element.title)
        responseArray.push(element.id)
        responseArray.push(element.title)
      });
      console.log(responseArray);
    
  }
  return responseArray;
  
}



app.post("/PersonalizedRandomSearch", async (req, res)=>{

getRandomRecipes(3)
.then(result =>{
    console.log(result)
    let responseArray = result;
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
      
  })

  



  


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//  THESE ENDPOINTS ARE USED TO TEST ORIGINAL ENDPOINTS WITH SLIGHT ALTERATIONS TO WORK FOR TESTING

const apiRecipe = 8364

// Used to test the delete recipe endpoint by selecting a random recipe from the user's recipes
app.post('/deleteCustomRecipeTest' , async(req,res)=>{

  //get reandom recipe crID
  //will not check for empty json as its impossible to trigger the delete recipe endpoint without one
  let recipe = await axios("http://172.16.122.26:8080/CustomRecipe/Display/api")
  recipe = recipe.data
  console.log(recipe)

  console.log(Object.keys(recipe).length === 0 || (Object.keys(recipe).length === 1 && recipe[0].crID === apiRecipe))
  //return;
  if(Object.keys(recipe).length === 0 || (Object.keys(recipe).length === 1 && recipe[0].crID === apiRecipe))
  {
    let response = {
      error: `No recipes for user`
    }
    res.status(400).json(response);
    return;
  }

  console.log("here in deleteCustom");
  const username = "api";
  
  
  let crID = recipe[0].crID;
  if(crID === apiRecipe)
  {
    crID = recipe[1].crID;
  }
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


  let response = {
    message: `Recipe Deleted with crID ${crID}`
  }
  res.status(200).json(response);

})


app.post('/saveRecipeNotesTest/:username', async (req, res) => {
  try{
  const username = req.params.username;
  console.log(username);
  var finalUserID = await getUserID(username, res);
  

  const {notes} = req.body;
  //THIS IS HARD CODED FOR TESTING, SHOULD NEVER GET DELETED
  const thiscrID = apiRecipe;
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
      let response = {
        message: `Notes Updated with: ${notes}`
      }
      res.status(200).json(response);
        
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Internal Server Error');
    }


  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }

});


app.get('/getRecipeNotesTest/:crID', async (req, res) => {
  try {
      const crID = apiRecipe
      //const {crID} = req.body;
      console.log(crID)
      const result = await db.pool.query(`SELECT notes FROM CustomRecipe WHERE crID = ${crID}`);
      res.send(result);
  } catch (err) {
      throw err;
  }
});

app.post('/setCustomRecipeNutrition/:crID', async(req, res) => {
  const crID = req.params.crID;
  const {calorieData} = req.body;
  const {proteinData} = req.body;
  const {fatData} = req.body;
  const {carbData} = req.body;

  console.log("This is the crid for nutrition: ", crID);
  try {
    const query = `
      UPDATE CustomRecipe
      SET calories = ${calorieData},
          protein = ${proteinData},
          fat = ${fatData},
          carbs = ${carbData}
      WHERE crID = ${crID};
    `;
    const result = await db.pool.query(query);
    console.log(result);
    console.log(query);
    res.send("Nutrition info Updated");
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }
});



app.post('/registrationTest', async (req, res) => {
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
          let response = {
            message : "Username already exists",
            username : username,
            firstname : firstname,
            lastname : lastname,
            password : result[0].Password,
            email : email,
            isMaker : isMaker
          }
          res.status(401).json(response);
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


          db.pool.query(`Delete From User where username = "${username}"`)

          let response = {
            message : "Username already exists",
            username : username,
            firstname : firstname,
            lastname : lastname,
            password : password,
            email : email,
            isMaker : isMaker
          }
          res.status(200).json(response);
      }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

  
 
});

