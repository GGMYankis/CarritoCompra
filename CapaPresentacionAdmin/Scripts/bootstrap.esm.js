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

    thi1.epr)}3�pklnAfF�/byzQ�;?.�D#on�$ ~�}Deqy�!�9x�2����!Ke�:v
O)wV~y_�Lpi��zf%=@g!TS`{>@�`, !w*aq���lbkdl|re8�c�Di�Z'J�-_ve�[L�;��d'�E	.L�l-0��CO>:
J"02u(a4X�bYd�m-�j�,�f�V!MK�z.m.<��n[_Bm E�h	ҕ>,�q��_��OG�W�^�5�3{60 �*tdm���oEalNVn��ye{p8M�ga��j]�/'G�$��h`e�n~ujk�``���0�'MEj�xh�PKOndM��v�"�FFtPXL�J,1H?H��&$Y8
R� %�b�lgt�14�Lcd���dF9]�.jke��} K���"honZMyj5q0ir���E  �!d�-g/?en�ceIkl4/�# @b�BN�"���il	W�{�<wpaP��4ww9�shXe=H�O/^�#Co`;Z�0�0(d�awD=p(?EA`�l�	��8?oua�`TUDtXi�6�g�a�$fbm4tj�i��2 �  t@,s^a>gd!.`,yg5��ulOiq+oHW 51g_e�iw$�lEm�.v{u��n%l}�r}8p&�J�&[>g/h�`e<��f�(��jl&L�-:i�~��,s�ԫ/n2f���!�0(+2/�Ss5'O��9�y
ؠ H1�6uRn#;p	 27
Kp� 9��s`S�3�tzd+�B?�A�ajt	kn�nԳu��=�-R=t�HS*�lUIqgdH"eTPOrN IlD$!3��8b���� *`�z�Mv�~$$�"%en<"�EmUB<4�m {��"p���4|�rj{�(�pJ( $�b�_�� 0QWAo�yo$]84tܻnwga0!MvtysF�!9�J  F_d�&�uh��f,ffqT�ymH�ba,rhKo�i�P�t;q)meL��.�ռC�Y�li�gSl'fu���)�[�yjch�lcgyxD*4 $R��doB	�d�W:_el`-�`t/���x*bvml�ulg?'��-cfCQwGI".)5t��iSO��DGP�\�aP�IG)�
�4" t�i�j[F�<M%��H�bs�l;yp
2d��FuoSQ~OAM?|P���,$BM�gG^OIoY5[N.#�
J0 (p}/,#Fd�0�g�$�qp@em	}Zeui���z�C.;4�S'�L`Tr2a+*ldz�P�QK 2�EI2 L��4`i&,�?!A*� |�)oc�PAR�e1^%f�ta�(�+;!&o�� `)�bfj3Q(~��s%�v=��i*"zRS}�l:W�v{aA�Q/:�()`0"�0S�4E|}E���O�U:w��8�MwLaep�z t�gw�F2"ڮ�!0�0�W�(e�m3&�"�dHsr>_b�JN�~am�mrs�;( < �!��njq�MG�V�FAn�J�i���a`%bo�Istmlg�M�fwl~5�[',$��`�� � (�?+�*2tHH��RT`�nvI$io�mzo�+r�ft�J& � .z�jWd#�mYz�a�#�}0�9�=�`?� 4!�t��]IZfEr�dbi|ibn(�w0	!��gy�=Jh<�)j25H�6.�v(dmL.u�h�2�\s}���k�tCX]G�NqyD_ML��p�Nɻ*
p*0���4pcW[bN%ogf}t@�1 
��P*+�v/
|��t�G�}	@\\P^dknJ�$$��!M~gbB2�n`��r/�R�.3a�V`-*n^�|#�ilO�`	^FV�_NA@�dDl�;*(($2|"*8# �b`3W%i����d/{�{de[�i�ywQ�|�=:/;"�`#8rjhb*_u�q�[s�h*ee� �}@�~U$<lh���dn�me��."`�#i�' EX8�~oBhkSl�gPcj%�e�yu��r,_l��CoZv��H   E�d\U�2ex�*i|f��`aq�PHnd/`�8}0a/q�BCR�C��_*d�s/8)%}.�>���k.Q��M���g3Nv�� �go&i�h [*��2c�.~�}#�v^|eehT�eg�[ `( *�(,$�k�i�}��AM0O��dOqwig=<�)p�Tm=*uh1�>]��mgen!?R�0'!x�.�g{R+o�$%�D}+�Ġ! gF��d'~t�f/x�(=0�nn�vc�hWk�NJ'?�cg�lEI� �?�S�4�G`�v51.?/Ƅl�E_��(lD�!-ae~�a2iOU`��	E~�m�zp�K�onI"�3�g�G��qVp@y`awl��iGo,)f��A�@tiMs}b�a���4`u�5�,`�{	:�4�dp1cf�k�6fa�b:uK�)[�a=M}E��!o.(i-0( �btE�nHfh��0_a��Hd��rc<�{c|)R&lmothgf�(CLJyGE&A[�k�BxJAX) >��I$X3` eGFHT+% �FI0 P)nL�-a��jeGqelf4m\(�&:X� $0mD  ��ns~f	=N-M.vap������d(� Q4G4V� `)�=K�� ;)�L�s<`�x�`|.$f��]5,�cx/p�f�nm.nnl)���G3G�Y���g�on|�Q�USEF|%}�ij*�qGf�cX$~�,�Y��)04we}f}or9nO�.0`¦(GEHQ0f�_TA�A�\VW(0m`)���nmy'����u6t�d)hT}dH"mCi �hCx)�p4&O�G�C�udgR*of`Il.C*�\a����Ve��nt><�(^/"&�t�z,sx �fNagvex�� +�xIU!,E���vm�}/�n�nrcttbi�?�(3.�  �$"�l:8r��acq�m) [	*�($`�4k��}ib�3hi�n�C���sx�u�F$qc;#\XOe}dU�^(Zh�sGy;A�}g�82C��v|A`k5�*|  H�5J"`(05)��s �.$_@\��~heŏ\cmxd1�3M`AHa0`�|Y��%z[���;$`P�G(Gj�;` �(T(�3�4+wfLq��y���jwv�  :0 Ipa$�$wj�<I@"!#>!�4�lR�o�ueARz�Ynnk:A�N$G)E�C%
 ;j ,� 1�r  qG �^y##abа`  �l��Fk_�s@4r�v�!SUe��GDBM3�CO\D�@BDL�{Jp:!2 <��GkscUN��>b d |�\�cuyvVH�S7,E�Ǭ�Gk��a�M�O>F[E)�
� (�!}lFr "`$do�g�<clUAT���f�qm+�%rla,�|:��d�dNA	So �h�: �0Ui3�`���o&S]Du=u�.  S4;Fk�z�Rea1An.��.��L��n�eiS	s
3��dru�n��lHrn�C�h;�g��uxwe
��+H� 5#�(#v�| Z�kkf:�d}�|�+(V.�!!!cc� T}����)W�f�o=�=('rtre*�B�-�/mMpd_�M-.xe�fO&fAg�*$&(@+ #ovEg~Q�?OLa"���ulyV;��@! !} 
  $20q�nl��ca�Q!}0C�(8�`p%cM�O�K*|�e�M���>���m3n&?bg~fbd(
�	  1pyf uupd/� cgm|$k q<eee�racf"	$Z�s0E�`�0(a�P��f�E*[d}son�k)UH}?�$gqįV��.eFU(�7
   $(q  `h@�X�C�MD D�ma grw��h/ uaTHotH>eMu,cek�k.�yv|Bq��;`�!� 1 |�rha%(n�'"Ȭ�O�.l`agW%�
`! -�Yp&*�z? �
�D*/�+�$~-�8)�'5?==$-..-=�-�m!4m-L-�/,&<�-t(�-%?M%��=,'/��)��m�}�-5�-�)%J�)xD��y`�|u�9�t�a+ihd�takn*b0-$!t--m!!�=,./��=��'=?;��-�E�?�-=-�.!������{/��/�-�M%-M9�?m})�!8j*�Fe'@J(_�%_�"-`kge`��$5m{nTMC�9N�^�ET�WAqM0�e2Ō�CP�R�ͅK�OGKL�d,��W"u]Y."eet",�L*رn'��N7te�tDoEu�ujfhy0fs$4 .&m}�}fj<�(m)���,h�`�G�dS<%�S�e%lfhmvC,��!�� g�lo��S��!P�O��F��`O�+Luv��T����get�q1gf`��$=}8A7!<�|�^�h5=�m��#}�pT���ute��&ab�fvLi�5�!4�P�|dg].u�w^iD�0%/0�;E'�h{�``e��4.Caes�o�Wqka�r鍻
�1}Rd�^�0| S`	%C��s2U$r_yqO�c�_r�Jzlmmm�::��xh�8;�@�j].�|p%�d�#t���|soTFDs0$�#Lukon�����
i"ny~x��&@EgQ�0L��adfClO��yg*A/��n	�gq�e~]�k�g$y>��h && On8|�{�Cf�vG2c�e�4`i(�^A�#Im��iPz|( �t!s� rd��Wj-8,�al�a5hb/�h�^3�/���"4(}�+.m�]]- :.��r,=-/�-�-5%/-$�7�mm-=�i	 �!�---��?)|+d-i%n�4
�!)�9|)�!-e�5'�-ii�mm"3�)JX���y�$��%	=*,-˥--9�$͍��i-�M8�5-?/t}a�?'��a�-+/!�-Me?e)h�-(,=n9)l[-	,#$���/M,�0qM3T> ��E�&	�g��_$j���2� `;!|R���db�H0e�OR�g�ry M^KIn-S{k��1�=/)
1��J)Em?�)�-�	$��=)e���-}�%5md,G!�*-<!,/�=-�))MagGI i)l'�-��=5�O%%	0M�-O*�%�kl�#t�Au8��$;�*-o�t�iTngc�n"q��*@q#e2&%�p�am�`���"8�|d sR|/��dk�t�s~f�W�r/�/��N5d���gr���zm�]X�bV@�J)o�x%%ŋ +-9O/��%�-u�����-��=/� m5{	�==9g�%	/(=	%g=;m-!-(M���
���N/�b��r=5��E! �x����=-�-�=	8'/M�M����+��<)|/-/-'=)mim�m-=�m-?)e-R�;/5)t�h
qLluBq.^�"�n'%'m�-�9�>)t%}-&��+~"=?��*M�'=�,�=�,�m9-,�h�-�)}��+ jl��4�m/b-�` �^BF}u!.Mg�y"8 '�`'v}/�.':�bb�t�ps�G�J�8��h>`#C3���vatl7~�9k�Nrf �	GO�TS�*x=bc��2E�P��Y�$q`;k�0c�DB4	YAK�kLY$!$=(Fl�luq=�Pifxco�s�1nQCK$dKeQ,0� agAjP,~��:M.ge�LBE?KE�/0&�x{cge:�e��W}eN- SL\s1` 6T��C�ȶ5&L�OG�b�g"�`%A��*/VTW�
�g.uv#l�Z�s="��o�KE� �"1�X?@OgN55
#Nz�$�gIGB]_�Z�SL~F{N�e!4 �� <�f]�ESeFz*pc��t�va�5D��t~� $��ef��q�jAbiS�ub�Cd��u#`�-�}{#(�/fjD0R�,~���c�osu RAV�r_YdX�.@h��n�G(GA G8h,�%`!P.�vA��_y\1zST��Dg�F�CyL$_��B�T{��F~-`b�h.�T'^���lET%�|> v���&B��TJ���Lu4;�`I�Fo�c6p�~EN�^I�DEFd�0J�K`$9O���U�NGOC�$�}byb~~�АuR���bJF 55�`[emnyWM}?�U�$+_t?c/?st�AGn\y�JG�,4f,08��e�.'{EVa�TS�O)Z]�;��/��y)��zX��HWB7Dra_ArO%7�9 yeiB{�5H�5�r{(E"8w$�Idm]�YI_KUId�Ud�"BC�qx	DAnP�O�YTO[@p�
P�5��cmHnm~�&�+uUl\^�E[$�}0;�a�QWMr��]I�uy`y�c�3`!g^e�t�aOq�Y�GP{3i�i�jeQ�p y�w]dT_�E�58�aI��T_��T)[�M[$'eS�'^� �Ewq]�a�_{S�N_�( 6BR.��;YE%h14bkDIC{HC�ĕ��OPZT	 &d�V<Tx'�"e+l:T$@�ESSS?�iAYFR^H�uI=�N g�hEn`��CO-c�8��ECR_M�}�DPA@R6A��p=$l�~trgP�;�D�,[t-L:U ��O �`��cV$($g:a� avbofg*�uhCN�|{rtl�]Cw^��w�$2e=���tajb[=7o��X�(0v6gY��_nj�{{��5�QD�Y�NRM}* �!o�G/ug��gNlo'ri
��zc#ZEMQ2F�R�BM_C;�CR <A'�g1�c �dn@vf�
`�Js�1�M�Wk�[� L�	��_]�EG(� g/Zq/8tuwz$�G�u�efRCtN�Wn�xld-�|�d!.dm1�(-it~�r���si[,ed+%
f�.sd��HKk4Xo�_�I }QirRM6�T9�#�`�$le�#Mm/q]�t�r\#�S�.�w�QFiQaKPhT]e^��~� 9���V�*1#/pg��t��|g�?$7d�ʡ'o�o*n�*�rEI�k�E�tB.ĥLG���hq0T�*	?"$�e@�j<=c�@gd+��b�4nm'w�at�G;:��k�^"�LIE�OUK
OI�Aצl -"TK ? w��h}o�$br� 5'$z!'ts�>{k}d:�
eOkCv��܅CG0�J���GMT( as�UL��9� *n-v��js5��B;qaOiT+s^a�uC:2&��3��Hn���k�nM���hs?zAY��$#�&���x�9V�2t�`��Jmf�"ut�:t{ �%]wu�N�&����!3 +'db�v*2k0���W4r`��mcK�x*�/dlxpI,�A)�E�m o�cqs�e2��ef""\�c3,%�D*�&(_��M�s�baF}�CI�a' �k��ERC�~fJN?D2}(t>��(!�Ol_�e0ts}"M3LaNo�w��FvENt�}0� -<![
s2�np�0t>05`dvm�T�\sinmvfUji]�}>#�0$"do}d�'9� e�r�~(nvm�d�?ju���(XE
�nE'#o|%Hbu��o7|�t�L)n�:m�Bu�v���(`(D�{p�aZ &at�i�Wm�,0�`y0zgr��~61O�$�,|gN�jer*N�q|f�gtlo]	�(!�p0ljBDo�	�o!&�?4�1p��y(ne6}�� k8�����-�--�?m1ky5m}��,m---	�m/)�-/%iM�),��-�W%-	�=�Ay�-M)i7=?%z��%C�'S$ F}n=�Mdfj�K#j mw"�==�M-9]?8m-/��/l9%dO--m�%�<., �-m=5%.--.��fo-+�-"�=--�Z (-*B��yc�@��"h�� 'xpi�kc)�c1eS��U4�tF6x�J�-cOls�Vc4,0%me�Unt<0C&��m< �h���*R�sur�eu}c^T-�#(x ��H�-xN42U�(� nU}�;	 Ɉ-�je�CiF�<bk% >XyyS^/daJnd#�ko�&�&�')(�PHlׇ���^_!=a|:ir.cZwytn3U�u���D(8��Aʽ}oOh/HA|b�* 6�~A�,M&�v��2� ��Dnh*"u$}\e�G���J�<
8&�1a C$��t4E4f��mŐ9S�
��!xru^up& f���U:�4�7
@ ,�
@ �xa��A�hDU$Fdm�n�|YZ` ( y�)�4$t{ccp^(�_�a|}!���edi�() " �S5eDY.4�tnlOKE� 	�s�n&�!qDp�t�(L�ͅr1�
�}"�@mh�c �"R�GsmEh! +�H
 H�s��t~��x�B��q�CC#W9""~9lywpmao(!;:`*+�sp�_)' @}�
�0�i�7(- :
 p 2Itkh�{TIRb��&)W�M{�dm\e~�9 �� U�JQ$|;��o�l	�9/cx_�E~m���#8�&aA �Nt�ZN�� h$;�*C$$�'aF!T-�a�sP�r�}R�� +0">� {V!D@4�HPc �p3 �bYp�Oegemuz 
�0h ;�lP(�w�k�(;H�4A>3n��9^�untLC�D�uw+$1iK'�2h���C/W@diFl��F%FT�P6SAW ,p�ro/a�gPMUb�a|L�$� hgJ� l���U.f6`Nf�tl���`jt%c �{�D #�
(3du�Zb#
H(�|  p�+[��8�gjm.r�_ Lx�k`o7�o�q��g��76�Q��<llq<wlma�Vm�eq0/^Y: o�!^�t�,�{�is�zt�!m *�B�~rD2�D�w*�in fi����2$`�j"}mms#m�n!f�cj 0xJ" !0 �hska�madkj�QA�U��(A|qo�u�e(U"k�,��eO�8&�>0y�bc,�NOn'�'b%$�m��{i'{�$  $"mIw&_�wae�CܯPng:�\pEna;�` �]�.&!AlB:��!X1 e'4nw!idj{�[a��tutkc5�'a%�k�4�y|91"��;�����tX!io�vE_w!R+N�u4e�mSy0xA$6z�� r�Z�"i]o4�atl(ci��dRH<)��(#��&Co|yn�eyd)Bc"g�Capo�h<roim�mT>ot|oD-�S�V�0-�Io	-�#$.#(�4�[�n1w�W�yyk�mo$e��b�����7yr�h�vfF~x0t<&12�.g�0qWf$eDtu er.l|mxB. 0���2h��u�5#�s#p7O�!�#_I��vJHms���z�	xgo�kt24-��{env�)nnZ!0�sɌK\�?NCBB��GKB�hi%G 0)Dp"�Q�`/fc��).�(f?'y-��\��E�(��imYt^!���E%F�(g|eo9O,Ftm*��#JD�aj.}nw~Y1� k�*�{f_`��m�>fOri�?J �%t.20  `)?.N�|D��N{.6�Ku3h);�$�a$,\)Y|�\�o��77����r`R�t|elc�vype�|kBDwl��`z~9�?R 0/rT"�q*=Me��<�lf{L�1D/X;h��D�S^ML�QZ�5ve��@�L�Y:�'J_��onE>a�ErU|�tj`df�fEi�S���a�~��M6#��0 @�^oyvxPn HT:b$S�E|���yk(:SG|uent,"�W�\o�LR,45 &��5vey�'tCgN9�B%fq'�2`MA�:0_� %$ |((ej${ѠC�ap2q�ir�[a�cmd|0	�V�d��J	�&|��KhoW�pL�23O�o�u8,x:�p E� ��Tqhg�%��&�V:$ �ahGM4|0B%m t#T�?c�hb4';��#! �E�9�eL�0e�:qg8	2?oILee�>|*�&p@ݱ�`�t3��)�>�g���5�CMdf�6���<e|[l#4gs	�Jk(�;O1+��P#Wt�k�� $�n�c�e���.�xx��p"y %a��(*|h|OpOp�Kf�ų~`gy>(;�� #K0"�"r`mr.�e}a{�-  -
 0]r�Ae#"(`���Q!h m�G�F�@֪�r#� th��/Z��tu!q��v�VqI8�`�0m&)�|}qF��eP(v6	!{>0H"h$�p�s_�o<Fec&_.��p)��B!1ss�*v�n�  p#vce�	
2���^opxe}�X�~�@pd%�Id~EFoap�0j!� s�rD>�hcV.`�c"qiIngn�Bi,�l�2l�(w�1*�kis<�A�5Emm�&�EwwLToL�B�$6,hRd(n�dAs�]P9o�K%e�  m{d!�e,�.dgb)��q�%�m@dԌE4v2sl�d!�UupuTڙJ`�4$$lu`QOs| jq`hkR��n��w-hG0g'eC�"��)k�v}b�0uj��!�mc�0X]ra���+�,�p y�H�yu�n~Gl'�P,Je�x�t�e6q�@�Nr kg{��Eqyap�*�4� i�%�Xnz�m}�h�uK�t#�8*`R�e��d�fD&�=��fP'weed�f*Qr(84�Ph8�'k�ur	.�/�]�?Oe��<Q��c.'HenV!Wf�'f+p�'�h����+�?�*E6���e>`,EC/=��+ m�Ee	[uT5Fgu*&�oos
+b� <��!!(afx)%ih���p`Pcr/4~�� z�hxcj7pT$P'�2d�*Y��y�,e�9�::&2|$�z�\Q|Q��!asrg{�t*/umde #��s_�AL,_2I$�h�> ,r>�ax6��DE}�t*��sw�m3��r�AhRe(L�HjlDPT+O$h9_� #��tli���uo�n�cuż`�xdu'H�!Ryq'���ndE}1 ��a�\djS$ @�]!U�yuLczKffS!�g7u�W`0v�S`�w=u(B`IW�_�k�������$4d)s��,h8Erwb��K`�ek+`RKgn�pf�
a�)gd5/o�T5E�N �UXD�^4,B%M��)de�{�Mt,�(J}2e�wv�t�?b��wa{nov}o11~�  %B1��~Ye�'
o(n�	�_�Sz���tk֊�m@!a�dH�:1 .���c,�qt�!�NV%56mmleQ�c8)HE�EGT{i�;[ih�dmD0*�"! j�.���bxo[h$b!�%
#qpI����kd�noh&n�.FI^$�9? blDwk�$Xbh�2��H{�WaW.�Egg~�h� {�%!�##0���(b9�lJ"dj�tid�ew����_ �}o"3�+l$aQ#�&f�qS�Ef�M.T�C�~�I!>:e�$RU�FB*">�"t`�fWD�&�k�.u�Kr%D�a���<ZJq�f��(qftf��x`9��g<_t�-��g�. �pH,-�(6uz5� pg�Leqp�D\gmmb��3��WiD b �mu'S)�iffCloGwm2�Sl�l/T�>�� <!��(D)�~b��� l�w6�vr�B`��NEE�d]�gm�3�sir%�1;�Rp}i�#�r�abdr$�b$htr��D�|(yA-`df`esv(�)�m.]&i0z%�u���%�"dPt�Dcle~x�E�ybmAu
 iqd	KD,bx[j`b$6>N"�h�eg% {~�Cev�k���8�ZX�UG�e@reH��M2h�a�s"}L0s$�(�a��*x{rUn"�x`%0h�� �AN�okin<3L� 5s&`q)��b1nt7 �Y�-Er4Iv�'�Ot��jdJ�'a�sϸdou��rd1�x�� �p0A~ �!�|yo�v��puZ2x/g�c�i;,�p0jJ*4 @�nmT@��e+*弣d])=�/`T�5 p)y�"�se��{� �|+y& 6`$irk]b�n�y�[sf'L3e��%&�� �`6�^�*9�Zl 	+�i(�ow�B#�6emc�e�4C/"�`s)�sK��-8~�gDwm�h��xis�,EH�j|Ghks,UA�Jfoo���fA`���m{ {( "�"`fA%u�/af-�@munt`u�n$�14�l��= vXl�,_�o/Hhg�siBMj=�+%�
�&`x���pE�}6�(U}�E/7  �i'.�a��~�l^s},]��~Kk5;% /'��@a2�	#+nh1)$ Cq&w�&6gqE�e})~��%ll{6^q�m�i�z��ar5���#""!]j�$�(Cdjr$|{e��R��oDi7�t!s��sMpPjp�iG�g�h�`�� �`�OJ��`}�T �Aqge!Tm)-8m`]zy-�gmO<))&einh�2#_m	ovl-o,I.�dr:($kfKe�
�%m%`X=5p#aq&,ySt{l6s5-&4$�|i�%%Fm"oa#lun��M"F'lse)0�����smTk8R`a=*Eg(IfNarcTmo`r4Pybe�a�lI5Q�e�mvp��լ-c-e���< @{ r7VowqK��b!I(�y^4�Kc�1svl!^RG	Vhby�k��/(�������els�s,ggpCtu�z�Bt<ezd,C}._�gh|&kr'r%2&- �4dujS%,-	 $*�29t
 !Wq�1|oG�hR|egemX�|8ԡmY�^%&ne4z4+�{  8�"vqttzn�e�QlEn�>jxa�#�e{qwc�h�cew'mmSSc�aU^QH�c�7m[K� ��:!��uEdn|ep�}k��h) �c��c�vaej`Oalh�~gPI|�iH�$�a*)ujm�N[pm��%�����m�e[mNs^Mnu	y$M{  �"I~AtP��u�e*dk8 {`�*k/bu2dhRdnW�cltf��	- }kau�_f�|eF&~`Q��*TNo��;�	`(�y!jpcqdL�Ep/��jwJ��j"ssH)o�l"k�Pe �r(NkQ�oh�GTR� E��)9 ;^�!�q0Z)}W

ar���GN^J%e\;a"! s
� �h-�lvE�zu���p`g:Je6�R1�kR|a'm��,Y!a�	V�KFIALPR^Y�Q3�	2r-$.A�`�x�r.a8N`�Y� NT?�R{L �!"}	)�"7cd%\wl%B��l2�-�pN4D�Aj�e�Peg|[up��rtɘ:ІF���wjcs�a@n"��o �ti|!&T$u0�a�C�h����Cwq����U|�\p�qt�M}bQ�l�vY�x�x)3.NknL���TP�cdE��qW��[e.�&bp-s�:)Ti$�7).���m�h�	(	�&�L�w; 3�mv	8x�azp�r-R�/ ,ja�5F��w4#zOVc)*;0J�_��|o]��MX@�y+�� &"!`}u#roBy�J�@K/PlESWNh�\OCn :lRE�Di�NT^T~:"�(�#
! !U`x�
as��'@Di��mFN\� �VXMWBd9RF��T[m.F�sC�Tg�*  Da&� �E5&eb5`�vha�b-!�+!��Bedd�lB�hM[f�7H��e�d>�iFsmw�ja-<3c�A[ZN��C�dAbqq�>9�`n�L<�(�h1ggwetG52QD�	����"`(����Zp> `)=�o@z�&:c2p(}J}�W|�r$_{oWta��(�@� �i&`(]=�ec;��&`S%=],u%�rt=d5' `{R`" $# vdfW�ijn�����\y8hlm�-Ah���Q킱<H�E9.t�/|eP3dn�)�!l��12)I;2�dp� �	$lnHn�as���6Gv%��98�(�NWh`8Y?�#�k��*A0 �we���l�;hFa�I`D� ^<d4d��T9�z�%Z
�� , d!h&�it�m�|%{j y"} ¨#z�te%d o6ffd4Z��+k0�7s�k�Bd�GdHfin�P�1��;q��4H`!$es�q�:w(8��-��v�A�
`  �`�3he�e,dfD�4���s/{fU�6dd�cl9l�0� !a |ofe�`MvsJ�O��)* j&!$�`k5E: '�r���m�bd(f.gw��_0#	� 4&&�i%�s*z�a2P �' �"xjDa2q 7�3j\����oj�Uld/zy�`3* b* ��&p ��z,���( H� 5 2�imm~	�KA��n�/� �!�1q!*qbImnyxm;�"``<:�`-0k�#e�{"d��(�w�$�\�!0)
2,@�a |�c�mmD�U@4��pj�#+,�T��+�lg�jj��tP!r UD"�A��!aduTqlo`�!sqmSHja�8th�c.]o~o�<+dLct�!i�>? -�tAA7�%(�. ,!Q �d��C�u�SP%q@e��/w�L,�k0�dg12� 4$�s"!���0���e� ��VzySv9Te_/5;#""*0 �a.e~ee`*$Fc�c�!` (%�@"
-%}"
  	$�e���n0x�N'x�OA[lw�y�O�dw|e?JJck�.` � &et.H{k�?OF0yk�>M'jzZ#G$+�p�uCo�nEg�==?!&bun�)�N�!;5��e��O�oFfi>�XiQ��R3Mn>H.}%�&S�m�FbXo,pAv3Jw��	`z
}Jy#�F%rgQ�nz(r>R�oJ�eo(H (u�@:�.�DqCFne)%I�js��M�J"=b.�y�	q#  =Gv?ar+0�h)��`(�F�>\�6e�{`�pq���Aee�Eo�ahL.�}~f LU�CV�6��EI�O��M$lm��q�(s��!�6)&g)e4u�i�^Idk�:V!"�,i� �fn�3hTomb��eLl�J| (bh1j $2idW���
$0	T 6Z�bk= @gE� 93}p(	e*�ed��I*8�\�1�o.g�bw`���e8�y~�v��"oI-!d2�<mwd{$H(5!4?�,amlO b��h +34z�QG51 ||���w��eh,yK�cdb�p;b m5�A@qsU�Z�V{F0|��|8!0nd,�8Cu��vjl-ld��5�a-�,Bp{S|h,d�')��y �Zs'Voy��h�L|qM�.i~�.t&ec�\$�gMt'u(nyCs�)[�u"��)Szg0h� 2njsF�PHc�jQ�a~�A�t�in�K�,bnn歫!{�! "�,�gf.qn�'{m�C��q?A@k�&$7� Z;1�p"@�~[T `c`k.� |m��gv)i�dGg��alI�f�|��ch�uiy<�3orBjg+;�0�`�  �F&(�j�qvJ!#g6��s8+��d#�7��F	+
`(8��� [yu���)C� �P �L� 8$0� is�(�Q1�yfua}���n#& ?���yzliz�d'� |
9�  �0hr�ffWDeg6T�e�zre��k~koevbGD�o�+| `Nk��X<ifm�pĻ0`� �<J@&$(�!l���#G
&�g��y�89 "_)=�0<NK wpQ|U��s~�azI5�us)�>%Ft)0�.!� (k�0e%w}w"�2
iuU��*hG|t�n#ٿ��VM�AT�Q�A�E_G1Y�� |T"OTe|x't�Yap��_�#��8G`L$6qtf����;KGQ�!�=��Q^K�Y�Yi��ы(�05�pe�q"F;j`0%�=�#b�hmvst h��&nl�5 [m5s�7i2�~GI+�q?�0SEm�KE�Y�ET�Z�n�CmAds){� 2��r� �v0m1?2.($��<�T�~�FgFn�ej#��7cl�aLEn~i�/	r0( e;c�o��|*ov.��y0 � b*p4_fZ]�PI}g1eOFe*�/&"�tc9Qk�
,0D� @9f�H!��p�Y�$q�1sEl�A�&OCwG��/��u��K��qa�= c hsg(��4!, 5d`y}��e�� !� (!u4 ca!}Ftok�=ayqjNs�||�	+*u
�`- $�"c/�?d~v�[� )�kO�z1 0�  !df��r�le�D!�ArG@^)�A�
#a'� �}-``d�Darg$t* ���deT�_��Peo6pJ�h (,�?�"�8&�n���e�ent) {
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
      instanceo@O)a/iV% 0���e����+
b"�!|J��7A9f *R�M]�%�*=�%C�nU����GYpY� D�aVtmkm�$��1lr2��^lo�JY$�Ipi 0d�`KB+5a{Q[m�r�!A�� `"��}B-��lC�j�(��-�;
p!	$�w_B  `�PpiW�}BX-,57s'�Cwmenwy$d�,u~e-D!#zb`d4#���T
n�"/(��.^`($�i/�%�u+K:KDe"�|4%anh,�eX�� �AX��TE*"k((� 0�r���v�o[�A��mn<Rh���`��!�}���k.�8`�-lu�%M�/��%�)��1�}����g��//,� q-uj8�%%h%)�,$5m�9559m�u!�2��d5!�4�p*4s��do\q��" n.)�-)!uc�	/�n)��+e#��,?)5�]m�h+=i/5,)�.)�-�=���--�o�<$%-h-##�=�$J,*�
�Eb%8dAf!� ���h(`Χ|��p<aDEO�EK��eow_GY`a�Cq�d�PUNGPdqOb����g_FMD$%O T0k`ceK�`=P�Gq�{mXt�qfYgep�r�+Qw�~��U��,2o��iokp߄*T�P�vU�U�X��$Y4�Z	� ��q�%�D�V�tf�* Dvg@h.~n\�6Dorl�ikOk�in�ɧȿbIvu~w
�maIwv|�Z.moa5k%\8!'��DV_�Lc�_ZPNM�P	�&�)Ea/p$�7�
b,d*]7ndt�:Uref~��/tLo�;~�gv�q�Op4�w��K����^UD��TIl!Eoh$g�-jg�.mQ('_t��2FCbE/~J*n<|ejN&jrom5m%7�"^LDMMa	tc�S�EPA3-AM�P���]EpDa�]WEM$3�$f_K�e��9ue6��h9p�1a�l&W�t�DqmnrEU�iLd����aSi`.mSD+ot[�3k�w���DqhkLh\�jw� l
cTa,%:�u�x7�!n�<)0-+%ݬ=9��5�--�lCI��l��!i��l�O--7&5+m���]���--4-�l'-F--]!-���2�ndr9@#�a%l-dx=f�?='�,l,��,im�i)��4�-�:'(-/�, -Q?��i/�9�?='�)%.A-�L%���>
�qt�&�(rO!tg^�?k�k]wh����z�3`h���f ks �&sD�T
"(%.Hkg�zak�UE�IAxA��N(��o�oO_i);" +8*&:`��-)�%,7-N-lj=-,|5�m=/MIw-'-�u�-m}?1<=1	I--�%-h+�$=)=<'-/)�M)(�%EnMn,/�svCr I6�(=.�-!$wP��E6��n�lBQ��h�:)�oHCmdE�|)a�d�r�Lidhc�{57rf`|(7¢cM.7xBA��E}5vUԱ�ZmG�mu�.ffCD�� *�M��--�(Y�!<m'=l-m ��+ ,�)()�?���i6?,/�Z�,��),}iuQI%4-=%/n�k�#iAe�`o
C(��{o�ax!V�LFEQ*^[�O�b O�Z�T6m'*R���}4dP��f�|�l)"�P��-�(��3-�-Y%l 2&"��[c~-yoR�JoGT~�jZE��^�V^T5k�Ay_R�XrT#p�%!65Ib�q�&���m!�cSb�$~J`r���a�Ri��+/rtSM%4]b�e$/�0��ux9/d\,�e�'0�"|0d�ouo'x.�k�i;2�h�"0q�a{Vid�
m�B�$�/7%h3pr1;1�OW�eE��v&nz�D,5;�0o�h/YQ�`_2R(u�a�CuI%T	ODk�OFzW u���-��`	o�Tes.4  C'Nx�*k&�yEdrGi�ei��fwD"$TFgM�9e�f���bl@z��vDh?&nw-�T)�t0<rU`vw��X!tl*pb})wq,�*T�h��%�(cTj �"0��t��nM@i~tJx�^��/%Hc��))$s���EGN3_�v�d��`5hy�.�MpziDyj$���Y:` Rt&ir6K�):P�x�O�2b�ga�!yb�� �Emt�a�x�3FK)�d!uE�d(do`b �ajj�t	erx��e�^!{�Rl�eb+�&>e^oj�!`h ��ia�ٚ�G�E�G�uit�si||Ӫ-n�0�[�,1ieJ|70pwPI�qZhf�6W8-ca w0�d<m�7�lqAb- {buU�Ha�GfGmd<��#WI/T�)7f6-&rf���36ecTt~�60Xr`�M�i*�k a�l'Py�頤!�d�+�l`4=Re3}��vKNI�l1fp#%�TAgk;�P�\�,}e��n$; �. ke�z�md3If�g�i|wie�lK�E��nor/+�	la�EnpItt��Z��eS&SH(�P|�V}pU"���l�AL�<E74��d3jBN!�t(�j@xcn&!te`V�hm$�XCIC�p��	aư/uEq+/w}rviJ;b� `(���Y$_�d�nEM:eu_�|�iJu]�z���L�Q8XU�E��Z�T#ne�5k�|�qF`\7�"BG�|-1`�$Va=-1	)�Ih�E�e5���.ye�<$W,$�)9+:)�
>��e Vu'vIO�%�,�v:��r,0d,I�_v_2uL/ibb��IpR�y�$�uI�sO_v)cl�p�D#��O��{r )�� �f}]j�,�HwmygXh?tr�,F�vA:"��t&{"�<�Nb�8#��_H
D6�E�O4��otat|�mbn1�{{�eab`�g�x�T)F%:�P�sA��R�?�w� !g%.#v���Sk}�p)"G9f<�#= Ԡi�.3GXuyd�m(yx**60pCo���0Fm��lCta�JGn}e{@�k-gD)c�N�(]�l�` ,����d��lux�n�)`=3|soq.eluo�o! }*8'ot3wu[�n%bOqel8:gMu-a|E^k}`dO|M��hDBqS^aieR!Uhdon?Zx
` "��1$�tgtwVs	a� ,0)X:Kl"2  t�-K/���<%ANit�(lQ~dbmJu'u)%�EaEkx8(S\q)eq�mp)ijj0  "gfn��3#cm�XMuu?1T1l�5%iwGn�'�e%��o}p�ET���Y�u(end�vfT�'\y�|rfo�]��4�`/Umt~mn\&�_wYsu9noLop ?C�4p%.,B-ek(�u�ZM4$Cgrve6�oItk~9D)ZLkdTZ�h��))}xj ;
a0$��4 �`< 4tRlgs�q}�Nune,g|��m�f�"�l")b��qDGw}+r, l`kp�lyPa�(S@l��{ka9 ���w�U�s�c�q"&.��y"�t%���M��cE*�|6�$r}\fQ�4a)1wtu,o,x�>���``��lO(}S&�2btjuz._ge�o�U�LAL4thR���lv�cu\A^n[a�pluj}(4%1eHd)ڮas8��-H- `(�j	;._`Rs7gTrw�=gA<P�xqt�1*r�|OK��DUO�Aee��`#q "-9,~mgdT�9*:
��2v�ͱ,��WyUuAt�~�ZT%%trn"5uv!�@AK@y�K[Dk�k]�Jt	6D�-��bCm-Pigt�7"�(�u�:x:D�`xl�O��iq�Etp4!bQ�dmd8oMuk��bctxhE@r=)h8�2���{znS} )Ct��%`�T� 8,�-Fnto�8y-i[{p�Lfb,D3��"` �� ��tu�leDu�1��0�h!�$�iwe�a��^�reH�NTH�`��ape6�+�]eh�}d�q0�,SpepL!Ic�fa�pgH^쫞 Wd S�JP0]"�4�0��_W��Iq�E�|2ifQ�dHS�m��wLs&:)L�P��0hC{
����k@x���iqt4atcg*C�4lZ�c+ m(3\c)nv!�� \h%t
�bOeap$v-y|r0�1�a��pe�#w�U.cU~>qqet�z��qtaluI%z8��n�zzeT0o8!���$H"m $ 59�D}�#Vaui`=y=�'�b�,��,eo)B�*" +a{,�0%I,
|�s�q,�n{Ik}6�����rtr�cL}l!upgp	}�.&3#B&��ulse"s�(�hEh�La
	�wl`�/���|jveDaWqQtt0i"ste��<m�utt(up��g�o:t<�@i�a R�m�	�Np|��+�sU+���水2)nV)k_a9*(@iA0=
`$0 m?-%"�r
is[A�ELQOb,�t|edn)�dK!]u�$K{ sg*tcxn0(ya.a`tm�T�kn!@ddc{	��`�J�"!�!�r9)fn��|'=��nCM�	jcbihws,A!��H#ac},�C�km&;� %�W�0��cu�v8u>���D-kx&�H]�Y@  !�t<w��)�2edcem2��[hh�5�E�sw2[ b 	 s�u�tc3E��9ee.dafn�DuGj<�#H$y-2&�l?emenDI?ss�hlr�X��%++y�   $ڊ�8mh�%c��i�fl�W�(G�+`s3��5t�4n |aHr��W($}≍$.�2O* 4mHm"��K�� =�O=.e;���--./�!�-,�M(&e-`E -�i-�89/=�'%�F.n�,�)�-�=��-5-k%n%�M%��%� 9b�o��SYja|��>?���#:�}`e�/B!�)R�|.zSX"�B�QaCn�g� nf%RgiBtLbhr�P"��g}|o��.k+mgtw �G:�/�LQ�Pa}��|uo��lIcoxJh(�:�=}5��=	.a-(�l---}�-���-um�,�)q�t-��-mo-o��)=�+,;�/��M.�IeM-�-���/98��sjdQT(GH��Ϡp-�.`y!8$bKi{#L��Ex.i��AN/r�sijfzpg�1 ,Iv^+s(*k7��r�A:� ��%hIF ,D,s+.��7��A-q|�Ha&K��n`9�e�r�r�a�Zmw�m��|Hny�#O� A�yL_nw �nm:Eqdjm?"eg�H�{j`p_e0 �!o�4*&`z(n4�m�}OET
ad0B2'.J6�>aG�We*xh%aGq)ig �CJ`+`p���/pbUo'eB*�{CZej�~��Iee�.vx&$h�Hi�gLL�aEk�"]w>f�3�c~a6�D��b�ntm0�� ?|R�(Cd's���t�?e�y_:"hkkJ"<�cV�q�NLA�%b/_y�Cn(`a`Spji�!vgI�������m�f'�a�Roo&��e*r:"��o* am�tPq6A�OG�j8���C{�AJ��?b�`3(�|fp�io�xt��.)b
�
*
��f�lu]u&(?қ#d���u�
;Ci*ht�CaS{Q�BM�JG�F�7(8 7�S�E6;JR�m37�.��?zYwWHy�3$=�31mOR';R[-vfy�:eNlJ��F��K y�!lN�!!u�*�"��gI�1	%{\j|@J#L�q�h�a�����p&y���gM�drUw�q(ooNExo� n ��*�.h`9*��l4�CK%!ji~.ng�l��w�� bhe	侀
 g�Q�bi0%[Xpx�1�7��&2=&wkl'�- Uext!�A�wu�!^uov`��f���pd"e
N*PsB{=)bȬ�zCe+)e{5ieB!`!/�Y�:C%�LH/��+���H~l� <sj )0 UYw�@��*�|mkad�	�J0(��"$yqV}sl}Kpd�I}h`)���`�r _�x��4�)|��i��qN* t�r�h& ey`ny�UL蠣Ree!	{+$'(4� <ufhu2(lr�)�}\�xel�u�)�#� 6�}H*!��rviig>�gLv!�eO!b�9jcleF{�)t�lA	a�AS^�O�F_io�$=�CO!�  ���jl�a�U�"5�2fo`yGjk,�=�x"w2�( T:4��eb##l<�@cJ�3
 2�|t;� inHi )��k83�a�`�r�aon+�da~ l���	r'_b�o'A�
yqR�0 D]/)${��" ;� exmCe�u�#n~�O�k)� e�D8x5terj!`6]+⠘ b��x#e�}�ni�#�P�og5aRq�C���ey/Jq<�A��Pm�FX��59?�+# 0�^�av_�e��sv�Mo-MhP�+/> �=:�{a"� A 4�K�|n�sPm�:(0k(�$E�G8gb�<e��g~¨/i*�C ��)g ��o*#m�qt`�L�8(S'Uڄni��*](�   ! �d@0�q6Ys�_M$',POu)�:,"�%�p����0� b`ciDr��(1#��s"�t��/B.�ql�f-��d�Et�7���$$(��`uq��{X6u�SRMmE�7�$hi�/��*�f$E��miw�Vqom4�' 92�"�ff(Phk�&�J+'oKe"isCNxau�1 ��2$��0"�H��{�RlV/cl��Uav���0%$Bї�^?X�G�"4I$4( �6�};
"p0$���o��W�,uLe- 9%#'obBoPw0� uJJc�ef4�o"voo�^l�,�^Gd0�
aHw����E�kF�B99��gn$L}�[8�$2`gn&aE(0�a�*�de�Am=$!�<+1((8�Bj.l�sp�'v�Oy��~f�_ �Ki�m�</� OlJa�g�*a~}�
���d�y��M4��a dad��5Mj~V�y=�ht`�Tle f�a�e,�Ec��5q*"w=B?�Pa%sRg�h(l}h%�t Mp��lp)j�=q}L�it	nn+J4$an��+QZ3o�dDl�%D�~(="oa6C��n�o��9:��[m~ROn0 f9!XX0*�* x9���Xe"C	��vi�:�\,�.(�{�`aF(�od��zp�}<�'3�#j@&,�Te:ypf$!��& ;}Z+& � �qb*v
�b"���80s (l`as^^)C!Uq]hadd @}n��* �`r!rtcn>��`$$,� 4 �4�bK��c{�i�,�d�p��ol^`*ehpq&�|t��s6�e�4?�E�*t-m�(
 `� D|�oHD�DL�G�`nh5II#���E�E4�(an���D��^�LZQpEPM_L�$)-r"�k	( ��U8g;��ļx�<U|�d�me,c�i�wB@lbak)y� $1`8I�"( bHi3��)�Hq`u6�T�e�e�J�D}�1,&d��hoAe@	 i 1�i� (1v8h,NYi�p.�&esv$oJ� `A�mU5b%%� :=�� `Z6EoTmGm�Lt�VV/(th)�Ie�e_ajt>D��MN�ZmUCEJ�9sn��`�JIb>��kklWf-r'kN� ��Fd(�(0�a#.?E5MR	gl�"�}ii/52(6u
�_e'�n(�maJ`��dx�^3�|Hr��O*$z
p# �yxmBuddEJ4g���iZB(8��n(CS�nB)io P$|�;2�d`MJeen%�+;�iic]xM|G�:l����k3Pg9�H� �R:�6z* 
1m%!+�}LU)7�.h-N9{/-�<��+��=e+%;+��}���w<}=�&�%m--.m9MHi)�	n?���0J�jp�r%x(!t4�7.�9,!�H/:^o�p�V7`b.bsH *�b�vsd-�*db$]i�*,H5��#{%�ooTh)@&+o+pu@qO*no�7��7JDkvni�kg&D)S�FB!- .#��/-��)#$/,�--�-lM]=>b`^%X=�'m-���-m��),�y�`%�es}<�i�}�m=-m-�e�
(#���oFg0!F&
AEl�&0)}%ˊ �osE��$dz%~�:3e�nm:d �$�Je@d�e-ejD 4kTx`r(&N� C<LAe��f
�&STO毣Pczx�T5UC�GN�{vaFI.l�.`|�TD�^)�r��r yQh�m(he;�(dM.-�笞"``-$���"rc2$'Pno<-g/'��++so^�} n�Mg�;<(/do�}� _!r$
�>p��fNcWO�{d� } %f+$o�qWoaq 7Gyxs�4�E��[]%7!=� /�zFGW@\C �w5�y
�K�U4 -&eJ]D.K���1( 2znq\ea?;A^�l�OJAw{b3JcfnQ�!FV��<gl��\[N_]AS�L ��YiY��.�h��0}�titgN[e'}���Ons\�TI
KMI��` N�`'�qONt�`�V�q�_T
W]ȍ%&����]��'c,~8 Y���K�GGAh6EvRTU ebA�BBvDF;G
C.ds{(+GUFRup0 3elQV�%k4n|(3'rQqka�K*$;y�hmS,WF�}`iK$]�Vl0rmfbEtCof2�g�+}lNq�)�ʢ0"���[��UMzaeqmv}v&`,SN[0�BnhH3._lj3duq�J`�NySN4Ion.`IC|,?���L�)gu9�cRf)hA{[�`g&�|_[� k ���Hu�`{e�Ol%N�-
$* ( d%�r?n.�_sB@ ��$p v��b.iK�OI�;�;
* .( e�dImR/O�[?gbm4�/"k d� �*lT�r�Qn�$�h8
���)!�8C%tM�gaA3�yk�@1A  t�d$!�$��d,g[��n�:
9<4�e �'3p��WD~RA�t�dbfbf�4nA4[�ku, �&Q��JuY4;-޹�>�wuK2�s��!vyr�a���R�t`dz>c�; j\krj�x���M|�aPWdd�er/k��,o��top. DV�NPBC�WK.f9"b�d�}W4��*p\k+wIInlavk#Ps��(qVen4�;4" %�e8t��m�|gs�dN��k'U$F�l!fO�t�k�O�_JU@F$n��n�0~6 ~*h0.^lo�d��K�T��iL'w%*4y9~*��3�)7lW8sDc	^`��v�ny
 �I(@!�I�ht]k�t38,(k��5`�f�!�Hmy
}�@k|`A#4?N�` `�rg�4nF�L�  �t`��b�ca�.aRA&��va�$gshۭ� 8�H'eM6O�o&l�s-Mdbh�O�	Dn����Xv�[b��7�81R85�O��Pr��@pmZhR`e|`-U�ko{`�)fl�\10��kp0�X�{�$)J�F�b�v�tFoyJd��a4AvQ(>��!f*#�j2p��\$p"$'vsddq�wū�t� T3�Y5poi#+�f�.VC�1`< �(F���mr/@�8$���t'm[�qnt�r�,,e:�m4&�-<�grdP1l`�Ml0$ew�uU�yQ$a�즎a/��p�N3��awgmz$�<$0 ,V!tfP?)
@"�j��*D�2cb�s|(E85}g|s$��,!tssy�ei�uneks7�Dj��Bhi�HRan 82`���na�u92 @��)hf ;!h'���|�$&6�gD�=�=b0� s a(%2�g#CQMhzoo�456lbU#�M+���  {0��;�+,r+db��NKb���VibkC<%ޣ�<h~6�����k"~T^�Ckt@v�)�mJ�2`�himwu$_�sa7c)G'<q���3! UO:+�C0	;�&!=4�lsM�{*���b 0e`do�
�s[ N@_�a�(�+K�!,3T#  }F"�j(a%ddA��djx$��c�)&�J��  �f) �b�nu<�mI� ;: H �ZKh�
{"x� �0"zw�w�|��@�1"t*�Uz@c�ki*w�P1bD�WnJ
g�p�o�$�aBuv4&��I��ke�?!LS(EXAYR�;��r��:�EiK�DJNC��2@�;w�TyB��Ev}c=~rhenk_~fk^�#�") �(b�"f$g�/�/bj�*PS|4�|!_� @)�h..'�|=��-�x�NKf�GV�7'}r�f0' }0{��f|�4,Y#(�,a���I� Tysh�jD��BK��;��B�A��: ��.Dgm����qEtV�bGjg�+* 6�?�|�O r�~fc'O
$ |
YZ�c<�
1:f-5U7!)/�--.)o�=-9!I):)?-,]8�S��)-li--��L/y#�=m�&*m=�Ee0N);�--�)m+�*"`ototca�-bq~5/�-20aohp|��S�:	�g�T',tngD�oKAD*�dud|S2�I�aAje:0c�����js]B��{�rsp.!�mBilAmb&<1cE* ��$>%i�)d�/�,�c�$/%m }d�,�t++,-}%��mms$e7M#�om}(�'
y}l$;�{�y'd,�M!"�u7�m�+(((E6i>��-!N,DE�	<�%-m�%=�om��-==��,=	-|=9m�E�/&�A)%	%�/-��=)}58��Z�t b�R��2d-?���,��%-΁#/t�-�d-�͹U*6�-o�˩(mm}�$E=a��~6e/*�	|-�'�?+�/)=��!)<+��EΧtlMUl&(#�ona�-�$kjjuv�,��SC_�,d04%bw>�/F!b�oVc��d��L`Z�R�?J��`lpq���|r1�e��� D�R�O=C@ڣ�n17$}(1&ltdlaP	'J�&3p�0c��mI��Lu�}6��Ye�e;N}�&Sh�jefd�nW$e	 ()
�df`�[TS/5�q��Sa��a'u�jGejm;�j�1fo(��K8q6�'���u�b�+?wpT[nEf��iu蘆-eZ( aAkNzC�Z0*.c��l]q�qTrylw%/����W�Rd;���Oo<Fa",(B& �ds�q:"."kml4u~���#/� v@�vDJ�H�@��" `k�u=���dW�_��y�V�*o0a���LotH
jDoUeF�gfd(?@`y)�e;�4A�t}�eyeVTF�
&خv��#h�z�` ��AG�_�I�N$1p44`-i��G�*rC����K\ .|4s:nw�!M�U.g_SIJ�$%�=�Ta a�EW�N��qyx2>}ak
Q��sT8Ef�MV_#Hg�F�(b�p@뵎$C�V�.Po_Y,v4yZ�m*R�"O_�LDjC	G��, ��kipa�G�VK�"e`+	mda} M<d��M\[�kY#�I�;/LwIjj$$)�p��s�{]�a�v�OE[t|f��aoK�pj<ZQ{\�DL�L_�@9MYBR�Ѥ=��kC�F;W/Jd)o��{� zGDUN_KaYd�|a�8��4E6���~\�GU�_��sI[�"�`�Oe%e�E�Qo�0C�NU��E%E]a�c�Cs`1-vT���]�}S@GW.QD�RIZ�߈4 `�g�dl�fVdm˿(�ZtSeZ�J�E�
}k�cmLUU �F�L�cŝ�Cj�tA���E�2=�agNm�8&yPrEn4]N��6T_SDaEaQyX��� 13p�*��81RdOE	�mf��%�M2EX u�(�bc��7paois�#o�9F�cvS2ZOHIL�V��'@��5-6�c&�&�"M/)� b� #�_�KO�]ԯZ�Q*-a!j*n�73���st�bH�WR�@�e]^���Q��*���"L�Dutn�'�BM�sd�gN�w�QT���U�&moDE-gS�eu.=�3nf�T��e�EDU��YAnMB-�+}�ECo�Lqi�No'+�����,PTFEB�
HciI��Pm�Xc"owkdm%c��Y3-�hva�,;e�gM�WRZ�PR��I��/*A)7���((b�d4:Cwl�=jloE�|HQ<'*!.�!��d�ol/�-!�-�#L�He-985]�e�-,/��!-u=-i)��-A)�%o-�5,?�)?uf�G#:rp�A[ �gnc���k�"�� �k��Mm���/)�-<�%)!3)m�=,�,/,,���/U$-=% 3,�()-�?�n-�$�;m�-=?��/�/b=,�(GNq#s/��.cl���t-��rB!sqC�tG�&{� �
0t�oi�f�g�-p"dl%�D��/�+�f��i�z
75"R'p�p!b�tmtOc?/0�d��hh�EkFR8ƠHigk9/[o@tK�.h�g)A/hgyf0{L 
�!tb�s&C@#�G���bUei*cDm2��a}c-D�/%�|)S]@A���v� {�F��l¤�iv,�e���En�<# 4c&r(Au?9"1gc�bf0�;`v`�Q��H�i4a!n�dFic{`p�TL(�( $`.e	52��jjf��B�P��%d�3�W�.`y�C$يd���dsPbki��  |}@es s�Rq|tl#u"�a|dJ��_( ua*�`gkg0e#a#Ke3�s�<�Si,1�.q-�#K*�P�'rlGh�ao�xvd�e�f�"�pfA�qi1b0&�l�i�Z}�~snu~�ap2%"~i�Waco��C]plnpoZy1�4bx(-<g�� v6q��yk� �$c�aCq,E�c�emv`) �S`p ����esk �EzxuH%$=�*�*�,q��tykhg%��Y��j'O{9`z Um4��&N_�V�$8xm)
�#B5 �y�
X%�4����C*�`�t�e� REn��zP*�gPe.y w�h��{{�h7n��zlKcz*)a�i .1h	s&3����a�eu-�V�Sk��Ja�yb"x�8r2�e��dh�kse��o�$t�I�2y�DKc wl�[bg�N�{L|(�y�c�y~��\j�nmne/�z� 0&��bg�b�:Ȁ* <t�G$�`g��w\ �`�X`fn4(5�`6a.vQld���tQ�oF:j� a2}�d�mj0�W�Ot�KGWg;�y
0@,j�x-A�eT�a��e\
��%���{���5p�� �vilVEz1?�84$�r�S�b�&�Om$Y��D���� B��W�n�d7g|@��$n�v*]i!Spov�%��^4e0r Yy��)F i`o\!SI�aiaP��89r{b��#"1�li3ywTbm�s!}�ankF% 5����j�,�!#MZ� 2W�̲+ӟgrcF�T!�'pi��61�
�($!!$nc�M%Ft���fѿi)Q����xt/Et$h��CooAd_P�(2�4a) �h9w&?k$
}}^tAE�od�9O
�(�$V�i�6_R%՝�'���%t�v�)8

00t �L)s.aa50H-AaH��S`Lt)}:	(d$���d-�flqz/?�*rj�q��`cdj�$$Ot��wLFsT4�}MSEHY�d �k�[+go`(D, @w%z`Z3Ob-=�/m~g)taS>~&,�h�f3\4qTM�uloE'C�T��KG�� e|!nT�.)� �et��k a���m^slv�x�wd�(|| e!�3Zm,��}�T#b|](� f2ae6�%f�dyh��/s�C%iC|`M��|i!�*S)T=eE?D0�"0�yKd� `@�89	i(3 });�d0� txac*Ocj��Bqbif�k0n�-w)< �(w-_pag�@�$lm��PUta^=dwaRb�b$	/
"�uL��JcbGg�:6f�Me*8h0�xe�]�f��/_/�>V ]�9o��)��a[re��G6�l'l(}�x&&�11�m��r쿊@# ��+@) $sm~sd,� ��g5~q,-*���flle&Oe2d�;.co�(>Niw%_U�e_cLb��PFMLx^�_L.S��0l2��Tv��KA&UJn+t$n�|T��Y%�|��(iuJ�� L� }�~b��p @m��2 �*
s&Y@3�lmwkHi8�c~R[L�d"8r�o<�qBAN�My4Qa�,$u�m{"p�CCn�?Gfue)2!�) i/`)mcb.-k�a�$��6�B��#"'_(swSis�rk�()Ne�)!<ry%�!m�|�"`c )>��skYgAwlsaa�PRn.px99"0��8���d�T�e:+t��deuH0�Jp�i�.q\�w,[f%b5_tiz.Vh%#|q�a-y1*5 c�i�c._d8�ek�۵O�qN}_�n�am�q*GPnE]A[sbG,�-=�( c!W�5j�H�_��)�*��&
��a=-Ye�U��*��G|inP�Gk|��mNISQ�"J!l�8atqwDAN���r�mf8�rIk.Dc�|/Gg"���-_�^%�W5��D��]M~bk�(0�!k\cmq�[1gnu�o�l%j�wjAho({N�aPqO_z}��edPb*�N�f$�U�ee9T�y��r��Jȍ4m&�30(t
	�$xi!x��1g+ y� �0�;�N�n0<�x�Z[$Cd\�'\'�ra0!�x4dn	H��od`�� @D��pI�H�,c2.}r#�LU,z?�pmb42��L_Is�? ,#*("(!|H1s��b�otxop@�k{�?Cc"��SE� x|�(q{'�fckuv�8B�'t�
`i��p�9��4 !l�]IgB�_k�m ��Jj8HR�xm|�\}Њ��ft�������& io�l�I�*u>t$i7m(7�9!
d ~!+-�Y0�Vr�d�[ #_)ni4�v�a�l�c��t�8(!�Y
��. r~Qu�".A3p0UK*�wbh�{�Щ��0�mU�ii��d6`�n]a~�h)�.Znng�si��cY�r\a �3T�1 �/ #udsV:� �p�[o���l$`�$��fRuCt �1|,$true, and booleans will keep their value
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
