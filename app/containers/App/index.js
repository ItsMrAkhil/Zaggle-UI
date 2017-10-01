import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, NavLink } from 'react-router-dom';
import { Container, Image, Menu } from 'semantic-ui-react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import HomePage from 'containers/HomePage/Loadable';
import RestaurantPage from 'containers/RestaurantPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import reducer from './reducer';
import saga from './saga';
import { makeSelectSearchText, makeSelectLocation } from './selectors';
import { changeSearchText, searchRestaurants } from './actions';

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};

export function App({ searchText, onChangeSearchText, onSearch, location }) {
  return (
    <div>
      <Menu
        borderless
        style={fixedMenuStyle}
      >
        <Container>
          <Menu.Item>
            <Image size="mini" src="https://www.zaggle.in/assets/images/zaggle_testimonial_img.png" />
          </Menu.Item>
          <Menu.Item header > <NavLink to="/">Zaggle UI</NavLink></Menu.Item>
          <Menu.Menu position="right">
            <form
              onSubmit={(evt) => {
                onSearch(evt);
                onChangeSearchText();
              }}
              className="ui right aligned category search item"
            >
              <div className="ui transparent icon input">
                <input onChange={onChangeSearchText} value={searchText} className="prompt" type="text" placeholder="Search for restaurants" />
                <button style={{ border: 'none' }} >
                  <i className="search link icon" />
                </button>
              </div>
              <div className="results" />
            </form>
          </Menu.Menu>
        </Container>
      </Menu>
      <Container style={{ paddingTop: '1em' }}>
        <Switch location={location}>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/:restaurantId" component={RestaurantPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </div>
  );
}

App.propTypes = {
  searchText: PropTypes.string.isRequired,
  onChangeSearchText: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  searchText: makeSelectSearchText(),
  location: makeSelectLocation(),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onChangeSearchText: (evt) => dispatch(changeSearchText(evt ? evt.target.value : '')),
    onSearch: (evt) => {
      if (evt && evt.preventDefault) { evt.preventDefault(); }
      ownProps.history.push('/');
      dispatch(searchRestaurants(true));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(App);
