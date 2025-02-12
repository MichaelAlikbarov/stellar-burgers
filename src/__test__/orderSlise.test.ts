import { getOrders } from '../services/order/action';
import { initialState, orderSlice } from '../services/order/slice';

const mockUserOrders = [
  {
    _id: '67ac9f9f133acd001be506ce',
    status: 'done',
    name: 'Флюоресцентный фалленианский люминесцентный бургер',
    createdAt: '2025-02-12T13:18:23.468Z',
    updatedAt: '2025-02-12T13:18:24.179Z',
    number: 68251,
    ingredients: []
  }
];

describe('test orderSlice', () => {
  it('getOrders pending', () => {
    const expectedState = { ...initialState };

    const actualState = orderSlice.reducer(undefined, {
      initialState,
      type: getOrders.pending.type,
      requestStatus: 'pending'
    });

    expect(actualState).toEqual(expectedState);
  });

  it('getOrders fulfilled', () => {
    const expectedState = {
      ...initialState,
      userOrders: mockUserOrders
    };

    const actualState = orderSlice.reducer(
      initialState,
      getOrders.fulfilled(mockUserOrders, '')
    );

    expect(actualState).toEqual(expectedState);
  });

  it('getOrders rejected', () => {
    const expectedState = { ...initialState };

    const actualState = orderSlice.reducer(undefined, {
      type: getOrders.rejected.type,
      requestStatus: 'rejected'
    });

    expect(actualState).toEqual(expectedState);
  });
});
