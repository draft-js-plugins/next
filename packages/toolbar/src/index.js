/* eslint-disable react/no-array-index-key */
import React from 'react';
import Separator from './components/Separator';
import { getVisibleSelectionRect } from 'draft-js';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
} from '@djsp/buttons';
import BlockTypeSelect from './components/BlockTypeSelect';
import toolbarStyles from './styles/toolbarStyles.css';

export default class Toolbar extends React.Component {

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
    toolbarPosition: 'static'
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
  getStyle = async () => {
    const {
      editorProps: { editorState },
      toolbarPosition
    } = this.props;
    
    if (toolbarPosition === 'inline' || toolbarPosition === 'left' || toolbarPosition === 'right') {
      let position = await this.updatePosition();

      if (toolbarPosition === 'inline') {
        const { overrideContent } = this.state;
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
      } else if (toolbarPosition === 'left' || toolbarPosition === 'right') {
        return position;
      }
    }

    return {};

  }

  updatePosition = () => {
    return new Promise((resolve, reject) => {
      // need to wait a tick for window.getSelection() to be accurate
      // when focusing editor with already present selection
      setTimeout(() => {
        if (!this.toolbar) resolve({});

        const {
          toolbarPosition,
          editorProps: { editorState }
        } = this.props;

        if (toolbarPosition === 'side') {
          const selection = editorState.getSelection();
          if (!selection.getHasFocus()) {
              resolve({
                transform: 'scale(0)',
              });
          }

          const currentContent = editorState.getCurrentContent();
          const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
          // TODO verify that always a key-0-0 exists
          const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);

          const node = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`)[0];
        }

        // The editor root should be two levels above the node from
        // `getEditorRef`. In case this changes in the future, we
        // attempt to find the node dynamically by traversing upwards.
        const editorRef = this.props.store.getItem('getEditorRef')();
        if (!editorRef) resolve({});

        // This keeps backwards compatibility with React 15
        let editorRoot = editorRef.refs && editorRef.refs.editor
          ? editorRef.refs.editor : editorRef.editor;
        while (editorRoot.className.indexOf('DraftEditor-root') === -1) {
          editorRoot = editorRoot.parentNode;
        }

        if (toolbarPosition === 'inline') {
          const editorRootRect = editorRoot.getBoundingClientRect();

          const selectionRect = getVisibleSelectionRect(window);
          if (!selectionRect) resolve({});

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
          
          resolve(position);
        } else if (toolbarPosition === 'left' || toolbarPosition === 'right') {
          const position = {
            top: node.offsetTop + editorRoot.offsetTop,
            transform: 'scale(1)',
            transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
          };
          // TODO: remove the hard code(width for the hover element)
          if (toolbarPosition === 'right') {
            // eslint-disable-next-line no-mixed-operators
            position.left = editorRoot.offsetLeft + editorRoot.offsetWidth + 80 - 36;
          } else {
            position.left = editorRoot.offsetLeft - 80;
          }

          resolve(position);
        }
        
      }, 0);
    })
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
    const { toolbarPosition, children } = this.props;
    const childrenProps = {
      onOverrideContent: this.onOverrideContent
    };
    let content;

    if (toolbarPosition === 'side') {
      content = <BlockTypeSelect>{children}</BlockTypeSelect>;
    } else {
      content = OverrideContent ? <OverrideContent {...childrenProps} /> : children(childrenProps);
    }

    return (
      <div
        className={toolbarStyles.toolbar}
        style={this.getStyle()}
        ref={this.handleToolbarRef}
      >
        {content}
      </div>
    );
  }
}

export {
  Separator,
}