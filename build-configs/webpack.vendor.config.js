const { DllPlugin } = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, { loader: "css-loader", options: { sourceMap: true } }],
      },
    ],
  },
  entry: {
    vendor: ["react", "react-dom", "typescript", "web-vitals"],
  },
  output: {
    filename: "vendor.bundle.js",
    path: path.join(__dirname, "..", "build"),
    library: "vendor_lib",
  },
  plugins: [
    new DllPlugin({
      name: "vendor_lib",
      path: path.join(__dirname, "..", "build", "vendor-manifest.json"),
    }),
  ],
};
