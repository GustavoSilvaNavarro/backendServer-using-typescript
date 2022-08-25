const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      include: [path.resolve(__dirname, 'src')],
      exclude: /node_modules/
    }]
  },
  devServer: { //se utiliza para cuando quiere renderizar una vista, tengo un html dentro de dist
    devMiddleware: { //generar codigo cuando compila
      writeToDisk: true
    },
    static: {
      directory: path.join(__dirname, 'dist')
    },
    port: 3000
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new NodemonPlugin()
  ]
};