import CallbackForm from '../shared/CallbackForm';
import { mountAll } from '../shared/api';

mountAll( '.pu-live[data-pu="callback"]', () => <CallbackForm /> );
