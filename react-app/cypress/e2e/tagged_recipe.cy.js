describe('Tag Recipe Testing', () => {

    it('Add a tag to a recipe, view tag and remove tag', () => {
        //logging in
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('testuser')
        cy.get('#password').type('password123')
        cy.get("#loginButton").click()
        //clicking on display recipe
        cy.get('#goToCreateRecipe').trigger('mouseover').get("#goToDisplayRecipe");
        cy.get('#goToDisplayRecipe').click()
        cy.url().should('include', '/display-custom-recipes')
        //adding tag
        cy.get('#tag').click()
        cy.get("#tagText").type("tag1")
        cy.get("#saveTag").click()
        cy.get("#view_tags").click()
        //removing tag
        cy.url().should('include', '/TaggedRecipes')
        cy.get("#specific_tag").click()
        cy.get("#removeTag").click()
    })

    it('Add multiple tags to a recipe, view tag and remove tag', () => {
        cy.visit('http://localhost:3000/Login')
        //logging in
        cy.get('#username').type('testuser')
        cy.get('#password').type('password123')
        cy.get("#loginButton").click()
        //clicking on display recipe
        cy.get('#goToCreateRecipe').trigger('mouseover').get("#goToDisplayRecipe");
        cy.get('#goToDisplayRecipe').click()
        cy.url().should('include', '/display-custom-recipes')
        //getting the 3rd recipe and typing Italian as the tag and saving it
        cy.get('[id="tag"]').eq(2).click();
        cy.get('#tagText').clear();
        cy.get("#tagText").type("Italian")
        cy.get("#saveTag").click()
        //getting the 7th recipe and typing American as the tag and saving it
        cy.get('[id="tag"]').eq(6).click();
        cy.get('#tagText').clear();
        cy.get("#tagText").type("American")
        cy.get("#saveTag").click()
        //getting the 13th recipe and typing American as the tag and saving it
        cy.get('[id="tag"]').eq(12).click();
        cy.get('#tagText').clear();
        cy.get("#tagText").type("Italian")
        cy.get("#saveTag").click()
        //viewing all tags
        cy.get("#view_tags").click()
        cy.url().should('include', '/TaggedRecipes')
        //clicking the different tags
        cy.contains('button', 'Italian').click();
        cy.contains('button', 'American').click();
        //removing the second recipe in the italian tag
        cy.contains('button', 'Italian').click();
        cy.get('[id="removeTag"]').eq(1).click()
        //viewing the italian tag again to show the recipe doesnt exist
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
        //untagging the other recipe for the italian tag, leaving there to be only the american tag
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
        //clearing out all tagged recipes so that when we want to retest, it wont give us a dupe error
        cy.url().should('include', '/TaggedRecipes')
        cy.contains('button', 'American').click();
        cy.get('[id="removeTag"]').eq(0).click()
    })


  
  })