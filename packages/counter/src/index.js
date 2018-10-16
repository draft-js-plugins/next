// @flow

import React, { Component } from 'react'
import { withEditorContext } from '@djsp/editor'
import getCharCount from './utils/getCharCount'
import getLineCount from './utils/getLineCount'
import getWordCount from './utils/getWordCount'

type Props = {
  children: any,
  editorProps: Object,
}

class Counter extends Component<Props> {
  render() {
    const {
      editorProps: { editorState },
      children,
    } = this.props

    return <div>{children(editorState)}</div>
  }
}

export default withEditorContext(Counter)

export { getCharCount, getLineCount, getWordCount }
