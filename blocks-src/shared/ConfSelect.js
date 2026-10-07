import { useState } from '@wordpress/element';
import { useConferences, fmtRange, fmtDate } from './api';

/** Dropdown of announced editions. onChange receives the conference id as a string. */
export function ConfSelect( { id, value, onChange, label = 'Select an announced edition', required = false } ) {
	const { items, loading, error } = useConferences();
	const upcoming = items.filter( ( c ) => c.upcoming );
	const list = upcoming.length ? upcoming : items;

	return (
		<div className="field">
			<label htmlFor={ id }>{ label }</label>
			<select id={ id } value={ value } required={ required } onChange={ ( e ) => onChange( e.target.value ) } disabled={ loading || !! error }>
				<option value="">{ loading ? 'Loading...' : 'Choose a conference' }</option>
				{ list.map( ( c ) => (
					<option key={ c.id } value={ String( c.id ) }>
						{ c.title }
					</option>
				) ) }
			</select>
			{ error && (
				<p className="field__error" role="alert">
					The list could not be loaded. Refresh the page.
				</p>
			) }
		</div>
	);
}

/** Dropdown plus a details panel for the chosen edition. */
export default function EditionPicker( { label } ) {
	const { items } = useConferences();
	const [ value, setValue ] = useState( '' );
	const conf = items.find( ( c ) => String( c.id ) === value );

	return (
		<div className="picker">
			<ConfSelect id="pu-pick" value={ value } onChange={ setValue } label={ label } />
			<div className="picker__out" aria-live="polite">
				{ conf && (
					<dl className="picker__details">
						<div>
							<dt>Dates</dt>
							<dd>{ fmtRange( conf.start, conf.end ) || 'To be announced' }</dd>
						</div>
						<div>
							<dt>Location</dt>
							<dd>{ [ conf.venue, conf.location ].filter( Boolean ).join( ', ' ) || 'To be announced' }</dd>
						</div>
						<div>
							<dt>Abstract deadline</dt>
							<dd>{ fmtDate( conf.abstractDeadline ) || 'To be announced' }</dd>
						</div>
						<div>
							<dt>Paper deadline</dt>
							<dd>{ fmtDate( conf.paperDeadline ) || 'To be announced' }</dd>
						</div>
						<div className="picker__actions">
							<a className="btn btn--primary" href={ conf.link }>
								View conference
							</a>
							{ conf.registrationUrl && (
								<a className="btn btn--outline" href={ conf.registrationUrl }>
									Register
								</a>
							) }
						</div>
					</dl>
				) }
			</div>
		</div>
	);
}
