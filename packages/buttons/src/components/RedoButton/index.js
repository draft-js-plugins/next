// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { withEditorContext } from '@djsp/editor';
import unionClassNames from 'union-class-names';

class RedoButton extends Component {

  onClick = (event) => {
    const {
      editorProps: { editorState },
      pluginMethods: { setEditorState }
    } = this.props;

    event.stopPropagation();
    setEditorState(EditorState.redo(editorState));
  };

  render() {
    const { children, className } = this.props;
    const combinedClassName = unionClassNames(buttonStyles.button, className);
    const {
      editorProps: { editorState }
    } = this.props;
    return (
      <button
        disabled={
          !editorState ||
          editorState.getRedoStack().isEmpty()
        }
        type="button"
        onClick={this.onClick}
        className={combinedClassName}
      >↻</button>
    );
  }
}

export default withEditorContext(RedoButton);
