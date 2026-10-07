import metadata from './block.json';
import View from './component';
import { registerPU, Panel, UrlControl, Img } from '../shared/ui';

function Inspector( { a, set } ) {
	return (
		<Panel title="Hero settings">
			<UrlControl label="Primary button link" value={ a.primaryUrl } onChange={ ( primaryUrl ) => set( { primaryUrl } ) } />
			<UrlControl label="Secondary button link" value={ a.secondaryUrl } onChange={ ( secondaryUrl ) => set( { secondaryUrl } ) } />
			<p>Background image</p>
			<Img img={ a.image } onChange={ ( image ) => set( { image } ) } editing className="pu-side-img" />
		</Panel>
	);
}

registerPU( metadata, View, { inspector: Inspector } );
