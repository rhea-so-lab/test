import { Interpreter } from '../Interpreter';

Interpreter.eventEmitter.on('-v', require('./01_Version'));
Interpreter.eventEmitter.on('--version', require('./01_Version'));

Interpreter.eventEmitter.on('', require('./02_Help'));
Interpreter.eventEmitter.on('-h', require('./02_Help'));
Interpreter.eventEmitter.on('--help', require('./02_Help'));