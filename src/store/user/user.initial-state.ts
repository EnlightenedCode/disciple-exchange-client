import { Map } from 'immutable';

export const INITIAL_STATE = Map<string, any>({
    name: null,
    email: null,
    authenticated: false,
    isAdmin: false
});
