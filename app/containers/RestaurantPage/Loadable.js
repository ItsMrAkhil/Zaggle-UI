/**
 *
 * Asynchronously loads the component for RestaurantPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
