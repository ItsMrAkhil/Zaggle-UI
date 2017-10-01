/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Pagination } from 'react-bootstrap';
import { Grid, Card, Segment, Loader, Dimmer, Image, Message } from 'semantic-ui-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import FilterDropdown from './FilterDropdown';
import Restaurant from './Restaurant';
import { makeSelectFilters } from '../App/selectors';
import makeSelectHomePage, {
  makeSelectCuisines, selectCities, makeSelectLocations,
} from './selectors';
import { changeFilter, searchRestaurants } from '../App/actions';
import { fetchCuisines, fetchLocations, changePage } from './actions';
import reducer from './reducer';
import saga from './saga';

export class HomePage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.renderRestaurants = this.renderRestaurants.bind(this);
  }

  componentDidMount() {
    const { cuisines, onFetchCuisines, onFetchLocations, onSearchRestaurants } = this.props;
    if (cuisines.length === 1) {
      onFetchCuisines();
    }
    onFetchLocations();
    onSearchRestaurants();
  }

  renderRestaurants() {
    const { restaurants, fetchingRestaurants } = this.props.homepage;
    if (!restaurants.length && !fetchingRestaurants) {
      return <Message color="red">No restaurants found with given filters.</Message>;
    }
    const restaurantsComponents = restaurants.map((restaurant) => {
      const { merchant_id: id } = restaurant;
      return (
        <Restaurant
          key={id}
          {...restaurant}
        />
      );
    });
    if (fetchingRestaurants) {
      return (
        <Segment>
          <Dimmer active>
            <Loader size="large">Loading</Loader>
          </Dimmer>
          <Image src="https://res.cloudinary.com/dzfragjmc/image/upload/v1506830707/paragraph_k2wgsk.png" />
        </Segment >
      );
    }
    return (
      <Card.Group itemsPerRow={3}>
        {restaurantsComponents}
      </Card.Group>
    );
  }

  render() {
    const sortBy = [
      { text: 'All price range', value: '' },
      { text: '₹ 0 - 500', value: '0-500' },
      { text: '₹₹ 500 - 1000', value: '500-1000' },
      { text: '₹₹₹ 1000 - 2000', value: '1000-2000' },
      { text: '₹₹₹₹ 2000 +', value: '2000+' },
    ];
    const { homepage: { fetchingCuisines, fetchingLocations, total, page }, cuisines, onChangeFilter, cities, filters, locations, onFetchLocations, onSearchRestaurants, onPageChange } = this.props;
    return (
      <div>
        <Helmet>
          <title>Zaggle - Home Page</title>
          <meta name="description" content="Home page for the new update front-end build on top of react." />
        </Helmet>
        <Grid columns={4} divided>
          <Grid.Row>
            <FilterDropdown
              placeholder="City"
              options={cities}
              onChange={(e, { value }) => {
                onChangeFilter('city', value);
                onChangeFilter('locations', '');
                onFetchLocations();
                onSearchRestaurants();
              }}
              value={filters.city}
            />
            <FilterDropdown
              placeholder="Location"
              options={locations}
              loading={fetchingLocations}
              disabled={fetchingLocations}
              onChange={(e, { value }) => {
                onChangeFilter('location', value);
                onSearchRestaurants();
              }}
              value={filters.location}
            />
            <FilterDropdown
              placeholder="Cuisines Filter"
              disabled={fetchingCuisines}
              loading={fetchingCuisines}
              options={cuisines}
              onChange={(e, { value }) => {
                onChangeFilter('cuisine', value);
                onSearchRestaurants();
              }}
              value={filters.cuisine}
            />
            <FilterDropdown
              placeholder="Sorty by Cost Per Two"
              options={sortBy}
              onChange={(e, { value }) => {
                onChangeFilter('constForTwo', value);
                onSearchRestaurants();
              }}
            />
          </Grid.Row>
        </Grid>
        {this.renderRestaurants()}
        <center>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            items={Math.ceil(total / 12)}
            maxButtons={5}
            activePage={page}
            onSelect={onPageChange}
          />
        </center>
      </div >
    );
  }
}

HomePage.propTypes = {
  onFetchCuisines: PropTypes.func.isRequired,
  cuisines: PropTypes.arrayOf(PropTypes.object).isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  cities: PropTypes.arrayOf(PropTypes.object).isRequired,
  filters: PropTypes.shape({
    city: PropTypes.string,
    cuisine: PropTypes.string,
  }).isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  homepage: PropTypes.object,
  onFetchLocations: PropTypes.func.isRequired,
  onSearchRestaurants: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homepage: makeSelectHomePage(),
  cuisines: makeSelectCuisines(),
  locations: makeSelectLocations(),
  cities: selectCities,
  filters: makeSelectFilters(),
});

function mapDispatchToProps(dispatch) {
  return {
    onFetchCuisines: () => dispatch(fetchCuisines()),
    onChangeFilter: (prop, value) => dispatch(changeFilter(prop, value)),
    onFetchLocations: () => dispatch(fetchLocations()),
    onSearchRestaurants: () => dispatch(searchRestaurants()),
    onPageChange: (page) => dispatch(changePage(page)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
