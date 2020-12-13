const path = require("path");

module.exports = {
  entry: "./src/content/contents.ts",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  module: {
    rules: [{ test: /\.ts?$/, loader: "awesome-typescript-loader" }],
  },

  mode: "production",
  // modeをprodにするか、devtoolのflagを変えないと、extensionではerrorが発生する

  output: {
    filename: "bundle.contents.js",
    path: path.join(__dirname, "./extension/dist/content"),
  },

  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};
