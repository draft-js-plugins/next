import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { EditorState, ContentState } from 'draft-js'
import { EditorContainer, Editor } from '@djsp/editor'
import { getCharCount, getWordCount, getLineCount } from '@djsp/utils'
import './styles.css'

class App extends Component {
  state = {
    editorState: EditorState.createWithContent(
      ContentState.createFromText('Just type!')
    ),
  }

  onChange = editorState => this.setState({ editorState })

  render() {
    return (
      <div>
        <EditorContainer
          editorState={this.state.editorState}
          onChange={this.onChange}>
          <div>Char count: {getCharCount(this.state.editorState)}</div>
          <div>Word count: {getWordCount(this.state.editorState)}</div>
          <div>Line count: {getLineCount(this.state.editorState)}</div>
          <Editor />
        </EditorContainer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
