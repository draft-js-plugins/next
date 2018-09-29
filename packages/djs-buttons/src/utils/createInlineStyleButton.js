/* eslint-disable react/no-children-prop */
import React, { Component } from 'react';
import { RichUtils } from 'draft-js';
import unionClassNames from 'union-class-names';
import { withEditorContext, constants } from 'djs-editor';

export default ({ style, children }) => {
  class InlineStyleButton extends Component {

    toggleStyle = (event) => {
      const {
        editorProps: { editorState },
        pluginMethods: { setEditorState }
      } = this.props;
      event.preventDefault();
      setEditorState(
        RichUtils.toggleInlineStyle(
          editorState,
          style
        )
      );
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    // we check if this.props.getEditorstate is undefined first in case the button is rendered before the editor
    styleIsActive = () => {
      const {
        editorProps: { editorState },
      } = this.props;
      
      return editorState.getCurrentInlineStyle().has(style);
    }

    render() {
      const { theme } = this.props;
      const className = this.styleIsActive() ? unionClassNames(theme.button, theme.active) : theme.button;
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

  return withEditorContext(InlineStyleButton);
};
