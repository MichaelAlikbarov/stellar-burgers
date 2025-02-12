import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  TLoginData,
  logoutApi,
  getUserApi,
  registerUserApi,
  updateUserApi,
  TRegisterData
} from '@api';
import { TUser } from '@utils-types';
import { setIsAuthCheked } from './slice';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export const login = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData) => {
    const data = await loginUserApi(loginData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  const logout = await logoutApi();
  localStorage.clear();
  deleteCookie('accessToken');
  return logout;
});

export const setUser = createAction<TUser | null, 'user/setUser'>(
  'user/setUser'
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      await getUserApi()
        .then((user) => {
          dispatch(setUser(user.user));
        })
        .finally(() => dispatch(setIsAuthCheked(true)));
    } else {
      dispatch(setIsAuthCheked(true));
    }
  }
);
export const userRegister = createAsyncThunk(
  'user/register',
  async (userData: TRegisterData) => {
    const regData = await registerUserApi(userData);
    setCookie('accessToken', regData.accessToken);
    localStorage.setItem('refreshToken', regData.refreshToken);
    return regData;
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => {
    const userData = await updateUserApi(user);
    return userData;
  }
);

export type TExternalActions = ReturnType<typeof setUser>;
