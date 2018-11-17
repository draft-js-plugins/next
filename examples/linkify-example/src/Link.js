import React, { Component } from 'react'
import linkifyIt from 'linkify-it';
import tlds from 'tlds';

const linkify = linkifyIt();
linkify.tlds(tlds);

export default class Hashtag extends Component {
  render() {
    const {
      decoratedText, // eslint-disable-line no-unused-vars
      target = '_self',
      rel = 'noreferrer noopener',
      dir, // eslint-disable-line no-unused-vars
      entityKey, // eslint-disable-line no-unused-vars
      offsetKey, // eslint-disable-line no-unused-vars
      contentState, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props // eslint-disable-line no-use-before-define

    const links = linkify.match(decoratedText);
    const href = links && links[0] ? links[0].url : '';

    const props = {
      ...otherProps,
      href,
      target,
      rel,
      className: 'link',
    };

    return <a {...props} />
  }
}
