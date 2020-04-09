import {LOAD_DATA_SUCCESS, LOAD_DATA_FAILURE, LOAD_SLIDING_IMAGES_SUCCESS, LOAD_SLIDING_IMAGES_FAILURE} from '../../../Commons/Constants'

const INITIAL_STATE = {
    reservations: undefined,
    categories: undefined,
    photo: undefined,
    slidingImages: undefined,
  };

export default function mscReducer() {
    return function reducer(state = INITIAL_STATE, action) {
      switch (action.type) {

        case LOAD_DATA_SUCCESS:
          return {
            ...state,
            reservations: action.reservations,
            categories: action.categories,
            photo: action.photo,
          };

          case LOAD_DATA_FAILURE:
          return {
            ...state,
            reservations: undefined,
            categories: undefined,
            photo: undefined,
          };

          case LOAD_SLIDING_IMAGES_SUCCESS:
          return {
            ...state,
            slidingImages: action.slidingImages,
          };

          case LOAD_SLIDING_IMAGES_FAILURE:
          return {
            ...state,
            slidingImages: undefined,
          };

        default:
          return state;
      }
    }
  }