describe('check the work of modal windows', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('http://localhost:4000/');
  });

  it('opening the ingredient modal window', () => {
    cy.getByData('main-ingredient').find('li').first().click();
    cy.get('#modals')
      .find('h3')
      .first()
      .should('have.text', 'Детали ингридиента');
  });

  it('closing by clicking on the cross', () => {
    cy.getByData('main-ingredient').find('li').first().click();
    cy.get('#modals').find('button').click();
    cy.get('#modals').find('h3').should('not.exist');
  });

  it('closing by clicking on the overlay', () => {
    cy.getByData('main-ingredient').find('li').first().click();
    cy.getByData('modal-overlay').click('left', { force: true });
    cy.get('#modals').find('h3').should('not.exist');
  });
});
