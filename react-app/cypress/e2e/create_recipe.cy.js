describe('Create Recipe Testing', () => {

    it('Tests with w/ incorrect inputs of field, only submits, enters nothing else', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('new_test_user')
        cy.get('#password').type('test_user_pass')
        cy.get("#loginButton").click()
        cy.get('#goToCreateRecipe').click()
        cy.url().should('include', '/Create_Recipe')
        cy.get("#create_recipe_button").click()
    })
    it('Tests with w/ incorrect inputs of field, only enters the title field and submits', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('new_test_user')
        cy.get('#password').type('test_user_pass')
        cy.get("#loginButton").click()
        cy.get('#goToCreateRecipe').click()
        cy.url().should('include', '/Create_Recipe')
        cy.get("#title").type("New Recipe")
        cy.get("#create_recipe_button").click()
        
    })
    it('Tests with w/ incorrect inputs of field, only enters the steps field and submits', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('new_test_user')
        cy.get('#password').type('test_user_pass')
        cy.get("#loginButton").click()
        cy.get('#goToCreateRecipe').click()
        cy.url().should('include', '/Create_Recipe')
        cy.get("#steps").type("1. Step 1")
        cy.get("#create_recipe_button").click()
       
    })
    it('Tests with w/ incorrect inputs of field, only enters the ingredients field and submits', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('new_test_user')
        cy.get('#password').type('test_user_pass')
        cy.get("#loginButton").click()
        cy.get('#goToCreateRecipe').click()
        cy.url().should('include', '/Create_Recipe')
        cy.get('input[placeholder="Ingredient 1"]').type('ing1')
        cy.get("#add_ingredient").click()
        cy.get('input[placeholder="Ingredient 2"]').type('ing2')
        cy.get("#add_ingredient").click()
        cy.get("#create_recipe_button").click()
        
    })
    it('Tests w/ correct input, removes and adds ingredients', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('new_test_user')
        cy.get('#password').type('test_user_pass')
        cy.get("#loginButton").click()
        cy.get('#goToCreateRecipe').click()
        cy.url().should('include', '/Create_Recipe')
        cy.get("#title").type("PBJ Sandwich")
        cy.get("#steps").type("Get two slices of bread. Add peanut butter to one slice. Add jelly to another slice. Sandwich the slices together. Enjoy!")
        cy.get('input[placeholder="Ingredient 1"]').type('Bread')
        cy.get("#add_ingredient").click()
        cy.get("#remove_ingredient").click()
        cy.get('input[placeholder="Ingredient 1"]').type('2 slices of bread')
        cy.get("#add_ingredient").click()
        cy.get('input[placeholder="Ingredient 2"]').type('Peanut Butter')
        cy.get("#add_ingredient").click()
        cy.get('input[placeholder="Ingredient 3"]').type('Jelly')
        cy.get("#create_recipe_button").click()
    })

  
  })
  