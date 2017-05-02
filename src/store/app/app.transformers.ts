import { Map, fromJS  } from 'immutable';

export function deimmutifyApp(state: Map<string, any>): Object {
    return state.toJS();
}

export function reimmutifyApp(plain): Map<string, any> {
    return Map<string, any>(plain ? fromJS(plain) : {});
}
