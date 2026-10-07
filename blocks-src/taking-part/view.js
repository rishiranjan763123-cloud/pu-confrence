import EditionPicker from '../shared/ConfSelect';
import { mountAll } from '../shared/api';

mountAll( '.pu-live[data-pu="picker"]', ( el ) => <EditionPicker label={ el.dataset.label || undefined } /> );
