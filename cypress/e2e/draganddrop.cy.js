describe('Test case 11: Drag and Drop Feature', () => {
  it('Drag an item to a drop target', () => {
    cy.visit('https://testautomationpractice.blogspot.com/');

    //Step 1: Navigate to the drag-and-drop section. 
    cy.get('#draggable')
      .should('be.visible');

    cy.get('#droppable')
      .should('be.visible')
      .and('contain.text', 'Drop here');

    //Step 2: Drag the source element. 
    cy.get('#draggable')
      .trigger('mousedown',{which: 1});

    //Step 3 : Drop it onto the target area. 
    cy.get('#droppable')
      .trigger('mousemove')
      .trigger('mouseup', { force: true });

    //Step 4. Verify the drop success message is displayed.
    cy.get('#droppable')
      .should('contain.text', 'Dropped!');
  });
});
