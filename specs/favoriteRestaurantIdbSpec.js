import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';
import RestaurantDB from '../src/scripts/data/database';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await RestaurantDB.getAllRestaurants()).forEach(async (resto) => {
      await RestaurantDB.deleteRestaurant(resto.id);
    });
  });

  itActsAsFavoriteRestaurantModel(RestaurantDB);
});
