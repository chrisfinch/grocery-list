const path = require('path');
const nodeExternals = require('webpack-node-externals');

const server = {
    entry: './src/server/app.ts',
    target: 'node',
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        mainFiles: ['index', 'module', 'main']
    },
    output: {
        filename: 'server-bundle.js',
        path: path.resolve(__dirname, 'built'),
        libraryTarget: 'umd'
    },
    devtool: 'inline-source-map',
    mode: 'development'
};

const client = {
    entry: './src/client/mount.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'client-bundle.js',
        path: path.resolve(__dirname, 'public/javascripts')
    },
    devtool: 'inline-source-map',
    mode: 'development'
};

module.exports = [server, client];