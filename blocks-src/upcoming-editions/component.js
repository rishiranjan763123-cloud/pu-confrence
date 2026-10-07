import { Heading, Btn } from '../shared/ui';
import Upcoming from '../shared/Upcoming';

export default function View( { a, editing, t } ) {
	return (
		<section className="pu-sec upcoming">
			<div className="wrap">
				<Heading kicker={ t( 'kicker' ) } title={ t( 'title' ) } sub={ t( 'sub' ) } />
				<div className="pu-live" data-pu="upcoming" data-count={ a.count }>
					{ editing ? <Upcoming count={ a.count } /> : null }
				</div>
				<div className="pu-more">
					<Btn className="btn btn--outline" text={ t( 'viewAllText' ) } url={ a.viewAllUrl } editing={ editing } />
				</div>
			</div>
		</section>
	);
}
