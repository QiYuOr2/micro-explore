const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // html所在路径
    compress: true, // 是否压缩
    port: 3001, // 端口
    hot: true, // 热部署
    open: true, // 打包完成后自动打开网页
  },
};
