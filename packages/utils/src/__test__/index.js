import { expect } from 'chai'
import {
  EditorState,
  ContentState,
  convertFromRaw,
  SelectionState,
} from 'draft-js'
import { getCharCount, getWordCount, getLineCount, hasEntity } from '../index'

describe('Has Entity', () => {
  const createEditorStateFromRaw = raw => {
    const contentState = convertFromRaw(raw)
    return EditorState.createWithContent(contentState)
  }

  it('create editorState and check if has Entity', () => {
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
    const result = hasEntity(updatedEditorState, 'IMAGE')
    expect(result).to.equal(true)
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
