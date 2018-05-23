import React from 'react';
import { getWords, getDefs } from '../utils/getData';
// import '../../assets/styles.css'
import { apiKey } from './../../key.js';
console.log(apiKey);
const url = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=%20proper-noun&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=10&maxLength=-1&limit=4&api_key=${apiKey}`;
const urlDefs = ``;

const Definitions = props => <li className="definition">{props.definition}</li>;

class Words extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: null
    };
  }
  componentDidMount() {
    getWords(url).then(data => {
      console.log('dATA', data);
      this.setState({ words: data });
      console.log('WORDS', this.state.words);
    });
  }
  render() {
    if (!this.state.words) {
      return <h3> ...loading</h3>;
    }

    const keys = Object.keys(this.state.words);
    const values = Object.values(this.state.words);
    console.log('values', values);
    console.log('WORDStwo', this.state.words);
    console.log('KEYS', keys);

    return (
      <div>
        <h2>{keys[0]}</h2>
        <ul className="definitionList">
          {keys.map(key => <li key={key}> {this.state.words[key]}</li>)}
        </ul>
      </div>
    );
  }
}

export default Words;
