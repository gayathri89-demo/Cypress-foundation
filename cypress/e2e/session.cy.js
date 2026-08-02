//session handling : login only once; reuses the same session for multiple it blocks
describe('Session handling',()=>{
        beforeEach(()=>{
            cy.session("login session",()=>{
                cy.visit("https://practicetestautomation.com/practice-test-login/")         
                cy.get('[id="username"]').focus().type('student');
                cy.get('[id="password"]').focus().type('Password123');
                cy.get('[id="submit"]').click(); 
        })
    })
    it("Verify session handling",()=>{
        cy.visit("https://practicetestautomation.com/logged-in-successfully/")
        cy.contains("Logged In Successfully").should('be.visible');

    })
    it("Verify session handling",()=>{
        cy.visit("https://practicetestautomation.com/logged-in-successfully/")
        cy.contains("Logged In Successfully").should('be.visible');

    })

})