import React, { Component } from 'react'
import Immutable from 'immutable'

import { EditorState } from 'draft-js';
import { EditorContainer, Editor, Plugin } from '@djsp/editor'
import Mentions from './Mentions'

const Unstyled = <div style={{background: 'yellow'}} />

export default class App extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }

  render () {
    return (
      <div>
        <EditorContainer editorState={this.state.editorState} onChange={editorState => this.setState({ editorState })}>
          Hello

          <Plugin
            handleKeyCommand={e => console.log('yo', e)}
            handleBeforeInput={(e) => console.log('handle before input', e)}
            keyBindingFn={(e) => { console.log('keybinding fn', e.key); }}
          />
          <Editor />
        </EditorContainer>
      </div>
    )
  }
}
