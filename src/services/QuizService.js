class CountryQuiz {
	constructor(opts) {
		this.type = opts.type;
		this.countries = opts.countries;
		this.currentIndex = 0;
		this.currentQuestion = this.countries[38];
		this.quizzingIntervalId = null;
		this.callbacks = {
			question: [],
			answer: []
		};
		this.score = 0;
		this.mistakes = 0;
	}

	on (action, callback) {
		if (!this.callbacks[action]) {
			throw new Error('unknown Quiz action');
		}

		this.callbacks[action].push(callback);
	}

	getQuestion() {
		let index = Math.floor(Math.random() * this.countries.length);
		this.currentQuestion = this.countries[index];

		this.callbacks.question.forEach((callback) => {
			callback.call(null, this.currentQuestion);
		});

		return this.currentQuestion;
	}

	startQuiz(callback) {
		this.callbacks.push(callback);
		this.quizzingIntervalId = setInterval(() => {
			this.getQuestion();
		}, 4000);
	}

	giveAnswer(answer) {
		answer = answer.toLowerCase();
		let actual = this.currentQuestion.capital.name.toLowerCase();
		let actualRU = this.currentQuestion.capital.translations.ru.toLowerCase();

		clearInterval(this.quizzingIntervalId);

		let isCorrect = answer === actual;
		let isCorrectRU = answer === actualRU;

		let isAccepted = isCorrect || isCorrectRU;

		this.scoreAnswer(isAccepted);

		return isAccepted;
		// if (answer.toLowerCase() === this.currentQuestion.capital.name.toLowerCase()) {
		// 	console.log('correct!');
		// } else {
		// 	console.warn('wrong!');
		// }
	}

	getMistakes() {
		return this.mistakes;
	}

	getScore() {
		return {
			mistakes: this.mistakes,
			scoreCount: this.score
		};
	}

	scoreAnswer(correct) {

		this.score += (+correct) * 100;
		if (!correct) {
			++this.mistakes;
		}
		if (this.mistakes >= 5) {
			// end quiz
		}

	}

	resetQuiz() {
		this.mistakes = 0;
		this.score = 0;
	}

	answer(answerObject) {

	}
}

export default CountryQuiz;
