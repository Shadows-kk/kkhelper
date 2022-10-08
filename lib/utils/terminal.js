/**
 * 执行终端命令相关代码
 **/

// 用child_process模块开启一个子进程 如执行npm命令就是开启一个新的子进程
const { spawn } = require("child_process");

const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    // 获取新开启的进程
    const childProcess = spawn(...args);
    // 将新进程流中的打印信息放到当前进程中来（需要在当前进程中展示打印结果）
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr); //错误信息
    // 监听进程是否执行完成
    childProcess.on("close", () => {
      resolve();
    });
  });
};
module.exports = {
  commandSpawn,
};
