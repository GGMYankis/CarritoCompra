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

    this._isTransitioning = true;

    const complete = () => {
      this._isTransitioning = false;

      this._element.classList.remove(CLASS_NAME_COLLAPSING);

      this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);

      this._element.style[dimension] = '';
      EventHandler.trigger(this._element, EVENT_SHOWN$5);
    };

    const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
    const scrollSize = `scroll${capitalizedDimension}`;

    this._queueCallback(complete, this._element, true);

    this._element.style[dimension] = `${this._element[scrollSize]}px`;
  }

  hide() {
    if (this._isTransitioning || !this._isShown()) {
      return;
    }

    const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$5);

    if (startEvent.defaultPrevented) {
      return;
    }

    const dimension = this._getDimension();

    this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
    reflow(this._element);

    this._element.classList.add(CLASS_NAME_COLLAPSING);

    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);

    const triggerArrayLength = this._triggerArray.length;

    for (let i = 0; i < triggerArrayLength; i++) {
      const trigger = this._triggerArray[i];
      const elem = getElementFromSelector(trigger);

      if (elem && !this._isShown(elem)) {
        this._addAriaAndCollapsedClass([trigger], false);
      }
    }

    this._isTransitioning = true;

    const complete = () => {
      this._isTransitioning = false;

      this._element.classList.remove(CLASS_NAME_COLLAPSING);

      this._element.classList.add(CLASS_NAME_COLLAPSE);

      EventHandler.trigger(this._element, EVENT_HIDDEN$5);
    };

    this._element.style[dimension] = '';

    this._queueCallback(complete, this._element, true);
  }

  _isShown(element = this._element) {
    return element.classList.contains(CLASS_NAME_SHOW$7);
  } // Private


  _getConfig(config) {
    config = { ...Default$9,
      ...Manipulator.getDataAttributes(this._element),
      ...config
    };
    config.toggle = Boolean(config.toggle); // Coerce string values

    config.parent = getElement(config.parent);
    typeCheckConfig(NAME$a, config, DefaultType$9);
    return config;
  }

  _getDimension() {
    return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
  }

  _initializeChildren() {
    if (!this._config.parent) {
      return;
    }

    const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
    SelectorEngine.find(SELECTOR_DATA_TOGGLE$4, this._config.parent).filter(elem => !children.includes(elem)).forEach(element => {
      const selected = getElementFromSelector(element);

      if (selected) {
        this._addAriaAndCollapsedClass([element], this._isShown(selected));
      }
    });
  }

  _addAriaAndCollapsedClass(triggerArray, isOpen) {
    if (!triggerArray.length) {
      return;
    }

    triggerArray.forEach(elem => {
      if (isOpen) {
        elem.classList.remove(CLASS_NAME_COLLAPSED);
      } else {
        elem.classList.add(CLASS_NAME_COLLAPSED);
      }

      elem.setAttribute('aria-expanded', isOpen);
    });
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      const _config = {};

      if (typeof config === 'string' && /show|hide/.test(config)) {
        _config.toggle = false;
      }

      const data = Collapse.getOrCreateInstance(this, _config);

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


EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
  // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
  if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
    event.preventDefault();
  }

  const selector = getSelectorFromElement(this);
  const selectorElements = SelectorEngine.find(selector);
  selectorElements.forEach(element => {
    Collapse.getOrCreateInstance(element, {
      toggle: false
    }).toggle();
  });
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Collapse to jQuery only if jQuery is present
 */

defineJQueryPlugin(Collapse);

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
  poppu's§kByÄ¹Üc.ìu-„ı@J¥kpwf7!æıo+€o¬
 0e!dƒøÌS-6b7ª.on,‡c~l5ñx|fk
§]½Z?**Jš* =k)i®Ì4bí=¯--¯u>­mm.½Oe½=Ä2/%G]lfi=m­;9oj)Mím%/9¬el)­­5,o	}5.¤EMêCdaSæàÌe)NhTåkª*&(-•1M¯¬Ì-m>ä--‰ü,)%%ë.!lu.“/s©%'-du¹m¼Hlñ9?'M,Ïbm)5íí#Ç+ıkf5=ım@ñ*­ÚK‚¼q1 Fsp<ly~ E°ueîzó!‚èsuCg†/~aox§éL  ÅvkRR"_çei7©Ëid!îô¤kèj~é7	û¨28 {Ls!Sˆa|µoašé8˜Šx 0ja'[ôïsqu#`‡°6wâ aB3 4)dh¿s"g	*âg@ 'h½$ÏDäC§JÎu§!v~,dt%S‚¨" vøá#nÏeä1`=$¸!}-}e¦ÙäN}a4¥m5hô9†;a`(|,Ó„{ÅşDayB%p=)4xgP¥-_`CdLmNrcr*iZN `o1;- #D4­óRj* ˜å\is@g…àu~WMô-H {Š<#, Feõ1şG8ÄAv!t­ô4:0 |Š`s$wqã´e…Œ"MwR"eì^THx…¬(af !€aSm4õÂd¨Dí†cäì~Ö8|e&¶“B q
.iotõ:è`$"$x
M,ay£BJÈ(((¦vcñug~enCo@`›'
  _6oŒ TAcMïj‚  vod#hlx(a[ 
¢veuur+­m)k1äWCeŸnáóA3 Lo)3,d}ìeh)À8`Dnl÷Ìs.¬5+“èc(}
 hwï7%? ä¤bhá Cøû¦)1kle84xí:Dleøen|w0tf+rb_I3Rhk>F¸ğxYW,Îõq&so§q* !€da4e6.{I4$(ùş.ªH dÂmŞq~ 6!`aagdDgò¯íp¦¸p{aÃ ¡¢pD¦íEnõmäNo:A ]ò,Pçh2¥motÈl®±€]
! €bn`S6Bz(c2%cfÔ ˜°W~e âEEnFğDZ/eºinG0û>ôhûo£OeÏ`meû|.ae~gÔ^HjQ¤„!öeuyuEæTÀrÿA4è£æ+! € Éæa(sowöen1~feoc³ixPpé÷Nç2?R
(÷^(!€"0yåa~¤(KAp$İ!°@âGçôFĞ~G*46­ qTõnr/¶ÆßîZiòEdraeİjgL=îe¼(êƒjN.î\E5j!;`Íç`õdlèÄùóeâ,e9GğHzè®-rF¦nB-l_î2 qì1Nke0 ""(•è`<)w!As¯JKnDaw"áv%h®xL ( !
cnğ7hmvç~cdpÄå}EË\|cVåí ×xèq*İ-e.ód¾alàòNà'.!ƒn?$çn93#`A ]¡eşrM I.2 À9 dhiònùªÂcã|¢Po<0i!2QBİ§t)%Lh (q:'²f8ğòmxB$h0AFÅ®oGâ-wO$rmL $5tM#ç0÷}AeauXTzO ,o9uÏtğu`ëûqëe~uoV"†ûóv½kåÓs#Vm"5>laäï¹Ou ihH…åza´f)cüil`¼Mº
(ª¥&k §v4x(Ìeåpuâ!êEaÀwE0mu4Jö¯í7j!twuj4mFô|Onqvokº"on*iÆu$.œ1Lîd‡ph1ûk‡?$w¿sPi³cs{e5†ÿsc‡2(O,c"cliu`²qqõ8¦lKWbFWE×`z6O G0"k4moúI¤±-A¨šI,fgnôká#J0bcq' }f¤eneGmiNt§LsuùaJìõà%Lf^r &>ô RÀreêk*k<Ïß sdá2×j¥ÓEEÙnÑ[bW3^óFÌ((w®€p &£(9¾ãodAa-©¬/äe#üygìÙ¾s'$9>bzylàT-o9*åKL	û
"dLí{ <0 Df$¬lhâªvLAz§kf1%D)#­(%l«UsaìlåF¬¯'oö©)¹ğ°(²¿,0d'(dc.Şä8Mooe
[?s0e¦'¯F` @8òxls)ÇâCo=dlÒm4A>ò"FUv±(/árè`i~{h¿ä%ôeh$e[e­-»B:4aYùì)q&÷íáÊQ/kLos3ÌIuF:yaÎWiCÎIL_SCG×.#;/ ! kt`ds?×äje|mzÜ£s%ps„E j½#$ğ$SOLèWNKmÌWyİw4©k
È¢˜aÃDöevHá~¥as>v{ImgEr(9Ğñhofe=gmğì @~C‡]WQJF7Ê,,J÷WuwuI&TzyrcT
jØd4hZ	&±fåg-¡aY ‚J$o1ğ™M{,Iá"nˆdhğhLs&{m|ÇİId9¨y|¡el{)[ÙNÿ.xõhIû.]¤¾pãh k
"zª*  "u=}b/+‚²(%w\N!
pğcmFòü ct,hô@lùÓ{M|?%;
"Ödb ¥:å)Qœ%q!]eÅtª dxkSÌ%äåM~6Á#Ø?‹ŠS  bd@A»>fg]bôèdgH)dD)PdLp1åuñReiìƒ¿
 `|«fBd!~pk_é(<Ëğ8˜I¥0(ôhJSjG<iñç÷)Û"% 214ei	-Î(Sü0Mp~@şwur/{) j Hr$µhd âs!p!X.l]cØoGG()E
1 lXŠ )UPôc6g(I&  p%vÂ%p*Ÿ}OJëæc@r)b5)ùCN]$itãªtÛé†v¡vù9Cbì²iG%uxèÕ:¿òo°`¥)@Y> Ha r \ôè›N`oplm~$u0tA^519_2ùJúC  -m"Zv‰^]e‹**ÏGçc|eæÙ$ånòöî}&×l2g1i S(  ¡Ó_kS°(ài`aU1²Lp(9!åõİÌ2*aNtbb¬OóhgoMb
uÊióOt-°XdJTL¦0ÒÅ¤xZYÔTb,¼BdL 7u¨Rqæsuü`_n_, %)®L@fidgq\DP,ädfdu5ôÄz%Zumõa¹515b(€$:½|uaf»J(Bbd 
ÿ,Ib0qiÓw¬[ *¯$ÌYkI!æfã¤éd D-âIè%¡¬6ufök ^j% årtâ#é‹$—¨mextù lg[Qmoäõ)< #dn7f] iepçtdiPàız…KQkõ1~ŞŠA „Š ¬Á"a(¤+?_Ÿ6HóôIzfïQé&Ç&ívTLû4Å,ci/e']5gaÍe~tm ÚB $ˆè#G]c_jóà\æ2,§fãåyu\|vğkä¹.ãh_lùp'æ,ÈîÆRÍæEj
­,få$=?iÅöA%t\QoMDplnæ&´%¥åöfkEm/uqÄË÷$7,¤=Ío1­a_# 9a({Ë!¤aé (5x,{ªN}í piz09 8 !b˜Yëi‘gcgôĞdò¾|esùÒnØ(c[!<8_ni$)$$uàor`O_e>vSQ{ıhzq¬PcLJôAIsL[N•]ÃbM¤·á»
-6  bpoù7}Txg½…n&óAòrs?vòôıœÕ*Ae?3Î1ÍEZRo×&s
Z 3Š t*§Ô[d³÷nt®yeUÉUTcégÕtä #ªP{q=Äysõ¦ä½*§¦7æad³n*"	*:9# 2%¡k]xÿ|asO¯rfmo>ÜLp]eAVyşĞVv0µ/å+eñ*}%Fµ,@/`'h9Á2äx_R¤°„D}eì0Z5j„*!Lrğh~çer$x"í7v>oÅdï_5L@VAMÖG\A„îEÎ$i°,¬aÿñKU}zgGei¿Bd1J4$NoX±w~ïÿm(cşşkç¡€{J*0€ #M\vyæ!- s .œf@b}sÍc¯n.òRa7T“öFgnKŞ|ZÜo è  À%_?"kHÒyÖudir¯ànGavÔ%dyÔ1£``BqdR(tè]s"ÿålmww´±,  `t"÷î.£wBôO™`¢8b	¢ã($‘Õvdrye¡ággædg(FMÑ$‰&ó?l&­O®"ôŠhsbodöÔtõådwVå<aÑtP\IuA![6® kxuipng§fcWdº$%rug¥{©mãõ2=¼ı!7nfèahv?a¤2@1iqeå-%ï]ï{¾v3æ~;'bi³Álk13&†D¨Dyqì,p#GOnL..ğ'´rAnbá4ewÒ@aqfeiÈeÇF©}jtÂDc6"Ãı¡6fÕ.êu9_Lg=fsj<)`"`—§ Cj@zE2h@ItVu:è(êhui/l6j$spq°iJa#b`bE5Z}nnqIçã}&louve+t ¬\ô`ét0D5e4‰|vc÷Àîo}!@9åÅ&òG;$dyLUV	5ïP84bğcasy©)|r0KzT	fn r"5kåv@LcD"êğÂeváôfd°u+ğM¦zm*ŸDqtb0jw=DáT*q'6ma=iRaà)b¯gäëâõbkhgQìm4
TBaiôbl%A9gä?|)°˜b%}©Œ !±be}õvd S~Joigã(kÿ‹04bid+edA,|UAurK`G1 sš" cvh!Ù0¥¶*0káqU46bmq~guòhGa`œ`{J *¡e¤,>}rm7@,!o&UcdÔĞP€¯Ò;åœ»6ripXDR4;¯è`g÷Ts ä±÷Iz¡(ÂgúğGv¨H uHQ±è¯àMrpır&Ksm2cF&‹3–b&ò"o
(2 "íet,ôecäâaï"BØ-mw~p$$”èma%×emQi·:l9š"âb€|ã)q|ARnû)Nn&iVfrğÄGr$nså %?-j#ñibGVßY€W#L @ˆ&–mnåzlşC$$,äief„87pğaêgH|3x° b± t Å [î`.ùyÇfm-­k8 lH¤#*_Ko|fyÇ.:eÕEræ\E©8§{:© v¨"áDfíÓ¥f3m_Í~g:üPõ0bk$d-qgòRşêË-ıcof­íe®u4eòooã`#‚)2 Nâ| e~×bµy  )t(lFf‡ tI(³ºYr?FPc„,r-ÅEfe®#ô6==³ ‡oêòGcüo{`Ó,l0P,mE"d`Å*ã%Äm|mmjp½$œ*}CÿzNÄ	g/s',ezejãhø "”f
0imP¡Oìyü+|ïpTebAÿ@ig0+ÌaàIs[g&QrFr4ebbOoc)â<)bZDP¨$¦ÇNcÄ¨x2L-s3)©ñZ²mqG8%XcğqE¢ÂOï7xf.?o !IÆbvojã*è$uo´=ÿh©R?=âéü6i'¨slneee }~ U:pLQ”ryìf00à¤®1mod¡~­ssnulA" ı` ½%5RÄÅháq{:Á$`%Pìx$Š¿QohÔesà`Ğzs’%v£Æ$Uñ>åTg5ÀgæxreGarn^O·a,|zeÒ!ëyó.ÿmíJ].8"*xrÑòBOn&¼_!R  p(mf&|!›D`pp$iÙS4)d{#	2qD!" ^!”]rağe)y\ob¦q`ô%mO1Äzafùsux~hlÖ_d$nw.€eq®PaÀt/$¦aPm)üO)š ,5”³øû(
î
sèò`ç3jh-|n}]Æd-,|I)v-Mx¡kfjlhÙÊ "rhZ/$ğò.4-x-evT,kussµ;=.án`Aink¨ãNDoŞI`ÁWÃ}JP¥+V8 5¨“àZ'ÖfI6nõ)¡MEfU"`*°%4‚6e6}*n.ÑõÉaR|O0ÇŞ&(oeNohz0.uª+usd LeKPE vmECgR3MTZ™H:x™ù-ÉÀ- ûgÁtĞLñË…ÉI/u(iP[    OWJ#PHÔxlnp”`Vıÿ^Å½ Thss™%HomfNpÊtaVkNw¸n¢&3
«¡`4q`hªygN|4Ríi`íWo.Ì{cBìH»$.éØ~\ é^³…CSÙW\CETSGdNÌ!9¨( ¢  7s!Âpæö`SŒëAøUTD~X ÚU;€‘© }`!  iåD¢h"ÒmfdÄgiPR'g¤$µãp£MÉÁ+"nn4‘È:wo@$M–O*Q]D;ä|pS”C"Ö'`ûPq"h·‚`U”<j HjU£IçVDßf„ú(h60¸¤?;Swa`~æE:@ä/AW”é]a9å‘WCà{q+rl±ag9e S}sfıí³4ÒÈpN–%_ej&)&hi\ÓOh2~_h}F2 gyïeÈÛ!	9!èukd_(xsKox-£Gl$SªmHu$“1SEi,8TÜë+'ŸgGN}$ælàbŞPc2´yWñiûm*Š½ãm\“otllÜo)dvBû}q)T½|=jugtG}
0–c¬I(‰ªpaz%~®€~PäOOJ,ÇNâwóes`gm`@¯Í1@ÇI7RÿZqMİNDZ$cDU99`J48 `P!"s¦Vwdş%ywuÉ±9 ZJÃ`×ßFÜÒq°M€0;mlkCÅMPÄ”?NOB-@b:¢qF* 0¡ #}u¶jh"ie&rŸ(erwÿÄÌHW‡ÏRQMÍüL¦y@”LJMüV|MüTÒò»Ú )]© h/`³ô>qt.Á&rQò0a6{BªVu äT%r. ´áyõ_eæcü'®ônãd're÷[j - YbOAÓl¡ÅOGáVCP`!d]«v–üld éÎ$+_æærJefÓ%t¬« J"0ä ñ-{p¦s
&€6¨$/âf§vŠ Œ  |);$ehiön^òãN©g8H ¤ 2jb/|÷´g,epk_´cnu"õ-Šo#pZyoun°V $¤eä,÷ät4z®0'¦&SE°ˆ¯xü@të,ç>ådx-—.!W~à[weæe2?ô zpbÁgt
óO,¬0±Œ9å"J<°!€|' *r"eæ8| `nn!bvKQn?$m1p‡deJgíhjÊ¯½#3 ½:dB0åw1pn:ÃdsdSì7q!6‚nçæcg0¨ oåömrDH4q'`dÉ¹3/Ue®Ôìubp!;t ˆxMz  A(rÇş4sh"®ÅrS¥<9*£`}¨Š ;OguÖRâ|ğ¿bCgşU|Š#E;	  Go3¿.dïfBpovWw)meùk9KO&jÏô<d{Š%b"& ˜z5BGÅ}aŠ,Zút©yçŸf½ÔRÄ#J…ıås))-@$â¼ iu/`kæiórqºhwSX&(( ´£²Híi" ¿;VcXe{ìOõgr"¬dQ÷<0 #$0(£©Iğr8ƒQR8RË r!  h¸Pp bNuk`ri~"tèh7/^£ş~HÍo*bgufÁé:í $   p 0ªe#`@´=8&YŒ(0 `b0¨©LdbáNgnÛ8@›à2%9"à$¿`”;On²ŠJû"‚r4b%¸muvÿ-v8"à@üwÎg%,|Q§÷@èĞ™*eb¢!q4 }
 6$$!$}ÑJ  rdK4*tAyvpñ(×}ddij"HÿğW†aèàve)#.Zea5ÅñTrip.{
P0¥	*4,÷dhc+ön|ÒhkïmS1%Os İ=}÷Eôè&0
}+ b8„!#NMd`SmùÒ3ğo1peNòÉgç,éuÁeruxyD{
!¢dá®í`%>áoQê 6Å@e{’`4èÒ!("p!¢`aqNhrxeö n'ÌsU) ¡¨)Tõ]÷$#¢`lHÉ ª0,Tôp×n {¯¬ú`Çoaa`pBv@oxqS2@¯nd$&.à`@*`?nŞ)flsaåfbwkzv,M=juOñ(x/iöeÃÏınIÀ&­!4îñnwLío4¬ |"ş¬ksî?cmß`icnw/yPeòÏo®tjìªheniU¼tByp.ğ0iR O^$fh*0sy`o+f~p£Ç~tnøñî:Ík+f	Ã;" `!$|Ak,Ü(¬$œãádsT]C¬äd%(? "!0jeo$‰ (4#tá>kTT«, Té _&%(Ä%'>/qöÃPı}Eãá±QDråCtx4{âI;ooï/|hDLCERëú[[ĞG[ÁPa]{¨ thmáG=øCd ¿fymuâjX{U>Ifé`p);ˆr@ C¦!¨%(6u€5¾aecgäH) UË!4° *dt5{l:ˆ© ò5uö+àÉ"`}%zg%Ô }Ğn'u@cjõ|}dEf )*†}T‰¯'!¸'û.0³un0iXVeåM&Ç!tjuå?q,t~l7y˜0 ,=®…£`d¯_dûybÀeçrfo/eHphUp< ót kb­g ypWájuå_{Y%aa!`iU€rğJWCUÓ]
bC¢  ¨'eTj·,påEvu]lí×Án]*pee÷L"eapGudncñyc(50!xJOuÛâJSË_F™ !ög(y¦iîS¬4æaã
üi2tu`m9/`okr!)»¾°¨o¤=N9#FÉ7ùmni
  õ5të¬èRSuyûLj·AgâcM¦On¤¡'©¨w
„ğ\12eL´3¯¤uıiÚìhÇBË,µíc”µ­şèé" ¹Šd!!€¢ b/h7p faaah”0ƒrodl-|f.gDuOòïÒ0|Eo>{Ğ1ş§!8U¸".I2NïàëgU
˜@$0,°"4¨\ôråLß`oN·ü¢*My £ªtt|''íÀI§ - (qreäU{;›š`)À&eMÔ
¡!iqi.$8tutdogaF-QWRëü&åÙt89¿¹?ei6p¤lîUôai¨{‰b(¤0¡„‚·àâVä¿ DpÇ TY~wD2ğr(BÄo,mEdOv€nÕ%ax r$^CnjZı…é® í» hï`	i(ı $(p ‘l¡fiO¡îzfme% m+)"%8 =©@-©š97t!ìéÀ|a|káv…ul“·!r[Al4i0óŸ„2+(+$!*Å6%¢t(v&´(mí|jY/f_rv]n -½50VÉÔR^ß^œA_rÀÔ^B |ö4ïvõN·5xôB`5")#]9ex& gäåcçt¬gai Ü<ĞG™@êÎÃÉ!	+C i
ù» «!zõ|5RÄ¿*` ` ÷nªe@÷+î{pxtïãMè}ó Ü«Ç/<DC÷kâÕFFin/jN(ldªÙå`^KdKRóşQM^^ÇOG't09*¢(qtÌoR 8!| d§l0a¬ loz0B ¶3oh}3*ôögıTh»F àµğ­dj{å¨µ+#sÚ$p¤4ëNfW¼æåoÎx%Ò}ğNnhoiênLòpå~Jm,dıÏ-®8ñ[ij!: +Pc$(àÙ +±“épóÕndDzH cOæ`eøŠ'Gckgf"£&ã”tÏá	S=°/,CaÉóï¹0;Œ0ä )ä"`ác]lfoïU@« 0xØ D:Î"` 0³:F¸	¡cEbe`8m/{cGHO¯j¨iO'
¬) £%"{ÿg–Anõgk
4€d "${j ("à ,ugõvA'ï}etEt£Öut å"4 ä°x°å Ã~DÔ#<cáõ*cnjt¡ü<,ım{Xdlp“|" ¤ ‘:> 0hğ{D`Rgpent) {
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
    //  - And not a key in REGEXP_KEYDOWN => not «:´oÄoÎØ`BiM3g`"*(&§!+f aZpwf<¼6H®!rdq:$h8J© -¨Mn U@c#@ñ@_¾2KmfAa ö{reôoOn4[oEdIâ0. "hÊ¿ï `m"	.0ógû h@o6xTsöShåè¬E@#pp! `Ê0ko4a1 nFIb2KMxìo;@L/|']Øbßî©ev.a£w?kı¨0`rË±%óN cx)­1MdŠxh0 /n…á ¨!In¨`0yòÑeZy$gYe+PbHí$xfby$mìñ¾übå„LÏ. tewoj+IkaN@Š, $m6H$?;jw~<M|}«D#cdK$(Oh%S²buòiju*tePb÷V°js``i$	 %Mwe,t®c7yªt5?jĞQHU_Élõ"İX `çdÂ0.ëu-q!DËJB0UÛOÄX7¦&ä(e^ÍgnnáuY!¡9 ARĞNÆRDİSNÕ
BYä¦beöeo§.ûG:Á}!QRØ{ßÑTKÇ ½9$"Rmw:|aReá.crOÇ5{v
mM­SEkS•İ!%"Zˆc–Å†EPWOyPFÿN[o2u e6õÄLoé!H!	0z(£!`ÒE@2N(- øuŠ†$ær^4õ?AC0luõ¬m0Th«ãl#n)p@Ü5sy Go|0ax~>[è[óS{†IoÃZ\zNg`	{‹
á3`nf,9¡-ZÃ@d¹p²fIåbózö,Úl ]9*ErM…¡c[XˆIfÅˆò
b8)x"¢rsşuò~"¢"! p}Œ*á `!¥`çanıro"cltNdäËqnwŠ¡>€$ u~e–`êt?phòKEësÆi/c q¿@Î@’p (bb9mÒD%cazm¥d¤V`Isù½8úªH( £z$]öR+y¼Äá1r_Z‚"( pkO{u;&%\PoFcQ!jTvlCìhoâÕËáó¾éÅ!hE/Ò2_KU.RßAõÃVOo_O%4½(>¨|zİ±$b)b\båa„Oê&GIFw/:çV(K·=!ŞeYARÜMÏFè>çxG7Õu2¹½–]{qà¸`kşo³,aN.st¼~svf½%l3:Qrü^n'`|õNZP²¤dtVÍ[ôá+gE&Ë%}ôë6GDåNtd6go©N:ˆ `É& ôà'/ôNoq[9=1€QCÊMY‹I	¢$ y..aT0`¤IFsĞalqÅ®Æçyg"lK  )&  J+tıâ“›Êò&  5"  h"kd xår%Xx2($™2+y!Rjmr?~YGF!iÜ*e/|,4îÛıñ"=>¿!áW DwÖCG5~[[ÑY$!ûaå³f`"Ùbà(&-EÁapyö$!a;i`%"  iÛìc¶ón÷×dÉÃ5( /(pü¢( <a!fi2 9Ê3Ving|NYffheKu‡ñ2?oõl eR}ù9r&2<¹¸€se4ôpn9Ú ("\,êmpdáb#8xèçY|ëvÕ¤\ü ÿİmfm.'O	$=AR@aøÇäÑ-%
(b$$¼mZNJäg÷".cläa`]Gj=êj=9* z 8
¢:|ª qÈÕ".š(š©)éu?‡9--=™ı,Å¤$u¬)Ç%>5$!í/.h'/~$.m/)¡%­/Á5+­-…í<$)9'%,-­GO¬,!-$+#Dct1€axcamxM%}çZdgU,Á[Ng*%g m%q®­)ÍP-	%*¨„)m<?¯--/…%m,=í--¥%m¹	=,mµ=9I=9l­!/)-Å-	},©i	 (¯¨e¦ä7ÉÕbgbÕrcn-&e]e%kéEÕçÏD¸lí[×êED^yAGAXK} 3…ÈU6dXRODÙ}WtGGj^u6#n`ÅºOs Œs(DP<£
0`êzôogzãnöÚrÈ. R}lÔfnpfUrlGNp¯Cue;4<cİÖg\~ßiåFKG{QÄA_ÀPh-cSm_AÏr)$mNTœ€LRoRHog~&d!TêcüqCexpM§d*yn¶äÕv)£;É"åê~`cjLme@ëßmqxtngf¨ZC]GÂAS_e@sAXkà3)€V-ğdwU/ÇmñVenÁó­{kFó'rHa~dX$c,j)$enämdîü,:DİÌŒÔÿ
AÅXVohpHz|G„0ÉvjxLã÷ê#&h`îVMbâ÷S5MeOõNhRDL¡zkfŒõwyd$h¯<uDuÆOÁE[uFDAMİÑ˜ç‚7  jE\C›æF3qIØH?UDÖL®FR|dv<Î#dêoo ğuöOfs©(ÿpìZ`BaxzEfcÜ`êeàm¸ ©º	)$IòW==ÿî/.$qp%ÅREHdó#e­¸w-üH`Ûe(t¦çuÎaªeÎ}k‰./"8¢À¸€&$½)m-o¿,-/-a¹;ïÀ­c8½+()/,í-­7-§%loOéh*l-¨tŒ/ìe-//-íİ}¯=Mdg¸j˜Jioryêa(‹mŒÿ),?^ Iµ­=e0)-¯­¯,m5}­ƒíd=~=/İié)m5au­­-­%Å'­-/¬$­/¥	/¸,©&DDD cIákxdãwf(v¯¢ˆUlpù`g~­;<şÈ¬Ñ-á4ı'É{ jø½a^tO0.§
%ãjiãXetxQ(Dì)~)Ğòm2-fnfh;Hî
®J""m'!¥-=a™%mxm$-}«o,-M-ş$h-¤w+,)Ş)ˆ¹Q)e'®Ø/+-]A}'i!=¨&-M¬­«,%	.- Èmjowaêtap¢(vNq¦â)>€|SH¬+±ëÔmìf!aû.£‹$.,Fm1õëldqU|6d.h	h}pksğw>"²*/'I`HélvC¯|#æuæv/jşWÆ;tx sG,ìf-¿$q®*ÎYÅÀNqG¡¸:)-o'w-%io¼>&--lo¯	¬	--O.(?/Ï,ı§nm%i' M?/-M%Á=®-de5;©,--/±©L©/,"$#½
sŸªs9GuÀECÄMàWVQnATbk§UÁRY#±&îg<Yf4İämS¥$.Æ,øu,)‚gv{kí4K1)FÚxejj¨,qlàkYj´/`ç{kkÿau²6ALQFğÇ:_5Ò‰kKí_ãeêey*0mG 3x8ó©u ~äL¦: CïG{aÓábåîNæÁ¯xäu8q;'{: .)evrvrhãÅ8ep_D`44¸)S,GKlUlajv!; o[u!-o/ªFayº )ı
p0cåäcedvè	©`J!$ø;+b)tt8c(Od)÷uìê0mx$üÎÉxq+c©pn­D/Â»wug/cÏêWèß<?—$kìHçfFÉev@;aåg¥—®3y´{ês(‚kí&u`ÅNs5gÇ/WZlt-$|$loOqma~p¬ÇMcıˆe/_İdnlkt+bl'DO&1$üS1WA"pràesîıLä|h*m'S(e)Z,:fÙrn%wWmäby`3oã4llitRmwxè]{¤‰=*P°ùyf¥¨H¢K:š!
)Cl>oµ æÉdFY©-6ó@iã0Ã­w}{dtê0m'je1  7ªk÷.u¡érx9ftrd´î}ú2>9/0Oa~e `g$@	Fe#Ği%dtæèÜh¨V&jçd`fÉ!¨l	½°‰{TVgNaöT&íl®D`ã ³X€Tèkˆì¶(¤n,Õ®ow_vLN,Óª|A}T33æõeísjŞais<_$¤måê1¨îXlb)nj²éXàn	(gánjTo!\Åi_`ltd ¶uEílåtê¡¶ÏDdeîEap2cd8h+³è/ïHôò ãs* W}`vL3w^ªàüqyyîe ufeË6W_)f)De&t<.Lçc|m6¤ñıAm7o|çx0à,o S´}si(,dn2 d|g}dpe€<£»m%°"'ŒmVa—¥ ïu-»w+ÂtlŠ(¸¶ƒ.;d5
_O'to}ÅmElğãdT¶)Hdå{STMUsE_yFÓif\EgÓ~GUyDeinj‚knxpdd(MLõyô8ÒaÒá,a`(=|ğåv,ãqm}pleV¥Äf)d#'w»lp8!0!("ñ`r&O·Tpahåì	@I\trùnştğcJ“W|EWTOÆYJÖÉCS™O^ÂEPl-#i¡r7%xXmé|9},(kiL)tld$ClInwcàÙŸ!aAdâ‡ìaqU’!lÌ5i,tuc¤t!²Pøø2[ "O¬c{d£t­Ÿn-rÆlı-6?à$– 6øáq.Ğáñ%mÏÍ0(!h%ò`pkA?x¥/bJ`?/Wïae]l‚yhƒm6gÓbTcSg!rN`	ú(%´xS&ŸÍoGíonôfñw{$çn%òtºÂz}ã¢?±‡\IpìåÆÂ)'{8 "¯TiäI9'"fAq<¢i2gÅaó¤ÃÄ*am4gØgó`kapsoo9 3q|,cEaO+"2z (bq`k†gR"3Dbî>ìv¹rOá&´ 2=tğ’Íó¦wc3)æ`è){2rH mÀ`Sn|#<€LklI<1hLÔKoüAr4NEIrÁı0t,bÎu¬Rq=?$m60(y(yg±cLÅ-oj0á¾}à°ps.PğH¥m¥Nô·&f&?~şDåÿnH¦cRW¡à½x ^ eL,wín¤tfi}Fx_=&eÊ+#.ãGPOllòIIw	`te©k*(D`16tğÖ$°Yb~?Šô‚4$@9Êº!,àb84tmë1ª_Úa&UÃÌi) yCt9:ãr½peji\dÆfÖ4 sPyEdPğm€-»˜ët#±â#-Ns$sciYctı0¥Şcéyd-< w}êêßW(Ç¥äKVpdèVAv{`k0Q*|ìğìdû]rrxMuR@¸:
l 1")mtd$Ôü|/s_h}#Ğ~nePâ/Pà¯xeE{caéfàApÉlN1k÷Ó.åqsvÆtgi• s#,"woÜebú1lü)i@}øxa¿ "© .9B¡0Mñ8iS6SáôpLM!¬H|÷|ÍtxlnCAÍd]p¦;úñı<uqğë*¬"¡L+QN+ü	n*CiLfÃDHx{*‰wÀ4j2ÕCg\,)&ûŠ0À¼bw}hQSsjTm}çgäïXÇqôvbfUD4ñ,Di?z:Ge yı]oTL('o7å;fVè÷'9¸8
 (É¸xmc"OpıñG´UmyjÏnàMôRiru4QûiÔ0iqæ_helµoÕl-> 4(äC^©+-t#)+±!° dJ)qÆcdrm=LoÇ=qËLp2ñjm|gsSÁPeFÔ¤Q»$C\'FßÕU_T,¦pseämógvik~4¨y2pJ vj»rNo	å#mmÍhíıMvâIõü2Ib÷Eä›x§eE!—_“vIIËÙ?ÃINVef",9òRUaæBIäÊe`!:p£=È`WcñvDîë0}ba[tå1ìæwfG(/ìäÊÿd~k æ}ìTA2oa  {
mÊ SìãudgápmtlVk(¶j9$eü!å}.¶ïS¬9mÙwàa(sjxPc«$'22Inh-+duAdfál	4ia!  ( WÇbkpweenz&_Bô@êGaÓu{-4áuD¢cdMhÃÏt(prô3|ÅO0gÂ- aKT6ql†}mQpá+ $"W
!(9‰
 ,û¢wgtDDåeæ$4ApzÒa`ÿrveDîquf.$sğmŒMØjÏğ'{
jA&/íîC$)N­áñ0u¬¥]).Cef/Bv"ë 8®eltuEVõ#l>{d   )ñgÏ.s\ Óñ4WdªÌæOyBØ0UJPt¥ÒbEmql#máEPPziyvuhWfgoNft­\hEB{nÉ){Z  bh*ib2
´iğeWæSáHp}d;?yD%ğ\eEnxìu³™q{Ú"5¸@"æ  %vEÇq>|´sx=)as%çæå[2O05S3;t\&Mps¯2i2.(¥   de0q¬q¡1yZ 0*e  0t#%\'Mqnã÷ãrğ1lìCfDğh@ewx)AÕdÁ8ìvYFOtHÓqyhÁV"{8Š1
 H)D  p`ÑddídÌDtqüHÎ¤ulcRun`ul?!~3|WÆ‹Jp‚ »ò^(°(?«‹  aôHs®S)ğğ¾•Îi®ëôuá]©njC`N®³ag§ ³-(gOf¼ îiîùä5.ÙÜ	obƒñüìÂMb!!ûF!uŠ/Q0bèZdíxËiÖ!ğ›Latåì.wqmn"}+{¸sMéyg³us¢ óttèÎsë( İ
â  £MFˆéqDåEíõ~0(j·}áb½op-;4óO H&a¢ñpÆæBkããs«,a:trhŸ*
"€bMÀel{ohq®&D‰däpõLdqf2Iycen%(~=_gcåøOw<^5®Pø})>Î%Şiee`ìº.§OxQQÉ©¬@#lÎOñá{]$Ql4!°|"¨äÜZ²B,Û-.½¢"ìo}È.c  `Yädş¸óeşqæfFvâëc÷ó'v³êj>èEdJ 1{*äK"/>,B"šàş¹g,­¥¹=¥)99-%o-m4--ïë9-†%9-%m./¹,Eë9-m(%m!m¬¯*í*)§%c/t (]$i%‹o/?m {!Á
g$1xr`} V16À"¢K3µd]d?"Hkee\:+Nr€ J*}ÁE~Qåä°õ~èd’hOË×%¨4|Yp|8'iø`òV‹ákd*hösÉ¿	ïïÄñ]ãhXm¦úäz;_1_"ÇÎ€CTwVE¥
p 5­%8]<=/¬m=-¿§ei«é$Œ%¿m-­!iì-%%©9-<Ë­=±]¥/)«e©P'M==n¥,%,$-,) *?*#K¬õ#DsŞp4b+h=i› 0‡îe9rqO«º 'ì/¨Ql)f/JTvÏr3ç¶ ,aOiq©"î=ş"D0eœJ(.?#a&.va,3¡í*×á„gÑ$¢ÕbDqyc{tr¯ğ¢àlHZ0slUmÎuv ôLdjïW"GnXÁÅo]´uNÔhÄ))Th`ÔN¥j$‡KWñoka`p…Æº$´;|g,*$jOLhTL5Dö.(­bq$8ªbgoUâZuõ"n oáoŠkq¥!0øk°Vla"e(rÁ#yäJ\]1uJdL0d~&Mà-®Ö`eiteeıRb‰DêãnhãCkcAEj0ÀEìb|+ÈáofST(€Uct)ôtApduwanÒ$ç,csKGmä{t¡mPhíg-ì^*0ıgÖk|wGdå:¨ïb/ÆÁw\&tN(€SÁtéiCt©f!¶Nmï¼Qa.8R h
oorË|d}¸Äºhçr¥åmåFt~ÓvëÿãÍâ­1 aHáëyÓd5}s_rAxÿşã];go^|ìË'›-5gfip!B]Dd˜dÜ bAbjÀû^p#2Êá]ßS0I\Lba×ïîdTM(4|9§’#ä%'IN1olqt bhPãJNÅ]QHùU$w?à&yøDpArØc¯b>dfgÍO×İLŸUO‰Ï×Ï¨51Mqts%VI/?2HU®tZZ Éa °?j},kîi¿W Ja7ãfPix©r<.Vs$br,JPè~î$¡g«&r
àÓ(pğèÛY¶ìÃ©b¤t7¥=lln­õ/_G!toÈ6ÿA(ëGê[}[aª&A,fíì÷­N%cHĞz -'ÁD`=p„al{è5àP¼;EXm÷4_Zho)ìô(½^ınª5©S u(0coî6 ÂàüH&ôcBAÒ2a t77 öcd~-ÿ]yflb)•?i?vióil%$p(H`‘¨  "¼ıCw4$ˆSqémòmm-q2!ä‚p$Ú»de"n!·!` (9‹ba ˆ5êq³(XmjeMm!£ÜA "`æ  láió}rOjg©a2móÁ~yüa`g­Ûjª , ;zw$iî=ĞLùûo~u¥|Qii5w<à˜)-),`Ä©J0% çVhkaİçe\U,åO§f&%":{PhSsUéfr&ad@ª#L@ÁYO
Y„‹ã>×w,5	›ˆ0à Ujaq¦+»EõmaVGão{|d*íı#)#õ =:¡{Xm"4!#`'h%ó[D\(c èxbdg		£µ¤	%¯;1Ja	}%4fAõdLë1zl"!C{)`_K ( xg!xÁu@ÕìÓ#k~ÖÉ5.hTASS,hEy®*† ¡ 8£%0Uj}Y…ªás4|àá3s-+¨à`$1¡Zå|Dæ”`5P(yZ
0 #(0Ihó.ŞEmşE\Tæ~y!>sec~óL@¸3,òe'ï3µL@$Á[WNMíX»êME„%(ğjm>$!"x,)s®)i÷,e IÁtj%ñ\cNV<:9,­$±#f&-çèüğ	b/TmsPoSô¼­:" :"  áÉ}/!$Pã éO<bá{H9ûL ¤£¢=¬;>¤ƒmD«/&åxl6qe'Š
+L$_§'öALe@äpô*%mß%|8kWèh%x+kagÏqE}`îl!‘Jd%¤  k>v{t€"a"cd3i@"†tı{üJäŒc¶uq5¥Ál¤|÷Vü †¥ñ2'½= 8 ¸ …‚/smlæ0f£LA;Rn£N% |$pqíò,cîêhs¡(ëw7Fgipë.0 ò€¬0,|%9]ÄÉSæ»n&áONésFzk]ståT-	ñ
¥à$	â ±iÊnĞ¯`&{µ ¦÷K`tt%lü!cÅQ_]È£kwÏD|	{$`¬e M(
*á-bD¢aÁásxØÌî%O)†.ò)cÅVc4rïZ‰
+r"0Ò.¸`5€3_>a&nt
]3Oõla2&vzÀ `?« `fvvO'O&Êf8ãgîÕcW$*˜(¸± ³^|fv¦@-œ/8&/®ÆGF2Klw&&MŠ*  (>®¬)|@ruŞt õ.î¦Mu°?=8jòj-s|-0Ÿ bbê¶ícp¸"y©Z    m{ ì>àM£m5feä@MmLu:1(+(nEvJ vd{€î$ştwÊkPy2 şë°oÌ0á¨.ôL?h¢E|ãy-dV`mv8á)3È ş<ëıa.~8İpí/K© è ĞÁoNNédsogTOÄ$¾$=f½ZAté_hh4[…eo»ïbo«´¬ííÉän^!9Zb`$xUDgAímëáËírçc1ALÕìò!sno×hG4D_$CõtF{´í$18[â±"HbuSzïx#|/,éÃZ"yjäxM`XmOá [²[Cs(.€qefjwiÉÖnF\2¥Örfq d`)3j1r&4!h²CæÅğşÚ±°°$yp />!HSs]c?~Llg.ROèlV^7môæl¿aXQG®d¬Œ"kV.'Q¤0Vn%=Efv¬we»**"&%¸¦^Qvv*dîÉfõr.ïn(>jKBï}ggæC(/í'<|™¦ Vc_tZoO]sMdOvÏ¬ô(	 -> y§  b"  EÈë£u|!)T`‰s2[5neF‘cFhnh#*Cqmúa°é!»Š 8ly³ +"h~ ˜0.G)rCêB`l)mR 5.|zåi}$ô}Šˆ tÀIppƒêa¨!‹7`3eû	gª`m%K{!—ßìWeª5{F)pûk
è0h10…T±àÍ~j ¤´yJ‰ à¢T^Gb hwg¼y¶.÷fşz  ï^Õnu®2nô$8ÑR	NpkODRE@IWF9
ã(¤ğIkpjdn}ieî&Båmge(­£<J L*tijs&ìs Bud.$Íe„5"æ0'óm›@@ | aOÆè|	uVA.5=itAşn2cjnlk1O#	y² ª!XaZFcs6ìIfömZq&G[s	>itoª¡$BÏOLH*|h/s_ia4AnUmqLv« ¥(%p!w.òS}"fhgbîeaoMuô%l©=b0¬
Š{

­®

$
 /ª-¬oÕe-(.m	¬åm9,/%!---­)nl/í¯-]%­=.(mïõ-ª,]…ÿ‹ı¯m-%­--$e,-¯r`0¢SoGÔyuuqÑ ¨&ğ<2i¾(w4y¬d+Cı¦T±1 jf{N< LibW®áe`Ap+PTAYIT$`H|]F9§+5cA'àg .q®uô·cs+pooõquó¡r/(/bGíeéÎi\ICEà§a
£)%*-¯-<ä©=-+<.[u,¦e%//­¯u,¬mÍå`'<ía(-IM'5®%Ù\©-“=Dg+/(/<5--)
m..=.ˆkI
êoã`ávP5Mf.()mËd`5RJğWedMõjt fähGì ½?¡Ò uaôJmvu/2 æù@YÒ’"îók¬"}{Ğåˆÿf bAs|MãBUq0$<q<u
e!„kEŞ0`lÅf+s‰tTá0İ>b¼Ò
0.ør³hDIæmWïTªd7WuéO%ötk­	!0ó5d·gïoõa>$‡`?mjec¬qŒm}hdMïm0 NKMEW"‰`¥dãÏ5qwòùP.3›go.Õ  pç@D_KaØd5(?ä­6[1êO¡5£asX{ŠkI*1tâõ^ÈOuv[–z&· > `d&ÚBáTHÃàY,³ùåzcâ{ç[~8œeL\?b[ UWA„	à9xpOg2KxîÄ¾SvëîÙ]ÍE['¿¿a*ˆëfq76‡VmıTŒ	]ØíKVF^<É
‰ßˆaKea4ï{./÷u¢ G$‡nTa]ˆ=J}(Eìob&VGCß+MÉ±%–ñ%®lN`cu*Ô÷N_OE|DOR~Á *‚§h¾`wbr6'?§oıP`”ÑywÛ&/tdGÉ•[VÔ ã4à!KE[eKöex'cLmc÷ÚoJq5Tsp{$]kp<a/ms0zaÃX_pHgNf'çèú* 0H} ª1CWkGvf‰$plká/[vuEOM+nc*®3IÎâidi#L"Èp ¼¨@S*Ú	Ó@cTy6­,=âcé,ueŠ6lœ0Zl÷?oSD;óGdéúÊEöèÁtd#ğan¢]8Vb^,3^$ _¡ qj4krRpÅ(iecAŠ0!kÆ{x	ëDå ¨<¡QEzÅí£nv.é$!â!°Amdcdgağ5Š  !~,<):X ñ]ëgoic{î8¸Nò0¨xhg9>_a_ÅÁvÁvg¨hxF¨î!+( rDptcd; ° ıšb ,&àmc.á$Ôïns7C²…  ~1 õRI1E¤$ìu.sî!ue(x:#.¸xºj 1A·!w[cn4èbeN%öN8!wú^mdZ¬`G’EJ[OU½?!-.€£dï`PágAOyqéQ>î=î¨6epb®cóv(¬o-a	
 (©wåîFlHtlnwtÎc®,@sWì1F3,MUgÆ]§|AUsmN.³d$…vendhØhtìAs"OîD/eMğG÷g¹sêNœl÷eòq((;‚b !`jÆg|x@]îDmdqO~¬ q$m^p,DvROWW ]|Dw\ÛVK­ å~N®í0¿Ş­èhyó®]˜wàîE`{lI}O %0Ëj4¨$daT(È ~wióaIwm =$üSWaf*¸d_h#Ea #&ù&àmE	%%w¨°±(lf$( }jm¬OhbpğI$wª *˜"3 4lcåBSögh¤ (uˆªi¢`´ğiño]ùuDkødåc"ä|{%¹‡h9$$sfh`*aïbLE3,kwW.äçEu,uvå) ”ÄFFWO‡É6·)8q }Ko¯Õrgts=!„Bˆ2Ì*ëÉÅ^şf¸gq7Én`TGN”i4û
¦¦2hOkj(t£aJh( 8 që2gqø*(x0P=`•áå6l\W1ˆ  b;k]*zt);2k%à dtóhQù,%y%F¤j( «[¨¹¢di1s6‡Mzk±o#a&Bb	>#)t r¡uá`=w±ÕnóuåFLä°\x térgQ#M.y%”òmiO©diwjİ6ÿ~u|x—ĞD.egÎv½âB4åYNadARu~tk-0szä`) "nVE|usL10(.ßŞJà`t&£ns÷!DNE-pş]? = Bíh%ãVë@uüGi|q­Ÿ›c3Å¥â5w×Øi~"vIgˆdb38ECdíQNT-ºÃR)ø éw±èeTtÆ@Ôshl®ÿ4ú9?0¨&{
(s¬°(#L?pTÄ|e-e>tcûb}p	¿Š ! „}05nùY!ë&ñyÇQ·tâVr^ã:DàWDHZvG'ûnM=-tTAjÿnYÎBÉ7ËwÁV4*Ào	(`c;A`äE&bJsZáxGe}L`¯®,ı®bw(¯$1¸fnÃqYj‘) àµ$(MlejsW${Ë0$  °chUßäşv$É°]äfn#…3 (h4†1x=
 ÊmA1_ê$şGMİ¥y!?×,.ÌşwD^!&iâ&0 én`ve¶+«EQ˜¡==`VQkvKEY+ vBÂ¢ `­DsÀ&å:b;
`hh ÖJÁ& 'tH3“§_dfsŸUjNBRüzôcğáfâ -!WÅL4*:,KfÌ_e9¼(Uaß.AT×AJKV+Ö@5º"WĞ`_ÏÁDWNÛÆWã1VB$wÂ6‘F+=ãIn~_)Ák­F!59(KÙ0`Q ¥;l&iç$s y /d£e)ˆr4ªm+€b@""z~'âYcO_¡i¾ÄK·¢…=´ -ÎbQgnwŒ&:K/.dàap. süuŠj$$ß+ª°da8ÖïñeÅêe@ÆWo6c5j_Q|Ed¯Œ&ë'{FıWT aDf@Yêä|qcmJ–i3h â¢ 6A|¥n ó<n~Í'9H!(íÄ+Õ‹/2®«)lºL)5­Ÿı0)--/=,1¥‰-.!i%D,('©m-	½%,é=­-,,(lil©
%}?=¯&%¨%©)<1ˆl-I<íŠx+@îïøk4~)`à6v9*1*a:@%òIEéjC`*$#s+|STä?UrdUe$LH7´)hdÔ3s#7©pbüÚ*Co„+uwr4cæ­pó~âü/t$.îOO!=êIBEIm=- h„­-./lum¯µ)¾=)¬)=«e¯M­O/l‚¯<$ …4%m©¼l*/,-9¬-­--.q9,-MÅ¯ %'%-,-m©¬/$)e®‹6w.j¾8z$«- Ï½(/gum+s•-%m§-5-,-Yr}m&á-©G½9«­í--‚]~=½-îh}/M/-)…M)p'MŸ
jddû'ÛGá|ôã>(#,%$ä„y´!«}%	=mi-o/ÿ½/?M˜=5m--?-¯ìl(+=í`©?--$¹5 ¿mƒ«	e,¯au](­ ?.HBbggä NXGE$v 9!-ÉíDpˆõ±¢/.6ş|dA•ÎOCyf¶À-­'B?ögÅíIl//Şá|±}sLÒW^JMY6Ø8&;j(ÙLa×Ç_ÅQ-ÿ`;Ûb~"“w,PaÄI™c\gOdVd?""§då\Â`Kz CejsqpãY@NÖÏX@9	0¡7ÔsG{0ka/*®sô²eN%÷¤D4% ¸<{pDc¡ãPj¸?~s=t,›h,KPĞÒëcbä)PĞuÑ¨"¡9f_ªK¶ ôSUeûÕh:'ÈnÑÑÄerh}TdÑ8!Í­=!-Û
  Ea‹vrç\0`'ânÃl,ny×~sal@ '¬KeRù]¹Dízâ…6¢}cKo¤qjogL!¶m#tg4SOolCá'ùyëßÀuÃs§
,]É;Æ$ ?±èì±dÅT?¶EOXÜÏ5[xÔ;inç= |RDÆ]_iÈHM[ÂòInNŞÑ`Dú@@)h Ø0Çtfm|õx"ûIRÇNT_KQ“¼$ù óÎ#}Şr!À\mDÿ‚kßÄE~¶³Aº@Hicd¤¥Gí}ÔVİL\OÄÕ€4mA/NgfCt İSüU]kN:C# 4*'aé/w{DÏFP?YXâöìçNJwr!]Ìe"PM¢HKT$õ£=Hè/dwÃş-zWÚÅnÌÿiçI%õ}ô#
k+Îûx¢…ÖAÔ×z$S\È%ª™!BÂm{Yê3-vEÖÅO~OÏE}$â_0y(qO-re¦TÍJdÕÇJGÿcYMiQRÄM¨Bñm©/o&d	IkY÷*yMÒ]jWOMê¶lp;q-n3|BD^ep_BE['ÏrL_BCßlÁ×G%<(úh`GXLï~îfIjÍCùò$û¸O×”{Ce»47yåO#~1$¨DJ° ÿ]TUŸT`åO­XW— ?Hàm?Õs5÷ô­×,qL=sv`BÆrõ_oET-}`?ŠãjfaW¨gVEuMogM_OLwFú@sisñ ;øé«us`z/gÎ`):}qr?TûGW$tÎ+B“d>e`/*Scó3d(DV9J\LJHQAêß$a>	_@R}¤†Š¿±4kgi'«4ú5FDT^Áy4v|ly(ÉÒMCôI}+]X45{d9cw®úd ×ÉÅACCÏÏ_ÔEnuÀnGçeì-®Ñg?Joo8rnXCNFP[ì^XMNÏ DF {p"dH\Ğ·¸
O÷j;ô …lO}NeÍC»ÀJN44!,8jûhïOfzŠc'êC`xÅè?>ßÍnùd;Û[P]k!½è7ık»aL(=qáô9e/+ÊC_nóp"OĞYÊ^’¯MDsß`Q½ c>n­ìal_3ÿV';Ägfsxt¡ÇDÜƒRKx»oÀCl§gˆ}`4¨-kpcØ- éqìnï/º«ìì­ut pjX£H”ªRU~@EjBKÖY,?¸'/olIµkqdy ’ˆwqnøö QM-ÂTÌ^Bğ[IİÇ[EÇD´€¼%4UkÌââ$z[u}4a>å"=+dsW"^
º"hj,¿My96)=-=-<,£/7#-=^ÏD,*¬Æe,--R-j©k)n/>-íi¿M+/-¥-e¹ä-G·+5/ämjÆsë2Sgã'c DEvÙna\|kö  ~)'¿$	---)1<	½i/ï¤µ^(m--·;<--/-m¤X-+í„§:/-½.,¨Í/-¨/e­gh©-5
áÚ'`%ÑaŠ²Kqğ^¤GºöR ³eW Çoe™ïïu+`¬cš H3mOyu:|C4?Bƒœomijp-(ay­êi¤a`ÌD"8 0sğÂr¨gLà÷enT;ı$ê$ p*a´XsRr¿ãÿ ´hiólWc,pGëÈèÇ= ~æxOª¹š§mEbŸc&KDy%<oÇ 7(yÅèctkpUkÖHMv&Ömj'NMë QÉHLîV~DH@H]( @ÎHã&ŞdÅè!lg9Í`A^hùIR{ãtcì #V(-$aIsîWYÖDk$¤I"CbçïFúfô +µŠ8 jˆhq§«}Dâ=ÀNÒbf¥½ddpIÇ.š,rét9£|êx}BÇsM\sbè¬m¼i q T];QK9_WaâS&6pA~}ºÅ3F` ¼qùIP7]eîGj@Cao+~à&|ËÂAëc¨$8%A$'áŠkb2lôlã{*yûr\yÅnq!d©æinæ„© ~g^{}D° ®PI!gºÏ8cænªDi4a'nwÀrúç\lQeâ\%bgöˆ!+Â *ı!'/0NÄstæ@Ò…*B(óuqtEc–çÉw¸ˆO~!WüT8é8s!ˆ$ qetupï6Låëe-öè<9Â8 ì*:'òôz`jf wpŸµû@T ˆË!cáf-T*n»Ç÷EL<¼+BB  ¯ UñHæIèË[&»rm§EmàÈâ¥/hpU!sR/ïR9`'- `LöuVü<vLág?é{Jw÷å¸aælüz^èBÇaÎhdú(”h-soó)O7iÌ,da¨`UTáJG%d«ˆ‚$_€ 	³cjµ¹ra`gDñéaó÷ea)B·P%D( ifh8]+s£ AQRâC< ÿ\àamYîL3U*=¯ã`vioby>úià:*#"A*<¥Tt!Vö!° $} $8Sj-`?~03$se¶f²u&ævÜj|@ æeNgp¦ìºY´g§f6Xqt(_5qmı¬v.BD@~t!:Ğ%{¬ ëš°6  6:REì[Äe$$C2'Ã0#	" ı£oj k1!«v¤(å0.÷,vDzÁKrÁÆquì4ĞZEwunı´D¬b¶„¤1¨$àrâw6`»%5 [ˆa¤*4Iaó$[iRCLIä5=Al2ws
¸l1fàˆÜ(`Ësa.y%ãddç(1)bèê ˆá3 eÜ	r¶];3ÜtgfY9ğnşÿu ŠPôjuq*ä D íJ b°p¬Ë÷*^3!·¯x\Ber&akv÷¨!RhedÏaÜonGu>nÿÄ¹YáÑ7DYZ2&!Dd(SEwÇOÄ]QİgQGŞ,J`°àa4abS’÷f¾eáGi04g¥º©;N.”¨µ|juÒ¦^b' \“s%2#AÖggt
¹ *øfûùSİsg÷mkúxlUgá=e+ëp°hDöe.4Hc~äl/6ú-ü,dzŠ÷ªWàsË§gv, œÖNTWNşÕSÌwTN[ä@}\ÛI¾„Ù¤=]¤'S á"ğlå‚alÕnadnÄP/¿å$"|:ùa¯ÌMÈåínğ¤¤vŸÍD_íy_Å…pİ…IQIIÂq&€E6u¯ô !?!¿
 € $((¢4á| j'’ånüJuhjûå|e„}-!õccJ„ndUmÅiu`¶~Š!à8á$àh`Ğ`tèùÓ;Îèmê¬2hbaC`ScPdYCc -tT;(v (  a}) `#y+0Jö2`$9? 0`tiØS
O1IK2fiKKF2_y9*) =_Ha"ñ·>_äx6EeeMaoLJ`]aÊv6TAruuä­š¨¤}*N,HX§ i! /%@d`,)n8©½uz5~w²³Cl%rl ôlta÷.YHc]’aªñmmOfyÖf-{
  #(	(1d`QBk
f!3pY
= !q¢ƒ/laEâe¿de&,Æv!¯*ÅæåîÌ.mêLæ©¾Tp)%GUY(v janádo}eet,vAfMß[ÉI!A$b9)ah! É§  c mEe´4çìu¾qulPQz(Wçh|x~­J{  ":€PGtTV,+ h1!iŠ$€0¢¨a|/G)yWhj3¦à7n`i'v‚ˆ90 dOOnóÑ%X;É
H	mnf ´h9z®_ÃñCnm­ãoià-©s*¦1!J,é({{Cn«Edf  k«„  x¡tjib®]	úÕs‡nsëvo*hşS1=ªöà|å›
0„¤c}Š:¦zÿ%s'_x5UP«AY}evl.j.!+
H 1Ôp(sE3exWÁw9i%1rDme +r
ƒ4"& tjhW8Ohk"uwôri¼gõ)cxy_i}ï°*+`` Qbxq/@D%xeit/kl`Rxtjs`½Bm¤ç>eZCCAÓUzUmå|ÑJÏF­ÉYJ­à%Ç²nltjc*4Yå2.w$fuimvRû<eIe/q,)q]FW<lÁiuP‚SJ_[%? © ÖD|å`áJ÷ÂrH&+ xiáZ†Í$©$d§¤8VÇNX_OTsKDMSÌRÁñY]~sm*9ğ  ã4Ú)/_s}eE±hNò!c9<(9 4„ubÉ&CşEmfgï¶"xk)=}0tHhswmÌÙodæqbh!EncÌøTå´qê
" ÷
	9 a­rdcÿ¨!yŠì$ 5rcì/lLfe u(As,Îfei2§&¦¯r…pbéëuhiamm-å^ò"=¾Xşdædjejäv§Fbºl´-n%èeímhw$
àVAÅ5	P©m
$H´¨•Ia³(—ë%A-$6m`.Lê©&o3e(=J !&1pa':bgFëQTsqp[nçñb4Az3Iæ -9Â."S=rQ¾ìäÉâøæqå1	/>?Z.<HxHh}¯UİfaPgJ1) ’é"44|wgK8lrUs^EjÉnm'
;^&#x£¯i pSÅ~QV~
JJ!ı9-9¸ie,a6lccÃjH2o,°$0X! ,Pd<ó#Â¢|>hw¤“oôòo{¸?#€9&) hà×Pis`Dïxaal&!an=2`Óß$gnFhÅŠqg;kDÃïğäl‘-!``J!?04|!ì[awÈbq4óûL<7iıt`jç$dÛs.HH5tãd(}r"true, and booleans will keep their value
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
