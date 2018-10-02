// @flow
import React, { Component } from 'react'
import Draft from 'draft-js'
import unionClassNames from 'union-class-names'
import { withEditorContext } from 'djs-editor'
import buttonStyles from '../buttonStyles.css'

const { RichUtils } = Draft

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
      const className = this.styleIsActive() ? unionClassNames(buttonStyles.button, buttonStyles.active) : buttonStyles.button;
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

  return withEditorContext(InlineStyleButton);
};
