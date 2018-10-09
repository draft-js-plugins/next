'use strict';

var react = require('react');
var draftJs = require('draft-js');
var editor = require('@djsp/editor');

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var BlockTypeToggle = function (_Component) {
  inherits(BlockTypeToggle, _Component);

  function BlockTypeToggle() {
    classCallCheck(this, BlockTypeToggle);
    return possibleConstructorReturn(this, (BlockTypeToggle.__proto__ || Object.getPrototypeOf(BlockTypeToggle)).apply(this, arguments));
  }

  createClass(BlockTypeToggle, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$pluginMethods = _props.pluginMethods,
          setEditorState = _props$pluginMethods.setEditorState,
          editorState = _props$pluginMethods.editorState,
          blockType = _props.blockType,
          children = _props.children;


      var hasBlockType = editorState != null && draftJs.RichUtils.getCurrentBlockType(editorState) === blockType;

      var toggleBlockType = function toggleBlockType() {
        return setEditorState(draftJs.RichUtils.toggleBlockType(editorState, blockType));
      };

      return children({ hasBlockType: hasBlockType, toggleBlockType: toggleBlockType });
    }
  }]);
  return BlockTypeToggle;
}(react.Component);

var index = editor.withEditorContext(BlockTypeToggle);

module.exports = index;
