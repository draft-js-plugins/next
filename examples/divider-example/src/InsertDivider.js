// @flow

import React, { Component, Fragment } from 'react'
import { Plugin } from '@djsp/core'
import AtomicBlock from '@djsp/atomic-block'
import { insertEntityBlock } from '@djsp/utils'

type Props = {
  editorState: EditorState,
  setEditorState: EditorState => void,
}

class DividerButton extends Component<Props> {
  onClick = event => {
    event.stopPropagation()

    const { setEditorState, editorState } = this.props
    setEditorState(insertEntityBlock(editorState, 'divider'))
  }

  render() {
    return (
      <button type="button" onClick={this.onClick}>
        Insert divider
      </button>
    )
  }
}

const InsertDivider = () => (
  <Fragment>
    <AtomicBlock type="divider">
      {({ isFocused }) => (
        <hr className={isFocused ? 'divider focused' : 'divider'} />
      )}
    </AtomicBlock>

    <Plugin>
      {({ editorState, setEditorState }) => (
        <DividerButton
          editorState={editorState}
          setEditorState={setEditorState}
        />
      )}
    </Plugin>
  </Fragment>
)

export default InsertDivider
