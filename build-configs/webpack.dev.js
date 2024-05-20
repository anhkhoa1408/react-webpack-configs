const DotenvWebpackPlugin = require("dotenv-webpack");
const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  plugins: [
    new DotenvWebpackPlugin({
      path: path.resolve(__dirname, "../.env.staging"),
    }),
  ],
};
