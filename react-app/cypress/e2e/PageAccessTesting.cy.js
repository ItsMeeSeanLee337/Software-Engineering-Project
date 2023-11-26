
//Testing user permissions in accessing the Profile Bio Nav page
//Only Regular users can access this page
describe('Bio Nav: Only regular users', () => {
  it('Accessing Bio as regular user (Success)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('testuser')
    cy.get('#password').type('password123')
    cy.get("#loginButton").click()

    cy.get('#goToBio').click()

    cy.url().should('include', '/Bio')
  })

  //Can't actually navigate as this user to that page, so using manual direction
  it('Accessing Bio as a recipe maker (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('maker')
    cy.get('#password').type('maker')
    cy.get("#loginButton").click()
    cy.wait(100)
    cy.get('#goToBio').click()

    cy.url().should('include', '/')
  })

  it('Accessing Bio not logged in (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/Bio')
    cy.url().should('include', '/')
  })

  it('Accessing Bio as an invalid user (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/Bio?data=badUser')
    cy.url().should('include', '/')
  })

}) 

//Testing user permissions in accessing the Home page
//Only Regular users can access this page
describe('Home Access Testing: Only Regular Users', () => {
  it('Accessing home as regular user (Success)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('testuser')
    cy.get('#password').type('password123')
    cy.get("#loginButton").click()

    cy.get('#homeLink').click()
    cy.url().should('include', '/Home')
  })

  it('Accessing home as a recipe maker (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('maker')
    cy.get('#password').type('maker')
    cy.get("#loginButton").click()

    cy.get('#homeLink').click()
    cy.url().should('include', '/')
  })

  it('Accessing home while not logged in (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/Home')
    cy.url().should('include', '/')
  })

  it('Accessing home as an invalid user (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/Home?data=badUser')
    cy.url().should('include', '/')
  })

})

//Testing user permissions in accessing the create recipe page
//Both Regular users and makers can access this page
describe('Create Recipe Access Testing: Both Regular and Makers', () => {
  it('Accessing create recipe as regular user (Success)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('testuser')
    cy.get('#password').type('password123')
    cy.get("#loginButton").click()

    cy.get('#goToCreateRecipe').click()
    cy.url().should('include', '/Create_Recipe')
  })

  it('Accessing create recipe as a recipe maker (Success)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('maker')
    cy.get('#password').type('maker')
    cy.get("#loginButton").click()

    cy.url().should('include', '/Create_Recipe')
  })

  it('Accessing create recipe while not logged in (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/Create_Recipe')
    cy.url().should('include', '/')
  })

  it('Accessing create recipe as an invalid user (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/Create_Recipe?data=badUser')
    cy.url().should('include', '/')
  })

})

//Testing user permissions in accessing the display recipe page
//Both Regular users and makers can access this page
describe('Disaply Recipe Access Testing: Both Regular and Makers', () => {
  it('Accessing display recipe as regular user (Success)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('testuser')
    cy.get('#password').type('password123')
    cy.get("#loginButton").click()
    //Handling the page loading
    cy.url().should('include', '/Login_Success')
    //Handling the hover menu
    cy.get('#goToCreateRecipe').trigger('mouseover')
    cy.wait(1000)
    cy.get("#goToDisplayRecipe").click();

    cy.url().should('include', '/display-custom-recipes')
  })

  it('Accessing display recipe as a recipe maker (Success)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('maker')
    cy.get('#password').type('maker')
    cy.get("#loginButton").click()
    //Wait for page to fully load
    cy.url().should('include', '/Create_Recipe')
    //Handling the hover menu
    cy.get('#goToCreateRecipe').trigger('mouseover')
    cy.wait(1000)
    cy.get("#goToDisplayRecipe").click();

    cy.url().should('include', '/display-custom-recipes')
  })

  it('Accessing display recipe while not logged in (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/display-custom-recipes')
    cy.url().should('include', '/')
  })

  it('Accessing display recipe as an invalid user (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/display-custom-recipes?data=badUser')
    cy.url().should('include', '/')
  })

})


//Testing user permissions in accessing the Editing Profile page
//Only Regular users can access this page
describe('Editing Profile Bio: Only regular users', () => {
  it('Accessing Profile editing as regular user (Success)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('testuser')
    cy.get('#password').type('password123')
    cy.get("#loginButton").click()

    cy.get('#goToBio').click()
    cy.get('#goToEditBio').click()

    cy.url().should('include', '/Create_Edit_Personal_Bio')
  })

  //Can't actually navigate as this user to that page, so using manual direction
  it('Accessing create bio as a recipe maker (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/Create_Edit_Personal_Bio?data=maker')
    cy.url().should('include', '/')
  })

  it('Accessing home while not logged in (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/Create_Edit_Personal_Bio')
    cy.url().should('include', '/')
  })

  it('Accessing home as an invalid user (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/Create_Edit_Personal_Bio?data=badUser')
    cy.url().should('include', '/')
  })

}) 




//Testing user permissions in accessing the display maker recipe page
//Only regular users can enter this page
describe('Disaply Maker Recipe Access Testing: Only Regular Users', () => {
  it('Accessing display recipe as regular user (Success)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('testuser')
    cy.get('#password').type('password123')
    cy.get("#loginButton").click()
    //Handling the page loading
    cy.url().should('include', '/Login_Success')
    //Handling the hover menu
    cy.get('#goToMakerRecipes').trigger('mouseover')
    cy.wait(1000)
    cy.get("#goToMakerRecipes").click();

    cy.url().should('include', '/display-maker-recipes')
  })

  it('Accessing display maker recipe as a recipe maker (Go To Landing Page)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('maker')
    cy.get('#password').type('maker')
    cy.get("#loginButton").click()
    //Wait for page to fully load
    cy.url().should('include', '/Create_Recipe')
    //Handling the hover menu
    cy.get('#goToMakerRecipes').trigger('mouseover')
    cy.wait(1000)
    cy.get("#goToMakerRecipes").click();

    cy.url().should('include', '/')
  })

  it('Accessing display maker recipe while not logged in (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/display-maker-recipes')
    cy.url().should('include', '/')
  })

  it('Accessing display maker recipe as an invalid user (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/display-maker-recipes?data=badUser')
    cy.url().should('include', '/')
  })

}) 


//Testing user permissions in accessing the Profile Bio page
//Only Regular users can access this page
describe('Profile Bio: Only regular users', () => {
  it('Accessing Profile Bio as regular user (Success)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('testuser')
    cy.get('#password').type('password123')
    cy.get("#loginButton").click()

    cy.get('#goToBio').click()
    cy.get('#goToBioPage').click()

    cy.url().should('include', '/Display_Personal_Bio')
  })

  //Can't actually navigate as this user to that page, so using manual direction
  it('Accessing Profile Bio as a recipe maker (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/Display_Personal_Bio?data=maker')
    cy.url().should('include', '/')
  })

  it('Accessing Profile Bio not logged in (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/Display_Personal_Bio')
    cy.url().should('include', '/')
  })

  it('Accessing Profile Bio as an invalid user (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/Display_Personal_Bio?data=badUser')
    cy.url().should('include', '/')
  })

})  


//Testing user permissions in accessing the Landing Page
// All users can access this page
describe('Landing Page: All Users', () => {
  it('Accessing Landing Page as regular user (Success)', () => {
    cy.visit('http://localhost:3000/?data=testuser')
    cy.url().should('include', '/')
  })

  //Can't actually navigate as this user to that page, so using manual direction
  it('Accessing Profile Landing Page as a recipe maker (Success)', () => {
    cy.visit('http://localhost:3000/?data=maker')
    cy.url().should('include', '/')
  })

  it('Accessing Profile Bio not logged in (Success)', () => {
    cy.visit('http://localhost:3000/')
    cy.url().should('include', '/')
  })

  it('Accessing Profile Bio as an invalid user (Success)', () => {
    cy.visit('http://localhost:3000/?data=badUser')
    cy.url().should('include', '/')
  })
}) 


//Testing user permissions in accessing the Login Success Page
//Only Regular users can access this page
describe('Login Success: Only regular users', () => {
  it('Accessing Login Success as regular user (Success)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('testuser')
    cy.get('#password').type('password123')
    cy.get("#loginButton").click()

    cy.url().should('include', '/Login_Success')
  })

  //Can't actually navigate as this user to that page, so using manual direction
  it('Accessing Login Success as a recipe maker (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/Login_Success?data=maker')
    cy.url().should('include', '/')
  })

  it('Accessing Login Success not logged in (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/Login_Success')
    cy.url().should('include', '/')
  })

  it('Accessing Login Success as an invalid user (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/Login_Success?data=badUser')
    cy.url().should('include', '/')
  })

})  


//Testing user permissions in accessing the Login Page
// All users can access this page
describe('Login Page: All Users', () => {
  it('Accessing Login Page as regular user (Success)', () => {
    cy.visit('http://localhost:3000/Login?data=testuser')
    cy.url().should('include', '/')
  })

  //Can't actually navigate as this user to that page, so using manual direction
  it('Accessing Login Landing Page as a recipe maker (Success)', () => {
    cy.visit('http://localhost:3000/Login?data=maker')
    cy.url().should('include', '/')
  })

  it('Accessing Login Bio not logged in (Success)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.url().should('include', '/')
  })

  it('Accessing Login Bio as an invalid user (Success)', () => {
    cy.visit('http://localhost:3000/Login?data=badUser')
    cy.url().should('include', '/')
  })
}) 

//Testing user permissions in accessing the nutritional info page
//Only regular users can enter this page
describe('Nutritional Info Access Testing: Only Regular Users', () => {
  it('Accessing nutritional info as regular user (Success)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('testuser')
    cy.get('#password').type('password123')
    cy.get("#loginButton").click()
    //Handling the page loading
    cy.url().should('include', '/Login_Success')
    //Handling the hover menu
    cy.get("#goToNutritionInfo").click();

    cy.url().should('include', '/NutritionalInformation')
  })

  it('Accessing nutritional info as a recipe maker (Go To Landing Page)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('maker')
    cy.get('#password').type('maker')
    cy.get("#loginButton").click()
    //Wait for page to fully load
    cy.url().should('include', '/Create_Recipe')
    cy.wait(100)
    cy.get("#goToNutritionInfo").click();

    cy.url().should('include', '/')
  })

  it('Accessing nutritional info while not logged in (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/NutritionalInformation')
    cy.url().should('include', '/')
  })

  it('Accessing nutritional info as an invalid user (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/NutritionalInformation?data=badUser')
    cy.url().should('include', '/')
  })

}) 

//Testing user permissions in accessing the personalized recipes page
//Only regular users can enter this page
describe('Personalized Recipes Access Testing: Only Regular Users', () => {
  it('Accessing personailized recipes as regular user (Success)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('testuser')
    cy.get('#password').type('password123')
    cy.get("#loginButton").click()
    //Handling the page loading
    cy.url().should('include', '/Login_Success')
    //Handling the hover menu
    cy.get("#goToPersonalizedRecipes").click();

    cy.url().should('include', '/Personalized_Recipes')
  })

  it('Accessing personailized recipes as a recipe maker (Go To Landing Page)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('maker')
    cy.get('#password').type('maker')
    cy.get("#loginButton").click()
    //Wait for page to fully load
    cy.url().should('include', '/Create_Recipe')
    cy.wait(100)
    cy.get("#goToPersonalizedRecipes").click();

    cy.url().should('include', '/')
  })

  it('Accessing personailized recipes while not logged in (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/Personalized_Recipes')
    cy.url().should('include', '/')
  })

  it('Accessing personailized recipes as an invalid user (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/Personalized_Recipes?data=badUser')
    cy.url().should('include', '/')
  })

}) 

//Testing user permissions in accessing the recipe search page
//Only regular users can enter this page
describe('Recipe Search Access Testing: Only Regular Users', () => {
  it('Accessing recipe search as regular user (Success)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('testuser')
    cy.get('#password').type('password123')
    cy.get("#loginButton").click()
    cy.url().should('include', '/Login_Success')

    cy.get("#goToRecipeSearch").click();

    cy.url().should('include', '/RecipeSearch')
  })

  it('Accessing recipe search  as a recipe maker (Go To Landing Page)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('maker')
    cy.get('#password').type('maker')
    cy.get("#loginButton").click()
    //Wait for page to fully load
    cy.url().should('include', '/Create_Recipe')
    cy.wait(100)
    cy.get("#goToRecipeSearch").click();

    cy.url().should('include', '/')
  })

  it('Accessing recipe search  while not logged in (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/RecipeSearch')
    cy.url().should('include', '/')
  })

  it('Accessing recipe search  as an invalid user (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/RecipeSearch?data=badUser')
    cy.url().should('include', '/')
  })

}) 

//Testing user permissions in accessing the Login Page
// All users can access this page
describe('Registration Page: All Users', () => {
  it('Accessing registration page as regular user (Success)', () => {
    cy.visit('http://localhost:3000/registration?data=testuser')
    cy.url().should('include', '/registration')
  })

  //Can't actually navigate as this user to that page, so using manual direction
  it('Accessing registration page as a recipe maker (Success)', () => {
    cy.visit('http://localhost:3000/registration?data=maker')
    cy.url().should('include', '/registration')
  })

  it('Accessing registration page not logged in (Success)', () => {
    cy.visit('http://localhost:3000/registration')
    cy.url().should('include', '/registration')
  })

  it('Accessing registration page as an invalid user (Success)', () => {
    cy.visit('http://localhost:3000/registration?data=badUser')
    cy.url().should('include', '/registration')
  })
}) 


//Testing user permissions in accessing the display recipe page
//Both Regular users and makers can access this page
describe('Display Tagged Recipe Access Testing: Both Regular and Makers', () => {
  it('Accessing display tagged recipe as regular user (Success)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('testuser')
    cy.get('#password').type('password123')
    cy.get("#loginButton").click()
    //Handling the page loading
    cy.url().should('include', '/Login_Success')
    //Handling the hover menu
    cy.get('#goToCreateRecipe').trigger('mouseover')
    cy.wait(100)
    cy.get("#goToDisplayRecipe").click();
    cy.get("#view_tags").click();

    cy.url().should('include', '/TaggedRecipes')
  })

  it('Accessing display tagged recipe as a recipe maker (Success)', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('#username').type('maker')
    cy.get('#password').type('maker')
    cy.get("#loginButton").click()
    //Wait for page to fully load
    cy.url().should('include', '/Create_Recipe')
    //Handling the hover menu
    cy.get('#goToCreateRecipe').trigger('mouseover')
    cy.wait(100)
    cy.get("#goToDisplayRecipe").click();
    cy.get("#view_tags").click();

    cy.url().should('include', '/TaggedRecipes')
  })

  it('Accessing display recipe tagged while not logged in (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/TaggedRecipes')
    cy.url().should('include', '/')
  })

  it('Accessing display recipe tagged as an invalid user (Goes to Landing Page)', () => {
    cy.visit('http://localhost:3000/TaggedRecipes?data=badUser')
    cy.url().should('include', '/')
  })

})