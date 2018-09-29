/* eslint-disable react/no-children-prop */
import React, { Component } from 'react';
import { RichUtils } from 'draft-js';
import unionClassNames from 'union-class-names';
import { withEditorContext, constants } from 'djs-editor';

export default ({ blockType, children }) => {
  class BlockStyleButton extends Component {

    toggleStyle = (event) => {
      const {
        editorProps: { editorState },
        pluginMethods: { setEditorState }
      } = this.props;

      event.preventDefault();
      setEditorState(
        RichUtils.toggleBlockType(
          editorState,
          blockType
        )
      );
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    blockTypeIsActive = () => {
      const {
        editorProps: { editorState },
      } = this.props;

      // if the button is rendered before the editor
      if (!editorState) {
        return false;
      }

      const type = editorState
        .getCurrentContent()
        .getBlockForKey(editorState.getSelection().getStartKey())
        .getType();
      return type === blockType;
    }

    render() {
      const { theme } = this.props;
      const className = this.blockTypeIsActive() ? unionClassNames(theme.button, theme.active) : theme.button;
      return (
        <div
          className={theme.buttonWrapper}
          onMouseDown={this.preventBubblingUp}
        >
          <button
            className={className}
            onClick={this.toggleStyle}
            type="button"
            children={children}
          />
        </div>
      );
    }
  }

  return withEditorContext(BlockStyleButton);
};
