const webpack = require('webpack');
const path = require('path');

const isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './build');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    context: sourcePath,
    entry: {
        app: './index.tsx'
    },
    output: {
        path: outPath,
        filename: "latest.js"
        // filename: isProduction ? '[contenthash].js' : '[hash].js',
        // chunkFilename: isProduction ? '[name].[contenthash].js' : '[name].[hash].js'
    },
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            app: path.resolve(__dirname, 'src/')
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    !isProduction && {
                        loader: 'babel-loader',
                        options: {plugins: ['react-hot-loader/babel']}
                    },
                    'ts-loader'
                ].filter(Boolean)
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[local]__[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-import')(),
                                require('postcss-preset-env')(),
                                require('postcss-flexbugs-fixes')(),
                                require('autoprefixer')(),
                            ]
                        }
                    }
                ]
            },
            {test: /\.html$/, use: 'html-loader'},
            {test: /\.(a?png|svg)$/, use: 'url-loader?limit=10000'},
            {
                test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
                use: 'file-loader'
            }
        ]
    },
    // optimization: {
    //     splitChunks: {
    //         name: true,
    //         cacheGroups: {
    //             commons: {
    //                 chunks: 'initial',
    //                 minChunks: 2
    //             },
    //             vendors: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 chunks: 'all',
    //                 filename: isProduction ? 'vendor.[contenthash].js' : 'vendor.[hash].js',
    //                 priority: -10
    //             }
    //         }
    //     },
    //     runtimeChunk: true
    // },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            DEBUG: false
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
    devServer: {
        contentBase: sourcePath,
        inline: true,
        historyApiFallback: true,
        stats: 'minimal',
        clientLogLevel: 'warning',
        port: 8080,
        overlay: true,
        open: true,
        hot: true
    },
    devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map'
};
