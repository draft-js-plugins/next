// @flow

import React, { Component } from 'react'
import { withEditorContext } from 'djs-editor'
import type { EditorState } from 'draft-js'
import styles from './styles.css'

type Props = {
  trigger: string | (textUntilCursor: string) => ?string,
  renderSuggestion?: ({ suggestion: any, onSelect: any => void }),
  onSelect: (suggestion: any) => void,
  onAutocomplete: (searchText: string) => void,
  suggestions: Array<any>,
  pluginMethods: Object,
}

type State = {
  isOpen: boolean,
  isSearching: boolean,
  suggestions: Array<any>,
  focusedIndex: number,
}

class Suggestions extends Component<Props, State> {
  static defaultProps = {
    renderSuggestion: ({ suggestion, isFocused, onSelect }) => {
      const classNames = [styles.suggestion]
      if (isFocused) classNames.push(styles.suggestionFocused)
      return <span className={`${classNames.join(' ')}`} onMouseDown={() => onSelect(suggestion)}>
        {suggestion.label}
      </span>
    }
  }

  state = {
    isOpen: false,
    focusedIndex: 0,
    isSearching: false,
    suggestions: []
  }

  componentDidMount() {
    const { pluginMethods: { registerPlugin } } = this.props

    this._unregister = registerPlugin({
      onChange: this.onChange,
      onBlur: this.onBlur,
      keyBindingFn: this.keyBindingFn
    })
  }

  onBlur = () => this.setState({ isOpen: false })

  componentWillUnmount() {

    this._unregister()
  }

  keyBindingFn = (e: SyntheticKeyboardEvent) => {
    console.log('keybinding fn', e)
  }

  onChange = (editorState: EditorState) => {
    const { trigger, onAutocomplete } = this.props
    const selection = editorState.getSelection()

    if (!selection.isCollapsed()) {
      return
    }

    const textUntilCursor = editorState.getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getText()
      .slice(0, selection.getStartOffset())

    let searchText = null

    if (typeof trigger === 'string') {
      const lastWord = textUntilCursor.split(/\s/).slice(-1)[0]
      if (lastWord[0] === '@') {
        searchText = lastWord.slice(1)
      }
    } else if (typeof trigger === 'function') {
      searchText = trigger(textUntilCursor)
    }

    if (searchText != null) {
      this.setState({ isOpen: true })
      onAutocomplete(searchText)
    } else {
      this.setState({ isOpen: false })
    }
  }

  render() {
    const { suggestions, renderSuggestion, onSelect } = this.props
    const { isOpen, focusedIndex } = this.state

    if (isOpen === true && suggestions.length > 0) {
      return <ul className={styles.ul}>
        {suggestions.map((suggestion, index) => (
          <li className={styles.li} key={`autocomplete-option-${index}`}>
            {renderSuggestion({
              isFocused: focusedIndex === index,
              suggestion,
              onSelect
            })}
          </li>
        ))}
      </ul>
    }

    return null
  }
}

export default withEditorContext(Suggestions)
