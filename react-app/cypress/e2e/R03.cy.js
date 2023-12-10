describe('Recipe Search Testing', () => {
    it('Searches for recipes by ingredient', () => {
      // Visit the recipe search page
      cy.visit('http://localhost:3000/RecipeSearch?data=testuser')
  
      // Enter an ingredient in the search input
      cy.get('input').type('chicken')
  
      // Click the "Search by Ingredient" button
      cy.get('#ingredientbutton').click()
      
      // Assert that the recipes are displayed
      cy.get('li').should('have.length.greaterThan', 0)
    })
  })
  