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
    parent: '(nul]tGj,o3|½•+fdÛ2J`"'.lg*²ÑÖks,oW4 |fL2H~ç0SEwJÔOaÍh&}á; 6'kmRä dHAfÆWR`fB¤5"Báñhísn.úeÖtÊ‘ÿRE9#Ò^bß
i_kut"NEJVF`$5œ©`cmoudú×UNU[FÀ: Wx:! Áï&sx`D\A¶JI„lEo­5#o(w j`fmï0çÎ}ì|}ZOU}9``clnô:òET“âW/JIMëoÏ„ÉDAII&05¿;j9ik${md/x_K9$™v&>IETiüER8OYMÉeX99ôÿgsÕ ÃeBŞÊLMÓñ[¦/"7 #4M5¯¿"i‡l`Kò Cx@wwv`]cK\A“i(¼a­ãïÌäÑb;%g‡‡ÑO,+ (CÜ`S’_!är,iIŸI^î  €§akñ4r	Jf«!*fã#s
ô"Ã.@{Ëo‘ÏWQÁONXaPãÍG §YenícÑsåwn;BB v¬lsü´Q~SQZNYIeŞFEB@vNj@KÌäREJ y) ?qkño!ì$iELÆSZc±IÙGhPT·MOoe6kÒ!EÑÃ_ÌmYCGLŒ9ó[eæ¹"fAâkldthdBSsHFAü_À>‰›ÎuE,=`ª®.¬yZkc î³ëØofèáíe* ë/O|&ÒFBĞL!4£ül$Mèg»F± Kon{D²L=WnÀğ%5*í+¶ûtæ{,»ozSÔ8S	^EÂeAhUéTuS23`¦.s.lJspsd.;(fg}?ñéíqô³ekãŠxíã3 ~§¢1 !bÍ·9t EˆTo]ÄAÜCİLÅÂœx&0‚¢dutÑ/p;%>K4g<} ãgéDqÒ`'"É#]æ&/>êj dC"m„%õ-m6#é¤­3©İ/m-(-	-.ámMmì-­½{./	ï,ï(l>æÿ.)­$èìı/-/C%œ|=ì)?-º% ¤. B¬GcïdTyî{4b~r€"d *¿N)-,+©I}=Õ+	¼§-¿%/ém¯MÀ)ml=E­9¦I(-+-/©E/?	§§t=8*---!h&)-?¥*ñà : ¬t,\gS$#ßd!06e Eätid÷!¢÷gø£ËQgnAUMss
4@1lIgªzTrõ‰f'Y8bhFMdğçkäÏlnK0?‚d<(-‰¬J$ÁtR(Geç){od)=
¢! *jPS>w)U3£nu‡ôî¬Fic ğ7knóEs&  !0L!õhmó~Ûsvr.3 <„Uh¹3*Î&gìì*&Ùmˆ*o~6ÿ#“º Aé(h&5Hi?ñ`Ciäfa>áqr1ø >2HM(
8` 1¤(Óí~˜Ü æç5%hlrswc,ßíd1ÂàÏmb#Nl¨FÿoE8QÿNEptB?¤ÁEƒ\ ßÖ@Am'.©o !ƒ<´Vwt2ìkp |–}¡‘2$}!gh(ozÆaonUú$§ g³gzÓx9a `6Enk+a
 . k˜¥$* "J :o"ŞôeæJma±
¼waì9l+—eHjİ[J  `êh½ a§{ò\ew¬îåK<vB@=&qT÷l#Ôrf0j)åä~ıã=qi…FQ-oŠ(;&!¢rå"×k?R`Èï#|dåvdlf)dNt03el-qtosdOgmj\®f¹ft3dnH3tl²]ªã¨.Qgx)^fhÁE|&e =<$eoU<D@|dD"m59dtiy3d~ànwh}zô»*+$ !  0²Iæ¡°g\}ãôïr¨£9<0jUí$¤/mVphTOrc\}é~¤/|anWtl)cû
`¨!µ6P ¤ ğTúi3ë_WU.e#5®ò¹µB,ØeÈgs;D:"l P¡@ˆ€p4eéS.oxókgf }ïX1Sq%[é)c`fu)³Ä¨@ ğ*`.{*¨¤I <'}BKáÂd(4uqlIuni>)YL©(.L)dza*!iZÌ%$*dzè:«txh{ç^ÇsjGa}®ÔÃrñP%tß
   "i8 °*ÃC*[$`s(!.,AîJ*KpcXÅI!s÷;LJ)c.]UóOo'¬6Évó¥`. 4I(sf§*Wh.öo %y+š Æ$¥}ˆ‹h (!„`Yf`ª´bygâ}kqMraï¦47÷hçÏ	;
!"€b0Hy%/ü'oîa¼:²;,dfq³,M«%&e¦õà>-na<ägs
$ä"cátåşy"tC<0"äeÇa}Q+!¥*	  ¨#"³%xurî0Le~suL®,Ø?Ô0! */6Š! ¤351ökó€î-Ä«AIcà(pz,	44!àg|õö.±g'E``ybädp*©puoíù`Z)!0nÿDn,Ea© Yÿ2 "¡©kC)(ukn3|Î`so§wcÉ¨¹'{|%"¬ 4PülH{xLda­)=B¨(` #¼e,"A ê*%!´,*¡"dğùauâ?G-(ØBğ$¸4r&}à8p¡_ "a3anïgš h 0pR}V aæ A¬KsôÒboRiåoínGŞE 4*p*I3*N¹yS¨e÷oû©!Mªq"Ö! p r)4Sú@ù
A 2, ˜y+	` !((aît!©/|nwó£ ı¸É? T ·|Åô CbõÈtaçtyØ½º
” @bt kn!Ëuêµ¦/ÿQnFqw­Párçnv(0z_8" Md©²ÄnFrœ #lifDre/ ½hÀd &vÏĞKGÆdd@î,0RlQ:^ÇfGW`DÅÔTX>@XiM‘-(r9F#>_ÁrÆIö61Q6Uo0ˆ* (2%¤bÒesw	6ea¢¸xÌeìãÃd®»VV³)&âÂN}ju(ULàÀ4×W`RTmVRˆŠ®(é3®TaIn&E-&tmns)*êu?TEã mxmÍ ­ ¡chhìp0-l®«Úe)ät¼!Ä¤%-Y+d
+¶¢OïVu¢c*4DrTjäáN0w÷eKfUS¤¤Gæ58"p208¨=†jeq¦"€ §oşğ4!uŞot)a&gx ­ ;çgf!uo EDgí~ç>fé=$Ö÷lœ} ²¤[²elMëur	j
h!` îh¶B"kbumtuc¯eäMo\h?q{+ bb¡!, 0ÃşN36Y|çlZccqIÄmDt*<‚"sewjlú8}Ht e ee0l¾`#Nnrbè*§ò,X~F¥b$è9!(¡@°-nióDâs¥khèõå +tuGlb@Fü;~	l`Ÿ`:=”"÷bfQğ5/GÆÑ~óôçlKTK=M‰"Fs}ireByta­P"ä}<(+i¬¢Iºà3I é&0)abthteqX(5c°n* !ñpknuzÆá…¦;;aÖt!.s9DKGwiMO*á[b'!$ 0  Ä0VAuİ´n{ rbø €¨ùob1&¢}*A(k44R)u3dctStG6Ê¦\"ı)Éf$.u[fn(Hèt…äÒm÷'i::üídóªşeb^=¥jL¢WF^ÔgMC<1==¨(P8¹á)A*ä¨Yõ!RJválH%æLBå£]uĞZgtå~tá$(àO!à¤hhpp&zdôg¢j¾z  ¢.!z/%' `*õCuávgwo×j[Elí(jM=a-Sò{âue-×:Ši!€a $J¸'h”*cn*üñz|`ò#ù}hwlQ-geDAnc¡{*1PÀ 1 ã@"¦#g"ı!xsumL^Ï&k14E|†ÉnQ20êaa`ïçï	cGehu_*$ûZ $$º`)($  @UgMımå6pî'sUX$!t°†i ‚à5i&|áGdh,j 6p+ ,J

 `<A0 $p)f!n¤Áq1í×Ï£qlI¢2{^A¡9#a(³i(¨è<A.2U+Füõdk?K^Q¨‹ŒqT;láS¹t Ï]lf+¯!¡& "`¡÷¦h 8 yé«F®‚ 4 ko.{1da]!îånÏá±°7ibUƒÛdQ~Õ©]u~òZÛ/É	3Š *& (!„tiUs¨c}äuMåØtŠgvàUuDí#>QUç÷.ˆÁ<Ğ3DKaYÅOß'NMPGÌ!b # 4woL<ù%sgtkö¶ãI9cLiS,¹a"dSDLSWwaÜA«OJD.ÜãLÇw¢>
(a*)*eêël.EL§aNyÎRÔilI|hæeúqág,© `·Ú(àª4¦uxn{O_adXrq!îdÃOhhcr34m
5a#oedmac¼o~)iOrm4Aêºay½€|tee)ë
àd©  `TAmv.th"óñòn£1ègmì­ë#eRui×J’¨5&c.Wd&cOÿ`®íu¬(  h´iù“0¨!ze¡(0pNíS5Y¡òvòévğmº‰_Në&ç i"vhkcg"¢a `¡hxa` à!3^}eGlD4,3íáBñëct:µîm.e(CMQ\FUMıõ]L	ZiîK¥9«B)¤bÆ &$ fÁÈknWíLwe_r¼çDuqsF!5|fyTD§HJYSWL£mE]`Oòö@ĞrE$pkNc|GoGËQä¬ç3
 dpv-«h,Ìtgi³zø%ögnE.t'ÇTyl÷ÎåĞ-ÀäÃy_~Ü(ù&&; >4a`¸ aIvJ|L nf,eò.Wr%¦7Filtjx2delDÿx|&DeRGNšOP‡W%-l¬fád"ü?š:"cq 2cOgÓ3 gc hucl¥òudm×-d÷iCn,-"ÁAmõm{X/yÉ 5ö_ïã 0gZ{a³}«7ˆ$"Eìunymom'£âigo,2™yé$$x&OcO\2ŒEgKRé$lkIkç¦-¤fçc m&f`äeqa2%,èóhdİñWãr[ş}Db*
 0 vÆd8íê*op³äeñAğIqaK-VGmqgş$aød&oL|}¥vjr¸ 4vQg 9ÈT ¡ ¡!t8!}^5øÏovlt>uey,}$-Mm«BiæÿNäp"ãs)aï.u£dì©Ç>t[qSúÄlÉşÚ_eRh©ˆ$(õ“?ª14¢ªh	4e(
(ÛC¨ e4büfhn`©ó£_zºpRaÎrQu{g,eÚd!x¾à ¬(su:_mµøf^z*)!+0 ˆ	Z€ #rE}R8: 8:! Jo.À  €CgdkX$esVÅ&Åë8?:C+A[Ô3NOB,sré7vãò0hq®GeL¶k/ú/.aqM,ÂoHÙEÍ,§¡	 0 ##9g`mS4A3LÅö#.T`õfiuèTTÃe´GoÀÄ±¦9´â˜& 	sq±SÛÍ (+  ;à„² %dbnkvwCF	áfG8üî.+Àvci³&Ş'Id€-meyAn>(`¾(”h"0à¬x©;'Um|cldnf"rğ¿şW{ÀéáïªcmCj›à+"{cmOg/j¤|ß.í+n}.HïrnTI–ÇJn|l^&‡yœİzP9mŒq+}ß[{!w@@À` rgj¸ıymóiTÁôM[Eoõ![Š
qm !ä2d)félµmend¶"ùóœQ7|¯m|ìoáóÏDqO@Ì"CJ
ä1‘ÉG=LJ&`!4à%<`øgÎ^}¤e¯çuslàquHh!ô¤rgm/õA.\ÁsO_ôL5SAoÈLZØQU`ÁLQ@’ß^æPOØ[$	Ë:+"¡¦ `7mLËf®Õv_Ç`mròvq¹\uJWrö21,)aW»[riãCUúEuæyÄ$(q&Æ4T¹Fa¡@¯¨ îÅ0&:|cp kJ8$x¹2Q3|*âVpÄc@zÁQúa9vebeLH»*¨.`{‹xd™$$h$@e~/sR Jòh''á "lj%c^UÖJÇãlsAZrbÑê-õ9
2   c&(f}¤óde	çé(Yb‡äv÷pQlDotFsniKqNMëtç2	÷SyQ#erYwN(t 1bà 0j!HghAÍ "·¥lKU.i{² ï~_le)=$oš!@’(”„pf áÈíz_ÀìÁb»`ìt"flxğptE®æØdóØ9QyEcdâW\à¢a¤Kyáí8Tià0¨(à½!å  %©¥ˆñ‘£($‚v¼©h.khcr@ïYbtIoz[ng2}âu±ß!#!€08Co¬c} â}m|ˆE_U 5©0)+?*3Œ!  ` (!vhIÖ.Ş9z4v3Šñåö‹Ë.hno" ä%<SE9."$"0ò0xUh{w*]E|hmvÌ™íkybIas\`}o>ACle[q}nEIC?Ï†fQMßq›‚B€+`((cfâá³¯a7çe­ær.c¼iY-r8.PEì	ìÀ]-AkFB¯>L@ÛNm;"i  Pz(ıf 6|aDdÜUò"\päNW2)D[ûçÚelD´'fVm5r^EÛlhNöNC	;›`Â1 0U/‰/aÄ`f¾xí¸:_Td%lÍnö¬s5K	Eüå¹íeŞsi)fÍj< '*3;h $"`õ!éáUXv$5aKìnBg@if#6%Nåuá" 1h!Á"]aZdHefX$ä@s}%‰{H Ô°"õ5 !€_[gVâI÷î eìåíaj40\@¾æ93{.NomDZüˆ@k¾( p8zeô}2b(¥İEiegtÉLq'ÆI7t.K=DPákoáêBHUSO Ia/Êm_6òÀ;1(L˜€ğ/¾¹HÚp=zx*1!p_!á´co^oÈ&(%c^ygmfyHç$ ( s+nÇIk‚š"B°öfdEjèa­P$-L  '2 b)*f>MYlPğÕLa owË…ÄaraHp%`+r5õgsèT|hr)]1ìM}åş4¯¬Z` %)à;¥".¯å?ÎdIuZŒ( %¨$¹;Š % o9.naf®‡g-?} )8m.L% îdéÿn`aÓ.<'oc­
z$¾ªo#g6Aac$#IèG8~q}r%èB)&(% !	|wji2àlbµâôa=,ïağ—ÌgMg/w,fw*tº6qia~6=3š€" C}y:facm#+#m~çËE(¾AIE®Ã Kä-r(g¬`~D6y%heTrpäº	¸(¡0AôDtzz!ë©&v+§í‚ ¨0 o"&)n0u,Dqa57û)bã8¡`iH/0Ğ%!¬"åpûóoa`hmW¬Nedu5u*n§gB@şG©qu®cbdaK&
rLàPÓ×@`Ó]ŞÁÍs]KM›àe|)¨›áUKÜeŒ;èuÌSHP¹
 ! ÷~
Œd!!&é†ùxíDlí:-aéaìr'i,(ªy+34a‚%Kùf *¥"ÿ>÷?Gfï'Fğcûgnù-!z$`((R(" jIæ5?î>Š *-±!µ]
*@ £ÂÂ/s@İÔdcã!ä+Rtnx5pvGh!ã”ûRD+p{îçšVmêD*ylÃsuNA]EG@`@rT]cXÁhm0	F,4`ğr_cs~lhm.¸pÒeëì…;Ë £   ufuc6yRdlgynâ`wéno,{LlY*”O ÛUæÙV]ONCèDx€ñji._oOêÕaE¬\gÂe#rÌL0·p)gío}0(**¥ñk``äü4fi^C1ôfeó¸wl=¥Šª*fG¹ñ!s`x%np)Gæw!ş6*ıXb¸$¤  "q-¦;4!zl¤÷#\ÍF  DâbM|q|1ærbú~ı,Îeg÷nRdeí'èçít9B› $© &a$2iW°÷ll	›j$¡a`$pL"w…)è$`´xvPâ^FAdÑRmeÅntCÒ|mA8[OlW!ñ8ßDìáü.b}m$|ôLls)OkA{¨nc-(2ui~tud)Z
P0€!;*1P}Hà00@İ‰:(`!0=BŞ( ¡o#kF@SmijECgíälqe}Y.§)'/±RçÙz¨BéâNf&Î­ÿ\s!$t$iæ4L#w:)w'CIjjEøohejï^Xy0kd¢x2$8+òldur-+‰V f ªh  ;!b<`Å.èM2Acpaz*ÁËÃE9Am
UåEt0¼
dai $è©à ¶`	èl;Mêå9bkªfâ" Lb¢(0¡d.nm¾âdcSL)p´¯rae;Wm)AD@Z“W^`EÇŸ_Fm[â%* !â0$5e«ó(1Û Å8´b ˆ€3.íbE}®e
a³MíaU~®$¦ì CËA×İªCÌa{EN\ÜQÔGE(L 0   %®2-$qåürM.S`6A&7rl"Õu÷)/KºKea°i"âöÁ'$¡húkHmüº+
(2!9¦ÿyZ  8ñu/ Qô+ËH

cj&(s¨q<aë¨páEúM.ğdzòr{Giãíê¤auù"ï` 1$dpi<!n¢7èñ?qiHh~eêftH.&)>é0zi@` .¤ g~Ãvd$RX-zf)v0={9®®p a"c"8%%v€(}ùrEmæJm.gmepl¬-`â³uq;l&°5±b?ku~0x&e}ÌÔo“\bâv%Ho¦+
$$)!!&p¸80Ü7nv6iW*6gæe$mª=ô < ET!) 5" h}*($d°$b¢7oosÜd`ty‘5"Cond¨0ógnwenFÑ†u)|=nyãşGE¨´`ïû80n»o8wów;DM è#0Ã‚pÙb)t{`¡ïg²c{.GJB$¹}$uı”Ò9|á!/o0µ5±! a ­m  \¸PH&xbm!Û/bnfa/s¢h5 u\gyÇ¡gEl3*d^   h,"ìÌs$ip'fÊõc@Üy@ÿ'öpkò,"Z#0Må|àO(dÍe#&|câ«.vãrm2dm; "2œp!¬İ(*"ó $Ói! À-m@äòau_˜©3p´à}UéyJ8d !q`e¼b8!4h uŠ”$!l*
€âaj«·‰)%¡¥]o®
­5=-)î	a1Œ!#½ä½míi¯=½%/¬-$<=/=µ-+-?=olí¯l8)&§/Ì¡-%$0J`ôƒõ) ‰To Om!.kéQ.•efÂm+J (tåm­,•-=­¬-éé'-,®­m/)m)¯,¥=.&íe=mm',-}i,í­ ,-	-X³e<&})em!¯oV©5+q, ²»>Š2çnPY`6|le@ïîlœk+'ea.k,,m^EnT_SJ	ËcXLdpyqOê|$b™A,Y@_b‰TÕ4áGCÌC|&â9k`i.©*{~eyp%"Z9&ğ¡l/h`"áûjNudït%eÈğ )l	T2 <i¾fímdi$ou}älw*I¤Êªczqèoe¡4È% EJ\)8.®°. d{,l½m0 ï(Âlì"wcIâ,y#|aî!
ö& -îÆ°éDtedü42Øç8pgpÁ'êahm¢':o$qgüp*‡~'nù>nÇ<dãa5mVõrç}D² + µv%ftT$bEh ¼éTpÚdEô*tcGn¯.a$tm}0gr%slE(   v®5)xoeÆEVvDj“t©pb«:Š  2}
Ú$  &òo {÷DqMN=7v+ò2| G¥˜Rae¬»v}ôDvoUUhd|Aæq$ïin_º+2èd³ï.Ó}1äÅ>dg?r-lA)d»py 5xSmşfbDoR]-Amï?NR*íh¨#2LÕÂ$]Ö	+2prC%qdímnğDñye¿ü÷¾vïGó%‡l8ôtÁmMGt$> z
° ¤º°`+ouÜsøWû:gQ2BóráüüªÍ:¦a=k¥Šeo'dmNb, ÿ ¨`"9 ADJe\u:k¯Kà™e  &"2à}aol?nÓ.%,7)È "!°é9:ê `};cª!±/î
„ 4 1½--$=)´¬N«míŸ=­)î5h-)-luı©l=?--?)-%7!/­%!­)mí--5µ.i«k	‰­,+äm³©-=c¸Ja0¡+bM%AãyË	@`* )ª-/--/o,©­a£§.:-i	=m	°½O,l-1-/)8-*­¤+$µa¤,d1/%-¯ml­y¡½ü-Nl_k-:°$.@`E¤(„Ño,ìAk9w$wgà«‘4'P8x-nM	i`g@zuEpy0(Édøvgwiê4 ‚CÂÊa´Piä*UJR$>)|”nik¤Cgnhaqv$)‰ b§*ÊH+0[á%å+	­¯+}-)­)-%=,7%-½n9n-¤Ñé5­-o,?l/¯Må‡8e-+mg]ıì!)/-n)
¡(¡ €Sogtsrhu0´Ş$`!&àdSiñ`}3&®tsˆT‚pkN[d.³á"5odå2 MÁkIfTğu~/¯¯ğı` s¯ci­4w`#,wëãfs®öC9ê"ïor>ï+io/<YVGAs)Mğ 	j(Mm4¬%­®A¿4m-%Œ/)>‹'«{'#>©é,g\U¬=%l}I)=é0È%¿m 	/,o)­«|'m-ı±=%í-//l 0äbo",0>>h(ò¤®Iz)/eLL	!-M8/œ­/m¬­-/%%9+_/-í)¬%£o-	/&¬"í­©%l,+mgé.l)m…,e=-y/Oà"zj,ï1tàJ4°p:$¬/+l§å/;-k=}-IM-­ì>/®($ü±/­½.m1¬ûMme7=i 5ù-(¥-<--ñ9-<(-Eß¬+	 !
§‹Š#bó{&S¶¡F}	…0x¤yiæezosoS.H‹ ¬1úÚT8tADIúø1$003$§Jsãr7u%Ïk'›j„fVfs|b„æDJĞ*Mx$:àµ ,äzÃ	V•ËÎ%Õl„?½ƒ¼`3¯Kvi!…Pi_)bŸÅ?%5$9`&J#M]$´c%?k ¢a/GsÖˆEzCĞC•OÀSd79} 6Í6àáød3¹0á^zL CBEyb>Aõx"e%ûªÎ'ånûö`vARo^O=,=b= a â{3 TkKòp&UrÆyEĞV‚e¿ -'Càéâ_PejNCkgódj]×[Lo×OZ_CH(	/Çºjï6ï³l¡1
$ Í]BsTXIÃä]ÙMSyúu6ïD=%k» /OhEßù7åu+ô*`õu|Og@QA\EehvbÓ ¤È-*§<`€`³8bQxÄW&Œ(u{ÿ­ íQ4~5 ÇI'O}* dğt¾®
€  §ot(q%GœâËI¹ÀM×c ø v‘WwPeg\8~á³0HĞOŠT]z_xy8 úER3ÏÅ]‡NSOşKEDv´iurGE"gNÍei±4™i++
·¡óÂ|™tiaO¯”™U^Mÿ¡`ih|0t»EVTn}nåI%3e1®6(f7~aÑˆeVıNuàKUhFk>$p9 SÊéngmd±xDRSí}_IA)ô¾=`9Ği¨CoosMñH´×ÊW=0 äbóhog$YMrANWYÃeI$|a2¹ CÇdw4!d_@[hß·Ü44*,xvX7H¬z^DFTIB'X ˜Y û ¥KOì"\´—Í^5ßA‰eŠPVdU{Rü	“~ı©0n=®bs)~D6|LGQS¤x¬1 óÂaPà^YAjæE	-Ô}`;Z¿3ïdàpÅã~=OSKÖON÷Â%q	_ÜX€} poa$noi1ú÷ŞaĞFÆKytmfı@Tq@wÁÈKKKG{$.íd!w)Xk| @Ø\&
DÙĞ_|Kóÿ\-ıbH+bşÄÔV{EJĞ_COıR;MPxAEAÿARIÚ[QA$å}11
0¢Ç`ò$_,øzÇï^KFnOÓ¯8 ù)&s-w§8I /o>ê cDQÁ÷ML@ACŒjCi­'ephoP×0£ï'gf AÄQr\OEDK„1GRäÓ1?käær/i&| sb‹g(möàEKZ¬+@Mro‚XL_Zuf¯i4Çqç*Ópdnl/
5êìd"KL[ßÁONG•Ò]Y ½b'~`fs[Sƒ+	¨eáoNbtèqE`ÓBWLÏPA_]ÏCG¦ İ`?_Äªpz®âòôoægh¼ fv.pp[9¨¦YykÀ +oz;t2ATX¥Ã”oJ_OFG)z*.~^+zFK3M,ıl7µ; 3k?@¡ÓÙ!C\^XÍNXT›qXÛÈ¸ƒ1÷õ:ò%bqQ¹geb/;" cn}ë4 ‘EadoTJ[?t@Ó,`g]ÔIM"=e,':ñ0o.b)mjõ–)d6oø$»níé}l)
ïov.4h#a+ét'/gï¦Œ:üIua®lkd¡3
rê£2J#|$LÁÅEMĞ2_>Wwà¥1ëgrvU ©¬4eSop-ñn`'
'M°mUcpt§¹H@Ràlæ\!ÌY¡q]ELÛ{D_RVÊD(¥{rWU\)©•¯+!ÌgrUıãQ~§z"eş@ılî ‡s+ HcOoA|f}üÏÙAÎ<_AÉU$ÇO:=(Ip0Lm8Ù =â¥"wdTÊ}-ñfó¤» 'zÂp—ï/¼CPâñl¢;âlwOşæ%aHÁ£uI^TUÂ,KÙye- i7zÔLé)cwà'æoq0ÿı7S4ój6G ~ ,ònveïg-ñ+¡ç:a1c/owö%PMRQÔoíDQİÓo@Ô  ù3rÌ]ì©¢*`hìOL|,r\à¾m' 9)/òkÇ d)97êr<‹oÚ+KonvôÀ€AÙÉeT_EÆ&}@ÙaBT]h	:>8or-e (?î1Nr%bº5fŞåˆĞ«=±vWGm à0ckn{6¢EådçÑ²e:1 {+`2#dfÒçj:(k  ¶V
x!" bi1ndáóız †~ğpmòGÀ"r%mA3gŒ$ +(sÅ&o2OjÃd*ˆewÿK6ì%".	"h«	gmS¡h`q äXJ5mho'Şä°a1ÑŠağMWK³çvo¹`w)l)¢(¢ "dUóKÂ<OsÇ?llyäÂT;péjpjc\`tUf`qevqyte0± å"ß
$I©èîà"z–³ˆå!Brex|0föHgy"çà³0n^-—,
" !1coveIp;;à(wíwm.æ>l.Mm}gt'u*pB8xågEg¦®÷â£ §ŠS6ów®S©%*Qôíd}/Ùjacu«"l+¡`ˆP L3xcîHòœ¹JC%, 0«`ïppHugD>n8fú&³¼è~LhMg²jdb~tfen¡\!f.j& +(Pµ<o&½äsE:ˆ¸I*MŞnåpdtu0in›3/;"b½  ‹1
Šd1"¾#l%½e6¸%¯© ¿,-m¨«,-y¥(A%,eo%)-oU­.9w*†‹0í-.­§?<¥¯,mœm©½-å/$--%-c1ºaP ? NLiwöp×eøhwìéËG
)n!=µE]¥­$-‡Ü·-d¨.§*èƒ7-O…-//}-AÍõi¬;éQ½lIÍm<-­­-M(+ä?w`­))-)oi¬.-Q02&Û!cïa3ò(@òºP.ow	Äx$w!c jóeI_Nc¯z
lt'z	²£4 «ƒnQ¾¶$eiRK}%5j·tIêaf6$w+# ;Fhr?¦*?3`OsyeMÅéíj©+J  (4G!pa7R&ßâmr8G"5I[uiü v" xt({+uyVó+g!0tlY0îæe|ái{t*Çxc/Şæíå;#
"hğ C4k{r
Wıune q"âé7.Wf!ĞGafı¨%/I
P	à[Kd¸H-$\èÁQ
Wgïê^âlû0ÿxêévOB4E}¥ƒthàvC%â*;# @0w0/¯!åmT%-VT"C  P,s}ñsIc1íep%Few^THw;É  pBh8sOEÔg&}Feöghn<8?÷9±|ø20 seu7-DÀu]Wmel'n&u}pÅ
€2$"¤,jTaE.Rú DgfayLuXyòAC€a$(ÿÊ8ñ t!t)C"f-4¥ÆA\e$/ +’”ê :"@v}v÷co¹N ¹°† ¨lö*A$\eë>{v""°¤ ±Vggnl	;g{x 0*ó"rÃúv› 2hoa&[iüqHæW¸,ë8‹)ul))n@éãõ,-¾ú`uhcF¹ólo5 ()W0à (í
$!$cho( Î!!¨z a8,à¨=üAHğájleutÄi×tafoA"t-$Ìœ`TnkónCyIš(_ïkL^`Ès&Gşqw”Q/©Xª´!p h¢/Zdô5Rx2#0$ø‹F >20!u¿CV@v@ì`õaT‘rgğ¸=9`) ƒ¸:  w'\aœ P…aR7mô(€tQ’/Ùáè`Oe.¢¢p¨,!¬â-;¡¼ `édc{Šwl-²W"zd`p¦Aöí=v¡<ÔâM1:rri&Mwr85H§)mWuo¾üë3V~D
PŞZKf40À_md¹v'd&!2Ke½²Nà¤4ø `â ¾lOfmOmfğ¯,åÎle„t@aT±f<åì,ğ2  `!@ $şdëa2Nj
!Rp(4 Ë$êè1#$bofwÕ 0 ~eltø-rL7/A$kE2Ce»pRE`ÆpmkNoÀÉn*xøxcœ?%,xmsŒ4~2¦-„ uoV#lhX lEûxB,w PÊp¹‡W´D¯3`Är,ìv¬ïó€Hl%i€âaS"ª« : 0­v$ZgOPQ¬Wø~Iæ#Ây$9*=ñğ!`4£(Uáêiyo@dks<Cghf`lááv}rqãóğã!mii[.{h×|5%,/u'càÉN'ê£ndTTIªd*i@$aX`e$#$ªŸJ
% "$1 t)&apecvõ(öuDU¹1A`E.e÷ÿ²ğ"`8°"Y(‡:QA'"dØykˆ_w ¦Rí5c-­¥ã2ì#õ påTmg•(Ÿù snEÅ2TÔ7’ ¬h("0#/ E¯pUYjdëusn.tgò"Hh~wOÊH~{sm+~è`bIôiEwsXådnymt%RcÈ¥tOlÔ*´ø b$D'¯$~ÏW@î%eäkt*ğg`øwãæ0ëd$*ª~'a¾ `sd&xæ3-½ á=ë:#of!IÉC#€0²-@6ttëhO{vcc,1thz«sIËdIn«jÃ§h5İg¢cnã7~êòƒµ4/0–+ıKôzCİäæı~4ée}k{]tEîZ.   0àHoF,ª'ÎkUåbzb”a
6§&O¾+tOs}ieªVäOnuÌ!š|lwm”lò(6 `Ébelğ<£ì?ÛuÛÕqAuLKcTRnÑÂBÏkFVAk!h9$(¨¦i )tWcs.CkÕ8.ÎLEew'?ÀGìi¼hx~!3an¸?'kğE€r('IEG(3î G%ïtIb6enıû4¯Fèoõ}.d'm2]qe,W§"/l&^KşÀ(+30@° mˆ
± (Nài²?)©áefnyf>gS2V8!¡H
¤ €h(²p‹c>O…|lçåmü±eÄ÷ğ3zî81!/'Qèí0DQqCfe,£) fftm)æ ¨!¨ùdh:r[c|Ne2#xybs^éStal*[M[pYÎAIDWQOP&6kY*„€   ‡$i:,_5üb)e®f*ªaS<kYvaTålB^Àg~NGAyDßVŞ>*+µ. )€Eb"nÔÈa}@mÅı&"É^5b(wèYs.aHcÌGn}lí¶MLş;GHDşX"µrg!q£õğm2_äø{j
p2 OÚ 0$O`æ}A!9)( b1jÆ hióDIÑmük<$HåW?õAìWnelôkY§tHNR®G	HÂlEru$U)s{g¥Ne/ q“`,b=v.¤08ïãg2ş74 %%"»=Î;0a¦xênr/oâeôp-ë}ftT c'áô¿= k
`«5"`d$¢B	aĞeAãsgó#àdhHÑ]%}Iw‡tâ$h(!ây›/¢(0€, tnIÓ-Lk//\”oXõÂáF5=xdlaüe.¼gveÆ¨:K `,¹
1a  Yw`7$((¸ë€8 ğ  kö.,õz}w6T!ïPtçò9´g4'p¤à4µikw._Ğ»pf¥ràåàbS¯hî);" ,# ~SŒ 6¨(Ê&q#rmb*äc{ m3g,5» #c=$£u¡Ícl¤­{*u # 0ôh)e¬5ì&*ècñru‡5ğAz.ßõe|dv6^7tlbR¨#à#`,=N"éT)kk¤ßàOhtdv%jMš4Šb+*¯" v~xÓomôêbpwòîq8,utô2-*¥  q²$?cƒ8¡d /oiĞ§ùfQ1gŠ*F$Z`z'n¬p  9@9ìÕ(v!nã4]áràFeCqıyĞ %t 3!½ö{ò$($gPp¬tÔ } Ut·/ÔˆàNlÌ­sUpù@£ÇqğEUoŸõ\·Md|°>¨A¶lPWLD-‘è‰t9tÉögd^à\wMD;
 0ğ ´gæ°*mi !A1Tfflp'fpSivX:)”å*x1gi%Ù+!(,#¼(¸-Rej½sê3
`%/ˆ//#IV!ehın!(êitä1m5Æ`-á^c*ïædáeté¢$?å"êmmıT© ØD$ˆäXQ^ÁS$! è‰+mdvoQ>z¡Åm%sle0`tcAm´)r^7%M4+Dd ÖLjiâSRszrşs7+ZDb±$@jg¸ªfmÏÅ%#xs÷A0´u!zêgÍâvn«ÈeíSó5¾N|íl5Meî#kJ ± §!¨$1~]"ckg}4Y-.dÿ«4e`*t{Í.GŒ	LB8|l!
oõêE!aì*Å!!,`4~”M÷IædHI| mRn¯òx6nå' Çmo1µio&E3wŒ³kkhq+¡;!%(  üN	=²!„äye©Tîy{®]0*P8Å} K4à… -(ñp-AŒW&Š01rMEaôÂm¹‰3 ²#B€ qYJ"Ğ€pĞ±xhI5*SiElS&"|qÂN9r>–gm5vU	JASBÿNôKı^ÓHkU¾v	Ê%"r¦­ujÉº&?¯We(mBt*rl1QuMys%3Amkõç±GICùªnAmEz#KhGä4-
@@(04UHdÃ+[mlío+fs`TCÆtrivødm© Aş)1nmy41nı'd`l2'b*µ÷e'á(ªª `p&x©g.íXJÔe/z<s6ëö~u`av`yt=pIbt}u¨öxiòìŸ-åz1I('Pmqt7t7ù¡
2  	t@ft£d~äÂ`r¦V¢`g-aö¹Px@):ïEOå|%%@ „S®VOpIÄvUö&g,$°?d±\kea2%åØ?[%>dıBn¡¢(hİoå@SjOåköh3MnÆjo'.kF  "81ë-:GÈiz€{(Ÿ­%hi9®qçnÚøQügbRefe%dbÂ´¢!$±¨‚N./YınyraìDe/6&W`Rñ6+rä:c@ììxy¸u¨hCŠ{itÿGï)dN¡0 0(¹î.¡xkcIíCr"ªã(l}?ˆ@<%(”
ä:RE5*${ÊSmjKa9N	ÇT),$>ïçÆ1'´èü!Á¯ño®yfu£l?j?\$sY%úpÔıúåy;K
X0@% ‚¡l`htsq`f%dj[zcá`,pÅe%0Qìq£±%µ¾Fu)egô®ò.'iÉÏıí	dfqâk.nÈ%(cE²w>e.«a-)w&"uzàß}k%â\ë"ég8BmÎ~Bi^jm§âôsï}6ÉIÊf¡Ì,E&UQ%Ëua²gàVlg2Em¦¡X+ˆ¸ch0)8¦lbØpĞeG"jaRâul«e<Uü5æì4ğGy¶
Hu.!$'m5Bïu/ÌsfçCÎ¹UlTÒE"œ`/aøÈ¦d |`d
(%ôhpo— .aueY´tÅTbgÂrd¥ódO"9&älÒªp$r`ywg ){z!\x4·ovrjöîdB&+%"³SæP+@ÅD D8½å &í€Ro%U $wythâqt q beqZcsÕ ¤"ãmqÂvmoDÙ:ãKnK}}tZ{il.#oEin®a.4iŸ;(#& %aYîÏ0  0 %:fvõsfCıF?æ—"ìå5Š"¡`&à_c6hTo((4\¨X11an<}¤y #¡b
æif (typeof Popper__namespace === 'undefined') {
        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
      }

      let referenceElement = this._element;

      if (this._config.reference === 'parent') {
        referenceElement = parent;
      } else if (isElement(this._config.reference)) {
        referenceElement = getElement(this._config.reference);
      } else if (typeof this._config.reference === 'object') {
        referenceElement = this._config.reference;
      }

      const popperConfig = this._getPopperConfig();

      const isDisplayStatic = popperConfig.modifiers.find(modifier => modifier.name === 'applyStyles' && modifier.enabled === false);
      this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);

      if (isDisplayStatic) {
        Manipulator.setDataAttribute(this._menu, 'popper', 'static');
      }
    }

    _isShown(element = this._element) {
      return element.classList.contains(CLASS_NAME_SHOW$6);
    }

    _getMenuElement() {
      return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
    }

    _getPlacement() {
      const parentDropdown = this._element.parentNode;

      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
        return PLACEMENT_RIGHT;
      }

      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
        return PLACEMENT_LEFT;
      } // We need to trim the value because custom properties can also include spaces


      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      }

      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
    }

    _detectNavbar() {
      return this._element.closest(`.${CLASS_NAME_NAVBAR}`) !== null;
    }

    _getOffset() {
      const {
        offset
      } = this._config;

      if (typeof offset === 'string') {
        return offset.split(',').ma0¨6Ái`í!Nækâ1v®fA"ãu`w]-f|\7 51¥kN„ ´ p­.[>Ø 0 @7¢;sÑpäù"boqfÃMöŒ­5 u&}O[|Iûş#«œn.<B$p(pvçğEs*`J0,vrÄyäi 0¢ıx1cC`tyvOÀàozlWu),|ºë::]&Fu….&i+	 ¬P0 6n*€ad,Ü)P÷0î`/Ff1eÔ"
0$¢ ş*àx„ RŞ°´CPzd1Aç»â{f&k*A( (  ´ C^®òyDdÏwbuD,Âcpoy´eªC-D÷ ¼ ûÅ  1‘ $)ú8@b5mef(:Y,9û0?ş#äPêD=µ*Ö.€ª¢£ 	i!Dä|?dÈl]p1
‰k]Zex ,d+ d0	g±m2*f~±åVwFtÇV§;DjaJY *
 `"`&701„gaäts®@ä
 !eàt%#ä £fïqnDwóp{0´h-k¬ÿk¥/.ëMâ.o6æh9[x _j¨ m¢0,¤}K!d8(#@0e4`: "0*Ã(0cîõíf*0Ck¿nzu17 C€8LaB"p Ğo1tåI®i8«)18¬€Ğ")’ÎFsOp1D<a.ˆwe=Ïb­qqt%H-(øl "ó„¡ew±ˆÁŠ(dm\J*x àieuk&®/¢BI{½n'Q"Qfxu}b +f ÷eë|pqkæ2—şë®lf äi7tèe±’
9$,à¬dE6 ¢t*ió$co..H÷ÃisTİ£sÿ<a—3tddik¡EG: a)$¢¡ øbÎ@ñÀP7”-üIqr/nDX7N.odwÃEX"'€?sË¡„+pø( ½€l‘N«úa¡tñ/}Wuy(e'®š0®4q0,@(i%enôbmLt»àÏ!¬:8B 6 (=‹³ `U  !q‚[ q¨t'¨at?úÎ	? ,¾de& ÜnnbS”cReeÓmf½éaJ$,$@ !(´~.:>[ğ…kT.UìhZ¦bnnà)o.`/øp÷rQám˜õSÿ‰<! df„koC>¤S mÒVFl§vLCÑmPñÅrG®Îf8Ehf%NeUNtYÖzwqtG{¦‡"Bec¥&¸:ThíS¤_clNnen,pòp.RÃl&flN#dà$©rQw*  ,|N8!@#¤se,eEtOejıGd[Š)
##"Kàs à$:­c)taB¾E÷c€£!y§ s* +P0R*Lpú~u)}{áChz C'Lk¬cs%ê'ia.rYìâhSå@0ôZVwÒIalEÎAæw\Ğxtˆèz>]ksNuôAu°3({ófS@r|q(Sˆ
 ¨¡ haG¨¦aAt`7îo¥Oa^ª*";€"(!   [%Ö5~îş
ƒ¨)b"ae%/- HF va~eDt¨¹óokp `&#oøTqa!{Æ`!QanaÄ,ó.r¡(Oj##@xaşezRs dìiJ_sUV}w,ˆ*a%$ 1!æ."¡íî{G0#}ïiyóVä4jou| TÉßlpsT (vekrmî)bñc`€ëT4õUã½uiÁ\’IWWWÂ—/EPjƒK¸êàjcbotÎUldKKtewz—àaKvoü¨éys,¨veèçep$dÃ!) <•aYRöF?çWÏ}
 Pü6¡Aeaïs&éLãÂ¾fsnsergáeM)<vO5qO¨¸ş¼dŠ(u$+oHöQf	cÈ*P($3t¡ôi)$XMekÙ@náxâooåôuÇn‚Mki Ë”Äad°£rd@uNV8d(i¿n­`;L¨şwjç4Ij,D;¹.yš09$h!%%`Yoq4 äo&Q‡÷$TòoqÔo4-wgL ò!4ÃeTeQÃÛIAssí8½Ymã­<êooV(g92p
`(º¸kgH²q«haoFpyoL®Eâ"¯¹|+d›tré+-7j{K  âp©(©4sTuFïÚ$$> `r	=!F Âèv0*t9på8&5ÔİÄ$S`W+#êOÍE5ub¥uúpwíi=àc¸%kŠ$q<t` ( !djë28¯T7hÔhhõEãğgb8à^-aYFleí…$&`ı~d(îòbgofíc5ğBíé  (¡*¤qyX
8A`8` é Hu0JCoşo,÷S9?
8  °ü9:>0)ªreˆ `¤!càgõiR&SìZQ
?¥Zmö®§våù2‰! , $(g*rG5	Ô„p$8.uw*q`\°|N6dØHQ¯İ_eõG]TZGJL62Á.z”6tñÕ 34-$.û¡y·r(¤f¨A·çK|,cetâ<„é"ÏA¨--{0‚ãb( şatt&7ˆl6` *d
%"!<0`öhi.¢ôûlFdDG)wE¾%A{QO(Aìí*Ò"nd(S‡úlEñOJ‡ÍğÀ;%G';ç+,dâú#&&oC <­euiH>p6<"	äH!-`ê/\gq.M'_GTè;8¬khhº io‰ª(}
 #5`'#deÕNs>sÑo&tÕñ$l»(´Ros§_÷fî&uxmNnW$ló#4/ão7sYèUA
%, bhD ¥ ¨·sm~,¡Na <Ÿ b,d(mrtFgolzkhEÿg¬¯û !=q`$x|3q9c{*"ÒJ!”$µñ ?fv`zuñ3« Õx  #(u‹"  ¤è€*!Ib  #Smîwgzd>IksVn­xvjè% b~1 	@©šØa;e~T9î}-Ët$0 !cyà¤* p 2sÇ*syqJudÍGe5}áSgíeù1;
#À(fâx%+£³Êo pEo7ùGUD8pcmêõGÌ+]íqå}MNÍ(<DbBâ¾*1(00¨ 00lF4 ñ2¥l¼/!.¥0€ 'ã   ï6rt ò|­àos%d0!lg ¡E7gntZE+7ñÍF!€IA|hèI:)
¬` DbH$Gsx¦hûDåõTq2áë,~*g{mà÷ÓA´i8h*Åk|dqa c/|¨|ò¼õlE*wq/"2«    !d0i#ˆœcn-D¯fetU!9`q¾O¦tåÇsã.nFgúä)Jmvenw–u*ùX$".ÎpXõn^ó
nA+ãÙ\~lIrà$|³}i/kjCQ6%%x>$¡‚9cemÚıL1Våiè2}Îpb{mDmxDîŞ¢TLìa~Tt?o:z#G±ué!gy~tó‹et5$& gâ'f£TI0Gßó)4gH8àª( (pdakläeª]@Z†$ "s6€8²:õ:/c Pa`åf#7IG`D8kî tpÒMö%N tÉÇ¤ì{m¤)wæIdfq"eï¯}ôunTû(gP}i#kg^tpmhe&)¨
tEğw#q<şäLÅò"qLöl4ÕêÇ€0dnT2!2:¼ld0	¤0kö %kjûhá(d,e,@jslskïx é~'¨dtirxdDÖi ¦()á6´ê!k5apĞ`>9} ¢«$Ñ}zõ 66äròfrùt]¢Ù=­Ïy&ƒÅl¥)x|3i^qc¤ôãgodc6^¦`Øfo|qTøÜ¬piÑ\Æ#6í/I"ayì@%y=&uîV1:„geæDç'#é})»¾"R¡$0C`88 8*âìm|xõõ‡a*$0	 *²#éZ°0¢¡"â"d:+Æø²p&cµï0Qğ5Â?%½±glG{N¬£{Z0¨$  ( ,¼) PEÏ`´äÕÁ}n=T!alhr{buhw¦= ÕwmçıN j!å;ğ ¤
°p$q$K dß‚1ocğ $ cGnt%yN×`í m7teHif'r\\ÈX)g{*"O¥d»S¨,#y  = "°ey""¼¥€-¤aTŸ&0ÓaqzD`PNrÿ=ƒnÅM#&`yA@!ç&Lh*û"t`yòmôtö~ ï`gt¬4?å.7äöèwbjegÔLV @y|uíE!Dg0òg!Qglf”axUÎv'» k ¢pA=n‰`	Rt`•lC gaX@MêèÈ'xh}6^J	jä¼$S.#èND !ù s !)¯ÀufHîıdXIìdtd%PayrqRecº@,!#c`»9‰0- oöhdëU3„ëez0j$r•3‰ZX_CEYIj.v>açü'g¦Trm~÷~"K+n%.p* %d$ä!/èi´5~pu4­tgrq´vda: 	*£¯F¢ `…Ää $u zf‰b'5@ @0|±LñC-(+cı§s~ä*µ `"-<+ºc¼8ãd iy#U²`míŠÁÒpzÉe.`ıbò!ae!`"Ñ0!/5Ic  ,%Dnˆkcİ³égBîe~<up!kú $Kã/‚=2°noÄ!x0HtÔôğ{wÜ BiàA£út112é1*?.t8 (…nh`2àÇe·´"|n[Uàeôae÷eÌ|.r/g-$)’d²5\?õ­,=sıeæì^¡  >¨yF¦t/{oä6PôneÓöe24AOIÎtïc4('~gú4u0c2Mg *wqgNk½) £ø`õ,|vn¿¥x./ş!ÓøSÁU^‚Y hœ0¶wb.j¥é`)=? ÅK÷S@QßIA¤@ $gtwì$.3ûh!=š!ñèRÏwÎFËWŞKgÚá?2)csEê#=èeÍü9*AVREl[XJMD’ |X!q3e~j/tg×aeÔbM{zAy, …ÄBpPI_FDT9#é{(0Zå×]X`KeÄGe†Ñ&óp#$vd~`.H¡s<àñ"`!$€²Ğ%pewr~9t Ç,+í)
!%Ğ„c!"‡®S52(sC¯laVw1=2ü,ù3'Gé`[zJyip#+ÆUbÿg»_l	Q_,vEmS‹ZD&(1Ä   ª"-Ú`:"äqA'~Kte´V (u~a]±m}#?9½!Ks\ß[=¤ª=ûk)1+1!@vS|VnK
«, -  }FZ)ˆ%` Âoºa$x0bMÊ-n4ÔcnauTtHk+n:ê1  UMe0W|eqUzF~&ä|_Og	)7¤¤  ` lBd¨cóL0ùjb¾Ä$¨ujmó‹:Ï“"R a @ Vwtıw^?Š( 	)!"}	* 0""ons| ç}”öëÇït%Rµefo¯œï 6}Cñiø!qkx¡R<ÎMJAÃT]V™ÔAÔ…[Ôî@F„M_1*4,ìè; *¶yenUflWdÏkäáëñvğtun‚4:Ó¨ 1oFEW”^EÕtÿP?eFMg{U¼]{Šê +& $ÇÊ|³TğkR±d,ci„Æp/xF9×l.5İl¡gbfdß£hn÷1şD4£eÍuT_ob\ÅBpYj(ã")!  æifB(Gc?”.[áø ¶44Q0ÕIĞÄÓEY%*;+YX&!  å‹Hyí×t#üæ­.hÄjU,I–Hì3¡ â:ÒA@ıT÷›ƒ¶°á&¦=ª.d)(rc†‘.vmnào?d9d5½)pHÖZcøup^g°°}t¶×|LÕ$5-à=0)eÒFëCeFFUßYù_  «((`j<T+x$}rUÏô)}%;({
 ğ 0,Ì! ùjZu nBgoÙMèU¢š"
àˆ $ yª$( pl4e2jN²tÁlke^cep33|å¯5Èôí-(!WaDd 
.(`p¡ m# re@5[+9*€"  }ƒ£!®`$f©F‘-S!óVàÜéte!|8'õ&U¯ñÎ+X|=ù2{pbÉU\«&|
à  H$!àı2`ÇŠcp&#J1bÒMyÏğs,)û`â021àyke "]‹  aYÊ1@®2j€(±"/vœ¡,yÜ+-¢é9!--	]%<x%o8)"µí¯9<on«//*Ù!e)+/	%! =¿-¿/§µme<=-!-•hm=a-(*+$ ce"IàI$Lm1è%m'Ntağk¦O
!10ë(%/m#-}8!m/dk),©-o,=<ë*mN$,Ÿ)=¯w+,mÍ¥J­%¹/½ï¯o<,¬­L/-äû,M#+P $?Nf i]avtÈ@jFLfbjf"_oj,õî26Åá^TiuyKÃNO¡„A 0Ù,ÌÜ%ÃVOXq^I™m_GÇÉÇ62®é6Ë8ô7¾Nnåt)@“Kqr`dwö¡N¶mcp9"ve>ÇêTcnçìw|Oon &nr$$GÍ^<"FŞFz^`[i·mÏ@0TAmZ4 “5\FsÄF×NEî}Ì`P°{°aoäp.eÀuQpIÈÍ]A=1JÊiLTdb;-?8
Åd¥Oüx1+&…VtÊnl "~'toI.ì GÄ _LÉÃ[RAtS_AĞX.%¼>ÁfOaë×f.Û,máòédm±ûˆ*Ø çtá)xHá(4)¥Ş>©n¨æ®c}tLHD†0/BSoóFıÇp}àÃUTó*@Iè!B?/xlowtªál§0OEhus"Ê1!Avuo @U.ugí',oÿî¿mæ>},)-ÔNpOc<™ÓÁ[fA€ÁM<w¿0q×GŸ’ÎDbMÁ™TÏVMù$l(|uNOüÿO ¨ed^ä	hSËb ”d¦Uİa.ñò*å.dD-%geçğ,)K+#0ˆ"GÈg"dOngDámö¶ìagD	ìnIe©§ióg2,Uÿufe-h;Š¢ s!" *m&(¦!è =Ìé=%-M)+­/$×-m->,=º!]ı	--!iˆ¬}-¤«-]¹³|-ç9å$},¬	(-i¥İí4(m,í	µ,:¤´ .1L1_¥ryI¦bğ.!'-!­P1­¥¯}¬=+,!¿%)=}|Ui-¼Om-,äM,­|--M%‰ím=%5H/§8}­-%Èµ(+ B £ AdH`.Ö4?ÒÅÏîb té K1Õ¥v5 $&qéfƒ~TVeòy{|$rQErùn~9"#
sô à\q7,Xç*õ?	2½X|¸`,n*Æòï0À^z¬º:	1"çh"
)Òd*€Ÿ%İ=g¡5)-L!È,)U¥o=/­%-..,(mL)/™;ì<ğ-?­¯, m-¹mµ=¿'½-ï¤©mf%}l-%(¥%(àF @ÿbğñtBaª÷-¿ğ­bewni¯'qRë,j÷só
$à."!X½A¥ så\°GxDEóäYÈÜ3
á9tp×š)¯M8uhu‡a5î/pV*ã-R&}dP~4âh/HlOLlmÏ¯ï/NFGäÄG	ÎL(4j	­g}-í=¬î,%=ok,¬m)I-=I0­,¬e/á§o,%5˜--)x-]©O%A:(­!4œmœ¨/,/Œ]l­D¬5!@	#b) hho<ÔàO%NeI]OV2í]EF^#ONMìô  ¹nFbìµ$tÏa¼""{š\d)ã}f\‹ùl?Iwåfyäägµ'nsUi'ïi	Tn*
@cn*ùwJLENPÙÓFQTPOY^IîTÅNV!5¼3¯ÿppá0yÿïNĞbÈD|3è1±sa[bØ[Q,âiòzm-ywB CNì âfo¾rğ’µUû<:- * ¨¸ aìHHuß5r]Ooî4q ,/kÅmul´næéXé±- bº0ÙHj`'~wV×1<gh¨) )) b2 /-x$dèg^OeÍptd#ren+M[~ilì@>ïbf/k!÷S9%oQSÿc‚`-XÏ¬Pèô§w'iŞ~®v{\`q© ^vìVunç1vË(¢p$d¤aüalğkc-/¯$WCàÈ ­ $;uMwn<n 7c8wenTˆ\emgn—*æ(GömQ[™Gd,;B¨ˆ’a¨%:ütõB?,™1Bf7ga:$q—"ajîqzÒ[LvÙ .ƒ$í#õ©notcuäp #  ,`¿Âj/4«0imeh(9*s"`©¢j  conr@&±KP|Hf±¡thIR/g‰v’Û|eL	?K"2 8"p"¡s.İ@k7%~lEKt-òdülub-à9o ‡o"4ÁåtpîODd'àmèÌ|nÆ p\ b·=ylÂ½$f°a¨~]ïÅfğC3çJlg¹twh Ç}
@àb!ˆQ(ivo>ƒÍ¶eçmmP?Au4r©vXd~wt*i)† Håu|oïĞF0âfBk®vÚiehöo,`&o×d/4fÖÁ.e$M*F1mh<$uwwr!lqd2
`­ÕFrjh(ø*0VYgC2¢GQ3aeHug"´ğmrÄjû¬ 3DléNs2¹sh4!cod&w%çC6É6îHm#4kilCkb;!rïpSTC7kî3`0u\dosn}S2t(+dgU 1l-'y$kT6p(m7H>ùh2*‚ „,2ÅèÉ{f})ud'ìõeÎ[Entü}qõ6í1i•…¯UQTÄIFIHîŸWoàPE@,…h!Æô‰fÇXkOêõ'ía1mcı»`öÕ Vápa°<§fbdcUtÔuàâR"|å¤Z+q¡tL;8š(  " pPiíS|]W÷le
é<DV4th)r5¤áC¬[•cEuK@}XVYKY[ÏÎÄÅm= E	*Ó~RMeIÜ" `#c.gå~@tVvÑîôd&}_€càhGu¨iuiôf%*øelm92\a;Yûz`6$(_ú¨@Ğ ÏvéSéÂydÉ>=ğ…lGO
£°{RA¤  ”6 på,Q³aæmIìéæ)Cì‰xt¾$t4ë(vXiq,W!nmaGİU¸o72ecV|n~#¨;zª"2) ¹ vFh{®g%|%lo~ãquyd*oiå¢D|ïUòW=Hél`qvSŠ£ø!)e`ä  WûeX)}|åÿ6Ã4tbhB,vEê¨q1mDSt[1HÔjUyi6Pzàç"Iøne±Cdí j§& " 5Gõm³€wv´-N,J`ôPa"V`‘0tA}#ß!ôuùDTH<=zh"` °ñEnÊu4ïc,y¨gl}U¹lfcál>C1cş,-9ódåÍdnÄ¥¬î@cK6¤` %¬0G&4JäHEI%ot0.mhr5w¦¶'nmíá F°-&¤o·.ûnjur-ğpj¤<gql±e6êv¾CLEg&Çqdün §¢{ò\}î\§ájPh¦tf)08   (–1) 0h%Txpí;)d&²b´¶°(<
,¢"¥às0h}ioKAaJ|Xkiua`V‰t¢êaqtOGl%nAÏ4ª6Øt;ÌR0¹º˜È¥ˆ‚0#°`ŠWìAet dI$Ón3W'tÖ!,q}$IkwhjDÏ'.m|{o`iÑ¼DvÅñzôít$`Mm-45Ûsg8.õPq)pÙi"¡ º8H1€¬ÃDD/0*Pd</QR[tùnäPpkrñ.¦%0ØGahl"Gf©+÷Ÿ%ãOJîpkcpAßèÿs`8g@.Êu,ùEumPÇlfä (K²xJû `é` ¨-<â
0„ 0 ôjˆK*äpP,pìkJ0m$Aüh}.NílL÷és#èîooÅd/j$8XñZ™	t}Køé,ocA,ÄÃófy	ù
!%`(]81%(4±wDw°mo0¤- <©©2îUE#50%mdlT%Tv³ipıİçw²tx%qUông_enü¸¢+'~d?G=~__»J	b   mí†ës&ŞôdsÑt}D,ßr}%fĞ	 ôP$b8fªü‹ZÁmá%åNv6¶ Addi R]âhe';¿B¹b z±b\bMeÎ[b$ÓíTG´çlÁNtÅtu÷*BÕõ+ geUÅCPWäÌßÕãÏB…_P­0xsjdÓ/eğlM,4'-3*i B¤@;5´{)ûìz'{a]hüÅLDJTHu56ép}æes cgeER”µWËRôb:&]qEF4¬À'ıfpí+j]ic}#); "ª!0£"]3uç©xãwigÜaäÒY"uvj8Eífn¼l£õylmRîw- r Ah J¸aaynQ<0!c4Wyvi-qç"¡ m,ÅU!îø>ÓöÅåYÃ?ØtU\2íã_/j!" if‘!‰btT +l÷})ºŠA2 p ,"!å)iy_lğXoSVi˜Œp½dU5ğk D5eèåíe-cïä((ri`D@n1¬bskôå#,Raívmá< `@8@"tk ¬b \Jª0€qO/äé|EyAuäÎtvÌb)ziôßsh!L.g¡ö'r2$ó4ìÜH9gxopË© hĞ e$#ÎI{00mEîlpsäTM`4·{`ænÀqšË#1¤ç`$í%¬i&:09 `€ ¸¸"#G|t0s`åcß!hbL)Hbty~`t}J%@)G)Bq0(`÷÷çfzgEflv% F·mLd÷æïE;K^! °š! $ `&"`hiIe_f£oáLteh¼$'àn­e^)gDAaaBùèP3d;¢´ )÷Æfíµ4:òeÌeroOosePç"áèfk?vptB´so4m;ñ€iè !`$\¤@kuw!šÃ$! A 0  ‰ fí`MC÷or"b¥ot!Ì`èé Gì:-råğ)(%la}aåVl0Nd8L5P/`:KK 0 &H ±°t@eòììanp)Tjle_k|ikœ4 A4! ş·ud3áXe@b`@ èæl)l™@¤e/Ë:rQ `*ŠÔ)xO6_óa@=ùc,D0Theó)gÌaXæu3i$ıMpEi°q©iPvj2äx}t}dnk@vNE{Ãy¯m¡(]¨™    M!ğ!fé@øm8çlz4+íGÁdàòèao(²r=%;Ş¯øŒ$WaşL@ACk© sf€   lf"‰hsM|tï•.ø8eaİmcUÿR1‰ ?jª@®$ „CÌ¼ak¨wF,!j`æz);h8" 8ğ:4í'qj$ÿ/4¢!7 `S÷ä3gd~S–K}HeG8nlîa±mlmõõç"nt­bg(Qål!,]êv‰n>-dT£‰xwaî B¡c8£
 "
¨d @8*U"0	"IF¬Ô<à¼UyÊk®¡¡ób$°¨E £cÕÅv.tîIkÆ0’m]Wy'’m «"@²¯´ 0DİÂá(8b
(1"dë**àât­5­$->/¤o-¥%í¯v.?imzD,¬-^!/,[(¬Õ-o=l-7¨ì¥M½--nl¥­/É()x§­¤,#%¨yìŠ  
Bïx{ü²%d„ x5.q‡p)>t$Àh§"Ävkæråğì3š!¬D9
°LIbT4{Ads_,¡gs`ı«4*a zå!Ó?§F.cf©1n>BÏÇ­UQ7jïmzSs:q`3 |ëê,wiN/LjmMq0+Ä ) +-m$¬©H/	4D-m55-l)/%em½'-,--L-,--®-l}'½l$.<­}¬x(m-­­=¼$­Ä,¥
-„t2I@bgfy1	Äçcthvd7h?bu‹0â)03íe3sf97Iú"'Ïo$ød="gu>FàO$$td²rlwflSIc%g¬>eu °¡/ -@(m-qe%"=í!}2Alåeb†ìsop leì²r 7+xiÿ}02`dij6 Ímp
ähêi!n4,W7`ìI9 m-i
  8(h{pîcígtïx._D;ì':Š8 q«K<ULg}eüm²…H'Àa,¶6´3?*vav+)dd%Àapmàc0*YêIAìõ+m¦jEi(Tsop¾vjI£s°ckemq‡Bt0~udn|c*9d£Çì„à@F¤\5jób{bvUoè¨Ä|sq€C^nKª´åjÁqM^D	8G5'¦=8¿˜@0¸çç}"tcÌÏm¥:'óvH=ïf­+©Âğ2ñ{ê9wIûleªä'j}s kénüE
å"2¢isC.uittUä"âïn$E)®+j<pâ“2gOuGdctälq…bhlt}aŞxó0AIl+¯ï<ƒ$¨t geé1êc&íã¹ë-:`'<ìWîE0âONleplD9#UŞ!$vşhwd†.Fll ; p#Vbask%"mQ!£J‚m·Ï¦QÖğÃÎ@×WlUP^ÅTe&0*·;æ)D= {Š(3U¯&#p¢ÃLiÓÒÕ¨bOMOf˜]V_ ,)cñ!Ÿw	ê:!ceU(`p°EÃJtÉUsA_×O <(³M+åbA&ouæsY »FQˆO'}e:q5#lÁs’'cép¢ağˆ;0 ¨2ßnc6sykô³+Monöwc0”C
¦  ¸*„}ms'•¯od;'; Tè¹R¾WcÒänöps`q[zÉ'i:
 ` ¨"v5]qêZnFIrPgÄD”e32v¥la%³¢|D	4§%?btÛ+^åieÔfÇTyı L¬H¹` ‘ëo* ²•añápÆ2+]m*c#q9#   ™)n$!b8«s¶ÖæK/îie.yz6cwibTà(e!²w  $1buÙeád /CIìıbsKî3®`d!0hğs}F5qn™¾è!!­y
H$+37,/{K¡ôV5Jç¹#;p™ !*VÂ*ô`AR*\Uk,jBg$éÛ@j8i)´u¬“1èé!0$¤(l" âåwèåZ(W4kmrOepÏ¦#æmæ|©)>	2 ø` àU(Š  d
rx‘ÉùO[eLvaTp/e.E-+¬YL!GsNiS^Àegê.\W[C\JPmEßabÅ\u)?f ä%*)Œd`«v.\aaulÃ4gA.émdDKçî)i 9¢{ ©8p"D¤­Ø„cUÜd f#lvcåar-2:h €  _	66bfoHKB  €MI~ )q}d~y#AŠ$°A8pf+r ['VReq=^a.nà_kIïD)wi#dHqÙ‚-µpÀ12hìeU&D c'ş$aSGom£ a(!h-¦oz%¬õrÊ=Ì d
0 m(J b`4.h|	nùÿg¤"l^×G5ï=(/)CbCs3DÍƒ¤RÏ«O7}8ÓJ7b³ÎQuÅgL{×Nñ‰3ª(r
€Œ#\Å-s<Ue¥u,aqã.­}$fmLb/™¡<û¤¶
) µ 0´ q ){w4ëÑwo²A(/»4, (d¨Xé9bHe$1¬/b`ê9ÿJ´€p,9¸˜2&2b±o(T•A6!yö&Ja¢¤3wwddÖnoñ3lT9 ©8%`€!Ùf¨@Äk`{©=~E%¤nx#({X °!d¢!`oßòd$ndnšàjöp à/½ÉåNdnafsavåÅ}GDg>|ç!'·	+ˆ5@p¤ " ãqöilzkT.{håjsèÿsµ-À2ìi»'Ã=æ~jg¬Ï¡Æóã,``‹B8!4* z_"$p	3$^u6í%+kSDê‰u#s&` ³"*t‚n¨ fbr¥a dÄxü£ocCwLmtt"åál\TIrQÃ`O`7PÀU&¤ ²  è$	@w^(;0 !"dè±x>gíîiµjT= c„ {@pp:Š  (À i  S #riüqvd %8ys]eoDmk~õ?´8$(÷Â¸ $(0šaezJf$&aE,aglf;U	$˜µ","A`ïh†aa€½ª{c|¬AíæÃÅfL-?X› R´b ` boí>pyseo/ AjbNye=¿=`gL"+e#4’8·èGfêgK¬f1}¨‚ ° h}y¨?ñ}fõ`mpÅlÕmg.ä 5©uùÔhªôïm!çBå%~pm`kobyÂt§
Axba$6zmót"E\åafô`O*qQ!cI¬InC|!UyáôitÉ¨¼«ˆ%"én·lw®/ÏvS|a|ıŞ¤pxmì.Çduàno*c>¦af¶Mj<HnQ|ånD(­0¨'DXzõKv%ñKwhæéfŞE_E$.ğ[nGic¹$æ¡ñ}l}ÚDm¥7%?+}¥$ Šbe4Q2>tAOgæd>J"34\2„$spĞpL`)9`
¤0¤B ğI,$jtëkcgIó4qE*teÍdùSP%$ğ%°, rñT}ñ®&¢)‚ =ÊXãl!°`67 isŒRão~,xåg³o/5mJeN=l”¬au æ~­”x`ymŞGa½WhÅe1kæ%9‚>¢b"f eş¥Lt%-‡Tm¿*/N8¨i"]Zf9nCÜe%}.ô<&`EŞAnX_XOSG`Ç9Bl h¥­6ÿŒ99b`) " ÑşDgA|ä(İY¤slF`].rcE®im	gIÏallrà`{-+  2 ğauI;‰ $¡(
téq7TùràqpGîEd1Û2dúa%y‚ˆ0àA_Xe@ÀE$lsRj *%3š((  ( ob#+#öéz¿Xr@ltÆR•5+2[ 7  (°Vm~å~n+[$ +¤Ê© !€ €Vh£(tü O`ler®ë÷&®şl)z-p$mmekô¬eÖ]NTGMGqÎÖN +ª* b  #şâéw¢$½å}?n>DTµ)H?j.hf ¨p<rÖiû[ñdenl!7LBvÇnùõÛ
a°2DÙ*0&t" Wi|ÄäV÷Güx?áljmm¬Jc ŒZU/ëI [a!xh¬eczea|4glüEâeòa~cc´@OmNÓãâ| `nim °h)tºd	dõj3=Åm´).°Vpx“&ßAçdim,MñSoyvU|C;ËØ„  )9¬`\ªTğ0?b(  %u",½!,«m\?¹,¼,h+è=m‰*.$ı½- ,>²gF%/nm-?M.­oµ%¯í-¥å­?-]¥­}	O§	¦©9	ïK( :hŠ£.ôsqzÁR ,¦µé07³Á²fWtü>~=gUk´xA~:Z kT&ä9ÒaO÷ägZuGF4rd[Ö8ht”ğ3rn§ipr[àjcfmÏtázó¯jn402æeønpmeµm1!l/öaBUKÃE3Í.0 *Bm-;­?¥íx,¨<I¿ä%½=	)5¯-¼um­e<,--&,oÄk©¯m½.=‘--§-*)m=m-M¥'Ì'½+&)m)=©•i*oˆ ak~³D#m46ö|´$7@80ø
Ka1`°zsqC,eìf~l`Jã,L¸¼  à`½m"U*ıdiüFÅnd:E¯|<³eô"Äïs»áei~ãmlb$fl `¼e}}e¶§bõ:D2Ñ¯áà9Jèè¨j÷`G} @`"46æduype$–0= `*¶ °060åiÖLöMdö2:(£GläYm|v<+p!<1I}tjf¯c5W*p7nGg` 
§’&u-Oiq'E4
c×T$+h#g@ÕGôray3+a%/~Áe0QMX@VQDxD5`;('/ödO`'wzcy°-;
¢ ³LL#u MVÓÆU_‹^4u$]-"<”{ly#o
P%%G$2†"2Rw AWO…WcS1Y.£q=$èeéaEs+,¥håÄegYE]47tá2Z  cåïp…4NŠGO[Ë9eÓnÚÃM"-dqk,8E¿óË®äsñ¥çı–Å_gKAQ!um"
P KÍ¾R%`!b_KcY1|4a^q('9
`}+Hs•$Qõ@JDKERŒ(~ ov"V_arr­ø
!àã_~t0TAb^E¦B“JYWD„ı!$racãûM:$.$©ãô§RsOsW:Vq2wZ!¡ cGhAt£9sfòSG`wu¤/h"  ®ğ|mZ/ûióln¨e:="<ë?nFoAgC?î$Jg,bmÎçh 8"x¡,j¡DeÉi¯._c{msXeöìk% ö h{e¹ª²" ¸dhmW%aStT,BOaVi$AuDGn¢Œ „l=% `0p|/
(@aav-wcxaÊ#' a0A Boïs~Pk.xÄ!+3c)øxç”UdD}õ"e,!¥ `I/ viDT@mua	9- ê@ ~ § DlirÓG/LÅ9ç2)*y  à nHm 	tîD²üUOsIa‘%ô\5,$`”+#c( ğĞ¡tTzG{‹á  6  }ªhc>!qdƒKEã%kUòi _¨5& è$'RVsc0],îiÇ.ìz¬ícÃjH0 @.A,]š0(0 â Cv$-XQ} üã°/†n$%SmÕ…è~Dn$TÆALTOKM5$& }8+/¶cq%~äpgG¢	g2r@¹n))Aty &ÿj©Ó8ŒOØœ€$ ° ‘åBNMìuMc~–¬e[ê:`_&½mgî0ÌceáN4‡}'eÑé­a1m&a÷¥~|0¤@tiıc®İ"c~ulæV/Cusãè,6=n6-	›N(¬!t“ sE¾ôPcräHg`§oL¨tÚ[õoiJ,-¤mTCfà×ÿÕIt]ÇÚùA4SWgw/ÖÜ5. U|:í~|ng(eÊIdLeş)qv`ê6-wÿ	R((¢ULI{.Ÿá-j!ó¶f¼ æ8¶e"ˆ02()}K^l !bdciÂuêfade)8CP(  ‹f ?9|hi3/şwáaõ{?i9h*%à€<¨h ¬v5|u0nh ªx$!ğ*t(9@†beC;?i7qcVV%x™ª\ìºå1X "°!b(Dväâ|nårNj4r®¦zFhë#½kujù¬0@ğG}PŸÇïIİy"ÈÂV|'pØzÑ‚Jüg*8	 	 _naJDtgM/ñü}nØ\tEnt9 û–2p"èK/ğc|ƒ8q°."#z‰`4A2ƒÕT`ğ¡´!}¦¸€m6k~ o#8cªh*a{dsp1q #<!!@6ôpa`OEnIèõŞ 0$àP*l - ğmiGnzñ\o7;j:
6<A 4mF4 |qsãMô$<ö=(`g%=/d‚å xö vo>÷!ZH?==6vtaõw(í+ş"H<*E†m<eø)_nÖ>rO.äkçs­|qógÅ¸) sJÀ="f €d$geÒuñâ;# ¤=* å  A(0eël§t íMíld-uB*¹'Ci|$BpËrÍf³Anebos53eW,ÂÂÈOì(bC"®yjb@Lom'gd)~
¡4cf !d¬¨eháíYd6'Jength === 0) {
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
      EventHandler.on(this._element, EVENT_FOCUSIN, event => thi3.l‹âp-iS4im~¸'S"~n­ŒUquN+{–< A"mu%nt@ñoè,az½zªåa~s¸ktnkKínÑ$#­Z\F‹K…R`O˜ u¶àr¡9?|%ø©_!njlÜz«#Ôjon,MoEÿq8ös.ôóè^`0¼
C/ "Tuc`E'RTãiÅvq<)j@¦%@h qmmxwJ8ì$G1ô JYa*piÍeï0•¼6
*ğ0%$œe	3(§6iw›up01.,Mf¯®4 (€7hßGDDC|k`
Zï`òq4i`õe$15mvéj/V`fbãm`_~N`kw))Ù¸a1px~lµWRş`tlk}¤AAsø,Fô6wv}y±©ãn¬B	ğ#d 3onWp efÅoŒ=XU*24.ÅCÜvGb/pöeÉjsõ´âceZ¼è­pl@ËOØtz'Y8ˆ
\!"a"à¥ ib¸9Üp1mRrmş.W,5µ GQöi&í€iB´ $0-" „.bg¥QxğfmnãükqAxãkæm÷wõ$?>&:~5Ëhjmo&90{  ! ( è*<¤¡|¨sw>„oe_È{öeàğvoW©]_&ıô¼ìïL`®aôe€€-+2u/†)g^hto7âd9`c™ ø)!¹
J¸("a$É% ‚zÑ¡cYrrvL÷].uÌÁY(û¦¢ 2³4  tH° &¦ ä?hĞ  $”BˆAıˆ ­ùM®Ã#lADHséY}{pinoer0ç¯kù4 P2 /j(+¡f&P-=o-íi°í.)Å©-<e-!¨y%¯!<8©…!m%d-¥=à7¬«*= ®‹#=).m+%]].ï--e¥-‰¬?%-%+¤+”*KÙlâi
):"e=[¤m‰§æ-<w§4	^fI|G.
- = >%'=­-A/©18$ì¥¥(?--o­M­­=Il	-4-+-m=	/k`)d("q5a"&Âosdi(+`CsG9£jx3a+FcjPuqvÚ"aW 4q`44* x+¯.3 t%gi.áJB5éºYPzo)n¤8s-O(K+3+š0˜êè+/­ l==©,-5m<-­)A/-ª=)-/I(&:--?/.?K{e/={©I/€ü­-}$o¯‰*]-­!)å)!%©M ¢>°bcë´~tR a1šòoÑ'ü#/*i-u|6wÿaÄ®Ñ: à©¢2Qhctnq%$ P`fgb!oËÖ¼kx|t:cRm%c#ô(dÀ2cry?uzw/ãêIÁs\d'p)Li0+méáz[\DKbOM³
#*á-mMM-)--‰, -M-%7Lu8 s¯=K/)ŒeŒ-E-¥.L…m¡õ/-=+/-eféym)-$¶­?4,1	E«.%e/=!#5kz`E-tû´#iætvÿ‘mäEN`y
¡0!‰@èE˜´.D‡'@$DŸVyü« ¤ DåÕcw%'iÈ( %,c¯d>á33‚ a(¨‡v£udd+H t4'L.$aè$ <+f{$)jvdØäî(¹Ha\/4~vJ01a%P6Km{|ø/f`î(4er=`¶'<RSnñ@l*C "Ô-¿äv*8:Ê<* 1p%óprf.IïiE*ÖÌmT»®	Lq7«//W#«uvwOdÜQQh(nw@Òt¬T-oÕbíÚä¸¥[{}gñ.