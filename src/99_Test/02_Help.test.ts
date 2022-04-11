import { execute } from "./00_Assets.test";

import { expect } from 'chai';

describe('02_Help', () => {
    it('01_Shortcut', (done) => {
        execute('node dist/index.js -h', (stdout: string) => {
            expect(stdout.length).to.be.greaterThan(0);
            done();
        });
    });

    it('02_FullName', (done) => {
        execute('node dist/index.js --help', (stdout: string) => {
            expect(stdout.length).to.be.greaterThan(0);
            done();
        });
    });

    it('03_Empty String', (done) => {
        execute('node dist/index.js', (stdout: string) => {
            expect(stdout.length).to.be.greaterThan(0);
            done();
        });
    });
});