const { DllReferencePlugin } = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "../src/index.tsx"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "../build"),
    chunkFilename: "[name].bundle.js",
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

    // Clean previous build
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["!vendor/*"],
    }),

    // Compress and minify css in one file
    new MiniCssExtractPlugin({
      filename: "style.min.css",
      ignoreOrder: true,
    }),

    // Only enable this plugin if project has many dependencies and slow to build
    new DllReferencePlugin({
      context: path.join(__dirname, "..", "build", "vendor"),
      manifest: path.join(__dirname, "..", "build", "vendor", "vendor-manifest.json"),
    }),
  ],
  performance: {
    hints: false,
  },
  devServer: {
    static: {
      // Path to static file in dev mode
      directory: path.join(__dirname, "../build"),
    },
    hot: true,

    // Enable this feature in single page application project because when another page is request beside basepath, server will return 404 not found
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
