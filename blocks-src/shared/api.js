import apiFetch from '@wordpress/api-fetch';
import { decodeEntities } from '@wordpress/html-entities';
import { useEffect, useState, createRoot } from '@wordpress/element';

export const digits = ( v ) => String( v ?? '' ).replace( /\D/g, '' );

/** Parse "20270212" or "2027-02-12" into a local Date, or null if invalid. */
export function parseDate( raw ) {
	const d = digits( raw );
	if ( d.length !== 8 ) {
		return null;
	}
	const y = Number( d.slice( 0, 4 ) );
	const m = Number( d.slice( 4, 6 ) );
	const day = Number( d.slice( 6, 8 ) );
	const date = new Date( y, m - 1, day );
	const valid = date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === day;
	return valid ? date : null;
}

const DMY = { day: 'numeric', month: 'short', year: 'numeric' };
const fmt = ( d, o ) => d.toLocaleDateString( 'en-GB', o );

export function fmtDate( raw ) {
	const d = parseDate( raw );
	return d ? fmt( d, DMY ) : '';
}

/** "12-14 Feb 2027", "28 Feb - 2 Mar 2027" or a single date. */
export function fmtRange( start, end ) {
	const s = parseDate( start );
	const e = parseDate( end );
	if ( ! s ) {
		return '';
	}
	if ( ! e || e.getTime() === s.getTime() ) {
		return fmt( s, DMY );
	}
	if ( s.getFullYear() === e.getFullYear() ) {
		if ( s.getMonth() === e.getMonth() ) {
			return `${ s.getDate() }\u2013${ fmt( e, DMY ) }`;
		}
		return `${ fmt( s, { day: 'numeric', month: 'short' } ) } \u2013 ${ fmt( e, DMY ) }`;
	}
	return `${ fmt( s, DMY ) } \u2013 ${ fmt( e, DMY ) }`;
}

const plain = ( html ) => decodeEntities( String( html || '' ).replace( /<[^>]*>/g, '' ) ).trim();

/** Turn a REST conference object into a flat, safe object. */
export function normalise( post, topicMap = {}, formatMap = {} ) {
	const m = post.meta || {};
	return {
		id: post.id,
		title: plain( post.title && post.title.rendered ),
		link: post.link,
		excerpt: plain( post.excerpt && post.excerpt.rendered ),
		start: digits( m.start_date ),
		end: digits( m.end_date ),
		abstractDeadline: digits( m.abstract_deadline ),
		paperDeadline: digits( m.paper_deadline ),
		location: m.location || '',
		venue: m.venue || '',
		registrationUrl: m.registration_url || '',
		upcoming: Boolean( m.upcoming ),
		topics: ( post.conference_topic || [] ).map( ( id ) => topicMap[ id ] ).filter( Boolean ),
		formats: ( post.conference_format || [] ).map( ( id ) => formatMap[ id ] ).filter( Boolean ),
	};
}

/** Sort by start date, undated last. */
export const byStart = ( a, b ) => ( a.start || '99999999' ).localeCompare( b.start || '99999999' );

/** Search + filter helper used by the directory. */
export function filterConferences( items, { q = '', topic = '', format = '', upcomingOnly = false } = {} ) {
	const needle = q.trim().toLowerCase();
	return items.filter( ( c ) => {
		if ( upcomingOnly && ! c.upcoming ) {
			return false;
		}
		if ( topic && ! c.topics.includes( topic ) ) {
			return false;
		}
		if ( format && ! c.formats.includes( format ) ) {
			return false;
		}
		if ( needle ) {
			const hay = `${ c.title } ${ c.location } ${ c.venue } ${ c.topics.join( ' ' ) }`.toLowerCase();
			return hay.includes( needle );
		}
		return true;
	} );
}

let cache = null;

function load() {
	if ( ! cache ) {
		const q = '_fields=id,title,link,excerpt,meta,conference_topic,conference_format';
		cache = Promise.all( [
			apiFetch( { path: `/wp/v2/conference?per_page=100&${ q }` } ),
			apiFetch( { path: '/wp/v2/conference-topic?per_page=100&_fields=id,name' } ),
			apiFetch( { path: '/wp/v2/conference-format?per_page=100&_fields=id,name' } ),
		] )
			.then( ( [ posts, topics, formats ] ) => {
				const tMap = Object.fromEntries( topics.map( ( t ) => [ t.id, decodeEntities( t.name ) ] ) );
				const fMap = Object.fromEntries( formats.map( ( t ) => [ t.id, decodeEntities( t.name ) ] ) );
				return {
					items: posts.map( ( p ) => normalise( p, tMap, fMap ) ).sort( byStart ),
					topics: Object.values( tMap ).sort(),
					formats: Object.values( fMap ).sort(),
				};
			} )
			.catch( ( err ) => {
				cache = null;
				throw err;
			} );
	}
	return cache;
}

/** React hook: all conferences plus topic and format names. */
export function useConferences() {
	const [ state, setState ] = useState( { items: [], topics: [], formats: [], loading: true, error: null } );
	useEffect( () => {
		let live = true;
		load()
			.then( ( data ) => live && setState( { ...data, loading: false, error: null } ) )
			.catch( ( error ) => live && setState( ( s ) => ( { ...s, loading: false, error } ) ) );
		return () => {
			live = false;
		};
	}, [] );
	return state;
}

/** Mount a React component into every element matching `selector` on the front end. */
export function mountAll( selector, renderFn ) {
	const run = () =>
		document.querySelectorAll( selector ).forEach( ( el ) => createRoot( el ).render( renderFn( el ) ) );
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', run );
	} else {
		run();
	}
}
