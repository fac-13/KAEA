import React from 'react';
import { getWords, getDefs } from '../utils/getData';
// import '../../assets/styles.css'
import { apiKey } from './../../key.js';

const url = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=%20proper-noun&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=10&maxLength=-1&limit=4&api_key=${apiKey}`;
const urlDefs = ``;

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
    return (
      <div>
        <h2>{keys[0]}</h2>
        <form>
          {keys.map(key => {
            return (
              <div>
                <label htmlFor={this.state.words[key]}>
                  {this.state.words[key]}
                </label>
                <input
                  type="radio"
                  name="definition"
                  id={this.state.words[key]}
                />
              </div>
            );
          })}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
// {keys.map(key => <li key={key}> {this.state.words[key]}</li>)}
// {<div>
// <label for={this.state.words[key]}>{this.state.words[key]}</label>
// <input type="radio" id={this.state.words[key]} />
// </div>;}
export default Words;
