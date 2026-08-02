// ===============================================
// Test Case 6: Static and Dynamic Table Validation
// ===============================================

describe('Test Case 6: Static and Dynamic Web Table Validation', () => {

  beforeEach(() => {
    cy.visit('https://testautomationpractice.blogspot.com/');
  });

  it('Verify static web-table contents', () => {

    // --------------------------------------------------
    // Step 1: Locate and scroll to the Static Web Table
    // --------------------------------------------------
    cy.get('[name="BookTable"]')
      .scrollIntoView()
      .should('be.visible');

    // --------------------------------------------------
    // Step 2: Iterate through each static-table row
    // --------------------------------------------------
    cy.get('[name="BookTable"] tbody tr')
      .should('have.length.greaterThan', 0)
      .each(($row, rowIndex) => {

        const rowText = $row
          .text()
          .trim()
          .replace(/\s+/g, ' ');

        cy.log(
          `Static table row ${rowIndex + 1}: ${rowText}`
        );
      });

    // --------------------------------------------------
    // Step 3: Locate the Learn Java row
    // --------------------------------------------------
    cy.contains(
      '[name="BookTable"] td',
      'Learn Java'
    )
      .should('be.visible')
      .closest('tr')
      .within(() => {

        // Book name
        cy.get('td')
          .eq(0)
          .should('have.text', 'Learn Java');

        // Author
        cy.get('td')
          .eq(1)
          .should('have.text', 'Mukesh');

        // Subject
        cy.get('td')
          .eq(2)
          .should('have.text', 'Java');

        // Price
        cy.get('td')
          .eq(3)
          .should('have.text', '500');
      });
  });

  it('Verify dynamic web-table rows and columns', () => {

    // --------------------------------------------------
    // Step 4: Locate the Dynamic Web Table
    // --------------------------------------------------
    cy.contains(
      'th',
      'Memory (MB)',
      { timeout: 10000 }
    )
      .scrollIntoView()
      .should('be.visible')
      .closest('table')
      .as('dynamicTable');

    // Verify the dynamic table exists
    cy.get('@dynamicTable')
      .should('be.visible');

    // --------------------------------------------------
    // Find the Name and Memory column positions
    // because dynamic-table columns may change order
    // --------------------------------------------------
    cy.get('@dynamicTable')
      .find('th')
      .then(($headers) => {

        const headers = [...$headers].map(
          (header) => header.innerText.trim()
        );

        const nameColumnIndex =
          headers.indexOf('Name');

        const memoryColumnIndex =
          headers.indexOf('Memory (MB)');

        expect(
          nameColumnIndex,
          'Name column should exist'
        ).to.be.greaterThan(-1);

        expect(
          memoryColumnIndex,
          'Memory column should exist'
        ).to.be.greaterThan(-1);

        // ----------------------------------------------
        // Step 5: Iterate through dynamic-table rows
        // ----------------------------------------------
        cy.get('@dynamicTable')
          .find('tr')
          .filter(':has(td)')
          .should('have.length.greaterThan', 0)
          .each(($row, rowIndex) => {

            const cells = [...$row.find('td')].map(
              (cell) => cell.innerText.trim()
            );

            const processName =
              cells[nameColumnIndex];

            const memoryValue =
              cells[memoryColumnIndex];

            cy.log(
              `Row ${rowIndex + 1} | ` +
              `Name: ${processName} | ` +
              `Memory: ${memoryValue}`
            );

            expect(processName)
              .to.not.equal('');

            expect(memoryValue)
              .to.not.equal('');
          });
      });
  });
});