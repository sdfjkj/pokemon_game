export const SET_ID = "SET_ID";
export const SET_TURN = "SET_TURN";

export function setId(id) {
  return {
    type: SET_ID,
    payload: id
  };
}

export function setTurn(turn) {
  return {
    type: SET_TURN,
    payload: turn
  };
}