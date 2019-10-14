/* eslint-disable @typescript-eslint/no-var-requires, node/no-missing-require, @typescript-eslint/explicit-function-return-type, node/no-extraneous-require */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

const isEnvironmentDevelopment = process.env.NODE_ENV === 'development';
const isEnvironmentProduction = process.env.NODE_ENV === 'production';

/**
 * 生成css loader的配置
 * @param {*} cssOptions 选项
 * @param {*} preProcessor 预处理器
 * @returns {any} 配置
 */
function getStyleLoaders(cssOptions, preProcessor) {
  const loaders = [
    isEnvironmentDevelopment && require.resolve('style-loader'),
    isEnvironmentProduction && {
      loader: MiniCssExtractPlugin.loader,
      // options: shouldUseRelativeAssetPaths ? { publicPath: '../../' } : {},
    },
    {
      loader: 'css-modules-typescript-loader',
      options: {
        mode: process.env.CI ? 'verify' : 'emit',
      },
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          // eslint-disable-next-line global-require
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            flexbox: 'no-2009',
          }),
        ],
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    // 单独对于sass-loader
    if (preProcessor === 'sass-loader') {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: {
          // 厉害，要给跪系列，这脑洞，估计也就我了吧
          // functions: {
          //   // 提供给scss的自定义函数
          //   'get($keys)': function(keys) {
          //     return toSass(keys, sassVars);
          //   },
          // },
        },
      });
    } else {
      loaders.push(require.resolve(preProcessor));
    }
  }
  return loaders;
}

module.exports = {
  mode: isEnvironmentDevelopment ? 'development' : 'production',
  // Change to your "entry-point".
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx', '.json'],
    alias: {},
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        enforce: 'pre',
        include: /src/,
        use: {
          loader: require.resolve('eslint-loader'),
          options: {
            // eslint-disable-next-line global-require
            formatter: require('eslint-friendly-formatter'),
            eslintPath: require.resolve('eslint'),
            emitError: true,
            emitWarning: true,
            failOnWarning: true,
            failOnError: true,
          },
        },
      },
      {
        oneOf: [
          {
            // Include ts, tsx, js, and jsx files.
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          // {
          //   // Preprocess our own .css files
          //   // This is the place to add your own loaders (e.g. sass/less etc.)
          //   // for a list of loaders, see https://webpack.js.org/loaders/#styling
          //   test: /\.css$/,
          //   exclude: /node_modules/,
          //   use: ['style-loader', 'css-loader'],
          // },
          {
            // Preprocess 3rd party .css files located in node_modules
            test: /\.css$/,
            include: /node_modules/,
            use: ['style-loader', 'css-loader'],
          },
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use a plugin to extract that CSS to a file, but
          // in development "style" loader enables hot editing of CSS.
          // By default we support CSS Modules with the extension .module.css
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
            }),
          },
          // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
          // using the extension .module.css
          {
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              modules: true,
              // getLocalIdent: getCSSModuleLocalIdent,
            }),
          },
          // Opt-in support for SASS (using .scss or .sass extensions).
          // Chains the sass-loader with the css-loader and the style-loader
          // to immediately apply all styles to the DOM.
          // By default we support SASS Modules with the
          // extensions .module.scss or .module.sass
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
              },
              'sass-loader',
            ),
          },
          // Adds support for CSS Modules, but using SASS
          // using the extension .module.scss or .module.sass
          {
            test: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                modules: true,
                // getLocalIdent: getCSSModuleLocalIdent,
              },
              'sass-loader',
            ),
          },
          // Opt-in support for LESS (using .less extensions).
          // Chains the less-loader with the css-loader and the style-loader
          // to immediately apply all styles to the DOM.
          // By default we support LESS Modules with the
          // extensions .module.less or .module.less
          {
            test: lessRegex,
            exclude: lessModuleRegex,
            use: [
              ...getStyleLoaders({
                importLoaders: 2,
              }),
              {
                loader: 'less-loader',
                options: {},
              },
            ],
          },
          // Adds support for CSS Modules, but using SASS
          // using the extension .module.less or .module.less
          {
            test: lessModuleRegex,
            use: [
              ...getStyleLoaders({
                importLoaders: 2,
                modules: true,
                // getLocalIdent: getCSSModuleLocalIdent,
              }),
              {
                loader: 'less-loader',
                options: {},
              },
            ],
          },

          {
            test: /\.(eot|otf|ttf|woff|woff2)$/,
            use: 'file-loader',
          },
          {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            issuer: {
              test: /\.(jsx|tsx|js|ts)?$/,
            },
            use: ['@svgr/webpack', 'url-loader'],
          },
          {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader',
          },

          {
            test: /\.(jpg|png|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  // Inline files smaller than 10 kB
                  limit: 10 * 1024,
                  name: 'static/media/[name].[hash:8].[ext]',
                },
              },
              {
                loader: 'image-webpack-loader',
                options: {
                  mozjpeg: {
                    enabled: false,
                    // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                    // Try enabling it in your environment by switching the config to:
                    // enabled: true,
                    // progressive: true,
                  },
                  gifsicle: {
                    interlaced: false,
                  },
                  optipng: {
                    optimizationLevel: 7,
                  },
                  pngquant: {
                    quality: '65-90',
                    speed: 4,
                  },
                },
              },
            ],
          },
          {
            test: /\.html$/,
            use: 'html-loader',
          },
          {
            test: /\.(mp4|webm)$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 10000,
              },
            },
          },
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
  },
};
/* eslint-enable */
