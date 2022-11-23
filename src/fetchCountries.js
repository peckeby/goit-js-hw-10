'use strict';

    export class FetchCountriesApi {
      #BASE_URL = 'https://restcountries.com/v3.1/name';

      constructor() {
        this.searchCountryName = null;
      };

      fetchCountries() {
        return fetch(`${this.#BASE_URL}/${this.searchCountryName}?fields=name,capital,population,flags,languages`)
        .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
        })
    }
}