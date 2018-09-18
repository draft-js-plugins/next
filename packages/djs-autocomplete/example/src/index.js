import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { EditorState } from 'draft-js'
import { EditorContainer, Editor } from 'djs-editor'
import Autocomplete from 'djs-autocomplete'
import 'djs-autocomplete/dist/index.css'
import './styles.css'

const suggestions = [{
  label: 'Julian Krispel-Samsel',
  value: 'julian'
}, {
  label: 'Nik Graf',
  value: 'nik'
}]

class App extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    suggestions: []
  }

  setSuggestions = (searchText) => {
    this.setState({
      suggestions: suggestions.filter(item => item.label.includes(searchText))
    })
  }

  render () {
    return (
      <div>
        <EditorContainer editorState={this.state.editorState} onChange={editorState => this.setState({ editorState })}>
          Hello

          <Editor />

          <Autocomplete
            trigger='@'
            onSelect={option => console.log('insert option', option)}
            suggestions={this.state.suggestions}
            onAutocomplete={this.setSuggestions}
          />
        </EditorContainer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
