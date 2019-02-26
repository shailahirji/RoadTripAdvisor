import  {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {mapReducer} from './map-reducer';
import thunk from 'redux-thunk'



export const init = () => {

    const reducer = combineReducers({mapReducer});
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    const store =createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

    return store;
}