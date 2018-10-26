// @flow

import React, { Component } from 'react'
import { withPluginContext, constants } from '@djsp/core'
import type { PluginProps } from '@djsp/core'
import { ContentBlock, EditorState, Modifier, SelectionState } from 'draft-js'
import { insertNewLine } from '@djsp/utils'
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey'
import AtomicBlock from './AtomicBlock'

type Props = PluginProps & {
  type: string,
  children: any,
}

type State = {
  isFocused: boolean,
}

// Set selection of editor to next/previous block
const setSelection = (
  editorState: EditorState,
  setEditorState: EditorState,
  newActiveBlock: ContentBlock
): void => {
  // TODO verify that always a key-0-0 exists
  const offsetKey = DraftOffsetKey.encode(newActiveBlock.getKey(), 0, 0)
  const node = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`)[0]
  // set the native selection to the node so the caret is not in the text and
  // the selectionState matches the native selection
  const selection = window.getSelection()
  const range = document.createRange()
  range.setStart(node, 0)
  range.setEnd(node, 0)
  selection.removeAllRanges()
  selection.addRange(range)

  setEditorState(
    EditorState.forceSelection(
      editorState,
      new SelectionState({
        anchorKey: newActiveBlock.getKey(),
        anchorOffset: 0,
        focusKey: newActiveBlock.getKey(),
        focusOffset: 0,
        isBackward: false,
      })
    )
  )
}

class AtomicBlockPlugin extends Component<Props, State> {
  unregister: () => void

  constructor(props) {
    super(props)

    const { registerPlugin } = this.props

    this.unregister = registerPlugin({
      blockRendererFn: this.blockRendererFn,
      handleReturn: this.handleReturn,
      handleKeyCommand: this.handleKeyCommand,
    })
  }

  componentWillUnmount() {
    this.unregister()
  }

  handleKeyCommand = (command, editorState) => {
    const { setEditorState } = this.props

    let contentState = editorState.getCurrentContent()
    const selection = editorState.getSelection()
    const key = selection.getStartKey()
    const currentBlock = contentState.getBlockForKey(key)
    const previousBlock = contentState.getBlockBefore(key)

    if (!selection.isCollapsed()) {
      return constants.NOT_HANDLED
    } else if (
      currentBlock.getType() !== 'atomic' &&
      previousBlock != null &&
      selection.getStartOffset() === 0 &&
      previousBlock.getType() === 'atomic' &&
      command === 'backspace'
    ) {
      setSelection(editorState, setEditorState, previousBlock)
      return constants.HANDLED
    } else if (
      currentBlock.getType() === 'atomic' &&
      ['backspace', 'delete'].includes(command)
    ) {
      contentState = Modifier.removeRange(
        contentState,
        editorState.getSelection().merge({
          anchorOffset: 0,
          focusOffset: 1,
        }),
        null
      )

      setEditorState(
        EditorState.push(
          editorState,
          Modifier.setBlockType(contentState, selection, 'unstyled')
        )
      )
      return constants.HANDLED
    }

    return constants.NOT_HANDLED
  }

  focusBlock = (blockKey: string) => {
    const { setEditorState, editorState } = this.props
    const block = editorState.getCurrentContent().getBlockForKey(blockKey)

    setSelection(editorState, setEditorState, block)
  }

  deleteAtomicBlock = (key: string) => {
    const { editorState, setEditorState } = this.props
    const selection = editorState.getSelection()

    setEditorState(
      EditorState.push(
        editorState,
        Modifier.removeRange(
          editorState.getCurrentContent(),
          selection.merge({
            anchorKey: key,
            focusKey: key,
            anchorOffset: 0,
            focusOffset: 1,
          })
        )
      )
    )
  }

  renderChildren = (props: Object) => {
    const {
      editorProps: { readOnly },
      editorState,
      setEditorState,
    } = this.props

    const blockKey = props.block.getKey()
    const selection = editorState.getSelection()
    const isFocused =
      selection.getAnchorKey() === blockKey &&
      selection.isCollapsed() &&
      readOnly !== true

    if (readOnly) {
      return this.props.children({ ...props, isFocused })
    } else {
      return (
        <AtomicBlock
          onDeleteBlock={() => this.deleteAtomicBlock(blockKey)}
          setEditorState={setEditorState}
          isFocused={isFocused}
          onClick={() => this.focusBlock(blockKey)}>
          {this.props.children({ ...props, isFocused })}
        </AtomicBlock>
      )
    }
  }

  handleReturn = (event, editorState) => {
    const { setEditorState } = this.props

    setEditorState(insertNewLine(editorState))
  }

  blockRendererFn = block => {
    const { type, editorState } = this.props

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
