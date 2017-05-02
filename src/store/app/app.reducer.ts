import { INITIAL_STATE } from './app.initial-state';
import { Map } from 'immutable';


export function appReducer(state: Map<string, any> = INITIAL_STATE, action): Map<string, any> {
    switch (action.type) {
        case 'LOADER_SHOW':
            return Map<string, any>({
                loading: true,
                page: state.get('page'),
                pageParams: state.get('pageParams'),
                errorModal: state.get('errorModal'),
                errorMessage: state.get('errorMessage')
            });
        case 'LOADER_HIDE':
            return Map<string, any>({
                loading: false,
                page: state.get('page'),
                pageParams: state.get('pageParams'),
                errorModal: state.get('errorModal'),
                errorMessage: state.get('errorMessage')
            });
        case 'GO_TO_PAGE':
            return Map<string, any>({
                loading: state.get('loading'),
                page: action.payload.page,
                pageParams: action.payload.pageParams,
                errorModal: state.get('errorModal'),
                errorMessage: state.get('errorMessage')
            });

        case 'SHOW_ERROR_MODAL':
            return Map<string, any>({
                loading: state.get('loading'),
                page: state.get('page'),
                pageParams: state.get('pageParams'),
                errorModal: true,
                errorMessage: action.payload.message
            });
        case 'HIDE_ERROR_MODAL':
            return Map<string, any>({
                loading: state.get('loading'),
                page: state.get('page'),
                pageParams: state.get('pageParams'),
                errorModal: false,
                errorMessage: null
            });

        default:
            return state;
    }
}
