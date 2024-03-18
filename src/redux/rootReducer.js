import { combineReducers } from 'redux';
import urlReducer from './reducers/urlReducers';
import annotationReducer from './reducers/annotationReducer';
import renarrationReducer from './reducers/rennarationReducers';
import themeReducer from './reducers/themeReducers';
import snackbarReducer from './reducers/snackbarReducer';

const rootReducer = combineReducers({
  url: urlReducer,
  annotation: annotationReducer,
  renarration: renarrationReducer,
  theme: themeReducer,
  snackbar: snackbarReducer,
});

export default rootReducer;
