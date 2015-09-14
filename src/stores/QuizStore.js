import dispatcher from '../core/dispatcher';
import { EventEmitter } from 'events';


class QuizStore extends EventEmitter {

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
