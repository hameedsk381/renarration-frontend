import { combineReducers } from 'redux';
import urlReducer from './reducers/urlReducers';
import annotationReducer from './reducers/annotationReducer';
import renarrationReducer from './reducers/rennarationReducers';
import themeReducer from './reducers/themeReducers';
import snackbarReducer from './reducers/snackbarReducer';
import modalReducer from './reducers/modalReducer';
import dragReducer from './reducers/dragReducer';

const rootReducer = combineReducers({
  url: urlReducer,
  annotation: annotationReducer,
  renarration: renarrationReducer,
  theme: themeReducer,
  snackbar: snackbarReducer,
  modal: modalReducer,
  drag: dragReducer
});

export default rootReducer;
