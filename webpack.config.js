const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: "./src/public/js/app.js",
	output: {
		path: path.resolve(__dirname, "src/public/dist"),
		filename: "js/bundle.js",
	},
	module: {
		rules: [{ test: /\.js$/, loader: "babel-loader" }],
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: "css-loader", options: { importLoaders: 1 } },
					"postcss-loader",
				],
			},
		],
	},
	plugins: [new MiniCssExtractPlugin({ filename: "css/bundle.css" })],
	// devServer: {
	// 	host: "192.168.1.84",
	// 	port: 80,
	// 	disableHostCheck: true,
	// },
};
