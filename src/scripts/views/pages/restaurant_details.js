/* eslint-disable array-callback-return */
import RestaurantDB from '../../data/database';
import RestaurantAPI from '../../data/restaurant-api';
import API_ENDPOINT from '../../globals/api-endpoints';
import CONFIG from '../../globals/config';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import { detailPage, cardFood, commentTemplate } from '../templates/template-creator';

const RestaurantDetails = {
  async render() {
    return `
          <article class="detail-page">
          </article>
          <div id="likeButtonContainer"></div>
          <div class="loader">
            <div class="loaderBar"></div>
          </div>
    `;
  },

  async afterRender() {
    try {
      const { id } = await UrlParser.parseActiveUrlWithoutCombiner();
      const res = await RestaurantAPI.fetchURL(API_ENDPOINT.GET_DETAIL_RESTAURANT(id));
      console.log(res);
      const container = document.querySelector('.detail-page');
      container.innerHTML = detailPage(res);

      const foodContainer = document.querySelector('.food');
      const drinkContainer = document.querySelector('.drink');
      res.restaurant.menus.foods.map((food) => {
        foodContainer.innerHTML += cardFood(food.name, CONFIG.FOOD_IMG);
      });
      res.restaurant.menus.drinks.map((food) => {
        drinkContainer.innerHTML += cardFood(food.name, CONFIG.DRINK_IMG);
      });

      LikeButtonInitiator.init({
        buttonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurant: RestaurantDB,
        restaurant: res,
      });

      const commentContainer = document.querySelector('.container-comment');
      if (res.restaurant.customerReviews.length === 0) {
        commentContainer.innerHTML = '<p class="empty-comment">Customer Review empty please add customer review</p>';
      }
      res.restaurant.customerReviews.forEach((comment) => {
        commentContainer.innerHTML += commentTemplate(comment.name, comment.date, comment.review);
      });

      document.querySelector('.loader').style.display = 'none';
      const nameInput = document.querySelector('#inputName');
      const reviewInput = document.querySelector('#inputReview');
      const btnSubmit = document.querySelector('#submit');
      const note = document.querySelector('.note');
      btnSubmit.addEventListener('click', (event) => {
        event.preventDefault();
        if (!nameInput.value || !reviewInput.value) {
          note.innerHTML = 'Note: Name & Review Cant be empty';
        } else {
          RestaurantAPI.fetchURL(API_ENDPOINT.POST_COMMENT, {
            method: 'POST',
            body: JSON.stringify({
              id,
              name: nameInput.value,
              review: reviewInput.value,
            }),
          });
          note.innerHTML = 'Comment Has Posted';
          nameInput.value = '';
          reviewInput.value = '';
        }
      });
    } catch (error) {
      const container = document.querySelector('.detail-page');
      container.innerHTML += `<div class="error-container"><p class="error">${error.message}</p><br/><p class="error">Reload the page or comeback later</p></div>`;
      document.querySelector('.loader').style.display = 'none';
    }
  },
};

export default RestaurantDetails;
