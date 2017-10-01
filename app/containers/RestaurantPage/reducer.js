/*
 *
 * RestaurantPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  FETCH_RESTAURANT_DETAILS,
  FETCH_RESTAURANT_DETAILS_ERROR,
  FETCH_RESTAURANT_DETAILS_SUCCESS,
} from './constants';

const initialState = fromJS({
  restautantDetails: {},
});

function restaurantPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_RESTAURANT_DETAILS:
      return state
        .set('restaurantId', action.payload)
        .set('fetchingDetails', true);
    case FETCH_RESTAURANT_DETAILS_ERROR:
      return state
        .set('fetchingDetails', false);
    case FETCH_RESTAURANT_DETAILS_SUCCESS:
      return state
        .set('restautantDetails', fromJS(action.payload.merchant_data))
        .set('fetchingDetails', false);
    default:
      return state;
  }
}

export default restaurantPageReducer;
