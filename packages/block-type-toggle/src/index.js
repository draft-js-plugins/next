// @flow

import { Component } from 'react'
import { EditorState, RichUtils } from 'draft-js'
import { withEditorContext } from '@djsp/editor'

type BlockTypeRenderProps = {
  toggleBlockType: () => void,
  hasBlockType: boolean,
}

type BlockTypeProps = {
  pluginMethods: {
    setEditorState: (editorState: EditorState) => void,
    editorState: EditorState,
  },
  children: BlockTypeRenderProps => React.Element,
  blockType: string,
}

class BlockTypeToggle extends Component<BlockTypeProps> {
  render() {
    const {
      pluginMethods: { setEditorState, editorState },
      blockType,
      children,
    } = this.props

    const hasBlockType =
      editorState != null &&
      RichUtils.getCurrentBlockType(editorState) === blockType

    const toggleBlockType = () =>
      setEditorState(RichUtils.toggleBlockType(editorState, blockType))

    return children({ hasBlockType, toggleBlockType })
  }
}

export default withEditorContext(BlockTypeToggle)
