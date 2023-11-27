describe('Meal Planner Testing', () => {
    it('Displays nutritional breakdown for a meal planned day', () => {
      // Visit the meal planner page
      cy.visit('http://localhost:3000/MealPlanner')
  
      // Click on a day button
      cy.get('button#dayButton').first().click()
  
      // Assert that the recipes for the selected day are displayed
      cy.get('div[aria-label="Meal Planned Recipes"]').should('be.visible')
  
      // Get the nutritional breakdown elements
      cy.get('div[aria-label="Meal Planned Recipes"] p').should('have.length.greaterThan', 0)
  
      // Save the first recipe for the selected day
      cy.get('button[data-testid="dropDayMealButton"]').first().click()
  
      // Assert that the recipe is removed from the meal planner
      cy.get('div[aria-label="Meal Planned Recipes"] p').should('have.length', 0)
  
      // Go back to the main meal planner page
      cy.get('button#show').click()
  
      // Assert that the recipes in the meal planner are displayed
      cy.get('div[aria-label="Meal Planner Recipes"]').should('be.visible')
  
      // Get the nutritional breakdown elements
      cy.get('div[aria-label="Meal Planner Recipes"] p').should('have.length.greaterThan', 0)
  
      // Save the first recipe for the meal planner
      cy.get('button[data-testid="dropMealButton"]').first().click()
  
      // Assert that the recipe is removed from the meal planner
      cy.get('div[aria-label="Meal Planner Recipes"] p').should('have.length', 0)
    })
  })
  