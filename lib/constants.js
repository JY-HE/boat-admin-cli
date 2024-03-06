import fs from 'fs-extra';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

export const { name, version } = packageJson;

export const templates = {
    vue: {
        giteeUrl: 'https://gitee.com/yiming_chang/vue-pure-admin.git', // gitee模板下载地址
        githubUrl: 'git@github.com:pure-admin/vue-pure-admin.git', // github模板下载地址
        description: 'vue-boat-admin完整版本', // 模板描述
        branch: 'main', // 分支
    },
    admin: {
        giteeUrl: 'https://gitee.com/yiming_chang/pure-admin-thin.git',
        githubUrl: 'git@github.com:pure-admin/pure-admin-thin.git',
        description: 'vue-pure-admin非国际化精简版本',
        branch: 'main',
    },
};

export const WIN_PLATFORM = false;

export const REGISTER = {
    npm: 'https://registry.npmjs.org/',
    taobao: 'https://registry.npmmirror.com/',
};
