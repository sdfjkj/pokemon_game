import { SET_ID, SET_TURN } from "./actions";

const initialState = {
  id: null,
  turn: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ID:
      return { ...state, id: action.payload };
    case SET_TURN:
      return { ...state, turn: action.payload };
    default:
      return state;
  }
}
export default rootReducer;
