import fs from 'fs';

const filePath = process.argv[2];

if (!filePath) throw new Error('No file path provided');

const fileContent = fs.readFileSync(filePath, 'utf-8');

const lines = fileContent.split('\n');

let frontmatterMark = false,
    codeMark = false;

(() => {
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/^---+\s*$/.test(line)) {
            frontmatterMark = !frontmatterMark;
        } else if (/^```.*$/.test(line)) {
            codeMark = !codeMark;
        } else if (/^\s*#+\s/.test(line)) {
            // skip headers
        } else if (!frontmatterMark && !codeMark) {
            // const words = [...line.matchAll(/(?:[^`])\b([a-zA-Z_][^\s、，：。]*)/g)];
            const words = [...line.matchAll(/(?<=^|[^`])\b[a-zA-Z_][^\s、，：。]*/g)];
            if (words.length) {
                const phrases: [string, number, number][] = [];
                while (words.length) {
                    const word = words.shift()!;
                    const start = word.index!;
                    let end = word.index! + word[0].length;
                    while (words[0] && line.slice(word.index! + word[0].length, words[0].index).match(/^\s+$/)) {
                        const newWord = words.shift()!;
                        end = newWord.index! + newWord[0].length;
                    }
                    phrases.push([line.slice(start, end), start, end]);
                }
                const fragment: string[] = [];
                let startIndex = 0;
                for (const phrase of phrases) {
                    fragment.push(line.slice(startIndex, phrase[1]));
                    fragment.push('`' + phrase[0] + '`');
                    startIndex = phrase[2];
                }
                fragment.push(line.slice(phrases[phrases.length - 1][2]));
                console.log(line);
                console.log(fragment.join(''));
                lines[i] = fragment.join('');
            }
        }
    }
    fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
})();
