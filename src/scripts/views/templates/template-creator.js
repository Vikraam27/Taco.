import CONFIG from '../../globals/config';

const cardItem = (resto) => `
    <article class="card">
        <img loading="lazy" tabindex="0" src=${CONFIG.BASE_IMAGE_URL_SMALL}${resto.pictureId} alt=${resto.name} class="card-img">
        <div class="card-details">
        <p class="rating"><i class="fa fa-star"></i><span>${resto.rating}</span></p>
            <span tabindex="0" class="location"><i class="fa fa-map-marker"></i> ${resto.city}</span>
            <h3 tabindex="0" class="card-title">${resto.name}</h3>
            <p tabindex="0" class="card-description">${resto.description.length < 60 ? resto.description : `${resto.description.substring(0, 100)}...`}</p>
            <a tabindex="0" class="btn-card" href=${`/#/restaurant/${resto.id}`}>Read more</a>
        </div>
    </article>
`;

const cardItemSkeleton = (item) => {
  let template = '';

  for (let i = 0; i < item; i += 1) {
    template += `
        <article class="card">
        <img tabindex="0" src="./images/placeholder.png"" alt="skeleton" class="card-img">
        <div class="card-details">
        <p class="rating"><i class="fas fa-star"></i><span>5</span></p>
            <span tabindex="0" class="location"><i class="fas fa-map-marker-alt"></i>Lorem</span>
            <h3 tabindex="0" class="card-title">Lorem</h3>
            <p tabindex="0" class="card-description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m...</p>
            <a tabindex="0" class="btn-card" href="">Read more</a>
        </div>
    </article>
        `;
  }
  return template;
};
const detailPage = (resto) => `
    <div class="container-top">
        <div class="picture-container">
          <picture>
              <source media="(min-width:650px)" alt=${resto.restaurant.name} srcset=${CONFIG.BASE_IMAGE_URL_LARGE}${resto.restaurant.pictureId}>
              <source media="(min-width:650px)" alt=${resto.restaurant.name} srcset=${CONFIG.BASE_IMAGE_URL_MEDIUM}${resto.restaurant.pictureId}>
              <source media="(min-width:465px)" alt=${resto.restaurant.name} srcset=${CONFIG.BASE_IMAGE_URL_SMALL}${resto.restaurant.pictureId}>
              <img src=${CONFIG.BASE_IMAGE_URL_MEDIUM}${resto.restaurant.pictureId} alt=${resto.restaurant.name} class="picture">
          </picture>
      </div>
      <section class="description">
            <h2 class="resto_title">${resto.restaurant.name}</h2>
            <p class="description-text">City : ${resto.restaurant.city}</p>
            <p class="description-text">Category : ${resto.restaurant.categories[0].name}</p>
            <p class="description-text">Address : ${resto.restaurant.address}</p>
            <p class="description-text">Rating : ${resto.restaurant.rating}</p>
            <p class="description-text">Description : ${resto.restaurant.description}</p>
        </section>
    </div>
    <div class="container-bottom">
        <h3 class="menu">Menu</h3>
        <div class="container-menu">
            <h4>Food</h4>
            <div class="food food-container"></div>
            <h4>Drink</h4>
            <div class="drink food-container"></div>
        </div>
        <h5>Post Review<h5/>
        <form class="form" type="POST">
        <div class="mb-3">
           <label for="inputName" class="form-label">Name:</label>
           <input name="inputName" type="text" class="form-control" id="inputName">
       </div>
       <div class="mb-3">
           <label for="inputReview" class="form-label">Review:</label>
           <input type="text" class="form-control" id="inputReview">
       </div>
         <button id="submit" type="submit">Submit</button>
        <p class="note"></p>
        </form>
        <div class="container-comment"><h6>Customer Review</div>
    </div>
`;

const cardFood = (foodName, imgSrc) => `
    <div class="card-food">
        <div class="img-food-container">
            <img src=${imgSrc}'  alt=${foodName} class="img-food">
        </div>
        <hr/>
        <p>${foodName}</>
    </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const commentTemplate = (name, date, review) => `
    <div class="comment">
      <div class="comment-body">
        <p class="review-name">${name}</p>
        <p class="date">${date}</p>
        <p class="review-text">${review}</p>
      </div>
    </div>
`;

export {
  cardItem,
  detailPage,
  cardFood,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  commentTemplate,
  cardItemSkeleton,
};
