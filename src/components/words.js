import React from 'react';
import { getWords, getDefs } from '../utils/getData';
// import '../../assets/styles.css'
import { apiKey } from './../../key.js';
console.log(apiKey);
const url = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=%20proper-noun&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=10&maxLength=-1&limit=4&api_key=${apiKey}`;
const urlDefs = ``;

class Words extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: []
    };
  }
  componentDidMount() {
    getWords(url).then(data => {
      console.log(data);
      getDefs;
    });
  }
  render() {
    return (
      <div>
        <h2>Hellooooo</h2>
      </div>
    );
  }
}

export default Words;
