
describe('Test case 10 :  Show and select hidden checkbox', () => {
 const homePage =
    'https://testautomationpractice.blogspot.com/';

  it('Show and interact with hidden input field', () => {
    const sampleText = 'Cypress hidden element test';

    // Step 1: Open the main page
    cy.visit(homePage);
    
    //Step 2 : Verify the checkbox becomes visible. 
    cy.get('[id="toggleCheckbox"]')
    .should('be.visible')
    .click()

    //Step 3: Select the checkbox. 
     cy.get('[id="checkbox2"]')
     .should('be.visible')
     .check();
    
  })
})
