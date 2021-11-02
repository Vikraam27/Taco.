import Home from '../views/pages/home';
import RestaurantList from '../views/pages/restaurant_list';
import RestaurantDetails from '../views/pages/restaurant_details';
import Favorite from '../views/pages/favorite';
import NotFoundPage from '../views/pages/pageNotFound';

const routes = {
  '/': Home,
  '/restaurants': RestaurantList,
  '/restaurant/:id': RestaurantDetails,
  '/favorite': Favorite,
  '/page-not-found': NotFoundPage,
};

export default routes;
