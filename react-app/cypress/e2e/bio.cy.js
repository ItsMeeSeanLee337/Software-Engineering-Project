describe('Bio Testing', () => {

    it('Tests with correct credentials', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('testuser')
        cy.get('#password').type('password123')
        cy.get("#loginButton").click()
        cy.get('#goToBio').click()
        cy.url().should('include', '/Bio')
        cy.get('#goToEditCreateBio').click()
        cy.url().should('include', '/Create_Edit_Personal_Bio')
        cy.get('#img2').click()
        cy.get('#about').type('This is for testing')
        cy.get('#fav_food').type('My favorite food is pizza.')
        cy.get('#fav_recipe').type('My favorite recipe is PBJ Sandwich')
        cy.get("#submit_edit_bio").click()
    })

    it('Tests with correct credentials only edits one field', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('testuser')
        cy.get('#password').type('password123')
        cy.get("#loginButton").click()
        cy.get('#goToBio').click()
        cy.url().should('include', '/Bio')
        cy.get('#goToEditCreateBio').click()
        cy.url().should('include', '/Create_Edit_Personal_Bio')
        cy.get('#about').type('My name is testuser. ')
        cy.get("#submit_edit_bio").click()
    })
    it('Tests with no edits, just view bio', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('testuser')
        cy.get('#password').type('password123')
        cy.get("#loginButton").click()
        cy.get('#goToBio').click()
        cy.url().should('include', '/Bio')
        cy.get('#goToEditBio').click()
        cy.url().should('include', '/Display_Personal_Bio')
    })
    it('Tests with correct credentials edits more than one field', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('testuser')
        cy.get('#password').type('password123')
        cy.get("#loginButton").click()
        cy.get('#goToBio').click()
        cy.url().should('include', '/Bio')
        cy.get('#goToEditCreateBio').click()
        cy.url().should('include', '/Create_Edit_Personal_Bio')
        cy.get('#img1').click()
        cy.get('#fav_food').type('My favorite food is sushi.')
        cy.get("#submit_edit_bio").click()
    })


    it('Tests with new user and go to view bio', () => {
        cy.visit('http://localhost:3000/Registration')

        cy.get('#firstname').type('new_user_first')
        cy.get('#lastname').type('new_user_last')
        cy.get('#username').type('new_test_user')
        cy.get('#password').type('test_user_pass')
        cy.get('#email').type('new_test_user_email.com')
    
        cy.get("#registerButton").click()
        cy.url().should('include', '/Registration')

        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('new_test_user')
        cy.get('#password').type('test_user_pass')
        cy.get("#loginButton").click()
        cy.get('#goToBio').click()
        cy.url().should('include', '/Bio')
        cy.get('#goToEditBio').click()
        cy.url().should('include', '/Display_Personal_Bio')
        
    })
    
    it('Tests with new user and go to edit, add nothing and click submit', () => {
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('new_test_user')
        cy.get('#password').type('test_user_pass')
        cy.get("#loginButton").click()
        cy.get('#goToBio').click()
        cy.url().should('include', '/Bio')
        cy.get('#goToEditCreateBio').click()
        cy.url().should('include', '/Create_Edit_Personal_Bio')
        cy.get("#submit_edit_bio").click()
    })
    it('Tests with new user and edit only one field', () => {
        
        cy.visit('http://localhost:3000/Login')
        cy.get('#username').type('new_test_user')
        cy.get('#password').type('test_user_pass')
        cy.get("#loginButton").click()
        cy.get('#goToBio').click()
        cy.url().should('include', '/Bio')
        cy.get('#goToEditCreateBio').click()
        cy.url().should('include', '/Create_Edit_Personal_Bio')
        cy.get('#fav_food').type('My favorite food is pasta.')
        cy.get("#submit_edit_bio").click()
        
    })

  
  })
  