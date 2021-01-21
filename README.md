# TypeScript-Demo-Spa

[![pipeline status](https://gitlab.com/MatrixAI/open-source/TypeScript-Demo-Spa/badges/master/pipeline.svg)](https://gitlab.com/MatrixAI/open-source/TypeScript-Demo-Spa/commits/master)

## Development

Setup the environment variables and edit them appropriately:

```sh
cp .env.example .env
```

Run `nix-shell`, and once you're inside, you can use:

```sh
# install (or reinstall packages from package.json)
npm install
# run the webpack development server
npm run server
# build the webpack and after the initial build, watch for changes in any resolved files
npm run watch
# build webpack dist
npm run build
# run the repl (this allows you to import from ./src)
npm run ts-node
# run the tests
npm run test
# lint the source code
npm run lint
# automatically fix the source
npm run lintfix
```

### Path Aliases

Due to https://github.com/microsoft/TypeScript/issues/10866, you cannot use path aliases without a bundler like Webpack to further transform the generated JavaScript code in order to resolve the path aliases. Because this is a simple library demonstration, there's no need to use a bundler. In fact, for such libraries, it is far more efficient to not bundle the code.

However we have left the path alias configuration in `tsconfig.json`, `jest.config.js` and in the tests we are making use of the `@` alias.

## Webpack Configuration

The `dist/*` are the final outputs from webpack.

There is an `dist/index.html` that is the Web entrypoint.

There are some image files in `dist/` that is just there for dummy data.
