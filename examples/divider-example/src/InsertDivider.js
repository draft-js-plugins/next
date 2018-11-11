// @flow

import React, { Component } from 'react'
import { insertEntityBlock } from '@djsp/utils'

type Props = {
  editorState: EditorState,
  setEditorState: EditorState => void,
}

class InsertDivider extends Component<Props> {
  onClick = event => {
    event.stopPropagation()

    const { setEditorState, editorState } = this.props;
    setEditorState(insertEntityBlock(editorState, 'divider'))
  }

  render() {
    return (
      <button
        type="button"
        onClick={this.onClick}>
        Insert divider
      </button>
    )
  }
}

export default InsertDivider
