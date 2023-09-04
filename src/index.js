import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const selectForm = document.querySelector('#selectElement');
const catInfo = document.querySelector('.cat-info');
const errorMesage = document.querySelector('.error');
const loader = document.querySelector('.loader');

selectForm.addEventListener('change', handlerSearch);

errorMesage.classList.replace('error', 'error-hidden');
loader.classList.replace('loader', 'loader-hidden');
selectForm.classList.replace('breed-select', 'breed-select-hidden');

const breeds = fetchBreeds();
loader.classList.replace('loader-hidden', 'loader');
breeds
  .then(resp => {
    selectForm.classList.replace('breed-select-hidden', 'breed-select');
    loader.classList.replace('loader', 'loader-hidden');
    selectForm.innerHTML = createMarkup(resp.data);
    new SlimSelect({
      select: '#selectElement',
    });
  })
  .catch(err => {
    console.log(err.message);
    Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    errorMesage.classList.replace('error-hidden', 'error');
    selectForm.classList.replace('breed-select', 'breed-select-hidden');
  })
  .finally(() => loader.classList.replace('loader', 'loader-hidden'));

function createMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}
function createMarkupBreed(arr) {
  return arr
    .map(
      ({ url, breeds: [{ name, description, temperament }] }) =>
        `
    <div class="img-block">
      <img src="${url}" alt="${name}">
    </div>
    <div class="description-block">
      <h2 class="cat-name">${name}</h2>
      <p>${description}</p>
      <p><span class="temperament">Temperament: </span>${temperament}</p>
    </div>
    `
    )
    .join('');
}
function handlerSearch(evt) {
  evt.preventDefault();
  let markupBreed = '';
  catInfo.innerHTML = markupBreed;
  loader.classList.replace('loader-hidden', 'loader');
  fetchCatByBreed(evt.target.value)
    .then(resp => {
      markupBreed = createMarkupBreed(resp.data);
      catInfo.innerHTML = markupBreed;
      // console.log(resp.data); //console.log(resp.data[0].breeds[0].description);
    })
    .catch(err => {
      console.log(err.message);
      Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    })
    .finally(() => loader.classList.replace('loader', 'loader-hidden'));
}
