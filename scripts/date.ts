// Update the dates for the blogs
import fs from 'fs';
import getGitTimestamp from './utils/gitTimestamp';

const formatDateString = (ts: number) => {
    const date = new Date(ts);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateStr = `${year}-${month}-${day}`;
    return dateStr;
};

const getFileContent = (file: string) => {
    return fs.readFileSync(file, 'utf-8');
};

const setFileContent = (file: string, content: string) => {
    fs.writeFileSync(file, content, 'utf-8');
};

const updateBlogDate = async (file: string) => {
    const [created, updated] = await getGitTimestamp(file);
    const dateStr = formatDateString(created);
    let content = getFileContent(file);
    if (!/^---$/m.test(content)) {
        content = `---\n---\n` + content;
    }
    if (!/^date\:\s\d{4}-\d{1,2}-\d{1,2}/m.test(content)) {
        content = content.replace(/^---$/m, `---\ndate: ${dateStr}`);
    }
    if (!/^lastUpdate\:\s\d{4}-\d{1,2}-\d{1,2}/m.test(content)) {
        content = content.replace(/^---$/m, `---\nlastUpdate: ${formatDateString(updated)}`);
    } else {
        content = content.replace(
            /^lastUpdate\:\s\d{4}-\d{1,2}-\d{1,2}.*$/,
            `lastUpdate: ${formatDateString(updated)}`
        );
    }
    setFileContent(file, content);
};

const updateBlogDates = async (dir: string) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.endsWith('.md')) {
            await updateBlogDate(dir + '/' + file);
        }
    }
};

updateBlogDates('./blog');
