import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { login, logout, setUser, userRegister, updateUser } from './action';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthCheked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(setUser, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  }
});

export const { setIsAuthCheked } = userSlice.actions;
export const { getUser, getIsAuthChecked } = userSlice.selectors;

type TActionCreators = typeof userSlice.actions;
export type TInternalActions = ReturnType<
  TActionCreators[keyof TActionCreators]
>;
