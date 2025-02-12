import { getIngredients } from '../services/ingredients/action';
import { ingredientsSlice, initialState } from '../services/ingredients/slice';
import { mockIngredients } from './mockData';

describe('check the work ingredientsSlice', () => {
  it('getIngredients pending', () => {
    const expectedState = {
      ...initialState,
      isIngredientsLoading: true
    };
    const actualState = ingredientsSlice.reducer(
      initialState,
      getIngredients.pending('')
    );
    expect(actualState).toEqual(expectedState);
  });

  it('getIngredient fulfilled', () => {
    const expectedState = {
      ingredients: mockIngredients,
      isIngredientsLoading: false,
      error: null
    };
    const actualState = ingredientsSlice.reducer(
      initialState,
      getIngredients.fulfilled(mockIngredients, '')
    );
    expect(actualState).toEqual(expectedState);
  });

  it('getIngredients rejected', () => {
    const expectedState = {
      ingredients: [],
      isIngredientsLoading: false,
      error: 'Ошибка: данные не получены'
    };
    const actualState = ingredientsSlice.reducer(
      initialState,
      getIngredients.rejected(new Error('Ошибка: данные не получены'), '')
    );
    expect(actualState).toEqual(expectedState);
  });
});
