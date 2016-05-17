var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  devServer: {
    historyApiFallback: true,
    inline: true,
    progress: true,
    contentBase: './app',
    port: 8080,
    proxy: {
      '/ui/*': {
        target: 'http://192.168.56.101',
        secure: false,
        headers: {
          'Cookie': 'JSESSIONID=ac7a2e635a5d908a4346f8cffcb4b0308025f20ba890e86012bd5644baa71723; _SID_=30c209f27c6115a33041981875371990d00cd90fc2f1d5a2b4816979465a3145'
        }
      }
    }
  },
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'app/main.jsx')
  ],
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'app'),
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.js[x]?$/,
        include: path.resolve(__dirname, 'app'),
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  ]
};
