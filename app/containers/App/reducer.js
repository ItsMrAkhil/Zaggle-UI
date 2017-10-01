/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CHANGE_SEARCH_TEXT,
  CHANGE_FILTER,
} from './constants';

const initialState = fromJS({
  searchText: '',
  filters: {
    cuisine: '',
    city: 'Hyderabad',
    location: '',
    constForTwo: '',
  },
});

function appReducer(state = initialState, { type, payload }) {
  switch (type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_SEARCH_TEXT:
      return state.set('searchText', payload);
    case CHANGE_FILTER:
      return state
        .setIn(['filters', payload.prop], fromJS(payload.value));
    default:
      return state;
  }
}

export default appReducer;
