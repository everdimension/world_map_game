import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
require('../../styles/animated-checkbox.less');
require('./QuizScore.less');

class QuizScore extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showSettings: false
		};

		this.handleScoreClick = this.handleScoreClick.bind(this);
		this.onClickToggle = this.onClickToggle.bind(this);
		this.handleCountryCheck = this.handleCountryCheck.bind(this);
	}

	componentWillUnmount() {
		this.unsetDOMListener();
	}

	render() {
		let mistakes = [];
		for (var i = 0; i < 5; i++) {
			if (i >= (5 - this.props.mistakes)) {
				mistakes.push(<span key={i} className="bar__muted"></span>);
			} else {
				mistakes.push(<span key={i}></span>);
			}

		}

		let scoreSettingsClasses = classNames('Score__settings', {
			hide: !this.state.showSettings
		});

		let scoreElement = this.props.quizInProgress ?
		 <span>score: {this.props.score}</span> :
		 (
			<a href="#" className="Score__toggle" onClick={this.handleScoreClick}>
				score: {this.props.score}
			</a>
		);

		return (
			<div className="QuizScore">
				<span className="Score__bars">
					{mistakes}
				</span>

				<div className="Score__score">
					{scoreElement}

					<div className={scoreSettingsClasses} ref="scoreSettings">
						<div className="setting-item">
							<label htmlFor="toggleCountry">show countries</label>
							<div className="setting-item__checkbox">
								<input type="checkbox" id="toggleCountry" className="animated-checkbox" onClick={this.handleCountryCheck} />
								<label className="check-box" htmlFor="toggleCountry"></label>
							</div>
						</div>
					</div>

				</div>
			</div>
		);
	}

	handleCountryCheck(evt) {
		console.log('country check', evt.target.checked);
		this.props.onCountryToggle(evt.target.checked);
	}

	handleScoreClick(evt) {
		evt.preventDefault();

		this.toggleSettings();
	}

	toggleSettings() {
		let showSettings = !this.state.showSettings;
		this.setState({
			showSettings: showSettings
		});

		if (showSettings) {
			console.log('setting listener');
			this.setDOMListener();
		} else {
			this.unsetDOMListener();
		}
	}

	setDOMListener() {
		console.log('setting DOMLisetner');
		document.addEventListener('click', this.onClickToggle);
	}
	unsetDOMListener() {
		document.removeEventListener('click', this.onClickToggle);
	}

	onClickToggle(evt) {
		console.log('doc body click');
		let settingsElement = ReactDOM.findDOMNode(this.refs.scoreSettings);
		let isChildElement = settingsElement.contains(evt.target);

		if (evt.target === settingsElement || isChildElement) {
			return;
		}

		this.unsetDOMListener();
		this.setState({
			showSettings: false
		});
	}

}

export default QuizScore;
