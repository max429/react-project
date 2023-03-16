const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ]
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, './build')
        },
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.css'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            favicon: "./src/images/eng.png"
        })
    ]
}
