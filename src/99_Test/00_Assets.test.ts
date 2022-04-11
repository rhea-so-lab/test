import { exec } from 'child_process';
import { expect } from 'chai';

export function execute(command: string, callback: Function): void {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(error);
        }

        if (stderr) {
            console.error(stderr);
        }

        callback(stdout);
    });
};

it('99_Do not work when getting invalid tag', (done) => {
    execute('node dist/index.js -1234567890qwertyuiop', (stdout: string) => {
        expect(stdout.length).to.be.equal(0);
        done();
    });
});