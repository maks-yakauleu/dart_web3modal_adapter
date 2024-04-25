// @ts-ignore
const path = require('path');
const webpack = require('webpack');

module.exports = [
    {
        mode: "production",
        devtool: "source-map",
        entry: {
            adapterLib: {
                import: "./ts_src/dart_web3modal_adapter.ts",
            },
        },
        plugins: [
            // Work around for Buffer is undefined:
            // https://github.com/webpack/changelog-v5/issues/10
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.(ts|js)?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
            ],
        },
        optimization: {
            mangleWasmImports: true,
            concatenateModules: true,
            flagIncludedChunks: true,
            mangleExports: true,
            minimize: true,
            minimizer: [(compiler: any) => {
                const TerserPlugin = require('terser-webpack-plugin');
                new TerserPlugin({
                    terserOptions: {
                        compress: {},
                    }
                }).apply(compiler);
            },],
        },
        performance: {
            hints: false,
            maxEntrypointSize: 1024000,
            maxAssetSize: 1024000
        },
        resolve: {
            extensions: [".ts", ".js"],
            // fallback: {
            //     "utils/scaffold": path.resolve(__dirname, 'node_modules/@web3modal/solana/dist/esm/src/utils/scaffold/index.js'),
            // },
            // alias: {
            //     '../utils/scaffold/': path.resolve(__dirname, 'node_modules/@web3modal/solana/dist/esm/src/utils/scaffold/index.js')
            // }
            // fallback: {
            //     "utils/scaffold": require.resolve(path.resolve(__dirname, 'node_modules/@web3modal/solana/dist/esm/src/utils/scaffold/index.js')), 
            // },
            // alias: {
            //     '../utils/scaffold/': path.resolve(__dirname, 'node_modules/@web3modal/solana/dist/esm/src/utils/scaffold/index.js')
            // },
            // alias: {
            //     '../utils/scaffold/': path.resolve(__dirname, 'node_modules/@web3modal/solana/dist/esm/src/utils/scaffold/index.js')
            // }
        },
        output: {
            filename: "dart_web3modal_adapter.min.js",
            path: path.resolve(__dirname, 'lib/src'),
            library: {
                name: "web3modal",
                type: "this",
            },
        }
    }
]