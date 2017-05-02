import { Map, fromJS  } from 'immutable';

export function deimmutifyUser(state: Map<string, any>): Object {
    return state.toJS();
}

export function reimmutifyUser(plain): Map<string, any> {
    return Map<string, any>(plain ? fromJS(plain) : {});
}
