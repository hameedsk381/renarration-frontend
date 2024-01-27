// actions.js
export const ADD_RENARRATION_BLOCK = 'ADD_RENARRATION_BLOCK';
export const UPDATE_RENARRATION_BLOCK = 'UPDATE_RENARRATION_BLOCK';
export const DELETE_RENARRATION_BLOCK = 'DELETE_RENARRATION_BLOCK';
// actions.js
export const TOGGLE_ANNOTATION_MODE = 'TOGGLE_ANNOTATION_MODE';

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
// actions.js
export const REORDER_RENARRATION_BLOCKS = 'REORDER_RENARRATION_BLOCKS';

export const reorderRenarrationBlocks = (blocks) => ({
    type: REORDER_RENARRATION_BLOCKS,
    payload: blocks,
});
// actions.js
export const toggleAnnotationMode = () => ({
    type: TOGGLE_ANNOTATION_MODE,
});
export const ADD_TO_HISTORY = 'ADD_TO_HISTORY';
export const RESET_HISTORY = 'RESET_HISTORY';

export const addToHistory = url => ({
    type: ADD_TO_HISTORY,
    payload: {url,htmlDoc},
});

export const resetHistory = () => ({
    type: RESET_HISTORY,
});
// Action Types
export const SET_IMAGE = 'SET_IMAGE';
export const SET_ID = 'SET_ID';
export const SET_AUDIO = 'SET_AUDIO';
export const SET_VIDEO = 'SET_VIDEO';
export const SET_DESCRIPTION = 'SET_DESCRIPTION';
export const RESET_MEDIA = 'RESET_MEDIA';
export const RESET_FORM = 'RESET_FORM';
export const SUBMIT_FORM = 'SUBMIT_FORM';

// Action Creators
export const setID = (id) => ({ type: SET_ID, payload: id });
export const setImage = (image) => ({ type: SET_IMAGE, payload: image });
export const setAudio = (audio) => ({ type: SET_AUDIO, payload: audio });
export const setVideo = (video) => ({ type: SET_VIDEO, payload: video });
export const setDescription = (description) => ({ type: SET_DESCRIPTION, payload: description });
export const resetMedia = (mediaType) => ({ type: RESET_MEDIA, payload: mediaType });
export const submitForm = () => ({ type: SUBMIT_FORM });
export const resetForm = () => ({ type: RESET_FORM });