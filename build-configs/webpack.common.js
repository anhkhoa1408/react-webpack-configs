const { DllReferencePlugin } = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.join(__dirname, "../src/index.tsx"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "../build"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
      },
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React webpack configs",
      template: path.join(__dirname, "../public/index.html"),
    }),
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.min.css",
      ignoreOrder: true,
    }),
    new DllReferencePlugin({
      context: path.resolve(__dirname, "..", "build"),
      manifest: path.resolve(__dirname, "..", "build", "vendor-manifest.json"),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "../build"),
    },
    hot: true,
    historyApiFallback: true,
    port: 3000,
    client: {
      progress: true,
      logging: "none",
    },
  },
  resolve: {
    extensions: ["*", ".ts", ".tsx", ".js", ".jsx", ".json"],
  },
};
