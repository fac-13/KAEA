import React from 'react';
import Words from './words';

class Quiz extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        oldNum: 0,
        score: 0,
        questNum: 1,
        maxQuestNum: 10
      };
    }
    score = () => {
        console.log("we have scored");
        let { oldScore, score } = this.state;
        oldScore = score;
        score +=10;
        this.setState({ score });
        console.log(this.state);
    }

    question = () => {
        console.log("we have incremented q");
        let { questNum } = this.state;
        oldNum = questNum;
        questNum +=1;
        this.setState({ questNum });
        console.log(this.state);
    }
    render() {
        return  (
            <div>
                <Words action={this.score} score={this.state.score} question={this.question} questionNum={this.state.questNum}/>
        

        </div>
        )
    }
}

export default Quiz;