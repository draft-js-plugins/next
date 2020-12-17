// @flow

import React, { Component, Fragment } from 'react'
import {
  EditorState,
  ContentBlock,
  DefaultDraftBlockRenderMap,
  RichUtils,
} from 'draft-js'
import { withPluginContext } from '@djsp/core'
import type { PluginProps } from '@djsp/core'
import {
  CheckableListItem,
  CheckableListItemBlock,
  CHECKABLE_LIST_ITEM,
  blockRenderMap,
  CheckableListItemUtils,
} from 'draft-js-checkable-list-item'

function mergeBlockData(
  editorState: EditorState,
  block: ContentBlock,
  data: { [id: string]: any }
): EditorState {
  const content = editorState.getCurrentContent()
  const updatedBlock = block.mergeIn(['data'], data)
  const blockKey = block.getKey()
  const blockMap = content.getBlockMap().merge({ [blockKey]: updatedBlock })
  return EditorState.push(
    editorState,
    content.merge({ blockMap }),
    'change-block-data'
  )
}

class CheckableList extends Component<PluginProps> {
  _unregister: () => void

  updateEditorState = (newEditorState: EditorState) => {
    const { setEditorState, editorState } = this.props
    setEditorState(
      EditorState.forceSelection(newEditorState, editorState.getSelection())
    )
  }

  onClick = event => {
    event.stopPropagation()

    const { editorState } = this.props
    const newEditorState = RichUtils.toggleBlockType(
      editorState,
      CHECKABLE_LIST_ITEM
    )
    this.updateEditorState(newEditorState)
  }

  toggleChecked = (block: ContentBlock) => {
    const { editorState } = this.props
    let newEditorState = mergeBlockData(editorState, block, {
      checked: !block.getData().get('checked'),
    })
    this.updateEditorState(newEditorState)
  }

  handleTab = (event: SyntheticKeyboardEvent): ?boolean => {
    // debugger
    if (this.adjustBlockDepth(event)) {
      return true
    }
    const { editorState, setEditorState } = this.props
    const newEditorState = RichUtils.onTab(event, editorState, 4)
    if (newEditorState !== editorState) {
      setEditorState(newEditorState)
    }
  }

  adjustBlockDepth(event: SyntheticKeyboardEvent): boolean {
    const { editorState, setEditorState } = this.props
    const newEditorState = CheckableListItemUtils.onTab(event, editorState, 4)
    if (newEditorState !== editorState) {
      setEditorState(newEditorState)
      return true
    }
    return false
  }

  componentDidMount() {
    const { registerPlugin } = this.props

    this._unregister = registerPlugin({
      blockRendererFn: (block: ContentBlock): ?CheckableListItemBlock => {
        if (block.getType() === CHECKABLE_LIST_ITEM) {
          return {
            component: CheckableListItem,
            props: {
              onChangeChecked: () => this.toggleChecked(block),
              checked: !!block.getData().get('checked'),
            },
          }
        }
      },
      blockRenderMap: DefaultDraftBlockRenderMap.merge(blockRenderMap),
      blockStyleFn: (block: ContentBlock): ?string => {
        if (block.getType() === CHECKABLE_LIST_ITEM) {
          return CHECKABLE_LIST_ITEM
        }
      },
      onTab: this.handleTab,
    })
  }

  getStyle = (): object => {
    const { editorState } = this.props
    const selection = editorState.getSelection()
    const currentBlockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType()

    return currentBlockType === CHECKABLE_LIST_ITEM
      ? {
          fontWeight: 'BOLD',
          cursor: 'pointer',
        }
      : { cursor: 'pointer' }
  }

  render() {
    return (
      <Fragment>
        <span style={this.getStyle()} onClick={this.onClick}>
          ✓
        </span>
      </Fragment>
    )
  }
}

export default withPluginContext(CheckableList)
