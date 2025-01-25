import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const newOrder = createAsyncThunk(
  'order/postOrder',
  async (orderData: string[]) => {
    const res = await orderBurgerApi(orderData);
    return res;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    const res = await getOrderByNumberApi(number);
    return res;
  }
);

export const getOrders = createAsyncThunk('order/getOrders', async () => {
  const res = await getOrdersApi();
  return res;
});
