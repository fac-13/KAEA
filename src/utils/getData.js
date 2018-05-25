import { apiKey } from './../../key.js';
const url = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun%20verb&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=8&maxLength=-1&limit=4&api_key=${apiKey}`;

const formatUrl = word => {
  return `https://api.wordnik.com/v4/word.json/${word}/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=${apiKey}`;
};

const checkResponse = response => {
  if (response.status !== 200) {
    console.log(`Error with the response request, ${response.status}`);
    return;
  }
  return response.json();
};

export const getWords = url => {
  const obj = {};
  return fetch(`${url}`)
    .then(checkResponse)
    .then(resp => {
      const promiseArray = resp.map(({ word }) => {
        obj[word] = '';
        return fetch(formatUrl(word)).then(checkResponse);
      });
      return Promise.all(promiseArray);
    })
    .then(definitionsArr => {
      definitionsArr.forEach(def => {
        const { word, text } = def[0];
        obj[word] = text;
      });
      return obj;
    })
    .catch(err => {
      throw new Error(`fetch getData failed ${err}`);
    });
};
