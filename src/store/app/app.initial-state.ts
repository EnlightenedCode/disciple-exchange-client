import { Map } from 'immutable';

export const INITIAL_STATE = Map<string, any>({
    loader: false,
    page: 'Home',
    pageParams: {},
    errorModal: false,
    errorMessage: null
});
