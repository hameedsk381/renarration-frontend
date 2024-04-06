const initialState = {
    parentPosition: { x: 0, y: 0 },
    itemPositions: {
      1: { x: 0, y: 0 },
      2: { x: 0, y: 0 },
      3: { x: 0, y: 0 },
    },
  };
  
  const dragReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_PARENT_POSITION':
        return {
          ...state,
          parentPosition: { x: action.payload.x, y: action.payload.y },
        };
      case 'UPDATE_ITEM_POSITION':
        return {
          ...state,
          itemPositions: {
            ...state.itemPositions,
            [action.payload.id]: { x: action.payload.x, y: action.payload.y },
          },
        };
      default:
        return state;
    }
  };
  
  export default dragReducer;