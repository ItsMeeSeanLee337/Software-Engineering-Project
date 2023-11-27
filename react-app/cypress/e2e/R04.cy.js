//The system shall allow regular users to view recipes created by certified recipe makers
describe('R04', () => {
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

        cy.get("#randomButton").should("be.visible")

        //Search for the ingredients
        cy.get("#randomButton").click()

        cy.wait(500)

        //Verify recipes were recieved from api
        cy.get("#recipeList").should("be.visible")
    })
});