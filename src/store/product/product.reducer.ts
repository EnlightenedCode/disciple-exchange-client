import { INITIAL_STATE } from './product.initial-state';
import { Map, List } from 'immutable';


export function productReducer(state: Map<string, any> = INITIAL_STATE, action): Map<string, any> {
  switch (action.type) {
    case 'GET_ALL_PRODUCTS':
      return Map<string, any>({
        allProducts: List<any>(action.payload)
      });
    default:
      return state;
  }
}
