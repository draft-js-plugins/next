import React, { Component } from 'react'
import { EditorState } from 'draft-js'

class UndoButton extends Component {

  onClick = (event) => {
    event.stopPropagation();
    this.props.setEditorState(EditorState.undo(this.props.editorState));
  };

  render() {
    return (
			<button
        disabled={ !this.props.editorState || this.props.editorState.getUndoStack().isEmpty() }
        type="button"
        onClick={this.onClick}
      >undo</button>
    )
  }
}

export default UndoButton