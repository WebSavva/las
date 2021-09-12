const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pages = ["index", "catalog", "categories", "testimonials", "contacts"];

module.exports = {
  entry: pages.reduce((config, page) => {
    config[page] = `./src/scripts/${page}.js`;
    return config;
  }, {}),
  mode: "production",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: ["./src/assets"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ].concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `src/templates/${page}.html`,
          filename: `${page}.html`,
          chunks: [page],
          title: `LAS | ${(page === 'index' ? 'Homepage' : page).toUpperCase()}`,
          favicon: './src/assets/img/logo.svg'
        })
    )
  ),
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
      },
    ],
  },
};
