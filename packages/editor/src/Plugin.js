// @flow

import { Component } from 'react'
import { withConsumer } from './EditorContainer'

type Props = Object

class Plugin extends Component<Props> {
  componentDidMount() {
    const {
      pluginProps: { registerPlugin },
      editorProps,
      ...props
    } = this.props
    this.unsubscribe = registerPlugin(props)
  }

  componentWillUnmount = () => this.unsubscribe()

  render() {
    if (this.props.children) {
      return this.props.children(this.props.pluginProps)
    }
    return null
  }
}

export default withConsumer(Plugin)
