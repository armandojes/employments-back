const path = require('path')
const webpack = require('webpack')
const env = process.env.NODE_ENV
const externals = require('webpack-node-externals')

const config = {
  entry: ['regenerator-runtime/runtime', path.resolve(__dirname, './source/index.js')],
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'index.js',
    libraryTarget: 'commonjs'
  },
  mode: env,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: '/(node_modules)/',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  node: '10'
                }
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify(env)
    })
  ],
  resolve: {
    extensions: ['.json', '.js'],
    alias: {
      helpers: path.resolve(__dirname, './source/helpers'),
      core: path.resolve(__dirname, './source/core'),
      middlewares: path.resolve(__dirname, './source/middlewares')
    }
  },
  externals: [externals()],
  target: 'node'
}

module.exports = config
