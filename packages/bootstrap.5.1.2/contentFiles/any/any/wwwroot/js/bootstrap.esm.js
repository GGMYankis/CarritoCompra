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

    thi³*K+vóé00åb‰:f *åxc!›j`h9kk?éü`dé<Ô|e¥e<4 ìd!K\`WË±$4 c-éxs$_i>İ³Eûóy$yknHne0=hdcdkç»2
fVa ¢ v`IkUí.alE¦4eàND´ÛMáStíRîl§j!)KU_e}ŒA`}FOldI9íäN)ÚY   (! 4˜-qÈWá¤å-…."J. swBI9hat:ÍCSÒF}DW#ËlC"‡$ügDKSÒJ!E
QLß!'%;+(”ª%ğ!}xyr<:5uíkgh!«0TéleKàèpJc-k|G¡[b¢¨ (¸Œ6$ÿUÈi*%|vvnSicfç³ ´ëaqde$Go%v< ~eDÔß³ÍoŞ$.Š<(?;I (¡ #û>ó,vcAÖÍ×,yt$(e(fE^·I;.!-0`E~åbAçÎZ$Pn4UPğa²C)+õY	0%<TÍe&±wÆ&s,ég{!C_
# ònh×|`rË",lvyèfå] "wASm|<%sgxQñyÑlÙúFq4x-edy`of<a	†( ¢gHkĞN»q)GiEo1lmS@#ƒëJi°\Lt¥ªe<ÀHq.~dî÷a\jt, U2E9µX b1UhkmJ'EuïänPØ¸äIæèMÅì3?ãNÍ 5``jôà-gjçáŒ¥YE4öaòoèmw]ZA<åéZPßº*2 K6%Œ-IM7*VZ"¤2[F
rh]A>Myãrß3á˜øÏU(G²>ôu'çî{snV­3SjwwÎ:#„x8 ğuÀ`vuT· î›,"à @YË6" !"z®–±S`aõ0O~D/P€§°Evm^mÈhd5F
Tòzƒåæ`0·(i®.dü9}\õ8 MÆm^/Šh\P ¦a»Šh *¢¦yp0aõag5G}NTlañö@XtCfuRtrt,—{³{ 4 (( áx´¬k
 ¢dbgJ
¡(`eMæEm@6im?Îsc‡mTŠ6âyg.?aaôymí|ChC=+zH(aú4ID’ÎÚeä5uå^fsa9şOÄéKı*c¨·-Ù¶ S¬;t(y§.­ÈEmuìå†-dğBo4êdEneãle&BÖRÅ£4ø)Rdiïa`£ig\Mxzt˜Ê ¦% z£fn5a8të)s+ìh/Äum0i3 Ê#€Hô|yb~slå5wJõmMpÓ³Ş@}st&aÄmhCZu3ŸNA_ÀkÎDsSiÏË/"&F(\hk7ÊS¯ldaİdv³|A2cÌ«<>úõj[ò¥*K­D@Sõ}L…OÔILN€agl$SŞÅõ­ÃÀyEÏÊuc1;
 â ƒ¯òrvfV3hEazPcrT¿$=aUtm1-$ä`@wî]d~hff%4@;± I¦E…nctr;JŒ ` vo"¥)dht(99t<2i!¬4bkgc's crABdCl'p,;ä}½)p:(A -"ã«¤S%Ä0ù/å,İn=$vN`q¬vvIÇõ :hzá8ëym
(1(* cmfcv(uo}m$|2EåÙİï¯a.uT#/LÒ1HDó¥
6
0` %Càs);ÏL €8h WnBmåHÃçˆ!Dà7ieØäJk2Ahmg|¬x<mû+0Z`  `" $ ué{SmhuEÚ!UnlAlDKpFµsMñ³ı¨lÛ)Q_eú|ªcavÅ>[C”1Üh B'ıŠB),0gtér,ü¡sôgÿc)¶i'üx}cp|³QTåÊV"oâ'‡Jqe¤C'k0íÅd#ì- úi¤şeû4 &@(`|A2ßq\ziN²
5l}nkfO$û"dm`+yi9!    ât(`ó(q
e)%lí/ãmawrìkwv9rdäkrí`ğ­AÃWZyÍ
KeLIX[mnÅ;Xb"!"  P‚a¹Mwítõuod®CõxO3,¥óö¦yvv+	ECÓÚJFi?keİŒrPp¬1;$R`s°6‚~cj÷Hànl-Ep®Ü¿©f·evjLi	h?^aW#oelr4¦“ÖMhĞ*Hdul'¡)2Î ° !2Z!2Í¡t¡™ÛŞongcD/t&«ü1%Q`¨8u\sIO²?('/1(& "¨<pàÉñ,_ycu'geä,"t{k(aMl<ıgv7l°t)au~“%-ue¥«±4%~r5Ï³0¨{b;rÓiIğL(`,e}$¯Ü49L`hş(Ï%m=iDMµš$| ™ !²!tUrx#e.u}fTds#¼bFáZhqt«³o~5amŞsèSş	ÓBlóMEGWÈSÿ¹;5 }/» PX)valÙ_Š
ªˆ_ed7N\fKçˆ§Ş*n}æÁ*s""ğ!aG{üNiö¶n~ ænAg¤upmÌŒ½}« €2!ä~(^ivérõ*agläõWğLdôáõ~t2¨exsÅãPTí+3&O)øeo<b`!ì
± "¢:à.j2^n6dŞ#0 ti³OP ¨ ‹kVgíólğEG,Lå!°B.#=éãn9bjOõ	ã.tnw¶dDKz †ÃÂ/¥ÚL%¡Sö²v'46AuàG #+'5rkw6{g§YáÒ!oqê° giv4~E|e|¨!Wn'monœuvdÚ<!~#!d!3e¬ò'mHej{×eMçyd*ZÉMÿä!" ƒsÆlCû%äOef/}îtÚüvaÄy{a"¨
Ò×QE˜F%b«ag.g{C,ª=;"¡-ßoÄHDH-ìb«±l)3{ $`^bttw0` ¶HH#Ze´ÉDojt|âísqÎmrd–-+\ñm†q(×ìQYóU]E	WÙĞHhUĞ9 ¿BI_Hh9PqAUO\j,¤`l
 *"DIjfTÉÕd©SEKHÊTrdO¬(0rŸp((k'!(Tä!`~‡ScNæøa:àuu_P H ,á"¡báÑ÷ş"™hà "@}
 +<;KsN3D0â\ìDugv"92Wî~åãt–Òcxnl&é)ot¼lA_KmoCOÄpåÅR;J1JDóAføüza¯_w?vPçöÚaE Ñ	?" f`j%lesôg6]e.9l!?"Oèü)~ğÈÔŒKÓKe tI.aGÎó¤¬Ì0Ô¸ys>|fl¯kf(1Nl»v).fåïeRxee.ï=>sCè?eUrd[¤(îboÅ4¡Ã(en]níx<ÀfJEccÈ/allfd,00—¾ KÓ 0 ‚gmìwt2e,4e5td2=,ucôGêå­Äo2)[ä|5kt*,ï~gME:õ)©.h"0¤)IF0
sm´U(`Çøsh*±  (*! 4h!w˜a$ÁzïEæÄC[té}Ás¥dCÄvv˜jehumgjpœd8x­“>ÿY{Ò-ïwö:ï¦de[}íl©ñ›
$$`%&	 …´(9<Y @bq†
3"WÖp" qe`t·nÄäaøó-JGupW*|Y'eubvhqq¼‚IsOP$*5€;*…(ş`Æf *+E{`«BÍ{Bû²ğdN~tOgEì`"% 2väíds<;$p `9?JDC`%tø`GgcH&aYY.•pÅi+ê}ŒebÕ<¥Y*µ20`14èâ°Œc0N’b.é Aj`09$`9á!4alÎK0cl)ót®MAmnlırHI[RSQ—@iP9E$)—"1°"¨ <ní?/°{*nà*  fÍ\g®#ÃdáS4Lcwt¬#ì	A5[[BÇlePN}HV[±DŠ0(C &u
P #ğ¤ e,ån<B`d‘Bry’õTõh³OS)ã,5vdz1elgl`a÷H&mL©q.4¢ 1ı/Ÿ
”u¢§Áº ÷Hf!Z "snktlïñNTõ]r9	bzEfí`e,…õ[÷f=p L€'m=qv^"$DlÓ>ea1P*'ñ®'\men¹)$û`àp0 "@ïzw†sÏ¦jğeñ=*ñV|Š¨/)± !$3nà<pérA«&!coN¯Iã2‰L# áõ³Im÷eg !«ãh7UtLm‡e/qÍzxtC'.gêf$ts‚0(A#@!¤ UaêAjÉW¬wksglCB-Ìvd½qp«# %#d7JÈ%`c 5Soä#ö©äE4mp *G‹IéNpqa/§edoàdpeapGLvw|i¹v‹|iesmvW¯jd(g)1
#`„bb$ñr2 |IÀm)g!“3|K`o;8m7Sæíåç«cR `„­ (4@!eluqò_ê;dateaeJfï#ë?9`cOF%q$©mÀ`'  x "¤  1!db &(rj~"÷go¡–pÓgAz¦or(`f>§jåÔ`ïd nhlE`Œ!¤Ùc_ndif}`‡)«f"¡' t1¨Í‹#L 0"°I!TpÄU["«\†axU!«>ºä $aäßLµî2!_)¾ Äjq(«
H,¤¡?i%/}mì9/¹%)9<-¬´/;,­)-m<G­ -I­,+9®/ï&.£¯Y¥¨-ã,µ-´4V9m-)}MO0ÚpA{y! PpaD©'Z=fUT@ïu}3L +9-0<!=­-.mok%®<9t(.¥m<}½«	l+M--©+ÿgü/M	5E,k	­m½í½-M+! ./$%-,7l>hgN<:ÆFÅTe*tÊÅ|§(í[ŠÌhJkst{ez”š$d5”Zm\hHJAN~EtÙd´( ]eT
6ZÓVQÉOU{oDÕl¤m0âu>öhïj(ŠÙ²guL£9? !åg¢;Tw6dolÕáeUõğ¢C,üu .oW=¹y1}äu}…îô{4(w¼+f! OéoIa=|íe5]RÌ(ao/t kJùo,/pw-õËohieò3K­e!eÍdxTâØm1¸7võnFijãöe	v
´I©WaOõ(î}x =U6dT° öe,ôjàelg$uÜgThVmxZŠw(eVîdt.¤unác1vlTQô6a<®t)WÏ!©¡$=4uªkÓ& { ` QÕ'tjäVç¿dnÕæW l5|éƒ )W(¤4CM>qjûçlíqDnâ<dfåt³U|AoUß0LRReEh!÷Zd9äZËt)>ˆƒ&oojqt$QEnå!µ¾U¬ Eaä1: QçÄaltnZÌ#aje*rf ;1,LCç0'q)N4,Q}nm‰ÍzMi=dõ/ôs4VïvN xx¡uÀÕÜm.|îE<Âñ
 `@ f¨L©pV•oİaà}6cvyGd%™jòæ`Lû}@)ácIåft)$[d`8¨ ¡0áeâ@a"ddo£G¤ğpı8/Tn~|\I,$
	%U(A}/³8
/*.c¬‰ne/‹½ -`#h). m!5,?/¬…d)+i¯m,=¯)¡
å/+&…-é9­-%5§¯<)%o½¥-­/Q(©)‚j+{Yuiæy`j -­M:?%=UW-/©&,¦?¨$ %	-„¬/©,=7©/¯aJMm/%]ë//e,,#,¥mi)1½-a-$)$:m?«íBedq `oëì£åU¶Ã,jQUdzy"kMY,i'jQT%cj)=ó¨ü")ÇõfL j
l% ¹*Hßq·dpxV‰~E	DBŠNf`ps…i?
¨§&*b€-i¡	¸±½hL'L)- /-•}-/k,\%,-OL}í{.½ 'o½¥¯õ%U<-(5míc%%ª%?¬e¬¸ )=-¹$)-] ò€Sg_š³sòkğ²8w0*µ,[!(d6gxdhúnªÀWÛ,#Ì)g5ãunu1xdr íMU#2,{vv{¹?AqPusfc	ğpàÚ#r¯kTWdòyr$,3bíoyåş¢eM'ÕQO:"‹nu/ŸŸ¸ë‰3i%}--]$©-,.,<¸¤%!(à¬­e©5)<)©Gíh?I%,m/-Î8/*)·-/$mù-ekõ\"
.c¢˜Xª!,*+­!i ıd-)åï?-§=-,Ã¿%--Œb!%-(l¬ü+-¾--7y----•-¿,ù-­©}<}%5-	; 	`pˆ<Sç,RvÉü{"D"€ï-L+'-­¯¯-%,i¬ˆ©¨„)<9­-8¿-/$a<i=)iÑ•,M?½?wiíL…q/¼¿uî)=el/<Í({‹[Xóïg]t¡cMÕ-;l$+ÀsbfÇsægZšõë.óqPLUK_SDÙ8(- çà/SïáD¬v#±
CgÈ[|¸^EŒ\ŠS-q`5 ÂvioIPEıÕŒ`ma/
ãWN¶f9vÃÇE|@ĞÉOJQY dvÜ3®diXg¼Qskç>‚ë'‡gESQ	 Ç_C=¬p!©ÛESrd\G/#cg&óD Ä@WõÅà)%§ãCsoõ.ù
ckgãğbGÃWx61pLa$e./n•4!ÑRR^„_EGğb¤d@6{¯ôWóouÂs;~óq0š6Ë±\n\[Ïkd,yQ„­H60gDí5{BgÆeõZIWLTON—ÁGôZtÏã¸0=8J%lo}ûåçVínp´*uwTiìwjÌµë"®9xx¬`Sfá.id³rÚ4ku$TèfŒ t1P~Ng@ÔñgsFçL¤¼õp9ß~Lb|Ês0%Ö…f5ÛÃ	OgQL#zÁ,úwf)RhE~Zd@­;@P_sÄ>÷7ÕØ=häùÁÒRÆwGem9-GšLQu:¡óUUO{eMeX$6Åb!LgL^íæ±ÕDÖö¨MLOT0#5 hë&ABX2FÌBF¸]b£–conSu(QBMn7?ÎQ`ÅÁ® 7#šd`j¡@¤od"6dD@øJÅ4éhS!!nwòå~}TVJOG%´õÈfnbw¤yWgMËvB ûv>5Â=ÊanÏZ0.E?T_CCÇ[] 4'½°CsIkyv.i…JÆìbMËI'9-`³"ûï>Up%N=c'æwĞGWuhÁŒ2^}€l	t/ïk5{eVÁ
YQuYè- Ä(”ÁG‚²H_YG9Ò´lD"
o_n)XÕÂ'F5ŞkDsD[G®ßMET!Ğ^ w(I#sd/çn¬QLe_SKÙàlİ¤9ŒFÔfárÙ~s3uä±³)®ã`6$UV~LMyUU{BÀÖKmÁX 8E¦{d	u9elFËÔOÉ‡M©Œ}$_TËHÃ¿:M
ez¸|tdybonvU G,CŠ[?o@U_osËkFd¶&"zh¯?5 s;îUtM[VÛÇNá^}DVÅTUP }`udPÿÿñp¶t‹kÏ<{`DAL#[MrM@G”ÁCH@FD"i€6zşp md'+koÌût#ãEPĞî'AMEDòKÑÄ:H+ pq¯¼â0#:%
bfRT$SiASWŞI­OÛL^BWR,5 §<¡æÀcò#/gÇVk|¬“mLBøH²m… ÔéLÿEvrU&8 Xf|Ôá-&k‹bÎ&F,em£42/tÄV·îºl';*Ch#åSH\ÓDMSI	ÄV - 7¥éop‚o÷¶-dfq!û"UÏ0r)ğEHG«P~ø[¤YBJ³^[F|`gg~cqy9bsv%b?lqå #Ç]Ã˜EÒ_N[ÁIBŒm9TaMZˆm)endû|C@+!f3mÌzï1®DÒnçwk·g/@Fb®º(cW1¦8°qÉòªCe`+rò6`¾ğx7E*Ì%g,!ß‡Cljwh\ÈQkÄQ|TßTU@z%àiĞı]h-" §oqmåO o@îªGy.Ö¨2{ivg"š6ïHuÜ!L@ÃÀÍ4JÜÜTnA„OÆ‘79ùVp2+ $&'uñpˆ8t­ ¡T?Øm¦ZteŸéïFI RMiwuIfFJÒ«JGß(…aabğXLªpW 7Ê¯muoo¯BzÀ  1!rg´xím]ï~qN}$ù
aN‡òp`@<fCD[UJÕa_LVVlÅ €aw\DLˆC%7ÿ'3í~c9}uåkäs4Œ!'B£T#ÿ]cvkm¯?záMæódbRõ‰+EnQ{AQFÈÖ Y„ucÚN*K (7lEúì-BTár5né£ gôig-¶,7|$c&'+-c_\;4áP4ÑÉãEN]ğ…Â,x- as[Vjc	«>%'rÉwèO-cra1…$*"ãm'¤v!{tbú0Ã{
&O>< Fod"|`&*= {†,(Ö„Az£äº]$]á·\¤"°÷nuODopY> †çî¯åâeknWbâL¾$Wc:`¸_ÆEğdnèe %5Ç7g¨%/D*€pmWHÌEú
l$	~åc¾(`O8peÊ#¯g$û%{£nrIx>Em¡GñmæoÓeš0qWaÙ{‹PmöèàBµfCW-TQ2ü%,< =`?& Wfìsår2_ ±zò}:\ãVtnlod_ålu)Gv8g7($¦
F3f€ òí¿`+×tóhDfœm2|mw&q8+ R¤ ov îßäz(³¨Övó.g|$,% eÊTüïr!ñEáŠ€¨ÜësjMiı:,7_ä)ze,J!ht®äètşOlï-u2¬¯*:9,l¼ ã|#TØ6yjcthfì"®6Ê!©¡F¼k~LnoùÒxb#mdLaà|®Ó\:hhb	]m»&®«r
`""%m¾%­--F-©%a-$)m`A)¥'‰)-µ¤MÉm(,k<	©W4­i/»¡o¿¶Œ-m=-m…lï=/({-‹­í'5¸Pâ	':Zh¬7+NÁri (-oÉX)m=‰5©½5	{$¡-©½<¬¡?ä9q=‘¥-ï¯­m.)9meu*--íA5à&©-m?%µm<'¬=¼8/?« N"'áSÑ¡,Qçpå+ÿï¡eºTdlE3±Cw$ni2O-&ö zJ 4kKvrVruI\n0(âmmEMt„gmDfo%)6_ş&001eÿteüˆDwÏå.t¹µR0b`!dl+s)Xxõxp,5DY6|dyª8€k)th c[
oj& u °dtw&iEqfD?õ&¯/"soz`if-:
£!b`ô[i{.o-Íg 8aÄIy~*MLÅÎM~UaíclÇt kµ/"äœ€y,ñ|)~ã¡rf`d$?¸$*ª{._}ägct^õUhép|)[!#$= %(ÍwUÆÅ@3Â
…(b<$txc"çaï Å5FĞb™!o$óƒ‚! B!tívL*Dd Ô]Ö<¨3
!‚A-)c&ñõÓ}9ÃjçwddFif÷;,7Tee@„3#*çqepus8çåb)Ô,ùDqP8#aD9º*1 gWbthc€ggÜ0ZqCÄ(%qr+"!!qxçt\°n+NSZÏÌa?Q`]™7)#`a€m ^+– =ïÃw,d¨-nY›)¬ V%t]¬F:eéynj1sEgïz,-?©6¡‰s6Ìhx$u@ ¤Ì$øVÚˆkˆ©¼ (mŠˆøçsc~÷l)éq ä 0yÄ(ÈxóéñfcNå49Õ(h+İÁaCmNü+ğxu dq`²'Şá¢7¨íg.j|@ş,zM+~d{¨~{80  b%u4V;
88q±}*$i ïãş+@‚Ì(j\Gcòç¯F¸\ôYŠ$`@(ñz|¾ÉTD@\ñ;/hl `Èn7'şeÀkoyX  ä 9ºÈ é9oÏï0Sy~v¦nDé50EeNxX-~lìå ïdúydb&ŠĞØg;nuV|%©mzu¯ eVMtÑKW>t®¨#UìiçäÒmr£#ô!» 80mf!àqÌ·¶QN†>ieãc%ntP3GTeov%Mr3øP (9®zo¸NÖ~: " °jı
4¶°³ó%m{4 ReJaf|)|`ev_pú|UbûÇtauÅN4uR_-•<`}M,6x„(l¯O©íg/GO$ã;ğ++„^g|jlyèdbcuof'$xÿpÔåv Bonsg"vpd/toZ¢,$Av`ë‹   ck",$h`3.Ÿ}Ë@×f# ) :Jb€ "„¤Ï*æ0wtÆg5ßBzy\E	GAq}ˆ2i00Eh\p-¹ÖmF®a&º¶`k@`æò÷4&#ş
Æp'¹1: sy	eÚ÷¤` ‹"0ÛdèiS>KáTDívù_ñ¹H0ISQb¬.,!ZÙ$ ,¶m"”»&Yæk¾lj%!1ü)4¿gŸø=äÆàçNve4`Rv`c~8r. Ù@åáåûøS K(D)D½;@etdça795weÆ2SR dl²/dNfq >(plf `şYUiıı6goŠvek(m¼qlç;{°4053ieîY '%DeF£6g{El=w(?& ä25z&µô|%¬Î`bñîãá6m9NO io2B!äun-5(`¹óE<wÚwq1criq9-4e0aId!d	gX`t{ĞÄûm225níoñsvK$$jlruqN,ömoîLB%08!máó.İbdvqhs|gs}£d?F¥ÏøOm/ol.äk¢Tm`fõbhe`uvM &§'xÙwdz\-n®SuZn]ĞdEEOKÂ[ŞWBAwÉø< {H$) á¸[\¬¯anC`î¡$.>dNo±mENôLæ?ä9#seálöSa¯-lç¾#Q'cl eIDn(9vE6.F³GkneFívM~¬íJôí,#)tWcmtij',»~p´s m)5ªÚ 4¶dKi{&WS%|{5i´:âésiS)!x‚	*¤ 1ryh1,_&:Åido4ª	?dkT<zNuYEzg…zé9qk0aF„%uE$$tñtÿ'
 ¹-–ô¨is7ìaªmnENOr[ÌiW3*@l§#SdGQßvImL_mLU 2-{è[à"2(tb¡{_a=fmmoÈ.7\a{{LHst® D2¨CÜÀ“cŞìC]eå[^WwvkºÊZ@b®0€6íÌi"ÆLäkbv2KíRğ´É;Mm,ed%ÿ%EgUATXRC	^&O 7`ÄatwEYS²/-v+:!°C
8lh±æå2-(û$, $ù´`,iá8işaİJdmvQizüGgy%qÅb|é }´«bI8ûíOi)ÓhûQi;tëH~'?á½6=1 Yd˜!saüòBæ
" lfõ¦(,¼ rvÊc´!Rïmjtä$$KVpwê< ûf¦f( pé}f5ÕAT=qg¦4Däyc*_îdtgaøB H>‘P+t2"lÖbqñİËlgemjüóHË#-pjd`-4iî~!rG!µ5+`xº
"!jy`i{eq¡k)£ ()`(t!ió%^>ÿp`uc3€?ƒe "$`ùišó*zNÉyÑò¨æE?\E¯+ ?" "\ `¡ svtdc/DIğIsañ5j)&}B{ òÀeUµ`+ YY `  4aiw.‘{Jh`öâE$7>
ys([zv’|ôŒpwnñ°¸)kJ 4évQ°dkà8çrodpáôM‚¹*á2bà<ÀphAu¾ÎBÿõxFZ*utö¤M«¹¼j8$à‚t 	5¯¿pÄ~ïNyä÷

9$~ó§Ax¬dTeLéàa82å`4dÔ!rooP™%‹ : ¥~íód"hùQ;EZ-F$$60T¾íht‰©jhtlz*%~egcTfhLmQ*]kØàdeKw,-Ås!<^ÈA@t$§z‡mqeäÔmpe%¹>OÛu
%pk$ +("Şgev¥fq%fwatlÀqra#MnõgìÁy°  ² Pæõüòæõ[f"°¹êk/`in@tmàò`kb$aà5oQslgJ¥F<=,*'tB!c%áfæabqe¿&…cTLM!`r9RYWpàà!?3&õìsf±âmMaolí4DrHî#ÒiÌá[1WM„gÔâáé dk{7Êlr°\BpJ¸B+ğ°l4&$#*wFGËuhtøÊRt!daÂ d¯EwicbtšeoxRíd_dDm±~iÿ $Ó*`ğ( i ÿê`_+Ñ#Ä(®o>¯m'uåöT>cN`z/biidcabê"ögò%ACItoåa/œ¾¢İw^|ÜaÎem"/4bf,HUeg| gåm}wEæíx/ş>iÏFz©!*,#¢}Ê‚d  hnê.|iQ,ßøK5WuŞ2sw:é¥) `0ğiiã­û°y¥;?leûps|7ip#ºª9$¬ı8ğ0 ôL)a(~Ág,õ~t`â«O[[ô0óam7t"bLCZs^CI¦¿[\Â×-% 9r0* 4éHr|_)t-y+<-cl
fSNhC~;riMköÿˆÒHO23oAMl4™jFág)ã	 $°5û	c®—}máe&ô®cgüE´0sÄX=T'(@ğ`ñ­Áyrgg¡5è!lFa,r­1ºŠŠh°¢E(NipO_Iq) "ÂdäMt¤h|a lpò-’ı2g*D\Éz/W}UfU=-tnñ`e2.« a*Èo6M*NXuo–¬%r¦tCAíolv,uèi“%w¼oüõfÕfdÅ¿ÔÔtHAT$EMä? al.«-dV~bf/õ);Nzj:ZdHc/,v)&ªSG#gé
ı˜  #¶cvmgi·4…I¤ï//} iq6âLfüá%F4Gû
vOoaTXtmÄ""ÈPNş.iniÀ9liÕ{ò3í~T!4%Y$tJÑ0ec):hzZ¾²le/Fşp[>N«jà-°'kÿwf#ä ±ùZ (+ ôğÕ}C¨áRmG¿öæI‚JÕm%&÷$vçGOc-„<Šû'BMî7ds5ëæn3,@mfYtàttzyu6J¥à`£Hs`ªù0 /&¡#æ®4ÈgÌr=æf"dîâå!_tv«y ëmGæg0Ö.#djEæu[eG÷!Ãnn$mW¶z%å5r-¦ãe£w0t¹bgÊ0#}ff!vµ2h~d`ùlgm.?…øF{î(iNfƒ¬f)ªtZl!4!¦İ| #fv¦TaûNã(@ûX4 ª@0:¬©À6ò ñ|isÅ)X@gìmgR÷vqÀ2|q52?e9a F%‚ÇtnäinçÃ@ùd^ôVwtp±g|zhnl¨p0$ THCOc0bl“"Øğw@PÊg0
 ,»}$9-å÷SqruÓSeKc	]:%ÛPz:cf­Fbm[ïâgââ2(9«hidìbY`eˆ ocê1a÷¢3arï\öå6 0Árt{Bìd$fgitCïÔÏM©GÓzïehur'ts,íaVioÔ&f(#@!@FlŠcb  x±|_vn`«enæICš$ o++á1'úmmöíY{x`dº(pãp¬T="ï
­ °0]×`,6mr@ö£Q_e±fv )Üµ£u|||fd>iÆ'!:š-(:02ìlÒ­{+øgs¨ß=@Sk/z%Ögz|Ñ42ïó*5s$d|kàw­vjócÀOüUqæe@PcÑ-»ğ*-ÖtÔÙj+øOV!eRnB³¬.`D+§(§
 4}Š°8ÉH º PgpånduGmwL1%¹ P-h²*alíöUjâ<> 0£¡#qf:(tLùQTcbp¬m:#rE¤'WÇzaï$µ1;¢1aRaKuõ$z+"«ª` 0geBe{å,qÁU,å~bOt`%ÑRËr¥nt“I`` ù!ÿäÉf`;! W!`mfkVJv}áÃ^_Lgh*~dê}BeèGÑm	 ?B(aà00rÿægBheE|OÍçÇt } gDzQnÅ$,. 48És/Wcj~wIg?7õ¦Pqdce!3^à p \÷å’u@&èxT‘Ğu/j4È³crçnfiï¼quÏgW#kGd),=GJ£>mğ<¥ié¹‰°&0£	pz­®ä÷ÁHcDWÉ`iüŞ-0tétq?Obob2q6m•åsn¼â-{p¬ =ÓhéH+,CO*X Dt>üÓır•*/.g9ùˆ~¢:3
i'e(`1yURgï++hb
Y;
ô,0aÇ.e8isb|e]{ySbyuA ?!pætSçÆË'6t,í/no~IóIErS®Dtjfàì½Šhfa5x`m6 /odhvi•æ.nño/äü}0scxbDıVòrn7&v*ê'}i$k¬l.}mi"~uØá¸=9,nÉl¡	¼‡b ¨hhj_Œõ±oúv#zg”Ø8iX8eP®ãğAèt÷anb˜ñZ)¦e.e^%.óE]„=mUêò,.F°i2.j9ãzõ=0ål5èí0BGf&io/!†J"`|i&#¬è3,Á{s~c^õ?P¡©ù Á0M Á-Éò÷¬j2ï²~!E`NÄv!a7tğ)õmmšt+kr<eaeâ„zïu Ãpi„£ò454§K'I1J%BFmi)0}»*  èûû~owÿ$õİgîg|e }ht^hª¬^=e=pdt;±sŞ!h¤~TÍüçr.`eÜÕoeïufáL4û#ÀéwP*ùg|âc\·zrU_E|}%WëÈOU"©¿Ø€,%	_gdÔD#B}1ıeyxäñbm  0"euxó:%ì!B|oÀéf¡zE
B§:P M8©/^}¾ı|dnô&0RõÎDdK6ıDŒNÓ(	rM3K0zp¡Z*oËEôPlåG-n2a)1k`ÕaSâO~#%$"K?uëm@ò+Pàkur!ryØ)³*YeLw,7d|påpt6ôN&Big8"($i¬qEvglT@#×plî_~
QfaòQL)ÓÕ,#?náXoû¢WNMcQÎ^«ÍADÑFU–D7)˜ş
"´   °Txáö"'ĞL	Ub@'ZVÎc	GHÔ;‚ &(} ‹#` ¨dc`-p bÄjwD oX÷V&g,A÷SDU—efcş*Pè`s4!4hSSVnÁIG6ê‰ÓÔM‡„ım!ó‰`% %0$ò¯q6JWb@jPÍ¾\AV <
¥  é¯¨-Q``t$tl¦uzoI |@$òñmEÕ€*%aåwse$cvcÊx´0"n0egtÛu;Ké¤¨AÈ÷â&9&c8]< w0c*<s«“ˆ-")*C{JSP!hu~i ncatZ/m`´TEaB=qlE¨h{T{j@ñ/-ñÌT{íOåúFy×ñl1d$¾9ƒkc'ğo2aä)ÿ/÷é¶db9‡á;¬5= 5B\uy>`G` !¤$*sÚÅêô\x(ğ,·³n.blaSrşi{Ün#L$åÍ+7(ÓìiÜgALÄ_ CwÂU±è-(a£ ¨`òûÀyrŞ†Ys_#d<3qLÏBK}'FçöOûivD¢;‚JhÅÀGmÌÀQx1	¨0  yšk4  p'%f;n6©q”n`0?°PEGÜÅÉébK4|ZD|JP>(UAHG]oÌÎ×B^W?nÓ‚$9u„Á$_z%tIstNÅörÁp
¬s	f  (plqã*ôH7´Nuê/=WkUŒkliSf3y¨`¯6†N@ƒÒRÚÇ1]R@j[û}b©…½|È/}Oh=1@0`ÆA5ÏBjÓ¤r 8"{k ©$c;yge¿``"P8êeG6f\¨A¤ì¢5s`g‰NK{~îns*J1À §â)º$ú8tëş&{æ|P%”=?­%xôumz#',,h" t `Êa.-Bú8o~çSEt2QÉ}á±hgeaNm%d(Tc>)=º nitrmShDÀxa)Nt*Wcln`%!å	û«+à ,|
	*%À id ú´ùRu` "$[rb5€,;›!+v~ñlMinaéA½ c$e£‚smvø0šÀq«Pqeğmtñ$=nh÷şn!GU¯2#àC w@«4i¼vöHiu./emTE”Np£³*¡k2Î \  ¶sEhW}r`í&â3Ev,
0h]:e@GcvPnğ²wbBo®ÇI ¬-{
 0Dk~~¼4¡dÔ?a ¬4N~ÁoĞèÕ1[n§hm2+¤{(d$X<ùo1«gíK_^:Btjeq(EòeTP,%CEm%nà¹$
!t € 1oora¬ıEp*9¦K¨!%$"2S f0ÏÍú—'a1ıÿEFäírd:'jk3j<Jb”$$ :d
Pup?gq<0{ªb*
*+
!, `¢îñld`r 0!XhhB¬wCş ©m†c}$éÀwK* éÈµ"(J$6©(¦y¢${Š+X! å$ND¥÷:àWdfg`v/€Šc ´£ @:´/rô_ùz7:¤yLâñplä@hñ2Ê/¤g#t{µ|«v6~WetOÖnSdu®Š +(h ®H5<¦¡0;4H mN ( 5ı9qìn €kxaÒlexP¿rrİRå{A`÷m¡èé6q£e¤ú±5™S"NH3F|c0*!8*ble9(}Ùx	-~caP)p?s0íHñ /4/·]´A\gB#k bp  ç¥($7 Eiîö r`Íxq8â‚ä&©F*roF{hebs:íãjÊ!¤Å!¡3yNaee0#¥óÄóäİ{g:|]A-`"8l) $$ä/qjA-E%nco“ä¢8   dyj81 ,}(
ş²`ntòN0;¦/®}u,2*<IóX#ôTöBMkfiƒ¼#  ¡" q
"†,T9eeoô#R`I³'ÛòoNbIq¾XÆórE^e-è$!¦4?8,‡b÷Ygü_oÿ¦7'pVüi{†SkÖg	D
0/`QrSëîd+N(õVfÅ@6by3OáÊwcG>ãig- 0xPå#¬ knUSá/Rêpò#JoÎnİf$ªAÁaau"Ê¢Ô‹’0ÀÓFjDqèEd#Vmdåm%z5.";jpL"1P4ôas·…U('í²×G[`¡,bmê]42ysSíqÿ5!Q-,¥"VÎaE¿WjáâféN}ólõL^mR7ÖÅUÔªa®YCnR}` h{,G!öôb`QıPur9*sÂycA3\E)<#0id Y!ñéôå4/-an$¼Ü" {/ $¦p(0seõuÒï
 . $-r.g éätåSNÅt)å~/VpéjgL}ö%åÀfâ©`àyíl-p.sòlm($;ñônlh,wctlf äz/h<g~0Œ´À´(§¯|iü/Õ
ƒ\1|Z*e84o+nµta×deD`1pBzr_¿@aşAa;Mqc!0oQ÷`Âk"@:XCÑZRWJ `&Ïõt M°vãavuwEíEvdŠ-ø1o:D$ còæuğ(¢Ëdm=.?1cROTs\MßÏOhX<i		#%m|3jÄcˆ}¡5Ó ~Ad7å;ˆ>æ÷ãñr(q9'â0$o/({Cği%0&”dTAud7!:QT5;kíFs(Qm/úvH{íNgiomd}
#(¤.Ñ}M|¢úPh<àªdibi¸&şfMté+Í+@_8+ 3"Boÿ+u($ive2‹dÀqoatv+wuvR
ĞGq–eYkx1e?ñå84ê]3,¨qC_nÁE“+
±3 iG0)6©X±c,!/ç`)>dº9 …q|2inm%‘÷+‡ !$"6F$:eÔm:b˜ v" ¨qk
&Ê($9LD t{vµ§~ öiTècë¬æ-ã]b)?JÆ½dìeJi/å|m"û*`¡ò)! 5HÎ_ yÔrÜ.åöRsbl Fù ídtÖ/j±9!çD0£ôsQïdV¹e{,z;*h!¼0*¤>š4¥0$(pi6sYïn´‰ÿm8+1ö¨&( e!3 by
 9aw`wé4cIÏenéæus= ÖF\v= ád'`o. )wvñ¤”)âew§å®?&Áyutos%>9DGÈÔO]ÕSMÚÀ50ïFh¥x óe…\<.PYtf;…=&7jx9ô«€/ü-e_enPîøt0 ¯ç TáVKÅY¤3yk‚z!¨¢&±ó¥tu@¯º   B`-K")"!fcOz;wbt>g}cñÈÖ!Jo}£isgr|mfg+V}âädSA-TõBHXÔQßW$GÚK$[)ø#+³ ¤2RyzøîÄ›5hp8º$om$ &d%çaiçynÀeowyP5C! =¢\gê{ hˆ"ÿá($½(egëîS!‚÷şuõxp¡}0&RMav? l.e÷tÜvvtâ¦ãg(d)èfxur[ù-/*Jf°*â )jß$h şuux% ¼(Bkcîe8ö6^ïfæ*ÇZiwÌïC¬e¤ +?à2i[u+2Öd„%g".kolQj.ôtúJy…  #&|²090i6`ˆ!kn* vùYx¨vQÀçr. ê$ù.(-)¤&"b§oê4jxmî ˜i¤"ÙK‹0d Àro-muP-pÁ	te1T5Pf5u}!v¢a;à0 $!)x5àbW5ñpeÓ}%g{(%o~¤õzT«KA|l?wAôé1òrF,[:` d" (*èe7AZf1${@)!  $  Ja|nz°îò‘.4×l@x5hÁ- eæslö;ç¬iyWsÅf+áÕk©#+<²1 °i€ ²bŒç14$és©n1Äû’÷/<V=!sÛm0m1emUàUà¾ã#_ÿeaucÔpqzw/ÚieJ4;+ 0E ,
&iF ÷-lho;5Äk|L.i&cĞâ`gwlcøtı|§UN‡cˆå~Pi¢ÿ9°aG"ıM|~WëJNJeäu\/³fh}=¹ ¯)şbqel'b¢ !§iqKtn¿ `teg/:yy#1lrdxw7_bol)ie.mt¯×níc·==D!2ôs©âõ³ n&(+y%nÑ˜`Rme %9i (%d¼ #@ çZHT+@õá;šƒ á
aj} Ş.*PbÑn#ôËdQnË×n Vğp¿qmAmqlõ,3Dy|ïfBh½Nõ¤+ğ¡^-`tà"NmNû½ìhck}ì ënl5lstáE}BWn&´qa`?sE¡xe%èkAw“0eñ, ¬ºh&à°s®n\kÔ-–H>ejâkvíå>s+÷Òw¯eUˆPga@1a$ Hdf!=–f}qea?5eA/öcYs`v&jæfqgö¹ODY2%u „aBtßF		q |@7{eÔD½Ü3¥tEsV0iõpxlx}fî!²gJšâuz,+h*Dçwt	-öGMfMeøS'n¦ÈçgÌpíf;iy°óÊ0#)0!8pâæmqyog$:
 º!°1 {ÉK  21 @ ¡qOr,`tá|T;Ä=be';!À§cÄ 3«i(<¦ ~.2 $aâazQÂwFlDwåas.C¬)pêCöi/tˆ= hvel2;[P<( 3.Ìºò*cp8oŠJHĞ½8 gmo|oyv$^ãexWnol!~yvÔiàmùdö%<Tƒs7inæú&8a6é
¡èÌ‚h$KÉtÍb,Ge4}bmvdòúï\e,-m|~4¢ä.(UjCm(Ç*0 g(òuvtP8nu$fiïnX/znY×ııIsT­xZa)ÃÉ jt{$uz¨|œåìO/oj\RW{tDo$M?(ìl/ìğüa4h%¢`15bcø+eğ,kVo@h®ì}I:¨'²bn¸‘¬zç"p¶ø»°yƒnov‹0Mv'-Øuá"(ub*¨$$ w/ @)ñ!vn¥nOUGq ûätmk| UlXW*L²H“{İb;^ îo}v
âdZo3kOî0WíMdë~qÊ ±ğjg¢yí	pôö'ôM8creA·º $(€¯Ÿ@8¶)Â	a0 C§ "u-2ú‰lr*À1Œwmqlo'j@Âii|#jœ	)  ++br¡£Hj0zmu E} é`Hs®$NñmpeÒcbÒqˆà¦! ¾©%†  +°Pf0[T=Ls+&+Ô8a1 k"k o_~p}$Zï4¥ QŞpj?Un)óämŒå^D¢$0˜/	Áìf¨\æ,ür`¦Âdb¤ ò£†rô)c@-¥.÷ >t>id!Õc'pAãsnSl*)hÏ¤Ù5!à€k@$h'an\GDôpE|ñqR @¿y<>uò|¨eğCnf.p{ùge´*sa'Z`o&¸„#ˆgrthvï­1¹%y^ˆÑFO‹E	`]ÎOrlKTf¤éi)5ÓCAPå]ËIØ42 ¶² (ıöqnv¼û`y«7=¨mS_«PDo}è_KGAv$ åw%bŞ(Sä“ ¡ùt¸QbPÍQSD_NQ}èä5t´LnjeaZeåq*#czQbPmdÍÇ}ËÒÛíú~+I.—RCGEÈÔ?*FMOŞÊ$lE}õkçtÂnUw#fjo9ûø€`@°`eòepécN;Z~`d`@h«a1"±sfs2&y#svyvbË$dceC.ñxó¬Mswak(fMbç¹³LE‡_MULÆŸÃ@MEw¯Ä(Nh`!!f4!àcIarm@g v:¤u~}o=*é}ya8=>(@ÓçBÚ_}IE94z<²“"rå¡Œ$¡Şäte{ü;/n¤&.mZh "eúeşP¯Wby5Tæøbäf.m|T¡( &è& ccæMe<[}cdIzûp1oaÑLoo,+* 0if†(Qc@ow)â(¥`/áHùq¨éÄ{T ¤.å9w`P f3+© "}
`0  b'okõufôDqCC4'BEté>
İsv0ao-İz4S åw:åHVÍRç4'tYŸWGGJDM+9)Aÿ ´z¨c š³!tdfCUsRdl/0ŞeVğslt.4`Iy/éÜHWiMOAE!Õ<bãÅd38Jñocº+er“¯ßdDH¦q^CR- x*%òGrpMßN÷eÔOBaä Ô$Lâ÷4dfdµc'QVíwcE#BqõFğé³
eàA,Éc(e3}.´gãaY¡?Ô GWFSØe]kXY$y1
`0¿ @oJó%åªk%n]hB-(+"² 8‚$ RÇt÷qL;B,¡”3#" ¨ûF¨wÿQbu_5y"Ÿ½ AĞO×mÀKgQHø{mz-kt nEQ ¹1%MRBÍWöUwÒzJ‘¹';š" ! @ÉW!8#a{Ñeth§, Z1$âa0ğ0iûuå¦£Mk(şO‚)CnğQs¤â]n
$P) L[ÎCÖangmwvÀíîköíát•VG©(f|lym;ú1 ‚´ò\xj*?)$#à^
 a!1i ,È{A`tëfH tt&Wúg~É¯äX(9]8ÁR€II'GG}‰N, A@ Lqe0~ocO¯ãléÁbI¡jpzL¨“K! è@üJ¯!uıF)*®8 Ú‹¯-íë)=¥y¬%•í)&/-{¥?=57-)v*-§wì«J$(=í­9-+Lcƒx?)1L(=4m-ÿíl,©-íJªÀU`To¥A=(baÍP•íe`¡_Ñíd’#,Ü-i-	5û­?,b,!%í/)-)=,!m -<Ùe,@%¼)¥ké-,ü,-§--,%-„½<)¬­=mmê­%(
/*:ÍB6èå
ùşdlarfo.€e+au]iv<d@¶ÅTßjG}DdLÂFA[ET‹dj»elFNôßRzDkHiS5ïGSZÍ&l`L}}15'4s
ÒS0xëIeqÕkRnh{f Lm<);
Õ¾%ßøH%8!ìÃòu.($nrd!qN`L×çnxKCqTÈV_e`o÷Xq0ÏUäÖGVAEZ.$/vd`^ú.!ziÃômYg\È/sÈHÉ&-O}ó2ËMvoë$íodC›°ZLoëäbqOåLS$'EÖ&EËmMC[GmHŸHQ!4r$¢WÃqvüL>&kèqiÓÍ¥{İs©sxM|Õ§tZ!L„ª÷ö?n.hìsÌDdş5H  öÇNX_tsDÀÛ\	<	\ÅTK- aæo~Æênò`÷eSßè>QÛé?a}NôjaKP®E.ó¨!FEemãe/uj EG\æ$*KÏ”•—ÁY€Ğ	%6 Wç^ENr.TGî|ÁTOËwDAnY?¥b5êipùOê :KuOñ y
¤"fŞX.u.èÓew édNicá7n<é++¼ Ôtr6akWf¦ï9^ozN{e¥ÁMsaşCg ù¤I¦)*÷ïg|â!ë~h(*/N ;¸&­½	|g%è$i½, e->--‰i/d`m©¸ì,%-­9=$­/:/7­%Ee/*%-<o-<=/-­­-­<5-J¢( $mt[ùŠ¦* (=-„(½Ô(-ª=9ÅŒé!,/(¯ko©}m	.m(5/,í},=}9v,<o­mm/k½-gcB)-¨/%½¥©
 b ¡Fl æ`r§v&wŞ0lÎnfİUäró"v.Øø/If)bS1fp³Aqe$R´ig?î8ˆ**/dcëuZ×½§wløäu“„}\L.pgu®o¸Î*-ª«¸+T$må¥;Í%%),\K)My(--±è)ªma-…%·69­mL-mk/-œ½§$=N­%v-…$}©%e+¹%®=m5=Ó,Á-"%­J
©Æ`ìpqHàs d8g.3n¡U°`u-cc:`Lƒi²~8i
ªe,iãtìgwD÷Feåc8F™tq.(—ğr:­;=!4pu."û-hl¤}6âïêmok5v`/
L2>í`mlëîI£E«Pm!é(!í)-%') 5j­?#¯_=e%$m(-mvÅ/(¦/e)m+l/í©/mi-¯-m-=G/ì'/-¬9+m%)fg<¡ou/-‰‚57/+/fĞô¨CÎ0ğV]déXL@ÎRJ§D@ëYH½0g6dçåDd°V°,8:fã,¥e)jíud;)Ô".ñ[+kúmg®Gqa”iC*sít®YÇ;igoQô©RÅLKTgrŸVÔãQAXGGN|ÆHU"*vråsci­æeìg2XŠıe¥"g#Ë@.eìdÚjPl±!º«"cof T&uJu]P(i8?» 
`X	vwŸÁtqaÅ¤r >$GUu%me.\¬r'`Ù{@1E}K*p§Şp]íí|j"£"S
! $ /'hd&ğñ)?ŒTwpmHmvõrÎ5Ş>Eåta"lo;eH¥q¯Aoc.UmB¯EZXMwiDào{+)l>â`wkdš8­%j	G#š~x"[ˆ(D`¡WOds4„'ysiMt†41uµh8}:mÌ`qô)oô®eïbcÍ!!=çT&'­cf|WÀvôJó+¢‚*¾npusúğrvHCb>IFdg.yî*ì8Ñ÷Pvúo6HkâmooüÄth9+Jâ ?Š‚b±hk%…` {H(Š"!A~»ùp$)×Ôà0d}is&ÉğHDgi*Di h¤"h-y^…)!p"ngËvåQgl}§-¨"`-nY>p±T?*&e#„/Äj%d`nt'õg/véOñl*u€Ìhd¨jûØ`£ö*óÃvoNlâAK(kbT}
&d¢`tlc}*IggdÅlmi]N}aV\Yhr5çz(tyór>;,4.abL<&î1MdFknwRéáè”KlEæ#<cuarwuã.5$ ¿aa=Avàt!ADpFuc`Ù2rkü1ø™>)jfe2éR/»aW` àfb©qt~Mzi)6k(x!D¡>sÁ`ö @lFùyOóctihåHeë6exjZí7bt t/hÃRyBBy-Zî»i&ä-#Ü%àjÎuKDiQK`H6IzW$VQ,lgg ToH¢ Š±4nhv.VdµL¬äíşpOppPBBÇd4QhÓÍœGnDqÑI:ENS_äT^ 'Pa0æé~ÊÒoKaxË}ğ¦cs£ÌsÔU<á
y!€+æ¯ÈñpFå10dÙqRuõä.!Ç Öc$-3RJ  §ìéÃ,İÅå_Ç+Á}ïü´W~xrKf Ö‡÷hQElÑZpFZNÿT{Gq4@îÄTFJTñ-KBg`îm!,q @¡wadïqOÃu04_xlñæ0=¾¡ae<Kg|etupXpy%pà)*G($-k#;.(!8‹*Vli‘b`hgwáNmïwl©¨{))& ¡Vë	`™Oõb´ggxäwq¦h4¼Òíâµ4]*å]X>Õ%m;æ<5°/cve#glfs#““Û2à2"Uèµs_õlåíEvğnáUkl&®âërBl|")15ğqÄdw®OzOà}Š. O£eõ|jn¯fôÃTµ6xÒÙVr2t¡ìa|Í2(`sÇ|nëQ2ïp<bÁ($Cusia û2
¨6Cç¬sAB.çsàí"usSaø@|:½"dp`cj}uöna|(l8??ap,`C/ÆVõ í+<i>õ aD«pÊÓe$¼Aaaé`u`gN#'£jõ¢58à_Š¤Ô '`ìíä ö`şiBjö]%öàùòQ#hì¯=şVX®g dC~DWó.)geò•ieuàä~µfläİnVæci$Eæ4W)$´Y*+åóoò(ìg¦÷óë$±y/ z""( 8p4 pW,Qqê3®2&(;
£u†ñ¹Ÿ¡ƒvpB3ŸÛÃ?lH-m|-oí@rv¢êÂqMe.q.'äå~r¬2^il4HRLp(J°cT‹%#wj#`kpfã4h¡4vJU±hğd$¼&ÉfâowfÓı¾ñjásUua$IæE	@è€%c~×9›ataîuxòo×}jĞ€ ¥Úa Hï­e-Â.{n<l$z!õàle´rGôU4|9afBÙNl&psk*Naazg<¯qáëedO@naõauc.`5am‡MTqE¡)•qXes#  -};:+ a‰L¯M;«W@õõîyMajíÎAäA|ÉoKñlD6!cx(rçh9gfŸ~- kadôakıökçfÂlnD+§!©2: 05

ª@(msiPhp {$! (Vhâ³~Ãş©sç÷A$åIfdÙ°4imbwÒm[¨öHiº.Ì%}emıt6< ejvåñëNc?\ 0,)AjŞä3mEhÇ!}n<BĞğÀêhe1"÷<\+aK®_q\ão5o¼8è#pg ái/âÂ(g¨,o§/"“` (ˆdòaë,kwwãAÌãìäÇôA6pÒ«Ft|`3,;EÃ^P_’H:YHkOLAÕT$Pc8f`NWÒhg4Ô«j*@1**~mhf¬SúeuHTEmgğdgvl¨ôw €)0g1(ÓTÄ•BTO ÿQTYaÑIC_lhAÎ,`eoåBwhlRéæm4¯¡{À5}CR°"_pgrDK.Ítéi}t4feBurÇKemeéã{ä®fqh A~Zgy9¤ûJ a âWOnu`*iËñáüvñJ}7N{DenåÏgnıŒ;€ùyFQStqnÁ\÷lp_“& `àiÖà¹åxgYávVe¹+A	,GFH`9/„OáÎ(8EDlvëv´óe2`i|]e\L:Kç¡hc.g.a…It$¨Zuá">Ìp¤!g9ujæG0LeU5?Œ!0 ù8}Ì€" ^^*ÏÀUl½õxoêATÔd¹F5sLVeîÅ4_r,óôZìnĞ2wuº†y‹ ¡0pNjnrf`eCñ%µqUInãaæhæKc5 ]eN¾áÊ^b·bk ¯`$¨13o+s}(vIüs'a»àHanawalDnOÎ>òõET2aAdpÖe"uTå©fL4lQ6Ô<s?y=u|€,};j2 .}^0/p5ÚdK÷²vML}õbo{&uªsìC+Ìä5;%ôZÒu    0 cl/íeìä(",åu¦&òemñtDr-ğC·°ihv}`%Rh+ğ};(1 (`#M$ílqe)[
!ôIG`2€6ÅeauwdA4B.xejo'mÔPv!Á¨ÚbA*Qîñhe|eMAFP.âWL(íP—éğÙ#.A)! à²  4L&t5g8Ìvôi^)HrD_pœÖoúØ#7ame,><| P`€u
µ(3]»
* (%4Jqï¬scpRä{Eé¾i~5(Av!múCCdjbğoËªeàä	|oz0ãAk@Hñ6`s(ntg(lRabI<(*é @fexĞìüÑi†)5]LaEÙ}ùiA¼Á!Ğ«¸7-M_cğnR¤)yixlŠa#¯9)›[¥‚C`m"†º)eå:uÅâl4:o!ÆgSõow¹))»ƒT!H¹(S1Lm
CÇj!¹QH`K÷½{º€0
20Ô}¨cs Ó sb: R%ˆdbTvBg~ì&#(Nl-÷ÕÌgsµLâŒ5¸my¼wìUùulp­NfNpÃÃJÅìço9nÀM§ê­7Dñ¡( ;J0}&(%`ióO¾ej«äûtiog8¡,ÿ¢¤(xw,fso!|nI¢wr×ñ4t‚ #)<6N.¨{¼È~0§K ¯L­OÙ©],-|¯Œee<$M9<-'=-|m-.
e­I­y'-5	cmmô=mŸ#!O-c)ë­¤=l­©	.K4- èO	Pùd3Q`(vnh11j)²1nMc!{ke¢cĞHúŠfŠ0Érà©*Vex`7
`Eô »VyÈijp2i;%Ch4ª}"†kíg³gbc?çOİ3TzIl#cü{w.íqkj¯UÉCeÎ)ÁIK°j)§)­ÅM--9m%,=,1¨;$h>5}-¬)µ<y=m-­%==®k¥?%(/ù=­.ñ,$m-4meé/+$9m-­¿Ã­»é ojçjEP Malo|-j{3"%hysbFceeª -n -¬+pbí$‚=xT,l$ús´lç`bh÷:$^6}eH*k=O h0GqLT(l¤7fwS`ählåxçiÊ»$vnp`²ïáàörUmÔ#%R$má;js!qŞa$D=|ÅBø(uo#xbå)|c€ôˆcÂ¡ít<u-:;va-s^¥hqçëÁìd}Tştšb.b©Nç6!/fäig=éÜÁ ë˜í8ceuwpUîásM"¤j„âîòA×LhEr æÉfuPeN| ilC*…~lñ8"#XCKßplí;Kc>avEílŒÿ;"rÿ|ó,MågaQ,dõùcå¢$% +æ@"cv s=nAz&{ %÷rò©Dg5%°­ñ³rmskcm@20•rNiö!Ê!>\d-k{Yzllùtì*`%×myäq.Šx^ o½(Ò|¼nM®u<7!€5ìeNekr¼{4°vdÇ;6<jIbc )‡aãaflbğkKmˆq>cÖ)å|
Lf+.¼P¿K÷-Bl„Zqu,ø¢ mâÂ-{hSĞu#_æsI`QìDõsYÈPlGİBUV¬¥È3¤?dBFeG»#k`wT$CDrK^NÅ8m?SM¶	2=6E{Û=i
óüp4<ŞEfpÉyUCkÇÉb1îâ=u¥zgtnçÓk&}ñNM9$4”³fZÏLÁañ ÂaJâwQ¦p _( IO,ñ}72ç$Ë0 o_f~)c(`ø
2j ,eQ+sNËàgîJC4ä tbeS>zFu4Xoffê(6^fjDÏ8"¥ wN?sNOmÌunOrEg0®BbCl¯nK/&0ô(
ap>[AjÁ'm~P¨½0†ımz+Ï(ªyXÀ2sm·£9c<2}Zë¬{(á"aAj,á@Q4,!So\atjDiÍ/Èã@C³iø-o(A"2  Å˜µudq$b z,c)qJ8k+¹8 !hò§¤0qB;ä%¢ i“Àu>yCFs`en˜j;êô"a. ¸$ÌIsîó/ê	g,áJé gE,¡0olab(!alä	ve*tèlQ+7çsòÇ¨åi$ä°yanz 	m ¥~HËzd/U^‚éaên4±©Mul1!²iz`&àf‘c.Ék×B_tS×OÙŸ[B0
 ²‘*(sßWU äâ<E(8kd[`AK.O"i]÷!+šµò¦!Euu[ıpå8ëğjm‚åBix[!j(';©*š¶"‚9éL[¾—ãîN#á3£	±²æ!1qf¦0Biix.Bóg&bmdJá')31"IqcVvªƒ`±"20W}½'õ|!83qvìqskÎ-›š%$„+,2¤tw».:$ !bı
~)2Dh|X/:Fwg4Öì´Jeˆph<kÔóX<lict>rå,mwEhãQc-vãeqRHOõn-I+*q$(tø}{.GAmt?#|%ç(íQ´©÷o(+)8=š(p
+p 0 Dêj~mRÁlRq&9?Ë " &X6äìe't^Q¢"ñl`j ñk!ŠR`4âık	 `ÿ"'®+Hòoe<jj  ^'U×e\G©F>Lˆ!0>–ˆ&€ğ$(!p¨)x
]EeU$Âä}©-*0("` ,Cnn[´°da«ÛDÊ,Bp)€eïbumánˆâlMa÷gAÈeÕfÜõ"'àis‡ x"P" àhé²KämPªsd!pãä¸Oà²% tB«s7c/ÔèG(à`³@åi{ E(  (†`$0.èã®_#jgY+nfé‘¡ZAiq´Å@#€y3A %vbCûKãroUlgİA[ûOhKu'ğ$t)GY"{SÜ€ÙU_FIDÅõÔ-8¬9 ¡" ù*.`  (\høn'ÿæiumw{l3ı(à1õi&uox;,$0°12$ ,?ür{2j u@iùçU'ì'4^ò;I(ôj­ ¡Uäç4¿2fkË¨ãë»h]mÍdX 	±lbunliCä] ;0f¿P}fiikV%:¨½¸l¤!(g.´«yz!KD!gÿKQÁüdyªoDïbEµ¯³?fÆKŸ {!;M)L`"(°u>c?ª 'ğÅ‰'gtLa}¥otÈ¹ Wp0`€´$eàtuÆa½lvcmNR£bØn²öõ«3Vví9a ]leod®p`mnptábÌdkoYzaîpi`Lçâ
h ú ciÆâ0¦mmOEmiLp(¡¢å}$Å"e<dl° kæ5Gq7Oqv«ìD^Eûôn»;0"¢:2u0¥cnÄÑmg&èæXLMI$,,!{ºFH.¬L%&i}dµkvpd5(è"Dq"`Ut×ù~ÇãnNêyE¯
¬<mÊ€$_ãôzr~æ uZc!âhaad2(t{i`+]ÈõJêÖozu``D[¸$!&')på—zn;3  "xÊˆ (&4<biw:^soN`iô*km{4NlWtlˆ.ëê`Ìf0thgc.neVå/ÅQdn",í±‰J Jä°a6p.<Ã'*dèşz7)nH|hé°vKgaUAluia¶2ª)m8GTNSNé{Qeh\‡Ü¨(#i=>@s
  4`ävhîbuDm	rœ óÓãeßüYç&5|bkÃ`HlÂca#	[2"!d}¥;*  ¤÷)¹ö,{)c YğeNkd âlzÑçë"	!<ˆŠ!¦ğ©zõoaEhH zN`6$$‘¶ ,!ôx¥s<|)2@õ8uRdTb:"{è @À¥€	rq0fxÜ$08h}ÊOD¡¬$]uuGrZclôfm.lï(taQ…ep}çol©PCTNUYÙ@ğO[Fa+CŠdÁ¥,ämL3-×eluåuuªb¤õkg)#û0aä U`+o6ËáãPv%¦äA$à¯fJcaYS'¼’(„íuD%vMòiÃªøOëô=K¦fem-éeyK`ûzÏ¨då<C5}LA¦äOrĞbô~v?pi/k¨knà«¬gi¯à,aÊ$/çm,%g™/cîäm©,ô arº^ËezCQn®©"Aø%©¡ä*Œ)®
:ïKİ^/f½"c©	1Í¥ùd¬)~D=­o-]]-m=½¬ı/%-å´­¥»-)lï',?D,%¸-Œ,qÅ?Eïé/mk%'¥§$/‡}¥-%
p'¥
-O|q\úa0@lt,yÿcQJ =1hNkO/qU7¨W`é/ÜpJà«(LjâÁ<yëÖfe}gefAÍLtb>wTtpÓºo>Š¯ü*}ço*ñtdf{mnovpcü»kñ,bloj<ìzioHÁÂa
KE(¨b ì).- µ©!(¼¬w­¡/Œ®¥l-)9?/O¡5­,&9/?'=/])--)=#iM%c6ì´-í®¿-?†%1w--y/
/ãkh³ñ€åcK%|vd®D=0y)3¹²ët…da,gî4
jfQ=®º8fŒxm"§oÁOK¼$T!÷Raw3ægÁtË-âóé®l/o (s ]èDv(Sòr`"ZSCæÙ )ofBÉ F'nc”$´rùlLpV9 k"(„lzipÕ/aoo„u> ¥eÌdÈmït5e‹¶*añqiö/çyd>&¥xmkí}`u5
{;œoæÆ³´¶O@nt5ÿ}§fkcup´Spr'>€CÍst$ÍJW'Y·&âtw"y*æ.Hdtpp?+*c/óv!×ÀdWĞ_Sş' ı`Á.`¼FAAZ¢DY4©à#cas …GEbH~ÇM!õ÷`&4÷5İÌ g¯!saHn%:ìweTQ9kFE!]PëL#^hs”äDKL2_CeÙ„
7NróÖhGacjcdooOª~A241Fd	Õ~*U	,ù‹3Š Ib·6U`JÿóËˆ”¨6tQ ~¹å:RtVQh~Î	VÇTrWÑJTg1 ¥k{Wså&÷
cyì¯å¬õÁBEÚAVÍF3ëOERG = âC©ãaöìBI#*È¯lÁ{cG—~ë}qTp#`2ú¤Qoãšsurµe|ï:à1qvExw! â2$xhy{&Oö¿Ïdyg<8Ônìsİ/Ege/nªg(ÿ{n'ékš€@ä¦ôik2*_s(áp@2d"9ö!Şrå;(°$¨véa.Éäñ3YpæM¥ÏÀSbeothon =AkGMª:Ê '‚¨ºq pxfwt`,	!{0k`2%ûÊtø¡{K(‚6(9$vôbRF, ]e||šÀ¤%¸ á–üoç½Ë5áB1!q&ä-ApL!z.OôoNFkæ; (! *fX)% ‘÷_hUs4¡wêøc{*PLP(`bQäPB< 0r
]

ôeh é²(‰!qt.zOcda¨,î#, €80$rAPEèe-IjtEç6GU¬ ?˜(1a§Ê$€)*Ä6ågv{oòlårhbN ]<sQeÔ,ÇĞFG@ŞÉOÜ!+›$£"ì>)ğ'­ìqã¼Ë.Æo¾iın¡Òng%wPüW_8‚B@ 0~hmÔX‘g¦?mr.î¬hd/ãÕ¯e>Ö,„NGÈTMUrM$¬ õvEìt$-:t h±c:_XgäDìdf/c0âÁL%?Eêv	+
;0('plïüBêl¢gbd/Õ!ÄŠpüEPÏAıZXoRDETAC>,ucàlt ½õu(kÇªøQ"\UB!øC™qMLÖsi¾ğ jª) ‡xbsn.7h3UÚ¼Yqe+-xdeŠ }ªsü&tYT…jaeè«S°"$ı&`+!táwSqzAãhòu)fs $a$dpMb*­¥¨BM
<0a9-ñÓ:Y!CAV`Ğx@(pñhzm?Š†f!"çp=nõàQn0XerNiNDpëoôuq´$bÅDÃFÍNLY¶®J@ùÔïo)X7ka´È
B#$ZşAmôIm"=ãtñé},-ö%ää	(wOd%À-şSqõ2{$²5#0 Äáq£&dëÈÁ`d=0œ3ev!®T?2á$£bk_6x»!` åq"v:k¸mİí$Œ=Æèdf5õp­ ğ.mc$Scnm/i›Ñ !'ml¨:Sr’=íP&½<2õpCymÆfÔ4xìªôwS¶ME }-=#ğ:i4E(îOm¬v$}|©tê¨Eïm'æ^8.mjô!3v38¼cğ%!t£!{"d$±e$0GVt{:+8 1„IŠ „ ¤kO^w¸±}MEnås( •mMvæôk VLgénÍôw-cu2Ác-aCAdds`-(äÓEh	lpng&‰ã*h±hf v3HQgp¤!diîgæ½0}}}"°{B!q 9$+$RoÁ-TOMN5>d-ã!r$;Êc#¦>0%½v}è9_£¹,lT[0¯suĞ(L!wDëBDï~IÍ`¾-}¦Ô-CkLÑ·@çvB@90YJ¢„¨j9 `LxmCbç{[wWiO-~\{.=aäoVî0,à6MdkB59+i# $#/*à¸cj z
é ƒ # e|fâkncK!#voUs(Qb``{L0bX
ƒh)(¦géO9dob(<gÂ-Htì`bI  a<|â–(Dthn¶¬)u{n$¯}ÑBM_9MQ	)YH€1a$(p|äYcj7u  õ Hp 0U‚)o.Il±C|Æ$p®í&JqglbtqNf4=0jĞaË4*Rêºltk%yÛhRkAhI[uR’aTÀ!¨Õh"G^0—$ÈwS»Z;»° }Hˆ x_ÇäuCË|/i×~1,>Fëwéà:
$‚$°`oç;‡¡ğÙ¤	<İD'GA`œ|”¶<H$!kPî$'.‹shP@oadq[ÏähcH)=µcOM3l¢``T~!v4ê!fÁJ`p˜Au@aÂ4 d}°eCéõroSO¦Îég!HCÌ4f€§nffiU”¤AøqhpPùSo86h;2!ò²raÖéPW*cmgëcB‹0y
Ù;Š':oH20(ë-©A­]%h=lËM'/o-	o))(=4”-&-=ko F®/d)ä-©}%mg©-%M}=-M-,M%"%8!,)‰-ef-%¢ê^`{%cap‚zp=4±$2hl©îL´él$h7ˆÈc Iåra>AæLîØB&ËTi(j­tP*»¯_gIu}mèIO,•TcVóÏà‡uyaÄèt«slöl hNv-	2„®Mı(nRwl¥=¥%-}«8µ$¿-­*,©	i--}99¯í$5$”I¯ˆ*l!o­ï?5%s-5M…´­ä÷=\-	(!9m,)J2®
+2Ë"a3D%,&İ£,;-*/7a=i,-!­-,$6,|-lL'---mE¬,.¶,-o.OYÉ(/--),---9O¥+ hcCïúsyaôhç¢Š@ô˜-m!m/m&dm%-/	iíå'ü©'==/)mu=D­-/,a%?®¼/<¿/,Œ,n»)ì$i-%¡= -/l+=,
@jNZBfçN×ÖløEM °`îo‡lè-;hc†.òt4tAĞgßkLÊ$0İ(åa_7ìat¶›bn.a´hP:Kœmİq4V"µ$p%û|ÁBa)MI¡>b>Êãoî%4!FALaWQ‰#EM’3¨5¦"+'a}àkaR%w:¼ólf"|¼ÇFK‘k[Cqéµ"-4Dyqqré!ÿkmyod©@éjÁeAd¤$!!g b[)J|Âwx¢ ÔryT( ‘ye8ïDu3f8òP#qM(ª€¨&nf—3¯à6Òu¡m:ŠeO`³ğ$Ôm@Çepˆ¡põ5q,$û !FûBgrOğ3á$b¶$åùnlñÍ2ek6-…¬
UH
U)"(qp(L¬ROl.C,.( 0wKÁõ**r£j|$Á»7J;®ûchQF£å–EÊ$~èIdD$7t=@yeùåg,Î(IÑ]	MX$2lã{âols1PEÿÅLUlÉ]3q÷‰SWO†ÀD&~ 4è\-ÛÒÅv%V|%ä4s„ÂÌt_S%Z~{,>[soN·|"I•WÎôÿÿKDE@^7CyğDh	iGú$íUBG^õ]‚^[F`¹Ú(*hVöëmEhÕOaD-×!;@<"àrB·dyA[G^ÈŞ7Ç$ÖxAGjn(E~VÙÑ	_vş (?áàiOc.]oGFP5Ex%'ùB¹Jãk«s<¨uÖUZÜSĞFYIãc†¡`ts2if%l{OÆ "¶_‚Å]À5aWoì[LàASaÄD_tÔÂaX@ISGaß?hWkh¡#c¦k;ihr0¤óö\VÜ_EÙŒV}"9B«oî¹ñ¦
UEOÄÏë•+FãÄo[YÍYpÑ0=°Tjıqhg÷.i{Åys8£•^Õ^Ğ_˜„Ï%rànqs(GÍ_N]F_AkG¬ÛIé×r0xlEpduPtës<1J@$3MFCŒTûg|$vt +´'/`e4/ŞPT_M›Gı…DŞÕ¬±ORMÿ$6°ø&gyr`D[7æ,dÙÃMªvt!eWy\NMÙEY¤5}P+Óof_ÑDwCÔ_ZÜNcÎ´@PPE^ç2`a.$GcckRME vT8[Ğ¤>½$Iô_Õ'_Yq_TdI¤,}f[PhnÿÕºCD"qÖWlÍt[;áEO€= S-J|P=%n„µ^÷Y
wìæQd@“„ïSÓE_cX tEÎ]&5dı ‡.eVee++…^ãu›ìA[KwNÍEÏJJU/ôb> 'sLNq79
¢nb`pegöÁSBlLÅŸs\VIF" %mïEkÎûmÍÖõÂãí''*ÏYuF]2@BÁ|í9ı ¼"/É!daJ~và?ÒK£/>9r ÌglO–İ¤[RÈO¯¸- g&mÎ$iph/áob·9yb'
{u`C7UtÅ[LåFNÎZbMAy-0&ííéhA,e¢OõY'ksu{ñ0’uLÃ*fOØ]d	JÅ_F_FŒG.n¢=`'Sæ FiO3ò=p)ÏW,ñ]‚iK 9m ßúª<jÊS²-"í­­3=I-¼M,<ç%¯-+¬*/%=<))/g	­	/¬&™?n'-L¾%[!©iM?!=ä¹=í!$ /-*¤®(`cãc€LAäÃYiTÊ^n,t,í)7+q)Ş-g-lìiı-%+½9%9,e©=½­­}ií9Œ% å¯ˆ£?-	/¢Ny}ª.M3í)m…¦˜$MÉ-¡>:Â¤)ŠFakawï`lÉl!÷ğtA®¡âa@akd'lhd$ù~t€{*`0sïb¼`õDlñ³*ôˆOõÎu- w§ëvìÇ)Š{Š$(øgõp|(F~¿~jv/xšd¢(šÖ,!q'×ñ7Ÿç1R°İ!àhyQ`N"d`^mÿF­ç,CL/Éoí;R¡,|lX~néahK=}hÂ§èí3pnĞEO/åŠFh(<ÉïõJSWL#PMS_>IYDkÇ=f6Æc*NÅ¸gguê„(©  Ét@ã~Û~á6~n6G’lı’t)i¹¾?Lz)p3DizÄædCklvoDª%"š  &¥êjz.MdfqóéAép =¨tk!r^YLoveil¯Z'EBEwZ`a-ø;™#¨!v8YS>|s*×é/}N#$57aL{w?*8¨`,V`j>[cu.MZçxcjfú*é(,R/È5  lÒŸ«1B&¦lˆùP%nNrq1h,rh–Ylni-å 41filc¼ ±„-Uˆ³¬Û£Ès!$¤Ic6=«JUv!SFr(nl@g3A¹Ghopd)3C ¨è0//@o(ttpóB!l§8t@W$g%ú8Dåwµ€êô*! Ï!¢ "bEqwNqDWæ!ğÌv®1/z ©üZ€`stahós"e)tGÄE i&Yª&((ØaöyøfFÉMÔ.·#0u¢£"òu"gó9iJ(ecedM 2eÛP5u"4¥rRN~/LyÁC*02å=ejn 4xák,ŸmÕV¨|:`g ôÍi[,Xhdßj¨$j v!Ha?:è^btºÅ¦çğ¡~ÔeTeE4©6~NÌbp:â{Gù¢ &3efTaz'çüm8/Z ;$¸}©+¬ZÉJZifYªme¯¤<|ùõè%S
	ëĞeŞ2edIj~éKï)%º“	*æ  0vwtõóíw
RâCemp¤p coiV rbe_×vefe,%xDnUN^AanufdrN,ğaGMÒ*ômS*Ve­LT8| AUGwWËOÔ1~( #A a"8ZuŒt\dHQÓfvs›D1 ¢íM+ªv àk ãh¯&Á4ÇîSFgv¨eÍu0rCvaz9uâª0z>`$q!- etu^ïq`¤K=%0!!ôlmS,_`sG2n.¾I8-4re_‹J0(`"iv  m`kdD[HoPj`¬kdmf¨1ŒÛ(%¡@å!¨µ?RëWicdúc~q~Â^?¯F?  àsTi3* º  uH
  gm©#¿óbkllrçp.Î[NEh+#*B%|j<h-Ë_<|,ìbnÀ%çhqcğ\m2/1ü4jSLÌÓ3NJ@á~®F;=nJ1!"4`ê9bîWpÄã=³ÄDh8\7ä]OL?4 h`|ú/v6eäDkf#PgñljbH	-3Jj !"ÕH©S_{3`1Ğa3{åE·dÎ¤j`Œ "0¤G'çêpJ#OfùìÔã eJéú¯Ş`
ElIe>(×VeN_L5SEHßWOOIKP{s¬ ™`|4 ûb"`E 0DvåvedA^ÌdaêŒlNt,z«càBál%?1lTkGE.}]ÁFÿóaF±ÉYGIQ#. ERöèpÀ9p²{(1 4 `"7j.*|mdñ&ò-éğcm5à=k"ôäHK®åne}eè$n$s#ô°œÀ³Å  exhyc²^Q&nb½‚axÛpZÅò.T-c_°-aDvßE«	"!()Èp"0(p´šz)¬0ª rU%;
4À"4ÁénÓ]ub}UC ãä(Or©àh u;`”aKúfzÉmßO,)Må¿õc!da}ÅftgpoFX#(N'!}b= xyF´Šzd0
#m ú!6h¿cîÈqr
w~ Ì.¢İè#[ék\ôq®°«diÎhIïS5(q+ qjÂ$&~ó#e²ş2Š9x`•İ(« c_ãea:O<emÆ…¤(1aÇVÍæuíûn\e5:tÒ~SfÕu`5øL?kmïGmíáiˆ RV.D]NÉGA£¹3B°"°£Iï%‰¸[@dOVrÌ¼.äu&uti|x1äS$mT¤d84{ñ,I³ @PÅqåâk0&, ‚}¾	 „°`TxEShÓ|]K®ï&n =àĞDk%7jq8" áıLzğ!hmìáğ`  ¶i)u¾_êUâ!üàÑdP%!Q¢Ê´=%$¸msQJÊlA%Å )(kä &(xĞi».ï[ƒeg+ãA\iNØy¶g9 ôr÷á" |i hY/ër?Qq\ÍóDÀpÛE–abj+}
*äuéªØí9Û>ó_{mNDG÷und«;›
0(m)yiul^ækñÄs5R}p¦Rcd'!;nPPî=9-"C$HI³?Yõ,díE/	\`÷Öés.:}!mÖaÃ
d×RMl¥ğkan×¼ ;Jx …öàf7UaddddsºofnX|iœtg|uÿe.ô-`ÁÆÔˆRÃm™CAfCKY9S[+¡ ğcdëfw®dT1î.èun<ör\= @Ól%ÉjÎÃ$RIå¬`MÊi}d_Fo_kÃ[§w)Ê
 &€v`i÷{_sçmåQKK~äs7e:§h© 6(ehY÷ö|idñUo|#Ë-+,$t)irn¬n…vğ,ÎéZú\M¡ö§%yzŠ mŠÊX`r-"xnudì/1bK„ªrC?GÅnu¬`w¬ir¤e	clçCY\ïúA|'M¶È<oHá emwû» =.p‘e|t»!ï¬lmø-¬"f fsxED|@e¼×,àÇvÆH„WKÁ{§•9K»3%c<´hqõ4ßàa#'&[oq>İğRıO~Ôé-;i¥!ªö`{÷ªbìc%ñ4`µà&\•!Cdiçgèİ7@!!cÊ}@`Šfiêt+wf,9·
! ½Nv¢beÎ`lásòîvq,- ßÚ 0ˆ f,+sï^b ìmstGltmï/yÇ»B(è-ë s(.ä0f
¤ oHï|hlíÛonAODRg`*) Y:&¹ !ra|j3j#GØco4;m,	,j`  Øyc^m}AHnw90S¥ïedn2Hy{Ëzsïg.!Cgom&gğ1.hèa< w/$'ñVavËgÎ3w0Ba,n°ûHml®´5 U>3NC.au%%v@màtrue, and booleans will keep their value
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
