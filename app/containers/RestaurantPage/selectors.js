import { createSelector } from 'reselect';

/**
 * Direct selector to the restaurantPage state domain
 */
const selectRestaurantPageDomain = (state) => state.get('restaurantPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RestaurantPage
 */

const makeSelectRestaurantPage = () => createSelector(
  selectRestaurantPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectRestaurantPage;
export {
  selectRestaurantPageDomain,
};
