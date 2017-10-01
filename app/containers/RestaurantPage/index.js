/**
 *
 * RestaurantPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Segment, Dimmer, Loader, Image, Breadcrumb, Grid, Tab } from 'semantic-ui-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectRestaurantPage from './selectors';
import { fetchRestaurantDetails } from './actions';
import reducer from './reducer';
import saga from './saga';
import IntroCard from './IntroCard';
import DealsTab from './DealsTab';
import MenuTab from './MenuTab';
import InfoTab from './InfoTab';
import ImageCarousel from './Images';

export class RestaurantPage extends React.PureComponent {

  componentDidMount() {
    const { onFetchRestaurantDetails, match: { params: { restaurantId } } } = this.props;
    onFetchRestaurantDetails(restaurantId);
  }

  render() {
    const { restaurantpage: { restautantDetails, fetchingDetails } } = this.props;
    const { merchant_name } = restautantDetails;
    const panes = [
      {
        menuItem: 'ALL DEALS',
        render: () => (
          <Tab.Pane attached={false}><DealsTab {...restautantDetails} /></Tab.Pane>
        ),
      },
      {
        menuItem: 'MENU',
        render: () => (
          <Tab.Pane attached={false}><MenuTab {...restautantDetails} /></Tab.Pane>
        ),
      },
      { menuItem: 'INFORMATION',
        render: () => (
          <Tab.Pane attached={false}><InfoTab {...restautantDetails} /></Tab.Pane>
        ),
      },
      { menuItem: 'REVIEWS', render: () => <Tab.Pane attached={false}>No Reviews Found</Tab.Pane> },
    ];
    if (fetchingDetails) {
      return (
        <Segment>
          <Dimmer active>
            <Loader size="large">Loading</Loader>
          </Dimmer>
          <Image src="https://res.cloudinary.com/dzfragjmc/image/upload/v1506830707/paragraph_k2wgsk.png" />
        </Segment>
      );
    }
    return (
      <div>
        <Helmet>
          <title>Zaggle - {merchant_name || ''} - Restaurant Page</title>
          <meta name="description" content={`Details of the ${merchant_name} restaurant with deals, price for two members and deals`} />
        </Helmet>
        <Breadcrumb>
          <Breadcrumb.Section as={Link} to="/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section>{merchant_name}</Breadcrumb.Section>
        </Breadcrumb>
        <ImageCarousel {...restautantDetails} />
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={4}>
              <IntroCard {...restautantDetails} />
            </Grid.Column>
            <Grid.Column width={12}>
              <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

RestaurantPage.propTypes = {
  match: PropTypes.object.isRequired,
  onFetchRestaurantDetails: PropTypes.func.isRequired,
  restaurantpage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  restaurantpage: makeSelectRestaurantPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onFetchRestaurantDetails: (restaurantId) => dispatch(fetchRestaurantDetails(restaurantId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'restaurantPage', reducer });
const withSaga = injectSaga({ key: 'restaurantPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RestaurantPage);
