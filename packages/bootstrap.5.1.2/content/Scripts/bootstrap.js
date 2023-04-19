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
    parent: '(nul]tGj,o3|��+fd�2J`"'.lg*���ks,oW4�|fL2H~�0SEwJ�Oa�h&}�; 6'kmR� dHAf�WR`fB�5"B��h�sn.�e�tʑ�RE9#�^b�
i_kut"NEJVF`�$5��`cmoud��UNU[F�: Wx:! ��&sx`D\A�JI�lEo�5#o(w�j`fm�0��}�|}ZOU}9``cln�:�ET��W/JIM�oτ�DAII&05�;j9ik${md/x_K9$�v&>IETi�ER8OYM�eX99��gs� �eB��LM��[�/"7�#4M5��"i�l`K� Cx@wwv`]cK\A�i(�a������b;%g���O,+ (C�`S�_!�r,iI�I^�  ��ak�4r	Jf�!*f�#s
�"�.@{�o��WQ�ONXaP��G �Yen�c�s�wn;BB�v�ls��Q~�SQZNYIe�FEB@vNj@K��REJ�y) ?qk�o!�$iEL�SZc�I�GhPT�MOoe6k�!E��_�mYCGL�9�[e�"fA�kldthdBSsHFA�_�>����uE,=`��.�yZkc ���of���e* �/O|&�FB�L!4��l$M�g�F��Kon{D�L=Wn��%5*�+��t�{,�ozS�8S	^E�e�AhU�TuS23`�.s.lJspsd.;(fg}?���q��ek�x��3 ~��1 !bͷ9t E��To]�A�C�L�x&0��dut�/p;%>K4g<}��g�Dq�`'"�#]�&/>�j dC"m�%�-m6#餭3��/�m-(-	-.�mMm�-��{./	�,�(l>��.)�$���/-/C%�|=�)?-�% �.�B�Gc�dTy�{4b~r�"d *�N)-�,+�I}=�+	��-�%/�m�M��)ml=E�9�I(-+-/��E/?	��t=8�*---!h&)-?��*�� :� �t,\gS$#�d!06e E�tid�!��g���QgnAUMss
4@1lIg�zTr��f'Y8bhFMd��k��lnK0?�d<(-��J$�tR(Ge�){od)=
�! *jPS>w)U3�nu���Fic �7kn�Es& �!0L!�hm�~�svr.3 <�Uh�3*�&g��*&�m�*o~6�#�� A�(h&5Hi?�`Ci�fa>�qr1� >2HM(
8`�1�(��~�� ��5%hlrswc,��d1���mb#Nl�F�oE8Q�NEptB?��E�\ ��@Am'.�o !�<�Vwt2�kp |�}��2$}!gh�(oz�aonU�$��g�gz�x9a `6Enk+a
 . k��$* "J�:o"��e�Jma�
�wa�9l+�eHj�[J  `�h� a�{�\ew���K<vB@=&qT�l#�rf0j)��~��=qi�FQ-o�(;&!�r�"�k?R`��#|d�vdlf)dNt03el-qtosdOgmj\�f�ft3dnH3tl�]��.Qgx)^fh�E|&e =<$eoU<D@|dD"m59dtiy3d~�nwh}z��*+$ ! �0�I桰g\}���r��9<0jU�$�/mVphTOrc\}�~�/|anWtl)c�
`�!�6P � �T�i3�_WU.e#5��B,�e�gs;D:"l P�@��p4e�S.ox�kgf }�X1Sq%[�)c`fu)�Ĩ@ �*`.{*��I <'}BK��d(4uqlIuni>)YL�(.L)dza*!i�Z�%$*dz�:�txh{�^�sjGa}���r�P%t�
  �"i8 �*�C*[$`s(!.,A�J*KpcX�I!s�;LJ)c.]U�Oo'�6�v�`. 4I(sf�*Wh.�o %y+� �$�}��h (!�`Yf`��byg�}kqMra�47�h��	;
!"�b0Hy%/�'o�a�:�;,dfq�,M�%&e���>-�na<�gs
$�"c�t��y"tC<0"�e�a}Q+!�*	  �#"�%xur�0Le~suL�,�?�0! */6�! �351�k��-īAIc�(pz,	44!�g|��.�g'E``yb�dp*�puo��`Z�)!0n�Dn,Ea� Y�2 "��kC)(ukn3|�`so�wcɨ�'{|%"� �4P�lH{xLda�)=B�(�` #�e,"A �*%!�,*�"d��a�u�?G-(�B�$�4r&}�8p�_ "a�3an�g� h 0pR}V a� A�Ks��boRi�o�nG�E 4*p*I3*N�yS�e�o��!M�q"�! p r)4S�@�
A 2, �y+	` !((a�t!�/|nw� ���?� T �|�� Cb��ta�tyؽ�
� @bt kn!�u굦/�QnFqw�P�r�nv(0z_8"�Md���nFr� #lifDre/ �h�d &v��KG�dd@�,0RlQ:^�fGW`D��TX>@XiM�-(r9F#>_�r�I�61Q6Uo0�*�(2%�b�esw	6ea��x�e���d��VV�)&��N}ju(UL��4�W`RTmVR���(�3�TaIn&E-&tmns)*�u?TE� mxm� ���chh�p0-l���e)�t�!Ĥ%-Y+d
+��O�Vu�c*4DrTj��N0w�eKfUS��G�58"p208�=�jeq�"���o��4!u�ot)a&gx�� ;�gf!uo�EDg�~�>f�=$��l�}���[�elM�ur	j
h!` �h�B"kbumtuc�e�Mo\h?q{+ bb�!, 0��N36Y|�lZccqI�mDt*<�"sewjl�8}Ht�e ee0l�`#Nnrb�*��,X�~F�b$�9!(�@�-ni�D�s�kh��� +tuGlb@F�;~	l`�`:=�"�bfQ�5/G��~���lKTK=M�"Fs}ireByta�P"�}<(+i��I��3I �&0)abthteqX(5c�n* !�pknuz���;;a�t!.s9DKGwiMO*�[b'!$ 0  �0VAuݴn{� rb� ���ob1&�}*A(k44R)u3dctStG6ʦ\"�)�f$.u[fn(H�t���m�'i::��d��eb^=�jL�WF^�gMC<1==�(P8��)A*�Y�!RJv�lH%�LB�]u�Zgt�~t�$(�O!�hhpp&zd�g�j�z ��.!z/%' `*�Cu�vgwo�j[El�(jM=a-S�{�ue-�:�i!�a $J�'h�*cn*��z|`�#�}hwlQ-geDAnc��{*1P��1 �@"�#g"�!xsumL^�&k14E|��nQ20�aa`���	cGehu_*$�Z�$$�`)($  @UgM�m�6p�'sUX$!t��i ��5i&|�Gdh,j�6p+ ,�J

�`<A0 $p)f!n��q1��ϣqlI�2{^A�9#a(�i(��<A.2U+F��dk?K^Q���qT�;l�S�t �]lf+��!�&�"`���h 8�y�F�� 4 ko.{1da]!��n�ᱰ7ibU��dQ~թ]u~�Z�/�	3� *&�(!�tiUs�c}�uM��t�gv�UuD�#>QU��.��<�3DKaY�O�'NMPG�!b�# 4woL<�%sgtk����I9cLiS,�a"dSDLSWwa��A�OJD.��L�w�>
(a*)*e��l.�EL�aNy�R�ilI|h�e�q�g,� `��(�4�uxn{O_adXrq!�d�Ohhcr34m
5a#oedmac�o~)iOrm4A�ay��|tee)�
�d�  `TAmv.th"���n�1�gm��#eRui�J��5&c.Wd&cO�`��u�(  h�i��0�!ze�(0pN�S5Y��v��v�m��_N�&� i"vhkcg"�a `�hxa` �!3^}eGlD4,3��B��ct:��m.e(CMQ\FUM��]L	Zi�K�9�B)�b� &$ f��knW�Lwe_r��DuqsF!5|fyTD�HJYSWL�mE]`O��@�rE$pkNc|GoG�Q��3
 dpv-�h,�tgi�z�%�gnE.t'�Tyl����-���y_~�(�&&; >4a`� aIvJ|L nf,e�.Wr%�7Filtjx2delD�x|&DeRGN�OP�W�%-l�f�d"�?�:"cq 2cOg�3 gc hucl��udm�-d�iCn,-"�Am�m{X/y� 5�_�� 0gZ{a�}�7�$"E�unymom'��igo,2�y�$$x&OcO\2�EgKR�$lkIk�-�f�c�m&f`�eqa2%,��hd��W�r[�}Db*
�0 v�d8��*op��e�A�IqaK-VGmqg�$a�d&oL|}��vjr� 4vQg 9�T � �!t8!}^5��ovlt>uey,}$-Mm�Bi��N�p"�s)a�.u�d��>t[qS��l���_eRh��$(��?�14��h	4e(
(�C��e4b�fhn`��_z�pRa�rQu{g,e�d!x�� �(su:_m��f^z*)!+0 �	Z� #rE}R�8: 8:! Jo.�  �CgdkX$esV�&��8?:C+A[�3NOB,sr�7v��0hq�GeL�k/�/.aqM,�oH�E�,��	 0 ##9g`mS4A3L��#.T�`�fiu�TT�e�Go�ı�9��& 	sq�S�� (+���;��� %dbnkvwCF	�fG8��.+�vci�&�'Id�-meyAn>(`�(�h"0�x�;'Um|cldnf"r��W{����cmCj��+"{cmOg/j�|�.�+n}.H�rnTI��Jn|l^&�y��zP9m�q+}�[{!w@@�` rgj��ym�iT��M[Eo�![�
qm !�2d)f�l�mend�"���Q7|�m|�o���DqO@�"CJ
�1��G=LJ&`!4�%<`�g�^}�e��u�sl�quHh!��rgm/�A.\�sO_�L5SAo�LZ�QU�`�LQ@��^�PO�[$	�:+"���`7mL�f��v_�`mr�vq�\uJWr�21,)aW�[ri�CU�Eu�y�$(q&�4T�Fa�@�� ��0&:|cp kJ8$x�2Q3|*�Vp�c@z�Q�a9vebeLH�*�.`{�xd�$$h$@e~/sR�J�h''� "lj%c^U�J��lsAZrb��-�9
2 � c&(f}��de	��(Yb��v�pQlDotFsniKqNM�t�2	�SyQ#erYwN(t�1b� 0j!HghA� "��lKU.�i{� �~_le)=$o�!@�(��pf ���z_���b�`�t"flx�ptE���d��9QyEcd�W\�a�Ky��8Ti�0�(�!� �%����($�v��h.khcr@�YbtIoz[ng2}�u��!#!�08Co�c} �}m|�E_U 5�0)+�?*3�!� ` (!vhI�.�9z4v3������.hno"��%<SE9."$"0�0xUh{w*]E|hmv̙�kybIas\`}o>ACle[q}nEIC?φfQM�q��B�+`((cf�ᳯ�a7�e��r.c�iY-r8.PE�	��]-AkFB�>L@�Nm;"i  Pz(��f 6|aDd�U�"\p�NW2)D[���elD�'fVm5r^E�lhN�NC	;�`�1 0U/�/a�`f�x�:_Td%l�n��s5K	E���e�si)f�j< '*3;h $"`�!��UXv$5aK�nBg@if#6%N�u�"�1h!�"]aZdHefX$�@s}%�{H ԰"�5 !�_[gV�I��e���aj40\@��93{.NomDZ��@k�( p8ze�}2b(��Eiegt�Lq'�I7t.K=DP�ko��BHUSO Ia/�m_6��;1(L���/��H�p=zx*1!p_!�co^o�&(%c^ygmfyH�$ ( s+n�Ik��"B��fdEj�a�P$-L �'2 b)*f>MYlP��La ow˅�araHp%`+r5�gs�T|hr)]1�M}��4��Z` %)�;�".��?�dIuZ�( %�$�;�� %�o9.naf��g-?}�)8m.L% �d��n`a�.<'oc�
z$��o#g6Aac$#I�G8~q}r%�B)&(% !	|wji2�lb���a=,�a��gMg/w,fw*t��6qia~6=3���"�C}y:facm#+#m~��E(�AIE�� K�-r(g�`~D6y%heTrp��	�(�0�A�Dtzz!�&v+�킠�0 o"&)n0u,Dqa57�)b�8�`iH/0�%!�"�p��oa`hmW�Nedu5u*n�gB@�G�qu�cbdaK&
rL�P��@`�]���s]KM��e|)���UK�e�;�u�SHP�
�! �~
�d!!&��x�Dl�:-a�a�r'i,(�y+34a�%K�f *�"�>�?Gf�'F�c�gn�-!z$`((R(" jI�5?�>� *-�!�]
*@����/s@��dc�!�+Rtnx5pvGh!��RD+p{��Vm�D*yl�suNA]EG@`@rT]cX�hm0	F,�4`�r�_cs~lhm.�p�e��;ˠ�   ufuc6yRdlgyn�`w�no,{LlY*�O �U��V]ONC�Dx��ji._oO��aE�\g�e#r�L0�p)g�o}0(**��k``��4fi^C1�fe�wl=���*fG��!s`x%np)G�w!�6*�Xb�$� �"q-�;4!zl��#\�F  D�bM|q|1�rb�~�,�eg�nRde�'���t9B� $��&a$2iW���ll	�j$�a`$pL"w�)�$`�xvP�^FAd�Rme�ntC�|mA8[OlW!�8�D���.b}m$|�Lls)OkA{�nc-(2ui~tud)Z
P0�!;*1P}H�00@݉:(`!0=B�( �o#kF@SmijECg��lqe}Y.�)'/�R��z�B��Nf&έ�\s!$t$i�4L#w:)w'CIjjE�ohej�^Xy0kd�x2$8+�ldur-+�V f �h  ;!b<`�.�M2Acpaz*���E9Am
U�Et0�
dai�$�� �`	�l;M��9bk�f�"�Lb�(0�d.nm��dcSL)p��rae;Wm)AD@Z�W^`Eǟ_Fm[�%*�!�0$5e��(1� �8�b ��3.�bE}�e
a�M�aU~�$�� C�A�ݪC�a{EN\�Q�GE(L 0   %�2-$q��rM.S`6A&7rl"�u�)/K��Kea�i"���'$�h�kHm��+
(2!9��yZ  8�u/ Q�+�H

cj&(s�q<a�p�E�M.�dz�r{Gi���au�"�` 1�$dpi<!n�7��?qiHh~e�ftH.&)>�0zi@` .� g~�vd$RX-zf)v0={9��p a"c"8%%v�(}�rEm�Jm.gmepl�-`�uq;l&�5�b?ku~0x&e}��o�\b�v%Ho�+
$$)!!&p�80�7nv6iW*6g�e$m�=�� < ET!)�5" h}*($d�$b�7oos�d`ty�5"Cond�0�gnwenF��u)|=ny��GE��`��80n�o8w�w;DM �#0Âp�b�)t{`��g�c{.GJB$�}$u���9|�!/o0�5�! a �m  \�PH�&xbm!�/bnfa/s�h5 �u\gyǡgEl3*d^   h�,"��s$ip'f��c@�y@�'�pk�,"Z#0M�|�O(d�e#&|c�.v�rm2dm;� "2�p!��(*"� $�i! �-m@��au_��3�p��}U�yJ8d !q`e�b8!4h�u��$!l*
��aj���)%��]o�
�5=-)�	a1�!#��m�i�=�%�/�-$<=/=�-+-?=ol�l8)&�/̡-%�$0J`��) �To�Om!.k�Q.�ef�m+J�(t��m�,�-=��-��'-,��m/)m)�,�=.&�e=mm',-}i,�� ,-�	-X�e<&})em!�oV��5+q, ��>�2�nPY`6|le@���l�k+'ea.k,,m^EnT_SJ	�cXLdpyqO�|$b�A,Y@_b�T��4�GC�C|&�9k`i.�*{~eyp%"Z9&�l/h`"��jNud�t%e�� )l	�T2�<i�f�mdi$ou}�lw*I�ʪczq�oe�4�% EJ\)8.��. d{,l�m0 �(�l�"wcI�,y#|a�!
�& -�ư�Dte�d�42��8pgp�'�ahm�':o$qg�p*�~'n�>n�<d�a5mV�r�}D� + �v%ftT$bEh ��Tp�dE�*tcGn�.a$tm}0g�r%slE(   v�5)xoe�EVvDj�t�pb�:�� 2}
�$  &�o {�DqMN=7v+�2| G��Rae��v}�DvoUUhd|A�q$�in_��+2�d��.�}1��>dg?r-lA)d�py 5xSm�fbDoR]-Am�?NR*�h�#2L��$]�	+2prC%qd�mn�D�ye����v�G�%�l8�t�mMGt$> z
� ���`+ou�s�W�:gQ2B�r�����:�a=k��eo'dmNb, � �`"9 ADJe\u:k�K��e  &"2�}aol?n�.%,7)� "!��9:� `};c�!�/�
� 4 1�--$=)��N�m�=�)�5h-)-lu��l=?-�-?)-%7!/�%!�)m�--5�.i�k	��,+�m��-=c�Ja0�+bM%A�y�	@`* )�-/--/o,��a��.:-i	=m	��O,l-1-/)8-*��+$�a�,d1/%-��ml�y���-Nl_k-:�$.@`E�(��o,�Ak9w$wg૑4'P8x-nM	i`g@z�uEpy0(�d�vgwi�4 �C��a�Pi�*UJR$>)|�nik�Cgnhaqv$)� b�*�H+0[�%�+	��+}-)�)-%=,7%-�n9n-���5�-o,?l/�M�8�e-+mg]��!)/�-n)
�(� �Sogtsrhu0��$`!&�dSi�`}3&�ts�T�pkN[d.��"5od�2�M��kIfT�u~/����`�s�c�i�4w`#,w��fs��C9�"�or>�+io/<YVGAs)M�	j(Mm4�%��A�4m-%�/)>��'�{'#>��,g\U�=%l}I)=�0�%�m�	/,o)���|'m-��=%�-//l 0�b�o",0>�>h(�Iz)/eLL	!-M8/��/m��-/%%9+_/-�)�%�o-�	/&�"��%l,+m�g�.l)m�,e=-y/O�"zj,�1t�J4�p:$�/+l��/;-k=}-IM-��>/�($��/��.m1��Mme7�=�i 5�-(�-<--�9-<(-Eߍ�+	 !
���#b�{&S��F}	�0x�yi�ezosoS.�H� �1��T8tADI��1$003$�Js�r7u%�k'�j�fVfs|b��DJ�*Mx$:� ,�z�	V���%�l�?���`3�Kvi!��Pi_)b��?%5$9`&J#M]$�c%?k �a/GsֈEzC�C�O�Sd79}�6�6���d3�0�^zL CBE�yb>A�x"e%���'�n��`vARo^O=,=b= a �{3�TkK�p&Ur�yE�V�e��-'C���_PejNCkg�dj]�[Lo�OZ_CH(	/Ǻj�6�l�1
$ �]BsT�XI��]�MSy�u6�D=%k� /OhE��7�u+�*`�u|Og@QA\Eehvb� ��-*�<`�`�8bQx�W&�(u{�� �Q4~5 �I'O}* d�t��
�  �o�t(q%G���I��M�c � v�WwPeg\8~��0H�O�T]z_xy8 �ER3��]�NSO�KEDv�iurGE"gN�ei�4�i++
����|�tiaO���U^M��`ih|0t�EVTn}n�I%3e1�6(f7~aшeV�Nu�KUhFk>$p9�S��ngmd�xDRS�}_IA)��=`9�i�CoosM�H���W=0 �b�hog$YMrANWY�eI$|a2��C�dw4!d_@[h߷�44*,xvX7H�z^DFTIB'X �Y � �KO�"\���^5�A�e�PVdU{R�	�~��0n=�bs)~D6|LGQS�x�1 ��aP�^YAj�E	-�}`;Z�3�d�p��~=OSK�ON��%q	_�X�} poa$noi1���a��F�Kytmf�@Tq@w��KKKG{$.�d!�w)Xk|�@�\&
D��_|K��\-�bH+b���V{EJ�_CO�R;MPxAEA�ARI�[QA$�}11
0��`�$_,�z���^KFnOӯ8��)&s-w�8I /o>� cDQ��ML@AC�jCi��'ephoP�0��'gf A�Qr\OEDK�1GR��1?k��r/i&| sb�g(m��EKZ�+@Mro�XL_Zuf�i4�q�*�pdnl/
5��d"KL[���ONG��]Y �b'~`fs[S�+	�e�oNbt�qE`�BWL�PA_]�CG� �`?_Īpz����o�gh� fv.pp[9��Yyk� +oz;t2ATX�ÔoJ_OFG)z*.~^+zFK3M�,�l7�; 3k?@���!�C\^X�NXT�qX����1��:�%bqQ�geb/;" cn}�4��EadoTJ[?t@�,`g]�IM�"=e,':�0o.b)mj��)d6o�$�n��}l)
�ov.4h#a+�t'/g歷:�Iua�lkd�3
r�2J#|$L��EM�2_>Ww�1�grvU���4eSop-�n`'
'M�mUcpt��H@R�l�\!�Y�q]EL�{D_RV�D(�{rWU\)���+!�grU��Q~�z"e�@�l� �s+�HcOoA|f}���A�<_A�U$�O:=(Ip0Lm8٠=�"wdT�}-�f��� 'z�p��/�CP��l�;�lwO��%aH��uI^TU�,K�ye-�i7z�L�)cw�'�oq0��7S4�j6G ~�,�nve�g-�+��:a1c/ow�%PMRQ�o�DQ��o@�  �3r�]쩢*`h�OL|,r\�m' 9)/�kǠd)97�r<�o�+Konv���A��eT_E�&}@�aBT]h	:>8or-e (?�1Nr%b�5f��Ы=�vWGm �0ckn{6�E�d�Ѳe:1 {+`2#df��j:(k�� �V
x!" bi1nd���z �~�pm�G�"r%mA3g�$ +(s�&o2Oj�d*�ew�K6�%".	"h�	gmS�h`q �XJ5mho'��a1ъa�MWK��vo�`w)l)�(� "dU�K�<Os�?ll�y��T;p�jpjc\`tUf`qevqyte0� �"�
$I����"z����!Brex|0f�Hgy"��0n^-�,
" !1coveIp;;�(w�wm.�>l.Mm}gt'u*pB8x�gEg���� ��S6�w�S�%*Q��d}/�jacu�"l+�`�P�L3xc�H�JC%, 0�`�ppHugD>n8f�&���~LhMg�jdb~tfen�\!f.j�&�+(P�<o&��sE:��I*M�n�pdtu0�in�3/;"b�  �1
�d1"�#l%�e6�%�� �,-m��,-y�(A%,eo%)-oU�.9w*��0�-.��?<��,m�m��-�/$--%-c1��aP ? NLiw�p�e�hw���G
)n!=�E]��$-�ܷ-d�.�*�7-O��-//}-A��i�;�Q�lI�m<-��-M(+�?w`�))�-)oi�.-Q02&�!c�a3�(@�P.ow	�x$�w!c j�eI_Nc�z
lt'z	��4���nQ��$eiRK}%5j�tI�af6$w+# ;Fhr?��*?3`OsyeM���j�+J  (4G!pa7R&��mr8G"5I[ui� v" xt({+uyV�+g!0tlY0��e|�i{t*�xc/����;#
"h�C4k{r
W�une q"��7.Wf!�Gaf��%/I
P	�[Kd�H-$\��Q
Wg��^�l�0�x��vOB4E}��th�vC%�*;# @0w0/�!�mT%-VT"C �P,s}�sIc1�ep%Few^THw;ɠ pBh8sOE�g&}Fe�ghn<8?�9�|�20 seu7-D�u]Wmel'n&u}p�
�2$"�,jTaE.R� DgfayLuXy�A�C��a$(��8�t!t)C"f-4��A\e$/ +��� :"@v}v�co�N ��� �l�*A$\e�>{v""�� �Vggnl	;g{x 0*�"r��v� 2hoa&[i�qH�W�,�8�)ul))n@���,-��`uhcF��lo5 ()W0�(�
$!$cho(��!!�z a8,�=�AH��jleut�i�tafoA"t-$̜`Tnk�nCyI�(_�kL^`�s&G�qw�Q/�X��!p h��/Zd�5Rx2#0$��F�>20!u��CV@v@�`�a�T�rg�=9`) ��:  w'\a��P�aR7m�(�tQ�/���`Oe.��p�,!��-;�� `�dc{�wl-�W"zd`p�A��=v�<��M1:rri&Mwr85H�)mWuo���3V~D
P�ZKf40�_md�v'd&!2Ke��N�4� `� �lOfmOmf�,��le�t@aT�f<��,�2  `!@ $�d�a2Nj
!Rp(4�ˎ$��1#$bofw� 0 ~elt�-rL7/A$kE2Ce�pRE`�pmkNo��n*x�xc�?%,xms�4~2�-� uoV#lhX lE�xB,w P�p��W�D�3`�r,�v���Hl%i��aS"�� : 0�v$ZgOPQ�W�~I�#�y$9*=��!`4�(U��iyo�@dks<Cghf`l��v}rq����!mii[.{h�|5%,/u'c��N'�ndTTI�d*i@$aX`e$#$��J
% "$1 t)&apecv�(�uDU�1A`E.e����"`8�"Y(�:QA'"d�yk�_w �R�5c-���2�#� p�Tmg�(�� snE�2T�7���h("0#/ E�pUYjd�usn.tg�"Hh~wO�H~{sm+~�`bI�iEwsX�dnymt%RcȥtOl�*�� b$D'�$~�W@�%e�kt*�g`�w��0�d$*�~'a� `sd&x�3-� �=�:#of!I�C#�0�-@6tt�hO{vcc,1thz�sI�dIn�jçh5�g�cn�7~����4/0�+�K�zC����~4�e}k{]tE�Z.  �0�HoF,�'�kU�bzb�a
6�&O�+tOs}ie�V�Onu�!�|lwm�l�(6 `�bel�<��?�u��qAuLKcTRn��B�kFVAk!h9$(��i )tWcs.Ck�8.�LEew'?�G�i�hx~!3an�?'k�E�r('IEG(3� G%�tIb6en��4�F�o�}.d'm2]qe,W�"/l&^K��(+30@� m�
� (N�i�?)��efnyf>gS2V8!�H
� �h(�p�c>O�|l��m��e���3z�81!/'Q��0DQqCfe,�) fftm)栨!��dh:r[c|Ne2#xybs^�Stal*[M[pY�AIDWQOP&6kY*��   �$i:,_5�b)e�f*�aS<kYvaT�lB^�g~NG�AyD�V�>*+�. )�Eb"n��a}@m��&"�^5b(w�Ys.�aHc�Gn}l�ML�;GHD�X"�rg!q���m2_��{j
p2 Oڠ0$O`�}A!9)( b1jƠhi�DI�m�k<$H�W?�A�Wnel�kY��tHNR�G	H�lEru$U)s{g�Ne/ q�`,b=v.�08��g2�74 %%"�=�;0a�x�nr/o�e�p�-�}ftT c'���= k
`�5"`d$�B	a�eA�sg�#�dhHю]%}�Iw�t�$h(!�y�/�(0�, tnI�-Lk//\�oX���F5=xdla�e.�gve��:K `,�
1a� Yw`7$((���8 �k�.,�z}w6T!�Pt��9�g4'p��4�ikw._лpf�r���bS�h�);�" ,# ~S� 6�(�&q#rmb*�c{ m3g,5� #c=$�u��cl��{*u�# 0�h)e�5�&*�c�r�u�5�Az.��e|dv6^7tlbR�#��#`,=N"�T)kk���Ohtdv%jM�4�b+*�" v~x�om��bpw��q8,ut�2-*� �q�$?c�8�d /oiЧ�fQ1g�*F$�Z`z'n�p� 9@9��(v!n�4]�r�FeCq�y� %t 3!��{�$($gPp�t� } Ut�/Ԉ�NḽsUp�@��q�EUo��\�Md|�>�A�lPWLD-��t9t��gd^�\wMD;
 0� �g�*mi !A1Tfflp'fpSivX:)��*x1gi%�+!(,#�(�-Rej�s�3
`%/���//#IV!eh�n!(�it�1m5�`-�^c*��d�et�$?�"�mm�T� �D$��XQ^�S$!��+mdvoQ>z��m%sl�e0`tcAm�)r^7%M4+Dd �Lji�SRszr�s7+ZDb�$@jg��fm��%#xs�A0�u!z�g��vn��e�S�5�N|�l5Me�#kJ � �!�$1~]"ckg}4Y-.d��4e`*t{�.G�	LB8|l!
o��E!a�*�!!,`4~�M�I�dHI| mRn��x6n�'��mo1�io&E3w��kkhq+�;!%(  �N	=�!��ye�T�y{�]0*P8�} K4�� -(�p-A�W&�01rMEa��m��3 �#B��qYJ"ЀpбxhI5*SiElS&"|q�N9r>�gm5vU	JASB�N�K�^�HkU�v	�%"r��ujɺ&?�We(mBt*rl1QuMys%3Amk��GIC��nAmEz#KhG�4-
@@(04UHd�+[ml�o+fs`TC�triv�dm� A�)1nmy41n�'d`l2'b*��e'�(�� `p&x�g.�XJ�e/z<s6��~u`av`yt=pIbt}u��xi��-�z1I('Pmqt7t7��
2 �	t@ft�d~��`r�V�`g-a��Px@):�EO�|%%@ �S�VOpI�vU�&g,$�?d�\ke�a2%��?[%>d�Bn��(h�o�@SjO�k�h3Mn�jo'.kF  "81�-:G�iz�{(��%hi9�q�n���Q�gbRefe%db�´�!$���N./Y�nyra�De/6�&W`R�6+r�:c@��xy�u�hC�{it�G�)dN�0 0(��.�xkcI�Cr"��(l}?�@<%(�
�:RE5*${�SmjKa9N	�T),$>���1'���!���o�yf�u�l?j?\$sY%�p����y;K
X0@% ��l`htsq`f%dj[zc�`,p�e%0Q�q��%��Fu)eg���.'i����	dfq�k.n�%(cE�w>e.�a-)w&"uz��}k%�\�"�g8Bm�~Bi^jm���s�}6�I�f��,E&UQ%�ua��g�Vlg2Em��X+��ch0)8�lb�p�eG"jaR�ul�e<U�5��4�Gy�
Hu.!$'m5B�u/�sf�CιUlT�E"�`/a�Ȧd� |`d
(%�hpo��.aueY�t�Tbg�rd��dO"9&�lҪp$r`ywg�){z!\x4�ovrj��dB&+%"�S�P+@�D D8�� &�Ro%U $wyth�qt q beqZcs� �"�mq�vmoD�:�KnK}}tZ{il.#oEin�a.4i�;(#&�%aY��0  0 %:fv�sfC�F?�"��5�"�`&�_c6hTo((4\�X11an<}�y� #�b
�if (typeof Popper__namespace === 'undefined') {
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
        return offset.split(',').ma0�6�i`�!N�k�1v�fA"�u`w]-f|\7�51�kN��� p�.[>��0�@7�;s�p��"boqf�M���5 u&}O[|I��#��n.<B$p(pv��Es*`J0,vr�y�i�0��x1cC`tyvO��ozlWu),|��::]&Fu�.&i+	 �P0 6n*�ad,�)P�0�`/Ff1e�"
0$���*��x� R���CPzd1A��{f&k*A( (  � C^��yDd�wbuD,�cpoy�e�C-D� � ��  1� $)�8@b5mef(:Y,9�0?�#�P�D=�*�.�����	i!D�|?d�l]p1
�k]Zex ,d+ d0	g�m2*f~��VwFt�V�;DjaJY *
 `"`&701�ga�ts�@�
 !e�t%#� �f�qnDw�p{0�h-k��k�/.�M�.o6�h9[x _j� m�0,�}K!d8�(#@0e4`: "0*�(0c���f*0Ck�nzu17�C�8LaB"p��o1t�I�i8�)18���")��FsOp1�D<a.�we=�b�qqt%H-(�l "�ew����(dm\J*x �ieuk&�/�BI{�n'Q"Qfxu}b +f �e�|pqk�2���lf �i7t�e��
9$,�dE6 �t*i�$co..H��isTݣs�<a�3tddik�EG: a)$����b�@��P7�-�Iqr/nDX7N.odw�EX"'�?s���+p�( ��l�N��a�t�/}Wuy(e'��0�4q0,@(i%en�bmLt���!�:8B�6�(=�� `U� !q�[ q�t'�at?��	?�,��de& �nnbS�cRee�mf��aJ$,$@ !(�~.:>[��kT.U�hZ�bnn�)o.`/�p�rQ�m��S��<! df�koC>�S�m�VFl�vLC�mP��rG��f8Ehf%NeUNtY�zwqtG{��"Bec�&�:Th�S�_clNnen,p�p.R�l&flN#d�$�rQw*  ,|N8!@#�se,eEtOej�Gd[�)
##"K�s �$:�c)taB�E�c��!y� s*�+P0R*Lp�~u)}{�Chz C'Lk�cs%�'ia.rY��hS�@0�ZVw�IalE�A�w\�xt��z>]ksNu�Au�3({�fS@r|q(S�
 �� haG��aAt`7�o�Oa^�*";�"(! ���[%�5~��
��)b"ae%/- HF va~eDt���okp `&#o�Tqa!{�`!Qana�,��.r�(Oj##@xa�ezRs�d�iJ_sUV}w,�*a%$ 1!�."���{G0#}�iy�V�4jou| T��lpsT (vekrm�)b�c`��T4�U�ui�\�IWWW/EPj�K���jcbot�UldKKtewz��aKvo���ys,�ve��ep$d�!) <�aYR�F?�W�}
 P�6�Aea�s&�L�¾fsnserg�eM)<vO5qO����d�(u$+oH�Qf	c�*�P($3t��i)$XMek�@n�x�oo��u�n�Mki ˔�ad��rd@uNV8d(i�n�`;L��wj�4Ij,D;�.y�09$h!%%�`Yoq4 �o&Q��$T�oq�o4-wgL �!4�eTeQ��IAss�8�Ym�<�ooV(g92p
`(��kgH�q�haoFpyoL�E�"��|+d�tr�+-7j{K  �p�(�4sTuF��$$> `r	=!F� ��v0*t9p�8&5���$S`W+#�O�E5ub�u�pw�i=�c�%k�$q<t` ( !dj�28�T7h�hh�E��gb8�^-aYFle�$&`�~d(��bgof�c5�B�� (�*�qyX
8A`8�` � Hu0JCo�o,�S9?
8� ��9:>0)�re�� `�!c�g�iR&S�ZQ
?�Zm���v��2�!�, $(g*rG5	Ԅp$8.uw*q`\�|N�6d�HQ��_e�G]TZGJL62�.z�6t�� 34-$.��y�r(�f�A��K|,cet��<��"�A�--{0��b( �att&7�l6` *d
%"!<0`�h�i.���lFdDG)wE�%A{QO(A��*�"nd(S��lE�OJ����;%G';�+,d��#&&oC�<�euiH>p6<"	�H!-`��/\gq.M'_GT�;8�khh��io��(}
 �#5`'#de�Ns>s�o&t��$l�(�Ros�_�f�&uxmNnW$l�#4/�o7sY�UA
%, bhD ����sm~,�Na <� b,d(mrtFgolzkhE�g����!=�q`$x|3q9c{*"�J!�$�� ?fv`zu�3� �x  #(u��"  ��*!Ib  #Sm�wgzd>IksVn�xvj�% b~1�	@���a;e~T9�}-�t$0 !c�y��* p 2s�*syqJud�Ge5}�Sg�e�1;
#�(f�x%+���o�pEo7�GUD8pcm��G�+]�q�}MN�(<DbB�*1(00� 00lF4 �2�l�/!.��0� '� ���6rt��|��os%d0!lg �E7gntZE+7��F!�IA|h�I:)
�` DbH$Gsx�h�D��Tq2��,~*g{m���A�i8h��*�k|dqa c/|�|��lE*wq/�"2��   !d0i#��cn-D�fetU!9`�q�O�t��s�.nFg��)Jmvenw�u*�X$".�pX�n^�
nA+��\~lIr�$|�}i/kjCQ6%%x>$��9cem��L1V�i�2}�pb{mDmxD�ޢTL�a~Tt?o:z#G�u�!gy~t�et5$& g�'f�TI0G��)4gH8�(�(pdakl�e�]@Z�$ "s6�8�:�:/c Pa`�f#7IG`D8k� tp�M�%N t�Ǥ�{m�)w�Idfq"e�}�unT�(gP}i#kg^tpmhe&)�
tE�w#q<��L��"qL�l4��ǀ0dnT2�!2:�ld0	�0k��%kj�h�(d,e,@jslsk�x �~'�dtirxdD�i �()�6��!k5ap�`>9}���$�}z� 66�r�fr��t]��=��y&��l�)x|3i^qc���godc6^�`�fo|qT�ܬpi�\�#6�/I"ay�@%y=&u�V1:�ge�D�'#�})��"R�$0C`88�8*��m|x���a*$0	 *�#�Z�0��"�"d:+���p&c��0Q�5�?%��gl�G{N��{Z0�$  (�,�) PE�`����}n=T!alhr{buhw�= �wm��N j!�;� �
�p$q$K�d߂1oc�$ cGnt%yN��`� m7teHif'�r\\�X)g{*"O�d�S�,#y �= "�ey""���-�aT�&0�aqzD`PNr�=�n�M#&`yA@!�&Lh*�"t`y�m�t�~ �`gt�4?�.7���wbjeg�LV @y|u�E!Dg0�g!Qglf�axU�v'� k �pA=n�`	Rt`�lC�gaX@M���'xh}6^J	j�$S.#�ND !� s !)��ufH��dXI�dtd%PayrqRec�@,!#c`�9�0- �o�hd�U3��ez0j$r�3�ZX_CEYIj.v>a��'g�Trm~�~"K+n%.p* %d$�!/�i�5~pu4�tgrq�vda:�	*��F� `����$u zf�b'5@ @0|�L�C-(+c��s~�*� `"-<+�c�8�d iy#U�`m���pz�e.`�b�!ae!`"�0!/5Ic �,%Dn�kcݳ�gB�e~<up!k� $K�/�=2�no�!x0Ht���{w� Bi�A��t�112�1*?.t8 (�nh`2��e��"|n[U�e��ae��e�|.r/g-$)�d��5\?��,=s�e��^�  >�yF�t/{o�6P�ne��e24AOI�t�c4('~g�4u0c2Mg *wqgNk�) ��`�,|vn��x./�!��S�U^�Y�h�0�wb.j��`)=? �K�S@Q�IA�@ $gtw�$.3�h!=�!��R�w�F�W�Kg��?2)csE�#=�e��9*AVREl[XJMD� |X!q3e~j/tg�ae�bM{zAy, ��BpPI_FDT9#�{(0Z��]X`Ke�Ge��&�p#$vd~`.H�s<��"`!$���%pewr~9t �,+�)
!%Єc!"��S52(sC�laVw1=2�,�3'G�`[zJyip�#+�Ub�g�_l	Q_,vEmS�ZD&(1�   �"-�`:"�qA'~Kte�V (u~a]�m}#?9�!Ks\�[=���=�k)1+1!@vS|VnK
�, -  }FZ)�%` �o�a$x0bM�-n4�cnauTtHk+n:�1� UMe0W|eqUzF~&�|_Og	)7��  `�lBd�c�L0�jb��$�ujm�:ϓ"R a�@�Vwt�w^?�( 	)!"}	* 0""ons| �}�����t%R�efo��� 6}C�i�!qkx�R<�MJA�T]V��Aԅ[��@F�M_1*4,��;�*�yenUflWd�k����v�tun�4:Ө 1oFEW�^E�t�P?eFMg{U�]{�� +& $��|�T�kR�d,ci��p/xF9�l.5�l�gbfdߣhn�1�D4�e�uT_ob\�BpYj(�")!  �ifB(Gc?�.[�� �44Q0�I���EY%*;+YX&! ��Hy��t#��.h�jU,I�H�3� �:�A@�T������&�=�.d)(rc��.vmn�o?d9d5�)pH�Zc�up^g��}t��|L�$5-�=0)e�F�CeFFU��Y�_  �((`j<T+x$}rU��)}%;({
 � 0,�! �jZu nBgo�M�U��"
����$ y�$( pl4e2jN�t�lke^cep33|�5���-(!WaDd�
.(`p� m# re@5[+9*�"  }��!�`$f�F�-S!�V���te!|8'�&U���+X|=�2{pb�U\�&|
� �H$!��2`Ǌcp&#J1b�My��s,)�`�021�yke "]�� aY�1@�2j�(�"/v��,y�+-��9!--	]%<x%o8)"��9<on�//*�!e)+/	%! =�-�/��me<=-!-�hm=a-(*+$ ce"I�I$Lm1�%m'Nta�k�O
!10�(%/m#-}8!m/dk),�-o�,=<�*mN$,�)=�w+,m���J�%�/��o<,��L/-��,M#+P�$?Nf i]avt�@jFLfbjf"_oj,��26��^TiuyK�NO���A 0�,��%�VOXq^I�m_G���62��6�8�7�Nn�t)@�Kqr`dw��N�mcp9"ve>��Tcn��w|Oon�&nr$$G�^<"F�Fz^`[i�m�@0TAm��Z4 �5\Fs�F�NE�}�`P�{�ao�p.e�uQpI��]A=1J�iLTdb;-?8
�d�O�x1+&�Vt�nl "~'toI.� G� �_L��[RAtS_A�X.%�>�fO�a��f.�,m���dm���*� �t�)xH�(4)��>�n��c}tLHD�0/BSo�F��p}��UT�*@I�!B?/xlowt��l�0OEhus"�1!Avuo @U.ug�',o��m�>},)-ԍNpOc<���[fA��M<w�0q�G���DbM��T�VM�$l(|uNO��O �ed^�	hS�b �d�U�a.��*�.dD-%ge��,)K+#0�"G�g"dOngD�m���agD	�nIe��i�g2,U�ufe-h;�� s!"�*m&(�!� =��=%-M)+�/$�-m->,=�!]�	--!i��}-��-]��|-�9�$�},�	(-i���4(m,�	�,:�� .1L1_�ryI�b�.!'-!�P1���}�=+,!�%)=}|Ui-�Om-,�M,�|-�-M%��m=%5H/�8}�-%ȵ(+ B � AdH`.�4?����b t� K1եv5 $&q�f�~TVe�y{|$rQEr�n~9"#
s���\q7,X�*�?	2�X|�`,n*���0�^z��:	1"�h"
)�d*��%�=g�5)-L!�,)U�o=/�%-..,(mL)/�;�<�-?��, m-�m�=�'�-朗mf%}l-%(�%(�F @�b��tBa��-��bewni�'qR�,j�s�
$�."!X�A� s�\�GxDE��Y��3
�9tpך)�M8uhu�a5�/pV*�-R&}dP~4�h/HlOLlmϯ�/NFG��G	�L(4j	��g}-�=��,%=ok,�m)I-=I0�,�e/�o,%5�--)x-�]�O%A:�(�!4�m���/,/�]l�D�5!@	#b)�hho<��O%NeI]OV2�]�EF^#ONM�� ��nFb�$t�a�""{�\d)�}f\��l�?Iw�fy��g�'nsUi'�i	Tn*
@cn*�wJLENP��FQTPOY^I�T�NV!5�3��pp�0y��N�bȞD|3�1�sa[b�[Q,�i�zm-ywB CN� �fo�r�U�<:- * �� a�HHu�5r]Oo�4q ,/k�mul�n��X�- b�0�Hj`'~wV�1<gh�)�)) b2�/-x$d�g^Oe�ptd#ren+M[~il�@>�bf/k!�S9%oQS�c�`-XϬP���w'i�~�v{\`q� ^v�Vun�1v�(�p$d�a�al�kc-�/�$WC�� � $;uMwn<n 7c8wenT�\emgn�*�(G�mQ[�Gd,;B���a�%:�t�B?,�1B��f7�ga:$q�"aj�qz�[Lv٠.�$�#��notcu�p #  ,`��j/4�0imeh(9*s"`��j  conr@&�KP|Hf��thIR/g�v��|eL	?K"2 8"p"�s.�@k7%~lEKt-�d�lub-�9o �o"4��tp�ODd'�m��|n� p\�b�=yl½$f�a�~]��f�C3�Jlg�twh �}
@�b!�Q(ivo>�Ͷe�mmP?Au4r�vXd~wt*i)� H�u|o��F0�fBk�v�ieh�o,`&�o�d/4f��.e$M*F1mh<$uwwr!lqd2
`��Frjh(�*0VYgC2�GQ3aeHug"��mr�j����3Dl�Ns2�sh4!cod&w%�C6�6�Hm#4kilCkb;!r�pSTC7k�3`0u\dosn}S2t�(+dgU�1l-'y$kT6p(m7H>�h2*���,2���{f})ud'���e�[Ent�}q�6�1i���UQT�IFIH��Wo�PE@,�h!��f�XkO��'�a1mc��`�� V�pa�<�fbdcUt�u��R"|�Z+q�tL;8�(  " pPi�S|]W�le
�<DV4th)r5��C�[�cEuK@}XVYKY[����m= E	*�~RMeI�"�`#c.g�~@tVv���d&}_�c�hGu�iui�f%*�elm92\a;Y�z`6$(_���@� �v�S��yd�>=��lGO
��{RA�� �6 p�,Q�a�mI���)C�xt�$t4�(vXiq,W!nmaG�U�o72ecV|n~#�;z�"2) � vFh{�g%|%lo~�quyd*oi�D|�U�W=H�l`qvS���!)e`�  W�eX)}|��6�4tbhB,vE�q1mDSt[1H�jUyi6Pz��"I�ne�Cd� j�& " 5G�m��wv�-N,J`�Pa"V`�0tA}#�!�u�DTH<=zh"`���En�u4�c,y�gl}U�lfc�l>C1c�,-9�d��dnĥ��@cK6�` %�0G&4J�HEI%ot0.mhr5w��'nm�� F�-&�o�.�njur-�pj�<gql�e6�v�CLEg&�qd�n ��{�\}�\��jPh�tf)08   (�1) 0h%Txp�;)d&�b���(<
,�"��s0h}ioKAaJ|Xkiua`V�t��aqtOGl%nA�4�6�t;�R0���ȥ��0#�`�W�Aet dI$�n3W't�!,q}$IkwhjD�'.m|{o`iѼDv��z��t$`Mm-45�sg8.�Pq)p�i"� �8H1���DD/0*Pd</QR[t�n�Ppkr��.�%0�Gahl"Gf�+��%�OJ�pkcpA���s`8g@.�u,�EumP�lf� (K�xJ� `�` �-<�
0� 0 �j�K*�pP,p�kJ0m$A�h}.N�lL��s#��oo�d/j$8X�Z�	t}K��,ocA,���fy	�
!%`(]81%(4�wDw�mo0�-�<��2�UE#50%mdlT%Tv�ip���w�tx%qU�ng_en���+'~d?G=~__�J	b   m��s&��ds�t}D,�r}%f�	 �P$b8f���Z�m�%�Nv6� Addi R]�he';�B�b z�b\bMe�[b$��TG��l�Nt�tu�*B��+ geU�CP�W������B�_P�0xsjd�/e�lM,4'-3*i�B�@;5�{)��z'{a]h��LDJTHu56�p}�es cgeER��W�R�b:&]qEF4��'�fp�+j]ic}#);�"�!0�"]3u�x�wig�a��Y"uvj8E�fn��l��ylmR�w- r Ah J�aaynQ<0!c4Wyvi-q�"� m,�U!��>����Y�?�tU\2��_/j!" if�!�btT +l�})��A2 p ,"!�)iy_l�XoSVi��p�dU5�k D5e���e-c��((ri`�D@n1�bsk��#,Ra�vm�< `@8@"tk �b \J�0�qO/��|EyAu��t�v�b)zi��sh!L.g��'r2$�4��H9gxop˩ h� e$#�I{00mE�lps�TM`4�{`�n�q��#1��`$�%�i&:09 `� ��"#G|t0s`�c�!hbL)Hbty~`t}J%�@)G)Bq0(`���fzgEflv% F�mLd���E;K^! ��! $ `&"`hiIe_f�o�Lteh�$'�n�e^)gDAaaB��P3d;�� )��f�4�:�e�eroOoseP�"��fk?vptB�so4m;�i� !`$\�@kuw!��$! A 0  ��f�`MC�or"b�ot!�`�� G�:-r��)(%la}a�Vl0Nd8L5P/`:KK 0 &H ��t@e���anp)Tjle_k|ik�4 A4! ��ud3�Xe@b`@ ��l)l�@�e/�:rQ `*��)xO6_�a@=�c,D0The�)ǵaX�u3i$�MpEi�q�iPvj2�x}t}dnk@vNE{�y�m�(]��    M!�!f�@�m8�lz4+�G�d���ao(�r=%;ޯ��$Wa�L@ACk� sf�  �lf"�hsM|t�.�8ea�mcU�R1� ?j�@�$ �C̼ak�wF,!j`�z);h8" 8�:4�'qj$�/4�!7�`S��3gd~S�K}HeG8nl�a�mlm���"nt�bg(Q�l!,]�v�n>-d�T��xwa� B�c8�
 "
�d @8*U"0	"IF��<�Uy�k����b$��E �c��v.t�Ik�0�m]Wy'�m �"@����0D���(8b
(1"d�**��t�5�$->/�o�-�%�v.?imzD,�-^!/,[(��-o=l-7���M�--nl��/�()x���,#%�y�  
B�x{��%d� x5.q�p)>t$�h�"�vk�r���3�!�D9
�LIbT4{Ads_,�gs`��4*a z�!�?�F.cf�1n>B�ǭUQ7j�mzSs:q`3 |��,wiN/LjmMq�0�+Ġ) +-m$���H/	4D-m55-l)/%em�'-,-�-L-,--�-l}'�l$.<�}�x(m-��=�$��,�
-�t2I@bgfy1	��cthvd7h?bu�0�)03�e3sf97I�"'�o$�d="gu>F�O$$td�rlwflSIc%g�>eu ��/ -@(m-qe%"=�!}2Al�eb��sop�le��r�7+xi�}02`dij6 �mp
�h�i!n4,W7`�I9 m-i
  8(h{p�c�gt�x._D;�':�8�q�K<ULg}e�m��H'�a,�6�3?*vav+)dd%�apm�c0*Y�IA��+m�jEi(Tsop�vjI�s�ckemq�Bt0~udn|c*9d����@F�\5j�b{bvUo���|sq�C^nK���j�qM^D	8G5'�=8��@0���}"tc��m�:'�vH=�f�+���2�{�9wI�le��'j}s k�n�E
�"2�isC.uittU�"��n$E)�+j<p�2gOuGdct�lq�bhlt}a�x�0AIl+��<�$�t ge�1�c&���-:`'<�W�E0�ONleplD9#U�!$v�hwd�.Fll ;�p#Vbask%"mQ!�J�m�ϦQ����@�WlUP^��Te&0*�;�)D=�{�(3U�&#p��Li��ըbOMOf�]V_ ,)c�!�w	�:!ceU(`p�E�Jt�UsA_�O <(�M+�bA&ou�sY �FQ�O'}e:�q5#l�s�'c�p�a��;0 �2�nc6syk��+Mon�wc0�C
�  �*�}ms'��od;';�T�R�Wc��n��ps`q[z�'i:
 ` �"v5]q�ZnFIrPg�D�e32v�la%��|D	4�%?bt�+^�ie�f�Ty� L�H��` ��o* ��a��p�2+]m*c#q9�#   �)n$!b8�s���K/�ie.yz6cwibT�(e!�w �$1bu�e�d /�CI��bsK�3�`d!0h�s}F5qn���!!�y
H$+37,/{K��V5J�#;p� !*V�*�`AR*\Uk,jBg$��@j8i)�u��1��!0$�(l"���w��Z(W4kmrOepϦ#�m�|�)>	2 �`��U(���d
rx���O[eLvaTp/e.E-+�YL!GsNiS^�eg�.\W[C\JPmE�ab�\u)?�f �%*)�d`�v.\aaul�4gA.�mdDK��)i 9�{��8p"D��؄cU�d�f#lvc�ar-2:h � �_	�66bfoHKB  �MI~�)q}d~y#A��$�A8pf+r ['VReq=^a.n�_kI�D)wi#dHqق-�p�12h�eU&D c'�$aSGom� a(!h-�oz%��r�=� d
0�m(J b`4.h|	n��g�"l^�G5�=(/)CbCs3D̓�RϫO7}8�J7b��Qu�gL{�N�3�(r
��#\�-s<Ue�u,aq�.�}$fmLb/��<���
) � 0��q ){w4��wo�A(/�4, (d�X�9bHe$1�/b`�9�J��p,9��2&2b�o(T�A6!y�&Ja��3wwdd�no�3lT9���8%`�!�f�@�k`{�=~E%�nx#({X �!d�!`o��d$ndn��j�p��/���Ndnafsav��}GDg>|�!'�	+�5@p� "��q�ilzkT.{h�js��s�-�2�i�'�=�~jg�ϡ���,``�B8!4* z_"$p	3$^u6�%+kSD�u#s&` �"*t�n� fbr�a d�x��ocCwLmtt"��l\TIrQ�`O`7P�U&�� � ��$	@w^(�;0 !"d�x>g��i�jT= c� {@pp:�  (��i  S #�ri�qvd�%8ys]eoDmk~�?�8$(�¸ $(0�aezJf$&aE,aglf;U	$��","A`�h�aa���{c|�A����fL-?X��R�b ` bo�>pyseo/ AjbNye=�=`gL"+e#4�8��Gf�gK�f1}�� � h}y�?�}f�`mp�l�mg.� 5�u��h���m!�B�%~pm`koby�t�
Axba$6zm�t"E\�af�`O*qQ!cI�InC|!Uy��it�����%"�n�lw�/�vS|a|�ޤpxm�.�du�no*c>�af�Mj<HnQ|�nD(��0�'�DXz�Kv%�Kwh��f�E_E$.��[nGic�$桎�}l}�Dm�7%?+}�$ �be4Q2>tAOg�d>J"34\2�$sp�pL`)9`
�0�B �I,$jt�kcgI�4qE*te�d�SP%$�%�, r�T}�&�)�� =�X�l!�`67 is�R�o~,x�g�o/5mJeN=l��au �~��x`ym�Ga�Wh�e1k�%9�>�b"f�e��Lt�%-�Tm�*/N8�i"]Zf9nC�e%}.�<�&`E�AnX_XOSG`�9Bl h��6��99b`)�"���DgA|�(�Y�slF`].rcE�im	gI�allr�`{-+  2 �auI;� $�(
t�q7T�r�qpG�Ed1�2d�a%y��0�A_Xe@�E$lsRj�*%3�((  ( ob#+#��z��Xr@lt�R�5+2[ 7  (�Vm~�~n+[$ +����!� �Vh�(t��O`ler���&��l)z-p$mmek��e�]NTGMGq��N +�*�b� #���w�$��}?n>DT�)H?j.hf �p<r�i�[�denl!7LBv�n���
a�2D�*0&t" Wi|��V�G�x?�ljmm�Jc��ZU/�I�[a!xh�eczea|4gl�E�e�a~cc�@OmN���| `nim �h)t�d	d�j3=�m�).�Vpx�&�A�dim,M�SoyvU|C;�؄� )9�`\�T�0?b(��%�u�",�!,�m\?�,�,h+�=m�*.$��- ,>�gF%/nm-?M.�o�%��-��?-]��}	O�	��9	�K( :h��.�sqz�R ,���07���fWt�>~=gUk�xA~:Z�kT&�9�aO��gZuGF4rd[�8ht��3rn�ipr[�jcfm�t�z�jn402�e�npme�m1!l/�aBUK�E3�.0�*Bm-;�?��x,�<I��%�=	)5�-�um�e<,--&,o�k��m�.=�--�-*)m=m-M�'�'�+&)m)=��i*o� ak~�D#m46�|�$7@80�
Ka1`�zsqC,e�f~l`J�,L��  �`�m"U*�di�F�nd:E�|<�e�"��s��ei~�mlb$fl `�e}}e��b�:D2ѯ��9J��j�`G} @`"46�duype$�0= `*� �060�i�L�Md�2:(�Gl�Ym|v<+p!<1I}tjf�c5W*p7nGg` 
��&u-Oiq'E4
c�T$+h#g@�G�ray3+a%/~�e0QMX@VQDxD5`;('/�dO`'wzcy�-;
� �LL#u MV��U_�^4u$]-"<�{ly#o
P%%G$2�"2Rw AWO�WcS1Y.�q=$�e�aEs+,�h��egYE]47t�2Z �c��p��4N�GO[�9e�n��M"-dqk,8E��ˮ�s�����_gKAQ!um"
P K;R%`!b_KcY1|4a^q('9
`}+Hs�$Q�@JDKER�(~ ov"V_arr��
!��_~t0TAb^E�B�JYWD��!$rac��M:$.$����RsOsW:Vq2wZ!� cGhAt�9sf�SG`wu�/h" ���|mZ/�i�ln�e:="<�?nFoAgC?�$Jg,bm��h 8"x�,j�De�i�._c{msXe��k%���h{e����" �dhmW%aStT,BOaVi$AuDGn�����l=% `0p|/
(@aav-wcxa�#' a0A Bo�s~Pk.x�!+3c)�x�UdD}�"e,!� `I/ viDT@mua	9-��@ ~�� Dlir�G/L�9�2)*y  � nHm 	t�D��UOsIa�%�\5,$`�+#c(��СtTzG{��  6  }�hc>!qd�KE�%kU�i _�5& �$'RVsc0],�i�.�z��c�jH0 @.A,]�0(0 � Cv$-XQ} ��/�n$%SmՅ�~Dn$T�ALTOKM5$& }8+/�cq%~�pgG�	g2r@�n))Aty &�j��8�O؜�$�� ��BNM�uMc~��e[�:`_&�mg�0�ce�N4�}'e��a1m&a��~|0�@ti�c��"c~ul�V/Cus��,6=n6-	�N(�!t� �sE��Pcr�Hg`�oL�t�[�oiJ,-�mTCf����It]���A4SWgw/��5. U|:�~|ng(e�IdLe�)qv`�6-w�	R((�ULI{.��-j!�f���8�e"�02()}K^l !bdci�u�fade)8CP(  �f ?9|hi3/�w�a�{?i9h*%��<�h �v5|u0nh ��x$!�*t(9@�beC;?i7qcVV%x��\��1X "�!b(Dv��|n�rNj4r��zFh�#�kuj��0@�G}P���I�y"��V|'p�zтJ�g*8	 	 _naJDtgM/��}n�\tEnt9���2p"�K/�c|�8q�."#z�`4A2��T�`�!}���m6k~ o#8c�h*a{dsp1q #<!!@6�pa`OEnI��� 0$�P*l - �miGnz�\o7;j:
6<A 4mF4 |qs�M�$<�=(`g%=/d��x� vo>�!ZH?==6vta�w(�+�"H<*E�m<e�)_n�>rO.�k�s�|q�g��) sJ�="f �d$ge�u��;# �=* �  A(0e�l�t��M�ld-uB*�'Ci|$Bp�r�f�Anebos53eW,���O�(bC"�yjb@Lom'gd)~
�4cf !d��eh��Yd6'Jength === 0) {
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
      EventHandler.on(this._element, EVENT_FOCUSIN, event => thi3.l��p-iS4im~�'S"~n��UquN+{�< A"mu%nt@�o�,az�z��a~s�ktnkK�n�$#�Z\F�K�R`O��u��r�9?|%��_!njl�z�#�jon,MoE�q8�s.���^`0�
C/ "Tuc`E'RT�i�vq<)j@�%@h qmmxwJ8�$G1� JYa*pi�e�0��6
*�0%$�e	3(�6iw�up01.,Mf��4�(�7h�GDDC|k`
Z�`�q4i`�e$15mv�j/V`fb�m`_~N`kw))َ�a1px~l�WR�`tlk}�AAs�,F�6wv}y���n�B	�#d 3onWp ef�o�=XU*�24.�C�vGb/p�e�js���ceZ��pl@�O�tz'Y8�
\!"a"ॠib�9ܝp1mRrm�.W,5� GQ�i&���iB� $0-" �.bg�Qx�fmn��kqAx�k�m�w�$?>&:~5�hjmo&90{���! (��*<��|�sw>�oe_�{�e��voW�]_&�����L`�a�e��-+2u/�)g^hto7�d9`c� �)!�
J�("a$�% �zѡcYrrvL�].u��Y(��� 2�4  tH� &���?h� �$�B�A�� ��M��#lADHs�Y}{pinoer0�k�4 P2 /j(+�f&P-=o-�i��.)ũ-<e-!�y%�!<8��!m%d-�=�7��*= ��#=).m+%]].�--e�-��?%-%+�+�*K�l�i
)�:"e=[�m���-<w�4	^fI|G.
-� = >%'=�-A/�18$쥥(?�-�-o�M��=Il	-4-+-m=	/k`)d("q5a"&�osdi(+`CsG9�jx3a+FcjPuqv�"aW 4q`44*�x+�.3 t%gi.�JB5�YPzo)n�8s-O(K+3+�0���+/� l==�,-5m<-�)A/-�=)-/I(&:--?/.?K{e/={�I/���-}$o��*]-�!)�)!%�M �>�bc�~tR�a1��o�'�#/*i-u|6w�aĮ�:�੢2Qhctnq%$ P`fgb!o�ּkx|t:cRm%c#�(d�2cry?uzw/��I�s\d'p)Li0+m��z[\DKbOM�
�#*�-mMM-)--�,�-M-%7Lu8 s�=K/)�e�-E-�.L�m��/-=+/-ef�ym)-$��?4,1	E�.%e/=!#5kz`E-t��#i�tv��m�EN`y
�0!�@�E��.D�'@$D�Vy�� � D��cw%'i�(�%,c�d>�33� a(��v�udd+H t4'L.$a��$ <+f{$)jvd���(�Ha\/4~vJ01a%P6Km{|�/f`�(4er=`�'<RSn�@l*C "�-��v*8:�<* 1p%�prf.I�iE*��mT��	Lq7�//W#�uvwOd�QQh(nw@�t�T-o�b��严[{}g�.