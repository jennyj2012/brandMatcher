const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/brandMatcher.js',

	output: { 
		path: __dirname, filename: './dist/bundle.js',  }
}