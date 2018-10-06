// @flow
import React, { Component } from 'react';
import { RichUtils } from 'draft-js';
import unionClassNames from 'union-class-names';
import { withEditorContext } from 'djs-editor';
import buttonStyles from '../styles.css';

export default ({ blockType, children }) => {
  class BlockStyleButton extends Component {

    static defaultProps = {
      children: (buttonnApi) => {
        const className = buttonnApi.styleIsActive ? unionClassNames(buttonStyles.button, buttonStyles.active) : buttonStyles.button;

        return <button
          className={className}
          onClick={buttonnApi.toggleStyle}
          type="button"
          children={children}
        />
      }
    }

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
      return (
        <div
          className={buttonStyles.buttonWrapper}
          onMouseDown={this.preventBubblingUp}
        >{this.props.children({
          styleIsActive: this.blockTypeIsActive(),
          toggleStyle: this.toggleStyle
        })}
        </div>
      );
    }
  }

  return withEditorContext(BlockStyleButton);
};
