const path = require('path');

const clientConfig = {
  mode: 'development',
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
};


const serverConfig = {
  mode: 'development',
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
    'utf-8-validate':'utf-8-validate'
  },
};


module.exports = [clientConfig, serverConfig]