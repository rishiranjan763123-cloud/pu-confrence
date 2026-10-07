import metadata from './block.json';
import View from './component';
import { registerPU, Panel, UrlControl } from '../shared/ui';

function Inspector( { a, set } ) {
	return (
		<Panel title="Button">
			<UrlControl label="Button link" value={ a.btnUrl } onChange={ ( btnUrl ) => set( { btnUrl } ) } />
		</Panel>
	);
}

registerPU( metadata, View, { inspector: Inspector } );
