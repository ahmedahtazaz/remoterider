import { LOAD_TC_TEXT_SUCCESS, LOAD_TC_TEXT_FAILURE, RESET_TC_TEXT } from '../../../Commons/Constants';

const INITIAL_STATE = {
    tcText: undefined,
  };

export default function tcReducer() {
    return function reducer(state = INITIAL_STATE, action) {

      switch (action.type) {
        case LOAD_TC_TEXT_SUCCESS:
            return {
                ...state,
                tcText: action.tcText,
              };

        case LOAD_TC_TEXT_FAILURE:
        case RESET_TC_TEXT: 
        return {
            ...state,
            tcText: undefined,
            };
        

        default:
          return state;
      }
    }
  }