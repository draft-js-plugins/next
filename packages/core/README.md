# @djsp/core

> Draft Js Plugins Core components

![file size](http://img.badgesize.io/https://unpkg.com/@djsp/core/dist/index.js?label=size&style=flat-square)
[![NPM](https://img.shields.io/npm/v/@djsp/core.svg)](https://www.npmjs.com/package/@djsp/core) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## License

MIT © [juliankrispel](https://github.com/juliankrispel)


## API

### <Plugin />

```jsx
import { Plugin } from '@djsp/core' }
```

#### Props
A plugin inherits the same props as as the [Draft js Editor](https://draftjs.org/docs/api-reference-editor) including a few exceptions. Here's the full list of props:
```jsx
export type PluginProps = {
  blockRendererFn: (block: BlockNodeRecord) => ?Object,
  blockStyleFn: (block: BlockNodeRecord) => string,
  keyBindingFn: (e: SyntheticKeyboardEvent<>) => ?string,
  handleReturn?: (
    e: SyntheticKeyboardEvent<>,
    editorState: EditorState,
  ) => DraftHandleValue,
  handleKeyCommand?: (
    command: DraftEditorCommand | string,
    editorState: EditorState,
    eventTimeStamp: number,
  ) => DraftHandleValue,
  handleBeforeInput?: (
    chars: string,
    editorState: EditorState,
    eventTimeStamp: number,
  ) => DraftHandleValue,
  handlePastedText?: (
    text: string,
    html?: string,
    editorState: EditorState,
  ) => DraftHandleValue,
  handlePastedFiles?: (files: Array<Blob>) => DraftHandleValue,
  handleDroppedFiles?: (
    selection: SelectionState,
    files: Array<Blob>,
  ) => DraftHandleValue,
  handleDrop?: (
    selection: SelectionState,
    dataTransfer: Object,
    isInternal: DraftDragType,
  ) => DraftHandleValue,
  onEscape?: (e: SyntheticKeyboardEvent<>) => void,
  onTab?: (e: SyntheticKeyboardEvent<>) => void,
  onUpArrow?: (e: SyntheticKeyboardEvent<>) => void,
  onRightArrow?: (e: SyntheticKeyboardEvent<>) => void,
  onDownArrow?: (e: SyntheticKeyboardEvent<>) => void,
  onLeftArrow?: (e: SyntheticKeyboardEvent<>) => void,
  onBlur?: (e: SyntheticEvent<>) => void,
  onFocus?: (e: SyntheticEvent<>) => void,
  customStyleMap?: Object,
  customStyleFn?: (style: DraftInlineStyle, block: BlockNodeRecord) => ?Object,
  blockRenderMap: DraftBlockRenderMap,
};
```

