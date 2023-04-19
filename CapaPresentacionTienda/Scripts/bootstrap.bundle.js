/*!
  * Bootstrap v5.1.2 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bootstrap = factory());
})(this, (function () { 'use strict';

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

  const isElement$1 = obj => {
    if (!obj || typeof obj !== 'object') {
      return false;
    }

    if (typeof obj.jquery !== 'undefined') {
      obj = obj[0];
    }

    return typeof obj.nodeType !== 'undefined';
  };

  const getElement = obj => {
    if (isElement$1(obj)) {
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
      const valueType = value && isElement$1(value) ? 'element' : toType(value);

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
      }
    });
  };

  const isVisible = element => {
    if (!isElement$1(element) || element.getClientRects().length === 0) {
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
p@ujeOt`lah’d¢J4$m/-	.)İo-¡-/)i­e<,+)/.1/!=+>µ-!l=º?u¤)-!M'<né-	u­‰Ïí-mí=­n-l(!4€j(Bîltu‡îTwv6°ht­9i?+==­lnK,4-	!i)-®-«æ§%«\±/¯¯­-(©edíŒ-m$¥-Ïm)%/­­oEïµÍŠ ²¨LH`5#ëX`v!NMFfe/9°îmGh!Xsg…9
A ccÜ1|MUY^SÛAÈu12±#"oLë.lHjt7%
	 {ïgib GÚ‚¼ÕHEZ– Xrî¼úU7]ëeñä+~rkJ€gÉ~÷t`meQÈ^•±JI<<(i¥j	ö5a­Ási7/¢ Qî*±t(Fç$Cõwü:ı9q`+š!°æ~jMdsÙ `SUQ<B© ¨P6ÀHH{-j\F®¶ÀiyÒ0s.&qò1ÅıtãEØ|\EeL -aª¯2d, toclm9d§"/fl#kîL,¨:Ğazvo|{T; eîîz}-!,g~p©¿ªğ`LZh%!oîw”!!f@wWWÉ+fµu5¾!`{“q~cEÀ[ÃDWl¹Ià~Šğ,im/gøåGÅÎP_c`ÆÒfæ5`<bdn!offrÄö–gA#y9´:‚("oÊ~3V¤Hße‹TÈ)U†U ;©æitdg,svuæPûXUQ/yrû„åbcd2tdUGvT_a	&ÄuOæmR`nym&Mf¬(…Êtm„Y¯IW9é ò‚(ÀjiÆ÷Î7GeM~âŒO…b_$eSˆAH)¬$=)ddhYƒz§{DÃKÌ¿E],8·¤ñ¡rNoˆTHßOPK4?ux[‚¤$ÃO.'ôíCpEH_|ŞSn+Uo -$yo’;* èwOrt COSGÌ…EBÃknQpÀT½$gãF\YDyå%½(#DyNúõªh]sBSÊLMEŞGOhÌQPShW”//wm%ìğ³Xf'bZbË]îuF LIâ—ŞäMÍE LHÓRSE@"5)Oï(ázûedf3N8%cî>ós 1MKV_IL~	EU—b-GH-MJ²Ì¡=è;ó[jxoiîÍLYÙC„AYM^WmÌLÊs} ¬(?kÀQWÙ_SLMWA{HZÚWu¬²!$ã$s]6Gä3úM½ÙH^Ğ‰*OHTeTb=\nCn.MhhræÈani:{vBO)„?* rë>næfHVK¤Ï B£Ö f¼d'|‡ :g'~ĞtÈQMO\M#= '8Aìwa}a»+¡ågï`Û”3ËÚïêD_@2Df0%,3"ão<ô}PrEdyhfg"„cóù Kse®sto„@ØsaogcSÄ4koW$ÏdCTãdQtgıĞÏGC^U ƒ'$$bå9 Íãr„Tn#J%å¢g]}~%tsb]s"-¦/„*
,ãd!(c-­-£l|=®=¸q='Ÿ?9 EN…=-:lõõQ…=¯½|­.-mw	)mo©¬l$/_,iM),,­}-im,/¤a'	ï,Ê¤1(jPC`S3"Ö@di*,üboîo v`
!m-m…-e/$¯--_9---­<9-½m='¹m-,-ià`y-4--=K/-­`ğ}¬‰(h¥O,¯/},(-
2bp*§J‰BoláKû$IiÜ$%|±­(ky¸ônfr !ùeaemrglW¥õ£J¤a h¢Íû?]suK´or*åi#_egU¬$ï.æIfë!,ä0&¨`uÒYr;llelH2¾	
`„`58äNa±^±c\Î;©\i÷na¾s0=t&cn U»*(;@ xaøé³Ob-¯Fk÷.?€4io÷b_…gB/zöiF`f‡îb-Oay
¸hB$¨hÔ@ió]tkwçuArğ(]£-À\I)Rh!p j ãcjsf½Two{ìcFäz2´=€REÌ=Hìerzå(ŠÕ*cwl'ÎzG	U1O^EpLPe×4ÇOJÄ t+“B d°"¸'ânó	8l§deA#up>9`)t/ M ôâfÁdådp0l‚ëıjGrì„‘ë¬4 \íl+¨I`£/aJ*è(`„¬ä soì2Vå¨"å½°v}Eræm~İ3ôİã®?*á(È0¡!‚î+nµazåì!üï00˜#"§u“%$2fkòDòİMË-emuo\ è§Ïy»ê`£¤`)``C{Júä#Fi¬µ`M}DMæM°M‰AÀ¬Ä*x^2|ìÁ w!/fin8sAnf"|eTi>L*®äEb"æ?1bFU^dCá=&'£e.`Wh#i %¹?‚$€i³.^'lKi#lt)+ | )„K´íf ²WõnD#WOø¤º=£8Şõ«Ôz®à$ói.çúÉdc`qXt,lkóCiKª:(" ê €$`Ó«Jnkd~'kD'›8¼:ásdgcrşòº ê´Ê@"h*vkó>_,oµVEvCsñQp}s(lEÏ31*E2² *(à(9
´¤ *!<eŠF#8¤64»u­i3FW{àiìZalmôågxhn¬r?N(!~@$a9„@Mb*#tjÁb<ÿã5nF!'<P£s©&ı	qJc(/`$
Dmky~7a¥}Atñå!,ÁÇè_ãpûe¯C?ãŠgiÙÓ"k02IN¦¯t¡Òdá]h,lóU¹óTêï÷NH)9;†(h–¸Âj  80e¬9èp©fôa2[CNî,nA,t»ãó<l±l;© £; ’  }0Èño`{}ç¸a(…?
¥0 µ Ÿ
!"¨$÷z
zpFeTfw6u: ,øíòqkã¦á`°Nå§k~i~**¬ÛC°ãp $¨ZMüõ†o`Å¦"ao€…9[J $D dA7 `6ôsQi²6®Ñq`ÎáQE8I`'6d "ÃxDt·Rîa²aHDdç/Éa$Ó¦ß¨«­pÔr=(q*D" (ô^Cc Eªk1K`$h¦ ©agQèmx99.)äGníE>¸zb l $hPi¡~
!o@áh
J˜8*l h‰{kås­*y  ,a 8"wf,õhÛDg‘8+v*d"`0F}*ğ<% QH,:!(æwì uJ(*$ $G Ï]©Lxau%\!q”va®#ytï[ok&Pè`}8ió.JÙhS-N×$(İ"dúj`2¡ 8 "(R%üp~j9% ó8}
( 3„  Ü}¶&§éŞmã‘¹ YE+ˆœ' 4D/E4ÂctozpóDÃd9
ğ
!(""gj,tz(7ÿãËHéälÁóv!nü1(KŞÀ0¡ë´`c\1´cÉîG÷õï ‘áo4|Õ§½ïò•,GiNG,æõn, fÔOqL_D]UBE|ßÛJaJDŸ
¬9v` óson¦9M.``2Qş´y:
f îà0dÙ6i6er / Tr`ipûèvmL±}şìïV/`õ[GÏF^0OT	PeZ(„fh3;cOnCëb
`ErUvvl$a)\æ­ hdø#MpY.Re<h)üdy§nîifAdu'as dmamQ(;d.1zeAlfe(ht‰dsg¯(nfávv}$ÕáX8éfÖ(Šø*d#à$øb¹@a@(qo}ñÔ“¢{åpi)oar =SWnçûxMrDtç)§…*&i¢iÎLhfá·,Vs	ˆ‡'uvzkš
©0¤E£)"§aª˜yR)ôlq'4íFFöÁ8*{‚!U ä"&¨S'ç{hÙvãiñÅ#{lfk­q|A'-qby^­£>^Ig%~%m•*ìîfMgnFpªc=-"edw­-;`bR('â àcÎ	t{%£]å  t])|Sep[vş…Av=b/0Ş¯¸,ÉJN¾sÁ(Hz—|Eºqá(%Àm8 Û#YÂeŒ öeí#,$ªq¨l;‚Š!d!c%!°a'`¹ aÔ=VeÖLa|O!L'AÅ¸is½sÄ‘fq.U§÷^
%~(ÇQjGO
$¥."À2eÔì2*
 !$¤@Â} !$tpÀØš
"(,°ók.A\`s4`{EÅö#Nt#= ]%eJ6Iá~fL^ú*`JI'a'R	òLùñ>VåY-ÅflRö8EVLÔ[PO×%}:.$g@ mv,c7a6tÅİän{võE¶À6|~ PDrÿ\õÅ‰{k¤   h!vwqåvnO‚fxQP¥!\*,£	 BÈ c¢aôFQçorEe{d*Ue5íU+Púà¤mo,9   b$ À, y| <#ßbdà©ö%zAH== 3Eíqs5)Vå9 y® `´ " `2€Cw%àaÈ_A¦·}pzAroA`Ly~sta;aaÆüüäAËtiVA, ¸h i´$¦# ÷* FoWk\ôºàLã¥ê1  4ä} ©}ái(`.ç,9¹Êr$P1`¨  ¹h*à(,Œ
  `=æ(l!Ãrem÷`{Ídr¤}
°à  4`èb¨@!’lê`|éM,gMZÍF{VTl(CJVAßCTE4¼h:nÕJî	9‚° l¤iì`6÷Êôğx'x¤=(&®%’	0âhÌ~Ö4TméÆöoIv/eq"7êl[<Oà{GèfE®6ï.ˆK?‹` p d8{s.Í)UÌ7ÿõkìâ^‚È)—-rm-åRo,Ãø)FKz¬ÂyEüíNYäC$í_ -0(04ÜÊi&uoÔdì/@p6an2ósI¡3t&«m@*@^@SÏNHŒ?ÃE^ TÛà[/±zª
º"-  ¼XñndL¥uçn|jâÆihwêdC1*qo5{õ¤0ª
¦ ¡  ²vi	3oCÃ|hÙ²mçÉ/D’?lKIaãMdìHR1âq	kªZ^RÙ7ÑMÒAW21ù&Däâ7ô¨;8	  ‘  `tbgs/7arv2iOoTYc~h?767u<wa;/
%($b>bkoF3öue	p>es*†,È =$ek2<c p!&$tªi3N%dUb!Dõ{FAvmdg}Pn¡dòvsO*0p#( i"u2îKvÕ|kWa:p#hA;whm’_+sUo~ß%*KgY[R]\YEGŸKxCkïO"iiHV `"  Ô)õq2¿cjem~ltf/nmócŒà{T>slj)ÓUQrÓß^áeIM]ÁX[8,£ÅæDRC}jéMåÏ@ËU wAq~<"n&fd= u asn;ulgmm†p,ñPy\HZ$M,d÷Ég.~1'/+"  € ª ²t'ZLA wîé8V˜Ä¨U`}t Uèyvš|elÕ%~"<EØLOV~GÿO^N58¨"ÈòÂ \_
Nw  à%)fqt°£1pIæylkneeí$7ÿPiLïi¼ lKt¥kwé&n9HM/t)UPsb÷Gióâ’©9.(Ghi©n{‰kn-k­i#o` i/‹%:$1 be~HTˆ9WûöLcÈ"ÀBm!òãIöc:nş+` )pgpmzii¹<gnb!Oo}X:ş¡š }izC.wp÷%Tj1NlgaC(kîÿQluUå„ ppoG2eDE$D¯:" l"~=)[:A	õx¢Vtn[˜QMl-}•^vÃ^;gAùG;mìjSsoz^t5© œ[Uja~ilGoåow¿aãr8<5EZeŸ+qpdj àA0y
QrPA.iln¨ 3`( ¤, if!x~òYs*i^ôV@f"m\eÉ<mOæ*ŞLXë=h[ønß(Q[h/¬¹{°;n"y„¼D0Šq%VS/=[`8$¬% ! ,)hx  wÎóõ<Ö0
b8EvEşfd# Rå|3a.ÄXdøEsIed,x|ùK(.IqMG-çtR.@œUdnßı)ÄE4')=
“: âa©é"€€÷tavpÈfUæ•nDdf`u¬~ye›wnüjl PY* ¡Ñ!* ârg6rú1 Bh£ *yÚiv€d0co={v ©ycwIej µ 
8W3®G|ôÚDoíLs¡«f©vb®$ e ıh©c&oı=eL%`P&3¤˜(ÁRlI{…ïSimN053è{|«ht,ud@%^ez0&SaÔSZt~`(k^3qáf«BSEë¨a+dˆu¥¦ò-ë~İø9T9O8 @+$pP`%_ŞmÌè/.V`+e}emx²íŠ `5`t`÷.óèEie81~wtCwG­vt"d0F"CEZWÛPÕ\ÅSOLnACh£O)&a$ R Üblcjı}èõ©ct;k­cãŒÛòd'û~-oôcO)jQwÛGÀ5#iÎLáR_E¤…£L@S?^áŒŠ_SÜn@Tó(;4"/0 $ïWoau%tâûn@crV“ùMmnÏthV?"ìzq.“uHûær”`SÚ;øonf}|J"Ø!©  ©8md-$etai(<$03"o <4|rMfA=bAÒP!e¾'h2Hm«·*B` ,%0"ciSv T“éewiR*|ğUfR<~Vpíob7v¡dğ`Ğ1_;k$! ,  ¨áOŒ[uãgMOXå- 'g}üzÍåá$âÅ,cg)e®íf(DsiÖh3¦!H¸6b¤(!¡	7«(…Çeèdş®5hhu,PrTÊe8,¥,mm)v83` #$8¸0¤ &a´|/]‰´œÃVhiI~mEzLn-ys?bjÑ³ë©Á¼öágc%\L®Fk~v$)} +c(è¡}
u6h°!<8.Dğ8x"w`)S$÷xqï^ğúsilygêènç%œ"9bÔe-
(  ¾È~mL³¶pcOìdD%tE =1<.¤> Zˆ% `R Â‚ ¥È`Ç®[gôâ1jhdij~=Kg$¼¡oV1a;N'! `4 ƒtHyZ–_Hğ`K¥ke>iÁ!{ra5‡/æ=M×G¹gM•SJÌ¥,şé/Ü}T{yŞAq?‹_(r‚8` ñ"ğhtWDbMn'"pt‚"æÌéÒÒªaD`(3D™™_o j@qÀÇÔL@SEË;	e`(+0(1 ÅgÏªbDIJ€nG3ìRk#g§j(}S/_EFçLîñoFÆú‰†XA†hc¶e	:,á¥! ­l?ˆHï"È¤Tob¶_%,lo'kêãsxY|exta¼k*ãg_lO!w°µ'8Š«aäd<)ğ0êvOøtïù“Åuìr`¡9 Sî­~m,fjÔYio#%¨-\eOq,lZ%e+Úl +,@`h_xccêo 68unEfw:t£Qào{Q¬…åìAdm¼	 [1è %)?rn„}2êô `¥èyl|«h£7v3T.çw4BQbscnESWÎ‰ylK]ßÇ&'!<9a-$DFQfãDgLÚé8`!Hai5¡gOfé#9·ooig9ñy>(:4 !cG.wkÀ	·Œ³ î„e>$evo( 1 `!5(n«.I`HiH5Ekğ-r®'æTI5O@{VïCÖd'7"te+36_ITä¯ghW-Š  b( 0*/"Bí~â+d,1( N¬e:,t$"ãìöi!¥İo}=°}¥Šaîspï*@cÎfKU/Å<og$í©9 (/ o‡rÃÉ¹w0òhîoMvMuq>"¢ hè2g{ï&qouáHw?}=’bÍpC~%}Mb#ciìMiõ*Íö%|a(*-!9a$E”I¸!ÂXuaÊNòÏÔÌ|^@"a¤µvGonL*délu)drf}D4"92a£¡$!ä‚eö52f-Ik^cc…Zá¼)K>Iå02q-!”y]e*{	¯¼¦àû* )¦ƒäó&twZixta!3
ùìln-wVu),ñraËi³e$!n<|aNîóIÎÕs
?O]PÉ^O.iÒ(4ú`GYZJt;¡ÜEqgXDßK¨ ˜¤ípÈ`3ÚAî¯u	aaoze"yezd>wæ 	 k‰’¤ 'Z zd Š!~ha1
ö!_N:g5ğ bç eë!-Z`) 8 y&rhµQÊa;
" 4#êøj( &$×Ndaq##/hldÿ\nùfoDCk*v&¾®Ne2Äl|&(MÁz[_GEãåüExcr_KIeSMK(6u-xr?^cV}f@w*`evımN(±$À  àW÷lHk>v2eâ³ªJŒ®–ü(:ÍŒLQ"“—\@b=AKPngGC¨¢%T(I÷Ÿq?è/èï®ĞIUA®u	+Ît=)bh\H©Å-8  äHihlbdu(sú¬Ña¤[  meå¤kfOe#h
gM¥ou8`qt%û
  & €	h0oÆsñ)Óuítc}| ı "vM\dˆ*öC{U}µCMuîtË&¬åM åO8ø!#Ê¸ .`h¢àig¸)×ao<c/+à+ bÅ  43Ğ`~9)R.;JnæCrì`Kb†Î£¯t$4ó!uÃl~cÃ)WAÄT	Ç&üM,bejù{NÕAs2*O6¬ŒÃ­fı ğcT_«yŠ ds@¢ç† 0ˆó@!P+.*`  :ÿHFaí _$$HOz#IúgGoLm1SòäKlCqr ívÚoVáşÑ(¡aN"I¹ßìeH)"+J%   „/dA¬E4lVaòarğb]
HEko<fbÿ!€b¡t“ se=vi¿2!™¤2‡_Û©è:: !T"<æÍe@ÑæRÁiŠTrMã+N5f¥­!u[(yK ”0*z%µ)iw²¨)cE9\|$;Œ& bˆô   *Oe(@} Ãsiïl(rwÍîh,SHCRÖOFI?KO[OÌFCq}Ei#J   „!Á ğ¨eŠ÷lÀz>0!†´%¬€0W}7lEô1pRíKô.5dÄ)#ÍH_ÜOÇÉcWI»ZÉRWD"«¹	`Ä$¨:!°Dı4Xp¨@ b (åMA+¥Ä]ğ0hÂ#pp)pÓu-Gºt¡`Æg$,p.}.`Eè{ 1h¬¤=+7
"! }ª?/Tztc|LãF-À%¨›Tföc+WuGù;I:v-R.Aâ(c.f/%*#{Š6‰&"$²%xWÂ."\j»kåãkÂ ö7ŠcPÉ'.((8p"$6€ êã{sv!_Bu&2í?7°~©0*-`!5$¡,g~H9||Q-Hb á.ænqä½1wsıv9Cs å$ .Shwß|ihæˆÜ`£p
fwN~vé k"#¯0L¬äL!€YC*MBèFNünmcN…f=I³c ul;	`"¨ B¤¡ Yo;$±©j`ªc|4ÂT¢ùHC¡$cdeuó“cÎglô*Iòê ½%AŠñta~a¤œ|hë§& Ågok#ëU+)
î(0€" "à"gn4*Ö!ğ!Ker¦0(÷#85 §Ñ4s;fc/‰¡C
(+0¢ "À¬iJ`
t3rM¡ğjFuudCë|fi}[z¼=¤%õsde&Uja`¢ sZŠb¡8¤Èà0° ),õ(v^ebe§¦ğqğbËfò&’`æqidulLdbïéégd²¦p:G¬.2YVw  )(¤ *¡àa0$*}
* °  =  ` fOCtgYnF,piöÔ&j#", 1² 1,%  `0h?h¼!rihK
at_B4ˆ.ºÙ,£ 
4=<½-',­ç=à)i,(¬)­%--7¨>!¼m¡(-/	 $oI/®ï+O--m®©.x¡¤­´-5¬m­(:jj#Gb!ˆp'm©QÈdQAlucv­on‹(ŠĞ)4-!M-<-™d¬-ea,»]@/‰,)T‘­b-(e?·=­4å½?*--»©9=/-%--)·¬5=­$	(8(uª/=)Íli (-nŠ,Õvî}K#,0`e0-ÊnNägKtyõ­€öTQVÏIgKĞLADQ}AÍ¤<_EÜMCu£+NL_D&UÒhL-ô¬-ÆuÚ§48İn`/Uî`bv¬©s*0AliNéR"aàtLefa}èüpd<x²n/f"p¡:ctõÿUpa  7Bia`$â)¤±Èa4% áÆBz¢ì7d"qÎeæbÇcñ--/,I-ğà3"ìí ¥I&@eO´>0!$Av.R_áfğnvirwe~v]dgøc|%ˆ¹`ÿ@6(j¸&*ò/bÕndî%mApc@ÄiWïÕ ¦&ª~ql²/ççàx%ñ)óAïTtaÍa|k 4a(fbCïà?‰ e €"àmğ¥
$,PjgVeõäíæeõf}9hƒj"$5YÊÕ ¡#µl{5‘W~Åvtzòd9ãE]sdLÙçE¦VNSklÅlæİ'ÊTXwní9 j`h0­o3t"{/mçc4Md$Emu~uÂxÀ%NacäËz\j§ÌjE¦|)O¥sfà%cbEĞDh
!213SeÌE`Pc6…leLEïtÑ^oqÕãbImgç©¤ u ]ôO
è`,i0DOm`låâkM®áD`_pgöçBUuM|st¸s@I
UmõeOu,"ój0$#°H `¶~kgfe·)oákw“« ¤=¬/fG+æîb)©J) !½u7Š"n í 0-«‹'aÀ¸-1=­-¼)$)½x(.%jµõ-Mç=-'2Ïlh+eq¤-ã/z¯¬%ëM0m5h*d¨e,%=¥-'+u¿	ŒŠ  *8bQcDq÷X*%$	$%¬¼=0%š'*=µ<=³m=¥5-êm)-«-Å¯%m¬;%	‡Q8-¯m	ëg5™™-D-)--/-%¹!Ae)
.'ª"2ù8"=dìA.nNaXWd Ô)°psL7É±'fn]ãd$ËUue6{(mr#hîuó
l@2*h$-ÊJ pdléàkdQçc±>dÅIbxÉO(xå5Q1)ª*@p?bs*´krª½`¦tÏñ‡:‚! w!²8"uHso-¢4#n§bô/]'y$¡vr¡rhd9< $)%Ã°vLş&»´™we{$eO`-h¤øTgp5J)c6&vps=½- w
¥Q|4/Sb!Ê>`‚:¢ímxmiCuF>• <¢yo Çssh2?mˆ¤ÒHG(ü, mdEöWëLf±gIj>~vyFõ<àtèq | ;* hs`R¨ÿnËª6g!æ‡Dy*	pt{&B;{Lu‰jeôabi%5›0¦$÷2mìkÌeÎavcf=Z¯`f cÒ-a÷Tnr4 14#rfr}êF'·`r79s	XLQ¥2 ]0'1c|øg~#¹³Ôñ0$:aareï*d`44²<be„a|kwf:.U brvAR@ò©°äiiOBìAãıìïp;¿"*gû¾P>W_+—£a3E\Lık%M§~P±>Pgôôgå­$eJewæïf@¨c2g$€iüáÀE}}dp©Q3kˆ ,xum3yf6"`MuGkh*`¾ [ìáãEõÍJT ?C#ş"À+P÷ğaâ,ğlñ§¥­-¹|‰jB£m¢++!1>Ì—Â¿¨6µ„"S];Úa	~A2`PvQad'ìôZ9m ¯*'OÍÁCµWÛ*[¿¦góAÅ$9şàùmlyre'îVô,aK!5Tw]4’%l={ (zåßsüi/¥dkaàÁ(eph¢á!c /siÊS§ 9³btğ]tæBèág.3~ák?zX9,{;lÈ.|,,²ÄKcG,$F50ÎphÛa$+r O2ö)qÊuc!lu"¡‡=* /RèÄtœ'	a(}.*ÚMí;è£ Eo4h¦éE:SğXbô[N%ur*wï {WÉ¤ôH-2mD0E·áô0jeY_6ı²aah="FMdµzÏXlAD9kN’"vãv2RåA+buA¢kåf½B.~áV ae5ÄpTDÉU¢]‚&Aaâä"vOgA71*Oœl4:iqmg}*À`ß|ç.aEhy,&öàøX""Nÿ’%Íb` ¹/0e1e Špª·;h,¢* r#sê¨ciï"¸ ¢l%Qn«+¤ »ir,qvde÷\BM£¡´ % .å£ mMlæc#k,)iÛI¹fIaæ 7mdê$tèí¬p:ZfÁmrbk1äIvÅ´E PyÍâÕS­ 8o©²ör)påpknvé Ô<Rja-a7çbk(s4U5E(
‹0 Wğs-ndtlògWuïıe`,æ#x®på§tA0m-ˆ"VÓw&3*iT' >`Óp©xm6IÎ†$v â¨mJnEp^itåİ}'!G|7â·vkeÉ';*veV¤,÷aBke2ŞÈ)>Eêğ-*›bWlòi’U) -$÷ei"l"åöòp~qÆAe.%êedwscMaqF,¹Èaéëipifvågœ;f.8kål`rV¶‰ÈG%&ur¨t7,!í%e%rMâo|ouµà1nmlkõ(t®ú)ä`lHÀ'l5+l§looÎÔ-!aãÂ`ÚedärF=8*Eí,t ¬qlt!äV>nmdeşa^½ylš,cg©df¦OÃv¸Yè5Oa¯$J`îtL|‚…9FJè
ïq*Gôijheçåñrin`vvéîh>dp ;J°	C2<Vgæ5i5=¨o=üí-zä<( ±*ê34}t¨E#¨oîïr].h (`]Çt!1 `N@*7K`õ>Tš{vv)_'8((7=¢.×nb"d[=0WuhH;3]¯+"k
h)(¤dzÊ2,?{XvD#õéEêı;m$dle'ûnÃºdyqeéeo|2j¨Š8ªdşflE~oG.`üÇeb±/ådD$.©ïtîw*@onq=Nntgmuwíuexí·	n¼ Ton\OW!û’fcÇlctzh³"uCš  4¢r}´q2nşnÍL½º 2‘9zæšO?gqt}vf.yfm(}õbıvºm5=)°*6`dş¨ócOg:I,e-e>t GEUdPkâek?ww]{«Dngold<=+& r%Löşä?h6-$l¬ñôñÎf7æ \d.DdgMgLE|Ñ€l}e'äInssaëg¥n§ md€kg^rs*ı($å8æbg}íÊ A!@T}Femqm%:4èN/lÑ¹äÚL ¨v«b`O=$GCç9ÇË½< 6n WYnå®÷w~?Bç»:t]Tnqì%nt¾J" "et©½pğí&oÜlh=doxaşÁgkB0Y^{…ju	'¿|„pü­şîdá0%
swåæ#Yoh HxgÌå(dkao&2"<èJ"$ÿånctiMf 9÷8ab/T×uß nKL¸ó8gÄ–å/`g 03'hÅÒogixÃd/wS'me;@*2 
n,%ôypñ6?£(AÁkwVÏ+vB|ec9¾jngvI~FDŸ-hûJ¨ çàx¡²ätc|Vb\W$·‚@   íA.°D<	^áD²LûdH8ÕLX Â×åôwI®fg¨&OÄeh:{kA×[ÀCïL8
p8 9Òerw¢<L¯Õ*o"[fáîGu<&0­ínObïne,u-|l ~$Ãà¾I/l;#dgÌCxad/Jm|ô<!"™—"h ¿JaÎù$a¸x(hew x,!éHô=(p a
 PMÜEè¡Áeî`‚¦{ÛãN~;s18_pğíbäåj´ `BI$(£¦u¢ãvk.`if0MøS¼‘df»)_s+~‰!qÎ¢r£bSAC}á”p ?„ÚRÎr.sjAø,+™0¢8w“jågD¦ŒEyC9Ñt1v%j¡Mimlïr3dfkîG Cà8duÛa4dæÎ;•TmeéªjŠ:hÌ00 ~hRgqplD2}¬wvà¤×,CtYHírRNfyç]3L°Xnû4Èà¹  tu0¨qfmp,àdT{a}°•qÜE¨!ä$Skbt|~vo±İª~|q)**  D sa0àYLEaOx0<07uræelq-muOäsgm!Ù4 aúòO2!Ù÷ e@tka.afÀpöqu´Ch ekUí1Mpù	¡p ,âI!
phcHTD˜Œ,¥ÿeŒÜ(ÕĞL%ãlN'tl!ëävnguDKa]g;uHáiäjT(+·óZ!ff"â¿ revå@b9J*¤0 yd)”m&wpäKwî¨Webèkrq6üE*kØ^df.°t`àŸ1Á2ædg6 UicÖ42kV'o põù‰½ü
%k!1$¯4efbahMhFE#UQi Fz$A0ğIY#spQ¨Ï+ |©<jHEMÎU>5DEFrÚ´ 5¹(¾Ôd^~kvØapcÃK^hx`÷ÂihgÖ*Ú¤0"(!±NÎwo"@fI1s!kF*åìÇ-áht>st]n$l$u?Ql¬);Hp"$h0¨KRj5sôn{c?a(aN\vi%vÅMh-&^^Å¡öÙ9üÕvït!nbîga/å¹2;*² @)x€ RÁráyI$'a =Ğaåvòéøw$g0Wrdm`]ù¤
.¬Ìd! }AFf,påjue ={=ægd6u« {«cR h8,peogoeïu.2eEî·1Lwp(ãı4u0NàLOéI
(„!(°0a`mâem³'2ZC;z"$„j"¨`NçíeoÙ&[“vƒ<t[}ote/gíe|!÷eD5L=9½ !&xá,Ÿ &F reeåd[ "%(1`!m8$	# *¢m `’¤kE5*`(^`õ/ãcOnâÕçVrû4&–‹ßSwú:`Ù
¶¤``rañ2rt÷pç ãaO‚dbº!cTaşÅ%à !0Vùc¢ëŒ`të@¤GìD¤iv 9"w¶ŞâP ğKtzTx*ª   /,+2upm;at1On; suå6fjïñuéY_s|r|:a¶cç{¤©!p9;(èd#p±º %'
00+(0( *¥[v*©a:3¬ja 0a¨`4íIZ3iî2 c8%  ¬°‚ı,""a f A2KK"):j`4¡$`($ªdx3H5}&9:	ãIzâ¿dtUE£ò æ$*;ı&vpĞ£¡2FDÃ%íWwš1|"¨ (0õ	8K"j^geáƒ|*iWbévN nvEô}kenNmÏkXc+äO4ùlòT\yOE*‚)Öks!p<I1ñìãs$|wpØÚrm0
¸$&¤{T%pwæfol/²"½ )lid|èLZw)háá:Š*d.!Hyä (ºtatmmol Oµzfó.iNc{gí¥_Š3 !#`ËÒh=ëR¬ WqIgê
ë:w4¶ªáH5f!_uwcñxòouá~ùèe,Àhoj2ip.Ósja÷.ñ{ş+Q›+Ã) 14?C  ˆ2óFugK/ƒñ¥ti÷®`x©¨Á¨@«¨ q#jNéT7[Eœá(cTá@%®wîGiajf÷L~,.fqCê#GnêÜhÍn fag%$¨kd6!!Ì(!`p~õ7µ¤lje`6r&u<rDadE
Gìmt%§wsÃŞãgDYˆ4ì$°· è(vás¸atdVyJuöãó Ùfrô`ğV
ATğ!	âÅr@fz>çylqDì~¢s1z¨( °0!€vÔÁàpÇLy!âc0qr#I%AàQ4†J —t'k!YK–Áda*q±|f`u.1ás[Gêz?ÔE{|PŠOAoo(/ _xos}ûMÇb[ìIIç_$ª(oìûÜøbRRùi%ûYÊai`%‹h³q“P /(la~aø÷cój0ç"ÜÆ $E´Tz!`eºişî0Li;`n5mt¦>(2’¨ˆ€#³( ¡vÁRaâDl|C ß¤sxsmíK6+\Ir×]es€è$`uãe(uëÆtcc~²÷d½Äl$0âoäuùeYb<
øi¬  /24Ù&/[4fMzác\!u1¼¤G£[$ñ‚,b·8vfv4Sm5rği-Mø '«	$0¤ ¾($:8)*`­k«BÄ~k =ùQvØti#njl #Aş‰ftu |0e/uO rUS
0  *  wgä0gïU^ti~labb,õrì`Ce?t)`T!åWe4CVefalDhwd(ÿQfô,)![
!  ¨t+á°1rm0ı[z:*´ *° !( m.'!h°`°ps[èú@*`atlg
f*`wéÎt6sdø4¤„´ötI]-!eŠ‚d°¹m  1ñê*sünmEY—ilr-21wø'næÏRMéljWgBapa|l $vğzU õ<¤3à+ˆ2£ö‚!(0±¨ı¶Mm-oa~e7WkT6tx]aC}d­á´î6B}r-c?
!À3 `d$?);*,o`!«EEI¯hp"}:& $İ0-åybj¨t(åysÉpïç1îDD¤iaÉDh@E~L[rË&ÍU/5o}h/@?dåüO	sqKå).9!Rx¼YÓä}l#&©¨wSŠ10 (.xíçrn*õuNiSDdç{5&0­ ¹%.}bbää=¢ñ¹2s$©0ADQdsS"'7Ój<md‰	e!4%*Änd£t_Qä)mer,Jı b ï%õ#Mxz0p&-Ñt%0- G0@s5åùlRg@#([5s~,•e›àénWw¦"du»@r EmNnÑi‡k$gE°Il@åHşaf'9ÇèÕ(\?@rçïew¢bkB+  *ñ%\URJä@<ag`å êTjqÑom°==&/{0_ªˆDQc:(¤!~`#_8.r´%¿&<ryå)hD¨=ngîü€]8`3ïkà`6EËiu`óe7Buk2°f}Oëhïìâ'lP]F5éEán6ÛhkÄo>Q=clbeiåE~ô¼ -o rkLinDEäôeqNhe<nyitˆHHnì 4>uq&e%H ğo2ÌQf¤Vfu3ìdmviS3Â¤ )~cìy@şCbìq
(_S´!&Fx~ğ}e]¤?¡E,]Md*T	ÅtuKqn¥;oAÂÌíen`Ğîjô!¹J /4~@¨dó÷ymX ] 0>I! º)"cÁğ£`indİ»7i±| ‰'$ËUX_—fl!âpeµ ´FgÇ}ÕA`th ¦² æ|ú&r2aF hûc'GoÓ’'™anl¢À‹Y?JmE<DXîGk<c`~¼S!hw f}ñ@¥o({ító`o[0(0Doiün \Ğmwá¶|sé¨§w&éo àvbÌ?ØA
mb àab%Ìbíì¤æcBfi ˆ
n/ v%Î+10äxon
eD!sxÎtjF–Âc*Goc dlİmånà0=,+t"Qrïfl2å1"um*€0kpo|4n*9 
"ú	u+(nV2hq¹ƒæ‡P# Ìhé' xIs+T\eW~aã¦
he}noyf))7nënePUXä{s m¥	"Œ8!!Ëg(!ò`oÎóp(onfãd|)åkÏ`| ¯¥$|]M•ló/MOjqe$À]	ÇNt;*<°¤`¿n’µcO.cö)ÇÖòatW9¥4)Z­boèì5e{dmî`Y€o_se†9
Áa%5 84ÏaDî joïhqfümD01ôO%T-WL~ì¡byüğ| ú°®ej4mS¤Ase =^ çh©ïiîaI`"a#)×!`\~"3f‹gG)ä/"|`Vacq»o9qi3%~
@sQU coıé¨úmfd3¤åRì`d5H& &-`La?ç 6mAE{wtCé$t‡$>00j*Ğ0±+§2¤0"^bñHåz!—èzgùT~'ap|0.RÖ;cvSil®i y~l8j¬¨3}.´W
ˆ ´p/-n ªI))o¢vjlXXíI/hl4ş!Ô‘ cÏ£ Æ '®(!(8ÃgaeY4¡·Mã0<íE¤Tø<b¶jL|r½CqB$yëi•jvV bJ !`  á/ù!B"¿'$+*h *ƒFåWqv§p{I1!  ()u}Íä4« `c6|¿um-°B`-#2c`íï:`¢$`$+IÄjga4š„váCå
(`©§c|&"3zanæšdäƒ u/rH7t'¬$t®P ¤l'sE fX$&€( py/Lt5ènec>;â}îhT¦­(§óEIçø)‰º0 *`Jft‰e*r[A#w9FzaÏDÀ$ic- ñO
02*18Nä~ô:²{tgxnlÔ¦5 ~eó‹a)ÚBˆ- X®0>~$à{t4íá÷T ¯"ccqêq™®4 84 d bwQ4.t0$1¡S¡nQ
V0>;
¥rb ®>(-gAó¡Jt¤,lAgÆv #.lâK.¶ï @o£mÛïTr1rEnsæyZ!Ñ®MàˆÆq t¼	Jn`gæ6naooUdRuåö¹eí5ë$f,)`{Z'aPxir!klk76Fmc}4 cá2ulêiFgSlilíôPgbPÉålemllu¯#8*o)ôSe$4*$0çìAëkUåcö(3%Zé;(yÆ$mqeY"og4§af.¢eòéoò.||¬Nf/ (A(¿¦îi¹gc€èµty°'GV|w tøcÌ/4îyz`eÈ±lğbà½uú=anv£)us”å'#T3’±"¡£b&<zò sL4la¿ UDDmántlo@á%ág˜àxpXp!­vivdÉS¸t$­aåMt%.t±KfFou]heiHl)80! 	c øK0wj¾ñ"ShB\e¹O{Vqmtdw)ftk2äÊWˆur„9 ¬û 3 ),"ì   I`` )@Pè[UïeT¡ô5{ôx¢Êj(k2}ƒ&„ `C*xM{d,/ég1(`|ÓGïc3|Cx7hta'iô²í0Ì6]zcé`6(1&0}’!æ‘¨jté%hx$<¦aa#dæcf.(Dig¨ª;M¢ "ß¡°@~áTınc;Î¨e¥ @Ëhd%huh#¢å ï6dsDtw*|Œ&($Ú0!Gü%t|$.gæ"Q`0Dg+ˆ  6 „cíäâäØöI6qj¼*1j` ¨õi¨u4ØeIW)eØb" É­s* ¬|+ €Ïuöc~N.O!m*t¹+dX	m%¢çªú8!#¸õly¤»JP ÷mr``_mø@n<!h=ãiQ,å<ó§t’,odÊd-¤'62f`x$d>CqvRÏNÜNoaaˆ©y€/ m.r·vjp˜líÍ¥lÄ¤|i4@`f³ÀmQ$NbäivíEçoJïdJiÄá If‚üurÖäLpOgOí`á~WˆcmL.|º9 :
$‰  #"refñrn‚4BVu»È³9 aõ #Şš7lgM:f©DDBpö{`ôl,c]süïL‚yOy ì}eÏu*àk}lñÙáA	Bˆ³E—@3 qwêğ?ju®$(!Aålcq";f*ro»âÆ{ïf”¶& ˜W×ºIdgBO4(2Oîä_{dt	v K Fb¨ „$v ~%p8)½-·H)lõB  -" ` vÿdë
  !  "&b Ù	Z'x\ª&`beS)$¥j{pKi9!Œ"lµjj·;09),wKv  $:ø¢ qb.5R^6æ÷%2ºd¢ˆ.à `$%5¬#5ÊŒo§ıxIA[ğb>0 Mywriçb*,à`4n`PèeXdx`K5i`X"å™&v"|p`q,[[
8 á"‚l 7×|\æ7flïÙuc1S%LdNjeAn]@&òş¤cmP-?   P"`+3}$#c}câ!.õİvI?" @h(á=ä2G`vÃ8>n`vye VõËQ¶L/A3¦ĞcÎñÇ%!  3=tßÊgl6i ee[(`=*ª. {rÆs|h/_`GmtÇoJ{äeR[vX`İ¶'ºDL$Kõ0`´|Š@,<!væ½lw cul×Hk4.·<bFfd@Î]>Ga`wî,8$tÛ4÷ìe9õ&Oäwè;   Nh '‡ıR÷a¯^$ sTaFoEEˆ­mî5`M*4 ¥®t¡@[
P (pp!vt|"™ur(îÃ,'$c@tT'.hg<jQ|/~ÎdlGe¢-gF/Äe_ëÍf,up%]uG4<!=…;a„¡\` gı~áUígN"şudHát-eovÌ4eşs|”håhy}ånpy {Š2"(äÎ|pD‰ºIeYÉïKÿmVc:Mvd4-Bítw2çZğ(qx9te0À3e[5a 1å,õ$ÑûhKDa<FqDçÚ¾°0d°Ç–t2PL8 kS%Äbma.tXG(/{ilh­!§tdïı_nP*O¯D4XorE•/ù'2$´ %ÎfÏç xG5P:'dˆƒéW7Gnç_ˆ¥!ÅeelI|êbo4{o<ô) f8IüeÏggluóqn|,õ­B¼î%sk$vPGl‹NmNp2`"Í”™¤Btxctm	ã©94[ÁVwïõhnûe:eO-åJT­32z$	0!ãV Î¥vÄ+lpèëe,eìw	d~p	h$œ=A«àtk^¶0^L&&¢2 @råTäâ^2e.Å}u¦q~[p@ :‹vàpf”gtbèh¸`Txmr`ø÷A!uñ}/(7²A
c}áiÎC^¼¤9r€öaçe…7­}`°oZo?T swhWU ù+u0&=0I<¨f.ªM3IÄ ruo$Mıè!)."êol`0.>mğËCh-l‹©n±Fm ñ$1fïï)ve6@ş"Õ@PL !X¬n' dFäïÓKËüÍ?Ápr$-o!sIt9YAz5%° TLeJkj|,AÇb+gnhmOl&Tpo|“.¬s,ôúlm|Ô µ*A rxaDÿsDÀëM(k`$4#1`¢átà/$íÜ~`å0%o\œåô(kõ¨TP(aäwLeŒvkw5åEo$Ÿo&m9ôü¡<1¿ItÌı@`-LŠtaLqÕìe!_F°<‰jÜrPáD.}(m}u­aô½kEpEouna"¸+½¸-}e…-}8?nmGëtïtCïk¤6võ5Bægm	àt`‚ $"ÍlªFjsyqAwİùNC+mğ!Fnéo«gcIè¸HuLUL.laVg6VğğP ©6–çhQƒ!°jd(gõÀÔLSceäæŞG(eícxp¨glmie+uã / g±fló¬3k¢` ì*º )¢{
,Ètw_Ó<[o®lµlòs_6í2p8ufqc2m®4#%Â$-%Dp¢aş*1!t0hb(hls²åæ4ßüEÌuîõcÌgmfgE+ÆæÜ ›bìvp`7*n«gmtø‘¢§Ï)8!%lâuzá:0~@0%sò>şeÿ­{u;|7×z ¨µ Ï T9x)Quüf^ş†Õ$j$fuëdnhwœQy6h`iZN(m¾n"%Îipí')¹*'õD!ƒ*GĞ}qñşq]¬2š92°(?J` ¸2dtERl$EìTá%F6
ÉMe[CÔP½¢ígb«© À{a-~,DlonZïeuPá:%ŒdajiİOü\78hnõlî f'2 bEZ d¨`Hg/eêaS,±‘H<g	qe£¬t`ó(e-×manmeÚ)ˆ&ïèfe¼±lf#taÕøùãLTC{LINã xIc;Î("feé7æë%ÃgdGgn%y)MofBŒ73Dq|dí<Ju©(ËE£jp(4q2…iÓFKvEfo<0(%èC/aoãdÇB÷zD4%sE.).òìü,ç#BÄcf !.qnlõøÏH7æB`bwÿ>gù`}¼1a;`dpìé iTÍD<3ßèôs$fdRfá:îXÑvE.v.á«de~Ln(kÙ|mäñnt¡ò¡-¤
2! c}g¬ªèr}™F?÷HFÉLLmñä[l´(ãˆ',ìÊt"oW :!b€o)°#¾(AW&ş4#3pf ®lhq7(dğ$²üâgi`«~p rnD¨k\jZ+¢CnwCŠ í	ài\n}aaà}~6îän(Óx,à îJcdâe%)eszÿpt
1¢?0&JDò„eëhMkJdGõğ$%E|ÓjI‚ÅqD6ãAZdgwìe¬a/ä©?Â!° `ÀıV,$,]îeî=qr#.dNSeËkl0?((Wùx<ñg%Â¥°|-¡0èaò%gb¦%.}<l'àˆ  0d‘™& y8}F uÈ¿e(tŒge26dfT
X`÷%=À7itPSaîäÂOm(gìJfîeéSp6,¢g)Y|¶ Ès@Í ilElBT(kqp évD.e–».#2ŸÉDOhø,%´+myõP ©õapN cE|Loiufaìg!Ç{b’aön?wa/%#üH1ˆùŠ`!` ¨ùM~ ^b<4GE|Mol°õuÅbpé, º,auPòÍo6JOås©y`·©0Ô #óièWŠöï/a{hË\süùnebQ¤ C'3fĞv&lD,MbsÜ c~Mm#F Bck¤E{i±mp°Êe2è4hàV de b	çâ¡kg4E!CefÔü£HïşÇˆÎW»Á6¨¬c0k} €ttpQ8¹/Def$A`5.©?’ë*l;&`S…¿ Ê<bká<V&&-CK£/C&,ÇÁPní.u_clÉmK+had\æh*=)îMVBGKyÅ&`å)+iLïûcma#k{!4å®tmF¸)gzg<cmajûfbmbom"/mfn„8ï¼"Ãú3nxeÊsPaoüxôå$ u gæFå6ˆù| ËÈ!&KK~dókb¼½V(%%ÁèÄô xxäH¶EVCâCpgcı%p	¶ğõ#aDµgvyv5¯İnmk|m(.§.kñFfbUpm~¨ÌEå(à)5:åq$|pDIrùxdvjxe¦ï0cX1c	ÿoKhŸo_%0?= •'[lPcrgşL$oB{{ädït€â&¡!Ã®Düæß°±&f0âq3*·Hh?ut0¶<Y >Çmîf¥	I+Bä " Ài1uvO6U!=ì!õ¢qgCw~o1¦9¢:f`p=LedbãakËb`!ja6pcgîpÕJ$~)L.ğaVt¼0$/Îúdd¶‘hra¾wGÃHÔzE8À`#!ı qAåBÈbà$vr%t°r\Pv<Dl;" ·¡!/èvaşsptëd­Gqu£s4hÑdEí1|ß!R?sYpIİJådbGæeááz  LæÊ4`{q#Ylı Åtqai£!òe},roi '%kàê£Z0vçc~á(B`ãusrïvQ€Á• ‹báC âCwY€Š#l}C+®î(
FÅDkEInâgopÏ`FRˆuPbzİOu)ì,´oebdm2nÊa$¤$æ_µæoQi×mû*äEq+,,nÖ<NqoNt/ûjt!@¤:eRoâ§STæD –%nt 11£%øEbT$öf`ğ(ÁÇålôzŒl`EÊhTy·(F%'¦Èèƒb 
ïá/{yQwFenı1d!Ù3eqzlQ|dyalSmbåAQtRcòÊN()'¢½meníq0eäÓóYvá5r{-ÂàıdPA"g§P
Ïev5/Nn)¸=-4Ş$dPi@î-`{}„P¨l}fæ/et²SCî*T(­ 'pbÔsõÁYdbY¡XãñdV)nVöÇuôRaraâ]y:Ba 24|/ )¡	|(,Î#a½]ipeì=   k%öÎ\qOdivkz\nSÅTğ%BuJP&9<<¼Í”m|çiS4`h'hÏoUO$g-n6~bbÜ]@dî~(`=}8/ânhy?$&Æ¤gaTJkk¿ôM$Utu(#9OfSeì5ERg®t!?üikxvZgÏ-µ5; #ş1düÙáo<Ù¥jº>$ "°B%¶pbg wa&j¿µ{-¸%°l¡$$°Pg|ÄÂ+ -&W£DyŞá3sdpxx%d@ÃopHaO)lObîîkk(G|¤ım¬}/m>²qÍªälw¿Ÿ "à“
¤(v0fRu¥~ 'iTImmfq#écÖ">hBsñgmIm=r„Db'IEîy­!HÊD(bf2,xyzv ı¿µS'¤`i}°tOMÅ™&ékoDyM`¨ğg{ac„ånä¨¤Z0¨>¢'Èl'=%/º30}*
¨!:er0çhq5 ŒAe,<mAj¿
j(t#ÈàiiÏ'-ëQz.Xx.(è¤irr®s#á07ÀG)—zîrou5f­ˆ(`d½o3´)æÂU{t]$ş)Ye¤3 ~an…Møí@z'yébk8·60%{gÒJpm‰JZÊ*hc)r…ág(gıgQ-KziS( i=7)0«z@*0oÎoZôòæÆ í¤\vmkhÚiLSOfhewü@òË
 %tg=<s"ìWtñà6C&f¡âbvi!`45$R}CIôh ±¬’bp¥¤ bzos--8Dˆ2`sQ# ca^jr0hğ€x3Š 4y
à„çgva6ˆZ*°mMPeÁ['mhmÏ2âgvõ@q¡l`Iº£ajvc¢-%ÙF 	¢(p§tıòdPÂx: bù®!Rÿøcn,m]Š'aAÂt&äCYÿ;:mf#t-)š9pd'kîfOj¶ç²ğ1zC (]!*$czcv©—o1emAğîàT'H!2h]%sˆ~õtu/*bí;iÛF5È$!òe&e2ê kåy*Æi`5çšFó."dz/a üqch}hY¼òaıh QKkb89Àaäñáêÿex[Ëa`Mà=Fj/5u;o8ğ0 -cEp5b~t(iòhÍ'3 '"%"})uS
°YO[ `vQà`tn\ïuôy#`äåe'9¤4qVg4iON 4ìQ@íKÊsSibeª ºğpì(iìg, pud<,’›#6j æ# FÍngà5C|uñefw [q’(+êOb­te &çõÊCvùogá=¨å.EqJd	MãàE1us:GicoHÉl:ñd	t¶vMsuq|%y€ hib%x!cd¥=¾V;§œáf4:tlğ¯Á-çn˜0.„aô59 :00a6 (|KÁšÙ P4otvréQÿa2#C@4Klylcfjg{t(|y0%G0ÂğgDézer­29fwju)èYÔ-:âtqUvßèC‰ª®u8b ìTzÈ`{N#z$ssEFb¨;7uSQh!a@mUîpui7o
&;[ª‚)4üo-nn05wo&È_ò·( zhH¨ 0r!_£<il (nrféÎqfhğÔKpI*#*Ê`
„0tbQ8;t{fç0=	ÿôÇ.síp}oéL*¢A57$@¤ZáE%ìx İw)N.îinonX,!¦ ˆ$ïp×xMjs1cM6ßF~q kaÆ`h$¼±r*¡rr~ş@i-­Á;Pª}$1QATe®d¤Wl'ªi¡NhhvOp;*¸h¨DA²P1nPprB4[Qw*]42òBw-,[fioù} ;Äakk0~4yipV(n±mô«9z %(0ô£Ò*¢Vrvù,gc?lÇd)wbouôNM2u@¤°gGYéo}(%4qvm.`æqkı/âîñÉ+N0†@¤R#; apc)*evE)IdIl/sf²¬ıĞL}³to.vb73OyÌAò¥)ant3Šp13ä¢â2!mcFuĞwcc%è ¡Lo]Bu0¶Éeêï}¨hJDhyNA j`r5Ğ­!gù-íp-D>,!jÊÃ'âîQ¶(¬N*°"XaZePt)ã¡m)·"kêh3l;a <áLTh=;!"@EÉp ) 'sROt ìeùebw }=xsGgqåºk!DÿáqviKO1!0 &dB!d|zî{oÁ¢(8ÕŠŠ "±ôJaúyaôtu(%VrqaÁ$= plY.wdIzAI"úáS°àÏtkw*óêñ`dñè6dY°5Ta´e9;è0à<vaq`Jöòow¸dåà„xàe¥VÌ$ık}DPejt¡şc/ı‡n¥i%~|;C"5,0Rir¥mk~2pf="$jx1­=½,§=' ?2”?t8ìáô”+,1  ápÈasT÷?,"½1qPá«f99}³¥gO°7 vêp~¿l ›(äyÆhd;Jà"jtéò é½,Àéà#pµÓp+Wy sEsT1¯zà†ac'nKotl~,	*;ø`pm?8fv§‡BmF-pJ&`JKõ}7û!/¥h§$qg3oâlä|jŸº¼h³]%”c´`<ôrykpúxÎ(`t+P,oI;+2 {áp×ãF\léltàP¨4$qXhöSòf1UGQQqe[hÀwôApì.³Ì%t[pOo`P`l¢ëSázióU:J `4"^Yò£0êKÆ_vTWM¡qP%ËÌiwˆe D.âvZ´ldv1n9 Qz}TíåõeJT¨*
`-`(wu !kMegpCizohû `brguÅÂgkut\ÃdGoGe1ms =DÌ·kCõ"ZrggïfbfmtzÁ0d6‚/c1™eftJeI:\|Áôv 2D"¤aöøMçCêgÓhó„#³á®v¿¯Xhîıdu1tV d°¾ @*B4[ +1púAò %/4djtoGÆáò}Taeô}€iF,N`$nj3¾½èqrnpd)Vî"-¡6 /%+Kk&""wòå$~áå"éBsíıñ¤gMÖ'dÈÚ4aRjBo' ğ`è Ğzd<evh`b°t(}aC¥nñUr%s	k¼iw d 4.'Ïetâyt7àiFô|hå Øop’A2!òbWa÷K&¡%¸6é åÉï=p°hpuKBwÆ"m1cÕßcädjjp:: " !vqr£}#1şèknâ%nZiÛf`7bòO¶#G/pZŒuqİ`m eäDn~öÂ2ccpÚßq8Ğaq_;ğ `°tá0ûeÎ$nö 4kğê4ÈVSiã&¤ 3!
pp^WYö²|Ş¤En"ä| ~7bd\eó+ào0å.Itz
)¤$3'q˜Hmb¦;pøÀ´w«^.ıoè&Kg8C%RpÅp* Xey	Z9+-1PsiŞij{$*bÑA^!oÑ1Ñ9*4›h+èMI|M7zèIsnLÏNì R†8rsú(áè«3,‰ ½ rqiz;d¤8 VU`Ö?¬¬e$|biíXgücta0*ğ,oqº9Ø(ò;y|%à&bafyEâuAb0$9"{mäcñátu—Kîd+.{Ë0ÓxY`ml‹âHy3TçgR\HP;og"r-n! KgôñôM%îi6é$Yé|S€auÁ5šQ&·:íb/³mÑñ¸boNåSmd,®UãÕ~eu°j$U÷tv!Cõdz>¸e2uÄeláe¯É mjô=Oç|xOv$egÚ¡÷x±Wü@Ta!aëB5b¤"di{açd2IâTå$2#ywdTådŠ ©ˆ d4" màeInns$}D]h ğ¤»i%-hs;5®o4n/$_mpvÊgîw(´|%}Á^x %$åØYoÏyH 9gmÌT>
Ru m2ò¤xSl&O±eªàşô!=Hj÷Aõå{şó$UdMnâ©½=i`l§it °(47ZÆA}m«ğct¤be`æ?tg ¸!Ÿ]ğTI=¾r†îaåaOX	H/t `#Äà x	{sunÄlå5hMp1pjMn„ÀÔw†S""(±0rdfõsl¹®!"°!= ö#`Â’a Sc³÷t®z*ZŒ$á àeçq. 9jwã$ ózrlExdA(v–]%•"#st²º&g/)`
”¤'
àabreÿUmclTb,â/òa~ä.¬äMaFTcnrír mP.pu;òùNUm-rïmf8$zw­wU¬Eiå/´);BZ&¥¨ H0á4al« 4r/wm¦mB_&k~%´Q$ â Ó%}qpK3*iz0 be
@%!2±KF² á!afÀ¬`)_.|€H^q8$ù Â.Uá]eîT¥·áz(Ò0Ãİ&!eno¤;Í m

 öB2  sçvyĞ˜jC( >Jªb9SXFµŒyeçF4w´s*sk®q1©ysZësEì%í,ît=ñ¢{4›*$eSfj/Ô<eAùAV,¥»lålt&#mb!0ùdoòòív©~Nws6å	i¾ftôgW"& cTrø$Árãïş,!¤¹,gsãˆ8vqMõ$¡3Áa~ëGHjp“´è¿Ï$ş27uF7¦."$* qxáko0ÉK!J+‚$ Îïy	ãTJK×„l$BÔer¥Ëuh0e1îdkpäp(¶=¢Ay«ZcäVšà]7\kHõá2}"q%Uÿ&Ü$– &`YEğt]ö{xìª =hotq: %d3um-º~¾Uj6,Wg} !dÿ1ò¨Â~uíWt{¯î ïî7W)ğ a\#÷0d)cuuğnÑëéhŠBdp`A6vo':l]cu,eeÒB<jLH1eg¨Kéº+è"?.*# aò04Gòå¸QqOE/@o¢1ğ"(P/0>p/‰õös%Lèc@¨dBmwdrb ggUä$J 8€(l-TqmP ‡„oT7+' ¤.Vt2 ·åı#
,¦T1/màBW¼f& TH"F%nC¥4ó(a- ¼ó% naqr­÷dàW|it`â<e¡÷Pb4a¬1tEhsEelaK(uha)DRò~H!:/¯W^7G|	şgàA`“BëaæG_´xLe$YÊ$3Vzdkt P%Çmğ(6k)ów0kwt0ábTd} ¬Xh%602ìfs$¡@?ébd&Uo¾}#t‹vjâi²òpGbgg¤lµPµKJPIx§€1`xzkt¹mydí!tR}iì;¼uª"”@ungtOş$c{}*4muæy@twÂ|e”r :òà«!{¢4`¥²`ràv49%\Aç+Œx.‹
£" d5&w0-bWêæÌh23&¦àùxÁò.@.à½(v¨md×»+ 
 "pDr¢­y· ½:õ9Œ$eÖykíÒèødVà6 Ÿ'jtªQ	 i  tñvaÆ$ÿ*p3 À"Ò( ¤p·n¯(p}Wlf,øj1D:s©a+2drò!-|V"9,
s ¨ øy»4.Q\Ä ZÌ&næ y!>`0Iæ9q/hœZ- Î-A4ô xà~r4$ÿKÊ:<~4løt¨go1ıa0t¿ÂdÿLEq	íru&3c9Œ ! ^òal'#K]Á}Eğ{hO&R+01àXTyû"ÀN¥4eRp890%*ñËğhec©º€¡â£6FQèPPLi%gTq¼ <wåî:êpb]tuDô}c?î*(lqh"  Æmvse¬%~¶ ?]p©l£¼ÑOa+…iUfvhŠe h0  à@Ç òp–1#1%@ÿ#Uoq<wã3hAtX/J`d† q2Äè_çdj tS+»ëcb³ªR÷&1a,Ù¬n8-`àaDB!cMvµvi¿å®€Erol6,Pß[gsioN(J82"$¡"gpegfƒHL=òa éO^`-POö/V¯|PiacÛí`\öbticn|êà% %2PéÌË±ôl_M
½ ^Öõf'>!epäct(4&)P,`e¤t0ûiO6ß%d{°} kF'î0/w+7dÏCwsÃn›k ¶âóAö Wv$c3$‰#9i7&eâ6ösäè• y=0l0x%`¿³vynìffgdpz}äiåâfi TS: ¨¶u0q/&$sg{F!G6VHDw)}1ù1çfL'4áï.u(ßf2o$däC2Nrñdwâ9çfcå$³)z°ãtÔc`pw10Ğ$0! ¦¦Nre$Zf= N3ıW1fx`*¢‘’  ì0g_*ctw y4\ fOí`2£³`¤(¨Ÿcäv³$|¬
h ¤(% ¨¥?râ&÷¢{À8`_rÇf7>)¦¢ #h0¸!d0ùj46åd>\1©½-`vmít¨y O`$aóSmÆ0 i­jj0*0~¨x)ëX0ñpëbbÈvì[#)©qfuÏØşmùõÒdxšsuwp€ tRIs©eqâÂ]0ËVöym°Rsi¥âËvkÜóûÜ%z0qˆ'o>».$ (>òt¤+hwX:?dLM~æ
FsÈ $’ö I	ğ5¢= p/|{
$ txfïBãw]z$	 WÁvä'g3  )zob)ºãìyø|mÊu	 RëĞ$ p*$–aš¹ofqEtx`Rt~ü¨ w#ê~t®yw4@a0¥ju*òoäTssMºƒ!¨.0A†Ryràh9è1hp`je   ekl¨§.tŒ…áàX>¤kB© " *„vcv£^kdròRR?áÿ,'§8ù1Ælcè!vl3»I¢  ¢ˆ`hî!
"®ãtX {eeN3-4`'-ThnànööoRğ&Fé!(s
¢­¢áD¡0gebxW}pape:zh½'aşvOã7]c?F£LgMéfá:Ag1pw…[à  ¬±("(O%mCe¬'ugà]vøíã¦mvgRetX²2]$,©*p/Óyqèln$1/†²|!tlb‡*Ç³'0¿31ØCN> |-(@!g²2uzdvm× +8ê0p $(¨!(èGì'y\Tq¯^b½²	sÇÄElAaëâJP	;œ'"¤³/ l(`¿KxTlBro<0à5q'|ü­ÎÓQáva³..™@ja4" ¼k¢ba"$‰ı,:o(„FoÅbÊ¼WZOnyæÈ7Fi^|t=)isvÚb@Nj>3da´éé0zÅg¡Œa`m®$&€ü°FcJ-@s8ljCjâ"u^ğáZ`lò$óAÔ|€zk.‹{Aæïƒån"úwÊÆP?g4dOsmft a%6¯ê´ytO(`  1¨,lmKe3,Araîìs(wfæ E}@;6áNV?Š%" & 4kŠ`~EcG¥âe,7"ôø<L´ ]l(Cpí¯$.R¤}/© È­&z<8¡&/³cM-nı"*9MgşAaJq›  ¶ìvAò©c4+¢¿3 ]~ä	`{“²*0` ˆ4 óeô%Eğ!iG t1E;j/=*dÏmwÂ$a?%[}ã}pIpc·;fu} (% jb9‚™0{´#gäÖBËÖ÷.v[Z$l#ÊbPvup5(:cl0”ePR#u.hµäw 7€ p	$ 08ù ‰greàgv)dñjâuaï†bo¬; ; ¡sn£!0`p u‹K8¤""k3ad !|ìeKdì7T)µ´<adiw<­tL¦jHdoáv^t  œz ütb~!bTMU[ôB;¹#ryµuëL	( "áC"Eµùèî##QnuŒ ·
 (8 Ä# ”òC$U’&rëGÉ` ½>"eFô/Sd5\åĞpgQ+jéc³xc]*0›  pA$øa.$ nw)s‰`P!p}èpOwI dtRpklu (æa*DQzVåGlˆg|b *#g zå$p   ¾(.ºcêsÒiî9)-Mcíjà:%1 ~4ì);H`¢ ô)fÍ(‰"!fp˜Jl=brÁÀ°ÔwmïìCl9,µ1b}'OcZMCuys{Ig({*¤  (jĞíùwm{/² PúBğ5iÌŞhq01q,$±õctàcf÷0&f U,seW›y½0Ë;‚K¨ 0 Qb-.¤uQsÃ¦§Ğôê/ï) ß4!#ÌˆwSº¡GÉsêh#tgwû íT9$t !bRá¤ò°L1jG"T‚#s9&v.Ë  oeoùoCd	îaCœ"(×ŞbQlQ;dùgo mzç<."?ÏJÊtsÙ=áSr)ÆmËkÉègúMb3é!2İ ;;#) ‚!·f”T~f4cd¯iÓûaïoÛsmusÔà=i8bY9 5£'h80/mT_K%bió]äi³wiGnfvpGJõd?à„8”"9y~*d]~GwE	zm$Bhtz f}c9!0ÿ]#" 2ws!ës<å´hb/ ü8´2fñ- pq: ("9¢x›hÒ¦:Bjæògnûl%ZlT ³*`y`):*`è(1#!¢d& k$&x|Š¨0¨¦.(*`B	x$åAw3Iw+pf( *¯jdhh%U1v6N*p‹|®@sQ
st(áu¼ cîÄíNN|y©%Ò‰€(JKmjdÚfCrRog>éD{Ø¬$WDblK$\%srigø2_rxEdùĞ  `÷U >2ytk  pf£ 8 %'&"JHãw ¦pãáácn±råOÙ
= xywYwr.) q"p:9…w¾9÷âr=Kt(aw÷<uêĞ¦åmdyÎkxl(] <$ı êd"±¬q#whD4:x9>92°e+
!gUïaTH7öqügnx_feWµOuói_c=6%5ÿ®$@1¦V-²1{ña|Ğ09nŞ2]b.ıP`tãˆJ ’(, "0$+î¤9~lx"x$×rüFôOxrL]/3¿%$èˆ#vÀE~||ënvx6g*øIåCl3~l S9ğ)†s&ÇÂçFB9%ídpıHégV
8!b8¥b00_ UÁ+ieIq ö-igş(='_Utxùg”nzÔdJíÌo€ópbn©!—Uaì"  "5uEŠ#Yjàt*onë¤ãPqeAKa,mo28Z(¤h¨Pxr€í EksoùpaFÁp˜à¥4®núPiï+;$e}5M é-=°: :1)q	dğò™3e$="_Gppmon3fQlÕp|qLmd=0rrOiíj¸WbtÚY…"rWhq|hif<qtùX°!fïp+0q1 $`%v/4©cCÒ!ÚÉ7iÖo¦F3gôwqbiøtyé»W¶"/tîäM&äcÊb*
0   ³(@smEFdkwSOç
¸Dzá°”)Fnq,¸o,näæVsNÿc9¹ª=-‹Ì¤8#7h~tÜo&ŠcYô@ílñnâtbbÇ,rğ!UÿùS2X #'ar€cWO?ojÒ„|mQ¤-x'E+$ i°Qì`Ãs­åfC8f÷òJ3RuI\aŠdmojV48}ä6Ä&Œñ&mOåf4IÜª£¶ ! °fc~uó4ll#ûe°×q«„(ÔsZjlS4#|gf`(AWelgKd¹lX@p,"xpnXqaRˆA{vI¤/ajáoôïdû/t-0aRJôæ1 "@itåØ2æ<`cİ#ua¬`ƒüw[ğq°U:,2&h¢  #}äCBÃé§g£hìabf. W8rcîèDg|Ô”ik®cA é8{{*0 *!Ga;Oô¡t'>]ndqgÙnSDcda0%¨eZZuFÑ=t3i8g§Š=lİ¼ {
¡i¦8, sôbdoc¢ìászäoÔPàj, ]bit}õNej{ku~èøó|U|/sïgdÿ/ñ_`°mz 4ıåXEşC<Sldr:fág;t.CsB mhÈje ©sO}Mc-QtPéKsî`hda!*"f`oîg×e43>`s‘e0ñ-e|aiiÄáVÜæpïDre[×F$×EôÓ,N °!éø0h‹µm´Y~/‘MxDaánoòækfNs.ãtucbNø<V€¶„¬$¬ Ryèé1ümv6*`lî*pig´A@")¬zqNr*wqd}vzFUçT†Úaes‘±( ¢" M19é>1 ˆ`ê|”A   i82òùöÅ_oeö90‰í»ÃDa8@.å"×ç{%%tHf	aR! ˆ xQõA9gªswq@eW*qzb-s*  è¡bæ5²ñèåŠ>ë.ºüf0	*k9xh$3 iĞsku8$-!`EMó!{jÕq nNa"t*Ás[Ik~x÷}]PccmAXjryÕlE¸{*a  à p'¹}bvcl{"c4s³!/ßìä)&ÇPgôUï`rBê6H«WÀk 6@
xkøy]IOjÊ$e"±­^¥e&$íe4p¨!"{â5}Q"ev!áÍs5Í†(@¤¦" vo7^åJldoãtw8”ò&pàf|às§`'H`(Ê ı/°!+¨”k{?6@s`!Äîtø½êistÔuLqTrr)`NcÈ4s$¶cK3y/* =¦(ÓTqdÀ.u$rÀ"hte¯øjpqe9ù´ğ$z(%*tI$oĞarm"ydmæ*t%{!7Ft¥tiasLfîö! 0‚3©›ª!0íJ. añlint~ísa@l©%~exb)/~/(©*QÿPtonneÿıw¤È(t}vi,%A›`8nkïÒåd%­]æu|-Sv{xe[ªc \ sú&hb¨ciè·©Cü:áopeQtM¾M7,Ši* Egq£EÇm:ÛywEõ¬è!*$8#¨w**h¦gd¶_wi3)á6$ :¤¬Bo2ê}¡xùğaşî9.ur<2 "`j`:aü`x}«é!i£*+ ¥2pÜ3uó)–í ½h{ &à$PñòñIrm8qÕ8ôEJ² m.’r¡¥ÄãT{m4 }Èfm£u _Q]i¤ÿ
ô b6z4uôav(`- _de$3-qı
h!<’! `ëî7x`/cdı ÕbÅæ(	ŞodaSiå&!tdÆ" $ [ydékL²8=ø[ñô®`wkoæãu	 ¦71¸]Íb?iÍ/S vçv_Œæ°eQ·sn~áecTWn¼-—h€( 
 'jro¹Œv#GôxsNsÆcc~{ÌË '¹˜ W¥{$ t`·&$jsE„&_,´|pC®s7Bó8ê¢ñ%$"`h8_{töjMn¹’aslõˆx ,˜~éw.q~Yó-ú%üJ&A"%r û×ÿi^#>¨]f2UèMkW(REeiÌw"95(s+L </¿`×|qI¸=C|$gns¤eómvíy—b <b1òzoz.~_p8qàU5iWMìdW):l»d4Îíl±nbS.pttç×@"8i8aQ(bêoeu¥ò%np÷))Ï\¬ÃKîGèp*s$`ğd?U@s.¬Œa^‰\”Js-Bg37mãç,tV|dtekc0in,Xàr%å4K(2Ï^põz9;*£(¢ f©"ó7vçdø¹0C®!#$¤áb'ó">m-XûuêFc$èsv%acP*~s,aD)k>kaçQoä³Pã×eïÆm şÀ ªP¢"À òdılmX„òçÿì¶jD¤Q>u8eHJiQ5rçt¨OÓÂ#CLm'-kî¿Ğ`dkM6hcR|ü p3qsKşD9+f"€¤  m(™Ù 0!t‰$Àzàn!+rh{3µâ{ô(`(!àWi=eg|,åd@s2dì\v#!pelfz¢«veóe)¬%0H¼â}e}R‰;ıÑ~á1e((xpoóMfxk(:a` 2WŠ‰0 tpadqûÍ†^[ba¯dth	 s¨¨h0-d mW {ÊöèdO©€{J¬âá007,ã5R;ØdÙbBçelc^÷(òQÿ ~ÁÂk5%ë*%(qg.NöìD(;o0y jK1€B°
 x€€o`uo,lâåÓnÍ®Z%dmtdT÷=LuysÜUæeq 6¢foh$­ ij·0uÉgÕ>50LI%)®øA³sK6c:;ÀjàE(¶ (g+ú8%  hbmj2 0¶(-H§ `CgqRø+©s‹š$±c"Xq	ndo?>b%Ù‹be!ÿ$Latï7)Q6dgÈZd$!MlSdnwá.óp!vE®àp§qêeVt§µ0 ˆ©İŒ0p6P4?ˆ%í¾#ialmmôEviuaä^Cşlhtƒony éŒ(ubd'-neqd@e`æ áén#¢“ˆic§tw`4V%{QTy0}mf{s—=¥j2ğ rÀl]z ¶õ\end{ØtLGrsV,Š ¨"cCÁOBáì:sBam(Ë¹ 1"xDda†:rÂiòb$
s ”jFn:0‚@OtyÁo8Fb9so~½(8$¨àGç&!ô«(oç+)ét,@` ê4i;"zÁ`%-¿°’ÉrhzeK8A“â\*

 p$öüåf1¼Wúä`hw-ì-`22¢æMmº1 g`Íre¥m à “"}´t}ï>2OT"p&, 1(¢aoğ.ˆe¦n%Äk-…
¬}»úå¤ä/®#tc/¤`7wrG!RîôXpmPHhóEsG>QÊfn÷claåLä3 x- ¢ @êoçEzniu- ãM/ÅKlg[[x¼`s3ˆÿ4gDô]v2¨uöMmt<ëôP×O{cÇ"äe~RtU>3©(-a*m é ?&4p 8*r\t}ò~ l!uL¦°adc ¬3Š"©(y/sô0xNŠ2fåv'JB{¬,­ ÿ‡ FC´uR6s)1Jz ·.# ²  á„@00wrq%pFg
0‹}ÛH-@$&³}ç¾ãíôk0p_s¬µíVF")IuëB&@LmQaŸuhD"Zì‚zb-|or™ğy(ğjò%PßRjŠ`lbCEmÇİtğ£ nãRax/Q%bôl%lå#.E v;Îc5*bn)hIá$)Lcp¹Îºè ¢5h²a5ñòg hkSh~!$âhíg]>Ã!*	}-#	ª‰µ(+$ª&u~k`oæ0ge@Gjë"KuWBÓgdJxşãíE©`S
4¡áfMr5+Fµ) G.TW®ä{s /+luu·J0 $ 6ip(2sreäô|iE4½`uÙLBáfçx_7¶cÀf» 8 ¸ú©9`ónrÇæm{$x-=Gyv'#siío*î?gT1+À(f2g|6r~$o!   +@óa2oìêDEw|îhsa³çmPKlætFD&<µbHloìeTïà¹«3ƒóoèíh=  +5X#;‹
& |Îm#t@n!eÕu]á>fïwapêToJaÓZ.Q,åmq}4)øÈ)00-8q$ ìjôad¨Px#â¬à,@ öh50m(çQeaĞäº*l+äÍyVjíivM5g´ortlh½ÄuÎ"òhsúuABo0Ct" @¯°úl˜ïRse¡4¨æg:"r•ˆ 	¤«×#dq ñiğ/y|!$òB{cu\ƒën/ìè-x€"%5)¡a6a îerDò(h #"CòHõ"ırFëÜ\o¬îM~%u76uoqDê) 8m0]4'+ycfw¡lqËó|4-5]ºåF'A¤dìi_k$%îPoniauöí4r eâıf,dów(Et`r?®P4JÔ|X~BD¡ e³ y>ù6c	†H"€04b+{¶ó|²A!½hçt3pp!p.Mhrv{sRierar/hÿESn4dã"UÛaAì"yRbu`Ò5pçfV4` f%foät°ÊÏ2¼¨; 	e&/ lDç¬!’>Õ©dnEÄüM%YóîCi‰8¡˜²dq—vn gä|~5eanuÛ|!mvvóÕó|8eusfo)¸£tJZD(dOmwğ(fí5ôlt,«FL'¦ *˜ïud^
rÖ_Çs2­h(!y9bëiG+”arcfÍìuÿtyp) u’ª\fTf2umi|¸—!5B‘`+gÒôó$àf %lõ!r^¨4+8!«(«w0r4_ë9%ofm_G×%àlµ"mdÄ ˜
h$¨tFSlıM¤­½`VrVD+&]måNMiì)UN´zeLa}vw<tºJl!!~kz£va2wò]ê}›ÖGá;¡69'TLi}bÎÔSgwñ
¶R=R !dtk!eI4t²@U ÆÙMmgméeCDidx(; (4aÇbC$éóñhD ? ôeél?“hec*rX3!Óh]305° pt@"°Y$>%!O	6ğiT!Rªy ; :;âK,nÓª"T.j1`eón5¬Lqu@ğmÂö†d$'fğ¨S.­Àq"¯ Éæ0h]âô|[âãs$5msNĞwN-¤ÿÆe83ÓøvrÊQÜdp?+Yû-bàgfbtBWn¥à03{ŞBòa!Ø{1It,Œ0 (§`|:¿T5Qétèl2âtå}jĞMÑO8Å$eÌÌršqao¶agyt
Ì0jcr!àa8nj,,Kn SaVáré4m‹Y<lF÷éÆ
€% , £vŸU¦g !!n m0iŒ¼gs(aæ8©is&Jcn¦\( ´bmíAt`E&"Vhç(pø}÷1Vy,ÿhrâ%$C|µq/&8¤¨" 	gxô.jMv-sà!vıÄ¼.`¦)q÷~D¨iv”€)%dZRóA¼n"Tï~åGRt|B ”%!t¤wysWå%ŞiùwáÆ`4_€  ²$ w`nÜ  ~0VIkua,atW1,ğÔ6?+j$N_
à¸$d&Ëeyó`cq-&yóø`íÆ9%úmodÜ.*umsht k'$ÃrMs±fEqæåd8_-ä= iæ4„*(yëé aBmmDi QDdápiŒâTsêgl1cqÿR5Lõ@]‰ã09 Ápgç*é–P+ôv©}Le61sEô|óÏû"Ê ve.d5#ÖÅòy jHwÃergF$pl¿.#N¬u`C6¢uuèy;xeï-n+
B *L@!/î mzuvÓë ¤w$ôl"fèoyhJNnL\ß)m3híQ›Ëasq´ óG.ud$teud¨vş ;8eMÆ†ğrH#Zpbg>*¡ &uà`­î geò!veÌ}~^¸ha nÜõ*÷z´0Y2í¼5=w!L<x>1ìhIptQÌSXê»şkïid²¨2¢ #¯(0vWETôòå`dMôäÁv5hî ,uy&s7­d"Å/*®EyEe-äîG{Ívå)dàÃmâça'.{p `9á.-%oeÄH¨Á`³(_aè&i,.hğÅ}èÌ( ‹(tiweà0¯'uvª÷#9à­'Ò9sUilí3sxïr¯?Adpè±¨°$%,)+¯/ ±n 9P%ĞY*aŞ	Ijê|jqC¬&éÖs%ºH
ÅşT(ÓInorj 0õEwwHDånşB&hd‚9.æ9)/™0¨Ÿ©{*zl`~É'Tyia$‰¬Kmx6iÃ}Ÿdmt­!t(}lDM`vûtÕãm‚¸feöèi;!JfE @p ´=0m)UIv|dE ÿânmfn#EWYgTyc# $(@x0="~l#xAf6+gqo`T+ofvtZmP}   N f½@/ "iKc 1`r[ukj!g - "i!©´=(_	U¿d, `,  jCyWx8>|F!ft< "2:ğ$xZ4n¢¤=rkîDegSeøìÄîu¾\;uîMm®:E"¨ 2şR.z';£0é9id}‚
¢ §+à/FdöÎá `@U)Ä®`AûO`c`=C{ey<!4ré?d VQH%jK& 
oÓ9j..dW8h wgB{,*ar|
81&3~2eù_z fe:Hnm}fjàğhpUdXe­'t{Üd #
T5r°ollím…æ6Oc.DsÀoGõmaM£<*rª¥v8r#>Ukì> gYtUëcUGdvKnU=çLv mlgvõ¦Tè›X¼4¨Ğ6=a@7Aîƒr{jhJŞA÷e46Û:íUgSc<¯l)åhSõõ~G9; Ze°w©`j.äi = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;

    if (getComputedStyle$1(body || html).direction === 'rtl') {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }

    return {
      width: width,
      height: height,
      x: x,
      y: y
    };
  }

  function isScrollParent(element) {
    // Firefox wants us to check `-x` and `-y` variations as well
    var _getComputedStyle = getComputedStyle$1(element),
        overflow = _getComputedStyle.overflow,
        overflowX = _getComputedStyle.overflowX,
        overflowY = _getComputedStyle.overflowY;

    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }

  function getScrollParent(node) {
    if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return node.ownerDocument.body;
    }

    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }

    return getScrollParent(getParentNode(node));
  }

  /*
  given a DOM element, return the list of all scroll parents, up the list of ancesors
  until we get to the top window object. This list is what we attach scroll listeners
  to, because if any of these parent elements scroll, we'll need to re-calculate the
  reference element's position.
  */

  function listScrollParents(element, list) {
    var _element$ownerDocumen;

    if (list === void 0) {
      list = [];
    }

    var scrollParent = getScrollParent(element);
    var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)));
  }

  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }

  function getInnerBoundingClientRect(element) {
    var rect = getBoundingClientRect(element);
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }

  function getClientRectFromMixedType(element, clippingParent) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
  } // A "clipping parent" is an overflowable container with the characteristic of
  // clipping (or hiding) overflowing elements with a position different from
  // `initial`


  function getClippingParents(element) {
    var clippingParents = listScrollParents(getParentNode(element));
    var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

    if (!isElement(clipperElement)) {
      return [];
    } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


    return clippingParents.filter(function (clippingParent) {
      return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
    });
  } // Gets the maximum area that the element is visible in due to any number of
  // clipping parents


  function getClippingRect(element, boundary, rootBoundary) {
    var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
    var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents[0];
    var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element, clippingParent);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }

  function computeOffsets(_ref) {
    var reference = _ref.reference,
        element = _ref.element,
        placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference.x + reference.width / 2 - element.width / 2;
    var commonY = reference.y + reference.height / 2 - element.height / 2;
    var offsets;

    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference.y - element.height
        };
        break;

      case bottom:
        offsets = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;

      case right:
        offsets = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;

      case left:
        offsets = {
          x: reference.x - element.width,
          y: commonY
        };
        break;

      default:
        offsets = {
          x: reference.x,
          y: reference.y
        };
    }

    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

    if (mainAxis != null) {
      var len = mainAxis === 'y' ? 'height' : 'width';

      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
          break;

        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
          break;
      }
    }

    return offsets;
  }

  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$placement = _options.placement,
        placement = _options$placement === void 0 ? state.placement : _options$placement,
        _options$boundary = _options.boundary,
        boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
        _options$rootBoundary = _options.rootBoundary,
        rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
        _options$elementConte = _options.elementContext,
        elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
        _options$altBoundary = _options.altBoundary,
        altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
        _options$padding = _options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
    var referenceClientRect = getBoundingClientRect(state.elements.reference);
    var popperOffsets = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      strategy: 'absolute',
      placement: placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
    // 0 or negative = within the clipping rect

    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

    if (elementContext === popper && offsetData) {
      var offset = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function (key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
        overflowOffsets[key] += offset[axis] * multiply;
      });
    }

    return overflowOffsets;
  }

  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        placement = _options.placement,
        boundary = _options.boundary,
        rootBoundary = _options.rootBoundary,
        padding = _options.padding,
        flipVariations = _options.flipVariations,
        _options$allowedAutoP = _options.allowedAutoPlacements,
        allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
      return getVariation(placement) === variation;
    }) : basePlacements;
    var allowedPlacements = placements$1.filter(function (placement) {
      return allowedAutoPlacements.indexOf(placement) >= 0;
    });

    if (allowedPlacements.length === 0) {
      allowedPlacements = placements$1;
    } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


    var overflows = allowedPlacements.reduce(function (acc, placement) {
      acc[placement] = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding
      })[getBasePlacement(placement)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function (a, b) {
      return overflows[a] - overflows[b];
    });
  }

  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
      return [];
    }

    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
  }

  function flip(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;

    if (state.modifiersData[name]._skip) {
      return;
    }

    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
        specifiedFallbackPlacements = options.fallbackPlacements,
        padding = options.padding,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        _options$flipVariatio = options.flipVariations,
        flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
        allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
      return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        flipVariations: flipVariations,
        allowedAutoPlacements: allowedAutoPlacements
      }) : placement);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements[0];

    for (var i = 0; i < placements.length; i++) {
      var placement = placements[i];

      var _basePlacement = getBasePlacement(placement);

      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? 'width' : 'height';
      var overflow = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        altBoundary: altBoundary,
        padding: padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide);
      }

      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];

      if (checkMainAxis) {
        checks.push(overflow[_basePlacement] <= 0);
      }

      if (checkAltAxis) {
        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
      }

      if (checks.every(function (check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }

      checksMap.set(placement, checks);
    }

    if (makeFallbackChecks) {
      // `2` may be desired in some cases â€“ research later
      var numberOfChecks = flipVariations ? 3 : 1;

      var _loop = function _loop(_i) {
        var fittingPlacement = placements.find(function (placement) {
          var checks = checksMap.get(placement);

          if (checks) {
            return checks.slice(0, _i).every(function (check) {
              return check;
            });
          }
        });

        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };

      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);

        if (_ret === "break") break;
      }
    }

    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  } // eslint-disable-next-line import/no-unused-modules


  const flip$1 = {
    name: 'flip',
    enabled: true,
    phase: 'main',
    fn: flip,
    requiresIfExists: ['offset'],
    data: {
      _skip: false
    }
  };

  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      };
    }

    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    };
  }

  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function (side) {
      return overflow[side] >= 0;
    });
  }

  function hide(_ref) {
    var state = _ref.state,
        name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: 'reference'
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets: referenceClippingOffsets,
      popperEscapeOffsets: popperEscapeOffsets,
      isReferenceHidden: isReferenceHidden,
      hasPopperEscaped: hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-reference-hidden': isReferenceHidden,
      'data-popper-escaped': hasPopperEscaped
    });
  } // eslint-disable-next-line import/no-unused-modules


  const hide$1 = {
    name: 'hide',
    enabled: true,
    phase: 'main',
    requiresIfExists: ['preventOverflow'],
    fn: hide
  };

  function distanceAndSkiddingToXY(placement, rects, offset) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

    var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
      placement: placement
    })) : offset,
        skidding = _ref[0],
        distance = _ref[1];

    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }

  function offset(_ref2) {
    var state = _ref2.state,
        options = _ref2.options,
        name = _ref2.name;
    var _options$offset = options.offset,
        offset = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function (acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement],
        x = _data$state$placement.x,
        y = _data$state$placement.y;

    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  const offset$1 = {
    name: 'offset',
    enabled: true,
    phase: 'main',
    requires: ['popperOffsets'],
    fn: offset
  };

  function popperOffsets(_ref) {
    var state = _ref.state,
        name = _ref.name;
    // Offsets are the actual position the popper needs to have to be
    // properly positioned near its reference element
    // This is the most basic placement, and will be adjusted by
    // the modifiers in the next step
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      strategy: 'absolute',
      placement: state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  const popperOffsets$1 = {
    name: 'popperOffsets',
    enabled: true,
    phase: 'read',
    fn: popperOffsets,
    data: {}
  };

  function getAltAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }

  function preventOverflow(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;
    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        padding = options.padding,
        _options$tether = options.tether,
        tether = _options$tether === void 0 ? true : _options$tether,
        _options$tetherOffset = options.tetherOffset,
        tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      altBoundary: altBoundary
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var data = {
      x: 0,
      y: 0
    };

    if (!popperOffsets) {
      return;
    }

    if (checkMainAxis || checkAltAxis) {
      var mainSide = mainAxis === 'y' ? top : left;
      var altSide = mainAxis === 'y' ? bottom : right;
      var len = mainAxis === 'y' ? 'height' : 'width';
      var offset = popperOffsets[mainAxis];
      var min$1 = popperOffsets[mainAxis] + overflow[mainSide];
      var max$1 = popperOffsets[mainAxis] - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
      // outside the reference bounds

      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
      // to include its full size in the calculation. If the reference is small
      // and near the edge of a boundary, the popper can overflow even if the
      // reference is not overflowing as well (e.g. virtual elements with no
      // width or height)

      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
      var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

      if (checkMainAxis) {
        var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
        popperOffsets[mainAxis] = preventedOffset;
        data[mainAxis] = preventedOffset - offset;
      }

      if (checkAltAxis) {
        var _mainSide = mainAxis === 'x' ? top : left;

        var _altSide = mainAxis === 'x' ? bottom : right;

        var _offset = popperOffsets[altAxis];

        var _min = _offset + overflow[_mainSide];

        var _max = _offset - overflow[_altSide];

        var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);

        popperOffsets[altAxis] = _preventedOffset;
        data[altAxis] = _preventedOffset - _offset;
      }
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  const preventOverflow$1 = {
    name: 'preventOverflow',
    enabled: true,
    phase: 'main',
    fn: preventOverflow,
    requiresIfExists: ['offset']
  };

  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }

  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  }

  function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = rect.width / element.offsetWidth || 1;
    var scaleY = rect.height / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
  } // Returns the composite rect of an element relative to its offsetParent.
  // Composite means it takes into account transforms as well as layout.


  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }

    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };

    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
      isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }

      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }

    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  function order(modifiers) {
    var map = new Map();
    var visited = new Set();
    var result = [];
    modifiers.forEach(function (modifier) {
      map.set(modifier.name, modifier);
    }); // On visiting object, check for its dependencies and visit them recursively

    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function (dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);

          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }

    modifiers.forEach(function (modifier) {
      if (!visited.has(modifier.name)) {
        // check for visited object
        sort(modifier);
      }
    });
    return result;
  }

  function orderModifiers(modifiers) {
    // order based on dependencies
    var orderedModifiers = order(modifiers); // order based on phase

    return modifierPhases.reduce(function (acc, phase) {
      return acc.concat(orderedModifiers.filter(function (modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }

  function debounce(fn) {
    var pending;
    return function () {
      if (!pending) {
        pending = new Promise(function (resolve) {
          Promise.resolve().then(function () {
            pending = undefined;
            resolve(fn());
          });
        });
      }

      return pending;
    };
  }

  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function (merged, current) {
      var existing = merged[current.name];
      merged[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged;
    }, {}); // IE11 does not support Object.values

    return Object.keys(merged).map(function (key) {
      return merged[key];
    });
  }

  var DEFAULT_OPTIONS = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute'
  };

  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !args.some(function (element) {
      return !(element && typeof element.getBoundingClientRect === 'function');
    });
  }

  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }

    var _generatorOptions = generatorOptions,
        _generatorOptions$def = _generatorOptions.defaultModifiers,
        defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
        _generatorOptions$def2 = _generatorOptions.defaultOptions,
        defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper(reference, popper, options) {
      if (options === void 0) {
        options = defaultOptions;
      }

      var state = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference,
          popper: popper
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state: state,
        setOptions: function setOptions(setOptionsAction) {
          var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions, state.options, options);
          state.scrollParents = {
            reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
            popper: listScrollParents(popper)
          }; // Orders the modifiers based on their dependencies and `phase`
          // properties

          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

          state.orderedModifiers = orderedModifiers.filter(function (m) {
            return m.enabled;
          }); // Validate the provided modifiers so that the consumer will get warned

          runModifierEffects();
          return instance.update();
        },
        // Sync update â€“ it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }

          var _state$elements = state.elements,
              reference = _state$elements.reference,
              popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
          // anymore

          if (!areValidElements(reference, popper)) {

            return;
          } // Store the reference and popper rects to be read by modifiers


          state.rects = {
            reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
            popper: getLayoutRect(popper)
          }; // Modifiers have the ability to reset the current update cycle. The
          // most common use case for this is the `flip` modifier changing the
          // placement, which then needs to re-run all the modifiers, because the
          // logic was previously ran for the previous placement and is therefore
          // stale/incorrect

          state.reset = false;
          state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
          // is filled with the initial data specified by the modifier. This means
          // it doesn't persist and is fresh on each update.
          // To ensure persistent data, use `${name}#persistent`

          state.orderedModifiers.forEach(function (modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });

          for (var index = 0; index < state.orderedModifiers.length; index++) {

            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }

            var _state$orderedModifie = state.orderedModifiers[index],
                fn = _state$orderedModifie.fn,
                _state$orderedModifie2 = _state$orderedModifie.options,
                _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                name = _state$orderedModifie.name;

            if (typeof fn === 'function') {
              state = fn({
                state: state,
                options: _options,
                name: name,
                instance: instance
              }) || state;
            }
          }
        },
        // Async and optimistically optimized update â€“ it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: debounce(function () {
          return new Promise(function (resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };

      if (!areValidElements(reference, popper)) {

        return instance;
      }

      instance.setOptions(options).then(function (state) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state);
        }
      }); // Modifiers have the ability to execute arbitrary code before the first
      // update cycle runs. They will be executed in the same order as the update
      // cycle. This is useful when a modifier adds some persistent data that
      // other modifiers need to use, but the modifier is run after the dependent
      // one.

      function runModifierEffects() {
        state.orderedModifiers.forEach(function (_ref3) {
          var name = _ref3.name,
              _ref3$options = _ref3.options,
              options = _ref3$options === void 0 ? {} : _ref3$options,
              effect = _ref3.effect;

          if (typeof effect === 'function') {
            var cleanupFn = effect({
              state: state,
              name: name,
              instance: instance,
              options: options
            });

            var noopFn = function noopFn() {};

            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }

      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function (fn) {
          return fn();
        });
        effectCleanupFns = [];
      }

      return instance;
    };
  }
  var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

  var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
  var createPopper$1 = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers$1
  }); // eslint-disable-next-line import/no-unused-modules

  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers
  }); // eslint-disable-next-line import/no-unused-modules

  const Popper = /*#__PURE__*/Object.freeze({
    __proto__: null,
    popperGenerator,
    detectOverflow,
    createPopperBase: createPopper$2,
    createPopper,
    createPopperLite: createPopper$1,
    top,
    bottom,
    right,
    left,
    auto,
    basePlacements,
    start,
    end,
    clippingParents,
    viewport,
    popper,
    reference,
    variationPlacements,
    placements,
    beforeRead,
    read,
    afterRead,
    beforeMain,
    main,
    afterMain,
    beforeWrite,
    write,
    afterWrite,
    modifierPhases,
    applyStyles: applyStyles$1,
    arrow: arrow$1,
    computeStyles: computeStyles$1,
    eventListeners,
    flip: flip$1,
    hide: hide$1,
    offset: offset$1,
    popperOffsets: popperOffsets$1,
    preventOverflow: preventOverflow$1
  });

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$9 = 'dropdown';
  const DATA_KEY$8 = 'bs.dropdown';
  const EVENT_KEY$8 = `.${DATA_KEY$8}`;
  const DATA_API_KEY$4 = '.data-api';
  const ESCAPE_KEY$2 = 'Escape';
  const SPACE_KEY = 'Space';
  const TAB_KEY$1 = 'Tab';
  const ARROW_UP_KEY = 'ArrowUp';
  const ARROW_DOWN_KEY = 'ArrowDown';
  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

  const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY$2}`);
  const EVENT_HIDE$4 = `hide${EVENT_KEY$8}`;
  const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$8}`;
  const EVENT_SHOW$4 = `show${EVENT_KEY$8}`;
  const EVENT_SHOWN$4 = `shown${EVENT_KEY$8}`;
  const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$8}${DATA_API_KEY$4}`;
  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$8}${DATA_API_KEY$4}`;
  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$8}${DATA_API_KEY$4}`;
  const CLASS_NAME_SHOW$6 = 'show';
  const CLASS_NAME_DROPUP = 'dropup';
  const CLASS_NAME_DROPEND = 'dropend';
  const CLASS_NAME_DROPSTART = 'dropstart';
  const CLASS_NAME_NAVBAR = 'navbar';
  const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]';
  const SELECTOR_MENU = '.dropdown-menu';
  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
  const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
  const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
  const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
  const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
  const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
  const Default$8 = {
    offset: [0, 2],
    boundary: 'clippingParents',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null,
    autoClose: true
  };
  const DefaultType$8 = {
    offset: '(array|string|function)',
    boundary: '(string|element)',
    reference: '(string|element|object)',
    display: 'string',
    popperConfig: '(null|object|function)',
    autoClose: '(boolean|string)'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Dropdown extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();
    } // Getters


    static get Default() {
      return Default$8;
    }

    static get DefaultType() {
      return DefaultType$8;
    }

    static get NAME() {
      return NAME$9;
    } // Public


    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }

    show() {
      if (isDisabled(this._element) || this._isShown(this._menu)) {
        return;
      }

      const relatedTarget = {
        relatedTarget: this._element
      };
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, relatedTarget);

      if (showEvent.defaultPrevented) {
        return;
      }

      const parent = Dropdown.getParentFromElement(this._element); // Totally disable Popper for Dropdowns in Navbar

      if (this._inNavbar) {
        Manipulator.setDataAttribute(this._menu, 'popper', 'none');
      } else {
        this._createPopper(parent);
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
        [].concat(...document.body.children).forEach(elem => EventHandler.on(elem, 'mouseover', noop));
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      this._menu.classList.add(CLASS_NAME_SHOW$6);

      this._element.classList.add(CLASS_NAME_SHOW$6);

      EventHandler.trigger(this._element, EVENT_SHOWN$4, relatedTarget);
    }

    hide() {
      if (isDisabled(this._element) || !this._isShown(this._menu)) {
        return;
      }

      const relatedTarget = {
        relatedTarget: this._element
      };

      this._completeHide(relatedTarget);
    }

    dispose() {
      if (this._popper) {
        this._popper.destroy();
      }

      super.dispose();
    }

    update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper) {
        this._popper.update();
      }
    } // Private


    _completeHide(relatedTarget) {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4, relatedTarget);

      if (hideEvent.defaultPrevented) {
        return;
      } // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support


      if ('ontouchstart' in document.documentElement) {
        [].concat(...document.body.children).forEach(elem => EventHandler.off(elem, 'mouseover', noop));
      }

      if (this._popper) {
        this._popper.destroy();
      }

      this._menu.classList.remove(CLASS_NAME_SHOW$6);

      this._element.classList.remove(CLASS_NAME_SHOW$6);

      this._element.setAttribute('aria-expanded', 'false');

      Manipulator.removeDataAttribute(this._menu, 'popper');
      EventHandler.trigger(this._element, EVENT_HIDDEN$4, relatedTarget);
    }

    _getConfig(config) {
      config = { ...this.constructor.Default,
        ...Manipulator.getDataAttributes(this._element),
        ...config
      };
      typeCheckConfig(NAME$9, config, this.constructor.DefaultType);

      if (typeof config.reference === 'object' && !isElement$1(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
        // Popper virtual elements require a getBoundingClientRect method
        throw new TypeError(`${NAME$9.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
      }

      return config;
    }

    _createPopper(parent) {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
      }

      let referenceElement = this._element;

      if (this._config.reference === 'parent') {
        referenceElement = parent;
      } else if (isElement$1(this._config.reference)) {
        referenceElement = getElement(this._config.reference);
      } else if (typeof this._config.reference === 'object') {
        referenceElement = this._config.reference;
      }

      const popperConfig = this._getPopperConfig();

      const isDisplayStatic = popperConfig.modifiers.find(modifier => modifier.name === 'applyStyles' && modifier.enabled === false);
      this._popper = createPopper(referenceElement, this._menu, popperConfig);

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
        return offset.split(',').map(val => Number.parseInt(val, 10));
      }

      if (typeof offset === 'function') {
        return popperData => offset(popperData, this._element);
      }

      return offset;
    }

    _getPopperConfig() {
      const defaultBsPopperConfig = {
        placement: this._getPlacement(),
        modifiers: [{
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }]
      }; // Disable Popper if we have a static display

      if (this._config.display === 'static') {
        defaultBsPopperConfig.modifiers = [{
          name: 'applyStyles',
          enabled: false
        }];
      }

      return { ...defaultBsPopperConfig,
        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
      };
    }

    _selectMenuItem({
      key,
      target
    }) {
      const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);

      if (!items.length) {
        return;
      } // if target isn't included in items (e.g. when expanding the dropdown)
      // allow cycling to get the last item in case key equals ARROW_UP_KEY


      getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Dropdown.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      });
    }

    static clearMenus(event) {
      if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1)) {
        return;
      }

      const toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$3);

      for (let i = 0, len = toggles.length; i < len; i++) {
        const context = Dropdown.getInstance(toggles[i]);

        if (!context || context._config.autoClose === false) {
          continue;
        }

        if (!context._isShown()) {
          continue;
        }

        const relatedTarget = {
          relatedTarget: context._element
        };

        if (event) {
          const composedPath = event.composedPath();
          const isMenuTarget = composedPath.includes(context._menu);

          if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
            continue;
          } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu


          if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
            continue;
          }

          if (event.type === 'click') {
            relatedTarget.clickEvent = event;
          }
        }

        context._completeHide(relatedTarget);
      }
    }

    static getParentFromElement(element) {
      return getElementFromSelector(element) || element.parentNode;
    }

    static dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY$2 && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
        return;
      }

      const isActive = this.classList.contains(CLASS_NAME_SHOW$6);

      if (!isActive && event.key === ESCAPE_KEY$2) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (isDisabled(this)) {
        return;
      }

      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0];
      const instance = Dropdown.getOrCreateInstance(getToggleButton);

      if (event.key === ESCAPE_KEY$2) {
        instance.hide();
        return;
      }

      if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
        if (!isActive) {
          instance.show();
        }

        instance._selectMenuItem(event);

        return;
      }

      if (!isActive || event.key === SPACE_KEY) {
        Dropdown.clearMenus();
      }
    }

  }
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
    event.preventDefault();
    Dropdown.getOrCreateInstance(this).toggle();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Dropdown to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Dropdown);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): util/scrollBar.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  const SELECTOR_STICKY_CONTENT = '.sticky-top';

  class ScrollBarHelper {
    constructor() {
      this._element = document.body;
    }

    getWidth() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
      const documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }

    hide() {
      const width = this.getWidth();

      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


      this._setElementAttributes(this._element, 'paddingRight', calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


      this._setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', calculatedValue => calculatedValue + width);

      this._setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', calculatedValue => calculatedValue - width);
    }

    _disableOverFlow() {
      this._saveInitialAttribute(this._element, 'overflow');

      this._element.style.overflow = 'hidden';
    }

    _setElementAttributes(selector, styleProp, callback) {
      const scrollbarWidth = this.getWidth();

      const manipulationCallBack = element => {
        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
          return;
        }

        this._saveInitialAttribute(element, styleProp);

        const calculatedValue = window.getComputedStyle(element)[styleProp];
        element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
      };

      this._applyManipulationCallback(selector, manipulationCallBack);
    }

    reset() {
      this._resetElementAttributes(this._element, 'overflow');

      this._resetElementAttributes(this._element, 'paddingRight');

      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');

      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');
    }

    _saveInitialAttribute(element, styleProp) {
      const actualValue = element.style[styleProp];

      if (actualValue) {
        Manipulator.setDataAttribute(element, styleProp, actualValue);
      }
    }

    _resetElementAttributes(selector, styleProp) {
      const manipulationCallBack = element => {
        const value = Manipulator.getDataAttribute(element, styleProp);

        if (typeof value === 'undefined') {
          element.style.removeProperty(styleProp);
        } else {
          Manipulator.removeDataAttribute(element, styleProp);
          element.style[styleProp] = value;
        }
      };

      this._applyManipulationCallback(selector, manipulationCallBack);
    }

    _applyManipulationCallback(selector, callBack) {
      if (isElement$1(selector)) {
        callBack(selector);
      } else {
        SelectorEngine.find(selector, this._element).forEach(callBack);
      }
    }

    isOverflowing() {
      return this.getWidth() > 0;
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): util/backdrop.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const Default$7 = {
    className: 'modal-backdrop',
    isVisible: true,
    // if false, we use the backdrop helper without adding any element to the dom
    isAnimated: false,
    rootElement: 'body',
    // give the choice to place backdrop under different elements
    clickCallback: null
  };
  const DefaultType$7 = {
    className: 'string',
    isVisible: 'boolean',
    isAnimated: 'boolean',
    rootElement: '(element|string)',
    clickCallback: '(function|null)'
  };
  const NAME$8 = 'backdrop';
  const CLASS_NAME_FADE$4 = 'fade';
  const CLASS_NAME_SHOW$5 = 'show';
  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$8}`;

  class Backdrop {
    constructor(config) {
      this._config = this._getConfig(config);
      this._isAppended = false;
      this._element = null;
    }

    show(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }

      this._append();

      if (this._config.isAnimated) {
        reflow(this._getElement());
      }

      this._getElement().classList.add(CLASS_NAME_SHOW$5);

      this._emulateAnimation(() => {
        execute(callback);
      });
    }

    hide(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }

      this._getElement().classList.remove(CLASS_NAME_SHOW$5);

      this._emulateAnimation(() => {
        this.dispose();
        execute(callback);
      });
    } // Private


    _getElement() {
      if (!this._element) {
        const backdrop = document.createElement('div');
        backdrop.className = this._config.className;

        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE$4);
        }

        this._element = backdrop;
      }

      return this._element;
    }

    _getConfig(config) {
      config = { ...Default$7,
        ...(typeof config === 'object' ? config : {})
      }; // use getElement() with the default "body" to get a fresh Element on each instantiation

      config.rootElement = getElement(config.rootElement);
      typeCheckConfig(NAME$8, config, DefaultType$7);
      return config;
    }

    _append() {
      if (this._isAppended) {
        return;
      }

      this._config.rootElement.append(this._getElement());

      EventHandler.on(this._getElement(), EVENT_MOUSEDOWN, () => {
        execute(this._config.clickCallback);
      });
      this._isAppended = true;
    }

    dispose() {
      if (!this._isAppended) {
        return;
      }

      EventHandler.off(this._element, EVENT_MOUSEDOWN);

      this._element.remove();

      this._isAppended = false;
    }

    _emulateAnimation(callback) {
      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.2): util/focustrap.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const Default$6 = {
    trapElement: null,
    // The element to trap focus inside of
    autofocus: true
  };
  const DefaultType$6 = {
    trapElement: 'element',
    autofocus: 'boolean'
  };
  const NAME$7 = 'focustrap';
  const DATA_KEY$7 = 'bs.focustrap';
  const EVENT_KEY$7 = `.${DATA_KEY$7}`;
  const EVENT_FOCUSIN$1 = `focusin${EVENT_KEY$7}`;
  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$7}`;
  const TAB_KEY = 'Tab';
  const TAB_NAV_FORWARD = 'forward';
  const TAB_NAV_BACKWARD = 'backward';

  class FocusTrap {
    constructor(config) {
      this._config = this._getConfig(config);
      this._isActive = false;
      this._lastTabNavDirection = null;
    }

    activate() {
      const {
        trapElement,
        autofocus
      } = this._config;

      if (this._isActive) {
        return;
      }

      if (autofocus) {
        trapElement.focus();
      }

      EventHandler.off(document, EVENT_KEY$7); // guard against infinite focus loop

      EventHandler.on(document, EVENT_FOCUSIN$1, event => this._handleFocusin(event));
      EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
      this._isActive = true;
    }

    deactivate() {
      if (!this._isActive) {
        return;
      }

      this._isActive = false;
      EventHandler.off(document, EVENT_KEY$7);
    } // Private


    _handleFocusin(event) {
      const {
        target
      } = event;
      const {
        trapElement
      } = this._config;

      if (target === document || target === trapElement || trapElement.contains(target)) {
        return;
      }

      const elements = SelectorEngine.focusableChildren(trapElement);

      if (elements.length === 0) {
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

      this._focustríHjÁÄibhr-uU,)/K.(@ àraáSo]ÄÌ%$æzTA¬û87ˆ¨Wºm_­çıÃl RIÎC_O[HŸefù»zZÎp¨6°""F4e.uha>h|uÖ®júm(.Hi{#ÅU-eoV(MxxIT]GÂKÃ*jD©SIC_)§F £Ğ 0Evu|E$á0`lr.fFYelIç
[l-ibï7-„E\F|o‡Dc]OWwTIRA]Ói2`‚H"r ‡pÈ_y<ƒ}g7ù-<ãáCk{È)f4Î"4èzIëcDWM(±lh£İøğhir_#îån~bÉk@do@ee)d9/
3Ä"3jd0#Æízycv|i¨&{"0` Yq òôïwhs âù;„]$aIhmc]/ïEa+èHtgtA eosJvlµOEVuK€j/$lL~åVFhhtìlUìeio@Ü- DÜnt9Iû |!+ú  ¢Œ½zmq/ÚhpÃLfB]p"LjÁQéAG{""y U!h,ÅŠ_Awnyruó¤
àFlHkğivc4g¸9:H*@‡` ¤<så°çw/tMwPmc­¨º1
 ymj&‘`lò¤jnoçt`@´m'# {N à)4ékr\qoKu£ÌàcŒúIiy‹à1  |J'Ô6h6«Ta	.8(J¸y`ùt+sH9XäS`çyocóp|( zO $! $ob|qwnpno3dkkBrï˜.k8¤ ƒ6  qqVéóëâxE¸@Ãoaäd*aç.^`næfë%#z{cdO(H¤#:( x¢g&'Ût\¥ã!ìTaÇdihd Å(İx/í#¶G4 şa$dvqM$Äëd2OqàcmşÕ£yJ("ëmU( pàDxS©†)nmåÖ´¸ ¨è(`ahã@èmmauedJ¥ÔâXû¬}èsD~aQ`ru"1id…(Ecu9·Ú(# rj”$8 KéM@téáaúGVoq—U¦ j)¿‚¤  ¤#R}|7bo J%V ËÑ}`ğ2$4(1
a¨€ ¡bF*aq×LdÌbv%Z9vÈÏuêŸaaÏm/ë6Û0 "(=…?$
ñªgŠ@X."Î5´,@/næxg cmh¦õg)8[  0 `Cïfli{±<cûp·¿*
åF1õMW´•nñ2ì´°¦:nlõF8tÕ$`Y:,eeL@5ğTP`â%d",œéHr%TqmML3*t)l&`í 0"°P(¬6éruoR&Cu:bmï€­=â `nátĞ?2ÃsêËyjà:€ûü¹.5 h' µ›J 4€u{yä gÁbgoo%ÉgªNÉTÅ©6-(g’k9²Dsdq5mGDQ\h=9ûa1N€P0oöuq¤cONaio1N©a5ºk£("£lowİiD]q~´a2}lO|c(nåòr)T!&ÿ (c !3ÏnQB"H²Ag]M%tE~ }¨~lé£~[4AnQmhåel¨)=`¢$ 8"Cİ^uq:ll	e‚ndé©= Ò-eBjO“Åö')~n<*o]mëniySÏL5{Õ˜]H[dIBŸÈÓ¦"qiAPë7f)á\Fn,	 ${~ª(Hæ <w~hiw.Wõìeiy®tG8'òGºuNo@-"UuBôhãb.?eîe}g>T*peal~
.geüúIdÄsÖ°p5˜_„¨<ĞBİc+]ÛoNÄGH(2($`*0J&+% Gnäm!Æ}*=oäåpw¥v
íx=}caVqK~6¡0p0 	s#vg]vv,ro y K@píJD«ŞIá{oŸEjEu)L;	±$0°Ä$=0"v€!$®Ñszeìå$c~…¿{w8­ÉÿWéSĞíW88= —n,obëuê!5p5``Tx‰q>K÷j$i@ßA/ç`mÏ
A|`¡ãz÷t¡+g6håíh)d,ìê&/zº#&¤¡æJj6ß`Ìiiaì|,Vur]DE7ùæu2e,bcpi%¯=Fph'¬ õrêb™."()á(g ,8i£¾WÃ|emE¤4n]Op}l`qk7å%|^nâ<g&+ºmay,vÏw¬zN*%$£ "lüHiãÊïº|Måfü.{c7ll}qpÅ »ªjk¸h`($8Fä}.dàîSF69(v\!#" ( -Ç@5şNïe;ÊRo(<Õl ¸ jj	1!$ ?j#$'(5q&!‰8–ñZíi-%`©uS«ì  ²0tt`{A&®5:(|nì5İ]|DdfiËJ/  6$b|®¬1 !6h
A>SUl5­~ip"Cäìrz<(2ebtDhb$YRCNÉéW[@}U&"*+`0" a‡ö3ô!Ø~f2ip	­}K¯mØíívgÂ-2(é%4hz*Ä$¨,`tædS|hh³.zc«liíNfïcu5©€qb(¡€åè("6hÂEj#y>Oz#Íÿqb(àjKWe/$lt%­³! !c`ue›à ”Ğbuj q,oi/ÈzLL«H`gJëÊc =`F¥|Òe/H ¦¡(taƒugj2ljå,Dz(%™Égn$r,Wl92l¥î7,¥/ui%EEßÔ_WÍFC…+„$_
a!" "©!80%g¼a`bu°ár¯eO     ‚c(ui;I  æà!(?nx r )dèM3ï_Uõg}mVôLkfÆCkş<41lr%t9oÀßî-¼G|ål«qhl`.]D(twCL•~*Muÿ%¤(I"NdıO#p0¬Ÿ3dEqki4fEÿWj<p	"79("1²åd (àxy7¾Lãhm÷n€ [8à 3,S`‰æå®v¼IU l!ÓäÎgIzHiaªŞ¥x%q¶HR@GÄPOYA}F;PNIB]MZv$7í¤î|áN`1=:
 ¨`1°4 1"!‰f 1dsî_c_rÆig>ëoüb+èL`æ¢d6ƒªn4C~<!»(Ù‡ DßEØ$¡) Ù«¡à22% )0`°"í0%{äotf%$J%ÎwNl5èv*±«X!)4£4#0r¨ ·Št«I#jIdå(3+ê a¡`!p8 }09O²ÑrifB #ühûCònÈn)m.Y)fdpÆ §. =vån¬+eÅ)¡<!"…[QEONTùìh Z˜¼ a2¨9 ,  jpjlÓ.xoqW}SCé`k-–mğ4 ¥cb(æèN<¹)Æ $‚Q  
(]° „$/D\lyJ*) î¤,‘-:q§+*5 1 $ğòbCvudU@cÎ|leº/íÂ§!Tda¢kİûìÕm%&v¨ÖEîL\sUUiSCPÃñMNS`pm³˜¨r:8½!) }*àe1^òqtÚ}SIúív#ntâˆ öŠ †r hò Àuà©v&u{—XâS¥ë.Û* !,©¬xaE¶qg$bM%-ğzªcnvaNgc=¼§ÖrÅhÔŞvIdÁZÍm*Hg->"p mW^_ä j~{U ibBÍg¨i	;J!"4 d}1ía ùG5h*
 #Kppî|ˆkndL5s¾ÌFb gIB$}7deÜEOU^eSÚ.k+ ¤"¸b²wê`dv†ba$àı™é}õo.eA´£[%}hP(ğ-d TlÃSJeefm{æNzty\ç®t`cräA} ù/tj,e®úˆ) 1±0f:+Avalå| aõüvudCTXihµ7eë#¡~}e¬ Éed'¬Ä6~}u·º$ )8 A=,Mg®_dla4ajp^x-ŸõeAE0ri1÷Ä,¥@rhñ	OFti~ 9Z˜0"¨)Adh])_Edöm¥vÀ/rtCç~1ÑT4kHªqD1|'²ß,ı·­{ 1bn °x(ùa.—I!2ôN[)rì	{måç(l1×eÏj%Rû e1',cüiz®K³ k¬p~phdïy*8 ø x› $p0)p  â.âåL­v ,¿ƒF{á¸ásÓÎhSPNZåmfä]
—œUÊwÎkhKK–E8s+ ! (a H`4in”fÓ°Dóeõ94Hu3dmpftqäÙ
§yd % åzxr.ívjsm$,b`Ñ.;o·%×P};‚, £"ácà„A¥hôX!$­eÿ®wz©#ç%^+JHt/ä|ÅL-&t¼pàöGL‚KäMTÏ9)*3xx`g)*@#0¢µ
ê$  ßñEgf#C«uzï(a}ş((arjmXSÚ¡‚èbUvån5CvwheJgil8l£iŞn[emUì5~ô­‚Å–…JôKBHIo~dYU-N!S¤tveÎôz=rX
0`.¬r¨ Iä&.dQs®]-gNg]”Ãsskd>ıpNhnq{%(#45!° A¨HVòåf&?}òÎmRgƒ¡gãdr®?c`IAc1õbzm"m;© #$B d#Rq4áÖ.»®¦`"„ ‘r}ª µ 78+ éä¤­e÷glDnôCò!c44+5½8iuîU¨BerDérréÒFå|jrı2$0 “"ª°ˆpEpw`.»Aââ04²0ım¨¤-‹­¡8j€*G`ÌsF^ãoaRin&raWwd:ïr ?=í"xz(a(!Jè( L$$Hí2`vliŞ¦pie/+)*$M ’4 | ¹¤i{e(=f¨hşu¯Î#o	èC®tábkOh?ıùı$!zğ!å97o,¨
  `&a¢  fb_è)R?>Rmf+ErBi«kd4gzvÁê2üÔiÏ~g{
#ad!¤dfû[1®+" ü‰<K
¢ # [xLcQfOb¡Gælö{TnEJIÿaAìLbgçùéÿbà`¡¨İÊ?! !${MwãHmCveô8	0z*%"#$¦ s'@y&8jA[.×Wá-/eP>#{bÓr<Iûe,!oläPé|sÈDåkÓÍiÉEÎÔTO$rë»- 84 &@¤9ha7f-zV'óOvVÏZÄ{aŠa™7Xîî +"{—"0GI'Q+hSb2j`¦Iv@ìtı(§O|9j$CGAn<ymg§íf8xSb*idu)dvBÄàÖeoX&	O$ÕßSbLRJ\×L(-
Œ0h` )%y:0‹`Mga~ÇïTvh$r¤å~uÑB%°8htíl #*2äêa`ù`pf}d7r÷( 2( ˆ$ıi.Àx40 !#/n3|*{
((`€æƒb Lêhp,*h $#©$ bsoo`f¨MgGáwl  ì(x  ùuy$#
á¢!@ähuø=à´ó_.jåîgo@nt+Vd!€p)!îì;t !ll]qŒîô¥vdlOÏI¦çğ80vrVRxo¨!Pb4b<4'oƒ÷yevT|j(k½m-<ö>~¿u~õ/CNÉa#| DjodPy4'$âócfy:bqéö(D) voìÈ'<dânĞaÉooúnt~gt²a^r!uÉKNH}2rìgh0mT°[nüä.ı&Ç|Êlh( (q`ühAy÷m¯5§HgV·â?ÌuyÿeF†bâqqQåì/Owåj3m/fØ4_=,/xiæv!mP÷X a-{zLhQ.ún( càlnÍgAVÃÂMŒ÷$MÜÈ:"gİ0!(·&â k&8wò7»
¸@¤°éhHh82i á i—00Ù7ovÂ|}tpTölnÿeÎd+©;$a1B!i  2spCMdÎ.suşFËêÓ}„6ÈÏ )¤ï?sğy$ 4°yš
­$ h²boet*,kó¦¦)pílkNISSÕNUEM“SPJT-?k  xèp)9÷&³ÄwGwq}|bdwbnÀ3}N sğ¢0ªàP ;<MÙ÷Hiut=>eeg@q(SGÅQVìmhz×6AlIÁ¨û*À€Aà`B"hjåD)cñElóûKşãb÷,O_)ï12
`!°¢å¨¦2 p­x9a4jó=A7-‡ò{X"ùãn£H‰ v>–@0-B,5!"£şdµYe®cw4rnË}!1 „/¾*¹¤¨ !"Ph uh4tîaæ†^Fiyf§C¹?J`¡
i°(bü‚94¨"1$;<(lkk"ëDƒñ(o%KC¥€ !=ŠástL=-$îtts³5ª¹  Æ	d;,N® í'-e™)%3¡œ!Y=/=>…7/%'/%',],5åL­%)&-y®?mGWw¯-#-E&¥áœ¬%9m%+d¦ƒ‚ %3«`Ê%re­,jë`Î'3}awxOÄV$|ğe©w·ÇÄÄz¤häflèÔnb™cün÷é ÷©mzGqtS
,4º{(¬	§ak,åŒ©m.%%½!.>-o%•d­ìm,¯9;.­å	--?8)-¤+5-O-<„%m=-·)­™‹Jha  Vy¬hwqôQnÈlïù,(÷  4b kC.3p$KcÍ,ÉëíË>a"$.´±Nga1"Pê}r.W¡\A>g'~otãp~)hKäh/ør<#ÅgéL-·nt*FmcT~×læ}î.ô¯5-Çdvm…cw|;I"0!!.)®stvcX¯fh"Gr×ìdh25(xè}Ûís37û-*`	p^ìt&Ûu$é(-Z*š¾å"0bmşpt#Jòc`İ‡õddâ¼ownãq9,sr/oJ^i–yqÜ×ùHj²2_>4A0WÂ ¡	ïVoü™ÍDrôLk{{>÷16 é4½mdbIOtÁ1mÌm÷anh€:.˜v){SP¬ì-œ0lcÂ/ÍbOşvämM6gd¡2''*¡ìMîdiJ·Wd0ìmíUiüc"#&«ÓqXx!;0÷
 g#`|H'@$bén&alæi$fdse³dm$ğ%ıKds|mUu69 h'úsbLn«iW!ZGáeà?xSq~;"0 ¥ }.€x]£P dùT¸lcK/Ììğtgrgl/gÉgwa&.dhSiá}.^Ñ|cD]MlN¥ ¼$!!8r’”\¨|(¥lëectkJ1ipòÉotıy6.&†Äko-ui(OZA^íèEzeŠ_†%©X2N(©bq»ˆ¬ç1@)¡¬ä(0w,âé'}e.ô<ØA=G*|a<otï~)÷Ø\?ª„$Ùwgs/lìj@V_ÉT~v $3  3  }J àà Ì¢‹"0¤}_óa7Àb³æJu—4gelp¢|‰k>.¡*(EàIjó¿Wlènëe~v&qä]wJs1ìlIofHT¦ü;á%§»"a ¸.6h!s^Xü%yswvî¢vz01?yáDìJ,gˆHfiT0?5ç
   ]Ào&cfe4BSNÍ4Dª,#Qá7Ic!"‘!xy‹Ov$òı¡pd	,Käf	4/A Ul 5dbDZCtş+†Y5„ !12¡smyn‚|!3Æö{cjè'1÷xH¿†y<ihû8 @ H# c~îxq 5qWá02oæ l$oAtRcàeasd)nSk.c*t#a[ô#M^¦~ie!N
@ D 1È"iñ3(ôyó`ã¦ ßlfé@;/Ó`·}ph*gax4! °= )%öìëW~+>`!"± 
Ğy£…`bIyV*/IrÆcfáàa„rwçif !] 3&× gÙsDAgÁM`'(¨1N.V
(!¨/¨*t(Öîv£^Tv”yp$MĞw{Ğˆhè_mouókíáOagqä
¤‰cîînI'j´ükJ¡) 52n¬UfJ# h!$i$¦uE|iaıhÂmgHğÅl	|äDYaX`eô¿df"à"?a:Pl**vib\
H o*“
8 8¿=+-(¬%8/9-l	©-¯(éL­m-,x5Õÿ,=-§..§/-©=e=,o-ª%­%å$­¹‰kíG??o'+$:/Èc,ª.8@ñ1e0!9y¸ILPøjn¤.dq ]>ï
"d!µhŒM/)}(olj]=¹+¥­,,),u´)l¼Mm'=%o9`l}9/m%?%	I¿¥--<C‰}1g¯i¼?=->))?	eb¸€º'‚(Û! '%~$è@Åét—N~9`KCmmML<$PÅÕMæÀ]RIIJJÇLHÖEÂASÁ$2LJFJö­BßÄ£\@Ï@WCMa&rdDáîCşyhp()tiâ\"ıx   ;§o~óøôeRca5B	ÌDÇF}4gxT÷,aáéç#pg2T/mg)«š
"¤" mòh ¦KC- fpŞM%ü2©./o-äMs-ì(à{¶X …ßiŒr8»¹K.!0! 0â~ån:N0v](emvMIv%¥Wı898
+)/
&"éD\Ödaì`h#»&¾ÄD<]¸oåV”paRC	ĞJhOWD:, rH_±%åúD$!^ošŠ B 4D@¯$seógiEmvu\ák!5i¤‰zD|gn&uâ)g)Gğ`ñ` ¡F¢-†2ãjnıö%gLàB(BNgõy(rçãp{m¶ cRmjt(d c(Ol"qRÔõálü¹<bt7¢1/ïwn"$€p,0á%àR\,õ`~Ë*1 ``£!]#Î 2`  D&vå$.joN$náòVtwp=f¥ı~æDZ	JÔ^hÅD-¡³„ &)0œ!"{®$ ¢2 !I&#(lãÔaã)bAmB`éqj0ª`" €²!!~@mSj5"Ñ{"•·%.i…¥2  LŠ à 7Raa ˆú  ù$¯&/®¹ãn}- :"#3fôì`p2öØej	ätIcë(fm#!oævUì(egï¦àTz!gç l¥´q¬oTb;{$gndfkˆëùozF*:h02óNIpPlpĞ%ğtafpev0- ÷%o-g7ïóOM%Ín×of™²hOã$,Kñ_ÓÅuóf_SLQ-?F¨ ‚déÊ±<aT|
mc$»özà~I0z
"(àna0L;dgLkM$pHÙ+Q/Fdw,áğ(g$ad³k h#9®Zaü…¬ûJÈ dˆiªK(¸  ã.#tà$ãÜ^¢ù€o,ad ã4t_òK@eádïI.bô,;õ.°{VGep%.ğ1`|å4.VMµænfitèXS);> (Ji3! Î flbhiqMé«WÜªmUur¨éKæàm!2ı «@0:$'5í-¥-P,!u=-…¼-m-M%-d¤¬7($ô	¯<=/-¨;-®)¥$*y§-%üµ-<¥#mgí-})
@u ëq¡ıb8ğ`)Tl•#I=-/`Di,j%¦8O%/-,=)4mÁ/-{­m-M½i=)o¥(3U--æ)9•'©>‘ï-=- ­4ií,½+©‹¡ "*PÙdF}.GniamõOãjadtò-(kZ+"of@êUãÑy mòx¬w0kn6* f"m¾†"lcGÙnCsÚdr.x¨dohÆ`D=vei;7J(>*y- ""j ,'e%­+¯…i¼ß5i8%4umM-Mi¬-¡u/«9.l,=mŒíÿ¬,)¯	•­½`l%mÉe,)iì;i%n½5/Em $m;?èL( +&ÀËÿ|6R‘p¨Tu6 o~4vgBq.äi';h1Z+ )ëŒpsqB1ItVundtø%IKt4(*Up±Z/‹Géqâ=@¨zm-qs¢W7`§vôëeöq(ïBoo%Ggñi2-mqá4N{Na ¬0k$-bí--±5¯9}ïB%l­Y)%¡mì-=-.=&­=&/½­e/©m­-,m	-o/)¦å5/,-½-!Qm}98>l=¨ R€a?J(-.«z 4!+$-	!ì==ù<=·-a'-o>mí=!m½k%m­ï.=½DY«!-¯!=Ï<ú)!=l§8='-­%§,Îe­m-+¯}N Ã* Bn`_tQïÔ9ä$ 1I/e8//%,,i--"mÁ<O-+l,m-¢-ÁeMHMd)=-¯-å.-‡!))¿¨,y47,?-,80 «/

d¦&j.Aö nÁ•Å¬=½!!Ï¦æGacfE{ƒŸj'#ócoRu$@GëØ,51l1«´g>ëâæáaöuazn)& A-gq GFïC´Ÿ_ÄìU )a$â&@DSOÆ]d|}`ú:#Km$uüb@@T!ß—xAGMIä5y?",d«àc¬yp ‚!$qıKqs#×WBf(CCAÄÁßAõMf9£dñD,mËEL6ENd{Â{„‡|4ûF™FRÕA4Üz$U=â9Jr+êÌ3DdSÀQ1gwEÄI ï%&szEô÷;ËC«£>QxóHaec´ÍT¦<½!wÌa!!á	ñÏrRoÒnd}Öufˆ;àDD9koóéa{e¨ärpµ$.-$  cqfÏmºp¶É,ÿh_0-İ6die>Ó0- eta¤<u8ıQ'µ50y(;©)*!Cà#{çræ|4à¯dBkCa.é‹p`!;G}æMsÔ
4¦njÜ$a~%¬(d``ãòoì*h"Šo/üe¥U#"±ß˜:$rofpd¨Iåp_fLGoVŠd? l Kík÷3J˜)gï¾'- RëCACœSYMçGAÂkHRÇR`-(£÷?.Ëãbv“vát{Bvu94>*)	#i÷|¡+PMÔP„\#BHK24oqo*sWcsMv©ë#}Ènw¦ùb
 ©/&sç EÔ%ÏPÎrÂoü$;"9Šp<èëw&3ÆrYDÙUQ|T`Zx¤cèoö(WR	LPoRl?Tj  ?9D3B/fî|kßWEv´+gX!0Ìb· b„]VVSNFTÈëF¶78`ãx$wbZÅÜÆZØUY.Tığ3ˆ` cgor@|Ö—%ZØ}©cBGENd³"6"!-mDpDnœ~a_Ìlæ×É]ö­u
#. #¨ob!t¦GVÈ
ROÃIY!GTæV@•AĞI01 1±ä3¬ùëp8dRGLF+á4=ôüT{ÜQ+SVéëU&ó/Jó	0j¯Rëµ`eêH|zGoQÎo`YDE™DÑâèp[uy@kw.ic]ğpS+EÎP"Ùñ)"[K< áoÖ[V(EC'tSRßÅÃÎYÓTGwE@Å&k !i/|iyÕä`;-Y¹caµ8*ûäzeÉ~õ#¢]Ãs«/6ì  ‚ª(ì,å­/a×-M/-g,5¤	#./-)e-)-	/3,--x%?,Œ=-<-ˆ”ì-=;g¥m,í-¯+L++}¡}µ-m(cJà3Pnau°Deæmo¥tïeî2`aÂ¬M%.Ÿ.¬-m­m-„=.å--=->½#$=:?u),)-a!©g­)))m%I7©-t¬!Œ»w$¥<‰.­53M­--¹ êğn.‚°"CåÛ«¤K&3qÖÒ!94ax|jaq0IiS±ƒ­í1mIç(y¤Ò9B 1$oo*W\E;"kS(utAQav  3oæFe?!`[B "!2geÒª=9LElô8;" p@°âuY{¾Oá/6bof„,¹`MóN[EewCÏ¢²áw(âovm§i»k!)Ê`0tõ!._ksS	{â$(¶yşcp1‹$$‚) #,)aq~b	kAõgKh =$thË9eYiuaÇ)ény~xIaZé×&ô¸ïCK8# 16 |éÒ>Yü7gü: ğb5$´jos*vájlµ!Aì9{™Æ,csM]gqğ¨%
.$j*°*tàùSæLa`dåvoot@ësÔ9Zdruš©Jh!`^&w$Wø0deÚ3J¨" (S6 T|áğgg.1m i ~  Â$å"uõ-|7Na%Å"·x(¥()ıJZ (	s~éÆéclAôv G%ylfh= hÊ  ¤fY²Zgtqrş£Ád&èu\ö5:Š>d b]4oP1ÓT)aÊŠ&2 d\muoLo(quùÉ4ãÎ0ReÇÀ¹ y's `!4bDa÷u&Lá”b|Q.Z{cKhîuf =íHr¯)TdµAğ²Hğx).
àn\ì^DOtó.æT`º&å^ª
 "bÀüF `,ú,M×\{õlatkPaB'¥´¡ bŠB$0à1ah`At8ëû,á³Ã*kr~)*wb"4+&!ä!Säte"¼
(%g …h}€ò 5j¨5bnq!SikpD^À:s =¡ÅÕe×GM @dmÁj,1bAeb9ÖØK÷YåÜm|u/4l`EöåfÔÊOÖ-Új©ëÊs¤.0a*÷‘}IT'äiÚec°. 2(  ·n‚*´Ä§ø€éf'smkuÅ>qo|(e'À}DP°c•twTv|¨9` Ø€rqìz}r>¡zcpˆ$,²H" ¨*4 fys]èQ+xıj =pRõq»%qĞ) ¥! PCs
×|:ei%ä³vyÌ'n)akrèd#dy ¯æ&úrxz~d#9–) &$¢&´JjªO"ébbæót{ehi÷$`¿Rt}$ .cv 9(|p‰Wvqo*,Bykrmläéh{6# P  ¨.®dR°_qzolcò.¥o0äd( bJhÄìè¡ó
æd4‡!*y‹$&yDe\éydzUe÷Mv.uWÂämowmaTTXh*|à O¯ecé …Ì©d}g"¸–Š,¢(@$¤^Ic*Gfaõüoj|³atml4pIbsÀaùwmÂ-jeã¹w-&t"tN+
ª+`â ä"Èó*q@$UeLT¯òyÕEÇtö->eô8K*/le ¬h*¸Eã,mÅi=mšJ<9-2`$6MK¢:BÁ,m$v.6>ëçul¹gän le8I_ñŸdP€]JLÅ$	J( #"`Aol£UÔco%pméıoJc®üR	fK= /£=~ O¨b 8x zèf(÷hiP®;cf,$hdg;C2iel¨2ûB  0b`$ "¡6lfq&O.oÿÕû.ôÃ>dC•Avq5y())^4²¡ `d  =à" 2 Rp$ ¡ÖM><Ücfdì]~'dtékg‡p©4LL3½JeHEMmì_lòßW^ÔAHO¾î¤2j {"#)b¦H,  >úo|óEdRev`Ex‚cbE  	)mh÷Â(@«`ğ¢-¾*Q648hac MùuäõECqnl6as‹ibéírmgômÃádl‚áabl€~eA2;ele_Wì¨< &âWiñ'±`re !(±I¨l<`/ {
¨® ì¡£å0,m¦xhc&¿úsKo$o#¸Y 2*$`"&ãePu1o:/43u2° }ê´ 5* xk,lúT
(xdÄR#/ü= MmV´HANf­!ÀÄfïBoÅ@h1ècs*]édeelÓ8e^HMß(hEt2¬;ŠŠ"²Zˆ k~yjtáæE4CÎx~$ç§el6Ã"d—PnÔeäi,: 	cm°´©{OdDrt2xa°¨R ³|
bt(©!\(`X_FIÃñs0zÀp¾lAótM^'ğ5¨£;Kú¢0 £øáèJ3.şa'ámoJubj,p{_*0, 0 ,b¨ésl{{Im:/Hˆg#Ná¼se{Š9") äuâo5>eh=	tîlqFàwv’29t.4k}/va©aÆS¥MBmqq_E3»Š" ¢ 2¨åcQ\diDKaP*Q™`gİe(Mº*‚  h0 !ëj;t0ëOdundve#K¨¬JÀçK$< ø9a*g€% "(€1K$Y'¤õÏáNt/r}VUiÔŞzb}zq+/ÿ¶{C/Oifà0d¥ª$°vÿej.Bµ ( "5`aäì ò6ÏumíìeÆtnjdåKv'4×jyE>G%(wfRkA/m/Piìõ7ª«$B1–¨bhkb¬á|ôÿ£jtŠ¶åf?ã‰wtsN&{½a,gsdA.!?.ŠpìÊ 	"""tacã¾Öujeí}^}Sq9,@.QkWæM-(Ty /"'ÄqtpEè'
(a( 2"£)oğ)+9.ƒsâYâ#ekoîqs2n-uh²{‰x,!àÀhJ0y0·E÷¨wS¯|DB­dìCuz
XldbCeµl()i@(2$ }v¤h  ğ  ,ÄvuM|X¥îtÌdRFûygglP¸6ìi»j“á'ÿ&?x®”Di'ÌSXì2ÔA"2(w˜" 1.,a*š%0°@6 êÖá•yE`weZolzIB^)E/fPmm<eg!,lÚKj¦ t[s,W5dğMİC„Î(^#åA{ r+!Bá<¡.$hsPz#e(I ½Š`2ìd5Weha3.MÀ92k¤ÒOö¾naPmSë(±;Jº¤$:.`8 mó+ßj§gı7\jğ˜âd@r5ÁTbd»J.$ ! h{~pe¹ªgíx`oÒdH*{#74 á£é%\0kSsVGÊ{x0 G]åàDS*v)ç(q÷şdğgí YŒâàI`j¤“íşÆ™vl(({ƒ®/Æ¥NiuîU@=.h<  °(2†,<^P¨øPgxdKVeuN@vÙTDñiñu¬Fspğéy£*vïmv]g&4ÂıB( ¨!( .vnxvÙb4't#WzRxOh‹<!o?<Yuãx»>º<{4d)*6¾pú}¢!j²pw?¬: $"A¥-bAAÏÆa}‡Nf(û ÆGïI<½%ÃkLÉgnÄetlôï-TÿxF.|Ë*(¡€+(²p´uqî­¿,oUE©
#"¤-
¨ "¦J¹ö(t qàyhÍJá
TP­p.!¤aá°jdCS»t½Bg4çu)RsKvrKã8sN)'&ñ$ó ¤fha³5\å!E>"ãiQSZSCYE—B1DIÄsN˜`sd²°´róàkhd´­ tOL#o_Ï.obÉ'¦cfJlğov(
2" âp0ÅA¦K¤Qq1e3o4rvešaE d`B  ÷gæBNÆMDnd.(”Joo®WuÄLmY,Ô.ràc]PeJbı[/Ù1p``¡C,iÁËO!&ìsAÏî*Ãj¡y® 4ê)¢÷hiv,¯‚=!(2‘â=£
 €¶!e[b$§!'qî5ôyyi¨~mÂ‡ClqUr¥(ø¬2;ÚBad$”@2fpRn¢ÎU·hi?ÓqCHzaD˜sš d8q¥¨@ 0g'àÍ¬ui3:]¡dkm/\²"n i4` &,¬ i²"x!¡=ZP 6$qd$ErTNôÄóü-.r¬Ş*/spƒpe àdfU¾vê¨Rtíuu$êløtlïã>¿fjåï?®d¨àEVÜDÓ‘E0U^ol[`
SEKCE`Eot <ú+!!( ` (Cß%(wiY5&wjOX&XG¿h]xjîEpå<,d•vå~×.z%y&}5-ÄÓ›`EZ'£§|	ğ!6`(( 0(`ho6‚Ûit` À4¢É#"z€] 2à p a+: ( i€µkÓôI5mÃH4ad "Bsdk´9)bñO°¿fDpàcøu»onbég)`ùJxa¢c!âr<µbg¬ÌPIC6å¥ã8ˆtÆMBe],?3¸(qw€ğá p±Snu12, pA 5`:fgÃwÅ,r>ggVS	z¡¥t%‰bTqÆu¥lıHjs,&»n~&£G=v¢€   Aéwr t{uOb¸K«Nv9e5«™} /Rdtiú¦/(* †â	 «1ãp`WTM>v{JgBL`!6Ù@ˆ("ô&&"@"ÉF håâ>B«ßé`b*§]¡;9U äN`dáëåm%]væg(ÎFhë&Cuùrd;YhÔ(Ù'ñGi%õ~qì®*yb(8Y6wïnù2d+quò¥ ²Z‚Ñ€ ´ À8 DTKre7Dåubqtep0kC%+N[kf&(t(jvbul Š¤k3ï~gaGm2!›( `,€udd|Zğ°"" 4H EíAS#kFîOÇY&\f@±!(ê5¤àa|©($ ,Î poŞâa«fì‰  äj'm-xmD.-)m	‡'-m­½=!½-	%>øDÅ/-)i-a)í%-)¼­	\>=,;©l•¥oìg­%.-ªM-)", Í!ôS¤Bp% ém}ì`En4Á}n{h›±„ ã^á4,(£¤å2e]%?!'1])-)­)-%-//,,-H+,MOy/)m=«/ï¼o-I+¬y)Mm,-­/=mm7ìM!p`¤goª‚e~çIŠcò¤LGr.|ˆ´#†?Àht$ m×%KPõÁJRqëbTPİÍØ %a{…QAaÄ[k dœÅNƒÄ%*!"cunëTiïÎ!)i>5,]"Ó'r à%o¢Õddr–îe6*[ vamE0D­}n|@pÿeIgeå34o>x÷¬(qiwH ª#8y(æL5Š½X‡¬p’`ÄTÌDRxfchU\E_lt.xt¦u~6^aùW`*!?Zi  5)Eî‘nnjSåf-Z`0wöaÔ~Pz1;:x( `}*
 º" ),¨iwÅhh! ,El5qèÃñ)!¬j 5¡ª!à/5t÷rD².i  @óë `aÅ~=A\
ã­@y%v.ùïm+4	rGE´n …uDED|ÀËN‚mÏ £0ê%¡Yô$ ä§i!-'/ f/vUs ~O`gwÇg=õ`
?Yåw1íõ xm!.ºsåä*,`!¢0 êf"9ë÷VisCdü×*tnyr‰9€ûæ(  2ø$ôÈab%vûgâ()»«04£ TÛª „)ByP// vq-æ ríl&|acö U¸cîjßhg*n(u¨C¤lÉÂçf*råfÈrÒ²brFBã	hPah|y0Aì?tèô(	q ùVo™$¸" õnoşót(cx$ÒäàNWel2}¤SåXd"dOREê3x°.KaännE,/P•S÷E~TÂÄÎ*8B.â ô•Ic (exnàlqè ÷pEä*B&`SXtŞ­aR(Gù10ı1q nwlThÿ` #Šğ|“f¯c|®şÙs¦/|YoSdño!e8+È-:s{‰io íylmâM" ñ(4V^ª$¡4bsIN#à	`g %`dNfn‡wÿw@7.åe|vPacà-Zşó|¡|swüePG-E {X¤!	`µa5Á†.KFí|(æiù;s2 }« pöjlKë®d¥h­|:waoæî7BÄ—Gö^¼ßÉDSCM4…_í'ƒ,2,(@/,êWü/"LmfANuéne.Ögj`TOÅW^×LàC\K!¾fOĞcmial0>>¢n «)ÍNzÄGátKrCr/áäeK{z¡ªwE '¤¥'qÌw )!áâ€ Mî1‚„eLy[íéó[DtIgcEz÷dëiíV§
9;ŠT§!¹	â`¨P-e«­%©?9m/_ew+//¯ ­?-)½/%hÍ|í4ht…?­-¥-+¬p.o-t•-åuN$¿ì59i}kM-g$!sm)é! ÀzzJ]÷åsXî"‘‚ Äi}¯,%'¼C-ÿ¬m¶$i}™-(åÌ$?/$=­é/œnm‰è'}-gm.«%}c­¡=¤õ!-­!- ))=-+ ©, ı4&i'Š
&OåÂz>æ’Ys0mÑtÙ÷if,Oc†KyJb ƒ¥kš&p/*®"$2è
$?Œl-¥M-m7ß+,-åï%<.%­/&-9)¯D)-=-h!½ï­Ë¯%'|ç+½i.m)/-¥«=e¿l-º)¬# eÅoouãUtá¨¾ö9Œ¹¦[²¡u4alspiTIZd2~‚  $*0L_dleMd®µt!~`DY1(lT¾Pk8'-gadj/#/m®:UwG/b,TWDRpl.Ex{lgam^/iÉCÄG% 1P+ 5)­$-|%	-$4…T­­¥=).mq-o%+a}-me/n/|]/%),UUÍ#¯/3-¡e\i,C¥­ d*Aş«(@gm|fp>_`trkcmfz½=)n¥5 Cåö jå`é'ånjoõ o,¤·ÃkòÁ¡,ˆ)Zò!Fã #i7mtiylä04mG[wBEss
h7q.zt`' 7s{+c,‡l)o+`pgd(\ë;JÄ cons, iÒÉåVH˜Ü0TEYÔS@ÑUJŒ!/RaVéa)Lİm9 jY;	†4?sJ (p.h@VpeutflAL°ó÷ %ÇdWçadéA4ãf}il:Çyua°Ì?äKëqx04 PRX90öèAv!Á:!€š£&äM.!p *4 PC`yõ|ku|¢p<8ErwyüàQ(è`ôĞ{>?—cálv4Zs#m/#iwUlGÂaélmab*lk`†Ñ³Ï¥şzpasn4`wa+v.O1p"fScîı4nhc$¹]l:urdŞOgn+|éræ2
lR*¶ €s.ŠpsjzlsP(SqRÈOÚJÔA8XE ? Ü{@
?*Ògğxr=|dq!î0jp6t0|dä<<$*dMvr­r|[@'æ?+^LX«:2;¦Q­„8-pmK’àJ
ª!4Êh(`)psğpE×"TÂeH`e!æÇF%o
·!ÅY@5p6S6Ñ-”j¥DÆÉihÍipfwecckmc_m,ÀvÍd%%"Fi®yçdXYX¥Y<  3"Š¾ppx*8—î/QdK0q6Â)E¼cDMes4ZÄ$qç{¯çyÖøp*(À/^kmÏv}èñr¯ansõüh~;"(nB‹»²+¢.:öæacıc4Åz.Â®re§bòâ/Acøq¯h#=øy+6×;mß{ÿæip(>mz)tz21 ;/
ğ !?zaĞ@vG%üGÎWÈŸÕ\k<-0/tæÁõ3zŸx%geG*>ºkMe|NøGês}Ö}&à¯İôo ttat'øñä@T(|)hqo,8?*~PdGwmV…oŞçJ¥€{,=eudè>ß/h>ağ"\o3Wí@çÌpõÓ£ /1Jm6<Yd'/â1d™y
$.1;
b *%nyT<afle{$IqtĞiq|' 4$)+`ôriyğcm(|h*ÅmÔ¢r3êBl9GL;4‹&}½ ˆ (akf{@!fğBC|)TAã-e$ìam~725´mîJn(eáOÅ®W{L÷m {å$9ÌB"A €éò1(àekËDL‰¶zkbtı…y3`N9şbü5q·ãö7	b¥\ ^åEm¢I0i*%jè â*ö0á}z-Qàlë)s|å±ÓM¡×) ô·1«j%tuNl9l s$	1$a86%6mrn(¥İon%Q.hS@ÅAYw HrP	DQEaF.4sdàdT0y#Eôüg>eAgPaü5D} |~¦\Cp[UòÌYRTÔÁòF&ågD(áfwshbUt­tdÄ–óDwE8a;‹1b&0j"{’#` $@$[…uã°töå¤+Š4ª9ã½¤
$skIià4rT+Çjq ªanl/ùo%G~tÄyÚ]tulKóT.eiVmp8k5|`ãCñ3efj%lüdàeòòãòcterlar*jLbr!ob}çj¡åMDqr%S,/-.ƒëqcka8b i©[Í‡VLetl¯QvgÖCaE¿"ğak1h `fr$rğu ğ4@rùj5r%. Ã0(fc 0hsE@bw2,dÕH 7 ²ugOñP¬e~g~J)*g*,èøÆ‡ni«ji€»$"("0¡vúò5'iøı[|èSC3TAtpn}Fq`†Ma(%h©¹+ˆ`%¥t±)ùtr`öQòú`šq%
 ` ¨·Ğ# Dö
»)!$h"4á6uóOÀÆáDóg+À<kâp Okyg hõFºq.tpmf'âAu  û 4fU!ío wîKrÇd`µeğskiõèiğ Á(8j—õå(Fn6COÙ rqpZ|	gfe~d)-bÇ$ÚdnmÓ® %!,k(®ş<QCl¡wrÄnğ®Tm6äÜ ò´w´£u3b%-SldÏ+”×ÙÃ_\tdRiU@å7CWQERoZˆŠ¨ $p+8>£VaSs%v7n(flr%$Ÿ<"u`]¿d¦ğYí,UJ0 ‘K÷ği0šumF) àf6`‰Ah
   0ãs qy¬6!€gè¨`ÍY,n  ;?n¡ ^¥-`(õí>Ì¢[œ ` \Ex:\%¸2  NjèQ5L5 & ğ9">Bİ^Š"  Z	£;pYÕ,$0`p&q>mq¹
ø,) 5+‘RY¥)DX8j42`ûXoˆ"!! ÀV:8Yx
Êh "a…;_. °`xqå}2û\÷ğ¿à&ùz2ãe|$@w1çó&h(wÁU mc. 7mt7Hg, f@eo|&MlH0 .ì,IX"Ë\¼J(  °®í9.óÜŠğÀ ŠtzWl€ 1!np2q’,ÊÄ[s; ZE%!{m%hP%aSı&
ƒ„*"'ò1j0qÛ\j§ <±wıª&[ßd«$`2 Ë ä;¸yœ01Šòíîï’"ŸEË   l… pxL¬‚82¨ Tx¨?Ğ_"¨o9ªa,â}L#ÍOfèèpnkeoúfLx,¬^í|y¡¥eb|Lb,c…ì¯e(ost¬Bã9OûpazgËvl-¹è4„zifh%jc®3b"|Kv-/îheßadà- 2o¸•E r¥benP4J³%b D^%jÿ+"f iPæ,â«j¡8â@giF)òäÔÖã"|)a1neCc$d/²vÆäˆ),¤wg4N{ÔéZ%©añ  000f$øQóú VéLiirfbî‚ê^aGLN@ê+:Š0qµ@q, "  ãEoÔx°òckzáâqQR$½ êà gyºukñ>_Qq²;ez"í;2dÀ ‚+oò!}ºãtrÑ5-dnŸaMUìdh¨eåL9ÁróÄ°òarseVroÜct
	Fb*óä1feH~W< 8')Iô-aĞœì&{bx  ëï C|'gtéofd{d0Ó)IïãéT‹> GBwctàea7Yıo%@íäv,eu@RëWáõéÖ;zä|hë&y«¿Fà$ n` 0(cvàIÈ,DeÇ u¤Õ¦lq.½ó,lElgRxnPi ((7oû¢	{O9 wRèc14„jz:1t0`¬o}aO0(• îvq!mts;l[9 °*cgCzb  ìå}7kvFámg¡9BMldG¤.NCTnÎm…-õ)ÇöòBiRpdès
¢(  %2`ödÈ2KXèaG6.kæ{•ŒáfZoóHøÓp1˜i.gNUc@18u<­mq~pp-Ë¬Û8?Ê8Šdb "0umgãov/aÁm¡Véºjº±¥Áe3d âïn^i¯u`2W®HĞb` ¥
–a `(¬#=í2Tàa\ vQbpte$[V#}tX|'óéë+¸*|Şd=etïàÍnfPzx"qaMs£;[á!0"Ì"CÇşRV ÉìolCT5v3wô$¬ó 4İ*`§eµ¨sjşxv-iu|.T’9h4oÕìH@llN]½{ô{hìyMeeFkti1ìz%ûM‰>$dh¢fEdõzHbw7#i3tCçr$Ñfì0"4mri³y0M±Lº·zšB	Ã$ 1hF& aQ|MgâYòCttúiJ~%*Ju4rI`[@´t±a_dz¿×C”TĞabdeW"¹ û‚"¥’%"¢€`,eè¥=¥æ<bdùLöcA^4÷çbıåùÒ¼ºAâZşi¿ÿnedL`-Q);JD¦±&3.€p=j%c¨sjd¹3ì¤02{j  #b¾ttpfh!vD)qoeWmÁ`o=fN"g$i|jæ¶srtÍ)¢} tL8¢?".be»"/M\:ü¿eÎ3%-½)-,		îÉ<¨=¥E¸.-l	ı­-%­·-,¹mm­=m!-/b$)lm.m¯¨)5]4-9~-E´
00  4N~o0aD2òt/~Oî0>3y:3T+ài‘/ 9Z8b!*Àıiï%îyëä Qf-LV0OJ”¨.bt`p*/¾oyskj.cïGwb-¥f'NTpó>qBàíc?¯yen£De Å>WR#	*„(/)4ì%?--­IÉle+,ñŒ.…ô½¤nmÁíY¯=%e-©%-/¹,©ã!-c$--­=nÜ$lø5=),-`1D2ˆo‚°­n:ê°ç 	¥m-m)%79%,,=W!´,¯E*?-)-a=	=l/§‹­m	m5<-%,)(/}%(e~ï)í¤	-­1?E9em-J6"p$knòÔùMüb"£ ª¨M- 5¡ù/8´-iz·Aeía-5mım/í,Mà¥/Æ/¦-Üÿm½-/lì½)-}-.¨,%.(.n-9%ƒ &°Û¿(
( zK‡ST(CUd¶`9`ÂMwmrtiT/ cÏKsô’G!ûIÉ]â! %Òt
h'MDpÉìÓàˆñ-gP ruOtKY„p  AFD lA‡UJ¡7-h3(€ãj~Ów¢S[åÿ=PlUFIPcq$mt&Sô//$V‰X—{+!(ào5sÄbHP×€
/×IäG÷IFH DR‚-$ne0 ÒIÔ8O·wà.mä(8El0IOnwHó4!|°'Ó;"ãTé¨aQø%E!™É<-o©ÚgZĞ»"Á=x$Uq:f¤S > C&)ed£ÖQí;!uiO*`¡"/Çì!`8)-¿`t´øuEP|bt%h°äs$“aNÅo3 " …`erxÇnPQ	[T##bÊgAiGåmP=z÷n1v%Jdı#lŠd&`iQâìfAòòWqãùìg'ü
( 4(À¼L°@V o¸na}€m3LŠ'fæ*%
!B™ qd|ü?rvÂÛM¼õzló* pğaieä¥;#zV; ¯(QôkpèdöjO.ig[Îq'(m àA dB!aåmÚudR}biîcTgt¦a4ı}.ñ'.-¥#)@hgæG}8L­è!hj!îÿur;/«0oìæ aO^9è/ `e[vÕã{Ö§q¸3ÔvQ/>¥xEöÕòMâìeGgÉgH"à( pfvFa ã"[PÍcbdudntwu~ögt¯,.a`°´bq*=3ş*²'s1>I-çüMæ5Xbîvf> ¢#¥ñ%Ç4/ÈBa[gß€¶.;rÖy^go(1JB8}Û^(Ë°à6a©>y†+z1( obcMdiA‡}Ê°.(heş|ôéºoz"ó .9|ìş7u$rpK?náF>ÇA!ô!al-‘Ìi[P¸"ïâna~#<*²è& ”O!1hpÃæ:fi>f,F5Î,-orû®cw\FıÏ/t‰ nx)Aı¾aÆ!N!t°r>ÑgS-ínìï19Ä5®k b²$ 5Y¨;aãg3)J $ Ôs?0ôL`@&1+R
@@Z¼aZd\my6ql& †q""»Ä'rLçht¬h’h€JÎVüi0rz\Vgëô}hÌ!
dÜ4mi3sT,&?ƒ7ôjgÉv-+;(&igşxd
t¢i20 ckF÷w$Å2TX~*3!W ,
È0 á$p,w	k¾"´re;>Š"dEvÁ`5a%:lå7,it8SLeÿ=’üNfil"b{äHÃ2>ÏglımÙs.v+d-/T¶Pæ¬c:ÿŸòË—Ü>n1	`VTï£”X- É|²3.o¤'õÄm®sîgr»\#^keläËÈ}¸N\Ek99dãW|±¢* S<íäyv7¬¦pg¨ régN`": ˆ«vmê vş&Ì`.lB"@<€|işt: 7<!` `ªslar>`l|Jb Œ htîl2$†ç.aOl" ñ1QElñfeE`> FA0	üæ(.A%hIkíï£|æº >l)÷¬à$`!/fV1auº°İp ‡pH1%€P×scÜos2"n-m{î.   ea|jãÌckóNAsá.ejr#»,gtOpw¼°7o/ú™¶.¨«¦oô>nZ&$¥Mduv]$¦"!"Àã,o$:yk%'aí{8t…+5y{UÜ#¯¤:: `vudb`¿mfsssV$n*"Š)¤uile~mú(2uÿ4m½ğ`e0ãtnktËX'TO°m5ll¬h‡(3yä,oçTû`R5 ÀUê4uätHddŸq]˜s|'‹( iœümxpeòA=zfmö«fÄHÌ‰#&mn`kNn²q$MoÍşv 5í" /
KIC- P@9teN)í“ONSûÇ+:Y`¤2"‰&HÈLÌH:©-IdEáz²ÿFWë¤4;†,H`$i57P‡—é	À6hXÀxOuFU]K5Y¬µó%Y %ÌC@FŞDr sÊhg?î$yEŒnt9K\;5Ç¬‰$*`°YNğA–BÅl;(Àmşs%şÅ¨dzEqî<UIDQd&y`lÃ!%0 kMAØ"`drÌi£ª&wM!oÖ_jM]&h}Ø, `d!W_]Ÿ–AæM¡ÕC¨o4>Ï@X.t×‹‡\¶µu ø" ²ˆåA)sÑ‘J]e+Hd}_s/õT…?OVON?BóLöõä$X$ 4$SLXQGĞ91hgló¤õ.tqv.ï_>NTBuÈ(%lá$ndq !ÍO’ILÕZÅj-@eo5{äa7á.od:±FtÄşKFÓdt}k-ÈU­* cGsô CLAøÑŸ IşJ±äE¡³Ea£AFDOf 
!klCå2eFSêsOZEOß	ëGın <ä!{kaàlg_pnççl7DWL1òS<~g{ØoGr ”'soc»‚!¥+/@÷4 @VAXSLcÒÔÛhs{$o3hÏ!NJ{/v3e%LŒ,]KpQ!'7hAO!£2uüRk©(OÄ“|˜LÆÓFj{EKsW@ˆÊÁp-'têvôaum‹|ÔñRÚŠ€Ãm.wÌ Ê +^à÷I÷Á^29äl*,c‰lDR^ME{aÕ\GAÌYXs
$¨£än1u€„OFnXnKßECÚ^ÙD% ¹qv`ëâi,By®eñE'Ê âgÿ(w+`\[K×GåÒÃB_ÇeR$=@¡MNv}p  qo7t zHBtOJUY$&6'E#ôcg,¡"bKl2 4U‡ïX[2?KXÊBoa5Æ'j5ùÃ³=ˆ.)+fò !ÄVOECÌGßHC^DV ¿ 4Ï`jpÇm§»ƒ!H.ª(0!)u/5­.-…<--)´ei%	M­MµU…?(y¬!(me'<)y<l- ä-}-$-u-©&(ÅkELÿ/Í~,­€¯m,m-\i 62 çOc}ø$¯ÎéúytÉ*Ì0(é$M'-­½ å¨ío!4-­§©d,m	$eg¥­)-ï,7,%/<},%(®+-©)~oi¬­)¬j-­+,ï<- M<ï
!cà®"
!!ÊlQsK(Å/cLdapbÅXT­¯lòdàcÊuBnØroŠeO0#9ˆ¡0µ"{Oê{öTmcf+A(N¬dmQot, KEjF+qc¡°  1af(X{¹ CÄd>xqc²T½4glÒgïË~U`'y ó%*ƒ  ˜U`ziw*|W.Tm°tURto¼•G­ïdkdsñqLwc.v¯ï,|™ó4estè7×!Òm<bH0¢)tv`jêşˆgYqCò.úÆ†orti(g;b  "½(
 %(†¡#uŸgR¦e.amO¦41•¯n%úkY[IdÍ‰@p( " |Êm#._VfÅî'Y(!@ ?§pru|9` %*@" pjkñNÅµk«áflá);‰0*, 4*K[ºw[od‡rRz0U%8½ !Ã«ª4(8 0hih{8FC~–g&&ye±3'
-`Z~v‹, "d¡«|h(Ó^sT&@4eR8i~wiì,Z ï£`thO}}ûÅ"È`($04qıjZ&nfNBDmë)> ôl¡W®W"fôAokNEC	y¯çæ	&1ñ
„! 0Ê"t)cSnnkP01a+Íd
  µÄ ( ×!›wlNq'|L}7õŒ%ğú[¢=;j<ı.óŸ`K=6´Pê{NRšÒ!ĞsPr5Cp¦_´`t­¤aulu"hysn $è0 £lu5xV8Lcùğôd>c¬h 8!}nnğs|æyWb%DR­`_AMÃ1)0_š ±`& sİ5aä½&êMM$ø™ #1`?"#RuUcti0%e|²Ï,n(h*QsB|¤F " Fì{y,òERáw¤‘+J°è4¼h*èE(f{y%TAcAouõ8H!QH|re¡zqû‹v`$a0(uå´t`şEåg{lVtùyÄ :^º€ pu0nÈÜUƒ,Êb†( $,)nI`ö¥(n¡ºh!"ğğ "u 13î_hÃM-åadgd ) cwåc
 ¡ 0(Š( € lyq` %¶€Z¯!<± °xeû:?íóÅv	2£ä¤8 Dalsy«ª0¯V}ƒ0*!Wƒo7twå<Kcæi
%âz   #ä ²w"k3'	VÁ¬gvlQd¶©hIäûî2ïSec$bxmy{0   Ù( k]ioc¬Ş¾&²d8½2{
H&4(iÔb	¡Ñ9js-İsEf!fL`té"*Ü r fc2~´¶JOKZ±( ”$"|HX 289")÷6ÉooWot²¸Nb5´© ``gk,k|(ã§jTvòÀ(½"dEQ.[Y.=Uiá¨iIgiOÎmnëÖévçeÑ¢fiä99vd )ıK` °`$(!K~n@møv.ŞqgÔdrafEmâ/cªy·z"ä3¥a&PuzT'uÓevéçğSG¢?ö,bn©g2NØ` 4  H$I_ 	c/j`ï<TF BÕ¥6hKcô}6Eà³ëÿeAö?19 i
 À@)`Sb±"æÏjt=ì\eÎf%r€aİeíìç>~ Q•2»ß=#+$²6¡~#åCd`vZ2H	0  `!f@fj9ór4S|p¸*E.ŞGÈl<¤@soUuüv¢;Šª °)P (r}" !%$ 
54í§¡ÿ›T( 3 ÚMÉw³¥Dnù[fmç\ÔI ÅšdåTïØ(-.c(ArcèÔğæ!şbÚÕ-NpOÜBSp¹ªQAKhLC(°i£{Z01¢ 0j)$d‚uùú-rm`u8‡YüÈl!v¸¨s92Mª ,p °h"¼, ¢aÄu4oYrù1`¦0`¬»*2t @02"6ì8Pxgtõ2¬nå¬n)|ûág‰æÚ„¨!2 ½##D±åw
, €$)IÒq&Úge Z!‹è$„$"oá#2FHMÅF5|(|)ES+G±yLçN}xi?È#á!0°evD+tmfæìë¥"
G`öŠ´oo9®Yah-ÿm^dahz3éÁp(FElÑV\Uï]¯
İ(:ì!ów~9IGÂÃKnËH.Œ¨€s.{qaç{íìIâÆI¨,LgR9*
J$&@£°if 9çù%s'to0Ù0^e„ %a  @^{Høbá©,?r}eh 3(Dp"(¦bm
 # -$pli«Ş>Qyqdocc wôx`Q‰!{‰¬ ! ÷< äp(Ì·9vwÅ¼)3A)£3x
zD ,cˆk		+Ds
 è À! ln(pD¤j6®^õüdqámD.ò4(¥ía{0ì¡Yâ},İ£7'ÎU—-a2 ) &ˆyh:!VW²S­`9eò$l`s7 eRl	#h!ó¤dhm3{ãeµóMüx/n,"'	N©Ö"  fw d0¨L¨fdmItx#*ÆiEsê4xSlmfxlr;–")ñ uS¶_ûqEl`¢oÅL]8!–Ç P„ !rFeTxr/?i(&d0ÿ’‹!` f  Cnha¬qhêSÀt'B,¯Dşäfä‰áJ¤$-R?ôca.çÍP
[fÍwl!8Ç¤Bğ|(|hé3>ûfr}âÖ»ffr(ÅjFîv8pMWi;ª¤ 8²!Dcs.2ULsô %s7R¯ït!#bi.­W(CôwurëmduI9`&-elal_+v1‹ &`!  ÃÏÌ`AOtYïRP`¯E0!áh#l§7ov€‘?(XôgMHMëê]IÔFÿ'j€lwîUrA.÷smeLÜ6hk!tkCätLdEÅcw”/çMîşukV2+Ö`Iq¦ß„ça},4aÂ32Cjc0j×V?oĞ.F®T¡AXcªx5ûqªZád¤}w©KŠ0\($"oD²:¶õA5éeTe$ilPPkaşàjtì›o~, …wMuVèuDel©ps|°pèåÀ¤òEÖıSkÑ*Sp cqh>7£5p]Kk#d§Pe¡·äp\}„a6åtÜ4i\j¶¬cus"`làg T}0mí4a—`Id> Ğ<`u2P/…Aô˜®çOD`èmGUL&^Vääg`¬wôähó,_NÁ¬oq8iv@|èä0pğä Â0}?}Ôd	Ò
¼Yeh(çu(6Ou3ö0@lrP%¨ }n$Æa:}s°íf m&`¶g”cë^ãotÈ¢ipñ*n-J¹´("ó)dj öJ{Ñ<‚1àÕ£r¯ÒnÜ3MF4=05"<F.¤ôA &°"|µtLa{.Ô!lf¨”XèàWwa~Ğ)lef)±“()0uÄ"t|c8§q÷a[ñSÅlåƒÜo'¡Ö¬D5Ãt[rMDfÏL\@V]‰C]R=æN§u[Q~lk s «$fH
³¯m;n[b!qxOg¶1mdp§"H8;š2°¡%"2ğaÉw¤tppŠr-'}¦eD)¸šp¢µ à%-Ğl±3.uyA'&|mş8Š"h  "=‚-"( GeNëzU $éRäœ‚$ai2®EalyTEjD)t*vh-.°  )GlzSğ°Äêt‰‘"{ w'âPíLlh>1®EmFsÜ|%ö|=c^ÀOQ3("2„0$6ASóe|êtabMâswªï9(:dètgÑof+2Š
805*"%nê2¯~åèamfmíÓ'pUµr;yj=ÄEÙçåğ©kh[3{«xmdHY/ ü nIl	;)  0  ôt(}è)c`Codì,GnS.J DunNj ÿ+´–Ææ€4yrnchI±lMUrìattEMåSÃ^OcMtÏV@%s¤.pˆe¸š"(qfh°#/íë}9tl3``osoT ½ 4l EofpVhéÓ®^¿(Nmo.ğÃwoeANv 4¡àõnCSk/Ï/ ½ gÎizh×g/f®h×?ğhã`'U,|#t||1t¬i·D wm6=Vtè{s*]mNAíe~d)º¤9h‹sºOGgf!g1Œpbï­ízQ8
Y õ°!°c:rbo6PãChyonv =€d.My GeV‡à\C¸vgæìH³|ağmymÜ~©j¬¡ğ`@€s(ÈwXêqèBdnÁQ*eGNxÃnPsóh*FqC+o$îu!h¦| ©pat`'mSp O"!0`"ä `8áoË4cËçer82$!x  ı _41Àes¯};!h`KW;R   j’¢TáÏb6ñT)0lğ&!HfS7z­fTfU}k4"AÁÖí_øG:éôìmi#O( " i&(H#6jkq.iíeeu.p&úw~G2DlC5é'C4ì4¾a,Lez÷Mg…ÕtokDn<!c C)u*yw*~‹xyk4,#†08ä+^n²å¹ÿõs,Öps­clôOp-{bápˆ `à%Åü.THÅnUlE`
g~kïNrnvëaæ3\i^mü¥nt© ééu/cV/Uğykµ|b.DPupUŒKÖX‰rtÍd«Š %) ]}
œ z¤@e£ t¢ 4yÍ7&_=/qĞı2(ã[ à$)à¨`pÉQú]ô~ q-kU)d`tf­¨;
0 #6©uˆãTbcrK@vd Ğ¨ öh!R¬{}jpedì¤Gr¡4dñj0<0ˆtnEòÒGõaae*P-¤u©2=0uhmõÇÿõdQMrz$âãn¦ªG @ö9)s}ïÔát9I¿j(ˆ! `¹K0x1 ¤°ÑaÔnáwJhT$'d((gN™QOŞ…jQyoÜ˜°a9K¦ .©Bpî>txÃU³tf-nm9»Ò5?>èb[3æSòaQ×-ö`CcApaâ®Nmâ‹¨ko,hphhG}¡]_tm§¯{gz÷)C,@SSI3`h `0€«¿¡"k•avgGtÑcaeb{:L8¨! 4T`4s.yhAóu¬ik|î@çt .<5AqOoCÌ­w4**sl!4€' /)²2  `ç`
/¡Ovm\ˆ	û$kö4ÉfGo§>î/jçkz%hæt½pêfeswaâa$pmpvaZŒb d!"‡$d÷`µs¢kKwe§0gr¬ùûTwnm·r tëÔiE#Bïäùf“(lmieç/APÍd^ZxnD egyš, ¡(q#¯Áïd["Decdå` ÁLs75sÄ©ğfrMiã)0„µIÿî.ti}mZ"Æe^`+hé!Q0€)0!//4Øü5pö2¼vUW¦zv!pic¡flf^Ojg%xü-aêab5èİvdr	5¡&/0f¥÷cõ~Esedt}Bt,®àpml
Š‚Ê-dâI`ÅîpeÕn1T	r6 m.ªDæhdnnnÅ†fcr7áş|Íîÿi,Ğ	‰{b(B
(  àrIÙNcDmÆcth+·otË*ulÂ.´&&UT;«sZmÆ$Ò$Z0.d+ãmeÓè-um$kíÛô)¥>ø[J81 Ù£ 0`toxc`êdtå{/Bÿéåe~#î|v Ã}m×Ç¥÷bxcdX0)'(°¡¤0£¡Bµ©q#"›.HˆÈ±„0be!#áÓzT`co'uìfPey(€+$u/$>Î$@°%¢R*­f3x¶6faöBk4DpŸóatÁ¹â4`èQî*wVe{TEdm;š¨%P `%X 5K|{(+¯R¤\7L#?%5= îWø`„ xe ;#Ë7cN$2é.)\erfpœaNçix(ô|i-YaìdEãNTªd=isDv+wÓ4s1ãt/S&-ed>fjQèİWLkªH l‡  á3%+¡øn–u~‰-æ)"SuaôgP-½#¸.OtEößD\×ÔXlÑ{†¡$l  HB#tìic#ßLä´Íº}q¬l,`tô~cåJ;8!`  &
! :àlQlPH
#¡¹°[dcÿïs6XE@|I]0,`2<$thé4h*k^#YëL)-xøsgeQaN×8CtùñRÚF]]LêEÅ¢kO
!`1"Ta g¾0ı…uxuìÌ"mfZ(`ßIéd%t…, uMa†tíğn`}y…ÆëluvÄe) ¨ ]3˜P!s :	dU¢©%x‰)((¡)kj  ) m·Ûàop²G÷,{88 +8éuwmuáfç# +$0`!_šBâhäçedãäS|ò93m!ş{sgípVTéQHidüeŠt 1ÿˆ,08b"‚…ìn;(zkXğôå u <h(%>v$r+é"5<x(0rb((}|y³~@FKixlaFt	vçTR@GCer1%	Rh¡§ ,!0jrctuòc;^ 08iug¡&!8n 2 ME h}ú%1æxûpw {DQgg´yÉá€—FK3tÉ4SKCb© k
 %€(8*p0%”KlRDI{VT :]&!t$ á”ß€$ ¢$05¼)rb1lGejQa÷dÇ0( kJàr(3áj@õ|Nö.ßEá&l.€{úëo|f M°uŠFpmqkKa~)i9@%2ÇRìAldri7-/H0"2 ¡A4g6doT0Alì<mÊTr0gggK.P`ë?.û%.)EN$<‚ôie³dãjneAsus&c2®Dtmn:TVFF(;B ¡¹`" r!¸İ£SŒíc0o3;otĞQr	)3ˆ2¡h '}9¯$  ¥p@CF}h8ï2EEtPå >8ñ­n$X)ïdmÄF(Ôåo&ä#(öÚyvŠ{bmÍcj%¡0`ù'ğONg5ò5ÉÈ>EöÄf.ØLÄÉe7‚ !eh‚!hd 	`z\dDgä/s\ó	fK64@plgçNô ˆ,by  0&€d(`aÔgkkB*1›$&y
i$d|ïj),@r:Lbst.r]ï'a.UÒZkd	MwVR(,W%-0. KvaÆcjb{ã¤a &—3è)aErLEd&<¶age`m¡ğiÍ–'-uxq¡'0Vp@ 4Çb$wv¡µå0zkaİt e_…er@lKyvTNUâd`qDDIz`&ãTë), 2ñq6n@` ¢%0 ´I¶bH7oÚLg!*JCe"9f¹t~¡umdV{CåhålzH|ole.T¨%òZ 	¥â¤b1y]~ C.'A<%cò*EOcÌæGö$:OE«º/H!ig³ån.ná%DbX*u/|ÎL\(1¿ ‚t1pŠagäEú?efz«adIoåd1°?íK—j%¯×ís'®©nEâ©Is(@!‰ /. 1W<cF4xgsVoyçuIsó\pkAôåŞqÔ1WE×=kÎIAJÉ ~HGîP( féBbtja7œ!ã<ù3ã´rÉ”Kwr[Ò‰Ç&LrE¨U4 gbi;e?@ ¥9 (¤q*Y1M$SqsMÀrÂuæâceWØsNÎJOİú\!=¨WePu=)
  t $Cm<{2<A>)oåÇdÄ<5t pY.p	rncıéSTySt"}KHf|è+l.LAG}%aÙÊAÉO&2-°` `$`xs==eDWd€a8LÒáczHtmïöU|ç14fáw&uá`a)ZP~ûi#Ùe\i»
„ " !ôXÉVÙunnêõwAv1|!y6náf p y^É,`d$²g`ôµ I oš   5û]0tìis­\ZoĞxw{ sŒ9$~wàt9(ûN”ˆå!"‰`,DÉi½._`pXO2:q¦dOveû!0`0#8´Ú,b Ë~C/? R6o<eódUeB$L##ékkİËÍLrEh|>¤„b4!%# b3vCr- jïït`aşª:hP*ïeU@Õuzc#iA{yd!"B Š
 H$(§%4@hQlmåŞ7XpËH *”œtmV¤(}™Iã®uih¦{  e(`9 7%Vñc<!iâ.å{<(2E‹/6¥Bƒ1t¡íoh¸àañekDkŸ%=%àwóxeg~ç
*DáeÏÖÜÅd
<¥!&m_"){KJ P"ÍmwedNd,k®EpÚD|«P0(A[jyõkfîI”,l|y|¼ms d$¢,oéRU ¼l0 :˜pÌAE$ov*wkMnDñslk/Š¥á !`ìlnâˆòD\i¦t÷(gjt v!::¨@€)X½t% ~£(r!3Íñ1pe½n%æ DLSE|CƒéeFd¬¸<ÁmM[QŞ ØUw
×P 2I;*`  ¨E({_|©ğ85 ômP;ÒÀ2£  
†A<eŞ.¦D(éò.dÍ¢-lL`X
„1d"['ĞïÊìpgŒQ˜0r#Jj 4é0€htnib~ïû)kkíÔÿkl'AcğO\pá^0(dh,e@Ôëdü/çá}dùz~m:È [EEWÂUKSÏtLD@#öEÙÒi;Š -"µ™	p ((}5`®)r>`!ææw0cv6dÊ4|o=ğVõµ"êg>òç®&½ :_ìLãé]J. Y" ­ˆ´»gNsT`^1oĞlPts,íLíhbT*< Qo{ dîozÅj65|e,aaNdh-ægNe ğıj*^m}tmr=kY
æ "¶¤øç .©çoo„U%¯¦$4ıq`gaômMZmäC†v9t3( ²±° hÈôuİØÔa uE"gmG.t,rul¯fu`)8Tf"`@b` Ó~ä0+º @"$2¨( EAwRex@yø'ş.0&zò"|dl\ orjtsç0	tÇ"o!5ÎdPklğª{¡.W8¥ÚLi6(6hlÃ rÌtLÈ-]eWqJcìledÖ(v İB^l¿iU]#-unµ­1[fNyñEğ¸yª8(t|è”4rõØàlpMmşõÓ/ì,`Îu	mz3&gnV!ã/xÿuhT	
:,3!›Mì*ebMo$&n±};HNudlh!y‚) d`¨@ ¢{qwtbû«, $
 Ÿ
*`b`'&O% èûvåmLaïqõól{àñêv;+ ›!˜è a .a¥ylğ¶y42`¦eüEïı}%jtàcKf|g~ò9 ¦1gï÷ÎÇd iò;! ì÷A onaÕ oÒ2á4+im…*iŠHh!$P !pbdˆ	tèMW
cgbaÍf
pI,«`;
a *p«4°95èIÌ *s_h1çjx<K>Nn|ÚN&=  - >#äeêâ/kÎb(!0‘"Dá)eumnl?ùfBrŸÔRÍÔ†õK#+C*"$cp a!ì  iíÏÌúo|%QxQáÒt+g|E|^}{w.Âà*‰ '!#/J(©–¢ *wcdgU³Aj~P0)¡ `" ¹&}%ºDjT!¸i|t@WlõeN=  hë:e,"$üF¼¨á&*h`.4;p $$ .! éŠb  ÔI2$u>gVm˜N$¥ ‘2dYjø(`&8d éıà¥wxùq-]bì&÷El4IéK »*$¿¥)(	11èw9,|ëHw.]£O~;heŒc2åoÀ|kD hK¢b!ªd p%xà‘s¦ndáh$(½!sav{´«øoIVíÿ>óN|nî]"ô¼Hj^å/jei×.E|c\isô,v™ª[d¥lV!FS¡¦E|L6lFï‹Š+± :  ¤=JK$0’d"« $ŒçD'î|.:É^çRNòWD -–âgcv%"aa¤` İ ®<sÅiiŠ©ò# 0° ÂlµdvjT"x]ùpcMhäå,  78"/ØVeV~2  %#9
 "$½* ! $HW\ñà`Ä) YÉ&"%¡ ègOs@¸u{nlu9-$ì7ivÎ_GlGmenöogu<AõxxKetd(å yšS§fW-zw-gëmat­yYèä°~Ì%àmwn_qgæìxw¾<J`Gq"²0!¤(zv8p{l0zca±+_ CROkvãVOoueVìíHuî|øÙv,õÍ|lD)¹:bP (üF#¬$$vwn‘÷e€´t bôEMã˜©e Tq@hegt- z`y`2`i4 ©uğa!èlGz…}3½ Crì'@Å$@?*xª  pe€:e`pÖí$Çenb$?B`¡à!|ˆrªñ00Ši¾f))tuAsxy/ìr _¤ÈmegvP*u$s›"D$ €jgvıûN cdmVpwyPëdr+"]Jv !²° JrÈUUg®lut}é!¨%~p>¤.ñ`-’«àRó©öÓõl:Æ h2B_m^M|i³lªrÖN-Demåga)uì]Eú§at4´ç=uO$CgfbE-¤axCjj%!$$buôõò&("mUd<cBü?Ruşmó&cel{apuóDoRş1ítaWfM`tõCêsq$xûí8­dğd/|ic@0åvtK'urFHtÇÿz10}9u$d`áuJ÷í¦(ii-i"$0 yJ	(Š W'ewO&¶0d(ûX ô(%°)ÏNR Ä)ª&  wŒp% k®NòA0Š 6”`] ½èò(es‹ÿÁOldmc­S2)¤ ¹Ä@¥røôeÇ¢`*â0Bp±¾¤»FoŒ)a§c³9$?J
Œä9+ jpWÅsnr~b¤Bmw>ùf©ô)¹#)aøü­u`~ %f,¯cácè0|İIªu(?k*3`)83Ï¢ „ )2v‚!z   {&`(äQI7boä{Ub(¿8,'f·r%iK.'é'sF!±0%já¥S-q{a.èHÏác¨pót¡5\2ÿüfqız¶OPvgÆ!C©p8í|3:Í(|÷çrn~; %pè!0eF›å±¨ $ëSå61cnl&f&SUqsI)(h{
 q!p_sa_#yw x3spjYuwjzàm?lhên|r%n({2'&2T5rq~2Nœ.uøonV°#inug.48½<`%àUmkP!r& ß&altæOtaaĞÔ8dîé“:MMèeManq,8"sÆ.SdjV;Š¶*$E)ˆ (`2ßgĞTO1qmb[ïª&{gjpvdSc ÖE*h(?Êdq #8i/fs|TYY0sT+¦Ò6rÂXb¨'¼:1	ª, *#°vnAâç,ÕæTº$q²ÆJkj}vT,Œ©0`a"  	gumfá`vuú`ß¬# 8.($k@!hêOi;#||i<§>H, b!`!\6Àc55xğnr8 i
#"0  5 ¡{¦gé$L¢ÁaJ<caçK6Ös®4€hGz.YCo.ÆÅW£VyäacáaAPhğcmiEoAój¨‰#0`  #}&à 0¥(ı­pKO* b2@ˆQd~„t0à¤mÆ6“0¤M®’ ã9¤ %ÀPrL}®{¼±û	ãh  lb$±f`?ä&qaùà0h36ÒãT+mæ*!ˆ6 ¨2è0(*ıH± €3m`4ë|l sÖre ¸`Ä21 %Kal :x{uF%`X+~`ÔnŞıÿ'1v¡ í)lôæ$NpqiË#Qr0hôp$¤>«$"Îñ"d`bù{hdni®Wb-n~É!hm+íş%µR<½+v$:b"Did
 00,2 0á|î	Ú 8~"è‘5dkh±©?pOu%¬	9$ ( !æ{#-hP¤wnw
2[$0Q j‘"2`", D(`-¤ædSòbº[ô.ju>R/*’p#}W0cnAME}@4yOõbŠRr$ ¤ Ì `^î» h ”,Õ<9û #* dl ph~)R%"'Oúáeml8mÅª80† $z$À•MeblE®r¤”D]¥¯(%( ³l-=`òèEvå2„±ä|%Z9xrÕ,l`¤  jf.8 8bj!dqÕac­<®Txío&OxsâidmØÿr8%"ìp'u}w/~Bhsæ¶eeqTa)00%(*­$Ø]X 8)t ”¢ gnGiSCpWUfG}eÚpácc I> 2)#(`$i(À `Dè)ns4!úŸênCªğh`ãgíglş  ¹5 d+ZX/ø.ı¢to%N¨ÿöê
: à  º• h   P2~S(~â¡Gön}uS4 â0q'Gä`{hCamŞ.e!ôq>»
 P’¡(3 €0SJ È#"±s#|¡¡*a‰ [3ã""©! |lp®G {"yäÇ,H}B3ğÏpTa~A?nfYe+    !t/ç.ó4ÑĞÑY""Vhxw.Ïîfg!/†2e¶›}ğÇo?rí5 6('öe~7$`¯b·ã>€v!-s6\wO,'.`|pçæBn~6Kf``fdHt$7C6áFxº:;>OHnÇ	a8 Ê-c4_3cl7kg74OĞpär~7.JÙ&)J$@!Táº\MD8P¡"8Já€TsNì@4^rmHmfntCşQCaôpèã@ll^ta'šR"`D a1fumódCG0©re&ñ}Ån\r	.b}aÔvÉ+¢ÕJhäcàtYéó&QgevkU-cserAJ{e"sX*…%ihI?&}2'TBvpìdhiä&u(d¨vo{zıåh&ˆi`!–!! à=
 eL"{oed@hvao"iU¶ xLeƒìmç.e#jª $((  ?w÷6k0aD|k>=ïT60­hoÕ>d3ioo\.ÜotpÑe1¢à
EHhQºîª€7N
 (áğÌúE`y5%äEp})l$y+b00,´"c?NyDPtòAcæçvRzJNhàj_cu"e¬ ltòogFmR®Sôn©V"% g	±Z:# ä8€bmf^&q2ofKreccM(|QiEç xHôä(?'d@ ªà0hppsiOÖ"{¶9)-é¥CawÙ&93{šƒá„(p#r:rEdevu`:TmÑâyn EÄm;kÓà*ÅMeÌæ¨ôiÏoïFsn¨|£Y"òÏğ&Á°åfT6ç¬ÊC[%$ddgr.pÿ~&(r8Zuhfbvú .Etelô@4( xúm{/Ní(t)xfrtû-<" £ 6° <"gxòõpén(™Ts)£·m:è¬¼]{ÏBAROQ5ADDqK¡ #h   ° Knnu%8n°Dôag$[‚<6kfQ	rcÒl0ÔƒQoÃä2_FÖ§7`tèMQîÇçæ'xÆ1|m¢?ôdM6JÏTƒgĞÖäU`*0°ÎhZ:ÛncvĞTóe8CvE~±,nM	V“ N.®! 8(j0Œ%„c?cöt)YVUºyST€L zâi'eÖ!1o(œÆåEAPIK^Fdş#PehÑ;ç>Y4º·ûänrNÔa/T]G{|UEvu¹A`xÅ2/g=®c ´ıcu/.AgMlnDNTƒ]yT€ `€Ğ`¤€8¨Gş¥.uIu~(`ô~ªìs,tñeR$çleLtnw !~eìô@nn)tx§1*{j,hhW6cdbükoïB,!ytgnô*q¾¡uyÉf/óimìFx¦f+fT‚¹= ¤8à@2$ `8aÎ”reNflfÿmoH,4HHr'eI%]edu/©Ä$wÎÜ`U5Êp&`éK&Wg7n.aw¦7h0dct÷$´w÷%|ôä/yôhm~,_,e©wl©å^*N4i;
¯  ,  ">H`   à$i‹
Nd #t`
vşj/WHlf-ëmäcdHqn!-%²¨~ (í¡9| ¿  d0¤Š0fK¦a‰ô©OcnœçuåyE*d&J€b('à£l`4pdhyç,ŒkDı9);ˆ'l(fa,20Ü,$ 0‚­}h²
(d¸hh ~öf~qIá<d/à~j?.4i#.ßæÀ}X®7.càwcewE(sÀÁEDTOR^Mt‘D)8ç&UëTØL.OCÌTÁ@‹İ¨9f cháedcÍf<é,f,år)ó	
p¨"%ã01ä"*u Às._config.selector) {
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
//# sourceMappingURL=bootstrap.bundle.js.map
