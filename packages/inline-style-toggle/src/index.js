// @flow

import { Component } from 'react'
import { EditorState, RichUtils } from 'draft-js'
import { withEditorContext } from '@djsp/core'

type InlineStyleRenderProps = {
  toggleStyle: () => void,
  hasStyle: boolean,
}

type InlineStyleProps = {
  pluginProps: {
    setEditorState: (editorState: EditorState) => void,
    editorState: EditorState,
  },
  children: InlineStyleRenderProps => React.Element,
  inlineStyle: string,
}

class InlineStyleToggle extends Component<InlineStyleProps> {
  render() {
    const {
      pluginProps: { setEditorState, editorState },
      inlineStyle,
      children,
    } = this.props

    const hasStyle =
      editorState != null &&
      editorState.getCurrentInlineStyle().has(inlineStyle)

    const toggleStyle = () =>
      setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))

    return children({ hasStyle, toggleStyle })
  }
}

export default withEditorContext(InlineStyleToggle)
