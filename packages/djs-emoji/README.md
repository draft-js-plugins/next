# djs-emoji

> An emoji picker for draft-js-plugins, the successor to draft-js-emoji-plugin

[![NPM](https://img.shields.io/npm/v/djs-emoji.svg)](https://www.npmjs.com/package/djs-emoji) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save djs-emoji
```

## Usage

```jsx
import React, { Component } from 'react'
import { EditorState } from 'draft-js';
import { EditorContainer, Editor }a from 'djs-editor'
import EmojiPlugin from 'djs-emoji'

class ExampleEmojiEditor extends Component {
  state = { editorState: EditoState.createEmpty()}
  onChange = editorState => this.setState({ editorState })

  render () {
    return (
      <EditorContainer editorState={editorState} onChange={this.onChange}>
        <EmojiPlugin />
        <Editor />
      </EditorContainer>
    )
  }
}

```

## Props

### shortCodes

An object that maps 

```js

```

## License

MIT © [juliankrispel](https://github.com/juliankrispel)
