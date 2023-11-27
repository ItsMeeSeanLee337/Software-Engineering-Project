describe('Nutritional Information Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/NutritionalInformation');
  });

  it('Enters ingredient and clicks search button', () => {
    cy.get('input[type="text"]').type('apple');
    cy.get('button').contains('Search').click();
    // Wait for the ID to appear after search
    cy.contains('ID of the top result: ').should('exist');
    cy.get('button').contains('Analyze ID').click();
    // Wait for the nutrition info to appear after analyze
    cy.contains('Calories').should('exist');
    cy.contains('Protein').should('exist');
    cy.contains('Fat').should('exist');
    cy.contains('Carbohydrates').should('exist');
  });
});
