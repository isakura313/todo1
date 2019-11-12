const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'code.js',
    path: path.resolve(__dirname, 'dist'),

  }
}