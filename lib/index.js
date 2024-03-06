#! /usr/bin/env node

import { cac } from 'cac';
import { inputProjectName, chooseDownloadOrigin } from './prompt.js';
import { version } from './constants.js';
import { isExistsFile } from './createDir.js';
import { download } from './download.js';

const cli = cac('boat'); // 创建一个命令行应用程序实例，指定调用该应用程序的名称为 boat
cli.version(version); // 设置版本号，可通过 --version 标志来获取应用程序的版本信息

cli.command('create [projectName]', '创建一个新项目')
    .option('-f, --force', '如果目标文件存在，则强制覆盖')
    .action(async (projectName, cmd) => {
        // #region ------------------------- 未输入项目名称，提示输入项目名 -------------------------
        if (!projectName) {
            projectName = await inputProjectName();
        }
        // #endregion ---------------------- 未输入项目名称，提示输入项目名 - END -------------------

        // #region ------------------------- 判断项目名目录是否存在 -------------------------
        const isExists = await isExistsFile(projectName, cmd);
        if (isExists) return;
        // #endregion ---------------------- 判断项目名目录是否存在 - END -------------------

        // #region ------------------------- 选择模板下载源 -------------------------
        const isDownloadForGithub = await chooseDownloadOrigin();
        // #endregion ---------------------- 选择模板下载源 - END -------------------
        download(projectName, undefined, isDownloadForGithub);
    });

cli.parse();
