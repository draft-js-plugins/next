import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { EditorState, convertFromRaw } from 'draft-js'
import { EditorContainer, Editor } from 'djs-editor'
import AtomicBlock from 'djs-atomic-block'
import 'djs-atomic-block/dist/index.css'
import './styles.css'

const rawContent = {
  blocks: [{
    text: 'Hey there duder'
  }, {
    type: 'atomic',
    text: ' ',
    entityRanges: [{
      key: 0,
      length: 1,
      offset: 0
    }]
  }],
  entityMap: {
    0: {
      data: {
        src: 'https://placekitten.com/200/200'
      },
      mutability: 'IMMUTABLE',
      type: 'IMAGE'
    }
  }
}

class App extends Component {
  state = {
    editorState: EditorState.createWithContent(convertFromRaw(rawContent))
  }

  onChange = editorState => this.setState({ editorState })

  render () {
    return (
      <div>
        <EditorContainer
          editorState={this.state.editorState}
          onChange={this.onChange}
        >
          <Editor />

          <AtomicBlock type='image'>
            {({ blockProps }) => <img {...blockProps} />}
          </AtomicBlock>
        </EditorContainer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
