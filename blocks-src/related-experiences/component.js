import { T, TitleLink, Heading, Repeater, Btn, UrlField } from '../shared/ui';

export default function View( { a, set, editing, t } ) {
	return (
		<section className="pu-sec related">
			<div className="wrap">
				<Heading kicker={ t( 'kicker' ) } title={ t( 'title' ) } sub={ t( 'sub' ) } />
				<Repeater
					items={ a.items }
					set={ ( items ) => set( { items } ) }
					editing={ editing }
					noun="experience"
					tag="ul"
					className="related__list"
					blank={ { title: 'New experience', text: 'Describe it', url: '' } }
				>
					{ ( it, i, f, tools, patch ) => (
						<li className="related__item">
							<TitleLink tag="h3" className="related__title" text={ f( 'title' ) } url={ it.url } />
							<T tag="p" className="related__text" { ...f( 'text' ) } />
							<UrlField value={ it.url } onChange={ ( url ) => patch( { url } ) } editing={ editing } />
							{ tools }
						</li>
					) }
				</Repeater>
				<div className="banner">
					<div>
						<T tag="h3" className="banner__title" { ...t( 'bannerTitle' ) } />
						<T tag="p" className="banner__text" { ...t( 'bannerText' ) } />
					</div>
					<Btn className="btn btn--primary" text={ t( 'bannerBtnText' ) } url={ a.bannerBtnUrl } editing={ editing } />
				</div>
			</div>
		</section>
	);
}
