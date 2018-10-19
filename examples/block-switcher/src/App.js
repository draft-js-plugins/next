import React, { Component } from 'react'
import { EditorState } from 'draft-js'
import { EditorContainer, Editor } from '@djsp/core'
import BlockSwitch from './BlockSwitch'
import 'draft-js/dist/Draft.css'

export default class App extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onChange = editorState => this.setState({ editorState })

  render() {
    return (
      <div>
        <EditorContainer
          editorState={this.state.editorState}
          onChange={this.onChange}>
          <BlockSwitch
            onChange={this.onChange}
            editorState={this.state.editorState}
          />
          <Editor />
        </EditorContainer>
      </div>
    )
  }
}
