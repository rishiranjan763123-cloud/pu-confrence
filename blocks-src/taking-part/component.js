import { T, Heading, Repeater } from '../shared/ui';
import EditionPicker from '../shared/ConfSelect';

export default function View( { a, set, editing, t } ) {
	return (
		<section className="pu-sec pu-sec--alt taking">
			<div className="wrap">
				<Heading kicker={ t( 'kicker' ) } title={ t( 'title' ) } sub={ t( 'sub' ) } />
				<Repeater
					items={ a.items }
					set={ ( items ) => set( { items } ) }
					editing={ editing }
					noun="option"
					tag="ul"
					className="ways"
					blank={ { title: 'New option', text: 'Describe it' } }
				>
					{ ( it, i, f, tools ) => (
						<li className="way">
							<T tag="h3" className="way__title" { ...f( 'title' ) } />
							<T tag="p" className="way__text" { ...f( 'text' ) } />
							{ tools }
						</li>
					) }
				</Repeater>
				<div className="pu-live" data-pu="picker" data-label={ a.pickerLabel }>
					{ editing ? <EditionPicker label={ a.pickerLabel } /> : null }
				</div>
			</div>
		</section>
	);
}
