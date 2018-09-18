# djs-autocomplete

> A plugin component for auto completion in draft js.

[![NPM](https://img.shields.io/npm/v/djs-suggestions.svg)](https://www.npmjs.com/package/djs-suggestions) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save djs-autocomplete
```

## Usage

```
<Popover>
  <Autocomplete
    trigger="@"
    suggestions={this.state.suggestions}
    onAutocomplete={searchText = this.filterSuggestions(searchText)}
    onSelect={suggestion => this.insertMention(suggestion)}
  />
</Popover>
```

## Props

```
trigger: string | (textUntilCursor: string) => ?string,
renderSuggestion?: ({ suggestion: any, onSelect: any => void }),
getSuggestions: (searchText: string) => Array<any> | Promise<Array<any>>,
```

## Complete Example

```jsx
import React, { Component } from 'react'
import { EditorState } from 'draft-js';
import { EditorContainer, Editor } from 'djs-editor'
import Autocomplete from 'djs-autocomplete'

class ExampleEmojiEditor extends Component {
  state = { editorState: EditoState.createEmpty()}
  onChange = editorState => this.setState({ editorState })

  render () {
    return (
      <EditorContainer editorState={editorState} onChange={this.onChange}>
        <Autocomplete trigger="@" />
        <Editor />
      </EditorContainer>
    )
  }
}
```

## License

MIT © [juliankrispel](https://github.com/juliankrispel)
