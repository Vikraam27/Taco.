import { cardItem } from '../../templates/template-creator';

class FavoriteRestaurahtSearchView {
  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    return `
    <h2 tabindex="0">Explore Restaurant</h2>
     <form class="search-form">
       <div class="wrap">
        <div class="search">
            <input type="text" class="searchTerm" id="query" placeholder="Search Restaurant">
            <button type="submit" id="submit-search" class="searchButton" aria-label="search">
              <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
       </form>
        <section class="all-restaurant">
           <div class="row">
             <div class="restaurant-list">
             <div class="loader">
               <div class="loaderBar"></div>
             </div>
             </div>
           </div>
        </section>
        `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  async showFavoriteRestaurant(restaurants = []) {
    let html;
    console.log(restaurants);
    if (restaurants.length) {
      html = await restaurants.reduce(
        (carry, resto) => carry.concat(cardItem(resto)),
        '',
      );
    } else {
      html = this._getEmptyRestaurantTemplate();
    }
    document.querySelector('.restaurant-list').innerHTML = html;

    document.querySelector('.restaurant-list').dispatchEvent(new Event('movies:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return '<h3 class="favorite-title" id="not-found">There is no data</h3>';
  }
}

export default FavoriteRestaurahtSearchView;
