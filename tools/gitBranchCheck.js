const chalk = require("chalk");

var exec = require("child_process").exec;
exec("git branch", function (err, stdout, stderr) {
  console.log(chalk.green(stdout));
  if (err) {
    console.log(stderr);
    process.exit(1);
  } else if (stdout.indexOf("* main") < 0) {
    console.log(chalk.red("该命令只允许在main分支运行！请切换到main分支再执行该命令！\n"));
    process.exit(1);
  }
});
