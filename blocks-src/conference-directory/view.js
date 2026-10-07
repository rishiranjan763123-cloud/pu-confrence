import Directory from '../shared/Directory';
import { mountAll } from '../shared/api';

mountAll( '.pu-live[data-pu="directory"]', () => <Directory /> );
