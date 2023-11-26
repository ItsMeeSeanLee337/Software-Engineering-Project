//The system shall allow users to organize 
//their saved recipes into categories that they can freely specify directly. 
describe('R13', () => {
    it('The system shall allow users to organize their saved recipes into categories that they can freely specify directly. ', () => {
        cy.visit('http://localhost:3000/Login')

        cy.get('#username').type('cypressOneRecipe')
        cy.get('#password').type('cypressOneRecipe')

        cy.get("#loginButton").click()
        cy.url().should('include', '/Login_Success')

        //Handling the hover menu
        cy.get('#goToCreateRecipe').trigger('mouseover')
        cy.wait(200)
        cy.get("#goToDisplayRecipe").click();

        //Verify the recipe to get correct and compare later to
        cy.get("#recipeTitle").should("contain", "Tex-Mex");
        
        //Press the add tag button
        cy.get("#addTagButton").first().click()

        //Get and type a tag into the text box
        cy.get("#tagTextArea").type("Tag")

        //Save the tag for the recipe
        cy.get("#saveTagButton").click()

        //Go view the tag in the library of them
        cy.get("#goToTaggedRecipes").click()

        //click the first tag
        cy.get("#tagButton").first().click()

        //verify it contains the recipe we just tagged
        cy.get("#tagRecipeTitle").should("contain", "Tex-Mex");

        
        
    })
});