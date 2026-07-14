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

describe('Test Case 4: Alerts, Confirmations, Prompts and New Tab', () => {
  beforeEach(() => {
    cy.visit('https://testautomationpractice.blogspot.com/');
  });
  
   it('Validate the popups & alerts', () => {
    
    //simple alert
    cy.get('[id="HTML9"]').scrollIntoView();
    cy.on('window:alert', (text) => {
    expect(text).to.include('I am an alert box!')
    return true

    cy.get('[id="alertBtn"]').click();

   //Confirmation alert
    cy.get('[id="confirmBtn"]').scrollIntoView();
    cy.on('window:alert', (text) => {
    expect(text).to.include('Press a button!')
    return true
    expect('[id="demo"]').to.include('You pressed OK!')
  })

  cy.get('[id="confirmBtn"]').scrollIntoView();
   cy.on('window:alert', (text) => {
   expect(text).to.include('Press a button!')
   return false
   expect('[id="demo"]').to.include('You pressed Cancel!')
  })

   cy.get('[id="promptBtn"]').scrollIntoView();
   cy.on('window:alert', (text) => {
   expect(text).to.include('Please enter your name:')
   return true
   expect('[id="demo"]').to.include('Hello Harry Potter! How are you today?')
  })

   cy.get('[id="promptBtn"]').scrollIntoView();
   cy.on('window:alert', (text) => {
   expect(text).to.include('Please enter your name:')
   return false
   expect('[id="demo"]').to.include('User cancelled the prompt.')
  })

   it('Verify the search functionality',()=>{
    cy.get('[id="Wikipedia1_wikipedia-search-input"]').type('wikipedia')
    cy.get('[class="wikipedia-search-button"]').click();
 
  })
    })
  })

 
});

   it('Verify the search functionality',()=>{
    cy.get('[id="Wikipedia1_wikipedia-search-input"]').type('wikipedia')
    cy.get('[class="wikipedia-search-button"]').click();
 
  })




describe('Iframe Values', () => {

  it('Print iframe body text', () => {

    cy.visit('https://www.qa-practice.com/elements/iframe/iframe_page');

    cy.get('iframe.embed-responsive-item')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then((body) => {

        cy.wrap(body)
          .invoke('text')
          .then((text) => {
            cy.log(text);
            console.log(text);
          });

      });

  });

});

describe('Static Web Table Test Cases', () => {

  it('TC_TABLE_01 - Verify static table is visible', () => {
    cy.get('table[name="BookTable"]')
      .should('be.visible');
  });

});

describe('Dynamic Web Table Test Cases', () => {

  it('TC_TABLE_01 - Verify dynamic table is visible', () => {
    cy.get('table[name="BookTable"]')
      .should('be.visible');
  });

});

 it('Handling login', () => {

  cy.visit('https://practicetestautomation.com/practice-test-login/');

    cy.get('[id="username"]').focus().type('student');
    cy.get('[id="password"]').focus().type('Password123');
    cy.get('[id="submit"]').click(); 

  })

it('Handling shadow DOM Elements', () =>{
  cy.get('[id="HTML16"]').as('domEle');
  cy.get('@domEle').scrollIntoView();
  cy.get('@domEle').shadow().find('[id="shadow_content"]').should('be.visible');
  cy.get('@domEle').shadow().find('[id="nested_shadow_content"]').shadow().contains('Laptops');
  cy.get('@domEle').shadow().find('input[type="text"]').type('Fish');

})

it.only('Upload file', ()=>{

  cy.visit('https://testautomationpractice.blogspot.com/')

  cy.get('[id="singleFileInput"]').selectFile('cypress/fixtures/image.png');
  cy.contains('Upload Single File').click();

  cy.get('[id="multipleFilesInput"]').selectFile('cypress/fixtures/image.png');
  cy.get('[id="multipleFilesInput"]').selectFile('cypress/fixtures/Screenshot 2025-10-26 154211.png')
  cy.contains('Upload Multiple Files').click();
})

