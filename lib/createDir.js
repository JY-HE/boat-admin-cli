import fs from 'fs-extra'; // 文件读取
import path from 'path';
import trash from 'trash'; // 用于删除文件
import pc from 'picocolors'; // 用于终端输出文字颜色
import ora from 'ora'; // 用于在终端显示加载指示器
import { isOverwriteDir } from './prompt.js';

const spinner = ora();

export const isExistsFile = async (projectName, cmd) => {
    // 获取当前工作目录
    const cwd = process.cwd();
    // 拼接得到项目目录
    const targetDirectory = path.join(cwd, projectName);
    // 判断目录是否存在
    if (fs.existsSync(targetDirectory)) {
        // 判断是否使用 --force 参数
        if (cmd.force) {
            // 将同名项目删除
            await trash([targetDirectory]);
            return false;
        } else {
            const isOverwrite = await isOverwriteDir();
            if (!isOverwrite) {
                console.log(pc.green('取消成功'));
                return true;
            } else {
                try {
                    spinner.start('删除中...');
                    await trash([targetDirectory]);
                    spinner.succeed(`${pc.green('成功删除')} ${pc.gray(projectName)}`);
                } catch (error) {
                    spinner.fail(`${pc.red('覆盖失败, 请手动删除重名目录')}`);
                    process.exit(1);
                }
                return false;
            }
        }
    } else {
        return false;
    }
};
