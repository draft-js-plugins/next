// @flow

import React, { Component, Fragment } from 'react'
import { EditorState, ContentBlock, DefaultDraftBlockRenderMap } from 'draft-js'
import { Plugin, withPluginContext } from '@djsp/core'
import { insertEntityBlock, mergeEntityData } from '@djsp/utils'
import { CheckableListItem, CheckableListItemBlock, CHECKABLE_LIST_ITEM, blockRenderMap } from 'draft-js-checkable-list-item'


type Props = {
  block: Object,
  blockProps: {
    editorState: EditorState,
    setEditorState: EditorState => void,
  },
}

class CheckableList extends Component<Props> {
  _unregister: () => void

  onClick = event => {
    event.stopPropagation()

    const { setEditorState, editorState } = this.props
    setEditorState(insertEntityBlock(editorState, CHECKABLE_LIST_ITEM, {
      checked: false
    }))
  }

  toggleChecked = (block) => {
    const { setEditorState, editorState } = this.props
    const content = editorState.getCurrentContent();
    const entityKey = block.getEntityAt(0);
    const data = content.getEntity(entityKey).getData();
    
    let newEditorState = mergeEntityData(editorState, entityKey, { checked: !data.checked })
    setEditorState(EditorState.forceSelection(
      newEditorState,
      editorState.getSelection()
    ));
  }

  blockRendererFn = (block: ContentBlock): ?CheckableListItemBlock => {
    const { editorState } = this.props;
    var content = editorState.getCurrentContent();
    
    if (block.getType() === 'atomic') {
      var entity = block.getEntityAt(0);
      if (!entity) return null;
      var entityType = content.getEntity(entity).getType();
      var data = content.getEntity(entity).getData();

      if (entityType === CHECKABLE_LIST_ITEM) {
        return {
          component: CheckableListItem,
          props: {
            onChangeChecked: () => this.toggleChecked(block),
            checked: !!data.checked,
          },
        }
      }
    }
  }

  blockStyleFn(block: ContentBlock): ?string {
    if (block.getType() === CHECKABLE_LIST_ITEM) {
      return CHECKABLE_LIST_ITEM
    }
  }

  render() {
    return (<Fragment>
      <Plugin
        blockRendererFn={this.blockRendererFn}
        blockRenderMap={DefaultDraftBlockRenderMap.merge(blockRenderMap)}
        blockStyleFn={this.blockStyleFn} />
      <button type="button" onClick={this.onClick}>
        Insert checkable-list
      </button>
    </Fragment>)
  }
}

export default withPluginContext(CheckableList)
