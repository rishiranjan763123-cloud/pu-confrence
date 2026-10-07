import { registerBlockType } from '@wordpress/blocks';
import {
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

const noop = () => {};

/** Only allow safe URL schemes in saved markup. */
export function safeUrl( url ) {
	return /^(https?:|mailto:|tel:|\/|#)/i.test( url || '' ) ? url : '#';
}

/** Build the `t( 'field' )` helper that returns props for <T />. */
export const fieldsFor = ( a, set, editing ) => ( key, placeholder ) => ( {
	value: a[ key ],
	onChange: ( v ) => set( { [ key ]: v } ),
	editing,
	placeholder,
} );

const hasContent = ( p ) => p && ( p.editing || p.value );

/** Editable rich text in the editor, plain HTML on the front end. */
export function T( { tag = 'span', value, onChange, editing, placeholder, className } ) {
	if ( editing ) {
		return (
			<RichText
				tagName={ tag }
				className={ className }
				value={ value || '' }
				onChange={ onChange }
				placeholder={ placeholder || 'Type here' }
				allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
			/>
		);
	}
	return <RichText.Content tagName={ tag } className={ className } value={ value || '' } />;
}

/** Title that becomes a link on the front end when a URL is set. */
export function TitleLink( { tag = 'h3', className, text, url } ) {
	if ( text.editing || ! url ) {
		return <T tag={ tag } className={ className } { ...text } />;
	}
	const Tag = tag;
	return (
		<Tag className={ className }>
			<a href={ safeUrl( url ) }>
				<RichText.Content value={ text.value || '' } />
			</a>
		</Tag>
	);
}

/** Section heading: kicker, title, optional sub line. */
export function Heading( { kicker, title, sub } ) {
	return (
		<header className="sec-head">
			{ hasContent( kicker ) && <T tag="p" className="sec-head__kicker" { ...kicker } /> }
			{ hasContent( title ) && <T tag="h2" className="sec-head__title" { ...title } /> }
			{ hasContent( sub ) && <T tag="p" className="sec-head__sub" { ...sub } /> }
		</header>
	);
}

/** Button: label is editable in the editor, link is a normal <a> on the front end. */
export function Btn( { text, url, className = 'btn btn--primary', editing } ) {
	if ( editing ) {
		return (
			<span className={ className }>
				<T { ...text } />
			</span>
		);
	}
	if ( ! text.value ) {
		return null;
	}
	return (
		<a className={ className } href={ safeUrl( url ) }>
			<RichText.Content value={ text.value } />
		</a>
	);
}

/** Inline URL box, only visible in the editor. */
export function UrlField( { value, onChange, editing, label = 'Link URL' } ) {
	if ( ! editing ) {
		return null;
	}
	return (
		<input
			type="url"
			className="pu-urlfield"
			aria-label={ label }
			placeholder="Link: https://..."
			value={ value || '' }
			onChange={ ( e ) => onChange( e.target.value ) }
		/>
	);
}

/** Image: <img> on the front end, picker button in the editor. */
export function Img( { img, onChange, editing, className = '' } ) {
	const url = img && img.url;
	if ( ! editing ) {
		return url ? (
			<img className={ className } src={ url } alt={ img.alt || '' } loading="lazy" decoding="async" />
		) : (
			<div className={ `${ className } img-ph` } aria-hidden="true" />
		);
	}
	return (
		<div className={ `${ className } img-edit` }>
			{ url ? <img src={ url } alt={ img.alt || '' } /> : <div className="img-ph" /> }
			<MediaUploadCheck>
				<MediaUpload
					allowedTypes={ [ 'image' ] }
					value={ img && img.id }
					onSelect={ ( m ) => onChange( { id: m.id, url: m.url, alt: m.alt || '' } ) }
					render={ ( { open } ) => (
						<Button variant="secondary" className="img-edit__btn" onClick={ open }>
							{ url ? 'Replace image' : 'Choose image' }
						</Button>
					) }
				/>
			</MediaUploadCheck>
		</div>
	);
}

/** Sidebar panel wrapper. */
export function Panel( { title, children, open = true } ) {
	return (
		<InspectorControls>
			<PanelBody title={ title } initialOpen={ open }>
				{ children }
			</PanelBody>
		</InspectorControls>
	);
}

/** Sidebar URL input. */
export function UrlControl( { label, value, onChange } ) {
	return (
		<TextControl
			__nextHasNoMarginBottom
			__next40pxDefaultSize
			label={ label }
			type="url"
			value={ value || '' }
			onChange={ onChange }
			help="Use https://..., /page or #section"
		/>
	);
}

/**
 * Editable list. Children is a render function:
 * ( item, index, f, tools, patch ) => JSX
 * f( 'key' ) gives <T /> props for that item field, patch( {k: v} ) updates the item.
 */
export function Repeater( {
	items = [],
	set,
	editing,
	noun = 'item',
	blank = {},
	className = '',
	tag = 'div',
	children,
} ) {
	const Wrap = tag;
	const update = ( i, patch ) => set( items.map( ( it, n ) => ( n === i ? { ...it, ...patch } : it ) ) );
	const remove = ( i ) => set( items.filter( ( _, n ) => n !== i ) );
	const move = ( i, d ) => {
		const j = i + d;
		if ( j < 0 || j >= items.length ) {
			return;
		}
		const next = [ ...items ];
		[ next[ i ], next[ j ] ] = [ next[ j ], next[ i ] ];
		set( next );
	};

	return (
		<>
			<Wrap className={ className }>
				{ items.map( ( it, i ) => {
					const f = ( key, placeholder ) => ( {
						value: it[ key ],
						onChange: ( v ) => update( i, { [ key ]: v } ),
						editing,
						placeholder,
					} );
					const tools = editing ? (
						<span className="pu-tools" contentEditable={ false }>
							<button type="button" aria-label={ `Move ${ noun } up` } onClick={ () => move( i, -1 ) }>
								&uarr;
							</button>
							<button type="button" aria-label={ `Move ${ noun } down` } onClick={ () => move( i, 1 ) }>
								&darr;
							</button>
							<button type="button" aria-label={ `Remove ${ noun }` } onClick={ () => remove( i ) }>
								&times;
							</button>
						</span>
					) : null;
					return (
						<Fragment key={ i }>
							{ children( it, i, f, tools, ( patch ) => update( i, patch ) ) }
						</Fragment>
					);
				} ) }
			</Wrap>
			{ editing && (
				<Button variant="secondary" className="pu-add" onClick={ () => set( [ ...items, { ...blank } ] ) }>
					{ `Add ${ noun }` }
				</Button>
			) }
		</>
	);
}

/**
 * Register a block. View renders the same markup in the editor and in saved content.
 * options.inspector: component for sidebar controls, receives { a, set }.
 */
export function registerPU( metadata, View, { inspector: Inspector } = {} ) {
	function Edit( { attributes, setAttributes } ) {
		const blockProps = useBlockProps();
		return (
			<div { ...blockProps }>
				{ Inspector && <Inspector a={ attributes } set={ setAttributes } /> }
				<View a={ attributes } set={ setAttributes } editing t={ fieldsFor( attributes, setAttributes, true ) } />
			</div>
		);
	}

	function Save( { attributes } ) {
		return (
			<div { ...useBlockProps.save() }>
				<View a={ attributes } set={ noop } editing={ false } t={ fieldsFor( attributes, noop, false ) } />
			</div>
		);
	}

	registerBlockType( metadata.name, { edit: Edit, save: Save } );
}
