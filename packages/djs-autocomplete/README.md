# djs-autocomplete

> A plugin component for auto completion in draft js.

[![NPM](https://img.shields.io/npm/v/djs-suggestions.svg)](https://www.npmjs.com/package/djs-suggestions) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save djs-autocomplete
```

## Usage

```jsx
import React, { Component } from 'react'
import { EditorState } from 'draft-js';
import { EditorContainer, Editor } from 'djs-editor'
import AutocompletePlugin from 'djs-autocomplete'

class ExampleEmojiEditor extends Component {
  state = { editorState: EditoState.createEmpty()}
  onChange = editorState => this.setState({ editorState })

  render () {
    return (
      <EditorContainer editorState={editorState} onChange={this.onChange}>
        <AutocompletePlugin />
        <Editor />
      </EditorContainer>
    )
  }
}
```

## License

MIT © [juliankrispel](https://github.com/juliankrispel)
