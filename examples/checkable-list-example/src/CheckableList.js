// @flow

import React, { Component, Fragment } from 'react'
import { ContentBlock, RichUtils } from 'draft-js'
import { Plugin, withPluginContext } from '@djsp/core'
import { insertEntityBlock } from '@djsp/utils'
import AtomicBlock from '@djsp/atomic-block'
import { CheckableListItem, CheckableListItemBlock, CHECKABLE_LIST_ITEM, CheckableListItemUtils } from 'draft-js-checkable-list-item'


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
      checked: true
    }))
  }

  toggleChecked = (block) => {
    const { setEditorState, editorState } = this.props
    console.log(CheckableListItemUtils.toggleChecked(editorState, block))
    setEditorState(
      CheckableListItemUtils.toggleChecked(editorState, block)
    );
  }

  blockRendererFn = (block: ContentBlock): ?CheckableListItemBlock => {
    const { setEditorState, editorState } = this.props;
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
            checked: !!block.getData().get('checked'),
          },
        }
      }
    }
  }

  render() {
    return (<Fragment>
      {/* <AtomicBlock type={CHECKABLE_LIST_ITEM}>
        {({ isFocused, blockProps: { checked }, ...otherProps }) => {
          const props = {
            checked,
            onChangeChecked: () => this.toggleChecked(otherProps.block)
          }

          return (
            <CheckableListItem blockProps={props} {...otherProps} />
          )
        }}
      </AtomicBlock> */}
      <Plugin blockRendererFn={this.blockRendererFn}/>
      <button type="button" onClick={this.onClick}>
        Insert checkable-list
      </button>
    </Fragment>)
  }
}

export default withPluginContext(CheckableList)
