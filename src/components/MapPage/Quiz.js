import React from 'react';

class Quiz extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		let question = this.props.question;

		console.log('quiz render', this.props.question);

		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-4 col-sm-offset-4">
						<form onSubmit={this.handleSubmit}>
							<div className="form-group">
								<label htmlFor="quizInput">{this.props.question.country}</label>
								<input type="text" ref="quizInput" id="quizInput" className="form-control" />
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}

	handleSubmit(evt) {
		evt.preventDefault();
		let answer = React.findDOMNode(this.refs.quizInput).value;
		this.props.onAnswer(answer);
	}
}

export default Quiz;
