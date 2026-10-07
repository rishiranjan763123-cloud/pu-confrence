import metadata from './block.json';
import View from './component';
import { registerPU, Panel, UrlControl } from '../shared/ui';

function Inspector( { a, set } ) {
	return (
		<Panel title="Banner">
			<UrlControl label="Banner button link" value={ a.bannerBtnUrl } onChange={ ( bannerBtnUrl ) => set( { bannerBtnUrl } ) } />
		</Panel>
	);
}

registerPU( metadata, View, { inspector: Inspector } );
