// @flow
import { Component, isValidElement } from 'react';
import { createPortal } from 'react-dom';

class AlongsideBlock extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { children, editorRef } = this.props;
    return createPortal(isValidElement(children) ? children : children(), editorRef);
  }
}

export default AlongsideBlock;