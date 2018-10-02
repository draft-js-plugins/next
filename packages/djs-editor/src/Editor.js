import React from 'react'
import Draft from 'draft-js'
import { withConsumer } from './EditorContainer'

export default withConsumer(
  React.forwardRef(({ editorProps }, ref) => <Draft.Editor {...editorProps} ref={ref} />)
)
