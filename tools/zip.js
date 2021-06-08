const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const archiver = require("archiver");
const aresConfig = require("../ares.config");
const distPath = path.resolve(__dirname, "../" + aresConfig.outputDir);
console.log(distPath);
const zipPath = path.resolve(distPath, "./publish.zip");

//如果已存在 zip 文件，删除它
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
  console.log(chalk.yellow("已删除文件" + zipPath));
}

// 创建压缩控制器
var archive = archiver("zip", {
  zlib: { level: 9 }, // Sets the compression level.
});
archive.on("warning", (err) => {
  if (err.code === "ENOENT") {
    console.log(chalk.yellow(err));
  } else {
    throw err;
  }
});
archive.on("error", (err) => {
  throw err;
});

// 追加一个文件夹内的内容
console.log(chalk.yellow("\n压缩文件......"));
archive.directory(distPath, false);
// 通过管道方法将压缩内容存输出到目标路径
var output = fs.createWriteStream(zipPath);
output.on("close", () => {
  console.log(chalk.yellow("\n压缩成功>>>>" + archive.pointer() / 1000000 + "M" + "\n"));
  console.log(chalk.green("\n压缩包: " + zipPath));
});
output.on("end", function () {
  console.log("Data has been drained");
});
// 通过管道方法将输出流存档到文件
archive.pipe(output);
//完成归档
archive.finalize();

// 从流中追加文件
// var file1 = __dirname + '/file1.txt';
// archive.append(fs.createReadStream(file1), { name: 'file1.txt' });

// 从字符串追加文件
// archive.append('string cheese!', { name: 'file2.txt' });

// 从缓冲区追加文件
// var buffer3 = Buffer.from('buff it!');
// archive.append(buffer3, { name: 'file3.txt' });

// 追加一个文件
// archive.file('file1.txt', { name: 'file4.txt' });

// 追加一个文件到文件名
// archive.directory('subdir/', 'new-subdir');

// append a file from string
// archive.append('string cheese!', { name: 'file2.txt' });
