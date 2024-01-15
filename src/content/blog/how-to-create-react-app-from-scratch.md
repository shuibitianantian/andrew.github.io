---
author: Andrew Xia
pubDatetime: 2024-01-15T15:22:00Z
modDatetime: 2024-01-16T09:12:47.400Z
title: How to create new react project from scratch?
slug: how to create new react project from scratch
featured: true
draft: false
tags:
  - docs
description: A self guide to create react project from scratch
---

# How to create react application from scratch?

Notion link: https://swanky-leopard-89f.notion.site/How-to-create-react-application-from-scratch-b74ea5daeb20473eb84da738169481cb

<aside>
💡 如何从0开始搭建一个React项目应该是每个React前端需要知道的事情。
这是我根据reference中的教学，结合我不懂的一些知识点总结出来的文章。

</aside>

## References:

[Setting Up a React Project Without Create React App](https://medium.com/@claude.ando/setting-up-a-react-project-without-create-react-app-6ff7fea9ca51)

[Setting up React + TypeScript + webpack app from scratch without create-react-app](https://dev.to/alekseiberezkin/setting-up-react-typescript-app-without-create-react-app-oph)

## Prerequisites:

1. You should at least have `node` installed in your machine. We will use `Node.js 18` in this tutorial
2. We are going to use `pnpm` in this tutorial. About how to install `pnpm` , please follow official guide: [https://pnpm.io/installation](https://pnpm.io/installation). Make sure you have installed `pnpm 8` .

[Why you should prefer using pnpm over npm and yarn? | refine](https://refine.dev/blog/pnpm-vs-npm-and-yarn/)

<aside>

✅ Install `nvm` to manage the node installed in your system.

- How to install nvm?

[https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

Common commands:

1. `nvm install 18` // install node.js 18
2. `nvm alias default 18` // set default node.js version to 18
3. `nvm use 18` // use node.js 18

</aside>

## Create and initialize the project

```bash
mkdir your-react-app-name && cd your-react-app-name  # this create a directory and change current directory to it

pnpm init -y # this create a package.json file, press enter till the end
```

## Install typescript

```bash
pnpm i -D typescript
```

- Create **`tsconfig.json`**

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "jsx": "react",
    "module": "esnext",
    "moduleResolution": "node",
    "lib": ["dom", "esnext"],
    "strict": true,
    "sourceMap": true,
    "target": "esnext"
  },
  "exclude": ["node_modules"]
}
```

## Install react dependencies

```bash
pnpm add react react-dom # add react dependencies
pnpm add -D @types/react @types/react-dom
```

- `react` is the core part of react application, managing virtual DOMs, diff and update virtual dom.
- `react-dom` : the package to render components and elements on the web.

## Babel setup

```bash
pnpm add -D @babel/core @babel/preset-env @babel/preset-react babel-loader
```

![shoot2.png](@assets/images/shoot2.png)

You will get something like `babel-loader` missing `webpack@>=5`. Before installing `webpack@5` , we need to create a `.babelrc` configuration file in the root directory.

- `babel-loader`: This package allows transpiling JavaScript files using [Babel](https://github.com/babel/babel) and [webpack](https://github.com/webpack/webpack).
- `babel-core`: the core package that if we want to use babel to transpiling `JS` codes.
  [Check out this for some details about @babel/core](https://www.notion.so/Check-out-this-for-some-details-about-babel-core-a7d3d82b3e4246faae388aace8f2b52a?pvs=21)
- `babel/preset-env`: a preset that babel use to transform new `JS` syntax to be compatible with old browser.
- `babel/preset-react`: a preset that babel use to transform react related codes. For example, compiling react JSX.

```json
// .babelrc
{
  "presets": ["@babel/preset-env", "@babel/preset-react"] // @babel/preset-typescript is required if we want to use typescript
}
```

## Webpack setup

```bash
pnpm add -D webpack webpack-cli webpack-dev-server html-webpack-plugin css-loader style-loader ts-loader
```

- `webpack` : Webpack is a module bundler that processes and bundles your application’s assets, such as JavaScript, CSS, and images.
- `webpack-cli`: command line tools.
- `webpack-dev-server`: helps to serve your project in local.
- `html-webpack-plugin`: a plugin to generate html file in your project.

- [html-webpack-plugin 使用总结 - 掘金](https://juejin.cn/post/6844903853708541959)

- Create a `webpack.config.js` file in the project’s root directory

```jsx
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js", // entry point of the application
  output: {
    filename: "bundle.js", // the place saved the bundle file
  },
  module: {
    // specifies which file extensions webpack should resolve
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // resolve
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".json"],
        },
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }), // https://juejin.cn/post/6844903853708541959
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot: true,
    open: true,
  },
};
```

## Setup the project structure

```jsx
your-react-app/
  ├── public/
      ├── index.html
  ├── src/
      ├── App.js
      ├── index.js
  ├── .babelrc
  ├── package.json
  ├── webpack.config.js
```

- Add `public/index.html`

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Custom React App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

## Add scripts in package.json

```json
{
	...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack serve --port 3000",
    "build": "NODE_ENV=production webpack"
  },
	...
}
```

## Add `index.tsx` and start the application

```jsx
// This is React 18, new apis
// index.tsx
import { createRoot } from "react-dom/client";
import App from "./App";

const root = document.getElementById('root') as Element;

createRoot(root).render(<App />);
```

```jsx
// App.tsx
import "./style.css";

export default () => {
  return <div className="welcome-words">Welcome to React World</div>;
};
```

```css
// style.css
.welcome-words {
  color: blue;
}
```

You will see blue welcome message!
