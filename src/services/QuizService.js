class CountryQuiz {
	constructor(opts) {
		this.type = opts.type;
		this.countries = opts.countries;
		this.currentIndex = 0;
		this.currentQuestion = this.countries[38];
		this.quizzingIntervalId = null;
		this.callbacks = [];
	}

	getQuestion() {
		let index = Math.floor(Math.random() * this.countries.length);
		this.currentQuestion = this.countries[index];

		this.callbacks.forEach((callback) => {
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
		clearInterval(this.quizzingIntervalId);

		if (answer.toLowerCase() === this.currentQuestion.capital.name.toLowerCase()) {
			console.log('correct!');
		} else {
			console.warn('wrong!');
		}
	}

	answer(answerObject) {

	}
}

export default CountryQuiz;
