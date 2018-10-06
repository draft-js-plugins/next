// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { withEditorContext } from 'djs-editor';
import unionClassNames from 'union-class-names';
import buttonStyles from '../buttonStyles.css';

class UndoButton extends Component {

  onClick = (event) => {
    const {
      editorProps: { editorState },
      pluginMethods: { setEditorState }
    } = this.props;

    event.stopPropagation();
    setEditorState(EditorState.undo(editorState));
  };

  render() {
    const { className } = this.props;
    const combinedClassName = unionClassNames(buttonStyles.button, className);
    const {
      editorProps: { editorState }
    } = this.props;
    return (
      <button
        disabled={
          !editorState ||
          editorState.getUndoStack().isEmpty()
        }
        type="button"
        onClick={this.onClick}
        className={combinedClassName}
      >↺</button>
    );
  }
}

export default withEditorContext(UndoButton);
