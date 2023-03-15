[![Latest released version](https://img.shields.io/npm/v/simply-reactive-web)](https://www.npmjs.com/package/simply-reactive-web)
[![Minified and gzipped bundle size](https://img.shields.io/bundlephobia/minzip/simply-reactive-web)](https://bundlephobia.com/package/simply-reactive-web)
![Type support](https://img.shields.io/npm/types/simply-reactive-web)
[![Downloads from NPM](https://img.shields.io/npm/dm/simply-reactive-web?label=downloads%20npm)](https://www.npmjs.com/package/simply-reactive-web)
[![Downloads from JSDeliver](https://img.shields.io/jsdelivr/npm/hm/simply-reactive-web?label=downloads%20jsDelivr)](https://www.jsdelivr.com/package/npm/simply-reactive-web)
[![Build status of main branch](https://img.shields.io/circleci/build/github/Olian04/simply-reactive-web/main?label=test%20%26%20build)](https://app.circleci.com/pipelines/github/Olian04/simply-reactive-web)
[![MIT licensed](https://img.shields.io/npm/l/simply-reactive-web)](./LICENSE)

# simply-reactive-web

simply-reactive-web is a small fine-grained reactive renderer inspired by [Solidjs](https://github.com/solidjs/solid).

## Installation

### NPM

[`npm i simply-reactive-web`](https://www.npmjs.com/package/simply-reactive-web)

```ts
import { html, forEach } from 'simply-reactive-web';
```

### CDN

#### ESM

```html
<script type="module">
  import {
    html,
    forEach,
  } from 'https://cdn.jsdelivr.net/npm/simply-reactive-web';
</script>
```

#### UMD

```html
<script src="https://cdn.jsdelivr.net/npm/simply-reactive-web/cdn/umd.js"></script>
<script>
  const { html, forEach } = simplyReactiveWeb;
</script>
```
