describe('JWT Token Handling', () => {
  let accessToken;

  before(() => {
    cy.request({
      method: 'POST',
      url: 'https://dummyjson.com/auth/login',
      body: {
        username: 'emilys',
        password: 'emilyspass',
        expiresInMins: 30
      }
    }).then((response) => {
      expect(response.status).to.eq(200);

      accessToken = response.body.accessToken;

      expect(accessToken).to.exist;
      cy.log(`Token generated: ${accessToken}`);
    });
  });

  it('gets the authenticated user', () => {
    cy.request({
      method: 'GET',
      url: 'https://dummyjson.com/auth/me',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.username).to.eq('emilys');
    });
  });
});