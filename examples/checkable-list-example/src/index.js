import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { EditorState, convertFromRaw } from 'draft-js'
import { EditorContainer, Editor } from '@djsp/core'
import CheckableList from './CheckableList'
import 'draft-js-checkable-list-item/lib/CheckableListItem.css'
import './styles.css'

const rawContent = {
  blocks: [
    {
      text: 'Hey there',
    },
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
          <CheckableList />
          <Editor />
        </EditorContainer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
