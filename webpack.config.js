var path = require('path');

var webpack = require('webpack');

var packageData = require('./package.json');

var filename = [packageData.name, packageData.version, 'js'];


module.exports = {
    entry: path.resolve(__dirname, packageData.main), // input: main in package.json
    output: {
        path: path.resolve(__dirname, 'build'), // output: 'js'
        filename: filename.join('.'),
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }
      ]
    },
};
