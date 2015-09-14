import dispatcher  from '../core/dispatcher';
import http        from '../core/HttpClient';
import CountryQuiz from '../services/QuizService';

window.http = http;

let quiz;

const QuizActions = {

	fetchCountries: function() {
		return http.get('/countries_data.json')
			.then((res) => {
				console.log('loaded countires');
				this.loadCountries(res);
			})
			.catch(() => console.warn('failed countries'));
	},

	loadCountries: function (data) {
		console.log('creating quiz...');
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
	},

	dispatchQuestion: function (question) {
		dispatcher.dispatch({
			type: 'NEW_QUESTION',
			payload: {
				question
			}
		});
	},

	startQuiz: function() {
		quiz.startQuiz(QuizActions.dispatchQuestion);
	},

	giveAnswer: function (answer) {
		quiz.giveAnswer(answer);
	},

	getQuestion: function() {
		return 'later';
	}

};

export default QuizActions;
