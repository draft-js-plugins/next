'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var draftJs = require('draft-js');

function insertEntityBlock(editorState, entityType, data) {
  var contentState = editorState.getCurrentContent();
  var contentStateWithEntity = contentState.createEntity(entityType, 'IMMUTABLE', data);
  var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  return draftJs.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
}
function createEntityDecorator(entityName, component, props) {
  return {
    strategy: function strategy(contentBlock, callback, contentState) {
      contentBlock.findEntityRanges(function (character) {
        var entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === entityName;
      }, callback);
    },
    component: component,
    props: props
  };
}
function insertTextWithEntity(contentState, selection, entityType, text, mutability, entityData) {
  var content = contentState.createEntity(entityType, mutability, entityData);
  return draftJs.Modifier.insertText(content, selection, text, null, content.getLastCreatedEntityKey());
}
function createLinkAtSelection(editorState, url) {
  var contentState = editorState.getCurrentContent().createEntity('LINK', 'MUTABLE', {
    url: url
  });
  var entityKey = contentState.getLastCreatedEntityKey();
  var withLink = draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);
  return draftJs.EditorState.forceSelection(withLink, editorState.getSelection());
}
function removeLinkAtSelection(editorState) {
  var selection = editorState.getSelection();
  return draftJs.RichUtils.toggleLink(editorState, selection, null);
}
function collapseToEnd(editorState) {
  var selection = editorState.getSelection();
  return draftJs.EditorState.forceSelection(editorState, selection.merge({
    anchorKey: selection.getEndKey(),
    focusKey: selection.getEndKey(),
    anchorOffset: selection.getEndOffset(),
    focusOffset: selection.getEndOffset()
  }));
}
function getCurrentEntityKey(editorState) {
  var selection = editorState.getSelection();
  var anchorKey = selection.getAnchorKey();
  var contentState = editorState.getCurrentContent();
  var anchorBlock = contentState.getBlockForKey(anchorKey);
  var offset = selection.anchorOffset;
  var index = selection.isBackward ? offset - 1 : offset;
  return anchorBlock.getEntityAt(index);
}
function getCurrentEntity(editorState) {
  var contentState = editorState.getCurrentContent();
  var entityKey = this.getCurrentEntityKey(editorState);
  return entityKey ? contentState.getEntity(entityKey) : null;
}
function hasEntity(editorState, entityType) {
  var entity = this.getCurrentEntity(editorState);
  return entity && entity.getType() === entityType;
}

exports.insertEntityBlock = insertEntityBlock;
exports.createEntityDecorator = createEntityDecorator;
exports.insertTextWithEntity = insertTextWithEntity;
exports.createLinkAtSelection = createLinkAtSelection;
exports.removeLinkAtSelection = removeLinkAtSelection;
exports.collapseToEnd = collapseToEnd;
exports.getCurrentEntityKey = getCurrentEntityKey;
exports.getCurrentEntity = getCurrentEntity;
exports.hasEntity = hasEntity;
