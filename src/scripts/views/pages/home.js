import RestaurantAPI from '../../data/restaurant-api';
import API_ENDPOINT from '../../globals/api-endpoints';
import { cardItem, cardItemSkeleton } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <div class="banner" id="banner">
    <div class="content">
        <h1 tabindex="0">Fresh & Tasty Food</h1>
        <p tabindex="0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae nesciunt officiis culpa vel! Eligendi, quae ducimus corporis sequi illo perferendis quidem inventore? At inventore incidunt commodi nostrum iusto eum aliquam.</p>
        <button class="btn" href="#restaurant">Get Started</button>
    </div>
    </div>
    <div>
   <section class="restaurant" id="restaurant">
       <h2 tabindex="0">Explore Restaurant</h2>
       <div class="row">
        <div class="restaurant-list">
          ${cardItemSkeleton(6)}
           <!--Card list-->
           <div class="loader">
              <div class="loaderBar"></div>
            </div>
        </div>
        <a href='#/restaurants' class="btn-show-more"> show more </a>
       </div>
   </section>
  </div>
    `;
  },

  async afterRender() {
    const res = await RestaurantAPI.fetchURL(API_ENDPOINT.ALL_RESTAURANT);
    const restoContainer = document.querySelector('.restaurant-list');
    // eslint-disable-next-line no-return-assign
    restoContainer.innerHTML = '';
    res.restaurants.slice(0, 6).map((resto) => restoContainer.innerHTML += cardItem(resto));
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.style.display = 'none';
    }
  },
};

export default Home;
