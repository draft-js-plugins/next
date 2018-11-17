import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { EditorState, convertFromRaw } from 'draft-js'
import { EditorContainer, Editor, Plugin } from '@djsp/core'
import linkStrategy from './linkStrategy'
import Link from './Link'
import './styles.css'

const rawContent = {
  blocks: [
    {
      text: 'Type some website address.',
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
          <Editor />
          <Plugin
            decorators={[
              {
                strategy: linkStrategy,
                component: Link,
              },
            ]}
          />
        </EditorContainer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
