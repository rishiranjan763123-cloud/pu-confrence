import { Heading } from '../shared/ui';
import Directory from '../shared/Directory';

export default function View( { editing, t } ) {
	return (
		<section className="pu-sec directory-sec" id="directory">
			<div className="wrap">
				<Heading kicker={ t( 'kicker' ) } title={ t( 'title' ) } sub={ t( 'sub' ) } />
				<div className="pu-live" data-pu="directory">
					{ editing ? <Directory /> : null }
				</div>
			</div>
		</section>
	);
}
