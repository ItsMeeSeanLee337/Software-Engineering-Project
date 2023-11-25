describe('Meal Planner Testing', () => {

    it('Succesful test: Add multiple meals to meal planner and view them', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('testuser')
        cy.get('#password').type('password123')
        cy.get("#loginButton").click()
        cy.get('#goToCreateRecipe').trigger('mouseover').get("#goToDisplayRecipe");
        cy.get('#goToDisplayRecipe').click()
        cy.url().should('include', '/display-custom-recipes')
        cy.get('[id="meal_planner"]').eq(2).click();
        cy.get('[id="meal_planner"]').eq(3).click();
        cy.get('[id="meal_planner"]').eq(6).click();
        cy.get('[id="meal_planner"]').eq(8).click();
        cy.get('[id="meal_planner"]').eq(12).click();
        
        cy.get('#goToMealPlanner').click()
        cy.url().should('include', '/MealPlanner')
        cy.get('#show').click()
    })

    it('Add a meal to the meal planner that already exists', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('testuser')
        cy.get('#password').type('password123')
        cy.get("#loginButton").click()
        cy.get('#goToCreateRecipe').trigger('mouseover').get("#goToDisplayRecipe");
        cy.get('#goToDisplayRecipe').click()
        cy.url().should('include', '/display-custom-recipes')
        cy.get('[id="meal_planner"]').eq(2).click();
    })

    it('Adds a meal to a day of the week and drop it', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('testuser')
        cy.get('#password').type('password123')
        cy.get("#loginButton").click()
        cy.get('#goToMealPlanner').click()
        cy.url().should('include', '/MealPlanner')
        cy.get('#show').click()
        cy.get('.r-box')  
        .eq(1)          
        .find('button#add_day') 
        .click();
        cy.get('#dayText').type('monday')
        cy.get('#saveDay').click()
        cy.get('#dayButton').first().click();
        cy.get('#dropDayMeal').click();
        cy.get('#dayButton').first().click();
    })
  

    it('Adds same meal to same day of the week', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('testuser')
        cy.get('#password').type('password123')
        cy.get("#loginButton").click()
        cy.get('#goToMealPlanner').click()
        cy.url().should('include', '/MealPlanner')
        cy.get('#show').click()
        cy.get('.r-box') 
        .eq(1)           
        .find('button#add_day') 
        .click();
        cy.get('#dayText').type('monday')
        cy.get('#saveDay').click()
        cy.get('#dayButton').first().click();
        cy.get('.r-box') 
        .eq(1)          
        .find('button#add_day') 
        .click();
        cy.get('#dayText').type('monday')
        cy.get('#saveDay').click()
    })
    
    it('Adds multiple meals to various days of weeks and drops various meals and adds new meals', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('testuser')
        cy.get('#password').type('password123')
        cy.get("#loginButton").click()
        cy.get('#goToMealPlanner').click()
        cy.url().should('include', '/MealPlanner')
        cy.get('#show').click()
        cy.get('.r-box')  
        .eq(1)          
        .find('button#add_day')  
        .click();
        cy.get('#dayText').type('tuesday')
        cy.get('#saveDay').click()
        cy.get('.r-box') 
        .eq(0)           
        .find('button#add_day') 
        .click();
        cy.get('#dayText').clear()
        cy.get('#dayText').type('monday')
        cy.get('#saveDay').click()
        cy.get('.r-box') 
        .eq(3)         
        .find('button#add_day')  
        .click();
        cy.get('#dayText').clear()
        cy.get('#dayText').type('friday')
        cy.get('#saveDay').click()
        cy.get('#dayButton').first().click();
        cy.contains('h2', 'Tuesday')
        .siblings('#dayButton')
        .click();
        cy.contains('h2', 'Friday')
        .siblings('#dayButton')
        .click();
        cy.get('#dayButton').first().click();
        cy.get('button#dropDayMeal').eq(1).click();
        cy.get('#show').click()
        cy.get('.r-box') 
        .eq(3)          
        .find('button#add_day')  
        .click();
        cy.get('#dayText').clear()
        cy.get('#dayText').type('monday')
        cy.get('#saveDay').click()
        cy.get('#dayButton').first().click();
        cy.contains('h2', 'Tuesday')
        .siblings('#dayButton')
        .click();
        cy.contains('h2', 'Friday')
        .siblings('#dayButton')
        .click();
        
    })
    
    
    it('Drops the meal from the meal planner, and the meal is no longer in the day', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('testuser')
        cy.get('#password').type('password123')
        cy.get("#loginButton").click()
        cy.get('#goToMealPlanner').click()
        cy.url().should('include', '/MealPlanner')
        cy.get('#show').click()
        cy.get('.r-box') 
        .eq(3)        
        .find('button#drop') 
        .click();
        cy.contains('h2', 'Friday')
        .siblings('#dayButton')
        .click();
        cy.get('#dayButton').first().click();
        
    })

    it('Drops all meals from mealPlanner', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('testuser')
        cy.get('#password').type('password123')
        cy.get("#loginButton").click()
        cy.get('#goToMealPlanner').click()
        cy.url().should('include', '/MealPlanner')
        cy.get('#show').click()
        cy.get('.r-box')  
        .eq(0)           
        .find('button#drop')  
        .click();
        cy.get('#show').click()
        cy.get('.r-box')  
        .eq(0)         
        .find('button#drop')  
        .click();
        cy.get('#show').click()
        cy.get('.r-box')  
        .eq(0)          
        .find('button#drop') 
        .click();
        cy.get('#show').click()
        cy.get('.r-box')  
        .eq(0)           
        .find('button#drop')  
        .click();
          
        
    })


    


  })