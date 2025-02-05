import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

export type TBurgerConstructor = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TBurgerConstructor = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeIngredient: (state, { payload }: PayloadAction<number>) => {
      state.ingredients.splice(payload, 1);
    },
    upIngredient: (state, action: PayloadAction<number>) => {
      const array = state.ingredients;
      const index = action.payload;
      array.splice(index - 1, 0, array.splice(index, 1)[0]);
    },
    downIngredient: (state, action: PayloadAction<number>) => {
      const array = state.ingredients;
      const index = action.payload;
      array.splice(index + 1, 0, array.splice(index, 1)[0]);
    },
    resetConstructor: (state) => {
      state.ingredients = [];
      state.bun = null;
    }
  },
  selectors: {
    burgerConstructorSelector: (state) => state,
    orderBun: (state) => state.bun
  }
});

export const {
  addIngredient,
  removeIngredient,
  upIngredient,
  downIngredient,
  resetConstructor
} = burgerConstructorSlice.actions;

export const { burgerConstructorSelector, orderBun } =
  burgerConstructorSlice.selectors;
