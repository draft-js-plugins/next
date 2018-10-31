# @djsp/atomic-block

![file size](http://img.badgesize.io/https://unpkg.com/@djsp/atomic-block/dist/index.js?label=size&style=flat-square)
[![NPM](https://img.shields.io/npm/v/@djsp/atomic-block.svg)](https://www.npmjs.com/package/@djsp/atomic-block) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

`@djsp/atomic-block` depends on `@djsp/utils` which must also be installed.

```sh
npm install --save @djsp/utils @djsp/atomic-block
# or alternately
yarn add @djsp/utils @djsp/atomic-block
```

## Usage

```jsx
<EditorContainer>
  <Editor />

  <AtomicBlock type="IMAGE">
    {(props) => <Image {...props} />}
  </AtomicBlock>

  <AtomicBlock type="VIDEO">
    {(props) => <Video {...props} />}
  </AtomicBlock>
</EditorContainer>
```

## Examples
- [Editor with image](https://codesandbox.io/s/github/draft-js-plugins/next/tree/master/examples/atomic-block)
- [Editor with divider](https://codesandbox.io/s/github/draft-js-plugins/next/tree/master/examples/divider-example)