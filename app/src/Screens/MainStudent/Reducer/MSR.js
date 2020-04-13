import {LOAD_PHOTO_SUCCESS, LOAD_PHOTO_FAILURE, LOAD_SLIDING_IMAGES_SUCCESS, LOAD_SLIDING_IMAGES_FAILURE, LOAD_RESERVATIONS_SUCCESS, LOAD_RESERVATIONS_FAILURE, LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_FAILURE, LOAD_PENDING_LESSONS_SUCCESS, LOAD_PENDING_LESSONS_FAILURE, LOAD_SCHEDULED_LESSONS_SUCCESS, LOAD_SCHEDULED_LESSONS_FAILURE, SET_MENU_VISIBILITY, LOAD_FEATURED_INSTRUCTORS_SUCCESS, LOAD_FEATURED_INSTRUCTORS_FAILURE} from '../../../Commons/Constants'

const INITIAL_STATE = {
    reservations: undefined,
    categories: undefined,
    photo: undefined,
    slidingImages: undefined,
    scheduled: undefined,
    pending: undefined,
    showmenu: false,
    featured: undefined,
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

          case LOAD_CATEGORIES_SUCCESS:
          return {
            ...state,
            categories: action.categories,
          };

          case LOAD_CATEGORIES_FAILURE:
          return {
            ...state,
            categories: undefined,
          };

          case LOAD_PENDING_LESSONS_SUCCESS:
          return {
            ...state,
            pending: action.pending,
          };

          case LOAD_PENDING_LESSONS_FAILURE:
          return {
            ...state,
            pending: undefined,
          };

          case LOAD_SCHEDULED_LESSONS_SUCCESS:
          return {
            ...state,
            scheduled: action.scheduled,
          };

          case LOAD_SCHEDULED_LESSONS_FAILURE:
          return {
            ...state,
            scheduled: undefined,
          };

          case SET_MENU_VISIBILITY:
          return {
            ...state,
            showmenu: !action.showmenu,
          };

          case LOAD_FEATURED_INSTRUCTORS_SUCCESS:
          return {
            ...state,
            featured: action.featured,
          };

          case LOAD_FEATURED_INSTRUCTORS_FAILURE:
          return {
            ...state,
            featured: undefined,
          };

        default:
          return state;
      }
    }
  }