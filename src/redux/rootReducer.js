import { combineReducers } from 'redux';
import urlReducer from './reducers/urlReducers';
import annotationReducer from './reducers/annotationReducer';
import renarrationReducer from './reducers/rennarationReducers';

const rootReducer = combineReducers({
  url: urlReducer,
  annotation: annotationReducer,
  renarration: renarrationReducer,
});

export default rootReducer;
