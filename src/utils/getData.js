// import { apiKey } from './../../key.js';

// const url = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=%20proper-noun&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=4&api_key=${apiKey}`;

const checkResponse = response => {
  if (response.status !== 200) {
    console.log(`Error with the response request, ${response.status}`);
    return;
  }
  return response.json();
};

export const getData = url => {
  console.log(url);
  return fetch(`${url}`)
    .then(checkResponse)
    .catch(err => {
      throw new Error(`fetch getData failed ${err}`);
    });
};
