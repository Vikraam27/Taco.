/* eslint-disable no-await-in-loop */
const assert = require('assert');

Feature('Liking restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('There is no data', '#not-found');
});

Scenario('liking and unlike restaurant', async ({ I }) => {
  I.see('There is no data', '#not-found');

  I.amOnPage('/#/restaurants');
  I.seeElement('.btn-card');
  // untuk menunggu browser memuat data dari api sehingga bukan sklekton yang di clik
  I.wait(2);
  const firstRestaurant = locate('.card-title').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.wait(2);
  // like restaurant
  I.click(locate('.btn-card').first());
  I.seeElement('#likeButton');
  I.seeElement('[aria-label="like this restaurant"]');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.card');
  const likedRestaurantTitle = await I.grabTextFrom('.card-title');
  assert.strictEqual(firstRestaurantName, likedRestaurantTitle);

  // unlike restaurant
  I.amOnPage('/#/favorite');
  I.wait(2);
  I.seeElement('.card');
  I.click(locate('.btn-card').first());
  I.seeElement('#likeButton');
  I.seeElement('[aria-label="unlike this restaurant"]');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.see('There is no data', '#not-found');
});

Scenario('Searching restaurant', async ({ I }) => {
  I.see('There is no data', '#not-found');

  I.amOnPage('/');
  I.wait(2);
  I.seeElement('.btn-card');

  const restaurantName = [];
  for (let i = 1; i <= 3; i += 1) {
    I.wait(2);
    I.click(locate('.btn-card').at(i));

    I.seeElement('#likeButton');
    I.click('#likeButton');
    restaurantName.push(await I.grabTextFrom('.resto_title'));
    I.amOnPage('/');
  }
  I.amOnPage('/#/favorite');
  I.seeElement('#query');
  // search

  const searchQuery = restaurantName[1].substring(1, 3);
  const matchingQuery = restaurantName.filter((name) => name.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedRestaurant = await I.grabNumberOfVisibleElements('.restaurant-list');
  assert.strict(matchingQuery.length, visibleLikedRestaurant);

  matchingQuery.forEach(async (title, index) => {
    const visibleName = await I.grabTextFrom(locate('.card-title').at(index + 1));
    assert.strictEqual(title, visibleName);
  });
});
