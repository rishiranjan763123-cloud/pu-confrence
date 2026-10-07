import { Heading } from '../shared/ui';
import CallbackForm from '../shared/CallbackForm';

export default function View( { editing, t } ) {
	return (
		<section className="pu-sec callback" id="callback">
			<div className="wrap wrap--narrow">
				<Heading kicker={ t( 'kicker' ) } title={ t( 'title' ) } sub={ t( 'sub' ) } />
				<div className="pu-live" data-pu="callback">
					{ editing ? <CallbackForm preview /> : null }
				</div>
			</div>
		</section>
	);
}
