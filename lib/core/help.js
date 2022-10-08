const program = require("commander");

const helpFn = () => {
  program.option("-k", "a kk cli option");
  program.option(
    "-d --dest <dest>",
    "a destination folder, 例如: -d /src/components"
  );
  program.on("--help", function () {
    console.log("");
    console.log("Other:");
    console.log("other options~");
  });
};
module.exports = helpFn;
