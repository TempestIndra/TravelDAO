// webpack.config.js

const Dotenv = require('dotenv-webpack');

module.exports = {
  // ... other webpack config settings
  plugins: [
    new Dotenv(),
    // ... other plugins
  ],
};
