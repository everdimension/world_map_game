import React       from 'react';

import QuizActions from '../../actions/QuizActions';
import QuizStore   from '../../stores/QuizStore';

import AmMap       from './AmMap';
import Quiz        from './Quiz';
import QuizScore   from './QuizScore';

class MapContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = QuizStore.getState();
		this.state.questionTimeout = null;

		this.onStoreChange = this.onStoreChange.bind(this);
		this.handleAnswer = this.handleAnswer.bind(this);
		this.startQuizzing = this.startQuizzing.bind(this);
	}

	componentDidMount() {
		window.QuizActions = QuizActions;
		let self = this;

		QuizActions.fetchCountries()
			.then(function (res) {
				return QuizActions.loadCountries(res);
				// setTimeout(self.startQuizzing.bind(self), 500);
			})
			.then(function() {
				QuizActions.startQuiz();
			});
		QuizStore.listen(this.onStoreChange);
	}
	componentWillUnmount() {
		QuizStore.unlisten(this.onStoreChange);
	}


	render() {
		console.log('state score', this.state);

		return (
			<div>
				<AmMap selectCountry={this.state.question} />
				<QuizScore mistakes={this.state.mistakes} score={this.state.scoreCount} />
				{
					this.state.question.country ?
					<Quiz
						question={this.state.question}
						checkingAnswer={this.state.checkingAnswer}
						currentAnswer={this.state.currentAnswer}
						isCorrect={this.state.isCorrect}
						onAnswer={this.handleAnswer}
						onAnswerChange={this.updateCurrentAnswer}
					/> :
					<div className="container center-block text-center">
						<form onSubmit={this.startQuizzing}>
							<div className="form-group">
								<button className="btn btn-primary">Start</button>
							</div>
						</form>
					</div>
				}
			</div>
		);
	}

	startQuizzing(evt) {
		if (evt) {
			evt.preventDefault();
		}
		QuizActions.resetQuiz();
		QuizActions.getQuestion();
		this.state.questionTimeout = setTimeout(this.handleAnswer, 4000);
	}

	getNewQuestion() {
		QuizActions.getQuestion();
		this.state.questionTimeout = setTimeout(this.handleAnswer, 4000);
	}

	handleAnswer(answer) {
		if (this.state.questionTimeout) {
			clearTimeout(this.state.questionTimeout);
		}

		answer = answer || this.state.currentAnswer;
		QuizActions.giveAnswer(answer);

		if (this.state.mistakes >= 5) {
			setTimeout(function () {
				QuizActions.endQuiz();

			}, 1000);

		} else {
			setTimeout(this.getNewQuestion.bind(this), 1000);
		}

	}

	updateCurrentAnswer(currentAnswer) {
		QuizActions.updateCurrentAnswer(currentAnswer);
	}

	onStoreChange() {
		this.setState(QuizStore.getState());
	}
}

export default MapContainer;
