process.env.NODE_ENV = 'production';

const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const config = require('./webpack.config');
const ora = require('ora');

// Create the production build and print the deployment instructions.
function build() {
    var packText = '启动生产环境打包压缩...';
    var spinner = ora().start();
    var startTime = Date.now();
    var timer
    var logProgress = function(stop) {
        var text = packText + '已耗时：' + ((Date.now() - startTime) / 1000).toFixed(3) + 's';

        if (stop) {
            clearTimeout(timer);
            spinner.succeed(chalk.green(text));
        } else {
            spinner.text = chalk.cyan(text);

            timer = setTimeout(logProgress, 100);
        }
    };

    fs.emptyDirSync(config.output.path);

    webpack(config).run((err, stats) => {
        logProgress(true); //停止
        console.log();
        if(err) {
            spinner.fail(chalk.red('编译失败！'));
            console.log((err.message || err));
            process.exit(1);
        }

        const messages = formatWebpackMessages(stats.toJson({}, true));

        // If errors exist, only show errors.
        if (messages.errors.length) {
            spinner.fail(chalk.red('编译失败！！'));
            console.log();
            console.log(messages.errors.join('\n\n'));

            process.exit(1);
        }

        // Show warnings if no errors were found.
        if (messages.warnings.length) {
            spinner.warn(chalk.yellow('编译有警告产生：'));
            console.log();
            console.log(messages.warnings.join('\n\n'));
            console.log();

            // Teach some ESLint tricks.
            console.log(
                '搜索相关' +
                chalk.underline(chalk.yellow('关键词')) +
                '以了解更多关于警告产生的原因.'
            );
            console.log(
                '如果要忽略警告, 可以将 ' +
                chalk.cyan('// eslint-disable-next-line') +
                ' 添加到产生警告的代码行上方'
            );

            process.exit(1);
        }

        spinner.succeed(chalk.green('项目打包完成，可以发布插件(目录：'+ path.dirname(config.output.path) +')'));
        console.log();
    });

    logProgress();
}


build();
