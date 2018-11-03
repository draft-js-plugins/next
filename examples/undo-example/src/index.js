import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'

import { EditorState, ContentState } from 'draft-js'
import { EditorContainer, Editor, Plugin } from '@djsp/core'
import UndoButton from './UndoButton.js'
import RedoButton from './RedoButton.js'
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
          <Plugin>
            {({ editorState, setEditorState }) => (
              <Fragment>
                <UndoButton
                  editorState={editorState}
                  setEditorState={setEditorState}
                />
                <RedoButton
                  editorState={editorState}
                  setEditorState={setEditorState}
                />
              </Fragment>
            )}
          </Plugin>
          <Editor />
        </EditorContainer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
