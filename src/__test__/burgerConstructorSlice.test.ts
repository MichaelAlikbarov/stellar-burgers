import {
  addIngredient,
  burgerConstructorSlice,
  downIngredient,
  initialState,
  removeIngredient,
  upIngredient
} from '../services/burgerConstructor/slice';
import {
  mockIngredients,
  sortedIngredientsDown,
  sortedIngredientsInitial,
  sortedIngredientsUp
} from './mockData';

describe('check the work burgerConstructorslice', () => {
  it('add ingredients', () => {
    const expectedState = {
      ...initialState,
      ingredients: [mockIngredients[0]]
    };
    const actualState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(mockIngredients[0])
    );
    expect(actualState.ingredients[0]).toEqual({
      ...expectedState.ingredients[0],
      id: expect.any(String)
    });
  });

  it('remove ingredient', () => {
    const state = {
      bun: null,
      ingredients: [{ ...mockIngredients[0], id: '1' }]
    };
    const expectedState = burgerConstructorSlice.reducer(
      state,
      removeIngredient(0)
    );
    expect(expectedState.ingredients).toHaveLength(0);
  });

  it('sorted ingredients', () => {
    const arrayIngredients = sortedIngredientsInitial.map((item, index) => {
      const ingredients = { ...item, id: index.toString() };
      return ingredients;
    });

    const state = {
      bun: null,
      ingredients: arrayIngredients
    };
    const expectedStateUp = burgerConstructorSlice.reducer(
      state,
      upIngredient(1)
    );

    expect(expectedStateUp.ingredients).toEqual(sortedIngredientsUp);

    const expectedStateDown = burgerConstructorSlice.reducer(
      state,
      downIngredient(1)
    );

    expect(expectedStateDown.ingredients).toEqual(sortedIngredientsDown);
  });
});
