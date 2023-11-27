describe('Display_Custom_Recipes page', () => {
  beforeEach(() => {
    // Assuming your page URL is '/display-custom-recipes'
    cy.visit('http://localhost:3000/display-custom-recipes')
  })

  it('displays at least one recipe with title, steps, and ingredients', () => {
    cy.get('.recipeItem').should('exist') // Check if at least one recipe exists

    // Validate the presence of title, steps, and ingredients in the first recipe
    cy.get('.recipeTitle').first().should('exist') // Check if the title exists
    cy.get('.textareaSteps').first().should('exist') // Check if the steps textarea exists
    cy.get('.recipeIngredients').first().find('li').should('have.length.gt', 0) // Check if ingredients exist
  })
})