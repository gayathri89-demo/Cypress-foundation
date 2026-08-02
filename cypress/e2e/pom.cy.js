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

  //POM model to save the form fields and values
  it.only('POM Model & Fixture data', () => {
    let dataEntryForm1 = new dataEntryForm();
      cy.get(dataEntryForm1.name).type(data.Name).should('have.value','Gayathri');
      cy.get(dataEntryForm1.email).type(data.Email).should('have.value','gayathri@test.com')
      cy.get(dataEntryForm1.phone).type(data.Phone);
      cy.get(dataEntryForm1.address).type(data.Address).should('have.value','Dubai, UAE');
      cy.get(dataEntryForm1.gender).check()
      cy.get(dataEntryForm1.day).check()
      cy.get(dataEntryForm1.country).select(data.Country);
      cy.get(dataEntryForm1.colors).select(data.Colors)
      cy.get(dataEntryForm1.datepicker).type(data.date1 , { force: true })
      cy.get(dataEntryForm1.txtDate).type(data.startdate, { force: true })
      cy.get(dataEntryForm1.startdate).click();
      cy.get(dataEntryForm1.submit).click();
      cy.get(dataEntryForm1.result).should('be.visible');

  })

  
})