import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';

import { FETCH_RESTAURANT_DETAILS } from './constants';
import { fetchRestaurantDetailsError, fetchRestaurantDetailsSuccess } from './actions';
import makeSelectRestaurantPage from './selectors';


// get locations based on city
export function* getRestaurantDetails() {
  const { restaurantId } = yield select(makeSelectRestaurantPage());
  const requestURL = '/api/services/get_restaurant_data';
  try {
    // Call our request helper (see 'utils/request')
    const locations = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'websocket',
      body: JSON.stringify({ merchant_id: restaurantId }),
    });
    yield put(fetchRestaurantDetailsSuccess(locations));
  } catch (err) {
    yield put(fetchRestaurantDetailsError(err));
  }
}

// Root sagas for HomePage
export default function* rootSaga() {
  yield [
    takeLatest(FETCH_RESTAURANT_DETAILS, getRestaurantDetails),
  ];
}
