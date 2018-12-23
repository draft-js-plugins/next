import { expect } from 'chai'
import { EditorState, ContentState } from 'draft-js'
import { getCharCount } from '../index'

describe('char Counter', () => {
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
