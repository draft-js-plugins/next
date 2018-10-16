// eslint-disable-next-line
import punycode from 'punycode'

export default function getCharCount(editorState) {
  const decodeUnicode = str => punycode.ucs2.decode(str) // func to handle unicode characters
  const plainText = editorState.getCurrentContent().getPlainText('')
  const regex = /(?:\r\n|\r|\n)/g // new line, carriage return, line feed
  const cleanString = plainText.replace(regex, '').trim() // replace above characters w/ nothing
  return decodeUnicode(cleanString).length
}
