#!/usr/bin/env node
import { cac } from 'cac';
import logSymbols from 'log-symbols';
import pc from 'picocolors';
import figlet from 'figlet';
import Table from 'cli-table';
import { inputProjectName, chooseDownloadOrigin } from './prompt.js';
import { getProjectInfo, templates } from './constants.js';
import { isExistsFile } from './createDir.js';
import { download } from './download.js';
import { checkPureOptions } from './check.js';

const cli = cac('boat'); // 创建一个命令行应用程序实例，指定调用该应用程序的名称为 boat

const { version } = await getProjectInfo();
cli.version(version); // 设置版本号，可通过 --version 标志来获取应用程序的版本信息

// #region ------------------------- create 命令自定义创建项目 -------------------------
cli.command('create [projectName]', '创建一个自定义选项的新项目')
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

        // #region ------------------------- 执行下载操作 -------------------------
        download(projectName, undefined, isDownloadForGithub);
        // #endregion ---------------------- 执行下载操作 - END -------------------
    });
// #endregion ---------------------- create 命令自定义创建项目 - END -------------------

// #region ------------------------- list 命令查看模板类型 -------------------------
cli.command('list', '查看所有模板类型').action(() => {
    let table = new Table({
        head: ['Name', 'Description'],
        colWidths: [10, 40],
    });
    Object.keys(templates).forEach(key => {
        table.push([key, templates[key].description]);
    });
    console.log(table.toString());
});
// #endregion ---------------------- list 命令查看模板类型 - END -------------------

// #region ------------------------- help 命令 -------------------------
cli.help(() => {
    console.log(
        '\r\n' +
            figlet.textSync('boat', {
                font: '3D-ASCII',
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width: 80,
                whitespaceBreak: true,
            })
    );
    console.log(`运行 ${pc.cyan('boat <command> --help')} 查看有关命令的详细用法. \r\n`);
});
// #endregion ---------------------- help 命令 - END -------------------

// #region ------------------------- 无效命令监听 -------------------------
cli.on('command:*', () => {
    console.log(logSymbols.error, `无效的命令: ${cli.args.join(' ')}`);
    cli.outputHelp();
    process.exit(1);
});
// #endregion ---------------------- 无效命令监听 - END -------------------

checkPureOptions(cli);

cli.parse();
