import React, { Fragment } from 'react'
import { Plugin } from '@djsp/editor'
import { getCharCount, getWordCount, getLineCount } from '@djsp/utils'

export default function WordCountPlugin() {
  return (
    <Plugin>
      {({ editorState }) => (
        <Fragment>
          <div>Char count: {getCharCount(editorState)}</div>
          <div>Word count: {getWordCount(editorState)}</div>
          <div>Line count: {getLineCount(editorState)}</div>
        </Fragment>
      )}
    </Plugin>
  )
}
