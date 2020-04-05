<p align="center">
  <a href="https://nextjs.org/">
    <img src="https://assets.zeit.co/image/upload/v1538361091/repositories/next-js/next-js.png" alt="Next.js Logo">
  </a>
</p>
<h1 align="center">
  Narr's Next.js starter
</h1>

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/pages/index.tsx`. The page auto-updates as you edit the file.

## Build

Run the development server with build files:

```bash
npm run build
npm start
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

### Webpack Bundle Analyzer

Analyze build bundle:

```bash
npm run build:analyze
```

### Static HTML Export

**npm run build** allows you to export your app to static HTML, which can be run standalone without the need of a Node.js server. By default, it will be exported to **PROJECT ROOT FOLDER/out**
