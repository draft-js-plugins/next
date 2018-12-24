import { expect } from 'chai'
import { EditorState, ContentState } from 'draft-js'
import { getCharCount, getWordCount, getLineCount } from '../index'

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
