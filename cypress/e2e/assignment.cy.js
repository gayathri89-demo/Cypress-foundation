describe('Test Case 1: Basic form submission', () => {

  beforeEach(() => {
    cy.visit('https://testautomationpractice.blogspot.com/')
  })

  it('Verify the URL', () => {
    cy.url().should('include', 'testautomationpractice.blogspot.com')
  })

  it('Verify the page title', () => {
    cy.title().should('include', 'Automation Testing Practice')
    
  })

  it('Verify registration form submission', () => {
    cy.get('[id="name"]').type('Gayathri').should('have.value','Gayathri');
    cy.get('[id="email"]').type('gayathri@test.com').should('have.value','gayathri@test.com')
    cy.get('[id="phone"]').type('9876543210');
    cy.get('[id="textarea"]').type('Dubai, UAE').should('have.value','Dubai, UAE');
    cy.get('[id="male"]').check()
    cy.get('[id="monday"]').check()
    cy.get('#country').select('India');
    cy.get('#colors').select('Blue')
    cy.get('[id="datepicker"]').type('12/12/1989' , { force: true })
    cy.get('[id="txtDate"]').type('12/12/2016', { force: true })
    cy.get('[id="start-date"]').click();
    cy.contains('button', 'Submit').scrollIntoView().should('be.visible').click();
    cy.get('#result').should('be.visible');
  })
  
})
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