import { parseDate, fmtRange, filterConferences, byStart, normalise } from './api';

describe( 'parseDate', () => {
	it( 'parses Ymd and Y-m-d', () => {
		expect( parseDate( '20270212' ).getDate() ).toBe( 12 );
		expect( parseDate( '2027-02-12' ).getMonth() ).toBe( 1 );
	} );
	it( 'rejects invalid dates', () => {
		expect( parseDate( '20270230' ) ).toBeNull();
		expect( parseDate( '' ) ).toBeNull();
		expect( parseDate( null ) ).toBeNull();
	} );
} );

describe( 'fmtRange', () => {
	it( 'formats a range inside one month', () => {
		expect( fmtRange( '20270212', '20270214' ) ).toBe( '12\u201314 Feb 2027' );
	} );
	it( 'formats a range across months', () => {
		expect( fmtRange( '20270228', '20270302' ) ).toBe( '28 Feb \u2013 2 Mar 2027' );
	} );
	it( 'handles single and missing dates', () => {
		expect( fmtRange( '20270212', '' ) ).toBe( '12 Feb 2027' );
		expect( fmtRange( '', '' ) ).toBe( '' );
	} );
} );

describe( 'normalise and filterConferences', () => {
	const mk = ( id, title, start, upcoming, topic, format ) =>
		normalise(
			{
				id,
				title: { rendered: title },
				meta: { start_date: start, upcoming, location: 'Vadodara' },
				conference_topic: [ topic ],
				conference_format: [ format ],
			},
			{ 1: 'AI', 2: 'Energy' },
			{ 1: 'Hybrid', 2: 'Online' }
		);
	const items = [
		mk( 1, 'AI &amp; Robotics', '20270301', true, 1, 1 ),
		mk( 2, 'Energy Summit', '20270101', false, 2, 2 ),
	];

	it( 'decodes titles', () => {
		expect( items[ 0 ].title ).toBe( 'AI & Robotics' );
	} );
	it( 'sorts by start date', () => {
		expect( [ ...items ].sort( byStart )[ 0 ].id ).toBe( 2 );
	} );
	it( 'filters by search, topic, format and upcoming flag', () => {
		expect( filterConferences( items, { q: 'robot' } ) ).toHaveLength( 1 );
		expect( filterConferences( items, { topic: 'Energy' } )[ 0 ].id ).toBe( 2 );
		expect( filterConferences( items, { format: 'Hybrid' } )[ 0 ].id ).toBe( 1 );
		expect( filterConferences( items, { upcomingOnly: true } ) ).toHaveLength( 1 );
		expect( filterConferences( items, {} ) ).toHaveLength( 2 );
	} );
} );
