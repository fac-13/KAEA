import React from 'react';
import { getWords, getDefs } from '../utils/getData';
// import '../../assets/styles.css'
import { apiKey } from './../../key.js';

const url = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=%20proper-noun&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=10&maxLength=-1&limit=4&api_key=${apiKey}`;

const Definitions = props => (
  <div>
    <label htmlFor={props.definition}>{props.definition} </label>
    <input
      type="radio"
      name="description"
      value={props.definition}
      id={props.definition}
    />
  </div>
);

const Score = props => <div>{props.score}</div>;

const Form = props => (
  <div>
    <h2>{props.word}</h2>
    <form onSubmit={props.verify}>
      {props.questNum}
      {props.keys.map(key => (
        <Definitions key={key} definition={props.definition[key]} />
      ))}
      <button type="submit" onClick={props.callApi}>
        Submit
      </button>
    </form>
  </div>
);

//--------------------------------------------------------------------------------------------------
class Words extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: null
      // score: 0
    };
    this.verify = this.verify.bind(this);
  }
  submitApi = () => {
    getWords(url).then(data => {
      this.setState({ words: data });
    });
  };
  componentDidMount = () => {
    this.submitApi();
  };

  verify = event => {
    event.preventDefault();
    this.props.question();
    const form = [...event.target.children].filter(
      item => item.innerHTML !== 'Submit'
    );
    form.map(item => {
      const child = [...item.children];
      if (child[1].checked === true) {
        const keys = Object.keys(this.state.words);
        const correctAnswer = this.state.words[keys[0]];
        const answer = child[1].value;
        if (answer === correctAnswer) {
          this.props.action();
        }
        // this.refreshPage();
      }
    });
  };

  // refreshPage = () => {
  //   console.log('inside refresh')
  // };

  render() {
    if (!this.state.words) {
      return <h3> ...loading</h3>;
    }

    const keys = Object.keys(this.state.words);
    return (
      <div>
        <Score score={this.props.score} />
        <Form
          word={keys[0]}
          definition={this.state.words}
          verify={this.verify}
          questNum={this.props.questNum}
          keys={keys}
          callApi={this.submitApi}
        />
      </div>
    );
  }
}

export default Words;
