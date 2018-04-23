const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");// fit webpack v4

const path = require('path');
const glob = require('glob');

const srcDir = path.resolve(__dirname, 'src');// src的绝对路径
const distDir = path.resolve(__dirname, 'dist');// dist的绝对路径
var nodeModPath = path.resolve(__dirname, 'node_modules');// node_modules的绝对路径

console.log('srcDir_' + srcDir);
console.log('distDir_' + distDir);
console.log('nodeModPath_' + nodeModPath);


var entries = function () {
    var jsDir = path.resolve(srcDir, 'js')
    var entryFiles = glob.sync(jsDir + '/*.{js,jsx}')
    var map = {};

    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    }
    return map;
}
console.log('>>>>>' + JSON.stringify(entries()));


// const extractCSS = new ExtractTextPlugin('src/css/index.css');
// var cssLoader = extractCSS.extract(['css']);

var html_plugins = function () {
    var entryHtml = glob.sync(srcDir + '/**/*.html')
    var r = []
    var entriesFiles = entries()
    for (var i = 0; i < entryHtml.length; i++) {
        var filePath = entryHtml[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        var conf = {
            // template: 'html!' + filePath,
            template: filePath,
            filename: filename + '.html'
        }
        //如果和入口js文件同名
        if (filename in entriesFiles) {
            conf.inject = 'body'
            conf.chunks = ['vendor', filename]
        }
        
        r.push(new HtmlWebpackPlugin(conf))
    }
    return r
}



module.exports = {
    entry: entries(),
    output: {
        path: distDir,
        filename: 'src/js/[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', 'json', '.css'], //需要编译的文件类型
    },
    devServer: {
        contentBase: distDir,
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /(\.js)$/, ///必须满足的条件（正则表达式，不要加引号，匹配要处理的文件）
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "es2015"
                        ]
                    }
                },
                exclude: /node_modules/,  ///不处理此目录下的文件
            },
            {
                test: path.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            },
            // {
            //     test: /(\.css)$/,
            //     use: extractCSS.extract(['css-loader', 'postcss-loader'])
            // },
            {
                test: /\.css$/,
                ///这个顺序一定不能变，1.'style-loader' -> 2.MiniCssExtractPlugin.loader -> 3.'css-loader'
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader', 
                ]
            }
        ]
    },
    plugins: [
        ...html_plugins(),
        // extractCSS,
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            // filename: "[name].css",
            filename: 'src/css/[name].css',
            chunkFilename: "[id].css"
        }),
        new CleanWebpackPlugin(['dist'])
    ]
}
