import {LOAD_PHOTO_SUCCESS, LOAD_PHOTO_FAILURE, LOAD_SLIDING_IMAGES_SUCCESS, LOAD_SLIDING_IMAGES_FAILURE, LOAD_RESERVATIONS_SUCCESS, LOAD_RESERVATIONS_FAILURE} from '../../../Commons/Constants'

const INITIAL_STATE = {
    reservations: undefined,
    categories: undefined,
    photo: undefined,
    slidingImages: undefined,
  };

export default function mscReducer() {
    return function reducer(state = INITIAL_STATE, action) {
      switch (action.type) {

        case LOAD_PHOTO_SUCCESS:
          return {
            ...state,
            photo: action.photo,
          };

          case LOAD_PHOTO_FAILURE:
          return {
            ...state,
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

          case LOAD_RESERVATIONS_SUCCESS:
          return {
            ...state,
            reservations: action.reservations,
          };

          case LOAD_RESERVATIONS_FAILURE:
          return {
            ...state,
            reservations: undefined,
          };

        default:
          return state;
      }
    }
  }