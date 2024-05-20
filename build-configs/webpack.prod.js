const DotenvWebpackPlugin = require("dotenv-webpack");
const path = require("path");

module.exports = {
  mode: "production",
  plugins: [
    new DotenvWebpackPlugin({
      path: path.resolve(__dirname, "../.env.prod"),
    }),
  ],
};
