// @flow

import { List } from 'immutable'
import {
  AtomicBlockUtils,
  RichUtils,
  EditorState,
  ContentBlock,
  ContentState,
  BlockMapBuilder,
  genKey as generateRandomKey,
  SelectionState,
  Modifier,
} from 'draft-js'
import type DraftEntityInstance from 'draft-js/lib/DraftEntityInstance'
import type { DraftDecorator } from 'draft-js/lib/DraftDecorator'
// eslint-disable-next-line node/no-deprecated-api
import punycode from 'punycode'

export function replaceWithAtomicBlock(
  editorState: EditorState,
  entityType: string,
  data: Object
): EditorState {
  const contentState = editorState.getCurrentContent()
  const contentStateWithEntity = contentState.createEntity(
    entityType,
    'IMMUTABLE',
    data
  )

  let selection = editorState.getSelection()
  let content = editorState.getCurrentContent()
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
  const block = content.getBlockForKey(selection.getStartKey())

  content = Modifier.replaceText(
    content,
    selection.merge({ anchorOffset: 0, focusOffset: block.getText().length }),
    ' ',
    null,
    entityKey
  )
  selection = content.getSelectionAfter()
  content = Modifier.splitBlock(content, selection)
  content = Modifier.setBlockType(content, selection, 'atomic')

  return EditorState.push(editorState, content, 'insert-fragment')
}

export function insertEntityBlock(
  editorState: EditorState,
  entityType: string,
  data: Object
): EditorState {
  const contentState = editorState.getCurrentContent()
  const contentStateWithEntity = contentState.createEntity(
    entityType,
    'IMMUTABLE',
    data
  )

  const entityKey = contentStateWithEntity.getLastCreatedEntityKey()

  return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ')
}

export function createEntityDecorator(
  entityName: string,
  component: Function,
  props?: Object
): DraftDecorator {
  return {
    strategy: (contentBlock, callback, contentState) => {
      contentBlock.findEntityRanges(character => {
        const entityKey = character.getEntity()
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === entityName
        )
      }, callback)
    },
    component,
    props,
  }
}

export function insertTextWithEntity(
  contentState: ContentState,
  selection: SelectionState,
  entityType: string,
  text: string,
  mutability?: 'IMMUTABLE' | 'MUTABLE' | 'SEGMENTED',
  entityData?: Object
): ContentState {
  const content = contentState.createEntity(entityType, mutability, entityData)

  return Modifier.insertText(
    content,
    selection,
    text,
    null,
    content.getLastCreatedEntityKey()
  )
}

export function createLinkAtSelection(
  editorState: EditorState,
  url: string
): EditorState {
  const contentState = editorState
    .getCurrentContent()
    .createEntity('LINK', 'MUTABLE', { url })
  const entityKey = contentState.getLastCreatedEntityKey()
  const withLink = RichUtils.toggleLink(
    editorState,
    editorState.getSelection(),
    entityKey
  )

  return EditorState.forceSelection(withLink, editorState.getSelection())
}

export function removeLinkAtSelection(editorState: EditorState): EditorState {
  const selection = editorState.getSelection()
  return RichUtils.toggleLink(editorState, selection, null)
}

export function collapseToEnd(editorState: EditorState): EditorState {
  const selection = editorState.getSelection()

  return EditorState.forceSelection(
    editorState,
    selection.merge({
      anchorKey: selection.getEndKey(),
      focusKey: selection.getEndKey(),
      anchorOffset: selection.getEndOffset(),
      focusOffset: selection.getEndOffset(),
    })
  )
}

export function getCurrentEntityKey(editorState: EditorState): ?string {
  const selection = editorState.getSelection()
  const anchorKey = selection.getAnchorKey()
  const contentState = editorState.getCurrentContent()
  const anchorBlock = contentState.getBlockForKey(anchorKey)
  const offset = selection.anchorOffset
  const index = selection.isBackward ? offset - 1 : offset
  return anchorBlock.getEntityAt(index)
}

export function createEntityStrategy(entityType: string) {
  return function entityStrategy(
    contentBlock: ContentBlock,
    callback: (start: number, end: number) => void,
    contentState: ContentState
  ) {
    if (!contentState) return
    contentBlock.findEntityRanges(character => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === entityType
      )
    }, callback)
  }
}

export function getCurrentEntity(
  editorState: EditorState
): ?DraftEntityInstance {
  const contentState = editorState.getCurrentContent()
  const entityKey = getCurrentEntityKey(editorState)
  return entityKey ? contentState.getEntity(entityKey) : null
}

export function getBlockEntityKey(
  contentState: ContentState,
  key: string
): ?string {
  const block = contentState.getBlockForKey(key)
  const entity = block.getEntityAt(0)

  if (entity != null) {
    return entity
  } else {
    return null
  }
}

export function hasEntity(
  editorState: EditorState,
  entityType: string
): boolean {
  const entity = getCurrentEntity(editorState)
  if (entity) {
    return entity.getType() === entityType
  } else {
    return false
  }
}

const insertBlockAfterSelection = (contentState, selectionState, newBlock) => {
  const targetKey = selectionState.getStartKey()
  const array = []

  contentState.getBlockMap().forEach((block, blockKey) => {
    array.push(block)
    if (blockKey !== targetKey) return
    array.push(newBlock)
  })

  return contentState.merge({
    blockMap: BlockMapBuilder.createFromArray(array),
    selectionBefore: selectionState,
    selectionAfter: selectionState.merge({
      anchorKey: newBlock.getKey(),
      anchorOffset: newBlock.getLength(),
      focusKey: newBlock.getKey(),
      focusOffset: newBlock.getLength(),
      isBackward: false,
    }),
  })
}

export function insertNewLine(editorState: EditorState): EditorState {
  const contentState = editorState.getCurrentContent()
  const selectionState = editorState.getSelection()

  const newLineBlock = new ContentBlock({
    key: generateRandomKey(),
    type: 'unstyled',
    text: '',
    characterList: List(),
  })

  const withNewLine = insertBlockAfterSelection(
    contentState,
    selectionState,
    newLineBlock
  )
  const newContent = withNewLine.merge({
    selectionAfter: withNewLine.getSelectionAfter().set('hasFocus', true),
  })
  return EditorState.push(editorState, newContent, 'insert-fragment')
}

export function getCharCount(editorState: EditorState): number {
  const decodeUnicode = str => punycode.ucs2.decode(str) // func to handle unicode characters
  const plainText = editorState.getCurrentContent().getPlainText('')
  const regex = /(?:\r\n|\r|\n)/g // new line, carriage return, line feed
  const cleanString = plainText.replace(regex, '').trim() // replace above characters w/ nothing
  return decodeUnicode(cleanString).length
}

export function getLineCount(editorState: EditorState): number {
  const blockArray = editorState.getCurrentContent().getBlocksAsArray()
  return blockArray ? blockArray.length : 0
}

export function getWordCount(editorState: EditorState): number {
  const plainText = editorState.getCurrentContent().getPlainText('')
  const regex = /(?:\r\n|\r|\n)/g // new line, carriage return, line feed
  const cleanString = plainText.replace(regex, ' ').trim() // replace above characters w/ space
  const wordArray = cleanString.match(/\S+/g) // matches words according to whitespace
  return wordArray ? wordArray.length : 0
}
