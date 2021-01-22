const path = require("path");

const HTMLWebpackPlugin = require("html-webpack-plugin");

const BUILD_DIR = path.resolve(__dirname, "dist");
const SOURCE_DIR = path.resolve(__dirname, "src");

module.exports = (_, { mode }) => {
  isProd = mode === "production";

  return {
    devServer: {
      contentBase: BUILD_DIR,
      historyApiFallback: true,
      host: "0.0.0.0",
    },
    devtool: "inline-source-map",
    entry: path.resolve(SOURCE_DIR, "index.tsx"),
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/",
              },
            },
          ],
        },
      ],
    },
    output: {
      filename: "main.js",
      path: BUILD_DIR,
      publicPath: isProd ? "" : "/",
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: path.resolve(SOURCE_DIR, "index.html"),
      }),
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
  };
};
