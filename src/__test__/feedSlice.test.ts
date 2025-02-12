import { getFeeds } from '../services/feed/action';
import { feedSlice, initialState } from '../services/feed/slice';
import { feedMockData } from './mockData';

describe('check the work feedSlice', () => {
  it('getFeeds pending', () => {
    const expectedState = {
      ...initialState
    };
    const actualState = feedSlice.reducer(initialState, getFeeds.pending(''));
    expect(actualState).toEqual(expectedState);
  });

  it('getFeeds fulfilled', () => {
    const expectedState = {
      orders: feedMockData.orders,
      total: feedMockData.total,
      totalToday: feedMockData.totalToday
    };
    const actualState = feedSlice.reducer(
      initialState,
      getFeeds.fulfilled(feedMockData, '')
    );

    expect(actualState).toEqual(expectedState);
  });
});
