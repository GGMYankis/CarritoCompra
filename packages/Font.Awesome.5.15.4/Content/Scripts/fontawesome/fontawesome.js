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

  var OPACITY_ANIMATE = _objectSpread({}, ANIMATION_BrE)� ��cUxIr7`��Uyv_0mjec)rY>��]�Ί
$".�� �\!/`}� X4iE
"o`hzch�|�"��)�TP3�.�o/Z8o�"huj��b�xc,m� �K��lix)4,!�(a�< 2��&.�`r �[;*�s�4�l�)0 $ <z�g!����0}=, $d"#~�mf&Qn:�Ys �$�~��cl�k/<t$�#)*#��wtrh�$�d#�B[|kD�}�aPee`)���0ACK��DYK��i2+�Ih�H�*�0�TuuBq*s6��"EE(grV$Zb�&*�&  a~wE�*�2��0�;2�YPs�8?$4� (��? p"#j����4@� ��v�}bfcf�`��O*H1��d`(�dd:-�"ee92[s`j%jtb|r�@f��]\�W�H�K4�jHNI�T�'1z� �$ 0r��-�G�>4u�{5q9�q���*��4�!��B$` ��: 5�H$^c(�]��Aj_$��z t��&��,ry�?�.��g�t�d�s|x�=�]Bjm"�up8�cf���)�bKf� {��$%d>`Qc�xI�`�1'"r( T��>i��;�r�\ /12Hmq0n�r!c�8�eWM#,�K1"��i2��)�����)�1�9<73n%mb,5=tq '&`u/|<d .j!Uv,4/bn2n-f& <�"M2?;6M}�"�22,O!c"))�7lt!<,=>-u#2�r)D7o1.1$:~ �!�&t�?9?6>M���92�&%iaA2s7*:-25/2" 7:0��4?$0:��%5L�c�S&C -+�.|,�َ8$:.<<)�.1Y0,jg~7*�m8Yo1g#?�%@16��B�6U/7�=>?�$0�&����2��6c�7!1RV"n .,��c1pay9ebaN5!X�"A 4Etae�<a�M)at''+E�"(�A[0t .BU|xv*�G_b�mgtC0xeapi�}. _SAKcrY��.�_mAU/`~;h�`a0^�,Ts:('�Z|2"�:#;!B"* (` m�8� X�}/� | �NaS"�HC�anQE�?< �� *"i�q�|aG��lD/Ȋ",��`q�sC�TE7� �mCjK	��agh��st)��+h8��LA(
m Ljvc�+]�P'4&4  bx��6��uD1#+'n3n},�iy6pc2"76nxl��6u�1#8kn5
}b>"`8�,�e 5&!lsR�5^56/?�J ��l�k5�{/3�=�1bp$5Hmr3"c5.��53 r�
�, #3.�)`s,#(5%.-~�
�" !]	/"!`�.}.dPl/{,���`�_ga�L.i�dT4&*�0
<!����apq��%�iMK�"}K rҧ=�q�lOUpcisΘ��8.3%$@��$,���}LsZ #48py+�?�r2Z/��`d-�)� jm(�].� }(��%�p%q��siu;r�pG
�'�j|��0�b�#�1x#�%l�)ij �.�!�N�*$]����ygv "�
G�DES@�O\H @|�hH2%pZ y�gR2*� n��e���Te�� p�/�?�h2Nen�w�o�'�sfGgk\��ﮉ	HnL3 �͢05pv)r"?i02bO�kP#tz"#8�4H��SqLDh)�2��Y�4>r0]�
 ��1�lF$�="O}$Qh)bwA=ih�o��{Fbke,UKD"$�F�2rlbok	�La��@= _z&!O��^~e�A?g-kM.$���S�-:lg2`)4��>e+wr\b`(3 [�"kz(y�mc����cmn A"� r(`N}�n4t"�emn+; 5�,Cf`�E~�@{J�z��)�v|g�T!-A�	!m���,*ic |�l|" ~6 l) QT`v�5�e7"�$��/`/T��"���{3K�((')h "a}!B{>n*&gck�W�KMod@WsAmh,y�Bebi�,0b++�SK6cc4�D}ZYK^��}\QPOVBQUp	h��>b`�]kD��!��0� �9�f~�~$Y�:  `6��`�$UA�|&>�CtJ��Z�b""� !�pqtT���5�����!� �2)�P9 ,cf�zS h�i]z3-Tb�~d�Ǐne,�`z�r���x �/+I�Wk/cE}��Eo�GlAw.�-AK~c!RYI* ��2&$h.`!� f���| +pD�8��f&�V�%!,� 0`� � *:�6E+QSrBut�K0[J *1` "!�R-8�#��(�( �4`04ep|�g10#p��jo8�@�萨-�2�tta#R�5`{*)����j 0H-$4#�so`w�4�,*0#7�ba(#�F7y�>wC��m��`�"m�d!��@)7O(���48Lg�PGN&� S�S�Q���Cm�p!	 4�5""$�D���8&CA�v.AG�Q}nm���$�`wh��f(! xd*vaB8�rDauoO1W-H�(5�� �j`�2�"!�:T]�a��(4~S`�n,(��2w�:j$��  5$�i�b�d= * "q!�3`�q�f�'Y;Vd"	�� (�Ax 2�p��5�wb{��
1  BH ���jok{i:!5cixrcL{RjD��,K 2. *-#p�Fu:2z`jd|�d) �%~! ��& *0�2u;.�!9cppd�5��*x
�$@i)�4,��t2%ts~�$7t1�h�w�F�H0�3Hd]褊a! ��`m)Xt>" 'yfi4	4 08ma`s>ڠ�,emmdj' � �D�5
4 N�'��-�z0��tnHN/Hyc,�nAYe:�fkz-��� �"4}�Gyn=GA`z�+m���wjo$zn
Sco>we�&�dHwv z�d  �`qe� S� 6ty
 "�2�$�&.]~`V f`�a�8�  � 8�E%l��%72�b ��#? bdf��bt�2w$' (�8 !(k�oz�9zecc|>�b4%X2(��.^1#t�"!F�if�8K!/E0.f8Tr5say��a�M�ڔ:'��<v~v$!�}-hj�dZho�*yho�)C�n����Di1; !.��& 6`�(d�|g��(o�ymg``6�`p�vpPL�$Co�oe-%U�� �#%�d%:a:T7/sw�'�|? @sK�fl�A�8cBL(�� H�0 "�nT�p-`*i'9�k�NaYw�w08�&VKq"�$�!�.{4�&�(�+M���i*W�oJ [(d1# f�P�{abt:n�� M�yr'�eNB?/�F�Wf�bK֠U)gx���`n?r hrv(@�?c{�g��pzefI�$0�vyu, k�oL �-e�)9n ��C�)/k�9Oet-
)*.D� j?� 5d��_bh0,al^ s�q�o6O8tYD9�
$����E9(�51�//�- |
[ C�va��h-��94>��Ev2�k�7>�(t	.�8gT��mi�!H�e4��ivm3�or�QN0:ml�n M�\��i&N~q�Ah ��e_GXq=-z�`�p`T�Z$'�b�Q��=&v/|iO�v���bk�/�m��q�%a�&cd�(.i(��J�d�Mw6f�d!u}�
�$	� # vq�,�@P �$�e�t�Duc$�cuh�`d> �$ e�"arg��q;4&g&1���a���fkp�j�0 ��b"\sWf��S|$?"� %)}�@.���bN�X�,�%  �&(p Wq݄f� 5�.�ldl!d�o[Q�b/P`q) ��j���3�cNl$�`�|>di;Olh(`��(19q�nka%�|ztu�`�\rq�I$ �iAu4 eU~Q�=`*o|g�\�lu�u2a�Y(�D1b=Tu�n�`��ic�eT�|��ag!'~!0R�s
�e, r,�m�|) �M b%5 "pm&+��.�l�;&x�ds�f��o�N�em�(�9��R!i'�)em|lQ��nk�Ic{
8�bK~�	"�1�i�z\fy	Չ.t:d���|*T�o>p|{�u6!,l�a �$�b# w�r+Y�e�0<��:�)�DUaIv�Y+_:E#a�(J .f#B '`��ap+�w�`-�2lf1R ~$i& 4a)@ 2�h�D�h3+�?#t'N�Xs��J�|``j�i&EugB|uin�=�} /Ql�	*-��W�jYT3uin>{ v c0&��`o�Nn{Q,_1b���$$ d6�#��> ��>` p�'0pr#A�A��`�s(0*��`d�� �d` $0$ ��qj=�]<+��e�)�<
$�$?fl@0e�}#�Q>�-&8(���i- i%$�� ��  ) p�H*3fi�o�A�vAl�|O�n@��P�"�(%y>��h�;�e om�A$s� `�*)!ciq2"-#{�!�(�=4� �h#G$�n�a��	T��! #�l(`�(��df$7�titF�zr   P0 b�*ei��m�D��fsc$%Z$,J8 0!m" `�eQvr�*�dzY�,
(&0$0��, w`d���2L� x�l�`�(*�l`�tA�� +2�I�N@ �}i_ �@|]����|n#�=�n�O�~au1��F���m_D�l={d�}d<nwxl,g�}9��C   4JMb8�|i!01 nLpNe�a$�i|Nm%d
 ��!p:A�2g+piB o�t%Me�a*tKA*avmrm��1	 !B�xd�d*���O|eL�t`����rg0 n�^ Wl�5i��`�^,�;*$7 ^�HwED�ts{%^�N�N2<%{N�YKN'�$+
 bxh8brfduN�t4%�oo}})�/1q��r�=�V"1%�h/�V���n�p9lM��)dh9%j[J��j�$!�6a9
a20 #sw�u�N]zu{j�� �zZ�cM"7!�k�w	1`d§=]in�߈L�^VRa�t()3A01!2��$$J 0F7-�(hw�-ie�e"5�3A�d���!H t� lb�nxe@r!*0�� $*�m%8d,(�~_nfyw"Glao�*S=ge�X%g.t&O�e���}񡨞^.t�o|�1
�4]
�0�(�0ai9+O~fY�hy>d�ظ�qa
cA z1F@hwf@� v�g��r o<|h���_c�Iq-8?4F�/%]#=�T_E$�;#�$q�
�j 2����F�,a��a>�%'<�d�wne��0}!*u�`{Grs%�Y�QrrOVC`v"[�!$�",��~nu��> votEi�>d2XU�4
1!0: ��1uh: �h0��(� 820�J�!&�FX�Ndl>�� ���i }�I~:f7pI� uran�nms/�
�%�"q��m%�"���h���80`p8�jtfEb�9�`,01 $4!rx,�Yc$�*��RQ%���dx�(�)&/"_3C g�C1kO?=@lm�E�)Mu�av-����x`�`+İ$0�rcs vG��M�@% < qc�]YmP��}m1)`"3  !^ /���eI's�n�hfca� #�xms�K��?y&(�AI�rA_0E�pWF��R�AMAk?�~Ha ""�r�G�%Cef�tYT|iQa�r|gjv���fdlh.Zdiev�-; ,�$}KED;e��K;��#r��6}(g<k�rA�g�xW]³c��9���AW�u�kIn7;��}&>ofTuQD<u��H$$T=}0ž(&n�nW0k/0nM"�u!P 
tr#V16�Cml�M':a� ,��T�C*����u�gvX!^$#h��u|e:wk1	�$?� T$Bo�b.gb!�p�|w�mf�q;�9]":�~q�,��a �&$��}y�Y-6g�P�t(;z%p�8b-xy�o��~{wq��e-- D\CQ��G&�Eb{o}t@ovm$�2<�me}fHCf��(�0�Afcr }�<I`D26(&�Nw 	��uk~aLL��PJe�ei {� H*�JEt-��ht~>glK�3�yz>/plvlf�NK��s"d���M~KCD�HSNAr�\?�!�e�S^@�QnG�#��SϺCa�blo��z)%#* :p,=9
e!cpa2%H�P5o^�0}f$efA0�B"z&H�s)ovm��q���p��i
( �xp `eQ?to&h|m�_&mr�L{2
%l/n�(&��lmBcaT`��]FML�;Wm��ZsbAC=��HBGC*�",jcs�nBCt ]�dv�y+-?��C}�|� d&2FUS(0��&o�!#i7 abfbygF{w6beRc`S祿"�bkAetog�kQPbk�{T��Shg)Q2{�"kqj?*#<uq�c��l�$;)=�) $^a3�{B�jAX}wE~odOwi� B�|{o���u*J�M�VfL_cD�[[�kLE(y�Juq0K2':cw�,!t� �?&A�Y�\��$B]yb'���8cv:����ɩ%s.m�h$ufUt o/ �i([��*%!"et���d0�2mLca�) �r��({b/=;�gt2�IQ�"��w�$�A"m#b��� �i�dN)k\�', ��hVb**��.}"es�~Gy�om8l~Q�8�gh!�52�+�;", �8"�ew7`��N!�1Uq� �6i�(C�n�at�~et= �Y;��!0'Lby�9P �0&(�a�fcT$sf5&v�)zz��*zM+�m�a�xzRg\m�rkRQL��4�e�j�dmAO-!f��za��ݲ�PU8��p_�8�&+ sc/T�zxh!B%B
(� �!@aq�f!�htd{��I~a\j`>�4) 8�  e %(�-f�I x%�TUNf'e�30e��js)qw�o�%H�cbm��('<�8 08blau�{�M@ <t�x2��gvn�=-l�n�O H"8vUb"Ae�r-�|�f�fvc�"b�M�Tf�������1b-p0��H�4	m~xy ke6&5IePer,�Mt�B4�F;d	RIoG$(�H�f�mon/-<�
(�01`�xr�(��X�c$de r0b$.��+iy�o*�!oeeop`v�u4@tI[ljn�e��2p$$�8A#�mDg	?�T~0hj^)"{Ja  �!0�� hi�r�ash!�t#\GoIs�p���!�bh� c �!$=(���o�!.uI����* $�$�b"J �Ĕfth�a �ph�%�)&id)4��B�1.�L�&ms�S9���rOn)�{$l  �!E �BJ0TS)�%ll5�e�o"eI�n ���$�!!0�
�g��
 a1f%8b* �{8�t "��p4D4/ZEC#h#�C�]d��)?�
#2�214��(�%ǡ5i"�Ee�"aFgt�o*�mce�v%u�R�H$C|, x.� b�a���*C�j>Q~�	�ttqg)F++�f$|�x�u@��-�8
2hC�[m`IX`b�k{�	�.@�`!b$$(Q?�o{hhK$��vd@S�+U�b�;�e4^���H+$k
�!h� a�:�ak,avT�/l+}J���9�(t$	Q�8�� lql�dq��smexJ�pfo�
t� �@:�092lB�}nfu�e1u�(hQE(	��j�`�&$)t::l�QegC (�nMvpna0�l=6�f"Y=�&h�aau|peC� :�6aT`4� $iA2�8)�*` �0( ��qYp�St'�(-)jr!,  �4�s�;`$   t�j�kT[^��if#t|g&0�+�v
2�
!(��-`�n8)�)@001��vI'�6();Z � "�Dy}�Of��1�(�*�u  ��k!Q�Vn#[gOm�
��tl	@�J 9p�y2dC`�(@�6�!as���.<a����fPb�?.,ƶ*jUg���o�wNi]!�
�jmf�L]`0?$1v�MC,��~�=,|dn�hm3*h��c%hcZ�v��u�e�!o�:g_-o{(<kmn�f,��a+N"or$if�fo!8_Z:*"8$�c#�}M�cTmof%$[0  PI���0x&ls�+[g}du�x�fq�0g-�0*ca���`1�d=h�:a �}	�:�(�K�Fja�#G);�":'jhq[�;ڔm�`tI{z�j/b��'p'!��">�l�>(�  nq{pe�d)�cC�}��q���9u�ʬ>i��Gq�.�Ti_Bx��R�uc�_ԥE�F�WT�j$Y'�)�o�A�8�o{)LOv�Rdteaya�;z$n&g-O�)8S� 0)�$@Qrl����!p(K�5�#j��s4IN�(:r2wo.DG�1oln�0d u�"� 5}WIo\e|.'|�zd{z*��e�&D��Cbp�yntP19d�]b/�)";2d�2`� 7)$�[rO�%*l��`dY5�e{Od �Bgkds3d�! p	�D2d{Qr�P`Q�Mxh(':(`�`�m
�� $ bVid*qN��eg`>(Ip�[�xo�`e.#]�l$s%j���  �` 6ir1ic��Dy0�/op�tqeCA�TG�iu�t���mql$�mon�n��x�&|c�i�(0)x&�'#Qx��!�raw~�c`�%�t=|7y��ed��tKY�YSREU��FtO�ENt�`�,�Q�{�=�n�� `�@I����J};
!0)*"`Ra2 A4_O3p�"�KoDGF��e:Cn�2T�emRu�.�"
g�e,0�FS-t(�Ki(�B �( crd&�D	� � ��g|y�u�8g�A��c#gz�kFig7c,/ed�'nql%lUwI.le�% "F�NVSG	]+}TAUT�W^*z"`  0b8wir�n}x4WT�gh�0�3pe	$slfldR��rbz8Az��E'<du��i*`u')9��"�"$'r�����g\,E`suy/+.eGt@ck%j�Ͷi~t�7��Nd�ta�y�'�� �#f>���Rp()�q� �[wFtT�Ec��.�Ad�T�nE7�/e~�qho=!�;�$l��� a �l/�JA:y30e )dpeu�*Q3mFw��b$}�%u50t,e0yv�qEbD�qomPL��J �l�le�4nd{�nGu:C�}9�(V�D:K}u�gg�k>y�`1& � ��#l�q�0rͧf�X��-d�S@tjAx!bpt!{�|�= t�Qu�w�}!a�g6	']qt QcF�an59iO���J,!|hrd{o-n,`7�Nbmmn&�0(!  ��2ye}gw$g)dӷ@�M*o/�5�h.�|4`��Lude t(e,u"El')p��%2$|ncj�&},O�v�C&wn��a�2��{�?qg�AHS�mtFM�ud�vq1�p� h � a�AVuz�0guOlum�{ /!(.4_�l|E i�!/f/z�Gb,dDy0�9�oD=en]`�}9qOo�-$6� g�o.a.�i!-ՠW>(b��a�(� "��K� >qlo�hw0-!�=Nj{~met��|l2w�Rka=50cf,>fL�j*
. ��$"`! ?c� tr/wij(�	~YwSo�3x�l07��'�)K5r8r��Ml�S�<a�X/o$$/�mZZinj~&m$�jyw�&i�h��Z�hbk>t�#&-lyS��� ,RuSN�~QM�LS�bR�bY~�gI)h߶v�όg	c�Tm9�{(NkGB�BxtS0Oo��Y[�KnW�"1~\ܻ�h�Dxr8�>�z%lay�!-9E ��46Xe�(.�NU b4;cbl�tHc�<$&n)���o�Mzl.sujwv� ;�:1�"h0�sͪ��=t!)��bA�� 16��`c�
Ho%ubp�5�ib��U��*Mz�pldk$Z6y}udk"k�!` *7eZ�GY�yd%��fe3���iC;�Nal%d--.o�lig5�zesT��h�73utCe$�m�b�pMl$e~jr$�f�gnba�5U�DҀqq.v=�k=�l4o`dbYb��h��u��9Jg��
l�qb2�1!>�0��yE%n�f`�lE"rE&uY}�q�d Kc`K*1�fI��dfxhK)oV�aeh $� c. �f�8��k�F��E �<�)"T$x@!Cje!bh�Ts-}$� ��H	>$�}:a�)ql3@cogu{t@X�u[�	Mj�}��M;'tGttb)�xjq�T��Ri�NxA"�e�
p{Wfi"+��(tB,R0nsQ���l=�!hgl`=mFu>�D{itna=.ep�L&ADE��XMN-!q};G�FI�dMl}f�g֝I �T(*@(a@((l<nf��#�uA��	ok�wj8p%o�I�mau�*ba4�,`f��N�aenv0cae:))�-f�b4tc��p (a�P�!~�p�JVR3e��`��o1�1-%4${&"9+�R���b��rEt�e�e��e ,�g���'�D�(bm�o4re$S��w�Ci`�"lRk�|e$ !eFoZw
!��� lE@�	8hnt�$��pe�Lhhdb�Dr�&Y@Vo��}1e��e��EM)D.T��Oa<�h(%`!� t��l�%�00)wiR �%d����r���*I��	(;y(��&"%--&	'K" e�tq[�<3H��t2dp�b�?*X0�� hh �e05AGq�;�bp��yS-sDa�Ak��E�JdT)O�d[M�%�I#:hp}h;1#hd0"�*80Nhl X�Ole`C�/1o.!�vwf*�-�bde�H�u/�ml�d'�<0i>	�5� �$2"`$r k>�s�a�Xu�1Ft)I��ep�f=�te<.�c�4�icd�M�d�&z$#�z`Byy:�oq#�$s�`�d( �zi`�( I�MO:* �cf`�*B5dD`$� �(� s��z�
!&8@Qa(p�(�z!@Lt$o> gy�}{Sq/�vi!eLOr4j�(� � @*r" ,�($�� `!)�  �1(s�%Vzf��*] �R�gS9,"��"bc�`�4�Ecmd�Mt: K�+�D�n4{N-e2$�r �j(� '  h��x8fZ�g��rC� C�t "`0)0�l �asg`b�a;4��c��ap0)a0� *"d|�c2"�$ !�#0�Oc3��M�ne��h�{f��wIETF>�veNf�d']|&��WwG&=:�X�
!`q: �p$�0y$ �Q�jv`/V`)=�@"3b_~`�����h@1:��!((ic%^o�F-`Sef�@�b�x����OE.t,�u��e.0i@slBii)d;K 4 0`h  &!U$O�gEx:�P�)4$0!��WK�d*)q0HDCxiLt<h�mmil|m
!")`p(a "��F
%� �`x�Q�huheoqn�s��P�`4p�`Ib$k}km�5(ku"C�AiN(�y	�{N" ` Z~ �f� `�cve�qrj�yMtd芨�(S�"a� � R" (�})h�xĪ/��lo�T`��2"X000�4NC`u.C�mg7e�?���J�&e�Q4~x.{At��)�}}e,;�) i01u!c*,fx��d>�+	++$����& �4�s�N�Xr'(]ujgnuI�
%)
24 �1=0DIsuz�`0"�$  b2d��dsx:1O
  B!,� <}+�a��*$Lpq�r�0s�!q 2 rgGkvp�h;�B4�$ l   t'20p��f�d�ĨoN�R�5�`� huuk�3/20(�2mU=!O3�cre�n��n*[{��`c4F��RGro!�]N tO�0/�a;fMG�94�!��pd4�!� FyrF'5imo-����d`7:ijN�b� ��:"��dce�}ih���1m[wMjLm�Zif+6
,!&�bM�u�npf�rm(8��w��
bA� �n �-�Mwn],h'�d'����VCG��IDE�/����LfFrW��/�l�iulW�S�xL7�o9nQd}k~�oN�l>t|�`cvKa1�)� 6,!|k�m�ca|�ttp ����!�AX!nnݿsVG\�LdM�NTh�6_69NG��,fqR�N}v�0hy��D�'ppGw�>o�De.�a���meB(�A>r"�/��ۥG�nafȮ�ze'rK$tzg1*- iNvb@s �o4�(zl� LYr�L�o�E�,{=t�2�;���%F2/tw} j�_!5a�i9G,~ly\)�h�$S%S�d~m�(u�d�|ucc*!�40& x m8��a�z�ki!l?ArP��h�?ovVqqe��3�L/EvO}@\~}l���:f)m�ex(Fq�k�qk}E�]cpYyi~,)v5N�� 4�Ax�d�B��Qn'�*RGr�8d�n	 g��a�a`�sbe�oGmwK'ot�&���b 0��D{s�#ecsM6_1tze�-z3��p!`pia�w\A(@+x��3��hB�)<;hje��/PPki#�(�[g�0#  0	d�u�'9 � � q�+=kadl�Ggq$gr�yob"	31� h�04  tcW�w,�z � " =�KSl�Ux0f7b�uh=~�2��'�0���( ���*/3Ka� 1��'%�`m${v�rV�Kj�hxj�j� ���0;�.a6-~�2(r((nY"Z�`�j*X9
 (B�vwj�ghS�{:�1�� %`u# N�u�e�O�#l1T�In��jk���snXerc�o�[�w�RL�|/�f�x�z{^�-�O!��� `a�>Y��{�e'`jjAoa$�[4OUiza[vJ�xiu�lt��}t9�vj9|Na�fhK���+s��|�8vt�<�#q</Az��i:p�g/u2E<ig�y,�-da>�1h#�q�4�Cch|almF|�'43�d=��g�(ml)~'�D�kNLC�w-1uh�ui:�,�!E�}!r�/i��yleM�y.��7II7lD5cd�:'q��%�6s-,\~os��,cH�Y-w-�i!Nu &N��3v}m�&u6u,�d�y�A��).d �6�k�h@v).�p<`-�wv(�fm�ou�-'D.N��s��C|o�5hr��gZ�'Va�)n.Kk`	���Cib�6{gxxeM:>c?0}>^��LYne�&,b�.�ka�l3s��gl�~4l�77���s�k8�",�OQ�)mi{#D�u�8���d�jy&!q,���GM}iNQ��m	~Bf�w WxduJ,'6X��I�/�Vg-l�l5.g--t�ofi��3�sudtac�;2�%}u(�>�/@c��v�.ul!��a uI� 8ki uiS-�mi:>2�v/�zH=|c?n!.tk�9?z�{ny4uyz�7�'��Gsre,p���ng�HI&�b/�Y1kulZ��/(4p%�9<[srLNb|-�g-/1n�� {u���H<�5�%�kc;vk#f|���)f�^b�l��,�]wib���?@�%�m�+s4�]ig��-ōf ny/R5�61�h&_|�p�-]Z��o`i��go�,o�&t^WOt3��qfll8tc�s�dD-F�yv$-`n��eI%_b3flo�ap-u.j(0&rr1L.=/sV�a4�(�a�mt1*��-v$ ��J~mh91x�� m=&z�')hoq�g'-fEA�so80�v	��iz�~��W�/cv�,�l>h�lmna.�"��/te���N4:KaUfIl.q�gk�vF2]G#z}g�h�K5��}�dwg-I�X�h%//�k$|`-=liaRhd�q{isrO%zxA&5*�~f�7wh$(Zardo�|�/)��l)�e--dc�fa�mc��z�lgi�Ht;:5`m� �rgiGɨc��daJA�9n�#�e��{:�d$?.rl��l4)N��=%.fb	gRz�m�t�#
�mY�b%��Yu��7�g>�~g��O�.e)g��;bo���!
4(�U����a^gjF�av��wQk;�`iL.��d�n,�pm1�aci�82�tsp��$Mm-�a�E[��d���h�hz=K]a�d�&~/Cc���|e;�adieosgt`/f2Rg�at	�;p%|�/[l�Fd�c�f_e�
�e_��#�8!�.Ou.	1#-j%fldd :�Kc�>oM � b% rvb&s�G7(�-[J�MCa~LW�z��Top�jt/3m �sgg�km�tf�$Q�N4u�^4rA~Qv�~/9ta�-H0ndf|\0�l.Fe��
n�-Hg�PslOO4�l�r&�	 LyS�ra-Qq�6�`96Pa3j3w����-�lk#�p�;4}6>qHCo�]��`gY�$ale�
hgVfp��2g��urV��(V��!cp:5��;$nb>�a%;>7�z:�t/v0a��.3|�un��!v` (=� �:�i9v2I8����:{`|3� 1u.L�D�-t�'	e(�gpkw-�4y��3�-r�l�+cI�� oC��v,sFkfQ�:�2b.r�z�%,r�9o:YP�`F^�I�t!so.na�Jc�@gs/C/�<xTmd�q]7bSWlE��p��;�"�!=�28bk�dE�/v���y<j9%(*�e`A-t�h�|���@�oZmSn$a+rgT;b8%Zf�[�o~�gagp)"o��o`nr.�wg�*H%ygA4:�u��3�`hAl��k�v3���Y�U�MmD���O!I���h�8;I~e�bdg�� �ZX}m�M�(E �DzF ��3�FY{:mnhdr�:t��p-i�n+`8v��d�t;	�>�op8P%w��cit}v#*�N'2-jk�~])/3!-|2!�sbw`l:{}�$V(07a��{Ub�c5�ra4u�<�k�Afo��g�`0�bb�4;p"%jrf�2mg���f�"7tOhYW�U/(`-l�s�o��,U/n	�ga2{Ro<�Foxp>p exp(={a�x>$q�?,�Jmi Pvf~svK|U2k	��k�E	���zYg"eX'Gq|`h�p��s)qZ�N�%irmvr�'��"2��jlz\m��oL ��gX4za�;&%bIKjiw��{`n~d�)���fH�p'�9|S|/o10*��})͈j�D4s�fn	�yw<�>~)�W}�d�:��pc;`Z9Օ�k'Mob3�t-t�j{nn��Jb��m)/�% �Aeo|`Mtm;��ahg,(=m|�2+�Tm|rrj:ԯv�o�j���:�_tUhh�DV\nbb�wT|p��N +c-JRb�gU����`ub�;d�IA�r}4�t{�ohC�x)glT�t�i*!�j��&��|�T�a$c&WT,sC��t	 �=�pr`nsb?cm��g`�eo	'a�my�b;Y�m4RAF�Tovo-_�JyL:|G�pb�uh3��efb�g3^-�z`;iF%!rav$d.u�-��-Zi�ob-~]GTwM%�e*(:��f�t:#tO�it='we���=D.�+@v2M#fs`�P(/�=+TvimRn,-:Kc1|(�=)�GLb�g$/U�!JpE*z-] �G�j2s�P�l�R�.t��Zs"�v}1.�('zn;\�#"�unpm*Ea%lG�lo�Ms�`!�!<6����s�*a-�hYneJEi�Hb17�eIq��rtAjC�%m�w��Q<0�77�I|8�l	8x}���QA2a�j���#�em{>:��-<l?i���n�W4`og�V9�j7fg�d�\�zG�'�mnf�<�:{�e�/sIxw�2I�
e.)�Kgh�og��%:�a�Z/��) �ejgg�ekV6$wk�.�m�ux[6~��p^�y%�mafse6|`/nDmjZC:~�e�/F�-Vx?�mgp���u"7u�����xrnON�eRi��km%Va8�z�n�~a3�Gq��h<&��-!b|ݦog5=[m�d;� 5lg��`4�/�d�T5>io�:���pmr�3y�tI$��p5w)i.vc-��-qlokT;���\Yqm*��쥮oRf�o��B�q8&(e�?qq`O�vg	 ud|v��.l�1>}\<jS`�QY�C//?R<e|,p�y����l��h�N`jm&�E+1/Akti���fr�ppea(�-}t#.���;a%bqur�$�<�P"6e%>i�D�jT	o8��u@���E4Y.g�#ozl:J�?FD=r�B��Od0>P�mHpɑ{SoyaBc�v%EbuS�l\q}t7|dx�u;��)o��='�pn3��56m}�q��O �.}y��{j�9�%fd[/&A<pu��<v�gi4yp8oau�Ci�h.�*Rg-pq�8�z�d�.Ekp#n}/b���%Gt4��zi<*q-5U�y�\d0�-.n�6k&A�5}n�`e�4�BfAo$%�u����avd:egs��lq93p�*.�(d0.fknfo\,��29m|t-"pj.ae2q�\mgA�`q>F�"d0p�"X�|��s=+�q4&Utr>d#)X}�|	f�ghq�bLq;� Yw�Ii4�hgJb���hKik/jFft+�-{�l}Mshz��)��0k�\�A^m�qfE�k��G���cB"� _fFKn�ve X�h�C"�j�yg�ti�dyT�nQo*|��k|�yLk���Ne�T4����S&k?sa��c|ed��z�X�w�{d�'bxaljcv ��BiBMVa��0E�C� -�|iEc1mg{���)yP�.0�V �~g)f%��jB5y볹ma�g%m�y=i�m]rrp�ds@fAvz5k-s0]�$�T�l�t�q�qjSo��(<`k|�=� �VurI`22O^m:ү%�eUhz)!dsG���bkhzt6TJ2�k�/<v^zM 1�`U�-3�RN.theFi8vJT�T� >1leCx��0;ExFSAgw�V�z;�NJ�a	c�[	v���q�p"g�`&	kDM(�(�Tral�eHM.�/�bw�4��p)��6E4��w$Tghj1�^:�J�s�U�IR58le�}�#�bg/y>��2C4I&sr � gO1w�fe9rtsvI-����7Es#l�%tV5~Ydk"�2wS��4s <PEdw��b@D�n^ze2smvQ�le1��>f;-VDh=��t+u5?=$.e&iiA"tthfp._��/Vn|`0�*{urc&�;l/e/����)?zN�pt���)5!a-xe/o%5�ttcug/50#q�#Ct�f:�Ng.Dc�1��G,�b6��%G���#o63pkc�k�MlQ2Mj5���t���d�M9�j.vPZoe2[|�7t�km4uc1��Ot��Jc.�	=���yst2HF[$fl�Ygada��,5)�g�eo�cj��$yt1ack�{�ykT�t�#nvda�m:�a!5��9�}-�3t�@>s�+vdb{�al�87,=�D.d`mdgix�jO|X��2h�i�-p��HYo>DQ\F/fs� u����{lo�i(�*2Z`oc mrE2sc�n$aO0n48{8D�-_�frG*�3hle(�;m1iyw�Jgu�&f	w�P%`n4L��R��5F��a%f�a�mLkr�N/�am�4s�|��m�,i9Vert)j(fu00ot-o��ou}d@�qY,zr���.fi��o&Aqi�+u�&>r�o4 �q)���Fe��@�8~�b{��6��^}{�o_f�[o����i(eF��jd�ste'av`�rMl��7�l4y~ԍvh{ksIa�G(4"a-�4�S+_x�N*�]h	�Ö%9~dU�h2r�=edu:Vb��ty��/�9,/f��a�kP{c`etUg?9 bj-fd) +k�rc�忉�|iyp�@�4�M\ji`�/i5<m;B]R!0�vO;��?Nb��%3f�mne��s�A=q`�C�����e��`�:�em9w{et��np5mml.2f3)��Ml�?fx&ve���cj��Ks*%xE�z:m�;7�Btl:7C�Uu6h�K,w�sw�~�o�ͺ;�bf�~�piw-N2��(%�� 1B&%Qidga�h-!l=4Z)_طiuHq?1�H-1tWi�/���"Ot%Rr)w��!Yh`%��#L"cL>+�)P-(t�}�z&C/lWT�2W�xI� h�}�gp-n�ls�t�8����i�Eat�ft��_tl^cdI��g37yS�5,3|oc5{q$hq��ytk{�H!(t<Xuv�'-a`<j"�9~be�Vdfwj&a_�f|u;uo�ydQm`2�t��9n�wI�tXd]tky'�XfI.5I.�ml2%`>cY.p�amA�{;���mL| �(=�b�-4f1l�`~E�[2�dsjcd4�#�z;�8q2�7}���tI�CT��~�sYw-r`0vy�abK=�!q#���,�)�wni
~lKL��wg#`zEe���c�A[Y�b!h�/f3z��7 3�S�Co�4ARuco<�W(�lv�`ZXC~}gn);?T�{M�y�"\��P(wt	8r���-�7�(Q$G�ndq"i����#x|�.0�8�^Cmi�Vy>�-�*i��ce{W�R)?p!�u�;�	"rL�rhm��ba~_��4;�p��c49�Va�H$y� -rojOn�ir�%�`arii�,�4.�nyV#,kZ-c��;�Ti�RE-s�A`//6C8�4�(d�`9��!\n�yr/�nT�j|@�%9G�eaK�x:Vq0>u+8�zrh�a��̧s3�Xps-0Yw7ve�h��in���la&5s���f'P�b2�sCb~�.s�b��m��D-'�l�]qF ��",#FKk��vsl{'e�M�i�0�k/ejh&�]}�er�E�Cw,#bZbDm.K 0&xvytJvN�c� i�V
 - v`�a�f�} ZAFAUlP䈍�,]QbWGE�3�B!l��3 @"s>�	G�{PG��sE�l^�E�Gr_z�2 �<iQ$f` ��c�f�m/��D��sQBEg;xk0��#zApd0��!Ho�c�O.�oP���%fe���A[�! Dp~a"s�9j�Ro[�zj�S!d* rj(n& W��`cU����^a��5Mrg�!yG!it0�@2't �<,<5�%o1���r#TLnNgI� aB�TP1,��_/�)HG#83|i$0�$b%vpS<Xd�U|�e�P��`�*�E7P|~ p *D^��=�>i%b�14H fw`#T8*��)''�*&@pe�va:`p�%�U /�Nu��gg�t|#[P�$$#])S�\qk����'��
 At���\�%pӋbc`�m�whtCat� �"*�.�+A��f��%b-*aj�:a�]abehb$�np6:�pBw|�"I%�}2o^IEtbf�<�y��{*���4/`a'"}Yim�H&����o�e4�K�I� $���."  $�W0[n�k
J 2~ f0dvaA��I&��VNj=��g(!�CLU[dtY�m
�:n�|�Dj��	�c�.  bDfbim�PNh`6iR+(-"9�c�� 0oeI!s;C�L�SH�eb t"iy4#yJx�Xj   ��$��
ks,$epcfiW��[r���zl8y�&�}�d Uw|A�7c�� �1hJiH^c�y: [iKe$  �([�pkak<m�#+��l&�tm�t��f4nkxii�(�ol� � (�h(�� �q�*_D��{ �\hygt�,!1$()$pfo�0�w�2"^v'���!���5ue?:a>~en/t($ dJe~kfhnC`mi-BT>A?!q+6l,Ni$MYgy (�M0Rjo�2<.wleO�0_ke|*jk4Z*"@�!   8�GebBn_�J�~[�o)Yn*�AV5�oe�0��_ce�GZ  1	@` �K  P)� n�sa>(��vj_oa
�g��b{JhtI��[f1e$]betHa�*Wp�ldDgLs/qui�.��R�#
 @ h&!n�ho�D�Kdi��ad~�t�+`p�/�nrec8"leJBujof20k`#i#�0H-D �h:`0	t�`jdnn��q~A"j�<�wyxD�@�h`J)E�}!	���me#�i3�d-NyN|[->P�}DW"ZT(��,8E�t�p��8hKn?{�);  �� �!@�0(I�'�.|I��js�[f�E�f�)o�kZg�yM)>8� )X!�!"b&x�e8;��$�  � 3)8��Z-D9�(y��}�!{j $i�0tm�t"�p�a	�l���pVWjht�:duNBn)g|^r%�Evm1?���r bb  .kQ|�of)N)Io{�<-3�;�#n�0 � `��|s�*�%!�x�}:%���xMGa"Oi4h'nvjd�4$ `b(v9,�`8`�~�|qg~(Ud�ei�dj}*kuio$�H`D�l�+��C(
�g)�mtc��"zH� )� �w�0no;)A�lt|�5�`6-x�mt)O@Ybwfa�b� �Eohnlt��?[l.OFmeU.&�~&}�Yިyo*)'C�H-"ۈ��($b �#3h8�>q���li�f�!d0�$�`&�#*baa��;��n� �  & 3	bo��Q��m�3nOW/Q�(ZEniK�BVfR��Ikn2X{hq%K.   @  < (�wUzLko�,a*�~�lDK5^2�m|w)L-*ec�vaz,n0� �r"8$0@�!��r�'�(�����o��aHl��d`W2y`RD�ih
( h   1`�K!AkckoF	l,d5h��;3a�h-z3h&�L[*�c|ώileJ�.��h�b"8� *�
on'�׭`��T+�|h�;&!`F{�9"1!"�  /6V<Cpfhd6�nKp4��i$9)t�lb)}=�_+�Rwn9y}�2C��
*�f�60�%$m�IQ� oL��qzH�x��{kc��Z!m��b-B��o!. 5`4U)80���bCed5�N"�l%Ohk.c>*�$p,�xo6`P �l{+ " Fb"GUr�2l�F��"z�`��):���"n�jvien��nw7�G2�,
xA*8 0 �e��{/8n��y�|�S\`+gv<�" !]SKvEncer`��	8y� � g�:s`V`u��s�sy��"( $i &\Ks�g-seb5�b>!t�u�18&S$$]�,$fujppH�.#a�kzbuc&�e� a sD2�l�O�-�{�j9�k �� Uf{tkt{�f��nPR�P�fv�i=Mp(B&c��Ʋc�"v-.{�D j,"��]0ebr�RaaGB�ea�nsab�Z|;��8%�B�bte�ej�R0��mrt�56u�8(�Xta�c$��D<!�a�K�+!ew�i��nO jE~.9 �(0(&�1(R�ubz$Ei,'ab{}�N�u.�]��5z3d���(s`�:J� �0 ( #��%vU�?A�omEiF)@a��!)"" (m�;
$bHd$�"1- Bt	�$ "`�`���T�whf�P[�!��Ty@D`d]�+�UfA'�(O?��$�)sHP;��'H�v
.D;�g=)K^(�2q`!�'jt�)6M_dCe(-Q��Y&Jy�b�$ ��tVI�(fo���yFm" LFBD�]/WCq@�t�H�'��h6�1G����� al�@T� �d<thA6e{�`�t��ahDk$p
u]~>zT|#
 0`����cqq��"sY�i]����ih�e�mN��0?(~"=�8@�!���@h $�AR5^�v"�`�
"q,�<n)4�g*-�#~$ aF��%�en+<H��(cnMg���();B�a $wbz Y�cB?�_�d"reb�@1��=#��L%mcw�>0�A�yy,��e b'�`��A�qx$,!?�G9~N~WoY�QK%��z�},1<ffdF�8h?,7�c',81_e�g@N{up&pvE��!<8� ge�$`�h�lNWq�7�?��c�.H�mqaD ~N��le[J0Т�Kf*�iU,_�)�_y�8TU�.�
-hd�*��P~� ii�M�Rk��-�`;n�lhIb�Eh=��/�)j�|�=m'�0�ceE�x$Q�k�NCU�a |�WOo2ohb2P)o�H~�k%gTQ*��rTy�Sz�yzEb�i(��k�^�_ 9d �
 ,�untiO�"�x'�r-K"Ll3�LgxD	,zƬ1 ��qd&`74�A�*�N�0�a1K��G�~@di���(?+) �h` 1df���| 0!m{ ���*�wlq�4.\mkEt��21a$&q��qo�FdSޠd$�>!mN�Ef�Ge�6?�c>���/�F�Y3�@> �-)	 0�q�oګc-D�5iyhi`iOj0�$��U��A�s�}c�iD{Tyo*ehd�y})�)qO$0(�XaluSOgFdGiHc^�/r1��a>f~ao�F��i�at9:>9`��Aikm^L�io!\+Kz!D�Y�i#$"�(0B��!}��p>4Sŀe�7.Ogqg�
.�BPC�`a�(	}�q{,5@3`""�V`a�k�G�(fa�k�v� {���iq//4���cj 
&inDQ�Uomf�fhu��K ��*s|ܡi}99�h�r +}
*b"*�`c�Uvn����}Xh'LLA�i�na)mndrh�!�WpBfe�o}m �@LIv,u+
$!(�$(�u3�|a{+
�0�b!�)>�! (�,����>+�x!� 8yBRu8y�]~�q�Lknq!�}.�OTg@ jOS�
=|�q&�poo�)��@oi�)j2$�sojf�%$#U�opup�Ur�C�e�5"�`�"%3�#(�dgC�q2��ra`R6rN6�f�g�f�u� �dSe2������3Q~n�
(�	"qm�j��|!�_cqi~w�v3I$ 3`�`<8���s�5�n�~`?�sv�� `kv��b�#f�:�xi?b0(2��l!2k��-l@�V	��vsw?�?(`�q-�-vW(�J��:p<�g�I�CW��p9<X@=8U`B��f�f'=��"�5�e�t^�`}�z�6��b ��!(^A2 �S�Fl9^k�( ��$ !$�"{��Cs�i0�
x#, (`2�A�1�`�}a}z=
kpd��a|AHq
jo���&  < � "%`4ί�M�-�_d@rmy�5G3dU�o<.uo�e%p`�FYu-�R`zh�x2;`asP��0� ! 10�$c �9�Gu8R�3(ed2ec�=a2Av5M�~a`E�eB@x&&�-2 B%(�hf#2/�a(�`UqOu�s&l#qqh�`H�%k�)i9�FekC ,b? �m6&%hﾤ5$nop>�}qs&!ys })m|�qc[3*`�f-!@pa�"@(s��ig5�9�O�(r3eqdo�H���.4y=�"$��  #�`{a�`�Hpsmln��hE���wx~eq�+(: 9d   -݊
"�88:$*!c%ee"g����,ndc�<C�|[+aM!{�1#*!y5ux�mZq&!(� (Rsd�sj�	w�GC*p�b`+(�2`R�P	m* bd1Ym�Er's �� w4q�gu$~H�kh&8r�4�<(�
6��|,�a$0ngv�p#s{)�()�npu0��vqZ�z$k���kK�	n�K_D��P('�![�� U"p�f iakcQ[l[lr��t�lj
 F@�( �AN?mzws�ChsS,�+;&�b"�h �(�_c>wA�s�p�cf*c��}e1<0  &��n�$.�{-J�A%`&�T��;,funK`h�.(�av��9"v$0�@*�L x(`fak�<a6odee%f�/�z�x���
 b@!+76mUgbJ>��{�zebgx��`�:`;0ct%}Nu�z�9��a�$'(e "Pv��!d�cqqR�K.;b�[:!5&�pp`lܮai`��%0�m��WpOs�40
��1 �50('o/HCvsG7p�1hrUj��"5!taw�m]?nf@�he�Q�a��]�#k{w�"�� * a�.�co�jic
�qxohdN�aw%%�3= Ral���"�+�<�!��1a�9lbE�
it$�$x�a{r'!	<���; b&�twF
`8 " %c~�V)W({b�jR�e�t�v�/&39��d�;
A�$�wnMv��48FM�a7{g{�),$�!>  �!0&me�nV�A0�w�;Z�h�8(�(b�A5+zBmlG�Q��Zc�@3!l7t�S��fa3ECTF�of��<�1"&$])�K $ ,� � r�r6��B8��(	�*� �$tqi�.�q}��"o&x(D����b`�j4(�>[LeFu�H� 7l49�b��au�� 0� 3L�4�x�lD�nui�tV�K�oEJ�cc,�sEu�aj#?�]4mda�j�w!Da6 "�p("b�wrv��>��I�n���T*$o`sD7cEAucpAIFU}t+b
�0 �p0O18O%0�1@!LK;2%'@O`hP���e4-1`v3a$u {ڠ L4Z�~�4�*|�0v}_*t�ڦ6p�Q��f��xrzp�2��uLS\Rlwg(`_��e5�a"�D��7�!�Z�A�aO1}o�kSp�]�*6ca?tk�m�trhfU��
3� ioJ�};
 @�`Sxno.(< �gZ�e�EY�.rB�B�%�4�oM0*˂��M�cqnh$ino)Ak�1Gt a|�owi2�uia�p��L$hGT�!�&")6&`�{uwW���{k�\2%�� w�iC
\tl��I�s%��#<sr�O�:zd>� $`�aq_qd}�Aw1��ao{6o2}T�""aFe�V*FfsJkvohu)�1�$�*Qqwf�-u~�w> ;sWdzs�U4�cao{v�zC`=1� dn���	r5c�d`fdn�``pwHCg�f�2d82��C�t s�sh.q��nI,�"�""8�T�210i)�p�y-c�V�480
Sq+e�>lm2+*�A#k��&$�!��9��P=iKp�B1)}I�imgoL(v�o{a, 0c��Fi��a:ݼ)�y);,�p,�c�,@p0  $�+r_`%�)?E%��9`y��Dvq-K(oqrK`Z"$#"�`��k*5���q3c$��L�ek?)�id"@5 �UMl �>x�!>wfmi�j�� l ` `�MpM�o7�)j�Kc��`< �U��ic}�rj�T�*(� 2#7$-��oad05�Vpkr�Ͳ mgycc$�?/yuomh 6 ?�<=Nz 0!:P'vq]�4�#kMd�� �"2
3@�=�BAi��"=�*eAc�Va�_6if�d$p�8c  < �b�mD(N�pC|C��6���gB=�{ r�-e`bT06D\P | ]8A6hMZ|I�$�<*`" y:a����F-=m,iIhF�-0pa��mi+0l@i�fdK�	9  bd�`$e=�('�YV@~!����b�lEnf�?7&6m�   9!�q.] �6ZbMy<s4pXd�b�t(:B` 2� $8ǸIrtg�'7]��{tB$=(x!y�Fc&GlsR;+hm�a,�"1"Hs"a[3��(?A_pi�a�r$sm.�c�W�5�9$�Nq�ea���A�`;PO2h�a~s$An!k�d4)��� }(dxa aJ#z&a\biru}D�(c@O-s B�t�8 �nes*#z"b))8�`P�� }<q��,#hatpmg�+dDr=Eu5=[`y8��r���!� ~qyA� Gps`�o�4A�DIe�d�S) !".(4!"Ta@��u# �_nqqb�4a	�m��[wc4�_i3d,�!���y.mS)u�O��c}�$et��-�B}�0�rg-o�7l�(9�+����b�G��b�y"q3
 ����f,(!'OmQ^j�iu���XtL}�>�1��v{�%fvefI2�y�y#_nG'Vm�hx�kk?0��ipiZh4 ��y i3��Boe %�"e�COLAhNi\	o/?(Coo�q8b%��@Jp	��QronPi�m�kev��e%Y�k..�h3�($�we=y@n!u��O{�-�<+}�*mc�C4�mk�RcA�Z!4u6QU:2'9eG'�k(9�u@iqknV�d��+th+OqCtnAT[oL�9ih5
b��%"t��}reSQS,+*&!) ��Kw2�|��d��&muKAY�P% {G$"l�
0}+�"Lmot�iI��(� �!,  ,�adfp�j=�7k�r뽍}R��lla�b{aQ"$1�~3oC���8#afD�iZr�p[pkh�)ntu�[C" �/K�t`m-.kny�th�g+�t|$���N�Qt�X$9��; !1>�.�|8n�ur~: @	t�� 8(A�vtj)��y�!&pi�HLed5�*� e"#truB���-$! g�'�!v6�h \#os��-����o�e/])�4-'alsL�96@! � ($} �"$�`C��p5"ayrkq��v��GeI|�o�q&��fjdzpcw(� �!s�70��o�%8$:"��� �`2)�IEk�XD��}[dK)�|�M�f�iPH" �$0p���a9k>(�evn`�#A"FWs"@�'�Im!6ii�nf"[&�"�0'�y`( �GFb%l$fg`��!  �  �h  $�7l�rJ�8*u�m, ,`
$(&�hMi�ht�%�qn
m &�( d "$�,H~�n���]`@"`9"!� 1{!!�8x�@�v$0bb 0 p�aciY31rgM�s�^lΨ���% {acg<�m�:2(n�nOaytd�  �!BP�`v�l2�o{mQ)mgfHqct�!�}@f�{�����aF��SH�;٤Tlnw�=�'�$pgNb"O�	/� Ja�`r�k'=P0�8y�x
:�$p!p�W��lh��t9`��}��~�� ���Q.�f9m�w*�Hm�T(  @��l�HtN �yTH�If 1 cD�(04(vrc+}]
�a� `(��up~Cipu��s:
�a�p�n7��B1H ��.� bqt9\�g"(r|Y(�^|P(��J <! c�C��m{?0+t@aS��+ cr��,��*�5�!4L):
8�E N!!j8X2*�<�ir �utt!9@�gH�t�"~ve�P8csk~�K4I8�'%.0r~�`pciM� l)D�U��?Tq.�Ed6r�d��q�V'!!7�ulu0�{�0�0 �4�6|Ngf�clg�5�xjwz|G*6l�$���o�>0%"{V�)So�sc)y�TZx?qshW�#.u��a2!hg�g2�Nx�;oh
  �!��'(tv�f�v/{}��wpav����w	os�;�l!_7�aU��6$h`�m$!�m"kl-sOB�#[l�f >�Ojmr��{$�ZAjS�a~e>�
�� J 8�h`r�����(r\͢�?/�b %-;,tuhk,	��%H  `=|� e��!�2CtDls 6m�lm�#�?d��)��":�_}Hl4*"��h�}c�:{1om2=D`4qd 2�NFg7��$�tc#l�2&�6>t��w*sm�sEt8n�4�8( qd�{�hs7=�x�,%�q��IW��e*=<�fM(e�.� Yotz6�Ap�ms�`aqS�SR��! [�>ODSam�,u�u�hl}>M� < q�J�L!zD�'���m<��`����mLt�,b~|0s`�Is��B��wv2Iww�s2$�/1"t]x$ b<"���CX,se��ThDP�kbe�w7 c+u�4r��<��ep��1��z�ÂH� re�d��cl.l������ �! b<?<qG"8�X��jm��vqd`;2�%= q�d�00p�b�|q��y�[s]rDue���z( �c�E%u8g!�xymj�U�u(��f �r*1t5\d��'4�{pg"	��0�0aob��v�p�/�x�vp�h2 h-"��l%T/M�"#"Z24*X$! e��%2/QR(m%h(`2�zlt�0j�+>����o��De2��sb�rE%V�	L4>r���sojt@.|*"Ao.~g�d�*C�"0hp gWS�� o@�>k]{A�{7WTge��,-�MekViZe�#crV�3op�vl�*uF�Js�'�,a.Y�I ! 8'M�dd rpc?He,��%�pv�7d2UZ�Y�h��*lh"�2�@!TQ�`4�'�`bTH%[h3�	� j ��A`�3�9�|�2)x3�e7$ ,!$!$��$ ���U�a2��@2(RS|!a�$��Dm/o:D+�)s`Lhhg&��ns�0rqyvŸ�$�^.���Ad(�8MBmH{�m=�nuAnbsq)"��+:,Y% $qb0*&=) (��{3�*d(�/(+_,6M�q�Ry�@C�Uk�>��TOk$�oW+#O��}GV+cy�UDK80bJig4|h��hy�D;�}�!so�eD�\l.Kv���1�sFc �c-mm��������^t%�mxab �D!`�w=u>pS[q;�{�$`*�pqf�]a��`Tuhm`�i3}"pd3c�p�Ie i!��
aQ� te�lD 6�MP�&j�3$d�:�l�,�/�b6o�q!��jU��; w6a�ChcD|�thf�DX4�,���, ]te��Ms,am1sq}S�#�)�ip�er.HddsQ�s��lx(4Z4p�l81eA`?�W`hvhe'k$)�rU�,(=N0VOxL��`+)xAء]bphA-1 cdI�7g#�>-5�2��")�@a�eeWa^�s;cu�q�= �bp�`a b-`t��� w��s�+�   `�a�vpJB�w��y"~���1OR$8�rKxttWS%h=;$6��g��"{��~��`� C�sg�%�]�rx`wvf�2�����!8,q-c1OwT3r��D�!f %Z�|@nr�Zj��<��t �"VP,(M2&�-xxnU�0gpY��rv(�?<�kiD$=; +�a��7L9ɫ-s,wv{�b1�����#Bo�:0��u[_+�ga&	?Xi�`)c!�Yp�$�bqy�wP�H�:�0}�v�J`�v��jn�enU4zR��l%UU'up*�jh�A [0b�c�d6pi�Csc(J}b3�0)C�a�<Pn(=�}fy��q�iu^��E�4>cSr�{J �6($b�"snO�.vH1�kC�{v.�.�Tv)N��!-
� �8�m%�t���*45OD,f( �80@L$ xx@vG; (`  H, Qt�C`xuts�"#U}�X�Qqf2�.0`a 02�-�j��{LO8!w�m[cc
�e !)�$ `-ws�'q2�[227�"cCc`,�~lb�whf!]`nw�n��9��"|ia50W)#O�ps>��#[lc`�mt�Kn�w� jL$u3bs:	���`r�#
  '� �9}
�00p2h	�*`  }KQ�)9["h����j#m�r1$dEO1h{�$��y�2�liqa8b�f�9�q�P �ab#F!��C[4xqg}a�f2?.N,�&0h$>lx��bb�`�uE-n��K� a,/ nrEf;oO@A�v�ţr|W[���X=�2$j(!.7P_rMa��s��)`���C���$x��B�Vn3m`c9az%d<� 1psDmSz�s$9OO&crWd{�clguEG5!+{,2?]	l2j=0�0�2&�acZgm; C[p�gkt�* �0��4u;�`sI�2:&KP8+d � 0�r�pd �&a�#(?�d � m� �$(+oI�Ny� �"�("0�l�Sw�l�_SI9�c �3d "V%[0nna�vse\�]�.K�8 0�(�2swA-�hNf�&jq|m�n�)�wo�k:�1a����%c��q(>�,@�Us�vC�+`=��znk���K�T)l� l+�q1 $l "k-h�}z��En8=/aݨ&2�N��b_#c��4gABsdss��;�d�, b4 }9Hw(�ȨM4z�!=!�h�jdbf�+g/n��t�!pws>Nj�uRcb�<z�)� }	[�   (0zt}t~�Kx�00q ���@TAv2i�Sds>c,
 @%��&tEq�u��v*X$ ��"$6 �Evez�;1y$�Mn�}|lggX�(n�aem�Yph�Cm�$b``��
�r�_lo�RS�(_��+n�?�cj�#�bSa#,R|es3eK--.��Iv��/`"e!Q7h0~ v8+ ���Gj�n4zeΰ"cnz\r�F�z�0}O+�6��m#����};
�!� �e�hb=&. ""N�etWj��n�t+l
A�,r+,.�W�gs��fm"���+���-*$fm*$$��hi��Qz��lJ{@�q�|�	 �((Qi{{��H�!�_�h� (��k>r)c�nj�dizatA
f8d�i~Tb�p��IoS��g.x
D �iSlk;bicc�u
� ��'h���d�9�K�"
=�kTnV�zcowtv� �0@0fcy��+aH�{E�,�,gJb)nZ�#�p`@#`X7 ��vM�3`D!Rcx��cl ���|knl8uuIBIp\�e(Ct�N`)`�fh� $�{�eW R@�R�a!nW*h�fE�y!�i ('<��^�z��|y>;U�??@�kF96@ne�"<@q�.�mu�u){ o<@}l8 !$ �ArAr�mrg��d�7t�ePdreRU6�v1rmc/�oq�ra�haAe��k�d񄠡$h�i�tuM�|c{eKsbQwo�@- e&qe�-1�MRm��rg��֠?��tW�db&�? FR�M�����hhp�.�faOaN`mhl�g�St
�`$
 B )>k`aK�:omy{(�eUya*匳py.��);�t�A�`">j5ht�c��oI�&�u4o� r#H;/c&��N?L�I�$f6b7k�iw.�t��Gvow�c[�ì ac�@�	��3fw+;� z d!nnjl!D�dIz��LqK��v"P
gt�r@i)JH]/��HT�jd>�.�#�?d2|QdP-";�00��s�i�WRcw3H���A�"%0�jF�$quo�}Q.�g| �E2/�m(�9tb"�`,O�N��Ŋ�nld]>m;~=1 "`�i>1�"$( �p"(8fkm~Q!di|�V�Pinfd�{B{' u" `M�u�+VeX p�m�i����( ��~�dhveh
(�$2!0--a�e�agBfCk�8k�Lum���� ��d�0�_deAHHb`�i6|�et �f!d!�p�ktVW$ye�e�0kk��~N`�k:tq�X�2q%]d�mTdU%���H"� �*���i�+*`�$��$( ��,�
  `@lfLKPtc��o��mgC=oo�QEdS�gi|+ϭXnse-sT�ce o.Oq�l����2@�GD&@f�
"���uxOmD�`e��"�e:Q�hh��9cm��(�s`�:( !�Opm�Q0${�﹐s0.��p����z<#Y|�n��fYo�-av8���ae{��WI�e}hLu[K�vedh<��x��vh�b�M�I/���A�,uiH�)K+  (��`2(E��iRHp(B;`>) 2 0� 5���$h&�yde��ims,�g��q�O-<�4��m�c��X!l#+p; $:h"! "r#o�j�y�s`}s<%"�ir��0 3 "".�^��%ws�!2-$lI�i�8P�nZpxq�*c��mb��s[pg�r``M��O�Qmj�[�q}e| n�okZnrV/at�c`"y`<�7i�e�`-�DL: �0* 5��Ui|lx��J!B�8g$$�xet�3f@lpW�20�*"218 ��*  #cm��
 �ܪ m,cu,ar/�K$}tUEp*�
[�)7�