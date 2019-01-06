// @flow

import React, { Component, Fragment } from 'react'
import { EditorState, ContentBlock, DefaultDraftBlockRenderMap, RichUtils } from 'draft-js'
import { withPluginContext } from '@djsp/core'
import type { PluginProps } from '@djsp/core'
import { mergeBlockData } from '@djsp/utils'
import { CheckableListItem, CheckableListItemBlock, CHECKABLE_LIST_ITEM, blockRenderMap } from 'draft-js-checkable-list-item'

class CheckableList extends Component<PluginProps> {
  _unregister: () => void

  onClick = event => {
    event.stopPropagation()

    const { setEditorState, editorState } = this.props
    setEditorState(RichUtils.toggleBlockType(editorState, CHECKABLE_LIST_ITEM))
  }

  toggleChecked = (block: ContentBlock) => {
    const { setEditorState, editorState } = this.props
    
    let newEditorState = mergeBlockData(editorState, block, { checked: !block.getData().get('checked') })
    setEditorState(EditorState.forceSelection(
      newEditorState,
      editorState.getSelection()
    ));
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
      }
    })
  }

  render() {
    return (<Fragment>
      <button type="button" onClick={this.onClick}>
        Toggle checkable-list
      </button>
    </Fragment>)
  }
}

export default withPluginContext(CheckableList)
