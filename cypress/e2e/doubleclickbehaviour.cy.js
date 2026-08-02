describe('Test Case 2: Dynamic Button and Double-Click Behavior', () => {

  beforeEach(() => {
    cy.visit('https://testautomationpractice.blogspot.com/');
  });

  it('Verify dynamic button text changes from START to STOP', () => {
    cy.get('#HTML5')
      .scrollIntoView();

    cy.contains('button', 'START')
      .should('be.visible')
      .invoke('text')
      .then((beforeText) => {
        const initialText = beforeText.trim();

        cy.log(`Before click: ${initialText}`);
        expect(initialText).to.equal('START');
      });

    cy.contains('button', 'START')
      .click();

    cy.contains('button', 'STOP')
      .should('be.visible')
      .invoke('text')
      .then((afterText) => {
        const updatedText = afterText.trim();

        cy.log(`After click: ${updatedText}`);
        expect(updatedText).to.equal('STOP');
      });
  });

  it('Verify double-click copies text to the target field', () => {
    cy.get('#field1')
      .scrollIntoView()
      .clear()
      .type('Hello World!')
      .should('have.value', 'Hello World!');

    cy.get('#field2')
      .invoke('val')
      .then((beforeValue) => {
        cy.log(`Field 2 before double-click: ${beforeValue}`);
      });

    cy.contains('button', 'Copy Text')
      .should('be.visible')
      .dblclick();

    cy.get('#field2')
      .should('have.value', 'Hello World!')
      .invoke('val')
      .then((afterValue) => {
        cy.log(`Field 2 after double-click: ${afterValue}`);
      });
  });

});