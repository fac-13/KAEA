import React from 'react';
import { getWords, getDefs } from '../utils/getData';
// import '../../assets/styles.css'
import { apiKey } from './../../key.js';

const url = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=%20proper-noun&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=10&maxLength=-1&limit=4&api_key=${apiKey}`;
const urlDefs = ``;

const Definitions = props => (
  <div>
    <label htmlFor={props.definition}>{props.definition} </label>
    <input type="radio" name="description" id={props.definition} />
  </div>
);

class Words extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: null
    };
  }
  componentDidMount() {
    getWords(url).then(data => {
      this.setState({ words: data });
    });
  }
  render() {
    if (!this.state.words) {
      return <h3> ...loading</h3>;
    }
    const keys = Object.keys(this.state.words);
    return (
      <div>
        <h2>{keys[0]}</h2>
        <form>
          {keys.map(key => (
            <Definitions key={key} definition={this.state.words[key]} />
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Words;
