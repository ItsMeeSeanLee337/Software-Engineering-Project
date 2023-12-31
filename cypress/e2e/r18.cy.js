//The system shall allow regular users to view recipes created by certified recipe makers
describe('R18', () => {
  it('The system shall allow regular users to view recipes created by certified recipe makers ', () => {
      cy.visit('http://localhost:3000/Login')

      cy.get('#username').type('testuser')
      cy.get('#password').type('password123')

      cy.get("#loginButton").click()
      cy.url().should('include', '/Login_Success')

      //Handling the hover menu
      cy.get("#goToMakerRecipes").click();
      
      //Should be on the display maker recipes page
      cy.url().should('include', '/display-maker-recipes')

      //Should be able to see a recipe that a maker made
      cy.get("#title").should('be.visible')
      cy.get("#makerTitle").should('be.visible')

      cy.get("#steps").should('be.visible')
      cy.get("#makerSteps").should('be.visible')

      cy.get("#ing").should('be.visible')
      cy.get("#makerIng").should('be.visible')
      
      
  })
});