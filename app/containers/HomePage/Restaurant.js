import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Container, Rating } from 'semantic-ui-react';

export default function RestaurantGridItem(props) {
  const {
    merchant_image, merchant_name, location,
    cashback_deals, distance, group_deals,
    rating, merchant_id,
  } = props;
  const imageUrl = `https://mobile-api.zaggle.in/images/merchants/${merchant_image}`;
  let cashBackLabel;
  if (cashback_deals || group_deals) {
    cashBackLabel = {
      as: 'a',
      color: 'blue',
      content: group_deals ? `${group_deals} Deals` : cashback_deals,
      icon: group_deals ? 'tags' : 'tag',
      ribbon: true,
    };
  }
  return (
    <Card color="teal">
      <Link to={`/${merchant_id}`}>
        <Image
          src={imageUrl}
          className="cover"
          label={cashBackLabel}
          alt={merchant_name}
        />
        <Card.Content>
          <Card.Header>{merchant_name}</Card.Header>
          <Card.Meta>
            <Container textAlign="left">
              <Icon name="point" />{location} - {distance} KMs
            </Container>
            <Container textAlign="right">
              <Rating disabled icon="star" defaultRating={1} maxRating={1} /> {rating}
            </Container>
          </Card.Meta>
        </Card.Content>
      </Link>
    </Card>
  );
}

RestaurantGridItem.propTypes = {
  merchant_image: PropTypes.string,
  merchant_name: PropTypes.string,
  cashback_deals: PropTypes.string,
  location: PropTypes.string,
  distance: PropTypes.string,
  group_deals: PropTypes.string,
  merchant_id: PropTypes.string,
  rating: PropTypes.number,
};
