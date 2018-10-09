// @flow

import React, { Component } from 'react'
import { withEditorContext } from '@djsp/editor'
import Popover from 'react-text-selection-popover'

type Props = {
  trigger: string | (textUntilCursor => ?string),
  renderSuggestion: { suggestion: any, onSelect: any => void },
  pluginProps: Object,
  getSuggestions: (searchText: string) => Array<any> | Promise<Array<any>>,
}

class Suggestions extends Component<Props> {
  static defaultProps = {
    trigger: '@',
    renderSuggestion: ({ suggestion, onSelect }) => {
      return (
        <li key={suggestion.value} onMouseDown={() => onSelect(suggestion)}>
          {suggestion.label}
        </li>
      )
    },
  }

  state = {
    isOpen: false,
    isSearching: false,
    suggestions: [],
  }

  componentDidMount() {
    const {
      pluginProps: { registerPlugin },
    } = this.props
    this._unregister = registerPlugin({
      onChange: this.onChange,
    })
  }

  componentWillUnmount() {
    this._unregister()
  }

  selectSuggestion = suggestion => {
    console.log('select suggestion', suggestion)
  }

  openSuggestions = searchText => {
    const result = this.props.getSuggestions(searchText)
    if (result.then != null) {
      this.setState({
        isOpen: true,
        isSearching: true,
      })
      result
        .then(suggestions =>
          this.setState({
            isSearching: false,
            suggestions,
          })
        )
        .catch(err =>
          this.setState({
            isSearching: false,
            error: err.message,
          })
        )
    } else if (result != null) {
      this.setState({
        isOpen: true,
        suggestions: result,
      })
    }
  }

  onChange = editorState => {
    const { trigger } = this.props
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      return
    }

    const textUntilCursor = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getText()
      .slice(0, selection.getStartOffset())

    if (typeof trigger === 'string') {
      const lastWord = textUntilCursor.split(/\s/).slice(-1)[0]
      if (lastWord != null && lastWord[0] === trigger) {
        this.openSuggestions(lastWord.slice(1))
      } else {
        this.setState({ isOpen: false })
      }
    } else if (typeof trigger === 'function') {
      const match = trigger(textUntilCursor)
      if (match != null) {
        this.openSuggestions(match)
      } else {
        this.setState({ isOpen: false })
      }
    } else {
      this.setState({ isOpen: false })
    }
  }

  renderSuggestions = () => {
    if (this.state.isOpen === true && this.state.isSearching) {
      return <div>Searching ...</div>
    } else if (
      this.state.isOpen === true &&
      this.state.suggestions.length === 0
    ) {
      return <div>No results ...</div>
    } else if (
      this.state.isOpen === true &&
      this.state.suggestions.length > 0
    ) {
      return (
        <ul>
          {this.state.suggestions.map(suggestion =>
            this.props.renderSuggestion({
              suggestion,
              onSelect: this.selectSuggestion,
            })
          )}
        </ul>
      )
    }
  }

  render() {
    return (
      this.state.isOpen === true && (
        <Popover isOpen={true}>{this.renderSuggestions()}</Popover>
      )
    )
  }
}

export default withEditorContext(Suggestions)
