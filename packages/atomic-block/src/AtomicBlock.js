// @flow

import React, { Component } from 'react'
import type { Node } from 'react'

type Props = {
  onClick: (event: SyntheticMouseEvent<*>) => void,
  isFocused: boolean,
  children: Node,
}

export default class AtomicBlock extends Component<Props> {
  render() {
    const { onClick, children } = this.props

    return <div onClick={onClick}>{children}</div>
  }
}
