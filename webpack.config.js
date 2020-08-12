// const HtmlWebPackPlugin = require("html-webpack-plugin");

// const htmlWebpackPlugin = new HtmlWebPackPlugin({
//   template: "./app/index.html",
//   filename: "./index.html"
// });

module.exports = {
  entry: "./app.index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  },
 mode: "development"
};