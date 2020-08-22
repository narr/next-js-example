<p align="center">
  <a href="https://nextjs.org/">
    <img src="https://assets.zeit.co/image/upload/v1538361091/repositories/next-js/next-js.png" alt="Next.js Logo">
  </a>
</p>
<h1 align="center">
  Narr's Next.js starter
</h1>

![CI](https://github.com/narr/next-js-example/workflows/CI/badge.svg?branch=master)
[![codecov](https://codecov.io/gh/narr/next-js-example/branch/master/graph/badge.svg)](https://codecov.io/gh/narr/next-js-example)

## Getting Started

### Install

```bash
# Install npm modules
yarn
# Install docker image for visual test
# Prerequisite - Docker
yarn test:visual:install
```

### Run

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/pages/test/index.tsx`. The page auto-updates as you edit the file.

Second, run tests:

```bash
yarn storybook
yarn test
```

It will open Cypress for Unit tests and E2E tests.

Third, run visual regression tests:

```bash
# https://loki.js.org/command-line-arguments.html#loki-test

# to test all stories
yarn storybook
# Make sure that Docker is running before executing test
yarn test:visual

# to use regular expression for stories to test
# Below will only test stories whose name has the string, 'card'
yarn test:visual:filter card
```

## Build

Run the development server with build files:

```bash
yarn build
yarn start
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

### Webpack Bundle Analyzer

Analyze build bundle:

```bash
yarn build:analyze
```

### Static HTML Export

**yarn build** allows you to export your app to static HTML, which can be run standalone without the need of a Node.js server. By default, it will be exported to **PROJECT ROOT FOLDER/out**

### Demo

[root](https://next-js-example.narr.vercel.app/)  
[test](https://next-js-example.narr.vercel.app/test)
