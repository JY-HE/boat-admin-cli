import simpleGit from 'simple-git'; // 用于执行git命令
import pc from 'picocolors';
import createLogger from 'progress-estimator'; // 估算进度和剩余时间
import logSymbols from 'log-symbols';
import boxen from 'boxen';
import gradientString from 'gradient-string'; // 用于在终端中创建渐变色文本
import { WIN_PLATFORM } from './constants.js';

const logger = createLogger(
    WIN_PLATFORM
        ? {}
        : {
              spinner: {
                  interval: 140,
                  frames: ['🚶 ', '🏃 '],
              },
          }
);

const gitOptions = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
    // timeout: {
    //   block: 60000
    // }
};

export const clone = async (repo, projectName, options) => {
    const git = simpleGit(gitOptions);
    try {
        console.log(`项目下载自：${pc.cyan(repo)}`);
        const gitCloneFunction = git.clone(repo, projectName, options);
        await logger(gitCloneFunction, '下载耗时: ', {
            estimate: 7000,
        });
    } catch (err) {
        console.log(logSymbols.error, pc.red(err));
        process.exit(1);
    }

    const welcomeMessage = gradientString('cyan', 'magenta').multiline(
        'Hello! 欢迎使用 @pureadmin/cli'
    );
    const boxenOprions = {
        padding: 1,
        margin: 1,
        borderColor: 'cyan',
        borderStyle: 'round',
    };
    console.log(boxen(welcomeMessage, boxenOprions));

    // 模板使用提示
    console.log(` ${isShowEmoji('🎉')} 已成功创建项目 ${pc.cyan(projectName)}`);
    console.log(` ${isShowEmoji('⬇')}  运行下面命令将它跑起来\n`);
    console.log(` cd ${pc.cyan(projectName)}`);
    console.log(' pnpm install');
    console.log(' pnpm dev');
};
