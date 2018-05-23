import { apiKey } from './../../key.js';

const checkResponse = response => {
  if (response.status !== 200) {
    console.log(`Error with the response request, ${response.status}`);
    return;
  }
  return response.json();
};

export const getData = url => {
  return fetch(``)
    .then(checkResponse)
    .catch(err => {
      throw new Error(`fetch getData failed ${err}`);
    });
};
