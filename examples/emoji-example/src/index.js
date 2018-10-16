import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { EditorState, ContentState, Modifier } from 'draft-js'
import { EditorContainer, Editor } from '@djsp/core'
import Autocomplete from '@djsp/autocomplete'
import emojis from 'emoji.json'
import '@djsp/autocomplete/dist/index.css'
import './styles.css'

class App extends Component {
  state = {
    editorState: EditorState.createWithContent(
      ContentState.createFromText(
        'To trigger the emoji autocomplete just type :'
      )
    ),
    suggestions: [],
  }

  renderSuggestion = ({ suggestion, isFocused }) => {
    const classNames = ['list__item']
    if (isFocused) classNames.push('list__item--focused')
    return (
      <span className={`${classNames.join(' ')}`}>
        {suggestion.char} {suggestion.name}
      </span>
    )
  }

  setSuggestions = searchText => {
    const search = searchText.slice(1)
    this.setState({
      suggestions: emojis
        .filter(
          item => item.name.includes(search) || item.keywords.includes(search)
        )
        .slice(0, 30),
    })
  }

  insertEmoji = (emoji, searchText) => {
    const { editorState } = this.state
    const selection = editorState.getSelection()

    this.setState({
      editorState: EditorState.push(
        editorState,
        Modifier.replaceText(
          editorState.getCurrentContent(),
          selection.merge({
            anchorOffset: selection.getAnchorOffset() - searchText.length,
          }),
          emoji.char
        )
      ),
    })
  }

  onChange = editorState => {
    this.setState({ editorState })
  }

  render() {
    return (
      <div>
        <EditorContainer
          editorState={this.state.editorState}
          onChange={this.onChange}>
          <Editor />

          <div className="autocomplete">
            <Autocomplete
              trigger=":"
              onSelect={this.insertEmoji}
              suggestions={this.state.suggestions}
              renderSuggestion={this.renderSuggestion}
              onSearch={this.setSuggestions}
            />
          </div>
        </EditorContainer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
