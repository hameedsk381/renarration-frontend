// Action types
export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';
export const SET_DEVICE_TYPE = 'SET_DEVICE_TYPE';
export const RESET_STATE = 'RESET_STATE';

// Action creators
export const fetchStart = (url, deviceType) => ({
    type: FETCH_START,
    payload: { url, deviceType }
});

export const fetchSuccess = (url, htmlContent) => ({
    type: FETCH_SUCCESS,
    payload: { url, htmlContent }
});

export const fetchFailure = (errorMessage) => ({
    type: FETCH_FAILURE,
    payload: { errorMessage }
});

export const updateProgress = (progress) => ({
    type: UPDATE_PROGRESS,
    payload: { progress }
});

export const setDeviceType = (deviceType) => ({
    type: SET_DEVICE_TYPE,
    payload: { deviceType }
});

export const resetState = () => ({
    type: RESET_STATE
});

// Add other action creators as needed
