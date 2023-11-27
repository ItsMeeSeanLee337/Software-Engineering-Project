//This tests every possible combination of possible login steps a user can take
describe('Registration Testing', () => {

  it('Tests with correct credentials', () => {
    cy.visit('http://localhost:3000/Registration')

    cy.get('#firstname').type('testfirst')
    cy.get('#lastname').type('testlast')
    cy.get('#username').type('testusername')
    cy.get('#password').type('testpassword')
    cy.get('#email').type('testemail.com')

    cy.get("#registerButton").click()
    cy.url().should('include', '/Registration')
  })
  
  it('Tests with just first name nothing else', () => {
    cy.visit('http://localhost:3000/Registration')

    cy.get('#firstname').type('name')
    cy.get("#registerButton").click()
    cy.url().should('include', '/Registration')
  })

  
  it('Tests with just last name and nothing else', () => {
    cy.visit('http://localhost:3000/Registration')

    cy.get('#lastname').type('lastname')
    cy.get("#registerButton").click()
    cy.url().should('include', '/Registration')
  })

  it('Tests with just username and nothing else', () => {
    cy.visit('http://localhost:3000/Registration')

    cy.get('#username').type('user')
    cy.get("#registerButton").click()
    cy.url().should('include', '/Registration')
  })
  it('Tests with just password and nothing else', () => {
    cy.visit('http://localhost:3000/Registration')

    cy.get('#password').type('password123')

    cy.get("#registerButton").click()
    cy.url().should('include', '/Registration')
  })

  it('Tests with just email and nothing else', () => {
    cy.visit('http://localhost:3000/Registration')

    cy.get('#email').type('email.com')
    cy.get("#registerButton").click()
    cy.url().should('include', '/Registration')
  })


  it('Tests with fields that already exists', () => {
    cy.visit('http://localhost:3000/Registration')
    cy.get('#firstname').type('testfirst')
    cy.get('#lastname').type('testlast')
    cy.get('#username').type('testusername')
    cy.get('#password').type('testpassword')
    cy.get('#email').type('testemail.com')

    cy.get("#registerButton").click()
    cy.url().should('include', '/Registration')

  })

  it('Tests with just username and password', () => {
    cy.visit('http://localhost:3000/Registration')
    cy.get('#username').type('test_register_user')
    cy.get('#password').type('test_register_pass')

    cy.get("#registerButton").click()
    cy.url().should('include', '/Registration')

  })


it('Tests with everything missing', () => {
    cy.visit('http://localhost:3000/Registration')

    cy.get("#registerButton").click()
    cy.url().should('include', '/Registration')
  })

})
