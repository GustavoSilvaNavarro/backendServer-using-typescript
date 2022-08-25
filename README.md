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
1. First install the package of commitizen using npm or yarn:
```
npm i -D commitizen
```

2. Make the repo comitizen friendly with the command: (Check commitizen docs)
```
commitizen init cz-conventional-changelog --save-dev --save-exact
```
3. To make a commit just use git cz and follow instructions after you did a git add .

## Setup prettier into my project
1. Install prettier as a dev dependency using the command:
```
npm i -D prettier
```
2. Create a folder for the prettier rules. The name will be **".prettierrc.json"**
3. Set the rules you prefer when you code in this example i used this configuration that I like.
```
{
  "tabWidth": 2,
  "singleQuote": true,
  "arrowParens": "avoid",
  "semi": true,
  "trailingComma": "es5"
}
```

## Setup Eslint into my project
1. Install the dev dependency for eslint with comand:
```
npm i -D eslint
```
2. Initialize a eslint project using the command:
```
npm init @eslint/config
```
3. Follow the instruction and anwser the question that eslint in asking you about the project to properly use the package. In this case I picked to follor **"standard rules"** for the project. At the end it will install a bunch of packages for your project.
4. After it is done tiwh the instalation it will create an **".eslintrc.json"** file with the configuration for the project it will look in JSON or javascript or yaml you picked which one you want to use. Eslint asked you this during the question.
5. Create a **".eslintignore"** file to avoid my build files and node modules files to be linted so I avoid this action using the .eslitignore. This will save some time when the eslint go and check the my code looking for errors.
6. Teh current eslint file till the momento would look like this:
```
{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": [
    "standard-with-typescript",
  ],
  "overrides": [
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
  }
}
```
7. Use prettir setup and config we need to install to plugin to be able to work with prettier and eslint, the dev dependencies are:
```
npm i -D eslint-config-prettier eslint-plugin-prettier
```
8. After setup prettier we need to start adding the configuration to be able to use our dev dependencies that we installed, We need to work in our **"eslint file"** and add the settings. The file will look like this:
```
{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended", // --> use eslint rules
    "standard-with-typescript",
    "plugin:prettier/recommended", // --> use our prettier configurations
    "plugin:@typescript-eslint/recommended", // --> use the eslint for typescript
    "plugin:import/errors", // --> use the eslint-plugin-import for error
    "plugin:import/warnings", // --> use the eslint-plugin-import for warnings
    "plugin:import/typescript"
  ],
  "overrides": [
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["prettier", "import", "@typescript-eslint"], // --> Add the plugins so our project can use the extended rules
  "rules": {
    "prettier/prettier":"error", // --> extra rules to say i want you use my prettier file for errors
    "import/extensions":"off", // --> avoid extensions like when i import a files i dont need to use .js or .ts
    "no-console":"off"
  }
}
```
9. (EXTRA) In case I want to use absolute routes instead of relative routes, I can install this couple of depencies that will help me to approach this. Just as a reminder a relative path is when we do an import and we wrote the path '../../routes/user.js' and We do not want to use that we want to use absolutes like '@src/routes/users'. We need to install the next dependencies.
```
npm i -D eslint-import-resolver-typescript tsconfig-paths
```
