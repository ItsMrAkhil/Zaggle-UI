import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

export default function MenuTab(props) {
  const { menu_imgs } = props;
  let menuImages = [];
  try {
    menuImages = JSON.parse(menu_imgs);
  } catch (err) {
    console.log(err); // eslint-disable-line
  }
  let menuImagesComponents = menuImages && menuImages.map && menuImages.map((image) => (
    <Card raised image={`https://mobile-api.zaggle.in/images/menus/${image}`} key={image} />
  ));
  if (!menuImagesComponents.length) {
    menuImagesComponents = 'No menu images are available.';
    return <div>{menuImagesComponents}</div>;
  }
  return (
    <Card.Group itemsPerRow={3}>
      {menuImagesComponents}
    </Card.Group>
  );
}

MenuTab.propTypes = {
  menu_imgs: PropTypes.string,
};
