/*
 *
 * RestaurantPage actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_RESTAURANT_DETAILS,
  FETCH_RESTAURANT_DETAILS_ERROR,
  FETCH_RESTAURANT_DETAILS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchRestaurantDetails(restaurantId) {
  return {
    type: FETCH_RESTAURANT_DETAILS,
    payload: restaurantId,
  };
}

export function fetchRestaurantDetailsError(response) {
  return {
    type: FETCH_RESTAURANT_DETAILS_ERROR,
    payload: response,
  };
}

export function fetchRestaurantDetailsSuccess(response) {
  return {
    type: FETCH_RESTAURANT_DETAILS_SUCCESS,
    payload: response,
  };
}
