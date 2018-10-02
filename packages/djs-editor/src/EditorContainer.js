// @flow

import React, { createContext, Component } from 'react'
import Draft from 'draft-js'
import { HANDLED } from './constants'
import type { DraftEditorProps } from 'draft-js/lib/DraftEditorProps'

const { CompositeDecorator, EditorState, getDefaultKeyBinding, DefaultDraftBlockRenderMap } = Draft

export const Context = createContext({})

export const withConsumer = Comp => React.forwardRef((props, ref) => (
  <Context.Consumer>
    {contextProps => <Comp {...props} {...contextProps} ref={ref} />}
  </Context.Consumer>
))

const resolveDecorator = plugins => new CompositeDecorator(
  Array.from(plugins.values()).reduce((acc, plugin) => (
    Array.isArray(plugin.decorators)
      ? ([
        ...acc,
        ...plugin.decorators
      ])
      : acc
  ), [])
)

type Props = DraftEditorProps

type State = {
  plugins: Map<number, Object>
}

export default class EditorContainer extends Component<Props, State> {
  static defaultProps = {
    customStyleMap: {},
    blockRenderMap: DefaultDraftBlockRenderMap
  }

  constructor(props) {
    super(props)
    this.mapKey = 0
  }

  state = {
    plugins: (new Map()).set('default', { keyBindingFn: getDefaultKeyBinding })
  }

  static getDerivedStateFromProps(props, state) {
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
      webDriverTestID
    } = props

    return {
      ...state,
      editorState: editorState != null
        ? EditorState.set(editorState, { decorator: resolveDecorator(state.plugins) })
        : editorState,
      editorProps: {
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
        webDriverTestID
      }
    }
  }

  resolveDecorator = () => resolveDecorator(this.state.plugins)

  resolveCustomStyleMap = () => Array.from(this.state.plugins.values()).reduce(
    (acc, plugin) => plugin.customStyleMap != null
      ? {...acc, ...plugin.customStyleMap}
      : acc,
    this.props.customStyleMap
  )

  resolveBlockRendererMap = () => Array.from(this.state.plugins.values()).reduce(
    (acc, plugin) => plugin.blockRenderMap != null
      ? acc.merge(plugin.blockRenderMap)
      : acc,
    this.props.blockRenderMap
  )

  setupEditorState = () => this.setState({
    editorState: EditorState.set(
      this.state.editorState,
      { decorator: this.resolveDecorator() }
    )
  })

  unregisterPlugin = (key) => {
    const { plugins } = this.state

    plugins.delete(key)

    this.setState({plugins})
    this.setupEditorState()
  }

  registerPlugin = (plugin) => {
    const { plugins } = this.state
    const key = this.mapKey

    this.setState({plugins: plugins.set(key, plugin)})
    this.setupEditorState()

    this.mapKey++

    return () => this.unregisterPlugin(key)
  }

  returnFirstTruthy = (methodName, ...args) => {
    for (let plugin of this.state.plugins.values()) {
      if (plugin[methodName] != null) {
        const result = plugin[methodName](...args)
        if (result) {
          return result
        }
      }
    }
  }

  returnFirstHandled = (methodName, ...args) => {
    for (let plugin of this.state.plugins.values()) {
      if (plugin[methodName] != null) {
        const result = plugin[methodName](...args)
        if (result === HANDLED) {
          return result
        }
      }
    }
  }

  eventCallback = (methodName, ...args) =>
    this.state.plugins.forEach(plugin => plugin[methodName] != null && plugin[methodName](...args))

  onChange = editorState => {
    this.props.onChange(editorState)
    // this.eventCallback('onChange', editorState)
  }

  render() {
    return <Context.Provider value={{
      // plugin specific
      pluginMethods: {
        registerPlugin: this.registerPlugin,
        setEditorState: this.onChange,
        setEditorProps: editorProps => this.setState({ editorProps })
      },
      editorProps: {
        ...this.state.editorProps,
        customStyleMap: this.resolveCustomStyleMap(),
        blockRenderMap: this.resolveBlockRendererMap(),
        editorState: this.state.editorState,
        blockRendererFn: (...args) => this.returnFirstTruthy('blockRendererFn', ...args),
        blockStyleFn: (...args) => this.returnFirstTruthy('blockStyleFn', ...args),
        customStyleFn: (...args) => this.returnFirstTruthy('customStyleFn', ...args),
        keyBindingFn: (...args) => this.returnFirstTruthy('keyBindingFn', ...args),
        handleKeyCommand: (...args) => this.returnFirstHandled('handleKeyCommand', ...args),
        handleBeforeInput: (...args) => this.returnFirstHandled('handleBeforeInput', ...args),
        handlePastedText: (...args) => this.returnFirstHandled('handlePastedText', ...args),
        handlePastedFiles: (...args) => this.returnFirstHandled('handlePastedFiles', ...args),
        handleDroppedFiles: (...args) => this.returnFirstHandled('handleDroppedFiles', ...args),
        handleDrop: (...args) => this.returnFirstHandled('handleDrop', ...args),
        handleReturn: (...args) => this.returnFirstHandled('handleReturn', ...args),
        onChange: this.onChange,
        onDownArrow: (...args) => this.eventCallback('onDownArrow', ...args),
        onEscape: (...args) => this.eventCallback('onEscape', ...args),
        onLeftArrow: (...args) => this.eventCallback('onLeftArrow', ...args),
        onRightArrow: (...args) => this.eventCallback('onRightArrow', ...args),
        onTab: (...args) => this.eventCallback('onTab', ...args),
        onUpArrow: (...args) => this.eventCallback('onUpArrow', ...args),
        onFocus: (...args) => this.eventCallback('onFocus', ...args),
        onBlur: (...args) => this.eventCallback('onBlur', ...args)
      }
    }}>
      {this.props.children}
    </Context.Provider>
  }
}
