import { T, Heading, Repeater, Btn } from '../shared/ui';

export default function View( { a, set, editing, t } ) {
	return (
		<section className="pu-sec pu-sec--alt deadlines">
			<div className="wrap">
				<Heading kicker={ t( 'kicker' ) } title={ t( 'title' ) } sub={ t( 'sub' ) } />
				<Repeater
					items={ a.items }
					set={ ( items ) => set( { items } ) }
					editing={ editing }
					noun="deadline"
					tag="ul"
					className="deadlines__list"
					blank={ { label: 'New deadline', date: 'Date', note: 'Short note' } }
				>
					{ ( it, i, f, tools ) => (
						<li className="deadline">
							<T tag="span" className="deadline__date" { ...f( 'date' ) } />
							<span className="deadline__body">
								<T tag="strong" className="deadline__label" { ...f( 'label' ) } />
								<T tag="span" className="deadline__note" { ...f( 'note' ) } />
							</span>
							{ tools }
						</li>
					) }
				</Repeater>
				<div className="pu-more">
					<Btn className="btn btn--primary" text={ t( 'btnText' ) } url={ a.btnUrl } editing={ editing } />
				</div>
			</div>
		</section>
	);
}
