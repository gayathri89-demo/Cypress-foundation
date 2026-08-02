

// ===========================================
// Test Case 8: Shadow DOM Element Interaction
// ===========================================

describe('Test Case 8: Shadow DOM Element Interactions', () => {

  beforeEach(() => {
    cy.visit('https://testautomationpractice.blogspot.com/');
  });

  it('Verify shadow DOM text, nested content and input', () => {

    const inputValue = 'Hello Shadow DOM';

    // --------------------------------------------------
    // Step 1: Locate and scroll to the shadow host
    // --------------------------------------------------
    cy.get('[id="shadow_host"]')
      .scrollIntoView()
      .should('exist');

    // --------------------------------------------------
    // Step 2: Enter the first shadow root
    // and verify Mobiles
    // --------------------------------------------------
    cy.get('[id="shadow_host"]')
      .shadow()
      .find('[id="shadow_content"] > span')
      .should('be.visible')
      .and('have.text', 'Mobiles');

    // --------------------------------------------------
    // Step 3: Enter the nested shadow root
    // and verify Laptops
    // --------------------------------------------------
    cy.get('[id="shadow_host"]')
      .shadow()
      .find('[id="nested_shadow_host"]')
      .should('exist')
      .shadow()
      .find('[id="nested_shadow_content"] > div')
      .should('be.visible')
      .and('have.text', 'Laptops');

    // --------------------------------------------------
    // Step 4: Find the input inside the shadow root
    // and enter text
    // --------------------------------------------------
    cy.get('[id="shadow_host"]')
      .shadow()
      .find('input')
      .first()
      .should('be.visible')
      .clear()
      .type(inputValue);

    // --------------------------------------------------
    // Step 5: Verify the input value
    // --------------------------------------------------
    cy.get('[id="shadow_host"]')
      .shadow()
      .find('input')
      .first()
      .should('have.value', inputValue);
  });
});