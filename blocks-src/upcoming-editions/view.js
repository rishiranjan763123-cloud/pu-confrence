import Upcoming from '../shared/Upcoming';
import { mountAll } from '../shared/api';

mountAll( '.pu-live[data-pu="upcoming"]', ( el ) => <Upcoming count={ Number( el.dataset.count ) || 3 } /> );
