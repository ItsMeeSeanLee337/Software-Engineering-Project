//The system shall allow users to have their own personalized 
//profile where it contains a biography, favorite recipe, and a profile picture. 
describe('R05', () => {
    it('The system shall allow users to have their own personalized profile where it contains a biography, favorite recipe, and a profile picture. ', () => {
      cy.visit('http://localhost:3000/Login')
  
      cy.get('#username').type('testuser')
      cy.get('#password').type('password123')
  
      cy.get("#loginButton").click()
      cy.url().should('include', '/Login_Success')

      //Navigate to the bio navigation from the nav bar
      cy.get("#goToBio").click()
      cy.url().should('include', '/Bio')

      //Naviagte to the bio section
      cy.get("#goToBioPage").click()
      cy.url().should('include', '/Display_Personal_Bio')

      //Test for the bio
      //Get the title of the bio
      cy.get("#bioTitle").should('contain', 'Bio')
        
      //Verify the information of the bio
      cy.get("#bioText").should('contain', 'My name is test')

      //Get the favorite food of the bio
      cy.get("#bioFoodHeader").should('contain', 'Favorite Food')
        
      //Verify the information of the bio
      cy.get("#bioFood").should('contain', 'My favorite food is sushi')

      //Get the favorite recipe of the bio
      cy.get("#bioRecipeHeader").should('contain', 'Favorite Recipe')
        
      //Verify the information of the bio
      cy.get("#bioRecipe").should('contain', 'My favorite recipe is PBJ Sandwich')

      //Verify the image is in the bio as well
      cy.get('#bioImage').should('exist')
        
      //Verify that it has an image
      cy.get('#bioImage img').should('have.length', 1)


    })
});