//The system shall allow certified recipe makers to create custom recipes
describe('R17', () => {
    it('The system shall allow certified recipe makers to create custom recipes', () => {
        cy.visit('http://localhost:3000/Login')
        
        //Login as a maker
        cy.get('#username').type('maker')
        cy.get('#password').type('maker')

        cy.get("#loginButton").click()

        //Should be in create recipe upon login
        cy.url().should('include', '/Create_Recipe')
        
        //input fields for recipe
        cy.get("#title").type("Eggs");

        cy.get("#steps").type("Step 1: Boil, Step 2: Peel, Step 3: Eat");

        cy.get("#addIngButton").click();
        cy.get("#addIngButton").click();
        cy.wait(100)
        cy.get("input").each(($input, index) => {
            // Generate a unique value for each input box
            if(index === 1)
            {
                cy.wrap($input).type("Eggs");
            }
            if(index === 2)
            {
                cy.wrap($input).type("Salt");
            }
            if(index === 3)
            {
                cy.wrap($input).type("Water");
            }
            
          });

        //click the add recipe button
        cy.get("#addRecipeButton").click();

        //Only happens if the endpoint confirms the recipe was added
        cy.get("#recipeAdded").should('contain', 'Recipe added!').should('be.visible')
        
    })
});