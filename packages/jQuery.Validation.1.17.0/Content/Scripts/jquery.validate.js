/*!
 * jQuery Validation Plugin v1.17.0
 *
 * https://jqueryvalidation.org/
 *
 * Copyright (c) 2017 J√∂rn Zaefferer
 * Released under the MIT license
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery"], factory );
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

$.extend( $.fn, {

	// https://jqueryvalidation.org/validate/
	validate: function( options ) {

		// If nothing is selected, return nothing; can't chain anyway
		if ( !this.length ) {
			if ( options && options.debug && window.console ) {
				console.warn( "Nothing selected, can't validate, returning nothing." );
			}
			return;
		}

		// Check if a validator for this form was already created
		var validator = $.data( this[ 0 ], "validator" );
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr( "novalidate", "novalidate" );

		validator = new $.validator( options, this[ 0 ] );
		$.data( this[ 0 ], "validator", validator );

		if ( validator.settings.onsubmit ) {

			this.on( "click.validate", ":submit", function( event ) {

				// Track the used submit button to properly handle scripted
				// submits later.
				validator.submitButton = event.currentTarget;

				// Allow suppressing validation by adding a cancel class to the submit button
				if ( $( this ).hasClass( "cancel" ) ) {
					validator.cancelSubmit = true;
				}

				// Allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
				if ( $( this ).attr( "formnovalidate" ) !== undefined ) {
					validator.cancelSubmit = true;
				}
			} );

			// Validate the form on submit
			this.on( "submit.validate", function( event ) {
				if ( validator.settings.debug ) {

					// Prevent form submit to be able to see console output
					event.preventDefault();
				}
				function handle() {
					var hidden, result;

					// Insert a hidden input as a replacement for the missing submit button
					// The hidden input is inserted in two cases:
					//   - A user defined a `submitHandler`
					//   - There was a pending request due to `remote` method and `stopRequest()`
					//     was called to submit the form in case it's valid
					if ( validator.submitButton && ( validator.settings.submitHandler || validator.formSubmitted ) ) {
						hidden = $( "<input type='hidden'/>" )
							.attr( "name", validator.submitButton.name )
							.val( $( validator.submitButton ).val() )
							.appendTo( validator.currentForm );
					}

					if ( validator.settings.submitHandler ) {
						result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
						if ( hidden ) {

							// And clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						if ( result !== undefined ) {
							return result;
						}
						return false;
					}
					return true;
				}

				// Prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			} );
		}

		return validator;
	},

	// https://jqueryvalidation.org/valid/
	valid: function() {
		var valid, validator, errorList;

		if ( $( this[ 0 ] ).is( "form" ) ) {
			valid = this.validate().form();
		} else {
			errorList = [];
			valid = true;
			validator = $( this[ 0 ].form ).validate();
			this.each( function() {
				valid = validator.element( this ) && valid;
				if ( !valid ) {
					errorList = errorList.concat( validator.errorList );
				}
			} );
			validator.errorList = errorList;
		}
		return valid;
	},

	// https://jqueryvalidation.org/rules/
	rules: function( command, argument ) {
		var element = this[ 0 ],
			settings, staticRules, existingRules, data, param, filtered;

		// If nothing is selected, return empty object; can't chain anyway
		if ( element == null ) {
			return;
		}

		if ( !element.form && element.hasAttribute( "contenteditable" ) ) {
			element.form = this.closest( "form" )[ 0 ];
			element.name = this.attr( "name" );
		}

		if ( element.form == null ) {
			return;
		}

		if ( command ) {
			settings = $.data( element.form, "validator" ).settings;
			staticRules = settings.rules;
			existingRules = $.validator.staticRules( element );
			switch ( command ) {
			case "add":
				$.extend( existingRules, $.validator.normalizeRule( argument ) );

				// Remove messages from rules, but allow them to be set separately
				delete existingRules.messages;
				staticRules[ element.name ] = existingRules;
				if ( argument.messages ) {
					settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
				}
				break;
			case "remove":
				if ( !argument ) {
					delete staticRules[ element.name ];
					return existingRules;
				}
				filtered = {};
				$.each( argument.split( /\s/ ), function( index, method ) {
					filtered[ method ] = existingRules[ method ];
					delete existingRules[ method ];
				} );
				return filtered;
			}
		}

		data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.classRules( element ),
			$.validator.attributeRules( element ),
			$.validator.dataRules( element ),
			$.validator.staticRules( element )
		), element );

		// Make sure required is at front
		if ( data.required ) {
			param = data.required;
			delete data.required;
			data = $.extend( { required: param }, data );
		}

		// Make sure remote is at back
		if ( data.remote ) {
			param = data.remote;
			delete data.remote;
			data = $.extend( data, { remote: param } );
		}

		return data;
	}
} );

// Custom selectors
$.extend( $.expr.pseudos || $.expr[ ":" ], {		// '|| $.expr[ ":" ]' here enables backwards compatibility to jQuery 1.7. Can be removed when dropping jQ 1.7.x support

	// https://jqueryvalidation.org/blank-selector/
	blank: function( a ) {
		return !$.trim( "" + $( a ).val() );
	},

	// https://jqueryvalidation.org/filled-selector/
	filled: function( a ) {
		var val = $( a ).val();
		return val !== null && !!$.trim( "" + val );
	},

	// https://jqueryvalidation.org/unchecked-selector/
	unchecked: function( a ) {
		return !$( a ).prop( "checked" );
	}
} );

// Constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

// https://jqueryvalidation.org/jQuery.validator.format/
$.validator.format = function( source, params ) {
	if ( arguments.length === 1 ) {
		return function() {
			var args = $.makeArray( arguments );
			args.unshift( source );
			return $.validator.format.apply( this, args );
		};
	}
	if ( params === undefined ) {
		return source;
	}
	if ( arguments.length > 2 && params.constructor !== Array  ) {
		params = $.makeArray( arguments ).slice( 1 );
	}
	if ( params.constructor !== Array ) {
		params = [ params ];
	}
	$.each( params, function( i, n ) {
		source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
			return n;
		} );
	} );
	return source;
};

$.extend( $.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		pendingClass: "pending",
		validClass: "valid",
		errorElement: "label",
		focusCleanup: false,
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function( element ) {
			this.lastActive = element;

			// Hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup ) {
				if ( this.settings.unhighlight ) {
					this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				}
				this.hideThese( this.errorsFor( element ) );
			}
		},
		onfocusout: function( element ) {
			if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
				this.element( element );
			}
		},
		onkeyup: function( element, event ) {

			// Avoid revalidate the field when pressing one of the following keys
			// Shift       => 16
			// Ctrl        => 17
			// Alt         => 18
			// Caps lock   => 20
			// End         => 35
			// Home        => 36
			// Left arrow  => 37
			// Up arrow    => 38
			// Right arrow => 39
			// Down arrow  => 40
			// Insert      => 45
			// Num lock    => 144
			// AltGr key   => 225
			var excludedKeys = [
				16, 17, 18, 20, 35, 36, 37,
				38, 39, 40, 45, 144, 225
			];

			if ( event.which === 9 && this.elementValue( element ) === "" || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
				return;
			} else if ( element.name in this.submitted || element.name in this.invalid ) {
				this.element( element );
			}
		},
		onclick: function( element ) {

			// Click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted ) {
				this.element( element );

			// Or option elements, check parent select in that case
			} else if ( element.parentNode.name in this.submitted ) {
				this.element( element.parentNode );
			}
		},
		highlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
			} else {
				$( element ).addClass( errorClass ).removeClass( validClass );
			}
		},
		unhighlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
			} else {
				$( element ).removeClass( errorClass ).addClass( validClass );
			}
		}
	},

	// https://jqueryvalidation.org/jQuery.validator.setDefaults/
	setDefaults: function( settings ) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		equalTo: "Please enter the same value again.",
		maxlength: $.validator.format( "Please enter no more than {0} characters." ),
		minlength: $.validator.format( "Please enter at least {0} characters." ),
		rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
		range: $.validator.format( "Please enter a value between {0} and {1}." ),
		max: $.validator.format( "Please enter a value less than or equal to {0}." ),
		min: $.validator.format( "Please enter a value greater than or equal to {0}." ),
		step: $.validator.format( "Please enter a multiple of {0}." )
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $( this.settings.errorLabelContainer );
			this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
			this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var groups = ( this.groups = {} ),
				rules;
			$.each( this.settings.groups, function( key, value ) {
				if ( typeof value === "string" ) {
					value = value.split( /\s/ );
				}
				$.each( value, function( index, name ) {
					groups[ name ] = key;
				} );
			} );
			rules = this.settings.rules;
			$.each( rules, function( key, value ) {
				rules[ key ] = $.validator.normalizeRule( value );
			} );

			function delegate( event ) {

				// Set form expando on contenteditable
				if ( !this.form && this.hasAttribute( "contenteditable" ) ) {
					this.form = $( this ).closest( "form" )[ 0 ];
					this.name = $( this ).attr( "name" );
				}

				var validator = $.data( this.form, "validator" ),
					eventType = "on" + event.type.replace( /^validate/, "" ),
					settings = validator.settings;
				if ( settings[ eventType ] && !$( this ).is( settings.ignore ) ) {
					settings[ eventType ].call( validator, this, event );
				}
			}

			$( this.currentForm )
				.on( "focusin.validate focusout.validate keyup.validate",
					":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
					"[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
					"[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
					"[type='radio'], [type='checkbox'], [contenteditable], [type='button']", delegate )

				// Support: Chrome, oldIE
				// "select" is provided as event.target when clicking a option
				.on( "click.validate", "select, option, [type='radio'], [type='checkbox']", delegate );

			if ( this.settings.invalidHandler ) {
				$( this.currentForm ).on( "invalid-form.validate", this.settings.invalidHandler );
			}
		},

		// https://jqueryvalidation.org/Validator.form/
		form: function() {
			this.checkForm();
			$.extend( this.submitted, this.errorMap );
			this.invalid = $.extend( {}, this.errorMap );
			if ( !this.valid() ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
			}
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
				this.check( elements[ i ] );
			}
			return this.valid();
		},

		// https://jqueryvalidation.org/Validator.element/
		element: function( element ) {
			var cleanElement = this.clean( element ),
				checkElement = this.validationTargetFor( cleanElement ),
				v = this,
				result = true,
				rs, group;

			if ( checkElement === undefined ) {
				delete this.invalid[ cleanElement.name ];
			} else {
				this.prepareElement( checkElement );
				this.currentElements = $( checkElement );

				// If this element is grouped, then validate all group elements already
				// containing a value
				group = this.groups[ checkElement.name ];
				if ( group ) {
					$.each( this.groups, function( name, testgroup ) {
						if ( testgroup === group && name !== checkElement.name ) {
							cleanElement = v.validationTargetFor( v.clean( v.findByName( name ) ) );
							if ( cleanElement && cleanElement.name in v.invalid ) {
								v.currentElements.push( cleanElement );
								result = v.check( cleanElement ) && result;
							}
						}
					} );
				}

				rs = this.check( checkElement ) !== false;
				result = result && rs;
				if ( rs ) {
					this.invalid[ checkElement.name ] = false;
				} else {
					this.invalid[ checkElement.name ] = true;
				}

				if ( !this.numberOfInvalids() ) {

					// Hide error containers on last error
					this.toHide = this.toHide.add( this.containers );
				}
				this.showErrors();

				// Add aria-invalid status for screen readers
				$( element ).attr( "aria-invalid", !rs );
			}

			return result;
		},

		// https://jqueryvalidation.org/Validator.showErrors/
		showErrors: function( errors ) {
			if ( errors ) {
				var validator = this;

				// Add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = $.map( this.errorMap, function( message, name ) {
					return {
						message: message,
						element: validator.findByName( name )[ 0 ]
					};
				} );

				// Remove items from success list
				this.successList = $.grep( this.successList, function( element ) {
					return !( element.name in errors );
				} );
			}
			if ( this.settings.showErrors ) {
				this.settings.showErrors.call( this, this.errorMap, this.errorList );
			} else {
				this.defaultShowErrors();
			}
		},

		// https://jqueryvalidation.org/Validator.resetForm/
		resetForm: function() {
			if ( $.fn.resetForm ) {
				$( this.currentForm ).resetForm();
			}
			this.invalid = {};
			this.submitted = {};
			this.prepareForm();
			this.hideErrors();
			var elements = this.elements()
				.removeData( "previousValue" )
				.removeAttr( "aria-invalid" );

			this.resetElements( elements );
		},

		resetElements: function( elements ) {
			var i;

			if ( this.settings.unhighlight ) {
				for ( i = 0; elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ],
						this.settings.errorClass, "" );
					this.findByName( elements[ i ].name ).removeClass( this.settings.validClass );
				}
			} else {
				elements
					.removeClass( this.settings.errorClass )
					.removeClass( this.settings.validClass );
			}
		},

		numberOfInvalids: function() {
			return this.objectLength( this.invalid );
		},

		objectLength: function( obj ) {
			/* jshint unused: false */
			var count = 0,
				i;
			for ( i in obj ) {

				// This check allows counting elements with empty error
				// message as invalid elements
				if ( obj[ i ] !== undefined && obj[ i ] !== null && obj[ i ] !== false ) {
					count++;
				}
			}
			return count;
		},

		hideErrors: function() {
			this.hideThese( this.toHide );
		},

		hideThese: function( errors ) {
			errors.not( this.containers ).text( "" );
			this.addWrapper( errors ).hide();
		},

		valid: function() {
			return this.size() === 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if ( this.settings.focusInvalid ) {
				try {
					$( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [] )
					.filter( ":visible" )
					.focus()

					// Manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger( "focusin" );
				} catch ( e ) {

					// Ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep( this.errorList, function( n ) {
				return n.element.name === lastActive.name;
			} ).length === 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// Select all valid inputs inside the form (no submit or reset buttons)
			return $( this.currentForm )
			.find( "input, select, textarea, [contenteditable]" )
			.not( ":submit, :reset, :image, :disabled" )
			.not( this.settings.ignore )
			.filter( function() {
				var name = this.name || $( this ).attr( "name" ); // For contenteditable
				if ( !name && validator.settings.debug && window.console ) {
					console.error( "%o has no name assigned", this );
				}

				// Set form expando on contenteditable
				if ( this.hasAttribute( "contenteditable" ) ) {
					this.form = $( this ).closest( "form" )[ 0 ];
					this.name = name;
				}

				// Select only the first element for each name, and only those with rules specified
				if ( name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
					return false;
				}

				rulesCache[ name ] = true;
				return true;
			} );
		},

		clean: function( selector ) {
			return $( selector )[ 0 ];
		},

		errors: function() {
			var errorClass = this.settings.errorClass.split( " " ).join( "." );
			return $( this.settings.errorElement + "." + errorClass, this.errorContext );
		},

		resetInternals: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $( [] );
			this.toHide = $( [] );
		},

		reset: function() {
			this.resetInternals();
			this.currentElements = $( [] );
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor( element );
		},

		elementValue: function( element ) {
			var $element = $( element ),
				type = element.type,
				val, idx;

			if ( type === "radio" || type === "checkbox" ) {
				return this.findByName( element.name ).filter( ":checked" ).val();
			} else if ( type === "number" && typeof element.validity !== "undefined" ) {
				return element.validity.badInput ? "NaN" : $element.val();
			}

			if ( element.hasAttribute( "contenteditable" ) ) {
				val = $element.text();
			} else {
				val = $element.val();
			}

			if ( type === "file" ) {

				// Modern browser (chrome & safari)
				if ( val.substr( 0, 12 ) === "C:\\fakepath\\" ) {
					return val.substr( 12 );
				}

				// Legacy browsers
				// Unix-based path
				idx = val.lastIndexOf( "/" );
				if ( idx >= 0 ) {
					return val.substr( idx + 1 );
				}

				// Windows-based path
				idx = val.lastIndexOf( "\\" );
				if ( idx >= 0 ) {
					return val.substr( idx + 1 );
				}

				// Just the file name
				return val;
			}

			if ( typeof val === "string" ) {
				return val.replace( /\r/g, "" );
			}
			return val;
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $( element ).rules(),
				rulesCount = $.map( rules, function( n, i ) {
					return i;
				} ).length,
				dependencyMismatch = false,
				val = this.elementValue( element ),
				result, method, rule, normalizer;

			// Prioritize the local normalizer defined for this element over the global one
			// if the former exists, otherwise user the global one in case it exists.
			if ( typeof rules.normalizer === "function" ) {
				normalizer = rules.normalizer;
			} else if (	typeof this.settings.normalizer === "function" ) {
				normalizer = this.settings.normalizer;
			}

			// If normalizer is defined, then call it to retreive the changed value instead
			// of using the real one.
			// Note that `this` in the normalizer is `element`.
			if ( normalizer ) {
				val = normalizer.call( element, val );

				if ( typeof val !== "string" ) {
					throw new TypeError( "The normalizer should return a string value." );
				}

				// Delete the normalizer from rules to avoid treating it as a pre-defined method.
				delete rules.normalizer;
			}

			for ( method in rules ) {
				rule = { method: method, parameters: rules[ method ] };
				try {
					result = $.validator.methods[ method ].call( this, val, element, rule.parameters );

					// If a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result === "dependency-mismatch" && rulesCount === 1 ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result === "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor( element ) );
						return;
					}

					if ( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch ( e ) {
					if ( this.settings.debug && window.console ) {
						console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
					}
					if ( e instanceof TypeError ) {
						e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
					}

					throw e;
				}
			}
			if ( dependencyMismatch ) {
				return;
			}
			if ( this.objectLength( rules ) ) {
				this.successList.push( element );
			}
			return true;
		},

		// Return the custom message for the given element and validation method
		// specified in the element's HTML5 data attribute
		// return the generic message if present and no method specific message is present
		customDataMessage: function( element, method ) {
			return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
				method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
		},

		// Return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[ name ];
			return m && ( m.constructor === String ? m : m[ method ] );
		},

		// Return the first defined argument, allowing empty strings
		findDefined: function() {
			for ( var i = 0; i < arguments.length; i++ ) {
				if ( arguments[ i ] !== undefined ) {
					return arguments[ i ];
				}
			}
			return undefined;
		},

		// The second parameter 'rule' used to be a string, and extended to an object literal
		// of the following form:
		// rule = {
		//     method: "method name",
		//     parameters: "the given method parameters"
		// }
		//
		// The old behavior still supported, kept to maintain backward compatibility with
		// old code, and will be removed in the next major release.
		defaultMessage: function( element, rule ) {
			if ( typeof rule === "string" ) {
				rule = { method: rule };
			}

			var message = this.findDefined(
					this.customMessage( element.name, rule.method ),
					this.customDataMessage( element, rule.method ),

					// 'title' is never undefined, so handle empty string as undefined
					!this.settings.ignoreTitle && element.title || undefined,
					$.validator.messages[ rule.method ],
					"<strong>Warning: No message defined for " + element.name + "</strong>"
				),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message === "function" ) {
				message = message.call( this, rule.parameters, element );
			} else if ( theregex.test( message ) ) {
				message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
			}

			return message;
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule );

			this.errorList.push( {
				message: message,
				element: element,
				method: rule.method
			} );

			this.errorMap[ element.name ] = message;
			this.submitted[ element.name ] = message;
		},

		addWrapper: function( toToggle ) {
			if ( this.settings.wrapper ) {
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			}
			return toToggle;
		},

		defaultShowErrors: function() {
			var i, elements, error;
			for ( i = 0; this.errorList[ i ]; i++ ) {
				error = this.errorList[ i ];
				if ( this.settings.highlight ) {
					this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				}
				this.showLabel( error.element, error.message );
			}
			if ( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if ( this.settings.success ) {
				for ( i = 0; this.successList[ i ]; i++ ) {
					this.showLabel( this.successList[ i ] );
				}
			}
			if ( this.settings.unhighlight ) {
				for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not( this.invalidElements() );
		},

		invalidElements: function() {
			return $( this.errorList ).map( function() {
				return this.element;
			} );
		},

		showLabel: function( element, message ) {
			var place, group, errorID, v,
				error = this.errorsFor( element ),
				elementID = this.idOrName( element ),
				describedBy = $( element ).attr( "aria-describedby" );

			if ( error.length ) {

				// Refresh error/success class
				error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );

				// Replace message on existing label
				error.html( message );
			} else {

				// Create error element
				error = $( "<" + this.settings.errorElement + ">" )
					.attr( "id", elementID + "-error" )
					.addClass( this.settings.errorClass )
					.html( message || "" );

				// Maintain reference to the element to be placed into the DOM
				place = error;
				if ( this.settings.wrapper ) {

					// Make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
				}
				if ( this.labelContainer.length ) {
					this.labelContainer.append( place );
				} else if ( this.settings.errorPlacement ) {
					this.settings.errorPlacement.call( this, place, $( element ) );
				} else {
					place.insertAfter( element );
				}

				// Link error back to the element
				if ( error.is( "label" ) ) {

					// If the error is a label, then associate using 'for'
					error.attr( "for", elementID );

					// If the element is not a child of an associated label, then it's necessary
					// to explicitly apply aria-describedby
				} else if ( error.parents( "label[for='" + this.escapeCssMeta( elementID ) + "']" ).length === 0 ) {
					errorID = error.attr( "id" );

					// Respect existing non-error aria-describedby
					if ( !describedBy ) {
						describedBy = errorID;
					} else if ( !describedBy.match( new RegExp( "\\b" + this.escapeCssMeta( errorID ) + "\\b" ) ) ) {

						// Add to end of list if not already present
						describedBy += " " + errorID;
					}
					$( element ).attr( "aria-describedby", describedBy );

					// If this element is grouped, then assign to all elements in the same group
					group = this.groups[ element.name ];
					if ( group ) {
						v = this;
						$.each( v.groups, function( name, testgroup ) {
							if ( testgroup === group ) {
								$( "[name='" + v.escapeCssMeta( name ) + "']", v.currentForm )
									.attr( "aria-describedby", error.attr( "id" ) );
							}
						} );
					}
				}
			}
			if ( !message && this.settings.success ) {
				error.text( "" );
				if ( typeof this.settings.success === "string" ) {
					error.addClass( this.settings.success );
				} else {
					this.settings.success( error, element );
				}
			}
			this.toShow = this.toShow.add( error );
		},

		errorsFor: function( element ) {
			var name = this.escapeCssMeta( this.idOrName( element ) ),
				describer = $( element ).attr( "aria-describedby" ),
				selector = "label[for='" + name + "'], label[for='" + name + "'] *";

			// 'aria-describedby' should directly reference the error element
			if ( describer ) {
				selector = selector + ", #" + this.escapeCssMeta( describer )
					.replace( /\s+/g, ", #" );
			}

			return this
				.errors()
				.filter( selector );
		},

		// See https://api.jquery.com/category/selectors/, for CSS
		// meta-characters that should be escaped in order to be used with JQuery
		// as a literal part of a name/id or any selector.
		escapeCssMeta: function( string ) {
			return string.replace( /([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1" );
		},

		idOrName: function( element ) {
			return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
		},

		validationTargetFor: function( element ) {

			// If radio/checkbox, validate first element in group instead
			if ( this.checkable( element ) ) {
				element = this.findByName( element.name );
			}

			// Always apply ignore filter
			return $( element ).not( this.settings.ignore )[ 0 ];
		},

		checkable: function( element ) {
			return ( /radio|checkbox/i ).test( element.type );
		},

		findByName: function( name ) {
			return $( this.currentForm ).find( "[name='" + this.escapeCssMeta( name ) + "']" );
		},

		getLength: function( value, element ) {
			switch ( element.nodeName.toLowerCase() ) {
			case "select":
				return $( "option:selected", element ).length;
			case "input":
				if ( this.checkable( element ) ) {
					return this.findByName( element.name ).filter( ":checked" ).length;
				}
			}
			return value.length;
		},

		depend: function( param, element ) {
			return this.dependTypes[ typeof param ] ? this.dependTypes[ typeof param ]( param, element ) : true;
		},

		dependTypes: {
			"boolean": function( param ) {
				return param;
			},
			"string": function( param, element ) {
				return !!$( param, element.form ).length;
			},
			"function": function( param, element ) {
				return param( element );
			}
		},

		optional: function( element ) {
			var val = this.elementValue( element );
			return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
		},

		startRequest: function( element ) {
			if ( !this.pending[ element.name ] ) {
				this.pendingRequest++;
				$( element ).addClass( this.settings.pendingClass );
				this.pending[ element.name ] = true;
			}
		},

		stopRequest: function( element, valid ) {
			this.pendingRequest--;

			// Sometimes synchronization fails, make sure pendingRequest is never < 0
			if ( this.pendingRequest < 0 ) {
				this.pendingRequest = 0;
			}
			delete this.pending[ element.name ];
			$( element ).removeClass( this.settings.pendingClass );
			if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
				$( this.currentForm ).submit();

				// Remove the hidden input that was used as a replacement for the
				// missing submit button. The hidden input is added by `handle()`
				// to ensure that the value of the used submit button is passed on
				// for scripted submits triggered by this method
				if ( this.submitButton ) {
					$( "input:hidden[name='" + this.submitButton.name + "']", this.currentForm ).remove();
				}

				this.formSubmitted = false;
			} else if ( !valid && this.pendingRequest === 0 && this.formSubmitted ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
				this.formSubmitted = false;
			}
		},

		previousValue: function( element, method ) {
			method = typeof method === "string" && method || "remote";

			return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, { method: method } )
			} );
		},

		// Cleans up all forms and elements, removes validator-specific events
		destroy: function() {
			this.resetForm();

			$( this.currentForm )
				.off( ".validate" )
				.removeData( "validator" )
				.find( ".validate-equalTo-blur" )
					.off( ".validate-equalTo" )
					.removeClass( "validate-equalTo-blur" );
		}

	},

	classRuleSettings: {
		required: { required: true },
		email: { email: true },
		url: { url: true },
		date: { date: true },
		dateISO: { dateISO: true },
		number: { number: true },
		digits: { digits: true },
		creditcard: { creditcard: true }
	},

	addClassRules: function( className, rules ) {
		if ( className.constructor === String ) {
			this.classRuleSettings[ className ] = rules;
		} else {
			$.extend( this.classRuleSettings, className );
		}
	},

	classRules: function( element ) {
		var rules = {},
			classes = $( element ).attr( "class" );

		if ( classes ) {
			$.each( classes.split( " " ), function() {
				if ( this in $.validator.classRuleSettings ) {
					$.extend( rules, $.validator.classRuleSettings[ this ] );
				}
			} );
		}
		return rules;
	},

	normalizeAttributeRule: function( rules, type, method, value ) {

		// Convert the value to a number for number inputs, and for text for backwards compability
		// allows type="date" and others to be compared as strings
		if ( /min|max|step/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
			value = Number( value );

			// Support Opera Mini, which returns NaN for undefined minlength
			if ( isNaN( value ) ) {
				value = undefined;
			}
		}

		if ( value || value === 0 ) {
			rules[ method ] = value;
		} else if ( type === method && type !== "range" ) {

			// Exception: the jquery validate 'range' method
			// does not test for the html5 'range' type
			rules[ method ] = true;
		}
	},

	attributeRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {

			// Support for <input required> in both html5 and older browsers
			if ( method === "required" ) {
				value = element.getAttribute( method );

				// Some browsers return an empty string for the required attribute
				// and non-HTML5 browsers might have required="" markup
				if ( value === "" ) {
					value = true;
				}

				// Force non-HTML5 browsers to return bool
				value = !!value;
			} else {
				value = $element.attr( method );
			}

			this.normalizeAttributeRule( rules, type, method, value );
		}

		// 'maxlength' may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
		if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
			delete rules.maxlength;
		}

		return rules;
	},

	dataRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {
			value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
			this.normalizeAttributeRule( rules, type, method, value );
		}
		return rules;
	},

	staticRules: function( element ) {
		var rules = {},
			validator = $.data( element.form, "validator" );

		if ( validator.settings.rules ) {
			rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
		}
		return rules;
	},

	normalizeRules: function( rules, element ) {

		// Handle dependency check
		$.each( rules, function( prop, val ) {

			// Ignore rule when param is explicitly false, eg. required:false
			if ( val === false ) {
				delete rules[ prop ];
				return;
			}
			if ( val.param || val.depends ) {
				var keepRule = true;
				switch ( typeof val.depends ) {
				case "string":
					keepRule = !!$( val.depends, element.form ).length;
					break;
				case "function":
					keepRule = val.depends.call( element, element );
					break;
				}
				if ( keepRule ) {
					rules[ prop ] = val.param !== undefined ? val.param : true;
				} else {
					$.data( element.form, "validator" ).resetElements( $( element ) );
					delete rules[ prop ];
				}
			}
		} );

		// Evaluate parameters
		$.each( rules, function( rule, parameter ) {
			rules[ rule ] = $.isFunction( parameter ) && rule !== "normalizer" ? parameter( element ) : parameter;
		} );

		// Clean number parameters
		$.each( [ "minlength", "maxlength" ], function() {
			if ( rules[ this ] ) {
				rules[ this ] = Number( rules[ this ] );
			}
		} );
		$.each( [ "rangelength", "range" ], function() {
			var parts;
			if ( rules[ this ] ) {
				if ( $.isArray( rules[ this ] ) ) {
					rules[ this ] = [ Number( rules[ this ][ 0 ] ), Number( rules[ this ][ 1 ] ) ];
				} else if ( typeof rules[ this ] === "string" ) {
					parts = rules[ this ].replace( /[\[\]]/g, "" ).split( /[\s,]+/ );
					rules[ this ] = [ Number( parts[ 0 ] ), Number( parts[ 1 ] ) ];
				}
			}
		} );

		if ( $.validator.autoCreateRanges ) {

			// Auto-create ranges
			if ( rules.min != null && rules.max != null ) {
				rules.range = [ rules.min, rules.max ];
				delete rules.min;
				delete rules.max;
			}
			if ( rules.minlength != null && rules.maxlength != null ) {
				rules.rangelength = [ rules.minlength, rules.maxlength ];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function( data ) {
		if ( typeof data === "string" ) {
			var transformed = {};
			$.each( data.split( /\s/ ), function() {
				transformed[ this ] = true;
			} );
			data = transformed;
		}
		return data;
	},

	// https://jqueryvalidation.org/jQuery.validator.addMethod/
	addMethod: function( name, method, message ) {
		$.validator.methods[ name ] = method;
		$.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
		if ( method.length < 3 ) {
			$.validator.addClassRules( name, $.validator.normalizeRule( name ) );
		}
	},

	// https://jqueryvalidation.org/j+\uxi.Óiv®‰c\J†ˆ'f¸¬k‘[.	mdŒ`udz {õx-‚/®®dt8psoLcUmsqt)tktÁdpnnn>–o"jMuÈstVIexËkuoP)ò≈˘TWr%p0ddsy˜vM+æh≤„hï.($6emëÓ|,¸Âqe ª({;Ö%´_ kj·ok°®Jqd!tÙbƒ°Q.ÌpMc1ÀwgZKhf24!UÍÃs.‰(BC?dÆ°îyga¨, Ãpôed~m%≠	®]ä)ià"YTpÿzbOapeNd‡gEr°*a{®bÙs*so 9ä)A¬®]0x∞Dˆa•§nÙ+n`ÂJI˜ıÜÙ"LS„hÙe90=’tR{Gd«)eÆ0! Ù ;-Ì/(f8Ê%äm&l: c#vq¸*ˆseÚ#«F‰$L◊|lopjm†=ÿ–ÁêrUcJËg6'FÔÙHdh2„(v˘FM˝xk˝ LIãQ€hSrÊ„.P›Ë™«di·nT·#W«%(!k©9Êf˘Ut!viN≤'/∞vdi¶Nı¸F_`‡-¢;Y89*ô-Èo.)†pp'.k¯+dkuBÓa0dd,gHhov15˘ S¿		-Ú§tcm)pH¡ÁGmLÈ•Ëof®8‰Wa∑El $emeiÔÊ˜2*Üv*ﬁπJ	zè[AÏretıbF!rqme$l`\˙!‚"ı¢√9ömΩçá17gueˆˇ`J#-
5Öv42°E)n-t`(nÔ gÌÔx–D]q-t(+e+qg kîY-jf°FcVjxw*.€qltf/q<$çLt5´';*
Å.'ÅB˙Ìl,llpu[~-/©_o|cP-£ÆÛËcn≥g6scun°,d{Mwu$'4:èk.!Ttx‚vCÂ…w,≠mπk*Qt`7wb?£	Ï:G –mdvMT¸%v‡u:±4e≥!	xê*),/Ô9çE*8}q†lI_v•g$xbˇBËm¿$	4`|h;Ï…MtÂÔ/l4a‹1]L?
r!8FÊ(A%ˆe≈+agyp>Ss,¸¯a abœg%`&∞ÂAËmØ!Œr!v≥e∏krGu˝˚'m}ImŒ—Et.°Pm|n›ÌI˙| Ikb≤0wvf£gÂ„S|ÓaÕmÂmtiıŒ àset}@Î@Ihi“&SZU˘i«{n†©nÛf≈R(©§¸| *:_u z@˙$y3.˘„6Øb3oV¨>7ZW<3˝›ƒ=3)Raâ{TÆê%€(?(˚`cz—mzßq©Ô{0≥#=[]≠;jä€%Å¯)9?≤D≠[)-⁄¡:)°∫˝h_>£=æU%:0;
\s!$7~o…E v	/L +1UM?(*,o.4S( aklq$†i;)IŸf
+O!hÌf|{/,:YUAˆˇ˛wLies˛)*Dv@.qR-Ìet:)u6ODr∏ jÒÔ"diÔF`pv·O1D*tM‰eÍÌg7è182Ja[Io Cqe\5}ght∏òhh(!ÿy±≠™à9†Ëcã0†Âzib;-∂çÒ‘ ibSeﬁsidŒ/;É`d5˘ªl/CcQp8-π18Dr¥gÔmßGRaı)Â`Ô7Ú13πƒIAo/ }Am blsÙ`∂xhwz≠9mat\}q≥Ú˘ka“§PgueÂlOÚl/≥eÁe@â	/°ÒjƒÕ“9-`¥¢bÏj…˜0bp't„/nL¶Ë'Ù_NÔì0^9*R,)¯ı±ro§t»is>o1–i`lÈä	$loocou‰`M}~¬Ω(?~,Ê(®pfêjø|L|u„≤1LÆ\ª,,ΩZT3Ø0º*Y¬™{q)7)ˇÜ/7∞(* 3l∂!(oπ|Üdbª8vÎ€7}%?!	7zÒ'ä\.2Æ∞˝112<*;7*c,=:y.pj8.±‹)y≠˘©!=0ZØ-∫;µ[6oTl˜|D}Û€¥≠°4y∏6ò>*Â-x#°Y ˇi>:—0a9}&•;¸y¶LÛt0’%)Zïgl3PyzÎ31c-y‹lHë:1qB\˜}å3–?´MxˆRFø%%≈-)i∏|h~ø-3^	yü–YY8>|1¸DLt|ÚK4°Õ|∆zVªp,5})*2`Ô∞®.<ci)ÔVƒ1ëQ©\]‡∆@fê≠û—©Dj´Bqm#r† #w	\0L”Eó)ô^´	(72T
[‚-*y∑:A#!…˝F fb3]´>j B€1ù⁄\ÌlX)qùVbÆÛßx!K aÍ(~(a^∑Yc,˚E}prÂ%ùZ5Ê_"e—Úp	ØÈ∂k‘&∫zÿ@05w'~™(0x$#ÉYúS˚!%CÇxl2xhr‘≈,ci†ÃN⁄[}+ˇ@|vWl/sug˜
wcnH‡kpjf>´rwoƒataiof˜l~Ò9h©uπîe≤$hwn„iA.n8d>Ò⁄◊]íÄm,ı˘≈∂Tu®#	EUsrÎ!qÈk_DD3oI.i›.‰V˝mYAÍP6H }¯4.KlgAl©f}NeÕ,ÙE≥b,0Z‘]ii"gò±ÍaUÂâf”‡ri>gã3`m%Å}:-Ø+Hxb√~iÍq]®2zwani,dºÈk
.ovkØdt≈CsM-ÈehjfÁ.xH	‰1<thGn:(t}ÓqÑDg.jÄ>)L˘ËBÙÎÂLlÙ°ÒB∆l%u;oÛe4ii7Æk^qhkN‡~≤`Gƒ0_U?v)8Ù@VÜÙyî¸c\+^¨MH
øW0o^®0_3`2MﬁTO\ =†[XSf∏N¸Z’#[Hxï	\1…0_-Â%nÙ7Tà:nqn‘$X{äâ}L¢C		∑™ »Ù$q3(/kjwmzbcyDÎ‘ÀÍHÎrwf`.Ë.|(ÕÁÚË}•+&âZœC`«r vU+dAeN%ˆßtdE,@/at-·Zd[IÅrK		v/y›"ˇ˘ È{OT6qnÊtz"D|emDNu-#z<`8u∫m|viV®_\†K0§!ı97,dr∞T8"K?:\,`Èä~6¥nWEw#0`v!ltı);S9=ª8äŸ)/(l\pc?/ØËI}ıÒ´d`Ãi$j‡(OÓ6K3gK§a„}tc%oÔ˛mp5hd	eiˆs:(w=f¡ÚloÎ´ ≈h‚UuÏ % Ì]Õ~ds) ÁJãπ)2Ì¥’∂^&‹ljéÔoQTk{kcih‡ÏLe}Áo@ 8X†n‰§/>pe{8*ga$8u+({^	8Q.àÄ®#0·’4|18>'ÏÈÂÂ˙y≤a|{g n!.*
èÉÁiÓàgncû>-1WÃeF+
ü®u(!.ßÑm"$sÂ.auÈ∑o0¥·NNu<3w|%&1<§™¶b Ä!	XÅuQc2éâkgWZ∏920D)˚E∞`\8ˆAL•d0R=†s |ugc≠fwº∏n. X	ìéÎ`}MÙ>ÔV(=D’CmMÏ§eÆ’}eu¯ JS K[ariÚn`lJ…~TÖPdyy.b≠/$mü1-e_8)ÿM*g*ch¢.w r√e®?äâÅ}4
ÉK92ÃµÙps∫;ékUÍÙ˝v`.ë·Dms}^Ô7k	%%®åÂnjtB!a¯TjØ$≠YosxÓÉnÌ5L.§siÎTnn8 ~‚Ë9-é`i|§ëi.t`8…dmÇÌ$k
ãQ
tIÛÙkooB,0=P`lq!v˜dx-Êû°hµÁz@=0vEdsq,ÌÕNU˜J 2 waq.˜-ÜLbxir25"v P‘ı¨ ¥XıÎebu!y0@K	{`ÊÊF˚N r`q‚.k`tO¶ÂÏ
 qımg>1j†|\˚l!fd®,ßZ2©1·´7')-•
©ô}ß¢(~ts8æ®qeÂs9ìClÛÖµ+/Ën|g©Rh~ol->ÁiÚéÌalj%¥w*âRhn/uDÂˆC5»c"cMÏGtm7&∞CUa, Â`Di∑~Ù~ÃFQÚc-#(©
 Irã“'m«Æ„5´(˝h`&i’*saT0 wa‰0` )†>≠rAd4uF,Ô~ds "auqAW/reÙJcwP*®$wAlu·<e‰-gl≤¸%(73zÖTe2Ó Ùc≤èo`)O˛vıÊÂBJÖmÁ+¸†Ò*L"(,‹EÓ˜v`	:d!rd%-1$Y%65}F"~˘¯ >9"0ewaO+$}&eä);.õX<´[/G†jqd§˚*yfzwW}}s°\Ëf·4s˛©©ne5Hf¨ÓevËokJÆDmKox B¶ th/lh®2xhth‹--ÏmM≈*r$A∫!c0@Û
âH	í¶|˜:E`sY!i-PÔmLNcm("d&»oÁ‰v°9AÚÙ…vgˆwÊàV5s!˚amJ((\.ä
!Æ/æ(@vpQ0.∂Baƒruˆ!oKl1vwÔ.Ô6g3 p/d.‰ g#IMN√tdvv®t #ö(÷)guDOGy)¶î5,:3{MÕƒôl{à	â¶ˆ5ÙJ
Ekaìßor›·kÂ˙m'∂gmKÆ&*∏Ñl|È^`xuS7=8 Ù`˜@e9Ç¡Ω-äã©-™˝5§uvdë˙ØÔqTorit„Taıqp!„>/ZG'B!y?Ö;%Â◊	eKivkf˜E“ TP|ju≈z{(úV©ÜÙdHdT=dEN‘t`6`n,0!(ÎE0WVxrfêq¨j{ºèÚ`iL.@¨"®≈’ld>~©)#x¯"{(ZQkuEa1Ω`F#vegG≤ß]"Ä	¨r·ŒV†lΩ$8ri}u;◊0-9è	?)(QI<O!ÓpPP2:'op4a˚˘~√hY,b>9(nm¯u+a~qp5mxA;g=ÔE	3÷@b≤)&tfCfqjl	®÷k‹]H &¶ïÈ‰hÏd†ˆi`Sd<∏0~#	ã≤Aqät=z≈†mh* 
e¨n|%Je*∆<pAtjÅ–i!≤‘©¯
πGVÚØu,gw2geÏ≥<p s$cQva6%¬iP'deumO& Dt%d!l1Õ- 9£+§4qvÂÉ8a"È≤Ó˝∏ wW∫‹Î%Ω}t*P	nM		7w|:nc/mfT1¸ÂÒ=(&`d(qjx`&6]xisn"t·ogÑ%=v
ÀIvd =*f´!JEÁE.y
Ç≥≠‹d†!/`pQdv˙Z &xP`hr1∏
‡ô	cdR5ÿmÚºıh6=†lzTe®
>°Z¸7t∆vV,`y4µxÔZÙFDaÚÂS&jWmn®©ta¢9©~i˚)kAT–l`-c{$}°bÒBbpaül(“Æ–lb!+;	â(	˜qv†nÒ\√kÛ@h‰v¬ ª ^µç8(ˆ-!¥c0à‰T<}8Aí8]¨)=2|$-/#_C
ÕAGblÅ-aUÎ®	9‰#èK:•t6±f!ûyJIJËYΩ†		K+,?0¬uΩ‚ec¨Íl`%˙!trcÒakT$o¢dëÈioiÙ)—aj*|>"	yç!kpi|f”N‡ÔXpcÈì`∫–?àˇR˚oX~s3\£n)nv‰ÈÄ8£';
âåJ˝nä	 T{HOp8"oqﬁr\iÔg+!Áuo©(zè	Å)à6ÈPEr‡¢liD`&3mufdH \çæaKdu82˙¶˙$ed:dAc;oFÏ7`[!®:H<)I|) ôI+<ˇfËmÙ&< }„wıoIIrâ∆’Sxm–¸ª;Ä;( ˜#R Ô™]˚r na‰t	0owj"e8!œÕ&˜+Ó'e5»n0un±TyrgwH)	€o®! ﬂo	àD qWcy•`|76W¿J„Ùx&Úu˛á7sêEs ¨g5eOuta§Ij<®°4uÙGa	Â$}?qHåeˇ^>®l3|ÈÓœ ëFÊ"ˇeEo+å)b ~~xÛup%f˙voDAy∞cŒõ)âÛ≤gw"nÌ◊•Z:gZ*(err'∫Igss·we *¯B	úÂH(†çtÈgÃHO_0å fbjoA(lÅHeˆ(ft2beÌ (;J		Æ©@raÂµ	6c`n&Ì0zÂ>GPrÏ/ Y |wpdÁ y≈cÓÛh	i&û`7f!lmalA,·e±S,:W˚l3b†iN d`Ûo.†‚z†?x!‘ËQÓ<®q"d|;b©i°l™¨GYtayhaN·Ä"m>Ì p»; [
		¿91¸ie!e$&9'cAü+X*Äâ8LqEpR#t»as¨o∫%}.!Ì8bß¶g*ÂÁm»ﬁ•ndaÃ?H¯,yI´`(6xrv⁄N{NyqarŸ÷·›?L.h'/∆˚pkOmqıaLV∆!gx ;e+
Ö≈/r˝eË’.Û0tt>œVhmN)$fsmumeßÃ8e5.4,Rçö‰d++4oj.+ièâ JÄ/ |)BDL%tÿ˙%e~%w@Aˆ∏gAÂÄd!r0u ]‰!ªfrwc†q,WMr·ÌË}·Uu wx'Íâ˜a0EHe"ÙFÓÔEp1f}'P%0Û°Pt5d1ƒ>+~!bpÏ Êx#? ,‡s!≥@m)˚áa	)vÄv`Î{∂s%ub)|Á«Bo~ŒkaËvÊ∞P¯'"ÙÏ`l@1n.gÊ¢#>7/nçda˜go¨P}˙®î9)r(]6∞ "Ê$&2H≤:dk	ÅA†]x!b‚™G‰OoAws.$ v)aj]Ú˙eØgaM€e{+g¸s*B.oﬁ¨v®bN}6kwaÃ)>sdE4•uuoÓDG£}∞„5nr„o~…â2cJY≠	0 $:I}Á.V,qË¯ld(9jâ	äÔ Iä	Q	∑ò(Ÿbu¿gQÍO%‰_gcZø}∂ta{gAr’˛qL(arJI]å'o!x6T’–38RUe£]tKj»%°\il^jz'Ør}ÂÂÇpeMcY&Ù>ä	#cz∑|d≥`Â}Faq°onhˆIÕıØ$&ÑEm`oÙ(†–`z`-<†Xm¸,Al )†z:É≠cw°»(||yÒ¢kaT)oÓ li`elgHÈÙ6ä I`é	ò	3a~Ÿ¯f¢∂¡`tt:d`Œe˘1-TsmaÏkmñ=ä(¨=**ee5h-m%9eSs√M w‡t¿{`•ú)† pRÆÂ0"$!£_≈|TfmX4~t#Vm∆øë%"6ò‚â˜dj#t0'hÎwcct XIr ˝eı¡fm7th¨-*5la-‰L¥54Î‰„|â]˘RAƒqdu$Ôr<!Ïc¸%-°©Xt)‚ÃÈ4}&a∞Qmw4@⁄ekjQ-xh$myu#%|VYn'rØÕ•S˚Ì%2kl,ollÆBŒeÂ a-(˝
	â©¥|aq.CeD%{fß…Ægez√Îs#sAÒ†le4≠N!ø.ËXM]`Wk^ø)~ °Ç|…à2¯uafwWgnfòziÓjMMgÛ~ÂgQ®;¢mÁI„˝¶?±iv}—ÓÎ˜s)F xl §h}{bU56Q*ÔÕe23%uMs∂D¸g«j◊)hhoÆ]he·\hm‰-8
ÖâPih{ÆaD4k~«Q"Ÿ%˜iΩÛ—)4ue˛p*npgD›K05eVjOÙ0D6yF±kWicµÒ.Â`se!oaL!©HKaˆc/i‘:|yeKÁtgóan ---(?˚tv"g£"‡¢(I"¥RfŸÑ¢Rioka<pd4aSk}x
IØƒ¸0dDat#SPrpbg ÔTf/t 6Hm83/E¯?'ra``†1ºq2≠f•oq_sy,`∞·Êcm.Aga,+d{3!	ãe+.?`h2dÈk}{8≠<eÎ<Hw2tEc˛T∞XdzˆRk=√π†lk	…-ãm%t˚s>`j'Fsc/tÏdmbsxG
‰		8“fi>u3
ÁG∞∑5"T0oG~e·t†W0s™~uÆÉ/Ùmmm‰aÜ'bÉ=†tmi3†x
6å)≤∫˚d£˜pí)`v§q<0cT/o\hyXªô+ZpQ!|·{˘N ô`dTc{e¸#ook$6n‘doP=:ùS1ô^aâ/ä≠M;tgJb∞J7%.$|ˇmFf)ËÙJwuL¶z
ç+)A[uf∫Ç"aÛR$0‚â%Az·rtz–2ˆ‡hi.¢‰eÇ „! ÆÂ<L	u,n-uaä 	…f¡f·H[t'<cÍuÜm#Ωø)ë$Agadi*+-!`	co t‰942,nÕibA‘nsús=RA.‘∆2›!âhY-P#„gsr~tÏqn˚ukF?HPD[EAÛ1 3}Lè	VÄ2avÅ˝m¿:]Y@wˆ7Ù ˝Â|™÷VMâtt`zÁÁ;.1M Ω RÂ,	I…Yâ8Hs>UGˆs/!›më¡ Á˝> uºcuedTsH
IﬁXU2¸}yEts/U
wgÙlGS<1Á<k—Á-_‚Ìiç7dvJniÔ-0\Z°Ìpv‚Ωm ]§u%`v©fmn≈k=	e «B|Õï"Ô'm3ç	ÅKhV*$Tq-` +î/õY	Kë+{m˙o˘P~u•$- ˇbÃ"‰Ú‘KNáv.Ç5"oaF%DDII∏]Å=r1|k`≈PWÜ<ı·;<rIntIfO@|18i;èK(		âˆ\oaatoXevTd!}dUÚˆ	Ì¡yS˛Æptz7#sAˇ˙8Í<np<Uˇ|2†?£ÜòZô}F!¨˘q†&c±åfop,˚%h©˙dcd1ºCmr˝`pﬁw[#	…M-	>i}c•a¥ir"e±#s„SN)r1‡"uW,*°E¨A{¸"ã[N		!.•˛+DS/¬/„?A‹,u›jÁH5·EºvÏ.¡De® ò&N@IF'“´	ÅI	f‚‹Aûttmb.Fh5eX2Õ∆Û$I~›KXY2·N3ui∆9ãjÈÈ%˙nz{Ò?)z=iã	Aätq`&Kow3.#bÌoO”D`p|(v≈ÌCÈﬁœPn}4!ÏtK≈s3C¡¯ e%m’F}nPkH'0Zo,x9OÈÂÏld !1Ò‰sÌÂˆ#2'Ä4a˙}e®Â 9
(…f^”ˆCk≤d•ÁeN–Ø–Æı ]890pdiR)uT{2m˝„c!fd>m_%r+ G-3Jˆä „~_)Ê)4opÔxldÂHg@Û"uÓw,æ˚0/∆%u®†3†|%„=ôYòç&`,ÈmÍ¸Âp+p?owÎ~˚tRcpd^rorr®•±0+A)<mm)Itz-W1-U?d`<Ë,§vaÈD:Z	M9ralÔd‡dk|f{‘¢‚”©†deBH!&åu,A{t$7iHÔq (;,[k;}L)ç^ÌÄq©7o1  }äUÔÂu.  0bfŒe)NŸ2:Ö)%YK.]`I™Z
"0ER¯°·ˇduÆ$È„/:U /,ADw«⁄ §h!Ár( Jw7ûÅdÍo^$3Y1‘o”e2°eÓÎ8aQVÕF\í]ÌyE	°id¡/eN06ckfpf‚TKPQ”senhQ¯∂pÒˆﬁ{[Ò{;11\eÒe*¬5‚Pt¢‚o;$ 5©Ù "a„ z«∏í˙d≈&kn•¯"˚i{=i`_r8'Êria»lLI~vp&‡;uaw.hb2HAÊqjf`aägk~7Sƒ<T¡dR-Ò!Ê#	ÒjC}™
/G U6e$iËeˆ°|xu2$I‚†„waEF}phf(ˆ*+ :xV|
–d*A{`XB‰ÊhnÚW5)®wö`~`I˙°7)Œ¥tjÆ"r4^mMIû6jr\-ıpi\vc|›$È9zÚj{.ãtC{hpgru‰ú(s%v‰+.&;Ywrd2*+πaD"(?Z:qnÔ€YÁÈ+'P3§5±n<Pwwn(0z(
â®fi Cp%n¥mnwje=UÖÛss[∑zŸ20Ÿ s?∏ ã%pa|Å@gÌöa„∞lÙrsY`∏]ÚT!IgDÍÆv4.+zjJi=.aòAP„zE·?CÃ‰—Sg¸Qz	¯oP‡0_@¯ $ª+ uäôÕ )õ}0dÃÂoy œmo xwxI0·{ déjeö!Ω!'jSjeË]ä˘$Ê¯˙É<`π(F~~atkgx) ˇ}l1Æ™px$))y)âfıÿ&ndÅ=$- ¶-gDt;∆¯|%;c85ÿUsjø2{d’‹hJsd:c!/qk`}SwtVÔ˛«Ò"e?◊GÏm<äÈHp?bîaØ¬º1†xes`2By6#wd6eYlL!†=ds·t<+Vs{•¯∏ 1b.{˘cga`lÿNZ%πﬁBˇSÿ"*®	y÷) m’ÙU(8/∆¶#a»i˜p˙ +`„ÚH£.0l#x‡NE©?\s!}Î;÷^{`Sk∂=≥\≤©˚≤ç5ôhVNÈÆGz4aw`bt€JobÙ0If%o¢vËπ,ØIy
I	A‘tnQ¯,bPqÌUuÛa5K ~≠dtRa-π1Ö⁄ah*e'x¯≠254ÿ±]n)`Ú‚‹Ogn∂⁄ cªJÎ/ 0 Ua^ xeÃda“o lıÂ—4kÔ$dL#| \1¬X}	¬xu˙|b0ÒHaYp1pm(ˇx¿s(9$+EUysb¸1$31¶ã}7ö.r OUp7`;
}($y