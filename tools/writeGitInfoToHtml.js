const exec = require("child_process").exec;
const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const aresConfig = require("../ares.config");
const htmlPath = path.resolve(__dirname, "../" + aresConfig.outputDir + "/index.html");
console.log(chalk.yellow("\n读取git信息"));
getBrachAndHash()
  .then((suc) => {
    write(suc);
  })
  .catch((err) => {
    console.log(chalk.red(err));
  });

function write(gitInfo) {
  gitInfo = `\n<!--gitInfo@${gitInfo}-->`;
  console.log(chalk.yellow("\n 追加 git 信息到 " + aresConfig.outputDir + "/index.html"));
  fs.appendFileSync(htmlPath, gitInfo);
  console.log(chalk.yellow("\n git 信息追加成功: " + chalk.green(gitInfo)));
}
function getBrachAndHash() {
  return new Promise((rs, rj) => {
    exec("git branch && git log -1", function (err, stdout, stderr) {
      if (err) {
        console.log(stderr);
        rj("");
      }
      let branchRg = /^\*(.+)/gim;
      let branchEx = branchRg.exec(stdout) || ["", ""];
      let branch = "branch:" + branchEx[1].trim();
      let hashRg = /^commit(.+)/gim;
      let hashEx = hashRg.exec(stdout) || ["", ""];
      let hash = "hash:" + hashEx[1].trim();
      let gitInfo = branch + "|" + hash;
      rs(gitInfo);
    });
  });
}
exports.getBrachAndHash = getBrachAndHash;
