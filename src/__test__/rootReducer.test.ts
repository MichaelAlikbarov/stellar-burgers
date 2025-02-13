import { userSlice } from '../services/user/slice';
import { rootReducer } from '../services/rootReducer';
import { ingredientsSlice } from '../services/ingredients/slice';
import { burgerConstructorSlice } from '../services/burgerConstructor/slice';
import { feedSlice } from '../services/feed/slice';
import { orderSlice } from '../services/order/slice';

describe('should return the initial state rootReducer', () => {
  it('initialize the correct state', () => {
    const initialAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initialAction);
    expect(state).toEqual({
      user: userSlice.reducer(undefined, initialAction),
      ingredients: ingredientsSlice.reducer(undefined, initialAction),
      burgerConstructor: burgerConstructorSlice.reducer(
        undefined,
        initialAction
      ),
      feed: feedSlice.reducer(undefined, initialAction),
      order: orderSlice.reducer(undefined, initialAction)
    });
  });
});
