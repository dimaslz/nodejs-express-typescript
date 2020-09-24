# TypeScript Node Starter

My essential config to create REST API in NodeJS with TypeScript. Star, feedback and recommendation are welcome 🙂.

Based in [https://github.com/microsoft/TypeScript-Node-Starter](https://github.com/microsoft/TypeScript-Node-Starter). My idea is to create a example with some databases and common third party integrations.

If you need something similar, feel free to fork and join, I hope to help you!.


## Stack
* MongoDB
* Express
* TypeScript

## Scripts
| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Does the same as 'npm run serve'. Can be invoked with `npm start`                                 |
| `build`                   | Full build. Runs ALL build tasks (`build-sass`, `build-ts`, `lint`, `copy-static-assets`)       |
| `serve`                   | Runs node on `dist/server.js` which is the apps entry point                                       |
| `watch-node`              | Runs node with nodemon so the process restarts if it crashes. Used in the main watch task         |
| `watch`                   | Runs all watch tasks (TypeScript, Sass, Node). Use this if you're not touching static assets.     |
| `test`                    | Runs tests using Jest test runner                                                                 |
| `watch-test`              | Runs tests in watch mode                                                                          |
| `build-ts`                | Compiles all source `.ts` files to `.js` files in the `dist` folder                                 |
| `watch-ts`                | Same as `build-ts` but continuously watches `.ts` files and re-compiles when needed                |
| `build-sass`              | Compiles all `.scss` files to `.css` files                                                          |
| `watch-sass`              | Same as `build-sass` but continuously watches `.scss` files and re-compiles when needed            |
| `lint`                    | Runs ESLint on project files                                                                       |
| `copy-static-assets`      | Calls script that copies JS libs, fonts, and images to dist directory                             |
| `debug`                   | Performs a full build and then serves the app in watch mode                                       |
| `serve-debug`             | Runs the app with the --inspect flag                                                               |
| `watch-debug`             | The same as `watch` but includes the --inspect flag so you can attach a debugger                   |


## TODO
- [ ] GraphQL demo and test
- [x] MongoDB demo and test
- [ ] SocketIO demo and test
- [ ] MySql demo and test
- [ ] PostgreSql demo and test
- [ ] Dockerfile
- [ ] Docker compose for Node and MongoDB
- [ ] Docker compose for Node and MySql
- [ ] Docker compose for Node and PostgreSql

## Author
Dimas López · FullStack Software development

🐦  [https://twitter.com/dimaslz](https://twitter.com/dimaslz)

👨🏻‍💻  [https://dimaslz.dev](https://dimaslz.dev)

📄  [https://www.linkedin.com/in/dimaslopezzurita](https://www.linkedin.com/in/dimaslopezzurita)