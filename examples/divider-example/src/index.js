import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { EditorState, convertFromRaw } from 'draft-js'
import { EditorContainer, Editor } from '@djsp/core'
import InsertDivider from './InsertDivider'
import './styles.css'

const rawContent = {
  blocks: [
    {
      text: 'Here is the divider!',
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
    {
      text: 'You can add another divider below.',
    },
  ],
  entityMap: {
    0: {
      mutability: 'IMMUTABLE',
      type: 'DIVIDER',
    },
  },
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
          <InsertDivider />
        </EditorContainer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
