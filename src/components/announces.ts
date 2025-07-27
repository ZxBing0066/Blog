const announces = [
    '🧑🏻‍💻 少则精，多则广。',
    '⛵️ 认知为界，取舍为帆。',
    '✨ Less is more, more is more. ',
    '🚤 水能载舟，亦可赛艇。',
    '💰 何以解忧？唯有暴富。',
    // '🏞️ 生活不止眼前的苟且，还有诗和远方。',
    '🐶 PHP 是世界上最好的语言。'
];

export const getAnnounce = () => {
    return announces[Math.floor(Math.random() * announces.length)];
};
