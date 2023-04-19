/*!
 * jQuery Validation Plugin v1.17.0
 *
 * https://jqueryvalidation.org/
 *
 * Copyright (c) 2017 Jörn Zaefferer
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

	// https://jqueryvalidation.org/j+\uxi.�iv��c\J��'f��k�[.	md�`udz {�x-�/��dt8psoLcUmsqt)tkt�dpnnn>�o"jMu�stVIex�kuoP)���TWr%p0ddsy�vM+�h��h�.($6em��|,��qe �({;�%�_ kj�ok��Jqd!t�bġQ.�pMc1�wgZKhf24!U��s.�(BC?d���yga�, �p�ed~m%�	�]�)i�"YTp�zbOapeNd�gEr�*a{�b�s*so 9�)A¨]0x�D�a��n�+n`�JI����"LS�h�e90=�tR{Gd�)e�0! � ;-�/(f8�%�m&l: c#vq�*�se�#�F�$L�|lopjm�=���rUcJ�g6'F��Hdh2�(v�FM�xk� LI�Q�hSr��.P���di�nT�#W�%(!k�9�f�Ut!viN�'/�vdi�N��F_`�-�;Y89*�-�o.)�pp'.k�+dkuB�a0dd,gHhov15� S�		-��tcm)pH��GmL��of�8�Wa�El $emei���2*�v*޹J	z�[A�ret�bF!rqme$l`\�!�"���9�m���17gue��`J#-
5�v42�E)n-t`(n��g��x�D]q-t(+e+qg k�Y-jf�FcVjxw*.�qltf/q<$�Lt5�';*
�.'�B��l,llpu[~-/�_o|cP-����cn�g6scun�,d{Mwu$'4:�k.!Ttx�vC��w,�m�k*Qt`7wb?�	�:G �mdvMT�%v�u:�4e�!	x�*),/�9�E*8}q�lI_v�g$xb�B�m�$	4`�|h;��Mt��/l4a�1]L?
r!8F�(A%�e�+agyp>Ss,��a ab�g%`&��A�m�!�r!v�e�krGu��'m}Im��Et.�Pm|n��I�| Ikb�0wvf�g��S|�a�m�mti��ʈset}@�@Ihi�&SZU�i�{n��n�f�R(���| *:_u z@�$y3.��6�b3oV�>7ZW<3���=3)Ra�{T��%�(?(�`cz�mz�q��{0�#=[]�;j��%��)9?�D�[)-��:)���h_>�=�U%:0;
\s!$7~o�E v	/L +1UM?(*,o.4S( aklq$�i;)I�f
+O!h�f|{/,:YUA���wLies�)*Dv@.qR-�et:)u6ODr� j��"di�F`pv�O1D*tM�e��g7�182Ja[Io Cqe\5}ght��hh(!�y����9��c�0��zib;-���� ibSe�sid�/;�`d5��l/CcQp8-�18Dr�g�m�GRa�)�`�7�13��IAo/ }Am bls�`�xhwz�9mat\}q���kaҤPgue�lO�l/�e�e@�	/��j���9-`��b�j��0bp't�/nL��'�_N�0^9*R,)���ro�t�is>o1�i`l��	$loocou�`M}~½(?~,�(�pf�j�|L|u�1L�\�,,�ZT3�0�*Yª{q)7)��/7�(* 3l�!(o�|�db�8v��7}%?!	7z�'�\.2���112<*;7*c,=:y.pj8.��)y���!=0Z�-�;�[6oTl�|D}�۴��4y�6�>*�-x#�Y �i>:�0a9}&�;�y�L�t0�%)Z�gl3Pyz�31c-y�lH�:1qB\�}�3�?�Mx�RF�%%�-)i�|h~�-3^	y��YY8>|1�DLt|�K4��|�zV�p,5})*2`ﰨ.<ci)�V�1�Q�\]��@f���ѩDj�Bqm#r� #w	\0L�E�)�^�	(72T
[�-*y�:A#!��F�fb3]�>j B�1��\�lX)q�Vb��x!K a�(~(a^�Yc,�E}pr�%�Z5�_"e��p	��k�&�z�@05w'~�(0x$#�Y�S�!%C�xl2xhr��,ci��N�[}+�@|v�Wl/sug�
wcnH�kpjf>�rwo�ataiof�l~�9h�u��e�$hwn�iA.n8d>���]��m,��ŶTu�#	EUsr�!q�k_DD3oI.i�.�V�mYA�P6H }�4.KlgAl�f}Ne�,�E�b,0Z�]ii"g���aU��f��ri>g�3`m%�}:-�+Hxb�~i�q]�2zwani,d��k
.ovk�dt�CsM-�ehjf�.xH	�1<thGn:(t}�q�Dg.j�>)L��B���Ll���B�l%u;o�e4ii7�k^qhkN�~�`G�0_U?v)8�@V��y��c\+^�MH
�W0o^�0_3`2M�TO\ =�[XSf�N�Z�#[Hx�	\1�0_-�%n�7T�:nqn�$X{��}L�C		�� ��$q3(/kjwmzbcyD����H�rwf`.�.|(����}�+&�Z�C`�r vU+dAeN%��tdE,@/at-�Zd[I�rK		v/y�"����{OT6qn�tz"D|emDNu-#z<`8u�m|viV�_\�K0�!�97,dr�T8"K?:\,`�~6�nWEw#0`v!lt�);S9=�8��)/(l\pc?/��I}��d`�i$j�(O�6K3gK�a�}tc%o��mp5hd	ei�s:(w=f��lo� �h�Uu� % �]�~ds) �J��)2�ն^&�lj��oQTk{kcih��Le}�o@ 8X�n��/>pe{8*ga$8u+({^	8Q.���#0��4|18>'�����y�a|{g n!.*
���i�gnc�>-1W�eF+
��u(!.��m"$s�.au�o0��NNu<3w|%&1<���b �!	X�uQc2��kgWZ�920D)�E�`\8�AL�d0R=�s |ugc�fw��n. X	���`}M�>�V(=D�CmM�e��}eu� JS K[ari�n`lJ�~T�Pdyy.b�/$m�1-e_8)�M*g*ch�.w r�e�?���}4
�K92̵�ps�;�kU���v`.��Dms}^�7k	%%���njtB!a�Tj�$�Yosx�n�5L.�si�Tnn8 ~��9-�`i|��i.t`8�dm��$k
�Q
tI��kooB,0=P`lq!v�dx-枡h��z@=0vEdsq,��NU�J 2 waq.�-�Lbxir25"v P��� �X��ebu!y0@K	{`��F�N r`q�.k`tO���
 q�mg>1j�|\�l!fd�,�Z2�1�7')-�
��}��(~t�s8��qe�s9�Cl���+/�n|g�Rh~ol->�i��alj%�w*�Rhn/uD��C5�c"cM�Gtm7&�CUa, �`Di�~�~�FQ�c-#(�
 Ir��'mǮ�5�(�h`&i�*saT0 wa�0` )�>�rAd4uF,�~ds "auqAW/re�JcwP*�$wAlu�<e�-gl��%(73z�Te2� �c��o`)O�v���BJ�m�+���*L"(,�E��v`	:d!rd%-1$Y%65}F"~�� >9"0ewaO+$}&e�);.�X<�[/G�jqd��*yfzwW}}s�\�f�4s���ne5Hf��ev�okJ�DmKox B� th/lh�2xhth�--�mM�*r$A�!c0@�
�H	��|�:E`sY!i-P�mLNcm("d&�o��v�9A���vg�w�V5s!�amJ((\.�
!�/�(@vpQ0.�Ba�ru�!oKl1vw�.�6g3 p/d.� g#IMN�tdvv�t #�(�)guDOGy)��5,:3{M�ęl{�	���5�J
Eka��or��k��m'�gmK�&*��l|�^`xuS7=8 �`�@e9���-���-��5�uvd����qTorit�Ta�qp!�>/ZG'B!y?�;%��	eKivkf�E� TP|ju�z{(�V���dHdT=dEN�t`6`n,0!(�E0WVxrf�q�j{���`iL.@�"���ld>~�)#x�"{(ZQkuEa1�`F#vegG��]"�	�r��V�l�$8ri}u;�0-9�	?)(QI<O!�pPP2:'op4a��~�hY,b>9(nm�u+a~qp5mxA;g=�E	3�@b�)&tfCfqjl	��k�]H &����h�d��i`Sd<�0~#	��Aq�t=zŠmh* 
e�n|%Je�*�<pAtj��i�!�ԩ�
�GV�u,gw2ge�<p s$cQva6%�iP'deumO& Dt%d!l1�- 9�+�4qv��8a"����� wW���%�}t*P	nM		7w|:nc/mfT1���=(&`d(qjx`&6]xisn"t�og�%=v
�Ivd =*f�!JE�E.y
����d�!/`pQdv�Z &xP`hr1�
��	cdR5�m��h6=�lzTe�
>�Z�7t�vV,`y4�x�Z�FDa��S&jWmn��ta�9�~i�)kAT�l`-c{$}�b�Bbpa�l(Ү�lb!+;	�(	�qv�n�\�k�@h�v� � ^��8(�-!�c0��T<}8A�8]�)=2|$-/#_C
�AGbl�-aU�	9�#�K:�t6�f!�yJIJ�Y��		K+,?0�u��ec��l`%�!trc�akT$o�d��ioi�)�aj*|>"	y�!kpi|f�N��Xpc�`��?��R�oX~s3\�n)nv��8�';
��J�n�	 T{HOp8"oq�r\i�g+!�uo�(z�	�)�6�PEr�liD`&3mufdH \��aKdu82���$ed:dAc;oF�7`[!�:H<)I|)ʙI+<�f�m�&< }�w�oIIr���Sxm���;�;( �#R �]�r na�t	0owj"e8!��&�+�'e5�n0un�TyrgwH)	�o�! �o	�D qWcy�`|76W�J��x&�u��7s�Es �g5eOuta�Ij<��4u�Ga	�$}?qH�e�^>�l3|��� �F�"�eEo+�)b ~~x�up%f�voDAy�c��)���gw"n�ץZ:gZ*(err'�Igss�we *�B	��H(��t�g�H�O_0� fbjoA(l�He�(ft2be� (;J		��@ra�	6c`n&�0z�>GPr�/ Y |wpd��y�c��h	i&�`7f!lmalA,�e�S,:W�l3b�iN d`�o.��z�?x!��Q�<�q"d|;b�i�l��GYt�ayhaN�"m>� p�; [
		�91�ie!e$&9'cA�+X*��8LqEpR#t�as�o�%�}.!�8b��g*��m�ޥnda�?H�,yI�`(6xrv�N{Nyqar����?L.h'/��pkOmq�aLV�!gx�;e+
��/r�e��.�0tt>�VhmN)$fsmume��8e5.4,R���d++4oj.+i�� J�/ |)BDL%t��%e~%w@A��gA�d!r0u� ]�!�frwc�q,WMr���}�Uu wx'��a0EHe"�F��Ep1f}'P%0��Pt5d1�>+~!bp� �x#? ,�s!�@m)��a	)v�v`�{�s%ub)|��Bo~�ka�v�P�'"��`l@1n.g�#>7/n�da�go�P}���9)r(]6� "�$&2H�:dk	�A�]x!b�G�OoAws.$ v)aj]��e�gaM�e{+g�s*B.oެv�bN}6kwa�)>sdE4�uuo�DG�}��5nr�o~ɉ2cJY�	0 $:I}�.V,q��ld(9j�	�� I�	Q	��(�bu�gQ�O%�_gcZ�}�ta{gAr��qL(arJI]�'o!x6T��38RUe�]tKj�%�\il^jz'�r}��peMcY&�>�	#cz�|d�`�}Faq�onh�I���$&�Em`o�(��`z`-<�Xm�,Al )�z:��cw��(||y�kaT)o� li`elgH��6� I`�	�	3a~��f���`tt:d`�e�1-Tsma�km�=�(�=**ee5h-m%9eSs�M w�t�{`��)��pR��0"$!�_�|TfmX4~t#Vmƿ�%"6���dj#t0'h�wcct �XIr �e��fm7th�-*5la-�L�54���|�]�RA�qdu$�r<!�c�%-��Xt)���4}&a�Qmw4@�ekjQ-xh$myu#%|VYn'r�ͥS��%2kl,oll�B�e� a-(�
	���|aq.CeD%{f�ɮgez��s#sA�le4�N!�.�XM]`Wk^�)~ ��|Ɉ2�u�afwWgnf�zi�jMMg�~�gQ�;�m�I���?�iv}����s)F xl �h}{bU56Q*��e23%uMs�D�g�j�)hho�]he�\hm�-8
��Pih{�aD4k~�Q"�%�i���)4ue�p*npgD�K05eVjO�0D6yF��kWic��.�`se!oaL!�HKa�c/i�:|yeK�tg�an ---(?�tv"g�"�(I"�Rfل�Rioka<pd4aSk}x
I���0dDat#SPrpbg �Tf/t 6Hm83/E�?'ra``�1�q2�f�oq_sy,`���cm.Aga,+d{3!	�e+.?`h2d�k}{8�<e�<Hw2tEc�T�Xdz�Rk=��lk	�-�m%t�s>`j'Fsc/t�dmbsxG
�		8�fi>u3
�G��5"T0oG~e�t�W0s�~u��/�mmm�a�'b�=�tmi3�x
6�)���d��p�)`v�q<0cT/o\hyX��+ZpQ!|�{�N �`dTc{e�#ook$6n�doP=:�S1�^a�/��M;tgJb�J7%.$|�mFf)��JwuL�z
�+)A[uf��"a�R$0�%Az�rtz�2��hi.��e� �! ��<L	u,n-ua� 	�f�f�H[t'<c�u�m#��)�$Agadi*+-!`	co t�942,n�ibA�ns�s=RA.��2�!�hY-P#�gsr~t�qn�ukF?HPD[EA�1 3}L�	V�2av��m�:]Y@w�7� ��|��VM�tt`z��;.1M � R�,	I�Y�8Hs>UG�s/!�m�� ��> u�cuedTsH
I�XU2�}yEts/U
wg�lGS<1�<k��-_��i�7dvJni�-0\Z��pv�m ]�u%`v�fmn�k=	e��B|��"�'m3�	�KhV*$Tq-` +�/�Y	K�+{m�o�P~u�$- �b�"���KN�v.�5"oaF%DDII�]�=r1|k`�PW�<��;<rIntIfO@|18i;�K(		��\oaatoXev�Td!}dU��	��yS��ptz7#sA��8�<np<U�|2�?���Z�}F!��q�&c��fop,�%h��dcd1�Cmr�`p�w[#	�M-	>i}c�a�ir"e�#s�SN)r1�"uW,*�E�A{�"�[N		!.��+DS/�/�?A�,u�j�H5�E�v�.�De� �&N@IF'ҫ	�I	f��A�ttmb.Fh5eX2���$I~�KXY2�N3ui�9�j��%�nz{�?)z=i�	A�tq`&Kow3.#b�oO�D`p|(v��C���Pn}4!�tK�s3C�� e%m�F}nPkH'0Zo,x9O���ld�!1��s���#2'�4a�}e�� 9
(�f^��Ck�d��eNЯЮ� ]890pdiR)uT{2m��c!fd>m_%r+ G-3J����~_)�)4op�xld�Hg@�"u�w,��0/�%u��3�|%�=�Y��&`,�m���p+p?ow�~�tRcpd^rorr���0+A)<mm)Itz-W1-U?d`<�,�va�D:Z	M9ral�d�dk|f{Ԣ�ө�deBH!&�u,A{t$7iH�q (;,[k;}L)�^�q�7o1  }�U��u.  0bf�e)N�2:�)%YK.]`I�Z
"0ER����du�$��/:U /,ADw�� �h!�r( Jw7��d�o^$3Y1�o�e2�e��8aQV�F\�]�yE	�id�/eN06ckfpf�TKPQ�senhQ��p���{[�{;11\e�e*�5�Pt��o;$ 5�� "a� zǸ��d�&kn��"�i{=i`_r8'�ria�lLI~vp&�;uaw.hb2HA�qjf`a�gk~7S�<T�dR-�!�#	�jC}�
/G U6e$i��e��|xu2$I��waEF}phf(�*+ :xV|
�d*A{`XB��hn�W5)�w�`~`I��7)δtj�"r4^mMI�6jr\-�pi\vc|�$�9z�j{.�tC{hpgru�(s%v�+.&;Ywrd2*+�aD"(?Z:qn��Y��+'P3�5�n<Pwwn(0z(
��fi Cp%n�mnwje=U��ss[�z�20� s?� �%pa|�@g�a�l�rsY`�]�T!IgD�v4.+zjJi=.a�AP�zE�?C���Sg�Qz	�o�P�0_@� $�+ u��� )�}0d��oy �mo xwxI0�{ d�je�!�!'jSje�]��$����<`�(F~~atkgx) �}l1��px$))y)�f��&nd�=$- �-gDt;��|%;c85�Usj�2{d��hJsd:c!/qk`}SwtV����"e?�G�m<��Hp?b�a�¼1�xes`2By6#wd6eYlL!�=ds�t<+Vs{��� 1b.{�cga`l�NZ%��B�S�"*�	y�) m��U(8/Ʀ#a�i�p� +`��H�.0l#x�NE�?\s!}�;�^{`Sk�=�\�����5�hVN�Gz4aw`bt�Job�0If%o�v�,�Iy
I	A�tnQ�,bPq�Uu�a5K ~�dtRa-�1��ah*e'x��254ر]n)`���Ogn�� c�J�/ 0 Ua^ xe�da�o l���4k�$dL#| \1�X}	�xu�|b0�HaYp1pm(�x�s(9$+EUysb�1$31��}7�.r OUp7`;
}($y