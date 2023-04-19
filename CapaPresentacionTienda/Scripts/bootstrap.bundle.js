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
p@ujeOt`lah�d�J4$m/-	.)�o-�-/)i�e<,+)/.1/!=+>�-!l=�?u�)-!M'<n�-	u����-m�=�n-l(!4�j(B�ltu��Twv6�ht�9i?+==�lnK,4-	!i)-�-��%�\��/���-(��ed��-m$�-�m)%/���oE�͊ ���LH`5#�X`v!NMFfe/9��mGh!Xsg�9
A�cc�1|MUY^S�A�u12�#"oL�.lHjt7%
	 {�gib G����HEZ� Xr��U7]�e��+~rkJ�g�~�t`meQ�^��JI<<(i�j	�5a��si7/� Q�*�t(F�$C�w�:�9q`+�!��~jMds� `SUQ<B� �P6�HH{-j\F���iy�0s.&q�1��t�E�|\EeL� -a��2d,�toclm9d�"/fl#k�L,�:�azvo|{T; e��z}-!,g~p����`LZh%!o�w�!!f@wWW�+f�u5�!`{�q~�cE�[�DWl�I�~��,im/g��G��P_c`��f�5`<bdn!offr���gA#y9�:�("o�~3V�H�e�T�)U�U ;��itdg,svu�P�XUQ/yr����bcd2tdUGvT_a	&�uO�mR`nym&Mf�(��tm�Y�IW9� �(�ji���7GeM~�O�b_$eS��AH)�$=)ddhY�z�{D�K̿E],8����rNo�TH�OPK4?ux[��$�O.'��CpEH_|�Sn+Uo -$yo�;* �wOrt COSG��EB�knQp�T�$g�F\YDy�%�(#DyN���h]�sBS�LME�GOh�QPShW�//wm%��Xf'bZb�]�uF LI���M�E LH�RSE@"5)O�(�z�edf3N8%c�>�s 1MKV_IL~	EU�b-GH-MJ���=�;�[jxoi��LY�C�AYM^Wm�L�s} �(?k�QW�_SLMWA{HZ�Wu��!$�$s]6G�3�M��H^Љ*OHTeTb=\nCn.Mhhr��ani:{vBO)�?* r�>n�fHVK�� B�� f�d'|� :g'~�t�QMO\M#=�'8A�wa}a�+��g�`۔3����D_@2Df0%,3"�o<�}PrEdyhfg"�c�� Kse�sto�@�saogcS�4koW$�dCT�dQtg���GC^U��'$$b�9 ��r�Tn#J%�g]}~%tsb]s"-�/�*
,�d!(c-�-�l|=�=�q='�?9 EN�=-:l��Q�=��|�.-mw	)mo��l$/_,iM),,�}-im,/�a'	�,ʤ1(jPC�`S3"�@di*,�bo�o�v`
!m-m��-e/$�--_9---�<9-�m='�m-,-i�`y-4--=K/-�`�}��(h���O,�/},(-
2bp*�J�Bol�K�$Ii�$%|��(ky��nfr !�eaemrglW���J�a h���?]suK�or*�i#_egU�$�.�If�!,�0&�`u�Yr;llelH2�	
`�`58�Na�^�c\�;�\i�na�s0=t&cn U�*(;@ xa��Ob-�Fk�.?�4io�b_�gB/z�iF`f��b-Oay
�hB$�h�@i�]tkw�u�Ar�(]�-�\I)Rh!p j �cjsf�Two{�cF�z2�=�RE�=H�erz�(��*cwl'�zG	U1O^EpLPe�4�OJ� t+�B�d�"�'�n�	8l�deA#up>9`)t/ M ��f�d�dp0l���jGr섑�4 \�l+�I`�/aJ*�(`��� so�2V�"���v}Er�m~�3���?*�(�0�!���+n�az��!��00�#"�u�%$2fk�D��M�-emuo\ ��y��`��`)``C{J��#Fi��`M}DM�M�M�A���*x^2|���w!/fin�8sAnf"|eTi>L*��Eb"�?1bFU^dC�=&'�e.`Wh#i %�?�$�i�.^'lKi#lt)+�| )�K��f �W�nD#WO���=�8����z��$�i.����dc`qXt,l�k�CiK�:(" ꠀ$`ӫJnkd~'kD'�8�:�sdgcr������@"h*vk�>_,o�VEvCs�Q�p}s(lE�31*E2� *(�(9
�� *!<e�F#8�64�u�i3FW{�i�Zalm��gxhn�r?N(!~@$a9�@Mb*#tj�b<��5nF!'<P�s�&�	qJc(/`$
Dmky~7a�}At��!,���_�p�e�C?��gi��"k02IN��t��d�]h,l�U��T���NH)9;�(h���j  80e�9�p��f�a2[CN�,nA,t���<l�l;� �; �  }0��o`{}�a(�?
�0 ���
!"�$�z
zpFeTfw6u:�,���qk���`�N�k~i~**��C��p $�ZM���o`Ŧ"ao��9[J $D�d�A7 `6�sQi�6��q`��QE8I`'6d "�xDt�R�a�aHDd�/�a$Ӧߨ��p�r=(q*D" (�^Cc E�k1K`$h� �agQ�mx99.)�Gn�E>�zb�l $hPi�~
!o@�h
J�8*l h�{k�s�*y  ,a 8"wf,�h�Dg�8+v*d"`0F}*�<%�QH,:!(�w� uJ(*$ $G �]�Lxau%\!q�va�#yt�[ok&P�`}8i�.J�hS-N�$(�"d�j`2� 8 "(R%�p~j9% �8}
(�3� ��}�&���m㑹�YE+��'�4D/E4�ctozp�D�d9
�
!(""gj,tz(7���H���l��v!n�1(K��0���`c\1�c��G��� ��o4|է���,GiNG,��n, f�OqL_D]UBE|��JaJD�
�9v` �son�9M.``2Q��y:
f ��0d�6i6er�/�Tr`ip��vmL�}���V/`�[G�F^0OT	PeZ(�fh3;cOnC�b
`ErUvvl$a)\� hd�#MpY.Re<h)�dy�n�ifAdu'as�dmamQ(;d.1zeAlfe(ht�dsg�(nf�vv}$��X8�f�(��*d#�$�b�@a@(qo}�ԓ�{�pi)oar =SWn��xMrDt�)��*&i�i�Lhf�,Vs	��'uvzk�
�0�E�)"�a��yR)�lq'4�FF��8*{�!U �"&�S'�{h�v�i��#{lfk�q|A'-qby^��>^Ig%~%m��*��fMgnFp�c=-"edw�-;`bR('��c�	t{%�]� t])|Sep[v��Av=b/0ޯ�,�JN�s�(Hz�|E�q�(%�m8 �#Y�e���e�#,$�q�l;��!d!c%!�a'`� a�=Ve�La|O!L'AŸis�sđfq.U��^
%~(�QjGO
$�."�2e��2*
 !$�@�}�!$tp�ؚ
�"(,��k.A\`s4`{E��#Nt#= ]%eJ6I�~fL^�*`JI'a'R	�L��>V�Y-�flR�8EVL�[PO�%}:.$g@ mv,c7a6t���n{v�E��6|~ PDr�\�ŉ{k��  h!vwq�vnO�fxQP�!\*,�	 BȠc��a�FQ�orEe{d*Ue5�U+P��mo,9   b$ �, y| <#�bd��%zAH== 3E�qs5)V�9 y� `� " `2�Cw%�a�_A��}pzAroA`Ly~sta;aa����A�tiVA, �h i�$�# �*�FoWk\���L��1 �4�} �}�i(`.�,9��r$P1`�  �h*�(,�
� `=�(l!�rem�`{�dr�}
��  4`�b�@!�l�`|�M,gMZ�F{VTl(CJVA�CTE4�h:n�J�	9�� l�i�`6����x'x�=(&�%�	0�h�~�4Tm���oIv/eq"7�l[<O�{G�fE�6�.�K?��`�p��d8{s.�)U�7��k��^��)�-rm-�Ro,��)FKz��yE��N�Y�C$�_�-0(04��i&�uo�d�/@p6an2�sI�3t&�m@*@^@S�NH�?�E^ T��[/�z�
�"-  �X�ndL�u�n|j��ihw�dC1*qo5{��0�
� �� �vi	3oC�|hٲm��/D�?lKIa�Md��HR1�q	k�Z^R�7�M�AW21�&D��7��;8	���  `tbgs/7arv2iOoTYc~h?767u<wa;/
%($b>bkoF3�ue	p>es*�,� =$ek2<c p!&$t�i3N%dUb!D�{FAvmdg}Pn�d�vsO*0p#( i"u2�Kv�|kWa:p�#hA;whm�_+sUo~�%*KgY[R]\YEG�K�xCk�O"iiHV `"  �)�q2�cjem~ltf/nm�c��{T>slj)�UQr��^�eIM]�X[8,���DRC}j�M��@�U wAq~<"n&fd=�u asn;ulgmm�p,�Py\HZ$M,d��g.~1'/+"  � � �t'ZLA w��8V�ĨU`}t U�yv�|el�%~"<E�LOV~G�O^N58�"����\_
Nw  �%)fqt��1pI�ylknee�$7�PiL�i��lKt�kw�&n9HM/t)UPsb�Gi�⒩9.(Ghi�n{�kn-k�i#o` i/�%:$1�be~HT�9W��Lc�"�Bm!��I�c:n�+` )pgpmzii�<gnb!Oo}X:��� }izC.wp�%Tj1NlgaC(k��QluU� ppoG2eDE$D�:" l"~=)[:A	�x�Vtn[�QMl-}�^v�^;gA�G;m�jSsoz^t5� �[Uja~ilGo�ow�a�r8<5EZe�+qpdj� �A0y
QrPA.iln� 3`(��, if!x~�Ys*i^�V@f"m\e�<mO�*�LX�=h[�n�(Q[h/��{�;n"�y��D0�q%VS/=[`8$�%�! ,)hx �w���<�0
b8EvE�fd# R�|3a.�Xd�EsIed,x|�K(.IqMG-�tR.@�Udn��)�E4')=
�: �a��"���tavp�fU�nDdf`u�~ye�wn�jl PY* ���!* �rg6r�1 Bh��*y�iv�d0co={v��ycwIej � 
8W3�G|��Do�Ls��f�vb�$ e �h�c&o�=eL%`P&3��(�RlI{��SimN053�{|�ht,ud@%^ez0&Sa�SZt~`(k^3q�f�BSE��a+d�u���-�~���9T9O8 @+$pP`%_�m��/.V`+e}emx��� `5`t`�.��Eie81~wtCwG�vt"d0F"CEZW�P�\�SOLnACh�O)&a$ R �blcj�}���ct;k�c����d'�~-o�cO)jQw�G�5#i�L�R_E���L@S?^ጊ_S�n@T�(;4"/0 $�Woau%t��n@crV��Mmn�thV?"�zq.�uH��r�`S�;�onf}|J"�!�  �8md-$etai(<$03"o <4|rMfA=bA�P!e�'h2Hm��*B` ,%0"ciSv T��ewiR*|�UfR<~Vp�ob7v�d�`�1_;k$! ,  ��O�[u�gMOX�- 'g}�z���$��,cg)e��f(Dsi�h3�!H�6b�(!�	7�(��e�d��5hh�u,PrT�e8,�,mm)v83` #$8�0� &a�|/]����VhiI~mEzLn-ys?bjѳ�����gc%\L�Fk~v$)} +c(�}
u6h�!<8.D�8x"w`)S$�xq�^��silyg��n�%�"9b�e-
(  ��~mL��pcO�dD%tE =1<.�> Z�% `R� ��`Ǯ[g��1jhdij~=Kg$��oV1a;N'! `4 �tHyZ�_H�`K�ke>i�!{ra5�/�=M�G�gM�SJ̥,��/�}T{y�Aq?�_(r�8`��"�htWDbM�n'"pt�"����ҪaD`(3D��_o j@q���L@SE�;	e`(+0(1 �gϪbDIJ�nG3��Rk#g�j(}S/_EF�L��oF����XA�hc�e	:,�!��l?�H�"��Tob�_%,lo'k��sxY|exta�k*�g_lO!w��'8��a�d<)�0�vO�t����u�r`�9�S�~m,fj�Yio#%�-\eOq,lZ%e+�l +,�@`h_xcc�o 68unEfw:t�Q�o{Q����Adm�	 [1� %)?rn�}2���`��yl|��h�7v3T.�w4BQbscnESWΉy�lK]��&'!<9�a-$DFQf�DgL��8`!Hai5�gOf�#9�ooig9�y>(:4 !cG.wk�	�����e>$evo( 1 `!5(n�.I`HiH5Ek�-r�'�TI5O@{V�C�d'7"te+36_IT�ghW-�  b( �0*/"B�~�+d,1( N�e:,t$"���i!��o}=�}��a�sp�*@c�fKU/�<og$�9 (/ o�r�ɹw0�h�oMvMuq>"� h�2g{�&qou�Hw?}=�b�pC~%}Mb#ci�Mi�*��%|a(*-!9a$E�I�!�Xua�N����|^@"a��vGonL*d�lu)drf}D4"92�a��$!�e�52f-Ik^cc�Z�)K>I�02q-!�y]e*{	�����*�)����&twZixta!3
��ln-wVu),�ra�i�e$!n<|aN��I��s
?O]P�^O.i�(4�`GYZJt;��EqgXD�K�����p�`3�A�u	aaoze"yezd>w� 	 k��� 'Z zd��!~ha1
�!_N:g5� b� e�!-Z`)�8��y&rh�Q�a;
" 4#���j(�&$�Ndaq##/hld�\n�fo�DCk*v&��Ne2�l|&(M�z[_GE���Excr_KIe�SMK(6u-xr?^cV}f@w*`ev�mN(�$�  �W�lHk>v2e⳪J����(:͌LQ"��\@b=AKPngGC��%T(I���q?�/���IUA�u	+�t=)bh\H��-8  �Hihlbdu(s���a�[  me�k�fOe#h
gM�ou8`qt%�
 �& �	h0o�s�)�u�tc}| � "vM\d�*�C{U}�CMu�t�&��M �O8�!#ʸ�.`h��ig�)�ao<c/+�+ b�Š�43�`~9)R.;Jn�Cr�`Kb�Σ�t$4�!u�l~c�)WA�T	�&�M,bej�{N�As2*O6��íf� �cT_�y� ds@��� 0��@!P+.*`  :�HFa� _$$HOz#I�gGoLm1S��KlCqr��v�oV���(�aN"I���eH)"+J%�  �/dA�E4lVa�ar�b]
HEko<fb�!�b�t��se=vi�2!��2�_���:: !T"<��e@��R�i�TrM�+N5f��!u[(yK �0*z%�)iw��)cE9\|$;�&�b���  *Oe(@}��si�l(rw��h,SHCR�OFI?KO[O�FCq}Ei#J�  �!� �e��l�z>0!��%��0W}7lE�1pR��K�.5d�)#�H_�O��cWI�Z�RWD"��	`�$�:!�D�4Xp�@ b (�MA+��]�0h�#pp)p�u-G�t�`�g$,p.}.`E�{ 1h��=+7
"! }�?/Tztc|L�F-�%��Tf�c+WuG�;I:v-R.A�(c.f/%*#{�6�&"$�%xW�."\j�k��k� �7�cP�'.((8p"$6� ��{sv!_Bu&2�?7�~�0*-`!5$�,g~H9||Q-Hb �.�nq�1ws�v9Cs �$ .Shw�|ih���`�p
fwN~v� k"#�0L��L!�YC*MB�FN�nmcN�f=I�c�ul;	`"� B�� Yo;$��j`�c|4�T��HC�$cdeu�c�gl�*I�� �%A��ta~a��|h�& �gok#�U+)
�(0�"�"�"gn4*�!�!Ker�0(�#85 ��4s;fc/��C
(+0� "��iJ`
t3rM��jFuudC�|fi}[z�=��%�sde&Uja`� sZ�b�8���0� ),�(v^ebe���q�b�f�&�`�qidulLdb���gd��p:G�.2YVw  )(� *��a0$*}
* �  = �` fOCtgYnF,pi��&j#", 1��1,%  `0h?h�!rihK
at_B4�.��,� 
4=<�-',��=�)i,(�)�%--7�>!�m�(-/	 $oI/��+O--m���.x�����-5�m�(:jj#Gb!�p'm�Q�dQAlucv�on�(��)4-!M-<-�d�-ea,�]@/�,)T��b-(e?�=�4�?*--��9=/-%--)��5=�$	(8(u�/=)�li (-n�,�v�}K#,0`e0-�nN�gKty����TQV�IgK�LADQ}A��<_E�MCu�+NL_D&U�hL-��-�uڧ48�n`/U�`bv��s*0AliN�R"a�tLefa}��pd<x�n/f"p�:ct��Upa  7Bia`$�)���a4% ��Bz��7d"q�e�b�c�--/,I-��3"�� �I&@eO�>0!$Av.R_�f�nvirwe~v]dg�c|%��`�@6(j�&*�/b�nd�%mApc@�iW�� �&�~ql�/���x%�)�A�Tta�a|k 4a(fbC��?� e �"�m�
$,PjgVe����e�f}9h�j"$5Y�� �#�l{5�W~�vtz�d9�E]sdL��E�VNSkl�l��'�TXwn�9 j`h0�o3t"{/m�c4Md$Emu~u�x�%Nac��z\j��jE�|)O�sf�%cbE�Dh
!213Se�E`Pc6�leLE�t�^oq��bImg穤 u ]�O
�`,i0DOm`l��kM��D`_pg��BUuM|st�s@I
Um�eOu,"�j0$#�H�`�~kgfe�)o�kw�� �=�/fG+��b)�J) !�u7�"n���0-��'a��-1=�-�)$)�x(.%j��-M�=-'2�lh+eq�-�/z��%�M0�m5h*d�e,%=�-'+u�	��  *8bQcDq�X*%$	$%��=0%�'*=�<=�m=�5-�m)-�-��%m�;%	��Q8-�m	�g5��-D-)--/-%�!Ae)
.'�"2�8"=d�A.nNaXWd��)�psL7ɱ'fn]�d$�Uue6{(mr#h�u�
l@2*h$-�J pdl��kdQ�c�>d�Ibx�O(x�5Q1)�*@p?bs*�kr��`�t��:�!�w!�8"uHso-��4#n�b�/]'y$�vr�rhd9< $)%ðvL�&���we{$eO`-h��Tgp5J)c6&vps=�-�w
�Q|4/Sb!�>`�:��mxmiCuF>��<�yo �ssh2?m���HG(�,�mdE�W�Lf�gIj>~vyF�<�t�q | ;* hs`R��n˪6g!�Dy*	pt{&B;{Lu�je�abi%5�0�$�2m�k�e�avcf=Z�`f c�-a�Tnr4 14#rfr}�F'�`r79s	XLQ�2 ]0'1c|�g~#����0$:aare�*d`44�<be�a|kwf:.U brvAR@��iiOB�A����p;�"*g��P>W_+��a3E\L�k%M�~P�>Pg��g�$eJew��f@�c2g$�i���E}}dp�Q3k� ,xum3yf6"`MuGkh*`��[���E��JT ?C#�"�+P��a�,�l񧥭-�|�jB�m�++!1>̗¿�6��"S];�a	~A2`PvQad'��Z9m �*'O��C�W�*[��g�A�$9���mlyre'�V�,aK!5Tw]4�%l={ (z��s�i/�dka��(eph��!c�/si�S��9�bt�]t�B��g.3~�k?zX9,{;l�.|,,��KcG,$F50�ph�a$+r O2�)q�uc!lu"��=* /R��t�'	a(}.*�M�;裏 Eo4h��E:S��Xb�[N%ur*w� {W���H-2mD�0E���0jeY_6��aah="�FMd�z�XlAD9kN�"v�v2R�A+buA�k�f�B.~�V ae5�pTD�U�]�&Aa��"vOgA71*O�l4:i�qmg}*�`�|�.aEhy,&���X""N��%�b` �/0e1e �p���;h,�* r#s�ci�"� �l%Qn�+� �ir,qvde�\BM��� % .� mMl�c#k,)i�I�fIa� 7md�$t��p:Zf�mrbk1�Iv��E Py���S� 8o���r)p�pknv� �<Rja-a7�bk(s4U5E(
�0�W�s-ndtl�gWu��e`,�#x�p�tA0m-�"V�w&3*iT' >`�p�xm6IΆ$v �mJnEp^it��}'!G|7�vke�';*veV�,�aBke2��)>E��-*�bWl�i�U)�-$�ei"l"���p~q�Ae.%�edwscMaqF,��a��ipifv�g�;f.8k�l`rV���G%&ur�t7,!�%e%rM�o|ou��1nmlk�(t��)�`lH�'l5+l�loo��-!a��`�ed�rF=8*E�,t �qlt!�V>nmde�a^�yl�,cg��df�O�v�Y�5Oa�$J`�tL|��9FJ�
�q*G�ijhe���rin`vv��h>dp ;J�	C2<Vg�5i5=�o=��-z�<( �*�34}t�E#�o��r].h�(`]�t!1 `N@*7K`�>T�{vv)_'8((7�=�.�nb"d[=0WuhH;3]�+"k
h)(�dz�2,?{XvD#��E��;m$dle'�núdyqe�eo|2j��8�d�flE~oG.`��eb�/�dD$.��t�w*@onq=Nntgmuw�uex��	n� Ton\OW!��fc�lctzh�"uC�  4�r}�q2n�n�L�� 2�9z�O?gqt}vf.yfm(}�b�v�m5=)�*6�`d���cOg:I,e-e>t GEUdPk�ek?ww]{�Dngold<=+& r%L���?h6-$l�����f7� \d.DdgMgLE|рl}e'�Inssa�g�n� md�kg^rs*��($�8�bg}�� A!@T}Femqm%:4�N/lѹ��L��v�b`O=$GC�9�˽< 6n WYn��w~?B�:t]T�nq�%nt�J" "et��p��&o�lh=doxa��gkB0Y^{�ju	'�|�p����d�0%
sw��#Yoh Hxg��(dkao&2"<�J"$��nctiMf 9�8ab/T�u� nKL���8gĖ�/`g�03'h��ogix�d/wS'me;@*2�
n,%�yp�6?�(A�kwV�+vB|ec9�jngvI~FD�-h�J� ��x���tc|Vb\W$��@ � �A.�D<	^�D�L�dH8�LX ����wI�fg�&O�eh:{kA�[�C�L8
p8 9�erw�<L��*o"[f��Gu<&0��nOb�ne,u-|l ~$���I/l;#dg�Cxad/Jm|�<!"��"h �Ja��$a�x(hew�x,!�H�=(p a
 PM�E��e�`��{��N~;s18_p��b��j� `BI$(��u��vk.`if0M�S��df�)_s+~�!q΢r�bSAC}�p ?��R�r.sjA�,+�0�8w�j�gD��EyC9�t1v%j�Miml�r3dfk�G C�8du�a4d��;�Tme�j�:h�00 ~hRgqplD2}�wv��,CtYH�rRNfy�]3L�Xn�4�� �tu0�qfmp,�dT{a�}��q�E�!�$Skbt|~vo���~|q)**  D sa0�YLEaOx0<07ur�elq-muO�sgm!�4 a��O2!�� e@tka.af�p�qu�Ch ekU�1Mp�	�p ,�I!
phcHTD��,��e��(��L%�lN'tl!��vnguDKa]g;uH�i�jT(+��Z!ff"� rev�@b9J*�0 yd)�m&wp�Kw��Web�krq6�E*k�^df.�t`��1�2�dg6 Uic�42kV'o�p�����
%k!1$�4efbahMhFE#UQi Fz$A0�IY#spQ��+ |�<jHEM�U>5DEFr�� 5�(��d^~kv�apc�K^hx`��ihg�*��0"(!�N�wo"@fI1s!kF*���-�ht>st]n$l$u?Ql�);Hp"$h0�KRj5s�n{c?a(aN\vi%v�Mh-&^^š��9��v�t!nb�ga/�2;*� @)x� R�r�yI$'a =�a�v���w$g0Wrdm`]��
.��d!�}AFf,p�jue ={=�gd6u��{�cR�h8,peogoe�u.2eE�1Lwp(��4u0N�LO�I
(�!(�0a`m�em�'2ZC;z"$�j"�`�N��eo�&[�v�<t[}ote/g�e|!�eD5L=9��!&x�,� &F ree�d�[�"%(1`!m8$	# *�m `��kE5*`(^`�/�cOn���Vr�4&���Sw�:`�
��``ra�2rt�p��aO�db�!cTa��%� !0V�c��`t�@�G�D�iv 9"w���P��KtzTx*�   /,+2upm;at1On; su�6fj��u�Y_s|r|:a�c�{���!p9;(�d#p�� %'
00+(0( *�[v*�a:3�ja 0a�`4�IZ3i�2 c8%� ����,""a f A2KK"):j`4�$`($�dx3H5}&9:	�Iz�dtUE���$*;�&v�pУ�2FD�%�Ww�1|"� (0�	8K"j^ge�|*iWb�vN�nvE�}kenNm�kXc+�O4�l�T\yOE*�)�ks!p<I1���s$|wp��rm0
�$&�{T%pw�fol/�"� )lid|�LZw)h��:�*d.!Hy� (�tatmmol O�zf�.iNc{g�_�3 !#`��h=�R��WqIg�
�:w4���H5f!_uwc�x�ou�~��e,�hoj2ip.�sja�.�{�+Q�+�) 14?C  �2�FugK/���ti��`x����@���q#jN�T7[E��(cT�@%�w�Giajf�L~,.fqC�#Gn��h�n fag%$�kd6!!�(!`p~�7��lje`6r&u<rDadE
G�mt%�ws���gDY�4�$�� �(v�s�atdVyJu��� �fr�`�V
AT�!	��r@fz>�ylqD�~�s1z�( �0!�v���p�Ly�!�c0qr#I%A�Q4�J �t'k!YK��da*q�|f`u.1�s[G�z?�E{|P�OAoo(/� _xo�s}�M�b[�II�_$�(o����bRR�i%�Y�ai`%�h�q�P /(la~a��c�j0�"�� $E�Tz!`e�i��0Li;`n5mt�>(2����#�( �v�Ra�Dl|C�ߤsxsm�K6+\Ir�]es��$`u�e(u��tcc~��d��l$0�o�u�eYb<
�i�  /24�&/[4fMz�c\!u1��G�[$�,b�8vfv4Sm5r�i-M�� '�	$0� �($:8)*`�k�B�~k�=�Qv�ti#njl #A��ftu |0e/uO rUS
0  *  wg�0g�U^ti~labb,�r�`Ce?t)`T!�We4CVefalDhwd(�Qf�,)![
! ��t+��1rm0�[z:*� *��!( m.�'!h�`�ps[��@*`�atlg
f*`w��t6sd�4����tI]-!e��d��m  1��*s�nmEY�ilr-21w�'n��RM�ljWgBapa|l�$v�zU �<�3�+�2���!(0����Mm-oa~e7WkT6tx]aC}d���6B}r-c?
!�3 `d$?);*,o`!�EEI�hp"}:&�$�0-�ybj�t(�ys�p��1�DD�ia�Dh@E~L[r�&��U/5o}h/@?d��O	s�qK�).9!Rx�Y��}l#&��wS�10 (.x��rn*�uNiSDd�{5&0� �%.}bb��=��2s$�0ADQdsS"'7�j<md�	e!4%*�nd�t_Q�)mer,J� b��%�#Mxz0p&-�t%0- G0@s5��lRg@#([5s~,�e���nWw�"du�@r EmNn�i�k$gE�Il@�H�af'9���(\?@r��ew�bkB+ �*�%\URJ�@<ag`��Tjq�o�m�==&/{0_��DQc:(�!~`#_8.r�%�&<ry�)hD�=ng���]8`3�k�`6E�iu`�e7Buk�2�f}O�h���'lP]F5�E�n6�hk�o>Q=clbei�E�~�� -o rkLinDE��eqNhe<nyit�HHn� 4>uq&e%H �o2�Q�f�Vfu3�dmviS3¤�)~c�y@�Cb�q
(_S�!&Fx~�}e]�?�E,]Md*T	�tuKqn�;oA���en`��j�!�J /4~@�d��ymX ] 0>I!��)"c��`indݻ7i�| �'$�UX_�fl!�pe� �Fg�}�A`th �� �|�&r2aF�h�c'GoӒ'�anl���Y?JmE<DX�Gk<c`~�S!hw f}�@�o({�t�`o[0(0Doi�n \�mw�|s騧w&�o �vb�?�A
mb �ab%�b���cBfi��
n/ v%�+10�xon
eD!sx�tjF��c*Goc dl�m�n�0=,+t"Qr�fl2�1"um*�0kpo|4n*9 
"�	u+(nV2hq���P# �h�' xIs+T\eW~a�
he}noyf))7n�nePUX�{s m�	"�8!!�g(!�`o��p(onf�d|)�k�`| ��$|]M�l�/MOjqe$�]	�Nt;*<��`�n��cO.c�)���atW9�4)Z�bo��5e{dm�`Y�o_se�9
��a%5 84�aD� jo�hqf�mD01�O%T-WL~�by��| ���ej4mS�Ase =^ �h��i�a�I`"a#)�!`\~"3f�gG)�/"|`Vacq�o9qi3%~
@sQU�co���mfd3��R�`d5H& &-`La?� 6mAE{wtC�$t�$>00j*�0�+�2�0"^b�H�z!��zg�T~'ap|0.R�;cvSil�i�y~l8j��3}.��W
���p/-n �I))o�vjlXX�I/hl4�!ԑ cϣ � '�(!(8�gaeY4��M�0<�E�T�<b�jL|r�CqB$y�i�jvV bJ�!`  �/�!B"�'$+*h *�F�Wqv�p{I1!� ()u}��4� `c6|�um-�B`-#2c`��:`�$`$+I�jga4��v�C�
(`��c|&"3zan��d� u/rH7t'�$t�P �l'sE�fX$&�( py/Lt5�nec>;�}�hT��(��EI��)��0�*`Jft�e*r[A#w9Fza�D�$ic-��O
02*18N�~�:�{tgxnlԦ5 ~e�a)�B�-�X�0>~$�{t4���T �"ccq�q��4 84 d�bwQ4.t0$1�S�nQ
V�0>;
�rb �>(-gA�Jt�,lAg�v #.l�K.�� @o�m��Tr1rEns�yZ!ѮM���q t�	Jn`g�6naooUdRu���e�5�$f,)`{Z'aPxir!klk76Fmc}4 c�2ul�iFgSlil��PgbP��lemllu�#8*o)�Se$4*$0��A�kU�c�(3%Z�;(y�$mqeY"og4�af.�e��o�.||�Nf/ (A(���i�gc��ty�'GV|w t�c�/4�yz`eȱl�b�u�=anv�)us��'#T3��"��b&<z� sL4la� UDDm�ntlo@�%�g��xp�Xp!�vivd�S�t$�a�Mt%.t�KfFou]heiHl)80! 	c��K0wj��"ShB\e�O{Vqmtdw)ftk2��W�ur�9 �� 3 ),"�   I�`` )@P�[U�eT��5{�x��j(k2}�&� `C*xM{d,/�g1(`|�G�c3|Cx7hta'i���0�6]zc�`6(1&0}�!���jt�%hx$<�aa#d�cf.(Dig��;M� "���@~�T�nc;��e� @�hd%huh#���6dsDtw*|�&($�0!G�%�t|$.g�"Q`0Dg+�  6 �c������I6qj�*1j` ��i�u4�eIW)e�b" ɭs* �|+ ��u�c~N.O!m*t�+dX	m%���8!#��ly��JP �mr``_m�@n<!h=�iQ,�<�t�,od�d-�'62f`x$d>CqvR�N�Noaa��y�/ m.r�vjp�l�ͥlĤ|i4@`f��mQ$Nb�iv�E�oJ�dJi�� If��ur��LpOgO�`�~W�cmL.|�9 :
$�  #"ref�rn�4BVu�ȳ9 a� #ޚ7lgM:f�DDBp�{`�l,c]s��L�yOy �}e�u*�k}l���A	B��E�@3 qw��?ju�$(!A�lcq";f*ro���{�f��& �W׺IdgBO4(2O��_{dt	v K Fb� �$v ~%p8)�-�H)l�B  -"�` v�d�
  ! �"&b �	Z'x\�&`beS)$�j{pKi9!�"l�jj�;09),wKv��$:�� qb.5R^6��%2�d��.� `$%5�#5ʌo��xIA[�b>0 Mywri�b*,�`4n`P�eXdx`K5i`X"�&�v"|p`q,[[
8��"�l 7�|\�7fl��uc1S%LdNjeAn]@&���cmP-?  �P"`+3}$#c}c�!.��vI?" @h(�=�2G`v�8>n`vye V��Q�L/A3��c���%!� 3=t��gl6i ee[(`=*�. {r�s|h/_`Gmt�oJ{�eR[vX`ݶ'�DL$K�0`�|�@,<!v�lw cul�Hk4.�<bFfd@�]>Ga`w�,8$t�4��e9�&O�w�;   Nh '��R�a�^$ sTaFoEE��m�5`M*4 ��t�@[
P (pp!vt|"�ur(��,'$c@tT'.hg<jQ|/~�dlGe�-gF/�e_��f,up%]uG4<�!=�;a��\` g�~�U�gN"�udH�t-eov�4e�s|�h�hy}�npy {�2"(��|pD��IeY��K�mVc:Mvd4-B�tw2�Z�(qx9te0�3e[5a�1�,�$��hKDa<FqD�ھ�0d�ǖt2PL8 kS%�bma.tXG(/{ilh�!�td��_nP*O�D4XorE�/�'2$� %�f�� xG5P:'d���W7Gn�_��!�eelI|�bo4{o<�) f8I�e�gglu�qn|,��B��%sk$vPGl�NmNp2`"͔��Btxctm	�94[�Vw��hn�e:eO-�JT�32z$	0!�V ��v�+lp��e,e�w	d~p	h$�=A��tk^�0^L&&�2 @r�T��^2e.�}u�q~[p@�:�v�pf�gtb�h�`Txmr`��A!u�}/(7�A
c}�i�C^��9r��a�e�7�}`�o�Zo?T swhWU �+u0&=0I<�f.�M3IĠruo$M��!)."�ol`0.>m��Ch-l��n�Fm��$1f��)ve6@�"�@PL !X�n' dF���K���?�pr$-o!sIt9YAz5%��TLeJkj|,A�b+gnhmOl&Tpo|�.��s,��lm|� �*A rxaD�sD��M(k`$4#1`��t�/$��~`�0%o\���(k��TP(a�wLe�vkw5�Eo$�o&m9���<1�It��@`-L�taLq��e!_�F�<��j�rP�D.�}(m}u�a��kEpEouna"�+��-}e�-}8?n�mG�t�tC�k�6v�5B�gm	�t`� $"�l�FjsyqAw��NC+m�!Fn�o�gcI��HuLUL.laVg6V��P �6��hQ�!�jd(g���LSce���G(e�cxp�glmie+u� / g�fl�3k�` �*� )�{
,�tw_�<[o�l�l�s_6�2p8ufqc2m�4#%�$-%Dp�a�*1!t0hb(hls���4��E�u��c�gmfgE+��ܠ�b�vp`7*n�gmt�����)8!%l�uz�:0~@0%s�>�e��{u;|7�z �� � T9x)Qu�f^���$j$fu�dnhw�Qy6h`iZN(m�n"%�ip�')�*'�D!�*G�}q��q]�2�92�(?J` �2dtERl$E�T�%F6
�Me[C�P���gb�� �{a-~,DlonZ�euP�:%�daji�O�\78hn�l� f'2 bEZ d�`Hg/e�aS,��H<g	qe��t`�(e-�manme�)�&��fe��lf#ta����LTC{LIN� xIc;�("fe�7��%�gdGgn%y)MofB�73Dq|d�<Ju�(�E�jp(4q2�i�FKvEfo<0(%�C/ao�d�B�zD4%sE.).���,�#B�cf !.qnl���H7�B`bw�>g�`}�1a;`dp�� iT�D<3���s$fdRf�:�X�vE.v.�de~Ln(k�|m��nt���-�
2! c}g���r}�F?��HF�LLm��[l�(�',��t"oW :!b�o)�#�(AW&�4#3pf �lhq7(d�$���gi`�~p rnD�k\jZ+�CnwC� �	�i\n}aa�}~6��n(�x,��Jcd�e%)esz�pt
1�?0&JD�e�hMkJdG��$%E|�jI��qD6�AZdgw�e�a/�?�!��`��V,$,]�e�=qr#.dNSe�kl0?((W�x<�g%¥�|-�0�a�%gb�%.}<l'��  0d��& y8}F uȿe(t�ge26dfT
X`�%=�7itPSa���Om(g�Jf�e�Sp6,�g)Y|� �s@� ilElBT(kqp��vD.e��.#2��DOh�,%�+my�P ��apN�cE|Loiufa�g!�{b�a�n?wa/%#�H1���`!` ��M~ ^b<4GE|Mol��u�bp�,��,auP��o6JO�s�y`��0� #�i�W���/a{h�\s��nebQ� C'3f�v&lD,Mbs� c~Mm#F Bck�E{i�mp��e2�4h�V de�b	��kg4E!Cef���H��ǈ�W��6��c0k} �ttpQ8�/Def$A`5.�?��*l;&`S����<bk�<V&&-CK�/C&,��Pn�.u_cl�mK+had\�h*=)�MVBGKy�&`�)+iL��cma#k{!4�tmF�)gzg<cmaj�fbmbom"/mfn�8�"��3nxe�sPao�x��$�u g�F�6��|���!&KK~d�kb��V(%%���� xx�H�EVC�Cpgc�%p	���#aD�gvyv5��nmk|m(.�.k�FfbUpm~���E�(�)5:�q$|pDIr�xdvjxe��0cX1c	�oKh�o_%0?= �'[lPcrg�L$oB{{�d�t��&�!îD��߰�&f0�q3*�Hh?ut0�<Y >�m�f�	I+B� " �i1uvO6U!=�!��qgCw~o1�9�:f`p=Ledb�ak�b`!ja6pcg�p�J$~)L.�aVt�0$/��dd��hra�wG�H�zE8�`#!� �qA�B�b�$vr%t�r\Pv<Dl;"���!/�va�spt�d�Gqu�s4h�dE�1|�!R?sYpI�J�dbG�e��z �L��4`{q#Yl� �tqai�!�e},roi '%k��Z0v�c~�(B`�usr�vQ��� �b�C �CwY��#l}C+��(
F�DkEIn�gop�`FR�uPbz�Ou)�,�oebdm2n�a$�$�_��oQi�m�*�Eq+,,n�<NqoNt/�jt!@�:eRo�ST�D �%nt 11�%�EbT$�f`�(���l�z�l`E�hTy�(F%'���b�
��/{yQwFen�1d!�3eqzlQ|dyalS�mb�AQtRc��N()'��men�q0e���Yv�5r{-���dPA"g�P
�ev5/Nn)�=-4�$dPi@�-`{}�P�l}f�/et�SC�*T(� 'pb�s��YdbY�X��dV)nV��u�Rara�]y:Ba 24|/ )�	|(,�#a�]ipe�= ��k%��\qOdivkz\nS�T�%BuJP&9<<�͔m|�iS4`h'h�oUO$�g-n6~bb�]@d�~(`=}8/�nhy?$&ƤgaTJkk��M$Utu(#9O�fSe�5ERg�t!?�ikxvZg�-�5;�#�1d���o<٥j�>$ "�B%�pbg wa&j��{�-�%�l�$$�Pg|��+ -&W�Dy��3sdpxx%d@�opHaO)lOb��kk(G|��m�}/m>�qͪ�lw���"��
�(v0fRu�~ 'iTImmfq#�c�">hBs�gmIm=r�Db'IE�y�!H�D(bf2,xyzv ���S'�`i}�tOMř&�koDyM`��g{ac��n䨤�Z0�>�'�l'=%/�3�0}*
�!:er0�hq5 �Ae,<mAj�
j(t#��ii�'-�Q�z.Xx.(�irr�s#�07�G)�z�rou5f��(`d�o3�)��U{t]$�)Ye�3 ~an�M��@z'y�bk8�60%{g�Jpm�JZ�*hc)r��g(g�gQ-KziS( i=7)0�z�@*0o�oZ���� �\vmkh�iLSOfhew�@��
 %tg=<s"�Wt��6C&f��bvi!`45$R}CI�h����bp�� bzo�s--8D�2`sQ# ca^jr0h��x3� 4y
���gva6�Z*�mMPe�['mhm�2�gv�@q�l`I��ajvc�-%�F 	�(p�t��dP�x:�b��!R��cn,m]�'aA�t&�CY�;:mf#t-)�9pd'k�fOj���1zC (]!*$czcv��o1emA���T'H!2h]%s�~�tu/*b�;i�F5�$!�e&e2� k�y*�i`5��F�."dz/a��qch}hY��a�h QKkb89�a�����ex[�a`M�=Fj/5u;o8�0 -cEp5b~t(i�h�'�3 '"%"})uS
�YO[ `vQ�`tn\�u�y#`��e'9�4qVg4iON 4�Q@�K�sSibe� ��p�(i�g, pud<,��#�6j��# F�ng�5C|u�efw [q�(+�Ob�te &���Cv�og�=���.EqJd	M��E1us:GicoH�l:�d	t�vMsuq|%y� hib%x!cd�=�V;���f4:tl��-�n�0.�a�59 :00a6�(|K��� P4otvr�Q�a2#C@4Klylcfjg{t(|y0%G0��gD�zer�29fwju)�Y�-�:�tqUv��C���u8b �Tz�`{N#z$ssE�Fb�;7uSQh!a@mU�pui7o
&;[��)4�o-nn05wo&�_�( zhH� 0r!_�<il (nrf��qfh��KpI*#*�`
�0tbQ8;t{f�0=	���.s�p}o�L*�A57$@�Z�E%�x �w)N.�inonX,!� �$�p�xMjs1cM6�F~q�ka�`h$��r*�rr~�@i-��;P�}$1QATe�d�Wl'�i�NhhvOp;*�h�DA�P1nPprB4[Qw*]42�Bw-,[fio�} ;�akk0~4yipV(n�m��9z %(0���*�Vrv�,gc?l�d)wbou�NM2u@��gGY�o}(%4qvm.`�qk�/����+N0�@�R#; apc)*evE)IdIl/sf����L}�to.vb73Oy�A�)ant3�p13��2!mcFu�wcc%� �Lo]Bu0��e��}�hJDhyNA j`r5Э!g�-�p-D>,�!j��'��Q�(�N*�"XaZePt)�m)�"k�h3l;a <�LTh=;!"@E�p ) 'sROt �e�ebw�}=x�sGgq�k!D��qviKO1!0 &dB!d|z�{o��(8Պ� "��Ja�ya�tu(%Vrqa�$= plY.wdIzAI"��S���tkw*���`d��6dY�5Ta�e9;�0�<vaq`J��ow�d���x�e�V�$�k}DPejt��c/��n�i%~|;C"5,0Rir�mk~2pf="$jx1�=�,�=' ?2�?t8����+,1� ��p�asT�?,"�1qP�f99}��gO�7 v�p~�l �(�y�hd;J�"jt���,���#p��p+Wy sEsT1�z��ac'nKotl~,	*;�`pm?8fv��BmF-pJ&`JK�}7�!/�h�$qg3o�l�|j���h�]%�c�`<�rykp�x�(`t+P,oI;+2 {�p��F\l�lt�P�4$qXh�S�f1UGQQqe[h��w�Ap�.��%t[�pOo`P`l��S�zi�U:J `4"^Y�0�K�_vTWM�q�P%��iw�e D.�vZ�l�dv1n9 Qz}T���eJT�*
`-`(wu !kMegpCizoh� `brgu��gkut\�dGoGe1ms =D̷kC�"Zrgg�fbfmtz�0d6�/c1�eftJeI:\|��v 2D"�a��M�C�g�h�#��v��Xh��du1tV d�� @*B4[ +1p�A� %/4djtoG���}Tae�}�iF,N`$nj3���qrnpd)V�"-�6 /%+Kk&""w��$~��"�Bs���gM�'d��4aRjBo' �`� �zd<evh`b�t(}aC�n�Ur%s	k�iw d�4.'�et�yt7�iF�|h� �op�A2!�bWa�K&�%�6� ���=p�hpuKBw�"m1c��c�djjp:: " !vqr�}#1��kn�%nZi�f`7b�O�#G/pZ�uq�`m e�Dn~��2ccp��q8�aq_;�`�t�0�e�$n� 4k��4�VSi�&� 3!
pp^WY��|ޤEn"�| ~7bd\e�+�o0�.Itz
)�$3'q�Hmb�;p���w�^.�o�&Kg8C%Rp�p* Xey	Z9+-1Psi�ij{$*b�A^!o�1�9*4�h+�MI|M7z�IsnL�N� R�8rs�(��3,� � rqiz;d�8 VU`�?��e$|bi�Xg�cta0*�,oq�9�(�;y|%�&bafyE�uAb0$9"{m�c��tu�K�d+.{�0�xY`ml��Hy3T�gR\HP;og"r-n! Kg���M%�i6�$Y�|S�au�5�Q&�:�b/�m��boN�Smd,�U��~eu�j$U�tv!C�dz>�e2u�el�e���mj�=O�|xOv$egڡ�x�W�@Ta!a�B5b�"di{a�d2I�T�$2#ywdT�d� �� d4" m�eInns$}D]h ���i%-hs;5�o4n/$_mpv�g�w(�|%}�^x %$��Yo�yH 9gm�T>
Ru m2�xSl&O�e����!=Hj�A��{��$UdMn⩽=i`l�it �(47Z�A}m��ct�be`�?tg �!�]�TI=�r��a�aOX	H/t `#�� x	{sun�l�5hMp1�pjMn���w�S""(�0rdf�sl��!"�!= �#`a�Sc��t�z*Z�$��e�q. 9jw�$��zrlExdA(v�]%�"#st��&g/)`
��'
�abre�UmclTb,��/�a~�.��MaFTcnr�r mP.pu;��NUm-r�mf8$zw�wU�Ei�/�);BZ&�� H0�4al� 4r/wm�mB_&k~%�Q$ � �%}qpK3*iz0�be
@%!2�KF� �!af��`)_.|�H^q8$� �.U�]e�T�����z(�0��&!eno�;� m

��B2  s�vy��jC( >J�b9SX�F��ye�F4w�s*sk�q1�ysZ�sE�%�,�t=��{4�*$eSfj/�<eA�AV,��l�lt&#mb!0�do���v�~Nws6�	i�ft�gW"& cTr�$�r���,!��,gs�8vqM�$�3�a~�GHjp����$�27uF7�."$*�qx�ko�0�K!J+�$� ��y	�TJKׄl$BԐer��uh0e1�dkp�p(�=�Ay�Zc�V��]7\kH��2}"q%U�&�$� &`YE�t]�{x� =hotq:�%d3um-�~�Uj6,�Wg} !d�1���~u�Wt{�� ��7W)� a\#�0d)cuu�n���h��Bdp`A6vo':l]cu,e�e��B<jLH1eg�K�+�"?.*# a�04G��QqOE/@o�1�"(P/0>p/���s%L�c@�dBmwdrb ggU�$J 8�(l-TqmP���oT7+' �.Vt2 ���#
,�T1/m�BW�f& TH"F%nC�4�(a-���% naqr��d�W|it`�<e��Pb4a�1tEhsEelaK(uha)DR�~H!:/�W^7G|	�g�A`�B�a�G_�xLe$Y�$3Vzdkt P%�m�(6k)�w0kwt0�bTd} �Xh%602�fs$�@?�bd&Uo�}#t�vj�i��pGbgg�l�P�KJPIx��1`xzkt�myd�!tR}i�;�u�"�@ungtO�$c{}*4mu�y@tw�|e�r :��!{�4`��`r�v49%\A�+�x.�
�" d5&w0-bW���h23&���x��.@.�(v�md׻+ 
 "pDr��y� �:�9�$e�yk����dV�6 �'jt�Q	 i� t�va�$�*p3 �"�( �p�n�(p}Wlf,�j1D:s�a+2dr�!-|V"9,
s � �y�4.Q\ĠZ�&n� y!>`0I�9q/h�Z- �-A4� x�~r4$�K�:<~4l�t�go1�a0t��d�LEq	�ru&3c9��!�^�al'#K]�}E�{hO&R+01�XTy�"�N�4eRp890%*���hec������6FQ�PPLi%gTq� <w��:�pb]tuD�}c?�*(lqh"  �mvse�%~��?]p�l���Oa+�iUfvh�e h0  �@� �p�1#1%@�#Uoq<w�3hAtX/J`d��q2��_�dj tS+��cb��R�&1a,٬n8-`�aDB!cMv�vi���Erol6,P�[gsioN(J82"$�"�gpegf�HL=�a �O^`-PO�/V�|Piac��`\�bticn|��%�%2P��˱�l_M
��^��f'>!e�p�ct(4&)P,`e�t0�iO6�%d{�} kF'�0/w+7d�Cws�n�k ���A� Wv$c3$�#9i7&e�6�s�� y=0l0x%`��vyn�ffgdpz}�i��fi TS: ��u0q/&$sg{F!G6VHDw)}1�1�fL'4��.u(�f2o$d�C2Nr�dw�9�fc�$�)z��t�c`pw10�$0! ��Nre$Zf= N3�W1fx`*���  �0�g_*ctw y4�\ fO�`2��`�(��c�v�$|�
h �(% ��?r�&��{�8`_r�f7>)�� #h0�!d0�j46�d>\1��-`vm�t�y O`$a�Sm�0 i�jj0*0~�x)�X0�p�bb�v�[#)�qfu���m���dx�suwp��tRIs�eq��]0�V�ym�Rsi���vk����%z0q�'o>�.$ (>�t�+hwX:?dLM~�
Fs� $��� I	�5�= p/|{
$ txf�B�w]z$	 W�v�'g3  )zob)���y�|m�u	 R��$ p*$�a��ofqEtx`Rt~�� w#�~t�yw4@a0�ju*�o�TssM��!�.0A�Ryr�h9�1hp`je  �ekl��.t����X>�kB� " *�vcv�^kdr�RR?��,'�8�1�lc�!vl3�I�  ��`h�!
"��tX {eeN3-4`'-Thn�n��oR�&F�!(s
����D�0geb�xW}pape:zh�'a�vO�7]c?F�LgM�f�:Ag1pw�[�  ���("(O%mCe�'ug�]v���m�vgRetX�2]$,�*p/�yq�ln$1/��|!tlb�*ǳ'0�31�CN> |-(@!g�2uzdvmנ+8�0p $(�!(�G�'y\Tq�^b��	s��ElAa��JP	;�'"��/ l(`�KxTlBro<0�5q'|����Q�va�..�@ja4"��k�ba"$��,:o(�Fo�bʼWZOny��7Fi^|t=)isv�b@Nj>3da���0z�g��a`m�$&���FcJ-@s8ljCj�"u^��Z`l�$�A�|�zk.�{A���n"�w��P?g4dOsmft a%6��ytO(` �1�,lmKe3,Ara��s(wf� E}@;6�NV?�%" & 4k�`~EcG��e,7"��<L� ]l(Cp�$.R�}/� ȭ&z<8�&/�cM-n�"*9Mg�AaJq�  ��vA�c4+��3 ]~�	`{��*0` �4 �e�%E�!iG�t1E;j/=*d�mw�$a?%[}�}pIpc�;fu}�(�% jb9��0{�#g��B���.v[Z$l#�bPvup5(:cl0�ePR#u.h��w 7��p	$ 08� �gre�gv)d�j�ua�bo�; ; �sn�!0`p u�K8�""k3ad !|�eKd�7T)��<adiw<�tL�jHdo�v^t� �z��tb~!bTMU[�B;�#ry�u�L	( "�C"E����#��#Qnu� �
 (8 �# ��C$U�&r�G�` �>"eF�/Sd5\��pgQ+j�c�xc]*0� �pA$�a.$ nw)s�`P!p}�pOwI dtRpklu (�a*DQzV�Gl�g|b *#g�z�$p  ��(.�c�s�i�9)-Mc�j�:%1 ~4�);H`���)f�(�"!fp�Jl=br����w�m��Cl9,�1b}'OcZMCuys{Ig({*�  (j���wm{/��P�B�5i��hq01q,$��ct�cf�0&f U,seW�y�0�;�K� 0 Qb-.�uQsæ����/�) �4!#̈wS��G�s�h#tgw� �T9$t !bR��L1�jG"T�#s9&v.ˠ oeo�oCd	�aC�"(��bQlQ;d�go�mz�<."?�J�ts�=�Sr)�m�k��g�Mb3�!2ݠ;;#) �!�f�T~f4cd�i��a�o�smus��=i8bY9 5�'h80/mT_K%bi�]�i�wiGnfvpGJ�d?��8�"9y~*d]~GwE	zm$Bhtz�f}c9!0�]#" 2ws!�s<�hb/��8�2f�-�pq: ("9�x�hҦ:Bj��gn�l%ZlT �*`y`):*`�(1#!�d& k$&x|��0��.(*`B	x$�Aw3Iw+pf( *�jdhh%U1v6N*p�|�@sQ
st(�u� c���NN|y�%҉�(JKmjd�fCrRog>�D{ج$WDblK$\%srig�2_rxEd�Ѝ  `�U >2ytk��pf� 8 %'&"JH�w �p���cn�r�O�
= xywY�wr.) q"p:9�w�9��r=Kt(aw�<u�Ц�mdy�kxl(] <$�� �d"��q#whD4:x9>92�e+
!gU�aTH7�q�gnx_feW�Ou�i_c=6%5��$@1�V-�1{�a|�09n�2]b�.�P`t�J �(,�"0$+�9~lx"x$�r�F�OxrL]/3�%$�#v�E~||�nvx6g*�I�Cl3~l S9�)�s&���FB9%�dp�H�gV
8!b8�b00_ U�+ieIq �-ig�(='_Utx�g�nz�dJ��o��pbn�!�Ua�"  "5uE�#Yj�t*on��PqeAKa,mo28Z(�h�Pxr�� Ekso�paF�p����4�n�Pi�+;$e}5M �-=�: :1)q	d��3e$="_Gppmon3fQl�p|qLmd�=0rrOi�j�Wbt�Y�"rWhq|hif<qt�X�!f�p+0q1�$`%v/�4�cC�!��7i�o�F3g�wqbi�ty�W�"/t��M&�c�b*
�0�  �(@smEFdkwSO�
�Dzᰔ)Fnq,�o,n��VsN�c9��=-�̤8#7h~t�o&�cY�@�l�n�tbb�,r�!U��S2X #'ar�cWO?oj҄|mQ�-x'E+$�i�Q�`�s��fC8f��J3RuI\a�dmojV48}�6�&��&mO�f4Iܪ�� ! �fc~u�4ll#�e��q��(�sZjlS4#|gf`(AWelgKd�lX@p,"xpnXqaR�A{vI�/aj�o��d�/t-0aRJ��1 "@it��2�<�`c�#ua�`��w[�q�U:,2&h� �#}�CB��g�h�abf. W8rc��Dg|Ԕik�cA �8{{*0 *!Ga;O��t'>]ndqg�nSDcda0%�eZZuF�=t3i8g��=lݼ�{
�i�8, s�bdoc���sz�o�P�j, ]bit}�Nej{ku~���|U|/s�gd�/�_`�mz 4��XE�C<Sldr:f�g;t.CsB mh�je��sO}Mc-QtP�Ks�`hda!*"f`o�g�e43>`s�e0�-e|aii��V��p�Dre[�F$�E��,N �!��0h��m�Y~/�MxDa�no��kfNs.�tucbN�<V����$� Ry��1�mv6*`l�*pig�A@")�z�qNr�*wqd}vzFU�T��aes��( �" M19�>1 �`�|�A ��i82����_oe�90���Da8@.�"��{%%tHf	aR! � xQ�A9g�swq@eW*qzb-s*� �b�5����>�.��f0	*k9xh$3�i�sku8$-!`EM�!{j�q�nNa"t*�s[Ik~x�}]PccmAXjry�lE�{*a �� p'�}bvcl{"�c4s�!/���)&�Pg�U�`rB�6H�W�k 6@
xk�y]IOj�$e"��^�e&$�e4p�!"{�5}Q"ev!��s5��(@��" vo7^�Jldo�tw8��&p�f|�s�`'H`(� �/�!+��k{?6@s`!��t���ist�uLqTrr)`Nc�4s$�cK3y/* =�(�Tqd�.u$r�"hte��jpqe9���$z(%*tI$o�arm"ydm�*t%{!7Ft�tiasLf��! 0�3���!0�J. a�lint~�sa@l�%~exb)/~/(�*Q�Ptonne��w��(t}vi,%A�`8nk���d%�]�u|-Sv{xe[�c�\ s�&hb��ci跩C�:�opeQtM�M7,�i* Egq�E�m:�ywE���!*$8#�w**h�gd�_wi3)�6$�:��Bo2�}�x��a��9.ur<2 "`j`:a�`x}��!i�*+ �2p�3u�)�� �h{ &�$P���Irm8q�8�EJ� m.�r����T{m4 }�fm�u _Q]i��
��b6z4u�av(`- _de$3-q�
h!<�!�`��7x`/cd� �b��(	�odaSi�&!td�" $ [yd�kL�8=�[���`wko��u	��71�]�b?i�/S v�v_��eQ�sn~�ecTWn�-�h�( 
 'jro��v#G�xsNs�cc~{�ˠ'�� W�{$ t`�&$jsE�&_,�|pC�s7B�8���%$"�`h8_{t�jMn��asl��x ,�~�w.q�~Y�-�%�J&A"%r ���i^#>�]f2U�MkW(REei�w"95�(s+L </�`�|qI�=C|$gns�e�mv�y�b <b1�zoz.~_p8q�U5iWM�dW):l�d4��l�nbS.ptt��@"8i8aQ(b�oeu��%np�))�\��K�G�p*s$`�d?U@s.��a^�\�Js-Bg37m��,tV|dtekc0in,X�r%�4K(2�^p�z9;�*�(� f�"�7v�d��0C�!#$��b'�">m-X�u�Fc$�sv%acP*~s,aD)k>ka�Qo�P��e��m �� �P�"���d�lmX�����jD�Q>u8eHJiQ5r�t�O��#CLm'-k��`dkM6hcR|� p3qsK�D9+f"��  m(�� 0!t�$�z�n!+rh{3���{�(`(!�Wi=eg|,�d@s2d�\v#!pelfz��ve�e)�%0H��}e}R�;��~�1e((xpo�Mfxk(:a` 2W��0�tpadq���^[ba�dth	�s��h0-d mW {���dO��{J���007,�5R;�d�bB�elc^�(�Q����~��k5%�*%(qg.N��D(;o0y jK1�B�
�x��o`uo,l���nͮZ%dmtdT�=Luys�U�eq 6�foh$� ij�0u�g�>50LI%)��A�sK6c:;�j�E(��(g+�8%  hbmj2 0�(-H��`CgqR�+�s��$�c"Xq	ndo?>b%ًbe!�$Lat�7)Q6dg�Zd$!MlSdnw�.�p!vE��p�q�eVt��0���݌0p6P4?�%�#ialmm�Eviua�^C�lht�ony �(ubd'-neqd@e`� ��n#���ic�tw`4V%{QTy0}mf{s�=�j2�r�l]z ��\end{�tL�GrsV,���"cC�OB��:sBam(˹ 1"xDda�:r�i�b$
s �jFn:0�@Oty�o8F�b9so~�(8$��G�&�!��(o�+)�t,@` �4i;"z�`%-����rhzeK8A��\*

 p$���f1�W��`hw-�-`22��Mm�1�g`�re�m � �"}�t}�>2OT"p&, 1(�ao�.�e�n%�k-�
�}����/�#tc/�`7wrG!R��XpmPHh�EsG>Q�fn�cla�L�3 x-�� @�o�Ezniu- �M/�Klg[[x�`s3��4gD�]v2�u�Mmt<��P�O{c�"�e~RtU>3�(-a*m �?&4p 8*r\t}�~ l!uL��adc �3�"�(y/s�0xN�2f�v'JB{�,� �� FC�uR6s)1Jz �.# �  �@00wrq%pFg
0�}�H-@$&�}�����k0p_s���VF")Iu�B&@LmQa�uhD"Z�zb-|or��y(�j�%P�Rj�`lbCEm��t� n�Rax/Q%b�l%l�#.E v;�c5*bn)hI�$)Lcp�κ蠢5h�a5��g�hkSh~!$�h�g]>�!*	}-#	���(+$�&u~k`o�0ge@Gj�"KuWB�gdJx���E�`S
4��fMr5+F�) G.TW��{s /+luu�J0 $ 6ip(2sre��|iE4�`u�LB�f�x_7�c�f� 8 ���9`�nr��m{$x-=Gyv'#si�o*�?gT1+�(f2g|6r~$o!   +@�a2o��DEw|�hsa��mPKl�tFD&<�bHlo�eT�๫3��o��h=� +5X#;�
&�|�m#t@n!e�u]�>f�wap�ToJa�Z.Q,�mq}4)��)0�0-8q$ �j�ad�Px#��,@ �h50m(�Qea��*l+��yVj�ivM5g�ortlh��u�"�hs�uABo0Ct" @���l��Rse�4��g:"r�� 	���#dq �i�/y|!$�B{cu\��n/��-x�"%5)�a6a �erD�(h� #"C�H�"�rF��\o��M~%u76uoqD�) 8m�0]4'+ycfw�lq��|4-5]��F'A�d�i_k$%�Poniau��4r e��f,d�w(Et`r?�P4J�|X~BD��e��y>�6c	�H"�04b+{��|�A!�h�t3pp!p.Mhrv{sR�ierar/h�ESn4d�"U�aA�"yRbu`�5p�fV4` f%fo�t���2��; 	e&/ lD�!�>թdnE��M%Y��Ci�8���dq�vn g�|~5eanu�|!mvv���|8eusfo)��tJZD(dOmw�(f�5�lt,�FL'�� *��ud^
r�_�s2�h(!y9b�iG+�arcf��u�typ) u���\fTf2umi|��!5B�`+g���$�f %l�!r^�4+8!�(��w0r4_�9%ofm_G�%�l�"md� �
h$�tFSl�M���`VrVD+&]m�NMi�)UN�zeLa}vw<t�Jl�!!~kz�va2w�]�}��G�;�69'�TLi}b��Sgw�
�R=R !dtk!eI4t�@U ��Mmgm�eCDidx(; (4a�bC$���hD ? �e�l?�hec*rX3!�h]305� pt@"�Y$>%!O	6�iT!R�y�; :;�K,nӪ"T.j1`e�n5�Lqu@�m���d$'f�S.��q"� ��0h]��|[��s$5msN�wN-���e83��vr�Q�dp?+Y�-b�gfbtBWn��03{�B�a!�{1It,�0 (�`�|:�T5Q�t�l2�t�}j�M�O8�$e��r�qao�agyt
�0jcr!�a8nj,,Kn SaV�r�4m�Y<lF���
�% , �v�U�g !!n�m0i��gs(a�8�is&Jcn�\( �bm�At`E&"Vh�(p�}�1Vy,�hr�%$C|�q/&8��" 	gx�.jMv-s�!v�ļ.`�)q�~D�iv��)%dZR�A�n"T�~�GRt|B �%!t�wysW�%�i�w��`4_� ��$ w`nܠ ~0VIkua,atW1,��6?+j$N_
�$d&�ey�`cq-&y��`��9%�mod�.*umsht�k'$�rMs�fEq��d8_-�=�i�4�*(y�� aBmmDi QDd�pi��Ts�gl1cq�R5L�@]��09��pg�*�P+�v�}Le61sE�|���"� ve.d5#���y jHw�ergF$pl�.#N�u`C6�uu�y;xe�-n+
B�*L@!/� mzuv�� �w$�l"f�oyhJNnL\�)m3h�Q��asq� �G.ud$teud�v� ;8eMƆ�rH#Zpbg>*�� &u�`�� ge�!ve�}~^�ha n��*�z�0Y2�5=w!L<x>1�hIptQ�SX��k�id��2��#�(0vWET���`dM���v5h�,uy&s7�d"�/*�EyEe-��G{�v�)d��m��a'.{p `9�.-%oe�H��`�(_a�&i,.h��}��(��(tiwe�0��'uv��#9��'�9sUil�3sx�r��?Adp����$%,)+�/ �n 9P%�Y*a�	Ij�|jqC�&��s%�H
��T(�Inorj�0�EwwHD�n�B&hd�9.�9)/�0���{�*zl`~�'Tyia$��Kmx6i�}�dmt�!t(}lDM`v�t��m��fe��i;!JfE @p �=0m)UIv|dE ��nmfn#EWYgTyc# $(@x0="~l#xAf6+gqo`T+ofvtZmP}   N f�@/ "iKc 1`r[ukj!g -�"i!��=(_	U�d, `,� jCyWx8>|F!ft< "2:�$xZ4n��=rk�DegSe����u�\;u�Mm�:�E"� 2�R.z�';�0�9id}�
� �+�/Fd���`@U)Į`A�O`c`=C{ey<!4r�?d VQH%jK&�
o�9j..dW8h wgB{,*ar|
81&3~2e�_z fe:Hnm}fj��hpUdXe�'t{�d #
T5r�oll�m��6Oc.Ds�oG�maM�<*r��v8r#>Uk�> gYtU�cUGdvKnU=�Lv mlgv��T�X�4��6=a@7A�r{jhJ�A�e46�:�UgSc<�l)�hS��~G9; Ze�w�`j.�i = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
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
      // `2` may be desired in some cases – research later
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
        // Sync update – it will always be executed, even if not necessary. This
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
        // Async and optimistically optimized update – it will not be executed if
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

      this._focustr�Hj��ibhr-uU,)/K.(@ �ra�So]��%$�zTA��87��W��m_����l RI�C_O[H�ef��zZ�p�6�""F4e.uha>h|u֮j�m(.Hi{#�U-eoV�(MxxIT]G�K�*jD�SIC_)�F���� 0Evu|E$�0`lr.fFYelI�
[l-ib�7-�E\F|o�Dc]OWwTIRA]�i2`�H"r �p�_y<�}g7�-<��Ck{�)f4�"4�zI�cDWM(�lh����hir_#��n~b�k@do@ee)d9/
3�"3jd0#��zycv|i�&{"0`�Yq ���whs ��;�]$aIhmc]/�Ea+�HtgtA�eosJvl�OEVuK�j/$lL~�VFhht�lU�eio@�- D�nt9I��|!+�  ���zmq/�hp�LfB]p"Lj�Q�AG{""y U!h,Ŋ_Awnyru�
�FlHk�ivc4g�9:H*@�` �<s��w/tMwPmc���1
 ymj&�`l�jno�t`@�m'# {N� �)4�kr\qoKu���c��Iiy��1��|J�'�6h6�Ta	.8(J�y`�t+sH9X�S`�yoc�p|( zO $!�$ob|qwnpno3dkkBr�.k8� �6  qqV����xE�@�oa�d*a�.^`n�f�%#z{cd�O(H��#:( x�g�&'�t\��!�Ta�dihd��(�x/�#�G4��a$dvqM$��d2Oq�cm�գyJ("�mU(�p�DxS��)nm�ִ����(`ah�@�mmauedJ���X��}�sD~aQ`ru"1id�(Ecu9��(#�rj�$8 K�M@t��a�GVoq�U� j)���  �#R}|7bo J%V ��}`�2$4(1
a�� �bF*aq�Ld�bv%Z9v��u�aa�m/�6�0 "(=�?$
�g�@X."�5�,@/n�xg cmh��g)8[  0�`C�fli{�<c�p��*
�F1�MW��n�2����:nl�F8t�$`Y�:,eeL@5�TP`�%d",��Hr%TqmML3*t)l&`� 0"�P(�6�ruoR&Cu:bm=� �`n�t�?2�s��yj�:����.5 h' ��J 4�u{y� g�bgoo%�g�N�Tũ6-(g�k9�Dsdq5mGDQ\h=9�a1N�P0o�uq�cONaio1N�a5�k�("�low�iD]q~�a2}lO|c(n��r)T!&� (c !3�nQB"H�Ag]M%tE~ }�~l�~[4AnQmh�el�)=`�$ 8"C�^uq:ll	e�nd�= �-eBjO���')~n<*o]m�niyS�L5{Տ�]H[dIB��Ӧ"qiAP�7f)�\Fn,	 ${~�(H� <w~hiw.W��eiy�tG8'�G�uNo@-"UuB�h�b.?e�e}g>T*peal~
.ge��Id�s��p5�_��<�B�c+]�oN�GH(2(�$`*0J&+% Gn�m!�}*=o��pw�v
�x=}caVqK~6��0p0 	s#vg]vv,ro y K@p�JD��I�{o�EjEu)L;	�$0��$=0"v�!$��sze��$c~��{w8���W�S��W88=��n,ob�u�!5p5``Tx�q>K�j$i@�A/�`m�
A|`��z�t�+g6h��h)d,��&/z��#&���Jj6�`�iia�|,Vur]DE7��u2e,bcpi%�=Fph'� �r�b�."()�(g ,8i��W�|emE�4n]Op}l`qk7�%|^n�<g&+�may,v�w�zN*%$��"l�Hi���|M�f�.{c7ll}qpŠ��jk�h`($8F�}.d��SF69(v\!#"�( -�@5�N�e;�Ro(<�l�� jj	1!$ ?j#$'(5q&!�8��Z�i-%`�uS�� �0tt`{A&�5:(|n�5݁]|Ddfi�J/��6$b|��1 !6h
A>SUl5�~ip"C��rz<(2ebtDhb$YRCN��W[@}U&"*+�`0" a��3�!�~f2ip	�}K�m���vg�-2(�%4hz*�$�,`t�dS|hh�.zc�li�Nf�cu5��qb(����("6h�Ej#y>Oz#��qb(�jKWe/$lt%��! !c`ue�� ��buj q,oi/�zLL�H`gJ��c =`F�|�e/H ��(ta�ugj2lj�,Dz(%��gn$r,Wl92l���7,�/ui%EE��_W��FC�+�$_
a!"�"�!80%g�a`bu��r�eO �   �c(ui;I  ��!(?n�x r )d�M3�_U�g}mV�Lkf�Ck�<41lr%t9o���-�G|�l�qhl`.]D(twCL�~*Mu�%�(I"Nd�O#p0��3dEqki4fE�Wj<p	"79("1��d (�xy7�L�hm�n� [8� 3,S`���v�IU l!���gIzHia�ޥx%q�HR@G�POYA}F;PNIB]MZv$7��|�N`1=:
 �`1�4 1"!�f 1d�s�_c_r�ig>�o�b+�L`��d6��n4C~<!�(�� D�E�$�) ٫��22% )0`�"�0%{�otf%$J%�wNl5�v*��X!)4�4#0r� ��t�I#jId�(3+� a�`!p8�}09O��rifB�#�h�C�n�n)m.Y)fdpƠ�.�=v�n�+e�)�<!"�[QEONT��h Z�� a2�9 ,  jpjl�.xoqW}SC�`k-�m�4��cb(��N<�)� $�Q� 
(]� �$/�D\lyJ*) �,�-:q�+�*5 1 $��bCvudU@c�|le�/�§!Tda�k����m%&v��E�L\sUUiSCP��MNS`pm���r:8�!) }�*�e1^�qt�}SI��v#nt� �� �r �h� �u�v&u{�X�S��.�* !,��xaE�qg$bM%-�z�cnvaNgc=���r�h��vId�Z�m*Hg->"p mW^_� j~{U ibB�g�i	;J!"4 d}1�a �G5h*
�#Kpp�|�kndL5s��Fb gIB$}7de�EOU^eS�.k+ �"�b�w�`dv�ba$����}�o.eA��[%}hP(�-d Tl�SJeefm�{�Nzty\�t`cr�A}��/tj,e���) 1�0f:+A�val�| a��vudCTXih�7e�#�~}e� �ed'��6~}u���$ )8 A=,Mg�_dla4ajp^x-���eAE0ri1��,�@rh�	OFti~� 9Z�0"�)Adh])_Ed�m�v�/rtC�~1�T4kH�qD1|'��,���{ 1bn �x(�a.�I!2�N[)r�	{m��(l1�e�j%R� e1',c�iz�K� k�p~phd�y*8 � x� $p0)p  �.��L�v ,��F{��s��hSPNZ�mf�]
��U�w�khKK�E8s+ !�(a H`4in�fӰD�e�94Hu3dmpftq��
�yd % �zxr.�vjsm$,b`�.;o�%�P};�, �"�c���A�h�X!$�e��wz�#�%^+JHt/�|�L-&t�p��GL�K�MT�9)*3xx`g)*@#0��
�$ ���Egf#C�uz�(a}�((arjmXSڡ��bUv�n5CvwheJgil8l�i�n[emU�5~���Ŗ�J�KBHI�o~dYU-N!S�tve��z=rX
0`.�r� I�&.dQs�]-gNg]��sskd>�pNhnq{%(#45!� A�HV��f&?}��mRg��g�dr�?c`IAc1�bzm"m;��#$B�d#Rq4��.���`"� �r}� ��78+� �䤭e�glDn�C�!c44+5�8iu�U�BerD�rr��F�|jr�2$0 �"���pEpw`.�A��04�0�m��-���8j�*G`�sF^�oaRin&raWwd:�r�?=�"xz(a(!J�( L$$H�2`vliަpie/+)*$M �4 | ��i{e(=f��h�u��#o	�C�t�bkOh?���$!z�!�97o,�
  `&a�� fb_�)R?>Rmf+ErBi�kd4gzv��2��i�~g{
#ad!�df�[1�+" ��<K
��# [xLcQfOb�G�l�{TnEJI�aA�Lbg����b�`����?! !${Mw�HmCve�8	0z*%"#$� s'@y&8jA[.�W�-/eP>#{b�r<I�e,!ol�P�|s�D�k��i�EΎ�TO$r�-�84 &@�9ha7f-zV'�OvV�Z�{a�a�7X�� +"{�"0GI'Q+hSb2j`�Iv@�t�(�O|9j$CGAn<ymg��f8xSb*idu)dvB���eoX&	O$��SbLRJ\�L(-
�0h` )%y:0�`Mga�~��Tvh$r��~u�B%�8ht�l #*2��a`�`pf}d7r��( 2( �$�i.�x40 !#/n3|*{
((`��b L�hp,*h $#�$ bsoo`f�MgG�wl  �(x� �uy$#
�!@�hu�=��_.j��go@nt+Vd!�p)!��;t !ll]q����vdlO�I���80vrVRxo�!Pb4b<4'o��yevT|j(k�m-<�>~�u~�/CN�a#|�DjodPy4'$��cfy:bq��(D) vo��'<d�n�a�oo�nt~gt�a^r!u�KNH}2r�gh0mT�[n��.�&�|��lh(�(q`�hAy�m�5�HgV��?�uy�eF�b�qqQ��/Ow�j3m/f�4_=,/xi�v!mP�X a-{zLhQ.�n(�c�ln�gAV���M���$M��:"g�0!(�&� k&8w�7�
�@���hHh82i �i�00�7ov�|}tpT�ln�e�d+�;$a1B!i �2spCMd�.su�F���}�6�� )��?s�y$�4�y�
�$ h�boet*,k�)p�lkNISS�NUEM�SPJT-?k �x�p)9�&��wGwq}|bdwbn�3}N�s�0��P ;<M��Hiut=>eeg@q(SG�QV�mhz�6AlI���*��A�`B"hj�D)c�El��K��b�,O_)�12
`!��娦2 p�x9a4j�=A7-��{X"��n�H� v>�@0-B,5!�"��d�Ye�cw4rn�}!1 �/�*����!"Ph uh4t�a�^Fiyf�C�?J`�
i�(b��94�"1$;<(�lkk"�D��(o%KC�� !�=��s�tL=-$�tts�5��  �	d;,N� �'-e��)%3��!Y=/=>�7/%'/%',],5�L��%)&-y�?�mGWw�-#-E&�ᜬ%9m%+d��� %3�`�%re�,j�`�'3}awxO�V$|�e�w����z�h�fl��nb�c�n�� ��mzGqtS
,4�{(��	��ak,���m.%%�!.>-o%�d��m,�9;.��	--?8)-�+5-O-<�%m=-��)���Jha� Vy�hwq�Qn�l��,(��  4b�kC.3p$Kc�,����>a"$.��Nga1"P�}r.W�\A>g'~ot�p~)hK�h/�r<#�g�L-�nt*FmcT�~�l�}�.��5-�dvm�cw|;I"0!!.)�stvcX�fh"Gr��dh25(x�}��s37�-*`	p^�t&�u$�(-Z*���"0bm�pt#J�c`݇�dd�own�q9,sr/oJ^i�yq���Hj�2_>4A0W� �	�Vo���Dr�Lk{{>�16 �4�mdbIOt�1m�m�anh�:.�v){SP��-�0lc�/�bO�v�mM6gd�2''*��M�diJ�Wd0�m�Ui�c"#&��qXx!;0�
 g#`|H'@$b�n&al�i$fd�se�dm$�%�Kds|mUu69 h'�sbLn�iW!ZG�e�?xSq~;"�0 � }.�x]�P�d�T�lcK/���tgrgl/g�gwa&.dhSi��}.^�|cD]MlN���$!!8r��\�|(�l�ectkJ1ip��ot�y6.&��ko-�ui(OZA^��Eze�_�%�X2N(�bq����1@)���(0w,��'}e.�<�A=G*|a<ot�~)��\?��$�wgs/l�j@V_�T~v $3 �3��}J �� ̢�"0�}_�a7�b��Ju�4gelp�|�k>.�*(E�Ij�Wl�n�e~v&q�]wJs1�lIofHT���;�%��"a �.�6h!s^X�%yswv�vz01?y�D�J,g�HfiT0?5�
   ]�o&cfe4BSN�4D�,#Q�7Ic!"�!xy�Ov$���pd	,K�f	4/A Ul�5dbDZCt�+�Y5� !12�smyn�|�!3��{cj�'1�xH��y<ih�8 @�H# c~�xq 5qW�02o� l$oAtRc�easd)nSk.c*t#a[�#M^�~ie!N
@ D 1�"i�3(�y�`���lf�@;/�`�}ph*gax4! �= )%���W~+>`!"� 
�y��`bIyV*/Ir�cf��a�rw�if !] 3&נg�sDAg�M`'(�1N.V
(!�/�*t(��v�^Tv�yp$M�w{Јh�_mou�k��Oagq�
��c��nI'j��kJ�) 52n�UfJ# h!$i$�uE|ia�h�mgH��l	|�DYaX`e��df"�"?a:Pl**vib\
H o*��
8 8�=+-(�%8/9-l	�-�(�L�m-,x5��,=-�..�/�-�=e=,�o-�%�%�$���k��G??o'+$:/�c,�.8@�1e0!9y�ILP�jn�.dq ]>�
"d!�h�M�/)}(olj]=�+��,,),u��)l�Mm'=%o9`l}9/m%?%	I��--<C�}1g�i�?=->))?	eb���'�(�! '%~$�@��t�N~9`KCmmML<$P��M��]RIIJJ�LH�E�AS�$2LJFJ��B�ģ\@�@WCMa&rdD��C�yhp()ti�\"�x   ;�o~����eRca5B	�D�F}4gxT�,a���#pg2T/mg)��
"�" m�h �KC- fp�M%�2�./o-�Ms-�(�{�X���i�r8��K.!0! 0�~�n:N0v](emvMIv%�W�898
+)/
&"�D\�da�`h#�&��D<]�o�V�paRC	�JhOWD:, rH_�%��D$!^o�� B�4D@�$se�giEmvu\�k!5i��zD|gn&u�)g)G�`�` �F�-�2�jn��%gL�B(BNg�y(r��p{m� cRmjt(d c(Ol"qR���l��<bt7�1/�wn"$�p,0�%�R\,�`~�*1 ``�!]#Π2`� D&v�$.joN$n��Vtwp=f��~�DZ	J�^h�D-����&)0�!"{�$ �2 !I&#(l��a�)bAmB`�qj0�`"���!!~@mSj5"�{"��%.i��2  L� � 7Raa ��  �$�&/���n}- :"#3f��`p2��ej	�tIc�(fm#!o�vU�(eg��Tz!g� l��q�oTb;{$gndfk���ozF*:h02�NIpPlp�%�tafpev0- �%o-g7��OM%�n�of��hO�$,K�_��u�f_SLQ-?F� �d�ʱ<aT|
mc$��z�~I0z
"(�na0L;dgLkM$pH�+Q/Fdw,��(g$ad�k h#9�Za����J� d�i�K(�  �.�#t�$��^���o,ad �4t_�K@e�d�I.b�,;�.�{VGep%.�1`|�4.VM��nfit�XS);> (Ji3! � flbhiqM�WܪmUur��K��m!2� �@0:$'5�-�-P�,!u=-��-m-M%-d���7($�	�<=/-�;-�)�$*y�-%��-<�#mg�-�})
@u �q��b8�`)Tl�#I=-/`Di,j%�8O%/-,=)4m�/-{�m-M�i=)o�(3U--�)9�'�>��-=- �4�i�,�+����"*P�dF}.Gniam�O�jadt�-(kZ+"of@�U��y m�x�w0kn6*�f"m��"lcG�nCs�dr.x�doh�`D=vei;7J(>*y- ""j ,'e%�+��i��5i8�%4umM-Mi�-�u/�9.l,=m����,)�	���`l%m�e,)i�;i%�n�5/Em $m;?�L(�+&���|6R�p�Tu6 o~4vgBq.�i';h1Z+�)��psqB1ItVundt�%IKt4(*�Up�Z/�G�q�=@�zm-qs�W7`�v��e�q(�Boo%Gg�i2-mq�4N{Na �0k$-b�--��5�9}�B%l�Y)%�m�-=-.=&�=&/��e/�m�-,m	-o/)��5/,-�-!Qm}98>l=� R�a?J(-.�z 4!+$-	!�==�<=�-a'-o>�m�=!m�k%m��.=�DY�!-�!�=�<�)!=l�8='-�%�,�e�m-+�}N��* Bn`_tQ��9�$ 1I/e8//%,,i--"m�<�O-+l,m-�-�eMHMd)=-�-��.-�!))��,y4�7,?-,80� �/

d�&j.A� n��Ŭ=�!!Ϧ�GacfE{��j'#�coRu$@G��,51l1��g>����a�uazn)& A-gq GF�C��_��U )a$�&@DSO�]d|}`�:#Km$u�b@@T!ߗxA�GMI�5y?",�d��c�yp ��!$q�Kqs#�WBf(CCA���A�Mf9�d�D,m�EL6ENd{�{��|4�F�FR�A4�z$U=�9Jr+��3DdS�Q1gwE�I �%&szE��;�C��>Qx�Haec��T�<�!w�a!!�	��rRo�nd}�uf�;�DD9ko��a{e��rp�$.-$  cqf�m�p��,�h_0-�6die>�0- eta�<u8�Q'�50y(;�)*!C�#{�r�|4�dBkCa.�p`!;G}�Ms�
4�nj�$a~%�(d``��o�*h"�o/�e�U#"�ߘ:$rofpd�I�p_f�LGoV��d?�l K�k�3J�)g�'-�R�CAC�SYM�GA�kHR�R`-(��?.��bv��v�t{Bvu94>*)	#i�|�+PM�P�\#BHK24oqo*sWcsMv��#}�nw��b
��/&s� E�%�P�r�o�$;"9�p<��w&3�rYD��UQ|T`Zx�c�o�(WR	LPoRl?Tj ��?9D3B/f�|k�WEv�+gX!0�b� b�]VVSN�FT��F�78`�x$wbZ���Z�UY.T��3�` cgor@|֗%Z�}�cBGENd�"6"!-mDpDn�~a_�l���]��u
#. #�ob!t�GV�
RO�IY!GT�V@�A�I01 1��3���p8dRGLF+�4=��T{�Q+SV��U&�/J�	0j�R�`e�H|zGoQ�o`YDE�D���p[uy@kw.ic]�pS+E�P"��)"[K< �o�[V(EC'tSR����Y�TGwE@�&k !i/|iy��`;-Y�ca�8*��ze�~�#�]�s�/6�  ��(�,叭/a�-M/-g,5�	#./-)e-)-	/3,--x%?,�=-<-���-=;g�m,��-�+L++}�}�-m(cJ��3Pnau�De�mo�t�e�2`a��M%.�.�-m�m-�=.�--=->�#$=:?u),)-a!��g�)))m%I7�-t�!��w$�<�.�53M�--����n.��"C�۫�K&3q��!94ax|jaq0IiS����1mI�(y��9B�1$oo*W\E;"kS(utAQa�v��3o�Fe?!`[B "!2geҪ=9LEl�8;"�p@��uY{�O�/6bof�,�`M�N[EewCϢ��w(�ovm�i�k!)�`0t�!._ksS	{�$�(�y�cp1�$$�) #,)aq~b	kA�gKh =$th�9eYiua�)�ny~xIaZ��&���CK8# 16 |��>Y�7g�:��b5$�jos*v�jl�!A�9{��,csM]gq�%
.$j*�*t��S�La`d�voot@�s�9Zdru��Jh!`^&w$W�0de�3J�"�(S6�T|��gg.1m i ~  �$�"u�-|7Na%�"�x(�()�JZ (	s~���clA�v G%ylfh= h�  �fY�Zgtqr���d&�u\�5:�>d b]4o�P1�T)aʊ&2 d\muoLo(qu��4��0Re����y's `!4bDa�u&L�b|Q.Z{cKh�uf =�Hr�)Td�A�H�x).
�n\�^DOt�.�T`�&�^�
 "b���F�`,�,M�\{�latkPaB'����b�B$0�1ah`At8��,��*kr~)*wb"4+&!�!S�te"�
(%g �h}��� 5j�5bnq!SikpD^�:s =���e�GM @dm�j,1bA�e�b9��K�Y��m|u/4l`E��f��O�-�j���s�.0a*��}IT'�i�ec�. 2(  �n�*�ħ���f'smku�>qo|(e'�}DP�c�twTv|��9` ؀rq�z}r>�zcp�$,�H" �*4 fys]�Q+x�j =pR�q�%q�) �!�PCs
�|:ei%䍳vy�'n)akr�d#dy ��&�rxz~d#9�) &$�&�Jj�O"�bb��t{ehi�$`�Rt}$ .cv 9(|p�Wvqo*,Bykrml��h{6# P  �.�dR�_qzolc�.�o0�d( bJh����
�d4�!*y�$&yDe\�ydzUe�Mv.uW��mowmaTTXh*|� O�ec� �̩d}g"���,�(@$�^Ic*Gfa��oj|�atml4pIbs�a��wm�-je�w-&t"tN+
�+`� �"��*q@$UeLT��y�E�t�->e�8K*/le �h*�E�,m�i=m�J<9-2`$6MK�:B�,m$v.6>��ul�g�n le8I_�dP�]JL�$	J( #"`Aol�U�co%pm��oJc��R	fK= /�=~ O�b 8x�z�f(�hiP�;cf,$hdg;C2iel�2�B  0b`$ "�6lfq&O.o���.��>dC�Avq5y())^4���`d� =�" 2 Rp$ ��M><�cfd�]~'dt�kg�p�4LL3�JeHEMm�_l��W^�AHO��2j�{"#)b�H,  >�o|�EdRev`Ex�cbE  	)mh��(@�`�-�*Q648hac�M�u��ECqnl6as�ib��rmg�m��dl��abl�~eA2;ele_W�< &�Wi�'�`re� !(�I�l<`/ {
�� ����0,m�xhc&��sKo$o#�Y 2*$`"&�ePu1o:/43u2� }� 5* xk,l�T
(xd�R#/�=�MmV�HANf�!��f�Bo�@h1�cs*]�deel�8e^HM�(hEt2�;��"�Z� k~yjt��E4C�x~$�el6�"d�Pn�e�i,: 	cm���{OdDrt2xa��R��|
bt(��!\(`X_FI��s0z�p�lA�tM^'�5��;K��0 ����J3.�a'�moJubj,p{_*0, 0 ,b��sl{{Im:/H�g#N�se{�9")��u�o5>eh=	t�lqF�wv�29t.4k}/va�a�S�MBmqq_E3��"���2��cQ�\diDKaP*Q�`g�e(M�*�  h0 !�j;t0�Odundve#K��J��K$< �9a*g�% "(�1K$Y'����Nt/r}VUi��zb}zq+/��{C/Oif�0d��$�v�ej.B� ( "5`a�� �6�um��e�tnjd�Kv'4�jyE>G%(wfRkA/m/Pi��7��$B1��bhkb��|���jt���f?�wtsN&{�a,gsdA.!?.�p�� 	"""tac��uje�}^}Sq9,@.QkW�M-(Ty /"'�qtpE�'
(a( 2"�)o�)+9.�s�Y�#eko�qs2n-uh�{�x,!��hJ0y0�E��wS�|DB�d��Cuz
XldbCe�l()i@(2$ }v�h  � ,�vuM|X��t�dRF�ygglP�6�i�j��'�&?x��Di'�SX�2�A"2(w�" 1.,a*�%0�@6����yE`weZolzIB^)E/fPmm<eg!,l�Kj� t[s,W5d�M�C��(^#�A{ r+!B�<�.$hsPz#e(I ��`2�d5Weha3.M�92k��O��naPmS�(�;J��$:.`8 m�+�j�g�7\j���d@r5�Tbd�J.$ !�h{~pe��g�x`o�dH*{#74 ��%\0kSsVG�{x0�G]��DS*v)�(q��d�g� Y���I`j����ƙvl(({��/ƥNiu�U@=.h<  �(2�,<^P��PgxdKV�euN@v�TD�i�u�Fsp��y�*v�mv]g&4��B( �!( .vnxv�b4't#WzRxOh�<!o?<Yu�x�>�<{4d)*6�p�}�!j�pw?�: $"A�-bAA��a}�Nf(� �G�I<�%�kL�gn�etl��-T�xF.|�*(��+(�p�uq,oUE�
#"�-
� "�J��(t q�yh�J�
TP�p.!�a��jdCS�t�Bg4�u)RsKvrK�8sN)'&�$� �fha�5\�!E>"�iQSZSCYE�B1DI�sN��`sd���r��khd�� tOL#o_�.ob�'�cfJl�ov(
2"���p0�A�K�Qq1e3o4rve�aE d`B ��g�BN�MDnd.(�Joo�Wu�LmY,�.r�c]PeJb�[/�1p``�C,i��O!&�sA��*�j�y� 4�)��hiv,��=!(2��=�
 ��!e[b$�!'�q�5�yyi�~mClqUr�(��2;�Bad$�@2fpRn��U�hi?�qCHzaD�s� d8q��@ 0g'�ͬui3:]�dkm/\�"n i4` &,��i�"x!�=ZP 6$�qd$ErTN����-.r��*/sp�pe �dfU�v�Rt�uu$�l�tl��>�fj��?�d��EV�DӑE0U^ol[`
SEKCE`Eot <�+!!( ` (C�%(wiY5&wjOX&XG�h]xj�Ep�<,d�v�~�.z%y&}5-�ӛ`EZ'��|	�!6`((�0(`ho6��it` ��4��#"z�] 2� p a+:�(�i��k��I5m�H4ad "Bsdk�9)b�O��fDp�c�u�onb�g)`�Jxa�c!�r<�bg��PIC6��8�t�MBe],?3�(qw���� p�Snu12, pA 5`:fg�w�,r>ggVS	z��t%�bTq�u�l�Hjs,&�n~&�G=v��  �A�wr t{uOb�K�Nv9e5��}�/Rdti��/(*���	 �1�p`WTM>v{JgBL`!6�@�("�&&"@"�F h��>B���`b*�]�;9U �N`d���m%]v�g(�Fh�&Cu�rd;Yh�(�'�Gi%�~q�*yb(8Y6w�n�2d+qu򥠲Z�р � �8�DTKre7D�ubqtep0kC%+N[kf&(t(jvbul ��k3�~gaGm2!�(�`,�udd|Z�"" 4H E�AS#kF�O�Y&\f@�!(�5��a|�($ ,� po��a�f쉠 �j'm-xmD.-)m	�'-m��=!�-	%>�D�/-)i-a)�%-)��	�\>=,;�l��o��g�%.-�M-)�",��!�S�Bp% �m}�`En4�}n{h�����^�4,(���2e]%?!'1])-)�)-%-//,,-H+,MOy/)m=�/�o-I+�y)Mm,-�/=mm7�M!p`�go��e~�I�c�LGr.|��#�?�ht$ m�%KP��JRq�bTP��� %a{�QAa�[k d��N��%*!"cun�Ti��!)i>5,]"�'r �%o��ddr��e6*[ vamE0D�}n|@p�eIge�34o>x��(qiwH �#8y(�L5��X��p�`�T�DR�xfchU\E_lt.xt�u~6^a�W`*!?Zi��5)E�nnjS�f-Z`0w�a�~Pz1;:x( `}*
 �" ),�iw�hh! ,El5q���)!�j 5��!�/5t�rD�.i  @�� `a�~=A\
�@y%v.��m+4	rGE�n��uDED|��N�mϠ�0�%�Y�$ �i!-'/ f/vUs ~O`gw�g=�`
?Y�w1�� xm!.�s��*,`!�0��f"9��VisCd��*tnyr�9���( �2�$��ab%v�g�()��04� T۪ �)ByP// vq-� r�l&|ac� U�c�j�hg*n(u�C�l���f*r�f�rҲbrFB�	hPah|y0A�?t��(	q��Vo�$�" �no��t(cx$���NWel2}�S�Xd"dORE�3x�.Ka�nnE,/P�S�E~T���*8B.� ��Ic (exn�lq� �pE�*B&`SXtޭaR(G�10��1q nwlTh�` #��|�f�c|���s�/|YoSd�o!e8+�-:s{�io �ylm�M" �(4V^�$�4bsIN#�	`g�%`dNfn�w�w@7.�e|vPac�-Z��|�|sw�ePG-E {X�!	`�a5��.KF�|(�i�;�s2 }� p�jlK�d�h�|:wao��7BėG�^���DSCM4�_�'�,2,(@/,�W�/"LmfANu�ne.�gj`TO�W^�L�C\K!�fO�cmial0>>��n �)�Nz�G�tKrCr/��eK{z��wE�'��'q�w )!�†M�1��eLy[���[DtIgcEz�d�i�V�
9;�T��!�	�`�P-e��%�?9m/�_ew+//���?-)�/%h�|�4ht�?�-�-+�p.o-t�-�uN$���59i}kM-g$!sm)�! �zzJ]��sX�"�� �i}�,%'�C-��m�$i}�-(��$?/$=��/�nm��'}-�gm.��%}c��=��!-�!- ))=-+��, �4&i'�
&O��z>�Ys0m�t��if,Oc�KyJb ��k�&p/*�"$2�
$?��l-�M-m7�+,-��%<.%�/�&-9)�D)-=-h!��ˍ�%'|�+�i.m)/-��=e�l-�)�# e�oou�Utᨾ�9���[��u4alspiTIZd2~�  $*0L_dleMd��t!~`DY1(lT�Pk8'-gadj/#/m�:UwG/b,TWDRpl.Ex{lgam^/i�C�G% 1P+ �5)�$-|%	-$4�T����=).mq-o%+a}-m�e/n�/|]/%),UU�#�/3-�e�\i,C���d*A��(@gm|fp>_`trkcmfz�=)n�5 C���j�`�'�njo��o,���k���,�)Z�!F� #i7mtiyl�04mG[wBEss
h7q.zt`' 7s{+c,�l)o+`pgd(\�;J� cons, i���VH��0TEY�S@�UJ�!/RaV�a)�L�m9�jY;	�4?sJ�(p.h@VpeutflAL��� %�dW�ad�A4�f}il:�yua��?�K��qx04�PRX90��Av!�:!���&�M.!p�*4 PC`y�|ku|�p<8Erwy��Q(�`��{>?�c�lv4Zs#m/#iwUlG�a�lmab*lk`�ѳϥ�zpasn4`wa+v.O1p"fSc��4nhc$�]l:urd�Ogn+|�r�2
lR*� �s.�psjzlsP(SqR�O�J�A8XE ?���{@
?*�g�xr=|dq!�0jp6t0|d�<<$*dMvr�r|[@'�?+^LX�:2;�Q��8-pmK��J
�!4�h(`)ps�pEמ"T�eH`e!��F%o
�!�Y@5p6S6�-�j�D��ih�ipfwecckmc_m,�v�d%%"Fi�y�dXYX�Y<  3"��ppx*8��/QdK0q6�)E�cDMes4Z�$q�{��y��p*(�/^km�v}��r�ans��h~;"(nB���+�.:��ac�c4�z.®re�b��/Ac�q�h#=�y+6�;m�{��ip(>mz)tz21 ;/
�� !?za�@vG%�G�Wȟ�\k<-0/t���3z�x%�geG*>�kMe|N�G�s}�}&���o�ttat'���@T(|)hqo,8?*~PdGwmV�o��J��{,=eud�>�/h>a�"\o3W�@��p�ӣ /1Jm6<Yd'/�1d�y
$.1;
b�*%nyT<afle{$Iqt�iq|' 4$)+`�riy�cm(|h*�m��r3�Bl9GL;4�&}��� (akf{@!f�BC|)TA�-e$�am~725�m�Jn(e�OŮW{L��m {�$�9�B"A ���1(�ek�DL��zkbt��y3`N9�b�5q���7	b�\ ^�Em�I0i*%j� �*�0�}z-Q�l�)s|��M��) ��1�j%tuNl9l�s$	1$a86%6mrn(��on%Q.hS@�AYw HrP	DQEaF.4sd�dT0y#E��g>eAgPa�5D} |~�\Cp[U��YRT���F&�gD(�fwshbUt�tdĖ�DwE8a;�1b&0j"{�#` $@$[�u��t��+�4�9㽤
$skIi�4rT+�jq �anl/�o%G~t�y�]tulK�T.eiVmp8k5|`�C�3efj%l�d�e����cterlar*jLbr!ob}�j��MDqr%S,/-.��qcka8b i�[͇VLetl�Qvg�CaE�"�ak1h `fr$r�u �4@r�j5r%. �0(fc 0hsE@bw2,d�H 7 �ugO�P�e~g~J)*g*,��Ƈni�ji��$"("0�v��5'i��[|�SC3TAtpn}Fq`�Ma(%h��+�`%�t�)�tr`�Q��`�q%
�` ���# D�
�)!$h"4�6u�O���D�g+�<k�p Okyg h�F�q.tpmf'�Au  � 4fU!�o w�Kr�d`�e�ski��i� �(8j���(Fn6CO٠rqpZ|	gfe~d)-b�$�dnmӮ %!,k(��<QCl�wr�n�Tm6�ܠ�w��u3b%-Sld�+����_\tdRiU@�7CWQERoZ����$p+8>�VaSs%v7n(flr%$�<"u`]�d��Y�,UJ0 �K��i0�umF) �f6`�Ah
   0�s qy�6!�g�`�Y,n�� ;?n� ^��-`(��>̢[� `� \Ex:\%�2 �Nj�Q5L5�& �9">B�^�"  Z	�;pY�,�$0`p&q>mq�
�,) 5+�RY�)DX8j42`�Xo�"!! �V:8Yx
�h "a�;_.��`xq�}2�\����&�z2�e|$@w1��&h(w�U mc. 7mt7Hg, f@e�o|&MlH0�.�,IX"�\�J(  ���9.����� �tzWl� 1!np2q�,��[s; ZE%!{m%hP%aS�&
��*"'�1j0q�\j� <�w��&[�d�$`2�� �;�y�01������"�E�   l� pxL��82� Tx�?�_"�o9�a,�}L#�Of��pnkeo�fLx,�^�|y��eb|Lb,c��e(ost�B�9O�pazg�vl-���4�zifh%jc�3b"|Kv-/�he�ad�- 2o��E�r�benP4J�%b D^%j�+"f iP�,��j�8�@giF)�����"|)a1neCc$d/�v��),�wg4N{��Z%�a�  000f$�Q���V�Liirfb��^aGLN@�+:�0q�@q,�" ��Eo�x��ckz��qQR$� �� gy�uk�>_Qq�;ez"�;2d���+o�!}��tr�5-dn�aMU�dh�e�L9�r�İ�arseVro�ct
	Fb*��1feH~W< 8')I�-aМ�&{bx  �� C|'g�t�ofd{d0�)I���T�> GBwct�ea7Y�o%�@��v,eu@R�W����;z�|h�&y��F�$�n` 0(cv�I�,De� u�զlq.��,lElgRxnPi�((7o��	{O9 wR�c14�jz:1t0`�o}aO0(� �vq!mts;l[9 �*�cgCzb  ��}7kvF�mg�9BMld�G�.NCTn�m�-�)���BiRpd�s
�(  %2`�d�2KX�aG6.k�{���fZo�H��p1�i.gNUc@18u<�mq~pp-ˬ�8?�8�db "0umg�ov/a�m�V�j����e3d ��n^i�u`2W�H�b` �
�a�`(�#=�2T�a\ vQbpte$[V#}tX|'���+�*|�d=et���nfPzx"qaMs�;[�!0"�"C��RV���olCT5v3w�$�� 4�*`�e��sj�xv-iu|.T�9h4o��H@llN]�{�{h�yMeeFkti1�z%�M�>$dh��fEd�zHbw7#i3t�C�r$�f�0"4mri�y0M�L��z�B	�$ 1hF& aQ|Mg�Y�Ctt�iJ~%*Ju4rI`[@�t�a_dz��C��T�abdeW"� ��"��%"��`,e�=��<bd�L�cA^4��b���Ҽ�A�Z�i��nedL`-Q);JD��&3.�p=j%c�sjd�3�02{j��#b�ttpfh!vD)qoeWm�`o=fN"g$i|j�srt�)�} tL8�?".�be�"/M\:��e�3%-�)-,		��<�=�E�.-l	���-%��-,�mm�=m!-/b$)lm.m��)5]4-9~-E�
00  4N~o0aD2�t/~O�0>3y:3T+�i�/ 9Z8b!*��i�%�y�� Qf-LV0OJ��.bt`p*/�oyskj.c�Gwb-�f'NTp�>qB��c?�yen�De��>WR#	*�(�/)4�%?--�I�le+,��.����nm��Y�=%e-�%-/�,��!-c$--�=n�$l�5=),-`1D2�o���n:�� 	�m-m)%79%,,=W!�,�E*?-)-a=	=l/���m	m5<-%,)(/}%(e~�)�	-�1?E9em-J6"p$kn���M�b"����M- 5��/8��-iz�Ae�a-5m�m/�,M�/�/�-��m�-/l�)-}-.�,%.(.n-9%�� &�ۿ(
( zK�ST(CUd�`9`�MwmrtiT/�c�Ks��G!�I�]�!�%�t
h'MDp������-gP ruOtKY�p � AFD�lA�UJ�7-h3(��j~�w�S[��=PlUFIPcq$mt&S�//$V�X�{+!(�o5s�bHP׀
/�I��G�IFH DR�-$ne0 �I�8O�w�.m�(8El0IOnwH��4!|�'�;"�T�aQ�%E!��<-o��gZл"�=x$Uq:f�S�> C&)ed��Q�;!uiO*`�"/��!`8)-�`t��uEP|bt%h��s$�aN�o3 " �`erx�nPQ	[T##b�gAiG�mP=z�n1v%Jd�#l�d&`iQ��fA��Wq���g'�
(�4(��L�@V o�na}�m3L�'f�*%
!B� qd|�?rv��M��zl�* p�aie�;#zV;��(Q�kp�d�jO.ig[�q'(m��A dB!a�m�udR}bi�cTgt�a4�}.�'.-�#)@hg�G}8L��!hj!��ur;/�0o�� aO^9�/ `e[v��{֧q�3�vQ/>�xE���M��eGg�gH"�( pfvFa��"[P�cbdudntwu~�gt�,.a`��bq*=3�*�'s1>I-��M�5Xb�vf> �#��%�4/�Ba[g߀�.;r�y^go(1JB8}�^(˰�6a�>y�+z1( obcMdiA�}ʰ.(he�|��oz"� .9|��7u$rpK?n�F>�A!�!al-��i[P�"��na~#<*��& �O!1hp��:fi>�f,F5�,-or��cw\F��/t� nx)A��a�!N!t�r>�gS-�n��19�5�k�b�$ 5Y�;a�g3)J $ �s?0�L`@&�1+R
@@Z�aZd\my6ql& �q""��'rL�ht��h�h�J�V�i0rz\Vg��}h�!
d�4mi3sT,&?�7�jg�v-+;(&ig�xd
t�i20 ckF�w$�2TX~*3!W ,
�0��$p,w	k�"�re;>�"dEv�`5a%:l�7,it8SLe�=��Nfil"b{�H�2>�gl�m�s.v+d-/T�P�c:���˗�>n1	`VT���X- �|�3.o�'��m�s�gr�\#^kel���}�N\Ek99d�W|��* S<��yv7��pg� r�gN`"�:���vm� v�&�`.lB"@<�|i�t:�7<!` `�slar>`l|Jb ��ht�l2$��.aOl" �1QEl�feE`> FA0	��(.A%hIk��|溠>l)���$`!/fV1au���p �pH1%�P�sc�os2"n-m{�.   ea|j��ck�NAs�.ejr#�,�gtOpw��7o/���.���o�>nZ&$�Mduv]$�"!"��,o$:yk%'a�{8t�+5y{U�#��::�`vudb`�mfsssV$n*"�)�uile~m�(2u�4m��`e0�tnkt�X'TO�m5ll�h�(3y�,o�T�`R5 �U�4u�tHdd�q]�s|'�( i��mxpe�A=zfm��f�H̉#&mn`kNn�q$Mo��v 5�" /
KIC-�P@9teN)�ONS��+:Y`�2"�&H�L�H:�-IdE�z��FW��4;�,H`$i57P���	�6hX�xOuFU]K5Y���%Y %�C@F�Dr s�hg?�$yE�nt9K\;5���$*`�YN�A�B�l;(�m�s%�ŨdzEq�<UIDQd&y`l�!%0 kMA�"`dr�i��&wM!o�_jM]&h}�, `d!W_]��A�M��C�o4>�@X.t׋�\��u��" ���A)sёJ]e+Hd}_s/�T�?OVON?B�L���$X$ 4$SLXQG�91hgl��.tqv.�_>NTBu�(%l�$ndq !�O�IL�Z�j-@eo5{�a7�.od:�Ft���KF�dt}k-�U�* cGs� CLA�џ I�J��E��Ea�AFDOf 
!klC�2eFS�sOZEO�	�G�n <�!{ka�lg_pn��l7DWL1�S<~g{�oGr �'soc��!�+/@�4 @VAXSLc���hs{$o3h�!NJ�{/v3e%L�,]KpQ!'7hAO!�2u��Rk�(Oē|��L���Fj{EKsW@���p-'t�v�aum�|��R����m.w� ʠ+^��I��^29�l*,c�lDR^ME{a�\GA�YXs
$���n1u��OFnXnK�EC�^�D% �qv`��i,By�e�E'� �g�(w+`\[K�G���B_�eR$=@�MNv}p� qo7t zHBtOJUY$&6'E#�cg,�"bKl2 4U��X[2?KX�Boa5�'j5�ó=�.)+f� !�VOEC�G�HC^DV � 4�`jp�m���!H.�(0!)u/5�.-�<--)�ei%	M�M�U�?(y�!(me'<)y<l- �-}-�$-u-�&�(�kEL�/�~,���m,�m-\i 62 �Oc}�$����yt�*�0(�$M'-�� ���o!4-���d,m	$eg��)-�,7,%/<},%(��+-�)~oi��)�j-�+,�<- M<�
!c��"
!!�lQsK(�/cLdapb�XT��l�d�c�uBn�ro�eO0#9��0�"{O�{�Tmcf+A(N�dmQot, KEjF+qc��� 1af�(X{��CĐd>xqc�T��4gl�g��~U`'y �%*�  �U`ziw*|W.Tm�tURto��G��dkds�qLwc.v��,|���4est�7�!�m<bH0�)tv`j���gYqC�.�Ɔorti(g;b  "�(
 %(��#u�gR�e.amO�41��n%�kY[Id͉@p( " |�m#._Vf��'Y(!@ ?�pru|9`�%*@" pjk�Nŵk��fl�);��0*, 4*K[�w[od�rRz0U%8� !ë�4(8 0hih{8FC~�g&&ye�3'
-`Z~v�, "d��|h(�^sT&@4eR8i~wi�,Z �`thO}}��"ȍ`($04q�jZ&nfNBDm�)> �l�W�W"f�AokNEC	y���	&1�
�! 0�"t)cSnnkP01a+�d
 ��Ġ(��!�wlNq'|L}7��%��[�=;�j<�.�`K=6�P�{NR�ҁ!�sPr5Cp�_�`t��aulu"hysn�$�0 �lu5xV8Lc���d>c�h 8!}nn�s|�yWb%DR�`_AM�1)0_� �`& s�5a�&�MM$��� #1`?"#RuUcti0%e|��,n(h*QsB|�F�"�F�{y,�ER�w��+J��4�h*�E(f{y%TAcAou�8H!QH|re�zq��v`$a0(u�t`�E�g{lVt�y� :^�� pu0n��U�,�b�( $,)nI`��(n��h!"�� "u 13�_h�M-�adgd ) cw�c
 � 0(�(���lyq` %��Z�!<�� �xe�:?���v	2��8 Dalsy��0�V}�0*!W�o7tw�<Kc�i
%�z � #� �w"k3'	V��gvlQd��hI���2�Sec$bxmy{0   �( k]ioc�޾&�d8�2{
H&4(i�b	��9js-�sEf!fL`t�"*� r fc2~��JOKZ�( �$"|HX 289")�6�ooWot��Nb5�� ``gk,k|(�jTv��(�"dEQ.[Y.=Ui�iIgiO�mn���v�eѢfi�99vd )�K` �`$(!K~n@m�v.�qg�drafEm�/c�y�z"�3�a&PuzT'u�ev���SG�?�,bn�g2N�` 4 �H$I_ 	c/j`�<TF Bե6hKc�}6E���eA�?19 i
 �@)`Sb�"��jt=�\e�f%r�a�e���>~ Q�2��=#+$�6�~#�Cd`vZ2H	0� `!f@fj9�r4S|p�*E.�G�l<�@soUu�v�;�� �)P (r}" !%$ 
54����T( 3 �M�w��Dn�[fm�\�I Śd�T��(-.c(Arc����!�b��-NpO�BSp��QAK�hLC(�i�{Z01��0j)$d�u��-rm`u8�Y��l!v��s92M� ,p �h"�, �a�u4oYr�1`�0`��*2t @02"6�8Pxgt�2�n�n)|��g��ڄ�!2��##D��w
, �$)I�q&�ge Z!��$�$"o�#2FHM�F5|(|)ES+G�yL�N}xi?�#�!0��evD+tmf���"
G`���oo9�Yah-�m^dahz3��p(FEl�V\U�]�
�(:�!�w~9IG�ÎKn�H.���s.{qa�{��I��I�,LgR9*
J$&@��if 9��%s'to0�0^e� %a  @^{H�b�,?r}eh�3(Dp"(�bm
 #�-$pli��>Qyqdocc w�x`Q�!{���! �< �p(��9vwż)3A)�3x
zD ,c�k		+Ds
�� �! ln(pD�j6�^��dq�mD.�4(���a{0�Y�},ݣ7'�U�-a2 ) &�yh:!VW�S�`9e�$l`s7 eRl	#h!�dhm3{�e��M�x/n,"'	N��" �fw d0�L�fdmItx#*�iEs�4xSlmfxlr�;�")�uS�_�qEl`�o�L]8!�ǠP��!rFeTxr/?i(&d0���!`�f  Cnha�qh�S�t'B,�D��f��J�$-R?�ca.��P
[f�wl!8��B�|(|h�3>�fr}�ֻffr(�jF�v8pMWi;�� 8�!Dcs.2ULs� %s7R��t!#bi.�W(C�wur�mduI9`&-elal_+v1��&`!  ���`AOtY�RP`�E0�!�h#l�7ov��?(X�gMHM��]I�F�'j�lw�UrA.�smeL�6hk!tkC�tLdE�cw�/�M��ukV2+�`Iq�߄�a},4a�32Cjc0j�V?o�.F�T�AXc�x5�q�Z�d��}w�K�0\($"oD�:��A5�eTe$ilPPka��jt�o~, �wMuV�uDel�ps|�p�����E��Sk�*Sp cqh>7��5p]Kk#d�Pe���p\}�a6�t��4i\j��cus"`l�g T}0m�4a�`Id> �<`u2P/�A����OD`�mGUL&^V��g`�w��h�,_N��oq8iv@|��0p�� �0}?}�d	�
�Yeh(�u(6Ou3�0@lrP%� }n$�a:}s��f m&`�g�c�^�otȢip�*n-J��("�)dj �J{�<�1�գr��n�3MF4=05"<F.��A�&�"|�tLa{.�!lf���X��W�wa~�)lef)��()0u�"t|c8�q�a[�S�l��o'�֬D5�t[rMDf�L\@V]�C]R=�N�u[Q~lk s �$fH
��m;n[b!qxOg�1mdp�"H8;�2��%"2�a�w�tpp�r-'}�eD)��p�� �%-�l�3.uyA'&|m�8�"h  "=�-"( GeN�zU $�R䜂$ai2�EalyTEjD)t*vh-.�  )GlzS���t��"{ w'�P�Llh>1�EmFs�|%�|=c^�OQ3("2�0$6AS�e|�tabM�sw��9(:d�tg�of+2�
805*"%n�2�~��amfm��'pU�r;yj=�E����kh[3{�xmdHY/ � nIl	;)  0  �t(}�)c`Cod�,GnS.J�DunNj��+�����4yrnchI�lMUr�att�EM�S�^OcMt�V@%s�.p�e��"(qfh�#/��}9tl3``osoT � 4l EofpVh�Ӯ^�(Nmo.��woeANv 4���nCSk/�/ � g�izh�g/f�h�?�h�`'U,|#t||1t�i�D�wm6=Vt�{s*]mNA�e~d)��9h�s�OGgf!g�1�pb��zQ8
Y ��!�c:rbo6P�Chyonv =�d.My GeV��\C�vg��H�|a�mym�~�j���`@�s(�wX�q�Bdn�Q*eGNx�nPs�h*FqC+o$�u!h�|��pat`'mSp O"!0`"� `8�o�4c��er82$!x��� _41�es�};!h`KW;R � j��T��b6�T)0l�&!HfS7z�fTfU}k4"A���_�G:���mi#O( " �i&(H#6jkq.i�eeu.p&�w~G2DlC5�'C4�4�a,Lez�Mg��tokDn<!c�C)u*yw*~�xyk4,#�08�+^n����s,�ps�cl�Op-{b�p� `�%��.TH�nUlE`
g~k�Nrnv�a�3\i^m��nt� ��u/cV/U�yk�|b.DPupU�K�X�rt�d�� %) ]}
� z�@e� t� 4y�7&_=/q��2(�[��$)�`p�Q�]�~ q-kU)d`tf��;
0 #6�u��TbcrK@vd� Ш �h!R�{}jp�ed�Gr�4d�j�0<0�tnE��G�aae*P-�u�2=0uhm����dQMrz$��n��G @�9)s}���t9I�j(�! `�K0x1 ���a�n�wJhT$'d((gN�QOޅjQyoܘ�a9K� .�Bp�>tx�U�tf-nm9��5?>�b[3�S�aQ�-�`CcApa�Nm⋨ko,hphhG}�]_tm��{gz�)C,@SSI3`h `0����"k�avgGt�caeb{:L8�! 4T`4s.yhA�u�ik|�@�t .<5AqOoC̭w4**sl!4�' /)��2  `�`
/�Ovm\�	�$k�4�fGo�>�/j�kz%h�t�p�feswa��a$pmpvaZ�b d!"�$d�`�s�kKwe�0gr���Twnm�r t��iE#B���f�(lmie�/AP�d^ZxnD egy�, �(q#���d["Decd�` �Ls75s����frMi�)0��I��.ti}mZ"�e^`+h�!Q0�)0�!//4��5p�2�vUW�zv!pic�flf^Ojg%x�-a�ab5��vdr	5�&/0f��c�~Esedt}Bt,��pml
���-d��I`��pe�n1T	r6�m.�D�hdnnnņfcr7��|���i,�	�{b(B
( ��rI�NcDm�cth+�ot�*ul�.�&&UT;�sZm�$�$Z0.d+�me��-um$k���)�>�[J81 �� 0`toxc`�dt�{/B���e~#�|v �}m�ǥ�bxcdX0)'(���0��B��q#"�.H�ȱ�0be!#��zT`co'u�fPey(�+$u/$>�$@�%�R*�f3x�6fa�Bk4Dp��at���4`�Q�*wVe{TEdm;��%P `%X 5K|{(+�R�\7L#?%5= �W�`� xe ;#�7cN$2�.)\erfp�aN�ix(�|i-Ya�dE�NT�d=isDv+w�4s1�t/S&-ed>fjQ��WLk�H l�  �3%+��n�u~�-�)"Sua�gP-�#�.OtE��D\��Xl�{��$l  HB#t�ic#�L��ͺ}q�l,`t�~c�J;8!`� &
! :�lQlPH
#���[dc��s6XE@|I]0,`2<$th�4h*k^#Y�L)-x�sgeQaN�8Ct��R�F]]L�E��kO
!`1"Ta g�0��uxu��"mfZ(`�I�d%t�,�uMa�t��n`}y���luv�e)�� ]3�P!s :	dU��%x�)((�)kj�  )�m���op�G�,{88 +8�uwmu�f�#�+$0`!_�B⁐h��ed��S|�93m!��{sg�pVT�QHid�e�t�1��,08b"���n;(zkX��� u <h(%>v$r+�"5<x(0rb((}|y�~@FKixlaFt	v�TR@GCer1%	Rh�� ,!0jrctu�c;^ 08iug��&!8n 2 ME h}�%1�x�pw {DQgg�y�ဗFK3t�4SKCb� k
 %�(8*p0%�KlRDI{VT :]�&!t$ �߀$��$05�)rb1lGejQa�d�0(�kJ�r(3�j@�|N�.�E�&l.�{��o|f M�u�FpmqkKa~)i9@%2�R�Aldri7-/H0"2 �A4g6doT0Al�<m�Tr0gggK.P`�?.�%.)EN$<��ie�d�jneAsus&c2�Dtmn:TVFF(;B� ��`" r!�ݣS��c0o3;ot�Qr	)3�2�h '}9�$  �p@CF}h8�2EEtP�>8�n$X)�dm�F(��o&�#(��yv�{bm�cj%�0`�'�ONg5�5��>E��f.�L��e7��!eh�!hd 	`z\dDg�/s\�	fK64@plg�N� �,by  0&�d(`a�gkkB*1�$&y
i$d|�j),@r:Lbst.r]�'a.U�Zkd	MwVR(,W%-0. Kva�cjb{�a &�3�)aErLEd&<�age`m��i͖'-uxq�'0Vp@ 4�b$wv���0zka�t e_�er@lKyvTNU�d`qDDIz`&�T�), 2�q6n@` �%0 �I�bH7o�Lg!*JCe"9f�t~�umdV{C�h�lzH|ole.T�%�Z 	��b1y]~ C.'A<%c�*EOc��G�$:OE��/H!ig��n.n�%DbX*u�/|�L\(1� �t1p�ag�E�?efz�adIo�d1�?�K�j%���s'��nE�Is(@!� /�. 1W<cF4xgsVoy�uIs�\pkA���q�1WE�=k�IAJɠ~HG�P( f�Bbtja7�!�<�3�rɔKwr[���&LrE�U4 gbi;e?@��9 (�q*Y1M$SqsM�r�u��ceW�sN�JO��\!=�WePu=)
  t $Cm<{2<A>)o��d�<5t pY.p	rnc��STySt"}KHf|�+l.LAG}%a��A�O&2-�` `$`xs==eDWd�a8L��czHtm��U�|�1�4f�w&u�`a)ZP~�i#�e\i�
� " !�X�V�unn��wAv1|!y6n�f�p y^�,`d$�g`�� I�o�   5�]0t�is�\Zo�xw{ s�9$~w�t9(�N���!"�`,D�i�._`pXO2:q�dOve�!0`0#8��,b �~C/? R6o<e�dUeB$L##�kk���LrEh|>��b4!%# b3vCr-�j��t`a��:hP*�eU@�uzc#iA{yd!"B �
 H$(�%4@hQlm��7Xp�H� *��tmV�(}�I�uih�{�� e(`9 7%V�c<!i�.�{<(2E�/6�B�1t��oh��a�ekDk�%=%�w�xeg~�
*D�e����d
<�!&m_"){KJ P"�mwedNd,k�Ep�D|�P0(A[jy�kf�I�,l|y|��ms d$�,o�RU �l0 :�p�AE$ov*wkMnD�slk/��� !`�ln��D�\i�t�(gjt�v!::�@�)X�t%�~�(r!3��1pe�n%� DLSE|C��eFd��<�mM[Q� �U�w
�P�2I;*`  �E({_|��85 �mP;��2� �
�A<e�.�D(��.d͢-lL`X
�1d"['����pg�Q�0r#Jj 4�0�htnib~��)kk���kl'Ac�O\p�^0(dh,e@��d�/��}d�z~m:� [EEW�UKS�tLD�@#�E���i;� -"��	p ((}5`�)r�>`!��w0cv6d�4|o=�V��"�g>��&� :_�L��]J. Y" ����gNsT`^1o�lPts,�L�hbT*<�Qo{ d�oz�j65|e,aaNd�h-�gNe ��j*^m}tmr=kY
� "���� .��oo�U%��$4�q`ga�mMZm�C�v9t3( ����h��u���a uE"gmG.t,rul�fu`)8Tf"`@b`��~�0+� @"$2�(� EAwRex@y�'�.0&z�"|dl\ orjts�0	t�"o!5�dPkl�{�.W8��Li6(6hl� r�tL�-]eWqJc�led�(v �B^l�iU]#-un��1[fNy�E�y�8(t|��4r���lpMm���/�,`�u	mz3&gnV!�/x�uhT	
:,3!�M�*ebMo$&n�};HNudlh!y�)�d`�@ �{qwtb��, $�
��
*`b`'&O% ��v�mLa�q��l{���v;+ �!�� a�.a�yl�y42`�e�E��}%jt�cKf|g~�9 �1g����d i�;! ��A ona� o�2�4+im�*i�Hh!$P�!pbd�	t�MW
cgba�f
pI,�`;
a *p�4�95�I� *s_h1�jx<K>Nn|�N&=  - >#�e��/k�b(!0�"D�)eumnl?�fBr��R�Ԇ�K#+C*"$cp a!�  i����o|%QxQ��t+g|E|^}{w.��*� '!#/J(��� *wcdgU�Aj~P0)��`" �&}%�DjT!�i|t@Wl�eN=  h�:e,"$�F���&*h`.4;p $$ .!��b ��I2$u>gVm�N$� �2dYj�(`&8d ���wx�q-]b�&�El4I�K��*$��)(	11�w9,|�Hw.]�O~;he�c2�o�|kD hK�b!�d p%x��s�nd�h$(�!sav{���oIV��>�N|n�]"��Hj^�/jei�.E|c\is�,v��[d�lV!FS��E|L6lF���+� :� �=JK$0�d"� $��D'�|.:�^�RN�WD -��gcv%"aa�` � �<s�ii���# 0� �l�dvjT"x]�pcMh��,  78"/�VeV~2 � %#9
 "$�*�! $HW\��`�)�Y�&"%� �gOs@�u{nlu9-$�7iv�_GlGmen�ogu<A�xxKetd(� y�S�fW-zw-g�mat�yY���~�%��mwn_qg��xw�<J`Gq"�0!�(zv8p{l0zca�+_ CROkv�VOoueV��Hu�|��v,��|lD)�:bP�(�F#�$$vwn��e��t�b�EM㘩e Tq@hegt-�z`y`2`i4 ��u�a!�lGz�}3� Cr�'@�$@?*x�� pe�:e`p��$�enb$?B`��!|�r��00�i�f))tuAsxy/�r _��megvP*u$s�"D$��jgv��N�cdmVpwyP�dr+"]Jv !�� Jr�UUg�lut}�!�%~p>�.�`-����R����l:� h2B_m^M|i�l�r�N-Dem�ga)u�]E��at4��=uO$CgfbE-�axCjj%!$$bu���&("mUd<cB�?Ru�m�&cel{apu�DoR�1�taWfM`t�C�sq$x��8�d���d/|ic@0�vtK'urFHt��z10}9u$d`�uJ��(ii-i"$0�yJ	(� W'ewO&�0d(�X �(%�)�NR �)�& �w�p% k�N�A0��6�`] ���(es���Oldmc�S2)� ��@�r��eǢ`*�0Bp����Fo�)a�c�9$?J
��9+ jpW�snr~b�Bmw>�f��)�#)a���u`~ %f,�c�c�0|�I�u(?k*3`)83Ϣ ��)2v��!z � {&`(�QI7bo�{Ub(�8,'f�r%iK.'�'sF!�0%j�S-q{a.�H��c�p�t�5\2��fq�z�OPvg�!C�p8�|3:�(|��rn~; %p�!0eF�屨 $�S�61cnl&f&SUqsI)(h{
 q!p_sa_#yw�x3spjYuwjz�m?lh�n|r%n({2'&2T5rq~2N�.u�onV�#inug.48�<`%�UmkP!r&��&alt�Otaa��8d��:MM�eManq,�8"s�.SdjV;��*$E)� (`2�g�TO1qmb[�&{gjpvdSc �E*h(?�dq #8i/fs|TYY0sT+��6rXb�'�:1	�, *#�vnA��,��T�$q��Jkj}vT,��0`a"  	gumf�`vu�`߬# 8.($k@!h�Oi�;#||i<�>H, b!`!\6�c55x�nr8 i
#"0  5 �{�g�$L��aJ<ca�K6�s�4�hGz.YCo.��W�Vy�ac�aAPh�cmiEoA�j��#0`  #}&�0�(��pKO* b2@�Qd~�t0�m�6�0�M�� �9� %�PrL}�{���	�h� lb$�f`?�&qa��0h36��T+m�*!�6��2�0(*�H� �3m`4�|l s�re��`�21 %Kal :x{uF%`X+~`�n���'1v� �)l��$Npqi�#Qr0h�p$�>�$"��"d`b�{hdni�Wb-n~�!hm+��%�R<�+v$:b"Did
 00,2 0�|�	� 8~"�5dkh��?pOu%�	9$ ( !�{#-hP�wnw
2[$0Q j�"2`", D(`-��dS�b�[�.ju>R/*�p#}W0cnAME�}@4yO�b�Rr$ � ̠�`^� h �,�<9��#* dl�ph~)R%�"'O��eml8mŪ80� $z�$��MeblE�r��D]��(%( �l-=`��Ev�2���|%Z9xr�,l`�  jf.8 8bj!dq�ac�<�Tx�o&Oxs�idm��r8%"�p'u}w/~Bhs�e�eqTa)00%(*�$�]X 8)t��� gnGiSCpWUfG}e�p�cc I>�2)#(`$i(� `D�)ns4!����nC��h`�g�gl�  �5 d+ZX/�.��to%N����
: �  �� h   P2~S(~�G�n}uS4��0q'G�`{hCam�.e!�q>�
 P��(3 �0SJ��#"�s#|��*a� [3�""�! |lp�G {"y��,H}B3��pTa~A?nfYe+  � !t/�.�4���Y""Vhxw.��fg!/�2e��}��o?r�5�6('�e~7$`�b��>�v!-s6\wO�,'.`|p��Bn~6Kf``fdHt$7C6�Fx�:;>OHn�	a8 �-c4_3cl7kg74O�p�r~7.J�&)J$@!T�\MD8P�"8J�TsN�@4^rmHmfntC�Q�Ca�p��@ll^ta'�R"`D a1fum�dCG0�re&�}�n\r	.b}a�v�+��Jh�c�tY��&QgevkU-cserAJ{e"sX*�%�ihI?&}2'TBvp�dhi�&u(d�vo{z��h&�i`!�!!��=
 eL"{oed@hvao"iU� xLe��m�.e#j� $((� ?w�6k0aD|k>=�T60��ho�>d3ioo\.�otp�e1��
EHhQ�7N
 (����E`y5%�Ep})l$y+b00,�"c?NyDPt�Ac��vRzJNh�j_cu"e��lt�ogFmR�S�n�V"% g	�Z:# �8��bmf^&q2ofKreccM(|QiE� xH��(?'d@ ��0hppsiO�"{�9)-�Caw�&93{���(p#r:r�Edevu`:Tm��yn E�m;k��*�Me���i�o�Fsn�|�Y"���&���fT6��C[%$ddgr.p�~&(r8Zuhfbv�� .Etel�@4( x�m{/N�(t)xfrt�-<" ��6� <"gx��p�n(�Ts)��m:���]{�BAROQ�5ADDqK��#h   � Knnu%8n�D�ag$[�<6kfQ	rc�l0ԃQo��2_F֧7`t�MQ����'x�1|m�?�dM6J�T�g���U`*0��hZ:�ncv�T�e8CvE~�,nM	V� N.�!�8(j0�%�c?c�t)YVU�yST�L z�i'e�!1o(�Ɓ�EAPIK^Fd�#Peh�;�>Y4����nrN��a/T]G{|UEvu��A`x�2/g=�c���cu/.AgMlnDNT�]yT� `��`��8�G��.uIu~(`�~��s,t�eR$�leLtnw !~e��@nn)tx�1*{j,hhW6cdb�ko�B,!ytgn�*q��uy�f/�im�Fx�f+fT��=� �8�@2�$�`8aΔreNflf�moH,4HHr'eI%]edu/��$w��`U5�p&`�K&Wg7n.aw�7h0dct�$�w�%|��/y�hm~,_,e�wl��^*N4i;
�  ,� ">H`   �$i��
Nd #t`
v�j/WHlf-�m�cdHqn!-%��~ (�9| �  d0��0fK�a���Ocn��u�yE*d&J�b('�l`4pdhy�,�kD�9);�'l(fa,20�,$ 0��}h�
(d�hh�~�f~qI�<d/�~j?.4�i#.���}X�7.c�wcewE(s��EDTOR^Mt�D)8�&U�T�L.OC�T�@�ݨ9f ch�edc�f<�,f,�r)�	
p�"%�01�"*u��s._config.selector) {
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
