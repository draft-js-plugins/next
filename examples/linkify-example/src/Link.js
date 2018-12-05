// @flow

import React, { Component } from 'react'
import { Plugin } from '@djsp/core'
import linkStrategy from './linkStrategy'
import linkifyIt from 'linkify-it'
import tlds from 'tlds'
import type { DraftDecoratorComponentProps } from 'draft-js'

const linkify = linkifyIt()
linkify.tlds(tlds)

type Props = DraftDecoratorComponentProps & {
  target?: string,
  rel?: string,
}

class LinkComponent extends Component<Props> {
  render() {
    const {
      decoratedText, // eslint-disable-line no-unused-vars
      target = '_self',
      rel = 'noreferrer noopener',
      ...otherProps
    } = this.props // eslint-disable-line no-use-before-define

    const links = linkify.match(decoratedText)
    const href = links && links[0] ? links[0].url : ''

    const props = {
      ...otherProps,
      href,
      target,
      rel,
      className: 'link',
    }

    return <a {...props} /> // eslint-disable-line jsx-a11y/anchor-has-content
  }
}

export default function Link() {
  return (
    <Plugin
      decorators={[
        {
          strategy: linkStrategy,
          component: LinkComponent,
        },
      ]}
    />
  )
}
