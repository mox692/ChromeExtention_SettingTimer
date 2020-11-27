const path = require("path");
module.exports = {
    entry: "./src/index.ts",
  
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
  
    module: {
      rules: [{ test: /\.tsx?$/, loader: "awesome-typescript-loader" }],
    },

    output: {
      filename: "bundle.js",
      path: path.join(__dirname, "./dist"),
    },
    
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
  };
  