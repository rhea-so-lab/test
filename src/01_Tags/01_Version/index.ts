import fs from 'fs';
import path from 'path';

export = function (_argv: string[]): void {
	const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', 'package.json'), { encoding: 'utf-8' }));
	console.info(`${packageJson.name} v${packageJson.version}`);
}