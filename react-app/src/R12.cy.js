describe('Recipe Note Testing', () => {
    it('Adds notes to a saved recipe', () => {
      // Visit the create recipe page
      cy.visit('http://localhost:3000/Create_Recipe')
  
      // Fill out the recipe creation form
      cy.get('#title').type('Test Recipe Title')
      cy.get('#steps').type('Test Recipe Steps')
      // Add ingredients if necessary
  
      // Click the "Create Recipe" button
      cy.get('.buttonMargin').click()
  
      // Wait for the recipe to be added and the popup to appear
      cy.get('.popup').should('be.visible')
  
      // Go to the saved recipes page (modify the URL accordingly)
      cy.visit('http://localhost:3000/Saved_Recipes')
  
      // Find the saved recipe and click on it
      cy.get('.recipeTitle').contains('Test Recipe Title').click()
  
      // Add notes to the saved recipe
      cy.get('#notes').type('These are some test notes for the saved recipe')
  
      // Click the "Save Notes" button
      cy.get('.saveNotesButton').click()
  
      // Assert that the notes are saved
      cy.get('#notes').should('have.value', 'These are some test notes for the saved recipe')
    })
  
    it('Edits notes on a saved recipe', () => {
      // Similar to the first test, create a recipe and navigate to the saved recipes page
  
      // Find the saved recipe and click on it
      cy.get('.recipeTitle').contains('Test Recipe Title').click()
  
      // Edit the existing notes
      cy.get('#notes').clear().type('These are edited notes for the saved recipe')
  
      // Click the "Save Notes" button
      cy.get('.saveNotesButton').click()
  
      // Assert that the notes are updated
      cy.get('#notes').should('have.value', 'These are edited notes for the saved recipe')
    })
  
    it('Deletes notes on a saved recipe', () => {
      // Similar to the first two tests, create a recipe and navigate to the saved recipes page
  
      // Find the saved recipe and click on it
      cy.get('.recipeTitle').contains('Test Recipe Title').click()
  
      // Clear the existing notes
      cy.get('#notes').clear()
  
      // Click the "Save Notes" button
      cy.get('.saveNotesButton').click()
  
      // Assert that the notes are deleted
      cy.get('#notes').should('have.value', '')
    })
  })
  