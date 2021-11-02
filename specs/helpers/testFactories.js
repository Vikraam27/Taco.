import LikeButtonInitiator from '../../src/scripts/utils/like-button-initiator';
import RestaurantDB from '../../src/scripts/data/database';

const createLikeButtonPresenterWithMovie = async (restaurant) => {
  await LikeButtonInitiator.init({
    buttonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestaurant: RestaurantDB,
    restaurant: {
      restaurant,
    },
  });
};

// eslint-disable-next-line import/prefer-default-export
export { createLikeButtonPresenterWithMovie };
