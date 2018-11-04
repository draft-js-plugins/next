import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { EditorState, convertFromRaw } from 'draft-js'
import { EditorContainer, Editor, Plugin } from '@djsp/core'
import hashtagStrategy from './hashtagStrategy'
import Hashtag from './Hashtag'
import './styles.css'

const rawContent = {
  blocks: [
    {
      text: 'Here is an example for hashtag! #djsp',
    }
  ],
  entityMap: {},
}

class App extends Component {
  state = {
    editorState: EditorState.createWithContent(convertFromRaw(rawContent)),
  }

  onChange = editorState => this.setState({ editorState })

  render() {
    return (
      <div>
        <EditorContainer
          editorState={this.state.editorState}
          onChange={this.onChange}>
          <Editor />
          <Plugin decorators={[{
            strategy: hashtagStrategy,
            component: Hashtag
          }]} />
        </EditorContainer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
