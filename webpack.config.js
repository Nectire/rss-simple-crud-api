const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-node",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
