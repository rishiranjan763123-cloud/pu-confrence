import { T, Repeater } from '../shared/ui';

export default function View( { a, set, editing } ) {
	return (
		<section className="pu-sec pu-sec--tight steps">
			<div className="wrap">
				<Repeater
					items={ a.items }
					set={ ( items ) => set( { items } ) }
					editing={ editing }
					noun="step"
					tag="ol"
					className="steps__bar"
					blank={ { number: '04', title: 'New step', sub: 'Describe it' } }
				>
					{ ( it, i, f, tools ) => (
						<li className="steps__item">
							<T tag="span" className="steps__num" { ...f( 'number' ) } />
							<span className="steps__txt">
								<T tag="strong" { ...f( 'title' ) } />
								<T tag="small" { ...f( 'sub' ) } />
							</span>
							{ tools }
						</li>
					) }
				</Repeater>
			</div>
		</section>
	);
}
