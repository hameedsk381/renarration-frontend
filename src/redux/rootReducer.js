import { combineReducers } from 'redux';
import urlReducer from './reducers/urlReducers';
import annotationReducer from './reducers/annotationReducer';
import renarrationReducer from './reducers/rennarationReducers';
import themeReducer from './reducers/themeReducers';

const rootReducer = combineReducers({
  url: urlReducer,
  annotation: annotationReducer,
  renarration: renarrationReducer,
  theme: themeReducer
});

export default rootReducer;
