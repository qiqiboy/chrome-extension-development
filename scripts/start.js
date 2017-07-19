process.env.NODE_ENV = 'development';

const ora = require('ora');
const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const config = require('./webpack.config');
const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const detect = require('detect-port');
var fs = require('fs-extra');
const _ = require('lodash');
const path = require('path');
const pkg = require('../package.json');

const DEFAULT_PORT = pkg.port || 3666;
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

    runDevServer(compiler);
}

function runDevServer(compiler) {
    const devServer = new WebpackDevServer(compiler, {
         headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, HEAD, DELETE'
        },
        clientLogLevel: 'none',
        hot: true,
        publicPath: config.output.publicPath,
        quiet: true,
        https: pkg.https === true,
        watchOptions: {
            ignored: /node_modules/
        },
        overlay: {
            warnings: true,
            errors: true
        },
        host: 'localhost'
    });

    // Launch WebpackDevServer.
    devServer.listen(DEFAULT_PORT, (err, result) => {
        if (err) {
            return console.log(err);
        }

        clearConsole();
        console.log(chalk.cyan('正在启动服务...'));
        console.log();
    });
}

function run() {
    fs.emptyDirSync(config.output.path);
    setupCompiler();
}

detect(DEFAULT_PORT).then(port => {
    if (port === DEFAULT_PORT) {
        return run(port);
    }

    spinner.fail('端口（' + chalk.yellow(DEFAULT_PORT) + '）被占用！');
    console.log('请修改package.json中的 port 更换端口号，或者关闭占用的程序后再试。');
});
