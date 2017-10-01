import { createSelector } from 'reselect';

const selectRoute = (state) => state.get('route');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

const selectApp = (state) => state.get('app');

const makeSelectSearchText = () => createSelector(
  selectApp,
  (appState) => appState.get('searchText')
);

const makeSelectFilters = () => createSelector(
  selectApp,
  (appState) => appState.get('filters').toJS()
);

export {
  makeSelectLocation,
  makeSelectSearchText,
  makeSelectFilters,
};
