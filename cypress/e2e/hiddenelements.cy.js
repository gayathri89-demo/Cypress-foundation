
// ===========================================
// Test Case 9: Hidden elements
// ===========================================

describe('Test case 9 : Hidden Elements', () => {
 const homePage =
    'https://testautomationpractice.blogspot.com/';

  it('Show and interact with hidden input field', () => {
    const sampleText = 'Cypress hidden element test';

    // Step 1: Open the main page
    cy.visit(homePage);

    // Step 2: Navigate to the Footer Links section
    cy.contains('h2', 'Footer Links')
      .scrollIntoView()
      .should('be.visible');

    // Step 3: Open the Hidden Elements & AJAX page
    cy.contains('a', 'Hidden Elements & AJAX')
      .should('be.visible')
      .click();

    //Step 4: Verify the URL is opened
    cy.url()
    .should('include','/p/gui-elements-ajax-hidden.html')

    //Step 5: Find the label for input box 2
    cy.get('#input2')
    .should('exist')
    .and('not.be.visible');

    //Step 6: Click the control that reveals the hidden input field. 
    cy.get('[id="toggleInput"]')
    .click();

    //Step 7 :Verify the input field becomes visible. 
    cy.get('[id="input2"]')
    .eq(0)
    .should('be.visible')
    .type(sampleText)
    .should("have.value",sampleText);

  })
})
