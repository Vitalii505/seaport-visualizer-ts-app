const path = require('path');
const srcPath = path.resolve(__dirname, 'src');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: srcPath
    },
    devServer: {
        static: srcPath,
        compress: true,
        port: 9000
    }
};
