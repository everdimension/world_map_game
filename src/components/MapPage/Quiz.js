import React from 'react';
import classNames from 'classnames';
require('./Quiz.less');

class Quiz extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		React.findDOMNode(this.refs.quizInputRef).focus();
	}

	componentDidUpdate() {
		if (!this.props.checkingAnswer) {
			React.findDOMNode(this.refs.quizInputRef).focus();
		}
	}

	render() {
		let question = this.props.question;

		let formGroupClasses = classNames('form-group form-group-lg', {
			'has-error': this.props.isCorrect === false,
			'has-success': this.props.isCorrect
		});

		let countryLabelClasses = classNames({
			'invisible': !this.props.showCountry && !this.props.checkingAnswer
		});

		let QuizWrapperClassess = classNames('Quiz__input-wrapper', {
			'no-animation': this.props.checkingAnswer
		});

		let capitalName = this.props.question.capital.translations.ru;

		let inputValue = this.props.checkingAnswer ? capitalName : this.props.currentAnswer;

		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-6 col-sm-offset-3">
						<form onSubmit={this.handleSubmit}>
							<div className={formGroupClasses}>
								<label htmlFor="quizInput" className={countryLabelClasses}>{this.props.question.translations.ru.common}</label>
								<div className={QuizWrapperClassess}>
									<input type="text" ref="quizInputRef" id="quizInput" value={inputValue} onChange={this.handleChange} disabled={this.props.checkingAnswer} className="form-control Quiz__input" placeholder="enter capital name..." />
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}

	handleSubmit(evt) {
		evt.preventDefault();
		this.submitAnswer();
	}

	handleChange(evt) {
		this.props.onAnswerChange(evt.target.value);
	}

	submitAnswer() {
		let answer = React.findDOMNode(this.refs.quizInputRef).value;
		this.props.onAnswer(answer);
	}
}

export default Quiz;
