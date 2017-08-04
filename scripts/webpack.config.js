const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const WriteFilePlugin = require('write-file-webpack-plugin');
const autoprefixer = require('autoprefixer');

const appRoot = process.cwd();

const isProduction = process.env.NODE_ENV === 'production';
const env = {
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        HTTPS: JSON.stringify(process.env.HTTPS || 'false')
    }
}

const paths = {
    appSrc: path.resolve(appRoot, 'app'),
    appBuild: path.resolve(appRoot, 'extension/dist'),
    appEntery: glob.sync(path.resolve(appRoot, 'app/!(_)*.js?(x)'))
        .reduce((ret, file) => {
            ret[path.basename(file).replace(/\.jsx?$/, '')] = isProduction ?
                file : [
                    require.resolve('./webpackHotDevClient'),
                    file
                ];

            return ret;
        }, {})
}

const webpackConfig = {
    devtool: isProduction ? undefined : 'cheap-module-source-map',
    entry: paths.appEntery,
    output: {
        path: paths.appBuild,
        pathinfo: true,
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].bundle.js',
        publicPath: './dist/'
    },
    resolve: {
        modules: ['node_modules', appRoot],
        extensions: ['.js', '.json']
    },

    module: {
        strictExportPresence: true,
        rules: [ // nothing
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                use: [{
                    options: {
                        formatter: eslintFormatter,
                    },
                    loader: 'eslint-loader',
                }, ],
                include: paths.appSrc
            },
            {
                exclude: [/\.json$/, /\.(js|jsx)$/, /\.s[ac]ss$/, /\.css$/],
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[hash:8].[ext]'
                }
            }, {
                test: /\.(js|jsx)$/,
                include: paths.appSrc,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }, {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'iOS 7',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                })
                            ]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },

    plugins: isProduction ? [
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin(env),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                comparisons: false,
                warnings: false
            },
            output: {
                comments: false,
                ascii_only: true
            }
        })
    ] : [
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin(env),
        new WriteFilePlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    performance: {
        hints: false,
    }
}

module.exports = webpackConfig;
