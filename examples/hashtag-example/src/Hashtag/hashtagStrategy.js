/* @flow */
import { findWithRegex } from '@djsp/utils';

// Note: these aren't very good regexes, don't use them! Please consider draft-js-hashtag-plugin's strategy
// no-useless-escape
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
export default function hashtagStrategy(contentBlock, callback, contentState) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}
