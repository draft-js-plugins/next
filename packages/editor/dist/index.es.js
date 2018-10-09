import React, { Component, createContext } from 'react';
import Draft from 'draft-js';

var HANDLED = 'handled';
var NOT_HANDLED = 'not-handled';

var constants = Object.freeze({
	HANDLED: HANDLED,
	NOT_HANDLED: NOT_HANDLED
});

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







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



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









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var CompositeDecorator = Draft.CompositeDecorator;
var EditorState = Draft.EditorState;
var getDefaultKeyBinding = Draft.getDefaultKeyBinding;
var DefaultDraftBlockRenderMap = Draft.DefaultDraftBlockRenderMap;


var Context = createContext({});

var withConsumer = function withConsumer(Comp) {
  return function WithConsumer(props) {
    return React.createElement(
      Context.Consumer,
      null,
      function (contextProps) {
        return React.createElement(Comp, _extends({}, props, contextProps));
      }
    );
  };
};

var resolveDecorator = function resolveDecorator(plugins) {
  return new CompositeDecorator(Array.from(plugins.values()).reduce(function (acc, plugin) {
    return Array.isArray(plugin.decorators) ? [].concat(toConsumableArray(acc), toConsumableArray(plugin.decorators)) : acc;
  }, []));
};

var EditorContainer = function (_Component) {
  inherits(EditorContainer, _Component);

  function EditorContainer(props) {
    classCallCheck(this, EditorContainer);

    var _this = possibleConstructorReturn(this, (EditorContainer.__proto__ || Object.getPrototypeOf(EditorContainer)).call(this, props));

    _this.state = {
      plugins: new Map().set('default', { keyBindingFn: getDefaultKeyBinding })
    };

    _this.resolveDecorator = function () {
      return resolveDecorator(_this.state.plugins);
    };

    _this.resolveCustomStyleMap = function () {
      return Array.from(_this.state.plugins.values()).reduce(function (acc, plugin) {
        return plugin.customStyleMap != null ? _extends({}, acc, plugin.customStyleMap) : acc;
      }, _this.props.customStyleMap);
    };

    _this.resolveBlockRendererMap = function () {
      return Array.from(_this.state.plugins.values()).reduce(function (acc, plugin) {
        return plugin.blockRenderMap != null ? acc.merge(plugin.blockRenderMap) : acc;
      }, _this.props.blockRenderMap);
    };

    _this.setupEditorState = function () {
      return _this.setState({
        editorState: EditorState.set(_this.state.editorState, {
          decorator: _this.resolveDecorator()
        })
      });
    };

    _this.unregisterPlugin = function (key) {
      var plugins = _this.state.plugins;


      plugins.delete(key);

      _this.setState({ plugins: plugins });
      _this.setupEditorState();
    };

    _this.registerPlugin = function (plugin) {
      var plugins = _this.state.plugins;

      var key = _this.mapKey;

      _this.setState({ plugins: plugins.set(key, plugin) });
      _this.setupEditorState();

      _this.mapKey++;

      return function () {
        return _this.unregisterPlugin(key);
      };
    };

    _this.returnFirstTruthy = function (methodName) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this.state.plugins.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var plugin = _step.value;

          if (plugin[methodName] != null) {
            var result = plugin[methodName].apply(plugin, args);
            if (result) {
              return result;
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    };

    _this.returnFirstHandled = function (methodName) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _this.state.plugins.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var plugin = _step2.value;

          if (plugin[methodName] != null) {
            var result = plugin[methodName].apply(plugin, args);
            if (result === HANDLED) {
              return result;
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    };

    _this.eventCallback = function (methodName) {
      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      return _this.state.plugins.forEach(function (plugin) {
        return plugin[methodName] != null && plugin[methodName].apply(plugin, args);
      });
    };

    _this.onChange = function (editorState) {
      _this.props.onChange(editorState);
    };

    _this.getEditorState = function () {
      return _this.state.editorState;
    };

    _this.mapKey = 0;
    return _this;
  }

  createClass(EditorContainer, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var editorProps = _extends({}, this.state.editorProps, {
        editorState: this.state.editorState,
        customStyleMap: this.resolveCustomStyleMap(),
        blockRenderMap: this.resolveBlockRendererMap(),
        blockRendererFn: function blockRendererFn() {
          for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          return _this2.returnFirstTruthy.apply(_this2, ['blockRendererFn'].concat(args));
        },
        blockStyleFn: function blockStyleFn() {
          for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
          }

          return _this2.returnFirstTruthy.apply(_this2, ['blockStyleFn'].concat(args));
        },
        customStyleFn: function customStyleFn() {
          for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
          }

          return _this2.returnFirstTruthy.apply(_this2, ['customStyleFn'].concat(args));
        },
        keyBindingFn: function keyBindingFn() {
          for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args[_key7] = arguments[_key7];
          }

          return _this2.returnFirstTruthy.apply(_this2, ['keyBindingFn'].concat(args));
        },
        handleKeyCommand: function handleKeyCommand() {
          for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            args[_key8] = arguments[_key8];
          }

          return _this2.returnFirstHandled.apply(_this2, ['handleKeyCommand'].concat(args));
        },
        handleBeforeInput: function handleBeforeInput() {
          for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
            args[_key9] = arguments[_key9];
          }

          return _this2.returnFirstHandled.apply(_this2, ['handleBeforeInput'].concat(args));
        },
        handlePastedText: function handlePastedText() {
          for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
            args[_key10] = arguments[_key10];
          }

          return _this2.returnFirstHandled.apply(_this2, ['handlePastedText'].concat(args));
        },
        handlePastedFiles: function handlePastedFiles() {
          for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
            args[_key11] = arguments[_key11];
          }

          return _this2.returnFirstHandled.apply(_this2, ['handlePastedFiles'].concat(args));
        },
        handleDroppedFiles: function handleDroppedFiles() {
          for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
            args[_key12] = arguments[_key12];
          }

          return _this2.returnFirstHandled.apply(_this2, ['handleDroppedFiles'].concat(args));
        },
        handleDrop: function handleDrop() {
          for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
            args[_key13] = arguments[_key13];
          }

          return _this2.returnFirstHandled.apply(_this2, ['handleDrop'].concat(args));
        },
        handleReturn: function handleReturn() {
          for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
            args[_key14] = arguments[_key14];
          }

          return _this2.returnFirstHandled.apply(_this2, ['handleReturn'].concat(args));
        },
        onChange: this.onChange,
        onDownArrow: function onDownArrow() {
          for (var _len15 = arguments.length, args = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
            args[_key15] = arguments[_key15];
          }

          return _this2.eventCallback.apply(_this2, ['onDownArrow'].concat(args));
        },
        onEscape: function onEscape() {
          for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
            args[_key16] = arguments[_key16];
          }

          return _this2.eventCallback.apply(_this2, ['onEscape'].concat(args));
        },
        onLeftArrow: function onLeftArrow() {
          for (var _len17 = arguments.length, args = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
            args[_key17] = arguments[_key17];
          }

          return _this2.eventCallback.apply(_this2, ['onLeftArrow'].concat(args));
        },
        onRightArrow: function onRightArrow() {
          for (var _len18 = arguments.length, args = Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
            args[_key18] = arguments[_key18];
          }

          return _this2.eventCallback.apply(_this2, ['onRightArrow'].concat(args));
        },
        onTab: function onTab() {
          for (var _len19 = arguments.length, args = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
            args[_key19] = arguments[_key19];
          }

          return _this2.eventCallback.apply(_this2, ['onTab'].concat(args));
        },
        onUpArrow: function onUpArrow() {
          for (var _len20 = arguments.length, args = Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
            args[_key20] = arguments[_key20];
          }

          return _this2.eventCallback.apply(_this2, ['onUpArrow'].concat(args));
        },
        onFocus: function onFocus() {
          for (var _len21 = arguments.length, args = Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
            args[_key21] = arguments[_key21];
          }

          return _this2.eventCallback.apply(_this2, ['onFocus'].concat(args));
        },
        onBlur: function onBlur() {
          for (var _len22 = arguments.length, args = Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
            args[_key22] = arguments[_key22];
          }

          return _this2.eventCallback.apply(_this2, ['onBlur'].concat(args));
        }

        // yepyepyep this gets the editorState lazily
        // avoids having to have a `getEditorState` prop
      });Object.defineProperty(editorProps, 'editorState', {
        get: function get$$1() {
          return _this2.state.editorState;
        }
      });

      var pluginProps = {
        registerPlugin: this.registerPlugin,
        setEditorState: this.onChange,
        editorState: this.state.editorState,
        setEditorProps: function setEditorProps(editorProps) {
          return _this2.setState({
            editorProps: _extends({}, _this2.state.editorProps, editorProps)
          });
        }
      };

      Object.defineProperty(pluginProps, 'editorState', {
        get: function get$$1() {
          return _this2.state.editorState;
        }
      });

      console.log('pluginProps', pluginProps);

      return React.createElement(
        Context.Provider,
        { value: { pluginProps: pluginProps, editorProps: editorProps } },
        this.props.children
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, state) {
      var editorState = props.editorState,
          autoCapitalize = props.autoCapitalize,
          autoComplete = props.autoComplete,
          autoCorrect = props.autoCorrect,
          readOnly = props.readOnly,
          spellCheck = props.spellCheck,
          stripPastedStyles = props.stripPastedStyles,
          editorKey = props.editorKey,
          tabIndex = props.tabIndex,
          placeholder = props.placeholder,
          textAlignment = props.textAlignment,
          textDirectionality = props.textDirectionality,
          ariaActiveDescendantID = props.ariaActiveDescendantID,
          ariaAutoComplete = props.ariaAutoComplete,
          ariaControls = props.ariaControls,
          ariaDescribedBy = props.ariaDescribedBy,
          ariaExpanded = props.ariaExpanded,
          ariaLabel = props.ariaLabel,
          ariaLabelledBy = props.ariaLabelledBy,
          ariaMultiline = props.ariaMultiline,
          webDriverTestID = props.webDriverTestID;


      return _extends({}, state, {
        editorState: editorState != null ? EditorState.set(editorState, {
          decorator: resolveDecorator(state.plugins)
        }) : editorState,
        editorProps: {
          autoCapitalize: autoCapitalize,
          autoComplete: autoComplete,
          autoCorrect: autoCorrect,
          readOnly: readOnly,
          spellCheck: spellCheck,
          stripPastedStyles: stripPastedStyles,
          editorKey: editorKey,
          tabIndex: tabIndex,
          placeholder: placeholder,
          textAlignment: textAlignment,
          textDirectionality: textDirectionality,

          ariaActiveDescendantID: ariaActiveDescendantID,
          ariaAutoComplete: ariaAutoComplete,
          ariaControls: ariaControls,
          ariaDescribedBy: ariaDescribedBy,
          ariaExpanded: ariaExpanded,
          ariaLabel: ariaLabel,
          ariaLabelledBy: ariaLabelledBy,
          ariaMultiline: ariaMultiline,
          webDriverTestID: webDriverTestID
        }
      });
    }
  }]);
  return EditorContainer;
}(Component);

EditorContainer.defaultProps = {
  customStyleMap: {},
  blockRenderMap: DefaultDraftBlockRenderMap
};

var Plugin = function (_Component) {
  inherits(Plugin, _Component);

  function Plugin() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Plugin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Plugin.__proto__ || Object.getPrototypeOf(Plugin)).call.apply(_ref, [this].concat(args))), _this), _this.componentWillUnmount = function () {
      return _this.unsubscribe();
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Plugin, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          registerPlugin = _props.pluginProps.registerPlugin,
          editorProps = _props.editorProps,
          props = objectWithoutProperties(_props, ['pluginProps', 'editorProps']);

      this.unsubscribe = registerPlugin(props);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.children) {
        return this.props.children(this.props.pluginProps);
      }
      return null;
    }
  }]);
  return Plugin;
}(Component);

var Plugin$1 = withConsumer(Plugin);

var Editor = withConsumer(function (_ref) {
  var editorProps = _ref.editorProps;

  console.log('editorState', editorProps.editorState);
  return React.createElement(Draft.Editor, editorProps);
});

var withEditorContext = withConsumer;

export { EditorContainer, withEditorContext, Plugin$1 as Plugin, Editor, constants, withConsumer };
