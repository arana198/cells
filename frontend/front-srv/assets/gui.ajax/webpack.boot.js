// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

const config = {
    mode: process.env.NODE_ENV === 'production'?'production':'development',
    entry: './res/js/core/PydioBootstrap.js',
    output: {
        path: path.resolve(__dirname, "res/dist/boot"),
        filename: 'pydio.boot.min.js',
        library: {
            name: 'PydioBootstrap',
            type: 'window',
            export: ['default']
        },
        clean: process.env.NODE_ENV === 'production'
    },
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
        new CompressionPlugin({
            test: /\.js(\?.*)?$/i,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: "babel-loader",
                options:{
                    compact: false,
                    plugins: [
                        "@babel/syntax-dynamic-import",
                        ["@babel/plugin-proposal-decorators", { "legacy": true }]
                    ],
                    presets: [
                        ["@babel/preset-react"],
                        [
                            "@babel/preset-env",
                            {
                                "modules": false
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.less$/i,
                use: ["style-loader", "css-loader", "less-loader"],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset",
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        fallback: {
            "fs": false
        },
    },
    ignoreWarnings:[
        {file: /index/}
    ],
    watch: process.env.NODE_ENV !== 'production'
}

module.exports = () => {
    return config;
};
