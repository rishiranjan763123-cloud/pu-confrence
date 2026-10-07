import { fmtRange, useConferences } from './api';

/** One conference card, shared by "Upcoming" and "Directory". */
export function ConfCard( { conf } ) {
	const dates = fmtRange( conf.start, conf.end );
	const place = [ conf.venue, conf.location ].filter( Boolean ).join( ', ' );
	return (
		<article className="card conf">
			<p className="conf__date">
				{ dates ? (
					<time dateTime={ conf.start }>{ dates }</time>
				) : (
					<span>Dates to be announced</span>
				) }
			</p>
			<h3 className="conf__title">
				<a href={ conf.link }>{ conf.title }</a>
			</h3>
			{ place && <p className="conf__place">{ place }</p> }
			{ ( conf.topics.length > 0 || conf.formats.length > 0 ) && (
				<ul className="tags" aria-label="Topics and format">
					{ [ ...conf.topics, ...conf.formats ].map( ( t ) => (
						<li key={ t }>{ t }</li>
					) ) }
				</ul>
			) }
			{ conf.registrationUrl && (
				<a className="conf__reg" href={ conf.registrationUrl }>
					Register for { conf.title }
				</a>
			) }
		</article>
	);
}

export default function Upcoming( { count = 3 } ) {
	const { items, loading, error } = useConferences();

	if ( loading ) {
		return (
			<p className="pu-state" role="status">
				Loading conferences...
			</p>
		);
	}
	if ( error ) {
		return (
			<p className="pu-state pu-state--error" role="alert">
				We could not load the conferences. Refresh the page to try again.
			</p>
		);
	}
	const list = items.filter( ( c ) => c.upcoming ).slice( 0, count );
	if ( ! list.length ) {
		return <p className="pu-state">No upcoming conferences are announced yet. Check back soon.</p>;
	}
	return (
		<ul className="cards">
			{ list.map( ( c ) => (
				<li key={ c.id }>
					<ConfCard conf={ c } />
				</li>
			) ) }
		</ul>
	);
}
