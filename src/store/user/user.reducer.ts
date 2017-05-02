import { INITIAL_STATE } from './user.initial-state';
import { Map } from 'immutable';


export function userReducer(state: Map<string, any> = INITIAL_STATE, action): Map<string, any> {
    switch (action.type) {
        case 'DEFAULT_NAME':
            return Map<string, any>({
                name: 'charlie tester'
            });

        default:
            return state;
    }
}
