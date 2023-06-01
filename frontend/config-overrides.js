// config-overrides.js
const { override } = require('customize-cra');

const supportMjs = () => (webpackConfig) => {
  webpackConfig.module.rules.push({
    type: 'javascript/auto',
    test: /\.mjs$/,
    use: [],
  });
  return webpackConfig;
};

module.exports = override(supportMjs());
