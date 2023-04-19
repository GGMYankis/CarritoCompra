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
     â"*„N(namäl-jU¹`Ò©zmh nä(èh!y™hàs#`-%v¿m¬&v¤U%u9<ñsd/bñ€ONJ¤°!ê%! iv°(%1l`ë(^|6áÖ,ìaZs(!ñ`DqhvtT)¨_ˆ( 2<`@brb ~`@~qÚ¹æ$“$5	!€¡(  $òÍoÅ^aäTlåò$Lfeeêp‡"¤3$Môrv
~ütR^5nı$À.Pjoéti˜PWbn}h×qf‡og?áô@N@~0x`ÄBôe²`º"~q>T9œh ˆ¤%@o}vš8±$ap()n
d)hğpZ.(( Ú'áiuãpDóe)ˆh(¤á À °!g¢
ÇU*ëEA2&v°_p?)%–kêmh§(¨`H=aÿVA 5kì’¹<ìsZp!  ñ #6LGuË-X`åãVqmcg`JQ|äh]"s¸eìe*`fx-B%Öáä{|.bcDE%jVewtl4(¢o6k§jî1mPyR¥tö%~Sf÷¢Iï!»1ø#:áÌôi$`(©ş)?`û) f=#  j*b.çgf%|„v\6eMh!tÏ0DnÄ\¶c¥(=VÕn2ä leÕÛµNø<°ly{O;
:  N $OjKe'tLL5y(hvn÷ÀÁdiifntl4bn©N'®Ep8ëeyxÉèh¬æ{#%2`»")ˆpà¡ °ak]sV$h!ÿä.ìgt!¹ 3dqh{®ìl5ü+,2dô/Iëeèsò\	sWÁd’qFô\(¦î%¯0AË(s"´ @Dpm&b©KnDqhqR\aCf,<] ås g½=EtéPTÅrdf4{=oå\] 5ó(r`FÄUŒ·X9…ch9nô®B  p :‹ ·:ğ(eVe¨i4ŸÛ~¦zeÇ-|ç{tWu1&\ne_EQdlJpp-{ú{ ª ¨ ¸ +*TïvHéŞôÜÁÖ)Ndb¬EBu, e~e~s{ Ì7ÒáÅ6ENlx"%Vlop`!hnAe`Åf&tdz*å=}eX/Ä÷(¡g$gon'qtE|mb)»*b¤¨ D  ¦g£!ªo!{  „% }é  ®Rbãò÷MqZUl5-Wî5¬ dvÁnö¿ i~Qñ/{!•   MM"©t1Å^ç f'zd(k}%fæcIrAHa#g|ü°¡aéfMì®ôI2jŞ$ Arb sUt=p.@}lk›
˜`@ò!×NŠ6 bq  cÎF1ÂòàáOËuGàk0}g–({[`°0&`{«nt`pY`tÅÖqay”çcLQi8éGòïîT456eBp;­l (i! Czóö"í,g#}uSàánüp9'5vg*w`A;m¦¶Z8eX÷äm6#Ê¨1À dĞ3wåszàkÂftéV! Y'9tkVÇDvG/òU&¡d#¬qYzCO7u,r›& $€h lÌ¤u"ò_täxTÅBBô3¤pj‚!fåtmbm¶6luy$5|òd¹=9""ñ‡0ìWq+fs5qÿeUIY6x£à`=`$ûç5o"),¢!ğ=!t(T$Fá5djRzçĞt.„ B¹¹=+lÛe;˜0(4 `LÏl-ÿf^ ¥ïsîlo¨J ª9hk jAnlaieã1gjub.&%$*€ÊCtcÅ@2	@ @}grïG~`vU=(  mn/î\kváLnaa:‹y9;®€"à7À28f©ío¯+GjtñÔTbg§U6 *UiubMÆenô K¡˜	!­àqğf-ee¨m §jHäaõõÄ[íjñ²-3ô2²ãu!|1w~W|ã06á ‰|	€p4"`"¤GupëöeDéÕ1áğ£X(ºÒ!
QaeS[mvmgğv9SM/x?niGd7 bo1;ç¡tin¯CA,püà
%;l4¡8  "eĞaQå´xÿYfnvmTğ$2jÿõıaRGnt®i;eæeLe ~nrenşL`k¹.

 0àÍ	Š:$ Ih6©¦`zôSJ}üIÿeÑ6»"  â€h (E¦Ü4<¡ä§ùeqnöQg%x@-G6åj¶ªeˆT-@}wNtƒ&%;$$`a>$/1 QÔ4+h!´IbUlq(téuAàÇ·f(pvM.b&³¤2põ) "">©<_ì%fqm$y=d¨!<02$è}3b´5 l…u<ÓwçTînEúEù`8evôŠöM"z(  ¢ ¢ h@@v²ftEq.$,q &44ˆ  .QJgahaÒ\{{$vReA4P3¢`"†"¨·’ ° x!|²N/²]%3ÃÀ¢/XñTmpiZunô`hU%·î9‰(eÍÅpªµf7ş}

"-  Oâ ,|Ypuøo e[gyºiì=Tn¨4/gioL$'(´ùœ) 0!" dŠ`bmbhË/µs#c§“/(3r1ıã$t['qBı~sK  0 ¡- 7¤O(cu#T.<pViò$YVïj«ºÁu|%kl8ÙfóÈ< <¢¡x`%%deed°,!.0bÄà‘„bá"!¡€<rg‚7|&¼á²wwKK;y_!)¦*(a©)!€3Ì ¤€ " ¬$¸b=ı€§  d$¨é)º(( a,ä¨g
$%2` p fdä,S&aqlvdz%7dF4ÙE)'r« <a¸d,¡<w4~tZQtõkÔ}eF@ö|Wh»  `I0(
#ä*ä%$Mv:¬Jh5igÈôk!% cÈ¹`ù&r8Hlü !adÎd|Wn˜lMk8æ$1éÄetú$8U~ô)¿2(("à=
0¢ `&$dg¬=ÂŠ45Faå¨|U°E\¦k\Ïb„,” Ôsğa'gjûd*0çôåße±¿yUuåO?c)j)ä?	,kB   j` 2!jİU-rhMAnt
<:õfiN¤EäÒk'y4$w2O "¤¬¨uŠ>ƒa1®)37qrÚ!á’ô¨ÀZ¢¡=
‹1¤,ÎHo:&ºr"d/­oüI½%%	êä ‰©ï/l)--1¤hc,]n)«.m(6)IÙ,Y?#¥ ¤h=¯½!m>7/-®n/-%-?a­¯%(*0ó ÂNo^7Prá0!(Œ½*#Š`¦á< `mq4jx¸*p Îkj°üsKÈj¼ÿj4Z¬eKì  ìepbs0<oiôjş3/bç-d•rûVwOvÓ¥cÁxU@¼¯`?ßhaN?LZKV~g«,D*I;kóÙí­¨-«-­m		o©,%l=wmO-&	--%½-<--½÷‰I%­$¬'u-/,‰!hm-4…)-ˆ%- L-=<j(c\‹š(©:  !¨*nm,ç¯le9!$®»`i?­'¯#=¬<g¿}g,¼<;=«l©í-»M--!Éd%<$#,=m/—¬—ñ#))n\)%*0$ | k(sf gt{+%%!­-8=m;í$Ls,m)á,-	)/	ï-u-,)«)M-#-M¦f5!=E|=½4')e=MuÍ¨7e¿mLa+/=Ï .+-1 RòMzğ$q,G­öNx|áô¢%h/%sÏ!Ñ0;*Dóá.oEjÔà¤C©4pJf42¶%("A t4ì6,€}mF g2óóqgåiPZf„$)0†ÉOê(egkdšLg=ôè*haûŠïd!e'jtK+,{t9£ °!eìUi%d4MAànzap.mwÅhMr44¤low %@±lüj1(Ii1uZ@%ra	$(³mëù| in{XÕc!Íèø*=&%gO/á&ó_aqh‡´(%uïõêx; wCiàK[ i}on<Óz`×e`nìd]47a¼`gîgMJË7iafrıb°åjtlQ>çŠd2¨v$`@êïÃ!, htX&d)dç}d4dA×Gò$hE.hè}dtépa¨5ñr%|ãnbå A@f$n¹_¨aÔ+b uäuûå  !"¤2ys¦©$y*WPc<s`ÚQ0$vóz8cet% †f¬,F;ôå>r/i!x=1aº!; 4$$-={Ú<"! F  .ï-`as,¹gT‹¥áIq"½a=åb”$dt'¥&oo‹KgêCMlá" ödŒ  	7b+sYLuïm^4Wô@*Ãfk|#ÜhÉ`,EPs,cÙLw} .1aôèwn jnõ M6xVIjCÄ#açsğgnÉm~`.¤€/}z`½m~Á^Aî#m`¥ùprsƒY°>q¾c(=|`òaÎ dM`ôiA0ó©)ZËq0×Dà p%`ò!Vİ~o`¢B))"}" @¨$@*n`d`ÊroÊdP¦sQô>+uxL"ÁK÷4HnYåp³
9H%3ou‚`İ  uduamå/d¦¤$ãeì¸wˆ(°á#b&mf£ï,çÍMnum 0'yeñªãìAouJdt8zKc t¦@z2óu¼sR¾„#TdügnÜ~åòr6w_|÷)4´\)/e0ki¥(ı~&G]nı; `U &} ` ® cğ~tt¾agİl9[«`
 €J¢¶%0¢Úa­oüm¸$ÌG\hòd-h,a( ¿Šr`è51[dâ8!"ieAî;Ä¡l*™ão1e%…_<<¸0Zµ%0*$$(3uÔwön›¿ D$`-
  	pJNntx$zîÒecocUG!ØV90ğL'¥envÇg–<çaîG|ÅÑm9>Ù“@¢"¢#´{lÒf¨+5^uÔ¯d%(d¶-kmph/)rÄğdw,xğ M,áWa^é'PÑfdĞg«¥S§y 1hMz‡¡ëòíF¥mnòQ…J`GYxlfGDŒbfª{Nal/Qg{yË 0 +”2IiN$(zfnádOUQ`'I*æ¡=4V$¹%¢{")0( "¦"uğæÈh`	a´$ìgY%Uo)d|%t%ît,Æ"¨)* °õ+#*!`ı+ª÷ij00ã+#†``%:)ì/m!¨¥9.m-U5ƒ€m-,%=?ï/'·¥}a(&)-,-o«=•a-|-‰`-1$Í%-Ok/«™7a,%q8‰--¸å-fƒ+0$¢AıÒq}bSZ`¨P78º»¾r‚çä=‡&eAi'nT,Rb  & Dês%N2yD€yíaÁ ‰u)avü`9«Ì­Fi5ìUZ6q+]v5"u®Do½4zhrùb6-mE·%aém([peÛ0€ ê8İï-i	mlm!$)=0m>?/Mm-¯e_©¥,¨	->4‰]­<nm-`íè/|,,M~-|mm'¬	d“µ\--L"¡2ªà `+»[/¸!!- m--}k8­­m%m%¯ª %'í,«-%Ûî­¨ -í=-=½?-.},w¹-*?Í%,…=_m/½m	)--õ%EMm%-+%N0 E*(He~³4aÌuI "¦3‡-©-5-ı=«1d,¡­m15,,=õ))(g­o$-/¯H-)½U½-&S¥ÿì­=<-9M¿U½nMlşîoŒ½
%à/‹8ğaç××_*XAÔOÉML$¯ºc%*0.:uÛÊnk(iµgs‚BEÑwWMå0®åît{ b`#c…Îstre§õwb&åèímThY % á<b$je|tÎŞ$?EeGíU$÷®?î\-Wåeï±ôq*öº"@(‰ñ4&e¤låoæ4¨p{Š!0¨l  à-"äôezÆ9i¡* b`½J
0 ! ˆ tJir'Qlmq%ì|5­¨a?tláŒ~¾Â ¤4#FBÕ#Kÿål0ô`i{tD¼e-µ.' vÍèócã9ğ)¢ÕkÅõr%LGhZgL1\H-Tk»\ ¡& Yn 0¢vù;pmûõ¢ €YR($,!(4$ÀEqovO$6ç(æl _ß^a$ÅluÎT¤ vìùs½1MÈy¬a3sfsfNiA|O]hj dt 9 EGi(™YtFedmz8/fft¨-z>Gdgmek·HËûlg4`0P$#4o&$E'|^]KBYi!C€"¾¹-GbjEit$v%ô'NX:oabtm
àimÑn}Xmq-0o3E!Ch,pz{`msu(ÅeDy=2q& j„4yy9qZ|–cp'ò†YBOoal©9¢ªu-ä3*c (04ày;%£ £ )¯›   ]qñæõEsk}@$aRi$g#hi‚[hc !~nõíÿşLlà`WAoh|1?y Fı*eyD{+`	b0P°e8µs;Wm&UBgLvSo*[DPo,b{#&Âq@; %iCME@Q-$ès8ï-i~tb(0
A`1f-"ˆX ,+#ö`ğiå4,C*`0! ÁÌáÎáe Eg\Sv_Ä@cV(7nY­Glt©`s	(  $  znhz~(ÀjpA>g­t¨ç#¤Ilµ5d~h´/.eDåî„/,pÄEz(áC…~IeÉ¹;
  ##ıä"s}	ViÇ,vu´C×â'bRiLîs—é"c5!'oeMnr`Akä&És¦4`ky-EyHH0¨Ä¶›tul}oeqhÉrCGpÍ*agoco‰Qn`-qe94,m!j,7 u`kò8õ_aabHuí1t|rD Î¥qopbcwY¼4¤g2ƒ#[²° Ï¯ægygàê?lÿI‹o	2¤$ö B0µ¬g´qt!- láD)NKs	OKÉb=q`$0â s'öÿZå"WRgÊeK*h€ #pä*: ãude€ËaDKEdeDcl…©j"y0 ea8djwg‡"fe·¤njh~2,f]ë ij)(4O0Wíx*!-7nP(4`w /œádiébM#HXwD%&NAAoÚHqa/P! aCèdw¯EpoeDvv!…;Ò
e0$õ¹"­ âö5,Ic*æuô|DRdYok•I;*dºˆ 101,!R}ôZî tBµ®p{dx1.O IuO@y0 &¤%¢$(‘ó1!ñm38SeDaÕTGNÅuÇYx‰`w^ 8%`#PMäU:$ªíÛd¡‹<dd–	‡',9
8à3xwhåaıJ 7ê* € ùhM¥z/=+?a™„%o4-,1-mliÌ=(,¤ A,	%¼)-(!;= <m,-¹-m, -üi­%)-e,ìˆ/­­½-,+H`e*:4codsD7Œõ@v4.0/oz0]Ê)|ebOM0k,e|>%vÿn*rh/zcfjJ'hf %Iqg9MV<uŞÔ­Q Ä[ (`^°-kKûoı"6"<noe-Mgls-&mdslgë0ª"hÏÃ#l +l/æhÁånW)Ú ¡4: ­?mm=M¤—¬Mgn7-gã'm-/©ï½¢-®l-,8-~)h±7-,½		/=ø-<=/£½+%em,-)©=/i >½C, Ão^s¼(THfâèeêyWËâkr0iug@s05B*#kgønjt, ?åt¨'E =2hmf&øë`›/ãe$dA#nóT"oléËëE;hNuœbqídck?@qmn`S 'eclvo£elrÅİ\F¬GØe¹0 0ggï÷31¬ëM¥$_`]mpfD#œfNâO»z!¸ §æjdZq`âämò,†"z5)iWàı>`Ø©b~;Eî…N}o ¯ID@Òb?ómksìIÃ#1¢$#fñâiù¢}Ecf^ão™{*+neWêP)ô[( ¥ 0xiifì*~8P&,'ABˆAwİ/}G-wdµ¶exìg.÷C]F=L0(©"1)™h ¡ )
8±V÷,².Dö!g-"dN„few|¼`	.‡±©$,°0oÒF`è!"aB``¡]qÀŒ7 F¡jLvØys©	!cN"$&C!1	>Ve<apş’«6(Fà2}«Âá ƒ3¿ló°`n3RfA|!½$%aXI.g)hg6•3ët[çlgQòÏ .pC((Øü8ælò/# ïeòyt/V;ú}ÿo²	é/ 0À g¬f¢â ün×denÁg@"s/PoçNdÎ'$$ÅzWp]`Ue	nwáôfLIzEeşipg»&L%dho&´`HwuTõ	IGˆ$§t–lóãzaÀmä;~pd[@¨gøs $a; KÇhno`g²süªu>pÄíígpä¸5
|§`cd%$¨]Au+ÏgE§= (5 iÎ#p ê+uoO%T
¯E«º#! , |§¿Gp#p8
 /ª)  2 /.)=.M<ml4y-lˆ».?M-%ìj>=-†o$+%+(~µÿ97-¼é(/IIe>=mü/TM%9…-¥„,¸)	&o$¦«â>¡7$Óƒsäj=uÙOò	 5giÅûÚNhQ®¡  z Lu“%~wnt‰$ndPdeZÄ(*i4l’ :om6iõk¡ïlõt~kaï-B3ğpaP-bmotiåaéü/Èk+Æ¯REKn) [8a--émL%>?û¬-=ä¹ùm/7+¹¬Ae½!],I(	¯¯	c|-­/-.,-%¯%d-¥=‹,Me.ç%…9-­®)­ª,:³;‰
ï`.J  `z©%!,,u%8o&/±,%«-n)®H.!Å¯aŒ=u	»//!Œ-mâ}%/l$-}ì%ï)=M„-«¯»ëÉšp ¼KyÂ~rd .4b
 (  `Mom%=)#),-/m/-.Mm%-ŒL+m=))-5=-)E½!--?+}/<|/(&=iìme2-g-)è€&%ªó*	(4z/u&bÎauD­l#z	'a`r2Ô#¼K°0a]6iQ@ÕdT0+`{÷k-3b‚,Q!rtuß*!ív. Et^~[dÅa ¹ `l{Œï·AˆUi)ilL+$c~BÓt"ETÅ^LYã8W2}lbëX^ueMnLT~¨ÍëCæ§ı™«š– Bg.st UFBT_CoÉRM  0c,i7D&´Om^ENOcpI}u<À2úa'N?tk$AÛSÛ®sw5UADD!¥UX5dé¤q'' $'ŞZwul#NaS^fAÇ~CAOú$98} 3hÍ7º2¤)¯* f+=#a'	o¥w5%o]YM'!L5%--í>Q­5-$k­!ı%‹<?.')>=í.)%/ë¥‰«/. ˆ--)e­«((*ª*C`ø?Ñd}~ånc~qFo^!(¤J€l³¥-…ïíí•„	lo-M//m4<-§ì=‰)-$.p<n!öm¹§©n%<='}ï--;|3eEi	(,ék}R `j*o 
ìoQ!sxØd%^~!öx  *e÷¡3E`oWB"/Åj"s   dë¿bdĞd"R((¹zvc¡i#)æ]Ğ ËUEÓ!)±›H!¤ì ¥êgWgrNNd
Q<t;O2¤9 /V;±ğğQf|)cûJ+ ª)mNE(¬{J !ã1raúf6 !äé:åd¶d/54? ÅBun6lanDìÅó¶2°evXb9zhmb/äMeJD¿4)hEx%UÍ@ÌÅpå#y*_(4 ç4KvKılsl veîUjfef¹unJRzbeofwÕ)²o^Ä± 0`A €ê=u^.»4b!&ğ€(˜€r¡bàhi3&Öe)ãåune.f-—CcM³.Âd)Æv¥	cÌÙá_ÑEŸÑá-8)[Îš! ¸Ypbc&cT-mkNìyeyv&Şq= tÌis>^íşdmæP.ËmdSùis‚/üvhiş3Í#EvßMjOÜNDSÌ8½±k	¤r¢(,]yyr2¿q<uçoBsdE#@fK›"9d;>uùY:.^dCSğ"«9hÍlé~U,³‡+ú¾©CŸe/ôM,itL$~cGomNA0ig+}(`$U2=&Jœ²©2£dq	
*n::1[41óöR@yVx-OeN,, s8"pB  4cág)Ÿµj·$}NP<2doÊ>ch!8h.9b(1$D£Fp°úÎGbr TÈnw#¡pªth©q"e-åwovL ÂN@£LN[Ee/m¡1hbà eˆíºv~Iw1g¿ájEz H }ˆ+dctmV(sL{º¤ $½ê~ap8B(c[5ggøijP}zÖkBe.çonviO)bS‹1""1“GøáåÅÒ>iµkég&e3C<|`5úPi/ê9
~+$ °%ª  6Ãs.Du2e)ô0·@JLvtcmZrCSå)÷åA1|aFëfxe:Ypbz‹Z"6 !„ãG``[uaooäkùìbéf áh=63sTpkmõ®@»¨ Ğ á‚d`!§<Xì4wpn»Š$¨J& ¡( o* lÁ¡¢D£{`²êàÁ-k£L/fQ#Û`:\"¼ntär&dbx|m a?ÏOxç'stkÛå3M¼q8äN$\ xXi%k]ag8Q536§Éo.çäó|ffÌr7 ?\C"â( "b²Sl;v(~qÿFu‘EMJ¢ozmsï1Ïîtxã$¤ÿcget #[&ol%al½2%9¿0b"`()(·¨
)!  ( B!$Fw;B«=ífá++dxlr¹z’"!.d000';)%"32¦l(!8":Ã&†P*0Œ%•xoa,-=Ş¡8h£o%ìm¼g-)Í/,,	«+kM	el= u-.­Y­,$¹	«E%ø‹¥)Yg­9­¤©E¾ğ¡$¢0Ä)4a $ğñ‰¡msHò«%ÎtaTéod
È  
  ‡)%½ù<e­1?e-=e))/ˆ5íˆ­/+%ï)m¬½¥9=m¬+5¯o)=,59#+)'©­$-0‰;/m/)//mÔ!  .e 3d¤ÄNAjê_Ù0mHss¬A'î'R(™ÅyH68 çG]írG§5"f^ª:Kx6hjà/¨$m¯f
%¡!)¨ÿ»-$mh,8¢-mU]-/©Õú¥%}}iG$-7-1}I-=)¬­—iil+-%m=mmå/­J0&q.kUv@uû"…€k)É},,loM¯,¾m5üyy¯è½g=ˆèm4.nõ¥‰e,-»5-	}»<-¼4œ-¬5Œ)p‹4-©?ÏI/--(åqJ'"$ª 'fm84qhiÔT$tG {Py|Rl-
ìxëf8úESgjy|C6qêe7%Nt*``Ê«Ìƒfg¶ˆ8uOAïTr2pbÚ-)(Gmw*ğ'[D*Á†%+Ìd4.ámml->*/¥-­¥)¬-m/*--,#+,M&­(í-+5-,)å,­ìï±'¨=¬,…=l<, 1\±-:
-odª´€'O”²tskp)63.3$²)xz}ötm.öBSZ$((¢±hzş7Æye&nñîøTq4Ímw(jéädhS'Ui%duClcÏo&t3²wşçocXb9“Ep*b~ç¢o$qf_OieNßG#Š$¢8%(%-¨©-„-M°%	6elUŒ=)µ*­mjÍ-¯=4­}õ	L¤}M%¡)é)mŒ)!G=­}%,M%¡+,>': („m¯²7Š(Šë&d¿¯=)í=//%/íí-o-¥-/)lu=%'©<.e}%))9)¬*Ím.­©)'a>-¥$M!m­(-5Í$|<7e-)°(eª Ïz2pnå+â@$. ,½g)~½7e?e÷%xh|/(,¦§lÍ=M,N‡¯e=©/)Ì,)>%-+gíe?¨)g]u-).m­7Ÿ8­/$9
 "0(öNYgsÌáz&WmÔ-C$QğzU0tK^±a(bä(AtyÛJÌ3dâ ÿ`mbz,r=VUln¤;(d0cGÊ>q 7VÁN03KrpÔ@q‚KNDLûPHİ,x}`¿"d$bo~cõ"LA”@ŞQ’›wêÅÙn$=Š?ma5±ï)t=&kB c­hrô,“XPRSÆÃåøkAüÂÖE ;1 #Car8E'*Á "olbTdSeNDmJ`_vdKÄ×ÇC,Q&½54`7YdådK-kp½t/·lQBîT4u6Î"ŞgT"úmï/l$ÁvLNFßbL~S[<FPSV©ù`J°z "ç|ãÃiÄjTTEï–‹‰„jmd{DñòWŠPèW*ÅYdõ}ÓZ
 ¥Üî £$&¢9=œ%½$'½…©+e+7/%==$Œe)4,(=,|-®myµâ)Œ/-e%,í	"¬%+­à,+e-¥(§&½-íe--:a‹"8BO9Rc!TDf(my¹j‚p*""9.YŒ#¯ ©È--=O¬(ì-}l=ÿ='?!­==?É--›--)İ,,\-,/á/¬(¬.ı--/mË-­)®i80 ,gê0"Jniùâ Â•P4s~$åltbnpÛ´Wë{'GnğpO(cnöÙŠ…8 !vgJWí4Zµ³zX  !¸ÑÕĞP©+ g®<)AõGz'&^
¢ ªa2´ÿmsz Œ@M&g9B, ¹8u«0qJì	ã† $0!pog'×á)!{>8h¤127/`mf~åìfTós ìL`hon)0=zV°ğ1cia¯(3%Sû%Ä 8ìv0hõpÖ$ğ †îtz¡hØrWÈ¥xo<ôdWa)D$`l8a~do'ÿî¥(l ".FtüÎÕˆ$L¬@4EL)í.OeheÁ]¶..sg8Ñ.q9iJaøçi‡as+á°tfC{d$cDdMë2/SíL élp&ñ,ÁzqLÓô-=^`g®w(J|[_4UîBL-~¡KUJÕ@5ó-©>¢08 hì/0KthTP·Ú‚ì` ,#vòxkùYUQu)Iï4oö$É@'2b[Vni-|zÚƒ"¡­e!wupd;t¡)jW(#``,XdŞOTi&b!9}{	  c ¢©"+áÓJ$Äqta ="ptÿí%.í@]ØtWzFupglùtejæé:T`csÊ;HK"%à!"h©!L„(í¦Uão<;­ üjîS<d z$2à0-  ƒ8 dy÷d[ã/m¤MK!*/ä@d!¤pd½€ 8@à+=èc 0ä ÿJx²<?Œ‚/®
	8e¥;!-%)$/=-O£$5ì<­í%-­-l4 /©=54)>hm'¡emm-im¯!-});8­+=¬¥-Í|/­(¯\­{)}?/?em¦À((€IŸ>(g0é:“ùp e5mNÌlpinI`!+n.¬]½nÍ/%¬+%®y-MOyˆ$¤,ü$)¾K----=9,=-Ì	-ñ%mm)o/5//¤E‰=½=$)&/?'+!Š
 (evan¾ÉæN5i¢?^o/e-yE-îJ|<0§VONDwNkËƒO\Á€?Et ,x¤1ÀDbTÂ^UÃUÔ¥eÖnd4,()1Aìp-là[³0ehè0¥j|&qzçtM|,Dd~'dìÔ*)3;æ¡Â ã»lt&g·ôô/!µà¬E{d.2:et¦eşì prô©VdFÁ3×ëÒdbVÃTIOGbUá{( b¨ öæş”"(DÓÔ[ +CqxwvèlGáEòa~-$4eLÎ[0 Şauëeu4=o­,d( êdèV,vB–aÌD¸`2à]ky 6£êª$â(* i-%Œ],%l-ê,d=-ı¦u}8<%çI½é-©]/)--¬å«(­œ%-c +§}'=-.É}…¹%)   "0Š6ds9Z:£dh"3¼4-´	%ı(-ï@/,¼Ml/õOãÈ}í--½),i- =ó;,mmİË)½9‰7d=)<-½¬%-™-)%­­?-e$- a`"%cft¡(ëôv|fdÆBfu.S÷drudïgnH»1N 
gsjdíG dòestlºi3èj¯š`ld0-r…JÙpcIMş]G½ëªuEp]î)9
Äd+JKOb„@®¢d<-h=M|,'©-6¬;=-e[%)¼< 	©-,%-&:]o)i<	l )€/ ===^¬=®¬­ï!‡	f½­®¸my,M)4´!¤$HauÔirb%a,a÷ñ?Oıº`eGiì@DIi=lõíR*acŠ)P!ª½}/òå¬S%Løèä/G WR* 9pDfq2..ïAôgp†#½^-TuÃ.w|Ot0…ó«4'7nêMãlî/L‹UJW) şÀ®#l­(©=zÅÃ--é-å5?¥9¬¨'(¥n$=}OÈ8-!(oİ)½6d-ia+-ï(/(½-%ı¤-`)-Mo¤e<(yg (£$uNDÔI¯f æè“íê'èá` dÈÒd:+
 hç*(¡ú<$}}h%8¶]ho)ä_1Àt,¡q9ä%rêcBuxc
# UÛ ". b7#2#h|¸}=†'FQ|ui·]t/ª000$0 åg5Å®n nalQA>¸0 [âXŠ°â´ yD,ª~øjò¯9kJÕTCÍr8&3dm4sUä"#æwÉ(i({p) ö! petØr~aNW©cm*J<éL+³:!,%áùJ2
ö0¥#¤o:@Ì ¨+hıwv1' 9Í>à&]8&ã©6¹N%h!*JhseàuVÛªL%2í;B¨!8D/¾*1|*ò­TıXK¡7åió2tóÈˆXvòîãDeMg.ìÖ=sìa@DY1‰Ky(¿a*psd á çoWíŒâ£!x(#idmu*E('G-–S.G"C(PäPe$ûkH8TiLÛ:o:ÃS2ì8)Q0x9*2 =Š `bmnu~!ÍpniP ñ”~z ¼?Š `€Ñ%>H4`6R`m@eLu¬måZU.(TW}$¨ï`mğe©`*%a ¦-"cÌaneâcDPÁ5|zkFå<A©pddsa'Âú©¤zúo`}uzyªŠtuPBi%hú[~9?,rK$Xq'
û*¡ "p}ĞD	`"2giCè1„qdQi50RéÄ7üAºámç§mn`èbQáù] p/ á1 o,ñIUn@~,»:peGôt’mbut/LdíÒA‰bS
+ÿl#qï¡\h^eI`taË%y(ëey-9`©<"  8-ˆÀ $ì/o|ÎÀèáË2z`Qle0Ü³`eHd=aú A1{bC @" k&d¬eFd]$.¸sT°2l*!1 0.'QgP-toë›(! @!b¨ı
¡ c˜y¢[nG-D
t†k`÷ĞÅ¬­ OJ" !`" _p*#cT+åùw o}u/mdb&feğ cU&nKLep)ÛÓ{<>°jv./,pçTsGd)ä'b6&	ä`Mçâi¨*"i!-?3y« `$0¨dQetò&yÂ!M	¿9je¹{ød6ûË'hBzp_.=3§-8 ˆä   !`]3ÑKoq#'j_52eH;Z"c(ëâl*°kcNív¢%Q+£$iqòIKíy£ÌyÑ`i¾`ölí‘n^abêTH59¨  *i¢âWö>xQ²uÀey_ÀzJ},\+9dmğ}HäkfÆ&Qu`lÀ®-6MäQD`qwIjkkİ#Ë
1ètup |½:
 °¥(  ²mt2 ÁÖtb"u|€C#ä„0(&Š0ò$"#%ó|ulTÅTf²ébSÕi‰¡,åmeål ;MûYy „I(b¡y/ôxn 
Op-€¨ij‰D$ö|yf|oëO/dnoED÷Tiá]w+ aFÁdQ/vq)ey­vlbl*ua_qt-J%ø¨k8©qD¨)J$h#"ı,i"à  Gpb~­d¯§h¢È5jĞ(dy°d  #gmÇod¤8ec&$7-bknMKn3'ä:K'<NëãW|Zy†ùrãc|((
	ddK`!u}&`sD"2`ñ0S,¥5ñHxlã~¾tT°k°?Ê.äo¶lrUie	audq(Pb(0è‚ 81¿gntºdjÔ.|ç'µ¤&#ş­neo·Ìpëñ¡Hïb¶[õT#&*€¡ ÿïŒÄÜÒq
‹ ¾ losip,îî*%­ääÁæ, g*b'¡ a {ib½sj0k¨ ¸)¼  2ôÃR:,n(a}dnr?nöF“%vĞï;,+(è"€£Ó¨Zdeõ* {í]eğ^R>{æo¨æv,ıCì*ñ"!!>R2/Ş!¦H"u
b0Ì9X¡¥ì
jˆr( !6ƒ$`%n5-©œ-|¯|¨e¦h-•+%O·©,-Y,m}E)/M)}; 4½/—¥µà©§ç­Yi‹¤å-3$à½%.-o¯-h-;¨ hêJã~û7tgràŠuµ¬“ÉK*Ä+m¿såËea/b%d{oiüî½k»Jh!¸ò!f#öe#áä©n&!0¨e‰t(küt~°;¸7#(|nõN¾¥/í7cë~2¯gtrrã­{Kïn²*íI9LÚ	GESe'Šò@$:Då.¿z|-/åkI°-,­,;+å15a»',-­-'be-åŒk»,-'-d-#M!ì´,M/mm-'-}!-?-y4ı)`R¨k)£¤egêsµ%{È‡_İEØPz½*#c*pïîÇĞÀ[¡LpÚìò	êga'}¢¸Sˆ`ä€TğBU æa¥g³¯r$0Bìll¥ÎB*9"díc)g4Î4¾dwı/#®v8…E¥ïô5KÎ>18!"¤7!turÊ)Ó]®îå\¥1t$/ioeyef~&03\/°}¥ls=EWÙ°Ô-åKÆuöÎln3áLD åşÄjvp5SuÌd³T)Y$;Ş
X2: U¶ÚÚ`"b@ælfFu¥:3TeQt/Rh,{Iym&t)"çãõ]düQ¯F{IuoalfEç1åáŞx«":h¡bÀ ĞE|uf CeKŒPª[ieKlqX%Ìµqõ}ØÓmEgadm2>R`eæ¨qlrh/(u- #E$jSÈkpK{z$   İn

ğ(8 cukxló@oğEflôh\N0ó#lgdômò¨0rj8" %td5=sw¢Úı3/>F`¤$f*g!d[£.6èá4 à÷6:/W,qaA:¢nkLl$·!Bió} ºoğybìs¬q1\åjd'R);;˜%'De$ˆ© h`lAvñNÄñ¢ml5ù'nd¦ {á¥ekökr£~J¡  às¿osd#XhFå<L¡¯­Y:1 t!!Phye`HÂ?"4nûÈµäeeŞT&p'¡Mhôk9c›H¿"`  —&¯J|ÈT,)	óadøvÿÀ inf ÓuŸúæNgeåty e0}• q­dy6eÙMNóT?ÆKÈÖ§¦ ùlëyanéÒ§owlcM}d`l!œy&KÏ]MWzEÒá!ßj0.¡(rrF`áæ±I%fãT×wï3,Tk}qa)i#EngñG%ò=	 q! a¨.H+R›%0@mx$QîôAæè+g§Ïivg/cÙ{ y*3,@p=zJ"¢*B@cHqn1|zaQ!~"ñnc4åtëb>1aèvtØwp¥›ŠÑ! p ›ı2 0½ts ¶]Uz> ²säéî{ûè ]@
Dx‚Xäb7lì/¬ù¸mmu®àßeši­~s"8ğx$Ñ`Z(1aTe| "šeTægb.W(iwdÅZu`Û^vC/UwõzeläføWIddm~c)¬Ä!¢ mhui.gğ;rrEv+b?Wé)x*@`„@,09 èÉ0èpRÄr-èw#'sddmtS òumµcd.r;9q*xi¡ €``’6êeD•pn`S0QZ3Ïÿõ#³0!8è*¤A-
@è$ ) ¸"üBerAogw	? QÀö6înç[>õã O)o³sÁÌmn5ô|SIjl:ç¯,`e# +š@@'¬&`÷\Ç²bfÉÿƒ2ô` yk¢8=/%xt'\|5MUªu¥3[%Eæñot'ÀpS$5ía”,0eèU;¸u,E+ğÀt]NGê~U,vY#Âx:bn.nÿ;ƒ& (ã1@Ù(yôu0ìU`µÁ:0  +0)(m` (®FüTecSSüsUluaT}c]) s2:ª(`Š "fD$tyv{l_+íz·o(45à± ¨fí1!!n1#04l5rD05(˜}ylşi2xFLÅl{ŞlEnfifCií":å&²u¢¡v(>ítutn_](`  H}(j! #F+bañAC¬$BhIfRe.íld¹Ofj?1t*¥`á0 dBªêc$2$+#uArhmÅw= zbaæª!£Fıdtan4 'ìgòÕù§ô¥´åxhqg½™ceh!kM|=á·í2d¤o&sia{.¨>3¨ànd/(9#ü$%Sc«n~Ù*s^d)¤isjÎ5n|ã!qp_.çår(qãfDé<Nqä¹:(e1S³aù7c k6m;,fV P%D}¾$õ^ì-©…+b¯/øùãjå+­tÏ-®
© -$D zqrıòª„Ôøi5.cA}Ê9f/Jk{#fdUz,ká¯e/d|w-$ô©&<U AFyG;RÅ{w%fMf!JV}¡"’³!;gA{é@|h)¿
1
j‚Ü!€Ò;LŠ!!Š!!b	(+D <k°…$(Lï>­,Œ­ -')¯Œ)èuM=O--=hom¥µ}-I©I?5ML|LM5(m=*,/-à4â B‡r|3·Ò£V%)r3,­¥*+b%qÅÿfqæ¾c3 {	N`^÷fì|æ%]nh}BğÍü¢è@~ğpr.Še_fXm@&Ã)Kot½gbór?nj#}Fk°$r,oa‹+`ik§¡i‹ÅG'WF4ac '%7(3l©­…,%0«..ù+D?üm/&¬=Œl­9a--.od%)M¼‰9­½e(.=%e-¤/M¡))› $&
­9,éˆŠV4""i%%>­½l­?.=	•µ=´½$­!¿--,).¡5­ieM7m-=-+m=	x5¥ô	<-©­©$ì§­yÍ¡`~#`okè÷4'nqçª ` Š`m‰+¯9+	-=-¬<k¯§¥,==%»/¿-=eM-Q”?y-%-=	0%/®Œo9«%<%¨­I<.,îu¡K34{¿±cñlİÌî@Mõ a 4d5Ñàg+Qõä‡[Š#€rngñlÁÚI}MÅÛ¤!”'`oú1ZKuuLÊ ¡Ë?\DrYvUC 	taıq$:%kDSgYI*é:6ài_je&lãK1DVAßHG3,9üfDiôk	mz)ƒ8(×,Çm@¡`d`VW×DEBœ]‹EYª ÆÀ@C/wå¬|¿;!A7îpw@]H{z'·ÂYö VZKSıb~*§a@RwŞMö44fK‘`OLi|¦ÖçQÃ@E$ßLETgÃÉ—ÿ!$4ºh!²Vildtmû |kcåsj9|=¡qøóÊtr*”_`f©reb20Årº|mÿGh *CeM¤s4$V9Ùp_TY—OKT 7a 8;K"*I{nztÄtñ=y~ m"· `C¡Ğ¢œijü3štàhû815½" ¤<71âhaešşrFl 0kpl¹etX*zsoqmj$,€t¡çs}*1BO¶eSv‚L…`7X7t^õuWÅ1­²¤`*2u&'.»:{q1
0tJ, a¶ös–`D%bñ´l`^;#f`eâ1aò b(b(il{gft1D»#Æõ^»e0|p×ì$eâLIgŒ¢4°g-êoĞ#jú&gğm#hI&n?% $à)±dè`åª°ı
*I?ãôx|²æp).÷i%êb!=Tt@åq%ºÂ'Lã0"kkG\âïlşeAl!gäJ"p0!\ğá‚zhâë}E`.¯@ $D0u
wËh1`&ïno%%>gvğmo :ÃgbqG+KT\ŒUéÅNj>,ebgğU"mŠ41×ÿ~mtxÆCL…ÖÀRTW£=2hbGs'+
bèe÷"stà&QRQCTÆm~^Tljğ¤ gdgæt%	¨!ã/W}$NmR
ÖQN.ÿªVI\¬‡¢oòãghv
@0bo^11&kaMpüŸéBWBLKc—ğ=
úz ˆ4P[A=RiW}L„”OKŸÍt1"	BËMÆfBÈWÅHd J0’Aşr¬ŞvÛwLÛBõ[US @YÒ7ç\IËn_JiFDpQt;aagn[T"F^àÎO_EdIt,!arìmÆe8{EMMT_YE[¬áå Jdaånkóe0]LQ^PNÉ,$ñòked{AvRTMÛc1G5p+&`fÿ>_, T¢ÄFTİ_eÙ@EN£µ`N'9`ÿWb&?Ğ]dUKd“.%ufyŠ(á2ìkQ$ Eî-LtÉO_FËEG_lémµra¥.4g9-“D’DVšïQeÈ)Iıj§,<Ãan~¶@EdÄN_SU5S>4A¿ü01$h|u›úìëã&o'{NEaJTOD$exdk#c÷Y>2EÁD\ß`ßxQìQT,Jdfµ2°ìê5síS¤cct¦óÒD*9Û" Am6=¸omNWõ EÔL·=wÏİÀ­–E°¹¨êub}jjiMzDµ›STÆ
ßh!*h-syièa%ñor-AÔhNU£´OİBXÔK 8!Pà|ypçém/æ$û@Á^¶KrÅ],¡}a
  ak,s6¨D}EÿW]pOPeRLIŞÔ ¨ 8ñv	fXMóàoûTRVF]m•XdaxdwK £Òo,35¤DŞedUÃpFkOôE3]D ÿe¥PY- Dcõø„3
SVkgë 0mÛX  G÷{hÅNœ^ TGc^V\#wr8 J¦vxgÓõ‘bá¥iVBUKZ%èı`Êìf#v¯ôJMÖ]‹@TkË%L•…ğD`ËĞIˆ6®í(êmf!å8jmOIwËÄ•ql{ExD	Ğ_İmÙ´‚=t;!UAßkãTEDV	~RGK©aËŞH`pC[H&w`>pBK%qcj%3U_3ÎpL[Ë1é)ĞiPÙ*pé{	Áù<r‚ ÁgG~Cô0TBÊÖ_–ágıUÁQê_õS\od*2£´g|sqèg6 :go.2t4ËLsœIİ^qATÀªiã2 5P%pãT[w%<P`kH·4¢gi3WWÌ[ÍØKR„T!= —ì  õx
i°vË~x cÅÉBPgQ/qSQN *¸ 'â`G¿4{Ul-ei¥ì\m~ägßbåldy÷DASOHsKMÚCaRÄ }« rA9gø½iVgí)áäy¾¸ş7ˆ:(SOÓô8O\B_uWœ@C@YÜv#5f'md2o=r%m¥B%<>j]y2*!  aïf}ôÃa£COÖPÍMRÑàÔ(= bâqü¯7räì/tei¬1qTb3‚rcî7\JÇXAR<N‰İD^ÈO-Nödà[uRInUà**p"M{æDS-gMtOö£Ôš³Iï#vfˆÖÄNLB}KèwBËV{ÖL$!@8D'¨iÃT9lmƒ{*ñ$coşs|2óe;B×0NP=aƒ|YÜEFañM ½ #AMıQ6d¼#±~#Uunl¿I=Ea'Hz$kojW|"{‰Ü“UÏâ_|OZ¢7´£&òusep jt¥`£»¢©"nn:ÚÀÂGlåÃoW`DULQÙ]¢?nemuéçd­_ä~Äı0klÓi3
  c*jP}¢s\ÎRT„YneZ@ÌRJUV¡e$,®!sgusml®mÎtm<f-V|ıäª-yG}sHMÔm49(áseWc»® ˆ1ËæsRâqA×VKb[OEXƒAÜX“ m%.
q°OU3dl¥ilt whîWzë:“4ÂsşFApe'Åæ_[]LN$	Ç3TJV¥ÿC
ÚeÅä"<‚W~ü)Reeôİ§;ckês\`ÓDIAÔoÀWÄAdƒWS	Eà0}(‡Û0ğ|ã=Jò-°ämdS]@wqatài"yhska%…g
É7n-<»Ïnft’ĞO¬EGSoKĞTB\zéÆA"%‹[,+áåE¬eâ,rˆõ-‚a2oi;¨r]-Š Ôrwn#¤@ToÍXU!c}U)˜OïÖGK(hñ°`t?•7y
1(kålón(REm^ÄÒo`rĞàÎ@À’070glcn¥93"**‚(1`:å)=m))=|-­=9-=$©$'+9m¥e-l/--%Ym­­fM†o%-F(o:.1,ií<¡}-'%--†m!!/]}€#*.!ndõû \äfJW{v¡çìb¦Ğj©|l­m
!~(-‰­½åy-ôI«áMm./(½,?!,/-<M_/,/8m=ûü,¿¬Ì-Ûe™'e§¥¥?)==$&i(%(Š` ceeó~@qá`Oåc¥``% ô,ÆE«¨BäSm†Ot`çfenU#›h}4omna4"(ÀjRltıƒqåntl`CnşnéZi#Û¶ò#tfäsGpíhñ,wEaNt)> "y“Thm7ŠßyU'<Òvnßu<¬;ª1  3,è*k%ía\Ğq>~¢è"•&êµj&»b(0„at(c:òcuéEÍåLaej<(±Nßl("
*)`#d ¦9hq>OA7Ïqw1E…@$'&álq;
1( p htiéræ_~úÃxij+Ga±2jsíq'‡å¡(! hhs)tï=cCDcíµ|k¿¡jdEl/
Ap£  `t.m.U=}ôjÓUhbö0°+š%(!4õy«"¦eîôc¬Dìştà| ü 1{J%`¢¦$`YlM+*ugg.$9gé;8p|iun\gç62güAN*anobëc¦ %à*  <(MÔ+ß®liG8\_u7Fíg.})t"=ZE)wCæubÄlwèÎ1/F.$lc©ãMédCY®]uONçOYÜÖúiÕhyÛ*_Rhì$q\T(»  äD¤†t©i*1gôq<r`~ñ1Aü°=#kmn_i?[nsw£væ%¥ïî$NéJÌ¬}¨³D}Ce}GN
æyeekN$L?iöCwa\Gqnm!V|p`®©nb· ÷1ª0 *`*(4`©ÔºÜpOykxt2Bem|v>*Íæ*Èean$ëN$o}nÿéÎ1rq¶dN|)û
`ab "@Ùpát'G$DğTbåo6.Yw,åìÄ&{¬";`°4[ 9¤Geu¤5¢sÀ!,`€qµ|yIåtô"[%ô3uôR¾{ _*>b`
4qift4òlÄ5g yït$eY  ¨ $ßËˆ£"'L8k!Ùåõ$nCOE2¥hqb (á$ZdÔ%t¾"Q„I$äÜ"*° ‰";&ağ5!|ícª	Ë¢!h³nuy”
è&{_%  °­g4];=OcbeŠ^PneRZÅTa3èpiE"üÒ(e¡iw|{_éãoRK{ïfşm.©){‚"cfá!'"ÔM£er…ñmlŞ+^4bgM§n"`‰ `Ñm¤;#ogp ti[iWìuJ¡ " %?¯¥ÍÿvøRar!6w( /ó4xåØ³q¥nv#isv§p$F?w˜¦f`0 à€(d0£lëcqx!êTîxi çD(7î¤m\ir(r~,$oce}ôíDÆ5/! ; 5¤#"Êâp.é2mzÅô1%)+‚F!¤0!U‹B´ ‚ÿ†bá))`v!¶É8+	1#BbªğÀ}As~iùd	OLSPw×yÈ# $¢} ¢ 1°q)dût òa”  "Ë$4Èy)&$e°$£­G%æda{ ("	 1**Tj©×.J}7PÁ'oEz½lwbeD8$¤ € )Wsx f(‹)SbLäã`o0A.VQvtüTjüaÎî¢L|k<M\_ç\XwîÔÆEVm„`@%'“qèEEgV{½1k‰¡%.!€0"TRKO-írrajóx8oêeÏdé=GYuleoøä\h;B©)Œ48v(i{¾!eG~åª°Rüÿ	s
ğ$¶p@i/j  ­dbk~iÁâA61eYnq¬hôilc$:ufuzæQ-!»
8"¡ø@4ë>^x®tcávrÈ(>`ju\l;K`² "±
£ ¸!c‘c¥W&ğn&/g	k2a¡ğ! Kg2y@zfiD/b[éŒ€  f	4ím?ßmSs`Uw %¾ ¶aì%  hº w }H @¤)%@·b¬u@("#×	mT`t|q}i¢9,¨& k!±Ajçe8YNÄiz~áH€èJ zbÛ*³{ÅÖ6%.(¿†*&€`t* 4Rëawÿa®V=Rf!J=¦FuıH¤%+6 É
b² !¥¨ Hf!
uè{ë.}bo>eaç6&bct@Ó-YK'lö9µ,yç-órNSlf(!!pø9‘Ì3MsX@yc¤D7XzK0x*j!#têkcş=dtæ±tDnô%ÿu`ì0±*‚ 0 5  €tHIyJíHnméP6yL`9"s¥BI~Læ¿~a$§*d'£|hå&û,öiJrihë6;Ûejäáğ=¡äÉ*şîbx0\bGcTa#4fu ª(fyy~,orvsdÀ9xr8,Lespo$Jíqo_3fZf Uê#N±Rv@,y
#¨ ÿá  À} ¨ |r?2q/„÷óOa¨¨!b!…%t%wH‡ukv$AÜOUç/$6$(ÓthgCxJÃFıyæó(>cÇnen[QFŒRTjG	b´I×GMèP÷TşlHs4?¥lãle&p¯{)ŠÈ ` ´„coíRòeûc7m¢UINM`½= uxI¯M÷7tÙq]oEiæÍa¬dh+òÑa(ôQld_aow(}J!¤„  &R$9¡+l"åi 2qHea6ue|gçsè$ç%1h5á¢ y|T-.75z`< 9ÿ"!( ²l 0¹¥dWZæ"yá à\J(à ¤d >æ0ôMfC6OI'‘ex_knwl ÿƒ  €|æ("¡I`en´háo¤fâH9.fhTnèá¯ÜL|mHÍ°X-`ŒTP_S\ÙL, ¨!á-6 thé.o/[-DeÚ,)[É"&¢ª‰ú5auî9
1ˆ!c€!ünˆ `è£%†lªñ³tºäijdmhn»0)½lux9@r
  l¸%! dvj³Yg1…ª)é‚àÈ"`à"1ä8aS.f]c&ñ¬;¿R8! B4iråtitº:)Òq!x,yKJ "c6¡åCj[ubÃRÌ¥Ø %tnd0 %àñDT!vEkïæe*%(KÊdRFMÇy7ƒ¹G æµW_X1ÅÖ>@F¢#t1 ¥bAmSxOÇb‰ägŠoòe b¶)T*pj-.m|%erQÿFcåd[H?¦dà¨E¨o/‚ĞpkrĞ¨Ş
Je`ò2Såu|@/+ Éc~2lNÉra»>1€4@ÃÏnbavª(`Û#¼G,gW`ğn då,zD°ê" ˆ*& OiêI0}LD—4z/EE{á)¶MpóRõZ`{»ixêSëìwufwnrƒ, 2€"(a!à®+út_qôÿN…qj7¦Qg4»< njna'õ¯ 5
gÏdDbg¢:0+gI
(	!0ªo©/€¨ ¡*v±uuÿ(Eb^eV~eYò"îA]-J0oo*ÂA ,0ä¸f1uLÔWN%k¬j!{
  &` pey%öz)vGêBlå)"  İ 2±@ò\{enDÍåTqúe¨5bYZd ´c°Ëm_0T°`cs@%Í~B],¼,§G0h2EçSÑ,K/„ü+q¿kTcxtb@(ù
,a”€‚ip1²sEŒm1a&ˆ=!A_AP‡$IÒ)sĞOt+¤[
¤$$¤!B(·)tñÔw:a1)q˜¥Ué#0 ¼¢óÉv,MlÚIa Ïv },aj3€!<O‡`*®tjı~.Ğ{tgÄ4êô!*»(0  $aìIy¬4Ë}aÈÌá¦ôap )Ä4; i%+"Á?ç´1$MN}cdeş;š0$, 4 6¡DtugK;pe!";mÊ:>!Ó"‘zübr&W÷|ÙäuªöÈöåcvyD!|,8p~ usSEK%©nF_iO@D#;¼gK“ÅCTyOJYN[f¹Qf°V/_0+\¢VìgÎ`e.p-x)d`l!bXiM {* ¢1cf"(ôæaS/[#~÷¶hooå]Qâ#0 +à
 ( ¢‡"b A'gxöXå~emwHî,Q@eY%İAHeMe®¸¨ ÍıçFFõjGÛÀWll ~Çdt`5³@TLic.ÜU„]÷z5úffd	,Š~$¹é "$y*!t0  `t*jıHı#hrmï9g,|”¥ã == ""oudR't ã!£ø)` C~a,l\gp(uolhZXé8¼õntåe~5(dGÇŞòûwMQtETU,iEvnp ½:*5Iãñ.Iqòg=d–$vf)
9!;¡  €8PZáN`ÎqTú %v)kc0öl{1.ßlHä-fä:âu^dÎ4[IG}QÉEATß#cÕeL`&|(fly£<3[rje Á½gT)-  !|J:¤`ª¸gSº:6Xè1|]gîwik.dÎQcH&,!`ôyg>ÏzŞE[Ñ[lğ8Ë[|m09 rjœ3lP(p 4hLs(»A<DÏuÇÈ~f/~Î3ôcn½ğq`-a”e` ²N(¨!"};´(á Iì%ÒoRr	v;fw-qcue,}v÷i #úáê’9"¥²‹lvá1êìCPgë½6Bí
uu7óh*½……Ç`_t6Ş¢ 8b¤9°òjôw6lŞòO!º|0ojuváät}®R c- (eöelA­aÿé¾hirÔy´uh<,¥  kI‹”sk@T@GNrÅNhC!æ6õÿq.ô/‹¯v¥tyøä@TX/"MYDQÑwSİzNwÄOUD±ˆ !§%O¿* $¨c?m6u`2`F l9 Evç&|¬-®BÚ*  !¨"¤"$o¦à¨âÂS"nA.|E&GF<>SS`j¥æe®á%¯qX22(‚0 ˆ „æ`KhG5ğ¨Ãd§ÀtXÊ4'!vens.â¯I¥lr9>$là$`À1¡¿ át¹g#-ş¥öéA[l‹ıı-nôuòvtîv4x5h(t`$ BÇaVi|b9<oòkİƒ}ñrôŒ?`fCm® \tkdk¬.z?m:cM‹d.VPj!(a($°£&:$   (èMê b4 pA3ÇÏGö ÄOô%¨*dLftp¹Ş%2ç(4 , !0" AjsLg,¢ïöa›uac%vk=(ú(l% `Õgv$cs2*$$6m/ÓJad `àp5"@v˜bc.=IWÁRBl$~ù’=%Pz#.|nUwõb,tó>"3u`¬`t'dosEÊepo„d¶/ğè r
5(ÿ 0ò2 grCï<fdêej`ar[s]&Â,he6Ø -!x L .WlwCJJtwfU~Æ ª"  y{"!I0($`o7{ü kîulp ¡$`.fq­|0S8; `"$A)mæ iäÑPŸe`ñårej”ouCî°EfEND¸$s¸) ²(8*  $%Ôá{s6Gõ%`e-qLd¬(e45$q„ieiQvlQ E0¤êa
®aoU'Ø“w ·z¿+<°h4tâ()¶‚ãåÃ ˜#t¢i2>WXs,|3zW98]ª=@« `´£r0 tHék¨×j¯."
2`xtn µà!</qf–q²{†"„p$¡" - I/ˆ`î³ciáålWalågî£0nG@!liÔMpe, mï@u,åò{âw7Üy&å ar'ªÆyrä$ áARp!`( 1 ½m`êÊê@$Ûo!phÿdowrg C]mô)tYbúTid{1u{âF•s1nepF-v4at!à)}fu F%roVqLaâ`#/ `" 2/%öe‘dD³XkH Wbk|i~g)eîôlh¢ùyåö±påë0à §hódHrËä? »¹ô¨  ! d¡kµ!bm+ML(|o³øµb4Fr 4Kùn|D/%
€ôYX,h"kğ~=hdw ¤pluÈcÒv$yGÅl’rdju*8($ *!,}[ ÿÄ)H¦c t¨gˆ÷õDuôe ğï¥ ÷åavC2²îo d"LoñruµN|ÃÒ¤cge&aş¢-~d×
`ugd
% Já/ö$Íp ‚_w,öirlíÉ AîU,AbYe> û`T!$mmñ÷† ¶Ïíjl-wÆchíqo®,H\A#ëlç4y	 €;(02 )à¥¯6ov~ódk îodu-P¥[)æ%©-xxnk#{wx{¡b%#4wpt(a]Cé9D/ €¤@° ¨@¬BésjX }2*©©
P,( ‰ì(1`)-0(ôj©ójğhpgh–jdì½¶h9s‹!º  )j3`´`!)aÕAmÍja}‡p)3s-tlA\Di>çoôĞ:CÚ‘@h 0`0`b<I &¸0( ²¨0d@y#> ú5C.TI`åke†0?$q-”PemÇµ_(å}eGu8½>ôboMQ«KøkZhAvd5)| EÑS Ø”ÅjD-KÍÉğaKÁhTä:¡u¬A1ú_»ÃOÅAÇ=IXtÁ"ğl9à¤$¥g"òÍ "l f+ŠÎ(!&LÛel=Có%xÛ%ïƒ"véfuhCML–]OîTÏ{Iæ­0ymg(oe¼`iåLt¹æûê©e)(mT÷/ı{W8=<!ˆ.Ô`!§°e*'mv˜Hajvı!xk& hwéeíi =FÕÎGGNÊAGÛS4dÒH 8µbÖvà>1(!BåND¾WFV`J¤Tkmulu)%“¤ x`"¢}m3˜"  ìdË"@Št`xâªWpolôésLGqoe' :"¤(` "¡uµcnpMán4x5~şœï¤1h¸s;6ı„Í%lRGß„ÜuäOS\]Rt©Sfl.#v°~~ğ?~0{t$d¤gvjt:(Š ¨° À¡bFFïáî`Xëõ/,Dr.ïoi©KC]ñ{den-!e×C­ÃPMKNÖSRO‚hmre.Ù,<¸8e&d%asFök‰%*
 1âàa! Õli3î×íävfå_vzãba³RlAyp,á%D(òNYÓ[7j$l”_UM[GTÍInõV9j*9’€Ñ  0 =ahó» , j°  âDSá>Dëaÿ lE>.ï)r(áR¨×izåo%/ug€]TSNt`G“ÈCF¶u¯(EváNu <lJ“`frÿ,ånæT94Xî(4b $P1£0½eHqUlAz/`J°3I¨weÑE)D-en”¹WU^şD7W+NLËPÔ.°ıx%rQ5)v`E¯ t8At%Îh`S2
&b+" o8`„zÌ"gN©úfj$sÎM$0>ki[wfìWıQït–/ÆîT\ïÔ[	Nå\½äÆgİ`m?U…F`Øã\et©iZJ¯+``ıJ1ä *ş
JJzpº{ÊÃIq"Gnª`zE'r	K(ëPx °yb¤º=(.U}ô|V½0t9²cã'i¶g{2½gæÃN´ÖüeFÄağäVyca%p"3`yh, u¡a, 3ReG\¬w258­d)0|*(i ¤8"ç.ns4Xé`ecf}N¾.¥Ğ{AAŸ|cäIÓIA@+R‹t¼î`ŠÏlùw{ª>!+) $$ /æ+reotñGnNBy¢¨# „t=Wuæ8:ôv%züEvI'Dt(À:Jg©$¡)á,"qôM3>Ïpø`DÅ¨ĞAUcödÏ{#kH#@ELh}
  `7

4X"]s%thöMnl I,E&Digä`1 {$208h5jïa®ßi@EoW? dEnDnÜ<&,0etsmT&Ğ
|áBmnp
oL!\A²m-eÂ4f|8d~/lµDfù¥n(rgHCu0HtID"$luoDæ¶t!:Ep&N6(/+*"áP];
 `  zmu³Zd#nh¯â¬÷ikıis&á~``ğWr,÷Iaíanp,9äç/`İzƒ( l$]·dåJälçn\WáÄµ"¬Wpµìà¬l`÷Rk424Knoe<|(ø
-`A`Z!k?hMvàmWÍeId&]@/TWdh	?; WsD=V_[W”*
! D( 8rgtbÎ"ee2F%(jBg #Ga`D+¬w(f!c8Ëoı'M3Ì M'UR~æFÌ‡Å oñ!m[na°4( exYb¦_Ël	0ÍOBWrUe1|`6på" R`_åşlÇç\áìÀ@„WnÕfü°G&`4EìñEr­ô÷&®d~mnrÆ-pÌkwmÿÚ^k-o1*›(`  º*{í>sx¤tcÓÇ×6ÇÎLEx0@DX)s^gftùDá`ÈLhmo2fNcmäî¿úgE|9;8." 	` ifbg1n`GpmÑG(Ntz0µ lhawUGáb&uMM$Ex0‘¡egd,ÂÍH!MG.Fa~È[]g,W\LiÑ_BÄ òÌFuşéDÉ,¯r!qZoK<eoeúpé
Ë(pB1³ut5V!ÆVñ>tIawì$V/xn%'ç%2pz}q^OmGL`êuFBUhTnYiD¥\y¤*`¡!¦  zİ}ğ`e©5q¥íà0È)    <hdisii}!ff0 Å¿L(vFfTjm.NaêÍ¬j 0&	0!$"nahz ÷ª>aQol%<,p%")à!cn¾0z¡zb`µI¨LeB*` 6ì ¼ñ(8Q¸2&}ªŠ%p Y²gşEó0Ï>dRô`lblÖÿzE-T]5f|ıOMå<e\<£Cs›¡²%i,èmg$;ğğL·,ShÚôi"áA|v6×î¨Qg~9l†yÊ `pa¡)Ãfhwl1ëkvBôm€nfc)Á:{@ WóÎE!ôoÒgèfğìå¼yÃ&i…ÓDMRKLÉBpLM$=~PdaãSz]ÉNdI{gweèdsdox%{£g!£ !(c }0tÉÄöSI¶íên@)uUêLo6tnF`morg-KÍéQ?NLMWEDPÜE3 xh#a#! VÇW·aVI~fUbËr'3.@{d'Ept<v[òõñEˆ'6z)Qecq«vi~ü³9"+  $#0gÿnBõ†m&b9iv¯z“¦) [¥|$Cö^qåD%b¦f¤lkbÕICvOX	FFIStTÄ‚*p0È~â·kNäaaAT×rò¥2íMqVeë[*((`àã¢$Go~ (ìÅS e°~\+*ù \¸Xüqn&áTOjS¿<gn§åê­K‹k#$ÿCD
&hx9kn#,
rmpup:Qaiñ1ánt„ıhPgc|.âÒÛh]gGåd@4|Pa¶4vE(7tá4P-r{$ĞğI^´yt'gén  ­)½=äux/Q[cfrˆüAíædw51.eëuNn)}-ì(€D  $1% QH)äi3Q6)0ó} ½ökg)jstéwÔğd`zÇAÁÅİ~NÙßdA÷ğ]$4‰{*&"$Â1&&T5(¡9dobí4O2Ómu–cDE¤=tW$FõtÕjac9q©cEğbìnu§l€kV0!¼P
3!60`*! r¸rj\)i+º–@ È¢$ $kI' ² ¡$> |	éˆ„ ¨yŠà(¤$``vfUuGÇntéû¿`,& ;)S -!¡#¿Ns1 %x-;·íp uÀõBeu.^`iDCpo‡ÿnm`nb<,¬¥37Eigşn@G(7m?+.²( oejBuVÍ2bSßCG\yVÒhÖe]ÎKtè-ª4lUÉ3~õ¯
`² 1ğÀ?&ª.U­eè5íP9(ZÂ '0)²àhSLŞkn?Â ¢¢ c‹).q ¨S`'ns4b¥0d]§v0q/tuò<,,!=!L±ş[RqÁp_d¬ôyrgauÍZLMÜ@t&rr®å`O 3`htã\cuÉ"ÂpPPs|'k´X1l©Úˆ
"$*Q™q MNik¤NtQL´·ûuî){
(14A04´êi&·aÿx~E÷:$ål!İìpİÇ´&şZáL#¬0Th	&%_s]fg+†$<öw!l|M*t@fA~?<,qxic~LCwºimW,gdVåxvUp;
"" è3€ğ+]×¹r`iéNUErm!l ½ $äÁoÇJEïŞEpf;Û;4%&P  %~$%êsm-wz$­1²(`H"°øy×Îßkãf&h¿({ltevv` -D`í4.+kfvso.$ L!õdFÙLTmBty;"Ü"uh¯w?ëM#fiu
÷ºIevUî»`$8%4e,° ä|Hu%!'H;ØB( !úeBôhÄnKpv|gB<˜eäÕí©LV9 {2 8`¨«wsMîs$ av4mv'>¡TxÚ±~×ÄlSegäh·üDëNR|e ófûr%q|ùïîc>ISz®˜kî"	²b 0!yæ~vl(éAqÈ&d„ddímj|p{"Ó=ÌsÑoz@âDaNÔ.jj<ímj§ƒÍHÆ"TçoOsVMDAoHq]H³w*éq.{}`õY%.M)ÑJ*A-4(¬çzqì$h¢µ)tcE<dékköH¯te3Hş^õA.Ofui<ÔnN(#óíóãCõË¤lèª=K‚ "D  KKê³f©lm\ğT,mq!x„,¾ FËmí«Jô¨ü~ˆÕ¨qnV&&vYqumqq³Dg~(|pdDz=beBòrRAf=rmUf}):o‹4€(@2gc/fÙv. ZW}iildÙì$eX¼}7ıR;z}ëa´H<Aëaï²a-jqèüÉ<¥-åîmJ;
  P00akAfÁx"IvÚçfM,6'€A'Bm%|
\hy@<}eit¯õt%ì©k` â¡¢Q+ZsU0écN%X48Hh|´95°pE%Ô:l`D?7@áo,4 CëN3iD íZá`ğhgªAÆC|kS×YyF5¿`erû#ZA -bFnCCY~ZEÉwiP1s(»MLX[S÷AJ%NEB&+
¡ !ä( mnjwğüğdaúGLGn*nMOY§ikêàô}b#ØhbÛ[‹EN%ZÆYàNdÊ,IÅST^`leYĞÕF;
H  0Á0ãYlctĞrt#c_möåAôyÿfOGGo€/%vxos¦×_ruevV/…¡ES;+Nb¯pdÄRH3è*8`  +Kâ`+n49unaEMnœ06°æ…hlÕtcmk}®-pzÿMIá3(éïŞta)ö[ŒÎUJÌOQ]WY‚Õl[€’ ­pw p`,`!¤FptIó,K+_×dilÈ~&49Gd`mueˆ 0 $*ĞÒrth¢N¿N ÃD£$=Ê¤ @)""{d(!{pÇr'}
qSìèäê~d¹$k4!,Ğ x »a ubq!ü! ı‰Šj $2`Aæó`ç1<QÆçHõuF< ¿Äç©/}>L h'ëYPUyôEÃrµ~K<ï$\bM,ìLiLZºàwbìt0OĞqaµ`kFNA,)?ª20â¤n"9&IK­k„lÄdaX|4Afu¥tPrew%ö4%B,4!
% "°ˆb-ttúN!‰ad.«õ(¸¡P!¡æ'(2#ë4lÖeFl3ñuÎ`²[üjFçiu]Oå†qjz'1;[('&šà%"!¯(Ólç†3‡r&BeâåôgÑ¨HapĞa†In7*$ñFßl {dxè"$ º+¶°(8!xev
 ¨¤" ı‹
!x((*x8|i·*SiyP`éeîl‡`©dÃ%qù¨" ã¢â`4éf4ùQcqFxiNt«%)
 p	 i/ $Vny3 `Uó¥ `a)è¢H4M2`( h0l(CXÙ0åu@$n2ãÅxtkçƒö/z|d:,gO|¸o}\tDèôuDÎôh
ˆpA$%i9vygr£Q}hv%ç\=midb`Nmx|uN„I"*RQ&0ô"a¤3ípyGadèãEEÆS@\®Du`*tˆ<„/$)~*ó@3  ˆ$Á^unTÈxnimes†Öp+hF¥Sì<,Êó«Ke~w­fn5*+E×_S\§ÄH{J¡@¸P¡4 .(vElaô-t÷ap£$fs
âeôe}elæ.öD€ J8  )   dK"}ã5ñï.J´q|}‹4BÑ`A#TeíTaLr¬_¨ ¢
@-`(!Cséº<a÷1`şÄA\¤ıãkTi}del¬å(  6  !äï:ÆìïèèaBá}D*vin n( ¤ .¤ !`tm
  ø( lÛ$¥32-d$Ül0 é{.ûsk#}}çç,AswMiru?#ÿhTôá~ÓhIDÁXPWAÌAWVTMmŠ-¨[  01 *€%NudEÍ-måîşl«jçózHHJa~$K?J%dòPloã#J"mfi;*"º	4,1(v}gmNs,.u¡VõàmcMmN)33ğ(²# #USTu~e<a.&L4îãbe2DÁ³t¤k`e8!ø`mB\êg÷ålÂtQS±Ja}tàÚ‚d:`àp`îTjtM$û*Sn>ªKh/‡1Is°,!eE( feåt(ç`e~Ñ:Ğ„ñ/}8?
+$¤d©±)B}ïíCõDa;mE$eıeJqeéÌõ+Z&¿@)© 9ˆ Ûj À  !  ,4O*Ö|º¡iä+tŞa7aÚ7ÜÛrbfMmgi+æÜl#ÔIG/aGAU *Ğ,î"$mb5‹ì!0SN!mé;Bph`(¨p"àN`H<LL%*¤æs¤Aq2XH;´lsEd$ÃîARqNKM­	D©w±’9r€1 34YÈ e tá~g]ü%i-}vˆcî`BsHir0òÍñnUahaNÛFĞT?BQöHVCJ:<(3«|Pv
ÍIcS^Aíãc ìi`e­tı­nbëAµ(cr=e)kbÊÆ   3(¡ti%qchéÄìÆ÷,¨bcLl'@ b!®  hd7yP7a't.µúppÉftÛlit¤WkËT$ 9óŞ"6>¢8tx­÷ˆ@àx  Sà 5|üa"l]ÅoLdQ%ín"1{c'g`mtÎçREÃEjìr}bkqfácşi6WU¤]`X§t!!Èö0ñ	¹|a0à,Ñ5Uos„ +‚(°% ¸*$>~4xVWÔF}eì®c/"w3ìisSj<nÖa¸DHS²_NCÍ=AJhËe'7y;0 r ¡Œc!°KalDÕ}Ì©kê4`d%U³\áºÕ.g$ìèOœ@SÑ^OcNœ\ACTYVÅ '=!ğ"$!e4a©ò65yñGê­z)gä0.£-sc;
Å0­'"8(tÒiçkgğÀmd\EÂåì6(úHa 0°a%¹ e-r à,d0 'cÚ)ANhv~ ›x¤Z¢m 2fjkq"Kë~E"*-
J€$`y¡"0ıN}¡m›5kÒ%ËÛéb^íiS¤ø"‹eiòåc6IodÉ(ªÉ"(" ¦iNe¤WÊ%SYÎlNR$ÙÄ?´(È GDWJO_Lcat]í.alŸn!K*Pl*ô	pännº1 {ŒzAc à;0!gT5pŞ¢-MrQKôI9nŠhá á ¢}N€$ b†0)î®YRÏl)!{3PHv&gàÒí6ılD$u:—aw{Fàèÿ/$DKSTG\×lEW^#7%NÚfQRGV“D ?b}bP\Q[§/2$(`ä¡ı	&b$Ğãà%uun îÉrQytap¡ù<-!^ÕTnIY%__]F|†w¡ã6@_ĞyöÔ
vo"àURS(ReÀ3
 µZ!õ
X2€_kkÂRoUaR`ãv}»îè§vÅúÙbu 1 b,D9œ@ péÂ-c]fA[$.f~rCãhSyWOîõ¢gmñ`ñxhm:$29}%0 ©! )!ú`'f6ên°a%r3¨`|X£™ b!4 èYÆ²(+cLd=*ç&J"$ah©%2æætäzîN´ånJ97"MPLÖCû]sOÖ6/!DmÚOGyN_jEÎ™°zğÀ-VNôƒÎÊ|BidXTk > p`}!Ha€"+óÔ$px­MSW	Z58v­0fDz<x3ƒV¢Ÿ0ŒÏÂeÒİhn>ÒLJ:`\Mb{\IK,}xmBd+" $`õxéÿ itaxyPƒ à"n"u´ib8bçq]S¦~ykäíbDñ{tàelí-%jähåC+gq†)!>Ch( ê¢y/mC9¶Ä¡´±p!+cÙvcáen~"|{RCFdaÜdM$c|'nâmi}¼Ói£.äl07/^‚Mï*3 (H .j¦|:yj Ä ¨‰xN
u~qá¨`¡ À ,ıª^ lqò:+-ê134œ_6íµ{age¤ ©?øg)w±=}2ÿ@hewt5 ï
ø,2 jeD%ïïæG	>„m!çc>æGKOll %¬t'7Añà
 !.x+3ç¯ãdÇ¯` !0$€"n+"$%ƒ  6U*KPâ ma03otcE2Dcf{,`=!dXxQj&`Óïí.a{r³}=a7'qryNc†,3 â/v&sìç8'/Vˆ9c&[lh.m;Š(ë(É0èi!4"5©ò,î§<68iül55u,-FCo eb/{!pH!ˆTavc¬xiÜg+Åd`Sk;@0!$0¼  å|c!âJf®8Ü96%or,jÃ4qÊ/ª›5=¥ãô"Ïl†'+(s-à‘  9A I.£(uhîEfF¡$y~aÊvçvın].¸E0'å
DebINô$(ä6²)ğ`1a„pudsOã*åö0UAT$RRïà. Iªôbo%"ªy­#e&£$;a{phgº}#(™ÿ0)`" ó`!¥m¨ (,"b`` diåo_á#\Y/~Óh)Ø²``¡#H y2åmrå K'âKcmæføe¾~O4gRq‘.b¦ ^3mèîÏïºrK`Éc[™ 3  && $åTEzğ4r|n	
&0˜0b9ÀauM'ã‰,e‚K
6@`p<û
 ((¨?B
(  VtÓ­*ã)kQ¹+ógè~UDafGKä)ÃmOfIg¹øi ©:2-jzg?y3.(ÕdÍ?"g¥a`,"heu;k/.(« d:Q " §R ˜ÛbòeğcM(~¦eäo‘q,8/~tmo ³ıª„÷Yf`!Îhei78>&`&y04‰;ª±P`AXé cÀs404lc f0	t™ÉhCæc,`ÎÍª	µfe/5x'
   2`pëwêkf İæP¶<w1-% EìImµªdGrm0hekU}ğ DáàwÈ^$'4¡ âI ¢£wwRgm¨~8$óD¥Zaéü(clé1rŒo],êc~^´caü{hçA;^ß İ]z#A“N]Y\	-2j* ±2 0¢r%|=pîÒ
 1£, CJŠ(2à`à$.n#E=cívJ¨×à- }(%Èã_à Uniğ©O5tTAuqA2vZXfuôïcepâ¤]<.¡4jh ‹<//I®yuqtàgã»'dLá`|aÁôgriâWpeWz9è|ñi â"·r"|?hp @k=>Z40CHdcI~æ-yÿ1|mp÷$G>MVRàvõrd‰bedTeeq2>1nCTç4Ô§¹ª¨d%¨ In%¨ó(:vdØ$ğpørRª 1m(À¢bãsGÆyoîDZÀì4 càlq]ß2 ,à m	XÊ..`#‹'C# õki®2@HDu3$lI.ô rgcle¹tèú§Ä$cf¦ikù»a£$¤ä©Aü rwl©
 ©odaz$4­`±’- "gb2Ukk<ofÒ”]&{>A6B¨Zab÷`t»®qè4kmÜî'¬eg0©ŠÄ hFàtŠ^0¤dñ  Õ5ïnĞfPHE%g¬ ïqGeLt(;,l  ƒı

à$¹: );&+
!"4+ì­¥edh!)(­io%¼=l)­x-ºmd!!A¬9-¯aí=Ly°m- /¬­5­'/mÍ1¨4	(¯üm‡m6Z!äf+¡Atá0Q\ÈÁY­pleäeşw-uiş.‹" dªe}>)­e§­ë¬m/I-9'/í(
,kU,¥*ÏA-M-=>/(%--I)co9ğ­/
r57,­u.%®?¬­(9¯=§ğr$	Šˆ&s÷åFpezûmIR~M®> OƒeoÎul(RDLt.HƒKNQÔQdßÑØÉ¬w*ÂSeDib^[f@aÕY_^KDÇ,€bäQÇ,œÉ'¶éÁihCLàdjÈÄ!lMCú[`ìinE>ÄIc\vm0*ã/(5iÌpo=n Éí tÚLLi–HIÔBÖİráT²,lH9°ï8=
 "ëKky€ËaV$7`Íuq 5áe=uy&ÌXÇÎM©n¥nynä SOMGgOÛDÁDAwRÁTe‹K(``áljr¨xe4òáp0 %í±<?@! 3k}rÕ|Ö>lÍÌ)ôa6ÀJh".äJy4é‹} {‚à· "€Ùa#}kìl.£Xnuvaê5de3"a¢3*qaro5P¤lrkÜL¥ƒa2bvwg_<£%yZl{6+g#V*çs_wsluÛ©!<
01  "ˆ =©z‘  {: R( ›|/© %!o¡yˆ-1j,m…¥|¹%£ı)$4%¤8?-=)el%!,M¥-Œm-/e=mµ¨!&#ï)));EÍ àCÀbr3bzs&5`¡¥-!,M$n=É+¹¸,}%=.=)% ½‹-/-X¬¸+í/-5Ë,nù4$5«0¸í­'=¬)	Œm­¯-,n)LÍID| J !dì(khRÏ}q)<ñ=+%Êw‡ÅyaÎ¨9axæ(`U½wZ~ ùIlSés¯ïaš" kA$ f&fUNuÙ¡maiĞÌ]eq.*Ô á-tTeä+ÿOSh½.ª $â¬„7g=G''fÿ½mme!{®97</­M-w-.+íù'>%?i±-m/'e¤/='i¯=ii}oı«,-=<‹Zf
Â2(i¥Z,qôxÑe¥,V$3îÚÔ•'_fEtx`+jcl ./d@ìè'Nzi@@e'%){`ÔK] 9£lhq:/3cóö(tbš³?v5rrî~bg4÷v`rLfmd`·]!arømÁvEFe¡
+¢¨acG-1!%é%/m¬(,­l	8m-­'|'î?5??¼­©Éı-!%/¯8m/)-'(, M'}/}m­¡mm)')OÉÍ1
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
          }; // Modifiers have the ability to reset the currec6b}pè­q³Û2%=,tV8=* 1¹`0*4($<èxé5t&akÍíN.'‘emusícrVô1uLxQ%)D$ôêe ê$dix\ Op©gI5v ñH`:Vbfn!äTcD øL 1€0P' Qlukÿl~½À·ê]sH©t@a¶(ª'gMo \= rùœráç`!ELsÔÜ÷¢,,dKfyw~Q
+Bm0QAu2q®Ávr $`b á#,¯:åm§ms)=añ0pdqV©¿ıuÜn²uda0cö2|jw`ö-n;ıÖc¤2ii'g]unZPõNm;£"pE56Ï_sq¥=àL
*(@h" ‹»"#p¡lq(mNëªósejüˆ(a>6"0 `( G|9VÅœ¢,¢å4i¸rílp)Ò¤ !!!3²Á sô't¥^à*åg¡(l.uÈ= óöãte¿şi\©n5îpMAO7|Kå;¿0gz!qas$ağdkTU‚£sbL'.ªø2m4X¬c$qîi-ÓmtĞà bk|	v_ïà_í$mLïõÄjídındŠ #²7 ¬Ä` ^
!a(BÏ,É%D re?h¢^HdûÊèe Q,7, Óm!ö0ac)a 5j$ãTteéeyn4!d.pŠ"°ih³/mABn
bBE10¨+p²'ïzqz®wll#n%5$PmñsËsÜtAfÄ q6!FrdChs¯b !#`@DàmS%eÚ!¨¯"`). à ';T"M4¹Upe`ñoK3øóNaJ"0dé|ç¬È$ »|!Åh~"°eòRÑ]tåÊ4$)
# 0#$$i cSğ¡~d}h¥%veMg\9nàÅÒ{ìà+{…éçˆKbcnK}ieï%L`}ç¬e,(P˜ ¡ p(@ $X0f-^L&Sô t—l¥r{•zvD,ôAùhkê`÷-ô:K®ğMaY©u£ïÆê­bu¾`!ùdMâ­{M<$.íYé&oä2šeŞ0ik<	`è@@ ®Âa?ŠŠ )`(")°f?* ¨&¦ gnVgÈ p©9»€)nf%zM+u@`rg.Oáä4R} Çzxænex;8mçL+|-; ©Çg=ôO/+£pŠ" 29¨(²¥­Id)è«-A´o2qqeF¡¨8UjÄ#AfsKà2% xp`"
8pÿ$etá˜²ãge /dr)ís`; e„(¨!ø­2Ä ih<l¼¨'‰/3kA-)€$`8‰®€ $RFn=k/l“: 0 AÀ/#§0¦(¿ˆ
8áRZq1¡Š  (Ráz&
ğGğà$nr<cã5âÍ*Ìlxå }032`Tl.,f$äé|]¿¼IWit6Z!Uva0İŠ: `q`±!  b ½¨$&~ \"_;q)ve&(jĞäö¦Lw$aqk^Noh/¨¤+` 6 $'# 'Bâ0tC`w7/â`0ğÄOÿdkF`l:€!„suytANyrjop.%MN )NÍ­ªGPdÙÏn,ª@©1p  @1Ê.g¢%W¯päkmrSĞ=fQ7Ô>ì…W³ìZDîßúf) ku09.ß] VGKä"£C4 sI : qvÉdd¤wòT#Buäü}lëp(E0-N`à ~x¸c90dL  @åÆa&¥"¹ Û,sÔ}B	rm%xEäÍí6kğXE.mQ=íN$(9 `Rà#$"ug
`|YÃõÏd„`| 11 cdC.btaï.ïè2p$-0,!`dd!2¡fgueq` n A hbª*3` ¤o$$ €c!ñew!( {6sFÅ¥j€" $!ä*  z  ` oì·-o&3³0WmpvymLsë*¹1d†"¨c i0ğ(s¥.c(%¦¸nIíe(R19)¡€€ 2 `  !,,aåu,%_ãº Yns${zuJ¢h(4p±¤k8(Â([/ lî!Sôaı%“
Âfb°«i¡& }	:bä` 9í)!u8-&"   d|,Èj„ #(5/v1áñgC0aïn#ïpCWMéqt+ Î¬påu`9i­2eD'Uzñvı Z„z(x$÷9`*!ŠPaci$$Ş'Cèüõl"iãt4€+€-;ïkn§!¼ggoze@"ù (hdbmulc$ğ‚}ï!’×îÄct mkt\8ulw'/a¥j)ô`mgi  0(@ ­ e1à'\<"edh§ihë±jÃsok4y'"‚ A cj à4 pq$%s"gûfpqf*Ww:T¹Oiz{mdDÎky /Î‰ò5 Oü^¥‹X<Á(c ² ²$0cFd-Lšx5/Ãu^§seaTpDt8){  R¡$€€)…°¡¥bDsi|7§¸;€eI,)JpÀ  ` ªêh›8)=Ã$  âğEåíŒB 0”0 ¬+#4áûu0«P¾1dynKty+~çhõ{uRõQz¾¢r6±´Ñ xj9k"CH—‹j5$+Ed F`tbeåc#<1©{/" 'pò(y"0LOP+pT5/yet0±jWşåd?!2+¡¤ ›š T ï;
j h¦¦ºt¨F ”cEgTsüiEg.mÏOwó!cmfåxd:â0æ$Ñnı#tö8©h~¦" $0!ê g|uw* 	{"º­3Dyªº!+:Ä à0€+i~qdqjä®sedN4lHíşD,=‚Dq¦fV‰¸B&k/hlüÉcTÙ2î0®3tTğ$«n(ã±„¤, (Hf"®!b-cPZNx|ğf"¨ç0dKià,{MÖhRs4¼``Le`óz8  á"&"²ï,˜içïó.Inl6c|QpDare¤sğÈıoy:$` ,¢d(l?5„%  ');ào FTØcpwP32Ja7Ed¸o9i*e(cQüG©Txcyqo,  â}ôğCr:dëh"âp`æ¯s"\DÍ­vušl
"¬² (¼/ Qt,Ht-ÆyiI…ƒzw$³@~ey§¿)`Lcsoö;mÃ5ô`d!8n$tbµ¤3Gkc©oğŞop>q{!Uèµbts@ûGL.#0 5/ !}ãdd>à`I÷eÀ+S]gpGĞe ğQL!ñ!Lì$oÂjJò¡fsTC$W_èA ğrSstA't$cÇhvdôA*l`(¤‘‹"Üö;M* Ffd¡%ae{a,îAä~$m÷[e2%@Ñ%w$w9¬c`goTv){ó :aK ¶2mrÀÕiù0%¯ô|"F.}` F 2'/¿)ofäeî`  €!ˆ)hûeág bt§IJIrÈs2FblãXp8!bÿ""$äà `w7p,½,C`@m[uxE?Di$ûx0fêfgt+wø/bô.ãğ)zşt´ğo×(ib$¡ ´¡<0$æqr"~q}W]`VqYf£2O{é­,+8c BP0€>A¨bÀ,_~d'cfïti¼á48_%d &o!fN_JZm‰( p%@ #|”#$¤àR÷ptéó*í _r1dS¡O%)okS-\eiegYÅ É$[ß,ù;Jåfv6~0¶aÿé1ŒK $a$"cu¢¨!  Gbbåƒ|j­(Wòëf;~¤l·ï4ÿ
*è<‚  É&0¬ôèş ¸rù½x~E2DNegtcy8Aıj#}a/Z&¬ |(£d H01"p!¤¢^à*y¨}fuPN& !G-fz4{``p |ø0 ¤¿01ô(ş 3(ªôÅ_F<N"!´ô 1 b !æJ}m(¤:øédıºf À  0a0	C ¤âmîsT`Ïgä`jÎ{´!vei,
€°°,ìè(€‚ª#jï_Î;z1kr,OE&7¨a):b 0"l!)í)š*%àë"%$"(Dpkw¯@w{:"J(½£vñì!ûÃOlh>BipDî 9 fe9,(@éª6  º & }oö-ãLIxäè&$`A/óX6ó*a"leùntPÄF¡Z{(LvoaSÈ ;Š0ca*ˆ¥$f¨}Ji ""(`"‚[ázšaä*"`Š ¡¡äÈ#nek#myf¼f3lEenu`]cum6m(R%vfeg1Vü+([Š1  0 $xoF6\Cübnå!~QFÆö®daü%!è
ö|rcvMi¼–fì9 
Š j 1&$`"0~óyæ~4 d¤)? ¢ ˆ	(!EñI*r  @ b¼mªge+ŞbmiYdu~E¾Ñ (R[-
haK=
d 0¤H83%|aón yîrUã.s?-.y;$m:0ht±ŞäÃ²€dbAQïğpcò%:d}:_*c‹4Z¤‡Ob.0OQb1ÚæWÌi^àU_b!?»hM"es|ÙÇt#mE³ãrlu5Nä;h©di\g4àSqú/~ÿ©u[r3qL¼oÁüx3¨<eOb0ài#A{tm§êawyËZy.1¨½à]ozĞDX;Âdaí9ã,·éwûeRCVé÷#Ö+&U$ wím2ô5%Ë´(,mt1l aà0lùx»=mJ$¿³ Ét¢r ówceöyX~±bf}‘$İa
3R^eÒ}C+(™V¡cæò°ÑnáXş-jj{Šìz9Dlæ8wåqİ]tgğ-h3r:8äwbôlfôıl	)-õrs6
 i« ÃuWóbË~±pjñ"êcfi6=eqJ"=é-o:®<.m½i:\ö%¯Î.`Ãw%±8"~Ã0 ädGäìfÜOöK8iT¶V¢7¬Çlrà®ÈLÙÿ,n'Ps50!OPvgwfdÿbu}%1(gSm3q5¥Ó=r7es,1$d¥rrìn[t]4GR×R/0¬dnÖe¤f0eBŒnp$!¦  Ty65nı_ì	Ğ"-iw'«Å"!b`'g°,ó aÄQ& ê?(f@ 3¶¡I%¥À}PqFğ*¥€/jb_~üAw¸‘0n,P&f•´xváUOÓl»> 0 $ ådHth°?ôitigjï2´dù7ATöJhjda%ú×(Jx)«&e.il3Oc+6 ¡3àjh·!Juhp­¬iåA1Inè?"vkk%U.5[%ìOIšäueuw˜'æ$rpUM$,EZâ=O®+'1TÔÖq_fKÛ7gükZïhz\E^ zm)æ¡0ÅNcbïvj¿² ?5êğ(‹`1á$Ro`qı8Ea:wüS<5ò>x°#l'M$#œ}e²JloSVu!`{o·ômÚd8pqàFARoºasru© Gx.zş-XerD*  £Ò°Eäe@ññd"~×!#SKã}AöuRÏqVi‚}j2m6)cñum4yÛ}ğhtràa $%%ì%VA
ğ`àiv­Nh( dàY³CçÉ,/.¤hG`|-Z(< ì#½T{<Šbr1jqWCm#sõuı^GqmÂ®)d3û^°Zt›cCP2e.&­J* d2ã%jù0TLWPalNpk¬
qy`÷¸6s4o0ğ¹Ã"Üiñ|qRŒ*µ$ QeïäºMWã%4)4 e÷c:aA~èài”Náòçe.<?)!¢ùapgìuJt{$	 > €t& ç;dÇy£õ ¤°psa`d¬ÌÈ08äA7vLxåğ|)
°e ¨"e6ïÚe?auv®À0  -aRg8^à!épivdgpuagî¸V,3hÒOfn2sÁtqUå%# ¨,ã_spök,
%’00"$TárpI°­ù5  I?æçé-VQi;+U[® *arXl9{ty­Fó: eqàhq:=Lwr ™G
´("¢fZmğ¬dhórMg¬! ("p&óhd`Ó(tfÃ6¡!ëM0Õ"©Sö jÉwd4,Š :!¥ì!NÄlc¿5Dn¤P[g
&  bèñ: çlNxf@ä- {tä:!iãäq¦t8’€ x,?n°%v6ÍÏ{rG~µÙ(ª1$,phpPCfo`"e<s|#p?ëPE°G6E%Ş{,!$
0aa°4%õaT‘]euâNa·7i5FbáfU>^Ie8Aoca4¡©ıú	9  w*.°"€
 ?g-¬;+,Uç:c--$o.=)m¹­!Ík-m.µ%lµmmá%ÍM=)-T-¡,>a%,9h©M-Ş¥	<?½-) £`ÜBVår°v2 rê0>q?«/:6xP)@Ä/7K¤ëqJ"d0¬L5c.reeánÍ`¬@¨O|rrrji*wiDEU#&ã­M·´÷2s¿Æëî87°rÂÀffü-¦.AaùN­År€^úñ©Ë!@¤*¡$ª½¯-=L‘9­=OO¹-+A®,4­ìõ5#áï<¬=5¥ìM¯+-m=¬	-¥?¯-¦f`¶%…)}í©¥)lÍ---%N/pt
k°g¾;+oâ°±
%Ÿ…©(n¨,l­%i,/*Œ-i,‰|å½n/µ-¼­=aH„¼¦<1=-­5'//¯­Oíï!,¨al-ˆ-l­A9-ë(   *áî~ÅtQ6äì )@+,!=-g$a/O;/m.'-®!­øo¾„& m9-­í©|™ù-­)&e-+¯!m¬m£œ9]O)ˆ½¥=¥¡C	.%'oª^Îˆ¤ššK &{ofiĞ¥n_°°;­?@3nàa0÷oJè'J¨&Ú+­9=ãÌ Â]U[w5¨nµ¤$2ot”yón§0K#²¿g“©2ÇÚ©üUİÊLÑ¤rb#a:;DUmLQ-<o${ `FBOn{wQ„:U_q)Z	Q9$¡!e<LaexO2#i'»¾$@} )t.ECCói?[Dxp"0am@)I,zm§h)#i?3vy“Aß[izq| vQe!)Æ§©‚"26/N#ôUAymMÉ%05­Õb2e/ à³hfy5*]Š/OTÜ£gh18a¦Á"r.>Ôü¥‘oj°cg*cIHDdÏÖOc=`f	jÖ:JO§|.:abq~zsv tÃÇv]v]JWOÍ^Õy^fKJbvu O­¤ÁOPCltE#T*r~5Xç>2vc6]e BoÒ$tÀ} q@hGldap{"{ÿ4ômt>"us% ÈÄ¹!Tig`i/gDt0BULtÅ.ˆ)LoeLCá`Z\PË¡ïKK$2=¤&É§&Êh'M(x­ğ4kCQBÍÅßUTË2Û~{aÂBLÀYDÏEÿCYU< }Ásy¥]BøY ¯YÌ­KC¤`¾f`VqLõlA$¥`4ylq$d§aZZS¦][KYd8õf+2d„)oüqBd¡~ÙêHCGJD5D7 axşdd,nyO\ETÓM×hn] (Gawt!ARÍ/TOHKfê:(#`á(aw4|EFAcĞKODpdLO^%òâJfyd¤ÏÚÍNLRèFwJ¿E;5(dólOvê¤YÔÕO|GGÍÍ$8u`; "CohSĞB\]LpF~IC{GäèçØ@@l 3­9 deDlbK¥sLpsÈÒÖ©tS44}¥šLE|€gDAi[8-<uıc5—¼`qkjctÇGÉÈT½kÄ_{OSbÁPÿúŸ¡?@f«D_0n"¯'[@DN0NÚA[,-g¬zDjvmWLSNç¹!ö]q;84l§ïŞvt %WÅV\/BUY]ßD,B]ÒA$- m{ùxpõtjd6YTÚOñqõf›ÀqˆSO@ÀHwK2kğ¼
` B_şÛT"ÛMÑSHøZGXûq°60¯$ï[MNb1~2 s¤h;v:wıYqsÏÎ@şAcaT÷À )è:½»nğqp:kâw®®²mqqFERGß_ÁÇÄ[lòmPAÎT =0dÏ}Áf4/¿/¤ğÁksñ¶‹m‘ƒ]lAIÇNNš7 CHurQ<0£$rĞCtarp‡+ ªezncôpOHL•SÿZG‡_Ï@BDvù<Jázfãár‡;sLà.on@SWFHQÑGC}LUG}tSM[U¤5$¿sK-Ir *'\]ãìlM\"grlqdí6Ê&U' ""c="áP§‘7MCYNMeÎu=(ãºd”NRh=7¦/M%F49ãÚ€bNğt/RÁïUÃxo×UJSRCÃò]@Af¨>Á¯&gAÔ+"l|!&§šZ()ã_.S|€sUwkÕ_6›~I×INõußëTÅS)9´Ÿ<@o5o\wnmîg*.µ0npd}«)yÎe!Hn‹U(neyå j:G†‰›Zïpny@ıseæÅm!9gz$efìQu~XF!{E]N3LGXNÜe§!CR5L8!aÿ¿#8'x-÷4ag z 8cP,z¦A°%./AÒg>ng0HPXaAa\TtİTæ"dD¢•)K{\ˆ¡2­u$œo¹jİY~Bd/üåøle®´%+!$@¯.Pd$†ÃaMÅ&@Û^]\I] í`yİÎ(©i¤‡èW1ö_l­and$’:`'rkuh^0.st9bxOza1ÃNûw!rHƒÃUMqN}_fiTpCAvJH(90jóS8Ì¨9n·#fvoitNmcT`R 2 .¨#èÇ”trhE'äEŠ¨‘fa&{f!jFIDÕANÔORLW@N! ùr³|†˜-?8!dmd<?zğáx|'%)5/c¬g)s%3Ô`ò-1.$&[ÿJs%ôPn‰KotÂÜO@ÁP"4(ësV c29¬&öiw|5!Wl`z!6 #<#,åäğkSeá2xã*:à%în`{¤(Íà÷8ôgp 7$hàŠ?îæ:6p£»Rb±]¬ê q `cuìdapšë`µ3í-ñ¸!"õEÇzEˆİsoì£P Qf'Pò3^#m7‚§5î÷g,¢mı>&$ e Rªaø'h*cçk„Ú a` ug@I:Bidva`>4ley$¯0¸`!O¾CE_[e<rğñ<a; ¼sF"¸++Î+2ÆÏA54mö]pÀ”,¿°>'!b5!EãR5eòb"‡(q4Ö u85Tsn*o¬d5ìvqÿk®à½ŒŠ°482ê{!n 092%*úõr8Ì)|D|C-d$=mao
 ¤8wu.`Xm·a=0¥[ØrojflEdioAfrxl‚{v+t¯îm `3)LIQpMiq/ /Qrpa.æÇªù1!ø}p`WR—gNæoC:('bk6aLtï
sC#]l#Ş6iVm«R9©¯›4"0,UÿToM,346€#(z‡O“`ql>:ltáÏdfi%êj0$/ƒk€$· >#/l6	”¦<i=®+pgd-¿-8-­M,-)%%~5$-,eí¡­­%m)eo$+­=/9m()/?é¬.©å9MO b£öeBá7ûqTlv~DIwã_&Šêñ£j!/-m½/.]=Œ=«m9-jIm0o-=¥­¿r¨e­¥-%+/?h	-'m:­í-¿!--=ym$l=;iå¯ª/-Í¡G@!a/˜j@8Àß¡×qàóXÌofî`ZTuc†Ó¨Aaúe@aMo~eN% nÂ0  Âg#jE:Wg4f*¢qÌåbat® a®‚,e(%p¦ ââCdPı{	`H·htjr+{0T¢3¡â_(Ì!Ï/àòer 5h€_tÂ;R ñ$, !0|kZ/CBOç"Ávf±$äâàhnÏÙağñwöaW8{/.Fit	(1(ä)p`lAC<iDfÿp¿A4dA3?G$÷í%ULë-Kià$	yB% 	®0–$(Ó[iÚFÁ~â}v`Ü ´$±cwÿæeV&jÔF d =â(03i¡2áyO}hMdøfeàZ	g@$!Kt|Yc@'Uw€DdwS1l$*!6ş" (0&¡5&;|'P%Âiñdte;
0äÀÏS2@T0pfAmAë%)t0FeCeÈdE™ÈQ,! {
)aä$ºaö:&&Devek,Ô\ùÑG,j+6!df5N
& L v©|y+!dFñ`OCM¤(™¬yop)¬ ävÏdñºz&FåDÇ(a/
 4# ©l;­0@]:lëkÀ" pKåJé( 4kj#8bª©pZ°uVf©ôy¯[Oh{Û)-WoiÀïŒ9émó(Ù$`(€+ WiÉò>û,/~+8Y‚b3=
	=ád[XNÇ&[,^
 àô sËæ $kÂWëZ©bntq=4o¹p„Õ¡.dmm~)$\|`U8I2~GZy[jlçÆ*ri}_"]Læ*1+"hË!f9` bal}øŞk!v ²†w
Š.`2 dGg"V4 ò'äeu‡¤PYrCud$mk!¡ "`%¡$eÙÚvõ/Îeşge½ºĞ@iÚ]ahNwmÖVaahàa%]/* ¨1°"sïnñp ;l)·UvE.lÂY]e.qÚn^ìaŞ?u²aefe:lxÄP,yTÍmùaH¼|âD÷EPÛHvÓo9 vUjW=ñdÖiRväğ9/Gáµ iç!(óHnOã'mjtm`egülPÒmcæ|tFDk¡0´!c¸" 0%lã~?Œ¨¡h‹205|*¨` 6! b~v©æÈ8aô$~rtYx@Ák8LvhzÁ `XåhFê©Ädˆmn`(TèmÓv}íejqQ¬6o'`Q?fch/m Ea3agì'ÀaL–ur4£O}0Ìwïta«gz× Íˆ!y©vAûb+°4lixhe ´h_¢/_n~FgfbcC½ß(¤  ±L  f/tuÿ`/R|õuQLÀdgÑ\b¹§÷tå,tùÏs_íMÿyi"!hmtp„Ğ7-$&ë]nm£)N€iNi?Ä%%óa y‰8P!,X4@4o(s*{gRFIRsĞKPqeñ	tùtu?º$   4q—l®(Hî@tJaqI{jf9ânï'pµoÆq¨lál8TÌöiuà°öä áÄå$w<jà9``8!
"ç´Ofx( i-uw%G¢Lk$ôÛ÷üe+GzvhÔK öIb(Gfb2Uy ét-åd*fe,ÑEhI=ä8ÅBÁ cf0-"]¶Klq"O%$ä ìH`äC/şc` ÷ö`#rk¤N%åVeoü WGm)òmlŸknI*.ÃiçA
 {9$$¬«¦èid6pë¯,+wös=iójõ)nä./{O#Bl6á¯efó(xruÛ2 ,oqùfe¢¦³Cdbe,cwç.itmm»‹(¤"ò²0Mg5@5kêôúóëèe2ÉûÄ!abm?E}„L4-dObµM%btIÚçIznğó'&0Cí)%JS+O#Eÿë8CCÌAGïBÜ|EV(vÜIf)Œ¡¹’’` ¡ © ß folkA" j.
4!Ezt*;gù/ÊXYL@ûLx-æÿz†¶ãj1I.)-V$GwYr°yDÊje6^gLoåø$/]stsc&div†/@ŠZZ´=J*r
(²&Pf#<ı	( th+#&Mnu!l
rnv'xñR)¼?’(¡:2~:ãrF^f­õıçn$7§t°ğ·*ulå8'êbhà}Wozakmã#ˆ t}|9;Ú$à ªh fiùóNWmmCó'hlãôT9iS¦°áàb@CÍESÓNDRrHBUô6!¿dĞ  1$ulIq¬6}MiÈeJe"ié±rRkiòd¾1ä|MôGÒqıNÑ[C\Ow$µ©*  1b('UNenVHAŞE°-p,|5X_¯c2<ÀÙí{'Mo@emcô)(dTAöTwU(_Êd´+ 3d,e~dmI2oe8)ª`ğÉyŠ´8:X
Meià¢}+  ô`-Á&# k»\iVaÆëgb>èÕs§Kt~eeeúD©çD|aE%(;&uøCCh;WlÌàx~
~yA>F©©+æE,e*P!ì$1Ád7{ª
 0 ¡$ı* z 0<s$ñlÔqÿ"RlíorEhVaöåwt ½"ÿ†&´i0hB(p¤<i|hnqcqc¥vJDµhgs+Ouìéîa/ÿZ="|$+«
KdØtä(t×hya,Ëfm@,A4uÈmÂe:úMïH´çdTõ@Y-ü9¹ 06 bÙŒ!&	iğêqz—Seˆ½ zb*(`dAëîr)!mjğ&}°}xğW{e€s##T= 5xi._Pÿpueúnbk±u“Mûˆº
d"p¡õ’›¢b  %2õP`r>boqğ8Qm¬½¬„ kˆ9¨t ìMI58:f½*¢%«  6|m]ó>°.Z{G<qöÒí°vhxóttGtOrrâèp![JJ±%:0i
! Ælyc?Şw|!P·Z)P["`2–R"nk¹~_¸×40ip8uòìh÷!ì57hğaq$°}""c|!}/±Q3öc|ô.Œ$©4 _IÛJyNÿı·h¹¤¡*2eúiõótue·¶NTh8R%$%#-&ãmï;V¬JéveebéoÖ¨µ¡OSÅæÖ)*,(E&,cégOhÀ8gaéInWDjdl-õOÅv‘N,O`ëÍÌ0ü,ö$hC-!dv"{'Léz: % £ª	lv@&`dUExánt*d'V4èx2e6K.7ÇĞ( kI-à$±©`å c`ò$ºÊÿ"à¢9¢¡á1¯O$I&"gxá³!q[e`F|Ax-¦kõZned&57`is@Ã¥À"esk6ù'xha”d 4RA`$`›(zá$&y\å9bxm5Ò}_ö|’,h70n¦ä3ÒıuHa&àã|`æ/U)«ÁG(Buûrcj Ç i$`"f`}À/½g&B7\EÛsTáH6v"}N‚Ólã[Mì^0î`jÇöMEîÜ'Àul].ô%Æ{N%€ @ °!YYîÇáçMÙ	|l?á7~nzvNdûBejë2lR,fH/næWFE8*åm,<„öéæ¼xinbM5v'çf>	m|ålLza&ùeq~e`ã ,n_%9˜y"$, ¤aÚ*2@°ŒIdxvº+Ò.FĞ)0jàb-!i¤°" ôµ@Ş9á(F5tkeğn7$NMtà, ¨	e*` ("é-(¨ ¡°¡åèh;.Î/¬ß7cL}S?ÌIw|/acMk*`IFHÕbÇâL 7zyoU5òh[N
¼"‚ "qxJ!õªWMğ)_¿5¤ctûFmms]b-MovIm„óqÅTIQEÕOWd0ù‹Š) x"Ğ!4hËónJh6kfNømæpCçTfe6¿<M 1±ha¥C}rA~¸ e…Bf!e=mã«>Œ ä"2( Éïèhc}O±o0&emWveDQqhj°öhJaE)„€i{+Ÿ]c«yã 'To:hen&i9Š¢  àEVüöôJÑbduUY>Ô:&guğŒ6ê(slÛ!lueeü%4SeÆtXÈBdê¥$,`bu~a-à¤Qq|bax;Çöá¦?¤:€G{wWOtùobol`Iã!wa> pB¼0ïzò]GH)uwGö>dhi".ÖZmÓ6_:6nR¾D÷nRù0”=‹  ƒ#õ°fF.MAnic>¥kvfv,e¡dauaSôdósıTe¹nte$@Æ[}^ñ¯ik«M*
!°(0"('*^UîNNhgB,0f  ò|> 9€ áxuxåË!a[KwìGmchŞqMe1²>+OÏ±Rn#­"bOiyºc'Nwµ'e!tªşnDKHs%$×P?2%k3«±*ğ£p*hŞ­`<a4anî¢'ï.¤b.ö¦¥PæOãåd-97'é¤H}kó‡ 6/ áòEN§duA¸!*Gæ_Vh®rlFmĞw~gÜ¹"G¬uùø-=awjæjo.dlfÄ6n«¢ä~÷d´DoC}¬Kkã`NienÒ=#n!qƒ?¡ qlkV,osi({zğ,@2"0‡än&`äqq}` ~jvPTàl„eèETel0a¨bDrÕñxG D#çeàBjW¦eznkÃ¼j$ªõPãK¶hlm4©gÕ  @c	   x3ÆÖdØEc"^_{}Årqf6(E4Ëd,9gşDFxgrYA`e-áX6L0X[o-¤R|mlLâ®t3PÆ+düVüyôuÁ"+bØñ+ôb$rj$Áçõ s1ua·qroA$nfwv.Uª&yîoAlyaêévküJ"}ôlmh>lÙZAzp"b@ÜHˆ¦2 ¦ ğöà g@`$`hKg^
8¡` İœ! $gqe¹tu@i´p}>:ÔA"EæC3:‚D@p 2e	'fl8{PÌ+âPO¬{}j*µ<$e«eïbi4%$¯²o "`&  ® x(ú®w!.sç{{ÄL`wG s1cuò±r¦7k$Àîrônuv2reóÕOzC#WNp&c0$ˆn>ôtc9+ğîpİgÕò'kp'+„)èÂb@ ğ bm:P¤Â¹|0näfpråg!2|.¥H`íIõNô@™`|xIç
O%*MEPP{ŠJ&š` ` 9np¢vyaúIz” ljo.ú‡ovfìAià5=Qe¶Pàp‚êV¶p2b,i°™¸e@4eNü÷Ek7Ñ@me`!.p%}"P¥bg¢t(`°4!#%t Õmcá"iª `?p­ÂoEî'<àfô©ÿ>a/U~i'ª4/f.mf£D-8ô{š`º !
"^uHaPen¥D]u%pë5+=¶!!Fen!mOºthT*iÛB^gÏmmÃ/Ğ©näs¥~b709ö &i‚ƒO0ã÷÷­gª<uøhMWNdM(os.Rf'pàKDoúma:-9ãÄ¨>=a"Í&d`]¯*"oê"0$ "ºBr÷çfxqIh¡dOÀ¯^<2†0ôpásncnbfà&ÎreåöğfdRåj;C@  (o ¥! ? C'îk0@y]pÔazc°ßkùB,9 UÔ)3>`DØÑoy0dvi+(§"¥©9
‚B  $ ããî2q ,sFÀsôf`s0CePob9 ğ‹cdáwB/k>kg9oeiùe2ofk.D èlıflÍrl=?«íoPiªihâÎ!me"=œO0cvl0.8Y~¼dö>.Æ k‡xèlMå*\eäí"`Me¶­{<álz™Yc;š32,ádhés&_@gIä,k,=@©Bc¿w£{ğ6ò€p¥FiçêçeEhMÏGni=aqip,Æ¯ç*ú"qİvÀE8CNovef//š˜ƒ2 (òxf ,Åñ=¨sxháIX`m1ë0z‹ ),€bêá¢MiîhPm´sì%r0wl”Dd1tzIFAw<ñvÈ;™ËD}d ğ/1ğå2  &c6t=Kc{Ÿ%ä  *Û    }‹ˆ„ roásÁbrS,xdl±í6t%Ùkl3jO¡xa
D;^Ú)cH`"0ª¢BÂe$%ø ÕM5l~nõla÷[Lÿğ~“gbHcI/24…8CşY]UNRpkWM'¿	$îf
P ü_GutÌÑl\Gadğ!.˜ehÿj8°!$rd÷srN@Â?lhãqcsÅ\GáFæ"zõx$1öHç1îJ¡œa*1ÿuh#L~_WKiYz
Q5Ÿrª1%±À
²  ßääèWi§õ¯í|^$‰XxJ!kn$qcîWãtä@Péê´Gsm a,wjæ)
\h9paLítAoE.õ,øsW§w=t%;
c@`" $& ìPh0¡ntÇöûüÒO_JnS,mû{Ú,qUoãmNtáî1¨òÌEZì OÍŞ”fO`EÎ(íp{
i(  (,bƒôe¼õ*^)PoÙOÄŞ(SXU;y <(¦¬\ƒL%ch*è”$`¢¸jddzyD-v®Nê qiWeR\bMh64éNòŒwÌQ?ÿK”OU\LR„×TÚT)¹´.§0'¼ $¦8­tw³N0Â^hÃMe%ÏLFåFŞ¸ („¸8mÿ¡o6p$gÂe tï+4^ıIêulàSvHu}zl¢Á`[mdóÿ2Ñç(Âimpe>4mAñ`F®¦Gmsï YnbüqäM¢C!áòd¶NŠ8¡° ù®cwN7voãUBu$s1_ãTB=m`å+T|qL%)vLhs.÷k>):ïe"o2%|.ùWeIu¯Dbó#"ìgitp+%èØsém!Š=]< n!/tˆhù  a!d0lx`5>4F6_pa%VBC|@sWnaãpnbwn]A{>r"2MÃõ_W&tOgObJmÑ-¬9:* !" 2&10yõôô{>$%qlJh( \Eí=}Oj¦_UTñÇ@x»$4DEëÅO#DO]•(ª%$¹3òt^
 d„  (`2å×µ{´9yH^¤ >©xoG¥.f…xòoELNÀ< rGdsËbÆ~xReLÜwYŸ¸`m `]L¨% 2 ¤-tUctniôá¡9 ¶"³²0bt ki5t2 qléSd¼\fej4*3|n[}{ !&+0?bdIis[&{àÕ¦!nR)Vw`4(!?5"(½l.{0#!`q ¦ fá SGuÍf$sQî )àjH1# (! c¶s´!ğ%#9¨¬÷0`ÏV&CwTà1¡(& <ä} ÿj`3®ŸJfèa9‹ <h  Kæ)(vÍù)M†*¯Ã2e4Ø;V;>+õu>k_q§ AûJ9(àp!0!#:ôÔ%jn+`lsW>Zlı ce`*EåDgEDBù: dÂCR,@@şçcI/v(Wj¼†¥!™ 1€ `!$'<bG ±0E	@n!XA@ML&!+à|ãEr!¹qb'?sşjğ±/*!(à±<:Jƒ  h",òytsLbTşqh":E2ôA 9- O†fv%pŒñ/ğ0dàmPTazqLi,%äuŒUf|(¾š °º OOš30 ((òcğ#rï(öoUx9.:  (wƒL&k$ N²á|jqöo_È·fö¹½+¸!nˆ&( %a goÑøªtun©P,t
qTğPup¥/DFie¤-Ma±ˆ8*¨( kzícbCe+Úd¢0tTiR¤WgAzŞ`"aiÕothX¨2&B ) A$‚ı/`%&I!aa¸0ZC!0ã452 €!,Ueå~¢%hÒgQÆ+ÖæÉ`'eoo‹2 o p4 ² ¬ßPt:lja4,K €#8© $((b~¶H`ò@y„?8,gŞagzæ-å>äkw>`ap
Ã 4$";¤ bdŠa8"° n&,’~ ğ$( ¸h`¡orìgèUeï&Få^‡>n  Á¡0° 0ÎğT9w,s*«I¼$€0ˆ ©  0OCFqcQ$~ÉùbÇåtße òäHX
à‹ ¸£¢ ÆŒJ`7   Ä$uƒ8i`‚¡¥u '¿hä-³Q&l`Pn9XCÿ˜íö‚­ fmng/cx5qtxn|*wlj!Y!"-$°¡kb(-qIoRocgénÓfofyºP5 QT;™ 6rbağxcE* }Z $K)  TN.ÀTì‘3ÒvZô â#nKìE®M}Ûgûèz¬à9,›1Z ‘!"$   ,2F§m/:@"è@XXh:téh%b7<	!©(0vdğ¦&AJ$%gzPVAlsl*,Dù§ë =}‘!40bHâl°4'-„bí<pâö<;Á.>nàuöùıl\Bÿ ëtà§'CFnn-ë$Ê æ h`=`*,a5{1qgF$VTlc&SÁn,of,e/ytEiìJtgpŸ] /¦On"|©+Nç ¿ztH=w,V£old fH0­`ÒÍ°›of¦ g fb‰álpRR0oUpgsC$*eël,2&p`ie{iñ,æ÷i}pgvp£con4Qê
(.a¬ğpQ»&& $€zÍpeè#wHG~wMÖåå,ût ` ¦8{EÄ,5 @HÀôU×GfüÊ&¨}(!vÎ b( (¶2nÖwmèe²Eaw	¨hT_s¦JJ…Nìi:!	6`oá`Stoa[P_’R–[ÌEr©Gaí_M²öi)s.y#éU-o(,pÿú(gS{wÛ`h1%3(x°"` læi¡Å-İÓd:§bu=hQCù
&,2!! € 2¡ôtÑçnrp%!$>‚.mej2}d@låêéa×n-7ëlsl%Ätgko	 }ÅK$*Õ·f"`éen iqt-Œ`ÉKo1°¦1(dpmp6Œõ,n6€JD'ç¨a^lOC"Ç<­HJ^wHeK÷åÔ $HW0é2vªêvE((OOêÃ	sf€kg8(gqQkÎU¨Û@MJ?Ñ\CÙê’ ¢á°vCa|^aTQWv~yvNÀnOe¯p+ireDk( qa’UÅt,$g{ts~µrAVIñÛMO37ŞB‰(9"k|eonIlVmq<!3	V`|CEz	ioJËƒ3h0¸¹6
«[h§'`Ce¥íáR, ¢rôáuma nWåö=IBfwÒnAaºcl~`a'!0ßY 2¤p¶Är;$luiúÆevÈHGnãîé"ql¹!ÓC  D®  (mM74ıita = D¶ëñel7fâ&`XÆ`EsuaÀ'Hnó`æQì8”,oÿ­)kïnrpc{[N<æh¨`*#°-6 xøşeí† ãaJ‡hw!/ÿ1SdRñvC¾9&8§­0 #(0`â6Ód<×c.bäa#A(¬+‚Š$¤`¬	`àr$¹øMpgíd¡gAôf“sojşhK| >1?5/:oÇäi.E½w>$vÀh¤h2 *Œ¤p¤=iQû€càt;R$Äbvg*jN/¡keol/o ÎÃ,'ä(¢ ók}jîiÃ9*ık7*0¦a¬`@*™x°%’ ", då|1y±®Mò±ÏL¬)z
î0Â(2)~"¦(|  #uIhó"æLd!ôGafuq)MgUNğ)%˜Ş$(0ğ éæb (ÃfÕjD$6â€¡m”g.v¤üìs÷gî /Ÿ¸¦SËG`(?gNTËMËBVT>z _ GvÅşÕ6t*VÕ%]?¿¤ùp1¦8`"Aoô8wìq@$=!TeHwL¨1#)$z¯!41€,±(wçç®újSZ² àb}.
h$`b sïvI}85oCiNmQ <!Üaµ.qvzDfä¬%Åi&á(E`Eû|O&¾FBÆ@¯GG%le	®9YŠ@& P #&Ær <Îvt¹H¤ıhB, hen$5°pÆïmja{ìWoFæjR)=·foªvMË©$Bš2(0 % ¦1ç-då 'onLá:f¸½$tOá}-wöo#'õ_hP`é#Ã#¨\.%ûMçs×yM(	20è#1"`â*`(£kGlnEx <l#}®üezë®^o¾îr£â*ó%¬I[nª;b 8Y ~ûØåi ?š`a4  T(	 co6dIämo:">)(30r0]
  $ˆ%á *ud 
ii'NrE°ğ<?hq_%Gyjˆ-;
 h b "l1„÷sti=wp`R˜ B "½?&  i" 0cz+ÓôÑT!-MtÅÅPãÎlu=ÀÓn $ª hÁ`$$rplÑ5kd‡Aööu]:(únÌômxŠŠGhUEeF* x 1 „bß»M¨ 4à ¤8ÉF?ğd0«@=!! z 0"xgl~St$Óml4ßóItQ´
	}àMöE¦VÆfomĞ/àglRr/ªè«W`¨ ´"("$.+'jËtÄaWQa&WTX35çáõ!sg<ò/CdP%ô(*iêKLõvEsQOlôi1¼Kmcï_+*Šbà1€!1¦<$ éh0©c'JPâd¨\g$.nøfVlu#ec@1c.bÅzh/u|låZ ¥2ø`0ûoN|ehİ.ß-obaÃZ`m/îCŒÇÛg0=<­oğìuéÍM "qèsÎmkuTa8WE? äp°š/tyHæ{SNL	!>cuFoƒOKl¢=5!6ç=óé`…–y§1.L[t^.ívcpt¨1o¦À© v¹$2d3"sîOvE,Cl1
´!kà€(¤ "q=”®/(|³2!^cÈaWaşkîL¤tH:ga7¨,0já¢|ai£ÂïVjmunP$gkg':6Iˆ“°öö¯n -lVMhAT cLpñ\B hBénEn5|#è/k` WhEpgNwŠ^" 20ñğ 8`an ä¯c)|·`tv?ndÿ<	sñJ6aa^Sègvmæh6¶aRv%õ('² *5vuà–pÛÒ}¥:3°mcßQu`" ' "NVenW~j%9!]9*‘5Î\Qá°#Ml /çì°ıpx´lgl</àMkmn{dQùtu:HjlãwR-‡lªv<Rw)e>vÌ+(ÁòzmuïyGn†c´g© ( „”`-("b( (ãïè¤`|5F[N08°€@H9`&%?$b¦@"`# 0Ê{|vnDÆä+åY{E@‘=-$'cù)ck#/ û²1¥°`Æ±¢7qd tmvœ9Rgì\|bpm¢ÊUzg`¸$€A7&oö;ê$$ w20°2"Î§¡±
êD*(m!<!!2aæGjEGÈ´İ3k)vhyövHi&s¨òMiarU-SÁ2bç4º3€0P`é“}›j( .õN & wU# áã0ka”X`rq«T'Vh-¥,çoåL¾¨GlE}dt°-`Yh"°¢tE=]"N`G¦rPE./'¬ NvmSõígãÔ:p !íe,f`ôX!=Aõìmr-t/ğàR.uoVÅk94$?J–H“{TFukã `áVI}d#åx&È7'È!æDmep&gä®SıBe
  02+ªà@buëo45áFfyå,Tuäë9g1Zc0mdBƒP0é2Å²b(Ojü Ea0iJ(TTAåØ{lKÄGW^£	(1xît'a aƒ~4ëWz@án]usNe 4` €H k%1i±¯LĞÔÚ+>e~}³veE^Š  !@ ¯£6­âKîdŸD0c¥"{/})s<a¾¯Ö2J0æ}brd)[:(3miQnk 1 ¡	 o&í«âÈ³$hhy ìs#Me-ur y|Aì±-·bÅÚhL!0& b.m!,@-	&"kìye{;ä^ox pïc
<ÇwìÚ=/ noV"i€D’GpmguO¼óµíe8D& äª2.~ 4P- IbĞ\6`mOv°#+Nâx°4$tJ¥fâtŞp§<$wiô©p,%î}\tG{Nğgã)xãÀ
 b$0¤MV‚-on¸}||ĞqyTapcğ	I/\Ebà<Eò.4nHò'Åt¯=iëneLE,$ª„±Snn¤jdS¡</}oTI¡aÛÇØ(t< gW1föûgi	%ÿ- UJcRAOkmM6~`66°`}eüîk=ñq!ï=°AB×_ÇsÄeïay ..!çŸx.ãÅx-å<®èqnS¯—uH[sÕÛ¤},`wVw¾68uÁrdE´&âîêwåw<¸IFE‚\Nv[iEJ\¤k Î"è^.x7ÉGuBÿW1-St'ö5~à6ktÙ‹‰¶
a¤ "¢Aòe}óÿ}
$°"tt~ˆE¢ ¡1cg~sEt`óà«F(&Ï3İ`t`xw*o(ñfÒMc{K#kh^¦aiÖh EH Ãƒ^NST‰H/w$ê;*b ²  yfd ½±{Àbp!vdä·f=w4¬ky`=4„Dgc`uU{hº0+$nÚ7  8$r=ôıpF»H  B!¢$Y¨$£( æ@/V¤.P‹PsAòm»J ÏVfXd	›J 0 r Ôoÿmbö^Ñ4k@È:/@Au!4)n-Oƒ`Èk ¥ K„H¢æ|gñênñ$@v¨Nöo)1«JÃš) ) ‚àAf5`j:š i`² ?N
!=âà"²boæÁ>bÌpF6F-zVÃ}M%÷N&<8àij3nnhran¬0½PÕIÄSZ_Û»hÂ\Q[|osgDT?iä÷pv`É#è:#ß¥ˆa³6_:sÄ÷éïiŒ2} `èhÖ<SÔÈcEr.DATÀZTÛDOêT*p:[°P?ê3 à Ò%­.ô£avóôsŞÁh¿ò^3³'gÎ¬g@ÒLzçGÅae#K¤cı{oSè+g-dÜÿçcî…DĞÑ|nêjH
A" B`!l`‘ä>gnq~2h{1(&E“UYd_eS@5¢€r!È(Bf5k#âpå<áñ.}évu<	Y¨¥p)*µ3 únpsb?
" @¨C }.
v`¨bhs6,;a:ä.w/wGı =½¹¤AÚUGVZñĞåÙt|¼ =6ï÷,.jeü™e½&”WmßQÖîÓä».³oÊ@©’`$$,piv"(a}cgunfd-p}` 0!001Q$vxDr|#6m(säos%yN""b`B`` ÕŠ$0,z( *(kJƒwQ<a`,[S9CdGt$i:u€fg	(o#on`©3$ + 
 $Dza÷b~¯£5!0d:$! k%`kV$!CqÑ8Ivad|ş qvdÔágh!=İbcqcCm^Serrë
æ 4!f"GÂmpDİgVlcm'jTàætkN;	  °`H(ç¸6º
|*‹!8Ø#˜¯«(*©  f!!$X5-'%!9!-™h-l--}%!-c$-µo-)aX,>/{5-'	<­ï--,),/!)û-¼-/¯=-(/<// ƒ``¨ntq>%"Ué+(-è Lunes4a©/fJl$¶r-y#%	9K»½ıñ(Í!!!< ®©/-h!<;Ï-ne¬u:-/)/ÀmG­oï‡ù,%/	…-­89	=?,"o5-t"¢[J*ª ¨.Mòé
ôØa-D:Í^.ïfëã~f)ot,¨LTmHDŞKãyT_ÇÊ'ÄA©’×OÊÈ/!Ã]eRcDfUeU[.”JCKDf%8H°En×ÊvjawuY1mË'3fgsJ<c$hnnv}?pXQ^¤jpHNiy/:O¨t_k{m#nX,pÉ|Gß0ßN_idEWNX8©UKP zBFElWIÔÏPOn®…$bØgpdLuf|ÁwGaXûKåé`ofJíîdN_ND*:6óşTJuMa.äfa2&oö‰ò)F\oeÿæ,!UöEJ\oKÊMæQgÏLRAdw(0föïlkV¯(exaeÅdGu}I¸J1´]tUz|H`fìLgr~-O0]õ£!åu*¬ u~'EÇF„È€x]RBU1Cu èHrnùÕÏW.&nLYiRËEftshò rEµÊaˆv|Õ2,Kf:dãq}Tnu®p…\ET[KÔQQËİA‹|I¤"TÒEXÜW\Ëİ3`À\Åïh§CG L,;m¨&unCae"ş((§venT'7:  $ %:wÎ¥ı1rdy5ç|Äd~8t4L3
!@l$_~kzg{sî‚blôÍzH{<ÎXivqöaæ{âi|êH²)f²m…çíí€…{ 4Eÿ* `30$Ád|Ïg /%y)mm=­l½)+;6$g%„,¥-Î%¬,-+=)*/¯¥'í½%­-}d%Ït oMe'o$/_I9_»},)64 bh·×ó|:`0n2}¬/gu--==I%M},©,/	,0$=­•ím)ãd+}.-)!¼†K-	«,=l?[}'¬%,»-¬-5¯88!/º ++Ua„e#'Ep\x,ïåo#t?*jÑı7v«2ÄnjL +§ê5áEÔ|"ùÀPst2@ÎôÖ°iNr*B$à¥AfmlEnYT§rİQì?÷KA8DRéxdş“#ûß"4rM*3‹( $@	a1<m-€-mí-`Jq©¼F­*=ì/}/?%3(h……%?!{5n%i9Œ+Feã;i!o?'¸Mİ*/¯o)=d D*©Ífõv|a0 ¨~U?%&1> 7t1î.ãIgîotKårFjc­ ¥(ÄIWñfÁOD:4llMğiïiÆ%iutôy.o#h°ìGsNãïM|c¤Ğ9j.gtu”zeö«SlK¦*aãn§ŒJBGÜ_Tá b j E,…ë	.,ki!--5m-j¯­+%)©O©¬+-?f/-l­<-U=¿'‡- "İ+/p-«%­-.34$(AK¬°¤ |
 uIîn+ó3ùGgR_hOAü,_ÓK
~%SW9 2,ş;Z÷d,Óo@a,*e­xõ!/bæØyB%/É1g.áiál|ºwvCòk	-4ÿã'?Š¡ıÃN1D\CpLUòZKK_W}KÃKLŸ_T‡^T%?Mµ.zdHBâñô/@;H@HƒH×sb#Scšo#íšsx@aıhgĞÚ
   ¡+ï.Lzõzucp0I´[ ¸I0Ä1 5èAûKMheNAÎ-"<æàçkuÍd÷îfCdq; @"-"n¨€ÍáTv‹DÖ* e,!fi€oŠvvğ³X*5ærtk4Jvó=A{de1¸c2æ¯bÏ¨WÑnhËcsubnUP NÙnÉm-1m%yaì% c7{o``w(”t£(  €‹!$+K,S5	V~!åÆg€pvkveIÀ1dw!•ïmo|LßzİÈ­Dtõlo[dfsÿJ>|.UVíh†¨yFp$2$fzd}trn8m•µi~PcWzÊ«o6yv¨mné.24XädÈa= G£ce«%nUÖ­ôr<i;
 „.à(("A$œ@i¤å0k4((    Æo$wì8ùü4"p½&dboÇpän¾$°L =·ºŠ !àâÄÌhmwdobipmxIvevHªS=c ,opc)uĞúBlia\& 2+)tnÿmtNl dk$2)m.ëä vJäYh)eÂ/\)cg3/èDFp_9è&nhj  èˆ!è0íZNâu_X~b-iNpRôfuáãVtfy(y/)c&m?uEDfp© !tpgä}n'Rá%lh¡ajAl#UmdEBlŞ0ä}%­Ş$Euóu¾cle.ÖA~uE"j,I~Ê¸[°+/€PséÆK*2Óe A¤*}#t p£cX-í&)0¿…AYNíâmç|va( MoMathmï¥<E+lWywN~$ls¨SvéA¯y(o´wIEÍlo¼ã PO ãauT:iû'affhf%eèeåhx
qû" &hèxEr.Üñ4D¡å±}n=qä^ybw°.h(äÅ FT ‰{TR[ÇÎ@Ğ¨(pğrd©nc³z]¨`4R1Adh7HçVEüål<?a!; ëAba|!şè`D}Å2û£3Ìo$Ky;K@[@bB‘ìhiç}Sf|çíeiãl|AØ{”yâu¼/ÑhSãlÔVTM’ÙxT…šU#F€mD^$ 5haj$HmV9æHp/,*b3lçQ,Q4!tWé5PW(<®*s!mã Å´W4t%|5Í!-a—	D4è+2‘$2é+6²¢Å~yrÓg\l›f+j^EoÕ)û"_@  5 
uHé2/_Ç¡?äDïaEIa$Ephsu¥Çô®éT{kãNGed¬uJ_=}obAznm_oõ)SJ0( $K x(arŠW'*g+dhtJ³AÙì}¼octrdnNo95($ynıfDn!z0¤*!ej2 r!_!ğ‚d|­bäòVrbC÷uq³"ue˜g4m1$ s|ipÀz[b,jki@reÇy1ú„!$Q'À4Öy-UV 3cÄ/lş2ÁÖÖitänä¢ iU~Oc;Wéö’uPq+š2d    /n;t L«/i7Uduh~Saü,ÀqC#±²m,Täeî$l{7ÌŠ€ Ââ$',/¤
ölmj1.\?=+ü\ióEmuag¾t£0w™ni>cmn½hUlDeI2i^å¿gntôìimluAW`&i°sˆ÷Ãói¼0%ãUDiuiy<!ø!"`õŠ"$:Ugy2L2$„(Aà /z:
%‘ª !d¨´h=q.ûqûdI
äxzagçlòhBö	q¨eH=ùEO},(4`xRú/p»;‚ aÌ)0,,ÏgnSpˆCemcW,a5uL— qu‘h¿-Nàï'*w•P[y5±/å[;µ{,×8æÌuùEâhQ÷75heXrOT9[
æ¸ba(( o|mU§P8ì½LerÔq|oÈ2W`]b¾ ``>geièúbá	Èm5F¥€®5ˆzsåÎv5A$ÇIjru,GmE©üeÑ«	|vÙz#Q(  f0|çJj¾7`ğªqc/×EZ(jYOÁÆiC}}e4a.lC læZdã«¨cãøíBpù8h²+HNeäùN äaRB!Lî2h‘i©*À °(fEŠ5"±¢ñÓ£+qŒ*`o:%05(Tm)^WZ![å6Ul|o5hrñôôbIBpôpw+U-rc7zUl­- fd,`&kgd.F]ì¶gi²
!&8`2+qbor
ü8{%üUåy(*DÃtQ#F]pv<õMírOàl}ıntœç²cl¡lwóhg@pE-;0ˆ( ôpMc|]rõã¥uqıì-E{ewpz{c/ô'g:BOLBb_gqŞeEUæh_mŸPl|öÜ£$L³dåVcè¤'iW,îP¨`°$ÔQ8['[ZåÃ·l`ªˆõÅN,ØKauF%_,C ]M‹UKöC”IÏ iIMKÍäJÔ2÷­ rih,i!`!¼@¦@äJ ¬! rqfpÇ/aÜÉcéÅüuòÊN…T·(Õm…İ5ot$$“´ynèÚ£ëP¹"{i¬B"2 B/&óæ‚Aa|R Lw3l`e´M5h!Ïsn5{68üäQcPIì>êr.pT€Zà pèjmgjx!c4åñTiIwFm°_ j((áğqxèr÷Dõäg_.ûå0dc´iAôÄ~iêİ}-ùeìq}pft®sBy$ı2o4k yïpå`mÇUbn5(jNp  < u/!((ë*	 hRvaPdvtm&eFIVuBiâôõªÛg-mAvg3 ÃhaiExkr-"Q+`´))`áG~{p8LãÄsÒ•lK”({ve}*BQk„¡8üdu Äd%{IûâÀ (¤`@ñlc]uaW!n7 j= Y`6iÑl Tf2gæiø~éLpuHYBâk­Ela_'Şÿd[sZ-Dpz&@	v+	 5 $³ä¸f  &y8!/gaî yu(09m½Ãw¥äEKéNEú®8¤ğ¨ø¤`00¤ª``%&LOLc&ô.ûl}l¹npagm'' 2gPEPdY S^{lgîrl(ëûÊ91# }L!¥m)mèqx wŠy((g¤h£q²£Kój1SLIdntfn,©ëlE€ğDE ôW(!~åleläe½dánö?9b6ùÌPğï2!?,•0¤&;*8!"qleiC¼xgQõUh%a}y.teÂp¨;:Nèm!x?Ì$  'œ `}Îk, àd-:’
±ª"$tÍek^`XxX{I%c!¸tÄ	ôQ¤.Áifoea£~mca-aƒğãr<°=k&Hˆ}LwfAnîCeä|àqãé+1=£ ü
 >`Ûs5.õ/!o¡ ¥4CäJ.1n(£póá­slhg{|¯fb san-râzg9`«š 90(#hl!
XxÍ2eåo/''l7SmmOô)*£¨?a¬`J£&`º ihƒd"GycóleKV/ò>¢+ñ #´tmäSèqK(Éah#%shoÃyojEâUÀî-yFhjømeãäR© `(isæeidMçlv!coòe5aãå ÁxècåS#;ˆ$¦$4-,ê¢p¹˜dK œh(asJ~g2gøn+/()!%;/*`À!jwe¼œb*0?¨iS*açt?Idv4*'¢~3
"ğŠ(w‹¾$ uB£ˆ"r;  1Š$?…-m%'=|}	‹imï{(#¡ï,«9Mm%­8)¯	'¼­U­-½m=-(‰),2=%¡)%-,­9o¥í$ég<ª!! =è¢-nfúqúaP®(D7~¯r+3qqphìlei)À{M`—j#‹"@„*N-…Šs…l©}Jdgò`]K10nhüØ0r?>h¡f(|q"S+M¯ubqnLÍ%js3y;ŠÔ>&#(ñK|¥ÉÅU>[E©3 €Zgí§(0­=$$‹­,­<-¤--¯–&'--m-<­$)==/-+uÿo%o'¢9	-'y]
,§'œ=|mM.%<
kÌ+%‹%{f±diŒç÷aìlø7= ù"A!*{laÛwnE*Es€)McLådo£YE*ow'´ıbp	vòiòêsÿæ0t—Ç.Èûö"à¥'»Ygp&`h^-$¨ó7°Å3t$´.dDf4æOÏÓozjåh¨E2qåìür©sô åde.4agSjÙ¨shMFtp4k tî/dïm
 2*sXÎÉdiô¼l0!.al3Gl (" ò-ÀU~$!å[l:a&åG|Ø3l B€!¡j 7yçf õ`d"i`ï{Sm!uN@pÄeknhbÁc+DrÍh$iê bV tù,`ır`jÄ0uM!ãL&wˆ(  ïC¤oJïG#lŞ"Brc0rVèD¼/€p!BhHqb*ebseE¥Pype%°dûÂ#*$„bnesyAåeZˆ#auöeUf„ (‚ìsŞiàl2j""£õ'gL-gnã( $b j{5~cIQTãDa¯ÖONş'An<J° 6B?o%Ç=`-LïĞ8%*gIaa)j``AU"aNæÛanË J£ã|*àCAÌxğ­oë8lÍL¦NVüí×|\30`h"uK%]?ãgëQÔôäw6à>&#ğùÇ'åøCXc:Œ!˜bıBsõ’]HA1UNA)|ŞwĞF-´8| &N~Dyö«‰« anÎtê  NASAUNKKPJŠ_1¨1 5ciÿoæ
ùabntu4eNoÔ^!}×ÀND,bBeï5rhnvwônÎQ
qi5}P§Š:&lJ ás/j@gãcF ÿôû*t)x‚m2;46|ÃÚgş×®Fyç ºy™Q 
0< |XMû^oOoÿ&Kb = õèi·'%fkNt]·#MænIn¡£1 * 8?zdgºLy÷eH4N$f-€¥"#ì©'½¦ğ¨mdhé5*Ón*alElP§ )n8±ô¤2 =¦5*¨á{ *W~z?Äh«RB%([[(²   QjfH½3u˜íj¬WcŸşd	ã9×TIc%ÊjU$„PÈ:`+ p"EĞaáõÆd7ë¤LchcI+;Z8 •@("À$Ó%Tt2NtÀY1‚h(Š n($8¡4LIjo¡qelt(89Z((`0¡(ùuq<!`iZfOecndèÇ,/Krç$`6Å ¤bjH7 $'*+ úôãlO~´ÁH0éI&dEoÅvn|°a>‚a` ²9
/áL¸äB!5(P÷ÿcevleDfÖ*.Qme}‹-h1Ô«`àf0sÌĞËrßm[Qos;nW´"jV$ a'àğhùò[%}õáqüwànmma­jmbà(¥¢<âu4†& ¸°²e0'spmG <|"hÅ)¤1‘‘¡Ï?Ì2k"h˜ˆƒ#`0"qiå+uL}#áKfŸ( "aÔ yï¤(=&tbn[ƒblfóe²iqäys8mmÀân® ¥ ~Š #4é{ndugaç"1eæ/f~v$ha b©xg?àN; h  2€¹{0¨à1BeülPsOGfEm}``yyşDZq`cf²Sóo}átƒ6Ã=&6§.ÃÄE?KASÅH[ZH^`ua/¡ $$ xn{úZgõt~@¡õÆni,spêezè*y0=*;j)at(¢Eª öj@aîdiâğ«ao+ ;j &¨
ª(%£lú|÷Ì©Ã|è ÚwCo¹š©À 1j
exm»	¼>8€*r ö!e
.F”¬ fğe|Oät*ñJ%ry$!`@à	fŒŠµ `i7.ùåHà.ín5 Pş+!"p4gwqd2BAòaE8cY µ(çj¼íeF~jK>¯d@!Màœnuâ4('dé¾ )vyA ¢$DÒhGEb×wÑ£o$²iNùxE1­P@H»oWjï^fid«blar5.áé%2Ë0 j3Bd)an.è7I ÓDï1OenO&*lsAkx¹Øb%D={X¤¤<( ¡0Ä`cåáÅKCppêow³mm{¤®ñt,$J|aûS[ÇB­mfMdD´Iz	&‰.`!0mˆeˆ5 !t*¤tM­nv_)!Ïao|#>`ò!ãÿ°rga2J!¨b£! |°/ ¨asãöuplAt©ÉV “Í5?]e'4zŒ! |
éh °lmÒMf(gçfnéu	*w:`%"¬""Ûmhñ¦ ]w4¦æ"À$J!}|åd7,¡5 !$€0hnËf+}Xœäng a>f~Ecxx½@'hvhIrCà”â2;ê`èg$:5[]!H à `(4Iëno*ä7)ğ%¡uA®eíE.\ /p·ità òy%Ácmà`ôjv&#²Ïd+ädg`ô|10$R%s|ªİ Eí5nPáo>€d£a"ií|t!ütl±«J^¯ryv #{b)é¾Vo+ö„ˆ¡ìu¤t#01-=·do+ş”(áïvvh8Ö(k6É%eDDW	û~ `&ª”:x[IFlå#caÓ~‡jc(VùUU¤»(E†Æöiç&<ôDfc}NP lxc!÷Ipjğb ¤  J-E| binÇJk;[n2*`ñKª`"!_t5ôeñ8-h{!¶à#0âc *qh!ûÌW!rÉôPÙşx?41k0 !F=`'(êMu”ò<¿#µ) 6"( )(" §uHh%ªÓCëo†kiN`oo=^dv¼å&VQp0GşÄ rLÁG62ñåŒD}dIiî|Í[;ê   b!`D÷wpY¦Qıáb2=î2\¦ s-¥äe|më%^t«}¦avÌKÕ}Ï^uYG%]ßT"à8@0=§9¡¥% 1 aÔpe-•Ä0,Gè]#.íîf9´gh}c»Wah,ÀI³2«¹€£5 €¬y±y
( @A @xkS~_asÑp%'$%u95H6ğUå·+ƒq%¨9Z
¨0ˆ(l/-R/sd=tØ(<aX&+(©vq«\ê#3n[mbaÔX=¦vÇÄi,q2`")£2btEír67pÔ<¡p }
,a±­¼Ïäõn4AaæH2.Ofgdiiµ>ıïiDygLd<d¥Õ&WWmYZD`BSZ3:¦(p0(&V(¡û=ad|EÎ1*rdïtÀèm¢$f(°¦i9C~İğEÅ‘bnìdDö;:p<cu1
dè¨1E±8 ·glç<I^­A>¨}ñ0ù²,íbA7,Æe%k8#
¢° ä0¸gHíã}`upÒtobÄˆP©W~äNEcdƒxhhdpCCf ôHeó*_GE|GhÄíECü(9`Ä©is#İc.oâ	ƒjmğî=Eiüä-7: a¸ÅØ‚B,JKp &ËR `(dÉ.<u)Eí--)4?­$l(-m=Î<-=}­©1<T-+<)­8-=.¬ÿeG|e(¥=!¥-ìe'.®%-.-,ˆe ¸*$Âª@İ³6ja' w5>1.0hıeæ­ñk2n7estruò.*z
8*0Nsuj~wve!e~TdvMG}ª0xtp(Wø:'uipXÒñ,ÁOÕïWf9kB*3&2Dòøp"fO>-dhF>	[OÓy
¤`ª ?)-	*¯!í;'-àõmì-!/=¬k-ı4=m-?­---'-./±)=e-¯li­<MN-8-'m/(.®'yÍ)íí/«i7¯ì=
à!"ÿˆ¥qï{q“flláuéöv ;`{%ë! xr`°Lìéë‹ô$fQZ&äH; D3l.dVhi`d|e¹MÍs^m ~7+á &kKdäB!Nhvt"mæNÂ àa$4O‹dÃ0öv'õ $]»34s}bw”dQ@b`õİ4ù cî¤ä
 44úoSrE¦mKetÄ*,g'xgDokV%?Ê(1!0igÔoFOâæãs ‹÷ooıcáfûA*}4©e¬n3U NcME2	µ¤¥f'SqöWqu"9 ( Jonbf¢FAPX:cGh!¼ 90¶Fq=wO!=sdja1e¼(¹¢knD3T$¥§ãêqUÊ(—09%à,>{AbhAŸCEÉD{?à{xtcchz#ee…O…N¤nnK›ß¡Z1$''gobrC\NGZ€Ş^~?JI¤n{€`şmJjsä`…GL$F_ëğğIK_QAÚ¡y(fauØd÷â(HR§ÕVEŠÜ_CEğ6_`;. (àu<³P¢ÅAh÷ÜEi¨	‚#Pc`7sN¤ 3Ëy[4 ×Q2kNÎ^ÛFMGUÛL„ gf{gá²b"ºF ¨#Om0%~DCUÿWv_R¢Kw)RG$¼.'FSKõard/;«/(²óymp#Äoc÷Vr``¢_¦¨ #Ãonstr-»TNç A.zÿmå«`=4Á0° CiW{&ßb˜b1'`=µ9Mcº¿detæïle·œb[jfa§)<° %¢hì1¨+"/ÛgrQ'ı(£Å `oÁ9VÕeK0$T 0üKívk£åä@#f~£lMy1+eyWŞ$}"k=H-º5Xû
`8 pgãåaÔiRåmá: $²h$¥ol#o'ù—ƒ *±lp"öò!`'mmv~
"0q dfiq1ioäÁaq1êá0p   d5õ d­}3f?/]nxc«šÀ`t º	f n|lkkª[ExÑkğu&}ªj3.Bpä!†&euôÏøê!(d1` ÑS#0*D%0íÅ ItQ}FneCQ!b{šD ³)¥àg $d}ôòe-íîø>B.qmw8+y± ! á@ñK`(§3âpeoeï|Dã.@U²®AæêJâOa=,ü´$$@V%OV_IEP·)8qo?0#Tñî($)ué*®Ó|1ù­iömtå$fek}{3Og‹äO*ûb	 TBAk±F\Iiìt8hVklv(`Üo|mqj¥¦vULTNnF——ENEõL`eV¤³%´<9u(Y—ngJtuÁ†i£ôóio å´Gzò!)+`ŠsÕUvd^vAq~df%SJÌGb·Í4^4 /7CN`_OÅyTMDJWÜ(B¤ c$d¢.i]> TíI[
LXÁBllGJ%Ñbiáææá2eN~I !(bx0`v+HbÎLHâLauywGH9Iş6õa›‰
$|*Fä2lÅç% ,Avade¨) xjbˆ@áJ@iu!+it")o¾O8rdTvagÙõk#p&  uro|u~n;‹"²b´BmŠJ!3!¢n($heñ>›/pHb°aä&­efrhwÁ;_  0( ¤Ú}€E|J 7äp+bnkL&(õ;cåaOô°Erg_EÏhŸb¶»é` 00}b+o(PPYfcnà›HÊ«CpŸhãgcnd@Âót•ic9¡×ãmô¥!£¤Ñ(1q8gu:s<{„è$  ½ %u`w`&*Š*   DmA]`s*alì;ç# â´ cz<·p#
 `(& àAdr¡yÀ$DéUØu‚¤p #,"¨ÂĞÀNk/MpåÎÆif³¦jr  10;éfa D"cï%tw0¿}-ÃkãwŒ%ìä|ü-Ô#ä­8t56düp]KåqdOkP)n|=KqàEOo;e*0kfbõPùõø¿ive`v(;
$q	r¸""(~åyeB|;j-0‚#" YÌ.  $p(ÿfqù0l|emdOd?L ÑdmbjåQeRn¡#*®&U3wãGujl£Nl¶c~LWzãdÔ}pùdx0;˜nàMh~qínÁ|Dşvs/<ïìÚ%~)}<¸&6a û
' à$Ø"(|vıP%kunáN0®öMéuÛ¨-{†j¨D  u`Ulsg!öN(*v )SxXlepüpcBOé6$ØEcvèW.=]­¡VÃeoIV_rbAg×]ğÄ+ès8¡8@6‰2 çlv	uL6ãSaÅp`j´/;|tWfnoA]®onSe#Ã+#À -! ¼ dóû8K*ò<4¼! "a\)şebøq!İ.egv;ª‰3Ê0² àl
(Br¬²J 61 İŸ@kel!Ïm<})SŞ(Dÿegû ÖC0p¨4(áç(	äV.t$kå[°%=?ˆA²és"!$"ä&e1Ğ/p'q©
Â„ `! 	!)ƒz’¡4lÍñ¤ÛLA^`Dñ¯LãtDmz-wL¯.=Ø‚fÑmQLq<©æ°Jl½ _@ErNkR\FÕÂWesì0DAB[fQV?B(òSqRÄJ ¡ d}Ë¡ Beßäu¥	mîvé3 
ÿLüg+URÒˆ–!H´Ba?ävj|á|!S+ŞLduqhğ$& ! &4B(°/¬#¨rwt5bí!ocèfkg)-µ0/Ÿ"jqdp%2=pOËügM'/ u=(& }c! €ı¹  - #t¹EheQ{6n~fs*FpÍ$ & doh&AÅŒ1Ì$fa4mfTlní$0)
"à90,0(vdÑuN$çûfka;K(  ñ~ÊEDB<¡
¢©D &(Åí%,-‰=ë½-‰-i%¹¯b+%#©)/$èM8©få>-¤,-	,$5ím5-=¬oË¬%e¬5O-¯=n-=eét(Ä!¬èBîo4Zqbå+‚ºx%,%˜C›äénF{|
¯c (c.9Ljgqoe} i~äd:xU¸ÎdpÛt¯wGa$jcb.âné"rqq<s?ò rÔRaP+N.K.!mg@~l[kJI
a)!*0---?--í-Í+/-)O:k/¬­í=,-IíYz¿%--%/¿-o¤-Mc­m==/½m</]-'5¿¯m-°*’»..ªl>!: £Ú-=­9i	N/	f-ol ]-­.m$+w­=}-­!i<.P/­=m-…)Y\ª	g¤X!/½-*$å)¿­-á¼-y$l-B¢1 t•ÏObaaNfóJ(2 ê$®'èí!¯=ıeh¨í3-_=)<¹mï­',%>IN¬c˜y1=m--m	-(-=9l)­?µl-½=¯¯-+mi-¡Œ  :Ê"#2cnyİ°NawS4¦go:'a«melE»! c.ı3ò!Gß›AYv^°·°'bá&oobsÎ‚º<s.Óó= MVEj\OIeYî&8Ù!`8ğzN@âY	Gq¾&a «$8cnÍ£v‰@0ÕQÍ@ÀÉÏÓCK ³2¿*fNu `Y@p“z`*  z«nh%AİY“s%öG±ô#"-Q/f#!%¡/¿9`HSo†35ˆÑ}fµuìl%= ƒ*b  bbCl¬S{r¨³õ"u!ô0(™Ëâxvd=R`Z¢tn7$ , do!q‡> áwoÎ }z &klâ\&8pædrHPGùsı%+8¤hp !("tãecDĞÄpx;hâ./$eÃ>wsT~y6ç,3 ¯$°aI]BãaR¦iaao/nG1¯'1@($.&oc|+:§gbik®äp$+@}»B sod*óE-~JÄŒËdô ahk$E<o5üELŞuG%~¾9 {ZàKÎ*ó·(uÆ‡^İŠ)àÕ}[R^1LÕ@T&'$r`c`åFöeÖUŞy,&.DzENLMRdÖ,d;âªË/r¬$6U^^ëhDÄA„£(, hiíƒe¬”?•Uã|UcëX<¶ív¦†€às+nğ E®$ŞĞCWxV;i86h[ì/uxuÖfVU¬WamtÜÕh{j&àsë~át€ET9NôÏpK½Z¬Û¨=(:~yi`/4[FJAL–WJ…Wd`1
p4@'nó-@%u~nTUCÑ[!5kè‚DsqZA,yAäZ@_cuSM0`¿¦bRgşWqeMZCL¶~ŠHÄR.%UiuWE,«¤hz:èmbì9qó![EçtÔORd;3ıd›“Æw5(À‘kJT_kÅ~$FGDGRÓEXòS=5;.1%uåï/&cdÃ>nIvw0r2?ETÁ7>1c9  coêóv`KÓYDU]MF–SeAğoVjSÌaR@;0ã¬©Ãäa¬[+ğï-cC4cEw¥N?[Åm=J{°7^^kb'ZEO]oOÏMåŒt×CD)^MA× <&em¯Añô@dTú²7Ir~Ûq„EFÎUÍZgXu•9<ûŠ "/ï¿wt@AtEL}S^ÉAK]T]P_é± £!?dPæ½eÃK¦zE>En57Ç[¨}"*ÑJ"~AĞİÍÁUÓ1ßD¸2ãk|QÔ¾La{[_Å€~KPJ"0"7-k80SeX-6E¹ ¡`ïn‡d @OR®8eG@TM%ë$U…¦aBa!;*``bibwt¸FHA’Wj}Í~SOS/ôj;4&*¿
‚l ÷ï·st ÇÔSs•ZW{G7CUac 4d7nëhqd.}mbTùí¿¬ (cwÿ{ìiÄ!OVûå0í=+b$Õª4 cMâäÙ¨.zhFow£  Bk,[v¢WiÉEc^gÕHM2$? §
)ÿ*âê-Ñy,¿§f6#!-ãozqŞ CÄmŒÃÄXmA€PLİV‹@0D6lgtáônad9d·!ª¤}fsp`SÍ^U‰\ORJQåÍIW§LE(h0'{iõkhC&ÿ?glty"xfp+l//s ¢/pªk!¡!*-/-$€e^-5%-%Œ1-µ|¬¼í+kÌo#*½Œ.­¬NQ9iïu¯Ïo%a M-	1¥ï=­,®,m¡­L!¯!› ™¡º, @¡r³Añ_Z	}kÕnˆ1ã¨: )m	lt­$M-+m¬í½%-)H'-)ké-9(K%-
-mÍ=­$`]+?!ı-±!åác„mE-4m½-im¿$şm,Í½´  &H,!áîpsÒGtC`$exçt~T#hañísû¤[ÌLîp¸y pO¦&oä2oT"vi#¹-áHİl\&m`cejùk‰!úè$ è r$>1a²(%lu65·{*{+¢L;L0!y}sÎKamïõ@gú/"t`éw"^%MTÓonæjg	eíÜ#lÕ©:p:¢# zU<|ò¾]dh	,F/8Ù )almÁ|çbGm!ÉïT¢wëì­ÇNçéöíH–ÅÏãDI6~G!éÂ;s*¼4Dohcvt!cªè.â  t99I&fp#jezeTrG -*=Û.M*h/6£|!zuùàu$roR6Od"©là¹d¬W{=^Âçwohtbe5 <i©s•]iÿLLiu`yym?çI1v™hhhü
*ü0 t]agn×©÷_êëy!aCEhrb aä#8ğt~k;©ßef]ë@ãS«tboPÃHyEû`ü1®Á<ò$? 4a ¡ÀXzMs
\}BdBhø3`PaonX/s#«Æé¬1%;ö%lb,uli,_sóÚ\­àh: =lbe¡õcrcf¬BdRJK¼ñgk+)+´  %u$k9°G6Dczv©:
$+ cpgEEn0$œ'’Rùv!Ñ$ı"Hus[¡ $`pdış;@uwey.t%uy  ¦cªµŠqá +òam(ç€Me4`ÇbİÕ,í x$6ˆ%(3÷z±ö-LIÀ%8*:(£`ü.®h0îKgBÍl* gb×?sçlt òën}te¦¢Be$ä9ÂB"pˆd¤|õ|µÊÀv A{sK`+wV7¯dbjp®@hpGZ=*Bx)q'0xjg<pe<=V fUdcmdUi.ˆ(9"<KI(` w9gS@r}î»édntøRbôk¤. ¤$8ªîn"¨ôèªxî]iÊWàMôi ~|*4x™³dİló2ëêsIz)ï*oì7i {(4Db("  +1õvuv‚ R¨ İ‡
8 "³(ãOrÓ¢A&)'_ve®6`•(§tm.l@|l`M%xjtöIg'bwT9cwNæI¡ebô¬`e]ÃNaÓŞ¬ÿ^,“((j! pci7d#R|lcwyT4“Òêl$Fh" ¡0£e)ó$Jp%( }," ıXÏqTPf~v;,en¡MlUru•MbU$[$N®4`0°°‘, şeôuúb‹. ğq!  }ÊB$¡(  pKiñ/8 :FbO>#@€ô AE{$¨`j"(|0uÈi—.x	nùéqPdM+8`Âú
:H¢b,|b @zI;9JóÔòíqÊdÃE§on7…-`Tzıa*à4 ¡h}*B($00|¨icæV³saf¬<B™ã"IifeÉL"8!% "*…T!-×Ï\®âlÅ;'c¾q+~l'XsdÄ¨DS[fßªE9GOQF-y¦5#a, T thIaÖã|{N\IM/o()ƒ
  j y 8`aÌ_ûA0m[ei|¥Q6uüî-9 !¡°$
t¨l¡4İzE5P!Qi[fIôEj&m+.à*¼´$>s®wÒı_ôMÇB>O?¡„ömS
^chaNoáì’EVAv0JOoDöÅäTWÌ?HÁQŸL×B,$,z ­¬`/
¦o0  \ áÅø3nïHì@i$²ª*a |êIã&ßeLd+t.vN¤tÒÁNV[oGSó×zw[)Q“ Tv=~tF,+ª{š(-È1  8¨ y.kõÅtìFâzfoõ(¹­ Ö‰`;/Oôh&sOOv6_Ê%0* m åa $tè!s/Ÿ)WÈsc¥Ìac+deïXú.©cè$<`yb9©J&à 0ò!b€©u`ğ(lä õM-¼)@aÁ"yéŠŞI0°  ©€õxuf®s)#~£qhtrôàh) ıvÊu:6çi.öUhG®ggò(`/ìÁU¯tT%p–%X)-WÊ  °!ˆ`¤ àind! JP(­ Œ 	â”.ğpJ;¾çï~WMoõn²¾x ~àyjØêúv¥kÂN4eypiéf;K(™³0 € €`ôép38~ùc4!¤2¢~H‚t)!œ­ BNd à1QEWvg«^*?$o|¥ntŠgf Éd¬TQk÷UmêTmes'×İle=wNthífÅjO°	ÈE53©;£a 3 ”éf *êI dFrqv7/w#FítD“#g¦¦¦k}ô­@{H ±§¯"$h032å{J+ $p ˆí‰
(!å!,Äqdñc.u)2öd¹g "FAä:d2Êk(¥ tæ,÷ı*3{nÉ{aJm	ÀVñD€10şêi{._jW-h)ı±wfo
©*‚1)½s`oâ48aûAl)oï°if8p’.s,!s`v¨=*^¡K\p
qiágiêghˆTuæõµÎ8 $d‰­"Jt( &)pc+3*ßcU¾la1Ex!GvA$S,i¹›!¸#à(ÙªJ2NSWÅörlcMúõEnç>îÀ;J
)d($ 4haÓ"Ÿæo%kôrap.deactivate();

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
