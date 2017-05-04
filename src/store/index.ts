import * as persistState from 'redux-localstorage';
import { createLogger } from 'redux-logger';
import * as user from './user';
import * as app from './app';
import * as product from './product';
import * as Redux from 'redux';
const { combineReducers } = Redux;
import { Map } from 'immutable';

// const persist = (persistState) ? persistState : function(){};
export const enhancers = [
    persistState(
        '', {
            key: 'trendy-brunch',
            serialize: s => JSON.stringify(deimmutify(s)),
            deserialize: s => reimmutify(JSON.parse(s)),
        })
];

if (window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
}

export interface RootState {
    user?: Map<string, any>;
    app?: Map<string, any>;
    product?: Map<string, any>;
}


const rootReducer = combineReducers({
    user: user.userReducer,
    app: app.appReducer,
    product: product.productReducer
});

export function deimmutify(state: RootState): Object {
    return {
        user: user.deimmutifyUser(state.user),
        app: app.deimmutifyApp(state.app),
        product: product.deimmutifyProduct(state.product)
    };
}

export function reimmutify(plain): RootState {
    return plain ? {
        user: user.reimmutifyUser(plain.user),
        app: app.reimmutifyApp(plain.app),
        product: product.reimmutifyProduct(plain.product)
    } : {};
}

export const middleware = [
    createLogger({
        level: 'info',
        collapsed: true,
        stateTransformer: deimmutify
    })
];

export default rootReducer;
