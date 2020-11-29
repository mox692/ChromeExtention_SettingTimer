const path = require("path");

module.exports = {
  entry: "./src/popup/popup.ts",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  module: {
    rules: [{ test: /\.ts?$/, loader: "awesome-typescript-loader" }],
  },

  mode: "production",
  // modeをprodにするか、devtoolのflagを変えないと、extensionではerrorが発生する
  // devtool: 'cheap-module-source-map',

  output: {
    filename: "bundle.popup.js",
    path: path.join(__dirname, "./extension/dist/popup"),
  },

  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};
