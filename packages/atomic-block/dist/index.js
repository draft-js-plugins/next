'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var editor = require('@djsp/core');
var Draft = _interopDefault(require('draft-js'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var styles = {"focused":"styles_focused__54uxm"};

var AtomicBlock =
/*#__PURE__*/
function (_Component) {
  _inherits(AtomicBlock, _Component);

  function AtomicBlock() {
    _classCallCheck(this, AtomicBlock);

    return _possibleConstructorReturn(this, _getPrototypeOf(AtomicBlock).apply(this, arguments));
  }

  _createClass(AtomicBlock, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onClick = _this$props.onClick,
          children = _this$props.children,
          isFocused = _this$props.isFocused;
      var classNames = [];
      if (isFocused) classNames.push(styles.focused);
      return React__default.createElement("div", {
        className: classNames,
        onClick: onClick
      }, children);
    }
  }]);

  return AtomicBlock;
}(React.Component);

var EditorState = Draft.EditorState;

var AtomicBlockPlugin =
/*#__PURE__*/
function (_Component) {
  _inherits(AtomicBlockPlugin, _Component);

  function AtomicBlockPlugin(_props) {
    var _this;

    _classCallCheck(this, AtomicBlockPlugin);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AtomicBlockPlugin).call(this, _props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "focusBlock", function (blockKey) {
      var _this$props = _this.props,
          editorState = _this$props.editorProps.editorState,
          setEditorState = _this$props.pluginProps.setEditorState;
      var selection = editorState.getSelection();
      selection = selection.merge({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: 0
      });
      window.getSelection().removeAllRanges();
      setEditorState(EditorState.forceSelection(editorState, selection));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "keyBindingFn", function (event) {
      console.log('event.key', event.key);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleReturn", function () {
      // const {
      //   editorProps: { editorState },
      // } = this.props
      // const selection = editorState.getSelection()
      console.log('handle return');
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderChildren", function (props) {
      var editorState = _this.props.editorProps.editorState;
      var blockKey = props.block.getKey();
      var selection = editorState.getSelection();
      var isFocused = selection.getAnchorKey() === blockKey && selection.isCollapsed();
      return React__default.createElement(AtomicBlock, {
        isFocused: isFocused,
        onClick: function onClick() {
          return _this.focusBlock(blockKey);
        }
      }, _this.props.children(props));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "blockRendererFn", function (block) {
      var _this$props2 = _this.props,
          type = _this$props2.type,
          editorState = _this$props2.editorProps.editorState;
      var content = editorState.getCurrentContent();

      if (block.getType() === 'atomic') {
        var entity = block.getEntityAt(0);
        if (!entity) return null;
        var entityType = content.getEntity(entity).getType();
        var data = content.getEntity(entity).getData();

        if (entityType.toLowerCase() === type.toLowerCase()) {
          return {
            component: _this.renderChildren,
            editable: false,
            props: data
          };
        }
      }
    });

    var registerPlugin = _this.props.pluginProps.registerPlugin;
    _this.unregister = registerPlugin({
      handleReturn: _this.handleReturn,
      keyBindingFn: _this.keyBindingFn,
      blockRendererFn: _this.blockRendererFn
    });
    return _this;
  }

  _createClass(AtomicBlockPlugin, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unregister();
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return AtomicBlockPlugin;
}(React.Component);

var index = editor.withEditorContext(AtomicBlockPlugin);

module.exports = index;
