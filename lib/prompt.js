import inquirer from 'inquirer'; // 用于创建交互式命令行界面
import { templates } from './constants.js';

export const inputProjectName = async () => {
    const { projectName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: '请输入项目名称',
            default: 'vue-boat-admin',
        },
    ]);
    return projectName;
};

export const isOverwriteDir = async () => {
    const { isOverwrite } = await inquirer.prompt([
        {
            type: 'list',
            name: 'isOverwrite',
            message: '目标文件已存在，请选择操作',
            choices: [
                { name: '覆盖文件', value: true },
                { name: '取消', value: false },
            ],
        },
    ]);
    return isOverwrite;
};

export const chooseDownloadOrigin = async () => {
    const { chooseDownloadOrigin } = await inquirer.prompt([
        {
            type: 'list',
            name: 'chooseDownloadOrigin',
            message: '选择一个代码托管平台下载模板',
            choices: [
                { name: 'Gitee', value: false },
                { name: 'Github', value: true },
            ],
        },
    ]);
    return chooseDownloadOrigin;
};

export const chooseTemplate = async () => {
    let choices = [];
    Object.keys(templates).forEach((key, index) => {
        choices.push({ name: key, checked: index === 0 });
    });
    const { template } = await inquirer.prompt([
        {
            type: 'list',
            name: 'template',
            message: '请选择模板类型',
            choices: choices,
        },
    ]);
    return template;
};
