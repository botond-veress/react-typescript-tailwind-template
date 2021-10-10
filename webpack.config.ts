import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const directories = {
  source: 'src',
  distribution: 'dist'
};

export default (env, { mode }): webpack.Configuration => {
  const production = mode === 'production';

  return {
    mode: production ? 'production' : 'development',
    devtool: production ? 'source-map' : 'eval',
    entry: {
      app: path.resolve(directories.source, 'index.tsx')
    },
    devServer: !production
      ? {
          compress: true,
          historyApiFallback: true,
          hot: true,
          host: '0.0.0.0',
          port: 3000
        }
      : undefined,
    output: {
      path: path.resolve(directories.distribution),
      filename: 'assets/scripts/[name].bundle.js',
      chunkFilename: 'assets/scripts/[id].chunk.js',
      clean: true
    },
    module: {
      rules: [
        {
          exclude: /node_modules/,
          loader: 'babel-loader',
          test: /\.tsx?$/,
          options: {
            plugins: production ? [] : ['react-refresh/babel']
          }
        },
        {
          test: /\.css$/,
          use: [production ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader']
        }
      ]
    },
    resolve: {
      alias: {
        '@': path.resolve(directories.source)
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(directories.source, 'index.html')
      }),
      ...(production
        ? [
            new MiniCssExtractPlugin({
              filename: 'assets/stylesheets/[name].css',
              chunkFilename: 'assets/stylesheets/[id].css'
            })
          ]
        : [new ReactRefreshWebpackPlugin()])
    ],
    optimization: {
      minimizer: [
        `...`,
        ...(production
          ? [
              new CssMinimizerPlugin({
                minimizerOptions: {
                  preset: ['default', { discardComments: { removeAll: true } }]
                }
              })
            ]
          : [])
      ]
    }
  };
};
