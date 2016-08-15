module.exports = {
  entry: "./app/main.ts",
  output: {
    filename: "./dist/bundle.js"
  },

  resolve: {
    extensions: ["", ".ts", ".js"]
  },

  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
};