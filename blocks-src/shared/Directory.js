import { useMemo, useState } from '@wordpress/element';
import { useConferences, filterConferences } from './api';
import { ConfCard } from './Upcoming';

const PAGE = 6;

export default function Directory() {
	const { items, topics, formats, loading, error } = useConferences();
	const [ q, setQ ] = useState( '' );
	const [ topic, setTopic ] = useState( '' );
	const [ format, setFormat ] = useState( '' );
	const [ upcomingOnly, setUpcomingOnly ] = useState( false );
	const [ shown, setShown ] = useState( PAGE );

	const results = useMemo(
		() => filterConferences( items, { q, topic, format, upcomingOnly } ),
		[ items, q, topic, format, upcomingOnly ]
	);

	const onFilter = ( setter ) => ( e ) => {
		setter( e.target.type === 'checkbox' ? e.target.checked : e.target.value );
		setShown( PAGE );
	};
	const reset = () => {
		setQ( '' );
		setTopic( '' );
		setFormat( '' );
		setUpcomingOnly( false );
		setShown( PAGE );
	};

	return (
		<div className="directory">
			<form className="filters" role="search" aria-label="Filter conferences" onSubmit={ ( e ) => e.preventDefault() }>
				<div className="field field--grow">
					<label htmlFor="pu-dir-q">Search</label>
					<input id="pu-dir-q" type="search" value={ q } onChange={ onFilter( setQ ) } placeholder="Title, city or topic" />
				</div>
				<div className="field">
					<label htmlFor="pu-dir-topic">Topic</label>
					<select id="pu-dir-topic" value={ topic } onChange={ onFilter( setTopic ) }>
						<option value="">All topics</option>
						{ topics.map( ( t ) => (
							<option key={ t } value={ t }>
								{ t }
							</option>
						) ) }
					</select>
				</div>
				<div className="field">
					<label htmlFor="pu-dir-format">Format</label>
					<select id="pu-dir-format" value={ format } onChange={ onFilter( setFormat ) }>
						<option value="">All formats</option>
						{ formats.map( ( t ) => (
							<option key={ t } value={ t }>
								{ t }
							</option>
						) ) }
					</select>
				</div>
				<label className="check" htmlFor="pu-dir-up">
					<input id="pu-dir-up" type="checkbox" checked={ upcomingOnly } onChange={ onFilter( setUpcomingOnly ) } />
					Upcoming only
				</label>
				<button type="button" className="btn btn--outline" onClick={ reset }>
					Clear filters
				</button>
			</form>

			<p className="directory__count" role="status" aria-live="polite">
				{ loading ? 'Loading conferences...' : `${ results.length } conference${ results.length === 1 ? '' : 's' } found` }
			</p>

			{ error && (
				<p className="pu-state pu-state--error" role="alert">
					We could not load the conferences. Refresh the page to try again.
				</p>
			) }

			{ ! loading && ! error && results.length === 0 && (
				<p className="pu-state">Nothing matches those filters. Clear a filter or try a different search.</p>
			) }

			<ul className="cards">
				{ results.slice( 0, shown ).map( ( c ) => (
					<li key={ c.id }>
						<ConfCard conf={ c } />
					</li>
				) ) }
			</ul>

			{ results.length > shown && (
				<div className="pu-more">
					<button type="button" className="btn btn--outline" onClick={ () => setShown( ( n ) => n + PAGE ) }>
						Show more conferences
					</button>
				</div>
			) }
		</div>
	);
}
