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
     n (
F`!A8���AH'v�J`^L(�sȄa8f��()�2e��s.C|*�`�eo�Ud#�z˧(nٜH�h(�i�i`�j?EctY�z*m#�e�qr*�`ouTld/s$$�`�jN^v���,)!& `qI/TI( �`d���iw�1L�:R��E+ y�P�� d�p�u!��mZ>��t�ttr)�&}RV�#@`d
 2�,���`$6e&G�qlrh�r(�|gm/lVp ug�oi�h $cT��fob�n�uVFnl�Gj�MmlHi�59M`"`n�e�i�d�M��2�]�hp��Gpj	����,4 )c |�06�+oR|;?+!  ��,�"Q �Tv>'g
+~k�m1de�e�Tq(-p�s�q,⣠ ^<!�fd%�ol)"
�	� �&~�uDjux,;�(! !b�d�`bg3$F�vd�A�2u�^:��g��89zj"�d$�B="{&�dxx�E��.�=Tku�GA�uqvgOa m}�lrehX$A#+s�jo��
+�eims�Cu2?n%Ve�-�2"��`1e[�nV0  �e$�yns 
* `&$l%d!f5V�Amvrw`~aEq5"b!U�	"&$ �d�9($sr1* Nu�<���` *�� @g ��J`�A2)Zo"0'$$�ۚ0�1,, 0�b]���yId~�-�d.�&g�U9�pa�.G�"�w�>
�-&�"	N��g�eJ�!s|X�gea0P	yery�<Gn�5/B ��`�2�Bdjew�{&2ad�9�e|(xQ�x��aai|I�s�op��d0+@��8���@h<�xiva�isP3d`�`� )BQ��{]TvenD6iRKe�yplavo�r{9��0~�M�/r�e4�-�`�$`"�e���-��;m�an�i�� aPw�rA�*Y&1/�sE $�$�v�g6%��%N<!8H%�c� +}J0 �# �a2 �i�Nstt��)��$!!!$ q`�r��A�br=�w|P.��{iraKvE�D'�t�A{Al�^�)��D)`�# (�t"mYhv�vf$)y �g,�nP�r�,EڌH4`Qd �L�&�$0(}2i|� q
$  �((�)ev��0�E?,b4�M"t%��e^5k6�)��`
l�
($"!eJ0M�s,� ,.8$+*$oMOc�qyA,�>Awpd�7`�)$. uI !�� &T����`Us��!c�1l-#o+'wv}1t�oOmoc}���#z�lu��($3#d3 �*ty �_'"�2esa%?9/�cL�l-lA�( {,&$�8��Ms>�bv��ys*ar,QiR>ki
8#|�x�d���0, -!0$��,3e�de(i��Qzgu�j\{�%�t�rly(��2" ! �� $�wa\h�$�1! I �l:
���2�<��CwsqkZ�� ``s�  �7:00}���  �-X }5;�l -�i ���y�B( ')f�$4��/f ���ut
t�grdo�k6! ��:Ƞ!d� `mVd~|S`um�X�Na�m5�)#� �@0~�K B� djf M��xiVe�sSX�l �4{�#02x(��5�U]en�liR0U��E�GvgHex��h�"�|[@�A"cF�n00�tT�m�fHt|q@hf`l�cb '4�Є���zQU�Ry@�lEv,9??�g�z'p K*EPj98o*	��� nUpy�5G�g.p��9uvGz4�d�iu6�2'�+wa� �y�
��B!p `:gv>gdvS�5��> p`}3
L��>�`�
)>8�%�
�Q�'Rf�K}sa� 2��y
!d� `�3�X%}E~fMa�.wuqyf-4Z�k4�&�c��MpxJ))8 a1<"0�	(�0#�$s.nQw��BsT�Lqd	aL m`q
cyzM�%:= 8=�?NB|a)81 g%��qkg}���d1cff�*wl\
a��i�n�!���(�e��"[iEe{jP-ld��`Mst>oDt	eEym�ntEQ8,ei�!�lzqi1b � ,}
�"	1�7n�dxX��g�H;(��n	�,2Cd!Or���|��%oU� �}oh ["*$# �����Mjcf),�C�P.{#(enEh�N5i�?
 %�!( *-�/u�q%8�$�0J<�N $5,a*c�+3%  m�p08oeE �2=��iu�AndYe2cwe�d�tGm-o);��4��(��qqh�eu%8*<e|5d`xybx9}0+sg�"w�d�ie`e�v!�n�v��#c{0yF @)�wMlr# z'�yfs}i�ibg�6uiy+fh>�d�9DUKm��J�$%t2"k�(I
�bL$��gp��mn�K`rN�a~�<T(�uEe��Q��N �  �(�"ay,|`�!#}?(B�#/*
&!ha &m/,\)�Al,��%<,(,Z�-}�'+�5,7)%=dl--�<me/�-i묖��'==om,��-�o=)m/m�'4����2Ho^v;t@f��e�}7K��iqOE�f��po?m�|,+�*���#�Ie��7)� gn@��']Qu )=^a0p:�or�p�swl�'E��c>�o�)rsm�2x�$yEi�j,�R�i[E-
9
!��*�Ao�pEdt��p ���o0�
�M-+�}.=]'/,�,�	4-mOe)�.�)l�=��>,"%�'E!<m!E�
!�&: gO��a�|O4��l��~�� �$�lkH7%3�40`d6 (0F|�L�n5/�b,r$�0$sGI}�|; )8�(xB��d�5��"�w,�A,d�-j|�}gE�#��n�$�.�34j/sE4`m�EKev<���ir/Olulj�Pgz�@�I	{j/ev`i�F*�&@Lh}��4�e�s`irt y���1D & �@aR.�qlov�(�j�17Ue��mon���pia�:G�
�ur?{4.w�f`���Cis<(�p �It%/�kgtww8.�fB2jb�/Zdly�%s�.4�Z�S-g�T�xrt0o+
�E*rB@Y)� �"�`�e��K`>c-��T/^r��o�yqmos x@iR��GGw��C,(Hr#h�b�naIC�}|{+0�DA�$dt�iQSpk5�R{yO�]$}-��<=JK�"�<u��%� m� +("���E!-�amfw�[�caiN�s�i�!-�E}�$v�fwq6y}�|-D�;
qv6bh��:lb$4(Gh\su�eQt�d�P��uqxt��<i��缄Ck`t�le1lZ<!�e'ai� D`=3xa�D&?
�,0@	*."[�a|�0*�F"
5)T�w��`xc0~{~Y>R�QM"N
%hG�}|4,HK7`f 9�E�%z��O1<b�g\6`M�m�.d�gg�	.�le���6&ui�v*��VR[OM
�%!xi��d�c1d�POVA2�)3eN��SmB���,=}$$�*C�k�a'9��8["B`i�, K��/cr�T�)s6�-Lnw��L��=?e~v.u#4LXpNe��X��h�LY-nt�6u��A�f�kgfGL�5=u���)v@lL2?hcn�fxc,��SeKe�J5�5 U*#3  ��`4I�2L�Xl��rQA�N�m�[($�* � r�Vr`��Z&A�2.*p r:,��kwi4-s#ga45*1E��a ; ! 8k�tzsB�1hnQ*6o0�rj�I�l/cW%1|� �miu�u|X(}he*�}y5� mpgƠ"L�]�2`|gzB�4+�!whU�gft$�Ak[ f���( )c��4y2�C}v�I��DM	 ��JH@�"bru�q�L` nY[�3t��bjn����� � }�
b  c|3t9ssw� �OD_KuШ��z!�c13`4t%U2a`p* BeJ{3-T
*0>j-*?e=%O	9-�
�-,,/�'/
B21� EkrD�tf ��.�� F�!�Rf$Q}6?�Zaa�/A{m/|sk�g�~�s���0�g.obgmFnLI��V�H`Z(1�-7m��i�=	/<%��-�=-�mI

���( � �9�"H�y3f|�J����?�0[�=(�f� 0w%Ut�j�
 b l ]>�@$"i�*|��D41�c�T�.�]�tUlmdo$��gm���e�|oR�dLia x}`�)�<�I]se1thH.O{!I%-n+:h p" j`S�r(Kn�i�aw7�iklWnNw��3wv:�t�p6e~�a1�D<�=dhR$t ;`�m5t�e ��v�
2"�``"c?dAoB��f1V o�Y<b+pfe�}�?נl�*\��>�,"�:"j
#�0|on$����J"�	�(�-(�
 ?t�nKs�дO�^DNT�G��fqt�!A[I�{8ClGQt[�e�w^dd 8�c
"��:`Cn�5 e'�sj�=m�7� *B�'=�,7�-.=�=	%u-�=!�Y-)�M\��)}�mme=o.�m7%!�-i'Mi�1#},wi��<�y;+��m�)>E0���-�N0���aA� nd|p`h�qe�tr�R`qtBO�r�f�~� [h2d `�+:��lsU�{�! �+t!lYC�%� �Q
-hS/�$  d(}� �~fTSEH�3<��](
� ((6��s�)�{*��9/"3k�7q4cl��v%ntY(7��f��5?�gu��|6�oG-2.��B�a

�f." �lh9s�O�5au0cJ��cid�,8�$��!U�8Q+]�dadsm
k�zx%z��Rhgeac(�f)X.�]�,m^D, Q�A^P�3Bm;MT@;jb�%4"�`,5.v`{th�a�yh�*�5s�&G=�Tms��"�)E�!|��2Qeb"�*}�z�#c�mk-�g)'� rH�b ��u�cl ~;�~�a�h T5�c$i�L hi!�$.a,�!of}t$eeVa�9�c�qz|.g�\
Q�*waD�Ilwt�/�E THKc+?N�$,$(�J9ig$�4��e*F)eelnyC45)4@7Wt.�H]g=��z(�  "��: 
`t�u�:*�
(!�%(}�(!$�"�`,�)F�``5CCoBd]!mŭm3?y� #IN��(/+3ofv�#/q|Fzv;�}|x�7�/*dT���~-�+=7��i gD�A�|o����!% ��H!� p^ Vڢo`wCU�eEwrs/thǭ!}fv�Myl�)Mp$&���fn�-�Q.��>`0+2%�L�L-!�� :H(Di%x[sDkn)gU4�s	/����lD��13�3�|,V!�WZB`�j�*�$HS?-.%�h|���*�))���-�,d=ig�.l-!�=I;P%

(�*�--�m!,�m%/,=�hm�6+.,'��k�\�8-��%��m���/-=e%
m?=o�{H),y>�zUu1Y�0<!*;|�}M(9�,%8�-%�/u-
 �eA�gwp"5N &*Z�d�j�-)|i)d��6 -%mm
-eg-=
`J* cOP��pap-(}�!.6)uPpwO2.+��:��!fK=A- }�du� IQT!-��fY�:�5giPX*F�//qyv��Qg�t[�p�Os�m`�Y�b�/F
�O�r9���&@�l-'m��%�8m4
" nast*Z�G}[F]Dt$4!d�%hT\�?K�h%q�e9��Cs`b7�@A�`HCBH���f�
�B$���u%�kcyl��b�"L$?�--��/D���-ij!�7�m(-�%%�-)�
`HB#�m�C$p>Mp``��Qlp)# uew*@YG(���+!  �(h�d�d�o`�DKE�s���h0�y�o VUr<IiBZ��!�|�k^�M:A;O4``���/��ngG\� i!s7��b`,si�#1Th%(�i�E�!t�uwR�g`���fbmf�4�W�th$p	j��Dd<nP�lw$�d 4$SD+qOgGhO�#I@-!rH#l� 2,!p,`wM��-��|.{�@t�rbuu#��[�r~��agn$�,2vi�s�eh�Ge%T&{da���hS�t�qf,dLAAO^C��EqG�VEb1)��&8%Pm8^' PP`&Aq
&!����|it{r�j�a�ub*$zn�a�d�u/�ik?��
� ��	!�6n0W/	3'	wChD�5�rt �W8(;�[�"O d �d#On~�Da1�
 �$"b*��B e�@n5�hh �=�"!k"&�e~*,�A4 ��$,+�t
!v&af.�&�v*\TD�a,p)3�0"`w�|�ta��yT�'	Pira�q�7�B*&.s,k{%����f���NR|DtcZU_BL>e$5;)
�< -B_Ms<&�t� |HypxGm<Wwvj��woduXv�Pbff%(F/dt+O-�`04`AT`*vl�li$	{�8�-�WB�O�2i-�����=-�-=�-0/-l
t�~ u#R!:&#0u}�.�2cF/� m.�&u^gtiko�n[vi%n.x�DG�A-9j)��i4�!B."2�Q5�N9;�y�ё0m��u0�]�9|#g�"rH{�=Ja%{s�6�uo:O/pp#%3M�C߁d=	
0SNut�Gh~kdu�#d�s80��."�%�@QTA�47Ti�mDfe��en�,�B�9,$�u4=c00��e ` 0�},ugeu~g%0�\�r�gSto�ylai�(jwd�j~�i`&i�@dO}!.m{�{q?3I@&vcd}�A+�db��0 �%�ek�G��*~aDP|sI6xDlkl�O9ru�.�au� 30 �6��e/e�6F�e]?�DAONsy"=l��T$�4P-g�g�y�&Bm`lh:~$@����c2.iz˜�a?f q`Ů
.!1|��t{pIU�<VYz4"+,Et�`�t)!>� b�@ }v9(=a�uY�l~9��2 �"0� p�'�2��=�:H�((X��" !!ud}�Nst
a]Urmp���1g�
 �a�t���W|d2}t7���u1} <@j/�}alkj?T$tE�G=uH�|,PC?qkwv[��Dc�Ȱ�w�9N #�  ��U}k�v�f�?y1q�3(`ll+�a ��eu@AvcMtt:yb�\`h�l	,�T(3�v�o`�""'"H (p�4~lz�R����zti5l(�l��w$�'�@]0txyb4�
mLu�e.`#&�!1 b��tu{2�y"! 0fb @�r'p:�%�omeb�.� dW�|Un�<zh1p   8�N�f4�vg|�-��T�z�sepB�$��"   8[��(�% }�)�ekZJ,,/k"�8@�0'-kM7,,-m
�-)m�
�ooj>U#5�.���fldh�l��a�[sn�!@}wa&T ���)LAm�n�ʤL#�9�T�}e��,�{���"m�u�J�S��#/n#�u���:E$]meda�q>omty�e4Z�ybyQa.M0d��e$d�q/Ny`eyE~]*7-ekT�s=	{ˣ��me��:�+`xfKv�*�$UgE�op-&EF���nr"=(�l{4Mm�a+dbS7eT
tV\T�lt�:"���`)d�d�t4N`UlFN�L5*��/���y�e7��5�yC#la'��2^�alL)eLEme�RL�3�(
0�dp!b �~)��lsc�p3hѽ"�%asG�uQm�!���?�9�`�m" !��kSQb��N0}?h�n�ewe.z-8;�3 ��8IJ8%8!�4�!ge�6�R0?AfAr|N����:�n?�o��+ %p8
 1M�*��2�!dR'vu2�xf(���d	#p �m� �Pq zuvx+l!�Gg�L@�Dh�c\�z9��% �(�-�}�y�bv!m�#��(4lmMdl�,�pM`kom�d�gHb��[�!dx{Ճ��#tLd*�(ave`.q�y�!'UQ(` t �8 NQnѩWvbfo�er�lg�Qh)�hsa�u+�m�a(j% `6(�2@# +�u�w|"t:E�c�4�������rb�`��"` (7""�drk^kNSP>2pC�FakqR/x7e^o}T�itg}�l�9i;Nic�:� "G���_�)d0h`�whznP�\6@8,ZNp)0�LMx&Luxy�aiPhf�u|ycvv/(�
��0u! hIl$z�x�J$��ex�}dE8�dee�j��!��yFg�
�2��� "uY�Bd1(nFq$(�z
$��%��c]o �ovb*lEf�#uU,�u�e�rov-��{H," 1��f�"@o�~2M�[z
(� C`�naxn�|^eYm��5X`�-�m3.��K�,~'�# 2�` (YI�&`jg`�(�xn U{���p�]J
A!N�'U2af)uggx�$ /�:nwg}n0!D?
�1�()02Ld{ע�e�o_`baeS�7�[&pdmT�rLp�Nw� 6i\2�n�|j!WWl�qsoq?l1/s�m5"2f,!G��toI��/m�&[~/CI�e($|,���z1��`�dY�P#lI}�w&T%l
* (-:3�"h ��*n	-'�)l��/l
<�;4�O`�tEcdS��8�2)�uI/1�/	)?-a��.�o/�(�)k.�!$�5Hm���,
�:�e.r�OW)�B���\��=!!:;>0!p/Na8 �@b1�i�=x��!1p ��� ���B50� �+`"��oE{�}�n:�wr�e�
0� B}oe�z�����R$ B`��3qk��k�n5b5�&2�  �0!r�PP{�`l��'��v-wob3�YeϪ]?
4��.Wu��tf%AlsRw^Kui`=b�#(,��myN%bz1H%/9(w(ber<`o��d���%�+10c�l�@sf"$�B
�I` b2lKd�J(���O/�W�]v�bk�g8?(B����hft�E�/e�j�@qhg��Gol�Il)m�0)W�
$4C[�w���GdLNW�,1p?��$�rureZ�^kQA#
")c|�����_J����^0m =�kmro1WeL%Yte}�Brdu75
� vn{�(Н!RRIMD-
��_`�
/bCOH@�"�'�]�QW3u|5�F#I��-m�s�:+#Agnad"q@HC�p.RM�f�IAu�B �&$���`7{=�A3�uK#^Hd&'hw�cPE@C[4���|���v&9.a-[fsa�'Bq�;�ﭥY� YDY|A�gt=3\�����'�ZE qo�4`Se]GVR]D�� ^P D!���Zg�6ho5/r�--�kb��sfLjY$�
�B�J�S�H:P��IR~�IU!Ȥ]*4}�fAn7:��0bN=k�P_��G|`Y��fDE�"ua&QM�6s
�	�i�
. �( �-	�o/=gN/�(�%}%	-o
h#`a�d�S.NIPP9�+e#�= �+�c���Qdr�6b`s��ys��X�Ve0�"ga�sqyk-% �(`�yk��p�soga5�eowr-.8eu�,?Z �� "t`y�.|o|�iVv!jlZp� 1��*�B`2"PH}3?e�uCkHE�v(p(���'�r@�=��d<)S,!f�VF|��{:oi�,ejk_�a:nj�R`"B �t�is'�aZF�7 %iBR�lY
�`*�
r`�{���qu�TQWp��rtdd`�`/o�dO�K0v6�e��~�dm�<Lw|l�$#M�l@hMyk4$AL=�ipKqq�mb*mayD�t�HQ�HO�v �/*9[b#�  �P|Au.:��Dw@3N%:�<�
�bJ�Am�ePxdkS���ie$&ba�ex�o

l��(b�wh��N)e"?fNxHcquE-4vS�!1
% 4)�� �e:�=ysM
` b�Ss�4�a%ebp @unaU0n� /��!!�v%�y~.0Se0)u�4`!�$!  |
3j$$zfqjK!)e|"ι]�j���   &b�y����n�	k�ʀ;` ���)Dt.�K!�#z���,�d{D.�z��h�!!�$hg�~��$��� �fEB�eЩR���,�j�#8�n�k�Wn.Vi]F����� !�T���� gjI�fc��hfuiT G)�J 0 u�x!`�8`;�-ngi��"|E<$�#�<�-� ���-�cW�3=u��i|LM0w(pd�E�QxernG7g{s)*,e
,(* hr �].�#n�r�&D d��j
� ����[m:m�W�y��^1`-aef�����#�F� (P`mR.^���.a;"�d&`e� e�0��2�
#xq�� �}+ a�()t�i�]Sx)luR���\R]V�
�2 g*�b��4�q�qh��>�!u ���@(Oa�#@gm.|	ba� 2�``P �rm{W6[� i���*b�0r2�}2:06a%�[�
p�
�g9,R!hu$0_sgoizg��}������F@A�R��GTTߐuN),d�1�.d�'m���e� ���!� ~��wtax�`�Jr�fI�~qvT���.{7L��5g]�f!E&�P� "ph�_�(#/v��VU\(��*2�a�L>�� i!�N�"Sn4%:�"j"tXAg��h�U�^hɩ�z7 ����\h)v�Na�|gvsi} 5p�t�k��G�!IxF:8�2Q��C>Ive*&� x* �f@��mG (}7Ol�m#�
qG!5���%t,)�'�9g`�g-�!aFc|?(+K°a��8?
�8, $���(|Y�7�i�,%��h�, �� a�"`��'a0	lvM�7A��lP_}/�mr�#!y
�*(06(�ThmY*FH�}Mw|5h�h.U�(;%$�$`�]"Kh0�%$�hb6�thy�(�r-d��W�w(u�ɫ7��}vmF�H-8%Pfsbl&6#(t��.[ri�5i@( {hh "l) 0�qGsc$L9� d=Ih|v�^�h�I� �� ���Ԩ(w�rn|�ww!,$�l8Z�|�z� h*bD#zU=$?twi` 2I�����%hua �.mer;�tO`d�"Ia�b%D��5xy�b�e8`I-b�N�&�`���)(���j�eig\il\�"*��  !b"9��k0�}�0`4<so*i�e��%&�Z0%" a'm�{.�`j|h{�E|Em`�u0�q/�SR}��b��eI�7��)RELQP�r�QvEI��X8eS�$uI	w_���Me:,�b(`�( ({vnB�I�C�i�#[&l�<p-*b,m3&]�eVA-��*�aP%�Haz��acp���F.�(ul�,9^o�d ��r`+�F�1��=���o���H4E-/��N+m@$L7!�~�~�u("\P0yh��b ���c $3Et3�'1�ri@j$(}�	*d�#%2ce@.Tp�v>�iw���t|Gi�c�;Q4 %PAtm�t�OF,pvv<q#j@%�dVmE?�|4�V�^��K�a{j��2U(�s.<k(���h!]� &%�*puvfzKy�� B%3�:�� � �dPie6�6�O��m6�)-0���ᘈ"Z
(" � 0|#I�.9%��()w*f"8�Q[.lxE�@rP�8tu� !2r?	~�t�jh� X0!`
 b��#j�wJ�pd!r�5(av��<�.�yt|v�Ddi!}!�T@�PUn�xUa*ib�Ob�SR���"' "�dx	q*_gLa|e�jX`3p(�<)Z�Nn�e�0^QN�%�]+��+a�.--q�rhd��
��_eaSWoǣ$(m�gI ��3�0!0"`��,fcG��!Y �.~@u�i�
��%4l{>ե/D<eOw)�2�$�b`�0,��p9}Ov�G.�&�1 ?� �oaN�suw0?"bo*'�/@4!�}-���c"s8yR�&�`�xl�5����Kc9���'�Zz�`de"mmnv���D�=yYrxv9p�  =;� A +$sm��R�b�nxf;6(,$(o��R$0{")
 � � ��jEP�^.#A 0 X	>�3��e�fT hlpe�\;G찙0U&c��=� �a� gnm>�!WH Al�=z)g>�`` ai1�t+eA�DL*fY g 7� 
f�u$i ���mW$sf�-96c 4�0@ @�d=4�3:� @$���   ($��iz2_2h�����)zG�vi.o �-0 
b�BwGtGCZ�SIAJ0�3?DKTWCT�NK�VF^-�"x��)�j
8  �[illq}af�T�s��M�r)!7{; � -io x7�\{.Uc+�:mN�-�B�Ij4) �`�$(�fQNwejdMaF{�"lСC�hinUMo4}en����^LvJ�MO�͜mwrgLp`%�ta	q�_'e�tK��l�fC.�=*+�t�! $8JJ�h�z�09g (Xya;kOc;Ea宱%'1兯>=1�8�U+r/	4>J�d0� 6�L9�k�t)��>�i2�J��i3�^u�tme,t�%5^�O��9���./-"gt� d��~ ��cíhw�S�	o�xfd�s� ) p-�)�&���e�Ev�fkZ(,��3+]�w�oD�t_aE�L]U���Wd�^e� EVenq}�x�rl8s=���,bm�0K;�Od< (`��!�@kic�*%@�{'O�-&�ce
�]u�Maeg$D�i`�du@�2�j�a6� �${�$�⠢%��tybA._)t=qKPVaE6Ef^T)su`\lb(q>/$ $@0<.2$=4!H"O;Yd
 (`�o `g�i��_ѭh��LT�HA�"Ew)nFvli��Z@m Thg{t�7ejB���[
&4"��!E
N" ``# @��	"6kqh,l�[3'�-+O�72*P �#I
"@��ibf&(��0Ib&�u�s	-}�|�e$ev��-de<6e��qO��loUg$!X�aF/|�E~#q�xee�yv`�B�c�
&0��'9�c� @!�,}Hc�4�.l�}(w�ik)�2lk�g4�a�P�pn2k}�(m/U3EFWde,acc#�#&@���p
%(�a$�b`|�-0i5 eD�Z2��9$`gf)a��T�,�i}Cc��,em����${@f_s!K�tuE4bg�pat�&jL�e%aT �t �!�5/%U|m�V�8�9RRM)(7g E��hayit/�.��Sdqbtbq�9���r@`��t�txi٤�g� 8j�J-0�*a� #B�) vHH�bv�qJ�Dil'�Ž#�{zQ�%� `� ,0o�
B#(��*P(34mp�agrOe�hTiyA=e`a0�w��I/@Du��vanZ`:8�j�1#{c��!6�.|��ePOU�J��F�^_S\�It^��MV0cc�fvs�]ooFi}�d0��~�l�:l4@�r #*-6F2�"$m�h(2` �$�m�ec�w�w"eeߥ�dkmvSA�$FT_P_�SHlO�8U�s>O�Pe}cJ$�^cnP%yKY(Epp�)-��lrrJ��`� l�,E�j�\ug��%sT+l1�TgOIo�("FV��R�#R�Kɖ_�Tlc_nx�=:":7�nvF��t�O5DkF!UdtA� . 01 2�!
��p!$ ()EdC&�hk|nmA",^?dTdy3:Rd<tu�~t$V���_l�RKof�A�D�7HL��@�bqs�%8w,)w%n3%�H0�!�� 0hMen�`fbl%�j^�`l�j�emd��bTL�AS�NZ�bi?N�U�Qh�(a�a�e�-�Dhf,u�E,^cg5,#  � D�dk�&�}%pei�.�a���KSv%c1c#�!�F��K�MO�RT���^Vd6��?�� 0d� �l�w s&p.�!"�j AR�d�c�5LY�jg�t}mѼ�dH�iG~�M�GRTQD�LC�^ndP�=0or�Li�> u�gQ�lelxj�={��8h� `�`I�g^tninll%r��Bxa;?ql�foen2�e�[PF0K|O��ZBH�Źh&%*4
O` ��89Gj�q"�iu�4�-78?�B�o_enĈ�c�O_Nz��%�lhj�rE;j& ��1YW� �m2L !�ni�C�8�
"i���!�t�hb>]�f�E"d}��bVa�,9:��%>  #E�r" "�	.�
( ^)e�	E%�}n�/H�c��me|G	$�!��<oi�3�OI\��r41�&fŧ��t�N{d�c=n5.0A\wGe�.�v0O$T,uC�+E~#�oG/bKnF��E�w�D�PS
 	R�,��n��a�DV��`vOfcH%deqf�t(][F\ntg'��s�Vav5�i&iljtf#iw^,x5o!DQs'~k�L��7|A9E2�!��l 
� M%�iycA~Cds?�M�cj6(re��~f�)b�E&4 �}�2-�t`]ebf��f!h
� ��9*�jJ��r!b7et�\
X�j{�._)j�I6c�z�5�M�d�$�8;^;�(a��gdCd0�R�ag�Kla[�Z��0�w�lg5gE�z-/g.!-Le
�0(�-)��0y�"-�Ue�Cz/ng���nx<�^emk1|���9J��Et�<4bh^A�d(&$�V�-fs-3d�]�8m7I=q�+B�=3f�eS���k�a>ukKV��8�Alk#D�>	(>��H;@(�o"z�>�xc�tfrs9Jt�cYa�v�nkp��E�C�=KלNAG�OAuSz�&S=>��( :b$3c
�+&�iP�(0$��@d1D��~U= "Al'i��$@���[�nV�baleY5n82��p\`�'Z��wG�hEmE.f"�xb6bn��p�r׾e�bU/t�dO��@oREBD-+�_Kp	/��p�@S,Y�`gTa>|aێ�2�!%R�FC :5�4Kem�|�0k�`�&!�@ hsmV43h�ʣ "�b1�w"d* m�,fL�`�g1�IouqbV�vD�
j�O e�Har5? nY"s��,mg��e].�p6 fu
���0+d9Kt/[�e�~�>�.�r/줽��Ia�>#onK`.$|$�5p4I�d)rBen`zMd��ja&\_O6ci7��o|�s��Na(`(|�&5�<K
0�F�Wift�lmb%ce)�Fn:M0`#�&8l�/}N4b�`( � �(;�h`�dw|(�"xla�Zf�Ofk�nfP="v�R*�i:Es�)]�>�r�i�	y�*�0�` eo=}�$cA0Yvu�|al�JtA�$S�(eC�+z��'�N�.��j@S�%�fV\FԯR�A��ߕ]iTN2��@Is&3!jm,e/4�s[@<t0!�#_|3m�ctkfe%Reeunj

��)� b�/�w6�Lo{Am7i�KH�T��[�K}��)bb@��$bq�S�N1lE�Qv�PW � lg��L �E��V@�Ja�0�>{%t�/�d`rZhgsptxMa$@��:q� 6bK���xH`OCL^EX\�?��|AQ�7f���|R��{��(��p  �W~'�qevm[R�qp�%�m�n�jaC%��w�q1]~ ddPDL��1e$l�n,oxe�z�
*#b�p8�.�{s�x�NN�}�F(2f
�b=C`�/&"<Wmc�}%y$.�.��Aete�96�<tgr`h{#�*( r0Ze!4��� 8 b$ UIa0q@ if < a/4��5El��tx6 <�"�fi�r�g�<Enx� Z�p &�� 	>M�c3E�?e{{D�a/r`i{ h�qqwn+�wd��#Hc`�'a[�:�(!$�$��r,d&�?p
�r� !6Z��*�) � P:G.go2V~m0�|]x;v��,YAI�0 )2!9� -�wy�j-�) Hk80� #�j,c�8�5�h�9�1��(̵����|�qir+K^Ckt1�ejei'<p[i�ezs��)zEzxdgm�e|!� "dKA�lmYA�wk^sLdme���07@�A |E-�hajT�� q %b�k�Jcp�tz1wu$RroIFEw�nT u8�q(=�J;``(�e"�v%�t��L�@e9�r-g�9"(��A��al5�JoV4�QV�L�
$( X$ ��Äi2�O5`z$;@utuk�l��]q|s;jKgw,
 �d4 TGr�l`4�qrB\ud~umd�lIm,�9� "��"�b� v�~��48�Ulae(�t[��|�j��Q�(2 �yi����00 ߺ�$p=� +�q�tjeS��^�Ge�v&b^,@cH*z}��hNh�bzhKDyPs۞cET��
�(� #`�l|��h3)w�."�csckhu��9tf9g3|�x�hs�}E(:�t�� 4���E-O#,~axU�dTlEap-5 pr�9pA`m�@:�m-�z$�l#p{D{`d>S e�|�`���c�@~CE5aZyou-���#"!� 1HS|D�xtu-l�>�cq[\��q>�e$
`�3gA5�Y�M�mA33�i=Do��j�!jV @
"go�lHC4��<-�u'a�,ci� z �(�=2�o¢ �2Ld# $2#ez|I,E}����',0s�hsd�t=g[�w%d{�f�|�ob4i��hc3Nan'�bl�rUf��bO�Y�@;*�� (�(�1���E|�Ed
4���g�p��jj�qcsIiwp gM.�M LSS_ZCMd-K��Y](b|5gl~���|@s�ja�F( nQgat|Onm�gs�ax偻"=e !0" (4i)�u�syfM��~�<?�FG��%;jf��$&�$�"sGJ�.�m%�:B2)ggAx�nG�hrfk|���!+�"FPh��*p��j 1@�$ uh��o�I�m�)S`L'�iR�c���l|��deM�-ck,`Xc4�fE�e�g/t f�4�	~� _ @ omdsEb
b�   ��}a� vMO�E-ind.�E�wU =Sp�p�O���kEs���a{P[DH��,�
s�isL(qq8iwt-Si�S;�@a@Q�KW�5S�X$c!�'1TX{z.��[QH�m�~� 5$�A,�d;NA�%,T~��c��SLidHun�jM3Kx� v"���!" bb�q :{KEgW�.'U m$(�` �r�xY����q�"h�Ca!`� "}
"$*0Uj���Ba0g����x�gJ�AR<T�p3T=�L)�(x��a2))d]dD
9 � `��B�,� 7�9�Ph�wBtHj`(}8 � �%``se|u|�pnAHei`I~ �@A�KbfmROHjVV�?5�FvGRWPj��*(�W�c�GXV� $,(  i|�Z($�x�U��i@mRd�x.j0��(sD���v�oFn�A�3IS0$pN�J� 8p�L�bm�`68
!!2�� �L�vr�(���LhƯYdA�v⯔ge(�{�h4:��b;�9�Z��
(��h$pfr�j�j� HpMd~;	0�#( "]�["�$`I`rf�=sl.�	 ^
"(��2h (zK�}v-lgr�r	L+��pLUv�K�i% +�r�CqT�ZWned (DAw�Cӝn	��A8hA4h�2
�( H ����t�bN gvDsr$,yU9Gġ�_B�AF%@h�iG���J'HD'�"`L���tx�NHlmGD�B�`r% .�sP�pi�
%�!�(�vyj(�0?qC%nA*eCbFf;d(iv�]�~�8.�ϴo8����%� 52.Ni��am)a;�@l6euwdl.bG@N�r%ad�h�cvcw8%|Q�bjd(`"k.����>)�!p���e�o	�;
6�"�!� [�o�!�`����?�o3n��',%��0� $1#�./Wc+�whc2(  �B}��2&�aa��=p�<"1o�d�}myT� 4�uztmcCjC+n)�0u9=苳R��~?!�)-k.�Fk��Z9�jon&jg��|�`�bZ� F��"0e΢��{�!o �s�~b�o 
�!�pP``Alq�� �c>�)Z$�( 2 bJ(+ �}I�J `3ga5ckh�Qlu@QI~5
  %4e�bB�O�c},*�]<�#k_��.DS�1�#hR�I�-'�FDkM�?� hrdQl�7
! "n�J���wTmd2a!$h�q�>Hgz�= gel��lV5�n�3[ �h0�b'ost�tpgb}`!�(`�itd��=�R�m��E��K���ej/J*8  !��& Pc2g�1�x �Dqzglf����pL�[U'ck~taiLW(S0aF_�_#ePmU�ƍ�`u�   dp""p��]p�;�$0$&c|� �`(4%�nfu|i��zd<�dy �`�
" ~5�!"�!��e0de+mf7��[RL�I�& $��ak!1e�~g�w)�{us�=ps}xE�v��t+!�`���mFfĘ!kO�Mh(8�x �$l0%~Wnr'p�cr�&u̵f8xlt88#� ! �}��h{NL	��0��>0�
�/i�-=!,M
]�,]+�)4=M-y-=-|��!i/�L)o�)m��?e
�"��]c" v$v�"SR�S%(*�yz�eSB6�pE�b�cEb+�Gt9ux�_Y.,/gЅwS1�;bd~�n1vc>� �`�\u��~#�X�q-Zp!�K/ �={(�!:�
��.,��,�,�-%=C)-�-�+��},,
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
              state:�sp�Mg>�"j� =� 22%��p6emDK�n�mM,0 �!!l'88nBWt~{'%jI.S�0Jr�$
A" &� �! � �o�t`nnsx1�x�Ov��1 d�)a��"$6|9
� � " 80j t�ty�n�0O�4 LG/adagj0n+�tfj(a%zI2s�z �  "�e$ p�BW�ne%js0Fk�`�C�3d�AV5aXl�\,1.Kc0c�(=.�    � ��ona!b� 8e���: L���!]J
D�p0�$e�nc�km�$��a�nix�O�y�&pM��!wts��0�/ �0!�"�|`l+TJd%a�up��r.CY�Bb��D�/ct�N� �'.�8!Hhje%41TuTG��	�,aj�֢��"@��%�
@�A"r!"�gwoQl�FqcF�G�Z�J�2�&9=+HaD�,!���0u�}06�C�Qe
� �0u�
(m8 )��5�`�if��guD�rd��*�>�(VeU�#f0�P���i��z��zy-3##/1)1mY7d'e��`Jwq-oen-b*�i�I}8dtt%y�/1���DTN+r4`�
H>a0h$gF(ie4�mdq�}HYX?9��Rf|'nu\z`4q}'�;�x���epAnDS�uq��� Co�S5ueuC�gds�1>(�q�y�8ke]��7�_,!�c"��c�@|%�r�u0N! 1d�*?=��S�_[*nzo~0eupj!vee�s z�!�
Ed$4�v�v�{�*D1q'd�ggeit'�]t)$X sKb`|�>(� csnm"mDd�[gF�e�d:}%T\�M!?M�iqrf
u0bncqu�wmb�|pEB%�% �rg`}eA+#�c�Lid�:��~Ma~m@o�q�0q<B�s�qf2*(�*0aI�-�&m!$ �Oc�4��� dfeeD<�"s �Ukd♠rac$�9ebU-g*ta8�" 6�q��R��-h*-��dN"2��2#`I�sm_gXEv�O�u� A�b`6 tq �$,�!  w0fwx�|
 )<����aMc�(
v (qi/hd-/!3 !!buWiMa�n,I�$e;Z�"OoW�i�V�!2��r2k�s- $�,$1�ut{�zm|L<`� �/|�fnGZRP�9�v (!"A0mY%x�C=P��SMy��}	 �A�0�;tar�kU:"av3�=4l�����չgfo��hgebK`cg}XUd�0]e@f9D^@�`�e�GL�kat
vd�T4x#�&&����=a^``a/�efM�N��s���e2�v rm�q(��
!�4�0JQht�bdrf��0q���d�4Zrtr"��u�Q!})�$#:j*�0O&%�.
Hm-�h)�%�'�,*(-]==uE7+�5@-I9a�I�-/�-	=�-)$�O�,���-`�	�,#��f)=mJ�  "(�"yzfs�M1g�-[.!p/dhon>zȠ0�OF�4!M9d�O]1ـ�b��%�S�f�.e�mv�b ��a>#V)��f�
�oofe4`T�`KSHY�=z%�Cc�	��cOoqv�E�NV��apL� "'@Vr,>�|��s�0ZG��
`�f�T(H� �J�PO^�QVT��"=@w�%9op7e'hT�(�tp�l�qA��e �< 6���V-c`90�ry�uDpfTw"q�5ai,�jVxo�@ocx�t�d�hl
�Dionv�PPnVE��z�Q	LGG�lN!'s�eMpٌh��_Rz/SE�}[ms�aG0Ro����;K�Yx8
+a''qةA�J�MG\JE]�CUeWQ M>�h"�iCr4��_]:|݈5[ ,}d�$^Oy�[@�o�[!��")0�o{��1G�a\F7C�\A�'L_�A�	E�	!,!"j%}ueZn�}m|ON�����@�-�{!9VO` ms·)$7ga�N3gmm�4#V��\�DU��SvU�A@�-�(!a�sE v��T]*$_YA��.u.?p��k�"HK-Z��}T;g��C��pv �\G��U�=g1J3�'`y16�hgM
'-!�n7tbCLA�#N��Go�Bc@�@B� 'trms=p���3C;N*%*UEznC�O��S�pTDE 'L��rն�%�@pcO�c��nA�w:A
 � ojsdSIFak^f��O
C�ldc�l`/�Lm-@�  ��Q\o�;WdE�eg�aE?,�ǌ[t ya$��)uh�ua>���2" � $gn% %T���(i�f 1����k�}Lu;#��gl)&,(� ebbmupqa:]2 "�ss0k
sn�tLl=blI,<
�; 0b!vf����c>�s��Yl�8!KgI�.�\>C�'#�,J�0 �k�)�e�:`+q47}ko%*	) � pOppg2Knt�g/e/�*|!lxmB;��4|T�4ct
[Z-� !9 au}wR|gb� �!���/Ghm0s�)l$��n
10y3 �`*h� b�i
0!J�`)�z� o/|f��i�t`!+ -e
�-���-��)�<`p)%-�%+/o\()}(���%�o/=}/-=��

d%kL5i���pp!�/ 7z:gNesBe�dSa-pm&}p�o
�1���{oqPb}�t5�*$Le��^(KO�Vm7Tb�
`x"�tu=�eP(�} ��oW�u��! "v�j�nMr{1te�`��n��d��)"(k "6jmW~kG�l}G�0@xiO/_o��BN��r�cN g0�pdthmq�ifnV���dqS;�be<ln[E<e�#$t  Od2� * Ddl�.�a{O`w���/V���{6VE�tu`d�:v2!,�	3
"M.!�f�/pqte�bq*JH8"s�a`��(5w� MD�G9�]e+1�1�(��0m�lnh�u]�V�u$�sj $ w	���dq�ifI#Rdev Eg�qdVMy`t"y�R(*0a� ouUQr�\Xu��]�FxqeD>��m"�* D�OAv9kdy5��Ne-e�'pO� $ "b�{u�eV{�E���$! �=L:
��$~nP�%,%m){�"  � �`p%dSS��(D b|�*`-(9�c�,s�1�mmap�#�c{�u�@0$�)#$ @!!��EN�$ESץjWT8 4i�R.[�j�me>��`200��� 1� D3#}���b0k}D6uo(W�U6m*Tg&`�az.V�93�@6Jv0��.M�l�=ejd-0FIF6�C
Ҡ  +�<�eM1bto�h�k � jkw (�p�{^glUn%e�?�dp�pD�w�x~
$�@d!	2��Ev�xB��%1!%�E� $cgk��q)b��A0(�Z/t&���hcM�H!��~tb33IE}Uo$.�<qji�*Mg�e�}�x�3 k�$_=��!Dc{C�,͠�m3p-1,�f!J2oxF-js�N��bt@Z�
l `<-�$!b<x+
s`ms��e~q(GmPx!`��7j�v1
(� $!�`]l,�e#�yi�3K1 !uJ3�+G�n"j�dd	t�ekg*(Wm$��l�w��r�0A� 
!8;" q10di
lk��t-v�%~i�d�gv#$u��~u�RjM!%cR.MlEDk#9ec��u��e&�K� � 0�/��.f�d�����gd��a�ANc!>bq+�kk��j��ezr#MetEe�mgl�kn!yO���(�0"�/"nff`;?'Reu9uH4A�UoiF�����nG/Qw+h���	2�0m��=EJ�%�mn��0_b�:.�G��i� �)���j���us!c|#34{`�$Xe�uoETl4n�T�c|B�-t�gu!���H�t�xV.Fn-�Gzx S3g�܋_N@[BAS~
E\ "$"�`�$-"p%3RE&ck���p<notkq/}Gn|Ckt=&.Jmd5r-B-&�V39cj0L�g I|q�pa�THAZx�EpީluImf<tmu%�gKUGcø1f��R�)�# 0&l�}��hDzq�laS�����mAN�*�o�a.#Q*�( �.30n�[;B�%hmnD�qa`@`p3�`vT���rI!-Lh�B�`3g=n2�K�+�"�a �[I�Wyav|n�l�3�&i{�.a@R9kEaQ[U�L�oShW$/e�H�6h#l8^S&�}efŮ�B�PsL�Q*!`t�J��PS_�
302apvmdeuf�K   �(�*() ( 2e!|�Q�i�t�y���!v�7vd>.y��8�$f z�ttaI�a:'�w�k��g?^��m�gnF
 L�B 4Y?2@p���YHnC9-h+�)ave�0�@!@<�Tq�+|T��� "0�`!j ql#~�
0&b1u4/8dX� V�De;h �h43iCM%�a^bd��P%IAped�grWg�h�z
j?8 "�]D���ijdeL&��v|�`6entHxo�l%?�$�iG�tz{T(�0�Dn�muj�G"�~TLT[DD��6�)�a� WedVazgpD��J$ ` y'T)iILfyvt.d.�mg!Qm2Ds�unld�!#�:r -"T2!5-�}r�;#4���0ب.�� 0ho10�`"i�>/u�h�e&vqB*&�{i!Aq�����E�p@g��tr!,h     -�3Amvuy#k97�O��w"�iqTL%h�0uD�sv4eE&ns�er�S���/vk $ %0Ir1~On�����eQrD��*�Ku�mK/rUE��FU'~�Ud�)!�K �8,a� .[�vgica�(j�k�o�|(d^�Oz�$�cALZ�t]�3���dAaa}e�u=2�| MD(wb#r,��2/Hv@�mTa?��6=��mvvu~',,soEps)����!)�5��e ( g h$l�QޜX��[N[5({�("f4b@$4D(I}
_l�sbe}.`�{TfX%�"dt�$ �*j(i&,4h+(�R�!�T���Rlect<pw��} s�H�QZ�|�Pa^�O�'2)�*���* ��p�-7�llgujhk��Hc�8�m,buMg�g*�$`[�NmE[R�_S$6(>Fl``"d u��h.~�leg-OT��mQ$tzqBpve-7hQi�,���fu��,7��!��mi0a0�v"da�+q}(goP>0moq��qqaC\����}AX�d1~_�Mgo�p�sPa8o��
$8�(YmK<�u�l>dvl\��W'���iw�eZ�,�<(0QBp�5_Lݝ�O�%- r�l��ddMh2c%L+I m}
 U �"V`$w/g�u|J;�j�i�):{(8x" �cg��h+e/ � .~~Psi~�ZM�/ug��zR$V�y�e���
%p $��.��MaoIpeJAt�b<c1|Eu|@�pdc�54g]pdp�Gdhed&ntm���d�1�  �l6k���LeZ)84�V��u� 2�t�V5h%a�I�vw㥩N�ILd( ��!�~Wg)0�(	s�OrdRecu}�*F�f`u,��epmc*H "���)o(��di+� SF�-?z�E�W:qnbu
=3=%���M&t��4!e-cNlg��a�0q�cn��IF/Ve~f�erdfv"'(�C\Qoj�3wj i�}xa�daEf�pR}Md�7�L,�o~I<aG\mptqt(����|fa��o:! _"b!+% �+? PB`,fĶ�6��aJ(�\qisn6s%{5Pe)2�X,�d7/i_BkjaCy�f{^zep�$%|�*F�H���   �bp�+q(b(r�b(fCKe� b'y��]�"���cW�qd:�isY��Y$�|�aOB�.rof�1�*�E[rCU7Op�Ġp2M���B�kP&"7i�$�}]��b�u}Uh&�$!�'���w^do.olk����7s4$�m!�ld=h-�*��" �M
�"tb�e=6�=V�*�&.t�f. f`�* � �"���dXLr�ws(r�g6t=�a
�b 0�`hgH$uu�"!�0G� ;�=�%a�d�2�ld%���< (2`�)�.ROaA^e&�34dub�zj'�gW��SwA�N�g�t�1�O&M[�~uf aRu�!�P�q�#4�g~Pq23<[yqaR��sm0��
d>�0P#�%d~��#_�8th�6=gib�nd��Y�:w|er,r`&�9,� J8��z�bdb!n�mGm!�I��8= ;f�%~F8B�� 1bm �l2e��O �H��=i�p��$0!t�mo.�kMnWcc.p�FmRl�k�	}��$,� # `L�e`eh#gm��E.f�< otVz`g�>(\j��nHfj�z�fu����E	�e# 4� ;Me�a(�f`8vp�n!�j�~n]�:$f,Es�je2�j�u�4=�K�$m�g Pw�`�`&$�e0 �sx%N/C��eDg4��0}djs=�g+n�Y�o�dne2un�a?�$B�"@HO�- q  g}fwv!cpe2�nG+7��@v� Z8K'vaS�=t�r��r�ig�]y�g2���<"io�qt��{Rp�`;�M>��/`%dn�r%�V�~l+�'��<�o�A<Y=hy^�igd-Fp�Z��k�nK�Kfil���|ê6� 'a4�,Y��u'�C`�'�/Ql�i�36v~!dn�d"u��m��Vc+�H!���%.i(,N�o�v$F 9@joactb/x4Ep�rdf�^��O��c*�&, ��i9��at��0p)p9�A�-�GHf-+���@�����F�Li�kvrHa8[l-PL1h!�/.18%!O`*)�mAt3&{!pFD&�A|pavu|mYLk[4�o`vp HPm0qqf7e76t3<msm9#,, �! h}"y04�*� ��UdZ|A���Le �p =(tb�3d[e7mDlhH>�%Y0 r�Yu2N�9�-Ml&o#o�c#f�tncl`z��&{(�Qq_�FMC^Sa�J�.!{��(' =�0@�g�\�>U�h-a�\*4�ʽ h�� �t�4V~n`S%hx`mzEb]eze"7lkt(p�i�X1mm-$pn`���\GR_MEN+I��C00 <
e �!�'Eĺ|0``/e^f(a�y.@`a#O}�� d�VehTvrO\l�M�"�n�u*_u|�Und> ���Ht\'tt//JL! % �ig�6:�q%>�CO�pe�k�chcSu� p�.�ofvu���
 }�_W>m�GdR�A5JH�9�?
�)�y24�u��0{�B�C�d��<{2h�L^j& 0
@mn.#�##Aw%UEv�ʴ\�alm>z>lgPsj�<,m-F8Q��TicQM�wL
� (��eha{Cv�asGnu�}pceg�p�uaj�Ty�E,FA{`Fla*Q�jm|T�O,7rr1V�FE�-&{�#_,pls�T�ol.�x�|=(!=e=Q�Nd�;
a`*#.	M(t�p�d0ogBxa(�u�v�g�U d"c$|8"1�P"1Qep��N�oaTErE$w`�7nw�cwg�js|"��rMA>qt 5qs*�`
b lx���$(�*� � Q  }5 �%�2� b� "I�\a2"%��zs�V'."a��!�80�$n���'ks��; 5�(#`�d�k����zl@`�!b�hkpfn��U�()h� , `mn �"�� =�)!50d��9l�fDq'�#nE0�5J�2h��Ar=e�q�epq)r�)2H��Dq9ldi��B�$!� p�[�t2c_.%�f-�d�fqv`q@Q-=�>r��do�X2k�$$0	�4!�qzPq��
��o�4�r�&co,X+paJiE�p�;sK -`#,�$1L%)�yqr l�CPYE
 c4#4�j��">lr��-o*�:emsc*(�Xb %)�{`2`� 2M�Π`4�(2&�5�h68�>`g~eM7�b	P�q���r~��D/   �b#")fF�!{qeq4LcPn]�/Ne��0'trdpAhr�pf"m�	fFyfc�Y�jqg;$�ia3F_:GFncgn��vwya�*kIm*�faR c��o`~�vGhI�	=6�@Z|r.g+��ek,x��!b'#�-Ea	&`"`� �+	�� �[�>/  W�unq\Y�J�iv@)4y�" �!@�K~`'z+�S�cOTp (e Px^ �W"`%�/�5���%
`thY�mOMe&4a.�k\VdC�K��{��`f=)9��*u ��d� �1i�gm�?M�<��L	ak��pc� 4��K/t��n1
�*"�1@�0.� JW uA�mh�)!.�t����}f��D yd ytW}W�D
"4�SM�[uy(G�tCt[)5pzkU[P]�K�[
I
 * ��w�f�~D`1z�@�$qL\lp:
 5h%,S�*��|a3aW
7 !&d^i"|k2e3��)bgo�&C7d�aM�g?g��""p ��01s�M�a�c��9|9kY�kTiw�.8#` !b 0�  q�cc��v������{q�lg��G-w	}Cz$cD)�w�akt,I/'��s���kc%�
*1=4 	%1 a&@@xo{nhwMnj B ��[`�r�v[JW5"_
�2���!$(	 *E�w��40	2 tI�J �(�7i_gb(wx5��FGcp}a�,fy�$
  �a$*�! 1�QzJ^�~�W Y}�$66)R,jFo4E�v�k|�fz�EvᢤisF.N�f�/� �
$(8 �s"]B͡�Pbcd�iL%�gW�'TxA�( 0��d@y�>*)(� �J� c"`�Z�uoC "wD�c	pn5q�nVao)svಱ0p�(F 8mw�>�&*� r'&'lFBd`�

 �(0h�)yH@,`��&t%4v&5m"binVz�\b�F(OH�qiCn�1�%=I~$0l��-�9	���!$�0c/.ozq;*!b  �58(���/��	�!8}q+~|%b��FHs@�Osn<�k ��. 8d�ppp�go���np$($.( r�" 4j�X Ƞ�(�rG?n^t8f�lA{��E��mc�=2{c�!00b(((l�N����6SaT.5kOr=%8�~Z~hel��pB'�`E0I�;�`6"2 ^`hN+���.v!`ڊ� ` �(+�#N�gp�_]s�Wtt�Qd�0M e"�n��nL�o�t�Zb�y"+:�aa�  jc<ST!�se5js�(Sgut��Keqkb�tVqvt.yf�,qpg{evo?5�wN�1q���;G@1�$p%"8�
iG�wJ�=�O�1��5:�&�melt��8�e�`��mfe/lgdE,|Tf0?$4&H<[#OnAf.�v5f`�ORa === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
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
    // giv�w�5Ah�/``$$t�r�e>Y*2QCZqEkz��.dD��)@|e�R�<�l%(v�T[- �ciw�C��IB$�:!�sM�im;�1�fmo�v1-E&a$�|itEf'��B/�:v B���nem�z�g5^�
igh�/`Be����{��u��((*!q1xǀF��e�t:�& }�a��+�!7 l{��h�omn6���%�Mg��q�rk+��d# C��#gCam\��S:8� p7xft9wnn^,M�#K��& Qk�{t|�gf�<4!07��A�b�k0��*��;?Nsq8ZM�oS3O�efB�D�2"I'g�Le':���[���|$B
��t wxa3�$
	�@a�NC �
 %�x�jb_��uJTb��z_gfg�) ���8!`�th`�_�//nhg&}�zi@s�~ki4k�7�G�$�oNb�d9�8�"# "�%�c8�icl`T.t.ta!abp|0oq
 0�(0yx�r.W�lenmd�($jeIL1�`$!�,�Hb ����{7
jA4lba�+z y(P@4 �'�n!txmq~_gk�9v.�avi;�Rd$+�zO h }`*ѧ]8Dc?~ew��hmu�m!���, �"� z��tzn (�� *@	�`d %4liw.wiXxB*m
8;
�1�@m`�C�Hc3�{�NL��IrQbA�Xd�-�z�h8�0�s����tl�3NWf�`gde��dt�	(;$(�"0�|
�Q(*%�*em7��jE\E��}��DH�wal��s�I0/0e�(LaUS'�a
�钅.A$-Asc�m`�cY!(�o��i0-�o�(%a���`*n��w�ms�iWɤ�O�#3���!	�d5h]k5�%Ik�v�n�%!I:�%� &��33�x5b�z� �` Dw
 �  `Q	x?o4tuugM'>`:�Ni|hz��h�`.znُ6r)SI���%;��NG/1�2����pp�r�6lqh`Ggl/y��<p�O!� >"�54�2 p�f"Hq*do3qo��-�{� $�A�A��~~8Se`�;����yhI;
=�p5 %|)��dp0k�/� R2d�`P�Jn�"!�k`C�C(vEu:�(%(I.a�$DA(io0(yd�Q9._�nun��ј<;
氢@�%  cb��0#cH`Ze*C �c%e_v�ͫmd�E|e�ez4�g`�v�;
 �"�, � �%bo$�o�k�`r��-P�%W#~�pAv�acnO!ub`eu
�p*( ) 0nǂ��ii!._go*&�%o!pD�Ow%``%`` !��( �xn�ZZ^[o`�aCEms�*!$>R�K��ߎME��T�)+t)90� )h ���"d"h�*-$T�8Y*E-M)�lТ=u�dk�blt�J	F�  �u,%  ,)2�t�w.��R[S�w!ndlGd�s.#� ��&��b �[aev#Wf)/9�n�c�称q   "���,dH_�}p�(/n|tdkPex��i �`!0#`0.�'(��p�/%0B�n��)>= .�b��n7&s�2=n�ig"1q�=-`a�"�1(,`/iu�� 5E|D��IE��$!`�M.�\8A(ld�b�v0B�m t�B#gW�%�c��{8bChkuntA6&�i* ��.qaa=OOk��;f
�1�$"LC_d�g�&�dtI5u%%�0� '-4��xamdj/d�i
�k]g��/�^��w#&�h�`~�5h�6�Sob�{o�MoM�0,8�O\LAg�U%gYD4d�y�%fwh3��0.!5zk0g�,�f�dMe�-�2�]	��($Sx�q�.d�a{$ x& �� (= *x#.I1�Ppend�ċR�(()p*�'jmd��n�[`�C!�-
c�z8~��P.Ok/��+cjsknpC�m%o@'9r1��d	>`z��w&�nEl1g�%mo{J (�0dl�v��vHqB�`�p.nfhI�"SqeTMaum�vd:8� �A��L������-T�	y @18 �! �%8�Ce8et�iw6�#kKvKr�b�K��qtxp[�:--: $2( ��z�!�į �vy*w,�js@0pu���v �9�$�E/
9�B(<`�`@ %�7H��E8�e{�$&� #yo� eKi�^qgCPr�n�ed#@B�m��(,:a�&��bz
 5�  ��dn�H�zeFT/�'&Fjae�?e�mX�&�,�WFV�m5CDOB)��d21ybhbfVae�=%�fq-M6���;
*�� "a |has-:��]wpdJE?a 10'I(qE:!8$?`�0*�u�~5t�Fnk/i�N�ge,l`S)�)i,��@�!��y�44e�f=uZ��B,�Ku�y� ad"�'ko \iys�?'hv�N��eNt(i(�f�l6f^2Zf	O*Ea�yEi<a5hk*A�'	U ��<--
� ��; /���m��>�%<h-�-()-}ML<--$-!�	o!-MA�-o)m<�-/
,gI-!)!

(i�c/lCP"\}�Os,	�vaO�(9�! $,!�t@y��#�j��3 �d$�0&��t!�{&ymh6mKd'%;��2� 
 UolsfThyce�e1*8 v�u��2
` 2 @ T?�٬Wl�spT�zJcT�jj�ODp�l��/N$l�;�(�0j
 Bmnst�[.�%0$w 1�r`y5�&}E�w%Z!�$ �e <�q�ckaVs��!�( ]�bl�C�n]GG:Fm6��K`��k *f*)uhlu�y{��}Q~e	�yN 5$8  `X4�v������y"�-
�"�b$' id �)�Qmf/u`_	 4d �&��vcSd��cFh*��`s30* �T"�m��3� ��=wp��an%Sn/dF,Jsg=Me����REO���EM6�!7")�$0wzf�gg�Ab[�%k4eI(a�fT�g#�s��GK8�1$��j�Ute�r�hk`ler��o$m�sPa%.t�0wvE\0[BNCNSIZ�% =���ty�"|A's:SmKdDefo���)n9evuh����  1I" 5vT.tTyf|Md�z|<6�poB�t,�^nPOKTUNW.�u@(h`��\b���j�b6SHYN�L}e�{(8�~enmy&S2�A��<h���r�?�1Fe�<�d4�a;�4$<]J 6��dn]r`�c�e+��
*Q`���|Pj1�/S`��d9�#�";(� �"�-�Uett�;�6%���JN�b�%��ty�Y/mQ�stgD|�`fIhv�2
0e,#b&M��nWc�@,g2&��f0d�]o/gVD �NGNTa�Q%�)(�"���m�'q�m�xt+
! |�	j,���Oa}-ka-g1hA� `9$�Gojz4(�(1�0R	# u}u`c�<��#����!?#L:m�<?:(#,h5a.��l"n )!(`!�{m��ie|eoPZ3��T@}�$'TG-22]�o.�A�9

%qi  �f&tA�sgdx~)'fb�ww�u^2<Ly) ��_��=> 6`ovFDw��tC<a-t"4�GlHw��K�m|��8Xyr4c��)z{i�0@�h0�0�t`qb::`�2�`M�/�4@� &O�74i-A�U�lw9�H;h-(',~yEl�m�f.6�! qacnlX}L�ju�~2u`+-ml^DI:R�e $Z}P!HA^g`��DvxTNk4J$?m0$4C�{6  b$%�lTa�C|g�j*t/4jvU)h�`!y� ip��)�(pkB3&GiaQuLe�N�D����v�w.`4'8�t�LOD��
`d|t�T��s�hL|p�`2���+F]d6���m.�sE�+);Je0 ��]�/�#g ��/"b$  ��l�sfvS{�\'fmE%M�(;
�� <BBu` <d!!� ]� [qt5IEjfof�d�u[�	$y��"2!� =aEmf`�o�x�3=3�MCK�� H� �0!(F%�$pmZd> $)�!x=

  �@%��Bs��h��t~!��
u�V!phtT�{
fofA`��4'�M�t%as.b/_tkmri0"m)&)aapnd@A1�SWM&+v�a� 
k i)>*JL j,-�-$-(/	+Vin-}�n%()O-\$(-/),ma-�-='�-�,�m<��*-��)�,.,�{m��y���4 {s	������b�(�*-	&	!-�'9���/N�--m /�M�,.-�*-%mm�%-
�D�h�V(�]En<|=ag/Clel%{*�'�^�1T D�V�SO�ٔ��=2#+1��cEh&?I `go~j�ANQK�Y$�],H&9J1t_CMC(m�� ,��t�����
8,&Md#t`#����OJY%� o�sA"�|K� m'Rt(&�&t5%%-�@�2�$�"�ba�C<��Ъ$$�%ex1�".b1yb�zR6TPq�?
+#m&SV#��V\e��~j2E�n^�DFewe�-�0�!%�A}�|F ��@5c"bk�rp�)Cw,��Jݢu&a�9c*}@( H{u��z`�D*�G.[7hcg%,:)�$!�wse��B.u�~�"�~~ c c}�3>2�Ď^w_Kt�`#�-$��idl'ze_eFJ�CeX�>|</)�8emnr�.�G�T�-�^
p 3nF�t`MFM_Z�N�J��S�{YCi�SRs0�q{Ai$*7�
p`Emrsu0�R��L�y�AVEWQ]C�TmYSJ�=`u��g;}��gkslIs ��OL�d[FEydfx�[K!Ѓ�www �v%&@�OG;i_W�_uls݁�b$ ��o�Od�wk8�*cnX4r,8@֕Ll�E�,uh[�60�&ZS�pL���SSH�#���@w�Kn"�" fOh�CJD�QF�XGq&���dI^ OBDa~JE{g}`Y�> bL�s�cC�_͍�M��TERp<('6ogcU�OqzO5J�(!lBspi�\Bg�
�
zk_/ct$AW]Xs�LES]MF!�<&o�-oEi^t�iOw.;�8#/IT#W-HM�DNPIN 9�+n}flkl�F�aO.${�(1d8cd�CGH����3GijTUM�D�DP �Mwd �-C/�?K��Pk/^cp CSGgAT_RDA�P�O
�p/j*X��%2�/,n
�gc��0�).�$,#"P�p�tjgle~d��* � B$xI��*cLguW
i�$���.u?tc�/�azcM~7)w(0Jm$l)ufhc2.Zlq{�gfX?8S7!�qo'�g'S.o[�m���
D+�>��s�o�"|:^�cs"�#[Pp�a�C�k�ij?!2�<0��(%)p�(dF� �( �0(#"�䠡�u�z% uΏ�G2gOt�����dj~X]~lder.tzh5�ez��(!Z�[fl7�\� �V�oOI�$so�{�F���( �%��yvF'�db	�N�0ff(�}�A
r"wo";�j�7E�eWp&DEkAUl|��v5nP/��zG
("��
�-��/)a(0h�R.k3��ml?�@dh�8J
Yl�`! � �o){_M�Er�)�*zYmfh��| ���7'b(�1 y
J%"1�`�D+�y�sry 낂�zj�}-?: P$@u�"dmq-d�}6&N4.EiaggNiSt�,�'CA9VQ^��_A[Npy!¨4"p��$|_�3*_�f�}g�Nxm,n�8�"&! B��|�K�~Vu$H�cqp��2y.�(%3$d85e Do,sNs�}�dsMwAd�t()cKΰ`$ <]�enp]a�$(}q.of�w8�S2���adgU81I�OT_GNUPŜϞGTKRl��,� ��}3p;
 � `0��Fw7�ldkFdxf~�oS��8XxW�D�%}�~,(RtA �R�_G]D�T$a?GI�C� \6�jf8:[p (da(!!2h'e(�C�lװm�b(6"5<��t�H?._��
( z�g��n; 0  	:��"!�J( gG�gvc`�uAVe�& 9�N2�Nd	�~��c.|q=���!t�i1.m�l��4.�& �!z\YC!�
	��c-`)�,(`�TcD�k�4ol��t��[`�v`�tL'dL`�B��t�\0z/ �600u
 0*% $�	a��9�3	le�$	�k#8tm9��0!��g`1DH�e����tm`p(��9]j_xSPziy$�ft+I;J ��	���b#i��z(ms�e@8� /m�-�@�V\od9xa�bA*u,d�	ʫ&� w(P.��'#< �Z"a���tHis*�ScDe6hg�fU<U.��	
�� "�,*Xn�r;_s5�zmVCk�uvg�p�)��=�" :�xLi*_$Oe5xPap.deactivate();

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