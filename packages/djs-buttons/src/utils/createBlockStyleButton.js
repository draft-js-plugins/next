// @flow
import React, { Component } from 'react';
import Draft from 'draft-js';
import unionClassNames from 'union-class-names';
import { withEditorContext } from 'djs-editor';
import buttonStyles from '../buttonStyles.css';

const { RichUtils } = Draft;

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
      const className = this.blockTypeIsActive() ? unionClassNames(buttonStyles.button, buttonStyles.active) : buttonStyles.button;
      return (
        <div
          className={buttonStyles.buttonWrapper}
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
