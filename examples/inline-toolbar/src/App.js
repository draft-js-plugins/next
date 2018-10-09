// @flow

import React, { Component } from 'react'

import { EditorState } from 'draft-js'
import { EditorContainer, Editor } from '@djsp/editor'
import Popover from 'react-text-selection-popover'

import InlineStyleToggle from '@djsp/inline-style-toggle'
import BlockTypeToggle from '@djsp/block-type-toggle'

const InlineButton = ({
  style,
  children,
}: {
  style: string,
  children: React.Element,
}) => (
  <InlineStyleToggle inlineStyle={style}>
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
            <Popover className="toolbar">
              <InlineButton style="BOLD">B</InlineButton>
              <InlineButton style="UNDERLINE">U</InlineButton>
              <InlineButton style="STRIKETHROUGH">S</InlineButton>
              <InlineButton style="ITALIC">I</InlineButton>
              <BlockTypeButton blockType="header-one">H1</BlockTypeButton>
              <BlockTypeButton blockType="header-two">H2</BlockTypeButton>
              <BlockTypeButton blockType="header-three">H3</BlockTypeButton>
              <BlockTypeButton blockType="unordered-list-item">
                UL
              </BlockTypeButton>
              <BlockTypeButton blockType="ordered-list-item">
                OL
              </BlockTypeButton>
            </Popover>
            <Editor />
          </main>
        </EditorContainer>
      </div>
    )
  }
}
