import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { EditorState } from 'draft-js'
import { EditorContainer, Editor } from 'djs-editor'
import Autocomplete from 'djs-autocomplete'
import emojis from 'emoji.json'
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

  renderSuggestion = ({ suggestion, isFocused }) => {
    const classNames = ['list__item']
    if (isFocused) classNames.push('list__item--focused')
    return <span className={`${classNames.join(' ')}`}>
      {suggestion.char} "{suggestion.name}"
    </span>
  }

  setSuggestions = (searchText) => {
    console.log('set suggestion?')
    this.setState({
      suggestions: emojis.filter(item => item.name.includes(searchText) || item.keywords.includes(searchText)).slice(0, 30)
    })
  }

  render () {
    return (
      <div>
        <EditorContainer editorState={this.state.editorState} onChange={editorState => this.setState({ editorState })}>
          <Editor />

          <Autocomplete
            trigger='@'
            onSelect={option => console.log('insert option', option)}
            suggestions={this.state.suggestions}
            renderSuggestion={this.renderSuggestion}
            onAutocomplete={this.setSuggestions}
          />
        </EditorContainer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
