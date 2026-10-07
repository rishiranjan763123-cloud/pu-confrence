import { T, Btn } from '../shared/ui';

export default function View( { a, editing, t } ) {
	const bg = a.image && a.image.url ? { backgroundImage: `url("${ a.image.url }")` } : undefined;
	return (
		<section className="hero" style={ bg }>
			<div className="hero__shade">
				<div className="wrap hero__in">
					<T tag="p" className="hero__kicker" { ...t( 'kicker' ) } />
					<T tag="h1" className="hero__title" { ...t( 'title' ) } />
					<T tag="p" className="hero__text" { ...t( 'text' ) } />
					<div className="hero__cta">
						<Btn className="btn btn--primary" text={ t( 'primaryText' ) } url={ a.primaryUrl } editing={ editing } />
						<Btn className="btn btn--ghost" text={ t( 'secondaryText' ) } url={ a.secondaryUrl } editing={ editing } />
					</div>
				</div>
			</div>
		</section>
	);
}
