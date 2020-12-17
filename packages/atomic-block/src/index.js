// @flow

import React, { Component } from 'react'
import type { Node } from 'react'
import { withPluginContext, constants } from '@djsp/core'
import type { PluginProps } from '@djsp/core'
import { ContentBlock, EditorState, Modifier, SelectionState } from 'draft-js'
import { insertNewLine } from '@djsp/utils'
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey'
import AtomicBlock from './AtomicBlock'

const _BlockChildren = ({
  editorProps: { readOnly },
  editorState,
  setEditorState,
  ...props
}: Object): Node => {
  const blockKey = props.block.getKey()
  const { children, focusBlock } = props.blockProps
  const selection = editorState.getSelection()
  const isFocused =
    selection.getAnchorKey() === blockKey &&
    selection.isCollapsed() &&
    readOnly !== true

  if (readOnly) {
    return props.children({ ...props, isFocused })
  } else {
    return (
      <AtomicBlock onClick={() => focusBlock(blockKey)}>
        {children({ ...props, isFocused })}
      </AtomicBlock>
    )
  }
}

const BlockChildren = withPluginContext(_BlockChildren)

type Props = PluginProps & {
  type: string,
  children: any,
}

// Set selection of editor to next/previous block
const setSelection = (
  editorState: EditorState,
  setEditorState: (editorState: EditorState) => void,
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

class AtomicBlockPlugin extends Component<Props> {
  unregister: () => void

  constructor(props) {
    super(props)

    const { registerPlugin } = props

    this.unregister = registerPlugin({
      blockRendererFn: this.blockRendererFn,
      handleReturn: this.handleReturn,
      handleKeyCommand: this.handleKeyCommand,
    })
  }

  componentWillUnmount() {
    this.unregister()
  }

  handleKeyCommand = (
    command: string,
    editorState: EditorState
  ): DraftHandleValue => {
    const { setEditorState } = this.props

    let contentState = editorState.getCurrentContent()
    const selection = editorState.getSelection()
    const key = selection.getStartKey()
    const startBlock = contentState.getBlockForKey(key)
    const previousBlock = contentState.getBlockBefore(key)

    if (!selection.isCollapsed() && startBlock.getType() === 'atomic') {
      contentState = Modifier.removeRange(
        contentState,
        selection.merge({
          anchorOffset: 0,
          anchorKey: key,
          focusKey: selection.getEndKey(),
          focusOffset: selection.getEndOffset(),
          isBackward: false,
        })
      )

      const newSelection = contentState.getSelectionAfter().merge({
        hasFocus: true,
        anchorOffset: 0,
        anchorKey: key,
        focusKey: key,
        focusOffset: 0,
      })

      setEditorState(
        EditorState.push(
          editorState,
          Modifier.setBlockType(contentState, newSelection, 'unstyled')
        )
      )

      return constants.HANDLED
    } else if (
      startBlock.getType() !== 'atomic' &&
      previousBlock != null &&
      selection.getStartOffset() === 0 &&
      previousBlock.getType() === 'atomic' &&
      command === 'backspace'
    ) {
      setSelection(editorState, setEditorState, previousBlock)
      return constants.HANDLED
    } else if (
      startBlock.getType() === 'atomic' &&
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

  handleReturn = (
    event: SyntheticKeyboardEvent<*>,
    editorState: EditorState
  ): DraftHandleValue => {
    const { setEditorState } = this.props
    const selection = editorState.getSelection()

    const startBlock = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())

    if (selection.isCollapsed() && startBlock.getType() === 'atomic') {
      setEditorState(insertNewLine(editorState))
      return constants.HANDLED
    }

    return constants.NOT_HANDLED
  }

  blockRendererFn = (block: ContentBlock): ?Object => {
    const { type, children, editorState } = this.props

    const content = editorState.getCurrentContent()

    if (block.getType() === 'atomic') {
      const entity = block.getEntityAt(0)

      if (!entity) return null

      const entityType = content.getEntity(entity).getType()
      const data = content.getEntity(entity).getData()

      if (entityType.toLowerCase() === type.toLowerCase()) {
        return {
          component: BlockChildren,
          editable: false,
          props: {
            ...this.props,
            children,
            focusBlock: this.focusBlock,
            ...data,
          },
        }
      }
    }
  }

  render() {
    return null
  }
}

export default withPluginContext(AtomicBlockPlugin)
