
import { fromJS } from 'immutable';
import restaurantPageReducer from '../reducer';

describe('restaurantPageReducer', () => {
  it('returns the initial state', () => {
    expect(restaurantPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
