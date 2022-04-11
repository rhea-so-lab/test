import { EventEmitter } from 'events';

export class Interpreter {
	public static eventEmitter: EventEmitter = new EventEmitter();

	public static translate(): void {
		process.argv.shift(); // NVM Path
		process.argv.shift(); // Source Code Path

		const tag = process.argv.shift();
		if (tag) {
			if (this.eventEmitter.listenerCount(tag) > 0) {
				this.eventEmitter.emit(tag, process.argv);
			}
		} else {
			this.eventEmitter.emit('');
		}
	}
}