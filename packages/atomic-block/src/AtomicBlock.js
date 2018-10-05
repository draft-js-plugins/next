// @flow

import React, { Component } from 'react'
import styles from './styles.css'

type Props = {
  onClick: (event: SyntheticMouseEvent<*>) => void,
  isFocused: boolean,
  children: React.Node
}

export default class AtomicBlock extends Component<Props> {
  render() {
    const { onClick, children, isFocused } = this.props
    const classNames = []
    if (isFocused) classNames.push(styles.focused)

    return <div
      className={classNames}
      onClick={onClick}>
      {children}
    </div>
  }
}
