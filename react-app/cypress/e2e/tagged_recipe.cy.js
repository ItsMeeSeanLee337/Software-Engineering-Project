describe('Tag Recipe Testing', () => {

    it('Add a tag to a recipe, view tag and remove tag', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('testuser')
        cy.get('#password').type('password123')
        cy.get("#loginButton").click()
        cy.get('#goToCreateRecipe').trigger('mouseover').get("#goToDisplayRecipe");
        cy.get('#goToDisplayRecipe').click()
        cy.url().should('include', '/display-custom-recipes')
        cy.get('#tag').click()
        cy.get("#tagText").type("Jam")
        cy.get("#saveTag").click()
        cy.get("#view_tags").click()
        cy.url().should('include', '/TaggedRecipes')
        cy.get("#specific_tag").click()
        cy.get("#removeTag").click()
    })

    it('Add multiple tags to a recipe, view tag and remove tag', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('testuser')
        cy.get('#password').type('password123')
        cy.get("#loginButton").click()
        cy.get('#goToCreateRecipe').trigger('mouseover').get("#goToDisplayRecipe");
        cy.get('#goToDisplayRecipe').click()
        cy.url().should('include', '/display-custom-recipes')
        cy.get('[id="tag"]').eq(2).click();
        cy.get('#tagText').clear();
        cy.get("#tagText").type("Italian")
        cy.get("#saveTag").click()
        cy.get('[id="tag"]').eq(6).click();
        cy.get('#tagText').clear();
        cy.get("#tagText").type("American")
        cy.get("#saveTag").click()
        cy.get('[id="tag"]').eq(12).click();
        cy.get('#tagText').clear();
        cy.get("#tagText").type("Italian")
        cy.get("#saveTag").click()
        cy.get("#view_tags").click()
        cy.url().should('include', '/TaggedRecipes')
        cy.contains('button', 'Italian').click();
        cy.contains('button', 'American').click();
        cy.contains('button', 'Italian').click();
        cy.get('[id="removeTag"]').eq(1).click()
        cy.contains('button', 'Italian').click();
    })

    it('Untag all recipes for Italian tag', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('testuser')
        cy.get('#password').type('password123')
        cy.get("#loginButton").click()
        cy.get('#goToCreateRecipe').trigger('mouseover').get("#goToDisplayRecipe");
        cy.get('#goToDisplayRecipe').click()
        cy.url().should('include', '/display-custom-recipes')
        cy.get("#view_tags").click()
        cy.url().should('include', '/TaggedRecipes')
        cy.contains('button', 'Italian').click();
        cy.get('[id="removeTag"]').eq(0).click()
    })

    it('Untag all recipes', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('testuser')
        cy.get('#password').type('password123')
        cy.get("#loginButton").click()
        cy.get('#goToCreateRecipe').trigger('mouseover').get("#goToDisplayRecipe");
        cy.get('#goToDisplayRecipe').click()
        cy.url().should('include', '/display-custom-recipes')
        cy.get("#view_tags").click()
        cy.url().should('include', '/TaggedRecipes')
        cy.contains('button', 'American').click();
        cy.get('[id="removeTag"]').eq(0).click()
    })


  
  })