/* global require, module, __dirname */
/* eslint-disable space-unary-ops */

/**
 * Plugins used by webpack bundler
 */
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.common.js');
const plugins = [];

/**
 * Writes bundles to distribution folder.
 *
 * @type {var}
 */
const WriteFileWebpackPlugin = new (require('write-file-webpack-plugin'))();
plugins.push(WriteFileWebpackPlugin);

/**
 * Copys entry html to distribution folder
 *
 * @type {var}
 */
const HtmlWebpackPlugin = new (require('html-webpack-plugin'))({
    title: 'My App',
    filename: 'index.html',
    template: path.resolve(__dirname, '../src/index.html')
});
plugins.push(HtmlWebpackPlugin);

/**
 * Source maps
 * @type {var}
 */
const SourceMapsPlugin = new webpack.SourceMapDevToolPlugin({
    test: /\.js/i,
    exclude: /(node_modules|bower_components)/i,
    filename: `sourcemaps/[name].js.map`
});
plugins.push(SourceMapsPlugin);

/**
 * Cleans distribution folder.
 * @type {[type]}
 */
const CleanWebpackPlugin = new (require('clean-webpack-plugin'))([ 'dist' ]);
plugins.push(CleanWebpackPlugin);

/**
 * Selects the specific lodash functions.
 *
 * @type {var}
 */
const LodashWebpackPlugin = new (require('lodash-webpack-plugin'))({ currying: true, flattening: true, placeholders: true });
plugins.push(LodashWebpackPlugin);

/**
 * Optimizes bundle size
 *
 * @type {var}
 */
//const AggressiveSplittingPlugin = new webpack.optimize.AggressiveSplittingPlugin({
//    minSize: 30000,
//    maxSize: 50000
//});
// plugins.push(AggressiveSplittingPlugin);

/**
 * Writes final css to file
 */
const ExtractCssWebpackPlugin = new (require('mini-css-extract-plugin'))({
    chunkFilename: 'css/[name].css',
    filename: 'css/[name].css'
});
plugins.push(ExtractCssWebpackPlugin);

/**
 * Copies files from the specified locations to the corresponding destinations.
 */
const CopyFilesWebpackPlugin = new (require('copy-webpack-plugin'))([
    { from: path.resolve(__dirname, '../static/images'), to: 'images' }
]);
plugins.push(CopyFilesWebpackPlugin);

/**
 * Makes build-time env vars available to the client-side as constants
 */
const envPlugin = new webpack.DefinePlugin({
    'process.env.API_HOST': JSON.stringify(process.env.API_HOST),
    'process.env.API_PORT': JSON.stringify(process.env.API_PORT),
    'process.env.BASE_PATH': JSON.stringify(process.env.BASE_PATH),
    'process.env.API_VERSION': JSON.stringify(process.env.API_VERSION),
    'process.env.TOPO_API_HOST': JSON.stringify(process.env.TOPO_API_HOST),
    'process.env.TOPO_API_PORT': JSON.stringify(process.env.TOPO_API_PORT),
    'process.env.TOPO_BASE_PATH': JSON.stringify(process.env.TOPO_BASE_PATH),
    'process.env.TOPO_API_VERSION': JSON.stringify(process.env.TOPO_API_VERSION)
});
plugins.push(envPlugin);

/**
 * Replaces any @@insights in the html files with config.insightsDeployment value.
 * This handles the path being either insights or insightsbeta in the esi:include.
 */
const HtmlReplaceWebpackPlugin = new(require('html-replace-webpack-plugin'))([{
    pattern: '@@insights',
    replacement: config.insightsDeployment
}]);
plugins.push(HtmlReplaceWebpackPlugin);

module.exports = { plugins };
