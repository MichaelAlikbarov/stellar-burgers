import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumber, getOrders, newOrder } from './action';

export type TOrderData = {
  order: TOrder | null;
  isOrderStatus: boolean;
  userOrders: TOrder[];
  orderByNumber: TOrder | null;
};
export const initialState: TOrderData = {
  order: null,
  isOrderStatus: false,
  userOrders: [],
  orderByNumber: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.isOrderStatus = false;
    }
  },
  selectors: {
    orderData: (state) => state.order,
    isOrderStatus: (state) => state.isOrderStatus,
    userOrders: (state) => state.userOrders,
    orderByNumber: (state) => state.orderByNumber
  },
  extraReducers: (builder) => {
    builder
      .addCase(newOrder.pending, (state) => {
        state.isOrderStatus = true;
      })
      .addCase(newOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.isOrderStatus = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderByNumber = action.payload.orders[0];
      });
  }
});

export const { orderData, isOrderStatus, orderByNumber, userOrders } =
  orderSlice.selectors;
export const { resetOrder } = orderSlice.actions;
