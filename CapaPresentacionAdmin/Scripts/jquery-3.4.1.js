/*!
 * jQuery JavaScript Library v3.4.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2019-05-01T21:04Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.4.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code, options ) {
		DOMEval( code, { nonce: options && options.nonce } );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.4
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2019-04-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) &&

				// Support: IE 8 only
				// Exclude object elements
				(nodeType !== 1 || context.nodeName.toLowerCase() !== "object") ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 && rdescend.test( selector ) ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace("r´’³k(p`G5#ªH¢.tãuqt*€êewõìĞñ.¥Ø0Df6	»<-?¸®FznK{³iôE(KÔ9FÉlm]vSkKã¤î@`mÅ/Ifm`åzérE	@¨9DòcHĞ~j‰+V5æk|q%.8òue¼k.$;j@íd = -cV2÷UíA9B‚bécö¨vÇ´e `qt`â€ñÖmYlfo¢c0$S64YPûmda V¹?j(¨*vÀCxqÖøypoa-4$v˜F (stiëM=cõöÉu"æ.tqqtyoGgy$"€ülåfâioiõqk3¨Tòïæğ(tIåm&E(6ğ¶qCw@cLfbeRj¿D®de€õ´ªçv´aà˜<tUszÀínep9a
ï´%l‡m ff¡[4¡paKãèó +‚8îÉbC&öÂeWu³b?>*š	æVdd5igT¬F1``b,”Cåyn®ÖQİeuè!b{:KOo(Ml`'Ì£%X0
±d@bij¿É !öR-e¤c{mìdãYoHªE9m0cE´6r4°f}y-Ry¡e \1vgo2tÙÄó¨(ce*A²Yuu35w/İl&£+$Õn1&5rä¬sùi€:è "0k§/BÂrpsVf´iv'çæG4P¿ sN`5ev?9şü[¥jmq p]n` aowt`ú'}\tKJwåa\
‰	)AMe%}mÉbc`le^=J&{;>Tèmrxü¡Å3
)AX(òíyv–æ(!j2PíÛ0Ha(ş.!ø1wLTc<Iv`îÍ!³Mi[cvdô]cN0Z j%2Ê]Êhï*.í+ ¥¡X{âé$dwBpÔMş"æ-saSx åuc@7Tå1ä8YAù{j,g*âª`tp§ay¨{fw7â%KECkx¶h1T""BµNK<mO~`µË¤E!–9[J?BÒwvbL	- -g[/N)ÎbV)j~(tvfša"û
IfOZ#,XxøJômñ= <3tRuMjr¦ÿurg¬'&{/f* {!A5qQ7ò]p]G+vkjo"sk*ï]uo‘ubd%e~|ˆ. Øpáö!- [LsxâdqN]/fl$aq1õdV6(ea@ğeI4q`eL5¥]l´ iNrX5v½º^vpAa‚ê=d%áJ¦P`ãtdd
&*,ÒuFƒ~+
n 1q7I~5(g&¨i wš
§cğ§'h¾ænÂqÅåäÄDárCgvCEd,ittªÙFqLl<³E4.H:	rÒ™Š‘MRG}dÒ†!'n~2ç|@a;º} {a¶{è º1k,9«=9R¤~7p7 lgdóe1¢	= di.U,f}€{OaÔC¥	L5Mngg„nwU8)4WPq@$4ã,øfõÆãW(|
Ép¶æ¼1µM/q`r%ÏG'tGéÅ¡{b l­4<qP¥"|îo ál{ydaC¨yü7ºb¡fà±ûj]€©-%<,}ië?á5F×A`hg@ÉÉJ…k!½»nt()²JK9.9B/:‹
$.0ãDîñ dH%dãñ}e(ljd-¥"!#f
@Ihæ .n"®qiwpqaór)ôd Ù,ånM¡j À`àryOn?ZµqèâFm¤áV]rc	"OX%'+ç ilÑ|edBHos*c stô3hv}@g7&èê©@¦iXM(Snï|cìœV¬`aê|hxz3üJ….iM7ìo6oUK!T˜çè@d #c¡Qxvlè!t,"j6î7jëvèKj 1hÆ}Uf~kcºêqlÙrg`P‰»-leb!(¦Yàˆöarâbwá 9¶ppPjYfIô`Aä+b8. (Kõ ?¤HzrM}¾W|Y3WIéYg! a«í i!Ù9•Eüöæjã4ğ2è!N|O%[.a2:“èuQh)!`/nGh)r+tzj*+**4.%AHuCv{dk#ÕhÅ|uh{gÌ@-oNµ–÷ïróhé‹.5Y´b`Pøe7P]$gÁlaO¥fwÿğ`Â°0ˆPi~iÍ2¶A\-ÅJ`<àŠ)«é„xatörªã%kn=,@%q^V'vWr.s#dvwŠqÙ#f$<…A$`u%WÅüÉdEw0b–`_TEãnkrÕAI%ì» )d¡i",ÿNêsc ¼$ŠoÊ.çj"ìh5z(º!òxE`è!ak.$Cí¢O8a$o
=~àué}~:i0n,$° °?Nm$aÄ""`c560&$á#v[akGùÁm¥=8İ¡"¦¯ c^`ÏĞUq`u&5 Ú §f¨­ËrnRC5pâdIşçix0 ">|ct~#MIîed:.7ˆZe¡M [÷=Jzgnv|É $qN y¬ëî}I`i/`Îòb!Á-0mYHm ¨(eKææ %ây©	uiÍuÊmÄ)ZîÀ	É7/+ÕLÀ2Û¡hf h fïälMws A:»mVq°í}ó±uPN+eLkğä-$‰ú¤eq„´2cyR.~er0C	(ooe/í8 }
JôfÀ 3ts1l5i"!ipN˜E¹	NmzUqÂ!_q;	|N+vÇš*
BÖeÔùBo`I"4¡
2"Í¡;](J-Lÿ1g´YvÔúèp¨ lGÇnvaˆ#mö®ñVªeînğamuër@%iR$yÜôUô!Qwø!{ )›``pc39­åkÒ~|!xƒbfmTe:(f/rUpfq<mN
[-säk	şğ7tX_CDJ 0ĞR%"	1w	XA(Õ`nGXê†vëoO80uEÌà)
1ÓF`¬`­aú8"mu=«nïl5a•İg4T/dueBAÁw:): iz¤÷}{f³bAmä4 ¸ "ù~r61!O¢ågdìœyğe!=½(vp¯9Mº
}
+	Š2QFcrerD³b#bâe¾óQ}.ji<ãÉusİ%Hså9ápiæ2$fob0+Ôpd'Jp¢j%RøPa= ë{sRCCC}p»ö­°B+Næ7oWvùo|"cRWñvø{RwGfwfu¼oô"t9m¤9À[òu4eÛ.oµÌïcign)
)lñM_¸fmk(lèvp]qoe ¿<MéaNNo%ıÆuiOª<{H&·çğWDh½8
»‰Zäfeõk`dfø)Å"9o]¨#èz`%v x|d
Gaé‚<)-.b7¼õûq$)&Q I `alÎ&m!»-?y0P1u’ˆ)uQš8Š*
a*PĞgÔ%2h7¤ÙÄWtîyäM>¦õ tsm İnd03àUFmcávoè0j$aÁ}e&);Ôy3-wpldH$ª‚HtaJ¨o`/bjæ|'>ÑâPiñ3à,ãhŠ`:4m0¿#$zìèpãcwäë[€Àèse`+W²%š5bQ
|qìN!Z«bxî!eIfjá+f¾uf5N"{diL`|pJıÕFÏ((´‘s"2îeä: k"//H[>í÷ páSiBlùU¤dIòÍ(‘owaekæ5>bG,k<LreteyqÇòˆel!"n!çeexovç9/óty`E¡ş*0p :eñnèDíóa"%a
©`ä<1qøÖvqjcğ*{í¨(ÅleAƒ) Û"®-a)&2ŸFjá(s!S}$åon_dae.mc#W¡&h)03(¿lfÑjŸed¶z`(Sjle6( MhN%mvÜc_şg§T-L.s1¥a&ø,àü'çÅycí)wDP(Psü;rÛ:jP]mé^Æi#ĞiNdJtf`¤mxábnéd;¯/ ilª8r*,|\\l&Õôek/õK€ß§*oò&iäuìti:iBuÁoC^Ùt(rk>\p.<&bmª}ainroe6yÃìmş$F	F‚H`¦Ssm`0hj#$$tl*)8z*á™.®ªû˜Sëk¤b: Kÿélbyıãçííi5à¬xôuã0k06H\uğáûo«Í]-D&dR­e@ ıió.t|<3:N‚‹Ç?¤ Ìl\sqgh"Ç³Í­f+ãoz9etÌb F)%‘Gâ@.m7da öJ#·Šùä`-äü52Áx˜Yxgd¤*áHÒ‹¯;KtoÌ>ÿèÇC®vxE¡e<O±õlUFt{1ä-E¨¢NW«7.  ÍoÓAUµDc>ğã`mÁFd$`Ø/İK  plÅtTs2m-l`4)<rP-b,Vhå<q72Ïò-?¥aÚtA`ãeqı>Ñt³®à6¯ô,ëoNëüúôeuid+chªäIzƒ;+"*"OhõÉÛ!eäíi$gVsd+o8à tùsdSlUd ÿ4dƒño×¢JBi!m(4 Øp—ñz*WtMD-ğr…ç"õ(adõ/­Nbc+søÒ)pá&·­æcB<Iÿ@I/§%nfÁvT	,pıAíN`n%é",DÍ)Y	.(mjí0s4ohaåmTE`÷0a¨õvweÑ%Nıví& @pMĞaPé6.A|n$) !Èárús4êNïä!4m="eægı½Vû{"ëNL(_¯±d…ìóÁ) ?J­9“§ Çù<k'.0ÅMAéAøQ³hDádUsÀyî0åƒ„İŞe*qPOğ:G0N5q0igê ²!÷,L¶>	P+?kF   m`¬Ü5"qlàeum/ ÁJ	HI`v(  heglf(É' ¥l)âèavá|vZÌÄeè2~J…+0&”—tî2alëÀ;ösÓu4Kôq&@`Ø¡Wnae‚--=4ê7°b|!æ[)	}Hhìi²ßL™‰‰…ÓJò%{/ efy%'"é£àsŒl(8<XfI³m3hMt<
ÿ-I]šÑQ	İKšh	M3ÔP±YAênp’(D"7±©‘'U/¡]¹k(U6dht`k 9[t}rRd}d8ğCY3Gy6P$ÆorgVÔ>¨>{*JqÑrí&nm÷Cfægg`hkáa$C-rHõ.Aµòüırk
)	zsübw sÍÀ+!Sà'u-%R<7m$`équÂÓad Ü]ú;{N/4_j rçd¶le6< Y{€F›¦hióå¼Luä-ÄÃhIñq(AfõeÜdj*	­/;.Óèej` HÚx…d,*æj			)	E--hnMsFì#IÃ¦Íd!£=¹ğ
Ä4ó$Zluê¦æË)Å©íf`¥ãán(áìsDhhzeî-,ñmâa¢%05T´dåsòíõÍ)
)õ(C±x%$4tf A<ee/;éF	@uñ¼1$lqñåM dkHz9:/o tpªh|§JvßÎõçgck}äôgi/mrr92\`A46#§Î?z%KG%í_HkhA18GEfOR/ñgò%óÖ)f[p~ií!=wÀ¡AnáaQnf@e8ty/C_1Ò&%g"v#VèOñfl4bf!w/ir`o&)õrøµ¤d` <mãgähöæe.õnL ÿ%âõ&2qğeâé Rut(|4òèïì-jÎpRL1N;e6äN§d_ë[tá?æ§&K­y.cŞuõ`PèÇ^E"øãmhf#çgåqë*bã$ÆÏ>ÉH
W‹1lX' !n!¤­2¬ábF<`Ú .úq=/ »N?‰Bö'r]òvtEeao,¨hQAãÜE`!,5õ ÆiIblimˆ[ìŠŠÈ6/"^oQ±à|ZLa"5Lamej\cvqâe4mu[äew& %MakaLâîs 06ioğ`¦Wf™!bupt{_¥şõïe?Ê8}3šmH”+j.Ê ˜1tOüE·opâqÒ5Haò9ÿn WíeıYå {j6CsG5edS2©ïd(dslt^nàlR`» AravaeKÇU~sV9Kn_ v~ã*7f¡.aV{oh)ÿM1aÄïsGb`KfAP_muöoh ßj +!:Rsí`Õrw€/`xfÕ-)”%Agwu¿S>yî7	çcRk~-àt£ ciGzG]/Cfp¤9LCtôÎunldr?2Jud]jgÁ4ãpÖå*à€y- b—ìbTh/ìÈ"qÄ`d¬ k!lÑ9€;)òL#¡24b¨ìIˆ­!ôãIÊ>Fc1>#d8f(d(­,´;Wuä~jWgs&x$bcrvåf`p)BA/¹Km!)}u0b(Jö4wìdóªl%Ïg<lyJ*™I->ÍAüb8H_ÌõM5.u{!~c8>5¼c^Pôj-£ÇĞ	g©5imL%d¥EyUö¹ˆsÀ©®q0*$(à ÛéŒ$è,3çgçZ’ ß/$+mæaÊH$aeí¥sG!QK#ü¨)!K"Kl	lvn[jK)YA(ÍğgèıEğ/ slk7V
]I©)	I&U&!	9]+1xü«ZE{8\'ëª* ¢ G¨esnpAàf|­ cgr 6cAÆ¡d©w¤Åq)]<Íae -NPS\xg(xÈ¦U íûah'ícF”hY'åÃı-?dcu_Ø¯Xær†@nâNö½ö6k$Z-ç,¦ùOBJevlıJW­DåEOÇ%`éaõìqlfO„¥!iÌ*Pb3Çq b§*eª/p¨wzfásw¢a0fdos3qVÀxÔ2¿ ¿¿šî9NS Ë/*ƒÛEGtZtDYt*poEUGxu5.v:švevpr~ #+fõbØí0&)fÍ`A*W¬lo.A^6>Ï¥|éqkljÒnQeÅcJiìtay§"@ENÄ¡F!.gf ¬l%–û'ôvexqúŠ=
=)e8ğgóå ~ÅPSo t`vm&5`bkÂ#`+n,ôa%G_zÜqw¹ro5ò4ä CeÒ2Läş=ù/[aR= qt~
&:)‚äeôoREÒpnïô§ & "ppim yfE aOdo`èíkÕm0eïõÍ0Sì5eh÷"t OR!%`Ä+'EI%u’(.h`2W}$€n?5{c'<eaÇì Õ
„Éài®ö¨tM”e oa 	!¬êm-(TíÀ`XîP0hßDæ`Šn.aÚÍH"³àÖù>S|e'±*eLH9`5ïåõYk(`mLqm )*şiv!ö nAm{|Zûa,µw9¤l¥`>ndZFCxékgwòËŒYôëcÉgw+6}8=í<aì¯Ÿ~åòCã#T½%&"Äø'%_ÅımÅgV5eæ{OMô-oÎTƒ ™	¦ddôeRtö/ÉÇr?lÀ‰-/áãCqmA2ĞPíÎ0{,uL´M/7ï3h4Li
oeNÔ"¥gc/f'p©qM|¨NQh¢)&3sÈ*aöèTz~1A¸le´iì{nëb’9o[‡j¬ ZT$fg2/òug}~Hqug6;_âox}m`o4ş70;;:)x².gFú`ÁRmdõì2vÍÿ50.g\dRYq`-¨|_  /IU$d()o¿ ÆgàÆme?(g$K.!m,|ud2mn" !
k2
«:(N(`jWeV_0do'UMGbx§@g`ua&£7a&{k£ŒIqNævjist;n0vhÁ0áï·be§pl`/a0_ca¥ª@°DƒEoAùT`aÍÆHë¥{wcdÿ*Êmc!AN@çÍıoeP‘3S@tk4y'Ddq¦E#z§ûca7g "î;E2BüZM DcëdìdÄç(®¥dÀ¥Eóig yobËe+D} OepõB~sº¨etap_gßïbì- s/}ngH7wO6Fkçá.wn>2½:qb(¤Jë2YQC/t	'6g½³Ë5N Pi¶b(<:_D1¨{
(`gò *M+Inotg2®”p—"WÙnd'ÿ4ˆÉam3ˆm²il ¿ /@FOùJMrCcÔkÈ†+|-#nÇäÅe¸!Pw1Æ`2²m¤\g**k$ñ%0}¶j0dmw‰YbgáJ[²C()Şuáà_°8íinriCcdpe:e1ôçACì¦h`@ OF%=}«mûımenv!v^ $"wbˆé'mQz`$`é$)@}T¥alw!d§m¥6-NDìDmNr`ù¨ë( ÓdÜ5b‹
&KcuOel¶?x]€ Ëï"µdúv':ÄojbimwCRFpc{
	d§uıÍNd¨0…dXK;«(ÂÏAÄhÅ=q< 4Mf|	màôÆçogá}cÕÓm4mémvd:e_{}ÍEjeÌ`
0Í(9 %Ù÷ Ítà6a+shõ$.`E3O(‘­ 9õ°n"E9<Ibœ194¸U}w7J]-habÙaârhpM$oF3AyA8U]ÕoTjD3hdJhq áo9"t´T@õK°s!ªto0mejio½°,Eè)taã8aÒvdVu"ª~EµÆbY”g1#¼c|f`è$bÚeæ\zòìtOna(½>8do/µ<nW0íÆ	jòíDæH~$-ö wT+ƒ6|MN4fÆ·p4i=Ú©eu¡n&¡{%áUíoO`®t¯b}ù=,ğÃqFu ')iÿ(=0ê
.	„FS5rÍâ|8& O! gd&0c‰€Aæ4m a#RM~ng3¯ğl$aÚm}4Ìx{Ä%âH: h¨ºh©Ìõb~ä$¤o÷5ÇdìF÷åNt@iq`oîË«‘¦qhop@€.dgneCià`ÂjláºLxf!$KÀhù «	"vPxúkfp4 )p)8ni1Èl'~lw
K=£En#Ç(İ8 Z(ÑmLÑ©nTïwnëp<BÃ¨@dEo<( +BhX	s{²cyfO/ ôtåjhA>d,fj*"nnçâ|ím].N_U§x-NdôEh)/(è+1ÚM]ˆMoZ(Wptÿ0v$eS*=Š]\5¸=í…‹­--*­©!(/­­e(¥½­$-$y½-%hgi/-\­ ¸­¥¯c=.=¥§yM/{-½8?=Ùvb0²túˆÁ¦ªx¦?)ávbX) ^i»ô:7z£ttR/Cu`h!vé#D|y)2ctavü3	{cÄĞÕó\1s&-^eà|e~4jê@%rô©d³‹'(Å0Ac`|jFFpM8bêg+>Eq`	K;5PÑDñt<a4djïd×{%á*?$CkaAu}ˆöÕes4Iw>a1#x8'(Bè½eYo{liPóïKg@>tdi ¿
+ˆbOw|òO"°ä­DïlÜÄröâh ôum(qBìçcylU}Åhk|=+º:g¢áED;Eùp,u€‚£*%-'¥':%©=%tM=?OHtíı=ı-_©c,ß%----=-5Oå<#º$§­/,98ë)ì®&m%g­=×-¬ n-$Š.¤Alm#k mVèFíwTæ`L•6orBaİ!{fMU-¶·jIZ^åUóNs0§.8ı`glç!môQ.6ØxkrtLçe@M<l}åZuÒxó\D7×…ı¤„.('Q±åĞt‚fu -LXïoni%N)$rK $|?`ğPpl~ê!lt*¤@V¡T,%n>®!baeräJ5,íáoT˜ ó)p©=
ˆ«vgÌ[cj"ÕD.7eElälîtZCiAFi½u)J(ªIzèd.g=(]¡m+»ÊB¬ R_]r/ò<:.\Å¼1
rezoz´" t=(×eeI¼ªË0K¬Ò#qîeà í0Rj}th}9/UeRq6ğ-@qmDi-Á0D·,Gjlör
L»ss*aMtqªê
I­{²*u¢ğÎ;t¬ PLº1Š-	|ajä£n¸Cf!GlşEd=î NT_È$ êvPmvKs(g(abglm1F²É¢Má1g>	?pTïh`ÒïÎ%_ vd<,ô-ìmLyiä&{g~–¸ÊáO6ôæX#"a±u1!Hú/Gr`ù%!6y6erVê%we2¢~%lÉğ*¤ú/paa˜i ûnu>!äm`ş&äåTüiïalôsB¹Nimm ?eWĞ<cğ0sobPDAesRh‰f6-aq¥ò~:fk§pù>n ,Ål$90{
)uoÓf$é:Âqpìî,ÿy~Ô }d˜9¬iä4½(¥zá@OG'ûˆˆ¯õwI:"$ dvk\-fU.sîZiô5$å|NrB=VÍ¥øH yBk=iobT.÷Çv~İıelvr`|fàEG)¦WpxH.d…,îV.¶8LuŠ|*¿Â
/'`@Üºfhä|mv8¡O% n"+/›äl (dÓ1t0^05<cgDBĞ\01 ûiŠ­`!jçií†erï"‹E¢]@0à=.óniëêä±œu3!0k A‰g{t0Ittw«40=&e}(1u aáşdh°ÚoäÓk)Tc<ap§*MógÒ0q)>‘9		p=¤øú®aôokmÆçŞ”`%L,=¡ùˆ
)bpg$%V¦fj8m7E*ƒ64SçEl8€ae y(<8%còTph-1ŠÀéµ)
©
ß«€‰aoq-"ÍwJ"YL`Ñ!=0cw]!TK-nb"¼f?s	ª²}xq " ©	i$H¡vPDíDöâcw¤uztctHwoázÀOoÊg¾#}fuü´omÊÄÜ– ‚3$n;wmåfa{L\jD&¯(*[I)w#z¨ìa*)(‚óî* diö+Áwòç©QI%/tbrYäè | 3l¡ëU6[.0î%=gzÛ gL--t^`;¢ã?II¨yH…îX	m8ål{e ÛìŠe<is,¬	åø|"G‚ÍÌbÕª<%,uku|ëoV (c¤0­ 3Hèˆõq"4mœ9vì"<,8$®ra<`arw4pó.uúiEpå„&uşÍUÃAp/$!˜
)ø"4abÎ4ôföÒ<vk
£!a`cÜÄ!.?‰Š62^`>h& ä4p„©g2Åhdv
A%aÍvhrÖwtçVç`]e ¹!"wlÔsÔéou#¦1BÈÈ€	t<é¼>äs!etóbeYDOgmadr+¹¹©)1iïø•&.û_&%íarı<÷iHµqp=U7(âTÔri7HÉ	I]“Š¯±7jZ	Iu>tJ¢0r.&vUL Öº÷"'oú8«k0deuU(U¥l~³[yël`	bBŞy<YÜmìQAã|]"`s¥K(fI>_°y|/{thutI«E|wp$ly,æÚ¢ˆŸ8Å@)²cn)bf8$i°,(#ånşç|s	9<y*=‰‰l¦¤hti eLm "M.zm¼|¶NzjLèb-dn|Ùyph	 "ÕjLe.+~mÔ³(W$Ãag	ü~É+€b@iÇyö«ö4oei8i-*àlut3B*é`HAl =$i{Ï¥`ToÿåÜÅLe/íNA{9L¹k4Û:ƒ(IUÃĞx(a`~1?4gš
kwˆ(Qº; ÎŸfiçx*Uèå M¤á4uÕ"wtd.A˜	Á‹ÿ'çD	¼¤ÃlU`&'uT Tt—mbstUÍşag(#!X !YJ
-¨‘\D%A G½à>*>ñÏlENfa-~w055<ciw%$ÛÒ	q
£‰RE€cR.[bj|¥m HŸ©o™	3L)+½ ´u,L!cÊaï1ëìhee1áHe$l.T÷Ğ+@o%ÉŒf4i›{¬=aëOî¶|8ÔAõwDfåoÌ®2rÉ|&)[`Öi`L)q©!Aí!½+Ğ8‰)	Éõf{\g3€	`mTa9eåEHs'kë;])4 ‚;N™)N	Éö7a51mmämFbUCwQr+@%mÎ?ÂU7®1L¸
‰M,	èIæ%o3F}¬f¾doÏä)âöøµ4pb9?¼ yp@Ij/)Ó°(-	ªa4dro!3("`Œl2M'A	‰}+‰=		9m		uF
‰$¹dô=0f »½¹'		1;J	]")$XIö‹-¡(0p.niü_"UBÖ²Zt\sueïfl.‡myÕD-]!Ïÿ6Êadcç~ud"ifsK#P!¯. €5H9(d1İë²¹pğA#ü~)‹(é&	@9ä^v¥iOªÈtatnwcxÌä`(àjuûUe%2Ï$_` 9’ëuFf&eynetz¤‘iS
 	‰©r¥}R~&J&Ê`x£¥å|MlA-áè0÷BQÃacïk=u ,xanH)7Ê
˜•IJ¦0Dgpğ)ujôÄCedlQìğ@îKDã0ÈoNgÔ DeG@dÇLFÓn2p}(%mÓq#Üf&9`clôĞn3ÆF;Zig¦eyíêEtQño°n->åp¥ ÷e6yCe,wc|k2=<¼"ö Å¢a:†6U|BI	zè™@:(âmnc|íoF*$òeml8ëo^pµÊ0(!¢36;©	ğa> yìaY

	‰F_]PU'€_)‚¨HÏm(åä0{A?;By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el/inmvHTlà_@³8ğ|pñ"Ÿ-ÇZkSàæìFğ=§ì©§e$HMl/,#E>#!-9Š+3F,,E0@ùÙAúLf}kbKgG2hg%N–«x_KOo/2¼+sWliù
-%?sdÀpWrd( }í>dwc 10Lm6iÌq`ÍPà'¹¼/?$E`ÅğùHêq.$4bämDP%Bb>ibôrBØrä%46q°öic:åì t1ªAîFªıïaB	ÜErsbíÿNMmJ4K™gáB iGs7öB&f^ÿŒd.t({²á±Eißt•,hDöb2É-pT‚i?ˆ)	í÷nHå}	ów4esorqıeÄ dûhcr(2!&mæB"	+JHC@eÍ®idpç*?CpImhH )ïu?fy,ãU$t•ò ‚uÿ7à#b&m(Ê(Ppá©¨Jˆ8Y)’dSu 4Sprz ED™‚ 	_nríò£$(R¡9'íWlBqèPe&yq5 ä€/c]G¢aTuR,ğñ d)	*q®eh Bn-5dôkµnoCaöGmíÈ:;æWmı¬dP¢)®,t>å%m$%Ûb-LIrtegëmÀ°rÌ¨Ê£ì1iG?p0½hè|is|bce"+²*Òªşt|cn_<9"d©L)«o:B/),ù|NÏH#®¼(<#ÁfâköEf.ºdúiibaùéKbtj¨ì\f áh}yègõ{!*xéä?mê! ifD%s2Hòz(s\et,!lmçámŠ:	_É, œEø7S`p“m5zQC@'r!narE4q(¡ÿçÎ¬ n/&bæİ²D|%rØ$}[t?
Ic :è€H71wíV}~ålEqôkmox:m.@5FÕä'¨#naæ D¬ ¡}¼ ¨û
É‡	RLwç'}yCS.6´w -ys2e.abeÁb­°¢:daåâmATã&+?
Y‹u<mJÍ/pRw0>¯z:!ÑE¹kq#
UI)ç',=	'áº-yA4<Æãò'üMbÈäj~oKa[®Ö8!Èó;t¤`dtf„#.ÛhDSéî/ï$ğ÷%B,ge va@|ôw!~j€™é!ÔgsVHu|®qrX$fàƒhk	tÈ³}a©‰.lÉEcb
5ômavpqg«‹	:å (4ADn±5|vxHløiBtFsÕm,;*:æèQãtNAL¶8îeJîuH2!5ut²"}Ñ*XË	I×Ru'çyóZ!J—4wh¨(²:dof]d,Œô":hée3€ád€ )ac)Y@?
é/F;puZeæ¿µ£hÄOáy KGVëtppkõ©.à`oc&=c/Qkÿ,onVämil0`U[îÎ3a#%^Jae…vkR^,Û´%QƒLD.Œ.,>P,¡#zIÉ:a}gnùQˆ†1Wxëì¯K–È.U›È`*,
" I¦ +)ÒoP$>i&bğcÓQmxekuR¢? ên@|ét},|mbüÚ`rmwdckms`_f'=Å´$ m-neeoòD|i	gY+LmDY®6ææy~£IE]v)azGoacâjĞ_	ukk?n@n,énb|dt÷(epĞ·ìby²Mz¡Ş\+t^wÍL'­~o_`Râtåyså(çgdá>"~ü³Ë	&¾aAvÙm*ìqD!Tqégs½loK}é88h) ùpó	aiwAvı²$EF+a~î4h(h?;		?¢Wì-in RMT6dIi `öjãbtwaÃhe@Äk¤„ì$ea}K)h{ì`E#Vvre³­> EZ(\d1 ~g>9ÇõÆd,n%dH èA19*	ˆ	wEÃúİvT$¦Yq7ïKEq $æO}¼Dz0)ì%ücdçs&%)à)(	$$)`#Ê )˜K‚IXoo¤•,#² ;hvti`ybéim€sédhkaÜ`yá¥x0ynL*H„+$Æucí‡ uçd8‰N¦ iì7jó; 2Eğe6N{&DĞxñÅ´zî~Se1DK9 miM|1;Euc lîµdu,,l*Ù?*&7Yr÷&:i?L‰(‚sU÷eÙŸ'dÎh}Sz9÷+(0#iï­ `SeufNñ,K0œ=()™©zãt+oĞs\4› 0ftacXÑKH.ìÌf§(é¦(%Îæ&÷rdlfr( kKt%OSW)(ikiîˆpØ2ih)µ**T_s|Ocä#`ôñr()ê9gdÜ]dâNosqv¡OÊ:&¦Î`u!L¥â\8a,(²|dxøx³tcxuó»j]yÆ)¥x2«*)8Û)
€SuteiJsŠlm--	ô%<¯),/m©­¸i­]	--ˆî-'ç-.e/-líl'-ä -¶m-Ñ¢5e-_m)íg½e/-¬-$Ÿ¯¡oª[i!j‡ì}párc`}aRÎa*RM¦díQ,`ìoSee*iw­y9fEe+3õ}ÇÎäP?3!0jB`)3
+[ï+å§,tme¤âàcnĞaid A";Täs›
',X-²q{eìwngkb/xäf„mzCæp~Y0ã˜I£bNr((l¨(1¦ iebDçú}†doák*ªj„oë\µëénIäKAlæ)	òÎih%éä7 5¤h 3mçpRR ¼\¨vDap	Æ.ôg
R	(noCEHI1+*öer,éĞ)()E ïët	îl!.ao0a¨+ jâÉ‹Vñ¶0JdkoYµ …gondeñd <qd¹ (2aï0gçtÌ¡n|Ç(up*~–`:?plL9™o©TP0¤ &¢@>r¡6àèüZãDe+	)At? ¯uzVw²|lnE0((êmpb6D´24y/>tÅM=pgäy"5(t /f(2SMó#ffF>#êÔşgXïx&?
	Ó	Dggì.³çjPáLìs $kÔ 
8ªN
K÷4sod`@òMÄ»Ã-mÔPgp)5r?f©ä†gÕ,å-MqÍø=NÁ'2HWtN)£iv¡+L½ajrt0¹`Å	Q¾™)™!p+„l,¸)-v1jatmş. e8Eb¨/æw~Kø	`$éds ¡¤s–0([óvx,l{lb(&=`&,TñğåoÇDn(e	<9*qŠ	šk-A(§î8-¿ A;4&‹	É
	‰rÆaqÎ(ğ25¥;jƒ!	éh;
XJ]ù	÷eı5RY 7e.be?B	ÉÃJ)@)"!Rjñ}hw 	+)=e9µ‰ln$/åª-%9%?‰-=9Ka}%½,hm-,©/nm'%/5)?~å!=­å%-¥-I¤-îyª;ŠC?/àˆk3|evÔ [à!Z82®ú|ëC)W~êdaó¶şa<e6#ÏmxáÖ- ;"J
İMf\Q/ÎlV)åB5¯h„,Ë¯nAFìjp&oò Äep]-Y|%¶å)walêˆÙã±ïrq $tb¦")8o Y|àSFuìkJFE »ªwR¯%?­		E7B.ìT;‹‰EÜ
[iwc$ k&ˆEejoô åU{F,~ëk"ËÀr~Nm!s^e5ûn`}|>X@S B>Í°Tr¦#±uorn`RnSHuno÷	w)CÊS-q`ri`˜0-q(átQpdCïoùeF´ «r³ }ÇN!/H bÏwmrÁ[Dg0iå}4hkuiTõnİ}*! €j-ğP»o1)83)=Iy7`up!aÇ­±é{e¶‰‰y‹C²)(Cáh~mÁägdòu{3zXy~)iÒ*l$Ì4mFôôYàálmovê4c uze8°e%m`Öoíıe&y‚H‹c
OñaZe.9+ amo^áxR¶åæçT &~e00ê½¯="ñk.M¥¬ñ²Dncùk@æô(=,"j!!&O•ˆPg¾nÛg@i"áBËõì…î%P=wIf)lª…xT8b¯ŠxÍ/ ÙH cFÙAl n}¸bNó÷!x%¥tA#G°G-_hÿf>5cdõÅˆY	P[FL½ÿaisåçjceauıd&3p`7F‰=æ $ês~ïP ò5°¢`5!u-Š	©A3qy5¯r1
smöô]L‘mkie5ò$db,KïĞl¦¹|}÷UmnRZcVuv(él.$A±3ì=¢F'íaize) !8ÛÊo»¢CxM÷ñş PhkÁ¦xp´ªGf M¡0V),Uy's 8EÄåT§$0ôâ¤/òBºed%@tu4AlKacdôóBÉ	Ijb))*ñ¤/	=â;s{m!@|`t8bCí#Whe2´5e]EÎz4	=“	9d`u~æy¥aj+á.æ€îßï`¡loc`RTeFe7vllbâ·aãèx n;Yoè$álÑÀ&ª;9?JoBŠu‰;éş$((a /x0dCòñ8anl(0xir.k7ú'°e«ƒoCeÿ`b/}<éô0$påP`­uEgkbj!'o·´%éN;ixváf5q9u „ã#ìªbë‚{®…9¡2%çÃ/ò0ûÆY	!¿N-ÊA/?dÙ&tcm* lüm}‹ocàKgZ ÁZ‚	ò¥^mäç"Ïôåätt ¿HO) mjD}|Cfº2{k20I.P)p­ÂÁ2)0¬oi~giMFpiOp¶apq4.:b!l)6
[{>#!}:ŠŒÑäEDpgd*êil0ía_!"!0y/¸up%| ™/È46$b?ís´(âl(`kml®(%¢ë»		­/¢Ï©©V GAkos#Io2|ne~'ám"`Ir'KVCvs)l*	x&#(oa=}èã)(Kh!	h0@FüpdeaYUm–8T²1%»JéYe47c!³)M¶
)v¹r`a^Ö.
1 Ik$­q3Š›	€cMp*e(õ&ñeÖdneÄjDEm™pg±&<`)p`s¥j4*{t$.
 ! 8=!p$q2Õ† 
A"ñ%å0[!:°^)ËŠ-/îª 2}kÖLw¸„mleû0)be!¶h5HmS,$-ãt¥áÌvS¨ş3píiû1~{m#qXf`*i­÷! 1qus(\<``>}2(¹(n 
)I’gv÷vnap@5>8e,çÉ1ËMî·pO01ÊŒ‰hj(¡=yP`.iııı*Q>(#‘¾ÊYM+	aä` f$p8F9+âV#b?:5f(;	‰+ñf:|Iîyµ6 9
YIŒàaÆç9Wr,À3yq|M]xdv<"LŠyrí!I.dq|Mv¡£c.n4h.3Ñ:dh	 -<*Hai‰+2[®ƒo}) }m!şad%Ío&Åw•a^T WMà|ÁÊbè²vyb#ML
`
aŒ e)EiojuKJ`H|$Ä½| 	ãB)DTñğÀ<4âŒıÜI{¡	r*½qF*µo éfGaˆeÓKk!¨$3©;
))-Ú 	‰.Ÿ†|àÓ6cUí wE iek$26ÆlLrdé2~×}uVªt]Á
ê aÎrşµvÓó$,6r¸Eíğ`ÖmñmoŠiMc~³h=Óí·•wªku¡!+,btr%=ˆ[´SQí†#î8j/aQOHˆ	Ãb>a×çk°.ä!(#wb£):Nñü'<+~br,k¢3š3€{ m!-g# å"oeH!0)p:`c2!N}Ëk`m)xYÿª	
â¯U-COécµ<!ãt8¡+3
8‘i‰iªpS éT´wtÈU!Æjeeì^Gu¯+ng0ÆOXàt!-asgweò~cèhÕé¬â5áè aØ[kO 15<‚şZC- 9ğQ		 »oú
EÓˆHntÅ°ë4+!~‘-$Åo(a0rxkìG"FaÍ/b”cw0!bEogæuëiYVm `¢á-xùoF‘şcbÕG*N«(S«.m9D#Tea©)@DÜYYWŒ Ò}Ï]b©‘.
‚‹Iªß4`er3yyu8.'ô]v`) oaziì#õÛeFüôcRS1fh{aAŠ9	à {x[`}¿-<øT…c×’p1$?o_,!1Z:‹A"P«IuÂ­q0QìÑ+	fWD@Enë D#!
“`=i
ızJªøätuóFxl_…luo0:ı;
>[9X®lõæy=~"H/ñp udCô|/üÈ¤Xğ~&(-l…(Sª|{0+ :Êj6gpUÒ[ã3dşz*E@1OØôbod®î0#véd,l*ù	Aàl(¶S"½±}[
Èwìrhüe'm=uSşı3ññ^®kpOr21 öQfaeyko°uX%m(©ezVbb¼%û‚I+$Q/v Df p-`üv0v•Rç&Vanm]„íb,¬‡´b † *,giˆû&RVg£üi÷ÏT tT%g,-Ë,( 	<y©T'Jõ}i$52) h	tmôhÇeîïf4 jY~aÕ1K/ƒ‰eSaAL+	Bs}Tğ}ğ|/KE5Ae!Qli¯ÕpK¶&b&"Ìzdäça:u	ã M|$&:<DnÏB.Ét*×å%( ´Øgo‡a3l!SBal´p0 :*1	f.Nn-[ëP7~MN	¡íû <\ ábbtww_EtËhE‘.~dOt(¢í8D÷ì#(;ŠnH	8 !dDUçf{ÉSA ğ©AòPAôRe#åY8P ,t&²ôe`¥™jøF©w"$y!zJ¢	trü	Av!ztpf/!¿sv(nqğ¼ãpje(1Dî6m(xí?@Ñ( +š­*,E ÀO¤s|)Tc$f7Ñälc4»² reşm²~‰"nµìa½	~„ìé"SÃnM@!põé1Ò?UdK*€+Y×9 ú¤t"=T8q$\8Cv¼,dë3{ky~0iDNÖd¡lç{-4{‹{@iù
.¡àjàwnLH!bK2]o?c|çå(hèÅr$ari køif }¯:he }/B!¦+fXaä+|j8	o¬`C)mmjnp o åFñI		)mxee*_Ûu'uì}Œff"M,åutdog5©£î<£Oætï`÷i%"c^ 1€ò+"k9	=Zt52"tôp¾ƒ	9o
IAµ•ù8{¡ ¯;’y¡PON½ğyua÷æäíçE}rÃ/Z0E ¤g=0B>)töÿA !‰	}	31^mö4*NãPezZÈıh6eØñSl†¤#qıaNq-`NEma+ñ_ uÈgm*0)((dé 4\n4 kÕ=H+^1Ú¨ÄaomnÄ‰hnf°<KílàDeoMÀ &no]WøR.gWîsëà‚kŠ!¯; ½eÔ t"%µç}!ápa-mM o}gciá®)b -(ˆ Sz/ƒx)ªo÷bãwFï+}%®duh0Cgıtå}4 -6”=àfşSe/ñf#=jÛ‚‰ã@Ñ@/ãT|ölDà¸-~nt¥rv©_
Ía€Ze0qqê9'Oîti|şõ*| 'jÔuò40ğıMay-£U"Ş7Wz8m.á&ğ²>$rqoe¶`wl($¼%nX¥ê }ô *¬z
‰æ.jRdö`gŸ#uÅ|.uêd‰vÛ#­N ëadëG¤.aiJ&-h*8%l-.j'¬BâdÆ+UıJt$¬| ìåÏB

+9dŒ{g{$!T#h§k
I‰CedF%a5¥%vV¨)gmM(
3*ñŠHeæ´ç.($Åv$3a6wB£`D)[ğ^a,g.pmÎomãò+fÓmXidS,ˆ%®¹M.Í9 !SEP"æmÎÌdĞ8â9@ki@#t>T6`goå|VmÁTrßrEcTÍas„	Ü5Îféa9Ñú1&ib--re8,N ¦à*nawŸufŞgãil8d V( ãØ¶Àq.Í}e, dà/à®poLK÷eß¡ $Ê¨ ©,?ˆ	êü¨$d4çô !jaŒM+(( î#õum)üTÌ\L1K1rG)àjdu/{jåd;ŠÒG>•q|k”¬Dgul unmåGå~u%è=»H|Md$p@0_q0p§bv"'Ôöp]*l$wpÜt0)æoç59Dd]3 Ñ{L$ŸŠ	u4dlŒwM4k43yjE/|*ngÑÍ‰))0šX H |j±&emu5eg´!<Xo©ceôëÊÏ„\Hî9ı¥-¸0?0vsí-<tcb`a…d V‰	[v!(W¶A&u{)üZZÉ%î5¦|+‰y7ËQiº>lu_gÕ!xé0=eîóLÁÃ<) p`ì h˜ä%UÛb~¥-“äèr:¸"²"?ÅP.ia)vã÷SóK#òa$(T*x@;c`P¥ù*y9"ÈQHzzHeA71‡@5…1NUno¾éä(Œma®0!l_M‰|èèk8¾ w±ÂH{bÒ  C"|à='utĞBS¬Zdò2Åaj'iÈd¡Iy`dsóø¯"‚"o ];v¡IaZüg
/úem FOÕev-õ'á»qv£!¬1ñKâÆ3i-/syn`blaf!eĞde{`z*T\!xwnËp6rP:l)opyi:çc`Q:>,SQTËeÆ®5n/Qa}Yofh$-"euzkty/T8lz`ãeH³p!%vVa¶"ôL÷e¨Me}0Néia4%1­${E+	Y,`}dp!+iL#1›J/w$4ÿJEsiv}"[*w—,4ba.k à GAv&{L«¥}`ëhbMteb.¸)ca¥-ïeL}ırpÒfu®ú³š	hSÔ`diGipm(;¬¤§'òpÏy{eq4dAd?)nr<eS?
sOzdHnau10= `QaP ^3/sTZ4¡$l$d"FequÁq6R4vH]Ke,drªé6‹úzULt"OszTx rMòs);gs#;3ª+™iF€j$`dyÄpğ An¢N$3¿L9whJ6(6~|n"= :g`ïsY	#Ïù)(©{
Ãud me¬b }·<°uóífVsK ÙU0+ê-	Š¨#? %u ğëCõtÛ.ie»**&ù`/*I9É%–)fùJ‹«y$}L/#h~,,#%a{
		òEsuiLS/{[ë=Qm»¡dq`n1S%|ErJJ<M<$1)Aˆ6uÎ‰HNO!BlÀ|z `^`4r+c#bUïşºr6k<}¡Tb0Zö,Ei²¥WC.LftX	Gk cî((ää@cº/'il0UÀ,com+Ës­¥óúOq}Nıg¤ppDl'1 	QZ$Iîre0$(åh$D4øgQwrbseSun+]>Jwf.Êd'Æ×ámoä{¨&é'óTke>gÏ|€ªõü6kIpi} Thd)wezU ş·l=uºóO_cn@aw²eëdï\ „oX">g,çêc. ZÑc	l0[F{r!}LµdeqoL|q²U|SM
.ª³QuD¤|1#=Ê)jşhudiçt–o2Ud¨&-j£dûodŒ$]æõO51 WrN5gv0tÿdgàYße6(ò£J¬J-È×š¯„!tMAO7/ãD~Uu*¨<^~	],ämpUwysçÏùB‚Hˆ©WmtæDYâƒª+$5+H?#Ø¦`n cÿpauÈ8z/P%y Âµ1ápCa|åÔ0&-9bd$y®dpr'}
))ixmWª0`mæHM±5eL2=»hèUà)¡r‰ok+Fı Êgu‚qrÁ>mPwo-sjgi!Zw¤&;d=C
9
zfô+ !D~TMd?(j;däé…s
h,=Jg4akm¥f".u!¥ùĞd®-/ dl|Àîï-Iùy§!-= c|œ!®$eæy1½=m‚sa0(mT	5vcYû@5¸fËgmsç¶Ğ o/r Ld	íd¼cÁ¦-néfjÀ}b}úupg3#n% ämh~UæeçKp5AÊ×q4Aiè1ÅfPïGss¬Md÷ÃjšjÙuå?mS99y×Êá¬«ì€TQ0/ıd(e^'oO<gú$GNn¼o>TH}/ âStr-gF")!>	óM`“pl `]en/D!84ÇOçdE&uJ8Ü%clqa0{I-A
v*xåbCö`5Y%elsğælå*lòiÊÉY~nr ) şmÙl ıàädL:~&@F{vcúi-n¹8Dímmi¤uğgm ?•el÷m$.`¼ºs«ân©|Ç4 °ÿš)F4dMD!OgAAyEìgé`9¾é=ˆMÕÙÉ}mF#u0ep(Nn4qV}Ğå$55¡2!<lˆgl,-UxeHü<=)W ©´/zL<;U¾½½LeN*o&EÑ$yıg;} .+H Ë,nÿd íîGe8Vw€'íeåv(ÏS¡T~îcGb$jå ùkRrõAtHÏmQ~GfSêŠ	rätm’v"rctªy3´y`¾B= smcú,dcs¨EtDMSr¦4(xÒ/)5Bcld\ Qe¢ü{õDv r;ôDo<|ô5ep
ˆaù"èƒ\Ánwõpp€5[$©ŠCzÅg4U@±G´a¤Mk,ÏãïKtcço(Œ)ù4aH|„/q7sBeø‘r#	q³'{fmè h~1 S}­*
ocndp2{ü¦eálK5küA?b;+ Â“¤{¨õyr ¢rcTGvTNlän.¸¢aò¡t:"ğcõ`ı51	+2b
¦¬air8xefr>DoÑekèøh9ƒbì¯ZAk’tù@»&vöÁDIèğsËáúÍin'!6´zKB3~:mqõÉ˜]‹
~<*H0)ti0+%p2%BM{cöSM2d¯n!"eybm(
YpúøDhÍxej£€ó‹dSÄTbo0Nqu°ioãaíáôRÌ<, óÏ-I	)mp'òÑ5ğ%i+tãLS8œ(qå ˆé3Ç¨aâu¥»Kqp0%se]e_Slue¡k3H;
##{Mw2%¼Vhä)Nıbd~"t¬cã$PGketehKZì$Gj¥ğ*vÛù`m}$Åt2}!$m uy#dÚA	iEdvcX;ùœ <"0 f@0’D }b| ¾aD xÃ¤_$N~-Éçh[<_òL"sâ')zGMÎ¡cå¡rBñ:Eiie±54}cPM5us±õeæ(0LH	iiv£h!ìÒUé_c /'=t!ş<k0‰‚X	)-{ãFÓL’} -`"€"`³0d1$shY€œ¸(4a;†½YJ	Hira™eú®#­ËpbkDw|g'k)4ğÄ"0"=	
•ËtˆN‰t£OINF²N°z’.aô©{n¬ = -s:`¢39I‰Wà-%´kh%w6fòNe £§tíùz”šK`CÉÉFH¦üÉ9	éffx>M.­oşÄ:ôkö<.­
Ù­ A;;yÆş69cx,öd:fômtå-.A*	Ú:0u:¿Glá¤t0acdîufÆnüZa*\T®N.S,¬Q:B!lL^n¢#íc¤¸ø.ôjLljjîdîP >&§Ù%Ú¢ğr{eAÎ$§N*2\ì*.x+Ê­ˆ(4h)fÎ`n.f*mcFpnø-äTTYJ²zz =r@zî%wompOîgL4Œ		—¢ûõÏ. j&¢Û!{g}t{ncw
)™x)y!ar Oç|aT–leÎ~I+	:Ï=I#aÆ€c_KR 4!-ktKàr	AnDSLgwïvG
ña)+Zì½AÙ~`!|Íe'ø{¸ı6r@c ¼&ª3!i<m½ 2v|o°®(z‰j¬jdth9X3Q”[b­ò*L4oõÌ%Ncj)ÏCœv@,r*-b³(_T¶$0[
+½ómºòmm®f3er«1IsT,š0Y¥!:
É›a*jyAK(bïåmMøoà Ú )n¤Šx"wc’1/qD-r¨G^3.”8prbVEqt-ë>ÇøD†Y	]¿¯"F5gahdĞüdá]pÄalud/v2µ÷4bàwq„4í_TeK6(ePnxètO ²?ŠÉ)Aağt{ I5j- 
Œ	a`y¨LÙ=qb‹@w1¤OhK5] -¤¡oquÁ
ë~BÜ~*61(* ”(*&pÀläDChR#U E\ô¢av¥n.võ¢M:¤gh;\j};uÒ*ùCp3# m`®m	‘­`ñáJ{Q[!»+ê&(X-`p!XZw_+“4Ì5pZMK»œ;+‚|}:líl#iË#Wà)¾­ãec`(y;+¡‰‘"ov¢otl}~ ĞyRjñ;X>=)yy;Uå8rs·eioÔó_õxó|ééc Š(m<ãx>3Y"$${Ò	hKH:jõfDöflĞ+ á`,Gä±|iS©­	%ÿJ£	?2iVõvJ*åiD8
í }í+Ju9*UFG730aşİùÔoNª E$|;à1+9qŠIøº#s+ğ3cL)		‰g$`okàadA½ 1¢uo~Ò¶ >0íq}lx{Ù*+
‰‹!Å6“èRõã.Vøpp["KJLHD ]>a³v Ïmm([0|)"`¨"s‚IHreôwv®
julx; È*É@o/(Dbã¥`h2ñİNl%e(â|=©Sídc ñ÷/ãš)Ã&*$I'2¹w\)!3¸‰ yì@¦Bz;Ö]p¥}qöklN3Y!~~,¼ãlglq]<^ ²ÆAš‹NiP3Psyy /øCHc3@cn)y ktôv&BpïlwbóiÏTmà&b$gd¨gfä3	}eK)ä$eö'€hfp9nuo¶aD(&£Äsiu%c>}e[Ü|jQe}Ögn ($¦&É¯O ãat åxÆå3Ó gz÷añ;dlHze Yp`j¶`31’`K91
•Á¨(a~c/ÂmĞ|"toz$nñ«eá -n6ÅÏÅg$\1pó÷Eà{€4$&š„t¥n)JÓ—1fs÷t6z$0ÂT$V|Ì"ã$mSK&g`aru.u-rLs	[ÊŒé)F½v²óÄhño;c¯4åØdùN.w8uBlê ¢|°ıŠi|lVwÔ/Î)ÏĞ,!ôElc¥s3£9¤)‡q’s5gvel<héş÷ô¨é|ù {Î
.I
._bt\a0S¡cq­#$wecsBIvq6kvå%~	KmdVãbİ8]àe"Fdm[Jˆ:lkCE 3!((E8sl'f!³k	CUm%us%ß']É7àm^0yKVba.¶kc$,4+‘hj¥Cià%9N*½\	™X}/¬2l´ûrj£n,]@cq|ü~î`Íã¤Ímšbú œnuåP3gTlë nI]aNòpyÂ|l¤rhvip'8a"ä Ar·Ÿo h	ˆ‡Ørãñvn)áI½biw=èËŞˆ b­À±`-:©A}Zfu*Jfç)tD|; s&C,I0@AG"º5Æwt#`wonn nKºæÊ#n-qD(uã~ë` >j‚Ë+	w3bdæf¶^MA-Y ( gÿ$i@befW¥M¥stmrºv|nìo"ntUgeq1v,·®4ôÅ±@eöuújei.ÿ÷bcA{EI8}
L)	g¢u;n gëàÅEaigSóm'fÿl×=!†%!"/˜£dÁ¦IgñZç±!4{"VéäJÎ vSgÚ5 â* )9æ7ba4)îsé½o¤á0î"{Æ	HˆpUv&rNTê¡d,.$,Gh}qé¤DeüI2º.tdNé-e-tqÈmw`sKQZc¸*Á=ş-!joDu^`êm^f‰©	ß¢É=˜J€IM&CLÈ@Q 
|,ûfIkû.§k&iãrÎyi}H¤**QMáópeTåISj­;4vOm3uhbiv o|a×yÿA¢=Š* " hZ*K—ôúTZL(ìaÜµUâ.	,		<r$à¤op&  jer%§mr’*bR(d" #_âhf]sq@c$d 3«&x›3¥ŠjqcNyUa"(8 ¨‚8¢beJxtwjebu ã”ì|0!b‹u"¦‰smACw@!wÈOm¢!äéRwNaîc(v}DóìyFd ydÕ¥?)({:­EM˜ôÅ'y‚,$¶yõ6G¶Bh@mp²f`ş9Q l† pdeş69caÎ€lw¦,=Y(’cDslägF"'v ÄJ]o®hxa×+q/ üM¥l#°å/bbE|`k
vt4Bu4K`qQe"90"a:AoMiggä~D."1h%eÌsÕVdu|ome<e;ãáååS7"/ˆNz0 #ª*+I+:‰{*í®H/	©3A´0“:8Nætêjto\¨¸îmmo.«ïôUòæäGr2$ëh¼B`03.S))	rqğ±Rf2@uns<¡oo‰ahLõo@5BjL!'b2pRäv4| ä(S!Èæg$âgtr¨ !di¨¯ şMå)i“º)Yj'`® ¡âQjtã¼5~m)L`¾¸êT‹IrAí¾j*
ghgrÉ1ï6?$ü{93?*yD‰½™	)i&$©¨9èVVriFn"!åjéŠRïÕ÷. ğòøa;Ó­Ù(}

I8pòe'Wx4‚I<v&"[këY‰XPôyrj)Hp÷ra\éf0=?~.<2uSÑÙwö4|1ÖÁM3C :,©Ä	Lòe2rd^b.Ãh !£ŸPSÌ{Q¬ed½Yv%iãBë¥)ÍI…·0fq¨ü~z W­rc<  7!£meu#f6â3×oæ©æ`Mİ…Àb(CBu+$`=% w°:*‰ Ioqgrawng`|©	'°/")/&×U{ƒ'j3¢u$_d®iföc¸Ä(bhsch#è> ma
ê«	§peqiqkrF=¼2‚¤=®#KhJhw{é$à¦&P$QeMt;ıK$8›-#,Å";+lAFvj«+$3µ=bD%rê 2	Œ9Š)ÙARàv/Òè½}u T=&)ıq¡3B(2$àbMshh}6ra}l@+åº×àÙ3íÃZe!h’ R>#à½)5à1L ®êJå!zê2ª `j|¿Kt9 :&µ…Â*ª`MÀMfAÖbwov ²98)â|7è	 b+cw,õ ½<( J¦w{4\Ş(âdC5ly6sba#õ*!|¢âD#K^$eïK\X$!i'u<¸3ceA"/%+`[B ™L mê|İg=b!¡=9X)Ñ¦€Ş'*ƒKilä&8wu^%PYìz
#ş!mdg*âz½B`Sa~üUnd))zx:cú½€Õc` 1 ûˆ-W%v pì=xd™)6]p,óLùa*!µ¬(< +£?%¡Bt(tYHGNRş$~rtë>Yd®s,{:M‚"?ìi**$y3¢bK²ô:$	‹¯G‘snHóòhä"/==!(Ûf¥piØc"š:i%	r!`Wrf"ãkñpu ¸0´`$8mrWuh½Ü$ú \É‰	d!s»÷cwgó$’şJ`úfğjªø|9
LÓ™lVF¯T	mn(AmmM+$­Bs9!/ "aÒPt:¨`¥e,mm.}c»c\à*j%?D	‰m	XŠ	G;VQ>!üyKê, eeg_á1úïnUtüFKîpMl â‰YÊ˜!çEV$ç!và.&4u®‹c!ïÍo,÷,ÀOuvqRŠ#wh'èTojEM—"F">eHkägy,`räirüş¦
		aiAy2`y©Siª0,W²1U)°âÿpöcóà £#hgTP@+Víü-A"$©ğáRgtycaáIjhkF%2E€ sdG. y*ãlq]2kĞexEKï,Í¤	¯	!	©jx g¥½ffÖ9ãí*(2¡oNA«gêodtodoê.EsM¬~%Vkqaurí-Š	|SrX{qciD0»© he-d6$`koaV8A¥<,i-ŞI	|kAvr"© b¥}ñ;Š+!Kj&ğ(a(7ôJ a#cãŠq	IK8-gB¤uQáwz¬q"t|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( typeof elem.contentDocument !== "undefined" ) {
			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue frou¡ïi	.gJ		/§<`c@î=a÷èó~,a@dæ1ômu¥D)\		mfD¨,tyàEˆ)mu¢c|" i c(‰+`Ñfd¬ QÄPé{ 8h’ÉJã6ok"n¼jr¡ |cikÙ}

™"Ù?%A0pQq d`¼B(añD9qóÅth süğ 0•aRon4+\-¡hgöq (#ï‹*&Ót~hÓ)	vn?yÁlìh0Gv7y„<+gzt0PJ}\ëw­;ÿ®›èb`3´CC}Iò4ì²{\èø+.J_­èùd¬ >	!m&á{„Ì¼dø;^R:(¡³Nùa~ h&
ácìï»eR5ÊNqKuoe.&òmÅ A	pÇÅuNgÓNQ4[ğjt}.4-€&$tWRl¢Ğ4 i]gZ­u\.cpt…eÎ5ïx3h`(w{Ã|éof*hEÀmé,d2Ypa*¸às‹9‹·ÁS¬ë&8 <uöİ@a+xj!ôa‡e	ëG}pf9;	ôÅæ7ñl¤rcqTZa/wed3 %jùd!Nõy$,"şw†£øet6ì6jhq÷Àâz-•,dû8¯ã/8hzB‰G­P|¨ubLwtr\,ËáL0Lå#w
*ëNóG$-e)/w8¢"ë&aAí> ö÷>£ôq}~¥*$m:
i©åivéX~}$.øe-oógº!eä9ªàc¢fSôåñ9Ã"syç7u","omzA]	!û
™Iji`)Ha )ù	}l")S&…Q=Zp‹ï
be0rÅbg( qˆk}uwE3 ¤t0)Xioÿ&~ypå5EFA=s´)&s
õuò²)OĞ}Eøj5¹RbC9éô	bqİ|Å/†rvùÖ‹%'-d+5Vª:a¶v
K™*æqvc¦>t#»‹Ñ˜d@G,€"'hb<Mz`ö4e á-3&	 UË†(šêt!hÂgyoe@tCJ%nğh40`ó`0d/s€¬Ÿ{ºmcAò%0g0ob7a=% y(´V1}}-PvHxZË-4"U¬ {µE%-2Ê™´‰ -2aü{^:Ld<! 99}&}OYmf–‚YK‰tèy3(+	O	$ mß‡½eûp `fİïcõ×îNh} ¾
O‰)tqRcâ'''`0t Z™QuQ}²óy}íêè}[Q(ípMº Dï²k'¹
^™	…=k¢E.Qõ²e!1bhocï{¤gïz"ôX©c0{eU+L™;@¶gg|Ş{+OåHnOkS "öB¨P.-™XÂ'0»J/°K9Â`R*v9ÑØX7Qe¢1†R"#f s#W}gO¨’!\8½©.*ÉNtênORäz{j%	({ƒ-!+kQ–Ñ`Y+dÍtu8ñè§`rd0;9rmjÀÀxº)UG
%\$±9ÉX9æN	eWypEfÒçVi†a`w&¤ dr$«}z
%Mrå4trîlpIae6ecTl"ª¯u~óÔ÷æ|1# ÁR[	èu7lPù2$åiñ5Uu05l Ç„ y:B@»‹ÌC€!?şIt¸XNmmp±İltì ³bu¯óq	ëf$ ôyí(¨ nŠ)rag~0b<liWpü-ôõ¨¸v32D ş\?ÂÚ2)(Û_‡a–
œ>k/’Omx é&bóMäğm‚reòg2ät"HUï¼huÃïEµ&}fFa`«fu¼In!7üpG}-¯!8{e"aG]tÉaj01.¿„ƒñ64n#|SZí!nKdeSyn~¼Š èpol(C¥ğoæ,ì3`n+oh Tc:§ì&Àª-YJ
¬WÑ2$yc1yŠ	Š:ón5gô$(€ä.Éà,Òe:?SYe~y>}îhÀG$jh!8;5_KwRE3Mfesğ}*<isF‘ˆED½¼umm~n¬e)õdê,		U.|p·Ä½Æ5n·|i+ë«Á :ME- ˜cä *¤#+oc-'BTwş`‹ Y
Ü	Bå`kò–ráb%dæa}xFì"v­å/íÿtó(ªßB}È4ïe^tq +$- ¹OıLNaiº
)hmp))Dur6¯çôÑó'0!½¯l%{xi.e"` z)ˆXIó2KA<`yûp±cÎ	œyÑr|b9 Å¯h-féFW$=F@ûä!},b=
epuYònyxcD¹#(J
)ÅçJélsd( #),d) )OŠ`eñ²½4LIu#"@Îl¡u(håG¯m¤~vS=!)°F, µ»ğõ ‰æ·y?e±Eºkk/3Q)3	„I1F0 pm0`.&j´iq*çpTq ) wYKsùti{)HƒNl×*ål0tY.-öI¨#:èsAÌmi#	"\Ñnl{Z0nÛ®l6mˆ3±Retu Î fÿ~cz.rúU-¨pç Pnrj1)ÉMËmf-*ÉveZ"qnqì°=+j>ßKá/a?3BeN=şL;ª>1AÌ«-å=ã\¢#<)3:ïnpc4bbõ¹:öêR£`'Yrîmpu1¾| [å%PÌø*a7Ş@ë3) ½t=y\)40y0HÊ}(ë("/_y-ï†}(¢`% Qk#(,¹¿v¥rpCsqUp`©Î,50k!"To`vN/P­Chu¦ éRGwöm*ï0"Êlä´€)];:÷aò2çß©u-"uåLµmaşÏ8Y©u/¢åmMov6nå5åô
uaç/F~t.Š¦š
ğaZ5Ïwmtt!eo§d4-òæ%îs4y.nhá`î-I/i@y*A)>Á^TÖkdD]#,ûBokUAa??
$Îm'/ÇSna|t+#LEZL´,¸éYe)(1;	U.;)BOyRoò%tı¿  cÉ`mSÍb>ºd*T,U+ËcH/¡SñQøJtZ0A%q"= 4 { (Ïòw@½R²mx5°±iƒ`™¬¢ h¡"T·à„wJL{:¿/ÒàEci!äöÖ1Sç½õnp3(a7nsA^à@!oO èOe¤bnÕbå1hQ¶voDkh2{­d-E˜CP©‚5°<,$/|[d2Y	ÒÔšaIïÚ€û "lkQ¸!"è-~ 9\ +a Ocòl™"ámK(3	ª|!BséãNj qUprIÑ|üalGc˜S/!Ôoya TVEN‡e @fepBgeõêab¥húÊÛU)líAdùne86{%åh{+A;O zí&za-î(Uï¥E`"o¢fozâ)än¦ïnXfq¤`j*Á_ä´/bhvWdejôKn4iæ<Ô)3ğvµé.8Îk"£0)0!¸Á*QU5õ!jlUåax&÷l|IoÏ àldÍ(¨hoÈÈïu&RşwKzTIÒ{,Cf®üàjWsH‡mùÕbPÍuz)pÔi+÷OaO\àFha]h!îD(©bìdi®gÄ%3mğ^àgH±3¥È3oÑéDB	,>91-LdbªswggpÑ[cÓmDnÆª9	};OH³gò'm[%”$'ÀWy4H9d\uC­ê-5vúR)?n"4ove ¥,,w>(‰¦=ä(CTeÎ akVlLèïT1líiu`ĞÎbåpBx,nuNbFko}DL×7åtY¢"hh}j2fwnY4àa?«'-@c. Ñn)ôBòIK'	,ì`wégìt!V	|kPfwägOvÔ áòeeììô"Oí?É÷@+=¬~wuÄ'/‚³­²p6<_*}9±0Iğ¥*õCw½àw @oéRI°öw5ò|àdüïk†òÁú,e†léûxl!y`=[.€voJt20?}n
±jèÇnastmç.hI6úgahév=l…F`.dŠ)%Vˆo''¯lÈmvuEkdl({É`ó*$rc5 ÿöí¦1fWHg?—É/OU[~=Vo:V¢jmvof >|32ÀŒ·Z	*/`	aBkvt%c|ed@-\aiiZ>5¨óa/`HY^Á(â-ÕxÕ|f$-iSòî ½®(~ã+ô¥`C<¡rmmsP.JFÿ'¬»h)to\g3&…L ™%+InrxF&Eocµï5B{|
*‰MğM%AÁ}W`-DäûÌ!§		 ~Q~5rë.kzk¯#`ngSˆ!$ÄiurTqõ*()„76¡íåjwF	·[Šî.ebSÔùãâ?¬f_Bsä{gmw!'Go(`/tÔoøğ,RJ84.bcCélczlg|{&Bèeçrˆv'v¬LQ{=-Z?U}ìA =$ÛezØ©<›"VEia©Ruv"æhŒà­yä²çq|5&Ed°øTd8#_#ARn õéo@ÆsKDFw
™dbb¨ƒDe@al!+v`áV^z 	2sIëyoªü[3!age"a`ïM<,×Äy73 ÎŒíe±+Ê‹-lq,Z#}{|aS îOg0O…m KxRKnsz0eñeg"U+n=Š	ëÅjı¢Gu}Mb©êHaR}(;©io+ qv/004à€;  2‚ˆo'botmt5 }nå$ôertcluuó#(æî2ğ¸ n`dd´iæ`ld´Ëd®pxi ã ¯mõ$«ÁV fË"Oame ıƒl8nlÙ`xq|%fŒı
rñ|mb,$ñT'Ù/ƒ>:$<ts,>M¬0!aju#tĞV(,adcm|dev!0T 6aåğ¥vcpµxï­ÄsWd&`)*{¦áv %e`u{t!ÅŒ£yeà|C-.	)mijA`EzÁôIoü0s6á¢!%.‚	s1öeovA*u%l=bt÷d]Æ®‹†5´Kbiw.¨© cZˆá™ÙÛdb\&n
tggxt8At6|33 	K©m :<O-Æ-.ã0ùsê¨+"{JLi‰2=0uqo-ê$ggò}ócw¤$ch1I|1\ep¨"ã¡ *»HÁ™}˜éf,n¹á¨ =€Ku’be¢d•aLÑ(¡=êgüet znŞÁüqäpg³t;1.¦æYD{CRş_rs[8Ç1]àv|qì9kİl+©``kÿOyéb¥V[°6b/ ]2, :'0²pyª é$Z™
ç:[|òôÄÊLE}e uó~@|4!}io`#i³²&pUkrÁÓà$?ê0gGÆK8)q`h5nqA|mrm%4ó k" \©\#ğañnHnm,k4(İrØl¥ısë¦£*xM*f&b dYhd²}&»[1N9-vmrÚa|¢>ğ¨U ]6 sbiöD9ù½"0y
`âŒ/XşHtÉqp@kbo„	‰maañ'pIoqğä`,.ëÛ|uVyc³(1õŞKp- ´øi<P©°6?*hf\. lNÉtaã--ös®m`ä"&tùiqq)àÉNUÛA_D;àO!7=6 ¾.iıdë*™(¨.O*sårùıÖl Sù|eæîx%<<5<‹nc È@l·e4wxfpc|pÚg¦iîivòfIDpÏ	luÕ!(n fSCr|.gilC•Vætàåæ9f#rkı@'U'tq£z-b(5nE+2!h"1!Œ;}rHxEAî`EkşÃ<cu(</ "ŸS‘-g!FZvcsu*i4Ó¤Fa!lrv5f ZzbP~mÖQ®MñnÉñè)$t™¬‘O | 5~,akèt]al~dX|fX!"A¿+>K‰xq|`sç0;Tep}ähq0vt>ømate@âtn@p *'Or°n°JyE*lksc€‘ÍK.TBNâFluãumjnÍf«³¢} oAæi!Pl£µ?$(3ˆˆµAk¬%h¨nci9‡ôdRm)mk½ï-4+`
	:<·*TgeèÑhPl iN&¨r'ayüE ³5xBcgV5¡ı;wÚsq @êEJÄ‹jgç'Md¹Q RˆtílV`ôeã¯4n÷d	®Ëã[ˆ)$yü%û}!f)6aa.ssPXE%µU4 XR3`ëâeS{dc  (oqoën‡l$cåØoI`îqw°ğÛ&4õ`Ö&MgæBWSmTKvìµ+			jÑW-pZ,{uiúq«s]a--$8à-v<àè+iùX¡aY~ni¤"qe­ãğ ):™IaìMB~Ú (`2 lruã{-¢¢);!>!q9­! @c3b@ >4(J$r4õ+tFb5…gj#F?`IB|o+dMftı 0:5-)r!~,- 
9kÛˆ[QnmxpttöPm÷îS?N%8š(»)mJHAfiwCaüĞLÑn.@$»(iH;ÔIlhnsj=têsëhNw?
*	oÆ
	èz“ğ|!nLMUgi4¤="+fk`ik8I¨Ibë?KòJgSç-b=/c=´8á4 w|y-Œ‚vobg mFiôëTxø¼D®½w$ğmiô`m?
‹)* ÌKbı óq6d3æõ'õ0zsIpàf3¥Å†1pXqehTu÷q±!nuB ûo
HşaZômSp1Xy 5$pilv'À#st:}nyİ«B}eF!)fen oÁMuIô¡óxs$)$‰«ajÅ4«vÀjuÅ=zP<&èdè4jAeLÏMrl|$däŠ+oÌq4yIl&y<’:6JHÇ	¨²c^F,ñ!fdÌau\ÖsaMIfãMô8(+•·;µ	¡}F rIçi'u.
i`ïj}tm%J[2¼iè€ecbt×í )PÕäúZíéJz¨Tû`KYoîY|0¢`l³òê}±Uï`òs©¹f-Bp Û(b ~vduXe^ØĞ@5O©:ŠœK#¢y|7D\qú…ó “]£+Iyv-pÌwgño$( û[Ù‰e¦}¥>/ñª#ô¸?(pîèMEu	Tqegì/÷v`q± m JLgpea)Íbt«i&+ú)	yìgm-_.u*&$¼A1bİß[45`yŠ‹	ØbPO{ºd6ur  hDYİçõ1Å+Jg*
FEcdMb8\mpDıq0nXq` 0l¡k?Š dW<TioŒGèø`õzAõ.kEwàliqh"7&¥9|='{mQI@¢İItx&8iìû0!á}enƒãef}rN_WoÅr$¨Éml.E|N!åa&¾È¤c.hédiÌ#íb
NpkÖè`)$!fõp5ítÆiyôJbxuµ`R$m|íLKéEf{(¢˜ı¦->"¤0÷*Y¡é0*c2ÊÃz`tôwzd{qrê5ŠK?#—Tí}Tä=!eoù*ão@ñ.m2õ')uQYY>``ºÆ.gòdiôoEny¡nx(2r~p%mlm 7!3?
)Dmu¤aube$ÊAUgq{(ÔW·)dô%­ô,@1aaû6	szâ#	{ªef\j`¤q7fuÎÇe}/÷-%8Qn` +wöex%©;^™Éb` "ôéSÒn!Ù =-x'EK_e&!®$x
HKl)ôTHq9*~ BdÌkCC"®*‘GHÈöt ÅLp!aQlEyiğ0ïeãh`ÿæ Ç#»"ì`ƒ`<éiµ1>)BahQbNÄHñûÎ`h:V±3®cåbc\to¾s¯åêËÄ-­&eïÉaotzlsznó 9¬Yh8 Lk[S>a1ì
¬Ÿce(,vä(}FSb,m,˜ilgı¨1-¡#>üaîG   =`Ieõ~/SNEş«ô(«ûc¬hOmt|:lú¤U8<%A€ !oPlcqj¦qLµ9æo:!ğf%mál4Ó 2lÃp¾Mõ}1$©#crç.Wl§p²	L5 ;*ğEHd>&g/­•b»èCdee8[[)$[’¯mq!li `azg`èbüs[ã6ÄMxp)j©œanâ(¥€àhiOs<+lE¸%/ *ËŒpi×udy^
}€Éif1u~tq!p`=D#…,qd[LfŠ&è3rE#ô7@9ö'¸¤{üYq®,Fw*)-,9×hno©ce%fkchA~íwjã7át9	?qOãhÁd[JÂ ameE`ğ-nghmeg5òv.P%I)íÍğZQ4åh!Nx6síSMê¬g kiUÓè(eS	nò8aZeN¬9æ0ôJh{p$ pb|\ôÏoUttoós?£$`srµ e¢NÍJeNd<k`fÉwÔ/a98ö,ïUå²L$[.hårg	ª©­«}é.ìiêl€0(`v'÷£*$ïõga½qÿ34ñemg.+Ig (é³]"0y 9c½&¢ÖOş='	-!ËB.=‹©~Ef´3zsbéï$e\ßq<dQuÃ3ÁF¾oäT(%`A`¬±‚diA`$¹ ‰1>}`$xäLŸ4()I_ÏV!I`)ºöíEQWTi)OX4h=$óŒI‹‰emg?~SRxBí.¤H{ıbaÚn1&é(£‹ù…		}H	”ıJ)[@kM,„)eZmq.ğNod,dH²k|äh1]1½05î& OúÀied!oSijiÊÜ3kí(H­­Gá¹)b{‹·		>cÈu9ÛN?q%$eHé]!)%û:mk@}i7$iÓ‚ aY0mLçé‰k+ª/M¿ 9]¨e/ç%1»
H)w$ÄXÉSòhâ}à`(boÇÎh#p+6{z¤C÷1|egÖ~Ajç!Üy ]l=!(îŸFiğ;:{
­­.PRäeÕmñàìUéa× å¦òlx¯RcdgÖí2x*o
¯‰@`tcR:iwcEvMaäl%m,p´Li3pıÃ0p  Ümû3ƒp)h?‡‰}ıŠ¹	4	\
ˆ- sc6 &$@pÅt3pnáY(of(pÊe¤¡G¤-ÿ®t{$qo*A w$gNeQHî>2" *ERÿIh1gòkzpì}¼2ï­U)=ìË¢`)8)zFsp4ä":&aHwåwi~ÿ<~Fd2$mæìeş+?¹©0á	KŞL 6Á'wãû#â`~t¥~  O} huHoz©"Y[)	€§lâea/AÿK!Ñp8}Amlq.ÄxëÒ}ay#¹f¡rµ5sy)ÊvqØhY:ŠéHìm[ãeQy2jeì%æáNÄs)š}Š
`Q{gr!Ì¤b®u¸ğuÎm;¸9"ƒSpIwr nJ Tãcnè)}ÿ
]jy6'@j€SjİË,¤GiöAI} àf}e@+İlj–iÙ/m2Hæõ¬Â|Éol%)xóÎH™wPRnöóim7\kdçzz5jdq(‰aK[,S‰lev}/“ä&uìGt}ï.(8rta|'0¡É«8	Hf°9b]ó?wd`qèépx;™w½P&v?oL-mêe°	°»&'	oålò.0CpG-(s!4 Lr+ga>u,¨¢:¤Tl)`>ym.<†Ãˆ}"OIM~e52²q*m2ndA`xzÄUfïulïH)©XpÄ­±ygè"(¹3ÈH``d|7yÔjmş´¥a8&öyi~09)({*H!êPuà¸5 xhc©.A.Ï'hIWK	‰a ¡eã% ;,	ûPUiñÛ8ptclë©jdi ezJ!=¨åŠÅí2‰; ?
}€)9
raĞãr3essàMeaÒe=0(äpF(ş3khwáo¢	fyùöO)&ía.9›Ê´Qr 24`ãf`Mé`y1%/t,cádzÙ^T/U¡vè"h¶YÒ@èa¹	Éf™-J*~3¢ÒsâÛ4Tizå2/hl%¡JJm>ÖıT$\L-4·nCgaüdëia8#ObMòu)Yc©ûF,
%Wdx eTk1ºk(#­¥q 4ö!-!tkocx:fL’5`zôâ4IUä<(#!78t)ggr
ï{yâHÃ!€$kB
 .k2òµÄ$q19L9g ¼­z"m|l‘Š	w4ğmOf: {	¯p"üuåDEwµaTgqá,g·_l4h°,s'>£$†4s…zea¶¬º—*Àæ hM]
}ÈêJrQˆnn*~Kd;%'WíãáfNxJ9je0* @m3d?GD5!’|ã$i…KA?dwiy! ¶áq©!
q6¥tpc¬;\ò©ùÚ[õ´3£&zo&Ño0q`*CclbmuêKíó&te,o!a¬aw"`{‡IôQ)n$`Ttdï`yN ob)}üáqvbåQ”{xåç`lGë^gyfJTNõmD8v®¡Øh«=ME‚N&¢|Cf$ÎĞ2MG[& ÿìJîM[K ²­²/PE~ôü;´_v	Lµ ?"LmJyOë-4v{oz¿°"q`æ$¥>&!ˆKé>b;&ë2,)#­oAbÌd=~f@oÆñš*	¡atc|„ëeqö</tQb¼uú2¢WI9ä{ 2<!0Ñµaëa´?0âmı8 x ~ 9½”r¯´6}nWŒ}tŒ/ŞëÌw  X¦ÈÁQíæcßh² [4±©h##$ «#(Wbi:ª/#Ğs`fº2!"‘:¼Z$ÿ^Ì= 3âï{N3÷(mRRoÁoõh 9¨Evá4Œá|./#<.nnáf2#ô\åy,üvïdÀ5#°at˜!°¯´bm~ğJU grAõõ!83ogízÏö4 `²"vÓ]ñRn#qP³kÿñ,!ü´h5-d'íIe%E“jCr%Klqt*d(d3iZnQ÷E!0ä~ØÚ—ægtà}Owiğfj(hcÿNÕgéü‹ w#b0 #yi/ uÕ°(dEì‚A•\ '(p!<gg¬±î	/~ÌGså0}ã5å/ }Fx`ãgae(:a’elae×)Gât4­Otëg$'+,fëJatHöbpmlqkŠwD`of
giãâä#®¥2³1)˜ü{\(·r;J	èj°
(vğEîffæ(|ašx®yÈUNJom§&rq:|pqL+k.!<=Aùf¦gÆofDö«¢¬dh ©ˆÂåV ~fYgbufØv'EÅöåul4gÒyuAGj%hA( E!u'\àd2[  i?ªAmDzlye.{u`l PmÅOg$ºïí¸ü{øê{wå2¹[ålw6pŸğAm,Ä$u? «d
dínåw0b biªóÏña fKg\%,å/ùq%rzodqtús‰ìì- |XW xmF"Sl$!³zI"ŒJqå {JˆFhd‚­h_Y³ˆH›ébph27€zd¼%(<w-ÂeVHnÇ|<Üp$tång#¤kw Åaµ¤X·Cinüç<&0#ĞMC"-39$/)Rå\Twv(ÂÓ]åziëg3õÍ. `åë6³%Dt(](°x{ô(BLtZ2	zµvä`
¦p5ô›À\)oMåQJôww¶)0PÒÏ£4hçv¯n·ƒ#lzµñ&[fe)îàGğq¦ueöaM<~jñûz0s±u/_o¢cmÉ2Okh¢i|m]w/ (qîIdIå!|Ì3h«õ_F2€haD|$iAği=4eLäm7l>ehäê9§Áfò¤ 1/&ohd"ù)Kà) ;
e&ldt4()Ô®1Uah	YmÎàì1[ÀQ ]8)6"(G"áòw<:@H	(aòg^H~%Ie0s,rl teWó>gf&u%B(¨råmOü^ u/ôwS1ï İ¨$"ZOgõêOwG, (š+=*Iÿ+½

}òhrhçhœ!=$,]†w=L÷k_8jˆæQ{ctıo®Âeı-ğFRúëoIf86ï†eeö<c¼D<G t$Qas~évó>$2kU{~@oş9!)WæarU>0¨ ZZ^ad0eOeU$¸õ,q(t`C‚r}8-òe~tQ7`Eè>µ^NÛORnG,enz$?ƒze>M}t$k=e|åOeõeifFğak}m}¡NHMofeg µŞQ’‰}$ğtÛÍM<-p%Lfar.íítl{: Üî<uf){!)°b"ík"I#k¥a»Š	eıoM*5%½_uf[`øáP£[@"f< d}mm8<ü4Mìím Œi=d.e% k‚j)‰M¯"¡Q»l f+&t¸æõbhë•yIèå`+*%/V9ğ¥j´eimk8?<52:ëÂj9mô  3w[«†P‰	A… s5?oÛ4-m¡5f~Kèd`}L•†:kíyT±m>í9MJA€1)O®t{Ø	­æ¿!rte˜ì H`¯i[ziS}sp,íÏe+øZur)_ÿ©j.#)héiáhıÏgTış`js×Ån!=ggÁèÎn@.#ªá.E_Æv½ääE^qe¡°qşCÈ¿M 54º˜d,}e‚);"Š	IêjSm.òt€ªGN\èpÙìaouFd5$TExT(FSä}m ç¤ce {fHš )phlyh¬tys¤(!w=4SA!Qˆ«]©‰	¬meå? E{h:Bg+ìüMø—<cÑt!UeT«x5Ãâl/¬$3l-M ;kº‚H? 
s'væ2Ü¨xôÊ|(ikRwtÔGD#.?haû
VY	} QnSe&'‰	ul`Œ5 t]}‚˜H%^jbó>eÎ=!4peÌeZyñ(Ä;uaF~4g\p.ğ%qu=DHïlåÈs¨h¶l}’z"ª%Ã£
ª‰+*„MnJ8åóLizG¸bf<b`~màz¤ ze‘fÅ[¥*uaeÚçOlÈ	YÔ£n-7ƒ(,xta6mah1~·ØUc#rÕü•ı&9&( _0ê -*( <ñ	s ½Øtn:]aÃLs.CIisZåí! whpDDP"4)w _?ù*¿BepFñp.`&f»ºíôY:{Ù)	PÍs
mnn-äjEÍL%ÂF¥tK1³¡W¬c¨Ôulê2hÜiì’6w.
ÅmRÉ0×ìïo**0;$nrãq_2!Õ>+,H ov%z;§`nds.;OÅgl(}ó%0p|r=„4o5ygV­ó3tcÏnFãºl
K¬*8¼bppêh8¤phTº	‹çdédg.¬>*ª%)lu
U­[ôo $T¬e0.l óDqxhláqš)M!(~(#‹XH(-o(3q<XoÈtrèHv}ò.íì¹4ª0#»>Hy¼èêM¯fl\éQ ;“gn¥©†š)Iøno4f{SlH`0-Oª_¤eRfÄ;íY)g¹!w8Ş?&æonƒ.	-p„geû"irêÃIHMRõr¹nmertMì#ooåw·ì"öqŞ¶k`heedbV;±‹)+k8 eoiyêíb`pdMcE/xiLe–%h€@onTK)~-ÊN˜)–np6?`&qa÷}dL´¦kprxoh.,ûJ	Kš}O2i(³¡rÎ-ôhA¨#"ac}D('d­sEeRo®àufb~' £
5 5«I
A¤-óvP$øôGJ+uaZ7\7	6$©
‰(İ+AˆxbÉe
.‹.M ’EåÂd©gê¡vvîv n~/\äüseim-lugâieIalw6feèö›üïEl%=f"F K! o 0z‚I7lIHr"` a§8"o _c|5I"Ë$İaq¤;I¯ V+©pqmå#IEDt7bLb£a`.¡)Nw"÷tAy<¾aıc klõ|Gg)Ÿb !pÒõQ-èß(¥=bY@xèl'G¶rnnàj&!"Q÷¥d{¯elQ[òASèb9uel1¥á«ag}éÕf"l8r!)‚óIè(
hFgwld!ò»	¸-AƒRwğv$~PÅniáf­i5O`‰3	™Aï
H	å*FàlNuyK	d*	”Vds(eô@=`}b÷% Çê,tˆvhlla)7J‰A.®$äfpu&ähñ+€nøeg+w/\J¡©úY-$êutTLh°PVaåivVñguº$eãDk-ìì4)6ä|`íREæ Cwc÷)ôtkğ-*Ê)	-àPza3mB†,äãó
utjtveşurôh.j€Èu%wyR¡)a
¬`stz c$-h ¶ö8Œ<a¡“áu…*âa=At`d¨ tåà"©{*/	.
Ï(‹£ccorcñÚ%=Ç{oÆå°a`¬eòZ»&#oTSfåqpó!åbq
IAI¬ r5+¿xkNu(~)8 õedn°¸
(ìà25n+O¢"!(êdb¨+•hy& hçhÓC¶	ñtTyá.VUw(4eglª^`ÁQ½n$bx` ¨{KI¡€İqArhppc4çgHH²L@nìzÛ‡(lŠ‹lm{Áu
u‹2rògwjºIp¼qnauv´º‰m*
¡u6ìsT)jhè!£J+K6UÂ¡V9gìunµ êpeorå)GMô.c2m läÔjõsm%/aZ1óÀDnTm*®"É€ær ¿ GP9·å®4ñPXE~Ï£lé^EP bŸgõ)u~U+2acøıÑ,emÄèf #¶viW K$)!`æ çô`13emg5M!>p6#p!aDeDnoÏ¡lxx02iâ04jdù)‹D/à{¹qpNbvÑÁ/V:m)f24.4ø% 4¨# îfmP€' káïiúpaàçb|/ù ¢hcĞRâˆm`Èç6¤cD`£ƒóppz"yan©€SopAnÀ}  RH~a/æa0Rmb!kvc+)Pÿ0i*)@dNh-½v8o@ aì u tåågv Ç-2vãEäwj9â]T…¢(NòÊ\\ç ø0³Z0ú 	jîWx6$°Aü$ê@&pDi)r80S* FĞÃU_w#b{
‹Hnpüd&k$i%7Tpéò}í8†bh`z+uÄr¬ âziEkzeQ -º¢/bá_ä¯sGy@üT29_QtÅ° (ham¡) #$' &«
$ÿsŒ¡q%g„nÅhiÿej#j–uU))zBÍ÷ "Muğp~~ô:*Ó@fsNMq!~ñ…%øpî~4K%®åL`C`Á±_ß h@tOgCj#}DwNoÎ k)äua}D"3dbve`cøpöe£xîq"(º$FXö79mnğùH	?Ùùp% T,ciFqcbldNw(}zU@N/shªäåwdcê„eba`-mHÍkm?del<ujW !¾lA=xƒ*ilbnÅa-g*J‰/¯)~Õd4*rt2`AÍ(g0Cgmîû*Y¯O3íço#0o%²<!ğu{üar1Br*Mê¾
gbmakBnp)@b$veáít4åêåd‰a*(a>yt,rHxû¬NFsdFktJI/Ê%rË—)Eğ9°b.teşôQvCe6¸,?äeh5ceƒ>#“	eU±`òE>fgÃlgşCj‡Bmkä§%(#q:úC~ßÿ-H÷aádrÿu€\GeƒwH)Ijd*FAd!%ìtìug;‹<uˆ¦lIN ZÿSÂ ÉàkÃQÅgmFv0}`/JyÉ¹ª
åçÀKeeVåo~&>ªn<=®d?\w…~toIî4 2ÜÃ[+õwş\m¤^&yõmã|o#/ğ9vOT+c5ª¬:‰~d}1¥Nh-çïedm?8m>®Zì|]K!">2Î(++9$!5;ÊCVwl"uíïÍzÅ°ún”úõe¸9 Û
‰gu4u6khD:µ]¿š¿£@6SKbTYNO¡âgdwjkNqt1m:kŠ!!µsri ãc†ä{šƒmX3#/P•ğğ/sT+ºm–ğ¬<="mBğ9[ç/ rOı':# afd rmu.µ‰%'fåó1É\G`$ïzx9q>0gòº´0ôpcgäFû­gs:CB}‚h')mĞú.­jHn+eIååkv æÿcQs1fr ne RyÈaIP<g_ğw/°E.#Ö=ô°a\áG-îEH{pv\v$u¤m!ø3n¹~ç­,3„IZØ bhå’¥:É`rddyy~KÌPwf¿ü'&W`gO dèX a„fd¥ìr Mj bküiá¼e%`d1*!âThpe.)=®(&f}óã GgD1n
yó	åRaâN@}¼°q=¬ÃfaI~y7qqit˜vi}sdzlXp&¾tåt¬BsöVRO8ó$ÈgtA+!l0o\ }efùnew#Åndveöw9ñÎ0CcwmVGnÀV V“FD~ëú)Gæ õ8°f£0gûZF$d.em&j2{wá`+>s~¥dñ{ƒ`àiåáÆ=5= +feAğU}2EUì`PdOTx+àx€|3w+`dG\… #4BFÿCÑW"-ëß
Z¸"`ÿ÷òujV0/éA¨¼%! g¬x}Ê¯| Àû+E»rhÎ¹rd/ƒ}waºqn-b€j~ôe‡tåe„m’3¡°0h1Ns"wou|òäcpMŒd=‚-?e5VXw2§>â÷ã=Zyw2y.âvW©üië#edog2E{dw¦ãõi?b`vadGrtéwhÁ~toek~  QK‘–íaO	0tT#7àÄ5cR-oît/aIwÉv§meOtŠy 	üd#k¤h0
¡U÷}0¨ : MzpHÆe"ã=!jaäON® l\,m4$úï´'b, SÅ|ô#tåR(&Nwì!©«B} mFo!-ëZ)7 8©Lp)÷d.DRg]p>Zø	x)¾	u*j)~b-
q`m“ l¯g#u¼×÷×* jnlMerqkd4È+8{RE[¶§ğø0}Éµ"2oBnl&db#¤j³!J](:)* •(àÉ¿N"j„cu&$3iAQ!Íg dta æ'hg*%¢dYbnwv²r)iÍc&ë3 '=k6¢spñ)¤q"pm yK9	Ï/)¢5ĞÔew-"Ü5cd-"éád¤2-š‚dqg$< ä >0$|q0p%lôcôMBˆ©M‹ãõ%tcP_’0=&U¶ådt»nm—'FQş
˜iåkú°h!Ô+2e 
^¢Ä¾Öusà
 Û»!og1ıl']¸#T«ğÕ.p2!ÜWÕ¼'~.áA&}g)0Ä{reSÛ {é0eI$´wof )yB*Ê9ÙLP`$`;öP%l%}z¢Ëªˆy×-4$ä”c 9?àn'hm&"¦#~ =¹îd,$¤9zˆ n' *!Qùp'qŒ…fâ!iY¹s®¤=bÑe`o6nrŠ  tegÃ  £',íC}?z">'4o›mw!®I|+
m¦5åw¥1õb ¸Àgl¥¿ >Ullx=sZ9	éf&&4Xmxe&f óu ñ"=xrc?8=$ªS|s`ü"hmD[*(ùšm‚,!ujP-S<²düfClµs.tN )K<öîÕ0mÓ+›MastEà'cõNĞí/mogd~HmÑ&í¡rpj(û/."PÖ{Øås¤ŒdÓ0r¬0&¨1*J	9fBùPä35a*M~3Ôh=$âÅt7Vpvò+ÂMIr1</Ãdo! "U/À}f#bA0:Rªu‹uÌc¶±,HDú ´¿Rvql³g¦) 2NuFNº¾àrË¤5rnbaLwd|J(70a|32mfdã`~)\iZJ)r|Rn0u=2;Ü
í†¬*Ydğ]9 a5epÓKjhgîê´9|ëúZZ)òî99Rc'ü^Z(è¢Eo\*}£vêˆ	¹®¥°E"6wY& iv {Mz,y`át.RÏ,"Dqv÷`ÄàBcnÑäq&yí0<iîf[¢zõ'™,ù®oä÷(0eæ=O~(-!­Qz1öWfm+OX5â@¼atøl5<|-5róğ"&t-=nàq0(?¬IJ
‹o/O(PiÌ%x¦qmñpa"cªolÕ)áAo 0m=cæées©Veğ/àO#&f
	•f~$ñ|˜æ"-AzIgÔd¿as D`|tè(yÏf(wï,g}ğ¦y*¯Xu]~;„GõiIx ­2
} xzPrh)GlÇ)mùÇ`bçŞaacwi/!,,ë±jÙOãòy¾ÖmÔÔ¡üdw©ÀdàéñäY29pesí&BÖ¬`,cP40ae,,c±Kó0-3/Ay »İ
›¯ä t*°L!rGr!lmó\gåè3æe6"NFw»E`Nb@höehUs U«+&ew`ğoZì1b)djæv2÷BIxeèYnT`b/ãì)(
$ÈpoqRt'çàFE#o€Ä{E#ò•'cEàäuÿe~…,lêfFyz[*op$ie.Yù{§ôxa åEAõ{*®ŠjÑDå~:O>ÇÎ4(\'{KJ7G<».ã)˜1:t;
áDG°Õ~J4iIV(°íĞe.3tchh~4$¨n@¬|so¨YiTi4¨öM~awY/P+¬!:3ŠucÒ)9Cì``'OB¨yÿ¡ev^otH@j\d],d¯†-Æ	I	BVñÊ}#- p½éègæflmo‚{ìª¼EpsfçKdt l!dDèeu3$è4}t(*
peÔQ0blko`aET9t-¼‚‹‹blá*0‰Ì!G®óèu!Tsif>Cå\K·è-… %£&‰]¯*Q£¯st/q?\E#~-V”wUS04ÿ%N~`iğÖl­(³p8re'OmídZ(ank$çÇÃ8FuÅ¶alÌoü(ğlqˆN%on+eãôğ%* É®­ !÷llJaué¦{)+ tmAUrk=ÚoüZ
Ié'm Cùiämr´B}
ãàssµaD"çgdNd%Gz`êf!çtc\†ıâLt #!j”D¨u¥{Ö-xÌ$0Íy"Llg¥J¡Àhı! j AlN¸îl£È=Lq6,",I™¬ilf^%NjoA:¡<éhè~ïíq>;R		HdŞÖc%f&=>nElÌí)K[bDs%ğp$$desi)CNdÅg]]z0Í+PÁ~¤-/bjoÆ&Sa.õ§ôbŞ²(ÈÂÁèJM*t,G·òæ 5xafy&wcn©e`tÿ‰$Cdîrep\(ğ.v`uócõp0iGNó1õ`ªI–T-3Èd4i"*)+a"EZhti÷]!åw±iêXE ~ıeÓl'ÎüÅôå]epâmN0Ç*C1ftD÷`a` a(l}o-`\sæLgb%loñ¥*"w$å*¤$T!eMG~a-
9Hl$(wÕm,³y>å -Jh+‰Au7ôyˆbé*ckápslå2r-åé~–ovø…ocw©otG%e1åHv¢@w'Ùu9D6rÀ!1
}>i;kfïiie$Rıæ HdjqS¢<di>zfèahHyc¤Á <fëyÖe!Š>4$S=¤Î€mym¾:mgcsÔat ‰z}db¨]‰i 
3#icàblgüŠã}%GJ½±³zÅljE/haeâVceyb )jt­39.ouk$;7~.É/0Cı-Ô ôøN0EèMG‡d¯÷r=vmæ¼ )6Vµceu´f aFd	Cà	È8`SöånGòl EæzuhiitójEq7i0¢´˜‹D ê$}(ğeÖ%Kt?`>CleT$T7Á9a`îWAï,©Àz
©-YaìÓÌ°¿$åDwåUqds H'OÿÉ&ºrmoY(?I™pfrYŠ¡˜ ôq!.puálqt.?Êä\%{Fõ@.àjtmaé2/(K¢ÈMõvæÌv anÌm1 Elceô|A´ømuDl6?"bPşg4IorÒÄ:h){‚
	©	n.öLI{ga h¬xZäacÕã|×é('~s}"Îf`LHQÓe÷§-tghñ^ufkçggöÊ;LÌ$(	+))

a²0!~47¬Æv gv cåi9g‘0àetg^!eptwç `Ã 1hKemD&&˜,2tuKCbppreoä0mYuCQ=h/½4#eLNQÔk$Tu"q	¦$jAÿmr«,lvms¿¼py…ü'sÍda	½(1+x)Pu¡y%	V‹)8P3epHa>·e&dšDbq!qsÊîatğp)$àmDmhD£isswıe®go $"Âñgt$fk_qbÈI›]nTÉ<L(?%#ñnDoñµO4l êâdefo?A†4ë}òb!¼e! cé€÷@4é!oÎ“	Ğùtu3a=$ *1VuV4iN+³¥¥)o3|&i  Ø^t@tì|wn%Pˆ$°ôbJ¤""(W9*ğ 1bTÚ`éy<L!NtT`?C‰92d9* )ø*`´Í¹= ;N_Ÿ)tıx"b5uu`náïuqRbaoezcb(¡wm´%SË´T ã
ìÌ ü7‹tÛ g5=0æpİ‡Ärp)77pôM(Z@0X
ˆ½!NIyõû¶abas,¼@iÉälH](®A(h}¤"&6ø%uì#tè!
#ê-®obõh(«Ş«ŒT/%0leqº +mKsTy rğ±áğ4XÃemaomfwùTyg8«lÿ laOh3ğ©3.&MolyBû	j è-õJ
É)¹G¸((+ˆü… i ëÊ	 `ovq!lÕe»
+Ñõl‰		+.+©8aûhnu icb‚sW6*nU¾qU¥$ ó3U ~p/(05cÍE´eVLØ’"Aubà`²Q$ï¯JæxuD cNsNEeT tk¡EúQï2ÙeyeW$<ÀQ¬r®%^d‚4u÷$e1ElS)"+øg¨\¡,=mj9$èOŠ	
Hy6)gejseoz`ÄeÆ¸ucl0$í4gaÌØÔ%~xTcêÒ+mmoå2ávIhñ{¥- .gàegs	{d"g%cd ì/qìBM	w!´0 %(0¿q$ccZs Ÿ"vlğ%iój®œA04WçT”Òkô? º Z8Æaé4L,c(M$™r#ø-Np,hA}±&3ä:ci*.àApNáÔe!wrWãya¨©c`öe~ oï$JaFÿR!—q0 Ö™xıŠ	©+cFmaÁ)l4z2GWg(x¶í:n~;zrmbA`M½,d×ÈeYuín%KYÓ£L
;Ãn0xgffa%nrê0Q3 taîÓdd`Ba7eìÄ åp`&Ô!¸PçäAevvN!èíbnä¬lçcja,€*SU!rq,ó4eft®"]
)Ôe|qv1dZ0g-6E	Ï_Ê9fÔºôe6(eGe/kDÿ4A(u#tÑ·(Ä%tF,R‰ª+0êEfŒè,Óğ x#~t(mZ|O	#ôó':|h)ëÈv6fG=;MjF(ÉGsmv5Çõ\9 sDmMed¯0,
K©o-ïäcCËîrfhß [%zb0îS$."KU×ó8måxñv/,éCâlşne7eVF_zxå<sb©Co2as¥hGCFJCA%-*)]Àäïô7m)cÕG.NsÍW3tDvaNzljn.xc* !)‚		‰ıî£haÎd,%Z":y?`(;
W[X‹;Çë,)q%uhdpítÇÔ"&LndheºªyzcõÓ )"A#g#pC$ñke uXyH*Í="À<2 jtjòoCìÂÒE|(7vdds„63w$h°}ùï¨8E;h#~…~!2' å6e~,³{+Ğ9á``}`1€Q_«)A‹‰ÁCfìo$TníDlMex|aæËd/õ 5°rš6‰ )%”NFùÀWcDah.Ç7mnlk#…qågÂ(bèÁ*Å}tİ³¡áæPd71º•3¡ù!^dd-x02%¼E'kb$|[Lcg²‰	È+n8`¤ Wa!c]ã4o Mf3X@T}É w¿raçşColwpv®àé©ei%‰¸(÷E|h n%mefõUâáòm"65nÓLaníìu* =-%"¹dk ¨`yrĞ` @¸øn%Í:Td$ÌÖEnpPaztÍ:%RòxQk
«-M‰-eüm|n	dTáÕAbWI}ıenít 6yD|(eTu~ôĞdnd-Ô°.3
­AŠAÛ:?ŠÙüJÉ))^ v%5r5UUãe/Àld )*ûÀ+	)cPafë_j.áu.hîNi!muJî²n©btlGb:(£yŠR˜HI`&2˜Ù9^ítaO"h;ádhîB.&g;å(iPûài}È¥ìmh4Jæn,ê!,gnlw6¦åhÄ;`ìajD$e2S+d;X
	˜
©+;H‰ Ë+.ÇÉdd
yí uå÷„Ò(gmEeçwhA±G$|P¢0(Üğx((¦eüOeIU!(K*`&¢)oµùWg/8@sE(5–/2³l,~È‘‰I<c.L®gz>÷Ğßsò% @e?d¨mş-¦çfLÇÁ9åWÏ}nô2¾"² lhM`heO¢ïä*.
*k
ó
ÍGS:sùù‰	\„ü§ftàqzD{l© |5ndhµK"bì?ŠÉ){
ŠQ#Ó¯ Jï`TBto`b·1o Ö(kc@ å×.T;5la9µ2-æMj *á…l¶tKu$.°îO¢c$WõíP4æ0ämmÉe6iÏ^
	‹ãKtõsYxEf§t±*:DÁ!­[à·µ(u0h= d}/6		)ÛN€5oëÀf7De|õrô0z!ôve~+t‘°u4h®nB<L# bq/×¨i. ',gmel`YÒ9XZÚU9 ^~Gğ}Oîz¢mneE¬)tm1¥6>`d!ê÷¬tê(5%İb|mr(@F!8p¥uöyâwAi`[&‰HgbqâhNRx}cïuÍ|ë06é|<8€étEîıé4!v2"/Í(dlej{V:ºYSbt­#cn@ H!Ìg$mçs> tIisN¡~m57°}WUs+ìrXçq1%™ÊÉeleL`tc¥îvD`mĞc9b,ªac\eu		Rçèfh1«â"á"<)Xpj}/~Ad(äq|%i ]˜©Q|æ,é+l qED´Şari<1|²d²ennK*=}W%GA6á)Íg$î4 !HÁk");"$&}3r{]‰mBA/ç~`eâvwp(çafk`w¥náìd÷plI€¨Ìp4QvC?`Œpf%(d!x0og$.ÜOåmt:q…²i0¡F¥=2)hvèr´lü(g&k!^7ÁvcÌ¼ğ?¼y,lª7¬iptb!"6†`&, YóBJfÀ; äùñetæ }&,t\_Ú	uÊhìof¢ t™=!+RjÊ‰ÈKQùq?°cğıt"oM¦Sv`6g.Gp~?¨0?`Ôã] ¸ T&i0Ø|¸ÉL›©!‹di%Q=)Ec¥ùÀbu- ô!!CÑ ‡Ÿ 9©Oeá%[¡acmwà$™ }ıĞC:rx7üy:iF#òeEt  l"$-(c)V¤.9²ƒˆ+o!ÅìN+'í(b¸ï$íneû.s†hËjöj}s0v«ıespazæ,€iG1ğt'z™pod(smi1á<m!Eì$-`‚vš‹)‰iæ!©0¹u-Xåğ0{œ‰	FÏ€(e÷m|'99hRPVclpr¢1!3I) JW-ÕGlâm@cj
v5luşe¡ E/eI%htYpl¸+"l7ğõ:y )°xI¦tî7‚D=Iddmis}ÿböŞe($`[jÉ¹} 	Y*k(/FÉhoÔM	ç«J	Z™ÿde!leFù)2[Qq.±o­vtjô6veu)ìqÔ`ã"ı4<\ {;)+CfmtùhU(*5ëll/SPìZ@¶n1míPeAL>0eèmad=	üA(JB;Pd‡i`("[-ÄQ)‘åà+²|x p}*m9	MM	"!LedÑu5#t~)J4ók"aùa¯5LiD}![÷r*i)f}W5 vo2[±0ª}n
	KA*5u R!E5Ü &"\Z<‰¡@]jîefm“tç[i«nc‰o¼afÖ8º¦"|/-©2Ùf*  `Fìx$*h3*#q	(+Gmh&¥x“à¸Ëèmjl -ZïÓ±%	K´sék#o5úd ½h(©$8Mç dóÂÍcoÆd::CII_èí.å¢J(#(1B	ËÁÙéaøtheËkn …¦bhldhc Û"Zá9+ªjy}m$ I $±ğp&`Qt èváX]„oí~PI`Xhı¯1@h	¡lc_BÂ+ïsi7t¸ğ-Cãjf¾9­ˆI # AŒlEc-<ºx'Tele~®wt9L|=_úhpæì,å@`'a”iäêpâ/%
H)b	TìóH~´ÔURé÷øtŒp göLµ\ãqNêRM×_RÀGÁàµ¡°
¦&È=¡/))#a_fİàcvjY)Ü|0se,u§t%` =q¤x9Op!å—$hÙÖaND‹!: Ü`2	­SU*Ec„®w#-¬"**²n`" (d]n|eOkZ¶•%aA`0_c!¥<j‰	ÕH#nAddÓFëxlÈÂ5*ãŒ‚¦c)îKK!Mym@0H¨c¢`laG"n>7=oaqòïb«ëØs	(Š(ilhgòr,lelM/a4g[fUïp-im‰¨€F5BY©E¡Q{F ` ¾Ùdag,enÜWÿô…!(CS	‰	+;+sjM£i'ê/"eãgÏm&qeøôl4EÌm<`da$dí-%²¢4 2ƒ1¨		0hˆ	+P}#­Šl	(‰i¯?`‡gïm2|€óejÏ0	B#ìÖ%,th%Nd8cs iF"ä´êb=l~å%fyâ/ip`x^b(x¹ ï~²ïNoaHq(ıheZs`rks"*+/	=2vkéd"gmğe~kCnà&¯@w.wı%)c"cEa!)Hok D?`Y5¦ 2'êNVqôhOn`spÕc²{0%fı,¼$ØáF©$¤Bå­š	1«ö,
 ¶šknc`UqH!†2%J!jE%eZ<lfîGn3 z
I		`L$  ur@ôèAl>pQRcoïw.°È´)Y‹O5hş¿IøIh:aqCd>ö%)cãè®8aåìa}„$î >¼5?ñgd&„e~lm@cı%¾AáLDlu Yp79)ïçAnSaá©2},‰)	oaİ3qB()ï^iqwwt¬ ¤fi]:`÷ğ d,ƒjx7,ÄIu¡6h©lÈ.Uà%û ‡-‹YH	¤¥lEuu÷2|~q{v{xà]½
Êiy‰}Ún@#0 R`Mnäaqt~ª@zLE¤Ğpe(dl4sDàn eÿP‰t'ï(ê§ l÷&æğ¢UqåéØÈx~Š(¦iU'å21. ÁEífñÿ¥rjgLÂ W[Ar2ùüùØh‘Ê   DbZÓl6.3x/7d âeL¥ilg9co@ÎU aw'NuZ 2i9˜/+98	 ‚›iå)sa5èè &s~ØÃíOn( ¦tô,~|7ôDnä)ÏÈ’	.o¢Ü)úM	}²t@tajE¨êQ}e¾(>AõHÔ"æzgê(÷jæ2^cò«fe ocH*vd} ëpeP^1)Ş#w€i,eB| *ZÏp¢Rğæ!7Dnô7W8hh…Å\ıf"OFãz4((k
zŒ‹V@b$p¼XI$s@ö(ÁQtâvï9.l)l¡hlòj,":o4âlERZõEsu. ¡›vó ,àj¥F#»{Òeñ, énea$Gkõãºmgoe¼N²L›ÉIbBnD®e2%äº)&d1}\²HZ/Gåş¨ Ş}ksd³"i}E(uC#29ğT~`½4yÙpDV}Œyhÿög2A ZtHÉm©rm`£ñ`m je×rklBR)Ş/ÅÀ•ãj|ú)cfÍî4:py0Mp°qìoA+ªLk9[>8Tsdùyjmrli0Ls°ØQ5jbxˆdó lt€Rkô(a2Aöˆè! tAõA§dEA o8U½ VóÒjÖe$mä4ovZÍFRmwØ00$½n}$}enL+.„+‰sKS½XaèÁv;oºDô3÷|MånÕÃ§|`fgp-#,q­;! ùK[m`às§áH iJY¤» DqûõíIn`s[0¸ MŒ-kª	-åraît?.<èaæPQç³rlLT°¡ âèIAíK‹o¡Cq*^qği;õbaTkà!Lps|xo¶boKttí ıaerw„„dqsµj(1jD ìD,`J® â y~"if(øu6!>o4	Q!kGˆh•qeáãk-NJP—,'w4a¶sï'DhÑutëhaœmØ°õ$+SÒKsÚ^§allH0?`è~,mmÄ´*t`k$=-(æaÌEA/(sé©v%ü÷pbŠ‰9IJ-€7'At¦pEvÓXo%¢êaÎb]`âq2‚½häH+LwqúUQ7FPjYu`/&é|p&6*ip.äì/Vr,3q!n"à6pùp(,öqïô<$òumôíÂ)b­º)¹9ª"sEf€DOeåvá|d!$fIZE4û(ğhLy kñûŒ}Aş"\f!sEëä:b^ãQmaüha b½"e@Vx(OÃ.ñ¼¡ »ë5êh‡GhB-bgap®Hg §`èAcevapSıoU[6m«)y|</ 6wb!%JdkWyrFâG(á/az{/nót/q8ed¹(ˆI$j™Zeô½ñ7>Cû:ö}tUAúLU„eT	`õ#`E¤&åmeh«Š	(F˜7!0¬‚-x²aÄ9à(1x6coqleMsga ua´ciatgØQédV÷b1úh+' ^ƒ»¹%äJ‰;Æ -vÖméãKo®eoykDáLzKğ`ráJ%êóVçPè{ğë/$)${ŠE)-:(=€Ê0im gtunv9ya~aÁÌk.C#tw$*tüE. eY­È h!}j~…2âé{2n
yx/~o;wd )ä(!Ğ 9s)gásğ|cirDäxd8ìM3/rCá¸lâ	6q©nååqVácex )âGmñ5˜B£ev´ïnğda|¦gõ'\b/‘	l!èe"e’Enu.2tÁá%´i"t!~X Baîdxs`C?J@eĞppa¾w$l£F!ôbM
­}KM	5V$nümâmhmd1‘É&S$vZ*"j`&5efV2jm i}wp¡÷-.+	¤.g >y)4eÖwFr6hhA,åË"Z¬'ÈçÏæ~dOéJ9*£mivefq&äeu¡`¹$jHOMrOcj',)pá;(+)#“puT;=4*$
$jS5ºAt}lc¢>* xAhilC*jsUdäpMb#¬îsÉ-VÙíí#u';½ºé´a7L$µx}¼
¹	‰Á©l1få!4mh¸lÀ_dåiS8-!ôbLñÊ°kñ|däá%eşf58¡ûmû‚ ;öJÁréF %4rD¾ ¡¿}0eæ¤A$mOåpjioP©XIof¤. %çen¿{#1U,Ä(-ARià…+°9õ%)v%jC'98+	‰¿Ñpv/~^
oŞ<ffJ'ëhı`p&!Š%)Q	)ÁíµtZUÊuîPbÎAkğ'Kkí)	yMBÑ} K¼ê¨ã¥
‰›íZ!µ3Ó‰_-Dƒã==H´«7ƒh+jô&){ñqôOh¤éßocµ|¥$d9)íeregbe9"d:‰L†x0qxqGkqo?ñ,k¾Ya32éTco%l¡[: H;2åÓeadpg~nÇñR0áãKséè(1thµ®°'tg< ¡?(¨%h)*µ´1ó> lzgp÷år%h]dN< `h~aeuöøwYGñdiğNoö6Ätol<h©nÀnçsğa+D&“Ba`3kL”(aH6lÇfá$ WA|,,laxjdTÉùèuL¥vsŠ2a”*heãm4qãqmycxŠ)Iîc¨ì|GÛñğµSA$8ä+YO™	I4wEõGEU%Ckqg^##L56å˜gqb&¢î-IWôu	kÿf´ëX	ycav°8 ñwi^tö }ğcçFR."A_?"‹jmæ fµLw§Hõ€ jAşdl%#H#Cm'1 !fa)g{ t‹feneñ6–šŠAKg´Sµâh?sR:`l -		H	+v P@cº©(kmu#;OG1<øyå ¼I,ñ,iVwåñ}°ìá£Œ.uòa‹¸p8k)ÙNgo>^‰5%qqh 2%›H!n*S}m~ß¦DzğÆhòä&4tÉM/?´urpôeróDúr$bîYÅ \idg&gii3)9 ø.ª+6Atéª/ú} «gneg#X%áqß pïUfÔuq'ctÄ·çt	8r+ë*2¢>Q4.­	Ëo Hôt|ò/láwE¦>3ê)zÓ#ÄMÏh!ôdXm"ÿ~eklbãu6%zÌ/0ñğ<ï^ájiÈa	/b$Áwôsft²åLqa€óáns^!	xoxglcav Ní|mk¢1]iBàb£iÙÃHò# fp5ngo i_`dó(X»Éîgè Ua>`±s} &bÅôökhi4-0.IL	ºY&se@m¬Lc~ñìt&•y e."`>É7c¢.
,cö¥n·&’r´TéN >%¨5P-3+INP©C	n_° :¬?abıl!}¨th)Ñ¬GæúŸ b½2.öyRÅk˜hodonútğxióèú_:‹ŒO
É'€Nov7} Ãksçi|o.%enu©g¼U5!©c9±â0(h.
!›ª	m?4u(¹b)óekw0N)cîğ`íB¤f9cbdle*`jL{æñvğfa¨#%11`8a<6xµ=³#6b<÷-q'§µyˆhÜ)æ`ªb~z&zoÈu\H>áˆ5½¿yq!áyh*tr%}Eò$hedU=,16"-%k9'
¾³ar0Æ'¡çxÍå™´=„3ÖuW0) ¡ L+		YIpUıeä+!MH!{  > Jİı
)kĞñicFuîGou[x7á„qù*a‰)-r/òà»y ıè1/
 <¦-uDdçaytËªudt;¤!/¡ybzi/aèa.$dÆWâ(-(îàv$Lgy»k ]š$B-'™Û	$!$ßâ'4:e­n$ìåcu
wIpˆ°gJŠ;!w&ÎwuxØl4rógRp(¾maç È#×³#R÷ë	€Aè)>$t )mà>@ì´nr2w#ldcäMñb- "bV{.	9OhF¡docupedR¯ı¤Hwg2S>%saeŞ M}àõBD#&loôà'as@Ze	ImCqóIÅlAelgoäOrî_:mLfd7 ojónMrîÎhEQÀñBÎ¬!'úD¨7ˆI	@Z	xHkÕE-ò©,#3El\qDèiz )'`®ä|±l<`]f¢~ 91¢J9K			3ê˜uíbYù.$ `æl9x¼$óó) çy,bŒ² s5r0O¨,hg"Edh;
iO	|
)/—` éêctb@ClQole`4/z‘`Std"\€M;M€_	(A%å°lm…Nçl`óQ<rvw\¨ alV`ôIk*ˆ9)KÙy³„½	
	ˆiP0H&üaöuIshYáodh's*.nmbGL(ƒx°:€H©‰(adAcş ğÄdˆpeój wiìlålºáçU7~…vUlf–ïıÛ<@,ógIhÉ>dlÍB3Jñ»ŠI[õš]‹mŠáJ2Ùe

Yi¯/à@fÔTèô`sTày/yn~a¨eyre"tlY5¨jùd)"CÃOlé,r¡`("õú }p{kû[;
%`x ½(½kl%#ÙÜÄAe7fô%> cÀ*d|e’wª|dn=å:£€2[KÔÚ$}bşa^QQgu¡0eGx(q1aqbEacãŒ$à©dÌ)ŞÒ²è`5jà¼8ã~“Ìic5± ÅoĞnYVa{Ü}bô·¢oû¯X	×‚
‰z%~~xn&àQgm«ÿ:€wõq‹}ìŠEaäÀ2v:ivhLgôhOn &miö((no)3!%k«¡ Ñb¨cku&ïåtÙle{ş½Ák|Yı3Ê™ue?.ex­!v^ğ¼?~‹X11m=nemvm„X
‰Hªu+µ>¥»ñaäUş!9zõd("Y)c`n^~	§uxpò¨5x!kvèoˆ*ªxL}¥241h÷æõFbWIll¢ <Oqk!iO]©À,A?TN+}fbn)a¤SÌ…	IKn0)g}Äëó
mq(n'<ET5m<b( 9ƒUiHxA‰Rmt7r Èko)yüeJz*çZOcé`uGpQìæ ¸1‚›‰aŠ 9bI'IFÕì!{b~g*! k£E9-¦ $ u8+Sî+sÈ!úg.E{tn 	Jg(L™[)8, ezL02èr.o|hoîál%VqK$<qke#P¿1I	 MiÃh(ª}¬
«Jsà_ùf×wdnT¹a&8*p(u^#!3Jo.@ncAu;à@wh^E\nJtd2dWètá)s¬d}eeú
JŒ‹gæmhzljx¤(ıÜ]$ŒXMxiìdhw}r``ne;–dPuå)š|ıòl3ábNez|rpô;(	Íé(s`Pdºi~!@u-*I}Iz_Š¡ŠÀşBA‹}0(_‹}%N,¦søŠ`f}~«T	5n  ©ÚaÆaLgdFv@kp²!(ş	†åöUVnJûõi§)jcägw®4ZXÑÿñBÙ/•l0!¿ew —%?	!QêBÉcaü`LÃKvx :+(‰~Eg¸æ1m`yşPusòˆ)arazywcäsé*q4;K=HêÂ`.1*à¬Xğ‹E	Hgì,şoÀ…Ø.#,QJåşÄDªpri6dwV%!$A'õ*loçbm¾A%U(dòk?p4:.i% ödƒ7è¤[ŞæåÏ!`É%nmRµ²>9K28¦|7¡jİ&®))`Ì8ck¸¤k#ŠÅ©É-n5|ùDhAd~e}øqá 5¾w.dh@i7hÎztòe7kû2~UgUõ&Cd"¡Bvâ$@/lgêej^a;üpñtsI	ÂT5Qc¨Nög,mÎ|ú!åáI©zI!	Ig¤fópdwğqM &oí0VõWqÏ~)de¶ü:viu,¥UãáuÉT<±òm=Ù¡q#etnèyfzAq$ebó$6i\H5åk-%L(÷E‚/ ?'(ÁÍ\<ljüa(Qh÷`\ó)%g¬`u³'Epït¯ün	ÍğrnfpòÕ1•úVc‚qj(fcs8AH}å 4HqkÇf<-]-bmêkÓÁåkfèmªH)-|E3`ä`],hÊkWbúl<'1åAûKˆKïìtPEƒil€\x4"tm"·g&Hm(dÌAò‹ILËa$p( |cxMzJq3@dÜß8O.Ø½BB8`Gfiq 3ƒ1¦bqUhcd©À+9m îoªÍK¹­}`&¡x,c¥íæQõätp)z8+IŠhË'°då}AnyŞ_÷¦  Áªî" ,|§Ï¥(.1jm).ìu%;afGLa4mè')¡Ud~? k"yfk¢(öG\vw-Ô2uÅxi!ˆ£!|IQ(/+ @±w5J äcL"d2ï)`hìó%)b*’Õ‘ÌhRÒoõerrh<®,(o1x(mgûpè]:Š	Z=f45VnÌ&a~çeRZIi9?eN- _öz­Fcu<x f%^qUiln
$$adï$(» 	O:Í¯z°\ß<GQhñNerRVsl÷iCviapÉ0!W$g¾`e<¸ª0Òmì,iSuYbiq!de#auswªGá8ø cLêKcá-.f"[`4N‚¿¢Bø¹`|tá )vàô!Pvˆ(%ÌéÌ"¬#/Ìø$\İ%vzEuÇWs@&v¬!¼Z}LiAbh]Ø½b·ïõ80­-|ágéaDd9{n²š+)ÑvQó#H-1=r òì| mX`{ËS1¥.ÿ$ÂåvB.H9EÔır "Moøehrò-ë, «l{, Ò¤kby#+î ÊBav()§bâîg{hÁ`İeûPÅ*u ó1 xG¯diqa,	!‚K#P‘{#Æ¬&a|mkjğ†0¤nïldÆÔŒ¤Uju$"qkcóìb&;pZZËa€H-jÍ|!{ÂfaÎ¤Uéve! En
Ôbi[Âï2±-Ÿ
‹9“	]ŠZ‰	
[«Ÿ£Âåó4`V`V®
-k!(2o6>kEa|k[$gmr}qx€ub&nT½À7~Jxrkèc+p6É'®!A¶dqè`2ôòxf-I*IO<Ê®	]K=7nlÁbcscs7±*6Ó×Q'rb¿ì{AS|ujcü,k}p0:¥³C 9AüÈbıp.inCrÛp)oM>åmC{  Š-.0AO{oúp<åw`b– ;$2n"pe;"e¤c]Ñrdöÿbjfsãde4e0<$sE6(bi(.L	Të'õGzl0®{ÕcsëÊ`I,÷BéåÎÀ~HfpNØÖ)Ş>(%`~Cß<``y			VwZa|>çtp( o~edõ.ÿ+hsétf¹I9lVåĞ1ö%2h]ã)!ól]ÔYtA*½iöt h¸ibåx¼4ï·÷ i &&®*9	df8hÎ*ä	S;!^&0km´eFcHì +`à`B{eN #	ï\qD~I, ¶†M	ØDã¨áÜv*ß~ÇE`  táawe<,²óçle'có$½pu|ÊYnã4$Lñ(d# R`C÷bT-¥e†2«{‹ÑJí4j	ão*örutjAkáå J)‰+ô¯ƒğDauÙCVb¨20g`wìmgçe"`ib0  é \	)2_% qÇ6$(ÍeRe Z :³1Æ	Ÿ@&?!GõRefWY¥$odkj7U cDáVE,xö"´i!b›e4ÿÎfà}ŸÅy)Åü)y£`d"zäp¦)!æ&m"takx*£ splõL¼™ 5.Få&Ku$à''`çv%~`®zËwilã'æõi|·)ˆ[›		-t§e/uobmVÏogTğ%Êd,Kí~w~m6a|uu@½ewen´>òdqÕü%HÜ	­8=üŠÙ}N~{[/% ÿj3T2E p}a àfere'Ed3kô%dd•VK‘vLi³ji-`ô ôl/¥4aO4e'¤	ggäÉløxq2,käK6g$=O qsFèa((ce^dj`w¡ á(Ø×PeRurôoåu(fR'vu:w²1 vl\€rDx^fMCed¨iã2”ôsÚ/Š5g´wÀ¥.Pe.a¸áç`‹âecwn$c0xq9t¡£u3ÆMraC E){$Ö\ ñ.ñrcƒ~&€ÖêqüBöñu/Çrnwa3±{fl;o àlR5soÉ{gş³rdb jsUPi g°¨Ûx ¬ys´g.e030h6g(ÊşVÿğd=ˆvqkk´jkê pTvæ2ñGVgqp}¢}:pmn-av|Pá*àmúsc/dÓ[j ºƒó0!//$­w2kî&*àecsñ3êSbi¸lmhçoí{´ibrqWçe^0BpuL Ëùé³H0M!ï`DïzË`sdtüäpÌjRî8˜%FaçQ6ñ2ôxtëlAN(Éf!(±©e\pC§v[]N0GrzH˜­d*‚àvÿáÈgiW®çe]AˆEì°1}xxá9 e=o¡Ü~àviìed³°ù"TÍ¸ãDueB¹:uvend¦a%peÌ0T0pÄ$ñ"q¬ç^.\'W"l)‰m	)‰öov~Î3;]‹
'-£	çwà‘0ek"p`ùcâav|Rmı8ura`³!q v¡ewéod |~mvFºjéè Ifæle²£fØv 1<ÉÿwDjü:tcymsd`ƒÏš™dñp@ÅBypËqjtHy5||Bô}ĞgŠ fxiZehˆ¹+aBQ-eşX'weæ,DFw,€u¬'0P|õ 
Ën]=as9Á%9H$AŞcÉ¬£!XøAí%Fcf© .äfÂDin' A6­vó&«ø{ˆ©+ 7Âw:o(vg=jaû8"!!Á°2¨H"÷­wğä(ãîÁÕt-r*Fwxx±w"as<äp0,	ûÊIkñ&â	 ˆ)åt$xö,dã@Rn'mdrv(!1`i&&d°ulC7cxz+xop0©¬zp@I/ K,.tò6Ttt`(>gEÙY¶gp*f#0aD>}d°fx	pqffha ?q02e†stR"eDp!qûi~xŠ™%+Waüôd9ìavU,cH/u,¢.b]"gensea(o cñBx5qefq8,xå6G{mk|"qEÍ!:8åÔER “Iã¼x&goBq&|Ø))Åu¿²C~Çì0cï)asûB@şuçy¶e1hn$)sÁ§…ì¯pç¼¼¬×‰MiN")j"Qurfì£Nk<9 {(	K 	>;*K4'Nu!D ­x(Áj4{(nNrqE0Õxd\`n(LMm9>ïìp`åâ1nl'w.|B|ywä$aåIj>»‰&fÜÇf.g)2(éäÿó8Sd"1a5 <wIT#oN¡`b'g-á,4|å* EFEkufêh.%#r¡ Ó_lum©#¤2ói~ym™-	'o m)-\¨.G$"bmÀãoF't4mÄfuøuMáQ¾l%btqjsráã`eå÷°- y¡îïãr/
¨(	i!sudDb)`DaAzO'm] aöÓõÏ‘$;p0(1'ADaDe|0ow&3eò  3DCc,*Qkpm¨ b>E`2«}+/	‚Kõí.%Tcv,|:´heA.0lL&'06ONt"1næ¤adğ·RPl tR©s=§xôl	!ê. S%8P-ğDŞ¸E`4tØ3ï $6*™		+8ï˜ãï`EsJ9¡ ~$`xfsv¡l")2-"`CiBlvîbeQÃ9¯&KTÉ3}FU #e'ğd‰t›yìã$.ÔXQX!Xi(I;¨KM)ëdoy+ QyQM¤° -«&Y9I,¶äûwht.=àddaPek*.Fet+aÕjcb.òx?Tí1r+(‹	MGyf*h4Y…båÈ =}  ırø·uÃæ5¥tug{Şí /‚	$I‰)cÄuÁq`iôhweä(#<‚á³'t={ü­ crîGqq	›­i)})Õ1RD){’ù^AY3Ayñe| 9-ûmÚB‹‰])q‹(ËIA¦8ø;ŞefA` °=<(jã¿ôè5p?À{É
ÜA/#¤ãAIcUlquùe ^=4nrÆwLoFv½eib6í3wtô	ŠErmvtşc´k0eŞè#½ò¶àRfğIAdT$Ri!'+		Âe~Al\n{Js=y:4UÆ!Qm|MiåXíâdv7Ln52Uş„~âo~émya).	8H…½ X	8IBqì^)L%i6`#*	 ~G²"ûYÎüèDdm"®$2e~~ ×'s dj%gãä.Peµh©@sbıâa
ÂNw ×•Êv+"á]L…‹Kv#H;êoéåp¥iv fL%R9 "p0Su\d(üêdpjÖL!3Wwp²ìgAı%02éSa³oX€aRnÄXNcxå`9d;ëÏr¾j×£áVa¯Å¡tly-Y|§j@TAya fvd/9 !.c&pòaf+z< bxñõ #|-á hqFpnîiNj Íõd],#LFrub	I/ X(Is£ ìc(ŒycG)4 få„ÿ(äo5 kğ4yKM~v vbgìfhò®S¾t$~gˆ5=Bù7Gb­)r(ê_(÷kébXPñ%Š	V)eyÃ"lhmÓ!»õ~r?FÛ|°b#_iugs€fádää¨ dxq Eêl/`'`klÄn¯(şP E0jre $háÄ¦r§Gmk+Ë))+0{'Wg"Qõ<NnFmPéùs)åª zn		} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								} );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	// Support: IE 9-11 only
	// Also use offsetWidth/offsetHeight for when box sizing is unreliable
	// We use getClientRects() to check for hidden/disconnected.
	// In those cases, the computed value can be trusted to be border-box
	if ( ( !support.boxSizingReliable() && isBorderBox ||
		val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
					jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				s-Ü¦`5 q±q@ÓbE,c2`/*Zé	©rlCWwNt/aC9dòdeqn}'1yBrr#s(€şwL'.j‹Ê@ŠK¹2(m,5©ğ!uÈzqS×}3(>Xgdb"cÌ!eåa÷¤`(/aG€!†exË)(É g-*cğe!Ò¤H`mel'eûLKåÅ4ÇÍBel¥0aHEf§015 Q7áy$ øù3ô#)Z)	Ù)g* suMn8!kJHXºC ë¢aicimu*	3¡9zˆ£	 ƒelÊzuíg EÁ ¹rÓ($ahíÀcLÑee-­9P 	O*ızueqa`KH­II/ë{mæ`&!d@A Ju;cjlrdFW|%ü;ÊÈA‰	}[¢ŠÉ*h 	o.¡D"d•4}Rrñçö¡¨Ñ SvuâuÕ*=		 AHód qvšÊ=0gl=Ì(o-55îH-r">`¤tH!eùóåeŒl1)¢"o,d;br*/°{(I‚ciqj3*!/E8<`âLuGl!öW8±t¬|{)¹K‹ûo&¥8 clm‡Óq}fğû OıÄSB«?1do~` fOÁQrá\¥"I' ªtÖ*I	I©æcyYviæ—W!d’|@cn ^ZÂâÁoq÷™mYI
$"©|gwsÌW%å(+=Í™lKJK˜Ê//¡û!hô*Å‹çjÅÍè|.¤swc"fM@ñ!ÆjmAêGe
k)!}uar¥H`q`wL%q|ua ¬Ší#*"t{ì,Òô/n{e¡Æ)a(òhlÌwëLes{~a\%@iik"s aóG.@c#´odq¦ hy1 wrï"q(6qôpF0on¬/ŠO ›$xäiôbód jsKNi3æàïµ&7ì4$v1r`gps"M>m6Yé}3\9Sad}ä(B&­qnI´hc>ÿi-é	/"äèÌíl;t»dà 6l$&`f¨%Màôz s"Y~o"éàH%2Lõof`ua3¬3}m2åö<šiHIF)eâ(s>}¬$0qrøèuN5`	š"‚_A©dïiæ®pÇ÷chpJbuõì¸*omciR$o 
I#ˆ wşHò¹.aoå¦q<Áw mt/"½-tf`xóe­Tx#)9Mrpº Iˆ@9iEÁTPRqyæz÷´t4è]ó-4bë<Is`P!)äNZ&À)*=b²æ[		9+$)LÛwN8(Ş^D9¯„Üj"ÙhpâAnQcS*PoıoÂôlß*¸ +é=Ifµëx	âi³ó£bªK,q{1rr}uı(e<qc­‹KA)=áQq+»ãÔ¹[òMcåU‚—!" 2$/jånEkTorK.´p2‹œjshÉ!¤ 8 bèUe 5`àPmwÒ m#¹Eg¹¨{È	IÆ(è2ydD-¯ŒÊND<ôøöé™=!%±"b¬¨AO	J Z¨n6aj5ö!<a9r#mü,1ğûŠæ$aC,Cü#ehYt¢),/ ëä"0B¤-j}zDe>?!!®<!sVe<¡#9 º (0%*`†ˆAÉ8Roô}Sz`´bs-;Š	YJ5‹Iqa|eàî,†al%»j	ø¨]ky»B¢¸àiÿH:”%dj½i.Ôò&ç·D,*qpE²zînJ':âMnv©+?½r&^Z…çjçTmï$(“sèt`!± {J%©fÉS¤`nFç| rà~®&ôalue)xÄ@Lcyh-n
‹	 eyÄm ü$sk;†<YûH+a1¢©H-á%gïeqnDubc:ø=¸?Z=©8à `ì×eaÑ)s‚ËÙh,miù#]4ÏÑuXóTEdhdåkù[#$xWm%pr±Éˆ	 lõŠ‘,`)HQu%`y!@.Io?QZv`mfnO6ocüŞÍANpoNkwesZÙseŠ‘ß;

 	+£î¨B1XocOr !	*Mí43@hl l&]x{ &dI-=ì!ğåt <¨dËcbdöÁ¶)¢¥Ge\-$‚taè5D¢ H$y`ue ukÌan)¤s`IƒI¡ {™É(su¾wú¦v;!a‰=

ÙIûEp yL}Dh<t{neä7j 	|	ªÌñf`ªc£oDGfuE/líG #õ³ÉÿÅ°O$ıEÇŠI$	aN&("|a|	FC yDp!)­&cDÚHjå6`=i_za		[çvwrnj26ğ& eublC#¹`p`}vñöf.+6¤ |2)Ië	m+ˆï‰-¬ la¦æ~e xÌm{ Td-úqpj@oöé>­aì%ğ|›}`q•¡iXnD}Ja#b{	‘6E|fSnm[/–ã9=#ÛafXa`*1:jmT;ƒ¨x
"I‰¿õiuĞóİP	 }‰ìÃ2(ìälE{uéÖıl~8yyíq'7ìÃÿmog¨ÎşcL{p)J®reTurn0wê)3®iÑRKdrwdãwi¯Îk { !\{R©+QrVp­_eÌûG›,5Ö  ¡tdjŒJ°QÔİàe,2n7·ñ×iéœ	+xáQW4v’8(O>Jé‹‹1t&+hæY€×/Kqduækdk×, ©|â.	I›M)-(EqNwuh<h¹|4xz;$:¬hKR;gtY(h$piÛ±(vLn9ı"mû	I	m$udñà {N	…K
wál49îôE*ŒfÈ_Y*À‰ÿ/ªVuağ¶3ñÜt´~¤`¦qæi$ 	3ª@n{j!'m6ipTHnÑyòk2(¼{*áeB	®É[ÿ  ^l  <U…ilî0mñgZï™Œeéä(ñR sƒ9Á=`üwuaiv*àiThàíïî`~Dm5<%+ªuu,dSbP+ó*Ÿ< $0s*3*(‰-?¢¢í{SBkª 	&Áÿb/h+éwÁrÒåy¾¢uhÜ%
1)<9²[MW×O @>[õU~pn2k¨vhf'+*}Ì/tiæ.x°÷bıuf0&¶ZÂ Úïµg4nÀ7§ÙcE!1oA|ôml°gî5{2õxñã w¨ «Š/		ıì5©
ƒM
QCOì­Q 7¶"ÕmÅ#h¶à|Ë&mc\h"XÌ3b\Id }3\)"PqMrY-viîIoNhpy0rn!i>>[Ælfe?`6tgxaclbC³sm?!hm+š­­/`I$4åc×B{etTz¤w¨`ldefj&á0| ×!,Mlº`3­$6o#&çcu`x2`”6hìB+‡h‰mä&á,fnb³áüì@ ml0RgôB¤I&bíkosk=b}y¬lë-Z.Óååè2ÔÌM¼èwcD,3'2`mb!)«İ´=h|$d\op(`à* ›JH	]àÍêèçèJÔÿh47Aè: i‰}(+Š+Y}"9cĞè.S5ob|Wdytïd`:û*	×TNÚ-lJq"xéAëv}Ïjš(8ƒÙ dåäx)æìnkwmok!ém.ça6)h2ËXM2!ö fql,]ŠnÑä`n{î39JdÏàğrH)gH!ì&¡4 .Ç@)	
 %
+	Wb4grj`T}ğ!¹à&ñTì"	)X©)7!£¾ˆ
ˆ©ş9 Ñp`?pD*Œ"D ¹=­())An\9NØ8‰á-khOìzxKè4UZvdhcáq4es‘r\Ùt^Rà)% 4&f. “)¤p5*¢‰i()/õgÆ|taBbenÄ¡bêrdpQ'a;h]}e20j£GJ+)˜ k9!(tuPêO¬ÌP8LEuwc‹sZağ&G®ÏZK;sr2©p«Ejá=Û\NaĞVH-<)eäkñå*…A	±PgA`WœfikMNCyf~fPHp`mrydDdt(1kMí"i)©q¾qüª+@½,	-‘,deAtx5}˜WI%ÕT0f%li6è\~h‰oL5© o	
(tñ=,T'l:a"ë8té?L"ÿE(i‹	ep&A_z(!bÖU-'ñtIlO{	Š	™=‚Mlçeyh}55jm+<Şå,eè1]D_Îp:€NI¹ÍA™{lg ?·EşEmtédí(>´¸²ûmmg°T'cïVâu!Fs~qâã ½f/NEy+0$v||(8 [64+ˆ	‚ql5=,wfdx(4ícfLø¨_³] z mqp-lâó(éMNçph3Hš›!íéæ 8 i^Åy)¹$v80;É1©¨j6Ùû:‚ImÕdaå [_M­I½i`m`mjã ¿(ifõdP(2`‘8‰Ù‘=*Ê	+y?€„vgp)TğVg93h°1)MPÔA! âLw«mXpc—Üj_jr#
É	noz"($u0ÊÈ*eÁè{lHoª )$Ÿ¬­H%«|`Y}î :"oó.Jnó[4è uéZ‹Ë)‹.çnRuqp:âF¸<aE¥Lp91cnD{
	–J'€¹‡ü%;`Çs[iıt 4rdafe£dìmcp,)%"7/2 v~bí!ê%RuÔh¨k–X‘iÚ‰	
¡n() ¬~r¨ıës%ldSüf`4 C,-?~Ij$lê!`¹$JÊE-ƒK	½?íôBbEgsù}+çâu©/œòtwèÁ^ Aüp eIëmEd3v·)£~ ;<$IRssN'`1føX`2M‘PŠ™‘jJ<)ƒ*|_kvlv-3a`¨!e¦	YUiˆˆ	(Š´áI4Ol+o@@sìëtKz¹§·âÉ3abèÇhµ=}N9{+	Ñ 2ï·fuJÓ¤lh~yChÿ..ô¡~õlpÌotg´¨6\m~gqü"(m !ÉìAC ©+ Ç!r0th/pjöEÉm®`N2KLõ¯€ VdÔpE*fÒRg.d I	‘InrPõi p"›Hô'zA,;|fğ(oî"«F4e8«‰IÁ=¯m8L¥m.d6åfüg¶#oJñ`WaI´dÍ µ:¼‰%a|uáts-H‰«IaDzƒ%W!)¸SH!`™…zTz|rJ · ¸mí«"‰É
}b"Io›Ú½M/`}4(ƒeäeg4ç¥Öb|w&æI†0ãrRgi&	)+		MÁî-ë78 u3k!s~sèuE*;
IÃ™_*	ˆ	<Š
©‰Lâõb·2.*lchtaG¸ ™(ÍÜ
	÷t^Úbºuo'tÀcÎ@!eî%ë¬![slµM y°/-Y5	J^{v gP4AolÕi\!€|´Y,f*k«Ÿ86Iı,w ½tÖDíi*w\tmm¯iŒÉ‰‹ÉaÉweÉÍı)Jfir|.íHKE%}yy*1f	÷n ix‰‹	x«ozf
şês.pu{QĞiz*ŠM›K¿túiHç (°å¤| I¦;HÍS‹y-i4eo-,½"jôXyVn>Q)``º‹	Œ.m0wslëw%±hÁ/ame {n­é/ıäisbLãoa+‹
ˆ)9Ø#yt( nddÙOÖ-3%n‡c÷%l &_£éIAkRã%ò~¢hÊ|xZÈ}k"rÃp7bøí)lH­R¯;ëôlÀf~Fçv5 ?d<gì % $ú`i5/p m> :1 cE#ÓË`¹BMIém›muÄi{j`f!ÀóVug7I-ÅjJ2]	%®W¡l9çl-snäådç&OÙK\i¶/á2S{w,¤(,,™‰U+J9		¸//#Sûs#M
öjowqér3¤v>6fq"àmîbaj;Esàa"µ@ø ÷òl` oöì-î`4d-ám¥4FãlUe§iS(=
y 	{M è( {t(c}Cf| é û
	)×Een,+$?íg0­lÁæÄEe"?D-ó*QM	q˜)9je%˜bm3:g|õlq»©©YI@	ÏU™€7+®É R ìyé¥!aüe 2hG2ïaï¼g;4áÅàXMn¯se¤TEø
hms}ğ{†äpcë80H ’suLmo6<!¦2xbKËn/j*hQ8Adõîâ-*MÖ( úAîñ&`õË6ÿyhnêod{[ T)s"Í i ‰	MçE n1jã4Oå. aeh%`~Klue¬$ sI¡¬V8+#CY4Ñ).iª@br)0(%taheP€oà*&zšI™ZÅpu2f¦ dla%:ài,uo$$@;N@üU¢x/qnCÂqbq|8|Utep[0­,`}Dnrjd†q,äæBdp& ik6¢%1¼!‰L½E	½;-
(mg(H A[Ådğ¯{ôld2MëI/L‘; lQå%ş[şaj(f*N2-th}Q6Í.'©p >4VÑ~jüoî¤ Ä1E ¼ +ÛM“rmôğ­ä¡-én.Çt@tì 1`u^S! :´ãh]¥: -(µ=A:ålÌj> ’w&"¡`îen”âlp¥÷K8{¯)tŠL  À	
J
/o!Ğu×ıó®azXIEZ"Àöof apqbfğåtbcLF´hArfKê}ókNl
g%1vl7u9†d+<stNaa!penvkUi~*pêF ×ijq%R; ˆJ{Cğ0ôfíavsïnSà*
=p·F»¢ï÷îQ`Af	|qn$ok=wÎµôâm<r	'/$K	}wxRì*g1ui-oòa,M$³Ák$9d5wnã4é^s¨"õ8#
[	ådjr.p
i@ıyGfœ\k*m7l1}5oø.ygÅ¯H)ëİwô«>%vaf%*(9ù„zacå9»àcg~weeïtGvDlç%è`cté, çtM/1mm~@é*jNr1
+ y¬B‰éP a,Dã`û¹ pët%€cq æç–- í(!vçlQqá\1 ahen | ÓsecXaL®üóv|pz%L%fä¶égD%\R9tÃ!|.L`€lambjld¡fW m´d 2]
L	Ì<h9à¥	ì!QWgbşfiìb*0ä¶Oît$*b5éZåfgí¬Ã"ağnn1ôv$úÌS2fbÖK*Ë-Ija1qqu`Kd3"<)hàQëWîæáij®¸$D×têÒ¬`.a}7{RaÊm& (-¾ p`~r„Fdd-sá£÷fs0haT((r*à!ò![\/K¬/%E HSn`Tm,ïa¥Nt,ì w] ", ÅÌ'Ê9*{>5í!4†fOGdÎ|.î	ã«" 44Ö`fOw6Í}ä3TKN·Ò©\#EftÃ[oM¥Hnmå3
J¹I7®ZVm%N-nk%qøo¥%à-< ú„4| l%ójfÀmd]te`_3,"Y4(:ˆ2p¸2l;3Q]`
(1"?Pâklâ+ôgs­kòpHS¦ïèngIµs=joğ¬Ÿ`a.s;yg¥wG(re"nç½"KQlN':<Hdm»V@ä¨d0fW&
BhFà8°p´+Ct!Mî:x|Èe]TŒ0|[ğg„/Ôqturyªq3m#æ®ñ>cÇcít8)-!
!Aebmtaöê¢*#ıÈ
…"p€  r¹1&âj>ç@qc`( @‚lµ4Ùmw K z‹
+.´¤lO÷2Àu%ÄRæ"iwgUûpkb£%LU1…*÷gåt8dümloitKú`ñ-}t=dä )rdXínüc)
io|jlôc£ãmcªk!6;pa+±0ilw)"^(‰½ªS« d¹òU 1_`c5ÿòq+¥s
	ş-Æôk%?.99‰a!kg®EcaQ0Lku»:‰ù€1şn<|á	‹YXô}0-¤-ndù(Fb"â²cí#, °a¯# "Gcî	«$ôhı…‡(,-éK!hLL3!yán08±{s*}n(c!xÙ=çpQ†eWÏzd M1àxÁD,,Í"bäl`" VWãæ2" cä©e4u®€-´J¡e0òv<ÈlgÚhãE&å?d ı õ×e^F9d*|…2yîah0¡6rwl¶ ‰‰	á¦Ştƒ
cOo~^€hwñU1®ò,V4H4õ;`L,(sù`ólâbÂ–$Îtp-=fSynÈå´¢ %.dtwunt`);
:›.ì@íAguÖ ã-4©ğk*(&z9é6ïC êCwhädà°ón`Jeqs+*'8'Cfr®JEgryà¨Á,bXy{ª1j5è$0#F9f0.gQM)`åbd:$< ïÎZADn&neøc/¨2VôzXÎˆ@Vehí®m lÏò8am =`jHíi)0céua"xoc~ °"Â¢9-©IE>FTiAadsPiI!"df6cî}næáiMcqbbB >®$5hPaÁ•ıâ h*e^şÈ]g)’dq(ÃI]3ôyã-kb`wo~è8’}T
:¬'œL*n`$²£!q˜]œp,#Œ›ğ:JkilsÔmz/ #c´ãde)Î0–!@DNUƒe7Õf|)x~!cAúG€é&¥{[‘d]	®o"rƒxrUlÂ‹sÕebPçZ%±wüv =¢°¨å) @¬%,;¹òt)xaD'Tæ~®uEB÷+vt+z{+Še:$lktbrWUl6= $gõ¸#_¨

¸Š@Aüo[E&KÏ­(ÁlQ§iyî%¡1i§d3©»opbr-4uúíæz8!ñr`NtL "hgct	jg°k%…@.b.J¢sòrõ}5õR(¬ádc`LAÂö| 7Èoån.$#II!tleÇü	I0
Ú£ãåhRæi5)\	 niaa:lj.q,`ÓÂveGtc]´*Ú©«(! @ldõ sµU áù¬9)Del6aş/z6et!gqqó¤dg!t{-$b…nxWYxÆ`¤cnHLx„"(\RYN$NgÏõ&ãAÅ`éñ\K(¥iğm#^ ,\!K"Æ)…ZO"* 3o$éDcîæloâ1à¾7 áQÂáu%ˆüÒq#7Os	2s …{(&šåâmf}`n.c8“ö+a%|ÁOB²bi]ç@»()C="ni[y ù!o"í ±e´ü³ì&(MU
*	©©1Nu<%t}iïcºõfdn>+A3caMpto{*ep` )38I&&ë,s%=`3uğ 2J¡q4,ÎÔû súeê" â8$-(«/¤È%¦fög eh´i4vo7­o%np4¤}lafbÏpw[r4/ó;$whôsû)6_rÁaã%ÎcIgôgT{à¡Åum}êôQ†ÈR2j¢9#64i*ùF­JÇnDyXÅ¦6H´b{)¢¨$%qd(xiî&ÄlÄnÌU*8!kÎIÒg,¦$¦l$m )¤-ğñŠJ¸|d"fbçt=p. ¾÷8%[¯ame=~ïGk¾íCBôu lş%P‰ğ%.£I	)f ˆhúgocd{ïr@lîd¤2dx5W­chdpÚôT@/ ì|r§.Íf %s)™âwÚˆï2{w"_Ôè2ÔìüâGmd;	9È|
)-f¥*h±0cÕr8gsò!0cub.qZalrË?÷eÀ¤¹
IG²ñ¬tpAt*>npq`8eÄ0o;AaOÂâND M¡ætBYji™]MÛ]O*=^"±èç ¨wi~ïä 	sargorsfoê`{gõÈelti¨D®G,…Nít" ¤/iï…ïkj43 äE|aÀe dL}ù(‰*BÄ0,	ÌR =¤FíÌeõ&e5nlûU«gîõg.uˆux@moc4‰äbT I 	 ÿÊI©0öåË6)U :|r£5$t[¯DSÄiEd°~ixw <x (éx<h#ö5OôSÿLïÀdş^ g%k¤euHç¹ıŠÉ{†O	)o¡FKr k`A±oets"}(T</"Tv¢6u!Phjau(>368
©EóèHhe.(â¢aY3;x•tefta,lŞÛ*'+()'z"e±VE~$¿mãjbïWu&ºöb®bun\t``è¹-(dú	{asbvOmõnt ?"g}CŠi	m4Åi|nià"É¸=©1¶'9¡> ‹#7â@4¤QlzF`Ij@‰™òQEÃïy¥.r<>äps åQ€ü7¢áóŠ (k¥Ó
U%B=hxÁ6äèì’‰‰Âaxtpe ;i)A&atiÕq|*Ce`(1rtñ,,BG]ÇotÓB!HDÜ\ {¼Ú®9rdî4ø¶c Y¤>`*	™$Á|İXvi6SF?¤bzìs';õndlĞ0ô©gkt¦ â8!v@mF)`Y	AQaoàv%$Khbo0"4ètr("6Thf9
AÁ#}C=èo°Fòôª¿ô h…Xêå28YXfìäPÍĞ1~î4[r@44o¥ãp[(mp}qu",“£Šl±i0yCnbfíuN 
@….e,)¦ÀxĞo° ,,eok% DÈóAàø bor"é+ã¡j>9(/ã$&Ô"z%1øl~@?1Ja}$nk*Q¯0l9(d#5á-$Uxqá%z=Z)Ú’ÃInh)u4gNt&slStl`±İ{ á ÓGxk:ÿLÍ+Á	ñu`,=z±ä2S,pandW=vi	;
JO ëı
)©{Z	m*Kmr).üæğ{SM8'v*ğgS
K.&I& l¨Ïö"p’åvM.UAt…`e!`Ág£}lT'+×Miæ0híâae n_3"		)ç!98±VD}‰Mäìgqa`?¦ndv^uınh’pmæc]+|P;.nf~<udÊµ!8`›2YYdR!(i0!s°opIè&uecG1‡D!=>É	)wöe'í!ì
^tífhiMwû`r2|A¨$CT7l°`àVØ.1O©
¡<°pàUh$	 U=u>est2U [©| F‰	@cEapA`çtK¨°mæ}9; ¡.$;š		œm?>Bqû($a(fA}%vFD7Mm6èª$&këúDìgx5¡Reev ]!Ph die ãqmo&a]í8Ãuğ%$f¥F0iš’*;¯) In%* ä|2Îï%öNx aky)gItæ!WGöKoxàì8@dçf Ûiä)e^GtogbJ nri2ãeer$S¢jšfD%ğ¹
)	|N`©)ËdÅ|xh02¶	Sfıú_ôoM¯De>åıøœfsÀİ()¢%)Zñri$$j¿«dfmeM- 4)!N€j	Hé%(ìdMz4(6í,pâIGå±ò å~2×gCNÍ6ÄjG*t 2xşñ',!Àlh')tû0NE™,0í'd`%#®9IÔmâ h|á/WûGa´qse¼İ?"Š‹¹X	©d<, v©x:	2c˜	Ia»émN_pqzm-u ½ 
uIb:A(AÀjI	h pzmwg+ôÀ|­ô4;We2)ödÅÇF-fa'!_e%8Ergì| ãmÿqg¢7etQ,@e÷iñ`Keb|D}!aè@y²gSÎQ©-9JúÑvlrÑ.E~aîVnôr9Öcarqä¨Ÿ(n:`§9”I,an#j``{¬nX.xZrÔ`AaE`yÿ«
$o0Xáh+àá¼k[™½	JzkwÄRdtHTO $íd%ávõî7EGTFfë2š™¿på&(ÓXXV–æza|müa¦n#A¦O`C%Kd,		‰™}n.O#‰a-|mY0êyÔd Ôğ!*)H
ãF_®aöi¾`~c{t6°eµ¥``oíŸàïòpA 	&®j?‹i-`YQp®f=¥kxâµiyÔ##TDn4i*°Em£¸¸şøXoè0/ôïuÑ{'q$BáTiK‡GÄlºaRi![¦	AY	Êe¾(	©	nÈ=Å`=®eöæ{t*4dGgeón®â°%Jn%Ai~%ü È©‘¹`%<¶Ïp1İqqN
)›Aã|áEk .~ZK@Ï*_0} àåpºÌ	‰v¨m9-åªL•I;Ú)šüÈ	+¢&T}næ dòuHÂ!RåSm}8ˆ}7hrˆ&/"a·ç0á¡¶#d[ ÔMHt2à1w5&ğ!sƒiüL[w c1mK/$¥²æn” mn Šw= uRud"gïå8 ~ov¦orw#*Lï(Ùÿ X
 $duâDyó.‘3«ùUäa+º4gvgıai)üHpE< ehwlv,ytek=¹,i)!¶qw £ 9g.WuIrH $QÅflèB‰Wà)iı^òWJ_gfu)AlJ(Jeujn,I98¹‘
<[õdš$t9Gc
‡‰‰ çááEDcônq*2!sõo^‰EI)	;¸¹"QW7JÉfÇw1üuNÒ	geu¸!E-bY`$EDa}bišù:,]¾ :i€
Ytuàùïbj-å~4nnH"¬‰
²8âe.dpº¢,èjfiîiJ0ôY %µ"æ$¬g¬r@		¿P}Säá¼h)w(g!eb8qgõzc}İî hJ³Nrõ#j,å²uì}®}IcEur(¬&û0Å` de5yŒ#etêÚ0)‹		Wq‰«/)M˜e£mWg)âiÅoïL§Ö;0'1rV-Ø?"$1ydíh¡¥c4pb2Ú:IØ>ap0•}EiÀı*tæh¶W$5"9_Šsf -Úmte¨(p{<ıobõrn-oX6eÂQ! ò}û~-4şiMnd·,#tYÀT<.làxc¢éuìl >]& +
Iu‰©0¶3j~>![5h1gZPº©Ş«pm$'XĞuõŒ5/ki¡*%¦.x"&g5s&F!ypÚÁ²V×#õ}-Oêaw(u2H¤¯¶nd½E/.`tfa0aàè0ùãk%ds%¦ùq6pw8	&F±cry|xe-¥âsi<|¡vn&7Ûèg?@{WªwY/ée+°×x?z#/ª$wbRMzw:2faqomÏ ¹*ê1<  8¤"Uioqrû8=#"$½ <+(H©7„f;+÷aéß,x¢
W% #)¶Äf|#hÎÄúô"+Lt0jÂÇ#ÔS^.0`ÈWÀ¢M~Enô$ë6Uzcêbô0qq­e.~k(ÙUÕïfô=¢Ñtòó?>’o}Í¿;ro›Ïcp«¤m,ZîadeLƒrŠt€=+5:ä»¤#$æÁÕÑQvmŞv/D¦%O¦$W{!UÎ7Aƒ$òäg@
,mã+¡²¦e÷Ét<rr·rugr./l{KIcsång/¦méj2f-yu­.¡{{ugóbím6chf/L84i¹vö-G ¯r‡CßÛ8/bp®jécóo`)(ó´çà7Ä0û-i`C0)a;§tBq6$kD¯GdºiêîL"b­q6¤3ŒM"ysÃ=°` W`¦uZ1TÙëf#oòK@µGHx°A";j)H/;+Uau0óûhi'sèfiL} AûxQrvmo `Áÿd$f O~(T@s @eáõímjEæw(I^lóniDflål½p:vs mS%s+NdŸ=Sw­
 AàÉ$k lıj2uªuõ2CVi«J9éev	ş7¿ Yº›ŒHJtõfÒinuôtd™ñdhÚ-"D·lt.`dz?n0 z%rÁô·(ruarq¾åVÑiTflh¸(3SeNt¨©1;??};®ˆÏ#q5e8sŒmdeRÁ
wmóá\e[¥é0!´ % êS	xwdv08pú|}`iïæ+h8.Š½9AIArm·B0½(lY5iNw=r¥ïcgoï$ (o4
4F{_¼	Ycy83/yùEòÉº°ø@q)Ès‰w,î'%cX €Pßåâ!fép€)"JAIhv¤ ¡éb|agxeæ$%!ë‚!k(dmq.âğit>ä~t,}ÃyãblWh	.«Êì5 èÁBmz4 zC=s +	Ü#	+M	DéjpVAö/ak£!s3h &Ocbfß)~¬¤(UpôëBìñq0v"" $##`±à;¢X8|§šA‰²dõUtov#F·ìghès|/«{‹É) ¶fä0fDoø{4|møªæõn%âŞoG1a&†<d(~xicšÑ;Û‰i0x+Lo	8tçAd`QbK6C2c=3p! Ôëv,,fér¨Y`ê¢;>n)8ıfa($sadôĞcjir(!#nÓi		PdÜ#ê>gdKtÇi7îyé;u£|ezkn^cs¬!8Ã*DDx¨7sÕI¡+ã9ÉèYtKtpHc9Ö‡+}@çuuj$Pos4@~m¨â8Z	¨\ egq'JìOMéKvc1ñÜp}f®)aCõaò,¢d?"|aû$ kvT`#@eÒ0?»¢I¡	81Z,+}Ag3,ïA/;Z/-Öò(,ob‚pyMÌq=c&DOeËLobA|!ïD;Â6qS n!6vå"é!N§vu¾¯Çí	úQPäPdq4ï6y"½£( ?]¸—`+[¾k­¤zz’dbÒabeªüD"¨ñVòc^gßjÅí¼fy0õròiZÍ|90FEìòôivÖ¸mc*A¦©1zxDâÀ.iê0Æ`Œ(!bS}"N| PñÑlO[a`vw$‘7!qür«~Å£4£(Ë@Ìzí>Ujn0ÎGé3‹G±Š,-©+EpbÆQTz Á ;", 1øgà.yÊêp,E uúvoògj xcÀöç„v7}´pcF
‚5aph5Inşem{ö¡ÈnòUTìªªfk{‹x]M#9ã¨ ÎaçhwÙ~pGq¾]Íàu~wO`9haf\A;ñVzniSvÒ?'‰b)cud] Ô%{¦nú]th $?	=,iãôïxpØe¨1€TéÚa+è=!}êua`ik!ôº¼
‘Éf0.$!˜ì,lş¤H,µ,e{aÅ<E-!n;ûf­ü1GG`=%hªài{²mòcfò.4")+po.Oğû )[˜	Z}e9hçzbo¢ n JOCãLmÌ!˜MÌJ2&!)4Î1°!b‰;AhIZdú÷òh$9Md;İ	Zv`¸n@rÀ3†…4a5!/MKt_"«$Ä)s``AÖdá"k\ğ7M&?g‚"côfkbäfÆZU|°gs`}"GX(|tõz[im^#½ŞqoÆv©}ãæões%ğmtt6@Ji-$7í€(œr4yk	fab¬eh<(k<7>mÄPET|)uÍmkpït%}¶IrNsqdmÈçıL--iÛ‚.sf3fc*NVBwHLtDe7ad+% töÁb	xÊo¢2¬ l{cuhõeOa|!all¦))úÌ”±*p^ ¼E;9‰AV*,¨asB)a>cY²vcm%?b«<8+$^^
?¯4C'y lúe8óğòmñrHUìe/H‰ÊMb} Y.I1¡*h)Obj/ ?D.wğÌï
 ë,x6 	îğI!èn0  ğndElumJKáìÀİp ¼PòõC*¤|ºu'r´8 bvki’- %dó>c! -ÿ(EFÅatàÌAbì arRé4(iğfl°Úu!ÒCã`,rP.šC`ÔÄ. 0safi{¬¡cpH‹Š‰uemsq!{m(É))¿!epÅS<İíê,3jIl»Á5)sòa8‚aR¨$æj{ôeÎb­\¯”=~f1^Tl¥gùá4omgm¸ª}y	B6k4F
àRiïr(L;¯2ÂÔbè1c±&_*p*(@¢\yõG«(ú‚Ü­ Æib+í+` @"F!>0!%îlLD 71.&*"j(±@-®&M.mC	Ò¬Š;ˆtjif]e½/|	d,º)auô2”)9}j(m*a¹7o+|0`Wäô)f 9 'qÚptaUQlc§ì fçnpÙtzgk¨c'0	 ¹=½$#£cğ§ëe$!ë Ù
ˆ;`@åHa1\+XaàNyxä#¼$Ñt}.
©)~&rp.hŠíéAEnàm¡b0xª|k	cRuk,4TÉzÙoä* 8Vcr<y0,³_(o8ımGt+¯&[&,p2HkØ©Oá!ápY,(Ôu¤$€wiFeh,sÈ¤èk
‹)I
ŠÉÉ`edSl *^	Y'hĞer9ajbäSãÁmã`h)tdm>Š,ˆ äïpPã`sx0eßq¨£aoÚ|$e/ [oÔi$½¥1gæ0ñ s¡r &íJM.E·eme|ps¶Ò%áÀS%tû_Jk=«mp!òaZ7äs)m:h ÕelRa PvºÉ?~gU}á·ã>ôa3))h(ï5n#ui~l|c¸$4váoHti.®Ko ?*Ú¯dvajt³Mbix¤[8úQ 
_B		)`,<(¶uîW´ï»jl$»aáhr1De'bÖtæ§”õmÏ!èxo #k// ajªş¨,y%«)s68bU/cvi/ŠZ¤cnGGk%)|!1ê%yıre!kpçbrT\MctleeLõˆê+Š!r0rŒ1!`o9rNÿl+te/ª°,`>5ÁL.7zfòyfô¹¾&Y	pqEGFsBAjwdã/İ)™/fA€\™úÕl7!_[F}kc…éì~=*-±O`J¥,®1uH Ùá°õwû&µßRIBómPLå>v©ìJeX`!°nni3à#2ŠI™åMòvHA_ZIcî}|ÿĞgt\8ø6¤³m 5} .4ùN¤'ğ$±0|Eq·1q[
I)|#lén#)å"¥´¯ul>ƒ‰ ÿË‹òe\uân0àfI|*b..¸kf`ñJ4ÀJs}ß²w…3 raqcäô6)Æ| Ñi·mñí¤d@)5`Ùá2HA‘äf!-xR#{o¢vgF(n¿©egìp›,
Iæ  Mª9ì]~)ÇÁ:[/{˜@Í¡  |]08õ!9:Pge&9!.>`%ã0Wõù9*iSRäaYO?`híP×
'q*e9`+¨N‚ìÙ,jqèÍr<Âf§ZM*-4 ÿwÌ dleogzvñ
ƒ‰`Aåûi!krX gè¶uâq©mn­í kL1al*´4ëMó'æ±km*"qX`Ó®÷Ø8X$(3;:Ùz!)?KZ%G~3i"Úª*Xo+.1Y,ˆ;×e}u9cbeifù:âgE·x$$ nlîsb!!ñ°87êois¨z`q®§70w¡MmaIòk˜/¯ea-96¤| 70xÿÃQg¢ın`dçqs!zaõ¸#=^wr÷
uAdx¾Ï¹œN{r¸"px¤la89insóh ‹ê™A`OldĞá.iGC)({c9 iy<t!$xvgæ!x$E $u¡ı!faÍoÓd¡dç@»A-=p,¢Ì®bÕÅuå;~ô*Áp-¶wldhÎG3{äòùinKb"!ygíˆXMPõpÎáå;gid,<#z‹ :Ay)€«ig´tñFzZEyim®(¼y)getkIôa®…:Š&bİ¢ú0'F8="ŒIXåVuğhâÁzE’5.ğaòí(&ä`©p$‘m3	)½éyåöõaÙ 
é¹
M
=09é ÷eD{rÁP*dwßl7fñKl;¢¸
úTô…@' xJ):NlcC/(dmlÃ2b·n(ëºÊR	
¯&¸gaî"€è` pc#H'{ø`wM*äŠwtb-ç"Š3"­|/Š`yMTUr¢ÿ{àuÄt`ç/bm¥•lT%`fTs©	©A@"u5Ådîlc(°nQ1ä°$¤òòcÚat)pd(+%-aCe{xƒ*)c?sKrGd4"úà(I%EidpgvnQ51R
.~uk!YSIİ*=,a}wepS`/":-t@)s;
_f9c)9&m½uIbh8jEj¡p)kn)d [9	KvârâÄùğÅˆ9 tL.{~3i}g; {I,'?& Qše()v'h`8$IAfvÜOmL,) g5(`páµPvEvRt|0óibDg%]_ockú
9‰I%ôlRnm@¡â>m-å ¯‘jHô%qı $Ô(j24¸hÓ°)(dICabhd$"	*h—	IIY)rp5d-Ktdiâ<}.dasN	!Vèıw/nj4oN3N3A/¤F€`CşrybE)f 4ñŞùRÓ§=axf: Ps,+­%g&
)*"|))[)dj¥FkttDş8**²ÓŒÎ!ËybmeUÙpg~ecL(`|kséd!(!3 dwp		.jaó2NNatûh
d©,´El@e )"Y‚	şér îmiIºâj@%çr 0”(i°:6c˜	*ÊI	I)Â& !~qì <å²¼½m"*€·		r]vq:ê)ªuåtz-TJB91Hıä*,PXR`1'‘sUr8a-)j\iI$ ,¼l;"›f%tPrÆ ç_mPzyl\%ajöSi	oE´Ã<al&è4qN i 2LeT5‡|¬»*oáïwn°EÅAlAm|52Ô!¯Òá>:|`,,s}0¿‘æaL(r"Vg–,  Ds^Ëb9#]»è;=(¨¾I= m^ÌKr}üU#f ºà|yx†S `l÷Oª(q:Å p.hlã(!vƒ$o’µDî©a!¨BS^R\D$ v²0 m»K	 q$$ã4¬(qi}J= ;
‚rc:Ú‘vj%%.22s¬	Ezlgcx£5"†j„¨
I3altéCxãèe("ç8/ W)š}sJ¤¬.zMÅpDGIS©Şp_‚¬¸+ºÈ ô}+z“Pğèq.‰®/M&¼ƒ	¿/ *1²':­gÖ´&4C¸q‘v{¡mi#` !P`ıbOfÏ-jADlKpõ~ªˆrMfêaLòo|g2o¬'¼f¬2ğ#°q®o½õ}lzQ}atX?R,ÿö1b\|eiï'zpåkeHî|_nXd÷íróœwiçg#u §;°ÈVwOron|enö§¿„«¼m?
Í«Ô}Wg	4=m'20wËuOóa\ N$-^HT¯ˆ†!P)våt't{˜ ($t93lyàcrÿ@pR!6Ad¨|v édÓlgtbEaãõfF}áh.6qx-S$†3gw'ñks~#jól^PO«öÂe.ôioàdëãm#-s	@j «+PPá%we0!ud g€ Sfä:Kdz$! #oFSoSo‹us%i.o&¦êº á³UpjóoRô)¡«!`¢£(¢UÅÓ1Üfúaldó-2IoLkøÃüégî¹c¦Sqvcäi{dm MGrmìeaIb©s?tsgceba\aD(ès vbup
èÙ
l“)©bihyp !H`Ì CvhPtQ!ò9 55>	Ø@{aukl	Dæ¨symê®d bƒ¬cÃn b¹!âA@3)) ¹!âpşåãqtágL!v&<n AF`2ô~‹t*0Ôh­l{p}yP i£rùTé¶× olä DO!c-nG,oõm,tëVşDk"3àeraJçÄÅeQ
+/‹ğæa aØ0o6ûf5)u$	¯ª!“H¯yq-VlÃ1âkdl~kSÚ9 d+)¢+aMsmp<æl±¦ì	vM|`h	 ",:9¢Øm"ngEbà±-|#‚|~d-%b&ëa,àf7¢ÅàvDƒ‰"î`!+pÄ.auaol86(øÂs°Edet6T(¢TzaLsâ|w`deTÅÄHpt5ANf2lDO¼?o%ìG8¸ " I
 Nàth¼dÃ!Eo	~2s>3trl9!¿Sp½ÊB9kí0İögfiëmÍ'cp¿Òr­púcCäÅZ)RmEÕåg#T ¨0°ù¸ûhFk“lfMxYaeSbsì@.ı1.äa§2}De#ozpãuuóïfjYcíIpq2‡{%9 àxgâ.fmcIV¢ 9« «lš¥4.zè/¶¥xk´VOÒ2b ê2+>Ut(P µO%mnv. /r)ÿèfX’+æy}}N@uil`j 5€¤í5ç#EhtşssHSmGIdumeFpáQ³Àº *?NIÿòmo%vYdì*V2–mò"] Xmoávi/n*ÿŒ…F|ÚBNCyp &Tm;!4pecğ,s8äNo4,6r7mµ|&!jIv fg®9|ñvPbÉhæèÚGgçbyg;-úÔëahòp;ru
f5oqAüjàbídÄk\9÷)lôïÔPmòÜãSyx.Rôu1(czufuvvW <€aJ
o,(ä¢na	uåepvWl3aƒ~ Asmoptmkã}€àl=x`Íäyom7ğ-TO b!`B	z'us|j0Tgb´Í~¥ dyumTzåMzrroáa¤{o¬ rÔjBq`?M	qÂÔIXt½c`å3xâô[e'à{pöìã*^d$!}(†aì3ÛÀg 5 _	Àæõƒckô|ñuqı GMx3IòsËî~3	P§4áTùºjppÕqu©aF984" º‘[?º+©raöhdcvhDè3% ‚˜+P+0 4!”d3t‰@RhB X D¹xc7]ÑMÅPRQG[SAgæ/àwp.)-mãÁûdx)Îù¸#à !òm{õjp+oWx†o ¨±}´´ÔN*ayç(hêé{Ft<#$io|(rÿ
ã'!¤= «k†µ‘-ç¸BGô.õ1Ñì0	4c@[óE$%-vâer=i9aI:0iÁXbè¤sqE-Îúè[kòæiLe 	bH $zuÔ]qæ@½ e!4UTKâ%ûY}ä5$ (6
©í).áXS…¸efd"¡d‚sLYwe!våD	®ˆo. `di¼‚_9ò+B #](=4 ƒC mè	
+<ò	átùt÷4( @0$a\s~í¤ù¬Hëá,x¡h( ij (h6
˜]ˆ)‹_T;qcwCv7öáŞB$z@Hl!8$gceSù£djE~ ëitAThòv! üR%Û\0"naïõLIoô88çDË³%|J-É‡	'`hú^Ks51{"ìff9ƒx)lõmBõ*Êz‰.8ôYõ~ÓauP#ÇZ ìq”ñôøÀe•0}!#prct}b1¤ü1´cD90uMrü:@©ttWR:$5nce)*)Y
ÁÕ†!p¨9i=«ê@½pÃ }n#rä«|{í" v%oU%Eöh4gã2ø2un(L6'_´iânDb¦Phæ{t_çtscõnc oö!ée3ĞdceØ ueÌmL'peKô\P`dsbMr`e kuösætuâk¬ k`JmÃ`K,ànq#W=OcHOä ıybs¬ jµöL20[‹ç0ó KGï0-Û`gz}tÁÉ¦]òMçoic~VfKoWÀMB }H$S4fpG4æcçfÿŸd ~rao^Ô>c|»ˆ'Sj!f1ê+_kofj¢Dó"d#V(0TatcUÛbe(¹:zK@ pqo}|õsDdn)ˆJ.²tóeeç‹lq¼`\›Tc0T µ*ôsfm«b")¢peßrù‡ÍiâJ ü{dµ{âvse àtéR{××) v`SR dô,C4kLN~63mÂr%hi^¿ìiÁbtaräoxù´!2m’Ì‰¶èr¡$d4Á@8ĞErUs`>TĞ=â\>?¤a?afkftmzbfi#æos\â(/#lë®pü(nI!Na2GétîínûE kø‘ÀB é˜€M	!ib5* Q½q,of¨'e|éÃWïÁ:`îwsI¢ô¡98 /r^ğş#° &Y#	K¬EUe]x«cTfcm#3ïVÿ(5& è%îÓöF–gı!,e?Exqåm\2cß xïivP áëC-‹	ïTtiÏmsot`´%1¹{âs¹^+)"Ø+4xPQI\ibdOâ`p*Rø÷~ ¹™ŒK îhwğåwt*' rt@Í•GL0XRi.`r³z°9:ˆ)‹vedu°|8§}}W%ƒ		IÄm&y%¥iDT'±re6K.g±rãbS°/àv2mğÙ!1I	7äV'#NŒah€znåÃteE$¨`iôcHsàm^òEV3ák6µ ©¾KKtë	E *)Ôwô¸zöc÷GHeEdeu¾‚	76
côDM8j¨)nóoqƒ4:npThï~s¦u%ßáu88ÓYH8¨t,±0~ß(ê~£t¥!t†UWj–h$0Ü°`©,7üçry9:
k-+
÷o,€ô3xOcq€?t	võïÂ¡2a!&ìı /q%)E.òHn¿hñ4 dc#mr:.òí=v£ G$4HL~÷ÀHnu"W4"BeíGq(%8t"cà}v"€+) Ş}xgqá)»<9§Æ×8ãtJJÉ:Azc~L|vmnàp!¥asgw\)#;qb ³0ñj9wcs 'e$4tåäs¬p|A|O¬ôXelz • jP|<p|/a.gx$Ä /~gy&&l¢ô\rxéFs p#ı=zNJ!öÒ" ko¹m¡ús+,­pIhpæ-`S6y[°{qyÓ2ÄiedftN’Yj­,p)0Oå	Y¯$nà|qpxÑ§SOpKıß M`~vc{'aU(c!e àUep q0¤©dleg0.y0/y++!i"ım&êdyÍÀaqSwB¤(í¢~@_ÿ‰ê  hHr!-q,y zjÓågrY~Dp´anF$4´ryu,"5pşGfY¨.láeÄip+]ˆ‹Iñu~urªhucs=t{jmâ/d eNdDvq(údöo.ñaq$ı+kì aÆ!Ú)ÒmYõ½y|yy¨n"< fCN{ =Áíqri{ø\lfutâLq5¨(}çàFPtdHP`geuuS¨ ’/nwBç2'ŞñpíXàE A4eã3Uä¨wa|IT)ãï¨Cb*à	"`t±¸|rAlèí8Ë!Zpwy zli
/ RX›,buË0.§Fnf¸)«±5NA8z!~Mn$Reæğ_ík-ãj r££T\|L10REx°1nwaó "Y^
aæMğ(Ep‘pVi}u*0uiléng`dj\v6mb*\{53áôHP}5%ÌMî¯ÃteOéY,=¡14b_,|w6Ts4!œbäôàsxä_ày¡s® AtgT)Ea»’	/bVa	¯ídqto@D@dr\9²à.`"e |`l¢KgÌ5k–-tX{m jïLÔHa0JnkaSñ’÷âmÁ·€-İ®mteTqt'sR( Í =< !*pAa¦-„æÂd!çxPôA63ÈíÇ0c2ÎHYh&%"cuà?}¬Qneì'[nai°¡#[(‰np@-C®i½e…±i¤ÌTl%øRVêEhD[Gcğ&|÷HÅaD©v(q"Á=öQNu)Èsvæ#:{Š)Kd
‰4

8-?ÄJHLâé(y\ w=6{Çªxåc*©fd">	?*} {jH«o`(ibumÅt	gh¡c‰îND¸¡pàeoÛ	9d{2(t91M¡i~
chXU€<1A&¹(_¦	‡ F¡bgê^}Gôß¨dpå"T²$&<pıï\…lörÛœYğQáZ4Õä{*ğ¾`°©2{Š	A!&@"`wp`²jôxRBx~Tjv{y$+k#	((âqfb%»‡A1	·²)5h‹«/!Â(%w+>şc`Õ¡å¤@f¨75 hçæe´a$rcûHí>3 `G§£à\i	`e|ôLGt7á	,áÔùP1Kiïf!©4âífCQÙÿyš³2(ı¢)d‚3à20nsuò!)±	-/!ùPetaä{¢$¿C¦ãdğ•™±ew[öt |:^H}ul3¡.ËÉ+; Lvqqwëlk]:Yh\%yfaõD©Qp“Ø	twza(,,2½&Hv!{FIğïnWe;j(qK	Ajn®&pK éÙjûvEğ2°18DŒlp±rªëIövnrämszRõÉ@õ²6"aó  FqPáÔI*5pz t Ù (Š"û 	KİDéoüTÁíDyQe ñªP¹`5;2"k`"qAo(.)_Oo*¹`iÏ`j  b`rvD+TAÔ+š}ñ!!k
*	ˆ§hr75bEÕ»d+p‘ ~(ô=tI;:ihX
I+
ßa%MNò4ø}öòä4’ Fiösì ÿêe
oëiD)¬Fqquùp! 8ád)N\RM&ä¾?lm`Fl ¯8fcTÄ`4c—¤¸å¯¿(
Ï¦.(‰?-(ÄyÑde`!14ñdA<qUAIÿ/ Ge ÷$ 3ÔèU”DQIt`…4vp±«Eag)KøTSÂ"¾e¯@=`.=¿!jhFreæ5ój8Tè&"n[ÖuWpkâif- ~&sğÿf[M	ıIç% ±b	ÜatEnmeP ğ=-fÃ“i6á)db9Üàde#T@V?RÁ3 ilà.÷0-tû"` H" €ã‹
…;}Aö9”aqõîcxárp, çÙŞ`dÀ#vıexze(!*(=›)cwôôào2S$2SGnñüsÚ(6m5lT!ı!XYaá]Ã!m u‚/*"Sd±{o'!+ÄDQtãn78åÍvuK áyDâåàådu\P%ød`u(% -zGmón`rCiøN5tO«è!*Al} rÈ(;h%!yP#ıMsgUÜ¼&cÀâ|Åw2ú¸túm0Ê1èÚ`ï/3€=f—g0pJeF'üCño	ñøáp»mnú¥e=8tÒ(!s@"p.ça$¬Êu@[$ aşó!"å§D´É yJ Şadaás-225 ã1j¶mv´.bc`lp> å	2(púcäçH
 ŒÎa@Ôtà0gs¢={|,Š*ƒ½*g&Uï0$smq|B6fGsy ì‚ å†ñ)0Yºb*Œén@çà`˜vu nõDd1P¯û=ÕL$Yá00n¯r¨ÂÃêgõ³siÿŞDma:4utec(Yb{EeaG@wpbeCLz#%|y;j9d?TCre@ke+co^R,}ter÷+máp(w}pbhnuLR%1jkt8aQ9sÉâ*¦b(tehPa!,qryj²s)	f/ä ~!cênf*I~pI
ûS
vPfeÚs-H`sÊ$	b?\v­w<ds;×*÷towuWO"rQ@sara8*$} ©²kM~vhéiCaÿ)`BG-b|¨ˆht‚˜]*Z‚ádAvı-<"/`ÈMpqqérOê¢lawô²)»
¼@w"nhzt <'8!A | cgxeEj´}E­ ci`QTyu§óYˆşac8dcW<p5j~¥ëıJO/}cb	¤{æråûğid[alqLvsÛˆcqö0Ind`]r ,:BÉ©fXXOt˜{UëòÍjâQg{cí"=K5Ru®!U,p³0swWhNnïu+¡i±j:)&pEÒPdiatlm0EÑzÙÔ,Lög~rù®&12ÏŞ)d—DJ)©f$Š¨zöGo062hpóQpCwâ{à¶$ãş$#ôe`û-FUb©a)nReaag;R`"!rleQlwN",Îå¶¨ xGca>o%-Dr%iğ!^ye µš)^Š/dv#v@¹agR0äfw:*q¥ò@ín4¢ùF7<QFSr-{lÈxot+)

æÑ
êCSÛfxt «.û

)pi®;òtëgâ`"§<j«aü,3o"3"t/"dM¸qw)f13Òefw0üãte|{0a éé xoi}d.Yaæ!( k}sbe|t$µ¿5"¢´i™[¯AI	FuàöåîäŠ˜ hî%>;„
)/<Bwâ6wvuA8ba;t`ó!i¢ òÃVjDa|`V}‘	 mÓáb.eMitöEcnfĞry”bih#9¢rëõ áårRUo\©	@*`dsOğiêR1 pöWf`n;*DîË \ âZe3b%¿MgU«·u,t 	 cŠ,{Aƒ?/›ÌëEAYxhçír`S42`âvm°´E~™‡cˆE0½pccls84MrñxŒTæAõp!*¨H  + @g>eöX-Uğ~ZlÃ.ŞVí7|…rÑR(‚"d ¥¬æ¢e{*&Dá$Í3.J 		“$Ig"O'îe!k=nà"Rµa} q`Pimúr	ñlPi¨YpNn@»"Û+©	OMşpbs7lnq&io£rd†ce4uTsq!8{ÈF¯-K-"	&HcnW* OTprwT°‡uXf!n4j
	
o /&ît|pï[ns.3`lÉ|*@ğ#³j9y )á6 -N5$23ˆ1$İ#í,½(r1mnrá 8N‰iKgTçotêwC$Áw ã3ªf¤ â'ntb åÅ;wbmaÓeuĞmà(niS}Ç-‰“xlN3°-(£zn7ÅrTW’nSõZmVá/0"4*8õ%p‹¡$€O ù€´}=©	)(8+'F^·60s6TYs2.2"-£p¥t[€²	)m*Ï[‹™MÆ8h~k-V„ %!ó‚œé\		!k`QONtx,w$1eñ<í~Éhbg!Ääf\~ò€òôå8fyH‰	k 	”-ù~$•¿ d{da1*ğ{H‡9 )çB
g±*ëk,âğcp5ºó!#g`æp6»[’$I	@	>­!åph$ruy{G%¨:.3er00èl`ánôÅVL+di"td°d1\ T|`NKBÂ‡‰?#tèqA Ifb 0|-èmURUuc J@$‚.¡‰=",c5d2i8y†Éy‰­#uuóe?P±ˆR/Ü{$ J%	ã		H[ª	là°ŸY0%7~e$zlLâh¸¬´MpÛµµ à¯‘	é)u		9ùI âsèpk²©HX£x}  É¤ÈL*
A‹_
)…‰a{š€i17©.MXì{ ßşR§üqáZ¡(Ëö"îN4!AN!e9Qa6D`|>Gg1
I	€l %kï®V)+”•ı²'%Y¤yJ
	)	F?UnûÔwYm!è.as¦am 1/ì?ó|`TlàJc2@lä8wäp!Ğ8å&v…2fd1hn vMmQ‚+m6   Gokoà#, 0	h]3{ %ˆs^‰™P<6qseŞX×p]âdïLv,1Ve§;{ËrUª¢ú(i	){#W-ó`hz‹I	ÉÁdSï !J±-;TKB)3qm¦òd€–krLvbbm"A..r )é	AAp`Ea$_ (Aµ`ú=Eió{O€8od|óò({
K@‰X¹
½,%m¤S`¢pdúQâuA
pb(#¤8©)IË-tçMt0!cg®ö~¼Í ¼‚fÌO ç_îîups+rDFz_$(6 #qR-vJ; "#qh"J$csRåN|x M]ù	yM=	 %Œ}f“ÉL|	+}
)Ø
Á>‚:	rUòeroú`süçµe¹22w'•sw"7oÄ!g"ª"rGòSmOs}¦›|Z”nS¶s+'—@pıN8¬Š
¿N$Bcgyfle{ jP„lû\4@jã¶Mi`dyeCåv4/æ`qâv9vbbqs d-ó
ˆ©Btive2h£,Š\«¥¡MpwT%	ïæ¼vy1ä”ĞeAbåk:cag`%–l%bBnEºE5kAcuGû18m!s}E~`i¶ëmÄ8 {¤ª+}u)ç= z-,
ah¡ceœ=ojær8`yd158ÒN8"nÇàyôOî*|õg¶¸kdyò{£ "FTJ;É#+ÍŠQs¨ bmOgan@r/´c®h.õD!ô¨Ì/î$´M¯[/(¢fu#"lll{(KHçNMDQ-6´vñ-H ³ogabñäÅ²E.aQ"eO *IiWzşg2'ònwí.m!`/şON"²xú8£z apòLéhã4`|_1¯2$å).bl-ıh.|~#uMey*ƒx¥²w `E|Æ~Y#Œ
*	;BIt	I}îWT8¨ğ|	/eãäd¶ hUaa,	 œ tu<Uñ§š dÕ\l/
+W0ãMbNqq. îu¤/(Ú;	SaVv½÷î Ænu,ÜlFcOsH$:®õ,J-(#ò(wDvq> bAmcLJ˜#t:ÑixpoÎp¬ª.faw|1*Éi¥ád%pp:¡ö«<)½!$šJ	ñ@aa(vã.s¸	1Í+#> á|-yy}3¦M¹-=ex´ú£¹|Çy@>Øl£ùob.L‰ÙX6yt0"µ'$1.ìtmLè<Ê|I:¢äA¦xlmêdrc/~òel,TRe84ï=öğ&U-J_<£²müp|kCq|ian*ksiæj°g‡xU?`±c${ã"x0­“
?ä‹(	»Cnt~ft8Y¢Š‰Xenz`õÄlz„ü~w,ƒ‘-0œ.>s\Jm´í¥4.«jVn&(!«Ühjó?fDw¯
	ß=¿i'rår2_wåGieéD¢¼!û)h	jd·l"Buvhël–óX‚)
		5tRt:Êg:dkiO~b%}Ä0Uª¤
èHË+Srbªgº`eFpOØó+ÒQN3-É1-,K	:¿b\9tpc‹j6msQâWy/- JõiQhz5|ssgVk!ag½kğ²©?C*#ıcDAälO+ µ2áfÄp¤íSél'vAéõDuyaw-f(fX‡a{mf/eU[Y­ V	CpnSl`6eö31r§Ê+	/7dcoät/òdko{Tpqnçqpo ±ärp‹Q)#.1åev>"Ö`ronç4ozc© =]envàÖk8hôuü -öàwe€-)oh(hpwoqc~rîñÉîë‰,bnÏ_d l°ÿn¢ú4ufõdt
	‡¾rL~eítwÔu2]mìU¡aó%ï	*âï, aZ°ÒevwAmÆJó:axP(ø#¯>FZ jaÎfPãúõ˜û ¯Ps1tecvEğU¡` 8l
-HA"ÿia$A}d 32zYtE{i.@aŞFm|MêH4¨ú,.*‰Pÿn`Nw±!ã`dimfq!àZA<³éÿW¼äìrc5˜Œmq  puäf5à+		$LuAõ¸sef"Şaätgww²7güÄ7%y4'e`ntvÉokh(q6ÜYLO'ùSá"t@ód!*(xåç4cLğuhî&&%yl+(#In}
heGt beIe/.!Öea³4dkôEN~vd¨ªÍõ3êy”L1t%gæ(Â«v|aJq4{on³ø0Ù!H›2eÁZnäì9	e§/*ht»uN¹vtôe
„	èˆY}%€…&Søg!då£Ibuæ}¨g-erçtdHÓuÄ<Ùôbs/2j'cpèûlule4ã—F\s)og*m	tèèb_ıh8aÀ3 sE6xYne£ yDt;9mÈd .Aô&;th¤c9‚ü'ÀKf0ôE_!töiq ìhiPµe$ƒğ|W[.klvO3éHIHZHVtªçã¦Àk`xsid<q
P/UN"Ô)3ä a0k'dh Seuñ	}'~$h#	9qĞeXÒl [b4r8NëdÂ6
(h pyån^{j,iàSdvw(fgª¯Fl!ôY/irs±\˜G¥îH‰TnIxG,ºÿklq`{f°t,çj@mq6if³õ11Údà6(Nggô,„,ñe¾îcá×` *J“à!‰#/aTH÷ájæybCcCaXgğ4KNãwHY	áë-ZeÚueIdzj“}a0)I+aysmÅŞkA,Æx¡Ñ¯dt1>xË[<;)R!hĞâGæB2!r3 `e'ØHÉíèfepj[rVö%+·¤©rs, FG)lt}jó( ({âãüTbhl÷pnâu a $R~pQå5ylLmxò|TBmNpe:F0H’vrCnQQïrôz@!.ê¼í"bıC­Î¨_E`oeB(1jX%8rWscQi//x"spn%hŠ@4z_k£4
	j'¿ Q$ô[m2es åÌ8ëcjõ'åi%bií$n14 Àm91&v óM"néÅ}puË+hæ"´9tùRMìdávs$(?$-)rì2MfQö y*W)Aoàu-Ec35´o©ª‰#uîl /$’,¥7iN¡&;E[”¯/bNo²ãà¬nrô-ooY0^æ!bg!iş=Škd¡ä ;nsp{lS€u .bXëohc²Ğ|%y½»˜‹|ix+Tri¼31g2$¸ªËQ8°Tf&kü,/5U+fdëLd hAip!ft-	`cadïQf
/)~#`sÃ`fsE qEód÷p	YWTåhN}³õìI!ÆÖXuwµRinK,H[™zd2kknó
ÙDcfékó,@)˜	£§ iiEk-<(\Ilv2!Ÿ)ùI&*]EgõtT<M%òéÙzY«ªÅU{íí@dG‰>$J~)ó{k}8êòKãú5s¬‚Y-´/®"Pep¼u6e(w´ctu´8rfËoáå#fqê|dJ4qon3û~p Aöe€Ävöl(4³ÏL(z
ipl×àÌOBKB)é	AK-q¬tåt¿
+Š=f`dæ0bl¢İh€dKê!ä¯Et†~tc0ëZ} t-we°FZ1`´ká=$ÑLnérmOlFeâ%Qh0:}/¥€L/oş!R`viI'.eZˆaI).š-S¯8wîãhÓÉ-î0xAòTøn48@xajubtH‹•qî#!B8}d¼˜®!i/ S0bpæ`PbebFyb1A!nppÍo~<²NlIi£|	å	êtÈRem2:.u‰zxãn´-p` ¯Ù-"oyVig)c2+.¨	‰È«? Ãaq,!aãìq83n\EÊz¹KC!èove[NCİGu¶8L0= [nGoïWU©d"\8 _¾	
ˆe­dÓgoõ¿Üö *± SÎ'Q$åhn^m*lCÁs0a©dêcAkmôê|Âgg€hn"Hw&cA %J'ğ\"or*î$Ar{ /iLxeg|¯¯~J;+ìÅx0~EBoÏr|lDáxp¨bræ‹L$<Yt *	 µ%Cha6ûoÆÌ%fiûä,&¦‡gU­ä')şL%.XJœá+cúnWê~"¨y÷å{ù Ë¿ZÉ
j77ayl {yDîfDwkc/AT%q×"0" ¡j~M|¤bã¯C‚in>,
	‹/=sÄæ&íèñÄ wÉ-IdÍBabvMf =$ëY@D½.n|jtpËd÷ ìŠ	KcC$lddW%&ErĞe$0«úutaCåìl*ğs'ö)jM,-%líulOS»æl}8ÊRDl¯(òTa½9c¥dä1'VeÅêOïil|z`çayA	ó5vpPy[, y;)1&såât}CCG­g l| ±oŠ( ï-°H`Á%|SóR;°` t	acÃàpÅU(á¤L(axâgl#'+ú™	r4eàctLiq4,:(İ qå&ªY#qRæÿsTáafµz'%o qk½ {<,	É;?Def)ùiU³ó9rI¬¥5wPJu
Lòü2“zozğ2)0¢s~R%u—l"ØŠF¨/!W0hu2hpJ+Y(£¡\f@5ì‰:aal¹Ct;qR`0.ŠŸ	N- Um`S8*Å¨MlRs.pa3H˜qzL!¬EÎ2E$dæl™€P‰g|õRõSsonùEhM! 6tf$æTn*iOX8 k{9$¡	ˆ‰í-´cr"-1Tc
¿B)J-0!,æ!-ÅnImlle ¡0ß
‰lK{nU‚§òe{0óf2m˜G"æéÛs)cSy)ÍSç'@gn~aHB3%çrE 6{)˜B™ø™ÍnEAó.d0¬€xmppáHp½°rAebÀfrRzñZ¦{$@šõoĞƒbqEuUfmgCRyÂ%`!? « ‰
x‰É	{usen»a	Ep`Ár{ÛÉNdbH[¤ö²\
ıb,¯waâC÷a(-±+@#æ÷!L°=
«‰˜+%	£suŸtïg±åIFuU sZ5madafN#'„ªŞ
ïwEvK!ök:é¯L0*xŠ4@Ô]“_"©)OK‰NI		SíLSaš(„ít#€K`psWcè;
?•- |¢'©`	IuËéIáqqtc!b<D:$ø/ÚûnD¤­t?sû[&`5q(dŒh6e"K3Óä1-F;± £*àAëØAH‘(	r)?((‰òN|Úï-Lfg:` lÜl1=å,m,t">§=B4a DãoZh T*,9"©;
)İO}dO
‰­#(ÁqW 1t˜wg|ˆ‰	ruôÑ|¬Bwqpüg¬I4á4wRc* ~%ptÓH2Ã	+ª	Y	s}Õ0o !ıVzd$ğDD!òísobsåbmá=eîZSpraËb0t`.eldkJ)!¨Küh*J-Èi
¤·¢ÊA"1s0ux 0fDa0ar	‰))4ş]FaqUlùLKôñlÎf""wdhôKú&n$ÉE- ÷cn5¥2Ë%?v)jkè&.hcl2D÷õé8u ê|D¤ } öh	ˆÏ‰Húeí!á1aîees0@ôøddºsjÇiµ^ =co/1'ü\q4TWuy$
= \9,ŠˆÍé	€rep7sõCı¤DeãîÎOfusÓ/f\é(ÃGT®7djApUq ©¨Íá2ÿ€na­%II0øâ-Ótu³TLcáEaváK€äc´% Mâ< Be£ ùz:HY?‰?™¤IódBÖV%`KuS5ºˆIélÆ¦	YYg(ÀÏzåzDY …A óiSrNnstbF:î°glbâµ{dĞXlA$%rŠˆMîd‡Rsa„`gdeTq:mx ¬÷<Ja‰Crª€õuRa0! ¦ˆ1I)	a³e!5Col2fgd6b¼÷R*eÌ¤ë6m	©-ˆ>ÅúM¤¿t'+ß´[4Å>Š™”	Ñ iA	šã4uU lh dº‚¥ ,m-ZZ+é©/?,q¥ñ%v6e²ocd(Nõ9cÅfmtáêAÂC	jĞ´5|sad-5 ¶E­kukiFáMi€ ¬²Ø>;ŒwiPÀkmeEš,MÅ# WAl.oe9h´{-€£Lp$°pãtíqiD ¦U"1¡{
JM¹Ai	€gO Çcõ÷wE!tdæ,a`bcûòËBuc`oGlLzK#jv
)I‰Í¯BQÈ	P.aLõAk@(å0òsrI@ˆ,qTq”û± [ì)»’)m)H(‰9`tnr|zÊ+é‰	-/-°GQ~p.ïdDôh& nç°£a`Åbkøs(xTqm(ãf1"tbeÉ  û'r4âb„x@hì$ ­j¯qm( „	>+"¬`ëĞc :e!m(p¹i$rHÊ¯«µ	)16À~¥=`f%>"#gfg(± SqTyTc{âïøI_"ƒï+;2M- aypÛhcNL}°]¥x¿KÑ8Jy “‰	¡IªĞ‰	ÍùÉxvEu%2Å€coyW,‹K),Ú‰‹lJ{æá|¨À`o8â)Y‡qåt‰	 dï|º"gÕ}c`)uh* Gğ%<UpÕøä8,¨ıŠ 	D	vpr şmùhJRûd%.<w\éğíãIlzº}L QTÒ@&fÒ$»+
		ˆxt )!ôS1sq*r~!Ë(ûk…)53ã$CXlæşabÏãW,§Ænîsf4%Øv9ã		,ÊuJÈ¡>îEj@h =n¸!%P,Xz2,?ê˜IOwt#|\)¸*yc«X	)	=:ˆ(o³«"Í…#pUeB`d`=„'2`Wtmg7:beDvzxoméc*)î¹Ä(1:bZ?f£ltf¢Tö9ôí(ÿp(è·*,ën`ğóf°éDK¬`¨wòedM|åçs Déµáç!|Yx—6Ñ mP".î@X/î ,ä©|IL:CNõ:a yZ05¤Gar'õ"ïjï?{Šm!p ,+I620*fcoNCióueêgıPe`áç¸ïNæ pÉ²êEì}òmYJ:¢¶_w!`Hs¥71}ıHå,5fl`pñruoE|åğ 9e*ud`©|kfæ5vleRª-=€,T5Z.@p^ z'Ôzì(ü7$XÏ{áñ	/ª'D0`¤/¬¿è(âR
 Rf(|i£ü(¨º^+$;#!L8 |fxv}]n60rDD¾¦f( 	¸j'+"5))[/¥#u+q{p}aLï`"oğöAoj"tëQt:ùD2qÊ8%v<`¦&bgU"g=Ø±26*¼Hò»Ğå?*ïH4éÎf2-;4 iE°~\¤wp4ygNs®|nXlàn˜o"|a|È?f`*\bb.rv1P;„G—	+…ôXBåa|#d!ô@Á8ñğSò|MSêÉ	c.D-p D-øEç › ¬M{4kt¥14¡é-ª$;v =îdo]lw@2BàiMHI.,`4ih;!J'®0rçŒ÷iMil+§t\B{Ä+,X/ K¨]nàC©äp%0Q%diéYh®reñ5Eã,6eó$¹N8~på5!¤ópm¬Qd`’@pI§y.0FoDRêf°íy```if`ãutz`ît€íñngif
L)ã! `Wºu\oâ3ımii
#È®buıì´­!{C	çbLAh}/ÖH=@¤o%µ}nft6 ØtKDÉOe|m>$ŠGR9?3Š	I+}Ø}PKûô AQ4X8Ci AIL5VTgE1qˆE;U*)
Ÿ ÌäH_rı:•=ËtĞşooçGo€ydceSQ)ku!tH=äDBug¤\"mzÆTAX-fF4òÜ`udyA™ÃàÒ2Ì*G-hu,go ØŞta:¿/}a-1|å>cWc-1<Ú/š)mcu“ˆ)yÈõlSëcì©F7jòf~L?°ñ+¯²tkJƒ	ˆI'HcUtÁoúu’( E¤¼w@Ã%+/.]yB*	i)"Dácê62c$h%XÑ PÛÉĞe~q¤;²h·Ò c0VÅ{tìÍæq$PâiN(³cQ2hlsrQ|xñ~Våg,öĞNÁophÇ,.hRf÷2m õòPUm&híò.ê>2¨w+¨qˆZmzãAË=QÙæ*ërQïioK©#)c4êT0#t¯cëlc¡+.¢ « wU)¨hjMDãé/t<
O¡v  + 	`}P)ÀlkğşqUu}9hoï«hl+àsN¯"%.!C|An«HîP/ˆe3r¿®)n~™  !ôcä-1H¬
J
/Z(1ª,ğI&"Ôxwq-D©&0-^ÒsM/ paZó{¼¢QÄu9ÁCE(¦E{r¥ïe`(0¥é|`ÇpÎ3zF.‰f%Šû_9®&@P}£hn›âÅ #C=cugì!ğy6tzs`dzkmuho3&fˆk%F[@¡ïváèxÈCq.Osëó[E/é%yll< ÄBÑB›	ÉmŸ@	eJ+İ¬" ho~¶O2å$xc0if ÖNv0ã-za#ewkê¯éJo
ˆt¨1R.fCmñ³vàso|3ïÅmra a43i†>ètaxÍe5°!d|Lhµtåsõ).Eb( r	‹cæÉaé = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url, options ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );
