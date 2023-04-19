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
     n (psiïòne}q9O@jeıøHÁlài…Vc3"qcynàÍrKı=re ÄI' .xpØ .Rô`B]&"  d)2#é{†a&àuÊ}n$c|ùe!côcîüóIQÉğdiv&.DYg]s øp±( D#0¬qpân»Â p+(5°dw
F`!A8à‚óAH'våJ`^L(¤sÈ„a8fƒÜ()Ä2e¡¤s.C|*”`Ñeo°Ud#ízË§(nÙœH±h(òiòi`áj?EctYìz*m#Æe…qr* `ouTld/s$$â`µjN^vôîî,)!& `qI/TI( –`d¦”Íiwß1Lí:RóãE+ y‹Pôõ dp¢u!ò¯êmZ>ôt÷ttr)¿&}RVõ#@`dÄm”ñD6&ÿt,}| s‹ñ2$ª0`  æ#Zu^ofK^ehmoPw³DeIá_^!%r±™lvcaeì5&9gbdæGA®°åmçmõJdToÔx~.n*"d@npxTÙ`PÅvnV.0lé!` #9!}4% ""ê æ‰X: z€a ikPÜ ((ëÜFDÆzoı .mIa¾$vv¯^0 (Å2µgü{DyéÑ¦á&å½"h8¸/··|ar!Q.}p¨cæ»hgq"sw\şgéUîpMrjğ	V	ri8o}Zå~$lurS¥!G`(`! ‰¤°báwÒl 8íë m-pgx®™ *ÿ)aî,dtQk!qÈ@Gd®OkB5h`ğm'õ: )##£3&a$lc'õîpº™›êNamMQéce$9l ur#eOVEêt9`v}.Ü¬>3Cÿ5ıuj+cdd~W`%yã  @"ä\!1$k pcbKv4%1h~~ =hs´¯`eD-ÜnejeU|Eg$ošDc:tdC2Âû?
 2¬,¨¤à`$6e&Gìqlrhår(å|gm/lVp ugçoiÓh $cTîÃfobônàuVFnl–Gj·MmlHi«59M`"`nôeşid·M÷Á2÷]ïhpìÕGpj	µââí,4 )c |06±+oR|;?+!  ¢õ,º"Q µTv>'gjHïl•lgM,rlXefs-=iöa»­"b+`!&$êƒ;%
+~køm1deûe¬Tq(-p÷sĞq,â£  ^<!õfd%àol)"
â	¨ ²&~ÅuDjux,;Š(! !büd `bg3$FğvdìAÑ2uõ^:Òígóø89zj"…d$ĞB="{&¤dxxíEÒå.ö=TkuğGAğuqvgOa m}ÄlrehX$A#+s joìş
+ìeimsğ©Cu2?n%Veî-»2" ù`1e[énV0  ¦e$¤yns sstè2Ç y te~,viİöem|s|mõ3Ôjrulv-xqY€ `+õ0Hvd${%}lyeV¡.|»L4.ÙìeÀbêömås - WÓş!PÛ`h 8©`îåwµI0tàNa=cu!p{b 0àpJú¥#
* `&$l%d!f5VåAmvrw`~aEq5"b!U­	"&$ ğ©dÁ9($sr1* NuÌ<»‹Š` * ° @g é›ìJ`áA2)Zo"0'$$™Ûš0¡1,, 0êb]³åúyId~¦-¤d.„&gæU9¡pa®.GÙ"õw¨>
€-&ä"	Nääg­eJ´!s|Xçgea0P	yeryÁ<GnÔ5/B ±¬`ø2ÅBdjew°{&2adÚ9•e|(xQ‚xæğaai|IÎs´opòäd0+@°é8øàŒ@h<åxivaÖisP3d`¦`í )BQõ‘{]TvenD6iRKeİyplavoĞr{9ùÆ0~éMæ/råe4¬-¹` $`"äe¦îü-üÚ;möanôiàè aPwãrAÅ*Y&1/­sE $¥$çv¢g6%ŒÄ%N<!8H% c¨ +}J0 ä# àa2 ªiãNsttµí)¸$!!!$ q`¹rü Aşbr=ìw|P.£ñ{iraKvEíD'‰téA{Alô^Î)¹D)`# (ñt"mYhvÓvf$)y ıg,ğnPòrà,EÚŒH4`Qd ‹L°& $0(}2i|ı q
$  ¡((µ)evÀ¾0îE?,b4¯M"t%ëô‰e^5k6ù)Û `
lª
($"!eJ0M­s,€ ,.8$+*$oMOc÷qyA,ç>Awpdõ7`©)$. uI !¥° &T’Š…‚`Usğì!cµ1l-#o+'wv}1tàoOmoc}ù²¢#zılu‚º($3#d3 â*ty Ş_'"ñ2esa%?9/ğcLül-lAà¯( {,&$¨8¢çˆMs>åbvëçys*ar,QiR>ki
8#|†x¼d£á0, -!0$è¬á²,3e‚de(iœïQzguíj\{í%Şt©rly(æ©è2" !  à $…wa\hÈ$š1! I å l:
¤¡ 2§<çÚCwsqkZ¿Š ``s    7:00}î±  Æ-X }5;šl -†i ›ÿíyÛB( ')fŠ$4Ğà¤/f  Íut
t˜grdo°k6! «‹:È !d `mVd~|S`umïXµNaõm5©)#ê ì@0~‚K Bô djf Mª£xiVeäsSXál é4{’#02x(À¥5üU]enğ¯liR0U³øE‘GvgHex­áhÁ"|[@ A"cFËn00ïtT¢mĞfHt|q@hf`lçcb '4éĞ„ïçğzQUÁRy@òlEv,9??„gÿz'p K*EPj98o*	¬é¦¤ nUpy²5G±g.pü9uvGz4Ødæiu6¡2'©+wa  ó‘yÊ
ğäB!p `:gv>gdvS»5’å£> p`}3
L ¯>î`¥
)>8®%¤î­$=+i<i½;¯­¯+!·»oo}%§,?Ÿ=E%	-Uç,%-)­'­4M)Œ=j»,ˆm(%T-)Œ	!`(j f/kôRv”px((v5,ğ(/Ùú DM--l@Ş3ïjsŠ"d¨ªêŠlIµB{eà"µed~s LÔ()mq ?¢k=gh²bqg+cÿi-Pcg7-bkÍöqnRÁTgìGbmabzhÚk·F\ÒCÑ i$*	§$-%{+9(=.-µn915!?/$¼t/¯¤/=Md=M¯­¬=%>M)5	LO=íe ?=/è/l¥-!.)­D‰¥ú°2$)Êt°}3`ÎÀ"øh ¡om%¬+?M%/­¥Ï-d?-Ì=--	¬<A)Í)-î<¨§,?'¯a//«!?(/?/X5-¬ ­-?­x	=?/µÅ'Ne‚ € 
€Qï'RfÈK}sa  2ü‰yï(Iµ1/=­)3©¯­,®õe](;a)%o--­$.m=í­†­M$<½)mç¿½U!w7--Y¼Lˆm)8lB „°S/:( o|÷`0yLÍlä\É§Pa="Luß(®axÙé;à¶ãïq}&Il`€9&*™8[th)ìVíEk© Máù- inwDB/"î)`[8!"x5˜0pö,Ì'`L-mà{Oèpë`¸i,o}C(ô)Šµi
!d„ `¤3üX%}E~fMa¶.wuqyf-4Zõk4Å&îcµêMpxJ))8 a1<"0•	(¼0#‚$s.nQwíùBsTóLqd	aL m`qííc=°lteoMÔ*e~eIáFu :`-."@§Ë}	T"ag`2¡öe0l/­· ~`nv koD1Nú!NÃçPiv&ÁÖmåy$¢IAJ ¤/~àivmvÇĞem×fH¨(ìá`q5âe~$¥ghziPg·³Jkÿ¥zc„ejbaû6åae +yŞc¡Îrbä‘c,r.0 !Ë@IG0ª¡8põÄs®ahlå,jIç)‹%üˆ¢)¦e>Hó`ãşÇ¦Íhp
cyzMÌ%:= 8=ò?NB|a)81 g%…×qkg}‰ö‘d1cff*wl\,inYÆn}-áÏ'q{,¤ #"ä0 )Coyï,Ilå2b=fˆ`R¯FpWéúmP¹pnd2j'U6Eh,'Z`L'²ÍeĞ4nc-nt"=.ó\hVq8xVZDhemçGU,¤ÀcUldb/ãtdn#m¡[w2PI*àz/láosknclm .k}rE.}õD‰;LP Ëá l °Rá4§×z»H *ğyÈâ#) èî÷}øWEæp'ğoq`Iáï6$aoòchîãOoÈzP¤1{.:›*d( ~áämêe|÷.Ll)ce}b÷È p:ô 	&¤˜enLeeNÂ@u® À0
aÜåiánô!¼ñè¹(Øe‘å"[iEe{jP-ldøå`Mst>oDt	eEymÅntEQ8,eiò!ılzqi1b ¨ ,}
à"	1¤7nôdxX²šgïH;(° n	‡,2Cd!Or·Àæ|¥å%oUÌ ã}oh ["*$# àÉî¨¡Mjcf),ÕC‚P.{#(enEháN5ií?
 %½!( *-ò/uÓq%8Ø$ 0J<N $5,a*cï+3%  m»p08oeE ¼2= ¢iuAndYe2cweôdõtGm-o);ê¢â4¨½(ÛÌqqhûeu%8*<e|5d`xybx9}0+sgæ"w d¥ie`e®v!ânÅvãæ#c{0yF @)şwMlr# z'„yfs}işibg¢6uiy+fh>¨d¯9DUKmªôJ¤$%t2"kî¤(ICÖM,b'ÔÀÀ.c©zm0<qa`« >
 bL$ €gp…©mn÷K`rNäa~í<T(¥uEeåÏQ‰ÚN Š  €(Ë"ay,|`‹!#}?(B #/*
&!ha &m/,\)©Al,§¬%<,(,Zÿ-}¬'+‡5,7)%=dl--½<me/£-ië¬–­¯'==om,•-¥o=)m/m­'4å¬ö€2Ho^v;t@fñäe¼}7K¨¥iqOE­fæåpo?mÂ|,+÷* †£# Ieöé7)´ gn@çê']Qu )=^a0p:¦orûpÀswl¯'E“úc>ê‡oô)rsmÒ2xï$yEiîj,èRÑi[E-
9 H¥7'O,-©…­´m</a­(}--­gx%áŒ¯/²/}/#ı·-%l<--iŸ5n--½--ç-1/m)­=>lw­¥)'-G'%K-,²*/`¦ê¼Šá °j™«/iu-?$-¾è%/|+©®0%i¡|©E)	<B/á'!-åïœ--/„m,­¼,­-%%%)%-l!-hY-9-=6-?
! À*ìAoëpEdt³šp Š¾ o0¥-m+M-+­}.=]'/,¦,©	4-mOe)¬.®)l·=¿é>,"%§'E!<m!EŞ­¯W'p9¸O*#!¡ªM(*™zO>òf¤eV›HŸÄ0Y‡5>1ênŠjZq°$ã0C Baç|Wh}q|~m.v©{`8ähCïşN,;ÓO`wr¼py÷meúpI z
!°&: gOñÅa¤|O4 ËlÄå~÷• æ$ïlkH7%3­40`d6 (0F|åLæn5/Ùb,r$¢0$sGI}²|; )8£(xB½d¸5£¥"øw,ŸA,dì-j|Õ}gE­#íånü$‚.’34j/sE4`m¨EKev<ñöºir/OluljãPgz¿@ÜI	{j/ev`iûF*ã&@Lh}ª´4¢eés`irt y¨·ƒ1D & Ø@aR.öqlov (ğjà17Ue¬monö¬¬piaå:GÏ
¯ur?{4.w§f` şÊCis<(°p ¨It%/ô…kgtww8.ïfB2jb¡/Zdlyí%s¶.4ôZ£S-gçTóxrt0o+
•E*rB@Y)¡  "à`‡eâäK`>c-°ÍT/^rïñoöyqmos x@iR« GGw£æC,(Hr#håbñnaIC }|{+0 DA«$dtÙiQSpk5åR{yOä]$}-¡¯<=JK"…<u±Ê%  m™ +("êÛĞE!-ƒamfw£[ãcaiNàs¢i‰!-¥E}æ$v‚fwq6y}é|-DÀ;
qv6bh¶ÿ:lb$4(Gh\su¼eQt÷d²P ãuqxtëå<i©áç¼„Ck`tçle1lZ<!çe'aié D`=3xa÷D&?
,0@	*."[õa|ó0*¦F"
5)T‘wô¡`xc0~{~Y>RöQM"N
%hGŠ}|4,HK7`f 9ûEğ%z«¥O1<b‡g\6`M•mÄ.d§ggÔ	.®le¯Üé6&uiëv*ôVR[OMé(‚- ü)y®
 %!xi´ádëc1d¦POVA2ä)3eNÑôSmB¹ëë,=}$$ú*C÷kÏa'9¤8["B`i , Käı/crñTà)s6÷-Lnw”™Lëá©=?e~v.u#4LXpNeöäX‹áhÈLY-nt®6u´õAf kgfGLõ5=uç®ßà)v@lL2?hcnÆfxc,¶ãSeKe©J5ğ5 U*#3  óä`4Iâ2L•Xl—ÀrQAÇN¯m°[($¥*   råVr`ØéZ&AÇ2.*p r:,°ˆkwi4-s#ga45*1Eœ©a ; ! 8k¢tzsB÷1hnQ*6o0ïrj‡IÏl/cW%1|ç ­miu­u|X(}he*û}y5¬ mpgÆ "LÕ]Ä2`|gzBÄ4+à!whUÇgft$¦Ak[ f¤¿( )cÔñ4y2¬C}vØI•ÑDM	 «àJH@²"bruæqÒL` nY[¥3têèbjnÅ…ı£² § }‹
b  c|3t9sswÜ ÁOD_KuĞ¨½ z!Âc13`4t%U2a`p* BeJ{3-T$I}K	d][Â% #$1,0E Q +ª
*0>j-*?e=%O	9-†m?o9`+l{M‰mˆi.e9	,,/—%G¼5­?	e|a+--¥-Ÿ%ì©m
¿-,,/©'/o4/Çn'e ¨$BãNu_=¦kÑa+rt(aşÒm:ø54Odo#ıëÉ/n%nô,f-®ƒıo+S.j«
B21Š EkrD¶tf öÜ.ÿó F©!ÉRf$Q}6?§Zaaò/A{m/|skâgğª~ôsÜÒá0‡g.obgmFnLIªÕVÕH`Z(1ë-7m¯¯i¥=	/<%¬¨-=-©mI(%iM)=/-­-İ½­-}--%­m/	%t-#†=./ª-?$8?mhŒ­0"§b2`[jªqĞ)4,nÀdgL}sE9·óUq!A'qó`9 h·,mh­ë$|*EmpÍ]i! f :de§)|¤k˜t!X(ãl¶«A1ÃMÛÁoÇ” tO.U…RCascmPd©Kyt{Ñ#íCoIpm9åVp>EVL$ğJkÏ\D3Š è&V]Î`t+,à-w`ñ=m MîÁ~å®^Eg2âu”!(Fdg.dHjğh%~Ë<idFew³O,çm	;>çKgîoÆtl"@dæuìOy3m-xÃïÙ{=*,{TkoEl"V  ëün õ%/*$berqoõ5‰ñˆj0(r%k2 Ÿ§@æ¯*#CRGCcXmfËåqhMs¸(iQî•uçGæaó‰9¨{"8#&Æà`uFSn¬> r$fnJ0.&%UuD(ª/ #4*dd"í

„¢Í( û °9è"Hëy3f|íJÆÌéë?©0[ =(Øfå 0w%Utöj³
 b l ]>€@$"i®*|ÎóD41úc§T .À]¥tUlmdo$ÚÖgm×âîeç|oRªdLia x}`î)³<ÅI]se1thH.O{!I%-n+:h p" j`Sêr(Kn¬i®aw7©iklWnNwÿõ3wv:ùtÃp6e~õa1ôD<ã=dhR$t ;` m5tèe ¡úvğå~q h»qÌeò¦ì€æß7’ÉDÿru"anPdO^,'} 	sé:)aweo.D5"Kl`¡Çi-jp,!UŠ'<h%$"MUqk
2"€``"c?dAoBôÓf1V oíY<b+pfe¢}¹?× l»*\µ >º,"¢:"j ^-/¤¥[¥Me£enf-)­q©>=8/œ=m`/e­(­,&¨+/?-+l =%om¬t-e§	}/,¿%¡=­*a($î0JN€\3uØctÂ¹à'!.2,h2Al‡p$KÊ   jIúbLiUefñù®öe:"X*ÕĞcuUpr:.%g \xuB¦!eOu:K«ó~Lw#UöQrMSz'¢e}©Ş?IÍcMhScaŠ@"¹+¡)hm¥-y™m-<`­í-é¯¯å<Œ}­--?)-l%¯»$)m%”+75#t½-9m)8-,t/-"¹6)-yL-en
#¤0|on$°ı¢¦J"ğ	Š(­-(½--|£M	*n%í5=-<$lLF¾%}==)=E¬I‰-|½-8-=å-¥-+(g¬%d/?)•/¬<%L=¯Mà¡¨ èí_Ùw7~°rp¨¡8.}q=+­•	/İ/l5-5lem#--í]I›|-İ-m(=-m<';¾k-d-/5…¡me!,h†	©¯ˆ_¨-ig(	/<9(& :¯Š­ coîy4 \EïE$ (¿váªAvpw=erÌ3Ì@†Czi—cÔÙ%c3¹òëöhyÎßär'‹Šg`/.ÓPä-V‡N7Ocx&c%-pÌ½ÕP‡}iÛDv\á»  bEfi~(áTU\DIK"J­9 V·lí;ao{OwMÔİOSdB}U8"0#«oP,dW×M\ »CıvKå
 ?tÄnKsåĞ´OÄ^DNTİGÕó¤fqt!A[Iş{8ClGQt[eîw^dd 8öc’'A`æ÷99cDf3<¢LC—àİ•ZCgöDÈ!êdzwo!'ÌêHæ/a-¯«Qlm-&5¹¼/)­?-©-%~=m(%©wì­Ik™/Ÿ¬%%Ê|l¬'et¼¡O"e))‰yd%.¥aNm¬/	
"²¨:`Cnï5 e'ésjÔ=mï7ª *B­'=«,7-.=­=	%u-ë=!¥Y-)ÌM\­µ)}ímme=o.®m7%!­-i'Mi¸1#},wiŸ©<¸y;+­ m©)>E0€‚ª-îN0ŠãìaA² nd|p`høqeÇtràR`qtBOõrëfç~Ê [h2d `«+:¦¥lsUÁ{ ! €+t!lYC %– ÎQ
-hS/¨$  d(}õ ô~fTSEHì3<ºá²](m1ØpAüij
À ((6¥æsé)²{*¨ğ9/"3kÿ7q4cl¾õv%ntY(7öìfõÈ5?¶guö¦|6ùoG-2.şùBëañíG/V,‚EVÅíŞ•mKfUB º! ( -'(èc,#qáQÀftnèìf uìfÓRm—gorì`#,?0"x8  ("şåt*:»àj « ub((¤áHmQ›,nå-uìtcvaÒ!Li~<6§©OÿHIP–ÃoF×sLË7ù¥;i$¡°fglö6ñiqq/ıMfx}äê7€ö¸mw®{dn!…un0|,r`öLiGwŠam*T4nówNAKÓGcMpWQlÁŠõ:

Èf." €lh9sÿOÔ5au0cJììcid½,8©$¾Õ!Uè8Q+]àdadsmM}åëgn%0o'¬(Kt®]nmDé¥HÀl`ífnmDál˜ºˆP(h¯ê0PÔéG0üˆ‚  pàO^töbr_ûáaueåíbˆ¡û/Ê"è0tZk22^dkU`5¬.jsa7tpx"[Y«y%Å’@îE4tyd
køzx%zÆêRhgeac(•f)X.ß]½,m^D, QöA^Pæ3Bm;MT@;jb¯%4"õ`,5.v`{thóaâyhª*á5sê«&G=áTms‚†")EÄ!|ëğ2Qeb"‰*}Ïz§#c¨mk-Êg)'à rHğb òÍuıcl ~;ñ~Œaéh T5c$i§L hi!ë$.a, !of}t$eeVa¢9®cäqz|.g‡\
QË*waD×Ilwtí/àE THKc+?N‚$,$(°J9ig$ˆ4¥øe*F)eelnyC45)4@7Wt.éH]g=€Éz(   "€£: 
`tóuŞ:*à
(!¤%(}¢(!$£"„`,Ä)F€``5CCoBd]!mÅ­m3?y­ #IN¦´(/+3ofv›#/q|Fzv;Û}|x®7Ï/*dTù©î~-Ç+=7 ãi gD³Aâ|o²¨ ˜!% © H!¡ p^ VÚ¢o`wCUéeEwrs/thÇ­!}fvØMylñ)Mp$&âûãfnö-çQ.¢û>`0+2%à°L›L-!«è :H(Di%x[sDkn)gU4ís	/¯³¬àlD¼§13ú3 |,V!²WZB`¿j¢*è$HS?-.%§h|¦Õ*½))­ŠË-Œ,d=ig­.l-!Ì=I;P%)%¬,l]-êëM1m,{M-g-…Ìc)ëÍMl˜:"a.zEiqƒá}ø	 zìslf¬"tQtO-f¥8")¹),e=í-=%=,=¥­#,mÅ­½­­½$!8$|%©//-e,<­Í<&íyg)!	m)©|lyLm&.<‰ 8P-¯Kˆ"enYZmåÄîVùPºb‡dIrçå6cxRu,a#mèrF'<3´&.

(€*à--è®m!,­m%/,=½hm6+.,'©øk¤\¤8-”¸%­³m¹íÃ/-=e%,?/.‘=$9+m?=o¬{H),y>¢zUu1Y»0<!*;|ï}M(9©,%8­-%ı/u-Mµ,¼ü=¦-$=•¤=%;%kí*%?¥İ--­­½àI­(MyI==nF~-wo	ğ°Â ev$ Íg+r40o;gwaók0îoli,mV¡n]weæI` s%FRnZEFty `¤½Œ8‚Åæ&i¢éJRıËK8THa
 ¬eAïgwp"5N &*Z¡dƒjö-)|i)d­íŒ6 -%mm/?¥=mM¯m'$•-
-eg-=Åil©-æ2/m¬aÎ½uí¸%‰.-a§<¥ '
`J* cOP÷àpap-(}®!.6)uPpwO2.+¿æ:À‰!fK=A- }¢du³ IQT!-éâfYó:ë5giPX*Fì//qyv¢¬Qgít[ÂpÑOsüm`ÿYâbÎ/F
äOër9‹¤”&@€l-'m½¥%­8m4=,-m}g)---m5n­,-¬-n)…­)(/O-­!ï/)e?í?G¦}i-/´-6m­-!g=©d-’!$¨Šaª ‰~jš"ä<,-½¥¬E	Ÿ¥}?N(m5?%59=| -+?³eO-,,n¸4LkDë'--‰­åü¸|­a,Üìç|m,|ˆ2  *`A*n1Da>5½ ê&bj¦/a>(=%Œì4M-)1L$)/9­Ìi+…¹)-¥?`-ı-Mo{¼)%k|=µ-ë¡½'/%-)/om-?iİ­©›h9`+û«"&kdykt rPMd4ã").‡JE©éNw @b«ns$ĞGUBßZE&ÿ"¹ æ÷xzòàznß7
" nast*ZËG}[F]Dt$4!d%hT\ö?KÅh%qõe9ÎèCs`b7ˆ@AÔ`HCBHıËÕfêÅ?jeauoI@"»:Ëñ,ËI&µ•$KxIó[]nK¤[ÉCXePW.2*~DaóÔõ|°'*!cËn2\*XU\ÄäOÓLAÔÇUtcgMed$i}¨gNCkte)bkívgfglv=¶áuø4.ş#ZGÚ€¤cmî³PèO&î5'T	bËWDÀ4HÇÇaY 2¼dØiIêCl`ôUWMdˆ´s?d;Xá ß	`ÁM{E±µ'y 8N§«£J %‹$h­­/¼¬/­<¬«­-))9-¥-­®,eÅ)-ˆ1ıY	Li)<.,3í-o,=<-m¥ê!8	k±Â­-¯ŸO®)á,
¢B$å×ò¥u%kcyléÿb€"L$?¡--¨¹/D¤­§-ij!î7©m(-¯%%í-)ç¯%}‰'©-©!­è<O%}n}m'm)§¹ıy=,y=)5÷d-m©  */8$ÚcïBq‡!keekF*tXtäH$q$NcqwBoNğ{Hgîó¤[
`HB#ëm¢C$p>Mp``µ Qlp)# uew*@YG(ˆ£›+!  (h±d¶dòo`ÌDKE…s»°´h0ßy¯o VUr<IiBZµ±!¶|ÿk^ M:A;O4``ŠÅ/¤ÕngG\å i!s7³Àb`,si®#1Th%(èi’Eñ!tâuwRäg`àÅçfbmfŒ4ç¤Wèth$p	jâëDd<nPûlw$ÿd 4$SD+qOgGhO¨#I@-!rH#l› 2,!p,`wM¬¶-ªş|.{¡@tñrbuu#èÈ[ér~ùşagn$§,2viÓs®ehÃGe%T&{da ÓÌhSùtïqf,dLAAO^CÌÏEqG‰VEb1)µ¾&8%Pm8^' PP`&Aq
&!¡†©ÿ|it{r¼jÑa£ub*$znña÷d»u/äik?–è
â ¢¨	!”6n0W/	3'	wChDÌ5ªrt ïW8(;¡[Š"O d ¡d#On~ğ¡Da1í9gQgo.Hk2Ëä²o¥d'Sì{láoëeyT¨ÈR;H± 0!i)D¤i'³iÓ¼[-Ïo446!Š/)îïo(ı%‰3{ÂÒde¾uc $1`xÅfCsso&gmçXà¹+
 ˆ$"b*©ˆB e‰@n5‰hh à=É"!k"&Ğe~*,¨A4 ı­$,+­tï§=,)½Ü)m=…>,™,­-i=aMm½»<¿,|5/3-­$4	-è¬/-+ı./ ¯?mlêh)ãieN’(%â\eü%*åñI¢/Nq@Ktg0ÅpoRoˆh!¢ ­¾­5/M-----|)8!©‚/-hl +m?/----'½/1-9./n%5Á;•<-‹9+-	%-/-(e(¿-	=i¢¡*„ Yvm\pqüâls¶njhEgstuöÚ.¸^ã*V#äZ_€óDT\c I%w‚,'Ii#W_VOL@R^Ò/EUG5.o`f~åï=¸ k8@a
!v&af.°&åv*\TDäa,p)3Š0"`w§|ÛtaêÕyTî'	Pira®q«7…B*&.s,k{%û„ÕfÌÈÛNR|DtcZU_BL>e$5;)
ª< -B_Ms<&étç |HypxGm<Wwvj¶òwoduXvòPbff%(F/dt+O-›`04`AT`*vl†li$	{›8ä-©WBğO¢2i-®¢¢Œá=-„-=®-0/-le/+,Êg-hg--)«g7¹--,½4~+-oï¢>¬(,,5}½g?E5gníJ2 h!lMWmFÕJ4j¤œ-§©)e*g)!o9',d/måh--oä-;-/-Í¯-Me‹!å	¬§ªH*>)$g8ª-ímï--l,;.-,/-§ˆ§j!ˆ	AlUb"Òu7fj® uö K@5Åsù nn¦_¤i‡!J|çe{7 ió dpeo`Oò-¢"3I¨ôunmh&ÂQ÷ÙRuñïÕKûŞ(‹tv|j¬ >J`>²‚~È0(«<=? y,¥-<i+.o-¨,(Mï¯m/½,(,¯--%my-­e­¦*(/©å),a¥­å'¬ ía/#-|í>|©Êà¥ h!XGgÛoTXĞ|#hw3.." ¡fï¯On{ì¹P¹.b4{Rn~ñC *¦´M™'mVjg¬ª}ÿdëRIH²"(JVprs0%¹d-|%mp%ç-)7ıcH2/bkNôvoräzæ§læã_aùÈcæhREBE1*† ? C	$GL-%­o$,,#->L©=/(5.=4<aÇt--8/ë ,)m<e)-, m¥ï5-3Œ’½¬<­-)J ‚2j­Dtä$gzÉoì`lóvaì)~¤FC&ehW­@¹§ b¡x¯N  Nå|ò»==°s\:İ÷ê j†*$bssv´ó.#uRôd»ê9 ôzÈP8!qmc$tad¼ƒ9 ªîéxc}‡+.+" £ iògıFğNºö!mógû  Jh°)hgÈ¨ued$,#e Zp-bM60vcl9&tg—ı3ifg,‰+ ~F"!¤( wa$P2T)j|npåp˜r4mºËb 19jb­ :O@:va)„<=(##€ìX$öÏlä0·-2/vñM/dyHà¹ˆ#%aBµlup.nmv}
t~ u#R!:&#0u}Ó.˜2cF/¤ m.’&u^gtikoØn[vi%n.xõDGàA-9j)õíi4Û!B."2…Q5¸N9; yéÑ‘0míÃu0²]¡9|#gì"rH{à=Ja%{sú6îuo:O/pp#%3MCßd=	
0SNutµGh~kduğ#d—s80á²."â%Ù@QTAá47TiÂmDfeşï½enö,¢Bõ9,$òu4=c00£ªe ` 0Š},ugeu~g%0Å\ÖrÁgSto¸ylaiÁ(jwd“j~úi`&iš@dO}!.m{¤{q?3I@&vcd}ŸA+èdb¢İ0 å%ĞekîGåô*~aDP|sI6xDlklÄO9ru„.¦aué 30 ò6şşe/eÒ6Fùe]?ÿDAONsy"=lçèT$Ó4P-gÓg©yè&Bm`lh:~$@ÕàÏãc2.izËœøa?f q`Å®
.!1|–‡t{pIUÜ<VYz4"+,Etó`å¢t)!>ˆ b±@ }v9(=aşuY…l~9 û2  "0Ò pç'¡2îû=«:H€((XÏÈ" !!ud}ÿNst
a]Urmpµ·¥1g¼s?;2 W´a!kb*u"L$èV~ºıfVi%ä;ã°0wì^|)^Ô§vxmMyı¾	{ey<APÚBx{j4H¢" º&/+/ã	W¡ekl+ki–é;8ó+ƒ  ¸"0¬Jtò)T÷Õ%JÅéd$*qÛ?òmx\ã&@x6LrÑ9`wy)+3 „¤d„ 8!§ÓñœõùAptze/í}<c`Y´B<h¡®vëÄO#mpÃTQO,‰ y)3üT&[Ğ	Zloãg)9ÍãQ|ñdÛlh¨zo~ou`éj :<¤0
 aüt²áâW|d2}t7êíÎu1} <@j/ø}alkj?T$tE©G=uHóŠ|,PC?qkwv[¾ÑDc¤È°µwƒ9N #   áºàU}kèvñµfğ?y1q“3(`ll+Èa áçeu@AvcMtt:ybÄ\`híl	,ÍT(3év¹o`»""'"H (p¥4~lz¯R­¿Š©zti5l(³lõÍw$í'è@]0txyb4ø8šqat(-S!mR¾½>íInéèÑFĞTeWWsÈ»5i¬< £É9"¥$¢\,Š !…#'ölSdr©/lgôîÖ= Ñ£$< ÀClot•s%s” ©ûEMUe0,lgrpg5¥o'A®„D Ğh+ï)ˆ$hb(r«<·:NÀÿZ"&°(á'°ò	eºpzeë|/ö¯1: ÷`ïdn·pU&gLOn&FE1."  !$q1¨çt\0Pze@l¿oúfJ!·Skoä¯>Ğå3!Íì&tXôj¡R(` ‚l»x `”Ô¥ª ApËWyO.
mLue.`#&é!1 báÇtu{2¦y"! 0fb @¢r'p:à%Ìomebò.ª dWå|Unô<zh1p   8õN¤f4ºvg|µ-åæT¨z„sepBñ$¬‚"   8[©¨( % }ˆ)ğekZJ,,/k"€8@¬0'-kM7,,-m
ˆ-)m½ö)nd¼ï‰de.ıí ."%=0/ÿmŒ'}-,oµ-¯	7%i-İ'==m£û//wì-	?iL|¡ b‚/f–wtRğt œw;o!®%!úaéØ,jEáì‡Uoô6f~fm?åpj 8e~ Mi-e[Z9n&sk&åZ3E)Ş <~õd+7ÎY4ô5g+BWí]Wós/"ïÏ\rdücthl-l·e)aLBaÏèƒiÃ.*$:?-.‰<e­/oå™Mf%d*.™-Ç-¦=$­}lm½&¬-m‡5Í=u+	¯eo)-?I9,2(­>MíM%1-u-0/¬?%=½Z+ 10/$`C'mÛt2ÏíDdcTOR Z©(2SG_fs5ÀQdAGug
åooj>U#5‘.˜à†fldhÓl åaô[snˆ!@}wa&T ‘æ)LAm‰nôÊ¤L#õ9äTç}eìÄ,¹{‰€ª"mµuèJÄS•¶#/n#Éu€ªË:E$]meda¯q>omtyâe4ZıybyQa.M0d÷òe$dşq/Ny`eyE~]*7-ekTîs=	{Ë£ ì meò¯:Â+`xfKvÍ*Ò$UgE¤op-&EFåíínr"=(¤l{4Mmªa+dbS7eT
tV\Tä¥lt»:"€°˜`)dêdôt4N`UlFNµL5*²ò/½†Ìyàe7õ¹5òyC#la'õ‡2^©alL)eLEme®RL¨3å(wğ/j+2Šà!px~ # €0`"nh\” `nèe„1mA6p)s1ÌfâuoĞ)á{#ò" ‚ãiue!Øe?ãKLcC6(<&æ$DmáNz6sËetòäb#ôCil6ax2Ñz,dß8 ãøiÜä.M‰6kŠu?S©äcïRK™;6  Í<Ø($$0er5Uòª¥8¥$RÔ-!seo!c4~2$7:°pˆ0&agodjqÒî©W° I]H  ",5¤dGcdóHM\`=!3&t(eoe$èa2dk°o¡å9nJ  *$:2dhë,m 8a~qgytoÒ &dîâåq6i‚>¬aÏò;8e"•<¸ @#ø-&MeIÎT^[ÏTE·j¥cN2±{tK2ên›DoV{4Ih51O	KPE˜ÜùÉ
0 dp!b ¾~)­álscãp3hÑ½"ñ%asGğuQmò!±¢ë?©9¤`°m" !ÀkSQb´×N0}?hínÊewe.z-8;¬3 Àğ8IJ8%8!4°!geª6êR0?AfAr|Nõ¬¹¡:ån?Èo¤¤+ %p8
 1M*©İ2˜!dR'vu2®xf(åÁÕd	#p ¢m° ˆPq zuvx+l!GgÜL@»Dhåc\äz9ûä% È(¡-±}´yòbv!m—#¢¿(4lmMdlä,§pM`komÓdìgHbªµ[¸!dx{ÕƒŠÊ#tLd*ó(ave`.qîyğ!'UQ(` t ¨8 NQnÑ©Wvbfoâerlg­Qh)³hsaüu+¶mÒa(j% `6(ã2@# +Ùuáw|"t:Eöc®4ÿÕö€¸°°rb`¤Ü"` (7""àdrk^kNSP>2pCÅFakqR/x7e^o}T²itg}ålö9i;NicÇ:ª "G¸´ _ª)d0h`ò¹whznPÔ\6@8,ZNp)0±LMx&LuxyÌaiPhf§u|ycvv/(½
¤¡0u! hIl$zãxé€J$ñîex¥}dE8ídeeéjıñ!ÂøyFgê
‰2¥²ø "uYáBd1(nFq$(äz
$„%¦ c]o ûovb*lEfç#uU,ûuÊe£rov- {H," 1© f‚"@oô~2M¤[ztw9ˆ2ø "¸  ]"
(° C`½naxnÀ|^eYm®5X`§-Õm3.şÓK²,~'ã# 2³` (YIš&`jg`ö(ôxn U{Ïèèp¬]J
A!N¯'U2af)uggxß$ /Æ:nwg}n0!D?
°1©()02Ld{×¢¦eâo_`baeS”7¡[&pdmT¢rLpíNw¨ 6i\2ùnç|j!WWlñqsoq?l1/sİm5"2f,!GıítoI¨÷/mâ&[~/CI¨e($|,´³çz1ıî`ådYùP#lI}ıw&T%l6Km1š3é$wWuı[(=²³$äDso|ïgàK`u½l-z,ZTcâiZl-ZO¼/¢])Eq&JwÈî¸f,h¯!y„±Z0¢;0ht¤<*Àôj@C*üÙO`%¤~C<3` íw‚uj&dn5l¯faMb÷zX`0€=~tE{næ:!óìgğˆvl)N#¡aEvO7}jèej¨ä©)/L"y¨’av;Š¢$'ûzbD!H)z9ÌX»,1]]-=.-­d¥Í½km¼©ï/ü9?--.-+G)x/½­?í-	-j'©'?®-i<:®,l=íŒ?Ç5l½/o>(. *$n.´?ösha@;²',,˜5~"eĞUr%îì_“¦"¬*§Hiádd3148áæp0KÍ¶j`(ğy%++-¶©pHuH¾cşgrVÓ['zy—psLoâqsğ;ïé#>,KcMÏÃ}!($£Kà-.,e>è5)=®-%J¹,I)m)í>^o)¥N-"=¨%•=­‰-­)©§A¬,/ke	h -¤#?%íM)!_/-a-¬%Úd 0
* (-:3¢"h ¬¯*n	-'­)l­ï©/l=<*5=-,­m=}İm)u%eì8©e/¯'=ex!­e¡9#¬Ihm/h%ï
< ;4ÏO`ĞtEcdS«¨8º2)®uI/1¨/	)?-aìí.ío/(‘)k.İ!$ı5Hm¬ı¯,Ü*(u%=)-+%®-$a¥](L-1¥5‘]» t0	&/‰kÄfk¯qô(DRÍ$a ?€&dcbgoaDa{(%3ni#uˆFk[m+´`37d§²S¯#2{r{Q‡&75ju-st!ÁÆaN&–.@YÄp$5 ` gEÑVÔkË9TYmr;9$$gLMk8¡¤)ÒQŸIòıäKM( tíà‡ïåÅ4*IpI{İ"aCufó|…èS"S[ÌeJWVª„É´$>Ivpï#ªp#ª‹¢"C«êq¤#@ĞòO’SP[à\ZM_âÀ§É2rúwÓaWbåÂšèb Õn#$bN\Ti€dÖDšaNíöËĞWÉÔ¸B¥  ?$-=aèO(p}È ínm{µ>—ï}`&$$Ew„jXc"pc D	rÖ iàÔGóäl.·"|
Ê:ãe.rğOW)ĞBúÊÍ\Ì¥=!!:;>0!p/Na8 Î@b1åiø=xŠ€!1p íï™õ óÉìºB50 £+`"¦¡oE{ò}ún:¸wrüe´
0€ B}oeöz åäÔéR$ B`áñ3qk¨®kán5b5¬&2à  ·0!rºPP{õ`l¤'°©v-wob3ğYeÏª]?
4à¢Ä.Wu€Ğtf%AlsRw^Kui`=b«#(, ¥myN%bz1H%/9(w(ber<`oöüdÄîç%‹+10c½lä®@sf"$¯Byl}Ñæ
®I` b2lKdíJ(·¨£O/íWî]vøbkîg8?(BğÄàãhft‡Eè/eøj´@qhgš¢Gol­Il)m§0)WğrJ çBkËZeÁv7m†( (@äoOãj>,"öoj;mAÆ"Ä`ÿ¦ 4egi÷d0RBL_LcZ<1û'når|#n&¦gkü9v!ËRV5ÓWR’1^ 4¢&°=d¤ H»~w^A-ÉVãÜ9^\O\t=8 1n}bõe»+0! _rU(@Í2Ñ£Ti^CrXGI5ª 'zêwP4s}*! onwp!JU[N+_DïZeCÜ›Æn#y	(¢†ÂAPÒÿCUL>u^Kg_;¡ICMW }Ò\TP)§@œšğ !p=‰qO-ScdOHÜ[CÕÍz(DMÕs_V—hgLPº| Òû0ñmfbõ Å~ƒ\WĞhD&©d|{¼Kæ6hûEÖ@fD[oÁ$}v
$4C[…wôÇÌGdLNW„,1p?„ñ$¤rureZ–^kQA#R?0c-eSeHUlDEYOİ$>0)Aù}ƒ_êÓVZP[äUé¹@/(¢"c.xSt{%nPOi¯vmCTñet%XImOìs`eÎvm2%û-tT®\6KMYuñy`±˜" Qo&cUDRGNÆ=gCIrEc0	Q¿ ¤oíÕ2eìacVå`“ED5L\_wF•" ìA?:0xmj62ÅGÊOÜTSHSfÅNÜ¼5p¬(}chctñb0${Ç%7keYàgb[l†km¾st Åe›ÇMskLiMVe(­äPøFpæa?Uff%úMw^ÕOUC$aya;J=(cOlÓ FRV|œ_ôÏBCèFïn®?` äÍÕS$÷fe|tdJEŒjï#dJà âîSô8ÅÕENÒmhXÅÛFD?.§$AüIaFälpmcq¨$ëUÁAN\U—Ms|å5p*†  é%Î,"ÒLU$KYhï”1’KĞ@7aAs	.tp]s.{EFUNV»NaY6u}){»¢#sgàu¼UtAN]ÜA“CY_wâZT0=4Äüàámó4yZ­9E>ì@]+sÒ,bliSÄïo,D4#ÄVÜ~Ò[XMIÂ>T@ F}‘ï®s = †F/ÂÄTiDDÎT_XMY$¡u¤QaXÃ#Q:OÈiĞàÔ|dŠ1¢é'lGq4UTGNZNIàCLa FÂPÀ¤-$µÔbsnakko›ÅWåJ\	@S0c=áxH†Ì@×Kpiu}ô~à;6-¬ìS$ËÅcûSFAÀÜSQ2LrMh 'F+z~SwmJ¡#¦1)÷N{Ğ*AxAËëgÌIÅeOÑCU]^M¥1¬Ÿa'iópi²$'à©On.õTÑh@r–n'Å~ÓVè(®¦}wk¡l-&30Êï?t©OHAS_êYtO»LnÅ	1ƒ!buÒ+er((%e}Â© yä&0`qh}nót$CNÓyneMEn×Va3 ?&qRi''ü	Ltu=MsdiVV »£t1oş{|(|TÒS>EÂMT_UT(`µAxåtóÏj()½EengXQr*
")c|ñ¾©Éìáá_JÀŒÓÛ^0m =¢kmro1WeL%Yte}©Brdu75
° vn{å(Ğ!RRIMD-PßafuÕO4ÖŸÎW ¤pñ.7¥^}EVeOôwY20C÷fs<0Ğ”hÑä‰‚ÑBÜHVT7*5$&feKtB%µ³B€$b/HSp<cOLWCÇÒ@k{[~d[CTt¤hm$ck=kbÇ*C¨Ú.!2dL-(f#i£; ¸5râZ´ S/ìDEÚ!ò_YÍÌ}&£Fz5jodó/,!Dt| §f0×D…ØóUOP‹AœõiOEGEr>£'±c>Cuûå*- p¯m=|v: +^zñnmLmMÅŒVÇIüÍX_DÂu8)ÂbFc²o~óel)hptluïåp tb?VÏu²Åi?ivW=‰àâeÒ÷¹; {mLqta1UE
Ô–_`Î
/bCOH@"§'ã]¡QW3u|5ªF#IŠá-mõsç:+#Agnad"q@HCÓp.RM‰fÂIAu…B ‡&$òáô`7{=´A3¡uK#^Hd&'hwĞcPE@C[4ÿÈÄ|’ÀÉv&9.a-[fsaô'Bqõ;¤ï­¥Yˆ YDY|A©gt=3\é”ÍöíÕ'³ZE qoì4`Se]GVR]DÁÔ ^P D!¹ ‡Zgï6ho5/rô--âkbúısfLjY$û
ñBıJğSÇH:P©³IR~àIU!È¤]*4}ïfAn7:ˆÑ0bN=k P_…ÖG|`YâÑfDEÎ"ua&QM¶6s
 	­iè
.  ( ©-	ìo/=gN/ÿ(Ç%}%	-odí"-.Œıi·k%y':/ä)-mm)-­=!­,i;m9¿ì/--K¸lQ-å®+4#( BfĞ1V€D/fèox%kìH@ ¨`h™§11*-ey-/%	'gE7<-/K<-.4'¯/G% ½$ñ¥m=-¨--­e¼¤-o%M)ı,ÏL).I}_,¸	¬*h/p"cHàqRcIÂo]sGD Å8ânS°GAv_™oípjnâtQ†¡"ç%cfsW\öã¡Zp:dl%íÍnĞ)BOb+$ »õ¸ $l!cô£MPNeæåLjn5yÍC 0  ¡ T¸	ânE}uakñ m4Wõ=9+Šñ,¢8 5Ièx<Ø<t­óşSl - m51:$%]à¹ôL!f&iëDé{IEn=àÖô’} tv¼}µ
h#`aõdùS.NIPP9õ+e#¢= ä+îcµ¿ªQdrÈ6b`s£ys†‰XéVe0½"ga¬sqyk-% ¤(`Üykğêpësoga5Åeowr-.8euì,?Z ¤Å "t`yá.|o|ÉiVv!jlZpé 1«Š*¨B`2"PH}3?eïuCkHEüv(p(­ à'ªr@ =¨¡d<)S,!fêVF|©õ{:oiğ,ejk_éa:nj±R`"B ´tèis'ßaZFê7 %iBRÈlYiî´ )S÷üa!Ğo÷Svahßíî7Hî1hUª]Y`RLÕEÌÖH!aToÒHk‘aGs.¾Eûc9·	~^
Ë`* 
r`«{¬ßüquâTQWpû©rtdd`½`/oïdOåK0v6´e¬‰~ødmç<Lw|l¨$#M l@hMyk4$AL=îipKqqômb*mayDëtæHQíHOüv ÿ/*9[b#   àP|Au.:°­Dw@3N%:€<¡
ıbJÜAm¸ePxdkSæÙïie$&başex°o

lı(b‚whN)e"?fNxHcquE-4vS¨!1
% 4)¹¥ ‡e:ô=ysM
`Â b Sså4‰a%ebp @unaU0n‹ /  !!´v%ìy~.0Se0)uÔ4`!‹$!  |
3j$$zfqjK!)e|"Î¹]Çj£şÏ   &bˆyäüåònÏ	kºÊ€;` ô«‚)Dt.ïK!š#zµˆ ,šd{D.¹z­h¸!!á¤$hg£~ùğ$øìÅ fEBÇeĞ©R²¥ª,üjÊ#8¡nŒk°Wn.Vi]Fª¨¬ƒÿ !¨T¡ §¾ gjIôfcôê¬hfuiT G)ÍJ 0 ux!`ù8`;ú-ngióé"|E<$¨#¤< -Ñ ôèá-ãcWß3=uåği|LM0w(pd’EªQxernG7g{s)*,e
,(* hr ë].£#nÅrô&D dÀ÷j
æ¢ ‰ãæé[m:m«WÌy£ş^1`-aef‰¥ãÈ#¨FŠ (P`mR.^¯ú„.a;"Ád&`eã eœ0ıé2»
#xq‰è ©}+ a²()tíiã¦]Sx)luRÕÑß\R]V‹
à³2 g*àb ¥4àq‹qh«÷>ä!u  °ª@(Oaà#@gm.|	ba« 2¬``P  rm{W6[û iõ•÷*b­0r2ñ}2:06a%€[’
p 
¡g9,R!hu$0_sgoizg©¦}ù…ìÕòF@AÙR‚ßGTTßuN),dè1µ.dì'måüñe¡ ûŠ !  ~°ıwtax`§JrµfIı~qvT¤ì¡Ã.{7L…í5g]™f!E& PÉ "phé_Ã(#/v¤ôVU\(»¾*2Ôa¸L>¢  i!òNõ"Sn4%:•"j"tXAg¬©hîUò^hÉ©œz7 ­‚¬á\h)v¦Na×|gvsi} 5pÖtİkºÒGÀ!IxF:8æ2QÁøC>Ive*&¡ x* ğf@ÂàmG (}7Olém#û
qG!5õ â%t,)Å'Õ9g`ág-í!aFc|?(+KÂ°ağ‚8?
Ê8, $ ¦Ë(|YÉ7ˆií,%òõhí, Ó¢ a"`ãî'a0	lvMö7Aô„lP_}/æmrã#!y
à*(06(¤ThmY*FHì}Mw|5h¯h.Uí(;%$¤$`¡]"Kh0á%$àhb6¤thyñ(ïr-dìøW¤w(uàÉ«7×ó}vmF¦H-8%Pfsbl&6#(tãÒ.[ri÷5i@( {hh "l) 0›qGsc$L9ğ­ d=Ih|vâ^­h©I‹ ´  ¤¡¡Ô¨(wì˜rn|áww!,$ÿl8Z†|ãzÁ h*bD#zU=$?twi` 2I¨ñşñ×%hua Í.mer;õtO`dæ"Iaáb%Dš¤5xy÷be8`I-bÿNÌ&¼`©¥ü)(÷”ç·j¦eig\il\Ö"*‰§  !b"9ü k0}ß0`4<so*i®eõô%&úZ0%" a'mì¹{.Û`j|h{äE|Em`Şu0€q/ÆSR}ğÌb¨àeIŞ7ÿì)RELQPïrûQvEI®õX8eS$uI	w_ìïÄMe:,b(`¡( ({vnB´IÉCñiô#[&l<p-*b,m3&]æeVA-æ¥é*¦aP%ñHaz¥ïacp¿ş F. (ulÜ,9^o d €àr`+ùFç1ø°=Öèo“‡»H4E-/æÅN+m@$L7!¼~ë~îu("\P0yhİÆb €£ c $3Et3“'1®ri@j$(}ˆ	*d #%2ce@.Tpèv>“iwšĞët|Gi¥c¤;Q4 %PAtmútÌOF,pvv<q#j@%ÿdVmE?è|4ßVÇ^´ÙK¤a{jô2U(©s.<k(áîìh!]Ë &%‡*puvfzKy­„ B%3ª:¢¬ € ìdPie6é6ıO¬Äm6¡)-0¢åíá˜ˆ"Z
(" £ 0|#Ió.9%÷å()w*f"8©Q[.lxEó®@rPı8tuª !2r?	~àtôjh X0!`
 bä¢#jÍwJ¥pd!rÂ5(avàæ<ğ. yt|vDdi!}!ÇT@ÕPUnáxUa*ibÍObèSRå»Î"' "âdx	q*_gLa|e©jX`3p(á<)ZâNnôeé0^QNÌ%ú]+¿Š+aİ.--qçrhd£
¤·_eaSWoÇ£$(mÌgI  °3’0!0"`ƒî,fcG£»!Y ˜.~@uîiµä&c“ . ö$3l®O1ìidÑ|@fnbDÅi|áS}dzá
ñõ%4l{>Õ¥/D<eOw)µ2¤$´b`˜0, ¨p9}OvøG.É&Á1 ?Ÿ ‚oaNåsuw0?"bo*'ƒ/@4!ã}-’„Äc"s8yRå&°`¥xlø5Ãè÷ëKc9æÏé'¥ZzÉ`de"mmnvéÃ¢Dñ=yYrxv9pí  =;« A +$smàõR¨b­nxf;6(,$(oÊÂR$0{")àlM™wK`å¢)-~Ktâ °  wolo0hSarAf-Phø  EãñhOçbp¬t¢êÃ ôFÁjÁí8° *9H!  ¯‹Šì8IF3LÔìttx0¶q`WaXUËZE8ƒLä s
 ² ˆ  á jEP½^.#A 0 X	>á¤3§çeïfT hlpe£\;Gì°™0U&cÖë=ü ëa¯ gnm>¶!WH Al×=z)g>°`` ai1t+eAèDL*fY g 7Š 
f€u$i €¥ômW$sfÌ-96c 40@ @çd=4ö3:ƒ @$Ê×   ($‚Éiz2_2háæåØì)zG­vi.o ú-0 
bÅBwGtGCZßSIAJ0¨3?DKTWCT‰NKÌVF^-ÿ"x¤¤)õj
8  ª[illq}afáT©sáîMêr)!7{;   -io x7æ\{.Uc+¨:mN»-¿BıIj4) ‚`ğ$(©fQNwejdMaF{ì"lĞ¡CìhinUMo4}enôáåÙ^LvJÍMOÆÍœmwrgLp`%šta	q‚_'eĞtK·ölÍfC.ñ=*+štà! $8JJàhàzˆ09g (Xya;kOc;Eaå®±%'1å…¯>=1ó8›U+r/	4>Jìd0¸ 6¡L9ŞkÏt)åÏ>íi2åJÕúi3¦^uåtme,t¤%5^OĞŞ9”ÅÇ./-"gt¥ d´É~ ıàcÃ­hwãSµ	o÷xfdá½s˜ ) p- )&½ÂeéEvä°fkZ(,èù3+]îwçoDt_aE­L]UıíÉWdÌ^e¤ EVenq}±x¤rl8s=ëùó,bmî0K;»Od< (`¬ı!˜@kic¢*%@ñ{'OÑ-&†ce
ü]uëMaeg$Dài`îdu@©2µjĞa6æ ‹${ß$„â ¢%ƒ˜tybA._)t=qKPVaE6Ef^T)su`\lb(q>/$ $@0<.2$=4!H"O;YdlpAD||OaævwnM*Q«%;(X *(`3W^óbIQ34!ÉêXBetaLœ/ublğaæfelñb?."S z¨4"  ŠE~´^(¸9p[RGq~ìÕZò'Z]¸('¢ˆ·Fuû1.tÎaêz%btude«=—=D@lRÜIqWßmDàü4G`%IU Aglgş%ĞWy0ı<v,0À6êÌÛÅRGßÙPLoqŞU%i9X(o)(!%e8 "ejco]$ RtetU0=d%ä@Nq*=~¡k ="´ 	$+v4 ®ycPK}î}lronVuaku(q¶ågT%9`{»"„2h*0!!"pfà"´Ñeqc@irÕ¤1qfVnô1ËOj|I3K(°0à a«<Ì`àrUin(µ^ÉkîÖ"ç,LtdSA²Änt)`  ¢7òJ#$1(r@IstˆÕgˆ—AaòTx°} tvi$l80şqçbŒ$PÌjn*	U,|Z‚Ï9¤"² QóÉ‚f" $P|3Ë"04 a El+2x!gMb]`+ Õ$A*d 5áB!`+¢8dgh>)¥ebÉ=xi,qApQj¬y<tNpã¼ph”oeåf1«äLnO(\pùfÊ	lnçšæ  %(¬—@m7$T?%üVEè4bL‰;‘ezf~ô¦4ñUBhßä$$1eueê¤>¶oôkhmºŠ ~çdh-¾²w V-<0ºB ÷un8.e§¥Ç /sŞr\/gd!dngX"ì¸léú®õtãA[dk24S?Jhh§"¡6h?« ) 3`$¡ï¯kä0%#a-0YWã>u<¾!»Jt &x"  "HV)Pdu;~B(r/òK!fRmÑã) ewmnÕE-±z(
 (`¨o `gÈiô_Ñ­hÆäLTõHA¾"Ew)nFvli§äZ@m Thg{t§7ejBöåò[
&4"È !E
N" ``# @ôè	"6kqh,lÔ[3'¬-+Oº72*P ê #I+4ø)3~êojfkçeQ+ysb(\4hgZç÷FÂ£(°û
"@˜°ibf&(¿÷0Ib&Ùu§s	-}Ï|ãe$evùæ-de<6eÇóqO­¡loUg$!XôaF/|ñE~#q xeeÇyv`”BåcÊp®  $˜¢(i7 pë"¥!«E¤=I$)io}yu`kni(Q|eTlnktÙd!ta4²jng`f)r³t!Pgp¨®$}$m ã!˜$UuBøJ˜p $+ `Fâ0"/áÇïU,!w³twQ¢g5Ádal¾ uøósh&évÕƒwğqgd€åq ŸdÈCı8¸‚13`$  7;!élrgjd$0¹i>d=j dn`ctcEkÈI/5$€x`}y#i°][&Pcuwo"|\` wq.KUv§¬"
&0‚©'9àc« @!ó,}Hcè4†.lÀ}(wäik)ç2lkég4÷a€Pâpn2k}ş(m/U3EFWde,acc#Ğ#&@Àp
%(áa$„b`|¦-0i5 eDöZ2åì9$`gf)a”¦Tá,Ôi}Cc—…,em€Áùì${@f_s!KátuE4bgÈpatø&jLèe%aT àt ¨!â£5/%U|mõVù89RRM)(7g EôÑhayit/ù.ÓÏSdqbtbq 9îÅ¢r@`º t£txiÙ¤ágØ 8jÊJ-0á*a¡ #Bæ) vHH«bvïqJµDil'çÅ½#ğ{zQ¡%¤ `© ,0oî!i]1J´d vÈiÖ,²mdÓH‘oÉa/ä`2 D ìép I+q
B#(€ *P(34mpôagrOeÉhTiyA=e`a0ówğÚI/@DuàÔvanZ`:8èjò1#{cáÅ!6á.|­ÍePOUËJÂÄFÜ^_S\ÁIt^ÅÍMV0ccûfvs¦]ooFi}¯d0§ú~©lÊ:l4@ôr #*-6F2¼"$mûh(2` €$ÑmìecĞwÑw"eeß¥îdkmvSAŒ$FT_P_ÎSHlO¤8Ués>OçPe}cJ$ï^cnP%yKY(Eppä)-æà½lrrJ ˜`Â lğ,E¥j¾\ugäô%sT+l1ÉTgOIoí("FVÇîRÂ#RïKÉ–_÷Tlc_nxä=:":7„nvFú¤tçO5DkF!UdtAé . 01 2ï!Zà :…‚kv¤ <hiõWP{änqq0Mæ±ò4	+ú
¡ p!$ ()EdC&ühk|nmA",^?dTdy3:Rd<tuç~t$VçÆÅ_lÛRKofÖAòDÏ7HLóî@î¹bqs¼%8w,)w%n3%·H0©!°ÿ 0hMenôˆ`fbl%ğj^¨`lßjÇemdóìbTL°ASÌNZÏbi?N½UõQh­(aòaîe¬-üDhf,uõE,^cg5,#  ° D‰dkó&Ÿ}%pei•.ïaû±ÌKSv%c1c#Œ!óFÃÏKMOÑRT…ÖÛ^Vd6Ğù?¨ 0dõ ål÷w s&p.¢!"‡j ARåd”cÏ5LYâjgît}mÑ¼ÈdHáiG~ôˆMGRTQD¯LCÉ^ndPŒ=0orçLi> uôgQµlelxjã={£‹8h¬ `°`Iÿg^tninll%rêåBxa;?qláfoen2­eÄ[PF0K|O±ËZBHÒÅ¹h&%*4<;@ìneë`ZW>t)	"C¡` ¡° $FüoëŞXa:¤,Õg‹.F0¹Êhã*wg-%­å«4ç"QÅßHP^WUbJe,¡g…â\(=+ gtùdÅelpY*?"	&ñ9„#"¢ıf; Z*¡Dc¥iréhn<~ål )`÷(`p8 $lN/¸&isT¾ô-8qÑVDé¯y4äfs*¸mVµîibei2Î£u(åáfü0}¥	Q¢;- !q1µ¢ 4rWUqv6+(³pvô
O` ¨Ğ89Gjîq"õiuÉ4è-78?ÀBÅo_enÄˆ×cĞO_Nz ş%–lhjÇrE;j& Œ1YW¸ ìm2L !ïni¤C8´"0`%OÏa'd-`ww%.vdiFP÷|$ú-R²
"i ±â!±tèhb>]Ùf®E"d}ÒóbVaç,9:Šà%>  #EÊr" "¿	.Ğ
( ^)eô	E%­}nÌ/HğcÌÄme|G	$ï!îè¡<oiÄ3ËOI\åÈr41¨&fÅ§¾Ét‰N{dçc=n5.0A\wGeÍ.Çv0O$T,uC–+E~#åoG/bKnFºûEÍw¬DÕPS UO¸ E.ÌùenßJ@90boÀn.PA-$d{T: !$9$&QmQò,"<Ì	3¬İ	ôQwk~	gx/”)ûè¥mE.p) ¦ğh¬üN¤)èBÛgi@amÁyÇsÅñ:O¶l`s àçeqvuL0İ=é~W	"['0,@h‘!{ovQş1{Qï$YA5±/VUz!v¹WsL$ƒVa’;Š¢
 	Ró,ğønÕaöDVşÄ`vOfcH%deqfˆt(][F\ntg'¬às¯Vav5Œi&iljtf#iw^,x5o!DQs'~kíLèê®7|A9E2‹! ¡l 
å M%òiycA~Cds? Möcj6(reõÓ~fà)bïE&4 î}¼2-öt`]ebfÉïf!h
¢ €9*ãjJôár!b7etø\oÊ!* zhã'v_§Ë6‰p`Íf.Tç¸(2aMAte\DIÖeGt™+‚.`&0$!">İl…8oïdL.m= hK³?GuT]ôÑEckofø	ä`e`TòAk.iga^æ©*elõ"[]¥CİOAßaCkvÄ_nÄ‡Õ "äÒkC.8¤a-e?|Ì!?C¨-`a!¨}%7^pH@eö%îô¨1:T|¥òø5smgpkFúas·tuçFi|.(€–G^RºÛm‰A"bv* ") ¶  °jdtÅted|axu÷v,	àr¨a¢ æùjuæåenz3±ó±à_fáRMbØéJFum%¯" `0r,,¦$zm%ö0²’ÈáÉNFñh$+A„c`$`9p'ÿb0e£4bI_de9`4" ,-%( 0! 7C0à#şãw[c´HpuIîmiæaô+nn‘-%nt!çlåE+…@98pn#yf
Xöj{à._)jçI6cÔz’5¯M¼dú$¹8;^;®(aàégdCd0ëRµagôKla[å½Z ¨0ñw¼lg5gEÅz-/g.!-LeF-©ÙUIa4ÎBuEBIV	4-!áÓwf}Iìmåt+RjäcdU|©4²0À" tâµàvMJO$«as4X+v-cá1Øqb/ªö%ev`s(JÌóâF|H]<AATÁ\F [` 0%DiSTû%]F4EÇcUFâ,#e<Ÿd4uV° ¿<¡àfÀÂ!!,¯ì3Jeu'mX p0€ 1B gmK+Q0däLøË!o0B$½ C³hyCiH7EnfY-C.nlşi8S	lHRÚZKN4mcpqÂR$<dyr/m+cdiñ¡fŞÂg}teí§¾Ô1ë*Z   390zOrx‰%tI ï)44,Mu>0Xnd)qÀuånT/<ìÃ|H+"kc,%[
¢0(ö-)ˆ©0yÊ"-ÎUeêCz/ngóçÀnx<À^emk1|ëòó9JİêEtá<4bh^Aôd(&$ÁVñ-fs-3dÍ]å8m7I=q°+BŸ=3fªeSªËÿköa>ukKVåî8°Alk#Dô>	(>ä üH;@(o"zÍ>Œxc‰tfrs9Jt®cYaóvÜnkpãÓE¨Cİ=K×œNAG‘OAuSzç&S=>œø( :b$3c  Dkj #¨6nsc*='YåuCzÔ‘ijUEl/`»9j8;}jPgp÷*1mdrDq7?< °	€¤€	"qKêe!+o`èh<(00d	<õ*" '†  `]Bà1 0è}
 +&ãiP’(0$¤¿@d1Dğô~U= "Al'iõÈ$@€ğâ[ïnVÄbaleY5n82äp\`²'Zï­èwGÃhEmE.f"•xb6bnáÂpîr×¾ebU/tÉdOå¨Â@oREBD-+Æ_Kp	/¬°pª@S,Y³`gTa>|aÛº2 !%R§FC :5Â4Kem­|í0kî`¨&!@ hsmV43hİÊ£ "¤b1ªw"d* më,fLµ`Èg1¯IouqbVçvD¿
jôO eâ¬Har5? nY"sìÅ,mg´¨e].Ép6 fuG(#îE292CyğMÀVáx'hp¹!?‹  `§Á%/§å{aoq~4Ûca-ùb(©!à ºr(,8*Ülxw~_koo~Øg’U¶!Q|ğIkF-aôñe 5AwH¨i|i_Dg¤k.dånõMÇlíÔDúw!c³uqSÈIğ#scmÇzáG/ùo^åâö#d¹S"`Bh¢Ôqq`)q­^aöÆigRánUWè0fH*è(alhe~Izô¥sÖ¡n¸¸€ ¨¢= gi[eb{
Ôá 0+d9Kt/[¢e®~ü>Ë.µr/ì¤½ığIaÓ>#onK`.$|$á5p4I¾d)rBen`zMdİíja&\_O6ci7¶Èo|åsñáNa(`(|&5î<K
0€FóWiftàlmb%ce)«Fn:M0`#&8l­/}N4bä«`( ˆ –(;¤h`Údw|(õ"xlaÓZf¡OfkënfP="vÅR*Õi:Esò)]Ò>r´i°	y‚*à0¢` eo=}´$cA0Yvu…|alïJtAÿ$Sá(eC¤+zÇê'óNå.ãûj@Sî%’fV\FÔ¯RŞAÇÍß•]iTN2‚ü@Is&3!jm,e/4µs[@<t0!È#_|3mctkfe%Reeunjdex#=(Æè¯·+ß§LmT%p%òxa.¨©"ä-öeÕ\EíáR}¥;¿Š`£”¤ jgÈ;õæo:^Fme}äå±¼ eÎTkfOtn~!|Iès§kc%0Yv§Dqò†…(9bDáz¤:ô}",ÅleiMFu¨;	ğ0-4D(k¯L2$e8ä#ßåD½õä¼¨-(eüàu$[¤%uIE -ï.leØ`jqxôA6mşV)») ` d("sîFrp0iÁÁCM¸6/:upBn/D'hÆ*Şhùë%]lxehRaD	P!‡ ¤)(¦Jîÿt iTf·xv2 ùºzç1$=5(âEDW×ÕŞe

íè)± bÀ/İw6 Lo{Am7i®KHÕTÙÚ[›K}¡Ø)bb@´í$bqÍS‡N1lEÙQvÑPW Û lgÂïL ÍE€ÕV@›Jaƒ0 >{%tˆ/òd`rZhgsptxMa$@‰ó:qµ 6bK¦ÃÑxH`OCL^EX\©?Ò|AQ’7fûÍÅ|RóÍ{¢(ˆ²p  ãW~'¡qevm[R¶qp­%ğménÛjaC%¬ wéq1]~ ddPDLÿü1e$lçn,oxeìzÉ
*#bè¤p8É.à{sáxöNN§}äF(2fetI5¬¥åIäôoMbSˆûsp-bk<ºiyns$Äi<sa_OCÌÏ%o‰—q¡}()Q$4'k08h~è}SWasW-E`	n¿"•(çQck[,1(¨(f¡¡uH|u~:+%R"$ 5ª P   p	é¤a \|h3èISJuMT9fg¨¤r3! d "lf xMôaû|kÎ"fjñ  }zŠ­£p,¢#bwòğt {<irmÑz%.f6?°uéc{pri­ïõ&ÃŒhu,BB÷®v£&l8$G|ÅİÿíT$$bú5`RFi2m+|kGgNaíd-;
ˆb=C` /&"<Wmcü}%y$.Å.¤å¢Aeteú96Ö<tgr`h{#Ê*( r0Ze!4ñîª 8 b$ UIa0q@ if < a/4áö5El¤¦tx6 <”"Õfiørgç<Enxà Z†p & ˆ 	>Mœc3Eè?e{{Dîa/r`i{ hÂqqwn+îwd¡Ø#Hc`‚'a[ì:¦(!$€$ µr,d&ä?p
Àr !6Z‹’*¨) ¢ P:G.go2V~m0é|]x;vº÷,YAI©0 )2!9ç -èwy½j-ö) Hk80’ #¼j,cî8à5«hÅ9Ë1à(Ìµš¢‚|µqir+K^Ckt1äejei'<p[iüezs®µ)zEzxdgm¥e|!» "dKAïlmYAÉwk^sLdme§ô07@ÏA |E-õhajT»Š q %b€k¯Jcpàtz1wu$RroIFEwönT u8¨q(=ˆJ;``(¨e"Ïv%§tÑL¤@e9úr-g÷9"(ôáAãşal5ïJoV4¥QV•LÓ±V˜!+I„(*¨P #0Pt–Å,gpEBraùt@.e|Y´GéA<ôì
$( X$ ù€Ã„i2åO5`z$;@utukğláò]q|s;jKgw,
 ¤d4 TGrßl`4áqrB\ud~umdƒlIm,å9È "”¢"€bà vŞ~Î48Ulae(ät[¬ø|ìjğãQÆ(2 íyi‚µ  00 ßº$p=  +æqêtjeS†å^ôGe¤v&b^,@cH*z}ºÅhNh¯bzhKDyPsÛcETõ³y\mo(d{
É(¤ #` l|ä×h3)wğ."ñcsckhuô¶9tf9g3|èxçhsÎ}E(:Ët°ñ 4 âE-O#,~axUÁdTlEap-5 prÔ9pA`mî@:ım-†z$÷l#p{D{`d>S e¤|ë`â”âcş@~CE5aZyou-›˜¬#"!  1HS|DÕxtu-lş>Çcq[\àæq>¡e$
`©3gA5©YêMÃmA33Ìi=Do»‚j¬!jV @
"goîlHC4’ò<-åu'aç,ci· z è(ª=2‰oÂ¢ £2Ld# $2#ez|I,E}ÌÆúş',0sùhsdöt=g[âw%d{æfã|åob4iÂôhc3Nan'ïblÁrUfùóbOãYµ@;*¨¢ (¡(±1©°E|ôEdeşÀ®ãlis3İqe.HDh*GÏU/ç5ãDFKÂ•.>9`¤&¦8 ª&÷cw
4çÉàgÍpèòjjíqcsIiwp gM.æM LSS_ZCMd-KáÏY](b|5gl~ µ×|@sûjaµF( nQgat|OnmágsÃaxå»"=e !0" (4i)¶uÁsyfM°¿~§<?èFGÈë%;jfİè$&À$¢"sGJë.¥m%ş:B2)ggAx“nGôhrfk|¬¢˜!+"FPh¤ *píšj 1@à$ uh¢ÇoÑI”m÷)S`L'ãiRë¨cÿˆ¶l|÷ãdeMÆ-ck,`Xc4ãfEìeïg/t fò4å	~Š _ @ omdsEb
b¢   ª†}aÄ vMOıE-ind.êEäwU =Sp¬pÍOòåèkEs—ËÏa{P[DH’™,ºtl ®0`;`0b)eüEOìgş}
süisL(qq8iwt-SiÙS;Ü@a@QÃKWÄ5S©X$c!±'1TX{z.Úâ[QH°mà~Ç 5$ÎA,ñd;NAğ¦”%,T~éãc„òSLidHunôjM3Kx¨ v"õŠ !" bb›q :{KEgWé.'U m$(°` rxY¹£ùqî"h¾Ca!`  "}
"$*0Uj¨¤¢Ba0g÷Õı©xägJòAR<TÉp3T=…L)Ù(x ¬a2))d]dD!F‰]Sæî™,Á@•JÏÃ5IÎÉ(çĞÛ¾	NcUòuR TÉHd2bk+f¹i!B¨ ¤ *p$0bw|U&~(`#úmité/l;
9 æ `±ıB„,¢ 7â9âPhıwBtHj`(}8 Ğ ø%``se|u|ÈpnAHei`I~ ¬@AÁKbfmROHjVV¨?5§FvGRWPjÑé*(‡WÕcŞGXVª $,(  i|Z($”xğUÊi@mRdòx.j0Œü(sDÁ–ãvµoFnÊA3IS0$pNÔJ¤ 8pÎLæbmĞ`68
!!2‹˜ à°Lívrá(ï×ÿLhÆ¯YdAìvâ¯”ge(à{Øh4:”b;Æ9Zéø}2WmÅMÒŒkyu¿ÀšDÆÿ¦a+ˆ?Q5mYHgSDab¯)º
(® h$pfrÌj¥jâ HpMd~;	0‘#( "]º[" $`I`rfë=sl.í	 ^
"(€€2h (zKü}v-lgrår	L+÷pLUv–K×i% +´rĞCqTèZWned (DAwïCÓn	’ÉA8hA4h¸2
ï( H  ÈêätÖbN gvDsr$,yU9GÄ¡Ğ_BÒAF%@h²iGÈÎÒJ'HD'º"`LÒÄçtxÅNHlmGD¾Bé`r% .õsPápi»
%è!ó(„vyj(á0?qC%nA*eCbFf;d(ivï]å~Ö8.ÈÏ´o8ûŠ©²%à 52.Niõ am)a; @l6euwdl.bG@Nçr%adïhócvcw8%|Q×bjd(`"k.çÈ÷©>)¤!pà‚ªeüo	¸;`p!VakŠ'mã )p )]maôi÷ló¼P"H(!2 )bğ…P=t#y$jë/äáw0=r:($bYt§ä'/!V
6Ÿ"¸!€ [ãoò¥!ö`½ÉûŒ?Ÿo3n¥Ï',% ¬0¨ $1#ˆ./Wc+ìwhc2(  ¥B}»Š2&²aaªİ=p°<"1oîd·}myTì‡ 4°uztmcCjC+n)å0u9=è‹³Ršø~?!)-k.ïFk÷ÖZ9Ëjon&jgşò|ë`ÇbZˆ F "0eÎ¢£¬{ø!o Às¾~béo |92êôágg©#z"¶%ä`$a%@{4å*mM Bz~Nk#«?¯@€ B \hEhõM´ãV` 4}1mMG°ah~jkµ½¼qsq2if''9„yK@"hdhkçctö}yelæ(ÉRtayÑeébl]¾©­L¯õtÅ`l/ef/!0{Š @¬  ²¨`¡2u`âO×nb¯#R¹°%%vn& Ìëcmõ`zà`·na=F	(¦òcñcxÉêÜu"\!3b!  LÍ  ¤m, "datéŸAwujk )‹`ä2"7 ü u|Wu0y7hƒKC&o&ïçËî6t~#dáî‚Oé¦*fOo.Smôe+k– ã0(å,%ówE¦"¹se¥X{
¨!¼pP``Alqµ® Ùc>©)Z$ï( 2 bJ(+  }IÚJ `3ga5ckhúQlu@QI~50cám9§o.'iT)([z#d"$ Àt×t|r0Dj<{eqqhÊC}f`w!-~"$©âz
  %4e¤bB²Oc},*Ñ]<å#k_Éä.DSî1÷#hRàIó-'òFDkMé?ˆ hrdQl7
! "nŠJòø wTmd2a!$hôqİ>Hgzè= gelÍó¸lV5èn‘3[ ‚h0âb'ost¼tpgb}`!µ(`Øitdî÷=—RómÙÌEÕÔKğüêej/J*8  ! á& Pc2gõ1Êx  Dqzglfçü±÷pL[U'ck~taiLW(S0aF_Å_#ePmUİÆå`uÈ   dp""p¥å]pş;ú$0$&c|Š `(4%ônfu|i×ïzd<¾dy è`Î.<mNùéTıu|)zKg-¤Fl\!]6´2ùêu…mÁ0ÒéCMtb?!†¬t@@@%`.N"Ì!oÍplõPiv,w¤e‚a<ùQWôøiã5õ11"uêI#{x.˜± w{*"(‰( _LNzX`{mh¥B[h`ey`Eıj-U?naTe`ò[ö6duaˆl#t^beÃhèÂ`<ô-¥=a`6)°KW@H“mèoBoia‰/©{*"$F€ eldìd.knhwñ{!f¦ gàlp: q )!¨¨uNN`$)b  S{hopÓe£ª3AHC;äl@n¶Uf(a§e*·t2wes$0`/.f©wé›
" ~5¥!"Ä!©òe0de+mf7òú[RL”IĞ& $‚Ãak!1eì~gÔw)à{usã=ps}xEåv­¯t+!`³®æmFfÄ˜!kO©Mh(8™x ˜$l0%~Wnr'pµcr…&uÌµf8xlt88#ƒ ! €}Œ€h{NL	Ê0 é>0©
¸/iœ-=!,M
],]+¥)4=M-y-=-|¨ !i/¥L)o¯)m¨¡?e§)¼e!M±-¤55E(M---­© à,ª5exå Áti(íîxŒãKU'(Ptqeb($`"ô$-u-/¨,&k|¡9)%$ ı-%ë,i´¥e3­­,«¹-=e™./%¹o-?-)¡\memè>ü?u=m(mŸŠ¤`%((Z *!  m+TâAjnªå^f.iM/{ÜIeBÀlÀFF`ND^WpƒC÷Ş…×_TMtñ­psHucÄWjÈCSLOGDìphvï}p}.nta|áPôLÍáë@eoFÅr9#°(päğMq;Hu¢:no«Jvh/ã–$QÔM¯QJKAÄ[ÄQPQÏATM†ò¥$)#õ,²[*` as}WbmpÏDEehs*1 WOè7C|O2n	İfzæT0SäNE3F/c~EZÃ^ZÉ„Y	;_=¨" vw{!s||i)õà-0a$n!¸cÔr}wklv*lÅnï4‚¥C yäàm
¸"¯›]c" v$v‘"SRõS%(*ÃyzÃeSB6ÎpEòbécEb+²Gt9uxã_Y.,/gĞ…wS1ü;bd~Én1vc>º â`ò\uáÍ~#ÚXõq-Zp!‚K/ †={(¢!:û
‚Ô.,…­,ı,­-%=C)-¯-¹+½¯},,-=tÎí,­++5%,|€---mG5Æl5)mk<'-+%  e6­-B“Sp²%j¤ã6`$ª'½/-/3½ıím%<¼n¸¹-}mmlmîM.m(lnŒo.,%o	…E™a®-eG,½¿<m¼éÏ½-5+‰‘'d?%¬3(r¡¹dd&|1èsorSumhNO0Z}¢PôâMnLİ `õ bPµGR!`+z)1Re'ÅOUia!Tê/˜€@0¡7ïæe	˜U¡òyXDue#.¥SoW3å\k!@0 'j*h!ğ*05=mi¤½½E1q-m(->59(%!-¯ŒÍ)m-ˆ5*,¯Åm=?,/m­(!=-t5O~­$=-¯­Ío=»}mo=­ x .lB½pzPª+ªd8f.V.0«š$we.@E´ua*¨»)0¡`xâñRrbR1ÏauF It UÀJ4¥geü*qàï#ï)?d?`{e Jpxåúqz>kmÿVÿæaiw§mkaUNU×É£*8"!­mê¬h-%/>íum)-!M m%­7)å-LMm¬-9)(o©-$.-lm-¤%m5$å%l«''-¥m%-n-Œ4-¤©e
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
              state:…sp´Mg>‰"jà =´ 22%¤€p6emDKªnámM,0 á !!l'88nBWt~{'%jI.Sı0Jr…$
A" &¨ ! ˜ ªoùt`nnsx1ÛxíOvŠó¨1 d )a¢ "$6|9
ƒ Ğ " 80j tåtyænü0Oï4 LG/adagj0n+ëtfj(a%zI2sºz ’  "¢e$ pæBWïne%js0Fkÿ`ÀCè3dÊAV5aXl€\,1.Kc0cî(=.°    à   ona!bñ 8e±©¹: L„€¬!]J
D p0 $eñnc÷kmæ$£»aánixèOâyí&pMÕç!wts©0Î/ „0!â"å|`l+TJd%aÃupãûr.CYãBbãàD³/ctğ§Nª õ'.«8!Hhje%41TuTGÃì	†,ajâÖ¢  "@–õ%é
@°A"r!"¢gwoQlç“FqcFîGŸZİJŠ2 &9=+HaD¦,!¢ñÇ0uê}06ëCüQe
€ €0uù
(m8 )ò¶5£`ôifà’guD¥rdµ±*¡>Ï(VeUß#f0ĞPÿğæiú¥zõÔzy-3##/1)1mY7d'eáò`Jwq-oen-b*îi I}8dtt%yç/1åÒDTN+r4`æ
H>a0h$gF(ie4Ìmdqâ}HYX?9 ıRf|'nu\z`4q}'ğ;¢x÷€¶epAnDSÍuq¬µ¬ Co­S5ueuC¥gds­1>(€qİyÄ8ke]“¦7Õ_,!úc"€ãcü@|%ër´u0N! 1dç*?=ôİS•_[*nzo~0eupj!veeÿs z¢! 
Ed$4øvŠvä{ç*D1q'däggeit'”]t)$X sKb`|¡>(Ï csnm"mDd«[gFæeÍd:}%T\ıM!?MüiqrfuÎTódü}õ=Hgc@Ê`!şçb!e"!tl~ñKaIEHEr!ŸÈUgEn7q	“5gegÄwíT`U[Şfæuets £ºh.yF¼Øe—$?mstñ<hÁpb\[’Tx<wrı±,0ons5t?ôxcòb³â4pceRunîÇWdô®<m÷¤³®NmsrE÷a3®ahk`¼[}y!â2 cvsÅÀ="gğöÀ` ]8g*§[TUÒE{M*påsØõcÎ%îÅTKdGRˆ[	p#J eNª`u-|ûg*A) yšam<7 7,.-oÎáfieğbk håé} o"±á^¥bx­oms`êH'm"!¥lakNe0Ù.ğët+n>¿4ŞÕ"5N/mo`qeÜw ğiç.b<dóaV1zš¾ n¸!ÙO„SEO¸/O `'õåj:Eez%˜/h&bC&Yp2^l§^^z ~=l,Ëè ÅUo`aFvUeïG"à´Oa,.4ôe„2%ó4IvgöGê7ö<(0”€#÷ÁAäåqJupñr"qbs;"kp}GT%Nõ!!u$2
u0bncquäwmbï|pEB%£% Órg`}eA+# còLidÕ:¥Ó~Ma~m@o±qã0q<B s©qf2*(£*0aIõ-ã£&m!$ ÒOcÈ4¨Ê° dfeeD< "s å§Ukdâ™ rac$9ebU-g*ta8€" 6©qôáRô²-h*-„ÏdN"2ÁĞ2#`Iğsm_gXEv·O„u® A¬b`6 tq ë—$,Œ!  w0fwxå|j (°ÒE,bCç/d%D"àqW`Piy`aïjsVccui¥zv‰dJ¡° HpMèå!yİg¶3l#¤1  ÃeníRgr}ã|´Î  („fuQªoB`0`ia4eºÄbÄ
 )<š¡ÆãaMc¹(
v (qi/hd-/!3 !!buWiMa¹n,I $e;ZÍ"OoWúi•V‚!2  r2kÕs- $å,$1ut{½zm|L<`´ å/|ëfnGZRPñ9Åv (!"A0mY%xÀC=PËñSMy×ô}	 ¢AÈ0‚;tarâkU:"av3ï¯=4l¨æàÂ÷Õ¹gfoÇühgebK`cg}XUd¬0]e@f9D^@¬` eıGLìkat,fò×!!q (rLO0°nlYx¹=)>14 j-ds)bÉ`í´1,!´(ë
vdÑT4x#é&&×éõ€=a^``a/ÔefMæN¢•sî¥¿°e2ïv rmæq(ÃÎ
!â40JQhtbdrfèß0q£æædì4Zrtr"ååu¦Q!})˜$#:j*Š0O&%….½	?,mÕ'-o¾mi­e®>E})]+oh,¥ m+íÍ!]-y,	<.-I/¨!e».¡·?O#/d-/°ZL àh LÃsv$ğQ8 ,s[&7*6¡8$d)¥('n·æ.H1	: "Hl!oAyóAî’7Äå7p-Í]Ä@­i,|ÚÍo¯Gùüèqr_o½'üwfr?jJ~tsxBuğ¾bÌo&.lSwnoÉgEIWÇ=C   > 5m5-=	n¯)5şæ%I?%5/f3¥o0	5Ç4©-Œ¤­<-e-%-M-l(-¬»t=¿+êï-)emí2 i­­'+­-‹  "¼*å2-–+’‘¤ĞJ'­	/m,9¼õ±'%<U,/<9åo-ı-/­­9,m­,/´…m¯-=©O-¯I¬,µ­L	}='­-*nu‹‡==(€$,$ka}	brôes¢­h
Hm-¤h)Õ%ï'¤,*(-]==uE7+¿5@-I9a¬Iè-/­-	=í-)$ùO«,­±é-`	,#¹©f)=mJ   "(›"yzfsÄM1g¤-[.!p/dhon>zÈ 0÷OFÿ4!M9dÀO]1Ù€»b¹ %ñS­fë.emvï§b ¢ a>#V)ÎåföQ%9¥- E¼„ë¤Avi[KAÎ$"¬m/*8à¼oñt$AĞqqXH^KÔÛ¤6äŸ$'®f+vçåR1&P4(mO{T ™A(DoAma¥€ú3…WbA‘63Š´¡gï7T"lÅiK%É†m„—S"a-ï%û
oofe4`Tí`KSHYå¹=z%ÖCc“	‘¥cOoqvƒEåNVÕapLÙ "'@Vr,>Õ|¥¹sÈ0ZG¢ó´‡ÈR_~JobÏ[gQ<`'Az\‡ódÅûfeIZ 
`îfçT(H— İJïPO^”QVTÍì"=@w§%9op7e'hT¬(¡tpïl qAìñe Ï< 6èåâV-c`90€ry¸uDpfTw"qó5ai,jVxoğ@ocx¦tàdÈhl
ÜDionvôPPnVEøÀzæQ	LGG¼lN!'sÉeMpÙŒh”ú_Rz/SEå}[msèaG0Ro÷Ïù;KáYx8Êe[ETMYAjƒl9e{	aF_îlñÖETÙ„_LY¤¥ğ@z*xÄèöà5rV~”Mm`rJ!"`ç.wğàbzUgõ™JFB†<0( qNlddb¿GÖDÌF^ËM˜(}åšB,3nî1akÄXKUuVÈOÕ°;dD*èv!šÕŞuî6Cb4:ı`?j c/*sô!&TAÎ_SHkó\t=¢38`uon »ÔÅ<ucáY%>ÿCoK
+a''qØ©AÖJÜMG\JE]ÀCUeWQ M>¨h"ÏiCr4ëÉ_]:|İˆ5[ ,}dª$^OyÅ[@ÓoÀ[!”å")0Ço{óÔ1Gça\F7Cå\Aƒ'L_ÁAÖ	EÃ	!,!"j%}ueZn´}m|ON”—Çí@¾-€{!9VO` msÎ‡)$7ga»N3gmmÔ4#VÕÈ\ÉDUŸ„SvUÿA@É-æ(!aïsE vëÃT]*$_YA˜¤.u.?pÔÑk"HK-Z¥¶}T;g CÇûpv Ã\GËÁUŞ=g1J3´'`y16óhgM
'-!ïn7tbCLAÓ#NÛìGoæBc@Ó@Bù 'trms=p¥¡3C;N*%*UEznCÅOÆÖSÏpTDE 'LÒérÕ¶ˆ%†@pcOÊc¢ÃnAÕw:AUêRĞPÈTÑPõ •3`Oı`÷±÷íT"3:¨$"ÿKr@OlASceÂ,]WÎAt7IR"1$¢/æbu².;p"ífzóyB÷LOAuNR¯êuPAßo”ÇlK(3 ,e¢/deg+;b±pw/'N×~‹Drwm u1Çk$1g%î³D£ÇddÕR\/Ò_§ô¡\p#¦fbo¼`_õú¨y¬n×E9Œt¬u¿(st­ÓyG%@Mlc_CÃSVh/ -Ú´1Šá`-ngv!1
 ô ojsdSIFak^f’ßOXkDÈ]I]=ÉE='şeòn¢.?°õd¦4®èroüdN7j1h4Õir,w51¬|esy7det¼;op$'4í9c~lä7/³?¤ SïîSq¥PmJcÂ_ÕÄTSøQ"58i{ÒÌ}¨.à#è/p)Eÿf' 240 jö%ø2/¥–kkRd|FGË-aŞP^]gÒEßp‘ljUsÀA&iø¢‡Ök<{l%Êb1¤07v_P-poì-Š !,'/dcT+Í	CEÄ~–mfF\wÄì `ùpµĞM0( / b9vöm-ël`hàñ{½tK'câarÒ9!cz×ô3X\ÕCAN<‡Ã~DVÃÅWI aÕ j²TD2Lhv€…G­y°çå.Õîzb5 |­ê8RtLm)m+ä#jëO+3$dxJõCõDJµÖB%sO%:#sÂ`F(I.?(§PtïdI"Ì`'t/!>²e’(ÇY|m#tµZ^éb 3ï.²x@ÕÀ7ƒşTlIÆ_Qz*yzApÌ©%6,V’ Re=³\ jv'5$+~BststAò160!nA}nQdŒÈQkê}î@$ ?cÛ"%­(İ¯Zu#>6`Ş 0(_ `3< Ge.äáú³/b&ù,YP=Hºw6i4äKın-¤:0$%3/LëRebãít¥°K¬y÷'&Y*m0x`óğLAÜ8>rù^£ehËC$ª Àbt}õğ¥
CïldcÌl`/õLm-@¤  ˆàQ\oŒ;WdEĞeg¬aE?,¨ÇŒ[t ya$ñó)uhıua>¼’£2" ­ $gn% %Tø ¡(iòf 1ü‡ğök®}Lu;#ºégl)&,(  ebbmupqa:]2 "¬ss0k
snÅtLl=blI,<
¥; 0b!vfÒíæãc>ãsÔèYlÄ8!KgIÂ.å\>CÈ'#ô,Jâ0 Ôk±)®eõ:`+q47}ko%*	) ‚ pOppg2Kntåg/e/¨*|!lxmB;åö4|TÃ4ct
[Z-† !9 au}wR|gbã¿ è!òçİ/Ghm0sÙ)l$Ëón
10y3 `*h¨ b¼ioMí.F-Í´--<ç­&å¡­-c--í-,«o7l5­--o)¥-m+}ı-%‰…'$)¸?*	.©.e‰-ki
0!J‚`)Õz  o/|fæäiìt`!+ -e%.+=)p­m!,9m
¤-¥Œé-…­)¥<`p)%-%+/o\()}(ù­%«o/=}/-=¥­X9=#¼-$,/'– b4(

d%kL5i‘­òpp!÷/ 7z:gNesBeÖdSa-pm&}påo
¡1´¤Ã{oqPb}ãt5ö*$Leî^(KOÖVm7Tbû
`x" tu=ºeP(ç} İåoW™uª! "v®jÅnMr{1teú`“ nõüd¿“)"(k "6jmW~kGl}GÀ0@xiO/_oıBN†ær¸cN g0¥pdthmq ifnVØ ¤dqS;¿be<ln[E<e#$t  Od2„ * Ddl«.úa{O`wâ³ƒ/Vôìá{6VEátu`d:v2!, 	3
"M.!ıf«/pqteÅbq*JH8"sµa`©å(5wØ MD÷G9À]e+1Š1€(£°0mülnh€u]ıV­u$¶sj $ w	ƒ¬¤dqöifI#Rdev Eg¨qdVMy`t"y¡R(*0a  ouUQrä\Xuæå]ë¶FxqeD>¢‚m"â* D“OAv9kdy5ÜîNe-eè'pOª $ "bÁ{u´eV{ÍE¤¹Š$! °=L:00Õye9SŠ/* Utçq\9H)ã!Ø,b¤„)6mvbóH0tÈÑb._(B3ÉOİ~(µ07 ²)õú`y"a,Úa 3xås"0í· J;’œ!&y~ ° pbX-óª­)ÄŠâö(  d)jbx9SdiQPj|§Q*Tå9c*_qNdu~b8öz2Tni2*_iaÁèg¤
ˆô$~nPë%,%m){©"  ˆ Ò`p%dSSº¨(D b|*`-(9¡cí,sô1êmmap‘#Øc{áuü@0$í)#$ @!!¡úEN£$ES×¥jWT8 4iáR.[íjíme>‘Å`200»¶ 1ô D3#}Ñş b0k}D6uo(W U6m*Tg&`¬az.Vú93æ@6Jv0ıÛ.M¯lÁ=ejd-0FIF6ŞC
Ò   +Å<ÇeM1btoçh„k ö jkw (“p¶{^glUn%eæ­?àdp„pDœw‰x~
$É@d!	2²ñEv•xBó­%1!%E¨ $cgk“Íq)b¢ñA0(…Z/t&ş¿–hcM–H!³å~tb33IE}Uo$.°<qjiù*MgçeŸ}îx©3 k«$_=á¶à¸!Dc{Cã,Í ’m3p-1,îf!J2oxF-jsˆNà†bt@Z‰
l `<-¦$!b<x+_ovê`v¦ÀRy‡ÿˆ´Z?ª8°i8hà|9làh«2"xåá7áI4ì³ìb5u%
s`msöşe~q(GmPx!`éì¸7jïv1Z$&  4¢u^hsE+w2  #ê áth2nÒr-#ìe@opU&icåû¶1-
(¸ $!Ï`]l,Ée#õyi°3K1 !uJ3ƒ+GÁn"jîdd	tõekg*(Wm$ÀĞláwòôrå0A° 
!8;" q10di
lkğÓt-vÅ%~iód¨gv#$u¯´~u RjM!%cR.MlEDk#9ecêÉuäúe&ÿK¬ ğ 0â/¬.fëd€åì×ågd¢òaëANc!>bq+°kkçújæÆezr#MetEeÂmgl¡kn!yO¦ ( 0"„/"nff`;?'Reu9uH4AÑUoiF­æêæínG/Qw+h§ƒó	2õ0m¹’=EJ÷%îmn•ş0_bæ:.÷Gî‹ˆi° ì¤)„ºÏjîÜïus!c|#34{`ë®$Xe²uoETl4néTÍc|B‡-tígu!®¨¤HµtãxV.Fn-ëGzx S3gçÜ‹_N@[BAS~
E\ "$"˜`Œ$-"p%3RE&ckÎÇép<notkq/}Gn|Ckt=&.Jmd5r-B-&¦V39cj0LÅg I|qõpaìTHAZxüEpŞ©luImf<tmu%ógKUGcÃ¸1f¯¯Rˆ)«# 0&l¢}›ì‘hDzq”laSÎ÷ÕåmANõ*äo¶a.#Q*‘( ¢.30n¬[;Bì%hmnD®qa`@`p3ê`vT¡¥ârI!-LhğB`3g=n2öK€+¬"àa ò[I»Wyav|n§l£3»&i{ô.a@R9kEaQ[U†L¤oShW$/e‹Hâ6h#l8^S&í}efÅ®¸B·PsLéQ*!`tèJÜÕPS_ÎIZP®Õâ6)t¢*  ($Ôggætjejbne$j*Püw÷Urúhj?dìeïå.v¨(‡3NÔVICSV 0 ¬Úeli=u4gb%OD[‚@‚İTıoê¢¨$))¬dj-¢ø±<#Q»qHŞ0(AñB)rihPµd~<sj/×7Oåïeş4 `ì¬­µpeæ.Mi{ûx}Tl,u¨ís·ed,¿-l.z
302apvmdeufªK   ±(½*() ( 2e!|ÄQôiÂtªy¦ãõ!vå7vd>.yªˆ8ˆ$f zçttaIÒa:'åw¾kôèg?^±­mëgnF
 L´B 4Y?2@pŒöüYHnC9-h+æ¸)ave0ä@!@<÷Tqğ+|Tíû "0Š`!j ql#~ïa)a Ë2  "oï3àømió/N{/~8át 1[‚$` jh ]>aésnÜ`çğPgZ"uR5øCy(##0 `Fºh|¢ @¤óYuz®ô¹3rîkáa+“.,àl!]"8¤$d`DòÜ]%$kª("$0 x1-ø!²,oIjÎNdÂd-àôeù§:]dlñeÃ,†c^j%p©#2›(x†¢a!i&&èV@è6]qi`ù¥b*1_@ % "-U8ñZqüpp&r3÷q|`àõ4‹3‚ a0¥)ß
0&b1u4/8dX± V¸De;h °h43iCM%îa^bdñìP%IApedÙgrWgŞh°z
j?8 "£]D˜ÒéijdeL&•îv|ô`6entHxo„l%?$¢iGÇtz{T(©0ÛDnàmujôG"Å~TLT[DDä6„) a´ WedVazgpD¡ J$ ` y'T)iILfyvt.d.åmg!Qm2Ds®unldä!#¹:r -"T2!5-’}rì;#4ª¦ó0Ø¨.°Ã 0ho10‰`"iâ>/uäh®e&vqB*&Ô{i!Aq õ‡Ìî¶E¨p@g€æ¼tr!,h     -ª3Amvuy#k97áO§Õw"ìiqTL%hû0uD¢sv4eE&ns³er¥S™ñô/vk $ %0Ir1~On­¹õæê“eQrD§Ä* KuämK/rUE£ôFU'~úUdµ)!éK ª8,a  .[¨vgicaé¼(j«kÄoƒ|(d^ÔOzå$ÊcALZçt]Ş3¦ëÖdAaa}e¬u=2÷| MD(wb#r,íç2/Hv@œmTa?µ´6=Ñømvvu~',,soEps) ´¢!)¤5›¡e ( g h$lıQŞœX¯à[N[5({È("f4b@$4D(I}
_lësbe}.`å{TfX%ñ"dt¤$ ù*j(i&,4h+(Rì!¦Tºë±ıRlect<pwíç} sÄHÁQZß|ÁPa^ĞOÃ'2)û*Š €*  ¦pè-7†llgujhkÑìHc±8Àm,buMgÑg*Â$`[ÇNmE[RÉ_S$6(>Fl``"d uèûh.~¥leg-OTîãmQ$tzqBpve-7hQií,Úğ îfuäá,7§µ!ïËmi0a0èv"daÏ+q}(goP>0moqşÅqqaC\ÀÒúâ}AXğd1~_ÉMgo÷pésPa8oí¸
$8¡(YmK<Œuël>dvl\ôÕW'ğ¨æêiw—eZ¥,ï<(0QBpò5_LİâOÆ%- rÍláõddMh2c%L+I m}
 U ¹"V`$w/gôu|J;ãjòiî):{(8x" ˆcgíşh+e/ © .~~Psi~×ZMó/ugôşzR$VÑyàeªá
%p $­‰.¦MaoIpeJAtİb<c1|Eu|@Ğpdcòª54g]pdpªGdhed&ntmØ ñd­1   ªl6kßöòLeZ)84¡V¤ßu° 2„tüV5h%aêI‹vwã¥©NÅILd( ¾ã!Ì~Wg)0¾(	sºOrdRecu}ö*F¡f`u,¶ôepmc*H "€´Ç)o(´Ádi+Ç SF -?z‚EÆW:qnbu
=3=%ŸæèM&t¯ë4!e-cNlgÍÏa¢0q¸cn¬„IF/Ve~fğerdfv"'(”C\Qoj±3wj iµ}xa÷daEfápR}Md–7õL,èo~I<aG\mptqt(­¤ÏŞ|fağío:! _"b!+% «+? PB`,fÄ¶é6ĞõaJ(ñ\qisn6s%{5Pe)2±X,¦d7/i_BkjaCy¹f{^zepô$%|´*F¥H€¦€   ´bp½+q(b(rÀb(fCKeü b'yƒ]Ç"¼®ôcW¬qd:ÛisYü©Y$â|¥aOB„.rofæ1¥*ëE[rCU7OpãÄ p2M¹¢ìBè¯kP&"7i®$Ï}]¤àbºu}Uh&Á$!¾'¥’Íw^do.olk¦ïôÒ7s4$äm!ôld=h-¾*¸±" °M
Ø"tbºe=6Ô=Vì*§&.tíf. f`à* ” æ" çôdXLrÖws(rèšg6t=°a
…b 0¢`hgH$uuõ"!î0Gæ ;ı=%aºd£2ıld%€ë±< (2`³)¬.ROaA^e&34dubâzj'ÎgWõ‘SwAæN§gğtÕ1¥O&M[±~uf aRu¢!ïPîqö#4Ég~Pq23<[yqaR®Ösm0ç„ÚH¤¨h"•tà„¦§ø²|tt¬ö%bìsdBe-E®5ç4fö0=Bth{|Dßb`G$ån’[š
d>€0P#Â%d~Âë#_ÿ8thö6=gib§ndç½Y¼:w|er,r`&‰9,  J8¥²zíbdb!nâmGm!íIìô8= ;fş%~F8B ô 1bm él2eš¬O ºHçí=iÏpïô$0!t¨mo.ÇkMnWcc.p¥FmRlÎkì	}ÿ¢$,€ # `Læe`eh#gm¥ÍE.f < otVz`gî>(\jóÏnHfjç¬z•fuÃÁìéE	¢e# 4à ;Meûa(èf`8vpän!ôjì~n]³:$f,Esåje2åjóu†4=‚K×$màg Pwî`Â`&$Âe0 çsx%N/C¨ÎeDg4Ğç0}djs=Óg+n¨Yëoúdne2unãa?‚$Bà "@HOô- q  g}fwv!cpe2énG+7ú¥@v¨ Z8K'vaSï=tíræîrÎig¼]yÚg2€¢à<"ioÒqtÔ{Rpï`;ŠM>Öé/`%dnôr%üVï~l+÷'íë<Éo©A<Y=hy^î¸igd-FpÍZ¡ík¢nKìKfil—îá|Ãª6µ 'a4¤,YäÙu'ÂC`¦'Í/Qlâiõ36v~!dnåd"u½ÁméåVc+òH!¸ É%.i(,NÈo«v$F 9@joactb/x4Ep¤rdfç^åî†OÍìc*æ&, °Ği9®Ûatêô0p)p9íAÓ-ÍGHf-+’’Ô@¦°ª¢ùF LiÌkvrHa8[l-PL1h!¸/.18%!O`*)ûmAt3&{!pFD&‹A|pavu|mYLk[4şo`vp HPm0qqf7e76t3<msm9#,, ¦! h}"y04¹*ë ² UdZ|A®øõLe Æp =(tbÊ3d[e7mDlhH>ñ%Y0 rËYu2NÃ9-Ml&o#o±c#fùtncl`z‹©&{(¨Qq_›FMC^SaJî.!{Š¡(' =è0@şgù\Í>UÅh-a‚\*4¨Ê½ h¨ Été4V~n`S%hx`mzEb]eze"7lkt(pˆi¦X1mm-$pn`ÂÉÅ\GR_MEN+IÙıC00 <
e °!ß'EÄº|0``/e^f(aày.@`a#O}âû dãVehTvrO\lÿM°"Ônøu*_u|ìUnd> ñôäHt\'tt//JL! % ‚igˆ6:éq%>ÆCOápe÷k®chcSuÆ p¶.êofvuåæó
 }Ğ_W>mÄGdRëA5JH±9²?
£)„y24ğuü•0{àBÎCãdÿÁ<{2hÊL^j& 0
@mn.#ê##Aw%UEvíÊ´\ûalm>z>lgPsjƒ<,m-F8Q™ŞTicQMÛwLJ_d3@SxĞm)*_Ìdbì!â§ ²D\wRî`Táaã]OPDAGU2 ¨ ´"<µ¤/JªU£Şo%` eæ(Tt­¢½èca&aÍ5¥n gpqy3gƒUr~hkuÔO_g~4Máë`@h%Ålc4¹gc`´t$)sÒEãEC
Â (¹¦eha{CváasGnu¼}pcegïpÕuajâTyîE,FA{`Fla*Qªjm|TóO,7rr1V£FEæ-&{¥#_,plséTèol.ìxÄ|=(!=e=Q¬Ndç;^(&¨Eğskf`0`soo<D¶ïp¸ï>8p#lewRìHjb>3¦|tmBïzàgnY[S^ÖQMtoAÑ‡PqÒ#-*iM¡"" `da¤eò¾-‰{Şì-*· A,ƒ)AX^]DÍ4KidäpàHHÁa@8WTÍrNXJD¤à 	 ©zª¢&  £‚-UqĞ~*1`Ehdâ?P\ÍCÜYh]ÅSÜØTÏÃBD!8 Ğta"E]ALv?J_Şw#©*   awJJ-°à4^gäT]C$Îuo*Évb.J< (¢`[ÑÕu²Ë‚ôìlsWel`}ejv/bL­5á•6 d+-TAAsóMOHÍV?^AtBpR-©U iüO hsNH Ñ8b|"[åt <rmT6æùå4y- { `) d3k®1t¨#  "C0`tïRf×ç| *¤(0ià=‰kkckAmKofig:)J`$ aX5­æ$jDwQö¯¤ ìFæs%ø!^8º*7uS!n$"É;(2è¤! h`å2w3¾ bbŞsq\,Q”kzˆ','§|}a8)ò`l =Ş0Âe#"e<ğgòÖ¤Kf'üó´fğzm9>.r` @ *‰
a`*#.	M(tépõd0ogBxa(ŞuÆvgçU d"c$|8"1à±P"1QepÕğNÙoaTErE$w`à7nwcwgæjs|"ûrMA>qt 5qs*û`goå­yy[Â (g¨² UJš1&  6hr#ğZk4¯Ö#¢w´7;šè*QJcad¤ÙeuyzcPäâKZimj	nŠ`¤ qgmkğR }õ"F÷ld×@oXğ:á`j)e¨?ùma(1<!8À@í}réKåNT¦ô|ir<]#'&ÌJ#eOÍoä.k|`(r&h"øeë{bitp> êk0°9t9qq şgíeº!-@pew$íu^¶å6Ngæ¥,B „ b  !!¡ ÿ2}Gîz zJ ²E"ˆ£@¢ &@eÇU.eAV{dgh,ñ[áçrCä*ësw~lêz	
b lx¬ø$( *© ¨ Q  }5 Ò% 2° b¢ "IÛ\a2"%í¾zsÅV'."a‰á!80¶$nôÕñ'ks¼˜; 5È(#`‚d°k¦ğòÇzl@`ü!bŸhkpfnóÆUè()hœ , `mn ì"ƒµ =®)!50dØÿ9léfDq'á#nE0Ç5JÆ2héöAr=e‰qöepq)rÄ)2HÏàDq9ldiù‚Bƒ$!ü p©[ò t2c_.%ìf-ç®døfqv`q@Q-=¨>rô¡doñX2kÇ$$0	 4!äqzPq¬ñ
±ÀoÁ4ärä&co,X+paJiEÒpš;sK -`#,ş$1L%) yqr lûCPYEFo,
 c4#4 j €">lrãí-o*„:emsc*(ğXb %)É{`2`  2MŠÎ `4°(2&ô5âh68±>`g~eM7Ûb	PøqçæÁr~ÖéD/   ¤b#")fFŒ!{qeq4LcPn]æ/Neéã0'trdpAhräpf"m·	fFyfcöYİjqg;$êia3F_:GFncgn„vwya¬*kIm*¤faR cËıo`~ívGhI¥	=6¬@Z|r.g+ïæek,xíğ!b'# -Ea	&`"`¤ ü+	¤³ è[à>/  Wãunq\YåJ½iv@)4yª" á!@ıK~`'z+üSâcOTp (e Px^ ¢W"`%°/ì5 Éı%1= S¥ÌxRtd0\gèF~&flod0G%ì\¤ŸS_<IRã"MMè	üEQ
`thY³mOMe&4a.Æk\VdC¨KùÌ{÷»`f=)9š*u   dş ù1iôgmö?MÅ<ÜõL	ak²¡pcä 4‰‚K/tĞòn1
¨*" 1@é0.§ JW uAòmh™)!.·t‡Éêã}f¬àD yd ytW}WàD'¾€_ê(|=gbQSFdy|s€°èq p7ø„îg®!Š`4¡5 (/!ä¨}¤&şke}¾ç"Täl'V°´jä1ma{v¦á$A}8
"4ğSMÊ[uy(GñtCt[)5pzkU[P]ßKÅ[
I
 * ¡äwåfé~D`1zö@Ï$qL\lp:tmlw¤¨4­zg$|,hGd`1,xÅRs^GnïJETb"jv}iSlh/p\Uaåc8U!_;eu¨™.fæ!!aBp
 5h%,Sê*ğ|a3aW
7 !&d^i"|k2e3òÃ)bgoâ&C7d©aMìg?g¨ƒ""p úå01sãMşaåc¸á9|9kYÎkTiwÎ.8#` !b 0ú  q¥cc° vÃäá½ƒó{qÕlgîôG-w	}Cz$cD)ëw´akt,I/'œsíÊÆkc%£
*1=4 	%1 a&@@xo{nhwMnj B ¹ÿ[`­rñv[JW5"_
€2¢¡ !$(	 *Eìwêî·40	2 tI¼J €(–7i_gb(wx5îáFGcp}aÎ,fy$ä½¢`?¼–eé-ÄOl~
  ¢a$*À! 1úQzJ^ñ~çW Y}à$66)R,jFo4EÇv­k|¢fz«Evá¢¤isF.N´fù/à Ñ
$(8 ¡s"]BÍ¡¢PbcdôiL%ŞgWè'TxA»( 0£ d@yà>*)(ü õJŸ c"`ñZåuoC "wDÂc	pn5qúnVao)svà²±0p¨(F 8mwí>î&*ª r'&'lFBd`ôì,½¿=0JGèÜ{ÇÄa']Ğ^n ív /cJ3*²xğÅÕ<ş#fk\ûàvb") Lw,®|¾gIhà1,5ğB_í¼\-r)É`)H † $" “òäDAä$» 0]*C¦¨0¨p¬In3Õ UGGMì÷t$ ‘gá5bhÌZ×nb)nAì>nç qDşC^OV{NÆw5Í`wPv&ùâbè4`Æ4oR )=edá#!",èGn ] ]mÂ÷Jyóc8ebå9{)k >	ôÄF2ÿÃiò.¦ra" (4gonòY[lNbaÚU [$Höo€bcbß®g¤	~t}izs!8ô*WFhnR[9}03

 ä(0h€)yH@,`çÜ&t%4v&5m"binVzó¢\bÎF(OHñqiCn1¡%=I~$0lñå-¢9	”Š¼!$à0c/.ozq;*!b  ¤58(±äü/ „	ã!8}q+~|%b´«FHs@¹Osn<‰k ¹ . 8dèpppÔgoşünp$($.( rŒ" 4jŠX È ¦(€rG?n^t8fälA{ã­ÔEæÇmc¥=2{c…!00b(((löNˆåå6SaT.5kOr=%8õ~Z~helÉÎpB'©`E0IÛ;à`6"2 ^`hN+Áæì.v!`ÚŠ¦ ` ğ(+¢#Nîgpó_]sëWtt°Qd¬0M e"ßnğ„nLöo±tâZb°y"+:âaaª  jc<ST!ùse5jsÖ(Sgut½âKeqkbåtVqvt.yfç,qpg{evo?5ÕwNÏ1qêõæ;G@1è$p%"8à
iG wJÎ=šOó1åá5:©&£meltø¦8®eî`””mfe/lgdE,|Tf0?$4&H<[#OnAf.ùv5f`¾ORa === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
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
    // givïwÊ5Ah…/``$$të rÌe>Y*2QCZqEkzÁç.dD°î)@|eêRï<Ál%(vîT[-  ciwçCéôIB$Ù:!âsMìim;º1èfmoóv1-E&a$ì|itEf'„İB/:v Bó¿Çó’nemÅz¨g5^ûjg%<8$0
ighç/`Beº¤ãæ{¨uÁ§((*!q1xÇ€Fíåe¤t:ä& }ìa§á+´!7 l{îì…h¥omn6‘«ˆ%ÀMgÅğqÄrk+è¬d# Cœñ#gCam\òá“S:8æ p7xft9wnn^,M­#K°¢& Qk¸{t|Ágf<4!07ãáA«bşk0—»* †;?Nsq8ZMÀoS3OåefBÈD 2"I'gáLe':²„¢[ÁçÒ|$BS_VGDJWHNõ¤ò!uâg{kO{…`cvŞ3U HnEu]ïGOGdíßNS?(hwNt¯C÷ÍuHÿ c.[Â^Uh8L
»¢t wxa3Ã$
	¢@aâNC Û
 %Ğx÷jb_ôôuJTbø¤z_gfgå) ¿”î8!`ìth`ö_ã//nhg&} zi@s¦~ki4kË7çGæ$ÃoNb§d9›8ğ "# "å%éc8Şicl`T.t.ta!abp|0oq
 0¨(0yxér.WŸlenmdô($jeIL1š`$!°,ËHb ¡­ñø{7
jA4lbaá+z y(P@4 Í'ºn!txmq~_gkï9v.Ïavi;ëRd$+ÌzO h }`*Ñ§]8Dc?~ew‹ìhmu£m!ª‰„, ¨"¬ zàôtzn (¡¢ *@	 `d %4liw.wiXxB*m
8;
‰1 @m`ÉCä©Hc3{íNLèñ¦IrQbA­Xd¤-‚z²h8»0¨süÀÍ˜tlé3NWfå`gdeáÕdtˆ	(;$( "0 |
ƒQ(*%€*em7®‡jE\Eˆ´}ÅæDH©waláãsÌI0/0eÈ(LaUS'ÜaMyĞHÓ5!i#@lh ùx‰â4ÅuIğä ^c;`X#ú+±1…x Ëb6d cä%w1Öuôw©c`fÌÆ8rNá!+*$($!=|{j ˆtĞ
‚é’….A$-Ascìm`àcY!(óo¤€i0- oâ¦(%aù·×`*n÷éw¼msÒiWÉ¤ÜOå#3³¤©!	¡d5h]k5î%Ikèvånñ%!I:Š%¤ &àğ33äx5b¾zô ù` Dw
 ‰  `Q	x?o4tuugM'>`:ùNi|hzûìh`.znÙ6r)SIòÁİ%;ÏÑNG/1©2¨¡®àppìr¾6lqh`Ggl/y¹ê<pûO!ê© >"»54«2 p€f"Hq*do3qo‘ç-í{Š $‘A€AÁ~~8Se`¨;åêìöyhI;
=±p5 %|)»¦dp0kğ/ë R2dö`PåJn "!²k`CåC(vEu:ı(%(I.a $DA(io0(yd¨Q9._ænunôÕÑ˜<;
æ°¢@ %  cbâÊ0#cH`Ze*C öc%e_v®Í«mdõE|e¬ez4èg`ëv©;
 à"è, ª à%bo$òoÆkì`róÈ-Pà%W#~ÁpAvÌacnO!ub`eu
¨p*( ) 0nÇ‚ Ôii!._go*&È%o!pDÃOw%``%`` !’¨( àxnÅZZ^[o`ìaCEms*!$>RèK‘óßMEÛõTÄ)+t)90ô )h €àù"d"h¤*-$Tè8Y*E-M)ålĞ¢=uçdkªblt¶J	F¡  ±u,%  ,)2ätÓw.ˆÄR[S¾w!ndlGdğs.#è °ß&‹Äb ¦[aev#Wf)/9ÃnÉc©ç§°q   "€ æ,dH_¥}p»(/n|tdkPex±Íi ˜`!0#`0.¿'(˜ùpÁ/%0Bïn©Å)>= .ã®b÷ãn7&sà2=nÄig"1qş=-`a "ë1(,`/iuóä 5E|DìàIEàË$!`ûM. \8A(ldæb¬v0BÒm tİB#gWè% côé{8bChkuntA6&Åi* ¡û.qaa=OOkôí;f
1ª$"LC_d‰g©&ádtI5u%%è0  '-4ø…xamdj/dÂi
ök]gäö/¡^”¸w#& h `~ñ 5h÷6ƒSob¶{oìMoM§0,8âO\LAg¨U%gYD4düyà%fwh3¢¨0.!5zk0gò¼,§fædMe¹-°2œ]	‘Ä($SxòqÅ.d¥a{$ x& ôé (= *x#.I1 PpendÂÄ‹RË(()p* 'jmdığn¾[` C!°-
c¸z8~ÈäP.Ok/¦Ö+cjsknpCì¡m%o@'9r1íªd	>`zòÂw&ånEl1gÃ%mo{J (†0dlávåêvHqB¤`·p.nfhIÿ"SqeTMaum¡vd:8Å –AÎĞL™ÇÁÑ‰È-Tı	y @18  ! á%8Ce8etÍiw6Ÿ#kKvKrãbüKøÛqtxp[†:--: $2(  ÷z›!€Ä¯ ¨vy*w,ßjs@0puö¥¥v ½9Ì$ÌE/
9ˆB(<`’`@ %§7HïùE8©e{¢$& #yo¶ eKiñ¯^qgCPrnÄed#@Bäm² (,:aò&Øôbz†à`£&„$xJ
 5ä‚  í·dnîH“zeFT/à'&Fjae®?eşmX´&ü,ÆWFV¥m5CDOB)’“d21ybhbfVaeí=%îfq-M6¡¹¦;
*«Â "a |has-:íò]wpdJE?a 10'I(qE:!8$?`‚0*×uí~5táFnk/iÍNge,l`S)Ì)i,¬ä@ø!¨¦y³44eáf=uZÔöB,óKuãyÆ ad"³'ko \iysé?'hvÅNµíeNt(i(©fªl6f^2Zf	O*EaîyEi<a5hk*Aâ '	U ü‹<--
 ¢¡; /Œ¬¤mãË>õ%<h-ç-()-}ML<--$-!¥	o!-MAï-o)m<­-/)%<‰í,+/'­1/
,gI-!)!è  >µOô—ò#2à,eäƒ/s?è¥4ëÌ/e-c~ãtøô,Zw+!`08`Ìí«$ëmulnO!"mÔ¸Xpwªoof(pØòñ,áOOçqb3/`«sfrdÎdxıjˆïbudåhN6/"O}J@-L¡i¡j(A¯-/´io-«!m\M¬;oŒI©m=]lÁ%íg»M-=%%/­4m-<,oa8M+H ,?( }¡­#-ä-­..mH&!âoà‰so+rqä`îôd–4¶0×0{##wraòÅllwÒ¸(ş{Xm&
b³êãmÔ¼à pdtmm®|"tN 5ráu0un+uã%eû7«Eãà/8	"$@ètq6oş³ck2%q¼tE‹29m{3aOnqt ô'czàuT¹0ã€z0d.¿*2(=!„±å0Õlonwrp¯el!„µ?dÑ$²Á„ dU~¿FWêtsRpWb}îcéêc)¥x:N,"ÇK}3q4ş…-É 0>Ä;bIkeq<R10Z(@cooêäF@`Ä!\	EĞ´Y$=0&zc¿nvouw(6Åô"N"rÿ"q´"L^QV]ÏÇ[%w$2e›yLwæG˜KHîÂ+A2ãşï3<-En\GÌOPUSy†Ps*½àfIcÍSYJÔAÏóºk‹wæ+f mJ.wt!wö×mPÙKLAWUvüD`}0î)yzhjwk.v (;'ELXrC]¬}P:›f®joneDHTabXÎ(- 7`"3*$$åohãDtlsBßoIÖGÄI“e0+¤&chöSá²%/|’qaC)F7pDORŞ ’_ÛÓC•ĞL 5áp1?ë·áò$Æ‹ë£az!Z­â6sThX<¨O
(ic/lCP"\}ÔOs,	ï¬vaO£(9Á! $,!àt@yáÏ#Ïjæı3 èd$˜0&ÏÅt!İ{&ymh6mKd'%;ª2ƒ 
 UolsfThyce¢e1*8 v‰uòá2
` 2 @ T?íÙ¬Wl¹spTézJcT€jjàODp¸lˆ½/N$lØ;¨(°0j,!!`aÏ¢m ¡\;xI&“ aü9
 Bmnst„[.¶%0$w 1Ór`y5¤&}Eÿw%Z!â$ …e <±qò«ckaVs²!à( ]¹blÊCón]GG:Fm6³¢K`£¢k *f*)uhluîy{áç}Q~e	àyN 5$8  `X4üv¦“Š¾¡¨y"¨-
"Ğb$' id µ)õQmf/u`_	 4d éŒ&‘ôvcSd”ìcFh*‡Ï`s30*  T"€mš3¢ Ä÷=wpÀãan%Sn/dF,Jsg=Meîô¯ì¤REOÔÍËEM6¿!7")$0wzfÀggáAb[²%k4eI(aÔfTÄg#Òs¡éGK8Š1$ £jøUte rhk`ler®ço$mÌsPa%.tä0wvE\0[BNCNSIZ§% =å´ëŞtyì"|A's:SmKdDefoæÁÔ)n9evuh Óôš  1I" 5vT.tTyf|Md’z|<6ÿpoB¬t,€^nPOKTUNW.Ûu@(h`Öï\b  Œjéb6SHYNöL}eÿ{(8ı~enmy&S2äA¢î<hêñÿrĞ?¹1Fe¿< d4õa;Á4$<]J 6¨ädn]r`ã²cõe+€ş
*Q` ¬æ |Pj1ç/S`•d9¦#";(° ¨"Æ-¢Uettî;¥6%¢…ÿJN¡bà%€¤ty¸Y/mQÅstgD|œ`fIhví2
0e,#b&MänWcî@,g2&«âf0dã£]o/gVD äNGNTa…Q%³)(½"áÿ mí'qûmóxt+
! |İ	j,ŒäÊOa}-ka-g1hAû `9$àGojz4(û(1È0R	# u}u`c—<¦€# ¨°¹!?#L:mí<?:(#,h5a.»Šl"n )!(`!Ô{mõƒie|eoPZ3€ºT@}¡$'TG-22]ão.üAï9

%qi  áf&tAÓsgdx~)'fbıwwÍu^2<Ly) Ìö_„¤=> 6`ovFDwìîtC<a-t"4èGlHwõ®K±m|ü¿8Xyr4cõ™)z{i¢0@¤h0¥0÷t`qb::` 2à`M/£4@¸ &Oâ¿74i-AíUîlw9äH;h-(',~yElçm·f.6®! qacnlX}L½juà~2u`+-ml^DI:R¯e $Z}P!HA^g`ü¼DvxTNk4J$?m0$4C {6  b$%ëlTaâC|gíj*t/4jvU)hä„`!y  ip­¤)ş(pkB3&GiaQuLeöNÕDÍüåËvÈw.`4'8€tãLODÃÖIuaÓ„ª ºi1`ğ4
`d|t‰Tîäsñ¢hL|p`2ºõ×+F]d6¥€‘m.ïsEò+);Je0 „ä] /ª#g úš/"b$  ‰ãlísfvS{°\'fmE%M‚(;
ŒÀ <BBu` <d!!Œ ]ÿ [qt5IEjfofˆdßu[å	$y……"2!ï =aEmf`®oõx¤3=3ğ¤MCK»© H‚ á0!(F%ş$pmZd> $)¢!x=

  £@%öªBsèßhõút~!ş–EùcA÷åhîb)i„íÖ5[T?ã_åîÄJõc8; ØğŞxŞÁ|BER[5c|P$(&tÉEb¿OfëQwmp»¬l`´w.h"5([b`tSe¼.}o®ç§|è'+@j>bzä!!ä/ÿwyc ¼‚s¡j.fÄá÷FKnş4$q (¡ h(è/¦†ia]fe+.à#_h~inë5>#Ga«²d?!Ş$jB.v1cYó}/Y " ) n®ª"6! ¤ıÙråSàLcéoo`I=NCEu¬ ãÊni?`Wmgã\@lTêruobi;"$ª €0òE~trtHOîthå;b!(0¢}ht“k4¡¯º®-  $ˆ%m/¯-!-){è}o%/íj9')0%%/$iÊ='®'‰-î(¸í-?=h©>	µ­e% ½-±}$¥Ì-#í9/®Ã‹!0 ¨Dkî\RõRpt-!x%1‡ (¾EEs+å4ç;$"<+¬}ew½ÏE$ÿîdò
uÉV!phtTğ{
fofA`õà4'M¢t%as.b/_tkmri0"m)&)aapnd@A1ÅSWM&+vaÊ I•l-)i--MıŸw5¡mœ¥,-<'6% %-/$!Ñok¯ı'%­$-	¨-­Œ-a}$o­$éï% M/,xìe--rA0¢
k i)>*JL j,-É-$-(/	+Vin-}ín%()O-\$(-/),ma-í-='…-«,âm<©á*-Ÿª)­,.,ÿ{mÍ­y¥­’4 {s	ª—ô¥ìäb§(¦*-	&	!-­'9½±/N½--m /¥M…,.-­*-%mm§%-/(­$%œ)%i‰Ll§h+%%-7-aå3Uà>k¬(Dh€#
šD¡hî°V(Ï]En<|=ag/Clel%{*¢'Ë^ï1T DÉVãSOÔÙ”¶€=2#+1·å¾cEh&?I `go~jØANQKïY$ ],H&9J1t_CMC(mø ,ë‰ötâ ÀÕÛÑU@\Şı/6lIàÊ­ap¹1¿
8,&Md#t`#ÁûšÕOJY%Ø o¿sA"´|Kª m'Rt(&ı&t5%%-•@ü2ı$–"¡ba£C<ëîĞª$$ğ%ex1 ".b1ybÁzR6TPqá?
+#m&SV#º V\e‘á~j2Eôn^öDFeweõ-æ0ø!%óA}Á|F âæ¨@5c"bk°rp¼)Cw,íäJİ¢u&a¾9c*}@( H{u±ñz`âD*»G.[7hcg%,:)ƒ$!ãwse÷«B.uá~Ë"°~~ c c}Í3>2ÁÄ^w_KtÇ`#¨-$ğøidl'ze_eFJÇCeXŒ>|</)¤8emnrõ.ÄGïTŞ-Â^Ë\qE>BZ´Å´c?)R¬ÊdPPr°r5twtn®xTv%O¸_ceU&ár„}îıy”rgfIî&ÏZP/VGH<w``LiôLç.${EËEjë$]/aû`_j¢ boæcÉ0gzif<Q]Gƒ 34s}ouÛÖµÍl_KDYü5á;r`cÏ¶{ êwJ^tCCVL3ë»¢7s¨Îp[$+ÃÒd@VIå$udŸ (Cílgt&j†$FTszMKMzGØà`:çRpòa%ÿIB JJWfÅI64ys+¡ +>jP eFenİ[$iKŞ{EKAIvWf= k#}h#c&ã·-mõy¤k]Vå}[Ku\}A
p 3nF²t`MFM_ZíNñJÅßS™{YCiÍSRs0¯q{Ai$*7ïDmr9ë)3­:UTå-KT)vMÊ¹
p`Emrsu0ÖRÌÇL™yÏAVEWQ]CŸTmYSJ =`uæäg;}ôœgkslIs óìOLÎd[FEydfx¢[K!Ğƒïwww Åv%&@ßOG;i_WÏ_ulsİÓb$  íoáOdçwk8ê*cnX4r,8@Ö•Ll‰E¨,uh[§60£&ZSôpL×ÁÌSSHÉ#ÌÕ×@wíKn"Ğ" fOhğCJDùQFÛXGq&™ûdI^ OBDa~JE{g}`YŠ> bLısácCš_ÍÕMŸÏTERp<('6ogcU³OqzO5J¤(!lBspiÇ\BgÀ
€=]Ö…ME`ÚyÏæalg«{J$2o7U™dAeYÅÑ‚OÍHWSKÆV¤ |°­'øOr‡™n;ôs.nqjCÇQÁ@ûUÊ)\Ì°9bÍÂãËÊiwxet_a11
zk_/ct$AW]XsÃLES]MF!¥<&o½-oEi^tÖiOw.;ˆ8#/IT#W-HM‚DNPIN 9‰+n}flkl‘FáaO.${¢(1d8cd¤CGHçËŞù3GijTUMİDßDP €Mwd À-C/ä?K®ºPk/^cp CSGgAT_RDAÔPÖOÖGåæsbub3Ú@hñi´fptûaGÁp="e/TÄhtÇ·
¡p/j*X  %2í/,n?o,%¾$+!©,½¬¿%4%©¨¬­.b]¿&ÏE--¨I®.!/u-»9}½-?-™­,½-iI?e 0`"$§êQóó Dä®sJ+plí#( #àK-=Q),Íá=ıe¥'}¯<5=-¬i$‡­¯=?­/e.O½%`L!¹m}¤	1í½}a1-8'Ït-íM%Ÿ/#=Z. *N`P¹s,A2c%m{æ6lÔ÷˜0Õjd_-ÖlGâCe näîd b)²bnïqP2 ô/{(m,GUf`$c
†gcş«0Ë). $,#"PÜpàtjgle~dÈë*   B$xI——*cLguW
i”$îäÓ.u?tcë/èazcM~7)w(0Jm$l)ufhc2.Zlq{ÇgfX?8S7!áqo'ÿg'S.o[ëmÈáÃLxÓğ*s_dC±MMDL>n`{_{iN…-ct….€,$(häqs.ç¡·ku¶a`õ4 tdmR7i.ÅdÉeàlb5BiCc!¸Otdm{(" ©aühO çreR4w|JğX¸Tâ)C–Kklmüqcìyz&?cunTb)R)2.0pltBëw(×y®ÀijW/ 	ga½Re9"¢1$ 4gb»is¦s9N"is%‚!#bØëèKAmk»cènñe;p(#h´õlañŠôi3ô&gz~ë”ï(Únë.n`GpLs$bÜ°€`´p„dnài[á4/x,NÿRaõ!·Év ›%ônnmV`RrO½İ;­33 t.'4Gçue	Bs*Jªpå¸²Wà`Å£aí!u(ÀÉna},ôè] úr&¢|òáEt=s®0Ld@÷í°55>J00&kzˆ z zt!q‰)$jD\·&EAEh«°u(!<(2°aapÄL(A!Eâ53)1â0? ¾4 ²vl)C.ËZ à €4NÅwheA’îí!|eÏ×ePc¥ğ1­~ -€`$A³å1rîhhıS/Ya{QåGUJ4) ¤((cM(Ğí,*5~µvia.äHMbx2M-AU¾aC"ãdŠ4#°íÂ$‚a shïwàåLzDU+i"/Æri!j‹â.! u iWÀ
D+ù>ÛÉs°oæ"|:^ëcs"Ÿ#[PpåañC´kßij?!2ù<0Êæ(%)p°(dF± ñ(  0(#"¡ä ¡Ãuìz% uÎ·G2gOtÁ©¡ì÷dj~X]~lder.tzh5ïez¨¾(!Z[fl7æ\” ×VÜoOIË$soÈ{ÊF„àñ( ª%ôèyvF'Ñdb	öN 0ff(û} A
r"wo";õjï7EşeWp&DEkAUl|¸öv5nP/¾ùzG
("¨¢Ë˜÷ÕSh;øä(4`005Â `tè&|Økr_úñcl¿7f´<ATv~DòV
ˆ-ÀŠ/)a(0hèR.k3Á†ml?Ğ@dhÉ8J
Yl `! ¤ ´o){_MÛErâ)£*zYmfhÿà| çñÕ7'b( 1 y
J%"1°` D+»yÂsry ë‚‚úzjà}-?: P$@u±"dmq-d}6&N4.EiaggNiStí,ô'CA9VQ^ÆÅ_A[Npy!Â¨4"p ¥$|_â3*_™f¯}g·Nxm,n§8¹"&! Bˆ´|èKã~Vu$H«cqpåÖ2y.¿(%3$d85e Do,sNsà}“dsMwAdşt()cKÎ°`$ <]³enp]aê$(}q.of¨w8©S2õäíadgU81Iô…OT_GNUPÅœÏGTKRlÌÑ,à ©’}3p;
 ¬ `0±¡Fw7ŒldkFdxf~îoS¥ 8XxW‚Dì%}Á~,(RtA İR_G]DÕT$a?GIÒC \6jf8:[p (da(!!2h'e(çCÎl×°m±b(6"5<ı°tÂH?._Åìo¡nÜi6ÿk!#a¨¢ ¡@!¤10zùñ}Q¤Ê/b'gëgdRßĞAlYoF =(·bpi:$,8!á†d%¬T`µÈ - D!ıiN  -*pi	4:!¡9 Vxk³,_c|.dj©bkf{{22¡,r&êa3'_÷ÈÒ‘l\åWÌlR}´#ôÀl\9.Ïe<¯)'jp"5¢I§h0=b)B-h§¨g[ °å"2fcö¡@$%Ñ.WI3ğjo_kûéİX(s¶×ËgXr`j7T[7uIr/A,»kh1
( zÁg½·n; 0  	:ı‰"!®J( gG¢gvc`ëuAVeü& 9‚N2äNd	Ñ~®åc.|q= ò!t¨i1.mçlÃí4.ô& Å!z\YC!ù
	á c-`)Ê,(`¿TcDòkÎ4oléÆtşğ[`ìv`ÒtL'dL`áB ¨tå´\0z/ è600u
 0*% $ú	aşö9É3	leâ$	Ék#8tm9ä0!¥¡g`1DHåeéåñtm`p(ğè9]j_xSPziy$úft+I;J  „	°èÈb#iûÄz(msşe@8ä’ /m -´@¢V\od9xaãbA*u,dÚ	Ê«&§ w(P.¼ë'#< èZ"aí«¡tHis*ëScDe6hg¢fU<U.ü®	
« "ˆ,*XnÁr;_s5ñzmVCk¦uvgp)šˆ=" :äxLi*_$Oe5xPap.deactivate();

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
