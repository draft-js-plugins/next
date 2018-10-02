/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
} from '../../djs-buttons';
import PropTypes from 'prop-types';

class Toolbar extends React.Component {

  static defaultProps = {
    children: (externalProps) => (
      // may be use React.Fragment instead of div to improve perfomance after React 16
      <div>
        <ItalicButton />
        <BoldButton />
        <UnderlineButton />
        <CodeButton />
      </div>
    )
  }

  state = {
    /**
     * If this is set, the toolbar will render this instead of the regular
     * structure and will also be shown when the editor loses focus.
     * @type {Component}
     */
    overrideContent: undefined
  }

  // componentWillMount() {
  //   this.props.store.subscribeToItem('selection', () => this.forceUpdate());
  // }

  // componentWillUnmount() {
  //   this.props.store.unsubscribeFromItem('selection', () => this.forceUpdate());
  // }

  /**
   * This can be called by a child in order to render custom content instead
   * of the regular structure. It's the responsibility of the callee to call
   * this function again with `undefined` in order to reset `overrideContent`.
   * @param {Component} overrideContent
   */
  onOverrideContent = (overrideContent) => this.setState({ overrideContent });

  render() {
    const { overrideContent: OverrideContent } = this.state;
    const childrenProps = {
      onOverrideContent: this.onOverrideContent
    };

    return (
      <div
        className={theme.toolbarStyles.toolbar}
      >
        {OverrideContent
          ? <OverrideContent {...childrenProps} />
          : this.props.children(childrenProps)}
      </div>
    );
  }
}

export default Toolbar;