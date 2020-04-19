import {RESET_REDUCERS, SET_MENU_VISIBILITY} from '../Constants'

const INITIAL_STATE = {
    showmenu: false,
  };

export default function menudialogueReducer() {
    return function reducer(state = INITIAL_STATE, action) {

      switch (action.type) {
        case SET_MENU_VISIBILITY:
            return {
                ...state,
                showmenu: !action.showmenu,
              };

          case RESET_REDUCERS:
          return {
            ...state,
            showmenu: false,
          };

        default:
          return state;
      }
    }
  }