import { Component } from 'react';
import { RichUtils } from 'draft-js';
import { withEditorContext } from '@djsp/editor';

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
          _props$pluginProps = _props.pluginProps,
          setEditorState = _props$pluginProps.setEditorState,
          editorState = _props$pluginProps.editorState,
          blockType = _props.blockType,
          children = _props.children;


      var hasBlockType = editorState != null && RichUtils.getCurrentBlockType(editorState) === blockType;

      var toggleBlockType = function toggleBlockType() {
        return setEditorState(RichUtils.toggleBlockType(editorState, blockType));
      };

      return children({ hasBlockType: hasBlockType, toggleBlockType: toggleBlockType });
    }
  }]);
  return BlockTypeToggle;
}(Component);

var index = withEditorContext(BlockTypeToggle);

export default index;
