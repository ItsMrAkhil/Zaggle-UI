import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { List, Icon } from 'semantic-ui-react';

export default function DealsTab(props) {
  const { group_deals, cashback_deals } = props;
  const dealsComponents = group_deals && group_deals.map && group_deals.map((deal) => {
    const { deal_id, title } = deal;
    return (
      <List.Item key={deal_id}>
        <Icon name="tag" />
        <List.Content>
          <List.Header style={{ fontSize: 14 }}>{title}</List.Header>
          <br />
          <List.Description>
            <a> Show Details </a>
          </List.Description>
          <br />
        </List.Content>
      </List.Item>
    );
  });
  let cashbackDeals;
  if (cashback_deals && cashback_deals.title) {
    const { title } = cashback_deals;
    cashbackDeals = (
      <List.Item >
        <Icon name="tag" />
        <List.Content>
          <List.Header style={{ fontSize: 14 }}>{title}</List.Header>
          <br />
          <List.Description>
            <a> Show Details </a>
          </List.Description>
          <br />
        </List.Content>
      </List.Item>
    );
  }
  return (
    <div>
      <List>
        {dealsComponents}
        {cashbackDeals}
      </List>
    </div>
  );
}

DealsTab.propTypes = {
  group_deals: PropTypes.array,
  cashback_deals: PropTypes.string,
};
