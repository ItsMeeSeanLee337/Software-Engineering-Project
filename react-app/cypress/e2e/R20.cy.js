//The system shall allow regular users to view recipes created by certified recipe makers
describe('R20', () => {
    it('The system shall allow regular users to view recipes created by certified recipe makers ', () => {
        cy.visit('http://localhost:3000/Login')

        cy.get('#username').type('R20')
        cy.get('#password').type('R20')

        cy.get("#loginButton").click()
        cy.url().should('include', '/Login_Success')

        //Handling the hover menu
        cy.get("#goToPersonalizedRecipes").click();
        
        //Should be on the display maker recipes page
        cy.url().should('include', '/Personalized_Recipes')

        //Should be able to see a recipe that a maker made
        cy.get("#ing1").should('be.visible')

        cy.get("#ing2").should('be.visible')

        cy.get("#ing3").should('be.visible')
        
        //Select two of the ingredients for the search
        cy.get("#ing1").click()
        cy.get("#ing2").click()

        
        //Search for the ingredients
        cy.get("#ingredientSearchButton").click()

        cy.wait(500)

        //Verify recipes were recieved from api
        cy.get("#recipeList").should("be.visible")
    })
});