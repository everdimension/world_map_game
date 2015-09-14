import dispatcher from '../core/dispatcher';
import { EventEmitter } from 'events';

class QuizStore extends EventEmitter {
	constructor(props) {
		super(props);
		this.quiz = {
			currentQuestion: {
				country: 'default africa'
			}
		};
	}

	importQuiz(quiz) {
		console.log('importing quiz');
		this.quiz = quiz;
	}

	getState() {
		return {
			question: this.quiz.currentQuestion || 'question'
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
		quizStore.importQuiz(action.payload.quiz);

	} else if (action.type === 'NEW_QUESTION') {
		quizStore.quiz.getQuestion();
	} else {
		// do nothing
		return;
	}

	quizStore.emitChange();
});

export default quizStore;
