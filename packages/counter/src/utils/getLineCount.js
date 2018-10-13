export default function getLineCount(editorState) {
  const blockArray = editorState.getCurrentContent().getBlocksAsArray()
  return blockArray ? blockArray.length : null
}
