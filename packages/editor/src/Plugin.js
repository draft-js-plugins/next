import React, { Component } from 'react'
import { withConsumer } from './EditorContainer'

class Plugin extends Component {
  componentDidMount() {
    const {
      pluginMethods: {
        registerPlugin
      },
      editorProps,
      ...props
    } = this.props
    this.unsubscribe = registerPlugin(props)
  }

  componentWillUnmount = () => this.unsubscribe()

  render() {
    if (this.props.children) {
      return this.props.children(this.props.pluginMethods);
    }
    return null
  }
}

export default withConsumer(Plugin)
