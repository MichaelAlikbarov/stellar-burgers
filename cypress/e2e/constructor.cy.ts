describe('get ingredient data', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('http://localhost:4000/');
  });

  it('add ingredients from the list to the constructor', () => {
    cy.wait('@getIngredients');
    cy.getByData('ingredientItem').should('not.exist');

    cy.getByData('bun-ingredient').contains('Добавить').click();
    cy.getByData('bun-list').should('exist');
    cy.getByData('main-ingredient').contains('Добавить').click();
    cy.getByData('sauce-ingredient').contains('Добавить').click();
    cy.getByData('ingredientItem').should('exist');
  });
});
