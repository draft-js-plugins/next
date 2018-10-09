// @flow

import React, { Component } from 'react'
import { withEditorContext } from '@djsp/editor'
import Draft from 'draft-js'
import AtomicBlock from './AtomicBlock'

const { EditorState } = Draft

type Props = {
  type: string,
  children: any,
  editorProps: Object,
}

type State = {
  isFocused: boolean,
}

class AtomicBlockPlugin extends Component<Props, State> {
  constructor(props) {
    super(props)

    const {
      pluginProps: { registerPlugin },
    } = this.props

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
    const {
      editorProps: { editorState },
      pluginProps: { setEditorState },
    } = this.props

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

  handleReturn = () => {
    // const {
    //   editorProps: { editorState },
    // } = this.props

    // const selection = editorState.getSelection()

    console.log('handle return')
  }

  renderChildren = (props: Object) => {
    const {
      editorProps: { editorState },
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
      editorProps: { editorState },
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

export default withEditorContext(AtomicBlockPlugin)
