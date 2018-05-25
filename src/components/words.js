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
      className="inputDefs"
    />
  </div>
);

const Score = props => <div className="score">SCORE: {props.score}</div>;

const Form = props => (
  <div className="definitions">
    <h2>{props.word}</h2>
    <form onSubmit={props.verify}>
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
      word: null,
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
        console.log(keys);
        const correctAnswer = this.state.words[keys[0]];
        const answer = child[1].value;
        if (correctAnswer === answer) {
          this.props.action();
        } else {
          this.props.reset();
        }
        // this.refreshPage();
      }
    });
    this.setState({ words: null });
  };

  // refreshPage = () => {
  //   console.log('inside refresh')
  // };
  shuffle = keys => {
    var currentIndex = keys.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = keys[currentIndex];
      keys[currentIndex] = keys[randomIndex];
      keys[randomIndex] = temporaryValue;
    }

    return keys;
  };
  render() {
    if (!this.state.words) {
      return <h3> ...loading</h3>;
    }
    const keys = Object.keys(this.state.words);
    const shuffledKeys = this.shuffle([...keys]);
    return (
      <div>
        <Score score={this.props.score} />
        <Form
          word={keys[0]}
          definition={this.state.words}
          verify={this.verify}
          questNum={this.props.questNum}
          keys={shuffledKeys}
          callApi={this.submitApi}
        />
      </div>
    );
  }
}

export default Words;
