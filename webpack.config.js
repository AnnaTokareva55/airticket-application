const path = require("path");
const autoprefixer = require("autoprefixer");
const precss = require("precss");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    polyfill: "babel-polyfill",
    app: "./js/app.js"
  },
  context: path.resolve(__dirname, "src"),
  devServer: {
    publicPath: "/",
    port: 9000,
    contentBase: path.join(process.cwd(), "dist"),
    host: "localhost",
    historyApiFallback: true,
    noInfo: false,
    stats: "minimal",
    hot: true
  },
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        },
        test: /\.js$/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",

            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [precss, autoprefixer]
            }
          }
        ]
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "./style.css" }),
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "src/img"),
        to: path.resolve(__dirname, "dist/img")
      }
    ])
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js"
  },
  mode: "development"
};