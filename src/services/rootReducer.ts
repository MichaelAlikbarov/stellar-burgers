import { combineSlices } from '@reduxjs/toolkit';
import { userSlice } from './user/slice';
import { ingredientsSlice } from './ingredients/slice';
import { burgerConstructorSlice } from './burgerConstructor/slice';
import { feedSlice } from './feed/slice';
import { orderSlice } from './order/slice';

export const rootReducer = combineSlices({
  user: userSlice.reducer,
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  feed: feedSlice.reducer,
  order: orderSlice.reducer
});
