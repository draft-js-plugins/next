// @flow
import React, { Component } from 'react';
import unionClassNames from 'union-class-names';
import { withEditorContext } from 'djs-editor';
import buttonStyles from '../buttonStyles.css';

export default ({ alignment, children }) => {
  class BlockAlignmentButton extends Component {

    componentDidMount() {
      const { pluginMethods: { registerPlugin } } = this.props

      this._unregister = registerPlugin({
        blockRendererFn: this.blockRendererFn,
      })
    }

    blockRendererFn = (contentBlock, { getEditorState, setEditorState }) => {
      const entityKey = contentBlock.getEntityAt(0);
      const contentState = getEditorState().getCurrentContent();
      const alignmentData = entityKey ? contentState.getEntity(entityKey).data : {};
      return {
        props: {
          alignment: alignmentData.alignment || 'default',
          setAlignment: createSetAlignment(contentBlock, { getEditorState, setEditorState }),
        },
      };
    }

    activate = (event) => {
      event.preventDefault();
      this.props.setAlignment({ alignment });
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    isActive = () => this.props.alignment === alignment;

    render() {
      const className = this.isActive() ? unionClassNames(buttonStyles.button, buttonStyles.active) : buttonStyles.button;
      return (
        <div
          className={buttonStyles.buttonWrapper}
          onMouseDown={this.preventBubblingUp}
        >
          <button
            className={className}
            onClick={this.activate}
            type="button"
            children={children}
          />
        </div>
      );
    }
  }

  return withEditorContext(BlockAlignmentButton);
};
