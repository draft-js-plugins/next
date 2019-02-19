import { expect } from 'chai'
import {
  EditorState,
  ContentState,
  convertFromRaw,
  SelectionState,
} from 'draft-js'
import {
  getCharCount,
  getWordCount,
  getLineCount,
  hasEntity,
  getCurrentEntityKey,
} from '../index'

describe('Entity', () => {
  const createEditorStateFromRaw = raw => {
    const contentState = convertFromRaw(raw)
    return EditorState.createWithContent(contentState)
  }

  const rawContent = {
    blocks: [
      {
        text: 'Hey there duder',
      },
      {
        type: 'atomic',
        text: ' ',
        entityRanges: [
          {
            key: 0,
            length: 1,
            offset: 0,
          },
        ],
      },
    ],
    entityMap: {
      0: {
        data: {
          title: 'Kitten',
          src: 'https://placekitten.com/200/200',
        },
        mutability: 'IMMUTABLE',
        type: 'IMAGE',
      },
    },
  }

  const editorState = createEditorStateFromRaw(rawContent)
  const blockKey = editorState
    .getCurrentContent()
    .getLastBlock()
    .getKey()
  const selectionState = SelectionState.createEmpty(blockKey)
  const updatedEditorState = EditorState.forceSelection(
    editorState,
    selectionState
  )

  it('create editorState and check if the selection has Entity', () => {
    const result = hasEntity(updatedEditorState, 'IMAGE')
    expect(result).to.equal(true)
  })

  it('create editorState and get entity key at selection', () => {
    const result = getCurrentEntityKey(updatedEditorState)
    const entityKey = updatedEditorState
      .getCurrentContent()
      .getBlockForKey(blockKey)
      .getEntityAt(0)
    expect(result).to.equal(entityKey)
  })
})

describe('Char Counter', () => {
  const createEditorStateFromText = text => {
    const contentState = ContentState.createFromText(text)
    return EditorState.createWithContent(contentState)
  }

  it('create editorState and counts 3 characters', () => {
    const editorState = createEditorStateFromText('One')

    const result = getCharCount(editorState)
    expect(result).to.equal(3)
  })

  it('create editorState and counts 3 unicode characters', () => {
    const editorState = createEditorStateFromText('😁😂😃')

    const result = getCharCount(editorState)
    expect(result).to.equal(3)
  })
})

describe('Word Counter', () => {
  const createEditorStateFromText = text => {
    const contentState = ContentState.createFromText(text)
    return EditorState.createWithContent(contentState)
  }

  it('create editorState and counts 3 words', () => {
    const editorState = createEditorStateFromText('One two three')

    const result = getWordCount(editorState)
    expect(result).to.equal(3)
  })
})

describe('Line Counter', () => {
  const createEditorStateFromText = text => {
    const contentState = ContentState.createFromText(text)
    return EditorState.createWithContent(contentState)
  }

  it('create editorState and counts 3 lines', () => {
    const editorState = createEditorStateFromText('One\ntwo\nthree')

    const result = getLineCount(editorState)
    expect(result).to.equal(3)
  })
})
