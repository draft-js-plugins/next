import React from 'react'
import Draft from 'draft-js'
import { withConsumer } from './EditorContainer'

export default withConsumer(({ editorProps }) => (
  <Draft.Editor {...editorProps} />
))
