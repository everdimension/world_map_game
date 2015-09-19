import dispatcher from '../core/dispatcher';
import { EventEmitter } from 'events';

class QuizStore extends EventEmitter {
	constructor (props) {
		super(props);
		this.currentQuestion = {};
		this.currentAnswer = '';
		this.checkingAnswer = false;
		this.isCorrect = null;
		this.mistakes = 0;
		this.scoreCount = 0;
	}

	setQuestion (question) {
		this.checkingAnswer = false;
		this.isCorrect = null;
		this.currentAnswer = '';
		this.currentQuestion = question;
	}

	endStore() {
		this.checkingAnswer = false;
		this.isCorrect = null;
		this.currentAnswer = '';
		this.currentQuestion = {};
	}

	resetScore() {
		this.mistakes = 0;
		this.scoreCount = 0;
	}

	setCurrentAnswer (currentAnswer) {
		this.currentAnswer = currentAnswer;
	}

	setCheckingAnswer (isChecking) {
		this.checkingAnswer = isChecking;
	}

	setScore(score) {
		this.mistakes = score.mistakes;
		this.scoreCount = score.scoreCount;
	}

	setAnswerValidity (isCorrect) {
		this.isCorrect = isCorrect;
	}

	importQuiz (quiz) {
		this.quiz = quiz;
	}

	getState () {
		return {
			question: this.currentQuestion,
			currentAnswer: this.currentAnswer,
			checkingAnswer: this.checkingAnswer,
			isCorrect: this.isCorrect,
			mistakes: this.mistakes,
			scoreCount: this.scoreCount
		};
	}

	emitChange () {
		this.emit('change');
	}

	listen (callback) {
		this.on('change', callback);
	}

	unlisten (callback) {
		this.removeListener('change', callback);
	}

}

let quizStore = new QuizStore();

dispatcher.register(function (action) {
	if (action.type === 'COUNTRIES_DATA') {
		// quizStore.setQuestion(action.payload.question);

	} else if (action.type === 'NEW_QUESTION') {
		quizStore.setQuestion(action.payload.question);
		// quizStore.quiz.getQuestion();
	} else if (action.type === 'NEW_ANSWER') {
		quizStore.setCurrentAnswer(action.payload.currentAnswer);

	} else if (action.type === 'CHECKING_ANSWER') {
		quizStore.setCheckingAnswer(action.payload.checkingAnswer);

	} else if (action.type === 'ANSWER') {
		quizStore.setAnswerValidity(action.payload.isCorrect);
		quizStore.setScore(action.payload.score);

	} else if (action.type === 'QUIZ_END') {
		quizStore.endStore();
	} else if (action.type === 'QUIZ_RESET') {
		quizStore.resetScore();

	} else {
		// do nothing
		return;
	}

	quizStore.emitChange();
});

export default quizStore;
