import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { EditorState, ContentState } from 'draft-js'
import { EditorContainer, Editor } from '@djsp/editor'
import Counter, {
  getCharCount,
  getWordCount,
  getLineCount,
} from '@djsp/counter'
import './styles.css'

class App extends Component {
  state = {
    editorState: EditorState.createWithContent(
      ContentState.createFromText('Have a nice day!')
    ),
  }

  onChange = editorState => this.setState({ editorState })

  render() {
    return (
      <div>
        <EditorContainer
          editorState={this.state.editorState}
          onChange={this.onChange}>
          <Counter>
            {editorState => <span>Char count: {getCharCount(editorState)}</span>}
          </Counter>
          <Counter>
            {editorState => <span>Word count: {getWordCount(editorState)}</span>}
          </Counter>
          <Counter>
            {editorState => <span>Line count: {getLineCount(editorState)}</span>}
          </Counter>
          <Editor />
        </EditorContainer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
