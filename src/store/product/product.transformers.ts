import { Map, fromJS } from 'immutable';

export function deimmutifyProduct(state: Map<string, any>): Object {
  return state.toJS();
}

export function reimmutifyProduct(plain): Map<string, any> {
  return Map<string, any>(plain ? fromJS(plain) : {});
}
