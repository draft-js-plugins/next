// @flow

import React, { Component, Fragment } from 'react'
import { EditorState, EditorBlock, RichUtils } from 'draft-js'
import { withPluginContext } from '@djsp/core'
import type { PluginProps } from '@djsp/core'

const blockTypes = [
  'unstyled',
  'paragraph',
  'header-one',
  'header-two',
  'header-three',
  'header-four',
  'header-five',
  'header-six',
  'unordered-list-item',
  'ordered-list-item',
  'blockquote',
  'code-block',
]

type Props = {
  block: Object,
  blockProps: {
    editorState: EditorState,
    setEditorState: EditorState => void,
  },
}

class SelectBlock extends Component<Props> {
  render() {
    const {
      block,
      blockProps: { setEditorState, editorState },
    } = this.props

    const selection = editorState.getSelection()
    const showSwitch =
      selection.getStartKey() === selection.getEndKey() &&
      selection.getEndKey() === block.getKey()

    return (
      <div className="paragraph">
        <EditorBlock {...this.props} />
        {showSwitch && (
          <Fragment>
            <div onInput={e => e.stopPropagation()}>
              <select
                contentEditable={false}
                value={block.getType()}
                onChange={({ target: { value: blockType } }) =>
                  setEditorState(
                    RichUtils.toggleBlockType(editorState, blockType)
                  )
                }>
                {blockTypes.map(type => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

class BlockSwitch extends Component<PluginProps> {
  _unregister: () => void

  componentWillUnmount() {
    this._unregister()
  }

  componentDidMount() {
    const { registerPlugin } = this.props

    this._unregister = registerPlugin({
      blockRendererFn: block => {
        if (blockTypes.includes(block.getType())) {
          return {
            component: SelectBlock,
            editable: true,
            props: this.props,
          }
        }
      },
    })
  }

  render() {
    return null
  }
}

export default withPluginContext(BlockSwitch)
