const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './app/javascripts/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    // path: path.resolve(__dirname, 'images'),
    // path: path.resolve(__dirname, 'images/entre'),
    filename: 'app.js'
  },

  plugins: [
    // Copy our app's index.html to the build folder.
      
    new CopyWebpackPlugin([
      { from: './tmp/Archive_006/' } ,
      { from: './app/setupbc.html', to: "setupbc.html" },
      { from: './app/showatrib.html', to: "showatrib.html" },
      { from: './app/javascripts/app.js', to: "app.js" }

      // { from: './app/' },
    ])
  ],
  module: {
    rules: [
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
      }
    ],
    loaders: [
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      } 
    ]
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
