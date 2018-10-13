// @flow

import {
  AtomicBlockUtils,
  RichUtils,
  EditorState,
  ContentState,
  SelectionState,
  Modifier,
} from 'draft-js'
import type DraftEntityInstance from 'draft-js/lib/DraftEntityInstance'
import type { DraftDecorator } from 'draft-js/lib/DraftDecorator'

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

export function getCurrentEntity(
  editorState: EditorState
): ?DraftEntityInstance {
  const contentState = editorState.getCurrentContent()
  const entityKey = this.getCurrentEntityKey(editorState)
  return entityKey ? contentState.getEntity(entityKey) : null
}

export function hasEntity(
  editorState: EditorState,
  entityType: string
): boolean {
  const entity = this.getCurrentEntity(editorState)
  return entity && entity.getType() === entityType
}
