/* eslint-disable react/no-array-index-key */
import React from 'react';
import { getVisibleSelectionRect } from 'draft-js';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
} from '@djsp/buttons';
import toolbarStyles from './styles/toolbarStyles.css';

class Toolbar extends React.Component {

  static defaultProps = {
    children: () => (
      // may be use React.Fragment instead of div to improve perfomance after React 16
      <div>
        <ItalicButton />
        <BoldButton />
        <UnderlineButton />
        <CodeButton />
      </div>
    ),
    toolbarType: 'static'
  }

  state = {
    /**
     * If this is set, the toolbar will render this instead of the regular
     * structure and will also be shown when the editor loses focus.
     * @type {Component}
     */
    overrideContent: undefined,
    position: undefined
  }

  // componentWillMount() {
  //   this.props.store.subscribeToItem('selection', () => this.forceUpdate());
  // }

  // componentWillUnmount() {
  //   this.props.store.unsubscribeFromItem('selection', () => this.forceUpdate());
  // }
  // 
  getStyle() {
    const {
      editorProps: { editorState },
      toolbarType
    } = this.props;

    if (toolbarType === 'static') {
      return {};
    }

    const { overrideContent } = this.state;
    const position = this.getPosition();
    const selection = editorState.getSelection();
    // overrideContent could for example contain a text input, hence we always show overrideContent
    // TODO: Test readonly mode and possibly set isVisible to false if the editor is readonly
    const isVisible = (!selection.isCollapsed() && selection.getHasFocus()) || overrideContent;
    const style = { ...position };

    if (isVisible) {
      style.visibility = 'visible';
      style.transform = 'translate(-50%) scale(1)';
      style.transition = 'transform 0.15s cubic-bezier(.3,1.2,.2,1)';
    } else {
      style.transform = 'translate(-50%) scale(0)';
      style.visibility = 'hidden';
    }

    return style;
  }

  getPosition = () => {
    // need to wait a tick for window.getSelection() to be accurate
    // when focusing editor with already present selection
    // setTimeout(() => {
    if (!this.toolbar) return;

    // The editor root should be two levels above the node from
    // `getEditorRef`. In case this changes in the future, we
    // attempt to find the node dynamically by traversing upwards.
    const editorRef = this.props.store.getItem('getEditorRef')();
    if (!editorRef) return;

    // This keeps backwards compatibility with React 15
    let editorRoot = editorRef.refs && editorRef.refs.editor
      ? editorRef.refs.editor : editorRef.editor;
    while (editorRoot.className.indexOf('DraftEditor-root') === -1) {
      editorRoot = editorRoot.parentNode;
    }
    const editorRootRect = editorRoot.getBoundingClientRect();

    const selectionRect = getVisibleSelectionRect(window);
    if (!selectionRect) return;

    // The toolbar shouldn't be positioned directly on top of the selected text,
    // but rather with a small offset so the caret doesn't overlap with the text.
    const extraTopOffset = -5;

    const position = {
      top: (editorRoot.offsetTop - this.toolbar.offsetHeight)
        + (selectionRect.top - editorRootRect.top)
        + extraTopOffset,
      left: editorRoot.offsetLeft
        + (selectionRect.left - editorRootRect.left)
        + (selectionRect.width / 2)
    };
    
    return position;
    // });
  };

  /**
   * This can be called by a child in order to render custom content instead
   * of the regular structure. It's the responsibility of the callee to call
   * this function again with `undefined` in order to reset `overrideContent`.
   * @param {Component} overrideContent
   */
  onOverrideContent = (overrideContent) => this.setState({ overrideContent });

  handleToolbarRef = (node) => {
    this.toolbar = node;
  };

  render() {
    const { overrideContent: OverrideContent } = this.state;
    const childrenProps = {
      onOverrideContent: this.onOverrideContent
    };

    return (
      <div
        className={toolbarStyles.toolbar}
        style={this.getStyle()}
        ref={this.handleToolbarRef}
      >
        {OverrideContent
          ? <OverrideContent {...childrenProps} />
          : this.props.children(childrenProps)}
      </div>
    );
  }
}

export default Toolbar;