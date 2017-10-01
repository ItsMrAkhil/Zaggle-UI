import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';

export default function InfoTab(props) {
  const { cuisines, cost_for_two, address, address2, operatinghoursopentime, operatinghoursclosetime } = props;
  return (
    <div className="info">
      <List divided>
        <List.Item>
          <List.Content>
            <List.Header>Cuisines</List.Header>
            {cuisines && cuisines.map && cuisines.map((cuisine) => `${cuisine}, `)}
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>Cost</List.Header>
            ₹ {cost_for_two} for two people (approx.)
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>Address</List.Header>
            {address} <br />
            {address2}
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>Opening Hours</List.Header>
            {operatinghoursopentime} - {operatinghoursclosetime}
          </List.Content>
        </List.Item>
      </List>
    </div>
  );
}

InfoTab.propTypes = {
  cuisines: PropTypes.array,
  cost_for_two: PropTypes.number,
  address: PropTypes.string,
  address2: PropTypes.string,
  operatinghoursopentime: PropTypes.string,
  operatinghoursclosetime: PropTypes.string,
};
