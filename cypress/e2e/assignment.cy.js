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
    // using its Memory header
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