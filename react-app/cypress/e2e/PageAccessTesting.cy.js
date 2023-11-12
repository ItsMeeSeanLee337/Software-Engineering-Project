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

//Testing user permissions in accessing the create recipe page
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