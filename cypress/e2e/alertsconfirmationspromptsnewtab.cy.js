
// ======================================================
// Test Case 4: Alerts, Confirmations, Prompts and New Tab
// ======================================================

describe('Test Case 4: Alerts, Confirmations, Prompts and New-Tab Behavior', () => {

  beforeEach(() => {
    cy.visit('https://testautomationpractice.blogspot.com/');
  });

  it('Verify alerts, confirmation, prompt and new-tab behavior', () => {

    // --------------------------------------------------
    // Step 1: Stub window.alert
    // --------------------------------------------------
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    // --------------------------------------------------
    // Step 2: Click the Simple Alert button
    // --------------------------------------------------
    cy.get('[id="alertBtn"]')
      .scrollIntoView()
      .should('be.visible')
      .click();

    // --------------------------------------------------
    // Step 3: Verify alert was called once
    // and verify the alert message
    // --------------------------------------------------
    cy.get('@alertStub')
      .should('have.been.calledOnce')
      .and(
        'have.been.calledWith',
        'I am an alert box!'
      );

    // Restore the original window.alert
    cy.get('@alertStub').then((alertStub) => {
      alertStub.restore();
    });

    // --------------------------------------------------
    // Step 4: Verify alert text using event handler
    // --------------------------------------------------
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal(
        'I am an alert box!'
      );
    });

    cy.get('[id="alertBtn"]')
      .should('be.visible')
      .click();

    // --------------------------------------------------
    // Step 5: Stub and accept the confirmation dialog
    // --------------------------------------------------
    cy.window().then((win) => {
      cy.stub(win, 'confirm')
        .returns(true)
        .as('confirmStub');
    });

    cy.get('[id="confirmBtn"]')
      .scrollIntoView()
      .should('be.visible')
      .click();

    // Verify confirmation dialog was called
    cy.get('@confirmStub')
      .should('have.been.calledOnce')
      .and(
        'have.been.calledWith',
        'Press a button!'
      );

    // Verify accepting the confirmation
    cy.get('[id="demo"]')
      .should('be.visible')
      .and('have.text', 'You pressed OK!');

    // --------------------------------------------------
    // Step 6: Stub and handle the prompt dialog
    // --------------------------------------------------
    const promptResponse = 'Gayathri';

    cy.window().then((win) => {
      cy.stub(win, 'prompt')
        .returns(promptResponse)
        .as('promptStub');
    });

    cy.get('[id="promptBtn"]')
      .should('be.visible')
      .click();

    // Verify prompt was called
    cy.get('@promptStub')
      .should('have.been.calledOnce');

    // Verify the prompt message
    cy.get('@promptStub').then((promptStub) => {
      const promptMessage =
        promptStub.firstCall.args[0];

      expect(promptMessage).to.equal(
        'Please enter your name:'
      );
    });

    // Verify the entered prompt value
    cy.get('[id="demo"]')
      .should(
        'have.text',
        'Hello Gayathri! How are you today?'
      );

    // --------------------------------------------------
    // Step 7: Stub window.open for the New Tab button
    // --------------------------------------------------
    cy.window().then((win) => {
      cy.stub(win, 'open').as('newTabStub');
    });

    // --------------------------------------------------
    // Step 8: Click the New Tab button
    // --------------------------------------------------
    cy.contains('button', 'New Tab')
      .scrollIntoView()
      .should('be.visible')
      .click();

    // --------------------------------------------------
    // Step 9: Verify window.open was called
    // and verify the external URL
    // --------------------------------------------------
    cy.get('@newTabStub')
      .should('have.been.calledOnce')
      .then((newTabStub) => {

        const openedUrl =
          newTabStub.firstCall.args[0];

        cy.log(`New-tab URL: ${openedUrl}`);

        expect(openedUrl)
          .to.include('pavantestingtools.com');
      });
  });
});