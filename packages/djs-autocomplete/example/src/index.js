import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { EditorState } from 'draft-js'
import { EditorContainer, Editor } from 'djs-editor'
import Autocomplete from 'djs-autocomplete'

// const Unstyled = <div style={{background: 'yellow'}} />

const suggestions = [{
  label: 'Julian Krispel-Samsel',
  value: 'julian'
}, {
  label: 'Nik Graf',
  value: 'nik'
}]

class App extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }

  getSuggestions = searchText => suggestions

  render () {
    return (
      <div>
        <EditorContainer editorState={this.state.editorState} onChange={editorState => this.setState({ editorState })}>
          Hello

          <Autocomplete getSuggestions={this.getSuggestions} />
          <Editor />
        </EditorContainer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
