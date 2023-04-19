/*!
  * Bootstrap v5.1.2 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@popperjs/core')) :
  typeof define === 'function' && define.amd ? define(['@popperjs/core'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bootstrap = factory(global.Popper));
})(this, (function (Popper) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    const n = Object.create(null);
    if (e) {
      for (const k in e) {
        if (k !== 'default') {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }

  const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const MAX_UID = 1000000;
  const MILLISECONDS_MULTIPLIER = 1000;
  const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  const toType = obj => {
    if (obj === null || obj === undefined) {
      return `${obj}`;
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  const getUID = prefix => {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));

    return prefix;
  };

  const getSelector = element => {
    let selector = element.getAttribute('data-bs-target');

    if (!selector || selector === '#') {
      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273

      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
        return null;
      } // Just in case some CMS puts out a full URL with the anchor appended


      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
        hrefAttr = `#${hrefAttr.split('#')[1]}`;
      }

      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
    }

    return selector;
  };

  const getSelectorFromElement = element => {
    const selector = getSelector(element);

    if (selector) {
      return document.querySelector(selector) ? selector : null;
    }

    return null;
  };

  const getElementFromSelector = element => {
    const selector = getSelector(element);
    return selector ? document.querySelector(selector) : null;
  };

  const getTransitionDurationFromElement = element => {
    if (!element) {
      return 0;
    } // Get transition-duration of the element


    let {
      transitionDuration,
      transitionDelay
    } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    } // If multiple durations are defined, take the first


    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };

  const triggerTransitionEnd = element => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };

  const isElement = obj => {
    if (!obj || typeof obj !== 'object') {
      return false;
    }

    if (typeof obj.jquery !== 'undefined') {
      obj = obj[0];
    }

    return typeof obj.nodeType !== 'undefined';
  };

  const getElement = obj => {
    if (isElement(obj)) {
      // it's a jQuery object or a node element
      return obj.jquery ? obj[0] : obj;
    }

    if (typeof obj === 'string' && obj.length > 0) {
      return document.querySelector(obj);
    }

    return null;
  };

  const typeCheckConfig = (componentName, config, configTypes) => {
    Object.keys(configTypes).forEach(property => {
      const expectedTypes = configTypes[property];
      const value = config[property];
      const valueType = value && isElement(value) ? 'element' : toType(value);

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
      }
    });
  };

  const isVisible = element => {
    if (!isElement(element) || element.getClientRects().length === 0) {
      return false;
    }

    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
  };

  const isDisabled = element => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }

    if (element.classList.contains('disabled')) {
      return true;
    }

    if (typeof element.disabled !== 'undefined') {
      return element.disabled;
    }

    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
  };

  const findShadowRoot = element => {
    if (!document.documentElement.attachShadow) {
      return null;
    } // Can find the shadow root otherwise it'll return the document


    if (typeof element.getRootNode === 'function') {
      const root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }

    if (element instanceof ShadowRoot) {
      return element;
    } // when we don't find a shadow root


    if (!element.parentNode) {
      return null;
    }

    return findShadowRoot(element.parentNode);
  };

  const noop = () => {};
  /**
   * Trick to restart an element's animation
   *
   * @param {HTMLElement} element
   * @return void
   *
   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
   */


  const reflow = element => {
    // eslint-disable-next-line no-unused-expressions
    element.offsetHeight;
  };

  const getjQuery = () => {
    const {
      jQuery
    } = window;

    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return jQuery;
    }

    return null;
  };

  const DOMContentLoadedCallbacks = [];

  const onDOMContentLoaded = callback => {
    if (document.readyState === 'loading') {
      // add listener on the first call when the document is in loading state
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener('DOMContentLoaded', () => {
          DOMContentLoadedCallbacks.forEach(callback => callback());
        });
      }

      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };

  const isRTL = () => document.documentElement.dir === 'rtl';

  const defineJQueryPlugin = plugin => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      /* istanbul ignore if */

      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;

        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };

  const execute = callback => {
    if (typeof callback === 'function') {
      callback();
    }
  };

  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }

    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;

    const handler = ({
      target
    }) => {
      if (target !== transitionElement) {
        return;
      }

      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };

    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };
  /**
   * Return the previous/next element of a list.
   *
   * @param {array} list    The list of elements
   * @param activeElement   The active element
   * @param shouldGetNext   Choose to get next or previous element
   * @param isCycleAllowed
   * @return {Element|elem} The proper element
   */


  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element depending on the direction and if cycle is allowed

    if (index === -1) {
      return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
    }

    const listLength = list.length;
    index += shouldGetNext ? 1 : -1;

    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }

    return list[Math.max(0, Math.min(index, listLength - 1))];
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  const stripNameRegex = /\..*/;
  const stripUidRegex = /::\d+$/;
  const eventRegistry = {}; // Events storage

  let uidEvent = 1;
  const customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  const customEventsRegex = /^(mouseenter|mouseleave)/i;
  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
  /**
   * ------------------------------------------------------------------------
   * Private methods
   * ------------------------------------------------------------------------
   */

  function getUidEvent(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
  }

  function getEvent(element) {
    const uid = getUidEvent(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }

  function bootstrapHandler(element, fn) {
    return function handler(event) {
      event.delegateTarget = element;

      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }

      return fn.apply(element, [event]);
    };
  }

  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);

      for (let {
        target
      } = event; target && target !== this; target = target.parentNode) {
        for (let i = domElements.length; i--;) {
          if (domElements[i] === target) {
            event.delegateTarget = target;

            if (handler.oneOff) {
              EventHandler.off(element, event.type, selector, fn);
            }

            return fn.apply(target, [event]);
          }
        }
      } // To please ESLint


      return null;
    };
  }

  function findHandler(events, handler, delegationSelector = null) {
    const uidEventList = Object.keys(events);

    for (let i = 0, len = uidEventList.length; i < len; i++) {
      const event = events[uidEventList[i]];

      if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
        return event;
      }
    }

    return null;
  }

  function normalizeParams(originalTypeEvent, handler, delegationFn) {
    const delegation = typeof handler === 'string';
    const originalHandler = delegation ? delegationFn : handler;
    let typeEvent = getTypeEvent(originalTypeEvent);
    const isNative = nativeEvents.has(typeEvent);

    if (!isNative) {
      typeEvent = originalTypeEvent;
    }

    return [delegation, originalHandler, typeEvent];
  }

  function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    if (!handler) {
      handler = delegationFn;
      delegationFn = null;
    } // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    // this prevents the handler from being dispatched the same way as mouseover or mouseout does


    if (customEventsRegex.test(originalTypeEvent)) {
      const wrapFn = fn => {
        return function (event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn.call(this, event);
          }
        };
      };

      if (delegationFn) {
        delegationFn = wrapFn(delegationFn);
      } else {
        handler = wrapFn(handler);
      }
    }

    const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
    const events = getEvent(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

    if (previousFn) {
      previousFn.oneOff = previousFn.oneOff && oneOff;
      return;
    }

    const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
    const fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
    fn.delegationSelector = delegation ? handler : null;
    fn.originalHandler = originalHandler;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, delegation);
  }

  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);

    if (!fn) {
      return;
    }

    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }

  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach(handlerKey => {
      if (handlerKey.includes(namespace)) {
        const event = storeElementEvent[handlerKey];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  }

  function getTypeEvent(event) {
    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    event = event.replace(stripNameRegex, '');
    return customEvents[event] || event;
  }

  const EventHandler = {
    on(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, false);
    },

    one(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, true);
    },

    off(element, originalTypeEvent, handler, delegationFn) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }

      const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getEvent(element);
      const isNamespace = originalTypeEvent.startsWith('.');

      if (typeof originalHandler !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!events || !events[typeEvent]) {
          return;
        }

        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
        return;
      }

      if (isNamespace) {
        Object.keys(events).forEach(elementEvent => {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        });
      }

      const storeElementEvent = events[typeEvent] || {};
      Object.keys(storeElementEvent).forEach(keyHandlers => {
        const handlerKey = keyHandlers.replace(stripUidRegex, '');

        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          const event = storeElementEvent[keyHandlers];
          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
        }
      });
    },

    trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }

      const $ = getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      const isNative = nativeEvents.has(typeEvent);
      let jQueryEvent;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;
      let evt = null;

      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }

      if (isNative) {
        evt = document.createEvent('HTMLEvents');
        evt.initEvent(typeEvent, bubbles, true);
      } else {
        evt = new CustomEvent(event, {
          bubbles,
          cancelable: true
        });
      } // merge custom information in our event


      if (typeof args !== 'undefined') {
        Object.keys(args).forEach(key => {
          Object.defineProperty(evt, key, {
            get() {
              return args[key];
            }

          });
        });
      }

      if (defaultPrevented) {
        evt.preventDefault();
      }

      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }

      if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
        jQueryEvent.preventDefault();
      }

      return evt;
    }

  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const elementMap = new Map();
  const Data = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, new Map());
      }

      const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used

      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }

      instanceMap.set(key, instance);
    },

    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }

      return null;
    },

    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }

      const instanceMap = elementMap.get(element);
      instanceMap.delete(key); // free up element references if there are no instances left for an element

      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }

  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const VERSION = '5.1.2';

  class BaseComponent {
    constructor(element) {
      element = getElement(element);

      if (!element) {
        return;
      }

      this._element = element;
      Data.set(this._element, this.constructor.DATA_KEY, this);
    }

    dispose() {
      Data.remove(this._element, this.constructor.DATA_KEY);
      EventHandler.off(this._element, this.constructor.EVENT_KEY);
      Object.getOwnPropertyNames(this).forEach(propertyName => {
        this[propertyName] = null;
      });
    }

    _queueCallback(callback, element, isAnimated = true) {
      executeAfterTransition(callback, element, isAnimated);
    }
    /** Static */


    static getInstance(element) {
      return Data.get(getElement(element), this.DATA_KEY);
    }

    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
    }

    static get VERSION() {
      return VERSION;
    }

    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }

    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }

    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): util/component-functions.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const enableDismissTrigger = (component, method = 'hide') => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    const name = component.NAME;
    EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
      if (['A', 'AREA'].includes(this.tagName)) {
        event.preventDefault();
      }

      if (isDisabled(this)) {
        return;
      }

      const target = getElementFromSelector(this) || this.closest(`.${name}`);
      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

      instance[method]();
    });
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$d = 'alert';
  const DATA_KEY$c = 'bs.alert';
  const EVENT_KEY$c = `.${DATA_KEY$c}`;
  const EVENT_CLOSE = `close${EVENT_KEY$c}`;
  const EVENT_CLOSED = `closed${EVENT_KEY$c}`;
  const CLASS_NAME_FADE$5 = 'fade';
  const CLASS_NAME_SHOW$8 = 'show';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Alert extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$d;
    } // Public


    close() {
      const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);

      if (closeEvent.defaultPrevented) {
        return;
      }

      this._element.classList.remove(CLASS_NAME_SHOW$8);

      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);

      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
    } // Private


    _destroyElement() {
      this._element.remove();

      EventHandler.trigger(this._element, EVENT_CLOSED);
      this.dispose();
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Alert.getOrCreateInstance(this);

        if (typeof config !== 'string') {
          return;
        }

        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](this);
      });
    }

  }
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  enableDismissTrigger(Alert, 'close');
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Alert to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Alert);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$c = 'button';
  const DATA_KEY$b = 'bs.button';
  const EVENT_KEY$b = `.${DATA_KEY$b}`;
  const DATA_API_KEY$7 = '.data-api';
  const CLASS_NAME_ACTIVE$3 = 'active';
  const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
  const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$b}${DATA_API_KEY$7}`;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Button extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$c;
    } // Public


    toggle() {
      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Button.getOrCreateInstance(this);

        if (config === 'toggle') {
          data[config]();
        }
      });
    }

  }
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
    event.preventDefault();
    const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
    const data = Button.getOrCreateInstance(button);
    data.toggle();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Button to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Button);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  function normalizeData(val) {
    if (val === 'true') {
      return true;
    }

    if (val === 'false') {
      return false;
    }

    if (val === Number(val).toString()) {
      return Number(val);
    }

    if (val === '' || val === 'null') {
      return null;
    }

    return val;
  }

  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
  }

  const Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },

    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },

    getDataAttributes(element) {
      if (!element) {
        return {};
      }

      const attributes = {};
      Object.keys(element.dataset).filter(key => key.startsWith('bs')).forEach(key => {
        let pureKey = key.replace(/^bs/, '');
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      });
      return attributes;
    },

    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    },

    offset(element) {
      const rect = element.getBoundingClientRect();
      return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
      };
    },

    position(element) {
      return {
        top: element.offsetTop,
        left: element.offsetLeft
      };
    }

  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const NODE_TEXT = 3;
  const SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },

    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector);
    },

    children(element, selector) {
      return [].concat(...element.children).filter(child => child.matches(selector));
    },

    parents(element, selector) {
      const parents = [];
      let ancestor = element.parentNode;

      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
        if (ancestor.matches(selector)) {
          parents.push(ancestor);
        }

        ancestor = ancestor.parentNode;
      }

      return parents;
    },

    prev(element, selector) {
      let previous = element.previousElementSibling;

      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }

        previous = previous.previousElementSibling;
      }

      return [];
    },

    next(element, selector) {
      let next = element.nextElementSibling;

      while (next) {
        if (next.matches(selector)) {
          return [next];
        }

        next = next.nextElementSibling;
      }

      return [];
    },

    focusableChildren(element) {
      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(', ');
      return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
    }

  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$b = 'carousel';
  const DATA_KEY$a = 'bs.carousel';
  const EVENT_KEY$a = `.${DATA_KEY$a}`;
  const DATA_API_KEY$6 = '.data-api';
  const ARROW_LEFT_KEY = 'ArrowLeft';
  const ARROW_RIGHT_KEY = 'ArrowRight';
  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  const SWIPE_THRESHOLD = 40;
  const Default$a = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  const DefaultType$a = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  const ORDER_NEXT = 'next';
  const ORDER_PREV = 'prev';
  const DIRECTION_LEFT = 'left';
  const DIRECTION_RIGHT = 'right';
  const KEY_TO_DIRECTION = {
    [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
    [ARROW_RIGHT_KEY]: DIRECTION_LEFT
  };
  const EVENT_SLIDE = `slide${EVENT_KEY$a}`;
  const EVENT_SLID = `slid${EVENT_KEY$a}`;
  const EVENT_KEYDOWN = `keydown${EVENT_KEY$a}`;
  const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY$a}`;
  const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY$a}`;
  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$a}`;
  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$a}`;
  const EVENT_TOUCHEND = `touchend${EVENT_KEY$a}`;
  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$a}`;
  const EVENT_POINTERUP = `pointerup${EVENT_KEY$a}`;
  const EVENT_DRAG_START = `dragstart${EVENT_KEY$a}`;
  const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$a}${DATA_API_KEY$6}`;
  const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;
  const CLASS_NAME_CAROUSEL = 'carousel';
  const CLASS_NAME_ACTIVE$2 = 'active';
  const CLASS_NAME_SLIDE = 'slide';
  const CLASS_NAME_END = 'carousel-item-end';
  const CLASS_NAME_START = 'carousel-item-start';
  const CLASS_NAME_NEXT = 'carousel-item-next';
  const CLASS_NAME_PREV = 'carousel-item-prev';
  const CLASS_NAME_POINTER_EVENT = 'pointer-event';
  const SELECTOR_ACTIVE$1 = '.active';
  const SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
  const SELECTOR_ITEM = '.carousel-item';
  const SELECTOR_ITEM_IMG = '.carousel-item img';
  const SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
  const SELECTOR_INDICATORS = '.carousel-indicators';
  const SELECTOR_INDICATOR = '[data-bs-target]';
  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
  const POINTER_TYPE_TOUCH = 'touch';
  const POINTER_TYPE_PEN = 'pen';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Carousel extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent);

      this._addEventListeners();
    } // Getters


    static get Default() {
      return Default$a;
    }

    static get NAME() {
      return NAME$b;
    } // Public


    next() {
      this._slide(ORDER_NEXT);
    }

    nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    }

    prev() {
      this._slide(ORDER_PREV);
    }

    pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
        triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    }

    cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config && this._config.interval && !this._isPaused) {
        this._updateInterval();

        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    }

    to(index) {
      this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

      const activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;

      this._slide(order, this._items[index]);
    } // Private


    _getConfig(config) {
      config = { ...Default$a,
        ...Manipulator.getDataAttributes(this._element),
        ...(typeof config === 'object' ? config : {})
      };
      typeCheckConfig(NAME$b, config, DefaultType$a);
      return config;
    }

    _handleSwipe() {
      const absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      const direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0;

      if (!direction) {
        return;
      }

      this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
    }

    _addEventListeners() {
      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
      }

      if (this._config.pause === 'hover') {
        EventHandler.on(this._element, EVENT_MOUSEENTER, event => this.pause(event));
        EventHandler.on(this._element, EVENT_MOUSELEAVE, event => this.cycle(event));
      }

      if (this._config.touch && this._touchSupported) {
        this._addTouchEventListeners();
      }
    }

    _addTouchEventListeners() {
      const hasPointerPenTouch = event => {
        return this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
      };

      const start = event => {
        if (hasPointerPenTouch(event)) {
          this.touchStartX = event.clientX;
        } else if (!this._pointerEvent) {
          this.touchStartX = event.touches[0].clientX;
        }
      };

      const move = event => {
        // ensure swiping with one touch and not pinching
        this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this.touchStartX;
      };

      const end = event => {
        if (hasPointerPenTouch(event)) {
          this.touchDeltaX = event.clientX - this.touchStartX;
        }

        this._handleSwipe();

        if (this._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          this.pause();

          if (this.touchTimeout) {
            clearTimeout(this.touchTimeout);
          }

          this.touchTimeout = setTimeout(event => this.cycle(event), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
        }
      };

      SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(itemImg => {
        EventHandler.on(itemImg, EVENT_DRAG_START, event => event.preventDefault());
      });

      if (this._pointerEvent) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, event => start(event));
        EventHandler.on(this._element, EVENT_POINTERUP, event => end(event));

        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, event => start(event));
        EventHandler.on(this._element, EVENT_TOUCHMOVE, event => move(event));
        EventHandler.on(this._element, EVENT_TOUCHEND, event => end(event));
      }
    }

    _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      const direction = KEY_TO_DIRECTION[event.key];

      if (direction) {
        event.preventDefault();

        this._slide(direction);
      }
    }

    _getItemIndex(element) {
      this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
      return this._items.indexOf(element);
    }

    _getItemByOrder(order, activeElement) {
      const isNext = order === ORDER_NEXT;
      return getNextActiveElement(this._items, activeElement, isNext, this._config.wrap);
    }

    _triggerSlideEvent(relatedTarget, eventDirectionName) {
      const targetIndex = this._getItemIndex(relatedTarget);

      const fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));

      return EventHandler.trigger(this._element, EVENT_SLIDE, {
        relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
    }

    _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE$1, this._indicatorsElement);
        activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
        activeIndicator.removeAttribute('aria-current');
        const indicators = SelectorEngine.find(SELECTOR_INDICATOR, this._indicatorsElement);

        for (let i = 0; i < indicators.length; i++) {
          if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) {
            indicators[i].classList.add(CLASS_NAME_ACTIVE$2);
            indicators[i].setAttribute('aria-current', 'true');
            break;
          }
        }
      }
    }

    _updateInterval() {
      const element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

      if (!element) {
        return;
      }

      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);

      if (elementInterval) {
        this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
        this._config.interval = elementInterval;
      } else {
        this._config.interval = this._config.defaultInterval || this._config.interval;
      }
    }

    _slide(directionOrOrder, element) {
      const order = this._directionToOrder(directionOrOrder);

      const activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

      const activeElementIndex = this._getItemIndex(activeElement);

      const nextElement = element || this._getItemByOrder(order, activeElement);

      const nextElementIndex = this._getItemIndex(nextElement);

      const isCycling = Boolean(this._interval);
      const isNext = order === ORDER_NEXT;
      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;

      const eventDirectionName = this._orderToDirection(order);

      if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$2)) {
        this._isSliding = false;
        return;
      }

      if (this._isSliding) {
        return;
      }

      const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.defaultPrevented) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      this._activeElement = nextElement;

      const triggerSlidEvent = () => {
        EventHandler.trigger(this._element, EVENT_SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });
      };

      if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
        nextElement.classList.add(orderClassName);
        reflow(nextElement);
        activeElement.classList.add(directionalClassName);
        nextElement.classList.add(directionalClassName);

        const completeCallBack = () => {
          nextElement.classList.remove(directionalClassName, orderClassName);
          nextElement.classList.add(CLASS_NAME_ACTIVE$2);
          activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
          this._isSliding = false;
          setTimeout(triggerSlidEvent, 0);
        };

        this._queueCallback(completeCallBack, activeElement, true);
      } else {
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        this._isSliding = false;
        triggerSlidEvent();
      }

      if (isCycling) {
        this.cycle();
      }
    }

    _directionToOrder(direction) {
      if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
        return direction;
      }

      if (isRTL()) {
        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
      }

      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
    }

    _orderToDirection(order) {
      if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
        return order;
      }

      if (isRTL()) {
        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
      }

      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
    } // Static


    static carouselInterface(element, config) {
      const data = Carousel.getOrCreateInstance(element, config);
      let {
        _config
      } = data;

      if (typeof config === 'object') {
        _config = { ..._config,
          ...config
        };
      }

      const action = typeof config === 'string' ? config : _config.slide;

      if (typeof config === 'number') {
        data.to(config);
      } else if (typeof action === 'string') {
        if (typeof data[action] === 'undefined') {
          throw new TypeError(`No method named "${action}"`);
        }

        data[action]();
      } else if (_config.interval && _config.ride) {
        data.pause();
        data.cycle();
      }
    }

    static jQueryInterface(config) {
      return this.each(function () {
        Carousel.carouselInterface(this, config);
      });
    }

    static dataApiClickHandler(event) {
      const target = getElementFromSelector(this);

      if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
        return;
      }

      const config = { ...Manipulator.getDataAttributes(target),
        ...Manipulator.getDataAttributes(this)
      };
      const slideIndex = this.getAttribute('data-bs-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel.carouselInterface(target, config);

      if (slideIndex) {
        Carousel.getInstance(target).to(slideIndex);
      }

      event.preventDefault();
    }

  }
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
  EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
    const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

    for (let i = 0, len = carousels.length; i < len; i++) {
      Carousel.carouselInterface(carousels[i], Carousel.getInstance(carousels[i]));
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Carousel to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Carousel);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$a = 'collapse';
  const DATA_KEY$9 = 'bs.collapse';
  const EVENT_KEY$9 = `.${DATA_KEY$9}`;
  const DATA_API_KEY$5 = '.data-api';
  const Default$9 = {
    toggle: true,
    parent: null
  };
  const DefaultType$9 = {
    toggle: 'boolean',
    parent: '(null|element)'
  };
  const EVENT_SHOW$5 = `show${EVENT_KEY$9}`;
  const EVENT_SHOWN$5 = `shown${EVENT_KEY$9}`;
  const EVENT_HIDE$5 = `hide${EVENT_KEY$9}`;
  const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$9}`;
  const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$9}${DATA_API_KEY$5}`;
  const CLASS_NAME_SHOW$7 = 'show';
  const CLASS_NAME_COLLAPSE = 'collapse';
  const CLASS_NAME_COLLAPSING = 'collapsing';
  const CLASS_NAME_COLLAPSED = 'collapsed';
  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
  const WIDTH = 'width';
  const HEIGHT = 'height';
  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
  const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Collapse extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._isTransitioning = false;
      this._config = this._getConfig(config);
      this._triggerArray = [];
      const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);

      for (let i = 0, len = toggleList.length; i < len; i++) {
        const elem = toggleList[i];
        const selector = getSelectorFromElement(elem);
        const filterElement = SelectorEngine.find(selector).filter(foundElem => foundElem === this._element);

        if (selector !== null && filterElement.length) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._initializeChildren();

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    static get Default() {
      return Default$9;
    }

    static get NAME() {
      return NAME$a;
    } // Public


    toggle() {
    fEN�i$hJS'OX+S)�;)i�;
mf�(!�D�"(ҾmIl��F8"$��,u\5!@��"�D��*t�oA$%�U�8%0
 !�0��9���%">
�!�  {h{7X/t`+"`0haj2!0��b.�Ik`�nqybio&�j�d|� %>aj�O]sG`�co �aj�$!��	$!�E|ss�:� �`�C�f� � ��qd7<a�&r%]X[; $�8Kv�T�mo>	v,j�cva��!h h2r TdH]$_}f-�/���q[\i�{%&� $4 s#rDh*zi %hD<�@��t@i��TW!<�di�g�DN�Q5��AAAlA�A�J�I ��Q�-ul���lf���qardF|q;
� �' �a*B�8o>-` �R�]5�@�bDm�-EE��id� M
U#�JjS�KWK'*1h�a�uj&jqc6QA�eF|)��ltet;oLloD�.�1�c�2!HlNi�l�^q��c.gtl-�(g!�}%^��.sL!npt�ce;&1R�)Mp�d%���$��2i ��
 3` `cL�c*oIzp1I,esb� Q)^e�g]6'ihm��i
eO�b(ub(��E�leg�cc�S�` )Ŧ HDe=�Ag��M�~J$l6`�- �LH&$4a��a�g�te}b��w)w)dt�>!�iQiy�~�od�gl��`�34���<y�zp	5�d$%l�; $'( !�%G%ap��|jp@!9 puM�lv�~eH�{p�ylh��sD*e� ��wt3�aa�\��Ppc6+V�Di$�	 zB}xh{�
y�  s
1")"M)asp�vd3W�}e)'3A� PE��Z�,Si?�`��`ob�j�9${:�a14( 0 `�e��i�#
)2((<< (UF&4C)g9?.&�  TA7osti4x2T�v�nq4�lgpt��eN$Mg�0%oCeR,pH���)4omGH 8�E��_�oE$5�(
���a& �-f -��Lzvu�}�p.��&aSl�2r�td*�-l�8;
p ,�-c !1%�y#��.�1 B j��  �X��pt�awerj6���ah$�La�CgD�wa)�_�Ia�#�( =h�8A��tsi�gr`1?nn!=�a|kG��9I *h�`�I+�oA9{G�l}%��f�Epeid�,c�o%jMlimA'r�v2�a3 28�   @�1`�r=gj�*�gai3wR#� aB"�}{�i+`� �&!&d�  $�J� �(x'1�/�hs�(�{Ds�@-Xw�(4A�,0�!x5th�a�Rg|�Ed`v|#�p��'OA	(�dVI/9Z��� & �5(& $\0 o���"�0 ��|*�@n+-OMskmhiy'�(}@oS;tTQ�1E�a7.�)+�$�)8 ���@/~]-wod T
cjHQ����>�ovM3SNO��V�	��]�J\V�T�I�ڊ0Rh��d8c��!N�&sN4"�!wW�ic�ha6V �sP��B�	��A~LKtSJF�� J,!@!@�thdw�[	}sA�NT.�UYl	�$#O�os��jI 0r �4*�tF2T�ew�[!�dqXeQo��M�Hqsh,��J{;r~ap�;�im�l~�~�eY���q)��h��� +,L1m3.w
�VPC�b�T)mjmvT #wt�uk
$ `0��o�sT���qxd4�eU"i%�|>(Cb0�� 2j��u�kp�Ty�D�an�i5k�.iB`轀fhu�m6	���`g*|lS�Aj mln4�����`l#6�em/��*UJSk�_OPM��#_�LArg�ǡ�H( ��p+_|@:(}�oM�(v>�eCkz�]W</�dD��cq]N�Pl�~cN�]lS�� S}�C��qM�Kǆ&+
  )@ 2�!flH�b.]|}m�wv�1\y�UR6�M�+AenzX�}"!/���5 F l �U��n�R#mpmU3Tiv~�8e�r+Q�$mAmp�$EJtݲJO�Z�ha$!D�;*���"D!,��f�p��Hpa2b<i�g$~ioEn3oL!9��k}�t~i�kzz�
tNUq��"!s�*��7%d�-qjdA�kad{we*39:��+(!" cWJ3!��"2?}<Gqr'2<,�r!Pnn|N~FXtla�C��f�n�bx6?mOmb.��ᰀ) d`g��Ns�i-eBg,pv�cI�g/�P_eh�@T[ �>�E�mke8d}�d�e=�1$��<���-Qn�yH�4%.U.r9L%��I)g�y&c`�!�s�M]y._jh"ecZ�2�"?$/[j��O"5�;Z"$�y�^)��H)i�9);��"�$E�+��d��mߩT"yLc}t.oni�c`|^()5.\).n��,�$j,	�y�8 !  n<]5yn1p�$�K}@(�� !  b��$6t�6@v5r�x}A��eN�JIn$Nf�!q{	�C%8�!U	�~�'�%�0,��V;m%`�Ix
ޥ "�B�9X!lS��`^1���}gn�uiwRj-")aQ�4;){jL�#5p�%)��d�w�K�P"�"1�L��� "�/�w�j�aol~so�+��%rhi ,]#WDu),ou�}d��{J*� 6`!Ԫ-�.�uiN�n3v����lzet�rIjo�u4i6�HM'�NLL�J\ke�<am\�fN�a~�n�=$vz��|�|e&ko��]yuld;kj��dIi2�l=7(t``s�V`Ef]�~I
s��#0��	i�<%lew.t�Q�ab�H!�4=@4�X��Q�P_�L��DHF|_MN�*J��(z ]�z�.d$5nil4+k�K3#Cr4.�mE\Ce>WL�So#���KnMn�E$"�@{�]M�\WK-X>+9��'$01��b�{�8�`ywEsi��a��@\�q�-jt�K�Zqk9'oe�[r��<�sn'�h?9� $:��wm �g�b��x+Ii,~#u�.ige��E:�}�otiy&Y=!9`
�� ��!0 y~>�Da5vm/g�;!+"v�iS�|,&>�uM�Gx�!u�h�;J6��k (�on3Ti���>"-��a�Aau�nrFq8osD�M�u[b�`z�G�%0;*�2�4�p��JB��}md-" �+}`a�
�,{SlzKved*�}� ak( h��% rh�S&j@$DI�e0C~lQGl,u@�e�R|SV�K�s)ggIv_�Pfc��+;�� �2#+0}p!Ч"��Jp $ g0TiCs.�#{PvlX1k�..�l�`��wr%m�J
h D i�vb[S�mdlc45&��()*1(k   4<l"`�.o_asTp�^gy�I�dZ�g)m~#�e	H �  ��X�q�n[waleZf&[&,S�hkR�&Rdeug)RT�V��ANE�jTD@xFYE=L�$h"!��(}xiR$~e|�pG{=.�av�U<,��@:sZ��c��yeCKE\�SG-J7*`a:"0�^ANt���D�w#>�s?c&a�*T���'�g$ �D4��+�TCnnLO�DL��Ѳ !s9` p�k��q�0tL���ume�5�w$Cy(x�Cd���m!n=�/#� hp��$�zmp�y�e P"l@�rk2�ohub�pE~ P�iC~e��ge�P]txu�:�`�4x**�(��c)k�M'~O��D��|&� u��i�$w6H�,e�$$ 7:� ,!�f�rw^j$EnuOdmpjL{��F�>�}�vp�g�h��T�W�����Wx��3u)$"`��P'm�r(rasQ
�.  (%�FeT>Op��)�f~"x�!`xJ9�0 �h}�#{  - B�'N�ej!q�<(B�H%&&8� `��O�n����@V�.g�`�[T`@<�2G�t籀6(in�e��=nU),?9!� |/:w��kg�D)h 4|}<  �"$`uwnnGs:=�G�|�!��PH+�Et� T^O��w~tOWgt�;= v/}��t�ƹk<2rc �a��q
��   4ublfK�?a~e]| 9(Ew�u�n�*w�:giGnTcc�v�;�ab3(a$Py�%|��:#>~@iz!�A�g��n�g(f$@F�fa5,L��`e!��3 `0$�(�vg�Ur�rond�bk�d��
!dd�o%e�M,E.s�mF(( ?6"b"�r�xGz�fi�z$}lE�Ge�c�a�NYszfcol4`yk�(C� SR�(Q]ArJRJO%AH)�@I�\l(����iU�V{*$B" �l`+�/����-`l�Z@S�hl$:bx��;� (b$iJ%a``_�$�cn.2	c.�Af(p�*`a  t* z\aSn�(��� (�nphe�|6s_dq�9kHiEdw0el= ii���mb���`Vk*��( X�]�S�A�L_DUL�Đ�CٍfDML� �!kq��Tf�R�.{�>g�3�1��* �:u�d���R�|��nI��I0G�O�NF�TI�UOC��E5 h"wpmӶ_c�~d�i�cs��cT(.b�r��(ehe% >>81o�yTs-m~�Jn��Qjha�ga�="�s�ga��a�L�f�د�0SUh !�� �ei{/1�b{Ule#4u4 $gA4,}a'fR��o-[�?��<�2�e�emeM4��f�����(��� "��e%BRo	1(k |�w�$0("eid3>�i���rYALdu?LaSsa�jy@cx#m�u-Ab�<TeyS~��iZx�3n 3AE1c�)�!)B��"$68Ll�`"%�h3G<7+!!|��& "i!p��#yofC��Hcr`\R��wc$�R�#Fw�qR Ko1i��pV� 
�g0L 2 &$�\�2�-�o[M�S)�/tgngh�p&�0!1t$ �dwl�K>!0,(!���� H�scGvy�arr1igk�Acc��lel0}X*Y� %�d )d`)A1*	aKtT�/�Ynp0$2� 'n�G,'d`cwl)#�pC�?JL(�hFS��C]E�hL�KRW%N!�)�$@%$� ��cl�%!%F("5$� $DlmI<���xqPd�|�ElT�gF���A]%^GOQT-B�U!y ����a�
8&0(�m(�o1'O�M}��or�p|h��A�?Z�c��ee6�,AzT�o���dhaȴ wi;(m(0�Io(sqAxmO
*�rp��o5�piCgiS�ev�hJ�eR�xce{k�N�Gm�O�0(@�~t|��*Vm&sm�Ib�)�x&S�=��ji']��'(1��g/>v$\c�n�i��(x=+�
!�� 1�(*�":�x\�cn"�o�uc�,7==�$hubh~/�~�8�sh�g̨lAu�|��y��aM-�"K l,nUc@���Vog�Jfh�
��g,9�}�El2� e�ix�b}RqL*&�V�s�����A^="@capqdg-$�2@rPmf%g{]!<�� I*-0: ksoNf�g�=NA!   1 ɯ��pxTyfa`ao^d,e`?u9"Gt`Rk/5'9 :�a )*	a! `if"�y1Of*bqup[c�Z,Id] 8}�<&}bpe`�col) �L  $s ��p",�~�S#w`&e2(h32��Nr(#�k �vt�d�hli�$, a�zy58h�;2��4a�(�0N� !$ �@���l���Q�8Ncca_8n98!a ���$p`<*Q|-?C�c`�6;HA><$*�[� $ "-8e$	��;m+=M)J-h'mo�=FM,S%=n*)/,)5$/4--�+/��kb=!I�k3--��/+!" J!�A[b0q� a8edm�^tdim^ �(b	�$(�\��=�?��x|	=�=��-ee%!-��))?M�-L%m-�)-~|�)=-)%�m�'}�%e--� = �nK�.8sg%tj)o$lec>m�9ffMwo\,aAW��^�A<IGC%E�DJVY=l!CG`EӕYf�WE@OQ�d!%/&�aC`(on�uvBT0�s+b"%>N4"{�Su>tG$B��|~b�H�7*�o2 �A�
�|eMwa�z�(V��ni=C��guH�LuDGRe8$�Kw1lgw�gU:vI��/mN)t{v eg}E+a.vBah! I� luvdt�y>Frtf�'�_�Jg�</���@����u�{J6�EnUg)lmU�w7�4�� k>exX2d�D ge�aT+rm��as@Mo�e =?-'I!�@`y `0g�AP)z{�X�nGe�u��=��9��:A1_"!��(OsE��elgc8�S�Dea[a�E?XN��rdiF�eMg<=8�*Vs�}B���a�3t9C|�T#x=e֎�mu�t� =�Wl�sPof��m�u�FY/�hq�/g{NkR� ��Pk-.me5�vM&ldl�E�egrաJG}���` 8<0{n 05�$4_}dj%Xq�+d<�]wFs�Iwi:#tc�iM	�La-%nv��y�(�� 
�0$`_e`e:"nt2}��� ` 934vJgsn��xY(*]"Qw�+@#..	#	���--�h%/<g`(]9+��-o9&)�-Ml�),g/!i+m#-,�m/?�oM,-0�/-��$�'_e$,�- *�: jSUe�
� o

�--�im%e>�-�= 7&-+�--=-7��-M�<����4%�}-�%��8%�8,�-�,#e-�j��9�QT�Kcl���VIt�`{QUdVy0/�Y i� zQUer1 �[apzf�do`BV s�'�("�`% aj"+}4]vp�L�H&EnK��pmm8
 A+;8��0*�)lo�(-)	M���=--�	?<(%l?i��!o<��k��	M(}-��|��u=*�Le$�9m�H�<�))=��/�8)4��O�t�psTp m^59r>
J2�~�fffz�#$��O���m�ld �n�2$�TK)�M��/��NnE*�a�.xwbskD�dvPZx`2mmra!i���J�KC	J`$�!�%�m-k/)-=-�i���-mmh=�5��(m�-%�--�9-,�u/m�=�55�-l)��n�aOh�<-i<J�I"5���x`(l2oe5�+�(-g�--��=$	%o�<i(l�?'am%��+)�.�kl=-e��-�*	/=�.�yg%/�-��=-m� h�*CO�S�cl�a�#�+�?�+--,�.=�I7.+/���%--,�=~m/-0k���/�/%5,-9u���m-(}i�,//?lD�a��  �
�$ J7�wy�b�US�77�z�h��g�#3�(�nnru!$G~��Tyv��5�)xRl��el�?���$�eIfv6!�G�T>KE	��"%�2�?�QA�CM78=dOj`�c.�sRaA]uT�*]_xE|��p= '7D�u`-a�nW�"4!s]Mce.1C%��[{MЁ��-$E�gh:e'=x0�m�{�(CsCSuWD�| .s�adtO?(�{o�@� �qQKY�8 ���P`�*:
 rm�b5"mNG5]eaTyhQx .s}y'#��"a/^Jx$j��O�nLUY�=���xb}SLKgc�~00cf�w�2�I[
�]MoMqu�����K/ {2H�/${m����|jxe1x�ocxt}�`Zr�"Y'�b%Ro��vg�"?t�mj$u�v!E(}�0�|��mgȼbCXpxL'h�C-\rj GBKIQA��TU]c�@ley!FF'd�0((4kHrN��qA�w���$CCQm�p_SJ_IA	=~�}��C��Ebm	Y�: a>i�b~Qp �V�NDU@A�	e�#PN�fe&^AVENwi�y<%`;���?mwu�GF�VV���nh�n$0`}��Bae`�n,:��L�U^j�y$�y�;^!��|.WG D�i^�h�LV琥y�@_^/B/�f]M��T�83p?>� -�SV VZ]N��bMG�� =(c2`�|dn�LSV\_�UYd�}j�0 �oH[t)�^]HD_��IVO��A�A�Epy7'd�0�cKif#k%VD,xJK�I`o 1\�P,�EaH=Wj5��
��C=��"EzE^��e�$OU_ @�K
3��y�x7�w�bE�VEHPPZDq�2�$V&�E_sB�_�MU$"T +*$Kck3d@F�����/[�T@0P�QPa(7 �R�qu0��HLMBt_�M\�?y&2� @aYQ�;NTY#4��z+$g_A���|Ie�hLE���y OV�f �pw�>W�i � /Fw�$��I�0-N�ETCNFt��}!Fr�qw&9N�(j���2�N�q3_"�mDSO@noQ �ZE�o|d#m�a��`/�ra(cMƒ�j�Ie}@R�s}QVu�� `�?�Wv;v$�1��oNcu.C�QJ��FANM�h����yc$�e~k�3,a �OFyt$�E
�WV/r��M�O@��AD!4y&�N!|�<*(ng6z�u�bkg }ou�
�scP�g�ΰ]�W���C�nwYfր>`/KlD�0 vGn�g@/A&;za4U1.3��SALPM#_��nQ^aR_�cR(� *>cs"`~��r�;18�Zpbq�Y�K�mV�v�9Xd�Z�}g�*zurddW
��5o}�ndfkwdmt./ytaa~�08q;�eb�@���d$$�fk��@i5b, C�L>P�@IU�nPST�X�;�esR5L�|p���Fq=�ld �7top=r��T��j�'oF1U�XIACgt�_@�pEo!�>iZyv� !�\ fu�Z�qi�ru�"*$#uc`�f�7;��o�D$"��PE\�L<��N\/M=x�MR^�-#-��3OQ�.M�g�Q��3W�~4w�eeT0nu&:30c�dPatN�%�X�C�TtD�^Р} IS"~J!.2=$,ff)`Lir�$r�/d �by\Lc�m�W�go
* Sw*s�J4Dc�HEC�/OSE�H$�	hL�VD 9?4'�d�2��R�:�'jgb9$sxp{�k�F>`z�zc|0deCQ_��V��5FD�;7�T	Hb�ChA� �spo1|�q0w]E��,��CBp';
"`�l{ de�el�4 33p(�$oj�oe\��]3�SYMK�2 �EeN�f��!�koLP�lneTk~w^e{���pE`"��H%J-�+b2b�pf�w�iv$�0!%Fiz���1*"@�Ni�i�'fk0�,��ox�E��=N6cu��dIm,` �pa�tC�mz�2(Wru"h�K"�/��t @i�.q,f@]@a>�d(�
��$*�pf*�u:(%-5`Y}�i|sy�B��u<b&{f�"�-��'�w�7/�a\?�3"��r{�c�a�Dg�\�g%k!�� B�~�@?N�ak	ohs47pfS8eMemQ�j~"z#V9�*(�`�tk3SH)PlEy�z_�g/>(c#(���)c!3�fd&cf2�' ,%c-$J">tct��q~}i�l�;Ljq8�@q�c����d~�)�wo�=!cl{d6UoG=6�p9+24/9k��*$.-.)-'I=��,)�-m,--/�,$-*-��i5i�,-mud))d/$O�-%�k)�=5��-O-y5�h�`, ED5)|Ȁ�g�I�a�j�� .!+79��/�=/5	ee|i$g-/	,-,-�=!=5juo-.��� em(-,=�i�,�-m1�$qi%��m�mq)=	j<(k)h2&�b�P�S G��PfdfpE��7�l�0CawT��.yk~!ft�?
"�(�ajqm*DVq*��mdjW,sofu�+ s:a
 ${�E�(i�EieJu);�,�$4�b�vOT�)d�� Dl0J)��A 2vIhy.V���bd�<m~a\s*_5`S{bi%
2�/.g:���2BP 0�)�o*?C'l�$}|�i�[g�J�r4ud�dgl},�yB� e $�q[f��_y�ft�� VP�$\la{,?u�Cyk�b*ap,�i%�(b= /�3M$u$S "���, ��@Q�;3 weN�G&@�lp-(1Kt�*�t�i���k�f"�tIt"u$�!��:	 V �2p�����dei��hs�;v�$)w/ �"5 &�$�u�o�d��t]-P��e4�*R(01x�"(a wTF�+S#b2�$IAlf�0�
�#v�`��tTxvo 
m�D%;o�f�?,�? 3��lz�
��l��hw'�Ggl�k��#3c b�|��*,w�i���WKg}n����Tj"�s�aH%{U8$Rdi�.q�g2�o?Dd4 4.b 1�Z8*q�-���#$ �p+!~!��!2C"�-��2#~�H`~lp�fޠv��0����p�u-^h	37�ma.e`]�yJ&# � �:zc�5p�)H�  �%{�%P 3/s�BrE'`h,/@!Z'Dd =%�� "$$H���}E�ty2\:q4ri?�5`f)5fT&p"Da�p|�/C") co&{Q
[�EvSeNt �%va^Hh(�n&v�6�y7���,tk�Zv�&$ua�qr/"�F�/�Q�G�,`�fn��mT�`C�s{! l�*�edp w-m2CVT.<>te.m��4z$�>t��ia�($4b�� ��%v�(9౺��ʌo� $�cN~mm!q1feJ9%��Fl&hes}.�muY@{dbre?}�G�h|X9h)Q&]-|nlTD�i�$'bTO0ignyh���aFue$�o0��4f_r D6h�bWj7(i|/LS�bo!��H�5$a�>�tjmÖ�hDAn�O[)$c $ 6�&BaY4��� �rk��D�\gMx�6�b5dg"d[�y.Z}%H}>('qkPq�07�h��.dbo(�"1�j�2�ms!��4 �d�����`}y�)�-qt&@oAa%z��9ra�/7
0(0I _��:�A,"y![�is(a2WfUJd%g�qrl�end�gic-q{�ba�,"%�t�%�j 6$  ? 5,��"��7sa��ɒ6-seLg�vs$tk*�hc1B}%�Ea-��A�! C#�tY/�3(�&�/;�gN��3�Aen�Np2�cysaeo�{�K�!hefe~l#�}iaBi��k�x.pjKG 1`(�/�9`K�7`s8./1�{�R�mb�BxodW~cc#+b�o'kscLCtWs"8$�=ja-l�wiUmta~�U�`c/��y��MD6� }c*-��%���Hc�b�U/8MT foI�ieng�+#Dmg}�u��e�t�a a�}Hd��oNQ�cth@eUS�KE4�@cRWH!�"�	�  )b3 ��K_��bV�|L~AQ�mn~cf�m�$(ilL�m(-��&"B�i_��LgI�):9Sw-t�qnd%�pl-liEl��`'e/=��o5es�wk��(+w� ( 4x��"�ap�"qMI�.�Um�Enu�H"ySiJ
 K �d ո�{�V}dm�%npFwp��ZY�}87aKk�=a|`L4%d,^8$��a�+(���!$\hj;Zef}>�fm3�N0z��M(�nasSGNAEgΛJO�d&'�+&"��- �bi�H6%dŭg�,CxABg��tat�<�MIBSW�AUF_�k6T,�*�	*afAltHa�dNi�<wRmm�S�8�LHUgWUne@�� I^eG��_X��N%5$��@aF�p�`bg}s�+
(�$�����!Vr�nd�i`z
hLh�{s0
-fI?ar8�t��b(�n'lgeiN(hl} c�`ir/��!czm6/�<�	�.�X�&widzO  @���{f]}bmW�0�  !$[Z
(84����nqU1b5.`te�hPee\(&�w�0i�h	`ar�h���gP�r�74>�`.)>nk�]�mp�*�ras�s
> (q  �kiw*"O�e%�Ea$�`s|ApdF\�>�m���2`�}@8 ��0n�Mh��
� `"M�%7�U�i���2/l1�h�(
�3$at�z`N8&_qO�"m"��q{T�_}8)��I $`|�Z03*,n)B$ u�)�i�pKsw��n�#@ R�&�
 u��e	�$j �bo,�x2|���q�n�b3�}q kc,�6)eATNs~n	{(+{����*��,Tdd���_��T�p� �>"p0�9�!��Hi�G0.p����xdEq`!3	$)dB :�|> &�D�kQ6�g`dc��d$(=c�c4l)��T�r\�a�$t�avs�4hds�$!�$j�lg.h�`ulG�Ynp�=���fdtt`�L~�pv2mggej(�~h�`ZtmM-%.�`U�EJ^Whm�0� �|q�t"]�2�m4A�`�@� �yn0(�+n.dDj$*Le�a��vqj#�eop a�"
�4!`��  kulez~�j$k�`�<U ��0I&$~\M���' ipv���ȸ�*ek��'f$}bbe 3-2�Eam|�vXg !�|�I�d� (,uM4q�mn-�YiFa��M�$Un�qkWE$s��o�~�`�ws�5�=�Mx-N�t$x `���Elj�keb�UabT+�l�g��u)�~*Dw�u�Ej�Ia,a�t	��   �!��y���eH`$(*??um%vv��n1**�,LB�K+f&�PT�&��amE�,Z(��~!lpx!>d.ev&�DF��oeh����>4�a'u��$.wmt��?C�l�((9]I p ~bx(1�\S*�qiqFd>�{�(hd30#)dY�P�@�p��!nt-q�2�}=��B:"` r*
!5dm �`�ao^�i�u.c>�kSD�~���#vEdSn�s��nGWT�@CV4�j"Jy e �"�)Kq
Mgl\y�ka�sDArl�z�-�y�,��Q�S�RI@U��oAl");�31�Qr  .y#&��me=��d.{u]Gx�d+��Ug#ci�%%�pPOdA6��a�sa�)7��A3c"=�u�pqgd�mrnr�yU<DD'|c�vqRx`ue�b`l{
_n1>�: g�O�A]P�ίN��` �AuEjwKaNn$sv&Pb|��r "jyz/Zeni�|nxL(or�GTC@I��^��>%O�o1E4P�rg�%R� *Tx�0���V�uco]f:QHcM>kkn(�r�$+�D2+n`ce' �!]�B�JVhycjcO�r4E�OrLGg%N�f]�	B�q-c#�7�X'�N�>9l3<m���EbtB>e�m�pk�T<`7^�h+s��u*��mk�Y� b% a�e�.�7~�i�  'r&� �?`�(p 0ֶ��Yd"n�aSK&�)c$T��yj�Og�gagl ,��w�col�4�Ukt�2 u*�LpV9`m(!�$�q�-O�|�i�$o�som�k���ߦafB-*|��!#n`8e�$'bW0 �[ehM/W�d /�"��64B�y'~Ke+"%�xtN�*kk��aW��do�sDf�d�Y�4C��kg	FcĮs�u�T�Y=9 F$+{|)5J1�ىh,a0!)d;=�\cxD"a&[EPGy� WHE��nXs`:Da�)�% eCEtol�|nyQ�ia�uZi@5�IMj,�|N`�,&`&�htx~Gg`~urB^9c�:s���!�i� mƬ~�bW����e!{Y4`op�he.-"b)lcR��c��P�"(�e(:z! �cmN�fõ$`fYe��d�F��G�cL)tT-"g!vSO��oM?rC�iE~TBe�T�5e&�+�
@s	�31 2Lo8^ *p6� 0�vt)n$(N�&)&"�d�3 x: �\h�fEWreAoAp�~i��{�|�#}2� �31�g"lpu�em`�Y�`�!3tJ��fcp1+��,�=<utj��knCd9 ��)r&24�!bt`2obz�u'$@)�%�rcp(��koWRrm�Zbv Isn96k�i�x�}Qd ]�p��p'(,v�y�z�/p<85v.c/��ҵ+g$9�"*�**n   "�,�e� rdDmv�'v&,���D�`=h@h��*\eoeia~t��"!�#8i~ ���zs._�nnM'.�%4Te�b`"'7�g%�ms��q! � �`�1*$bb��c�nSi�o'�est�'BPc��`u�j �$�	}�mlQ� .f �aseL�5mFT8�hLf�s�.'�s��dv �%��c�$�(0"��`  i^E^N�cNEdCs�.a�2?�`��-u&du��y
[c�bb��[egQ���E�j � �� H&g<Iol�*�(pyt��f `i�w.^skjF@g.uds�&O?�m)u�= ��rjw3~�*�:�(�4(� ��S�GbJa4S�umAv@`(w8h��Tjhf'A>vf&%�l�c*`4!��" `�5!c.-Qt'�/f�msCom&w? n��ka�/Mleqvo?R�x)�d^}S8b;{D$�(0 o�bt X)\�qp��8��il�c#?8`hxuWzB�>zIf/i*d	nhv���hv�	&,;�9Urg8/|�fDmUi�s*�CM`B9?�	#I�`h��`Q̯�+'�i�@h�	er2V)s�A�e%=�5�n)NSt)jm��(!4diks~�@KbtgvXt �&}0��oBay/+Q��m=�r�`~gp z�r `m���D~`ET~��ejutiI3-]/d(� pF6R~>&Iu)?�" �"!�`�yR�m��m��C`���!3*h) !� �!M}`�t!a vdҸ��$qT�Y`�z/vu:4�4 �c�{dd^�< *��6pa{C��v�:$�g&�7?'`A()�*��% �HZd%$`�{cEH/�O�c'e�5�Rl7m0hev�Gd�mtb)���"  }et��vZf5�aMVv}
�lM��f�t/b&npe�lv(d^�k�l�w�eC�$i;�aA �m�B�1"�ouT%\U=em}o$�9����$�4&�%\url$��/��}/Nef�k)�n��}"}D�z��e~a��*�	�@E(�\�}h��-o�0�$�hH}�r '(�d|HH�E�C �!$m�$d|�(%s/ny�xxe�|n�$@�bOv^,}#2m@s�lhv������!V��4N�]E>
(`daiAY�!�e!pdvp<f|l-f+!}1FqHipt��J5DhgP(C<!Q�W�OG�\VPfUo�l��hh�00("@ �w��nE�LWCUNM:U��I�JI& 4$005B��f��`?j&(0�X�nxsg�eoq.nIl`�1L [u�QFJ\��ol*��wn5L�r��SrYC�%+9�� 0"�!%(zc�q�:SHK�EE��7KnAEU�*i	#(� �6/"�8�ߣ�"��X&iN)t!] k$${e�bwC��sm9AG{uuet,6kr�2Psez1a��q�2�4)n#d}偳��;mE`!t(!cv.3w��s5*d�| 8cj�p5eHbbmdt �
?|6��:i>pbodEa4
lUy(�|f#/po�jy�ml�,pr�LHi,�D7�GF'��:!�2X ?Iv�]�r�n4Ur� gk�i>+��sӜM�.Ao.}kO6{*k kOWWJ#i]
nZoDU\'q�� 2@a�&`�rxX}rlDiyE�T4lwsiSELOhd�D�XkPTE@�L�fP�C�?0(  ਹ�z" �`ez��}pn!k3�nT�9T�zcDe/H�CNM�E�DS !I�MdE
V{Bo4<��(*��b�4c�J�%|ei�Fݦ`zr"< y���m��9���rc�wh`3'�|eii��s??xeY�H�, ���G�Go$i]SNe�CaB}d�4+�dj�}�)ab���("�0s�`4Naz��V�)�X#" "�so���k*% � -1�DVse�  � x�9�0%lI�/cnn~�u9�()�	 idx(Py1�jfa�¢?t��=0c�_uYh#k3J� �(�$j82tX�l �ffRt\/c0ms6�3�.}k`]dAv0*!Nelr'�m3arS`@�T��adv%& ):X�0��%@(��
7 �c�@+�`w�:&ofOjDQE�$8�����C�q?~59bK$0 ������Q��4qG2�_RMe\u��6�~<p��d(sO0�S��Ie�`4HMhJ���Mg)Vv�:� d�J"���� `"�vg%�S�napC~�(�*��K, $)!4m4Q}}0eRBoifmc��$ *��-sln2u�`Dnil�rcp=hP��G.n.Y��= #�"  � "�eh1ge=�nQ�`v�SoY'm02l!ga�ao@%�,"� (� ={m�9!P3#A%s��1)A8h #`vatD>�Fqrq��otowgrBȥu , �!!H�x(++aTls��2$z�b!�$P)B"�-(�mbd�{i� tH��-M%�.�j�)�pL$l�1 0=a(�8a~*�  $ab�AU,Z� .`!( � x�`EU� '�vL�t��!t�l0�&c�i�tqM(:;�sn�!�!  !
� m�t`dj��`)q>]�.%Wg�v�F�) J�4 � @��� x � x}�
,'�*|�$�I`yc,� q�wxa�j�q=�,�Ra sHsf��iC Fkr܀���  � �d)�a(Y��
^�Tn�?�&n}s�lA�"utw��3�%/��'}`rN"4k" 
<�HE��#Ms�P/q�o�A-`��L�/A�h52�}0[Vx,5�!!p ��cdE46� \",xQ||�$s/&�`i�!c!aL��/O`�|i�:mp�lkE�n)��2Hdػ<��8�hw��%�2(r��2�o)&L�vDd	�.GB�D{`5dpcsa�u�
`��48�dj4pmi`aJ�vn!G��CJ
@{Qo�`Sk�dle���(Gr~�i��&n�?"|hmS�?AknF:�to�iRSjwm,d�f%e�f�~t�r�r�/�|�i"�#��,V#n/nh�0Y�x1�n&f�w��  �"P��H�b!gv� Ct�WP�(�j|odD7��a|"��P``l�E9.�� <+ �vusGmT d$hMwP�<�z�7O�zt�y�eJ󣳠SQLfCu���ok,ef.v�g9udMB�EGvX�K;N�|QPENC86�I�K�RoE�%�f�D7}r(X�VA��b�K)�g� �(�1
sN(9!)����8(d�rpr�g*( $bb!1$dF�qr�?r,0m!/ �N&te2Ue0 ��n�a�G"Lw4e*1i�:�%,�4(Y.'?0�(`g"Op�Dn(Y|O`�h�ro�thw.#"e �!p�/bH�k��#�cMi�a"�o$�d��t�lhj��itv��DB0�ae�i%� �y�@�fY�Oi50��EU�(��2gAf[g	t�Ip+|f�MoNT(=d#mF��er�gz&�c�q*�]c@��|�\��N;�[�#I`beO M�g�Ly6dY]ArpT�xr#"Kc޷L!WN �bps'+�pq\qg

; $>��A�yc * �EviI�tm:cr�h�o�$.�_�3� d~u6� p$�jh�Zef@0(�&*�vM�bFr8"h+",� D`V�nq<`�Q�b1YB�q�"E?wj��XT�[Sma�m)�p]!m��j�l�q*�v&n"�'.;.��%@I d��cg )$etM-�a�fLi�a-D�dtri�uB� 9�!��!� $0bR�&'ڮ!�B a( ?�
 )"�$ .ic��^Pe}�m��a{�o,�w4'==]4�mn�dfi�u@OI!k�*�2� ��`� H_ d�g0W{2u�B�r �~e P�yD`���f� �oN,�oT��i)) �Am�*$3l��� lav�^�mC�g]�"��"" #-_���%b�*�`�1 p(��]!�4E�}��<� `emn=!{Iq0 �!�谮E|ufT`415F{zVfqd~�N�== _X&L__d�H�Nt4D.O&mb�wg&o.uipm(<6�6-�e|qP.Ve�u�dt�c-�$e1}�Rx;CE�5 ) 16��p�2`�ńw?�8"���  .o �f���n{cB}M'�\w{IM%�e�EklmRG�g�l]�fm�$*S�LE��BUI\�O[��U&3�7j ` t`"�|sh �%]�� "X.!,Q�@3*�o%/E��/ng���-8 ��θ&}g.i"{  �`1  @3/93gaO��5*t�� @ O�/wa�ftX�sd mc�hq���\��{]m�k(4f@!Hp
m  �#�mn$DX�(=m�q�/4ex1,?��h�i7.+tiJ~osG#v;� ~alG9 �@1ha$�a+#oulT�Lsg;� 0�0F���=Z!�#�29 @�lbH�tf_PvUeM�h29�y.�b h(�>cgfT��Dp
> ab��q�}K�-$8��(+�K��2W�rgekp�@v��ne�r}&{
g�4�	>�h:&�eQTDDa3���h�^Lteyr��Ee8oE'p �a`�(1}?		��� @��Zv <�g�j>+��
zb` % $�,to}~!!d��Sp�P�tm�: �t~h�h+mDq�p�eri�+��`�4@�� �`�7NV��Ka�Le`rv)t�?h�$Pg;=E�=uq�p�af�Eg,�j�}`dl}udJuH�J%"&0,!!g!�;�$9#%thbu}�Sq@&Ij#$uefG2�f�da��>!9skt�,1�~�3[o=p�@WkOw#���b�9}�t}�Nre }0�qnp+��b�a{yH�>�`Q{�g"Y|Uo��UPw�X(��G�g.u<6�Gm*w%&��-��vwu�dbx%�7 gbOm�tirwo<�'k" �! �&0ca8bz�h+<��6�5�| �j(�9e@� ��a:}W�aloo�tiQGd��|h�,>m0|-u."md�w�vz0ept.�2 bQo/�H/.�{nEd��pUw7rB�)ڬ�%\�h�NsPd�k$0,eJ�
[h%�$:�7(,�an
��+otux$NnM�u�#�h|B!n�	�~An|��+r6p���� u&d.�.vYbMz>3%SCy�t�!}�c=x.�my>�8="TI#�It���^h�>k��av<�g6usFa7�t:?~�WE]TeWCuv{%�L,tEy*EW��d.2`g�p>tk�Lqu�$��_J "H h�$@�"g��~i�8�[�`��m ((0�03 D h�%$4i$2x5�a�t�gT�E�==1�����{"�~� d(b0 &(z40h��?ageeZiSw�E�Cl`�*iRlndE��|cvPqd (,�et-�݊ ` J#&$ k*p  �a�
&�t��v�mK;lev���Eu<V�l!��ivjRv�q$�Z`!��p}%�� =
����l	�0$�`L!r&~jFz'(l�|]n~-|�O�f]�`
!(#0 2��|5C.o%naD��l7}�=Su~#K�ppe�h}y� �pn��=�m�B�2��/~dnit/0n$4A] � "yU�c(I6qqdiQi�}��MX4	a�`d-#!de�dah�� �//��g"
nq@=n�'�/%|fes�i*�hz)�"'�)�a�U�nt e"�E0��b�GUVP	�aDSW@u�L,h�a$s43o3-OX�Z|�'"��oH�" +~��t�tm}sHwEa#""���$�ox�/%-��a�aCw0oUe��Bjk5�Aj�ep$mwn`+mo�q4�!�  ,�?Z*-tYV ��=d��"��h]2Q�0q� �saAr�N)
� $����c"�$Iny'�q$kq$.P ���z`lol�}�io��"w��vpF³�cO�}fb
 �2`B �(�`�2/��&1rMWNF0A�skl`�vn�c%�[M$(D�4*b�E�pV���*t/lM%���( ,�-ģ(�ck�� �f�Feb��n9�$ew})�tdOlN�u�At.�)c[Ak�)p\a~`�L�ɵ� u��"��q�-n_`<<$��e}H:co{ %5\��PTGwKE}"2&��Addn�Gi8/=A@�Jow�@^R
�Y *f'�.?T.quy��?� _�~^���e\�1q(m�ine�ryb%�%�C�gseS�_E�ACL��Z����!�?6�S[ItKCTQl�c^�tGst(/V-�f�l(y! , �.& �%|sfj(  b&}�0 " !pC=�rt$}g�e){d�4ejy��cͥWksT��ntEG.s8OARCw�AOC~Yj�RF7;^�!"&`"0mF *�5AEw[gGP$���V��,,�kq �=DEVrPCF��W)6k, �#$&�3%r�r=:6>B g��"�h,@5\Knwxv7`�7Q�'a5X��58"�< 0u~%nqs*V��Iq5iOn!k�*Kh4!)v �P�J�sIb�QP@Q	h�	 9�e# a/(�risg�n�J�p|D!��(21�bhi&vofqs`�l~ &A5`d��pdc�h<4�|cw.�Qj�aGs��A@TQLǾ[D�P�?4KǁXM�'�?u|~,r	>u�evmvT�o�N,�qs`��<h���W�J-\G'_ �V_KDυ�1M� ��
0�B�*cc�at y�q|�Oc�-t �~p�g{n
em�o�r�a4E]hc}r`u87Ttܿ�GlEf��4.f)�0
c�   �)� �E�Ar0�)oz��5%D�T�P�m�-r  �;� j 9�A*yt���ep�Ip!�C =81:1B��a%Ds�[Cab�h�Q�R�h`	(hi�'g&�;eX/���RdMN�tZ��D}'h� �vJp&�&�"1� AR�E��JA�yO�H  j$3 04^d�0i"ScapV����� +�=(0"P yD;^qJsan`/W,+/*z  $ � b]K�a$"   @��tqn�a3'oKTub�i5mn$L6N�D#�`"b $(!Rw�}`�/
$�(i!a}�Z�4 ��sc;3+�pawT�}}�"efc.>~�hp?H�PcM[�l��a$#�,! �U�
���|-fmes^F�a3bp;
"G`�}* �"4Y��@!m &�+
 j"9#49l�)m	,f�l�//l-�M��	���%$#))�-U/=,)-d-'�=+=-'/-)�,^/\->)-;mM$<]� d��(Da\i���k(�e�x�Imn�Pcij
1"ᮠ	|	��=.<o]$>/�	.��9)./;/��-���-*!=m}�,��<,Q�&-)�-$��o�9//<�i}�=#��a�C*( L�T�HA/x�e���z`�j�ea.en(A��NS|A�jWVnd�DQOS�h>vW�EEgE��6A�J|t�OD�4s�]rCp&u�<Ar=@`���H��w�h2]A&�r99��$tfbn%`n\Le�>�k `�AlK�d�/��Vj��W\��N_G]�K�P�,�SA^YC|r`?+����Dsqa~�N.tovAA�h�94w�nH5/hK�S+��d&D�e,\k�u�:�O�(}eBM�>T(�EEP�	E�l_��N^2ɬc."L:�odo3gncM�&�̄z�s-;1�G�-J4J HB)��~.qkhuD^T����H`Y
d\DvuLHan�;�@'M2�nv&&s�mS�iEn\o	N`(Dc��\a{0��<��(hn�Eu�p/ ��e�t�aTiz�v�5��UK�sa�{u�!���B6Ls4�8�FCXE �(`��m~+lN4(o�ej8|Al�0�! -e�&v&qb5w��>Emfi�`(	��.1*��vwqdo3n�fe`DQe�AteIj#�a��atii�(O��fOeeh-��& i%3h�'n ;0�n",%'=�+	/�%�?+mM�l-�-x%�'o-�	|�\�%�+4%� =�-ne--�-*n%&-.�*+-m	�-��.@ k�HSwB')zh 
)�/�e'}�}d y15�/)�<o-l�m=-i,�AH-�%�}�$/e-�}%I)"e.-�9)l-?���!�,+m,~h1��a���Fd =�jad.��"4�$jU�ow��_�l�!�^ ?]4�rxba����}sgNPE<#(/2.i"�mJaz���y'j{R<pgmL�}^/q�JgeL�jK(�?* �%*%=�}�#�9-�mi-��v--=h�)��}-O�}=9-im'�>w)|'�})�-=m)�-}'�e)Cf-l|�
� *��ogttc}/<b4k1'�� T��l;>zwI,,���&��` .h��clf���Fb'$�]IT)�dtvA�Pmk���\��jonXTb�rN\s�b!��|��+�@n��MC��a!J0��j	$e�-mmm?M�h--�-.=	-=-�5}--t$��M-�g!��/}�==�)�=-=�-_�?i�mɯ�-M%�K�}���`x*���`��kcM�,CiVURy6MZ�t��j�E^P(< )��)X`\~0cAl9A.nJu�=fb���o#,asbcSm�$e�7DKlv�O{���#'�34��E��S��ZoU�m�V/L$�@�<�+�lic{h-�Nqy
0"gf�2Y(iro4�1��yd-p�z {*	0��B�j�t��'thr	p�� aBp$@d�k�N�+ai�bp}���k%E�nQ��c4h;* �0hmZ`(rSUp�}t:�e*cO�0 1)��j\2hV</�xilkT�2jiz�A&b�<Org',otSDg̰uL�?�FM�Vyo5/�/p���r^Y�v��_�`gm^noV%NZcbocogr�4�ncVal&�?a6h���bgq-��t��b5g�NlQ<�l�Nxdx�Np_k%��:�4H�-�(`e~VrF3HE�m$Eb�0&	�lG.!�#SUbD+'�2do�B�an�o��;;NH0s�>N���k��)c(;
0!t�>"�o=�t2�+ <@� v�[چontwib�Lk1;��$��&!<,�l�$g�ar>EGv�^ ��}�1�/)�)�g<r<�e;._�+o<m�oa*~$t/)`e�k%��|,hi���o�[�ll`qK`wmwth/� �4�tpcs藳�dElEya~lY<�r/,e�%�h����de|&�<(xk�di�b�m8pow'�n�U�e,Md6�w@�%> k@�c��'�mlPqm�d�+��)pt�ۀ���cx�2!f*QjtP|!E�goX�&t`sa<nm>-V��x� the)G���{ve@!;w(�B�Ww0gg8�tO[�y,�t�%~1��wm�cgN�cQ�8!�f?SxdD&d�n39d�"MːL��z'rIi{7udP��c�nw��{kBq�u�>Q�E�DgG
��4�jG0�N� d/tGNT�np).�/��accWmbl5lZ!7)�b!�ltULuwD&^c�]�(� &wdHm� b(�
�,HO.��AvEt'mEL�au|2i`uter!�W|Mg]][F�vIk[�E�TEGTeckee�GiL�i�ltj��Amx��1<adfkQ'e��?0kpWg���udA�q$
*%�AUH}�<�| q	D��T[�hPxvT�s�mew"-�( 1A��fi�#�baiox<z��QNt�d��%��pLKs&��L#ld��=0��tq[f`/w'�;�*"|0 � DjMw'��o�h$*�xsxyH�on6|p�|/4`4x�jx`d%o"���plS
��!q_vw`L.��eF�kdp[�s7eu{9�mm�c��>�0ww�L�R�X),bE�h&�mn)~�0$!*ailS�)�f�G�Nb�bBf���(;@]�/wm|iF?q0��*� $�'k��a�hh�6�|kegp#lnBkv{ }*�/.w7 �/{aJ(�!`{�a1|mom/1�%�2rhi{.zd��mGO�(��k+d�56�jzer�Q�v�y2�do�m��2��H{�l|U�o`hp"scbnh��ERwi$T)4?�A&�BT �!RdTUqL;j%UA8|� �i����hd;<_Wц�ɬpI!�Ct|bi"uP�unum�j�z Tv!d��zD�!&jZ�$lBC�(�#ko�|�r�T(u��y�QQ��2a+g�J}'�wyKO�17T�DQym�(5^�f��`�sQM`|Zph $  �$&$8E~�LE/7s�?�qG}c�}ZSRp](/$ar�`~l 3J��n-ibd�""�RReDl�`th3�gE�Cxe`��Hte�!�PY�?@0"( \( ��1%!A�y�[h��HsM!�x����i�vCehm��c*a���>�c0A_i|U�`|	G�c$lbAk��p$�}`A�t.�mD:=(\�9��fQ�|i��K�esap`<}ntn�Y��-�Zf`sm��)ۨ_gMg�inu}l'M{e�bo^83^z(!22�fxhz�[raw�Pl!YE�5�dl0u�}4�Xv�j.��ia]�t+4'(y` H�'B�fq|$)�.�.(�p��3.=pVzCuD�E}u.0A���M.}pE;�SAlU�\E�Z�K\�2��EX��u8c�#D4kF�po��\�?i{�$1�xKew�Y�!c��E�dM},�H$<Hc�}xe{��eYECEM�W�@ck{�OZE�vl0/M1s�hOZz6�},��+&pP:�+d�a4�)cnTXoq�HRl@�q�Mj?�%	a�e�!jdz�!yCǑrh�d�� �;""kkwW2Nq��3llW`yM!}�u|eMan��suxdd7�0<,?t�c�}+�t'4�dm���k\m�l�1��e="s � ``0p `ma�m0}�z<o�N}7pV1TA!�eةr�4D:E�U�T�}<ts<�nWT���hi#uuam�5l}%)=
�08 !(j3  pu�o� 0ՓE��4A-Dm$/pa5x��c�$�i�u wc�p��g<]�g�3yruc��!(@� ,c�,+^"<�Kp�-�t[cF@-�}�a;_(<�G�@)�o|h=< {
pp04�A�#�3t<s!l�}*9�a��Ae`up�0�n%U��P!�4�|1xA�al�]��0Z4H �!6�p)yJ(� % 0%"�c@304ej�gwX�A9ue�-==�_g"�m�j�e��=-�D��4 049<�l�a0dc.�|�p.���`veR3J����9,s`y]DSk=x-v@B�   �Vem
�No IPe$0) "-?H�l� ���Of���lOoƠ��aa4�sK`=��kE<$�Afp,$;}y1Eb)�;��� �"5��_OgLt�3uy8g��0|,QJoa�<��c,ue1 � 0  d~*a�1 �lmJ*!0�� ��{"0qP}�C&(��l��I�NB�L<bik."Sw��e�r��}Pk}0�pT�+vCa �J�Jk!�R h!d=�%4�Qp��qe`��p7|`�MxUC==<b"1i<�a`qc0!ά�C-��+af�1�
(11� a ��3�`yk,+rNS!Lh5��j�80����H��p�%je�qA��a%�^{)3I=`� �h%!a%fe��0���a$ ��m@eC/�U|m��e<t��px�)�C#,mZO0nhaw]'�c�Eo�-�Frakcm?"Oe���/?.@@h�U
a5 �_jK 4�?c�czd�#�L_�, �I0%a"3 �sOr�@p`c��w�TVy��( ���@a�` 0h=� E
�k���`$1."mk�+�/j$/8e���|?i-?)�%-/	�/))��?,-),,?-�%m1�-D/�I,�)���F-��m��eo$A�i2.Swwl�N�!q�,fu>$'Jz��#MM��3�qC��.jY��*�yjC>3M`:Vzne�$MaW<(�tV�{z�&�l�!U�)aoL+}F{g`�f�:�z+�( Bfa/e��z&	AGR](Zb v%/'$�-g$,,�--M/-=-�M	)},�+,>	�h�%/��+�/�$�+E-mg�mk++--̆%M+�/�-,L�fe
K���!��K4$�c�iqlt4G u[�l@pc,ac13Mm� �h)�a/i�!Fz0�<�!L(�X#7iAnBl� P0`<(! C x氦c�g�(?m�t	Q |�`���k�j~ܠid�Q��!mu`i�|2`���H�#m~p,unA�Wlf���h>)��l1 �)-E^`tE,�f��t<��&`j�Otw�UE�.4.P'f.lqb�Z"�h@{�)gq�uf48�3c�ld�?�Tm���ae� �c%OtF�x mn�hz`u�#f}Tso~`d)-EJ�3+��bq��B�Ca|�r`"i�v=eH�"�>�J�gk.st(TafgUdiȁ�� �yKa�e�gP0�h�!'q�xa�w)=kt�$Ls�^W"�^f��h�?l�dX0�" `�js�N�i�t�`z�'�g�N�i�"�gRc{V$d!C1* #�d�o&x|<34�g����t`"@<{�OK�d~ 
:%vw��^nJ�nGny�K at�
-AHg
yt$�_�Df�)���Jmk�vvb�'5aqqkvWW`�mS��JU]}�F�DC��o!�(%)��((ko~b� C��PPF�KG]�_�u09 cT�GW����k�w�%�0�n]oG[reOWN8��@mmOg`�[b3'@ziG$�}`
&J��Agr �`g-ddex+$@81�c��b�gsujBH!ns`I�"{/0hT! �o�^��o'Iw�?�olk�.A`Goj/i�$�o�ig�;�<0($l`is�?ywI�t�t{d8m6l�$qa�&� 0Lf�xS�EN�}�r0�Zll�j%&0w@ | 3ZjMt�}�{lBck��w�)2՘X(qa�!1���,Sco�`iE	jw�!3H�L%#�{`!�t� :0g}�@�9�aQ�j�qo�:X�q`!   �zbznO $� 1<M
N�*e"��hdsoUv^�nd!�?�()	-!iG!(r�As.�@�l����i�i�CE��� +��B��A suf�	W�TbLsB^�u��m��f(�l
q t�R�:b�� " �(���^�A�eo�_�d*��7r&7�f4mwM#�,GSY�NY.EW@K��-m�*=�T �pi%snZ�85��qde�imDu}oh�  |>0[*�`���
!%�塠��,l�9I!9	 " |�	,:�("FH\b<��H�i�gxcj|$Vd�7i	sKe j1 cF`�d�lW��e=,#ICoyk��a�j�-!zK�`�'"䥀��e#UVe��el�aga<9��( *�.�r}g�N3"'"h.�* `�(D#����_�Av�fu)�j6�al�RcL�K�2re,�v�8C�WQN�,D�rY&�F�j!
#*�0 �IgW*~g}l�}u@�|�Bt�*h� ��?o�$�$.DiMjis.}%��g��(q�$!:`0ed|D��e:#A)�#`#s*`  s_\T)�kH�yf�exwr�VcTeJ��"RN�e|Niei`���2k�b""*h�X T�S)D�Dg-$�|(8xVD�� (4�:�/�u%�bcz��m6!4�7�ie~tn�Cd8p} ��%�L�(�uNvo;#K"80��(j �#od�dP.slA!sNkma}�,Es*Lc/n�d��ly�r�deq�*�
 4 8���*lXthdb.kc|laF$hwaN���wa�/`[� $� "�!�`sAJd�~q��h����r��b�l-��CsWN��A]nC�� �{  mr�",�h.���0l`l� 4�i:g]^\pe�o4"�qZcoyDroP��a�b��y*J($rj0"d�Bl ]i�pZV`e)UOT:
%$�x�Z""���N�>C�l�e`0jNbͧ/�z !��#_�ic*<D
o /\d��tl�p3)�� r�0(.�t=x%e9Fnx�-f���/u�o�l��t%mke`駠�@;y	`"E!N\31�-(69c!gEP�~sl�vT�) ei$L�|jw�de�`Ujy.�m�z�1�k!�eu(ahv>ex!U�m�GF~k�= |�R�Hy>�ufT�Qt����"0��'�f�jw8p�/�TUvH��8 co5�$g�Z<A�<glmMb�o�lc/�>P�3S�(a �%i�t�M�+%�\flghY�E5t#B�f��f�"Og�!�HTFz9���y�*��A1�nD5�
.djb&)v��*2(�}
h   �sv�Y�t�9:y
D� `e�hd(( h;Q
Ns7�tpe&@qDP"�%0�B". -Rq�ysn�9d(!)`?k�bF�e؁;f_w�:�@�s�$�n4i`zv/H�Peo��<p��Vd%W� �eB�!�:)*"�" "�D�\��Lwt~`p*cn+~mx�_s�tLc�mfh��MC�R\[�QRUE�W~�28)2�z�b(�O$$g!e�s[�T(v,��lWc�>&nE.�)b[B�iqxY@k(�B�4 1 �m��@d
��(uȪql^)�Yh�w	ei�*(uR�v{�$P-�|�
 "`>}�sZ�6CH):9
(�00!�w�e(i:lq�O�I�@z<1zll"�p
0(� 1� Rc4wrl�
 "�(�!}�q (��0M��|�A)�^a��B�10ik�nJm%e�~T,0EtE�_yKZW)G��#:>
� &�!0�.�fjGeD�p�vg��~p*��ˊ%x �8@4.�WN[m{E1AH�i|b�`cUfSe{.� "�2ih$GIeaLpq�d'Mc$Hei�(L`A`�%+XD"�b��D��r�IGotPT1��q)t�{&!�ad,R�q�$d�`r*k�gaE��5Ff�k��<y(�&^1���I/a2~�4p5ud}7� # !)���*:)`�(�jɄl' (L=�_T1��}�'��w+�-)߯\my?-%,H�%;�,)(e	�9-2)l/#=�)��)�l�}-�	E-?m%-� ��#X��q}Usi91��=:5�3�1&-ti|/z�W�S��cu�!�*Licn�c3h0u.feQ Yt7�Nu���eudtj�R�swl�s n/r,�4Sn�i1��k .]!`66HY0�L[WA�"�#4!5�]�9�-l&�4-,-!�b,%=�)�<��=-%-+--M-�4-�	0�yeI�]	%m��-M,%--e�(�-$-䒨a"�o�((c&zr,0G(e!Ud|�0h��
22"u{mp�iemZl`	qm$>  5`�Vze w(Ol��r2n�`lqqx"t�#uV��ns)4m"�f�jt% )uuOGMaqcc��qs w;"�a�|��qw�u�e�]��$>`1*���!T!rEl�e�kT;,7eOkNG�wud�0iEa}}�_�o�ex�gfo_�]��&(�w�2#'�NstWJcO�7�g f2Fwf�|�x`k$�.�-���f�_���$4�%`{:.7��USp�!Pg+)$#smn�P`W2�~VFJu$�`�1{EipS[�Iw#~`c9��#;M��55NqM�nQS�H<!d)0�nM�"�k�:mXE.T�KUqe}q} !H.��G�LnV^B�G��NV� �p�{��Dmgl�T!@d�� M^�^k�Y�_@
0(��qT D�soCG;&h74�B'+!�s�n�� t�_JIGێ���Ia�}�'d>c=w&&�3�cOG2�`@
�F@SF�!S�NZF)�"mib�sE�(�;�,�cv+j�fnnc�f!�hs��11+�cwawat�r)�gzc�b�`{��x�<^I�_^enbD}w��t�i{.sgfdG�e��'-bgtbk3�;�0r0 �xcpo�[BPivq�^�va�tT�4�dR� x�'W*K�!��`FOP~���#qgm&Z�4,3�d{`�D�=�d(skwxP���+oRg%�*�c,H�&���� �.�$ �EVd,fD%DU(� �  &ampo��s1)0* $`u(�pTKi��sOo}9g�K�{ �p�uv1 $�`3�?!���|dtDAe{� � $p#�0a6PN/�0y ,` �X! �3*�� 4�uvg�o�'q�UJ:%d#�"��xSaPgele6|(f-g|7��R0.e@~�"A!�E�$OgH8o�LGX��d~kGlk��tjr>����B�Q"�5r �;$c=�r&�ag%��W9�)n�h�^�eF?busfd�x�h�%<!hDv�n4L�f4%r.L>-�/�u�a�u! ewAZTh/B�^0f@-��mT8%v!� i3N[f@�tlEf/'4vmn(���D')3�!� �@QdW�4$EN����/�(d��mm�l}��n�E_k�Y VSF�EJ&�6�f� �:��x,q�_b&$��GFCoe~+i�=)}2"@2(*|��Y?;`S�CtivU� cj�u�
�b#D5xN�!���i{tiVqDt
": $" �0-Vr��eilczaj�Acr;wo:`+)8$$�$�4A�Trn�+	q	(P�C:0l$P`�HK[`�u9a���g��sq�w%;n# (`i&�v+`U���k-0n��(�oa�<uDp/$mT]U�	E�&5��[9�!U &�&�3Zl�U� ~0h-"[m�f��FoG��H�-�0En\	*��$)�+��vcnud); �i((r$ tqpg�Ta*�4�0<DcuA6����)j�Ag/�u�0$b�$`B'"A>�Lo�QL|n8Ą��9m=��Hk�+�.-�hg�

�",J`�+4�>4�4A�v��=,�E�i�>E�u$pt�}a��cf�-=<$b�q�,q|d�dq�@"%jA1<dq�r�<#z`�ah��+uif"e0����c�A,e��f7r칞��&` �}
�!a8!!qrjc�qaLing>tI0m!SeEgpl��]oine��סqr�s�`CAE&�;en�Kb��]LiyyL�~��t(cR(a' p�F�pO#$y��ength === 0) {
        trapElement.focus();
      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
        elements[elements.length - 1].focus();
      } else {
        elements[0].focus();
      }
    }

    _handleKeydown(event) {
      if (event.key !== TAB_KEY) {
        return;
      }

      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    }

    _getConfig(config) {
      config = { ...Default$6,
        ...(typeof config === 'object' ? config : {})
      };
      typeCheckConfig(NAME$7, config, DefaultType$6);
      return config;
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$6 = 'modal';
  const DATA_KEY$6 = 'bs.modal';
  const EVENT_KEY$6 = `.${DATA_KEY$6}`;
  const DATA_API_KEY$3 = '.data-api';
  const ESCAPE_KEY$1 = 'Escape';
  const Default$5 = {
    backdrop: true,
    keyboard: true,
    focus: true
  };
  const DefaultType$5 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean'
  };
  const EVENT_HIDE$3 = `hide${EVENT_KEY$6}`;
  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$6}`;
  const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$6}`;
  const EVENT_SHOW$3 = `show${EVENT_KEY$6}`;
  const EVENT_SHOWN$3 = `shown${EVENT_KEY$6}`;
  const EVENT_RESIZE = `resize${EVENT_KEY$6}`;
  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$6}`;
  const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$6}`;
  const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY$6}`;
  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$6}`;
  const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const CLASS_NAME_OPEN = 'modal-open';
  const CLASS_NAME_FADE$3 = 'fade';
  const CLASS_NAME_SHOW$4 = 'show';
  const CLASS_NAME_STATIC = 'modal-static';
  const OPEN_SELECTOR$1 = '.modal.show';
  const SELECTOR_DIALOG = '.modal-dialog';
  const SELECTOR_MODAL_BODY = '.modal-body';
  const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Modal extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._config = this._getConfig(config);
      this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._isShown = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollBar = new ScrollBarHelper();
    } // Getters


    static get Default() {
      return Default$5;
    }

    static get NAME() {
      return NAME$6;
    } // Public


    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }

    show(relatedTarget) {
      if (this._isShown || this._isTransitioning) {
        return;
      }

      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget
      });

      if (showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;

      if (this._isAnimated()) {
        this._isTransitioning = true;
      }

      this._scrollBar.hide();

      document.body.classList.add(CLASS_NAME_OPEN);

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
        EventHandler.one(this._element, EVENT_MOUSEUP_DISMISS, event => {
          if (event.target === this._element) {
            this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(() => this._showElement(relatedTarget));
    }

    hide() {
      if (!this._isShown || this._isTransitioning) {
        return;
      }

      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);

      if (hideEvent.defaultPrevented) {
        return;
      }

      this._isShown = false;

      const isAnimated = this._isAnimated();

      if (isAnimated) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      this._focustrap.deactivate();

      this._element.classList.remove(CLASS_NAME_SHOW$4);

      EventHandler.off(this._element, EVENT_CLICK_DISMISS);
      EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);

      this._queueCallback(() => this._hideModal(), this._element, isAnimated);
    }

    dispose() {
      [window, this._dialog].forEach(htmlElement => EventHandler.off(htmlElement, EVENT_KEY$6));

      this._backdrop.dispose();

      this._focustrap.deactivate();

      super.dispose();
    }

    handleUpdate() {
      this._adjustDialog();
    } // Private


    _initializeBackDrop() {
      return new Backdrop({
        isVisible: Boolean(this._config.backdrop),
        // 'static' option will be translated to true, and booleans will keep their value
        isAnimated: this._isAnimated()
      });
    }

    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }

    _getConfig(config) {
      config = { ...Default$5,
        ...Manipulator.getDataAttributes(this._element),
        ...(typeof config === 'object' ? config : {})
      };
      typeCheckConfig(NAME$6, config, DefaultType$5);
      return config;
    }

    _showElement(relatedTarget) {
      const isAnimated = this._isAnimated();

      const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.append(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      this._element.scrollTop = 0;

      if (modalBody) {
        modalBody.scrollTop = 0;
      }

      if (isAnimated) {
        reflow(this._element);
      }

      this._element.classList.add(CLASS_NAME_SHOW$4);

      const transitionComplete = () => {
        if (this._config.focus) {
          this._focustrap.activate();
        }

        this._isTransitioning = false;
        EventHandler.trigger(this._element, EVENT_SHOWN$3, {
          relatedTarget
        });
      };

      this._queueCallback(transitionComplete, this._dialog, isAnimated);
    }

    _setEscapeEvent() {
      if (this._isShown) {
        EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => {
          if (this._config.keyboard && event.key === ESCAPE_KEY$1) {
            event.preventDefault();
            this.hide();
          } else if (!this._config.keyboard && event.key === ESCAPE_KEY$1) {
            this._triggerBackdropTransition();
          }
        });
      } else {
        EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS$1);
      }
    }

    _setResizeEvent() {
      if (this._isShown) {
        EventHandler.on(window, EVENT_RESIZE, () => this._adjustDialog());
      } else {
        EventHandler.off(window, EVENT_RESIZE);
      }
    }

    _hideModal() {
      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._element.removeAttribute('role');

      this._isTransitioning = false;

      this._backdrop.hide(() => {
        document.body.classList.remove(CLASS_NAME_OPEN);

        this._resetAdjustments();

        this._scrollBar.reset();

        EventHandler.trigger(this._element, EVENT_HIDDEN$3);
      });
    }

    _showBackdrop(callback) {
      EventHandler.on(this._element, EVENT_CLICK_DISMISS, event => {
        if (this._ignoreBackdropClick) {
          this._ignoreBackdropClick = false;
          return;
        }

        if (event.target !== event.currentTarget) {
          return;
        }

        if (this._config.backdrop === true) {
          this.hide();
        } else if (this._config.backdrop === 'static') {
          this._triggerBackdropTransition();
        }
      });

      this._backdrop.show(callback);
    }

    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_FADE$3);
    }

    _triggerBackdropTransition() {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);

      if (hideEvent.defaultPrevented) {
        return;
      }

      const {
        classList,
        scrollHeight,
        style
      } = this._element;
      const isModalOverflowing = scrollHeight > document.documentElement.clientHeight; // return if the following background transition hasn't yet completed

      if (!isModalOverflowing && style.overflowY === 'hidden' || classList.contains(CLASS_NAME_STATIC)) {
        return;
      }

      if (!isModalOverflowing) {
        style.overflowY = 'hidden';
      }

      classList.add(CLASS_NAME_STATIC);

      this._queueCallback(() => {
        classList.remove(CLASS_NAME_STATIC);

        if (!isModalOverflowing) {
          this._queueCallback(() => {
            style.overflowY = '';
          }, this._dialog);
        }
      }, this._dialog);

      this._element.focus();
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // ----------------------------------------------------------------------


    _adjustDialog() {
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      const scrollbarWidth = this._scrollBar.getWidth();

      const isBodyOverflowing = scrollbarWidth > 0;

      if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
        this._element.style.paddingLeft = `${scrollbarWidth}px`;
      }

      if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
        this._element.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    } // Static


    static jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        const data = Modal.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](relatedTarget);
      });
    }

  }
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
    const target = getElementFromSelector(this);

    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    EventHandler.one(target, EVENT_SHOW$3, showEvent => {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      EventHandler.one(target, EVENT_HIDDEN$3, () => {
        if (isVisible(this)) {
          this.focus();
        }
      });
    }); // avoid conflict when clicking moddal toggler while another one is open

    const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);

    if (allReadyOpen) {
      Modal.getInstance(allReadyOpen).hide();
    }

    const data = Modal.getOrCreateInstance(target);
    data.toggle(this);
  });
  enableDismissTrigger(Modal);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Modal to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Modal);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): offcanvas.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$5 = 'offcanvas';
  const DATA_KEY$5 = 'bs.offcanvas';
  const EVENT_KEY$5 = `.${DATA_KEY$5}`;
  const DATA_API_KEY$2 = '.data-api';
  const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$5}${DATA_API_KEY$2}`;
  const ESCAPE_KEY = 'Escape';
  const Default$4 = {
    backdrop: true,
    keyboard: true,
    scroll: false
  };
  const DefaultType$4 = {
    backdrop: 'boolean',
    keyboard: 'boolean',
    scroll: 'boolean'
  };
  const CLASS_NAME_SHOW$3 = 'show';
  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
  const OPEN_SELECTOR = '.offcanvas.show';
  const EVENT_SHOW$2 = `show${EVENT_KEY$5}`;
  const EVENT_SHOWN$2 = `shown${EVENT_KEY$5}`;
  const EVENT_HIDE$2 = `hide${EVENT_KEY$5}`;
  const EVENT_HIDDEN$2 = `hidden${EVENT_KEY$5}`;
  const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$5}${DATA_API_KEY$2}`;
  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$5}`;
  const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Offcanvas extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._config = this._getConfig(config);
      this._isShown = false;
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();

      this._addEventListeners();
    } // Getters


    static get NAME() {
      return NAME$5;
    }

    static get Default() {
      return Default$4;
    } // Public


    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }

    show(relatedTarget) {
      if (this._isShown) {
        return;
      }

      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
        relatedTarget
      });

      if (showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;
      this._element.style.visibility = 'visible';

      this._backdrop.show();

      if (!this._config.scroll) {
        new ScrollBarHelper().hide();
      }

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      this._element.classList.add(CLASS_NAME_SHOW$3);

      const completeCallBack = () => {
        if (!this._config.scroll) {
          this._focustrap.activate();
        }

        EventHandler.trigger(this._element, EVENT_SHOWN$2, {
          relatedTarget
        });
      };

      this._queueCallback(completeCallBack, this._element, true);
    }

    hide() {
      if (!this._isShown) {
        return;
      }

      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);

      if (hideEvent.defaultPrevented) {
        return;
      }

      this._focustrap.deactivate();

      this._element.blur();

      this._isShown = false;

      this._element.classList.remove(CLASS_NAME_SHOW$3);

      this._backdrop.hide();

      const completeCallback = () => {
        this._element.setAttribute('aria-hidden', true);

        this._element.removeAttribute('aria-modal');

        this._element.removeAttribute('role');

        this._element.style.visibility = 'hidden';

        if (!this._config.scroll) {
          new ScrollBarHelper().reset();
        }

        EventHandler.trigger(this._element, EVENT_HIDDEN$2);
      };

      this._queueCallback(completeCallback, this._element, true);
    }

    dispose() {
      this._backdrop.dispose();

      this._focustrap.deactivate();

      super.dispose();
    } // Private


    _getConfig(config) {
      config = { ...Default$4,
        ...Manipulator.getDataAttributes(this._element),
        ...(typeof config === 'object' ? config : {})
      };
      typeCheckConfig(NAME$5, config, DefaultType$4);
      return config;
    }

    _initializeBackDrop() {
      return new Backdrop({
        className: CLASS_NAME_BACKDROP,
        isVisible: this._config.backdrop,
        isAnimated: true,
        rootElement: this._element.parentNode,
        clickCallback: () => this.hide()
      });
    }

    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }

    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
        if (this._config.keyboard && event.key === ESCAPE_KEY) {
          this.hide();
        }
      });
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Offcanvas.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](this);
      });
    }

  }
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
    const target = getElementFromSelector(this);

    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    if (isDisabled(this)) {
      return;
    }

    EventHandler.one(target, EVENT_HIDDEN$2, () => {
      // focus on trigger when it is closed
      if (isVisible(this)) {
        this.focus();
      }
    }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

    const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);

    if (allReadyOpen && allReadyOpen !== target) {
      Offcanvas.getInstance(allReadyOpen).hide();
    }

    const data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => SelectorEngine.find(OPEN_SELECTOR).forEach(el => Offcanvas.getOrCreateInstance(el).show()));
  enableDismissTrigger(Offcanvas);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  defineJQueryPlugin(Offcanvas);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): util/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
   */

  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
   */

  const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  const allowedAttribute = (attribute, allowedAttributeList) => {
    const attributeName = attribute.nodeName.toLowerCase();

    if (allowedAttributeList.includes(attributeName)) {
      if (uriAttributes.has(attributeName)) {
        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
      }

      return true;
    }

    const regExp = allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp); // Check if a regular expression validates the attribute.

    for (let i = 0, len = regExp.length; i < len; i++) {
      if (regExp[i].test(attributeName)) {
        return true;
      }
    }

    return false;
  };

  const DefaultAllowlist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
    if (!unsafeHtml.length) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    const domParser = new window.DOMParser();
    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));

    for (let i = 0, len = elements.length; i < len; i++) {
      const element = elements[i];
      const elementName = element.nodeName.toLowerCase();

      if (!Object.keys(allowList).includes(elementName)) {
        element.remove();
        continue;
      }

      const attributeList = [].concat(...element.attributes);
      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
      attributeList.forEach(attribute => {
        if (!allowedAttribute(attribute, allowedAttributes)) {
          element.removeAttribute(attribute.nodeName);
        }
      });
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$4 = 'tooltip';
  const DATA_KEY$4 = 'bs.tooltip';
  const EVENT_KEY$4 = `.${DATA_KEY$4}`;
  const CLASS_PREFIX$1 = 'bs-tooltip';
  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
  const DefaultType$3 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(array|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacements: 'array',
    boundary: '(string|element)',
    customClass: '(string|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    allowList: 'object',
    popperConfig: '(null|object|function)'
  };
  const AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: isRTL() ? 'left' : 'right',
    BOTTOM: 'bottom',
    LEFT: isRTL() ? 'right' : 'left'
  };
  const Default$3 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: [0, 0],
    container: false,
    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
    boundary: 'clippingParents',
    customClass: '',
    sanitize: true,
    sanitizeFn: null,
    allowList: DefaultAllowlist,
    popperConfig: null
  };
  const Event$2 = {
    HIDE: `hide${EVENT_KEY$4}`,
    HIDDEN: `hidden${EVENT_KEY$4}`,
    SHOW: `show${EVENT_KEY$4}`,
    SHOWN: `shown${EVENT_KEY$4}`,
    INSERTED: `inserted${EVENT_KEY$4}`,
    CLICK: `click${EVENT_KEY$4}`,
    FOCUSIN: `focusin${EVENT_KEY$4}`,
    FOCUSOUT: `focusout${EVENT_KEY$4}`,
    MOUSEENTER: `mouseenter${EVENT_KEY$4}`,
    MOUSELEAVE: `mouseleave${EVENT_KEY$4}`
  };
  const CLASS_NAME_FADE$2 = 'fade';
  const CLASS_NAME_MODAL = 'modal';
  const CLASS_NAME_SHOW$2 = 'show';
  const HOVER_STATE_SHOW = 'show';
  const HOVER_STATE_OUT = 'out';
  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
  const EVENT_MODAL_HIDE = 'hide.bs.modal';
  const TRIGGER_HOVER = 'hover';
  const TRIGGER_FOCUS = 'focus';
  const TRIGGER_CLICK = 'click';
  const TRIGGER_MANUAL = 'manual';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Tooltip extends BaseComponent {
    constructor(element, config) {
      if (typeof Popper__namespace === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
      }

      super(element); // private

      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this._config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    } // Getters


    static get Default() {
      return Default$3;
    }

    static get NAME() {
      return NAME$4;
    }

    static get Event() {
      return Event$2;
    }

    static get DefaultType() {
      return DefaultType$3;
    } // Public


    enable() {
      this._isEnabled = true;
    }

    disable() {
      this._isEnabled = false;
    }

    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }

    toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        const context = this._initializeOnDelegatedTarget(event);

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$2)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    }

    dispose() {
      clearTimeout(this._timeout);
      EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);

      if (this.tip) {
        this.tip.remove();
      }

      this._disposePopper();

      super.dispose();
    }

    show() {
      if (this._element.style.display === 'none') {
        throw new Error('Please use show on visible elements');
      }

      if (!(this.isWithContent() && this._isEnabled)) {
        return;
      }

      const showEvent = EventHandler.trigger(this._element, this.constructor.Event.SHOW);
      const shadowRoot = findShadowRoot(this._element);
      const isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);

      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      } // A trick to recreate a tooltip in case a new title is given by using the NOT documented `data-bs-original-title`
      // This will be removed later in favor of a `setContent` method


      if (this.constructor.NAME === 'tooltip' && this.tip && this.getTitle() !== this.tip.querySelector(SELECTOR_TOOLTIP_INNER).innerHTML) {
        this._disposePopper();

        this.tip.remove();
        this.tip = null;
      }

      const tip = this.getTipElement();
      const tipId = getUID(this.constructor.NAME);
      tip.setAttribute('id', tipId);

      this._element.setAttribute('aria-describedby', tipId);

      if (this._config.animation) {
        tip.classList.add(CLASS_NAME_FADE$2);
      }

      const placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;

      const attachment = this._getAttachment(placement);

      this._addAttachmentClass(attachment);

      const {
        container
      } = this._config;
      Data.set(tip, this.constructor.DATA_KEY, this);

      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
        container.append(tip);
        EventHandler.trigger(this._element, this.constructor.Event.INSERTED);
      }

      if (this._popper) {
        this._popper.update();
      } else {
        this._popper = Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
      }

      tip.classList.add(CLASS_NAME_SHOW$2);

      const customClass = this._resolvePossibleFunction(this._config.customClass);

      if (customClass) {
        tip.classList.add(...customClass.split(' '));
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement) {
        [].concat(...document.body.children).forEach(element => {
          EventHandler.on(element, 'mouseover', noop);
        });
      }

      const complete = () => {
        const prevHoverState = this._hoverState;
        this._hoverState = null;
        EventHandler.trigger(this._element, this.constructor.Event.SHOWN);

        if (prevHoverState === HOVER_STATE_OUT) {
          this._leave(null, this);
        }
      };

      const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$2);

      this._queueCallback(complete, this.tip, isAnimated);
    }

    hide() {
      if (!this._popper) {
        return;
      }

      const tip = this.getTipElement();

      const complete = () => {
        if (this._isWithActiveTrigger()) {
          return;
        }

        if (this._hoverState !== HOVER_STATE_SHOW) {
          tip.remove();
        }

        this._cleanTipClass();

        this._element.removeAttribute('aria-describedby');

        EventHandler.trigger(this._element, this.constructor.Event.HIDDEN);

        this._disposePopper();
      };

      const hideEvent = EventHandler.trigger(this._element, this.constructor.Event.HIDE);

      if (hideEvent.defaultPrevented) {
        return;
      }

      tip.classList.remove(CLASS_NAME_SHOW$2); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        [].concat(...document.body.children).forEach(element => EventHandler.off(element, 'mouseover', noop));
      }

      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$2);

      this._queueCallback(complete, this.tip, isAnimated);

      this._hoverState = '';
    }

    update() {
      if (this._popper !== null) {
        this._popper.update();
      }
    } // Protected


    isWithContent() {
      return Boolean(this.getTitle());
    }

    getTipElement() {
      if (this.tip) {
        return this.tip;
      }

      const element = document.createElement('div');
      element.innerHTML = this._config.template;
      const tip = element.children[0];
      this.setContent(tip);
      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
      this.tip = tip;
      return this.tip;
    }

    setContent(tip) {
      this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TOOLTIP_INNER);
    }

    _sanitizeAndSetContent(template, content, selector) {
      const templateElement = SelectorEngine.findOne(selector, template);

      if (!content && templateElement) {
        templateElement.remove();
        return;
      } // we use append for html objects to maintain js events


      this.setElementContent(templateElement, content);
    }

    setElementContent(element, content) {
      if (element === null) {
        return;
      }

      if (isElement(content)) {
        content = getElement(content); // content is a DOM node or a jQuery

        if (this._config.html) {
          if (content.parentNode !== element) {
            element.innerHTML = '';
            element.append(content);
          }
        } else {
          element.textContent = content.textContent;
        }

        return;
      }

      if (this._config.html) {
        if (this._config.sanitize) {
          content = sanitizeHtml(content, this._config.allowList, this._config.sanitizeFn);
        }

        element.innerHTML = content;
      } else {
        element.textContent = content;
      }
    }

    getTitle() {
      const title = this._element.getAttribute('data-bs-original-title') || this._config.title;

      return this._resolvePossibleFunction(title);
    }

    updateAttachment(attachment) {
      if (attachment === 'right') {
        return 'end';
      }

      if (attachment === 'left') {
        return 'start';
      }

      return attachment;
    } // Private


    _initializeOnDelegatedTarget(event, context) {
      return context || this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
    }

    _getOffset() {
      const {
        offset
      } = this._config;

      if (typeof offset === 'string') {
        return offset.split(',').map(val => Number.parseInt(val, 10));
      }

      if (typeof offset === 'function') {
        return popperData => offset(popperData, this._element);
      }

      return offset;
    }

    _resolvePossibleFunction(content) {
      return typeof content === 'function' ? content.call(this._element) : content;
    }

    _getPopperConfig(attachment) {
      const defaultBsPopperConfig = {
        placement: attachment,
        modifiers: [{
          name: 'flip',
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }, {
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'arrow',
          options: {
            element: `.${this.constructor.NAME}-arrow`
          }
        }, {
          name: 'onChange',
          enabled: true,
          phase: 'afterWrite',
          fn: data => this._handlePopperPlacementChange(data)
        }],
        onFirstUpdate: data => {
          if (data.options.placement !== data.placement) {
            this._handlePopperPlacementChange(data);
          }
        }
      };
      return { ...defaultBsPopperConfig,
        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
      };
    }

    _addAttachmentClass(attachment) {
      this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(attachment)}`);
    }

    _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    }

    _setListeners() {
      const triggers = this._config.trigger.split(' ');

      triggers.forEach(trigger => {
        if (trigger === 'click') {
          EventHandler.on(this._element, this.constructor.Event.CLICK, this._config.selector, event => this.toggle(event));
        } else if (trigger !== TRIGGER_MANUAL) {
          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN;
          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
          EventHandler.on(this._element, eventIn, this._config.selector, event => this._enter(event));
          EventHandler.on(this._element, eventOut, this._config.selector, event => this._leave(event));
        }
      });

      this._hideModalHandler = () => {
        if (this._element) {
          this.hide();
        }
      };

      EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);

      if (this._config.selector) {
        this._config = { ...this._config,
          trigger: 'manual',
          selector: ''
        };
      } else {
        this._fixTitle();
      }
    }

    _fixTitle() {
      const title = this._element.getAttribute('title');

      const originalTitleType = typeof this._element.getAttribute('data-bs-original-title');

      if (title || originalTitleType !== 'string') {
        this._element.setAttribute('data-bs-original-title', title || '');

        if (title && !this._element.getAttribute('aria-label') && !this._element.textContent) {
          this._element.setAttribute('aria-label', title);
        }

        this._element.setAttribute('title', '');
      }
    }

    _enter(event, context) {
      context = this._initializeOnDelegatedTarget(event, context);

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
      }

      if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$2) || context._hoverState === HOVER_STATE_SHOW) {
        context._hoverState = HOVER_STATE_SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_SHOW;

      if (!context._config.delay || !context._config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(() => {
        if (context._hoverState === HOVER_STATE_SHOW) {
          context.show();
        }
      }, context._config.delay.show);
    }

    _leave(event, context) {
      context = this._initializeOnDelegatedTarget(event, context);

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_OUT;

      if (!context._config.delay || !context._config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(() => {
        if (context._hoverState === HOVER_STATE_OUT) {
          context.hide();
        }
      }, context._config.delay.hide);
    }

    _isWithActiveTrigger() {
      for (const trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    }

    _getConfig(config) {
      const dataAttributes = Manipulator.getDataAttributes(this._element);
      Object.keys(dataAttributes).forEach(dataAttr => {
        if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
          delete dataAttributes[dataAttr];
        }
      });
      config = { ...this.constructor.Default,
        ...dataAttributes,
        ...(typeof config === 'object' && config ? config : {})
      };
      config.container = config.container === false ? document.body : getElement(config.container);

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      typeCheckConfig(NAME$4, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
      }

      return config;
    }

    _getDelegateConfig() {
      const config = {};

      for (const key in this._config) {
        if (this.constructor.Default[key] !== this._config[key]) {
          config[key] = this._config[key];
        }
      } // In the future can be replaced with:
      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
      // `Object.fromEntries(keysWithDifferentValues)`


      return config;
    }

    _cleanTipClass() {
      const tip = this.getTipElement();
      const basicClassPrefixRegex = new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`, 'g');
      const tabClass = tip.getAttribute('class').match(basicClassPrefixRegex);

      if (tabClass !== null && tabClass.length > 0) {
        tabClass.map(token => token.trim()).forEach(tClass => tip.classList.remove(tClass));
      }
    }

    _getBasicClassPrefix() {
      return CLASS_PREFIX$1;
    }

    _handlePopperPlacementChange(popperData) {
      const {
        state
      } = popperData;

      if (!state) {
        return;
      }

      this.tip = state.elements.popper;

      this._cleanTipClass();

      this._addAttachmentClass(this._getAttachment(state.placement));
    }

    _disposePopper() {
      if (this._popper) {
        this._popper.destroy();

        this._popper = null;
      }
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tooltip.getOrCreateInstance(this, config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }

          data[config]();
        }
      });
    }

  }
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Tooltip to jQuery only if jQuery is present
   */


  defineJQueryPlugin(Tooltip);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$3 = 'popover';
  const DATA_KEY$3 = 'bs.popover';
  const EVENT_KEY$3 = `.${DATA_KEY$3}`;
  const CLASS_PREFIX = 'bs-popover';
  const Default$2 = { ...Tooltip.Default,
    placement: 'right',
    offset: [0, 8],
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>'
  };
  const DefaultType$2 = { ...Tooltip.DefaultType,
    content: '(string|element|function)'
  };
  const Event$1 = {
    HIDE: `hide${EVENT_KEY$3}`,
    HIDDEN: `hidden${EVENT_KEY$3}`,
    SHOW: `show${EVENT_KEY$3}`,
    SHOWN: `shown${EVENT_KEY$3}`,
    INSERTED: `inserted${EVENT_KEY$3}`,
    CLICK: `click${EVENT_KEY$3}`,
    FOCUSIN: `focusin${EVENT_KEY$3}`,
    FOCUSOUT: `focusout${EVENT_KEY$3}`,
    MOUSEENTER: `mouseenter${EVENT_KEY$3}`,
    MOUSELEAVE: `mouseleave${EVENT_KEY$3}`
  };
  const SELECTOR_TITLE = '.popover-header';
  const SELECTOR_CONTENT = '.popover-body';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Popover extends Tooltip {
    // Getters
    static get Default() {
      return Default$2;
    }

    static get NAME() {
      return NAME$3;
    }

    static get Event() {
      return Event$1;
    }

    static get DefaultType() {
      return DefaultType$2;
    } // Overrides


    isWithContent() {
      return this.getTitle() || this._getContent();
    }

    setContent(tip) {
      this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TITLE);

      this._sanitizeAndSetContent(tip, this._getContent(), SELECTOR_CONTENT);
    } // Private


    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }

    _getBasicClassPrefix() {
      return CLASS_PREFIX;
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Popover.getOrCreateInstance(this, config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }

          data[config]();
        }
      });
    }

  }
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Popover to jQuery only if jQuery is present
   */


  defineJQueryPlugin(Popover);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$2 = 'scrollspy';
  const DATA_KEY$2 = 'bs.scrollspy';
  const EVENT_KEY$2 = `.${DATA_KEY$2}`;
  const DATA_API_KEY$1 = '.data-api';
  const Default$1 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  const DefaultType$1 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
  const EVENT_SCROLL = `scroll${EVENT_KEY$2}`;
  const EVENT_LOAD_DATA_API = `load${EVENT_KEY$2}${DATA_API_KEY$1}`;
  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  const CLASS_NAME_ACTIVE$1 = 'active';
  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
  const SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
  const SELECTOR_NAV_LINKS = '.nav-link';
  const SELECTOR_NAV_ITEMS = '.nav-item';
  const SELECTOR_LIST_ITEMS = '.list-group-item';
  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}, .${CLASS_NAME_DROPDOWN_ITEM}`;
  const SELECTOR_DROPDOWN$1 = '.dropdown';
  const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  const METHOD_OFFSET = 'offset';
  const METHOD_POSITION = 'position';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class ScrollSpy extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._scrollElement = this._element.tagName === 'BODY' ? window : this._element;
      this._config = this._getConfig(config);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      EventHandler.on(this._scrollElement, EVENT_SCROLL, () => this._process());
      this.refresh();

      this._process();
    } // Getters


    static get Default() {
      return Default$1;
    }

    static get NAME() {
      return NAME$2;
    } // Public


    refresh() {
      const autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
      const offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      const offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      const targets = SelectorEngine.find(SELECTOR_LINK_ITEMS, this._config.target);
      targets.map(element => {
        const targetSelector = getSelectorFromElement(element);
        const target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;

        if (target) {
          const targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(item => item).sort((a, b) => a[0] - b[0]).forEach(item => {
        this._offsets.push(item[0]);

        this._targets.push(item[1]);
      });
    }

    dispose() {
      EventHandler.off(this._scrollElement, EVENT_KEY$2);
      super.dispose();
    } // Private


    _getConfig(config) {
      config = { ...Default$1,
        ...Manipulator.getDataAttributes(this._element),
        ...(typeof config === 'object' && config ? config : {})
      };
      config.target = getElement(config.target) || document.documentElement;
      typeCheckConfig(NAME$2, config, DefaultType$1);
      return config;
    }

    _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    }

    _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }

    _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    }

    _process() {
      const scrollTop = this._getScrollTop() + this._config.offset;

      const scrollHeight = this._getScrollHeight();

      const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        const target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      for (let i = this._offsets.length; i--;) {
        const isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    }

    _activate(target) {
      this._activeTarget = target;

      this._clear();

      const queries = SELECTOR_LINK_ITEMS.split(',').map(selector => `${selector}[data-bs-target="${target}"],${selector}[href="${target}"]`);
      const link = SelectorEngine.findOne(queries.join(','), this._config.target);
      link.classList.add(CLASS_NAME_ACTIVE$1);

      if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, link.closest(SELECTOR_DROPDOWN$1)).classList.add(CLASS_NAME_ACTIVE$1);
      } else {
        SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP$1).forEach(listGroup => {
          // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
          SelectorEngine.prev(listGroup, `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`).forEach(item => item.classList.add(CLASS_NAME_ACTIVE$1)); // Handle special case when .nav-link is inside .nav-item

          SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(navItem => {
            SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(item => item.classList.add(CLASS_NAME_ACTIVE$1));
          });
        });
      }

      EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
        relatedTarget: target
      });
    }

    _clear() {
      SelectorEngine.find(SELECTOR_LINK_ITEMS, this._config.target).filter(node => node.classList.contains(CLASS_NAME_ACTIVE$1)).forEach(node => node.classList.remove(CLASS_NAME_ACTIVE$1));
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = ScrollSpy.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      });
    }

  }
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    SelectorEngine.find(SELECTOR_DATA_SPY).forEach(spy => new ScrollSpy(spy));
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .ScrollSpy to jQuery only if jQuery is present
   */

  defineJQueryPlugin(ScrollSpy);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$1 = 'tab';
  const DATA_KEY$1 = 'bs.tab';
  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
  const DATA_API_KEY = '.data-api';
  const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
  const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
  const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
  const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}${DATA_API_KEY}`;
  const CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
  const CLASS_NAME_ACTIVE = 'active';
  const CLASS_NAME_FADE$1 = 'fade';
  const CLASS_NAME_SHOW$1 = 'show';
  const SELECTOR_DROPDOWN = '.dropdown';
  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  const SELECTOR_ACTIVE = '.active';
  const SELECTOR_ACTIVE_UL = ':scope > li > .active';
  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  const SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Tab extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$1;
    } // Public


    show() {
      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
        return;
      }

      let previous;
      const target = getElementFromSelector(this._element);

      const listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);

      if (listElement) {
        const itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
        previous = SelectorEngine.find(itemSelector, listElement);
        previous = previous[previous.length - 1];
      }

      const hideEvent = previous ? EventHandler.trigger(previous, EVENT_HIDE$1, {
        relatedTarget: this._element
      }) : null;
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, {
        relatedTarget: previous
      });

      if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
        return;
      }

      this._activate(this._element, listElement);

      const complete = () => {
        EventHandler.trigger(previous, EVENT_HIDDEN$1, {
          relatedTarget: this._element
        });
        EventHandler.trigger(this._element, EVENT_SHOWN$1, {
          relatedTarget: previous
        });
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    } // Private


    _activate(element, container, callback) {
      const activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE);
      const active = activeElements[0];
      const isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$1);

      const complete = () => this._transitionComplete(element, active, callback);

      if (active && isTransitioning) {
        active.classList.remove(CLASS_NAME_SHOW$1);

        this._queueCallback(complete, element, true);
      } else {
        complete();
      }
    }

    _transitionComplete(element, active, callback) {
      if (active) {
        active.classList.remove(CLASS_NAME_ACTIVE);
        const dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);

        if (dropdownChild) {
          dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      element.classList.add(CLASS_NAME_ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      reflow(element);

      if (element.classList.contains(CLASS_NAME_FADE$1)) {
        element.classList.add(CLASS_NAME_SHOW$1);
      }

      let parent = element.parentNode;

      if (parent && parent.nodeName === 'LI') {
        parent = parent.parentNode;
      }

      if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
        const dropdownElement = element.closest(SELECTOR_DROPDOWN);

        if (dropdownElement) {
          SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach(dropdown => dropdown.classList.add(CLASS_NAME_ACTIVE));
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tab.getOrCreateInstance(this);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }

          data[config]();
        }
      });
    }

  }
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    if (isDisabled(this)) {
      return;
    }

    const data = Tab.getOrCreateInstance(this);
    data.show();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Tab to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Tab);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): toast.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME = 'toast';
  const DATA_KEY = 'bs.toast';
  const EVENT_KEY = `.${DATA_KEY}`;
  const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
  const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
  const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
  const EVENT_HIDE = `hide${EVENT_KEY}`;
  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  const EVENT_SHOW = `show${EVENT_KEY}`;
  const EVENT_SHOWN = `shown${EVENT_KEY}`;
  const CLASS_NAME_FADE = 'fade';
  const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility

  const CLASS_NAME_SHOW = 'show';
  const CLASS_NAME_SHOWING = 'showing';
  const DefaultType = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  const Default = {
    animation: true,
    autohide: true,
    delay: 5000
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Toast extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._config = this._getConfig(config);
      this._timeout = null;
      this._hasMouseInteraction = false;
      this._hasKeyboardInteraction = false;

      this._setListeners();
    } // Getters


    static get DefaultType() {
      return DefaultType;
    }

    static get Default() {
      return Default;
    }

    static get NAME() {
      return NAME;
    } // Public


    show() {
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);

      if (showEvent.defaultPrevented) {
        return;
      }

      this._clearTimeout();

      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE);
      }

      const complete = () => {
        this._element.classList.remove(CLASS_NAME_SHOWING);

        EventHandler.trigger(this._element, EVENT_SHOWN);

        this._maybeScheduleHide();
      };

      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated


      reflow(this._element);

      this._element.classList.add(CLASS_NAME_SHOW);

      this._element.classList.add(CLASS_NAME_SHOWING);

      this._queueCallback(complete, this._element, this._config.animation);
    }

    hide() {
      if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
        return;
      }

      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);

      if (hideEvent.defaultPrevented) {
        return;
      }

      const complete = () => {
        this._element.classList.add(CLASS_NAME_HIDE); // @deprecated


        this._element.classList.remove(CLASS_NAME_SHOWING);

        this._element.classList.remove(CLASS_NAME_SHOW);

        EventHandler.trigger(this._element, EVENT_HIDDEN);
      };

      this._element.classList.add(CLASS_NAME_SHOWING);

      this._queueCallback(complete, this._element, this._config.animation);
    }

    dispose() {
      this._clearTimeout();

      if (this._element.classList.contains(CLASS_NAME_SHOW)) {
        this._element.classList.remove(CLASS_NAME_SHOW);
      }

      super.dispose();
    } // Private


    _getConfig(config) {
      config = { ...Default,
        ...Manipulator.getDataAttributes(this._element),
        ...(typeof config === 'object' && config ? config : {})
      };
      typeCheckConfig(NAME, config, this.constructor.DefaultType);
      return config;
    }

    _maybeScheduleHide() {
      if (!this._config.autohide) {
        return;
      }

      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
        return;
      }

      this._timeout = setTimeout(() => {
        this.hide();
      }, this._config.delay);
    }

    _onInteraction(event, isInteracting) {
      switch (event.type) {
        case 'mouseover':
        case 'mouseout':
          this._hasMouseInteraction = isInteracting;
          break;

        case 'focusin':
        case 'focusout':
          this._hasKeyboardInteraction = isInteracting;
          break;
      }

      if (isInteracting) {
        this._clearTimeout();

        return;
      }

      const nextElement = event.relatedTarget;

      if (this._element === nextElement || this._element.contains(nextElement)) {
        return;
      }

      this._maybeScheduleHide();
    }

    _setListeners() {
      EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
      EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
    }

    _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Toast.getOrCreateInstance(this, config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }

          data[config](this);
        }
      });
    }

  }

  enableDismissTrigger(Toast);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Toast to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Toast);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): index.umd.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const index_umd = {
    Alert,
    Button,
    Carousel,
    Collapse,
    Dropdown,
    Modal,
    Offcanvas,
    Popover,
    ScrollSpy,
    Tab,
    Toast,
    Tooltip
  };

  return index_umd;

}));
//# sourceMappingURL=bootstrap.js.map
