/* @flow */

import regexes from './hashtagRegex';
import { ContentBlock } from 'draft-js';

function extractHashtagsWithIndices(text: String): Array {
  if (!text || !text.match(regexes.hashSigns)) {
    return [];
  }

  var tags = [];

  text.replace(regexes.validHashtag, function (match, before, hash, hashText, offset, chunk) {
    const after = chunk.slice(offset + match.length);
    if (after.match(regexes.endHashtagMatch)) {
      return;
    }
    const startPosition = offset + before.length;
    const endPosition = startPosition + hashText.length + 1;
    tags.push({
      hashtag: hashText,
      indices: [startPosition, endPosition],
    });
  });

  return tags;
}

export default (contentBlock: ContentBlock, callback: Function) => {
  const text = contentBlock.getText();
  const results = extractHashtagsWithIndices(text);

  results.forEach((hashtag) => {
    callback(hashtag.indices[0], hashtag.indices[1]);
  });
};