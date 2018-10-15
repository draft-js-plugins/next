// @flow

import { Component } from 'react'
import { withPluginContext } from './EditorContainer'
import type { StaticProps, PluginProps } from './types'
import type { DraftEditorProps } from 'draft-js/lib/DraftEditorProps'
import type { Node } from 'react'

type Props = DraftEditorProps &
  PluginProps & {
    children?: ({
      setEditorState: EditorState => void,
      editorState: EditorState,
      setEditorProps: (editorProps: StaticProps) => void,
    }) => Node,
  }

class Plugin extends Component<Props> {
  unsubscribe: () => void

  componentDidMount() {
    const { registerPlugin, ...props } = this.props
    this.unsubscribe = registerPlugin(props)
  }

  componentWillUnmount = () => this.unsubscribe()

  render() {
    const { setEditorState, editorState, setEditorProps } = this.props

    if (this.props.children) {
      return this.props.children({
        setEditorState,
        editorState,
        setEditorProps,
      })
    }
    return null
  }
}

export default withPluginContext(Plugin)
