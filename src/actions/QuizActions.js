import dispatcher  from '../core/dispatcher';
import http        from '../core/HttpClient';
import CountryQuiz from '../services/QuizService';

window.http = http;

let quiz;
let questionTimeout;

const QuizActions = {

	fetchCountries: function() {
		return http.get('/countries_data.json')
			.then((res) => {
				return res;
			})
			.catch(function () {
				console.warn('failed countries');
			});
	},

	loadCountries: function (data) {
		quiz = new CountryQuiz({
			countries: data,
			type: 'capitals'
		});

		dispatcher.dispatch({
			type: 'COUNTRIES_DATA',
			payload: {
				question: quiz.getQuestion()
			}
		});

		return true;
	},

	dispatchQuestion: function (question) {
		dispatcher.dispatch({
			type: 'NEW_QUESTION',
			payload: {
				question
			}
		});
	},

	updateCurrentAnswer: function (answer) {
		dispatcher.dispatch({
			type: 'NEW_ANSWER',
			payload: {
				currentAnswer: answer
			}
		});
	},

	toggleCountriesMode: function(show) {
		quiz.toggleCountriesMode(show);
		dispatcher.dispatch({
			type: 'TOGGLE_COUNTRIES_MODE',
			payload: {
				show: quiz.settings.showCountries
			}
		});
	},

	startQuiz: function() {
		console.log('startQuiz fn in ACtions');
		quiz.on('question', QuizActions.dispatchQuestion);
		// window.quiz = quiz;
		//
		// setTimeout(quiz.getQuestion.bind(quiz), 500);
		// // quiz.getQuestion();
		// questionTimeout = setTimeout(function () {
		// 	// quiz.giveAnswer();
		// 	console.log('quietsion timeout!');
		// }, 4000);
		//
		// quiz.startQuiz(QuizActions.dispatchQuestion);
	},

	giveAnswer: function (answer) {

		dispatcher.dispatch({
			type: 'CHECKING_ANSWER',
			payload: {
				checkingAnswer: true
			}
		});

		let isCorrect = quiz.giveAnswer(answer);
		let score = quiz.getScore();

		dispatcher.dispatch({
			type: 'ANSWER',
			payload: {
				isCorrect,
				score
			}
		});

		// setTimeout(function () {
		// 	QuizActions.getQuestion();
		// }, 1000);
	},

	getQuestion: function() {
		quiz.getQuestion();
	},

	resetQuiz: function () {
		quiz.resetQuiz();
		dispatcher.dispatch({
			type: 'QUIZ_RESET',
			payload: null
		});
	},

	endQuiz: function () {
		// quiz.end();

		dispatcher.dispatch({
			type: 'QUIZ_END',
			payload: null
		});
	}

};

export default QuizActions;
