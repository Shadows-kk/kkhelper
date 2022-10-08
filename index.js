#!/usr/bin/env node
// 命令行指令
const program = require("commander");

const helpFn = require("./lib/core/help");
const createCommands = require("./lib/core/create");

// 查看版本
program.version(require("./package.json").version);

// 在 --help 中增加自己的option
helpFn();
// 创建其他指令
createCommands();

// process.argv属性会返回一个[数组]其中包含当 Node.js 进程被启动时传入的命令行参数。
program.parse(process.argv);

// console.log("程独秀");
