## How to create and setup a Webpack + Typescript Project
1. Create the **src folder** with a typescript file
2. Initialized a npm project with the command
```
npm init -y
```
3. Install developer dependencies such as
```
npm i -D typescript ts-loader webpack webpack-cli webpack-node-externals
```
4. Initialized the **typescript file** using the command, if you don't have typescript installed globally you need to usignt the follow command
```
./node_modules/.bin/tsc --init
```
4.1. In case you have typescript downloaded globally just use the command
```
tsc --init
```
5. A **tsconfig.json file** will be generated
7. Inside the file just change the **target** and **module** lines
```
    "target": "ES6",
    "module": "ES2015"
```
6. Create a **webpack.config.js file** to setup the configuration to load and compile the code using typescript.
7. Write the next configuration, but i can't see changes i just can run command to generate code and then run the server
```
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development', //could be production or development
  entry: './src/app.ts',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      include: [path.resolve(__dirname, 'src')],
      exclude: /node_modules/
    }]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
};
```

8. In case I am rendering a view from the dist file, which means I have an html as a view that I want to generate the code and compile each time I modified my code I can use the **webpack-dev-server** setting for this I need to install the package
```
npm i -D webpack-dev-server
```
9. After I installed the module I need to add the following configuration
```
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      include: [path.resolve(__dirname, 'src')],
      exclude: /node_modules/
    }]
  },
  devServer: { //se utiliza para cuando quiere renderizar una vista, tengo un html dentro de dist
    devMiddleware: { //generar codigo cuando compila
      writeToDisk: true
    },
    static: {
      directory: path.join(__dirname, 'dist')
    },
    port: 3000
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
```
10. Ok, since we have seen what we can do, we can use nodemon as a pluggin for webpack which allows us to be able to see each changes we did to our code. It is going to modified and generate the new code and compile it for us using the **nodemon plugin**, We are going to use the following package
```
npm i -D nodemon-webpack-plugin
```
11. After we had the package installed we are going to use the next configuration
```
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      include: [path.resolve(__dirname, 'src')],
      exclude: /node_modules/
    }]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new NodemonPlugin()
  ]
};
```
### Packae.json 'Scripts' of the Typescript + Webpack
```
"scripts": {
  "build": "webpack", // ---> build the project for production, put the app in single file in the dist folder ready for production
  "start": "node .",
  "normalDev": "start http://localhost:3000 && nodemon .", // ---> Old verson without nodemon pluggin it does not generate new code in dev mode
  "dev": "start http://localhost:3000 && webpack --watch", // --> watch for changes and generate new code in dev mode in dist folder
  "dev-serve": "webpack-dev-server", // ---> Only works if i want to render a view (html) inside dist folder
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

## Setup commitizen for standard commits to my repositories
