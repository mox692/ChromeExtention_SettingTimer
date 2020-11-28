const path = require("path");

module.exports = {
    entry: "./src/popup/index.ts",
  
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
  
    module: {
      rules: [{ test: /\.ts?$/, loader: "awesome-typescript-loader" }],
    },
    
  mode: "development",

  output: {
    filename: "bundle.popup.js",
    path: path.join(__dirname, "./extention/dist/popup"),
  },

  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};