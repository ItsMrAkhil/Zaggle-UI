/*
 *
 * HomePage actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_SEARCH_TEXT,
  SEARCH_RESTAURANTS,
  CHANGE_FILTER,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeSearchText(text) {
  return {
    type: CHANGE_SEARCH_TEXT,
    payload: text,
  };
}

export function searchRestaurants(withText) {
  return {
    type: SEARCH_RESTAURANTS,
    withText,
  };
}

export function changeFilter(prop, value) {
  return {
    type: CHANGE_FILTER,
    payload: { prop, value },
  };
}
