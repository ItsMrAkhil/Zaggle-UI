import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Dropdown } from 'semantic-ui-react';

export default function FilterDropdown(props) {
  return (
    <Grid.Column>
      <Dropdown {...props} fluid selection />
    </Grid.Column>
  );
}

FilterDropdown.propTypes = {
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.array,
};
