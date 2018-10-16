'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var core = require('@djsp/core');

var styles = { "ul": "styles_ul__37R59", "li": "styles_li__2kGXu", "suggestion": "styles_suggestion__1bOge", "suggestionFocused": "styles_suggestionFocused__2ZMxu" };

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











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Suggestions = function (_Component) {
  inherits(Suggestions, _Component);

  function Suggestions(props) {
    classCallCheck(this, Suggestions);

    var _this = possibleConstructorReturn(this, (Suggestions.__proto__ || Object.getPrototypeOf(Suggestions)).call(this, props));

    _this.state = {
      isOpen: false,
      selectedItem: 0,
      isSearching: false
    };

    _this.onBlur = function () {
      return _this.setState({ isOpen: false });
    };

    _this.handleReturn = function () {
      if (_this.state.isOpen && _this.props.suggestions.length > 0) {
        _this.onSelect(_this.props.suggestions[_this.state.selectedItem]);
        return core.constants.HANDLED;
      }

      return core.constants.NOT_HANDLED;
    };

    _this.onDownArrow = function (e) {
      if (_this.state.isOpen && _this.props.suggestions.length > 0) {
        e.preventDefault();
        var _selectedItem = _this.state.selectedItem >= _this.props.suggestions.length - 1 ? 0 : _this.state.selectedItem + 1;

        _this.setState({ selectedItem: _selectedItem });
        return core.constants.HANDLED;
      }
      return core.constants.NOT_HANDLED;
    };

    _this.onUpArrow = function (e) {
      if (_this.state.isOpen && _this.props.suggestions.length > 0) {
        e.preventDefault();
        var _selectedItem2 = _this.state.selectedItem === 0 ? _this.props.suggestions.length - 1 : _this.state.selectedItem - 1;

        _this.setState({ selectedItem: _selectedItem2 });
        return core.constants.HANDLED;
      }
      return core.constants.NOT_HANDLED;
    };

    _this.onSelect = function (item) {
      _this.props.onSelect(item, _this.state.searchText);
    };

    _this.list = React__default.createRef();
    return _this;
  }

  createClass(Suggestions, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var registerPlugin = this.props.pluginProps.registerPlugin;


      this._unregister = registerPlugin({
        onBlur: this.onBlur,
        onDownArrow: this.onDownArrow,
        onUpArrow: this.onUpArrow,
        handleReturn: this.handleReturn
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unregister();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.searchText != null && prevState.searchText !== this.state.searchText) {
        this.props.onSearch(this.state.searchText);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          suggestions = _props.suggestions,
          renderSuggestion = _props.renderSuggestion;
      var _state = this.state,
          isOpen = _state.isOpen,
          selectedItem = _state.selectedItem;


      if (isOpen === true && suggestions.length > 0) {
        return React__default.createElement(
          'ul',
          { ref: this.list, className: styles.ul },
          suggestions.map(function (suggestion, index) {
            return React__default.createElement(
              'li',
              {
                className: styles.li,
                key: 'autocomplete-option-' + index,
                onMouseDown: function onMouseDown() {
                  return _this2.onSelect(suggestion);
                } },
              renderSuggestion({
                isFocused: selectedItem === index,
                suggestion: suggestion
              })
            );
          })
        );
      }

      return null;
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, state) {
      var trigger = props.trigger,
          suggestions = props.suggestions,
          editorState = props.editorProps.editorState;


      var selection = editorState.getSelection();

      if (!selection.isCollapsed()) {
        return;
      }

      var textUntilCursor = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getText().slice(0, selection.getStartOffset());

      var searchText = null;

      if (typeof trigger === 'string') {
        var lastWord = textUntilCursor.split(/\s/).slice(-1)[0];
        if (lastWord[0] === trigger) {
          searchText = lastWord;
        }
      } else if (typeof trigger === 'function') {
        searchText = trigger(textUntilCursor);
      }

      return _extends({}, state, {
        selectedItem: state.selectedItem > suggestions.length - 1 ? 0 : state.selectedItem,
        searchText: searchText,
        isOpen: searchText != null && suggestions.length > 0
      });
    }
  }]);
  return Suggestions;
}(React.Component);

Suggestions.defaultProps = {
  renderSuggestion: function renderSuggestion(_ref) {
    var suggestion = _ref.suggestion,
        isFocused = _ref.isFocused;

    var classNames = [styles.suggestion];
    if (isFocused) classNames.push(styles.suggestionFocused);
    return React__default.createElement(
      'span',
      { className: '' + classNames.join(' ') },
      suggestion.label
    );
  }
};


var index = core.withPluginContext(Suggestions);

module.exports = index;
