// @flow

import React, { Component } from 'react'
import type { Node } from 'react'
import { withPluginContext, constants } from '@djsp/core'
import type { PluginProps } from '@djsp/core'
import styles from './styles.css'

type Props = PluginProps & {
  trigger: string | ((textUntilCursor: string) => ?string),
  renderSuggestion: ({ isFocused: boolean, suggestion: any }) => Node,
  onSelect: (suggestion: any, searchText: ?string) => void,
  onSearch: (searchText: string) => void,
  suggestions: Array<any>,
}

type State = {
  isOpen: boolean,
  isSearching: boolean,
  suggestions: Array<any>,
  selectedItem: number,
  searchText: ?string,
}

class Suggestions extends Component<Props, State> {
  static defaultProps = {
    renderSuggestion: ({ suggestion, isFocused }) => {
      const classNames = [styles.suggestion]
      if (isFocused) classNames.push(styles.suggestionFocused)
      return (
        <span className={`${classNames.join(' ')}`}>{suggestion.label}</span>
      )
    },
  }

  state = {
    isOpen: false,
    isSearching: false,
    suggestions: [],
    selectedItem: 0,
    searchText: null,
  }

  _unregister: () => void

  componentDidMount() {
    const { registerPlugin } = this.props

    this._unregister = registerPlugin({
      onBlur: this.onBlur,
      onDownArrow: this.onDownArrow,
      onUpArrow: this.onUpArrow,
      handleReturn: this.handleReturn,
    })
  }

  onBlur = () => this.setState({ isOpen: false })

  componentWillUnmount() {
    this._unregister()
  }

  handleReturn = () => {
    if (this.state.isOpen && this.props.suggestions.length > 0) {
      this.onSelect(this.props.suggestions[this.state.selectedItem])
      return constants.HANDLED
    }

    return constants.NOT_HANDLED
  }

  onDownArrow = e => {
    if (this.state.isOpen && this.props.suggestions.length > 0) {
      e.preventDefault()
      const selectedItem =
        this.state.selectedItem >= this.props.suggestions.length - 1
          ? 0
          : this.state.selectedItem + 1

      this.setState({ selectedItem })
      return constants.HANDLED
    }
    return constants.NOT_HANDLED
  }

  onUpArrow = e => {
    if (this.state.isOpen && this.props.suggestions.length > 0) {
      e.preventDefault()
      const selectedItem =
        this.state.selectedItem === 0
          ? this.props.suggestions.length - 1
          : this.state.selectedItem - 1

      this.setState({ selectedItem })
      return constants.HANDLED
    }
    return constants.NOT_HANDLED
  }

  static getDerivedStateFromProps(props, state) {
    const { trigger, suggestions, editorState } = props

    const selection = editorState.getSelection()

    if (!selection.isCollapsed()) {
      return
    }

    const textUntilCursor = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getText()
      .slice(0, selection.getStartOffset())

    let searchText = null

    if (typeof trigger === 'string') {
      const lastWord = textUntilCursor.split(/\s/).slice(-1)[0]
      if (lastWord[0] === trigger) {
        searchText = lastWord
      }
    } else if (typeof trigger === 'function') {
      searchText = trigger(textUntilCursor)
    }

    return {
      ...state,
      selectedItem:
        state.selectedItem > suggestions.length - 1 ? 0 : state.selectedItem,
      searchText,
      isOpen: searchText != null && suggestions.length > 0,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.searchText != null &&
      prevState.searchText !== this.state.searchText
    ) {
      this.props.onSearch(this.state.searchText)
    }
  }

  onSelect = item => {
    this.props.onSelect(item, this.state.searchText)
  }

  render() {
    const { suggestions, renderSuggestion } = this.props
    const { isOpen, selectedItem } = this.state

    if (isOpen === true && suggestions.length > 0) {
      return (
        <ul className={styles.ul}>
          {suggestions.map((suggestion, index) => (
            <li
              className={styles.li}
              key={`autocomplete-option-${index}`}
              onMouseDown={() => this.onSelect(suggestion)}>
              {renderSuggestion({
                isFocused: selectedItem === index,
                suggestion,
              })}
            </li>
          ))}
        </ul>
      )
    }

    return null
  }
}

export default withPluginContext(Suggestions)
