const program = require("commander");
const {
  createProjectAction,
  addCpnAction,
  addPageAndRoute,
  addStoreAction,
} = require("./actions");
const createCommands = () => {
  program
    .command("create <project> [others...]")
    .description("clone repository into a folder")
    .action(createProjectAction);

  program
    .command("addcpn <name>")
    .description(
      "add vue component，例如：kkhelper addcpn HelloCpn [-d src/components]"
    )
    .action((name) => {
      let options = program.opts();
      addCpnAction(name, options.dest || "src/components");
    });
  program
    .command("addpage <name>")
    .description(
      "add vue pages，例如：kkhelper addpage HelloPage [-d src/components]"
    )
    .action((name) => {
      let options = program.opts();
      addPageAndRoute(name, options.dest || "src/pages");
    });
  program
    .command("addstore <name>")
    .description(
      "add vue store,例如：kkhelper addstore user [-d src/store/modules]"
    )
    .action((name) => {
      let options = program.opts();
      addStoreAction(name, options.dest || "src/store/modules");
    });
};

module.exports = createCommands;
