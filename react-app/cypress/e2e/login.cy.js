//This tests every possible combination of possible login steps a user can take
describe('Login Testing', () => {
  it('Tests with correct credentials', () => {
    cy.visit('http://localhost:3000/Login')

    cy.get('#username').type('testuser')
    cy.get('#password').type('password123')

    cy.get("#loginButton").click()
    cy.url().should('include', '/Login_Success')
  })

  it('Tests with incorrect username', () => {
    cy.visit('http://localhost:3000/Login')

    cy.get('#username').type('wronguser')
    cy.get('#password').type('password123')

    cy.get("#loginButton").click()
    cy.url().should('include', '/Login')
  })

  it('Tests with incorrect password', () => {
    cy.visit('http://localhost:3000/Login')

    cy.get('#username').type('testuser')
    cy.get('#password').type('wrongpassword')

    cy.get("#loginButton").click()
    cy.url().should('include', '/Login')
  })

  it('Tests with missing password', () => {
    cy.visit('http://localhost:3000/Login')

    cy.get('#username').type('testuser')

    cy.get("#loginButton").click()
    cy.url().should('include', '/Login')
  })

  it('Tests with missing username', () => {
    cy.visit('http://localhost:3000/Login')

    cy.get('#password').type('wrongpassword')

    cy.get("#loginButton").click()
    cy.url().should('include', '/Login')
  })

  it('Tests with both missing username and password', () => {
    cy.visit('http://localhost:3000/Login')

    cy.get("#loginButton").click()
    cy.url().should('include', '/Login')
  })

})