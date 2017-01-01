var webpack = require('webpack');  
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var content = {
  paths: [
    '/'
  ]
}

module.exports = {  
    entry: {
      'main': "./js/app.js"
    },
    debug: true,
    devtool: 'source-map',
    output: {
        path: __dirname + '/static',
        filename: "bundle.js",
        libraryTarget: 'umd'
    },
    module: {
        preLoaders: [
          {
            test: /(\.js$|\.jsx$)/, 
            exclude: /node_modules/, 
            loader: "eslint-loader"
          }
        ],
        loaders: [
            { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.woff2?$/, loader: "url-loader?limit=25000" },
            { test: /\.(eot|svg|ttf)?$/, loader: "file-loader" },
            { test: /\.scss$/, loader: "style!css!sass" }
        ]
    },
    eslint: {
      configFile: '.eslintrc.yml'
    },
    plugins: [
      new StaticSiteGeneratorPlugin('main', content.paths, content),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
};
