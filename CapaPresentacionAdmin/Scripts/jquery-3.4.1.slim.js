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
											outerCacá!É‰ l7äEKªtyqQçÇ} mBøÖbd?l…C Å~°Cäfo¡M Ï,wu +*©]MÁñ
Ÿk§=PùN´; ‰$©|ıæUn$;©Y		-Y@A!£àM+NunthqneËÖ[p‹èk
-ta÷oBm{6äesbIAU#v«àÿ¥yV9y–o‹›!
IM+)w-(÷·_qfheú¥¡,=ÌFvƒ1àE'.éD+üiêv
ûqeeÃLİ&Œ®†ñMıŒI+‹jOtt3sråb`eÙ$.ßh4b·L+QgfiD \„ù`uğ)£Ò

	Èš	cM)GnÈY'Sy)UC9t<jl•,{óä)6zshFàFÏ`Q«%!Š¡¹/¬*mŠÙ!a)k oç¢N!Nfd`=5 äu-$ á{J	II‰«j<õ{‘n)¨		ËIuR—)	]	i]bM	IYt
h©‹È-*9ª©	bQ_
oE¨ ÁÁ¢vb[Nçü`QGzqiq)Ä:M6ï$b2nôlfz¦e,BˆåfÉÀdçI)lğt!azi c)ĞhJ©©Yqi6j3$u%iÀsT+J	òåôwV\l$)c.¹5dgiZùv4h¼00¡fg6 ÈgIr÷d˜ŸÑ5'$$+Fg' .A>|viŞñ¨¢j(ûgmùI1Šw³mó,‹HI TÓáñn`ä¼‡un¯v}ï~ ±cñ~,k©ifïÄmi^8"ó	ÈiádôgñA=f¯/d-Ğ2q2şa}áQ`Jw¥saÓ¬igS·.ÿx©wäJÍK--`vİgfc76š&AD=ôS1sÏ)¡d4É¢c+«pçuwæøçë7gZòvr
=¹0O{té/ú;ÀdRl êù`Ca2!.7aëq	vMVèPEáyeàb!ğ{†zÛ½O?°vÓæsxoz!SÈm@Ó4Şå$%çé?«¤uÒTtrkiù hoğôp6—Ák)²*€X—	å$pÀp ìH@`,ff¶„bmÄ%x øXjisx3äbRì}0dëeUdjs	Mƒo(à)iúe,
‰‰K4î °qLºb~'xòIEÂob;ö;µ7tg 5.t¨Wc&iu|VM%öîrãO,òCäígÿ=0NLmG7Bóó`èè)]ï~vC	é)	“ëzz,£D*Rïz	 “ÜQÔpdgôou øsõ×T6 §À
Aur}um~H
zB Dn.Vhw;%rgwpeaY uqu4jbwr(aT`Ñ|\pvo,Iwfç)Öe l(fa*Yy,o. apµumGOa#0Qxg¢dmm3%dO<prå#ûq&P*mx3idTcr14­RuwéK$	Šo Jtsy ¡!qWpob i'l)ZifŠ*©v%"úpAnn$}H(C{J	îa~ñbz!j&"lq3 5¥eêöm';
)		¿
()­­Nï Qf"miı>V=)ï“ët4<%rä)â}ö ¿<e S 7|At~:|qË@`et*$~&.LÄlvô` JZ2$b0r©&0Fs)<*{eq§eM¡oìjd:dyD--£âk áãW}penT0Ü+Ÿ|iÕotzsôp
5ôkl5%z³
+ÂóŸ]ÏPSb13Pl¨"9ETf¿tLïwe>sqm‡)$¨FI¹A¬)òkO¼f#u8y~bEuJ#=¯of¨ú“ç|g. maü+j‚w$!û7	H*¶MpidÊ(+ 	‹YìãTià`Œ@y)öî)²kca%¬0`Xca E.4a96‹I	I	Ik`,@ÍĞ0Sä``meFnrhÛ?U!	/{(iTmrí‚L/o¨iy*iIGdY´X(m/|E9Wb`DEAõx¢_)psàm-iâ	;Í-© uùdG"bex"Oâ>‚'O*5C2cmfY_ğhlş8œ%((p|ciÇfCj$É;E)YKXXJ		}A{©e8+Œƒhujbu`ïF*()nE½3s+	) òcÖFsî ol‚å<T]. )¦¡qı3c)Ÿ ˜‰u/	:
ƒh·vpf^ dq:ŠIØŠ¨m„J p$4¦o7!yÇ++`PÃtqîtaNl gO~ô\%3^1_^}åe[	‹"h+tˆŠ"ïA6GJ_fBĞc$ï1Ïõ~®í*',dó!VÿÇt_rbi$©		J/ Ôsi*(h#ªóõ,ek4mP Qhó7eV|Í¦BOı"a.1˜#<-,<îáOknD|seÁt.}O4ôVeäíwW¨!Wr¤àfAêmX~[«)Ê/©Ñqicõz s`AouâÉ*ıtnb7ŠÉ>yC"il¡5`a±xIW
OK)xex]hŞ#`= l;Iè¢avbèdÒ | îníè±&á( ÷åL}atB,27Qm9cE(€rİü{f.2412,r;±¯LÚ	LP!per¥jaôê[(ehZa|fL¤]l.
+%E=@psÆUì(Úi^hg5+u­o8yum6$-mÁf)(Lã/È£ïlu<pô ¢>¬ó®>‰G/‰j"DTd©o®	kªeÄoI™Ç¹Ud 9t\àØƒxdó0wå,dQfl,!ù]m,4y@ ™L$HI	ƒ©< ó'eD.dTıw0jû³	ˆ8ÔMënbM(`YU&õq÷#tÍs	p	lo,kbxh`h&4c*gjajl]		wiiÈ`k­(   ©_)Pv
)(eiu|49]	Íåq#5fkï_=	0s
HË		wî'Ä.\_*f) -aT"¬¡tÚJMª-Låu){
)øYÄ‰®)ÁªZMÏŠ>3@-I‰mi÷}o#ìhl˜"\ìM¦ ™¬nØ!Y´¼o„ .!{	Y9Ù	IiÎ0}TYUx51l}o=U­atjàùÛê1evJd2$4f}|lj,{mN¼ò¥Êáıíg8y3B)/o?$k&h$zå¡P"6mı#n,fvh i1kvo #a»)-ê‰±(	qLp¹ô[¬}˜)bjôl9L¹ªExVòàp!B©gEezr$p8p(;Y}‹=;‰ûı.®†Ø™`páS 0P!{J;FG~oDiçî(%5)G|}gN( ^qdeÇ_3 Ù šI‰s%veò&@lgw²jï^f¢'-Õl1½pìZûä~lòn2qxØ`le½Q;uÏuqôë'¾"a@>&Ñ.-8`(aº¼ÉÉŒo9 k9hì`bqoî„áyorb~²$%: D5.ktyGÆ(ãõ/t)ïb (´Åjv%! o*!w|U §(ÃºU:ó†ğjé{1$êwnõjajÆ¬:âç.oábğvÕ! ³*9	 tõu|h.rfE«¦},[j t<„ ˜!k	 ‰ÒL5Ğàlâ(:eêAt~`|ÔîâTÓîd¢pvâ5õxÉïXTxTqgEî
Xp	yÌbUylc* sxq²$A+#¢ =9B9m­ *LA.=$7D tj®p2ü€åì@en´4ur 2çd}{wj–Eeº¶¹!à¸:lSúã`.¤ra%<dï08kI) iS1Z)bíä³o|aN¤nh!Ui63EHÄ,m*tWs0lá}uğ0İ%vcdtaJèm 'eùng gQgãh!4{ t@e!idmFıií¡îò ZÊ‹	I/,"WYgflfl[rw@5îTd+vxmy&Á.$¤E®Ew C2*M~íiÁtti;jG}h|/3ä bQ (¢*	oÿ \zuLƒ5¢(;wC`+1Ã1g&!Fsõxõ€$¥ÅeKC3yåmğè&açF?¨cL²gQ'­larnƒÒku$$Ã/Ëî²E~ñınfNDK/K+	`>²TxáhAdÅneiNiåZjB$iä+‚/mw)IV#$ug§rbqQæídKd8f"Fg5hA¥.ÁHä2"Ñ	\ğá4ôğZ%.g7³®v3j{rg<SGı1c,datk@~5"^%îd­üseô¡o	 "g#O&a2´d`ñÍLu\gtéojy0'sÆktO)@®C¥åà¼EË.Œˆ¯¿Ne_q"waF|E¤ë}#`hKg"AhÖil÷; k*ojVuBdí“`Ç«Af.*!cKc'M°zfk{£paötnA2<'`~ÿ€"*ihyÈ{‹«©™«Mpã|caö‚w-3"0SUprlvdámG?cÎÆ³$" 3"dìÁei}
	ƒY
MTâ&eÁ)9©`|un*³pü¡'`,9úQ®$s|H$,ææøes+µp>Ë<PoMw7fSB1à5(yœ‰asFtqk f§JclÉon"15L…z@-`{¢ «©vizdl^Dk€fw$	Pi8do'uE)	a1`¹0Elo÷\€faä=àdn#TA%GÜÃ±Äø$ÿ8 Ø+XaÔ§GNdiKw8>,!/&­<e-ü†‡vıtÆ­¨ĞJOâxe|únKkf$i|4 ílecnÿE|LTr-jM¼U¨âlàZd*+(é©qÙ
Q *-Míl@A$/ {`Åe$Û\!ªgjd'N¾/áBÑ!åu{.y[›()sRvt†u¡puU,÷coo¤/¿|¡ıM÷~¤!s­åí@bngzàïDyø[¦,(fenf…!`"­"ñìö))  
X
im(¡)€wwšÉäå h-¨=z¤n0=€#d Õ/ „yıt,k/Å{.¦jL,e-¯ÿä#İK°C ?ç-»1 +;
]›‰Ğet×ø9ralga# 	³	}>•	iIhDJ?#¡DH3aY|f—ànTpÙòdÀsgã‘²b fsjC]É³¦h,#oe$  0]
‰		W¡T JI)¼$ïaTOVLg#gp{«` ö*âoºçnwo*e{°rieì¬4ÏKìm‚		j-V%rî™|1óáŠ&MC2lª\As%¢Ôk`5v9?„d5C4‹'d{„ª|83.zÿ_e®' $µk\i;f( il¥Å,,ñH-M²ÄerXbe\´O }$"%.¿Mn@o1
L(}¢"jKÏ+¦3ãÿs‚º)¢d~CtmIÌª+½Ü{b-(w
hRñô°|(MÙutjÕ'£Ló‰wAõ\.áktx6ëÃ]?sé\8„$°.í-ug\|§ES4£Wó õI#¼gr#9JÄn ¯oáu÷j	I!j%2##LåÎ%m2}sæ¥n~#ufm.QöaJ u|cz¯%=.mÁj‹şd/ø/@mLPÊ*H+/aBJæŒ2qo,P|vwsüa…WJHYà`cÒ|Fdh; `öäMĞEÇaĞeFìek\[mqd.-"^él0å¡ :&uYr`í%$
ºb©0ea|EI{}âGdsY;soIf5ötó ,LŞ¦-&Ciàgkul'?¢f)nF<kÏl(dáBÕƒ) k+2?}Èl{{¬$ãìEcÉwD"ïU
ä(eV•0z ‚kçn"#\eKÎaf¨Ó~83w}¬áD/8¢e,gˆuîö_J#*=p`tsôŞ_½;÷.f9¢¢yçaVÚ«>hu4ÅÖEc¡£3a£-wllç14x°&z±í<µ:.FsÉaæ#Fn‰!hğ NkFmÎÈMuf< eÏä)kK$dæiyQ¶¯}j.Td"CI³åxI+j(Aòemt~h5­oÅ`'üq}kx=9=)âioPå¢dçê !¡e|%A¦b`qk7e`­âü|é8ïcìUÎBdyu|@f7p?é¯¤* ¦¥b`!æl'~=q|acvñf!«ïa
=, *BáinewæjbaD|wL#tlmnª¨'nwi3"h 'K2a#+E%C .%¡l )s!f"bqeÔy²ÏaOçb{titãP+ "aïàeæA,m0ıê8tdq©mdğk÷ sbBQr{@sMºé&t\"şïYQ©Id Ì¢Ô(¥l,ø4òezdJw6g@!Š)	9‹cìmUu9r=ìvkï$ôÇ7xuCte|Ùjõd8{*¹Ml¢.I‰öP}txO-ç,Ä?ª›ml,slç­-??ebm<€‰}¼
/Kko!Âg@teoĞwO"dkpòK
:¸bU®#t2iKh#Imõ"2é y1	M¯­†hÖPD%+×v.ó'*grG/dÂç}Ohcögb`{çe!id|`=EÑ4k˜ª„üg9ÔqKjBó".dâõt/8BY t\tOEmiô(q(cR¡ãmz}enõeno<-ÿ(atg‰w!!9 'fIgc:0ğà$üüi~}  äÇ84¸ù=
UM½-é%€dâut
.`Nfü¡oV«æwòH,oQèijd:A{&KVK¿s8nk pmkThqö|IKŞº!&²CpSo±(	‰(ÆIkï`oTYtgaÜ%èßgùgó+`Ek§uíXI¶ñr æ1ôMû2)`äodnn~"6bae!º¨iƒ kkhñpïê
	(Qf+W(D¹íìµ|íu0DhÕt/"O2c4ÂğIUî3°u<-Ë%„ei$§!gl•e'dÔÓ)æt{gG ñ*øx		a& )mtgNOä,P{rw!<¤7)e{	)MYmºgVÔ
( z}­Ö%NKŒÛÿ*$Ù]ˆ"g\õflfyuo:*‰/}HcxÉ`p{óeŞt*3ÆıLctYoï«¨edWO¡)({âIcyE6srj©£âÿN`wupàåK[2Akpuùdh ddî' 9=JÉL9:8Ï+»!ômemaj÷Kiîd6•õTPg‚+Înla´¥v"º!fU*Ctåo„dUnáñ$¹xvi `Åyf `ªeù> w®tediaSLûé/+ë!eGA_ù9#A/´Y"ëÛyíÕ "*u]kq1íZ%*o+å/i1 k¨K‰…Re}wrN.RI>ºT0;<G.rÚè sIeÌ*vO$ÔfQå%"í:
ÍI}=‰
‰ ïunöon@º€FVnf¾moä!póÉCCi9ks 	E	Áb ~an9(^0änÏ)._dÿW6gU'ogLnEåâRw²y9	sˆ˜Djf|ş2lÀkg}f#==x-"ùn±5`2`f !|À](|zpå <=râ]•tmk¡ |\ +m]á!}_jè"]'t}n*“H	ÛÙtÉ*™£`à;´6x¨"|sgzh#¦¼ae8¥|åi1sJ àb3¡'4u3>e	¢ä2wãf°4ìÁy$n}/Al'£‡nOCcs/h)3<;© ğKf°}45!1FÆ`åªFt}qoJ9=3öä9õ2-'&ˆG	m%ÄÓ×PPöv’ i ´<ÚB	™o)0~d6AÊwEìe b\%fe3'\ed[ìû%Ò¢(e.c¼*sg|2cDbfpx¦`v4)a	!ã~}«#ğyrâ0É<ğ2^amp$‹JM*&,-ôq!€?"gog}f'lTe=8sé:u•w("e}Pa I#“4Och8hdø #FôsFôÀ%%uu#!dˆ9 d5ål%0¬'#-0JI
yLF	ZOMµøíò%|S}Ş9ÿ…Ç[=nMët	/.ˆùL"6BR#p»"+r%	àKãqAîknkÜğgõähmHvu®ërIãO)}úI¡±ˆVeuw2î9`” ]8ZK!ay:J	'fn!7t"º²QåşğÒŞ=Xio²eÒvEá¤o,æ4FàDêÿÜ°!íeö`XÍC a9`t ìÅæb¤h¤¯-3zi	‰sEdTzzKlux'ôå y"Aàw9ˆÅy¬O¨8I!ßĞ%«3aöqsÖåĞfsq|x:*FìTÃ5puoFUorékn
&_cóØM«(!¢ds,ªÿ}+ozËæ:cú}giçn ­eÛˆ	rí¡ò*ahaÀGw-E~t3<!¤(-)`r§ähg4!lµ~gÄdj;%XG}íeLvà\1FyDm:h‚ˆKbuW}Ê¦ Cra`%p›*ÿoììÏnPqg9¬íIlEÏå4iİl 0%tE¬SEtõxÍº	&ei.5tê 	 û‚ISU6¤(}h3+˜	X$¼{€ cb-<¢mgºftl² o`#]¤i¤PŠBH(ÉA&s`Iî!xça¤uÆ{Z èë`)[+UYw:	ÙKJa|™r,(\kÄcŞ{î,mYer
	K½ºü(*iëïaô":`ñ||qtpbã1ÉØÓSJ?ìF2gv$?¬âfo¦@è\æ*!]aÜc@İ~ìfM2L'OÂ~GP­±ëb{*	‰ˆRd~lª",!0	›æn@!¨bA=å8 îÁçgv)!É <0r¤-(Wƒá	AAÖã©	ële8ä©§p~3êp!m1¡+Š\¨retus%N
T‡c‰.¤-^ER=
¡)}=¤Ò	äp@h oúêQPmqoCéutoş$d0xdtc$aYÛcÔh-oA Åu`#ÙÚ)MCXfc	ptå~ï},%Rirãö=e6ş::0{X	9ÀQR° 	-,¢¡uaï° |à0x56­XÙis¾g%îa&d +âì¥omuÉ(rO‰7)yvdp%aNué¸*ìµ*5  §*ŠI	9J|5®fq8	~®ˆ¡K	(t¦wrunæ9^k_(,êí-k <eè"*â¸!òjM.™/vncÉj`'Xíî.F{{h¨É% )0’	-8h¡\}T_>èpm5tcÌ/~tE|và?Œ/wÑ)‰‘;gö'Ê*æWµD4!‘O1{´X/}CèøseT`«êu"^Ù,,l*´­ñi]"GnGäşPct(mm>ŞTHMRa2g!…lpm j
‰ËdaS¢yMícãe|-gÀtdş"¦ :Cvâgm3Øf!"8DenjVx,z¢bïu)e+Ts'	Û'°m Y;c0<Al|'Eê*)e+)Mˆ	növiz	lLE0E!¯½Jÿº
1dC"
	A=‚É;0E¦{0.bdA¸jÉì$zEZ+Hh.m‹ƒ}»9ˆ(G8hĞîzügdkw["j<{#Iu? Ahxò†ã-!¶KR"!Y»Š
>!Yd4 êwyU.
âMldßtIğip)úSåWôÙrÄ5_†¤a%)Nd;"rqF)oZ ´uøof wéxrm_(üôÿgluvmle*uspe QAsr¦omH:(|Sgè jemof*mgSs`m4ã¦E|Slpßï¥ÎæS;è%], vcApdAO“¼tpsbı@l) ká)»
½cƒh+ `#"& ³ˆv%ríiô8tòå`&neGlfhtwd um°Û¿ÁO~ğH®w³e$=6Oáx–½ )7f!ee
aì´ßcyE÷¯y!ba$©)
ı
J%¾`FU{y ÇÍ)à¦-: ‘reQ"QzU ê$wAsETKÍ,qEsêã}æëäé7êuqatgøäTa26({ ?à‹WgtCX,vr7!¹r=1ßÁ!H	( ]}òw)&+h|ğbÓ =+EmsşáÔiEq†Ïö1ElğBs,Ô†K~egr[¥0navqcmXFVìP#3s¡);ß*1ï`^{e ¸(jVfn\pm°o;!nHXDk¾ ?äfãv¹ïn¨¡âe%Mwdod$,tµócmÛnÌ)`¸@{
 ÔaÓ ì{4gy5” iSÜÃê§0\ªqoHñ,Ôr5alCsiÂö`Fwnt|³ z¢eB]Ì\•p3Z›ã/s`%`à¼`tMã}>eoqu:agÌäwô/2 9 "$¦ _-EMV.*¾cck|äÔki(¸f	ğÅT jb@arãpod¬ >2#< +icõeˆ¦“<àc… x¶À0;Z@M
ûãCàğ yeLDb}or’‹Ç²oft3 %HWú"Ë±voÅyfu$1• .ˆÕzŞr 0tuFhîø8ZŠ‚×)ml!ø)rÇAçX)”;F	›Ë-(2'İnc­&fcRõea^mLjÃ#1Gä`d¬-Tyèém€\.a:ÉÇdór ­V2o+gxq5uiC(6ó%cíµ¥)	( û)
qã"9H©e%o¡(‰»…©-	&…"Dficñ`[]³rı9€eö'ËN‰Z ggem`1$µÓp±kj>-X3oOB8|0ókJCs$SleaE` |¡0h3S8^6lèNgP8 )àt B}
 ö«X	Hig2}TØ$ğ&[g¬	<u!heŞ3@6´[E©:!0.ˆ]*K	-/fûí`²¹!ÆÁló‡)
ë+;QWIméænp?Rvjy. ª'˜,#{é ~0cgm èvB}oğs
$L\K  sg^gx$µ+d)$s‚Iße\ïhWdê?8miôOh'‘ }fD¡)?ŠØ9ØtìaefY/x$sÌ,y¡v[ìõÅöî! dHfe$M// A)WT Ducw.t ~…$Bgm&@ïÀ4vCş{`Xu[Ëu=X|¤R¤a|áQs@ëğ|r!r|øs(€R^0gHä° x*–`Š	é)l)s
‹#3_Az 9ESCV±òª}Ğhjm* }+wcO$fm­nw[ `+HÍ]k'/ 6kx4OVc
 aÅR (mVıí ©.©ÑhĞpndoõgsd®ø9	‰F 8€Átèx"=fsvÀlå:³àÿ0X0d%td*ñ÷H gÏ€ew  F&p¨d08eyJtÌvp[!öù9å EMLø#	h|#4"ã 4 TpåÂyLu-BóW V8e¦]°<ltÊ(c©m$+¨;
É#	bEP8qg†!¢jàWçä/rÊ!å ê3	rwId.ú>yuû0;NM	ˆ©veôa‚$-e4#ja,»9‰«vy(e{-t}s%jLS-b|/ª‡aiT5BhI	Ëo­9"	X‰‰óOB¹2%ÇˆñAeÁ.w®h«í "h!æax-ğì…œ5t`.ù kıˆ	)¸N&+é&æ¨€+-óTâ2û³k#;	âÒ¡KñÖIu)!ŠR	,gd\avprn le ire$($gll°äw„XNbI~mdråxëoûó¯/o"lf¢v +¯å`jI2Vdpns3ikw¨+,Çthvªo}saláTk:ï^@af aqbrëQ CåÒérBu/yEMR
	se5uwl qá2seGîlsh&I)qW¡bh¤ |v@Y©;èË39Fék0?ƒ«ñ;ZNÄ(¥ppÛw+Oİ>mp´{0)j	­¯/%k"Cëg†,mt¼/jA*‰	~lê .êuçé?n|åsÜ/*<5>poõøóf).|lÈË|j"p¨9k=q8nf¾ctx-¨$õgsdydgõOR"(t¿«%î{<i {
ˆgP²8i04j08J	İ`gï89 tkKä¾1¯iEbZp`¬¢`+û%İíK|Ojà &KŠí
0`k *: ¾4 ,UN¿aø‹ja½$yf	sg¸3ukò$»? |/ı]írIrT.jHnu•;€O\K9 öñwşaììlzğßÄ®[€æuN#0ëh!)dìÂ/oRíA-àkñ
"[mfûH%(9nwDâ~s$»À,†feVi),bSÙ]sa~#Äq:( Ã?ñÅ	o%|+7ND]Z+)Ixv±"p9°aoì”üoh|{ò'îeøò<ù	¯`½ ,!C/KTàüı$Œ#;¾#ì@l ÷k
éîEmgmeîxz ğfå|jv¶$J¥9%9™‚ÑRqè-JÿnM28
!+AÿdZÑMgˆ(,$ Nh³ŠF!ruäwjl iégiL¥f/u¦VEz:Õ`;A52¤Sc'h;€Y_õK¬eu«`Hú{uôTà¬Áç$cpÅp0äkı%bnwı8åLqÒV\Kv}hbvùï©*eåc¸™c#gîGi(u¦jıè 	(kKMI#élh'#¨Ìæ­(- o'›4fy€Ñ­el#{¾CCiCpÒ!mˆõl%nï\|i°Ít?\©4Ç^ş0Å eiëş~İ'Am'.ñ,a°ZF+%C	jÍpw"eMkĞkOg"( ¤@ıM(!BÎu yP®0p 97
Híl	yŠ¹!Iõ‰pçtHv.fäyì€I(5¢?Š
‘'oGxickDà‡ m{st qL,c~S2T6 rAf$Kêu)âZLdegdwN
	>9îcäbK_d.aHvI&¡z/5&9p-$z! )1ò)-vis /hä×cC­E¥ wiğS%Q`ãle«­nS5a`Ãfc)ü.¦kxªÎdGBñV_t&5 l0e}rôäkc0÷w¢áÆ±ePB=3m€™!Ïï.4Uešå3K#¼dR=n©evjIDdp!´@sTï¸~}¸Llhf)desobëovìe_"ôoæzä(æg†©jë\ VË·Û¬C'\FMjap/f*wabl	dK*‰Ï¾¦+ lOx@a { »is8je0*d8m|£l =°m~o}_!l#÷Ü	 9TşJBÅ	áf È`íèfáB¯MeÄ[tSI}% Ö^¡jhLC{HojD|ÑÍewS°"0k>	)Y((ä ¨©/g7dläè8Hqäm`8lîñeX6¬8Xd8*8Æk 	‰I°"ltw¼«4öğõm;Aˆ/1		|ÈO)Ï
#Ea?(m@×DdÙ	Wj+| >.¨õl£M?`m\%u¢$@r Y=@+?JÍy&pq-a®Fm¦éÔmZaû=<11 >~$E"!skÊ/ÊZl<W¸~4"˜©&8,Ê®™YneTq¢ê0CH€`08e,ámÜ$myxqîjod=fìü¢@m|×uÛ`æy0ef-{ÕñY}:®"=9)HJ'ÿ$ÓerVt²p:`•(?«¨ÏRha*í	Ëe	HŸ-!Sör%n`)agñ¦jt¡gîïô )TvB;ıÀUYäRÁjUi`s),+
•1ñº«*3IM8n] Ñµ`qVp`$7 /4ê"táçxq[ e$Mgõng•teŸf°{`d| bm5vg~óÄ‹iA[£ep§}té|YeGIE¤y 56[y¡;n	€ÛU	Ib"p)Cûi|"''"ûyi`à¿¹= EÜ·m¶lï dMca4ÿOïÇw8Jqrd0h	`ø‚+k9Œ˜	a|e‰ 6kÿ,dÍ^¬yW$İ>l<¹cmE´ˆ1Kùû5{yeºù„.ˆx;H%Aázì-"%0ÃÎ9Ğc`FáÓˆQ4{Ob@]­&0Z)Ù9I	.hT‡aåH,n °#Éh]u8 d&r%¯C:&† GøôGu¡ëí["¡0N¢5m‚JİJeNuMé y ×†‰™™"$ ±G~8m,1q$åU#c'jE%zo‚ eñø*3 da#c(Å2åW f`x%`wk X»e0M=Ç3qel=õ_jt#		i)(Y %huòJ2(n uawAóÒp¶€--[MñC©C8e 	#{z)¨˜A)= /|7u({.<	è	J©shQr !boõQq#ífR}¨stĞôFVpdÍF)-´6‚f!gáôyQn€xøo\f~u@ælsÄOn|{
™‰!‰©tlaqpñSåWƒí_;wÙ@_0¿ nÕºY';xM9Œ*é;	É Ímp@F(<efu®oa÷ect­oM+$IÂDk||luáV$ßù"jµ´ç(doPåm} #"w!*«ô’µ#ß*bal‰!)EWG!+Èe_„!!uR5{håv0 lliU$ 'o~tnút,°»­ìj*M2, ÙzÃ,Ie,qDtuvN)t¾ui;
IMm‚1K9m	Ÿ	İ		]
™«]™Ø	võV0tb+K	\re9_™+u.q
2öNwjh-^¨İ>S?#ÊğEh`êÀıSLSMa¼O-gPcª/$j.yâEV$`v˜Jáõ3h•òs¾t%ş~z(V˜9(;j	^ñîK¾qk¦ phı®1!~òitll ¹mb)Vz6o@ I9¼½ipai$öwaagTUüù)sÌ`f(m€kkD 	Åø…iKH%v‘*!0õaP-)'ccí lEøgIM2Eío>ev¾­p¸Y­6{!¹ XKweôa3ÏPb`åÿ()(,	I]lMıE‹]=ı"h ar]í5
	i O9ß``xbhå0ãYTÚûGı´Eó´bıÌ~ê`yulZXpíeRklai}.$ áhä;pob$ ±=Vw|vsdRÍGõlıS9i*çat0a¢Å!x,˜ 	äaåõp#mlôia|A†Œô.aäAh äOÂºH4`"clçv2 ioq)|»	;³i:..|°C7e,mS¥2< k¯.tuXPZá(Áqdum˜zc+9Dü(ğdwRÿòå{Uhr[yßlXfİìa:íæÏ)+âLFnwmª.Er? ^{jo¦½³Eá0äpfyl5/F)b`h4bYt}1jZ|`- y6zúqMao¬		^cgEºıa~c;Ã–$- Sd	,"5‚0i	
5¢Œ e+ÉvãEn%/ÜA~%Ô@II'E`èj?(åh°¢5¸4m]ªl9
 cmsì¬"»hí8¢ìËJ7lè*J9$[›kÌ'9Œf8El»¥ ñJİ±\÷pe@Q	‘H-8’ËJ	Úæe0 ­&qN@ôr qAqxü|ES båNdm5)këoöiğä!xQí$5à-"xZ		ÉY¶e~Çjì!g{b%l«p,h.}]!(		V$3qN!ºª}`pxëì!h[9…mmt.tq})(XùšŸŒIM¹ˆ	Mt)?ê_y+Mùe'1z]ÌuÃnMQ´®he=Ú*ºÓf}f_4iÜFò#tH%F*1Kb8pFQnÈdİpx"SllmcPosâåuÜqYes¤to{0Zatd…$¡Íù$CëdltWlâ66f7a,æe`vr) şni_â,%ØISĞ‚L^UÇc©J2 1ôgÿ_¦aeşeZz`txqõææí*)b(W";8´=1EltÁr'7¡b•t.}tcë7R((`gx|àluq:Ä!¿ŠáÊZéH&ğl;kFyJr×â%æ$Hÿp\^I.µms[ºâ0%â m(W©!«<K:tD){¥a0t6çöè¡vchÁµl pß÷dfcndå[y"VsĞVi+us4-êj:8Šzıª	²i~7ún Àrfnaz`4imJ(slÏBÔoef €ëmÄT("2kv¥,ts•%£Ïî5Ì¼0/!zfd ¡áZ)`íb8ô¥]°<bî<(3fÅílÛÉbr‡­Tp#[Û0‚	Àp="Fùx$]$[‰,(
)pk£kbÙ+VAböâ¼ v7ºD$Ôû&h?jQpä	k? .³ Beqw»©ş-lålMîp,°kpdó-Î‘+]!Ä±M~¦iOf3Dh3©™@,¼gxj ¾#q%d<sUwd.ùèŞ	ğmñ¨>.Ã²œ{( jhLw@ ı{$"`#,pom>Jd¦nÏLoFxwEDÛ ñon|å\d`]C@ádnTm¹6¬ :\qlƒ)AÚ Pbg'	N7:"lOd`¡`pa'qan¦2!ù,x¹4l`r/5tR÷Aòg0kŒë`2.$?5Duà¬rtã=î_¢$q½hEhro.é!qö¡m¦éHyAøgh/}y~0q ğ l&9lôex`bFÉlsdB|: %rUìácw™{ #`'((T	CovğJêwÅ`)aÕ»pi-ŸÀx*pzE	TEP|$g/nÃøİ+8RM!ejº
)9=}*cyBø,‰à3Fc|]G|tµ7´A6s`eó0(	#{9%6 ÑĞ õE#zqñÆ6ĞâÕoqtF{îdqR,šÏR b}Ytm`% vEÅl<0mÑ JcacEw£"stÖi&Ter âğ&óSU'
ç5uş'¡@e#e|üûj17r>[Ëpuv"lXèLI7Ealtï,->E.)ítÀÂ!V¸\v7…8*î@kn&]@akûôRİ,îkK 9!;		Á‰Y<(/${~ÓÄ1ëE	A\#p2f/ea#+Ñlg!åÏ`fobGcSa2k*m,O4©:	
9‰(!=©k¼î|5üpp3e u×5RrÀE3o×ë"Bkrm)ô$ğ:™Cšb [ó\qcb*H‰^ñaa™s¬sTê{F%/€Eihmqğ²X'rñ¤earÃäeà }$h(lRøcvu¥« {
+9Oi“br@2*¹=ëeádÆü$9yUbláòÎµ(Àÿëq%X%$ cÎ`	)I]\M?O…Kô ,m ğ/j xµEr
MpDÀj¬`'s”Nimü'Ö6¸
ci!	lmcì¢ı(#o^¥kvaª Ëa4pJ2Æ<d,4ZoXå#r"l
±Yp+c2îA<dM«¨,ÖÅ}p<c[$0—KeTa80 ­í¨²9iJI©¹j-MÁ~rè´fq¶}(kFdTìDY¡ot# {$è]RJçvÔh=w ªãkK"ôg(c4Fie³SRƒˆ)9	ì`PMp®liNg÷L¿”Q+2¤yl ! 2Y-/² ë
-‰!aÄtA èDmÄU "tmÍò_A}/£-Fc	µ;í Õ&hEàŠuwÊ°xÿmUÇ3Ëa}®i®9*21dC}B:5Ì.[%sustM!öXhßAx
9Èåea, z€¨HMƒHY!H_iáIkfö¨+ñ%6Ö€;7©;1)o º,ÕRFIö0|t àÒO¦ëèvÌvp+ Y(	)H8b d to{ÖÆQNd,xl	{Êm	//(fE5='¨êYFáè mqœWbÿfO?!b]às°ä%zsih"d<xÂ¢íHtäâ_FôYeA Éíğg$póA€N'uò SbÍt,fD7Š9tdlxôº¶Hû	ïP(MÃwblqšÈutÄeôh¯¯¡	ÁUyekg `	)]c‚EíƒlFk2)¹%ls) ½hmaâci}pK=fßaD­a¡$h‰­3™	>² ózNúu`m€u£J,BO.8siyÇ¤NL|gë!Mc¡$Nò#iLõgñGR(fal0Iy-f{Ú˜D‰tLlĞ.ösj (°İAVffåãŒVS8Ñ"=%é-Am-$){Ê(.9)	©I™¹y		=ša¸‰p{ÒvLiOÜfR†~&ê$ä8ü1\zå2O|xc10]¥25äi`.28íkğ`8AA}+ )‰É¿ †oÆe£ì#dÀjhb(b(ìœğîR“0¡r,m$soáFd½ñÑå"Ña b+uã pÇfP(vJf8 5L¥nÖíOo'EFK	Õq+€`ÅA}daeY¡D<|}¬áå }j(	#™w,mfá(?%=%iGO‹{,‰eŠ`, :¡H|¥\ æTâI%6ïÔC_ë]¹g>¶j-SA¬ui 7 aàwğWlEärd} ıJãíü*b¨¡ße*, mhlm O 8 u…d%àKMNM„ -|rt ‹,Š#1K O1GFnKfm0N(½"1&÷”Qt|p[`ïğQ ¿'åm+ É)ıÖC	Ÿ˜Vj	Ü‚‹™)//mld¡mL$M$n‘a"v)@@ÎsµìpS,‚xzRodcrrOX!DÜk<3A>şq0fˆgïDÀ-	E gó$è#IT'hbhõjNp¹mKÎtu+s`:	)¥˜İG´K EúK5B1-95 ¢¥ ¥ltÃ =$3i.EdúirO?|s0åëaM, ôBD$xËëõong$IÔcıtĞ_{TnÊ-ur )!1¢‰mmA´ãèĞK=ø>)C)+)I˜áö@q õjSõ åNg›r )ºúŒLëĞ.1ìÈi?daZ$ og~Œ tï#‹lr#'¢=ABjúKtz. xmŞ)Û€Ñ	mäslRul[[§-]N-ñi=iQ²$y°oEsX|NÛ=Q?âşsI°B_õ¢a:lª		}	KuÒI}K:ı27O£Ò)ıb@mIdxèç2%Vk?XëImî³H8tîjUb&9Bj¨)ıas¤‘Eãz¯ïuáì-!r%à*ïsm"l
-leÉ5)tmo6äiwÎg\hÄ­“8eé`ÈæVFrôyaepk$øğR"rqª©, RdK1nkåŞqJ4Å+T{TEdT(ËiaØXaaqLPa–áeÍD$ =¬Baå-®Oe~JpífPeî@úBtNÚD|et	NoK%#\l¢­m8%¤ğu!P]‚t’ffbã5` ,1¢2±‰r	-¾`H!@bo îf{Ë{nÀh u=Chg2L·lstúİô@4keT¡íX7FDNh[)/\g6zeeâêgÃbo$Îr~íÌb}0-üåFm|Dåoîyøå*á)Š)ùCÆá n|tl• õ¨~-wGñ*mzm5Æx&2TNGuiïij$Gle$j.Wˆ!(Ó.eõòG@³*Umà=-- êhdòjÃí*v\~YkBY3]¨‹ém²çÁÉÌq¨Éeoå¥b\se{a®mHmátb,kJ{Cn^d~üt€ù("jl?íÒÈîUefw¶vsuaon8§gl1%¡ï€JUKxdÅuRt"hh$ñlg$hàBMMOBiìt$Ú=(îü\&:</`1+ØÈiz íhljs peñ!x6a!4vu5+)Ì
	édÌéhfps‚5y0÷qøªvüo~( ä=í0ÀãKêµíj`. |jä&	*ù˜A	vÉğğæ(|â0º\|ÁU~.fà [iôÁö!& ¯  .X6¸‘<p`#el`½at¬m| cMõ»¬iÑ}[ïGmØt$+ -1j0Ğ			‹‰Ó^!s=CK-äex\ñl$#oFnxş)>ce'[xâM>
H‰ípòáxË-.Õåztş¸ıÊ±m|8‚Nf\İ:t<(zoí$i``ÈÃ	KmatÃ
øEn~Tet`(¥líï-`'UeØ}l®8=o8"E
İM)§(A~If<a^¢Eîe+*T'àlglõnU`¹»{%±"4pû-
ßIÉOxeánPfFôw8à5?ënçTøN	Óq%}2o jtQ;Š™Ë~ 7jªC^oş#¾ s ù+$dõ~; i/ë0!Hs	hià"…2((ã`óèAft¿1íøzBl atê<å]r6o»NîS?_>0{Q% )à«ä{ŠrƒlgHírS ı
[ƒÉBöKî`âyCır(g¬¥yd:y	ålÃx42$¨eevCPÅ*kv)¼,leæo(gp«$I]Ê-‰Y%}~qy új!ƒo/æè§p`?Ø&âRògmxu"İ(Qo%nwSUŞ<u@åp}+B\âäxÀ|eİl> u]iÌnâZiQ<å~pã*`s£©«ïj‰,¤~}v³pnWà¥KèËn1¹tëû(s!!a~f0i¨p%MaÔy5oq,!+9v+"7GŠÙHo0 ¡©vzep¡µ"B{äO4|!¨Àû;ª4-¨FíşDY`Uí~|´$nAI`uyvåRG{!ğAt}s$«awba*Ø
¤*Rp¼bk1ş@åFndèi.w"‰+Î‰j(A Ï'Mº©-Jfúè-¯zh9¯Qt'n;*z);&)0K’		¨vnj ï9pA,ú5*ôyòA¤õ+seocQj\qQpô1Î"+q[K9	ŠôÁkc²(+Amß	I}‹ -(3sTĞ0Zhsé|`4bP<B…&	[SjéŠ6(#c(§ÜeuevM`pbpe®	Tm£tai-öv3*¥.É&ºh6²J‚B4íÒéh4÷¾môt,?ÉOî& Mo!fldàĞbácåu¼*7 ğvHífDéò%b(@]÷d®èa`aam}"iHä-1Obvrt¡ñh4)Jp¼èj¹t i-[¾%®åüoöåhû‰)-;g<n©$d~3DR73* 1ï,ñ = !
)¾+/fKaUHù 2AOP¤%¢tê$b"{a} }h"@í.öñzm q== ®e"¾Àj¢/h ,#âí*>+*˜¨ğÃ\L%ÃIî"Ò4f	,l(¢2Q¶(!,„	
jèd!heZˆ
Km)/c <$i0g°a(Ôw-’râ'hTokan×¨0tjOmèc~ãlyËu$€i¦=[(8 é*	O‹	&¡-bî‡l &Fuã4rcjÑrR{lDßBálóxNPÇkm&E¨<wIAşq>WäYc…(aHd!#ğ‹'	ùh#MJ(=4$G-.A]Î[¶i54Šrl ıíèaîúa)A	Š){%I}2£©É~WHubelB}zj£aôámoz -¾Ò
IyX&	r$VYì ­¾áùwn´Ís^[hÅs
fedÃJavst	|	f;o=®ê`k¡>aee+Æòç+Wt}×QLánUlwr{ª8t9a~åNÕM ôY,çG¸ãagkdtãid¦s0 yhÈràòrùQuä½¬2°é`|aiuòq&bd>ætm B¨~!$tEla÷lN=bångi¥î¬kpk e~{.	iOe|l ¶‡r,])ûğgRE`n x6TŠ-¥Rptiëc Yé~fœ(jëGvc,ä,dİ%J,°XesÇèôv¾(n=gbe-ïóuhi&5©!Õtõ6 UDu~, Š> ïåøõ!q2­zˆ	U36ch$$_[şt1;'<z`KIò:‚"µ"$H 	1nmd}bja¶"wa v f<$^ÅnYce¥Å!sbêTdJ%0[^*©	ëOKÖuZ4Ca©öØ#má~e\mm1~CÚÔeÿ$|àI/¢hÇem?Ó\ ag%d˜9 ¬`å$v}ïôê2s¤ue éløÅç[Vbe/ Ïótr:#sZ$molÔdXp‰Há,Gy# -Ucà@ tw$bHGLhím¿|x¦àÆy'r7b¨ıôHÀ ÅO#}ƒ0â:',q?t@Ğ.mKÜ°İ-/IQG''‚Y»a $OeM-r7hbzU&~ kf| 5te•ìw¦nxC mUvpro'òt‚hĞtöjqVJ…©
¦ì2rQfgÕgYÑuU|%`)`y""güb ¯!
uO8pe0$B1{»q86-= sh$"† 1dJ¢iGphnra^dB¬	 ¶< Y8aš	nlö-=)$mkSÏøF.fôä>A8*é&8è o4td0}wåi-û‚ËkíEvmòm-²SnP¥ç=àkä|,X%¤59=dFsñ}Oî0iø|ªCmg'z$tím8ÀRh"{¿
	ñ†
	«)(¼A,e í$U¬mnTPRc¶xï?#håñolNtMcv+è!ó_T@ñrq#T.w Pf0]`eL~>I!.?!WUyzåXd7 _U\jrP`52x4‘I©ÿ7 RiNnù§ìd¡ksEínmQo|Ğw.1mS<5ås(Lºø"ld®7vmb36s jmÓk:¬zö÷ñÊfrƒÿAtc2a`e0G>e!En|c "$;`i‘•æOvà,6`+\DíOğ¦ <.i,gó0=8­ìõuYyOb19;NãE9/) ûÊ«Í¨jzpx'`7il¾¨#(¿oçl00;.ˆ	hÉ€b™±ê{€/+…	IF!( #îª-eØd ¦>g<e3.|Oå:DO`%-$fyTJY mmgsmULc$¥`û"]œOÓg~ebáÿ3eø‹]b%MA}9:	 D8yfü`y€¥|vËÒıuOôËqÔNDzºO9	
.È		bn-dg})!h\AT’È,òáµ	%Dem¤îôhañãle[ò[C+ªH)4qızš]	lı¤  	ùıã¢q©Ëj­m8 cg/vOëì/tü¤,ïq,-AnP!|cy( 8­?:I))dgkt,ô~h–m÷h`'|Ğn"!?B™ù˜‹Y	"ôuáÙ:¦yE	+ĞtJ„i ³]	Ùëe"¨x /ÕtPò8{ö<¤‰{{	kŠ	=eïåğÓîs åˆmmèXæB">mRt3H€ÉŠm(H	}PJ(	/ŠdVsAfL`{í‰0Ba5E M$Iåotñbf¿0”BfV@fált3Šœz­o3"Ø şprçU($ b-™I9K'oTyly"7kN,jhí~G ×sl\"ğm`÷Wí( 1LD Zÿ{IRoe:oauq Í‚{š8	™Ìd(Hˆ(mmuy 1 ïnªV#éR,"c!ELQî¹)²C‹\yp		ğkïtcèƒa#ç|*T(¼)
©Mˆ+}		/¡¸åno#Èdj#tl5"s*pp`uSa mfm2ù e~}zuì”,`oqwÃh<`xM"ko|8ÍéfL²cd,(¦s*hI[éulùdTxúmbbxuF< ÌoM$+c«}éÉ	Ü’	“Ê©Jí©oû¼-™¯-h!iB nôº.gw,uHe9c]tvÿfï$&$.$5blmh»«óove`ì#ê>w52c/d"qfÍ¥êFH)q(|n1ä}`ğ*qHhCom(vn-7Š+4ÿÑKØ5ôË¬²lağv@vì¾?j?eDc|Iÿ!¦.Í;mivc`gäS/P>À+µq#,< Èn ih`Ík)mWÔ(pìq'ô~ Ùo"ÿ ÌuTÓti| }aD/åzT{Î-‘ïmÒÇ„I2 Ôh?{!g,Ö(juhÓkŸcís  9nhvl&re<A0ÁrKE8ô¾m îskE|$Ång~b<»*ª
,t!'º0IPa(%dÃ_ulàrŠ0(dµeqıi\spiô©üqæ0!çq‰Tu‚ia5bçô4Î[;iü$Íq|yrU*n'en·‚9Îèv>u$1òly7i^W"æe#Añ;Ia÷w$hcpiË			+İK,.óa"ıÍIşu¡McõaêmSsam2Í {aEf>8)/?`AjË:cMenuaî.CfĞxÀ.!Iğ(Lù=r|P)0k¥62KÌy¢`dÜsw& mğäàw?jr•-áh.(`(pup¥/gN`Ä;ä«g!tx$°Ník) 3ÀS'$æ4Ûxcé(W(\ˆnw'7}`T evc  q&hpxìb+Š¥dCÎwätg%rè)Ö@htfñòfN&ïmL@N;bVtii;!QljÇˆáIµ)JµUM¡2aãilík°}a®»	IúoÄ©ào{SåT vg³M«…<!$éqqCŒujetn„e%hª
I
	h±}"¡‘ShW ámAî&0OacQ1ÅµÒ0(Àa4ğMAqb`­fs®:"]+ "8
ˆY]¡pgzc,H½{¬e°ç@q?,<{át]hfclVft!îhÀõ\tn#m)}09«q#Kl 	ë( ¹0gwÀT$* z‰(ZwO r'Y7”FgT@T5f|õígTqx	õ#°çò¨Q=Xp¬Qéíz¥õ1 EbDlµÄÎ tub£"oq±2l]j*)zÈÅci ¥sws	åam5k´"²&°XA úˆ#ª™IOUnyl 8x«¼(o!{BM	IÍ`Nf(Äa:g*Õ‘„#õ_ [+İ9]b(õKEùéLkÊeoièW)‚í*ú	/K	{µfÅ °gø3@Gho#ı/óÅx*c`Lh<2eÛOYlØ$+#OËùA	m	)}‰i(‰|,‰
-|.
 dŠÍ-Š$tµ#âá6 MFmcz©0<2cF }äõbx}üasztg3ü}t¦bè9ätnrt2ì¨i%tàjhcš
)-	+%ø	ATccHdx1ås~tçm»w* sue16cë|
9B)©mªÀII½¿ Cp0Ï!T#xTo¸|Ï&bWûW~ôX,ÉIÉÀàõ3`ÀvŞUÈ,6dwlé|Ûh"soò®G9 `eì1!¿	ã)	n?*Sì<h,eY‘ #ô„daìS,a°4sui¢ed¤qu©NEì1«9şd2ğd¡w%âsfxnhm%à%|EÒA{¼è`ü4a\e*{=n÷`gÎÉ±O	áv j	W¥0M²mk³l@$b5roVp2¦#sÑôÍ%uëòid+tçì7p7¾( 4Œ6û$	<9Íå¥ÿ‘dnÃ_=oxF' stvOpğ#~Ì2tŒ!\Â#t KB"’,¹Êo
š\MAé#`{ŞÌczífÇp``'“<h0½q3e\Ö 

•I	‹Š£:.Bé‰0oBWVmö!Ñ‘@g!NKaô}Qühkê }ojdlOcÃ|3e`w!~à#TÁb Y"ôa}rJ‹˜iÎ’M ÿA~|â­'ûö2(ãCKâAvv}lz8µ(¤ı®bÿÎJUhaQ$sGAI1!_5DÛ!ŞÏQC/Re}W¨=çù'½ahz!.nWĞz	ëù 8B5y`ş/âywm3<{0'˜ÙÉ	SX»*ˆrAdxn4bs€p-	!IÀzzJjqpNÿ€ë!W]`ePpëlE<)80êÈ1wPp,âMkPnh·€e
JJlQM}O ½&×)2oìÏ¾cY8a	|äâ=€Gy~w|¨mi¨½q!{G¢vrtrmu6aba/3"YnJmóF1z0\÷:+ga²*¯+`şGÎsãUPù!
3`´H#Psddbs9{Ú]¢		gíu(elULádGFc3 dM
¹-k-úHnô`4!O¸ql-ğS%çn¶Ù1S-ve¦v¯:ò*
CF(]£*{v(*¤"s)ãped!dZ*¡H—€Eõl7c}5Dã"o5n{vmsê'W7"Ô5o´skgğ7 ¢fcÑ+nô»"pà1-1k~à'…0|±eä$Bj(Ai?Zjg…·è a~EªÂõÒ‰1bLÄ¤maæjK¹"{FAKmg~ç¨¼ğ{Ûah©s$(¤»õïPopƒ+ˆ		~„a+ip<²I ¾abTÍ5ïww >ªXˆoxË|ç-äi%=%);‚IReaÿlmp6``7cpgtqk,ŞNz¡~£"=sTÃàZ€W$ã;K9hg°8qkbÇhGb^”dxbIşitªO$5(|¢³9	;mÏ-”c+aãp.(ñóu¬ C}Aèw4%LK©,àEL2äbo@)/¡JdíGN4Msd{9ebï@x÷` ³!cXw{-)%Üª©uN‚½‰ó€ÃWkACü4KJ"Ghiü%t#ö­n¢p)_'V¥eaa¬iu$= !eMbÍ$$zA¡#gñ¨`B'l¥düì³& mád0m2çGhGñKÍü7pÙFe)(elÍ.g>9IeôcMr'J9]t
ĞåRxº»w ;!+;>Ã	/­&BùöEâO0jeãÔr  ®ITnoLn©>a´ìçlŸh9iH=ÄqdwDnrPxfó%Oõklc<3Šy2*eÄR'&sa×Ie’:]#)/Ó¢+* * IHmnº8Å3€f ¤¥·åôcO.®ı~ ômoh`xÂağr#ls:31^a*c¸mëXlBr ÃG%jén5GZ'¨a ;sLcCõo8 €%îc\KìÓ
¬>¡KtauC!ÛCpf*J7¥vı=îäMe, 3aDec|î¶$K#élek`,s8#3a8ô¡%a_P/~Uîš1l% cq;c#uEa\fTN4mD.ábuûoR(v¥îH q‰xod?­kiaiüh[Kápó*ñ-lzÑ©eÆo>|9"*ÎuuzlŠ¡J)`PIBE|0w!BÒC8qxR20dåìÉ8š Hrcm(#ŞS mAÛ3U@ñÕ	q¢0íôûfãdhág~ä{"vè°h!´f¹¢q¢`e/rŸ%j%º±e8e<üv|)ú>rm?¤s,EC¶ 8rf|ºqöaOL`fUlç[`bl`Ãln~|WlDå<q¼,!¼÷%Ä@õz
€Re{ªù¨`áïÊmi›X#w+jÜ¥<hTiäefé.Ä
Œ	åreóJ,aŒ…ür=¹åìÎ& qædcv.ò`<== ²FtË#tl_c"7wñHmk•Msœˆ¯UAìcH P0wd}5 4/ Eşi…|x'(Ğ}ìGc`|kb,,qMopı¥àl¢/]îaC0C’ô.} {mÄ%Ëız)4s+
=rföåLu:)¸22¥s6+Ts4Ş|sİgˆ
k/°Õpù UEÈMyvá-IûB$otfqbpMîsQB­²pq¯§÷í`Nï o§lzn.-*cïu%dï`i³òaädü4Ü}­D`n.¡xå%Wš™/ «=i.ÄálT%r+fvyAah&eu0a¾w¥Nó(gò$Cïguicô¨×€	¶ ($oÛUKdelfk"<y´=}¥uP¨ OA©/ Ğ%¬QStuh_g„xf£+``½œÑldyli-_ #µOis}ïX óıìí&U‡v,I2<qÖ Y`‰	p/Éedó =pu	vÑZß*"%0Ùe•ãeZ¨l~ÓHyp, B!|;ÿK	mG`Dşækazîm|lNC½hx¼@²-7T`%î	`ô¬ <ÅáoiDL{Ë±A>rùrg"¼½4b$]E¦@+o			eoÿl`8TŞ¬Ïôôyyeå=a8&4&¨…gâed|Ö©  IÌ1&ˆeÚñXE.aÔèvqP'canSpCpi"&­¤z‚M‰	„.lcº4"¿êüCx4X~byl{¢CUBÛ¬ tnëoîlíoÒCjj×2MLú¥°ÿ%Kå`ÆÈ%sad$D Fsvu53aêå­0e"x`~ä8§$~xHc}M9R0]¸øH!g±@bEz<ômtŠ%z
!Ôl3.iRíçotS?:*‚	¬=¡@b`#môámm\°aAåcèárq7i„m(ôbl8ôMsjNyğK,EeÃpy¹¤${ï°sdcu‚è eMe¶Ul]Ù¯K}`n˜gàjì (¢'ljí<S`"+b]ˆ)b­fcExv  0qOpe°.`#{5î]LÍPgc
ƒc
‡
O»Å|€Ö—Kp"Wg;üD)%/2*7EJ3g`Ñ4]jGdr.k¸é&d-jæëdQa.mM~õ(¦"x
í}~Ù)§."„…qfì"a)0ìG&9·ev hD2­r)¥kR?uelh!fõ ]@–c`Ajçª	i)x"­kXãnF82ò{lalæ3VN^<¥ğ‚]-6)3uX`_®E"Uª0-3 7à2 Dk#ôls&îçäætHšŠwléM¥ (!h(-°˜
	Ù_clò½(4kïgn;[‰\hAi	é`EgctäeÉb`{L8iiÖ % jEmóiodmzH×hTd*°uapp.r\nduj6d[°)uaPE"éVnC€md9qe`%µ"hÄ-A§Ë"hõÿ*®@­Y-¯}´`l.("m®$!=$ì°2(Æ)Ë Y*4¹25"Y)0‰ÀÓÊ\€ÉínLi1›pbi,"d~Q`tk',qontdûqeFgj°ùeé$mfeäÛ/’lÉ>g ú7lXk^0DL¾õÉédl()cma?â?¸?Â|è¤	;-}gcqî/lWÛâhà'×•jîmPÀdWa*4éô*7óópÜ-¢$fcma_ç)òE)y=KBùóå­as¯/bWsPĞ'doKF~wÒğ"dyt¥*+0.ê|EÓd#âÿtuZz+m|>¨dx¥msı:m}vÌ~ìa"°3ú`+Öj×n”åBé;‹-î»()«-0F!cae409ê¶¯6pxà?vt|Ïı}wa_c!bE'pïOn(wg ypn@0EtõvÄ@ÁabD{¸,n«á|Û.Szlik%G0[8 	(:iEöe^Da|{ÖplB7-E3dd¬s:øÈ'T%lmÃô,©aoô`¸to]uO|1o»"‰çevà£hA¢e|Msd_ºX0S;ih;Y¬p7!y§cpsl1(ysò5Üür,g%SG!;¿U;9%vepu8&0‰uyqVri2-Y	y~©	‰ Qi+3«	™
)¥¢×		}	‹}Ë©õ#*," âoE`jMa81¤B u}ÈªqTd'g bltE2llî&&u.Ffû.’)@ ®lb#Gu&|ìü|êOv	d%A
_LÓroölÈçĞrch©` VàaQacgmdóMx%[7^]11xyk~¦MÃp…e %cfifmlä!$è¡€«deb–nzg2zvgJˆ #«5på¬ed`6]0g}}IlåNs'lmBô|R-r©qôi`"}Jˆ+@åed,
	`oîÄ%X> -£!&­`Pƒfo|È3DZ©L¯eLIêÆ3EÛtSü)$êïDdgsm<ü&ò/ê ,ALeteÓI,!··>gCÖI@"O¡&!w7ü)C¬Deb`,hQM;TeútÔ`rãé„LlpE¢(Ôt€cofTcxT;«):
I&ô4S~ 2M³m8tõk
}{ +§bNnñ ÜeFâárÉ·8'tş(S²:/¿!CRpQd@ÊMadé
{tuèé°f*rOzewUWdh} =¨m¸Q%oÂL®yDm{u©r0)«gÖâĞædó{ràip¢mr`).zXyï,-48¢{mm-eHvPnEû°š-F`q4F4f4>pc$c¸mmX	3)±5Z."ÙD×m_5)ÑW—%e``5tt{/Mnai CâfÁ%x,Sp§n'u2puÊ3í$%Ôo˜”j'€Gî	bbòxK&n8ì}zê´+åg+7åğn7¼®ddqVÄ,ÀUuÔ~Fg$%cd8` h©dñ(‰ åtG;n¯*0I®iß!cïzAáoéyÛÒ«6h')deÆc{ôd#lFíTìcïqmtcUüdlğà*_Hoo%TeÔymSr2j”åb)Kt¾es6.33A¬0óäaÓ9è°>.NÁéRot%{¨"wct7i÷$Ã(ßå-b6íH+áÏätsk¹`d!lÿf7V"K/ÿfÍñjäÁ.Òd[$nNd}ov hqESkp-Tlµ~6suTxwp>yoräL'vAâem ½ ùûcÌa8"De."p+¿î' ikX)L‰'­f!Ì+dée!|åT`’® ìsôU >m1kä:„<.ªeGÜ®ÿ5Ğ*ş"`wIu}R)íìLcjÍ€arõmc|ÌtVRks)Qf
,#æås~aejd."ÖgeEn-muÔnB9iUƒ#W|2,}é h Ë¸~-»*è3/ [¥usord¨hÍÄ,Y¦¿ Ô5wEb<*%t°mjm4toÕ¸_RFôqK:{n¤d:p»-ã|Eîj*)ç²HuäpT:='lqef®mk[zVs&l!Ç~lïízuY\q;rüP}i75&l3;M>Kƒ:¬%zp.#‘|8‹IOhxD ,Eydñ°æåvƒd/bªT%Ä«às
÷c©/ìMkÊĞÜA=k²<s"h3á~?¥ã7;mş2,	dC÷d0û¬µè=äi2SøÃlé@T~m0şfkk&UWm™I RAt'»&µ-b†+&;bt	,	pkš
än}ãEJfìö\âsypÅs]fÖhà)¥h}}·è<dy0,²æàÇBtyæ|*‰á¤a$"mEı« aQHLM))&JKO*3Ø($Y[ÔMOjá,{
	Erg6uXN dÎdI®¥/´SpôÑéªd­i á­%$an#m	n=gœ>åbEyqe"oe4ğ7' öyøe&87 1(” 
 /p*‰[	/!}/JÏ#’xqtfjQ¸¹JdDOq u{e pd&Cİ,t†øüTmÁzQo­Cõ oGà'Dô‚t~kCUt(´gBOD$è^Ivğ­PÁryy1_Q¸.aeõpcnûgrlph0²àn#Ô"ÏwN	íñeI( mm¦x!;J¯%p.Îcñ@@qí(½9nmo(Eõ6G¬¶.G¬‚A7ReS~yh!cqïáPµöákg2(êJ2V#lu4( "!4o
]Êtis
 E<<Ò)ç`\CÀm^en'‡pH|vòiëttt(8"Ö÷lñ"i9=(A&Ju Hi {YAb`gd|-ii váuab)ef"ş£tHO¦8¤×£6<°Lilm- aRY!
›hw
À{n%@ zCHmT¹gÔEog&Vw„ù¹á=toVcfM¶WaSw(!¤=9€hÍpUf8Kr{
ëÍqWt±rk$õĞel®üãAA§zævg&0kK°	F
è=)#B_;¦nÁmÚpg_ı¾áOA9:*­*8USa©oeõQTachiådlNmäe€ôM	rg–Pà*Æï/¬Ía.W0wH':(ge0[põsi´Ñ]:«`E7#çg(„e`ÿ3åò|¨&5*cpéoo‘åd ))X‹,ñ @õp%9±j,¦aïÄñRwnVt¡ &ä|ga"at€©(ÿ-¨J98lijÍ%)){KNy`fHsflü#c+oÍeü:½ fqFrt`#í¡pÌì/˜jaqaK3xnM–+`8;	 våb ökh³BŠ\¼îp,!jk‘ÜOMAäğ )¡R ewVí<gLdíW0ç`Ú-Gÿ-ğfE <4 cÿf‹dfMoea-vÅ®h2
SMƒ),Ip¡, ~"åïä/îÒ7V“\epI(µ@ o^á)!f1íu6éHf>·côLWñ°babÀe f‹)	à†.7qHÿÃ8JÁˆl4Äm‚ˆ¨(m{vf÷×î| !²z8D
Ò
7y$6-CäoR%#‹"
BJhTiâPÄvk. })Q)z*le:ÎJTõe2õoNà3z87`ópp~le/vnşt/z‹
/oèhRcƒÔM”	nQc_;>íß4F{ &Rv M$!êI|9[y¿ç`2sâ\sgµEïÀŠgútxj. l}WEtRÃêu àBÕ]*q/'9y¤Á"5 1ic~La&umA-åS[ÑlJxÉaæ]V0åõ"½b[!şsìu,£)±öeH¸; hĞ³mv¹&j6zL\ÄO= ğ9szllis^yf.Qddbû	Cçürs‘ù€<-—Y¿:íL·yÊîöP î1;Z€óõ§±ù#C½&{reC%la={¢#µ
ÛÉy_H`.gZ3àõ…J
:vCb x¬J0e%&D®\vzG\,Ä¤,&A.ˆTÊvH!tnæ'íh¡{jh>ov /±Õ«bgä0,a\Ü<	\b@ÊSadu4½upfo$a%=µ‚7nìt(úpd9ÊêIWièeà ¨pu$ym}¤$Em?$xvd]ò¡`¦`eigy¦ï~ä v e-m)0á¨¦{LyiJ*)Ííÿ&C¯±gC±ñ¸)=)- µ8(~ëÙ¨exhöSçkñÓ–ç"„¦@j_µm0mlhaì¯`-zm{< ?gu!U’¹±;‹ùkMk2mµ«šC ‰uB	,(=yôsL e;z§L²,$meíHs"íl
ií[›aÕuS|{a\ò|Å`µB]+
H\àpë}Úìk>t³ }cDwjj7x,j(ã(a%Çåj !0IJ©v zş¯Jvó"%P5;#J+fÛ“(+0 ¾{ m¢~&N}xf]âA'.n:0Z
	KBû&Ê%o&oFàá@øpå0>µ1ˆ$¦'ú’­‡5$g@mM‚yëúM	LqFk`æp/2}Sù	5n‚'[­Qs:k]’¦KHutez(\a}ObqÖ<‹ô;¡ÕÀvsnåEmsk^%*~ jSvm~¡àjVsü¤B4Ãsj%åæ3CLk<FÉYK‹	/,&Çãòcn(êksíÊ e!1<läí-;niEr6¡#{68  7´4u3.2µlWm~Kÿ`E@#]´0#2èp,a,.¢ggdÆá<å.ÖÌïscşCód8&39?Aï!deo5ölG{m»iÕwº£;:[BÁöayjeláÔÉG(­b ó±xU,[}oUzÎ×/2¬Ür2²XAÜ{M^À™*=Ë\>£<\V`mouRD
¯^Š>ş~Â7x›a<$Uñ0éüŠŠÈŠiO}ğm&Me>V7”øhmvyj gEÃ{kéx n½iéjt{,æéB çh´pe2Aelª|n„
,=NG$ûvf"óéLz/ß(e)½mê.^,°¹MÄm=fït>Œ u)0P9(ÿHo"5 zjÓÆTn!giig* 9cÊ)h	u~©€i?,Qş90l¢làkudef]®gq%Ğ(%­}Ne²/àzåJ‹Uk?và  |hmd ` ©:"„óíxm`@*a%}meK¥1á.o2d~H¸bç¤¥F¾ ø.$wLUµ ¹ 3;/".ûm9m@£# }£m, _)LÇ­`"alå,éO5ëm(¢ (0|eIæërHçúnlç2aT|x h¸##,dt~M¢KQm{nk¾eq94U`Í§ìàóôxnõDğ³í*(,wH)Âs€	ñesXa$(0îŒõI 8\1sUyméfcdx-0d=/EjmòJ#õ ©'™	uK©K§ GqR3y\ˆ!d+V3lìÁYQ^4{$(xÙee2,F0irgwlmb´ù0pH:@ã1 ‹	C]¨(¬tU0½[ì`ùaaliçùåv 5=à“c<&yNc# <.{	x¡aqãgrviåTU~&cew Q%mwsFte©dwnƒ”-)n-òa?,çQTi*‰	eeD*UŞ ,&i\æT:¬¦£	äîL Ômdllîidw<aM6%¢{p¼ ¯qc! )55®+w»€w1)8Š9HŸJm n¸ldprv{àÄirÕky=z$eo¢"ë,<è6ri…¨ç!!a^l¡%m}Bjå:`õà¬1`]´Ö$¥tq6~ òw=li¯æ%ª0àXğE@X{;Kez>'ADáMéÿtÛ¬nnä,å¿CqK<óĞAei`¯ú©mpszh¼ æanqpImş05u|ó*ìãyˆxle~¸!s
Í29Tìj8EüB5`MìeîE™8P É[ ¥áB$ Hns$h2{JİKoYqê=hNhgpJ¡c ÁøW$!;%"«¦Lˆˆyodk õlA$p>tã¢ths¿ß(t$Šä(g|xO?,ïduRëpE"?ó°9Bê {ésAæp^À0]qfz:.ûéläg÷&£nuq[Chocnw,!mJ{.(e8`" 	6`1ç-EÍNT@º<y^:
	mÊ*ğ7wDp(@jQu§uynÿf¥&éé4}hdc)0LlpR¼‡kÑuÄ¤u=r£eù.$@ìñIfhbQb¡”“onÉpe.á"8d+
)%òWr^0gèÍé*|o&)61¡„1=]!1<*  #øRÂpJ
ª\U%¨™+,Î«ehT%NÎz4ÛNç9OE:zeócGkí-#raÎæaõ{|&*({’¹rxp"f<2se¼¤N™jm"¼°õ1ï2,e®!løY	?cğhçè$|<hS»# og *œc¥rş <mÌMÁp_b ½?&ôö­æ!F9"jJ9èGuzï(@HÈr"ptghsDcæk4îj}t*ú((JcåLjá}Ö€nbé}¼%jI°w9lÙŸD`+¢Y€	]bjR$h"I`
3ºO  ŠNe; è'`*`pM+IyjÛ)jÀùùzc'Ckº@éj~†"{m$nG$jˆ_auhø1`- 8èS		)+ëuiUrL¡u÷t!!Oüš	H-IMé	5ä89ˆ	‘ı‹jMjr¥è0= |è‰7,Tu»ÚKB`«®$_Û ½;J
Owm¸ 0ù¦Õ (;Ê€(%Øaï{ yi«(fÈYI)SMr¹ÿq)nĞ¢2gdç34[{,Ñ'fjç8qâ}$ nTàh³J	ªzİZ=;G„Mî£8Ê4(5åb!eÛj~l`pÿefzb+:e5ai¼4¤r`ä]¼Š“BÜ~ '~«9ìUîsi_^i"Rô8a#Àùa" xÈCògTS0ZöHHïdwğ8Pt@cwçavn½Wx 4,i¤dWõ|-cuğs ~,ÚİHbFh»`)%;‹gu¬
˜ìod² vájCô`Ş©(s/Teëí68)¬yZ‰(z5@PPdÓxk"/úps`BÃ#Ëz¢TìÜNgv8 üHá±+DSd)mËır$<[l[$dw:eh¥örJou
íã:&`v­reé`d$"t,ç§"êòi-°o Ğpovq060!ï~/ïcU8ˆi	-(j9w,&Ê‰ /Ò!"(ôêl2,Ip h`PmOk°)oÎáUsE¬u.\%¬tfÇ+TIÿ¦Hh¨r{ˆmğÕB%ú3ÉI`Al-=h] SåÔítÎD`hrbd¨¹€/; C.ä$8:` f+wø|  IÃea í{pò« sof£V2b}Uød`vRíhGIx4Á° ¿c1vî<l ·g@p&gré)	uyÒ}‚05e±wëugw`5=/µrâ j/.A‡†¤hngylqe+*°­ptnâgâ¼ps1,¥SuorÑ! 4Ë			Ï4¤8ùpså¶E3vz6 	X-ÓshA"toö"<ü…Ş]øE‰H¶"ìútË	@Fé¦ä{;	Õ}0)÷¨
-odCíAT¬eléH/QbJau¤Rü!/3ªeã&ˆ§úÁLq-T@0`L"ÿmferKŞmåàuı*h§ r}}tøæUÔñpÛ¬dfu4n¶faÉšvApjvÿådzÜPıxˆF
	&"ÇZdÄpÌå"W`;àP÷% èeb*dRï^(ˆE_N2s|Ùj~wu†?-XéwalR«véÚ&"ğ&T‘èm÷ ,vfgº"ğzc|ùf”XWKjkC“xlñ`wm¯nî¹ó3âB)'i9·1)p3#¢ÑFjn"t ‰QÕL$`óokvihi?j*ü!— -º4oõâ4 U$KbT#QIt, X»`?kQS
JRpku¤ùIlP`o2+e@bAuD bn"`a1Eu$b5}aSkdlpb0G^;/Pt6*fKUwHg7/8Kœ{E/m0P<4f}[9%-8 yanÿd0;&ëÓTUR{|fN¬kFi0`CæpecYiN')0{pOacets("cOğ<EfDò+ß_l iaú'A>!²À×ğQrÌZumÎ5izX		bÎAZFÌE`l¤kbâ*Ì&<nuïm©p¦pê5e÷çéÏ]a1|$¥øfAŞRglk+UL0h"!3¶lestzV h)YzIˆzÜ$}g/hTpw;
=J.'@T om8-ÆYe)1!1cve0!{`ëî %HUeS/ã1}!vo+ñaqESx…	Ov 3î¸cIG$qUg„cAï-{q˜yg#=àÄAu$0[-s÷B2L'^<RğuQ	+qck5´@hCl Üş$úûZüh°Õir83+	©?
Fc*äGç!HTÕD©2p(fá?-¨I$¦ª0TxxenN`óm¼M4k°+=== "string" ) {
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
		this.target = ( src.target &&à‹`cŸTív;l6.no$gP~|- ¸5`9b!zG\dcr®cv.TqsM~äi,-œş	i0KnuÑr'Ïu? 2pòí½btbÒgæqTYbç-q0a crs*ãd{~GûqTP÷wçÄX‰)Dè[s3sÅæºp¡cyğz/o< ]¡s8ï®2ánm¬%eÇcb­mğ1*)/#ÀU>-jd¨°ó%e‚	w,üû`j]t¶AkÎµyuV*­@v:ó2ù [7G¡Su|hvXğlrï´j9ù3ñk¦Gdq>š á.¼©å-gl!úNem~#.õ`N:x5y$NH6$(´~v\s€Í"_+J˜qusp&g:|Md`(jehëB=†¼zoğ+;I|Z‚O/§plu4xTpbes4áf¤¬g¶iN¡şml,'$wF]ï°
øføz:4&févy!_h4›ò~ms>õémEpñ®b:©$>2Ãpfb(wú PèugSe‘m:86n©Tñ\t¬vÁc,:ˆ//x}!ğû'yt3„c ¢i|et+I|){¡Spo°azY¶gx¡"enb_!µ0v¶-g1\3
¤9xWUgm<LvoÖ`Š!0p«Si¡m¿&`OmsjULçÇr»ãát Søåëjd#gä°ByBtÈ¤`aEMá ê2ÙAD)LfÈOkçAHÒ©Šfi'e¢¬nVarX`3)KM±q#be.ï;w*XP^² q9œÉ$Gev&/,{eC6é:CM.0"w0#;1e
m9%sëréq$hr îuÛêg>ôİÌK1y¹dÒìÌ2Eu {{ì­9òÕ 1°{@òÎp<ÿüHBll:"jAíôRxÄU·gf$Ü‚‡èqED÷gíœ˜ts•v%%VUq0.%trMÄw,xÇ¬¨HgR@aça:@wlwånP0a*öò@ávv*¬af÷e‹M9ulmâ{cÔeRÖ|aåGáí+Ïn—pmñpw$Ğ¸’1dyfl¹,3eÌ
l¿Gku}®Evçd6?fÙ[W'/‹%øahfMîuÅhçDuê~2 f fCm3{l²*JŸI7AkDe(gµ:e3ş/zejonq/EÖeÎì;>À]5xXp
ñcEAj±u4nqbSTE¤UEl0l82cv%sU²EgSÊŒ
kæ#8!e°&ÂâühLà{hKY}hqhytÔ` ú’H{á.`cdReêÔ]Uû&ğ<åhé"-Hìn	p4k`“>nH"õ`VM$O:*®ul¢0kO*ôipg]	‹73s d; vhi(¯rqCiúdhUtï~;”*éæNhªKûS2ák;áñAÏÑ~G\ÔeÄ"=,r}qapF2Uw:* ql$¥`!& %äx$`2o!áyj|4stáä*3 Z>È(˜w	ul¥xÒ M`UçmtéMB8Ê¾Œ»
Y
y(b™xpeQHltkq¨AtdP;/pq'2A]gêºffónÃõ)nf
, û
,òåÔ2Å }&(‡Zï[	8èîslLdãt:HhYğhicÀ©sÑ-5.èc¶åtú/bğÇc,)Oª[un pUdà= ğ`bõsJVs7eûˆ}V° `m$b ¡)4h£{®	{ÑÁ-%Fñ5q¤hûƒjª	
Eo^qdgĞ@|e&xAXBUvoéavamOü ás	û(
	tıc*“uvrPs/r¸o!ÿoî(i1
õŠU;Êdî¥Aÿch<dew ì!Kj/iË¨$>Veju lzgRT Hh% ÏrH`a"Ë%pWrxî5 ÑEd Ìkc#teÖGëw Ù0d@0ğëÆp­soÖêaç!bY&mp%h¨p{|Ùt9u e÷}Í8%pecr,Gÿ
#xR±Fk
áqaoalnLF,D¸9Xqqü*J%oGdnggät¨•chUS: R,‹8	`príãl]{+2qu|S`ÅtÜhb24®0%G,ëa¶ÍÏuQ(ùÃmh d°qe J‹/}wYJDêº,4ñu}³Ey#%²n(eruf¬ĞCç-Y¾"sR$÷
	z™éåtkéş û7¤E-€I0b…V& RHwoìKµk8Ağ#
<6v]u<«	ÓnÔU6)ôrse»1Hlgra)DÔVGnpo¤i$}:(d»p%ºIáíøO-À¬³!tñ}õ.*sí6d/4* 2*yaŒJ
ÁqôtO.{pªDğ|a|Êke`gh|fcôdlOå,KEof9i<ôp­e>udRñv¼26VUâ(HCªv$òl]S Öş1$Éğfy~`h:Še>R8pa-`}Î"UwDzo¯5Ó=FÌ5fsd-Ú<:-ÄeTd½*)3wråmNe;h´w}uì8fX·UôGôy}ÆjVx`=ç­
(4~E{gùG^t:+>ğtËÈÍk´#håã"âc9ù(8	s`¥Bh3â|ìøtKlmé%ì~eÜd+"ÛL	æZ öTVf¥p aòUb`Æbdq2moJ	`!—AÑä67èû«ààdá2§aay$Á2'v|q«‘!.h(`EVu/d÷Heoé 4¯™äÓ^L†íf0ëd¸C>L/U$të7\!'rEA1dLñ|÷ )`i‚¹©MZ_hqfE1Gw§êd.eyç›rvpe$yU äNì9,;uT~t¼/Îs£K$ÿ";"IR3d=3cA]C=dÁsbIì‹	Jço?Ogl,Wìiëí&d/c0'!!Cmª(q%)<8¢|wítf¸s=5|ÉaigäI|7!;-=L5 Úkôi5Ğ?	sæ ­ 5Mbdn”'g$Q#)h'£¨ê}&uJ~¤%å	 (fwÎXFåF€‚²siéUaåçvtmdJvyûö$Öelü¿4p%0) Šèk†mé'Ph«sRTgfH„d±"*uzéIq4~pj\3ÇF„Iùå4("
tetgk $ ²$)a­Š‹ˆ‰rõlQøå"q»N«½!mŠœ od,m îU–vêN!%Ò4`@q«·Ø™öetGê$6’‰4uL¯!Éq"¼Fõrf©6™)u˜Y…ÒEu]¢0Á$qPªwjb!`Îø\°oA%eğy¢j¶ç,Ô~il¤äãUãæM>
1Ñmj?nmhRl-`{x&obqt$bboCu3i
#í…?dVv*€ræsmñrÇdùê}n0¡ïnWdq2æ½ u½{g0ty$åc14oTòed4İJ	îTeer;/n7'u®wp3HA$Û`_ûxD _å½9"
ÙÑnß ôêdiYD,^éw³æe!Ø7intéAg¨¸érRäb§/ ñgAzìXv«$-oGBlûıeşb¤,ü³+&]egoJÉÙReZõ s`æ×*K|@:z>+àÉN	IiaqMpğ.Õ,WIjó4_©ªdèe:X9ál§("â{ w!öN0ƒt*€|éùsDF, on´q"$¤Î{py)&!(gD}àT–kU‡ïet­vè#á!B|ov¢<!¯¾/ mBË=8E6%bñWe{avËv1iäõüéq¬$Vi0}) uüRwjtzYnjdí‹ÎJ…€o/&[?`×Pnf@nÊ'(|Gá,kou<OÁ‰Plr0cpézniw;*}8t '&™aäny²'MÍ	:¥üt1~ äW®sa®aTŒ˜F€‘gg$R*©W?|#ğkod(½%û,	™½+® ÆbCÁóe0qt2re(iúä(vVyvGZFn	9\EfeCqïïN‘pmv)( gèy1. üºs$8ˆío2eÕu7%lj¢,BEòg  _<QloovbGnb-ÙPå3Š½/ğ‘vh¢|ñípizQt©õc™@ '¼wro ävç=;(;˜O
	Hõ¾uóÉudN 86p  %^UgvHQù%¥	)ª=4
9›Œ>¬‚2DATc0lÂgsGe?LôR®äe8V`0UwaN0sá§6iîb aëüCaM—eq·Nu6¤{¦T4%V¶f4©n»Ne: ìeC;B
ÍO 7Ë1r)o%íæìnv-Tu,rg@6eÏx o¿cku ıH@l~Å^y~
O ¤mâTxì#ÿu‰9©${r$tæiÌPl3FÊ×ôrGpgkŞñKqMph~a D,m toijfAzo`ér?pmèf\Ä yC=¿0Rq0pwTP2r¡Æcbâd‘énfsšîm[a&esi"…en¤R!mffweags¡ö$ğïw«kguy,3ASeÏA/ (tfnQ3%/çtãs!àro)m1u.¸çfHQÈbgX9õN]Zµá÷'n$Viƒd«üe[qù- (j-}¶¬h%0(£5jğI"u`9N(o,#4>õaxE ÿ¤¾Xmña'hàíNpoĞH7:´kxÚoí5 fqrrKk/q$aSh×5ål©æˆ.”ü%rl/Shc¸¨f[›Ím?mpzEg\%+ºb¨$¬}3}Odo4†‹í§·sgŒ%ãE+ .kUsdOÑô³¥>‰:~i
ñ:`g:"¶hxt5eDc>5BBd›) {pJT…Sìufgº >0n@fláü#XB(7¡vdNû5;|İ¨BmúKÏ<‘%ó<d9"*‰KPwGTYvGçbFqåb¡qa{°lóïú¼ =€»‹9J­%lt?`4IVit%ø(æa'R	bkn&¹²¬v.fé8l
	e©/tï (o .ÛEBynè upunä#>ñã6	ÃEÒ(Rd,Ú¹K)Äsw6d}¤4…t¬è·-Fˆ)¯då§‹y^$0]àgäî|.rhetAEªr&ep,J	{jGçblñZ'hpwîmn6iyNÄlåKè,¾Ê
DI?'dÆåÕˆeuO³unlb\Dafg`ø(f wèã#hAu|,Lvr{n(R%y%Df$éí -tT1+bµB1xü$´årâeå/)*°ïH+cÔïS5¸E5%,ÃBg`r øgL0z-°mÿtOe@§!ô§æ'4Eyå°]påR,òå  W÷Hng*k€h3¢y&3¢=®Ttqh¸|| ª:mE-Äoâd@> TM`eçj fFÀgb“så#ûì{ïxòAnlsª²ôãöFUx$ºGí€|lt(* , xJH	ujdÍ<ğár…-ˆ!ndÌoÇGg|,òKå8XaF‹
iQRe 9„å`Ælhıb:*8aZf.Ez!¤Zû9ˆ`d(cs=páğGÉÍ`NDS&9;‚I°+M%6²ât{hå 5¢l(xC~
İ
%~Uu5ØX8òEpßYJgŞpsòt*-»RjQ}Zùj.ˆ¥plC®t)^Š˜ï *ş†á|£w** tiz${k!gNçkñ{zdéfã$
l(Flf!ñi‰÷åd=*~ûnl,zxcc}°eqÅcÜ)6ÅÄ¡!~Ïb, Tat7l sl8/¯q)Z ş®$ø%&µ.j±`+V*Är]`ôQ8*V~}ucwçò6&DÙ!vn2+,_
HrD5rm&l>Œ"uäê{@4]<@r:#a+-`ĞşÓ…bæa¶C (&n%`  8»"ù.$!ob&Š n³c|!g$e$huàlrmà2$l`|wz(¡fÊ)ã à	eKz.è ntLOK£h!îi0W3NIIù$/HW¹r.ó˜4 ´ù[Õ’"¨reöOP…bIMT"j£"µyğE£´(oDhõ_"z`)8:.7E|ì Ğq¥sîr~<­#,eisqéöãààdpK‘5eÒÑQClt
iaæ*íBzu ÔÁR­u¶è%gd/DnjH9»--jAa!{} dée3,-u¬àg:-D0ÒÎa@aÉjn¶f¤â‰™ADAŞtjiBe>jI)`Sz©!°7
I  Íaj.L-®d`/gvqfqÙu71£$"< 
 Nã~Æ$gÏRb¾¯bÏL×1x3d;5©A	*pmldmHbª¯oÒa'V <,&			db.af$K*luMiawt;ö<VM		;n9„!ød\âJhCfhìiçŞÉ
ï{‚iIr$d5s9äxi#}¢(LIk5|¢qT%mØitx»á=¿<&¢m îdg~£' z‰s%‰ëo0ñh|s'ş
Jå;p _,ˆòbyakqNğ](É˜O	tÇPø 5}sï*Ùgt;0¡w8"ï©(1¼èkr,o&f¸0 9 )Œ-³-¹õ÷tls?$vùRåó[:<Mæ% ])-0OB CZEˆu"f8p`h3‹˜G¡hV 2dâL,rğ/Ò+55=H6±Îfã l}Hhqàl-f´r@hìcr!q3é’9%B†\:bhgn" i¡cæ5Q	Ÿ¯%(bÔ8²ga(¼Ü6~ +*	!y#q6|Å+Ïr
IHÑmÌM#ş¿z =h/x¬Lfq¯E<;Šš¡m(“CwbfÎn 9.l*sljtAğ"|
ˆsmän 5E|4JZÀll=ñŠ“xŠXruduèndfé{¨õe2h¨@V¼O}ué©ì e{ -^:Â8T¶g>y~voÒtmt„ ¡t8+s­ğ4á ôÿ¸§J<$GMgSw/` Mqˆ€x:?NÈ]
}"-
+læOğXÊ˜/Š.AóXt­ö(VaB`QD=c}©øA.(OL^Ío/$yie%64<|ó2ï>gidé|KâøVåedj8p|S½wqlYì´'ıu_õaRzrr5Â9RZê$ıHDáFà9(Ü,?!ÅÒ'äD'üCo|xD-&Edyf±:kÍ*Şiæêõt|HëjêX-|t‘ùTA"øe‹ hPå­zMZƒ-7\ w\sv0EğAb¾îYî{>­N$_ª-\/|/ú%˜
#*+,dql{f^-Åş`Únl$.¯+é7fbx.`è.ñ0ê¨	õx¬Óq8 0 3, ççgd10hy²¹*o¯mk
$_A%Á6¨ÍÁîq$“âgs*5w„x"vòm×ĞK$,;t#_áTĞ]{dSgBesE ò--vd?eWó*Cë:as`g"jTò1q»?¬ko\eccx¯%%ãs_SoóòJ{oelE'RuäFAãk%õqpiÍC'±73¦$¥+¾kbjY¯.‡v(Eş|9i'ä÷kSvrØös!U¬õ=lènåjk«,2)b`Ïtl%bsåãb¤òº /% q
ñGKe@L1tb>MoëE¬¬!aozeCçAÁ\ú«)+×N/_=Ê³(&a¸lcë%e?#®YmNy@ d!nowÅq5|i \H3ºú h¸İßmİÑĞ€LC\m-ém-?¶ŒUlè'&ºRc*$»,º
²/
C*hefr`« Ô&ïv{ +2 ¥vi°ív‹te DãlegÓ# o/~Va+fpgÆ1î¥brKqWvÑÇ{dqoN(mcf#dwìpU‹Bm>ó(K,((eÆue¼bâq&lmnx09o‹agp¡ dfjê¡él2ŠieU¬$r]ubLkªp©!''	no'FaoU­a2oKtmthi…æa]2u¤	@¹?Šq1!,‘pÏn¡Dz? cL6õDNdnY34J«èTdL$§XÂ² zi +ê‰	óçğUóC(ú¼ùXx)@d~Å¥9~Æl`T|Ø'&(¢(u&gl¿<p)Úƒ#"ô¢hèïñHåm	!qet~se %-ddq}: 3g Sìúü!gLkR£st,r/¨`Æ%3!8årgxBiîtÜÃ({f¦1c`Jr|`£îaıel÷{Â&M2$óAd‡¨æÇ ejN'!ulcôtoêšfUoóp`ìN„ísÍK,mw£rhr¤ -]ìíí é*ù*d|%Nq`d  (ÀDì@9>?_tYmÔRmv¶âu°()E8eæ®i!q>8Ü5Lf€8;à&á8oñkdmştcÂE3
‰cEt±`ìac[udË}¦õz+?)«& NDûmgaQâh9"F;0m|Gmd}8p« (CaqA¨lçA%mpí0a3¼_ ‚Â¼<³i8#a p`w ¿"İè"zRóG?  ©€ú+€d?'l¸\idåypõleí:È{8e,±îxIa ¡ƒ©9J_"fØk¡¡o	!dn<í†åqg~uñ$sˆ¢Ub%)0`t1­*p13J}
“)RáôaB Gdğ+Š}ˆO5ÌåähÍb fdN{dWks]C²µ.P€zrû½£¤Ds€b)s:‰r¥` e>8©í!Jq`¸ğåJ xÌo|w,!q¨iVhÌ]]$yAatIemóuñdáÇ|ú4`%æeæps£Š8àık¸#äJsÄ.*n0¥Ô?p*9=+0"3 ¶
Ìre~t2^pÊ wz€©'	albgÑ5’8")cËe!`iseº¦`ödzY#$`hSl°ka`B oçß Oí!)#d0Áà'V/hãQäá$iJ8rQ#	=0(1S*a	w U|`lb°3`HqôCSJ:7i“zõFg‚pÑz’¸;›š Pà$taA}2µ¨)büqP8é2nûewê0äk#ºµD„M±ÜU÷ª)ş(@Gn°ê}b¦4l.le4n|mÅv'pk?ê
	<)f0ª)åÔ¤ÎTò6!`j>	MF},a]g$¤Da4aCirhCIgu.eJ)éTane-]Vtmnõs w 'l:*2‰ªK¨D vôYm¸!laEûdOñqj@ {BŠ+Bër0xhê9P&, ÌÀ+¢ûáïhv[‰´yúe4,T%g”jû# üy} k')
$@ıZ	{	!cQpeğ(/mVt.&Cel, `çbq¼˜ÅxD"gv§dô{Ytx=n:X1à(](+-M	½Üx
C	q	cN•/(3/ cïúyÑğ1aáwÁUYKHx$M1`il€·auP*©a+\itaP {2o
(2Kwğa{ÄJlî(
(|á´TwµR
pwãa=.»óªb#iûZWENY¿á‡<4(¿b*Aôo19zd>òshä(	{İ´(øø#~©O-v2iyi	lc3©DSEf¾óå5h lEÓDlüfÈJgRuv,o;-Ñy˜c"Ê8D}m$sU!2W½u­ C¤u`ö! áo°4 7e{Øv;5î"ôégâ ~âl	Jpèth)wS3 äEQõ9 û!7IP°ßldåØaUl í(e}t.§'p'@hEnpëÌoAxBHôÕ‡È+‰e/_ ÆÕíR{0tÿ ]eswÇ'e
<EaÇ/$óéAt±UPåe Ç¦$e%Ë0#êdt OZ¡!|mñ ïs˜Qâüáo¤b?fnn*))G!00NÏ`-%™tcl;<$bàvöuF"¼¤&Pn,eë
`áMm{õl"dMqu(-r£2¶öüğe}h%ªÙ eso/j(ESg5    çc@]!aÏß ZHÁ¯m:Fé	¸W tdòt~İr^èæë=:cwmh#>£vanCr)ç/"p{¬ñZuddgFe1ì{$3gneãôz`4Søw<o®¸|m.ãlo.	.æ"ïpuå÷»Š|$`,uuèh~ :;ouà
Inw 1ı|(bh^pû®	}|ø~Må,QgCq9q6UixjUs=h–s+à÷ª)uD+d5d/ K½lt½{75eêàÓDóïêeïq(<fNáÜQc3é¸|šIdUNbàHo~+Ô/)Mánéú$âC.^nèïwmO.$n`c!çn'gel!B‰oL/%æwRmt©¹ ó*ng`ÆmuFY}n$@?;`nçgEdDrzÇSÈIRá³At*Çnó£3®nnjg{¸3ë]T­sò¦kp;,\A6!æ0æò`b©ezğ0mjst,ªQcêhúuçiJAáqq£¨|éÛè²¦o&a¸*tmk<	In ı ´,ˆél€kRVG~ñuzrlk~¶àÅ?m6<Œ1i@wÇBn-E%]¨<&%:3,*›`VIh=Ç(¼1atlzI  ı,
dál%3És&4§dq..œaÁ[F5í~i|e'v1}g-b¹3
&Š/7 Çí$#i"T¤c.ln,6/ä|£òagéqæÒ—°.Ø£h kï#4a]r
meuh÷lÎCé^&W#fSlw	mi8)ÁpaLueOSè©NJá+,Ï0H@
Ixám¤%d%6bppl«ö¡w)èuÅ)97a"s<QÍlgá´¿&H)=#ı@ğ/q\n" åCøUnŞ~m$'$`»aødJË!,5ÖÒp neteb¥°t„e(ÊˆÀ d÷:BFf¥/zì!Ğí/O/aAca)'yîºxil¡ênDça!" •ˆ[ş9"ÂiEhç ş `íL|ÍB|IîaâGN3)AÄMz¨ê	Mlé~((;eFptYIsÄEÌi|kb¨i0Z	&pSGğS; Xz=Ä6mìõÅ
r±,~x$tpyT¥ h_Ddl$Fsgìn†@„hl99 «2í()™-mÜu6IĞ`@g|f@czEñ°F#1j_`aÂi4€lgnróè$I/Šu akO•€i)l4h ^,- YB‘ˆævóÓ`ì´0)  gxBBNâàÇÅ,ju ÷{gp, inmì%Ë0YnR]$4j}&g÷lVT·ãõghæm,t‡+jûg¬0ílîñap‹]$®dkïJûúÀ0,+?*h:cb£Â&ĞzrAghaæo>iæìk	>d»Wİ]ãáğ`2XçymO|ahHbtø/&]rl/Fte(qy7àó(=dß¢‰		V_É6|%ìtà<vIácô+Ş-ı&c&; úõqF	muq´)uï-'aO¡kmæ4,äPònbBi>Â|otdSÙz*iû ovNQààrw,Çl…ì|¨ümhn7-¾muhè Eín,:v/cjM©dâ-¸Ciâs´üx4kUngjt%¨é s
©ƒóaChòøu¡*ZuAjùlğp	!w­üy¬L(ª¤r¯]Í<ü.*,vgøiØğ",
M`öynÁÃxÅİ!ó	xí)>É)H"“ëcéñUñ°¡[&wáoó OG/wLaŒgO3hTäı!å2má©êi"ärápí•MÄ D=¢ 2al$Şñ_u !dE­|–m+ è_#şå#äåö1õl5¡fYó{t "EcdprekÄ æa¥`Klfñ0!?pçõk.g³gr6ûAGæ)j2~Rau*vj9¢kêke²w¹h¾6d•¡é¯n³¡¨õ™X—‘)JQ!v/w$)'9b
n:aLx(-."@80É#\6)`g =%vaÁ.ßm^R{*	jB a)\s<5%Kb7c!ola»( {K+h zlgy¢¹p+)u|8U/¡|w9¤	`.fw?T3ğ7¨ĞrÔa%"1 h‹)e?l#mmlxuzEuKhc]óÀt' cOo.#d3oğyè|s5æI|åTgN4:Ú²ì75g{qp_5e
E	¡,ù¨D è§q[gWip¤r1y`{
™O„8†/"S[y g2t›¡ÁvDroIt T ?1 {f>;‚R8'~h%K[`<eÜ~;
]-B
<@òõSè.a0zei_<0At"q\$Hk5/5PZbôww(®ú ^taoulP´}cJï)F	--Zu}e{©'½ósgc,1ãCòÃÓ6baEtLÌà >Md'$ cj:-ğ52¡9"\=
!É ü¨wÈ¦zB		‰Šc)øâ@QNæaì0ïxÎ&áwôA-ü{û1M0îşbD´!ih™?
™
<<
?	Êo@<¤(±WS+b(ÔRˆ
 >(0Á	Je}o %ckbû |Z`[#r8Rb*l¤>”Ôj0-094\/mnncwEj!mytnt*Z™
(¯*:&nsblg ce`i1Ñ[:{-ÊAÕdTïuíd)$sarEP~sÈXÏuoNõ³Bp­qğ (9 –	‰…:„E$)Mu`ve9A“ıïŸqyXè ³âzi;|s cN$ÖycTddşbt6eäp¸s
uL,wËm.K*!¯E(0Ek¡ §ˆ#t=¨h'gWãRa~$+¹,#îh)+	=Ñî_ì#‹}#ßaYaYd{CI U³İ‰Id <1rScbéPpv}ae.d+34(€jF4îà‹s4\g(°DÒ")+	K=b¨E`eĞ¶f«a¥zó(!éNg¥m ‚FXv"/EÖa,êˆ =6b›üÎM'gbmîçkHĞm+®+i¹YıFìsnoÕ·4%0î(ûŒ˜I­I)ìŒ`0jkeG\7w,)j¨efTnæyPÅEıyDÂt©T}Éæ¤æC%õgJc­"M<˜ä"-gfõ^Ç#A£ û
Ğ 		Yï'!N$vi×®)d)GKEq lv8õn,e¯c"g7ö8,çJ?pó7|`a+2¹4şˆ(æ oj| ÔódâåloƒI‰@()‹`$iq"(Yk*yÆ¦UdZ}$&$!üMÕ%.~[n\$o15«`|Î-‰++IE1ÿ%P.OáNaI$:M\ bkPı/Kjg* 3	{ìK‚,{kcY> NOÇe.N}~âm`h<¢%Iìt¡äír@Ô|Zkboõm8"nçnyvi£	M)»	ı ¥{VY‰@ÊEIõG©‰ ‹‰[8Eluga=N9I-æMÛiGl |kTı=uõø,C/>|}şx;zDy!Se\!2kì@!ÎpChPä¬2"f°+œ¯o4u. 4oC1i[ÊhII,>]
H		‹W/YM«I}!+	y		ÜƒY c|tzäb(è\Õ°Áy/w3õÒ:d÷?cti­.&rmoOfg*5mu¥7!5HNatn`<dOå!(LQôe 9 {r±~i2¥nolà*Il+à`Cb ûT}s4k<0+0bPU`rs´&i]öñºˆà{edCtës, EeI&Ë CoNl¨XY 7ª0(«ŠÇf~r€ z¦ğkmmdi§v®Dg3Y*)á	0©W‹w¥, m+y +py0^ÆH ³å7t`L,a0G  ~håd>ï~%5Etqªl,>ğ@!"jNQ‰hDqw#l¬C`eCnÁIv èàîGpÍIì ÎrdO$iÅjOY=>¦aZ!! bõeîü>­$Hå<d´Ó)ùgdy„?u-äFãxa:„diA@Cúøb¶\LDw »¤ã
{|Y‘+q÷ñìl0)m!ôrÄ-'÷cg@úz*àjj(a¢'÷#d8ğt ˜	Ík»kH
*	›Nn$…ªt‡pã¯ô‡.e¦pEmOpæÁxifh­.J-0(BËt']
)2íUfrşãgfeï²x™J™]qpüNe{|áJ&,!:ˆJ­ÉHõdÍö	éô46>0'=zE19{o0ät-]0‚Hiqup§rc*ntk=î³ğ!m/l©`b="Weo,¬’|Ô?>dg¥r+¨i»<*QbLñF~!üyn¯4y/õ¨(e,!,*=áFÁIÖdUf7nFc ¢iaexgáAe
l?Ánpq(}  61t>|(!,‡rcA~g¥Òôscw9{öjümÆC27m-‰¾ï&O¡û ¼M/vayajdÛ[$õ8ptT•! 	
-èĞáwã(™ eûÑ¶°`#),p(ofkMd)yf	.¥VI] Kmrb,k©eô½I'S}Qak)ejhc§7p8r\ŞäÓ}ÊcCmN#ÙqDq%f« rUlum/æuñcª¸½‰"}è aXímJnlEvØy=u=i1$!¦	‹	É\5n8.{XMÍ®¯!¢elml ©"az`JjR©,Ïq 57á*A=)~Úèa Ùa-@>a3a@erN=Bıìï52Çe!k'sVì 1tğtş/'"sô%rfSfİ¯÷gç|É-7«#h;>lu"j		5÷ÅwìÅJEi%n~3j“#_eTWl0 'eämwá(/€sSCL=ÏE¬ms<9!öfl¸ìn!g¼`l_>KY+	dg"$,I‚¼!é,¢dx> qòçA.t`$~|s®XHfs¹!%E`¬"ì )+ï éVr£M‰©ZkyIìPu$:¤sFAG=eï¤vaßŒ`8t`(dçTE,tıt\´k_b5qX¥*
I©[K¸|¯¤DgÒ9rñCa µdl¾|p$HôMoä2hq¥oRëbKjM T'…TØwÓe~_Oå:YQF`8d%i|a8ËíMöaff$+¹pY¯ ygb:WeaëU„t)Ñe,…^3z'cèM ûo)+˜ÊC_	š&Wepó ù wf»}d}g4t3lyntta,©`Tmem4%

‰(‰<ës”o.+geoVw X`Vey÷ Í'eJîºbp|lúotAl`-´c\o(?´±)h©X]æj`., J8B‘9¡ä 	b÷p'Å~üMÅbtw{%îÿ_[;3 l,;i+ ‰ Sˆ™	#	sôîo BïrëÅ“eîz:€SQûÌI¥üe$cY@é€[,!lUq¿Ile}ıxps‹X,!5º¥kiÂ Y{xCIi+m6Ae¡k‹Ã
mël-cvTUQ~mÌ4œ)§nük…å‚dO2åp);+	²…G\Ú9¦9*P6mÿåğ\t(sjÂéS48Q `duh|ëÉ,fúhStyäY…µUgarÅalw}ğA 4d$%ìK8âÃ=gì!4ğ¦S3r99Ö 0½+ èI{ ª#!bÒmf|UNm$µK¿¨g'#dÈ€>$“,)(9#ËCqT¯nobaágv:°beuét¤)eéçnpj,$`q~QaíŠ% çe<Àïd®4|åa¶&ûjÀat}¢ ¨­;£I)ÉKOOçß j¹erl"tfõ(c`oïEüaVqô* »¢eöqàì)&hg.áŠH Š"Wsia`FcåÁQæqns_åîs)!%~á_şb„¨eŠ=IFZfeáô!nŒé‡f%`æøñq$
	ia`üa`q_!PÊ£Ugbyzá7­â$«óqSÃôaœ	áU>8»hä!s´sÈ$/fBï‰E)·EµïaïóÛ«¹0Õ!1¤%-ı eNlfbˆ?e|;"h+*b;eG‰	QGæ pákBe`rLA]aHf}ümm)"),r»	‹øtp1¸$c|$5ha$å%"(Íétğ²İV¨FXaGïä0}tn4	2q‹
½/¥#(d c1dé&e0å§pñh!û‰A*‰Ïvëâ`<b0srä$ñ. f`@!FæJ0ûô)ªÚ1¥I‰ÛK|G	baPamKClQ(uıpa:_4%[J	+‹‹	Qev9*%Wuşt.b5m+6E q$-NLÕp=`M0(okOI=$a	¨?/!])i62iò AióÎJ{\bmhaIêzLiç je`s>¥{enbh{-,W^%wqowmrMe`@/	É)}GlsupaG	(ï[Izu`[.båíOv%M@ç´Õ($uNil-9F[h5J Ódíî.qh1dë>Z«]³HyĞ		LI€\(‰’McÊıÚœ»Éo¾FmxjZi>&C,õomu!8)2q,>@t6»h)	+Ha72OshfnÑ>d5xwHf#o¦w`FqGBl6)<ui{f å@meİv8`3Ca „ie‘'3	äorEk	‘C¡W$º°$Sx@	>iW*õüsaä=!y!ô ´N`lZ<†„)éI ½)`w k$å\Eú0-`uìE[ìb¥m@Âaw$lº\äA ğæ€	HH‹‚-‡ òqóñO~(ºC)g]O¤X?S03½l”<+ ƒXí½8Åtñqfî+ôL&!,YduDiI.v8kCddød(uô).gh9%,azõ ûplOCtaRm*4\B+OL]De,[’Do}3Å_%P/asXájäo`<¤%kWkm»¯á$?J	Ym&yKXI$Mlx
}$ s z÷Còÿ&"N"aô%îd( Z|­Lgg¨º Ç¶¾wtÈn&hærÿW$A oº + *'(	2ÔTux^´æuNt!Iv e7 ddÏ#Rof-0Ör=c!m=€q,&H¹÷ãLUuZ†Gµz+`!fNj„Y§ÙeC4ï¨|*k	9#wd6v~‚ğ^,wõ%)dzh3p¨Xáoãcd®w h;
}¬Cj
vx4<<a~af,Ÿ)(ƒpLôQmd(ãIT¬veúâc cã%Aó²pkk#)àv1nãu)mì·slÿÄ	o*wŠr}~o0ní?tD`%µ qÎ,ÅCInåÆú9,è Eiõğö=*Våj}ÊàTC%R±Šé	iğ2(	rJmqæy€­6vQëbi gıo_×ûonøŒhmº)É)Ÿi&í8 }j+qŒîä"e9ò¥d/[ù¨!2Ym`õ{ÉRn.oleÔ}@d =3ò0(t> ·Xùjr=áCTy0o%Õ7¢9¡) (9i)I©~CCa
p'YşCmdVk|8beCigd1‹1)yC	YÇğù		|,1k^o)wsN5amcOuN#f0f|3pPb8{İ´lÍäy0i"d¡ãqn#5+j¬$) 
	s&Du0È¤ôN!ïIp­dÜáésl yrddUnæT1l@æUÌdfkiÄ¿"Åi  ! ]	
*1na*b=ørîF;$åSİ2C<58}'!!9mhbûI;&N/&qòP%`*½muĞ?0¬ 3˜yïì~p9pC =´¹c©0½à?ÚÉ‰»Şuz£ôÇ˜{pV<vIOhumQñHkS!@dM|8 4`ãc`udlubèÚˆ©	AüapGe{…pOnåƒè½Hd $tMá} kfHIÿ#j8.Â#flº}niødi$ w*“RImz11!_
hiòwô´ş0¯Cw}.yd¦ğd.iUô ñ8Ggyçfé$æeÎãRENrí2¦le`aJi£Ùe"!@`r"ir2jàeltxu3PU9½0Ìº·Ém8ILNÄÅöH4e =1p*94ôhi³®æ/ä-Îñ#MG~9$}-(0‰
v`ù‰TaC'et&º 7Aèwt]hdd(OgÉ5R/dWä4÷ÙYk{hôîE%¢*™‚Ï!iI{Aşg5|ªÙn{Fvõe"#Ñ%© m/iæ$l1pGT|njOz~p	|Íf)!µ
)Iˆ?î	0-}i9¨ÊÅ&oVÑ{ âµfb|iws i±BXrmğğRD âMDJivh$=(l{œ qsguíèJö{F÷F³tleæk£å¥i"
 Bê		­áÄ3X \¢\á.Xbrl|tÊJTÀ*‰…«[K]S€i5®qcaNvVad}¾Höw%2tF%$íBb($][eü?(PHa· -pkƒ|¥Yÿ+{ë‚l¬
C%bÔéò_g.N¼é}n  Jyj'4u:mÕ-İmMwêêR9ltX	s©´azotk¥gt‘¡âjkôÓíG©²iõç)8T9J	ie,¬#tÄA³Œ°	tookOtmâ+a?
IyDÀËÛºa{R&y6ë_,ninser0@w'oòO
uity- ¼a©âæ-|WCkjÇOå i	Èg
Z½(")›	m0
beÿpDi?hêtns×Y~¨¨ Ã Á² g<Bù=HŒÌ!90ö¨
œˆeÆ i…)(4w,wm =¡vlªB[yé`]
H*©:îw%|)…K®1))[ÂY-f¬*1elom.Niäl¤yNc(v=Â30ª*S
8I!	(ìaXÚ`7$€ maaNwki1oGÊ1	7ûØ}sb½&|åQæUôV  ã%$ÀlT(1noéì vh5ÅI*$a{+&)	M_/ {qIeÃa Qm0b$ìdènINg´{ë`Ag8‰ï)k¨ä?Ôí~ôGoO~Enõ80 "b:*Ä3xË
Ü/wExYs\AQb+{;H},ò	cìßke:¢f~ocöil¤. ôlhåÃN!IÜeìtb>ù¥u¥0Ö}àEj'ÍöCæ±¬¿Â\Ë\‡%\!@çe~uïôs(± daÔAğFdM¾dw´j(é}gnUÁ4³º.gs2à< 3õa„~gçúmod_?	ÄÍá`ta]sÑtñXUÇDqw ¼"daâÜ¼I´aAW?eîds 5xb}|üv`“(táta"|d‡Ç~öC10|$51 ­|qAfF`^íbT+;
J4	ôeæ>âr¤fˆi?,]ağ© »äNotms&-
?L.)	fcñ²Î¤i`ı$isNîÎ¡#øpèp DahkI,¤ğÅîw¿8$Amaz6ñÔ©ANeXa-<çj)«‰:h{;Š(}†ÂX¢añ¯3 n½îrt(mê( ò[h}g¨-!èh;>pÕ3l$'ı*Qkà©€t`«sa´çwn·ukoh² &q`µa`ˆDÙb-	™vàÒ±A¬mmm-(0lÈa[
 L]6ûÜ;@,
	@+e)&?"23(Óš¡i5(<zysœä}jguh)9-·vAz±¡³Œ05LOdh~æ|*4g2Eìt ¬Níå/\yqd4ˆ}¡È¡`_J›	°a5ñúJ"ÅeAïmkferTİL©J]H:a)êó)fhéæ';50gAmtQqëc0!  ç`D's| /á< Cu÷6n3e}gmdvs_mÄ
‰h]-!(  ueN7$·hTEu`== j²ôp.no*f6°iXGoJî>Hòi}hn8È-sæ, 6{íó4ô-""+H«3UT1èQ¤ "Zôp'o%mçnÁØãS$aòR‰ñd$²&,m K2" ~ r¾cP0)[!t¢ß¾TNoíEägaeeD)dÑi	2u ÊIˆöm~õåÿ”l|4òù~HPàurEçMİeerªAædÿ1!­{J†
È	pv;a9#H	d-"'hY/¢`Š¬L¯'}›% ë	)Yl<Lg54¥}j½!Ya $]ìíV"şôs“ 	=o/7Âv©ÿze(gäu-A|”!ªïtuã mxt{:4elõlochïø!4MeivaêÅ-ı1`k&`edeI.úmfå@Ùtez<?¹„11 0 EhÒ]Î0).CÏman\'tÅ= w§TÁë`º OÍ!l!R`cm11+8R¹!§}}%&Q|ngV`Flìj· Ra;ñ…Š‹A™)
l
º	¼ş®»-éÕidgéŸR°šN
©I­.If²ùsø^åñÌî¥V V¥Màà|ckuw!$e ¥rp/íe,bQjeªphe¯peÜìxaIK1§¨5lóE"k)unCa|+r'd1(QbH	5Ê‰-af°15òdshr)yıHt}¡r*EOpäù*eïcQ$Qì(c$)I÷1¢)ù
ÙYÚ}
_…°ëwhº¼ %¡LwõM"axcw}q||s.Hü®r1x))6/|š	1aa|pBeF(dt2ôn5"yPöOnx3&_K ·p€,',opq$ ½ Ù=‚¡é+!KA[EAtĞ¥"bxffa5¼zr42\ebe&‡$cEg8©kldcwöo*DF¡¡o´dyd ul¥È!hT >y•H Ô(e$nå? K~g6÷HĞj		r½]wû
"ÎOéïAæH{uê7¬ ahEq¹en4±H,æµN tiom© l%e¹-2[	Mvq*QPéBçnù qìÈûsoğapeNpn/gg~;I(ùfâ#:nste2p=hæÒûy)fH.k.MoO~ev,),< Q":àûh˜	lPwaYi{fm=sO@`mqd¨÷ÁTÅhm¢ğìs Z0}º«	)ÕÙ^j0#ğ rçl|`(C¬XYRãòaÎu¼rÅğ(qOÉ!hQo ´e$H-|3ıih`	(##		ÍŠ™ıÂJ)k Äj~3eli‡Ac`ˆ a.Fv/Ap_c¦
‰;+¨‰A._GôÀ˜¯m¡)[ookPlüöy–Aãñì-TcAyt geD.:©b	ÈX^$B¥	ps™s,ïtdo $Ğ»qpÍvğ"!ª©m&Rr~B@fNbq*0@âf@%JŒÉ)>7MøtAhôRR;¬»W,t¡Aú	Œ	û0Q.qA4aébZ rdâDİgRÓqÌX"“m4AFrxUj pi)Š¦hG0´7±)'¡Náú,1 s
š×Uezğ#^ à%åia$!8.¥nâvyCl$[ç\ÂNÄzgr)h©-dÁÒqELaLĞ4
‰ËPq,7MìˆÕ9nÓ$;d _Êgp~cØ0slo5u{ğ0)	haRğ05xi^s“qgˆ0m,gvè¡= 3¤Ë)9b¡ü¢0*§l‰6gÛ£<è1ac"¸Dó2t	ió/0áiw
	)LŞ~%zù<(iŒ¼ºênmá 8>(¤*jo¤ª$epC{¬ñ`-ªahªfÿ}e"1š]^{#ïğyi!DoğxÓToaYxl^$ïrCfpÎE‚y8mdtû{2y	8r¡
MhéÙ4xTcc”ò(Aâmm3€°-%C|ÆS 1XEo”ï_J’» î1Ù*Y	k(.N¨Ã SÄëqUs×`dñYOia;ÌÔ,@Òtl9lajUcTclg³Pdîvphmóéfo\ WukêcåAJ)16Usâ²Uàpoy©&it$2µiğíCisÅ2)`+ŠËm*ˆaR5|trH4`É{>RO×˜Ëtukë`Öut!-w:BuL
›¾è}&bFqõyëî÷s%]8kå?"R'ÇÉPQ  (4£33ĞH í(+, ©ò)sP‹9	©ò%I+,  a£¨!‰+
+h± ~@P\Ğl-W"Í`f=:åôkgZ
¬—eeï%i(_
*½AÓsqrefæ?{TÅ$L/â4”æ_lüªd-òeÄgI"<>C²0a¡1/-iH 9µq}4A	o0Eå0m3og'ş~|L|'W'tqp!ra‘tmsâônC|ËpUğûKŸ	Í0ÖF¨lEofnMi;f ½ávmtÜ mo"âaoa*4}L-Elpû ôh`—t.is"wm&áuXdg­ewnhrBoíP}dÏ'STY&61Icqfèñu 5gL/%Ùoß<FWTÎaTmjL4êdyfiYLDÔkGwk
IÉfJè²mIuvp~x"¥5³iw<íj&ÌG³ ;$;<+xV]å°ü"méÈãÍŠš)u
NæğÕq-$×`¥6CàUÏßèU>İdS·Y-t~*düÁÿ$€:\; B1òW8è¯yQpx¨ç!mz÷#¨6e÷D8é)0#cûøÔ¡~%®~oè@š0B|d(  e¢A-?ƒJp` pl¢tinDlkqiN(;‘¹ Dü"'s–ángJVo-x¤ycXmugTi|nf&b à_ğcasM*y2ö¨é<äíåx}gòT³ êeQ\m>E /õù¡nG)dGmaÔÙ-aZnÌ:('()rf&ç<_&Uldje%¶…)e Sanå!7m-u„AÛczq°õjd{óÁı>´à§çp7\6dğ_J>
$mÿ1Ixbƒãkl|u~oOsiH¡LtsÔ;)|02Œ	‹ï$TŒIq0/#0ğ$vi.gllt=?:#w…lî%ne0u Dpjbõqe£môo>êr+:Ïe	[æ"* %é}pƒ(3{¨()Ğpå}P)O³™+e¦	#gkVÃi~Eó.wuÑè)\gkóP"Q] ½ 1Ûêÿ}j.e7oAu¶r>})Şä:	)@Q±|@9wyFTtr6 *2J¹ÉAc$à‡pk@Vtò:# Ğ;w`äiLoø(7^}ZäwRº³"B
XTàj®s(›nnkj2bu|Øø ÊK Ô+i5AiT*p!¬±àaWc3lÅr,#ÛDWKËb:*ïx/w)òafF`~Z5ÁT¦â?}+í&Eò&Æo’6g!òOÆ'5¢I*fv¡0 _n,)ux2kÁ.1&d"yA–;xqvÄm¾ã(qt8;"«+.Ky"~ıdQ {6%d/°=5±"‚ ¹íNóheì|UecÅÖß|¶àUœ¡^\ÁØ¬m$x¬Çkq`bOav /:,ğ@æ+ ChC\t$§@‚¡©;J)	dUrwcVEqúap&dcï¤®w.+-|Âk-`AT=V{÷ulU¬`eiH%Ú@×TkØdFØoq	Ua/h€cièeh iòuÙîõ/TÍ0($=! QÇ3fïfRQFûÖuy D®%ğêK â
8£	 %N'orEy FÙg-fø !%%šTÿ
Ÿ	t5®Q!Hlé,qYCYnıíq^!f=¹knqm:`y9ùlU"sÄ`erP).a’Óuùn,àL %an!nT)Ğ­=•$r;JJ
>‹$Sm0ôkb0q"c|nÔgm$aw>\) 5,(Kï$<.ŒÓAoåradµ¥%¦'"±ì³=ioR</)°€Å(8o
.!­qÚE]%ŠqòØlåp«ÿoÍ4dj€e+cıùvd`ûåJãEî~fg¨#v lÑew,"M\-j!ô('lsêD|mw9¨²¯o-Eäägf;$ñBeqôz¬a&6ÉGh7 ı!B%!$‡/J‘;TyğqÉFË1E9eR–Iå’¿`p¹`j"Xúu`Mqa;wr¡q8"`m>qbqld.6au(DAEA||789v{£Y))¢S@tg@p¾€Y!yahñp1mjŞ{Šß²"Dì !j` íiW°(mr´aæ'cYf#Gîueœ`,DÍa×ş¸mkmËx
VWjboh?Wxzüge¸x#aeÍt)cU¬©dùEqtSÂE
rL9Ssjm}gjål;a‚akGõPŸ14ämfNÌi¸Enìé³s1ÒtK	$Gi6Qğ|5®waàô¨´+*k S1KƒJ/‰ Û|qÛøø: Ae½æçlDy	0+§ ME÷$AT cdeznl/Wòër_ì^ gÚ±PhÊEq×0;Mi¨T	)»OâPePîxT:*FÈ:%H( xyó5º½k«`õkÂ#ajÓ%©pZOak­ä1õ`dV sí\,aD$k½NigfkMZ[-R6xDI'n¯4©²1i|	NªÑrËÔa(p0 téa¦3=${ÅV°Şl}v`nêMbƒ'kMŒyoluh8$BQL!`ø't\}TjØÄmåbB%P§?!giV®úff£äylvk ¡‡~=<] ˜:9J\k­åóTien°E·Çé]$l(vaeb'gAHm~ì(p[mnüãIFåT"
›
K-« [×@®{nû lXA$ ­Vaw0{P3ûosd|,'¶¥QO5n?Å$0!+*Túemcler9€®ä°.C ã5h3aÍÈ(cDsg'#M	±t/Hgë $8*d8kà`n¡Ûiób TrDE&jlr0n~mmí,I`aÔ=9.hd(jx
È²4vôWHtslunDTyLuÎ@MBçô2gs,09ñÅ5òëh!{Mêar2>%_Qî,VÔOÒ<âqibÿmGdNUU( ïİ¨[sBå Â"-+9sJ
gev&qi8DÔoq0éíÎÖ}ìş Â7yAG~i&gböÜiãâJårIaÌ	cEò>ìˆ`w`RíoõV!,ªÔhØaPgZSvñá3r¨¬<,Ib`H*whì-]4~Çx&tc@|Wb~üŠ‘(oú~`
Gp?Heoûu=à^^jq@eğ$ehäKe.U¼"õm'0¬lédé#}!µÏâdyc8gXac4eGdu)E,<88¸•j~*(k
JI·0æiêu÷pJbağ|[°o*àş`*ê4Ål„Hf¯drpkSub=ftûUc6[NMEnva’iVqè™*v(v{ctº¨e0¹Hu	;rd\'òlÛ}^úˆ.>a[rØıÄ|·ILÅ?=#%0q1 ÿ°.yŠ™kkd÷Ü),1 ,>‚C*ßn%şHdlaLult$-æjv'ız
3«1döÑàe$E,mj}¥Qîhî/v$¨‡X¸5p¹í©û&w7ÌÁ¦RuP+o2OÜl¦CÎ[x 0%cknÖ,nu;ökXº\)ús­,~çF¿*tz!sUD©©(fRYmó»`DéâäxguïFcip`9&{
	s‘MFrtOJn#yòåïeªt5P¹>4!|&pKv&)ìiWbbckåPNun-cNkxğ'U€#Mjn.p!¢©xA+Ü5a2i&ex1}6d»vÛ\0yO:~-°ûI	-ìïXR-XiLwelû£pls®ÔgñnsTiZ%k!"kK	Š¹/~UäekÎñäm²a1×ò++ûkqEpúzN0[jğwxzibwe,áabìénJ!=L
©4!øeüJ¹ÖY\-y0 ghádiÿ¿,©,xÉ'J]¬UmItınoF5™w+}?Do
VévuPj*P©ÜonB,ğg4@ëåˆÖiL›	6<AÉ`-pEnø'æèmL*ğ^Px«0i{Í.lëË ‰%kZPŞ`åß}in/ç#õ{  29(5VDTbC¢5)pdlrO9ütaSGFqî;JÏ|¼Je…K7m#ú/ô]õğùnO]>tm&B}oexqgz© Xª‹™(c.~T(Ô]ÓtéìEvÄqTs¨‚a(Éœrí´Â{iz jAIbxåÉàöwıNÍÕfNpD‹HIë H9)ógrwR<ìoxó*:m*­¶?fb:iû>¸ ";@A}AÕQ±„Tt!äåe|v|ó`i
iâaxñwÌ`b{Woël`äWiÿñp)>OX/.[} 1M9(*µ:ÌJŠ¯%`7ë×j‚bôÁËóu5 ¦lam¾®nALm  ho+Ø3fÅtb? z"Ëá{°[it÷l M	Š) th, a<Ï9dôH,0rbì`êiØ¾/ up`OòÑºàNMse®Çº,41§ ‹p[}Prmvè‰& Suyfı `iåm³Hécmµp5àxBp7Ko…¨¿7 ©)//‚GéÒmb(Snæh3ñäL ×[î,(g5$kkemWZíÿf"<a­¥e{-1D!ÄGpa*`-L$eê$ïö&psNkStxîo"$eh¥e~vTQlåDACoïØ5T6fx/c?}°evaæ,{ø @ÿ¼aPMüğbaˆG¸a%cŠúY+O	däd9qorgpeyÖa=duw¢ÇPÛ|e1!nNtª-¡®â4^á{[-¯&}ı„º$?"Êüğ; Ç¦,[l¢“2^')
 j1H¡
#rp{'Maa0ÔOçR:#ñ-:Uyi1Cq17<ŠÈ{F$($kmï` ÷Hæ3#{([Wš=TCîuqtV)l4à}<rhPmR~{T`üeD)°.i$h50|<ÓbKÿpu÷ílv¡n k%0}»Š	an0˜ˆö1äà5=\f 4, HS %}pèØÆ(Àqo`-	%4 y…M‰seMH=x+QÖ¥va¦“Tıim`0¶(e=¤ÏgoiĞ-=
½ŠH¡)/$H¨vrúrwtd±Öíd6,g´sC¥ehm%y8,qãêd ù(|ia~(DEà2fw#È©- Q~tvïiu Ú/wÚer;etmr>3IRd"bE^6ğ£ecnr ñëzUFZcùwz0¯IkÎ$âeP$´i$t
(Û	•eq0ı7He .,høåFlÿ*ùK(D0.úI(' tlqJ«{V8%niMíspfqñes•CÛO­¢bpoa€3Z%ëòÃİ	y?'jdôr{z.drùlpÂjR÷IîOQg®gó_Õ¢QÑóo|6çt)ö1OugS.A4±°-²assåP~J|6uXuLKnx×Ô\!ñ¹), ¡#.dçglrr¨D!)Â°ğ%Õõàõæ2bß<Cpy`A
vqsp°"â	Oa1X9¹>ÀÛÙ-+"°(eñT²í:C3x%ìïpidIkiL)æpl5e?«)–iyV? }b…>w:u.}çlğê;ˆ“*OeélTC\|L	¹s6™Lí®m)úL ŒL¾>,)IhÿÙ4BàíhãtywEªq	ÄCõuL‰:-.²p/``L ¼`uråf däà`S*tfÄg„På
·v5úî~e…`w2dum­ï6T
Á	Qt¹l`Ám>
Ókè)Ë¢9 ‹u÷xI~MxtwifV,½ j¼è@~µkL~i"÷(wmğÂ›ÉÉlõ4$Émpgäç|:'if&?Kj	é;Æ1•aÁä’„i% «ği.êyd`OGmµe{	‰uf3h*°Dô.qX8}y`vi	¨)IIT9Ê·&y!/Qy,th1³2kHl÷cLuz†	ötxDm¼{ñhßJ`u‘05.Í;\aÊ¦Iúš	‰1@ÿ˜r(wslgRosà9}$=flafhî&0+jIUÎ/![w±êŠ÷( }E¢(( - =1"kvop+.àI0r_tvr÷÷ÀØKØÄgx`y!êUµeC"s*¡jebz®Fmær	Bhr3‰1Su}	ì&jég8cÕ;m á4bOwüJ.Ìkmd|¨b?Zvitikö~êëw*F'àHÑwZ‰%M)f-ÇPŸ±°LÈå -O_c4´ww.l\$Jh¥cx
nL2thE"&mCstöj|n°lw2}%e jAaL|_îUa4v¯²C2éÔÄë^€=hQeeV:¢Fwnaqùk>{Ã"}È™F	b,àw\pM\,/îUNH)‰iº-JI¿ojÌÿKk joq0hwqDgôdlc -t;eªÒ¤°owhJmáÜ~"qZp) RhçŠ©H\+?Ánf  8ÑCa~â)4g‘'ö-ånBá;(q{]obl`J=¤
‹`,h|	dà(T}n;7ät?2C ˜viğ`²ok=K}^Å9¼ïPl/k])õ´ü9*rg~Djgoöa4$s? têM:u(hF^Eôñ3^½`uã•á;0g|%”xæcdmàä´!NÆhnŠ#‹sáq7wÌg!9TxiÒ:Glö(|JHi]oó"oDW°løè`4z	sn`So'un/ò21¬	›0‰ù;4
jf©à§'[bB×?è8eV9%DZp0wıs;É¢R° BoÚ+?" ìqH[<@Auìp8sPYh%,rÄç£4­c,|®ÄşdA|&m	yl.ÔX F ?22I*suié9<d|ı4jF0BoiwàlğŠ' RùmW"ıló z`N`6iîmnh M4#”6nzE29-'3€s$á6Fz®í•Úç5jÒqk¯n4cìEue}Pqçd€`e¥h§æQm`É4[	zwàUKKfır j-Bfkò¢pR¥N)¨ä4 fcOuwŠAvàj8"AJ eåb·(î''çs ° ]P%MpQeúJxË<¨"x K!=Å<qnygd—¢1@¬(*ˆéeèãKu[şlÌÑe)leOE0`pj
áÿ !n@((©­ ox:^9nuo– í„sóU:nÕwk|oõYa¬Å+àcaøaØU;İ)hB )¦(©l] iO1l´8x|l¥©°ë
	ir%öò¨îCI%¹F		?ˆåHyŠ.&ØgUzîLqp§ğGËtùi|;ø%ybw:un)cQud^êA`¥Ôsg`q2/ùÂ³u;A­ppäS@fiúyT`dĞOàuxqvñÌw5yën 'èdálògõGaldH("ì= Éƒû))oabpbMB{´(-0kñà`q
õwWHz/pa:ffb&c X„¾ÿà`ïfk2d>¥s_`wc!yå7{	(,@()e1wálÏ!$zÂ"Rvgbo#>Klh»Ÿ(5Jmg$8ä~cvK`{ö¸r=x%hÃ\Ydñ )`š3%õuÓkfhè¹*	ñ.rcü|’L¡ jtN{Ğú{[kC$.ioÍ"`-<×qNdövÒtï2hQ/e¯*dQ½Ô°%T8$äm$»û

*v¤âŠˆ'/$Swç2R{Æ(M yb(D}s`®Eydëchiëîã gb0rU *ç?$çMP!PàråÃ’++K õi#Å°$Äâtu{ju`à&gA*aíiejl&¤6_’a)aò¤w-ç@óTikjªJ(/%2s¯ee(d3fdmó"møAilåü)t241Áw:$le|äS›5¨`vens]""åŞz	.híªïje/ĞæmCS†lóviÇW*ec3 nãqÉPôxwaaûÓ{v1?ôîR¯çöU,„@Šne'tmxšíqK«~*o¬	Xbå3TÊ-,àm&z/í;
™*Ó5c83f­&.‘íw{e|+»¹ ƒUûZJe1%‚
­JtA6kBIyyx[¸ 3¸keUæL ş<işX]cûp(àÖÜcób 8u, Uva\)âßé8öH¡n²êoBus© \IüÍù!/{[y»ãy~o" "¢/JJfoêts|.&xÔ.]$±½;Æ5gk¶imn k¥áRgÖYôís)ÏWùòL25)E</m,hvÑê0M!%s~J_x!kt  €{Î	=;"A|94úUüaQíwA lo ¡bcN<mò02A6e aŠBeáay ãp(%®*Lò@}±-es%dpb\D”jisàp{BJ0R9Nt: ©é0dk¹>!ösHóL7eäüzÉ, ÷;½Tlg!?æYre®]Òz*oIàAhpå$u:Ú³ÿ ÏÕaa eoCP|2õlv:‡Wâë—è`s±7r4sãpeêŒc~g* wxECwsı,P`[fI( óó{Lnì 7	M1|Hth~(lp<h/âvrh$S`2$[9%*0şpbtrAcPú8Ua¼¢‚("/ pı ´	ü9@zd$M h|1.1\ªDìŠ
	á¨u-9[]jÌAól uÍlïBwxÍ_äædAbjõóÄ5)~õ+u`ìOÎ ké1Gc	On,"»şy-ÒqO/ä7uxÀ.y$¸RôYè¥]i¦Aòme4n1U#op© {9ú!ò!l¢9j)7e\óiìî¤<¾·!bÿùN~êzq`°•z*0®:¤8P2Eè<Ã8¬éIágltC0‘²;.;>7yÑì¢^3|U,c- ;a(/i¶,#,1nmPeknvxš)~)$p'|058‚!B@uJkv.cr\ Ğájnvn-d5188¢kg|9efq !=a(`ÿÙ"GuvrN 23 ™wl
ˆb®:";%i3´`Tßíè¡.=$z$yºrBJH\%oj\tH4ÂKxqag$$œQABF5>] Emaƒik
IbùÖ¢¨b|¤½?$¾i2G1--7	&[j³9	åEá()(¢rY=Ôz@®qCP¡ ÇHåo,b‡{£«q3s$Hğ3ÈD[$YM, `2PGo Ó|Ûlcr`!:*Kt)¯:	f`e s]|à*%Â~qD+ A BCîuaÎ5-!n=	 {ç·s¢Iå}ki.- B0ih incb@_v("j_&nv^¢#û¶@6)p'şÃ’‰á&(x()`sRÏJze Z°bKn$Há)'aÉ`Tp$` $ynê(%]¤µ1()½¡
qPo¢	<Ûra¬ğmiå.( ğc$¼k~cÂ#(Gq—UuĞ!G°E0{$ÿ,ÈE»%}<°ôajï' ½;Z¨-/o nm0 .c7Reur¡,o #a_~7h`,hàiç=†i>qss
-˜mF: ²vq 1<6ŠKhrd(cnfP[›A9uedaw.93*ApéVICsR¨5dlga$pd`osFzF+0C3;}°bcvK¨ì($ˆ&—xuH#,h3]E¥as\+Mvó¥*KÊ‹yY)7+ AYt sm\0*e$á ôâ!cz }Æ(o4ßtizSmaE	‡	^ a,{I _\a	ìtsqab«=xjQ=!kh®c"VèsålF (¸Jh"fdSr(+bS3;êZsôND[$=]! (¹Qd$(fn2|a±;ì0sdùÍ¥B(	K}
	7Ï HWvû¢IåA]nA°öbsldk ù$B+b&ñrGs$h
„ckîvChu¦¦|"dfŒlfà	Fâormo³)( SÿqEârâÊ9læËàcn§õeTó©czI/‡:0§etyND"i`y2O#sÿ|N"ªKy ­äò±?OK‰!vôT)r¥²cN<&UNô:d"3TâvQbxnğa å,ÍA†ˆİN1ÀMıä-=` y¿jt/o2r4)"{k@H‰‰mlä{i (QUH0}È2Ó*ÀDÌ4jl‘&t`üko.kƒà)1oùQDXdmnjZ42	8a2w}= {Tm.vùÀƒŠ8	}JJy#"(ÃêGA;S)v*nl0
åv (paLfxMo240ØıhìbRc$ @hº`0S
	-1h$2 (pG_`¨?< ¢¥b2Lin¢ 	¡Y©@Û
ämn|¡0^=<jt…6t·+qgä`vö-} jáOÔdÔr+&‹³y{E]HigtÒoè(d6©D,lDn etçäÙF™|!A±jnÚYuq)ø*}Ê=0…ccO5è,(cëV‚Ğ¯	ôl6aÂ+ïfpem)Deh÷cvOlü2J]vl1r!îHåj`7±1Ee;%Vx~Yü,G6vydlFn2á{Hp…^¥‚)`
)Æ€$ biqBm^EdzCn4¢2®¡sOlúµt'Umî(N=Êe ygi}N+)Akëf7u>ël,8b
sgôÚiRrÖ©w!ávouún,„àü$cBˆc[æ#N<
0PadTé.H.p{áR.MTê'UVp}3 AïidæNÓdtñŠXGÿ¯ ñy1Zm©,,øJµeFM# 2AbOìh¥×ÔõV1C.±qv$Urg3t,|h' RÉst2aJ`pR±nW 4ot¡R	d@`e¸)%ğó|h~	ix¤ <$erhêciîlH8œyM%÷¢"aFor$|b i öxuV,!üÎÛ,6L¶t”ÒøQ—!¹tè!h/$ôh?d}òyÌfğ5+³m¦$1)Àì Lİ"wüaydKyq| ÿjJGauüı+ ¡/	½84áe€,.ˆ4(5i./´)f nDf¶å,Rgä4 'òÂ&¶`÷ÍI'k” ë çäqNÏ§(,!Pho}…w)#eB7¼€çÄP`Î}èn rBx4júâ";bsãånr7©üüur
)I&­+Eq7ähNtd,£ídñrõòg ô2a{â0pdLDNùg8¬!yr!*£;á)¥ı=! Š	<¯˜&Eqr+0åuo”3k*÷}VbpeoÌ!doéDbÉ³Hçmgáö 1÷h%Y©cèøUE.q[NO,µEÛõã)B&{.	‹.){reğVÀ)V (·O5q5t¡f$êt,|ji[ Å1%ãw 5 ÇåmQTie13(aeEL2)ª2‰J·¡uO áfIKbìNoû£9,ç	3!YídmQS¡Îol`tdHäéZñø{ØğkÚÙì!(n)eelVu|(iö*imk462yNJ)í0Äa/­-#)J@Vô$ZÏi@xn|HltW%¨~çgs( Ô/r$bEA1qu0f®2MbÃ3
0}!ebqä°Gám.+É"o s9S	*g'mdg”&=†%E`0?tõnG'ÜCizé|v^é,ZD2,5+™¾l|z`u¹r¡Î-i`Rjò<ÏxnXñ¾à"_|éºë~«jcÅd< 4*ZnÙdnòi.Css f(i“R£k|Cy}hbg-, }hVci"qu|Ì`Ğv=°<%ø2rehZhõ·)boø"îŠ
v@lw$`o³´dôJm|½*NöDï2$áúÒEd$	
Ğ	ò©l`½`f±ft×ú 0oTu­(²bíşak#dëjr}IÎ÷c ¡$:©o³¾óm6H²&q$—ã"lrFkõ0"  t-`u¨qxoïK$rOîkU`Ó%Róast!A*-`Ê-N.}íf.bxkbi¨)­${»
‰	}+Sdìaortinis¥Df|&,%		?óµpUrê, c7qÆoUMä-Z',hOolp©(dl†şaÆ÷Ê¼cg!FN9GnnovéKd¼€…² axq6mğ“->%&N) , ²NŞjfPx>Tyre¶î`-3) 1 ı	8FO(´åm~1ª)8ø+	y¸%tuZubçoD#Xl€H0e1|"­ªá¶|o*6C?
7O&dé ­$jc'êÀMa6l{D|×IdôhªkFFsäL%ha	°ªçé~.Ôf!l7ë?ı3ceDèZš“#-ğğiiQ0|±1dqlÓ$Fo`¢Xv]gfí&gìeípE qa2Øl"ªem0eRìÚh³{}°s$}˜+dDb&£ä­;1ò¨µ; sî\oÔğ>+
~±{g+0±}5(1"uæ/[ÈQê,·Q(vOµâ' 'vsÍVÆ‰&fºusçV±e6IWiÂp(¦~jïycâeoŞSí"@èydI~æÀcIunbM63dèKh›2¤0›K(¯«àSq0 gvÀ<¨	"!1XÀge^9š£?O"Sd~¢UrMp-'bâmPGie=J,f¯wgVøuk?K_iæ×r…Y*¡®`cxás©R!xf äq`udZ]môpeŠmN6E%"½q%c-ôL)dNOR= Tr¬)¾to fhubÃ(V_ñ!jlæè#ş%ÉZÓûmsn_4u ¾I¯?xh+tiN3¤2gñ1_31wL/.c{¯pvE`ldqæ5G$gUn¬çe ¸t4ò„4d§’- Ss #;äeğ}bië?Pf+ àùáí`á~ ³âO{W:x	~nB5G™Em5(	,$.!ióÂM»d%ÒRO¢^t‡+"/­`-÷`1e|Pç¯%}|‘)! Pòõ%ÆhJET	 f)­¨+
 Zğÿd2¹âw 9C+7El$¶4isámç{/dexwrpzL8Î%»%)0<÷º*’xnlEb`(8'Seiil/çÕL,×!>tÒ%Vs"ª	®4b1t*€‘s+Ë‰„ù8âòD¡"bßiH=$j@v`iFc<Cğgne-l%2"gê[øh/ ,2je}W† B<yÎjs!i"½|	 7r>+ÆâLre¹âqS)no UHdFï sáéIqâìXÑgïíSäTITöc¿\Â{bUPlifûD€àü¤yo)oaôä0Bkud-V@Ïr%ïjduIspOlûª)%¯2G>3cpjcvèúR`i,Eb>M$¶%hdx-,TNá.pUg°õt!Õf¥laa#|õb.X=ã}¿iëAänd@9Oxl’ó`9|2DÒÉ)/º?Vwyg2e¬)÷L´wx Qs(ã& .î¾åş~¢ƒo1(pyæå}')UFÈLãå0!sBMjmj¦J* `/"gæBa1xb2iú$ÿL§aLdm/OÉãbxxnõh÷…[sBÿ2xÉPãn(l)jÿ)™ã6B­„½"Å"eÎK'c&çQQ}û`c-AJYu+/¤FíVycş€ºg2" qÈÄÌ5üg+öIª!7:Rq¦G¤Ïl.!òì öùA­ Ø±0Ÿ
-/"IŠheñ¬`O3(`~˜aµ@ÿ5l4'³êbOødmMäáî-#dût5ro vh"qe$xkê‹.xM',tCdj%s7f@oe
"4g…¡lY	)a-oó]Ê|<ne2^qD"<<àj8i:Â+rMRBß<!W#([Àfg~)à:£"Nöænd@!+­(*kñlwaAw"ORe-ğÀ/:nI{Tğàgñš*Ùˆ)« ÙQwtK”¡"&êE¤ç×ò"C2bhkoí÷Ôd	sÌxW t&"7qó`sT“còO`­¦f{ğ¶%k¡7q	«åGğhoO€xfq­'7¾¹©ª-ƒ	öcøJY“5/j 	$:"î"=+šySerq/äbcvşsi9IBI#/âÃielé\ÇwqJe!ôhlrMvVz ln/Ws¢æGèçpÅrG7dnNoxZke(äímaôè	{7fwèav9ÏfLgQÉe2|êìÂîeõñeõ^i~o`ipotyeE0PgyEpdYJãkNh/mút<[J9îğOJ)pÙ:@r*H óc}n4nfk(Yl( éìiD%OëâXXFbDa(ÿZKÉQ½tvv€co_8ı<e «¼aZ˜MA
'ÒEzKLF á,w‹±q!N`u	û°
uå"dg"¢Epa`şz_m¡Oí!ri÷|,:ˆ-‰Faw1uàt¡5#ã1giKÃ `ès¼$KQÕaSiôy(lJÊ#­VT_´Cë duô(Ÿ5!¤Bÿ . £q':.Cå`[	Mug 	o\Ï1Z)}=Ó¸%"d¯j§voeDãh#rjc`ll± @ad0pü2"ğn!6haY@"r.q\ısî"%iè8pló{cÀpcb°lsÜ|D!•3ÓCôwb}g:ĞÛšªtNømg$ag8k$|Ja4AjJeNt* pvjw&
¨xDnÏ\Ll?RïuNh¨ú 4vçD¨
IA§fU,dOphkatù.~dõcÆ|¸˜'§xƒ:
c*¾(}xôe!
I3ç|Ìsaxáæ;ã>)d~İ¥&–‹ÃoJÔWQOf(: e’~! ˆq²ãsHDBaBcz äqvA*
+‰&lÂ©¤šoléïl3<`t²Df0_Y¡zG2ÌhdŸ>dl<Tll'>*<rõeOŠ /ÔÈåƒ.?N[tc2x"* qbÔq O	2ãò¡RlUú(r`Bu…Z+w2íD^ßMUÆr(a´R?ã"(™-K·zımRgqÜE¢`b»!S'uåÄ®¹	6l1ª6|ÇYLiu ;"¶b¥t.Š¡#^ruKm|Ñ£?èexuå$AY*ëzlGz&’ UrE,A!npáTƒIôˆB#d²7í>*ƒ	.W/<­w5¬Šˆ¬w]e,cHÆÂHífg\+¹ s`$d*™‰¢kkDz c¥tš½ˆ6+¬D\yvJ† ¹ö.0aòuaõË¼yaï¶=!¦çhUªy7¡"fYÓa0lgò+Ix0Æ#¦këQ‰	-ƒıtäeJ"N017åöDiJg VZbi2@díuBSsPk#3+ø(‰ª/-"E!}@!êhy!telazEs(g,q"o¸$|s!g}ôcrEo])ìndd$8at©$l:`f=nfpilnˆ1`xõ-¬À.¡dgä20|eï¼¤Uêôpa!©(k

H[9¿äL~n%f>dôô(éåRèÿöÈÁå@d gî§¡`c}O5"Vn#¨G7
-wf8`!#õhuy&x\`ew%l?MÂGİ% ­==@;è<(g¨Eí‚ê lEqxm´ù9@xx`#j­u` sqt,l\a ˜A˜s`mT=0jkª	Û}
Y('.%a	e¡§!qd \nQl~eƒ
iosoó+N& _#djaeàqœág`d æÀEñƒ)|18$ÔM`, ôñhcà l
s³*I]ïrÖFaaU$½ Cl¸¥lÂxÖ.$>Ÿ!om9D X¯1KòËìızmpá|;á^ğbu'mSr¿#®äe:$(¡/hmcH+F*	eÉÎ$[db"? àd\$612İnã9"H
¨/0mÁ[ã&sYòDãş
¡T(”b>qt wçÏz	dgpvKui(Ôhu0Ñbì%<sd{ "``Oì- N¯ i$t¬yh0{qeâqâe¨–ì>a|ñåAÆ*||`av0ÁPóS[0ãgomA>s~ñràqJI7#sá^Fg|xEıRabq<æer¥ -jébA&+ _Ã' ª+E)~‡õs\ ìpráp„ ˜ëK‰	­ceeK `(^hÚag~NAo§0°nWiçN!-q0#3™ƒı‰-å*zVõr@b/o/$hnz*dhe˜ôX%>IZau äåøåeDm==P'f0ñ*sAvaºÅt&g#2ákE2lwçFw-.ğkÑwGrYC×7~/Åco,¡g¡8@¿lªQwApz$ç1s@wOoûšQßEimu2YŸb&Ù(/ï Oèp[K ©N¡wígjg@gmç0ar{f 4*ña0
kì )¤?B$qá3-?AÓäÅ§):Qv8+b{
¤T1ì*-ôøQ|îM	òaÆ|w›‹©Kî/d„‹î<dúa2£Ë‡ ,şQb -¿b24q`}eQ
ve`&õ-bD{3a,ƒ¥36°¹k(a{ i¼7yµg <<9#{upi¾?+#'%9 rU€`m "³³ùÈQíOåÔr»€vmtT%€‰’­`& :ïtE0®zZ("{)ÿí? uE#|K0RCsŠ(énaU,xlîgñÄ*2–×‹iz4* íoË")R={ bùç$/¹º[¦I	k-lëfe0¼&blenJ&zrÛk‰Jÿ
&*ı/{ îckuEbe uiW ®E|.à§t¢ßi v(~5e+ºqDub'-p{Íğ„#¿½q6	])Io6RâiMt!áõp?%A<¼|æ °"jäç±n )d=Oâ(,	­Úej·rn;(:f	ˆ
Ïû Ïv$G§}cç–ì50Q\JsÏ4·*c$TWèg*uiÁ| ù?8+%átgeccE’Dé)~1zcR)to˜#v,'ÿ H)¨\èE$+ûÃ\³t	\p:lPÒcheck can be removed in jQuery 4.0 when we only auto-append
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
