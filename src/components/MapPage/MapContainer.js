import React       from 'react';

import QuizActions from '../../actions/QuizActions';
import QuizStore   from '../../stores/QuizStore';

import AmMap       from './AmMap';
import Quiz        from './Quiz';

class MapContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = QuizStore.getState();
		this.onStoreChange = this.onStoreChange.bind(this);
	}

	componentDidMount() {
		QuizActions.fetchCountries()
			.then(function () {
				QuizActions.startQuiz();
			});
		QuizStore.listen(this.onStoreChange);
	}
	componentWillUnmount() {
		QuizStore.unlisten(this.onStoreChange);
	}

	render() {
		return (
			<div>
				<AmMap selectCountry={this.state.question} />
				<Quiz question={this.state.question} onAnswer={this.handleAnswer} />
			</div>
		);
	}

	handleAnswer(answer) {
		QuizActions.giveAnswer(answer);
	}

	onStoreChange() {
		this.setState(QuizStore.getState());
	}
}

export default MapContainer;
