import { T, Repeater, Img, Btn, UrlField } from '../shared/ui';

export default function View( { a, set, editing } ) {
	const total = a.items.length;
	return (
		<section className="pu-sec slider-sec">
			<div className="wrap">
				<div className="slider" data-slider data-interval="7000" role="region" aria-roledescription="carousel" aria-label="Highlights">
					<Repeater
						items={ a.items }
						set={ ( items ) => set( { items } ) }
						editing={ editing }
						noun="slide"
						className="slider__track"
						blank={ { image: { id: 0, url: '', alt: '' }, title: 'New slide', text: 'Short text', btnText: 'Learn more', btnUrl: '#' } }
					>
						{ ( it, i, f, tools, patch ) => (
							<div className="slide" role="group" aria-roledescription="slide" aria-label={ `${ i + 1 } of ${ total }` }>
								<Img className="slide__img" img={ it.image } onChange={ ( image ) => patch( { image } ) } editing={ editing } />
								<div className="slide__body">
									<T tag="h2" className="slide__title" { ...f( 'title' ) } />
									<T tag="p" className="slide__text" { ...f( 'text' ) } />
									<Btn className="btn btn--primary" text={ f( 'btnText' ) } url={ it.btnUrl } editing={ editing } />
									<UrlField value={ it.btnUrl } onChange={ ( btnUrl ) => patch( { btnUrl } ) } editing={ editing } label="Button link" />
									{ tools }
								</div>
							</div>
						) }
					</Repeater>
				</div>
			</div>
		</section>
	);
}
