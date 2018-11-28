# @djsp/utils

> Utilities for draft js

![file size](http://img.badgesize.io/https://unpkg.com/@djsp/utils/dist/index.js?label=size&style=flat-square)
[![NPM](https://img.shields.io/npm/v/@djsp/utils.svg)](https://www.npmjs.com/package/@djsp/utils) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @djsp/utils
```

## Static Methods

### replaceWithAtomicBlock

```javascript
replaceWithAtomicBlock(
  editorState: EditorState,
  entityType: string,
  data: Object
): EditorState
```

### insertEntityBlock

```javascript
insertEntityBlock(
  editorState: EditorState,
  entityType: string,
  data: Object
): EditorState
```

### createEntityDecorator

```javascript
createEntityDecorator(
  entityName: string,
  component: Function,
  props?: Object
): DraftDecorator
```

### insertTextWithEntity

```javascript
insertTextWithEntity(
  contentState: ContentState,
  selection: SelectionState,
  entityType: string,
  text: string,
  mutability?: 'IMMUTABLE' | 'MUTABLE' | 'SEGMENTED',
  entityData?: Object
): ContentState
```

### createLinkAtSelection

```javascript
createLinkAtSelection(
  editorState: EditorState,
  url: string
): EditorState
```

### removeLinkAtSelection

```javascript
removeLinkAtSelection(editorState: EditorState): EditorState
```

### collapseToEnd

```javascript
collapseToEnd(editorState: EditorState): EditorState
```

### getCurrentEntityKey

```javascript
getCurrentEntityKey(editorState: EditorState): ?string
```

### createEntityStrategy

```javascript
createEntityStrategy(entityType: string): (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) => void
```

### getCurrentEntity

```javascript
getCurrentEntity(
  editorState: EditorState
): ?DraftEntityInstance
```

### getBlockEntityKey

```javascript
getBlockEntityKey(
  contentState: ContentState,
  key: string
): ?string
```

### hasEntity

```javascript
hasEntity(
  editorState: EditorState,
  entityType: string
): boolean
```

### insertNewLine

```javascript
insertNewLine(editorState: EditorState): EditorState
```

### getCharCount

```javascript
getCharCount(editorState: EditorState): number
```

### getLineCount

```javascript
getLineCount(editorState: EditorState): number
```

### getWordCount

```javascript
getWordCount(editorState: EditorState): number
```

## License

MIT © [juliankrispel](https://github.com/juliankrispel)
