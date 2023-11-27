describe('Recipe Search Testing', () => {
    it('Searches for recipes by ingredient', () => {
      // Visit the recipe search page
      cy.visit('http://localhost:3000/RecipeSearch')
  
      // Enter an ingredient in the search input
      cy.get('input').type('chicken, rice, broccoli')
  
      // Click the "Search by Ingredient" button
      cy.get('button').contains('Search by Ingredient').click()
  
      // Assert that the recipes are displayed
      cy.get('li').should('have.length.greaterThan', 0)
  
      // Save the first recipe
      cy.get('li:first').within(() => {
        cy.get('button').contains('Save').click()
      })
  
      // Assert that the popup appears
      cy.get('.popup').should('be.visible')
  
      // Go to the saved recipes page (modify the URL accordingly)
      cy.visit('http://localhost:3000/Saved_Recipes')
  
      // Assert that the saved recipe is listed
      cy.get('.recipeTitle').should('have.length.greaterThan', 0)
    })
  })
  