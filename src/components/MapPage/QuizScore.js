import React from 'react';
require('./QuizScore.less');

class QuizScore extends React.Component {
	render() {
		let mistakes = [];
		for (var i = 0; i < 5; i++) {
			if (i >= (5 - this.props.mistakes)) {
				mistakes.push(<span className="bar__muted"></span>);
			} else {
				mistakes.push(<span></span>);
			}

		}
		return (
			<div className="QuizScore">
				<span className="Score__bars">
					{mistakes}
				</span>

				<div className="Score__score">
					score: {this.props.score}
				</div>
			</div>
		);
	}
}

export default QuizScore;
