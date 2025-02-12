import { login, userRegister } from '../services/user/action';
import {
  initialState,
  setIsAuthCheked,
  userSlice
} from '../services/user/slice';

//user для регистрации
const mockUserRegistrData = {
  name: 'testUser',
  email: 'test@mail.com',
  password: 'password'
};

const userTestData = {
  name: 'userName',
  email: 'test@mail.com'
};

const mockAuthUserData = {
  success: true,
  user: userTestData,
  refreshToken: 'test-refreshToken',
  accessToken: 'test-accessToken'
};

const mockLoginData = {
  password: 'password',
  email: 'test@mail.com'
};

describe('test userSlice', () => {
  it('authorization check', () => {
    const expectedState = {
      ...initialState,
      isAuthChecked: true
    };

    const actualState = userSlice.reducer(initialState, setIsAuthCheked(true));
    expect(actualState).toEqual(expectedState);
  });

  it('test userRegister', () => {
    const expectedState = {
      ...initialState,
      user: userTestData
    };

    const actualState = userSlice.reducer(
      initialState,
      userRegister.fulfilled(mockAuthUserData, '', mockUserRegistrData)
    );
    expect(actualState).toEqual(expectedState);
  });

  it('test userRegister rejected', () => {
    const expectedState = {
      ...initialState,
      user: null
    };

    const actualState = userSlice.reducer(undefined, {
      type: userRegister.rejected.type,
      payload: { message: 'Email, password and name are required fields' }
    });
    expect(actualState).toEqual(expectedState);
  });

  it('test login', () => {
    const expectedState = {
      ...initialState,
      user: userTestData,
      isAuthChecked: true
    };

    const actualState = userSlice.reducer(
      initialState,
      login.fulfilled(mockAuthUserData, '', mockLoginData)
    );
    expect(actualState).toEqual(expectedState);
  });
});
