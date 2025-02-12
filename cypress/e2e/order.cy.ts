describe('create an order', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('signup');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.visit('http://localhost:4000/');
  });

  it('make an order, close order modal and reset constructor', () => {
    cy.getByData('bun-ingredient').contains('Добавить').click();
    cy.getByData('main-ingredient').contains('Добавить').click();
    cy.getByData('sauce-ingredient').contains('Добавить').click();
    cy.wait('@signup');
    cy.contains('Оформить заказ').click();
    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ]
      });
    cy.get('#modals').contains('123456').should('exist');
    cy.get('#modals').find('button').click();
    cy.contains('идентификатор заказа').should('not.exist');
    cy.getByData('ingredientItem').should('not.exist');
  });
});
