import { TextControl } from '@wordpress/components';
import metadata from './block.json';
import View from './component';
import { registerPU, Panel } from '../shared/ui';

function Inspector( { a, set } ) {
	return (
		<Panel title="Picker">
			<TextControl
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				label="Dropdown label"
				value={ a.pickerLabel }
				onChange={ ( pickerLabel ) => set( { pickerLabel } ) }
			/>
		</Panel>
	);
}

registerPU( metadata, View, { inspector: Inspector } );
