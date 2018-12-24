import { expect } from 'chai'
import { EditorState, ContentState } from 'draft-js'
import { getCharCount, getWordCount } from '../index'

describe('char Counter(non-unicode)', () => {
  const createEditorStateFromText = text => {
    const contentState = ContentState.createFromText(text)
    return EditorState.createWithContent(contentState)
  }

  it('create editorState and counts 3 char', () => {
    const editorState = createEditorStateFromText('One')

    const result = getCharCount(editorState)
    expect(result).to.equal(3)
  })
})

describe('char Counter(unicode)', () => {
  const createEditorStateFromText = text => {
    const contentState = ContentState.createFromText(text)
    return EditorState.createWithContent(contentState)
  }

  it('create editorState and counts 1 char', () => {
    const editorState = createEditorStateFromText('一')

    const result = getCharCount(editorState)
    expect(result).to.equal(1)
  })
})

describe('word Counter', () => {
  const createEditorStateFromText = text => {
    const contentState = ContentState.createFromText(text)
    return EditorState.createWithContent(contentState)
  }

  it('create editorState and counts 3 word', () => {
    const editorState = createEditorStateFromText('One two three')

    const result = getWordCount(editorState)
    expect(result).to.equal(3)
  })
})
