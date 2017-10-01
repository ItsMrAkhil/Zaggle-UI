import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { filter } from 'lodash';

import { SEARCH_RESTAURANTS } from '../App/constants';
import { FETCH_CUISINES, FETCH_LOCATIONS, CHANGE_PAGE } from './constants';
import {
  fetchCuisinesError, fetchCuisinesSuccess,
  fetchLocationsError, fetchLocationsSuccess,
  fetchRestaurantsErr, fetchRestaurantsSuccess,
} from './actions';
import { makeSelectFilters, makeSelectSearchText } from '../App/selectors';
import makeSelectHomePage, { selectCities } from './selectors';

// Get all cuisines
export function* getCuisines() {
  const requestURL = 'https://mobile-api.zaggle.in/api/services/cuisines';

  try {
    // Call our request helper (see 'utils/request')
    const cuisines = yield call(request, requestURL);
    yield put(fetchCuisinesSuccess(cuisines));
  } catch (err) {
    yield put(fetchCuisinesError(err));
  }
}

// get locations based on city
export function* getLocations() {
  // select city from App filters
  const { city } = yield select(makeSelectFilters());
  const citiesDetails = selectCities();
  const cityDetails = { city };
  citiesDetails.forEach((cityInstance) => {
    if (cityInstance.city === city) {
      cityDetails.latitude = cityInstance.latitude;
      cityDetails.longitude = cityInstance.longitude;
    }
  });
  const requestURL = '/api/webservices/locations';
  try {
    // Call our request helper (see 'utils/request')
    const locations = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'websocket',
      body: JSON.stringify(cityDetails),
    });
    yield put(fetchLocationsSuccess(locations));
  } catch (err) {
    yield put(fetchLocationsError(err));
  }
}

export function* getRestaurants({ withText }) {
  let requestURL = 'api/webservices/merchant_filters';
  const { city, cuisine, location, constForTwo: cost_for_two } = yield select(makeSelectFilters());
  const keyword = yield select(makeSelectSearchText());
  const { firstOffset: first_offset, lastOffset: last_offset } = yield select(makeSelectHomePage());
  if (keyword && withText) {
    requestURL = 'api/services/get_search_merchants';
  }
  const { locations } = yield select(makeSelectHomePage());
  const citiesDetails = selectCities();
  const cityDetails = { city };
  citiesDetails.forEach((cityInstance) => {
    if (cityInstance.city === city) {
      cityDetails.latitude = cityInstance.latitude;
      cityDetails.longitude = cityInstance.longitude;
    }
  });
  let locationDetails = {};
  if (location) {
    locationDetails = filter(locations, { location })[0];
    locationDetails.locations = [`"${location}"`];
  }
  const filterDetails = {
    sort: 'near_me',
    first_offset,
    last_offset,
    cost_for_two,
    cuisine,
    cuisines: cuisine ? [`"${cuisine}"`] : '',
    ...cityDetails,
    ...locationDetails,
    keyword: (withText && keyword ? keyword : ''),
    get_type: keyword ? 'explore' : '',
  };
  try {
    const restaurants = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'websocket',
      body: JSON.stringify(filterDetails),
    });
    yield put(fetchRestaurantsSuccess(restaurants));
  } catch (err) {
    yield put(fetchRestaurantsErr(err));
  }
}

// Root sagas for HomePage
export default function* rootSaga() {
  yield [
    takeLatest(SEARCH_RESTAURANTS, getRestaurants),
    takeLatest(CHANGE_PAGE, getRestaurants),
    takeLatest(FETCH_CUISINES, getCuisines),
    takeLatest(FETCH_LOCATIONS, getLocations),
  ];
}
