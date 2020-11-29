const path = require("path");

module.exports = {
    entry: "./src/content/contents.ts",
  
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
  
    module: {
     rules: [{ test: /\.ts?$/, loader: "awesome-typescript-loader" }],
    },
    
    mode: "development",
    // modeをprodにするか、devtoolのflagを変えないと、extensionではerrorが発生する
    devtool: 'cheap-module-source-map',

  output: {
    filename: "bundle.contents.js",
    path: path.join(__dirname, "./extension/dist/content"),
  },

  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};