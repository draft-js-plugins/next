// @flow

import { Component } from 'react'
import { RichUtils } from 'draft-js'
import { withPluginContext } from '@djsp/core'
import type { PluginProps } from '@djsp/core'

type InlineStyleRenderProps = {
  toggleStyle: () => void,
  hasStyle: boolean,
}

type InlineStyleProps = PluginProps & {
  children: InlineStyleRenderProps => React.Element,
  inlineStyle: string,
}

class InlineStyleToggle extends Component<InlineStyleProps> {
  render() {
    const { setEditorState, editorState, inlineStyle, children } = this.props

    const hasStyle =
      editorState != null &&
      editorState.getCurrentInlineStyle().has(inlineStyle)

    const toggleStyle = () =>
      setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))

    return children({ hasStyle, toggleStyle })
  }
}

export default withPluginContext(InlineStyleToggle)
