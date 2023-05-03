const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require("webpack")
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.ts',
        worker: './src/web-worker.ts',
        sw: './src/service-worker.ts'
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        // alias: {
        //     process: "process/browser"
        // },
        fallback: {
            "events": require.resolve("events/"),
            // "stream": require.resolve("stream-browserify"),
            // "buffer": require.resolve("buffer"),
            // "url": require.resolve("url/"),
            // "path": require.resolve("path-browserify") ,
            // "util": require.resolve("util/") 
            // "crypto": require.resolve("crypto-browserify") ,
            // "zlib": require.resolve("browserify-zlib"),
            // "os": require.resolve("os-browserify/browser"),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
        }),
        // new webpack.ProvidePlugin({
        //     Buffer: ['buffer', 'Buffer'],
        // }),
        // new webpack.ProvidePlugin({
        //     process: 'process/browser',
        // }),
        new NodePolyfillPlugin(),

        // new BundleAnalyzerPlugin()
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        runtimeChunk: 'single',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
};