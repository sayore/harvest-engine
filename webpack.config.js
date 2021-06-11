const path = require('path');

var globalMode = 'development';
//var globalMode = 'production';

const clientConfig = {
  mode: globalMode,
  entry: './client/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    
  },
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {
    //"detect-collisions":"detect-collisions",
    "socket.io-client":"io",
    "pixi.js":"PIXI" // WORKS DONT CHANGE
  }
};


const serverConfig = {
  mode: globalMode,
  target: 'node16.2',
  entry: './server/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    libraryTarget: "commonjs2"
  },
  externals: {
    express: 'express',
    bufferutil: 'bufferutil',
    'socket.io': 'socket.io',
    'utf-8-validate':'utf-8-validate',
    'better-sqlite3': 'commonjs better-sqlite3'
  },
};


module.exports = [clientConfig, serverConfig]