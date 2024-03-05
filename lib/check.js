import axios from 'axios';
import pc from 'picocolors';
import logSymbols from 'log-symbols';
import semver from 'semver'; // 用于处理语义化版本号
import boxen from 'boxen'; // 用于在终端中创建带有边框的文本框
import { REGISTER, WIN_PLATFORM } from './constants.js';

/**
 * 根据win平台判断是否显示emoji
 * @param emoji emoji表情
 * @returns
 */
export const isShowEmoji = emoji => {
    return WIN_PLATFORM ? '' : emoji;
};

/**
 * 获取npm或taobao镜像对应的api
 * @param registerOrigin npm包信息来源
 * @returns
 */
export const getDefaultRegister = (registerOrigin = 'taobao') => {
    return REGISTER[registerOrigin];
};

/**
 * 获取npm包信息
 * @param npmName 当前npm包名
 * @param register npm提供的api地址
 * @returns
 */
export const getNpmInfo = async (npmName, register = getDefaultRegister()) => {
    const npmUrl = register + npmName;
    let res;
    try {
        res = await axios.get(npmUrl);
    } catch (err) {
        console.log(logSymbols.warning, `未发现${npmName}包，请检查是否发布到${register}`);
        process.exit(1);
    }
    return res;
};

/**
 * 获取npm包最新版本号
 * @param npmName 当前npm包名
 * @param register npm提供的api地址
 * @returns
 */
export const getNpmLatestVersion = async (npmName, register = getDefaultRegister()) => {
    const { data } = await getNpmInfo(npmName, register);
    return data['dist-tags'].latest;
};

/**
 * 判断当前npm包版本是否需要更新
 * @param currentVersion 当前版本号
 * @param npmName 当前npm包名
 */
export const checkNpmVersion = async (currentVersion, npmName) => {
    const latestVersion = await getNpmLatestVersion(npmName);
    if (semver.lt(latestVersion, currentVersion) || latestVersion === currentVersion) return;
    const dim = pc.dim;
    const magenta = pc.magenta;
    return boxen(
        `${isShowEmoji('🎉')} ${pc.yellow('哇~有更新!')} ${pc.red(currentVersion)} → ${pc.green(
            latestVersion
        )}\n${isShowEmoji('📄')} ${
            magenta('更新日志: ') + dim(`https://github.com/pure-admin/${npmName}/releases`)
        }\n${isShowEmoji('🚀')} ${
            dim('运行') + magenta(` npm i -g ${npmName}@latest `) + dim('升级到最新版脚手架')
        }`,
        { padding: 1, margin: 1, borderColor: 'cyan', borderStyle: 'round' }
    );
};
