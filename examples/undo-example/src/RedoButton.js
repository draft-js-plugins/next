import React, { Component } from 'react'
import { EditorState } from 'draft-js'

class RedoButton extends Component {

  onClick = (event) => {
    event.stopPropagation();
    this.props.setEditorState(EditorState.redo(this.props.editorState));
  };

  render() {
    return (
			<button
        disabled={ !this.props.editorState || this.props.editorState.getRedoStack().isEmpty() }
        type="button"
        onClick={this.onClick}
      >redo</button>
    )
  }
}

export default RedoButton