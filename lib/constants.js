import fs from 'fs-extra';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

export const { name, version } = packageJson;

export const templates = {
    admin: {
        giteeUrl: 'https://github.com/JY-HE/Vue3-Vite-TS-Template.git', // gitee模板下载地址
        githubUrl: 'https://github.com/JY-HE/Vue3-Vite-TS-Template.git', // github模板下载地址
        description: 'vue3模板工程项目',
        branch: 'main',
    },
};

export const WIN_PLATFORM = false;

export const REGISTER = {
    npm: 'https://registry.npmjs.org/',
    taobao: 'https://registry.npmmirror.com/',
};
