/**
 * Front-end behaviour: mobile menu and the call-to-action slider.
 * Plain JavaScript, no dependencies. The FAQ uses native <details>, so it needs no script.
 */
( function () {
	'use strict';

	/* ---------- Mobile menu ---------- */
	var toggle = document.querySelector( '.nav-toggle' );
	var nav = document.getElementById( 'primary-nav' );

	if ( toggle && nav ) {
		var setOpen = function ( open ) {
			toggle.setAttribute( 'aria-expanded', String( open ) );
			nav.classList.toggle( 'is-open', open );
		};
		toggle.addEventListener( 'click', function () {
			setOpen( toggle.getAttribute( 'aria-expanded' ) !== 'true' );
		} );
		document.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'Escape' && toggle.getAttribute( 'aria-expanded' ) === 'true' ) {
				setOpen( false );
				toggle.focus();
			}
		} );
	}

	/* ---------- Slider ---------- */
	var reduceMotion = window.matchMedia && window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	function makeButton( cls, label, text ) {
		var b = document.createElement( 'button' );
		b.type = 'button';
		b.className = cls;
		b.setAttribute( 'aria-label', label );
		b.textContent = text;
		return b;
	}

	function initSlider( root ) {
		var slides = Array.prototype.slice.call( root.querySelectorAll( '.slide' ) );
		if ( slides.length < 2 ) {
			return;
		}
		var interval = parseInt( root.getAttribute( 'data-interval' ), 10 ) || 7000;
		var index = 0;
		var timer = null;
		var playing = ! reduceMotion;

		var ctrl = document.createElement( 'div' );
		ctrl.className = 'slider__ctrl';
		var prev = makeButton( 'slider__btn', 'Previous slide', '\u2039' );
		var next = makeButton( 'slider__btn', 'Next slide', '\u203A' );
		var pause = makeButton( 'slider__btn', 'Pause automatic slide show', '\u275A\u275A' );
		var dots = document.createElement( 'div' );
		dots.className = 'slider__dots';
		var dotEls = slides.map( function ( _, i ) {
			var d = makeButton( 'slider__dot', 'Go to slide ' + ( i + 1 ), '' );
			d.addEventListener( 'click', function () {
				show( i );
			} );
			dots.appendChild( d );
			return d;
		} );
		ctrl.appendChild( prev );
		ctrl.appendChild( dots );
		ctrl.appendChild( pause );
		ctrl.appendChild( next );
		root.appendChild( ctrl );

		function show( i ) {
			index = ( i + slides.length ) % slides.length;
			slides.forEach( function ( s, n ) {
				s.classList.toggle( 'is-active', n === index );
			} );
			dotEls.forEach( function ( d, n ) {
				d.setAttribute( 'aria-current', n === index ? 'true' : 'false' );
			} );
		}

		function stop() {
			window.clearInterval( timer );
			timer = null;
		}
		function start() {
			stop();
			if ( playing ) {
				timer = window.setInterval( function () {
					show( index + 1 );
				}, interval );
			}
		}
		function syncPause() {
			pause.textContent = playing ? '\u275A\u275A' : '\u25B6';
			pause.setAttribute( 'aria-label', playing ? 'Pause automatic slide show' : 'Start automatic slide show' );
		}

		prev.addEventListener( 'click', function () {
			show( index - 1 );
			start();
		} );
		next.addEventListener( 'click', function () {
			show( index + 1 );
			start();
		} );
		pause.addEventListener( 'click', function () {
			playing = ! playing;
			syncPause();
			start();
		} );
		root.addEventListener( 'mouseenter', stop );
		root.addEventListener( 'mouseleave', start );
		root.addEventListener( 'focusin', stop );
		root.addEventListener( 'focusout', start );
		root.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'ArrowLeft' ) {
				show( index - 1 );
			} else if ( e.key === 'ArrowRight' ) {
				show( index + 1 );
			}
		} );

		root.classList.add( 'is-ready' );
		root.setAttribute( 'aria-live', 'off' );
		syncPause();
		show( 0 );
		start();
	}

	Array.prototype.forEach.call( document.querySelectorAll( '[data-slider]' ), initSlider );
} )();

/* ---------- Screenshot-style callback form ---------- */
( function () {
	var form = document.querySelector( '[data-pu-callback]' );
	if ( ! form ) return;
	var note = form.querySelector( '[data-callback-note]' );
	form.addEventListener( 'submit', function ( e ) {
		e.preventDefault();
		var data = new FormData( form );
		var payload = {};
		data.forEach( function ( value, key ) { payload[ key ] = value; } );
		if ( payload.website ) return;
		note.textContent = 'Sending your request…';
		fetch( window.location.origin + '/wp-json/pu/v1/callback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify( payload ) } )
			.then( function ( response ) { return response.json(); } )
			.then( function ( result ) {
				if ( result.ok ) { form.reset(); note.textContent = result.message || 'Thank you. We will call you back soon.'; }
				else { note.textContent = result.message || 'Please check the form and try again.'; }
			} )
			.catch( function () { note.textContent = 'We could not send the request. Please try again.'; } );
	} );
} )();
