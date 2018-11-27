// @flow

import React, { Component } from 'react'
import { EditorState } from 'draft-js'

type Props = {
  editorState: EditorState,
  setEditorState: EditorState => void,
}

class Redo extends Component<Props> {
  onClick = event => {
    event.stopPropagation()
    this.props.setEditorState(EditorState.redo(this.props.editorState))
  }

  render() {
    return (
      <button
        disabled={
          !this.props.editorState ||
          this.props.editorState.getRedoStack().isEmpty()
        }
        type="button"
        onClick={this.onClick}>
        redo
      </button>
    )
  }
}

export default Redo
