import React, { Component, Fragment } from 'react'

import { EditorState, EditorBlock } from 'draft-js'
import { EditorContainer, Editor, Plugin } from '@djsp/editor'
import { replaceWithAtomicBlock } from '@djsp/utils'
import AtomicBlock from '@djsp/atomic-block'

class UnstyledBlock extends Component {
  state = {
    insertLink: false,
  }

  render() {
    const {
      block,
      selection,
      blockProps: { onChange },
    } = this.props
    const { insertLink } = this.state

    const showMenu =
      selection.isCollapsed() &&
      selection.getStartKey() === block.getKey() &&
      block.getText().length === 0 &&
      insertLink === false

    return (
      <div className="paragraph">
        <EditorBlock {...this.props} />
        {insertLink === true &&
          block.getText().length === 0 && (
            <div contentEditable={false} className="insert-link-placeholder">
              Paste a youtube link
            </div>
          )}
        {insertLink === true &&
          block.getText().length > 0 && (
            <Fragment>
              <div contentEditable={false} className="insert-link-instructions">
                <span className="fa fa-video" /> Press enter when done
              </div>
              <Plugin
                handleReturn={(event, editorState) => {
                  onChange(
                    replaceWithAtomicBlock(editorState, 'video', {
                      src: block.getText(),
                    })
                  )
                  return 'handled'
                }}
              />
            </Fragment>
          )}
        {showMenu && (
          <aside contentEditable={false} className="block-menu">
            <button onClick={() => this.setState({ insertLink: true })}>
              <span className="fa fa-video" />
            </button>
          </aside>
        )}
      </div>
    )
  }
}

export default class App extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onChange = editorState => this.setState({ editorState })

  render() {
    return (
      <div>
        <EditorContainer
          editorState={this.state.editorState}
          onChange={this.onChange}>
          <AtomicBlock type="video">
            {({ blockProps: { src } }) => (
              <iframe
                src={src}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )}
          </AtomicBlock>

          <Plugin
            blockRendererFn={block => {
              if (block.getType() === 'unstyled') {
                return {
                  component: UnstyledBlock,
                  editable: true,
                  props: {
                    onChange: this.onChange,
                  },
                }
              }
            }}
          />
          <Editor />
        </EditorContainer>
      </div>
    )
  }
}
