var path = require('path');
// var webpack = require('webpack');

module.exports = {
  entry: './components/index.jsx',
  output: {
    path: path.resolve(__dirname, 'app/js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loaders: ['babel-loader?{"presets":["es2015","react"]}'],
        exclude: /node_modules/
      }
    ]
  },
  devtool: "cheap-eval-source-map"
  // resolveLoader: {
  //   root: [
  //     path.join(__dirname, 'node_modules'),
  //   ],
  // },
  // resolve: {
  //   root: [
  //     path.join(__dirname, 'node_modules'),
  //   ],
  // }
};


// module.exports = config;
