// @flow
// This strategy is from https://github.com/draft-js-plugins/draft-js-plugins/blob/master/draft-js-linkify-plugin/src/linkStrategy.js
import { ContentBlock } from 'draft-js'
import linkifyIt from 'linkify-it'
import tlds from 'tlds'

const linkify = linkifyIt()
linkify.tlds(tlds)

// Gets all the links in the text, and returns them via the callback
const linkStrategy = (contentBlock: ContentBlock, callback: Function): void => {
  const links = linkify.match(contentBlock.get('text'))
  if (typeof links !== 'undefined' && links !== null) {
    for (let i = 0; i < links.length; i += 1) {
      callback(links[i].index, links[i].lastIndex)
    }
  }
}

export default linkStrategy
