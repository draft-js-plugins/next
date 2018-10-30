// @flow

import type { Ref, Context } from 'react'
import type { BidiDirection } from 'fbjs/lib/UnicodeBidiDirection'
import type { DraftTextAlignment } from 'draft-js/lib/DraftTextAlignment'
import { Editor as DraftEditor } from 'draft-js'
import type { EditorState } from 'draft-js'

export type StaticProps = {
  editorKey?: string,
  placeholder?: string,
  textAlignment?: DraftTextAlignment,
  textDirectionality?: BidiDirection,
  readOnly: boolean,
  spellCheck: boolean,
  stripPastedStyles: boolean,
  tabIndex?: number,
  autoCapitalize?: string,
  autoComplete?: string,
  autoCorrect?: string,

  ariaActiveDescendantID?: string,
  ariaAutoComplete?: string,
  ariaControls?: string,
  ariaDescribedBy?: string,
  ariaExpanded?: boolean,
  ariaLabel?: string,
  ariaLabelledBy?: string,
  ariaMultiline?: boolean,
  webDriverTestID?: string,
}

export type PluginProps = {
  registerPlugin: DraftEditorProps => () => void,
  setEditorState: EditorState => void,
  editorRef: Ref<DraftEditor>,
  editorState: EditorState,
  editorProps: StaticProps,
  setEditorProps: (editorProps: StaticProps) => void,
}

export type ContextType = Context<{
  pluginProps?: PluginProps,
  editorProps?: DraftEditorProps,
}>
