// @flow

import React, { Fragment, Component } from 'react'

import { EditorState, RichUtils } from 'draft-js'
import { EditorContainer, Editor, Plugin } from '@djsp/editor'

type InlineStyleProps = {
  setEditorState: (editorState: EditorState) => void,
  editorState: EditorState,
  children: React.Element,
  inlineStyle: string,
}

class InlineStyleToggle extends Component<InlineStyleProps> {
  render() {
    const { setEditorState, editorState, inlineStyle, children } = this.props
    const hasStyle =
      editorState != null &&
      editorState.getCurrentInlineStyle().has(inlineStyle)

    const className = `toolbar__button${
      hasStyle ? ' toolbar__button--active' : ''
    }`

    return (
      <button
        className={className}
        onMouseDown={e => {
          e.preventDefault()
          setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))
        }}>
        {children}
      </button>
    )
  }
}

type BlockTypeProps = {
  setEditorState: (editorState: EditorState) => void,
  editorState: EditorState,
  children: React.Element,
  blockType: string,
}

class BlockTypeToggle extends Component<BlockTypeProps> {
  render() {
    const { setEditorState, editorState, blockType, children } = this.props
    const hasBlockType =
      editorState != null &&
      RichUtils.getCurrentBlockType(editorState) === blockType

    const className = `toolbar__button${
      hasBlockType ? ' toolbar__button--active' : ''
    }`

    return (
      <button
        className={className}
        onMouseDown={e => {
          e.preventDefault()
          setEditorState(RichUtils.toggleBlockType(editorState, blockType))
        }}>
        {children}
      </button>
    )
  }
}

export default class App extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  render() {
    return (
      <div>
        <EditorContainer
          editorState={this.state.editorState}
          onChange={editorState => this.setState({ editorState })}>
          <main className="container">
            <header className="toolbar">
              <Plugin>
                {pluginProps => (
                  <Fragment>
                    <InlineStyleToggle {...pluginProps} inlineStyle="BOLD">
                      Bold
                    </InlineStyleToggle>
                    <BlockTypeToggle {...pluginProps} blockType="header-one">
                      H1
                    </BlockTypeToggle>
                    <BlockTypeToggle {...pluginProps} blockType="header-two">
                      H2
                    </BlockTypeToggle>
                    <BlockTypeToggle
                      {...pluginProps}
                      blockType="unordered-list-item">
                      UL
                    </BlockTypeToggle>
                    <BlockTypeToggle
                      {...pluginProps}
                      blockType="ordered-list-item">
                      OL
                    </BlockTypeToggle>
                  </Fragment>
                )}
              </Plugin>
            </header>
            <Editor />
          </main>
        </EditorContainer>
      </div>
    )
  }
}
