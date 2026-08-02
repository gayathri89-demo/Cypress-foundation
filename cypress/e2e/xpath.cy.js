
// ===============================================
// Test Case 7: XPath-Located Input Typing Sanity
// ===============================================

describe('Test Case 7: XPath-Located Input Typing', () => {

  beforeEach(() => {
    cy.visit('https://testautomationpractice.blogspot.com/');
  });

  it('Verify the input accepts text using XPath', () => {

    const inputValue = 'Gayathri';

    // Step 1: Locate the Name field using XPath
    cy.xpath('//input[@id="name"]')
      .scrollIntoView()
      .should('be.visible')
      .clear();

    // Step 2: Type a sample value
    cy.xpath('//input[@id="name"]')
      .type(inputValue);

    // Step 3: Verify the entered value
    cy.xpath('//input[@id="name"]')
      .should('have.value', inputValue);
  });
});
