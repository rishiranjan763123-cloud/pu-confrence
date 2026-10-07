import { RangeControl } from '@wordpress/components';
import metadata from './block.json';
import View from './component';
import { registerPU, Panel, UrlControl } from '../shared/ui';

function Inspector( { a, set } ) {
	return (
		<Panel title="Upcoming settings">
			<RangeControl
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				label="Number of conferences"
				min={ 1 }
				max={ 6 }
				value={ a.count }
				onChange={ ( count ) => set( { count } ) }
			/>
			<UrlControl label="See all link" value={ a.viewAllUrl } onChange={ ( viewAllUrl ) => set( { viewAllUrl } ) } />
		</Panel>
	);
}

registerPU( metadata, View, { inspector: Inspector } );
