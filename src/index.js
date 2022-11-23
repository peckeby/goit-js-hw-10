import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import createCoutryItem from './create-country-item.hbs';
import debounce from 'lodash.debounce';
import { FetchCountriesApi } from './fetchCountries';
import {refs} from './refs';

const DEBOUNCE_DELAY = 300;

const countriesApi = new FetchCountriesApi;

const onChangeForm = (event) => {
  const eventTargetValue = event.target.value;
  countriesApi.searchCountryName = eventTargetValue.trim();
  if (event.target.value === ""){
    refs.coutryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
    return;
  }
  countriesApi
  .fetchCountries()
    .then(data => {
      if (data.length > 10){
        Notify.info('Too many matches found. Please enter a more specific name.')
        refs.coutryList.innerHTML = "";
        refs.countryInfo.innerHTML = "";
        return;
      }

      if (data.length === 1) {
        const languagesValues = Object.values(data[0].languages);
        refs.coutryList.innerHTML = createCoutryItem(data);
        refs.countryInfo.innerHTML =
        `<p class="info-partial"><span class="category-of-info">Official name:</span> ${data[0].name.official}</p>
        <p class="info-partial"><span class="category-of-info">Capital:</span> ${data[0].capital}</p>
        <p class="info-partial"><span class="category-of-info">Population:</span> ${data[0].population}</p>
        <p class="info-partial"><span class="category-of-info">Languages:</span> ${languagesValues}</p>`
        return
      }
      refs.coutryList.innerHTML = createCoutryItem(data)
      refs.countryInfo.innerHTML = "";
    })
    .catch(err => {
      console.log(err);
      refs.coutryList.innerHTML = "";
      refs.countryInfo.innerHTML = "";
      Notify.failure('Oops, there is no country with that name')});
}

refs.searchBox.addEventListener('input', debounce((event) => {
  onChangeForm(event)}, `${DEBOUNCE_DELAY}`));
