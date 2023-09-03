import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_hUpm0TPsmjbX4AC1QpGRotmyFij1HtEea16FWClWzwksRd4Bpv33ZC17i5Yzp1kM';
// console.log(axios.isCancel('something'));

const BASE_URL = 'https://api.thecatapi.com/v1';
const POINT_BREEDS = '/breeds';
const POINT_SEARCH = '/images/search';

function fetchBreeds() {
  return axios.get(`${BASE_URL}${POINT_BREEDS}`).then(resp => {
    return resp;
  });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}${POINT_SEARCH}?breed_ids=${breedId}`)
    .then(resp => {
      return resp;
    });
}
export { fetchBreeds, fetchCatByBreed };
