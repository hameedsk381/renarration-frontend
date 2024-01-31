import { combineReducers } from 'redux';
import urlReducer from './reducers/urlReducers';
import annotationReducer from './reducers/annotationReducer';
import rennarationReducer from './reducers/rennarationReducers';

const rootReducer = combineReducers({
    url: urlReducer,
    annotation: annotationReducer,
    rennaration: rennarationReducer,
});

export default rootReducer;
