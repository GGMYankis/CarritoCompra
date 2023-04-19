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

    thi�*K+v��00�b�:f *�xc!�j`h9kk?��`d�<�|e�e<4 �d!K\`W��$4 c-�xs$_i>ݳE��y$yknHne0=hdcdk�2
fVa � v`IkU�.alE�4e�ND��M�St�R�l�j!)KU_e}�A`}FOldI9��N)�Y�  (! 4�-q�W��-�."J.�swBI9hat:�CS�F}DW#�lC"�$�gDKS�J!�E
QL�!'%;�+(��%�!}xyr<:5u�kgh!�0T�leK��pJc-k|G�[b��� (��6$�U�i*%|vv�nSicf� ��aqde$Go%v< ~eD�߳�o�$.�<(?;�I�(� #�>�,vcA���,yt$(e(fE^�I;.!-0`E~�bA��Z$Pn4UP�a�C)+�Y	0%<T�e&�w�&s,�g{!C_
# �nh�|`r�",lvy�f�]�"wASm|<%sgxQ�y�l��Fq4x-edy`of<a	�( �gHk�N�q)GiEo1lmS@#���Ji�\Lt��e<�Hq.~d��a\jt,�U2E9�X b1Uhk�mJ'Eu��nPظ�I��M��3?�N� 5``j��-gj�ጥYE�4�a�o�mw]ZA<��ZPߺ*2 K6%�-IM�7*VZ"�2[F
rh]A>My�r�3��ώU(G�>�u'��{snV�3Sjww�:#�x8��u�`vuT� �,"� @Y�6" !"z���S`a�0O~D/P���Evm^m�hd5F
T�z���`0�(i�.d�9}\�8 M�m^/�h\P �a��h�*��yp0a�ag5G}NTla��@XtCfuRtrt,�{�{ 4 (( �x��k
 �dbgJ
�(`eM�Em@6im?�sc�mT�6�yg.?aa�ym�|ChC=+zH(a�4ID���e�5u�^fsa9�O��K�*c��-���S�;t(y�.��Emu��-d�Bo4�dEne�le&B�Rţ4�)Rdi�a`�ig\Mxzt�� �% z�fn5a8t�)s+�h/�um0i3 �#�H�|yb~sl�5wJ�mMpӳ�@}st&a�mhCZu3�NA_�k�DsSi��/"&F(\hk7�S�lda�dv�|A2c̫<>��j[�*K�D@S�}�L�O�ILN�agl$S������yE��uc1;
 � ���rvfV3hEazPcrT�$=aUtm1-$�`@w�]d~hff%4@;� I�E�nctr;J��` vo"�)dht(99t<2i!�4bkgc's crABdCl'p,;�}�)p:�(A -"㫤S%�0�/�,�n=$vN`q�vvI���:hz�8�ym
(1(* cmfcv(uo}m$|2E����a.uT#/L�1HD�
6
0` %C�s);�L��8h WnBm�H��!D�7ie��Jk2Ahmg|�x<m�+0Z`  `"�$ u�{SmhuE�!UnlAlDKpF�sM���l�)Q_e�|�cav�>[C�1�h B'��B),0gt�r,��s�g�c)�i'�x}cp|�QT��V"o�'�Jqe�C'k0��d#�- �i��e�4 &@(`|A2ߍq\ziN�
5l}nkfO$�"dm`+yi9!    �t(`�(q
e)%l�/�mawr�kwv9rd�kr�`�A�WZy�
KeLIX[mn�;Xb"!"  P�a�Mw�t�uod�C�xO3,����yvv+	EC��JFi?ke݌rPp�1;$R`s�6�~cj�H�nl-Ep�ܿ�f�evjLi	h?^aW#oelr4���Mh�*Hdul'�)2� � !2Z!2͡t����ongcD/t&��1%Q`�8u\sI�O�?('/1(& "�<p���,_ycu'ge�,"t{k(aMl<�gv7l�t)au~�%-ue���4%~r5��0�{b�;r�iI�L(`,e}$��49L`h�(�%m=iDM��$| ��!�!tUrx#e.u}fTds#�bF�Zhqt��o~5am�s�S�	�Bl�MEGWȎS��;5 }/� PX)val�_�
��_ed7N\fK爧�*n}��*s""�!aG{�Ni��n~ �nAg�upm̌�}� �2!�~(^iv�r�*agl��W�Ld���~t2�exs��PT�+3&O)�eo<b`!�
� "�:�.j2^n6d�#0 ti�OP ���kVg��l�EG,L�!�B.#=��n9bjO�	�.tnw�dDKz����/��L%�S��v'46Au�G #+'5rkw6{g�Y��!oq� giv4~E|e�|�!Wn'mon�uvd�<!~#!d!3e��'mHej{�eM�yd*Z�M��!"��s�lC�%�Oef/}�t��va�y{a"�
��QE�F%b�ag.g{C,�=;"�-�o�HDH-�b��l)3{�$`^bttw0` �HH#Ze��Dojt|��sq�mrd�-+\�m�q(��QY�U]E	W��HhU�9 �BI_Hh9PqAUO\j,�`l
 *"DIjfT��d�SEKH�TrdO�(0r�p((k'!(T�!`~�ScN��a:�uu_P�H ,�"�b����"�h� "@}
 +<;KsN3D0�\�Dugv"92W�~��t��cxnl&�)ot��lA_KmoCO�p��R;J1JD�Af��za�_w?vP���aE �	?" f`j%les�g6]e.9l!?"O��)~����K�Ke tI.aG���0Ըys>|fl�kf(1Nl�v).f��eRxee.�=>sC�?eUrd[�(�bo�4��(en]n�x<�fJEcc�/allfd,00�� K� 0��gm�wt�2e,4e5td2=,uc�G���o2)[�|5kt*,�~gME:�)�.h"0�)IF0
sm�U(`��sh*�� (*! 4h!w�a$�z�E��C[t�}�s�dC�vv�jehumgjp�d8x��>�Y{�-�w�:�de[}�l��
$$`%&	 ��(9<Y @bq�
3"W�p" qe`t�n��a��-JGupW*|Y'eubvhqq��IsOP$*5�;*�(�`�f *+E{`�B�{B���dN~tOgE�`"% 2v��ds<;$p `9?JDC`%t�`GgcH&aYY.�p�i+�}�e�b�<�Y*�20`14�Ⰼc0N�b.�Aj`09$`9�!4�al�K0cl)�t�MAmnl�rHI[RSQ���@i�P9E$)�"1�"� <n�?/�{*n�*  f�\g�#�d�S4Lcwt�#�	A5[[B�lePN}HV[�D�0(C� &u
P�#� e,�n<B`d�Bry��T�h�OS)�,5vdz1elgl`a�H&mL�q.4� 1�/�
��u���� �Hf!Z "snktl��NT�]r9	bzEf�`e,��[�f=p�L�'m=qv^"$Dl�>ea1P*'�'\men�)$�`�p0 "@�zw�sϦj�e�=*�V|��/)� !$3n�<p�rA�&!coN�I�2�L# ���Im�eg !��h7UtLm�e/q�zxtC'.g�f$ts�0(A#@!� Ua�Aj�W�wksglCB-�vd�qp�#��%#d7J�%`c�5So�#���E4mp *G�I�Npqa/�edo�dpeapGLvw|i�v��|iesmvW�jd(g)1
#`�bb$�r2 |I�m)g!�3|K`o;8m7S����cR `�� (4@!eluq�_�;dateaeJf�#�?9`cOF%q$�m�`'� x "�  1!db�&(rj~"�go��p�gAz�or(`f>�j��`�d�nhlE`�!��c_ndif}`�)�f"�' t1�͋#L 0"�I!Tp�U["�\�axU!�>�� $a��L��2!_)���jq(�
H�,��?i%/}m�9/�%)9<-��/;,�)-m<G� -I�,+9�/�&.��Y��-�,�-�4V9m-)}MO0�pA{y! PpaD�'Z=fUT@�u}3L�+9-0<!=�-.mok%�<9t(.�m�<}��	l+M--�+�g�/M	5E,k	�m��-M+! ./$%-,7l�>hgN<:�F�Te*t��|�(�[���hJkst{ez��$d5�Zm\hHJAN~Et�d�( ]eT
6Z�VQ�OU{oD�l�m0�u>�h�j(�ٲguL�9?�!�g�;Tw6dol��eU��C,�u�.oW=�y1}�u}���{4(w�+f!�O�oIa=|�e5]R�(ao/t kJ�o,/pw-��ohie�3K�e!e�dxT��m1�7v�nFij��e	v
�I�WaO�(�}x =�U6dT� �e,�j�elg$u�gThVmxZ�w(eV�dt.�un�c1vlTQ�6a<�t)W�!��$=4u�k�& { `� Q�'tj�V�dn��W l5|��)W(�4CM>qj��l�qDn�<df�t�U|AoU�0LRReEh!�Zd9�Z�t)>��&oojqt$QEn�!��U��Ea�1: Q��altnZ�#aje*rf ;1,LC�0'q)N4,Q}nm��zMi=d�/�s4V�vN xx�u���m.|�E<��
 `@ f�L�pV�o�a�}6cvyGd%�j��`L�}@)�cI�ft)$[d`8� �0�e�@a"ddo�G��p�8/Tn~|\I,$
	%U(A}/�8
/*.c��ne/�� �-`#h). m!5,?/��d)+i�m,=�)�
�/+&�-�9�-%5��<)%o��-�/Q(�)�j+{Yui�y`j �-�M:?%=UW-/�&,�?�$ %	-��/�,=7�/�aJM�m/�%]�//e,,#,�mi)1�-a-$)$:m?��Bedq `o���U��,jQUdzy"kMY,i'jQT%cj)=��")��fL j
l% �*H�q�dpxV�~E	DB�Nf`ps�i?
���&*b�-i�	���hL'L)-�/-�}-/k,\%,-OL}�{.� 'o����%U<-(5m�c%%�%?�e���)=-�$)-] �Sg_��s�k�8w0*�,[!(d6gxdh�n��W�,#�)g5�unu1xdr��MU#2,{vv{�?AqPusf�c	�p��#r�kTWd�yr$,3b�oy���eM'�QO:"�nu/����3i%}--]$�-,.,<��%!(��e�5)<)�G�h?I%,m/-�8/*)�-/$m�-ek��\"
.c��X�!�,*+�!i �d-)��?-�=-,ÿ%--�b!%-(l��+-�--7y----�-�,�-��}<}%5-	; 	`p�<S�,Rv��{"D"��-L+'-���-%,i�����)<9�-8�-/$a<i=)iѕ,M?�?wi�L�q/��u�)=el/<�({�[X��g]t�cM�-;l$+�sbf�s�gZ���.�qPLUK_SD�8(- ��/S��D�v#�
Cg�[|�^E�\�S-q`5��vioIPE����`ma/
�WN�f9v��E|@��OJQY dv�3�diXg�Qsk�>��'�gESQ	 �_C=�p!��ESrd\G/#cg&�D���@W���)%��Cso�.�
ckg��bG�Wx61pLa$e./n�4!�RR��^��_EG�b�d@6{��W�ou�s;~�q0�6˱\n\[�kd,yQ��H60gD�5{Bg�e�ZIWLTON��G�Zt��0=8J%lo}���V�np�*uwTi�wj̵�"�9xx�`Sf�.id�r�4ku$T�f��t1P~Ng@��gsF�L���p9�~Lb|�s0%օf5��	OgQL#z�,�wf)RhE�~Zd@�;@P_s�>�7��=h����R�wGem9-G�LQu:��UUO{eMeX$6�b!LgL^���D���MLOT0#5 h�&ABX2F�BF��]b��conSu(QBMn7?�Q`����7#�d`j�@�od"6dD@�J�4�hS!!nw��~}TVJOG%���fnbw�yWgM�vB �v>5�=�an�Z0.E?T_CC�[] 4'��CsIkyv.i�J��bM�I'9-`�"��>Up�%N=c'�w�GWuh��2^}�l	t/�k5{eV�
YQuY�- �(��G��H_YG9ҴlD"
o_n)X��'F5�kDsD[G��MET!�^�w(I#sd/�n�QLe_SK��lݤ9�F�f�r�~s3u��)��`6$UV~LMyUU{B��Km�X 8E�{d	u9elF��OɇM��}$_T�Hÿ:M
ez�|tdybonvU G,C�[?o@U_os�kFd�&�"zh�?�5 s;�UtM[V��N�^}DV�TUP�}`udP���p�t�k�<{`DAL#[MrM@G��CH@FD"i�6z�p md'+ko��t#�EP��'AMED�K�ĝ:H+ pq���0#:%
bfRT$SiASW�I�O�L^BWR,5 �<���c�#/g�Vk|��mLB�H�m� ��L�EvrU&8 Xf|��-&k�b�&F,em�42/t�V��l';*Ch#�SH\�DMSI	�V - 7��op�o��-dfq!�"U�0r)�EHG�P~�[�YBJ�^[F|�`gg~cqy9bsv%�b?lq�#�]ØE�_N[�IB��m9TaMZ�m)end�|C@+!f3m�z�1�D�n�wk�g/@Fb��(cW1�8�q��Ce`+r�6`��x7E*�%g,!߇Cljwh\�Qk�Q|T�TU@z%�i��]h-" �oqm�O o@�Gy.֨2{ivg"�6�Hu�!L@���4J��TnA�OƑ79�Vp2+ $&'u�p�8t� ��T?�m�Zte���F�I�RMiwuIfFJҫJG�(�aab�XL�pW 7ʯmuoo�Bz�  1!rg�x�m]�~qN}$�
aN��p`@<fCD[UJՏa_LV�Vl� �aw\DL�C%7�'3�~c9�}u�k�s4�!'B�T#�]cvkm�?z�M��dbR��+EnQ�{AQF�� Y�uc�N*K (7lE��-BT�r5n� g�ig-�,7|$c&'+-c_\;4�P4���EN]���,x-�as[Vjc	�>%'r�w�O-cra1�$*"�m'�v!{tb�0�{
&O>< Fod"|`&*= {�,(քAz��]$]�\�"��nuODopY>������eknWb�L�$Wc:`�_�E�dn�e %5�7g�%/D*�pmWH�E�
l$	~�c�(`O8pe�#�g$�%{�nrIx>�Em�G�m�o�e�0qWa��{�Pm���B�fCW-TQ2�%,< =`?&�Wf�s�r2_ �z�}:\�Vtnlod_�lu)Gv8g7($�
F3f����`+�t�hDf�m2|mw&q8+ R� ov ���z(���v�.g|$,%�e�T��r!�E������sjMi�:,7_�)ze�,J!ht���t�Ol�-u2��*:9,l� �|#T�6yjcthf�"�6�!��F�k~Lno��xb#mdLa�|��\:hhb	]m�&��r
`""%m�%�--F�-�%a-$)m`A)�'�)-��M�m(,k<	�W4�i/��o���-m=-m�l�=/({-���'5�P�	':Zh�7+N�ri (-o�X)m=�5��5	{$�-��<��?�9q=��-ﯭm.)9meu*--�A5�&�-m?%�m<'�=�8/?� N"'�Sѡ,Q�p�+��e�TdlE3�Cw$ni2O-&� zJ�4kKvrVruI\n0(��mmEMt�gmDfo%)6_�&001e�te��Dw��.t��R0b`!dl+s)Xx�xp,5DY6|dy�8�k)th c[
oj& u �dtw&iEqfD?�&�/"soz`if-:
�!b`�[i{.o-�g�8a�Iy~*ML��M~Ua�cl�t k�/"䜀y,�|)~�rf`d$?�$*�{._}�gct^�Uh�p|)[!#$= %(�wU��@3�
��(b<$txc"�a��5F�b�!o$�!�B!t�vL*Dd �]�<�3
!�A-)c&���}9�j�wddFif�;,7Tee@�3#*�qepus8��b)�,�DqP8#aD9�*1 gWbthc�gg�0ZqC�(%qr+"!!qx�t\�n+NSZ��a?Q`]�7)#`a�m ^+� =��w,d�-nY�)� V%t]�F:e�ynj1sEg�z,-�?�6��s6�hx$u@ ��$�Vڈk��� (m����sc~�l)�q � 0y�(�x���fcN�49�(h+��aCmN�+�xu dq`�'��7��g.j|@�,zM+~d{�~{80  b%u4V;
88q�}*$i ���+@��(j\Gc��F�\�Y�$`@(�z|��TD@\�;/hl�`�n7'�e�koyX��� 9�� �9o��0Sy~v�nD�50EeNxX-~l�� �d�ydb&���g;nuV|%�mzu� eVMt��KW>t��#U�i���mr�#�!��80mf!�q̷�QN�>ie�c%ntP3GTeov%Mr3�P (9�zo�N�~: " �j�
4����%m{4�ReJaf|)|`ev_p�|Ub���tau�N4uR_-�<`}M,6x�(l�O��g/GO$�;�++�^g|�jly�dbcuof'$x�p��v Bonsg"vpd/toZ�,$Av`됋   ck",$h`3.�}�@�f# ) :Jb� "���*�0wt�g5�B�zy\E	GAq}�2i00Eh\p-��mF�a&��`k@`���4&#�
�p'�1:� sy	e����` �"0�d�iS>K�TD�v�_�H0ISQb�.,!Z�$ ,�m"��&Y�k�lj%!1�)4�g��=����Nve4`Rv`c~8r. �@�����S K(D)D�;@etd�a795we�2SR dl�/dNfq�>(plf�`�YUi��6go�ve�k(m�ql�;{�4053ie�Y�'%DeF�6g{El=w(?& �25z&��|%��`b����6m9NO�io2B!�un-5(`��E<w�wq1criq9-4e0aId!d	gX`t{���m225n�o�svK$$jlruqN,�mo�LB%08!m��.�bdvqhs|gs}�d?F���Om/ol.�k�Tm`f�bhe`uvM &�'x�wdz\-n�SuZn]�dEEOK�[�WBAwɍ�<�{H$) ��[\��anC`�$.>dNo�mEN�L�?�9#se�l�Sa�-l�#Q'cl eIDn(9vE6.F�GkneF�vM~��J��,#)tWcmtij',�~p�s m)5�� 4�dKi{&WS%|{5i�:��siS)!x�	*� 1ryh1,_&:�ido4�	?dkT<zNuYEzg�z�9qk0aF�%uE$$t�t�'
��-���is7�a�mnENOr[�iW3*@l�#SdGQ�vImL_mLU�2-{�[�"2(tb�{�_a=fmmo�.7\a{{LHst� D2�C���c��C]e�[^Wwvk��Z@b�0�6��i"�L�kb�v2K�R��;Mm,ed%�%EgUATXRC	^&O 7`�atwEYS�/-v+:!�C
8lh���2-(�$, $��`,i�8i�a�JdmvQiz�Ggy%q�b|� }��bI8��Oi)�h�Qi;t�H~'?�6=1�Yd�!sa��B�
" lf��(,��rv�c�!R�mjt�$$KVpw�< �f�f( p�}f5�AT=qg�4D�yc*_�dtga�B H>�P+t2"l�bq���lgemj��H�#-pjd`-4i�~!rG!�5+`x�
"!jy`i{eq�k)��()`(�t!i�%^>�p`uc3�?�e "$`�i��*zN�y���E?\E�+ ?" "\� `� svtdc/DI�Isa�5j)&}B{���eU�`+ YY ` �4aiw.�{Jh`��E$7>
ys([zv�|�pwn�)kJ�4�vQ�dk�8�rodp��M��*�2b�<�phAu��B��xFZ*ut��M���j8$��t 	5��p�~�Ny��

9$~�Ax�dTeL��a82�`4d�!rooP�%� : �~��d"h�Q;EZ-F$$60T��ht��jhtlz*%~egcTfhLmQ*]k��deKw,-�s!<^�A@t$�z�mqe��mpe%�>O�u
%pk$ +("�gev�fq%fwatl�qra#Mn�g��y�� � P������[f"���k/`in@tm��`kb$a�5oQslgJ�F<=,*'tB!c%�f�abqe�&�cTLM!`r9RYWp��!?3&��sf��mMaol�4DrH�#�i��[1WM�g���� dk{7�lr�\BpJ�B+�l4&$#*wFG�uht��Rt!da� d�Ewicbt�eoxR�d_dDm�~i� $�*`�( i���`_+�#�(�o>�m'u��T>cN`z/biidcab�"�g�%ACIto�a/����w^|�a�em�"/4bf,HUeg| g�m}wE��x/�>i�Fz�!*,#�}��d  hn�.|iQ,��K5Wu�2sw:�) `0�ii���y�;?le�ps|7ip#��9$��8�0 �L)a(~�g,�~t`�O[[�0�am7t"bLCZs^CI��[\��-% 9r0* 4�Hr|_)t-y+<-cl
fSNhC~;riMk����HO23oAMl4�jF�g)�	 $�5�	c��}m�e&��cg�E�0s�X=T'(@�`��yrgg�5�!lFa,r��1���h��E(NipO_Iq) "�d�Mt�h|a lp�-��2g*D\�z/W}UfU=-tn�`e2.� a*�o6M*NXuo��%r�tCA�olv,u�i�%w�o��f�fdſ��tHAT$EM�? al.�-dV~bf/�);Nzj:ZdHc/,v)&�SG#g�
�� �#�cvmgi�4�I��//} iq6�Lf��%F4G�
vOoaTXtm�""�PN�.ini�9li�{�3�~T!4%Y$tJ�0ec):hzZ���le/F�p[>N�j�-�'k�wf#� ��Z (+ ���}C��RmG���I�J�m%&�$v�GOc�-�<��'BM�7ds5��n3,@mfYt�ttzyu6J��`�Hs`��0 /&�#�4�g�r=�f"d���!_tv�y �mG�g0�.#djE�u[eG�!�nn$mW�z%�5r-��e�w0t�bg�0#}ff!v�2h~d`�lgm.?��F�{�(iNf��f)�tZl!4!��| #fv��Ta�N�(@�X4 �@0:���6� �|is�)X@g�mgR�vq�2|q52?e9a�F%��tn�in��@�d^�Vwtp�g|zhnl�p0$�THCOc0bl�"��w@P�g0
 ,�}$9-��Sqru�SeKc	]:%�Pz:cf�Fbm[��g��2(9�hid�bY`e� oc�1a��3ar�\��6�0�rt{B�d$fgitC���M�G�z�ehur'ts,�aVio�&f(#@!@Fl��cb  x�|_vn`�en�IC�$�o++�1'�mm��Y{x`d�(p�p�T="�
� �0]�`,6mr@��Q_e�fv )ܵ�u|||fd>i�'!:��-(:02�lҭ{+�gs��=@Sk/z%�gz|�42��*5s$d|k�w�vj�c�O�Uq�e@Pc�-��*-�t��j+�OV!eRnB��.`D+�(�
 4}��8�H � Pg�p�nduGmwL1%� P-h�*al��Uj�<> 0��#qf:(tL�QTcbp�m:#rE�'W�za�$�1;�1aRaKu�$z+"��` 0geBe{�,q�U,�~bOt`%�R�r�nt�I`` �!���f`;! W!`mfkVJv}��^_Lgh*~d�}Be�G�m	 ?B(a�00r��gBheE|O���t } gDzQnŝ$,. 48�s/Wcj~wIg?7��Pqdce!3^� p \��u@&�xT��u/j4��c�r�nfi�qu�gW#kGd),=GJ�>m�<�i鹉�&0�	pz�����HcDW�`i��-0t�tq?Obob2q6m��sn��-{p� =�h�H+,CO*X Dt>���r�*/.g9��~�:3
i'e(`1yURg�++hb
Y;
�,0a�.e8isb|e]{ySbyuA�?!p�tS���'6t,�/no~I�IErS�Dtjf�콊hfa5x`m6�/odhvi��.n�o/��}0scxbD�V�rn7&v*�'}i$k�l.}mi"~u��=9,n�l�	��b �hhj_���o�v#zg��8iX8eP���A�t�anb��Z)�e.e^%.�E]�=mU��,.F�i2.j9�z�=0�l5��0BGf&io/!�J"`|i&#��3,�{s~c^�?P��� �0M �-����j2�~!E`N�v!a7t�)�mm�t+kr<eae�z�u��pi���454�K'I1J%BFmi)0}�*  ���~ow�$��g�g|e }ht^h��^=e=pdt;�s�!h�~T���r.`e��oe�uf�L4�#��wP*�g|�c�\�zrU_E|}%W��OU"��؀,�%	_gd�D#B}1�eyx��bm  0"eux�:%�!B|o��f�zE
B�:P M8�/^}��|dn�&0R��DdK6�D�N�(	rM3K0zp�Z*o�E�Pl�G-n2a)1k`�aS�O~#%$"K?u�m@�+P�kur!ry�)�*YeLw,7d|p�pt6�N&Big8"($i�qEvglT@#�pl�_~
Qfa�QL)��,#?n�Xo��WNMcQ�^��AD�F�U�D7)��
"�� ��Tx��"'�L	Ub@'ZV�c	GH�;� &(} �#` �dc`-p b�jwD�oX�V&g,A�SDU�efc�*P�`s4!4hSSVn�IG6�ꉏ��M���m!�`% %0$�q6JWb@jP��\AV <
� �鯨-Q``t$tl�uzoI |@$��mEՀ*%a�wse$cvc�x�0"n0egt�u;�K館A���&9&c8]< w0c*<s���-")*C{JSP!hu~i ncatZ/m`�TEaB=qlE�h{�T{j@�/-��T{�O��Fy��l1d$�9�kc'�o2a�)�/��db9��;�5= 5B\uy>`G` !�$*s����\x(�,��n.blaSr�i{�n#L$��+7(��i�gAL�_ Cw�U��-(a� �`���yrކYs_#d<3qL�BK}'F��O�ivD�;�Jh��Gm���Q�x1	�0  y�k4  p'%f;n6�q�n`0?�PEG����bK4|ZD|JP>(UAHG]o���B^W?nӂ$9u��$_z%tIstN��r�p
�s	f� (plq�*�H7�Nu�/=WkU�kliSf3y�`�6�N@��R��1]R@�j[�}b����|�/}Oh=1@�0`�A5�BjӤr�8"{k �$c;yge�``"P8��eG6f\�A��5s`g�NK{~�ns*J1� ��)�$�8t��&{�|P%��=?�%x�umz#'�,,h"�t�`�a.-B�8o~�SEt2Q�}�hgeaNm%d(Tc>)=� nitrmShD�xa)Nt*Wcln`%!�	��+� ,|
	*%� id ���Ru` "$[rb5�,;�!+v~�lMina�A�� c$e��smv�0��q�Pqe�mt�$=nh��n!GU�2#�C w@�4i�v�Hiu./emTE�Np��*�k2� \� �sEhW}r`�&�3Ev,
0h]:e@GcvPn�wbBo��I �-{
 �0Dk~~�4�d�?a �4N~�o���1[n�hm2+�{(d$X<�o1�g�K_^:Btjeq(E�eTP,%CEm%n��$
!t�� 1oora��Ep*9�K�!%$"2S f0����'a1��EF��rd:'jk3j<Jb�$$�:d
Pup?gq<0{�b*
*+
!, `���ld`r 0!XhhB�wC���m�c}$��wK* �ȵ"(J$6�(�y�${�+X! �$ND��:�Wdfg`v/��c �� @:�/r�_�z7:�yL��pl�@h�2�/�g#t{�|�v6~WetO�nSdu�� +(h �H5<��0;4H mN�( 5�9q�n �kxa�lexP�rr�R�{A`�m���6q�e���5�S"NH3F|c0*!8*ble9(}�x	-~caP)p?s0�H� /4/�]�A\gB#k bp  �($7�Ei�� r`�xq8��&�F*roF{hebs:���j�!��!�3yNaee0#������{g:|]A-`"8l) $$�/qjA-E%nco���8  �dyj81 ,}(
��`nt�N0;�/�}u,2*<I�X#�T�BMkfi��#  �" q
"�,T9eeo�#R`I�'��oNbIq�X��rE^e-�$!�4?8,�b�Yg�_o��7'pV�i{�Sk�g	D
0/`QrS��d+N(�Vf�@6by3O��wcG>�ig- 0xP�#� knUS�/R�p�#Jo�n�f$�A�aau"��ԋ�0��FjDq�Ed#Vmd�m%z5.";jpL"1P4�as��U('��G[`�,bm�]42ysS�q�5!Q-,�"V�aE�Wj��f�N}�l�L^mR7��UԪa�YCnR}�` h{,G!��b`Q�Pur9*s�ycA3\E)<#0id Y!����4/-an$��"�{/ $�p(0se�u��
 .�$-r.g ��t�SN�t)�~/Vp�jgL}�%��f�`�y�l�-p.s�lm($;��nlh,wctlf �z/h<g~0����(��|i�/�
�\1|Z*e84o+n�ta�deD`1pBzr_�@a�Aa;Mqc!0oQ�`�k"@:XC�ZRWJ `&��t M�v�avuwE�Evd�-�1o:D$ c��u�(��dm=.?1cROTs\M��OhX<i		#%m|3j�c�}�5� ~Ad7�;�>����r(q9'�0$o/({C�i%0&�dTAud7!:QT5;k�Fs(Qm/�vH{�Ngiomd}
#(�.�}M|���Ph<�dibi�&�fMt�+�+@_8+�3"Bo�+u($ive2�d�qoatv+wuvR
�Gq�eYkx1e?��84�]3,�qC_n�E�+
�3�iG0)6�X�c,!/�`)>d�9 �q|2inm%��+� !$"6F$:e�m:b� v" �qk
&�($9LD t{v��~��iT�c��-�]b)?Jƽd�eJi/�|m"�*`���)! 5H�_ y�r�.��Rsbl�F� �dt�/j�9!�D0��sQ�dV�e{,z;*h!�0*�>�4�0$(pi6sY�n���m8+1��&(�e!3 by
�9aw`w�4cI�en��us= �F\v= �d'`o. )wv�)�ew��?&�yutos%>9DG��O]�SM��50�Fh�x �e�\<.PYtf;�=&7jx9���/�-e_enP��t0 �� T�VK�Y�3yk�z!��&��tu@�� � B`-K")"!fcOz;wbt>g}c���!Jo}�isgr|mfg+V}��dSA-T�BHX�Q�W$G�K$[)�#+���2Ryz��ě5hp8�$om$ &d%�ai�yn�eowyP5C! =�\g�{�h�"��($�(eg��S!���u�xp�}0&RMav? l.e�t�vvt��g(d)�fxur[�-/*Jf�*� )j�$h �uux% �(Bkc�e8�6^�f�*�Ziw��C�e� +?�2i[u+2�d�%g".kolQj.�t�Jy���#&|�09�0i6`�!kn* v�Yx�vQ��r.��$�.�(-)�&"b�o�4jxm� �i�"��K�0d �ro-muP-p�	te1T5Pf5u}!v�a;�0 $!)x5�bW5�pe�}%g{(%o~��zT�KA|l?wA��1�rF,[:` d" (*�e7AZf1${@)!  $ �Ja|nz���.4�l@x5h�- e�sl�;�iyWs�f+��k�#+<�1 �i� �b��14$�s�n1����/<V=!s�m0m1emU�U��#_�eauc�pqzw/�ieJ4;�+ 0E ,
&iF �-lho;5Đk|L.i&c��`gwlc�t�|�UN�c��~Pi��9�aG"�M|~W�JNJe�u\/�fh}=� �)�bqel'b��!�iqKtn� `teg/:yy#1lrdxw7_bol)ie.mt��n�c�==D!2�s���� n&(+y%nј`Rme�%9i (%d� #@ �ZHT+@��;�� �
aj} �.*Pb�n#��dQn��n V�p�qmAmql�,3Dy|�fBh�N��+��^-`t�"NmN���hck}� �nl5lst�E}BWn&�qa`?sE�xe%�kAw�0e�, ��h&�s�n\k�-�H�>ej�kv��>s+��w�e�U�Pga@1a$ Hdf!=�f}qea?5eA/�cYs`v&j�fqg��ODY2%u �aBt�F		q |@7{e�D��3�tEsV0i�pxlx}f�!�gJ��uz,+h*D�wt	-�GMfMe�S'n���g�p�f;iy���0#)0!8p��mqyog$:
 �!�1 {�K  21�@ �qOr,`t�|T;�=be';!���c� 3�i(<� ~.2 $a�azQ�wFlDw�as.C�)p�C�i/t�= hvel2;[P�<( 3.̺�*cp8o�JHн8 gmo|oyv$^�exWnol!~yv�i�m�d�%<T�s7in��&8a6�
��̂h$K�t�b,Ge4}bmvd���\e,-m|~4��.(UjCm(�*0�g(�uvtP�8nu$fi�nX/znY���IsT�xZa)�ɠjt{$uz�|���O/oj\RW{tDo$M?(�l/���a4h%�`15bc�+e�,kVo@h��}I:�'�bn���z�"p����y�nov�0Mv'-�u�"(ub*�$$ w/ @)�!vn�nOUGq���tmk|�UlXW*L�H�{�b;^ �o}v
�dZo3kO�0W�Md�~q� ��jg�y�	p��'�M8creA���$(���@8�)�	a0 C� "u-2��lr*�1�wmqlo'j@�ii|#j�	) �++br��Hj0zmu E}��`Hs�$N�mpe�cb�q��! ��%�  +�Pf0[T=Ls+&+�8a1 k"k o_~p}�$Z�4� Q�pj?Un)��m��^D�$0�/�	��f�\�,�r`��db� ��r�)c@-�.��>t>id!�c'pA�snSl*)hϤ�5!��k@$h'an\GD�pE|�qR @�y<>u�|�e�Cnf.p{�ge�*sa'Z`o&��#�grthvﭐ1�%y^��FO�E	`]�OrlKTf��i)5�CAP�]�I�42 �� (��qnv��`y�7=�mS_�PDo}�_KGAv$ �w%b�(S䓠��t�QbP�QSD_NQ}��5t�LnjeaZe�q*#czQbPmd��}�����~+I.�RCGE��?*FMO��$lE}�k�t�nUw#fjo9���`@�`e�ep�cN;Z~`d`@h�a1"�sfs2&y#�svyvb�$dceC.�x��Mswak(fMb繳LE�_MULƟ�@MEw��(Nh`!!f4!�cIarm@g v:�u~}o=*�}ya8=>(@��B�_}IE94z<��"r塌$���te{�;/n�&.mZh�"e�e�P�Wby5T��b�f.m|T�( &�& cc�Me<[}cdIz�p1oa�Loo�,+* 0if�(Qc@ow)�(�`/�H�q���{T��.�9w`P f3+� "}
`0  b'ok�uf�DqCC4'BEt�>
�sv0ao-�z4S �w:�HV�R�4'tY�WGGJDM+9)A���z�c ��!tdfCUsRdl/0�eV�slt.4`Iy/��HWiMOAE!�<b��d38J�oc�+er���dDH�q^CR- x*%�GrpM�N�e�OBa� �$L��4dfd�c'QV�wcE#Bq�F��
e�A,�c(e3}.�g�aY�?� GWFS�e]kXY$y1
`0� @oJ�%�k%n]hB-(+"��8�$ R�t�qL;B,��3#"���F��w�Qbu_5y"�� A�O�m�KgQH�{mz-kt nEQ �1%MRB�W�Uw�zJ��';�" !�@�W!8#a{�eth�, Z1$�a0�0i�u妣M�k(�O�)Cn��Qs��]n
$P) L[�C�angm�wv���k���t�VG�(�f|lym;�1 ���\xj*?)$#�^
�a!1i ,�{A`t�fH tt&W�g~ɯ�X(9]8�R�II'GG}�N, A@ Lqe0~ocO��l��bI�jpzL��K!��@�J�!u�F)*�8�ڋ�-��)=�y�%��)&/-{�?=57-�)v*-�w�J$(=�9-+Lc�x?)1�L(=�4m-��l,�-�J��U`To�A=(ba�P��e�`�_��d�#,��-i-	5��?,b,!%�/)-)�=,!m -<��e,@%�)�k�-,�,-�--,%-��<)��=mm��%(
/*:�B6��
��dlarfo.�e+au]iv<d@��T�jG}DdL�FA[ET�dj�elFN��RzDkHiS5�GSZ�&l`L}}15'4s
ҍS0x�Ieq�kRnh{f Lm<);
վ%��H%8!���u.($nrd!�qN`L��nxKCqT�V_e`o�Xq0�U��GVAEZ.$/vd�`^��.!zi��mYg\�/s�H�&-O}�2�Mvo�$�odC��ZLo��bqO�LS$'E�&E�mMC[GmH�HQ!4r$�WÍqv�L>&k�qi�ͥ{�s�sxM|էtZ!L����?n.h�s�Dd�5H  ��NX�_tsD��\	<	\�TK-�a�o~��n�`�eS��>Q��?a}N�jaKP�E.�!FEem�e/uj EG\�$*Kϔ���Y��	%6 W�^ENr.TG�|�TO�wDAnY?�b5�ip�O� :KuO� y
�"f�X.u.��ew �dNic�7n<�++� �tr6akWf��9^ozN{e��Msa�Cg ��I�)*��g|�!�~h�(*/N�;�&��	|�g%�$i��, e->--�i/d`m���,%-�9=$�/:/7�%Ee/*%-<o-<=/-��-�<5-J�( $�mt[���* (=-�(��(-�=9Ō�!,/(�ko�}m	.m(5/,�}�,=}9v,<o�mm/k�-gcB)-�/%���
 b �Fl �`r�v&w�0l�nf�U�r�"v.��/If)bS1fp�Aqe$R�ig?�8�**/dc�uZ׽�wl��u��}\L.pgu�o��*-����+T$�m�;�%%),\K)My(--��)�ma-�%�69�mL-mk/-���$=N�%v-�$}�%e+�%�=m5=�,�-"%�J
��`�pqH�s�d8g.3n�U�`u-cc:`L�i�~8i
�e,i�t�gwD�Fe�c8F�tq.(��r:�;=!4pu."�-hl�}6���mok5v`�/
L2>�`ml��I�E�Pm!�(!�)-%') 5j�?#�_=e%$m(-mv�/(�/e)m+l/�/mi-�-m-=G/�'/-�9+m%)fg<�ou/-��57/+/f���C�0�V]d�XL@�RJ�D@�YH�0g6d��Dd�V�,8:f�,�e)j�ud;)�".�[+k�mg�Gqa�iC*s�t�Y�;�igoQ��R�LKTgr�V��QAXGGN|�HU"*vr�sci��e�g2X��e�"g#�@.e�d�jPl�!��"cof T&uJu]P(i8?� 
`X	vw��tqaŤr >$GUu%me.\�r'`�{@1E}K*�p��p]��|j"�"S
! $ /'hd&��)?�TwpmHmv�r�5�>E�ta"lo;eH��q�Aoc.UmB�EZXMwiD�o{+)l>�`wkd�8�%j	G#�~x"[�(D`�WOds4�'ysiMt�41u�h8}:m�`q�)o��e�bc͏�!!=�T&'�cf|W�v�J�+��*�npus��rvH�Cb>IFdg.y�*�8��Pv�o6Hk�moo��th9+J� ?��b�hk%�` {H(�"!A~��p$)���0�d}is&��HDgi*Di h�"h-y^�)!p"ng�v�Qgl}�-�"`-nY>p�T?*&e#�/�j%d`nt'�g/v�O�l*u��hd�j��`��*��voNl�AK(kbT}
&d�`tlc}*Iggd�lmi]N}aV\Yhr5�z(ty�r>;,4.abL<&�1MdFknwR���KlE�#<cuarwu�.5$ �aa=Av�t!ADpFuc`�2rk�1��>)jfe2�R/�aW` �fb�qt~Mzi)6k(x!D��>s�`��@lF�yO�ctih�He�6exjZ�7bt�t/h�RyBBy-Z�i&�-#��%�j�uKDiQK`H6IzW$VQ,lgg ToH� ��4nhv.Vd�L����pOppPBB�d4Qh�͜GnDq�I:EN�S_�T^�'Pa0��~��oKax�}�cs��s�U<�
y!�+����pF�10d�qRu��.!� �c$-3RJ  ����,���_�+�}���W~xrKf�և�hQEl�ZpFZN�T{Gq4@��TFJT��-KBg`�m!,q @�wad�qO�u04_xl��0=��ae<Kg|etupXpy%p�)*G($-k#;.(!8�*Vli�b`hgw�Nm�wl��{))& �V�	`�O�b�ggx�wq�h4����4]*�]X>�%m;�<5�/cve#glfs#���2�2"U�s_�l��Ev�n�Ukl&���rBl|")15�q�dw�OzO�}�. O�e�|jn�f��T�6x��Vr2t��a|�2(`s�|n�Q2�p<b�($Cusia �2
�6C�sAB.�s��"usSa�@|:�"dp`cj}u�na|(l8??ap,`C/�V���+<i>� aD�p��e$�Aaa�`u`gN#'�j��58�_��� '`��� �`�iBj�]%����Q#h�=�VX�g dC~DW�.)ge�ieu��~�fl��nV�ci$E�4W)$�Y*+��o�(�g����$�y/ z""( 8p4 pW,Qq�3�2&(;
�u������vpB3���?lH-m|-o�@rv���qMe.q.'��~r�2^il4HRLp(J�cT�%#wj#`kpf�4h�4vJU�h�d$�&�f�owf����j�sUua$I�E	@�%c~�9�ata�ux�o�}jЀ ��a�H�e-�.{n<l$z!��le�rG�U4|9afB�Nl&psk*Naazg<�q��edO@na�auc.`5am�MTqE�)�qXes#  -};:+�a�L�M;�W@���yMaj��A�A|�oK�lD6!cx(r�h9gf�~- kad�ak��k�f�lnD+�!�2: 05

�@(msiPhp {�$! (Vh�~���s��A$�Ifdٰ4imbw�m[��Hi�.�%}em�t6< ejv���Nc?\ 0,)Aj��3mEh�!}n<B����he1"�<\+aK�_q\�o5o�8�#pg �i/��(g�,o�/"�`�(�d�a�,kww�A������A6pҫFt|`3,;E�^P_�H:YHkOLA�T$Pc8f`NW�hg4ԫj*@1**~mhf�S�euHTEmg�dgvl��w �)0g1(�TĕBTO �QTYa�IC_lhA�,`eo�BwhlR��m4��{�5}CR�"_pgrDK.�t�i}t4feBur�Keme��{�fqh�A~Zgy9��J�a �WOnu`*i����v�J}7N{Den��gn��;��yFQStqn�\�lp_�& `��i���xgY�vVe�+A	,GFH`9/�O��(8EDlv�v��e2`i|]e\L:K�hc.g.a�It$�Zu�">�p�!g9uj�G0LeU5?�!0 �8}̀" ^^*��Ul��xo�AT�d�F5s�LVe��4_r,��Z�n�2wu��y� �0pNjnrf`eC��%�qUIn�a�h�Kc5 ]eN���^b�bk �`$�13o+s}(vI�s'a��HanawalDnO�>��ET2aAdp�e"uT�fL4lQ6�<�s?y=u|�,};�j2 .}^0/p5�dK��vML}�bo{&u�s�C+��5;%�Z�u�   0�cl/�e��(",�u�&�em�tDr-�C��ihv}`%Rh+�};(1�(`#M$�lqe)[
!�IG`2�6�eauwdA4B.xejo'm�Pv!���bA*Q��he|eMAFP.�WL�(�P����#.A)! ಠ 4L&t5g8�v�i^)HrD_p��o��#7ame,><| P`�u
�(3]�
* (%4Jq�scpR�{E�i~5(Av!m�CCdjb�o˪e��	|oz0�Ak@H�6`s(ntg(lRabI<(*� @fex����i�)5]LaE�}�iA��!Ы�7-M_c�nR�)yixl�a#�9)�[��C`m"��)e�:u��l4:o!�gS�ow�))��T!H�(S1Lm
C�j!�QH`K��{��0
20�}�cs � sb: R%�dbTvBg~�&#(Nl-���gs�L�5�my�w�U�ulp�NfNp��J���o9n�M��7D�( ;J0}&(%`i�O�ej���tiog8�,���(xw�,fso!|nI�wr��4t��#)<6N.�{��~0�K��L�O�٩],-|��ee<$M9<-'=-|m-.
e�I�y'-5	cmm�=m�#!O-c)뭤=l��	.K4- �O	P�d3Q`(vnh1�1j)�1�nMc!{ke�cЎH��f�0�r�*Vex`7
`E����Vy�ijp2i;%Ch4�}"�k�g�gbc?�O�3TzIl#c�{w.�qkj�U�Ce�)�IK�j)�)��M--9m%,=,1�;$h>5}-�)�<y=m-�%==�k�?%(/�=�.�,$m-4me�/+$9m-��í�� oj�jEP Malo|-j{3"%hysbFcee� -n -�+pb�$�=xT,l$��s�l�`bh�:$^6}eH*k=O h0GqLT(l�7fwS`�hl�x�iʻ$vnp`�����rUm�#%R$m��;js!q�a$D=|�B�(uo#xb�)|c��c¡�t<u-:;va-s^�hq����d}T�t�b.b�N��6!/f�ig=��� ��8ceuwpU��sM"�j����A�LhEr ��fuPeN|�ilC*�~l�8"#XCK�pl�;Kc>avE�l��;"r�|�,M�gaQ,d��c�$%�+�@"cv s=nAz&{ %�r�Dg5%���rmskcm@20�rNi�!�!>\d-k{Yzll�t�*`%�my�q.�x^ o�(�|�nM�u<7!�5�eNekr�{4�vd�;6<jIbc )�a�aflb�kKm�q>c�)�|
Lf+.�P�K�-Bl�Zq�u,�� m��-{hS�u#_�sI`Q�D�sY�PlG�BUV���3�?dBFeG�#k`wT$CDrK^N�8m?SM�	2=6E{�=i
��p4<��Efp�yUCk��b1��=u�zgtn���k&}�NM9$4��fZ�L�a��aJ�wQ�p _( IO,�}72�$�0 o_f~)c(`�
2j�,eQ+sN��g�JC4� tbeS>zFu4Xoff�(6^fjD�8"��wN?sNOm�unOrEg0�BbCl�nK/&0�(
ap>[Aj�'m~P��0��mz+�(�yX�2sm��9c<2}Z�{(�"aAj,�@Q4,!So\atjDi�/��@C�i�-o(�A"2 �Ř�udq$b z,c)qJ8k+�8 !h�0qB;�%� i��u>yCFs`en�j;��"a. �$�Is��/�	g,�J� gE,�0olab(!a�l�	ve*t�lQ+7�s�Ǩ�i$�yanz 	m �~H�zd/U^��a�n4��Mul1!�iz`&�f�c.�k�B_tS��Oٟ[B0
 ��*(s�WU���<E(8kd[`AK.O"i]�!+���!�Euu[�p�8��jm��Bix[!j(';�*��"�9�L[����N#�3�	���!1qf�0Biix.B�g&bmdJ�')31"IqcVv��`�"20W}�'�|!83qv�qsk�-��%$�+,2�tw�.:$ !b�
~)2Dh|X/:Fwg4��Je�ph<k��X<lict>r�,mwEh�Qc-v�eqRHO�n-I+*q$(t�}{.GAmt?#|%�(�Q���o(+)8=�(p
+p 0 D�j~mR�lRq&9?ˠ" &X6��e't^Q�"�l`j �k!�R`4��k	 `�"'�+H�oe<jj  ^'U�e\G�F>L�!0>��&��$(!p�)x
]EeU$��}�-*0("` ,Cnn[��da��D�,Bp)�e�bum�n���lMa�gA�e�f��"'�is� x"P" �h�K�mP�sd!p��O�%�tB�s7c/��G(�`�@�i{��E( �(�`$0.��_#jgY+nf鑡ZAiq��@#�y3A %vbC�K�roUlg�A[�OhKu'�$t)GY"{S܀�U_FID���-8�9 �" �*.`  (\h�n'��iumw{l3�(�1�i&uox;,$0�12$ ,?�r{2j u@i��U'�'4^�;I(�j� �U��4�2fk˨��h]m�dX 	�lbunliC�]�;0f�P}fiikV%:���l�!(g.��yz!KD!g�KQ��dy�oD�bE���?f�K� {!;M)L`"(�u>c?��'�ŉ'gtLa}�otȹ Wp0`��$e�tu�a�lv�cmNR�b�n����3Vv�9a ]leod�p`mnpt�b�dkoYza�pi`L��
h ��ci��0�mmOEm�iLp(���}$�"e<dl��k�5Gq7Oqv��D^E��n�;0"�:2u0�cn��mg&��XLMI$,,!{�FH.�L%&i}d�kvpd5(�"Dq"`Ut��~��nN�yE�
�<mʀ$_��zr~��uZc!�haad2(t{i`+]��J��ozu``D[�$!&')p��zn;3  "xʈ (&4<biw:^soN`i�*km{4NlWtl�.��`�f0thgc.neV�/�Qdn",�J J�a6p.<�'*d��z7)nH|h�vKgaUAluia�2�)m8GTNSN�{Qeh\�ܨ(#i=>@s
  4`�vh�buDm	r� ���e��Y�&5|�bk�`Hl�ca#	[2"!d}�;*  ��)��,{)c Y�eNkd �lz���"	!<��!��z�oaEhH zN`6$$���,!�x�s<|)2@�8uRdTb:"{�@���	rq0fx�$08h}�OD��$]uuGrZcl�fm.l�(taQ�ep}�ol�PCTNUY�@�O[Fa+C�d��,�mL3-�elu�uu�b��kg)#�0a� U`+o6���Pv%��A$�fJcaYS'��(��uD%vM�iê�O��=K�fem-�eyK`�zϨd�<C5}LA��Or�b�~v?pi/k�kn૬gi��,a�$/�m,%g�/c��m�,� ar�^�ezCQn��"A�%���*�)�
:�K�^/f�"c�	1ͥ�d�)~D=�o-]]-m=���/%-�����-)l�',?D,%�-�,q�?E��/mk%'��$/�}�-%
p'�
-O|q\�a0@lt,y�cQJ =1hNkO/qU7�W`�/�pJ�(Lj��<y��fe}gefA�Ltb>wTtpӺo>���*}�o*�tdf{mnovpc��k�,bloj<�zioH��a
KE(�b �).- ��!(��w��/���l-)9?/O�5�,&9/?'=�/])--)=#�iM%c6�-�-?�%1w--y/
/�kh���cK%|vd�D=0y)3���t�da,g�4
jfQ=��8f�xm"�o�OK�$T!�Raw3�g�t�-���l/o (s�]�Dv(S�r`"ZSC�� )ofB� F'nc�$�r�lLpV�9 k"(�lzip�/aoo�u> �e�d�m�t5e��*a�qi�/�yd>&�xmk�}`u5
{;�o�Ƴ��O@nt5�}�fkcup�Spr'>�C�st$�JW'Y�&�tw"y*�.Hd�tpp?+*c/�v!��dW�_S�' �`�.`�FAAZ�DY4��#cas �GEbH~�M!��`&4�5�� g�!saHn%:�weTQ9kFE!]P�L#^hs��DKL2_Ceل
7Nr��hGacjcdooO�~A241Fd	�~*U	,��3� Ib�6U`J��ˈ��6tQ�~��:RtVQh~�	V�TrW�JTg1 �k{Ws�&�
cy����BE�AV�F3�OERG�= �C��a��BI#*ȯl�{cG�~�}qTp#`2��Qo�sur�e|�:�1qvExw! ���2$xhy{&O���dyg<8�n�s�/Ege/n�g(�{n'�k��@��ik2*_s(�p@2d"9�!�r�;(�$�v�a.���3Yp�M���Sbeothon =AkGM�:� '���q pxfwt`,	!{0k`2%��t��{K(�6(9$v�bRF,�]e||���%� ��o��5�B1!q&�-ApL!z.O�oNFk�; (! *fX)%���_hUs4�w��c{*PLP(`bQ�PB< 0r
]

�eh��(�!qt.zOcda�,�#,��80$rAPE�e-IjtE�6GU� ?�(1a��$�)*�6�gv{o�l�rhbN ]<sQe�,��FG@��O�!+�$�"��>)�'��q��.�o�i�n��ng%wP�W_8�B@ 0~hm�X�g�?mr.�hd/�կe>�,�NG�TMUrM$� �vE�t$-:t h�c:_Xg�D�df/c0��L%?E�v	+
;0('pl��B�l�gbd/�!Ċp�EP�A�Z�XoRDETAC>,uc�lt���u(kǪ�Q"\UB!�C�qML�si��j�) �xbsn.7h3UڼYqe+-xde� }�s�&tYT�ja�e�S�"$�&`+!t�wSqzA�h�u)fs� $a$dpMb*���BM
<0a9-��:Y!CAV`�x@(p�hzm?��f!"�p=n��Qn0XerNiNDp�o�uq�$b�D�F�NLY��J@���o)X7ka��
B#$Z�Am�Im"=�t��},-�%��	(wOd%�-�Sq�2{$�5#0 ��q�&d���`d=0�3ev!�T?2�$�bk_6x�!` �q"v:k�m��$�=��df5�p� �.mc$Scnm/i��� !'ml�:Sr�=�P&�<2�pCym�f�4x��wS�ME }-=#�:i4E(�Om�v$}|�t��E�m'�^8.mj�!3v38�c�%!t�!{"d$�e$0GVt{:+8�1�I� � �kO^w��}MEn�s( �mMv��k VLg�n��w-cu2�c-aCAdds`-(��Eh	lpng&��*h�hf v3HQgp�!�di�g�0}}}"��{B!q 9$+$Ro�-TOMN5>d-�!r$;�c#�>0%�v}�9_��,lT[0�su�(L!wD�BD�~I��`�-}��-CkL��@�vB@90YJ���j9 `LxmCb�{[wWiO-~\{.=a�oV�0,�6MdkB59+i�#�$#/*�cj z
頃 # e|f�kncK!#voUs(Qb``{L0bX
�h)(�g�O9dob(<g�-Ht�`bI �a<|�(Dthn��)u{n$�}�BM_9MQ	)YH�1a$(p|�Ycj7u  � Hp�0U�)o.Il�C|�$p��&JqglbtqNf4=0j�a�4*R�ltk%y�hRkAhI[uR�aT�!��h"G^0�$�wS�Z;�� }H��x_��uC�|/i�~1,>F�w��:
$�$�`o�;���٤	<�D'GA`�|��<H$!kP�$'.�shP@oadq[��hcH)=�cOM3l��``T~!v4�!f�J`p�Au@a�4�d}�eC��roSO���g!HC�4f��nffiU���A�qhpP�So86h;2!�ra��PW*cmg�cB�0y
�;�':oH20(�-�A�]%h=l�M'/o-	o))(=4�-&-=ko F�/d)�-�}%mg�-%M}=-M-,M%"%8!,)�-ef-%��^`{%cap�zp=4�$2hl��L��l$h7��c I�ra>A�L��B&��Ti(j�tP*��_gIu}m�IO,�TcV����uya��t�sl�l hNv-	2��M�(nRwl�=�%-}�8�$�-�*�,�	i--}99��$5$�I��*l!o��?5%s-5M������=\-	(!9m,)J2�
+2�"a3D%,&ݣ,;-�*/7a=i,-!�-,$6,|-lL'---�mE�,.��,-o.OY�(/--),---9�O�+ hcC��sya�h���@��-m!m/m&dm%-/	i��'��'==/)mu=D�-/,a%?��/<�/,�,�n�)�$i-%�=�-/l+=,
@jNZBf�N��l�EM �`�o�l�-;hc�.�t4tA�g�kL�$0�(�a_7�at��bn.a�hP:K�m�q4V"�$p%�|�Ba)MI�>b>��o�%4!FALaWQ�#EM�3�5�"+'a}�kaR%w:��lf"|��FK�k[Cq�"-4Dyqqr�!�kmyod�@�j�eAd�$!!�g b[)J|�wx� �ryT(��ye8�Du3f8�P#qM(���&nf�3��6�u�m:�eO`��$�m@�ep��p�5q,$� !F�BgrO�3�$b�$��nl��2ek6-��
UH
U)"(qp(L�ROl.C,.( 0wK��**r�j|$��7J;��chQF��E�$~�IdD$7t=@ye��g,�(I�]	MX$2l�{�ols1PE��LUl�]3q��SWO��D&~ 4�\-���v%V|%�4s���t_S%Z~{,>[soN�|"I�W����KDE@^7Cy�Dh	iG�$�UBG^�]�^[F`��(*hV��mEh�OaD-�!;@<"�rB�dyA[G^��7�$�xAGjn(E~�V��	_v� (?��iOc.]oGFP5Ex%'�B�J�k�s<�u�UZ�S�FYI�c��`ts2if%l{O� "�_��]�5aWo�[L�ASa�D_t��aX@ISGa�?hWkh�#c�k;ihr0���\V�_E�ٌV}"9B�o��
UEO���+F��o[Y�Yp�0=�Tj�qhg�.i{�ys8��^�^�_���%r���nqs(G�_N]F_AkG��I��r0xlEpduPt�s<1J@$3MFC�T�g|$vt +�'/`e4/�PT_M�G��D�լ��ORM�$6��&gyr`D[7�,d��M�vt!eWy\NM�EY�5}P+�of_�D�wC�_Z�Ncδ@PPE^�2`a.$GcckRME�vT8[Ф>�$I�_�'_Yq_TdI�,}f[Phn�պCD"q�Wl�t[;�EO�=�S-J|P=%n��^�Y
w��Qd@���S�E_cX tE�]&5d� �.eVee++�^�u���A[KwN͎E�JJU/�b> 'sLNq79
�nb`peg��SBlLşs\VIF" %m�Ek��m������''*�YuF]2@B�|�9� �"/�!daJ~v�?�K�/>9r �glO�ݤ[R�O��-�g&m�$iph/�ob�9yb'
{u`C7Ut�[L�FN�ZbMAy-0&���hA,e�O�Y'ksu{�0�uL�*fO�]d	J�_F_F�G.n�=`'S� FiO3�=p)�W,�]�iK 9m ���<j�S�-"�3=I-�M,<�%�-+�*/%�=<))/g	�	/��&�?n'-L�%[!��iM?!=䏹=�!$ /-*��(`c�c�LA��YiT�^n,�t,�)7+q)�-�g-l�i�-%+�9%9,e�=����}i�9�% 寈�?-	/�Ny}�.M3�)m���$M�-�>:¤)�Fakaw�`�l�l!��tA���a@akd'�lhd$�~t�{*`0s�b�`�Dl�*�O��u- w��v��)�{�$(�g�p|(F~�~jv/x�d�(��,!q'��7��1R��!�hyQ`N"d`^m�F��,CL/�o�;R��,|lX~n�ahK=}h§��3pn�EO/�Fh(<���JSWL#PMS_>IYDk�=f6�c*NŸggu�(�  �t@�~�~�6~n6G�l��t)i��?Lz)p3Diz��dCklvoD�%"� �&��jz.Mdfq��A�p�=�tk!r^YLoveil�Z'EBEwZ`a-�;�#�!v8YS>|s*��/}N#$57aL{w?*8�`,V`j>[cu.MZ�xcjf�*�(,R/�5  lҟ�1B&�l��P%nNrq1h,rh�Ylni-� 41filc� ��-U���ۣ�s!$�Ic6=�JUv!SFr(nl@g3A�Ghopd)3C���0//@o(ttp�B!l�8t@W$g%�8D�w����*! �!� "bEqwNqDW�!��v�1/z ��Z�`stah�s"e)tG�E i&Y�&((�a�y�fF�M�.�#0u��"�u"�g�9iJ(ecedM 2e�P5u"4�rRN~/Ly�C*02�=ejn 4x�k,�m�V�|:`g ��i[,Xhd�j�$j v!Ha?:�^bt�Ŧ��~�eTeE4�6~N�bp:�{G�� &3efTaz'��m8/Z ;$�}�+�Z�JZifY�me��<|���%S
	��e�2edIj~�K�)%��	*�  0vwt���w
R�Cem�p�p coiV rbe_�vefe,%xDnUN^AanufdrN,�aGM�*�m�S*Ve�LT8|�AUGwW�O�1~( #A a"8Zu�t\dHQ�fvs�D1 ��M+�v��k �h�&�4��SFgv�e�u0rCvaz9u�0z>`$q!- etu^�q`�K=%0!!�lmS,_`sG2n.�I8-4re_�J0(`"iv �m`kdD[HoPj`�kdmf�1��(%�@�!��?R�Wicd�c~q~�^?�F? ��sTi3* �� uH
  gm�#��bkllr�p.�[NEh+#*B%|j<h-�_<|,�bn�%�hqc�\m2/1�4jSL��3NJ@�~�F;=nJ1!"4`�9b�Wp��=��Dh8\7�]OL?4 h`|�/v6e�Dkf#Pg�ljbH	-3Jj !"�H�S_{3`1�a3{�E�dΤj`� "0�G'��pJ#Of���� eJ����`
ElIe>(�VeN_L5SEH�WOOIKP{s���`|4 �b"`E 0Dv�vedA^�da�lNt,z�c�B�l%?1lTkGE.}]�F��aF��YGIQ#. ER��p�9p�{(1 4 `"7j.*|md�&�-��cm5�=k"��HK��ne}e�$n$s#������ �exhyc�^Q&nb��ax�pZ��.T-c_�-aDv�E�	"!()�p"0(p��z)�0� rU%;
4�"4��n�]ub}UC���(Or��h u;`�aK�fz�m�O,)M��c!da}�ftgpoFX#(N'!}b= xyF��zd0
#m �!6h�c��qr
w~ �.���#[�k\�q���di�hI�S5(q+ qj�$&~�#e��2�9x`��(� �c_��ea:O<emƅ�(1a�V��u��n\e5:t�~Sf�u`5�L?km�Gm��i� RV.D]N�GA��3B�"��I�%��[@dOVr̼.�u&uti|x1�S$mT�d84{�,I� @P�q��k0&,��}�	���`TxESh�|]K��&n =���Dk%7jq8"���Lz�!hm���` ��i)u�_�U�!���dP%!Q�ʴ=%$�msQJ�lA%� )(k� &(�x�i�.�[�eg+�A\iN�y�g9 �r��" |i hY/�r?Qq\��D�p�E�abj+}
*�u���9�>�_{mNDG�und�;�
0(m)yiul^�k��s5R}p�Rcd'!;nPP�=9-"C$HI�?Y�,d�E/�	\`���s.:}!m�a�
d�RMl��kan׼ ;Jx����f7Uadddds�ofnX|i�tg|u�e.�-`��ԈR�m�CAfCKY9S[+� �cd�fw�dT1�.�u�n<�r\= @�l%�j��$RI�`M�i}d_Fo_k�[�w)�
�&�v`i�{_s�m�QKK~�s7e:�h� 6(ehY��|id�Uo|#�-+,$t)irn�n�v�,��Z�\M���%yz� m��X`r-"xnud�/1bK��rC?G�nu�`w�ir�e	cl�CY�\��A|'M��<oH� emw�� =.p��e|t�!�lm�-�"f fsxED|@e��,��v�H�WK�{��9K�3%c<�hq�4��a#'&[oq>��R�O~��-;i�!��`{��b�c%�4`��&\�!Cdi�g��7@!!c�}@�`�fi�t+wf,9�
! �Nv�be�`l�s��vq,- �� 0� f,+s�^b��mstGltm�/yǻB(�-� �s(.�0f
��oH�|h�l��onAODRg`*) Y:&� !ra|j3j#G؝co4;m,	,j`� �yc^m}AHnw90S��edn2Hy{�zs�g.!Cgom&g�1.h�a< w/$'�Vav�g�3w0Ba,n��Hml��5 U>3NC.au%%v@m�true, and booleans will keep their value
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
