const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require("webpack")
module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
        index2: './src/index-runtime.js',
        //index3: './src/index-apollo-server.js' //polyfils for nodejs required
        index4: './src/index-yjs.js',
        index5: './src/index-ywebrtc.js',
        worker: './src/worker.js',
        sw: './src/sw.js',
        index6: "./src/index-bus.js"
    },
    //devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
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
        //new NodePolyfillPlugin(),

        //new BundleAnalyzerPlugin()

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
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: '@graphql-tools/webpack-loader',
                options: {
                    /* ... */
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    }

};