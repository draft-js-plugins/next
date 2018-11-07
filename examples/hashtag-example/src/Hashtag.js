import React, { Component } from 'react';

export default class Hashtag extends Component {
  render() {
    const {
      decoratedText, // eslint-disable-line no-unused-vars
      dir, // eslint-disable-line no-unused-vars
      entityKey, // eslint-disable-line no-unused-vars
      offsetKey, // eslint-disable-line no-unused-vars
      contentState, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props; // eslint-disable-line no-use-before-define

    return (
      <span {...otherProps} className="hashtag" />
    );
  }
}
