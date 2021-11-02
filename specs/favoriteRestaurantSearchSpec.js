import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-presenter';
import RestaurantDB from '../src/scripts/data/database';
import FavoriteRestaurahtSearchView from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-view';

describe('Searching restaurant', () => {
  let presenter;
  let favoriteRestaurant;
  let view;
  const searchRestaurant = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurahtSearchView();
    document.body.innerHTML = view.getTemplate();
  };
  const constructPresenter = () => {
    favoriteRestaurant = spyOnAllFunctions(RestaurantDB);
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurant,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });
  describe('when query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurant('film a');

      expect(presenter.latestQuery).toEqual('film a');
    });

    it('should ask the model to search for liked restaurant', () => {
      searchRestaurant('film a');

      expect(favoriteRestaurant.searchRestaurant)
        .toHaveBeenCalledWith('film a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurant(' ');

      expect(presenter.latestQuery.length).toEqual(0);
      searchRestaurant('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurant('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurant('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });
  });

  it('should show all favorite Restaurant', () => {
    searchRestaurant('    ');

    expect(favoriteRestaurant.getAllRestaurants)
      .toHaveBeenCalled();
  });

  describe('When no favorite restauran could be found', () => {
    it('should show the empty message', (done) => {
      document.querySelector('.row').addEventListener('movies:searched:updated', () => {
        expect(document.querySelectorAll('#not-found').length).toEqual(1);

        done();
      });

      favoriteRestaurant.searchRestaurant.withArgs('film a').and.returnValues([]);

      searchRestaurant('film a');
    });
  });

  it('should not show any restaurant', (done) => {
    document.querySelector('.row').addEventListener('movies:searched:updated', () => {
      expect(document.querySelectorAll('.movie').length).toEqual(0);
      done();
    });

    favoriteRestaurant.searchRestaurant.withArgs('film a').and.returnValues([]);

    searchRestaurant('film a');
  });
});
