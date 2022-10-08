const path = require("path");
const fs = require("fs");

const ejs = require("ejs");

// 编译
const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`;
  const templatePath = path.resolve(__dirname, templatePosition);
  // console.log(templatePath);
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};
// 路径不存在时，递归创建文件夹
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true;
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName);
      return true;
    }
  }
};
// 写入文件
const writeToFile = (path, content) => {
  fs.promises.writeFile(path, content);
};

module.exports = {
  compile,
  writeToFile,
  createDirSync,
};
