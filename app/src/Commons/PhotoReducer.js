import {SET_PHOTO} from './Constants'

const INITIAL_STATE = {
    photo: undefined
  };

export default function photoReducer() {
    return function reducer(state = INITIAL_STATE, action) {

      switch (action.type) {
        case SET_PHOTO:
            return {
                ...state,
                photo: action.photo,
              };

        default:
          return state;
      }
    }
  }