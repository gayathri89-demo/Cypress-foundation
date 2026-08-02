describe('Test case 12: File Upload and Download', () => {
  it('Upload a single file', () => {
    const filePath = 'cypress/fixtures/image.png';

    cy.visit('https://testautomationpractice.blogspot.com/');

    // Step 1: Navigate to the file-upload section
    cy.get('#singleFileInput')
      .scrollIntoView()
      .should('be.visible');

    // Step 2: Select one file
    cy.get('#singleFileInput')
      .selectFile(filePath);

    // Verify that the correct file was selected
    cy.get('#singleFileInput')
      .then(($input) => {
        expect($input[0].files).to.have.length(1);
      });

    // Step 3: Click the upload button
    cy.get('[id="singleFileInput"]').selectFile(filePath);
    cy.contains('Upload Single File').click();

    cy.contains('button', 'Upload Single File')
    .should('be.visible')
    .click();

    // Step 4: Verify the status message
    cy.get('#singleFileStatus')
      .should('be.visible')
      .and('contain.text', 'Single file selected')
      
  });
});