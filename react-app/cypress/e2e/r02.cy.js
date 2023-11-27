//The system shall allow regular users to view recipes created by certified recipe makers
describe('R02', () => {
  it('The system shall allow regular users to view recipes created by certified recipe makers ', () => {
      cy.visit('http://localhost:3000/Login')

      cy.get('#username').type('testuser')
      cy.get('#password').type('password123')

      cy.get("#loginButton").click()
      cy.url().should('include', '/Login_Success')

      //Handling the hover menu

      cy.get('#goToCreateRecipe').trigger('mouseover').get("#goToDisplayRecipe");
        cy.get('#goToDisplayRecipe').click()
      
      //Should be on the display maker recipes page
      cy.url().should('include', '/display-custom-recipes')

      // Validate the presence of title, steps, and ingredients in the first recipe
      cy.get('.recipeTitle').first().should('exist') // Check if the title exists
      cy.get('.textareaSteps').first().should('exist') // Check if the steps textarea exists
      cy.get('.recipeIngredients').first().find('li').should('have.length.gt', 0) // Check if ingredients exist
  })
});