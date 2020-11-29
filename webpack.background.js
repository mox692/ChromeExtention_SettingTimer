const path = require("path");

module.exports = {
    entry: "./src/background/background.ts",
  
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
  
    module: {
      rules: [{ test: /\.ts?$/, loader: "awesome-typescript-loader" }],
    },
    
  mode: "development",
  
  devtool: 'cheap-module-source-map',

  output: {
    filename: "bundle.background.js",
    path: path.join(__dirname, "./extension/dist/background"),
  },

  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};