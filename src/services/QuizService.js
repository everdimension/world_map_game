class CountryQuiz {
	constructor(opts) {
		this.type = opts.type;
		this.countries = opts.countries;
		this.currentIndex = 0;
		this.currentQuestion = this.countries[38];
		this.quizzingIntervalId = null;
	}

	getQuestion() {
		let index = Math.floor(Math.random() * this.countries.length);
		this.currentQuestion = this.countries[index];
		return this.countries[index];
	}

	answer(answerObject) {

	}
}

export default CountryQuiz;
