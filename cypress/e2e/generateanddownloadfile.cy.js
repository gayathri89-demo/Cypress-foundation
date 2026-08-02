describe('Test case 13 : Generate and download a text file', ()=> {
  it('Generate and download a text file', () => {

  const sampleText = 'This text was generated using Cypress.';

  cy.visit(
    'https://testautomationpractice.blogspot.com/p/download-files_25.html'
  );

  // Step 1: Verify the download section
  cy.contains('h2', 'Download a Text or PDF File')
    .should('be.visible');

  // Step 2 and 3: Enter sample text
  cy.get('#inputText')
    .should('be.visible')
    .clear()
    .type(sampleText)
    .should('have.value', sampleText);

  // Step 4: Generate the text file
  cy.get('#generateTxt')
    .should('be.visible')
    .click();

  // Verify that the download link is available
  cy.get('#txtDownloadLink')
    .should('be.visible')
    .and('have.attr', 'download');

  // Read the generated filename from the download attribute
  cy.get('#txtDownloadLink')
    .invoke('attr', 'download')
    .then((fileName) => {
      expect(fileName).to.be.a('string').and.not.be.empty;

      // Step 5: Download the file
      cy.get('#txtDownloadLink').click();

      // Step 6: Verify the file exists and contains the entered text
      cy.readFile(`cypress/downloads/${fileName}`)
        .should('equal', sampleText);
    });
});

})
