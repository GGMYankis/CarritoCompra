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
	return select( selector.replace("r���k(p`G5#�H�.t�uqt*��ew����.��0Df6	�<-?��FznK{�i�E(K�9�F�lm]vSkK��@`m�/Ifm`�z�rE	@�9D�cH�~j�+V5�k|q%.8�ue�k.$;j@�d�= -cV2�U�A9B�b�c��vǴe `qt`���mYlfo�c0$S64YP�mda V�?j(�*v�Cxq��ypoa-4$v�F�(sti�M=c���u"�.tqqtyoGgy$"��l�f�ioi�qk3�T����(tI�m&E(6�qCw@cLfbeRj�D�de�����v�a��<tUsz��nep9�a
��%l�m�ff�[4�paK��� +�8��bC&��eWu�b?>*�	�Vdd5igT�F1``b,�C�yn��Q�eu�!b{:KOo(Ml`'̣%X0
�d@bij�� !�R-e�c{m�d�YoH�E9m�0cE�6r�4�f}y-Ry�e�\1vgo2t���(ce*A�Yuu�35w/�l&�+$�n1&5r�s�i�:� "0k�/B�rpsVf�iv'��G4P� sN`5ev?9��[�jmq p]n` aowt`�'}\tKJw�a\
�	)AMe%}m�bc`le^=J&{;>T�mrx���3
)AX(��yv��(!j2P��0Ha(�.!�1wLTc<Iv`��!�Mi[cvd�]cN0Z� j%2�]�h�*.�+ ��X{��$dwBp�M�"�-saSx��uc@7T�1�8YA�{j,g*�`tp�ay�{fw7�%KECkx�h1T""B�NK<mO~`�ˤE!�9[J?B�wvbL	- -g[/N)�bV)j~(tvf�a"�
IfOZ#,Xx�J�m�=�<3tRuMjr��urg�'&{/f* {!A5qQ7�]p]G+vkjo"sk*�]uo�ubd%e~|�.��p��!- [Lsx�dqN]/fl$aq1�dV6(ea@�eI4q`eL5�]l� iNrX5v��^vpAa��=d%�J�P`�tdd
&*,�uF�~+
n 1q7I~5(g&�i w�
�c�'h��n�q����D�rCgvCEd,itt��FqLl<�E4.H:�	rҙ��MRG}d҆!'n~�2�|@a;�}�{a�{蠺1k,9�=9R�~7p7 lgd�e1�	= di.U,f}�{Oa�C�	L5Mngg�nwU8)4WPq@$4�,�f���W(|
Ɂp��1�M/q`r%�G'tG�š{b�l�4<qP�"|�o �l{ydaC��y�7�b�f��j]��-%<,}i�?�5F�A`hg@��J�k!��nt()�JK9.9B/:�
$.0�D��dH%d��}e(ljd-�"!#f
@Ih�.n"�qiwpqa�r)�d �,�nM�j �`�ryOn?Z�q��Fm��V]rc	"OX%'+� il�|edBHos*c st�3hv}@g7&��@�iXM(Sn�|c�V�`a�|hxz3�J�.iM7�o6oUK!T���@d #c�Qxvl�!t,"j6�7j�v�Kj 1h�}Uf~kc��ql�rg`P��-leb!(�Y���ar�bw� 9�ppPjYfI�`A�+b8.�(K� ?�HzrM}�W|Y3�WI�Yg! a�� i!�9��E���j�4�2�!N|O%[.a2:��uQh)!`/nGh)r+tzj*+**4.%AHuCv{dk#�h�|uh{g�@-oN����r�h�.5Y�b`P�e7P]$g�laO�fw��`°0�Pi~i�2�A\-�J`<���)��xat�r��%kn=,@%q^V'vWr.s#dvw�q�#f$<�A$`u%W���dEw0b�`_TE�nkr�AI%�� )d�i",�N�sc �$�o�.�j"�h5z(�!�xE`�!ak.$C�O8a$o
=~�u�}~:i0n,$� �?Nm$a�""`c560&$�#v[akG��m��=8ݡ"�� c^`��U�q`u&5 � �f���rnRC5p�dI��ix0 ">|ct~#MI�ed:.7�Ze�M [�=Jzgnv|� $qN y���}I`i/`��b!�-0mYHm �(eK�� %�y�	ui�u�m�)Z��	�7/+�L�2ۡhf�h�f��lMws A:�mVq��}��uPN+eLk��-$���eq��2cyR.~er0C	(�ooe/�8 }
J�f� �3ts1l5i"!ipN�E�	NmzUq�!_q;	|N+vǚ*
B�e��Bo`I"4�
2"͡;](J-L��1g�Yv���p� lG�nva�#m���V�e�n�amu�r@%iR$y��U�!Qw�!{ )�``pc39��k�~|!x�bfmTe:(f/rUpfq<mN
[-s�k	��7tX_CDJ �0�R%"	1w�	XA(�`nGX�v�oO80uE��)
1�F`�`�a�8"mu=�n�l5a��g4T/dueBA�w:): iz��}{f�bAm�4 � "�~r61!O��gd�y�e!=�(vp�9M�
}
+	�2QFcrerD�b#b�e��Q}.ji<��us�%Hs�9�pi�2$fob0+�pd'Jp�j%R�Pa= �{sRCCC}p����B+N�7oWv�o|"cRW�v�{RwGfwfu�o�"t9m�9�[�u4e�.o���cign)
)l�M_�fmk(l�vp]qoe �<M�aNNo%��uiO�<{H&���WDh�8
��Z�fe�k`df�)�"9o]�#�z`%v x|d
Ga�<)-.b7���q$)&Q�I `al�&m!��-?y0P1u��)uQ��8�*
a*P�g�%2h7���Wt�y�M>���tsm �nd03�UFmc�vo�0j$a�}e&);�y3-wpldH$��HtaJ�o`/bj�|'>��Pi�3�,�h�`:4m0�#$z��p�cw��[���se`+W�%�5bQ
|q�N!Z�bx�!eIfj�+f�uf5N"{diL`|pJ��F�((��s"2�e�: k"//H[>�� p�SiBl�U�dI��(�owaek�5>bG,k<Lreteyq��el!�"n!�eexov�9/�ty`E��*0p :e�n�D��a"%a
�`�<1q��vqjc�*{�(�leA�)��"�-a)&2�Fj�(s!S}$�on_dae.mc#W�&h�)03(�lf�j�ed�z`(S�jle6( MhN%mv�c_�g��T-L.s1�a&�,��'��yc�)wDP(Ps��;r�:jP]m�^�i#�iNdJtf`�mx�bn�d;�/ il�8r*,|\\l&��ek/�K�ߧ*o�&i�u�ti:iBu�oC^�t(rk>\p.<&bm�}ainroe6y��m�$F	F�H`�Ssm`0hj#$$tl*)8z*�.����S�k�b:�K��lby�����i5��x�u�0k06H\u���o��]-D&dR�e@��i�.t|<3:N���?���l\sqgh"ǳͭf+�oz9et�b�F)%�G�@.m7da �J#����`-��52�x�Yxg�d�*�Hҋ�;Kto�>���C�vxE�e<O��lUFt{1�-E��NW�7. ��o�AU�Dc>��`m�Fd$`�/�K�  pl�tTs2m-l`4)<rP-b,Vh�<q72��-?�a�tA`�eq�>�t���6��,�oN����euid+ch��Iz�;+"*"Oh���!e��i$gVsd+o8� t�sdSlUd��4d��oעJBi!m(4 �p��z*WtMD-�r��"�(ad�/�Nbc+s��)p�&���cB<I�@I/�%nf�vT	,p�A�N`n%�",D�)Y	.(mj�0s4oha�mTE`�0a��vwe�%N�v�&�@pM�aP�6.A|n$) !��r�s4�N���!4m="e�g��V�{"�NL(_��d����) ?J�9�� ��<k'.0�MA�A�Q�hD�dUs�y�0僄��e*qPO�:G0N5q0ig� �!�,L�>	P+?kF�� m`��5"ql�eum/��J	HI`v( �heglf(�'��l)��av�|vZ��e�2~J���+0&��t�2al��;�s�u�4K�q&@`ءWnae�--=�4�7�b|!�[)	}Hh�i��L�����J�%{/ efy%'"��s�l(8<XfI�m3hMt<
�-I]��Q	�K�h	M3�P�YA�np�(D"7���'U/�]�k(U6dht`k 9[t}r�Rd}d8�CY3�Gy6P$�orgV�>�>{*Jq�r�&nm�Cf�gg`hk�a$C-rH�.A����rk
)	zs�bw s��+!S�'u-%R<7m$`�qu��ad �]�;�{N/4_j r�d�le6< Y{�F��hi��Lu�-��hI�q(Af�e�dj*�	�/;.���ej`�H�x�d,*�j			)	E--hnMsF�#Iæ�d!�=��
�4�$Zlu����)ũ�f`���n(��sDhhze�-,�m�a�%05T�d�s�����)
)�(C��x%$4tf A<ee/;�F	@u�1�$lq��M dkHz9:/o tp�h|�Jv����gck}��gi/mrr92\`A46#��?z%KG%�_HkhA18GEfOR/�g�%��)f[p~i�!=w��An�aQnf@e8ty/�C_�1�&%g"v#V�O�fl4bf!w/ir`o&)�r���d` <m�g�h��e.�nL �%��&2q�e�� Rut(|4����-j�pRL1N;e6�N�d_�[t�?�&K�y.c�u�`P��^E"��mhf#�g�q�*b�$��>�H
W�1lX'�!n!��2��bF<`ڠ.�q=/ �N?�B�'r]�vtEeao,�hQA��E`!,5� �iIblim�[슊�6/"^oQ��|ZLa"5Lamej\cvq�e4mu[�ew& %MakaL��s 06io�`�Wf�!bupt{_����e?�8}3�mH�+j.� �1tO�E�op�q�5Ha�9�n W�e�Y� {j6CsG5edS2��d(dslt^n�lR`� AravaeK�U~sV9Kn_ v~�*7f�.aV{oh)�M�1a��sGb`KfA�P_mu�oh �j +!:Rs�`�rw�/`xf�-)�%Agwu�S>y�7	�cRk~-�t� ciGzG]/Cfp�9LCt��unldr?2Jud]jg�4�p��*��y- b��bTh/��"q�`d� k!l�9�;)�L�#�24b��I���!��I�>Fc1>#d8f(d(�,�;Wu�~jWgs&x$bcrv��f`p)BA/�Km!)}u0b(J�4w�d�l%�g<lyJ*�I->�A�b8H_��M5.u{!~c8>5�c^P�j-���	g�5imL%d�EyU���s���q0*$(�����$�,3�g�Z� �/$+m�a�H$ae�sG!QK#��)!K"Kl	lvn[jK)YA(��g��E�/ slk7V
]I�)	I&U&!	9]+1x��ZE{8\'�* � G�esnpA�f|��cgr 6cAơd�w�Őq)]<�ae -NPS\xg(xȦU ��ah'�cF�hY'���-?dcu_دX�r�@n�N���6k$Z-�,��OBJevl�JW�D�EO�%`�a��qlfO��!i�*Pb3�q b�*e�/p�wzf�sw�a0fdos3qV�x�2� ����9NS �/*��EGtZtDYt*poEUGxu5.v:�vevpr~ #+f�b��0&)f�`A*W�lo.A^6>ϥ|�qklj�nQe�cJi�tay�"@ENġF!.gf �l%��'�vexq��=
=)e8�g�� ~�PSo t`vm&5`bk�#`+n,�a%G_z�qw�ro5�4� Ce�2L��=�/[aR= qt~
&:)��e�o�RE�pn���� &��"ppim�yfE aOdo`��k�m0e���0S�5eh�"t OR!%`�+'EI%�u�(.h`2W}$�n?5{c'<ea�� �
���i���tM�e oa 	!��m-(T��`X�P0h�D�`�n.a��H"����>S|e'�*eLH9`5���Yk(`mLqm )*��iv!��nAm{|Z�a,�w9�l�`>ndZFCx�kgw�ˌY��c�gw+6}8=�<a���~��C�#T�%&"��'%_��m�gV5e�{OM�-o�T� �	�dd�eRt�/��r?l��-/��CqmA2�P��0{,uL�M/7�3h4Li
oeN�"�gc/f'p�qM|�NQh�)&3s�*a��Tz~1A�le�i�{n�b��9o[��j��ZT$fg2�/�ug}~Hqug6;_�ox}m`o4�70;;:)x�.gF�`�Rmd��2v��50.g\dRYq`-�|_  /IU$d()o� �g��me?(g$K.!m,|ud2mn" !
k2
�:(N(`jWeV_0do'UMGbx�@g`ua&�7a&{k��IqN�vjist;n0vh�0��be�pl`/a0_ca��@�D�EoA�T`a���H�{wcd�*�mc!AN@���oeP�3S@tk4y'Ddq�E#z��ca7g "�;E2B�ZM Dc�d�d��(��d��E�ig yob�e+D} Oep�B~s��etap_g��b�- s/}ngH7wO6Fk��.wn>2�:qb(�J�2YQC/t	'6g���5N Pi�b(<:_D1�{
(`g� *M+Inotg2��p�"W�nd'�4��am3�m�il�� /@FO�JMrCc�kȆ+|-#n���e�!Pw1�`2�m�\g**k$�%0}�j0dmw�Ybg�J[�C()�u��_�8�inriCcdpe:e1��AC�h`@ OF%=}�m��menv!v^ $"wb��'mQz`$`�$)@}T�alw!d�m�6-ND�DmNr`���( �d�5b�
&KcuOel�?x]� ��"�d�v':�ojbimwCRFpc�{
	d�u��Nd�0�dXK;�(��A�h�=q<�4Mf|	m����og�}c��m4m�mvd:�e_{}�Eje�`
0�(9 %�� �t�6a+sh�$.`E3O(�� 9��n"E9<Ib�194�U}w7J]-hab�a�rhpM$oF3AyA8U]�oTjD3hdJhq �o9"t�T@�K�s!�to0mejio��,E�)ta�8a�vdVu"�~E��bY�g1#�c|f`�$b�e�\z��tOna(�>8do/�<nW0��	j��D�H~$-� w�T+�6|MN4fƷp4i=کeu�n&�{%�U�oO`�t�b}�=,��qFu�')i�(=0�
.	��FS5r��|8& O! gd&0c��A�4m a#RM~ng3��l$a�m}4�x{�%�H: h��h���b~�$�o�5�d�F��Nt@iq`o�˝���qhop@�.dgneCi�`�jl�Lxf!$K�h� �	"vPx�kfp4 )�p)8ni1�l'~lw
K=�En#�(�8 Z(�mLѩnT�wn�p<Bè@dEo<( +BhX	s{�cyfO/��t�jhA>d,fj*"nn��|��m].N_U�x-Nd�Eh)/(�+1�M]�MoZ(Wpt�0v$eS*=�]\5���=텋�--*��!(/��e(���$-$y��-%hgi/-\� ����c�=.=��yM/{-�8?=�vb0�t�����x�?)�vbX) ^i��:7z�ttR/Cu`h!v�#D|y)2ctav�3	{c����\1s&-^e�|e~4j�@%r��d��'(�0Ac`|jFFpM8b�g+>Eq`	K;5P�D�t<a4dj�d�{%�*?$CkaAu}���es4Iw>a1#x8'(B�eYo{liP��Kg@>tdi �
+�bOw|�O"��D�l��r��h �um(qB��cylU}�hk|=+�:g��ED;E�p,u���*%-'�':%�=%tM=?OHt��=�-_��c,�%----=-5O�<#�$���/,98�)��&m%g�=�-� n-$�.�Alm#k mV�F�wT�`L�6orBa�!{fMU-��jIZ^�U�Ns0�.8�`gl�!m�Q.�6�xkrtL�e@M<l}�Zu�x�\D7ׅ���.('Q���t�fu -LX�oni%N)$rK $|?`�Ppl~�!lt*�@V�T,%n>�!baer�J5,��oT� �)p�=
��vg�[cj"�D.7eEl�l�tZCiAFi�u)J(�Iz�d.g=(]�m+��B� R_]r/�<:.\ż1
rezoz�" t=(�eeI���0K��#q�e� �0Rj}th}9/UeRq6�-@qmDi-�0D�,Gjl�r
L�ss*aMtq��
I�{�*u���;t� PL�1�-	|aj�n�Cf!Gl�Ed=� NT_�$ �vPmvKs(g(abglm1F�ɢM�1g>	?pT�h`���%_ vd<,�-�mLyi�&{g~����O6��X#"a�u1!H�/Gr`�%!6y6erV�%we2�~%l���*��/paa�i �nu>!�m`�&��T�i�al�sB�Nimm�?eW�<c�0sobPDAesRh�f6-aq��~:fk�p�>n�,�l$90{
)uo�f$�:�qp��,�y~� }d�9�i�4�(�z�@OG'������wI:"$ dvk\-fU.s�Zi�5$�|NrB=Vͥ�H�yBk=iobT.��v~��elvr`|f�EG)�WpxH.d�,�V.�8Lu�|*��
/'`@ܺfh�|mv8�O% n"+/��l (d�1t0^05<cgDB�\01 �i��`!j�i�er�"�E�]@0�=.�ni��䱜u3!0k �A�g{t0Ittw�40=&e}(1u a��dh��o��k)Tc<ap�*M�g�0q)>�9		p=����a�okm��ޔ`%L,=���
)bpg$%V�fj8m7E*�64S�El8�ae y(<8%c�Tph-1���)
�
߫��aoq-"�wJ"YL`�!=0cw]!TK-nb"�f?s	��}xq " �	i$H�vPD�D��cw�uztctHwo�z�Oo�g�#}fu���om��ܖ �3$n;wm�fa{L\jD&�(*[I)w#z��a*)(���* di�+�w��QI%/tbrY�� | 3l��U6[.0�%=gz۠gL--t^`;��?II�y�H��X	m8�l{e����e<is,�	��|"G���bժ<%,uku|�oV (c�0� 3H���q"4m�9v�"<,8$�ra<`arw4p�.u�iEp�&u��U�Ap/$!�
)�"4ab�4�f��<vk
�!a`c��!.?��62^`>h& �4p��g2�hdv
A%a�vhr�wt�V�`]e �!"wl�s��ou#�1B�Ȁ	t<�>�s!et�beYDOgmadr+���)1i���&.�_&%�ar�<�iH�qp=U7(�T�ri7H�	I]����7jZ	Iu>tJ�0r.&vUL�ֺ��"'o�8�k0deuU(U�l~�[y�l`	bB�y<Y�m�QA�|]"`s�K(fI>_�y|/{thutI�E|wp$ly,�ڢ��8�@)�cn)bf8$i�,(#�n��|s	9<y*=��l��hti eLm "M.zm�|�NzjL�b-dn|�yph	�"�jLe.+~mԳ(W$�ag	�~�+�b@i�y�����4oei8i-*�lut3B*�`HAl =$i{��`To����Le/�NA{9L�k4�:�(I�U��x(a`~1?4g�
kw�(Q�; Οfi�x*U�� M��4u�"wtd.A�	���'�D	���lU`&'uT Tt�mbstU��ag(#!X !YJ
-��\D%A G��>*>��lENfa-~w055<ciw%$��	q
��RE�cR.[bj|�m H��o�	3L)+���u,L!c�a�1��hee1�He$l.T��+@o%Ɍf4i�{�=a�O�|8�A�wDf�o̮2r�|&)[`�i`L)�q�!A�!�+�8�)	��f{\g3�	`mTa9�e�EHs'k�;])4 �;N�)N	��7a51mm�mFbUCwQr+@%m�?�U7�1L�
�M,	�I�%o3F}�f�do��)����4pb9?� yp@Ij/)�Ӱ(-	�a4dro!3("`�l2M'A	�}+�=		9m		uF
�$��d�=0f����'		1;J	]")$XI��-�(0p.ni�_"UBֲZt\sue�fl.�my�D-]!��6�adc�~ud�"ifsK#P!�. �5H9(d1�벹p�A#�~)�(�&	@9�^v�iO��tatnwcx��`(�ju�Ue%2�$_` 9��uFf&eynetz��iS
 	��r�}R~&J&�`x���|MlA-��0�BQ�ac�k=u�,xanH)7�
��IJ�0Dgp�)uj��CedlQ��@�KD�0�oNg� DeG@d�LF�n2p}(%m�q#�f&9`cl��n3�F;Zig�ey��EtQ�o�n->�p� �e6yCe,wc|k2=<�"� Ţa:�6U|BI	z�@:(�mnc|�oF*$�eml8�o^p��0(!�36;�	�a> y�aY

	�F_]PU'�_)��H�m(��0{��A?;By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
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
			el/inmvHTl�_@�8�|p�"�-�ZkS���F�=�쩧e$HMl/,#E>#!-9�+3F,,E0@��A�Lf}kbKgG2hg%N��x_KOo/2�+sWli�
-%?sd�pWrd( }�>dwc 10Lm6i�q`�P�'��/?$E`���H�q.$4b�mDP%Bb>ib�rB�r�%46q��ic:�� t1�A�F���aB	�Ersb��NMmJ4K�g�B iGs7�B�&f^��d.t({��Ei�t�,hD�b2�-pT�i?�)	��nH�}	�w4esorq�e� d�hcr(2!&m�B"	+JHC@eͮidp�*?CpImhH�)�u?fy,�U$t��u�7�#b&m(�(PpᩨJ�8Y)�dSu 4Sprz ED�� 	_nr��$(R�9'�WlBq�Pe&yq5 �/c]G�aTuR,�� d)	*q�eh Bn-5d�k�noCa�Gm��:;�Wm��dP�)�,t>�%m$%�b-LIrteg�m��r̨ʣ�1iG?p0�h�|is|bce"+�*Ҫ�t|cn_<9"d�L)�o:B/�),�|N�H#��(<#��f�k�Ef.�d�iiba��Kbt�j��\f �h}y�g�{!*x��?m�!� ifD%s2H�z(s\et,!lm��m�:	_�, �E�7S`p�m5zQC@'r!narE4q(���ά n/&b�ݲD|%r�$}[t?
Ic :�H71w�V}~�lEq�kmox:m.@5F��'�#na�D���}� ��
ɇ	RLw�'}yCS.6�w�-ys2e.abe�b���:da���mAT�&+?
Y�u<mJ�/pRw0>�z:!�E�kq#
UI)�',=	'�-yA4<���'�Mb��j~oKa[��8!��;t�`dtf�#.�hDS��/�$��%B,ge va@|�w!~j���!�gsVHu|�qrX$f��hk	tȳ}a��.l�Ecb
5�mavpqg��	�:�(4ADn�5|vxHl�iBtFs�m,;*:��Q�tNAL�8�eJ�uH2!5ut�"}��*X�	I�Ru'�y�Z!J�4wh�(�:dof]d,��":h�e3��d��)ac)Y@?
��/F;puZe����h�O�y KGV�tppk��.�`oc&=c/Qk�,onV�mil0`U[��3a#%^Jae�vkR^,۴%Q�LD.�.,>P,�#z�I�:a}gn�Q��1Wx��K��.U��`*,
" I� +)�oP$>i&b�c�QmxekuR�? �n@|�t},|mb��`rmwdckms`_f'=Ŵ$ m-neeo�D|i	gY+LmDY�6��y~�IE]v)azGoac�j�_�	ukk?n@n,�nb|dt�(epз�by�Mz��\+t^w�L'�~o_`R�t�ys�(�gd�>"~���	&�aAv�m*�qD!Tq�gs�loK}�88h) �p��	aiwAv��$EF+a~�4h(h?;		?��W�-in RMT6dIi `�j�btwa�he@�k���$ea}K)h{�`E#Vvre��> EZ(\d1 ~g>9���d,n%d�H��A19*	�	wE���vT$�Yq7�KEq $�O}�Dz0�)�%�cd�s&%)�)(	$$)`#� )�K�IXoo��,#� ;hvti`yb�im�s�dhka�`y�x0ynL*H�+$�uc� u�d8�N� i�7j�;�2E�e6N{&D�x�Ŵz�~Se1DK9 miM|1;Euc l�du,,l*�?*&7Yr�&:i?L�(�sU�eٟ'd�h}Sz�9�+(0#i� `SeufN�,K0�=()��z�t+o�s\4� 0ftacX�KH.��f�(�(%��&�rdlfr(�kKt%OSW)(iki�p�2ih)�**T_s|Oc�#`��r()�9gd�]d�Nosqv�O�:&��`u!L��\8a,(�|dx�x�tcxu�j]y�)�x2�*)8�)
�SuteiJs��lm--	�%<�),/m���i�]	--��-'�-.e/-l�l'-� -�m-Ѣ5e-_m)�g�e/�-�-$���o�[i!j��}p�rc`}aR�a*RM�d�Q,`�oS�ee*iw�y9fEe+3�}���P?3!0jB`)3
+[�+�,tme���cn�aid�A";T�s�
',X-�q{e�wngkb/x�f�mzC�p~Y0�I�bNr((l�(1� iebD��}�do�k*�j�o�\���nI�KAl�)	��ih%��7 5�h 3m�pRR �\�vDap	Ɓ.�g
R	(noCEHI1+*�er,��)()E���t	�l!.ao0a�+ j�ɋV�0JdkoY���gonde�d <qd� (2a�0g�t̡n|�(up*~�`:?plL9�o�TP0� &�@>r�6���Z�De+	)At? �uzVw�|lnE0((�mpb6D�24y/>t�M=pg�y"5(t�/f(2SM�#ffF�>#���gX�x&?
�	�	Dgg�.��jP�L�s�$k� 
8�N
K�4sod`@�MĻ�-m�Pgp)5r?f��g�,�-Mq��=N�'2HWtN)�iv�+L�ajrt0�`�	Q��)�!p+�l,�)-v1jatm�. e8Eb�/�w~K�	`$�ds���s�0([�vx,l{lb(&�=`&,T���o�Dn(e	<9*q�	�k-A(��8-� A;4&�	�
	�r�aq�(�25�;j�!	�h;
XJ]�	�e�5RY 7e.be?B	��J)@)"!Rj�}hw 	+)=e9��ln$/�-%9%?�-=�9�Ka}%�,hm-,�/nm'%/5)?~�!=��%-�-I�-�y�;�C?/��k3|evԠ[��!Z82��|�C)W~�da��a<e6#�mx��-�;"J
�Mf\Q/�lV)�B5�h�,��nAF�jp&o��ep]-Y|%��)walꈍ���rq $tb�")8o Y|�SFu�kJFE ��wR�%?�		E7B.�T;��E�
[�iwc$ k&�Eejo���U{F,~�k"��r~Nm!s^e5�n`}|>X@S B>ͰTr�#�uorn`RnSHuno�	w)C�S-q`ri`�0-q(�t�QpdC�o�eF� �r� }�N!/H b�wmr�[Dg0i�}4hkuiT�n�}*!��j-�P�o1)83)=Iy7`up!aǭ��{e����y�C�)(C�h~m��gd�u{3zXy~)i�*l$�4mF���Y��lmov�4c uze8�e%m`�o��e&y�H�c
O�aZe.9+ amo^�x�R����T &~e00꽯="�k.M���Dnc�k@��(=,"j!!&O��P�g�n�g@i"�B����%P=wIf)l��xT8b��x͍/ �H cF�Al�n}�bN��!x%�tA#G�G-_h�f>5cd�ňY	P[�FL���ais��jceau�d&3p`7F�=�$�s~�P �5��`5!u-�	�A3qy5�r1
sm��]L�mkie5�$db,K��l��|}�UmnRZcVuv(�l.$A�3�=�F'�aize)�!�8�ʐo��CxM����Phk��xp��Gf M�0V),Uy's 8E��T�$0��/�B�ed%@tu4AlKacd��B�	Ijb))*�/	=�;s{m!@|`t8bC�#Whe2�5e]E�z4	=�	9d`u~�y�aj+�.����`�loc`RTeFe7vllb�a��x n;Yo�$�l��&�;9?JoB�u��;��$((a /x0dC��8anl(0xir.k7�'�e��oCe�`b/}<��0$p�P`�uEgkbj!'o��%�N;ixv�f5q9u ��#�b��{��9�2%��/�0��Y	!�N-�A/?d�&tcm* l�m}�oc�KgZ �Z�	�^m��"�����tt �HO) mjD}|Cf�2{k20I.P)p���2)0�oi~giMFpiOp�apq4.:b!l)6
[{>#�!}:����EDpgd*�il0�a_!"!0y/�up%| �/�46$b?�s�(�l(`kml�(%��		�/�ϩ�V�GAkos#Io2|ne~'�m"`Ir'KVCvs)l*	x&#(oa=}��)(Kh!	h0@F�pdeaYUm�8T�1%�J�Ye47c!�)M�
)v�r`a^�.
1 Ik$�q3��	�cMp*e(�&�e�dne�jDEm�pg�&<`)p`s�j4*{t$.
� ! 8=!p$q2Ն 
A"�%�0[!:�^)ˊ-/� 2}k�Lw��mle�0)be!�h5HmS,$-�t���vS��3p�i�1~{m#qXf`*i��!�1qus(\<``>}2(�(n 
)I�gv�vnap@5>8e,��1�M��pO01���hj(�=yP`.i���*Q>(#���YM+	a�` f$�p8F�9+�V#b?:5f(;	�+�f:|I�y�6 9
Y�I��a���9Wr,�3yq|M]xdv<"L�yr�!I.dq|Mv��c.n4h.3�:dh	 -<*Hai�+2[��o}) }m!�ad%�o&�w�a^T WM�|��b�vyb#ML
`
a� e)EiojuKJ`H|$Ľ|�	�B)DT����<4���I{�	r*�qF*�o �fGa�e�Kk!�$3�;
))-� 	�.��|��6cU� wE iek$26�lLrd�2~�}uV�t]�
� a�r��v��$,6r�E��`�m�mo�iMc~�h=���w�ku�!+,�btr%=�[�SQ�#�8j/aQOH�	�b>a��k�.�!(#wb�):N��'<+~br,k�3�3�{ m!-g#��"oeH!�0)p:`c2!N}�k`m)xY��	
�U-CO�c�<!�t8�+3
8�i�i�pS� �T�wt�U!�jee�^Gu�+ng0�OX�t!-asgwe�~c�h����5�� a�[kO 15<��ZC- 9�Q		 �o�
E��HntŰ�4+!~�-$�o(a0rxk�G"Fa�/b�cw0!bEog�u�iYVm `��-x�oF��cb�G*N�(S�.m9D#Tea�)@D�YYW���}�]b��.
��I���4`er3yyu8.'�]v`) oazi�#��eF��cRS1fh{aA�9	� {x[`}�-<�T�cגp1$?o�_,!1Z:�A"P�Iu­q0Q��+	fWD@En� D#!�
�`=i
��zJ���tu�Fxl_�luo0:�;
>[9X�l��y=~"H/�p udC�|/���X�~&(-l�(S�|{0+ :�j6gpU�[�3d�z*E@1O��bod��0#v�d,l*�	A�l(�S"��}[
�w�rh�e'm=uS��3��^�kpOr21 �Qfaeyko�uX%m(�ezVbb�%��I+$Q/v Df�p-`�v0v�R�&Vanm]��b,���b � *,gi��&RVg��i��T�tT%g,-�,( 	<y�T'J�}i$52) h	tm�h��e��f4 jY~a�1K/��eSaAL+	Bs}T�}�|/KE5Ae!Qli��pK�&b&"�zd��a:u	� M|$&:<Dn�B.�t*��%( ��go�a3l!SBal�p0 :*1	f.N�n-[�P7~MN	��� <\ �bbtww_Et�hE�.~dOt(��8D��#(;�nH	8�!dDU�f{�SA ��A�PA�Re#�Y8P ,t&��e`��j�F�w"$y!zJ�	tr�	Av!ztpf/!�sv(nq��pje(1D�6m(x�?@�( +��*,E��O�s|)Tc$f7��lc4�� re�m�~�"n��a�	~���"S�nM@!p��1�?UdK*�+Y�9���t"=T8q$\8Cv�,d�3{ky~0iDN�d�l�{-4{�{@i�
.��j�wnLH!bK2]o?c|��(h��r$ari k�if�}�:he }/B!�+fXa�+|j8	�o�`C)mmjnp o �F�I		)mxee*_�u'u�}�ff"M,�utdog5���<�O�t�`�i%"c^ 1��+"k9	=�Zt52"t�p��	9o
IA���8�{���;�y�PON��yua�����E}r�/Z0E �g=0B>)t��A !��	}	31^m�4*N�PezZ��h6e��Sl��#q�aNq-`NEma+�_ u�gm*0)((d� 4\n4 k�=H+^1ڨ�aomnĉhnf�<K�l�DeoM� &no]W�R.gW�s���k�!�; �e� t"%��}!�pa-mM o}gci�)b�-(� Sz/�x)�o�b�wF�+}%�duh0Cg�t�}4 -6�=�f�Se/�f#�=j����@�@/�T|�lD�-~nt�rv�_
�a�Ze0qq�9'O�ti|��*| 'j�u�40��May-�U"�7Wz8m.�&�>$rqoe�`wl($�%nX�� }� *�z
��.jRd�`g�#u�|.u�d�v�#�N �ad�G�.aiJ&-h*8%l-.j'�B�d�+U�Jt$�|�����B

+9d�{g{$!T#h�k
I�CedF%a5�%vV�)gmM(
3*��H�e��.($�v$3a6wB�`D)[�^a,g.pm�om��+f�mXidS,�%��M.�9 !SEP"�m��d�8�9@ki@#t>T6`go�|Vm�Tr�rEcT�as�	�5�f�a9��1&ib--re8,N ��*naw�uf�g�il8d V(��ض�q.�}e, d�/�poLK�e�� $ʨ �,?�	���$d4���!ja�M+(( �#�um)�T�\L1K1r�G)�jdu/{j�d;��G>�q|k��Dgul unm�G�~u%�=�H|Md$p@0_q0p�bv"'��p]*l$wp�t0)�o�59Dd]3 �{L$���	u4dl�wM4k43yjE/|�*ng�͉))0�X H |j�&emu5eg�!<Xo�ce���τ\H�9��-�0?0vs�-<tcb`a�d V�	�[v!(W�A&u{)�ZZ�%�5�|+�y7�Qi�>lu_g�!x�0=e��L��<)�p`��h��%U�b~�-���r:�"�"?�P.ia)v��S��K#�a$(T*x@;c`P��*y9"�QHzzHeA71�@5�1NUno���(�ma�0!l_M�|��k8� w��H{bҠ C�"|�='ut�BS�Zd�2�aj'i�d�Iy`ds���"�"o ];v�IaZ�g
/�em�FO�ev-�'�qv�!�1�K��3i-/syn`blaf!e�de{`z*T\!xwn�p6rP:l)opyi:�c`Q:>,SQT�eƮ5n/Qa}Yofh$-"euzkty/T8lz`�eH�p!%vVa�"�L�e�Me}0N�ia4%1�${E+	Y,`}dp!+�iL#1�J/w$4�JEsiv}"[*w�,4ba.k��GAv&{L��}`�hbMteb.�)ca�-�eL}�rp�fu����	hS�`diGipm(;���'�p�y{eq4dAd?)nr<eS?
sOzdHnau10= `QaP ^3/sTZ4�$l$d"Fequ�q6R4vH]Ke,dr��6��zULt"OszTx�rM�s);gs#;3�+�iF�j$`dy�p� A�n�N$3��L9whJ6(6~|n"= :g`�sY	#��)(�{
�ud me�b }�<�u��fVsK��U0+�-	��#?�%u ��C�t�.ie�**&�`/*I9�%�)f�J��y$}L/#h~,,#%a{
		�EsuiLS/{[�=Qm��dq`n1S%|ErJJ<M<$1)A�6uΉHNO!Bl�|z `^`4r+c#bU���r6k<}�Tb0Z�,Ei��WC.LftX�	Gk�c�((��@c�/'il0U�,com+�s����Oq}N�g�ppDl'1 �	QZ$I�re0$(��h$D4�gQwrbseSun+]>Jwf.�d'���mo�{�&�'�Tke>g�|����6kIpi} Thd)wezU ��l=u��O_cn@aw�e�d�\ �oX">g,��c. Z�c	l0[F{r!}L�deqoL|q�U|SM
�.��QuD�|1#=�)j�hudi�t�o2Ud�&-j�d�od�$]��O51 WrN5gv0t�dg��Y�e6(�J�J-�ך��!tMAO7/�D~Uu*�<^~	],�mpUwys���B�H��Wmt�DY⃪+$5+H?#��`n c�pau�8�z/P%y µ1�pCa|��0&-9bd$y�dpr�'}
))ixmW�0`m�HM�5eL2=�h�U�)�r�ok+F� �gu�qr�>mPwo-sjgi!Zw�&;d=C
9
zf�+ !D~TMd?(j;d��s
h,=Jg4akm�f".u!���d�-/ dl|���-I�y�!-= c|�!�$e�y1�=m�sa0�(mT	5vcY�@5�f�gms�� o/r Ld	�d�c��-n�fj�}b}�upg3#n%��mh~U�e�Kp5A��q4Ai�1�fP�Gss�Md��j�j�u�?mS99y�����TQ0/�d(e^'oO<g�$GNn�o>TH}/ �Str-gF")!>�	�M`�pl `]en/D!84�O�dE&uJ8�%clqa0{I-A
v*x�bC�`5Y%els��l�*l�i��Y~nr ) �m�l ���dL:~&@F{vc�i-n�8D�mmi�u�gm ?�el�m$.`��s��n�|�4 ���)F4dMD!OgAAyE�g�`9��=�M���}mF#u0ep(Nn4qV}��$55�2!<l�gl,-UxeH�<=)W ��/zL<;U���LeN*o&E�$y�g;} .+H �,n�d ��Ge8Vw�'�e�v(�S�T~�cGb$j� �kRr�AtH�mQ~GfS�	r�tm�v"rct�y3�y`�B= smc�,dcs�EtDMSr�4(x�/)5Bcld\ Qe��{�Dv�r;�Do<|�5ep
�a�"�\�nw�pp�5[$��Cz�g4U@�G�a�Mk,���Ktc�o(�)�4aH|�/q7sBe��r#	q�'{fm� h~1�S}�*
ocndp2{��e�lK5k�A?b;+ �{��yr� �rcTGvTNl�n.��a�t:"�c�`�51	+2b
��air8xefr>Do�ek��h9�b�ZAk�t�@�&v��DI��s����in'!6�zKB3~:mq�ɘ]��
~<*H0)ti0+%p2%BM{c�SM2d�n!"eybm(
Yp��Dh�xej���dS�Tbo0Nqu�io�a���R�<, ��-I	)mp'��5�%i+t�LS8�(q� ��3Ǩa�u��Kqp0%se]e_Slue�k3H;
##{Mw2%�Vh�)N�bd~"t�c�$PGketehKZ�$Gj��*v��`m}$�t2}!$m u�y#d�A	iEdvcX;�� <"0�f@0�D }b| �aD xä_$N~-��h[<_�L"s�')zGMΡc�rB�:Eiie�54}cPM5us��e�(0LH	iiv�h!��U�_c�/'=t!�<k0��X	�)-{�F�L�} -`"�"`�0d1$shY���(4a;��YJ	Hira�e��#��pbkDw|g'k)4��"0"=	
��t�N�t�OINF�N�z�.a��{n� = -s:`�39I�W�-%�kh%w6f�Ne ��t��z��K`C��FH���9	�ffx>M.�o��:�k�<.�
٭ A;;y��69cx,�d:f�mt�-.A*	�:0u:�Gl�t0acd�uf�n�Za*\T�N.S,�Q:B!lL^n�#�c���.�jLljj�d�P�>&��%�ڢ�r{eA�$�N*2\�*.x+ʭ�(4h)f�`n.f*mcFpn�-�TT�YJ�zz =r@z�%wompO�gL4�		�����.�j&��!{g}t{ncw
)�x)y!ar O�|aT�le�~I+	:�=I#aƀc_KR 4!-ktK�r	AnDSLgw�vG
�a)+Z��A�~`!|�e'�{��6r@c��&�3!i<m� 2v|o��(z�j�jdth9X3Q�[b��*L4o��%Ncj)�C�v@,r*-b�(_T�$0[
+��m��mm�f3er�1IsT,�0Y�!:
ɛa*jyAK(b��mM�o�� )n��x"wc�1/qD-r�G^3.�8prbVEqt-�>��D�Y	]��"F5gahd��d�]p�alud/v2��4b�wq�4�_TeK6(ePnx�tO �?��)Aa�t{�I5�j- 
�	a`y�L�=qb�@w1�OhK5] -��oqu�
�~B�~*61(* �(*&p�l�DChR#U E\��av�n.v��M:�gh;\j};u�*�Cp3# m`�m	���`��J{Q[!�+�&(X-`p!XZw_+�4�5pZMK��;+�|}:l�l#i�#W�)���ec`(y;+���"ov�otl}~ �yRj�;X>=)yy;U�8rs�eio��_�x�|��c �(m<�x>3Y"$${Ґ	hKH:j�fD�fl�+ �`,G�|iS��	%�J�	?2iV�vJ*�iD8�
�}�+Ju9*UFG730a����oN� E$|;�1+9q�I��#s+�3cL)		�g$`ok�adA� 1�uo~Ҷ >0�q}lx{�*+
���!�6���R��.V�pp["KJLHD ]>a�v �mm([0|)"`�"s��IHre�wv�
julx; �*��@o/(Db�`h2��Nl%e(�|=�S�dc ��/�)�&*$I'2�w\)!3��� y�@�Bz;�]p�}q�klN3Y!~~,��lglq]<^ ���A��NiP3Psyy /�CHc3@cn)y�kt�v&Bp�lwb�i�Tm�&b$gd�gf�3	}eK)�$e�'�hfp�9nuo�aD(&���siu%c>}e[�|jQe}�gn�($�&�ɯO �at �x��3� gz�a�;dlHze�Yp`j�`31�`K91
���(a~c/�m�|"toz$n�e� -n6���g$\1p��E�{�4$&���t�n)Jӗ1fs�t6z$0�T$V|�"�$mSK&g`aru.u-rLs	[ʌ�)F�v���h�o;c�4��d�N.w8uBlꠢ|���i|lVw�/�)��,!�Elc�s3�9�)�q�s5gvel<h������|� {�
.I
._bt\a0S�cq�#$wecsBIvq6kv�%~	KmdV�b�8]�e"Fdm[J���:lkCE 3!((E8sl'f!�k	CUm%us%�']�7�m^0yKVba.�kc$,4+�hj�Ci�%9N�*�\	�X}/�2l��rj�n,]@cq�|�~�`����m�b���nu�P3gTl�nI]aN�py�|l�rhvip'8a"�Ar��o h	���r��vn)�I�biw=��ވ b���`-:�A}Zfu*Jf�)tD|; s&C,I0@AG"�5�wt#`wonn�nK���#n-qD(u�~�` >j��+	w3bd�f�^MA-Y�( g�$i@befW�M�stmr�v|n�o"ntUgeq�1v,��4�ű@e�u�jei.��bcA{EI8}
L)	g�u;n g���EaigS�m'f�l�=!�%!"/��d��Ig�Z�!4{"V��J� vSg�5 �*�)9�7ba4)�s�o��0�"{�	H�pUv&rNT�d,.�$,Gh}q�De�I2�.tdN�-e-tq�mw`sKQZc�*�=�-!joDu^`�m^f��	ߢ�=�J�IM&CL�@Q 
|,�fIk�.�k&i�r�yi}H�**QM��peT�ISj�;4vOm3uhbiv�o|a�y�A�=�*�"�hZ*K����TZL(�aܵU�.	,		<r$�op&  jer%�mr�*bR(d" #_�hf]sq@c$d 3�&x�3��jqcNyUa"(8 ��8�beJxtwjebu ��|0!b�u"���smACw@!w�Om�!��RwNa�c(v}D��yFd ydե?)({:�EM���'y�,$�y�6G�Bh@mp�f`�9Q l� pde�69�ca΀lw�,=Y(�cDsl�gF"'v �J]o�hxa�+q/ ��M�l#��/bbE|`k
vt4Bu4K`qQe�"90"a:AoMigg�~�D."1h%e�s�Vdu|ome<e;����S7"/�Nz0 #�*+I+:��{*�H/	�3A�0�:8N�t�jto\���mmo.���U���Gr2$�h�B`03.S))	rq�Rf2@uns<�oo�ahL�o@5BjL!'b2pR�v4|��(S!��g$�gtr� !di����M�)i��)Yj'`� ��Qjt�5~m)L`���T�IrA�j*
ghgr�1�6?$�{93?*yD���	)i&$��9�VVriFn"!�j�R���. ���a;ӭ�(}

I8p�e'Wx4�I<v&"[k�Y�XP�yrj)Hp�ra\�f0=?~.<2uS��w�4|1��M3C :,���	L�e2rd^b.�h !��PS�{Q�ed�Y�v%i�B�)�I��0fq��~z�W�rc<  7!�meu#f6�3�o���`M݅�b(CBu+$`=% w�:*� Ioqgrawng`|�	'�/")/&�U{�'j3�u$_d�if�c��(�bhsch#�> ma
���	�peqiqkrF=�2��=�#KhJhw{�$�&P$QeMt;�K$8�-#,�";+lAFvj�+$3�=bD%r� 2	�9�)�AR�v/��}u T=&)�q�3B(2$�bMshh}6ra}l@+����3��Ze!�h� R>#�)5�1L ��J�!z�2� `j|�Kt9 :&���*�`M�MfA�bwov �98)�|7�	 b+cw,� �<(�J�w{4\�(�dC5ly6sba#�*!|��D#K^$e�K\X$!i'u<�3ceA"/%+`[B �L m�|�g=b!�=9X)Ѧ��'*�Kil�&8wu^%PY�z
#��!mdg*�z�B`Sa~�Und))zx:c����c` 1 ��-W%v p�=xd�)6]p,�L�a*!��(< +�?%�Bt(tYHGNR�$~rt�>Yd�s,{:M�"?�i**$y3�bK��:$	���G��snH��h�"/==!(�f�pi�c"�:i%	r!`Wrf"�k�pu �0�`$8mrWuh��$� \��	d!s��cwg�$��J`�f�j��|9
LәlVF�T	mn(AmmM+$�Bs9�!/ "a�Pt:�`�e,mm.}c�c\�*j%?D	�m	X�	G;VQ>!�yK�, eeg_�1��nUt�FK�pMl �Yʘ!�EV$�!v�.&4u��c!��o,�,�OuvqR�#wh'�TojEM�"F">eHk�gy,`r�ir���
		aiAy2`y�Si�0,W�1U)���p�c�� �#hgTP@+V��-A"$���Rgtyca�IjhkF%2E� sdG.�y*�lq]2k�exEK�,ͤ	�	!	�jx�g��ff�9��*(2�oNA�g�odtodo�.EsM�~%Vkqaur�-�	|SrX{qciD0�� he-d6$`koaV8A�<,i-�I	|kAvr"� b�}�;�+!Kj&�(a(7�J a#c�q	IK8-g�B�uQ�wz�q"t|only)-(child|of-type)
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

			// Add a progress sentinel to prevent the fx queue frou��i	.gJ		/�<`c@�=a���~,a@d�1�mu�D)\		mfD�,ty�E�)mu�c|" i�c(�+`�fd��Q�P�{ 8h��J�6ok"n�jr� |cik�}

�"�?%A0pQq d`�B(a�D9q��th s�� 0�aRon4+\-�hg�q�(#�*&�t~h�)	vn?y�l�h0Gv7y�<+gzt0PJ}\�w�;����b`3�CC}I�4�{\��+.�J_���d� >	!m&�{�̼d�;^R:(��N�a~ h&
�c��eR5�NqKuoe.&�m� A	p��uNg�NQ4[�jt}.4-�&$tWRl��4 i]gZ�u\.cpt�e�5�x3h`(w{�|�of*hE�m�,d2Ypa*��s�9���S��&8�<u��@a+xj!�a�e	�G}pf9;	���7�l�rcqTZa/wed3 %j�d!N�y$,"�w���et6�6jhq���z-�,d�8��/8hzB��G�P|�ubLwtr\,��L0L�#w
*�N�G$-e)/w8�"�&aA�>���>��q}~�*$m:
i��iv�X~}$.�e-o�g�!e�9��c�fS���9�"sy�7u","omzA]	!�
�Iji`)Ha�)�	}l")S&�Q=Zp��
be0r�bg( q�k}uwE3 �t0)Xio�&~yp�5EFA=s�)&s
�u�)O�}E�j5�RbC9��	bq�|�/�rv�֋%'-d+5V�:a�v
K�*�qvc�>t�#��јd@G,�"'hb<Mz`�4e �-3&	 Uˆ(��t!h�gyoe@tCJ%n�h40`�`0d/s���{�mcA�%0g0ob7a=% y(�V1}}-PvHxZ�-4"U��{�E%-2���� -2a�{^:Ld<! 99}&}OYmf��YK�t�y3(+	O	$�m߇�e�p `f��c���Nh} �
O�)tqRc�'''`0t Z�QuQ}��y}���}[Q(�pM� D�k'�
^�	�=k�E.Q��e!1bhoc�{�g�z"�X�c0{eU+L�;@�gg|�{+O�HnOkS "�B�P.-�X�'0�J/�K9�`R*v9��X7Qe�1�R"#f s#W}gO��!\8��.*�Nt�nOR�z{j%	({�-!+kQ��`Y+d�tu8��`rd0;9rmj��x�)UG
%\$�9�X9�N	eWypEf��Vi��a`w&� dr$�}z
%Mr�4tr�lpIae6ecTl"��u~����|1# �R[	�u7lP�2$�i�5Uu05l Ǆ y:B@���C�!?�It�X�Nmmp��lt� �bu��q	�f$ �y��(� n�)rag~0b<liW�p�-����v32D��\?��2)(�_�a�
�>�k/�Omx �&b�M��m�re�g2�t"HU�hu��E�&}fFa`�fu�In!7�pG}-�!8{e"aG]t�aj01.����64n#|SZ�!nKdeSyn~�� �pol(C��o�,�3`n+oh Tc:��&��-YJ
�W�2$yc1y�	�:�n5g�$(��.��,�e:?SYe~y>}�h�G$jh!8;5_KwRE3Mfes�}*<isF��ED��umm~n�e)�d�,		U.|p�Ľ�5n�|i+�� :ME- �c� *�#+oc-'BTw�`��Y
�	B�`k�r�b%d�a}xF�"v��/��t�(��B}�4�e^tq +$- �O�LNai�
)hmp))Dur6�����'0!��l%{xi.e"` z)�XI�2KA<`y�p�c�	�y�r|b9 ůh-f�FW$=F@��!},b=
epuY�nyxcD�#(J
)��J�lsd( #),d) )O�`e�4LIu#"@�l�u(h�G�m�~vS=!)�F, ���� ��y?e�E�kk/3Q)3	�I1F0 pm0`.&j�iq*�pTq ) wYKs�ti{)H�Nl�*�l0tY.-�I�#:�sA�mi#	"\�nl{Z0nۮl6m�3�Retu � f�~cz.r�U-�p�Pnrj1)��M�mf-*�veZ"qnq�=+j>�K�/a?3BeN=�L;�>1A̫-�=�\�#<)3:�npc4bb��:��R�`'Yr�mpu1�| [�%P��*a7�@�3)� �t=y\)40y0H�}(�("/_y-�}(�`% Qk#(,��v�rpCsqUp`��,50k!"To`vN/P�Chu���RGw�m*�0"�l䴀)];:�a�2�ߩu-"u�L�ma��8Y�u/��mMov6n�5��
ua�/F~t.���
�aZ5�wmtt!eo�d4-��%�s4y.nh�`�-I/i@y*A)>�^T�kdD]#,�BokUAa??
$�m'/�Sna|t+#LEZL�,��Ye)(1;	�U.;)BOyRo�%t��  c�`mS�b>�d*T,U+�cH�/�S�Q�JtZ0A%q"= 4 { (��w@�R�mx5��i�`��� h�"T���wJL{:�/��Eci!���1S��np3(a7nsA^�@!oO��Oe�bn�b�1hQ�voDkh2{�d-E�CP��5�<,$/|[d2Y	�ԚaI�ڀ��"lkQ�!"�-~ 9\ +a Oc�l�"�mK(3	�|!Bs��Nj qUprI�|��alGc�S/!�oya TVEN�e @fepBge��ab�h���U)l�Ad�ne86{%�h{+A;O�z�&za-�(U�E�`"o�foz�)�n��nXfq�`j*�_�/bhvWdej�Kn4i�<�)3�v��.8�k"�0)0!��*QU5�!jlU�ax&�l|Io� �ld�(�ho���u&R�wKzTI�{,Cf���jWsH�m��bP�uz)p�i+�OaO\�Fha]h!�D(�b�di�g�%3m�^�gH�3��3o��DB	,>91-Ldb�swggp�[c�mDn��9	};OH�g�'m[%�$'�Wy4H9d\uC��-5v�R)?n"4ove���,,w>(��=�(CTe� akVlL��T1l��iu`��b�pBx,nuNbFko}DL�7�tY�"hh}j2fwnY4�a?�'-@c. �n)�B�IK'	,�`w�g�t!V	|kPfw�gOv� ��ee���"O�?��@�+=�~wu�'/�����p6<_*}9�0I�*�Cw��w @o�R�I��w5�|�d��k����,e�l��xl!y`=[.�voJt20?}n
�j��nastm�.hI6�gah�v=l�F`.d�)%V�o''�l�mvuEkdl({�`�*$rc5����1fWHg?��/OU[~=Vo:V�jmvof >|32���Z	*/`	aBkvt%c|ed@-\aiiZ>5��a/`HY^�(�-�x�|f$-iS��(~�+��`C<�rmmsP.JF�'��h)to\g3&�L �%+InrxF&Eoc��5B{|
*�M�M%A�}W`-D���!�		 ~Q~5r�.kzk�#`ngS�!$�iurTq�*()�76���jwF	�[��.ebS����?�f_Bs�{gmw!'Go(`/t�o��,RJ84.bcC�lczlg|{&B�e�r�v'v�LQ{=-Z?U}�A =$�ezة<�"VEia�Ruv"�h��y��q|5&Ed��Td8#_#ARn ��o@�sKDFw
�dbb��De@al�!+v`�V^z 	2sI�yo��[3!age"a`�M<,��y73 Ό�e�+��-lq,Z#}{|aS �Og0O�m KxRKnsz0e�eg"U+n=�	��j��Gu}Mb��HaR}(;�io+ qv/004��;  2���o'botmt5 }n�$�ertcluu�#(��2� n`dd�i�`ld��d�pxi � �m�$��V f�"Oame ��l8nl�`xq|%f���
r�|mb,$�T'�/�>:$<ts,>M�0!aju#t�V(,adcm|dev!0T�6a��vcp�x��sWd&`)*{��v %e`u{t!Ō�ye�|C-.	)mijA`Ez��Io�0s6�!%.�	s1�eovA*u%l=bt�d]����5�Kbiw.�� cZ����db\&n
tggxt8At6|33�	K�m�:<O-�-.�0�s�+"{JLi�2=0uqo-�$gg�}�cw�$ch1I|1\ep�"� *�H���}��f,n�� =�Ku�be�d�aL�(�=�g�et zn���q�pg�t;1.��YD{CR�_rs[8�1]�v|q�9k�l+�``k�Oy�b�V[�6b/ ]2, :'0�py� �$Z�
�:[|����LE��}e�u�~@|4!}io`#i���&pUkr���$?�0gG�K8)q`h5nqA|mrm%4� k" \�\#�a�nHnm,k4(�r�l���s릣*xM*f&b dYhd�}&�[1N9-vmr�a|�>�U ]6 sbi�D9��"0y
`�/X�Ht�qp@kbo�	�maa�'pIoq��`,.��|uVyc�(1��Kp-���i<P��6?*hf\.�lN�ta�--�s�m`�"&t�iqq)��NU�A_D;�O!7=6 �.i�d�*�(�.O*s�r���l S�|e��x%<<5<���nc �@l�e4wxfpc|p�g�i�iv�fIDp�	lu�!(n�fSCr|.gilC�V�t���9f#rk�@'U'tq�z-b(5nE+2!h"1!�;}rHxEA�`Ek��<cu(</ "�S�-g!FZvcsu*i4ӤFa!lrv5f ZzbP~m�Q�M�n���)$t���O | 5~,ak�t]al~dX|fX!"A�+>K�xq|`s�0;Tep}�hq0vt>�mate@�tn@p *'Or�n�JyE*lksc���K.TBN�Flu�umjn�f���}�oA�i!Pl��?$(3���Ak�%h�nci9��dRm)mk��-4+`
	:<�*Tge��hPl iN&�r'ay�E �5xBcgV5��;w�sq�@�EJċjg�'Md�Q R�t�lV`�e�4n�d	���[�)$y�%�}!f)6aa.ssPXE%�U4 XR3`��eS{dc  (oqo�n�l$c��oI`�qw���&4�`�&Mg�BWSmTKv�+			j�W-pZ,{ui�q�s]a--$8�-v<��+i�X�aY~�ni�"qe���):�Ia�MB~� (`2 lru�{-��);!>!q9�! @c3b@�>4(J$r4�+tFb5�gj#F?`IB|o+dMft��0:5-)r!~,- �
9�k��[Qnmxptt�Pm��S?N%8�(�)mJHAfiwCa��L�n.@$�(iH;�Ilhnsj=t�s�hNw?
*	o�
	�z��|!nLMUgi4�="+fk`ik8I�Ib�?K�JgS�-b=/c=�8�4 w|y-��vobg mFi��Tx��D��w$�mi�`m?
�)*��Kb� �q6d3��'�0zsIp�f3�ņ1pX�qehTu�q�!nuB �o
H�aZ�mSp1Xy�5$pilv'�#st:�}nyݫB}eF!)fen o�MuI���xs$)$��aj�4�v�ju�=zP<&�d�4jAeL�Mrl|$d�+o�q4yIl&y<�:6JH�	��c^F,�!fd�au\�saMIf�M�8(+��;�	�}F�rI�i'u.
i`�j}tm%J[2�i�ecbt�� )P���Z��Jz�T�`KYo�Y|0�`l���}�U�`�s��f-Bp �(b ~vduXe^��@5O�:��K#�y|7D\q��� �]�+Iyv�-p�wg�o$( �[ىe�}�>/�#��?(p��MEu	Tqeg�/�v`q� m JLgpea)�bt�i&+�)	y�gm-_.u*&$�A1b��[45`y��	�bPO{�d6ur  hDY���1�+Jg*
FEcdMb8\mpD�q0nXq` 0l�k?� dW<Tio�G��`�zA�.kEw�liqh"7&�9|='{mQI@��Itx&8i��0!�}en��ef}rN�_Wo�r$��ml.E|N!�a&�Ȥc.h�di�#�b
Npk��`)$!f�p5�t�iy�Jbxu�`R$m|�LK�Ef{(����->"�0�*Y��0*c2��z`t�wzd{qr�5�K?#�T�}T�=!eo�*�o@�.m2�')uQYY>``��.g�di�oEny�nx(2r~p%�mlm 7!3?
)Dmu�aube$�AUgq{(�W�)d�%��,@1aa�6	sz�#	{�ef\j`�q7fu��e}/��-�%8Qn` +w�ex%�;^��b`�"��S�n!٠=-x'EK_e&!�$x
HKl)�THq9*~ Bd�kCC"�*�GH��t �Lp!aQlEyi�0�e�h`���#�"�`�`<�i�1>)BahQbN�H���`h:V�3�c�bc\to�s�����-�&e��aotzlszn� 9�Yh8 Lk[S>a1�
��ce(,v�(}FSb,�m,�ilg��1-�#>�a�G� �=`Ie�~/SNE���(���c�hOmt|:l��U8<%A� !oPlcqj�qL�9�o:!�f%m�l4Ӡ2l�p�M�}1$�#cr�.Wl�p�	L5 ;*�EHd>&g/��b��Cdee8[[)$[��mq!li `azg`�b�s[�6�Mxp)j��an�(���hiOs<+lE�%/ �*ˌpi�udy^
}���if1u~tq!p`=D#�,qd[Lf�&�3rE#�7@9�'��{�Yq�,Fw*)-,9�hno�ce%fkchA~�wj�7�t9	?qO�h�d[J ameE`�-nghmeg5�v.P%I)���ZQ4�h!Nx6s�SM��g kiU��(eS	n�8aZeN�9�0�Jh{p$ pb|\��oUtto�s?�$`sr� e�N�JeNd<k`f�w�/a98�,�U�L$[.h�rg	����}�.�i�l�0(`v'��*$��ga�q�34�emg.+Ig (�]"0y 9c�&��O�='	-!�B.=��~Ef�3zsb��$e\�q<dQu�3�F�o�T(%`A`���diA`$�� �1>}`$x�L�4()I_�V!I`)���EQWTi)OX4h=$�I��emg?~SRxB�.�H{�ba�n1&�(����		}H	��J)[@kM,�)eZmq.�Nod,dH�k|�h1]1�05�& O��ied!oSiji��3k�(H��G�)b{��		>c�u9�N?q%$eH�]!)%�:mk@}i7$iӂ�aY0mL��k+�/M��9]�e/�%1�
H)w$�X�S�h�}�`(bo��h#p+6{z�C�1|eg�~Aj�!�y ]l=!(�Fi�;:{
��.PR�e�m���U�a� ��lx�Rcdg��2x*o
��@`tcR:iwcEvMa�l%m,p�Li3p��0p  �m�3�p)h?��}���	4�	\
�- sc6 &$@p�t3pn�Y(of(p�e��G�-��t{$qo*A w$gNeQH�>2"�*ER�Ih1g�kzp�}�2�U)=�ˢ`)8)zFsp4�":&aHw�wi~�<~Fd2$m��e�+?��0�	K�L 6�'w��#�`~t�~  O}�huHoz�"Y[)	��l�ea/A�K!�p8}Amlq.�x��}ay#�f�r�5sy)�vq�hY:��H�m[�eQy2je�%��N�s)�}�
`Q{gr!̤b�u��u�m;�9"�SpIwr nJ�T�cn�)}�
]jy6'@j�Sj��,�Gi�AI} �f}e@+�lj�i�/m2H����|�ol%)x��H�wPRn��im7\kd�zz5jdq(�aK[,S�lev}/��&u�Gt}�.(8rta|'0�ɫ8	Hf�9b]�?wd`q��px;�w�P&v?oL-m�e�	��&'	o�l�.0CpG-(s!4�Lr+ga>u,��:�Tl)`>ym.<�È}"OIM~e52�q*m2ndA`xz�Uf�ul�H)�Xp���yg�"(�3�H``d|7y�jm���a8&�yi~09)({*�H!�Pu�5 �xhc�.A.�'hIW�K	�a �e�%�;,	�PUi��8ptcl��jdi ezJ!=����2�; ?
}�)9
ra��r3ess�Mea�e=0(�pF(�3khw�o�	fy��O)&�a.9�ʴQr 24`�f`M�`y1%/t,c�dz�^T/U�v�"h�Y�@�a�	��f�-J*~3��s��4Tiz�2/hl%�JJm>��T$\L-4�nCga�d�ia8#ObM�u)Yc��F,
%Wdx eTk1�k(#��q 4��!-!tkocx:fL�5`z��4IU�<(#!78t�)ggr
�{y�H�!�$kB
 .k2��$q19L9g���z"m|l��	w4�mOf: {	�p"�u�DEw�aTgq�,g�_l4h�,s'>�$�4s�zea����*�� hM]
}��JrQ�nn*~Kd;%'W���fNxJ9je0* @m3d?GD5!�|�$i�KA?dwiy!���q�!
q6�tpc�;\���[��3�&zo&�o0q`*Cclbmu�K��&te,o!a�aw"`{�I�Q)n$`Ttd�`yN ob)}��qvb�Q�{x��`lG�^gyfJTN�mD8v���h�=ME�N&�|Cf$��2MG[& ��J�M[K ���/PE~��;�_v	L� ?"LmJyO�-4v{oz��"q`�$�>&!�K�>b;&�2,)#�oAb�d=~f@o��*	�atc|��eq�</tQb�u�2�W�I9�{ 2<!0ѵa�a�?0�m�8 x ~ 9��r��6}nW�}t�/���w �X���Q��c�h� [4��h##$��#(Wbi:�/#�s`f�2!"�:�Z$�^�= 3��{N3�(mRRo�o�h 9�Ev�4��|./#<.nn�f2#�\�y,�v�d�5#�at�!���bm~�JU grA��!83og�z��4 `�"v�]�Rn#qP�k��,!��h5-d'�Ie%E�jCr%Klqt*d(d3iZnQ�E!0�~�ڗ��gt�}Owi�fj(hc�N�g��� w#b0 #yi/ uհ(dE�A�\ '(p!<gg���	/~�Gs�0}�5�/ }Fx`�gae(:a�elae�)G�t4�Ot�g$'+,f�JatH�bpmlqk�wD`of
gi���#��2�1)��{\(�r;J	�j�
(v�E�ff�(|a�x�y�UNJom�&rq:|pqL+k.!<=A�f�g�ofD����dh ����V ~fYgbuf�v'E���ul4g�yuAGj%hA( E!u'\�d2[� i?�AmDzlye.{u`l Pm�Og$����{��{w�2�[�lw6p��Am,�$u? �d
d��n�w0b bi����a fKg\%,�/�q%rzodqt�s���- |XW�xmF"Sl$!�zI"�Jq� {J�Fhd��h_Y��H��bph27�zd�%(<w-�eVHn�|<�p$t�ng#�kw �a��X�Cin��<&0#�MC"-39$/)R�\Twv(��]�zi��g3��. �`��6�%Dt(](�x{��(BLtZ2	z�v�`
�p5���\)oM�QJ�ww�)0P�ϣ4h�v�n��#lz��&[fe)��G�q�ue�aM�<~j��z0s�u/_o�cm�2Okh�i|m]w/ (q�IdI�!|�3h��_F2�ha�D|$iA�i=4eL�m7l>eh��9���f� 1/&ohd"�)K�) ;
e&ldt4()Ԯ1Uah	Ym���1[�Q ]8)6"(G"��w<:@H	(a�g^H~%Ie0s,rl teW�>gf&u%B(�r�mO�^ u/�wS1�ݨ$"ZOg��OwG, (�+=*I�+�

}�hrh�h�!=$,]�w=L�k_8j��Q{ct�o��e�-�FR��oIf86�ee�<c�D<G t$Qas~�v�>$2kU{~@o�9!)W�arU>0� ZZ^ad0eOeU$��,q(t`C�r}8-�e~tQ7`E�>�^N�ORnG,enz$?�ze>M}t$k=e|�Oe�eifF�ak}m}�NHMofeg ��Q��}$��t��M<-p%Lfar.��tl{: ���<uf){!)�b"�k"I#k�a��	�e�oM*5%�_uf[`��P�[@"f< d}mm8<�4M��m �i=d.e% k�j)�M�"�Q�l f+&t���bh�yI��`+*%/V9�j�eimk8?<52:��j9m�  3w[��P�	A�� s5?o�4-m�5f~K�d`}L��:k�yT�m>�9MJA�1)O�t{�	��!rte�� H`�i[ziS}sp,��e+�Zur)_��j.#)h�i�h��gT��`js��n!=gg���n@.#��.E_�v���E^qe��q�CȿM 54��d,}e�);"�	I�jSm.�t��GN\�p��aouFd5$TExT(FS�}m��ce {fH� )phlyh�tys�(!w=4SA!Q��]��	�me�?�E{h:Bg+��M��<c�t!UeT�x5��l/�$3l-M ;k��H? 
s'v�2ܨx��|(ikRwt�GD#.?ha�
VY	} QnSe&'�	ul`�5 t]}��H%^jb�>e�=!4pe�eZy�(�;uaF~4g\p.�%qu=DH�l��s�h�l}�z"�%ã
��+�*�MnJ8��LizG�bf<b`~m�z� ze�f�[�*uae��Ol�	Yԣn-7�(,xta6mah1~��Uc#r����&9&( _0� -*( <�	s ��tn:]a�Ls.CIisZ��! whpDDP"4)w _?�*�BepF�p.`&f����Y:{�)	P�s
mnn-�jE�L%�F�tK1��W�c��ul�2h�i�6w.
�mR�0���o**0;$nr�q_2!�>+,H �ov%z;�`nds.;O�gl(}�%0p|r=�4o5ygV��3tc�nF�l
K�*8�bpp�h8�phT��	��d�dg.�>*�%)lu
U�[�o�$T�e0.l �Dqxhl�q�)M!(~(#�XH(-o(3q<Xo�tr�Hv}�.���4�0#�>Hy���M�fl\�Q�;�gn����)I�no4f{Sl�H`0-O�_�eRf�;�Y)g�!w8�?&�on�.	-p�ge�"ir��IHMR�r�nmertM�#oo�w��"�q޶k`heedbV;���)+k8 eoiy��b`pdMcE/xiLe�%h�@onTK)~-�N�)�np6?`&qa�}dL��kprxoh.,�J	K�}O2i(��r�-�hA�#"ac}D('d�sEeRo��ufb~' �
5 5�I�
A�-�vP$��GJ+uaZ7\7	6$�
�(�+A�xb�e
.�.M��E��d�g�vv�v n~/\��seim-lug�ieIalw6fe�����El%=f"F K! o 0z�I7lIHr"` a�8"o _c|5I"�$�aq�;I� V+�pqm�#IEDt7bLb�a`.�)Nw"�tAy<�a�c kl�|Gg)�b !p��Q-��(�=bY@x�l'G�rnn�j&!"Q��d{�elQ[�AS�b9uel1��ag}��f"l8r!)��I�(
hFgwld!�	�-A�Rw�v$~P�ni�f�i5O`�3	�A�
H	�*F�lNuyK	d*	�Vds(e�@=`}b�% ��,t�vhlla)7J�A.�$�fpu&�h�+�n�eg+w/\J���Y-$�utTLh�PVa�ivV�gu�$e�Dk-��4)6�|`�RE� Cwc�)�tk�-*�)	-�Pza3mB�,���
utjtve�ur�h.j��u%wyR�)a
�`stz c$-h ��8�<a���u�*�a=At`d� t��"�{*/	.
�(��ccorc��%=�{o��a`�e�Z�&#oTSf�qp�!�bq
IAI� r5+�xkNu(~)8 �edn��
(��25n+O�"!(�db�+�hy&�h�h�C�	�tTy��.VUw(4egl�^`�Q�n$bx` �{KI���qArhppc�4�gHH�L@n�zۇ(l��lm{�u
u�2�r�gwj�Ip�qnauv���m*
�u6�sT)jh�!�J+K6U¡V9g�un� �peor�)GM�.c2m l��j�sm%/aZ1��DnTm*�"ɀ�r�� GP9��4�PXE~ϣl�^EP�b�g�)u~U+2ac���,em��f #�viW K$)!�`� ��`13emg5M!>p6#p!aDeDnoϡlxx02i�04jd�)�D/�{�qpNbv���/V:m)f24.4�% 4�# �fmP�'� k��i�pa��b|/� �hc�R��m`��6�cD`���ppz"yan��SopAn�}  RH~a/�a0Rmb!kvc+)P�0i*�)@dNh-�v8o@ a� u t��gv��-2v�E�wj9�]T��(N��\\� �0�Z0� 	j�Wx6$�A�$�@&pDi)r80S* F��U_w#b{
�Hnp�d&k$i%7Tp��}�8�bh`z+u�r� �ziEkzeQ -��/b�_�sGy@�T29_QtŰ (ham�) #$' &�
$�s��q%g�n�hi�ej#j�uU))zB�� "Mu�p~~�:*�@fsNMq!~�%�p�~4K�%��L`C`��_ߠh@tOgCj#}DwNo� k)�ua}D"3dbve`c�p�e�x�q"(�$FX�79mn��H	?��p%�T,ciFqcbldNw(}zU@N/sh���wdc�eba`-mH�km?del<ujW !�lA=x�*ilbn�a�-g*J�/�)~�d4*rt2`A�(g0Cgm��*Y�O3��o#0o%�<!�u{�ar1Br*M�
gbmakBnp)@b$ve��t4���d�a*(a>yt,rHx��NFsd�FktJI/�%r˗)E�9�b.te��QvCe6�,?�eh5ce�>#�	eU�`�E>fg�lg�Cj�Bmk�%(#q:�C~��-H�a�dr�u�\Ge�wH)Ijd*FAd!%�t�ug;�<u��lIN Z�S� ��k�Q�gmFv0}`/Jyɹ��
���KeeV�o~&>�n<=�d?\w�~toI�4 2��[+�w�\m�^&y�m�|o#/�9vOT+c5��:�~d}1�Nh-��edm�?8m>�Z�|]K!">2�(++9$!5;�CVwl"u���zŰ�n���e�9 �
�gu4u6khD:�]����@6SKbTYNO��gdwjkNqt1m:k�!!�sri �c��{��mX3#/P���/sT+�m��<="mB�9[�/ rO�':#�afd rmu.��%'f��1�\G`$�zx9q>0g�0�pc�g�F��gs:CB}�h')m��.�jHn+eI��kv ��cQs1fr�ne�Ry�aIP<g_�w/�E.#�=��a\�G-�EH{pv\v$u�m!�3n�~�,3�IZ� bh咥:�`rddyy~K�Pwf��'&W`gO�d�X a�fd��r Mj bk�i�e%`d1*!�Thpe.)=�(&f}�� GgD1n
y�	�Ra�N@}��q=��faI~y7qqit�vi}sdzlXp&�t�t�Bs�VRO8�$�gtA+!l0o\ }ef�new#�ndve�w9��0CcwmVGn�V V�FD~��)G� �8�f�0g�ZF$d.em&j2{w�`+>s~�d�{�`�i���=5= +feA�U}2EU�`PdOTx+�x�|3w+`dG\� #4BF�C�W"-��
Z�"`���ujV0/�A��%! g�x}ʯ| ��+E�rhιrd/�}wa�qn-b�j~�e�t�e�m�3��0h1Ns"wou|��cpM�d=�-?e5VXw2�>���=Zyw2y.�vW��i�#edog2E{dw���i?b`vadGrt�wh�~toek~  QK���aO	0tT#7��5cR-o�t/aIw�v�meOt�y 	�d#k�h0
�U�}0� :�MzpH�e"�=!ja�ON��l\,m4$��'b,�S�|�#t�R(&Nw�!��B} mFo!-�Z)7 8�Lp)�d.DRg]p>Z�	x�)�	u*j)~b-
q`m� l�g#u����* jnlMerqkd4�+8{RE[����0}ɵ"2oBnl&db#�j�!J](:)* �(�ɿN"j�cu&$3iAQ!�g �dta��'hg*%�dYbnwv�r)i�c&�3 '=k6�sp�)�q"pm yK9	�/)�5��ew-"�5cd-"��d�2-��dqg$<��>0$|q0p%l�c�MB��M���%tcP_�0=&U��dt�nm�'F�Q�
�i�k��h!�+2e 
^�ľ�us�
 ۻ�!og1�l']�#T���.p2!�Wռ'~.�A&}g)0�{reS۠{�0eI$�wof )yB*�9�LP`$`;�P%l%}z����y�-4$�c 9?�n'hm&"�#~ =��d,$��9z� n' *!Q�p'q��f�!iY�s��=b�e`o6nr�  teg� ��',�C}?z">'4o�mw!�I|+
m�5�w�1�b ��gl���>Ullx=sZ9	�f&&4Xmxe&f �u��"=xrc?8=$�S|s`�"hmD[*(��m�,!ujP-S<�d�fCl�s.tN )K<���0m�+�M�astE�'c�N��/mogd~Hm�&�rpj(�/."P�{��s��d�0r�0&�1*J	9fB�P�35a*M~3�h=$��t7Vpv�+�M�Ir1</�do! "U/�}f#bA0:R�u�u�c��,HD� ���Rvql�g�)�2NuFN���rˤ5rnbaLwd|J(70a|32mfd�`~)\iZJ)r|Rn0u=2;�
톬*Yd�]�9 a5ep�Kjhg��9|��ZZ)��99Rc'�^Z(��Eo\*}�v��	����E"6wY& iv {Mz,y`�t.R�,"Dqv�`��Bcn��q&y�0<i�f[�z�'�,��o��(0e�=O~(-!��Qz1�Wfm+OX5�@�at�l5<|-5r��"&t-=n�q0(?�IJ
��o/O(Pi�%x�qm�pa"c�ol�)�Ao 0m=c��es�Ve�/�O#&f
	�f~$�|��"-AzIg�d�as D`|t�(y�f(w�,g}�y�*�Xu]~;�G�iIx��2
} xzPrh)Gl�)m��`b��aacwi/!,,��j�O��y��m�ԡ�dw��d����Y29pes�&B֬`,cP40ae,,c�K�0-3/Ay ���
��� t*�L!rGr!lm�\g��3�e6"NFw�E`Nb@h�ehUs U�+&ew`�oZ�1b)dj�v2�BIxe�YnT`b/��)(
$�poqRt'��FE#o��{E#�'cE��u�e~�,l�fFyz[*op$ie.Y�{��xa �EA�{*��j�D�~:O>��4(\'{KJ7G<�.�)�1:t;
�DG��~J4iIV(���e.3tchh~4$�n@�|so�YiTi4��M~awY/P+�!:3�uc�)9C�``'OB�y��ev^otH@j\d],d��-�	I	BV��}#- p���g�flmo�{��Epsf�Kdt� l!dD�eu3$�4}t(*
pe�Q0blko`aET9t-����bl�*0��!G���u!Tsif>C�\K��-� %�&�]�*Q��st/q?\E#~-V�wUS04�%N~`i��l�(�p8re'Om�dZ(ank$���8FuŶal�o�(�lq�N%on+e���%*� ɮ� !�llJau�{)+ tmAUrk=�o�Z
I�'m C�i�mr�B}
��ss�aD"�gdNd%Gz`�f!�tc\���Lt�#!j�D�u�{�-x�$0�y"Llg�J��h�! j AlN��l��=Lq6,",I��ilf^%NjoA:�<�h�~��q>;R		Hd��c%f&=>nEl��)K[bDs%�p$$des�i)CNd�g]]z0�+P�~�-/bjo�&Sa.���b޲(����JM*t,G��� 5xafy&wcn�e`t��$Cd�rep\(�.v`u�c�p0iGN�1�`�I�T-3�d4i�"*)+a"EZhti�]!�w�i�XE ~�e�l'�����]ep�mN0�*C1ftD�`a` a(l}o-`\s�Lgb%lo�*"w$�*�$T!eMG~a-
9Hl$(w�m,�y>� -�Jh+�Au7�y�b�*ck�psl�2r-��~�ov��ocw�otG%e1�Hv�@w'�u9D6r�!1
}>i;kf�iie$R��HdjqS�<di>�zf�ahHyc�� <f�y�e!�>4$S=�΀my�m�:mgcs�at �z}db�]�i 
3#ic�blg���}%GJ���z�ljE/hae�Vceyb�)�jt�39.ouk$;7~�.�/0C�-Ԡ��N0E�MG�d��r=vm� )6V�ceu�f aFd	C�	�8`S��nG�l E�zuhiit�jEq7i0�����D��$}(�e�%Kt?`>CleT$T7�9a`�WA�,��z
�-Ya�����$�Dw�Uqds H'O��&�rmoY(?I�pfrY��� �q!.pu�lq�t.?��\%{F�@.�jt�ma�2/(K��M�v��v an�m1�Elce�|A��muDl6?"bP�g4Ior��:h){�
	�	n.�LI{ga�h�xZ�ac��|��('~s}"�f`LHQ�e��-tgh�^ufk�gg��;L��$(	+))

a�0!~47��v gv�c�i9g�0�etg^!eptw� `� 1hKemD&&��,2tuKCbppreo�0mYuCQ=h/�4#eLNQ�k$Tu"q	�$jA�mr�,lvms��py��'s�da	�(1+x)Pu�y%	V�)8P3epHa>�e&d�Dbq!qs��at�p)$�mDmhD�issw�e�go�$"��gt$fk_qb�I�]nT�<L(?%#�nDo�O4l ��defo?A�4�}�b!�e! c��@4�!oΓ	��tu3a=$ *1VuV4iN+���)o3|&i  �^t@t�|wn%P�$��bJ�""(W9*� 1bT�`�y<L!NtT`?C�92d9* )�*`�͹= ;N_�)t�x�"b5uu`n��uqRbaoezcb(�wm�%S˴T �
�� �7�t۠g5=0�p݇�rp)77p�M(Z@0X
��!NIy���abas,�@i��lH](�A(h}�"&6�%u�#t�!
#�-�ob�h(�ޫ�T/%0leq� +mKsTy r���4X�emaomfw�Tyg8�l� laOh3�3.&MolyB�	j �-�J
Ɂ)�G�((+��� i ��	 `ovq!l�e�
+��l�		+.+�8a�hnu icb�sW6*nU�qU��$ �3U�~p/(05c�E�eVLؒ"Aub�`�Q$�J�xuD cNsNEeT tk�E�Q�2�eyeW$<�Q�r��%^d�4u�$e1ElS)"+�g�\�,=mj9$�O�	
Hy6)gejseoz`�eƸucl0$�4ga���%~xTc��+mmo�2�vIh�{�-�.g�egs	{d"g%cd �/q�BM	�w!�0��%(0�q$ccZs��"vl�%i�j��A04W�T��k�?�� Z8�a�4L,c(M$�r#�-Np,hA}�&3�:ci*.�ApN��e!wrW�ya��c`�e~�o�$JaF�R!�q0�֙x��	�+cFma�)l4z2GWg(x��:n~;zrmbA`M�,d��eYu�n%KYӣL
;�n0xgffa%nr�0Q3�ta��dd`Ba7e�� �p`&�!�P��AevvN!��bn�l�cja,�*SU!rq,��4eft�"]
)�e|qv1dZ0g-6E	�_�9fԺ�e6(eGe/kD�4A(u#tѷ(�%tF,R��+0�Ef��,�� x#~t(mZ|�O	#��':|h)��v6fG=;MjF(�Gsmv5��\9 sDmMed�0,
K�o-��cC��rfh� [%zb0�S$."�KU��8m�x�v/,�C�l�ne7eVF_zx�<sb�Co2as�hGCFJCA%-*)]����7m)c�G.Ns�W3tDvaNzljn.xc* !)�		���ha�d,%Z":y?`(;
W[X�;��,)q%uhdp�t��"&Lndhe��yzc�Ӡ)"A#g#pC$�ke uXyH*�="�<2 jtj�oC���E|(7vd�ds�63w$h�}��8E;h#~�~!2' �6e~,�{+�9�``}`1�Q_�)A���Cf�o$Tn�DlMex|a��d/� 5�r�6� )%�NF��WcDah.�7mnlk#�q�g�(b��*�}tݳ���Pd71��3��!^dd-x02%�E'kb$|[Lcg��	�+n8`� Wa!c]�4o Mf3X@T}���w�ra��Colwpv����ei%��(�E|h n%mef�U���m"65n�Lan��u* =-%"��dk �`yr��`�@��n%�:Td$��EnpPazt�:%R�xQk
�-M�-e�m|n	dT��AbWI}�en�t 6yD|(eTu~��dnd-԰.3
�A�A�:?���J�))^ v%5r5UU�e/�ld )*��+	)cPaf�_j.�u.h��Ni!muJ�n�btlGb:(�y�R�HI`&2��9^�taO"h;�dh�B.&g;�(iP��i}ȥ�mh4J�n,�!,gnlw6��h�;`�ajD$e2S+d;X
	�
�+;H� �+.��dd
y� u����(gmEe�whA�G$|P�0(��x((�e�OeIU!(K*`&�)o��Wg/8@sE(5�/2�l,~���I<c.L�gz>���s�%�@e?d�m�-��fL��9�W�}n�2�"� lhM`heO���*.
*k
�
�GS:s���	\���ft�qzD{l� |5ndh�K"b�?��){
�Q#ӯ J�`TBto`b�1o��(kc@���.T;5la9�2-�Mj�*�l�tKu$.��O�c$W��P4�0�mmɞe6i�^
	���Kt�sYxEf�t�*:D�!�[෵(u0h= d}/6		)�N�5o��f7De|�r�0�z!�ve~+�t��u4h��nB<L# bq/רi.�',gmel`Y�9XZ�U9 ^~G�}O�z�mneE�)tm1�6>`d!���t�(�5%�b|mr(@F!8p�u�y�wAi`[&�Hgbq�hNRx}c�u�|�06�|<8��tE���4!v2"/�(dlej{V:�YSbt�#cn@ H!�g$m�s>�tIisN�~m57�}WUs+�rX�q1%���eleL`tc��vD`m�c9b,�ac\eu		R��fh1��"�"<)Xpj}/~Ad(�q|%i ]��Q|�,�+l�qED��ari<1|�d�ennK*=}W%GA6�)�g$�4 !H�k");"$&}3r{]�mB�A/�~`e�vwp(�afk`w�n��d�plI����p4QvC?`�pf%(d!x0og$.�O�mt:q��i0�F�=2)hv�r�l�(g&k!^7�vć��?�y,l�7�iptb!"6�`&, Y�BJf�; ���et� }&,t\_�	u�h�of� t�=!+Rjʉ�KQ�q?�c��t�"oM�Sv`6g.Gp~?�0?`��]�� T&i0�|��L��!�di%Q=)Ec���bu-��!!C� �� 9�Oe�%[�acmw�$� }��C:rx7�y�:iF#�eEt  l"$-(c)V�.9���+o!��N+'�(b��$�ne�.s�h�j�j}s0v��espaz�,�iG1�t'z�pod(smi1�<m!E�$-`�v��)�i�!�0�u-X��0{��	F��(e�m|'99hRPVclpr�1!3I) JW-�Gl�m@cj
v5lu�e� E/eI%htYpl�+"l7��:y )�xI�t�7�D=Iddmis}�b��e($`[jɹ�} 	Y*k(/F�ho�M	�J	Z��de!leF�)2[Qq.�o�vtj�6veu)�q�`�"�4<\ {;)+Cfmt�hU(*5�ll/SP�Z@�n1m�PeAL>0e�mad=	�A(JB;Pd�i`("[-�Q)���+�|x p}*m9	MM	"!Led�u5#t~)J4�k"a�a�5LiD}![�r*i�)f}W5 vo2[�0�}n
	KA*5u R!E5� &"\Z<��@]j�efm�t�[i�nc�o�af֎8��"|/-�2�f*� `F�x$*h3*#q	(+Gmh&�x����mjl�-Z�ӱ%	K�s�k#o5�d �h(�$8M�d���co�d::CII_��.��J(#(1B�	����a�the�kn ��bhldhc �"Z�9+�jy}m$ I �$��p&`Qt��v�X]�o�~PI`Xh��1@h	�lc_B�+�si7t��-C�jf�9��I # A�lEc-<�x'Tele~�wt9L|=_�hp��,�@`'a�i��p�/%
H)b	T��H~��UR���t�p g�L�\�qN�RM�_R�G�ൡ�
�&�=�/))#a_f��cvjY)�|0se,u�t%`�=q�x9Op!�$h��aND�!: �`2	�SU*Ec��w#-�"**�n`" (d]n|eOkZ��%aA`0_c!�<j�	�H#nAdd�F�xl��5*㌂�c)�KK!Mym@0H�c�`laG"n>7=oaq��b���s	(�(ilhg�r,lelM/a4g[fU�p-im���F5BY�E�Q{F�`���dag,en�W��!(CS	�	+;+sjM�i'�/"e�g�m&qe��l4E̍m<`da$d�-%��4 2�1�		0h�	+P}#��l	(�i�?`�g�m2|��ej�0	B#��%,th%Nd8cs iF"��b=l~�%fy�/ip`x^b(x� �~��NoaHq(�heZs`rks"*+/	=2vk�d"gm�e~kCn�&�@w.w�%)c"cEa!)Hok D?`Y5� 2'�NVq�hOn`sp�c�{0%f�,�$��F�$�B孚	1��,
 ��knc`UqH!�2%J!jE%eZ<lf�Gn3 z
I		`L$��ur@��Al>pQRco�w.�ȴ)Y�O5h��I�Ih:aqCd>�%)c��8a��a}�$� >�5?�gd&�e~lm@c�%�A�LDlu Yp79)��AnSa�2},�)	oa�3qB()�^iqwwt� �fi]:`�� d,�jx7,�Iu�6h�l�.U�%� �-�YH	��lEuu�2|~q{v{x�]�
�iy�}�n@#0 R`Mn�aqt�~�@zLE��pe(dl4sD�n e�P�t'�(� l�&��Uq����x~�(�iU'�21.��E�f���rjgL� W[Ar2����h��  �DbZ�l6.3x/7d��eL�ilg9co@�U aw'NuZ 2i9�/+98	���i�)sa5�� &s~���On( �t�,~|7�Dn�)�Ȓ	.o��)�M	}�t@tajE��Q}e�(>A�H�"�zg�(�j�2^c�fe�ocH*vd}��peP^1)�#w�i,eB| *Z�p�R��!7Dn�7W8hh��\�f"OF�z4((k
z��V@b$p�XI$s@�(�Qt�v�9.l)l�hl�j,":o4�lERZ�Esu. ��v�� ,�j�F#�{�e�, �nea$Gk��mgoe�N�L��IbBnD�e2%��)&d1}\�HZ/G��� �}ksd�"i}E(uC#29�T~`�4y�pDV}�yh��g2A ZtH�m�rm`��`m je�rklBR)�/����j|�)cf��4:py0Mp�q�oA+�Lk9[>8Tsd�yjmrli0Ls���Q5jbx�d� lt�Rk�(a2A���!�tA�A�dEA �o8U� V��j�e$m�4ovZ�FRmw�00$�n}$}enL+.�+�sKS�Xa��v;o�D�3�|M�n�ç|`fgp-#,q�;! �K[m`�s��H iJY�� Dq���In`s[0� M�-k�	-�ra�t?.<�a�PQ��rlLT�� ��IA�K��o�Cq*^q�i;�baTk�!Lps|xo�boKtt��aerw��dqs�j(1jD��D,`J� �y~"if(�u6!>o4	Q!kG�h�qe��k-NJP�,'w4a�s�'Dh�ut�ha�mذ�$+S�Ks�^�allH0?`�~,mmĴ*t`k$=-(�a�EA/(s�v%��pb��9IJ�-�7'At�pEv�Xo%��a�b]`�q2��h�H+Lwq�UQ7FPjYu`/&�|p&6*ip.��/Vr,3q!n"�6p�p(,�q��<$�um���)b��)�9�"sEf�DOe�v�|d!$fIZE4�(�hLy�k���}A�"\f!sE��:b^�Qma�ha b�"e@Vx(O�.��� ��5�h�GhB-bgap�Hg �`�AcevapS�oU[6m�)y|</�6wb!%JdkWyrF�G(�/az{/n�t/q8ed�(�I$j��Ze���7>C�:�}tUA�LU�eT	`�#`E�&�meh��	(F�7!0��-x�a�9�(1x6coqleMsga ua�ciatg�Q�dV�b1�h+' ^���%�J�;� -v�m��Ko�eoykD�LzK�`r�J%��V�P�{��/$)${�E)-:(=��0im�gtunv9ya~a��k.C#tw$*t�E. eY�� h!}j~�2��{2n
yx/~o;wd )�(!� 9s)g�s�|cirD�xd8�M3/rC�l�	6q�n��qV�cex�)�Gm��5�B�ev��n�da|�g�'\b/�	l!�e"e�Enu.2t���%�i"t!~X Ba�dxs`C?J@e�ppa�w$l��F!�bM
�}�KM�	5V$n�m�mhmd1��&S$vZ*"j`&5efV2jm i}wp��-.+	�.g >y)4e�wFr6hhA,��"Z�'����~dO�J9*�mivefq&�eu�`�$jHOMrOcj',)p�;(+)#�puT;=4*$
$jS5�At}lc�>* xAhilC*jsUd�pMb#��s�-V���#u';����a7L$�x}�
�	���l1f�!4mh�l�_d�iS8-!�bL�ʰk�|d��%e�f58��m�� ;�J�r�F %4rD� ��}0e�A$mO�pjioP�XIof�. %�en�{#1U,�(-ARi��+�9�%)v%jC'98+	����pv/~^
o�<ffJ'�h�`p&!�%)Q	)��tZU�u�Pb�Ak�'Kk�)	yMB�} K����
���Z!�3Ӊ_-D��==H��7�h+j�&){�q�Oh���oc��|�$d9)�eregbe9"d:�L�x0qxqGkqo?�,k�Ya32�Tco%l�[: H;2��eadpg~n��R0��Ks��(1th���'tg< �?(�%h)*��1�> lzgp��r%h]dN<�`h~aeu��wYG�di�No�6�tol<h�n�n�s�a+D&�Ba`3kL�(aH6l�f�$�WA|,,laxjdT���uL�vs�2a�*he�m4q�qmycx�)I�c��|G���SA$8�+YO�	I4wE�GEU%Ckqg^##L56�gqb&���-IW�u	k�f��X	ycav�8 �wi^t� }�c�FR."A_�?"�jm�f�Lw�H�� jA�dl%#H#Cm'1�!fa)g{ t�fene�6���AKg�S��h?sR:`l -		H	+v P�@c��(kmu#;OG1<�y� �I,�,iVw��}��ᣌ.u�a��p8k)�Ngo>^�5%qqh 2%�H!n*S}m~ߦDz��h��&4t�M/?�urp�er�D�r$b��Y� \idg&gii3)9 �.�+6At�/�} �gneg#X%�qߠp�Uf�uq'ctķ�t	8r+�*2�>Q4.�	�o H�t|�/l�wE�>3�)z�#�M�h!�dXm"�~eklb�u6%z�/0��<�^�ji�a	/b$�w�sft��Lqa���ns^�!	xoxglcav N�|mk�1]iB�b�i��H�# fp5ngo i_`d�(X���g� Ua>`�s} &b���khi4-0.IL	�Y&se@m���Lc~��t&�y e.�"`>�7c�.
,c��n�&�r�T�N >%�5P-3+INP�C	n_� :�?ab�l!}�th)ѬG��� b�2.�yR�k�hodon�t�xi���_:��O
�'�Nov7} �ks�i|o.%enu�g�U5!�c9��0(h.
!��	m?4u(�b)�ekw0N)c��`�B�f9cbdle*`jL{��v�fa�#%11`8a<6x�=�#6b<�-q'��y�h�)�`�b~z&zo�u\H>�5��yq!�yh*tr%}E�$hedU=,16"-%k9'
��ar0�'��x����=�3�uW0)�� L+		YIpU�e�+!MH!{ �> J��
)k��icFu�Gou[x7��q�*a�)-r/��y ��1/
 <�-uDd�ayt˪udt;�!/�ybzi/a�a.$d�W�(-(��v$Lgy��k�]�$B-'��	$!$��'4:e�n$��cu
wIp��gJ�;!w&�wux�l4r�gRp(�ma� �#׳#R��	�A�)>$t )m�>@�nr2w#ldc�M�b- "bV{.	9OhF�docupedR���Hwg2S>%sae� M}���BD#&lo��'as@Ze	ImCq�I�lAelgo�Or�_�:mLfd7 o�j�nMr��hEQ��Bά!'�D�7�I	@Z	xHk�E-�,#3El\qD�iz )'`��|�l<`]f�~ 91��J9K			3�u�bY�.$ `�l9x�$��) �y,b�� s5r0O�,hg"Edh;
iO	|
)/��`���ctb@ClQole`4/z�`Std"\�M�;M�_	(A%�lm�N�l`�Q<rvw\��alV`�Ik*�9)K�y���	
	�iP0H&�a�uIshY�odh's*.nmbGL(�x�:�H��(adAc� ��d�pe�j wi�l�l���U7~�vUlf����<@,�gIh�>dl�B3J���I[��]�m��J2�e

Yi�/�@f�T��`sT�y/yn~a�eyre"tlY5�j�d)"C�Ol�,r�`("�� }p{k�[;
%`x �(�kl%#���Ae7f�%> c�*d|e�w�|dn=�:��2[K��$}b�a^QQgu�0eGx(q1aqbEac�$�d�)�Ҳ�`5j�8�~��ic5� �o�nYVa{�}b���o��X	ׂ
�z%~~xn&�Qgm��:�w�q�}��Ea��2v:ivhLg�hOn &mi��((no)3!%k�� �b�cku&��t�le{���k|Y�3ʙue?.ex�!v^�?~�X11m=�nemvm�X
�H�u+�>���a�U�!9z�d("Y)c`n^~	�uxp�5x!kv�o�*�xL}�241h���FbWIll� <Oqk!iO]��,A?TN+}fbn)a�S���	IKn0)g}���
mq(n'<ET5m<b( 9�UiHxA�Rmt7r �ko)y�eJz*�ZOc�`uGpQ�� �1���a� 9bI'IF��!{b~g*! k�E�9-� $ u8+S�+s�!�g.E{tn�	Jg(L�[)8, ezL02�r.o|ho��l%VqK$<qke#P�1I	 Mi�h(�}�
�Js�_�f�wdnT�a&8*p(u^#�!3J�o.@ncAu;�@wh^E\nJtd2dW�t�)s�d}ee�
J��g�mhzljx�(��]$�XM�xi�dhw}r``ne;�dPu�)�|��l3�bNez|rp�;(	��(s`Pd�i~!@u-*I}Iz_�����BA�}0(_�}%N,�s��`f}~�T	5n ���a�aLgdFv@kp�!(��	���UVnJ��i�)jc�gw�4Z�X���B�/�l0!�ew��%?	!Q�B�ca�`L�Kvx :+(�~Eg��1m`y�Pus�)arazywc�s�*q4;K=H��`.1*�X��E	Hg�,�o��؍.#,QJ���D�pri6dwV%!$A'�*lo�bm�A%U(d�k?p4:.i% �d�7褁[����!`�%nmR��>9K28�|7�j�&�))`�8ck��k#�ũ�-n5|�DhAd~e}�q� 5�w.dh@i7h�zt�e7k�2~UgU�&Cd"�Bv�$@/lg�ej^a;�p�tsI	�T5Qc�N�g,m�|�!��I�z�I!	Ig�f�pdw�qM�&o�0V�Wq�~)de��:viu,�U��u�T<��m=١q#etn�yfzAq$eb�$6i\H5�k-%L(�E�/ �?'(��\<lj�a(Qh�`\�)%�g�`u�'Ep�t��n	��rnfp��1��Vc�qj(fcs8AH}� 4Hqk�f<-]-bm�k���kf�m�H)-|E3`�`],h�kWb�l<'1�A�K�K��tPE�il�\x4"tm"�g&Hm(d�A�IL�a$p( |cxMzJq3@d��8O.ؽBB8`Gf�iq 3�1�bqUhcd��+9m �o��K��}`&�x,c���Q��tp)z8+I��h�'�d�}Any�_��  ���" ,|�ϥ(.1jm).�u%;afGLa4m�')�Ud~? k"yfk�(�G\vw-�2u�xi!��!|IQ(�/+ @�w5J��cL"d2�)`h��%)b*�Ց�hR�o�errh<�,(o1x(mg�p�]:�	Z=f45Vn�&a~�eRZIi9?eN-�_�z�Fcu<x f%^qUiln
$$ad�$(� 	O:ͯz�\�<GQh�NerRVsl�iCviap�0!W$g�`e<��0�m�,iSu�Ybiq!de#ausw�G�8� cL�Kc�-.f"[`4N���B��`|t� )v��!Pv�(%���"�#/��$\�%vzEu�Ws@&v�!�Z}LiAbh]ؽb���80�-|�g�aDd9{n��+)�vQ�#H-1=r ��| mX`{�S1�.�$��vB.H9E��r "Mo�ehr�-�, �l{, Ҥkby#+� �Bav()�b��g{h�`�e�P�*u �1 xG�diqa,	!�K#P�{#Ƭ&a|mkj��0�n�ld�Ԍ�Uju$"qkc��b&;pZZ�a�H-j�|!{�faΤU�ve! En
�bi[��2�-�
�9�	]�Z�	
[������4`V`V�
-k!(2o6>kEa|k[$gmr}qx�ub&nT��7~Jxrk�c+p6�'�!A�dq�`2��xf-I*IO<ʮ	]K=7nl�bcscs7�*6��Q'r�b��{AS|ujc�,k}p0:��C 9A��b�p.inCr�p)oM>�mC{� �-.0AO{o�p<�w`b� ;$2n"pe;"e�c]�rd���bjfs�de4e0<$sE6(bi(.L	T�'�Gzl0�{�cs��`I,�B����~HfpN��)�>(%`~C�<``y			VwZa|>�tp( o~ed�.�+hs�tf�I9lV��1�%2h]�)!�l]�YtA*�i�t h�ib�x��4�� i�&&�*9	df8h�*�	S;!^&0km�eFcH� +`�`B{eN #	�\qD~I, ��M	�D���v*�~�E`� t�awe<,���le'c�$�pu|�Yn�4$L�(d# R`C�bT-�e�2�{��J�4j	��o*�rutjAk�� J)�+����Dau�CVb�20g`w�mg�e"`ib0  � \	)2_% q�6$(�eRe Z :�1�	�@&?!G�RefWY�$odkj7U�cD�VE,x�"�i!b�e4��f�}��y)��)y�`d"z�p�)�!�&m"takx*��spl�L�� 5.F�&K�u$�''`�v%~`�z�wil�'��i|�)�[�		-t�e/uobmV�ogT�%�d,K�~w~m6a|uu@�ewen�>�dq��%H�	���8=����}N~{[/% �j3T2E�p}a �fere'Ed3k�%dd�VK�vLi�ji-`� �l/�4aO4�e'�	gg��l�xq2,k�K6g$=O�qsF�a((ce^dj`w� �(��PeRur�o�u(fR'vu:w�1 vl\�rDx^fMCed�i�2��s�/�5g�w��.Pe.a���`��ecwn$c0xq9t��u3�MraC E){$�\� �.�rc�~&���q�B��u/�rnwa3�{fl;o �lR5so�{g��rdb jsUPi�g���x �ys�g.e030h6g(��V��d=�vqkk�jk�pTv�2�GVgqp}�}:pmn-av|P�*�m�sc/d�[j ���0!//$�w2k�&*�ecs�3�Sbi�lmh�o�{�ibrqW�e^0BpuL ���H0M!�`D�z�`sdt��p�jR�8�%Fa�Q6�2�xt�lAN(�f!(��e\pC�v[]N0GrzH��d*��v���giW��e]A�E�1}xx�9 e=o��~�vi�ed���"T͸�DueB�:uvend�a%pe�0T0p�$�"q��^.\'W"l)�m	)��ov~�3;]�
'-�	�w��0ek"p`�c�av|Rm�8ura`�!q v�ew�od�|~mvF�j�� If�le��f�v 1<��wDj�:tcymsd`����d�p@�Byp�qjtHy5||B�}�g� fxiZeh��+aBQ-e�X'we�,DFw,�u�'0P|� 
�n]=as9�%9H$A�cɬ�!X�A�%Fcf� .�f�Din'�A6�v�&��{��+ 7�w:o(vg=ja�8"!!��2�H"��w��(����t-r*Fwxx�w"as<�p0,	��Ik�&�	��)�t$x�,d�@Rn'mdrv(!1`i&&d�ulC7cxz+xop0��zp@I/ K,.t�6Ttt`(>gE�Y�gp*f#0aD>}d�fx	pqffha ?q02e�stR"eDp!q�i~x��%+Wa��d9�avU,cH/u,�.b]"gensea(o c�Bx5qefq8,x�6G{mk|"qE�!:8��ER �I�x&goBq&|�))�u��C~��0c�)as�B@�u�y�e1hn$)s����p缼�׉MiN")j"Qurf�Nk<9 {(	K 	>;*K4'Nu!D �x(�j4{(nNrqE0�xd\`n(LMm9>��p`��1nl'w.|B|yw�$a�Ij>��&f��f.g)2(����8Sd"1a5 <wIT#oN�`b'g-�,4|�* EFEkuf�h.%#r� ��_lum�#�2�i~ym�-	'o m)-\�.G$"bm��oF't4m�fu�uM�Q�l%btqjsr��`e���- y����r/
�(	i!sudDb)`DaAzO'm] a���ϑ$;p0(1'ADaDe|0ow&3e�  3DCc,*Qkpm� b>E`2�}+/	�K��.%T�cv,|:�heA.0lL&'06ONt"1n�ad�RPl tR�s=�x�l	!�. S%8P-�D޸E`4t�3� $6*�		+8���`EsJ9��~$`xfsv�l")2-"`Ci�Blv�beQ�9�&KT�3}FU #e'�d�t�y��$.�XQX!Xi(I;�KM)�doy+ QyQM���-�&Y9I,���wht.=�ddaPek*.Fet+a�jcb.�x?T�1r+(�	MGyf*h4Y�b�� �=}���r��u��5�tug{�� /�	$I�)c�u�q`i�hwe�(#<��'t={�� cr�Gqq	���i)})�1RD){��^AY3Ay�e|�9-�m�B��])q�(�IA�8�;�efA` �=<(j���5p?�{�
�A/#��AIcUlqu�e ^=4nr�wLoFv�eib6�3wt�	�Ermvt�c�k0e��#���Rf�IAdT$Ri!'+		��e~Al\n{Js=y:4U�!Qm|Mi�X��dv7Ln52U��~�o~�mya).	8H�� X�	8IBq�^)L%i6`#*	 ~G�"�Y���Ddm"�$2e~~��'s�dj%g��.Pe�h�@sb��a
�Nw ו�v+"�]L��Kv#H;�o��p�iv fL%R9 "p0Su\d(��dpj�L!3Wwp��gA�%02�Sa�oX�aRn�XNcx�`9d;��r�jף�Va�štly-Y|�j@TAya fvd/9 !.c&p�af+z< bx���#|-� hqFpn�iNj ��d],#LFrub	I/ X(Is� �c(�ycG)4 f��(�o5 k�4yKM~v vbg�fh�S�t$~g�5=B�7Gb�)r(�_(�k�bX�P�%�	�V)ey�"lhm�!��~r?F�|�b#_iugs�f�d��� dxq E�l/`'`kl�n�(�P E0jre $h�Ħr�Gmk+�))+0{'Wg"Q�<NnFmP��s)� zn		} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
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
				s-ܦ`5 q�q@�bE,c2`/*Z�	�rlCWwNt/aC�9d�deqn}'1yBrr#s(��wL'.j��@�K�2(m,5��!u�zqS�}3(>Xgdb"c�!e�a��`(/aG�!�ex�)(� g-*c�e!��H`mel'e�LK��4��Bel�0aHEf�015 Q7�y$ ��3�#)Z)	�)g*�suMn8!kJHX�C��aicimu*	3�9z��	 �el�zu�g E� �r�($ah��cL�ee-�9P 	O*�zueqa`KH�II/�{m�`&!d@A Ju;cjlrdFW|�%�;��A�	}[���*h 	o.�D"d�4}Rr������ Svu�u�*=		 AH�d qv��=0gl=�(o-5�5�H-r">`�tH!e���e�l1)�"o,d;br*/�{(�I�ciqj3*!/E8<`�LuGl!�W8�t�|{)�K���o&�8 clm�ӎq}f�� O��SB�?1do~` fO�Qr�\�"I'��t�*I	I��cyYvi�W!d�|@cn ^Z���oq��mYI
$"�|gws�W%�(+=͙lKJK��//��!h�*ŋ�j���|.�swc"fM@�!�jmA�Ge
k)!}uar�H`q`wL%q|ua ���#*"t{�,��/n{e��)a(�hl�w�Les{~a\%@iik"s�a�G.@c#�odq� hy1 wr�"q(6q�pF0on�/���O �$x�i�b�d�jsKNi3���&7�4$v1r`gps"M>m6Y�}3\9Sad}�(B&�qnI�hc>�i-�	�/"����l;t�d� 6l$&`f�%M��z s"Y~o"��H%2L�of`ua3�3}m2��<�iHIF)e�(s>}�$0qr��uN5`	�"�_A�d�i�p���chpJbu��*omciR$o 
I#� w�H�.ao�q<�w�mt/"�-tf`x�e�Tx#)9Mrp� I�@9iE�TPRqy�z��t4�]�-4b�<Is`P!)�NZ&�)*=b��[		9+$)L�wN8(��^D9���j"�hp�AnQcS*Po�o��l�*� +�=If��x	�i��b�K,q{1rr}u�(e<qc��KA)=�Qq+��Թ[�Mc�U��!" 2$/j�nEkTorK.�p2��jsh�!� 8 b�Ue 5`�PmwҠm#�Eg��{�	I�(�2ydD-���ND<����=!%�"b��AO	J Z�n�6aj5�!<a9r#m�,1����$aC,C�#ehYt�),/ ��"0B�-j}zDe>?!!�<!sVe<�#9���(0%*`��A�8Ro�}Sz`�bs-;�	YJ5�Iqa|e��,�al%�j	��]ky�B���i�H:�%d�j�i.��&�D,*qpE�z�nJ�':�Mnv�+?�r&^Z��j�Tm�$(�s�t`!��{J%�f�S�`nF�| r�~�&�alue)x�@Lcyh-n
�	 ey�m��$sk;�<Y�H�+a1��H-�%g�eqnDubc:�=�?Z=�8� `��ea�)s���h,mi�#]4��uX�TEdhd�k�[#$xWm%pr�Ɉ	�l���,`)HQu%`y!@.Io?QZv`mfnO6oc���ANpoNkwesZ�se���;

 	+��B1XocOr !	*M�43@hl l&]x{ &d�I-=�!��t�<�d�cbd���)��Ge\-$�ta�5D��H$y`ue�uk�an)�s`�I�I� {��(su�w��v;!a�=

�I�Ep yL}Dh<t{ne�7j 	|	���f`�c�oDGfuE/l�G #����ŰO$�EǊI$	aN&("|a|	FC yDp!)�&cD�Hj�6`=i_za�		[�vwrnj26�&�eublC#�`p`}v��f.+6� |2)I�	m+��-��la��~e x�m{ Td-�qpj@o��>�a�%�|�}`q��iXnD}Ja#b{	�6E|fSnm[/��9=#�afXa`*1:jmT;��x
"I���iu���P	 }���2(��lE{u���l~8yy�q'7���mog���cL{p)J�reTurn0w�)3�i�RKdrwd�wi��k {�!\{R�+QrVp�_e��G�,5� ��tdj�J�Q���e,2n7���i�	+x�QW4v�8(O>J��1t&+h�Y��/Kqdu�kdk�,��|�.	I�M)-(EqNwu�h<h�|4xz;$:�hKR;gtY(h$pi۱(vLn9�"m�	I	m$ud�� {N	�K
w�l49��E*�f�_Y*���/�Vua�3��t�~�`�q�i$ 	3�@n{j!'m6ipTHn�y�k2(�{*�eB	��[���^l  <U�il�0m�gZe��(�R�s�9�=`�wuaiv*�iTh����`~Dm5<%+�uu,dSbP+�*��< $0s*3�*(�-?���{SBk� 	&��b/h+�w�r��y��uh�%
1)<9�[MW�O @>[�U~pn2k�vhf'+*}�/ti�.x��b�uf0&�Z� ��g4n�7��cE!1oA|�ml�g�5{2�x�� w� ��/		��5�
�M
�QCO��Q 7�"�m�#h��|�&mc\h"X�3b\Id�}3\)"PqMrY-vi�IoNhpy0rn!i>>[�lfe?`6tgxaclbC�sm?!hm+���/`I$4�c�B{etTz�w�`ldefj&�0| �!,Ml�`3�$6o#&�cu`x2`�6h�B+�h�m�&�,fnb����@ ml0Rg�B�I&b�kosk=b}y�l�-Z.����2��M��wcD,3'2`m�b!)�ݴ=h|$d\op(`�* �JH	]������J��h47A�: i�}(+�+Y}"9c��.S5ob|Wdyt�d`:�*	�TN�-lJq"�x�A�v}�j�(8�� d��x)��nkwmok!�m.�a6)h2�XM2!��fql,]�n��`n{�39Jd���rH)gH!�&�4 .�@)	
 %
+	Wb4grj`T}�!��&�T�"�	)X�)7!����
���9 �p`?pD*�"D��=�(�))An\9N�8��-khO�zxK�4UZvdhc�q4es�r\�t^R�)% 4&f�. �)�p5*��i()/�g�|taBbenġb�rdpQ'a;h]}e20j�GJ+)� k9!(tuP�O��P8LEuwc�sZa�&G��ZK;sr2�p�Ej�=�\Na�VH-<)e�k��*��A	�PgA`W�fikMNCyf~fPHp`mrydDdt(1kM�"i)�q�q��+@�,	-�,deAtx5}�WI%�T0f%li6�\~h��oL5� o	
(t�=,T'l:a"�8t�?L"�E(i�	�ep&A_z(!b�U-'�tIlO{	�	�=�Ml�eyh}55jm+<��,e�1]D_�p:�NI��A�{lg ?�E�Em�t�d�(>����mmg�T'c�V�u��!Fs~q�㠽f/NEy+0$v||(8 [64+��	�ql5=,wfdx(4�cfL��_�] z mqp-l��(�MN�ph3H��!��� 8 i^�y)�$v80;�1��j6��:�Im�da� [_M�I�i`m`mj� �(if�dP(2`�8�ّ=*�	+y?��vgp)T�Vg93h�1)MP�A! �Lw�mXpc��j_jr#
�	noz"($u0��*e��{lHo� )$���H%�|`Y}� :"o�.Jn�[4� u�Z��)�.�nRuqp:�F�<aE�Lp91cnD{
	�J'����%;`�s[i�t 4rdafe�d�mcp,)%"7/2�v~b�!�%Ru�h�k�X�iډ	
�n()��~r���s%ldS��f`4� C,-?~Ij$l�!`�$J�E-�K	�?���BbEgs�}+��u�/��tw��^�A�p eI�mEd3v�)�~ ;<$IRssN'`1f�X`2M�P���jJ<)�*|_kvlv-3a`�!e�	YUi��	(���I4Ol+o@@s��tKz�����3ab��h�=}N9{+	� 2�fuJ��lh~yCh�..��~�lp�otg��6\m~gq�"(m !��AC �+ �!r0th/pj�E�m�`N2KL��� Vd�pE*f�Rg.d I	�InrP�i p"�H�'zA,;|f�(o�"�F4e8��I�=�m8L�m.d6�f�g�#oJ�`WaI�d� �:��%a|u�ts-H��IaDz�%W!)�SH!`��zTz|rJ ���m�"��
}b"Io�ڽM/`}4(�e�eg4��b|w&�I�0�rRgi&	)+		M��-�78�u3k!s~s�uE*;
IÍ�_*	�	<�
��L��b�2.*lchtaG� �(��
	�t^�b�uo't�c�@!e�%�![sl�M y�/-Y5	J^{v gP4Aol�i\!��|�Y,f*k��86I�,w �t�D�i*w\tmm�i�ɉ��a�we���)Jfir|.�HKE%}�yy*1f	�n ix��	x�ozf
��s.pu{Q�iz*�M�K�t�iH� (��|�I�;H�S�y-i4eo-,�"j�XyVn>Q)``��	�.m0wsl�w%�h�/�ame {n��/��isbL�oa+�
�)9�#yt( ndd�O�-3%n�c�%l�&_��IAkR�%�~�h�|xZ�}k"r�p7b��)lH�R�;��l�f~F�v5 ?d<g� % $�`i5/p�m> :1 cE#��`�BMI�m�mu�i{j`f!��Vug7I-�jJ2�]	%�W�l9�l-sn��d�&O�K\i�/�2S{w,�(,,���U+J9		�//#S�s#M
�jowq�r3�v>6fq"�m�baj;Es�a"�@� ��l` o��-�`4d-�m�4F�lUe�iS(=
y 	{M �( {t(c}Cf| ��
	)�Een,+$?�g0�l���Ee"?D-�*QM	q�)�9je%�bm3:g|�lq���YI@	��U��7+�� R��y�!a�e�2hG2�a�g;4���XMn�se�TE�
hms}�{��pc�80H �suLmo6<!�2xbK�n/j*hQ8Ad���-*M�( �A��&`��6�yhn�od{[�T)s"� i �	M�E n1j�4O�. aeh%`~Klue�$�sI��V8+#CY4�).i�@br)0(%taheP�o�*&z�I�Z�pu2f� �dla%:�i,uo$$@;N@�U�x/qnC�qbq|8|Utep[0�,`}Dnrjd�q,��Bdp& ik6�%1�!�L�E	�;-
(mg(H A[�d�{�ld2M�I/L�; lQ�%�[�aj(f*N2-th}Q6�.'�p >4V�~j�o� �1E � +�M�rm���-�n.�t@t� 1`u^S! :��h]�: -(�=�A:�l�j>��w&"�`�en��lp��K8{�)t�L� �	
J
/o!�u���azXIEZ"��of apqbf��tbcLF�hArfK�}�kNl
g%1vl7u9�d+<stNaa!penvkUi~*p�F �ijq%R; �J{C�0�f�avs�nS�*
=p�F������Q`Af	|qn$ok=wε��m<r	'/$K	}wxR�*g1ui-o�a,M$��k$9d5wn�4�^s�"�8#
[	�djr.p
i@�yGf�\k*m7l1}5o�.ygůH)��w��>%vaf%*(9��zac�9��cg~wee�tGvDl�%�`ct�, �tM/1mm~@�*jNr1
+ y�B��P a,D�`�� p�t%�cq ���- �(!v�lQq�\1 ahen |��secXaL���v|pz%L%f����gD%\R9t�!|.L`�lambjld�fW m�d 2]
L	�<h9�	�!QWgb�fi�b*0�O�t$*b5�Z�fg��"a�nn1�v$��S2fb�K*�-Ija1qqu`Kd3"<)h�Q�W���ij��$D�t�Ҭ`.a}7{Ra�m& (-� p`~r�Fdd-s��fs0haT((r*�!�![\/K�/%E HSn`Tm,�a�Nt,� w] ", ��'�9*{>5�!4�fOGd�|.�	�" 44�`fOw6�}�3TKN�ҩ\#Eft�[oM�Hnm�3
J�I7��ZVm%N-nk%q�o�%�-< ��4| l%�jf�md]te`_3,"Y4(:�2p�2l;3Q]`
(1"?P�kl�+�gs�k�pHS���ngI�s=jo�`a.s;yg�wG(re"n�"KQlN':<Hdm�V@�d0fW&
BhF�8�p�+Ct!M�:x|�e]T�0|[�g�/�qtury�q3m#��>c�c�t8)-!
!Aebmta��*#��
�"p�� r�1&�j>�@qc`( @�l�4�mw K z�
+.���lO�2�u%�R�"iwgU�pkb�%LU1�*�g�t8d�mloitK�`�-}t=d� )rdX�n�c)
io|jl�c��mc�k!6;pa+�0ilw)"^(���S� d��U 1_`c5��q+�s
	�-��k%?.99�a!kg�EcaQ0Lku�:���1�n<|�	�YX�}0-�-nd�(Fb"��c�#, �a�# "Gc�	�$�h���(,-�K!hLL3!y�n08�{s*}n(c!x�=�pQ�eW�zd M1�x�D,,�"b�l`" VW��2" c�e4u��-�J�e0�v<�lg�h�E&�?d � ��e^F9d*|�2y�ah0�6rwl� ��	��t�
cOo~^�hw�U1��,V4H4�;`L,(s�`�l�b$�tp�-=fSyn���� %.dtwunt`);�
:�.�@�Agu� �-4��k*(&z9�6�C��Cwh�d��n`Jeqs+*'8'Cfr�JEgry��,bXy{�1j5�$0#F9f0.gQM)`�bd:$< �ΎZADn&ne�c/�2V�zXΈ@Veh�m l��8am =`jH�i)0c�ua"xoc~ �"¢9-�IE>FTiAadsPiI!"df6c�}n��iMcqbbB >�$5hPa����h*e^��]g)�dq(�I]3�y�-kb`wo~�8�}T
:�'�L*n`$��!q��]�p,�#���:Jkils�mz/ #c��de)�0�!@DNU�e7�f|)x~!cA�G��&�{[�d]	�o"r�xrUl�s�ebP�Z%�w�v =����) @�%,;��t)xaD'T�~�uEB�+vt+z{+�e:$lktbrWUl6= $g��#_�

��@A�o[E&Kϭ(�lQ�iy�%�1i�d3��opbr-4u���z8!�r`NtL "hgct	jg�k%�@.b.J�s�r�}5�R(��dc`LA��| 7�o�n.$#II!tle��	I0
�����hR�i5)\	 niaa:lj.q,`��veGtc]�*���(! @ld� s�U ���9)Del6a�/z6et!gqq�dg!t{-$b�nxWYx�`�cnHLx�"(\RYN$Ng��&�A�`��\K(�i�m#^�,\!K"�)�ZO"* 3o$�Dc��lo�1�7 �Q��u%���q#7Os	2s �{(&���mf}`n.c8��+a%|�OB�bi]�@�()C="ni[y �!o"� �e����&(MU
*	��1Nu<%t}i�c��fdn>+A3c�aMpto{*�ep` )38I&&�,s%=`3u� 2J�q4,��� s�e�" �8$-(�/��%�f�g�eh��i4vo7�o%np4�}lafb�pw[r4/�;$wh�s�)6_r�a�%�cIg��gT{��um}��Q��R2j�9#64i*��F�J�nDyXŦ6H�b{)��$%qd(xi�&�l�n�U*8!k�I�g,�$�l$m )�-��J�|d"fb�t=p.���8%[�am�e=~�Gk��CB�u l�%P��%.�I	)f �h�gocd{��r@l�d�2dx5W�chdp��T@/ �|r�.�f %s)��wڈ�2{w"_��2����Gmd;	9�|
)-f�*h�0c�r8gs�!0cub.qZalr�?�e���
�IG��tpAt*>npq`8e�0o;AaO��ND M��tBYji�]M�]O*=^"��� �wi~�� 	sargorsfo�`{g��elti�D�G,�N�t"��/i��kj43 �E|a�e dL}�(�*B�0,	�R =��F��e�&e5nl�U�g��g.u�ux@moc4��bT I 	 ��I�0���6)U :|r�5$t[�DS�iEd�~ixw <x�(�x<h#�5O�S�L��d�^�g%k�euH���ɍ{�O	)o�FKr k`A�oets"}(T</"Tv�6u!Phjau(>368
�E��Hhe.(�aY3;x�tefta,l��*'+()'z"e�VE~$�m�jb�Wu&��b�bun\t``�-(d�	{asbvOm�nt ?"g}C�i	m4�i|ni�"ɸ=�1�'9�> �#7�@4�QlzF`Ij@���QE��y�.r<>�ps �Q��7��� (k��
U%B=hx�6������axtpe�;i)A&ati�q|*Ce`(1rt�,,BG]�ot�B!HD�\ {��ڮ9rd�4��c Y�>`�*	�$�|�Xvi6SF?�bz�s';�ndl�0��gkt� �8!v@mF)`Y	AQao�v%$Khbo0"4�tr("6Thf9
A�#}C=�o�F����� h�X��28YXf��P��1~�4[r@44o��p[(mp}qu",���l�i0yCnbf�uN 
@�.e,)��x�o� ,,eok% D��A�� bor"�+�j>9(/�$&�"z%1�l~@?1Ja}$nk*Q�0l9(d#5�-$Uxq�%z=Z)ڒ�Inh)u4gNt&slStl`��{ � �Gxk:�L�+�	�u`,=�z��2S,pandW=vi	;
JO ��
)�{Z	m*Kmr).���{SM8'v*�gS
K.&I& l���"p��vM.UAt�`e!`�g�}lT'+�Mi�0h��ae n_3"		)�!98�VD}�M��gqa`?�ndv^u�nh�pm�c]+|P;.nf~<udʵ!8`�2YYdR!(i0!s�opI�&uecG1�D!=>�	)w�e'�!�
^t�fhiMw�`r2|A�$CT7l�`�V�.1O�
�<�p�Uh$	 U=u>est2U�[�| F�	@cEapA`�tK��m�}9; �.$;�		�m?>Bq�($a(fA}%vFD7Mm6�$&k��D�gx5�Reev ]!Ph die �qmo&a]�8�u�%$f�F0i��*;�) In%*��|2��%�Nx aky)gIt�!WG�Kox��8@d�f �i�)e^GtogbJ�nri2�eer$S�j�fD%�
)	|N`�)�d�|xh02�	Sf��_�oM�De>����fs��()�%)Z�ri$$j��dfmeM-�4)!N�j	H�%(�dMz4(6�,p�IG�� �~2�gCN�6�jG*t 2x���',!�lh')t�0NE�,0�'d`%#�9I�m� h|�/W�Ga�qse��?"���X	�d<, v�x:	2c�	Ia��mN_pqzm-u � 
uIb:A(A�jI	h pzmwg+��|��4;We2)�d��F-fa'!_e%8Erg�|��m�qg�7etQ,@e�i�`Keb|D}!a�@y�gS�Q�-9J��vlr�.E~a�Vn�r9�carq䨟(n:`�9�I,an#j``{�nX.xZr�`AaE`y��
$o0X�h+��k[��	Jzkw�RdtHTO $�d%�v��7EGTFf�2���p�&(�XXV��za|m�a�n#A�O`C%Kd,		��}n.O#�a-|mY0�y�d ��!*)H
�F_�a�i�`~c{t6�e��``o����pA 	&�j?�i-`YQp�f=�kx�iy�##TDn4i*�Em�����Xo�0/��u�{'q$B�TiK�G�l�aRi![�	AY	�e�(	�	n�=�`=�e��{t*4dGge�n���%Jn%Ai~%� ȩ��`%<��p1�qqN
)�A�|�Ek�.~ZK@�*_0} ��p��	��v�m9-�L�I;�)���	+�&T}n� d�uH�!R�Sm}8�}7hr�&/"a��0ᡶ#d[��MHt2�1w5&�!s�i�L[w�c1mK/$���n� mn �w= uRud"g��8 ~ov��orw#*L�(�� X
 $du�Dy�.�3��U�a+�4gvg�ai)�HpE< ehwlv,ytek=�,i)!�qw � 9g.WuIrH�$Q�fl�B�W�)i�^�WJ_gfu)AlJ(Jeujn,I98��
<[�d�$t9Gc
��� ���EDc�nq*2!s�o^�EI�)	;��"QW7J�f�w1�uN�	geu�!E-bY`$EDa}bi��:,]� :i�
Ytu���bj-�~4nnH"��
�8�e.dp��,�jfi�iJ0�Y %�"�$�g�r@		�P}S��h)w(g!eb8qg�zc}��hJ�Nr�#j,�u�}�}IcEur(�&�0�` de5y�#et��0)�		Wq��/)M�e�mWg)�i�o�L��;0'1rV-�?"$1yd�h��c4pb2�:I�>ap0�}Ei��*t�h�W$5"9_�sf -�mte�(p{<�ob�rn-oX6e�Q!��}�~-4�iMnd�,#tY�T<.l�xc��u�l >]& +
Iu��0�3j~>![5h1gZP��ޫpm$'X�u��5/ki�*%�.x"&g5s&F!yp���V�#�}-O�aw(u2H���nd�E/.`tf�a0a��0��k%ds%��q6pw8	&F�cry|xe-��si<|�vn&7��g?@{W�wY/�e+��x?z#/�$wbRMzw:2faqom� �*�1<  8�"Uioqr�8=#"$� <+(H�7�f;+�a��,x�
W%�#)��f|#h����"+Lt0j��#�S^.0`�W��M~En�$�6Uzc�b�0qq�e.~k(�U��f�=��t��?>�o}Ϳ;ro��cp��m,Z�ade�L�r�t�=+5:令#$����Qvm�v/D�%O�$W{!U�7A�$��g@
,m�+���e��t<rr�rugr./l{KIcs�ng/�m�j2f-yu�.�{{ug�b�m6chf/L84i�v�-G �r�C��8/bp�j�c�o`)(���7�0�-i`C0)a;�tBq6$kD�Gd�i��L"b�q6�3�M"ys�=�`�W�`�uZ1T��f#o�K@�GHx�A";j)H/;+Uau0��hi's�fiL} A�xQrvmo `��d�$f O~(T@s�@e���mjE�w(I^l�niDfl�l�p:vs mS%s+Nd�=Sw�
 A��$k l�j2u�u�2CVi�J9�ev	�7� Y���HJt�f�inu��td��dh�-"D�lt.`dz?n0 z%r���(ruarq��V�iTflh�(3SeNt��1;??};���#q5e8s�mdeR�
w�m��\e[��0!� % �S	xwdv08p�|}`i��+h8.��9AIArm�B0�(lY5iNw=r��cgo�$ (o4
4F{_�	Ycy83/y�E�ɺ��@q)�s�w,�'%cX �P���!f�p�)"J�AIhv����b|agxe�$%!�!k(dmq.��it>�~t,}�y�blWh	.���5���B�mz4�zC=s +	�#�	+M	D�jpVA�/ak�!s3h &Ocbf�)~��(Up��B��q0v"" $##`��;�X8|��A���d�Utov#F��gh�s|/�{��) �f�0fDo�{4|m����n%��oG1a&�<d(~xic��;ۉi0x+Lo	8t�Ad`QbK6C2c=3p! ��v,,f�r�Y`�;>n)8�fa($sad��cjir(!#n�i		Pd�#�>gdKt�i7�y�;u�|ezkn^cs�!8�*DDx�7s�I�+�9��YtKtpHc9և+}@�uuj$Pos4@~m��8Z	�\ egq'J�OM�Kvc1��p}f�)aC�a�,�d?"|a�$ kvT`#@e�0?��I�	81Z,+}��Ag3,�A/;Z/-��(,ob�pyM�q=c&DOe�LobA|!�D;�6qS n!6v�"�!N�vu����	�QP�Pdq4�6y"��(�?]��`+[�k��zz�db�abe��D"��V�c^g�j��fy0�r�iZ�|90FE���iv��mc*A��1z�xD��.i�0�`�(!bS}"N|�P��lO[a`vw$�7!q�r�~ţ4�(�@�z�>Ujn0�G�3�G��,-�+Epb�QTz � ;",�1�g�.yʐ�p,E u�vo��gj�xc���v7}�pcF
�5aph5In�em{���n�UT��fk�{�x]M#9� �a�hw�~pGq�]��u~wO`9haf\A;�VzniSv�?'�b)cud] �%{�n�]th $?	=,i���xp�e�1�T���a+�=!}�ua`ik!����
��f0.$!��,l��H,�,e{a�<E-!n;�f��1GG`=%h��i{�m�cf�.4")+po.O�� )[�	Z}e9h�zbo� n JOC�Lm�!�M�J2&!)4�1�!b�;AhI�Zd���h$9Md;�	Zv`�n@r�3��4a5!/MKt_"�$�)s``A�d�"k\�7M&?g�"c�fkb�f�ZU|�gs`}"GX(|t�z[im^#��qo�v�}���es%�mtt6@Ji-$7�(�r4yk	�fab�eh<(k<7>m�PET|)u�mkp�t%}�IrNsqdm���L--iہ�.sf3fc*NVBwHLtDe7ad+% t��b	x�o�2� l{cuh�eOa|!all�))����*p^ �E;9�AV*,�asB)a>cY��vcm%?b�<8+$^^
?�4C'y l�e8���m�rHU�e/H��Mb} Y.I1�*h)Obj/ ?D.w���
 �,x6 	��I!�n0  �ndElumJK����p��P��C*�|�u'r�8 bvki�- %d�>c! -�(EF�at��Ab� arR�4(i�fl��u!�C�`,rP�.��C`��. 0safi{��cpH���uemsq!{m(�))�!ep�S<���,3jIl���5)s�a8�aR�$�j{�e�b�\��=~f1^Tl�g��4omgm��}y	B6k4F
�Ri�r(L;��2��b�1c�&_*p*(@�\y�G�(��ܭ �ib+�+` @"F!>0!%�lLD 71.&*"j(�@-�&M.mC	Ҭ�;�tjif]e�/|	d,�)au�2�)9}j(m*a�7o�+�|0`W��)f�9 'q�ptaUQlc��f�np�tzgk�c'0	��=�$#�c��e$!� �
�;�`@�Ha1\+Xa�Nyx�#�$�t}.
�)~&rp.h���A�En�m�b0x�|k	cRuk,4T�z�o�*�8Vcr<y0,�_(o8�mGt+�&[&,p2HkةO�!�pY,(�u�$�wiFeh,sȤ�k
�)I
���`edSl *^	Y�'h�er9ajb�S��m�`h)tdm>�,� ��pP�`sx0e�q��aoڏ|$e�/ [o�i$��1g�0��s�r &�JM.E�eme|ps��%��S%t�_Jk=�mp!�aZ7�s)m:h �elRa�Pv��?~gU}��>�a3))h(�5n#ui~l�|c�$4v�oHti.�Ko ?*گdvajt�Mbix�[8�Q�
_B		)`,<(�u�W��jl$�a�hr1De'b�t槔�m�!�xo #k// aj���,y%�)s68bU/cvi/�Z�cnGGk%)|!1�%y�re!kp�brT\MctleeL���+�!r0r��1!`o9rN�l+te/��,`>5�L.7zf�yf���&Y	�pqEGFsBAjwd�/�)�/fA�\���l7!_[F}kc���~=*-��O`J�,�1uH ���w�&��RIB�mPL�>v��JeX`!�nni3�#2�I��M�vHA_ZIc�}|��gt\8�6��m 5} .4�N�'�$�0|Eq�1q[
I)|#l�n#)�"����ul>�� �ˋ�e\u�n0�fI|*b�..�kf`�J4�Js}߲w�3 raqc��6)�|��i�m��d@)5`��2HA��f!-xR#{o�vgF�(n��eg�p�,
I� M�9�]~)��:[/{�@͡� |]08�!9:Pge&9!.>`%�0W��9*iSR�aYO?`h�P�
'q*e9`+�N���,jq��r<�f�ZM*-4 �w� dleogzv�
��`A��i!krX g�u��q�mn�� kL1al*�4�M�'�km*"qX`Ӯ��8X$(3;:�z!)?KZ%G~3i"ڪ*Xo+.1Y,�;�e}u9cbe�if�:�gE�x$$�nl�sb!!�87�ois�z`q��70�w�MmaI�k�/�ea-96�| 70x��Qg��n`d�qs!za��#=^wr�
uAdx�Ϲ�N{r�"px�la89ins�h ���A`Old��.iGC)({c9 iy<t!$xvg�!x$E $u��!fa�o�d�d�@�A-=�p,�̮b��u�;~�*�p-�wldh�G3{���inKb"!yg��XMP�pΐ��;gid,<#z� :Ay)��ig�t�FzZEyim�(�y)getkI�a��:�&bݢ�0'F8="��IX�Vu�h��zE�5.�a��(&�`�p$�m3	)��y���a� 
�
M
=09� �eD{r�P*dw�l7f�Kl;��
�T�@' xJ):NlcC/(dml�2b�n(���R	
�&�ga�"��`�pc#H'{�`wM*�wtb-�"�3"�|/�`yMTUr��{�u�t`�/bm��lT%`fTs�	�A@"u5�d�lc(�nQ1�$���c�at)pd(+%-aCe{x�*)c?sKrGd4"��(I%EidpgvnQ51R
.~uk!YSI�*=,a}wepS`/":-t@)s;
_f9c)�9&m�uIbh8jEj�p)kn)d [9	Kv�r����ň9 tL.{~3i}g; {I,'?& Q�e()v'h`8$IAfv�OmL,) g5(`p�PvEvRt|0�ibDg%]_ock�
9�I%�lRnm@��>m-� ��jH�%q��$�(j24�hӰ)(dICabhd$"	*h�	IIY)rp5d-Ktdi�<}.dasN	!V��w/nj4oN3N3A/�F�`C�rybE)f 4���Rӧ=axf: Ps,+�%g&
)*"|))[)dj�FkttD�8**�ӌ�!�ybmeU�pg~ecL(`|ks�d!(!3 dwp		.ja�2NNat�h
d�,�El@e )"Y�	��r �miI��j@%�r 0�(i�:6c�	*�I	I)�& !~q�<岼�m"*��		r]vq:�)�u�tz-TJB91H��*,PXR`1'�sUr8a-)j\iI$ ,�l;"�f%tPr� �_mPzyl\%aj�Si	oE��<al&�4qN�i 2LeT5�|��*o��wn�E�A�lAm|52�!���>:|`,,s}0���aL(r"Vg�,  Ds^�b9#]��;=(��I= m^�Kr}�U#f ��|yx�S `l�O�(q:� p.hl�(!v�$o��D�a!�BS^R\D$ v�0 m�K	 q$$�4�(qi}J= ;
�rc:ڑvj%%.22s�	Ezlgcx�5"�j��
I3alt�Cx��e("�8/�W)�}sJ��.zM�pDGIS��p_���+�� �}+z�P��q.��/M&��	�/ *1�':�gִ&4C�q�v{�mi#` !P`�bOf�-jADlKp�~��rMf�aL�o|g2o�'�f�2�#�q�o��}lzQ}atX?R,��1b\|ei�'zp�keH�|_nXd��r�wi�g#u �;��VwOron|en������m?
ͫ�}�Wg	4=m'20w�uO�a\ N$-^HT���!P)v�t't{� ($t93ly�cr�@pR!6Ad�|v��d�lgtbEa��fF}�h.6qx-S$�3gw'�ks~#j�l^PO���e.�io�d��m#-s	@j �+PP�%we0!ud�g� Sf�:Kdz$!�#oFSoSo�us%i.o&�� �Upj�oR�)��!`��(�U��1�f�ald�-2IoLk����g��c�Sqvc�i{dm MGrm�eaIb�s?tsgceba\aD(�s vbup
��
l�)�bihyp !H`� CvhPtQ!�9 55>	�@{aukl	D�sym�d b��c�n b�!�A@�3)) �!�p���qt�gL!v&<n AF`2�~�t*0�h�l{p}yP�i�r�T�� ol�DO!c-nG,o�m,t�V�Dk"3�eraJ���eQ
+/���a a�0o6�f5)u$	��!�H�yq-Vl�1�kdl~kS�9 d+)�+aMsmp<�l���	vM|`h	 ",:9��m"ngEb�-|#�|~d-%b&�a,�f7���vD��"�`!+p�.auaol86(��s�Edet6T(�TzaLs�|w`deT��Hpt5ANf2lDO�?o%�G8��" I
 N�th�d�!Eo	~2s>3trl9!�Sp��B9k�0��gfi�m�'cp��r�p�cC��Z)RmE��g#T��0����hFk�lfMxYaeSbs�@.�1.�a�2}De#ozp�uu��fjYc�Ipq2�{%9 �xg�.fmcIV� 9� �l���4.z�/��xk�VO�2b �2+>Ut(P �O%mnv. /r)��fX�+�y}}N@uil`j�5���5�#Eht�ssHSmGIdumeFp�Q��� *?NI��mo%vYd�*V2�m�"] Xmo�vi/n*���F|�BNCyp &Tm;!4pec�,s8�No4,6r7m�|&!jIv fg�9|�vPb�h���Gg�byg;-���ah�p;ru
f5oqA�j�b�d�k\9��)l���Pm���Syx.R�u1(czufuvvW�<�aJ
o,(�na	u�epvWl3a�~ Asmoptmk�}��l=x`��yom7�-TO b!`B	z'us|j0Tgb��~� dyumTz�Mzrro�a�{o� r�jBq`?M	q��IXt�c`�3x��[e'�{p���*^d$!}(�a�3��g 5 _	����ck�|�uq� GMx�3I�s��~3	P�4�T��jpp�qu�aF984�"���[?�+�ra�hdcvhD�3% ��+P+0 4!�d3t�@RhB X�D�xc7]�M�PRQG[SAg�/�wp.)-m���dx)���#� !�m{�jp+oWx��o ��}���N*ay�(h��{Ft<#$io|(r�
�'!�= �k����-�BG�.�1��0	4c@[�E$%-v�er=i9aI:0i�Xb�sqE-���[k��iLe�	bH $zu�]q�@� e!4UTK�%�Y}�5$ (6
��).�XS��efd"�d�sLYwe!v�D	��o. `di��_9�+B�#](=4 �C m�	
+<�	�t�t�4( @0$a\s~���H��,x�h( ij (h6
�]�)�_T;qcwCv7���B$z@Hl!8$gceS��djE~ �itATh�v! �R%�\0"na��LIo�88�D˳%|J-��	'`h�^Ks51{"�ff9�x)l��mB�*�z�.8�Y�~�auP#�Z��q�����e�0}!#prct}b1��1�cD90uMr�:@�ttWR:$5nce)*)Y
�Ն!p�9i=��@�pà}n#r�|{�" v%oU%E�h4g�2�2un(L6'_�i�nDb�Ph�{t_�tsc�nc�o�!�e3�dce� ue�mL'peK�\P`dsbMr`e ku�s�tu�k� k`Jm�`K,�nq#W=OcHO� �ybs� j��L20[��0��KG�0-�`gz}t�ɦ]�M�oic~VfKoW�MB }H$S4fpG4�c�f��d ~rao^�>c|��'Sj!f1�+_kofj�D�"d#V(0TatcU�be(�:zK@ pqo}|�sDdn)�J.�t�ee�lq�`\�Tc0T �*�sfm�b")�pe�r���i�J �{d�{�vse �t�R{��) v`SR d�,C4kLN~63m�r%hi^��i�btar�ox��!2m�̉��r�$d4�@8�ErUs`>T�=�\>?�a?afkftmzbfi#�os\�(/#l�p�(nI!Na2G�t��n�E k���B 阀M	!ib5* Q�q,of�'e|��W��:`�wsI���98� /r^��#� &�Y#	K�EUe]x�cTfcm#3�V�(5& �%���F�g�!,e?Exq�m\2c� x�ivP ��C-�	�Tti�msot`�%1�{�s�^+)�"�+4xPQI\ibdO�`p*R��~ ���K �hw��wt*' rt@͕GL0XRi.`r�z�9:�)�vedu�|8�}}W%�		I�m&y%�iDT'�re6K.g�r�bS�/�v2m��!1I	7�V'#N�ah�zn��teE$�`i�cHs�m^�EV3�k6� ��KKt�	E�*)�w��z�c�GHeEdeu��	76
c�DM8j�)n�oq�4:npTh�~s�u%��u88��YH8�t,�0~�(�~�t�!t�UWj�h$0ܰ`�,7��ry9:
k-+
�o,��3xOcq�?t	v����2a!&�� /q%)E.�Hn�h�4 dc#mr:.��=v��G$4HL~��Hnu"W4"Be�Gq(%8t"c�}v"�+) �}xgq�)�<9���8�tJJ�:Azc~L|vmn�p!�asgw\)#;qb �0�j9wcs 'e$4t��s�p|A|O��Xelz � jP|<p|/a.gx$� /~gy&&l��\rx�Fs p#�=zNJ!��" ko�m��s+,�pIhp�-`S6y[�{qy�2�iedftN�Yj�,p)0O�	Y�$n�|qpxѧSOpK�� M`~vc{'aU(c!e��Uep�q0��dleg0.y0/y++!i"�m&�dy����aqSwB�(��~@_���  hHr!-q,y�zj��grY~Dp�anF$4�ryu,"5p�GfY�.l�e�ip+]��I�u~ur�hucs=t{jm�/d�eNdDvq(�d�o.�aq$�+k� a�!�)�mY��y|yy�n"< fCN{�=��qri{�\lfut�Lq5�(}��FPtdHP`geuuS� �/nwB�2'��p�X��E A4e�3U�wa|IT)��Cb*�	"`t��|rAl��8�!Zpwy zli
/ RX�,bu�0.�Fnf�)��5NA8z!~Mn$Re��_�k-�j r��T\|L10REx�1nwa� "Y^
a�M�(Ep�pVi}u*0uil�ng`dj\v6mb*\{53��HP}5%�M��teO�Y,=�14b_,|w6Ts4!�b���sx�_�y�s� AtgT)Ea����	/bVa	��dqto@D@dr\9��.`"e |`l�Kg�5k�-tX{m j�L�Ha0JnkaS���m���-ݮmteTqt'sR(�� �=< !*pAa�-���d!�xP�A63���0c2�HYh&%"cu�?}�Qne�'[nai��#[(�np@-C�i�e��i��Tl%�RV�EhD[Gc�&|�H�aD�v(q"�=�QNu)�sv�#:{�)Kd
�4

8-?�JHL��(y\�w=6{Ǫx�c*�fd">	?*} {jH�o`(ibum�t	gh�c��ND��p�eo�	9d{2(t91M�i~
chXU�<1A&�(_�	� F�bg�^}G�ߨdp�"T�$&<p��\�l�r��Y�Q�Z4��{*�`��2{�	A!&@"`wp`�j�xRBx~Tjv{y$+k#	((�qfb%��A1	��)5h��/!�(%w+>�c`ա�@f�75 h��e�a$rc�H�>3 `G���\i	`e|�LGt7�	,���P1Ki�f!�4��fCQ��y��2(��)d�3�20nsu�!)�	-/!�Peta�{�$�C��d𕙱ew[�t |:^H}ul3�.��+; Lvqqw�lk]:Yh\%yfa�D�Qp��	twza(,,2�&Hv!{FI��nWe;j(qK	Ajn�&pK ��j�vE�2�18D�lp�r��I�vnr�mszR���@��6"a� �FqP��I*5pz t � (�"��	K�D�o�T��DyQe �P�`5;2"k�`"qAo(.)_Oo*�`i�`j �b`rvD+TA�+�}�!!k
*	��hr75bEջd+p� ~(�=tI;:ihX
I+
�a%MN�4�}���4� Fi�s���e
o�iD)�Fqqu�p! 8�d)N\RM&�?lm`Fl �8fcT�`4c�����(
Ϧ.(�?-(�y�de`!14�dA<qUAI�/ Ge �$ 3��U�DQIt�`�4vp��Eag)K�TS�"�e�@=`.=�!jhFre�5�j8T�&"n[�uWpk�if-�~&s��f[M	�I�% �b	�atEnmeP �=-f��i6�)db9��de#T@V?R�3 il�.�0-t�"` H" ���
�;}A�9�aq��cx�rp,����`d�#v�exze(!*(=�)cw���o2S$2SGn��s�(6m5lT!�!XYa�]�!m u��/*"Sd�{o'!+�DQt�n78��vuK �yD����du\P%�d`u(% -zGm��n`rCi�N5tO��!*Al} r�(;h%!yP#�MsgUܼ&c��|�w2��t�m0�1��`�/3�=f�g0p�JeF'�C�o	���p�mn��e=8t�(!s@"p.�a$��u@[$ a��!"�D�� yJ �ada�s-225 �1j�mv�.bc`lp> �	2(p�c��H
 ��a@�t�0gs�={|,�*��*g&U�0$smq|B6fGsy � ��)0Y�b*��n@��`�vu n�Dd1P��=�L$Y�00n�r����g��si���Dma:4utec(Yb{EeaG@wpbeCLz#%|y;j9d?TCre@ke+co^R,}ter�+m�p(w}pbhnuLR%1jkt8aQ9s��*�b(tehPa!,qryj�s)	f/� ~!c�nf*I~pI
�S
vPfe�s-H`s�$	b?\v�w<ds;�*�towuWO"rQ@sara8*$}����kM~vh�iCa�)`BG-b|��ht��]*Z��dAv�-<"/`�Mpqq�rO�law��)�
�@w"nhzt <'8!A | cgxeEj�}E� ci`QTyu��Y��ac8dcW<p5j~���JO/}cb	�{�r���id[alqLvsۈcq�0Ind`]r�,:B��fXXO�t�{U���j�Qg{c�"=K5Ru�!U,p�0swWhNn�u+��i�j:)&pE�Pdiatlm0E�z��,L�g~r��&12��)d�DJ)�f$��z�Go062hp�QpCw�{�$��$#�e`�-FUb�a)nReaag;R`"!rleQlwN",�嶨�xGca>o%-Dr%i�!^ye ��)^��/dv#v@�agR0�fw:*q��@�n4��F7<QFSr-{l�xot+)

��
�CS�fxt �.�

)pi�;�t�g�`"�<j�a�,3o"3"t/"dM�qw)f13�efw0��te|{0a �� xoi}d.Y�a�!( k}sbe|t$���5"��i�[�AI	Fu����䊘 h�%>;�
)/<Bw�6wvuA8ba;t`�!i����VjDa|`V}�	 m��b.eMit�Ecnf�ry�bih#9�r�� ��rRUo\�	@*`dsO�i�R1 p�Wf`n;*D�� \� �Ze3b%�MgU��u,t 	 c�,{A�?/���EAYxh��r`S42`�vm��E~���c�E0�pccls�84Mr�x�T�A�p!*�H �+ @g>e�X-U�~Zl�.�V�7|�r�R(�"d����e{*&D�$�3.J 		�$Ig"O'�e!k=n�"R�a} q`Pim�r�	�lPi�YpNn@�"�+��	OM�pbs7lnq&io�rd�ce4uTsq!8{�F�-K-"	&Hcn�W* OTprwT��uXf!n4j
	
o /&�t�|p�[ns.3`l�|*@�#�j9y )�6 -N5$23�1$�#�,�(r1mnr� 8N�iKgT�ot�wC$�w �3�f� �'ntb �ō;wbma�eu�m�(niS}�-���xlN3�-(�zn7�rTW�nS�ZmV�/0"4*8�%p��$�O����}�=�	)(8+'F^�60s6TYs2.2"-�p�t[��	)m*�[��M�8h~k-V� %!��\		!k`QONtx,w$1e�<�~�hbg!��f\~����8fyH�	k 	�-�~$���d{da1*�{H�9 )�B
g�*�k,��cp5��!#g`�p6�[�$I	@	>�!�ph$ruy{G%�:.3er00�l`�n��VL+di"td�d1\ T|`NKB���?#t�qA Ifb 0|-�mURUuc J@$�.��=",c5d2i8y��y��#uu�e?P��R/�{$ J%	�		H�[�	l��Y0%7~e$zlL�h���Mp۵�����	�)u��		9�I �s�pk��HX��x} � ɤ�L*
A�_
)��a{��i17�.MX�{ ��R��q�Z�(��"�N4!AN!e9Qa6D`|>Gg1
I	��l %k�V)+����'%Y�yJ
	)	F?Un��wYm!�.as�am 1/�?�|`Tl�Jc2@l�8w�p!�8�&v�2fd1hn vMmQ��+�m6   Goko�#, 0	h]3{ %�s^��P<6qse�X�p]�d�Lv,1Ve�;{�rU���(i	){#W-�`hz�I	��dS� !J�-;TKB)3qm��d��krLvbbm"A..r�)�	AAp`Ea$_�(A�`�=Ei�{O�8od|��({
K@�X�
�,%m�S`�pd�Q�uA
pb(#�8�)I�-�t�Mt0!cg��~�͠��f�O �_��ups+rDFz_$(6 #qR-vJ;�"#qh"J$csR�N|x M]�	yM=	 %��}f��L|	�+}
)�
�>�:	rU�ero�`s��e�22w'�sw"7o�!g"�"rG�SmOs}��|Z�nS�s+'�@p�N8��
�N$Bcgyfle{ jP�l�\4@j㶝Mi`dyeC�v4/�`q�v9vbbqs d-�
��Btive2h�,�\���MpwT%	��vy1��eAb�k:cag`%�l%bBnE�E5kAcuG�18m!s}E~`i��m�8 {��+}u)�= z-,
ah�ce�=oj�r8`yd158�N8"n��y�O�*|�g���kdy�{��"FTJ;�#+͊Qs� bmOgan@r/�c�h.�D!����/�$�M�[/(�fu#"lll{(KH��NMDQ-6�v�-H��ogab��ŲE.aQ"eO *IiWz�g2'�nw�.m!`/�ON"�x�8�z�ap�L�h�4`|_1�2$�).bl-�h.|~#uMey*�x��w `E|�~Y#�
*	�;BIt	I}�WT8��|	/e��d� hUaa,	 � tu<U� d�\l/
+W0�MbNqq. �u�/(�;	SaVv����nu,�lFcOsH$:��,J-(#�(wDvq> bAmcLJ�#t:�ixpo�p��.faw|1*�i��d%pp:���<)�!$�J	�@aa(v�.s�	1�+#> �|-yy}3�M�-=ex����|�y@>�l��ob.L��X6yt0"�'$1.�tmL�<��|I:��A�xlm�drc/~�el,TRe84�=��&�U-J_�<��m�p|kCq|ian*ksi�j�g�xU?`�c${�"x0��
?�(	�Cnt~ft8Y���Xenz`��lz��~w,���-0�.>s\Jm��4.��jVn&(!��hj�?fDw�
	�=�i'r�r2_�w�Gie�D��!�)h	jd�l"Buvh�l��X�)
		5tRt:�g:dkiO~b%}�0U��
�H�+Srb�g�`eFpO��+�QN3-�1-,K	:�b\9tpc�j6msQ�Wy/- J�iQhz5|ssgVk!ag�k�?C*#�cDA�lO+ �2�f�p��S�l'vA��Duyaw-f(fX�a{mf/eU[Y�� V	CpnSl`6e�31r��+	/7dco�t/�d�ko{Tpqn�qpo ��rp�Q)#.1�ev>"�`ron�4ozc� =�]env��k8h�u� -��we�-)oh(hpwoqc~r������,bn�_d l��n��4uf�dt
	��rL~e�tw�u2]m�U�a�%�	*��,�aZ��evwAm�J�:axP(�#�>FZ ja�fP����� �Ps1tecvE�U�` 8l
-HA"�ia$A}d 32zYtE{i.@a�Fm|M�H4��,.*�P�n`Nw�!�`dimfq!�ZA<���W���rc5��mq  pu�f5��+		$LuA��sef"�a�tgww�7g��7%y4'e`ntv�okh(q6�YLO'�S�"t@�d!*(x��4cL�u�h�&&%yl+(#In}
heGt�beIe/.!�ea�4dk�EN~vd����3�y�L1t%g�(«v|aJq4{on��0�!H�2e�Zn��9	e�/*ht�uN�vt�e
�	�Y}%��&S�g!d��Ibu�}�g-er�tdH�u�<��bs/2j'cp��lule4�F\s)og*m	t��b_�h8a�3 sE6xYne� yDt;9m�d .A�&;th�c9��'�Kf0�E_!t�iq��hiP�e$���|W[.klvO3�HIHZHVt��㦏�k`xsid<q
P/UN"�)3� a0k'dh Seu�	}'~$h#	9q�eX�l [b4r8N�d�6
(�h py�n^{j,i�Sdvw(fg��Fl!�Y/irs�\�G��H�TnIxG,��klq`{f�t,�j@mq6if��11�d�6(Ngg�,�,�e��c��`� *J��!�#/aTH��j�ybCcCaXg�4KN�wHY	���-Ze�ueIdz�j�}a0)�I+aysm��kA,�x�ѯdt1>x�[<;)R!h��G�B2!r3 `e'�H���fepj[rV�%+���rs, FG)lt}j�(�({���Tbhl�pn�u a $R~pQ�5ylLmx�|TBmNpe:F0H�vrCnQQ�r�z@!.���"b�C�Ψ_E`oeB(1jX%8rWscQi//x"spn%h�@4z_k�4
	j'� Q$�[m2es���8�cj�'�i%bi�$n14 �m91&v �M"n��}pu˝+h�"�9t�RM�d�vs$(?$-)r�2MfQ� y*W�)Ao�u-Ec35�o���#u�l /$�,�7iN�&;E[��/bNo���nr�-ooY0^�!bg!i�=�kd�� ;nsp{lS�u�.bX�ohc��|%y����|ix+Tri�31g2$���Q8�Tf&k�,/5U+fd�Ld hAip!ft-	`cad�Qf
/)~#`s�`fsE�qE�d�p	YWT�hN}���I!��Xuw�RinK,H[�zd2kkn�
�Dcf�k�,@)�	�� iiEk-<(\Ilv2!�)�I&*]Eg�tT<M%���zY���U{��@dG�>$J~)�{k}8��K��5s��Y-�/�"Pep�u6e(w�ctu�8rf�o��#fq�|dJ4qon3�~p�A�e��v�l(4��L(z
ipl���OBKB)�	AK-q�t�t�
+�=f`d�0�bl��h�dK�!�Et�~tc0�Z} t-we�FZ1`�k�=$�Ln�rmOlFe�%Qh0:}�/��L/o�!R`viI'.eZ�aI).�-S��8w��h��-�0xA�T�n48@xajubtH��q�#!B8}d����!i/ S0bp�`PbebFyb1A!npp�o~<�NlIi�|	�	�t�Rem2:.u�zx�n�-p` ��-"oyVig)c2+.�	�ȫ? �aq,!a��q83n\E�z�KC!�ove[NC�Gu�8L0= [nGo�WU�d"\8�_�	
�e�d�go���� *� S�'Q$�hn^m*lC�s0a�d�cAkm��|�gg�hn"Hw&cA %J'�\"or*�$Ar{ /iLxeg|��~J;+��x0~EBo�r|lD�xp�br�L$<Yt�*	 �%Cha6�o��%fi��,&��gU��')�L%.XJ��+c�nW�~"�y��{� ��Z�
j77ayl {yD�fDwkc/AT%q�"0" �j~M|�b�C�in>,
	�/=s��&���� w�-Id�BabvMf =$�Y@D�.n|jtp�d� ��	KcC$lddW%&Er�e$0��utaC��l*�s'�)jM,-%l�ulOS��l}8�RD�l�(�Ta�9c�d�1'Ve��O�il|z`�ayA	�5vpPy[, y;)1&s��t}CCG�g l|��o�( �-�H`�%|S�R;�` t	ac��p�U(�L(ax�gl#'+��	r4e�ctLiq4,:(� q�&�Y#qR��sT�af�z'%o qk��{<,	�;?Def)�iU��9rI��5wPJu
L��2�zoz�2)0�s�~R%u�l"؊F��/!W0hu2hpJ+Y(��\f@5쉍:aal�Ct;qR`0.��	N- Um`S8*ŨMlRs.pa3H�qzL!�E�2E$d�l��P�g|�R�Sson�EhM! 6tf$�Tn*iOX8�k{9$�	���-�cr"-1Tc
�B)J-0!,�!-�nImlle��0�
�lK�{nU���e{0�f2m�G"���s)cS�y)�S�'@gn~aHB3%�rE�6{)�B����nEA�.d0��xmpp�Hp��rAeb�frRz�Z�{$@��oЃbqEuUfmgCRy�%`!?����
x��	{�usen�a	Ep`�r{��NdbH[���\
�b,�wa�C�a(-�+@#��!L�=
���+%	�su�t�g��IFuU sZ5madafN#'���
�wEvK!�k:�L0*x�4@�]�_"�)OK�NI		�S�LSa�(��t#�K`psWc�;
?�-�|��'�`	Iu��I�qqtc!b<D:$�/��nD��t?s�[&`5q(d�h6e"K3��1-F;� �*�A��AH�(	r)?((��N|��-Lfg:`�l�l1=�,m,t">�=B4a D�oZh T*,9"�;
)�O}dO
��#(�qW 1t�wg|��	ru��|�Bwqp��g�I4�4wRc* ~%pt�H2�	+�	�Y	s}�0o !�Vzd$�DD�!��s�obs�bm�=e�ZSpra�b0t`.eldkJ)!�K�h*J-�i
����A"1s0ux 0fDa0ar	�))4�]FaqUl�LK��l�f""wdh�K�&n$�E- �cn5�2�%?v)jk�&.hcl2D���8u �|D� } �h	�ωH�e�!�1a�ees0@��dd�sj�i�^ =co/1'�\q4TWuy$
= \9,����	�rep7s�C��De���Ofus�/f\�(�GT�7djApUq ����2��na�%II0��-�tu�TLc�Eav�K��c�% M�< Be���z:HY?�?���I�dB�V%`KuS5��I�lƦ	YYg(��z�zDY �A �iSrNnstbF:�glb�{d�XlA$%r��M�d�Rsa�`gdeTq:mx ��<Ja�Cr���uRa0! ��1I)	a�e!5Col2fgd6b��R*e���6m	�-�>��M��t'+ߴ[4�>�����	� iA	��4uU lh d��� ,�m-ZZ+�/?,q��%v6e�ocd(N�9c�fmt��A�C	jд5|sad-5 �E�kukiF�Mi� ���>;�wiP�kmeE��,M�# WAl.oe9h�{-���Lp$�p�t�qiD �U"1�{
JM�Ai	�gO��c��wE!td�,a`bc���Buc`oGlLzK#jv
)I�ͯ�BQ�	P.aL�Ak@(�0�s�rI@�,qTq��� [�)��)m)H(�9`tnr|z�+�	-/-�GQ~p.�dD�h& n���a`�bk�s(xTqm(�f1"tbe�  �'r4�b�x@h�$ �j�qm( �	>+"�`��c :e!m(p�i$rH����	)16�~�=`�f%>"#gfg(� SqTyTc{���I_"��+;2M-�ayp�hcNL}�]�x�K�8Jy ��	�I�Љ	���xvEu%2ŀcoyW,�K�),����lJ{��|��`o8�)Y�q�t�	 d�|�"g�}c`)uh* G�%<Up���8,��� 	D	vpr �m�hJR�d%.<w\����Ilz�}L�QT�@&f�$�+
		�xt�)!�S1�sq*r~!�(�k�)53�$CXl��ab��W,��n�sf4%�v9�		,�uJ��>�Ej@h =n�!%P,Xz2,?��IOwt#|\)�*yc�X	)	=:�(o��"ͅ#pUeB`d`=�'2`W�tmg7:beDvzxom�c*)�Ď(1:bZ?f�ltf�T�9��(�p(�*,�n`��f��DK�`�w�edM|��s�D���!|Yx�6� mP".�@X/�,�|IL:CN�:a yZ05�Gar'�"�j�?{�m!p ,+I620*fcoNCi�ue�g�Pe`���N�pɲ�E�}�mYJ:��_w!`Hs�71}�H�,5fl`p�ruoE|��9e*ud`�|kf�5vleR�-=�,T5Z.@p^ z'�z�(�7$X�{��	/�'D0`�/���(�R
 Rf(|i��(��^+$;#!L8�|fxv}]n60rDD��f( 	�j'+"5))[/�#u+q{p}aL�`"o��Aoj"t�Qt:�D2q�8%v<`�&bgU"g=ر26*�H���?*�H4��f2-;4�iE�~\�wp4ygNs�|nXl�n�o"|a|�?f`*\bb.rv1P;�G�	+��XB�a|#d!�@�8��S�|MS��	c.D-p D-�E� � �M{4kt�14��-�$;v =�do]lw@2B�iMHI.,`4ih;!J'�0r��iMil+�t\B{�+,X/ K�]n�C��p%0Q%di�Yh�re�5E�,6e�$�N8~p�5!��pm�Qd`�@pI�y.0FoDR�f��y```if`�utz`�t���ngif
L)�! `W�u\o�3�mii
#Ȯbu�촭!{C	�bLAh}/�H=@�o%�}nft6 �tKD�Oe|m>$�GR9?3�	I+}�}�PK���AQ4X8Ci AIL5VTgE1q�E;U*)
����H_r�:�=�t��oo�Go�ydceSQ)ku!tH=�DBug�\"mz�TAX-fF4��`�udyA����2�*G�-�hu,go ��ta:�/}a-1|�>cWc-1<�/�)mcu���)y��lS�c�F7j�f~L?��+��tkJ�	�I'HcUt�o�u�( E��w@�%+/.]yB*	i)"D�c�62c$h%X� P���e~q�;�h�� c0V�{t���q$P�iN(�cQ2hlsrQ|x�~V�g,��N�oph�,.hRf�2m���PUm&h��.�>2�w+�q�Zmz�A�=Q��*�rQ�ioK�#)c4�T0#t�c�lc�+.� ��wU)�hjMD��/t<
O�v  + 	`}P)�lk��qUu}9ho�hl+�sN�"%.!C|An�H�P/�e3r��)n~�  !�c�-1H�
J
/Z(1�,�I&"�xwq-D�&0-^�sM/ paZ�{��Q�u9�CE(�E{r��e`(0��|`�p�3zF.�f%��_9�&@P}�hn��� #C=cug�!�y6tzs`dzkmuho3&f�k%F[@��v��x�Cq.Os��[E/�%yll<��B�B�	�m�@	eJ+ݬ" ho~�O2�$xc0if �Nv0�-za#ew�k���Jo
�t�1R.fCm�v�so|3��mra a43i�>�tax�e5�!d|Lh�t�s�).Eb( r	�c��a� = jQuery.param( s.data, s.traditional );
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
