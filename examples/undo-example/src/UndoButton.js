// @flow

import React, { Component } from 'react'
import { EditorState } from 'draft-js'

type Props = {
  editorState: EditorState,
  setEditorState: EditorState => void,
}

class UndoButton extends Component<Props> {
  onClick = event => {
    event.stopPropagation()
    this.props.setEditorState(EditorState.undo(this.props.editorState))
  }

  render() {
    return (
      <button
        disabled={
          !this.props.editorState ||
          this.props.editorState.getUndoStack().isEmpty()
        }
        type="button"
        onClick={this.onClick}>
        undo
      </button>
    )
  }
}

export default UndoButton
