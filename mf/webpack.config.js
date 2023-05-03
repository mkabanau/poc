const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');
const deps = require('./package.json').dependencies;
module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3002,
  },
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    // plugins: [new TsconfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      exposes: {
        './Home': './src/Home',
        // './Courses': './src/Courses',
        // './Course': './src/Course',
        // './CourseIndex': './src/CourseIndex',
        './CoursesMF': './src/CoursesMF',
        './ClaimsMF':'./src/ClaimsMF'
      },
      shared: [
        {
          react: { 
            singleton: true, 
            requiredVersion: deps.react 
          },
          'react-dom': { 
            singleton: true,
            requiredVersion: deps["react-dom"]
           },
          moment: { singleton: true },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
