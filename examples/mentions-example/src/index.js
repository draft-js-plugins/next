// @flow

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { EditorState, Modifier } from 'draft-js'
import { EditorContainer, Editor, Plugin } from '@djsp/core'
import Autocomplete from '@djsp/autocomplete'
import { createEntityDecorator, insertTextWithEntity } from '@djsp/utils'
import '@djsp/autocomplete/dist/index.css'
import './styles.css'

const Mention = (props: { children: React.Element }) => {
  return <span className="mention">{props.children}</span>
}

const MENTION = 'MENTION'

const mentionDecorator = createEntityDecorator(MENTION, Mention)

const suggestions = [
  {
    label: 'Julian Krispel-Samsel',
    value: 'julian',
  },
  {
    label: 'Nik Graf',
    value: 'nik',
  },
]

class App extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    suggestions: [],
  }

  setSuggestions = searchText => {
    console.log('set suggestions', searchText)
    this.setState({
      suggestions: suggestions.filter(item =>
        item.label.includes(searchText.slice(1))
      ),
    })
  }

  insertMention = (mention, searchText) => {
    const { editorState } = this.state
    const selection = editorState.getSelection()

    let content = Modifier.removeRange(
      editorState.getCurrentContent(),
      selection.merge({
        anchorOffset: selection.getAnchorOffset() - searchText.length,
      })
    )

    content = insertTextWithEntity(
      content,
      content.getSelectionAfter(),
      MENTION,
      mention.label,
      'SEGMENTED',
      mention
    )

    // insert a space after
    content = Modifier.insertText(content, content.getSelectionAfter(), ' ')

    this.setState({
      editorState: EditorState.push(editorState, content, 'replace-fragment'),
    })
  }

  render() {
    return (
      <div>
        <EditorContainer
          editorState={this.state.editorState}
          onChange={editorState => this.setState({ editorState })}>
          Hello
          <Editor />
          <Plugin decorators={[mentionDecorator]} />
          <Autocomplete
            trigger="@"
            onSelect={this.insertMention}
            suggestions={this.state.suggestions}
            onSearch={this.setSuggestions}
          />
        </EditorContainer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
