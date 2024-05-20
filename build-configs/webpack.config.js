const { merge } = require("webpack-merge");
const commonConfigs = require("./webpack.common.js");
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();

module.exports = ({ env }) => {
  const envConfigs = require(`./webpack.${env}.js`);
  return merge(commonConfigs, envConfigs);
};
