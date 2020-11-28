const path = require("path");

module.exports = {
    entry: "./src/content/index.ts",
  
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
  
    module: {
     rules: [{ test: /\.ts?$/, loader: "awesome-typescript-loader" }],
    },
    
  mode: "development",

  output: {
    filename: "bundle.content.js",
    path: path.join(__dirname, "./extension/dist/content"),
  },

  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};