describe('Cookie handling',()=>{

    //To get the cookie browser
    it("Cookie handling",()=>{
        cy.visit("https://example.cypress.io/commands/cookies")
        cy.get('[id="getCookie"]  [class="set-a-cookie btn btn-success"]').click();
        cy.getCookies().should('have.length.at.least', 1);
        cy.getCookies('token').then((cookies)=>{
                expect(cookies[0]).to.have.property("Name","token")
                expect(cookies[0]).to.have.property("Value","123ABC")

        })
    })

     it('sets a cookie manually', () => {
    cy.setCookie('username', 'Gayathri');

    cy.getCookie('username').should('exist');

    cy.getCookie('username').then((cookie) => {
      expect(cookie.name).to.eq('username');
      expect(cookie.value).to.eq('Gayathri');
    });
  });

  it('clears a specific cookie', () => {
    cy.setCookie('token', '123ABC');

    cy.getCookie('token')
      .should('exist')
      .and('have.property', 'value', '123ABC');

    cy.clearCookie('token');

    cy.getCookie('token').should('not.exist');
  });

  it('clears all cookies', () => {
    cy.setCookie('token', '123ABC');
    cy.setCookie('username', 'Gayathri');

    cy.getCookies().should('have.length.at.least', 2);

    cy.clearCookies();

    cy.getCookies().should('be.empty');
  });

  it('validates cookie attributes', () => {
    cy.setCookie('accessToken', 'jwt-token-value', {
      secure: true,
      httpOnly: true,
      sameSite: 'lax'
    });

    cy.getCookie('accessToken').then((cookie) => {
      expect(cookie).to.exist;
      expect(cookie.name).to.eq('accessToken');
      expect(cookie.value).to.eq('jwt-token-value');
      expect(cookie.secure).to.be.true;
      expect(cookie.httpOnly).to.be.true;
      expect(cookie.sameSite).to.eq('lax');
    });
  });
});
