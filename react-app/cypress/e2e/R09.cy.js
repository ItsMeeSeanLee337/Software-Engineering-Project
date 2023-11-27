describe('Display Custom Recipes Page', () => {
  beforeEach(() => {
    // Assuming your app is hosted at localhost:3000 and the Display Custom Recipes page is the default page
    cy.visit('http://localhost:3000/display-custom-recipes?data=testuser') 
  })

  it('Redirects to Nutritional Info Page on button click', () => {
    // Click the "Nutritional Info" button on the first recipe card
    cy.get('.recipeItem').first().contains('Nutritional Info').click()

    // Assert that the URL matches the expected URL after redirection
    cy.url().should('include', '/Custom_Recipe_Nutritioninfo')

    
  })

  it('Displays Nutrition Information on "Get Nutrition Info" button click', () => {
    // Click the "Nutritional Info" button on the first recipe card
    cy.get('.recipeItem').first().contains('Nutritional Info').click()

    // Click the "Get Nutrition Info" button on the Nutritional Info page
    cy.contains('button', 'Get Nutrition Info').click()

    // Assert that specific nutritional information elements are displayed
    cy.contains('Calories').should('exist')
    cy.contains('Protein').should('exist')
    cy.contains('Fat').should('exist')
    cy.contains('Carbohydrates').should('exist')

    // You can add more assertions to validate other elements or values if needed
    // For instance, check for specific classes, IDs, or values associated with these elements
  })
})