import  { dataEntryForm } from "../support/loginform" ;
import {data} from "../fixtures/data";

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

  it.only('Fixture data', () => { 
    cy.fixture('testData').then((data) =>{
      cy.get('[id="name"]').type(data.Name).should('have.value','Gayathri');
      cy.get('[id="email"]').type(data.Email).should('have.value','gayathri@test.com')
      cy.get('[id="phone"]').type(data.Phone);
      cy.get('[id="textarea"]').type(data.Address).should('have.value','Dubai, UAE');
      cy.get(`#${data.Gender}`).check()
      cy.get(`#${data.Day}`).check()
      cy.get('#country').select(data.Country);
      cy.get('#colors').select(data.Colors)
      cy.get('[id="datepicker"]').type(data.date1 , { force: true })
      cy.get('[id="txtDate"]').type(data.startdate, { force: true })
      cy.get('[id="start-date"]').click();
      cy.contains('button', 'Submit').scrollIntoView().should('be.visible').click();
      cy.get('#result').should('be.visible');
     })

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
















