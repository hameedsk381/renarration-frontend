// actionTypes.js

export const UPDATE_ITEM_POSITION = 'UPDATE_ITEM_POSITION';
export const updateItemPosition = (id, position) => ({
    type: UPDATE_ITEM_POSITION,
    payload: { id, position },
  });
  export const GET_ITEM_POSITION = 'GET_ITEM_POSITION';
export const getItemPosition = () => ({
    type: GET_ITEM_POSITION,
    
  });