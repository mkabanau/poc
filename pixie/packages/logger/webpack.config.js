const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'logger.js',
    library: {
      name: "logger",
      type: "umd"
    },
  },
};