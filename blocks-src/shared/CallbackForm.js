import { useRef, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { ConfSelect } from './ConfSelect';

const EMPTY = { name: '', email: '', phone: '', conference: '', message: '', website: '' };

/** Client-side checks. The server validates again, so these are only for fast feedback. */
export function validate( v ) {
	const e = {};
	if ( v.name.trim().length < 2 ) {
		e.name = 'Enter your name.';
	}
	if ( ! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( v.email.trim() ) ) {
		e.email = 'Enter a valid email address.';
	}
	if ( ! /^[0-9+()\-\s]{7,20}$/.test( v.phone.trim() ) ) {
		e.phone = 'Enter a valid phone number.';
	}
	if ( v.message.length > 1000 ) {
		e.message = 'Keep your message under 1000 characters.';
	}
	return e;
}

export default function CallbackForm( { preview = false } ) {
	const [ v, setV ] = useState( EMPTY );
	const [ errors, setErrors ] = useState( {} );
	const [ status, setStatus ] = useState( 'idle' ); // idle | sending | done | error
	const [ note, setNote ] = useState( '' );
	const formRef = useRef( null );

	const set = ( key ) => ( e ) => setV( ( s ) => ( { ...s, [ key ]: e.target.value } ) );

	const submit = async ( e ) => {
		e.preventDefault();
		if ( preview || status === 'sending' ) {
			return;
		}
		const found = validate( v );
		setErrors( found );
		if ( Object.keys( found ).length ) {
			const first = formRef.current.querySelector( `[name="${ Object.keys( found )[ 0 ] }"]` );
			first && first.focus();
			return;
		}
		setStatus( 'sending' );
		setNote( '' );
		try {
			const res = await apiFetch( { path: '/pu/v1/callback', method: 'POST', data: v } );
			setStatus( 'done' );
			setNote( res.message || 'Thank you. We will call you back soon.' );
			setV( EMPTY );
		} catch ( err ) {
			setStatus( 'error' );
			setNote( err.message || 'Something went wrong. Please try again.' );
			if ( err.data && err.data.fields ) {
				setErrors( err.data.fields );
			}
		}
	};

	const field = ( key, label, props = {} ) => (
		<div className="field">
			<label htmlFor={ `pu-cb-${ key }` }>{ label }</label>
			<input
				id={ `pu-cb-${ key }` }
				name={ key }
				value={ v[ key ] }
				onChange={ set( key ) }
				aria-invalid={ errors[ key ] ? 'true' : undefined }
				aria-describedby={ errors[ key ] ? `pu-cb-${ key }-err` : undefined }
				required
				{ ...props }
			/>
			{ errors[ key ] && (
				<p className="field__error" id={ `pu-cb-${ key }-err` }>
					{ errors[ key ] }
				</p>
			) }
		</div>
	);

	return (
		<form ref={ formRef } className="cb-form" onSubmit={ submit } noValidate>
			<div className="cb-form__grid">
				{ field( 'name', 'Full name', { autoComplete: 'name', maxLength: 80 } ) }
				{ field( 'email', 'Email', { type: 'email', autoComplete: 'email' } ) }
				{ field( 'phone', 'Phone number', { type: 'tel', autoComplete: 'tel', maxLength: 20 } ) }
				<ConfSelect id="pu-cb-conference" value={ v.conference } onChange={ ( id ) => setV( ( s ) => ( { ...s, conference: id } ) ) } label="Conference of interest" />
			</div>
			<div className="field">
				<label htmlFor="pu-cb-message">Message (optional)</label>
				<textarea id="pu-cb-message" name="message" rows="4" maxLength="1000" value={ v.message } onChange={ set( 'message' ) } />
				{ errors.message && <p className="field__error">{ errors.message }</p> }
			</div>

			{ /* Honeypot: hidden from people, bots fill it in. */ }
			<div className="hp" aria-hidden="true">
				<label htmlFor="pu-cb-website">Leave this field empty</label>
				<input id="pu-cb-website" name="website" tabIndex="-1" autoComplete="off" value={ v.website } onChange={ set( 'website' ) } />
			</div>

			<button type="submit" className="btn btn--primary" disabled={ status === 'sending' || preview }>
				{ status === 'sending' ? 'Sending...' : 'Request a callback' }
			</button>
			{ preview && <p className="field__hint">Form preview. It works on the live page.</p> }

			<p className={ `cb-form__note cb-form__note--${ status }` } role={ status === 'error' ? 'alert' : 'status' }>
				{ note }
			</p>
		</form>
	);
}
