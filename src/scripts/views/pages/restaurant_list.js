import RestaurantAPI from '../../data/restaurant-api';
import API_ENDPOINT from '../../globals/api-endpoints';
import { cardItem, cardItemSkeleton } from '../templates/template-creator';

const RestauranList = {
  async render() {
    return `
       <h2 tabindex="0">Explore Restaurant</h2>
       <section class="all-restaurant">
        <form class="search-form">
       <div class="wrap">
        <div class="search">
            <input type="text" class="searchTerm" id="search" placeholder="Search Restaurant">
            <button type="submit" id="submit-search" class="searchButton" aria-label="search">
              <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
       </form>
          <div class="row">
            <div class="restaurant-list">
            ${cardItemSkeleton(20)}
            </div>
          </div>
          <div class="loader">
              <div class="loaderBar"></div>
            </div>
       </section>
    `;
  },

  async afterRender() {
    const restoContainer = document.querySelector('.restaurant-list');
    let itemContainer = '';
    const allRestaurant = await RestaurantAPI.fetchURL(API_ENDPOINT.ALL_RESTAURANT);
    // eslint-disable-next-line no-return-assign
    restoContainer.innerHTML = itemContainer;
    allRestaurant.restaurants.map((resto) => itemContainer += cardItem(resto));
    restoContainer.innerHTML = itemContainer;
    document.querySelector('.loader').style.display = 'none';

    const searchVal = document.querySelector('#search');
    const seachBtn = document.querySelector('#submit-search');
    seachBtn.addEventListener('click', async (event) => {
      event.preventDefault();
      itemContainer = '';
      const search = await RestaurantAPI.fetchURL(API_ENDPOINT.SEARCH_RESTAURANT(searchVal.value));
      if (search.restaurants.length === 0) {
        itemContainer = `<p class="empty-comment">No Result for ${searchVal.value}</p>`;
        restoContainer.innerHTML = itemContainer;
      }
      // eslint-disable-next-line no-return-assign
      search.restaurants.forEach((res) => itemContainer += cardItem(res));
      restoContainer.innerHTML = itemContainer;
    });
  },
};

export default RestauranList;
