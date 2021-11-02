import CONFIG from './config';

const API_ENDPOINT = {
  ALL_RESTAURANT: `${CONFIG.BASE_URL}list`,
  SEARCH_RESTAURANT: (query) => `${CONFIG.BASE_URL}search?q=${query}`,
  GET_DETAIL_RESTAURANT: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  POST_COMMENT: `${CONFIG.BASE_URL}review`,
};

export default API_ENDPOINT;
