const child_process = require('child_process');

const getGitTimestamp = file => {
    return new Promise((resolve, reject) => {
        const git = child_process.spawn('git', ['log', '--format=%at', file], {});
        const output = [];
        git.stdout.on('data', data => {
            output.push(
                ...data
                    .toString()
                    .split('\n')
                    .filter(s => !!s.length)
            );
        });
        git.stderr.on('data', error2 => {});
        git.on('close', () => {
            {
                resolve([+output[0] * 1e3, +output[output.length - 1] * 1e3]);
            }
        });
    });
};

getGitTimestamp('./blog/2022-vscode-auto-theme.md').then(v => {
    v.forEach(v => {
        console.log(new Date(v));
    })
});