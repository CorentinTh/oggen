# OGGEN - OpenGraph metadata generator

[![ci](https://github.com/CorentinTh/oggen/actions/workflows/ci.yml/badge.svg)](https://github.com/CorentinTh/oggen/actions/workflows/ci.yml)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@it-tools/oggen.svg)](https://www.npmjs.com/package/@it-tools/oggen)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/CorentinTh/oggen.svg)](https://github.com/CorentinTh/oggen/blob/main/package.json)
[![Dependencies](https://img.shields.io/badge/dependencies-0-green)](https://www.npmjs.com/package/@it-tools/oggen)
[![Licence Badge](https://img.shields.io/github/license/CorentinTh/oggen.svg)](LICENCE)

> Dynamically generate your open-graph metadata for your html files (with typescript support).

## Usage

Install package:

```sh
# npm
npm install @it-tools/oggen

# yarn
yarn install @it-tools/oggen

# pnpm
pnpm install @it-tools/oggen
```

Import:

```js
// ESM or typescript
import { generateMeta } from '@it-tools/oggen';

// CommonJS
const { generateMeta } = require('@it-tools/oggen');
```

## API

### Basic example

```typescript
import { generateMeta } from '@it-tools/oggen';

const metadata = generateMeta(
  {
    title: 'IT-Tools',
    description: 'Lorem ipsum',
    image: {
      url: 'https://example.com/image.png',
      alt: 'The image alt text',
      width: 600,
      height: 400,
    },
    locale: 'en_US',
    siteName: 'IT-Tools',
    // Put here whichever key you want to generate the meta with
    //...
  },
  // Optional configuration
  {
    indentation: 2, // default: 0
    indentWith: '   ', // default: '  ' (two spaces)
    generateTwitterCompatibleMeta: true, // default: false
  },
);

console.log(metadata);

/*

      <!-- og meta -->
      <meta property="og:title" value="IT-Tools" />
      <meta property="og:description" value="Lorem ipsum" />
      <meta property="og:image:url" value="https://example.com/image.png" />
      <meta property="og:image:alt" value="The image alt text" />
      <meta property="og:image:width" value="600" />
      <meta property="og:image:height" value="400" />
      <meta property="og:locale" value="en_US" />
      <meta property="og:site_name" value="IT-Tools" />

      <!-- twitter meta -->
      <meta name="twitter:title" value="IT-Tools" />
      <meta name="twitter:description" value="Lorem ipsum" />
      <meta name="twitter:image" value="https://example.com/image.png" />
      <meta name="twitter:image:alt" value="The image alt text" />


*/
```

Please refer to [ogp.me](https://ogp.me/) for the metadata semantic

### Arrays

It support array of data

```typescript
const metadata = generateMeta({
  music: {
    author: [
      { name: 'Person 1 ', city: 'London' },
      { name: 'Person 2', city: 'Paris' },
    ],
    tags: ['Tag 1', 'Tag 2'],
  },
});

console.log(metadata);

/*

<!-- og meta -->
<meta property="og:music:author:name" value="Person 1" />
<meta property="og:music:author:city" value="London" />
<meta property="og:music:author:name" value="Person 2" />
<meta property="og:music:author:city" value="Paris" />
<meta property="og:music:tags" value="Tag 1" />
<meta property="og:music:tags" value="Tag 2" />

*/
```

### Twitter

You can put your extra twitter thing under the `twitter` key

```typescript
const metadata = generateMeta(
  {
    title: 'IT-Tools',
    description: 'Lorem ipsum',
    twitter: {
      title: 'Title for twitter',
      card: 'summary_large_image',
    },
  },
  {
    generateTwitterCompatibleMeta: true, // default: false
  },
);

console.log(metadata);

/*

<!-- og meta -->
<meta property="og:title" value="IT-Tools" />
<meta property="og:description" value="Lorem ipsum" />

<!-- twitter meta -->
<meta name="twitter:title" value="Title for twitter" />
<meta name="twitter:description" value="Lorem ipsum" />   // <-- present because of 'generateTwitterCompatibleMeta'
<meta name="twitter:card" value="summary_large_image" />

*/
```

## Development

- Clone this repository
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## Credits

Coded with ❤️ by [Corentin Thomasset](//corentin-thomasset.fr).

## License

This project is under the [MIT license](LICENSE).
