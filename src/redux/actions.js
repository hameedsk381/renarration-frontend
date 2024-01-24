// actions.js
export const ADD_RENARRATION_BLOCK = 'ADD_RENARRATION_BLOCK';
export const UPDATE_RENARRATION_BLOCK = 'UPDATE_RENARRATION_BLOCK';
export const DELETE_RENARRATION_BLOCK = 'DELETE_RENARRATION_BLOCK';

export const addRenarrationBlock = (block) => ({
    type: ADD_RENARRATION_BLOCK,
    payload: block,
});

export const updateRenarrationBlock = (block) => ({
    type: UPDATE_RENARRATION_BLOCK,
    payload: block,
});

export const deleteRenarrationBlock = (blockId) => ({
    type: DELETE_RENARRATION_BLOCK,
    payload: blockId,
});
export const FETCH_HTML_START = 'FETCH_HTML_START';
export const FETCH_HTML_SUCCESS = 'FETCH_HTML_SUCCESS';
export const FETCH_HTML_FAILURE = 'FETCH_HTML_FAILURE';

// New Action Creators
export const fetchHtmlStart = () => ({
    type: FETCH_HTML_START,
});

export const fetchHtmlSuccess = (htmlContent) => ({
    type: FETCH_HTML_SUCCESS,
    payload: htmlContent,
});

export const fetchHtmlFailure = (errorMessage) => ({
    type: FETCH_HTML_FAILURE,
    payload: errorMessage,
});
// actions.js
export const UPDATE_HTML_CONTENT = 'UPDATE_HTML_CONTENT';

export const updateHtmlContent = (htmlContent) => ({
    type: UPDATE_HTML_CONTENT,
    payload: htmlContent,
});
// actions.js

// Action Type
export const RESET_STATE = 'RESET_STATE';

// Action Creator
export const resetState = () => ({
    type: RESET_STATE,
});
// actions.js

// Action Type
export const RESET_CONTENT = 'RESET_CONTENT';

// Action Creator
export const resetContent = () => ({
    type: RESET_CONTENT,
});
// actions.js

// Action Types
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';
export const RESET_PROGRESS = 'RESET_PROGRESS';

// Action Creators
export const updateProgress = (progress) => ({
    type: UPDATE_PROGRESS,
    payload: progress,
});

export const resetProgress = () => ({
    type: RESET_PROGRESS,
});
// actions.js

// Action Types
export const SET_DEVICE_TYPE = 'SET_DEVICE_TYPE';
export const CLEAR_DEVICE_TYPE = 'CLEAR_DEVICE_TYPE';

// Action Creators
export const setDeviceType = (deviceType) => ({
    type: SET_DEVICE_TYPE,
    payload: deviceType,
});

export const clearDeviceType = () => ({
    type: CLEAR_DEVICE_TYPE,
});
