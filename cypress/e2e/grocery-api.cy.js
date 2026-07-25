describe('Grocery Order API Flow', () => {
  const baseUrl = 'https://simple-grocery-store-api.click';

  let accessToken;
  let productId;
  let cartId;
  let orderId;

  it('Creates, updates and deletes an order', () => {
    // 1. Register API client
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api-clients`,
      body: {
        clientName: 'Gayathri Cypress Client',
        clientEmail: `gayathri.${Date.now()}@example.com`,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      accessToken = response.body.accessToken;
    });

    // 2. Get one available product
    cy.request({
      method: 'GET',
      url: `${baseUrl}/products`,
      qs: {
        available: true,
        results: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      productId = response.body[0].id;
    });

    // 3. Create a cart
    cy.request({
      method: 'POST',
      url: `${baseUrl}/carts`,
    }).then((response) => {
      expect(response.status).to.eq(201);
      cartId = response.body.cartId;
    });

    // 4. Add product to cart
    cy.then(() => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/carts/${cartId}/items`,
        body: {
          productId: productId,
          quantity: 2,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });

    // 5. Create order
    cy.then(() => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/orders`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: {
          cartId: cartId,
          customerName: 'Gayathri Nair',
          comment: 'Created using Cypress',
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        orderId = response.body.orderId;
      });
    });

    // 6. Update order
    cy.then(() => {
      cy.request({
        method: 'PATCH',
        url: `${baseUrl}/orders/${orderId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: {
          customerName: 'Gayathri Ramachandran Nair',
          comment: 'Updated using Cypress',
        },
      }).then((response) => {
        expect(response.status).to.eq(204);
      });
    });

    // 7. Delete order
    cy.then(() => {
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/orders/${orderId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(204);
      });
    });
  });
});