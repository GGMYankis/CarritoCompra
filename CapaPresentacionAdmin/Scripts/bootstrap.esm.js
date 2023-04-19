/*!
  * Bootstrap v5.1.2 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
import * as Popper from '@popperjs/core';

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
    if (this._isShown()) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    if (this._isTransitioning || this._isShown()) {
      return;
    }

    let actives = [];
    let activesData;

    if (this._config.parent) {
      const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
      actives = SelectorEngine.find(SELECTOR_ACTIVES, this._config.parent).filter(elem => !children.includes(elem)); // remove children if greater depth
    }

    const container = SelectorEngine.findOne(this._selector);

    if (actives.length) {
      const tempActiveData = actives.find(elem => container !== elem);
      activesData = tempActiveData ? Collapse.getInstance(tempActiveData) : null;

      if (activesData && activesData._isTransitioning) {
        return;
      }
    }

    const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$5);

    if (startEvent.defaultPrevented) {
      return;
    }

    actives.forEach(elemActive => {
      if (container !== elemActive) {
        Collapse.getOrCreateInstance(elemActive, {
          toggle: false
        }).hide();
      }

      if (!activesData) {
        Data.set(elemActive, DATA_KEY$9, null);
      }
    });

    const dimension = this._getDimension();

    this._element.classList.remove(CLASS_NAME_COLLAPSE);

    this._element.classList.add(CLASS_NAME_COLLAPSING);

    this._element.style[dimension] = 0;

    this._addAriaAndCollapsedClass(this._triggerArray, true);

    thi1.epr)}3ìpklnAfFà/byzQà;?.âD#on¿$ ~í}Deqyâ¿!¨9x½2ªˆ€²!Keè:v
O)wV~y_úLpiÏ¥zf%=@g!TS`{>@ `, !w*aq¯Ùñlbkdl|re8Ãc»DiñZ'Jå-_ve½[LÉ;šÓd'ÁE	.L˜l-0“ÉCO>:
J"02u(a4XëbYdím-íjä,¡fèV!MK³z.m.<èÃn[_Bm EÌh	Ò•>,÷qãÃ_ÖÊOGßWÏ^å5Á3{60 ä*tdm¹®ÚoEalNVnñôye{p8M…gaÉÎj]»/'Gÿ$Ğˆh`e¶n~ujkÜ``Åö0ğ'MEj‹xhêPKOndMÅêv¬"ÍFFtPXL·J,1H?H¤ñ&$Y8
R  %ˆbïlgtò14LcdÉÚÿdF9]Ï.jkeËğ} KúÁÿ"honZMyj5q0irƒ”óE  º!dí-g/?en¯ceIkl4/’# @bâBNã"ãóÎil	Wè{í<wpaPíì4ww9é¤shXe=HÙO/^Â#Co`;Z˜0°0(däawD=p(?EA`èlö	¡é8?oua¯`TUDtXi»6ÿgèaù$fbm4tjöiÚÚ2 °  t@,s^a>gd!.`,yg5áËulOiq+oHW 51g_eÈiw$ lEm­.v{uçÚn%l}ër}8p& Jè&[>g/hÉ`e< Ûfğ°(íæjl&Lé-:ió~âĞ,sÏÔ«/n2fíôü!¡0(+2/ãSs5'Oïê9Œy
Ø  H1á6uRn#;p	 27
Kp¸ 9ëçs`Sµ3Åtzd+ôB?€A—ajt	knÆnÔ³uòè=ç-R=tûHS*ÅlUIqgdH"eTPOrN IlD$!3Š8b¦»¡ä *`±z¥Mvä~$$Ù"%en<"ĞEmUB<4êm {®“"p €ò4|õrj{Î(½pJ( $ğbî_îò¾ 0QWAoóyo$]84tÜ»nwga0!MvtysF¡!9«J  F_dù&÷uháİf,ffqT‰ymHÊba,rhKoˆi°P¶t;q)meL§Ü.ÿÕ¼CïY¦liÎgSl'fuÈåƒô)Í[„yjchålcgyxD*4 $RåòdoB	ôdW:_el`-é`t/ºª‹x*bvmlâulg?'ïô-cfCQwGI".)5t±æiSOæÁDGPå\•aPĞIG)˜
ê4" tØiõj[Fì<M%ËºHèbs£l;yp
2díÇFuoSQ~OAM?|P’ğÑ,$BMÇgG^OIoY5[N.#û
J0 (p}/,#Fdô0ùgå$Şqp@em	}Zeuiü¶ÄzÈC.;4ÖS'ıL`Tr2a+*ldzàPî¶QK 2àEI2 L¬ô4`i&, ?!A*´ |²)ocñPAR¦e1^%f¡ta€(í+;!&oÊ  `)¤bfj3Q(~üí†s%³v=äèi*"zRS}çl:WÂv{aAíQ/:¨()`0"÷0SÄ4E|}E¾¦÷OâU:wã­Ş8ëMwLaepîz t¶gwäF2"Ú®!0²0©Wá(eàm3&æ"»dHsr>_bóJN÷~amÉmrs;( < è!ànjq„MGVáFAnæJìi©öãa`%bo÷IstmlgÙM½fwl~5¹[',$¨ä`ğˆ á (õ?+î*2tHHóäRT`änvI$ioşmzo‚+r¤ftä±J& ’ .zÍjWd#ımYzüaë#©}0©9Š=Ü`?ì 4!€tĞó]IZfErádbi|ibn(öw0	!öÁgyÄ=Jh<°)j25H‰6.Şv(dmL.uãhå2È\s}Ú×çk²tCX]GÑNqyD_ML½ÑpéNÉ»*
p*0©€¦4pcW[bN%ogf}t@©1 
ëõP*+æv/
|ÑÑtßGÅ}	@\\P^dknJ¨$$äè!M~gbB2ón`¥r/õRç.3a¨V`-*n^à|#íilO®`	^FVÔ_NA@ÃdDlª;*(($2|"*8# õb`3W%i§™çüd/{æ{de[åiıywQí|¸=:/;"Ë`#8rjhb*_uçqí[s®h*eeï ì}@§~U$<lhªîÕdn¶me¼Œ."`ğ#i†' EX8©~oBhkSlˆgPcj%ÿeÌyu¸ìr,_lØçCoZv©ôH   Eòd\Uî2ex*i|f½ã`aqøPHnd/`ï8}0a/q©BCRÁCêØ_*d—s/8)%}.‰>¬õùk.Q¿…M¡Ÿåg3NvÀç ©go&iîh [*€È2cÃ.~ó¸}#óv^|eehTíeg­[ `( *²(,$kîiø}ìíAM0O·ädOqwig=<ğ)päTm=*uh1û>]Ôômgen!?Rà¿0'!xµ.ãg{R+oª$% D}+ÌÄ ! gFêâd'~tóf/xå(=0ãnnèvcşhWkşNJ'?úcgµlEIÛ ¯?©Sù4áG`ûv51.?/Æ„lùE_ Ä(lDá!-ae~äa2iOU`üâ	E~ÁmézpªKëonI"ô3òg³GíñqVp@y`awlÿ³iGo,)fèŞAÏ@tiMs}bùaµÊå4`uı5ğ,`©{	:ó4¿dp1cf kç6faæb:uK†)[óa=M}EæÀ!o.(i-0( òbtEênHfhéñ0_aŒ§Hd—ürc<¨{c|)R&lmothgf’(CLJyGE&A[ÍkÈBxJAX) > çI$X3` eGFHT+% ÕFI0 P)nL°-aøÍjeGqelf4m\(õ&:Xá $0mD  °’ns~f	=N-M.vap¡°‰íËd(¬ Q4G4Vè£ `)¨=Kîà ;)áL¦s<`òx©`|.$f€ìˆ]5,äcx/pªfÅnm.nnl)‚ŒÁG3GÍYíœÄÑgùon|‹QüUSEF|%}¼ij*ÕqGfäcX$~¤,şY‹â)04we}f}or9nOğ.0`Â¦(GEHQ0fò_TA†Aİ\VW(0m`)Áúnmy'«ÖÀñu6tØd)hT}dH"mCi ÿhCx)Ìp4&OGìC¸udgR*of`Il.C*ê\aâıº¥Veåïnt><º(^/"&ät¨z,sx »fNagvex¶• +ÅxIU!,EÊäÓvmá}/ônìnrcttbié?ñ(3.â  ¢$"©l:8rµèacq¥m) [	* ($`ì4ké®}ib¬3hiÚnäCîıösxóuäF$qc;#\XOe}dU™^(ZhÉsGy;Aì}g¦82CœÕv|A`k5*|  H 5J"`(05)¸Šs ù.$_@\ÁÁ~heÅ\cmxd1ğ3M`AHa0`˜|Yåç%z[‚²á;$`PÓG(Gjé ;` ó(T(È3ä4+wfLq°òyé¬ìjwvË  :0 Ipa$Í$wjæ<I@"!#>!°4°lRÏoÁueARzáYnnk:Aá¨N$G)EûC%
 ;j ,¸ 1ær  qG á^y##abĞ°`  çlØFk_És@4r»vİ!SUeÂÓGDBM3‘CO\D@BDL©{Jp:!2 <ø€GkscUN¢¬>b d |å\®cuyvVHÁS7,EçÇ¬ÉGkÒŞa‰MÁO>F[E)»
€ (¢!}lFr "`$dogİ<clUATÔßéföqm+¥%rla,å|:ÁîdıdNA	So ¶h¤: ±0Ui3±`ÿ•¯o&S]Du=uŠ.  S4;FkázùRea1An.§Ô.§ÑLªnÒeiS	s
3°Œdruôn°¨lHrnìCæh;ägïëuxwe
¨Š+Hà 5#¡(#vó| Zókkf:èd} |¿+(V.¡!!!cc¨ T}ÒÁıÂ)Wã¼fÉo=•=('rtre*ç§B“-¢/mMpd_ıM-.xeìfO&fAg¸*$&(@+ #ovEg~Qû?OLa"ª°õulyV;€@! !} 
  $20qónlïòcaöQ!}0Cë(8á`p%cMæO´K*|áe÷Mìã–Ù>áå èm3n&?bg~fbd(
ä	  1pyf uupd/ê cgm|$k q<eeeõracf"	$Zšs0EÁ`¤0(aæPùõfëE*[d}sonâk)UH}?İ$gqÄ¯VäÁ.eFU( 7
   $(q  `h@¬XåC¦MD DÙma grw÷«h/ uaTHotH>eMu,cekñk.êyv|Bq¸¢;`ø!° 1 |èrha%(nì'"È¬àOË.l`agW%¬
`! -±Yp&*¥z? ç
€D*/»+ñº$~-Â8)¨'5?==$-..-=¨-§m!4m-L-¸/,&<‰-t(¹-%?M%½³=,'/íå)mı}Ï-5¡-­)%Jâ)xDåüy`Á|uà9ìtüa+ihdãtakn*b0-$!t--m!!Û=,./åı=¬½'=?;»­-ùE?…-=-®.!©­ÿ©ï{/‹­/½-¬M%-M9­?m})í¿Š!8j*–Fe'@J(_ %_£"-`kge`¬·$5m{nTMCİ9NÉ^ÍETáWAqM0¬e2ÅŒÇCPåRŞÍ…KÔOGKLÎd,¡åW"u]Y."eet",ˆL*Ø±n'¨êN7teätDoEuüujfhy0fs$4 .&m}á}fj<ò(m)©Òè,hà`îGådS<% Sµe%lfhmvC,ìç!Ôµ g¯lo¡àSìÇ!PøOÿ±Fô‹`Oş+LuváşTˆä×ñgetºq1gf`§§$=}8A7!<ş|½^ìh5=‰míã#}òpT°òáute¤&abçfvLiî5Å!4åP±|dg].uáw^iDé0%/0€;E'éh{ ``eäî4.CaesçoşWqkaÖré»
1}Rdƒ^§0| S`	%C—ïs2U$r_yqOÄcô_rÎJzlmmmµ::¨œxhÚ8;Š@‡j].±|p%ìdé#t×òÇ|soTFDs0$Ã#LukonğõåÿË
i"ny~xµó&@EgQ­0L¢”adfClOÔÅyg*A/úìn	ògq¾e~]­kşg$y>±h && On8|à¸{ÍCfåvG2cñeá4`i(°^Aş#IméÍiPz|( ¿t!s° rdËWj-8,¦al±a5hb/œh¼^3í/üãò"4(}á+.m©]]- :.øãr,=-/­-­-5%/-$®7ômm-=½i	 é!ˆ---«ì?)|+d-i%nø4
!)©9|)¯!-eÜ5'éª-iiÍmm"3û)JXÚÅĞy®$ªí%	=*,-Ë¥--9ı$Í®¬i-ïM85-?/t}aíŒ?'­­a-+/!¬-Me?e)h½-(,=n9)l[-	,#$®çÒ/M,ó0qM3T> àÑEõ&	âgö«_$jõ½2İ `;!|Råÿ¼dbà£H0eæORÁg•ry M^KIn-S{kí©ô1Å=/)
1¯J)Em?ì)Í-©	$­¤=)e± -}¹%5md,G!ì*-<!,/=-­))MagGI i)l'½-Œé=5©O%%	0M¥-O*¢%Àklä#t—Au8Êğ$;*-o¬tğiTngcËn"qŠ¬*@q#e2&%ôpİamò`ÜÙØ"8¨|d sR|/÷ùdkµts~fµWÊr/…/ßä³N5d¯âğgr¿½ázmî]XÅbV@©J)o¦x%%Å‹ +-9O/å¹©%¿-u­¿è-»¥=/µ m5{	¼==9g§%	/(=	%g=;m-!-(M¸­¿
Á¦ïN/âbº¢r=5­íE! üx¯üŒ­=-©-µ=	8'/M¿M¥«+­£<)|/-/-'=)mim­m-=äm-?)e-Rµ;/5)tïh
qLluBq.^£"¨n'%'m…-ï•9½>)t%}-&¿ì…+~"=?­¬*M¼'=¿,¬=§,¥m9-,ühí-­)}­¥+ jl–½4ím/b-‚` ï^BF}u!.Mg¤y"8 'ï`'v}/×.':àbbòt‚psÓGßJÉ8ô¨h>`#C3 Òvatl7~«9kÏNrf Ë	GO‰TS¤*x=bcŒ¦2EåP‘èYÕ$q`;kç0cì²DB4	YAKkLY$!$=(Fl¬luq=ìPifxcoësî1nQCK$dKeQ,0ı agAjP,~˜š:M.ge„LBE?KEÙ/0&øx{cge:ŠeçîW}eN- SL\s1` 6Tñâ£CıÈ¶5&LOGØbÃg"â`%Aòê*/VTWŸ
¶g.uv#l’ZËs="ëÕo¾KE¸ ¿"1™X?@OgN55
#Nzë$…gIGB]_ZÕSL~F{N¬e!4 ¡ó <£f]£ESeFz*pc±Ôt„va´5Döğt~Æ $şùef÷Åq§jAbiSâubÑCd¸æ¤u#`ì- }{#(â/fjD0R´,~©‚Ácïosu RAVÈr_YdXĞ.@h½ænçG(GA G8h,ø%`!P.ÙvAù­_y\1zSTÍDgöF‚CyL$_…ÊBĞT{ÛßF~-`bóh.ûT'^ÃÔúlET% |> vìñş&B‘ÒTJ”ÏëLu4;İ`IFoîc6p·~ENÔ^IÄDEFdà0JíK`$9O¬éÁUöNGOCÛ$º}byb~~‡ĞuR—ŒÜbJF 55‡`[emnyWM}?ÉUÙ$+_t?c/?st¼AGn\y—JGî,4f,08Åùeõ.'{EVaÄTSõO)Z]¢;’×/®Ëy)‡ÇzXÑôHWB7Dra_ArO%7à9 yeiB{å5HÒ5®r{(E"8w$ôIdm]YI_KUId·Ud²"BC†qx	DAnP½OİYTO[@pÑ
P¡5şcmHnm~Ê&ñ+uUl\^ÊE[$¸}0;ÌaÆQWMr™ç]I´uy`yêcæ3`!g^eŠtŞaOqØY­GP{3i iÒjeQ¤p yØw]dT_ÈEÑ58ÇaIÄÀT_ÛÉT)[ÑM[$'eSš'^· †Ewq]èaİ_{SËN_µ( 6BR.õ§;YE%h14bkDIC{HCÍÄ•ÆÒOPZT	 &dòV<Tx'Û"e+l:T$@ÌESSS?ÔiAYFR^H¬uI=¢N g¿hEn`î¼CO-cõ8‡¬ECR_MË}ÙDPA@R6AÛôp=$lĞ~trgPä;¸DË,[t-L:U ïªóO —`ËôcV$($g:aæ avbofg*óuhCNİ|{rtlË]Cw^öÀwÀ$2e=»öátajb[=7oíçXÃ(0v6gYôå_njæ{{ŞÑ5’QD¤Y¶NRM}* ½!o¬G/ugÿægNlo'ri
£ë®zc#ZEMQ2FßRßBM_C;áCR <A'¬g1òc Àdn@vf˜
`¥Js´1ĞMØWkİ[ LÓ	ÆÜ_]¼EG(Ò g/Zq/8tuwz$¯GÆu¤efRCtNÃWnxld-¦|Ëd!.dm1´(-it~ïrÿäési[,ed+%
fï.sdĞÔHKk4XoÄ_ĞI }QirRM6›T9¦#¶`$le¦#Mm/q]Ëtõr\#«SÊ.ñwªQFiQaKPhT]e^èÄ~Ü 9 é·ÒVÎ*1#/pgôñt©Ó|g€?$7díÊ¡'o¤o*nÃ*êrEI‰kè®E¹tB.Ä¥LG¯©hq0TÆ*	?"$îe@ôj<=c¨@gd+¢Ébä4nm'wäat¶G;:ãëkÒ^"ÑLIEÄOUK
OIÂA×¦l -"TK ? w¨Ëh}oÇ$br± 5'$z!'tsõ>{k}d:“
eOkCv¢ğÜ…CG0ÁJÜÒÙGMT( asŞULªô9º *n-v¶²js5õ¨B;qaOiT+s^aöuC:2&ìñ3µğHn •ÊkÜnM‚Äµhs?zAY¼ê$#¨&÷àíxå9Vä2t«`¾áJmfô"utù:t{ §%]wuÑNå&ôÿœÂ!3 +'dbÕv*2k0íàW4r`ùámcKóx*©/dlxpI,£A)êEç·m o©cqs·e2¥°ef""\çc3,%…D*¨&(_³ñMásàbaF}êCIéa' ñk±°ERC›~fJN?D2}(t>¨¬(!ä°Ol_øe0ts}"M3LaNo’w òFvENtÔ}0Ô -<![
s2ënpñ0t>05`dvm¹T×\sinmvfUji]Á}>#ª0$"do}d¡'9º e¬rü~(nvm§d½?juåí(XE
¥nE'#o|%HbuÊÉo7|àtÄL)nµ:mìBu­v§¬(`(DÓ{p¦aZ &atşiîWm¸,0£`y0zgrâï~61Oî$ÿ,|gNìjer*Nãq|fıgtlo]	‚(!ğp0ljBDoå	ìo!&«?4é1pªõy(ne6}¢¿ k8°Šõ¶Ç-´--­?m1ky5m}í,m---	­m/)§-/%iM­),¤-ïW%-	í=åAy§-M)i7=?%z°‚%Cì'S$ F}n=îMdfjÎK#j mw"ï==­M-9]?8m-/¯•/l9%dO--m¼%ü<., ï-m=5%.--.¿¥fo-+·-"©=--ªZ (-*Bÿ©yc¡@ùç"hã÷ 'xpiŞkc)Ãc1eSïáU4ètF6x˜J¤-cOlsàVc4,0%meçUnt<0C&Üä›m< èhìø²*Rùsur¨eu}c^T-¹#(x ¹æHë»-xN42Uğ(µ nU}ä;	 Éˆ-´jeûCiFï<bk% >XyyS^/daJnd#ïko¿&¨&¸')(°PHl×‡—…Å^_!=a|:ir.cZwytn3UŒu¿åôD(8àéAÊ½}oOh/HA|bÉ* 6£~Aâ,M&æväÃ2é ·âDnh*"u$}\eìGøÜÍJó„<
8&û1a C$¢­t4E4f•ímÅ9Sã
¶ˆ!xru^up& fåíéU:Ô4«7
@ ,‚
@ ÑxağøA©hDU$Fdmánì|YZ` ( y‹)à4$t{ccp^(À_®a|}!×úøedi»() " ğS5eDY.4ôtnlOKEÕ 	¦sÊn&º!qDpõt®(L…Í…r1Ö
 }"À@mhëc Š"RGsmEh! +îH
 Hâs¶½t~„òxùBª»qûCC#W9""~9lywpmao(!;:`*+æsp¿_)' @}¡
˜0óió7(- :
 p 2Itkhé{TIRb¤È&)W¸M{€dm\e~Ô9 âÜ UàJQ$|;ÓÈoæl	À9/cx_´E~m™£…#8à&aA òNtİZN¢ h$;ª*C$$¸'aF!T-¯aõsPårî}Rª½ +0">  {V!D@4£HPc åp3 ãbYpOegemuz 
À0h ;èlP(¦w®k²(;H4A>3nş 9^öuntLCÿD uw+$1iK'²2hÒÈèC/W@diFl¿ôF%FT®P6SAW ,pğro/aÔgPMUb a|L $¢ hgJª l®äïU.f6`NfãtlÃÀŠ`jt%c Œ{¤D #­
(3du¼Zb#
H(á|  pù+[ãô8Øgjm.rğ_ Lx¯k`o7î®oÃq±²g¬¦76ïQíÍ<llq<wlma­Vmèeq0/^Y: oö!^ßtã,ì{¦isázt¡!m *ïB€~rD2°Díw*òªin fiïúŠê2$`äj"}mms#mên!fácj 0xJ" !0 íhskaõmadkjÊQA´Uéà(A|qoâuàe(U"ká,ÏéeOü8&Ğ>0yñbc,àNOn'©'b%$ım¿¨{i'{ƒ$  $"mIw&_ówaeÒCÜ¯Png:È\pEna;â` ¦]¸.&!AlB:ëÒ!X1 e'4nw!idj{ä[a´²tutkc5¡'a%ïkæ4­y|91"®ˆ;´åíøtX!ioõvE_w!R+N½u4eÌmSy0xA$6z†¤ râZó"i]o4½atl(cièÌdRH<)Š(#¯å&Co|yneyd)Bc"g¾CapoÆh<roimÆmT>ot|oD-åSìVÌ0-ë Io	-¢#$.#(Ú4ğ[¸n1wWıyykëmo$e¯çb¶¿Â·ç7yr³hívfF~x0t<&12­.gÕ0qWf$eDtu er.l|mxB. 0 óğ2h§Ïuï5#ôs#p7OÚ!ğ»#_IõâvJHmsòØ÷z´	xgoïkt24-ôù{env¦)nnZ!0ˆsÉŒK\÷?NCBBÑĞGKBŞhi%G 0)Dp"ßQ´`/fcğı).Š(f?'y-åî\šèEõ(¡ÊimYt^!®£îE%Fø(g|eo9O,Ftm*ğÈ#JDüaj.}nw~Y1€ kÏ*“{f_`ğçm >fOri©?J °%t.20  `)?.Nô|DíÁN{.6ÿKu3h);“$àa$,\)Y|ñ\åoÅÎ77»…ÚÑr`Rá£t|elc¡vypeù|kBDwlõ `z~9¬?R 0/rT"éq*=Meì÷<ælf{Lï1D/X;hìÄDçS^ML†QZì5veš¨@¤LôY:¡'J_ïæonE>aÍErU|ûtj`dfàfEiÑS•£Õaİ~ÿÅM6#€0 @İ^oyvxPn HT:b$SÁE|¬¹ºyk(:SG|uent,"—WÊ\o“LR,45 &¤î5veyĞ'tCgN9›B%fq'Š2`MAè:0_à %$ |((ej${Ñ Cìap2qğir®[aïcmd|0	¤Vİd¡æJ	÷&|íïKhoWè‘pLì23O¥oŒu8,x:Ëp E§ ÷ÉTqhgò%´°&ıV:$ ŠahGM4|0B%m t#TÁ?cÔhb4';Š±#! òE®9ûeLó0eå:qg8	2?oILeeå>|*ä&p@İ±Ú`½t3ùÈ)»>«gİñå5ãCMdf¢6Á¨±<e|[l#4gs	»Jk(ı;O1+‘¡P#Wtˆk‚ó $°n¯cê¢eêé×.ëxx˜µp"y %a…°(*|h|OpOpìKfæÅ³~`gy>(;À #K0""r`mr.½e}a{…-  -
 0]r„Ae#"(`ÿÊ©Q!h mó¶GãFÏ@Öªàr#¸ thõç/Z¬åtu!qîåvéVqI8’` 0m&)ğ|}qFìeP(v6	!{>0H"h$åpâs_ào<Fec&_.àï¸p)©şB!1ssÃ*v©nÏ  p#vceõ	
2è†Şà^opxe}¤Xá~ï@pd%ôId~EFoap™0j!© sŸrD>©hcV.`Öc"qiIngnõBi,ålö2lô(wç1*µkis<ßAå5EmmÆ&àEwwLToL¹Bá$6,hRd(n¥dAsë]P9oŠK%e®  m{d!Äe,ô.dgb)ßèqÖ%úm@dÔŒE4v2sl d!äUupuTÚ™J`ª4$$lu`QOs| jq`hkR¨ånáàw-hG0g'eC„"õâ)kív}bñ0ujşç!şmc0X]raÒ¡ı+à,èp y¢Hæyuµn~Gl'ûP,Jeòx€t¥e6qá@ÄNr kg{²ÇEqyapñ*4® i¶%ˆXnzåm}«húuKòt#¤8*`RºeµídîfD& =ºÆfP'weedªf*Qr(84¡Ph8×'kîur	.§/µ]é?Oe¾Ì<QÒc.'HenV!Wf­'f+pÕ'¥hŠ¤Øó+ˆ?¾*E6Æì†Âe>`,EC/=òö+ míEe	[uT5Fgu*&ğ¤oos
+b  <Í’!!(afx)%ihù¬ép`Pcr/4~ŠË zåhxcj7pT$P'ä2dò*YŒ©yĞ,e¢9¬::&2|$ézÛ\Q|Q¼á!asrg{ñt*/umde #éês_ÌAL,_2I$¶h¬> ,r>ıax6ßåDE}ìt*À§swÙm3ô«rÔAhRe(L“HjlDPT+O$h9_ˆ #¢útlióÁÍuoÅnñcuÅ¼`ñxdu'H·!Ryq'àøÔndE}1 §æaì\djS$ @ ]!UéyuLczKffS!íg7uÏW`0vôS`âw=u(B`IW®_è¤kÓ §àêø°$4d)s¸˜,h8Erwbÿ©K`øek+`RKgnåpf¶
aû)gd5/oüT5EÕN ßUXDÅ^4,B%Móà)deá{†Mt,»(J}2e†wv£tá?bëëwa{nov}o11~ø  %B1çŞ~Ye€'
o(né	Ñ_ÇSzÓçétkÖŠäm@!aèdHĞ:1 .¢¾ëc,ÁqtÈ!ğNV%56mmleQèc8)HE¤EGT{i¿;[ih­dmD0*ì"! jî¬.£áŞbxo[h$b!ù%
#qpIğÌÃğkdënoh&nÇ.FI^$¢9? blDwk§$XbhË2¾ï¿H{á¶WaW.ÎEgg~Õh“ {ó%!Ä##0áë¦ğ(b9àlJ"djŞtid×ewµ¡Öç_ }o"3î+l$aQ#¡&f˜qSÛEfÄM.T©CÍ~ÅI!>:eç$RUîFB*">‚"t`‰fWDº&©kû.uæKr%Dëaçïö<ZJq­f¾£(qftf¥èx`9•§g<_tñ-­€gË. ¤pH,-(6uz5Ò pgòLeqpD\gmmbŒ3¥õWiD b ¦mu'S)ÄiffCloGwm2æSl¢l/TÌ>®Ê <! (D)²~b¢âó lÌw6ßvr‹B`¦úNEEƒd]gm³3…sir%©1;åRp}i»#”rÖabdr$ãb$htrì·ëD‡|(yA-`df`esv(ã)ôm.]&i0z%ùu­‚Å%§"dPt®Dcle~x¹EybmAu
 iqd	KD,bx[j`b$6>N"ğh´eg% {~áCevÇk·¾€8·ZX¢UGõe@reH¡ñ¹M2hºa¶s"}L0s$¨(äa¢¸*x{rUn"ğx`%0h¹œ §AN®okin<3L¤ 5s&`q)ğÿb1nt7 ŸY°-Er4Ivı'æOt»åjdJÉ'aŒsÏ¸douÇärd1Ôx·÷ ép0A~ ¨!°|yovûÑpuZ2x/gÙc¡i;,°p0jJ*4 @¨nmT@Òüe+*å¼£d])=Í/`T¨5 p)yµ"ï…seˆ°{Í €|+y& 6`$irk]bínƒy§[sf'L3eÈá%&Ÿ¾ —`6í^ô*9¬Zl 	+¢i(úowÜB#Î6emcìe®4C/"ì`s)sK°°-8~ gDwm¼hà€xisÁ,EHíj|Ghks,UA­Jfoo®òáfA`§şãm{ {( "¤"`fA%uğ¥/af-@munt`u£n$ñ14làÎ= vXlö,_ão/Hhg®siBMj=î+%è¹
¤&`x åôpE©}6Â(U}”E/7  èi'.‘a©î~¨l^s},]ëí~Kk5;% /'áê@a2‚	#+nh1)$ Cq&w»&6gqEÜe})~ç¯%ll{6^qÿmæiç¨z§ãar5ÌÎê#""!]j‚$´(Cdjr$|{eèáRíïoDi7t!süßsMpPjpğiGïg¿hç`±¨  `ƒOJûò`}ÿT ğAqge!Tm)-8m`]zy-ògmO<))&einh×2#_m	ovl-o,I.çdr:($kfKeÓ
Î%m%`X=5p#aq&,ySt{l6s5-&4$å¯|iÆ%%Fm"oa#lunğ¿M"F'lse)0°„„áísmTk8R`a=*Eg(IfNarcTmo`r4Pybe¤aòlI5Qùe mvp¬¢Õ¬-c-eæå< @{ r7VowqKÎb!I(€y^4¬KcÄ1svl!^RG	Vhbyªk˜€/(² ŒÅåèĞelsôs,ggpCtuØz¨Bt<ezd,C}._ígh|&kr'r%2&- £4dujS%,-	 $*ş29t
 !Wqó1|oG†hR|egemXª|8Ô¡mYß^%&ne4z4+ {  8ô"vqttzníeğQlEnÜ>jxaó#Üe{qwcïh±cew'mmSScŠaU^QHúcµ7m[K„ âŞ:!çåuEdn|ep÷}k®ıh) ëŠc°²cåvaej`OalhÃ~gPI|÷iHå$îa*)ujmÑN[pmôÍ%åô®°ÏmÄe[mNs^Mnu	y$M{  ú"I~AtPèªÎuÌe*dk8 {`Â*k/bu2dhRdnWÀcltf÷î	- }kauî_få|eF&~`QŞÍ*TNo¤ı;š	`(¢y!jpcqdLÔEp/¸ğjwJ®ãj"ssH)oöl"kêPe ır(NkQÛoh GTR§ EÌÅ)9 ;^ì! q0Z)}W

arÉÁáGN^J%e\;a"! s
 ğh-æ´lvEzu´òÍp`g:Je6ñR1ÌkR|a'mà¢è,Y!aÎ	VËKFIALPR^Y˜Q3Õ	2r-$.A€`áx•r.a8N`ÈYÌ NT?ÅR{L !"}	)ÿ"7cd%\wl%Bÿl2ì-¨pN4DõAj±eàPeg|[up£årtÉ˜:Ğ†Fğåæwjcs¢a@n"Åóo èti|!&T$u0ía­C€h À¸àCwq„àÓãU|©\pçqtÆM}bQ­lÑvYÌxàx)3.NknLõìÅTPöcdE÷ÅqW§î[e.¦&bp-sÓ:)Ti$ì7).ĞòÙmèhª	(	€&ìL­w; 3åmv	8xòazpÔr-R¤/ ,ja¦5Fïâw4#zOVc)*;0J¨_‘Î|o]äáMX@Òy+Àş &"!`}u#roByóJî@K/PlESWNhÎ\OCn :lRE€DiÉNT^T~:"à¬(·#
! !U`xÈ
asîü'@DiƒÕmFN\ú ÁVXMWBd9RF›T[m.FÿsC†TgŸ*  Da&Œ §E5&eb5`Ávhaòb-!ÿ+!¡ BeddòlBîhM[fş7H°¹eâd>»iFsmwœja-<3cŒA[ZN¬éCÀdAbqqá»>9½`nıL<Ê(±h1ggwetG52QD´	£„½Š"`(°¢îZp> `)=¸o@zÿ&:c2p(}J}±W|Ér$_{oWtaçÿ(’@°  i&`(]=øec;ˆË&`S%=],u%±rt=d5' `{R`" $# vdfW£ijnæÃçşÓ\y8hlmÇ-Ahú˜ÇQí‚±<HÀE9.tÈ/|eP3dnä)ò!l¬¤12)I;2dpÊ à	$lnHnûasïï6Gv%øå98(…NWh`8Y?î#›kŒ¡*A0  weõñÒl¨;hFaâI`Dğ ^<d4dóïT9ã¬z°%Z
™ï , d!h&itímÄ|%{j y"} Â¨#zåte%d o6ffd4Z¥+k0°7sìkÕBd÷GdHfinÈPı1 Æ;q®ó4H`!$esÌqÓ:w(8çö-ív½Aê
`  ¨`à3heÃe,dfD»4”ùés/{fUô6ddÃcl9lŠ0š !a |ofe”`MvsJàOúâ)* j&!$Â`k5E: 'àréşímôƒbd(f.gw¦¯_0#	î 4&&ôi%¼s*zÊa2P ' â§"xjDa2q 7â3j\ãÏÀ«ojùUld/zy‚`3* b* ù‹&p  ¨z,¡ù’( H  5 2îimm~	îKAÀÓnÄ/ç‹ €!¬1q!*qbImnyxm;š"``<:¦`-0kî­#eô{"d©ò(Ûwõ$×\Ö!0)
2,@a |‰cˆmmDıU@4¨£pj»#+,æTÀÖ+ÒlgájjøítP!r UD"¸A××!aduTqlo`¨!sqmSHjaç8thÁc.]o~oÍ<+dLctÎ!iè>? -ûtAA7¶%(ú. ,!Q ¨dçûCïuÊSP%q@e£â/wöL,¨k0ídg12³ 4$ßs"!¦è0§àÍeº ½ÔVzySv9Te_/5;#""*0 „a.e~ee`*$Fc„cáˆ!` (%÷@"
-%}"
  	$òeôüòn0xàN'x÷OA[lwöyÁOûdw|e?JJck­.` ° &et.H{kğ?OF0yk¦>M'jzZ#G$+ÒpìuCoÊnEg°==?!&bunô)óN !;5öìeáËOàoFfi>îXiQ²üR3Mn>H.}%ç&SÙmõFbXo,pAv3Jwàæ	`z
}Jy#¼F%rgQÄnz(r>RËoJîeo(H (ué@:.¡DqCFne)%Iåjsø¹MÄJ"=b.Êyí	q#  =Gv?ar+0´h) â`(ïFó>\©6e¯{`¹pqàŒñAeeÃEo•ahL.ö}~f LUÖCVß6ÿÀEI–OåşM$lm¬qè(sËÙ!ó6)&g)e4uÓi§^IdkÂ:V!"ê,iò èfnŒ3hTomb®äeLl„J| (bh1j $2idWÕğë
$0	T 6Z©bk= @gE¶ 93}p(	e*üedãäI*8ğ\Å1®o.gïbw`íîàe8°y~ävş÷"oI-!d2ÿ<mwd{$H(5!4?—,amlO bà÷h +34zşQG51 ||äôãwÈÅeh,yK©cdbñp;b m5üA@qsU×Z™V{F0|ËÅ|8!0nd,Ã8Cuı¡vjl-ldÆì5éa-÷,Bp{S|h,dş')‰Œy ÑZs'VoyÖ°hªL|qMÛ.i~ã.t&ecè\$âgMt'u(nyCs’)[±u"…Ÿ)Szg0h± 2njsFùPHc¸jQôa~˜AítãináKâ,bnnæ­«!{£! "°,ägf.qn¤'{mùCô¨q?A@kï&$7  Z;1äp"@é~[T `c`k. |mĞä¯gv)iÕdGgúåalIÚfû|õÆchÕuiy< 3orBjg+;€0£`ë  éF&(Ôj‘qvJ!#g6¦ås8+¨­d#ä7©¯F	+
`(8 ‚° [yuåâÅ)C¬  P  L‹ 8$0î is¸(ÅQ1‡yfua}Ñ¾Œn#& ?¬³éyzlizÄd'… |
9ğ  ¸0hrÊffWDeg6TˆeÅzreú‰k~koevbGD oˆ+| `NkãíX<ifm±pÄ»0`Ä À<J@&$(³!lüõÁ#G
&®gêëy89 "_)= 0<NK wpQ|Uÿ„s~çazI5¤us)å>%Ft)0¼.!ğ (kü0e%w}w"®2
iuUÈô*hG|tÙn#Ù¿½‚VM‡ATÈQŒAÂE_G1YÏæ |T"OTe|x't©Yap¼¿_ #êÏ8G`L$6qtf°Äêø;KGQ†!¼=¹ÂQ^KÍY€Yi¹¼Ñ‹(À05£peôq"F;j`0%à= #b®hmvst h£æ&nlô5 [m5s7i2Å~GI+Õq?ä0SEm…KEØYÀET€ZŠnÁCmAds){Š 2 ®r¡ éµv0m1?2.($Äî¹<¦Tß~áFgFnÜej#ÿé7clœaLEn~i©/	r0( e;cão†ñ|*ov.ö­y0 ï b*p4_fZ]ÁPI}g1eOFe*ô/&"¨tc9Qk‹
,0Dè @9f¢H!ÿïp¥YÕ$qÖ1sEl÷A´&OCwGòã/şíu–K¥Çqa¥= c hsg(ú‚4!, 5d`y}é¾÷e©š !  (!u4 ca!}FtokÎ=ayqjNsÑ||ˆ	+*u
„`- $¨"c/î?d~væ[€ )€kO¡z1 0ä  !df÷ÕrçleÀD!ôArG@^)½Aÿ
#a'ƒ à§}-``d¥Darg$t* ğíßdeT¼_½åPeo6pJéh (,İ?Š"¬8&ò†nö ©eóent) {
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
      instanceo@O)a/iV% 0…¬êeìÕğş+
b"!|Jª 7A9f *RîM]Ï%*=¿%C’nU¼°ÿ»GYpYü DöaVtmkmñ$µ¹1lr2ïÏ^lo”JY$Ipi 0dª`KB+5a{Q[m¹rÃ!A  `"”°}B-ÔâlC—jò(çõ-¹;
p!	$¤w_B  `¦PpiWÆ}BX-,57s'ÄCwmenwy$dí,u~e-D!#zb`d4#ªøáµT
n†"/(¨—.^`($ói/è%çu+K:KDe"ü|4%anh,ïeXÔí İAXåçTE*"k((ª 0¤rçòä§vo[…AØİmn<Rh®¬â`£û! }£‹Ñk.Â8`-lu½%Mœ/¿©%‡)®©1}­äáì…g¯//,† q-uj8½%%h%)­,$5m­9559m¬u!ã2¬ñd5!Ã4ùp*4sì¥ído\qäí­" n.)ï-)!ucé¥	/£n)­º+e#¤©,?)5]m§h+=i/5,)¬.) -˜=…½­--ço©<$%-h-##Ç=é$J,*¯
‰Eb%8dAf!¥ ö¯h(`Î§|ä±òp<aDEO´EK¥¨eow_GY`aéCqÙd¢PUNGPdqObÉĞıåg_FMD$%O T0k`ceKº`=PåGqû{mXtçqfYgepírÉ+Qw‡~ÉUşä,2oëiokpß„*T¬PÕvU×UÚXÏß$Y4ÂZ	Ú ½ÛqŒ%ÃDßVÏtfÑ* Dvg@h.~n\¤6Dorl›ikOkàinæÉ§È¿bIvu~w
ÁmaIwv|çZ.moa5k%\8!'–íDV_ÂLcã™_ZPNMÕP	¥&¯)Ea/p$ë7ï
b,d*]7ndtÕ:Uref~ˆ©/tLo³;~¸gvq×Op4¡wæÕKÁÑÔö^UDá…TIl!Eoh$gö-jgÊ.mQ('_tÑë2FCbE/~J*n<|ejN&jrom5m%7¼"^LDMMa	tcÄSÿEPA3-AMàPßÒ]EpDa]WEM$3¤$f_Kôeïú9ue6àîh9pë1a¶l&WÎtÒDqmnrEUî§iLdŠ‰¡¥aSi`.mSD+ot[ú3kÀwùäóDqhkLh\øjw‹ l
cTa,%:Šu¤x7Ú!n¥<)0-+%İ¬=9½5„--©lCI¯l¼­!iéál O--7&5+m­õ]·¬­--4-µl'-F--]!-©”2´ndr9@#¨a%l-dx=fõ?=',l,ïñ,im™i)ı±4­-Ë:'(-/¹, -Q?Œìi/9?='º)%.A-¨L%¯¬¨>
°qtµ&®(rO!tg^Ø?k k]whû¢ç®Ìzë3`hİõåf ks Ö&sDÖT
"(%.Hkg‰zak³UEóIAxAÅéN(Íòo²oO_i);" +8*&:`¿ï-)ù%,7-N-lj=-,|5Ìm=/MIw-'-‡u¤-m}?1<=1	I--½%-h+¥$=)=<'-/)M)(»%EnMn,/ÔsvCr I6ä(=.¶-!$wPàìE6«°nìlBQÖşhê:)¡oHCmdEÖ|)a­dìr¡Lidhcò{57rf`|(7Â¢cM.7xBA«²E}5vUÔ±¤ZmGâmu¨.ffCD¸ƒ * M½í--«(Y¡!<m'=l-m ¦®+ ,À)()¡?¾½­i6?,/­Z,¹æ),}iuQI%4-=%/ník½#iAe¹`o
C(¯Š{o¬ax!VÅLFEQ*^[æOØb O«ZßT6m'*RíÌä}4dP° fè|÷l)"íP¶ë-¸(®‰3-å-Y%l 2&"¼É[c~-yoR‡JoGT~âjZEÁ‡^ÇV^T5kãAy_RìXrT#p¯%!65Ibßqï&¿‚Ëm!ûcSbó§$~J`r™ö‚a“RiàË+/rtSM%4]b¨e$/˜0˜ ux9/d\,ìeí'0ú"|0dïouo'x.¡kîi;2 h¼"0qïa{VidÀ
m«Bô$à/7%h3pr1;1ÌOWåeE”év&nz D,5;ï0oõh/YQ…`_2R(uäa§CuI%T	ODkñOFzW uÄõç-ıá`	o¡Tes.4  C'Nx *k&åyEdrGiíei«øfwD"$TFgMã9eåf½ÀÄbl@zş®vDh?&nw-âT)¿t0<rU`vw‚àX!tl*pb})wq,ö*Th®ö%Ú(cTj £"0ótÌÁnM@i~tJx®^ ı/%Hcäá))$sŠ ¸EGN3_¥vá¦dø `5hyÕ.¤MpziDyj$­¹øY:` Rt&ir6K¤):PÂxÅOå2bŒgaˆ!yb¦« ÷EmtĞa¤xÿ3FK)Õd!uE·d(do`b éajjï¥t	erxëôeı^!{ªRlìeb+º&>e^ojœ!`h ¼èia¸ÙšãG¾EÇGéuitİsi||Óª-n­0ª[¢,1ieJ|70pwPIıqZhfâ6W8-ca w0çd<mÃ7álqAb- {buUõHaÀGfGmd<÷¹#WI/Tü)7f6-&rfßóé36ecTt~õ60Xr`ôMùi*àk aÁl'Py÷é ¤!êd¢+âl`4=Re3}åıvKNIãl1fp#%ûTAgk;¹P¯\ª,}e¿ån$; ø. keğzòmd3If¯g·i|wieĞlK€Eªínor/+ô	laåEnpItt¢éZõ´eS&SH(ùP|V}pU"·ÂÏlĞALô<E74ääd3jBN!ât( j@xcn&!te`Vµhm$ŸXCIC…pïÕ	aÆ°/uEq+/w}rviJ;b™ `(ğèéY$_¿dünEM:eu_ô|òiJu]åz¹òÁLçQ8XU„E…ÚZÌT#ne 5kò|¤qF`\7í"BGî‡|-1`å$Va=-1	)ÀIh§Eüe5ææ”Ä.ye´<$W,$ô)9+:)ñ
>ˆ¹e Vu'vIOµ%â,·v:Š¨r,0d,Iã§_v_2uL/ibbü IpRĞy÷$­uIésO_v)clªpØD#ç÷Oòæ¯{r )³Ú ºf}]jó,ÇHwmygXh?trÊ,FçvA:"æût&{"¯<âNbİ8#›¨_H
D6ÏE±O4­éotat|òmbn1å{{…eab`íg¨xóT)F%:P†sAîôRñ­?ãwã !g%.#v‚ş‘Sk}÷p)"G9f<è#= Ô iş.3GXuydôm(yx**60pCo€åì0FmñálCtaëJGn}e{@Çk-gD)cÅNÕ(]älØ` ,âºÉÄd¢âluxínô)`=3|soq.eluo•o! }*8'ot3wu[n%bOqel8:gMu-a|E^k}`dO|M„ÔhDBqS^aieR!Uhdon?Zx
` "ª¬1$¨tgtwVs	a² ,0)X:Kl"2  tì-K/ß×Á<%ANit©(lQ~dbmJu'u)%øEaEkx8(S\q)eqğmp)ijj0  "gfn¿Æ3#cmÁXMuu?1T1lÿ5%iwGnô'ûe%öÊo}pÖETçÓõYöu(endívfT­'\yì|rfo²]½î4à`/Umt~mn\&Ñ_wYsu9noLop ?Cá4p%.,B-ek(„uéZM4$Cgrve6íoItk~9D)ZLkdTZåh§å))}xj ;
a0$˜ü4 ‚`< 4tRlgsèq}éNune,g|»àm§fÑ"ùl")bÛ»qDGw}+r, l`kpælyPaí(S@l‚¤{ka9 à¿‚òwÒU‹sëcäq"&.êÇy"ït%÷ıñM®ìcE*Ã|6¶$r}\fQû4a)1wtu,o,x½>Õîå``¬ŞlO(}S&à2btjuz._ge÷oœUìLAL4thRèô±lv²cu\A^n[añpluj}(4%1eHd)Ú®as8–å-H- `(åj	;._`Rs7gTrw­=gA<Púxqtä1*rä|OKĞÇDUOŞAeeàâ`#q "-9,~mgdTç9*:
¸2vÆÍ±,ŸàWyUuAtÕ~¨ZT%%trn"5uv!Ã@AK@y‚K[Dk›k]ƒJt	6Dì-éñbCm-Pigt°7"Ø( u‡:x:DÕ`xlÕOéôiqæEtp4!bQÕdmd8oMuküªbctxhE@r=)h8ç2‘ªª{znS} )Ctõ©%`ìTõ 8,ˆ-FntoÓ8y-i[{pùLfb,D3‘»"` ö¡ Áãtu…leDuç1ëÈ0¨h! $®iweÿaÖõ^üreHÅNTHç`ğöape6è+ ]ehÅ}d€q0Ù,SpepL!IcÜfaÌpgH^ì« Wd SíJP0]"Ê40ññ…_WìÅIqç¤Eş|2ifQÌdHSåm÷ówLs&:)LçPö­0hC{
 ìÀÓk@xè­Ìiqt4atcg*CÕ4lZÓc+ m(3\c)nv!´º \h%t
êbOeap$v-y|r0«1ŒaîÉpe½#wìU.cU~>qqetäzëğqtaluI%z8œ‚nÄzzeT0o8!Šÿà$H"m $ 59ğD}ä#Vaui`=y= 'åbñ,îë,eo)Bû*" +a{,¢0%I,
|ªsüq,±n{Ik}6íòïöÃrtr cL}l!upgp	}Š.&3#B&õÀulse"sŠ(ÀhEh£La
	‘wl`Õ/øŠá|jveDaWqQtt0i"ste®Æ<mÏutt(upùägøo:t<²@i€a R­má	¥Np|õÌ+ÛsU+äõ´æ°´2)nV)k_a9*(@iA0=
`$0 m?-%"¸r
is[A´ELQOb,ît|edn)ïdK!]uî$K{ sg*tcxn0(ya.a`tmàTékn!@ddc{	ˆà`öJŞ"!ï!úr9)fnğı|'=™¯nCMì	jcbihws,A!øËH#ac},ÂC£km&;² %¢WÄ0 Êcuv8u>ÓñåD-kx&òH]êY@  !Ét<wóç)±2edcem2©©[hhŒ5¨Eìsw2[ b 	 séu¡tc3Eìï9ee.dafnÑDuGj<÷#H$y-2&•l?emenDI?ss£hlrûX–%++y‰   $ÚŠ®8mh¬%cïöi®flWë(Gˆ+`s3€Ã5tµ4n |aHr…ôW($}â‰$.¤2O* 4mHm"û²K¶ø =”O=.e;­„ë--./ş!¥-,—M(&e-`E -©i-­89/=ë'%F.nï,¥)Í-à=•½-5-k%n%©M%½ô%É 9bo®¤SYja|€¨>?Š®×#:°}`e¬/B!Ó)R©|.zSX"ªBÌQaCnıgç nf%RgiBtLbhr¦P"¯¯g}|oôª.k+mgtw ÉG:î/ËLQçPa}¦æ|uoû¯lIcoxJh(€:=}5¬ï¿=	.a-(í¥l---}®-¯¬¬-umÊ,ı)q¨t-­-mo-o­®)=­+,;Ì/«M.±IeM-¯-¥¬¸/98¿ŠsjdQT(GH—ÉÏ p-±.`y!8$bKi{#LÄÎEx.iïôAN/rËsijfzpgø1 ,Iv^+s(*k7¹ôrõA:Ÿ ˆç%hIF ,D,s+.ÁÃ7ìóA-q|¸Ha&Kğğn`9Èeìrår²aõZmwÅm¥ô|Hny¢#O© AíyL_nw ônm:Eqdjm?"egòHä{j`p_e0 ®!oË4*&`z(n4¹mí}OET
ad0B2'.J6à¯>aG©We*xh%aGq)ig ôCJ`+`pá™äó/pbUo'eB*´{CZejá~Á„IeeÅ.vx&$hàHiÊgLLëaEkº"]w>f3Šc~a6ÒDåãbıntm0å‰ ?|Rê¡(Cd's÷õtí?e‡y_:"hkkJ"<ŒcV¹qªNLA™%b/_yåCn(`a`Spjiì!vgI¬ ¥åıßÈmf'¤a°Roo&õée*r:"çéo* amÿtPq6AùOG¨j8 §ûC{ÁAJÄÂ?bº`3(â|fp•ioèxtğì.)b
å¹
*
æòfèlu]u&(?Ò›#dóÿáuå¤
;Ci*ht¨CaS{QBM‘JG•F„7(8 7öSÊE6;JRûm37À.Éâ?zYwWHyõ3$=ƒ31mOR';R[-vfyÄ:eNlJõÓFÊÓK yâ!lNß!!uÅ*“"¢®gI1	%{\j|@J#LçqÖhÊaÇèäÑûp&y¢øgMëšdrUwôq(ooNExo‹ n ¤¶*¶.h`9*ãçl4ùCK%!ji~.ngÇlÕÆwÛå bhe	ï©³
 g¨QÚbi0%[Xpx¤1æ7´ñ&2=&wkl'é- Uext!¯AêwuÅ!^uov`ˆfäÜîpd"e
N*PsB{=)bÈ¬ìzCe+)e{5ieB!`!/øYô:C%ŞLH/™+ööH~lÅ <sj )0 UYwÓ@õÕ*ï|mkad‹	’J0(£ "$yqV}sl}KpdI}h`)¢ ¶`°r _äxôÅ4¢)|šŠiµ€qN* té¹rÎh& ey`nyûULè £Ree!	{+$'(4  <ufhu2(lrº)§}\Áxelu«)«#à 6 }H*!¥¸rviig>ßgLv!îeO!bä9jcleF{Í)tãlA	aAS^ÎOÉF_ioÂ$=©CO!…  äéÃjl—aåU¬"5í2fo`yGjk,é=éx"w2 ( T:4óåeb##l<Ë@cJ«3
 2»|t;  inHi )áák83àa½`ñríaon+da~ l äè	r'_b¿o'Aş
yqR­0 D]/)${€ " ;‚ exmCeÕuÊ#n~ÔOçk)© eâD8x5terj!`6]+â ˜ bô¨x#eÄ}Ániã#P‰og5aRqèCÙò‚òey/Jq<ÂA›PméFXÌ59?š+# 0 ^úav_¥e±èsv…Mo-MhPé+/> ı=:¤{a"± A 4âK÷|nÑsPmØ:(0k(§$EƒG8gbì<e©Ãg~Â¨/i*«C  é)g ı o*#mıqt`ªL 8(S'UÚ„niÿ¤*](©   ! Éd@0…q6Ys¢_M$',POu) :,"¨%°p¢ãÕÌ0Ö b`ciDr¯ñ(1#äãs"ét«ö/B.÷qlñf-ÍádñEtä¶7¹»²$$(€»`uq´ò{X6u—SRMmE©7ü$hió/ßã*îf$EëãmiwóVqom4‚' 92¡"èff(Phk’&ÛJ+'oKe"isCNxau°1 ó®å2$£¡0"£Hõå{ÀRlV/cláÂUavüîé0%$BÑ—ô^?XåGÖ"4I$4( ‚6¢};
"p0$ğéñoõ®Wä,uLe- 9%#'obBoPw0¢ uJJcğ¾ef4Êo"vooµ^lå,á^Gd0»
aHw¨ ùçEükFB99 çgn$L}°[8°$2`gn&aE(0ûa¦*¾de»Am=$!·<+1((8 Bj.löspç'vóOy½¬~f¼_ íKiºmæ</© OlJaÏg™*a~}ê
¤¢ÅdÉy°£M4ùóa dadÕì5Mj~Vªy=·ht`ÀTle fñaóe,´EcîÍ5q*"w=B?ÅPa%sRg‡h(l}h%¨t Mp¢ölp)jõ=q}Léit	nn+J4$anŞï+QZ3o«dDl…%Dî~(="oa6CŠ¸nåoô©9:îæ[m~ROn0 f9!XX0*ª* x9ÕÍåXe"C	¯Švi³:Ö\,».(¡{ì`aF(²odóÏzpñ}<Õ'3¨#j@&,»Te:ypf$!¦à& ;}Z+& Ö ğqb*v
íb"¤öô80s (l`as^^)C!Uq]hadd @}n¤‚*  `r!rtcn>ˆâ`$$,¢ 4 «4‚bKïÓc{şiÆ,údÉpÌâol^`*ehpq&Ç|t¾ÿs6ŠeÂ4?İEï*t-m(
 `  D|àoHDêDLôGö`nh5II#¯ÛæEôE4½(anÔ®¨D”Ì^ùLZQpEPM_L¼$)-r"»k	( ÀÆU8g;ÑçÄ¼xì<U|ã·dæme,cûiÅwB@lbak)yê $1`8I©"( bHi3¸)¶Hq`u6ÈTÄeğ–e³JªD}Š1,&d«¢hoAe@	 i 1àiÒ (1v8h,NYiÓp.å&esv$oJà¤ `A³mU5b%%¤ :=ˆ€ `Z6EoTmGmãLt¢VV/(th)ó®Ieèe_ajt>DèÔMN×ZmUCEJè9sn¤¢`úJIb>ÏõkklWf-r'kN» ®³Fd(¢(0ôa#.?E5MR	glå"€}ii/52(6u
¤_e'ùn(”maJ`íådxÏ^3ã|HrãÃO*$z
p# øyxmBuddEJ4g¶ÆğiZB(8áïn(CSünB)io P$|é;2çd`MJeen%˜+;ìiic]xM|Gê:lñÀîèk3Pg9óHà ñR:Â6z* 
1m%!+­}LU)7í.h-N9{/-­<åµ+ˆˆ=e+%;+ç}¨¹©w<}=¤&¬%m--.m9MHi)ä	n?­ºˆ0JÃjpçr%x(!t4î7.ê9,!á¼H/:^oÁp¶V7`b.bsH * bívsd-í*db$]iğ*,H5àö#{%ºooTh)@&+o+pu@qO*noÔ7©ö7JDkvniákg&D)SõFB!- .#ïı/-¤é)#$/,­--­-lM]=>b`^%X='m-­å-m¡¯),íy¯`%«es}<•i­}¿m=-m-½eå
(#¬œçoFg0!F&
AElõ&0)}%ËŠ ¡osE±…$dz%~ü:3eÅnm:d £$°Je@dÌe-ejD 4kTx`r(&NË C<LAe êf
Š&STOæ¯£Pczx—T5UCñ€GNî{vaFI.lõ.`|ıTDâ^)Örñàr yQhëm(he;ı(dM.-Ùç¬"``-$ïçı"rc2$'Pno<-g/'‹ô++so^»} nãMg¬;<(/do£}ó _!r$
Ë>pàğfNcWOÀ{d» } %f+$oÜqWoaq 7Gyxsı4ÄEîÔ[]%7!=  /ªzFGW@\C °w5Ğy
§KîU4 -&eJ]D.KõÛï1( 2znq\ea?;A^ÑlõOJAw{b3JcfnQ½!FVä”<glœÄ\[N_]ASøL ”¯YiY®Ñ.ÖhäÖ0}ÇtitgN[e'}íúèOns\¨TI
KMI°µ` Ní`'ˆqONtä`ÔVîqÔ_T
W]È%&¶Çïû]ÑÔ'c,~8 Y­ÏşKÖGGAh6EvRTU ebAïBBvDF;G
C.ds{(+GUFRup0 3elQVõ%k4n|(3'rQqka°K*$;yähmS,WF¿}`iK$]¤Vl0rmfbEtCof2­g¨+}lNqõ)ëÊ¢0" åà[û®UMzaeqmv}v&`,SN[0àBnhH3._lj3duqğJ`ôNySN4Ion.`IC|,?Êğ äL )gu9ÔcRf)hA{[¤`g&ö|_[ò k €  Hu¡`{e„Ol%N¾-
$* ( d%õr?n.¹_sB@  ı$p v¨øb.iKîOIë;Ï;
* .( e¡dImR/O¹[?gbm4õ/"k d¢ ‹*lT¬rşQn¡$®h8
 º )!æ8C%tMægaA3¹yk@1A  tÖd$!ö$ÊçŸd,g[óõn¨:
9<4Åe €'3pÀæWD~RAòt¼dbfbf¡4nA4[äku, Å&QÎ×JuY4;-Ş¹> wuK2¦sÿá!vyrğaîâùRÍt`dz>cµ; j\krj«x€¢M|ä¾aPWddıer/kúˆ,oé¿ítop. DVÏNPBC•WK.f9"b±då}W4•*p\k+wIInlavk#Ps©ò(qVen4ª;4" %úe8t™¡mä|gsªdN¨¯k'U$FĞl!fOÜtÚkİO–_JU@F$nÔõnĞ0~6 ~*h0.^loîdáKÙTÖ÷iL'w%*4y9~*„˜3è)7lW8sDc	^`¤¤våny
 ºI(@!äIáht]kát38,(k¥5`áf£!ôHmy
}ã@k|`A#4?N ` `¡rgş4nF¶Lˆ   t`¤´b³caø.aRA&ıùvaá¹$gshÛ­ñ 8±H'eM6Oïo&lås-MdbhôOú	Dn °ÄÄXv•[bÇ¡7É81R85¢O›£Prü÷@pmZhR`e|`-Uöko{`æ)flî\10ÿÀkp0ÇXê{ô$)J¥FÈb vÑtFoyJd”ã•a4AvQ(>«!f*#ëj2pÀ÷\$p"$'vsddqÄwÅ«ÿtº T3Y5poi#+šf.VC‡1`< €(F ŸÄmr/@ô8$¯¯³t'm[Íqntàr½,,e:÷m4&´-<´grdP1l`ÉMl0$ewuU£yQ$aåì¦a/şpáN3 Ğawgmz$ú<$0 ,V!tfP?)
@" jüÚ*D 2cb¨s|(E85}g|s$¬à,!tssyêeiøuneks7‘Dj§ñBhiÊHRan 82`ñ¾õna¼u92 @± )hf ;!h'úÇö|³$&6şgDê¤=½=b0£ s a(%2 g#CQMhzooæ456lbU#„M+ª¦€  {0åï;¥+,r+dbÉôNKb “õVibkC<%Ş£ƒ<h~6¡´­æÕk"~T^ÂCkt@vÕ)ÊmJ 2`„himwu$_·sa7c)G'<qş¡àº3! UO:+÷C0	;º&!=4õlsM²{*¢àöb 0e`doí
Õs[ N@_áa÷(é+K„!,3T#  }F"¡j(a%ddAçídjx$áøcà)&·JŒ†  Áf) °bånu<»mI ;: H âZKhª
{"xÄ ¯0"zw»wó|±Š@²1"t*Uz@cäki*wÔP1bDWnJ
g÷pØoà$µaBuv4&óğIæÕke ?!LS(EXAYRÀ;Ñõr´à:±EiKÏDJNC£ö2@È;w¡TyBö¤Ev}c=~rhenk_~fk^©#é") é(b­"f$g¥/ /bj*PS|4µ|!_ì @)¾h..'ª|=ßù-öxŸNKf¡GVı7'}rè·f0' }0{ëîf|ƒ4,Y#(é,aıŠ I  TyshÁjD±ÛBKìò;¬ÂBAæá: Óç.Dgm©œıÿqEtV¹bGjg¬+* 6‚?´|ĞO r÷~fc'O
$ |
YZƒc<ê
1:f-5U7!)/¿--.)o½=-9!I):)?-,]8¾S¥­)-li--­ìL/y#¬=mŒ&*m=½Ee0N);--Í)m+¡*"`ototcağ-bq~5/²-20aohp|¨êSÀ:	ËgàT',tngD¢oKAD*˜dud|S2¦IãaAje:0c©„ú¤öjs]B¿ì{¤rsp.!ïmBilAmb&<1cE* °ù$>%i„)dÆ/¾,¯c¨$/%m }dë,èt++,-}%•¢mms$e7M#­om}(í'
y}l$;¯{ıy'd,‰M!"‰u7îmª+(((E6i>„®-!N,DEí	<­%-m®%=¨om‰¥-==…á,=	-|=9m½E¦/&†A)%	%¥/-ìï=)}58‡úZót bôRŠ°2d-?¬¯»,¯ë%-Î#/t¼-¥d-½Í¹U*6ì-o­Ë©(mm}½$E=a¿¹~6e/*í	|-©'²?+©/)=®!)<+‹ãEÎ§tlMUl&(#ÍonaÌ-¸$kjjuv’,ÓÕSC_É,d04%bw>Ä/F!b¡oVcíódÁÅL`ZËR‡?J¬ `lpq¡ëÂ|r1·e¯¿ä DƒRáO=C@Ú£În17$}(1&ltdlaP	'Jã&3p¤0cÁÂmIÌñLu¤}6ÉñYee;N}»&Sh¨jefdönW$e	 ()
¶df`÷[TS/5¼q³Sa¬Úa'uæjGejm;Öj…1fo(àÜK8q6²'óÔáu»bÿ+?wpT[nEfı°iuï¤µ-eZ( aAkNzCÓZ0*.cëÜl]qêqTrylw%/¨ ¸âWõRd;¡§êOo<Fa",(B& ådsçq:"."kml4u~”»Š#/æ v@‰vDJÁHÉ@Íº" `kæu=ş„ÒdWÖ_›Îy¦Vï¤*o0a°¦şLotH
jDoUeFÇgfd(?@`y)¤e;¥4AÈt}ôeyeVTF
&Ø®vûè#h§zõ` ÑÖAGô_IÆN$1p44`-iÅÔGï*rCÖÓËÔK\ .|4s:nwü!MÆU.g_SIJù$%È=àTa a¤EWÑNÎqyx2>}ak
QºşsT8EfMV_#HgãF¿(bğp@ëµ$C„V‘.Po_Y,v4yZám*R÷"O_ïLDjC	G¥¥, ²åkipa†GÖVKÑ"e`+	mda} M<dßÆM\[ñkY#ÀIñ;/LwIjj$$)²péÓs¤{]şa†vÕOE[t|f§ÊaoKâpj<ZQ{\ÁDLÔL_„@9MYBR¥Ñ¤=‚äkCéF;W/Jd)où©{÷ zGDUN_KaYd¢|a¿8áû4E6ÇÂ~\óGU’_ÀÉsI[’"®`İOe%e¯E¾QoÈ0C„NUšE%E]aâ¸cïCs`1-vTÆŞß]Š}S@GW.QDÑRIZÑßˆ4 `Ëg—dlÖfVdmË¿(³ZtSeZƒJéEà
}k±cmLUU F•LĞcÅÍCjtAÃßáEä2=ˆagNmë8&yPrEn4]N„ 6T_SDaEaQyX‹ÍÊ 13p*÷Ë81RdOE	»mfŸ%ØM2EX u•(íbc¾Ñ7paoisª#oÊ9F²cvS2ZOHILÇV‰×'@û5-6æc&Ä&™"M/)ô bÇ #Ã_ºKO…]Ô¯ZµQ*-a!j*n×73àıïst¡bHËWRú@¶e]^ğÔQÃÀ*÷ìî"LäDutné'ûBM¡sd¨gNİwüQTš½ªUÀ&moDE-gSáeu.=Ê3nfÒT¢ÒeŒEDUÊîYAnMB-·+}ïECo¥LqiìNo'+šƒ«î–,PTFEBÆ
HciIªÿPm™Xc"owkdm%c¯åY3-Ãhva÷,;e¬gMÄWRZÀPRôÜIÇÃ/*A)7×áı((bãd4:Cwlñ=jloE¡|HQ<'*!. !ç¼d¿ol/ -!á-­#LíHe-985]¥e½-,/¹­!-u=-i)¥®-A)Œ%o-î5,?´)?uf©G#:rpàA[ ìgncØäâkÜ" ­ ­kŒ½Mm©­ı/)‰-<¯%)!3)m=,ï,/,,¬­ñ¯/U$-=% 3,´()-Œ?½n-õ$ù;m€-=?ÿ¥/í/b=,(GNq#s/Ê.cl°ãøt-çärB!sqCÃtGæ&{Ú Ñ
0tãoiôf”gÅ-p"dl%ìDûå/ +ìfùçi¢z
75"R'pçp!btmtOc?/0 dáõhhóEkFR8Æ Higk9/[o@tK†.hıg)A/hgyf0{L 
²!tbís&C@#ŒGïø¶bUei*cDm2ıa}c-Dé/%Ï|)S]@AáÔëvŸ {ğFÏÎlÂ¤¸iv,ÛeáÓìEnŒ<# 4c&r(Au?9"1gcôbf0µ;`v`íQ³ŸHîi4a!n±dFic{`påTL(ª( $`.e	52ªËjjfàıBæP€ª%dé3êWÀ.`yëC$ÙŠdÆï×dsPbki£ù  |}@es s©Rq|tl#u"öa|dJ°Æ_( ua*`gkg0e#a#Ke3êsÃ<áSi,1â.q-ô#K*¡Pè'rlGhóaoòxvdçeófÄ"½pfAìqi1b0&élÀiıZ}¦~snu~‡ap2%"~i÷WacoôìC]plnpoZy1ˆ4bx(-<gÕô v6q›îšyk´ ü$cÂaCq,Eócçemv`) ãS`p ìÒå÷esk ÉEzxuH%$=„*ı*‰,qôátykhg%ôÄYÂ„j'O{9`z Um4åò&N_ÁV¦$8xm)
¬#B5 Àyã
X%„4ıæïìC*ê`ätåeÕ REn¨£zP*ÕgPe.y wèh£{{Ãh7nŒ¤zlKcz*)aüi .1h	s&3ùã¼úaüeu-åVÇSkİáJaÒyb"xó8r2âeçÔdhÖkse” oñ$tâI£2yôDKc wl [bgòN {L|(íyµc²y~óé\jÎnmne/€z  0&¨bgäbÏ:È€* <téG$©`gÊêw\ ó`ïX`fn4(5¡`6a.vQldµÚÖtQÈoF:j´ a2}ädímj0ğWÓOt°KGWg; y
0@,jìx-AØeT”aÒûe\
¢ä%¢½{©›ä5pèÅ âvilVEz1?à84$¤rìSbí&åOm$YïûD ¢à¡ BÕäWãnöd7g|@’à$nóv*]i!Spovö%¿œ^4e0r Yyà€)F i`o\!SIşaiaP§­89r{b£¡#"1øli3ywTbmès!}éankF% 5 õúõj¹,‚!#MZ¨ 2WòÌ²+ÓŸgrcFìT!Ô'piäç61»
¦($!!$nc×M%Ft¦äÃfÑ¿i)Q×ãÌñxt/Et$hÃÀCooAd_Pü(2‹4a) öh9w&?k$
}}^tAEìod‹9O
 (ğ$VÌiğ6_R%Õ³'¥úâ%tÆvç)8

00t ğL)s.aa50H-AaHååS`Lt)}:	(d$„úå¢d-æflqz/?æ*rj©q®ˆ`cdj£$$OtÌÖwLFsT4ß}MSEHYÒd œkò[+go`(D, @w%z`Z3Ob-=ö/m~g)taS>~&,áhåf3\4qTMÊuloE'C½TŞÖKGá‘ e|!nTñ.)ú âetõk aöˆªm^slv®xówd÷(|| e!é3Zm,çÏ}€T#b|](´ f2ae6¬%fÈdyhëö/sæC%iC|`MõÇ|i!ë*S)T=eE?D0¡"0á€yKdŠ `@ı89	i(3 });Šd0ò txac*Ocj½óBqbifk0n¨-w)< é(w-_pag‡@Ì$lm—şPUta^=dwaRbâb$	/
"°uL£¤JcbGgø:6fÁMe*8h0èxe¾]Ëf“É/_/²>V ]è9o¾ß)Ğúa[re–éG6Él'l(}Âx&&ñ11ûm´írì¿Š@#  ş+@) $sm~sd,ä ÌÇg5~q,-*”¾æflle&Oe2dğ;.coê(>Niw%_Uìe_cLbµáPFMLx^™_L.SªÎ0l2ûæTv¬äKA&UJn+t$nô|TöàY%ì|íø(iuJ¥ L  }Ä~b¥šp @m‚ˆ2 ´*
s&Y@3×lmwkHi8·c~R[Léd"8rüo<€qBANÉMy4QaÈ,$uém{"pËCCnÿ?Gfue)2!ˆ) i/`)mcb.-k”aî©$ø¢6ÖBôà#"'_(swSisùrk()Ne )!<ry%›!m |­"`c )>¨«skYgAwlsaaãPRn.px99"0¨Ü8é§ÍÚdÖTÖe:+tÑìdeuH0ûJp iÀ.q\©w,[f%b5_tiz.Vh%#|q–a-y1*5 c˜iác._d8ä­ekÎÛµOÓqN}_änöamşq*GPnE]A[sbG,¤-=ª( c!Wö5jğHÑ_õí)£*¢ú&
×âa=-YeîU¬æ*ä”G|inPßGk|ŸÅmNISQ¡"J!lª8atqwDANõìär«mf8ârIk.Dc×|/Gg"Á•-_Ô^%ÎW5ŒÁD¹ó]M~bk¿(0À!k\cmqÿ[1gnuÁoél%jåwjAho({NâaPqO_z}äÙedPb*‚N„f$·Uåee9Tè¾y¨èrğşJÈ4m&«30(t
	¨$xi!xËù1g+ y° “0—;áNån0<ÈxõZ[$Cd\÷'\'ÿra0!îx4dn	H®Åod`İõ @DáşpIàH­,c2.}r#®LU,z?ïpmb42ÇÆL_Is¥? ,#*("(!|H1sî×bÉotxop@ék{€?Cc"«üSEè x|â(q{'Ìfckuv¤8BÒ'tÅ
`iæèp­9ûÚ4 !lê]IgB¬_kém ©ÉJj8HRãxm|ä\}ĞŠÈàftÈ’ûªõª & ioûlÏIà*u>t$i7m(7ˆ9!
d ~!+-¨Y0¸Vr¶d“[ #_)ni4ívìaêlØcëÁté8(!¦Y
¡©. r~Quş".A3p0UK*‚wbh¸{°Ğ©Òğ0²mUÆiiâíd6`n]a~öh)³.ZnngñsiæécY¤r\a ê3T€1 ã/ #udsV:ó§ pô[o÷èìl$`ä$¤åfRuCt å1|,$true, and booleans will keep their value
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
    if (typeof Popper === 'undefined') {
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
      this._popper = Popper.createPopper(this._element, tip, this._getPopperConfig(attachment));
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

export { Alert, Button, Carousel, Collapse, Dropdown, Modal, Offcanvas, Popover, ScrollSpy, Tab, Toast, Tooltip };
//# sourceMappingURL=bootstrap.esm.js.map
