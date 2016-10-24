var CopyWebpackPlugin = require('copy-webpack-plugin')
var path = require('path')

module.exports = {
  entry: ['./src/app.js'],
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.es6$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'] // shorthand for 'babel-loader?presets[]=es2015'. Only works when there's a single loader
        }
      },
      // {
      //   test: /\.ts/,
      //   loaders: ['ts-loader'],
      //   exclude: /node_modules/
      // },
      {
        test: /web_modules\/chosen\/.+\.(jsx|js)$/,
        loader: 'imports?jQuery=jquery,$=jquery,this=>window'
      },
      {
        // test: /node_modules\/eonasdan-bootstrap-datetimepicker\/build\/js\/bootstrap-datetimepicker.min.js$/,
        test: /web_modules\/datetime-picker\/bootstrap-datetimepicker.js/,
        loader: 'imports?jQuery=jquery,$=jquery,this=>window'
      },
      {
        test: /src\/js\/view-logic\.es6$/,
        loaders: ['imports?jQuery=jquery,$=jquery,this=>window', 'babel-loader?presets[]=es2015']
      },
      {
        // test: /node_modules\/bootstrap\/dist\/js\/.+\.(jsx|js)$/,
        test: /.+\.(jsx|js)$/,
        // http://reactkungfu.com/2015/10/integrating-jquery-chosen-with-webpack-using-imports-loader/
        loader: 'babel-loader!imports?jQuery=jquery,$=jquery,this=>window'
      },
      {
        test: /node_modules\/moment\/locale/,
        loader: 'imports?jQuery=jquery,$=jquery,this=>window'
      },
      {
      test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, loader:'url?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: 'src/index.html', to:'index.html'}
    ])
  ],
  resolve: {

    //places to look for dependencies
    modulesDirectories: ['node_modules', 'web_modules'],

    // lets us specify what kind of file types we can process without specifically giving them a file extension
    // require('./logger') instead of require('./logger.es6')
    extensions: ['', '.js', '.es6', '.css', '.scss', '.ts']
  }
}