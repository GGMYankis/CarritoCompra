/*!
 * jQuery JavaScript Library v3.4.1 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-effects,-effects/Tween,-effects/animatedSelector
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
	version = "3.4.1 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-effects,-effects/Tween,-effects/animatedSelector",

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
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem.namespaceURI,
		docElem = (elem.ownerDocument || elem).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
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
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
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
											outerCac�!ɉ l7�EK�tyqQ��} mB��bd?l�C �~�C�fo�M��,wu�+*�]M��
�k�=P�N�; �$�|��Un$;�Y		-Y@A!��M+Nunthqne��[p��k
-ta�oBm{6�esbIAU#v����yV9y�o��!
IM+)w-(��_qfhe���,=�Fv�1�E'.�D+�i�v
�qee�L�&����M��I+��jOtt3sr�b`e�$.�h4b�L+QgfiD \��`u�)��

	Ț	cM)Gn�Y'Sy)UC9t<�jl�,{��)6zshF�F�`Q�%!���/�*m��!a)k o�N!Nfd`=5 �u-$ �{J	II��j<�{�n)�		�IuR�)	]	i]bM	IYt
h���-*9���	bQ_
oE� ���vb[N��`QGzqiq)�:M6�$b2n�lfz�e,B��f��d�I)l�t!azi c)�hJ���Yqi6j3$u%i�sT+J�	���wV\l$)c.�5dgiZ�v4h�00�fg6 �gIr�d���5'$$+Fg' .A>|vi��j(�gm�I1�w�m�,�HI T���n`伇un�v}�~ �c�~,k�if��mi^8"�	�i�d�g�A=f�/d-�2q2�a}�Q`Jw�saӬigS�.�x�w�J�K--`v�gfc76�&AD=�S1s�)�d4ɢc+�p�uw����7gZ�vr
=�0�O{t�/�;�dRl���`Ca2!.7a�q	vMV�PE�ye�b!�{�z۽O?�v��sxoz!S�m@�4��$%��?��u�Ttrki� ho��p6��k)�*�X�	�$p�p �H@`,ff��bm�%x� �Xjisx3�bR�}0d�eUdjs	M�o(�)i�e,
��K4� �qL�b~'x�IE�ob;�;�7tg��5.t�Wc&iu|VM%��r�O,�C��g�=0NLmG�7B��`��)]�~vC	�)	��zz,�D*R�z	 ��Q�pdg�ou��s��T6���
Aur}um~H
zB Dn.Vhw;%rgwpeaY uqu4jbwr(aT`�|\pvo,Iwf�)�e l(fa*Yy,o. ap�umGOa#0Qxg�dmm3%dO<pr�#�q&P*mx3idTcr14�Ruw�K$	�o Jtsy �!qWpo�b i'l)Zif�*�v%"�pAnn$}H(C{J	��a~�bz!j&"lq3 5�e��m';
)		�
()��N� Qf"mi�>V=)��t4<%r�)�}� �<e S 7|At~:|q�@`et*$~&.L�lv�` JZ2$b0r��&0Fs)<*{eq�eM�o�jd:dyD--��k���W}penT0�+�|i�otzs�p
5�kl5%z�
+��]�PSb13Pl�"9ETf��tL�we>sqm�)$�FI�A��)�kO�f#u8y~bEuJ#=�of����|g. ma�+j�w$!�7	H*�Mpid�(+ 	�Y��Ti�`�@y)��)�kca%�0`Xca E.4a96�I	I	Ik`,@��0S�``meFnrh�?U!	/{(iTmr�L/o��iy*iIGdY�X(m/|E9Wb`DEA�x�_)ps�m-i�	;�-� u�dG"bex"O�>�'O*5C2cmfY_�hl�8�%((p|ci�fCj$�;�E)YKXXJ		}A{�e8+��hujbu`�F*()nE�3s+�	) �c�Fs� ol��<T]. )��q�3c)����u/	:
�h�vpf^ dq:�I؊�m�J p$4�o7!y�++`P�tq�taNl gO~�\%3^1_^}�e[	�"h+t��"�A6GJ_fB�c$�1��~���*',d�!V��t_rbi$�		J�/ �si*(h#���,ek4mP Qh�7eV|ͦBO�"a.1�#<-,<��OknD|se�t.}O4�Ve��wW�!Wr��fA�mX~[�)�/��qic�z s`Aou��*�tnb7��>yC"il�5`a�xIW
OK)xex]h�#`= l;I��avb�d� | �n��&�(���L}atB,27Qm9cE(�r��{f.2412,r;��L�	LP!per�ja��[(ehZa|fL�]l.
+%E=@ps�U�(�i^hg5+u�o8yum6$-m�f)(L�/ȣ�lu<p� �>��>�G/�j"DTd�o�	k�e�oI�ǹUd 9t\�؃xd�0w�,dQfl,!�]m,4y@��L$HI	��< �'eD.dT�w0j���	�8�M�nbM(`YU&�q�#t�s	p	lo,kbxh`h&4c*gjajl]		wii�`k�(   ��_)Pv
)(eiu|49]	��q#5fk�_=	0s
H�		�w�'�.\_*f) -aT"��t�JM�-L�u){
)�Yĉ�)��ZMϊ>3@-I�mi�}o#�hl�"\�M� ��n�!Y��o� .!{	Y9�	Ii�0}TYUx51l}o=�U��atj����1evJd2$4f}|lj,{mN�������g8y3B)�/o?$k&h$z�P"6m�#n,fvh�i1kvo #a�)-���(	qLp��[�}�)bj�l9L��ExV��p!B�gEezr$p8p(�;Y}�=;���.��ؙ`p�S�0P!{J;FG~oDi��(%5)G|}gN( ^qde�_3 � �I�s%ve�&@lgw�j�^f�'-�l1�p��Z��~l�n2qx�`le�Q;u�uq��'�"a@>&�.-8`(�a����Ɍo9 k9h�`bqo��yorb~�$%: D5.ktyG�(��/t)�b (��jv%!�o*!w|U �(úU:��j�{1$�wn�jajƬ:��.o�b�v�! �*9	 t�u|h.rfE��},[j t<� �!k	 ��L5��l�(:e�At�~`|���T��d�pv�5�x��XTxTqgE�
Xp	y�bUylc* sxq�$A+#� =9B9m� *LA.=$7D�tj�p2����@en�4ur 2�d}{wj�Ee���!�:lS��`.�ra%<d�08kI) iS1Z)b���o|aN��nh!Ui63EH�,m*tWs0l�}u�0�%vcdtaJ�m�'e�ng gQg�h!4{ t@e!idmF�i��� Zʋ	I/,"WYgflfl[rw@5�Td+vxmy&�.$�E�Ew C2*M~�i�tti;jG}h|/3�bQ (�*	o� \zuL�5�(;wC`+1�1g&!Fs�x��$��eKC3y�m��&a�F?�cL�gQ'�larn��ku$$�/��E~��nfNDK/K+	`>�Tx�hAd�neiNi�ZjB$i�+�/mw)IV#$ug�rb�qQ��dKd8f"Fg5hA�.�H�2"�	\��4��Z%.g7��v3j{rg<SG�1c,datk@~5"^%�d��se��o�	 "g#O&a2�d`��Lu\gt�ojy0's�ktO)@�C���E�.����Ne_q"waF|E��}#`hKg"Ah�il�;�k*ojVuBd�`ǫAf.*!cKc'M�zfk{�pa�tnA2<'`~��"*ihy�{�����Mp�|c�a��w-3"0SUprlvd�mG?c�Ƴ$" 3"d��ei}
	�Y
MT�&e�)9�`|un*�p��'`,9�Q�$s|H$,���es+�p>�<PoMw7fSB1�5(y��asFtqk�f�Jcl�on"15L�z@-`{� ��vizdl^Dk�fw$	Pi8do'uE)	a1`�0Elo�\�fa�=�dn#TA%G�ñď�$�8 ��+XaԧGNdiKw8>,!/&��<e-���v�tƭ��JO�xe|�nKkf$i|4��lecn�E|LTr-jM�U��l�Zd*+(�q�
Q *-M�l@A$/ {`�e$�\!�gjd'N�/�B�!�u{.y[�()sRvt�u�puU,�coo�/�|��M�~�!s���@bngz��Dy�[�,(fenf�!`"�"���)) �
X
im(�)�ww���� h-�=z�n0=�#d �/ �y�t,k/�{.�jL,e-����#�K�C ?�-�1 +;
]���et��9ralga# 	�	}>�	iIhDJ?#�DH3aY|f��nTp��d�sg㑲b�fsjC]ɳ�h,#oe$ �0]
�		W�T JI)�$�aTOVLg#gp{�` �*�o��nwo*e{�rie�4�K�m��		j-V%r�|1���&�MC2l�\As%��k`5v9?�d5C4�'d{��|83.z�_e�'�$��k\i;f( il��,,�H-M��erXbe\�O }$"%.�Mn@o1
L(}�"jK�+�3��s��)�d~CtmI̪+��{b-(w
�hR���|(M�utj�'�L�wA�\.�ktx6��]?�s�\8�$�.�-ug\|�ES4�W� �I#�gr#9J�n �o�u�j	I!j%2##L��%m2}s�n~#ufm.Q�aJ u|cz�%=.m�j��d/�/@mLP�*H+/aBJ�2qo,P|vws�a�WJHY�`c�|Fdh;�`��M�E�a�eF�ek\[mqd.-"^�l0�� :&uYr`�%$
�b�0ea|EI{}�GdsY;soIf5�t� ,Lަ-&Ci�gkul'?�f)nF<k�l(d�BՃ)�k+2?}�l{{�$��Ec�wD"�U
�(eV�0z �k�n"#\eK�af��~83w}��D/8�e,g�u��_J�#*=p`ts��_�;�.f9��y�aVګ>hu4��Ec��3a�-wll�14x�&z��<�:.Fs�a�#Fn�!h� NkFm��Muf< e��)kK$d�iyQ��}j.Td"CI��xI+j(A�emt~h5�o�`'�q}kx=9=)�ioP��d��!�e|%A�b`qk7e`���|�8�c�U�Bd�yu|@f7p?鯤* ��b`!�l'~=q|acv�f!��a
=, *B�inew�jbaD|wL#tlmn��'nwi3"h�� 'K2a#+E%C .%�l )s!f"bqe�y��aO�b{tit�P+ "a��e�A,m0��8tdq�md�k� sbBQr{@sM��&t\"��YQ�Id�̢�(�l,�4�ezdJw6g@!�)	9�c�mUu9r=�vk�$��7xuCte|�j�d8{*�Ml�.I��P}txO-�,�?��ml,sl�-??ebm<��}�
/Kko!�g@teo�wO"dkp�K
:�bU�#t2iKh#Im�"2� y1	M���h�PD%+�v.�'*grG/d��}Ohc�gb`{�e!id|`=E�4k�����g9�qKjB�".d��t/8BY t\tOEmi�(q(cR��mz}en�eno<-�(atg��w!!9 'fIgc:0��$��i~}  ��84��=
UM�-�%�d�ut
.`Nf��oV��w�H,oQ�ijd:A{&KVK��s8nk pmkThq�|IK޺!&�CpSo�(	�(�Ik�`oTYtga�%��g�g�+`Ek�u�XI��r �1�M�2)`�odnn~"6bae!��i� kk�h�p��
	(Qf+W(D���|�u0Dh�t/"O2c4��IU�3�u<-�%�ei$�!gl�e'd��)�t{gG �*��x�		a&�)mtgNO�,P{rw!<�7)e{	)MYm�gV�
( z}��%NK���*$�]�"g\�flfyuo:*�/}Hcx�`p{�e�t*3��LctYo﫨edWO�)({�IcyE6srj����N`wup��K[2Akpu�dh dd�' 9=J�L9:8�+�!�memaj�Ki�d6��TPg�+�nla��v"�!fU*Ct�o�dUn��$�xv�i� `��yf `�e�> w�tediaSL��/+�!eGA_�9#A/��Y"��y�� "�*u]kq1�Z%*o+�/i1 k�K��Re}wrN.RI>�T0;<G.r�� sIe�*vO$�fQ�%"�:
�I}=�
� �un�on@��FVnf�mo�!p��CCi9ks 	E	�b ~an9(^0�n�)._d�W6gU'ogLnE��Rw�y9	s��Djf|�2l�kg}f#==x-"�n�5`2`f !|�](|zp�<=r�]�tmk� |\�+m]�!}_j�"]'t}n*�H	��t�*���`�;�6x�"|sgzh#��ae8�|�i1sJ �b3�'4u3>e	��2w�f�4��y$n}/Al'��nOCcs/h)3<;� �Kf�}45!1F��`�Ft}qoJ9=3��9�2-'&�G	m%���PP�v� i �<�B	�o)0~d6A�wE�e�b\%fe3'\ed[��%Ң(e.c��*sg|2cDbfpx�`v�4)a	!�~}�#�yr�0�<�2^amp$�JM*&,-�q!�?"gog}f'lTe=8s�:u�w("e}Pa I#�4Och8hd� #F�sF��%%uu#!d�9 d5�l%0�'#-0JI
yLF	ZOM����%|S}�9����[=nM�t	/.��L"6BR#p��"+r%	�K�qA�knk��g��hmHvu��rI�O)}�I���Veuw2�9`� ]8ZK!ay:J	'fn!7t"��Q�����=Xio�e�vE�o,�4F�D��ܰ!�e�`X�C�a9`t����b�h��-3zi	�sEdTzzKlux'�� y"A�w9��y�O�8I!��%�3a�qs���fsq|x:*F�T�5puoFUor�kn
&_c��M�(!�ds,��}+oz��:c�}gi�n��e��	r���*aha�Gw-E~t3<!�(-)`r��hg4!l�~g�dj;%XG}�eLv�\1FyDm:h��KbuW}ʦ�Cra`%p�*�o���nPqg9��IlE��4i�l 0%tE�SEt�xͺ	&ei.5t� 	���ISU6��(}h3+�	X$�{� cb-<�mg�ftl� o`#]�i�P�BH(�A&s`I�!x�a�u�{Z ��`)[+UYw:	�KJa|�r,(\k�c�{�,mYer
	K���(*i��a�":`�||qtpb�1���SJ?�F2gv$?��fo�@�\�*!]a�c@�~�fM2L'O�~GP���b{*	��Rd~l�",!0	��n@!�bA=�8 ���gv)!� <0r�-(W��	AA��	�le8䩧p~3�p!m1�+�\�retus%N
T�c�.�-^ER=
�)}=��	�p@h�o��QPmqoC�uto�$d0xdtc$aY�c�h-oA��u`#��)MCXfc	pt�~�},%Rir��=e6�::0{X	9�QR� 	-,��ua� |�0x56�X�is�g%�a&d +��omu�(rO�7)yvdp%aNu�*�*5  �*�I	9J|5�fq8	~���K	(t�wrun�9^�k_(,��-k <e�"*�!�jM.�/vnc�j`'X��.F{{h��%�)0�	-8h�\}T_>�pm5tc�/~tE|v�?�/w�)��;g�'�*�W�D4!�O1{�X/}C��seT`��u"^�,,l*���i]"GnG��Pct(mm>�THMRa2g!�lpm�j
��daS�yM�c�e|-g�td�"��:Cv�gm3�f!"8DenjVx,z�b�u)e+Ts'	�'�m� Y;c0<Al|'E�*)e+)M�	n�viz	lLE0E!��J��
1dC"
	A�=��;0E�{0.bdA��j��$zEZ+Hh.m��}�9�(G8h��z�gdkw["j<{#Iu?�Ahx���-!�KR"!Y��
>�!Yd4 �wyU.
�Mld�tI�ip)�S�W��r�5_��a%)Nd;"rqF)oZ��u�of w�xrm_(���gluvmle*uspe QAsr�omH:(|Sg� jemof*mgSs`m4㦏E|Slp����S;�%], vcApdAO��tpsb�@l) k�)�
�c�h+ `#"& ��v%r�i�8t��`&neGlfhtwd�um�ۿ�O~�H�w�e$=6O�x��� )7f!ee
a��cyE��y!ba$�)
�
J%�`FU{y ��)�-: �reQ"QzU��$wAsETK�,qEs��}����7�uqatg��Ta26({ ?��WgtCX,vr7!�r=1��!H	( ]}�w)&+h|�b� =+Ems���iEq���1El�Bs,ԆK~egr[�0navqcmXFV�P#3s�);�*1�`^�{e �(jVfn\pm�o;!nHXDk� ?�f�v��n���e%Mwdod$,t��cm�n�)`�@{
 �a� �{4gy5� iS���0\�qoH�,�r5alC�si��`Fwnt|� z�eB]�\�p3Z��/s`%`�`tM�}>eoqu:ag��w�/2 9 "$� _-EMV.*�cck|��ki(�f	��T�jb@ar�pod��>2#< +ic�e���<�c��x��0;Z@M
��C�� �yeLDb}or��ǲoft3 %HW�"˱vo�yfu$1� .��z�r 0tuFh��8Z���)ml!�)r�A�X)�;�F	��-(2'�nc�&fcR�ea^mLj�#1G�`d�-Ty��m�\.a:��d�r �V2o+gxq5uiC(6�%c�)	( �)
q�"9H�e%o�(����-	&�"Dfic�`[]�r�9�e�'�N�Z ggem`1$��p�kj>-X3oOB8|0�kJCs$SleaE` |�0h3S8^6l�NgP8 )�t B}
����X	Hig2}T�$�&[g�	<u!he�3@6�[E�:!0.�]*K	-/f��`��!��l�)
�+;QWIm��np?Rvjy. �'�,#{�~0cgm��vB}o�s
$L\K� sg^gx$�+d)$s�I�e\�hWd�?8mi�Oh'� }fD�)?��9�t�aefY/x$s�,y�v[�����! dHfe$�M// A)WT Ducw.t ~�$Bgm&@��4vC�{`Xu[�u=X|�R�a|�Qs@��|r!r|�s(�R^0gH� x*�`�	�)l)s
�#3_Az 9ESCV��}�hjm* }+wcO$fm�nw[ `+H�]k�'/ 6kx4OVc
 a�R (mV��.��h�pndo�gsd��9	�F 8��t�x"=fsv�l�:���0X0d%td*��H gπew� F&p�d08eyJt�vp[!��9� EML�#	h|#4"� 4 Tp��yLu-B�W�V8e�]�<lt�(c�m$+�;
�#	bEP8qg�!�j�W��/r�!� �3	rwId.�>yu�0;NM	��ve�a�$-e4#ja,�9��vy(e{-t}s%jLS�-b|/��aiT5BhI	�o�9"	X���OB�2%ǈ�Ae�.w�h�� "h!�ax-�셜5t�`.� k��	)�N&+�&樀+-�T�2��k#;	�ҡK��Iu)!�R	,gd\avprn le ire$($gll��w�XNbI~mdr�x�o���/o"lf�v +��`jI2Vdpns3ikw�+,�thv�o}sal�Tk:�^@af�aqbr�Q�C���rBu/yEMR
	se5uwl q�2seG�lsh&I)qW�bh��|v@Y�;��39F�k0?����;ZN�(�pp�w+O�>mp�{0)j	��/%k"C�g�,mt�/jA*�	~l� .�u��?n|�s�/*<5>po���f).|l��|j"p�9k�=q8nf�ctx-�$�gsdydg�OR"(t��%�{<i {
�gP�8i04j08J	�`g�89 tkK�1�iEbZp`��`+�%��K|Oj��&K���
0`k *: �4�,UN�a��ja�$yf	sg�3uk�$�?�|/�]�rIrT.jHnu�;�O\K9 ��w�a��lz����[���uN#0�h!)d��/oR�A-�k�
"[mf�H%(9nwD�~s$��,�feVi),bS�]sa~#�q:( �?��	o%|+7ND]Z+)Ixv�"p9�ao��oh|{�'�e��<�	�`� ,!C/KT���$�#;�#�@l �k
��Emgme�xz �f�|jv�$J�9%�9����Rq�-J�nM28
!+A�dZ�Mg�(,$ Nh��F!ru�wjl i�giL�f/u�VEz:�`;A52�Sc'h;�Y_�K�eu�`H�{u�T���$cp�p0�k�%bnw�8�Lq�V\Kv}hbv���*e�c��c#g�Gi(u�j�� 	(kKMI#�lh'�#����(-�o�'�4fy�ѭel#{�CCiCp�!m��l%n�\|i��t?\�4�^�0� ei��~�'Am'.�,a�ZF+%C	j�pw"eMk�kOg"(��@�M(!B��u yP�0p 97
H�l	y��!I��p�tHv.f�y��I(5�?�
�'oGxickD�� m{st qL,c~S2T6 rAf$K�u)�ZLdegdwN
	>9�c�bK_d.aHvI&�z/5&9p-$z! )1�)�-vis /h��cC�E� wi�S%Q`�le��nS5a`�fc)�.�kx��dGB�V_t&5 l0e}r��kc0�w��ƱePB=3m��!��.4Ue��3K#�dR=n�evjIDdp!�@sT�~}�Llhf)desob�ov�e_"�o�z�(�g��j�\ V˷۬C'\FMjap/f*wabl	dK*�Ͼ�+ lOx@a { �is8je0*d8m|�l =�m~o}_!l#��	 9T�JB�	�f �`��f�B�Me�[tSI}% ��^�jhLC{HojD|��ewS�"0k>�	)Y((� ��/g7dl��8Hq�m`8l��eX6�8Xd8*8�k 	�I�"ltw��4���m;A�/1		|�O)�
#Ea?(m@�Dd��	Wj+|�>.��l�M?`m\%u�$@r Y=@+?J��y&pq-a�Fm���mZa�=<11�>~$E"!sk�/�Zl<W�~4"��&8,ʮ�YneTq��0CH�`08e,�m�$myxq�jod=f���@m|�u�`�y0ef-{��Y}:�"=9)HJ'�$�erVt�p:`�(?���Rha*�	�e	H�-!S�r%n`)ag��jt�g��� )TvB;��UY�R�jUi`s),+
�1���*3IM8n] ѵ`qVp`$7 /4�"t��xq[ e$Mg�ng�te�f�{`d|�bm5vg~�ċiA[�ep�}t�|YeGIE�y 56[y�;n	��U	Ib"p)C�i|"''"�yi`࿹= Eܷm�l� dMca4�O��w8Jqrd0h	`��+k9��	a|e��6k�,d�^�yW$�>l<�cmE��1K��5{ye���.�x;H%A�z�-"%0��9�c`F�ӈQ4{Ob@]�&0Z)�9I	.hT�a�H,n �#�h]u8 d&r%�C:&� G��Gu���["�0N�5m�J�JeNuM� y �����"$��G~8m,1�q$�U#c'jE%zo� e��*3 da#c(�2�W�f`x%`wk X�e0M=�3qel=�_jt#		i)(Y %hu�J2(n uawA��p��--[M�C�C8e 	#{z)��A)= /|7u({.<	�	J�shQr�!bo�Qq#�fR}�st��FVpd�F)-�6�f!g��yQn�x�o\f~u@�ls�On|{
���!��tlaqp�S�W��_;w�@_0� nպY';xM9�*�;	� ́mp@F(<e�fu�oa�ect�oM+$I�Dk||lu�V$��"j���(doP�m} #"w!*����#�*bal�!)EWG!+�e_�!!uR5{h�v0 lliU$ 'o~tn�t,����j*M2, �z�,Ie,qDtuvN)t�ui;
IM�m�1K9m�	�	��		]
��]��	v�V0tb+K	\re9_�+u.q
�2�Nwjh-^��>S?#��Eh`���SLSMa�O-gPc�/$j.y�EV$`v�J��3h��s�t%�~z(V�9(;j	^��K�qk��ph��1!~�itll �m�b)Vz�6o@ I9��ipai$�waagTU��)s�`f(m�kkD 	���iKH%v�*!0�aP-)'cc�� lE�gIM2E�o>ev��p�Y�6{!��XKwe�a3�Pb`��()(,	I]�lM�E�]=�"h ar]�5
	i O9�``xbh�0�YT��G��E�b��~�`yulZXp�eRklai}.$ �h�;pob$��=Vw|vsdR�G�l�S9i*��at0a��!x,� 	�a��p#ml�ia|A���.a�Ah �OºH4`"cl�v2 ioq)|�	;�i:..|�C7e,mS�2< k�.tuXPZ��(�qdum�zc+9D�(��dwR���{Uhr[y�lXf��a:���)+�LFnwm�.Er? ^{jo���E�0�pfyl5/F)b`h4bYt}1jZ|`- y6z�qMao�		^cgE��a~c;Ö$- Sd�	,"5�0i	
5���e+�v�En%/�A~%�@II'E`�j?(�h��5�4m]�l9
 cms�"�h�8���J7l�*J9$[�k�'9�f8El�� �Jݱ\�pe@Q	�H-8��J	��e0��&qN@�r qAqx�|ES b�Ndm5)k�o�i��!xQ�$5�-"xZ		�Y�e~�j�!g{b%l�p,h.}]!(		V$3qN!��}`px��!h[9�mmt.tq})(X����IM��	Mt)?�_y+M�e'1z]�u�nMQ��he=�*��f}f_4i�F�#tH%F*1Kb8�pFQn�d�px"SllmcPos���u�qYes�to{0Zatd�$���$C�dltWl�66f7a,�e`vr) ��ni_�,%�ISЂL^U�c�J2 1�g�_�ae�eZz`txq����*)b(W";8�=1Elt�r'7�b�t.}tc�7R((`gx|�luq:�!�����Z�H&�l;kFyJr��%�$H�p\^I.�ms[��0%� m(W��!�<K:tD){�a0t6���vch��l p��dfcnd�[y"Vs�Vi+us4-�j:8�z��	�i~7�n �rfnaz`4imJ(sl�B�oef ��m�T("2kv�,ts�%���5̼0/!zfd ��Z)`�b8��]�<b�<(3f��l��br��Tp#[�0�	�p="F�x$]$[�,(
)pk�kb�+VAb�� v7�D$��&h?jQp�	k? .� Beqw���-l�lM�p,�kpd�-Α+]!ıM~�iOf3Dh3��@,�gxj �#q%d<sUwd.���	�m�>.���{( jhLw@��{$"`#,pom>Jd�n�LoFxwED� �on|�\d`]C@�dnTm�6� :\ql�)A� Pbg'	N7:"lOd`�`pa'qan�2!�,x�4l`r/5tR�A�g0k��`2.$?5Du�rt�=�_�$q�hEhro.�!q��m��HyA�gh/}y~0q � l&9l�ex`bF�lsdB|: %rU��cw�{ #`'((T	Cov�J�w�`)a��pi-��x*pzE	TEP|$g/n���+8RM!ej�
)9=}*cyB�,��3Fc|]G|t�7�A6s`e�0(	#{9%6 �� �E#zq��6���oqtF{�dqR,��R b}Ytm`% vE�l<0m� JcacEw�"st�i&Ter ��&�SU'
�5u�'�@e#e|��j17�r>[�puv"lX�LI7Ealt�,->E.)�t��!V�\v7�8*�@kn&]@ak��R�,�kK 9!;		��Y<�(/${~��1�E	A\#p2f/ea#+�lg!��`fobGcSa2k*m,O4�:	
9�(!=�k��|5�pp3e u�5Rr�E3o��"Bkrm)�$�:�C�b [�\qcb*H�^�aa�s�sT�{F%/�Eihmq�X'r�ear��e� }$h(lR�cvu�� {
+9Oi�br@2*�=�e�d��$9yUbl��ε(���q%X%$ c�`	)I]\M?O�K� ,m��/j x�Er
MpD�j�`'s�Nim�'�6�
ci!	lmc��(#o^�kva�� �a4pJ2�<d,4ZoX�#r"l
�Y�p+c2�A<dM��,��}p<c[$0�KeTa80 ��9iJI��j-M�~r�fq�}(kFdT�DY�ot# {$�]R�J�v�h=w ��kK"�g(c4Fie�SR��)9	�`PMp�liNg�L��Q+2�yl�! 2Y-/� �
-�!a�tA �Dm�U "tm��_A}/�-Fc	�;� �&hE��uwʰx�mU�3�a}�i�9*21dC}B:5�.[%sustM!�Xh�Ax
9��ea, z��HM�HY!H_i�Ikf��+�%6ր;7��;1)o �,�RFI�0|t���O���v�vp+ Y(	)H8b d to{��QNd,xl	{�m	//(fE5=�'��YF�� mq�Wb�fO?!b]�s��%zsih"d<x¢�Ht��_F�YeA ���g$p�A�N'u� Sb�t,fD7�9�tdlx���H�	��P(M�wblq��ut�e�h���	�Uyekg�`	)]c�E��lFk2)�%ls)��hma�ci}pK=f�aD�a�$h��3�	>� �zN�u`m�u�J,BO.8siyǤNL|g�!Mc�$N�#iL�g�GR(fal0Iy-f{ژD���tLl�.�sj (���AVff��VS8�"=%�-Am-$){�(.9)	�I��y		=�a��p{�vLiO�fR�~&�$�8�1\z�2O|xc10]�25�i`.28�k�`8AA}+ )�ɿ��o�e��#d�jhb(b(���R�0�r,m$so�Fd����"�a b+u� p�fP(vJf8 5�L�n��Oo'EFK	�q+��`�A}daeY�D<|}��� }j(	#�w,mf�(?%=%iGO�{,�e�`, :�H|�\ �T�I%6��C_�]�g>�j-SA�ui 7 a�w�WlE�rd} �J���*b���e*, mhlm O�8 u�d%�KMNM��-|rt �,�#1K O1GFnK�fm0N(�"1&��Qt|p[`��Q �'�m+ ��)��C	��Vj	܂��)//mld�mL$M$n�a"v)@@�s��pS,�xzRodcrrOX!D�k<3A>�q0f�g�D�-	E g�$�#IT'hbh�jNp�m�K�tu+s`:	)���G�K E�K5B1-95 �� �lt� =$3�i�.Ed�irO?|s0��aM, �BD$x���ong$I�c�t�_{Tn��-ur )!1���mmA����K=�>)C)+)I���@q �jS� �Ng�r )���L��.1��i?daZ$ og~� t�#�lr#'�=ABj�Ktz. xm�)ۀ�	m�slRul[[�-]N-�i=iQ�$y�oEsX|N�=Q?��sI�B_���a:l�		}	Ku�I}K:�27O��)�b@mIdx��2%Vk?X�Im�H8t�jUb&9Bj�)�as��E�z��u��-!r%�*�sm"l
-le�5)tmo6�iw�g\hĭ�8e�`��VFr�yaepk$��R"rq��, RdK1nk��qJ4�+T{TEdT(�ia�XaaqLPa��e�D$ =�Ba�-�Oe~Jp�fPe�@�BtN�D|et	NoK%#\l��m8%��u!P]�t�ffb�5`�,1�2��r	-�`H!@bo �f{�{n�h�u=Chg2L�lst���@4keT��X7FDNh[)/\g6zee��g�bo$�r~��b}0-��Fm|D�o�y��*�)�)�C��n|tl� ��~-wG�*mzm5�x&2TNGui�ij$Gle$j.W�!(�.e��G@�*Um�=-- �hd�j��*v\~YkBY3]���m�����q��eo�b\se{a�mHm�tb,kJ{Cn^d~�t��("jl?����Uefw�vsuaon8�gl1%���JUKxd�uRt"hh$�lg$h�BMMOBi�t$�=(��\&:</`1+��iz �hljs pe�!x6a!4vu5+)�
	��d��hfps�5y0�q��v�o~( �=�0��K��j`. |j�&	*��A	v����(|�0�\|�U~.f� [i���!& �  .X6��<p`#el`�at�m| cM���i�}[�Gm�t$+ -1j0�			���^!s=CK-�ex\�l$#oFnx�)>ce'[x�M>
H��p��x�-.��zt���ʱm|8�Nf\�:t<(zo�$i``��	�Kmat�
�En~Tet`(�l��-`'Ue�}l�8=o8"E
�M)�(A~If<a^�E�e+*T'�lgl�nU`��{%��"4p�-
�I�Oxe�nPfF�w8�5?�n�T�N	�q%}2o jtQ;���~ �7j�C^o�#� s �+$d�~;�i/�0!Hs	hi�"�2((�`��Aft�1��zBl at�<�]r6o�N�S?_>0{Q% )��{�r�lgH�rS �
[��B�K�`�yC�r(g��yd:y	�l�x42$�eevCP�*kv)�,le�o(gp�$I]�-�Y%}~qy �j!�o/��p`?�&�R�gmxu"�(Qo%nwSU�<u@�p}+B\��x�|e�l> u]i�n�ZiQ<�~p�*`s����j�,�~}v�pnW�K��n1�t��(s!!a~f0i�p%Ma�y5oq,!+9v+"7G��Ho0 ��vzep��"B{�O4|!���;�4-�F��DY`U�~|�$nAI`uyv�RG{!�At}s$�awba*�
�*Rp�bk1�@�Fnd�i.w"�+Ήj(A �'M��-Jf��-�zh9�Qt'n;*z);&)0K�		�vnj �9pA,�5*�y�A��+seocQj\qQp�1�"+q[K9	���kc�(+Am�	I}� -(3sT�0Zhs�|`4bP<B�&	[Sj�6(#c(��euevM`pbpe�	Tm�tai-�v3*�.�&�h6�J�B4���h4��m�t,?�O�& Mo!fld��b�c�u�*7 �vH�fD��%b(@]�d��a`aam}"iH�-1Obvrt��h4)Jp��j�t i-[�%���o���h���)-;g<n�$d~3DR73* 1�,� = !
)�+/fKaUH� 2AOP�%�t�$b"{a} }h"@�.��zm�q== �e"��j�/h ,#��*>+*������\L%�I�"�4f	,l(�2Q�(!,�	
j�d!heZ�
Km)/c�<$i0g��a(�w-�r�'hTokanר0tjOm�c~�ly�u$�i�=[(8 �*�	O�	&�-b�l &Fu�4rcj�rR{lD�B�l�xNP�km&E�<wIA�q>W�Yc�(aHd!#��'	�h#MJ(=4$G-.A]�[�i54�rl����a��a)A	�){%I}2���~WHubelB}zj�a��moz -��
IyX&	r$VY� ����wn��s^[h�s
fed�Javst	|	f;o=��`k�>aee+���+Wt}�QL�nUlwr{�8t9a~�N�M �Y,�G��agkdt�id�s0�yh�r��r�Qu���2��`|aiu�q&bd>�tm�B�~!$tEla�lN=b�ngi�kpk e~{.	iOe|l ��r,])���gRE`n x6T�-�Rpti�c Y�~f�(j�Gvc,�,d�%J,�Xes���v�(n=gbe-��uhi&5�!�t�6 UDu~, �>�����!q2�z�	U36ch$$_[�t1;'<z`KI�:�"�"$H 	1nmd}bja�"wa v�f<$^�n�Yce��!sb�TdJ%0[^*�	�OK�uZ4Ca���#m�~e\mm1~C��e�$|��I/�h�em?�\ ag%d�9 �`�$v}���2s�ue �l���[Vbe/ ��tr:#sZ$mol�dXp�H�,Gy# -Uc�@ tw$bHGLh�m�|x���y'r7b���H� �O#}�0�:',q?t@�.mKܰ�-/IQG''�Y�a $OeM-r7hbzU&~ kf| 5te��w�nxC�mUvpro'�t�h�t�jqVJ��
���2rQfg�gY�uU|%`)`y""g�b �!
uO8pe0$B1{�q86-= sh$"��1dJ�iGphnra^dB�	��< Y8a�	nl�-=)$mkS��F.f��>A8*�&8� o4td0}w�i-���k�Evm�m-�SnP��=�k�|,X%�59=dFs�}O�0i�|�Cmg'z$t�m8�Rh"{�
	�
	�)(�A,e��$U�mnTPRc�x�?#h��olNtMcv+�!�_T@�rq#T.w Pf0]`eL~>�I!.?!WUyz�Xd7�_U\jrP`52x4�I��7 RiNn���d�ksE�nmQo|�w.1mS<5�s(L��"ld�7vmb36s jm�k:�z����fr��Atc2a`e0G>e!En|c "$;`i����Ov�,6`+\D�O� <.i,g�0=8���uYyOb�19;N�E�9/) �����jzpx'`7il��#(�o�l00;.�	hɀb���{�/+�	IF!( #�-e�d �>g<e3.|O�:DO`%-$fyTJY� mmgsmULc$�`�"]�O�g~eb��3e��]b%MA}9:	 D8yf�`y��|v���uO��q�NDz�O9	
.�		bn-dg})!h\AT��,��	%Dem���ha��le[�[C+�H)4q�z�]	l�� �	����q��j�m8 cg/vO��/t��,�q,-AnP!|cy( 8�?:I))dgkt,�~h�m�h`'|�n"!?B����Y	"�u��:�yE	+�tJ�i ��]	��e"�x /�tP�8{�<��{{	k�	=e�����s��mm�X�B">mRt3H�Ɋm(H	}PJ(	/�dVsAfL`{�0Ba5E M$I�ot�bf�0�BfV@f�lt�3���z�o3"� �pr�U($ b�-�I9K'oTyly"7kN,jh�~G��sl\"�m`�W�( 1LD�Z�{IRoe:oauq ͂{�8�	��d(H�(mmuy 1��n�V#�R,"c!ELQ)�C�\yp		�k�tc�a#�|*T(�)
�M�+}		/���no#�dj#tl5"s*pp`uSa mfm2� e~}zu�,`oqw�h<`xM"ko|8��fL�cd,(�s*hI[�ul�dTx�mbbxuF< ��oM$+c�}��	��	�ʩJ��o��-��-h!iB n��.gw,uHe9c]tv�f�$&$.$5blmh���ove`�#�>w52c/d"qfͥ�FH)q(|n1�}`�*qHhCom(vn-7��+4��K�5�ˬ�la�v@v�?j?eDc|I�!�.�;mivc`g�S/P>�+�q#,< �n ih`�k)mW�(p�q'�~ �o"� �uT�ti|�}aD/�zT{�-��m�ǄI2 �h?{!g,�(juh�k�c�s  9nhvl&re<A0�rKE8��m �skE|$�ng~b<�*�
,t!'�0I�Pa(%d�_ul�r�0(d��eq�i\spi���q�0!�q�Tu�ia5b��4�[;i�$�q|yrU*n'en��9��v>u$1�ly7i^W"�e#A�;Ia�w$hcpi�			+�K,.�a"��I�u�Mc�a�mSsam2� {aEf>8)/?`Aj�:cMenua�.Cf�x�.!I�(L�=r|P)0k�62K�y�`d�sw&�m���w?jr�-�h.(`(pup�/gN`�;�g!tx$�N�k) 3�S'$�4�xc�(W(\�nw'7}`T�evc  q&hpx�b+��dC�w�tg%r�)�@htf��fN&�mL@N;bVtii;!Qljǈ�I�)J�UM�2a�il�k�}a��	I�oĩ�o{S�T vg�M��<!$�qqC�ujetn�e%h�
I
	h�}"���ShW �mA�&0OacQ1ŵ�0(�a4�MAqb`�fs�:"]+ "8
�Y]�pgzc,H�{�e��@q?,<{�t]hfclVft!�h��\tn#m)}09�q#Kl 	�( �0gw�T$* z��(Z�wO r'Y7�FgT@T5f|��gTqx	�#���Q=Xp�Q��z��1 EbDl��� tub�"oq�2l]j�*)z��ci �sws	�am5k�"�&�XA ��#��IOUnyl 8x��(o!{BM	�Í`Nf(�a:g*Ց�#�_ [+�9]b(�KE��Lk�eoi�W)��*�	/���K	{�fŠ�g�3@Gho#�/��x*c`Lh<2e�OYl�$+#O��A	m	)}��i(�|,�
-|.
 d��-�$t�#��6 MFmcz�0<2cF }��bx}�asztg3�}t�b�9�tnrt2�i%t�jhc�
)-	+%�	ATccHdx1�s~t�m�w* sue16c�|
9B)�m��II�� Cp0�!T#xTo�|�&bW�W~�X,�I����3`�v�U�,6dwl�|�h"so�G9 `e�1!�	�)	n?*S�<h,eY� #�da�S,a�4sui�ed�qu�NE�1�9�d2�d�w%�sfxnhm%�%|E�A{��`�4a\e*{=n�`g�ɱO	�v j	W�0M�mk�l@$b5roVp2�#�s���%u��id+t��7p7�(�4�6�$	<9����dn�_=oxF'�stvOp�#~�2t�!\�#t KB�"�,��o
�\MA��#`{��cz�f�p``'�<h0�q3e\��

�I	���:.B�0oBWVm�!��@g!NKa�}Q�hk�}ojdlOc�|3e`w!~�#T�b Y"�a}rJ��iΒM �A~|�'��2(�CK�Avv}lz8�(���b��JUhaQ$sGAI1!_5D�!��QC/Re}W�=��'�ahz!.nW�z	��� 8B5y`�/�ywm3<{0'���	SX�*�rAdxn4bs�p-	!I�zzJjqpN���!W]`ePp�lE<)80��1wPp,�MkPnh��e
JJlQM}O �&�)2o�ϾcY8a	|��=�Gy~w|�mi��q!{G�vrtrmu6aba/3"YnJm�F1z0\�:+ga�*�+`�G�s�UP�!
3`�H#Psddbs9{�]�		g�u(elUL�dGFc3�dM
�-k-�Hn�`4!O�ql-�S%�n��1S-ve�v�:�*
CF(]��*{v(*�"s)�ped!dZ*�H��E�l7c}5D�"o5n{vms�'W7"�5o�skg�7��fc�+n��"p�1-1k~�'�0|�e�$Bj(Ai?Zjg��� a~E���҉1bLĤma�jK��"{FAKmg~���{�ah�s$�(����Pop�+�		~�a+ip<�I �abT�5�ww >�X�ox�|�-�i%=%);�IRea�lmp6``7cpgtqk,�Nz�~�"=sT��Z�W$�;K9hg�8qkb�hGb^�dxbI�it�O$5(|��9	;m�-�c+a�p.(��u� C}A�w4%LK��,�EL2�bo@)/�Jd�GN4Msd{9eb�@x�`��!cXw{-)%ܪ�uN������WkAC�4KJ"Ghi�%t#��n�p)_'V�eaa�iu$= !eMb�$$zA�#g�`B'l�d��& m�d0m2�GhG�K��7p�Fe)(el�.g>9Ie�cMr'J9]t
��Rx��w�;!+;>�	/�&B��E�O0je��r  �ITnoLn�>a���l�h9iH=�qdwDnrPxf�%O�klc<3�y2�*e�R'&sa�Ie�:]#)/Ӣ+*�* IHmn�8�3�f �����cO.��~��moh`x�a�r#ls:31^a*c�m�XlBr �G%j�n5GZ'�a ;sLcC�o8 �%�c\K��
�>�KtauC!�Cpf*J7�v�=��Me, 3aDec|�$K#�lek`,s8#3�a8��%a_P/~U�1l% cq;c#uEa\fTN4mD.�bu�oR(v��H q�xod?�kiai�h[�K�p�*�-lzѩe�o>|9"*�uuzl��J)`PIBE|0w!B�C8qxR20d���8��Hrcm(#�S mA�3U@��	q�0���f�dh�g~�{"v�h!�f��q�`e/r�%j%��e8e<�v|)�>rm?�s,EC��8rf|�q�aOL`fUl�[`�bl`�ln~|WlD�<q�,!��%�@�z
�Re{���`���mi�X#w+jܥ<hTi�ef�.�
�	�re�J,a���r=����& q�dcv.�`<== �Ft�#tl_c"7w�Hmk�Ms���UA�cH�P0wd}5 4/ E�i�|x'(�}�Gc`|kb,,qMop���l�/]�aC0C��.} {m�%��z)4s+
=rf��Lu:)�22�s6+Ts4�|s�g�
k/��p� UE�Myv�-I�B$otfqbpM�sQB��pq����`N� o�lzn.�-*c�u%d�`i��a�d�4�}�D`n.�x�%W��/ �=i.��lT%r+fvyAah&eu0a�w�N�(g�$C�guic��׀	� ($o�UKdelfk"<y�=}�uP� OA�/ �%�QStuh_g�xf�+``���ldyli-_ #�Ois}�X ����&U�v,I2<q� Y`�	p/�ed� =pu	v�Z�*"%0�e��eZ�l~�Hyp, B!|;�K	mG`D��kaz�m|lNC�hx�@�-7T`%�	`�� <��oiDL{˱A>r�rg"��4b$]E�@+o			eo�l`8Tެ���yye�=�a8&4&��g�ed|֩  I�1&�e��XE.a��vqP'canS�pCpi"&��z�M�	��.lc�4"���Cx4X~byl{�CUB۬ tn�o�l�o�Cjj�2ML����%K�`��%sad$D Fsvu53a��0e"x`~�8�$~xHc}M9R0]���H!g�@bEz<�mt�%z
!�l3.iR��otS?:*�	�=�@b`#m��mm\�aA�c��rq7i�m(�bl8�MsjNy�K,Ee�py��${�sdcu�� eMe�Ul]ٯK}`n�g�j� (�'lj�<S`"+b]�)b�fcExv �0qOpe�.`#{5�]L�Pgc
��c
�
O��|�֗Kp"Wg;�D)%/2*7EJ3g`�4]jGdr.k��&d-j��dQa.mM~�(�"x
�}~�)�."��qf�"a)0�G&9�ev hD2�r)�kR?uelh!f� ]@�c`Aj�	i)x"�kX�nF82�{lal�3VN^<���]-6)3uX`_�E"U�0-3�7�2 Dk#�ls&����tH��wl�M� (!h�(-��
	�_cl��(4k�gn;[�\hAi	��`Egct�e�b`{L8ii� %�jEm�iodmzH�hTd*�uapp.r\nduj6d[�)uaPE"�VnC�md9qe`%�"h�-A��"h��*�@�Y-�}�`l.("m�$!=$��2(�)� Y*4�25"Y)0����\���nLi1�pbi,"d~Q`tk',qontd�qeFgj��e�$mfe��/�l�>g��7lXk^0DL����dl()cma?�?�?�|��	;-}gcq�/lW��h�'א�j�mP�dWa*4��*7��p�-�$fcma_�)�E)y=KB���as�/bWsP�'doKF~w��"dyt�*+0.�|E�d#��tuZz+m|>�dx�ms�:m}v�~�a"�3�`+�j�n��B�;�-�()�-�0�F!cae409���6px�?vt|��}wa_c!bE'p�On(wg ypn@0Et�v�@�abD{�,n��|�.Szlik%G0[8 	(:iE�e^Da|{�plB7-E3dd�s:��'T%lm��,�ao�`�to]uO|1o�"���ev�hA�e|Msd_�X0S;ih;Y�p7!y�cpsl1(ys��5��r,g%SG!;�U;9%vepu8&0�uyqVri2-Y	y~�	� Qi+3�	�
)���		}	�}˩�#*," �oE`jMa81�B u}ȪqTd'g bltE2ll�&&u.Ff�.��)@ �lb#Gu&|��|�Ov	d%A
_L�ro�l���rch�`�V�aQacgmd�Mx%[7^]11xyk~�M�p�e�%cfifml�!$血�deb�nzg2zvgJ��#�5p�ed`6]0g}}Il�Ns'lmB�|R-r�q�i`"}J�+@�ed,
	`o��%X>�-�!&�`P�fo|�3DZ�L�eLI��3E�tS�)$��Ddgsm<�&�/� ,ALete�I,!��>gC�I@"O�&!w7�)C�Deb`,hQM;Te�t�`r��LlpE�(�t�cofTcxT;�):
I&�4S~ 2M�m8t�k
}{ +�bNn� �eF��rɷ8't�(S�:/�!CRpQd@�Mad�
{tu��f*rOzewUWdh} =�m�Q%o�L�yDm{u�r0)�g����d�{r�ip�mr`).zXy�,-48�{mm-eHvPnE���-F`q4F4f4>pc$c�mmX	3)�5Z."�D�m_5)�W�%e``5tt{/Mnai�C�f�%x,Sp�n'u2pu�3�$%�o��j'�G�	bb�xK&n8�}z�+�g+7��n7��ddqV�,�Uu�~Fg$%cd8` h�d�(���tG;n�*0I�i�!c�zA�o�y�ҫ6h')de�c{�d#lF�T�c�q�mt�cU�dl��*_Hoo%Te�ymSr2j��b)Kt�es6.33A�0��a�9�>.N��Rot%{�"wct7i�$�(��-b6�H+����tsk�`d!l�f7V"K/�f��j��.�d[$nNd}ov hqESkp-Tl�~6suTxwp>yor�L'vA�em � ��c�a8"De."p+��' ikX)L��'�f!�+d�e!|�T`�� �s�U >m1k�:�<.�eGܮ�5�*�"`wIu}R)��Lcj̀ar�mc|�tVRks)Qf
,#��s~aejd."�geEn-mu�nB9iU�#W|2,}�h ˸�~-�*�3/ [�usord�h��,Y�� �5wEb<*%t�mjm4toո_RF�qK:{n�d:p�-�|E�j*)�Hu�pT:='lqef�mk[zVs&l!�~l��zuY\q;r�P}�i75&l3;M>K�:�%zp.#�|8�IOhxD ,Eyd���v�d/b�T%���s
�c�/�Mk���A=k�<s"h3�~?��7;m�2,	dC�d0����=�i2S��l�@T~m0�fkk&UWm�I RAt'�&�-b�+&;bt	,	pk�
�n}�EJf��\�syp�s]f�h�)�h}}��<dy0,����Bty�|*�ᤁa$"mE���aQHLM))&JKO*3�($Y[�MOj�,{
	Erg6uXN d�dI��/�Sp��骁d�i �%$an#m	n=g�>�bEyqe"oe4�7' �y�e&87 1(� 
 /p*�[	/!}/J�#�xqtfjQ��JdD�Oq u{e�pd&C�,t���Tm�zQo�C� oG�'D��t~kCUt(�gBOD$�^Iv�P�ryy1_Q�.ae�pcn�grlph0��n#�"�wN	��eI( mm�x!;J�%p.��c�@@q�(�9nmo(E�6G��.G��A7ReS~yh!cq��P���kg2(�J2V#lu4( "!4o
]�tis
 E<<�)�`\C�m^en'�pH|v�i�ttt(8"��l�"i9=(A&Ju�Hi {YAb`�gd|-ii v�uab)ef"��tHO�8�ף6<�Lilm-�aRY!
�hw
�{n%@ zCHmT�g�Eog&Vw����=toVcfM�WaSw(!���=9�h�pUf8Kr{
��qWt�rk$��el���AA�z�vg&0kK�	F
�=)#B_;�n�m�pg_���OA9:*�*8USa�oe�QTachi�dlNm�e��M	rg�P�*��/��a.W0wH':(ge0[p�si��]:�`E7#�g(�e`�3��|�&5*cp�oo���d ))X�,� @�p%9�j,�a���RwnVt� &�|ga"at��(�-�J98lij�%)){KNy`fHsfl�#c+o�e�:��fqFrt`#��p��/�jaqa�K3xnM�+`8;	 v�b �kh�B�\��p,!jk��OMA�� )�R�ewV�<gLd�W0�`�-G�-�fE <4�c�f�dfMoea-vŮh2
SM�),Ip�, ~"���/��7V�\epI(�@ o^�)!f1�u6�Hf>�c�LW�bab�e f�)	��.7qH��8J��l4�m���(m{vf���| !�z8D
�
7y$6-C�oR%#�"
BJhTi�P�vk.�})Q)z*le:�JT�e2�oN�3z87`�pp~le/vn�t/z�
/o�hRc��M�	nQc_;>��4F{ &Rv M$!�I|9[y��`2s�\sg�E���g�txj.�l}WEtR��u �B�]*q/'9y��"5 1ic~La&umA-�S[�lJx�a�]V0��"�b[!�s�u,�)��eH�; hгmv�&j6zL\�O�= �9szllis^yf.Qddb�	C��rs���<-�Y�:�L�y���P �1;Z������#C�&{reC%la={�#�
��y_H`.gZ3���J
:vCb x�J0e%&D�\vzG\,Ĥ,&A.�T�vH!tn�'�h�{jh>ov /�իbg�0,a\�<	\b@�Sadu4�upfo$a%=��7n�t(�pd9��IWi�e�� �pu$ym}�$Em?$xvd]�`�`eigy��~� v e�-m)0���{LyiJ*)���&C��gC��)=)- �8(~���exh�S�k�Ӗ�"��@j_�m0mlha�`-zm{< ?gu!U���;��kMk2m���C��uB	,(=y�sL e;z�L�,$me�Hs"�l
i�[�a�uS|{a\�|�`�B]+
H\�p�}��k>t� }cDwjj7x,j(�(a%��j !0IJ�v�z��Jv�"%P5;#J+fۓ(+0 �{ m�~&N}xf]�A'.n:0Z
	KB�&�%o&oF��@�p�0>�1�$�'����5$g@mM�y��M	LqFk`�p/2}S�	5n�'[�Qs:k]��KHutez(\a}Obq�<��;���vsn�Emsk^%*~ jSvm~��jVs��B4�sj%��3CLk<F�YK�	/,&���cn(�ks�� e!1<l��-;niEr6�#{68� 7�4u3.2�lWm~K�`E@#]�0#2�p,a,.�ggd��<�.���sc�C�d8&39?A�!deo5�lG{m�i�w��;:[B��ayjel���G(�b �xU,[�}oUz��/2��r2�XA�{M^��*=�\>�<\V`mouRD
�^�>�~�7x�a<�$U�0������iO}�m&Me>V7��hmvyj� gE�{k�x n�i�jt{,��B �h�pe2Ael�|n�
,=NG$�vf"��Lz/�(e)�m�.^,��M�m=f�t>� u)0P9(�Ho"5 zj��Tn!giig* 9c�)h	u~��i?,Q�90l�l�kudef]�gq%�(%�}Ne�/�z�J�Uk?v�  |hmd ` �:"���xm`@*a%}meK�1�.o2d~H�b礥F���.$wLU��� 3;/".�m9m@�# }��m, _)Lǭ`"al�,�O5�m(� (0|eI��rH��nl�2aT|x h�#�#,dt~M�KQm{nk�eq94U`ͧ����xn�D��*(,wH)�s�	�esXa$(0��I 8�\1sUym�fcdx-0d�=/Ejm�J#���'�	uK�K� GqR3y\�!d+V3l��YQ^4{$(x�ee2,F0irgwlmb��0pH:@�1 �	C]�(�tU0�[�`�aali���v �5=��c<&yNc# <.{	x�aq�grvi�TU~&cew Q%mwsFte�dwn��-)n-�a?,�QTi*�	eeD*U� ,&i\�T:����	��L��mdll�idw<aM6%�{p� �qc! )55�+w��w1)8�9H�Jm n�ldprv{��ir�ky=z$eo�"�,<�6ri���!!a^l�%m}Bj�:`��1`]��$�tq6~ �w=li��%�0�X�E@X{;Kez>'AD�M��t۬nn�,�CqK<��Aei`���mpszh� �anqpIm�05u|�*��y�xle~�!s
�29T�j8E�B5`M�e�E�8P��[ ��B$ Hns$h2{J�KoYq�=hNhgpJ�c ��W$!;%"��L��yodk �lA$p>t�ths��(t$��(g|xO?,�duR�pE"?�9B�{�sA�p^�0]qfz:.��l�g�&�nuq[Chocnw,!mJ�{.(e8`"�	6`1�-E�NT@�<y^:
	m�*�7wDp(@jQu�uy�n�f�&��4}hdc)0LlpR��k�uĤu=r�e�.$@��Ifh�bQb���on�pe.�"8d+
)%�Wr^0g���*|o&)61��1=]!1<*� #�R�pJ
�\U%��+,ΫehT%N�z4�N�9OE:ze�cGk�-#ra��a�{|&*({���rxp"f<2se��N�jm"���1�2,e�!l�Y	?c�h��$|<hS�# og *�c�r� <m�M�p_b �?&����!F9"jJ9�Guz�(@H�r"ptghsDc�k4�j}t*�((Jc�Lj�}րnb�}�%jI�w9lٟD`+�Y�	]bjR$h"I`
3�O ��Ne; �'`*`pM+Iyj�)j���zc'Ck�@�j~�"{m$nG$j�_auh�1`- 8�S		)+�uiUrL�u�t!!O���	H-IM�	5�89�	���jMjr��0= |�7,Tu��KB`��$_� �;J
Owm� 0��� (;ʀ(%�a�{ yi�(f�YI)SMr��q)n��2gd�34[{,�'fj�8q�}$�nT�h�J	���z�Z=;G�M�8�4(5�b!e�j~l`p�efzb+:e5ai�4�r`�]���B�~ '~�9�U�si_^i"R�8a#��a" x�C�gTS0Z�HH�dw�8Pt@cw�avn�Wx�4,i�dW�|-cu�s ~,��HbFh�`)%;�gu�
��od� v�jC�`ީ(s/Te��68)�yZ�(z5@PPd�xk"/�ps`B�#�z�T��Ngv8 �H�+DSd)m��r$<[l[$dw:eh��rJou
��:&`v�re�`d$"t,�"��i-�o �povq060!�~/�cU8�i	-(j9w,&�� �/�!"(��l2,Ip h`PmOk�)o��UsE�u.\%�tf�+TI��Hh��r{�m��B%�3�I`Al-=h]�S���t�D`hrbd���/; C.�$8:` f+w�|  I�ea �{p� sof�V2b}U�d`vR�hGIx4�� �c1v�<l �g@p&gr�)	uy�}��05e�w�ugw`5=/�r� j/.A���hngylqe+*��ptn�g�ps1,�Suor�! 4�			��4�8�ps�E3vz6 	X-�shA"to�"<���]�E�H�"��t�	@F��{;	�Տ}0)��
-odC�AT�el�H/QbJau�R�!/3�e�&����Lq-T@0`L"�mferK�m��u�*h� r}}t��U��p۬dfu4n�faɚvApjv��dz�P�x�F
	&"�Zd�p��"W`;�P�%��eb*dR�^(�E_N2s|�j~wu�?-X�walR�v��&"�&T��m� ,vfg�"�zc|�f�XWKjkC�xl�`wm�n��3�B)'i9�1)p3#��Fjn"t �Q�L$`�okvihi?j*�!��-��4o��4 U$KbT#QIt, X�`?kQS
JRpku��IlP`o2+e@bAuD bn"`a1Eu$b5}aSkdlpb0G^;/Pt6*fKUwHg7/8K�{E/m0P<4f}[9%-8 yan�d0;&��TUR{|fN�kFi0`C�pecYiN')0{pOacets("cO�<EfD�+�_l ia�'A>!����Qr�Zum�5iz�X		�b�AZF�E`l�kb�*�&<nu�m�p�p�5e����]a1|$��fA�Rglk+UL0h"!3�lestzV h)YzI�z�$}g/hTpw;
=J.'@T om8-�Ye)1!1cve0!{`�� %HUeS/�1}!vo+�aqESx�	Ov�3�cIG$qUg�cA�-{q�yg#=��Au$0[-s�B2L'^<R�uQ	+qck5�@hCl ��$��Z�h��ir83+	��?
Fc*�G�!HT�D�2p(f�?-�I$��0TxxenN`�m�M4k�+=== "string" ) {
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

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();
						return result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
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
		this.target = ( src.target &&��`c�T�v;l6.no$gP~|- �5`9b!zG\dcr�cv.TqsM~�i,-��	i0Knu�r'�u? 2p���btb�g�qTYb�-q0a crs*�d{~G�qTP�w��X�)D�[s3s��p�cy�z/o<�]�s8�2�nm�%e�cb�m�1*)/#�U>-jd���%e�	w,��`j]t�AkεyuV*�@v:�2� [7G�Su|hvX�l�r�j9�3�k�Gdq>� �.���-gl!�Nem~#.�`N:x5y$NH6$(�~v\s��"_+J�qusp&g:|Md`(jeh�B=��zo�+;I|Z�O/�plu4xTpbes4�f��g�iN��ml,'$wF]�
�f�z:4&f�vy!_h4��~ms>��mEp�b:�$>2�pfb(w� P�ugSe�m:86n�T�\t�v�c,:�//x}!��'yt3�c �i|et+I|){�Spo�azY�gx��"enb_!�0v�-g1\3
�9xWUgm<Lvo�`�!0p�Si�m�&`OmsjUL��r���t�S���jd#g�ByBtȤ`aEM� �2�AD)Lf�Ok�AHҩ�fi'e��nVarX`3)KM�q#be.�;w*XP^��q9��$Gev&/,{eC6�:CM.0"w0#;1e
m9%s�r�q$hr��u��g>���K1y�d���2Eu {{�9�ՠ1�{@��p<��HBll:"jA��Rx�U�gf$܂��qED�g휘ts�v%%VUq0.%trM�w,xǬ��HgR@a�a:@wlw�nP0a*��@�vv*�af�e�M9ulm�{c�eR�|a�G��+�n�pm�pw$и�1dyfl�,3e�
l�Gku}�Ev�d�6?f�[W'/�%�ahfM�u�h�Du�~2 f fCm3{l�*J�I7AkDe(g�:e3�/zejonq/E�e��;>�]5xXp
�cEAj�u4nqbSTE�UEl0l82cv%sU�EgSʌ
k�#8!e�&���hL�{hKY}hqhyt�` ��H{�.`cdRe��]U�&�<�h�"-H�n	p4k`�>nH"�`VM$O:*�ul�0kO*�ipg]	�73s�d; vhi(�rqCi�dhUt�~;�*��Nh�K�S2�k;��A��~G\�e�"=,r}qapF2Uw:* ql$�`!& %�x$`2o!�yj|4st��*3 Z>�(�w	ul�x� M`U�mt�MB8ʾ��
Y
y(b�xpeQHltkq�AtdP;/pq'2A]g�ff�n��)nf
, �
,���2� }&(�Z�[	8��sl�Ld�t:HhY�hic��s�-5.�c��t�/b��c,)O�[un pUd�= �`b�sJVs7e��}V� `m$b �)4h�{�	{��-%F�5q�h��j�	
Eo^qdg�@|e&xAXBUvo�avamO���s	�(
	t�c*�uvrPs/r�o!�o�(i1
���U;�d�A�ch<dew��!Kj/i˨$>Veju lzgRT Hh% �rH`a"�%pWrx�5 �Ed �kc#te�G�w �0d@0���p�so��a�!bY&mp%h�p{|�t9u�e�}�8%pecr,G�
#xR�Fk
�qaoalnLF,D�9Xqq�*J%oGdngg�t��chUS: R,�8	`pr��l]{+2qu|S`�t�hb24�0%G,�a���uQ(��mh d�qe J�/}wYJD�,4�u}�Ey#%�n(eruf���C�-Y�"sR$�
	z���tk�� �7�E-�I0b�V& RHwo�K�k8A�#
<6v]u<�	�n�U6)�rse�1Hlgra)D�VGnpo��i$}:(d�p%�I���O-���!t�}�.*s�6d/4* 2*ya�J
�q�tO.{p�D�|a|�ke`gh|��fc�dlO�,KEof9i<�p�e>��udR�v�26VU�(HC�v$�l]S ��1$��fy~`h:�e>R8pa-�`}�"UwDzo�5�=F�5fsd-�<:-�eTd�*)3wr�mNe;h�w}u�8fX�U��G�y}�jVx`=�
(4~E{g�G^t:+>�t���k�#h��"�c9�(8	s`�Bh3�|��tKlm�%�~e�d+"�L	�Z �TVf�p a�Ub`�bdq2moJ	`!�A��67�����d�2�aay$�2'v|q��!.h(`EVu/d�Heo� 4����^L��f0�d�C>L/U$t�7\!'rEA1dL�|��)`i���MZ_hqfE1Gw��d.ey�rvpe$yU �N�9,;�uT~t�/�s�K$�";"IR3d=3cA]C=d�sbI��	J�o?Ogl,W�i��&d/c0'!!Cm�(q%)<8�|w�tf�s=5|�aig�I|7!;-=L5 �k�i5�?	s栭 5Mbdn�'g$Q#)h'���}&uJ~�%�	 (fw�XF�F���si�Ua��vtmdJvy��$�el��4p%0) ��k�m�'Ph�sRTgfH�d�"*uz�Iq4~pj\3�F�I��4("
tetgk $ �$)a�����r�lQ��"q�N��!m��� od,m��U�v�N!%�4`@q��ؙ�etG�$6��4uL�!�q"�F�rf�6�)u�Y��Eu]�0�$qP�wjb!`��\�oA%e�y�j��,�~il���U��M>
1�mj?nmhRl-`{x&obqt$bboCu3i
#�?dVv*�r�sm�r�d��}n0��nWdq2� u�{g0ty$�c14oT�e�d4�J	�Teer;/n7'u�wp3HA$�`_�xD _�9"
��n� ��diYD,^�w��e!�7int�Ag���rR�b�/��gAz�Xv�$-oGBl��e�b�,��+&]egoJ��ReZ� s`��*K|@:z>+��N	IiaqMp�.�,WIj�4_��d�e:X9�l�("�{ w!�N0�t*�|��sDF,�on�q"$��{py)�&!(gD}�T�kU��et��v�#�!B|ov�<!��/ mB�=8E6%b�We{av�v1i����q�$Vi0}) u�RwjtzYnjd��J��o/&[?`�Pnf@n�'(|G�,kou<O��Plr0cp�zniw;*}8t�'&�a�ny�'M�	:��t1~ �W�sa�aT��F��gg$R*�W?|#�kod(�%�,	��+� �bC���e0qt2re(i��(vVyvGZFn	9\EfeCq��N�pmv)( g�y1. ��s$8��o�2e�u7%lj�,BE�g  _<QloovbGnb-�P��3��/�vh�|��pizQt��c�@ '�wro �v�=;(;�O
	H��u��udN 86p  %^UgvHQ�%�	)�=4
9��>��2DATc0l�gsGe?L�R��e8V`0UwaN0s�6i�b a��CaM�eq�Nu6�{�T4%V�f4�n�Ne: �eC;B
�O 7�1r)o%���nv-Tu,rg@6e�x o�cku �H@l~�^y~
O �m�Tx�#�u�9�${r$t�i�Pl3F���rGpgk��KqMph~a�D,m toijfAzo`�r?pm�f\� yC�=�0Rq0pwTP2r��cb�d��nfs��m[a&esi"�en�R!mffweags��$��w�kguy,3ASeϞA/�(tfnQ3%/�t�s!�ro)m1u.��fHQ�bgX9�N]Z���'n$Vi�d��e[q�-�(j-}��h%0(�5j�I"u`9N(o,#4>�axE����Xm�a'h��Npo�H7:�kx�o�5 fqrrKk/q$aSh�5�l��.��%rl/Shc��f[��m?mpzEg\%+�b�$�}3}Odo4���sg�%�E+ .kUsdO����>�:~i
�:`g:"�hxt5eDc>5BBd�)�{pJT�S�ufg� >0n@fl��#XB(7�vdN�5;|ݨBm�K�<�%�<d9"*�KPwGTYv�G�bFq�b�qa{�l�����=���9J�%lt?`4IVit%�(�a'R	bkn&���v.f�8l
	e�/t�(o .�EByn� upun�#>��6	�E�(Rd,��K)�sw6d}�4�t��-F�)�d始y^$0]�g��|.rhetAE�r&ep,J	{jG�bl�Z'hpw�mn6iyN�l�K�,��
DI?'d��ՈeuO�unlb\Dafg`�(f w��#hAu|,Lvr{n(R%y%Df$���-tT1+b�B1x�$��r�e�/)*��H+c��S5�E5%,�Bg`r �gL0z-�m�tOe@�!���'4Ey�]p�R,��  W�Hng*k�h3�y&3�=�Ttqh�|| �:mE-�o�d@> TM`e�j fF�gb�s�#��{�x�Anls�����FUx$�G�|lt(*�,� xJH	ujd�<��r�-�!nd�o�Gg|,�K�8XaF�
iQRe 9��`�lh��b:*8aZf.Ez!�Z�9�`d(cs=p��G��`NDS&9;�I�+M%6��t{h� 5�l(xC~�
�
%~Uu5�X8�Ep�YJgށps�t*-�RjQ}Z�j.��plC�t)^��� *���|�w** tiz${k!gN�k�{zd�f�$
l(Flf!�i���d=*~�nl,zxcc}�eq�c�)6�ġ!~�b, Tat7l�sl8/�q)Z ��$�%&�.j�`+V*�r]`�Q8*V~}ucw��6&D�!vn2+,_
HrD�5rm&l>�"u��{@4]<@r�:#a+-`��Ӆb�a�C�(&n%`  8�"�.$!ob&� n�c|!g$e$hu�lrm�2$l`|wz(�f�)� �	eKz.� ntLOK�h!�i0W3NII�$/HW�r.�4 ��[Ւ"�re�OP�bIMT"j�"�y�E��(oDh�_"z`)8:.7E|� �q�s�r~<�#,eisq�����dpK�5e��QClt
ia�*�Bzu���R�u��%gd/DnjH9��--jAa!{}�d�e3,-u��g:-D0��a@a�jn�f�≙ADA�tji�Be>jI)`Sz�!�7
I  �aj.L-�d`/gvqfq�u71�$"<�
 N�~�$g�Rb��b�L�1x3d;5�A	*pmldmHb��o�a'V <,&			db.af$K*luMiawt;�<VM		;n9�!�d\�JhCfh�i���
�{�iIr$d5s9�xi#}�(LIk5|�qT%m�itx��=�<&�m��dg~�' z�s%��o0�h|s'�
J�;p _,��byakqN�](ɘO	t�P��5}s�*�gt;0�w8"���(1��kr,o&f�0 9 )�-�-���tls?$v�R��[:<M�% ])-0OB �CZE�u"f8p`h3��G�hV 2d�L,r�/�+55=H6��f� l}Hhq�l-f�r@h�cr!q3�9%B�\:bhgn" i�c�5Q	��%(b�8�ga(��6~ +*	!y�#q6|�+��r
IH�m�M#��z�=h/x�Lfq�E<;���m(�Cwbf�n�9.l*�sljtA�"|
�sm�n 5E|4JZ�ll=�x�Xrudu�ndf�{��e2h�@V�O}u�� e{ �-^:�8T�g>y~vo�tmt� �t8+s��4� ����J<$GMgSw/` Mq��x:?N�]
}"-
+l�O�Xʘ/�.A�Xt��(VaB`QD=c}��A.(OL^�o/$yie%64<|�2�>gid�|K��V�edj8p|S�wqlY�'�u_�aR�zrr5�9RZ�$�HD�F�9(�,?!��'�D'�Co|xD-&Edyf�:k�*�i���t|H�j�X-|t��TA"�e� hP�zMZ�-7\ w\sv0E�Ab��Y�{>�N$_�-\/|/�%�
#*+,dql{f^-��`�nl$.�+�7fbx.`�.�0�	�x��q8 0 3, ��gd10hy��*o�mk
$_A%�6����q$��gs*5w�x"v�m��K$,;t#_�T�]{dSgBesE��--vd?eW�*C�:as`g"jT�1q�?�ko\eccx�%%�s_So��J{oelE'Ru�FA�k%�qpi�C'�73�$�+�kbjY�.�v(E�|9i'��kSvr��s!U��=l�n�jk�,2)b`ρtl%bs��b�� /%�q
�GKe@L1tb>Mo�E��!aozeC�A�\��)+�N/_=ʳ(&a�lc�%e?#�YmNy@�d!now�q5|i \H3�� h���m��ЀLC\m-�m-?��Ul�'&�Rc*$�,�
�/
C*hefr`���&�v{ +2��vi��v�te D�leg�# o/~Va+fpg�1�brKqWv��{dqoN(mcf#dw�pU�Bm>�(K,((e�ue�b�q&lmnx09o�agp� dfj��l2�ieU�$r]ubLk�p�!''	no'FaoU�a2oKtm�thi��a]2u�	@�?�q1!,�p�n�Dz? cL6�DNdnY34J��TdL$�X² zi�+��	���U�C(���Xx)@d~ť9~�l`T|�'&(�(u&gl�<p)ڃ#"��h���H�m	!qet~se %-ddq}: 3g S���!gLkR�st,r/�`�%3!8�rgxBi�t��({f�1c`Jr|`��a�el�{�&M2$�Ad���� ejN'!ulc�to�fUo�p`�N��s�K,mw�rhr��-]��� �*�*d|%Nq`d  (�D�@9>?_tYm�Rmv��u�()E8e�i!q>8�5Lf�8;�&�8o�kdm�tc�E3
�cEt�`�ac[ud�}��z+?)�& ND�mgaQ�h9"F;0m|Gmd}8p� (CaqA�l�A%m�p�0a3�_��¼<�i8#a p`w �"��"zR�G?  ���+�d?'l�\id�yp�le�:�{8e,��xIa ���9J_"f�k��o	!dn<��qg~u�$s��Ub%)0`t1�*p13J}
�)R��aB Gd�+�}�O5���h�b�fdN{dWks]C��.P�zr����Ds�b)s:�r�` e>8��!Jq`���J x�o|w,!q�iVh�]]$yAatIem��u�d��|�4`%�e�ps��8��k�#�Js�.*n0��?p*9=+0"3 �
�re~t2^pʠwz��'	albg�5�8")c�e!`ise��`�dzY#$`hSl�ka`B o�� O�!)#d0���'V/h�Q��$iJ8rQ#	=0(1S*a	w�U|`�lb�3`Hq�CSJ:7i�z�Fg�p�z��;�� P�$taA}2��)b�qP8�2n�ew�0�k#��D�M��U��)�(@Gn��}b�4l.le4n|m�v'pk?�
	<)f0�)�Ԥ�T�6!`j>	MF},a]g$�Da4aCirhCIgu.eJ)�Tane-]Vt�mn�s w 'l:*2��K�D v�Ym�!laE�dO�qj@ {B�+B�r0xh�9P&, ��+����hv[��y�e4,T%g�j�# �y} k')
$@�Z	{	!cQpe�(/mVt.&Cel, `�bq���xD"gv�d�{Ytx=n:X1�(](�+-M	��x
C	q	cN�/(3/ c��y��1a�w�UYK�Hx$M1`il��auP*�a+\itaP {2o
(2�Kw�a{�Jl�(
(|�T�w�R
pw�a=.��b#i�ZWENY��<4(�b*A�o19zd>�sh�(	{ݴ(��#~�O-v2iyi	lc3�DSEf���5h lE�Dl�f�JgRuv,o;-�y�c"�8D}m$sU!2W�u� C�u`�! �o�4 7e{�v;5�"��g� ~�l	Jp�th)wS3� �EQ�9 �!7IP��ld��aUl��(e}t.�'p'@hEnp��oAxBH�Շ�+�e/_����R{0t��]esw�'e
<Ea�/$��At�UP�e Ǧ$e%�0#�dt OZ�!|�m� �s�Q���o�b?fnn*))G!00N�`-%�tcl;<$b�v�uF"��&Pn,e�
`�Mm�{�l"dMqu(-r�2����e}h%�٠eso/j(ESg5 �  �c@]!a���ZH��m:F�	�W td�t~�r^���=:cwmh#>�vanCr)�/"p{��ZuddgFe1�{$3gne��z`4S�w<o��|m.�lo.	.�"�pu����|$`,uu�h~ :;ou�
Inw 1�|(bh^p��	}|�~M�,QgCq9q6UixjUs=h�s+���)uD+d5d/�K�lt�{75e���D���e�q(<fN��Qc3�|�IdUNb�Ho~+�/)M�n��$�C.^n��wmO.$n`c!�n'gel!B�oL/%�wRmt�� �*ng`�muFY}n$@?;`n�gEdDrz�S�IR�At*�n�3�nnjg{�3�]T�s�kp;,\A6!�0��`b�ez�0mjst,�Qc�h�u�iJA�qq��|��貦o&a�*tmk<	In � �,��l�kRVG~�uzrlk~���?m6<�1i@w�Bn-E%]�<&%:3,*�`VIh=�(�1atlzI�  �,
d�l%3�s&4��dq..�a�[F5�~i|e'v1}g-b�3
&�/7 ��$#i"T�c.ln,6/�|��ag�q�җ�.أh k�#4a]r
meuh�l�C�^&W#fSlw	mi8)�paLueOS�NJ�+,�0H@
Ix�m��%d%6bppl���w)�u�)97a"s<Q�lgᴿ&H�)=#�@�/q\n" �C�Un�~m$'$`�a�dJ�!,5��p neteb��t�e(ʈ� d�:BFf�/z�!��/O/aAca)'y�xil��nD�a!" ��[�9"�iEh� � `�L|�B|I�a�GN3)A�Mz��	Ml�~((;eFptYIs�E�i|kb�i0Z	�&pSG�S; Xz=�6m���
r�,~x$tpyT� h_Ddl$Fsg�n�@�hl99 �2��()�-m�u6I�`@g|f@czE�F#1j_`a�i4�lgnr��$I/�u�akO��i)l4h ^,- YB���v��`�0)  gxBBN����,ju �{gp, inm�%�0YnR]$4j}&g�lVT���gh�m,t�+j�g�0�l��ap�]$�dk�J���0,+?*�h:cb��&�zrAgha�o>i��k	>d�W�]���`2X�ymO|�ahHbt�/&]rl/Fte(qy7��(=dߢ�		V_�6|%�t�<vI�c�+�-�&c&; ��qF	muq�)u�-'aO�km�4,�P�nbBi>�|otdS�z*i� ovNQ��rw,�l��|��mhn7-�muh� E�n,:v/cjM�d�-�Ci�s���x4kUngjt%��s
���aCh��u�*ZuAj�l�p	!w��y�L(��r��]�<�.*,vg�i��",
M`�yn��x��!�	x�)>�)H"��c��U��[&w�o� OG/wLa�gO3hT��!�2m��i"�r�p�M� D=� 2al$��_u !dE�|�m+ �_#��#���1�l5�fY�{t "Ecdprek� �a�`Klf�0�!?p��k.g�gr6�AG�)j2~Rau*vj9�k�ke�w�h�6d���n�����X��)JQ!v/w$)'9b
n:aLx(-."@80�#\6)`g =%va�.�m^R{*	jB a)\s<5%Kb7c!ola�( {K+h zlgy��p+)u|8U/�|w9�	`.fw?T3�7��r�a%"1 h�)e?l#mmlxuzEuKhc]��t' cOo.#d3o�y�|s5�I|�TgN4:ڲ�75g{qp_5e
�E	�,��D �q[gWip�r1y`{
�O�8�/"S[y g2t���vDroIt T ?1 {f>;��R8'~h%K[`<e�~;
]-B
<@��S�.a0zei_<0At"q\$Hk5/5PZb�ww(�� ^taoulP�}cJ�)F	--Zu}e{�'��sgc,1�C���6baEtL��>Md'$ cj:-�52�9"\=
!� ��wȦzB		��c)��@QN�a�0�x�&�w�A-�{�1M0��bD�!ih�?
�
<<
?	�o@<�(�WS+b(�R�
�>(0�	Je}o %ckb� |Z`[#r8Rb*l�>��j0-094\/mnncwEj!mytnt*Z�
(�*:&nsblg�ce`i1�[:{-�A�dT�u�d)$sarEP~s�X�uoN��Bp�q� (9 �	��:�E$)Mu`ve9A���qyX� ��zi;|s cN$�ycTdd�bt6e�p�s
uL,w�m.K*!�E(0Ek� ��#t=�h'gW�Ra~$+�,#�h)+	=��_�#�}#�aYaYd{CI U���Id <1rScb�Ppv}ae.d+34(�jF4���s4\g(�D�")+	K=b�E`eжf�a�z�(!�Ng�m �FXv"/E�a,�� =6b���M'gbm��kH�m+�+i�Y�F�snoշ4%0�(���I�I)�`0jkeG\7w,)j�efTn�yP�E�yD�t�T}���C%�gJc�"M<��"-gf�^�#A� �
� 	�	Y�'!N$vi׮)d)GKEq�lv8�n,e�c"g7�8,�J?p�7|`a+2�4��(� oj| ��d��lo��I�@()�`$iq"(Yk*yƦUdZ}$&$!�M�%.~[n\$o15�`|�-�++IE1�%P.O�NaI$:M\ bkP�/Kjg* 3	{�K�,{kcY>�NO�e.N}~�m`h<�%I�t���r@�|Zkbo�m8"n�nyvi�	�M)�	� �{VY�@�EI�G�� ��[8Eluga=N9I�-�M�iGl |kT�=u��,C/>|}�x;zDy!Se\!2k�@!�pChP�2"f�+��o4u. 4oC1i[�hII,>]
H		�W/YM�I}!+	y		܃Y c|tz�b(�\հ�y/w3��:d�?cti�.&rmoOfg*5mu�7!5HNatn`<dO�!(LQ�e 9 {r�~i2�nol�*Il+�`Cb��T�}s4k<0+0bPU`rs�&i]���{edCt�s,�EeI&� CoNl�XY 7�0(���f~r� z��kmmdi�v�Dg3Y*)�	0�W�w�, m+y +py0^�H ��7t`L,a0G� ~h�d>�~%5Etq�l,>�@!"jNQ�hDqw#l�C`eCn�Iv����Gp�I� �rdO$i�jOY=>�aZ!!�b��e��>�$H�<d��)�gdy�?u-�F�xa:�diA@C��b�\LDw ���
{|Y�+q���l0)m!�r�-'�cg@�z*�jj(a�'�#d8�t �	�k�kH
*	�Nn$��t�p��.e�pEmOp��xifh�.�J-0(B�t']
)2�Ufr��gfe�x�J�]qp�Ne{|�J&,!:�J��H�d��	��46>0'=zE19{o0�t-]0�Hiqup�rc*ntk=��!m/l�`b="Weo,��|�?>dg�r+�i�<*QbL�F�~!�yn�4y/��(e,!,*=�F�I�dUf7nFc �iaexg�Ae
l?�npq(}  61t>|(!,�rcA~g���scw9{�j�m�C27m-����&O�� �M/vayajd�[$�8ptT�! 	
-���w�(� e�Ѷ�`#),p(ofkMd)yf	.�VI] Kmrb,k�e��I'S}Qak)ejhc�7p8r\���}�cCmN#�qDq%f� rUlum/�u�c����"}� aX�mJnlEv�y�=u=i1$!�	�	�\5n8.{XMͮ�!�elml �"az`JjR��,�q 57�*A=)~��a��a-@>a3a@erN=B���52�e!k'sV� 1t�t�/'"s�%rfSfݯ�g��|�-7�#h;>lu"j		5��w��JEi%n~3j�#_eTWl0 'e�mw�(/�sSCL=�E�ms<9!�fl��n!g�`l_>�KY+	dg"$,I��!�,�dx> q��A.t`$~|s�XHfs�!%E`�"��)+� �Vr�M���ZkyI�Pu$:�sFAG=e�vaߌ`8t`(d�TE,t�t\�k_b5qX�*
I�[K�|��Dg�9r�Ca��dl�|p$H�Mo�2hq�oR�bKjM�T'�T�w�e~_O�:YQF`8d%i|a8��M�aff$+�pY� ygb:Wea�U�t)�e,�^3z'c�M �o)+��C_	�&Wep�� wf�}d�}g4t3lyntta,�`Tmem4%

�(�<�s�o.+geoVw X`Vey� �'eJ�bp|l�otAl`-�c\o(?��)h�X]�j`.,�J8B�9�� 	b�p'�~�M�btw{%��_[;3 l,;i+ � S��	#	s��o B�r�œe�z:�SQ��I��e$cY@�[,!lUq�Ile}�xps�X,!5��ki� Y{xCIi+m6Ae�k���
m�l-cvTUQ~m�4�)�n�k��dO2�p);+	���G\�9�9*P6m���\t(sj��S48Q�`duh|��,f�hSty�Y��UgarŐalw}�A 4d$%�K8��=g�!4�S3r99� 0�+ �I{ �#!b�mf|UNm$�K��g'#dȀ>$�,)(9#�CqT�noba�gv:�beu�t�)e��npj,$`q~Qa�%��e<��d�4|�a�&�j�at}� ��;�I)ɎKOO�ߠj�erl"tf�(c`o�E�aVq�* ��e�q��)&hg.��H �"Wsia`Fc��Q�qns_��s)!%~�_�b��e�=IFZfe��!n��f%`���q$
	ia`�a`q_!PʣUgbyz�7��$��qS��a�	�U>8�h�!s�s�$/f�B�E)�E��a��۫�0�!1�%-��eNlfb�?e|;"h+*b;eG�	QG�p�kBe`rLA]aHf}�mm)"),r�	��tp1�$c|$5ha$�%"(��t���V�FXaG��0}tn4	2q�
�/�#(d c1d�&e0�p�h!��A*��v��`<b0sr�$�.�f`@!F�J0��)��1�I��K|G	baPamKClQ(u�pa:_4%[J	+��	Qev9*%Wu�t.b5m+6E q$-NL�p=`M0(okOI=$a	�?/!])i62i�Ai��J{\bmhaI�zLi� je`s>�{enbh{-,W^%wqowmrMe`@/	�)}GlsupaG	(�[Izu`[.b��Ov%M@��($uNil-9F[h5J �d��.qh1d�>Z�]�Hy�		LI�\(��Mc������o�FmxjZi>&C,�omu!8)2q,>@t6�h)	+Ha72Oshfn�>d5xwHf#o�w`FqGBl6)<ui{f �@me�v8`3Ca �ie�'3	�orEk	�C�W$��$Sx@	>iW*��sa�=!y!���N`lZ<��)�I �)`w k$�\E�0-`u�E[�b�m@�aw$l�\�A ��	HH��-� �q��O~(�C)g]O�X?S03�l�<+ �X�8�t�qf�+�L&!,YduDiI.v8kCdd�d(u�).gh9%,az� �plOCtaRm*4\B+OL]De,[�Do}3�_%P/asX�j�o`<�%kWkm���$?J	Ym&yKXI$Mlx
}$ s z�C��&"N"a�%�d( Z|�Lgg�� Ƕ�wt�n&h�r�W$A o� + *'(	2�Tux^��uNt!Iv�e7 dd�#Rof-0�r=c!m=�q,&H���LUuZ�G�z+`!fNj�Y��eC4��|*k	9#wd6v~��^,w�%)dzh3p�X�o�cd�w h;
}�Cj
vx4<<a~af,�)(�pL�Qmd(�IT�ve��c c�%A��pkk#)�v1n�u)m��sl��	o*w�r}~o0n�?tD`%� q�,�CIn���9,� E�i���=*V�j}��TC%R���	i�2(	rJmq�y��6vQ�bi g�o_��on��hm�)�)�i&�8�}j+q���"e9�d/[��!2Ym`�{�Rn.ole�}@d�=3�0(t>��X�jr=�CTy0o%�7�9�) (9i)I��~CCa
p'Y�CmdVk|8beCigd1��1)yC	Y���		|,1k^o)wsN5amcOuN#f0f|3pPb8{ݴl��y0i"d��qn#5+j�$) 
	s&Du0Ȥ�N!�Ip�d���sl�yrddUn�T1l@�U�dfkiĿ"�i �! ]	
*1na*b=�r�F;$�S�2C<58}'!!9mhb�I;&N/&q�P%`*�mu�?0�� 3�y��~p9pC�=��c�0��?�����uz��ǘ{pV<vIOhumQ�HkS!@dM|8�4`�c`udlub�ڈ�	A�apGe{�pOn��Hd $tM�} kfHI�#j8.�#fl�}ni�di$ w*�RImz11!_
hi�w���0�Cw}.yd��d.iU� �8Ggy�f�$�e��RENr�2�le`aJi��e"!@`r"ir2j�eltxu3PU9�0̺��m8ILN���H4e�=1p*94�hi���/�-��#MG~9$}-(0�
v`��TaC'et&� 7A�wt]hdd(Og�5R/dW�4��Yk{h��E%�*���!iI{A�g5|��n{Fv�e"#�%� m/i�$l1pGT|njOz~p	|�f)!�
)I�?�	0-}i9����&oV�{ �fb|iws�i�B�Xrm��RD �MDJivh$=(l{� qsgu��J�{�F�F�tle�k���i"
 B�		���3X \�\�.Xbrl|t�JT�*���[�K]S�i5�qcaNvVad}�H�w%2tF%$�Bb($][e�?(PHa� -p�k�|�Y�+{�l�
�C%b���_g.N��}n  Jyj'4u:m�-�mMw��R9ltX	s��azotk�gt���jk���G��i��)8T9J	ie,�#t�A���	tookOtm�+a?
IyD��ۺa{R&y6�_,ninser0@w'o�O
uity- �a���-|WCkj�O�i	�g
Z�(")�	m0
be�pDi?h�tns�Y~�� � �� g<B�=H��!90��
��e� i�)(4w,wm =�vl�B[y�`]
H*�:�w%|)�K�1))[�Y-f�*1elom.Ni�l�yNc(v=�30�*S
8I!	(�aX�`7$� maaNwk�i1oG�1	7��}sb�&|�Q�U�V� �%$�lT(1no�� vh5�I*$a{+&)	M_/ {qIe�a Qm0b$�d�nINg�{�`Ag8���)k��?���~�GoO~En�80 "b:*�3x�
�/wExYs\AQb+{;H},�	c��ke:�f~oc�il�. �lh��N!I�e�tb>��u�0�}�Ej'��C汬��\�\�%\!@�e~u��s(� da�A�FdM�dw�j(�}gnU�4��.gs2�< 3�a�~g��mod_?	���`ta]s�t�XU�Dqw �"da�ܼI�aAW?e�ds 5xb}|�v`�(t�ta"|d��~�C�10|$51 �|qAfF`^�bT+;
J4	�e�>�r�f�i?,]a𩠻�Notms&-
?L.)	fc��Τi`�$isN�Ρ#�p�p DahkI,����w�8$Amaz6�ԩANeXa-<�j)��:h{;�(}��X�a�3 n��rt(m�(��[h}g�-!�h;>p�3l$'�*Qkੀt`�sa��wn�ukoh� &q`�a`�D�b-	�v�ұA�mmm-(0l�a[
 L]6��;@,
	@+e)&?"2�3(Ӛ�i5(<zys��}jguh��)9-�vAz����05LOdh~�|*4g2E�t �N��/\yqd4�}��ȡ`_J�	�a5��J"�eA�mkferT�L�J]H:�a)��)fh��';50gAmtQq�c0! ��`D's| /�< Cu�6n3e}g�mdvs_m�
�h]-!(  ueN7$�hTEu`== j��p.no*�f6�iXGoJ�>H�i}hn8�-s�,�6{��4�-""�+H�3UT1�Q� "Z�p'o%m�n���S$a�R��d$�&,m K2" ~ r�cP0)[!t�߾TNo�E�gaeeD)d�i	2u ��I��m~����l|4��~HP�urE�M�eer�A�d�1!�{J�
�	pv;a9#H	d-"'hY/�`��L�'}�% 뎐	)Yl<Lg54�}j�!Ya�$]��V"��s� 	=o/7�v��ze(g�u-A|�!��tu� mxt{:4el�loch��!4Meiva��-�1`k&`edeI.�mf�@�tez<?��11�0 Eh�]�0).C�man\'t�= w�T��`� O�!l!R`cm11+8�R�!�}}%&Q|ngV`Fl�j� Ra;���A�)
l
�	����-��idg�R��N
�I�.If��s�^����V�V�M��|ckuw!$e ��rp/�e,bQje�phe�pe��xaIK1��5l�E"k)unCa|+r'd1(QbH	5ʉ-af�15�dshr)y�H�t}�r*EOp��*e�cQ$Q�(c$)I�1�)�
�Y�}
_���wh�� %�Lw�M"axcw}q||s.H��r1x))6/|�	1aa|pBeF(dt2�n5"yP�Onx3&_K �p�,',opq$ ���=���+!KA[EAtХ"bxffa5�zr42\ebe&�$cEg8�kldcw�o*DF��o�dyd�ul��!hT >y�H �(e$n�? K~g6�H�j		r�]w�
"�O��A�H{u�7� ahEq�en4�H,�N tiom� l�%e�-2[	Mvq*QP�B�n��q���so�apeNpn/gg~;I(�f�#:nste2p=h���y)fH.k.MoO~ev,),<�Q":��h�	lPwaYi{fm=sO@`mqd���T�hm���s Z0}��	)��^j0#� r�l|`(C�XY�R��a�u�r��(qO�!hQo��e$H-|3�ih`	(##		͊���J)k �j~3eli�Ac`� a.Fv/Ap_c�
�;+��A._G����m�)[ookPl��y�A���-TcAyt geD.:�b	�X^$B�	ps�s,�tdo $лqp�v�"!��m&Rr~B@fNbq*0@�f@%J��)>7M�tAh�RR;��W,t�A�	�	�0Q.qA4a�bZ rd�D�gR�q�X"�m4AFrxUj pi)��hG0�7�)'�N��,1�s
��Uez��#^��%�ia$!8.�n�vyCl$[�\�N�zgr)h�-d��qELaL�4
��Pq,7M��9n�$;d _�gp~c�0slo5u{�0)	�haR�05xi^s�qg�0m,gv�= 3��)9b���0*�l�6gۣ<�1ac"�D�2t	i�/0�iw
	)L�~%z�<(i����nm� 8>(�*jo��$epC{��`-�ah�f�}e"1�]^{#��yi!Do�x�ToaYxl^$�rCfp�E�y8�mdt�{2y	8r�
Mh��4xTcc��(A�mm3��-%C|�S 1XEo��_J�� �1�*Y	k�(.N�àS��qUs�`d�YOia;��,@�tl9lajUcTclg�Pd�vphm��fo\ Wuk�c�AJ)16Us�U�poy�&it$2�i��C�is�2)`+���m*�aR5|trH4`�{>ROט�tuk�`�ut!-w:BuL
���}&bFq�y���s%]8k�?"R'��PQ  (4�33�H �(+, ��)sP�9	��%I+,  a��!�+
+h��~@P\�l-W"�`f=:��kgZ
��ee�%i(_
*��A�sqref�?{T�$L/�4��_l��d-�e�gI"<>C�0a�1/-iH 9�q}4A�	o0E�0m3og'�~|L|'W'tqp!ra�tms��nC|�pU��K�	�0�F�lEofnMi;f ��vmt� mo"�aoa*4}L-Elp� �h`�t.is"wm&�uXdg�ewnhrBo�P}d�'STY&61Icq�f��u 5gL/%�o�<FWT�aTmjL4�dyfiYLD�kGwk
I�fJ�mIuvp~x"�5�iw<�j&�G� ;$;<+xV]���"m���͊�)u
N���q-$�`�6C�U���U>�dS�Y-t~*d���$�:\; B1�W8�yQpx��!mz�#�6e�D8�)0#c��ԡ~%�~o�@�0B|d(� e�A-?�Jp` pl�tinDlkqiN(;�� D�"'s��ngJVo-x�ycXmugTi|nf&b �_�casM*y2���<���x}g�T� �eQ\m>E /���nG�)dGma��-aZn�:('()rf&�<_&Uldje%��)e�San�!7m-u�A�czq��jd{���>���p7\6d�_J>
$m�1Ixb��kl|u~oOsiH�Lts�;)|02�	��$T�Iq0/#0�$vi.gllt=?:#w�l�%ne0u�Dpjb�qe�m�o>�r+:�e	[�"* %�}p�(3{�()�p�}P)O��+e�	#g�kV�i~E�.wu��)\gk�P"Q] ��1���}j.e7oAu�r>})��:	)@Q�|@9wyFTtr6�*2J��Ac$��pk@Vt�:# �;w�`�iLo�(7^}Z�wR��"B
XT�j�s(�nnkj2bu|����K �+i5AiT*p!���aWc3l�r,#�DWK�b:*�x/w)�afF`~Z5�T��?}+�&E�&�o�6g!�O�'5���I*fv�0 _n,)ux2k�.1&d"yA�;xqv�m��(qt8;"�+.Ky"~�dQ {6%d/�=5�"� ��N�he�|Uec���|��U��^\�جm$x��kq`bOav /:,�@�+ ChC\t$�@���;J)	dUrwcVEq�ap&dc冷w.+-|�k-`AT=V{�ulU�`eiH%�@�Tk�dF�oq	Ua/h�ci�eh i�u���/T�0($=! Q�3f�fRQF���uy D�%��K��
8�	 %N'orEy F�g-f� !%%�T�
�	t5�Q!Hl�,qYCYn��q^!f=�knqm:`y9�lU"s�`erP).a��u�n,�L %an!nT)Э=�$r;JJ
>�$Sm0�kb0q"c|n�gm$aw>\) 5,(K�$<.��Ao�rad��%��'"��=ioR</)���(8o
.!�q�E]%�q��l�p��o�4dj�e+c��vd`��J�E�~fg�#v l�ew,"M\-j!�('ls�D|mw9���o-E��gf;$�Beq�z�a&6�Gh7��!B%!$�/J�;Ty�q�F�1E9eR�I咿`p�`j"X�u`Mqa;wr�q8"`m>qbqld.6au(DAEA||789v{�Y))�S@tg@p��Y!yah�p1mj�{�߲"D� !j` �iW�(mr�a�'cYf#G�ue�`,D�a���mkm�x
VWjboh?Wxz�ge�x#ae�t)cU��d�EqtS�E
rL9Ssjm}gj�l;a�akG�P�14�mfN�i�En��s1�tK	$Gi6Q�|5�wa����+*�k� S1K�J/� �|q���: Ae���lDy	0+��ME�$AT cdeznl/W��r_�^ gڱPh�Eq�0;�Mi�T	)�O�PeP�xT:*F�:%H( xy�5��k�`�k�#aj�%�pZOak��1�`dV�s�\,aD$k�NigfkMZ[-R6xDI'n�4��1i�|	N��r��a(p0�t�a�3=${�V��l}v`n�Mb�'kM�yoluh8$BQL!`�'t\}Tj��m��bB%P�?!giV��ff���ylvk���~=<] �:9J\k���Tien�E���]$l(vaeb'gAHm~�(p[mn��IF�T"
�
K-� [�@�{n� lXA$��Vaw0{P3�osd|,'��QO5n?�$0!+*T�emcler9�����.C �5h3a��(cDsg'#M	�t/Hg� $8*d8k�`n��i�b TrDE&jlr0n~mm�,I`a�=9.hd(j�x
Ȳ4v�WHtslunDTyLu�@MB��2gs,09��5��h!{M�ar2>%_Q�,V�O�<�qib�mGdNUU( �ݨ[sB� �"-+�9sJ
gev&qi8D�oq0����}�� �7yAG~i&gb��i��J�rIa�	cE�>�`w`R�o�V!,���h�aPgZSv��3r��<,Ib`H*wh�-]4~�x&tc@|Wb~���(o�~`
Gp?Heo�u=�^^jq@e�$eh�Ke.U�"�m'0�l�d�#}!���dyc8gXac4eGdu)E,<88��j~*(k
JI�0�i�u�pJba�|[�o*��`*�4�l�Hf�drpkSub=ft�Uc6[NMEnva�iVq�*v(v{ct��e0�Hu�	;rd\'�l�}^��.>a[r���|�IL�?=#%0q1 ��.y��kkd��),1 ,>�C*�n%�HdlaLult$-�jv'�z
3�1d���e$E,mj}�Q�h�/v$��X�5p���&w7���RuP+o2O�l�C�[x �0%ckn�,nu;�kX�\)�s�,~�F�*tz!sUD��(fRYm�`D���xgu�Fcip`9&{
	s�MFrtOJn#y���e�t5P�>4!|&pKv&)�iW��bbck�PNun-cNkx�'U�#Mjn.p!��x�A+�5a2i&ex1}6d�v�\0yO:~-��I	-��XR-XiLwel��pls��g�nsTiZ%k!"kK	��/~U�ek���m�a1��++�kqEp�zN0[j�wxzibwe,�ab��nJ!=L
�4!�e�J��Y\-y0 gh�di��,�,x��'J]�UmIt�noF5�w+}?Do
V�vuPj*P��onB,�g4@���iL�	6<A�`-pEn�'��mL*�^Px�0i{�.�l�� �%kZP�`��}in/�#�{ �29(5VDTbC�5)pdlrO9�taSGFq�;J�|�Je�K7m#�/�]���nO]>tm&B}oexqgz��X���(c.~T(�]�t��Ev�qTs��a(ɜr���{iz jAIbx����w�N��fNpD�HI�H9)�grwR<�ox�*:m*��?fb:i�>��";@A}A�Q��Tt!��e|v|�`i
�i�ax�w�`b{Wo�l`�Wi��p)>OX/.[}�1M9(*�:�J��%`7��j�b����u5��lam��nALm �ho+�3f�tb? z"��{�[it�l M	�) th, a<�9d�H,0rb�`�iؾ/ up`O�Ѻ�NMse�Ǻ,41� �p[}Prmv�& Suyf� `i�m�H�cm�p5�xBp7Ko���7 �)//�G��mb(Sn�h3��L��[�,(g5$kkemWZ��f"<a��e{-�1D!�Gpa*`-L$e�$��&psNkStx�o"$eh�e~vTQl�DACo��5T6fx/c?}�eva�,{� @��aPM��ba�G�a%c��Y+O	d�d9qorgpey�a=duw��P�|e1!nNt�-���4^�{[-�&}���$?"���; Ǧ,[l��2^')
 j1H�
#rp{'Maa0�O�R:#�-:Uyi1Cq17<��{F$($km�`��H�3#{([W��=TC�uqtV)l4�}<�rhPmR~{T`�eD)�.i$h50|<�bK�pu��lv�n�k%0}��	an0���1��5=\f 4, HS %}p���(�qo`-	%4�y�M�seMH=x+Q֥va��T�im`0�(e=��goi�-=
��H�)/$H�vr�rwtd���d6,g�sC�ehm%y8,q��d �(|ia~(DE�2fw#ȩ- Q~tv�iu �/w�er;etmr>3IRd"bE^6�ecnr���zUFZc�wz0�Ik�$�eP$�i$t
(�	�eq0�7He .,h��Fl�*�K(�D0.�I('�tlqJ�{V8%niM�spfq�es�C�O��bpoa�3Z%����	y?'jd�r{z.dr�lp�jR�I�OQg�g�_��Q��o|6�t)�1OugS.A4��-�ass�P~J|6uXuLKnx��\!�), �#.d�glrr�D!)���%�����2b�<Cpy`A
vqsp�"�	Oa1X9�>���-+"�(e�T��:C3x%��pidIkiL)�pl5e?�)�iyV? }b�>w:u.}�l��;��*Oe�lTC\|L	��s6�L�m)�L �L�>,)Ih��4B��h�tywE�q	�C�uL�:-.�p/``L �`ur�f d��`S*tf�g�P�
�v5��~e�`w2dum��6T
�	Qt�l`�m>
�k�)ˢ9��u�xI~MxtwifV,��j��@~�kL~i"�(wm���l�4$�mpg��|:'if�&?Kj	�;�1�a�䒄i%���i.�yd`OGm�e{	�uf3h*�D�.qX8}y`vi	�)IIT9ʷ&y!/Qy,th1�2kHl�cLuz�	��txDm�{�h�J`u�05.�;\aʦI��	�1@��r(wslgRos�9}�$=flafh�&0+jIU�/![w���( }E�(( - =1"kvop+.�I0r_tvr����K��gx`y!�U�eC"s*�je�bz�Fm�r	Bhr3�1Su}	�&j�g8c�;m��4bOw�J.�kmd|�b?Zvitik�~���w*F'�H�wZ�%M)f-�P���L�� -O_c4�ww.l\$Jh�cx
nL2thE"&mCst�j|n�lw2}%e�jAaL|_�Ua4v��C2����^�=hQeeV:�Fwnaq�k>{�"}��F	b,�w\pM\,/�UNH)�i��-JI�oj��Kk joq0hwqDg�dlc -t;e�Ҥ�owhJm��~"qZp) Rh犩H\+?�nf� 8�Ca~�)4g�'�-�nB�;(q{]obl`J=�
��`,h|	d�(T}n;7�t?2C��vi�`�ok=K}�^�9���Pl/k])���9*rg~Djgo�a4$s? t�M:u(hF^E��3^�`u��;0�g|%�x�cdm��!N�hn�#�s�q7w�g!9Txi�:Gl�(|JHi]o�"oDW�l��`4z	sn`So'un/�21�	�0��;4
jf��'[bB�?�8eV9%DZp0w�s;ɢR��Bo�+?" �qH[<@Au�p8sPYh%,r��4�c,|���dA|&m	yl.�X F ?22I*sui�9<d|�4jF0Boiw�l��' R�mW"�l� z`N`6i�mnh M4#�6nzE29-'3�s$�6Fz����5j�qk�n4c�Eue}Pq�d�`e�h��Qm`�4[	zw�UKKf�r�j-Bfk�pR�N)��4 fcOuw�Av�j8"AJ e�b�(�''�s ��]P%MpQe�Jx�<�"x�K!=�<qnygd��1@�(*��e��Ku[�l��e)leOE0`pj
�� !n@((���ox:^9nuo� �s�U:n�wk|o�Ya��+�ca�a�U;�)hB�)�(�l] iO1�l�8x|l����
	ir%����CI%�F		?���Hy�.&�gUz�Lqp��G�t�i|;�%ybw:un)cQud^�A`��sg`q2/�³u;A�pp�S@fi�yT`d�O�uxqv��w5y�n '�d�l�g�GaldH("��= Ƀ�))oabpbMB{�(-0k��`q
�wWHz/pa:ffb&c X����`�fk2d>�s_`wc!y�7{	(,@()e1w�l�!$z��"Rvgbo#>Klh��(5Jmg$8�~cvK`{��r=x%h�\Yd� )`��3%�u�kfh��*	�.rc�|�L� jtN{��{[kC$.io�"`-<�qNd�v�t�2hQ/e�*dQ�԰%T8$�m$��

*v���'/$Sw�2R{�(M yb(D}s`�Eyd�chi��� gb0rU *�?$�MP!P�r�Ò++K �i#Ű$��tu{ju`�&gA*a�iejl&�6_�a)a�w-�@�Tikj�J(/%2s�ee(d3fdm�"m�Ail��)t241�w:$le|�S�5�`vens]""��z	.h��je/��mCS�l�vi�W*ec3 n�q�P�xwaa��{v1?��R���U,�@�ne'tmx��qK�~*o�	Xb�3T�-�,�m&z/�;
�*�5c83f�&.��w{e|+��� �U�ZJe1%�
�JtA6kBIyyx[� 3�keU�L��<i�X]c�p(���c�b 8u, Uva\)���8�H�n��oBus� \I����!/{[y��y~o" "�/JJfo�ts|.&x�.]�$��;�5gk�imn k��Rg�Y��s)�W��L25)E</m,hv��0M!%s~J_x!kt  �{�	=;"A|94�U�aQ�wA lo �bcN<m�02A6e a�Be�ay �p(%�*L�@}�-es%dpb\D�jis�p{BJ0R9Nt: ��0dk�>!�sH�L7e��z�, �;�Tlg!?�Yre�]�z*oI�Ahp�$u:ڳ� ��aa eoCP|2�lv:�W���`s�7r4s�pe�c~g*�wxECws�,P`[fI(���{Ln�7	M1|Hth~(lp<h/�vrh$S`2$[�9%*0�pbtrAcP�8Ua���("/ p� �	�9@zd$M h|1.1\�D�
	�u-9[]j�A�l u�l�Bwx�_��dAbj���5)~�+u`�O� k�1Gc	On,"��y-�qO/�7ux�.y$�R�Y�]i�A�me4n1U#op� {9�!�!l�9j)7e\�i��<��!b��N~�zq`��z*0�:�8P2E�<�8��I�gltC0���;.;>7y��^3|U,c- ;a(/i�,#,1nmPeknvx�)~)$p'|058�!B@uJkv.cr\ ��jnvn-d5188�kg|9efq !=a(`��"GuvrN 23 �wl
�b�:";%i3�`T���.=$z$y�rBJH\%o�j\tH4�Kxqag$$�QABF5>] Ema�ik
Ib�֢�b|��?$�i2G1--7	&[j�9	�E�()(�rY=�z@�qCP� �H�o,b�{��q3s$H�3�D[$YM, `2PGo �|�lcr`!:*Kt)�:	f`e s]|�*%�~qD+ A BC�ua�5-!n=	 {�s�I�}ki.- B0ih�incb@_v("j_&nv^�#��@6)p'�Ò��&(x()`sR�Jze �Z�bKn$H�)'a�`Tp$` $yn�(%]��1()��
qPo�	<�ra��mi�.(��c$�k~c�#(Gq�Uu�!G�E0{$�,�E�%}<��aj�'��;Z��-/o�nm0 .c7Reur�,o�#a_~7h`,h�i�=�i>qss
-�mF: �vq 1<6�Khrd(cnfP[�A9uedaw.93*Ap�VICsR�5dlga$pd`osFzF+0C3;}�bcvK��($�&�xuH#,h3]E�as\+Mv�*KʋyY)7+�AYt sm\�0*e$� ��!cz }�(o4�tizSmaE	�	^ a,{I _\a�	�tsqab�=xjQ=!kh�c"V�s�lF (�Jh"fdSr(+bS3;�Zs�ND[$=]!�(�Qd$(fn2|a�;�0sd�ͥB(	K}
	7� HWv��I�A]nA��bsldk��$B+b&�rGs$h
�ck�vChu��|"df�lf�	F�ormo�)( S�qE�r��9l���cn��eT�czI/�:0�etyND"i`y2O#s�|N"�Ky ����?OK�!v�T)r��cN<&UN�:d"3T�vQbxn�a �,�A����N1�M��-=` y�jt/o2r4)"{k@H��ml�{i (QUH0}�2�*�D�4jl�&t`�ko.k��)1o�QDXdmnjZ42	8a2w}= {Tm.v����8	}JJy#"(��GA;S)v*nl0
�v (paLfxMo240��h�bRc$ @h�`0S
	-1h$2 (pG_`�?< ��b2Lin��	�Y�@�
�mn|�0^=<jt�6t�+qg�`v�-} j�O�d�r+&��y{E]Higt�o�(d6�D,lDn�et���F�|!A�jn�Yu�q)�*}�=0�ccO5�,(c�V�Я	�l6a�+�fpem)Deh�cvOl�2J]vl1r!�H�j`7�1Ee;%Vx~Y�,G6vydlFn2�{Hp�^��)`
)ƀ$ biqBm^EdzCn4�2��sOl��t'Um�(N=�e ygi}N+)Ak�f7u>�l,8b
sg��iRr��w!�vou�n,���$cB�c[��#N<
0PadT�.H.p{�R.MT�'UVp}3 A�id�N�dt�XG�� �y1Zm�,,�J�eFM#�2AbO�h����V1C.�qv$Urg3t,|h' R�st2aJ`pR�nW�4ot�R	d@`e�)%��|h~	ix�� <$erh�ci�lH8�yM%��"aFor$|b i �xuV,!���,6L�t���Q�!�t�!h/$�h?d}�y�f�5+�m�$1)�� L�"w�aydKyq|��jJGau��+ �/	�84�e�,.��4(5i./�)f nDf��,Rg�4 '��&�`��I'k� � ��qNϧ(,!Pho}�w)#eB7����P`�}�n rBx4j��";bs��nr7���ur
)I&�+Eq7�hNtd,��d�r��g �2a{�0pdLDN�g8�!yr�!*�;�)��=! �	<��&Eqr+0�uo�3k*��}Vbpeo�!do�DbɳH�mg���1�h%Y�c��UE.q[NO,�E���)B&{.	�.){re�V�)V (�O5q5t�f$�t,|ji[ �1%�w 5 ��mQTie13(aeEL2)�2��J��uO��fIKb�No��9,�	3!Y�dmQS��ol`tdH��Z��{��k���!(n)eelVu|(i�*imk462yNJ)��0�a/�-#)J@V�$Z�i@xn|HltW%�~�gs( �/r$bEA1qu0f�2Mb�3
0}�!ebq�G�m.�+�"o s9S	*g'm�dg�&=�%E`0?t�nG'�Ciz�|v^�,ZD2,5+��l|z`u�r���-i`Rj�<�xnX��"_|��~�jc�d< 4*Zn�dn�i.Css f(i�R�k|Cy}hbg-,�}hVci"qu|�`�v=�<%�2rehZh��)bo�"�
v@lw$`o��d�Jm|�*N�D�2$���Ed$	
�	�l`�`f�ft�� 0oTu�(�b��ak#d�jr}I��c �$:�o���m6H�&q$��"lrFk�0"��t-`u�qxo�K$rO�kU`�%R�ast!A*-`�-N.}�f.bxkbi�)�${�
�	}+Sd�aortinis�Df|&,%		?��pUr�, c7q�oUM�-Z',hOolp�(dl��a��ʼcg!FN9Gnnov�Kd���� axq6m�->%&N) , �N��jfPx>Tyre���`-3) 1 �	8FO(��m~1�)8�+	y�%tuZub�oD#Xl�H0e1|"���|o*6C?
7O&d頭$jc'��Ma6l{D|�Id�h�kFFs�L%ha	����~.�f!l7�?�3ceD�Z��#-��iiQ0|�1dql�$Fo`�Xv]gf�&g�e�pE qa2�l"�em0eR��h�{}�s$}�+dDb&��;1��; s�\o��>+
~�{g+0�}5(1"u�/[�Q�,�Q(vO��' 'vs�VƉ&f�us�V�e6IWi�p(�~j��yc�eo�S�"@�ydI~��cIunbM63d�Kh�2�0�K(���Sq0�gv�<�	"!1X�ge^9��?O"Sd~�UrMp-'b�mPGie=J,f�wgV�uk?K_i��r�Y*��`cx�s�R!xf �q`udZ]m�pe�mN6E%"�q%c-�L)dNOR=�Tr�)�to fhub�(V_�!jl��#�%�Z��msn_4u��I�?xh+tiN3�2g�1_31wL/.c{�pvE`ldq�5G$gUn��e �t4�4d��- Ss�#;�e�}bi�?Pf+�����`�~ ���O{W:x	~nB5G�Em5(	,$.!i��M�d%�RO�^t�+"/�`-�`1e|P�%}|�)! P��%�hJET	 f)��+
�Z��d2��w 9C+7El$�4is�m�{/dexwr�pzL8�%�%)0<��*�xnlEb`(8�'Seiil/��L,�!>t�%Vs"�	�4b1t*��s+ˉ��8��D�"b�iH=$j@v`iFc<C�gne-l%2"g�[�h/ ,2je}W� B<y�js!i"�|	 7r>+��Lre��qS�)no UHdF� s��Iq��X�g��S�TIT�c�\�{bUPlif�D����yo)oa��0Bkud-V@�r%�jduIspOl��)%��2G>3cpjcv��R`i,Eb>M$�%hdx-,TN�.pUg��t!�f�laa#|�b.X=�}�i�A�nd@9Oxl��`9|�2D��)/�?Vwyg2e�)�L�wx Qs(�& .���~��o1(py��}')UF�L��0!sBMjmj�J*�`/"g�Ba1xb2i�$�L�aLdm/O��bxxn�h��[sB�2x�P�n(l)j�)��6B���"�"e�K'c&�QQ}�`c-AJYu+/�F�Vyc���g2" q���5�g+�I�!7:Rq�G��l.!�� ��A����0�
-/"I�he�`O3(`~�a�@�5l4'��bO�dmM���-#d�t5ro vh"qe$xk�.xM',tCdj%s7f@oe
"4g��lY	)a-o�]�|<ne2^qD"<<�j8i:�+rMRB�<!W#([�fg~)�:�"N��nd@!+�(*k�lwaAw"ORe-��/:nI{T��g��*و)� �QwtK��"&�E����"C2bhko���d	s�xW t&"7q�`sT�c�O`��f{�%k�7q	��G�hoO�xfq�'7����-�	�c�JY�5/j 	$:"�"=+�ySerq/�bcv�si9IBI#/��iel�\�wqJe!�hlrMvVz�ln/Ws��G���p�rG7dnNoxZke(��ma��	{7fw�av9�fLgQ�e2|����e��e�^i~o`ipotyeE0PgyEpdYJ�kNh/m�t<[J9��OJ)p�:@r*H �c}n4n�fk(Yl(���iD%O��XXFbDa(�ZK�Q�tvv�co_8�<e ��aZ�MA
'��EzKLF��,w��q!N`u	��
u�"dg"�Epa`�z_m�O�!ri�|,:�-�Faw1u�t�5#�1giK� `�s�$KQ�aSi�y(lJ�#�VT_�C� du�(�5!�B� . �q':.C�`[	Mug 	o\�1Z)}=Ӹ%"d�j�voeD�h#rjc`ll� @ad0�p�2"�n!6haY@"r.q\�s�"%i�8pl�{c�pcb�ls�|D!�3�C�wb}g:�ۚ��tN�mg$ag8k$|Ja4AjJeNt* pvjw&
�xDn�\Ll?R�uNh�� 4v�D�
IA�fU,dOphkat�.~d�c�|���'�x�:
c*�(}x�e!
I3�|�sax��;�>)d~ݥ&���oJ�WQOf(: e�~! �q��sHDBaBcz �qvA*
+�&l©��ol��l3<`t�Df0_Y�zG2�hd�>dl<Tll'>*<r�eO�� /��僝.?N[tc2x"* qb�q�O	2��RlU�(r`Bu�Z+w2�D^�MU�r(a�R?�"(�-K�z�mRgq�E�`b�!S'u�Į�	6l1�6|�YLiu ;"�b�t.��#^ruKm|ѣ?�exu�$AY*�zlGz&� UrE,A!np�T�I�B#d�7�>*�	.W/<�w5����w]e,cH��H�fg\+��s`$d*���kkDz c�t���6+�D\yvJ� ��.0a�ua�˼ya�=!��hU�y7�"fY�a0lg�+Ix0�#�k�Q�	-��t�eJ"N017��DiJg VZbi2@d�uBSsPk#3+�(��/-"E!}@!�hy!telazEs(g,q"o�$|s!g}�crEo])�ndd$8at�$l:`f=nfpiln�1`x�-��.�dg�20|eＤU��pa!�(k

H[9��L~n%f>d��(��R������@d g`c}O5"Vn#�G7
-wf8`!#�huy&x\`ew%l?M�G�% �==@;�<(g�E��� lEqxm��9@xx`#j�u` sqt,l\a �A�s`mT=0jk�	�}
Y('.%a	e��!qd�\nQl~e�
ioso�+N& _#djae�q��g`d ��E�)|18$�M`, ��hc� l
s�*I�]�r�FaaU$� Cl��l�x�.$>�!om9D X�1K����zmp�|;�^�bu'mSr�#��e:$(�/hmcH+F*	e��$[db"? �d\$612�n�9"H
�/0m�[�&sY�D��
�T(�b>qt�w��z	dgpvKui(�hu0�b�%<sd{ "`�`O�- N� i$t�yh0{qe�q�e���>a|��A�*||`av0�P�S[0�gomA>s~�r�qJI7#s�^Fg|xE�Rabq<�er� -j�bA&+ _�' �+E)~��s\ �pr�p� ��K�	�ceeK `(^h�ag~NAo�0�nWi�N!-q0#3����-�*zV�r@b/o/$hnz*dhe��X%>IZau ����eDm==P'f0�*sAva��t&g#2�kE2��lw�Fw-.�k�wGrYC�7~/�co�,�g�8@�l�QwApz$�1s@wOo��Q�Eimu2Y�b&�(/�O�p[K �N�w�gjg@gm�0ar{f 4*�a0
k�)�?B$q�3-?A��ŧ):Qv8+b{
��T1�*-��Q|�M	�a�|w���K�/d���<d�a2�ˇ�,�Qb -�b24q`}eQ
ve`&�-bD{3a,��36��k(a{ i�7y�g <<9#{upi�?+#'%9 rU�`m "����Q�O��r��vmtT%����`& :�tE0�zZ("{�)��? uE#|K0RCs�(�naU,xl�g��*2�׋iz4* �o�")R={ b��$/��[�I	k-l�fe0�&blenJ&zrہk�J�
&*��/{ �ckuEbe�uiW �E|.�t��i v(~5e+�qDub'-p{���#��q6	])Io6R�iMt!��p?%A<�|� �"j���n )d=O�(,	���ej�rn;�(:f	�
�� �v$G�}c��50Q\Js�4�*c�$TW�g*ui�| �?8+%�tgeccE�D�)~1zcR)to�#v,'� H)�\�E$+��\�t	\p:lP�check can be removed in jQuery 4.0 when we only auto-append
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
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


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
