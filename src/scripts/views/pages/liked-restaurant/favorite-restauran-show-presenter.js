class FavoriteRestaurantShowPresenter {
  constructor({ view, favoriteRestaurants }) {
    this._view = view;
    this._favoriteRestaurants = favoriteRestaurants;

    this._showFavoriteRestaurant();
  }

  async _showFavoriteRestaurant() {
    const restaurant = await this._favoriteRestaurants.getAllRestaurants();
    this._displayRestaurants(restaurant);
  }

  _displayRestaurants(restaurant) {
    this._view.showFavoriteRestaurant(restaurant);
  }
}

export default FavoriteRestaurantShowPresenter;
