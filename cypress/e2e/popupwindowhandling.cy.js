// ==================================
// Test Case 5: Popup Window Handling
// ==================================

describe('Test Case 5: Popup Window Handling', () => {

  beforeEach(() => {
    cy.visit('https://testautomationpractice.blogspot.com/');
  });

  it('Verify popup action triggers window.open twice', () => {

    // Step 1: Stub window.open
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpenStub');
    });

    // Step 2: Click the Popup Windows button
    cy.get('[id="PopUp"]')
      .scrollIntoView()
      .should('be.visible')
      .click();

    // Step 3: Verify window.open was called twice
    cy.get('@windowOpenStub')
      .should('have.been.calledTwice');
  });
});
