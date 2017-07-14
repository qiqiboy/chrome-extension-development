process.env.NODE_ENV = 'development';

const ora = require('ora');
const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const config = require('./webpack.config');
const chalk = require('chalk');
const webpack = require('webpack');
const _ = require('lodash');
const path = require('path');

const spinner = ora('webpack启动中...').start();

const cwd = process.cwd();

function setupCompiler() {
    let compiler;
    try {
        compiler = webpack(config);
    } catch (err) {
        spinner.fail(chalk.red('编译失败'));
        console.log();
        console.log(err.message || err);
        console.log();
        process.exit(1);
    }

    compiler.watch({
        ignored: /node_modules/
    }, (err, stats) => {
        // Print watch/build result here...
        // console.log(stats);
    });

    compiler.plugin('invalid', function() {
        clearConsole();
        spinner.text = '重新编译中...';
    });

    compiler.plugin('done', function(stats) {
        clearConsole();

        var messages = formatWebpackMessages(stats.toJson({}, true));

        if (!messages.errors.length && !messages.warnings.length) {
            spinner.succeed(chalk.green('编译通过！'));
            const assets = stats.compilation.assets;
            _.each(assets, ret => {
                if (/\.map$/.test(ret.existsAt) === false) {
                    spinner.succeed(path.relative(cwd, ret.existsAt));
                }
            });
        }

        // If errors exist, only show errors.
        if (messages.errors.length) {
            spinner.fail(chalk.red('编译失败！！'));
            console.log();
            console.log(messages.errors.join('\n\n'));
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
        }

        console.log();
        spinner.text = 'webpack运行中...';
        spinner.render().start();
    });
}

setupCompiler();
