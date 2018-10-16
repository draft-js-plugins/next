// @flow

import React, { Component } from 'react'
import { withPluginContext } from '@djsp/core'
import type { PluginProps } from '@djsp/core'
import Draft from 'draft-js'
import AtomicBlock from './AtomicBlock'

const { EditorState } = Draft

type Props = PluginProps & {
  type: string,
  children: any,
}

type State = {
  isFocused: boolean,
}

class AtomicBlockPlugin extends Component<Props, State> {
  unregister: () => void

  constructor(props) {
    super(props)

    const { registerPlugin } = this.props

    this.unregister = registerPlugin({
      handleReturn: this.handleReturn,
      keyBindingFn: this.keyBindingFn,
      blockRendererFn: this.blockRendererFn,
    })
  }

  componentWillUnmount() {
    this.unregister()
  }

  focusBlock = (blockKey: string) => {
    const { setEditorState, editorState } = this.props

    let selection = editorState.getSelection()

    selection = selection.merge({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: blockKey,
      focusOffset: 0,
    })

    window.getSelection().removeAllRanges()

    setEditorState(EditorState.forceSelection(editorState, selection))
  }

  keyBindingFn = (event: SyntheticKeyboardEvent<*>) => {
    console.log('event.key', event.key)
  }

  renderChildren = (props: Object) => {
    const {
      editorState,
    } = this.props

    const blockKey = props.block.getKey()
    const selection = editorState.getSelection()
    const isFocused =
      selection.getAnchorKey() === blockKey && selection.isCollapsed()

    return (
      <AtomicBlock
        isFocused={isFocused}
        onClick={() => this.focusBlock(blockKey)}>
        {this.props.children(props)}
      </AtomicBlock>
    )
  }

  blockRendererFn = block => {
    const {
      type,
      editorState,
    } = this.props
    const content = editorState.getCurrentContent()

    if (block.getType() === 'atomic') {
      const entity = block.getEntityAt(0)

      if (!entity) return null

      const entityType = content.getEntity(entity).getType()
      const data = content.getEntity(entity).getData()

      if (entityType.toLowerCase() === type.toLowerCase()) {
        return {
          component: this.renderChildren,
          editable: false,
          props: data,
        }
      }
    }
  }

  render() {
    return null
  }
}

export default withPluginContext(AtomicBlockPlugin)
