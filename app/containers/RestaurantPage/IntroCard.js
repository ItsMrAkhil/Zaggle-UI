import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Card, Rating, Icon } from 'semantic-ui-react';

export default function DealsTab(props) {
  const { merchant_name, location, contact_email, phone_number } = props;
  let { occasions } = props;
  try {
    occasions = JSON.parse(occasions);
  } catch (err) {
    console.log(err) // eslint-disable-line
  }
  return (
    <Card>
      <Card.Content>
        <span className="right floated">
          <Rating disabled icon="star" defaultRating={1} maxRating={1} /> {4}
        </span>
        <Card.Header>
          {merchant_name}
        </Card.Header>
        <Card.Meta>
          <Icon name="point" /> {location}
        </Card.Meta>
        <Card.Description>
          {occasions && occasions.map && occasions.map((cuisine) => `${cuisine}, `)}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <strong>Email:</strong> {contact_email || 'Not Available'} <br />
        <strong>Contat Number:</strong> {phone_number || 'Not Available.' }
      </Card.Content>
    </Card>
  );
}

DealsTab.propTypes = {
  merchant_name: PropTypes.string,
  location: PropTypes.string,
  occasions: PropTypes.string,
  contact_email: PropTypes.string,
  phone_number: PropTypes.string,
};
