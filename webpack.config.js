const path = require("path");
const webpack = require("webpack");
const packageData = require("./package.json");

module.exports = {
  entry: {
    // Point "entry" to scripts you want to be CLI-eligible.
    barfday: "./src/barfday.ts",
    postloop: "./src/postloop.ts",
    macroConsult: "./src/macroConsult.ts",
    hoboDay: "./src/hoboDay.ts",
    mannyRoll: "./src/mannyRoll.ts",
    mannyBreakfast: "./src/mannyBreakfast.ts",
    testFile: "./src/testFile.ts",
    vanDuffelFarm: "./src/vanDuffelFarm.ts",
  },
  mode: "production",
  devtool: false,
  output: {
    // Change the final string here to the name you want your script to use in mafia.
    path: path.resolve(__dirname, "KoLmafia", "scripts", packageData.name),
    filename: "[name].js",
    libraryTarget: "commonjs",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        // exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  optimization: {
    // Disable compression because it makes debugging more difficult for KolMafia
    minimize: false,
  },
  performance: {
    // Disable the warning about assets exceeding the recommended size because this isn't a website script
    hints: false,
  },
  plugins: [],

  externals: {
    // Add any ASH scripts you would like to use here.
    kolmafia: "commonjs kolmafia",
    "canadv.ash": "commonjs canadv.ash",
  },
};
