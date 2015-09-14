import dispatcher  from '../core/dispatcher';
import http        from '../core/HttpClient';
import CountryQuiz from '../services/QuizService';

window.http = http;

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
		let quiz = new CountryQuiz({
			countries: data,
			type: 'capitals'
		});

		dispatcher.dispatch({
			type: 'COUNTRIES_DATA',
			payload: {
				quiz
			}
		});
	},

	startQuizzing: function() {
		setInterval(function() {
			dispatcher.dispatch({
				type: 'NEW_QUESTION',
				payload: null
			});
		}, 4000);
	},

	getQuestion: function() {
		return 'later';
	}

};

export default QuizActions;
