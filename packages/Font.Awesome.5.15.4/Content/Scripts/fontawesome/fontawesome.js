/*!
 * Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */
(function () {
  'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

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

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var noop = function noop() {};

  var _WINDOW = {};
  var _DOCUMENT = {};
  var _MUTATION_OBSERVER = null;
  var _PERFORMANCE = {
    mark: noop,
    measure: noop
  };

  try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
    if (typeof MutationObserver !== 'undefined') _MUTATION_OBSERVER = MutationObserver;
    if (typeof performance !== 'undefined') _PERFORMANCE = performance;
  } catch (e) {}

  var _ref = _WINDOW.navigator || {},
      _ref$userAgent = _ref.userAgent,
      userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;

  var WINDOW = _WINDOW;
  var DOCUMENT = _DOCUMENT;
  var MUTATION_OBSERVER = _MUTATION_OBSERVER;
  var PERFORMANCE = _PERFORMANCE;
  var IS_BROWSER = !!WINDOW.document;
  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
  var UNITS_IN_GRID = 16;
  var DEFAULT_FAMILY_PREFIX = 'fa';
  var DEFAULT_REPLACEMENT_CLASS = 'svg-inline--fa';
  var DATA_FA_I2SVG = 'data-fa-i2svg';
  var DATA_FA_PSEUDO_ELEMENT = 'data-fa-pseudo-element';
  var DATA_FA_PSEUDO_ELEMENT_PENDING = 'data-fa-pseudo-element-pending';
  var DATA_PREFIX = 'data-prefix';
  var DATA_ICON = 'data-icon';
  var HTML_CLASS_I2SVG_BASE_CLASS = 'fontawesome-i2svg';
  var MUTATION_APPROACH_ASYNC = 'async';
  var TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS = ['HTML', 'HEAD', 'STYLE', 'SCRIPT'];
  var PRODUCTION = function () {
    try {
      return "production" === 'production';
    } catch (e) {
      return false;
    }
  }();
  var PREFIX_TO_STYLE = {
    'fas': 'solid',
    'far': 'regular',
    'fal': 'light',
    'fad': 'duotone',
    'fab': 'brands',
    'fak': 'kit',
    'fa': 'solid'
  };
  var STYLE_TO_PREFIX = {
    'solid': 'fas',
    'regular': 'far',
    'light': 'fal',
    'duotone': 'fad',
    'brands': 'fab',
    'kit': 'fak'
  };
  var LAYERS_TEXT_CLASSNAME = 'fa-layers-text';
  var FONT_FAMILY_PATTERN = /Font Awesome ([5 ]*)(Solid|Regular|Light|Duotone|Brands|Free|Pro|Kit).*/i; // TODO: do we need to handle font-weight for kit SVG pseudo-elements?

  var FONT_WEIGHT_TO_PREFIX = {
    '900': 'fas',
    '400': 'far',
    'normal': 'far',
    '300': 'fal'
  };
  var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  var ATTRIBUTES_WATCHED_FOR_MUTATION = ['class', 'data-prefix', 'data-icon', 'data-fa-transform', 'data-fa-mask'];
  var DUOTONE_CLASSES = {
    GROUP: 'group',
    SWAP_OPACITY: 'swap-opacity',
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
  };
  var RESERVED_CLASSES = ['xs', 'sm', 'lg', 'fw', 'ul', 'li', 'border', 'pull-left', 'pull-right', 'spin', 'pulse', 'rotate-90', 'rotate-180', 'rotate-270', 'flip-horizontal', 'flip-vertical', 'flip-both', 'stack', 'stack-1x', 'stack-2x', 'inverse', 'layers', 'layers-text', 'layers-counter', DUOTONE_CLASSES.GROUP, DUOTONE_CLASSES.SWAP_OPACITY, DUOTONE_CLASSES.PRIMARY, DUOTONE_CLASSES.SECONDARY].concat(oneToTen.map(function (n) {
    return "".concat(n, "x");
  })).concat(oneToTwenty.map(function (n) {
    return "w-".concat(n);
  }));

  var initial = WINDOW.FontAwesomeConfig || {};

  function getAttrConfig(attr) {
    var element = DOCUMENT.querySelector('script[' + attr + ']');

    if (element) {
      return element.getAttribute(attr);
    }
  }

  function coerce(val) {
    // Getting an empty string will occur if the attribute is set on the HTML tag but without a value
    // We'll assume that this is an indication that it should be toggled to true
    // For example <script data-search-pseudo-elements src="..."></script>
    if (val === '') return true;
    if (val === 'false') return false;
    if (val === 'true') return true;
    return val;
  }

  if (DOCUMENT && typeof DOCUMENT.querySelector === 'function') {
    var attrs = [['data-family-prefix', 'familyPrefix'], ['data-replacement-class', 'replacementClass'], ['data-auto-replace-svg', 'autoReplaceSvg'], ['data-auto-add-css', 'autoAddCss'], ['data-auto-a11y', 'autoA11y'], ['data-search-pseudo-elements', 'searchPseudoElements'], ['data-observe-mutations', 'observeMutations'], ['data-mutate-approach', 'mutateApproach'], ['data-keep-original-source', 'keepOriginalSource'], ['data-measure-performance', 'measurePerformance'], ['data-show-missing-icons', 'showMissingIcons']];
    attrs.forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          attr = _ref2[0],
          key = _ref2[1];

      var val = coerce(getAttrConfig(attr));

      if (val !== undefined && val !== null) {
        initial[key] = val;
      }
    });
  }

  var _default = {
    familyPrefix: DEFAULT_FAMILY_PREFIX,
    replacementClass: DEFAULT_REPLACEMENT_CLASS,
    autoReplaceSvg: true,
    autoAddCss: true,
    autoA11y: true,
    searchPseudoElements: false,
    observeMutations: true,
    mutateApproach: 'async',
    keepOriginalSource: true,
    measurePerformance: false,
    showMissingIcons: true
  };

  var _config = _objectSpread({}, _default, initial);

  if (!_config.autoReplaceSvg) _config.observeMutations = false;

  var config = _objectSpread({}, _config);

  WINDOW.FontAwesomeConfig = config;

  var w = WINDOW || {};
  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
  var namespace = w[NAMESPACE_IDENTIFIER];

  var functions = [];

  var listener = function listener() {
    DOCUMENT.removeEventListener('DOMContentLoaded', listener);
    loaded = 1;
    functions.map(function (fn) {
      return fn();
    });
  };

  var loaded = false;

  if (IS_DOM) {
    loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
    if (!loaded) DOCUMENT.addEventListener('DOMContentLoaded', listener);
  }

  function domready (fn) {
    if (!IS_DOM) return;
    loaded ? setTimeout(fn, 0) : functions.push(fn);
  }

  var PENDING = 'pending';
  var SETTLED = 'settled';
  var FULFILLED = 'fulfilled';
  var REJECTED = 'rejected';

  var NOOP = function NOOP() {};

  var isNode = typeof global !== 'undefined' && typeof global.process !== 'undefined' && typeof global.process.emit === 'function';
  var asyncSetTimer = typeof setImmediate === 'undefined' ? setTimeout : setImmediate;
  var asyncQueue = [];
  var asyncTimer;

  function asyncFlush() {
    // run promise callbacks
    for (var i = 0; i < asyncQueue.length; i++) {
      asyncQueue[i][0](asyncQueue[i][1]);
    } // reset async asyncQueue


    asyncQueue = [];
    asyncTimer = false;
  }

  function asyncCall(callback, arg) {
    asyncQueue.push([callback, arg]);

    if (!asyncTimer) {
      asyncTimer = true;
      asyncSetTimer(asyncFlush, 0);
    }
  }

  function invokeResolver(resolver, promise) {
    function resolvePromise(value) {
      resolve(promise, value);
    }

    function rejectPromise(reason) {
      reject(promise, reason);
    }

    try {
      resolver(resolvePromise, rejectPromise);
    } catch (e) {
      rejectPromise(e);
    }
  }

  function invokeCallback(subscriber) {
    var owner = subscriber.owner;
    var settled = owner._state;
    var value = owner._data;
    var callback = subscriber[settled];
    var promise = subscriber.then;

    if (typeof callback === 'function') {
      settled = FULFILLED;

      try {
        value = callback(value);
      } catch (e) {
        reject(promise, e);
      }
    }

    if (!handleThenable(promise, value)) {
      if (settled === FULFILLED) {
        resolve(promise, value);
      }

      if (settled === REJECTED) {
        reject(promise, value);
      }
    }
  }

  function handleThenable(promise, value) {
    var resolved;

    try {
      if (promise === value) {
        throw new TypeError('A promises callback cannot return that same promise.');
      }

      if (value && (typeof value === 'function' || _typeof(value) === 'object')) {
        // then should be retrieved only once
        var then = value.then;

        if (typeof then === 'function') {
          then.call(value, function (val) {
            if (!resolved) {
              resolved = true;

              if (value === val) {
                fulfill(promise, val);
              } else {
                resolve(promise, val);
              }
            }
          }, function (reason) {
            if (!resolved) {
              resolved = true;
              reject(promise, reason);
            }
          });
          return true;
        }
      }
    } catch (e) {
      if (!resolved) {
        reject(promise, e);
      }

      return true;
    }

    return false;
  }

  function resolve(promise, value) {
    if (promise === value || !handleThenable(promise, value)) {
      fulfill(promise, value);
    }
  }

  function fulfill(promise, value) {
    if (promise._state === PENDING) {
      promise._state = SETTLED;
      promise._data = value;
      asyncCall(publishFulfillment, promise);
    }
  }

  function reject(promise, reason) {
    if (promise._state === PENDING) {
      promise._state = SETTLED;
      promise._data = reason;
      asyncCall(publishRejection, promise);
    }
  }

  function publish(promise) {
    promise._then = promise._then.forEach(invokeCallback);
  }

  function publishFulfillment(promise) {
    promise._state = FULFILLED;
    publish(promise);
  }

  function publishRejection(promise) {
    promise._state = REJECTED;
    publish(promise);

    if (!promise._handled && isNode) {
      global.process.emit('unhandledRejection', promise._data, promise);
    }
  }

  function notifyRejectionHandled(promise) {
    global.process.emit('rejectionHandled', promise);
  }
  /**
   * @class
   */


  function P(resolver) {
    if (typeof resolver !== 'function') {
      throw new TypeError('Promise resolver ' + resolver + ' is not a function');
    }

    if (this instanceof P === false) {
      throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');
    }

    this._then = [];
    invokeResolver(resolver, this);
  }

  P.prototype = {
    constructor: P,
    _state: PENDING,
    _then: null,
    _data: undefined,
    _handled: false,
    then: function then(onFulfillment, onRejection) {
      var subscriber = {
        owner: this,
        then: new this.constructor(NOOP),
        fulfilled: onFulfillment,
        rejected: onRejection
      };

      if ((onRejection || onFulfillment) && !this._handled) {
        this._handled = true;

        if (this._state === REJECTED && isNode) {
          asyncCall(notifyRejectionHandled, this);
        }
      }

      if (this._state === FULFILLED || this._state === REJECTED) {
        // already resolved, call callback async
        asyncCall(invokeCallback, subscriber);
      } else {
        // subscribe
        this._then.push(subscriber);
      }

      return subscriber.then;
    },
    catch: function _catch(onRejection) {
      return this.then(null, onRejection);
    }
  };

  P.all = function (promises) {
    if (!Array.isArray(promises)) {
      throw new TypeError('You must pass an array to Promise.all().');
    }

    return new P(function (resolve, reject) {
      var results = [];
      var remaining = 0;

      function resolver(index) {
        remaining++;
        return function (value) {
          results[index] = value;

          if (! --remaining) {
            resolve(results);
          }
        };
      }

      for (var i = 0, promise; i < promises.length; i++) {
        promise = promises[i];

        if (promise && typeof promise.then === 'function') {
          promise.then(resolver(i), reject);
        } else {
          results[i] = promise;
        }
      }

      if (!remaining) {
        resolve(results);
      }
    });
  };

  P.race = function (promises) {
    if (!Array.isArray(promises)) {
      throw new TypeError('You must pass an array to Promise.race().');
    }

    return new P(function (resolve, reject) {
      for (var i = 0, promise; i < promises.length; i++) {
        promise = promises[i];

        if (promise && typeof promise.then === 'function') {
          promise.then(resolve, reject);
        } else {
          resolve(promise);
        }
      }
    });
  };

  P.resolve = function (value) {
    if (value && _typeof(value) === 'object' && value.constructor === P) {
      return value;
    }

    return new P(function (resolve) {
      resolve(value);
    });
  };

  P.reject = function (reason) {
    return new P(function (resolve, reject) {
      reject(reason);
    });
  };

  var picked = typeof Promise === 'function' ? Promise : P;

  var d = UNITS_IN_GRID;
  var meaninglessTransform = {
    size: 16,
    x: 0,
    y: 0,
    rotate: 0,
    flipX: false,
    flipY: false
  };

  function isReserved(name) {
    return ~RESERVED_CLASSES.indexOf(name);
  }

  function bunker(fn) {
    try {
      fn();
    } catch (e) {
      if (!PRODUCTION) {
        throw e;
      }
    }
  }
  function insertCss(css) {
    if (!css || !IS_DOM) {
      return;
    }

    var style = DOCUMENT.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    var headChildren = DOCUMENT.head.childNodes;
    var beforeChild = null;

    for (var i = headChildren.length - 1; i > -1; i--) {
      var child = headChildren[i];
      var tagName = (child.tagName || '').toUpperCase();

      if (['STYLE', 'LINK'].indexOf(tagName) > -1) {
        beforeChild = child;
      }
    }

    DOCUMENT.head.insertBefore(style, beforeChild);
    return css;
  }
  var idPool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  function nextUniqueId() {
    var size = 12;
    var id = '';

    while (size-- > 0) {
      id += idPool[Math.random() * 62 | 0];
    }

    return id;
  }
  function toArray(obj) {
    var array = [];

    for (var i = (obj || []).length >>> 0; i--;) {
      array[i] = obj[i];
    }

    return array;
  }
  function classArray(node) {
    if (node.classList) {
      return toArray(node.classList);
    } else {
      return (node.getAttribute('class') || '').split(' ').filter(function (i) {
        return i;
      });
    }
  }
  function getIconName(familyPrefix, cls) {
    var parts = cls.split('-');
    var prefix = parts[0];
    var iconName = parts.slice(1).join('-');

    if (prefix === familyPrefix && iconName !== '' && !isReserved(iconName)) {
      return iconName;
    } else {
      return null;
    }
  }
  function htmlEscape(str) {
    return "".concat(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function joinAttributes(attributes) {
    return Object.keys(attributes || {}).reduce(function (acc, attributeName) {
      return acc + "".concat(attributeName, "=\"").concat(htmlEscape(attributes[attributeName]), "\" ");
    }, '').trim();
  }
  function joinStyles(styles) {
    return Object.keys(styles || {}).reduce(function (acc, styleName) {
      return acc + "".concat(styleName, ": ").concat(styles[styleName], ";");
    }, '');
  }
  function transformIsMeaningful(transform) {
    return transform.size !== meaninglessTransform.size || transform.x !== meaninglessTransform.x || transform.y !== meaninglessTransform.y || transform.rotate !== meaninglessTransform.rotate || transform.flipX || transform.flipY;
  }
  function transformForSvg(_ref) {
    var transform = _ref.transform,
        containerWidth = _ref.containerWidth,
        iconWidth = _ref.iconWidth;
    var outer = {
      transform: "translate(".concat(containerWidth / 2, " 256)")
    };
    var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
    var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
    var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
    var inner = {
      transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
    };
    var path = {
      transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
    };
    return {
      outer: outer,
      inner: inner,
      path: path
    };
  }
  function transformForCss(_ref2) {
    var transform = _ref2.transform,
        _ref2$width = _ref2.width,
        width = _ref2$width === void 0 ? UNITS_IN_GRID : _ref2$width,
        _ref2$height = _ref2.height,
        height = _ref2$height === void 0 ? UNITS_IN_GRID : _ref2$height,
        _ref2$startCentered = _ref2.startCentered,
        startCentered = _ref2$startCentered === void 0 ? false : _ref2$startCentered;
    var val = '';

    if (startCentered && IS_IE) {
      val += "translate(".concat(transform.x / d - width / 2, "em, ").concat(transform.y / d - height / 2, "em) ");
    } else if (startCentered) {
      val += "translate(calc(-50% + ".concat(transform.x / d, "em), calc(-50% + ").concat(transform.y / d, "em)) ");
    } else {
      val += "translate(".concat(transform.x / d, "em, ").concat(transform.y / d, "em) ");
    }

    val += "scale(".concat(transform.size / d * (transform.flipX ? -1 : 1), ", ").concat(transform.size / d * (transform.flipY ? -1 : 1), ") ");
    val += "rotate(".concat(transform.rotate, "deg) ");
    return val;
  }

  var ALL_SPACE = {
    x: 0,
    y: 0,
    width: '100%',
    height: '100%'
  };

  function fillBlack(abstract) {
    var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (abstract.attributes && (abstract.attributes.fill || force)) {
      abstract.attributes.fill = 'black';
    }

    return abstract;
  }

  function deGroup(abstract) {
    if (abstract.tag === 'g') {
      return abstract.children;
    } else {
      return [abstract];
    }
  }

  function makeIconMasking (_ref) {
    var children = _ref.children,
        attributes = _ref.attributes,
        main = _ref.main,
        mask = _ref.mask,
        explicitMaskId = _ref.maskId,
        transform = _ref.transform;
    var mainWidth = main.width,
        mainPath = main.icon;
    var maskWidth = mask.width,
        maskPath = mask.icon;
    var trans = transformForSvg({
      transform: transform,
      containerWidth: maskWidth,
      iconWidth: mainWidth
    });
    var maskRect = {
      tag: 'rect',
      attributes: _objectSpread({}, ALL_SPACE, {
        fill: 'white'
      })
    };
    var maskInnerGroupChildrenMixin = mainPath.children ? {
      children: mainPath.children.map(fillBlack)
    } : {};
    var maskInnerGroup = {
      tag: 'g',
      attributes: _objectSpread({}, trans.inner),
      children: [fillBlack(_objectSpread({
        tag: mainPath.tag,
        attributes: _objectSpread({}, mainPath.attributes, trans.path)
      }, maskInnerGroupChildrenMixin))]
    };
    var maskOuterGroup = {
      tag: 'g',
      attributes: _objectSpread({}, trans.outer),
      children: [maskInnerGroup]
    };
    var maskId = "mask-".concat(explicitMaskId || nextUniqueId());
    var clipId = "clip-".concat(explicitMaskId || nextUniqueId());
    var maskTag = {
      tag: 'mask',
      attributes: _objectSpread({}, ALL_SPACE, {
        id: maskId,
        maskUnits: 'userSpaceOnUse',
        maskContentUnits: 'userSpaceOnUse'
      }),
      children: [maskRect, maskOuterGroup]
    };
    var defs = {
      tag: 'defs',
      children: [{
        tag: 'clipPath',
        attributes: {
          id: clipId
        },
        children: deGroup(maskPath)
      }, maskTag]
    };
    children.push(defs, {
      tag: 'rect',
      attributes: _objectSpread({
        fill: 'currentColor',
        'clip-path': "url(#".concat(clipId, ")"),
        mask: "url(#".concat(maskId, ")")
      }, ALL_SPACE)
    });
    return {
      children: children,
      attributes: attributes
    };
  }

  function makeIconStandard (_ref) {
    var children = _ref.children,
        attributes = _ref.attributes,
        main = _ref.main,
        transform = _ref.transform,
        styles = _ref.styles;
    var styleString = joinStyles(styles);

    if (styleString.length > 0) {
      attributes['style'] = styleString;
    }

    if (transformIsMeaningful(transform)) {
      var trans = transformForSvg({
        transform: transform,
        containerWidth: main.width,
        iconWidth: main.width
      });
      children.push({
        tag: 'g',
        attributes: _objectSpread({}, trans.outer),
        children: [{
          tag: 'g',
          attributes: _objectSpread({}, trans.inner),
          children: [{
            tag: main.icon.tag,
            children: main.icon.children,
            attributes: _objectSpread({}, main.icon.attributes, trans.path)
          }]
        }]
      });
    } else {
      children.push(main.icon);
    }

    return {
      children: children,
      attributes: attributes
    };
  }

  function asIcon (_ref) {
    var children = _ref.children,
        main = _ref.main,
        mask = _ref.mask,
        attributes = _ref.attributes,
        styles = _ref.styles,
        transform = _ref.transform;

    if (transformIsMeaningful(transform) && main.found && !mask.found) {
      var width = main.width,
          height = main.height;
      var offset = {
        x: width / height / 2,
        y: 0.5
      };
      attributes['style'] = joinStyles(_objectSpread({}, styles, {
        'transform-origin': "".concat(offset.x + transform.x / 16, "em ").concat(offset.y + transform.y / 16, "em")
      }));
    }

    return [{
      tag: 'svg',
      attributes: attributes,
      children: children
    }];
  }

  function asSymbol (_ref) {
    var prefix = _ref.prefix,
        iconName = _ref.iconName,
        children = _ref.children,
        attributes = _ref.attributes,
        symbol = _ref.symbol;
    var id = symbol === true ? "".concat(prefix, "-").concat(config.familyPrefix, "-").concat(iconName) : symbol;
    return [{
      tag: 'svg',
      attributes: {
        style: 'display: none;'
      },
      children: [{
        tag: 'symbol',
        attributes: _objectSpread({}, attributes, {
          id: id
        }),
        children: children
      }]
    }];
  }

  function makeInlineSvgAbstract(params) {
    var _params$icons = params.icons,
        main = _params$icons.main,
        mask = _params$icons.mask,
        prefix = params.prefix,
        iconName = params.iconName,
        transform = params.transform,
        symbol = params.symbol,
        title = params.title,
        maskId = params.maskId,
        titleId = params.titleId,
        extra = params.extra,
        _params$watchable = params.watchable,
        watchable = _params$watchable === void 0 ? false : _params$watchable;

    var _ref = mask.found ? mask : main,
        width = _ref.width,
        height = _ref.height;

    var isUploadedIcon = prefix === 'fak';
    var widthClass = isUploadedIcon ? '' : "fa-w-".concat(Math.ceil(width / height * 16));
    var attrClass = [config.replacementClass, iconName ? "".concat(config.familyPrefix, "-").concat(iconName) : '', widthClass].filter(function (c) {
      return extra.classes.indexOf(c) === -1;
    }).filter(function (c) {
      return c !== '' || !!c;
    }).concat(extra.classes).join(' ');
    var content = {
      children: [],
      attributes: _objectSpread({}, extra.attributes, {
        'data-prefix': prefix,
        'data-icon': iconName,
        'class': attrClass,
        'role': extra.attributes.role || 'img',
        'xmlns': 'http://www.w3.org/2000/svg',
        'viewBox': "0 0 ".concat(width, " ").concat(height)
      })
    };
    var uploadedIconWidthStyle = isUploadedIcon && !~extra.classes.indexOf('fa-fw') ? {
      width: "".concat(width / height * 16 * 0.0625, "em")
    } : {};

    if (watchable) {
      content.attributes[DATA_FA_I2SVG] = '';
    }

    if (title) content.children.push({
      tag: 'title',
      attributes: {
        id: content.attributes['aria-labelledby'] || "title-".concat(titleId || nextUniqueId())
      },
      children: [title]
    });

    var args = _objectSpread({}, content, {
      prefix: prefix,
      iconName: iconName,
      main: main,
      mask: mask,
      maskId: maskId,
      transform: transform,
      symbol: symbol,
      styles: _objectSpread({}, uploadedIconWidthStyle, extra.styles)
    });

    var _ref2 = mask.found && main.found ? makeIconMasking(args) : makeIconStandard(args),
        children = _ref2.children,
        attributes = _ref2.attributes;

    args.children = children;
    args.attributes = attributes;

    if (symbol) {
      return asSymbol(args);
    } else {
      return asIcon(args);
    }
  }
  function makeLayersTextAbstract(params) {
    var content = params.content,
        width = params.width,
        height = params.height,
        transform = params.transform,
        title = params.title,
        extra = params.extra,
        _params$watchable2 = params.watchable,
        watchable = _params$watchable2 === void 0 ? false : _params$watchable2;

    var attributes = _objectSpread({}, extra.attributes, title ? {
      'title': title
    } : {}, {
      'class': extra.classes.join(' ')
    });

    if (watchable) {
      attributes[DATA_FA_I2SVG] = '';
    }

    var styles = _objectSpread({}, extra.styles);

    if (transformIsMeaningful(transform)) {
      styles['transform'] = transformForCss({
        transform: transform,
        startCentered: true,
        width: width,
        height: height
      });
      styles['-webkit-transform'] = styles['transform'];
    }

    var styleString = joinStyles(styles);

    if (styleString.length > 0) {
      attributes['style'] = styleString;
    }

    var val = [];
    val.push({
      tag: 'span',
      attributes: attributes,
      children: [content]
    });

    if (title) {
      val.push({
        tag: 'span',
        attributes: {
          class: 'sr-only'
        },
        children: [title]
      });
    }

    return val;
  }
  function makeLayersCounterAbstract(params) {
    var content = params.content,
        title = params.title,
        extra = params.extra;

    var attributes = _objectSpread({}, extra.attributes, title ? {
      'title': title
    } : {}, {
      'class': extra.classes.join(' ')
    });

    var styleString = joinStyles(extra.styles);

    if (styleString.length > 0) {
      attributes['style'] = styleString;
    }

    var val = [];
    val.push({
      tag: 'span',
      attributes: attributes,
      children: [content]
    });

    if (title) {
      val.push({
        tag: 'span',
        attributes: {
          class: 'sr-only'
        },
        children: [title]
      });
    }

    return val;
  }

  var noop$1 = function noop() {};

  var p = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
    mark: noop$1,
    measure: noop$1
  };
  var preamble = "FA \"5.15.4\"";

  var begin = function begin(name) {
    p.mark("".concat(preamble, " ").concat(name, " begins"));
    return function () {
      return end(name);
    };
  };

  var end = function end(name) {
    p.mark("".concat(preamble, " ").concat(name, " ends"));
    p.measure("".concat(preamble, " ").concat(name), "".concat(preamble, " ").concat(name, " begins"), "".concat(preamble, " ").concat(name, " ends"));
  };

  var perf = {
    begin: begin,
    end: end
  };

  /**
   * Internal helper to bind a function known to have 4 arguments
   * to a given context.
   */

  var bindInternal4 = function bindInternal4(func, thisContext) {
    return function (a, b, c, d) {
      return func.call(thisContext, a, b, c, d);
    };
  };

  /**
   * # Reduce
   *
   * A fast object `.reduce()` implementation.
   *
   * @param  {Object}   subject      The object to reduce over.
   * @param  {Function} fn           The reducer function.
   * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
   * @param  {Object}   thisContext  The context for the reducer.
   * @return {mixed}                 The final result.
   */


  var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
    var keys = Object.keys(subject),
        length = keys.length,
        iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
        i,
        key,
        result;

    if (initialValue === undefined) {
      i = 1;
      result = subject[keys[0]];
    } else {
      i = 0;
      result = initialValue;
    }

    for (; i < length; i++) {
      key = keys[i];
      result = iterator(result, subject[key], key, subject);
    }

    return result;
  };

  function toHex(unicode) {
    var result = '';

    for (var i = 0; i < unicode.length; i++) {
      var hex = unicode.charCodeAt(i).toString(16);
      result += ('000' + hex).slice(-4);
    }

    return result;
  }

  function defineIcons(prefix, icons) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _params$skipHooks = params.skipHooks,
        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
    var normalized = Object.keys(icons).reduce(function (acc, iconName) {
      var icon = icons[iconName];
      var expanded = !!icon.icon;

      if (expanded) {
        acc[icon.iconName] = icon.icon;
      } else {
        acc[iconName] = icon;
      }

      return acc;
    }, {});

    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
      namespace.hooks.addPack(prefix, normalized);
    } else {
      namespace.styles[prefix] = _objectSpread({}, namespace.styles[prefix] || {}, normalized);
    }
    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll easy the upgrade process for our users by automatically defining
     * this as well.
     */


    if (prefix === 'fas') {
      defineIcons('fa', icons);
    }
  }

  var styles = namespace.styles,
      shims = namespace.shims;
  var _byUnicode = {};
  var _byLigature = {};
  var _byOldName = {};
  var build = function build() {
    var lookup = function lookup(reducer) {
      return reduce(styles, function (o, style, prefix) {
        o[prefix] = reduce(style, reducer, {});
        return o;
      }, {});
    };

    _byUnicode = lookup(function (acc, icon, iconName) {
      if (icon[3]) {
        acc[icon[3]] = iconName;
      }

      return acc;
    });
    _byLigature = lookup(function (acc, icon, iconName) {
      var ligatures = icon[2];
      acc[iconName] = iconName;
      ligatures.forEach(function (ligature) {
        acc[ligature] = iconName;
      });
      return acc;
    });
    var hasRegular = 'far' in styles;
    _byOldName = reduce(shims, function (acc, shim) {
      var oldName = shim[0];
      var prefix = shim[1];
      var iconName = shim[2];

      if (prefix === 'far' && !hasRegular) {
        prefix = 'fas';
      }

      acc[oldName] = {
        prefix: prefix,
        iconName: iconName
      };
      return acc;
    }, {});
  };
  build();
  function byUnicode(prefix, unicode) {
    return (_byUnicode[prefix] || {})[unicode];
  }
  function byLigature(prefix, ligature) {
    return (_byLigature[prefix] || {})[ligature];
  }
  function byOldName(name) {
    return _byOldName[name] || {
      prefix: null,
      iconName: null
    };
  }

  var styles$1 = namespace.styles;
  var emptyCanonicalIcon = function emptyCanonicalIcon() {
    return {
      prefix: null,
      iconName: null,
      rest: []
    };
  };
  function getCanonicalIcon(values) {
    return values.reduce(function (acc, cls) {
      var iconName = getIconName(config.familyPrefix, cls);

      if (styles$1[cls]) {
        acc.prefix = cls;
      } else if (config.autoFetchSvg && Object.keys(PREFIX_TO_STYLE).indexOf(cls) > -1) {
        acc.prefix = cls;
      } else if (iconName) {
        var shim = acc.prefix === 'fa' ? byOldName(iconName) : {};
        acc.iconName = shim.iconName || iconName;
        acc.prefix = shim.prefix || acc.prefix;
      } else if (cls !== config.replacementClass && cls.indexOf('fa-w-') !== 0) {
        acc.rest.push(cls);
      }

      return acc;
    }, emptyCanonicalIcon());
  }
  function iconFromMapping(mapping, prefix, iconName) {
    if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
      return {
        prefix: prefix,
        iconName: iconName,
        icon: mapping[prefix][iconName]
      };
    }
  }

  function toHtml(abstractNodes) {
    var tag = abstractNodes.tag,
        _abstractNodes$attrib = abstractNodes.attributes,
        attributes = _abstractNodes$attrib === void 0 ? {} : _abstractNodes$attrib,
        _abstractNodes$childr = abstractNodes.children,
        children = _abstractNodes$childr === void 0 ? [] : _abstractNodes$childr;

    if (typeof abstractNodes === 'string') {
      return htmlEscape(abstractNodes);
    } else {
      return "<".concat(tag, " ").concat(joinAttributes(attributes), ">").concat(children.map(toHtml).join(''), "</").concat(tag, ">");
    }
  }

  var noop$2 = function noop() {};

  function isWatched(node) {
    var i2svg = node.getAttribute ? node.getAttribute(DATA_FA_I2SVG) : null;
    return typeof i2svg === 'string';
  }

  function getMutator() {
    if (config.autoReplaceSvg === true) {
      return mutators.replace;
    }

    var mutator = mutators[config.autoReplaceSvg];
    return mutator || mutators.replace;
  }

  var mutators = {
    replace: function replace(mutation) {
      var node = mutation[0];
      var abstract = mutation[1];
      var newOuterHTML = abstract.map(function (a) {
        return toHtml(a);
      }).join('\n');

      if (node.parentNode && node.outerHTML) {
        node.outerHTML = newOuterHTML + (config.keepOriginalSource && node.tagName.toLowerCase() !== 'svg' ? "<!-- ".concat(node.outerHTML, " Font Awesome fontawesome.com -->") : '');
      } else if (node.parentNode) {
        var newNode = document.createElement('span');
        node.parentNode.replaceChild(newNode, node);
        newNode.outerHTML = newOuterHTML;
      }
    },
    nest: function nest(mutation) {
      var node = mutation[0];
      var abstract = mutation[1]; // If we already have a replaced node we do not want to continue nesting within it.
      // Short-circuit to the standard replacement

      if (~classArray(node).indexOf(config.replacementClass)) {
        return mutators.replace(mutation);
      }

      var forSvg = new RegExp("".concat(config.familyPrefix, "-.*"));
      delete abstract[0].attributes.style;
      delete abstract[0].attributes.id;
      var splitClasses = abstract[0].attributes.class.split(' ').reduce(function (acc, cls) {
        if (cls === config.replacementClass || cls.match(forSvg)) {
          acc.toSvg.push(cls);
        } else {
          acc.toNode.push(cls);
        }

        return acc;
      }, {
        toNode: [],
        toSvg: []
      });
      abstract[0].attributes.class = splitClasses.toSvg.join(' ');
      var newInnerHTML = abstract.map(function (a) {
        return toHtml(a);
      }).join('\n');
      node.setAttribute('class', splitClasses.toNode.join(' '));
      node.setAttribute(DATA_FA_I2SVG, '');
      node.innerHTML = newInnerHTML;
    }
  };

  function performOperationSync(op) {
    op();
  }

  function perform(mutations, callback) {
    var callbackFunction = typeof callback === 'function' ? callback : noop$2;

    if (mutations.length === 0) {
      callbackFunction();
    } else {
      var frame = performOperationSync;

      if (config.mutateApproach === MUTATION_APPROACH_ASYNC) {
        frame = WINDOW.requestAnimationFrame || performOperationSync;
      }

      frame(function () {
        var mutator = getMutator();
        var mark = perf.begin('mutate');
        mutations.map(mutator);
        mark();
        callbackFunction();
      });
    }
  }
  var disabled = false;
  function disableObservation() {
    disabled = true;
  }
  function enableObservation() {
    disabled = false;
  }
  var mo = null;
  function observe(options) {
    if (!MUTATION_OBSERVER) {
      return;
    }

    if (!config.observeMutations) {
      return;
    }

    var treeCallback = options.treeCallback,
        nodeCallback = options.nodeCallback,
        pseudoElementsCallback = options.pseudoElementsCallback,
        _options$observeMutat = options.observeMutationsRoot,
        observeMutationsRoot = _options$observeMutat === void 0 ? DOCUMENT : _options$observeMutat;
    mo = new MUTATION_OBSERVER(function (objects) {
      if (disabled) return;
      toArray(objects).forEach(function (mutationRecord) {
        if (mutationRecord.type === 'childList' && mutationRecord.addedNodes.length > 0 && !isWatched(mutationRecord.addedNodes[0])) {
          if (config.searchPseudoElements) {
            pseudoElementsCallback(mutationRecord.target);
          }

          treeCallback(mutationRecord.target);
        }

        if (mutationRecord.type === 'attributes' && mutationRecord.target.parentNode && config.searchPseudoElements) {
          pseudoElementsCallback(mutationRecord.target.parentNode);
        }

        if (mutationRecord.type === 'attributes' && isWatched(mutationRecord.target) && ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(mutationRecord.attributeName)) {
          if (mutationRecord.attributeName === 'class') {
            var _getCanonicalIcon = getCanonicalIcon(classArray(mutationRecord.target)),
                prefix = _getCanonicalIcon.prefix,
                iconName = _getCanonicalIcon.iconName;

            if (prefix) mutationRecord.target.setAttribute('data-prefix', prefix);
            if (iconName) mutationRecord.target.setAttribute('data-icon', iconName);
          } else {
            nodeCallback(mutationRecord.target);
          }
        }
      });
    });
    if (!IS_DOM) return;
    mo.observe(observeMutationsRoot, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true
    });
  }
  function disconnect() {
    if (!mo) return;
    mo.disconnect();
  }

  function styleParser (node) {
    var style = node.getAttribute('style');
    var val = [];

    if (style) {
      val = style.split(';').reduce(function (acc, style) {
        var styles = style.split(':');
        var prop = styles[0];
        var value = styles.slice(1);

        if (prop && value.length > 0) {
          acc[prop] = value.join(':').trim();
        }

        return acc;
      }, {});
    }

    return val;
  }

  function classParser (node) {
    var existingPrefix = node.getAttribute('data-prefix');
    var existingIconName = node.getAttribute('data-icon');
    var innerText = node.innerText !== undefined ? node.innerText.trim() : '';
    var val = getCanonicalIcon(classArray(node));

    if (existingPrefix && existingIconName) {
      val.prefix = existingPrefix;
      val.iconName = existingIconName;
    }

    if (val.prefix && innerText.length > 1) {
      val.iconName = byLigature(val.prefix, node.innerText);
    } else if (val.prefix && innerText.length === 1) {
      val.iconName = byUnicode(val.prefix, toHex(node.innerText));
    }

    return val;
  }

  var parseTransformString = function parseTransformString(transformString) {
    var transform = {
      size: 16,
      x: 0,
      y: 0,
      flipX: false,
      flipY: false,
      rotate: 0
    };

    if (!transformString) {
      return transform;
    } else {
      return transformString.toLowerCase().split(' ').reduce(function (acc, n) {
        var parts = n.toLowerCase().split('-');
        var first = parts[0];
        var rest = parts.slice(1).join('-');

        if (first && rest === 'h') {
          acc.flipX = true;
          return acc;
        }

        if (first && rest === 'v') {
          acc.flipY = true;
          return acc;
        }

        rest = parseFloat(rest);

        if (isNaN(rest)) {
          return acc;
        }

        switch (first) {
          case 'grow':
            acc.size = acc.size + rest;
            break;

          case 'shrink':
            acc.size = acc.size - rest;
            break;

          case 'left':
            acc.x = acc.x - rest;
            break;

          case 'right':
            acc.x = acc.x + rest;
            break;

          case 'up':
            acc.y = acc.y - rest;
            break;

          case 'down':
            acc.y = acc.y + rest;
            break;

          case 'rotate':
            acc.rotate = acc.rotate + rest;
            break;
        }

        return acc;
      }, transform);
    }
  };
  function transformParser (node) {
    return parseTransformString(node.getAttribute('data-fa-transform'));
  }

  function symbolParser (node) {
    var symbol = node.getAttribute('data-fa-symbol');
    return symbol === null ? false : symbol === '' ? true : symbol;
  }

  function attributesParser (node) {
    var extraAttributes = toArray(node.attributes).reduce(function (acc, attr) {
      if (acc.name !== 'class' && acc.name !== 'style') {
        acc[attr.name] = attr.value;
      }

      return acc;
    }, {});
    var title = node.getAttribute('title');
    var titleId = node.getAttribute('data-fa-title-id');

    if (config.autoA11y) {
      if (title) {
        extraAttributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
      } else {
        extraAttributes['aria-hidden'] = 'true';
        extraAttributes['focusable'] = 'false';
      }
    }

    return extraAttributes;
  }

  function maskParser (node) {
    var mask = node.getAttribute('data-fa-mask');

    if (!mask) {
      return emptyCanonicalIcon();
    } else {
      return getCanonicalIcon(mask.split(' ').map(function (i) {
        return i.trim();
      }));
    }
  }

  function blankMeta() {
    return {
      iconName: null,
      title: null,
      titleId: null,
      prefix: null,
      transform: meaninglessTransform,
      symbol: false,
      mask: null,
      maskId: null,
      extra: {
        classes: [],
        styles: {},
        attributes: {}
      }
    };
  }
  function parseMeta(node) {
    var _classParser = classParser(node),
        iconName = _classParser.iconName,
        prefix = _classParser.prefix,
        extraClasses = _classParser.rest;

    var extraStyles = styleParser(node);
    var transform = transformParser(node);
    var symbol = symbolParser(node);
    var extraAttributes = attributesParser(node);
    var mask = maskParser(node);
    return {
      iconName: iconName,
      title: node.getAttribute('title'),
      titleId: node.getAttribute('data-fa-title-id'),
      prefix: prefix,
      transform: transform,
      symbol: symbol,
      mask: mask,
      maskId: node.getAttribute('data-fa-mask-id'),
      extra: {
        classes: extraClasses,
        styles: extraStyles,
        attributes: extraAttributes
      }
    };
  }

  function MissingIcon(error) {
    this.name = 'MissingIcon';
    this.message = error || 'Icon unavailable';
    this.stack = new Error().stack;
  }
  MissingIcon.prototype = Object.create(Error.prototype);
  MissingIcon.prototype.constructor = MissingIcon;

  var FILL = {
    fill: 'currentColor'
  };
  var ANIMATION_BASE = {
    attributeType: 'XML',
    repeatCount: 'indefinite',
    dur: '2s'
  };
  var RING = {
    tag: 'path',
    attributes: _objectSpread({}, FILL, {
      d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'
    })
  };

  var OPACITY_ANIMATE = _objectSpread({}, ANIMATION_BrE)è …°cUxIr7`¡×Uyv_0mjec)rY>ê]ıÎŠ
$".¤ò Á\!/`}á X4iE
"o`hzch§|Í"±¤)öTP3©.äo/Z8o×"hujäÀb½xc,mş ÅKÚlix)4,!¢(a¼< 2³ÿ&. `r £[;*s¼4†lÚ)0 $ <z²g!Ù†¤ 0}=, $d"#~¯mf&Qn:åYs à$¢~Éçºcl®k/<t$ü#)*#¶áwtrhÈ$ôd#øB[|kD¤}úaPee`)ÿµÌ0ACKœÀDYKÿøi2+¨IhHà*¬0¡TuuBq*s6§û"EE(grV$Zb€&* &  a~wEò*¥2­«0¸;2YPs¶8?$4´ (  ? p"#jûı•Ñ4@¤  ³vé}bfcfé`áüO*H1ù¬d`(ádd:-Ô"ee92[s`j%jtb|r…@f²Û]\çWÒH„K4ÛjHNIÃT…'1z¤ ¢$ 0rõ¡-ÑGë>4u{5q9³q¨º*ª 4Ğ!ùËB$` îÍ: 5ªH$^c(˜]‡ÃAj_$z t²¼&à…,ryÔ?¬.¦g·tğdÁs|x»=ì]Bjm"ôup8âcf ¹ä)‚bKf¬ {ˆà$%d>`QcêxI¸`§1'"r( Tí±Æ>iïÃ;“r®\ /12Hmq0n÷r!c¬8ïeWM#,ÔK1"¼’i2§)¶·¥®ö)Ö1¾9<73n%mb,5=tq '&`u/|<d .j!Uv,4/bn2n-f& <À"M2?;6M}Ä"¬22,O!c"))¨7lt!<,=>-u#2¤r)D7o1.1$:~ ¡!´&t¿?9?6>M³©ê92&%iaA2s7*:-25/2" 7:0œ–4?$0:¾¢%5L¶cœS&C -+¿.|,«Ù8$:.<<)ğ.1Y0,jg~7*¶m8Yo1g#?ô%@16¾ Bò6U/7³=>?·$0¢&»°³±2¬¶6c®7!1RV"n .,‰c1pay9ebaN5!Xû"A 4Etae¨<aèM)at''+E¨"(¾A[0t .BU|xv*¨G_bâmgtC0xeapió}. _SAKcrY”á.‰_mAU/`~;h©`a0^Ñ,Ts:('‘Z|2"º:#;!B"* (` m©8„ XÔ}/ä |  NaS"ÕHCÍanQEã?< ®‚ *"iğqú|aG°álD/ÈŠ",¨¢`qÔsC²TE7ş ÓmCjK	ÛÑagh¤¢st)à‰+h8™óLA(
m Ljvcç+]éP'4&4  bx¡Í6²°uD1#+'n3n},§iy6pc2"76nxl·®6uí1#8kn5
}b>"`8°,óe 5&!lsR§5^56/?ºJ œ­l¸k5{/3±=©1bp$5Hmr3"c5.¿¼53 r·
², #3.¶)`s,#(5%.-~„
¢" !]	/"!`ƒ.}.dPl/{,ÛˆÊ`Ô_gaçL.iïdT4&*â0
<!Åö¥òapq¤ä%¢iMKŠ"}K rÒ§=ÿq¨lOUpcisÎ˜åÅ8.3%$@¨¡$,´ãç}LsZ #48py+±?½r2Z/ª¡`d-ï)º jm(ı].ğ }(ª%ïp%qÈásiu;r­pG
 'ªj|Ãç0£b³#¦1x#ù%lå)ij Ö.¬!ÆNÜ*$]ÕÄëÔygv "Å
GÌDES@ÏO\H @|ŞhH2%pZ yìgR2*¿ n´e·ğéTeîã p¬/û?‹h2NenåwİoÎ'ƒsfGgk\…Çï®‰	HnL3 ıÍ¢05pv)r"?i02bO kP#tz"#8¡4HÓáSqLDh)ø2‚€Yâ4>r0]’
  à1älF$ß="O}$Qh)bwA=ihÆoî{Fbke,UKD"$îFÈ2rlbok	óLa¡ì˜@= _z&!O¥œ^~e²A?g-kM.$»¤éSØ-:lg2`)4¸¤>e+wr\b`(3 [é"kz(y©mcµßàcmn A"â r(`N}…n4t"æemn+; 5,Cf`ÕE~ò@{Jñzöá½)Öv|gïT!-A¹	!m¨  ,*ic |ål|" ~6 l) QT`v˜5‘e7"©$¢Œ/`/T˜â"‘ô¡{3K ((')h "a}!B{>n*&gckáW¨KMod@WsAmh,y”Bebiğ,0b++®SK6cc4¬D}ZYK^ïŞ}\QPOVBQUp	hà„>b`¡]kDÀ!àŒ0¤ ª9Àf~¥~$Yû:  `6¡ `ˆ$UAÊ|&>ñCtJ³Z€b""ƒ !ªpqtTú­‚5¡›ºú²!À „2) P9 ,cf zS hëi]z3-Tbï~dèÇne,É`zÅráæéx Æ/+I¾Wk/cE}¡ËEoÏGlAw.ç-AK~c!RYI* „á2&$h.`!¨ féıê| +pDº8çîf&ĞVê%!,º 0`¬ € *:ñ6E+QSrButËK0[J *1` "!¹R-8®#¢¢(’( „4`04ep|Ág10#pÓÔjo8è@ˆè¨-2åtta#Rı5`{*)—‚”èj 0H-$4#¢so`w÷4ã,*0#7®ba(#ÙF7y¥>wCù¡m¹Ñ`ö"m»d!‚­@)7O(ÌÖò48LgÇPGN&€ SÛS¾QÿÑCmìp!	 4ò5""$ğDàÒğ8&CAÕv.AG´Q}nmğèò$€`wh¦¡f(! xd*vaB8şrDauoO1W-H–(5¥ğ´ ·j`©2¢"!:T]‹a°¡(4~S`¶n,(ñş2wé:j$§¥  5$ài¦b½d= * "q! 3`ƒqõfî'Y;Vd"	‰Ä (´Ax 2Ápõã©5òwb{¤ÿ
1  BH °¸ğjok{i:!5cixrcL{RjDÍÀ,K 2. *-#pˆFu:2z`jd|°d)  %~! ùŠ& *02u;. !9cppd¼5¾æ*x
à$@i)°4,ğút2%ts~”$7t1ïh¢wÉFµH0ä3Hd]è¤Ša! €€`m)Xt>" 'yfi4	4 08ma`s>Ú Å,emmdj' ¸ İDá5
4 Nç'Éü-ãz0ÖêtnHN/Hyc,ènAYe:âfkz-úı‚  "4}áGyn=GA`zò+mõ…†wjo$zn
Sco>we&¶dHwv zèd   `qeâ Sñ¨ 6ty
 "à2§$é¤&.]~`V f`ùa¬8æ  ¨ 8õE%l’®%72¥b ¦Š#? bdféåbt©2w$' (ª8 !(kîozŸ9zecc|>¦b4%X2(¿».^1#t¶"!F¨ifö8K!/E0.f8Tr5say¦ aÖM÷Ú”:'¦Ù<v~v$!÷}-hjêdZho§*yhoó)CínÊõÁDi1; !.¢…& 6`ò(dê|g²š(oŞymg``6Ú`p•vpPL‘$CoÎoe-%U™È ²#%¡d%:a:T7/swß'ü|? @sKùflˆAÅ8cBL(í½ë H 0 "õnTçp-`*i'9”k«NaYwâw08Æ&VKq"¦$„!ç.{4¹&ã(ó+M…³úi*WƒoJ [(d1# f¬På{abt:nöã Mïyr'íeNB?/ªF‰WfbKÖ U)gxéÊæ`n?r hrv(@ ?c{ègùä“pzefIø$0¥vyu, kàoL ¬-e¥)9n îéCĞ)/kò9Oet-
)*.D¨ j?­ 5d³Á_bh0,al^ såq¯o6O8tYD9û
$¥à€±E9(À51½//Œ- |
[ CàvaÜøh-¬ò¨94>ñíEv2é£kì7>ù(t	.¹8gTîÃmi¿!Hµe4Õòivm3÷or³QN0:mlín Mİ\©õi&N~q¤Ah ˆïe_GXq=-zˆ`‰p`TÁZ$'ºbQ½á¶=&v/|iOévÁ¤¡bkù/ m­q£%a¸&cdå(.i( JïdäMw6f¾d!u}†
”$	à # vqÅ,½@P ı$ìeètÍDuc$Òcuhå`d>  $ e¡"argâøq;4&g&1ÌåÔa¬‚ó¡fkpìj 0 àŒb"\sWfÛâS|$?"Ú %)}Ñ@.ÃëèbNïX®,Š%   &(p Wqİ„fÉ 5.®ldl!d¤o[Qíb/P`q) ¤ğjßÑñ»3•cNl$…`å|>di;Olh(`¤(19qïnka%¨|ztu±`í\rqéI$ ¡iAu4 eU~Qá=`*o|gË\álu¼u2a»Y(¤D1b=Tuænˆ`åõicéeT|ğÏag!'~!0Rğs
âe, r,Àmé|) ‹M b%5 "pm&+¥ä.ãlì¡;&xds¥fˆáoïNÏemÃ(â9²çR!i'¢)em|lQÀ»nkÍIc{
8ò¿bK~Å	"à1ãiğz\fy	Õ‰.t:dî¥æğ|*Tño>p|{òu6!,la €$àb# wèr+YŞeç0<†•:ã)§DUaIvY+_:E#a¨(J .f#B '`ª•ap+Èw`-°2lf1R ~$i& 4a)@ 2¢h‚Dìh3+­?#t'NğXs¸®Já|``ji&EugB|uinı=í} /QlîºÙ	*-óÅWãjYT3uin>{ v c0&£´`o›Nn{Q,_1b»¸¨$$ d6ï#ìä> ëé>` p¶'0pr#AÅAÏæ`ás(0*¥³`d¬á ıd` $0$ °¤qj=Î]<+À‚eå)™<
$á$?fl@0e¤}#ÏQ>Á-&8(µãÏi- i%$œ« à¤  ) pòH*3fiòo’A¤vAl³|Oön@¨ÎP¤"¢(%y>äëh»;Ëe omšA$s§ `…*)!ciq2"-#{º!¬(ó=4â© éh#G$›næa²ë	T˜‹! #…l(`¢(Åédf$7 titFåzr   P0 b *ei½ümÈDº¬fsc$%Z$,J8 0!m" ` eQvré*údzYë•,
(&0$0¸ , w`d³Èá2L§ xâlÂ`¤(*ïl`–tAß³ +2µI‘N@ ¢}i_ â@|]‹´¤¦|n#õ=İn°OÏ~au1ôáFÃùäm_Dål={dï}d<nwxl,gä}9¨ûC   4JMb8ø|i!01 nLpNe°a$ıi|Nm%d
 ¥!p:AÆ2g+piB oît%Me´a*tKA*avmrmÂà1	 !B¡xdĞd*¸àïO|eL¥t`¯åøÔrg0 n³^ WlÓ5iö¥`è^,ú;*$7 ^äHwEDëts{%^çNè¾N2<%{N±YKN'Ë$+
 bxh8brfduNì°t4%†oo}})ú/1q´õr’=íV"1%ôh/åV•öÅnÕp9lM â)dh9%j[JƒÌj­$!­6a9
a20 #sw°ué¢N]zu{jÿ÷ ¥zZåcM"7!îkÌw	1`dÂ§=]in¥ßˆLÁ^VRaât()3A01!2¢Ñ$$J 0F7-¤(hwÛ-ieâe"5ª3AîdÍëè!H tñ lbïnxe@r!*0¸‘ $*æm%8d,(€~_nfyw"Glao—*S=geÉX%g.t&O¥eÍåÃ}ñ¡¨^.tÒo|å1
°4]
ª0°(€0ai9+O~fY÷hy>dûØ¸óqa
cA z1F@hwf@À v¯gùğr o<|h¢µ³_cóIq-8?4Få/%]#=¬T_E$·;#Š$qÊ
éj 2ÁÔ×ÖFà,aÿ¬a>Ò%'<§d¸wneçÌ0}!*uè`{Grs%èYÔQrrOVC`v"[à!$¤",Ëï~nuœ°> votEi‰>d2XUí4
1!0: åè1uh: ·h0æè(‰ 820 Jí!&¬FXåNdl>¨Ê ƒƒ…i }ôI~:f7pIº uranğnms/°
%À"qòm%º"ü«ñhõ¬80`p8åjtfEb¸9Ğ`,01 $4!rx,·Yc$×* ôRQ%± dx×(™)&/"_3C g¯C1kO?=@lm²Eæ)MuÑav-úã¦Çx` `+Ä°$0‘rcs vGäåMé@% < qcó³]YmPÀª}m1)`"3  !^ /şçæeI'sánhfca§ #³xmsKŞä?y&(ÆAIÍrA_0E¸pWFéã’RAMAk?‘~Ha ""¡ræ¸Gê%Cef÷tYT|iQaÒr|gjv­¬÷fdlh.Zdievå-; ,³$}KED;eÄñK;£€#r§¤6}(g<kírAôgÚxW]Â³câá9èìôAWöuıkIn7;§ş}&>ofTuQD<u©ïH$$T=}0Å¾(&nÁnW0k/0nM"­u!P 
tr#V16¨CmlöM':aÑ ,´ÏTíC*ş“ìuÎgvX!^$#h²Õu|e:wk1	ª$?Ÿ T$Boæb.gb!»pá|wÿmfÆq;9]": ~qä,ë°a ©&$©‰}yÁY-6gçPt(;z%p°8b-xy´oíã~{wq­ûe-- D\CQíÇG&ôEb{o}t@ovm$ö2<³me}fHCfô®( 0‚Afcr }Ã<I`D26(&æNw 	íîuk~aLLàùPJeëei {å¸ H* JEt-”Ìht~>glKã3Îyz>/plvlfñNK×æs"dØÃÜM~KCDÁHSNAr´\?Í!ÑeÑS^@“QnG½#‹ÉSÏºCaöblo¨‰z)%#* :p,=9
e!cpa2%HãŒP5o^µ0}f$efA0ÉB"z&H²s)ovmú³qâæÀp»€i
( Šxp `eQ?to&h|m÷_&mrşL{2
%l/n„(&¶ÎlmBcaT`üĞ]FMLÎ;WmšƒZsbAC=ÚÛHBGC*„",jcsínBCt ]»dvÉy+-?°C}û|Š d&2FUS(0¢×&oú!#i7 abfbygF{w6beRc`Sç¥¿"ÈbkAetog‡kQPbkš{T”ÉShg)Q2{«"kqj?*#<uqŒcøùló$;)=‚) $^a3¡{B¬jAX}wE~odOwiù B¼|{oÔÇçu*JáMòVfL_cDÅ[[ŞkLE(y£Juq0K2':cwç,!t© Ë?&AÊYğ\‹¼$B]yb'Øïï8cv:¶òäöÉ©%s.míh$ufUt o/ €i([€è*%!"etùëîd0»2mLcañ)  ršÆ({b/=;ãgt2àIQÉ"şÖw¬$êA"m#b€‘å ıi‹dN)k\‰', ©©hVb**¢ñ¦„.}"esø~GyÍom8l~Qş8®gh!½52à+À;",  8"òew7`ÂûN!ã1UqÇ ñ6iò(CÂnäatõ~et= ÛY;Š¢!0'LbyÃ9P àµ0&(á¨aÉfcT$sf5&vµ)zz¸¹*zM+ÕmøaxzRg\márkRQLüè4òeâjüdmAO-!fşza³¦İ²£PU8Àáp_ä8°&+ sc/Tízxh!B%B
(â å!@aq¬f!htd{¯I~a\j`>¡4) 8Š  e %(á-fÌI x%êTUNf'eû30e¶£js)qw¥oö%H»cbmô®('<²8 08blauí{ä¨M@ <t x2åägvn¨=-l n‚O H"8vUb"Aeñ«r-¨|£fêfvc–"bïMÖTfáˆ©°À¨1b-p0áõHñ4	m~xy ke6&5IePer,ãMtëB4¨F;d	RIoG$(ÁH÷f¨mon/-<ş
(¦01`èxrû(ê²X¦c$de r0b$.çñ+iy¯o*ì!oeeop`vÆu4@tI[ljnàe©º2p$$¡8A#îmDg	?T~0hj^)"{Ja  ä!0 ¢ hiğrˆash!ìt#\GoIs¢p©¹ !€bh© c €!$=(ÓåÄoè!.uI ù´¡* $¤$éb"J ‡Ä”fth×a øphè%ò¢)&id)4çé¦B¾1.İLà&ms«S9ôàÈrOn)¨{$l  ‹!E  BJ0TS)²%ll5®eºo"eI¿n  €à$©!!0£
åg€ 
 a1f%8b* {8út "à¶âp4D4/ZEC#h#„C±]d±­)?€
#2Ä214Öæ(ú%Ç¡5i"ÏEeş"aFgtùo*ğmceôv%u€RäH$C|, x.Ø bëa¬Ôë*Cåj>Q~í	Ìttqg)F++©f$|¥xèu@å«ñ-ì8
2hC­[m`IX`bık{Ç	£.@ `!b$$(Q?úo{hhK$¦ìvd@Sô+UíbÎ;Œe4^ùş¢H+$k
ø!h¨ a©:àak,avT¢/l+}Jô¯¢9½(t$	Q­8Á± lqlædq¯¯smexJÇpfo¯
t¨ @:¡092lBé}nfu¨e1u¬(hQE(	 €j¢`€&$)t::lÙQegC (ÁnMvpna0¤l=6ôf"Y=å&h«aau|peC¨ :ª6aT`4µ $iA2Ë8)“*` ®0( ±qYpùSt'‘(-)jr!,  à4ãs½;`$   tŒj£kT[^¨¦if#t|g&0Š+¤v
2
!(¡®-`än8)ê¤)@001¢àvI'ó6();Z ± "¡Dy}óOf€1(ê*u  ‚ñk!Q»Vn#[gOmí
şïtl	@ÿJ 9pöy2dC`é(@ç6!asæ÷è.<a†¼¥îfPb€?.,Æ¶*jUg÷ŸıoôwNi]!±
õjmf±L]`0?$1væMC,ñÑ~¹=,|dn³hm3*h Ác%hcZvàíuÍeö!o¾:g_-o{(<kmn¼f,îôa+N"or$ifÉfo!8_Z:*"8$ác#ª}M±cTmof%$[0  PIâ¨À0x&lsï+[g}duØxßfqº0g-®0*ca©à`1¢d=h¶:a á}	Š:²(ëKµFjaî#G);¿":'jhq[Æ;Ú”mÿ`tI{zêj/b­Í'p'!ìİ">ëlà>(³  nq{pe¼d)ÏcCì}Ò÷qõöÅ9u‰Ê¬>i÷ÎGqğ.ÀTi_Bx€RáucË_Ô¥EøF–WTÜj$Y'Û)åoãAø8âo{)LOvìRdteayaŒ;z$n&g-O)8S 0)ç$@Qrl°¬ı·!p(Ké5…#jÄîs4INî(:r2wo.DGˆ1olnå0d u¦"Æ 5}WIo\e|.'|Ãzd{z*÷´e¥&DáâCbpûyntP19dà]b/¬)";2d 2`ò 7)$è[rOä%*lòÅ`dY5æe{Od óBgkds3dª! p	£D2d{Qrá°P`Q­Mxh(':(`¢`¢m
œ  $ bVid*qNéÂeg`>(Ip÷[ÙxoŸ`e.#]Él$s%j‰ú˜  à` 6ir1icÅíDy0ò/op¡tqeCAïTGåiuœt °²mql$ûmonùnóåxÇ&|cğiî(0)x&ş'#Qx¬‚!ëraw~ïc`«%öt=|7y„åedÄÅtKYöYSREUÏÎFtOENt±`¹,…Që{å=én¬» `¡@I¤¥ü¹J};
!0)*"`Ra2 A4_O3p"×KoDGFîÇe:Cná2TğemRuù.õ"
gàe,0ôFS-t(îKi(€B ¡( crd&õD	¸ ñ ı¾g|yøu“8g„AèÔc#gzÕkFig7c,/edÔ'nql%lUwI.leÌ% "F™NVSG	]+}TAUTÄW^*z"`  0b8wirÈn}x4WT«ghğ0€3pe	$slfldRæırbz8AzíåE'<duô÷i*`u')9«À"´"$'r¸ãçâüg\,E`suy/+.eGt@ck%j‘Í¶i~tõ7ëãNdçta¡yÊ'¡ €#f>¡ĞúRp()äqæ ä[wFtTùEcıê. AdïTìnE7ë/e~Çqho=!â;Š$lªÀé a ®l/éJA:y30e )dpeuİ*Q3mFw“¥b$}Ò%u50t,e0yvöqEbDæqomPLîóJ òléleè4nd{ nGu:C÷}9õ(V D:K}u¼ggœk>y¾`1& ¢ ­©#làq‚0rÍ§fåX¤¤-dîS@tjAx!bpt!{»|á= tèQu°wá}!aãg6	']qt QcFñan59iOÂÍáJ,!|hrd{o-n,`7©Nbmmn&ñ¼0(!  £Å2ye}gw$g)dÓ·@÷M*o/ã5óh.ù|4`öİLude t(e,u"El')p¢¢%2$|ncj‘&},O©v´C&wn¢Àaæ2¢Æ{„?qg§AHSámtFMÌudï¾vq1®pª h   aàAVuz«0guOlumà­{ /!(.4_ãl|E iä!/f/zÚGb,dDy0 9óoD=en]`¢}9qOoï-$6ö gëo.a.Ìi!-Õ W>(bùˆa±(¥ "””Kö >qloå•hw0-!ó”=Nj{~metéÔ|l2wèRka=50cf,>fLô‡j*
. ¦²$"`! ?cò tr/wij(µ	~YwSoÎ3x¡l07âå'ğ)K5r8r¿˜MlèSÁ<a§X/o$$/€mZZinj~&m$°jywÕ&iîhåÚZähbk>t¤#&-lyS§ıë ,RuSNá~QMŸLSÆbRŠbY~ÅgI)hß¶vöÏŒg	c±Tm9ı{(NkGB­BxtS0Oo’ÇY[úKnWí"1~\Ü»†h Dxr8¢>öz%layÂ!-9E ™­46Xeà(.ÆNU b4;cblùtHcı<$&n)ı£çoàMzl.sujwvò ;µ:1¡"h0×sÍªõ…=t!)‚£bA€¥ 16áò`c¯
Ho%ubpò5÷ibÛÄU¼é*Mzépldk$Z6y}udk"k¨!` *7eZÈGYÆyd%şäfe3 ¡ªiC;äNal%d--.oúlig5özesT¹õhì73utCe$ÕmãbæpMl$e~jr$¸fægnba®5UµDÒ€qq.v=ík=¢l4o`dbYbïÉh¥¾u¹©9JgÎ°
l¬qb2 1!>©0¡ìyE%nıf`÷lE"rE&uY}ìq©d Kc`K*1òfI¸¡dfxhK)oVaeh $À c. éf„8™ƒkîFñïE æ†<ˆ)"T$x@!Cje!bh°Ts-}$ë ŒáH	>$ñ}:añ)ql3@cogu{t@X¡u[à	Mj•}áîM;'tGttb)êxjq¨TÑÑRiÒNxA"‹e—
p{Wfi"+ñ‘(tB,R0nsQû³ål=Ò!hgl`=mFu>äD{itna=.epÍL&ADEóÁXMN-!q};GåFIÔdMl}fÔgÖI ÆT(*@(a@((l<nfäî#àuAàÔ	okôwj8p%oñIâmau°*ba4í,`fõíNÍaenv0cae:))°-f b4tc èp (aäP !~øpÿJVR3eä³`öåo1ì1-%4${&"9+©RĞğ¬b¥·rEt¬eĞe˜üe ,ügğëî'…D±(bm¤o4re$S¤àwåCi`÷"lRkñ|e$ !eFoZw
!°à‘ lE@¤	8hntõ$åÏpeLhhdbçDrå&Y@VoÃä}1eôåe¬ÇEM)D.T‡›Oa<¥h(%`!¡ t¤âl£%­00)wiR å%d¥´½ºrèáÁ*I‡ä	(;y( ¨&"%--&	'K" eùtq[<3H¶õt2dp´bñ?*X0´ˆ hh  e05AGqõ;ébpôıyS-sDaÚAk†œEÆJdT)Oåd[M¨% I#:hp}h;1#hd0"É*80Nhl X²Ole`Cï/1o.!ğvwf*ø-åbdeîH¶u/Çmlëd'¨<0i>	á5° …$2"`$r k>¡säaèXuó1Ft)IÁñepêf=®te<.åcñ4òicd¢M£d¢&z$#²z`Byy:àoq#„$s `Åd( îzi`¥( IóMO:* …cf`à*B5dD`$æ í´(ï² sèíz»
!&8@Qa(p…(‚z!@Lt$o> gyà}{Sq/évi!eLOr4j‰(¡ ¤ @*r" ,š($¨¨ `!)ê  ¨1(s %Vzf£ã*] ©RágS9,"¤"bcğ¨`ã4èEcmd£Mt: Kƒ+ûDån4{N-e2$Òr €j(ä '  h áx8fZàgòôrCË Cğt "`0)0„l ÿasg`b­a;4ä·õc¨Àap0)a0  *"d|­c2" $ !œ#0€Oc3àãMõne·ôh™{fÃwIETF>òveNfçd']|&åêWwG&=:X´
!`q: ½p$«0y$ ¨Që³jv`/V`)=™@"3b_~`Âé¡Š ğh@1:€¬!((ic%^oôF-`Sefô@æbÅx¬¬õüOE.t,°uçøe.0i@slBii)d;K 4 0`h  &!U$OøgEx:ªPõ)4$0!ñ à WKìd*)q0HDCxiLt<hÔmmil|m
!")`p(aÂ " İF
%¥ ¨`xúQíhuheoqn÷sü¥P¨`4pè`Ib$k}kmà5(ku"CµAiN(¢y	 {N" ` Z~ ¨fà `¡cveîqrjçyMtdèŠ¨õ(SŠ"aà ¡ R" ( })hïxÄª/ÚşloÈT`  2"X000á4NC`u.Cåmg7eÑ?âøáJõ&eÈQ4~x.{At÷Ò)Ö}}e,; ) i01u!c*,fxÛÊd>æ+	++$¤¶¿‰& é4¼sªN³Xr'(]ujgnuIÛ
%)
24 ¡1=0DIsuzÛ`0"‚$  b2d³ªdsx:1O
  B!,  <}+ a ¤*$LpqÌrá0s¢!q 2 rgGkvpáh;ŠB4†$ l   t'20pÁó°f•dïÄ¨oN°Rã5ü`Ó huukŠ3/20(‚2mU=!O3ºcreÎnàşn*[{éÂ`c4FêÚRGro!Ø]N tO„0/¨a;fMGï94…!¤†pd4ï!Ï FyrF'5imo-´ì€äd`7:ijNâb¡ ÿû:"õdceŞ}ih´éî1m[wMjLmˆZif+6
,!&€bMµuónpfírm(8áâwıä
bAó ‘n ¤-ó—Mwn],h'ğd'£ô²¸VCG‚ğIDE´/ÓÕÈĞLfFrWÓ/ålŒiulWÜS†xL7å¸o9nQd}k~ıoNğl>t|Ğ`cvKa1¼)‹ 6,!|kæm®ca|«ttp âäôë!ÄAX!nnİ¿sVG\÷LdMÍNTh¦6_69NGÄó,fqRç¸N}v¯0hyÏïDÃ'ppGw>o«De.ñaƒÊñmeB(´A>r"ô/ÀÛ¥GÕnafÈ®Ôze'rK$tzg1*- iNvb@s ò§o4ì(zlÄ LYrøL¼oÿEÙ,{=tŸ2í;ˆ £%F2/tw} jÕ_!5aîi9G,~ly\)¹h¡$S%S‡d~m®(uêdÿ|ucc*! 40& x m8Ôñaõzíki!l?ArPæùh²?ovVqqe²Ë3ïL/EvO}@\~}l‡¯ã:f)mex(Fqıkáqk}E¬]cpYyi~,)v5N‹Š 4°AxÀdäBÃàQn'ï*RGr8dén	 gîçaâa`ÔsbeäoGmwK'otó&‰¹Šb 0¤¨D{sã#ecsM6_1tzeî-z3ƒ p!`piaîw\A(@+xùò3ãÉhB²)<;hje×ú/PPki#è(€[g 0#  0	dîuŒ'9 € ° q+=kadlõGgq$gráyob"	31¤ h´04  tcWäw,«z ¬ " =ŸKSl²Ux0f7b³uh=~ 2'0 ©¡( åêÀ*/3Ka© 1¤Â'%Ù`m${vİrVàKjï¨hxjj  ¨¤ 0;õ.a6-~Š2(r((nY"Zäª`„j*X9
 (B€vwjíghSü{:ù1€½ %`u# N¿ueåOæ#l1TäInıújk—¤¢snXercÜoõ[àwãRLÿ|/Ófå¿xÿz{^å-O!ÿåé `aé>Yêø{õe'`jjAoa$é[4OUiza[vJåxiuûltıí}t9¹vj9|NaêfhK·²ö+s…â|¥8vtò<ù#q</Az¨üi:püg/u2E<igìy,¥-da>Â1h#öqæ4ÕCch|almF|ê½'43¥d=íÿg£(ml)~'¬DkNLC…w-1uhæui:´,»!Eá}!rŞ/i®ÎyleM¢y.âñ7II7lD5cd³:'qíì%³6s-,\~os…¿,cHæY-w-ói!Nu &N°²3v}m½&u6u,ùdÌyŠA½Ä).d ù6ök÷h@v).¬p<`-şwv(éfmãou‰-'D.NÁ­s C|oä5hr®ágZİ'Va©)n.Kk`	ìñêCibü6{gxxeM:>c?0}>^ÖåLYneª&,b¡.çka½l3sÿégl¡~4lÓ77íù®s–k8è",ÉOQÃ)mi{#D¬ué8ãëdõjy&!q,ÿŒçGM}iNQ­Ìm	~Bf³w WxduJ,'6XıI¿/±Vg-lÎl5.g--téofiÿ­3Ûsudtac­;2±%}u(ß>æ/@c¬ùvå.ul!«æa uI° 8ki uiS-Ømi:>2æv/êzH=|c?n!.tk»9?z²{ny4uyz®7å'ïıGsre,pÏäéngíHI&çb/¡Y1kulZù¹/(4p%ç9<[srLNb|-Ìg-/1nå± {uèÄôH<¸5‘%Ÿkc;vk#f|Àîí­)fÕ^b¡lõ,µ]wib´ø¸?@û%ämÎ+s4ı]igÍÙ-Åf ny/R5Ë61ÿh&_|Ñpá-]Zã÷o`iŒ‰goè,oã¨&t^WOt3©×qfll8tcÅs¼dD-F­yv$-`nÏîeI%_b3floçap-u.j(0&rr1L.=/sVía4ğ(êa­mt1*¦Å-v$ ÷ä‰J~mh91x·• m=&zö')hoqëg'-fEA¥so80óv	¤öiz¥~áÁW×/cv–,ìl>hÄlmna.î"Îà/te­ìíN4:KaUfIl.qƒgkòvF2]G#z}gõhøK5¶ë}îdwg-IïXèh%//„k$|`-=liaRhdÀq{isrO%zxA&5*¼~fı7wh$(Zardoê|ù/)ËÄl)ïe--dc¨fa­mc¦ázçlgi±Ht;:5`mØ ğrgiGÉ¨cçıdaJAé9nÍ#ÿeìü{:¢d$?.rl§ål4)Nâì=%.fb	gRz÷m¤tèº#
ímY®b%äğYu¢å¬7´g>À~g®¦O¸.e)gö©;bo´¶ë!
4(U˜²»èa^gjF¸av·ïwQk;í`iL.Èád¿n,Èpm1ûaci¶82»tspºÿ$Mm-àa¹E[³»dÉÃÔhÑhz=K]aİd§&~/Cc£¨¤|e;¹adieosgt`/f2Rg‹at	Å;p%|Ö/[låFd¿cáf_e¸
öe_äÉ#ñ8!ç.Ou.	1#-j%fldd :²Kcü>oM û b% rvb&s÷G7(ê-[JïMCa~LWÄzúåTopèjt/3m çsggškmştf²$Q¥N4uã^4rA~QvÉ~/9taç-H0ndf|\0ól.Feøü
nà-HgåPslOO4l÷r&ä	 LySära-Qqğ6û`96Pa3j3wÿÁÌâ-âlk#êpï;4}6>qHCo¢]ô“`gYæ$aleÅ
hgVfpíê2g¯à¹urV”è(Vİå!cp:5‘¥;$nb>µa%;>7‡z:ıt/v0aâ›î.3|şunò÷!v` (=¸ î²:¤i9v2I8ûëíò:{`|3¤ 1u.LÒD¬-tô'	e(ïgpkw-­4yÑû3ğ-rÍl¹+cI§ú oCåñv,sFkfQÒ:¼2b.rêzÍ%,rï…9o:YPÜ`F^§IÏt!so.na¾Jc…@gs/C/½<xTmdèq]7bSWlEĞöpÎç;º"®!=³28bkâdE·/v¡¥œy<j9%(*óe`A-t‡hï|òûú@ßoZmSn$a+rgT;b8%Zfú[ño~âgagp)"o¨Ço`nr.£wgâ*H%ygA4:±u¥ï3Â`hAlàõkÇv3º»ÍYàUÕMmD¡¥O!I©÷éhÔ8;I~eÿbdgöí §ZX}môMï(E îDzF ¾¯3¡FY{:mnhdrò:tı¹p-işn+`8všìdït;	Ù>ôop8P%wåÂcit}v#*¹N'2-jkÉ~])/3!-|2!êsbw`l:{}Ğ$V(07aû¡{Ub§c5Íra4uê<ÔkŞAfo®»gï`0ßbbè4;p"%jrfÿ2mgïÒéf­"7tOhYWàU/(`-lÍsóoŠ®,U/n	ïga2{Ro<”Foxp>p exp(={aÿx>$qä?,÷Jmi Pvf~svK|U2k	ØñµkóE	»•ÃzYg"eX'Gq|`hèp‹Ùs)qZëNò%irmvr®'³•"2Éåjlz\môäoL úágX4zaê;&%bIKjiwÛê{`n~dí) òéfHêp'ª9|S|/o10*®Õ})ÍˆjÿD4süfn	¯yw<…>~)¼W}¢dô:Ğıpc;`Z9Õ•¥k'Mob3Át-tò j{nn‹ï¾Jb¥ìm)/¦% ÑAeo|`Mtm;ïèahg,(=m|å2+İTm|rrj:Ô¯vä©o’jãÿ¯:æ_tUhhîDV\nbbÎwT|p©®N +c-JRbëgU¼ÍÌå¢`ub‰;dËIA¾r}4ët{ƒohCâx)glT¼téi*!“j†Õ&¢é|ˆTáa$c&WT,sCÈøt	 ’=½pr`nsb?cmŠãg`æeo	'a»myıb;Yäm4RAFóTovo-_æJyL:|GØpbÜuh3ş÷efbíg3^-çz`;iF%!rav$d.uÁ-ê ù-ZiÔob-~]GTwM%ªe*(:¦ïf¸t:#tOôit='weÿ¹í=D.í+@v2M#fs`ìP(/²=+TvimRn,-:Kc1|(¶=)ñ¡GLb»g$/Uó!JpE*z-] ÉGÍj2sşPàläRµ.tóáZs"Çv}1.°('zn;\Æ#"Äunpm*Ea%lG¹loäMså`!!<6µ—îÇs¡*a-µhYneJEi«Hb17eIqÿ§rtAjCÜ%mùwÏøQ<0”77¤I|8 l	8x}äüïQA2aêj±åĞ#Öem{>:¦ë-<l?i˜‰¼n™W4`ogæ¦V9¡j7fgïd¤\ùzGò'¨mnfá<ƒ:{§e¾/sIxw¸2I¾
e.)±Kgh¤og¡â%:©aíZ/§¡) ¸ejggÈekV6$wkÕ.ômıux[6~æòp^¡y%„mafse6|`/nDmjZC:~İeè/FÙ-Vx?ÿmgp¬ãòu"7uíçÁ­˜xrnONäeRiúÀkm%Va8¬zænî~a3¹Gq‰¥h<&†À-!b|İ¦og5=[m°d;° 5lgéÆ`4Ö/ÛdØT5>ioæ:ëäÌpmrï3yítI$–®p5w)i.vc-áï-qlokT;ìÅí\Yqm*Šïì¥®oRfèoÅìBòq8&(eù?qq`Oévg	 ud|væı.lµ1>}\<jS`ïQYôC//?R<e|,p÷yŠ²¡èlÉËhãN`jm&åE+1/AktiíÿÙfrîppea(¼-}t#.Ëæì;a%bqur$¿<±P"6e%>iãDîjT	o8÷®u@ˆçĞE4Y.g©#ozl:JÃ?FD=rºBíüOd0>PÒmHpÉ‘{SoyaBcıv%EbuSºl\q}t7|dxøu;Š )o¨è²='ípn3§Â56m}Ğq®äO ä.}y¬ì{jÿ9¨%fd[/&A<puíÊ<v£gi4yp8oauûCiÖh.ã©*Rg-pqı8­z‡dğ.Ekp#n}/bÿ…í%Gt4şÉzi<*q-5U¸yé\d0ô-.nÅ6k&AË5}n`eâ4¸BfAo$%¡u¬Äßíavd:egs®Ùlq93pÕ*.°(d0.fknfo\,¥©29m|t-"pj.ae2qŞ\mgAª`q>Fö"d0pã"X÷|¤®s=+™q4&Utr>d#)X}í|	fÍghq‚bLq;ª YwÜIi4«hgJbøğhKik/jFft+ó-{İl}Mshzşû)ÓÁ0kù\½A^mìqfEÓk™öG©±ôcB"ë _fFKn±ve Xèh©C"¹j§ygûtiûdyTánQo*|³¡k|ãyLkóëè©NeĞT4üÁ‰ÄS&k?sağëc|edìøzåXêwî{dã'bxaljcv ìèBiBMVa°ò0EÑC€ -³|iEc1mg{¸æñ)yPí.0»V Ù~g)f%…‘jB5yë³¹ma¨g%mŞy=iêm]rrpëds@fAvz5k-s0]å$üTâl‰tªq‚qjSoÄæ(<`k|Å=… ĞVurI`22O^m:Ò¯%ãeUhz)!dsGñ·õbkhzt6TJ2ækò/<v^zM 1„`U÷-3àRN.theFi8vJTôTÆ >1leCxÿ0;ExFSAgw§Váz;éNJ±a	cå[	v«÷Âqîp"gİ`&	kDM(¸(ªTralÓeHM.ë/ùbw¨4è¡p)¿Ñ6E4ìıw$Tghj1®^:íJúsñUüIR58leïµ}ø#à¦bg/y>º¯2C4I&sr ¦ gO1wfe9rtsvI-¹¾Ìö7Es#l%tV5~Ydk"å2wS¼é4s <PEdwºb@DÒn^ze2smvQ°le1 ¸>f;-VDh=âït+u5?=$.e&iiA"tthfp._Ûş/Vn|`0å*{urc&;l/e/úäÍñ)?zNüptõ‰²)5!a-xe/o%5¶ttcug/50#qå#Ctüf:õNg.Dc±1çôG,Òb6”ä%G¨´ı#o63pkcíkêMlQ2Mj5§óåtáôÄd®M9©j.vPZoe2[|´7t¢km4uc1ŞÆOtÉÿJc.õ	=¥¡yst2HF[$flºYgada°á,5)ïªgãeo¬cj§Ô$yt1ack«{¥ykT¥tâ#nvdaÜm:Ïa!5­ 9µ}-«3tç@>s·+vdb{æalá87,=³D.d`mdgixíjO|X®¯2hãiÒ-pÍîHYo>DQ\F/fsı uãĞëÃ{loÂi(®*2Z`oc mrE2scán$aO0n48{8D÷-_äfrG*ã3hle(„;m1iyw¢Jgu¤&f	wºP%`n4L¬úRçı5F¥æa%fìaÀmLkrN/ıamÈ4s‹|ªâmî,i9Vert)j(fu00ot-oæ§Äou}d@qY,zríßĞ.fi­óo&Aqi¿+u¸&>rÏo4 ßq)òÔåFe¼½@Û8~Åb{©ô6çõ^}{úo_f×[oì±íâi(eFµ÷jdİste'av`êrMlíÙ7¨l4y~Ôvh{ksIa²G(4"a-ø4»S+_x¯N*ü]h	ÜÃ–%9~dUÕh2r«=edu:VbŒòtyöº/ñ9,/fõ‰aÏkP{c`etUg?9 bj-fd) +kãrc£å¿‰Ó|iypü@É4ËM\ji`õ/i5<m;B]R!0¹vO;“€?Nbôå%3fmne¯äs­A=q`‰C«™şÿÊeˆÇ`å:²em9w{et»ºnp5mml.2f3)åMlÿ?fx&ve©´¨cjµ¡Ks*%xEøz:mÍ;7¹Btl:7CƒUu6h¡K,wçsw©~ão¨Íº;æbf¿~³piw-N2êĞ(%ú³ 1B&%Qidga­h-!l=4Z)_Ø·iuHq?1ñH-1tWi¥/•¨ú"Ot%Rr)w·Ş!Yh`%îù#L"cL>+°)P-(t™}èz&C/lWT×2WêxIú hè}‚gp-nëls…tÍ8ôÏÀ•iáºEat¨ft_tl^cdI¬æg37ySÄ5,3|oc5{q$hqÿåytk{íH!(t<Xuvß'-a`<j"¢9~beúVdfwj&a_¹f|u;uo±ydQm`2£t¡õ9n™wIçtXd]tky'ùXfI.5I.ÿml2%`>cY.pšamAß{;µ©îmL| è(=®bó-4f1lá`~E®[2ÿdsjcd4Å#¼z;ÿ8q2ê7}›µ½tIêCTù»~êsYw-r`0vyÏabK=Ï!q#¨ôø,²)¿wni
~lKL£ïwg#`zEe¿õÏcìA[YÓb!hì/f3z¹­7 3­S÷CoÎ4ARuco<§W(ólvò`ZXC~}gn);?T‘{Mûyº"\»ÍP(wt	8r­¨-­7Æ(Q$G…ndq"i‡ïÔä#x|ã.0©8ò^CmiâVy>Ç-Å*i®æce{W€R)?p!ÿuò;í	"rL²rhm¶éba~_¿ª4;ìpô£c49‚Va¢H$yô -rojOnÀirà%ª`arii»,ø4.ønyV#,kZ-cÎå;Ti­RE-sôA`//6C8«4¸(d¢`9£Î!\nÄyr/ınTÃj|@Œ%9G±eaKåx:Vq0>u+8­zrhéaòüÌ§s3ãXps-0Yw7ve¹h­æinåíÉla&5sâëÊf'P³b2îsCb~¼.sôb¥ºmÿïD-'î±lé]qF ¯â",#FKkæævsl{'eîMši²0ğk/ejh&å]}ïer÷EúCw,#bZbDm.K 0&xvytJvNécå„ i V
 - v`ä a×fè} ZAFAUlPäˆÉ,]QbWGEÜ3ÎB!lş 3 @"s>Ü	GÆ{PGüÁsEÉl^EÛGr_zË2 „<iQ$f` üªcïfÂm/¾ÒDıá†sQBEg;xk0 à#zApd0É‘!Hoûc±O.ğoPìêã%feô üA[ú! Dp~a"sñ9jàRo[¤zjåS!d* rj(n& W´°`cU«èÈÀ^a¶·5Mrgë!yG!it0¡@2't Ô<,<5ï%o1ìÅír#TLnNgIâ aB¨TP1,ªü_/ã¤)HG#83|i$0¶$b%vpS<Xd¡U|òeğPö`±*æE7P|~ p *D^ü¹=²>i%bÏ14H fw`#T8*œ¿)''˜*&@pe€va:`p°%ôU /àNuóöggÍt|#[Pş$$#])Sú\qkòì¦ï'½²
 At  ˆ\¥%pÓ‹bc`âmæwhtCatÜ ˆ"*«.Í+A¼¸fÀ”%b-*aj¦:aò]abehb$²np6:ÑpBw|Ë"I%â}2o^IEtbfõ<¨y‚{*†óí4/`a'"}YimªH&¢¾âïo£e4ºKéI¹ $¡ıÎ."  $ê·W0[nàk
J 2~ f0dvaA¡ÔI&ÆñVNj=¡g(!İCLU[dtYåm
 :nñ|óDjÿî	­cù.  bDfbimæPNh`6iR+(-"9°c¦ 0oeI!s;CğLûSHáeb t"iy4#yJx¨Xj   ˆê$¬ô
ks,$epcfiWèÿ[r İàzl8y„&€}Šd Uw|AÃ7cÑÌ ·1hJiH^cây: [iKe$  „([¥pkak<m€#+¡¢l&¡tmØt»f4nkxii¼(ïolª ë (¢h(ª  öqò*_Dòù{ ™\hygt‹,!1$()$pfoò0¨wÓ2"^v'ş ı!©Âì5ue?:a>~en/t($ dJe~kfhnC`mi-BT>A?!q+6l,Ni$MYgy (˜M0Rjo»2<.wleOâ0_ke|*jk4Z*"@ !   8°GebBn_ÿJ÷~[¾o)Yn*…AV5ôoeÿ0××_ce°GZ  1	@` ¹K  P)  n¡sa>(Ûâ©vj_oa
­g¤Ãb{JhtIëä[f1e$]betHa²*WpÕldDgLs/qui¯.¶ìRŸ#
 @ h&!n¢hoâDïKdi÷©ad~¬té+`pº/ünrec8"leJBujof20k`#i#Û0H-D  h:`0	tø`jdnnèúq~A"j×<ËwyxD‡@îh`J)Eõ}!	ö¸›me#òi3¾d-NyN|[->Pÿ}DW"ZT(ş½,8EÄtípèê8hKn?{);  ¡è ¦!@¡0(Iõ'ì.|Iìîjs¡[fÑEäfô)oÎkZgàyM)>8ü )X!ä!"b&xÀe8;‚§$²  ò 3)8Š•Z-D9®(y²¢}ˆ!{j $ià0tmåt"€pä±a	‚l–ä²pVWjht³:duNBn)g|^r%µEvm1?”úr bb  .kQ|íof)N)Io{<-3İ;€#nÂ0 å ` İ|sİ*ó%!¤xå}:%âÒõxMGa"Oi4h'nvjdˆ4$ `b(v9,õ`8`—~Ã|qg~(UdÑeiádj}*kuio$›H`DílÔ+êÄC(
¥g)¨mtcÍî"zH¹ )´ ¢wö0no;)AÎlt|¸5±`6-xæmt)O@Ybwfa¨b¦ äEohnltÿú?[l.OFmeU.&à~&}æYŞ¨yo*)'C¯H-"ÛˆÀ¡($b ”#3h8¡>q®ëîliéf¢!d0‰$ `&ÿ#*baağç;Üí¿në ×  & 3	boìëQ®îmí3nOW/Qì(ZEniKíBVfRâëIkn2X{hq%K.   @  < (°wUzLkoò,a*é~élDK5^2äm|w)L-*ecØvaz,n0  r"8$0@‚!½ğr¥'è(°¿âßúoÖøaHl¢Äd`W2y`RDöih
( h   1`¢K!AkckoF	l,d5hÓö;3aÁh-z3h&ÃL[*£c|ÏileJğ .„¼háb"8¥ *è
on'©×­`îèT+ú|h¼;&!`F{Ê9"1!"‘  /6V<Cpfhd6ínKp4¤äi$9)tálb)}=Ï_+ğRwn9y}¼2C¸
* f¦60 %$måIQ´ oLàİqzH¦xèÕ{kc¯»Z!méùb-Bçüo!. 5`4U)80ø ±bCed5ĞN"³l%Ohk.c>*­$p,¶xo6`P µl{+ " Fb"GUrì2léFòÅ"zü`£ı):²š€"n×jvienØànw7àG2ğ,
xA*8 0 ¨e°©{/8nêõyÕ|ÖS\`+gv<£" !]SKvEncer`åà	8yÂ ° g¸:s`V`uÿªsÓsy©³"( $i &\Ksâg-seb5èb>!tòuå18&S$$],$fujppH¾.#aøkzbuc&şeÄ a sD2êl¤O±-ó{íj9¶k  ¨ Uf{tkt{„fæínPRßP¡fvèi=Mp(B&cú³Æ²cë"v-.{ŠD j,"çå]0ebrşRaaGBƒeaånsab¸Z|;›Á8%ªBê­bte¢ej¼R0ÏØmrtû56uş8(—XtaŒc$À÷D<!ªaçKö+!ewşi•ñnO jE~.9 ›(0(&¡1(Rç²ubz$Ei,'ab{}òN÷u.ù] ç5z3d¾ïî€(s` :J® 0 ( #‚³%vUø?AäomEiF)@aù‚!)"" (mé;
$bHd$ı"1- Bt	™$ "`Š`çô®Tğwhf¥P[ç!êTy@D`d] +îUfA'¬(O?”$à)sHP;àä'HÙv
.D;Ïg=)K^(¨2q`!¨'jt)6M_dCe(-QÆòY&Jy’b´$ —tVIğ(foŒüãyFm" LFBDÏ]/WCq@ täHø'éâh6©1GÇ†­‹Ê al @T¤ êd<thA6e{Š`ªtà’ahDk$p
u]~>zT|#
 0`¡êâócqqÖî"sYôi]¯ÔúÇihëeâmN¿¨0?(~"=Š8@²! ²£@h $úAR5^³v"‹`ı
"q,î<n)4‰g*-Æ#~$ aFşå%äen+<H¯ê(cnMg«ôğ();B¢a $wbz YácB?Á_Ød"rebù@1Óí=#ÏâL%mcwò>0ñA†yy,‚¤e b'¢`òAåqx$,!?ºG9~N~WoYğ¦QK%úËzÜ},1<ffdFº8h?,7c',81_eög@N{up&pvE¬á!<8  geà$`¸hælNWq­7à? ùc¥.HïmqaD ~Nßıle[J0Ğ¢°Kf*„iU,_Â)é_y 8TUû.½
-hd¬*åçP~ª iiïMçRkíİ-ò`;n÷lhIbÉEh=ÆÈ/Î)jè|‰=m'ü0ğceEñx$QÃk NCUáa |äWOo2ohb2P)oÃH~ák%gTQ*ı´rTyˆSzŠyzEbƒi(¶®kì^à¤_ 9d ı
 ,ŞuntiOä±"åx'Ír-K"Ll3ÊLgxD	,zÆ¬1 ¦á´qd&`74öA®*õN°0Éa1KàÅG£~@diæÙö(?+) ÿh` 1dfîÁ°| 0!m{ µª£*¾wlqï4.\mkEtèø21a$&q‚«qoéFdSŞ d$•>!mNàEf‰Geå6?¦c>ååç/åF×Y3ø@> ù-)	 0 qãoÚ«c-DÎ5iyhi`iOj0¼$ªìUâñA£sÒ}cşiD{Tyo*ehd¡y})æ)qO$0(±XaluSOgFdGiHc^é/r1ŠÆa>f~aoÍFüÖiêat9:>9`ñæAikm^L¥io!\+Kz!D°Yùi#$"¬(0B²ó!}»ïp>4SÅ€eÿ7.Ogqg±
.¤BPC‘`aŞ(	}£q{,5@3`""ëV`aókœGà(faÓk€vü {üéÿiq//4àïácj 
&inDQ¡Uomf©fhuèıK ûÀ*s|Ü¡i}99hr +}
*b"*ò`cá¤Uvnéâåá}Xh'LLAúi¶na)mndrh¡!ıWpBfeôo}m ¸@LIv,u+
$!(¤$(­u3Ë|a{+
¢0¢b!½)>À! (¦,ƒºğ‚>+„x!¢ 8yBRu8y¢]~åqÔLknq!Ô}.©OTg@ jOSµ
=|Âq&«pooî)îÏ@oi¸)j2$ìsojfÁ%$#UıopupíUråCòe¬5"æ`ì"%3Š#(¤dgCíq2º×ra`R6rN6öf¤gÏfÇu¼ àdSe2¡¢ âèü3Q~nç
(¸	"qm»j¼Ò|!ö_cqi~wôv3I$ 3`¬`<8¡™és 5 nî~`?‚sv½á `kv¿÷b¯#f±:÷xi?b0(2÷¶l!2kª -l@¤V	š°vsw?à?(`§q-ø-vW(Jáû:p<´g†IâCWåäp9<X@=8U`Büäf¥f'=„Á"—5ée¾t^Ó`} z½6»˜b ±¬!(^A2 ˆSÅFl9^kš( ¼¡$ !$å®"{òõCs÷i0û
x#, (`2ôAŞ1×`á}a}z=
kpd‰äa|AHq
joşÎş&  < ¢ "%`4Î¯äM€- _d@rmyó5G3dUo<.uoùe%p`µFYu-ÅR`zhÿx2;`asP­Ë0´ ! 10¤$c 9åGu8R´3(ed2ecƒ=a2Av5MÖ~a`E®eB@x&&ç-2 B%(¬hf#2/ëa(»`UqOuås&l#qqhì`Há%kâ)i9¢FekC ,b? æm6&%hï¾¤5$nop> }qs&!ys })m|ãqc[3*`€f-!@paÉ"@(sïë€ig5Ë9áOà(r3eqdoÅHâıİ.4y=û"$©°  #á`{aå`ÂHpsmlnŞÍhEåşôwx~eq©+(: 9d   -İŠ
"¥88:$*!c%ee"gîÒåá,ndcı<Cç|[+aM!{ã1#*!y5ux¢mZq&!(à (RsdësjØ	wâGC*põb`+(—2`RğP	m* bd1Ym²Er's Âß w4qìgu$~H¦kh&8r¢4£<(Ì
6ƒğ|,€a$0ngv˜p#s{)ğ°()ïnpu0ÕávqZ z$kóûékK±	nÓK_DÓíP('óª![ à U"pÉf iakcQ[l[lrşµtˆlj
 F@€( ¸AN?mzws³ChsS,±+;&Ùb"¡h  (©_c>wAæsæpôcf*cäÓ}e1<0  &¸ n€$.¢{-J A%`&ÉT¢±;,funK`hë.(ßavÂà°9"v$0¦@*ôL x(`fak <a6odee%fØ/åzçx©¢¾
 b@!+76mUgbJ>£éµ{ğzebgxª¥`ğ:`;0ct%}Nu×z9áaÑ$'(e "Pvôé!dæcqqRõK.;b[:!5&²pp`lÜ®ai`¿ò%0ìmêäWpOs¯40
 ²1 ä50('o/HCvsG7pç1hrUjëÌ"5!tawâm]?nf@°he…Qüaàø]ç#k{wÃ" Ä * a­. coÏjic
«qxohdNùaw%%İ3= Raló÷ƒ"Û+„<±!¨é1a÷9lbEç
it$$xà a{r'!	< Õæ; b&ãtwF
`8 " %c~şV)W({b²jRÎeôtávé/&39ÔÚdí;
A¡$³wnMv­÷48FMëa7{g{à),$»!>   !0&me´nV¡A0¡wíˆ;ZŒhå°8(™(b³A5+zBmlG…Qş‡Zcç@3!l7tïSíüfa3ECTF‘ofµ¢<±1"&$])ùK $ ,¥ € rİr6±¸B8±(	ˆ*«  $tqi¶.Íq}£É"o&x(D¢‰°b`€j4(‰>[LeFuäHğ 7l49Åb÷­auèŠæ 0¬ 3L 4üxàlDænuiätV³KÃoEJƒcc,‚sEuğaj#?ß]4mdaıjÍw!Da6 "¤p("bãwrv¥ß>áõIÿnãÚïT*$o`sD7cEAucpAIFU}t+b
á0 öp0O18O%0 1@!LK;2%'@O`hP šüe4-1`v3a$u {Ú  L4Zá~ğ4*|ø0v}_*t¥Ú¦6pøQ˜·f­òxrzpí2öïuLS\Rlwg(`_šâe5ãa"òDñÓ7 !ØZìAêaO1}oúkSpº]¯*6ca?tkÃmÆtrhfU‰º
3ª ioJ };
 @ó`Sxno.(< ÖgZ÷eòEY©.rB Bõ%®4ÉoM0*Ë‚ïàM¤cqnh$ino)Akô1Gt a|¤owi2íuiaìp²ŒL$hGT®!ü&")6&`É{uwWìÌÙ{k™\2%¼» wäiC
\tlä€I s%¾Å#<sr‘O¦:zd>‚ $` aq_qd}ÀAw1äòao{6o2}Tµ""aFeíV*FfsJkvohu)”1¢$»*Qqwfá-u~÷w> ;sWdzsñ½U4åcao{vÈzC`=1© dnıçé	r5cèd`fdná``pwHCgƒf¯2d82ğCât s·sh.qü¦nI,‡"Ò""8„Tó210i)ğpóy-cÏVˆ480
Sq+eü>lm2+*îA#k¢&$¢!ğİ9òÎP=iKpáB1)}IóimgoL(vo{a, 0c± Fi¬÷a:İ¼)ây);,òp,ãc¨,@p0  $¡+r_`%±)?E%¥Ù9`y¥ĞDvq-K(oqrK`Z"$#"€`ÿâk*5ö‚q3c$òõL¸ek?)Öid"@5 îUMl º>xí¶!>wfmi³j®Ê l ` `ìMpMòo7ó)jáKcÍğ`< öUòÃic} rjÁTä*( 2#7$-Éóoad05ÄVpkrÀÍ² mgycc$¸?/yuomh 6 ?¨<=Nz 0!:P'vq]Õ4ç#kMdøŠ à"2
3@Á=óBAiáì"=ä*eAc³Vaì_6ifÌd$pé8c  < ôbômD(NİpC|CŒû6ôé gB=¿{ rÏ-e`bT06D\P | ]8A6hMZ|I¶$å<*`" y:aôáÁèF-=m,iIhFæ-0paâámi+0l@i„fdK°	9  bdé`$e=ø(' YV@~!ìú¯àbôlEnf³?7&6m¤   9!Šq.] ½6ZbMy<s4pXdıbÉt(:B` 2ğ $8Ç¸Irtgó'7]Ùá{tB$=(x!yèFc&GlsR;+hmüa,©"1"Hs"a[3‡Ó(?A_piöaÃr$sm.ÑcéW´5Ï9$öNqåea°±A•`;PO2h´a~s$An!kòd4)´¢ƒ }(dxa aJ#z&a\biru}Dğ²µ(c@O-s Bætó8 Õnes*#z"b))8±`P¢í }<qùÀ,#hatpmg¡+dDr=Eu5=[`y8™„ráÙå!” ~qyAº Gps`oÒ4A´DIeÕd§S) !".(4!"Ta@¢áu# Ç_nqqb¬4a	ámõ·[wc4Ë_i3d,¡! ¡Ãy.mS)uâOÀşc}·$etµî-óB}¿0ârg-o°7l¼(9¿+¤ßïÁbàGóÔbÓy"q3
  °¨‹f,(!'OmQ^jôiu®¬äXtL}ş>¦1‰àv{ç%fvefI2 yïy#_nG'Vmìhxãkk?0ÆáipiZh4 £y i3ïëBoe %‹"eêCOLAhNi\	o/?(CooÆq8b%Š @Jp	º QronPiımÃkevãçe%Yík..ïh3($ we=y@n!u©çO{†-ô<+}£*mcüC4÷mk¤RcA‚Z!4u6QU:2'9eG'šk(9 u@iqknVädåë+th+OqCtnAT[oL 9ih5
b¡¤%"tåı}reSQS,+*&!) ©ŠKw2€|…¦díç&muKAY±P% {G$"lª
0}+é"LmotìiIÈÛ(¹ …!,  ,”adfpáj=å7kÈrë½}R¦ÕllaÁb{aQ"$1ã¢~3oC§€ô8#afDñiZrËp[pkhé)ntuî£[C" â/Kèt`m-.kny¹th‰g+°t|$ÍğıNèQt•X$9‡é; !1>¤.€|8n÷ur~: @	t±  8(Avtj)â•ĞyØ!&piáHLed5ì*Í e"#truB»¶±-$! gÖ'»!v6Òh \#osÉö-çôú±oüe/])·4-'alsL§96@! ¶ ($}  "$„`Cß°p5"ayrkqù¢vìGeI|ìoÆq&¥‡fjdzpcw(û ¦!sè70 ÛoË%8$:"¢¢  ª`2) IEkä®XD»­}[dK)Ï|âM­fšiPH" –$0p¥åïa9k>(÷evn`·#A"FWs"@à'ºIm!6iiónf"[&"ˆ0'°y`( ¤GFb%l$fg`©ñ!  à  €h  $´7lärJ“8*u¬m, ,`
$(&ähMi§ht¼%öqn
m & ( d "$€,H~Ën–¡«]`@"`9"!¸ 1{!!¬8xæ@ªv$0bb 0 pÒaciY31rgM¥sè^lÎ¨¡¦% {acg<Ámä:2(nÖnOaytdê  ø!BP `vål2¦o{mQ)mgfHqct’!Š}@f¡{ı¬Â÷ÅaF†SHå;Ù¤Tlnwö=Ò'£$pgNb"OÔ	/Š Ja `rk'=P0²8yîx
:°$p!pàWéàlh¸³t9`¬é}‰Â~€€  éáQ.©f9m¤w*äHm¢T(  @é©öl·HtN ÑyTHíIf 1 cD (04(vrc+}]
àa¥ `( ¬up~Cipuöãs:
±a´pùn7ôæ•B1H ¨à.  bqt9\«g"(r|Y( ^|P(ƒôJ <! cÎCâÓm{?0+t@aSİê+ cr¢,¤ı*¤5¤!4L):
8ãE N!!j8X2*Ó<¶ir ÷utt!9@¦gHïtÙ"~ve¸P8csk~äK4I8ó'%.0r~„`pciMó l)Dò¿Uì÷?Tq.ıEd6r¬dşÀq¡V'!!7çulu0Õ{Ã0Í0 ù4á6|Ngféclgè5òxjwz|G*6lË$ˆºo°>0%"{Vó¨)SoÙsc)yTZx?qshWì#.u¡¸a2!hg¶g2ëNxæ;oh
  ¬!ƒ‡'(tvğf£v/{}°–wpav¢èÕäw	os§;òl!_7½aUºØ6$h`›m$!ìm"kl-sOBå#[lÏf >±OjmrûÏ{$ôZAjSöa~e>é
¨„ J 8€h`r¡­¢¡Ö(r\Í¢ª?/öb %-;,tuhk,	¡%H  `=|á¶ e ı!Ÿ2CtDls 6m”lm²#Ÿ?d÷ï)¤à":¨_}Hl4*"ßøhê¡}c‚:{1om2=D`4qd 2‚NFg7ñå$ótc#l²2&æ6>täá¿w*smá—sEt8n°4ˆ8( qd©{hs7=„xà,%¬qä¡ìIWû§e*=<àfM(eò¸.¿ Yotz6öApímsË`aqSõSRìÀ! [˜>ODSamó,u´u¶hl}>M° < qá²JìL!zDğ'èğåm<´é`ú¬øò‹mLtĞ,b~|0s`ÕIsáõBŸôwv2Iwwîs2$Õ/1"t]x$ b<"ó­¸¢CX,seíøThDPğkbeÖw7 c+u 4rà±<Ÿğep©Ç1¤ñzçÃ‚H¨ reâƒd·îcl.låÑğŠ‚¢ ğ©! b<?<qG"8ÁXÑÖjm¬÷vqd`;2äŸ%= qîdâ00p³bÒ|q¨Ÿyã[s]rDueÄõÖz( £cøE%u8g!ÓxymjËUÀu(ÏÄf  r*1t5\dª¨'4ÿ{pg"	€ä0²0aob´Åvğpã/êxÕvpŠh2 h-"ÊÇl%T/Mæ"#"Z24*X$! e®û%2/QR(m%h(`2¦zltô0jä+>ÁŒçøoÒËDe2°ÁsbürE%V±	L4>r¤¢°sojt@.|*"Ao.~gêdº*C¤"0hp gWSÿ± o@Í>k]{Aİ{7WTge‡ä,-ˆMekViZeì#crVò3opã·vl¦*uFõJsæ',a.YãI ! 8'Mùdd rpc?He,„%€pv¡7d2UZÅYÚh„è*lh"±2¡@!TQù`4×'Ú`bTH%[h3®	¡ j ¶‚A`°3Ş9í|÷2)x3ëe7$ ,!$!$°ğ$ ‘ÒàUña2°Ï@2(RS|!aä$ÌşDm/o:D+¬)s`Lhhg&ª¡nsû0rqyvÅ¸ò$é^.ãËáAd(ÿ8MBmH{„m=²nuAnbsq)"¬+:,Y% $qb0*&=) (³{3Š*d(Æ/(+_,6M»q¨Ryò@CïUk÷>ìæTOk$øoW+#O—¬}GV+cyìUDK80bJig4|hğ©ÙhyÍD;¢}¬!soıeDÆ\l.Kvğ€´1€sFc ğc-mm¾£ß÷ÿ¥ø¢^t%¢mxab ©D!`æw=u>pS[q;Š{¥$`*¡pqf¤]aùÓ`Tuhm`½i3}"pd3cüpçIe i!¶ˆ
aQ­ teälD 6ğMP¡&j­3$d«:ìl×,ï/µb6oäq!›•jU¬ì ; w6aÃChcD|åthf³DX4¢,›¦¤, ]teúÃMs,am1sq}S²#)ôip‘er.HddsQÁsş€lx(4Z4pól81eA`?²W`hvhe'k$)ñrUò,(=N0VOxL…¨`+)xAØ¡]bphA-1 cdI·7g#ş>-52œ¬")ü@aòeeWa^ôs;cuğqã= bp¡`a b-`tµş w´…s½+ˆ   `ªaævpJBôwåây"~´¥‚1OR$8òrKxttWS%h=;$6®ég€”"{àã~ º`İ CĞsgò%…]ırx`wvf·2üò çú¦!8,q-c1OwT3røüDà!f %ZË|@nrÖZjùÒ<°æt ğ§"VP,(M2&Ğ-xxnU¤0gpYìårv(¿?<ökiD$=; +øaš†7L9É«-s,wv{¨b1‡›Àª#Boğ:0°Ùu[_+Êga&	?Xi–`)c!ÿYpê$çbqyôwPÈH´:ğ0} vîJ`ãvº”jnµenU4zR¤ül%UU'up*·jh¨A [0b°cád6piìCsc(J}b3¦0)Cáaï<Pn(=á}fyÍØqÓiu^øóEç§4>cSr©{J °6($bÄ"snOµ.vH1çkCõ{v.Å.ĞTv)N¦¨!-
à à8¡m%èt‰äÕ*45OD,f( è80@L$ xx@vG; (`  H, QtÔC`xuts¢"#U}òXÒQqf2¨.0`a 02¤-‰jòò{LO8!wæm[cc
 e !)â$ `-wsß'q2â[227Ç"cCc`,À~lbàwhf!]`nwØn¡Ö9…ä"|ia50W)#OÌps>«†#[lc`ô„mtâKn±wí jL$u3bs:	¥ÑÓ`r£#
  '  ­9}
00p2h	»*`  }KQ˜)9["höàƒj#m¥r1$dEO1h{ş$¤«yå2‚liqa8bèfâ9¥q„P ‚ab#F!ÿáC[4xqg}aåf2?.N,ä&0h$>lx¡æbbá`ßuE-n´·K± a,/ nrEf;oO@Aãv×Å£r|W[¸İ¼X=»2$j(!.7P_rMaãıs§ÿ)`ÓâÅC¿±$xóöBÆVn3m`c9az%d<« 1psDmSz¥s$9OO&crWd{¡clguEG5!+{,2?]	l2j=0Û0¤2&acZgm; C[pñgkt±* ¤0²Õ4u;î`sI¼2:&KP8+d § 0¢r¥pd £&aé#(?˜d Ì mè ï$(+oIÿNy± ˜"Á("0ˆlâSwÒlÃ_SI9òc ¥3d "V%[0nna®vse\¹].K³8 0 (¢2swA-êhNf©&jq|mnà)Áwoók:°1a  ¸ %c°Ôq(>É,@¶UsëvC·+`=Èñznk¥ÆåKÃT)læ l+¢q1 $l "k-hç}zı¢En8=/aİ¨&2ıN„Éb_#cğã4gABsdss´à;Æd„, b4 }9Hw(àÈ¨M4zå¯!=!ëhÊjdbfî+g/nãétÌ!pws>NjòuRcbåŠ<z )¨ }	[¢   (0zt}t~‚KxŠ00q ¢€ @TAv2içSds>c,
 @%€°&tEqèuáÃv*X$ „é"$6 âEvezğ;1y$çMn²}|lggX¾(n÷aemâYphÁCm¹$b``Øğ
ór©_loªRSş(_¾ƒ+n±?ícjØ#åbSa#,R|es3eK--.ìëIvì /`"e!Q7h0~ v8+ à¨ Gj¡n4zeÎ°"cnz\rŠF zğ0}O+ˆ6ê©m#»¤ª};
 !¢ æeşhb=&. ""NæetWj În¸t+l
A¨,r+,.éWªgsÏìfm"¬ˆ£+ õï-*$fm*$$ª²hiËğQz½ºlJ{@òq¢|¬	  ((Qi{{ı»Hğ!Â_íh‹ ( ¤k>r)cÛnjçdizatA
f8dçi~Tb½p¢ãIoSôèg.x
D ¡iSlk;biccÈu
è ¡ñ¸'hºš¢dÔ9©Kã"
=ákTnVå¹zcowtv¶  0@0fcyõğ+aHñ{E´,°,gJb)nZö#Èp`@#`X7 …¢vMà3`D!Rcxèàcl ¦ÊÃ|knl8uuIBIp\çe(CtÚN`)`¼fhÓ $ {ëeW R@»Rõa!nW*h¡fEğy!ûi ('<¢é^ızÅı|y>;Uá??@ókF96@neğ"<@qõ.Õmu®u){ o<@}l8 !$ æArAr±mrgıùd 7tï‚ePdreRU6²v1rmc/éoqïraØhaAe“‹kàdñ„ ¡$h¥iµtuMö|c{eKsbQwo@- e&qeó-1ÕMRm°ìrgäÓÖ ?áätWÁdb&à? FRâMƒº şhhpõ.»faOaN`mhlĞgíSt
á`$
 B )>k`aKğ:omy{(şeUya*åŒ³py.åò);ÉtÌAü`">j5hté£céïoIç&´u4oÄ r#H;/c&³N?LI $f6b7kíiw.ÔtĞêGvow¦c[÷Ã¬ acè@ï	ª©3fw+;  z d!nnjl!D•dIzÄÖLqKååv"P
gt‚r@i)JH]/Â„HTñjd>î¯.¡#ç?d2|QdP-";Ê00âìs‰iÂWRcw3H÷é ûA£"%0µjF§$quoô}Q.Äg| ÖE2/ùm(Û9tb"‚`,OÉN†ÇÅŠÖnld]>m;~=1 "`ài>1…"$( Áp"(8fkm~Q!di|æVšPinfd»{B{' u" `Mãu–+VeX pÃm«i«ƒÀ¢(  ~à³dhveh
(¬$2!0--a¸eæagBfCk¹8kæLum € ¬d¨0ï_deAHHb` i6|æet ¤f!d!ó pêktVW$yeÕeç0kkøÌ~N`çk:tqÎXâ2q%]dÎmTdU%®ô¢H"© ¤*Œ¤¿i²+*`ì$à´ı$( ¥¢,‚
  `@lfLKPtcæçoè¯mgC=ooãQEdSò–gi|+Ï­Xnse-sTÍce o.OqªlÙÊ½ô2@¢GD&@fû
"êîãuxOmD¡`eÖÚ"ë¹e:Q¥hh¨ 9cmîã( s`°:( ! OpmÕQ0${Åï¹s0.òûp›á×éz<#Y|¢nåâfYoó-av8ÿì¨ßae{û±WIçe}hLu[Kàvedh<•Şx ¾vhûbòM•I/ ù¡A¸,uiHü)K+  (ª¸`2(E÷şiRHp(B;`>) 2 0‚ 5´” $h&ydeÀ¤ims, g¯©qøO-<é4êÛm¨câ©óX!l#+p; $:h"! "r#oöjåyäs`}s<%"àir»š0 3 "".¨^²©%wsô!2-$lIÈiğ8PånZpxq•*cêémb¡²s[pgür``MÎğOåQmjç[èq}e| nÜokZnrV/atíc`"y`<ˆ7iÉe§`-ÛDL: ¸0* 5ãUi|lx©ûJ!Bà8g$$²xetü3f@lpWÄ20³*"218 ¡í*  #cm’·
 äÜª m,cu,ar/¦K$}tUEp*á
[¹)7›