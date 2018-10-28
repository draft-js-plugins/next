# @djsp/core

> Draft Js Plugins Core components

![file size](http://img.badgesize.io/https://unpkg.com/@djsp/core/dist/index.js?label=size&style=flat-square)
[![NPM](https://img.shields.io/npm/v/@djsp/core.svg)](https://www.npmjs.com/package/@djsp/core) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

`@djsp/core` is the heart of `@djsp`. It contains these exports:

```js
import {
  EditorContainer,
  Editor,
  Plugin,
  withPluginContext,
} from '@djsp/core'
```

# The `<EditorContainer />` component

### Usage

`EditorContainer` contains all props for the draft js Editor which it passes down to plugins and the `Editor` via the [React context api](https://reactjs.org/docs/context.html).

```js
import { EditorContainer } from '@djsp/core'

<EditorContainer onChange={this.onChange} editorState={this.state.editorState}>
  <Editor />
</EditorContainer>
```

Here are the props that `EditorContainer` accepts, all of the below props are inherted from the [draft js editor component](https://draftjs.org/docs/api-reference-editor#props)

### Props

| Property | Type | required? | Description |
| - | - | - | - |
| `editorState` | `EditorState` | required | The state of the editor. Identical to the [draft js editorState prop](https://draftjs.org/docs/api-reference-editor#editorstate) |
| `onChange` | `(EditorState) => void` | required | Fired when content changes. Identical to the [draft js onChange prop](https://draftjs.org/docs/api-reference-editor#onchange) |
| `editorKey` | `string` | optional | Overrides [props set via plugin](#setEditorProps) |
| `textAlignment` | `"left" or "center" or "right"` | optional | Overrides [props set via plugin](#setEditorProps) |
| `textDirectionality` | `"LTR" or "RTL"` | optional | Overrides [props set via plugin](#setEditorProps) |
| `placeholder` | `string` | optional | Overrides [props set via plugin](#setEditorProps) |
| `readOnly` | `boolean` | optional | Overrides [props set via plugin](#setEditorProps) |
| `spellCheck` | `boolean` | optional | Overrides [props set via plugin](#setEditorProps) |
| `stripPastedStyles` | `boolean` | optional | Overrides [props set via plugin](#setEditorProps) |
| `tabIndex` | `number` | optional | Overrides [props set via plugin](#setEditorProps) |
| `autoCapitalize` | `string` | optional | Overrides [props set via plugin](#setEditorProps) |
| `autoComplete` | `string` | optional | Overrides [props set via plugin](#setEditorProps) |
| `autoCorrect` | `string` | optional | Overrides [props set via plugin](#setEditorProps) |
| `ariaActiveDescendantID` | `string` | optional | Overrides [props set via plugin](#setEditorProps) |
| `ariaAutoComplete` | `string` | optional | Overrides [props set via plugin](#setEditorProps) |
| `ariaControls` | `string` | optional | Overrides [props set via plugin](#setEditorProps) |
| `ariaDescribedBy` | `string` | optional | Overrides [props set via plugin](#setEditorProps) |
| `ariaExpanded` | `boolean` | optional | Overrides [props set via plugin](#setEditorProps) |
| `ariaLabel` | `string` | optional | Overrides [props set via plugin](#setEditorProps) |
| `ariaLabelledBy` | `string` | optional | Overrides [props set via plugin](#setEditorProps) |
| `ariaMultiline` | `boolean` | optional | Overrides [props set via plugin](#setEditorProps) |
| `webDriverTestID` | `string` | optional | Overrides [props set via plugin](#setEditorProps) |

# The `<Editor>` Component

The `Editor` component does not accept any props, since it inherits all of it's props from `EditorContainer`. It must be rendered inside `EditorContainer`

To configure editor props, use `EditorContainer` and `Plugin`

### Usage

```js
<EditorContainer
  onChange={editorState => this.setState({ editorState })}
  editorState={this.state.editorState}
>
  <Editor />
</EditorContainer>
```

# The `<Plugin>` Component


The `Plugin` can only be renderered inside `EditorContainer`. It's props will be plugged in to the editorState. This way you can compose and isolate editor functionality like `decorators`, `blockRendererFn` or any of the props listed below:

### Props

| Property | Type | required? | Description |
| - | - | - | - |
| `children` | `({ setEditorState, editorState, setEditorProps, editorRef, editorProps }) => React.Node` | optional | Render Prop, [for usage see here](#plugin-render-prop) |
| `customStyleMap` | `Object` | optional | Identical to the [draft js `customStyleMap` prop](https://draftjs.org/docs/api-reference-editor#customstylemap) |
| `blockRenderMap` | `Immutable.Map<{\nelement: string, wrapper?: React.Node, aliasedElements?: Array<string> }>` | optional | Identical to the [draft js `blockRenderMap` prop](https://draftjs.org/docs/api-reference-editor#blockrenderermap) |
| `blockRendererFn` | `(block: BlockNodeRecord) => { component: Component, props: Object, editable: boolean }` | optional | Identical to the [draft js `blockRendererFn` prop](https://draftjs.org/docs/api-reference-editor#blockrendererfn) |
| `blockStyleFn` | `(block: BlockNodeRecord) => cssClassName: string` | optional | Identical to the [draft js `blockStyleFn` prop](https://draftjs.org/docs/api-reference-editor#blockstylefn) |
| `customStyleFn` | `(style: Immutable.OrderedSet<string>, block: BlockNodeRecord) => ?Object` | optional | Identical to the [draft js `customStyleFn` prop](https://draftjs.org/docs/api-reference-editor#customstylefn) |
| `keyBindingFn` | `(e: SyntheticKeyboardEvent<>) => ?string` | optional | Identical to the [draft js `keyBindingFn` prop](https://draftjs.org/docs/api-reference-editor#keybindingfn) |
| `handleKeyCommand` | `(command: string, editorState: EditorState) => 'handled' or 'not-handled'` | optional | Identical to the [draft js `handleKeyCommand` prop](https://draftjs.org/docs/api-reference-editor#handlekeycommand) |
| `handleBeforeInput` | `(chars: string, editorState: EditorState) => 'handled' or 'not-handled'` | optional | Identical to the [draft js `handleBeforeInput` prop](https://draftjs.org/docs/api-reference-editor#handlebeforeinput) |
| `handlePastedText` | `(text: string, html?: string, editorState: EditorState) => 'handled' or 'not-handled'` | optional | Identical to the [draft js `handlePastedText` prop](https://draftjs.org/docs/api-reference-editor#handlepastedtext) |
| `handlePastedFiles` | `(files:  Array<Blob>) => 'handled' or 'not-handled'` | optional | Identical to the [draft js `handlePastedFiles` prop](https://draftjs.org/docs/api-reference-editor#handlepastedfiles) |
| `handleDroppedFiles` | `(selection: SelectionState, files:  Array<Blob>) => 'handled' or 'not-handled'` | optional | Identical to the [draft js `handleDroppedFiles` prop](https://draftjs.org/docs/api-reference-editor#handledroppedfiles) |
| `handleDrop` | `(selection: SelectionState, dataTransfer:  Object, isInternal: 'internal' or 'external') => 'handled' or 'not-handled'` | optional | Identical to the [draft js `handleDrop` prop](https://draftjs.org/docs/api-reference-editor#handledrop) |
| `handleReturn` | `(e: SyntheticKeyboardEvent<>, editorState: EditorState) => 'handled' or 'not-handled'` | optional | Identical to the [draft js `handleReturn` prop](https://draftjs.org/docs/api-reference-editor#handlereturn) |
| `onDownArrow` | `(e: SyntheticKeyboardEvent<>) => void` | optional | Identical to the [draft js `onDownArrow` prop](https://draftjs.org/docs/api-reference-editor#ondownarrow) |
| `onUpArrow` | `(e: SyntheticKeyboardEvent<>) => void` | optional | Identical to the [draft js `onUpArrow` prop](https://draftjs.org/docs/api-reference-editor#onuparrow) |
| `onLeftArrow` | `(e: SyntheticKeyboardEvent<>) => void` | optional | Identical to the [draft js `onLeftArrow` prop](https://draftjs.org/docs/api-reference-editor#onleftarrow) |
| `onRightArrow` | `(e: SyntheticKeyboardEvent<>) => void` | optional | Identical to the [draft js `onRightArrow` prop](https://draftjs.org/docs/api-reference-editor#onrightarrow) |
| `onTab` | `(e: SyntheticKeyboardEvent<>) => void` | optional | Identical to the [draft js `onTab` prop](https://draftjs.org/docs/api-reference-editor#ontab) |
| `onEscape` | `(e: SyntheticKeyboardEvent<>) => void` | optional | Identical to the [draft js `onEscape` prop](https://draftjs.org/docs/api-reference-editor#onescape) |
| `onFocus` | `(e: SyntheticEvent<>) => void` | optional | Identical to the [draft js `onFocus` prop](https://draftjs.org/docs/api-reference-editor#onfocus) |
| `onBlur` | `(e: SyntheticEvent<>) => void` | optional | Identical to the [draft js `onBlur` prop](https://draftjs.org/docs/api-reference-editor#onblur) |

### Plugin render prop

The `Plugin` also accepts an optional render prop which exposes the plugin context.
```js
<Plugin>
  {({
    setEditorState,
    editorProps,
    editorRef,
    editorState,
    setEditorProps
  }) => (
    <button
      onClick={() => (
        setEditorState(
          RichUtils.toggleBlockType(editorState, 'header-one')
        )
      )}
    >H1</button>
  )}
</Plugin>
```




### `<Plugin>(RenderProps)</Plugin>`

| Property | Type | Description |
| - | - | - |
| `editorState` | `EditorState` | The `EditorState` object |
| `setEditorState` | `(editorState: EditorState) => void` | Lets you update the editorState |
| `editorProps` | `Object` | Contains the [props for `EditorContainer`](#props) except `editorState` and `onChange` |
| `setEditorProps` | `(editorProps: Object) => void` | lets you set the above editorProps. Be aware that editor props set via Plugins are overridden by `EditorContainer` props |
| `editorRef` | `Ref<DraftEditor>` | A React reference to the draft js editor |

# `withPluginContext`

Another way to create a plugin is with the `withPluginContext` HOC. This has the advantage of letting you handle plugin subscription.

## License

MIT © [juliankrispel](https://github.com/juliankrispel)

