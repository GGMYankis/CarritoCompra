/*!
 * jQuery Validation Plugin v1.17.0
 *
 * https://jqueryvalidation.org/
 *
 * Copyright (c) 2017 JÃ¶rn Zaefferer
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

			if ( t8rÅ ¬ J@l!6‰F?8›ˆ-'¬2OoøUşêsS}wk«Dğ!riU/­T5©òeæiY(J)	‹aó"h%Va,*óeBó\2*!$ 5*p½"$5¬,"sXUP`h3p!¤hTÕ"¿0RÁ	²~g]âw+VUo•jUçó.Ú( Áö )yJM‹8UŠ>	jn'f%ååC9$âöO?{úÓ˜-‰.?SnénoB`wD4õé0>Š	A%Ø0 Ãl<¨{|EÊFMèil*-rNsû;ËHh¦ hˆkpx!¦-%°(ã¡
	H9	6e¼%–ìd~§Ø>d"sptãÂC*E( *›Ã9±u£…	c‰n?!Vo€/vk-bçSIÅv>cÔx8	B$t i"~ |.äip}Ì,wp{F©rŒd1i3ÚéÆ#8$‰dze2u «‚(¨:‰ƒ	7aå\roè7µl-wU
stö(á)hø ;,a#(*R‰É]L
‰//áqa55u¡±.jìîU$tÓym‰HH:İd|ñÃ§Ö¹^*)‰yú€		9s?4F(öyòd€qKm4=Új+w5b)KW*1I zÊ	K		vÄpe²N&6b,=&mV,ÀÂe(°/x¯5<á> i«‚KÉ	9
OMAÒ-¶§Oæt¦h9I9œ‹+ã`$¡/ DunjWI©fÂ$îl×k%n>*C!¿Ê8•E!,g]o.ÔÀ} zPIq&4iha|?ìkODadgg¾ª'r|¸´ô 7C
uc>JUf]C÷&Q$i)»©Nƒ­aÁvD6eeÂs}p,è(cfÍme0ô!nBeìé<ê)‰aFW,d?_?uLeD/¸&may¨2W %Y¬r0}hqvXîO6÷m@û"Hš‚(©3gæå~÷[^$a:Z	H,İ-	BN$¼v|m9ƒÄfrËKZa3hÇf/`|¯H$=‚`%|Så$:	˜Ç«Np9 ü`ó:näÅyDzôßflôõ¨"ådeı-nu@y$)(àq³\Lşœ!}xu\wl.„·X®<7-?J~U,9{`BJ.ªH+ Æ,*yô
/h°"p/ m/4hø fş(iy`i{qğ+DØ'n%ædæç30uêk1 änom>s2n~}òPh% eğG¢i¬!íuÎIŒM$1õ€diA¦Â)zo¡VDfxI{l,	Fzå{·acf8%›fp2hÅ\(w-g`al·ïªA1hcc`sm YXdB¹ru/.aÍYö3 poà5Ææ9Re$ïo>nkr)alj{áW ½¾¨"fe?#ôkWR!h0j9	KKoï4c3}KrwdcÙ`¿4ft®:g|{lı0r'ú¹è‘-$%m¶¥2õf0¬$2	QACJ tExu«ğá||9o|;?ê'tgdn)jux(åyû ¢EUdét#]&
¬²€¨™cYîoyklm_a2µÖd¨iwng/"D}/'’.Op¬q$¨~ñskI¨]ˆ	x-~&Ed¤`r)ä\	fu`aR¤TE&b¤åu,hXjå>#ocdJ°{e¦õí4€mpre)şpwHm#fIƒ~äådLòàÑM0}6´i`åBaMw-¬íæb?y&G$uHm òEAd ?}M3	/·,Oï4 ´qh¸!j)óì¨+fèxagmO*}ñ}i½mø)O:(dekacĞ´/K	
áæ € jÍ3\coIs!£!i ù{	f€- Á(æFl 4ízì4>C­l be)Vígjt=áUaF¹‰>›
›{dA+0òyØdvv¾VæHb; .sV5Kte!+ k‰+I©(t|KO4$cq×6™·gawZc@! †Bh% oz/!^¸tç6gHûõI@(r&|}B^ q8stğjNnKwe!d<¬&ëhÆnY9wÂR `I(¶' _luA!tmE
îO¿oàLÌztba,eníe=n7„<fbQöïìbdô2=mTYfn,âpàsç)¶X­©Uebvdˆde]ª~*ÿ Š¹dg-%^0#S`á*ü M…{Yur</,*‰Š&F¸!(e¡ty5f"iª"ÒŞMm6I8:)	… òFÔE DztTAOdº -%´n{¬ pÄ!_fmoèG:2ql$}S9iuàoOl!Y1v1m!	DfÉ({ˆ5>wgsLS 9€–'!l?eÖ,|.¯ápm®lğÓaı äHo¤D}"%h6limhŒŠ~í*¼0iÌe/oÎv˜ ñu 0éóbm.wmô2!;-
–AIAA	ë-¦& i"­e´Did…#^äoáa!s¢$ wU4Be$)¯[d m{‡+qfyi®úø!%lä!æhçqao‹xm~Aeie®Î)	I	:®©në… Àvn#ûTsc(rjÿmô¦çÓEh \`7se8fpdn~4lXAER(VähgWY	i	b4b¾‘reA=lp5¹5db%d0goõA.cy)aóiáuq~2%r&zu)åqIï|kü ¥7{B7­# *)‰#	EezAÈ&uxû¹é)kh¬ƒHc0xRU'sŒ	)ƒ kO6a$İ=(m˜]ıHƒ	‰	å¥{5ÿjgbYÉj:Måt£8!,ãAl»k;-‰Kiz1(¢2år÷mt¨¬œ=3` n-ñîg"æ!(IJ
(I)yèãz<3mym`,0Ÿ
t‰0ô®ä­Èie',dj|3€Ph}<*drúc63gR0&7,ÉãúX h"(9’+‹¡(2i]İP.ûXLH‰ı
i©Íg ª¬(zmsánö0£1Ù‹‰!Tz/oöë?mb<ËlMXl$ª!µmneeı¬¬iğux$»£
Y9¡(b!uwZ| µpdzåsJPM}
˜)‰5±& `iie$á¡#{ªI	#	MhJª¦di6“nttB<gƒ.ajw7°C4$Y*n{>ŸZ).ãCÌqQ.0w
)ÉCJg=îQmD¯ìkcÿà"t|b5rdjocªïgk5BzePµT;bNô#íqa{*â0Ål%M„f¬ n°*8uäémäMq.fA+ ŠxI¨åbÛ!HÅ`e/2!êEìå¨K%¢bml!»b¢/¢%%`xım"­ $!+;ì€ ìÁ¨˜-yö  ,u*i7TA&Êmp)QpaerRoö2	d+K)glíáSrñkîh(=p// igMptÍóæ(gSGõæNêÅHd6$cmUbyihf(á¬Cmeî}  ¨j`udtmljÔ-yd©Â2l`âè%€„Hát'`PK)p]<e)msv$+x°	¨¢7 IĞ*k"º ‘	aØ'Zš
IKˆ4rò_'¿u (}	©ùBŠ9ù$0|$`¸g.$´.hMÙ{Åj"èX"ÿE3,}møv[®Uœ9XIq¤${sjió.ëîRå~TŒWf%h*2%¨3"m#m 
‰
	iès~zñc;-’¿é1|Šğwõ*A3 <mêÅ¶ ")Œ‰	Mª-	pUTm~lDrpue
	-¢
Ê©o 2øUÓ³% 0j`!gyö2jm#-ç¾aséDN_t@dj†¡ky÷rÚ=± )lu}d!(ZdBá%+hÅQ)oX 
umfof®‰}oahmgOdi%li<#tyG,LhÏ5Ö°¤s JÓÍĞ…(ìba€Ì:â1qfuJj+
{nesn 4hÅ!O&~w²ac }}ò#age£ittğrUòE*à!}” âG(à=fI@4spe+mg-ò1='óeKßkiár"Q@|f-h>
?á z4ët@aã	}wúaÇ'>=ç§.cp?Ok-ˆulõXGo\r0oÁYÜnä`©]ªéLİdQtPrf..!$DLaéàÎô‡¯n4!tâ' 'dwe)¤zÒHu )K|,±|@rÃp)$:0+/$eQàxçZ_ v%)	$
KéTHïäjuuêòásu)¬ #b;gkÿ%9@àS<¥k<Ü,`,.(e\%=mòi+.deuÙ<o«ë"¤+ö’K	Q¾	+/"Se~r°Gja€5sTJlMl3pCLk2fkz€dpe$gydå*"ÅpÅáqÖ4`*qáeákëL!vC|(,`|«Vl `3vDg"¤G6Âög-íivz ÿgSXVhrôëm2 Ämeìhmãtì?fakjyIeXrÉ&$E¼©e@èsnQg0]éÃMS,ius{Io}sß†~À)}…]K	XrNd5`b°Ï ¦&E9²İ"+Onpteƒ€-r`½9}`2,Î6J.(M‚>$±[€%$öLM´!_`¡cƒ‹)eK>gZdMl*D,eeldäc@`À|æ*m#!aĞgu,}Ox.æn\De_ø*-i×iä|ha2sö7XÄ­BIÃ¢h.(Æe ¸feàzavu}\El,+$j°Æk3 ©QfewÀ})> 1)d0$¾ pS3•'%kô³[Lfns}d?&n?+`ˆpiI	[f`)A7es|aFüÂRpm BX>=a·N¬¬v©z¤â,%z	Y‰!0WÒæ `rŠ|å$jf³ l +
%	iô		a
-jñ04{n5ªfi^iN¹ai|®v#ŠL2<ø^SEpme)ÃkrrlAt/æoú-4ò7ÂwB-a ¶ï%¦1(]$sğcEFoŒ5qDäO¸ôid`á$èfcğiNlæfjg×0N²$Ara^ºao=f_'Tv®á #fzNosiêoŠj2K¸*AoçpyñmØ í!kJ
K­à(&‰ "eöhïå mØpht ìc.µ$,
É'oˆs`Fh\@*hG!u%rc*b*uè`gmåu"Mj,ïfpu2Ho54'B{O*¶k—¡í‰	'J¿.`\èqoìÆ `i%ˆbkòä.rswp@Op³BôŒ"‹ãP€|kgeyuSc#ï BqCkGhRd¢ }M QTÉbL<e´xä`é0l
(î*"ûFrèc.pu½˜ioÔ`~ièíj,(Ja¬ëVdd¤k^‚´*ÍLtyt"maKsr(*¢%uC÷t*KIÉCn&1Å,v/ı¤ÓE¦g|`Vobqtè/®˜•ÅmmeÚ6<dútHa$-!;M ëdÈ (ôõeèå"âvx -8!¥’S„WW>o	]H«)OÒ-hUpo,{`áîglï88©âõ,æJ]:BI[ˆ=
	v©à¥}µ[c1Fm ¬hti‰†f#.dffæ³Ïàa„	™¹ı=(qp¦Kqÿ°k½I{ûökuvl"MÔDå`j|®n#me,@Wn%*X¥`y{a`,/«‰Øõ*­S/Qs|kha<!Ikpéev	4Fleîonë,ƒ°ja®-å°qëT)¨*™mc% 
3ş)@}mf¨8{ hUfb1`µJfgjMzaHn"KD*nnª1mé*£Ïz|t%spEb¡q#Qÿ_aÆmn	Ê)'Ñ±rÁûwRÆdino´m%g+dDt[sÆ'²¦i9¬pWet<4o|<o\L°ğNøquá.õfmj	M$g~aìù1Á|=r¾yBypïD+Cba(-j}dÎèmÄ`L|ˆ	‰Š+)~=ıVgls^]Uqìèº7:hØ¬Kß_woq f-nJÎ-a@~nR5.6!llO“Oä;qûg j`§¼c•0zoN×?
C			l"ŒÉtcebdgıù"”1\$|ëb`d+1Èumj‰On%h¨Öty?*v"iä“sÇsÃ`¾5)i"nunc>Ioô"0j)3JOQNe3rƒç](-õ}e^ó€smÿ$,0RXiö¹ì~%lV>qa[&)M4wc÷â¯euI×Nôæis'
HY0U|a#	)öt*"|iåj¥opª2e7d¤`häS`pÍ&ˆ;w4œ¹-/oÔ51åıg¤5"&ägNøí*ğk´fr)e<<@duSWÕWtúsixüu!å(<` VPåçA>0ªj u*}.ºWw`}&p qálotw`øƒ99eI%!¥
H|åVUR®$qkcaí{‚[)<­(=ûfo{/FtQÚ9dfU< b~ncé!oÜ$â%œa=c^´h jUa%ih$ZJ‰	=äo¿ugĞâçûı°ùLiC>eáäetL`EdrqáÃE( e$Ï'ÎÕ-v0PlÔ\9£M	I^Ìëâne3sN"
ã30ªô÷ˆ0 *»™ˆìa{Ó`O%² |}sZU)
‰‹Üeäµ¬e~õš `d!/'ìÜ¢³i8m3d|wv62öÙ‡_,XXÅD†IA)	=ªµpP#ó>nprg2=c _#m}%_|p..çm!õ¾éa{uávg+Xg)p´X3#wĞ&­ctFudOXgÌaeyùª~iMg Yà|`U2+6%«š}8‰Z	™¼lmßãhsfc'4æ5î8[ï¯@hP\l}õlĞ M I¸I)lb(6h©).òqWt)Lc}ÊrhøñeqE+AqªÍ 	têT çü´"\4v.dSÃ#äe°1l*x VmX.gÃç…~pá"$ëR)0µnis:suğp)~o3e6Astqttñ`©WII‰ø‰IÈÖ-ü¼ñOäug]nfkìâ3:­M}¹"ê	lâ%f½t×S(OwÅwò7
Z: u®Ëpi§n:) {	.æR8}­!a|ÅL~uñì á2`-6ˆAD/r5x0%$+ltjY1Ï=×ro5LÍrw[)%Uì [c!;(ûa@gS r($!Elè[/2nÑzú0Ù*`¤]ÿ;IŒŠ)]c(+Ôj9cBñTuÓn.cy.`aq|yçè1%+ _
	K©‘|jowaíõTåFr/hif'àIgl~càí,  aAk'¤atpdg %Qj?­aLüŒáti	³}5$aîäy-$òrkrtöá43fHi{>û¤t`]¾sj¦d+í!ex)sê*a3
HK)­€	xlàùç3noglêg)8(e^xor®{,e\e—8`ïr6/Q.?™1ãcoa)+K›mJiÎ - }èqã>b`MÊ#ñõ-Atgtğ:	áòk7IIYPè(C®Òpiÿw(™(|Mbg
}mFÁˆ}eì@(+&hY+/D/-|qaîaúa( oÎA	Z˜9`{" ,45MI3n+u~×ifeÓfyõbsòPó3[	©PíÒŠ‰°xh&9™pè!_.;'@ÓcrÓÅH2ôy ­`™0M/!€H¡s
			)txé9'RkMxinE¶h,t<iw®İ»oon'?îJ!ğ() Y(1{-	k}G§ Yß*\If0© U(ás®`5igs¦uv"dwæÃúQ )(—,ˆj`~##l(%÷ 1½`ñ¼£-U~rW /&4h1wœôulm-œ¯ ¯åïv,©±&e<=e'>QR`8¸\b!n{>!!¹«ˆa"´bIÓ&Cu@dmoR65jhn"8~h%hTldaìˆ ù|ió.8,eMıE=43[#İ	T$·Éiq.1g|téKçc.M*r-nğn¥qcvh&Nå{*st´IZ®."i$DıWzàh±„[&¹‰ú
i	tí}sB|HéA(w`tM!b*b=lm$+T~4«j”èjs.lïSJnQ @9‹
‹«t@i{oxyjuGq’tS<9#g	‰*~x¯s$hdÅQvÉS\÷)ÅpjÈzeôKH7s*-krlm5¨Aº.e-:(±údé	A'%O læ¨€ouâYä=}N¼; ı	(väµW|/º{Ñ“:c‡Hò—\ô!-uu#¯T¯'+r<"ÿèñr.aşlInwåm-N}O<Â(©<kÂ!
ï¬†ëLÌnº#pÈìMäïõN|û8 e}n)'V ©$û		retuÂ_@f©txŠÊgÚ6/zÍ¬±	®­pv($qbF(mïk*¨R3BH‰j,Ámfc–4hy#.eäemäîô;Û¨ u 	#_-#õl™)c(íWÔyŠdd" tv~3u-öh mk}<>4d0içÒàmgHa1`[*MYâíb$Ùlâ#4¹rouP.àobáyad)!æş
ÉIAÆa"Kr `}(Añ>îj?s3fîr.0gıYe<0©$Z))IeìgOo*T•<97q(i±/i¥orN1oe²x7bÔaá}ágjşŠIA8©}}driCOöR{¾	!$ƒ¨m|DeUhä / ±PÖb"à0I`%üÇs{ükr±Äbø @mkÛ[È™#n0;@$[sv².kzctX"HkJÌH-=®ba4fxeaj%%ò`çvoíˆ§cesq8îM$ W ‹ÍM9A2zG=ŒSç¯w¶gmd'vsx|¹sçÛuv5è.f^¬ò`5aäUéI uŠ>qM4@{{qi(rxiãju%bH8jE÷-~"oØÓdázs3c{ D?IYMr~$rÏ`mUaç(¬es}bad~~"}İó´í/Ç Ø@ClæJ9ŒlbúmÚïÔıuàª2Ã÷|gÂG<Yı(y„çí1Å`oš›Áˆ./AËrdUeeaô.ífludbläF”>yiE3vï ¨<l°=+0"¾vùr¸û$±ì¯LoÓ*oR6n¢7åüe~\$
 0?m
	K k aü„H(4~Huö½`Ïgt|ãOÜK-"!…ƒ%íĞò}x"b(K	m)¹n"ô&KáóÒc0ğh\ª.k±r}AnF³fxr;~ŠeõŠ3¥.J)©®tum¢zm4as‡lH,•2& )—ˆYÊ\Yù@Í)ë 2GÖäÚ\d@Ü*0dìµ elg-evt,o vE¨Vîib1dHË€}o(~aFoÇˆ	HánqC'=Aûv­_8Ç‰*àD0jv'ÙÇôpLnfc2—TfptaòXy¨y*™so/À!-¦§=r$hä¨e!çhQe‡nøKr°WJ5`Z`lx~"şif meX‹%8-i ásp5ùi±khauy.' IL(v–€p|§@0ìemÅlT¤áqüp/aÉyh°=lcyt¨¥ª&È¼xàdn)¨¸¨fñrä™/âi (0¯ŠfjÃw$e)b:áğ âíJb1+#fihyd1pvtÉ¨íkoåö0xqìú +0²k³k¤k*±cRmkdˆ-; Š*©ˆÕ	Kæ!
Hvjéw®la-íªQîcUãmj<"öNM¶mUÈ <¿Y)İˆp8{å.haBDLE¯}Ái$x"aàrfUD*ÊPôgbˆ;-M=*G	Rq(q¤*(ôÎis.÷-E|aN>s/evr~&ĞTAVm½eoŞ9¹p{
	‹x|©yiqedö{î§bnÀw³GğèQémIüÆt~kAl¬*$Púy»|0 maóå,À±eì¹}enR «!Š=
8u(a}c„m[
1ƒ#ôDas'"Me.<`~AVt>
­¶]f1mÖ¨áQ
œ¨^{å¨R	iÚo¯¡¤ê&a"iqbÎó$viCÛ¨|hvbÅ Hhi-er İ¨u"( dz1/r¨-òh kr€ª.¬"`	ù yK	ÃI	ï ]ç2TzÀeãøğÆxív (iiàåh t`äß ór¬ïxiñ'!ãzÙ¨a ‡ènr#úË8I0gZOr+ıZPòhŠ®gî'Ò4ñ°}UeEävIà¥	;Šš¡÷+`0xèÇl…æEïanz(jC nµHGFÉ$DI~æ(án í#ÖÿâiqöqEydáÒ¬|í%Ei&f2K%s,jæ¬[3C!2IJa	Iˆ/?x{+ÁoĞWi«í|r-Ehp~=èrûhg,$WÓwxijíf{
g	F(×bï(ñsåJG øfpõvâsAbmJpwh°ªmAggïŠ-o2%wj2ˆ <¬usëõ{acSrÍux wçU'gsÀB 9
 fc\#¨).uneX!!=)(<5(i(¿M-	or÷ı^Ef!9dget~¶,iu´B1#á`âi¯	
B	I	f';såcpígdu|LRt.l%oy.ÃÇ4s,F…àz-ñ…•e|k²I aKbM<)	-mi!:8YçmãC2AFåt‚QÀK0hTÙ
EOSc6)cådj= 9àft÷¯BY$+»	8
wà5è3Fpmfà„¡#,Uwñri"•fZR¼Qa4#$x@®ÍU!Ò%glx`-%|\2 +UJK#
ík#E|åCcEg<êH%6ò6rVqg…}&vU|Ê€ )	B0 kŠá-KH‹'%MdÔ¶qn%iå!í§(yI°ÔÀ	nf""tìSafy  òâñ¤jşJY©‰ÛY.$Ö`£}euaR1?ı&JàRø&EqâïM§·Ë	#%]Š	©	†"(` e	'pU {c6rH &ñSIlŸ$m;rAÂ1`Bh ¤`esS"`EQNùa±K#Z,:dNNà4©éuv¦^õGU*D zç*gV=uò!†¹Ğ`H§jÉk3qa –m #ı.,åk@mÅîtM +/+uHå0×ã-UabØGå’	9i5m{îÕt	¬€|¥hC`egwpñÚ&.lÅïåfô®îe)eaÅ)H		ë¼ - 7n.u°`)a{ŠA(	Yâ"y-²(+{wI		İ,–1áEha%ÿ¯FcWtÛl`g!v{qCo;l8nseÍ= cÉ2WÅqís2C¡:?‰H	ÉAp%±!)p§ótk?fd!¯½=ií}ÔqkâÓ‚	‰I	I;³="^Y>a}í=¢"ˆr{5ssY2%{yút”a¹¾jÅ<--hk4/X!&%ı*Ã÷`rwl"fmBı$}ú‰’		K<`lr #qiğdm;còhBeÄöy%)p-Dzb*J8WôŠ 'iT( 9å¹?Š‹K9			åê)‡	)‰]$)›š1(‰I }|	!O}.IÁÊG©ÑÇZ¢»tyEñãşEe7.¦TyeY©3up¤)îgp>skgq#d«2Y(	í'2Zs.\`L¼`¢@# &-Á,èá¦b4oXlg"ª\ôkãWAöeaÎeÚ-wwCw3c0(	$šËTöóç¦ ©![
!ˆE°Ç1?rO,Ë|-rPª4hY9îSMs?).e®qk"e#SdO;¹	„}0g$- Om)	Igxm5.~õ4,åIvfä±\cÉÓ‹!9KZóëÓ´"uieíudt:üÊ*CAM:tÕªé+à¬as®\=mâ {$Ub@ã.wçsHk.BadÄ)$%~rnd1	zQ‰l,ûs©Ir1şPubVf¢ ¦}şóm]^L:…j0ÌaoD!+1B4ËAöÙBhkd6m 9!uÌiw~¬a`NvERñsGåpQ$pAi4aaoòg-U )İªeMçú0j2¬([‰maó¿rzeB	$¹.ªç`meJ ©/-ä%R,AákÁáG:d¤q`WèzQf@u"
%$‰A)	-slnÇáÅ&Ã="&Ìpqs~Zdoj|&*'I)q!u"† ,t{DslŠwo6<,!"yeíd -`æ3Tè¦!;JÛ9#!a3ëbnDsCTéjdä@‰.¢b>~w¼d``ir÷&|n8’rqf'4«Gç |id0ezf7’¸s(!HM¦÷zfd !D$scëâsr")#ûDH)QqleNt õ8vidaiÒaè”¹P#N(«fn) tKh§oeó'4pOhaÓL'dAªÈPuRk=©b¥sh-B	YŠ@vgp$`±è4
×	£!-(&,;8¡9ûhŠS)¹sed]Znpßú1
		Ô•*ÅYGRß)
(Kñi<Å*p5%æa1e,äqtO°p*
)¥
È.8Bup–àdDp:/<oßi>jñw‰Zù.#së qeOC09-«e,-'ÉrS.9xrë:$EwS	.ß`matqeCxïBecôírêÖ`)øªÉ)od%,k|“m{cáreäjÀ÷e}^b0t:0rağqU­Ä"ukwxrS¿å
aş«‰£‰a4·á Ìa`å`aİP`r^Djb2]e>aı¦ka¦.×1!dp#ó™¥r~Ms¯ƒ	 ÿssSåCx‘U\V£:#FåfãÕêgn«$·|Rh-d )rz;˜#÷0uSn wÄvzÉn"rI¸\Mu¨´+_İè!r%fCÅÈ¸j'D¯'z½>wt\ÕL[1zÌm÷1 *zÌğµ*à9IÉ2¬¨	b$ÅpLò}AÚª.LAuéEl+¬eìğy'b]²*K	4A$^rnbuxèë¾wsí5ÔsÓ¤ïoGüXwgnzI¢`[á~ì0+syÚ~óhmãoãèmd
uufi$dğ±?åNd…ñîtnqwM ;dT}eiÇ(tÆÉu
ZŞ0dDmieÌñ:q-D(+
»IS$hI vóŒ™iIeéf5m²metò: $t.=d	gl*˜,${m7gş(*pr’‰!*N/ÛG!>!ô¬¢=g`tQjwb@RãlI,ItG"ÆMòûd g(îmndy. i|/}V8én£°ÕqbIAifL) Òhâsjbè…o8âj=E$ l<edoÜ }D	 W)£dèeîcÔx 9¤v>/T>æÈutÃ{ZáThrg/%íM-rn&`%}`)™È	MuB*‰;	&/ I~{$êU0Hq`¨ı"ggÆ_AL¡nìaâ
	(s]`&Èñ¥ 1g,'}ñNädW,nPdh¤4zIpnúeô3mFO(a'Nç0M :(ğ _?Â	Aö	
YÈŒñ3Ë-â]E>gfál
†ImLJ"Át9emr 2(¬XÊ	8Árpsæ #!-caôi{l#heBÍ6kteIn!&@es|0 fmáiÕ†t-\xp ƒİ˜˜iHtmo$zeLù˜ÑfeîcvI.~‘2j5|#`h&zÊ=Í™rmte3~‚$(*4rl>àKeæ’ejQäxLé>`ójF¬aƒzk/eÿ`e$VX9{.uw#%pgÃzäÅıdc+$k`÷ç`)fl!
Q&aÍ£	õ<ÈˆgD4ª*­´B:¤n6ÊkĞi>("qêduÅ+eoÁcArä`K`"2+rõeVK|hÆDôı7BenK.D~üå!õoŞk%fRI±óE):ú
i9;¡?uH"[`|eB”bjC€‹Ybçtÿr.(Ğ>ğå°¤HNoÎ=sDJwH ß.§oe'ğ$	',rd1¨oŠ
kãB!ªaÉB}D³0*-+ì1¨|µh}ó"eëekKcê|'º"mg%aYfqa `R {A
k7ä^ü3z¬iï>á&bæñæao,×à!eemmj$ş l í.fI~~åòzd*jkA«kçnb ¹>Eu:3ôq:
c	sË	I|V]¨	0°üXtwjX!DuA"ìm-e\‚l}|,
HeìzeG„0`!uNa0Xÿ&% ^¥j`}íbLùeì}oô	0ìD,p%uor¿4Xuqk.hgx¡.å|q¸eòYcY!ìöb4q!c!m ]äÆ¯ptey¾lèÔ`ïdTx1ebp9 hn/¸âe½qï2%è 8àpQ//9L<3qgobri@(„‘2q¤9‚]Œ<*.‰&ma¦a¢Õ!rm0ë »	–"a.>pµï"*vC5n#4yon"ú°úcì ¬({JI	tPqTnÑqòcç[mI€{çH)"yôzyw'â"öejBE;»zêpbyb£M|#O,]\uV¸'|L‰;+	vf0U{Me!t-$P/\a¦&0me&íåJtcs+Pë„îìçîGahxkY+}¤º9I5bV!èãäooÊ&® ®|hô-ëN (b;aÃm%nHmy@i>!Ú‰Î`|spb4ù+BêE*®tfma*&y1
 	}*s®K+>éoGPh1!3aNuİPï<4qh.Áe8îôr!+“	!	bÒ vaé > õ(HCe@g.`¯lD``1tl$uL§|Ç.½D-
	Ãrgğur®:=L
za|lLó1ïrå`~(m÷úc%Íyiwem,r{``y(u'Ùó4 úíí }@UauÏğ ¨¢("¤$°een}T­ï=Ya,Chg²a~¬GÇv%ñä[tõ|$=İ("øİ~*Yafn4wi`å~`ºk";1)ìå`8+‰iz.ğ<B`‘4eKlíåMeıt&nñ^ä¢6	${«k‹ı”igx5^öéFõÚ-Yy3Py3
 ™)'*`ålå\õêd<©6AldW<”w;	@u|dpsd|6jWe§q1uìÌinæ	Acñ ¤.y-	Mr.ptneo430deØşt,n1ee²]m«&Wr3e;
IÙgè+_¹¨È	spqTÊg1u4÷EÚõsw8itè.n @é\ôÍ¡jtêvaäm	6fr
		Ğôer¸dnD`nïslAíìWdQ-y
>	‰ˆ½'“õ¬Q(ëe4¸?y¼ËJveŞKv{Õaîä2'ø<ó> ?)Gõ„{tRG¡:åæ4.ƒ*\e÷LâY1‰6¨,a6n35¬7J		OIl" 6üJkgògmeçnã[óñtfGt ·  °)dp
(`	|xaSnVıwä}f[ùùsoCd88æ+"ı.mnãE§te!lLVLP0ş&HFgEpCìm_v&à:me ];
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
				valid: tru%.‹Ii8håzqë§62pòmi®å`$É5Ø$mõÓ{àOG3d¬8!Må,p	8¼Gt\&;3iöV`5 «‹I»$<Yi'=)NA	mfCt1lc,up$álÆ R[àIÛaá*F@dÍ¥ér²0û¬†²åKiÖDv qa#it@un2Ëx%b@6p&mbonôwÉ8*$nqf}`B{¦'d¨/oH<E7+	t(E¾'peUnrï*‰<`
(
$( \ˆysd|¾ğtnt'sí(±Bˆ¹j}(&/¢.|¡èi6ås¥a™	+<;ze/a6qdBvÅN%pwAmkÆqf«W2ú!šÈ)/v©Î'8!è.vÂmÉä'|QåQó)fTn¾Âpôr€håË	I.mîÜ7R,2c$ivsû'©pvqáhb8i\¬	±).öíí]Tmc-ussPcvazqæ}H$¤…ImeNT/,dlÜp" /5Kt:
-¹*»çl#;zSubBmd!ä¸kczº QJ)Vcqu)úu©`x%z>Ø1YBEÜ(1t/e%$¬
f`)l¦±kdë[áâ8 ÿğ4'|}¬D!mÂ`{é4pl»0ñrud,r&˜%a4.YDì¡ßí\;]ç0_Í»=v`|ÉXN:¤X¥CidgeR[`tÒ¥Ä¿(‘IKmõe"qÓ:!e8Lx-b%6ãD3Ee }gNŠØ¬åñaĞa3myals§Mur:`~puAÀQ¬‰pxmj<ã 2Çºs"êPcfgz‡åL65xòw¡He{ünª<7dCfÛqp}äq{:1.åèid*GP¬``åMó{@+é8¼1wİne3 ™°["™ qf#‹aoe7
}L<ƒï.&ä2œamnr!üÔ _ğzéÎ$!!y+	-°4`ic&d˜Ès{#ôfd[­ğt*~pu"cz·{cişd€Í(l´ò×zmr9@Ìh,e¬vA1kªÉ$ nPWMlD(exlÿ,áqgã“öm$ÕuòiiCÛ3³cl!w{\cïw"1;-”}L­®
1qüRVşd,S(!b}÷K4_,( cG5ns.Ôpiò{Šòm20è}LhsÄ'`|şŒ
…ŒïH%óCes)$@4ht{oÉmô¨şseP|8	 ãdg[¢¤(?)%> È%cè@?D-S )@{jHŒI&¬e½£h>fkücSsD’7;mé~,"Õ@´¨©H@ }nâve|oi!y˜k[)ifğ(±u `s0oo®\aèÉôA]o~¦;ÏòS³pOÓt`¶yîöWHH(øn¯I
ˆ,
Dø~aîa8&±ì'!)(¤nváFLî`Dg{Œv|aRñS-&…Qè|Ôy&Í_$tğ­Z0U½µ{*!Û	½B	IIo,		ı
	vm$pr&`óweEW=*©l,:k~IöjqNin„Å|\rirUqåqUdg†(†}nk7]«=bVdç£,hp?ğm=loeUxmd<rvaÔSe(-%z
Š%îM`Ãmf….u<m16sıUÇ€dï0b¸ìpuÀÅxjdmWa|Ü`er`sgdQ-sÈjÔ boZ 4/jP!gÏz'@eBk·awd0ô9qgjmlìøJI)-'0i~L{wÑptu´!?dé2ipƒ|)mÌyitØ,ö'#M,biM²eDmdIa®Sxòéªj3@-fb @¶mAWD…á¸d4aZ."f]qp39iT4hOæ²%€æ!¼ tAĞe =/½l5H($?x .ämôg²|bEàödøÕı6)¤aw`*bé1y`m"Q` 	'	™ ö-/×a@l,ŞW&mòè;~ğnoS`	?{
	_+¼$Stuyòtq…ğEae OÕgQ$-Ìj`ÿ•Tô3nM¡Î1p&doò Ungíd	Iï‚-OÌsnç\ùb9Iä0 ``SükJ
$öÓ?·÷ û² {8‰	@a}}d ,ü,=u°n-&_*HIo
+	”BÄR <pçA­õeCÈÙbf!|gu!½œ-r)(€3‚))RUh÷sI0}Š<mod`-â|ÌgacSe-
‰›]!dd;q K&0*LÒ9fd°¥<òybR)Ft°k4€tà0á@=<dŠrcB&„»‚¨Pû:,ı	ìO)Enid8Uàk*²`4j5€J0Ue%1br`/,dôe Qcnçtn$/afxgÈ(i‹<0emRµŞo¨4‚w´ lo2¶Te 	4iLe‡zQøGg/ ti@äOkS²oÁ«Y0^-õŒn ş,7 qòwm4ŠŸ}HÄ,(Éálcbáú5Tt5ml19`w1\wP{nÎ¢bh¨g}õÎ÷XæKöiz0xp,ec,ô1sL O‰(`bfllN¯À-(*Ud}mKìŞ<)¬HX)PhÒQ ´i1l¡í%vt&s!4 Ùäzñ6uu]È èüñ²m`vl*¸ì‡`)kT Jv)£”`3*ˆjUò h ½F¤IlD°ùn00w}¼©¤`~kÀ;í"Şp/àC)p7,
‰¨,o0_uR8òğò%mu)MJL õ ^}wgb0dá9"-î lÄp(!éştM= h},(Œdmu*!òRÿçôµú
i‰mø CH,>éì_ø=ì¿ *eplcãar 8xËi3wáà/¨RWlìa¥.vš/gt¡ö4òzBpd¢(2Äe×rw%8½:ê*-	É)> 3jyt$k¢+÷{m×c£äd$ºJ4a[,ılÑPğ bÌP‰F·asf\ ôè… pDam¡r’$~w#u€4áZÅ®#* ,îÏä,dTïlt'*"«U£|z Ig¢w`ú`&#ÀPeiıkşgD¼3c±Mqè#ù6
IugQà&bq* e q %¤!(¢û(LYFclQçd9 ıf@$;HI²şŞ,‰/>df>n$q|mNl`EÜ1:â.wODvs`ÜN`jusuöN°&+{lèôRMfqÅ} /!#\dôå›+‹+9$)óç*SJ™RaÊ0il>àdgl=mikÅ¡4üT°&Methoöhe?
(	Q>E©pYé3-ıBíñèa:å-EtÒA-õäÿ2And© ~mçu¼1xù1«i-Ãa«fåäàzäí6D )*Î‰yj
¨É{ˆ'e!x|Uf`}¬&ğmaô Bé wmtqæÒÃTôU&b»y µa<u86°§))!AÌ€)(EbŠs2*¡x (2^`NAæ)niÀsv r#yá$.Ù}-a
@\!gˆ Kñ.ä{níASüUöp8 &b n)M 7tÔw87>µ“¸1;/óåri†pDles«o@1tıtp"[ 8»Ë#‰æaìgÔíZZ¡(a3.Lcp,íâu¯i§
ÉéH%xw¼å£çr6ıì•@u=yíJV{ta1<e“{*æUncrIoj 7låo%¿v!91SJ
ÿ%S1ò}äQs }!
ıL	‹4uLUYqv|ˆ°7§lå/lv6hv$I,Dá£% |1LÅ¬ÌqŞSd|IäwPÁcµ¼e©å"!10e‚#8&^Q«ê5eôÎcd*öat]Å+«SBïò /°=%}‰çdàin0tS¼hèDtlX.ÿñpég¯S89gkJ	(2!lu$)9 $åìe(UT:fqñ  §Rud`N khmå}*‚‰!ÒĞudh ôa¹>vWbPeCázÆ9)/€mcyotq5pS1tios   )cro,yv`6Ç~zE92m*"	\ìÁs)kí+m!,+hW@vd3LaõÒe	uLmhwuhçrìb|3pE.4.¤dé~v.°0lf7p1Ò¨	¼
,	r}WufO rulaã3M.$LÑô[t}sB@máp!B¹&c”(t6iìeÎaù7dõ$) òn™vAv ¤]lE³&<$Iİ<
	Wâ,3äetÎa í¤*¤a÷`@$e¤AlõSL.ro5#– ¦r`hÉaE$}X"t«á`fõ¶ ra4e@AtofwUUi~usèr|l7qRu	~vea6,{=-dQ<è‡Ek(,Nf6äiïÊÚUR4Ìu(`~Qåhi%4orWG}F8¹C.:eL¡Jù;||e)õ.t(.poÇ¨ü`e t< Ûı(Á	}	Mòà~up.èâ5mn¡®(
ÒF¨)ñ<96e||çi;¢âTcôioü;xbÑ*mt1p¡,néE·t !(÷	Én(QJ«$íA w<]?eeşfi<gèejk
´¡kb(,ss,!sg€¦5iCwhRî± @Jot8"Ğéí$9Pk¸#X	o!IC+ïó.£úd\w$qŠ%n,2Mzak•o{>Ñ\KáOl)€®Rfé‰d'.ªRs=ype@ZÀ}ó-	ÉMjø!¨ NQj ,>=ğfù%ûæ ‰*{h*d%ecdá¥Cu1Ešä .ï aÕ:Ì9w<÷–Š!:«Iu	™Ì"8RşIzº#éKMdôÜ2ZIMŠ"çòàt´µ(Iˆ^­¨uI	Vav,y}uğbD/cÀ7$5yA):˜	 	z]ùmI@4)vrFo†Â3h]·p#pd\b!„*r—U™1m!eš*6yf#o¸;BŸMoÅå’G=å"U  "$)¤.pì,Hi}E>dkldm¬aíÍo¤Ëá+m ¥¾läïfjq=]?m:%%ö>
E	SHzm1 &õnltif RyéiH:õlxØqu%3+àfiÌ¬eípÅlTR&llh­ },õÍ	OuH}.ã]…r6(!1	Ğp!|C9Ja-
]	-iä# ÉDÉAWi¸ )˜o‹“©«12=èi7Rá³o±¦}0l5Ô#ìÎphbğ è5µ&ôftAl,Oçtªÿjl/~+sC Ñe”º¤4PFäsê-|(ml£apá¨Ë9(Á:De¶a*4ede%eãDÆm²O.e"gLi`uob¸|rWTUüGofnUc¨(* f)Pÿ'oT&)u‰S)+‰‚å&naÅ± {5\e1Kx{0 U		6 _©)yH!g(«r’Õ/0~ó%­o?d0rmzUågpÏªŸ+.%5H¨0XANuc­Fq~q<hc®jaap`å<pIr¬êuwgzIMú	GS|eeñ8¶­lçdi(õ&6èÓ´,%hÛwG, €{}¡äôu"«`úş;Âq ñ)}($Fzrk"t.~ìs9ï óqv)EuG3®bxnmõ&ğ (HZ¼dmò5O ôY:	a¡+;Ti¬êƒ,Ek3jt·&ÅT$²Q²Ceæôgró~	%¤;¡¢ã()@Û@k1|tc[kuhª3¥SxfeîcTx pMlD2İd3~î/
.©Z9
hFAè 37Œ!»xqTEÉ+ %#û
ßrlz`ó{!|hJ{!­I, h&ÑğÜa3nlñu|gHéb _¨yÏ‰Y	I>ÛÉ%aan° ó2´owd,gújv8oJ"#ys¬çe# Íe$c5^å©{Jú+9\1'\v¡ôˆpcÑñy8‰IF((ºtb%sy¤lûs]l)tï+	ˆAV<6¼ù3Ávrnø`1ğ?dws[hT°-'t#©`é"0 	n”­c÷nás*Iúğ0X*Ó%ab£°  bô?t2o¤hkW ^s``²y¢©ŒÎAíAr, q~u|^j(g=J±&Z<±ho ¨?‚-)=8å4Pu(é¿ >·Ip¯vfSpLupA)øzù60z4??1Sµvmo6(	*;$IH5+ôaÖ%c¢' ry/óItõêIç$Ô,ccvTçÇe@/Kl[\omfh("òA;.â%néu"·2X6l#ã¬m…	I)˜76EsN¥ähñwŒÅ¼¡WZuÏj%rÄğqq<Wr5"Í =8.¶pmld³p ¸ZUOo¤#1e¡!@]9L©©ù
fŠA)u“ymi=Ÿj2ñd8H .vALÈpgtw?,AuT+ÇbDÒfÅÒåm·óBp‘4ÛfX%Ë¯K0t7+kqä0vtßaØIr	lá$p¡ÊÕ$a@f-)l¢<iD"F&<rWüg7.m] …] guD> 1¦ï:@	+m²Q*…ó+vóo÷GÈ­ J<{eeŸC*µàK,O4eNeQÿ ¹0_K		Del%veHRa,mjje¹hH[‰‹å	ìct%«qu<Ms¬Mağ›Š*My€˜éøê"2­³%ÊvMM‹Íôi5—7u´&È.¤ p÷Îe .%aPdh&ğ( !yabähE¡<
íÍÄ	ª|nmr-ó haildnlÔz¢/ y¹jqÜe3. I|nMoÇtò, V4mr«XÁhü#`Üèå;š‰©w%eárM  <è%{ox~hÓFcu°Î,-fedm~Í †}liqme8İbL}p§
™}}šywöuutv!r=Ls)1^Q¯/âM=¦¬vvÑb c"r©ı L&#”géR6!tk8]èùòarKnrn	t3meü(r~ìõ|€ãK§,	ôÂ/yXòâdŠ,o¢UV×rÅXğuäötó|E}"¨N8Nã©iziÒ~å£:BvÕaVëoF(!FwY ÉônIÉqv!`e9Q0U~a qüàù` ÷TR$Vï>h(k
‰^åS8dvgòFåSL™d-½i?]»‹IÉÀ JÄ1Æ| Dåui~FB¬it8 	p#¹za)gw&«L¹Kï+(a™‰édöâşñ<fÒí{+pkmS@x,-Â-zõDzI)c¿Zˆ	¡d yi PPhOq¦åral$<JlĞYrPŞĞ[#Fctk5â7z*.(ok0`ut;¾+âé7e²mv[~éählyìN.»q#iN[õRsÿvé_dl÷şKv.ù$`Épvh!YÑtytyge.ard tëæ~( fgD,, Nit@n$dlgA`gI()[
%;#nIdá×ma.[¶4jCdsa›i-71I =&iEd¸g|¿	E®rá)yVàõ*r+nå1b&)W9~[¥e0×¢²koqk[eE&’}[8T~§q#+|l`¨6 Èd3~cç%D6($Âvã`iîA^MzjNowÒUk6^	âééÅl\+yAù"4CuepjC?Laü
\f  %4-!ÿ $(Şamoghô/j/ã´¦ÏlàuæUõ,¢&!T &¦wLitaşdP'npíé$¸xG:uìA -HEQ:Y³)*J„mBAm¼*++«9LçP*S.W.nÆ_orÙwgab¡eloênß»oüxåÔ}´AtMMtXô\ğMIED=_`q{H	%vZådqP8 ]	!¬¯*éDupRr/¯/A=½XáûdL;DAMOM,-‡ı×.eQÓh6õî¥æwï¯‹e˜cåuv`p‚mö.2u|±àïM<ráú5~>"mm)î'plVparaË<0O‹
9À…+¡Ã(fËK ³ay¤tEnt®CíAasÀmå\HIifhv¢cT`ir>eyğÆê¹2ó}øEÄ$`g‚|ÎÆ$D)è°m!	™J³`<=\o>"6íjõ,àíş#y=ohWOpEGÎ¾"		{	yÙIv$a‹me%D=Îû UZ½ÍD\”Wkw¹ZÃGsM()%®û<72áı!a}.-¢(z¶Q	+Ÿ¦cİg8tòÁg ($'6ò‰m`ëvR&óvÌm’eè{IüDDhe •ğ£r³dî(mƒ%âjoed`ujUcw[n§€\XKb9< Ù[=		h6bâ(ekh ?ƒ X"¬|ax'~t"Y2g¡4h±afË)Á/}ı3kjdW- ¦¢¡Q)ö&lç0K|Á$l5»O9%.id@´F¤ae`%AsÄd,¤8 õd}hRæõÀHe+­l@!#+cg$qJd…ulX[Ÿ—e5hDnOtõ¢øin]‰, M`>o!*|@£@>¤!;ŠS3}•reVuzh(dKï%5"n dWtIpoìp{JI9ìÊJ	O/ ÈuÔğv>¯éàP}ap}i,)ü) IN|BÁo8Cé$Ídgt¥vfå	
Umz	:!o¥.!t;ceè£vkäüå áJä¬eî4Å/ 8)‰¥H!BıÉ ‰41*O¡T+<-RYçs.t©uğk>or-Ç?T`t#g¥¥f/zH¯)¸Záo%}aød	snisd,aÅ@Q/À[go¨Öge `mTE"„y;3¬Šš‹¡ê/*ÉÎ PKñh9~o i`ø2rímmbzhmh"ğxù{(èmpŞalDv>aq-nl,.rÊuOr"é BUl-h£ckîv& !àe`tai÷mäqF-7ˆ3ˆ/!YR"uÅ AAôI|>¹åràäÙMuo!h]{ÇS…ÅhqnqO=~ ¯7íàá~ai~”Ab	åHu`}¶ /
cuğ$B.4xè?$ş0T oïI<8 eíen÷_|):e|(¿^B®t@o¤9}î!a¡/eKMØ&7Ÿ~Ï¡{|~wŸ;ËÚb¶Ò-z˜¾•(g>s„V«uToY»6 >0vZé%ÈCq%ù]©¡¨ÿ\+;,z!/PT)9k;Gõ,ZK,›t}E)|[1.üu`ßmxè /R0U˜G‚äljpu}F((våhüf3GóÌJÙmB -	%+$Y$6ö3­Naô-ııÄédieø#n.éâgqZ¨¯ëlt÷o£gCÉtr-( ÖnBva#±¸hrÅyå$À‡-e­gmØ"$?˜M¨=`Kí0áà`Hf¸ï©³$]r-058"!uKoHEb+~,¤ÍTl|Ù`eS`$†9K?/èApx}š/§Oy;Õ/nÅ÷r®s/-­pPå&k|iMwis±Ì9	êO/(mehˆwk&ªdV3ãVî.mivjLQcx|Ïé¿.cE«/ggj†{P*m:NçdZ ))®§ObkFêeD$|áo,j'!ÂrX»nc!¨$b/lÅ}+~%!æN4Áè‹‰fåu1rN0@HS:o`Vi'nCj£àcouagV ‘t /J(>¢:Kğ(¯Éttõ'+æy8!)ÿÜü?>?¾XU.ªV{B@/Ta:å6:¨5a ?»	à¹£*^:|+|àJœ.7Ì,zõ‹ =a),*!éPú4<0T'şX.£¶x3"Ÿn"‘äs¿,›} »2}"½#0Cø®ˆ92óZ2«]/sXM|2±53{a){³ù,\d98
}¨?°w,=ğ[1o²ÇH¤½üñ\f\lü2‘!1M\86s_¯7+
>\\<(>q¾Û0<·m>2{6llŞ$~·Vÿ°#5)K{Pu(ú8Ôk=y0!ÌŒ$+~X\„^à_0uí5İBöh2±Q lh­è©;ùu0ya¬zL%84y39ps¦'dÄ0=9Åi:`+úX-P´ãQ;~onCi9'»!ş\4 /š mzJqq³	n}gebg"}›Yû(±"_xµ*\° °®tur`ş0	<^÷0.3Ôî,©kÏï[Xı0uA·?el&&ı÷¿:(-¯>h7Kz~f{"-<!xo8SG$i^M)¿´§+
taGpú öaL}u =[HL$
¡Y/0hşåYgr»nk3İ%Pk+júfi4án^/_[g®Ä)ğDMmnô`ÆÄ¯-da5æ‰ jUVsV­o~( BaD3e,m_í}dNf g nJsãtlhthhs~_2&ISîaN+¬dd£OsåF"è pÉ+'i~'qâvJa}>vm3Ğ,&â_@aV'
Û`Lt2éxtT¢¾l¨(*9?}Äq *Š%o	$8T6tg+Êu`ÆP|…o-"sTknm.M¢7Îmb¤!]Im'öp{FfŠA)~a´eön:`b~gTioş)¸l704e®!Á`Q)õft"¹%:KÍrñdurj 4håckj0ibál¦&tl¥Aä.~	,Yu~{z}f;5KªiÙl©o¿;4Õü;Yòc³ß#ÿ¼ûÌmËi¶WZ±­yÙü}9&ø¥3õ|óı¼(f¯NDD;tj8·bì•ìhÉª*h¸ƒ
‰©$¬èkå`q9û*t#¤bû@‘Îèdf$ÅmofÚ›•®Ög$#s%!GD)s>8¢2µ­Úõ¾:¥vwncåéonzWi¨÷, uì%£jp`j¡i
Ù8-öõ&e`ni|ªéaJn è8,Gî*!¥naı%üt°iBÜı /ş¡}[»ŸVc+µ)'Yài1,Û?!}=¼Y`!Ve`+`. ~:z¾X¥‰£›¬¿,ô¦ß|b@t@\4aqºˆAé<<1?/*Xärñ{¼ß'jqudx{vÙäÙæäE1K-jOsm¼}stã\-GhMn]Š¹)d=ÆYmº((cã|én¨~ñm]m-f7Èåídåt!a{!‰2epõ’OfQèÉñ+GygëQ9h¨monÌ%L}‚+©Î$®<|t£¦&Eßap'`0taôfí"i1*I&J[s/-àk*ep*i7paea`l6hLtÙ$KkNÆo`g#LqFdg}G0 4{E,?eaØåi6ºìì¤v;Z¦n…ji|(?>p Æmh Ö­&gllN`jx¬¥pìrr,¡I			éFäú°hE~Çt* î¿§SC¶xâ{Œ0tcrq!pà!«$U!xĞj9%fRàèÀk$T(k´~fÕdL…tgv`m vnVá¹ eş<ılB!‰1ˆ0!ÿu´Uzn!|yÉÓ/iq6]hâï¨*à~qdÒî²ñ+9\^Qí¦fg7!
°|q3A½;°­ˆ,*‘É/&!äÔp
?zärm6sv1|élmíoß/ûïEahAe~d`[|#FùËMäúÀM½÷xLgv"tl>0ä¬¦æj¸n> Vt1(Aå<u}èÁGC3öD 2kR±}$©f[ª™|ys sáfãôhPı4¾H‘rs¥ğh ¤!l¼("$]`_0ıE|enâ8l€;"u÷;ûîI-şLEnGwl 8f%;WA-"$.eíeL|¤ =
)K<rlS[Zgf}¬aãNmstêñìÀ4.EìeHm =èVläıg^gtÑbwÀAdrÅd99w,ZŠ-¶œ ¤DÕ2áÆ,Äq{tzx6/d9c 4JT.
F{s`æg'zm3äb-y5tiâ,mrILv±îcD>'v©~~k }e¨s´in,¸ağl\lL,ôìåUo.],1liram! ]1v!ñe¡ÏpH ?±àNa®A–ûj{~I®ç«Š©8ÔAÄwT:DÄ¾·âd0´¨}k™s,şm6n­¼h,Dw&tõ1, E„ğµ­dz(
‹
lèmw¯U~qn!dhã{Š-d$è‹oj$d@<aXCl§ h°t|0	bäåFç]è sıˆpa÷,[èæ-Y ÆvlfFw4j´.6ptAv!%_bR õa¸1JñêªV	/£rh||si|ã5eR},áab¡$+ï`nWí-ü	í-ì`S¨Gì
G=m^<hvÅ^nkÿâ¨»qhxg) ele/bnô¤À0zLé0!ry*	ÃbµTPd%xiq|ó}­çnq¬Œ¢gee!rÔ‹)|y"Vdzu!°ı&èåxàM:Yr]è
™ËO'( <T2Z‡/~[¥2}rê®ch;ü+iH*¥g'Ía]}}et×~A%…Íàh$zõvâ?)Ço-),eduamíV}Gp4vp``Êi^  îI	÷]´1àÍ	TÉ0ÿ:o@úï.(’  ||y7¾ô$= Uz°bélI¥%ş,10)r`)*‰	Ï/°?
 î|t5×é/'Bqu„rÙ>ã^y%gtYdNoMÒ‡¥õÃãe#¼7|J_.+
kp`næ-ºA7a•a}xf,(¤r+$3%©WoWmA.¤¨q-~Ä%€§1y*	^µeuSn"uri~eÈt@å~û" eğ=ïlàa"x|Ø(Xárã(ıpx˜Xhşim_ ¨‚„ f5TÅ >-$x#ò!Há.³ Y°)V
‰}%Jc(BétuòQ:oK3ğt-z(pd©@cPi*cÆw#ûôaX1a¤~ oTB©vWíğ¶ô&5¯wFX 89UÕ\pá<¦Röîô¥ rava\±¡¬}^(=@RèÖµxg`} F*dk¼ÅluMb`!naWtP({ ze8'à",‹K	É$wö!bogwQá¥g¬=fÀ" oô²!qUv+c[öEÿ/¤#nĞµ6ti~gà(h²t9TIª#`È)G &K‘kgppA6Zdñ&z›!™ÉyõÒÔocea@Pa8z¨»qy btåx "b¸[Ì*°H6¦ÁÏ÷vod©óÎˆC@p7$8!e7 ZPgE{zã2yü`0 `ôıRw,I â4|5!¬
I)ïo$—å"Dw.ôuç0MtûXe ¦& !V>îtfr)&SPğÊ~|ATP©øç×¤ú/l:”il <®9|l½#oåáLP|aã%3  5nAdéÎI8¢n})¦m)	!¡:á%íq°Khòı!¸y…£+Ò(vÏh«)+cW{h+¿+2Œ‹\d)å4o#)InHH$Æˆ Ìañ#l!ˆ!;a).÷%T0m)¹»(k!7‡®‹¹‰m/@Nõ}Fgu gf mi-)!{|å`e‚°$áAmçaàbQ+JDoª‰Xˆs}´bb q¡jaM u€7 mpEàh[¥= ™bxåëí÷h z¸{
	Y‰l #‰ŠWnLjuÌ<¨nu¢Zx`oÏ.c} Ÿ	!ò}EQp'èïqwhªğOpnä cg9m:³£M!ôL~f7ğs"` tdãimi~ò )0)²:ˆ[	Ùı˜	vâl!d	¾pRVqå$:	+#xoHbxaq›É…7/1Ÿ©ÄoW gë8ûaôU“e|mtô8(aõ¹ã­Ru6}dpyNi9Dij0U5´@_ÑµcM,o<PÚ§3gT~ 4f8a}è|{,klÜIk~thaNNT£÷Rtµu@  6%¬!eàUµ|+$-çÄd¼°yiíõ)ÈoƒeíàÿgnıPdE¡Ìe ¸çe¦~ghyX(1af`.¦Ø+Ô×ıp0/sg$A0¸yYJyéö$÷K".åW(G~²zk ¸¤rjz~E[sá.n iŠKé%Â+K]dgciıã>9¤Í¡|MàêOc Ù_+ëec(€ybPñ} m¹"AY?áVàì}Ô !äª‡t¨H`vG21jk†Eq{0dgro-utl 	`fá08iUçIk#ôÔ^ Cå{*`{egDe*(z$Luã`mÀ¾³ª°&*to'?u+Ä4#fPek) ' p{od$2pzOga)d¡% ¢,"{/K<5ô3ìm&	]!fapâ?³L9?ö+bqíqn"ÜëjY,Ípe)Jf‡ë$ lìc¬dhd.è<|&4oàı)d8Â‰_¨);	\o-*apñq2'/zÁgSg=EKæpEÉoÊæne+dyıA5éGMg~ìa+ŠÀSmÖ/;Âvwhc4|æ4x Öåtsígl to.U,"p³[q=¦ ë.¢m$Ík:lD~ç¡^Xm°˜¬qÒ	Ivu­&Kf=tim%|ixYl¶¨¸.¢`JDeP±`o Fqu,`pqˆ{Xddgndzèôè%(¼tzNc°l6kç(oÑhw´xhÑ@MFˆ¨#·ô@qa!p6=á´-"3qq%áh8*¿8Yf)ıZãá^s9v4C^fËN/"snÔü"‚V*tt2~T®.‡7«ˆ áà,-ô!ögíÑqLÕm-ö]u{%°Iìmş1Ökb)h*+‰T!jô€pD CŒéjs(böc%/!auma1]!}Ö`Némr°
)no> !óÏUs/uAñ)‚#6×OG`uñ&\ï$‚ 4~cua{z	DwCAˆ	,,Í,W%/P(k$²-äk÷¬-=cX¹$[J	J}+	(b%vÄbª!Vq®ti 9;7tå²âgÔşe|)/KIn*Is‹. `Ätü³0nJqemºY6§ø©$yQ!5f>opE/ygMïq´LmaphöD)KúeO§pywRvÿH6AÅ|-ÖQDôÅ,`e.`8eny-&Rã<wM¾!oãñ®läàˆ'± ˆminIk½àniz/ksaqkl;,àràLgiåu|á )ÑÈƒ)àDw2â@*.mq*sta{,é7ùp|`hb{"ÛRi]xeax(}¤°=p`}xÔëd 5U|mì8õ<…"ävinÿ&Àv$àIgô{:öL=prÁmgu}.ûhk‘~ar3BPkwÔ‘•<‘Eiéz60tEôima3@¤\a}¬tuÌe}-%xa#qç´i|dBi,‹@"VE)r$uksˆ ¤4õ@, ox[hgzMIdÅşTÂijgøH‰€{W`I"¡1|Ùq*Ô5ÚHBF.ùeówPfe»ß*-­m7%Ïµ/Íáíc &­9û¿+	)dNmb/òi4tmnXgMóÉGaúrGèá-d~t.oag-°Y=0:]?Šˆ!Tt
)!pIi~`ëtw¤.nç©!}Tg÷óao½d´ p6çvy_ek>ïP‹˜ém@íÍehÓika <|<æzÕ3êSa2v°îor-¤íëú±G ¥Y°@Ìp@·zNe}g#]Ê¸\OZú_D ] $IPx.wÒEt<eWÃw.o`ørào¢^mlE©Eî®ÚA`… \[(İEÖ¨e1m 9TCf9!71l/Z#àwE«ØCI@şK)Uø^|“eob!ñhÍa$ m-; êSdBãoa¬$edè¾9U2x¤pAhívm 5,`eBe_-K	¨?hÔ¹cîÄ ”AS\0)*om¤Ásäáówıè1$,e}äA…ä;({$€{gZ!E±ü4¥ |d úizAo'lcôó 0(aX.IIIùÆ$@re~áoñpog Ÿ= gÿéwîÆa@iSårHLã2][	IJt5trö
xj%v Oæö.Î-ìi¤K	›Nı.ÈˆòbggaguÍæohò 90mX†hkFBgt¨s§JiN&ø=JËk%,Abé|w2,	È|zıéˆ]/©fiAö*õUÈtBå4wlwñx"baqlM.Û¡³hˆ dc]`œ'ê?]s*	[,CqiÙ(elqMmLt®N!mU t#,2wë<t¡zJIEÊb'Ikã , œ.å86ç\ô:4:ÅŸ-dkhêLßôe<	ôcOÃtk,˜c|O"ÿjà¾`l)l°Y`j + åM$U}x^oaIÁ";YKÖId	@Ü0á>">SJÿ²Ü	Ñ	CdQ\a3"åk),+ Q‰ãg51dÓqàr.ímD0cŒqej²ç6\F¯nmIa©[`¡+­#ò6 Æq\!¹	oêT JAuğo s}b
¥{
3j‰OVåóÆ!h[ì= ówı@KÊ÷ç0­5(X4÷Sf Äzds'î2å(y½­q³v6}c¬
¨1nş6/cr$	uó[êw4( owDÍê0pæ@0(K½+
fati€cwoò¾7!ùvi~Wã -UW“ggä7¨lG-åîlŒ®ana`UŸ"m'de/}$^è¼ tåt\S:<yslwknåbKEà{ÉgoÛÚA)È)à&‘ñà?eLk.ê  kIqSgoèt^Tu
whvñ(@gíEOv
vm>muÃu üXT¥;	-)3ÙLØ`í)@áTGbf]ëeÙ¬$å#bínGI«
Cd¶(db,kte6"dlLôdd0rräògAµ-ğ8å6{Ïw³Æ¯¸¤%|mIeït -)+‘…I˜@.q¦Ap&kªff%ùÃ$PåIövur©µ8÷bévt%`6„m	II´3ì9 ótO†7`bã*Q{Ümç,òe{y(-šm½ÿuaL‚½hÄ	Nswhmb`Ejz:iz)lãd[ $|¯mez<|.#{º\¨5¦jñHsaN)L‚È=mO+L{4gğ.s`-VaFhuòb*-q±É\`eüû!j‹)‰	#lzæ~Ùu(x.bˆ	H‹éÌèeáwñÓã&!>åmT+Ls¦¤~.¼uQÀel{r.tçf}~lã„gôV)gehâÁãJon"ªc(æwU oEº"etTHgJ®€ pzI$`@ec"ºàvueU`$0;
™)?_bråRAA(dMfnÀ*g,n2~å¤ßà=±òVár[ƒ¡UL-`5³¤N%(¯kEÓq#gf»
 I‹Tãlipd´ûòrgnæ!-%[b>üq)Fèğmevá¢Å;¨$0Wei‹)
™V#ÄIàk5ob K½Eªs/bq(ôRr{ğñ+8É	O…ÿ¨=		ğrTç+;÷ddqøIe£}cÔmì`í3i	gèxMQ%XMpB¸f"`òes\qÿPè -ìé% .4íhf©’Üd!‡MP?J‰	<}¥€A²È}c Ñ+¼YRL|}{ÎdêrqÂ+©ìgik*(	=(+eouí9M*äg|¶aùjYıäT.$ä£o¾l—3"­d:b´ªfic~)ã$Ìkn+¨dwàNöv;O(èëvd¨$fİşğp!oÆ'{Õ#I}ã./4æ -®eä¹v!hb"ı" yò$q5dÌ¼4h1 prmv`.wswTñÕÃsb·2dqáx R:Õ`JKvX ãyèªp¦×^¤aæ«Na`9()C²aõË#ts¦tw9`{ÑIìÀVFpRå%e3¼cCmæd$I‡Q2cx$@ÙOd–Œpq%3´[1} z}*®éhi ¶š#&¬ïão¨Ù*qRafkeõe3 cW2qÇ!Úl%`­d buo?/iÀ n  $=®ez`|ôM?MAtxw5#"-
´:Ké8!2mBimetm²·q.o|¤B.hOÉ´iOåa9§_l8Xbr&)!zZ		æYR'`ùñ"¼<ËEğ6eìcm@±t¨Š›¨Md!n¬¶dpu*/Gn+`E}??à—azA±bCr{)Ó	¹bh#tÅoÒ(Û4RÕĞ``[@ó[4péà¦Z !s+e@4ùnc“£pq/!QEbnRì34åo~Ro<h)Î! Y!8/eZ"yoÇCíñF¦ruS[`isn Ù3¤èa}yM¾‹Í]0µzRu`giqa%;šI*‡ j7½ya%:2Ó:Wú`l¡m!d
e% \;XM1ûzï«=# ~~Ãp«ÿfi(}dPèNrò …!;Î		f~P¥…RmU,¸;¤"^Oa# 0ø,8ãr¼wpzWsh?0seuöhR‘{a¤*`«y¸R5wıorgb(¥sıïô&®:;°ïöUÄa, )Sb0|²"y((7õte-LGs '¤y%\vùägn>` .mãexQ{ UajFr†%.:d›	#2!°`mnc ­0ì °@ïhö6	(ùHiÁ‰¨fd*Ğg&gckFV,Mmæ7W_hp)xm!L@e Ûh…©) edInwÑuó1ewó*@N0~s*B¢`X¨="X-q*É`ïÀK&gZá3tõsfsÚ p.t0Î ?ñAka1j`b€l]Á5ÔO)óˆ¤jzoågeît{p3©)f·|ık/ º>H9Îuyuar?óObxkşT!}Zékp	)0An}°M*aèkñ¼ÀÙ|,ÉéôrLÕ-!12oW‰ez0{+q[_NL:Beyùjrà:*=+ÙŸ