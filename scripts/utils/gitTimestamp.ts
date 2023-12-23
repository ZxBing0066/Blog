import fs from 'fs';
import { spawn } from 'child_process';
import chalk from 'chalk';

const getFsTimestamp = (file: string) => {
    return [Math.round(fs.statSync(file).birthtimeMs), Math.round(fs.statSync(file).mtimeMs)] as [number, number];
};

const getGitTimestamp = (file: string): Promise<[number, number]> => {
    return new Promise(resolve => {
        const git = spawn('git', ['log', '--format=%at', file], {});
        const output: string[] = [];
        let error: any = null;
        git.stdout.on('data', data => {
            output.push(
                ...data
                    .toString()
                    .split('\n')
                    .filter((s: string) => !!s.length)
            );
        });
        git.stderr.on('data', error => {
            error = error;
        });
        git.on('close', () => {
            if (!error) {
                resolve([+output[output.length - 1] * 1000, +output[0] * 1000]);
            } else {
                console.warn(chalk.yellow(`failed to get git timestamp for: ${file}, fallback to fs timestamp`));
                resolve(getFsTimestamp(file));
            }
        });
    });
};

export default getGitTimestamp;
