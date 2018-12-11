# @djsp/atomic-block

![file size](http://img.badgesize.io/https://unpkg.com/@djsp/atomic-block/dist/index.js?label=size&style=flat-square)
[![NPM](https://img.shields.io/npm/v/@djsp/atomic-block.svg)](https://www.npmjs.com/package/@djsp/atomic-block) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[Atomic blocks](https://draftjs.org/docs/advanced-topics-block-components#defining-custom-block-components) are draft-js's abstraction for displaying media that isn't text. Like images or embedded videos.

The Atomic block plugin solves two common problems:
- Focusing atomic blocks.
- Keyboard interaction with atomic blocks.

## Installation

```sh
npm install --save @djsp/utils @djsp/core @djsp/atomic-block
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

## API Props

- `type` - A `string`. Entity type of the atomic block. e.g. `IMAGE`, `VIDEO`, `EMBED` or whatever you want to call your block type :)
- `children` - Render Prop. 




## Examples
- [Editor with image](https://codesandbox.io/s/github/draft-js-plugins/next/tree/master/examples/atomic-block)
- [Editor with divider](https://codesandbox.io/s/github/draft-js-plugins/next/tree/master/examples/divider-example)