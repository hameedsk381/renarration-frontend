// ModalReducer.js

import { CLOSE_MODAL, OPEN_MODAL } from "../actions/modalActions";


const initialState = {
  isOpen: false,
  content: null
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        isOpen: true,
        content: action.payload.content
      };
    case CLOSE_MODAL:
      return {
        isOpen: false,
        content: null
      };
    default:
      return state;
  }
};

export default modalReducer;
