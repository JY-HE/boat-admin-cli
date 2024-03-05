import { chooseTemplate } from './prompt.js';
import { templates } from './constants.js';
import { clone } from './clone.js';
import { checkNpmVersion } from './check.js';
import { version, name as npmName } from './constants.js';

export const download = async (projectName, templateName, isDownloadForGithub = false) => {
    const run = async name => {
        // 获取模板详情
        const { giteeUrl, githubUrl, branch } = templates[name];
        const downloadUrl = isDownloadForGithub ? githubUrl : giteeUrl;

        // 并行执行 - 下载模板和检查脚手架版本
        Promise.all([
            clone(downloadUrl, projectName, ['-b', `${branch}`]),
            checkNpmVersion(version, npmName),
        ]).then(res => {
            res[1] && console.log(res[1]);
        });
    };

    if (templateName) {
        run(templateName);
    } else {
        const template = await chooseTemplate();
        console.log('🚀 ~ download.js:10 ~ template:', template);
        run(template);
    }
};
