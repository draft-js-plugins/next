
import React, { Component } from 'react'
import Immutable from 'immutable'

import { EditorState } from 'draft-js';
import { EditorContainer, Editor, Plugin } from 'djs-editor'
import Mentions from './Mentions'

const Unstyled = <div style={{background: 'yellow'}} />

const suggestions = [{
  label: 'Julian Krispel-Samsel',
  value: 'julian',
}, {
  label: 'Nik Graf',
  value: 'nik',
}]

export default class App extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }

  getSuggestions = searchText => suggestions

  render () {
    return (
      <div>
        <EditorContainer editorState={this.state.editorState} onChange={editorState => this.setState({ editorState })}>
          Hello

          <Mentions getSuggestions={this.getSuggestions} />
          <Editor />
        </EditorContainer>
      </div>
    )
  }
}
