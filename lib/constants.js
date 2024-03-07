import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { dirname, resolve } from 'path';

export const getProjectInfo = async () => {
    // 获取当前模块文件的 URL
    const __filename = fileURLToPath(import.meta.url);
    // 通过路径解析工具获取当前模块所在的目录的绝对路径
    const __dirname = dirname(__filename);
    // 获取根目录的绝对路径
    const rootDir = resolve(__dirname, '..');
    // 构建 package.json 文件的绝对路径
    const filePath = resolve(rootDir, 'package.json');
    let name = '';
    let version = '';
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const packageJson = JSON.parse(data);
        name = packageJson.name || '';
        version = packageJson.version || '';
    } catch (err) {
        console.error('🚀 ~ Error reading file:', err);
    }
    return { name, version };
};

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
