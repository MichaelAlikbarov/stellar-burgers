import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { resetConstructor } from '../burgerConstructor/slice';
import { useDispatch } from '../store';

export const newOrder = createAsyncThunk(
  'order/postOrder',
  async (orderData: string[]) => await orderBurgerApi(orderData)
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    const res = await getOrderByNumberApi(number);
    return res;
  }
);

export const getOrders = createAsyncThunk('order/getOrders', getOrdersApi);
