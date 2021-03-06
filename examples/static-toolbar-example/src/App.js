// @flow

import React, { Component } from 'react'

import { EditorState } from 'draft-js'
import { EditorContainer, Editor } from '@djsp/core'
import InlineStyleToggle from '@djsp/inline-style-toggle'
import BlockTypeToggle from '@djsp/block-type-toggle'

const InlineButton = ({
  inlineStyle,
  children,
}: {
  inlineStyle: string,
  children: React.Element,
}) => (
  <InlineStyleToggle inlineStyle={inlineStyle}>
    {({ toggleStyle, hasStyle }) => {
      const className = `toolbar__button${
        hasStyle === true ? ' toolbar__button--active' : ''
      }`

      return (
        <button
          className={className}
          onMouseDown={e => {
            e.preventDefault()
            toggleStyle()
          }}>
          {children}
        </button>
      )
    }}
  </InlineStyleToggle>
)

const BlockTypeButton = ({
  blockType,
  children,
}: {
  blockType: string,
  children: React.Element,
}) => (
  <BlockTypeToggle blockType={blockType}>
    {({ toggleBlockType, hasBlockType }) => {
      const className = `toolbar__button${
        hasBlockType === true ? ' toolbar__button--active' : ''
      }`

      return (
        <button
          className={className}
          onMouseDown={e => {
            e.preventDefault()
            toggleBlockType()
          }}>
          {children}
        </button>
      )
    }}
  </BlockTypeToggle>
)

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
              <InlineButton inlineStyle="BOLD">Bold</InlineButton>
              <InlineButton inlineStyle="UNDERLINE">Underline</InlineButton>
              <InlineButton inlineStyle="STRIKETHROUGH">
                Strikethrough
              </InlineButton>
              <InlineButton inlineStyle="ITALIC">Italic</InlineButton>
              <BlockTypeButton blockType="header-one">H1</BlockTypeButton>
              <BlockTypeButton blockType="header-two">H2</BlockTypeButton>
              <BlockTypeButton blockType="header-three">H3</BlockTypeButton>
              <BlockTypeButton blockType="unordered-list-item">
                UL
              </BlockTypeButton>
              <BlockTypeButton blockType="ordered-list-item">
                OL
              </BlockTypeButton>
            </header>
            <Editor />
          </main>
        </EditorContainer>
      </div>
    )
  }
}

/*
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
*/
