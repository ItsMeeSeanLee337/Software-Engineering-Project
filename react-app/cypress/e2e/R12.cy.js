describe('Recipe Note Testing', () => {
    it('Adds notes to a saved recipe', () => {
      // Visit the create recipe page
      cy.visit('http://localhost:3000/display-custom-recipes?data=testNotes')

      // Click the "Notes" button
      cy.get('#notes').click()

      cy.get('#noteTextBox').clear()

      // Add notes to the saved recipe
      cy.get('#noteTextBox').type('testing notes')
      
      // Click the "Save Notes" button
      cy.get('#savenotes').click()
      
      // Assert that the notes are saved
      cy.get('#noteTextBox').should('contain', 'testing notes')

    })
  })
  