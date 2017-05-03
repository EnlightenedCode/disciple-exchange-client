import { INITIAL_STATE } from './user.initial-state';
import { Map } from 'immutable';


export function userReducer(state: Map<string, any> = INITIAL_STATE, action): Map<string, any> {
    switch (action.type) {
        case 'USER_LOGIN':
            return Map<string, any>({
                name: action.payload.name,
                email: action.payload.email,
                authenticated: true,
                isAdmin: action.payload.isAdmin
            });

        case 'USER_LOGOUT':
            return Map<string, any>({
                name: null,
                email: null,
                authenticated: false,
                isAdmin: false
            });

        default:
            return state;
    }
}
