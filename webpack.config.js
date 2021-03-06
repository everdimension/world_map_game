var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var nodeModulesPath = path.join(__dirname, 'node_modules');
var srcPath = path.join(__dirname, 'src');
var buildPath = path.join(__dirname, 'build');

var isProduction = process.env.NODE_ENV === 'production';
var publicPath = isProduction ? '/' : '/build';

var htmlWebpackPluginConfig = {
	inject: true,
	template: path.join(srcPath, 'index.html'),
	title: 'Map App'
};

if (isProduction) {
	htmlWebpackPluginConfig.googleAnalytics = {
		trackingId: 'UA-67832593-1',
		pageViewOnLoad: true
	};
}


console.log('htmlWebpackPluginConfig', htmlWebpackPluginConfig.googleAnalytics);


var config = {
	entry: {
		app: path.join(srcPath, 'app.js'),
		vendor: ['react', 'flux']
	},
	resolve: {
		root: srcPath
	},
	output: {
		path: buildPath,
		filename: '[name].bundle.js',
		publicPath: publicPath
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: nodeModulesPath, loader: 'babel' },
			{ test: /\.css$/, exclude: nodeModulesPath, loader: 'style!css' },
			{ test: /\.less$/, loader: 'style!css!autoprefixer!less'}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin(htmlWebpackPluginConfig)
	],

	debug: true,
	devtool: 'eval-cheap-module-source-map'

	// devServer: {
	// 	port: 3000
	// }
};

module.exports = config;
