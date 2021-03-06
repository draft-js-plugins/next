// @flow

import React, { createContext, Component, createRef } from 'react'
import type { Ref, Node, ComponentType } from 'react'
import {
  CompositeDecorator,
  Editor as DraftEditor,
  EditorState,
  SelectionState,
  getDefaultKeyBinding,
  DefaultDraftBlockRenderMap,
} from 'draft-js'

import { HANDLED } from './constants'
import type { DraftEditorProps } from 'draft-js/lib/DraftEditorProps'
import type { BlockNodeRecord } from 'draft-js/lib/BlockNodeRecord'
import type { DraftEditorCommand } from 'draft-js/lib/DraftEditorCommand'
import type { DraftDragType } from 'draft-js/lib/DraftDragType'
import type { PluginProps, StaticProps, ContextType } from './types'

export const Context: ContextType = createContext({})

const omitUndefined = obj =>
  Object.keys(obj).reduce(
    (acc, key) => (obj[key] !== undefined ? { ...acc, [key]: obj[key] } : acc),
    {}
  )

export const withEditorContext = <Props: {}>(
  Comp: ComponentType<Props>
): ComponentType<DraftEditorProps & { ref: Ref<typeof DraftEditor> }> =>
  function WithConsumer() {
    return (
      <Context.Consumer>
        {contextProps => <Comp {...contextProps.editorProps} />}
      </Context.Consumer>
    )
  }

export const withPluginContext = <Props: {}>(
  Comp: ComponentType<Props>
): ComponentType<Props & PluginProps> =>
  function WithConsumer(props: Object) {
    return (
      <Context.Consumer>
        {contextProps => {
          return <Comp {...props} {...contextProps.pluginProps} />
        }}
      </Context.Consumer>
    )
  }

const resolveDecorator = plugins =>
  new CompositeDecorator(
    Array.from(plugins.values()).reduce(
      (acc, plugin) =>
        Array.isArray(plugin.decorators) ? [...acc, ...plugin.decorators] : acc,
      []
    )
  )

type Props = DraftEditorProps & {
  children: Node,
}

type State = {
  plugins: Map<number, Object>,
  editorState: EditorState,
  editorProps: StaticProps,
}

export default class EditorContainer extends Component<Props, State> {
  static defaultProps = {
    customStyleMap: {},
    blockRenderMap: DefaultDraftBlockRenderMap,
  }

  editorRef: Ref<typeof DraftEditor>

  mapKey: number

  constructor(props: Props) {
    super(props)
    this.editorRef = createRef()
    this.mapKey = 0
  }

  state = {
    plugins: new Map().set('default', { keyBindingFn: getDefaultKeyBinding }),
    editorState: EditorState.createEmpty(),
    editorProps: {
      readOnly: false,
      spellCheck: false,
      stripPastedStyles: false,
    },
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const {
      editorState,
      autoCapitalize,
      autoComplete,
      autoCorrect,
      readOnly,
      spellCheck,
      stripPastedStyles,
      editorKey,
      tabIndex,
      placeholder,
      textAlignment,
      textDirectionality,

      ariaActiveDescendantID,
      ariaAutoComplete,
      ariaControls,
      ariaDescribedBy,
      ariaExpanded,
      ariaLabel,
      ariaLabelledBy,
      ariaMultiline,
      webDriverTestID,
    } = props

    const passedProps = omitUndefined({
      autoCapitalize,
      autoComplete,
      autoCorrect,
      readOnly,
      spellCheck,
      stripPastedStyles,
      editorKey,
      tabIndex,
      placeholder,
      textAlignment,
      textDirectionality,

      ariaActiveDescendantID,
      ariaAutoComplete,
      ariaControls,
      ariaDescribedBy,
      ariaExpanded,
      ariaLabel,
      ariaLabelledBy,
      ariaMultiline,
      webDriverTestID,
    })

    return {
      ...state,
      editorState:
        editorState != null
          ? EditorState.set(editorState, {
              decorator: resolveDecorator(state.plugins),
            })
          : editorState,
      editorProps: {
        ...state.editorProps,
        ...passedProps,
      },
    }
  }

  resolveDecorator = () => resolveDecorator(this.state.plugins)

  resolveCustomStyleMap = () =>
    Array.from(this.state.plugins.values()).reduce(
      (acc, plugin) =>
        plugin.customStyleMap != null
          ? { ...acc, ...plugin.customStyleMap }
          : acc,
      this.props.customStyleMap
    )

  resolveBlockRendererMap = () =>
    Array.from(this.state.plugins.values()).reduce(
      (acc, plugin) =>
        plugin.blockRenderMap != null ? acc.merge(plugin.blockRenderMap) : acc,
      this.props.blockRenderMap
    )

  setupEditorState = () =>
    this.setState({
      editorState: EditorState.set(this.state.editorState, {
        decorator: this.resolveDecorator(),
      }),
    })

  unregisterPlugin = (key: number) => {
    const { plugins } = this.state

    plugins.delete(key)

    this.setState({ plugins })
    this.setupEditorState()
  }

  registerPlugin = (plugin: DraftEditorProps): (() => void) => {
    const { plugins } = this.state
    const key = this.mapKey

    this.setState({ plugins: plugins.set(key, plugin) })
    this.setupEditorState()

    this.mapKey++

    return () => this.unregisterPlugin(key)
  }

  returnFirstTruthy = (
    methodName:
      | 'blockRendererFn'
      | 'blockStyleFn'
      | 'customStyleFn'
      | 'keyBindingFn',
    ...args: any
  ) => {
    for (let plugin of this.state.plugins.values()) {
      if (plugin[methodName] != null) {
        const result = plugin[methodName](...args)
        if (result) {
          return result
        }
      }
    }
  }

  returnFirstHandled = (methodName: string, ...args: any) => {
    for (let plugin of this.state.plugins.values()) {
      if (plugin[methodName] != null) {
        const result = plugin[methodName](...args)
        if (result === HANDLED) {
          return result
        }
      }
    }
  }

  eventCallback = (methodName: string, ...args: any) =>
    this.state.plugins.forEach(
      plugin => plugin[methodName] != null && plugin[methodName](...args)
    )

  onChange = (editorState: EditorState) => {
    this.props.onChange(editorState)
  }

  render() {
    const editorProps = {
      ...this.state.editorProps,
      editorState: this.state.editorState,
      ref: this.editorRef,
      customStyleMap: this.resolveCustomStyleMap(),
      blockRenderMap: this.resolveBlockRendererMap(),
      blockRendererFn: (block: BlockNodeRecord): ?Object =>
        this.returnFirstTruthy('blockRendererFn', block),
      blockStyleFn: (block: BlockNodeRecord): string =>
        this.returnFirstTruthy('blockStyleFn', block) || '',
      customStyleFn: (
        style: DraftInlineStyle,
        block: BlockNodeRecord
      ): ?Object => this.returnFirstTruthy('customStyleFn', style, block),
      keyBindingFn: (e: SyntheticKeyboardEvent<>): ?string =>
        this.returnFirstTruthy('keyBindingFn', e),
      handleKeyCommand: (
        command: DraftEditorCommand | string,
        editorState: EditorState
      ): DraftHandleValue =>
        this.returnFirstHandled('handleKeyCommand', command, editorState) ||
        'not-handled',
      handleBeforeInput: (
        chars: string,
        editorState: EditorState
      ): DraftHandleValue =>
        this.returnFirstHandled('handleBeforeInput', chars, editorState) ||
        'not-handled',
      handlePastedText: (
        text: string,
        html?: string,
        editorState: EditorState
      ): DraftHandleValue =>
        this.returnFirstHandled('handlePastedText', text, html, editorState) ||
        'not-handled',
      handlePastedFiles: (files: Array<Blob>): DraftHandleValue =>
        this.returnFirstHandled('handlePastedFiles', files) || 'not-handled',
      handleDroppedFiles: (
        selection: SelectionState,
        files: Array<Blob>
      ): DraftHandleValue =>
        this.returnFirstHandled('handleDroppedFiles', selection, files) ||
        'not-handled',
      handleDrop: (
        selection: SelectionState,
        dataTransfer: Object,
        isInternal: DraftDragType
      ): DraftHandleValue =>
        this.returnFirstHandled(
          'handleDrop',
          selection,
          dataTransfer,
          isInternal
        ) || 'not-handled',
      handleReturn: (
        e: SyntheticKeyboardEvent<>,
        editorState: EditorState
      ): DraftHandleValue =>
        this.returnFirstHandled('handleReturn', e, editorState) ||
        'not-handled',
      onChange: this.onChange,
      onDownArrow: (e: SyntheticKeyboardEvent<>) =>
        this.eventCallback('onDownArrow', e),
      onEscape: (e: SyntheticKeyboardEvent<>) =>
        this.eventCallback('onEscape', e),
      onLeftArrow: (e: SyntheticKeyboardEvent<>) =>
        this.eventCallback('onLeftArrow', e),
      onRightArrow: (e: SyntheticKeyboardEvent<>) =>
        this.eventCallback('onRightArrow', e),
      onTab: (e: SyntheticKeyboardEvent<>) => this.eventCallback('onTab', e),
      onUpArrow: (e: SyntheticKeyboardEvent<>) =>
        this.eventCallback('onUpArrow', e),
      onFocus: (e: SyntheticEvent<>) => this.eventCallback('onFocus', e),
      onBlur: (e: SyntheticEvent<>) => this.eventCallback('onBlur', e),
    }

    // yepyepyep this gets the editorState lazily
    // avoids having to have a `getEditorState` prop
    // $FlowFixMe
    Object.defineProperty(editorProps, 'editorState', {
      get: () => this.state.editorState,
    })

    const pluginProps = {
      registerPlugin: this.registerPlugin,
      setEditorState: this.onChange,
      editorProps: this.state.editorProps,
      editorRef: this.editorRef,
      editorState: this.state.editorState,
      setEditorProps: editorProps => {
        this.setState({
          editorProps: { ...this.state.editorProps, ...editorProps },
        })
      },
    }

    // $FlowFixMe
    Object.defineProperty(pluginProps, 'editorState', {
      get: () => this.state.editorState,
    })

    return (
      <Context.Provider value={{ pluginProps, editorProps }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}
