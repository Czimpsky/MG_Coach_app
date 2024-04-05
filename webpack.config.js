const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        "index": "./src/index.js",
        "kontakt": "./src/kontakt.js",
        "zawodnicy": "./src/zawodnicy.js",
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
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: true
        }),
        new HtmlWebpackPlugin({
            template: "./src/kontakt.html",
            inject: true,
            chunks: ['kontakt'],
            filename: 'kontakt.html'
        }),
        new HtmlWebpackPlugin({
            template: "./src/sezon.html",
            inject: true,
            chunks: ['sezon'],
            filename: 'sezon.html'
        }),
        new HtmlWebpackPlugin({
            template: "./src/zawodnicy.html",
            inject: true,
            chunks: ['zawodnicy'],
            filename: 'zawodnicy.html'
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