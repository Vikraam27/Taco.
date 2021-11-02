/* eslint-disable no-new */
import RestaurantDB from '../../data/database';
import FavoriteRestaurantSearchView from './liked-restaurant/favorite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from './liked-restaurant/favorite-restauran-show-presenter';
import FavoriteRestaurantSearchPresenter from './liked-restaurant/favorite-restaurant-search-presenter';

const view = new FavoriteRestaurantSearchView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: RestaurantDB });
    new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurant: RestaurantDB });
  },
};

export default Favorite;
