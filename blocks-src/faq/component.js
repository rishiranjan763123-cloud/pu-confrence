import { T, Heading, Repeater } from '../shared/ui';

export default function View( { a, set, editing, t } ) {
	return (
		<section className="pu-sec pu-sec--alt faq">
			<div className="wrap wrap--narrow">
				<Heading kicker={ t( 'kicker' ) } title={ t( 'title' ) } sub={ t( 'sub' ) } />
				<Repeater
					items={ a.items }
					set={ ( items ) => set( { items } ) }
					editing={ editing }
					noun="question"
					className="faq__list"
					blank={ { q: 'New question', a: 'Answer' } }
				>
					{ ( it, i, f, tools ) =>
						editing ? (
							<div className="faq__item faq__item--edit">
								<T tag="h3" className="faq__q" { ...f( 'q' ) } />
								<T tag="p" className="faq__a" { ...f( 'a' ) } />
								{ tools }
							</div>
						) : (
							<details className="faq__item" name="pu-faq">
								<summary className="faq__q">
									<T tag="span" { ...f( 'q' ) } />
								</summary>
								<T tag="p" className="faq__a" { ...f( 'a' ) } />
							</details>
						)
					}
				</Repeater>
			</div>
		</section>
	);
}
