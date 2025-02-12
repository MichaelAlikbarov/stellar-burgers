import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeeds } from './action';

export type TOrdersDataStatus = {
  success: boolean;
};

export const initialState: TOrdersData = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    ordersSelector: (state) => state.orders,
    totalSelector: (state) => state.total,
    totalTodaySelector: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state;
      })
      .addCase(
        getFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          const { orders, total, totalToday } = action.payload;
          state.orders = orders;
          state.total = total;
          state.totalToday = totalToday;
        }
      );
  }
});

export const { ordersSelector, totalSelector, totalTodaySelector } =
  feedSlice.selectors;
