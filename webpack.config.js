const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        "index": "./src/index.js",
        "kontakt": "./src/kontakt.js",
        "sezon": "./src/sezon.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        // filename: "bundle.js",
        filename: "[name].[contenthash].bundle.js",
        clean: true
    },
    devtool: "source-map",
    devServer:{
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            chunks: ['index']
            // inject: true
        }),
        new HtmlWebpackPlugin({
            template: "./src/kontakt.html",
            filename: "kontakt.html",
            chunks: ['kontakt']
            // inject: true,
        }),
        new HtmlWebpackPlugin({
            template: "./src/sezon.html",
            filename: "sezon.html",
            chunks: ['sezon']
            // inject: true,
        }),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./src/assets/**",
                    to() {
                        return "assets/img/[name][ext]";
                    },
                }
            ],
       }),
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                // "style-loader"
                MiniCssExtractPlugin.loader, 
                "css-loader",
                "sass-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                ["autoprefixer"]
                            ]
                        }
                    }
                }
            ]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            } ,
        }]
    }
}