import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { EditorState, ContentState } from 'draft-js'
import { EditorContainer, Editor } from '@djsp/core'
import { RedoButton, UndoButton } from './Undo'
import './styles.css'

class App extends Component {
  state = {
    editorState: EditorState.createWithContent(
      ContentState.createFromText(
        'Just type something and click the undo and redo button!'
      )
    ),
  }

  onChange = editorState => this.setState({ editorState })

  render() {
    return (
      <div>
        <EditorContainer
          editorState={this.state.editorState}
          onChange={this.onChange}>
          <RedoButton />
          <UndoButton />
          <Editor />
        </EditorContainer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
