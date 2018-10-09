'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ReactDOM = _interopDefault(require('react-dom'));
var editor = require('@djsp/editor');

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

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var immutable = createCommonjsModule(function (module, exports) {
/**
 *  Copyright (c) 2014-2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

(function (global, factory) {
  module.exports = factory();
}(commonjsGlobal, function () {var SLICE$0 = Array.prototype.slice;

  function createClass(ctor, superClass) {
    if (superClass) {
      ctor.prototype = Object.create(superClass.prototype);
    }
    ctor.prototype.constructor = ctor;
  }

  function Iterable(value) {
      return isIterable(value) ? value : Seq(value);
    }


  createClass(KeyedIterable, Iterable);
    function KeyedIterable(value) {
      return isKeyed(value) ? value : KeyedSeq(value);
    }


  createClass(IndexedIterable, Iterable);
    function IndexedIterable(value) {
      return isIndexed(value) ? value : IndexedSeq(value);
    }


  createClass(SetIterable, Iterable);
    function SetIterable(value) {
      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
    }



  function isIterable(maybeIterable) {
    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
  }

  function isKeyed(maybeKeyed) {
    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
  }

  function isIndexed(maybeIndexed) {
    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
  }

  function isAssociative(maybeAssociative) {
    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
  }

  function isOrdered(maybeOrdered) {
    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
  }

  Iterable.isIterable = isIterable;
  Iterable.isKeyed = isKeyed;
  Iterable.isIndexed = isIndexed;
  Iterable.isAssociative = isAssociative;
  Iterable.isOrdered = isOrdered;

  Iterable.Keyed = KeyedIterable;
  Iterable.Indexed = IndexedIterable;
  Iterable.Set = SetIterable;


  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  // Used for setting prototype methods that IE8 chokes on.
  var DELETE = 'delete';

  // Constants describing the size of trie nodes.
  var SHIFT = 5; // Resulted in best performance after ______?
  var SIZE = 1 << SHIFT;
  var MASK = SIZE - 1;

  // A consistent shared value representing "not set" which equals nothing other
  // than itself, and nothing that could be provided externally.
  var NOT_SET = {};

  // Boolean references, Rough equivalent of `bool &`.
  var CHANGE_LENGTH = { value: false };
  var DID_ALTER = { value: false };

  function MakeRef(ref) {
    ref.value = false;
    return ref;
  }

  function SetRef(ref) {
    ref && (ref.value = true);
  }

  // A function which returns a value representing an "owner" for transient writes
  // to tries. The return value will only ever equal itself, and will not equal
  // the return of any subsequent call of this function.
  function OwnerID() {}

  // http://jsperf.com/copy-array-inline
  function arrCopy(arr, offset) {
    offset = offset || 0;
    var len = Math.max(0, arr.length - offset);
    var newArr = new Array(len);
    for (var ii = 0; ii < len; ii++) {
      newArr[ii] = arr[ii + offset];
    }
    return newArr;
  }

  function ensureSize(iter) {
    if (iter.size === undefined) {
      iter.size = iter.__iterate(returnTrue);
    }
    return iter.size;
  }

  function wrapIndex(iter, index) {
    // This implements "is array index" which the ECMAString spec defines as:
    //
    //     A String property name P is an array index if and only if
    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
    //     to 2^32−1.
    //
    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
    if (typeof index !== 'number') {
      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
      if ('' + uint32Index !== index || uint32Index === 4294967295) {
        return NaN;
      }
      index = uint32Index;
    }
    return index < 0 ? ensureSize(iter) + index : index;
  }

  function returnTrue() {
    return true;
  }

  function wholeSlice(begin, end, size) {
    return (begin === 0 || (size !== undefined && begin <= -size)) &&
      (end === undefined || (size !== undefined && end >= size));
  }

  function resolveBegin(begin, size) {
    return resolveIndex(begin, size, 0);
  }

  function resolveEnd(end, size) {
    return resolveIndex(end, size, size);
  }

  function resolveIndex(index, size, defaultIndex) {
    return index === undefined ?
      defaultIndex :
      index < 0 ?
        Math.max(0, size + index) :
        size === undefined ?
          index :
          Math.min(size, index);
  }

  /* global Symbol */

  var ITERATE_KEYS = 0;
  var ITERATE_VALUES = 1;
  var ITERATE_ENTRIES = 2;

  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';

  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


  function Iterator(next) {
      this.next = next;
    }

    Iterator.prototype.toString = function() {
      return '[Iterator]';
    };


  Iterator.KEYS = ITERATE_KEYS;
  Iterator.VALUES = ITERATE_VALUES;
  Iterator.ENTRIES = ITERATE_ENTRIES;

  Iterator.prototype.inspect =
  Iterator.prototype.toSource = function () { return this.toString(); };
  Iterator.prototype[ITERATOR_SYMBOL] = function () {
    return this;
  };


  function iteratorValue(type, k, v, iteratorResult) {
    var value = type === 0 ? k : type === 1 ? v : [k, v];
    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
      value: value, done: false
    });
    return iteratorResult;
  }

  function iteratorDone() {
    return { value: undefined, done: true };
  }

  function hasIterator(maybeIterable) {
    return !!getIteratorFn(maybeIterable);
  }

  function isIterator(maybeIterator) {
    return maybeIterator && typeof maybeIterator.next === 'function';
  }

  function getIterator(iterable) {
    var iteratorFn = getIteratorFn(iterable);
    return iteratorFn && iteratorFn.call(iterable);
  }

  function getIteratorFn(iterable) {
    var iteratorFn = iterable && (
      (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
      iterable[FAUX_ITERATOR_SYMBOL]
    );
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  function isArrayLike(value) {
    return value && typeof value.length === 'number';
  }

  createClass(Seq, Iterable);
    function Seq(value) {
      return value === null || value === undefined ? emptySequence() :
        isIterable(value) ? value.toSeq() : seqFromValue(value);
    }

    Seq.of = function(/*...values*/) {
      return Seq(arguments);
    };

    Seq.prototype.toSeq = function() {
      return this;
    };

    Seq.prototype.toString = function() {
      return this.__toString('Seq {', '}');
    };

    Seq.prototype.cacheResult = function() {
      if (!this._cache && this.__iterateUncached) {
        this._cache = this.entrySeq().toArray();
        this.size = this._cache.length;
      }
      return this;
    };

    // abstract __iterateUncached(fn, reverse)

    Seq.prototype.__iterate = function(fn, reverse) {
      return seqIterate(this, fn, reverse, true);
    };

    // abstract __iteratorUncached(type, reverse)

    Seq.prototype.__iterator = function(type, reverse) {
      return seqIterator(this, type, reverse, true);
    };



  createClass(KeyedSeq, Seq);
    function KeyedSeq(value) {
      return value === null || value === undefined ?
        emptySequence().toKeyedSeq() :
        isIterable(value) ?
          (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :
          keyedSeqFromValue(value);
    }

    KeyedSeq.prototype.toKeyedSeq = function() {
      return this;
    };



  createClass(IndexedSeq, Seq);
    function IndexedSeq(value) {
      return value === null || value === undefined ? emptySequence() :
        !isIterable(value) ? indexedSeqFromValue(value) :
        isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
    }

    IndexedSeq.of = function(/*...values*/) {
      return IndexedSeq(arguments);
    };

    IndexedSeq.prototype.toIndexedSeq = function() {
      return this;
    };

    IndexedSeq.prototype.toString = function() {
      return this.__toString('Seq [', ']');
    };

    IndexedSeq.prototype.__iterate = function(fn, reverse) {
      return seqIterate(this, fn, reverse, false);
    };

    IndexedSeq.prototype.__iterator = function(type, reverse) {
      return seqIterator(this, type, reverse, false);
    };



  createClass(SetSeq, Seq);
    function SetSeq(value) {
      return (
        value === null || value === undefined ? emptySequence() :
        !isIterable(value) ? indexedSeqFromValue(value) :
        isKeyed(value) ? value.entrySeq() : value
      ).toSetSeq();
    }

    SetSeq.of = function(/*...values*/) {
      return SetSeq(arguments);
    };

    SetSeq.prototype.toSetSeq = function() {
      return this;
    };



  Seq.isSeq = isSeq;
  Seq.Keyed = KeyedSeq;
  Seq.Set = SetSeq;
  Seq.Indexed = IndexedSeq;

  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

  Seq.prototype[IS_SEQ_SENTINEL] = true;



  createClass(ArraySeq, IndexedSeq);
    function ArraySeq(array) {
      this._array = array;
      this.size = array.length;
    }

    ArraySeq.prototype.get = function(index, notSetValue) {
      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
    };

    ArraySeq.prototype.__iterate = function(fn, reverse) {
      var array = this._array;
      var maxIndex = array.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    ArraySeq.prototype.__iterator = function(type, reverse) {
      var array = this._array;
      var maxIndex = array.length - 1;
      var ii = 0;
      return new Iterator(function() 
        {return ii > maxIndex ?
          iteratorDone() :
          iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}
      );
    };



  createClass(ObjectSeq, KeyedSeq);
    function ObjectSeq(object) {
      var keys = Object.keys(object);
      this._object = object;
      this._keys = keys;
      this.size = keys.length;
    }

    ObjectSeq.prototype.get = function(key, notSetValue) {
      if (notSetValue !== undefined && !this.has(key)) {
        return notSetValue;
      }
      return this._object[key];
    };

    ObjectSeq.prototype.has = function(key) {
      return this._object.hasOwnProperty(key);
    };

    ObjectSeq.prototype.__iterate = function(fn, reverse) {
      var object = this._object;
      var keys = this._keys;
      var maxIndex = keys.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var key = keys[reverse ? maxIndex - ii : ii];
        if (fn(object[key], key, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    ObjectSeq.prototype.__iterator = function(type, reverse) {
      var object = this._object;
      var keys = this._keys;
      var maxIndex = keys.length - 1;
      var ii = 0;
      return new Iterator(function()  {
        var key = keys[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ?
          iteratorDone() :
          iteratorValue(type, key, object[key]);
      });
    };

  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;


  createClass(IterableSeq, IndexedSeq);
    function IterableSeq(iterable) {
      this._iterable = iterable;
      this.size = iterable.length || iterable.size;
    }

    IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterable = this._iterable;
      var iterator = getIterator(iterable);
      var iterations = 0;
      if (isIterator(iterator)) {
        var step;
        while (!(step = iterator.next()).done) {
          if (fn(step.value, iterations++, this) === false) {
            break;
          }
        }
      }
      return iterations;
    };

    IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterable = this._iterable;
      var iterator = getIterator(iterable);
      if (!isIterator(iterator)) {
        return new Iterator(iteratorDone);
      }
      var iterations = 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step : iteratorValue(type, iterations++, step.value);
      });
    };



  createClass(IteratorSeq, IndexedSeq);
    function IteratorSeq(iterator) {
      this._iterator = iterator;
      this._iteratorCache = [];
    }

    IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterator = this._iterator;
      var cache = this._iteratorCache;
      var iterations = 0;
      while (iterations < cache.length) {
        if (fn(cache[iterations], iterations++, this) === false) {
          return iterations;
        }
      }
      var step;
      while (!(step = iterator.next()).done) {
        var val = step.value;
        cache[iterations] = val;
        if (fn(val, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };

    IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = this._iterator;
      var cache = this._iteratorCache;
      var iterations = 0;
      return new Iterator(function()  {
        if (iterations >= cache.length) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          cache[iterations] = step.value;
        }
        return iteratorValue(type, iterations, cache[iterations++]);
      });
    };




  // # pragma Helper functions

  function isSeq(maybeSeq) {
    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
  }

  var EMPTY_SEQ;

  function emptySequence() {
    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
  }

  function keyedSeqFromValue(value) {
    var seq =
      Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :
      isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :
      hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :
      typeof value === 'object' ? new ObjectSeq(value) :
      undefined;
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of [k, v] entries, '+
        'or keyed object: ' + value
      );
    }
    return seq;
  }

  function indexedSeqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of values: ' + value
      );
    }
    return seq;
  }

  function seqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value) ||
      (typeof value === 'object' && new ObjectSeq(value));
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of values, or keyed object: ' + value
      );
    }
    return seq;
  }

  function maybeIndexedSeqFromValue(value) {
    return (
      isArrayLike(value) ? new ArraySeq(value) :
      isIterator(value) ? new IteratorSeq(value) :
      hasIterator(value) ? new IterableSeq(value) :
      undefined
    );
  }

  function seqIterate(seq, fn, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var entry = cache[reverse ? maxIndex - ii : ii];
        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
          return ii + 1;
        }
      }
      return ii;
    }
    return seq.__iterateUncached(fn, reverse);
  }

  function seqIterator(seq, type, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      var ii = 0;
      return new Iterator(function()  {
        var entry = cache[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ?
          iteratorDone() :
          iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
      });
    }
    return seq.__iteratorUncached(type, reverse);
  }

  function fromJS(json, converter) {
    return converter ?
      fromJSWith(converter, json, '', {'': json}) :
      fromJSDefault(json);
  }

  function fromJSWith(converter, json, key, parentJSON) {
    if (Array.isArray(json)) {
      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
    }
    if (isPlainObj(json)) {
      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
    }
    return json;
  }

  function fromJSDefault(json) {
    if (Array.isArray(json)) {
      return IndexedSeq(json).map(fromJSDefault).toList();
    }
    if (isPlainObj(json)) {
      return KeyedSeq(json).map(fromJSDefault).toMap();
    }
    return json;
  }

  function isPlainObj(value) {
    return value && (value.constructor === Object || value.constructor === undefined);
  }

  /**
   * An extension of the "same-value" algorithm as [described for use by ES6 Map
   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
   *
   * NaN is considered the same as NaN, however -0 and 0 are considered the same
   * value, which is different from the algorithm described by
   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
   *
   * This is extended further to allow Objects to describe the values they
   * represent, by way of `valueOf` or `equals` (and `hashCode`).
   *
   * Note: because of this extension, the key equality of Immutable.Map and the
   * value equality of Immutable.Set will differ from ES6 Map and Set.
   *
   * ### Defining custom values
   *
   * The easiest way to describe the value an object represents is by implementing
   * `valueOf`. For example, `Date` represents a value by returning a unix
   * timestamp for `valueOf`:
   *
   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
   *     var date2 = new Date(1234567890000);
   *     date1.valueOf(); // 1234567890000
   *     assert( date1 !== date2 );
   *     assert( Immutable.is( date1, date2 ) );
   *
   * Note: overriding `valueOf` may have other implications if you use this object
   * where JavaScript expects a primitive, such as implicit string coercion.
   *
   * For more complex types, especially collections, implementing `valueOf` may
   * not be performant. An alternative is to implement `equals` and `hashCode`.
   *
   * `equals` takes another object, presumably of similar type, and returns true
   * if the it is equal. Equality is symmetrical, so the same result should be
   * returned if this and the argument are flipped.
   *
   *     assert( a.equals(b) === b.equals(a) );
   *
   * `hashCode` returns a 32bit integer number representing the object which will
   * be used to determine how to store the value object in a Map or Set. You must
   * provide both or neither methods, one must not exist without the other.
   *
   * Also, an important relationship between these methods must be upheld: if two
   * values are equal, they *must* return the same hashCode. If the values are not
   * equal, they might have the same hashCode; this is called a hash collision,
   * and while undesirable for performance reasons, it is acceptable.
   *
   *     if (a.equals(b)) {
   *       assert( a.hashCode() === b.hashCode() );
   *     }
   *
   * All Immutable collections implement `equals` and `hashCode`.
   *
   */
  function is(valueA, valueB) {
    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
    if (typeof valueA.valueOf === 'function' &&
        typeof valueB.valueOf === 'function') {
      valueA = valueA.valueOf();
      valueB = valueB.valueOf();
      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
        return true;
      }
      if (!valueA || !valueB) {
        return false;
      }
    }
    if (typeof valueA.equals === 'function' &&
        typeof valueB.equals === 'function' &&
        valueA.equals(valueB)) {
      return true;
    }
    return false;
  }

  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }

    if (
      !isIterable(b) ||
      a.size !== undefined && b.size !== undefined && a.size !== b.size ||
      a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||
      isKeyed(a) !== isKeyed(b) ||
      isIndexed(a) !== isIndexed(b) ||
      isOrdered(a) !== isOrdered(b)
    ) {
      return false;
    }

    if (a.size === 0 && b.size === 0) {
      return true;
    }

    var notAssociative = !isAssociative(a);

    if (isOrdered(a)) {
      var entries = a.entries();
      return b.every(function(v, k)  {
        var entry = entries.next().value;
        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
      }) && entries.next().done;
    }

    var flipped = false;

    if (a.size === undefined) {
      if (b.size === undefined) {
        if (typeof a.cacheResult === 'function') {
          a.cacheResult();
        }
      } else {
        flipped = true;
        var _ = a;
        a = b;
        b = _;
      }
    }

    var allEqual = true;
    var bSize = b.__iterate(function(v, k)  {
      if (notAssociative ? !a.has(v) :
          flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
        allEqual = false;
        return false;
      }
    });

    return allEqual && a.size === bSize;
  }

  createClass(Repeat, IndexedSeq);

    function Repeat(value, times) {
      if (!(this instanceof Repeat)) {
        return new Repeat(value, times);
      }
      this._value = value;
      this.size = times === undefined ? Infinity : Math.max(0, times);
      if (this.size === 0) {
        if (EMPTY_REPEAT) {
          return EMPTY_REPEAT;
        }
        EMPTY_REPEAT = this;
      }
    }

    Repeat.prototype.toString = function() {
      if (this.size === 0) {
        return 'Repeat []';
      }
      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
    };

    Repeat.prototype.get = function(index, notSetValue) {
      return this.has(index) ? this._value : notSetValue;
    };

    Repeat.prototype.includes = function(searchValue) {
      return is(this._value, searchValue);
    };

    Repeat.prototype.slice = function(begin, end) {
      var size = this.size;
      return wholeSlice(begin, end, size) ? this :
        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
    };

    Repeat.prototype.reverse = function() {
      return this;
    };

    Repeat.prototype.indexOf = function(searchValue) {
      if (is(this._value, searchValue)) {
        return 0;
      }
      return -1;
    };

    Repeat.prototype.lastIndexOf = function(searchValue) {
      if (is(this._value, searchValue)) {
        return this.size;
      }
      return -1;
    };

    Repeat.prototype.__iterate = function(fn, reverse) {
      for (var ii = 0; ii < this.size; ii++) {
        if (fn(this._value, ii, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;
      var ii = 0;
      return new Iterator(function() 
        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}
      );
    };

    Repeat.prototype.equals = function(other) {
      return other instanceof Repeat ?
        is(this._value, other._value) :
        deepEqual(other);
    };


  var EMPTY_REPEAT;

  function invariant(condition, error) {
    if (!condition) throw new Error(error);
  }

  createClass(Range, IndexedSeq);

    function Range(start, end, step) {
      if (!(this instanceof Range)) {
        return new Range(start, end, step);
      }
      invariant(step !== 0, 'Cannot step a Range by 0');
      start = start || 0;
      if (end === undefined) {
        end = Infinity;
      }
      step = step === undefined ? 1 : Math.abs(step);
      if (end < start) {
        step = -step;
      }
      this._start = start;
      this._end = end;
      this._step = step;
      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
      if (this.size === 0) {
        if (EMPTY_RANGE) {
          return EMPTY_RANGE;
        }
        EMPTY_RANGE = this;
      }
    }

    Range.prototype.toString = function() {
      if (this.size === 0) {
        return 'Range []';
      }
      return 'Range [ ' +
        this._start + '...' + this._end +
        (this._step > 1 ? ' by ' + this._step : '') +
      ' ]';
    };

    Range.prototype.get = function(index, notSetValue) {
      return this.has(index) ?
        this._start + wrapIndex(this, index) * this._step :
        notSetValue;
    };

    Range.prototype.includes = function(searchValue) {
      var possibleIndex = (searchValue - this._start) / this._step;
      return possibleIndex >= 0 &&
        possibleIndex < this.size &&
        possibleIndex === Math.floor(possibleIndex);
    };

    Range.prototype.slice = function(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      begin = resolveBegin(begin, this.size);
      end = resolveEnd(end, this.size);
      if (end <= begin) {
        return new Range(0, 0);
      }
      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
    };

    Range.prototype.indexOf = function(searchValue) {
      var offsetValue = searchValue - this._start;
      if (offsetValue % this._step === 0) {
        var index = offsetValue / this._step;
        if (index >= 0 && index < this.size) {
          return index
        }
      }
      return -1;
    };

    Range.prototype.lastIndexOf = function(searchValue) {
      return this.indexOf(searchValue);
    };

    Range.prototype.__iterate = function(fn, reverse) {
      var maxIndex = this.size - 1;
      var step = this._step;
      var value = reverse ? this._start + maxIndex * step : this._start;
      for (var ii = 0; ii <= maxIndex; ii++) {
        if (fn(value, ii, this) === false) {
          return ii + 1;
        }
        value += reverse ? -step : step;
      }
      return ii;
    };

    Range.prototype.__iterator = function(type, reverse) {
      var maxIndex = this.size - 1;
      var step = this._step;
      var value = reverse ? this._start + maxIndex * step : this._start;
      var ii = 0;
      return new Iterator(function()  {
        var v = value;
        value += reverse ? -step : step;
        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
      });
    };

    Range.prototype.equals = function(other) {
      return other instanceof Range ?
        this._start === other._start &&
        this._end === other._end &&
        this._step === other._step :
        deepEqual(this, other);
    };


  var EMPTY_RANGE;

  createClass(Collection, Iterable);
    function Collection() {
      throw TypeError('Abstract');
    }


  createClass(KeyedCollection, Collection);function KeyedCollection() {}

  createClass(IndexedCollection, Collection);function IndexedCollection() {}

  createClass(SetCollection, Collection);function SetCollection() {}


  Collection.Keyed = KeyedCollection;
  Collection.Indexed = IndexedCollection;
  Collection.Set = SetCollection;

  var imul =
    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?
    Math.imul :
    function imul(a, b) {
      a = a | 0; // int
      b = b | 0; // int
      var c = a & 0xffff;
      var d = b & 0xffff;
      // Shift by 0 fixes the sign on the high part.
      return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0; // int
    };

  // v8 has an optimization for storing 31-bit signed numbers.
  // Values which have either 00 or 11 as the high order bits qualify.
  // This function drops the highest order bit in a signed number, maintaining
  // the sign bit.
  function smi(i32) {
    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
  }

  function hash(o) {
    if (o === false || o === null || o === undefined) {
      return 0;
    }
    if (typeof o.valueOf === 'function') {
      o = o.valueOf();
      if (o === false || o === null || o === undefined) {
        return 0;
      }
    }
    if (o === true) {
      return 1;
    }
    var type = typeof o;
    if (type === 'number') {
      var h = o | 0;
      if (h !== o) {
        h ^= o * 0xFFFFFFFF;
      }
      while (o > 0xFFFFFFFF) {
        o /= 0xFFFFFFFF;
        h ^= o;
      }
      return smi(h);
    }
    if (type === 'string') {
      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
    }
    if (typeof o.hashCode === 'function') {
      return o.hashCode();
    }
    if (type === 'object') {
      return hashJSObj(o);
    }
    if (typeof o.toString === 'function') {
      return hashString(o.toString());
    }
    throw new Error('Value type ' + type + ' cannot be hashed.');
  }

  function cachedHashString(string) {
    var hash = stringHashCache[string];
    if (hash === undefined) {
      hash = hashString(string);
      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
        STRING_HASH_CACHE_SIZE = 0;
        stringHashCache = {};
      }
      STRING_HASH_CACHE_SIZE++;
      stringHashCache[string] = hash;
    }
    return hash;
  }

  // http://jsperf.com/hashing-strings
  function hashString(string) {
    // This is the hash from JVM
    // The hash code for a string is computed as
    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
    // where s[i] is the ith character of the string and n is the length of
    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
    // (exclusive) by dropping high bits.
    var hash = 0;
    for (var ii = 0; ii < string.length; ii++) {
      hash = 31 * hash + string.charCodeAt(ii) | 0;
    }
    return smi(hash);
  }

  function hashJSObj(obj) {
    var hash;
    if (usingWeakMap) {
      hash = weakMap.get(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = obj[UID_HASH_KEY];
    if (hash !== undefined) {
      return hash;
    }

    if (!canDefineProperty) {
      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
      if (hash !== undefined) {
        return hash;
      }

      hash = getIENodeHash(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = ++objHashUID;
    if (objHashUID & 0x40000000) {
      objHashUID = 0;
    }

    if (usingWeakMap) {
      weakMap.set(obj, hash);
    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
      throw new Error('Non-extensible objects are not allowed as keys.');
    } else if (canDefineProperty) {
      Object.defineProperty(obj, UID_HASH_KEY, {
        'enumerable': false,
        'configurable': false,
        'writable': false,
        'value': hash
      });
    } else if (obj.propertyIsEnumerable !== undefined &&
               obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
      // Since we can't define a non-enumerable property on the object
      // we'll hijack one of the less-used non-enumerable properties to
      // save our hash on it. Since this is a function it will not show up in
      // `JSON.stringify` which is what we want.
      obj.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      };
      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
    } else if (obj.nodeType !== undefined) {
      // At this point we couldn't get the IE `uniqueID` to use as a hash
      // and we couldn't use a non-enumerable property to exploit the
      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
      // itself.
      obj[UID_HASH_KEY] = hash;
    } else {
      throw new Error('Unable to set a non-enumerable property on object.');
    }

    return hash;
  }

  // Get references to ES5 object methods.
  var isExtensible = Object.isExtensible;

  // True if Object.defineProperty works as expected. IE8 fails this test.
  var canDefineProperty = (function() {
    try {
      Object.defineProperty({}, '@', {});
      return true;
    } catch (e) {
      return false;
    }
  }());

  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
  // and avoid memory leaks from the IE cloneNode bug.
  function getIENodeHash(node) {
    if (node && node.nodeType > 0) {
      switch (node.nodeType) {
        case 1: // Element
          return node.uniqueID;
        case 9: // Document
          return node.documentElement && node.documentElement.uniqueID;
      }
    }
  }

  // If possible, use a WeakMap.
  var usingWeakMap = typeof WeakMap === 'function';
  var weakMap;
  if (usingWeakMap) {
    weakMap = new WeakMap();
  }

  var objHashUID = 0;

  var UID_HASH_KEY = '__immutablehash__';
  if (typeof Symbol === 'function') {
    UID_HASH_KEY = Symbol(UID_HASH_KEY);
  }

  var STRING_HASH_CACHE_MIN_STRLEN = 16;
  var STRING_HASH_CACHE_MAX_SIZE = 255;
  var STRING_HASH_CACHE_SIZE = 0;
  var stringHashCache = {};

  function assertNotInfinite(size) {
    invariant(
      size !== Infinity,
      'Cannot perform this action with an infinite size.'
    );
  }

  createClass(Map, KeyedCollection);

    // @pragma Construction

    function Map(value) {
      return value === null || value === undefined ? emptyMap() :
        isMap(value) && !isOrdered(value) ? value :
        emptyMap().withMutations(function(map ) {
          var iter = KeyedIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k)  {return map.set(k, v)});
        });
    }

    Map.prototype.toString = function() {
      return this.__toString('Map {', '}');
    };

    // @pragma Access

    Map.prototype.get = function(k, notSetValue) {
      return this._root ?
        this._root.get(0, undefined, k, notSetValue) :
        notSetValue;
    };

    // @pragma Modification

    Map.prototype.set = function(k, v) {
      return updateMap(this, k, v);
    };

    Map.prototype.setIn = function(keyPath, v) {
      return this.updateIn(keyPath, NOT_SET, function()  {return v});
    };

    Map.prototype.remove = function(k) {
      return updateMap(this, k, NOT_SET);
    };

    Map.prototype.deleteIn = function(keyPath) {
      return this.updateIn(keyPath, function()  {return NOT_SET});
    };

    Map.prototype.update = function(k, notSetValue, updater) {
      return arguments.length === 1 ?
        k(this) :
        this.updateIn([k], notSetValue, updater);
    };

    Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
      if (!updater) {
        updater = notSetValue;
        notSetValue = undefined;
      }
      var updatedValue = updateInDeepMap(
        this,
        forceIterator(keyPath),
        notSetValue,
        updater
      );
      return updatedValue === NOT_SET ? undefined : updatedValue;
    };

    Map.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._root = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyMap();
    };

    // @pragma Composition

    Map.prototype.merge = function(/*...iters*/) {
      return mergeIntoMapWith(this, undefined, arguments);
    };

    Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoMapWith(this, merger, iters);
    };

    Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
      return this.updateIn(
        keyPath,
        emptyMap(),
        function(m ) {return typeof m.merge === 'function' ?
          m.merge.apply(m, iters) :
          iters[iters.length - 1]}
      );
    };

    Map.prototype.mergeDeep = function(/*...iters*/) {
      return mergeIntoMapWith(this, deepMerger, arguments);
    };

    Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoMapWith(this, deepMergerWith(merger), iters);
    };

    Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
      return this.updateIn(
        keyPath,
        emptyMap(),
        function(m ) {return typeof m.mergeDeep === 'function' ?
          m.mergeDeep.apply(m, iters) :
          iters[iters.length - 1]}
      );
    };

    Map.prototype.sort = function(comparator) {
      // Late binding
      return OrderedMap(sortFactory(this, comparator));
    };

    Map.prototype.sortBy = function(mapper, comparator) {
      // Late binding
      return OrderedMap(sortFactory(this, comparator, mapper));
    };

    // @pragma Mutability

    Map.prototype.withMutations = function(fn) {
      var mutable = this.asMutable();
      fn(mutable);
      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
    };

    Map.prototype.asMutable = function() {
      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
    };

    Map.prototype.asImmutable = function() {
      return this.__ensureOwner();
    };

    Map.prototype.wasAltered = function() {
      return this.__altered;
    };

    Map.prototype.__iterator = function(type, reverse) {
      return new MapIterator(this, type, reverse);
    };

    Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      this._root && this._root.iterate(function(entry ) {
        iterations++;
        return fn(entry[1], entry[0], this$0);
      }, reverse);
      return iterations;
    };

    Map.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeMap(this.size, this._root, ownerID, this.__hash);
    };


  function isMap(maybeMap) {
    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
  }

  Map.isMap = isMap;

  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

  var MapPrototype = Map.prototype;
  MapPrototype[IS_MAP_SENTINEL] = true;
  MapPrototype[DELETE] = MapPrototype.remove;
  MapPrototype.removeIn = MapPrototype.deleteIn;


  // #pragma Trie Nodes



    function ArrayMapNode(ownerID, entries) {
      this.ownerID = ownerID;
      this.entries = entries;
    }

    ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      var entries = this.entries;
      for (var ii = 0, len = entries.length; ii < len; ii++) {
        if (is(key, entries[ii][0])) {
          return entries[ii][1];
        }
      }
      return notSetValue;
    };

    ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;

      var entries = this.entries;
      var idx = 0;
      for (var len = entries.length; idx < len; idx++) {
        if (is(key, entries[idx][0])) {
          break;
        }
      }
      var exists = idx < len;

      if (exists ? entries[idx][1] === value : removed) {
        return this;
      }

      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);

      if (removed && entries.length === 1) {
        return; // undefined
      }

      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
        return createNodes(ownerID, entries, key, value);
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries : arrCopy(entries);

      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }

      if (isEditable) {
        this.entries = newEntries;
        return this;
      }

      return new ArrayMapNode(ownerID, newEntries);
    };




    function BitmapIndexedNode(ownerID, bitmap, nodes) {
      this.ownerID = ownerID;
      this.bitmap = bitmap;
      this.nodes = nodes;
    }

    BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
      var bitmap = this.bitmap;
      return (bitmap & bit) === 0 ? notSetValue :
        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
    };

    BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var bit = 1 << keyHashFrag;
      var bitmap = this.bitmap;
      var exists = (bitmap & bit) !== 0;

      if (!exists && value === NOT_SET) {
        return this;
      }

      var idx = popCount(bitmap & (bit - 1));
      var nodes = this.nodes;
      var node = exists ? nodes[idx] : undefined;
      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

      if (newNode === node) {
        return this;
      }

      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
      }

      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
        return nodes[idx ^ 1];
      }

      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
        return newNode;
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
      var newNodes = exists ? newNode ?
        setIn(nodes, idx, newNode, isEditable) :
        spliceOut(nodes, idx, isEditable) :
        spliceIn(nodes, idx, newNode, isEditable);

      if (isEditable) {
        this.bitmap = newBitmap;
        this.nodes = newNodes;
        return this;
      }

      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
    };




    function HashArrayMapNode(ownerID, count, nodes) {
      this.ownerID = ownerID;
      this.count = count;
      this.nodes = nodes;
    }

    HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var node = this.nodes[idx];
      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
    };

    HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var removed = value === NOT_SET;
      var nodes = this.nodes;
      var node = nodes[idx];

      if (removed && !node) {
        return this;
      }

      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
      if (newNode === node) {
        return this;
      }

      var newCount = this.count;
      if (!node) {
        newCount++;
      } else if (!newNode) {
        newCount--;
        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
          return packNodes(ownerID, nodes, newCount, idx);
        }
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newNodes = setIn(nodes, idx, newNode, isEditable);

      if (isEditable) {
        this.count = newCount;
        this.nodes = newNodes;
        return this;
      }

      return new HashArrayMapNode(ownerID, newCount, newNodes);
    };




    function HashCollisionNode(ownerID, keyHash, entries) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entries = entries;
    }

    HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      var entries = this.entries;
      for (var ii = 0, len = entries.length; ii < len; ii++) {
        if (is(key, entries[ii][0])) {
          return entries[ii][1];
        }
      }
      return notSetValue;
    };

    HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }

      var removed = value === NOT_SET;

      if (keyHash !== this.keyHash) {
        if (removed) {
          return this;
        }
        SetRef(didAlter);
        SetRef(didChangeSize);
        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
      }

      var entries = this.entries;
      var idx = 0;
      for (var len = entries.length; idx < len; idx++) {
        if (is(key, entries[idx][0])) {
          break;
        }
      }
      var exists = idx < len;

      if (exists ? entries[idx][1] === value : removed) {
        return this;
      }

      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);

      if (removed && len === 2) {
        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries : arrCopy(entries);

      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }

      if (isEditable) {
        this.entries = newEntries;
        return this;
      }

      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
    };




    function ValueNode(ownerID, keyHash, entry) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entry = entry;
    }

    ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
    };

    ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;
      var keyMatch = is(key, this.entry[0]);
      if (keyMatch ? value === this.entry[1] : removed) {
        return this;
      }

      SetRef(didAlter);

      if (removed) {
        SetRef(didChangeSize);
        return; // undefined
      }

      if (keyMatch) {
        if (ownerID && ownerID === this.ownerID) {
          this.entry[1] = value;
          return this;
        }
        return new ValueNode(ownerID, this.keyHash, [key, value]);
      }

      SetRef(didChangeSize);
      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
    };



  // #pragma Iterators

  ArrayMapNode.prototype.iterate =
  HashCollisionNode.prototype.iterate = function (fn, reverse) {
    var entries = this.entries;
    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
        return false;
      }
    }
  };

  BitmapIndexedNode.prototype.iterate =
  HashArrayMapNode.prototype.iterate = function (fn, reverse) {
    var nodes = this.nodes;
    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
      var node = nodes[reverse ? maxIndex - ii : ii];
      if (node && node.iterate(fn, reverse) === false) {
        return false;
      }
    }
  };

  ValueNode.prototype.iterate = function (fn, reverse) {
    return fn(this.entry);
  };

  createClass(MapIterator, Iterator);

    function MapIterator(map, type, reverse) {
      this._type = type;
      this._reverse = reverse;
      this._stack = map._root && mapIteratorFrame(map._root);
    }

    MapIterator.prototype.next = function() {
      var type = this._type;
      var stack = this._stack;
      while (stack) {
        var node = stack.node;
        var index = stack.index++;
        var maxIndex;
        if (node.entry) {
          if (index === 0) {
            return mapIteratorValue(type, node.entry);
          }
        } else if (node.entries) {
          maxIndex = node.entries.length - 1;
          if (index <= maxIndex) {
            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
          }
        } else {
          maxIndex = node.nodes.length - 1;
          if (index <= maxIndex) {
            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
            if (subNode) {
              if (subNode.entry) {
                return mapIteratorValue(type, subNode.entry);
              }
              stack = this._stack = mapIteratorFrame(subNode, stack);
            }
            continue;
          }
        }
        stack = this._stack = this._stack.__prev;
      }
      return iteratorDone();
    };


  function mapIteratorValue(type, entry) {
    return iteratorValue(type, entry[0], entry[1]);
  }

  function mapIteratorFrame(node, prev) {
    return {
      node: node,
      index: 0,
      __prev: prev
    };
  }

  function makeMap(size, root, ownerID, hash) {
    var map = Object.create(MapPrototype);
    map.size = size;
    map._root = root;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_MAP;
  function emptyMap() {
    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
  }

  function updateMap(map, k, v) {
    var newRoot;
    var newSize;
    if (!map._root) {
      if (v === NOT_SET) {
        return map;
      }
      newSize = 1;
      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
    } else {
      var didChangeSize = MakeRef(CHANGE_LENGTH);
      var didAlter = MakeRef(DID_ALTER);
      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
      if (!didAlter.value) {
        return map;
      }
      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
    }
    if (map.__ownerID) {
      map.size = newSize;
      map._root = newRoot;
      map.__hash = undefined;
      map.__altered = true;
      return map;
    }
    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
  }

  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (!node) {
      if (value === NOT_SET) {
        return node;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return new ValueNode(ownerID, keyHash, [key, value]);
    }
    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
  }

  function isLeafNode(node) {
    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
  }

  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
    if (node.keyHash === keyHash) {
      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
    }

    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

    var newNode;
    var nodes = idx1 === idx2 ?
      [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :
      ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);

    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
  }

  function createNodes(ownerID, entries, key, value) {
    if (!ownerID) {
      ownerID = new OwnerID();
    }
    var node = new ValueNode(ownerID, hash(key), [key, value]);
    for (var ii = 0; ii < entries.length; ii++) {
      var entry = entries[ii];
      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
    }
    return node;
  }

  function packNodes(ownerID, nodes, count, excluding) {
    var bitmap = 0;
    var packedII = 0;
    var packedNodes = new Array(count);
    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
      var node = nodes[ii];
      if (node !== undefined && ii !== excluding) {
        bitmap |= bit;
        packedNodes[packedII++] = node;
      }
    }
    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
  }

  function expandNodes(ownerID, nodes, bitmap, including, node) {
    var count = 0;
    var expandedNodes = new Array(SIZE);
    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
    }
    expandedNodes[including] = node;
    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
  }

  function mergeIntoMapWith(map, merger, iterables) {
    var iters = [];
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = KeyedIterable(value);
      if (!isIterable(value)) {
        iter = iter.map(function(v ) {return fromJS(v)});
      }
      iters.push(iter);
    }
    return mergeIntoCollectionWith(map, merger, iters);
  }

  function deepMerger(existing, value, key) {
    return existing && existing.mergeDeep && isIterable(value) ?
      existing.mergeDeep(value) :
      is(existing, value) ? existing : value;
  }

  function deepMergerWith(merger) {
    return function(existing, value, key)  {
      if (existing && existing.mergeDeepWith && isIterable(value)) {
        return existing.mergeDeepWith(merger, value);
      }
      var nextValue = merger(existing, value, key);
      return is(existing, nextValue) ? existing : nextValue;
    };
  }

  function mergeIntoCollectionWith(collection, merger, iters) {
    iters = iters.filter(function(x ) {return x.size !== 0});
    if (iters.length === 0) {
      return collection;
    }
    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
      return collection.constructor(iters[0]);
    }
    return collection.withMutations(function(collection ) {
      var mergeIntoMap = merger ?
        function(value, key)  {
          collection.update(key, NOT_SET, function(existing )
            {return existing === NOT_SET ? value : merger(existing, value, key)}
          );
        } :
        function(value, key)  {
          collection.set(key, value);
        };
      for (var ii = 0; ii < iters.length; ii++) {
        iters[ii].forEach(mergeIntoMap);
      }
    });
  }

  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
    var isNotSet = existing === NOT_SET;
    var step = keyPathIter.next();
    if (step.done) {
      var existingValue = isNotSet ? notSetValue : existing;
      var newValue = updater(existingValue);
      return newValue === existingValue ? existing : newValue;
    }
    invariant(
      isNotSet || (existing && existing.set),
      'invalid keyPath'
    );
    var key = step.value;
    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
    var nextUpdated = updateInDeepMap(
      nextExisting,
      keyPathIter,
      notSetValue,
      updater
    );
    return nextUpdated === nextExisting ? existing :
      nextUpdated === NOT_SET ? existing.remove(key) :
      (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
  }

  function popCount(x) {
    x = x - ((x >> 1) & 0x55555555);
    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
    x = (x + (x >> 4)) & 0x0f0f0f0f;
    x = x + (x >> 8);
    x = x + (x >> 16);
    return x & 0x7f;
  }

  function setIn(array, idx, val, canEdit) {
    var newArray = canEdit ? array : arrCopy(array);
    newArray[idx] = val;
    return newArray;
  }

  function spliceIn(array, idx, val, canEdit) {
    var newLen = array.length + 1;
    if (canEdit && idx + 1 === newLen) {
      array[idx] = val;
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        newArray[ii] = val;
        after = -1;
      } else {
        newArray[ii] = array[ii + after];
      }
    }
    return newArray;
  }

  function spliceOut(array, idx, canEdit) {
    var newLen = array.length - 1;
    if (canEdit && idx === newLen) {
      array.pop();
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        after = 1;
      }
      newArray[ii] = array[ii + after];
    }
    return newArray;
  }

  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

  createClass(List, IndexedCollection);

    // @pragma Construction

    function List(value) {
      var empty = emptyList();
      if (value === null || value === undefined) {
        return empty;
      }
      if (isList(value)) {
        return value;
      }
      var iter = IndexedIterable(value);
      var size = iter.size;
      if (size === 0) {
        return empty;
      }
      assertNotInfinite(size);
      if (size > 0 && size < SIZE) {
        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
      }
      return empty.withMutations(function(list ) {
        list.setSize(size);
        iter.forEach(function(v, i)  {return list.set(i, v)});
      });
    }

    List.of = function(/*...values*/) {
      return this(arguments);
    };

    List.prototype.toString = function() {
      return this.__toString('List [', ']');
    };

    // @pragma Access

    List.prototype.get = function(index, notSetValue) {
      index = wrapIndex(this, index);
      if (index >= 0 && index < this.size) {
        index += this._origin;
        var node = listNodeFor(this, index);
        return node && node.array[index & MASK];
      }
      return notSetValue;
    };

    // @pragma Modification

    List.prototype.set = function(index, value) {
      return updateList(this, index, value);
    };

    List.prototype.remove = function(index) {
      return !this.has(index) ? this :
        index === 0 ? this.shift() :
        index === this.size - 1 ? this.pop() :
        this.splice(index, 1);
    };

    List.prototype.insert = function(index, value) {
      return this.splice(index, 0, value);
    };

    List.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = this._origin = this._capacity = 0;
        this._level = SHIFT;
        this._root = this._tail = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyList();
    };

    List.prototype.push = function(/*...values*/) {
      var values = arguments;
      var oldSize = this.size;
      return this.withMutations(function(list ) {
        setListBounds(list, 0, oldSize + values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(oldSize + ii, values[ii]);
        }
      });
    };

    List.prototype.pop = function() {
      return setListBounds(this, 0, -1);
    };

    List.prototype.unshift = function(/*...values*/) {
      var values = arguments;
      return this.withMutations(function(list ) {
        setListBounds(list, -values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(ii, values[ii]);
        }
      });
    };

    List.prototype.shift = function() {
      return setListBounds(this, 1);
    };

    // @pragma Composition

    List.prototype.merge = function(/*...iters*/) {
      return mergeIntoListWith(this, undefined, arguments);
    };

    List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoListWith(this, merger, iters);
    };

    List.prototype.mergeDeep = function(/*...iters*/) {
      return mergeIntoListWith(this, deepMerger, arguments);
    };

    List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoListWith(this, deepMergerWith(merger), iters);
    };

    List.prototype.setSize = function(size) {
      return setListBounds(this, 0, size);
    };

    // @pragma Iteration

    List.prototype.slice = function(begin, end) {
      var size = this.size;
      if (wholeSlice(begin, end, size)) {
        return this;
      }
      return setListBounds(
        this,
        resolveBegin(begin, size),
        resolveEnd(end, size)
      );
    };

    List.prototype.__iterator = function(type, reverse) {
      var index = 0;
      var values = iterateList(this, reverse);
      return new Iterator(function()  {
        var value = values();
        return value === DONE ?
          iteratorDone() :
          iteratorValue(type, index++, value);
      });
    };

    List.prototype.__iterate = function(fn, reverse) {
      var index = 0;
      var values = iterateList(this, reverse);
      var value;
      while ((value = values()) !== DONE) {
        if (fn(value, index++, this) === false) {
          break;
        }
      }
      return index;
    };

    List.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        return this;
      }
      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
    };


  function isList(maybeList) {
    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
  }

  List.isList = isList;

  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

  var ListPrototype = List.prototype;
  ListPrototype[IS_LIST_SENTINEL] = true;
  ListPrototype[DELETE] = ListPrototype.remove;
  ListPrototype.setIn = MapPrototype.setIn;
  ListPrototype.deleteIn =
  ListPrototype.removeIn = MapPrototype.removeIn;
  ListPrototype.update = MapPrototype.update;
  ListPrototype.updateIn = MapPrototype.updateIn;
  ListPrototype.mergeIn = MapPrototype.mergeIn;
  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  ListPrototype.withMutations = MapPrototype.withMutations;
  ListPrototype.asMutable = MapPrototype.asMutable;
  ListPrototype.asImmutable = MapPrototype.asImmutable;
  ListPrototype.wasAltered = MapPrototype.wasAltered;



    function VNode(array, ownerID) {
      this.array = array;
      this.ownerID = ownerID;
    }

    // TODO: seems like these methods are very similar

    VNode.prototype.removeBefore = function(ownerID, level, index) {
      if (index === level ? 1 << level : this.array.length === 0) {
        return this;
      }
      var originIndex = (index >>> level) & MASK;
      if (originIndex >= this.array.length) {
        return new VNode([], ownerID);
      }
      var removingFirst = originIndex === 0;
      var newChild;
      if (level > 0) {
        var oldChild = this.array[originIndex];
        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
        if (newChild === oldChild && removingFirst) {
          return this;
        }
      }
      if (removingFirst && !newChild) {
        return this;
      }
      var editable = editableVNode(this, ownerID);
      if (!removingFirst) {
        for (var ii = 0; ii < originIndex; ii++) {
          editable.array[ii] = undefined;
        }
      }
      if (newChild) {
        editable.array[originIndex] = newChild;
      }
      return editable;
    };

    VNode.prototype.removeAfter = function(ownerID, level, index) {
      if (index === (level ? 1 << level : 0) || this.array.length === 0) {
        return this;
      }
      var sizeIndex = ((index - 1) >>> level) & MASK;
      if (sizeIndex >= this.array.length) {
        return this;
      }

      var newChild;
      if (level > 0) {
        var oldChild = this.array[sizeIndex];
        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
        if (newChild === oldChild && sizeIndex === this.array.length - 1) {
          return this;
        }
      }

      var editable = editableVNode(this, ownerID);
      editable.array.splice(sizeIndex + 1);
      if (newChild) {
        editable.array[sizeIndex] = newChild;
      }
      return editable;
    };



  var DONE = {};

  function iterateList(list, reverse) {
    var left = list._origin;
    var right = list._capacity;
    var tailPos = getTailOffset(right);
    var tail = list._tail;

    return iterateNodeOrLeaf(list._root, list._level, 0);

    function iterateNodeOrLeaf(node, level, offset) {
      return level === 0 ?
        iterateLeaf(node, offset) :
        iterateNode(node, level, offset);
    }

    function iterateLeaf(node, offset) {
      var array = offset === tailPos ? tail && tail.array : node && node.array;
      var from = offset > left ? 0 : left - offset;
      var to = right - offset;
      if (to > SIZE) {
        to = SIZE;
      }
      return function()  {
        if (from === to) {
          return DONE;
        }
        var idx = reverse ? --to : from++;
        return array && array[idx];
      };
    }

    function iterateNode(node, level, offset) {
      var values;
      var array = node && node.array;
      var from = offset > left ? 0 : (left - offset) >> level;
      var to = ((right - offset) >> level) + 1;
      if (to > SIZE) {
        to = SIZE;
      }
      return function()  {
        do {
          if (values) {
            var value = values();
            if (value !== DONE) {
              return value;
            }
            values = null;
          }
          if (from === to) {
            return DONE;
          }
          var idx = reverse ? --to : from++;
          values = iterateNodeOrLeaf(
            array && array[idx], level - SHIFT, offset + (idx << level)
          );
        } while (true);
      };
    }
  }

  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
    var list = Object.create(ListPrototype);
    list.size = capacity - origin;
    list._origin = origin;
    list._capacity = capacity;
    list._level = level;
    list._root = root;
    list._tail = tail;
    list.__ownerID = ownerID;
    list.__hash = hash;
    list.__altered = false;
    return list;
  }

  var EMPTY_LIST;
  function emptyList() {
    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
  }

  function updateList(list, index, value) {
    index = wrapIndex(list, index);

    if (index !== index) {
      return list;
    }

    if (index >= list.size || index < 0) {
      return list.withMutations(function(list ) {
        index < 0 ?
          setListBounds(list, index).set(0, value) :
          setListBounds(list, 0, index + 1).set(index, value);
      });
    }

    index += list._origin;

    var newTail = list._tail;
    var newRoot = list._root;
    var didAlter = MakeRef(DID_ALTER);
    if (index >= getTailOffset(list._capacity)) {
      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
    } else {
      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
    }

    if (!didAlter.value) {
      return list;
    }

    if (list.__ownerID) {
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
  }

  function updateVNode(node, ownerID, level, index, value, didAlter) {
    var idx = (index >>> level) & MASK;
    var nodeHas = node && idx < node.array.length;
    if (!nodeHas && value === undefined) {
      return node;
    }

    var newNode;

    if (level > 0) {
      var lowerNode = node && node.array[idx];
      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
      if (newLowerNode === lowerNode) {
        return node;
      }
      newNode = editableVNode(node, ownerID);
      newNode.array[idx] = newLowerNode;
      return newNode;
    }

    if (nodeHas && node.array[idx] === value) {
      return node;
    }

    SetRef(didAlter);

    newNode = editableVNode(node, ownerID);
    if (value === undefined && idx === newNode.array.length - 1) {
      newNode.array.pop();
    } else {
      newNode.array[idx] = value;
    }
    return newNode;
  }

  function editableVNode(node, ownerID) {
    if (ownerID && node && ownerID === node.ownerID) {
      return node;
    }
    return new VNode(node ? node.array.slice() : [], ownerID);
  }

  function listNodeFor(list, rawIndex) {
    if (rawIndex >= getTailOffset(list._capacity)) {
      return list._tail;
    }
    if (rawIndex < 1 << (list._level + SHIFT)) {
      var node = list._root;
      var level = list._level;
      while (node && level > 0) {
        node = node.array[(rawIndex >>> level) & MASK];
        level -= SHIFT;
      }
      return node;
    }
  }

  function setListBounds(list, begin, end) {
    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      end = end | 0;
    }
    var owner = list.__ownerID || new OwnerID();
    var oldOrigin = list._origin;
    var oldCapacity = list._capacity;
    var newOrigin = oldOrigin + begin;
    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
      return list;
    }

    // If it's going to end after it starts, it's empty.
    if (newOrigin >= newCapacity) {
      return list.clear();
    }

    var newLevel = list._level;
    var newRoot = list._root;

    // New origin might need creating a higher root.
    var offsetShift = 0;
    while (newOrigin + offsetShift < 0) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
      newLevel += SHIFT;
      offsetShift += 1 << newLevel;
    }
    if (offsetShift) {
      newOrigin += offsetShift;
      oldOrigin += offsetShift;
      newCapacity += offsetShift;
      oldCapacity += offsetShift;
    }

    var oldTailOffset = getTailOffset(oldCapacity);
    var newTailOffset = getTailOffset(newCapacity);

    // New size might need creating a higher root.
    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
      newLevel += SHIFT;
    }

    // Locate or create the new tail.
    var oldTail = list._tail;
    var newTail = newTailOffset < oldTailOffset ?
      listNodeFor(list, newCapacity - 1) :
      newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

    // Merge Tail into tree.
    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
      newRoot = editableVNode(newRoot, owner);
      var node = newRoot;
      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
        var idx = (oldTailOffset >>> level) & MASK;
        node = node.array[idx] = editableVNode(node.array[idx], owner);
      }
      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
    }

    // If the size has been reduced, there's a chance the tail needs to be trimmed.
    if (newCapacity < oldCapacity) {
      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
    }

    // If the new origin is within the tail, then we do not need a root.
    if (newOrigin >= newTailOffset) {
      newOrigin -= newTailOffset;
      newCapacity -= newTailOffset;
      newLevel = SHIFT;
      newRoot = null;
      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

    // Otherwise, if the root has been trimmed, garbage collect.
    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
      offsetShift = 0;

      // Identify the new top root node of the subtree of the old root.
      while (newRoot) {
        var beginIndex = (newOrigin >>> newLevel) & MASK;
        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
          break;
        }
        if (beginIndex) {
          offsetShift += (1 << newLevel) * beginIndex;
        }
        newLevel -= SHIFT;
        newRoot = newRoot.array[beginIndex];
      }

      // Trim the new sides of the new root.
      if (newRoot && newOrigin > oldOrigin) {
        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
      }
      if (newRoot && newTailOffset < oldTailOffset) {
        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
      }
      if (offsetShift) {
        newOrigin -= offsetShift;
        newCapacity -= offsetShift;
      }
    }

    if (list.__ownerID) {
      list.size = newCapacity - newOrigin;
      list._origin = newOrigin;
      list._capacity = newCapacity;
      list._level = newLevel;
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
  }

  function mergeIntoListWith(list, merger, iterables) {
    var iters = [];
    var maxSize = 0;
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = IndexedIterable(value);
      if (iter.size > maxSize) {
        maxSize = iter.size;
      }
      if (!isIterable(value)) {
        iter = iter.map(function(v ) {return fromJS(v)});
      }
      iters.push(iter);
    }
    if (maxSize > list.size) {
      list = list.setSize(maxSize);
    }
    return mergeIntoCollectionWith(list, merger, iters);
  }

  function getTailOffset(size) {
    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
  }

  createClass(OrderedMap, Map);

    // @pragma Construction

    function OrderedMap(value) {
      return value === null || value === undefined ? emptyOrderedMap() :
        isOrderedMap(value) ? value :
        emptyOrderedMap().withMutations(function(map ) {
          var iter = KeyedIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k)  {return map.set(k, v)});
        });
    }

    OrderedMap.of = function(/*...values*/) {
      return this(arguments);
    };

    OrderedMap.prototype.toString = function() {
      return this.__toString('OrderedMap {', '}');
    };

    // @pragma Access

    OrderedMap.prototype.get = function(k, notSetValue) {
      var index = this._map.get(k);
      return index !== undefined ? this._list.get(index)[1] : notSetValue;
    };

    // @pragma Modification

    OrderedMap.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._map.clear();
        this._list.clear();
        return this;
      }
      return emptyOrderedMap();
    };

    OrderedMap.prototype.set = function(k, v) {
      return updateOrderedMap(this, k, v);
    };

    OrderedMap.prototype.remove = function(k) {
      return updateOrderedMap(this, k, NOT_SET);
    };

    OrderedMap.prototype.wasAltered = function() {
      return this._map.wasAltered() || this._list.wasAltered();
    };

    OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._list.__iterate(
        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},
        reverse
      );
    };

    OrderedMap.prototype.__iterator = function(type, reverse) {
      return this._list.fromEntrySeq().__iterator(type, reverse);
    };

    OrderedMap.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      var newList = this._list.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        this._list = newList;
        return this;
      }
      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
    };


  function isOrderedMap(maybeOrderedMap) {
    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
  }

  OrderedMap.isOrderedMap = isOrderedMap;

  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;



  function makeOrderedMap(map, list, ownerID, hash) {
    var omap = Object.create(OrderedMap.prototype);
    omap.size = map ? map.size : 0;
    omap._map = map;
    omap._list = list;
    omap.__ownerID = ownerID;
    omap.__hash = hash;
    return omap;
  }

  var EMPTY_ORDERED_MAP;
  function emptyOrderedMap() {
    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
  }

  function updateOrderedMap(omap, k, v) {
    var map = omap._map;
    var list = omap._list;
    var i = map.get(k);
    var has = i !== undefined;
    var newMap;
    var newList;
    if (v === NOT_SET) { // removed
      if (!has) {
        return omap;
      }
      if (list.size >= SIZE && list.size >= map.size * 2) {
        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});
        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();
        if (omap.__ownerID) {
          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
        }
      } else {
        newMap = map.remove(k);
        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
      }
    } else {
      if (has) {
        if (v === list.get(i)[1]) {
          return omap;
        }
        newMap = map;
        newList = list.set(i, [k, v]);
      } else {
        newMap = map.set(k, list.size);
        newList = list.set(list.size, [k, v]);
      }
    }
    if (omap.__ownerID) {
      omap.size = newMap.size;
      omap._map = newMap;
      omap._list = newList;
      omap.__hash = undefined;
      return omap;
    }
    return makeOrderedMap(newMap, newList);
  }

  createClass(ToKeyedSequence, KeyedSeq);
    function ToKeyedSequence(indexed, useKeys) {
      this._iter = indexed;
      this._useKeys = useKeys;
      this.size = indexed.size;
    }

    ToKeyedSequence.prototype.get = function(key, notSetValue) {
      return this._iter.get(key, notSetValue);
    };

    ToKeyedSequence.prototype.has = function(key) {
      return this._iter.has(key);
    };

    ToKeyedSequence.prototype.valueSeq = function() {
      return this._iter.valueSeq();
    };

    ToKeyedSequence.prototype.reverse = function() {var this$0 = this;
      var reversedSequence = reverseFactory(this, true);
      if (!this._useKeys) {
        reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};
      }
      return reversedSequence;
    };

    ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;
      var mappedSequence = mapFactory(this, mapper, context);
      if (!this._useKeys) {
        mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};
      }
      return mappedSequence;
    };

    ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var ii;
      return this._iter.__iterate(
        this._useKeys ?
          function(v, k)  {return fn(v, k, this$0)} :
          ((ii = reverse ? resolveSize(this) : 0),
            function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),
        reverse
      );
    };

    ToKeyedSequence.prototype.__iterator = function(type, reverse) {
      if (this._useKeys) {
        return this._iter.__iterator(type, reverse);
      }
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var ii = reverse ? resolveSize(this) : 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, reverse ? --ii : ii++, step.value, step);
      });
    };

  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;


  createClass(ToIndexedSequence, IndexedSeq);
    function ToIndexedSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    ToIndexedSequence.prototype.includes = function(value) {
      return this._iter.includes(value);
    };

    ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);
    };

    ToIndexedSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, iterations++, step.value, step)
      });
    };



  createClass(ToSetSequence, SetSeq);
    function ToSetSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    ToSetSequence.prototype.has = function(key) {
      return this._iter.includes(key);
    };

    ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);
    };

    ToSetSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, step.value, step.value, step);
      });
    };



  createClass(FromEntriesSequence, KeyedSeq);
    function FromEntriesSequence(entries) {
      this._iter = entries;
      this.size = entries.size;
    }

    FromEntriesSequence.prototype.entrySeq = function() {
      return this._iter.toSeq();
    };

    FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._iter.__iterate(function(entry ) {
        // Check if entry exists first so array access doesn't throw for holes
        // in the parent iteration.
        if (entry) {
          validateEntry(entry);
          var indexedIterable = isIterable(entry);
          return fn(
            indexedIterable ? entry.get(1) : entry[1],
            indexedIterable ? entry.get(0) : entry[0],
            this$0
          );
        }
      }, reverse);
    };

    FromEntriesSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function()  {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          // Check if entry exists first so array access doesn't throw for holes
          // in the parent iteration.
          if (entry) {
            validateEntry(entry);
            var indexedIterable = isIterable(entry);
            return iteratorValue(
              type,
              indexedIterable ? entry.get(0) : entry[0],
              indexedIterable ? entry.get(1) : entry[1],
              step
            );
          }
        }
      });
    };


  ToIndexedSequence.prototype.cacheResult =
  ToKeyedSequence.prototype.cacheResult =
  ToSetSequence.prototype.cacheResult =
  FromEntriesSequence.prototype.cacheResult =
    cacheResultThrough;


  function flipFactory(iterable) {
    var flipSequence = makeSequence(iterable);
    flipSequence._iter = iterable;
    flipSequence.size = iterable.size;
    flipSequence.flip = function()  {return iterable};
    flipSequence.reverse = function () {
      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
      reversedSequence.flip = function()  {return iterable.reverse()};
      return reversedSequence;
    };
    flipSequence.has = function(key ) {return iterable.includes(key)};
    flipSequence.includes = function(key ) {return iterable.has(key)};
    flipSequence.cacheResult = cacheResultThrough;
    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);
    };
    flipSequence.__iteratorUncached = function(type, reverse) {
      if (type === ITERATE_ENTRIES) {
        var iterator = iterable.__iterator(type, reverse);
        return new Iterator(function()  {
          var step = iterator.next();
          if (!step.done) {
            var k = step.value[0];
            step.value[0] = step.value[1];
            step.value[1] = k;
          }
          return step;
        });
      }
      return iterable.__iterator(
        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
        reverse
      );
    };
    return flipSequence;
  }


  function mapFactory(iterable, mapper, context) {
    var mappedSequence = makeSequence(iterable);
    mappedSequence.size = iterable.size;
    mappedSequence.has = function(key ) {return iterable.has(key)};
    mappedSequence.get = function(key, notSetValue)  {
      var v = iterable.get(key, NOT_SET);
      return v === NOT_SET ?
        notSetValue :
        mapper.call(context, v, key, iterable);
    };
    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(
        function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},
        reverse
      );
    };
    mappedSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      return new Iterator(function()  {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        return iteratorValue(
          type,
          key,
          mapper.call(context, entry[1], key, iterable),
          step
        );
      });
    };
    return mappedSequence;
  }


  function reverseFactory(iterable, useKeys) {
    var reversedSequence = makeSequence(iterable);
    reversedSequence._iter = iterable;
    reversedSequence.size = iterable.size;
    reversedSequence.reverse = function()  {return iterable};
    if (iterable.flip) {
      reversedSequence.flip = function () {
        var flipSequence = flipFactory(iterable);
        flipSequence.reverse = function()  {return iterable.flip()};
        return flipSequence;
      };
    }
    reversedSequence.get = function(key, notSetValue) 
      {return iterable.get(useKeys ? key : -1 - key, notSetValue)};
    reversedSequence.has = function(key )
      {return iterable.has(useKeys ? key : -1 - key)};
    reversedSequence.includes = function(value ) {return iterable.includes(value)};
    reversedSequence.cacheResult = cacheResultThrough;
    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);
    };
    reversedSequence.__iterator =
      function(type, reverse)  {return iterable.__iterator(type, !reverse)};
    return reversedSequence;
  }


  function filterFactory(iterable, predicate, context, useKeys) {
    var filterSequence = makeSequence(iterable);
    if (useKeys) {
      filterSequence.has = function(key ) {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
      };
      filterSequence.get = function(key, notSetValue)  {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?
          v : notSetValue;
      };
    }
    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function(v, k, c)  {
        if (predicate.call(context, v, k, c)) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      }, reverse);
      return iterations;
    };
    filterSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterations = 0;
      return new Iterator(function()  {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          var key = entry[0];
          var value = entry[1];
          if (predicate.call(context, value, key, iterable)) {
            return iteratorValue(type, useKeys ? key : iterations++, value, step);
          }
        }
      });
    };
    return filterSequence;
  }


  function countByFactory(iterable, grouper, context) {
    var groups = Map().asMutable();
    iterable.__iterate(function(v, k)  {
      groups.update(
        grouper.call(context, v, k, iterable),
        0,
        function(a ) {return a + 1}
      );
    });
    return groups.asImmutable();
  }


  function groupByFactory(iterable, grouper, context) {
    var isKeyedIter = isKeyed(iterable);
    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
    iterable.__iterate(function(v, k)  {
      groups.update(
        grouper.call(context, v, k, iterable),
        function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}
      );
    });
    var coerce = iterableClass(iterable);
    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});
  }


  function sliceFactory(iterable, begin, end, useKeys) {
    var originalSize = iterable.size;

    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      end = end | 0;
    }

    if (wholeSlice(begin, end, originalSize)) {
      return iterable;
    }

    var resolvedBegin = resolveBegin(begin, originalSize);
    var resolvedEnd = resolveEnd(end, originalSize);

    // begin or end will be NaN if they were provided as negative numbers and
    // this iterable's size is unknown. In that case, cache first so there is
    // a known size and these do not resolve to NaN.
    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
    }

    // Note: resolvedEnd is undefined when the original sequence's length is
    // unknown and this slice did not supply an end and should contain all
    // elements after resolvedBegin.
    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
    var resolvedSize = resolvedEnd - resolvedBegin;
    var sliceSize;
    if (resolvedSize === resolvedSize) {
      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
    }

    var sliceSeq = makeSequence(iterable);

    // If iterable.size is undefined, the size of the realized sliceSeq is
    // unknown at this point unless the number of items to slice is 0
    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
      sliceSeq.get = function (index, notSetValue) {
        index = wrapIndex(this, index);
        return index >= 0 && index < sliceSize ?
          iterable.get(index + resolvedBegin, notSetValue) :
          notSetValue;
      };
    }

    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;
      if (sliceSize === 0) {
        return 0;
      }
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var skipped = 0;
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function(v, k)  {
        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&
                 iterations !== sliceSize;
        }
      });
      return iterations;
    };

    sliceSeq.__iteratorUncached = function(type, reverse) {
      if (sliceSize !== 0 && reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      // Don't bother instantiating parent iterator if taking 0.
      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
      var skipped = 0;
      var iterations = 0;
      return new Iterator(function()  {
        while (skipped++ < resolvedBegin) {
          iterator.next();
        }
        if (++iterations > sliceSize) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (useKeys || type === ITERATE_VALUES) {
          return step;
        } else if (type === ITERATE_KEYS) {
          return iteratorValue(type, iterations - 1, undefined, step);
        } else {
          return iteratorValue(type, iterations - 1, step.value[1], step);
        }
      });
    };

    return sliceSeq;
  }


  function takeWhileFactory(iterable, predicate, context) {
    var takeSequence = makeSequence(iterable);
    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterations = 0;
      iterable.__iterate(function(v, k, c) 
        {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}
      );
      return iterations;
    };
    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterating = true;
      return new Iterator(function()  {
        if (!iterating) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var k = entry[0];
        var v = entry[1];
        if (!predicate.call(context, v, k, this$0)) {
          iterating = false;
          return iteratorDone();
        }
        return type === ITERATE_ENTRIES ? step :
          iteratorValue(type, k, v, step);
      });
    };
    return takeSequence;
  }


  function skipWhileFactory(iterable, predicate, context, useKeys) {
    var skipSequence = makeSequence(iterable);
    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function(v, k, c)  {
        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      });
      return iterations;
    };
    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var skipping = true;
      var iterations = 0;
      return new Iterator(function()  {
        var step, k, v;
        do {
          step = iterator.next();
          if (step.done) {
            if (useKeys || type === ITERATE_VALUES) {
              return step;
            } else if (type === ITERATE_KEYS) {
              return iteratorValue(type, iterations++, undefined, step);
            } else {
              return iteratorValue(type, iterations++, step.value[1], step);
            }
          }
          var entry = step.value;
          k = entry[0];
          v = entry[1];
          skipping && (skipping = predicate.call(context, v, k, this$0));
        } while (skipping);
        return type === ITERATE_ENTRIES ? step :
          iteratorValue(type, k, v, step);
      });
    };
    return skipSequence;
  }


  function concatFactory(iterable, values) {
    var isKeyedIterable = isKeyed(iterable);
    var iters = [iterable].concat(values).map(function(v ) {
      if (!isIterable(v)) {
        v = isKeyedIterable ?
          keyedSeqFromValue(v) :
          indexedSeqFromValue(Array.isArray(v) ? v : [v]);
      } else if (isKeyedIterable) {
        v = KeyedIterable(v);
      }
      return v;
    }).filter(function(v ) {return v.size !== 0});

    if (iters.length === 0) {
      return iterable;
    }

    if (iters.length === 1) {
      var singleton = iters[0];
      if (singleton === iterable ||
          isKeyedIterable && isKeyed(singleton) ||
          isIndexed(iterable) && isIndexed(singleton)) {
        return singleton;
      }
    }

    var concatSeq = new ArraySeq(iters);
    if (isKeyedIterable) {
      concatSeq = concatSeq.toKeyedSeq();
    } else if (!isIndexed(iterable)) {
      concatSeq = concatSeq.toSetSeq();
    }
    concatSeq = concatSeq.flatten(true);
    concatSeq.size = iters.reduce(
      function(sum, seq)  {
        if (sum !== undefined) {
          var size = seq.size;
          if (size !== undefined) {
            return sum + size;
          }
        }
      },
      0
    );
    return concatSeq;
  }


  function flattenFactory(iterable, depth, useKeys) {
    var flatSequence = makeSequence(iterable);
    flatSequence.__iterateUncached = function(fn, reverse) {
      var iterations = 0;
      var stopped = false;
      function flatDeep(iter, currentDepth) {var this$0 = this;
        iter.__iterate(function(v, k)  {
          if ((!depth || currentDepth < depth) && isIterable(v)) {
            flatDeep(v, currentDepth + 1);
          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
            stopped = true;
          }
          return !stopped;
        }, reverse);
      }
      flatDeep(iterable, 0);
      return iterations;
    };
    flatSequence.__iteratorUncached = function(type, reverse) {
      var iterator = iterable.__iterator(type, reverse);
      var stack = [];
      var iterations = 0;
      return new Iterator(function()  {
        while (iterator) {
          var step = iterator.next();
          if (step.done !== false) {
            iterator = stack.pop();
            continue;
          }
          var v = step.value;
          if (type === ITERATE_ENTRIES) {
            v = v[1];
          }
          if ((!depth || stack.length < depth) && isIterable(v)) {
            stack.push(iterator);
            iterator = v.__iterator(type, reverse);
          } else {
            return useKeys ? step : iteratorValue(type, iterations++, v, step);
          }
        }
        return iteratorDone();
      });
    };
    return flatSequence;
  }


  function flatMapFactory(iterable, mapper, context) {
    var coerce = iterableClass(iterable);
    return iterable.toSeq().map(
      function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}
    ).flatten(true);
  }


  function interposeFactory(iterable, separator) {
    var interposedSequence = makeSequence(iterable);
    interposedSequence.size = iterable.size && iterable.size * 2 -1;
    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function(v, k) 
        {return (!iterations || fn(separator, iterations++, this$0) !== false) &&
        fn(v, iterations++, this$0) !== false},
        reverse
      );
      return iterations;
    };
    interposedSequence.__iteratorUncached = function(type, reverse) {
      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      var step;
      return new Iterator(function()  {
        if (!step || iterations % 2) {
          step = iterator.next();
          if (step.done) {
            return step;
          }
        }
        return iterations % 2 ?
          iteratorValue(type, iterations++, separator) :
          iteratorValue(type, iterations++, step.value, step);
      });
    };
    return interposedSequence;
  }


  function sortFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    var isKeyedIterable = isKeyed(iterable);
    var index = 0;
    var entries = iterable.toSeq().map(
      function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}
    ).toArray();
    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(
      isKeyedIterable ?
      function(v, i)  { entries[i].length = 2; } :
      function(v, i)  { entries[i] = v[1]; }
    );
    return isKeyedIterable ? KeyedSeq(entries) :
      isIndexed(iterable) ? IndexedSeq(entries) :
      SetSeq(entries);
  }


  function maxFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    if (mapper) {
      var entry = iterable.toSeq()
        .map(function(v, k)  {return [v, mapper(v, k, iterable)]})
        .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});
      return entry && entry[0];
    } else {
      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});
    }
  }

  function maxCompare(comparator, a, b) {
    var comp = comparator(b, a);
    // b is considered the new max if the comparator declares them equal, but
    // they are not equal and b is in fact a nullish value.
    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;
  }


  function zipWithFactory(keyIter, zipper, iters) {
    var zipSequence = makeSequence(keyIter);
    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();
    // Note: this a generic base implementation of __iterate in terms of
    // __iterator which may be more generically useful in the future.
    zipSequence.__iterate = function(fn, reverse) {
      /* generic:
      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        iterations++;
        if (fn(step.value[1], step.value[0], this) === false) {
          break;
        }
      }
      return iterations;
      */
      // indexed:
      var iterator = this.__iterator(ITERATE_VALUES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };
    zipSequence.__iteratorUncached = function(type, reverse) {
      var iterators = iters.map(function(i )
        {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}
      );
      var iterations = 0;
      var isDone = false;
      return new Iterator(function()  {
        var steps;
        if (!isDone) {
          steps = iterators.map(function(i ) {return i.next()});
          isDone = steps.some(function(s ) {return s.done});
        }
        if (isDone) {
          return iteratorDone();
        }
        return iteratorValue(
          type,
          iterations++,
          zipper.apply(null, steps.map(function(s ) {return s.value}))
        );
      });
    };
    return zipSequence
  }


  // #pragma Helper Functions

  function reify(iter, seq) {
    return isSeq(iter) ? seq : iter.constructor(seq);
  }

  function validateEntry(entry) {
    if (entry !== Object(entry)) {
      throw new TypeError('Expected [K, V] tuple: ' + entry);
    }
  }

  function resolveSize(iter) {
    assertNotInfinite(iter.size);
    return ensureSize(iter);
  }

  function iterableClass(iterable) {
    return isKeyed(iterable) ? KeyedIterable :
      isIndexed(iterable) ? IndexedIterable :
      SetIterable;
  }

  function makeSequence(iterable) {
    return Object.create(
      (
        isKeyed(iterable) ? KeyedSeq :
        isIndexed(iterable) ? IndexedSeq :
        SetSeq
      ).prototype
    );
  }

  function cacheResultThrough() {
    if (this._iter.cacheResult) {
      this._iter.cacheResult();
      this.size = this._iter.size;
      return this;
    } else {
      return Seq.prototype.cacheResult.call(this);
    }
  }

  function defaultComparator(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }

  function forceIterator(keyPath) {
    var iter = getIterator(keyPath);
    if (!iter) {
      // Array might not be iterable in this environment, so we need a fallback
      // to our wrapped type.
      if (!isArrayLike(keyPath)) {
        throw new TypeError('Expected iterable or array-like: ' + keyPath);
      }
      iter = getIterator(Iterable(keyPath));
    }
    return iter;
  }

  createClass(Record, KeyedCollection);

    function Record(defaultValues, name) {
      var hasInitialized;

      var RecordType = function Record(values) {
        if (values instanceof RecordType) {
          return values;
        }
        if (!(this instanceof RecordType)) {
          return new RecordType(values);
        }
        if (!hasInitialized) {
          hasInitialized = true;
          var keys = Object.keys(defaultValues);
          setProps(RecordTypePrototype, keys);
          RecordTypePrototype.size = keys.length;
          RecordTypePrototype._name = name;
          RecordTypePrototype._keys = keys;
          RecordTypePrototype._defaultValues = defaultValues;
        }
        this._map = Map(values);
      };

      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
      RecordTypePrototype.constructor = RecordType;

      return RecordType;
    }

    Record.prototype.toString = function() {
      return this.__toString(recordName(this) + ' {', '}');
    };

    // @pragma Access

    Record.prototype.has = function(k) {
      return this._defaultValues.hasOwnProperty(k);
    };

    Record.prototype.get = function(k, notSetValue) {
      if (!this.has(k)) {
        return notSetValue;
      }
      var defaultVal = this._defaultValues[k];
      return this._map ? this._map.get(k, defaultVal) : defaultVal;
    };

    // @pragma Modification

    Record.prototype.clear = function() {
      if (this.__ownerID) {
        this._map && this._map.clear();
        return this;
      }
      var RecordType = this.constructor;
      return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
    };

    Record.prototype.set = function(k, v) {
      if (!this.has(k)) {
        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
      }
      var newMap = this._map && this._map.set(k, v);
      if (this.__ownerID || newMap === this._map) {
        return this;
      }
      return makeRecord(this, newMap);
    };

    Record.prototype.remove = function(k) {
      if (!this.has(k)) {
        return this;
      }
      var newMap = this._map && this._map.remove(k);
      if (this.__ownerID || newMap === this._map) {
        return this;
      }
      return makeRecord(this, newMap);
    };

    Record.prototype.wasAltered = function() {
      return this._map.wasAltered();
    };

    Record.prototype.__iterator = function(type, reverse) {var this$0 = this;
      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
    };

    Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);
    };

    Record.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map && this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return makeRecord(this, newMap, ownerID);
    };


  var RecordPrototype = Record.prototype;
  RecordPrototype[DELETE] = RecordPrototype.remove;
  RecordPrototype.deleteIn =
  RecordPrototype.removeIn = MapPrototype.removeIn;
  RecordPrototype.merge = MapPrototype.merge;
  RecordPrototype.mergeWith = MapPrototype.mergeWith;
  RecordPrototype.mergeIn = MapPrototype.mergeIn;
  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  RecordPrototype.setIn = MapPrototype.setIn;
  RecordPrototype.update = MapPrototype.update;
  RecordPrototype.updateIn = MapPrototype.updateIn;
  RecordPrototype.withMutations = MapPrototype.withMutations;
  RecordPrototype.asMutable = MapPrototype.asMutable;
  RecordPrototype.asImmutable = MapPrototype.asImmutable;


  function makeRecord(likeRecord, map, ownerID) {
    var record = Object.create(Object.getPrototypeOf(likeRecord));
    record._map = map;
    record.__ownerID = ownerID;
    return record;
  }

  function recordName(record) {
    return record._name || record.constructor.name || 'Record';
  }

  function setProps(prototype, names) {
    try {
      names.forEach(setProp.bind(undefined, prototype));
    } catch (error) {
      // Object.defineProperty failed. Probably IE8.
    }
  }

  function setProp(prototype, name) {
    Object.defineProperty(prototype, name, {
      get: function() {
        return this.get(name);
      },
      set: function(value) {
        invariant(this.__ownerID, 'Cannot set on an immutable record.');
        this.set(name, value);
      }
    });
  }

  createClass(Set, SetCollection);

    // @pragma Construction

    function Set(value) {
      return value === null || value === undefined ? emptySet() :
        isSet(value) && !isOrdered(value) ? value :
        emptySet().withMutations(function(set ) {
          var iter = SetIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v ) {return set.add(v)});
        });
    }

    Set.of = function(/*...values*/) {
      return this(arguments);
    };

    Set.fromKeys = function(value) {
      return this(KeyedIterable(value).keySeq());
    };

    Set.prototype.toString = function() {
      return this.__toString('Set {', '}');
    };

    // @pragma Access

    Set.prototype.has = function(value) {
      return this._map.has(value);
    };

    // @pragma Modification

    Set.prototype.add = function(value) {
      return updateSet(this, this._map.set(value, true));
    };

    Set.prototype.remove = function(value) {
      return updateSet(this, this._map.remove(value));
    };

    Set.prototype.clear = function() {
      return updateSet(this, this._map.clear());
    };

    // @pragma Composition

    Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);
      iters = iters.filter(function(x ) {return x.size !== 0});
      if (iters.length === 0) {
        return this;
      }
      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
        return this.constructor(iters[0]);
      }
      return this.withMutations(function(set ) {
        for (var ii = 0; ii < iters.length; ii++) {
          SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});
        }
      });
    };

    Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter ) {return SetIterable(iter)});
      var originalSet = this;
      return this.withMutations(function(set ) {
        originalSet.forEach(function(value ) {
          if (!iters.every(function(iter ) {return iter.includes(value)})) {
            set.remove(value);
          }
        });
      });
    };

    Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter ) {return SetIterable(iter)});
      var originalSet = this;
      return this.withMutations(function(set ) {
        originalSet.forEach(function(value ) {
          if (iters.some(function(iter ) {return iter.includes(value)})) {
            set.remove(value);
          }
        });
      });
    };

    Set.prototype.merge = function() {
      return this.union.apply(this, arguments);
    };

    Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return this.union.apply(this, iters);
    };

    Set.prototype.sort = function(comparator) {
      // Late binding
      return OrderedSet(sortFactory(this, comparator));
    };

    Set.prototype.sortBy = function(mapper, comparator) {
      // Late binding
      return OrderedSet(sortFactory(this, comparator, mapper));
    };

    Set.prototype.wasAltered = function() {
      return this._map.wasAltered();
    };

    Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);
    };

    Set.prototype.__iterator = function(type, reverse) {
      return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);
    };

    Set.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return this.__make(newMap, ownerID);
    };


  function isSet(maybeSet) {
    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
  }

  Set.isSet = isSet;

  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

  var SetPrototype = Set.prototype;
  SetPrototype[IS_SET_SENTINEL] = true;
  SetPrototype[DELETE] = SetPrototype.remove;
  SetPrototype.mergeDeep = SetPrototype.merge;
  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
  SetPrototype.withMutations = MapPrototype.withMutations;
  SetPrototype.asMutable = MapPrototype.asMutable;
  SetPrototype.asImmutable = MapPrototype.asImmutable;

  SetPrototype.__empty = emptySet;
  SetPrototype.__make = makeSet;

  function updateSet(set, newMap) {
    if (set.__ownerID) {
      set.size = newMap.size;
      set._map = newMap;
      return set;
    }
    return newMap === set._map ? set :
      newMap.size === 0 ? set.__empty() :
      set.__make(newMap);
  }

  function makeSet(map, ownerID) {
    var set = Object.create(SetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_SET;
  function emptySet() {
    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
  }

  createClass(OrderedSet, Set);

    // @pragma Construction

    function OrderedSet(value) {
      return value === null || value === undefined ? emptyOrderedSet() :
        isOrderedSet(value) ? value :
        emptyOrderedSet().withMutations(function(set ) {
          var iter = SetIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v ) {return set.add(v)});
        });
    }

    OrderedSet.of = function(/*...values*/) {
      return this(arguments);
    };

    OrderedSet.fromKeys = function(value) {
      return this(KeyedIterable(value).keySeq());
    };

    OrderedSet.prototype.toString = function() {
      return this.__toString('OrderedSet {', '}');
    };


  function isOrderedSet(maybeOrderedSet) {
    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
  }

  OrderedSet.isOrderedSet = isOrderedSet;

  var OrderedSetPrototype = OrderedSet.prototype;
  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

  OrderedSetPrototype.__empty = emptyOrderedSet;
  OrderedSetPrototype.__make = makeOrderedSet;

  function makeOrderedSet(map, ownerID) {
    var set = Object.create(OrderedSetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_ORDERED_SET;
  function emptyOrderedSet() {
    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
  }

  createClass(Stack, IndexedCollection);

    // @pragma Construction

    function Stack(value) {
      return value === null || value === undefined ? emptyStack() :
        isStack(value) ? value :
        emptyStack().unshiftAll(value);
    }

    Stack.of = function(/*...values*/) {
      return this(arguments);
    };

    Stack.prototype.toString = function() {
      return this.__toString('Stack [', ']');
    };

    // @pragma Access

    Stack.prototype.get = function(index, notSetValue) {
      var head = this._head;
      index = wrapIndex(this, index);
      while (head && index--) {
        head = head.next;
      }
      return head ? head.value : notSetValue;
    };

    Stack.prototype.peek = function() {
      return this._head && this._head.value;
    };

    // @pragma Modification

    Stack.prototype.push = function(/*...values*/) {
      if (arguments.length === 0) {
        return this;
      }
      var newSize = this.size + arguments.length;
      var head = this._head;
      for (var ii = arguments.length - 1; ii >= 0; ii--) {
        head = {
          value: arguments[ii],
          next: head
        };
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pushAll = function(iter) {
      iter = IndexedIterable(iter);
      if (iter.size === 0) {
        return this;
      }
      assertNotInfinite(iter.size);
      var newSize = this.size;
      var head = this._head;
      iter.reverse().forEach(function(value ) {
        newSize++;
        head = {
          value: value,
          next: head
        };
      });
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pop = function() {
      return this.slice(1);
    };

    Stack.prototype.unshift = function(/*...values*/) {
      return this.push.apply(this, arguments);
    };

    Stack.prototype.unshiftAll = function(iter) {
      return this.pushAll(iter);
    };

    Stack.prototype.shift = function() {
      return this.pop.apply(this, arguments);
    };

    Stack.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._head = undefined;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyStack();
    };

    Stack.prototype.slice = function(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      var resolvedBegin = resolveBegin(begin, this.size);
      var resolvedEnd = resolveEnd(end, this.size);
      if (resolvedEnd !== this.size) {
        // super.slice(begin, end);
        return IndexedCollection.prototype.slice.call(this, begin, end);
      }
      var newSize = this.size - resolvedBegin;
      var head = this._head;
      while (resolvedBegin--) {
        head = head.next;
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    // @pragma Mutability

    Stack.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeStack(this.size, this._head, ownerID, this.__hash);
    };

    // @pragma Iteration

    Stack.prototype.__iterate = function(fn, reverse) {
      if (reverse) {
        return this.reverse().__iterate(fn);
      }
      var iterations = 0;
      var node = this._head;
      while (node) {
        if (fn(node.value, iterations++, this) === false) {
          break;
        }
        node = node.next;
      }
      return iterations;
    };

    Stack.prototype.__iterator = function(type, reverse) {
      if (reverse) {
        return this.reverse().__iterator(type);
      }
      var iterations = 0;
      var node = this._head;
      return new Iterator(function()  {
        if (node) {
          var value = node.value;
          node = node.next;
          return iteratorValue(type, iterations++, value);
        }
        return iteratorDone();
      });
    };


  function isStack(maybeStack) {
    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
  }

  Stack.isStack = isStack;

  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

  var StackPrototype = Stack.prototype;
  StackPrototype[IS_STACK_SENTINEL] = true;
  StackPrototype.withMutations = MapPrototype.withMutations;
  StackPrototype.asMutable = MapPrototype.asMutable;
  StackPrototype.asImmutable = MapPrototype.asImmutable;
  StackPrototype.wasAltered = MapPrototype.wasAltered;


  function makeStack(size, head, ownerID, hash) {
    var map = Object.create(StackPrototype);
    map.size = size;
    map._head = head;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_STACK;
  function emptyStack() {
    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
  }

  /**
   * Contributes additional methods to a constructor
   */
  function mixin(ctor, methods) {
    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };
    Object.keys(methods).forEach(keyCopier);
    Object.getOwnPropertySymbols &&
      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
    return ctor;
  }

  Iterable.Iterator = Iterator;

  mixin(Iterable, {

    // ### Conversion to other types

    toArray: function() {
      assertNotInfinite(this.size);
      var array = new Array(this.size || 0);
      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });
      return array;
    },

    toIndexedSeq: function() {
      return new ToIndexedSequence(this);
    },

    toJS: function() {
      return this.toSeq().map(
        function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}
      ).__toJS();
    },

    toJSON: function() {
      return this.toSeq().map(
        function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}
      ).__toJS();
    },

    toKeyedSeq: function() {
      return new ToKeyedSequence(this, true);
    },

    toMap: function() {
      // Use Late Binding here to solve the circular dependency.
      return Map(this.toKeyedSeq());
    },

    toObject: function() {
      assertNotInfinite(this.size);
      var object = {};
      this.__iterate(function(v, k)  { object[k] = v; });
      return object;
    },

    toOrderedMap: function() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedMap(this.toKeyedSeq());
    },

    toOrderedSet: function() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
    },

    toSet: function() {
      // Use Late Binding here to solve the circular dependency.
      return Set(isKeyed(this) ? this.valueSeq() : this);
    },

    toSetSeq: function() {
      return new ToSetSequence(this);
    },

    toSeq: function() {
      return isIndexed(this) ? this.toIndexedSeq() :
        isKeyed(this) ? this.toKeyedSeq() :
        this.toSetSeq();
    },

    toStack: function() {
      // Use Late Binding here to solve the circular dependency.
      return Stack(isKeyed(this) ? this.valueSeq() : this);
    },

    toList: function() {
      // Use Late Binding here to solve the circular dependency.
      return List(isKeyed(this) ? this.valueSeq() : this);
    },


    // ### Common JavaScript methods and properties

    toString: function() {
      return '[Iterable]';
    },

    __toString: function(head, tail) {
      if (this.size === 0) {
        return head + tail;
      }
      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
    },


    // ### ES6 Collection methods (ES6 Array and Map)

    concat: function() {var values = SLICE$0.call(arguments, 0);
      return reify(this, concatFactory(this, values));
    },

    includes: function(searchValue) {
      return this.some(function(value ) {return is(value, searchValue)});
    },

    entries: function() {
      return this.__iterator(ITERATE_ENTRIES);
    },

    every: function(predicate, context) {
      assertNotInfinite(this.size);
      var returnValue = true;
      this.__iterate(function(v, k, c)  {
        if (!predicate.call(context, v, k, c)) {
          returnValue = false;
          return false;
        }
      });
      return returnValue;
    },

    filter: function(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, true));
    },

    find: function(predicate, context, notSetValue) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[1] : notSetValue;
    },

    findEntry: function(predicate, context) {
      var found;
      this.__iterate(function(v, k, c)  {
        if (predicate.call(context, v, k, c)) {
          found = [k, v];
          return false;
        }
      });
      return found;
    },

    findLastEntry: function(predicate, context) {
      return this.toSeq().reverse().findEntry(predicate, context);
    },

    forEach: function(sideEffect, context) {
      assertNotInfinite(this.size);
      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
    },

    join: function(separator) {
      assertNotInfinite(this.size);
      separator = separator !== undefined ? '' + separator : ',';
      var joined = '';
      var isFirst = true;
      this.__iterate(function(v ) {
        isFirst ? (isFirst = false) : (joined += separator);
        joined += v !== null && v !== undefined ? v.toString() : '';
      });
      return joined;
    },

    keys: function() {
      return this.__iterator(ITERATE_KEYS);
    },

    map: function(mapper, context) {
      return reify(this, mapFactory(this, mapper, context));
    },

    reduce: function(reducer, initialReduction, context) {
      assertNotInfinite(this.size);
      var reduction;
      var useFirst;
      if (arguments.length < 2) {
        useFirst = true;
      } else {
        reduction = initialReduction;
      }
      this.__iterate(function(v, k, c)  {
        if (useFirst) {
          useFirst = false;
          reduction = v;
        } else {
          reduction = reducer.call(context, reduction, v, k, c);
        }
      });
      return reduction;
    },

    reduceRight: function(reducer, initialReduction, context) {
      var reversed = this.toKeyedSeq().reverse();
      return reversed.reduce.apply(reversed, arguments);
    },

    reverse: function() {
      return reify(this, reverseFactory(this, true));
    },

    slice: function(begin, end) {
      return reify(this, sliceFactory(this, begin, end, true));
    },

    some: function(predicate, context) {
      return !this.every(not(predicate), context);
    },

    sort: function(comparator) {
      return reify(this, sortFactory(this, comparator));
    },

    values: function() {
      return this.__iterator(ITERATE_VALUES);
    },


    // ### More sequential methods

    butLast: function() {
      return this.slice(0, -1);
    },

    isEmpty: function() {
      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});
    },

    count: function(predicate, context) {
      return ensureSize(
        predicate ? this.toSeq().filter(predicate, context) : this
      );
    },

    countBy: function(grouper, context) {
      return countByFactory(this, grouper, context);
    },

    equals: function(other) {
      return deepEqual(this, other);
    },

    entrySeq: function() {
      var iterable = this;
      if (iterable._cache) {
        // We cache as an entries array, so we can just return the cache!
        return new ArraySeq(iterable._cache);
      }
      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};
      return entriesSequence;
    },

    filterNot: function(predicate, context) {
      return this.filter(not(predicate), context);
    },

    findLast: function(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
    },

    first: function() {
      return this.find(returnTrue);
    },

    flatMap: function(mapper, context) {
      return reify(this, flatMapFactory(this, mapper, context));
    },

    flatten: function(depth) {
      return reify(this, flattenFactory(this, depth, true));
    },

    fromEntrySeq: function() {
      return new FromEntriesSequence(this);
    },

    get: function(searchKey, notSetValue) {
      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);
    },

    getIn: function(searchKeyPath, notSetValue) {
      var nested = this;
      // Note: in an ES6 environment, we would prefer:
      // for (var key of searchKeyPath) {
      var iter = forceIterator(searchKeyPath);
      var step;
      while (!(step = iter.next()).done) {
        var key = step.value;
        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
        if (nested === NOT_SET) {
          return notSetValue;
        }
      }
      return nested;
    },

    groupBy: function(grouper, context) {
      return groupByFactory(this, grouper, context);
    },

    has: function(searchKey) {
      return this.get(searchKey, NOT_SET) !== NOT_SET;
    },

    hasIn: function(searchKeyPath) {
      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
    },

    isSubset: function(iter) {
      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
      return this.every(function(value ) {return iter.includes(value)});
    },

    isSuperset: function(iter) {
      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
      return iter.isSubset(this);
    },

    keySeq: function() {
      return this.toSeq().map(keyMapper).toIndexedSeq();
    },

    last: function() {
      return this.toSeq().reverse().first();
    },

    max: function(comparator) {
      return maxFactory(this, comparator);
    },

    maxBy: function(mapper, comparator) {
      return maxFactory(this, comparator, mapper);
    },

    min: function(comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
    },

    minBy: function(mapper, comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
    },

    rest: function() {
      return this.slice(1);
    },

    skip: function(amount) {
      return this.slice(Math.max(0, amount));
    },

    skipLast: function(amount) {
      return reify(this, this.toSeq().reverse().skip(amount).reverse());
    },

    skipWhile: function(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, true));
    },

    skipUntil: function(predicate, context) {
      return this.skipWhile(not(predicate), context);
    },

    sortBy: function(mapper, comparator) {
      return reify(this, sortFactory(this, comparator, mapper));
    },

    take: function(amount) {
      return this.slice(0, Math.max(0, amount));
    },

    takeLast: function(amount) {
      return reify(this, this.toSeq().reverse().take(amount).reverse());
    },

    takeWhile: function(predicate, context) {
      return reify(this, takeWhileFactory(this, predicate, context));
    },

    takeUntil: function(predicate, context) {
      return this.takeWhile(not(predicate), context);
    },

    valueSeq: function() {
      return this.toIndexedSeq();
    },


    // ### Hashable Object

    hashCode: function() {
      return this.__hash || (this.__hash = hashIterable(this));
    }


    // ### Internal

    // abstract __iterate(fn, reverse)

    // abstract __iterator(type, reverse)
  });

  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  var IterablePrototype = Iterable.prototype;
  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
  IterablePrototype.__toJS = IterablePrototype.toArray;
  IterablePrototype.__toStringMapper = quoteString;
  IterablePrototype.inspect =
  IterablePrototype.toSource = function() { return this.toString(); };
  IterablePrototype.chain = IterablePrototype.flatMap;
  IterablePrototype.contains = IterablePrototype.includes;

  // Temporary warning about using length
  (function () {
    try {
      Object.defineProperty(IterablePrototype, 'length', {
        get: function () {
          if (!Iterable.noLengthWarning) {
            var stack;
            try {
              throw new Error();
            } catch (error) {
              stack = error.stack;
            }
            if (stack.indexOf('_wrapObject') === -1) {
              console && console.warn && console.warn(
                'iterable.length has been deprecated, '+
                'use iterable.size or iterable.count(). '+
                'This warning will become a silent error in a future version. ' +
                stack
              );
              return this.size;
            }
          }
        }
      });
    } catch (e) {}
  })();



  mixin(KeyedIterable, {

    // ### More sequential methods

    flip: function() {
      return reify(this, flipFactory(this));
    },

    findKey: function(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry && entry[0];
    },

    findLastKey: function(predicate, context) {
      return this.toSeq().reverse().findKey(predicate, context);
    },

    keyOf: function(searchValue) {
      return this.findKey(function(value ) {return is(value, searchValue)});
    },

    lastKeyOf: function(searchValue) {
      return this.findLastKey(function(value ) {return is(value, searchValue)});
    },

    mapEntries: function(mapper, context) {var this$0 = this;
      var iterations = 0;
      return reify(this,
        this.toSeq().map(
          function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}
        ).fromEntrySeq()
      );
    },

    mapKeys: function(mapper, context) {var this$0 = this;
      return reify(this,
        this.toSeq().flip().map(
          function(k, v)  {return mapper.call(context, k, v, this$0)}
        ).flip()
      );
    }

  });

  var KeyedIterablePrototype = KeyedIterable.prototype;
  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return JSON.stringify(k) + ': ' + quoteString(v)};



  mixin(IndexedIterable, {

    // ### Conversion to other types

    toKeyedSeq: function() {
      return new ToKeyedSequence(this, false);
    },


    // ### ES6 Collection methods (ES6 Array and Map)

    filter: function(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, false));
    },

    findIndex: function(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    indexOf: function(searchValue) {
      var key = this.toKeyedSeq().keyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    lastIndexOf: function(searchValue) {
      var key = this.toKeyedSeq().reverse().keyOf(searchValue);
      return key === undefined ? -1 : key;

      // var index =
      // return this.toSeq().reverse().indexOf(searchValue);
    },

    reverse: function() {
      return reify(this, reverseFactory(this, false));
    },

    slice: function(begin, end) {
      return reify(this, sliceFactory(this, begin, end, false));
    },

    splice: function(index, removeNum /*, ...values*/) {
      var numArgs = arguments.length;
      removeNum = Math.max(removeNum | 0, 0);
      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
        return this;
      }
      // If index is negative, it should resolve relative to the size of the
      // collection. However size may be expensive to compute if not cached, so
      // only call count() if the number is in fact negative.
      index = resolveBegin(index, index < 0 ? this.count() : this.size);
      var spliced = this.slice(0, index);
      return reify(
        this,
        numArgs === 1 ?
          spliced :
          spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
      );
    },


    // ### More collection methods

    findLastIndex: function(predicate, context) {
      var key = this.toKeyedSeq().findLastKey(predicate, context);
      return key === undefined ? -1 : key;
    },

    first: function() {
      return this.get(0);
    },

    flatten: function(depth) {
      return reify(this, flattenFactory(this, depth, false));
    },

    get: function(index, notSetValue) {
      index = wrapIndex(this, index);
      return (index < 0 || (this.size === Infinity ||
          (this.size !== undefined && index > this.size))) ?
        notSetValue :
        this.find(function(_, key)  {return key === index}, undefined, notSetValue);
    },

    has: function(index) {
      index = wrapIndex(this, index);
      return index >= 0 && (this.size !== undefined ?
        this.size === Infinity || index < this.size :
        this.indexOf(index) !== -1
      );
    },

    interpose: function(separator) {
      return reify(this, interposeFactory(this, separator));
    },

    interleave: function(/*...iterables*/) {
      var iterables = [this].concat(arrCopy(arguments));
      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
      var interleaved = zipped.flatten(true);
      if (zipped.size) {
        interleaved.size = zipped.size * iterables.length;
      }
      return reify(this, interleaved);
    },

    last: function() {
      return this.get(-1);
    },

    skipWhile: function(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, false));
    },

    zip: function(/*, ...iterables */) {
      var iterables = [this].concat(arrCopy(arguments));
      return reify(this, zipWithFactory(this, defaultZipper, iterables));
    },

    zipWith: function(zipper/*, ...iterables */) {
      var iterables = arrCopy(arguments);
      iterables[0] = this;
      return reify(this, zipWithFactory(this, zipper, iterables));
    }

  });

  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;



  mixin(SetIterable, {

    // ### ES6 Collection methods (ES6 Array and Map)

    get: function(value, notSetValue) {
      return this.has(value) ? value : notSetValue;
    },

    includes: function(value) {
      return this.has(value);
    },


    // ### More sequential methods

    keySeq: function() {
      return this.valueSeq();
    }

  });

  SetIterable.prototype.has = IterablePrototype.includes;


  // Mixin subclasses

  mixin(KeyedSeq, KeyedIterable.prototype);
  mixin(IndexedSeq, IndexedIterable.prototype);
  mixin(SetSeq, SetIterable.prototype);

  mixin(KeyedCollection, KeyedIterable.prototype);
  mixin(IndexedCollection, IndexedIterable.prototype);
  mixin(SetCollection, SetIterable.prototype);


  // #pragma Helper functions

  function keyMapper(v, k) {
    return k;
  }

  function entryMapper(v, k) {
    return [k, v];
  }

  function not(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    }
  }

  function neg(predicate) {
    return function() {
      return -predicate.apply(this, arguments);
    }
  }

  function quoteString(value) {
    return typeof value === 'string' ? JSON.stringify(value) : value;
  }

  function defaultZipper() {
    return arrCopy(arguments);
  }

  function defaultNegComparator(a, b) {
    return a < b ? 1 : a > b ? -1 : 0;
  }

  function hashIterable(iterable) {
    if (iterable.size === Infinity) {
      return 0;
    }
    var ordered = isOrdered(iterable);
    var keyed = isKeyed(iterable);
    var h = ordered ? 1 : 0;
    var size = iterable.__iterate(
      keyed ?
        ordered ?
          function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :
          function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :
        ordered ?
          function(v ) { h = 31 * h + hash(v) | 0; } :
          function(v ) { h = h + hash(v) | 0; }
    );
    return murmurHashOfSize(size, h);
  }

  function murmurHashOfSize(size, h) {
    h = imul(h, 0xCC9E2D51);
    h = imul(h << 15 | h >>> -15, 0x1B873593);
    h = imul(h << 13 | h >>> -13, 5);
    h = (h + 0xE6546B64 | 0) ^ size;
    h = imul(h ^ h >>> 16, 0x85EBCA6B);
    h = imul(h ^ h >>> 13, 0xC2B2AE35);
    h = smi(h ^ h >>> 16);
    return h;
  }

  function hashMerge(a, b) {
    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
  }

  var Immutable = {

    Iterable: Iterable,

    Seq: Seq,
    Collection: Collection,
    Map: Map,
    OrderedMap: OrderedMap,
    List: List,
    Stack: Stack,
    Set: Set,
    OrderedSet: OrderedSet,

    Record: Record,
    Range: Range,
    Repeat: Repeat,

    is: is,
    fromJS: fromJS

  };

  return Immutable;

}));
});

var OrderedMap = immutable.OrderedMap;


var BlockMapBuilder = {
  createFromArray: function createFromArray(blocks) {
    return OrderedMap(blocks.map(function (block) {
      return [block.getKey(), block];
    }));
  }
};

var BlockMapBuilder_1 = BlockMapBuilder;

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Map$1 = immutable.Map,
    OrderedSet = immutable.OrderedSet,
    Record = immutable.Record;

// Immutable.map is typed such that the value for every key in the map
// must be the same type


var EMPTY_SET = OrderedSet();

var defaultRecord = {
  style: EMPTY_SET,
  entity: null
};

var CharacterMetadataRecord = Record(defaultRecord);

var CharacterMetadata = function (_CharacterMetadataRec) {
  _inherits$1(CharacterMetadata, _CharacterMetadataRec);

  function CharacterMetadata() {
    _classCallCheck$1(this, CharacterMetadata);

    return _possibleConstructorReturn$1(this, _CharacterMetadataRec.apply(this, arguments));
  }

  CharacterMetadata.prototype.getStyle = function getStyle() {
    return this.get('style');
  };

  CharacterMetadata.prototype.getEntity = function getEntity() {
    return this.get('entity');
  };

  CharacterMetadata.prototype.hasStyle = function hasStyle(style) {
    return this.getStyle().includes(style);
  };

  CharacterMetadata.applyStyle = function applyStyle(record, style) {
    var withStyle = record.set('style', record.getStyle().add(style));
    return CharacterMetadata.create(withStyle);
  };

  CharacterMetadata.removeStyle = function removeStyle(record, style) {
    var withoutStyle = record.set('style', record.getStyle().remove(style));
    return CharacterMetadata.create(withoutStyle);
  };

  CharacterMetadata.applyEntity = function applyEntity(record, entityKey) {
    var withEntity = record.getEntity() === entityKey ? record : record.set('entity', entityKey);
    return CharacterMetadata.create(withEntity);
  };

  /**
   * Use this function instead of the `CharacterMetadata` constructor.
   * Since most content generally uses only a very small number of
   * style/entity permutations, we can reuse these objects as often as
   * possible.
   */


  CharacterMetadata.create = function create(config) {
    if (!config) {
      return EMPTY;
    }

    var defaultConfig = {
      style: EMPTY_SET,
      entity: null
    };

    // Fill in unspecified properties, if necessary.
    var configMap = Map$1(defaultConfig).merge(config);

    var existing = pool.get(configMap);
    if (existing) {
      return existing;
    }

    var newCharacter = new CharacterMetadata(configMap);
    pool = pool.set(configMap, newCharacter);
    return newCharacter;
  };

  return CharacterMetadata;
}(CharacterMetadataRecord);

var EMPTY = new CharacterMetadata();
var pool = Map$1([[Map$1(defaultRecord), EMPTY]]);

CharacterMetadata.EMPTY = EMPTY;

var CharacterMetadata_1 = CharacterMetadata;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule findRangesImmutable
 * @format
 * 
 */

/**
 * Search through an array to find contiguous stretches of elements that
 * match a specified filter function.
 *
 * When ranges are found, execute a specified `found` function to supply
 * the values to the caller.
 */
function findRangesImmutable(haystack, areEqualFn, filterFn, foundFn) {
  if (!haystack.size) {
    return;
  }

  var cursor = 0;

  haystack.reduce(function (value, nextValue, nextIndex) {
    if (!areEqualFn(value, nextValue)) {
      if (filterFn(value)) {
        foundFn(cursor, nextIndex);
      }
      cursor = nextIndex;
    }
    return nextValue;
  });

  filterFn(haystack.last()) && foundFn(cursor, haystack.count());
}

var findRangesImmutable_1 = findRangesImmutable;

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var List = immutable.List,
    Map$2 = immutable.Map,
    OrderedSet$1 = immutable.OrderedSet,
    Record$1 = immutable.Record,
    Repeat = immutable.Repeat;


var EMPTY_SET$1 = OrderedSet$1();

var defaultRecord$1 = {
  key: '',
  type: 'unstyled',
  text: '',
  characterList: List(),
  depth: 0,
  data: Map$2()
};

var ContentBlockRecord = Record$1(defaultRecord$1);

var decorateCharacterList = function decorateCharacterList(config) {
  if (!config) {
    return config;
  }

  var characterList = config.characterList,
      text = config.text;


  if (text && !characterList) {
    config.characterList = List(Repeat(CharacterMetadata_1.EMPTY, text.length));
  }

  return config;
};

var ContentBlock = function (_ContentBlockRecord) {
  _inherits$2(ContentBlock, _ContentBlockRecord);

  function ContentBlock(config) {
    _classCallCheck$2(this, ContentBlock);

    return _possibleConstructorReturn$2(this, _ContentBlockRecord.call(this, decorateCharacterList(config)));
  }

  ContentBlock.prototype.getKey = function getKey() {
    return this.get('key');
  };

  ContentBlock.prototype.getType = function getType() {
    return this.get('type');
  };

  ContentBlock.prototype.getText = function getText() {
    return this.get('text');
  };

  ContentBlock.prototype.getCharacterList = function getCharacterList() {
    return this.get('characterList');
  };

  ContentBlock.prototype.getLength = function getLength() {
    return this.getText().length;
  };

  ContentBlock.prototype.getDepth = function getDepth() {
    return this.get('depth');
  };

  ContentBlock.prototype.getData = function getData() {
    return this.get('data');
  };

  ContentBlock.prototype.getInlineStyleAt = function getInlineStyleAt(offset) {
    var character = this.getCharacterList().get(offset);
    return character ? character.getStyle() : EMPTY_SET$1;
  };

  ContentBlock.prototype.getEntityAt = function getEntityAt(offset) {
    var character = this.getCharacterList().get(offset);
    return character ? character.getEntity() : null;
  };

  /**
   * Execute a callback for every contiguous range of styles within the block.
   */


  ContentBlock.prototype.findStyleRanges = function findStyleRanges(filterFn, callback) {
    findRangesImmutable_1(this.getCharacterList(), haveEqualStyle, filterFn, callback);
  };

  /**
   * Execute a callback for every contiguous range of entities within the block.
   */


  ContentBlock.prototype.findEntityRanges = function findEntityRanges(filterFn, callback) {
    findRangesImmutable_1(this.getCharacterList(), haveEqualEntity, filterFn, callback);
  };

  return ContentBlock;
}(ContentBlockRecord);

function haveEqualStyle(charA, charB) {
  return charA.getStyle() === charB.getStyle();
}

function haveEqualEntity(charA, charB) {
  return charA.getEntity() === charB.getEntity();
}

var ContentBlock_1 = ContentBlock;

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$3(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var List$1 = immutable.List,
    Map$3 = immutable.Map,
    OrderedSet$2 = immutable.OrderedSet,
    Record$2 = immutable.Record,
    Repeat$1 = immutable.Repeat;


var EMPTY_SET$2 = OrderedSet$2();

var defaultRecord$2 = {
  parent: null,
  characterList: List$1(),
  data: Map$3(),
  depth: 0,
  key: '',
  text: '',
  type: 'unstyled',
  children: List$1(),
  prevSibling: null,
  nextSibling: null
};

var haveEqualStyle$1 = function haveEqualStyle(charA, charB) {
  return charA.getStyle() === charB.getStyle();
};

var haveEqualEntity$1 = function haveEqualEntity(charA, charB) {
  return charA.getEntity() === charB.getEntity();
};

var decorateCharacterList$1 = function decorateCharacterList(config) {
  if (!config) {
    return config;
  }

  var characterList = config.characterList,
      text = config.text;


  if (text && !characterList) {
    config.characterList = List$1(Repeat$1(CharacterMetadata_1.EMPTY, text.length));
  }

  return config;
};

var ContentBlockNode = function (_Record) {
  _inherits$3(ContentBlockNode, _Record);

  function ContentBlockNode() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultRecord$2;

    _classCallCheck$3(this, ContentBlockNode);

    return _possibleConstructorReturn$3(this, _Record.call(this, decorateCharacterList$1(props)));
  }

  ContentBlockNode.prototype.getKey = function getKey() {
    return this.get('key');
  };

  ContentBlockNode.prototype.getType = function getType() {
    return this.get('type');
  };

  ContentBlockNode.prototype.getText = function getText() {
    return this.get('text');
  };

  ContentBlockNode.prototype.getCharacterList = function getCharacterList() {
    return this.get('characterList');
  };

  ContentBlockNode.prototype.getLength = function getLength() {
    return this.getText().length;
  };

  ContentBlockNode.prototype.getDepth = function getDepth() {
    return this.get('depth');
  };

  ContentBlockNode.prototype.getData = function getData() {
    return this.get('data');
  };

  ContentBlockNode.prototype.getInlineStyleAt = function getInlineStyleAt(offset) {
    var character = this.getCharacterList().get(offset);
    return character ? character.getStyle() : EMPTY_SET$2;
  };

  ContentBlockNode.prototype.getEntityAt = function getEntityAt(offset) {
    var character = this.getCharacterList().get(offset);
    return character ? character.getEntity() : null;
  };

  ContentBlockNode.prototype.getChildKeys = function getChildKeys() {
    return this.get('children');
  };

  ContentBlockNode.prototype.getParentKey = function getParentKey() {
    return this.get('parent');
  };

  ContentBlockNode.prototype.getPrevSiblingKey = function getPrevSiblingKey() {
    return this.get('prevSibling');
  };

  ContentBlockNode.prototype.getNextSiblingKey = function getNextSiblingKey() {
    return this.get('nextSibling');
  };

  ContentBlockNode.prototype.findStyleRanges = function findStyleRanges(filterFn, callback) {
    findRangesImmutable_1(this.getCharacterList(), haveEqualStyle$1, filterFn, callback);
  };

  ContentBlockNode.prototype.findEntityRanges = function findEntityRanges(filterFn, callback) {
    findRangesImmutable_1(this.getCharacterList(), haveEqualEntity$1, filterFn, callback);
  };

  return ContentBlockNode;
}(Record$2(defaultRecord$2));

var ContentBlockNode_1 = ContentBlockNode;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftFeatureFlags-core
 * @format
 * 
 */

var DraftFeatureFlags = {
  draft_killswitch_allow_nontextnodes: false,
  draft_segmented_entities_behavior: false,
  draft_handlebeforeinput_composed_text: false,
  draft_tree_data_support: false
};

var DraftFeatureFlagsCore = DraftFeatureFlags;

var DraftFeatureFlags_1 = DraftFeatureFlagsCore;

var Map$4 = immutable.Map;

var ContentStateInlineStyle = {
  add: function add(contentState, selectionState, inlineStyle) {
    return modifyInlineStyle(contentState, selectionState, inlineStyle, true);
  },

  remove: function remove(contentState, selectionState, inlineStyle) {
    return modifyInlineStyle(contentState, selectionState, inlineStyle, false);
  }
};

function modifyInlineStyle(contentState, selectionState, inlineStyle, addOrRemove) {
  var blockMap = contentState.getBlockMap();
  var startKey = selectionState.getStartKey();
  var startOffset = selectionState.getStartOffset();
  var endKey = selectionState.getEndKey();
  var endOffset = selectionState.getEndOffset();

  var newBlocks = blockMap.skipUntil(function (_, k) {
    return k === startKey;
  }).takeUntil(function (_, k) {
    return k === endKey;
  }).concat(Map$4([[endKey, blockMap.get(endKey)]])).map(function (block, blockKey) {
    var sliceStart;
    var sliceEnd;

    if (startKey === endKey) {
      sliceStart = startOffset;
      sliceEnd = endOffset;
    } else {
      sliceStart = blockKey === startKey ? startOffset : 0;
      sliceEnd = blockKey === endKey ? endOffset : block.getLength();
    }

    var chars = block.getCharacterList();
    var current;
    while (sliceStart < sliceEnd) {
      current = chars.get(sliceStart);
      chars = chars.set(sliceStart, addOrRemove ? CharacterMetadata_1.applyStyle(current, inlineStyle) : CharacterMetadata_1.removeStyle(current, inlineStyle));
      sliceStart++;
    }

    return block.set('characterList', chars);
  });

  return contentState.merge({
    blockMap: blockMap.merge(newBlocks),
    selectionBefore: selectionState,
    selectionAfter: selectionState
  });
}

var ContentStateInlineStyle_1 = ContentStateInlineStyle;

function applyEntityToContentBlock(contentBlock, start, end, entityKey) {
  var characterList = contentBlock.getCharacterList();
  while (start < end) {
    characterList = characterList.set(start, CharacterMetadata_1.applyEntity(characterList.get(start), entityKey));
    start++;
  }
  return contentBlock.set('characterList', characterList);
}

var applyEntityToContentBlock_1 = applyEntityToContentBlock;

function applyEntityToContentState(contentState, selectionState, entityKey) {
  var blockMap = contentState.getBlockMap();
  var startKey = selectionState.getStartKey();
  var startOffset = selectionState.getStartOffset();
  var endKey = selectionState.getEndKey();
  var endOffset = selectionState.getEndOffset();

  var newBlocks = blockMap.skipUntil(function (_, k) {
    return k === startKey;
  }).takeUntil(function (_, k) {
    return k === endKey;
  }).toOrderedMap().merge(immutable.OrderedMap([[endKey, blockMap.get(endKey)]])).map(function (block, blockKey) {
    var sliceStart = blockKey === startKey ? startOffset : 0;
    var sliceEnd = blockKey === endKey ? endOffset : block.getLength();
    return applyEntityToContentBlock_1(block, sliceStart, sliceEnd, entityKey);
  });

  return contentState.merge({
    blockMap: blockMap.merge(newBlocks),
    selectionBefore: selectionState,
    selectionAfter: selectionState
  });
}

var applyEntityToContentState_1 = applyEntityToContentState;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEntitySegments
 * @format
 * 
 */

/**
 * Identify the range to delete from a segmented entity.
 *
 * Rules:
 *
 *  Example: 'John F. Kennedy'
 *
 *   - Deletion from within any non-whitespace (i.e. ['John', 'F.', 'Kennedy'])
 *     will return the range of that text.
 *
 *       'John F. Kennedy' -> 'John F.'
 *                  ^
 *
 *   - Forward deletion of whitespace will remove the following section:
 *
 *       'John F. Kennedy' -> 'John Kennedy'
 *            ^
 *
 *   - Backward deletion of whitespace will remove the previous section:
 *
 *       'John F. Kennedy' -> 'F. Kennedy'
 *            ^
 */
var DraftEntitySegments = {
  getRemovalRange: function getRemovalRange(selectionStart, selectionEnd, text, entityStart, direction) {
    var segments = text.split(' ');
    segments = segments.map(function ( /*string*/segment, /*number*/ii) {
      if (direction === 'forward') {
        if (ii > 0) {
          return ' ' + segment;
        }
      } else if (ii < segments.length - 1) {
        return segment + ' ';
      }
      return segment;
    });

    var segmentStart = entityStart;
    var segmentEnd;
    var segment;
    var removalStart = null;
    var removalEnd = null;

    for (var jj = 0; jj < segments.length; jj++) {
      segment = segments[jj];
      segmentEnd = segmentStart + segment.length;

      // Our selection overlaps this segment.
      if (selectionStart < segmentEnd && segmentStart < selectionEnd) {
        if (removalStart !== null) {
          removalEnd = segmentEnd;
        } else {
          removalStart = segmentStart;
          removalEnd = segmentEnd;
        }
      } else if (removalStart !== null) {
        break;
      }

      segmentStart = segmentEnd;
    }

    var entityEnd = entityStart + text.length;
    var atStart = removalStart === entityStart;
    var atEnd = removalEnd === entityEnd;

    if (!atStart && atEnd || atStart && !atEnd) {
      if (direction === 'forward') {
        if (removalEnd !== entityEnd) {
          removalEnd++;
        }
      } else if (removalStart !== entityStart) {
        removalStart--;
      }
    }

    return {
      start: removalStart,
      end: removalEnd
    };
  }
};

var DraftEntitySegments_1 = DraftEntitySegments;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var invariant_1 = invariant;

/**
 * Obtain the start and end positions of the range that has the
 * specified entity applied to it.
 *
 * Entity keys are applied only to contiguous stretches of text, so this
 * method searches for the first instance of the entity key and returns
 * the subsequent range.
 */
function getRangesForDraftEntity(block, key) {
  var ranges = [];
  block.findEntityRanges(function (c) {
    return c.getEntity() === key;
  }, function (start, end) {
    ranges.push({ start: start, end: end });
  });

  !!!ranges.length ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Entity key not found in this range.') : invariant_1(false) : void 0;

  return ranges;
}

var getRangesForDraftEntity_1 = getRangesForDraftEntity;

/**
 * Given a SelectionState and a removal direction, determine the entire range
 * that should be removed from a ContentState. This is based on any entities
 * within the target, with their `mutability` values taken into account.
 *
 * For instance, if we are attempting to remove part of an "immutable" entity
 * range, the entire entity must be removed. The returned `SelectionState`
 * will be adjusted accordingly.
 */
function getCharacterRemovalRange(entityMap, startBlock, endBlock, selectionState, direction) {
  var start = selectionState.getStartOffset();
  var end = selectionState.getEndOffset();
  var startEntityKey = startBlock.getEntityAt(start);
  var endEntityKey = endBlock.getEntityAt(end - 1);
  if (!startEntityKey && !endEntityKey) {
    return selectionState;
  }
  var newSelectionState = selectionState;
  if (startEntityKey && startEntityKey === endEntityKey) {
    newSelectionState = getEntityRemovalRange(entityMap, startBlock, newSelectionState, direction, startEntityKey, true, true);
  } else if (startEntityKey && endEntityKey) {
    var startSelectionState = getEntityRemovalRange(entityMap, startBlock, newSelectionState, direction, startEntityKey, false, true);
    var endSelectionState = getEntityRemovalRange(entityMap, endBlock, newSelectionState, direction, endEntityKey, false, false);
    newSelectionState = newSelectionState.merge({
      anchorOffset: startSelectionState.getAnchorOffset(),
      focusOffset: endSelectionState.getFocusOffset(),
      isBackward: false
    });
  } else if (startEntityKey) {
    var _startSelectionState = getEntityRemovalRange(entityMap, startBlock, newSelectionState, direction, startEntityKey, false, true);
    newSelectionState = newSelectionState.merge({
      anchorOffset: _startSelectionState.getStartOffset(),
      isBackward: false
    });
  } else if (endEntityKey) {
    var _endSelectionState = getEntityRemovalRange(entityMap, endBlock, newSelectionState, direction, endEntityKey, false, false);
    newSelectionState = newSelectionState.merge({
      focusOffset: _endSelectionState.getEndOffset(),
      isBackward: false
    });
  }
  return newSelectionState;
}

function getEntityRemovalRange(entityMap, block, selectionState, direction, entityKey, isEntireSelectionWithinEntity, isEntityAtStart) {
  var start = selectionState.getStartOffset();
  var end = selectionState.getEndOffset();
  var entity = entityMap.__get(entityKey);
  var mutability = entity.getMutability();
  var sideToConsider = isEntityAtStart ? start : end;

  // `MUTABLE` entities can just have the specified range of text removed
  // directly. No adjustments are needed.
  if (mutability === 'MUTABLE') {
    return selectionState;
  }

  // Find the entity range that overlaps with our removal range.
  var entityRanges = getRangesForDraftEntity_1(block, entityKey).filter(function (range) {
    return sideToConsider <= range.end && sideToConsider >= range.start;
  });

  !(entityRanges.length == 1) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'There should only be one entity range within this removal range.') : invariant_1(false) : void 0;

  var entityRange = entityRanges[0];

  // For `IMMUTABLE` entity types, we will remove the entire entity range.
  if (mutability === 'IMMUTABLE') {
    return selectionState.merge({
      anchorOffset: entityRange.start,
      focusOffset: entityRange.end,
      isBackward: false
    });
  }

  // For `SEGMENTED` entity types, determine the appropriate segment to
  // remove.
  if (!isEntireSelectionWithinEntity) {
    if (isEntityAtStart) {
      end = entityRange.end;
    } else {
      start = entityRange.start;
    }
  }

  var removalRange = DraftEntitySegments_1.getRemovalRange(start, end, block.getText().slice(entityRange.start, entityRange.end), entityRange.start, direction);

  return selectionState.merge({
    anchorOffset: removalRange.start,
    focusOffset: removalRange.end,
    isBackward: false
  });
}

var getCharacterRemovalRange_1 = getCharacterRemovalRange;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule generateRandomKey
 * @format
 * 
 */

var seenKeys = {};
var MULTIPLIER = Math.pow(2, 24);

function generateRandomKey() {
  var key = void 0;
  while (key === undefined || seenKeys.hasOwnProperty(key) || !isNaN(+key)) {
    key = Math.floor(Math.random() * MULTIPLIER).toString(32);
  }
  seenKeys[key] = true;
  return key;
}

var generateRandomKey_1 = generateRandomKey;

var OrderedMap$1 = immutable.OrderedMap;


var randomizeContentBlockNodeKeys = function randomizeContentBlockNodeKeys(blockMap) {
  var newKeysRef = {};

  // we keep track of root blocks in order to update subsequent sibling links
  var lastRootBlock = void 0;

  return OrderedMap$1(blockMap.withMutations(function (blockMapState) {
    blockMapState.forEach(function (block, index) {
      var oldKey = block.getKey();
      var nextKey = block.getNextSiblingKey();
      var prevKey = block.getPrevSiblingKey();
      var childrenKeys = block.getChildKeys();
      var parentKey = block.getParentKey();

      // new key that we will use to build linking
      var key = generateRandomKey_1();

      // we will add it here to re-use it later
      newKeysRef[oldKey] = key;

      if (nextKey) {
        var nextBlock = blockMapState.get(nextKey);
        if (nextBlock) {
          blockMapState.setIn([nextKey, 'prevSibling'], key);
        } else {
          // this can happen when generating random keys for fragments
          blockMapState.setIn([oldKey, 'nextSibling'], null);
        }
      }

      if (prevKey) {
        var prevBlock = blockMapState.get(prevKey);
        if (prevBlock) {
          blockMapState.setIn([prevKey, 'nextSibling'], key);
        } else {
          // this can happen when generating random keys for fragments
          blockMapState.setIn([oldKey, 'prevSibling'], null);
        }
      }

      if (parentKey && blockMapState.get(parentKey)) {
        var parentBlock = blockMapState.get(parentKey);
        var parentChildrenList = parentBlock.getChildKeys();
        blockMapState.setIn([parentKey, 'children'], parentChildrenList.set(parentChildrenList.indexOf(block.getKey()), key));
      } else {
        // blocks will then be treated as root block nodes
        blockMapState.setIn([oldKey, 'parent'], null);

        if (lastRootBlock) {
          blockMapState.setIn([lastRootBlock.getKey(), 'nextSibling'], key);
          blockMapState.setIn([oldKey, 'prevSibling'], newKeysRef[lastRootBlock.getKey()]);
        }

        lastRootBlock = blockMapState.get(oldKey);
      }

      childrenKeys.forEach(function (childKey) {
        var childBlock = blockMapState.get(childKey);
        if (childBlock) {
          blockMapState.setIn([childKey, 'parent'], key);
        } else {
          blockMapState.setIn([oldKey, 'children'], block.getChildKeys().filter(function (child) {
            return child !== childKey;
          }));
        }
      });
    });
  }).toArray().map(function (block) {
    return [newKeysRef[block.getKey()], block.set('key', newKeysRef[block.getKey()])];
  }));
};

var randomizeContentBlockKeys = function randomizeContentBlockKeys(blockMap) {
  return OrderedMap$1(blockMap.toArray().map(function (block) {
    var key = generateRandomKey_1();
    return [key, block.set('key', key)];
  }));
};

var randomizeBlockMapKeys = function randomizeBlockMapKeys(blockMap) {
  var isTreeBasedBlockMap = blockMap.first() instanceof ContentBlockNode_1;

  if (!isTreeBasedBlockMap) {
    return randomizeContentBlockKeys(blockMap);
  }

  return randomizeContentBlockNodeKeys(blockMap);
};

var randomizeBlockMapKeys_1 = randomizeBlockMapKeys;

function removeEntitiesAtEdges(contentState, selectionState) {
  var blockMap = contentState.getBlockMap();
  var entityMap = contentState.getEntityMap();

  var updatedBlocks = {};

  var startKey = selectionState.getStartKey();
  var startOffset = selectionState.getStartOffset();
  var startBlock = blockMap.get(startKey);
  var updatedStart = removeForBlock(entityMap, startBlock, startOffset);

  if (updatedStart !== startBlock) {
    updatedBlocks[startKey] = updatedStart;
  }

  var endKey = selectionState.getEndKey();
  var endOffset = selectionState.getEndOffset();
  var endBlock = blockMap.get(endKey);
  if (startKey === endKey) {
    endBlock = updatedStart;
  }

  var updatedEnd = removeForBlock(entityMap, endBlock, endOffset);

  if (updatedEnd !== endBlock) {
    updatedBlocks[endKey] = updatedEnd;
  }

  if (!Object.keys(updatedBlocks).length) {
    return contentState.set('selectionAfter', selectionState);
  }

  return contentState.merge({
    blockMap: blockMap.merge(updatedBlocks),
    selectionAfter: selectionState
  });
}

function getRemovalRange(characters, key, offset) {
  var removalRange;
  findRangesImmutable_1(characters, function (a, b) {
    return a.getEntity() === b.getEntity();
  }, function (element) {
    return element.getEntity() === key;
  }, function (start, end) {
    if (start <= offset && end >= offset) {
      removalRange = { start: start, end: end };
    }
  });
  !(typeof removalRange === 'object') ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Removal range must exist within character list.') : invariant_1(false) : void 0;
  return removalRange;
}

function removeForBlock(entityMap, block, offset) {
  var chars = block.getCharacterList();
  var charBefore = offset > 0 ? chars.get(offset - 1) : undefined;
  var charAfter = offset < chars.count() ? chars.get(offset) : undefined;
  var entityBeforeCursor = charBefore ? charBefore.getEntity() : undefined;
  var entityAfterCursor = charAfter ? charAfter.getEntity() : undefined;

  if (entityAfterCursor && entityAfterCursor === entityBeforeCursor) {
    var entity = entityMap.__get(entityAfterCursor);
    if (entity.getMutability() !== 'MUTABLE') {
      var _getRemovalRange = getRemovalRange(chars, entityAfterCursor, offset),
          start = _getRemovalRange.start,
          end = _getRemovalRange.end;

      var current;
      while (start < end) {
        current = chars.get(start);
        chars = chars.set(start, CharacterMetadata_1.applyEntity(current, null));
        start++;
      }
      return block.set('characterList', chars);
    }
  }

  return block;
}

var removeEntitiesAtEdges_1 = removeEntitiesAtEdges;

var getContentStateFragment = function getContentStateFragment(contentState, selectionState) {
  var startKey = selectionState.getStartKey();
  var startOffset = selectionState.getStartOffset();
  var endKey = selectionState.getEndKey();
  var endOffset = selectionState.getEndOffset();

  // Edge entities should be stripped to ensure that we don't preserve
  // invalid partial entities when the fragment is reused. We do, however,
  // preserve entities that are entirely within the selection range.
  var contentWithoutEdgeEntities = removeEntitiesAtEdges_1(contentState, selectionState);

  var blockMap = contentWithoutEdgeEntities.getBlockMap();
  var blockKeys = blockMap.keySeq();
  var startIndex = blockKeys.indexOf(startKey);
  var endIndex = blockKeys.indexOf(endKey) + 1;

  return randomizeBlockMapKeys_1(blockMap.slice(startIndex, endIndex).map(function (block, blockKey) {
    var text = block.getText();
    var chars = block.getCharacterList();

    if (startKey === endKey) {
      return block.merge({
        text: text.slice(startOffset, endOffset),
        characterList: chars.slice(startOffset, endOffset)
      });
    }

    if (blockKey === startKey) {
      return block.merge({
        text: text.slice(startOffset),
        characterList: chars.slice(startOffset)
      });
    }

    if (blockKey === endKey) {
      return block.merge({
        text: text.slice(0, endOffset),
        characterList: chars.slice(0, endOffset)
      });
    }

    return block;
  }));
};

var getContentStateFragment_1 = getContentStateFragment;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule insertIntoList
 * @format
 * 
 */

/**
 * Maintain persistence for target list when appending and prepending.
 */
function insertIntoList(targetList, toInsert, offset) {
  if (offset === targetList.count()) {
    toInsert.forEach(function (c) {
      targetList = targetList.push(c);
    });
  } else if (offset === 0) {
    toInsert.reverse().forEach(function (c) {
      targetList = targetList.unshift(c);
    });
  } else {
    var head = targetList.slice(0, offset);
    var tail = targetList.slice(offset);
    targetList = head.concat(toInsert, tail).toList();
  }
  return targetList;
}

var insertIntoList_1 = insertIntoList;

var List$2 = immutable.List;


var updateExistingBlock = function updateExistingBlock(contentState, selectionState, blockMap, fragmentBlock, targetKey, targetOffset) {
  var targetBlock = blockMap.get(targetKey);
  var text = targetBlock.getText();
  var chars = targetBlock.getCharacterList();
  var finalKey = targetKey;
  var finalOffset = targetOffset + fragmentBlock.getText().length;

  var newBlock = targetBlock.merge({
    text: text.slice(0, targetOffset) + fragmentBlock.getText() + text.slice(targetOffset),
    characterList: insertIntoList_1(chars, fragmentBlock.getCharacterList(), targetOffset),
    data: fragmentBlock.getData()
  });

  return contentState.merge({
    blockMap: blockMap.set(targetKey, newBlock),
    selectionBefore: selectionState,
    selectionAfter: selectionState.merge({
      anchorKey: finalKey,
      anchorOffset: finalOffset,
      focusKey: finalKey,
      focusOffset: finalOffset,
      isBackward: false
    })
  });
};

/**
 * Appends text/characterList from the fragment first block to
 * target block.
 */
var updateHead = function updateHead(block, targetOffset, fragment) {
  var text = block.getText();
  var chars = block.getCharacterList();

  // Modify head portion of block.
  var headText = text.slice(0, targetOffset);
  var headCharacters = chars.slice(0, targetOffset);
  var appendToHead = fragment.first();

  return block.merge({
    text: headText + appendToHead.getText(),
    characterList: headCharacters.concat(appendToHead.getCharacterList()),
    type: headText ? block.getType() : appendToHead.getType(),
    data: appendToHead.getData()
  });
};

/**
 * Appends offset text/characterList from the target block to the last
 * fragment block.
 */
var updateTail = function updateTail(block, targetOffset, fragment) {
  // Modify tail portion of block.
  var text = block.getText();
  var chars = block.getCharacterList();

  // Modify head portion of block.
  var blockSize = text.length;
  var tailText = text.slice(targetOffset, blockSize);
  var tailCharacters = chars.slice(targetOffset, blockSize);
  var prependToTail = fragment.last();

  return prependToTail.merge({
    text: prependToTail.getText() + tailText,
    characterList: prependToTail.getCharacterList().concat(tailCharacters),
    data: prependToTail.getData()
  });
};

var getRootBlocks = function getRootBlocks(block, blockMap) {
  var headKey = block.getKey();
  var rootBlock = block;
  var rootBlocks = [];

  // sometimes the fragment head block will not be part of the blockMap itself this can happen when
  // the fragment head is used to update the target block, however when this does not happen we need
  // to make sure that we include it on the rootBlocks since the first block of a fragment is always a
  // fragment root block
  if (blockMap.get(headKey)) {
    rootBlocks.push(headKey);
  }

  while (rootBlock && rootBlock.getNextSiblingKey()) {
    var lastSiblingKey = rootBlock.getNextSiblingKey();

    if (!lastSiblingKey) {
      break;
    }

    rootBlocks.push(lastSiblingKey);
    rootBlock = blockMap.get(lastSiblingKey);
  }

  return rootBlocks;
};

var updateBlockMapLinks = function updateBlockMapLinks(blockMap, originalBlockMap, targetBlock, fragmentHeadBlock) {
  return blockMap.withMutations(function (blockMapState) {
    var targetKey = targetBlock.getKey();
    var headKey = fragmentHeadBlock.getKey();
    var targetNextKey = targetBlock.getNextSiblingKey();
    var targetParentKey = targetBlock.getParentKey();
    var fragmentRootBlocks = getRootBlocks(fragmentHeadBlock, blockMap);
    var lastRootFragmentBlockKey = fragmentRootBlocks[fragmentRootBlocks.length - 1];

    if (blockMapState.get(headKey)) {
      // update the fragment head when it is part of the blockMap otherwise
      blockMapState.setIn([targetKey, 'nextSibling'], headKey);
      blockMapState.setIn([headKey, 'prevSibling'], targetKey);
    } else {
      // update the target block that had the fragment head contents merged into it
      blockMapState.setIn([targetKey, 'nextSibling'], fragmentHeadBlock.getNextSiblingKey());
      blockMapState.setIn([fragmentHeadBlock.getNextSiblingKey(), 'prevSibling'], targetKey);
    }

    // update the last root block fragment
    blockMapState.setIn([lastRootFragmentBlockKey, 'nextSibling'], targetNextKey);

    // update the original target next block
    if (targetNextKey) {
      blockMapState.setIn([targetNextKey, 'prevSibling'], lastRootFragmentBlockKey);
    }

    // update fragment parent links
    fragmentRootBlocks.forEach(function (blockKey) {
      return blockMapState.setIn([blockKey, 'parent'], targetParentKey);
    });

    // update targetBlock parent child links
    if (targetParentKey) {
      var targetParent = blockMap.get(targetParentKey);
      var originalTargetParentChildKeys = targetParent.getChildKeys();

      var targetBlockIndex = originalTargetParentChildKeys.indexOf(targetKey);
      var insertionIndex = targetBlockIndex + 1;

      var newChildrenKeysArray = originalTargetParentChildKeys.toArray();

      // insert fragment children
      newChildrenKeysArray.splice.apply(newChildrenKeysArray, [insertionIndex, 0].concat(fragmentRootBlocks));

      blockMapState.setIn([targetParentKey, 'children'], List$2(newChildrenKeysArray));
    }
  });
};

var insertFragment = function insertFragment(contentState, selectionState, blockMap, fragment, targetKey, targetOffset) {
  var isTreeBasedBlockMap = blockMap.first() instanceof ContentBlockNode_1;
  var newBlockArr = [];
  var fragmentSize = fragment.size;
  var target = blockMap.get(targetKey);
  var head = fragment.first();
  var tail = fragment.last();
  var finalOffset = tail.getLength();
  var finalKey = tail.getKey();
  var shouldNotUpdateFromFragmentBlock = isTreeBasedBlockMap && (!target.getChildKeys().isEmpty() || !head.getChildKeys().isEmpty());

  blockMap.forEach(function (block, blockKey) {
    if (blockKey !== targetKey) {
      newBlockArr.push(block);
      return;
    }

    if (shouldNotUpdateFromFragmentBlock) {
      newBlockArr.push(block);
    } else {
      newBlockArr.push(updateHead(block, targetOffset, fragment));
    }

    // Insert fragment blocks after the head and before the tail.
    fragment
    // when we are updating the target block with the head fragment block we skip the first fragment
    // head since its contents have already been merged with the target block otherwise we include
    // the whole fragment
    .slice(shouldNotUpdateFromFragmentBlock ? 0 : 1, fragmentSize - 1).forEach(function (fragmentBlock) {
      return newBlockArr.push(fragmentBlock);
    });

    // update tail
    newBlockArr.push(updateTail(block, targetOffset, fragment));
  });

  var updatedBlockMap = BlockMapBuilder_1.createFromArray(newBlockArr);

  if (isTreeBasedBlockMap) {
    updatedBlockMap = updateBlockMapLinks(updatedBlockMap, blockMap, target, head);
  }

  return contentState.merge({
    blockMap: updatedBlockMap,
    selectionBefore: selectionState,
    selectionAfter: selectionState.merge({
      anchorKey: finalKey,
      anchorOffset: finalOffset,
      focusKey: finalKey,
      focusOffset: finalOffset,
      isBackward: false
    })
  });
};

var insertFragmentIntoContentState = function insertFragmentIntoContentState(contentState, selectionState, fragmentBlockMap) {
  !selectionState.isCollapsed() ? process.env.NODE_ENV !== 'production' ? invariant_1(false, '`insertFragment` should only be called with a collapsed selection state.') : invariant_1(false) : void 0;

  var blockMap = contentState.getBlockMap();
  var fragment = randomizeBlockMapKeys_1(fragmentBlockMap);
  var targetKey = selectionState.getStartKey();
  var targetOffset = selectionState.getStartOffset();

  var targetBlock = blockMap.get(targetKey);

  if (targetBlock instanceof ContentBlockNode_1) {
    !targetBlock.getChildKeys().isEmpty() ? process.env.NODE_ENV !== 'production' ? invariant_1(false, '`insertFragment` should not be called when a container node is selected.') : invariant_1(false) : void 0;
  }

  // When we insert a fragment with a single block we simply update the target block
  // with the contents of the inserted fragment block
  if (fragment.size === 1) {
    return updateExistingBlock(contentState, selectionState, blockMap, fragment.first(), targetKey, targetOffset);
  }

  return insertFragment(contentState, selectionState, blockMap, fragment, targetKey, targetOffset);
};

var insertFragmentIntoContentState_1 = insertFragmentIntoContentState;

var Repeat$2 = immutable.Repeat;


function insertTextIntoContentState(contentState, selectionState, text, characterMetadata) {
  !selectionState.isCollapsed() ? process.env.NODE_ENV !== 'production' ? invariant_1(false, '`insertText` should only be called with a collapsed range.') : invariant_1(false) : void 0;

  var len = text.length;
  if (!len) {
    return contentState;
  }

  var blockMap = contentState.getBlockMap();
  var key = selectionState.getStartKey();
  var offset = selectionState.getStartOffset();
  var block = blockMap.get(key);
  var blockText = block.getText();

  var newBlock = block.merge({
    text: blockText.slice(0, offset) + text + blockText.slice(offset, block.getLength()),
    characterList: insertIntoList_1(block.getCharacterList(), Repeat$2(characterMetadata, len).toList(), offset)
  });

  var newOffset = offset + len;

  return contentState.merge({
    blockMap: blockMap.set(key, newBlock),
    selectionAfter: selectionState.merge({
      anchorOffset: newOffset,
      focusOffset: newOffset
    })
  });
}

var insertTextIntoContentState_1 = insertTextIntoContentState;

var Map$5 = immutable.Map;


function modifyBlockForContentState(contentState, selectionState, operation) {
  var startKey = selectionState.getStartKey();
  var endKey = selectionState.getEndKey();
  var blockMap = contentState.getBlockMap();
  var newBlocks = blockMap.toSeq().skipUntil(function (_, k) {
    return k === startKey;
  }).takeUntil(function (_, k) {
    return k === endKey;
  }).concat(Map$5([[endKey, blockMap.get(endKey)]])).map(operation);

  return contentState.merge({
    blockMap: blockMap.merge(newBlocks),
    selectionBefore: selectionState,
    selectionAfter: selectionState
  });
}

var modifyBlockForContentState_1 = modifyBlockForContentState;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getNextDelimiterBlockKey
 * @format
 * 
 *
 * This is unstable and not part of the public API and should not be used by
 * production systems. This file may be update/removed without notice.
 */



var getNextDelimiterBlockKey = function getNextDelimiterBlockKey(block, blockMap) {
  var isExperimentalTreeBlock = block instanceof ContentBlockNode_1;

  if (!isExperimentalTreeBlock) {
    return null;
  }

  var nextSiblingKey = block.getNextSiblingKey();

  if (nextSiblingKey) {
    return nextSiblingKey;
  }

  var parent = block.getParentKey();

  if (!parent) {
    return null;
  }

  var nextNonDescendantBlock = blockMap.get(parent);
  while (nextNonDescendantBlock && !nextNonDescendantBlock.getNextSiblingKey()) {
    var parentKey = nextNonDescendantBlock.getParentKey();
    nextNonDescendantBlock = parentKey ? blockMap.get(parentKey) : null;
  }

  if (!nextNonDescendantBlock) {
    return null;
  }

  return nextNonDescendantBlock.getNextSiblingKey();
};

var getNextDelimiterBlockKey_1 = getNextDelimiterBlockKey;

var List$3 = immutable.List,
    Map$6 = immutable.Map;


var transformBlock = function transformBlock(key, blockMap, func) {
  if (!key) {
    return;
  }

  var block = blockMap.get(key);

  if (!block) {
    return;
  }

  blockMap.set(key, func(block));
};

/**
 * Ancestors needs to be preserved when there are non selected
 * children to make sure we do not leave any orphans behind
 */
var getAncestorsKeys = function getAncestorsKeys(blockKey, blockMap) {
  var parents = [];

  if (!blockKey) {
    return parents;
  }

  var blockNode = blockMap.get(blockKey);
  while (blockNode && blockNode.getParentKey()) {
    var parentKey = blockNode.getParentKey();
    if (parentKey) {
      parents.push(parentKey);
    }
    blockNode = parentKey ? blockMap.get(parentKey) : null;
  }

  return parents;
};

/**
 * Get all next delimiter keys until we hit a root delimiter and return
 * an array of key references
 */
var getNextDelimitersBlockKeys = function getNextDelimitersBlockKeys(block, blockMap) {
  var nextDelimiters = [];

  if (!block) {
    return nextDelimiters;
  }

  var nextDelimiter = getNextDelimiterBlockKey_1(block, blockMap);
  while (nextDelimiter && blockMap.get(nextDelimiter)) {
    var _block = blockMap.get(nextDelimiter);
    nextDelimiters.push(nextDelimiter);

    // we do not need to keep checking all root node siblings, just the first occurance
    nextDelimiter = _block.getParentKey() ? getNextDelimiterBlockKey_1(_block, blockMap) : null;
  }

  return nextDelimiters;
};

var getNextValidSibling = function getNextValidSibling(block, blockMap, originalBlockMap) {
  if (!block) {
    return null;
  }

  // note that we need to make sure we refer to the original block since this
  // function is called within a withMutations
  var nextValidSiblingKey = originalBlockMap.get(block.getKey()).getNextSiblingKey();

  while (nextValidSiblingKey && !blockMap.get(nextValidSiblingKey)) {
    nextValidSiblingKey = originalBlockMap.get(nextValidSiblingKey).getNextSiblingKey() || null;
  }

  return nextValidSiblingKey;
};

var getPrevValidSibling = function getPrevValidSibling(block, blockMap, originalBlockMap) {
  if (!block) {
    return null;
  }

  // note that we need to make sure we refer to the original block since this
  // function is called within a withMutations
  var prevValidSiblingKey = originalBlockMap.get(block.getKey()).getPrevSiblingKey();

  while (prevValidSiblingKey && !blockMap.get(prevValidSiblingKey)) {
    prevValidSiblingKey = originalBlockMap.get(prevValidSiblingKey).getPrevSiblingKey() || null;
  }

  return prevValidSiblingKey;
};

var updateBlockMapLinks$1 = function updateBlockMapLinks(blockMap, startBlock, endBlock, originalBlockMap) {
  return blockMap.withMutations(function (blocks) {
    // update start block if its retained
    transformBlock(startBlock.getKey(), blocks, function (block) {
      return block.merge({
        nextSibling: getNextValidSibling(startBlock, blocks, originalBlockMap),
        prevSibling: getPrevValidSibling(startBlock, blocks, originalBlockMap)
      });
    });

    // update endblock if its retained
    transformBlock(endBlock.getKey(), blocks, function (block) {
      return block.merge({
        nextSibling: getNextValidSibling(endBlock, blocks, originalBlockMap),
        prevSibling: getPrevValidSibling(endBlock, blocks, originalBlockMap)
      });
    });

    // update start block parent ancestors
    getAncestorsKeys(startBlock.getKey(), originalBlockMap).forEach(function (parentKey) {
      return transformBlock(parentKey, blocks, function (block) {
        return block.merge({
          children: block.getChildKeys().filter(function (key) {
            return blocks.get(key);
          }),
          nextSibling: getNextValidSibling(block, blocks, originalBlockMap),
          prevSibling: getPrevValidSibling(block, blocks, originalBlockMap)
        });
      });
    });

    // update start block next - can only happen if startBlock == endBlock
    transformBlock(startBlock.getNextSiblingKey(), blocks, function (block) {
      return block.merge({
        prevSibling: startBlock.getPrevSiblingKey()
      });
    });

    // update start block prev
    transformBlock(startBlock.getPrevSiblingKey(), blocks, function (block) {
      return block.merge({
        nextSibling: getNextValidSibling(startBlock, blocks, originalBlockMap)
      });
    });

    // update end block next
    transformBlock(endBlock.getNextSiblingKey(), blocks, function (block) {
      return block.merge({
        prevSibling: getPrevValidSibling(endBlock, blocks, originalBlockMap)
      });
    });

    // update end block prev
    transformBlock(endBlock.getPrevSiblingKey(), blocks, function (block) {
      return block.merge({
        nextSibling: endBlock.getNextSiblingKey()
      });
    });

    // update end block parent ancestors
    getAncestorsKeys(endBlock.getKey(), originalBlockMap).forEach(function (parentKey) {
      transformBlock(parentKey, blocks, function (block) {
        return block.merge({
          children: block.getChildKeys().filter(function (key) {
            return blocks.get(key);
          }),
          nextSibling: getNextValidSibling(block, blocks, originalBlockMap),
          prevSibling: getPrevValidSibling(block, blocks, originalBlockMap)
        });
      });
    });

    // update next delimiters all the way to a root delimiter
    getNextDelimitersBlockKeys(endBlock, originalBlockMap).forEach(function (delimiterKey) {
      return transformBlock(delimiterKey, blocks, function (block) {
        return block.merge({
          nextSibling: getNextValidSibling(block, blocks, originalBlockMap),
          prevSibling: getPrevValidSibling(block, blocks, originalBlockMap)
        });
      });
    });
  });
};

var removeRangeFromContentState = function removeRangeFromContentState(contentState, selectionState) {
  if (selectionState.isCollapsed()) {
    return contentState;
  }

  var blockMap = contentState.getBlockMap();
  var startKey = selectionState.getStartKey();
  var startOffset = selectionState.getStartOffset();
  var endKey = selectionState.getEndKey();
  var endOffset = selectionState.getEndOffset();

  var startBlock = blockMap.get(startKey);
  var endBlock = blockMap.get(endKey);

  // we assume that ContentBlockNode and ContentBlocks are not mixed together
  var isExperimentalTreeBlock = startBlock instanceof ContentBlockNode_1;

  // used to retain blocks that should not be deleted to avoid orphan children
  var parentAncestors = [];

  if (isExperimentalTreeBlock) {
    var endBlockchildrenKeys = endBlock.getChildKeys();
    var endBlockAncestors = getAncestorsKeys(endKey, blockMap);

    // endBlock has unselected sibblings so we can not remove its ancestors parents
    if (endBlock.getNextSiblingKey()) {
      parentAncestors = parentAncestors.concat(endBlockAncestors);
    }

    // endBlock has children so can not remove this block or any of its ancestors
    if (!endBlockchildrenKeys.isEmpty()) {
      parentAncestors = parentAncestors.concat(endBlockAncestors.concat([endKey]));
    }

    // we need to retain all ancestors of the next delimiter block
    parentAncestors = parentAncestors.concat(getAncestorsKeys(getNextDelimiterBlockKey_1(endBlock, blockMap), blockMap));
  }

  var characterList = void 0;

  if (startBlock === endBlock) {
    characterList = removeFromList(startBlock.getCharacterList(), startOffset, endOffset);
  } else {
    characterList = startBlock.getCharacterList().slice(0, startOffset).concat(endBlock.getCharacterList().slice(endOffset));
  }

  var modifiedStart = startBlock.merge({
    text: startBlock.getText().slice(0, startOffset) + endBlock.getText().slice(endOffset),
    characterList: characterList
  });

  var newBlocks = blockMap.toSeq().skipUntil(function (_, k) {
    return k === startKey;
  }).takeUntil(function (_, k) {
    return k === endKey;
  }).filter(function (_, k) {
    return parentAncestors.indexOf(k) === -1;
  }).concat(Map$6([[endKey, null]])).map(function (_, k) {
    return k === startKey ? modifiedStart : null;
  });

  var updatedBlockMap = blockMap.merge(newBlocks).filter(function (block) {
    return !!block;
  });

  if (isExperimentalTreeBlock) {
    updatedBlockMap = updateBlockMapLinks$1(updatedBlockMap, startBlock, endBlock, blockMap);
  }

  return contentState.merge({
    blockMap: updatedBlockMap,
    selectionBefore: selectionState,
    selectionAfter: selectionState.merge({
      anchorKey: startKey,
      anchorOffset: startOffset,
      focusKey: startKey,
      focusOffset: startOffset,
      isBackward: false
    })
  });
};

/**
 * Maintain persistence for target list when removing characters on the
 * head and tail of the character list.
 */
var removeFromList = function removeFromList(targetList, startOffset, endOffset) {
  if (startOffset === 0) {
    while (startOffset < endOffset) {
      targetList = targetList.shift();
      startOffset++;
    }
  } else if (endOffset === targetList.count()) {
    while (endOffset > startOffset) {
      targetList = targetList.pop();
      endOffset--;
    }
  } else {
    var head = targetList.slice(0, startOffset);
    var tail = targetList.slice(endOffset);
    targetList = head.concat(tail).toList();
  }
  return targetList;
};

var removeRangeFromContentState_1 = removeRangeFromContentState;

var List$4 = immutable.List,
    Map$7 = immutable.Map;


var transformBlock$1 = function transformBlock(key, blockMap, func) {
  if (!key) {
    return;
  }

  var block = blockMap.get(key);

  if (!block) {
    return;
  }

  blockMap.set(key, func(block));
};

var updateBlockMapLinks$2 = function updateBlockMapLinks(blockMap, originalBlock, belowBlock) {
  return blockMap.withMutations(function (blocks) {
    var originalBlockKey = originalBlock.getKey();
    var belowBlockKey = belowBlock.getKey();

    // update block parent
    transformBlock$1(originalBlock.getParentKey(), blocks, function (block) {
      var parentChildrenList = block.getChildKeys();
      var insertionIndex = parentChildrenList.indexOf(originalBlockKey) + 1;
      var newChildrenArray = parentChildrenList.toArray();

      newChildrenArray.splice(insertionIndex, 0, belowBlockKey);

      return block.merge({
        children: List$4(newChildrenArray)
      });
    });

    // update original next block
    transformBlock$1(originalBlock.getNextSiblingKey(), blocks, function (block) {
      return block.merge({
        prevSibling: belowBlockKey
      });
    });

    // update original block
    transformBlock$1(originalBlockKey, blocks, function (block) {
      return block.merge({
        nextSibling: belowBlockKey
      });
    });

    // update below block
    transformBlock$1(belowBlockKey, blocks, function (block) {
      return block.merge({
        prevSibling: originalBlockKey
      });
    });
  });
};

var splitBlockInContentState = function splitBlockInContentState(contentState, selectionState) {
  !selectionState.isCollapsed() ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Selection range must be collapsed.') : invariant_1(false) : void 0;

  var key = selectionState.getAnchorKey();
  var offset = selectionState.getAnchorOffset();
  var blockMap = contentState.getBlockMap();
  var blockToSplit = blockMap.get(key);
  var text = blockToSplit.getText();
  var chars = blockToSplit.getCharacterList();
  var keyBelow = generateRandomKey_1();
  var isExperimentalTreeBlock = blockToSplit instanceof ContentBlockNode_1;

  var blockAbove = blockToSplit.merge({
    text: text.slice(0, offset),
    characterList: chars.slice(0, offset)
  });
  var blockBelow = blockAbove.merge({
    key: keyBelow,
    text: text.slice(offset),
    characterList: chars.slice(offset),
    data: Map$7()
  });

  var blocksBefore = blockMap.toSeq().takeUntil(function (v) {
    return v === blockToSplit;
  });
  var blocksAfter = blockMap.toSeq().skipUntil(function (v) {
    return v === blockToSplit;
  }).rest();
  var newBlocks = blocksBefore.concat([[key, blockAbove], [keyBelow, blockBelow]], blocksAfter).toOrderedMap();

  if (isExperimentalTreeBlock) {
    !blockToSplit.getChildKeys().isEmpty() ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'ContentBlockNode must not have children') : invariant_1(false) : void 0;

    newBlocks = updateBlockMapLinks$2(newBlocks, blockAbove, blockBelow);
  }

  return contentState.merge({
    blockMap: newBlocks,
    selectionBefore: selectionState,
    selectionAfter: selectionState.merge({
      anchorKey: keyBelow,
      anchorOffset: 0,
      focusKey: keyBelow,
      focusOffset: 0,
      isBackward: false
    })
  });
};

var splitBlockInContentState_1 = splitBlockInContentState;

var OrderedSet$3 = immutable.OrderedSet;

/**
 * `DraftModifier` provides a set of convenience methods that apply
 * modifications to a `ContentState` object based on a target `SelectionState`.
 *
 * Any change to a `ContentState` should be decomposable into a series of
 * transaction functions that apply the required changes and return output
 * `ContentState` objects.
 *
 * These functions encapsulate some of the most common transaction sequences.
 */

var DraftModifier = {
  replaceText: function replaceText(contentState, rangeToReplace, text, inlineStyle, entityKey) {
    var withoutEntities = removeEntitiesAtEdges_1(contentState, rangeToReplace);
    var withoutText = removeRangeFromContentState_1(withoutEntities, rangeToReplace);

    var character = CharacterMetadata_1.create({
      style: inlineStyle || OrderedSet$3(),
      entity: entityKey || null
    });

    return insertTextIntoContentState_1(withoutText, withoutText.getSelectionAfter(), text, character);
  },

  insertText: function insertText(contentState, targetRange, text, inlineStyle, entityKey) {
    !targetRange.isCollapsed() ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Target range must be collapsed for `insertText`.') : invariant_1(false) : void 0;
    return DraftModifier.replaceText(contentState, targetRange, text, inlineStyle, entityKey);
  },

  moveText: function moveText(contentState, removalRange, targetRange) {
    var movedFragment = getContentStateFragment_1(contentState, removalRange);

    var afterRemoval = DraftModifier.removeRange(contentState, removalRange, 'backward');

    return DraftModifier.replaceWithFragment(afterRemoval, targetRange, movedFragment);
  },

  replaceWithFragment: function replaceWithFragment(contentState, targetRange, fragment) {
    var withoutEntities = removeEntitiesAtEdges_1(contentState, targetRange);
    var withoutText = removeRangeFromContentState_1(withoutEntities, targetRange);

    return insertFragmentIntoContentState_1(withoutText, withoutText.getSelectionAfter(), fragment);
  },

  removeRange: function removeRange(contentState, rangeToRemove, removalDirection) {
    var startKey = void 0,
        endKey = void 0,
        startBlock = void 0,
        endBlock = void 0;
    if (rangeToRemove.getIsBackward()) {
      rangeToRemove = rangeToRemove.merge({
        anchorKey: rangeToRemove.getFocusKey(),
        anchorOffset: rangeToRemove.getFocusOffset(),
        focusKey: rangeToRemove.getAnchorKey(),
        focusOffset: rangeToRemove.getAnchorOffset(),
        isBackward: false
      });
    }
    startKey = rangeToRemove.getAnchorKey();
    endKey = rangeToRemove.getFocusKey();
    startBlock = contentState.getBlockForKey(startKey);
    endBlock = contentState.getBlockForKey(endKey);
    var startOffset = rangeToRemove.getStartOffset();
    var endOffset = rangeToRemove.getEndOffset();

    var startEntityKey = startBlock.getEntityAt(startOffset);
    var endEntityKey = endBlock.getEntityAt(endOffset - 1);

    // Check whether the selection state overlaps with a single entity.
    // If so, try to remove the appropriate substring of the entity text.
    if (startKey === endKey) {
      if (startEntityKey && startEntityKey === endEntityKey) {
        var _adjustedRemovalRange = getCharacterRemovalRange_1(contentState.getEntityMap(), startBlock, endBlock, rangeToRemove, removalDirection);
        return removeRangeFromContentState_1(contentState, _adjustedRemovalRange);
      }
    }
    var adjustedRemovalRange = rangeToRemove;
    if (DraftFeatureFlags_1.draft_segmented_entities_behavior) {
      // Adjust the selection to properly delete segemented and immutable
      // entities
      adjustedRemovalRange = getCharacterRemovalRange_1(contentState.getEntityMap(), startBlock, endBlock, rangeToRemove, removalDirection);
    }

    var withoutEntities = removeEntitiesAtEdges_1(contentState, adjustedRemovalRange);
    return removeRangeFromContentState_1(withoutEntities, adjustedRemovalRange);
  },

  splitBlock: function splitBlock(contentState, selectionState) {
    var withoutEntities = removeEntitiesAtEdges_1(contentState, selectionState);
    var withoutText = removeRangeFromContentState_1(withoutEntities, selectionState);

    return splitBlockInContentState_1(withoutText, withoutText.getSelectionAfter());
  },

  applyInlineStyle: function applyInlineStyle(contentState, selectionState, inlineStyle) {
    return ContentStateInlineStyle_1.add(contentState, selectionState, inlineStyle);
  },

  removeInlineStyle: function removeInlineStyle(contentState, selectionState, inlineStyle) {
    return ContentStateInlineStyle_1.remove(contentState, selectionState, inlineStyle);
  },

  setBlockType: function setBlockType(contentState, selectionState, blockType) {
    return modifyBlockForContentState_1(contentState, selectionState, function (block) {
      return block.merge({ type: blockType, depth: 0 });
    });
  },

  setBlockData: function setBlockData(contentState, selectionState, blockData) {
    return modifyBlockForContentState_1(contentState, selectionState, function (block) {
      return block.merge({ data: blockData });
    });
  },

  mergeBlockData: function mergeBlockData(contentState, selectionState, blockData) {
    return modifyBlockForContentState_1(contentState, selectionState, function (block) {
      return block.merge({ data: block.getData().merge(blockData) });
    });
  },

  applyEntity: function applyEntity(contentState, selectionState, entityKey) {
    var withoutEntities = removeEntitiesAtEdges_1(contentState, selectionState);
    return applyEntityToContentState_1(withoutEntities, selectionState, entityKey);
  }
};

var DraftModifier_1 = DraftModifier;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction;

var List$5 = immutable.List,
    Repeat$3 = immutable.Repeat,
    Record$3 = immutable.Record;


var returnTrue = emptyFunction_1.thatReturnsTrue;

var FINGERPRINT_DELIMITER = '-';

var defaultLeafRange = {
  start: null,
  end: null
};

var LeafRange = Record$3(defaultLeafRange);

var defaultDecoratorRange = {
  start: null,
  end: null,
  decoratorKey: null,
  leaves: null
};

var DecoratorRange = Record$3(defaultDecoratorRange);

var BlockTree = {
  /**
   * Generate a block tree for a given ContentBlock/decorator pair.
   */
  generate: function generate(contentState, block, decorator) {
    var textLength = block.getLength();
    if (!textLength) {
      return List$5.of(new DecoratorRange({
        start: 0,
        end: 0,
        decoratorKey: null,
        leaves: List$5.of(new LeafRange({ start: 0, end: 0 }))
      }));
    }

    var leafSets = [];
    var decorations = decorator ? decorator.getDecorations(block, contentState) : List$5(Repeat$3(null, textLength));

    var chars = block.getCharacterList();

    findRangesImmutable_1(decorations, areEqual, returnTrue, function (start, end) {
      leafSets.push(new DecoratorRange({
        start: start,
        end: end,
        decoratorKey: decorations.get(start),
        leaves: generateLeaves(chars.slice(start, end).toList(), start)
      }));
    });

    return List$5(leafSets);
  },

  /**
   * Create a string representation of the given tree map. This allows us
   * to rapidly determine whether a tree has undergone a significant
   * structural change.
   */
  getFingerprint: function getFingerprint(tree) {
    return tree.map(function (leafSet) {
      var decoratorKey = leafSet.get('decoratorKey');
      var fingerprintString = decoratorKey !== null ? decoratorKey + '.' + (leafSet.get('end') - leafSet.get('start')) : '';
      return '' + fingerprintString + '.' + leafSet.get('leaves').size;
    }).join(FINGERPRINT_DELIMITER);
  }
};

/**
 * Generate LeafRange records for a given character list.
 */
function generateLeaves(characters, offset) {
  var leaves = [];
  var inlineStyles = characters.map(function (c) {
    return c.getStyle();
  }).toList();
  findRangesImmutable_1(inlineStyles, areEqual, returnTrue, function (start, end) {
    leaves.push(new LeafRange({
      start: start + offset,
      end: end + offset
    }));
  });
  return List$5(leaves);
}

function areEqual(a, b) {
  return a === b;
}

var BlockTree_1 = BlockTree;

function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$4(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Record$4 = immutable.Record;


var DraftEntityInstanceRecord = Record$4({
  type: 'TOKEN',
  mutability: 'IMMUTABLE',
  data: Object
});

/**
 * An instance of a document entity, consisting of a `type` and relevant
 * `data`, metadata about the entity.
 *
 * For instance, a "link" entity might provide a URI, and a "mention"
 * entity might provide the mentioned user's ID. These pieces of data
 * may be used when rendering the entity as part of a ContentBlock DOM
 * representation. For a link, the data would be used as an href for
 * the rendered anchor. For a mention, the ID could be used to retrieve
 * a hovercard.
 */

var DraftEntityInstance = function (_DraftEntityInstanceR) {
  _inherits$4(DraftEntityInstance, _DraftEntityInstanceR);

  function DraftEntityInstance() {
    _classCallCheck$4(this, DraftEntityInstance);

    return _possibleConstructorReturn$4(this, _DraftEntityInstanceR.apply(this, arguments));
  }

  DraftEntityInstance.prototype.getType = function getType() {
    return this.get('type');
  };

  DraftEntityInstance.prototype.getMutability = function getMutability() {
    return this.get('mutability');
  };

  DraftEntityInstance.prototype.getData = function getData() {
    return this.get('data');
  };

  return DraftEntityInstance;
}(DraftEntityInstanceRecord);

var DraftEntityInstance_1 = DraftEntityInstance;

var _extends$1 = objectAssign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEntity
 * @format
 * 
 */






var Map$8 = immutable.Map;


var instances = Map$8();
var instanceKey = 0;

/**
 * Temporary utility for generating the warnings
 */
function logWarning(oldMethodCall, newMethodCall) {
  console.warn('WARNING: ' + oldMethodCall + ' will be deprecated soon!\nPlease use "' + newMethodCall + '" instead.');
}

/**
 * A "document entity" is an object containing metadata associated with a
 * piece of text in a ContentBlock.
 *
 * For example, a `link` entity might include a `uri` property. When a
 * ContentBlock is rendered in the browser, text that refers to that link
 * entity may be rendered as an anchor, with the `uri` as the href value.
 *
 * In a ContentBlock, every position in the text may correspond to zero
 * or one entities. This correspondence is tracked using a key string,
 * generated via DraftEntity.create() and used to obtain entity metadata
 * via DraftEntity.get().
 */
var DraftEntity = {
  /**
   * WARNING: This method will be deprecated soon!
   * Please use 'contentState.getLastCreatedEntityKey' instead.
   * ---
   * Get the random key string from whatever entity was last created.
   * We need this to support the new API, as part of transitioning to put Entity
   * storage in contentState.
   */
  getLastCreatedEntityKey: function getLastCreatedEntityKey() {
    logWarning('DraftEntity.getLastCreatedEntityKey', 'contentState.getLastCreatedEntityKey');
    return DraftEntity.__getLastCreatedEntityKey();
  },

  /**
   * WARNING: This method will be deprecated soon!
   * Please use 'contentState.createEntity' instead.
   * ---
   * Create a DraftEntityInstance and store it for later retrieval.
   *
   * A random key string will be generated and returned. This key may
   * be used to track the entity's usage in a ContentBlock, and for
   * retrieving data about the entity at render time.
   */
  create: function create(type, mutability, data) {
    logWarning('DraftEntity.create', 'contentState.createEntity');
    return DraftEntity.__create(type, mutability, data);
  },

  /**
   * WARNING: This method will be deprecated soon!
   * Please use 'contentState.addEntity' instead.
   * ---
   * Add an existing DraftEntityInstance to the DraftEntity map. This is
   * useful when restoring instances from the server.
   */
  add: function add(instance) {
    logWarning('DraftEntity.add', 'contentState.addEntity');
    return DraftEntity.__add(instance);
  },

  /**
   * WARNING: This method will be deprecated soon!
   * Please use 'contentState.getEntity' instead.
   * ---
   * Retrieve the entity corresponding to the supplied key string.
   */
  get: function get(key) {
    logWarning('DraftEntity.get', 'contentState.getEntity');
    return DraftEntity.__get(key);
  },

  /**
   * WARNING: This method will be deprecated soon!
   * Please use 'contentState.mergeEntityData' instead.
   * ---
   * Entity instances are immutable. If you need to update the data for an
   * instance, this method will merge your data updates and return a new
   * instance.
   */
  mergeData: function mergeData(key, toMerge) {
    logWarning('DraftEntity.mergeData', 'contentState.mergeEntityData');
    return DraftEntity.__mergeData(key, toMerge);
  },

  /**
   * WARNING: This method will be deprecated soon!
   * Please use 'contentState.replaceEntityData' instead.
   * ---
   * Completely replace the data for a given instance.
   */
  replaceData: function replaceData(key, newData) {
    logWarning('DraftEntity.replaceData', 'contentState.replaceEntityData');
    return DraftEntity.__replaceData(key, newData);
  },

  // ***********************************WARNING******************************
  // --- the above public API will be deprecated in the next version of Draft!
  // The methods below this line are private - don't call them directly.

  /**
   * Get the random key string from whatever entity was last created.
   * We need this to support the new API, as part of transitioning to put Entity
   * storage in contentState.
   */
  __getLastCreatedEntityKey: function __getLastCreatedEntityKey() {
    return '' + instanceKey;
  },

  /**
   * Create a DraftEntityInstance and store it for later retrieval.
   *
   * A random key string will be generated and returned. This key may
   * be used to track the entity's usage in a ContentBlock, and for
   * retrieving data about the entity at render time.
   */
  __create: function __create(type, mutability, data) {
    return DraftEntity.__add(new DraftEntityInstance_1({ type: type, mutability: mutability, data: data || {} }));
  },

  /**
   * Add an existing DraftEntityInstance to the DraftEntity map. This is
   * useful when restoring instances from the server.
   */
  __add: function __add(instance) {
    var key = '' + ++instanceKey;
    instances = instances.set(key, instance);
    return key;
  },

  /**
   * Retrieve the entity corresponding to the supplied key string.
   */
  __get: function __get(key) {
    var instance = instances.get(key);
    !!!instance ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Unknown DraftEntity key: %s.', key) : invariant_1(false) : void 0;
    return instance;
  },

  /**
   * Entity instances are immutable. If you need to update the data for an
   * instance, this method will merge your data updates and return a new
   * instance.
   */
  __mergeData: function __mergeData(key, toMerge) {
    var instance = DraftEntity.__get(key);
    var newData = _extends$1({}, instance.getData(), toMerge);
    var newInstance = instance.set('data', newData);
    instances = instances.set(key, newInstance);
    return newInstance;
  },

  /**
   * Completely replace the data for a given instance.
   */
  __replaceData: function __replaceData(key, newData) {
    var instance = DraftEntity.__get(key);
    var newInstance = instance.set('data', newData);
    instances = instances.set(key, newInstance);
    return newInstance;
  }
};

var DraftEntity_1 = DraftEntity;

function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$5(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$5(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Record$5 = immutable.Record;


var defaultRecord$3 = {
  anchorKey: '',
  anchorOffset: 0,
  focusKey: '',
  focusOffset: 0,
  isBackward: false,
  hasFocus: false
};

var SelectionStateRecord = Record$5(defaultRecord$3);

var SelectionState = function (_SelectionStateRecord) {
  _inherits$5(SelectionState, _SelectionStateRecord);

  function SelectionState() {
    _classCallCheck$5(this, SelectionState);

    return _possibleConstructorReturn$5(this, _SelectionStateRecord.apply(this, arguments));
  }

  SelectionState.prototype.serialize = function serialize() {
    return 'Anchor: ' + this.getAnchorKey() + ':' + this.getAnchorOffset() + ', ' + 'Focus: ' + this.getFocusKey() + ':' + this.getFocusOffset() + ', ' + 'Is Backward: ' + String(this.getIsBackward()) + ', ' + 'Has Focus: ' + String(this.getHasFocus());
  };

  SelectionState.prototype.getAnchorKey = function getAnchorKey() {
    return this.get('anchorKey');
  };

  SelectionState.prototype.getAnchorOffset = function getAnchorOffset() {
    return this.get('anchorOffset');
  };

  SelectionState.prototype.getFocusKey = function getFocusKey() {
    return this.get('focusKey');
  };

  SelectionState.prototype.getFocusOffset = function getFocusOffset() {
    return this.get('focusOffset');
  };

  SelectionState.prototype.getIsBackward = function getIsBackward() {
    return this.get('isBackward');
  };

  SelectionState.prototype.getHasFocus = function getHasFocus() {
    return this.get('hasFocus');
  };

  /**
   * Return whether the specified range overlaps with an edge of the
   * SelectionState.
   */


  SelectionState.prototype.hasEdgeWithin = function hasEdgeWithin(blockKey, start, end) {
    var anchorKey = this.getAnchorKey();
    var focusKey = this.getFocusKey();

    if (anchorKey === focusKey && anchorKey === blockKey) {
      var selectionStart = this.getStartOffset();
      var selectionEnd = this.getEndOffset();
      return start <= selectionEnd && selectionStart <= end;
    }

    if (blockKey !== anchorKey && blockKey !== focusKey) {
      return false;
    }

    var offsetToCheck = blockKey === anchorKey ? this.getAnchorOffset() : this.getFocusOffset();

    return start <= offsetToCheck && end >= offsetToCheck;
  };

  SelectionState.prototype.isCollapsed = function isCollapsed() {
    return this.getAnchorKey() === this.getFocusKey() && this.getAnchorOffset() === this.getFocusOffset();
  };

  SelectionState.prototype.getStartKey = function getStartKey() {
    return this.getIsBackward() ? this.getFocusKey() : this.getAnchorKey();
  };

  SelectionState.prototype.getStartOffset = function getStartOffset() {
    return this.getIsBackward() ? this.getFocusOffset() : this.getAnchorOffset();
  };

  SelectionState.prototype.getEndKey = function getEndKey() {
    return this.getIsBackward() ? this.getAnchorKey() : this.getFocusKey();
  };

  SelectionState.prototype.getEndOffset = function getEndOffset() {
    return this.getIsBackward() ? this.getAnchorOffset() : this.getFocusOffset();
  };

  SelectionState.createEmpty = function createEmpty(key) {
    return new SelectionState({
      anchorKey: key,
      anchorOffset: 0,
      focusKey: key,
      focusOffset: 0,
      isBackward: false,
      hasFocus: false
    });
  };

  return SelectionState;
}(SelectionStateRecord);

var SelectionState_1 = SelectionState;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule sanitizeDraftText
 * @format
 * 
 */

var REGEX_BLOCK_DELIMITER = new RegExp('\r', 'g');

function sanitizeDraftText(input) {
  return input.replace(REGEX_BLOCK_DELIMITER, '');
}

var sanitizeDraftText_1 = sanitizeDraftText;

function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$6(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$6(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }













var List$6 = immutable.List,
    Record$6 = immutable.Record,
    Repeat$4 = immutable.Repeat;


var experimentalTreeDataSupport = DraftFeatureFlags_1.draft_tree_data_support;

var defaultRecord$4 = {
  entityMap: null,
  blockMap: null,
  selectionBefore: null,
  selectionAfter: null
};

var ContentBlockNodeRecord = experimentalTreeDataSupport ? ContentBlockNode_1 : ContentBlock_1;

var ContentStateRecord = Record$6(defaultRecord$4);

var ContentState = function (_ContentStateRecord) {
  _inherits$6(ContentState, _ContentStateRecord);

  function ContentState() {
    _classCallCheck$6(this, ContentState);

    return _possibleConstructorReturn$6(this, _ContentStateRecord.apply(this, arguments));
  }

  ContentState.prototype.getEntityMap = function getEntityMap() {
    // TODO: update this when we fully remove DraftEntity
    return DraftEntity_1;
  };

  ContentState.prototype.getBlockMap = function getBlockMap() {
    return this.get('blockMap');
  };

  ContentState.prototype.getSelectionBefore = function getSelectionBefore() {
    return this.get('selectionBefore');
  };

  ContentState.prototype.getSelectionAfter = function getSelectionAfter() {
    return this.get('selectionAfter');
  };

  ContentState.prototype.getBlockForKey = function getBlockForKey(key) {
    var block = this.getBlockMap().get(key);
    return block;
  };

  ContentState.prototype.getKeyBefore = function getKeyBefore(key) {
    return this.getBlockMap().reverse().keySeq().skipUntil(function (v) {
      return v === key;
    }).skip(1).first();
  };

  ContentState.prototype.getKeyAfter = function getKeyAfter(key) {
    return this.getBlockMap().keySeq().skipUntil(function (v) {
      return v === key;
    }).skip(1).first();
  };

  ContentState.prototype.getBlockAfter = function getBlockAfter(key) {
    return this.getBlockMap().skipUntil(function (_, k) {
      return k === key;
    }).skip(1).first();
  };

  ContentState.prototype.getBlockBefore = function getBlockBefore(key) {
    return this.getBlockMap().reverse().skipUntil(function (_, k) {
      return k === key;
    }).skip(1).first();
  };

  ContentState.prototype.getBlocksAsArray = function getBlocksAsArray() {
    return this.getBlockMap().toArray();
  };

  ContentState.prototype.getFirstBlock = function getFirstBlock() {
    return this.getBlockMap().first();
  };

  ContentState.prototype.getLastBlock = function getLastBlock() {
    return this.getBlockMap().last();
  };

  ContentState.prototype.getPlainText = function getPlainText(delimiter) {
    return this.getBlockMap().map(function (block) {
      return block ? block.getText() : '';
    }).join(delimiter || '\n');
  };

  ContentState.prototype.getLastCreatedEntityKey = function getLastCreatedEntityKey() {
    // TODO: update this when we fully remove DraftEntity
    return DraftEntity_1.__getLastCreatedEntityKey();
  };

  ContentState.prototype.hasText = function hasText() {
    var blockMap = this.getBlockMap();
    return blockMap.size > 1 || blockMap.first().getLength() > 0;
  };

  ContentState.prototype.createEntity = function createEntity(type, mutability, data) {
    // TODO: update this when we fully remove DraftEntity
    DraftEntity_1.__create(type, mutability, data);
    return this;
  };

  ContentState.prototype.mergeEntityData = function mergeEntityData(key, toMerge) {
    // TODO: update this when we fully remove DraftEntity
    DraftEntity_1.__mergeData(key, toMerge);
    return this;
  };

  ContentState.prototype.replaceEntityData = function replaceEntityData(key, newData) {
    // TODO: update this when we fully remove DraftEntity
    DraftEntity_1.__replaceData(key, newData);
    return this;
  };

  ContentState.prototype.addEntity = function addEntity(instance) {
    // TODO: update this when we fully remove DraftEntity
    DraftEntity_1.__add(instance);
    return this;
  };

  ContentState.prototype.getEntity = function getEntity(key) {
    // TODO: update this when we fully remove DraftEntity
    return DraftEntity_1.__get(key);
  };

  ContentState.createFromBlockArray = function createFromBlockArray(
  // TODO: update flow type when we completely deprecate the old entity API
  blocks, entityMap) {
    // TODO: remove this when we completely deprecate the old entity API
    var theBlocks = Array.isArray(blocks) ? blocks : blocks.contentBlocks;
    var blockMap = BlockMapBuilder_1.createFromArray(theBlocks);
    var selectionState = blockMap.isEmpty() ? new SelectionState_1() : SelectionState_1.createEmpty(blockMap.first().getKey());
    return new ContentState({
      blockMap: blockMap,
      entityMap: entityMap || DraftEntity_1,
      selectionBefore: selectionState,
      selectionAfter: selectionState
    });
  };

  ContentState.createFromText = function createFromText(text) {
    var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /\r\n?|\n/g;

    var strings = text.split(delimiter);
    var blocks = strings.map(function (block) {
      block = sanitizeDraftText_1(block);
      return new ContentBlockNodeRecord({
        key: generateRandomKey_1(),
        text: block,
        type: 'unstyled',
        characterList: List$6(Repeat$4(CharacterMetadata_1.EMPTY, block.length))
      });
    });
    return ContentState.createFromBlockArray(blocks);
  };

  return ContentState;
}(ContentStateRecord);

var ContentState_1 = ContentState;

var NEUTRAL = 'NEUTRAL'; // No strong direction
var LTR = 'LTR'; // Left-to-Right direction
var RTL = 'RTL'; // Right-to-Left direction

var globalDir = null;

// == Helpers ==

/**
 * Check if a directionality value is a Strong one
 */
function isStrong(dir) {
  return dir === LTR || dir === RTL;
}

/**
 * Get string value to be used for `dir` HTML attribute or `direction` CSS
 * property.
 */
function getHTMLDir(dir) {
  !isStrong(dir) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, '`dir` must be a strong direction to be converted to HTML Direction') : invariant_1(false) : void 0;
  return dir === LTR ? 'ltr' : 'rtl';
}

/**
 * Get string value to be used for `dir` HTML attribute or `direction` CSS
 * property, but returns null if `dir` has same value as `otherDir`.
 * `null`.
 */
function getHTMLDirIfDifferent(dir, otherDir) {
  !isStrong(dir) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, '`dir` must be a strong direction to be converted to HTML Direction') : invariant_1(false) : void 0;
  !isStrong(otherDir) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, '`otherDir` must be a strong direction to be converted to HTML Direction') : invariant_1(false) : void 0;
  return dir === otherDir ? null : getHTMLDir(dir);
}

// == Global Direction ==

/**
 * Set the global direction.
 */
function setGlobalDir(dir) {
  globalDir = dir;
}

/**
 * Initialize the global direction
 */
function initGlobalDir() {
  setGlobalDir(LTR);
}

/**
 * Get the global direction
 */
function getGlobalDir() {
  if (!globalDir) {
    this.initGlobalDir();
  }
  !globalDir ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Global direction not set.') : invariant_1(false) : void 0;
  return globalDir;
}

var UnicodeBidiDirection = {
  // Values
  NEUTRAL: NEUTRAL,
  LTR: LTR,
  RTL: RTL,
  // Helpers
  isStrong: isStrong,
  getHTMLDir: getHTMLDir,
  getHTMLDirIfDifferent: getHTMLDirIfDifferent,
  // Global Direction
  setGlobalDir: setGlobalDir,
  initGlobalDir: initGlobalDir,
  getGlobalDir: getGlobalDir
};

var UnicodeBidiDirection_1 = UnicodeBidiDirection;

/**
 * RegExp ranges of characters with a *Strong* Bidi_Class value.
 *
 * Data is based on DerivedBidiClass.txt in UCD version 7.0.0.
 *
 * NOTE: For performance reasons, we only support Unicode's
 *       Basic Multilingual Plane (BMP) for now.
 */
var RANGE_BY_BIDI_TYPE = {

  L: 'A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u01BA\u01BB' + '\u01BC-\u01BF\u01C0-\u01C3\u01C4-\u0293\u0294\u0295-\u02AF\u02B0-\u02B8' + '\u02BB-\u02C1\u02D0-\u02D1\u02E0-\u02E4\u02EE\u0370-\u0373\u0376-\u0377' + '\u037A\u037B-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1' + '\u03A3-\u03F5\u03F7-\u0481\u0482\u048A-\u052F\u0531-\u0556\u0559' + '\u055A-\u055F\u0561-\u0587\u0589\u0903\u0904-\u0939\u093B\u093D' + '\u093E-\u0940\u0949-\u094C\u094E-\u094F\u0950\u0958-\u0961\u0964-\u0965' + '\u0966-\u096F\u0970\u0971\u0972-\u0980\u0982-\u0983\u0985-\u098C' + '\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD' + '\u09BE-\u09C0\u09C7-\u09C8\u09CB-\u09CC\u09CE\u09D7\u09DC-\u09DD' + '\u09DF-\u09E1\u09E6-\u09EF\u09F0-\u09F1\u09F4-\u09F9\u09FA\u0A03' + '\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33' + '\u0A35-\u0A36\u0A38-\u0A39\u0A3E-\u0A40\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F' + '\u0A72-\u0A74\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0' + '\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0ABE-\u0AC0\u0AC9\u0ACB-\u0ACC\u0AD0' + '\u0AE0-\u0AE1\u0AE6-\u0AEF\u0AF0\u0B02-\u0B03\u0B05-\u0B0C\u0B0F-\u0B10' + '\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B35-\u0B39\u0B3D\u0B3E\u0B40' + '\u0B47-\u0B48\u0B4B-\u0B4C\u0B57\u0B5C-\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F' + '\u0B70\u0B71\u0B72-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95' + '\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9' + '\u0BBE-\u0BBF\u0BC1-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD0\u0BD7' + '\u0BE6-\u0BEF\u0BF0-\u0BF2\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10' + '\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C41-\u0C44\u0C58-\u0C59\u0C60-\u0C61' + '\u0C66-\u0C6F\u0C7F\u0C82-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8' + '\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CBE\u0CBF\u0CC0-\u0CC4\u0CC6' + '\u0CC7-\u0CC8\u0CCA-\u0CCB\u0CD5-\u0CD6\u0CDE\u0CE0-\u0CE1\u0CE6-\u0CEF' + '\u0CF1-\u0CF2\u0D02-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D' + '\u0D3E-\u0D40\u0D46-\u0D48\u0D4A-\u0D4C\u0D4E\u0D57\u0D60-\u0D61' + '\u0D66-\u0D6F\u0D70-\u0D75\u0D79\u0D7A-\u0D7F\u0D82-\u0D83\u0D85-\u0D96' + '\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCF-\u0DD1\u0DD8-\u0DDF' + '\u0DE6-\u0DEF\u0DF2-\u0DF3\u0DF4\u0E01-\u0E30\u0E32-\u0E33\u0E40-\u0E45' + '\u0E46\u0E4F\u0E50-\u0E59\u0E5A-\u0E5B\u0E81-\u0E82\u0E84\u0E87-\u0E88' + '\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7' + '\u0EAA-\u0EAB\u0EAD-\u0EB0\u0EB2-\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6' + '\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F01-\u0F03\u0F04-\u0F12\u0F13\u0F14' + '\u0F15-\u0F17\u0F1A-\u0F1F\u0F20-\u0F29\u0F2A-\u0F33\u0F34\u0F36\u0F38' + '\u0F3E-\u0F3F\u0F40-\u0F47\u0F49-\u0F6C\u0F7F\u0F85\u0F88-\u0F8C' + '\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE-\u0FCF\u0FD0-\u0FD4\u0FD5-\u0FD8' + '\u0FD9-\u0FDA\u1000-\u102A\u102B-\u102C\u1031\u1038\u103B-\u103C\u103F' + '\u1040-\u1049\u104A-\u104F\u1050-\u1055\u1056-\u1057\u105A-\u105D\u1061' + '\u1062-\u1064\u1065-\u1066\u1067-\u106D\u106E-\u1070\u1075-\u1081' + '\u1083-\u1084\u1087-\u108C\u108E\u108F\u1090-\u1099\u109A-\u109C' + '\u109E-\u109F\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FB\u10FC' + '\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288' + '\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5' + '\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1360-\u1368' + '\u1369-\u137C\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166D-\u166E' + '\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EB-\u16ED\u16EE-\u16F0' + '\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1735-\u1736' + '\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17B6\u17BE-\u17C5' + '\u17C7-\u17C8\u17D4-\u17D6\u17D7\u17D8-\u17DA\u17DC\u17E0-\u17E9' + '\u1810-\u1819\u1820-\u1842\u1843\u1844-\u1877\u1880-\u18A8\u18AA' + '\u18B0-\u18F5\u1900-\u191E\u1923-\u1926\u1929-\u192B\u1930-\u1931' + '\u1933-\u1938\u1946-\u194F\u1950-\u196D\u1970-\u1974\u1980-\u19AB' + '\u19B0-\u19C0\u19C1-\u19C7\u19C8-\u19C9\u19D0-\u19D9\u19DA\u1A00-\u1A16' + '\u1A19-\u1A1A\u1A1E-\u1A1F\u1A20-\u1A54\u1A55\u1A57\u1A61\u1A63-\u1A64' + '\u1A6D-\u1A72\u1A80-\u1A89\u1A90-\u1A99\u1AA0-\u1AA6\u1AA7\u1AA8-\u1AAD' + '\u1B04\u1B05-\u1B33\u1B35\u1B3B\u1B3D-\u1B41\u1B43-\u1B44\u1B45-\u1B4B' + '\u1B50-\u1B59\u1B5A-\u1B60\u1B61-\u1B6A\u1B74-\u1B7C\u1B82\u1B83-\u1BA0' + '\u1BA1\u1BA6-\u1BA7\u1BAA\u1BAE-\u1BAF\u1BB0-\u1BB9\u1BBA-\u1BE5\u1BE7' + '\u1BEA-\u1BEC\u1BEE\u1BF2-\u1BF3\u1BFC-\u1BFF\u1C00-\u1C23\u1C24-\u1C2B' + '\u1C34-\u1C35\u1C3B-\u1C3F\u1C40-\u1C49\u1C4D-\u1C4F\u1C50-\u1C59' + '\u1C5A-\u1C77\u1C78-\u1C7D\u1C7E-\u1C7F\u1CC0-\u1CC7\u1CD3\u1CE1' + '\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF2-\u1CF3\u1CF5-\u1CF6\u1D00-\u1D2B' + '\u1D2C-\u1D6A\u1D6B-\u1D77\u1D78\u1D79-\u1D9A\u1D9B-\u1DBF\u1E00-\u1F15' + '\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D' + '\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC' + '\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200E' + '\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D' + '\u2124\u2126\u2128\u212A-\u212D\u212F-\u2134\u2135-\u2138\u2139' + '\u213C-\u213F\u2145-\u2149\u214E\u214F\u2160-\u2182\u2183-\u2184' + '\u2185-\u2188\u2336-\u237A\u2395\u249C-\u24E9\u26AC\u2800-\u28FF' + '\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2C7B\u2C7C-\u2C7D\u2C7E-\u2CE4' + '\u2CEB-\u2CEE\u2CF2-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F' + '\u2D70\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE' + '\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005\u3006\u3007' + '\u3021-\u3029\u302E-\u302F\u3031-\u3035\u3038-\u303A\u303B\u303C' + '\u3041-\u3096\u309D-\u309E\u309F\u30A1-\u30FA\u30FC-\u30FE\u30FF' + '\u3105-\u312D\u3131-\u318E\u3190-\u3191\u3192-\u3195\u3196-\u319F' + '\u31A0-\u31BA\u31F0-\u31FF\u3200-\u321C\u3220-\u3229\u322A-\u3247' + '\u3248-\u324F\u3260-\u327B\u327F\u3280-\u3289\u328A-\u32B0\u32C0-\u32CB' + '\u32D0-\u32FE\u3300-\u3376\u337B-\u33DD\u33E0-\u33FE\u3400-\u4DB5' + '\u4E00-\u9FCC\uA000-\uA014\uA015\uA016-\uA48C\uA4D0-\uA4F7\uA4F8-\uA4FD' + '\uA4FE-\uA4FF\uA500-\uA60B\uA60C\uA610-\uA61F\uA620-\uA629\uA62A-\uA62B' + '\uA640-\uA66D\uA66E\uA680-\uA69B\uA69C-\uA69D\uA6A0-\uA6E5\uA6E6-\uA6EF' + '\uA6F2-\uA6F7\uA722-\uA76F\uA770\uA771-\uA787\uA789-\uA78A\uA78B-\uA78E' + '\uA790-\uA7AD\uA7B0-\uA7B1\uA7F7\uA7F8-\uA7F9\uA7FA\uA7FB-\uA801' + '\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA823-\uA824\uA827\uA830-\uA835' + '\uA836-\uA837\uA840-\uA873\uA880-\uA881\uA882-\uA8B3\uA8B4-\uA8C3' + '\uA8CE-\uA8CF\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8F8-\uA8FA\uA8FB\uA900-\uA909' + '\uA90A-\uA925\uA92E-\uA92F\uA930-\uA946\uA952-\uA953\uA95F\uA960-\uA97C' + '\uA983\uA984-\uA9B2\uA9B4-\uA9B5\uA9BA-\uA9BB\uA9BD-\uA9C0\uA9C1-\uA9CD' + '\uA9CF\uA9D0-\uA9D9\uA9DE-\uA9DF\uA9E0-\uA9E4\uA9E6\uA9E7-\uA9EF' + '\uA9F0-\uA9F9\uA9FA-\uA9FE\uAA00-\uAA28\uAA2F-\uAA30\uAA33-\uAA34' + '\uAA40-\uAA42\uAA44-\uAA4B\uAA4D\uAA50-\uAA59\uAA5C-\uAA5F\uAA60-\uAA6F' + '\uAA70\uAA71-\uAA76\uAA77-\uAA79\uAA7A\uAA7B\uAA7D\uAA7E-\uAAAF\uAAB1' + '\uAAB5-\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADC\uAADD\uAADE-\uAADF' + '\uAAE0-\uAAEA\uAAEB\uAAEE-\uAAEF\uAAF0-\uAAF1\uAAF2\uAAF3-\uAAF4\uAAF5' + '\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E' + '\uAB30-\uAB5A\uAB5B\uAB5C-\uAB5F\uAB64-\uAB65\uABC0-\uABE2\uABE3-\uABE4' + '\uABE6-\uABE7\uABE9-\uABEA\uABEB\uABEC\uABF0-\uABF9\uAC00-\uD7A3' + '\uD7B0-\uD7C6\uD7CB-\uD7FB\uE000-\uF8FF\uF900-\uFA6D\uFA70-\uFAD9' + '\uFB00-\uFB06\uFB13-\uFB17\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFF6F\uFF70' + '\uFF71-\uFF9D\uFF9E-\uFF9F\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF' + '\uFFD2-\uFFD7\uFFDA-\uFFDC',

  R: '\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05D0-\u05EA\u05EB-\u05EF' + '\u05F0-\u05F2\u05F3-\u05F4\u05F5-\u05FF\u07C0-\u07C9\u07CA-\u07EA' + '\u07F4-\u07F5\u07FA\u07FB-\u07FF\u0800-\u0815\u081A\u0824\u0828' + '\u082E-\u082F\u0830-\u083E\u083F\u0840-\u0858\u085C-\u085D\u085E' + '\u085F-\u089F\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB37\uFB38-\uFB3C' + '\uFB3D\uFB3E\uFB3F\uFB40-\uFB41\uFB42\uFB43-\uFB44\uFB45\uFB46-\uFB4F',

  AL: '\u0608\u060B\u060D\u061B\u061C\u061D\u061E-\u061F\u0620-\u063F\u0640' + '\u0641-\u064A\u066D\u066E-\u066F\u0671-\u06D3\u06D4\u06D5\u06E5-\u06E6' + '\u06EE-\u06EF\u06FA-\u06FC\u06FD-\u06FE\u06FF\u0700-\u070D\u070E\u070F' + '\u0710\u0712-\u072F\u074B-\u074C\u074D-\u07A5\u07B1\u07B2-\u07BF' + '\u08A0-\u08B2\u08B3-\u08E3\uFB50-\uFBB1\uFBB2-\uFBC1\uFBC2-\uFBD2' + '\uFBD3-\uFD3D\uFD40-\uFD4F\uFD50-\uFD8F\uFD90-\uFD91\uFD92-\uFDC7' + '\uFDC8-\uFDCF\uFDF0-\uFDFB\uFDFC\uFDFE-\uFDFF\uFE70-\uFE74\uFE75' + '\uFE76-\uFEFC\uFEFD-\uFEFE'

};

var REGEX_STRONG = new RegExp('[' + RANGE_BY_BIDI_TYPE.L + RANGE_BY_BIDI_TYPE.R + RANGE_BY_BIDI_TYPE.AL + ']');

var REGEX_RTL = new RegExp('[' + RANGE_BY_BIDI_TYPE.R + RANGE_BY_BIDI_TYPE.AL + ']');

/**
 * Returns the first strong character (has Bidi_Class value of L, R, or AL).
 *
 * @param str  A text block; e.g. paragraph, table cell, tag
 * @return     A character with strong bidi direction, or null if not found
 */
function firstStrongChar(str) {
  var match = REGEX_STRONG.exec(str);
  return match == null ? null : match[0];
}

/**
 * Returns the direction of a block of text, based on the direction of its
 * first strong character (has Bidi_Class value of L, R, or AL).
 *
 * @param str  A text block; e.g. paragraph, table cell, tag
 * @return     The resolved direction
 */
function firstStrongCharDir(str) {
  var strongChar = firstStrongChar(str);
  if (strongChar == null) {
    return UnicodeBidiDirection_1.NEUTRAL;
  }
  return REGEX_RTL.exec(strongChar) ? UnicodeBidiDirection_1.RTL : UnicodeBidiDirection_1.LTR;
}

/**
 * Returns the direction of a block of text, based on the direction of its
 * first strong character (has Bidi_Class value of L, R, or AL), or a fallback
 * direction, if no strong character is found.
 *
 * This function is supposed to be used in respect to Higher-Level Protocol
 * rule HL1. (http://www.unicode.org/reports/tr9/#HL1)
 *
 * @param str       A text block; e.g. paragraph, table cell, tag
 * @param fallback  Fallback direction, used if no strong direction detected
 *                  for the block (default = NEUTRAL)
 * @return          The resolved direction
 */
function resolveBlockDir(str, fallback) {
  fallback = fallback || UnicodeBidiDirection_1.NEUTRAL;
  if (!str.length) {
    return fallback;
  }
  var blockDir = firstStrongCharDir(str);
  return blockDir === UnicodeBidiDirection_1.NEUTRAL ? fallback : blockDir;
}

/**
 * Returns the direction of a block of text, based on the direction of its
 * first strong character (has Bidi_Class value of L, R, or AL), or a fallback
 * direction, if no strong character is found.
 *
 * NOTE: This function is similar to resolveBlockDir(), but uses the global
 * direction as the fallback, so it *always* returns a Strong direction,
 * making it useful for integration in places that you need to make the final
 * decision, like setting some CSS class.
 *
 * This function is supposed to be used in respect to Higher-Level Protocol
 * rule HL1. (http://www.unicode.org/reports/tr9/#HL1)
 *
 * @param str             A text block; e.g. paragraph, table cell
 * @param strongFallback  Fallback direction, used if no strong direction
 *                        detected for the block (default = global direction)
 * @return                The resolved Strong direction
 */
function getDirection(str, strongFallback) {
  if (!strongFallback) {
    strongFallback = UnicodeBidiDirection_1.getGlobalDir();
  }
  !UnicodeBidiDirection_1.isStrong(strongFallback) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Fallback direction must be a strong direction') : invariant_1(false) : void 0;
  return resolveBlockDir(str, strongFallback);
}

/**
 * Returns true if getDirection(arguments...) returns LTR.
 *
 * @param str             A text block; e.g. paragraph, table cell
 * @param strongFallback  Fallback direction, used if no strong direction
 *                        detected for the block (default = global direction)
 * @return                True if the resolved direction is LTR
 */
function isDirectionLTR(str, strongFallback) {
  return getDirection(str, strongFallback) === UnicodeBidiDirection_1.LTR;
}

/**
 * Returns true if getDirection(arguments...) returns RTL.
 *
 * @param str             A text block; e.g. paragraph, table cell
 * @param strongFallback  Fallback direction, used if no strong direction
 *                        detected for the block (default = global direction)
 * @return                True if the resolved direction is RTL
 */
function isDirectionRTL(str, strongFallback) {
  return getDirection(str, strongFallback) === UnicodeBidiDirection_1.RTL;
}

var UnicodeBidi = {
  firstStrongChar: firstStrongChar,
  firstStrongCharDir: firstStrongCharDir,
  resolveBlockDir: resolveBlockDir,
  getDirection: getDirection,
  isDirectionLTR: isDirectionLTR,
  isDirectionRTL: isDirectionRTL
};

var UnicodeBidi_1 = UnicodeBidi;

function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var UnicodeBidiService = function () {

  /**
   * Stateful class for paragraph direction detection
   *
   * @param defaultDir  Default direction of the service
   */
  function UnicodeBidiService(defaultDir) {
    _classCallCheck$7(this, UnicodeBidiService);

    if (!defaultDir) {
      defaultDir = UnicodeBidiDirection_1.getGlobalDir();
    } else {
      !UnicodeBidiDirection_1.isStrong(defaultDir) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Default direction must be a strong direction (LTR or RTL)') : invariant_1(false) : void 0;
    }
    this._defaultDir = defaultDir;
    this.reset();
  }

  /**
   * Reset the internal state
   *
   * Instead of creating a new instance, you can just reset() your instance
   * everytime you start a new loop.
   */


  UnicodeBidiService.prototype.reset = function reset() {
    this._lastDir = this._defaultDir;
  };

  /**
   * Returns the direction of a block of text, and remembers it as the
   * fall-back direction for the next paragraph.
   *
   * @param str  A text block, e.g. paragraph, table cell, tag
   * @return     The resolved direction
   */


  UnicodeBidiService.prototype.getDirection = function getDirection(str) {
    this._lastDir = UnicodeBidi_1.getDirection(str, this._lastDir);
    return this._lastDir;
  };

  return UnicodeBidiService;
}();

var UnicodeBidiService_1 = UnicodeBidiService;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var nullthrows = function nullthrows(x) {
  if (x != null) {
    return x;
  }
  throw new Error("Got unexpected null or undefined");
};

var nullthrows_1 = nullthrows;

var OrderedMap$2 = immutable.OrderedMap;


var bidiService;

var EditorBidiService = {
  getDirectionMap: function getDirectionMap(content, prevBidiMap) {
    if (!bidiService) {
      bidiService = new UnicodeBidiService_1();
    } else {
      bidiService.reset();
    }

    var blockMap = content.getBlockMap();
    var nextBidi = blockMap.valueSeq().map(function (block) {
      return nullthrows_1(bidiService).getDirection(block.getText());
    });
    var bidiMap = OrderedMap$2(blockMap.keySeq().zip(nextBidi));

    if (prevBidiMap != null && immutable.is(prevBidiMap, bidiMap)) {
      return prevBidiMap;
    }

    return bidiMap;
  }
};

var EditorBidiService_1 = EditorBidiService;

var _extends$2 = objectAssign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }







var OrderedSet$4 = immutable.OrderedSet,
    Record$7 = immutable.Record,
    Stack = immutable.Stack;


var defaultRecord$5 = {
  allowUndo: true,
  currentContent: null,
  decorator: null,
  directionMap: null,
  forceSelection: false,
  inCompositionMode: false,
  inlineStyleOverride: null,
  lastChangeType: null,
  nativelyRenderedContent: null,
  redoStack: Stack(),
  selection: null,
  treeMap: null,
  undoStack: Stack()
};

var EditorStateRecord = Record$7(defaultRecord$5);

var EditorState = function () {
  EditorState.createEmpty = function createEmpty(decorator) {
    return EditorState.createWithContent(ContentState_1.createFromText(''), decorator);
  };

  EditorState.createWithContent = function createWithContent(contentState, decorator) {
    var firstKey = contentState.getBlockMap().first().getKey();
    return EditorState.create({
      currentContent: contentState,
      undoStack: Stack(),
      redoStack: Stack(),
      decorator: decorator || null,
      selection: SelectionState_1.createEmpty(firstKey)
    });
  };

  EditorState.create = function create(config) {
    var currentContent = config.currentContent,
        decorator = config.decorator;

    var recordConfig = _extends$2({}, config, {
      treeMap: generateNewTreeMap(currentContent, decorator),
      directionMap: EditorBidiService_1.getDirectionMap(currentContent)
    });
    return new EditorState(new EditorStateRecord(recordConfig));
  };

  EditorState.set = function set(editorState, put) {
    var map = editorState.getImmutable().withMutations(function (state) {
      var existingDecorator = state.get('decorator');
      var decorator = existingDecorator;
      if (put.decorator === null) {
        decorator = null;
      } else if (put.decorator) {
        decorator = put.decorator;
      }

      var newContent = put.currentContent || editorState.getCurrentContent();

      if (decorator !== existingDecorator) {
        var treeMap = state.get('treeMap');
        var newTreeMap;
        if (decorator && existingDecorator) {
          newTreeMap = regenerateTreeForNewDecorator(newContent, newContent.getBlockMap(), treeMap, decorator, existingDecorator);
        } else {
          newTreeMap = generateNewTreeMap(newContent, decorator);
        }

        state.merge({
          decorator: decorator,
          treeMap: newTreeMap,
          nativelyRenderedContent: null
        });
        return;
      }

      var existingContent = editorState.getCurrentContent();
      if (newContent !== existingContent) {
        state.set('treeMap', regenerateTreeForNewBlocks(editorState, newContent.getBlockMap(), newContent.getEntityMap(), decorator));
      }

      state.merge(put);
    });

    return new EditorState(map);
  };

  EditorState.prototype.toJS = function toJS() {
    return this.getImmutable().toJS();
  };

  EditorState.prototype.getAllowUndo = function getAllowUndo() {
    return this.getImmutable().get('allowUndo');
  };

  EditorState.prototype.getCurrentContent = function getCurrentContent() {
    return this.getImmutable().get('currentContent');
  };

  EditorState.prototype.getUndoStack = function getUndoStack() {
    return this.getImmutable().get('undoStack');
  };

  EditorState.prototype.getRedoStack = function getRedoStack() {
    return this.getImmutable().get('redoStack');
  };

  EditorState.prototype.getSelection = function getSelection() {
    return this.getImmutable().get('selection');
  };

  EditorState.prototype.getDecorator = function getDecorator() {
    return this.getImmutable().get('decorator');
  };

  EditorState.prototype.isInCompositionMode = function isInCompositionMode() {
    return this.getImmutable().get('inCompositionMode');
  };

  EditorState.prototype.mustForceSelection = function mustForceSelection() {
    return this.getImmutable().get('forceSelection');
  };

  EditorState.prototype.getNativelyRenderedContent = function getNativelyRenderedContent() {
    return this.getImmutable().get('nativelyRenderedContent');
  };

  EditorState.prototype.getLastChangeType = function getLastChangeType() {
    return this.getImmutable().get('lastChangeType');
  };

  /**
   * While editing, the user may apply inline style commands with a collapsed
   * cursor, intending to type text that adopts the specified style. In this
   * case, we track the specified style as an "override" that takes precedence
   * over the inline style of the text adjacent to the cursor.
   *
   * If null, there is no override in place.
   */


  EditorState.prototype.getInlineStyleOverride = function getInlineStyleOverride() {
    return this.getImmutable().get('inlineStyleOverride');
  };

  EditorState.setInlineStyleOverride = function setInlineStyleOverride(editorState, inlineStyleOverride) {
    return EditorState.set(editorState, { inlineStyleOverride: inlineStyleOverride });
  };

  /**
   * Get the appropriate inline style for the editor state. If an
   * override is in place, use it. Otherwise, the current style is
   * based on the location of the selection state.
   */


  EditorState.prototype.getCurrentInlineStyle = function getCurrentInlineStyle() {
    var override = this.getInlineStyleOverride();
    if (override != null) {
      return override;
    }

    var content = this.getCurrentContent();
    var selection = this.getSelection();

    if (selection.isCollapsed()) {
      return getInlineStyleForCollapsedSelection(content, selection);
    }

    return getInlineStyleForNonCollapsedSelection(content, selection);
  };

  EditorState.prototype.getBlockTree = function getBlockTree(blockKey) {
    return this.getImmutable().getIn(['treeMap', blockKey]);
  };

  EditorState.prototype.isSelectionAtStartOfContent = function isSelectionAtStartOfContent() {
    var firstKey = this.getCurrentContent().getBlockMap().first().getKey();
    return this.getSelection().hasEdgeWithin(firstKey, 0, 0);
  };

  EditorState.prototype.isSelectionAtEndOfContent = function isSelectionAtEndOfContent() {
    var content = this.getCurrentContent();
    var blockMap = content.getBlockMap();
    var last = blockMap.last();
    var end = last.getLength();
    return this.getSelection().hasEdgeWithin(last.getKey(), end, end);
  };

  EditorState.prototype.getDirectionMap = function getDirectionMap() {
    return this.getImmutable().get('directionMap');
  };

  /**
   * Incorporate native DOM selection changes into the EditorState. This
   * method can be used when we simply want to accept whatever the DOM
   * has given us to represent selection, and we do not need to re-render
   * the editor.
   *
   * To forcibly move the DOM selection, see `EditorState.forceSelection`.
   */


  EditorState.acceptSelection = function acceptSelection(editorState, selection) {
    return updateSelection(editorState, selection, false);
  };

  /**
   * At times, we need to force the DOM selection to be where we
   * need it to be. This can occur when the anchor or focus nodes
   * are non-text nodes, for instance. In this case, we want to trigger
   * a re-render of the editor, which in turn forces selection into
   * the correct place in the DOM. The `forceSelection` method
   * accomplishes this.
   *
   * This method should be used in cases where you need to explicitly
   * move the DOM selection from one place to another without a change
   * in ContentState.
   */


  EditorState.forceSelection = function forceSelection(editorState, selection) {
    if (!selection.getHasFocus()) {
      selection = selection.set('hasFocus', true);
    }
    return updateSelection(editorState, selection, true);
  };

  /**
   * Move selection to the end of the editor without forcing focus.
   */


  EditorState.moveSelectionToEnd = function moveSelectionToEnd(editorState) {
    var content = editorState.getCurrentContent();
    var lastBlock = content.getLastBlock();
    var lastKey = lastBlock.getKey();
    var length = lastBlock.getLength();

    return EditorState.acceptSelection(editorState, new SelectionState_1({
      anchorKey: lastKey,
      anchorOffset: length,
      focusKey: lastKey,
      focusOffset: length,
      isBackward: false
    }));
  };

  /**
   * Force focus to the end of the editor. This is useful in scenarios
   * where we want to programmatically focus the input and it makes sense
   * to allow the user to continue working seamlessly.
   */


  EditorState.moveFocusToEnd = function moveFocusToEnd(editorState) {
    var afterSelectionMove = EditorState.moveSelectionToEnd(editorState);
    return EditorState.forceSelection(afterSelectionMove, afterSelectionMove.getSelection());
  };

  /**
   * Push the current ContentState onto the undo stack if it should be
   * considered a boundary state, and set the provided ContentState as the
   * new current content.
   */


  EditorState.push = function push(editorState, contentState, changeType) {
    if (editorState.getCurrentContent() === contentState) {
      return editorState;
    }

    var forceSelection = changeType !== 'insert-characters';
    var directionMap = EditorBidiService_1.getDirectionMap(contentState, editorState.getDirectionMap());

    if (!editorState.getAllowUndo()) {
      return EditorState.set(editorState, {
        currentContent: contentState,
        directionMap: directionMap,
        lastChangeType: changeType,
        selection: contentState.getSelectionAfter(),
        forceSelection: forceSelection,
        inlineStyleOverride: null
      });
    }

    var selection = editorState.getSelection();
    var currentContent = editorState.getCurrentContent();
    var undoStack = editorState.getUndoStack();
    var newContent = contentState;

    if (selection !== currentContent.getSelectionAfter() || mustBecomeBoundary(editorState, changeType)) {
      undoStack = undoStack.push(currentContent);
      newContent = newContent.set('selectionBefore', selection);
    } else if (changeType === 'insert-characters' || changeType === 'backspace-character' || changeType === 'delete-character') {
      // Preserve the previous selection.
      newContent = newContent.set('selectionBefore', currentContent.getSelectionBefore());
    }

    var inlineStyleOverride = editorState.getInlineStyleOverride();

    // Don't discard inline style overrides for the following change types:
    var overrideChangeTypes = ['adjust-depth', 'change-block-type', 'split-block'];

    if (overrideChangeTypes.indexOf(changeType) === -1) {
      inlineStyleOverride = null;
    }

    var editorStateChanges = {
      currentContent: newContent,
      directionMap: directionMap,
      undoStack: undoStack,
      redoStack: Stack(),
      lastChangeType: changeType,
      selection: contentState.getSelectionAfter(),
      forceSelection: forceSelection,
      inlineStyleOverride: inlineStyleOverride
    };

    return EditorState.set(editorState, editorStateChanges);
  };

  /**
   * Make the top ContentState in the undo stack the new current content and
   * push the current content onto the redo stack.
   */


  EditorState.undo = function undo(editorState) {
    if (!editorState.getAllowUndo()) {
      return editorState;
    }

    var undoStack = editorState.getUndoStack();
    var newCurrentContent = undoStack.peek();
    if (!newCurrentContent) {
      return editorState;
    }

    var currentContent = editorState.getCurrentContent();
    var directionMap = EditorBidiService_1.getDirectionMap(newCurrentContent, editorState.getDirectionMap());

    return EditorState.set(editorState, {
      currentContent: newCurrentContent,
      directionMap: directionMap,
      undoStack: undoStack.shift(),
      redoStack: editorState.getRedoStack().push(currentContent),
      forceSelection: true,
      inlineStyleOverride: null,
      lastChangeType: 'undo',
      nativelyRenderedContent: null,
      selection: currentContent.getSelectionBefore()
    });
  };

  /**
   * Make the top ContentState in the redo stack the new current content and
   * push the current content onto the undo stack.
   */


  EditorState.redo = function redo(editorState) {
    if (!editorState.getAllowUndo()) {
      return editorState;
    }

    var redoStack = editorState.getRedoStack();
    var newCurrentContent = redoStack.peek();
    if (!newCurrentContent) {
      return editorState;
    }

    var currentContent = editorState.getCurrentContent();
    var directionMap = EditorBidiService_1.getDirectionMap(newCurrentContent, editorState.getDirectionMap());

    return EditorState.set(editorState, {
      currentContent: newCurrentContent,
      directionMap: directionMap,
      undoStack: editorState.getUndoStack().push(currentContent),
      redoStack: redoStack.shift(),
      forceSelection: true,
      inlineStyleOverride: null,
      lastChangeType: 'redo',
      nativelyRenderedContent: null,
      selection: newCurrentContent.getSelectionAfter()
    });
  };

  /**
   * Not for public consumption.
   */


  function EditorState(immutable$$1) {
    _classCallCheck$8(this, EditorState);

    this._immutable = immutable$$1;
  }

  /**
   * Not for public consumption.
   */


  EditorState.prototype.getImmutable = function getImmutable() {
    return this._immutable;
  };

  return EditorState;
}();

/**
 * Set the supplied SelectionState as the new current selection, and set
 * the `force` flag to trigger manual selection placement by the view.
 */


function updateSelection(editorState, selection, forceSelection) {
  return EditorState.set(editorState, {
    selection: selection,
    forceSelection: forceSelection,
    nativelyRenderedContent: null,
    inlineStyleOverride: null
  });
}

/**
 * Regenerate the entire tree map for a given ContentState and decorator.
 * Returns an OrderedMap that maps all available ContentBlock objects.
 */
function generateNewTreeMap(contentState, decorator) {
  return contentState.getBlockMap().map(function (block) {
    return BlockTree_1.generate(contentState, block, decorator);
  }).toOrderedMap();
}

/**
 * Regenerate tree map objects for all ContentBlocks that have changed
 * between the current editorState and newContent. Returns an OrderedMap
 * with only changed regenerated tree map objects.
 */
function regenerateTreeForNewBlocks(editorState, newBlockMap, newEntityMap, decorator) {
  var contentState = editorState.getCurrentContent().set('entityMap', newEntityMap);
  var prevBlockMap = contentState.getBlockMap();
  var prevTreeMap = editorState.getImmutable().get('treeMap');
  return prevTreeMap.merge(newBlockMap.toSeq().filter(function (block, key) {
    return block !== prevBlockMap.get(key);
  }).map(function (block) {
    return BlockTree_1.generate(contentState, block, decorator);
  }));
}

/**
 * Generate tree map objects for a new decorator object, preserving any
 * decorations that are unchanged from the previous decorator.
 *
 * Note that in order for this to perform optimally, decoration Lists for
 * decorators should be preserved when possible to allow for direct immutable
 * List comparison.
 */
function regenerateTreeForNewDecorator(content, blockMap, previousTreeMap, decorator, existingDecorator) {
  return previousTreeMap.merge(blockMap.toSeq().filter(function (block) {
    return decorator.getDecorations(block, content) !== existingDecorator.getDecorations(block, content);
  }).map(function (block) {
    return BlockTree_1.generate(content, block, decorator);
  }));
}

/**
 * Return whether a change should be considered a boundary state, given
 * the previous change type. Allows us to discard potential boundary states
 * during standard typing or deletion behavior.
 */
function mustBecomeBoundary(editorState, changeType) {
  var lastChangeType = editorState.getLastChangeType();
  return changeType !== lastChangeType || changeType !== 'insert-characters' && changeType !== 'backspace-character' && changeType !== 'delete-character';
}

function getInlineStyleForCollapsedSelection(content, selection) {
  var startKey = selection.getStartKey();
  var startOffset = selection.getStartOffset();
  var startBlock = content.getBlockForKey(startKey);

  // If the cursor is not at the start of the block, look backward to
  // preserve the style of the preceding character.
  if (startOffset > 0) {
    return startBlock.getInlineStyleAt(startOffset - 1);
  }

  // The caret is at position zero in this block. If the block has any
  // text at all, use the style of the first character.
  if (startBlock.getLength()) {
    return startBlock.getInlineStyleAt(0);
  }

  // Otherwise, look upward in the document to find the closest character.
  return lookUpwardForInlineStyle(content, startKey);
}

function getInlineStyleForNonCollapsedSelection(content, selection) {
  var startKey = selection.getStartKey();
  var startOffset = selection.getStartOffset();
  var startBlock = content.getBlockForKey(startKey);

  // If there is a character just inside the selection, use its style.
  if (startOffset < startBlock.getLength()) {
    return startBlock.getInlineStyleAt(startOffset);
  }

  // Check if the selection at the end of a non-empty block. Use the last
  // style in the block.
  if (startOffset > 0) {
    return startBlock.getInlineStyleAt(startOffset - 1);
  }

  // Otherwise, look upward in the document to find the closest character.
  return lookUpwardForInlineStyle(content, startKey);
}

function lookUpwardForInlineStyle(content, fromKey) {
  var lastNonEmpty = content.getBlockMap().reverse().skipUntil(function (_, k) {
    return k === fromKey;
  }).skip(1).skipUntil(function (block, _) {
    return block.getLength();
  }).first();

  if (lastNonEmpty) return lastNonEmpty.getInlineStyleAt(lastNonEmpty.getLength() - 1);
  return OrderedSet$4();
}

var EditorState_1 = EditorState;

var OrderedMap$3 = immutable.OrderedMap,
    List$7 = immutable.List;


var transformBlock$2 = function transformBlock(key, blockMap, func) {
  if (!key) {
    return;
  }

  var block = blockMap.get(key);

  if (!block) {
    return;
  }

  blockMap.set(key, func(block));
};

var updateBlockMapLinks$3 = function updateBlockMapLinks(blockMap, originalBlockToBeMoved, originalTargetBlock, insertionMode, isExperimentalTreeBlock) {
  if (!isExperimentalTreeBlock) {
    return blockMap;
  }
  // possible values of 'insertionMode' are: 'after', 'before'
  var isInsertedAfterTarget = insertionMode === 'after';

  var originalBlockKey = originalBlockToBeMoved.getKey();
  var originalTargetKey = originalTargetBlock.getKey();
  var originalParentKey = originalBlockToBeMoved.getParentKey();
  var originalNextSiblingKey = originalBlockToBeMoved.getNextSiblingKey();
  var originalPrevSiblingKey = originalBlockToBeMoved.getPrevSiblingKey();
  var newParentKey = originalTargetBlock.getParentKey();
  var newNextSiblingKey = isInsertedAfterTarget ? originalTargetBlock.getNextSiblingKey() : originalTargetKey;
  var newPrevSiblingKey = isInsertedAfterTarget ? originalTargetKey : originalTargetBlock.getPrevSiblingKey();

  return blockMap.withMutations(function (blocks) {
    // update old parent
    transformBlock$2(originalParentKey, blocks, function (block) {
      var parentChildrenList = block.getChildKeys();
      return block.merge({
        children: parentChildrenList['delete'](parentChildrenList.indexOf(originalBlockKey))
      });
    });

    // update old prev
    transformBlock$2(originalPrevSiblingKey, blocks, function (block) {
      return block.merge({
        nextSibling: originalNextSiblingKey
      });
    });

    // update old next
    transformBlock$2(originalNextSiblingKey, blocks, function (block) {
      return block.merge({
        prevSibling: originalPrevSiblingKey
      });
    });

    // update new next
    transformBlock$2(newNextSiblingKey, blocks, function (block) {
      return block.merge({
        prevSibling: originalBlockKey
      });
    });

    // update new prev
    transformBlock$2(newPrevSiblingKey, blocks, function (block) {
      return block.merge({
        nextSibling: originalBlockKey
      });
    });

    // update new parent
    transformBlock$2(newParentKey, blocks, function (block) {
      var newParentChildrenList = block.getChildKeys();
      var targetBlockIndex = newParentChildrenList.indexOf(originalTargetKey);

      var insertionIndex = isInsertedAfterTarget ? targetBlockIndex + 1 : targetBlockIndex !== 0 ? targetBlockIndex - 1 : 0;

      var newChildrenArray = newParentChildrenList.toArray();
      newChildrenArray.splice(insertionIndex, 0, originalBlockKey);

      return block.merge({
        children: List$7(newChildrenArray)
      });
    });

    // update block
    transformBlock$2(originalBlockKey, blocks, function (block) {
      return block.merge({
        nextSibling: newNextSiblingKey,
        prevSibling: newPrevSiblingKey,
        parent: newParentKey
      });
    });
  });
};

var moveBlockInContentState = function moveBlockInContentState(contentState, blockToBeMoved, targetBlock, insertionMode) {
  !(insertionMode !== 'replace') ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Replacing blocks is not supported.') : invariant_1(false) : void 0;

  var targetKey = targetBlock.getKey();
  var blockKey = blockToBeMoved.getKey();

  !(blockKey !== targetKey) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Block cannot be moved next to itself.') : invariant_1(false) : void 0;

  var blockMap = contentState.getBlockMap();
  var isExperimentalTreeBlock = blockToBeMoved instanceof ContentBlockNode_1;

  var blocksToBeMoved = [blockToBeMoved];
  var blockMapWithoutBlocksToBeMoved = blockMap['delete'](blockKey);

  if (isExperimentalTreeBlock) {
    blocksToBeMoved = [];
    blockMapWithoutBlocksToBeMoved = blockMap.withMutations(function (blocks) {
      var nextSiblingKey = blockToBeMoved.getNextSiblingKey();
      var nextDelimiterBlockKey = getNextDelimiterBlockKey_1(blockToBeMoved, blocks);

      blocks.toSeq().skipUntil(function (block) {
        return block.getKey() === blockKey;
      }).takeWhile(function (block) {
        var key = block.getKey();
        var isBlockToBeMoved = key === blockKey;
        var hasNextSiblingAndIsNotNextSibling = nextSiblingKey && key !== nextSiblingKey;
        var doesNotHaveNextSiblingAndIsNotDelimiter = !nextSiblingKey && block.getParentKey() && (!nextDelimiterBlockKey || key !== nextDelimiterBlockKey);

        return !!(isBlockToBeMoved || hasNextSiblingAndIsNotNextSibling || doesNotHaveNextSiblingAndIsNotDelimiter);
      }).forEach(function (block) {
        blocksToBeMoved.push(block);
        blocks['delete'](block.getKey());
      });
    });
  }

  var blocksBefore = blockMapWithoutBlocksToBeMoved.toSeq().takeUntil(function (v) {
    return v === targetBlock;
  });

  var blocksAfter = blockMapWithoutBlocksToBeMoved.toSeq().skipUntil(function (v) {
    return v === targetBlock;
  }).skip(1);

  var slicedBlocks = blocksToBeMoved.map(function (block) {
    return [block.getKey(), block];
  });

  var newBlocks = OrderedMap$3();

  if (insertionMode === 'before') {
    var blockBefore = contentState.getBlockBefore(targetKey);

    !(!blockBefore || blockBefore.getKey() !== blockToBeMoved.getKey()) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Block cannot be moved next to itself.') : invariant_1(false) : void 0;

    newBlocks = blocksBefore.concat([].concat(slicedBlocks, [[targetKey, targetBlock]]), blocksAfter).toOrderedMap();
  } else if (insertionMode === 'after') {
    var blockAfter = contentState.getBlockAfter(targetKey);

    !(!blockAfter || blockAfter.getKey() !== blockKey) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Block cannot be moved next to itself.') : invariant_1(false) : void 0;

    newBlocks = blocksBefore.concat([[targetKey, targetBlock]].concat(slicedBlocks), blocksAfter).toOrderedMap();
  }

  return contentState.merge({
    blockMap: updateBlockMapLinks$3(newBlocks, blockToBeMoved, targetBlock, insertionMode, isExperimentalTreeBlock),
    selectionBefore: contentState.getSelectionAfter(),
    selectionAfter: contentState.getSelectionAfter().merge({
      anchorKey: blockKey,
      focusKey: blockKey
    })
  });
};

var moveBlockInContentState_1 = moveBlockInContentState;

var _extends$3 = objectAssign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };














var experimentalTreeDataSupport$1 = DraftFeatureFlags_1.draft_tree_data_support;
var ContentBlockRecord$1 = experimentalTreeDataSupport$1 ? ContentBlockNode_1 : ContentBlock_1;

var List$8 = immutable.List,
    Repeat$5 = immutable.Repeat;


var AtomicBlockUtils = {
  insertAtomicBlock: function insertAtomicBlock(editorState, entityKey, character) {
    var contentState = editorState.getCurrentContent();
    var selectionState = editorState.getSelection();

    var afterRemoval = DraftModifier_1.removeRange(contentState, selectionState, 'backward');

    var targetSelection = afterRemoval.getSelectionAfter();
    var afterSplit = DraftModifier_1.splitBlock(afterRemoval, targetSelection);
    var insertionTarget = afterSplit.getSelectionAfter();

    var asAtomicBlock = DraftModifier_1.setBlockType(afterSplit, insertionTarget, 'atomic');

    var charData = CharacterMetadata_1.create({ entity: entityKey });

    var atomicBlockConfig = {
      key: generateRandomKey_1(),
      type: 'atomic',
      text: character,
      characterList: List$8(Repeat$5(charData, character.length))
    };

    var atomicDividerBlockConfig = {
      key: generateRandomKey_1(),
      type: 'unstyled'
    };

    if (experimentalTreeDataSupport$1) {
      atomicBlockConfig = _extends$3({}, atomicBlockConfig, {
        nextSibling: atomicDividerBlockConfig.key
      });
      atomicDividerBlockConfig = _extends$3({}, atomicDividerBlockConfig, {
        prevSibling: atomicBlockConfig.key
      });
    }

    var fragmentArray = [new ContentBlockRecord$1(atomicBlockConfig), new ContentBlockRecord$1(atomicDividerBlockConfig)];

    var fragment = BlockMapBuilder_1.createFromArray(fragmentArray);

    var withAtomicBlock = DraftModifier_1.replaceWithFragment(asAtomicBlock, insertionTarget, fragment);

    var newContent = withAtomicBlock.merge({
      selectionBefore: selectionState,
      selectionAfter: withAtomicBlock.getSelectionAfter().set('hasFocus', true)
    });

    return EditorState_1.push(editorState, newContent, 'insert-fragment');
  },

  moveAtomicBlock: function moveAtomicBlock(editorState, atomicBlock, targetRange, insertionMode) {
    var contentState = editorState.getCurrentContent();
    var selectionState = editorState.getSelection();

    var withMovedAtomicBlock = void 0;

    if (insertionMode === 'before' || insertionMode === 'after') {
      var targetBlock = contentState.getBlockForKey(insertionMode === 'before' ? targetRange.getStartKey() : targetRange.getEndKey());

      withMovedAtomicBlock = moveBlockInContentState_1(contentState, atomicBlock, targetBlock, insertionMode);
    } else {
      var afterRemoval = DraftModifier_1.removeRange(contentState, targetRange, 'backward');

      var selectionAfterRemoval = afterRemoval.getSelectionAfter();
      var _targetBlock = afterRemoval.getBlockForKey(selectionAfterRemoval.getFocusKey());

      if (selectionAfterRemoval.getStartOffset() === 0) {
        withMovedAtomicBlock = moveBlockInContentState_1(afterRemoval, atomicBlock, _targetBlock, 'before');
      } else if (selectionAfterRemoval.getEndOffset() === _targetBlock.getLength()) {
        withMovedAtomicBlock = moveBlockInContentState_1(afterRemoval, atomicBlock, _targetBlock, 'after');
      } else {
        var afterSplit = DraftModifier_1.splitBlock(afterRemoval, selectionAfterRemoval);

        var selectionAfterSplit = afterSplit.getSelectionAfter();
        var _targetBlock2 = afterSplit.getBlockForKey(selectionAfterSplit.getFocusKey());

        withMovedAtomicBlock = moveBlockInContentState_1(afterSplit, atomicBlock, _targetBlock2, 'before');
      }
    }

    var newContent = withMovedAtomicBlock.merge({
      selectionBefore: selectionState,
      selectionAfter: withMovedAtomicBlock.getSelectionAfter().set('hasFocus', true)
    });

    return EditorState_1.push(editorState, newContent, 'move-block');
  }
};

var AtomicBlockUtils_1 = AtomicBlockUtils;

function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var List$9 = immutable.List;


var DELIMITER = '.';

/**
 * A CompositeDraftDecorator traverses through a list of DraftDecorator
 * instances to identify sections of a ContentBlock that should be rendered
 * in a "decorated" manner. For example, hashtags, mentions, and links may
 * be intended to stand out visually, be rendered as anchors, etc.
 *
 * The list of decorators supplied to the constructor will be used in the
 * order they are provided. This allows the caller to specify a priority for
 * string matching, in case of match collisions among decorators.
 *
 * For instance, I may have a link with a `#` in its text. Though this section
 * of text may match our hashtag decorator, it should not be treated as a
 * hashtag. I should therefore list my link DraftDecorator
 * before my hashtag DraftDecorator when constructing this composite
 * decorator instance.
 *
 * Thus, when a collision like this is encountered, the earlier match is
 * preserved and the new match is discarded.
 */

var CompositeDraftDecorator = function () {
  function CompositeDraftDecorator(decorators) {
    _classCallCheck$9(this, CompositeDraftDecorator);

    // Copy the decorator array, since we use this array order to determine
    // precedence of decoration matching. If the array is mutated externally,
    // we don't want to be affected here.
    this._decorators = decorators.slice();
  }

  CompositeDraftDecorator.prototype.getDecorations = function getDecorations(block, contentState) {
    var decorations = Array(block.getText().length).fill(null);

    this._decorators.forEach(function ( /*object*/decorator, /*number*/ii) {
      var counter = 0;
      var strategy = decorator.strategy;
      var callback = function callback( /*number*/start, /*number*/end) {
        // Find out if any of our matching range is already occupied
        // by another decorator. If so, discard the match. Otherwise, store
        // the component key for rendering.
        if (canOccupySlice(decorations, start, end)) {
          occupySlice(decorations, start, end, ii + DELIMITER + counter);
          counter++;
        }
      };
      strategy(block, callback, contentState);
    });

    return List$9(decorations);
  };

  CompositeDraftDecorator.prototype.getComponentForKey = function getComponentForKey(key) {
    var componentKey = parseInt(key.split(DELIMITER)[0], 10);
    return this._decorators[componentKey].component;
  };

  CompositeDraftDecorator.prototype.getPropsForKey = function getPropsForKey(key) {
    var componentKey = parseInt(key.split(DELIMITER)[0], 10);
    return this._decorators[componentKey].props;
  };

  return CompositeDraftDecorator;
}();

/**
 * Determine whether we can occupy the specified slice of the decorations
 * array.
 */


function canOccupySlice(decorations, start, end) {
  for (var ii = start; ii < end; ii++) {
    if (decorations[ii] != null) {
      return false;
    }
  }
  return true;
}

/**
 * Splice the specified component into our decoration array at the desired
 * range.
 */
function occupySlice(targetArr, start, end, componentKey) {
  for (var ii = start; ii < end; ii++) {
    targetArr[ii] = componentKey;
  }
}

var CompositeDraftDecorator_1 = CompositeDraftDecorator;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * This function is used to mark string literals representing CSS class names
 * so that they can be transformed statically. This allows for modularization
 * and minification of CSS class names.
 *
 * In static_upstream, this function is actually implemented, but it should
 * eventually be replaced with something more descriptive, and the transform
 * that is used in the main stack should be ported for use elsewhere.
 *
 * @param string|object className to modularize, or an object of key/values.
 *                      In the object case, the values are conditions that
 *                      determine if the className keys should be included.
 * @param [string ...]  Variable list of classNames in the string case.
 * @return string       Renderable space-separated CSS className.
 */
function cx(classNames) {
  if (typeof classNames == 'object') {
    return Object.keys(classNames).filter(function (className) {
      return classNames[className];
    }).map(replace).join(' ');
  }
  return Array.prototype.map.call(arguments, replace).join(' ');
}

function replace(str) {
  return str.replace(/\//g, '-');
}

var cx_1 = cx;

var Map$9 = immutable.Map;





var UL_WRAP = React__default.createElement('ul', { className: cx_1('public/DraftStyleDefault/ul') });
var OL_WRAP = React__default.createElement('ol', { className: cx_1('public/DraftStyleDefault/ol') });
var PRE_WRAP = React__default.createElement('pre', { className: cx_1('public/DraftStyleDefault/pre') });

var DefaultDraftBlockRenderMap = Map$9({
  'header-one': {
    element: 'h1'
  },
  'header-two': {
    element: 'h2'
  },
  'header-three': {
    element: 'h3'
  },
  'header-four': {
    element: 'h4'
  },
  'header-five': {
    element: 'h5'
  },
  'header-six': {
    element: 'h6'
  },
  'unordered-list-item': {
    element: 'li',
    wrapper: UL_WRAP
  },
  'ordered-list-item': {
    element: 'li',
    wrapper: OL_WRAP
  },
  blockquote: {
    element: 'blockquote'
  },
  atomic: {
    element: 'figure'
  },
  'code-block': {
    element: 'pre',
    wrapper: PRE_WRAP
  },
  unstyled: {
    element: 'div',
    aliasedElements: ['p']
  }
});

var DefaultDraftBlockRenderMap_1 = DefaultDraftBlockRenderMap;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DefaultDraftInlineStyle
 * @format
 * 
 */

var DefaultDraftInlineStyle = {
  BOLD: {
    fontWeight: 'bold'
  },

  CODE: {
    fontFamily: 'monospace',
    wordWrap: 'break-word'
  },

  ITALIC: {
    fontStyle: 'italic'
  },

  STRIKETHROUGH: {
    textDecoration: 'line-through'
  },

  UNDERLINE: {
    textDecoration: 'underline'
  }
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

var Keys = {
  BACKSPACE: 8,
  TAB: 9,
  RETURN: 13,
  ALT: 18,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DELETE: 46,
  COMMA: 188,
  PERIOD: 190,
  A: 65,
  Z: 90,
  ZERO: 48,
  NUMPAD_0: 96,
  NUMPAD_9: 105
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getEntityKeyForSelection
 * @format
 * 
 */

/**
 * Return the entity key that should be used when inserting text for the
 * specified target selection, only if the entity is `MUTABLE`. `IMMUTABLE`
 * and `SEGMENTED` entities should not be used for insertion behavior.
 */
function getEntityKeyForSelection(contentState, targetSelection) {
  var entityKey;

  if (targetSelection.isCollapsed()) {
    var key = targetSelection.getAnchorKey();
    var offset = targetSelection.getAnchorOffset();
    if (offset > 0) {
      entityKey = contentState.getBlockForKey(key).getEntityAt(offset - 1);
      if (entityKey !== contentState.getBlockForKey(key).getEntityAt(offset)) {
        return null;
      }
      return filterKey(contentState.getEntityMap(), entityKey);
    }
    return null;
  }

  var startKey = targetSelection.getStartKey();
  var startOffset = targetSelection.getStartOffset();
  var startBlock = contentState.getBlockForKey(startKey);

  entityKey = startOffset === startBlock.getLength() ? null : startBlock.getEntityAt(startOffset);

  return filterKey(contentState.getEntityMap(), entityKey);
}

/**
 * Determine whether an entity key corresponds to a `MUTABLE` entity. If so,
 * return it. If not, return null.
 */
function filterKey(entityMap, entityKey) {
  if (entityKey) {
    var entity = entityMap.__get(entityKey);
    return entity.getMutability() === 'MUTABLE' ? entityKey : null;
  }
  return null;
}

var getEntityKeyForSelection_1 = getEntityKeyForSelection;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule isEventHandled
 * @format
 * 
 */

/**
 * Utility method for determining whether or not the value returned
 * from a handler indicates that it was handled.
 */
function isEventHandled(value) {
  return value === 'handled' || value === true;
}

var isEventHandled_1 = isEventHandled;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule isSelectionAtLeafStart
 * @format
 * 
 */

function isSelectionAtLeafStart(editorState) {
  var selection = editorState.getSelection();
  var anchorKey = selection.getAnchorKey();
  var blockTree = editorState.getBlockTree(anchorKey);
  var offset = selection.getStartOffset();

  var isAtStart = false;

  blockTree.some(function (leafSet) {
    if (offset === leafSet.get('start')) {
      isAtStart = true;
      return true;
    }

    if (offset < leafSet.get('end')) {
      return leafSet.get('leaves').some(function (leaf) {
        var leafStart = leaf.get('start');
        if (offset === leafStart) {
          isAtStart = true;
          return true;
        }

        return false;
      });
    }

    return false;
  });

  return isAtStart;
}

var isSelectionAtLeafStart_1 = isSelectionAtLeafStart;

/**
 * Millisecond delay to allow `compositionstart` to fire again upon
 * `compositionend`.
 *
 * This is used for Korean input to ensure that typing can continue without
 * the editor trying to render too quickly. More specifically, Safari 7.1+
 * triggers `compositionstart` a little slower than Chrome/FF, which
 * leads to composed characters being resolved and re-render occurring
 * sooner than we want.
 */
var RESOLVE_DELAY = 20;

/**
 * A handful of variables used to track the current composition and its
 * resolution status. These exist at the module level because it is not
 * possible to have compositions occurring in multiple editors simultaneously,
 * and it simplifies state management with respect to the DraftEditor component.
 */
var resolved = false;
var stillComposing = false;
var textInputData = '';

var DraftEditorCompositionHandler = {
  onBeforeInput: function onBeforeInput(editor$$1, e) {
    textInputData = (textInputData || '') + e.data;
  },

  /**
   * A `compositionstart` event has fired while we're still in composition
   * mode. Continue the current composition session to prevent a re-render.
   */
  onCompositionStart: function onCompositionStart(editor$$1) {
    stillComposing = true;
  },

  /**
   * Attempt to end the current composition session.
   *
   * Defer handling because browser will still insert the chars into active
   * element after `compositionend`. If a `compositionstart` event fires
   * before `resolveComposition` executes, our composition session will
   * continue.
   *
   * The `resolved` flag is useful because certain IME interfaces fire the
   * `compositionend` event multiple times, thus queueing up multiple attempts
   * at handling the composition. Since handling the same composition event
   * twice could break the DOM, we only use the first event. Example: Arabic
   * Google Input Tools on Windows 8.1 fires `compositionend` three times.
   */
  onCompositionEnd: function onCompositionEnd(editor$$1) {
    resolved = false;
    stillComposing = false;
    setTimeout(function () {
      if (!resolved) {
        DraftEditorCompositionHandler.resolveComposition(editor$$1);
      }
    }, RESOLVE_DELAY);
  },

  /**
   * In Safari, keydown events may fire when committing compositions. If
   * the arrow keys are used to commit, prevent default so that the cursor
   * doesn't move, otherwise it will jump back noticeably on re-render.
   */
  onKeyDown: function onKeyDown(editor$$1, e) {
    if (!stillComposing) {
      // If a keydown event is received after compositionend but before the
      // 20ms timer expires (ex: type option-E then backspace, or type A then
      // backspace in 2-Set Korean), we should immediately resolve the
      // composition and reinterpret the key press in edit mode.
      DraftEditorCompositionHandler.resolveComposition(editor$$1);
      editor$$1._onKeyDown(e);
      return;
    }
    if (e.which === Keys.RIGHT || e.which === Keys.LEFT) {
      e.preventDefault();
    }
  },

  /**
   * Keypress events may fire when committing compositions. In Firefox,
   * pressing RETURN commits the composition and inserts extra newline
   * characters that we do not want. `preventDefault` allows the composition
   * to be committed while preventing the extra characters.
   */
  onKeyPress: function onKeyPress(editor$$1, e) {
    if (e.which === Keys.RETURN) {
      e.preventDefault();
    }
  },

  /**
   * Attempt to insert composed characters into the document.
   *
   * If we are still in a composition session, do nothing. Otherwise, insert
   * the characters into the document and terminate the composition session.
   *
   * If no characters were composed -- for instance, the user
   * deleted all composed characters and committed nothing new --
   * force a re-render. We also re-render when the composition occurs
   * at the beginning of a leaf, to ensure that if the browser has
   * created a new text node for the composition, we will discard it.
   *
   * Resetting innerHTML will move focus to the beginning of the editor,
   * so we update to force it back to the correct place.
   */
  resolveComposition: function resolveComposition(editor$$1) {
    if (stillComposing) {
      return;
    }

    resolved = true;
    var composedChars = textInputData;
    textInputData = '';

    var editorState = EditorState_1.set(editor$$1._latestEditorState, {
      inCompositionMode: false
    });

    var currentStyle = editorState.getCurrentInlineStyle();
    var entityKey = getEntityKeyForSelection_1(editorState.getCurrentContent(), editorState.getSelection());

    var mustReset = !composedChars || isSelectionAtLeafStart_1(editorState) || currentStyle.size > 0 || entityKey !== null;

    if (mustReset) {
      editor$$1.restoreEditorDOM();
    }

    editor$$1.exitCurrentMode();

    if (composedChars) {
      // If characters have been composed, re-rendering with the update
      // is sufficient to reset the editor.
      var contentState = DraftModifier_1.replaceText(editorState.getCurrentContent(), editorState.getSelection(), composedChars, currentStyle, entityKey);
      editor$$1.update(EditorState_1.push(editorState, contentState, 'insert-characters'));
      return;
    }

    if (mustReset) {
      editor$$1.update(EditorState_1.set(editorState, {
        nativelyRenderedContent: null,
        forceSelection: true
      }));
    }
  }
};

var DraftEditorCompositionHandler_1 = DraftEditorCompositionHandler;

var uaParser = createCommonjsModule(function (module, exports) {
/*!
 * UAParser.js v0.7.18
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
 * Dual licensed under GPLv2 or MIT
 */

(function (window, undefined) {

    //////////////
    // Constants
    /////////////


    var LIBVERSION  = '0.7.18',
        EMPTY       = '',
        UNKNOWN     = '?',
        FUNC_TYPE   = 'function',
        UNDEF_TYPE  = 'undefined',
        OBJ_TYPE    = 'object',
        STR_TYPE    = 'string',
        MAJOR       = 'major', // deprecated
        MODEL       = 'model',
        NAME        = 'name',
        TYPE        = 'type',
        VENDOR      = 'vendor',
        VERSION     = 'version',
        ARCHITECTURE= 'architecture',
        CONSOLE     = 'console',
        MOBILE      = 'mobile',
        TABLET      = 'tablet',
        SMARTTV     = 'smarttv',
        WEARABLE    = 'wearable',
        EMBEDDED    = 'embedded';


    ///////////
    // Helper
    //////////


    var util = {
        extend : function (regexes, extensions) {
            var margedRegexes = {};
            for (var i in regexes) {
                if (extensions[i] && extensions[i].length % 2 === 0) {
                    margedRegexes[i] = extensions[i].concat(regexes[i]);
                } else {
                    margedRegexes[i] = regexes[i];
                }
            }
            return margedRegexes;
        },
        has : function (str1, str2) {
          if (typeof str1 === "string") {
            return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
          } else {
            return false;
          }
        },
        lowerize : function (str) {
            return str.toLowerCase();
        },
        major : function (version) {
            return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g,'').split(".")[0] : undefined;
        },
        trim : function (str) {
          return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        }
    };


    ///////////////
    // Map helper
    //////////////


    var mapper = {

        rgx : function (ua, arrays) {

            //var result = {},
            var i = 0, j, k, p, q, matches, match;//, args = arguments;

            /*// construct object barebones
            for (p = 0; p < args[1].length; p++) {
                q = args[1][p];
                result[typeof q === OBJ_TYPE ? q[0] : q] = undefined;
            }*/

            // loop through all regexes maps
            while (i < arrays.length && !matches) {

                var regex = arrays[i],       // even sequence (0,2,4,..)
                    props = arrays[i + 1];   // odd sequence (1,3,5,..)
                j = k = 0;

                // try matching uastring with regexes
                while (j < regex.length && !matches) {

                    matches = regex[j++].exec(ua);

                    if (!!matches) {
                        for (p = 0; p < props.length; p++) {
                            match = matches[++k];
                            q = props[p];
                            // check if given property is actually array
                            if (typeof q === OBJ_TYPE && q.length > 0) {
                                if (q.length == 2) {
                                    if (typeof q[1] == FUNC_TYPE) {
                                        // assign modified match
                                        this[q[0]] = q[1].call(this, match);
                                    } else {
                                        // assign given value, ignore regex match
                                        this[q[0]] = q[1];
                                    }
                                } else if (q.length == 3) {
                                    // check whether function or regex
                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                        // call function (usually string mapper)
                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                                    } else {
                                        // sanitize match using given regex
                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                                    }
                                } else if (q.length == 4) {
                                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                                }
                            } else {
                                this[q] = match ? match : undefined;
                            }
                        }
                    }
                }
                i += 2;
            }
            // console.log(this);
            //return this;
        },

        str : function (str, map) {

            for (var i in map) {
                // check if array
                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                    for (var j = 0; j < map[i].length; j++) {
                        if (util.has(map[i][j], str)) {
                            return (i === UNKNOWN) ? undefined : i;
                        }
                    }
                } else if (util.has(map[i], str)) {
                    return (i === UNKNOWN) ? undefined : i;
                }
            }
            return str;
        }
    };


    ///////////////
    // String map
    //////////////


    var maps = {

        browser : {
            oldsafari : {
                version : {
                    '1.0'   : '/8',
                    '1.2'   : '/1',
                    '1.3'   : '/3',
                    '2.0'   : '/412',
                    '2.0.2' : '/416',
                    '2.0.3' : '/417',
                    '2.0.4' : '/419',
                    '?'     : '/'
                }
            }
        },

        device : {
            amazon : {
                model : {
                    'Fire Phone' : ['SD', 'KF']
                }
            },
            sprint : {
                model : {
                    'Evo Shift 4G' : '7373KT'
                },
                vendor : {
                    'HTC'       : 'APA',
                    'Sprint'    : 'Sprint'
                }
            }
        },

        os : {
            windows : {
                version : {
                    'ME'        : '4.90',
                    'NT 3.11'   : 'NT3.51',
                    'NT 4.0'    : 'NT4.0',
                    '2000'      : 'NT 5.0',
                    'XP'        : ['NT 5.1', 'NT 5.2'],
                    'Vista'     : 'NT 6.0',
                    '7'         : 'NT 6.1',
                    '8'         : 'NT 6.2',
                    '8.1'       : 'NT 6.3',
                    '10'        : ['NT 6.4', 'NT 10.0'],
                    'RT'        : 'ARM'
                }
            }
        }
    };


    //////////////
    // Regex map
    /////////////


    var regexes = {

        browser : [[

            // Presto based
            /(opera\smini)\/([\w\.-]+)/i,                                       // Opera Mini
            /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,                      // Opera Mobi/Tablet
            /(opera).+version\/([\w\.]+)/i,                                     // Opera > 9.80
            /(opera)[\/\s]+([\w\.]+)/i                                          // Opera < 9.80
            ], [NAME, VERSION], [

            /(opios)[\/\s]+([\w\.]+)/i                                          // Opera mini on iphone >= 8.0
            ], [[NAME, 'Opera Mini'], VERSION], [

            /\s(opr)\/([\w\.]+)/i                                               // Opera Webkit
            ], [[NAME, 'Opera'], VERSION], [

            // Mixed
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
                                                                                // Lunascape/Maxthon/Netfront/Jasmine/Blazer

            // Trident based
            /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
                                                                                // Avant/IEMobile/SlimBrowser/Baidu
            /(?:ms|\()(ie)\s([\w\.]+)/i,                                        // Internet Explorer

            // Webkit/KHTML based
            /(rekonq)\/([\w\.]*)/i,                                             // Rekonq
            /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i
                                                                                // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser
            ], [NAME, VERSION], [

            /(trident).+rv[:\s]([\w\.]+).+like\sgecko/i                         // IE11
            ], [[NAME, 'IE'], VERSION], [

            /(edge|edgios|edgea)\/((\d+)?[\w\.]+)/i                             // Microsoft Edge
            ], [[NAME, 'Edge'], VERSION], [

            /(yabrowser)\/([\w\.]+)/i                                           // Yandex
            ], [[NAME, 'Yandex'], VERSION], [

            /(puffin)\/([\w\.]+)/i                                              // Puffin
            ], [[NAME, 'Puffin'], VERSION], [

            /((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i
                                                                                // UCBrowser
            ], [[NAME, 'UCBrowser'], VERSION], [

            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
            ], [[NAME, /_/g, ' '], VERSION], [

            /(micromessenger)\/([\w\.]+)/i                                      // WeChat
            ], [[NAME, 'WeChat'], VERSION], [

            /(qqbrowserlite)\/([\w\.]+)/i                                       // QQBrowserLite
            ], [NAME, VERSION], [

            /(QQ)\/([\d\.]+)/i                                                  // QQ, aka ShouQ
            ], [NAME, VERSION], [

            /m?(qqbrowser)[\/\s]?([\w\.]+)/i                                    // QQBrowser
            ], [NAME, VERSION], [

            /(BIDUBrowser)[\/\s]?([\w\.]+)/i                                    // Baidu Browser
            ], [NAME, VERSION], [

            /(2345Explorer)[\/\s]?([\w\.]+)/i                                   // 2345 Browser
            ], [NAME, VERSION], [

            /(MetaSr)[\/\s]?([\w\.]+)/i                                         // SouGouBrowser
            ], [NAME], [

            /(LBBROWSER)/i                                      // LieBao Browser
            ], [NAME], [

            /xiaomi\/miuibrowser\/([\w\.]+)/i                                   // MIUI Browser
            ], [VERSION, [NAME, 'MIUI Browser']], [

            /;fbav\/([\w\.]+);/i                                                // Facebook App for iOS & Android
            ], [VERSION, [NAME, 'Facebook']], [

            /headlesschrome(?:\/([\w\.]+)|\s)/i                                 // Chrome Headless
            ], [VERSION, [NAME, 'Chrome Headless']], [

            /\swv\).+(chrome)\/([\w\.]+)/i                                      // Chrome WebView
            ], [[NAME, /(.+)/, '$1 WebView'], VERSION], [

            /((?:oculus|samsung)browser)\/([\w\.]+)/i
            ], [[NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION], [                // Oculus / Samsung Browser

            /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i        // Android Browser
            ], [VERSION, [NAME, 'Android Browser']], [

            /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
                                                                                // Chrome/OmniWeb/Arora/Tizen/Nokia
            ], [NAME, VERSION], [

            /(dolfin)\/([\w\.]+)/i                                              // Dolphin
            ], [[NAME, 'Dolphin'], VERSION], [

            /((?:android.+)crmo|crios)\/([\w\.]+)/i                             // Chrome for Android/iOS
            ], [[NAME, 'Chrome'], VERSION], [

            /(coast)\/([\w\.]+)/i                                               // Opera Coast
            ], [[NAME, 'Opera Coast'], VERSION], [

            /fxios\/([\w\.-]+)/i                                                // Firefox for iOS
            ], [VERSION, [NAME, 'Firefox']], [

            /version\/([\w\.]+).+?mobile\/\w+\s(safari)/i                       // Mobile Safari
            ], [VERSION, [NAME, 'Mobile Safari']], [

            /version\/([\w\.]+).+?(mobile\s?safari|safari)/i                    // Safari & Safari Mobile
            ], [VERSION, NAME], [

            /webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i  // Google Search Appliance on iOS
            ], [[NAME, 'GSA'], VERSION], [

            /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i                     // Safari < 3.0
            ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [

            /(konqueror)\/([\w\.]+)/i,                                          // Konqueror
            /(webkit|khtml)\/([\w\.]+)/i
            ], [NAME, VERSION], [

            // Gecko based
            /(navigator|netscape)\/([\w\.-]+)/i                                 // Netscape
            ], [[NAME, 'Netscape'], VERSION], [
            /(swiftfox)/i,                                                      // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,

                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,                          // Mozilla

            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
            /(links)\s\(([\w\.]+)/i,                                            // Links
            /(gobrowser)\/?([\w\.]*)/i,                                         // GoBrowser
            /(ice\s?browser)\/v?([\w\._]+)/i,                                   // ICE Browser
            /(mosaic)[\/\s]([\w\.]+)/i                                          // Mosaic
            ], [NAME, VERSION]

            /* /////////////////////
            // Media players BEGIN
            ////////////////////////

            , [

            /(apple(?:coremedia|))\/((\d+)[\w\._]+)/i,                          // Generic Apple CoreMedia
            /(coremedia) v((\d+)[\w\._]+)/i
            ], [NAME, VERSION], [

            /(aqualung|lyssna|bsplayer)\/((\d+)?[\w\.-]+)/i                     // Aqualung/Lyssna/BSPlayer
            ], [NAME, VERSION], [

            /(ares|ossproxy)\s((\d+)[\w\.-]+)/i                                 // Ares/OSSProxy
            ], [NAME, VERSION], [

            /(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/((\d+)[\w\.-]+)/i,
                                                                                // Audacious/AudiMusicStream/Amarok/BASS/OpenCORE/Dalvik/GnomeMplayer/MoC
                                                                                // NSPlayer/PSP-InternetRadioPlayer/Videos
            /(clementine|music player daemon)\s((\d+)[\w\.-]+)/i,               // Clementine/MPD
            /(lg player|nexplayer)\s((\d+)[\d\.]+)/i,
            /player\/(nexplayer|lg player)\s((\d+)[\w\.-]+)/i                   // NexPlayer/LG Player
            ], [NAME, VERSION], [
            /(nexplayer)\s((\d+)[\w\.-]+)/i                                     // Nexplayer
            ], [NAME, VERSION], [

            /(flrp)\/((\d+)[\w\.-]+)/i                                          // Flip Player
            ], [[NAME, 'Flip Player'], VERSION], [

            /(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i
                                                                                // FStream/NativeHost/QuerySeekSpider/IA Archiver/facebookexternalhit
            ], [NAME], [

            /(gstreamer) souphttpsrc (?:\([^\)]+\)){0,1} libsoup\/((\d+)[\w\.-]+)/i
                                                                                // Gstreamer
            ], [NAME, VERSION], [

            /(htc streaming player)\s[\w_]+\s\/\s((\d+)[\d\.]+)/i,              // HTC Streaming Player
            /(java|python-urllib|python-requests|wget|libcurl)\/((\d+)[\w\.-_]+)/i,
                                                                                // Java/urllib/requests/wget/cURL
            /(lavf)((\d+)[\d\.]+)/i                                             // Lavf (FFMPEG)
            ], [NAME, VERSION], [

            /(htc_one_s)\/((\d+)[\d\.]+)/i                                      // HTC One S
            ], [[NAME, /_/g, ' '], VERSION], [

            /(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+){0,1})/i
                                                                                // MPlayer SVN
            ], [NAME, VERSION], [

            /(mplayer)(?:\s|\/|[unkow-]+)((\d+)[\w\.-]+)/i                      // MPlayer
            ], [NAME, VERSION], [

            /(mplayer)/i,                                                       // MPlayer (no other info)
            /(yourmuze)/i,                                                      // YourMuze
            /(media player classic|nero showtime)/i                             // Media Player Classic/Nero ShowTime
            ], [NAME], [

            /(nero (?:home|scout))\/((\d+)[\w\.-]+)/i                           // Nero Home/Nero Scout
            ], [NAME, VERSION], [

            /(nokia\d+)\/((\d+)[\w\.-]+)/i                                      // Nokia
            ], [NAME, VERSION], [

            /\s(songbird)\/((\d+)[\w\.-]+)/i                                    // Songbird/Philips-Songbird
            ], [NAME, VERSION], [

            /(winamp)3 version ((\d+)[\w\.-]+)/i,                               // Winamp
            /(winamp)\s((\d+)[\w\.-]+)/i,
            /(winamp)mpeg\/((\d+)[\w\.-]+)/i
            ], [NAME, VERSION], [

            /(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i  // OCMS-bot/tap in radio/tunein/unknown/winamp (no other info)
                                                                                // inlight radio
            ], [NAME], [

            /(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/((\d+)[\w\.-]+)/i
                                                                                // QuickTime/RealMedia/RadioApp/RadioClientApplication/
                                                                                // SoundTap/Totem/Stagefright/Streamium
            ], [NAME, VERSION], [

            /(smp)((\d+)[\d\.]+)/i                                              // SMP
            ], [NAME, VERSION], [

            /(vlc) media player - version ((\d+)[\w\.]+)/i,                     // VLC Videolan
            /(vlc)\/((\d+)[\w\.-]+)/i,
            /(xbmc|gvfs|xine|xmms|irapp)\/((\d+)[\w\.-]+)/i,                    // XBMC/gvfs/Xine/XMMS/irapp
            /(foobar2000)\/((\d+)[\d\.]+)/i,                                    // Foobar2000
            /(itunes)\/((\d+)[\d\.]+)/i                                         // iTunes
            ], [NAME, VERSION], [

            /(wmplayer)\/((\d+)[\w\.-]+)/i,                                     // Windows Media Player
            /(windows-media-player)\/((\d+)[\w\.-]+)/i
            ], [[NAME, /-/g, ' '], VERSION], [

            /windows\/((\d+)[\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i
                                                                                // Windows Media Server
            ], [VERSION, [NAME, 'Windows']], [

            /(com\.riseupradioalarm)\/((\d+)[\d\.]*)/i                          // RiseUP Radio Alarm
            ], [NAME, VERSION], [

            /(rad.io)\s((\d+)[\d\.]+)/i,                                        // Rad.io
            /(radio.(?:de|at|fr))\s((\d+)[\d\.]+)/i
            ], [[NAME, 'rad.io'], VERSION]

            //////////////////////
            // Media players END
            ////////////////////*/

        ],

        cpu : [[

            /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i                     // AMD64
            ], [[ARCHITECTURE, 'amd64']], [

            /(ia32(?=;))/i                                                      // IA32 (quicktime)
            ], [[ARCHITECTURE, util.lowerize]], [

            /((?:i[346]|x)86)[;\)]/i                                            // IA32
            ], [[ARCHITECTURE, 'ia32']], [

            // PocketPC mistakenly identified as PowerPC
            /windows\s(ce|mobile);\sppc;/i
            ], [[ARCHITECTURE, 'arm']], [

            /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i                           // PowerPC
            ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [

            /(sun4\w)[;\)]/i                                                    // SPARC
            ], [[ARCHITECTURE, 'sparc']], [

            /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
            ], [[ARCHITECTURE, util.lowerize]]
        ],

        device : [[

            /\((ipad|playbook);[\w\s\);-]+(rim|apple)/i                         // iPad/PlayBook
            ], [MODEL, VENDOR, [TYPE, TABLET]], [

            /applecoremedia\/[\w\.]+ \((ipad)/                                  // iPad
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [

            /(apple\s{0,1}tv)/i                                                 // Apple TV
            ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple']], [

            /(archos)\s(gamepad2?)/i,                                           // Archos
            /(hp).+(touchpad)/i,                                                // HP TouchPad
            /(hp).+(tablet)/i,                                                  // HP Tablet
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /\s(nook)[\w\s]+build\/(\w+)/i,                                     // Nook
            /(dell)\s(strea[kpr\s\d]*[\dko])/i                                  // Dell Streak
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(kf[A-z]+)\sbuild\/.+silk\//i                                      // Kindle Fire HD
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [
            /(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i                         // Fire Phone
            ], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [

            /\((ip[honed|\s\w*]+);.+(apple)/i                                   // iPod/iPhone
            ], [MODEL, VENDOR, [TYPE, MOBILE]], [
            /\((ip[honed|\s\w*]+);/i                                            // iPod/iPhone
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [

            /(blackberry)[\s-]?(\w+)/i,                                         // BlackBerry
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
                                                                                // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
            /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
            /(asus)-?(\w+)/i                                                    // Asus
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /\(bb10;\s(\w+)/i                                                   // BlackBerry 10
            ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [
                                                                                // Asus Tablets
            /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i
            ], [MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [

            /(sony)\s(tablet\s[ps])\sbuild\//i,                                  // Sony
            /(sony)?(?:sgp.+)\sbuild\//i
            ], [[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [
            /android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i
            ], [MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [

            /\s(ouya)\s/i,                                                      // Ouya
            /(nintendo)\s([wids3u]+)/i                                          // Nintendo
            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [

            /android.+;\s(shield)\sbuild/i                                      // Nvidia
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [

            /(playstation\s[34portablevi]+)/i                                   // Playstation
            ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [

            /(sprint\s(\w+))/i                                                  // Sprint Phones
            ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [

            /(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i                         // Lenovo tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,                               // HTC
            /(zte)-(\w*)/i,                                                     // ZTE
            /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i
                                                                                // Alcatel/GeeksPhone/Lenovo/Nexian/Panasonic/Sony
            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

            /(nexus\s9)/i                                                       // HTC Nexus 9
            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [

            /d\/huawei([\w\s-]+)[;\)]/i,
            /(nexus\s6p)/i                                                      // Huawei
            ], [MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [

            /(microsoft);\s(lumia[\s\w]+)/i                                     // Microsoft Lumia
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /[\s\(;](xbox(?:\sone)?)[\s\);]/i                                   // Microsoft Xbox
            ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [
            /(kin\.[onetw]{3})/i                                                // Microsoft Kin
            ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [

                                                                                // Motorola
            /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,
            /mot[\s-]?(\w*)/i,
            /(XT\d{3,4}) build\//i,
            /(nexus\s6)/i
            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [
            /android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [

            /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i            // HbbTV devices
            ], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [

            /hbbtv.+maple;(\d+)/i
            ], [[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [

            /\(dtv[\);].+(aquos)/i                                              // Sharp
            ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [

            /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
            /((SM-T\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [                  // Samsung
            /smart-tv.+(samsung)/i
            ], [VENDOR, [TYPE, SMARTTV], MODEL], [
            /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
            /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,
            /sec-((sgh\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [

            /sie-(\w*)/i                                                        // Siemens
            ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [

            /(maemo|nokia).*(n900|lumia\s\d+)/i,                                // Nokia
            /(nokia)[\s_-]?([\w-]*)/i
            ], [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [

            /android\s3\.[\s\w;-]{10}(a\d{3})/i                                 // Acer
            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

            /android.+([vl]k\-?\d{3})\s+build/i                                 // LG Tablet
            ], [MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [
            /android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i                     // LG Tablet
            ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [
            /(lg) netcast\.tv/i                                                 // LG SmartTV
            ], [VENDOR, MODEL, [TYPE, SMARTTV]], [
            /(nexus\s[45])/i,                                                   // LG
            /lg[e;\s\/-]+(\w*)/i,
            /android.+lg(\-?[\d\w]+)\s+build/i
            ], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [

            /android.+(ideatab[a-z0-9\-\s]+)/i                                  // Lenovo
            ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [

            /linux;.+((jolla));/i                                               // Jolla
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /((pebble))app\/[\d\.]+\s/i                                         // Pebble
            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [

            /android.+;\s(oppo)\s?([\w\s]+)\sbuild/i                            // OPPO
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /crkey/i                                                            // Google Chromecast
            ], [[MODEL, 'Chromecast'], [VENDOR, 'Google']], [

            /android.+;\s(glass)\s\d/i                                          // Google Glass
            ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [

            /android.+;\s(pixel c)\s/i                                          // Google Pixel C
            ], [MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [

            /android.+;\s(pixel xl|pixel)\s/i                                   // Google Pixel
            ], [MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [

            /android.+;\s(\w+)\s+build\/hm\1/i,                                 // Xiaomi Hongmi 'numeric' models
            /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,               // Xiaomi Hongmi
            /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,    // Xiaomi Mi
            /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i       // Redmi Phones
            ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [
            /android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i            // Mi Pad tablets
            ],[[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, TABLET]], [
            /android.+;\s(m[1-5]\snote)\sbuild/i                                // Meizu Tablet
            ], [MODEL, [VENDOR, 'Meizu'], [TYPE, TABLET]], [

            /android.+a000(1)\s+build/i,                                        // OnePlus
            /android.+oneplus\s(a\d{4})\s+build/i
            ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

            /android.+[;\/]\s*(RCT[\d\w]+)\s+build/i                            // RCA Tablets
            ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [

            /android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i                      // Dell Venue Tablets
            ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i                         // Verizon Tablet
            ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [

            /android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i     // Barnes & Noble Tablet
            ], [[VENDOR, 'Barnes & Noble'], MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i                           // Barnes & Noble Tablet
            ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [

            /android.+;\s(k88)\sbuild/i                                         // ZTE K Series Tablet
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(gen\d{3})\s+build.*49h/i                         // Swiss GEN Mobile
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [

            /android.+[;\/]\s*(zur\d{3})\s+build/i                              // Swiss ZUR Tablet
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [

            /android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i                         // Zeki Tablets
            ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [

            /(android).+[;\/]\s+([YR]\d{2})\s+build/i,
            /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i        // Dragon Touch Tablet
            ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i                            // Insignia Tablets
            ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [

            /android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i                    // NextBook Tablets
            ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i
            ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [                    // Voice Xtreme Phones

            /android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i                     // LvTel Phones
            ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [

            /android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i          // Envizen Tablets
            ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i          // Le Pan Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i                         // MachSpeed Tablets
            ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i                // Trinity Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*TU_(1491)\s+build/i                               // Rotor Tablets
            ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [

            /android.+(KS(.+))\s+build/i                                        // Amazon Kindle Tablets
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [

            /android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i                      // Gigaset Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /\s(tablet|tab)[;\/]/i,                                             // Unidentifiable Tablet
            /\s(mobile)(?:[;\/]|\ssafari)/i                                     // Unidentifiable Mobile
            ], [[TYPE, util.lowerize], VENDOR, MODEL], [

            /(android[\w\.\s\-]{0,9});.+build/i                                 // Generic Android Device
            ], [MODEL, [VENDOR, 'Generic']]


        /*//////////////////////////
            // TODO: move to string map
            ////////////////////////////

            /(C6603)/i                                                          // Sony Xperia Z C6603
            ], [[MODEL, 'Xperia Z C6603'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
            /(C6903)/i                                                          // Sony Xperia Z 1
            ], [[MODEL, 'Xperia Z 1'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [

            /(SM-G900[F|H])/i                                                   // Samsung Galaxy S5
            ], [[MODEL, 'Galaxy S5'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-G7102)/i                                                       // Samsung Galaxy Grand 2
            ], [[MODEL, 'Galaxy Grand 2'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-G530H)/i                                                       // Samsung Galaxy Grand Prime
            ], [[MODEL, 'Galaxy Grand Prime'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-G313HZ)/i                                                      // Samsung Galaxy V
            ], [[MODEL, 'Galaxy V'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-T805)/i                                                        // Samsung Galaxy Tab S 10.5
            ], [[MODEL, 'Galaxy Tab S 10.5'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
            /(SM-G800F)/i                                                       // Samsung Galaxy S5 Mini
            ], [[MODEL, 'Galaxy S5 Mini'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-T311)/i                                                        // Samsung Galaxy Tab 3 8.0
            ], [[MODEL, 'Galaxy Tab 3 8.0'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [

            /(T3C)/i                                                            // Advan Vandroid T3C
            ], [MODEL, [VENDOR, 'Advan'], [TYPE, TABLET]], [
            /(ADVAN T1J\+)/i                                                    // Advan Vandroid T1J+
            ], [[MODEL, 'Vandroid T1J+'], [VENDOR, 'Advan'], [TYPE, TABLET]], [
            /(ADVAN S4A)/i                                                      // Advan Vandroid S4A
            ], [[MODEL, 'Vandroid S4A'], [VENDOR, 'Advan'], [TYPE, MOBILE]], [

            /(V972M)/i                                                          // ZTE V972M
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [

            /(i-mobile)\s(IQ\s[\d\.]+)/i                                        // i-mobile IQ
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /(IQ6.3)/i                                                          // i-mobile IQ IQ 6.3
            ], [[MODEL, 'IQ 6.3'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
            /(i-mobile)\s(i-style\s[\d\.]+)/i                                   // i-mobile i-STYLE
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /(i-STYLE2.1)/i                                                     // i-mobile i-STYLE 2.1
            ], [[MODEL, 'i-STYLE 2.1'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [

            /(mobiistar touch LAI 512)/i                                        // mobiistar touch LAI 512
            ], [[MODEL, 'Touch LAI 512'], [VENDOR, 'mobiistar'], [TYPE, MOBILE]], [

            /////////////
            // END TODO
            ///////////*/

        ],

        engine : [[

            /windows.+\sedge\/([\w\.]+)/i                                       // EdgeHTML
            ], [VERSION, [NAME, 'EdgeHTML']], [

            /(presto)\/([\w\.]+)/i,                                             // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,     // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
            /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
            ], [NAME, VERSION], [

            /rv\:([\w\.]{1,9}).+(gecko)/i                                       // Gecko
            ], [VERSION, NAME]
        ],

        os : [[

            // Windows based
            /microsoft\s(windows)\s(vista|xp)/i                                 // Windows (iTunes)
            ], [NAME, VERSION], [
            /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
            /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,                   // Windows Phone
            /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
            ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
            /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
            ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

            // Mobile/Embedded OS
            /\((bb)(10);/i                                                      // BlackBerry 10
            ], [[NAME, 'BlackBerry'], VERSION], [
            /(blackberry)\w*\/?([\w\.]*)/i,                                     // Blackberry
            /(tizen)[\/\s]([\w\.]+)/i,                                          // Tizen
            /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]*)/i,
                                                                                // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki
            /linux;.+(sailfish);/i                                              // Sailfish OS
            ], [NAME, VERSION], [
            /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i                  // Symbian
            ], [[NAME, 'Symbian'], VERSION], [
            /\((series40);/i                                                    // Series 40
            ], [NAME], [
            /mozilla.+\(mobile;.+gecko.+firefox/i                               // Firefox OS
            ], [[NAME, 'Firefox OS'], VERSION], [

            // Console
            /(nintendo|playstation)\s([wids34portablevu]+)/i,                   // Nintendo/Playstation

            // GNU/Linux based
            /(mint)[\/\s\(]?(\w*)/i,                                            // Mint
            /(mageia|vectorlinux)[;\s]/i,                                       // Mageia/VectorLinux
            /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
            /(hurd|linux)\s?([\w\.]*)/i,                                        // Hurd/Linux
            /(gnu)\s?([\w\.]*)/i                                                // GNU
            ], [NAME, VERSION], [

            /(cros)\s[\w]+\s([\w\.]+\w)/i                                       // Chromium OS
            ], [[NAME, 'Chromium OS'], VERSION],[

            // Solaris
            /(sunos)\s?([\w\.\d]*)/i                                            // Solaris
            ], [[NAME, 'Solaris'], VERSION], [

            // BSD based
            /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i                    // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
            ], [NAME, VERSION],[

            /(haiku)\s(\w+)/i                                                   // Haiku
            ], [NAME, VERSION],[

            /cfnetwork\/.+darwin/i,
            /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i             // iOS
            ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [

            /(mac\sos\sx)\s?([\w\s\.]*)/i,
            /(macintosh|mac(?=_powerpc)\s)/i                                    // Mac OS
            ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

            // Other
            /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,                             // Solaris
            /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,                                // AIX
            /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,
                                                                                // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS
            /(unix)\s?([\w\.]*)/i                                               // UNIX
            ], [NAME, VERSION]
        ]
    };


    /////////////////
    // Constructor
    ////////////////
    /*
    var Browser = function (name, version) {
        this[NAME] = name;
        this[VERSION] = version;
    };
    var CPU = function (arch) {
        this[ARCHITECTURE] = arch;
    };
    var Device = function (vendor, model, type) {
        this[VENDOR] = vendor;
        this[MODEL] = model;
        this[TYPE] = type;
    };
    var Engine = Browser;
    var OS = Browser;
    */
    var UAParser = function (uastring, extensions) {

        if (typeof uastring === 'object') {
            extensions = uastring;
            uastring = undefined;
        }

        if (!(this instanceof UAParser)) {
            return new UAParser(uastring, extensions).getResult();
        }

        var ua = uastring || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
        var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;
        //var browser = new Browser();
        //var cpu = new CPU();
        //var device = new Device();
        //var engine = new Engine();
        //var os = new OS();

        this.getBrowser = function () {
            var browser = { name: undefined, version: undefined };
            mapper.rgx.call(browser, ua, rgxmap.browser);
            browser.major = util.major(browser.version); // deprecated
            return browser;
        };
        this.getCPU = function () {
            var cpu = { architecture: undefined };
            mapper.rgx.call(cpu, ua, rgxmap.cpu);
            return cpu;
        };
        this.getDevice = function () {
            var device = { vendor: undefined, model: undefined, type: undefined };
            mapper.rgx.call(device, ua, rgxmap.device);
            return device;
        };
        this.getEngine = function () {
            var engine = { name: undefined, version: undefined };
            mapper.rgx.call(engine, ua, rgxmap.engine);
            return engine;
        };
        this.getOS = function () {
            var os = { name: undefined, version: undefined };
            mapper.rgx.call(os, ua, rgxmap.os);
            return os;
        };
        this.getResult = function () {
            return {
                ua      : this.getUA(),
                browser : this.getBrowser(),
                engine  : this.getEngine(),
                os      : this.getOS(),
                device  : this.getDevice(),
                cpu     : this.getCPU()
            };
        };
        this.getUA = function () {
            return ua;
        };
        this.setUA = function (uastring) {
            ua = uastring;
            //browser = new Browser();
            //cpu = new CPU();
            //device = new Device();
            //engine = new Engine();
            //os = new OS();
            return this;
        };
        return this;
    };

    UAParser.VERSION = LIBVERSION;
    UAParser.BROWSER = {
        NAME    : NAME,
        MAJOR   : MAJOR, // deprecated
        VERSION : VERSION
    };
    UAParser.CPU = {
        ARCHITECTURE : ARCHITECTURE
    };
    UAParser.DEVICE = {
        MODEL   : MODEL,
        VENDOR  : VENDOR,
        TYPE    : TYPE,
        CONSOLE : CONSOLE,
        MOBILE  : MOBILE,
        SMARTTV : SMARTTV,
        TABLET  : TABLET,
        WEARABLE: WEARABLE,
        EMBEDDED: EMBEDDED
    };
    UAParser.ENGINE = {
        NAME    : NAME,
        VERSION : VERSION
    };
    UAParser.OS = {
        NAME    : NAME,
        VERSION : VERSION
    };
    //UAParser.Utils = util;

    ///////////
    // Export
    //////////


    // check js environment
    {
        // nodejs env
        if (module.exports) {
            exports = module.exports = UAParser;
        }
        // TODO: test!!!!!!!!
        /*
        if (require && require.main === module && process) {
            // cli
            var jsonize = function (arr) {
                var res = [];
                for (var i in arr) {
                    res.push(new UAParser(arr[i]).getResult());
                }
                process.stdout.write(JSON.stringify(res, null, 2) + '\n');
            };
            if (process.stdin.isTTY) {
                // via args
                jsonize(process.argv.slice(2));
            } else {
                // via pipe
                var str = '';
                process.stdin.on('readable', function() {
                    var read = process.stdin.read();
                    if (read !== null) {
                        str += read;
                    }
                });
                process.stdin.on('end', function () {
                    jsonize(str.replace(/\n$/, '').split('\n'));
                });
            }
        }
        */
        exports.UAParser = UAParser;
    }

    // jQuery/Zepto specific (optional)
    // Note:
    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
    //   and we should catch that.
    var $ = window && (window.jQuery || window.Zepto);
    if (typeof $ !== UNDEF_TYPE) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function () {
            return parser.getUA();
        };
        $.ua.set = function (uastring) {
            parser.setUA(uastring);
            var result = parser.getResult();
            for (var prop in result) {
                $.ua[prop] = result[prop];
            }
        };
    }

})(typeof window === 'object' ? window : commonjsGlobal);
});
var uaParser_1 = uaParser.UAParser;

var UNKNOWN = 'Unknown';

var PLATFORM_MAP = {
  'Mac OS': 'Mac OS X'
};

/**
 * Convert from UAParser platform name to what we expect.
 */
function convertPlatformName(name) {
  return PLATFORM_MAP[name] || name;
}

/**
 * Get the version number in parts. This is very naive. We actually get major
 * version as a part of UAParser already, which is generally good enough, but
 * let's get the minor just in case.
 */
function getBrowserVersion(version) {
  if (!version) {
    return {
      major: '',
      minor: ''
    };
  }
  var parts = version.split('.');
  return {
    major: parts[0],
    minor: parts[1]
  };
}

/**
 * Get the UA data fom UAParser and then convert it to the format we're
 * expecting for our APIS.
 */
var parser = new uaParser();
var results = parser.getResult();

// Do some conversion first.
var browserVersionData = getBrowserVersion(results.browser.version);
var uaData = {
  browserArchitecture: results.cpu.architecture || UNKNOWN,
  browserFullVersion: results.browser.version || UNKNOWN,
  browserMinorVersion: browserVersionData.minor || UNKNOWN,
  browserName: results.browser.name || UNKNOWN,
  browserVersion: results.browser.major || UNKNOWN,
  deviceName: results.device.model || UNKNOWN,
  engineName: results.engine.name || UNKNOWN,
  engineVersion: results.engine.version || UNKNOWN,
  platformArchitecture: results.cpu.architecture || UNKNOWN,
  platformName: convertPlatformName(results.os.name) || UNKNOWN,
  platformVersion: results.os.version || UNKNOWN,
  platformFullVersion: results.os.version || UNKNOWN
};

var UserAgentData = uaData;

var componentRegex = /\./;
var orRegex = /\|\|/;
var rangeRegex = /\s+\-\s+/;
var modifierRegex = /^(<=|<|=|>=|~>|~|>|)?\s*(.+)/;
var numericRegex = /^(\d*)(.*)/;

/**
 * Splits input `range` on "||" and returns true if any subrange matches
 * `version`.
 *
 * @param {string} range
 * @param {string} version
 * @returns {boolean}
 */
function checkOrExpression(range, version) {
  var expressions = range.split(orRegex);

  if (expressions.length > 1) {
    return expressions.some(function (range) {
      return VersionRange.contains(range, version);
    });
  } else {
    range = expressions[0].trim();
    return checkRangeExpression(range, version);
  }
}

/**
 * Splits input `range` on " - " (the surrounding whitespace is required) and
 * returns true if version falls between the two operands.
 *
 * @param {string} range
 * @param {string} version
 * @returns {boolean}
 */
function checkRangeExpression(range, version) {
  var expressions = range.split(rangeRegex);

  !(expressions.length > 0 && expressions.length <= 2) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'the "-" operator expects exactly 2 operands') : invariant_1(false) : void 0;

  if (expressions.length === 1) {
    return checkSimpleExpression(expressions[0], version);
  } else {
    var startVersion = expressions[0],
        endVersion = expressions[1];

    !(isSimpleVersion(startVersion) && isSimpleVersion(endVersion)) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'operands to the "-" operator must be simple (no modifiers)') : invariant_1(false) : void 0;

    return checkSimpleExpression('>=' + startVersion, version) && checkSimpleExpression('<=' + endVersion, version);
  }
}

/**
 * Checks if `range` matches `version`. `range` should be a "simple" range (ie.
 * not a compound range using the " - " or "||" operators).
 *
 * @param {string} range
 * @param {string} version
 * @returns {boolean}
 */
function checkSimpleExpression(range, version) {
  range = range.trim();
  if (range === '') {
    return true;
  }

  var versionComponents = version.split(componentRegex);

  var _getModifierAndCompon = getModifierAndComponents(range),
      modifier = _getModifierAndCompon.modifier,
      rangeComponents = _getModifierAndCompon.rangeComponents;

  switch (modifier) {
    case '<':
      return checkLessThan(versionComponents, rangeComponents);
    case '<=':
      return checkLessThanOrEqual(versionComponents, rangeComponents);
    case '>=':
      return checkGreaterThanOrEqual(versionComponents, rangeComponents);
    case '>':
      return checkGreaterThan(versionComponents, rangeComponents);
    case '~':
    case '~>':
      return checkApproximateVersion(versionComponents, rangeComponents);
    default:
      return checkEqual(versionComponents, rangeComponents);
  }
}

/**
 * Checks whether `a` is less than `b`.
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {boolean}
 */
function checkLessThan(a, b) {
  return compareComponents(a, b) === -1;
}

/**
 * Checks whether `a` is less than or equal to `b`.
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {boolean}
 */
function checkLessThanOrEqual(a, b) {
  var result = compareComponents(a, b);
  return result === -1 || result === 0;
}

/**
 * Checks whether `a` is equal to `b`.
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {boolean}
 */
function checkEqual(a, b) {
  return compareComponents(a, b) === 0;
}

/**
 * Checks whether `a` is greater than or equal to `b`.
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {boolean}
 */
function checkGreaterThanOrEqual(a, b) {
  var result = compareComponents(a, b);
  return result === 1 || result === 0;
}

/**
 * Checks whether `a` is greater than `b`.
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {boolean}
 */
function checkGreaterThan(a, b) {
  return compareComponents(a, b) === 1;
}

/**
 * Checks whether `a` is "reasonably close" to `b` (as described in
 * https://www.npmjs.org/doc/misc/semver.html). For example, if `b` is "1.3.1"
 * then "reasonably close" is defined as ">= 1.3.1 and < 1.4".
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {boolean}
 */
function checkApproximateVersion(a, b) {
  var lowerBound = b.slice();
  var upperBound = b.slice();

  if (upperBound.length > 1) {
    upperBound.pop();
  }
  var lastIndex = upperBound.length - 1;
  var numeric = parseInt(upperBound[lastIndex], 10);
  if (isNumber(numeric)) {
    upperBound[lastIndex] = numeric + 1 + '';
  }

  return checkGreaterThanOrEqual(a, lowerBound) && checkLessThan(a, upperBound);
}

/**
 * Extracts the optional modifier (<, <=, =, >=, >, ~, ~>) and version
 * components from `range`.
 *
 * For example, given `range` ">= 1.2.3" returns an object with a `modifier` of
 * `">="` and `components` of `[1, 2, 3]`.
 *
 * @param {string} range
 * @returns {object}
 */
function getModifierAndComponents(range) {
  var rangeComponents = range.split(componentRegex);
  var matches = rangeComponents[0].match(modifierRegex);
  !matches ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'expected regex to match but it did not') : invariant_1(false) : void 0;

  return {
    modifier: matches[1],
    rangeComponents: [matches[2]].concat(rangeComponents.slice(1))
  };
}

/**
 * Determines if `number` is a number.
 *
 * @param {mixed} number
 * @returns {boolean}
 */
function isNumber(number) {
  return !isNaN(number) && isFinite(number);
}

/**
 * Tests whether `range` is a "simple" version number without any modifiers
 * (">", "~" etc).
 *
 * @param {string} range
 * @returns {boolean}
 */
function isSimpleVersion(range) {
  return !getModifierAndComponents(range).modifier;
}

/**
 * Zero-pads array `array` until it is at least `length` long.
 *
 * @param {array} array
 * @param {number} length
 */
function zeroPad(array, length) {
  for (var i = array.length; i < length; i++) {
    array[i] = '0';
  }
}

/**
 * Normalizes `a` and `b` in preparation for comparison by doing the following:
 *
 * - zero-pads `a` and `b`
 * - marks any "x", "X" or "*" component in `b` as equivalent by zero-ing it out
 *   in both `a` and `b`
 * - marks any final "*" component in `b` as a greedy wildcard by zero-ing it
 *   and all of its successors in `a`
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {array<array<string>>}
 */
function normalizeVersions(a, b) {
  a = a.slice();
  b = b.slice();

  zeroPad(a, b.length);

  // mark "x" and "*" components as equal
  for (var i = 0; i < b.length; i++) {
    var matches = b[i].match(/^[x*]$/i);
    if (matches) {
      b[i] = a[i] = '0';

      // final "*" greedily zeros all remaining components
      if (matches[0] === '*' && i === b.length - 1) {
        for (var j = i; j < a.length; j++) {
          a[j] = '0';
        }
      }
    }
  }

  zeroPad(b, a.length);

  return [a, b];
}

/**
 * Returns the numerical -- not the lexicographical -- ordering of `a` and `b`.
 *
 * For example, `10-alpha` is greater than `2-beta`.
 *
 * @param {string} a
 * @param {string} b
 * @returns {number} -1, 0 or 1 to indicate whether `a` is less than, equal to,
 * or greater than `b`, respectively
 */
function compareNumeric(a, b) {
  var aPrefix = a.match(numericRegex)[1];
  var bPrefix = b.match(numericRegex)[1];
  var aNumeric = parseInt(aPrefix, 10);
  var bNumeric = parseInt(bPrefix, 10);

  if (isNumber(aNumeric) && isNumber(bNumeric) && aNumeric !== bNumeric) {
    return compare(aNumeric, bNumeric);
  } else {
    return compare(a, b);
  }
}

/**
 * Returns the ordering of `a` and `b`.
 *
 * @param {string|number} a
 * @param {string|number} b
 * @returns {number} -1, 0 or 1 to indicate whether `a` is less than, equal to,
 * or greater than `b`, respectively
 */
function compare(a, b) {
  !(typeof a === typeof b) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, '"a" and "b" must be of the same type') : invariant_1(false) : void 0;

  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
}

/**
 * Compares arrays of version components.
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {number} -1, 0 or 1 to indicate whether `a` is less than, equal to,
 * or greater than `b`, respectively
 */
function compareComponents(a, b) {
  var _normalizeVersions = normalizeVersions(a, b),
      aNormalized = _normalizeVersions[0],
      bNormalized = _normalizeVersions[1];

  for (var i = 0; i < bNormalized.length; i++) {
    var result = compareNumeric(aNormalized[i], bNormalized[i]);
    if (result) {
      return result;
    }
  }

  return 0;
}

var VersionRange = {
  /**
   * Checks whether `version` satisfies the `range` specification.
   *
   * We support a subset of the expressions defined in
   * https://www.npmjs.org/doc/misc/semver.html:
   *
   *    version   Must match version exactly
   *    =version  Same as just version
   *    >version  Must be greater than version
   *    >=version Must be greater than or equal to version
   *    <version  Must be less than version
   *    <=version Must be less than or equal to version
   *    ~version  Must be at least version, but less than the next significant
   *              revision above version:
   *              "~1.2.3" is equivalent to ">= 1.2.3 and < 1.3"
   *    ~>version Equivalent to ~version
   *    1.2.x     Must match "1.2.x", where "x" is a wildcard that matches
   *              anything
   *    1.2.*     Similar to "1.2.x", but "*" in the trailing position is a
   *              "greedy" wildcard, so will match any number of additional
   *              components:
   *              "1.2.*" will match "1.2.1", "1.2.1.1", "1.2.1.1.1" etc
   *    *         Any version
   *    ""        (Empty string) Same as *
   *    v1 - v2   Equivalent to ">= v1 and <= v2"
   *    r1 || r2  Passes if either r1 or r2 are satisfied
   *
   * @param {string} range
   * @param {string} version
   * @returns {boolean}
   */
  contains: function contains(range, version) {
    return checkOrExpression(range.trim(), version.trim());
  }
};

var VersionRange_1 = VersionRange;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

/**
 * Executes the provided `callback` once for each enumerable own property in the
 * object and constructs a new object from the results. The `callback` is
 * invoked with three arguments:
 *
 *  - the property value
 *  - the property name
 *  - the object being traversed
 *
 * Properties that are added after the call to `mapObject` will not be visited
 * by `callback`. If the values of existing properties are changed, the value
 * passed to `callback` will be the value at the time `mapObject` visits them.
 * Properties that are deleted before being visited are not visited.
 *
 * @grep function objectMap()
 * @grep function objMap()
 *
 * @param {?object} object
 * @param {function} callback
 * @param {*} context
 * @return {?object}
 */
function mapObject(object, callback, context) {
  if (!object) {
    return null;
  }
  var result = {};
  for (var name in object) {
    if (hasOwnProperty$1.call(object, name)) {
      result[name] = callback.call(context, object[name], name, object);
    }
  }
  return result;
}

var mapObject_1 = mapObject;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @typechecks static-only
 */

/**
 * Memoizes the return value of a function that accepts one string argument.
 */

function memoizeStringOnly(callback) {
  var cache = {};
  return function (string) {
    if (!cache.hasOwnProperty(string)) {
      cache[string] = callback.call(this, string);
    }
    return cache[string];
  };
}

var memoizeStringOnly_1 = memoizeStringOnly;

/**
 * Checks to see whether `name` and `version` satisfy `query`.
 *
 * @param {string} name Name of the browser, device, engine or platform
 * @param {?string} version Version of the browser, engine or platform
 * @param {string} query Query of form "Name [range expression]"
 * @param {?function} normalizer Optional pre-processor for range expression
 * @return {boolean}
 */
function compare$1(name, version, query, normalizer) {
  // check for exact match with no version
  if (name === query) {
    return true;
  }

  // check for non-matching names
  if (!query.startsWith(name)) {
    return false;
  }

  // full comparison with version
  var range = query.slice(name.length);
  if (version) {
    range = normalizer ? normalizer(range) : range;
    return VersionRange_1.contains(range, version);
  }

  return false;
}

/**
 * Normalizes `version` by stripping any "NT" prefix, but only on the Windows
 * platform.
 *
 * Mimics the stripping performed by the `UserAgentWindowsPlatform` PHP class.
 *
 * @param {string} version
 * @return {string}
 */
function normalizePlatformVersion(version) {
  if (UserAgentData.platformName === 'Windows') {
    return version.replace(/^\s*NT/, '');
  }

  return version;
}

/**
 * Provides client-side access to the authoritative PHP-generated User Agent
 * information supplied by the server.
 */
var UserAgent = {
  /**
   * Check if the User Agent browser matches `query`.
   *
   * `query` should be a string like "Chrome" or "Chrome > 33".
   *
   * Valid browser names include:
   *
   * - ACCESS NetFront
   * - AOL
   * - Amazon Silk
   * - Android
   * - BlackBerry
   * - BlackBerry PlayBook
   * - Chrome
   * - Chrome for iOS
   * - Chrome frame
   * - Facebook PHP SDK
   * - Facebook for iOS
   * - Firefox
   * - IE
   * - IE Mobile
   * - Mobile Safari
   * - Motorola Internet Browser
   * - Nokia
   * - Openwave Mobile Browser
   * - Opera
   * - Opera Mini
   * - Opera Mobile
   * - Safari
   * - UIWebView
   * - Unknown
   * - webOS
   * - etc...
   *
   * An authoritative list can be found in the PHP `BrowserDetector` class and
   * related classes in the same file (see calls to `new UserAgentBrowser` here:
   * https://fburl.com/50728104).
   *
   * @note Function results are memoized
   *
   * @param {string} query Query of the form "Name [range expression]"
   * @return {boolean}
   */
  isBrowser: function isBrowser(query) {
    return compare$1(UserAgentData.browserName, UserAgentData.browserFullVersion, query);
  },


  /**
   * Check if the User Agent browser uses a 32 or 64 bit architecture.
   *
   * @note Function results are memoized
   *
   * @param {string} query Query of the form "32" or "64".
   * @return {boolean}
   */
  isBrowserArchitecture: function isBrowserArchitecture(query) {
    return compare$1(UserAgentData.browserArchitecture, null, query);
  },


  /**
   * Check if the User Agent device matches `query`.
   *
   * `query` should be a string like "iPhone" or "iPad".
   *
   * Valid device names include:
   *
   * - Kindle
   * - Kindle Fire
   * - Unknown
   * - iPad
   * - iPhone
   * - iPod
   * - etc...
   *
   * An authoritative list can be found in the PHP `DeviceDetector` class and
   * related classes in the same file (see calls to `new UserAgentDevice` here:
   * https://fburl.com/50728332).
   *
   * @note Function results are memoized
   *
   * @param {string} query Query of the form "Name"
   * @return {boolean}
   */
  isDevice: function isDevice(query) {
    return compare$1(UserAgentData.deviceName, null, query);
  },


  /**
   * Check if the User Agent rendering engine matches `query`.
   *
   * `query` should be a string like "WebKit" or "WebKit >= 537".
   *
   * Valid engine names include:
   *
   * - Gecko
   * - Presto
   * - Trident
   * - WebKit
   * - etc...
   *
   * An authoritative list can be found in the PHP `RenderingEngineDetector`
   * class related classes in the same file (see calls to `new
   * UserAgentRenderingEngine` here: https://fburl.com/50728617).
   *
   * @note Function results are memoized
   *
   * @param {string} query Query of the form "Name [range expression]"
   * @return {boolean}
   */
  isEngine: function isEngine(query) {
    return compare$1(UserAgentData.engineName, UserAgentData.engineVersion, query);
  },


  /**
   * Check if the User Agent platform matches `query`.
   *
   * `query` should be a string like "Windows" or "iOS 5 - 6".
   *
   * Valid platform names include:
   *
   * - Android
   * - BlackBerry OS
   * - Java ME
   * - Linux
   * - Mac OS X
   * - Mac OS X Calendar
   * - Mac OS X Internet Account
   * - Symbian
   * - SymbianOS
   * - Windows
   * - Windows Mobile
   * - Windows Phone
   * - iOS
   * - iOS Facebook Integration Account
   * - iOS Facebook Social Sharing UI
   * - webOS
   * - Chrome OS
   * - etc...
   *
   * An authoritative list can be found in the PHP `PlatformDetector` class and
   * related classes in the same file (see calls to `new UserAgentPlatform`
   * here: https://fburl.com/50729226).
   *
   * @note Function results are memoized
   *
   * @param {string} query Query of the form "Name [range expression]"
   * @return {boolean}
   */
  isPlatform: function isPlatform(query) {
    return compare$1(UserAgentData.platformName, UserAgentData.platformFullVersion, query, normalizePlatformVersion);
  },


  /**
   * Check if the User Agent platform is a 32 or 64 bit architecture.
   *
   * @note Function results are memoized
   *
   * @param {string} query Query of the form "32" or "64".
   * @return {boolean}
   */
  isPlatformArchitecture: function isPlatformArchitecture(query) {
    return compare$1(UserAgentData.platformArchitecture, null, query);
  }
};

var UserAgent_1 = mapObject_1(UserAgent, memoizeStringOnly_1);

function _classCallCheck$a(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$7(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$7(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







// In IE, spans with <br> tags render as two newlines. By rendering a span
// with only a newline character, we can be sure to render a single line.
var useNewlineChar = UserAgent_1.isBrowser('IE <= 11');

/**
 * Check whether the node should be considered a newline.
 */
function isNewline(node) {
  return useNewlineChar ? node.textContent === '\n' : node.tagName === 'BR';
}

/**
 * Placeholder elements for empty text content.
 *
 * What is this `data-text` attribute, anyway? It turns out that we need to
 * put an attribute on the lowest-level text node in order to preserve correct
 * spellcheck handling. If the <span> is naked, Chrome and Safari may do
 * bizarre things to do the DOM -- split text nodes, create extra spans, etc.
 * If the <span> has an attribute, this appears not to happen.
 * See http://jsfiddle.net/9khdavod/ for the failure case, and
 * http://jsfiddle.net/7pg143f7/ for the fixed case.
 */
var NEWLINE_A = useNewlineChar ? React__default.createElement(
  'span',
  { key: 'A', 'data-text': 'true' },
  '\n'
) : React__default.createElement('br', { key: 'A', 'data-text': 'true' });

var NEWLINE_B = useNewlineChar ? React__default.createElement(
  'span',
  { key: 'B', 'data-text': 'true' },
  '\n'
) : React__default.createElement('br', { key: 'B', 'data-text': 'true' });

/**
 * The lowest-level component in a `DraftEditor`, the text node component
 * replaces the default React text node implementation. This allows us to
 * perform custom handling of newline behavior and avoid re-rendering text
 * nodes with DOM state that already matches the expectations of our immutable
 * editor state.
 */
var DraftEditorTextNode = function (_React$Component) {
  _inherits$7(DraftEditorTextNode, _React$Component);

  function DraftEditorTextNode(props) {
    _classCallCheck$a(this, DraftEditorTextNode);

    // By flipping this flag, we also keep flipping keys which forces
    // React to remount this node every time it rerenders.
    var _this = _possibleConstructorReturn$7(this, _React$Component.call(this, props));

    _this._forceFlag = false;
    return _this;
  }

  DraftEditorTextNode.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var node = ReactDOM.findDOMNode(this);
    var shouldBeNewline = nextProps.children === '';
    !(node instanceof Element) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'node is not an Element') : invariant_1(false) : void 0;
    if (shouldBeNewline) {
      return !isNewline(node);
    }
    return node.textContent !== nextProps.children;
  };

  DraftEditorTextNode.prototype.componentDidMount = function componentDidMount() {
    this._forceFlag = !this._forceFlag;
  };

  DraftEditorTextNode.prototype.componentDidUpdate = function componentDidUpdate() {
    this._forceFlag = !this._forceFlag;
  };

  DraftEditorTextNode.prototype.render = function render() {
    if (this.props.children === '') {
      return this._forceFlag ? NEWLINE_A : NEWLINE_B;
    }
    return React__default.createElement(
      'span',
      { key: this._forceFlag ? 'A' : 'B', 'data-text': 'true' },
      this.props.children
    );
  };

  return DraftEditorTextNode;
}(React__default.Component);

var DraftEditorTextNode_react = DraftEditorTextNode;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftJsDebugLogging
 */

var DraftJsDebugLogging = {
  logSelectionStateFailure: function logSelectionStateFailure() {
    return null;
  }
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

var isNode_1 = isNode;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode_1(object) && object.nodeType == 3;
}

var isTextNode_1 = isTextNode;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode_1(outerNode)) {
    return false;
  } else if (isTextNode_1(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

var containsNode_1 = containsNode;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

var getActiveElement_1 = getActiveElement;

function getAnonymizedDOM(node, getNodeLabels) {
  if (!node) {
    return '[empty]';
  }

  var anonymized = anonymizeTextWithin(node, getNodeLabels);
  if (anonymized.nodeType === Node.TEXT_NODE) {
    return anonymized.textContent;
  }

  !(anonymized instanceof Element) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Node must be an Element if it is not a text node.') : invariant_1(false) : void 0;
  return anonymized.outerHTML;
}

function anonymizeTextWithin(node, getNodeLabels) {
  var labels = getNodeLabels !== undefined ? getNodeLabels(node) : [];

  if (node.nodeType === Node.TEXT_NODE) {
    var length = node.textContent.length;
    return document.createTextNode('[text ' + length + (labels.length ? ' | ' + labels.join(', ') : '') + ']');
  }

  var clone = node.cloneNode();
  if (clone.nodeType === 1 && labels.length) {
    clone.setAttribute('data-labels', labels.join(', '));
  }
  var childNodes = node.childNodes;
  for (var ii = 0; ii < childNodes.length; ii++) {
    clone.appendChild(anonymizeTextWithin(childNodes[ii], getNodeLabels));
  }

  return clone;
}

function getAnonymizedEditorDOM(node, getNodeLabels) {
  // grabbing the DOM content of the Draft editor
  var currentNode = node;
  while (currentNode) {
    if (currentNode instanceof Element && currentNode.hasAttribute('contenteditable')) {
      // found the Draft editor container
      return getAnonymizedDOM(currentNode, getNodeLabels);
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return 'Could not find contentEditable parent of node';
}

function getNodeLength(node) {
  return node.nodeValue === null ? node.childNodes.length : node.nodeValue.length;
}

/**
 * In modern non-IE browsers, we can support both forward and backward
 * selections.
 *
 * Note: IE10+ supports the Selection object, but it does not support
 * the `extend` method, which means that even in modern IE, it's not possible
 * to programatically create a backward selection. Thus, for all IE
 * versions, we use the old IE API to create our selections.
 */
function setDraftEditorSelection(selectionState, node, blockKey, nodeStart, nodeEnd) {
  // It's possible that the editor has been removed from the DOM but
  // our selection code doesn't know it yet. Forcing selection in
  // this case may lead to errors, so just bail now.
  if (!containsNode_1(document.documentElement, node)) {
    return;
  }

  var selection = commonjsGlobal.getSelection();
  var anchorKey = selectionState.getAnchorKey();
  var anchorOffset = selectionState.getAnchorOffset();
  var focusKey = selectionState.getFocusKey();
  var focusOffset = selectionState.getFocusOffset();
  var isBackward = selectionState.getIsBackward();

  // IE doesn't support backward selection. Swap key/offset pairs.
  if (!selection.extend && isBackward) {
    var tempKey = anchorKey;
    var tempOffset = anchorOffset;
    anchorKey = focusKey;
    anchorOffset = focusOffset;
    focusKey = tempKey;
    focusOffset = tempOffset;
    isBackward = false;
  }

  var hasAnchor = anchorKey === blockKey && nodeStart <= anchorOffset && nodeEnd >= anchorOffset;

  var hasFocus = focusKey === blockKey && nodeStart <= focusOffset && nodeEnd >= focusOffset;

  // If the selection is entirely bound within this node, set the selection
  // and be done.
  if (hasAnchor && hasFocus) {
    selection.removeAllRanges();
    addPointToSelection(selection, node, anchorOffset - nodeStart, selectionState);
    addFocusToSelection(selection, node, focusOffset - nodeStart, selectionState);
    return;
  }

  if (!isBackward) {
    // If the anchor is within this node, set the range start.
    if (hasAnchor) {
      selection.removeAllRanges();
      addPointToSelection(selection, node, anchorOffset - nodeStart, selectionState);
    }

    // If the focus is within this node, we can assume that we have
    // already set the appropriate start range on the selection, and
    // can simply extend the selection.
    if (hasFocus) {
      addFocusToSelection(selection, node, focusOffset - nodeStart, selectionState);
    }
  } else {
    // If this node has the focus, set the selection range to be a
    // collapsed range beginning here. Later, when we encounter the anchor,
    // we'll use this information to extend the selection.
    if (hasFocus) {
      selection.removeAllRanges();
      addPointToSelection(selection, node, focusOffset - nodeStart, selectionState);
    }

    // If this node has the anchor, we may assume that the correct
    // focus information is already stored on the selection object.
    // We keep track of it, reset the selection range, and extend it
    // back to the focus point.
    if (hasAnchor) {
      var storedFocusNode = selection.focusNode;
      var storedFocusOffset = selection.focusOffset;

      selection.removeAllRanges();
      addPointToSelection(selection, node, anchorOffset - nodeStart, selectionState);
      addFocusToSelection(selection, storedFocusNode, storedFocusOffset, selectionState);
    }
  }
}

/**
 * Extend selection towards focus point.
 */
function addFocusToSelection(selection, node, offset, selectionState) {
  var activeElement = getActiveElement_1();
  if (selection.extend && containsNode_1(activeElement, node)) {
    // If `extend` is called while another element has focus, an error is
    // thrown. We therefore disable `extend` if the active element is somewhere
    // other than the node we are selecting. This should only occur in Firefox,
    // since it is the only browser to support multiple selections.
    // See https://bugzilla.mozilla.org/show_bug.cgi?id=921444.

    // logging to catch bug that is being reported in t16250795
    if (offset > getNodeLength(node)) {
      // the call to 'selection.extend' is about to throw
      DraftJsDebugLogging.logSelectionStateFailure({
        anonymizedDom: getAnonymizedEditorDOM(node),
        extraParams: JSON.stringify({ offset: offset }),
        selectionState: JSON.stringify(selectionState.toJS())
      });
    }

    // logging to catch bug that is being reported in t18110632
    var nodeWasFocus = node === selection.focusNode;
    try {
      selection.extend(node, offset);
    } catch (e) {
      DraftJsDebugLogging.logSelectionStateFailure({
        anonymizedDom: getAnonymizedEditorDOM(node, function (n) {
          var labels = [];
          if (n === activeElement) {
            labels.push('active element');
          }
          if (n === selection.anchorNode) {
            labels.push('selection anchor node');
          }
          if (n === selection.focusNode) {
            labels.push('selection focus node');
          }
          return labels;
        }),
        extraParams: JSON.stringify({
          activeElementName: activeElement ? activeElement.nodeName : null,
          nodeIsFocus: node === selection.focusNode,
          nodeWasFocus: nodeWasFocus,
          selectionRangeCount: selection.rangeCount,
          selectionAnchorNodeName: selection.anchorNode ? selection.anchorNode.nodeName : null,
          selectionAnchorOffset: selection.anchorOffset,
          selectionFocusNodeName: selection.focusNode ? selection.focusNode.nodeName : null,
          selectionFocusOffset: selection.focusOffset,
          message: e ? '' + e : null,
          offset: offset
        }, null, 2),
        selectionState: JSON.stringify(selectionState.toJS(), null, 2)
      });
      // allow the error to be thrown -
      // better than continuing in a broken state
      throw e;
    }
  } else {
    // IE doesn't support extend. This will mean no backward selection.
    // Extract the existing selection range and add focus to it.
    // Additionally, clone the selection range. IE11 throws an
    // InvalidStateError when attempting to access selection properties
    // after the range is detached.
    var range = selection.getRangeAt(0);
    range.setEnd(node, offset);
    selection.addRange(range.cloneRange());
  }
}

function addPointToSelection(selection, node, offset, selectionState) {
  var range = document.createRange();
  // logging to catch bug that is being reported in t16250795
  if (offset > getNodeLength(node)) {
    // in this case we know that the call to 'range.setStart' is about to throw
    DraftJsDebugLogging.logSelectionStateFailure({
      anonymizedDom: getAnonymizedEditorDOM(node),
      extraParams: JSON.stringify({ offset: offset }),
      selectionState: JSON.stringify(selectionState.toJS())
    });
  }
  range.setStart(node, offset);
  selection.addRange(range);
}

var setDraftEditorSelection_1 = setDraftEditorSelection;

function _classCallCheck$b(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$8(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$8(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








/**
 * All leaf nodes in the editor are spans with single text nodes. Leaf
 * elements are styled based on the merging of an optional custom style map
 * and a default style map.
 *
 * `DraftEditorLeaf` also provides a wrapper for calling into the imperative
 * DOM Selection API. In this way, top-level components can declaratively
 * maintain the selection state.
 */
var DraftEditorLeaf = function (_React$Component) {
  _inherits$8(DraftEditorLeaf, _React$Component);

  function DraftEditorLeaf() {
    _classCallCheck$b(this, DraftEditorLeaf);

    return _possibleConstructorReturn$8(this, _React$Component.apply(this, arguments));
  }

  DraftEditorLeaf.prototype._setSelection = function _setSelection() {
    var selection = this.props.selection;

    // If selection state is irrelevant to the parent block, no-op.

    if (selection == null || !selection.getHasFocus()) {
      return;
    }

    var _props = this.props,
        block = _props.block,
        start = _props.start,
        text = _props.text;

    var blockKey = block.getKey();
    var end = start + text.length;
    if (!selection.hasEdgeWithin(blockKey, start, end)) {
      return;
    }

    // Determine the appropriate target node for selection. If the child
    // is not a text node, it is a <br /> spacer. In this case, use the
    // <span> itself as the selection target.
    var node = ReactDOM.findDOMNode(this);
    !node ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Missing node') : invariant_1(false) : void 0;
    var child = node.firstChild;
    !child ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Missing child') : invariant_1(false) : void 0;
    var targetNode = void 0;

    if (child.nodeType === Node.TEXT_NODE) {
      targetNode = child;
    } else if (child.tagName === 'BR') {
      targetNode = node;
    } else {
      targetNode = child.firstChild;
      !targetNode ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Missing targetNode') : invariant_1(false) : void 0;
    }

    setDraftEditorSelection_1(selection, targetNode, blockKey, start, end);
  };
  /**
   * By making individual leaf instances aware of their context within
   * the text of the editor, we can set our selection range more
   * easily than we could in the non-React world.
   *
   * Note that this depends on our maintaining tight control over the
   * DOM structure of the DraftEditor component. If leaves had multiple
   * text nodes, this would be harder.
   */

  DraftEditorLeaf.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var leafNode = ReactDOM.findDOMNode(this.leaf);
    !leafNode ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Missing leafNode') : invariant_1(false) : void 0;
    return leafNode.textContent !== nextProps.text || nextProps.styleSet !== this.props.styleSet || nextProps.forceSelection;
  };

  DraftEditorLeaf.prototype.componentDidUpdate = function componentDidUpdate() {
    this._setSelection();
  };

  DraftEditorLeaf.prototype.componentDidMount = function componentDidMount() {
    this._setSelection();
  };

  DraftEditorLeaf.prototype.render = function render() {
    var _this2 = this;

    var block = this.props.block;
    var text = this.props.text;

    // If the leaf is at the end of its block and ends in a soft newline, append
    // an extra line feed character. Browsers collapse trailing newline
    // characters, which leaves the cursor in the wrong place after a
    // shift+enter. The extra character repairs this.

    if (text.endsWith('\n') && this.props.isLast) {
      text += '\n';
    }

    var _props2 = this.props,
        customStyleMap = _props2.customStyleMap,
        customStyleFn = _props2.customStyleFn,
        offsetKey = _props2.offsetKey,
        styleSet = _props2.styleSet;

    var styleObj = styleSet.reduce(function (map, styleName) {
      var mergedStyles = {};
      var style = customStyleMap[styleName];

      if (style !== undefined && map.textDecoration !== style.textDecoration) {
        // .trim() is necessary for IE9/10/11 and Edge
        mergedStyles.textDecoration = [map.textDecoration, style.textDecoration].join(' ').trim();
      }

      return objectAssign(map, style, mergedStyles);
    }, {});

    if (customStyleFn) {
      var newStyles = customStyleFn(styleSet, block);
      styleObj = objectAssign(styleObj, newStyles);
    }

    return React__default.createElement(
      'span',
      {
        'data-offset-key': offsetKey,
        ref: function ref(_ref) {
          return _this2.leaf = _ref;
        },
        style: styleObj },
      React__default.createElement(
        DraftEditorTextNode_react,
        null,
        text
      )
    );
  };

  return DraftEditorLeaf;
}(React__default.Component);

var DraftEditorLeaf_react = DraftEditorLeaf;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftOffsetKey
 * @format
 * 
 */

var KEY_DELIMITER = '-';

var DraftOffsetKey = {
  encode: function encode(blockKey, decoratorKey, leafKey) {
    return blockKey + KEY_DELIMITER + decoratorKey + KEY_DELIMITER + leafKey;
  },

  decode: function decode(offsetKey) {
    var _offsetKey$split = offsetKey.split(KEY_DELIMITER),
        blockKey = _offsetKey$split[0],
        decoratorKey = _offsetKey$split[1],
        leafKey = _offsetKey$split[2];

    return {
      blockKey: blockKey,
      decoratorKey: parseInt(decoratorKey, 10),
      leafKey: parseInt(leafKey, 10)
    };
  }
};

var DraftOffsetKey_1 = DraftOffsetKey;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * @param {DOMElement} element
 * @param {DOMDocument} doc
 * @return {boolean}
 */
function _isViewportScrollElement(element, doc) {
  return !!doc && (element === doc.documentElement || element === doc.body);
}

/**
 * Scroll Module. This class contains 4 simple static functions
 * to be used to access Element.scrollTop/scrollLeft properties.
 * To solve the inconsistencies between browsers when either
 * document.body or document.documentElement is supplied,
 * below logic will be used to alleviate the issue:
 *
 * 1. If 'element' is either 'document.body' or 'document.documentElement,
 *    get whichever element's 'scroll{Top,Left}' is larger.
 * 2. If 'element' is either 'document.body' or 'document.documentElement',
 *    set the 'scroll{Top,Left}' on both elements.
 */

var Scroll = {
  /**
   * @param {DOMElement} element
   * @return {number}
   */
  getTop: function getTop(element) {
    var doc = element.ownerDocument;
    return _isViewportScrollElement(element, doc) ?
    // In practice, they will either both have the same value,
    // or one will be zero and the other will be the scroll position
    // of the viewport. So we can use `X || Y` instead of `Math.max(X, Y)`
    doc.body.scrollTop || doc.documentElement.scrollTop : element.scrollTop;
  },

  /**
   * @param {DOMElement} element
   * @param {number} newTop
   */
  setTop: function setTop(element, newTop) {
    var doc = element.ownerDocument;
    if (_isViewportScrollElement(element, doc)) {
      doc.body.scrollTop = doc.documentElement.scrollTop = newTop;
    } else {
      element.scrollTop = newTop;
    }
  },

  /**
   * @param {DOMElement} element
   * @return {number}
   */
  getLeft: function getLeft(element) {
    var doc = element.ownerDocument;
    return _isViewportScrollElement(element, doc) ? doc.body.scrollLeft || doc.documentElement.scrollLeft : element.scrollLeft;
  },

  /**
   * @param {DOMElement} element
   * @param {number} newLeft
   */
  setLeft: function setLeft(element, newLeft) {
    var doc = element.ownerDocument;
    if (_isViewportScrollElement(element, doc)) {
      doc.body.scrollLeft = doc.documentElement.scrollLeft = newLeft;
    } else {
      element.scrollLeft = newLeft;
    }
  }
};

var Scroll_1 = Scroll;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

var camelize_1 = camelize;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

var hyphenate_1 = hyphenate;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */




function asString(value) /*?string*/{
  return value == null ? value : String(value);
}

function getStyleProperty( /*DOMNode*/node, /*string*/name) /*?string*/{
  var computedStyle = void 0;

  // W3C Standard
  if (window.getComputedStyle) {
    // In certain cases such as within an iframe in FF3, this returns null.
    computedStyle = window.getComputedStyle(node, null);
    if (computedStyle) {
      return asString(computedStyle.getPropertyValue(hyphenate_1(name)));
    }
  }
  // Safari
  if (document.defaultView && document.defaultView.getComputedStyle) {
    computedStyle = document.defaultView.getComputedStyle(node, null);
    // A Safari bug causes this to return null for `display: none` elements.
    if (computedStyle) {
      return asString(computedStyle.getPropertyValue(hyphenate_1(name)));
    }
    if (name === 'display') {
      return 'none';
    }
  }
  // Internet Explorer
  if (node.currentStyle) {
    if (name === 'float') {
      return asString(node.currentStyle.cssFloat || node.currentStyle.styleFloat);
    }
    return asString(node.currentStyle[camelize_1(name)]);
  }
  return asString(node.style && node.style[camelize_1(name)]);
}

var getStyleProperty_1 = getStyleProperty;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



/**
 * @param {DOMNode} element [description]
 * @param {string} name Overflow style property name.
 * @return {boolean} True if the supplied ndoe is scrollable.
 */
function _isNodeScrollable(element, name) {
  var overflow = Style.get(element, name);
  return overflow === 'auto' || overflow === 'scroll';
}

/**
 * Utilities for querying and mutating style properties.
 */
var Style = {
  /**
   * Gets the style property for the supplied node. This will return either the
   * computed style, if available, or the declared style.
   *
   * @param {DOMNode} node
   * @param {string} name Style property name.
   * @return {?string} Style property value.
   */
  get: getStyleProperty_1,

  /**
   * Determines the nearest ancestor of a node that is scrollable.
   *
   * NOTE: This can be expensive if used repeatedly or on a node nested deeply.
   *
   * @param {?DOMNode} node Node from which to start searching.
   * @return {?DOMWindow|DOMElement} Scroll parent of the supplied node.
   */
  getScrollParent: function getScrollParent(node) {
    if (!node) {
      return null;
    }
    var ownerDocument = node.ownerDocument;
    while (node && node !== ownerDocument.body) {
      if (_isNodeScrollable(node, 'overflow') || _isNodeScrollable(node, 'overflowY') || _isNodeScrollable(node, 'overflowX')) {
        return node;
      }
      node = node.parentNode;
    }
    return ownerDocument.defaultView || ownerDocument.parentWindow;
  }

};

var Style_1 = Style;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



/**
 * Gets an element's bounding rect in pixels relative to the viewport.
 *
 * @param {DOMElement} elem
 * @return {object}
 */
function getElementRect(elem) {
  var docElem = elem.ownerDocument.documentElement;

  // FF 2, Safari 3 and Opera 9.5- do not support getBoundingClientRect().
  // IE9- will throw if the element is not in the document.
  if (!('getBoundingClientRect' in elem) || !containsNode_1(docElem, elem)) {
    return {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
  }

  // Subtracts clientTop/Left because IE8- added a 2px border to the
  // <html> element (see http://fburl.com/1493213). IE 7 in
  // Quicksmode does not report clientLeft/clientTop so there
  // will be an unaccounted offset of 2px when in quirksmode
  var rect = elem.getBoundingClientRect();

  return {
    left: Math.round(rect.left) - docElem.clientLeft,
    right: Math.round(rect.right) - docElem.clientLeft,
    top: Math.round(rect.top) - docElem.clientTop,
    bottom: Math.round(rect.bottom) - docElem.clientTop
  };
}

var getElementRect_1 = getElementRect;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



/**
 * Gets an element's position in pixels relative to the viewport. The returned
 * object represents the position of the element's top left corner.
 *
 * @param {DOMElement} element
 * @return {object}
 */
function getElementPosition(element) {
  var rect = getElementRect_1(element);
  return {
    x: rect.left,
    y: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };
}

var getElementPosition_1 = getElementPosition;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var isWebkit = typeof navigator !== 'undefined' && navigator.userAgent.indexOf('AppleWebKit') > -1;

/**
 * Gets the element with the document scroll properties such as `scrollLeft` and
 * `scrollHeight`. This may differ across different browsers.
 *
 * NOTE: The return value can be null if the DOM is not yet ready.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getDocumentScrollElement(doc) {
  doc = doc || document;
  if (doc.scrollingElement) {
    return doc.scrollingElement;
  }
  return !isWebkit && doc.compatMode === 'CSS1Compat' ? doc.documentElement : doc.body;
}

var getDocumentScrollElement_1 = getDocumentScrollElement;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * Gets the scroll position of the supplied element or window.
 *
 * The return values are unbounded, unlike `getScrollPosition`. This means they
 * may be negative or exceed the element boundaries (which is possible using
 * inertial scrolling).
 *
 * @param {DOMWindow|DOMElement} scrollable
 * @return {object} Map with `x` and `y` keys.
 */

function getUnboundedScrollPosition(scrollable) {
  if (scrollable.Window && scrollable instanceof scrollable.Window) {
    return {
      x: scrollable.pageXOffset || scrollable.document.documentElement.scrollLeft,
      y: scrollable.pageYOffset || scrollable.document.documentElement.scrollTop
    };
  }
  return {
    x: scrollable.scrollLeft,
    y: scrollable.scrollTop
  };
}

var getUnboundedScrollPosition_1 = getUnboundedScrollPosition;

/**
 * Gets the scroll position of the supplied element or window.
 *
 * The return values are bounded. This means that if the scroll position is
 * negative or exceeds the element boundaries (which is possible using inertial
 * scrolling), you will get zero or the maximum scroll position, respectively.
 *
 * If you need the unbound scroll position, use `getUnboundedScrollPosition`.
 *
 * @param {DOMWindow|DOMElement} scrollable
 * @return {object} Map with `x` and `y` keys.
 */
function getScrollPosition(scrollable) {
  var documentScrollElement = getDocumentScrollElement_1(scrollable.ownerDocument || scrollable.document);
  if (scrollable.Window && scrollable instanceof scrollable.Window) {
    scrollable = documentScrollElement;
  }
  var scrollPosition = getUnboundedScrollPosition_1(scrollable);

  var viewport = scrollable === documentScrollElement ? scrollable.ownerDocument.documentElement : scrollable;

  var xMax = scrollable.scrollWidth - viewport.clientWidth;
  var yMax = scrollable.scrollHeight - viewport.clientHeight;

  scrollPosition.x = Math.max(0, Math.min(scrollPosition.x, xMax));
  scrollPosition.y = Math.max(0, Math.min(scrollPosition.y, yMax));

  return scrollPosition;
}

var getScrollPosition_1 = getScrollPosition;

function getViewportWidth() {
  var width = void 0;
  if (document.documentElement) {
    width = document.documentElement.clientWidth;
  }

  if (!width && document.body) {
    width = document.body.clientWidth;
  }

  return width || 0;
} /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   * @typechecks
   */

function getViewportHeight() {
  var height = void 0;
  if (document.documentElement) {
    height = document.documentElement.clientHeight;
  }

  if (!height && document.body) {
    height = document.body.clientHeight;
  }

  return height || 0;
}

/**
 * Gets the viewport dimensions including any scrollbars.
 */
function getViewportDimensions() {
  return {
    width: window.innerWidth || getViewportWidth(),
    height: window.innerHeight || getViewportHeight()
  };
}

/**
 * Gets the viewport dimensions excluding any scrollbars.
 */
getViewportDimensions.withoutScrollbars = function () {
  return {
    width: getViewportWidth(),
    height: getViewportHeight()
  };
};

var getViewportDimensions_1 = getViewportDimensions;

var _extends$4 = objectAssign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck$c(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$9(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$9(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

















var SCROLL_BUFFER = 10;

/**
 * Return whether a block overlaps with either edge of the `SelectionState`.
 */
var isBlockOnSelectionEdge = function isBlockOnSelectionEdge(selection, key) {
  return selection.getAnchorKey() === key || selection.getFocusKey() === key;
};

/**
 * The default block renderer for a `DraftEditor` component.
 *
 * A `DraftEditorBlock` is able to render a given `ContentBlock` to its
 * appropriate decorator and inline style components.
 */

var DraftEditorBlock = function (_React$Component) {
  _inherits$9(DraftEditorBlock, _React$Component);

  function DraftEditorBlock() {
    _classCallCheck$c(this, DraftEditorBlock);

    return _possibleConstructorReturn$9(this, _React$Component.apply(this, arguments));
  }

  DraftEditorBlock.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.block !== nextProps.block || this.props.tree !== nextProps.tree || this.props.direction !== nextProps.direction || isBlockOnSelectionEdge(nextProps.selection, nextProps.block.getKey()) && nextProps.forceSelection;
  };

  /**
   * When a block is mounted and overlaps the selection state, we need to make
   * sure that the cursor is visible to match native behavior. This may not
   * be the case if the user has pressed `RETURN` or pasted some content, since
   * programatically creating these new blocks and setting the DOM selection
   * will miss out on the browser natively scrolling to that position.
   *
   * To replicate native behavior, if the block overlaps the selection state
   * on mount, force the scroll position. Check the scroll state of the scroll
   * parent, and adjust it to align the entire block to the bottom of the
   * scroll parent.
   */


  DraftEditorBlock.prototype.componentDidMount = function componentDidMount() {
    var selection = this.props.selection;
    var endKey = selection.getEndKey();
    if (!selection.getHasFocus() || endKey !== this.props.block.getKey()) {
      return;
    }

    var blockNode = ReactDOM.findDOMNode(this);
    var scrollParent = Style_1.getScrollParent(blockNode);
    var scrollPosition = getScrollPosition_1(scrollParent);
    var scrollDelta = void 0;

    if (scrollParent === window) {
      var nodePosition = getElementPosition_1(blockNode);
      var nodeBottom = nodePosition.y + nodePosition.height;
      var viewportHeight = getViewportDimensions_1().height;
      scrollDelta = nodeBottom - viewportHeight;
      if (scrollDelta > 0) {
        window.scrollTo(scrollPosition.x, scrollPosition.y + scrollDelta + SCROLL_BUFFER);
      }
    } else {
      !(blockNode instanceof HTMLElement) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'blockNode is not an HTMLElement') : invariant_1(false) : void 0;
      var blockBottom = blockNode.offsetHeight + blockNode.offsetTop;
      var scrollBottom = scrollParent.offsetHeight + scrollPosition.y;
      scrollDelta = blockBottom - scrollBottom;
      if (scrollDelta > 0) {
        Scroll_1.setTop(scrollParent, Scroll_1.getTop(scrollParent) + scrollDelta + SCROLL_BUFFER);
      }
    }
  };

  DraftEditorBlock.prototype._renderChildren = function _renderChildren() {
    var _this2 = this;

    var block = this.props.block;
    var blockKey = block.getKey();
    var text = block.getText();
    var lastLeafSet = this.props.tree.size - 1;
    var hasSelection = isBlockOnSelectionEdge(this.props.selection, blockKey);

    return this.props.tree.map(function (leafSet, ii) {
      var leavesForLeafSet = leafSet.get('leaves');
      var lastLeaf = leavesForLeafSet.size - 1;
      var leaves = leavesForLeafSet.map(function (leaf, jj) {
        var offsetKey = DraftOffsetKey_1.encode(blockKey, ii, jj);
        var start = leaf.get('start');
        var end = leaf.get('end');
        return React__default.createElement(DraftEditorLeaf_react, {
          key: offsetKey,
          offsetKey: offsetKey,
          block: block,
          start: start,
          selection: hasSelection ? _this2.props.selection : null,
          forceSelection: _this2.props.forceSelection,
          text: text.slice(start, end),
          styleSet: block.getInlineStyleAt(start),
          customStyleMap: _this2.props.customStyleMap,
          customStyleFn: _this2.props.customStyleFn,
          isLast: ii === lastLeafSet && jj === lastLeaf
        });
      }).toArray();

      var decoratorKey = leafSet.get('decoratorKey');
      if (decoratorKey == null) {
        return leaves;
      }

      if (!_this2.props.decorator) {
        return leaves;
      }

      var decorator = nullthrows_1(_this2.props.decorator);

      var DecoratorComponent = decorator.getComponentForKey(decoratorKey);
      if (!DecoratorComponent) {
        return leaves;
      }

      var decoratorProps = decorator.getPropsForKey(decoratorKey);
      var decoratorOffsetKey = DraftOffsetKey_1.encode(blockKey, ii, 0);
      var decoratedText = text.slice(leavesForLeafSet.first().get('start'), leavesForLeafSet.last().get('end'));

      // Resetting dir to the same value on a child node makes Chrome/Firefox
      // confused on cursor movement. See http://jsfiddle.net/d157kLck/3/
      var dir = UnicodeBidiDirection_1.getHTMLDirIfDifferent(UnicodeBidi_1.getDirection(decoratedText), _this2.props.direction);

      return React__default.createElement(
        DecoratorComponent,
        _extends$4({}, decoratorProps, {
          contentState: _this2.props.contentState,
          decoratedText: decoratedText,
          dir: dir,
          key: decoratorOffsetKey,
          entityKey: block.getEntityAt(leafSet.get('start')),
          offsetKey: decoratorOffsetKey }),
        leaves
      );
    }).toArray();
  };

  DraftEditorBlock.prototype.render = function render() {
    var _props = this.props,
        direction = _props.direction,
        offsetKey = _props.offsetKey;

    var className = cx_1({
      'public/DraftStyleDefault/block': true,
      'public/DraftStyleDefault/ltr': direction === 'LTR',
      'public/DraftStyleDefault/rtl': direction === 'RTL'
    });

    return React__default.createElement(
      'div',
      { 'data-offset-key': offsetKey, className: className },
      this._renderChildren()
    );
  };

  return DraftEditorBlock;
}(React__default.Component);

var DraftEditorBlock_react = DraftEditorBlock;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks static-only
 */

/**
 * Combines multiple className strings into one.
 * http://jsperf.com/joinclasses-args-vs-array
 *
 * @param {...?string} className
 * @return {string}
 */

function joinClasses(className /*, ... */) {
  if (!className) {
    className = '';
  }
  var nextClass = void 0;
  var argLength = arguments.length;
  if (argLength > 1) {
    for (var ii = 1; ii < argLength; ii++) {
      nextClass = arguments[ii];
      if (nextClass) {
        className = (className ? className + ' ' : '') + nextClass;
      }
    }
  }
  return className;
}

var joinClasses_1 = joinClasses;

var _extends$5 = objectAssign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck$d(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$a(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$a(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










/**
 * Provide default styling for list items. This way, lists will be styled with
 * proper counters and indentation even if the caller does not specify
 * their own styling at all. If more than five levels of nesting are needed,
 * the necessary CSS classes can be provided via `blockStyleFn` configuration.
 */
var getListItemClasses = function getListItemClasses(type, depth, shouldResetCount, direction) {
  return cx_1({
    'public/DraftStyleDefault/unorderedListItem': type === 'unordered-list-item',
    'public/DraftStyleDefault/orderedListItem': type === 'ordered-list-item',
    'public/DraftStyleDefault/reset': shouldResetCount,
    'public/DraftStyleDefault/depth0': depth === 0,
    'public/DraftStyleDefault/depth1': depth === 1,
    'public/DraftStyleDefault/depth2': depth === 2,
    'public/DraftStyleDefault/depth3': depth === 3,
    'public/DraftStyleDefault/depth4': depth === 4,
    'public/DraftStyleDefault/listLTR': direction === 'LTR',
    'public/DraftStyleDefault/listRTL': direction === 'RTL'
  });
};

/**
 * `DraftEditorContents` is the container component for all block components
 * rendered for a `DraftEditor`. It is optimized to aggressively avoid
 * re-rendering blocks whenever possible.
 *
 * This component is separate from `DraftEditor` because certain props
 * (for instance, ARIA props) must be allowed to update without affecting
 * the contents of the editor.
 */

var DraftEditorContents = function (_React$Component) {
  _inherits$a(DraftEditorContents, _React$Component);

  function DraftEditorContents() {
    _classCallCheck$d(this, DraftEditorContents);

    return _possibleConstructorReturn$a(this, _React$Component.apply(this, arguments));
  }

  DraftEditorContents.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var prevEditorState = this.props.editorState;
    var nextEditorState = nextProps.editorState;

    var prevDirectionMap = prevEditorState.getDirectionMap();
    var nextDirectionMap = nextEditorState.getDirectionMap();

    // Text direction has changed for one or more blocks. We must re-render.
    if (prevDirectionMap !== nextDirectionMap) {
      return true;
    }

    var didHaveFocus = prevEditorState.getSelection().getHasFocus();
    var nowHasFocus = nextEditorState.getSelection().getHasFocus();

    if (didHaveFocus !== nowHasFocus) {
      return true;
    }

    var nextNativeContent = nextEditorState.getNativelyRenderedContent();

    var wasComposing = prevEditorState.isInCompositionMode();
    var nowComposing = nextEditorState.isInCompositionMode();

    // If the state is unchanged or we're currently rendering a natively
    // rendered state, there's nothing new to be done.
    if (prevEditorState === nextEditorState || nextNativeContent !== null && nextEditorState.getCurrentContent() === nextNativeContent || wasComposing && nowComposing) {
      return false;
    }

    var prevContent = prevEditorState.getCurrentContent();
    var nextContent = nextEditorState.getCurrentContent();
    var prevDecorator = prevEditorState.getDecorator();
    var nextDecorator = nextEditorState.getDecorator();
    return wasComposing !== nowComposing || prevContent !== nextContent || prevDecorator !== nextDecorator || nextEditorState.mustForceSelection();
  };

  DraftEditorContents.prototype.render = function render() {
    var _props = this.props,
        blockRenderMap = _props.blockRenderMap,
        blockRendererFn = _props.blockRendererFn,
        blockStyleFn = _props.blockStyleFn,
        customStyleMap = _props.customStyleMap,
        customStyleFn = _props.customStyleFn,
        editorState = _props.editorState,
        editorKey = _props.editorKey,
        textDirectionality = _props.textDirectionality;


    var content = editorState.getCurrentContent();
    var selection = editorState.getSelection();
    var forceSelection = editorState.mustForceSelection();
    var decorator = editorState.getDecorator();
    var directionMap = nullthrows_1(editorState.getDirectionMap());

    var blocksAsArray = content.getBlocksAsArray();
    var processedBlocks = [];

    var currentDepth = null;
    var lastWrapperTemplate = null;

    for (var ii = 0; ii < blocksAsArray.length; ii++) {
      var _block = blocksAsArray[ii];
      var key = _block.getKey();
      var blockType = _block.getType();

      var customRenderer = blockRendererFn(_block);
      var CustomComponent = void 0,
          customProps = void 0,
          customEditable = void 0;
      if (customRenderer) {
        CustomComponent = customRenderer.component;
        customProps = customRenderer.props;
        customEditable = customRenderer.editable;
      }

      var direction = textDirectionality ? textDirectionality : directionMap.get(key);
      var offsetKey = DraftOffsetKey_1.encode(key, 0, 0);
      var componentProps = {
        contentState: content,
        block: _block,
        blockProps: customProps,
        blockStyleFn: blockStyleFn,
        customStyleMap: customStyleMap,
        customStyleFn: customStyleFn,
        decorator: decorator,
        direction: direction,
        forceSelection: forceSelection,
        key: key,
        offsetKey: offsetKey,
        selection: selection,
        tree: editorState.getBlockTree(key)
      };

      var configForType = blockRenderMap.get(blockType) || blockRenderMap.get('unstyled');
      var wrapperTemplate = configForType.wrapper;

      var Element = configForType.element || blockRenderMap.get('unstyled').element;

      var depth = _block.getDepth();
      var className = '';
      if (blockStyleFn) {
        className = blockStyleFn(_block);
      }

      // List items are special snowflakes, since we handle nesting and
      // counters manually.
      if (Element === 'li') {
        var shouldResetCount = lastWrapperTemplate !== wrapperTemplate || currentDepth === null || depth > currentDepth;
        className = joinClasses_1(className, getListItemClasses(blockType, depth, shouldResetCount, direction));
      }

      var Component = CustomComponent || DraftEditorBlock_react;
      var childProps = {
        className: className,
        'data-block': true,
        'data-editor': editorKey,
        'data-offset-key': offsetKey,
        key: key
      };
      if (customEditable !== undefined) {
        childProps = _extends$5({}, childProps, {
          contentEditable: customEditable,
          suppressContentEditableWarning: true
        });
      }

      var child = React__default.createElement(Element, childProps, React__default.createElement(Component, componentProps));

      processedBlocks.push({
        block: child,
        wrapperTemplate: wrapperTemplate,
        key: key,
        offsetKey: offsetKey
      });

      if (wrapperTemplate) {
        currentDepth = _block.getDepth();
      } else {
        currentDepth = null;
      }
      lastWrapperTemplate = wrapperTemplate;
    }

    // Group contiguous runs of blocks that have the same wrapperTemplate
    var outputBlocks = [];
    for (var _ii = 0; _ii < processedBlocks.length;) {
      var info = processedBlocks[_ii];
      if (info.wrapperTemplate) {
        var blocks = [];
        do {
          blocks.push(processedBlocks[_ii].block);
          _ii++;
        } while (_ii < processedBlocks.length && processedBlocks[_ii].wrapperTemplate === info.wrapperTemplate);
        var wrapperElement = React__default.cloneElement(info.wrapperTemplate, {
          key: info.key + '-wrap',
          'data-offset-key': info.offsetKey
        }, blocks);
        outputBlocks.push(wrapperElement);
      } else {
        outputBlocks.push(info.block);
        _ii++;
      }
    }

    return React__default.createElement(
      'div',
      { 'data-contents': 'true' },
      outputBlocks
    );
  };

  return DraftEditorContents;
}(React__default.Component);

var DraftEditorContentsCore_react = DraftEditorContents;

var DraftEditorContents_react = DraftEditorContentsCore_react;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
var PhotosMimeType = {
  isImage: function isImage(mimeString) {
    return getParts(mimeString)[0] === 'image';
  },
  isJpeg: function isJpeg(mimeString) {
    var parts = getParts(mimeString);
    return PhotosMimeType.isImage(mimeString) && (
    // see http://fburl.com/10972194
    parts[1] === 'jpeg' || parts[1] === 'pjpeg');
  }
};

function getParts(mimeString) {
  return mimeString.split('/');
}

var PhotosMimeType_1 = PhotosMimeType;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



/**
 * Convert array-like objects to arrays.
 *
 * This API assumes the caller knows the contents of the data type. For less
 * well defined inputs use createArrayFromMixed.
 *
 * @param {object|function|filelist} obj
 * @return {array}
 */
function toArray(obj) {
  var length = obj.length;

  // Some browsers builtin objects can report typeof 'function' (e.g. NodeList
  // in old versions of Safari).
  !(!Array.isArray(obj) && (typeof obj === 'object' || typeof obj === 'function')) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'toArray: Array-like object expected') : invariant_1(false) : void 0;

  !(typeof length === 'number') ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'toArray: Object needs a length property') : invariant_1(false) : void 0;

  !(length === 0 || length - 1 in obj) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'toArray: Object should have keys for indices') : invariant_1(false) : void 0;

  !(typeof obj.callee !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'toArray: Object can\'t be `arguments`. Use rest params ' + '(function(...args) {}) or Array.from() instead.') : invariant_1(false) : void 0;

  // Old IE doesn't give collections access to hasOwnProperty. Assume inputs
  // without method will throw during the slice call and skip straight to the
  // fallback.
  if (obj.hasOwnProperty) {
    try {
      return Array.prototype.slice.call(obj);
    } catch (e) {
      // IE < 9 does not support Array#slice on collections objects
    }
  }

  // Fall back to copying key by key. This assumes all keys have a value,
  // so will not preserve sparsely populated inputs.
  var ret = Array(length);
  for (var ii = 0; ii < length; ii++) {
    ret[ii] = obj[ii];
  }
  return ret;
}

/**
 * Perform a heuristic test to determine if an object is "array-like".
 *
 *   A monk asked Joshu, a Zen master, "Has a dog Buddha nature?"
 *   Joshu replied: "Mu."
 *
 * This function determines if its argument has "array nature": it returns
 * true if the argument is an actual array, an `arguments' object, or an
 * HTMLCollection (e.g. node.childNodes or node.getElementsByTagName()).
 *
 * It will return false for other array-like objects like Filelist.
 *
 * @param {*} obj
 * @return {boolean}
 */
function hasArrayNature(obj) {
  return (
    // not null/false
    !!obj && (
    // arrays are objects, NodeLists are functions in Safari
    typeof obj == 'object' || typeof obj == 'function') &&
    // quacks like an array
    'length' in obj &&
    // not window
    !('setInterval' in obj) &&
    // no DOM node should be considered an array-like
    // a 'select' element has 'length' and 'item' properties on IE8
    typeof obj.nodeType != 'number' && (
    // a real array
    Array.isArray(obj) ||
    // arguments
    'callee' in obj ||
    // HTMLCollection/NodeList
    'item' in obj)
  );
}

/**
 * Ensure that the argument is an array by wrapping it in an array if it is not.
 * Creates a copy of the argument if it is already an array.
 *
 * This is mostly useful idiomatically:
 *
 *   var createArrayFromMixed = require('createArrayFromMixed');
 *
 *   function takesOneOrMoreThings(things) {
 *     things = createArrayFromMixed(things);
 *     ...
 *   }
 *
 * This allows you to treat `things' as an array, but accept scalars in the API.
 *
 * If you need to convert an array-like object, like `arguments`, into an array
 * use toArray instead.
 *
 * @param {*} obj
 * @return {array}
 */
function createArrayFromMixed(obj) {
  if (!hasArrayNature(obj)) {
    return [obj];
  } else if (Array.isArray(obj)) {
    return obj.slice();
  } else {
    return toArray(obj);
  }
}

var createArrayFromMixed_1 = createArrayFromMixed;

function _classCallCheck$e(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */






var CR_LF_REGEX = new RegExp('\r\n', 'g');
var LF_ONLY = '\n';

var RICH_TEXT_TYPES = {
  'text/rtf': 1,
  'text/html': 1
};

/**
 * If DataTransferItem is a file then return the Blob of data.
 *
 * @param {object} item
 * @return {?blob}
 */
function getFileFromDataTransfer(item) {
  if (item.kind == 'file') {
    return item.getAsFile();
  }
}

var DataTransfer = function () {
  /**
   * @param {object} data
   */
  function DataTransfer(data) {
    _classCallCheck$e(this, DataTransfer);

    this.data = data;

    // Types could be DOMStringList or array
    this.types = data.types ? createArrayFromMixed_1(data.types) : [];
  }

  /**
   * Is this likely to be a rich text data transfer?
   *
   * @return {boolean}
   */


  DataTransfer.prototype.isRichText = function isRichText() {
    // If HTML is available, treat this data as rich text. This way, we avoid
    // using a pasted image if it is packaged with HTML -- this may occur with
    // pastes from MS Word, for example.  However this is only rich text if
    // there's accompanying text.
    if (this.getHTML() && this.getText()) {
      return true;
    }

    // When an image is copied from a preview window, you end up with two
    // DataTransferItems one of which is a file's metadata as text.  Skip those.
    if (this.isImage()) {
      return false;
    }

    return this.types.some(function (type) {
      return RICH_TEXT_TYPES[type];
    });
  };

  /**
   * Get raw text.
   *
   * @return {?string}
   */


  DataTransfer.prototype.getText = function getText() {
    var text;
    if (this.data.getData) {
      if (!this.types.length) {
        text = this.data.getData('Text');
      } else if (this.types.indexOf('text/plain') != -1) {
        text = this.data.getData('text/plain');
      }
    }
    return text ? text.replace(CR_LF_REGEX, LF_ONLY) : null;
  };

  /**
   * Get HTML paste data
   *
   * @return {?string}
   */


  DataTransfer.prototype.getHTML = function getHTML() {
    if (this.data.getData) {
      if (!this.types.length) {
        return this.data.getData('Text');
      } else if (this.types.indexOf('text/html') != -1) {
        return this.data.getData('text/html');
      }
    }
  };

  /**
   * Is this a link data transfer?
   *
   * @return {boolean}
   */


  DataTransfer.prototype.isLink = function isLink() {
    return this.types.some(function (type) {
      return type.indexOf('Url') != -1 || type.indexOf('text/uri-list') != -1 || type.indexOf('text/x-moz-url');
    });
  };

  /**
   * Get a link url.
   *
   * @return {?string}
   */


  DataTransfer.prototype.getLink = function getLink() {
    if (this.data.getData) {
      if (this.types.indexOf('text/x-moz-url') != -1) {
        var url = this.data.getData('text/x-moz-url').split('\n');
        return url[0];
      }
      return this.types.indexOf('text/uri-list') != -1 ? this.data.getData('text/uri-list') : this.data.getData('url');
    }

    return null;
  };

  /**
   * Is this an image data transfer?
   *
   * @return {boolean}
   */


  DataTransfer.prototype.isImage = function isImage() {
    var isImage = this.types.some(function (type) {
      // Firefox will have a type of application/x-moz-file for images during
      // dragging
      return type.indexOf('application/x-moz-file') != -1;
    });

    if (isImage) {
      return true;
    }

    var items = this.getFiles();
    for (var i = 0; i < items.length; i++) {
      var type = items[i].type;
      if (!PhotosMimeType_1.isImage(type)) {
        return false;
      }
    }

    return true;
  };

  DataTransfer.prototype.getCount = function getCount() {
    if (this.data.hasOwnProperty('items')) {
      return this.data.items.length;
    } else if (this.data.hasOwnProperty('mozItemCount')) {
      return this.data.mozItemCount;
    } else if (this.data.files) {
      return this.data.files.length;
    }
    return null;
  };

  /**
   * Get files.
   *
   * @return {array}
   */


  DataTransfer.prototype.getFiles = function getFiles() {
    if (this.data.items) {
      // createArrayFromMixed doesn't properly handle DataTransferItemLists.
      return Array.prototype.slice.call(this.data.items).map(getFileFromDataTransfer).filter(emptyFunction_1.thatReturnsArgument);
    } else if (this.data.files) {
      return Array.prototype.slice.call(this.data.files);
    } else {
      return [];
    }
  };

  /**
   * Are there any files to fetch?
   *
   * @return {boolean}
   */


  DataTransfer.prototype.hasFiles = function hasFiles() {
    return this.getFiles().length > 0;
  };

  return DataTransfer;
}();

var DataTransfer_1 = DataTransfer;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getSelectionOffsetKeyForNode
 * @format
 * 
 */

/**
 * Get offset key from a node or it's child nodes. Return the first offset key
 * found on the DOM tree of given node.
 */

function getSelectionOffsetKeyForNode(node) {
  if (node instanceof Element) {
    var offsetKey = node.getAttribute('data-offset-key');
    if (offsetKey) {
      return offsetKey;
    }
    for (var ii = 0; ii < node.childNodes.length; ii++) {
      var childOffsetKey = getSelectionOffsetKeyForNode(node.childNodes[ii]);
      if (childOffsetKey) {
        return childOffsetKey;
      }
    }
  }
  return null;
}

var getSelectionOffsetKeyForNode_1 = getSelectionOffsetKeyForNode;

/**
 * Get the key from the node's nearest offset-aware ancestor.
 */
function findAncestorOffsetKey(node) {
  var searchNode = node;
  while (searchNode && searchNode !== document.documentElement) {
    var key = getSelectionOffsetKeyForNode_1(searchNode);
    if (key != null) {
      return key;
    }
    searchNode = searchNode.parentNode;
  }
  return null;
}

var findAncestorOffsetKey_1 = findAncestorOffsetKey;

var TEXT_CLIPPING_REGEX = /\.textClipping$/;

var TEXT_TYPES = {
  'text/plain': true,
  'text/html': true,
  'text/rtf': true
};

// Somewhat arbitrary upper bound on text size. Let's not lock up the browser.
var TEXT_SIZE_UPPER_BOUND = 5000;

/**
 * Extract the text content from a file list.
 */
function getTextContentFromFiles(files, callback) {
  var readCount = 0;
  var results = [];
  files.forEach(function ( /*blob*/file) {
    readFile(file, function ( /*string*/text) {
      readCount++;
      text && results.push(text.slice(0, TEXT_SIZE_UPPER_BOUND));
      if (readCount == files.length) {
        callback(results.join('\r'));
      }
    });
  });
}

/**
 * todo isaac: Do work to turn html/rtf into a content fragment.
 */
function readFile(file, callback) {
  if (!commonjsGlobal.FileReader || file.type && !(file.type in TEXT_TYPES)) {
    callback('');
    return;
  }

  if (file.type === '') {
    var contents = '';
    // Special-case text clippings, which have an empty type but include
    // `.textClipping` in the file name. `readAsText` results in an empty
    // string for text clippings, so we force the file name to serve
    // as the text value for the file.
    if (TEXT_CLIPPING_REGEX.test(file.name)) {
      contents = file.name.replace(TEXT_CLIPPING_REGEX, '');
    }
    callback(contents);
    return;
  }

  var reader = new FileReader();
  reader.onload = function () {
    var result = reader.result;
    !(typeof result === 'string') ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'We should be calling "FileReader.readAsText" which returns a string') : invariant_1(false) : void 0;
    callback(result);
  };
  reader.onerror = function () {
    callback('');
  };
  reader.readAsText(file);
}

var getTextContentFromFiles_1 = getTextContentFromFiles;

function getUpdatedSelectionState(editorState, anchorKey, anchorOffset, focusKey, focusOffset) {
  var selection = nullthrows_1(editorState.getSelection());
  if (process.env.NODE_ENV !== 'production') {
    if (!anchorKey || !focusKey) {
      /*eslint-disable no-console */
      console.warn('Invalid selection state.', arguments, editorState.toJS());
      /*eslint-enable no-console */
      return selection;
    }
  }

  var anchorPath = DraftOffsetKey_1.decode(anchorKey);
  var anchorBlockKey = anchorPath.blockKey;
  var anchorLeaf = editorState.getBlockTree(anchorBlockKey).getIn([anchorPath.decoratorKey, 'leaves', anchorPath.leafKey]);

  var focusPath = DraftOffsetKey_1.decode(focusKey);
  var focusBlockKey = focusPath.blockKey;
  var focusLeaf = editorState.getBlockTree(focusBlockKey).getIn([focusPath.decoratorKey, 'leaves', focusPath.leafKey]);

  var anchorLeafStart = anchorLeaf.get('start');
  var focusLeafStart = focusLeaf.get('start');

  var anchorBlockOffset = anchorLeaf ? anchorLeafStart + anchorOffset : null;
  var focusBlockOffset = focusLeaf ? focusLeafStart + focusOffset : null;

  var areEqual = selection.getAnchorKey() === anchorBlockKey && selection.getAnchorOffset() === anchorBlockOffset && selection.getFocusKey() === focusBlockKey && selection.getFocusOffset() === focusBlockOffset;

  if (areEqual) {
    return selection;
  }

  var isBackward = false;
  if (anchorBlockKey === focusBlockKey) {
    var anchorLeafEnd = anchorLeaf.get('end');
    var focusLeafEnd = focusLeaf.get('end');
    if (focusLeafStart === anchorLeafStart && focusLeafEnd === anchorLeafEnd) {
      isBackward = focusOffset < anchorOffset;
    } else {
      isBackward = focusLeafStart < anchorLeafStart;
    }
  } else {
    var startKey = editorState.getCurrentContent().getBlockMap().keySeq().skipUntil(function (v) {
      return v === anchorBlockKey || v === focusBlockKey;
    }).first();
    isBackward = startKey === focusBlockKey;
  }

  return selection.merge({
    anchorKey: anchorBlockKey,
    anchorOffset: anchorBlockOffset,
    focusKey: focusBlockKey,
    focusOffset: focusBlockOffset,
    isBackward: isBackward
  });
}

var getUpdatedSelectionState_1 = getUpdatedSelectionState;

/**
 * Get a SelectionState for the supplied mouse event.
 */
function getSelectionForEvent(event, editorState) {
  var node = null;
  var offset = null;

  if (typeof document.caretRangeFromPoint === 'function') {
    var dropRange = document.caretRangeFromPoint(event.x, event.y);
    node = dropRange.startContainer;
    offset = dropRange.startOffset;
  } else if (event.rangeParent) {
    node = event.rangeParent;
    offset = event.rangeOffset;
  } else {
    return null;
  }

  node = nullthrows_1(node);
  offset = nullthrows_1(offset);
  var offsetKey = nullthrows_1(findAncestorOffsetKey_1(node));

  return getUpdatedSelectionState_1(editorState, offsetKey, offset, offsetKey, offset);
}

var DraftEditorDragHandler = {
  /**
   * Drag originating from input terminated.
   */
  onDragEnd: function onDragEnd(editor$$1) {
    editor$$1.exitCurrentMode();
  },

  /**
   * Handle data being dropped.
   */
  onDrop: function onDrop(editor$$1, e) {
    var data = new DataTransfer_1(e.nativeEvent.dataTransfer);

    var editorState = editor$$1._latestEditorState;
    var dropSelection = getSelectionForEvent(e.nativeEvent, editorState);

    e.preventDefault();
    editor$$1.exitCurrentMode();

    if (dropSelection == null) {
      return;
    }

    var files = data.getFiles();
    if (files.length > 0) {
      if (editor$$1.props.handleDroppedFiles && isEventHandled_1(editor$$1.props.handleDroppedFiles(dropSelection, files))) {
        return;
      }

      getTextContentFromFiles_1(files, function (fileText) {
        fileText && editor$$1.update(insertTextAtSelection(editorState, dropSelection, fileText));
      });
      return;
    }

    var dragType = editor$$1._internalDrag ? 'internal' : 'external';
    if (editor$$1.props.handleDrop && isEventHandled_1(editor$$1.props.handleDrop(dropSelection, data, dragType))) {
      return;
    }

    if (editor$$1._internalDrag) {
      editor$$1.update(moveText(editorState, dropSelection));
      return;
    }

    editor$$1.update(insertTextAtSelection(editorState, dropSelection, data.getText()));
  }
};

function moveText(editorState, targetSelection) {
  var newContentState = DraftModifier_1.moveText(editorState.getCurrentContent(), editorState.getSelection(), targetSelection);
  return EditorState_1.push(editorState, newContentState, 'insert-fragment');
}

/**
 * Insert text at a specified selection.
 */
function insertTextAtSelection(editorState, selection, text) {
  var newContentState = DraftModifier_1.insertText(editorState.getCurrentContent(), selection, text, editorState.getCurrentInlineStyle());
  return EditorState_1.push(editorState, newContentState, 'insert-fragment');
}

var DraftEditorDragHandler_1 = DraftEditorDragHandler;

(function (global, undefined) {

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof commonjsGlobal === "undefined" ? commonjsGlobal : commonjsGlobal : self));

// setimmediate adds setImmediate to the global. We want to make sure we export
// the actual function.


var setImmediate$1 = commonjsGlobal.setImmediate;

// When nothing is focused, Firefox regards two characters, `'` and `/`, as
// commands that should open and focus the "quickfind" search bar. This should
// *never* happen while a contenteditable is focused, but as of v28, it
// sometimes does, even when the keypress event target is the contenteditable.
// This breaks the input. Special case these characters to ensure that when
// they are typed, we prevent default on the event to make sure not to
// trigger quickfind.
var FF_QUICKFIND_CHAR = "'";
var FF_QUICKFIND_LINK_CHAR = '/';
var isFirefox = UserAgent_1.isBrowser('Firefox');

function mustPreventDefaultForCharacter(character) {
  return isFirefox && (character == FF_QUICKFIND_CHAR || character == FF_QUICKFIND_LINK_CHAR);
}

/**
 * Replace the current selection with the specified text string, with the
 * inline style and entity key applied to the newly inserted text.
 */
function replaceText(editorState, text, inlineStyle, entityKey) {
  var contentState = DraftModifier_1.replaceText(editorState.getCurrentContent(), editorState.getSelection(), text, inlineStyle, entityKey);
  return EditorState_1.push(editorState, contentState, 'insert-characters');
}

/**
 * When `onBeforeInput` executes, the browser is attempting to insert a
 * character into the editor. Apply this character data to the document,
 * allowing native insertion if possible.
 *
 * Native insertion is encouraged in order to limit re-rendering and to
 * preserve spellcheck highlighting, which disappears or flashes if re-render
 * occurs on the relevant text nodes.
 */
function editOnBeforeInput(editor$$1, e) {
  if (editor$$1._pendingStateFromBeforeInput !== undefined) {
    editor$$1.update(editor$$1._pendingStateFromBeforeInput);
    editor$$1._pendingStateFromBeforeInput = undefined;
  }

  var editorState = editor$$1._latestEditorState;

  var chars = e.data;

  // In some cases (ex: IE ideographic space insertion) no character data
  // is provided. There's nothing to do when this happens.
  if (!chars) {
    return;
  }

  // Allow the top-level component to handle the insertion manually. This is
  // useful when triggering interesting behaviors for a character insertion,
  // Simple examples: replacing a raw text ':)' with a smile emoji or image
  // decorator, or setting a block to be a list item after typing '- ' at the
  // start of the block.
  if (editor$$1.props.handleBeforeInput && isEventHandled_1(editor$$1.props.handleBeforeInput(chars, editorState))) {
    e.preventDefault();
    return;
  }

  // If selection is collapsed, conditionally allow native behavior. This
  // reduces re-renders and preserves spellcheck highlighting. If the selection
  // is not collapsed, we will re-render.
  var selection = editorState.getSelection();
  var selectionStart = selection.getStartOffset();
  var selectionEnd = selection.getEndOffset();
  var anchorKey = selection.getAnchorKey();

  if (!selection.isCollapsed()) {
    e.preventDefault();

    // If the currently selected text matches what the user is trying to
    // replace it with, let's just update the `SelectionState`. If not, update
    // the `ContentState` with the new text.
    var currentlySelectedChars = editorState.getCurrentContent().getPlainText().slice(selectionStart, selectionEnd);
    if (chars === currentlySelectedChars) {
      editor$$1.update(EditorState_1.forceSelection(editorState, selection.merge({
        focusOffset: selectionEnd
      })));
    } else {
      editor$$1.update(replaceText(editorState, chars, editorState.getCurrentInlineStyle(), getEntityKeyForSelection_1(editorState.getCurrentContent(), editorState.getSelection())));
    }
    return;
  }

  var newEditorState = replaceText(editorState, chars, editorState.getCurrentInlineStyle(), getEntityKeyForSelection_1(editorState.getCurrentContent(), editorState.getSelection()));

  // Bunch of different cases follow where we need to prevent native insertion.
  var mustPreventNative = false;
  if (!mustPreventNative) {
    // Browsers tend to insert text in weird places in the DOM when typing at
    // the start of a leaf, so we'll handle it ourselves.
    mustPreventNative = isSelectionAtLeafStart_1(editor$$1._latestCommittedEditorState);
  }
  if (!mustPreventNative) {
    // Chrome will also split up a node into two pieces if it contains a Tab
    // char, for no explicable reason. Seemingly caused by this commit:
    // https://chromium.googlesource.com/chromium/src/+/013ac5eaf3%5E%21/
    var nativeSelection = commonjsGlobal.getSelection();
    // Selection is necessarily collapsed at this point due to earlier check.
    if (nativeSelection.anchorNode && nativeSelection.anchorNode.nodeType === Node.TEXT_NODE) {
      // See isTabHTMLSpanElement in chromium EditingUtilities.cpp.
      var parentNode = nativeSelection.anchorNode.parentNode;
      mustPreventNative = parentNode.nodeName === 'SPAN' && parentNode.firstChild.nodeType === Node.TEXT_NODE && parentNode.firstChild.nodeValue.indexOf('\t') !== -1;
    }
  }
  if (!mustPreventNative) {
    // Check the old and new "fingerprints" of the current block to determine
    // whether this insertion requires any addition or removal of text nodes,
    // in which case we would prevent the native character insertion.
    var originalFingerprint = BlockTree_1.getFingerprint(editorState.getBlockTree(anchorKey));
    var newFingerprint = BlockTree_1.getFingerprint(newEditorState.getBlockTree(anchorKey));
    mustPreventNative = originalFingerprint !== newFingerprint;
  }
  if (!mustPreventNative) {
    mustPreventNative = mustPreventDefaultForCharacter(chars);
  }
  if (!mustPreventNative) {
    mustPreventNative = nullthrows_1(newEditorState.getDirectionMap()).get(anchorKey) !== nullthrows_1(editorState.getDirectionMap()).get(anchorKey);
  }

  if (mustPreventNative) {
    e.preventDefault();
    editor$$1.update(newEditorState);
    return;
  }

  // We made it all the way! Let the browser do its thing and insert the char.
  newEditorState = EditorState_1.set(newEditorState, {
    nativelyRenderedContent: newEditorState.getCurrentContent()
  });
  // The native event is allowed to occur. To allow user onChange handlers to
  // change the inserted text, we wait until the text is actually inserted
  // before we actually update our state. That way when we rerender, the text
  // we see in the DOM will already have been inserted properly.
  editor$$1._pendingStateFromBeforeInput = newEditorState;
  setImmediate$1(function () {
    if (editor$$1._pendingStateFromBeforeInput !== undefined) {
      editor$$1.update(editor$$1._pendingStateFromBeforeInput);
      editor$$1._pendingStateFromBeforeInput = undefined;
    }
  });
}

var editOnBeforeInput_1 = editOnBeforeInput;

function editOnBlur(editor$$1, e) {
  // In a contentEditable element, when you select a range and then click
  // another active element, this does trigger a `blur` event but will not
  // remove the DOM selection from the contenteditable.
  // This is consistent across all browsers, but we prefer that the editor
  // behave like a textarea, where a `blur` event clears the DOM selection.
  // We therefore force the issue to be certain, checking whether the active
  // element is `body` to force it when blurring occurs within the window (as
  // opposed to clicking to another tab or window).
  if (getActiveElement_1() === document.body) {
    var _selection = commonjsGlobal.getSelection();
    var editorNode = editor$$1.editor;
    if (_selection.rangeCount === 1 && containsNode_1(editorNode, _selection.anchorNode) && containsNode_1(editorNode, _selection.focusNode)) {
      _selection.removeAllRanges();
    }
  }

  var editorState = editor$$1._latestEditorState;
  var currentSelection = editorState.getSelection();
  if (!currentSelection.getHasFocus()) {
    return;
  }

  var selection = currentSelection.set('hasFocus', false);
  editor$$1.props.onBlur && editor$$1.props.onBlur(e);
  editor$$1.update(EditorState_1.acceptSelection(editorState, selection));
}

var editOnBlur_1 = editOnBlur;

/**
 * The user has begun using an IME input system. Switching to `composite` mode
 * allows handling composition input and disables other edit behavior.
 */
function editOnCompositionStart(editor$$1, e) {
  editor$$1.setMode('composite');
  editor$$1.update(EditorState_1.set(editor$$1._latestEditorState, { inCompositionMode: true }));
  // Allow composition handler to interpret the compositionstart event
  editor$$1._onCompositionStart(e);
}

var editOnCompositionStart_1 = editOnCompositionStart;

function getFragmentFromSelection(editorState) {
  var selectionState = editorState.getSelection();

  if (selectionState.isCollapsed()) {
    return null;
  }

  return getContentStateFragment_1(editorState.getCurrentContent(), selectionState);
}

var getFragmentFromSelection_1 = getFragmentFromSelection;

/**
 * If we have a selection, create a ContentState fragment and store
 * it in our internal clipboard. Subsequent paste events will use this
 * fragment if no external clipboard data is supplied.
 */
function editOnCopy(editor$$1, e) {
  var editorState = editor$$1._latestEditorState;
  var selection = editorState.getSelection();

  // No selection, so there's nothing to copy.
  if (selection.isCollapsed()) {
    e.preventDefault();
    return;
  }

  editor$$1.setClipboard(getFragmentFromSelection_1(editor$$1._latestEditorState));
}

var editOnCopy_1 = editOnCopy;

/**
 * On `cut` events, native behavior is allowed to occur so that the system
 * clipboard is set properly. This means that we need to take steps to recover
 * the editor DOM state after the `cut` has occurred in order to maintain
 * control of the component.
 *
 * In addition, we can keep a copy of the removed fragment, including all
 * styles and entities, for use as an internal paste.
 */
function editOnCut(editor$$1, e) {
  var editorState = editor$$1._latestEditorState;
  var selection = editorState.getSelection();
  var element = e.target;
  var scrollPosition = void 0;

  // No selection, so there's nothing to cut.
  if (selection.isCollapsed()) {
    e.preventDefault();
    return;
  }

  // Track the current scroll position so that it can be forced back in place
  // after the editor regains control of the DOM.
  if (element instanceof Node) {
    scrollPosition = getScrollPosition_1(Style_1.getScrollParent(element));
  }

  var fragment = getFragmentFromSelection_1(editorState);
  editor$$1.setClipboard(fragment);

  // Set `cut` mode to disable all event handling temporarily.
  editor$$1.setMode('cut');

  // Let native `cut` behavior occur, then recover control.
  setTimeout(function () {
    editor$$1.restoreEditorDOM(scrollPosition);
    editor$$1.exitCurrentMode();
    editor$$1.update(removeFragment(editorState));
  }, 0);
}

function removeFragment(editorState) {
  var newContent = DraftModifier_1.removeRange(editorState.getCurrentContent(), editorState.getSelection(), 'forward');
  return EditorState_1.push(editorState, newContent, 'remove-range');
}

var editOnCut_1 = editOnCut;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnDragOver
 * @format
 * 
 */

/**
 * Drag behavior has begun from outside the editor element.
 */
function editOnDragOver(editor$$1, e) {
  editor$$1._internalDrag = false;
  editor$$1.setMode('drag');
  e.preventDefault();
}

var editOnDragOver_1 = editOnDragOver;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnDragStart
 * @format
 * 
 */

/**
 * A `dragstart` event has begun within the text editor component.
 */
function editOnDragStart(editor$$1) {
  editor$$1._internalDrag = true;
  editor$$1.setMode('drag');
}

var editOnDragStart_1 = editOnDragStart;

function editOnFocus(editor$$1, e) {
  var editorState = editor$$1._latestEditorState;
  var currentSelection = editorState.getSelection();
  if (currentSelection.getHasFocus()) {
    return;
  }

  var selection = currentSelection.set('hasFocus', true);
  editor$$1.props.onFocus && editor$$1.props.onFocus(e);

  // When the tab containing this text editor is hidden and the user does a
  // find-in-page in a _different_ tab, Chrome on Mac likes to forget what the
  // selection was right after sending this focus event and (if you let it)
  // moves the cursor back to the beginning of the editor, so we force the
  // selection here instead of simply accepting it in order to preserve the
  // old cursor position. See https://crbug.com/540004.
  // But it looks like this is fixed in Chrome 60.0.3081.0.
  // Other browsers also don't have this bug, so we prefer to acceptSelection
  // when possible, to ensure that unfocusing and refocusing a Draft editor
  // doesn't preserve the selection, matching how textareas work.
  if (UserAgent_1.isBrowser('Chrome < 60.0.3081.0')) {
    editor$$1.update(EditorState_1.forceSelection(editorState, selection));
  } else {
    editor$$1.update(EditorState_1.acceptSelection(editorState, selection));
  }
}

var editOnFocus_1 = editOnFocus;

var isGecko = UserAgent_1.isEngine('Gecko');

var DOUBLE_NEWLINE = '\n\n';

/**
 * This function is intended to handle spellcheck and autocorrect changes,
 * which occur in the DOM natively without any opportunity to observe or
 * interpret the changes before they occur.
 *
 * The `input` event fires in contentEditable elements reliably for non-IE
 * browsers, immediately after changes occur to the editor DOM. Since our other
 * handlers override or otherwise handle cover other varieties of text input,
 * the DOM state should match the model in all controlled input cases. Thus,
 * when an `input` change leads to a DOM/model mismatch, the change should be
 * due to a spellcheck change, and we can incorporate it into our model.
 */
function editOnInput(editor$$1) {
  if (editor$$1._pendingStateFromBeforeInput !== undefined) {
    editor$$1.update(editor$$1._pendingStateFromBeforeInput);
    editor$$1._pendingStateFromBeforeInput = undefined;
  }

  var domSelection = commonjsGlobal.getSelection();

  var anchorNode = domSelection.anchorNode,
      isCollapsed = domSelection.isCollapsed;

  var isNotTextNode = anchorNode.nodeType !== Node.TEXT_NODE;
  var isNotTextOrElementNode = anchorNode.nodeType !== Node.TEXT_NODE && anchorNode.nodeType !== Node.ELEMENT_NODE;

  {
    if (isNotTextOrElementNode) {
      // TODO: (t16149272) figure out context for this change
      return;
    }
  }

  if (anchorNode.nodeType === Node.TEXT_NODE && (anchorNode.previousSibling !== null || anchorNode.nextSibling !== null)) {
    // When typing at the beginning of a visual line, Chrome splits the text
    // nodes into two. Why? No one knows. This commit is suspicious:
    // https://chromium.googlesource.com/chromium/src/+/a3b600981286b135632371477f902214c55a1724
    // To work around, we'll merge the sibling text nodes back into this one.
    var span = anchorNode.parentNode;
    anchorNode.nodeValue = span.textContent;
    for (var child = span.firstChild; child !== null; child = child.nextSibling) {
      if (child !== anchorNode) {
        span.removeChild(child);
      }
    }
  }

  var domText = anchorNode.textContent;
  var editorState = editor$$1._latestEditorState;
  var offsetKey = nullthrows_1(findAncestorOffsetKey_1(anchorNode));

  var _DraftOffsetKey$decod = DraftOffsetKey_1.decode(offsetKey),
      blockKey = _DraftOffsetKey$decod.blockKey,
      decoratorKey = _DraftOffsetKey$decod.decoratorKey,
      leafKey = _DraftOffsetKey$decod.leafKey;

  var _editorState$getBlock = editorState.getBlockTree(blockKey).getIn([decoratorKey, 'leaves', leafKey]),
      start = _editorState$getBlock.start,
      end = _editorState$getBlock.end;

  var content = editorState.getCurrentContent();
  var block = content.getBlockForKey(blockKey);
  var modelText = block.getText().slice(start, end);

  // Special-case soft newlines here. If the DOM text ends in a soft newline,
  // we will have manually inserted an extra soft newline in DraftEditorLeaf.
  // We want to remove this extra newline for the purpose of our comparison
  // of DOM and model text.
  if (domText.endsWith(DOUBLE_NEWLINE)) {
    domText = domText.slice(0, -1);
  }

  // No change -- the DOM is up to date. Nothing to do here.
  if (domText === modelText) {
    // This can be buggy for some Android keyboards because they don't fire
    // standard onkeydown/pressed events and only fired editOnInput
    // so domText is already changed by the browser and ends up being equal
    // to modelText unexpectedly
    return;
  }

  var selection = editorState.getSelection();

  // We'll replace the entire leaf with the text content of the target.
  var targetRange = selection.merge({
    anchorOffset: start,
    focusOffset: end,
    isBackward: false
  });

  var entityKey = block.getEntityAt(start);
  var entity = entityKey && content.getEntity(entityKey);
  var entityType = entity && entity.getMutability();
  var preserveEntity = entityType === 'MUTABLE';

  // Immutable or segmented entities cannot properly be handled by the
  // default browser undo, so we have to use a different change type to
  // force using our internal undo method instead of falling through to the
  // native browser undo.
  var changeType = preserveEntity ? 'spellcheck-change' : 'apply-entity';

  var newContent = DraftModifier_1.replaceText(content, targetRange, domText, block.getInlineStyleAt(start), preserveEntity ? block.getEntityAt(start) : null);

  var anchorOffset, focusOffset, startOffset, endOffset;

  if (isGecko) {
    // Firefox selection does not change while the context menu is open, so
    // we preserve the anchor and focus values of the DOM selection.
    anchorOffset = domSelection.anchorOffset;
    focusOffset = domSelection.focusOffset;
    startOffset = start + Math.min(anchorOffset, focusOffset);
    endOffset = startOffset + Math.abs(anchorOffset - focusOffset);
    anchorOffset = startOffset;
    focusOffset = endOffset;
  } else {
    // Browsers other than Firefox may adjust DOM selection while the context
    // menu is open, and Safari autocorrect is prone to providing an inaccurate
    // DOM selection. Don't trust it. Instead, use our existing SelectionState
    // and adjust it based on the number of characters changed during the
    // mutation.
    var charDelta = domText.length - modelText.length;
    startOffset = selection.getStartOffset();
    endOffset = selection.getEndOffset();

    anchorOffset = isCollapsed ? endOffset + charDelta : startOffset;
    focusOffset = endOffset + charDelta;
  }

  // Segmented entities are completely or partially removed when their
  // text content changes. For this case we do not want any text to be selected
  // after the change, so we are not merging the selection.
  var contentWithAdjustedDOMSelection = newContent.merge({
    selectionBefore: content.getSelectionAfter(),
    selectionAfter: selection.merge({ anchorOffset: anchorOffset, focusOffset: focusOffset })
  });

  editor$$1.update(EditorState_1.push(editorState, contentWithAdjustedDOMSelection, changeType));
}

var editOnInput_1 = editOnInput;

var isOSX = UserAgent_1.isPlatform('Mac OS X');

var KeyBindingUtil = {
  /**
   * Check whether the ctrlKey modifier is *not* being used in conjunction with
   * the altKey modifier. If they are combined, the result is an `altGraph`
   * key modifier, which should not be handled by this set of key bindings.
   */
  isCtrlKeyCommand: function isCtrlKeyCommand(e) {
    return !!e.ctrlKey && !e.altKey;
  },

  isOptionKeyCommand: function isOptionKeyCommand(e) {
    return isOSX && e.altKey;
  },

  hasCommandModifier: function hasCommandModifier(e) {
    return isOSX ? !!e.metaKey && !e.altKey : KeyBindingUtil.isCtrlKeyCommand(e);
  }
};

var KeyBindingUtil_1 = KeyBindingUtil;

var clipboard = null;

/**
 * Some systems offer a "secondary" clipboard to allow quick internal cut
 * and paste behavior. For instance, Ctrl+K (cut) and Ctrl+Y (paste).
 */
var SecondaryClipboard = {
  cut: function cut(editorState) {
    var content = editorState.getCurrentContent();
    var selection = editorState.getSelection();
    var targetRange = null;

    if (selection.isCollapsed()) {
      var anchorKey = selection.getAnchorKey();
      var blockEnd = content.getBlockForKey(anchorKey).getLength();

      if (blockEnd === selection.getAnchorOffset()) {
        return editorState;
      }

      targetRange = selection.set('focusOffset', blockEnd);
    } else {
      targetRange = selection;
    }

    targetRange = nullthrows_1(targetRange);
    clipboard = getContentStateFragment_1(content, targetRange);

    var afterRemoval = DraftModifier_1.removeRange(content, targetRange, 'forward');

    if (afterRemoval === content) {
      return editorState;
    }

    return EditorState_1.push(editorState, afterRemoval, 'remove-range');
  },

  paste: function paste(editorState) {
    if (!clipboard) {
      return editorState;
    }

    var newContent = DraftModifier_1.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), clipboard);

    return EditorState_1.push(editorState, newContent, 'insert-fragment');
  }
};

var SecondaryClipboard_1 = SecondaryClipboard;

// These two ranges are consecutive so anything in [HIGH_START, LOW_END] is a
// surrogate code unit.
var SURROGATE_HIGH_START = 0xD800;
var SURROGATE_HIGH_END = 0xDBFF;
var SURROGATE_LOW_START = 0xDC00;
var SURROGATE_LOW_END = 0xDFFF;
var SURROGATE_UNITS_REGEX = /[\uD800-\uDFFF]/;

/**
 * @param {number} codeUnit   A Unicode code-unit, in range [0, 0x10FFFF]
 * @return {boolean}          Whether code-unit is in a surrogate (hi/low) range
 */
function isCodeUnitInSurrogateRange(codeUnit) {
  return SURROGATE_HIGH_START <= codeUnit && codeUnit <= SURROGATE_LOW_END;
}

/**
 * Returns whether the two characters starting at `index` form a surrogate pair.
 * For example, given the string s = "\uD83D\uDE0A", (s, 0) returns true and
 * (s, 1) returns false.
 *
 * @param {string} str
 * @param {number} index
 * @return {boolean}
 */
function isSurrogatePair(str, index) {
  !(0 <= index && index < str.length) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'isSurrogatePair: Invalid index %s for string length %s.', index, str.length) : invariant_1(false) : void 0;
  if (index + 1 === str.length) {
    return false;
  }
  var first = str.charCodeAt(index);
  var second = str.charCodeAt(index + 1);
  return SURROGATE_HIGH_START <= first && first <= SURROGATE_HIGH_END && SURROGATE_LOW_START <= second && second <= SURROGATE_LOW_END;
}

/**
 * @param {string} str  Non-empty string
 * @return {boolean}    True if the input includes any surrogate code units
 */
function hasSurrogateUnit(str) {
  return SURROGATE_UNITS_REGEX.test(str);
}

/**
 * Return the length of the original Unicode character at given position in the
 * String by looking into the UTF-16 code unit; that is equal to 1 for any
 * non-surrogate characters in BMP ([U+0000..U+D7FF] and [U+E000, U+FFFF]); and
 * returns 2 for the hi/low surrogates ([U+D800..U+DFFF]), which are in fact
 * representing non-BMP characters ([U+10000..U+10FFFF]).
 *
 * Examples:
 * - '\u0020' => 1
 * - '\u3020' => 1
 * - '\uD835' => 2
 * - '\uD835\uDDEF' => 2
 * - '\uDDEF' => 2
 *
 * @param {string} str  Non-empty string
 * @param {number} pos  Position in the string to look for one code unit
 * @return {number}      Number 1 or 2
 */
function getUTF16Length(str, pos) {
  return 1 + isCodeUnitInSurrogateRange(str.charCodeAt(pos));
}

/**
 * Fully Unicode-enabled replacement for String#length
 *
 * @param {string} str  Valid Unicode string
 * @return {number}     The number of Unicode characters in the string
 */
function strlen(str) {
  // Call the native functions if there's no surrogate char
  if (!hasSurrogateUnit(str)) {
    return str.length;
  }

  var len = 0;
  for (var pos = 0; pos < str.length; pos += getUTF16Length(str, pos)) {
    len++;
  }
  return len;
}

/**
 * Fully Unicode-enabled replacement for String#substr()
 *
 * @param {string} str      Valid Unicode string
 * @param {number} start    Location in Unicode sequence to begin extracting
 * @param {?number} length  The number of Unicode characters to extract
 *                          (default: to the end of the string)
 * @return {string}         Extracted sub-string
 */
function substr(str, start, length) {
  start = start || 0;
  length = length === undefined ? Infinity : length || 0;

  // Call the native functions if there's no surrogate char
  if (!hasSurrogateUnit(str)) {
    return str.substr(start, length);
  }

  // Obvious cases
  var size = str.length;
  if (size <= 0 || start > size || length <= 0) {
    return '';
  }

  // Find the actual starting position
  var posA = 0;
  if (start > 0) {
    for (; start > 0 && posA < size; start--) {
      posA += getUTF16Length(str, posA);
    }
    if (posA >= size) {
      return '';
    }
  } else if (start < 0) {
    for (posA = size; start < 0 && 0 < posA; start++) {
      posA -= getUTF16Length(str, posA - 1);
    }
    if (posA < 0) {
      posA = 0;
    }
  }

  // Find the actual ending position
  var posB = size;
  if (length < size) {
    for (posB = posA; length > 0 && posB < size; length--) {
      posB += getUTF16Length(str, posB);
    }
  }

  return str.substring(posA, posB);
}

/**
 * Fully Unicode-enabled replacement for String#substring()
 *
 * @param {string} str    Valid Unicode string
 * @param {number} start  Location in Unicode sequence to begin extracting
 * @param {?number} end   Location in Unicode sequence to end extracting
 *                        (default: end of the string)
 * @return {string}       Extracted sub-string
 */
function substring(str, start, end) {
  start = start || 0;
  end = end === undefined ? Infinity : end || 0;

  if (start < 0) {
    start = 0;
  }
  if (end < 0) {
    end = 0;
  }

  var length = Math.abs(end - start);
  start = start < end ? start : end;
  return substr(str, start, length);
}

/**
 * Get a list of Unicode code-points from a String
 *
 * @param {string} str        Valid Unicode string
 * @return {array<number>}    A list of code-points in [0..0x10FFFF]
 */
function getCodePoints(str) {
  var codePoints = [];
  for (var pos = 0; pos < str.length; pos += getUTF16Length(str, pos)) {
    codePoints.push(str.codePointAt(pos));
  }
  return codePoints;
}

var UnicodeUtils = {
  getCodePoints: getCodePoints,
  getUTF16Length: getUTF16Length,
  hasSurrogateUnit: hasSurrogateUnit,
  isCodeUnitInSurrogateRange: isCodeUnitInSurrogateRange,
  isSurrogatePair: isSurrogatePair,
  strlen: strlen,
  substring: substring,
  substr: substr
};

var UnicodeUtils_1 = UnicodeUtils;

var isChrome = UserAgent_1.isBrowser('Chrome');

// In Chrome, the client rects will include the entire bounds of all nodes that
// begin (have a start tag) within the selection, even if the selection does
// not overlap the entire node. To resolve this, we split the range at each
// start tag and join the client rects together.
// https://code.google.com/p/chromium/issues/detail?id=324437
/* eslint-disable consistent-return */
function getRangeClientRectsChrome(range) {
  var tempRange = range.cloneRange();
  var clientRects = [];

  for (var ancestor = range.endContainer; ancestor != null; ancestor = ancestor.parentNode) {
    // If we've climbed up to the common ancestor, we can now use the
    // original start point and stop climbing the tree.
    var atCommonAncestor = ancestor === range.commonAncestorContainer;
    if (atCommonAncestor) {
      tempRange.setStart(range.startContainer, range.startOffset);
    } else {
      tempRange.setStart(tempRange.endContainer, 0);
    }
    var rects = Array.from(tempRange.getClientRects());
    clientRects.push(rects);
    if (atCommonAncestor) {
      var _ref;

      clientRects.reverse();
      return (_ref = []).concat.apply(_ref, clientRects);
    }
    tempRange.setEndBefore(ancestor);
  }

  process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Found an unexpected detached subtree when getting range client rects.') : invariant_1(false);
}
/* eslint-enable consistent-return */

/**
 * Like range.getClientRects() but normalizes for browser bugs.
 */
var getRangeClientRects = isChrome ? getRangeClientRectsChrome : function (range) {
  return Array.from(range.getClientRects());
};

var getRangeClientRects_1 = getRangeClientRects;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule expandRangeToStartOfLine
 * @format
 * 
 */






/**
 * Return the computed line height, in pixels, for the provided element.
 */
function getLineHeightPx(element) {
  var computed = getComputedStyle(element);
  var div = document.createElement('div');
  div.style.fontFamily = computed.fontFamily;
  div.style.fontSize = computed.fontSize;
  div.style.fontStyle = computed.fontStyle;
  div.style.fontWeight = computed.fontWeight;
  div.style.lineHeight = computed.lineHeight;
  div.style.position = 'absolute';
  div.textContent = 'M';

  var documentBody = document.body;
  !documentBody ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Missing document.body') : invariant_1(false) : void 0;

  // forced layout here
  documentBody.appendChild(div);
  var rect = div.getBoundingClientRect();
  documentBody.removeChild(div);

  return rect.height;
}

/**
 * Return whether every ClientRect in the provided list lies on the same line.
 *
 * We assume that the rects on the same line all contain the baseline, so the
 * lowest top line needs to be above the highest bottom line (i.e., if you were
 * to project the rects onto the y-axis, their intersection would be nonempty).
 *
 * In addition, we require that no two boxes are lineHeight (or more) apart at
 * either top or bottom, which helps protect against false positives for fonts
 * with extremely large glyph heights (e.g., with a font size of 17px, Zapfino
 * produces rects of height 58px!).
 */
function areRectsOnOneLine(rects, lineHeight) {
  var minTop = Infinity;
  var minBottom = Infinity;
  var maxTop = -Infinity;
  var maxBottom = -Infinity;

  for (var ii = 0; ii < rects.length; ii++) {
    var rect = rects[ii];
    if (rect.width === 0 || rect.width === 1) {
      // When a range starts or ends a soft wrap, many browsers (Chrome, IE,
      // Safari) include an empty rect on the previous or next line. When the
      // text lies in a container whose position is not integral (e.g., from
      // margin: auto), Safari makes these empty rects have width 1 (instead of
      // 0). Having one-pixel-wide characters seems unlikely (and most browsers
      // report widths in subpixel precision anyway) so it's relatively safe to
      // skip over them.
      continue;
    }
    minTop = Math.min(minTop, rect.top);
    minBottom = Math.min(minBottom, rect.bottom);
    maxTop = Math.max(maxTop, rect.top);
    maxBottom = Math.max(maxBottom, rect.bottom);
  }

  return maxTop <= minBottom && maxTop - minTop < lineHeight && maxBottom - minBottom < lineHeight;
}

/**
 * Return the length of a node, as used by Range offsets.
 */
function getNodeLength$1(node) {
  // http://www.w3.org/TR/dom/#concept-node-length
  switch (node.nodeType) {
    case Node.DOCUMENT_TYPE_NODE:
      return 0;
    case Node.TEXT_NODE:
    case Node.PROCESSING_INSTRUCTION_NODE:
    case Node.COMMENT_NODE:
      return node.length;
    default:
      return node.childNodes.length;
  }
}

/**
 * Given a collapsed range, move the start position backwards as far as
 * possible while the range still spans only a single line.
 */
function expandRangeToStartOfLine(range) {
  !range.collapsed ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'expandRangeToStartOfLine: Provided range is not collapsed.') : invariant_1(false) : void 0;
  range = range.cloneRange();

  var containingElement = range.startContainer;
  if (containingElement.nodeType !== 1) {
    containingElement = containingElement.parentNode;
  }
  var lineHeight = getLineHeightPx(containingElement);

  // Imagine our text looks like:
  //   <div><span>once upon a time, there was a <em>boy
  //   who lived</em> </span><q><strong>under^ the
  //   stairs</strong> in a small closet.</q></div>
  // where the caret represents the cursor. First, we crawl up the tree until
  // the range spans multiple lines (setting the start point to before
  // "<strong>", then before "<div>"), then at each level we do a search to
  // find the latest point which is still on a previous line. We'll find that
  // the break point is inside the span, then inside the <em>, then in its text
  // node child, the actual break point before "who".

  var bestContainer = range.endContainer;
  var bestOffset = range.endOffset;
  range.setStart(range.startContainer, 0);

  while (areRectsOnOneLine(getRangeClientRects_1(range), lineHeight)) {
    bestContainer = range.startContainer;
    bestOffset = range.startOffset;
    !bestContainer.parentNode ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Found unexpected detached subtree when traversing.') : invariant_1(false) : void 0;
    range.setStartBefore(bestContainer);
    if (bestContainer.nodeType === 1 && getComputedStyle(bestContainer).display !== 'inline') {
      // The start of the line is never in a different block-level container.
      break;
    }
  }

  // In the above example, range now spans from "<div>" to "under",
  // bestContainer is <div>, and bestOffset is 1 (index of <q> inside <div>)].
  // Picking out which child to recurse into here is a special case since we
  // don't want to check past <q> -- once we find that the final range starts
  // in <span>, we can look at all of its children (and all of their children)
  // to find the break point.

  // At all times, (bestContainer, bestOffset) is the latest single-line start
  // point that we know of.
  var currentContainer = bestContainer;
  var maxIndexToConsider = bestOffset - 1;

  do {
    var nodeValue = currentContainer.nodeValue;

    for (var ii = maxIndexToConsider; ii >= 0; ii--) {
      if (nodeValue != null && ii > 0 && UnicodeUtils_1.isSurrogatePair(nodeValue, ii - 1)) {
        // We're in the middle of a surrogate pair -- skip over so we never
        // return a range with an endpoint in the middle of a code point.
        continue;
      }

      range.setStart(currentContainer, ii);
      if (areRectsOnOneLine(getRangeClientRects_1(range), lineHeight)) {
        bestContainer = currentContainer;
        bestOffset = ii;
      } else {
        break;
      }
    }

    if (ii === -1 || currentContainer.childNodes.length === 0) {
      // If ii === -1, then (bestContainer, bestOffset), which is equal to
      // (currentContainer, 0), was a single-line start point but a start
      // point before currentContainer wasn't, so the line break seems to
      // have occurred immediately after currentContainer's start tag
      //
      // If currentContainer.childNodes.length === 0, we're already at a
      // terminal node (e.g., text node) and should return our current best.
      break;
    }

    currentContainer = currentContainer.childNodes[ii];
    maxIndexToConsider = getNodeLength$1(currentContainer);
  } while (true);

  range.setStart(bestContainer, bestOffset);
  return range;
}

var expandRangeToStartOfLine_1 = expandRangeToStartOfLine;

/**
 * Convert the current selection range to an anchor/focus pair of offset keys
 * and values that can be interpreted by components.
 */
function getDraftEditorSelectionWithNodes(editorState, root, anchorNode, anchorOffset, focusNode, focusOffset) {
  var anchorIsTextNode = anchorNode.nodeType === Node.TEXT_NODE;
  var focusIsTextNode = focusNode.nodeType === Node.TEXT_NODE;

  // If the selection range lies only on text nodes, the task is simple.
  // Find the nearest offset-aware elements and use the
  // offset values supplied by the selection range.
  if (anchorIsTextNode && focusIsTextNode) {
    return {
      selectionState: getUpdatedSelectionState_1(editorState, nullthrows_1(findAncestorOffsetKey_1(anchorNode)), anchorOffset, nullthrows_1(findAncestorOffsetKey_1(focusNode)), focusOffset),
      needsRecovery: false
    };
  }

  var anchorPoint = null;
  var focusPoint = null;
  var needsRecovery = true;

  // An element is selected. Convert this selection range into leaf offset
  // keys and offset values for consumption at the component level. This
  // is common in Firefox, where select-all and triple click behavior leads
  // to entire elements being selected.
  //
  // Note that we use the `needsRecovery` parameter in the callback here. This
  // is because when certain elements are selected, the behavior for subsequent
  // cursor movement (e.g. via arrow keys) is uncertain and may not match
  // expectations at the component level. For example, if an entire <div> is
  // selected and the user presses the right arrow, Firefox keeps the selection
  // on the <div>. If we allow subsequent keypresses to insert characters
  // natively, they will be inserted into a browser-created text node to the
  // right of that <div>. This is obviously undesirable.
  //
  // With the `needsRecovery` flag, we inform the caller that it is responsible
  // for manually setting the selection state on the rendered document to
  // ensure proper selection state maintenance.

  if (anchorIsTextNode) {
    anchorPoint = {
      key: nullthrows_1(findAncestorOffsetKey_1(anchorNode)),
      offset: anchorOffset
    };
    focusPoint = getPointForNonTextNode(root, focusNode, focusOffset);
  } else if (focusIsTextNode) {
    focusPoint = {
      key: nullthrows_1(findAncestorOffsetKey_1(focusNode)),
      offset: focusOffset
    };
    anchorPoint = getPointForNonTextNode(root, anchorNode, anchorOffset);
  } else {
    anchorPoint = getPointForNonTextNode(root, anchorNode, anchorOffset);
    focusPoint = getPointForNonTextNode(root, focusNode, focusOffset);

    // If the selection is collapsed on an empty block, don't force recovery.
    // This way, on arrow key selection changes, the browser can move the
    // cursor from a non-zero offset on one block, through empty blocks,
    // to a matching non-zero offset on other text blocks.
    if (anchorNode === focusNode && anchorOffset === focusOffset) {
      needsRecovery = !!anchorNode.firstChild && anchorNode.firstChild.nodeName !== 'BR';
    }
  }

  return {
    selectionState: getUpdatedSelectionState_1(editorState, anchorPoint.key, anchorPoint.offset, focusPoint.key, focusPoint.offset),
    needsRecovery: needsRecovery
  };
}

/**
 * Identify the first leaf descendant for the given node.
 */
function getFirstLeaf(node) {
  while (node.firstChild && (
  // data-blocks has no offset
  node.firstChild instanceof Element && node.firstChild.getAttribute('data-blocks') === 'true' || getSelectionOffsetKeyForNode_1(node.firstChild))) {
    node = node.firstChild;
  }
  return node;
}

/**
 * Identify the last leaf descendant for the given node.
 */
function getLastLeaf(node) {
  while (node.lastChild && (
  // data-blocks has no offset
  node.lastChild instanceof Element && node.lastChild.getAttribute('data-blocks') === 'true' || getSelectionOffsetKeyForNode_1(node.lastChild))) {
    node = node.lastChild;
  }
  return node;
}

function getPointForNonTextNode(editorRoot, startNode, childOffset) {
  var node = startNode;
  var offsetKey = findAncestorOffsetKey_1(node);

  !(offsetKey != null || editorRoot && (editorRoot === node || editorRoot.firstChild === node)) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Unknown node in selection range.') : invariant_1(false) : void 0;

  // If the editorRoot is the selection, step downward into the content
  // wrapper.
  if (editorRoot === node) {
    node = node.firstChild;
    !(node instanceof Element && node.getAttribute('data-contents') === 'true') ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Invalid DraftEditorContents structure.') : invariant_1(false) : void 0;
    if (childOffset > 0) {
      childOffset = node.childNodes.length;
    }
  }

  // If the child offset is zero and we have an offset key, we're done.
  // If there's no offset key because the entire editor is selected,
  // find the leftmost ("first") leaf in the tree and use that as the offset
  // key.
  if (childOffset === 0) {
    var key = null;
    if (offsetKey != null) {
      key = offsetKey;
    } else {
      var firstLeaf = getFirstLeaf(node);
      key = nullthrows_1(getSelectionOffsetKeyForNode_1(firstLeaf));
    }
    return { key: key, offset: 0 };
  }

  var nodeBeforeCursor = node.childNodes[childOffset - 1];
  var leafKey = null;
  var textLength = null;

  if (!getSelectionOffsetKeyForNode_1(nodeBeforeCursor)) {
    // Our target node may be a leaf or a text node, in which case we're
    // already where we want to be and can just use the child's length as
    // our offset.
    leafKey = nullthrows_1(offsetKey);
    textLength = getTextContentLength(nodeBeforeCursor);
  } else {
    // Otherwise, we'll look at the child to the left of the cursor and find
    // the last leaf node in its subtree.
    var lastLeaf = getLastLeaf(nodeBeforeCursor);
    leafKey = nullthrows_1(getSelectionOffsetKeyForNode_1(lastLeaf));
    textLength = getTextContentLength(lastLeaf);
  }

  return {
    key: leafKey,
    offset: textLength
  };
}

/**
 * Return the length of a node's textContent, regarding single newline
 * characters as zero-length. This allows us to avoid problems with identifying
 * the correct selection offset for empty blocks in IE, in which we
 * render newlines instead of break tags.
 */
function getTextContentLength(node) {
  var textContent = node.textContent;
  return textContent === '\n' ? 0 : textContent.length;
}

var getDraftEditorSelectionWithNodes_1 = getDraftEditorSelectionWithNodes;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule moveSelectionBackward
 * @format
 * 
 */

/**
 * Given a collapsed selection, move the focus `maxDistance` backward within
 * the selected block. If the selection will go beyond the start of the block,
 * move focus to the end of the previous block, but no further.
 *
 * This function is not Unicode-aware, so surrogate pairs will be treated
 * as having length 2.
 */
function moveSelectionBackward(editorState, maxDistance) {
  var selection = editorState.getSelection();
  var content = editorState.getCurrentContent();
  var key = selection.getStartKey();
  var offset = selection.getStartOffset();

  var focusKey = key;
  var focusOffset = 0;

  if (maxDistance > offset) {
    var keyBefore = content.getKeyBefore(key);
    if (keyBefore == null) {
      focusKey = key;
    } else {
      focusKey = keyBefore;
      var blockBefore = content.getBlockForKey(keyBefore);
      focusOffset = blockBefore.getText().length;
    }
  } else {
    focusOffset = offset - maxDistance;
  }

  return selection.merge({
    focusKey: focusKey,
    focusOffset: focusOffset,
    isBackward: true
  });
}

var moveSelectionBackward_1 = moveSelectionBackward;

/**
 * For a collapsed selection state, remove text based on the specified strategy.
 * If the selection state is not collapsed, remove the entire selected range.
 */
function removeTextWithStrategy(editorState, strategy, direction) {
  var selection = editorState.getSelection();
  var content = editorState.getCurrentContent();
  var target = selection;
  if (selection.isCollapsed()) {
    if (direction === 'forward') {
      if (editorState.isSelectionAtEndOfContent()) {
        return content;
      }
    } else if (editorState.isSelectionAtStartOfContent()) {
      return content;
    }

    target = strategy(editorState);
    if (target === selection) {
      return content;
    }
  }
  return DraftModifier_1.removeRange(content, target, direction);
}

var removeTextWithStrategy_1 = removeTextWithStrategy;

function keyCommandBackspaceToStartOfLine(editorState) {
  var afterRemoval = removeTextWithStrategy_1(editorState, function (strategyState) {
    var selection = strategyState.getSelection();
    if (selection.isCollapsed() && selection.getAnchorOffset() === 0) {
      return moveSelectionBackward_1(strategyState, 1);
    }

    var domSelection = commonjsGlobal.getSelection();
    var range = domSelection.getRangeAt(0);
    range = expandRangeToStartOfLine_1(range);

    return getDraftEditorSelectionWithNodes_1(strategyState, null, range.endContainer, range.endOffset, range.startContainer, range.startOffset).selectionState;
  }, 'backward');

  if (afterRemoval === editorState.getCurrentContent()) {
    return editorState;
  }

  return EditorState_1.push(editorState, afterRemoval, 'remove-range');
}

var keyCommandBackspaceToStartOfLine_1 = keyCommandBackspaceToStartOfLine;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * @stub
 * 
 */

// \u00a1-\u00b1\u00b4-\u00b8\u00ba\u00bb\u00bf
//             is latin supplement punctuation except fractions and superscript
//             numbers
// \u2010-\u2027\u2030-\u205e
//             is punctuation from the general punctuation block:
//             weird quotes, commas, bullets, dashes, etc.
// \u30fb\u3001\u3002\u3008-\u3011\u3014-\u301f
//             is CJK punctuation
// \uff1a-\uff1f\uff01-\uff0f\uff3b-\uff40\uff5b-\uff65
//             is some full-width/half-width punctuation
// \u2E2E\u061f\u066a-\u066c\u061b\u060c\u060d\uFD3e\uFD3F
//             is some Arabic punctuation marks
// \u1801\u0964\u104a\u104b
//             is misc. other language punctuation marks

var PUNCTUATION = '[.,+*?$|#{}()\'\\^\\-\\[\\]\\\\\\/!@%"~=<>_:;' + '\u30FB\u3001\u3002\u3008-\u3011\u3014-\u301F\uFF1A-\uFF1F\uFF01-\uFF0F' + '\uFF3B-\uFF40\uFF5B-\uFF65\u2E2E\u061F\u066A-\u066C\u061B\u060C\u060D' + '\uFD3E\uFD3F\u1801\u0964\u104A\u104B\u2010-\u2027\u2030-\u205E' + '\xA1-\xB1\xB4-\xB8\xBA\xBB\xBF]';

var TokenizeUtil = {
  getPunctuation: function getPunctuation() {
    return PUNCTUATION;
  }
};

var punctuation = TokenizeUtil.getPunctuation();

// The apostrophe and curly single quotes behave in a curious way: when
// surrounded on both sides by word characters, they behave as word chars; when
// either neighbor is punctuation or an end of the string, they behave as
// punctuation.
var CHAMELEON_CHARS = '[\'\u2018\u2019]';

// Remove the underscore, which should count as part of the removable word. The
// "chameleon chars" also count as punctuation in this regex.
var WHITESPACE_AND_PUNCTUATION = '\\s|(?![_])' + punctuation;

var DELETE_STRING = '^' + '(?:' + WHITESPACE_AND_PUNCTUATION + ')*' + '(?:' + CHAMELEON_CHARS + '|(?!' + WHITESPACE_AND_PUNCTUATION + ').)*' + '(?:(?!' + WHITESPACE_AND_PUNCTUATION + ').)';
var DELETE_REGEX = new RegExp(DELETE_STRING);

var BACKSPACE_STRING = '(?:(?!' + WHITESPACE_AND_PUNCTUATION + ').)' + '(?:' + CHAMELEON_CHARS + '|(?!' + WHITESPACE_AND_PUNCTUATION + ').)*' + '(?:' + WHITESPACE_AND_PUNCTUATION + ')*' + '$';
var BACKSPACE_REGEX = new RegExp(BACKSPACE_STRING);

function getRemovableWord(text, isBackward) {
  var matches = isBackward ? BACKSPACE_REGEX.exec(text) : DELETE_REGEX.exec(text);
  return matches ? matches[0] : text;
}

var DraftRemovableWord = {
  getBackward: function getBackward(text) {
    return getRemovableWord(text, true);
  },

  getForward: function getForward(text) {
    return getRemovableWord(text, false);
  }
};

var DraftRemovableWord_1 = DraftRemovableWord;

/**
 * Delete the word that is left of the cursor, as well as any spaces or
 * punctuation after the word.
 */
function keyCommandBackspaceWord(editorState) {
  var afterRemoval = removeTextWithStrategy_1(editorState, function (strategyState) {
    var selection = strategyState.getSelection();
    var offset = selection.getStartOffset();
    // If there are no words before the cursor, remove the preceding newline.
    if (offset === 0) {
      return moveSelectionBackward_1(strategyState, 1);
    }
    var key = selection.getStartKey();
    var content = strategyState.getCurrentContent();
    var text = content.getBlockForKey(key).getText().slice(0, offset);
    var toRemove = DraftRemovableWord_1.getBackward(text);
    return moveSelectionBackward_1(strategyState, toRemove.length || 1);
  }, 'backward');

  if (afterRemoval === editorState.getCurrentContent()) {
    return editorState;
  }

  return EditorState_1.push(editorState, afterRemoval, 'remove-range');
}

var keyCommandBackspaceWord_1 = keyCommandBackspaceWord;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule moveSelectionForward
 * @format
 * 
 */

/**
 * Given a collapsed selection, move the focus `maxDistance` forward within
 * the selected block. If the selection will go beyond the end of the block,
 * move focus to the start of the next block, but no further.
 *
 * This function is not Unicode-aware, so surrogate pairs will be treated
 * as having length 2.
 */
function moveSelectionForward(editorState, maxDistance) {
  var selection = editorState.getSelection();
  var key = selection.getStartKey();
  var offset = selection.getStartOffset();
  var content = editorState.getCurrentContent();

  var focusKey = key;
  var focusOffset;

  var block = content.getBlockForKey(key);

  if (maxDistance > block.getText().length - offset) {
    focusKey = content.getKeyAfter(key);
    focusOffset = 0;
  } else {
    focusOffset = offset + maxDistance;
  }

  return selection.merge({ focusKey: focusKey, focusOffset: focusOffset });
}

var moveSelectionForward_1 = moveSelectionForward;

/**
 * Delete the word that is right of the cursor, as well as any spaces or
 * punctuation before the word.
 */
function keyCommandDeleteWord(editorState) {
  var afterRemoval = removeTextWithStrategy_1(editorState, function (strategyState) {
    var selection = strategyState.getSelection();
    var offset = selection.getStartOffset();
    var key = selection.getStartKey();
    var content = strategyState.getCurrentContent();
    var text = content.getBlockForKey(key).getText().slice(offset);
    var toRemove = DraftRemovableWord_1.getForward(text);

    // If there are no words in front of the cursor, remove the newline.
    return moveSelectionForward_1(strategyState, toRemove.length || 1);
  }, 'forward');

  if (afterRemoval === editorState.getCurrentContent()) {
    return editorState;
  }

  return EditorState_1.push(editorState, afterRemoval, 'remove-range');
}

var keyCommandDeleteWord_1 = keyCommandDeleteWord;

function keyCommandInsertNewline(editorState) {
  var contentState = DraftModifier_1.splitBlock(editorState.getCurrentContent(), editorState.getSelection());
  return EditorState_1.push(editorState, contentState, 'split-block');
}

var keyCommandInsertNewline_1 = keyCommandInsertNewline;

/**
 * See comment for `moveSelectionToStartOfBlock`.
 */
function keyCommandMoveSelectionToEndOfBlock(editorState) {
  var selection = editorState.getSelection();
  var endKey = selection.getEndKey();
  var content = editorState.getCurrentContent();
  var textLength = content.getBlockForKey(endKey).getLength();
  return EditorState_1.set(editorState, {
    selection: selection.merge({
      anchorKey: endKey,
      anchorOffset: textLength,
      focusKey: endKey,
      focusOffset: textLength,
      isBackward: false
    }),
    forceSelection: true
  });
}

var keyCommandMoveSelectionToEndOfBlock_1 = keyCommandMoveSelectionToEndOfBlock;

/**
 * Collapse selection at the start of the first selected block. This is used
 * for Firefox versions that attempt to navigate forward/backward instead of
 * moving the cursor. Other browsers are able to move the cursor natively.
 */
function keyCommandMoveSelectionToStartOfBlock(editorState) {
  var selection = editorState.getSelection();
  var startKey = selection.getStartKey();
  return EditorState_1.set(editorState, {
    selection: selection.merge({
      anchorKey: startKey,
      anchorOffset: 0,
      focusKey: startKey,
      focusOffset: 0,
      isBackward: false
    }),
    forceSelection: true
  });
}

var keyCommandMoveSelectionToStartOfBlock_1 = keyCommandMoveSelectionToStartOfBlock;

/**
 * Remove the selected range. If the cursor is collapsed, remove the preceding
 * character. This operation is Unicode-aware, so removing a single character
 * will remove a surrogate pair properly as well.
 */
function keyCommandPlainBackspace(editorState) {
  var afterRemoval = removeTextWithStrategy_1(editorState, function (strategyState) {
    var selection = strategyState.getSelection();
    var content = strategyState.getCurrentContent();
    var key = selection.getAnchorKey();
    var offset = selection.getAnchorOffset();
    var charBehind = content.getBlockForKey(key).getText()[offset - 1];
    return moveSelectionBackward_1(strategyState, charBehind ? UnicodeUtils_1.getUTF16Length(charBehind, 0) : 1);
  }, 'backward');

  if (afterRemoval === editorState.getCurrentContent()) {
    return editorState;
  }

  var selection = editorState.getSelection();
  return EditorState_1.push(editorState, afterRemoval.set('selectionBefore', selection), selection.isCollapsed() ? 'backspace-character' : 'remove-range');
}

var keyCommandPlainBackspace_1 = keyCommandPlainBackspace;

/**
 * Remove the selected range. If the cursor is collapsed, remove the following
 * character. This operation is Unicode-aware, so removing a single character
 * will remove a surrogate pair properly as well.
 */
function keyCommandPlainDelete(editorState) {
  var afterRemoval = removeTextWithStrategy_1(editorState, function (strategyState) {
    var selection = strategyState.getSelection();
    var content = strategyState.getCurrentContent();
    var key = selection.getAnchorKey();
    var offset = selection.getAnchorOffset();
    var charAhead = content.getBlockForKey(key).getText()[offset];
    return moveSelectionForward_1(strategyState, charAhead ? UnicodeUtils_1.getUTF16Length(charAhead, 0) : 1);
  }, 'forward');

  if (afterRemoval === editorState.getCurrentContent()) {
    return editorState;
  }

  var selection = editorState.getSelection();

  return EditorState_1.push(editorState, afterRemoval.set('selectionBefore', selection), selection.isCollapsed() ? 'delete-character' : 'remove-range');
}

var keyCommandPlainDelete_1 = keyCommandPlainDelete;

/**
 * Transpose the characters on either side of a collapsed cursor, or
 * if the cursor is at the end of the block, transpose the last two
 * characters.
 */
function keyCommandTransposeCharacters(editorState) {
  var selection = editorState.getSelection();
  if (!selection.isCollapsed()) {
    return editorState;
  }

  var offset = selection.getAnchorOffset();
  if (offset === 0) {
    return editorState;
  }

  var blockKey = selection.getAnchorKey();
  var content = editorState.getCurrentContent();
  var block = content.getBlockForKey(blockKey);
  var length = block.getLength();

  // Nothing to transpose if there aren't two characters.
  if (length <= 1) {
    return editorState;
  }

  var removalRange;
  var finalSelection;

  if (offset === length) {
    // The cursor is at the end of the block. Swap the last two characters.
    removalRange = selection.set('anchorOffset', offset - 1);
    finalSelection = selection;
  } else {
    removalRange = selection.set('focusOffset', offset + 1);
    finalSelection = removalRange.set('anchorOffset', offset + 1);
  }

  // Extract the character to move as a fragment. This preserves its
  // styling and entity, if any.
  var movedFragment = getContentStateFragment_1(content, removalRange);
  var afterRemoval = DraftModifier_1.removeRange(content, removalRange, 'backward');

  // After the removal, the insertion target is one character back.
  var selectionAfter = afterRemoval.getSelectionAfter();
  var targetOffset = selectionAfter.getAnchorOffset() - 1;
  var targetRange = selectionAfter.merge({
    anchorOffset: targetOffset,
    focusOffset: targetOffset
  });

  var afterInsert = DraftModifier_1.replaceWithFragment(afterRemoval, targetRange, movedFragment);

  var newEditorState = EditorState_1.push(editorState, afterInsert, 'insert-fragment');

  return EditorState_1.acceptSelection(newEditorState, finalSelection);
}

var keyCommandTransposeCharacters_1 = keyCommandTransposeCharacters;

function keyCommandUndo(e, editorState, updateFn) {
  var undoneState = EditorState_1.undo(editorState);

  // If the last change to occur was a spellcheck change, allow the undo
  // event to fall through to the browser. This allows the browser to record
  // the unwanted change, which should soon lead it to learn not to suggest
  // the correction again.
  if (editorState.getLastChangeType() === 'spellcheck-change') {
    var nativelyRenderedContent = undoneState.getCurrentContent();
    updateFn(EditorState_1.set(undoneState, { nativelyRenderedContent: nativelyRenderedContent }));
    return;
  }

  // Otheriwse, manage the undo behavior manually.
  e.preventDefault();
  if (!editorState.getNativelyRenderedContent()) {
    updateFn(undoneState);
    return;
  }

  // Trigger a re-render with the current content state to ensure that the
  // component tree has up-to-date props for comparison.
  updateFn(EditorState_1.set(editorState, { nativelyRenderedContent: null }));

  // Wait to ensure that the re-render has occurred before performing
  // the undo action.
  setTimeout(function () {
    updateFn(undoneState);
  }, 0);
}

var keyCommandUndo_1 = keyCommandUndo;

var isOptionKeyCommand = KeyBindingUtil_1.isOptionKeyCommand;

var isChrome$1 = UserAgent_1.isBrowser('Chrome');

/**
 * Map a `DraftEditorCommand` command value to a corresponding function.
 */
function onKeyCommand(command, editorState) {
  switch (command) {
    case 'redo':
      return EditorState_1.redo(editorState);
    case 'delete':
      return keyCommandPlainDelete_1(editorState);
    case 'delete-word':
      return keyCommandDeleteWord_1(editorState);
    case 'backspace':
      return keyCommandPlainBackspace_1(editorState);
    case 'backspace-word':
      return keyCommandBackspaceWord_1(editorState);
    case 'backspace-to-start-of-line':
      return keyCommandBackspaceToStartOfLine_1(editorState);
    case 'split-block':
      return keyCommandInsertNewline_1(editorState);
    case 'transpose-characters':
      return keyCommandTransposeCharacters_1(editorState);
    case 'move-selection-to-start-of-block':
      return keyCommandMoveSelectionToStartOfBlock_1(editorState);
    case 'move-selection-to-end-of-block':
      return keyCommandMoveSelectionToEndOfBlock_1(editorState);
    case 'secondary-cut':
      return SecondaryClipboard_1.cut(editorState);
    case 'secondary-paste':
      return SecondaryClipboard_1.paste(editorState);
    default:
      return editorState;
  }
}

/**
 * Intercept keydown behavior to handle keys and commands manually, if desired.
 *
 * Keydown combinations may be mapped to `DraftCommand` values, which may
 * correspond to command functions that modify the editor or its contents.
 *
 * See `getDefaultKeyBinding` for defaults. Alternatively, the top-level
 * component may provide a custom mapping via the `keyBindingFn` prop.
 */
function editOnKeyDown(editor$$1, e) {
  var keyCode = e.which;
  var editorState = editor$$1._latestEditorState;

  switch (keyCode) {
    case Keys.RETURN:
      e.preventDefault();
      // The top-level component may manually handle newline insertion. If
      // no special handling is performed, fall through to command handling.
      if (editor$$1.props.handleReturn && isEventHandled_1(editor$$1.props.handleReturn(e, editorState))) {
        return;
      }
      break;
    case Keys.ESC:
      e.preventDefault();
      editor$$1.props.onEscape && editor$$1.props.onEscape(e);
      return;
    case Keys.TAB:
      editor$$1.props.onTab && editor$$1.props.onTab(e);
      return;
    case Keys.UP:
      editor$$1.props.onUpArrow && editor$$1.props.onUpArrow(e);
      return;
    case Keys.RIGHT:
      editor$$1.props.onRightArrow && editor$$1.props.onRightArrow(e);
      return;
    case Keys.DOWN:
      editor$$1.props.onDownArrow && editor$$1.props.onDownArrow(e);
      return;
    case Keys.LEFT:
      editor$$1.props.onLeftArrow && editor$$1.props.onLeftArrow(e);
      return;
    case Keys.SPACE:
      // Handling for OSX where option + space scrolls.
      if (isChrome$1 && isOptionKeyCommand(e)) {
        e.preventDefault();
        // Insert a nbsp into the editor.
        var contentState = DraftModifier_1.replaceText(editorState.getCurrentContent(), editorState.getSelection(), '\xA0');
        editor$$1.update(EditorState_1.push(editorState, contentState, 'insert-characters'));
        return;
      }
  }

  var command = editor$$1.props.keyBindingFn(e);

  // If no command is specified, allow keydown event to continue.
  if (!command) {
    return;
  }

  if (command === 'undo') {
    // Since undo requires some special updating behavior to keep the editor
    // in sync, handle it separately.
    keyCommandUndo_1(e, editorState, editor$$1.update);
    return;
  }

  // At this point, we know that we're handling a command of some kind, so
  // we don't want to insert a character following the keydown.
  e.preventDefault();

  // Allow components higher up the tree to handle the command first.
  if (editor$$1.props.handleKeyCommand && isEventHandled_1(editor$$1.props.handleKeyCommand(command, editorState))) {
    return;
  }

  var newState = onKeyCommand(command, editorState);
  if (newState !== editorState) {
    editor$$1.update(newState);
  }
}

var editOnKeyDown_1 = editOnKeyDown;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function _classCallCheck$f(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URI = function () {
  function URI(uri) {
    _classCallCheck$f(this, URI);

    this._uri = uri;
  }

  URI.prototype.toString = function toString() {
    return this._uri;
  };

  return URI;
}();

var URI_1 = URI;

var isOldIE = UserAgent_1.isBrowser('IE <= 9');

// Provides a dom node that will not execute scripts
// https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation.createHTMLDocument
// https://developer.mozilla.org/en-US/Add-ons/Code_snippets/HTML_to_DOM

function getSafeBodyFromHTML(html) {
  var doc;
  var root = null;
  // Provides a safe context
  if (!isOldIE && document.implementation && document.implementation.createHTMLDocument) {
    doc = document.implementation.createHTMLDocument('foo');
    !doc.documentElement ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Missing doc.documentElement') : invariant_1(false) : void 0;
    doc.documentElement.innerHTML = html;
    root = doc.getElementsByTagName('body')[0];
  }
  return root;
}

var getSafeBodyFromHTML_1 = getSafeBodyFromHTML;

var _extends$6 = objectAssign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _knownListItemDepthCl;

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var _require = immutable,
    Set = _require.Set;









var experimentalTreeDataSupport$2 = DraftFeatureFlags_1.draft_tree_data_support;

var List$a = immutable.List,
    OrderedSet$5 = immutable.OrderedSet;


var NBSP = '&nbsp;';
var SPACE = ' ';

// Arbitrary max indent
var MAX_DEPTH = 4;

// used for replacing characters in HTML
var REGEX_CR = new RegExp('\r', 'g');
var REGEX_LF = new RegExp('\n', 'g');
var REGEX_NBSP = new RegExp(NBSP, 'g');
var REGEX_CARRIAGE = new RegExp('&#13;?', 'g');
var REGEX_ZWS = new RegExp('&#8203;?', 'g');

// https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
var boldValues = ['bold', 'bolder', '500', '600', '700', '800', '900'];
var notBoldValues = ['light', 'lighter', '100', '200', '300', '400'];

// Block tag flow is different because LIs do not have
// a deterministic style ;_;
var inlineTags = {
  b: 'BOLD',
  code: 'CODE',
  del: 'STRIKETHROUGH',
  em: 'ITALIC',
  i: 'ITALIC',
  s: 'STRIKETHROUGH',
  strike: 'STRIKETHROUGH',
  strong: 'BOLD',
  u: 'UNDERLINE'
};

var knownListItemDepthClasses = (_knownListItemDepthCl = {}, _defineProperty$1(_knownListItemDepthCl, cx_1('public/DraftStyleDefault/depth0'), 0), _defineProperty$1(_knownListItemDepthCl, cx_1('public/DraftStyleDefault/depth1'), 1), _defineProperty$1(_knownListItemDepthCl, cx_1('public/DraftStyleDefault/depth2'), 2), _defineProperty$1(_knownListItemDepthCl, cx_1('public/DraftStyleDefault/depth3'), 3), _defineProperty$1(_knownListItemDepthCl, cx_1('public/DraftStyleDefault/depth4'), 4), _knownListItemDepthCl);

var anchorAttr = ['className', 'href', 'rel', 'target', 'title'];

var imgAttr = ['alt', 'className', 'height', 'src', 'width'];

var lastBlock = void 0;

var EMPTY_CHUNK = {
  text: '',
  inlines: [],
  entities: [],
  blocks: []
};

var EMPTY_BLOCK = {
  children: List$a(),
  depth: 0,
  key: '',
  type: ''
};

var getListBlockType = function getListBlockType(tag, lastList) {
  if (tag === 'li') {
    return lastList === 'ol' ? 'ordered-list-item' : 'unordered-list-item';
  }
  return null;
};

var getBlockMapSupportedTags = function getBlockMapSupportedTags(blockRenderMap) {
  var unstyledElement = blockRenderMap.get('unstyled').element;
  var tags = Set([]);

  blockRenderMap.forEach(function (draftBlock) {
    if (draftBlock.aliasedElements) {
      draftBlock.aliasedElements.forEach(function (tag) {
        tags = tags.add(tag);
      });
    }

    tags = tags.add(draftBlock.element);
  });

  return tags.filter(function (tag) {
    return tag && tag !== unstyledElement;
  }).toArray().sort();
};

// custom element conversions
var getMultiMatchedType = function getMultiMatchedType(tag, lastList, multiMatchExtractor) {
  for (var ii = 0; ii < multiMatchExtractor.length; ii++) {
    var matchType = multiMatchExtractor[ii](tag, lastList);
    if (matchType) {
      return matchType;
    }
  }
  return null;
};

var getBlockTypeForTag = function getBlockTypeForTag(tag, lastList, blockRenderMap) {
  var matchedTypes = blockRenderMap.filter(function (draftBlock) {
    return draftBlock.element === tag || draftBlock.wrapper === tag || draftBlock.aliasedElements && draftBlock.aliasedElements.some(function (alias) {
      return alias === tag;
    });
  }).keySeq().toSet().toArray().sort();

  // if we dont have any matched type, return unstyled
  // if we have one matched type return it
  // if we have multi matched types use the multi-match function to gather type
  switch (matchedTypes.length) {
    case 0:
      return 'unstyled';
    case 1:
      return matchedTypes[0];
    default:
      return getMultiMatchedType(tag, lastList, [getListBlockType]) || 'unstyled';
  }
};

var processInlineTag = function processInlineTag(tag, node, currentStyle) {
  var styleToCheck = inlineTags[tag];
  if (styleToCheck) {
    currentStyle = currentStyle.add(styleToCheck).toOrderedSet();
  } else if (node instanceof HTMLElement) {
    var htmlElement = node;
    currentStyle = currentStyle.withMutations(function (style) {
      var fontWeight = htmlElement.style.fontWeight;
      var fontStyle = htmlElement.style.fontStyle;
      var textDecoration = htmlElement.style.textDecoration;

      if (boldValues.indexOf(fontWeight) >= 0) {
        style.add('BOLD');
      } else if (notBoldValues.indexOf(fontWeight) >= 0) {
        style.remove('BOLD');
      }

      if (fontStyle === 'italic') {
        style.add('ITALIC');
      } else if (fontStyle === 'normal') {
        style.remove('ITALIC');
      }

      if (textDecoration === 'underline') {
        style.add('UNDERLINE');
      }
      if (textDecoration === 'line-through') {
        style.add('STRIKETHROUGH');
      }
      if (textDecoration === 'none') {
        style.remove('UNDERLINE');
        style.remove('STRIKETHROUGH');
      }
    }).toOrderedSet();
  }
  return currentStyle;
};

var joinChunks = function joinChunks(A, B, experimentalHasNestedBlocks) {
  // Sometimes two blocks will touch in the DOM and we need to strip the
  // extra delimiter to preserve niceness.
  var lastInA = A.text.slice(-1);
  var firstInB = B.text.slice(0, 1);

  if (lastInA === '\r' && firstInB === '\r' && !experimentalHasNestedBlocks) {
    A.text = A.text.slice(0, -1);
    A.inlines.pop();
    A.entities.pop();
    A.blocks.pop();
  }

  // Kill whitespace after blocks
  if (lastInA === '\r') {
    if (B.text === SPACE || B.text === '\n') {
      return A;
    } else if (firstInB === SPACE || firstInB === '\n') {
      B.text = B.text.slice(1);
      B.inlines.shift();
      B.entities.shift();
    }
  }

  return {
    text: A.text + B.text,
    inlines: A.inlines.concat(B.inlines),
    entities: A.entities.concat(B.entities),
    blocks: A.blocks.concat(B.blocks)
  };
};

/**
 * Check to see if we have anything like <p> <blockquote> <h1>... to create
 * block tags from. If we do, we can use those and ignore <div> tags. If we
 * don't, we can treat <div> tags as meaningful (unstyled) blocks.
 */
var containsSemanticBlockMarkup = function containsSemanticBlockMarkup(html, blockTags) {
  return blockTags.some(function (tag) {
    return html.indexOf('<' + tag) !== -1;
  });
};

var hasValidLinkText = function hasValidLinkText(link) {
  !(link instanceof HTMLAnchorElement) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Link must be an HTMLAnchorElement.') : invariant_1(false) : void 0;
  var protocol = link.protocol;
  return protocol === 'http:' || protocol === 'https:' || protocol === 'mailto:';
};

var getWhitespaceChunk = function getWhitespaceChunk(inEntity) {
  var entities = new Array(1);
  if (inEntity) {
    entities[0] = inEntity;
  }
  return _extends$6({}, EMPTY_CHUNK, {
    text: SPACE,
    inlines: [OrderedSet$5()],
    entities: entities
  });
};

var getSoftNewlineChunk = function getSoftNewlineChunk() {
  return _extends$6({}, EMPTY_CHUNK, {
    text: '\n',
    inlines: [OrderedSet$5()],
    entities: new Array(1)
  });
};

var getChunkedBlock = function getChunkedBlock() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return _extends$6({}, EMPTY_BLOCK, props);
};

var getBlockDividerChunk = function getBlockDividerChunk(block, depth) {
  var parentKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  return {
    text: '\r',
    inlines: [OrderedSet$5()],
    entities: new Array(1),
    blocks: [getChunkedBlock({
      parent: parentKey,
      key: generateRandomKey_1(),
      type: block,
      depth: Math.max(0, Math.min(MAX_DEPTH, depth))
    })]
  };
};

/**
 *  If we're pasting from one DraftEditor to another we can check to see if
 *  existing list item depth classes are being used and preserve this style
 */
var getListItemDepth = function getListItemDepth(node) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  Object.keys(knownListItemDepthClasses).some(function (depthClass) {
    if (node.classList.contains(depthClass)) {
      depth = knownListItemDepthClasses[depthClass];
    }
  });
  return depth;
};

var genFragment = function genFragment(entityMap, node, inlineStyle, lastList, inBlock, blockTags, depth, blockRenderMap, inEntity, parentKey) {
  var lastLastBlock = lastBlock;
  var nodeName = node.nodeName.toLowerCase();
  var newEntityMap = entityMap;
  var nextBlockType = 'unstyled';
  var newBlock = false;
  var inBlockType = inBlock && getBlockTypeForTag(inBlock, lastList, blockRenderMap);
  var chunk = _extends$6({}, EMPTY_CHUNK);
  var newChunk = null;
  var blockKey = void 0;

  // Base Case
  if (nodeName === '#text') {
    var _text = node.textContent;
    var nodeTextContent = _text.trim();

    // We should not create blocks for leading spaces that are
    // existing around ol/ul and their children list items
    if (lastList && nodeTextContent === '' && node.parentElement) {
      var parentNodeName = node.parentElement.nodeName.toLowerCase();
      if (parentNodeName === 'ol' || parentNodeName === 'ul') {
        return { chunk: _extends$6({}, EMPTY_CHUNK), entityMap: entityMap };
      }
    }

    if (nodeTextContent === '' && inBlock !== 'pre') {
      return { chunk: getWhitespaceChunk(inEntity), entityMap: entityMap };
    }
    if (inBlock !== 'pre') {
      // Can't use empty string because MSWord
      _text = _text.replace(REGEX_LF, SPACE);
    }

    // save the last block so we can use it later
    lastBlock = nodeName;

    return {
      chunk: {
        text: _text,
        inlines: Array(_text.length).fill(inlineStyle),
        entities: Array(_text.length).fill(inEntity),
        blocks: []
      },
      entityMap: entityMap
    };
  }

  // save the last block so we can use it later
  lastBlock = nodeName;

  // BR tags
  if (nodeName === 'br') {
    if (lastLastBlock === 'br' && (!inBlock || inBlockType === 'unstyled')) {
      return {
        chunk: getBlockDividerChunk('unstyled', depth, parentKey),
        entityMap: entityMap
      };
    }
    return { chunk: getSoftNewlineChunk(), entityMap: entityMap };
  }

  // IMG tags
  if (nodeName === 'img' && node instanceof HTMLImageElement && node.attributes.getNamedItem('src') && node.attributes.getNamedItem('src').value) {
    var image = node;
    var entityConfig = {};

    imgAttr.forEach(function (attr) {
      var imageAttribute = image.getAttribute(attr);
      if (imageAttribute) {
        entityConfig[attr] = imageAttribute;
      }
    });
    // Forcing this node to have children because otherwise no entity will be
    // created for this node.
    // The child text node cannot just have a space or return as content -
    // we strip those out.
    // See https://github.com/facebook/draft-js/issues/231 for some context.
    node.textContent = '\uD83D\uDCF7';

    // TODO: update this when we remove DraftEntity entirely
    inEntity = DraftEntity_1.__create('IMAGE', 'MUTABLE', entityConfig || {});
  }

  // Inline tags
  inlineStyle = processInlineTag(nodeName, node, inlineStyle);

  // Handle lists
  if (nodeName === 'ul' || nodeName === 'ol') {
    if (lastList) {
      depth += 1;
    }
    lastList = nodeName;
  }

  if (!experimentalTreeDataSupport$2 && nodeName === 'li' && node instanceof HTMLElement) {
    depth = getListItemDepth(node, depth);
  }

  var blockType = getBlockTypeForTag(nodeName, lastList, blockRenderMap);
  var inListBlock = lastList && inBlock === 'li' && nodeName === 'li';
  var inBlockOrHasNestedBlocks = (!inBlock || experimentalTreeDataSupport$2) && blockTags.indexOf(nodeName) !== -1;

  // Block Tags
  if (inListBlock || inBlockOrHasNestedBlocks) {
    chunk = getBlockDividerChunk(blockType, depth, parentKey);
    blockKey = chunk.blocks[0].key;
    inBlock = nodeName;
    newBlock = !experimentalTreeDataSupport$2;
  }

  // this is required so that we can handle 'ul' and 'ol'
  if (inListBlock) {
    nextBlockType = lastList === 'ul' ? 'unordered-list-item' : 'ordered-list-item';
  }

  // Recurse through children
  var child = node.firstChild;
  if (child != null) {
    nodeName = child.nodeName.toLowerCase();
  }

  var entityId = null;

  while (child) {
    if (child instanceof HTMLAnchorElement && child.href && hasValidLinkText(child)) {
      (function () {
        var anchor = child;
        var entityConfig = {};

        anchorAttr.forEach(function (attr) {
          var anchorAttribute = anchor.getAttribute(attr);
          if (anchorAttribute) {
            entityConfig[attr] = anchorAttribute;
          }
        });

        entityConfig.url = new URI_1(anchor.href).toString();
        // TODO: update this when we remove DraftEntity completely
        entityId = DraftEntity_1.__create('LINK', 'MUTABLE', entityConfig || {});
      })();
    } else {
      entityId = undefined;
    }

    var _genFragment = genFragment(newEntityMap, child, inlineStyle, lastList, inBlock, blockTags, depth, blockRenderMap, entityId || inEntity, experimentalTreeDataSupport$2 ? blockKey : null),
        generatedChunk = _genFragment.chunk,
        maybeUpdatedEntityMap = _genFragment.entityMap;

    newChunk = generatedChunk;
    newEntityMap = maybeUpdatedEntityMap;

    chunk = joinChunks(chunk, newChunk, experimentalTreeDataSupport$2);
    var sibling = child.nextSibling;

    // Put in a newline to break up blocks inside blocks
    if (!parentKey && sibling && blockTags.indexOf(nodeName) >= 0 && inBlock) {
      chunk = joinChunks(chunk, getSoftNewlineChunk());
    }
    if (sibling) {
      nodeName = sibling.nodeName.toLowerCase();
    }
    child = sibling;
  }

  if (newBlock) {
    chunk = joinChunks(chunk, getBlockDividerChunk(nextBlockType, depth, parentKey));
  }

  return { chunk: chunk, entityMap: newEntityMap };
};

var getChunkForHTML = function getChunkForHTML(html, DOMBuilder, blockRenderMap, entityMap) {
  html = html.trim().replace(REGEX_CR, '').replace(REGEX_NBSP, SPACE).replace(REGEX_CARRIAGE, '').replace(REGEX_ZWS, '');

  var supportedBlockTags = getBlockMapSupportedTags(blockRenderMap);

  var safeBody = DOMBuilder(html);
  if (!safeBody) {
    return null;
  }
  lastBlock = null;

  // Sometimes we aren't dealing with content that contains nice semantic
  // tags. In this case, use divs to separate everything out into paragraphs
  // and hope for the best.
  var workingBlocks = containsSemanticBlockMarkup(html, supportedBlockTags) ? supportedBlockTags : ['div'];

  // Start with -1 block depth to offset the fact that we are passing in a fake
  // UL block to start with.
  var fragment = genFragment(entityMap, safeBody, OrderedSet$5(), 'ul', null, workingBlocks, -1, blockRenderMap);

  var chunk = fragment.chunk;
  var newEntityMap = fragment.entityMap;

  // join with previous block to prevent weirdness on paste
  if (chunk.text.indexOf('\r') === 0) {
    chunk = {
      text: chunk.text.slice(1),
      inlines: chunk.inlines.slice(1),
      entities: chunk.entities.slice(1),
      blocks: chunk.blocks
    };
  }

  // Kill block delimiter at the end
  if (chunk.text.slice(-1) === '\r') {
    chunk.text = chunk.text.slice(0, -1);
    chunk.inlines = chunk.inlines.slice(0, -1);
    chunk.entities = chunk.entities.slice(0, -1);
    chunk.blocks.pop();
  }

  // If we saw no block tags, put an unstyled one in
  if (chunk.blocks.length === 0) {
    chunk.blocks.push(_extends$6({}, EMPTY_CHUNK, {
      type: 'unstyled',
      depth: 0
    }));
  }

  // Sometimes we start with text that isn't in a block, which is then
  // followed by blocks. Need to fix up the blocks to add in
  // an unstyled block for this content
  if (chunk.text.split('\r').length === chunk.blocks.length + 1) {
    chunk.blocks.unshift({ type: 'unstyled', depth: 0 });
  }

  return { chunk: chunk, entityMap: newEntityMap };
};

var convertChunkToContentBlocks = function convertChunkToContentBlocks(chunk) {
  if (!chunk || !chunk.text || !Array.isArray(chunk.blocks)) {
    return null;
  }

  var initialState = {
    cacheRef: {},
    contentBlocks: []
  };

  var start = 0;

  var rawBlocks = chunk.blocks,
      rawInlines = chunk.inlines,
      rawEntities = chunk.entities;


  var BlockNodeRecord = ContentBlock_1;

  return chunk.text.split('\r').reduce(function (acc, textBlock, index) {
    // Make absolutely certain that our text is acceptable.
    textBlock = sanitizeDraftText_1(textBlock);

    var block = rawBlocks[index];
    var end = start + textBlock.length;
    var inlines = rawInlines.slice(start, end);
    var entities = rawEntities.slice(start, end);
    var characterList = List$a(inlines.map(function (style, index) {
      var data = { style: style, entity: null };
      if (entities[index]) {
        data.entity = entities[index];
      }
      return CharacterMetadata_1.create(data);
    }));
    start = end + 1;

    var depth = block.depth,
        type = block.type,
        parent = block.parent;


    var key = block.key || generateRandomKey_1();
    var parentTextNodeKey = null; // will be used to store container text nodes

    // childrens add themselves to their parents since we are iterating in order
    if (parent) {
      var parentIndex = acc.cacheRef[parent];
      var parentRecord = acc.contentBlocks[parentIndex];

      // if parent has text we need to split it into a separate unstyled element
      if (parentRecord.getChildKeys().isEmpty() && parentRecord.getText()) {
        var parentCharacterList = parentRecord.getCharacterList();
        var parentText = parentRecord.getText();
        parentTextNodeKey = generateRandomKey_1();

        var textNode = new ContentBlockNode_1({
          key: parentTextNodeKey,
          text: parentText,
          characterList: parentCharacterList,
          parent: parent,
          nextSibling: key
        });

        acc.contentBlocks.push(textNode);

        parentRecord = parentRecord.withMutations(function (block) {
          block.set('characterList', List$a()).set('text', '').set('children', parentRecord.children.push(textNode.getKey()));
        });
      }

      acc.contentBlocks[parentIndex] = parentRecord.set('children', parentRecord.children.push(key));
    }

    var blockNode = new BlockNodeRecord({
      key: key,
      parent: parent,
      type: type,
      depth: depth,
      text: textBlock,
      characterList: characterList,
      prevSibling: parentTextNodeKey || (index === 0 || rawBlocks[index - 1].parent !== parent ? null : rawBlocks[index - 1].key),
      nextSibling: index === rawBlocks.length - 1 || rawBlocks[index + 1].parent !== parent ? null : rawBlocks[index + 1].key
    });

    // insert node
    acc.contentBlocks.push(blockNode);

    // cache ref for building links
    acc.cacheRef[blockNode.key] = index;

    return acc;
  }, initialState).contentBlocks;
};

var convertFromHTMLtoContentBlocks = function convertFromHTMLtoContentBlocks(html) {
  var DOMBuilder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getSafeBodyFromHTML_1;
  var blockRenderMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DefaultDraftBlockRenderMap_1;

  // Be ABSOLUTELY SURE that the dom builder you pass here won't execute
  // arbitrary code in whatever environment you're running this in. For an
  // example of how we try to do this in-browser, see getSafeBodyFromHTML.

  // TODO: replace DraftEntity with an OrderedMap here
  var chunkData = getChunkForHTML(html, DOMBuilder, blockRenderMap, DraftEntity_1);

  if (chunkData == null) {
    return null;
  }

  var chunk = chunkData.chunk,
      entityMap = chunkData.entityMap;

  var contentBlocks = convertChunkToContentBlocks(chunk);

  return {
    contentBlocks: contentBlocks,
    entityMap: entityMap
  };
};

var convertFromHTMLToContentBlocks = convertFromHTMLtoContentBlocks;

var List$b = immutable.List,
    Repeat$6 = immutable.Repeat;
var ContentBlockRecord$2 = ContentBlock_1;

var DraftPasteProcessor = {
  processHTML: function processHTML(html, blockRenderMap) {
    return convertFromHTMLToContentBlocks(html, getSafeBodyFromHTML_1, blockRenderMap);
  },
  processText: function processText(textBlocks, character, type) {
    return textBlocks.reduce(function (acc, textLine, index) {
      textLine = sanitizeDraftText_1(textLine);
      var key = generateRandomKey_1();

      var blockNodeConfig = {
        key: key,
        type: type,
        text: textLine,
        characterList: List$b(Repeat$6(character, textLine.length))
      };

      acc.push(new ContentBlockRecord$2(blockNodeConfig));

      return acc;
    }, []);
  }
};

var DraftPasteProcessor_1 = DraftPasteProcessor;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule adjustBlockDepthForContentState
 * @format
 * 
 */

function adjustBlockDepthForContentState(contentState, selectionState, adjustment, maxDepth) {
  var startKey = selectionState.getStartKey();
  var endKey = selectionState.getEndKey();
  var blockMap = contentState.getBlockMap();
  var blocks = blockMap.toSeq().skipUntil(function (_, k) {
    return k === startKey;
  }).takeUntil(function (_, k) {
    return k === endKey;
  }).concat([[endKey, blockMap.get(endKey)]]).map(function (block) {
    var depth = block.getDepth() + adjustment;
    depth = Math.max(0, Math.min(depth, maxDepth));
    return block.set('depth', depth);
  });

  blockMap = blockMap.merge(blocks);

  return contentState.merge({
    blockMap: blockMap,
    selectionBefore: selectionState,
    selectionAfter: selectionState
  });
}

var adjustBlockDepthForContentState_1 = adjustBlockDepthForContentState;

var RichTextEditorUtil = {
  currentBlockContainsLink: function currentBlockContainsLink(editorState) {
    var selection = editorState.getSelection();
    var contentState = editorState.getCurrentContent();
    var entityMap = contentState.getEntityMap();
    return contentState.getBlockForKey(selection.getAnchorKey()).getCharacterList().slice(selection.getStartOffset(), selection.getEndOffset()).some(function (v) {
      var entity = v.getEntity();
      return !!entity && entityMap.__get(entity).getType() === 'LINK';
    });
  },

  getCurrentBlockType: function getCurrentBlockType(editorState) {
    var selection = editorState.getSelection();
    return editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  },

  getDataObjectForLinkURL: function getDataObjectForLinkURL(uri) {
    return { url: uri.toString() };
  },

  handleKeyCommand: function handleKeyCommand(editorState, command) {
    switch (command) {
      case 'bold':
        return RichTextEditorUtil.toggleInlineStyle(editorState, 'BOLD');
      case 'italic':
        return RichTextEditorUtil.toggleInlineStyle(editorState, 'ITALIC');
      case 'underline':
        return RichTextEditorUtil.toggleInlineStyle(editorState, 'UNDERLINE');
      case 'code':
        return RichTextEditorUtil.toggleCode(editorState);
      case 'backspace':
      case 'backspace-word':
      case 'backspace-to-start-of-line':
        return RichTextEditorUtil.onBackspace(editorState);
      case 'delete':
      case 'delete-word':
      case 'delete-to-end-of-block':
        return RichTextEditorUtil.onDelete(editorState);
      default:
        // they may have custom editor commands; ignore those
        return null;
    }
  },

  insertSoftNewline: function insertSoftNewline(editorState) {
    var contentState = DraftModifier_1.insertText(editorState.getCurrentContent(), editorState.getSelection(), '\n', editorState.getCurrentInlineStyle(), null);

    var newEditorState = EditorState_1.push(editorState, contentState, 'insert-characters');

    return EditorState_1.forceSelection(newEditorState, contentState.getSelectionAfter());
  },

  /**
   * For collapsed selections at the start of styled blocks, backspace should
   * just remove the existing style.
   */
  onBackspace: function onBackspace(editorState) {
    var selection = editorState.getSelection();
    if (!selection.isCollapsed() || selection.getAnchorOffset() || selection.getFocusOffset()) {
      return null;
    }

    // First, try to remove a preceding atomic block.
    var content = editorState.getCurrentContent();
    var startKey = selection.getStartKey();
    var blockBefore = content.getBlockBefore(startKey);

    if (blockBefore && blockBefore.getType() === 'atomic') {
      var blockMap = content.getBlockMap()['delete'](blockBefore.getKey());
      var withoutAtomicBlock = content.merge({
        blockMap: blockMap,
        selectionAfter: selection
      });
      if (withoutAtomicBlock !== content) {
        return EditorState_1.push(editorState, withoutAtomicBlock, 'remove-range');
      }
    }

    // If that doesn't succeed, try to remove the current block style.
    var withoutBlockStyle = RichTextEditorUtil.tryToRemoveBlockStyle(editorState);

    if (withoutBlockStyle) {
      return EditorState_1.push(editorState, withoutBlockStyle, 'change-block-type');
    }

    return null;
  },

  onDelete: function onDelete(editorState) {
    var selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      return null;
    }

    var content = editorState.getCurrentContent();
    var startKey = selection.getStartKey();
    var block = content.getBlockForKey(startKey);
    var length = block.getLength();

    // The cursor is somewhere within the text. Behave normally.
    if (selection.getStartOffset() < length) {
      return null;
    }

    var blockAfter = content.getBlockAfter(startKey);

    if (!blockAfter || blockAfter.getType() !== 'atomic') {
      return null;
    }

    var atomicBlockTarget = selection.merge({
      focusKey: blockAfter.getKey(),
      focusOffset: blockAfter.getLength()
    });

    var withoutAtomicBlock = DraftModifier_1.removeRange(content, atomicBlockTarget, 'forward');

    if (withoutAtomicBlock !== content) {
      return EditorState_1.push(editorState, withoutAtomicBlock, 'remove-range');
    }

    return null;
  },

  onTab: function onTab(event, editorState, maxDepth) {
    var selection = editorState.getSelection();
    var key = selection.getAnchorKey();
    if (key !== selection.getFocusKey()) {
      return editorState;
    }

    var content = editorState.getCurrentContent();
    var block = content.getBlockForKey(key);
    var type = block.getType();
    if (type !== 'unordered-list-item' && type !== 'ordered-list-item') {
      return editorState;
    }

    event.preventDefault();

    // Only allow indenting one level beyond the block above, and only if
    // the block above is a list item as well.
    var blockAbove = content.getBlockBefore(key);
    if (!blockAbove) {
      return editorState;
    }

    var typeAbove = blockAbove.getType();
    if (typeAbove !== 'unordered-list-item' && typeAbove !== 'ordered-list-item') {
      return editorState;
    }

    var depth = block.getDepth();
    if (!event.shiftKey && depth === maxDepth) {
      return editorState;
    }

    maxDepth = Math.min(blockAbove.getDepth() + 1, maxDepth);

    var withAdjustment = adjustBlockDepthForContentState_1(content, selection, event.shiftKey ? -1 : 1, maxDepth);

    return EditorState_1.push(editorState, withAdjustment, 'adjust-depth');
  },

  toggleBlockType: function toggleBlockType(editorState, blockType) {
    var selection = editorState.getSelection();
    var startKey = selection.getStartKey();
    var endKey = selection.getEndKey();
    var content = editorState.getCurrentContent();
    var target = selection;

    // Triple-click can lead to a selection that includes offset 0 of the
    // following block. The `SelectionState` for this case is accurate, but
    // we should avoid toggling block type for the trailing block because it
    // is a confusing interaction.
    if (startKey !== endKey && selection.getEndOffset() === 0) {
      var blockBefore = nullthrows_1(content.getBlockBefore(endKey));
      endKey = blockBefore.getKey();
      target = target.merge({
        anchorKey: startKey,
        anchorOffset: selection.getStartOffset(),
        focusKey: endKey,
        focusOffset: blockBefore.getLength(),
        isBackward: false
      });
    }

    var hasAtomicBlock = content.getBlockMap().skipWhile(function (_, k) {
      return k !== startKey;
    }).reverse().skipWhile(function (_, k) {
      return k !== endKey;
    }).some(function (v) {
      return v.getType() === 'atomic';
    });

    if (hasAtomicBlock) {
      return editorState;
    }

    var typeToSet = content.getBlockForKey(startKey).getType() === blockType ? 'unstyled' : blockType;

    return EditorState_1.push(editorState, DraftModifier_1.setBlockType(content, target, typeToSet), 'change-block-type');
  },

  toggleCode: function toggleCode(editorState) {
    var selection = editorState.getSelection();
    var anchorKey = selection.getAnchorKey();
    var focusKey = selection.getFocusKey();

    if (selection.isCollapsed() || anchorKey !== focusKey) {
      return RichTextEditorUtil.toggleBlockType(editorState, 'code-block');
    }

    return RichTextEditorUtil.toggleInlineStyle(editorState, 'CODE');
  },

  /**
   * Toggle the specified inline style for the selection. If the
   * user's selection is collapsed, apply or remove the style for the
   * internal state. If it is not collapsed, apply the change directly
   * to the document state.
   */
  toggleInlineStyle: function toggleInlineStyle(editorState, inlineStyle) {
    var selection = editorState.getSelection();
    var currentStyle = editorState.getCurrentInlineStyle();

    // If the selection is collapsed, toggle the specified style on or off and
    // set the result as the new inline style override. This will then be
    // used as the inline style for the next character to be inserted.
    if (selection.isCollapsed()) {
      return EditorState_1.setInlineStyleOverride(editorState, currentStyle.has(inlineStyle) ? currentStyle.remove(inlineStyle) : currentStyle.add(inlineStyle));
    }

    // If characters are selected, immediately apply or remove the
    // inline style on the document state itself.
    var content = editorState.getCurrentContent();
    var newContent;

    // If the style is already present for the selection range, remove it.
    // Otherwise, apply it.
    if (currentStyle.has(inlineStyle)) {
      newContent = DraftModifier_1.removeInlineStyle(content, selection, inlineStyle);
    } else {
      newContent = DraftModifier_1.applyInlineStyle(content, selection, inlineStyle);
    }

    return EditorState_1.push(editorState, newContent, 'change-inline-style');
  },

  toggleLink: function toggleLink(editorState, targetSelection, entityKey) {
    var withoutLink = DraftModifier_1.applyEntity(editorState.getCurrentContent(), targetSelection, entityKey);

    return EditorState_1.push(editorState, withoutLink, 'apply-entity');
  },

  /**
   * When a collapsed cursor is at the start of the first styled block, or
   * an empty styled block, changes block to 'unstyled'. Returns null if
   * block or selection does not meet that criteria.
   */
  tryToRemoveBlockStyle: function tryToRemoveBlockStyle(editorState) {
    var selection = editorState.getSelection();
    var offset = selection.getAnchorOffset();
    if (selection.isCollapsed() && offset === 0) {
      var key = selection.getAnchorKey();
      var content = editorState.getCurrentContent();
      var block = content.getBlockForKey(key);

      var firstBlock = content.getFirstBlock();
      if (block.getLength() > 0 && block !== firstBlock) {
        return null;
      }

      var type = block.getType();
      var blockBefore = content.getBlockBefore(key);
      if (type === 'code-block' && blockBefore && blockBefore.getType() === 'code-block' && blockBefore.getLength() !== 0) {
        return null;
      }

      if (type !== 'unstyled') {
        return DraftModifier_1.setBlockType(content, selection, 'unstyled');
      }
    }
    return null;
  }
};

var RichTextEditorUtil_1 = RichTextEditorUtil;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule splitTextIntoTextBlocks
 * @format
 * 
 */

var NEWLINE_REGEX = /\r\n?|\n/g;

function splitTextIntoTextBlocks(text) {
  return text.split(NEWLINE_REGEX);
}

var splitTextIntoTextBlocks_1 = splitTextIntoTextBlocks;

/**
 * Paste content.
 */
function editOnPaste(editor$$1, e) {
  e.preventDefault();
  var data = new DataTransfer_1(e.clipboardData);

  // Get files, unless this is likely to be a string the user wants inline.
  if (!data.isRichText()) {
    var files = data.getFiles();
    var defaultFileText = data.getText();
    if (files.length > 0) {
      // Allow customized paste handling for images, etc. Otherwise, fall
      // through to insert text contents into the editor.
      if (editor$$1.props.handlePastedFiles && isEventHandled_1(editor$$1.props.handlePastedFiles(files))) {
        return;
      }

      getTextContentFromFiles_1(files, function ( /*string*/fileText) {
        fileText = fileText || defaultFileText;
        if (!fileText) {
          return;
        }

        var editorState = editor$$1._latestEditorState;
        var blocks = splitTextIntoTextBlocks_1(fileText);
        var character = CharacterMetadata_1.create({
          style: editorState.getCurrentInlineStyle(),
          entity: getEntityKeyForSelection_1(editorState.getCurrentContent(), editorState.getSelection())
        });
        var currentBlockType = RichTextEditorUtil_1.getCurrentBlockType(editorState);

        var text = DraftPasteProcessor_1.processText(blocks, character, currentBlockType);
        var fragment = BlockMapBuilder_1.createFromArray(text);

        var withInsertedText = DraftModifier_1.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), fragment);

        editor$$1.update(EditorState_1.push(editorState, withInsertedText, 'insert-fragment'));
      });

      return;
    }
  }

  var textBlocks = [];
  var text = data.getText();
  var html = data.getHTML();
  var editorState = editor$$1._latestEditorState;

  if (editor$$1.props.handlePastedText && isEventHandled_1(editor$$1.props.handlePastedText(text, html, editorState))) {
    return;
  }

  if (text) {
    textBlocks = splitTextIntoTextBlocks_1(text);
  }

  if (!editor$$1.props.stripPastedStyles) {
    // If the text from the paste event is rich content that matches what we
    // already have on the internal clipboard, assume that we should just use
    // the clipboard fragment for the paste. This will allow us to preserve
    // styling and entities, if any are present. Note that newlines are
    // stripped during comparison -- this is because copy/paste within the
    // editor in Firefox and IE will not include empty lines. The resulting
    // paste will preserve the newlines correctly.
    var internalClipboard = editor$$1.getClipboard();
    if (data.isRichText() && internalClipboard) {
      if (
      // If the editorKey is present in the pasted HTML, it should be safe to
      // assume this is an internal paste.
      html.indexOf(editor$$1.getEditorKey()) !== -1 ||
      // The copy may have been made within a single block, in which case the
      // editor key won't be part of the paste. In this case, just check
      // whether the pasted text matches the internal clipboard.
      textBlocks.length === 1 && internalClipboard.size === 1 && internalClipboard.first().getText() === text) {
        editor$$1.update(insertFragment$1(editor$$1._latestEditorState, internalClipboard));
        return;
      }
    } else if (internalClipboard && data.types.includes('com.apple.webarchive') && !data.types.includes('text/html') && areTextBlocksAndClipboardEqual(textBlocks, internalClipboard)) {
      // Safari does not properly store text/html in some cases.
      // Use the internalClipboard if present and equal to what is on
      // the clipboard. See https://bugs.webkit.org/show_bug.cgi?id=19893.
      editor$$1.update(insertFragment$1(editor$$1._latestEditorState, internalClipboard));
      return;
    }

    // If there is html paste data, try to parse that.
    if (html) {
      var htmlFragment = DraftPasteProcessor_1.processHTML(html, editor$$1.props.blockRenderMap);
      if (htmlFragment) {
        var contentBlocks = htmlFragment.contentBlocks,
            entityMap = htmlFragment.entityMap;

        if (contentBlocks) {
          var htmlMap = BlockMapBuilder_1.createFromArray(contentBlocks);
          editor$$1.update(insertFragment$1(editor$$1._latestEditorState, htmlMap, entityMap));
          return;
        }
      }
    }

    // Otherwise, create a new fragment from our pasted text. Also
    // empty the internal clipboard, since it's no longer valid.
    editor$$1.setClipboard(null);
  }

  if (textBlocks.length) {
    var character = CharacterMetadata_1.create({
      style: editorState.getCurrentInlineStyle(),
      entity: getEntityKeyForSelection_1(editorState.getCurrentContent(), editorState.getSelection())
    });

    var currentBlockType = RichTextEditorUtil_1.getCurrentBlockType(editorState);

    var textFragment = DraftPasteProcessor_1.processText(textBlocks, character, currentBlockType);

    var textMap = BlockMapBuilder_1.createFromArray(textFragment);
    editor$$1.update(insertFragment$1(editor$$1._latestEditorState, textMap));
  }
}

function insertFragment$1(editorState, fragment, entityMap) {
  var newContent = DraftModifier_1.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), fragment);
  // TODO: merge the entity map once we stop using DraftEntity
  // like this:
  // const mergedEntityMap = newContent.getEntityMap().merge(entityMap);

  return EditorState_1.push(editorState, newContent.set('entityMap', entityMap), 'insert-fragment');
}

function areTextBlocksAndClipboardEqual(textBlocks, blockMap) {
  return textBlocks.length === blockMap.size && blockMap.valueSeq().every(function (block, ii) {
    return block.getText() === textBlocks[ii];
  });
}

var editOnPaste_1 = editOnPaste;

/**
 * Convert the current selection range to an anchor/focus pair of offset keys
 * and values that can be interpreted by components.
 */
function getDraftEditorSelection(editorState, root) {
  var selection = commonjsGlobal.getSelection();

  // No active selection.
  if (selection.rangeCount === 0) {
    return {
      selectionState: editorState.getSelection().set('hasFocus', false),
      needsRecovery: false
    };
  }

  return getDraftEditorSelectionWithNodes_1(editorState, root, selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);
}

var getDraftEditorSelection_1 = getDraftEditorSelection;

function editOnSelect(editor$$1) {
  if (editor$$1._blockSelectEvents || editor$$1._latestEditorState !== editor$$1.props.editorState) {
    return;
  }

  var editorState = editor$$1.props.editorState;
  var editorNode = ReactDOM.findDOMNode(editor$$1.editorContainer);
  !editorNode ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Missing editorNode') : invariant_1(false) : void 0;
  !(editorNode.firstChild instanceof HTMLElement) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'editorNode.firstChild is not an HTMLElement') : invariant_1(false) : void 0;
  var documentSelection = getDraftEditorSelection_1(editorState, editorNode.firstChild);
  var updatedSelectionState = documentSelection.selectionState;

  if (updatedSelectionState !== editorState.getSelection()) {
    if (documentSelection.needsRecovery) {
      editorState = EditorState_1.forceSelection(editorState, updatedSelectionState);
    } else {
      editorState = EditorState_1.acceptSelection(editorState, updatedSelectionState);
    }
    editor$$1.update(editorState);
  }
}

var editOnSelect_1 = editOnSelect;

var DraftEditorEditHandler = {
  onBeforeInput: editOnBeforeInput_1,
  onBlur: editOnBlur_1,
  onCompositionStart: editOnCompositionStart_1,
  onCopy: editOnCopy_1,
  onCut: editOnCut_1,
  onDragOver: editOnDragOver_1,
  onDragStart: editOnDragStart_1,
  onFocus: editOnFocus_1,
  onInput: editOnInput_1,
  onKeyDown: editOnKeyDown_1,
  onPaste: editOnPaste_1,
  onSelect: editOnSelect_1
};

var DraftEditorEditHandler_1 = DraftEditorEditHandler;

function _classCallCheck$g(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$b(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$b(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





/**
 * This component is responsible for rendering placeholder text for the
 * `DraftEditor` component.
 *
 * Override placeholder style via CSS.
 */
var DraftEditorPlaceholder = function (_React$Component) {
  _inherits$b(DraftEditorPlaceholder, _React$Component);

  function DraftEditorPlaceholder() {
    _classCallCheck$g(this, DraftEditorPlaceholder);

    return _possibleConstructorReturn$b(this, _React$Component.apply(this, arguments));
  }

  DraftEditorPlaceholder.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.text !== nextProps.text || this.props.editorState.getSelection().getHasFocus() !== nextProps.editorState.getSelection().getHasFocus();
  };

  DraftEditorPlaceholder.prototype.render = function render() {
    var hasFocus = this.props.editorState.getSelection().getHasFocus();

    var className = cx_1({
      'public/DraftEditorPlaceholder/root': true,
      'public/DraftEditorPlaceholder/hasFocus': hasFocus
    });

    var contentStyle = {
      whiteSpace: 'pre-wrap'
    };

    return React__default.createElement(
      'div',
      { className: className },
      React__default.createElement(
        'div',
        {
          className: cx_1('public/DraftEditorPlaceholder/inner'),
          id: this.props.accessibilityID,
          style: contentStyle },
        this.props.text
      )
    );
  };

  return DraftEditorPlaceholder;
}(React__default.Component);

var DraftEditorPlaceholder_react = DraftEditorPlaceholder;

var isOSX$1 = UserAgent_1.isPlatform('Mac OS X');
var isWindows = UserAgent_1.isPlatform('Windows');

// Firefox on OSX had a bug resulting in navigation instead of cursor movement.
// This bug was fixed in Firefox 29. Feature detection is virtually impossible
// so we just check the version number. See #342765.
var shouldFixFirefoxMovement = isOSX$1 && UserAgent_1.isBrowser('Firefox < 29');

var hasCommandModifier = KeyBindingUtil_1.hasCommandModifier,
    isCtrlKeyCommand = KeyBindingUtil_1.isCtrlKeyCommand;


function shouldRemoveWord(e) {
  return isOSX$1 && e.altKey || isCtrlKeyCommand(e);
}

/**
 * Get the appropriate undo/redo command for a Z key command.
 */
function getZCommand(e) {
  if (!hasCommandModifier(e)) {
    return null;
  }
  return e.shiftKey ? 'redo' : 'undo';
}

function getDeleteCommand(e) {
  // Allow default "cut" behavior for Windows on Shift + Delete.
  if (isWindows && e.shiftKey) {
    return null;
  }
  return shouldRemoveWord(e) ? 'delete-word' : 'delete';
}

function getBackspaceCommand(e) {
  if (hasCommandModifier(e) && isOSX$1) {
    return 'backspace-to-start-of-line';
  }
  return shouldRemoveWord(e) ? 'backspace-word' : 'backspace';
}

/**
 * Retrieve a bound key command for the given event.
 */
function getDefaultKeyBinding(e) {
  switch (e.keyCode) {
    case 66:
      // B
      return hasCommandModifier(e) ? 'bold' : null;
    case 68:
      // D
      return isCtrlKeyCommand(e) ? 'delete' : null;
    case 72:
      // H
      return isCtrlKeyCommand(e) ? 'backspace' : null;
    case 73:
      // I
      return hasCommandModifier(e) ? 'italic' : null;
    case 74:
      // J
      return hasCommandModifier(e) ? 'code' : null;
    case 75:
      // K
      return !isWindows && isCtrlKeyCommand(e) ? 'secondary-cut' : null;
    case 77:
      // M
      return isCtrlKeyCommand(e) ? 'split-block' : null;
    case 79:
      // O
      return isCtrlKeyCommand(e) ? 'split-block' : null;
    case 84:
      // T
      return isOSX$1 && isCtrlKeyCommand(e) ? 'transpose-characters' : null;
    case 85:
      // U
      return hasCommandModifier(e) ? 'underline' : null;
    case 87:
      // W
      return isOSX$1 && isCtrlKeyCommand(e) ? 'backspace-word' : null;
    case 89:
      // Y
      if (isCtrlKeyCommand(e)) {
        return isWindows ? 'redo' : 'secondary-paste';
      }
      return null;
    case 90:
      // Z
      return getZCommand(e) || null;
    case Keys.RETURN:
      return 'split-block';
    case Keys.DELETE:
      return getDeleteCommand(e);
    case Keys.BACKSPACE:
      return getBackspaceCommand(e);
    // LEFT/RIGHT handlers serve as a workaround for a Firefox bug.
    case Keys.LEFT:
      return shouldFixFirefoxMovement && hasCommandModifier(e) ? 'move-selection-to-start-of-block' : null;
    case Keys.RIGHT:
      return shouldFixFirefoxMovement && hasCommandModifier(e) ? 'move-selection-to-end-of-block' : null;
    default:
      return null;
  }
}

var getDefaultKeyBinding_1 = getDefaultKeyBinding;

var _extends$8 = objectAssign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck$h(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$c(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$c(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }























var isIE = UserAgent_1.isBrowser('IE');

// IE does not support the `input` event on contentEditable, so we can't
// observe spellcheck behavior.
var allowSpellCheck = !isIE;

// Define a set of handler objects to correspond to each possible `mode`
// of editor behavior.
var handlerMap = {
  edit: DraftEditorEditHandler_1,
  composite: DraftEditorCompositionHandler_1,
  drag: DraftEditorDragHandler_1,
  cut: null,
  render: null
};

/**
 * `DraftEditor` is the root editor component. It composes a `contentEditable`
 * div, and provides a wide variety of useful function props for managing the
 * state of the editor. See `DraftEditorProps` for details.
 */
var DraftEditor = function (_React$Component) {
  _inherits$c(DraftEditor, _React$Component);

  function DraftEditor(props) {
    _classCallCheck$h(this, DraftEditor);

    var _this = _possibleConstructorReturn$c(this, _React$Component.call(this, props));

    _this.focus = function (scrollPosition) {
      var editorState = _this.props.editorState;

      var alreadyHasFocus = editorState.getSelection().getHasFocus();
      var editorNode = ReactDOM.findDOMNode(_this.editor);

      if (!editorNode) {
        // once in a while people call 'focus' in a setTimeout, and the node has
        // been deleted, so it can be null in that case.
        return;
      }

      var scrollParent = Style_1.getScrollParent(editorNode);

      var _ref = scrollPosition || getScrollPosition_1(scrollParent),
          x = _ref.x,
          y = _ref.y;

      !(editorNode instanceof HTMLElement) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'editorNode is not an HTMLElement') : invariant_1(false) : void 0;
      editorNode.focus();

      // Restore scroll position
      if (scrollParent === window) {
        window.scrollTo(x, y);
      } else {
        Scroll_1.setTop(scrollParent, y);
      }

      // On Chrome and Safari, calling focus on contenteditable focuses the
      // cursor at the first character. This is something you don't expect when
      // you're clicking on an input element but not directly on a character.
      // Put the cursor back where it was before the blur.
      if (!alreadyHasFocus) {
        _this.update(EditorState_1.forceSelection(editorState, editorState.getSelection()));
      }
    };

    _this.blur = function () {
      var editorNode = ReactDOM.findDOMNode(_this.editor);
      !(editorNode instanceof HTMLElement) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'editorNode is not an HTMLElement') : invariant_1(false) : void 0;
      editorNode.blur();
    };

    _this.setMode = function (mode) {
      _this._handler = handlerMap[mode];
    };

    _this.exitCurrentMode = function () {
      _this.setMode('edit');
    };

    _this.restoreEditorDOM = function (scrollPosition) {
      _this.setState({ contentsKey: _this.state.contentsKey + 1 }, function () {
        _this.focus(scrollPosition);
      });
    };

    _this.setClipboard = function (clipboard) {
      _this._clipboard = clipboard;
    };

    _this.getClipboard = function () {
      return _this._clipboard;
    };

    _this.update = function (editorState) {
      _this._latestEditorState = editorState;
      _this.props.onChange(editorState);
    };

    _this.onDragEnter = function () {
      _this._dragCount++;
    };

    _this.onDragLeave = function () {
      _this._dragCount--;
      if (_this._dragCount === 0) {
        _this.exitCurrentMode();
      }
    };

    _this._blockSelectEvents = false;
    _this._clipboard = null;
    _this._handler = null;
    _this._dragCount = 0;
    _this._editorKey = props.editorKey || generateRandomKey_1();
    _this._placeholderAccessibilityID = 'placeholder-' + _this._editorKey;
    _this._latestEditorState = props.editorState;
    _this._latestCommittedEditorState = props.editorState;

    _this._onBeforeInput = _this._buildHandler('onBeforeInput');
    _this._onBlur = _this._buildHandler('onBlur');
    _this._onCharacterData = _this._buildHandler('onCharacterData');
    _this._onCompositionEnd = _this._buildHandler('onCompositionEnd');
    _this._onCompositionStart = _this._buildHandler('onCompositionStart');
    _this._onCopy = _this._buildHandler('onCopy');
    _this._onCut = _this._buildHandler('onCut');
    _this._onDragEnd = _this._buildHandler('onDragEnd');
    _this._onDragOver = _this._buildHandler('onDragOver');
    _this._onDragStart = _this._buildHandler('onDragStart');
    _this._onDrop = _this._buildHandler('onDrop');
    _this._onInput = _this._buildHandler('onInput');
    _this._onFocus = _this._buildHandler('onFocus');
    _this._onKeyDown = _this._buildHandler('onKeyDown');
    _this._onKeyPress = _this._buildHandler('onKeyPress');
    _this._onKeyUp = _this._buildHandler('onKeyUp');
    _this._onMouseDown = _this._buildHandler('onMouseDown');
    _this._onMouseUp = _this._buildHandler('onMouseUp');
    _this._onPaste = _this._buildHandler('onPaste');
    _this._onSelect = _this._buildHandler('onSelect');

    _this.getEditorKey = function () {
      return _this._editorKey;
    };

    // See `restoreEditorDOM()`.
    _this.state = { contentsKey: 0 };
    return _this;
  }

  /**
   * Build a method that will pass the event to the specified handler method.
   * This allows us to look up the correct handler function for the current
   * editor mode, if any has been specified.
   */


  /**
   * Define proxies that can route events to the current handler.
   */


  DraftEditor.prototype._buildHandler = function _buildHandler(eventName) {
    var _this2 = this;

    return function (e) {
      if (!_this2.props.readOnly) {
        var method = _this2._handler && _this2._handler[eventName];
        method && method(_this2, e);
      }
    };
  };

  DraftEditor.prototype._showPlaceholder = function _showPlaceholder() {
    return !!this.props.placeholder && !this.props.editorState.isInCompositionMode() && !this.props.editorState.getCurrentContent().hasText();
  };

  DraftEditor.prototype._renderPlaceholder = function _renderPlaceholder() {
    if (this._showPlaceholder()) {
      var placeHolderProps = {
        text: nullthrows_1(this.props.placeholder),
        editorState: this.props.editorState,
        textAlignment: this.props.textAlignment,
        accessibilityID: this._placeholderAccessibilityID
      };

      return React__default.createElement(DraftEditorPlaceholder_react, placeHolderProps);
    }
    return null;
  };

  DraftEditor.prototype.render = function render() {
    var _this3 = this;

    var _props = this.props,
        blockRenderMap = _props.blockRenderMap,
        blockRendererFn = _props.blockRendererFn,
        blockStyleFn = _props.blockStyleFn,
        customStyleFn = _props.customStyleFn,
        customStyleMap = _props.customStyleMap,
        editorState = _props.editorState,
        readOnly = _props.readOnly,
        textAlignment = _props.textAlignment,
        textDirectionality = _props.textDirectionality;


    var rootClass = cx_1({
      'DraftEditor/root': true,
      'DraftEditor/alignLeft': textAlignment === 'left',
      'DraftEditor/alignRight': textAlignment === 'right',
      'DraftEditor/alignCenter': textAlignment === 'center'
    });

    var contentStyle = {
      outline: 'none',
      // fix parent-draggable Safari bug. #1326
      userSelect: 'text',
      WebkitUserSelect: 'text',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word'
    };

    // The aria-expanded and aria-haspopup properties should only be rendered
    // for a combobox.
    var ariaRole = this.props.role || 'textbox';
    var ariaExpanded = ariaRole === 'combobox' ? !!this.props.ariaExpanded : null;

    var editorContentsProps = {
      blockRenderMap: blockRenderMap,
      blockRendererFn: blockRendererFn,
      blockStyleFn: blockStyleFn,
      customStyleMap: _extends$8({}, DefaultDraftInlineStyle, customStyleMap),
      customStyleFn: customStyleFn,
      editorKey: this._editorKey,
      editorState: editorState,
      key: 'contents' + this.state.contentsKey,
      textDirectionality: textDirectionality
    };

    return React__default.createElement(
      'div',
      { className: rootClass },
      this._renderPlaceholder(),
      React__default.createElement(
        'div',
        {
          className: cx_1('DraftEditor/editorContainer'),
          ref: function ref(_ref3) {
            return _this3.editorContainer = _ref3;
          } },
        React__default.createElement(
          'div',
          {
            'aria-activedescendant': readOnly ? null : this.props.ariaActiveDescendantID,
            'aria-autocomplete': readOnly ? null : this.props.ariaAutoComplete,
            'aria-controls': readOnly ? null : this.props.ariaControls,
            'aria-describedby': this.props.ariaDescribedBy || this._placeholderAccessibilityID,
            'aria-expanded': readOnly ? null : ariaExpanded,
            'aria-label': this.props.ariaLabel,
            'aria-labelledby': this.props.ariaLabelledBy,
            'aria-multiline': this.props.ariaMultiline,
            autoCapitalize: this.props.autoCapitalize,
            autoComplete: this.props.autoComplete,
            autoCorrect: this.props.autoCorrect,
            className: cx_1({
              // Chrome's built-in translation feature mutates the DOM in ways
              // that Draft doesn't expect (ex: adding <font> tags inside
              // DraftEditorLeaf spans) and causes problems. We add notranslate
              // here which makes its autotranslation skip over this subtree.
              notranslate: !readOnly,
              'public/DraftEditor/content': true
            }),
            contentEditable: !readOnly,
            'data-testid': this.props.webDriverTestID,
            onBeforeInput: this._onBeforeInput,
            onBlur: this._onBlur,
            onCompositionEnd: this._onCompositionEnd,
            onCompositionStart: this._onCompositionStart,
            onCopy: this._onCopy,
            onCut: this._onCut,
            onDragEnd: this._onDragEnd,
            onDragEnter: this.onDragEnter,
            onDragLeave: this.onDragLeave,
            onDragOver: this._onDragOver,
            onDragStart: this._onDragStart,
            onDrop: this._onDrop,
            onFocus: this._onFocus,
            onInput: this._onInput,
            onKeyDown: this._onKeyDown,
            onKeyPress: this._onKeyPress,
            onKeyUp: this._onKeyUp,
            onMouseUp: this._onMouseUp,
            onPaste: this._onPaste,
            onSelect: this._onSelect,
            ref: function ref(_ref2) {
              return _this3.editor = _ref2;
            },
            role: readOnly ? null : ariaRole,
            spellCheck: allowSpellCheck && this.props.spellCheck,
            style: contentStyle,
            suppressContentEditableWarning: true,
            tabIndex: this.props.tabIndex },
          React__default.createElement(DraftEditorContents_react, editorContentsProps)
        )
      )
    );
  };

  DraftEditor.prototype.componentDidMount = function componentDidMount() {
    this.setMode('edit');

    /**
     * IE has a hardcoded "feature" that attempts to convert link text into
     * anchors in contentEditable DOM. This breaks the editor's expectations of
     * the DOM, and control is lost. Disable it to make IE behave.
     * See: http://blogs.msdn.com/b/ieinternals/archive/2010/09/15/
     * ie9-beta-minor-change-list.aspx
     */
    if (isIE) {
      document.execCommand('AutoUrlDetect', false, false);
    }
  };

  /**
   * Prevent selection events from affecting the current editor state. This
   * is mostly intended to defend against IE, which fires off `selectionchange`
   * events regardless of whether the selection is set via the browser or
   * programmatically. We only care about selection events that occur because
   * of browser interaction, not re-renders and forced selections.
   */


  DraftEditor.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    this._blockSelectEvents = true;
    this._latestEditorState = nextProps.editorState;
  };

  DraftEditor.prototype.componentDidUpdate = function componentDidUpdate() {
    this._blockSelectEvents = false;
    this._latestCommittedEditorState = this.props.editorState;
  };

  /**
   * Used via `this.focus()`.
   *
   * Force focus back onto the editor node.
   *
   * We attempt to preserve scroll position when focusing. You can also pass
   * a specified scroll position (for cases like `cut` behavior where it should
   * be restored to a known position).
   */


  /**
   * Used via `this.setMode(...)`.
   *
   * Set the behavior mode for the editor component. This switches the current
   * handler module to ensure that DOM events are managed appropriately for
   * the active mode.
   */


  /**
   * Used via `this.restoreEditorDOM()`.
   *
   * Force a complete re-render of the DraftEditorContents based on the current
   * EditorState. This is useful when we know we are going to lose control of
   * the DOM state (cut command, IME) and we want to make sure that
   * reconciliation occurs on a version of the DOM that is synchronized with
   * our EditorState.
   */


  /**
   * Used via `this.setClipboard(...)`.
   *
   * Set the clipboard state for a cut/copy event.
   */


  /**
   * Used via `this.getClipboard()`.
   *
   * Retrieve the clipboard state for a cut/copy event.
   */


  /**
   * Used via `this.update(...)`.
   *
   * Propagate a new `EditorState` object to higher-level components. This is
   * the method by which event handlers inform the `DraftEditor` component of
   * state changes. A component that composes a `DraftEditor` **must** provide
   * an `onChange` prop to receive state updates passed along from this
   * function.
   */


  /**
   * Used in conjunction with `onDragLeave()`, by counting the number of times
   * a dragged element enters and leaves the editor (or any of its children),
   * to determine when the dragged element absolutely leaves the editor.
   */


  /**
   * See `onDragEnter()`.
   */


  return DraftEditor;
}(React__default.Component);

DraftEditor.defaultProps = {
  blockRenderMap: DefaultDraftBlockRenderMap_1,
  blockRendererFn: emptyFunction_1.thatReturnsNull,
  blockStyleFn: emptyFunction_1.thatReturns(''),
  keyBindingFn: getDefaultKeyBinding_1,
  readOnly: false,
  spellCheck: false,
  stripPastedStyles: false
};


var DraftEditor_react = DraftEditor;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftStringKey
 * @format
 * 
 */

var DraftStringKey = {
  stringify: function stringify(key) {
    return '_' + String(key);
  },

  unstringify: function unstringify(key) {
    return key.slice(1);
  }
};

var DraftStringKey_1 = DraftStringKey;

var strlen$1 = UnicodeUtils_1.strlen;

/**
 * Convert to UTF-8 character counts for storage.
 */

function encodeEntityRanges(block, storageMap) {
  var encoded = [];
  block.findEntityRanges(function (character) {
    return !!character.getEntity();
  }, function ( /*number*/start, /*number*/end) {
    var text = block.getText();
    var key = block.getEntityAt(start);
    encoded.push({
      offset: strlen$1(text.slice(0, start)),
      length: strlen$1(text.slice(start, end)),
      // Encode the key as a number for range storage.
      key: Number(storageMap[DraftStringKey_1.stringify(key)])
    });
  });
  return encoded;
}

var encodeEntityRanges_1 = encodeEntityRanges;

var areEqual$1 = function areEqual(a, b) {
  return a === b;
};
var isTruthy = function isTruthy(a) {
  return !!a;
};
var EMPTY_ARRAY = [];

/**
 * Helper function for getting encoded styles for each inline style. Convert
 * to UTF-8 character counts for storage.
 */
function getEncodedInlinesForType(block, styleList, styleToEncode) {
  var ranges = [];

  // Obtain an array with ranges for only the specified style.
  var filteredInlines = styleList.map(function (style) {
    return style.has(styleToEncode);
  }).toList();

  findRangesImmutable_1(filteredInlines, areEqual$1,
  // We only want to keep ranges with nonzero style values.
  isTruthy, function (start, end) {
    var text = block.getText();
    ranges.push({
      offset: UnicodeUtils_1.strlen(text.slice(0, start)),
      length: UnicodeUtils_1.strlen(text.slice(start, end)),
      style: styleToEncode
    });
  });

  return ranges;
}

/*
 * Retrieve the encoded arrays of inline styles, with each individual style
 * treated separately.
 */
function encodeInlineStyleRanges(block) {
  var styleList = block.getCharacterList().map(function (c) {
    return c.getStyle();
  }).toList();
  var ranges = styleList.flatten().toSet().map(function (style) {
    return getEncodedInlinesForType(block, styleList, style);
  });

  return Array.prototype.concat.apply(EMPTY_ARRAY, ranges.toJS());
}

var encodeInlineStyleRanges_1 = encodeInlineStyleRanges;

var _extends$9 = objectAssign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };









var createRawBlock = function createRawBlock(block, entityStorageMap) {
  return {
    key: block.getKey(),
    text: block.getText(),
    type: block.getType(),
    depth: block.getDepth(),
    inlineStyleRanges: encodeInlineStyleRanges_1(block),
    entityRanges: encodeEntityRanges_1(block, entityStorageMap),
    data: block.getData().toObject()
  };
};

var insertRawBlock = function insertRawBlock(block, entityMap, rawBlocks, blockCacheRef) {
  if (block instanceof ContentBlock_1) {
    rawBlocks.push(createRawBlock(block, entityMap));
    return;
  }

  !(block instanceof ContentBlockNode_1) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'block is not a BlockNode') : invariant_1(false) : void 0;

  var parentKey = block.getParentKey();
  var rawBlock = blockCacheRef[block.getKey()] = _extends$9({}, createRawBlock(block, entityMap), {
    children: []
  });

  if (parentKey) {
    blockCacheRef[parentKey].children.push(rawBlock);
    return;
  }

  rawBlocks.push(rawBlock);
};

var encodeRawBlocks = function encodeRawBlocks(contentState, rawState) {
  var entityMap = rawState.entityMap;


  var rawBlocks = [];

  var blockCacheRef = {};
  var entityCacheRef = {};
  var entityStorageKey = 0;

  contentState.getBlockMap().forEach(function (block) {
    block.findEntityRanges(function (character) {
      return character.getEntity() !== null;
    }, function (start) {
      var entityKey = block.getEntityAt(start);
      // Stringify to maintain order of otherwise numeric keys.
      var stringifiedEntityKey = DraftStringKey_1.stringify(entityKey);
      // This makes this function resilient to two entities
      // erroneously having the same key
      if (entityCacheRef[stringifiedEntityKey]) {
        return;
      }
      entityCacheRef[stringifiedEntityKey] = entityKey;
      // we need the `any` casting here since this is a temporary state
      // where we will later on flip the entity map and populate it with
      // real entity, at this stage we just need to map back the entity
      // key used by the BlockNode
      entityMap[stringifiedEntityKey] = '' + entityStorageKey;
      entityStorageKey++;
    });

    insertRawBlock(block, entityMap, rawBlocks, blockCacheRef);
  });

  return {
    blocks: rawBlocks,
    entityMap: entityMap
  };
};

// Flip storage map so that our storage keys map to global
// DraftEntity keys.
var encodeRawEntityMap = function encodeRawEntityMap(contentState, rawState) {
  var blocks = rawState.blocks,
      entityMap = rawState.entityMap;


  var rawEntityMap = {};

  Object.keys(entityMap).forEach(function (key, index) {
    var entity = contentState.getEntity(DraftStringKey_1.unstringify(key));
    rawEntityMap[index] = {
      type: entity.getType(),
      mutability: entity.getMutability(),
      data: entity.getData()
    };
  });

  return {
    blocks: blocks,
    entityMap: rawEntityMap
  };
};

var convertFromDraftStateToRaw = function convertFromDraftStateToRaw(contentState) {
  var rawDraftContentState = {
    entityMap: {},
    blocks: []
  };

  // add blocks
  rawDraftContentState = encodeRawBlocks(contentState, rawDraftContentState);

  // add entities
  rawDraftContentState = encodeRawEntityMap(contentState, rawDraftContentState);

  return rawDraftContentState;
};

var convertFromDraftStateToRaw_1 = convertFromDraftStateToRaw;

var _extends$a = objectAssign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftTreeAdapter
 * @format
 * 
 *
 * This is unstable and not part of the public API and should not be used by
 * production systems. This file may be update/removed without notice.
 */



var traverseInDepthOrder = function traverseInDepthOrder(blocks, fn) {
  var stack = [].concat(blocks).reverse();
  while (stack.length) {
    var _block = stack.pop();

    fn(_block);

    var children = _block.children;

    !Array.isArray(children) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Invalid tree raw block') : invariant_1(false) : void 0;

    stack = stack.concat([].concat(children.reverse()));
  }
};

var isListBlock = function isListBlock(block) {
  if (!(block && block.type)) {
    return false;
  }
  var type = block.type;

  return type === 'unordered-list-item' || type === 'ordered-list-item';
};

var addDepthToChildren = function addDepthToChildren(block) {
  if (Array.isArray(block.children)) {
    block.children = block.children.map(function (child) {
      return child.type === block.type ? _extends$a({}, child, { depth: (block.depth || 0) + 1 }) : child;
    });
  }
};

/**
 * This adapter is intended to be be used as an adapter to draft tree data
 *
 * draft state <=====> draft tree state
 */
var DraftTreeAdapter = {
  /**
   * Converts from a tree raw state back to  draft raw state
   */
  fromRawTreeStateToRawState: function fromRawTreeStateToRawState(draftTreeState) {
    var blocks = draftTreeState.blocks;

    var transformedBlocks = [];

    !Array.isArray(blocks) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Invalid raw state') : invariant_1(false) : void 0;

    if (!Array.isArray(blocks) || !blocks.length) {
      return draftTreeState;
    }

    traverseInDepthOrder(blocks, function (block) {
      var newBlock = _extends$a({}, block);

      if (isListBlock(block)) {
        newBlock.depth = newBlock.depth || 0;
        addDepthToChildren(block);
      }

      delete newBlock.children;

      transformedBlocks.push(newBlock);
    });

    draftTreeState.blocks = transformedBlocks;

    return _extends$a({}, draftTreeState, {
      blocks: transformedBlocks
    });
  },


  /**
   * Converts from draft raw state to tree draft state
   */
  fromRawStateToRawTreeState: function fromRawStateToRawTreeState(draftState) {
    var lastListDepthCacheRef = {};
    var transformedBlocks = [];

    draftState.blocks.forEach(function (block) {
      var isList = isListBlock(block);
      var depth = block.depth || 0;
      var treeBlock = _extends$a({}, block, {
        children: []
      });

      if (!isList) {
        // reset the cache path
        lastListDepthCacheRef = {};
        transformedBlocks.push(treeBlock);
        return;
      }

      // update our depth cache reference path
      lastListDepthCacheRef[depth] = treeBlock;

      // if we are greater than zero we must have seen a parent already
      if (depth > 0) {
        var parent = lastListDepthCacheRef[depth - 1];

        !parent ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'Invalid depth for RawDraftContentBlock') : invariant_1(false) : void 0;

        // push nested list blocks
        parent.children.push(treeBlock);
        return;
      }

      // push root list blocks
      transformedBlocks.push(treeBlock);
    });

    return _extends$a({}, draftState, {
      blocks: transformedBlocks
    });
  }
};

var DraftTreeAdapter_1 = DraftTreeAdapter;

var List$c = immutable.List;


function createCharacterList(inlineStyles, entities) {
  var characterArray = inlineStyles.map(function (style, ii) {
    var entity = entities[ii];
    return CharacterMetadata_1.create({ style: style, entity: entity });
  });
  return List$c(characterArray);
}

var createCharacterList_1 = createCharacterList;

var substr$1 = UnicodeUtils_1.substr;

/**
 * Convert to native JavaScript string lengths to determine ranges.
 */

function decodeEntityRanges(text, ranges) {
  var entities = Array(text.length).fill(null);
  if (ranges) {
    ranges.forEach(function (range) {
      // Using Unicode-enabled substrings converted to JavaScript lengths,
      // fill the output array with entity keys.
      var start = substr$1(text, 0, range.offset).length;
      var end = start + substr$1(text, range.offset, range.length).length;
      for (var ii = start; ii < end; ii++) {
        entities[ii] = range.key;
      }
    });
  }
  return entities;
}

var decodeEntityRanges_1 = decodeEntityRanges;

var OrderedSet$6 = immutable.OrderedSet;



var substr$2 = UnicodeUtils_1.substr;


var EMPTY_SET$3 = OrderedSet$6();

/**
 * Convert to native JavaScript string lengths to determine ranges.
 */
function decodeInlineStyleRanges(text, ranges) {
  var styles = Array(text.length).fill(EMPTY_SET$3);
  if (ranges) {
    ranges.forEach(function ( /*object*/range) {
      var cursor = substr$2(text, 0, range.offset).length;
      var end = cursor + substr$2(text, range.offset, range.length).length;
      while (cursor < end) {
        styles[cursor] = styles[cursor].add(range.style);
        cursor++;
      }
    });
  }
  return styles;
}

var decodeInlineStyleRanges_1 = decodeInlineStyleRanges;

var _extends$b = objectAssign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var List$d = immutable.List,
    Map$a = immutable.Map,
    OrderedMap$4 = immutable.OrderedMap;


var decodeBlockNodeConfig = function decodeBlockNodeConfig(block, entityMap) {
  var key = block.key,
      type = block.type,
      data = block.data,
      text = block.text,
      depth = block.depth;


  var blockNodeConfig = {
    text: text,
    depth: depth || 0,
    type: type || 'unstyled',
    key: key || generateRandomKey_1(),
    data: Map$a(data),
    characterList: decodeCharacterList(block, entityMap)
  };

  return blockNodeConfig;
};

var decodeCharacterList = function decodeCharacterList(block, entityMap) {
  var text = block.text,
      rawEntityRanges = block.entityRanges,
      rawInlineStyleRanges = block.inlineStyleRanges;


  var entityRanges = rawEntityRanges || [];
  var inlineStyleRanges = rawInlineStyleRanges || [];

  // Translate entity range keys to the DraftEntity map.
  return createCharacterList_1(decodeInlineStyleRanges_1(text, inlineStyleRanges), decodeEntityRanges_1(text, entityRanges.filter(function (range) {
    return entityMap.hasOwnProperty(range.key);
  }).map(function (range) {
    return _extends$b({}, range, { key: entityMap[range.key] });
  })));
};

var addKeyIfMissing = function addKeyIfMissing(block) {
  return _extends$b({}, block, {
    key: block.key || generateRandomKey_1()
  });
};

/**
 * Node stack is responsible to ensure we traverse the tree only once
 * in depth order, while also providing parent refs to inner nodes to
 * construct their links.
 */
var updateNodeStack = function updateNodeStack(stack, nodes, parentRef) {
  var nodesWithParentRef = nodes.map(function (block) {
    return _extends$b({}, block, {
      parentRef: parentRef
    });
  });

  // since we pop nodes from the stack we need to insert them in reverse
  return stack.concat(nodesWithParentRef.reverse());
};

/**
 * This will build a tree draft content state by creating the node
 * reference links into a single tree walk. Each node has a link
 * reference to "parent", "children", "nextSibling" and "prevSibling"
 * blockMap will be created using depth ordering.
 */
var decodeContentBlockNodes = function decodeContentBlockNodes(blocks, entityMap) {
  return blocks
  // ensure children have valid keys to enable sibling links
  .map(addKeyIfMissing).reduce(function (blockMap, block, index) {
    !Array.isArray(block.children) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'invalid RawDraftContentBlock can not be converted to ContentBlockNode') : invariant_1(false) : void 0;

    // ensure children have valid keys to enable sibling links
    var children = block.children.map(addKeyIfMissing);

    // root level nodes
    var contentBlockNode = new ContentBlockNode_1(_extends$b({}, decodeBlockNodeConfig(block, entityMap), {
      prevSibling: index === 0 ? null : blocks[index - 1].key,
      nextSibling: index === blocks.length - 1 ? null : blocks[index + 1].key,
      children: List$d(children.map(function (child) {
        return child.key;
      }))
    }));

    // push root node to blockMap
    blockMap = blockMap.set(contentBlockNode.getKey(), contentBlockNode);

    // this stack is used to ensure we visit all nodes respecting depth ordering
    var stack = updateNodeStack([], children, contentBlockNode);

    // start computing children nodes
    while (stack.length > 0) {
      // we pop from the stack and start processing this node
      var node = stack.pop();

      // parentRef already points to a converted ContentBlockNode
      var parentRef = node.parentRef;
      var siblings = parentRef.getChildKeys();
      var _index = siblings.indexOf(node.key);
      var isValidBlock = Array.isArray(node.children);

      if (!isValidBlock) {
        !isValidBlock ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'invalid RawDraftContentBlock can not be converted to ContentBlockNode') : invariant_1(false) : void 0;
        break;
      }

      // ensure children have valid keys to enable sibling links
      var _children = node.children.map(addKeyIfMissing);

      var _contentBlockNode = new ContentBlockNode_1(_extends$b({}, decodeBlockNodeConfig(node, entityMap), {
        parent: parentRef.getKey(),
        children: List$d(_children.map(function (child) {
          return child.key;
        })),
        prevSibling: _index === 0 ? null : siblings.get(_index - 1),
        nextSibling: _index === siblings.size - 1 ? null : siblings.get(_index + 1)
      }));

      // push node to blockMap
      blockMap = blockMap.set(_contentBlockNode.getKey(), _contentBlockNode);

      // this stack is used to ensure we visit all nodes respecting depth ordering
      stack = updateNodeStack(stack, _children, _contentBlockNode);
    }

    return blockMap;
  }, OrderedMap$4());
};

var decodeContentBlocks = function decodeContentBlocks(blocks, entityMap) {
  return OrderedMap$4(blocks.map(function (block) {
    var contentBlock = new ContentBlock_1(decodeBlockNodeConfig(block, entityMap));
    return [contentBlock.getKey(), contentBlock];
  }));
};

var decodeRawBlocks = function decodeRawBlocks(rawState, entityMap) {
  var isTreeRawBlock = Array.isArray(rawState.blocks[0].children);
  var rawBlocks = rawState.blocks;

  {
    return decodeContentBlocks(isTreeRawBlock ? DraftTreeAdapter_1.fromRawTreeStateToRawState(rawState).blocks : rawBlocks, entityMap);
  }

  return decodeContentBlockNodes(rawBlocks, entityMap);
};

var decodeRawEntityMap = function decodeRawEntityMap(rawState) {
  var rawEntityMap = rawState.entityMap;

  var entityMap = {};

  // TODO: Update this once we completely remove DraftEntity
  Object.keys(rawEntityMap).forEach(function (rawEntityKey) {
    var _rawEntityMap$rawEnti = rawEntityMap[rawEntityKey],
        type = _rawEntityMap$rawEnti.type,
        mutability = _rawEntityMap$rawEnti.mutability,
        data = _rawEntityMap$rawEnti.data;

    // get the key reference to created entity

    entityMap[rawEntityKey] = DraftEntity_1.__create(type, mutability, data || {});
  });

  return entityMap;
};

var convertFromRawToDraftState = function convertFromRawToDraftState(rawState) {
  !Array.isArray(rawState.blocks) ? process.env.NODE_ENV !== 'production' ? invariant_1(false, 'invalid RawDraftContentState') : invariant_1(false) : void 0;

  // decode entities
  var entityMap = decodeRawEntityMap(rawState);

  // decode blockMap
  var blockMap = decodeRawBlocks(rawState, entityMap);

  // create initial selection
  var selectionState = blockMap.isEmpty() ? new SelectionState_1() : SelectionState_1.createEmpty(blockMap.first().getKey());

  return new ContentState_1({
    blockMap: blockMap,
    entityMap: entityMap,
    selectionBefore: selectionState,
    selectionAfter: selectionState
  });
};

var convertFromRawToDraftState_1 = convertFromRawToDraftState;

/**
 * Like range.getBoundingClientRect() but normalizes for browser bugs.
 */
function getRangeBoundingClientRect(range) {
  // "Return a DOMRect object describing the smallest rectangle that includes
  // the first rectangle in list and all of the remaining rectangles of which
  // the height or width is not zero."
  // http://www.w3.org/TR/cssom-view/#dom-range-getboundingclientrect
  var rects = getRangeClientRects_1(range);
  var top = 0;
  var right = 0;
  var bottom = 0;
  var left = 0;

  if (rects.length) {
    // If the first rectangle has 0 width, we use the second, this is needed
    // because Chrome renders a 0 width rectangle when the selection contains
    // a line break.
    if (rects.length > 1 && rects[0].width === 0) {
      var _rects$ = rects[1];
      top = _rects$.top;
      right = _rects$.right;
      bottom = _rects$.bottom;
      left = _rects$.left;
    } else {
      var _rects$2 = rects[0];
      top = _rects$2.top;
      right = _rects$2.right;
      bottom = _rects$2.bottom;
      left = _rects$2.left;
    }

    for (var ii = 1; ii < rects.length; ii++) {
      var rect = rects[ii];
      if (rect.height !== 0 && rect.width !== 0) {
        top = Math.min(top, rect.top);
        right = Math.max(right, rect.right);
        bottom = Math.max(bottom, rect.bottom);
        left = Math.min(left, rect.left);
      }
    }
  }

  return {
    top: top,
    right: right,
    bottom: bottom,
    left: left,
    width: right - left,
    height: bottom - top
  };
}

var getRangeBoundingClientRect_1 = getRangeBoundingClientRect;

/**
 * Return the bounding ClientRect for the visible DOM selection, if any.
 * In cases where there are no selected ranges or the bounding rect is
 * temporarily invalid, return null.
 */
function getVisibleSelectionRect(global) {
  var selection = global.getSelection();
  if (!selection.rangeCount) {
    return null;
  }

  var range = selection.getRangeAt(0);
  var boundingRect = getRangeBoundingClientRect_1(range);
  var top = boundingRect.top,
      right = boundingRect.right,
      bottom = boundingRect.bottom,
      left = boundingRect.left;

  // When a re-render leads to a node being removed, the DOM selection will
  // temporarily be placed on an ancestor node, which leads to an invalid
  // bounding rect. Discard this state.

  if (top === 0 && right === 0 && bottom === 0 && left === 0) {
    return null;
  }

  return boundingRect;
}

var getVisibleSelectionRect_1 = getVisibleSelectionRect;

var DraftPublic = {
  Editor: DraftEditor_react,
  EditorBlock: DraftEditorBlock_react,
  EditorState: EditorState_1,

  CompositeDecorator: CompositeDraftDecorator_1,
  Entity: DraftEntity_1,
  EntityInstance: DraftEntityInstance_1,

  BlockMapBuilder: BlockMapBuilder_1,
  CharacterMetadata: CharacterMetadata_1,
  ContentBlock: ContentBlock_1,
  ContentState: ContentState_1,
  SelectionState: SelectionState_1,

  AtomicBlockUtils: AtomicBlockUtils_1,
  KeyBindingUtil: KeyBindingUtil_1,
  Modifier: DraftModifier_1,
  RichUtils: RichTextEditorUtil_1,

  DefaultDraftBlockRenderMap: DefaultDraftBlockRenderMap_1,
  DefaultDraftInlineStyle: DefaultDraftInlineStyle,

  convertFromHTML: convertFromHTMLToContentBlocks,
  convertFromRaw: convertFromRawToDraftState_1,
  convertToRaw: convertFromDraftStateToRaw_1,
  genKey: generateRandomKey_1,
  getDefaultKeyBinding: getDefaultKeyBinding_1,
  getVisibleSelectionRect: getVisibleSelectionRect_1
};

var Draft = DraftPublic;

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

var EditorState$1 = Draft.EditorState; // import styles from './styles.css'

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
          setEditorState = _this$props.pluginMethods.setEditorState;
      var selection = editorState.getSelection();
      selection = selection.merge({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: 0
      });
      window.getSelection().removeAllRanges();
      setEditorState(EditorState$1.forceSelection(editorState, selection));
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

    var registerPlugin = _this.props.pluginMethods.registerPlugin;
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
