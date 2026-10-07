import { T, TitleLink, Heading, Repeater, Img, UrlField } from '../shared/ui';

export default function View( { a, set, editing, t } ) {
	return (
		<section className="pu-sec research">
			<div className="wrap">
				<Heading kicker={ t( 'kicker' ) } title={ t( 'title' ) } sub={ t( 'sub' ) } />
				<Repeater
					items={ a.items }
					set={ ( items ) => set( { items } ) }
					editing={ editing }
					noun="card"
					className="rcards"
					blank={ { image: { id: 0, url: '', alt: '' }, tag: 'Tag', title: 'New card', text: 'Short description', url: '' } }
				>
					{ ( it, i, f, tools, patch ) => (
						<article className="rcard">
							<Img className="rcard__img" img={ it.image } onChange={ ( image ) => patch( { image } ) } editing={ editing } />
							<div className="rcard__body">
								<T tag="p" className="rcard__tag" { ...f( 'tag' ) } />
								<TitleLink tag="h3" className="rcard__title" text={ f( 'title' ) } url={ it.url } />
								<T tag="p" className="rcard__text" { ...f( 'text' ) } />
								<UrlField value={ it.url } onChange={ ( url ) => patch( { url } ) } editing={ editing } />
								{ tools }
							</div>
						</article>
					) }
				</Repeater>
			</div>
		</section>
	);
}
