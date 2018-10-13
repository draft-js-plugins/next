# djs@counter - Not released, please use with caution ;)

[![NPM](https://img.shields.io/npm/v/@djsp/atomic-block.svg)](https://www.npmjs.com/package/@djsp/atomic-block) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


Example:

```jsx
import Counter, { getCharCount, getWordCount, getLineCount } from "./counter.js";

<EditorContainer>
  <Editor />

  <Counter>
    {(editorState) => 'Char count: ' + getCharCount(editorState)}
  </Counter>

  <Counter>
    {(editorState) => 'Word count: ' + getWordCount(editorState)}
  </Counter>

  <Counter>
    {(editorState) => 'Line count: ' + getLineCount(editorState)}
  </Counter>

</EditorContainer>
```
