import React from 'react'
import { Plugin } from '@djsp/core'
import Redo from './components/Redo'
import Undo from './components/Undo'

const RedoButton = () => (
  <Plugin>
    {({ editorState, setEditorState }) => (
      <Redo editorState={editorState} setEditorState={setEditorState} />
    )}
  </Plugin>
)

const UndoButton = () => (
  <Plugin>
    {({ editorState, setEditorState }) => (
      <Undo editorState={editorState} setEditorState={setEditorState} />
    )}
  </Plugin>
)

export { RedoButton, UndoButton }
