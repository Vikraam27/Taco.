import { cardItem } from '../../templates/template-creator';

/* eslint-disable class-methods-use-this */
class FavoriteRestaurantSearchPresenter {
  constructor({ favoriteRestaurant, view }) {
    this._view = view;
    this._listenToSearchRequestByUser();
    this._favoriteRestaurant = favoriteRestaurant;
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchRestaurant(latestQuery);
    });
  }

  async _searchRestaurant(latestQuery) {
    this._latestQuery = latestQuery.trim();
    let foundRestaurant;
    if (this.latestQuery.length > 0) {
      foundRestaurant = await this._favoriteRestaurant.searchRestaurant(this.latestQuery);
    } else {
      foundRestaurant = await this._favoriteRestaurant.getAllRestaurants();
    }
    this._showFoundRestaurant(foundRestaurant);
  }

  _showFoundRestaurant(restaurants) {
    let html;
    if (!restaurants) {
      return;
    }
    if (restaurants.length > 0) {
      html = restaurants.reduce(
        (carry, resto) => carry.concat(cardItem(resto)),
        '',
      );
    } else {
      html = `<h3 class="favorite-title" id="not-found">${this.latestQuery} is not found</h3>`;
    }

    document.querySelector('.restaurant-list').innerHTML = html;
    document.querySelector('.row')
      .dispatchEvent(new Event('movies:searched:updated'));
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestaurantSearchPresenter;
