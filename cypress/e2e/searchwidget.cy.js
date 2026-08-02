describe('Test Case 3: Search Widget and Tooltip/Dropdown Content', () => {

  beforeEach(() => {
    cy.visit('https://testautomationpractice.blogspot.com/');
  });

  it('Verify Wikipedia search results and dropdown content', () => {

    const searchKeyword = 'today';

    // Step 1: Clear and focus the search input
    cy.get('[id="Wikipedia1_wikipedia-search-input"]')
      .scrollIntoView()
      .should('be.visible')
      .clear()
      .focus();

    // Step 2: Enter the search keyword
    cy.get('[id="Wikipedia1_wikipedia-search-input"]')
      .type(searchKeyword)
      .should('have.value', searchKeyword);

    // Click the Search button
    cy.get('[class="wikipedia-search-button"]')
      .should('be.visible')
      .click();

    // Step 3: Verify the results container is visible
    cy.get('[id="Wikipedia1_wikipedia-search-results"]', {
      timeout: 10000
    })
      .should('be.visible')
      .and('not.be.empty');

    // Step 4: Find all links inside the results container
    cy.get('[id="Wikipedia1_wikipedia-search-results"]', {
      timeout: 10000
    })
      .find('a')
      .should('have.length.greaterThan', 0)
      .each(($result) => {

        const resultText = $result
          .text()
          .trim()
          .toLowerCase();

        expect(resultText).to.include(
          searchKeyword.toLowerCase()
        );
      });

    // Step 5: Hover over the dropdown button
    cy.get('[class="dropbtn"]')
      .scrollIntoView()
      .should('be.visible')
      .trigger('mouseover');

    // Step 6: Verify dropdown content
    cy.get('[class="dropdown-content"]')
      .invoke('show')
      .should('be.visible')
      .and('contain.text', 'Mobiles')
      .and('contain.text', 'Laptops');
  });
});