/*
 *
 * HomePage actions
 *
 */

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

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchCuisines() {
  return {
    type: FETCH_CUISINES,
  };
}

export function fetchCuisinesSuccess(response) {
  return {
    type: FETCH_CUISINES_SUCCESS,
    payload: response,
  };
}


export function fetchCuisinesError() {
  return {
    type: FETCH_CUISINES_ERROR,
  };
}

export function fetchLocations() {
  return {
    type: FETCH_LOCATIONS,
  };
}

export function fetchLocationsSuccess(response) {
  return {
    type: FETCH_LOCATIONS_SUCCESS,
    payload: response,
  };
}

export function fetchLocationsError() {
  return {
    type: FETCH_LOCATIONS_ERROR,
  };
}

export function fetchRestaurantsErr() {
  return {
    type: FETCH_RESTAURANTS_ERROR,
  };
}

export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    payload: page,
  };
}

export function fetchRestaurantsSuccess(response) {
  let merchants = [];
  let total = 0;
  if (response.merchant_data) {
    merchants = response.merchant_data;
    total = response.total_merchants;
  } else if (response.search_data && response.search_data.merchants) {
    merchants = response.search_data.merchants;
    total = response.search_data.total_merchants;
  }
  return {
    type: FETCH_RESTAURANTS_SUCCESS,
    payload: { merchants, total },
  };
}
