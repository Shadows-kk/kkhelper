const { promisify } = require("util"); //将回调转化成promise
const path = require("path");
const fs = require("fs");

const download = promisify(require("download-git-repo")); //download-git-repo本身是哥异步回调
const open = require("open");

const { vueRepo } = require("../config/repo-config");
const { commandSpawn } = require("../utils/terminal");
const { compile, writeToFile, createDirSync } = require("../utils/utils");
// 创建项目的action
const createProjectAction = async (project) => {
  console.log("kkhelper helps you create a project~");
  // 1.clone项目 使用download-git-repo
  await download(vueRepo, project, { clone: true });
  // 2.执行 npm install
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  await commandSpawn(command, ["install"], { cwd: `./${project}` });
  // 3.执行 npm run serve
  await commandSpawn(command, ["run", "serve"], { cwd: `./${project}` });
  // 4.打开浏览器
  // open("http://localhost:8081/ ");
};
// 创建组件的action
const addCpnAction = async (name, dest) => {
  // 创建组件需要模版
  // 1.创建对应的ejs模版
  // 2.编译ejs模版得到result
  const result = await compile("vue-component.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });
  // 3.将result写入到.vue文件中，并放到对应的文件夹中
  const targetPath = path.resolve(dest, `${name}.vue`);
  // console.log(targetPath);
  writeToFile(targetPath, result);
};
// 创建页面和对应路由
const addPageAndRoute = async (name, dest) => {
  // 编译
  const pageResult = await compile("vue-component.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });
  const routerResult = await compile("vue-router.js.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });
  // 写入 先判断路径是否存在 不存在就递归创建
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest, name)) {
    const targetPagePath = path.resolve(targetDest, `${name}.vue`);
    const targetRouterPath = path.resolve(targetDest, "router.js");
    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRouterPath, routerResult);
  }
};
const addStoreAction = async (name, dest) => {
  // 编译
  const storeResult = await compile("vuex-store.js.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });
  const typesResult = await compile("vuex-types.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });
  // 写入 先判断路径是否存在 不存在就递归创建
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest, name)) {
    const targetPagePath = path.resolve(targetDest, `${name}.js`);
    const targetRouterPath = path.resolve(targetDest, "types.js");
    writeToFile(targetPagePath, storeResult);
    writeToFile(targetRouterPath, typesResult);
  }
};
module.exports = {
  createProjectAction,
  addCpnAction,
  addPageAndRoute,
  addStoreAction,
};
