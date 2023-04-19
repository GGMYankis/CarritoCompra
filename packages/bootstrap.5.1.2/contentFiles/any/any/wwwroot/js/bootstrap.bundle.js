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
     �"*�N(nam�l-jU�`ҩzmh�n�(�h!y�h�s#�`-%v�m�&v�U%u9<�sd/b�ON�J��!�%! iv�(%1l`�(^|6��,�aZs(!�`DqhvtT)�_�( 2<`@brb ~`@~qڹ�$�$5	�!��(  $��o�^a�Tl��$Lfee�p�"�3$M�rv
~�tR^5n�$�.Pjo�ti�PWbn}h�qf�og?��@N@~0x`�B�e�`�"~q>T9�h ��%@o}v�8�$ap()n
d)h�pZ.((��'�iu�pD�e)�h(�� � �!g�
�U*�EA2&v�_p?)%�k�mh�(�`H=a�VA 5k쒹<�sZp!� �#6LGu�-X`��Vqmcg`JQ|�h]"s�e�e*`fx-B%���{|.bcDE%jVewtl4(�o6k�j�1mPyR�t�%~Sf��I�!�1�#:���i$`(��)?`�) f=#  j*b.�gf%|�v\6eMh!t�0Dn�\�c�(=V�n2�� le�۵N�<�ly{O;
:  N $OjKe'tLL5y(hvn���diifntl4bn�N'�Ep8�eyx��h��{#%2`�")�p� �ak]sV$h!��.�gt!��3dqh{��l5�+,2d�/I�e�s�\	sW�d�qF�\(��%�0A�(s"� @Dpm&b�KnDqhqR\aCf,<]��s g�=Et�PT�rdf4{=o�\]�5�(r`F�U��X9�ch9n��B��p :� �:�(eVe�i4��~�ze�-|�{tWu1&\ne_EQdlJpp-{�{ � � � +*T�vH������)Ndb�EBu, e~e~s{ �7���6ENlx"%Vl�op`!hnAe`�f&tdz*�=}eX/��(�g$gon'qtE|mb)�*b���D  �g�!�o!{� �% }����Rb���MqZUl5-W�5� dv�n�� i~Q�/{!�   MM"�t1�^� f'zd(k}%f�cIrAHa#g|���a�fM��I2j�$ Arb�sUt=p.@}lk�
�`@�!�N�6 bq� c�F1����O�uG�k0}g�({[`�0&`{�nt`pY`t��qay��cLQi8�G���T456eBp;�l (i! Cz��"�,g#}uS��n�p9'5vg*w`A;m��Z8eX��m6#ʨ1� d�3w�sz�k�ft�V!�Y'�9tkV�DvG/�U&�d#�qYzCO7u,r�& $�h l̤u"�_t�xT�BB�3�pj�!f�tmbm�6luy$5|�d�=9""�0�Wq+fs5q�eUIY6x��`=`$��5o"),�!�=!t(T$F�5djRz��t.� B��=+l�e;�0(4�`L�l-�f^���s�lo�J �9hk jAnlaie�1gjub.&%$*��Ctc�@2	@ @}gr�G~`vU=(  mn/�\kv�Lnaa:�y9;��"�7�28f��o�+Gjt��Tbg�U6 *UiubM�en��K��	!��q�f-ee�m �jH�a���[�j�-3�2��u!|1w~W|�06� �|	�p4"`"�Gup��eD��1��X(��!
QaeS[mvmg�v9SM/x?niGd7 bo1;�tin�CA,p���
%;�l4�8  "e�aQ�x�YfnvmT�$2j���aRGnt�i;e�eLe ~nren�L`k�.
�
 0��	�:$ Ih6��`z�SJ}�I�e�6�"� �h (E��4<���eqn�Qg%x@-G6�j��e�T-@}wNt�&%;$$`a>$/1 Q�4+h!�IbUlq(t�uA�Ƿf(pvM.b&��2p�) "">�<_�%fqm$y=d�!<02$�}3b�5 l�u<�w�T�nE�E�`8ev��M"z(  � ��h@@v�ftEq.$,q &44�  .QJgaha�\{{$vReA4P3�`"�"��� � x!|�N/�]%3���/X�TmpiZun�`hU%��9�(e��p��f7�}

"-  O� ,|Ypu�o e[gy�i�=�Tn�4/gioL$'(���) 0!" d�`bmbh�/�s#c��/(3r1��$t['qB�~sK� 0��- 7�O(cu#T.<pVi�$YV�j���u|%�kl8�f��< <��x`%%deed�,!.0b����b�"!��<rg�7|&��wwKK;y_�!)�*(a�)!�3� �� " �$�b=��� �d�$��)�(( a,�g
$%2`�p fd�,S&aqlvdz%7dF4�E)'r� <a�d,�<w4~tZQt�k�}eF@�|Wh��  `I0(
#�*�%$Mv:�Jh5ig��k!% cȹ`�&r8Hl��!ad�d|Wn��lMk8�$1��et�$8U~�)�2(("�=
0� `&$dg�=45Fa�|U�E\�k\�b�,� �s�a'gj�d*0����e��yUu�O?c)j)�?	,kB ��j` 2!j�U-rhMAnt
<:�fiN�E��k'y4$w2O "���u�>�a1�)37qr�!����Z��=
�1�,΍Ho:&�r"d/�o�I�%%	�� ���/l)--1�hc,]n)�.m(6)I�,Y?#� �h=��!m>7/-�n/-%-?a��%(*0� �No^7Pr�0!(��*#��`��< `mq4jx�*p �kj��sK�j��j4Z�eK�  �epbs0<oi�j�3/b�-d�r��VwOvӥc�xU@��`?�haN?LZKV~g�,D�*I;k����-�-�m		o�,%l=wmO-&	--%�-<--���I%�$�'u-/,���!hm-4�)-�%-�L-=<j(c\��(�:  !�*nm,�le9!$��`i?�'�#=�<g�}g,�<;=�l��-�M--!�d%<$#,=m/�����#))n\)%*0$ | k(sf gt{+%%!�-8=m;�$Ls,m)�,-	)/	�-u-,)�)M-#-M�f5!=E|=�4')e=Muͨ7e�mLa+/=� .+-1�R�Mz�$q,G��Nx|���%h/%s�!�0;*D��.oEj��C�4pJf42�%("A t4�6,��}mF g2��qg�iPZf�$)0��O�(egkd�Lg=��*ha���d!e'jtK+,{t9���!e�Ui%d4MA�nzap.mw�hMr44�low %@�l�j1(Ii1uZ@%ra	$(�m��| in{XՎc!���*=&%gO/�&�_aqh��(%u���x�; �wCi�K[ i}on<�z`�e`n�d]47a�`g�gMJ�7iafr�b��jtlQ>�d2�v$`@���!,�htX&d)d�}d4dA�G�$hE.h�}dt�pa�5�r%|�nb� A@f$n�_�a�+b�u�u�� !"�2ys��$y*WPc<s`�Q0$v�z8cet% �f�,F;��>r/i!x=1a�!; 4$$-={�<"! F  .�-`as,�gT���Iq"�a=�b�$dt'�&oo�Kg�CMl�"��d�  	7b+sYLu�m^4W�@*�fk|#�h�`,EPs,c�Lw} .1a��wn jn��M6xVIjC�#a�s�gn�m~`.��/}z`�m~�^A�#m`��prs�Y�>q�c(=|`�a� dM`�iA0��)Z�q0�D� p%`�!V�~o`�B))"}�" @�$@*n`d`�ro�dP�sQ�>+uxL"�K�4HnY�p�
9H%3ou�`�  uduam�/�d��$�e�w�(��#b&mf��,��Mnum 0'ye���AouJdt8zKc t�@z2�u�sR��#Td�gn�~��r6w_|�)4�\)/e0k�i�(�~&G]n�; `U &} ` � c�~tt�ag�l9[�`
 �J��%0��a�o�m�$�G\h�d-h,a( ��r`�51[d�8!"ieA�;ġl*��o1e%�_<<�0Z�%0*$$(3u�w�n�� D$`-
  	pJNntx$z��ecocUG!�V90�L'�env�g�<�a�G|��m9>ٓ@�"�#�{l�f�+5^uԯd%(d�-kmph/)r��dw,x�M,�Wa^�'P�fd�g��S�y�1hMz�����F�mn�Q�J`GYxlfGD�bf��{Nal/Qg{y� 0 +�2IiN$(zfn�dOUQ`'I*�=4V$�%�{")0( "�"u���h`	a�$�gY%Uo)d|%t%�t,�"�)* ��+#*!`�+��ij00�+#�``%:�)�/m!��9.m-U5��m-,%=?�/'��}a(&)-,-o�=�a-|-�`-1$�%-Ok/��7a,%q�8�--��-f�+0$�A��q}bSZ`�P78���r���=�&eAi'nT,Rb�  & D�s%N2yD�y�a� �u)av�`9�̭Fi5�UZ6q+]v5"u�Do�4zhr�b6-mE�%a�m([pe�0� �8��-i	mlm!$�)=0m>?/Mm-��e_��,�	->4�]�<nm-`��/|,,M~-|mm'�	d���\--L"�2�� `+�[/�!!- m--}k8��m%m%�� %'�,�-%� �-�=-=�?-.},w�-*?�%,�=_m/�m	)--�%EMm%-+%N0 E*(He~�4a�uI "�3��-�-5-�=�1d,��m15,,=�))(g�o$-�/�H-)�U�-�&S���=<-9M�U�nMl��o��
%�/�8�a���_*XA�O�ML$��c%*0.:u��nk(i�gs�BE�wWM�0���t{ b`#c��stre��wb&���mThY % �<b$je|t��$?EeG�U$��?�\-W�e��q*��"@(��4&e�l�o�4�p{�!0�l  �-"��ez�9i�* b`�J
0�! � tJir'Qlmq%�|5��a?tl�~�� �4#FB�#K��l0�`i{tD�e-�.�' v���c�9�)��k��r%L�GhZgL1\H-Tk�\��&�Yn 0�v�;pm��� �YR($,!(4$�EqovO$6�(�l _�^a$�lu�T��v��s�1M�y�a3sfsfNiA|O]hj dt 9 EGi(�YtFedmz8/fft�-z>Gdgmek�H��lg4`0P$#4o&$E�'|^]KBYi!C�"��-GbjEit$v%�'NX:oabtm
�im�n}Xmq-0o3E!Ch,pz{`msu(�eDy=2q& j�4yy9qZ|�cp'�YBOoal�9��u-�3*c�(04�y;%� ��)�� � ]q���Esk}@$aRi$g#hi�[hc !~n����Ll�`WAoh|1?y F�*eyD{+`	b0P�e8�s;Wm&UBgLvSo*[DPo,b{#&�q@;�%iCME@Q-$�s8�-i~tb(0
A`1f-"�X ,+#�`�i�4,C*`0! �����e Eg\Sv_�@cV(7nY�Glt�`s	(  $� znhz~(�jpA>g�t��#�Il�5d~h�/.eD��/,p�Ez(�C�~Ieɹ;
��##��"s}	Vi�,vu�C��'bRiL�s��"c5!'oeMnr`Ak�&�s�4`ky-EyHH0�Ķ�tul}oeqh�rCGp�*agoco�Qn`-qe94,m!j,7�u`k�8�_aabHu�1t|rD�ΥqopbcwY�4�g2�#[�� ϯ�gyg��?l�I�o	2�$� B0��g�qt!- l�D)NKs	OK�b=q`$0� s'��Z�"WRg�eK*h� #p�*: �ude��aDKEdeDcl��j"y0 ea8djwg�"fe��njh~2,f]� ij)(4O0W�x*!-7nP(4`w /��di�bM#HXwD%&NAAo�Hqa/P!�aC�dw�EpoeDvv!�;�
e0$��"� ��5,Ic*�u�|DRdYok�I;*d�� 101,!R}�Z� tB��p{dx�1.O�IuO@y0 &�%��$(���1!�m38SeDa�TGN�u�Yx�`w^ 8%`#PM�U:�$���d��<dd�	�',9
8�3xwh�a�J 7�* � �hM�z/=+?a��%o4-,1-mli�=(,� A,	%�)-(!;=�<m,-�-m,��-�i�%)-e,�/����-,+�H`e*:4codsD7��@v4.0/oz0]�)|ebOM0k,e|>%v�n*rh/zcfjJ�'hf %Iqg9MV<u�ԭQ �[ (`^�-kK�o�"6"<noe-Mgls-&mdslg�0�"h��#l�+l/�h��nW)� �4: �?mm=M���Mgn7-g�'m-/�｢-�l-,8-~)h�7-,�		/=�-<=/��+%em,-)�=/i >�C,��o^s�(THf��e�yW��kr0iug@s05B*#kg�njt, ?�t�'E =2hmf&��`�/�e$dA#n�T"ol���E;hNu�bq�dck?@qmn`S�'eclvo�elr��\F�G�e�0 0gg��31��M�$_`]mpfD#�fN�O�z!� ��jdZq`��m�,�"z5)iW��>`ةb~;E�N}o �ID@�b?�mks�I�#1�$#f��i��}Ecf^�o�{*+neW�P)�[( � 0xiif�*~8P&,'AB�Aw�/}G-wd��ex�g.�C]F=L0(�"1)�h � )
8�V�,�.D�!g-"dN�few|�`	.���$,�0o�F`�!"aB``�]q��7 F�jLv�ys�	!cN"$&C!1	>Ve<ap���6(F�2}��� �3�l�`n3RfA|!�$%aXI.g)hg6�3�t[�lgQ�� .pC((��8�l�/#��e�yt/V;�}�o�	�/ 0� g�f���n�den�g@"s/Po�Nd�'$$�zWp]`Ue	nw��fLIzEe�ipg�&L%dho&�`HwuT�	IG�$�t�l��za�m�;~pd[@�g�s $a;�K�hno`g�s��u>p���gp�5
|�`cd%$�]Au+�gE��=�(5�i�#p �+uoO%T
�E��#!�, |��Gp#p8
�/�)�  2 /.)=.M<ml�4y-l��.?M-%�j>=-�o$+%+(�~��97-��(/IIe>=m�/TM%9�-���,�)	&o$���>�7$Ӄs�j=u�O�	�5gi���NhQ��� z�Lu�%~wnt�$ndPdeZ�(*i4l� :om6i�k��l�t~ka�-B3�paP-bmoti�a��/�k+ƯREKn) [8a--�mL%>?��-=��m/7+��Ae�!],I(	���	c|-�/-.,-%�%d-�=�,Me.�%�9-��)��,:�;�
�`.J  `z�%�!,,u%8o&/��,%��-n)�H.!��a��=u	�//!�-m�}%/l$-}�%�)=M�-������p �Ky�~rd .4b
 (  `Mom%=)#),-/m/-.Mm%-�L+m=))-5=-)E�!--?+}/<|/(&=i�me2-g-)�&%��*	(4z/u&b�auD�l#z	'a`r2�#�K�0a]6iQ@�dT0+`{�k-3b�,Q!rtu�*!�v. Et^~[d�a�� `l{��A�Ui)ilL+$c~B�t"ET�^LY�8W�2}lb�X^ueMnLT~���C�������Bg.st UFBT_Co�RM  0c,i7D&�Om^ENOcpI}u<�2�a'N?tk$A�Sۮsw5UADD!�UX5d�q'' $'�Zwul#NaS^fA�~CAO�$98} 3h�7��2�)�* f+=#a'	o�w5%o]YM'!L5%--�>Q�5-$k�!�%�<?.')>=�.)%/����/.��--�)e��((*�*C`�?�d}~�nc~qFo^!(�J�l��-���필	lo-M//m4<-��=�)-$.p<n!�m���n%<='}�--;|3eEi	(,�k}R�`j*o�
�oQ!sx�d%^~!�x �*e��3E`oWB"/�j"s   d�bd�d"R((�zvc�i#)�]� �UE�!)��H!�젥�gWgrNNd
Q<t;O2�9 /V;���Qf|)c�J+ �)mNE(�{J !�1ra�f6 !��:�d�d/54? �Bun6lanD���2�evXb9zhmb/�MeJD�4)hEx%U�@��p�#y*_(4 �4KvK�lsl ve�Ujfef�unJRzbeofw�)�o^ı 0`A ��=u^.�4b!&��(��r�b�hi3&�e)��une.f-�CcM�.�d)�v�	c���_�E���-8)[Κ! �Ypbc&cT-mkN�yeyv&�q= t�is>^��dm�P.�mdS��is�/�vhi�3�#Ev�MjO�NDS�8��k	�r�(,]yyr2�q<u�oBsdE#@fK�"9d;>u�Y:.^dCS�"�9h�l�~U,��+���C�e/�M,itL$~cGomNA0ig+}(`$U2=&J���2�dq	
*n::1[41��R@yVx-OeN,,�s8"pB  4c�g)��j�$}NP<2do�>ch!8h.9b(1$D�Fp���Gbr T�nw#�p�th�q"e-�wovL��N@�LN[Ee/m��1hb� e��v~Iw1g��jEz H }�+dctmV(sL{�� $��~ap8B(c[5gg�ijP}z�kBe.�onviO)bS�1""1�G�����>i�k�g&e3C<|`5�Pi/�9
~+$ �%�  6�s.Du2e)�0�@JLvtcmZ�rCS�)��A1|aF�fxe:Ypbz�Z"6�!��G``[uaoo�k��b�f �h=63sTpkm��@�� � �d`!�<X�4wpn��$�J& �( o* l���D�{`����-k�L/fQ#�`:\"�nt�r&dbx|m a?�Ox�'stk��3M�q8�N$\ xXi%k]ag8Q536��o.���|ff�r7� ?\C"�( "b�Sl;v(~q�Fu�EMJ�ozms�1��tx�$��cget #[&ol%al�2%9�0b"`()(��
)!� ( B!$Fw;B�=�f�++dxlr�z�"!.d000';)%"32�l(!8":�&�P*0�%�xoa,-=ޡ8h�o%�m��g-)�/�,,	�+kM	el= u-.�Y�,$�	�E%���)Yg�9���E��$�0�)4a $��msH�%�taT�od
�  
  �)%��<e�1?e-=e))/�5���/+%�)m���9=m�+5�o)=,59#+)'��$-0�;/m/)//m�!  .e 3d��NAj�_�0mHss�A'�'R(��yH68 �G]�rG�5"f^�:Kx6hj�/�$m�f
%�!)���-$mh,8�-mU]-/����%}}iG$-7-1}I-=)���iil+-%m=mm�/�J0&q.kUv@u�"��k)�},,loM��,�m5�yy��g=��m4.n���e,-�5-	�}�<-�4�-�5�)p�4-�?�I/--(�qJ'"$��'fm84qhi�T$tG {Py|Rl-
�x�f8�ESgjy|C6q�e7%Nt*``ʫ̃fg��8uOA�Tr2pb�-)(Gmw*�'[D*��%+�d4.�mml->*/�-��)�-m/*--,#+,M&�(�-+5�-,)�,���'�=�,�=l<, 1\�-:
-od���'O��tskp)63.3$�)x�z}�tm.�BSZ$((��hz�7�ye&n���Tq4�mw(j��dhS'Ui%duClc�o&t3�w��ocXb9�Ep*b~�o$qf_OieN�G#�$�8%(%-��-�-M�%	6��elU�=)�*�mj�-�=4�}�	L�}M%�)�)m�)!G=�}%,M%�+,>�':�(�m��7�(��&d��=)�=//%/��-o-�-/)lu=%'�<.e}%�))9)�*�m.���)'a>-�$M!m�(-5�$|<7e-)��(e� �z2pn�+�@$. ,�g)~�7e?e�%xh|/(,��l�=M,N��e=�/)�,)>%-+g�e?�)g]u-).m�7�8�/$9
 "0(�NYgs���z&Wm�-C$Q�zU0tK^�a(b�(Aty�J�3d� �`mbz,r=VUln�;(d0cG�>q 7V�N03Krp�@q�KNDL�PH�,x}`�"d$bo~c�"LA�@�Q��w���n$=�?ma5��)t=�&kB c�hr�,�XPRS�����kA���E�;1 #Car�8E'*� "olbTdSeNDmJ`_vdK���C,Q&�54`7Yd�dK-kp�t/�lQB�T4u6�"�gT"�m�/l$�vLNF�bL~S[<FPSV��`J�z "�|��i�jTTE����jmd{D��W�P�W*�Yd�}�Z
 ����$&�9=�%�$'���+e+7/%==$�e)4,(=,|-�my��)�/-e%,�	"�%+��,+e-�(�&�-�e--:a�"8BO9Rc!TDf(my�j�p*""9.Y�#����--=O�(�-}l=�='?!�==?�--�--)�,,\-,/�/�(�.�--/m�-�)�i80 ,g�0"Jni�� P4s~$�ltbnp۴W�{'Gn�pO(cn�ي�8 !vgJW�4Z��zX  !����P�+ g�<)A�Gz'&^
���a2��msz �@M&g9B, �8u�0qJ�	��� $0!pog'��)!{>8h��127/`mf~��fT�s��L`hon)0=zV��1cia�(3%S�%� 8�v0h�p�$� ��tz�h�rWȥxo<�dWa)D$`l8a~do'��(l ".Ft����$L�@4EL)�.Oehe�]�..sg8�.q9iJa��i�as+��tfC{d$cDdM�2/S�L��lp&�,�zqL��-=^`g�w(J|[_4U�BL-~�KUJ�@5�-�>�08 h�/0KthTP����`�,#v�xk�YUQu)I�4o�$�@'2b[Vni-�|zڃ"��e!wupd;t�)jW(#``,Xd�OTi&b!9}{	��c���"+��J$�qta ="pt��%.�@]�tWzFupgl�tej��:T`cs�;HK"%�!"h�!L�(�U�o<;� �j�S<d�z$2�0-� �8 dy�d[�/m�MK!*/�@d!�pd���8@�+=�c 0���Jx�<?��/�
	8e�;!-%)$/=-O�$5�<��%-�-l4 /�=54)>hm'�emm-im�!-});8�+=��-�|/�(�\�{)}?/?�em��((�I�>(g0�:��p e5mN�lpinI`!+n.�]�n�/%�+%�y-MO�y�$�,�$)�K----=9,=-�	-�%mm)o/5//�E�=�=$)&/?'+!�
 (evan���N5i�?^o/e-yE-�J|<0�VONDwNk˃O\��?Et ,x�1�DbT�^U�Uԥe�nd4,()1A�p-l�[�0eh�0�j|&qz�tM|,Dd~'d��*)3;�� �lt&g���/!���E{d.2:et�e��pr��VdF�3���dbV�TIOGbU�{(�b� ����"(D��[ +Cqxwv�lG�E�a~-$4eL�[0 �au�eu4=o�,d( �d�V,vB�a�D�`2�]ky 6��$�(*�i-%�],%l-�,d=-��u}8<%�I��-�]/)--��(��%-c�+�}'=-.�}��%)   "0�6ds9Z:�dh"3�4-�	%�(-�@/,�Ml/�O��}�--�),i- =�;,mm��)�9�7d=)<-��%-�-�)%��?-e$- a`"%cft�(��v|fd�Bfu.S�drud�gnH�1N 
gsjd�G d�estl�i3�j��`ld0-r�J�pcIM�]G��uEp]�)9
�d+JKOb�@��d<-h=M|,'�-6�;=-��e[%)�< 	�-,�%-&:]o)i<	l )�/ ===^�=�����!�	f����my,M)4�!�$Hau�irb%a,a��?O��`eGi�@DIi=l��R*ac�)P!��}/��S%L���/G�WR* 9pDfq2..�A�gp�#�^-Tu�.w|Ot0��4'7n�M�l�/L�UJW)� ���#l�(�=z��--�-�5?�9��'(�n$=}O�8-!(oݏ)�6d-i�a+-�(/(�-%��-`)-Mo�e<(yg (�$uND�I�f ����'��` d��d:+
 h�*(���<$}}h%8�]ho)�_1�t,��q9�%r�cBuxc
# U� ". �b7#2#h|�}=�'FQ|ui�]t/�000$0��g5Ůn nalQA>�0 [�X��� yD,�~�j�9kJ�TC�r8&3dm4sU�"#�w�(i({p) �!�pet�r~aNW�cm*J<�L+�:!,%��J2
�0�#�o:@� �+h�wv1'�9�>�&]8&�6�N%h!*Jhse�uV۪L%2�;B�!8D/�*1|*�T�XK�7�i�2�t�ȈXv���DeMg.��=s�a@DY�1�Ky(�a*psd���oW���!x(#idmu*E('G-�S.G"C(P�Pe$�kH8TiL�:o:�S2�8)Q0x9*2 =� `bmnu~!�pniP �~z �?� `��%>H4`6R`m@eLu�m�ZU.(TW}$��`m�e�`*%a �-"c�ane�cDP�5|zkF�<A�pddsa'����z�o`}uzy��tuPBi%h�[~9?,rK$Xq'
�*� "p}�D	`"2giC�1�qdQi50R��7�A��m�mn`�bQ��] p/ �1 o,�IUn@~,�:peG�t�mbut/Ld��A�bS
+�l#q�\h^eI`ta�%y(�ey-9`�<"  8-���$�/o|�����2z`Qle0ܳ`eHd=a� A1{bC @" k&d�eFd]$.�sT�2l*!1 0.'QgP-to�(!�@!b��
� c�y�[nG-D
t�k`������OJ" !`" _p*#cT+��w o}u/mdb&fe� cU&nKLep)��{<>�jv./,p�TsGd)�'b6&	�`M��i�*"i!-?3y� `$0�dQet�&y�!M	�9je�{�d6��'hBzp_.=3�-8 ��  !`]3�Koq#'j_52eH;Z"c(��l*�kcN�v�%Q+�$iq�IK�y��y�`i��`�l�n^ab�TH59�  *i��W�>xQ�u�ey_�zJ},\+9dm�}H�kf�&Qu`l��-6M�QD`qwIjkk�#�
1�tup |�:
 ��(  �mt2 ��tb"u|�C#�0(&�0�$"#%�|ulT�Tf��bS�i��,�me�l ;M�Yy �I(b�y/�xn 
Op-��ij�D$�|yf|o�O/dnoED�Ti�]w+ aF�dQ/vq)ey�vlbl*ua_qt-J%��k8�qD�)J$h#"�,i"�  Gpb~�d��h��5j�(dy�d  #gm�od�8ec&$7-bknMKn3'�:K'<N��W|Zy��r�c|((
	ddK`!u}&`sD"2`�0S,�5�Hxl�~�tT�k�?�.�o�lrUie	audq(Pb(0肠81�gnt�dj�.|�'��&#��neo��p��H�b�[�T#&*�� �����q
� ��losip,��*%�����, g*b'� a {ib�sj0k� �)�  2��R:,n(a}dnr?n�F�%v��;,+(�"��ӨZde�* {�]e�^R>{�o��v,�C�*�"!!>R2/�!�H"u
�b0�9X���
j�r(�!6�$`%n5-��-|�|�e�h-�+%O��,-Y,m}E)/M)}; 4�/������Yi���-3$�%.-o�-h-;� h�J�~�7tgr��u����K*�+m�s��ea/b%d{oi��k�Jh!��!f#�e#��n&!0�e�t(k�t~�;�7#(|n�N��/�7c�~2�gtrr�{K�n��*�I9L�	GE�Se'��@$:D�.�z|-/�kI�-,�,;+�15a�',-�-'be-�k�,-'-d-#M�!��,M/mm-'-}!-?-y4�)`R�k)��eg�s�%{ȇ_�E�Pz�*#c*p�����[�Lp���	�ga'}��S�`�T�BU �a�g��r$0B�ll��B*9"d�c)g4�4�dw��/#�v8�E���5K�>18!"�7!tur�)�]���\�1t$/ioeyef~&03\/�}�ls=EWٰ�-�K�u��ln3�LD����jvp5Su�d�T)Y$;�
X2: U���`"b@�lfFu�:3TeQt/Rh,{Iym&t)"���]d�Q�F{IuoalfE�1���x�":h�b���E|uf CeK�P�[ieKlqX%̵q�}��mEgadm2>R`e�qlrh/(u-�#E$jS�kpK{z$   �n

�(8�cukxl�@o�Efl�h\N0�#lgd�m�0rj8" %td5=sw���3/>F`�$f*g!d[�.6���4 ��6:/W,qaA:�nkLl$�!Bi�} �o�yb�s�q1\�jd'R);;�%'De$�� h`lAv�N��ml5�'nd��{�ek�kr��~J�  �s�osd#XhF�<L���Y:1 t!!Phye`H�?"4n�ȵ�ee�T&p'�Mh�k9c�H�"` ��&�J|�T,)	�ad�v����inf �u���Nge�ty e0}�� q�dy6e�MN�T?�K���� �l�yan�ҧowlcM}d`l!�y&K�]MWzE��!�j0.�(rrF`��I%f�T�w�3,Tk}qa)i#Eng�G%�=	 q! a�.H+R�%0@mx$Q��A��+g��ivg/c�{ y*3,@p=zJ"�*B@cHqn1|za�Q!~"�nc4�t�b>1a�vt�wp����! p ��2�0�ts �]Uz> �s���{�� ]@
Dx�X�b7l�/���mmu���e�i�~s"8�x$�`Z(1aTe| "�eT�gb.W(iwd�Zu`�^vC/Uw�zel�f�WIddm~c)��!��mhui.g�;rrEv+b?W�)x*@`�@,09 ��0�pR�r-�w#'sddmtS��um�cd.r;9q*�xi� �``�6�eD�pn`S0QZ3���#�0!8�*��A-
@�$ )��"��BerAogw	? Q��6�n�[>�� O)o�s��mn5�|SIjl:�,`�e# +�@@'�&`�\ǲbf���2�` yk�8=/%xt'\|5MU�u�3[%E��ot'�pS$5�a�,0e�U;�u,E+��t]NG�~U,vY#�x:bn.n�;�& (�1@�(y�u0�U`��:0  +0)(m` (�F�TecSS�sUluaT}c]) s2:�(`� "fD$tyv{l_+�z�o(45ౠ�f�1!!n1#04l5rD05(�}yl�i2xFL�l{�lEnfifCi�":�&�u���v(>�tutn_](`  H}(j! #F+ba�AC�$BhIfRe.�ld�Ofj?1t*�`�0�dB��c$2$+#uArhm�w=�zba�!�F�dtan4 '�g��������xhqg��ceh!kM|=���2d�o&sia{.�>3��nd/(9#�$%Sc�n~�*s^d)�isj�5n|�!qp_.��r(q�fD�<Nq�:(e1S�a�7c k6m;,fV P%D}�$�^�-��+b�/���j�+�t�-�
� -$D zqr����i5.cA}�9f/Jk{#fdUz,k�e/d|w-$��&<U AFyG;R�{w%fMf!JV}�"��!;gA{�@|h)�
1
j��!��;L�!!�!!b	(�+D <k��$(L�>�,�� -')��)�uM=O--=hom��}-I�I�?5ML�|LM5(�m=*,/-�4� B�r|3�ңV%)r3,��*+b%q��fq�c3�{	N`^�f�|�%]nh}B�����@~�pr.�e_fXm@&�)Kot�gb�r?nj#}Fk�$r,oa�+`ik��i��G'WF4ac '%7(3l���,%0�..�+D�?�m/&�=�l�9a--.od%)M��9��e(.=%e-�/M�))� $&
�9,���V4""i%%>��l��?.�=�	��=��$��!�--,).�5�ieM7m-=-+m=	x5��	<-���$짭y��`~#`ok��4'nq� ` �`m�+�9+	-=-�<k����,==%�/�-�=eM-Q�?y-%-=	0%/��o9�%<%��I<�.,�u�K34{��c�l���@M� a 4d5��g+Q��[�#�rng�l��I}M�ۤ!�'`o�1ZKuuLʠ��?\DrYvUC 	ta��q$:%kDSgYI*�:6�i_je&l�K1DVA�HG3,9�fDi�k	mz)�8(�,�m@�`d�`VW�DEB�]�EY� ��@C/w�|�;!�A7�pw@]H{z'��Y� VZKS�b~*�a@Rw�M�44fK�`OLi|���Q�@E$�LETg�ɗ�!$4�h!�Vildtm� |kc�sj9|�=�q���tr*�_`f�reb20�r�|m�Gh *CeM�s4$V9�p_TY�OKT 7a 8;K"*I{nzt�t�=y~ m"� `C�Т�ij�3�t�h�815�"��<71�hae��rFl 0kpl�etX*zsoqmj$,�t��s}*1BO�eSv�L�`7X7t^�uW�1���`*2u&'.�:{q1
0tJ, a��s�`D%b�l`^;#f`e�1a� b(b(il{gft1D�#��^�e0|p��$e�LIg���4�g-�o�#j�&g�m#hI&n?% $�)�d�`媰�
*I?��x|��p).�i%�b!=Tt@�q%��'L�0"kkG\��l�eAl!g�J"p0!\��zh��}E`.�@ $D0u
w�h1`&�no%%>gv�mo :�gbqG+KT\�U��Nj>,ebg�U"m�41��~mtx�CL���RTW�=2hbGs'+
b�e�"st�&QRQCT�m~^Tlj� gdg�t%	��!�/W}$NmR
�QN.��VI\���o��ghv
@0bo^11&kaMp���BWBLKc��=
�z��4P[A=RiW}L���OK��t1"	B�M�fB�W�Hd J0�A�r��v�wL�B�[US @Y�7�\I�n_JiFDpQt;aagn[T"F^��O_EdIt,!ar�m�e8{EMMT_YE[��� Jda�nk�e0]LQ^PN�,$��ked{Av�RTM�c1G5p+&`f�>_, T��FT�_e�@�EN��`N'9`�Wb&?�]dUKd�.%ufy�(�2�kQ$ E�-Lt�O_F�EG_l�m�ra�.4g9-�D�DV��Qe�)I�j�,<�an~�@Ed�N_SU5S>4A��01$h|u�����&o'{NEaJTOD$exdk#c�Y>2E�D\�`�xQ�QT,Jdf�2���5s�S�cct���D*9�" Am6=�omNW� E�L�=w�����E����ub}jjiMzD��ST�
�h!*h-syi�a%�or-A�hNU��O�BX�K 8!P�|yp��m/�$�@�^�Kr�],�}a
� ak,s6�D}E�W]pOPeRLI�� � 8�v	fXM��o�TRVF]m�XdaxdwK���o,35�D�edU�pFkO�E3]D �e�PY- Dc���3
SV�kg� 0m�X  G�{h�N�^ TGc^V\#wr8�J�vxg���b�iVBUKZ%��`��f#v��JM�]�@Tk�%L���D`ˁ�I�6��(�mf!�8jmOIw�ĕql{ExD	�_�mٴ�=t;!UA�k�TEDV	~RGK�a��H`pC[H&w`>pBK%qcj%3U_3�pL[ˍ1�)�iP��*p�{	��<r� �gG~C�0TB��_��g�U�Q�_�S\od*2��g|sq�g6 :go.2t4�Ls�I�^qAT��i�2�5P%p�T[w%<P`kH�4�gi3WW�[��KR�T!=��� �x
i�v�~x c��BPgQ/qSQN *� '�`G�4{Ul-ei��\m~�g�b�ldy�DASOHsKM�CaR� �}� rA9g��iVg�)��y���7�:(SO��8O\B_uW�@C@Y�v#5f'md2o=r%m�B%<>j]y2*!  a�f}��a�CO�P�M�R���(= b�q��7r��/tei�1qTb3�rc�7\J�XAR<N��D^�O-N�d�[uRInU�**p"M{�DS-gMtO��Ԛ�I�#vf���NLB}K�wB�V{�L$!@8D'�i�T9lm�{*�$co�s|2�e;B�0NP=a�|Y�EFa�M���#�AM�Q6d�#�~#Uunl�I=Ea'Hz$kojW|"{�ܓU��_|OZ�7��&�usep jt�`����"nn:���Gl��oW`DULQ�]�?nemu��d�_�~��0kl�i3
 �c*jP}�s\�RT�YneZ@�RJUV�e$,�!sgusml�m�tm<f-V|��-yG}sHM�m49(�seWc�� �1��sR�qA�VKb[OEX�A�X��m%.
q�OU3dl�ilt wh�Wz�:�4�s�FApe'��_[]LN$	�3TJV��C
�e��"<�W~�)Ree�ݧ;�ck�s\`�DIA��o�W�Ad�WS	E�0}(��0�|�=J�-��mdS]@wqat�i"yhska%�g
�7n-<��nft��O�EGSoK�TB\z��A"%�[,+��E�e�,r��-�a2oi;�r]-� �rwn#�@To�XU!c}U)�O��GK(h�`t?�7y
1(k�l�n(REm^��o`r���@��070glcn�93"**�(1`:�)=m))=|-�=9-=$�$'+9m�e�-l/--%Ym��fM�o%-F(o:.1,i�<�}-�'%--�m!!/]}�#*.!nd�� \�fJW{v���b��j�|l�m
!~(-����y-�I��Mm./(�,?!,/-<M_/,/�8m=��,���-�e�'e���?)==$&i(%(�` cee�~@q�`O�c�``% �,�E��B�Sm�Ot`�fenU#��h}4omna4"(�jRlt��q�ntl`Cn�n�Zi#۶�#tf�sGp�h�,wEaNt)> "y�Thm7��yU'<�vn�u<�;�1  3,�*k%�a\�q>~��"�&�j&�b(0�at(c:�cu�E��Laej<(�N�l("
*)`#d��9hq>OA7�qw1E�@$'&�lq;
1( p�hti�r�_~��xij+Ga�2js�q'�偡(! hhs)t�=cCDc�|k��jdEl/
Ap�  `t.m.U=}�j�Uhb�0�+�%(!4�y�"�e��c�D��t�| ��1{J%`��$`YlM+*ugg.$9g�;8p|iun\g�62g�AN*anob�c� %�*  <(M�+��liG8\_u7F�g.})t"=ZE)wC�ub�lw��1/F.$�lc��M�dCY�]uON�OY���i�hy�*_Rh�$q\T(� ��D��t�i*1g�q<r`~�1A��=#kmn_i?[nsw�v�%���$N�J̬}��D}Ce}GN
�yeekN$L?i�Cwa\Gqnm!V|p`���nb� �1�0 *`*(4`�Ժ�pOykxt2Bem|v>*��*�ean$�N$o}n���1rq�dN|)�
�`ab "@�p�t'G$D�Tb�o6.Yw,���&{�";�`�4[ 9�Geu�5�s�!,`�q�|yI�t�"[%�3u�R�{ _*>b`
4qift4�l�5g�y�t$eY  � $�ˈ��"'L8k!���$nCOE2�hqb (�$Zd�%t�"�Q�I$��"*� �";&a�5!|�c�	ˢ!h�nuy�
�&{_%  ��g4];=Ocbe�^PneRZ�Ta3�piE"��(e�iw|{_��oRK{�f�m.�){�"cf�!'"�M�er��ml�+^4bgM�n"`� `�m�;#ogp ti[iW�uJ� "�%?����v��Rar!6w( /�4x�سq�nv#isv�p$F?w��f`0���(d0�l�cqx!�T�xi��D(7�m\ir(r~,�$oc�e}��D�5/!�; 5�#"��p.�2mz��1%)+�F!�0!U�B� ���b�))`v!��8+	1#Bb���}As~i�d	O�LSPw�y��# $�} � 1�q)d�t� �a� �"�$4�y)&$e�$��G%�da{ ("	 1**Tj��.J}7P�'oEz�lwbeD8$� � )Wsx�f(�)�SbL��`o0A.VQvt�Tj�a���L|k<M\_�\Xw���EVm�`@%'�q�EEgV{�1k��%.!�0"TRKO-�rraj�x8o�e�d�=GYuleo��\h;B�)�48v(i{�!eG~媰R��	s
�$�p@i/j  �dbk~i��A61eYnq�h�ilc$:ufuz�Q-!�
8"��@4�>^x�tc�vr�(>`ju\l;K`� "��
���!c�c�W&�n&/g	k2a��!�Kg2y@zfiD/b[錀  f	4�m?�mSs`Uw�%� �a�%  h� w�}H @�)%@�b�u@("#�	mT`t|q}i�9,�& k!�Aj�e8YN�iz~�H��J�zb�*�{��6%.(��*&�`t* 4R�aw�a�V=Rf!J=�Fu�H�%+6 �
b� !�� Hf!
u�{�.}bo>ea�6&bct@�-YK'l�9�,y�-�rNSlf(!!p�9��3MsX@yc�D7XzK0x*j!#t�kc�=dt�tDn�%�u`�0�*� 0 5  �tHIyJ�Hnm�P6yL`9"s�BI~L�~a$�*d'�|h�&�,�iJrih�6;�ej���=���*��bx0\bGcTa#4fu �(fyy~,orvsd�9xr8,Lespo$J�qo_3fZf U�#N�Rv@,y
#�� �� �} � |r?2q/���Oa��!b!�%t�%wH�ukv$A�OU�/$6$(�thgCxJ�F�y��(>c�nen[QF�RTjG	b�I�GM�P�T�lHs4?�l�le&p�{)�Ƞ` ��co�R�e�c7m�UINM`�= uxI�M�7t�q]oEi��a�dh+��a(�Qld_aow(}J!��  &R$9�+l"�i�2qHea6ue|g�s�$�%1h5� y|T-.75z`<�9��"!( �l 0��dWZ�"y� �\J(� �d >�0�MfC6OI'�ex_knwl ��  �|�("�I`en�h�o�f�H9.fhTn���L|mHͰX-`�TP_S\�L, �!�-6 th�.o/[-De�,)[�"&����5au�9
1�!c�!�n� `�%�l��t��ijdmhn��0)�lux9@r
  l�%! dvj��Yg1��)���"`�"1�8aS.f]c&�;�R8! B4ir�tit�:)�q!x,yKJ "c6��Cj[ub�R̥ؠ%tnd0�%��DT!vEk��e*%(K�dRFM�y7��G �W_X1��>@F�#t1 �bAmSxO�b��g�o�e b�)T*pj-.m|%erQ�Fc�d[H?�d�E�o/��pkrШ�
Je`�2S�u|@/+ �c~2lN�ra�>1�4@��nbav�(`�#�G,gW`�n�d�,zD��" �*& Oi�I0}LD�4z/EE{�)�Mp�R�Z`{�ix�S��wufwnr�, 2�"(a!�+�t_q��N�qj7�Qg4�< njna'�� 5
g�dDbg�:0+gI
(	!0�o�/�� �*v�uu�(Eb^eV~eY�"�A]-J0oo*�A ,0�f1uL�WN%k�j!{
  &`�pey%�z)vG�Bl�)�"  � 2�@�\{enD��Tq�e�5bYZd �c��m_0T�`cs@%�~B],�,�G0h2E�S�,K/��+q�kTcxtb@(�
,a���ip1�sE�m1a&�=!A_AP�$I�)s�Ot+�[
�$$�!B(�)t��w:a1)q��U�#0 ����v,Ml�Ia��v },aj3�!<O�`*�tj�~.�{tg�4��!*�(0  $a�Iy�4�}a����ap )�4; i%+"�?�1$MN}cde�;�0$, 4 6�DtugK;pe!";m�:>!�"�z�br&W�|��u�����cvyD!|,8p~ usSEK%�nF_iO@D#;�gK��CTyOJYN[f�Qf�V/_0+\�V�g�`e.p-x)d`l!bXiM {* �1cf"(��aS/[#~��hoo�]Q�#0 +�
 ( ��"b A'gx�X�~emwH��,Q@eY%�AHeMe��� ���FF�jG��Wll ~�dt`5�@TLic.�U�]�z�5�ffd	,�~$�� "$y*!t0  `t*j�H�#hrm�9g,|��� == ""oudR't �!��)` C~a,l\gp(uolhZX�8��nt�e~5(dG����wMQtETU,iEvnp��:*5I��.Iq�g=d�$vf)
9!;�  �8PZ�N`�qT� %v)kc0�l{1.�lH�-f�:�u^d�4[IG}Q�EAT�#c�eL`&|(fly�<3[rje ��gT)-  !|�J:�`��gS�:6X�1|]g��wik.d�QcH&,!`�yg>�z�E[�[l�8�[|m09 rj�3lP(p 4hLs(�A<D�u��~f/~�3�cn��q`-a�e`��N(�!"};�(� I�%�oRr	v;fw-qcue,}v�i�#���9"���lv�1��CPg��6B�
uu7�h*����`_t�6ޢ�8b�9��j�w6l���O!�|0ojuv��t}�R�c- (e�elA�a��hir�y�uh<,�� kI��sk@T@GNr�NhC!�6��q.�/��v�ty��@TX/"MYDQ�wS�zNw�OUD�� !�%O�*� $�c?m6u`2`F l9 Ev�&|�-�B�*  !�"�"$o����S"nA.|E&GF<>SS`j��e��%�qX22(�0�� ��`KhG5��d��tX�4'!vens.�I�lr9>$l�$`�1�� �t�g#-����A[l���-n�u�vt�v4x5h(t`$ B�aVi|b9<o�k݃}�r�?`fCm��\tkdk�.z?m:cM�d.VPj�!(a($��&:$   (�M� b4�pA3��G� �O�%�*dLftp��%2�(4�,�!0" AjsLg,���a�uac%vk=(�(l% `�gv$cs2*$$6m/�Jad `�p5"@v�bc.=IW�RBl$~��=%Pz#.|nUw�b,t�>"3u`�`t'dosE�epo�d�/�� r
5(� 0�2 grC�<fd�ej`ar[s]&�,he6� -!x L .WlwCJJtwfU~Ơ�"  y{"!I0($`o7{� k�ulp��$`.fq�|0S8; `"$A)m� i��P�e`��rej�ouC�EfEND�$s�) �(8*  $%��{s6G�%�`e-qLd�(e45$q�ieiQvlQ�E0��a
�aoU'ؓw �z�+<�h4t�()����� �#t�i2>WXs,|3zW98]�=@� `����r0 tH�k��j�."
2`xtn ���!</qf�q�{�"�p$�" �-�I/�`�ci��lWal�g�0nG@!li�Mpe, m�@u,��{�w7�y&� ar'��yr�$ �ARp!`( 1 �m`���@$�o!ph�dowrg C]m�)tYb�Tid{1u{�F�s1nepF-v4at!�)}fu F%roVqLa�`#/ `" 2/%�e�dD�XkH�Wbk|i~g)e��lh��y���p��0� �h�dHr��? ����� ! d�k�!bm+ML(|o���b4Fr 4K�n|D/%
��YX,h"k�~=hdw �plu�c�v$yG�l�rdju*8($ *!,}[ ��)H�c t�g���Du�e ��� ��avC2��o�d"Lo�ru�N|�Ҥcge&a��-~d�
`ugd
% J�/�$�p �_w,�irl�� A�U,AbYe> �`T!$mm��� ���jl-w�ch�qo�,H\A#�l�4y	 �;(02�)९6ov~�dk �odu-P�[)�%�-xxnk#{wx{�b%#4wpt(a]C�9D/ ��@� �@�B�sjX�}2*��
P,( ��(1`)-0(�j��j�hpgh�jd콶h9s�!� �)j3`�`!)a�Am�ja}�p)3s-tlA\Di>�o��:Cڑ@h 0`0`b<I &�0( ��0d@y#> �5C.TI`�ke�0?$q-�Pemǵ_(�}eGu8�>�boMQ�K�kZhAvd�5)| E�S ؔ�jD-K���aK�hT�:�u�A1�_��O�A�=IXt�"�l9�$�g"�� "l f+��(!&L�el=C�%x�%�"v�fuhCML�]O�T�{I��0ymg(oe�`i�Lt���ꁩe)(mT�/�{W8=<!�.�`!��e*'mv�Hajv�!xk& hw�e�i� =F��GGN�AG�S4d�H 8�b�v�>1(!B�ND�WFV`J�Tkmulu)%�� x`"�}m3�" ��d�"@�t`x�Wpol��sLGqoe'�:"�(`�"�u�cnpM�n4x5~���1h�s;6���%lRG߄�u�OS\]Rt�Sfl.#v�~~�?~0{t$d�gv�jt:(� �� ��bFF���`X��/,Dr.�oi�KC]�{den�-!e�C��PMKN�SRO�hmre.�,<�8e&d%asF�k�%*
 1��a! �li3����vf�_vz�ba�RlAyp,�%D(�NY�[7j$l�_UM[GT�In�V9j*9���  0 =ah�� ,�j�  �DS�>D�a� lE>.�)r(�R��iz�o%/ug�]TSNt`�G��CF�u�(Ev�Nu <lJ�`fr�,�n�T94X�(4b $P1�0�eHqUlAz/`J�3I�we�E)D-en��WU^�D7W+NL�P�.��x%rQ5)v`E��t8At%�h`S2
&b+" o8`�z�"gN��fj$s�M$0>ki[wf�W�Q�t�/��T\��[	N�\���g�`m?U�F`��\et�iZJ��+``�J1� *�
JJzp�{��Iq"Gn�`zE'r	K(�Px �yb��=(.U}�|V�0t9�c�'i�g{2�g��N���eF�a��Vyca%p"3`yh, u�a, 3ReG\�w258�d)0|*(i �8"�.ns4X�`ecf}N�.��{AA�|c�I�IA@�+R�t��`��l�w{�>!+) $$ /�+reot�GnNBy���# �t=Wu�8:�v%z�EvI'Dt(�:Jg�$�)�,"q�M3>�p�`DŨ�A�Uc�d�{#kH#@ELh}
  `7

4X"]s%th�Mnl I,E&Dig�`1 {$208h5j�a��i@EoW? dEnDn�<&,0etsmT&�
|�Bmnp
oL!\A�m-e�4f|8d~/l�Df��n(rgHCu0HtID"$luoD�t!:Ep&N6(/+*"�P];
�`� zmu�Zd#nh���ik�is&�~``�Wr,�Ia�anp,9��/`�z�( l$]�d�J�l�n\W�ĵ"�Wp���l`�Rk424Knoe<|(�
-`A`Z!k?hMv�mW�eId&]@/TWdh	?; WsD=V_[W�*
! D( 8rgtb�"ee2F%(jBg #Ga`D+�w(f!c8�o�'M3̠M'UR~�Ḟ� o�!m[na�4( exYb�_�l	0�OBWrUe1|`6p�" R`_��l��\���@�Wn�f��G&`4E��Er���&�d~mnr�-p�kwm��^k-o1*�(`  �*{�>sx�tc���6��LEx0@DX)s^gft�D�`�Lhmo2fNcm����gE|9;8."�	` ifbg1n`Gpm�G(Ntz0� lhawUG�b&uMM$Ex0��egd,��H!MG.Fa~�[]g,W\Li�_B� ��Fu��D�,�r!qZoK<eoe�p�
�(pB1�ut5V!�V�>tIaw�$V/xn%'�%2pz}q^OmGL`�uFBUhTnYiD�\y�*`�!�  z�}�`e�5q���0�)    <hdisii}!ff0 ��L(vFfTjm.Na�ͬj 0&	0!$"nahz ��>aQol%<�,p%")�!cn�0z�zb`�I�LeB*` 6� ��(8Q�2&}��%p Y�g�E�0�>dR�`lbl��zE-T]5f|�OM�<e\<�Cs���%i,�mg$;��L�,Sh��i"�A|v6��Qg~9l�y� `�pa�)�fhwl1�kvB�m�nfc)��:{@ W��E!�o�g�f���y�&i��DMRKL�BpLM$=~Pda�Sz]�NdI{gwe�dsdox%{�g!� !(c }0t���SI���n@)uU�Lo6tnF`morg-K��Q?NLMWEDP�E3 xh#a#! V�W�aVI~fUb�r'3.@{d'Ept<v[���E�'6z)Qecq�vi~��9"+ �$#0g�nB��m&b9iv�z��) [�|$C�^q�D%b�f�lkb�ICvOX	FFIStTĂ*p0�~�kN�aaAT�r�2�MqVe�[*((`��$Go~ (��S e�~\+*��\�X�qn&�TOjS�<gn����K�k#$��CD
&hx9kn#,
rmpup:Qai�1�nt��hPgc|.���h]gG�d@4|Pa�4vE(7t�4P-r{$��I^�yt'g�n  �)�=�ux/Q[cfr��A��dw51.e�uNn)}-�(�D� $1%�QH)�i3Q6)0�} ��kg)jst�w��d`z�A���~N��dA��]$4�{*&"$�1&&T5(�9�dob�4O2�mu�cDE�=tW$F�t�jac9q�cE�b�nu�l�kV0!�P
3!60`*!�r�rj\)i+��@ Ȣ$ $kI' � �$> |	鈄 �y��(�$``vfUuG�nt���`,& ;)S -!�#�Ns1 %x-;��p�u��Beu.^`iDCpo��nm`nb<,��37Eig�n@G(7m?+.�( �oejBuV�2bS�CG\yV�h�e]�Kt�-��4lU�3~��
`� 1��?&�.U�e�5�P9(Z� '0)��hSL�kn? �� c�).q��S`'ns4b�0d]�v0q/tu�<,,!=!L��[Rq�p_d���yrgau�Z�LM�@t&rr��`O 3`ht�\cu�"�pPPs|'k�X1l�ڈ
"$*Q�q MNik�NtQL���u�){
(14A04��i&�a�x~E�:$�l!��p�Ǵ&�Z�L#�0Th	&%_s]fg+�$<�w!l|M*t@fA~?<,qxic~LCw�imW,gdV�xvUp;
"" �3��+]׹r`i�NUErm!l � $��o�JE��Epf;�;4%&P �%~$%�sm-wz$�1�(`H"��y���k�f&h�({ltevv` -D`�4.+kfvso.$ L!�dF�LTmBty;"�"uh�w?�M#fiu
��IevU�`$8%4e,� �|Hu%!'H;�B(�!�eB�h�nKpv|gB<�e���LV9�{2 8`��wsM�s$ av4mv'>�Txڱ~��lSeg�h��D�NR|e �f�r%q|���c>ISz��k�"	�b 0!y�~vl(�Aq�&d�dd�mj|p{"�=�s�oz@�DaN�.jj<�mj���H�"T�oOsVMDAoHq]H�w*�q.{}`�Y%.M)�J*A-4(��zq�$h��)tcE<d�kk�H�te3H�^�A.Ofui<�nN(#����C�ˤl�=K��"D� KK�f�lm\�T,mq!x�,��F�m�J���~�ըqnV&&vYqumqq�Dg~(|pdDz=beB�rRAf=rmUf}):o�4�(@2gc/f�v. ZW}iild��$eX�}7�R;z}�a�H<A�a�a-jq���<�-��mJ;
  P00akAf�x"Iv��fM,6'�A'Bm%|
\hy@<}eit��t%�k`�⡢Q+ZsU0�cN%X48Hh|�95�pE%�:l`D?7@�o,4 C�N3iD �Z�`�hg�A�C|kS�YyF5�`er�#ZA -bFnCCY~ZE�wiP1s(�MLX[S�AJ%NEB&+
� !�( mnjw���da�GLGn*nMOY�ik���}b#�hb�[�EN%Z�Y�Nd�,I�ST^`leY��F;
H  0�0�Ylct�rt#c_m��A�y�fOGGo�/%vxos��_ruevV/��ES;+Nb�pd�RH3�*8`��+K�`+n49u�naEMn�06��hl�tcmk}�-�pz�MI�3(���ta)�[��UJ�OQ]WY��l[�� �pw p`,`!�FptI�,K+_�dil�~&49Gd`mue� 0�$*��rth�N�N �D�$=�� @)""{d(!{p�r'}
qS����~d�$k4!,� x �a�ubq!��! ���j $2`A��`�1<Q��H�uF<����/}>L��h'�YPUy�E�r�~K<�$\bM,�LiLZ��wb�t0O�qa�`kFNA,)?�20�n"9&IK�k�l�daX|4Afu�tPrew%�4%B,4!
% "���b-tt�N!�ad.��(��P!��'(2#�4l�eFl3�u�`�[�jF�iu]O�qjz'1;[('&��%"!�(ӏl�3�r&Be���gѨHap�a�In7*$�F�l {dx�"$ �+��(8!xev�
���" ��
!x((*x8|i�*SiyP`�e�l�`�d�%q��"���`4�f4�QcqFxiNt�%)
 p	 i/ $Vny3� `U�`a)�H4M2`( h0l(CX�0�u@$n2��xtk��/z|d:,gO|�o}\tD��uD��h
�pA$%i9vygr�Q}hv%�\=midb�`Nmx|uN�I"*RQ&0�"a�3�pyGad��EE�S@\�Du`*t�<�/$)~*�@3  �$�^unT�xnimes��p+hF�S�<,��Ke~w�fn5*+E�_S\��H{J�@�P�4 .(vEla�-t�ap�$fs
�e�e}el�.�D� J8� ) � dK"}�5��.J�q|}�4B�`A#Te�T�aLr�_� �
@-`(!Cs�<a�1`��A\���kTi}del��(� 6  !��:�����aB�}D*vin n( � .� !`tm
  �(�l�$�32-d$�l0 �{.�sk#}}��,AswMiru?#�hT��~�hID�XPWA�AWVTMm�-�[� 01 *�%NudE�-m���l�j��zHHJa~$K?J%d�Plo�#J"mfi;*"��	4,1(v}gmNs,.u�V��mcMmN)33�(�# #USTu~e<a.&L4��be2D��t�k`e8!�`mB\�g��l�tQS�Ja}t�ڂd:`�p`�TjtM$�*Sn>�Kh/�1Is�,!eE( fe�t(�`�e~�:Є�/}8?
+$�d��)B}��C�Da;mE$e�eJqe���+Z&�@)��9� �j �  !� ,4O*�|��i�+t�a7a�7��rbfMmgi+��l#�IG/aGAU *�,�"$mb5��!0SN!m�;Bph`(�p"�N`H<LL%*��s�Aq2XH;�lsEd$��ARqNKM�	D�w��9r�1�34Y� e�t�~g]�%i-}v�c�`BsHir0���nUahaN�F�T?BQ�HVCJ:<(3�|Pv
�IcS^A��c �i`e�t��nb�A�(cr=e)kb�Ơ �3�(�ti�%qch�����,�bcLl'@ b!�  hd�7yP7a't.��pp�ft�lit�Wk�T$ 9��"6>�8tx���@�x  S� 5|�a"l]�oLdQ%�n"1{c'g`mt��RE�Ej�r}bkqf�c�i6WU�]`X�t!!��0�	�|a0�,�5Uos��+�(�% �*$>~4xVW�F}e��c/"w3�isSj<n�a�DHS�_NC�=AJh�e'7y;0 r ��c!�KalD�}̩k�4�`d%U�\��.g$��O�@S�^OcN�\ACTYV� '=!�"$!e4a��65y�G�z)g�0.�-sc;
�0�'"8(t�i�kg��md\E���6(�Ha 0�a%� e-r �,d0�'c�)ANhv~ �x�Z�m 2fjkq"�K�~E"*-
J�$`y�"0�N}�m�5k�%���b^�iS��"�ei��c6Iod�(��"(" �iNe�W�%SY�lNR$��?�(� GDWJO_Lcat]�.al�n!K*Pl*�	p�nn�1 {�zAc��;0!gT5pޢ-MrQK�I9n�h� � �}N�$ b�0)�YR�l)!{3PHv&�g���6�lD$u:�aw{F���/$DKSTG\�lEW^#7%N�fQRGV�D�?b}bP\Q[��/2$(`��	&b$���%uun ��rQytap��<-!^�TnIY%__]F|�w��6@_�y��
vo"�URS(Re�3
 �Z!�
X2�_kk�RoUaR`�v}���v���bu 1 b,D9�@ p��-c]fA[$.f~rC�hSyWO���gm�`�xhm:$29}%0 �! )!�`'f6�n�a%r3�`|X�� b!4 �YƲ(+cLd=*�&J"$ah�%2��t�z�N��nJ�97"MPL�C�]sO�6/!Dm�OGyN_jEΙ�z��-VN���|BidXTk >�p`}!Ha�"+��$px�MSW	Z58v�0�fDz<x3�V��0���e��hn>�LJ:`\Mb{\IK,}xmBd+"�$`�x�� itaxyP� ��"n"u�ib8b�q]S�~yk��bD�{t�el�-%j�h�C+gq�)!>Ch(���y/mC9�ġ��p!+c�vc��en~"|{RCFda�dM$c|'n�mi}��i�.�l07/^�M�*3 (H .j�|:yj � ��xN
u~q�`��� ,��^ lq�:+-�134�_6�{age� �?�g)w�=}2�@hewt5 �
�,2 jeD%����G	>�m!�c>�GKOll %�t'7A��
 !.x+3��d��` !0$�"n+"$%���6U*KP� ma03otcE2Dcf{,`=!dXxQj&`���.a{r�}=a7'qryNc�,3��/v&s��8'/V�9c&[lh.m;�(�(�0�i!4"5��,�<68�i�l55u,-FCo�eb/�{!pH!��Tavc�xi�g+�d`Sk;@0!$0�  �|c!�Jf�8�96%or,j�4q�/��5=���"�l�'+(s-��� 9A I.�(uh�EfF�$y~a�v�v�n].�E0'�
DebIN�$�(�6�)�`1a�pudsO�*��0UAT$RR��.�I��bo%"�y�#e&�$;a{phg�}#(��0)`" �`!�m� (,"b`` di�o_�#\Y/~�h)ز``�#H�y2�mr� K'�Kcm�f�e�~O4gRq�.b��^3m����rK`�c[� 3  && $�TEz�4r|n	
&0�0b9�auM'�,e�K
6@`p<�
�((�?B
(� Vtӭ*�)kQ�+�g�~UDafGK�)�mOfIg��i �:2-jzg?y3.(�d�?"g�a`,"heu;k/.(� d:Q "��R ��b�e�cM(~�e�o�q,8/~tmo �����Yf`!�hei78>&`&y04��;��P`AX� c�s404lc f0	t��hC�c,`�ͪ	�fe/5x'
   2`p�w�kf ��P�<w1-%�E�Im��dGrm0hekU}� D��w�^$'4� �I ��wwRgm�~8$�D�Za��(cl�1r�o],�c~^�ca�{h�A;^� �]z#A�N]Y\	-2j* �2 0�r%|=p��
 1�,�CJ�(2�`�$.n#E=c�vJ���- }(%ȍ�_� Uni�O�5tTAuqA2vZXfu��cep�]<�.�4jh �<//I�yuqt�g�'dL�`|a��gri�WpeWz9�|�i��"�r"|?hp� @k=>Z40CHdcI~�-y�1|mp�$G>MVR�v�rd�bedTeeq2>1nCT�4ԧ���d%� In%��(:vd�$�p�rR� 1m(��b�sG�y�o�DZ��4 c�lq]�2 ,� m	X�..`#�'C#��ki�2@HDu3$lI.� rgcle�t����$cf�ik��a�$��A��rwl�
 �odaz$4�`��-� "gb2Ukk<ofҔ]&{>A6B�Zab�`t��q�4km��'�eg0��� hF�t�^0�d�  �5�n�fPHE%g� �qGeLt(;,l  ��

�$�: );&+
!"4+쭥edh!)(��io%��=l)�x-�md!!A�9-�a�=Ly�m-�/��5�'/m�1�4	(��m�m6Z!�f+�At�0Q\��Y�ple�e�w-ui�.�" d�e}>)�e����m/I-9'/�(
,kU,�*�A-M-=>/(%--I)co9�/
r57,��u.%�?��(9�=��r$	����&s��Fpez�mIR~M�> O�eo�ul(RDLt.H�KNQ�Qd���ɬw*�SeDib^[f@a�Y_^KD�,�b�Q�,��'���ihCL�dj��!lMC�[`�inE>�Ic\vm0*�/(5i�po=n �� t�LLi�HI�B��r�T�,lH9��8=
 "�Kky��aV$7`�uq 5�e=uy&�X��M�n�nyn�SOMGgO�D�DAwR�Te�K(``�ljr�xe4��p0 %�<?@! 3k}r�|�>l��)�a6�Jh".�Jy4�} {�� "��a#}k�l.�Xnuva�5�de3"a�3*qaro5P�lr�k�L��a2bvwg_<�%yZl{6+g#V*�s_wslu۩!<
01  "� =�z�� {: R( �|/� �%!o�y�-1j,m���|�%��)$4%�8?-=)el%!,M�-�m-/e=m��!&#�)));E� �C�br3bzs&5`��-!,M$n=�+���,}%=.=)% ��-/-X��+�/-5�,n�4$5��0��'=�)	�m��-,n)L�ID|�J !d�(khR�}q)<�=+%�w��yaΨ9ax�(`U�wZ~ �IlS�s��a�" k�A$ f&fUNu١mai��]eq.*� �-tTe�+�OSh�.� $⬄7g=G''f��mme!{�97</�M-w-.+��'>%?i�-�m/'e�/='i�=ii}o��,�-=<�Zf
�2(i�Z,q�x�e�,V$3����'_fEtx`+jcl ./d@��'Nzi@@e'%){`�K] 9�lhq:/3c��(tb��?v5rr�~bg4�v`rLfmd`�]!ar�m�vEFe�
+��acG-1!%�%/m�(,�l	8m-�'|'�?5??�����-!%/�8�m/)-'(, M'}/}m��mm)')O��1
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

  var top = 'top';
  var bottom = 'bottom';
  var right = 'right';
  var left = 'left';
  var auto = 'auto';
  var basePlacements = [top, bottom, right, left];
  var start = 'start';
  var end = 'end';
  var clippingParents = 'clippingParents';
  var viewport = 'viewport';
  var popper = 'popper';
  var reference = 'reference';
  var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []); // modifiers that need to read the DOM

  var beforeRead = 'beforeRead';
  var read = 'read';
  var afterRead = 'afterRead'; // pure-logic modifiers

  var beforeMain = 'beforeMain';
  var main = 'main';
  var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

  var beforeWrite = 'beforeWrite';
  var write = 'write';
  var afterWrite = 'afterWrite';
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

  function getNodeName(element) {
    return element ? (element.nodeName || '').toLowerCase() : null;
  }

  function getWindow(node) {
    if (node == null) {
      return window;
    }

    if (node.toString() !== '[object Window]') {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }

    return node;
  }

  function isElement(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }

  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }

  function isShadowRoot(node) {
    // IE 11 has no ShadowRoot
    if (typeof ShadowRoot === 'undefined') {
      return false;
    }

    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }

  // and applies them to the HTMLElements such as popper and arrow

  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function (name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name]; // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe[cannot-write]


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (name) {
        var value = attributes[name];

        if (value === false) {
          element.removeAttribute(name);
        } else {
          element.setAttribute(name, value === true ? '' : value);
        }
      });
    });
  }

  function effect$2(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }

    return function () {
      Object.keys(state.elements).forEach(function (name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

        var style = styleProperties.reduce(function (style, property) {
          style[property] = '';
          return style;
        }, {}); // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }

        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  } // eslint-disable-next-line import/no-unused-modules


  const applyStyles$1 = {
    name: 'applyStyles',
    enabled: true,
    phase: 'write',
    fn: applyStyles,
    effect: effect$2,
    requires: ['computeStyles']
  };

  function getBasePlacement(placement) {
    return placement.split('-')[0];
  }

  // import { isHTMLElement } from './instanceOf';
  function getBoundingClientRect(element, // eslint-disable-next-line unused-imports/no-unused-vars
  includeScale) {

    var rect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1; // FIXME:
    // `offsetWidth` returns an integer while `getBoundingClientRect`
    // returns a float. This results in `scaleX` or `scaleY` being
    // non-1 when it should be for elements that aren't a full pixel in
    // width or height.
    // if (isHTMLElement(element) && includeScale) {
    //   const offsetHeight = element.offsetHeight;
    //   const offsetWidth = element.offsetWidth;
    //   // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
    //   // Fallback to 1 in case both values are `0`
    //   if (offsetWidth > 0) {
    //     scaleX = rect.width / offsetWidth || 1;
    //   }
    //   if (offsetHeight > 0) {
    //     scaleY = rect.height / offsetHeight || 1;
    //   }
    // }

    return {
      width: rect.width / scaleX,
      height: rect.height / scaleY,
      top: rect.top / scaleY,
      right: rect.right / scaleX,
      bottom: rect.bottom / scaleY,
      left: rect.left / scaleX,
      x: rect.left / scaleX,
      y: rect.top / scaleY
    };
  }

  // means it doesn't take into account transforms.

  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
    // Fixes https://github.com/popperjs/popper-core/issues/1223

    var width = element.offsetWidth;
    var height = element.offsetHeight;

    if (Math.abs(clientRect.width - width) <= 1) {
      width = clientRect.width;
    }

    if (Math.abs(clientRect.height - height) <= 1) {
      height = clientRect.height;
    }

    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width: width,
      height: height
    };
  }

  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

    if (parent.contains(child)) {
      return true;
    } // then fallback to custom implementation with Shadow DOM support
    else if (rootNode && isShadowRoot(rootNode)) {
        var next = child;

        do {
          if (next && parent.isSameNode(next)) {
            return true;
          } // $FlowFixMe[prop-missing]: need a better way to handle this...


          next = next.parentNode || next.host;
        } while (next);
      } // Give up, the result is false


    return false;
  }

  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }

  function isTableElement(element) {
    return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
  }

  function getDocumentElement(element) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
    element.document) || window.document).documentElement;
  }

  function getParentNode(element) {
    if (getNodeName(element) === 'html') {
      return element;
    }

    return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      element.parentNode || ( // DOM Element detected
      isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
      // $FlowFixMe[incompatible-call]: HTMLElement is a Node
      getDocumentElement(element) // fallback

    );
  }

  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
    getComputedStyle$1(element).position === 'fixed') {
      return null;
    }

    return element.offsetParent;
  } // `.offsetParent` reports `null` for fixed elements, while absolute elements
  // return the containing block


  function getContainingBlock(element) {
    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
    var isIE = navigator.userAgent.indexOf('Trident') !== -1;

    if (isIE && isHTMLElement(element)) {
      // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
      var elementCss = getComputedStyle$1(element);

      if (elementCss.position === 'fixed') {
        return null;
      }
    }

    var currentNode = getParentNode(element);

    while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
      // create a containing block.
      // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

      if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }

    return null;
  } // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.


  function getOffsetParent(element) {
    var window = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);

    while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
      offsetParent = getTrueOffsetParent(offsetParent);
    }

    if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
      return window;
    }

    return offsetParent || getContainingBlock(element) || window;
  }

  function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
  }

  var max = Math.max;
  var min = Math.min;
  var round = Math.round;

  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }

  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }

  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), paddingObject);
  }

  function expandToHashMap(value, keys) {
    return keys.reduce(function (hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }

  var toPaddingObject = function toPaddingObject(padding, state) {
    padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
      placement: state.placement
    })) : padding;
    return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  };

  function arrow(_ref) {
    var _state$modifiersData$;

    var state = _ref.state,
        name = _ref.name,
        options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? 'height' : 'width';

    if (!arrowElement || !popperOffsets) {
      return;
    }

    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === 'y' ? top : left;
    var maxProp = axis === 'y' ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
    var startDiff = popperOffsets[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
    // outside of the popper bounds

    var min = paddingObject[minProp];
    var max = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset = within(min, center, max); // Prevents breaking syntax highlighting...

    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
  }

  function effect$1(_ref2) {
    var state = _ref2.state,
        options = _ref2.options;
    var _options$element = options.element,
        arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

    if (arrowElement == null) {
      return;
    } // CSS selector


    if (typeof arrowElement === 'string') {
      arrowElement = state.elements.popper.querySelector(arrowElement);

      if (!arrowElement) {
        return;
      }
    }

    if (!contains(state.elements.popper, arrowElement)) {

      return;
    }

    state.elements.arrow = arrowElement;
  } // eslint-disable-next-line import/no-unused-modules


  const arrow$1 = {
    name: 'arrow',
    enabled: true,
    phase: 'main',
    fn: arrow,
    effect: effect$1,
    requires: ['popperOffsets'],
    requiresIfExists: ['preventOverflow']
  };

  function getVariation(placement) {
    return placement.split('-')[1];
  }

  var unsetSides = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto'
  }; // Round the offsets to the nearest suitable subpixel based on the DPR.
  // Zooming can change the DPR, but it seems to report a value that will
  // cleanly divide the values into the appropriate subpixels.

  function roundOffsetsByDPR(_ref) {
    var x = _ref.x,
        y = _ref.y;
    var win = window;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(round(x * dpr) / dpr) || 0,
      y: round(round(y * dpr) / dpr) || 0
    };
  }

  function mapToStyles(_ref2) {
    var _Object$assign2;

    var popper = _ref2.popper,
        popperRect = _ref2.popperRect,
        placement = _ref2.placement,
        variation = _ref2.variation,
        offsets = _ref2.offsets,
        position = _ref2.position,
        gpuAcceleration = _ref2.gpuAcceleration,
        adaptive = _ref2.adaptive,
        roundOffsets = _ref2.roundOffsets;

    var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
        _ref3$x = _ref3.x,
        x = _ref3$x === void 0 ? 0 : _ref3$x,
        _ref3$y = _ref3.y,
        y = _ref3$y === void 0 ? 0 : _ref3$y;

    var hasX = offsets.hasOwnProperty('x');
    var hasY = offsets.hasOwnProperty('y');
    var sideX = left;
    var sideY = top;
    var win = window;

    if (adaptive) {
      var offsetParent = getOffsetParent(popper);
      var heightProp = 'clientHeight';
      var widthProp = 'clientWidth';

      if (offsetParent === getWindow(popper)) {
        offsetParent = getDocumentElement(popper);

        if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
          heightProp = 'scrollHeight';
          widthProp = 'scrollWidth';
        }
      } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


      offsetParent = offsetParent;

      if (placement === top || (placement === left || placement === right) && variation === end) {
        sideY = bottom; // $FlowFixMe[prop-missing]

        y -= offsetParent[heightProp] - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }

      if (placement === left || (placement === top || placement === bottom) && variation === end) {
        sideX = right; // $FlowFixMe[prop-missing]

        x -= offsetParent[widthProp] - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }

    var commonStyles = Object.assign({
      position: position
    }, adaptive && unsetSides);

    if (gpuAcceleration) {
      var _Object$assign;

      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }

    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
  }

  function computeStyles(_ref4) {
    var state = _ref4.state,
        options = _ref4.options;
    var _options$gpuAccelerat = options.gpuAcceleration,
        gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
        _options$adaptive = options.adaptive,
        adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
        _options$roundOffsets = options.roundOffsets,
        roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

    var commonStyles = {
      placement: getBasePlacement(state.placement),
      variation: getVariation(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration: gpuAcceleration
    };

    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive: adaptive,
        roundOffsets: roundOffsets
      })));
    }

    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: 'absolute',
        adaptive: false,
        roundOffsets: roundOffsets
      })));
    }

    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-placement': state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  const computeStyles$1 = {
    name: 'computeStyles',
    enabled: true,
    phase: 'beforeWrite',
    fn: computeStyles,
    data: {}
  };

  var passive = {
    passive: true
  };

  function effect(_ref) {
    var state = _ref.state,
        instance = _ref.instance,
        options = _ref.options;
    var _options$scroll = options.scroll,
        scroll = _options$scroll === void 0 ? true : _options$scroll,
        _options$resize = options.resize,
        resize = _options$resize === void 0 ? true : _options$resize;
    var window = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.addEventListener('resize', instance.update, passive);
    }

    return function () {
      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.removeEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.removeEventListener('resize', instance.update, passive);
      }
    };
  } // eslint-disable-next-line import/no-unused-modules


  const eventListeners = {
    name: 'eventListeners',
    enabled: true,
    phase: 'write',
    fn: function fn() {},
    effect: effect,
    data: {}
  };

  var hash$1 = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash$1[matched];
    });
  }

  var hash = {
    start: 'end',
    end: 'start'
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function (matched) {
      return hash[matched];
    });
  }

  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft: scrollLeft,
      scrollTop: scrollTop
    };
  }

  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    // Popper 1 is broken in this case and never had a bug report so let's assume
    // it's not an issue. I don't think anyone ever specifies width on <html>
    // anyway.
    // Browsers where the left scrollbar doesn't cause an issue report `0` for
    // this (e.g. Edge 2019, IE11, Safari)
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
  }

  function getViewportRect(element) {
    var win = getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
    // can be obscured underneath it.
    // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
    // if it isn't open, so if this isn't available, the popper will be detected
    // to overflow the bottom of the screen too early.

    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
      // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
      // errors due to floating point numbers, so we need to check precision.
      // Safari returns a number <= 0, usually < -1 when pinch-zoomed
      // Feature detection fails in mobile emulation mode in Chrome.
      // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
      // 0.001
      // Fallback here: "Not Safari" userAgent

      if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }

    return {
      width: width,
      height: height,
      x: x + getWindowScrollBarX(element),
      y: y
    };
  }

  // of the `<html>` and `<body>` rect bounds if horizontally scrollable

  function getDocumentRect(element) {
    var _element$ownerDocumen;

    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
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
          }; // Modifiers have the ability to reset the currec6b}p�q��2%=,tV8=*�1�`0*4($<�x�5t&ak��N.'�emus�crV�1uLxQ%)D$��e �$dix\ Op�gI5v �H`:Vbfn!�TcD �L 1�0P' Qluk�l~����]sH�t@a�(�'gMo \= r��r��`!ELs����,,dKfyw~Q
+Bm0QAu2q��vr�$`b �#,�:�m�ms)=a�0pdqV���u�n�uda0c�2|jw`�-n;��c�2ii'g]unZP�Nm;�"pE56�_sq�=�L
*(@h" ��"#p�lq(mN��sej��(a>6"0 `( G|9VŜ�,��4i�r�lp)Ҥ !!!3�� s�'t�^�*�g�(l.u�= ���te��i\�n5�pMAO7|K�;�0gz!qas$a�dkTU��sbL'.��2m4X�c$q�i-�mt�� bk|	v_��_�$mL���j�d�nd� #�7 ��` �^
!a(B�,�%D re?h�^Hd���e Q,7,��m!�0ac)a 5j$�Tte�eyn4!d.p�"�ih�/mABn
bBE10�+p�'�zqz�wll#n%5$Pm�s�s�tAf� q6!FrdChs�b !#`@D�mS%e�!��"`).�� ';T"M4�Upe`�oK3��NaJ"0d�|��$ �|!�h~"�e�R�]t��4$)
#�0#$$i�cS�~d}h�%veMg\9n���{��+{���KbcnK}ie�%L`}�e,(P� � p(@ $X0f-^L&S� t�l��r{�zvD,�A�hk�`�-�:K��MaY�u����bu�`!�dM�{M<$.�Y�&o�2�e�0ik<	`�@@���a?�� )`(")�f?* �&� gnVgȠp�9��)nf%zM+u@`rg.O��4R} �zx�nex;8m�L+|-; ��g=�O/+�p�" 29�(���Id)�-A�o2qqeF��8Uj�#AfsK�2% xp`"
8p�$etᘲ�ge /dr)�s`; e�(�!��2� ih<l���'�/3kA-)�$`8��� $RFn=k/l�: 0 A�/#�0�(��
8�RZq�1��� (R�z&
�G��$nr<c�5��*�lx� }032`Tl.,f$��|]��IWit6Z!Uva0��: �`q`��! �b���$&~ \"_;q)ve&(j����Lw$aqk^Noh/��+` 6 $'#�'B�0tC`w7/�`0��O�dkF`l:�!��suytANyrjop.%MN )Nͭ�GPd��n,�@�1p� @1�.g�%W�p�kmrS�=fQ7�>�W��ZD���f) ku09.�] VGK�"�C4 sI�: qv�dd�w�T#Bu��}l�p(E0-N`� ~x�c90dL  �@��a&�"� �,s�}B	rm%xE���6k�XE.mQ=�N$(9 `R�#$"�ug
`|Y���d�`| 11 cdC.bta�.��2p$-0,!`dd!2�fgueq` n A hb�*3` �o$$ �c!�ew!(�{6sFťj�" $!�*� z  ` o�-o&3�0WmpvymLs�*�1d�"�c i0�(s�.c(%��nI�e(R19)��� 2�` �!,,a�u,%_�� Yns${zuJ�h(4p��k8(�([/�l�!S�a�%�
��fb��i�& }	:b�` 9�)!u�8-&"� �d|,�j��#(5/v1��gC0a�n#�pCWM�qt+ άp�u`9i�2eD'Uz�v� Z�z(x$�9`*!�Paci$$�'C���l"i�t4�+�-;�kn�!�ggoze@"� (hdbmulc$��}�!����ct mkt\8ulw'/a�j)�`mgi  0(@�� e1�'\<"edh�ih�j�sok4y'"��A cj �4 pq$%s"g�fpqf*Ww:T�Oiz{mdD�ky /���5 O�^��X<�(c � �$0cFd-L�x5/�u^�seaTpDt8){ �R�$��)����bDsi|7��;��eI,)Jp�� ` ��h�8)=�$  ��E��B 0�0 �+#4��u0�P�1dynKty+~�h�{uR�Qz��r�6��� xj9k"CH��j5$+Ed F`tbe�c#<1�{/" 'p�(y"0LOP+pT5/yet0�jW��d?!2+����� T �;
j h���t�F �cEgTs�iEg.m�Ow�!cmf�xd:�0�$�n�#t�8�h~�" $0!� g|uw* 	{"��3Dy��!+:� �0�+i~qdqj�sedN4lH��D,=�Dq�fV��B&k/hl��cT�2�0�3tT�$�n�(㱄�, (Hf"�!b-cPZNx|�f"��0dKi�,{M�hRs4�``Le`�z8  �"&"��,�i���.Inl6c|QpDare�s���oy:$` ,�d(l?5�%  ');�o FT�cpwP32Ja7Ed�o�9i*e(cQ��G�Txcyqo,� �}��Cr:d�h"�p`�s"\Dͭvu�l
"�� (�/ Qt,Ht-�yiI��zw$��@~ey��)`Lcso�;m�5�`d!8n$tb��3Gkc�o��op>q{!U�bts@�GL.#0 5�/ !}�dd>�`I�e�+S]gpG�e��QL!�!L�$o�jJ�fsTC$W_�A �rSstA't$c�hvd�A*l`(���"��;M* Ffd�%ae{a,�A�~$m�[e2%@�%w$w9�c`goTv){�:aK��2mr��i�0%��|"F.}` F�2'/�)of�e�`  �!�)h�e�g bt�IJIr�s2Fbl�Xp8!b�""$�� `w7p,�,C`@m[uxE?Di$�x0f�fgt+w�/b�.��)z�t��o�(ib$� ����<0$�qr"~q}W]`VqYf�2O{�,+8c BP0�>A�b�,_~d'cf�ti��48_%d &o!fN_JZm�( p%@ #|�#$��R�pt��*� _r1dS�O%)okS-\eiegYŁ �$[�,�;J�fv6~0�a��1�K�$a$"cu��!��Gbb�|j�(W��f;~�l��4�
*�<�  �&0���� �r��x~E2DNegtcy8A�j#}a/Z&� |(�d H01"p!��^�*�y�}fuPN& !G-fz4{``p |�0���01�(� 3(���_F<N"!�� 1 �b�!�J�}m(�:��d��f �� 0a0	C ��m�sT`�g�`j�{�!vei,
���,��(�����#j�_�;z1kr,OE&7�a):b 0"l!)�)�*%��"%$"(Dpkw�@w{:"J(��v��!��Olh>BipD�9 fe9,(@�6� � & }o�-�LIx��&$`A/�X6�*a"le�ntP�F�Z{(LvoaS� ;�0c�a*��$f�}Ji ""(`"�[�z�a�*"`� ����#nek#myf�f3lEenu`]cum6m(R%vfeg1V�+([��1  0 $xoF6\C�bn�!~QF���da�%!�
�|rcvMi��f�9 
� j 1&$`"0~�y�~4 d�)? � �	(!E�I*r  @ b�m�ge+�bmiYdu~E�Ѡ(R[-
haK=
d 0�H83%|a�n y�rU�.s?-.y;$m:0ht���ò�dbAQ��pc�%:d}:_*c�4Z��Ob.0OQb1��W�i^�U_b!?�hM"es|��t#mE��rlu5N�;h�di\g4�Sq�/~��u[r3qL�o��x3�<eOb0�i#A{tm��awy�Zy.1���]oz�DX;�da�9�,��w�eRCV��#�+&U$ w�m2�5%˴(,mt1l a�0l�x�=mJ$�� �t�r �wce�yX~�bf}�$�a
3R^e�}C+(�V�c���n�X�-jj{��z9Dl�8w�q�]tg�-h3r:8�wb�lf��l	)-�rs�6
 i� �uW�b�~�pj�"�cfi6=eqJ"=�-o:�<.m�i:\�%��.`�w%�8"~�0 �dG��f�O�K8iT�V�7��lr��L��,n'Ps50!OPvgwfd�bu}%1(gSm3q5��=r7es,1$d�rr�n[t]4GR�R/0�dn�e�f0eB�np$!�  Ty65n�_�	�"-iw'��"!b`'g�,� a�Q& �?(f@ 3��I%��}PqF�*��/jb_~�Aw��0n,P&f��xv�UO�l�> 0 $ �dHth�?�itigj�2�d�7AT�Jhjda%��(Jx)�&e.il3Oc+6 �3�jh�!Juhp��i�A1In�?"vkk%U.5[%�OI��ueuw�'�$rpUM$,EZ�=O�+'1T��q_fK�7g�kZ�hz\E^�zm)��0�Ncb�vj�� ?5��(�`1�$Ro`q�8Ea:w�S<5�>x�#l'M$#��}e�JloSVu!`{o��m�d8pq�FARo�asru� Gx.z�-XerD*  �ҰE�e@��d"~�!#SK�}A�uR�qVi�}j2m6)c�um4y�}�htr�a $�%%�%VA
�`�iv�Nh( d�Y�C��,/.�hG`|-Z(<��#�T{<�br1jqWCm#s�u�^Gqm®)d3�^�Zt�cCP2e.&�J* d2�%j�0TLWPalNpk�
qy`��6s4o0���"�i�|qR�*�$ Qe��MW�%4)4 e�c:aA~��i�N���e.<?�)!��apg�uJt{$	 > �t& �;d�y�� ��psa`d���08�A7vLx��|)
�e �"e6��e?auv��0  -aRg8^�!�pivdgpuag�V,3h�Ofn2s�tqU�%# �,�_sp�k,
%�00"$T�rpI����5��I?���-VQi;+U[� *arXl9{ty�F�: eq�hq:=Lwr �G
�("�fZm�dh�rMg�!�("p&�hd`�(tf�6�!�M0�"�S� j�wd4,� :!��!N�lc�5Dn�P[g
&� b��: �lNxf@�- {t�:!i��q�t8���x,?n�%v6��{rG~��(��1$,phpPCfo`"e<s|#p?�PE�G6E%�{,!$
0aa�4%�aT�]eu�Na�7i5Fb�fU>^Ie8Aoca4����	9  w*.�"�
 ?g-�;�+,U�:c--$o.=)�m��!�k-m.�%l�mm�%�M=)-T-�,>a%,9h�M-ޥ	<?�-) �`�BV�r�v2 r�0>q?�/:6xP)@�/7K��qJ"d0�L5c�.ree�n�`�@�O|rrrji*wiDEU#&�M���2s����87�r��ff�-�.Aa�N��r�^���!@�*�$����-=L�9�=OO�-+A�,4���5#��<�=5��M�+-m=�	-�?�-���f`�%�)}��)l�---%N/pt
�k�g�;+oⰱ
%���(n�,l�%i,/*�-i,�|�n/�-��=aH���<1=-�5'/�/��O��!,�al-�-l�A9-�(  �*��~�tQ6��)@+,!=-g$a/O;/m.'-�!��o��& m9-��|��-�)&e-+�!m��m��9]O)���=��C	�.%'o�^Έ���K &{ofiХn_��;�?@3n�a0�oJ�'J�&�+�9=�� ]U[w5�n��$2ot�y�n�0K#��g��2�ک�U��LѤrb#a:;DUmLQ-<o${ `FBOn{wQ�:U_q)Z	Q9$�!e<LaexO2#i'��$@} )t.ECC�i?[Dxp"0am@)I,zm��h)#i?3vy�A�[izq| vQe!)Ƨ��"26/N#�UAymM�%05��b2e/ �hfy5*]�/OT��gh18a��"r.>����oj�cg*cIHDd��Oc=`f	j�:JO�|.:abq~zsv t��v]v]JWO�^�y^fKJbvu O���OPCltE#T*r~5X�>2vc6]e Bo�$t�} q@hGldap{"{�4�mt>"us% �Ĺ!Tig`i/gDt0BULt�.�)LoeLC�`Z\P���KK$2=�&ɧ&�h'M(x��4kCQB���UT�2�~{a�BL�YD�E�CYU<�}�sy�]B�Y �Y̭KC�`�f`VqL�lA$�`4ylq$d�aZZS�][KYd8�f+2d�)o�qBd�~��HCGJD5D7 ax�dd,nyO\ET��M�hn] (Gawt!AR�/TOHKf�:(#`�(aw4|EFAc�KODpdLO^%��Jfyd����NLR�FwJ�E;5(d�lOv�Y��O|GG��$8u`; "CohS�B\]LpF~IC{G����@@l 3�9�deDlbK�sLps��֩tS44}��LE|�gDAi[8-<u�c5��`qkjct�G��T�k�_{OSb�P�����?@f�D_0n"�'[@DN0N�A[,-g�zDjvmWLSN�!�]q;84l���vt %W�V\/BUY]�D,B]�A$- m{�xp�tjd6YT�O�q�f��q�SO@�HwK�2k�
`�B_��T"�M�SH�ZGX�q�60�$�[MNb1~2 s�h;v:w�Yqs��@�AcaT�� )�:��n�qp:k�w���mqqFERG�_���[l�mPA�T =0d�}�f4/�/���ks�m��]lAI�NN�7 CHurQ<0�$r�Ctarp�+ �eznc�pOHL�S�ZG�_�@BDv�<J�z�f��r�;sL�.on@SWFHQ�GC}LUG}tSM[U�5$�sK-Ir *'\]��lM\"grlqd�6�&U' ""c="�P��7MCYNMe�u=(�d�NRh=7�/M%F49�ڀbN�t/R��U�xo�UJSRC��]@Af�>��&gA�+"l|!&��Z()�_.S|�sUwk�_6�~I�IN�u��T�S)9��<@o5o\wnm�g*.�0npd}�)y�e!Hn�U(ney�j:G���Z�pny@�se��m!9gz$ef�Qu~XF!{E]N3LGXN�e�!CR5L8!a��#8'x-�4ag z 8cP,z�A�%./A�g>ng0HPXaAa\T�t�T�"dD��)K{\��2�u$�o�j�Y~Bd/���le��%+!$@�.Pd$��aM�&@�^]\I] �`y��(�i���W1�_l�and$�:`'rkuh^0.st9bxOza1�N�w!rH��UMqN}_fiTpCAvJH(90j�S8̨9n�#fvoitNmcT`R 2 .�#�ǔtrhE'�E���fa&{f!jFID�AN�ORLW@N!��r�|��-?8!dmd<?z��x|'%)5/c�g)s%3�`�-1.$&[�Js%�Pn�Kot��O@�P"4(�sV c29�&�iw|5!Wl`z!6 #<#,���kSe�2x�*:�%�n`{�(����8�gp�7$h��?��:6p��Rb�]�� q `cu�dap��`�3�-�!"�E�zE��so�P�Qf'P�3^#m7��5��g,�m�>&$�e R�a�'h*c�k�ڠa` ug@I:Bidva`>4ley$���0�`!O�CE_[e<r��<a; �sF"�++�+2���A54m�]p��,��>'!b5!E�R5e�b"�(q4֠u85Tsn*o�d5�vq�k�ཌ��482�{!�n 092%*��r8�)|D|C-d$=mao
 �8wu.`Xm�a=0�[�rojflEdioAfrxl�{v+t��m `3)LIQpMiq/ /Qrpa.����1!�}p`WR�gN�oC:('bk6aLt�
sC#]l#�6iVm�R9���4"0,U�ToM,346�#(z�O�`ql>:lt��dfi%�j0$/�k�$� >#/l6	��<i�=�+pgd-�-8-�M,-)%%~5$-,e��%m)e�o$+�=/9m()/?�.��9MO b��eB�7�qTlv~DIw�_&���j!/-�m�/.]=�=�m9-jIm0o-=���r�e��-%+/?h	-'m:��-�!--=ym$l=;i寪/-��G@!a/�j@8�ߡ�q��X�of�`ZTuc�ӨAa�e@aMo~eN% n�0� �g#jE:Wg4f*�q��bat� a��,e(%p� ��CdP�{	`H�htjr+{0T�3��_(�!ϐ/��er 5h�_t�;R��$,�!0|kZ/CBO�"�vf�$���hn��a��w�aW8{/.Fit	(1(�)p`lAC<iDf�p�A4dA3?�G$��%UL�-Ki�$	yB% 	�0�$(�[i�F�~�}v`� �$�cw��eV&j�F d =�(03i�2�yO}hMd�fe�Z	g@$!Kt|Yc@'Uw�DdwS1l$*!6�"�(0&�5&;|'P%�i�dte�;
0���S2@T0pfAmA�%)t0FeCe�dE��Q,! {
)a�$�a�:&&Devek,�\��G,j+6!df5N
& L�v�|y+!dF�`OCM�(��yop)� �v�d�z&F�D�(a/
�4# �l;�0@]:l�k�" pK�J�(�4kj#8b��pZ�uVf��y�[Oh{�)-Woi��9�m�(�$`(�+ Wi��>�,/~+8Y�b3=
	=�d[XN�&[,^
 ���s�� $k�W�Z�bntq=4o�p�ա.dmm~)$\|`U8I2~GZy[jl��*ri}_"]L�*1+"h�!f9` bal}��k!v ���w
�.`2 dGg"V4 �'�eu��PYrCud$mk!� "`%�$e��v�/�e�ge���@iڝ]ahNwm�Vaah�a%]/* �1�"s�n�p ;l)�UvE.l�Y]e.q�n^�a�?u�aefe�:lx�P,yT�m�aH�|�D�EP�Hv�o9 vUjW=�d�iRv��9/G���i�!(�HnO�'mjtm`eg��lP�mc�|tFDk��0�!c�" 0%l�~?���h�205|*�`�6! b~v���8a�$~rtYx@�k8L�vhz��`X�hF���d�mn`(T�m�v}�ejqQ�6o'`Q?fch/m Ea3ag�'�aL�ur4�O}0�w�ta�gz� ͈!y�vA�b+�4lixhe �h_�/_n~FgfbcC��(�  �L  f/tu�`/R|�uQL�dg�\b���t�,t��s�_�M�yi"!hmtp��7-$&�]nm�)N�iNi?�%%�a y�8P!,X4@4o(s*{gRFIRs�KPqe�	t�tu?�$  �4q�l�(H�@tJaqI{jf9�n�'p�o�q�l�l8T��iu������$w<j�9``8!
"��Ofx( i-uw%G�Lk$����e+Gzvh�K �Ib(Gfb2Uy �t-�d*fe,�EhI=�8�B� cf0-"]�Klq"O%$��H`�C/�c` ��`#rk�N%�Veo� WGm)�ml�knI*.�i�A
 {9$$����id6p�,+w�s=i�j�)n�./{O#Bl6�ef�(xru�2�,oq�fe���Cdbe,cw�.itmm��(�"�0Mg5@5k������e2���!abm?E}�L4-dOb�M%btI��Izn��'&0C�)%JS+O#E��8CC�AG�B�|EV(v�If)�����` � � ��folkA"�j.
4!�Ezt*;g�/�XYL@�Lx-���z���j1I.)-V$GwYr�yD��je6^gLo��$/]stsc&div�/@�ZZ�=J*r
(�&Pf#<�	( th+#&�Mnu!l
rnv'x�R)�?�(�:2~:�rF^f����n$7�t��*ul�8'�bh�}Wozakm�#� t}|9;�$� �h fi��NWmmC�'hl��T9iS����b@C�ES�NDRrHBU�6!�d�  1$ulIq�6}Mi�eJe"i�rRki�d�1�|M�G�q�N�[C\Ow$��*  1b('UNenVHA�E�-p,|5X_�c2<���{'Mo@emc�)(dTA�TwU(_�d�+ 3d,e~dmI2oe8)�`��y��8:X
Mei�}+  �`-�&# k�\iVa��gb>��s�Kt~eee�D��D|aE%(;&u�CCh;Wl��x~
~yA>F��+�E,e*P!�$1�d7{�
�0 �$�* z 0<s$�l�q�"Rl�orEhVa��wt �"��&�i0hB(p�<i|hnqcqc�vJD�hgs+Ou���a/�Z="|$+�
Kd�t�(t�hya,�fm@,A4u�m�e:�M�H��dT�@Y-�9� 06 b��!&	i��qz�Se���zb*(`dA��r)!mj�&}�}x�W{e�s##T= 5xi._P�pue�nbk�u�M���
d"p�����b  %2�P`r>boq�8Qm���� k�9�t �MI58:f�*�%�� 6|m]�>�.Z{G<q���vhx�ttGtOrr��p![JJ�%:0i
!��lyc?�w|!P�Z)P["`2�R"nk�~_��40ip8u��h�!�57h�aq$�}""c|!}/�Q3�c|�.��$�4 _I�JyN���h���*2e�i��tue��NTh8R%$%#-&�m�;V�J�veeb�o֨��OS���)*,(E&,c�gOh�8ga�InWDjdl-�O�v�N,O`���0�,�$hC-!dv"{'L�z: % ��	lv@&`dUEx�nt*d'V4�x2e6K.7��( kI-�$��`� c`�$���"�9���1�O$I&"gx�!q[e`F|Ax-�k�Zned&57`is@å�"esk6�'xha�d 4RA`$`�(z�$&y\�9bxm5�}_�|�,h70n��3��uHa&��|`�/U)��G(Bu�rcj�� i$`"f`}�/�g&B7\E�sT�H6v"}N��l�[M�^0�`j��ME��'�ul].�%�{N%� @ �!YY����M�	�|l?�7~nzvNd�Bej�2lR,fH/n�WFE8*�m,<����xinbM5v'�f>	m|�lLza&�eq~e`� ,n_%9�y"$,��a�*2@��Id�xv�+�.F�)0j�b-!i��" ��@�9�(F5tke�n7$NMt�, �	e*` ("�-(� �����h;.�/��7cL}S?�Iw|/acMk*`IFH��b��L 7zyoU5�h[N
�"� "qxJ!��WM�)_�5�ct�Fmms]b-MovIm��q�TIQE�OWd0���) x"�!4h��nJh6kfN�m�pC�Tfe6�<M 1�ha�C}rA~� e�Bf!e=m�>� �"2( ���hc}O�o0&emWveDQqhj��hJaE)��i{+�]c�y� 'To:hen&i9��  �EV���J�bduUY>�:&gu��6�(sl�!luee�%4Se�tX�Bd�$,`bu~a-�Qq|bax;���?��:�G{wWOt�obol`I�!wa>�pB�0�z�]GH)uwG�>dhi".�Zm�6_:6nR�D�nR�0�=����#��fF.MAnic>�kvfv,e�dauaS�d�s�Te�nte$@�[}^��ik�M*
!�(0"('*^�U�NNhgB,0f� �|> 9���xux��!�a[Kw�Gmch�qMe1�>+OϱRn#�"bOiy�c'Nw�'e!t��nDKHs%$�P?2%k3��*�p*hޭ`<a4an�'�.�b.���P�O��d-97'�H}k� 6/ ���EN�duA�!*G�_Vh�rlFm�w~gܹ"G�u��-=awj�jo.dlf�6n���~�d�DoC}�Kk�`Nien�=#n!q�?� qlkV,osi({z�,@2"0��n&`�qq}` ~jvPT�l�e�ETel0a�bDr��xG D#�e�BjW�eznküj$��P�K�hlm4�g�  @c	  �x3��d�Ec"^_{}�rqf6(E4�d,9�g�DFxgrYA`e-�X6L0X[o-�R|mlL��t3P�+d�V��y�u�"+b��+�b$rj$��� s1ua�qroA$nfwv.U�&y�oAlya��vk�J"}�lmh>l�ZAzp"b@�H��2�� ��� g@`$`hKg^
8�`�ݜ! $gqe�tu@i�p}>:�A"E�C3:�D@p 2e	'fl8{P�+�PO�{}j*��<$e�e�bi4%$��o "`& �� x(��w!.s�{{�L`wG�s�1cu�r�7k$��r�nuv2re��OzC#WNp&c0$�n>�tc9+��p�g��'kp'+�)��b@ � bm:P�¹|0n�fpr�g!2|.�H`�I�N�@�`|xI�
O%*MEPP{�J&�` ` 9np�vya�Iz� ljo.��ovf�Ai�5=Qe�P�p��V�p2b,i���e@4eN��Ek7�@me`!.p%}"P�bg�t(`�4!#%t �mc�"i� `?p��oE�'<�f���>�a/U~i'�4/f.mf�D-8�{�`� !
"^uHaPen�D]u%p�5+=�!!Fen!mO�thT*i�B^g�mm�/Щn�s�~b709� &i��O0����g�<u�hMWNdM(os.Rf'p�KDo�ma:-9�Ĩ>=a"�&d`]�*"o�"0$ "�Br��fxqIh�dO��^<2�0�p�sn�cnbf�&�re���fdR�j;C@  (o �! ? �C'�k0@y]p�azc��k�B,9 U�)3>`D��oy0dvi+(�"��9
�B  $ ���2q�,sF�s�f`s0CePob�9 ��cd�wB/k>kg�9oei�e2ofk.D �l�fl�rl=?��oPi�ih��!me"=�O0cvl0.8Y~�d�>.� k�x�lM�*\e��"`Me��{<�lz�Yc;�32,�dh�s&_@gI�,k,=@�Bc�w�{�6�p�Fi���eEhM�Gni=aqip,Ư�*�"q�v�E8CNovef//���2 (�xf ,��=�sxh�IX`m1�0z� ),�b��Mi�hPm�s�%r0wl�Dd1tzIFAw<�v�;���D}d �/1��2 � &c6t=Kc{�%� *� �  }��� �ro�s�brS,xdl��6t%�kl3jO�xa
D;^�)cH`"0��B�e$%� �M5l~n�la�[L��~�gbHcI/24�8C�Y]UNRpkWM'�	$�f
P��_Gut��l\Gad�!.�eh�j8�!$rd�srN@�?lh�qcs�\G�F�"z�x$1�H�1�J��a*1�uh#L~_WKiYz
Q5�r�1%��
�� ����Wi����|^$�XxJ!kn$qc�W�t�@P��Gsm�a,wj�)
\h9paL�tAoE.�,�sW�w�=t%;
c@`" $& �Ph0�nt�����O_JnS,m�{�,qUo�mNt��1���EZ�� O�ޔfO`E�(�p{
i(  (,b��e��*^)Po�O��(SXU;y �<(��\�L%ch*�$`��jddzyD-v�N� qiWeR\�bMh64�N�w�Q?�K�OU\LR��T�T)��.�0'� $�8�tw�N0�^h�Me%�LF�F�� (��8m��o6p$g�e t�+4^�I�ul�SvHu}zl��`[md��2���(�impe>4mA�`F��Gms� Ynb�q�M�C!��d�N�8�����cwN7vo�UBu$s1_�TB=m`�+T|qL%)vLhs.�k>):�e"o2%|.�WeIu��Db�#"�git�p+%��s�m!�=]< n!/t��h�  a!d0lx`5>4F6_pa%VBC|@sWna�pnbwn]A{>r"2M��_W&tOgObJm�-�9:* !" 2&10y���{>$%qlJh( \E�=}Oj�_UT��@x�$4DE��O#DO]�(�%$�3�t^
 d�  (`2�׵{�9yH^� >�xoG��.f�x�oELN�<�rGds��b�~xReL�wY��`m `]L�%�2 �-tUctni��9��"��0bt ki5t2 ql�Sd�\fej4*3|n[}{ !&+0?bdIis[&{�զ!nR)Vw`4(!?5"(�l.{0#!`q � f�SGu�f$sQ� )�jH1# (! c�s�!�%#9���0`�V&CwT�1�(& <�} �j`3��Jf�a9��<h  K�)(v��)M�*��2e4�;V;>+�u>k_q� A�J9(�p!0!#:��%jn+`lsW>Zl� ce`*E�DgEDB�: d�CR,@@��cI/v(Wj���!� 1� `!$'<bG �0E	@n!XA@ML&!+�|�Er!�qb'?s�j�/*!(�<:J�  h",�ytsLbT�qh":E2�A 9-�O�fv%p��/�0d�mPTa�zqLi,%�u�Uf|(�� �� OO�30 ((�c�#r�(�oUx9.: �(w�L&k$�N��|jq�o_ȷf���+�!n�&( %a go���tun�P,t
qT�Pup�/DFie�-Ma��8*�( kz�cbCe+�d�0tTiR�WgAz�`"ai�othX�2&B ) A$��/`%&I!aa�0ZC!0�452 �!,Ue�~�%h�gQ�+���`'eoo�2 o p4 � ��Pt:lja4,K��#8��$((b~�H`�@y�?8,g�agz�-�>�kw>`ap
� 4$";� bd�a8�"� n&�,�~��$( �h`�or�g�Ue�&F�^�>n ���0� 0��T9w,s*�I�$�0� �  0OCFqcQ$~��b��t�e ��HX
�� ����ƌJ`7   �$u��8i`���u�'�h�-�Q&l`Pn9XC������ fmng/cx5qtxn|*wlj!Y!"-$��kb(-qIoRocg�n�fofy�P5 QT;��6rba�xcE* }Z $K)  TN.�T�3�vZ� �#nK�E�M}�g��z��9,�1Z �!"$   ,2F�m/:@"�@XXh:t�h%b7<	!�(0vd�&AJ$%gzPVAlsl*,D���=}�!40bH�l�4'-�b�<p��<;�.>n�u���l\B� �t�'CFnn-�$ʠ� h`=`*,a5{1qgF$VTlc&S�n,of,e/ytEi�Jtgp�] /�On"|�+N� �ztH=w,V�old�fH0�`�Ͱ�of��g fb��lpRR0oUpgsC$*e�l,2&p`ie{i�,��i}pgvp�con4Q�
(.a��pQ�&&� $�z�pe�#wHG~wM���,�t�`��8{E�,5 @H��U�Gf��&�}(!vΠb( (�2n�wm�e�Eaw	�hT_s�JJ�N�i:!	6`o�`Stoa�[P_�R�[�Er�Ga�_M��i)s.y#�U-o(,p��(gS{w�`h1%3(x�"`��l�i��-��d:�bu=hQC�
&,2!! � 2��t��nrp%!$>�.mej2}d@l���a�n-7�lsl%�tgko	�}�K$*շf"`�en iqt-�`�Ko1��1(dpmp6��,n6�JD'�a^lOC"�<�HJ^wHeK��� $HW0�2v��vE((OO��	sf�kg8(gqQk�U��@MJ?�\C�� ��vCa|^aTQWv~yvN�nOe�p+ireDk( qa�U�t,$g{ts~�rAVI��MO37�B�(9"k|eonIlVmq<!3	V`|CEz	ioJ˃3h0��6
�[h�'`Ce���R,��r��uma nW��=IBfw�nAa�cl~`a'!0�Y 2�p��r;$lui��ev�HGn���"ql�!�C  D�  (mM74�ita�= D���el7f�&`X�`Esua�'Hn�`�Q�8�,o��)k�nrpc{[N<�h�`*#�-6 x��e� �aJ�hw!/�1SdR�vC�9&8��0 #(0`�6�d<�c.b�a#A(�+��$�`�	`�r$��Mpg�d�gA�f�soj�hK| >1?5/:o��i.E�w>$v�h�h2 *��p�=iQ��c�t;R$�bvg*jN/�keol/o ��,'�(� �k}j�i�9*�k7*0�a�`@*�x�%� ", d�|1y��M��L�)z
�0�(2)~"�(|  #uIh�"�Ld!�Gafuq)MgUN�)%��$(0� ��b (�f�jD$6‡m�g.v���s�g� /���S�G`(?gNT�M�BVT>z _�Gv���6t*V�%]?���p1�8`"Ao�8w�q@$�=!TeHwL�1#)$z�!41�,�(w���jSZ���b}.
h$`b s�vI}85oCiNmQ�<!�a�.qvzDf��%�i&�(E`E�|O&�FB�@�GG%le	�9Y�@& P #&�r�<�vt�H��hB, hen$5�p��mja{��WoF�jR)�=��fo�vM��$B�2(0 %��1�-d� 'onL�:f��$tO�}-w�o#'�_hP`�#�#�\.%�M�s�yM(	20�#1"`�*`(�kGlnEx�<l#}��ez�^o��r��*�%�I[n�;b 8Y ~���i�?�`a4  T(	 co6dI�mo:">)(30r0]
  $�%� *ud 
ii'NrE��<?hq_%Gyj�-;
�h b "l1��sti=wp`R� B "�?�&  i" 0cz+���T!-Mt��P��lu=��n $��h�`$$rpl�5kd�A��u]:(�n��mx��GhUEeF* x 1 �b߻M� 4ࠤ8�F?�d�0�@=!! z 0"xgl~St$�ml4��ItQ�
	}�M�E�V�fom�/�glRr/��W`� �"("$.+'j�t�aWQa&WTX35���!sg<�/CdP%�(*i�KL�vEsQOl�i1�Kmc�_+*�b�1�!1�<$ �h0�c'JP�d�\g$.n�fVlu#ec@1c.b�zh/u|l�Z��2�`0�oN|eh�.�-oba�Z`m/�C���g0=<�o��u��M "q�s�mkuTa8WE? �p���/tyH�{SNL	!>cuFo�OKl�=5!6�=��`��y�1.L[t^.�vcpt�1o����v�$2d3"s�OvE,Cl1
�!k��(� "q=��/(|�2!^c�aWa�k�L�tH:ga7�,0j�|ai���VjmunP$gkg':6I������n -lVMhAT cLp�\B hB�nEn5|#�/k` WhEpgNw�^" 20�� 8`an �c)|�`tv?nd�<	s�J6aa^S�gvm�h6�aRv%�('��*5vu��p��}�:3�mc�Qu`" ' "NVenW~j%9!]9*�5�\Q�#Ml /���px�lgl</�Mkmn{dQ�tu:Hjl�wR-�l�v<Rw)e>v�+(��zmu�yGn�c�g� ( ��`-("b( (���`|5F[N08��@H9`&%?$b�@"`# 0�{|vnD��+�Y{E@�=-$'c�)ck#/ ��1��`Ʊ�7qd tmv�9Rg�\|bpm��Uzg�`�$�A7&o�;�$$ w20�2"Χ��
�D*(m!<!!2a�GjEGȴ�3k)vhy�vHi&s��MiarU-S�2b�4�3�0P`�}�j( .�N &�wU# ��0ka�X`rq�T'Vh-�,�o�L��GlE}dt�-`Yh"��tE=]"N`G�rPE./'� NvmS��g��:p !�e,f`�X!=A��mr-t/��R.uoV�k94$?J�H�{TFuk� `�VI�}d#�x&�7'�!�Dmep&g��S�Be
 �02+��@bu�o45�Ffy�,Tu��9g1Zc0mdB�P0�2Ųb(Oj� Ea0iJ(TTA��{lK�GW^�	(1x�t'a a�~4�Wz@�n]usNe 4` �H k%1i��L���+>e~}�veE^�� !@���6��K�d�D0c�"{/})s<a���2J0�}brd)[:(3miQnk 1 �	 o&��ȳ$hhy �s#Me-ur y|A�-�b��hL!0&� b.m!,@-	&"k�ye{;�^ox�p�c
<�w��=/ noV"i�D�GpmguO���e8D& �2.~ �4P-�Ib�\6`mOv�#+N�x�4$tJ�f�t�p�<$wi��p,%�}\tG{N�g�)x��
 b$�0�MV�-on�}||�qyTapc�	I/\Eb�<E�.4nH�'�t�=i�neLE,$���Snn�jdS�</}oTI�a���(t<�gW1f��gi	%�-�UJcRAOkmM6~`66�`}e��k=�q!�=�A�B�_�s�e�ay ..!�x.��x-�<��qnS��uH[s�ۤ},`wVw�68u�rdE�&���w�w<�IFE�\Nv[iEJ\�k �"�^.x7�GuB�W1-St'�5~�6ktً��
a� "��A�e}��}
$�"tt~�E� �1cg~sEt`��F(&�3�`t`xw*o(�f�Mc{K#kh^�ai�h EH Ã^NST�H/w$�;*b��� yfd ��{�bp!vd�f=w4�ky`=4�Dgc`uU{h�0+$n�7� 8$r=��pF�H �B!�$Y�$�( �@/V�.P�PsA�m�J �VfXd	�J 0 r �o�mb�^�4k@�:/@Au!4)n-O�`�k � K�H��|g��n�$@v�N�o)1�JÚ) ) ��Af5`j:� i�`� ?N
!=��"�bo��>b�pF6F-zV�}M%�N&<8�ij3nnhran�0�P�I�SZ_ۻh�\Q[|osgDT?i��pv`�#�:#ߥ�a�6_:s����i�2}�`�h�<S�ȐcEr.DAT�ZT�DO�T*p:[�P?�3�� �%�.��av��s��h��^3�'gάg@�Lz�G�ae#K�c�{oS�+g-d���c�D��|n�jH
A" B`!l`��>gnq~2h{1(&E�UYd_eS@5��r!�(Bf5k#�p�<��.}�vu<	Y��p)*�3 �npsb�?
" @�C�}.
v`�bhs6,;a:�.w/wG��=���A�UGVZ����t|��=6��,.je��e�&�Wm�Q����.�o�@��`$$,piv"(a}cgunfd-p}` 0!001Q$vxDr|#6m(s�os%yN""b`B`` ��$0,z( *(kJ�wQ<a`,[S9CdGt$i:u�fg	(o#on`�3$�+ 
 $Dza�b~��5!0d:$! k%`kV$!Cq�8Ivad|� qvd��gh!=�bcqcCm^Serr�
�4!f"G�mpD�gVlcm'jT��tkN;	 ��`H(��6�
|*�!8�#���(*� �f!!�$X5-'%!9!-�h-l--}%!-c$-�o-�)aX,>/{5-'	<��--,),/!)�-�-/�=-(/<//��``�ntq>%"U�+(-� Lunes4a�/fJl$�r-y#%	9K����(�!!!< ��/-h!<;�-ne�u:-/)/�mG�o��,%/	�-�89	=?,"o5-t"�[J*���.M��
��a-D:�^.�f��~f)ot,�LTmHD�K�yT_��'�A���O��/!�]eRcDfUeU[.�JCKDf%8H�En��vjawuY1m�'3fgsJ<c$hnnv}?pXQ^�jpHNiy/:O�t_k{m#nX,p�|G�0�N_idEWNX8�UKP zBFElWI��POn��$b�gpdLuf|�wGaX�K��`ofJ��dN_ND*:6��TJuMa.�fa2&o���)F\oe��,!U�EJ\oK�M�Qg�LRAdw(0f��lkV�(exae�dGu}I�J1�]tUz|H`f�Lgr~-O0]��!�u*� u~'E�F�Ȁx]RBU1Cu���Hrn���W.&nLYiR�Eftsh� rE��a�v|�2,Kf:d�q}Tnu�p�\E�T[K�QQ��A�|�I�"T�EX�W\��3`�\��h�CG�L,;m�&unCae"�((�venT'7: �$ %:wΥ�1rdy5�|�d~8t4L3
!@l$_~kzg{s�bl��zH{<�Xivq�a�{�i|�H�)f�m���퀅{ 4E�* `30$�d|�g /%y)mm=�l�)+;6$g%�,�-�%�,-+=)*/��'�%�-}d%�t oMe'o$/_I9_�},)64 bh���|:`0n2}�/gu--==I%M},�,/	,0$=���m)�d+}.-)!���K-	�,=l?[}'�%,�-�-5�88!/��+�+Ua�e#'Ep\x,��o#t?*j��7v�2�njL +��5�E�|"��Pst2@��ְiNr*B$�AfmlEnYT�r�Q�?�KA8DR�xd��#��"4rM*3�( $@	a1<m-�-m�-`Jq��F�*=�/}/?%3(h��%?!{5n%i9�+Fe�;i!o?'�M�*/�o)=d D*��f�v|a0��~U?%&1> 7t1�.�Ig�otK�rFjc���(�IW�f�OD:4llM�i�i�%iut�y.o#h��GsN��M|c��9j.gtu�ze��SlK�*a�n��JBG�_T� b j E,��	.,ki�!--5m-j��+%)�O��+-?�f/-l�<-U=�'��- "�+/p-��%�-.34$(AK��� |
 uI�n+�3�GgR_hO�A�,_�K
~%SW9 2,�;Z�d,�o@a,*e�x�!/b��yB�%/�1g.�i�l|�wvC�k	-4��'?����N1D\CpLU�ZKK_W}K�KL�_T�^T%?M�.zdHB���/@;H@H�H�sb#Sc�o#�sx@a�hg��
�  �+�.Lz�zucp0I�[ �I0�1 5�A��KMheNA�-"<���ku�d��fCdq;�@"-"n����Tv�D�* e,!fi�o�vv�X*5�rtk4Jv�=A{de1�c2�bϨW�nh�csubnUP N�n�m-1m%ya�% c7{o``w(�t�(� ��!$+K,S5	V~!��g�pvkveI�1�dw!��mo|L�z�ȭDt�lo[dfs�J>|.UV�h��yFp$2$fzd}trn8m��i~PcWzʫo6yv�mn�.24X�d�a= G�ce�%nU֭�r<i;
 �.�(("A$�@i��0k4((    �o$w�8��4"p�&dbo�p�n�$�L�=����!����hmwdobipmxIvevH�S=c ,opc)u��Blia\& 2+)tn�mtNl dk$2)m.�� vJ�Yh)e�/\)cg3/�DFp_9�&nhj� �!�0�ZN�u_X~b-iNpR�fu��Vtfy(y/)c&m?uEDfp� !tpg�}n'R�%lh�ajAl#UmdEBl�0�}%���$Eu�u�cle.�A~uE"j,I~ʸ[�+/�Ps��K*2�e A�*}#t p�cX-�&)0��AYN��m�|va( MoMathm�<E+lWywN~$ls�Sv�A�y(o�wIE�lo��PO �auT�:i�'affhf%e�e�hx
q�"�&h�xEr.��4D��}n=q�^ybw�.h(�ō FT �{TR[��@Ш(p�rd�nc�z]�`�4R1Adh7H�VE��l<?a!; �Aba|!��`D}�2��3�o$Ky;K@[@bB��hi�}Sf|��ei�l|A�{�y�u�/�hS�l�VTM��xT���U#F�mD^$ 5haj$HmV9�Hp/,*b3l�Q,Q4!tW�5PW(<�*s!m� ŴW4t%|5�!-a�	D4�+2�$2�+6���~yr�g\l�f+j^Eo�)�"_@  5 
uH�2/_ǡ?�D�aEIa$Ephsu�����T{k�NGed�uJ_=}obAznm_o�)SJ0( $K�x(ar�W'*g+dhtJ�A��}�octrdnNo95($yn�fDn!z0�*!ej2 r!_!��d|�b��VrbC�uq�"ue�g4m1$�s|ip��z[b,jki@re�y1��!$Q'�4�y-UV 3c�/l�2���it�n���iU~Oc;W���uPq+�2d  � /n;t L�/i7Uduh~Sa�,�qC#��m,T�e�$l{7̊� ��$',/�
�lmj1.\?�=+�\i�Emuag�t�0w�ni>cmn�hUlDeI2i^�gnt��imluAW`&i�s����i�0%�UDiuiy<!�!"`��"$:Ugy2L2$�(A� /z:
%�� !d��h=q.�q�dI
�xzag�l�hB�	q�eH=�EO},(4`xR�/p�;� a�)0,,�gnSp�CemcW,a5uL��qu�h�-N��'*w�P[y5�/�[;�{,�8��u�E�hQ�75heXrOT9[
�ba(( o|mU�P8�Ler�q|o�2W`]b� ``>gei��b�	�m5F���5�zs��v5A$�Ijru,GmE��eѫ	|v�z#Q(� f0|�Jj�7`��qc/�EZ(jYO��iC}}e4a.lC�l�Zd㫨c���Bp�8h�+HNe��N �aRB!L�2h�i�*� �(fE�5"���ӣ+q�*`o:�%05(Tm)^WZ![�6Ul|o5hr���bIBp�pw+U-rc7zUl�- fd,`&kgd.F]�gi�
!&8`2+qbor
�8{%�U�y(*D�tQ#F]pv<�M�rO��l}�nt��cl�lw�hg@pE-;0�( �pMc|]r��uq��-E{ewpz{c/�'g:BOLBb_gq�eEU�h_m�Pl|�ܣ$L�d�Vc�'iW,�P�`�$�Q8['[Z�÷l`�����N,�KauF%_,C ]M�UK�C�I� iIMK��J�2�� rih,i!`!�@�@�J �!�rqfp�/a��c���u��N�T�(�m��5ot$$��yn�ڣ�P�"{i�B"2 B/&��Aa|R�Lw3l`e�M5h!�sn5{68��QcPI�>�r.pT�Z� p�jmgjx!c4��TiIwFm�_ j((���qx�r�D��g_.��0dc�iA��~i��}-�e�q}pft�sBy$�2o4k y�p�`m�Ubn5(jNp  < u/!((�*	 hRvaPdvtm&eFIVuBi������g-mAvg3��haiE�xkr-"Q+`�))`�G~{p8L��sҕlK�({ve}*BQk��8�du �d%{I��� (�`@�lc]uaW!n7 j=�Y`6i�l Tf2g�i��~�LpuHYB�k�Ela_'��d[sZ-Dpz&@	v+	 5�$��f  &y8!/ga�yu(09m��w��EK�NE��8����`00��``%&LOLc&�.�l}l�npagm''�2gPEPdY S^{lg�rl(���91# }L!�m)m�qx�w�y((g�h�q��K�j1SLIdntfn,��lE��DE �W(!~�lel�e�d�n�?9b6��P��2!?,�0�&;*8!"qleiC�xgQ�Uh%a}y.te�p�;:N�m!x?�$ �'� `}�k, �d-:�
��"$t�ek�^`XxX{I%c!�t�	�Q�.�ifoea�~mca-a���r<�=k&H�}LwfAn�Ce�|�q��+1=� �
 >`�s5.�/!o� �4C�J.1n(�p��slhg{|�fb�san-r�zg9`�� 90(#hl!
Xx�2e�o/''l�7SmmO�)*��?a�`J�&`� ih�d"Gyc�leKV/�>�+� #�tm�S�qK(�ah#%sho�yojE�U��-yFhj�me��R� `(is�eidM�lv!co�e5a�� �x�c�S#;�$�$4-,�p��dK �h(asJ~g2g�n+/()!%;/*`�!jwe��b*0?�iS*a�t?Idv4*'�~�3
"��(w��$ uB��"r;  1�$?�-m%'=|}	�im�{(#��,�9Mm%�8)��	'���U�-�m=-(�),�2=%�)%-,�9�o��$�g<��!! =�-nf�q�aP�(D7~�r+3qqph�lei)�{M`�j#�"@�*N-��s�l�}Jdg�`]K10nh��0r?>h�f(|q"S+M�ubqnL�%js3y;��>&#(�K|���U>[E�3 �Zg�(0�=�$$��,�<-�--��&'--m-�<�$)==/-+u��o%o'�9	-'y]
,��'�=|mM.%<
�k�+%�%{f�di���a�l�7=��"A!*{la�wnE*Es�)McL�do�YE*ow'��bp	v�i��s��0t��.���"�'�Ygp&`h^-$��7��3t$�.dDf4�O��ozj�h�E2q���r�s� �de.4agSj٨shMFtp4k t�/d�m
 2*sX��di��l0!.al3Gl (" �-�U~$!�[l:a&�G|�3l B�!�j 7y�f �`d"i`�{Sm!uN@p�eknhb�c+Dr�h$i� bV t�,`�r`j�0uM!�L&w�(� �C�oJ�G#l�"Brc0rV�D�/�p!BhHqb*ebseE�Pype%�d��#*$�bnesyA�eZ�#au�eUf�� (��s�i�l2j""��'gL-gn�(�$b j{5~cIQT�Da��ON�'An<J��6B?o%�=`-L��8%*gIaa)j``AU"aN��an� J��|*�CA�x�o�8l�L�NV���|\30`h"uK%]?�g�Q���w6�>&#���'��CXc:�!�b�Bs��]HA1UNA)|�w�F�-�8|�&N~Dy���� an�t�  NASAUNK�KPJ�_1�1 5ci�o�
�abntu4eNo�^!�}���ND,bBe�5rhnvw�n�Q
qi5}P��:&lJ �s/j@g�cF ���*t)x�m2;46|��g����Fy砺y�Q 
0< |XM�^oOo�&Kb = ��i�'%fkNt]�#M�nIn��1 *�8?zdg�Ly�eH4N$f-��"#�'���mdh�5*�n*alElP� )n8���2 =�5*��{ *W~z?�h�RB%([[(��  QjfH�3u��j�Wc��d	�9�TIc%�jU$�P�:`+ p"E�a���d7�LchcI+;Z8 �@("�$�%Tt2Nt�Y1�h(� n($8�4LIjo�qelt(89Z((`0�(�uq<!`iZfOecnd��,/Kr�$`6� �bjH7�$'*+ ���lO~��H0�I&dEo�vn|�a>��a` �9
/�L��B!5(P��cevleDf�*.Qme}�-h1ԫ`�f0s���r�m[Qos;nW�"jV$ a'��h��[%}��q�w�nmma�jmb�(��<�u4�& ���e0'spmG <|"h�)�1�����?�2k"h���#`0"qi�+uL}#�Kf�(�"a� y�(=&tbn[�blf�e�iq�ys8mm��n��� ~� #4�{nduga�"1e�/f~v$ha b�xg?�N; h��2��{0��1Be�lPsOGfEm}``yy�DZq`cf�S�o}�t�6�=&6�.��E?KAS�H[ZH^`ua/� $$ xn{�Zg�t~@���ni,sp�ez�*y0=*;j)at(�E� �j@a�di��ao+ ;j &�
�(%�l�|�̩�|��wCo���� 1j
exm�	�>8�*r �!e
.F�� f�e|O�t*�J�%ry$!`@�	f��� `i7.��H�.�n5 P�+!"p4gwqd2BA�aE8cY��(�j��eF~jK>�d@!M��nu�4('d� )vyA��$D�hGEb�w��o$�iN�xE1�P@H�oWj�^fid�blar5.��%2�0 j3Bd)an.�7I��D�1OenO&*lsAkx��b%D=�{X��<( �0�`c���KCpp�ow�mm{���t,$J|a�S[�B�mfMdD�Iz�	&�.`!0m�e�5 !t*�tM�nv_)!�ao|#>`�!���rga2J!�b�! |�/ �as��uplAt��V ��5?]e'4z�! |
�h �lm�Mf(g�fn�u	*w:`%"�""�mh� ]w4��"�$J!}|�d7,�5 !$�0hn�f+}X��ng a>f~Ecxx�@'hvhIrC���2;�`�g$:5[]!H � `(4I�no*�7)�%�uA�e�E.\�/p�it� �y%�cm�`�jv&#��d+�d�g`�|10$R%s|�� E�5nP�o>�d�a"i�|t!�tl��J^�ryv #{b)�Vo+�����u�t#01-=�do+��(��vvh8�(k6�%eDDW	��~�`&��:x[IFl�#ca�~�jc(V�UU��(E���i�&<�Dfc}NP lxc!�Ipj�b ���J-E|�bin�Jk;[n2*`�K�`"!_t5�e�8-h{!��#0�c�*qh!��W!r��P��x?41�k0 !F=`'(�Mu��<�#�) 6"(�)("��uHh%��C�o�kiN`oo=^dv��&VQp0G�� rL�G62��D}dIi�|�[;� � b!`D�wpY�Q��b2=�2\� s-��e|m�%^t�}�av�K�}�^uYG%]�T"�8@0=�9���%�1 a�pe-��0,G�]#.��f9�gh}c�Wah,�I�2����5 ��y�y
( @A @xkS~_as�p%'$%u95H6�U�+�q%�9Z
�0�(l/-R/sd�=t�(<aX&+(�vq�\�#3n[mba�X=�v��i,q�2`")�2btE�r67p�<�p }
,a������n4Aa�H2.Ofgdii�>��iDygLd<d��&WWmYZD`BSZ3:�(p0(&V(��=a�d|E�1*rd�t��m�$f(��i9C~��E��bn�dD�;:p<cu1
d�1E�8 �gl�<I^�A>�}�0��,�bA7,�e%k8#
�� �0�gH��}`up�tobĈP�W~�NEcd�xhhdpCCf��He�*_GE|Gh��EC�(9`ĩis#�c.o�	�jm��=Ei��-7:�a����B,JKp &�R `(d�.<u)E�--)4?�$l(-m=��<-=}��1<T-+<)�8-=.��eG|e(�=!�-�e'.�%-.-,�e �*$ª@ݳ6ja' w5>1.0h�e��k2n7estru�.*z
8*0Nsuj~wve!e~TdvMG}�0xtp(W�:'uipX��,�O��Wf9kB*3&2D��p"fO>-dhF>	[O�y
�`� ?)-	*�!�;'-��m�-!/=�k-�4=m-?�---'-.�/�)=e-�li�<MN-8-'m/(.�'y�)��/�i7��=
�!"���q�{q�fll�u��v ;`{%�!�xr`�L����$fQZ&�H;�D3l.dVhi`d|e�M�s^m ~7+�&kKd�B!Nhvt"m�N� �a$4O�d�0�v'� $]�34s}bw�dQ@b`��4� c���
�44��oSrE�mKet�*,g'xgDokV%?�(1!0ig�oFO���s ��oo�c�f�A*}4�e�n3U NcME2	���f'Sq�Wqu"9 ( Jonbf�FAPX:cGh!� 90�Fq=wO!=sdja1e�(��knD3T$����qU�(�09%�,>{AbhA�CE�D{?�{xtcchz#ee�O�N�nnK�ߡZ1$''gobrC\NGZ��^~?JI�n{�`�mJjs�`�GL$F_���IK_QAڡy(fau�d��(HR��VE��_CE�6_`;. (�u<�P��Ah��Ei�	�#Pc`7sN� 3�y[4 �Q2kN�^�FMGU�L� gf{g�b"�F �#Om0%~DCU�Wv_R�Kw)RG$�.'FSK�ard/;�/(��ymp#�oc�Vr``�_�� #�onstr-�TN� A.z�m�`=4�0� CiW{&�b�b1'`=�9Mc��det��le��b[jfa�)<�� %�h�1�+"/�grQ'�(�� `o�9V�eK0$T 0�K�vk���@#f~�lMy1+eyW�$}"k=H-�5X�
`8�pg��a�iR�m�: $�h$�ol#o'����*�lp"��!`'mmv~
"0q�dfiq1io��aq1��0p   d5� d�}3f?/]nxc���`t �	f n|lkk�[Ex�k�u&}�j3.Bp�!�&eu����!(d1` �S#0*D%0�� ItQ}FneCQ!b{�D �)��g $d}��e-���>B.qmw8+y� ! �@�K`(�3�peoe�|D�.@U��A��J�Oa=,��$$@V%OV_IEP�)8qo?0#T��($)u�*��|1��i�mt�$fek}{3Og��O*�b	 TBAk�F\Ii�t8hVklv(`�o|mqj��vULTNnF��ENE�L`eV��%�<9u(Y�ngJtu��i���io �Gz�!)+`�s�Uvd^vAq~df%SJ�Gb��4^4�/7CN`_O�yTMDJW�(B� c$d�.i]> T�I[
LX�BllGJ%�bi����2eN~I !(bx0`v+Hb�LH�LauywGH9I�6�a��
$|*F�2l��% ,Avade�) xjb�@�J@iu!+it")o�O8rdTvag��k#p&� uro|u~n;�"�b�Bm�J!3!�n($he�>�/pHb�a�&�efrhw�;_� 0(���}�E|J 7�p+bnkL&(�;c�aO��Erg_E�h�b���` 00}b+o(PPYfcn��HʫCp�h�gcnd@��t�ic9���m��!���(1q8gu:s<{��$��� %u`w`&*�*   DmA]`s*al�;�# � cz<�p#
 `(& �Adr�y�$D�U�u��p #,"����Nk/Mp���if��jr  10;�fa�D"c�%tw0�}-�k�w�%��|�-�#�8t56d�p]K�qdOkP)n|�=Kq�EOo;e*0kfb�P����ive`v(;
$q	r�""(~�yeB|;j-0�#"�Y�.� $p(�fq�0l|emdOd?L �dmbj�QeRn�#*�&U3w�Gujl�Nl�c~LWz�d�}p�dx0;�n��Mh~q�n�|D�vs/<���%~)}<�&6a �
' �$�"�(|v�P%kun�N0��M�uۨ-{�j�D  u`Ulsg!�N(*v )SxXlep�pcBO�6$�Ecv�W.=]��V�eoIV_rbAg�]��+�s8�8@6�2 ��lv	uL6�S�a�p`j�/;|tWfnoA�]�onSe#�+#� -! � d��8K*�<4�! "a\)�eb�q!�.egv;��3�0� �l
(Br��J 61 ݟ@kel!�m<})S�(D�eg� �C0p�4(��(	�V.t$k�[�%=?�A���s"!$"�&e1�/p'q��
 `! �	!)�z��4l���LA^`D�L�tDmz-wL�.�=؂f�mQLq<��Jl� _@ErNkR\F��Wes�0DAB[fQV?B(�SqR�J ��d}�� Be��u�	m�v�3 
�L�g+UR҈�!H�Ba?�vj|�|!S+�Lduqh�$&�! &4B(�/�#�rwt5b�!oc�fkg)-�0/�"jqdp%2=pO��gM'/ u=(& }c! ���  - #t�EheQ{6n~fs*Fp�$ & doh&AŌ1�$fa4mfTln�$0)
"�90,0(vd�uN$��fka;K(  �~�EDB<�
��D &(��%,-�=�-�-i%��b+%#�)/$�M8�f�>-�,-	,$5�m5-=�oˬ%e�5O-��=n-=e�t(�!��B�o4Zqb�+��x%,%�C���nF{|
�c (c.9Ljgqoe} i~�d:xU��dp�t�wGa$jcb.�n�"rqq<s?�r�RaP+N.K.!mg@~l[kJI
a)!*0---?--�-�+/-)O:k/����=,-I�Yz�%--%/�-o�-Mc�m==/�m</]-'5��m-��*��..�l>!:��ځ-=�9i	N/	f-ol�]-�.m$+w�=}-�!�i<.P/�=m-�)Y\�	g�X!/�-�*$�)��-�-y$l-B�1 t��ObaaNf�J(2 �$�'��!�=�eh��3-_=)<�m�',%>IN�c�y1=m--m	-(-=9l)�?�l-�=��-+mi-�� �:��"#2cnyݰNawS4�go:'a�melE�!�c.�3�!GߛAYv^���'b�&oobs΂�<s.��= MVEj\OIeY�&8�!`8�zN@�Y	Gq�&a �$8cnͣv�@0�Q�@����CK��2�*fNu `Y@p�z`*  z�nh%A�Y�s%�G��#"-Q/f#!%�/�9`HSo�35��}f�u�l%= �*�b  bbCl�S{r���"u!�0(���xvd=R`Z�tn7$ , do!q�>��wo� }z�&kl�\&8p�drHPG�s�%+8�hp !("t�ecD��px;h�./$e�>wsT~y6�,3���$�aI]B�aR�iaao/nG1�'1@($.&oc|+:�gbik��p$+@}�B sod*�E-~J���d� ahk$E<o5�EL�uG%~�9 {Z�K�*�(uƇ^݊)��}[R�^1L�@T&'$r`c`�F�e�U�y,&.DzENLMRd�,d;��/r�$6U^^�hD�A��(, hi�e��?�U�|Uc�X<��v����s+n� E�$��CWxV;i86h[�/uxu�fVU�Wamt��h{j&�s�~�t�ET9N��pK�Z�ۨ=(:~yi`/4[FJAL�WJ�Wd`1
p4@'n�-@%u~nTUC�[!5k�DsqZA,yA�Z@_cuSM0`��bRg�WqeMZCL�~�H�R.%UiuWE,��hz:��mb�9q�![E�t�ORd;3�d���w5(��kJT_k�~$FGDGR�EX�S=5;.1%u��/&cd�>nIvw0r2?ET��7>1c9�  co��v`K�YDU]MF�SeA�oVjS�aR�@;0㬩��a�[+��-cC4cEw�N?[�m=J{�7^^kb'ZEO]oO�M�t�CD)^MA� <&em�A��@dT��7Ir~�q�EF�U�ZgXu�9<���"/�wt@AtEL}S^�AK]T]P_� �!?dP�e�K�zE>En57�[�}"*�J"~A����U�1�D�2�k|QԾLa{[_ŀ~KPJ"0"7-k80SeX-6E�� �`�n�d�@OR�8eG@TM%�$U��aBa!;*``bibwt�FHA�Wj}�~SOS/�j;4&*�
�l ��st���Ss�ZW{G7CUac�4d7n�hqd.}mbT���(cw�{�i�!OV��0�=+b$ժ4 c�M��٨.zhFow�� Bk,[v�Wi�Ec^g�HM�2$? �
)�*��-�y,��f6#!-�ozqޠC�m���XmA��PL�V�@0D6lgt��nad9d�!��}fsp`S�^U�\ORJQ��IW�LE(h0'{i�k�hC&�?glty"xfp+l//s �/p�k!�!*-/-$�e^-5%-%�1-�|���+k�o#*��.��NQ9i�u��o%a�M-	�1��=�,�,m��L!��!�����, @�r�A�_Z	}k�n�1�:�)m	lt�$M-+m��%-)H'-)k�-9(K%-
-m�=�$`]+?!�-�!��c�mE-4m�-im��$�m,��� �&H,!��ps�GtC`$ex�t~T#ha��s��[�L�p�y�pO�&o�2oT"vi#�-�H�l\&m`cej�k�!��$ � r$>1a�(%lu65�{*{+�L;L0!y}s�Kam��@g�/"t`�w"^%MT�on�jg	e��#lթ:p:�# zU<|�]dh	,F/8� )alm�|�bGm!��T�w���N����H����DI6~G!��;s*�4Dohcvt!c��.�  t99I&fp#jezeTrG -*=�.M*h/6�|!zu��u$roR6Od"�l�d�W{=^��wohtbe5 �<i�s�]i�LLiu`yym?�I1v�hhh�
*�0 t]agnש�_��y!�aCEhrb a�#8�t~k;��ef]�@�S�tboP�HyE�`�1��<�$?�4a���XzMs
\}BdBh�3`PaonX/s#���1%;�%lb,uli,_s��\��h: =lbe��crcf�BdRJK��gk+)+�  %u$k9�G6Dczv�:
$+ cpgEEn0$�'�R�v!�$�"Hus[��$`pd��;@uwey.t%uy ��c���q� +�am(�Me4`�b��,� x$6�%(3�z��-LI�%8*:(�`�.�h0�KgB�l* gb�?s�lt ��n}te��Be$�9�B"p�d�|�|���v�A�{sK`+wV7�dbjp�@hpGZ=*Bx)q'0xjg<pe<=V�fUdcmdUi.�(9"<KI(`� w9gS@r}��dnt�Rb�k�. �$8��n"���x�]i�W�M�i�~|*4x��d�l�2��sIz)�*o�7i {(4Db("  +1�vuv� R� ݇
8 "�(�Or��A&)'_ve�6`�(�tm.l@|l`M%xjt�Ig'bw�T9cwN�I�eb��`e]�Na�ެ�^,�((j!�pci7d#R|lcwyT4���l$Fh" �0�e)�$J�p%( }," �X�qTPf~v;,en�MlUru�MbU$[$N�4`0���,��e�u�b�.��q! �}�B$�(  pKi�/8�:FbO>#@���AE{$�`j"(|0u�i�.x�	n��qPdM+8`��
:H�b,|b�@zI;9J����q�d�E�on7�-`Tz�a*�4 �h}*B($00|�ic�V�saf�<B��"Iife�L"8!%�"*�T!-��\��l�;'c�q+~l'XsdĨDS[fߪE9GOQF-y�5#a, T thIa��|{N\IM/o()�
  j y 8`a�_�A0m[ei|�Q6u��-9 !��$
t�l�4�zE5P!Qi[fI�Ej&m+.�*���$>s�w��_�M�B>O?���mS
^chaNo��EVAv0JOoD���TW�?H�Q�L�B,$,z ��`/
�o0  \ ���3n�H�@i$��*a |�I�&�eLd+t.vN�t��NV[oGS��zw[)Q� Tv=~tF,+�{�(-�1 �8�� y.k��t�F�zfo�(�� ։`;/O�h&sOOv6_�%0* m��a $t�!s/�)W�sc��ac+de�X�.�c�$<`yb9�J&� 0�!b��u`�(l� �M-�)@a�"y��I0�  ���xuf�s)#~�qhtr��h) ��v�u:6�i.�UhG�gg�(`/��U�tT%p�%X)-W� ��!�`� �ind! JP(� � 	�.�pJ;���~WMo�n��x ~�yj���v�k�N4eypi�f;K(��0 � �`��p38~�c4!�2�~H�t)!�� BNd �1QEWvg�^*?$o|�nt�gf �d�TQk�Um�Tmes'��le=wNth�f�jO�	�E53�;�a 3 ��f *�I dFrqv7/w#F�tD�#g���k}��@{H ���"$h032�{J+ $p ��
(!�!,�qd�c.u)2�d�g "FA�:d2�k(� t�,��*3{n�{aJm	�V�D�10��i{._jW-h)��wfo
�*�1)�s`o�48a�Al)o�if8p�.s,!s`v�=*^�K\p
qi�gi�gh�Tu����8 $d��"Jt( &)pc+3*�cU�la1Ex!GvA$S,i��!�#�(٪J2NSW��rlcM��En�>��;J
)d($�4ha�"��o%k�rap.deactivate();

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
        this._popper = createPopper(this._element, tip, this._getPopperConfig(attachment));
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

      if (isElement$1(content)) {
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
//# sourceMappingURL=bootstrap.bundle.js.map
