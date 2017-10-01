/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  FETCH_CUISINES,
  FETCH_CUISINES_ERROR,
  FETCH_CUISINES_SUCCESS,
  FETCH_LOCATIONS,
  FETCH_LOCATIONS_ERROR,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_RESTAURANTS_ERROR,
  FETCH_RESTAURANTS_SUCCESS,
  CHANGE_PAGE,
} from './constants';
import { SEARCH_RESTAURANTS } from '../App/constants';

const initialState = fromJS({
  fetchingCuisines: false,
  cuisines: [],
  locations: [],
  restaurants: [],
  firstOffset: 0,
  lastOffset: 12,
  page: 1,
  total: 1,
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_CUISINES:
      return state
        .set('fetchingCuisines', true);
    case FETCH_CUISINES_SUCCESS:
      return state
        .set('cuisines', fromJS(action.payload.cuisines))
        .set('fetchingCuisines', false);
    case FETCH_CUISINES_ERROR:
      return state
        .set('fetchingCuisines', false);
    case FETCH_LOCATIONS:
      return state
        .set('fetchingLocations', true);
    case FETCH_LOCATIONS_SUCCESS:
      return state
        .set('locations', fromJS(action.payload.locations))
        .set('fetchingLocations', false);
    case FETCH_LOCATIONS_ERROR:
      return state
        .set('fetchingLocations', false);
    case SEARCH_RESTAURANTS:
      return state
        .set('firstOffset', 0)
        .set('lastOffset', 12)
        .set('page', 1)
        .set('fetchingRestaurants', true);
    case FETCH_RESTAURANTS_SUCCESS:
      return state
        .set('restaurants', fromJS(action.payload.merchants))
        .set('total', action.payload.total)
        .set('fetchingRestaurants', false);
    case FETCH_RESTAURANTS_ERROR:
      return state
        .set('fetchingRestaurants', false);
    case CHANGE_PAGE:
      return state
        .set('lastOffset', 12)
        .set('page', action.payload)
        .set('fetchingRestaurants', true)
        .set('firstOffset', (action.payload - 1) * 12);
    default:
      return state;
  }
}

export default homePageReducer;
