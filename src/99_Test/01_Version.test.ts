import { execute } from "./00_Assets.test";

import fs from 'fs';
import path from 'path';
import { expect } from 'chai';

describe('01_Version', () => {
    it('01_Shortcut', (done) => {
        execute('node dist/index.js -v', (stdout: string) => {
            const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), { encoding: 'utf-8' }));
            stdout = stdout.replace(/\n/g, '');
            expect(stdout).to.be.equal(`${packageJson.name} v${packageJson.version}`);
            done();
        });
    });

    it('02_FullName', (done) => {
        execute('node dist/index.js --version', (stdout: string) => {
            const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), { encoding: 'utf-8' }));
            stdout = stdout.replace(/\n/g, '');
            expect(stdout).to.be.equal(`${packageJson.name} v${packageJson.version}`);
            done();
        });
    });
});