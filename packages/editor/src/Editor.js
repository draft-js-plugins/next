import React from 'react'
import Draft from 'draft-js'
import { withConsumer } from './EditorContainer'

export default withConsumer(({ editorProps }) => {
  console.log('editorState', editorProps.editorState)
  return <Draft.Editor {...editorProps} />
})
