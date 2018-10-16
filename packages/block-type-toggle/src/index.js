// @flow

import { Component } from 'react'
import { RichUtils } from 'draft-js'
import { withPluginContext } from '@djsp/core'
import type { PluginProps } from '@djsp/core'

type BlockTypeRenderProps = {
  toggleBlockType: () => void,
  hasBlockType: boolean,
}

type BlockTypeProps = PluginProps & {
  children: BlockTypeRenderProps => React.Element,
  blockType: string,
}

class BlockTypeToggle extends Component<BlockTypeProps> {
  render() {
    const { setEditorState, editorState, blockType, children } = this.props

    const hasBlockType =
      editorState != null &&
      RichUtils.getCurrentBlockType(editorState) === blockType

    const toggleBlockType = () =>
      setEditorState(RichUtils.toggleBlockType(editorState, blockType))

    return children({ hasBlockType, toggleBlockType })
  }
}

export default withPluginContext(BlockTypeToggle)
