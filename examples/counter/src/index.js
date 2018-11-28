import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { EditorState, ContentState } from 'draft-js'
import { EditorContainer, Editor } from '@djsp/core'
import WordCountPlugin from './WordCountPlugin'
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
          <Editor />
        </EditorContainer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
