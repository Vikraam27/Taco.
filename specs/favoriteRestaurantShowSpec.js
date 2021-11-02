import RestaurantDB from '../src/scripts/data/database';
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurant/favorite-restauran-show-presenter';
import FavoriteRestaurahtSearchView from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-view';

describe('Showing all favorite restaurant', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurahtSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurant have been liked', () => {
    it('should render the information that no restaurant have been liked', (done) => {
      document.querySelector('.restaurant-list').addEventListener('movies:updated', () => {
        expect(document.querySelectorAll('#not-found').length)
          .toEqual(1);

        done();
      });
      const favoriteRestaurants = spyOnAllFunctions(RestaurantDB);
      favoriteRestaurants.getAllRestaurants.and.returnValue([]);
      const presenter = new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
      presenter._displayRestaurants();
      expect(document.querySelectorAll('#not-found').length)
        .toEqual(1);
    });
    it('should ask for the favorite restaurant', () => {
      const favoriteRestaurants = spyOnAllFunctions(RestaurantDB);

      // eslint-disable-next-line no-new
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });
  });

  describe('When favorite restaurants exist', () => {
    it('should renders the restaurants', (done) => {
      document.querySelector('.restaurant-list').addEventListener('movies:updated', () => {
        expect(document.querySelectorAll('.card').length).toEqual(2);
        done();
      });
      const favoriteRestaurants = spyOnAllFunctions(RestaurantDB);
      favoriteRestaurants.getAllRestaurants.and.returnValue([
        {
          id: 11, name: 'A', rating: 3, description: 'Sebuah film A',
        },
        {
          id: 22, name: 'B', rating: 4, description: 'Sebuah film B',
        },
      ]);
      // eslint-disable-next-line no-new
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });
});
