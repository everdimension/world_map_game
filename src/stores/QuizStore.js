import dispatcher from '../core/dispatcher';
import { EventEmitter } from 'events';

class QuizStore extends EventEmitter {
	constructor (props) {
		super(props);
		this.currentQuestion = {
			country: 'default africa'
		};
	}

	setQuestion (question) {
		this.currentQuestion = question;
	}

	importQuiz (quiz) {
		console.log('importing quiz');
		this.quiz = quiz;
	}

	getState () {
		return {
			question: this.currentQuestion || 'question'
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
		quizStore.setQuestion(action.payload.question);

	} else if (action.type === 'NEW_QUESTION') {
		quizStore.setQuestion(action.payload.question);
		// quizStore.quiz.getQuestion();
	} else {
		// do nothing
		return;
	}

	quizStore.emitChange();
});

export default quizStore;
