import React from 'react';

class Quiz extends React.Component {
	render() {
		let question = this.props.question;

		console.log('quiz render', this.props.question);

		return (
			<div className="container text-center">
				question: capital of {question.country}
				<br />
				answer
			</div>
		);
	}
}

export default Quiz;
