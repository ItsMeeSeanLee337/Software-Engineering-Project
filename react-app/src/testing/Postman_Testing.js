/*
*   This is the code we used to test our endpoints via Postman
*   Each is labled by Unit Test: "Endpoint", "Senario"
*   This code will not do anything when run except via Postman
*/

// Unit Test: Create Recipe, correct input/output
// Make sure the endpoint gave a response
pm.test("Status code is 200", () => {
    pm.expect(pm.response.code).to.eql(200);
  });
  
  // Turn the response into a json var for testing
  const response = pm.response.json();
  
  // Tests to see if the correct fields were recieved by the server and given back to the client
  // This only consists of a proper test/response as the frontend handles field checking before sending
  // This endpoint should only every recieve proper information from Nutripro
  // If it recieved missing fields, the recipe will still be inserted
  
  // Make sure title field was properly sent and then recieved
  pm.test("Title field was recieved by server", () => {
    pm.expect(response.title).to.eql("postTest");
    pm.expect(response.title).to.be.a("string");
  });
  
  // Make sure steps field was properly sent and then recieved
  pm.test("Steps field was recieved by server", () => {
    pm.expect(response.steps).to.eql("postSteps");
    pm.expect(response.steps).to.be.a("string");
  });
  
  //Make sure steps field was properly sent and recieved
  pm.test("Steps field was recieved by server", () => {
    pm.expect(response.ingredients).to.have.members(["ing1", "ing2"]);
  });
  
  // Unit Test: Create Recipe, missing field
  //Make sure steps field was properly sent and recieved
  pm.test("Steps field was recieved by server", () => {
    pm.expect(response.message).to.eql("Recipe successfully inserted");
  });


  
// Make sure the endpoint gave a response indicating the error
pm.test("Status code is 400", () => {
    pm.expect(pm.response.code).to.eql(400);
  });
  
  // Turn the response into a json var for testing
  const response = pm.response.json();
  
  // Reason as to why the error was given by the endpoint
  pm.test("Recieved error message", () => {
    pm.expect(response.error).to.eql("missing recipe field");
  });


//Testing display endpoint to make sure the data coming from the server is properly formatted
// inside of the JSON and that it is not empty.

// Unit Test: Display Recipe, correct username 
// Make sure the endpoint gave a response indicating success
pm.test("Status code is 200", () => {
    pm.expect(pm.response.code).to.eql(200);
  });
  
  // Turn the response into a json var for testing
  const response = pm.response.json();
  
  // Make sure there was an actual response in JSON form
  pm.test("Response JSON is not empty", function() {
      pm.expect(Object.keys(response).length).to.be.greaterThan(0);
  });
  
  //Test the first object in the JSON for proper formatting
  // Make sure crID field was properly sent and then recieved
    pm.test("crID field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("crID");
    });
  
  // Make sure Title field was properly sent and then recieved
    pm.test("Title field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("Title");
    });
  
  // Make sure crID Description was properly sent and then recieved
    pm.test("Description field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("Description");
    });
  
  // Make sure list field was properly sent and then recieved
    pm.test("list field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("list");
    });
  
  // Make sure list field has ingredients inside of it
    pm.test("ingredients field was recieved by server", () => {
      pm.expect(response[0].list).to.have.property("ingredients");
    });
  
  
// Unit Test: Display Recipe, bad username
// Make sure the endpoint gave a response indicating the error
pm.test("Status code is 400", () => {
    pm.expect(pm.response.code).to.eql(400);
  });
  
  // Turn the response into a json var for testing
  const response = pm.response.json();
  
  // Make sure there was an actual response in JSON form
  pm.test("Response JSON is not empty", function() {
      pm.expect(Object.keys(response).length).to.be.greaterThan(0);
  });
  
  // Make sure there was an error sent by the server
  pm.test("Response JSON is not empty", function() {
      pm.expect(response).to.have.property("error");
  });
  
  // Make sure the error message indicates this was not a proper user
  pm.test("Response JSON is not empty", function() {
      pm.expect(response.error).to.eql("Not a user")
  });


//Testing the Maker/Display endpoint for correct formatting
//Displays maker recipes for regular users

//Unit Test: Display Maker Recipes, recipes present
// Make sure the endpoint gave a response indicating success
pm.test("Status code is 200", () => {
    pm.expect(pm.response.code).to.eql(200);
  });
  
  // Turn the response into a json var for testing
  const response = pm.response.json();
  
  // Make sure there was an actual response in JSON form
  pm.test("Response JSON is not empty", function() {
      pm.expect(Object.keys(response).length).to.be.greaterThan(0);
  });
  
  //Test the first object in the JSON for proper formatting
  // Make sure crID field was properly sent and then recieved
    pm.test("crID field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("crID");
    });
  
  // Make sure Title field was properly sent and then recieved
    pm.test("Title field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("Title");
    });
  
  // Make sure crID Description was properly sent and then recieved
    pm.test("Description field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("Description");
    });
  
  // Make sure list field was properly sent and then recieved
    pm.test("list field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("list");
    });
  
  // Make sure list field has ingredients inside of it
    pm.test("ingredients field was recieved by server", () => {
      pm.expect(response[0].list).to.have.property("ingredients");
    });
  

// Make sure the endpoint gave a response indicating success
pm.test("Status code is 200", () => {
    pm.expect(pm.response.code).to.eql(200);
  });
  
  // Turn the response into a json var for testing
  const response = pm.response.json();
  
  // Make sure the JSON was empty as there should be no recipes
  // Only used to test when empty, will fail if the above test succeeds and vice versa
  //One of this test or the above should always pass
  pm.test("Response JSON is empty", function() {
        pm.expect(Object.keys(response).length).to.equal(0);
  });
  

//Testing deleting recipes endpoint
//Uses a different endpoint made to test the endpoint as its impossible to test original enpoint
// without some alteration

//One of the tests should always pass; One should always fail
//Both should not fail

//Unit Test: Delete Recipe, recipes present
// Make sure the endpoint gave a response indicating success
//This should pass if the next one fails
// This should fail if the next one passes
pm.test("Status code is 200", () => {
    pm.expect(pm.response.code).to.eql(200);
  });
  
  // Turn the response into a json var for testing
  const response = pm.response.json();
  
  // Make sure there was an actual response in JSON form
  pm.test("Response JSON is not empty", function() {
      pm.expect(Object.keys(response).length).to.be.greaterThan(0);
  });
  
  // Make sure the json has the correct formatting
  pm.test("Response JSON is not empty", function() {
      pm.expect(response).to.have.property("message");
  });

    // Make sure the message contains the correct information
  pm.test("Response JSON is not empty", function() {
      pm.expect(response.message).to.include("Recipe Deleted with crID")
  });

//Unit Test: Delete Recipe, recipes not present
// Make sure the endpoint gave a response indicating error
//This should pass if the next prior fails
// This should fail if the prior one passes
pm.test("Status code is 400", () => {
    pm.expect(pm.response.code).to.eql(400);
  });
  
  // Turn the response into a json var for testing
  const response = pm.response.json();
  
  // Make sure there was an actual response in JSON form
  pm.test("Response JSON is not empty", function() {
      pm.expect(Object.keys(response).length).to.be.greaterThan(0);
  });
  
  // Make sure the json has the correct formatting
  pm.test("Response JSON is not empty", function() {
      pm.expect(response).to.have.property("error");
  });

    // Make sure the message contains the correct information
  pm.test("Response JSON is not empty", function() {
      pm.expect(response.error).to.include("No recipes for user")
  });


  //Testing save notes to make sure it gets the notes and indicates it so

//Unit Test: Save Notes
  // Make sure the endpoint gave a response indicating success
pm.test("Status code is 200", () => {
    pm.expect(pm.response.code).to.eql(200);
  });
  
  // Turn the response into a json var for testing
  const response = pm.response.json();
  
  // Make sure there was an actual response in JSON form
  pm.test("Response JSON is not empty", function() {
      pm.expect(Object.keys(response).length).to.be.greaterThan(0);
  });
  
  // Make sure the json has the correct formatting
  pm.test("Response has a message field", function() {
      pm.expect(response).to.have.property("message");
  });

    // Make sure the message contains the correct information
  pm.test("Response message is the correct message", function() {
      pm.expect(response.message).to.include("Notes Updated with:")
  });
      // Make sure the message contains the correct information
  pm.test("The notes were recieved by the server", function() {
      pm.expect(response.message).to.include("These are postman testing notes")
  });


//Test for get notes. 
//This only has one test since it can only be triggered if there is a proper recipe
// on the front end

//Unit Test: Get Notes
  // Make sure the endpoint gave a response indicating success
pm.test("Status code is 200", () => {
    pm.expect(pm.response.code).to.eql(200);
  });
  
  // Turn the response into a json var for testing
  const response = pm.response.json();
  
  // Make sure there was an actual response in JSON form
  pm.test("Response JSON is not empty", function() {
      pm.expect(Object.keys(response).length).to.be.greaterThan(0);
  });
  
  // Make sure the json has the correct formatting
  pm.test("Response has a notes field", function() {
      pm.expect(response[0]).to.have.property("notes");
  });

    // Make sure the message contains the correct information
  pm.test("Response notes is the correct set of notes", function() {
      pm.expect(response[0].notes).to.include("These are postman testing notes")
  });


// Testing randon recipes
//Should return at least one recipe if the user has one saved
//Only returns an empty JSON if the user has no recipes saved

// Unit Test: Get Random Recipe, recipes present
// Make sure the endpoint gave a response indicating success
pm.test("Status code is 200", () => {
    pm.expect(pm.response.code).to.eql(200);
  });
  
  // Turn the response into a json var for testing
  const response = pm.response.json();
  
  // Make sure there was an actual response in JSON form
  pm.test("Response JSON is not empty", function() {
      pm.expect(Object.keys(response).length).to.be.greaterThan(0);
  });
  
  // Make sure Title field was properly sent and then recieved
    pm.test("Title field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("Title");
    });
  
  // Make sure crID Description was properly sent and then recieved
    pm.test("Description field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("Description");
    });

//Unit Test: Get Random Recipe, no recipes saved
// Should be an empty JSON
// Make sure the endpoint gave a response indicating success
pm.test("Status code is 200", () => {
    pm.expect(pm.response.code).to.eql(200);
  });
  
  // Turn the response into a json var for testing
  const response = pm.response.json();
  
  // Make sure there was an actual response in JSON form
  pm.test("Response JSON is empty", function() {
      pm.expect(Object.keys(response).length).to.be.eql(0);
  });
  

//Testing the get bio endpoint
//Testing for all information, some information, and no information

//Unit Test: Get Bio, bio present
//Testing when there is all information in the bio for a user
pm.test("Status code is 200", () => {
    pm.expect(pm.response.code).to.eql(200);
  });
  
  // Turn the response into a json var for testing
  const response = pm.response.json();
  
  // Make sure there was an actual response in JSON form
  pm.test("Response JSON is not empty", function() {
      pm.expect(Object.keys(response).length).to.be.greaterThan(0);
  });


  // Make sure Title field was properly sent and then recieved
    pm.test("username field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("Username");
    });

 // Make sure username contains proper  message
    pm.test("username information is valid", () => {
      pm.expect(response[0].Username).to.have.include("api");
    });

  // Make sure bio field was properly recieved
    pm.test("bio field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("bio");
    });

 // Make sure bio contains proper  message
    pm.test("bio information is valid", () => {
      pm.expect(response[0].bio).to.have.include("api");
    });

  // Make sure favoriteFood field was properly recieved
    pm.test("favoriteFood field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("favoriteFood");
    });

 // Make sure favoriteFood contains proper  message
    pm.test("favoriteFood information is valid", () => {
      pm.expect(response[0].favoriteFood).to.have.include("api");
    });

  // Make sure favoriteRecipe field was properly recieved
    pm.test("favoriteRecipe field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("favoriteRecipe");
    });

 // Make sure favoriteRecipe contains proper  message
    pm.test("favoriteRecipe information is valid", () => {
      pm.expect(response[0].favoriteRecipe).to.have.include("api");
    });


//Unit Test: Get Bio, bio some present
//Testing when there is some information in the bio for a user
//Will display empty on the screen, but still indicate an error
pm.test("Status code is 200", () => {
    pm.expect(pm.response.code).to.eql(200);
  });
  
  // Turn the response into a json var for testing
  const response = pm.response.json();
  
  // Make sure there was an actual response in JSON form
  pm.test("Response JSON is not empty", function() {
      pm.expect(Object.keys(response).length).to.be.greaterThan(0);
  });


  // Make sure Title field was properly sent and then recieved
    pm.test("username field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("Username");
    });

 // Make sure username contains proper  message
    pm.test("username information is valid", () => {
      pm.expect(response[0].Username).to.have.include("api");
    });

  // Make sure bio field was properly recieved
    pm.test("bio field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("bio");
    });

 // Make sure bio contains proper  message
    pm.test("bio information is valid", () => {
      pm.expect(response[0].bio).to.have.include("api");
    });

  // Make sure favoriteFood field was properly recieved
    pm.test("favoriteFood field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("favoriteFood");
    });

 // Make sure favoriteFood contains proper  message
    pm.test("favoriteFood information is valid", () => {
      pm.expect(response[0].favoriteFood).to.have.include("api");
    });

  // Make sure favoriteRecipe field was properly recieved
    pm.test("favoriteRecipe field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("favoriteRecipe");
    });

 // Make sure favoriteRecipe contains proper  message
 //When a field is empty, the response is NULL and not a string
    pm.test("favoriteRecipe information is valid", () => {
      pm.expect(response[0].favoriteRecipe).to.eql(null);
    });

  

  
//Unit Test: Get Bio, bio not present
    //Testing when there is no information in the bio for a user
//Will display empty on the screen, but still indicate an error
pm.test("Status code is 401", () => {
    pm.expect(pm.response.code).to.eql(401);
  });
  
  // Turn the response into a json var for testing
  const response = pm.response.json();
  
  // Make sure there was an actual response in JSON form
  pm.test("Response JSON is not empty", function() {
      pm.expect(Object.keys(response).length).to.be.greaterThan(0);
  });


  // Make sure Title field was properly sent and then recieved
    pm.test("Message field was recieved by server", () => {
      pm.expect(response).to.have.property("message");
    });

 // Make sure message contains proper error message
    pm.test("Message information is valid", () => {
      pm.expect(response.message).to.have.include("Invalid credentials");
    });


//Testing for the edit bio end point
//Tests for inputting every field and none of the fields

//Unit Test: Create Edit Bio, all information
//Testing when user edits their bio to include every field
pm.test("Status code is 200", () => {
    pm.expect(pm.response.code).to.eql(200);
  });
  
  // Turn the response into a json var for testing
  const response = pm.response.json();
  
  // Make sure there was an actual response in JSON form
  pm.test("Response JSON is not empty", function() {
      pm.expect(Object.keys(response).length).to.be.greaterThan(0);
  });


  // Make sure message field was properly recieved
    pm.test("message field was recieved by server", () => {
      pm.expect(response).to.have.property("message");
    });

 // Make sure message contains proper message
    pm.test("message information is valid", () => {
      pm.expect(response.message).to.have.include("Added to db");
    });

  // Make sure bio field was properly sent and then recieved
    pm.test("bio field was recieved by server", () => {
      pm.expect(response).to.have.property("bio");
    });

 // Make sure bio contains proper  message
    pm.test("bio information is valid", () => {
      pm.expect(response.bio).to.have.include("api");
    });

  // Make sure favoriteFood field was properly sent and then recieved
    pm.test("favoriteFood field was recieved by server", () => {
      pm.expect(response).to.have.property("bio");
    });

 // Make sure favoriteFood contains proper  message
    pm.test("favoriteFood information is valid", () => {
      pm.expect(response.favoriteFood).to.have.include("api");
    });

 // Make sure favoriteRecipe field was properly sent and then recieved
    pm.test("favoriteRecipe field was recieved by server", () => {
      pm.expect(response).to.have.property("favoriteRecipe");
    });

 // Make sure favoriteRecipe contains proper  message
    pm.test("favoriteRecipe information is valid", () => {
      pm.expect(response.favoriteRecipe).to.have.include("api");
    });

    
//Unit Test: Create Edit Bio, no information
//Testing when user inputs nothing inside of the bio
//Message indicated it was added, but none of the field are given back
// since they were empty
pm.test("Status code is 200", () => {
    pm.expect(pm.response.code).to.eql(200);
  });
  
  // Turn the response into a json var for testing
  const response = pm.response.json();
  
  // Make sure there was an actual response in JSON form
  pm.test("Response JSON is not empty", function() {
      pm.expect(Object.keys(response).length).to.be.greaterThan(0);
  });


  // Make sure message field was properly recieved
    pm.test("message field was recieved by server", () => {
      pm.expect(response).to.have.property("message");
    });

 // Make sure message contains proper message
    pm.test("message information is valid", () => {
      pm.expect(response.message).to.have.include("Added to db");
    });



//Testing tagged recipes
//Testing for at least one recipe and no tagged recipes

//Unit Test: Get Tagged Recipe, recipe present
//Should return at least one recipe if the user has one saved
//Only returns an empty JSON if the user has no recipes are tagged

// Make sure the endpoint gave a response indicating success
pm.test("Status code is 200", () => {
    pm.expect(pm.response.code).to.eql(200);
  });
  
  // Turn the response into a json var for testing
  const response = pm.response.json();
  
  // Make sure there was an actual response in JSON form
  pm.test("Response JSON is not empty", function() {
      pm.expect(Object.keys(response).length).to.be.greaterThan(0);
  });
  
  // Make sure Title field was properly sent and then recieved
    pm.test("Title field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("Title");
    });
  
  // Make sure crID Description was properly sent and then recieved
    pm.test("Description field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("Description");
    });

  // Make sure tag field is part of the recipe
    pm.test("Tag field was recieved by server", () => {
      pm.expect(response[0]).to.have.property("Tag");
    });
  // Make sure tag matches the tage for the recipe
    pm.test("Tag field was recieved by server", () => {
      pm.expect(response[0].Tag).to.have.include("api");
    });
  
//Unit Test: Get Tagged Recipe, no tagged recipes
//Only returns an empty JSON if the user has no recipes are tagged
// Make sure the endpoint gave a response indicating success
pm.test("Status code is 200", () => {
    pm.expect(pm.response.code).to.eql(200);
  });
  
  // Turn the response into a json var for testing
  const response = pm.response.json();
  
  // Make sure there was an actual response in JSON form
  pm.test("Response JSON is not empty", function() {
      pm.expect(Object.keys(response).length).to.be.eql(0);
  });
  

//Testing for set tag endpoint

//Unit Test: Set Tagged Recipe, with tag
//Testing updating tag on an existing recipe
// Make sure the endpoint gave a response indicating success
pm.test("Status code is 200", () => {
    pm.expect(pm.response.code).to.eql(200);
  });
  
  // Turn the response into a json var for testing
  const response = pm.response.json();
  
  // Make sure there was an actual response in JSON form
  pm.test("Response JSON is not empty", function() {
      pm.expect(Object.keys(response).length).to.be.greaterThan(0);
  });
  
  // Make sure Title field was properly recieved
    pm.test("Message field was recieved by server", () => {
      pm.expect(response).to.have.property("message");
    });
  
  // Make sure message is properly formatted
    pm.test("Message field was recieved by server", () => {
      pm.expect(response.message).to.have.include("Tags Updated");
    });

  // Make sure tag field is part of the recipe
    pm.test("Tag field was recieved by server", () => {
      pm.expect(response).to.have.property("tagText");
    });
  // Make sure tag matches the tage for the recipe
    pm.test("Tag field was recieved by server", () => {
      pm.expect(response.tagText).to.have.include("api");
    });
 // Make sure crid field is part of the recipe
    pm.test("crid field was recieved by server", () => {
      pm.expect(response).to.have.property("crID");
    });
  // Make sure crid matches the tage for the recipe
    pm.test("crid field was recieved by server", () => {
      pm.expect(response.crID).to.have.include("8364");
    });
  
  

//Testing updating tag on an existing recipe
//Only one test since the input is controlled from the front end
//Will only ever recieve correct data to set a tag 

//Unit Test: Set Tagged Recipe, with tag
// Make sure the endpoint gave a response indicating success
pm.test("Status code is 200", () => {
  pm.expect(pm.response.code).to.eql(200);
});

// Turn the response into a json var for testing
const response = pm.response.json();

// Make sure there was an actual response in JSON form
pm.test("Response JSON is not empty", function() {
    pm.expect(Object.keys(response).length).to.be.greaterThan(0);
});

// Make sure Title field was properly recieved
  pm.test("Message field was recieved by server", () => {
    pm.expect(response).to.have.property("message");
  });

// Make sure message is properly formatted
  pm.test("Message field was recieved by server", () => {
    pm.expect(response.message).to.have.include("Tags Updated");
  });

// Make sure tag field is part of the recipe
  pm.test("Tag field was recieved by server", () => {
    pm.expect(response).to.have.property("tagText");
  });
// Make sure tag matches the tage for the recipe
  pm.test("Tag field was recieved by server", () => {
    pm.expect(response.tagText).to.have.include("tag");
  });
// Make sure crid field is part of the recipe
  pm.test("crid field was recieved by server", () => {
    pm.expect(response).to.have.property("crID");
  });
// Make sure crid matches the tage for the recipe
  pm.test("crid field was recieved by server", () => {
    pm.expect(response.crID).to.have.include("674");
  });


//Testing untagging tag on an existing recipe
//Testing for only one option since user can only untag exising recipes
// that already have a tag

//Unit Test: Untag Recipe
// Make sure the endpoint gave a response indicating success
pm.test("Status code is 200", () => {
  pm.expect(pm.response.code).to.eql(200);
});

// Turn the response into a json var for testing
const response = pm.response.json();

// Make sure there was an actual response in JSON form
pm.test("Response JSON is not empty", function() {
    pm.expect(Object.keys(response).length).to.be.greaterThan(0);
});

// Make sure Title field was properly recieved
  pm.test("Message field was recieved by server", () => {
    pm.expect(response).to.have.property("message");
  });

// Make sure message is properly formatted
  pm.test("Message field was recieved by server", () => {
    pm.expect(response.message).to.have.include("Tag Removed");
  });

// Make sure crid field is part of the recipe
  pm.test("crid field was recieved by server", () => {
    pm.expect(response).to.have.property("crID");
  });
// Make sure crid matches the tage for the recipe
  pm.test("crid field was recieved by server", () => {
    pm.expect(response.crID).to.have.include("6892");
  });


//Testing for login endpoint
/* Testing For
* Correct
* Wrong Username
* Wrong Password
* No fields
*/
//Other permutations will be a part of the non functional system testing

// Unit Test: Login, correct credientials
// Make sure the endpoint gave a response indicating success
pm.test("Status code is 200", () => {
  pm.expect(pm.response.code).to.eql(200);
});

// Turn the response into a JSON variable for testing
const response = pm.response.json();

// Make sure there was an actual response in JSON form
pm.test("Response JSON is not empty", function() {
  pm.expect(Object.keys(response).length).to.be.greaterThan(0);
});

// Make sure UserID field is properly received
pm.test("UserID field was received by server", () => {
  pm.expect(response[0]).to.have.property("UserID");
});

// Make sure the UserID matches the expected value
pm.test("UserID field has the correct value", () => {
  pm.expect(response[0].UserID).to.eql(8819);
});

// Make sure Username field is properly received
pm.test("Username field was received by server", () => {
  pm.expect(response[0]).to.have.property("Username");
});

// Make sure the Username matches the expected value
pm.test("Username field has the correct value", () => {
  pm.expect(response[0].Username).to.eql("api");
});
// Make sure Password field is properly received
pm.test("Password field was received by server", () => {
  pm.expect(response[0]).to.have.property("Password");
});

// Make sure the Password matches the expected value
pm.test("Password field has the correct value", () => {
  pm.expect(response[0].Password).to.eql("api");
});

// Make sure Email field is properly received
pm.test("Email field was received by server", () => {
  pm.expect(response[0]).to.have.property("Email");
});

// Make sure the Email matches the expected value
pm.test("Email field has the correct value", () => {
  pm.expect(response[0].Email).to.eql("api@api.com");
});

// Make sure Firstname field is properly received
pm.test("Firstname field was received by server", () => {
  pm.expect(response[0]).to.have.property("Firstname");
});

// Make sure the Firstname matches the expected value
pm.test("Firstname field has the correct value", () => {
  pm.expect(response[0].Firstname).to.eql("api");
});

// Make sure Lastname field is properly received
pm.test("Lastname field was received by server", () => {
  pm.expect(response[0]).to.have.property("Lastname");
});

// Make sure the Lastname matches the expected value
pm.test("Lastname field has the correct value", () => {
  pm.expect(response[0].Lastname).to.eql("api");
});

// Make sure isMaker field is properly received
pm.test("isMaker field was received by server", () => {
  pm.expect(response[0]).to.have.property("isMaker");
});

// Make sure the isMaker matches the expected value
pm.test("isMaker field has the correct value", () => {
  pm.expect(response[0].isMaker).to.eql(0);
});


//Unit Test: Login, wrong username
// Make sure the endpoint gave a response indicating success
pm.test("Status code is 401", () => {
  pm.expect(pm.response.code).to.eql(401);
});

// Turn the response into a JSON variable for testing
const response = pm.response.json();

// Make sure there was an actual response in JSON form
pm.test("Response JSON is not empty", function() {
  pm.expect(Object.keys(response).length).to.be.greaterThan(0);
});

// Make sure Message field is properly received
pm.test("Message field was received by server", () => {
  pm.expect(response).to.have.property("message");
});

// Make sure the UserID matches the expected value
pm.test("Message field has the correct value", () => {
  pm.expect(response.message).to.eql("Invalid login credentials");
});

//Unit Test: Login, wrong password
// Make sure the endpoint gave a response indicating success
pm.test("Status code is 401", () => {
  pm.expect(pm.response.code).to.eql(401);
});

// Turn the response into a JSON variable for testing
const response = pm.response.json();

// Make sure there was an actual response in JSON form
pm.test("Response JSON is not empty", function() {
  pm.expect(Object.keys(response).length).to.be.greaterThan(0);
});

// Make sure Message field is properly received
pm.test("Message field was received by server", () => {
  pm.expect(response).to.have.property("message");
});

// Make sure the UserID matches the expected value
pm.test("Message field has the correct value", () => {
  pm.expect(response.message).to.eql("Invalid login credentials");
});

//Unit Test: Login, no credentials
// Make sure the endpoint gave a response indicating success
pm.test("Status code is 401", () => {
  pm.expect(pm.response.code).to.eql(401);
});

// Turn the response into a JSON variable for testing
const response = pm.response.json();

// Make sure there was an actual response in JSON form
pm.test("Response JSON is not empty", function() {
  pm.expect(Object.keys(response).length).to.be.greaterThan(0);
});

// Make sure Message field is properly received
pm.test("Message field was received by server", () => {
  pm.expect(response).to.have.property("message");
});

// Make sure the UserID matches the expected value
pm.test("Message field has the correct value", () => {
  pm.expect(response.message).to.eql("Invalid login credentials");
});



//Testing the registration encdpoint using
/* Testing for
* All credentials -> using a modified endpoint to accomplish this test
* Missing One credential
* Having the same username as another user
*/


//Unit Test: Registration, all fields
// Assuming the response JSON is assigned to the variable 'response'
const response = pm.response.json();

// Make sure the response code is 200
pm.test("Status code is 200", () => {
    pm.expect(pm.response.code).to.eql(200);
});

// Make sure the response JSON is not empty
pm.test("Response JSON is not empty", function() {
    pm.expect(Object.keys(response).length).to.be.greaterThan(0);
});

// Make sure 'username' field is properly received
pm.test("username field was received by server", () => {
    pm.expect(response).to.have.property("username");
});

// Make sure 'username' matches the expected value
pm.test("username field has the correct value", () => {
    pm.expect(response.username).to.eql("apiLogin");
});

// Make sure 'firstname' field is properly received
pm.test("firstname field was received by server", () => {
    pm.expect(response).to.have.property("firstname");
});

// Make sure 'firstname' matches the expected value
pm.test("firstname field has the correct value", () => {
    pm.expect(response.firstname).to.eql("apiLogin");
});

// Make sure 'lastname' field is properly received
pm.test("lastname field was received by server", () => {
    pm.expect(response).to.have.property("lastname");
});

// Make sure 'lastname' matches the expected value
pm.test("lastname field has the correct value", () => {
    pm.expect(response.lastname).to.eql("apiLogin");
});

// Make sure 'password' field is properly received
pm.test("password field was received by server", () => {
    pm.expect(response).to.have.property("password");
});

// Make sure 'password' matches the expected value
pm.test("password field has the correct value", () => {
    pm.expect(response.password).to.eql("apiLogin");
});

// Make sure 'email' field is properly received
pm.test("email field was received by server", () => {
    pm.expect(response).to.have.property("email");
});

// Make sure 'email' matches the expected value
pm.test("email field has the correct value", () => {
    pm.expect(response.email).to.eql("apiLogin");
});

// Make sure 'isMaker' field is properly received
pm.test("isMaker field was received by server", () => {
    pm.expect(response).to.have.property("isMaker");
});

// Make sure 'isMaker' matches the expected value
pm.test("isMaker field has the correct value", () => {
    pm.expect(response.isMaker).to.eql("0");
});


//Unit Test: Registration, no password
const response = pm.response.json();

// Make sure the response code is 200
pm.test("Status code is 401", () => {
    pm.expect(pm.response.code).to.eql(401);
});

// Make sure the response JSON is not empty
pm.test("Response JSON is not empty", function() {
    pm.expect(Object.keys(response).length).to.be.greaterThan(0);
});

// Make sure 'message' field is properly received
pm.test("message field was received by server", () => {
    pm.expect(response).to.have.property("message");
});

// Make sure 'message' matches the expected value
pm.test("message field has the correct value", () => {
    pm.expect(response.message).to.eql("Password is blank");
});


//Unit Test: Registration, no username
const response = pm.response.json();

// Make sure the response code is 200
pm.test("Status code is 401", () => {
    pm.expect(pm.response.code).to.eql(401);
});

// Make sure the response JSON is not empty
pm.test("Response JSON is not empty", function() {
    pm.expect(Object.keys(response).length).to.be.greaterThan(0);
});

// Make sure 'message' field is properly received
pm.test("message field was received by server", () => {
    pm.expect(response).to.have.property("message");
});

// Make sure 'message' matches the expected value
pm.test("message field has the correct value", () => {
    pm.expect(response.message).to.eql("Username is blank");
});


//Testing for topIngredient endpoint
// Returns a json object of 5 randoms ingredients from
// a user's saved ingredients

//Unit Test: Top Ingredients
const response = pm.response.json();

// Make sure the response code is 200
pm.test("Status code is 200", () => {
    pm.expect(pm.response.code).to.eql(200);
});

// Make sure the response JSON is not empty
pm.test("Response JSON is not empty and has 5 objects", function() {
    pm.expect(Object.keys(response).length).to.be.eql(5);
});

// Make sure 'message' field is properly received
pm.test("ingredient field is in response 1", () => {
    pm.expect(response[0]).to.have.property("ingredient");
});

// Make sure 'message' field is properly received
pm.test("ingredient field is in response 2", () => {
    pm.expect(response[1]).to.have.property("ingredient");
});

// Make sure 'message' field is properly received
pm.test("ingredient field is in response 3", () => {
    pm.expect(response[3]).to.have.property("ingredient");
});

// Make sure 'message' field is properly received
pm.test("ingredient field is in response 4", () => {
    pm.expect(response[3]).to.have.property("ingredient");
});

// Make sure 'message' field is properly received
pm.test("ingredient field is in response 5", () => {
    pm.expect(response[4]).to.have.property("ingredient");
});


//Test for personalized search endpoint
//Based off a predetermined set of recipes: [oil, beef]
//May break as API could change how they give recipes

//Unit Test: Personalized Search
const response = pm.response.json();

// Make sure the response code is 200
pm.test("Status code is 200", () => {
    pm.expect(pm.response.code).to.eql(200);
});

// Make sure the response JSON is not empty
pm.test("Response JSON is not empty", function() {
    pm.expect(response.length).to.be.greaterThan(0);
});

// Iterate over each item in the array
response.forEach((recipe, index) => {
    // Make sure each item has an 'id' field
    pm.test(`Recipe ${index + 1}: 'id' field is present`, () => {
        pm.expect(recipe).to.have.property("id");
    });

    // Make sure each 'id' field is a non-empty string
    pm.test(`Recipe ${index + 1}: 'id' field is a non-empty string`, () => {
        pm.expect(recipe.id).to.be.a("string").and.to.not.be.empty;
    });

    // Make sure each item has a 'title' field
    pm.test(`Recipe ${index + 1}: 'title' field is present`, () => {
        pm.expect(recipe).to.have.property("title");
    });

    // Make sure each 'title' field is a non-empty string
    pm.test(`Recipe ${index + 1}: 'title' field is a non-empty string`, () => {
        pm.expect(recipe.title).to.be.a("string").and.to.not.be.empty;
    });
});

//Testing for personalized random search endpoint
// Testing to see if the json has 3 object and has their id and title field

//Unit Test: Random Personalized Search 
const response = pm.response.json();

// Make sure the response code is 200
pm.test("Status code is 200", () => {
    pm.expect(pm.response.code).to.eql(200);
});

// Make sure the response JSON is an array with three objects
pm.test("Response has three objects", function() {
    pm.expect(response).to.be.an("array").and.to.have.lengthOf(3);
});

// Iterate over each item in the array
response.forEach((recipe, index) => {
    // Make sure each item has an 'id' field
    pm.test(`Recipe ${index + 1}: 'id' field is present`, () => {
        pm.expect(recipe).to.have.property("id");
    });

    // Make sure each item has a 'title' field
    pm.test(`Recipe ${index + 1}: 'title' field is present`, () => {
        pm.expect(recipe).to.have.property("title");
    });
});





