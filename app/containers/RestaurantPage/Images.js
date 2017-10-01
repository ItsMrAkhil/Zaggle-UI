import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import '../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';
// import { Link } from 'react-router-dom';
// import { List, Icon } from 'semantic-ui-react';

export default function ImageCarousel(props) {
  let { images } = props;
  try {
    images = JSON.parse(images);
  } catch (err) {
    console.log(err); // eslint-disable-line
  }
  if (!images || !images.length) {
    return <div></div>;
  }
  return (
    <div>
      <br />
      <br />
      <Carousel height="200px" showThumbs={false}>
        {images.map((image) => (
          <div>
            <img
              className="no-stretch"
              src={`https://mobile-api.zaggle.in/images/restaurants/${image}`}
              alt={image}
              key={image}
            />
          </div>
        ))}
      </Carousel>
      <br />
      <br />
    </div>
  );
}

ImageCarousel.propTypes = {
  images: PropTypes.string,
};
