import { createSelector } from 'reselect';
import { uniqBy } from 'lodash';

/**
 * Direct selector to the homePage state domain
 */
const selectHomePageDomain = (state) => state.get('homePage');

/**
 * Other specific selectors
 */

const selectCities = () => [
  {
    latitude: 17.4122998,
    longitude: 78.2679572,
    city: 'Hyderabad',
    value: 'Hyderabad',
    text: 'Hyderabad',
  },
  {
    latitude: 18.5245649,
    longitude: 73.7228791,
    city: 'Pune',
    value: 'Pune',
    text: 'Pune',
  },
  {
    latitude: 19.0827699,
    longitude: 72.7411159,
    city: 'Mumbai',
    value: 'Mumbai',
    text: 'Mumbai',
  },
];


/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () => createSelector(
  selectHomePageDomain,
  (substate) => substate.toJS()
);

const makeSelectCuisines = () => createSelector(
  selectHomePageDomain,
  (substate) => {
    const cusines = substate.get('cuisines').toJS();
    let cusinesFilter = [];
    if (cusines && cusines.length) {
      cusinesFilter = cusines.map((cusine) => ({
        text: cusine,
        value: cusine,
      }));
    }
    cusinesFilter.unshift({ text: 'All Cuisines', value: '' });
    return cusinesFilter;
  }
);

const makeSelectLocations = () => createSelector(
  selectHomePageDomain,
  (substate) => {
    const locations = substate.get('locations').toJS();
    let locationsFilter = [];
    if (locations && locations.length) {
      locationsFilter = locations.map(({ location }) => ({
        text: location,
        value: location,
      }));
    }
    locationsFilter.unshift({ text: 'All Locations', value: '' });
    return uniqBy(locationsFilter, 'value');
  }
);

export default makeSelectHomePage;
export {
  selectHomePageDomain,
  selectCities,
  makeSelectCuisines,
  makeSelectLocations,
};
