import {RESET_MAKE_RESERVATION, RESET_SELECTED_SLOT, LOAD_PHOTO_SUCCESS, LOAD_PHOTO_FAILURE, LOAD_SLIDING_IMAGES_SUCCESS, LOAD_SLIDING_IMAGES_FAILURE, LOAD_RESERVATIONS_SUCCESS, LOAD_RESERVATIONS_FAILURE, LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_FAILURE, LOAD_PENDING_LESSONS_SUCCESS, LOAD_PENDING_LESSONS_FAILURE, LOAD_SCHEDULED_LESSONS_SUCCESS, LOAD_SCHEDULED_LESSONS_FAILURE, SET_MENU_VISIBILITY, LOAD_FEATURED_INSTRUCTORS_SUCCESS, LOAD_FEATURED_INSTRUCTORS_FAILURE, LOAD_SEARCH_RESULTS_SUCCESS, LOAD_SEARCH_RESULTS_FAILURE, SET_INSTRUCTOR_FOR_RESERVATION, LOAD_AVAILABLE_TIME_SLOTS_SUCCESS, LOAD_AVAILABLE_TIME_SLOTS_FAILURE, SET_SELECTED_SLOT, MAKE_RESERVATION_SUCCESS, MAKE_RESERVATION_FAILURE, DECLINE_STUDENT_SUCCESS, DECLINE_STUDENT_FAILURE, CONFIRM_STUDENT_SUCCESS, CONFIRM_STUDENT_FAILURE, LOAD_CURRENT_USER_SUCCESS, LOAD_CURRENT_USER_FAILURE, SET_COST_SUCCESS, SET_COST_FAILURE} from '../../../Commons/Constants'

const INITIAL_STATE = {
    reservations: undefined,
    categories: undefined,
    photo: undefined,
    slidingImages: undefined,
    scheduled: undefined,
    pending: undefined,
    showmenu: false,
    featured: undefined,
    searchResults: undefined,
    instructor: undefined,
    instructorPhoto: undefined,
    availableTimeSlots: undefined,
    selectedSlot: undefined,
    makeReservMessage: undefined,
    reload: false,
    currentUser: undefined,
    reloadaAvailability: false,
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

          case LOAD_SEARCH_RESULTS_SUCCESS:
          return {
            ...state,
            searchResults: action.searchResults,
          };

          case LOAD_SEARCH_RESULTS_FAILURE:
          return {
            ...state,
            searchResults: undefined,
          };

          case SET_INSTRUCTOR_FOR_RESERVATION:
          return {
            ...state,
            instructor: action.instructor,
            instructorPhoto: action.instructorPhoto,
          };

          case LOAD_AVAILABLE_TIME_SLOTS_SUCCESS:
          return {
            ...state,
            availableTimeSlots: action.availableTimeSlots,
          };

          case LOAD_AVAILABLE_TIME_SLOTS_FAILURE:
          return {
            ...state,
            availableTimeSlots: undefined,
          };

          case SET_SELECTED_SLOT:
          return {
            ...state,
            selectedSlot: action.selectedSlot,
          };

          case RESET_SELECTED_SLOT:
          return {
            ...state,
            selectedSlot: undefined,
          };

          case MAKE_RESERVATION_SUCCESS:
          case MAKE_RESERVATION_FAILURE:
          case RESET_MAKE_RESERVATION:
          return {
            ...state,
            makeReservMessage: action.makeReservMessage,
          };

          case DECLINE_STUDENT_SUCCESS:
          case CONFIRM_STUDENT_SUCCESS:
          return {
            ...state,
            reload: true,
          };

          case DECLINE_STUDENT_FAILURE:
          case CONFIRM_STUDENT_FAILURE:
          return {
            ...state,
            reload: false,
          };

          case SET_COST_SUCCESS:
          return {
            ...state,
            reloadaAvailability: true,
          };

          case SET_COST_FAILURE:
          return {
            ...state,
            reloadaAvailability: false,
          };

          case LOAD_CURRENT_USER_SUCCESS:
          return {
            ...state,
            currentUser: action.currentUser,
          };

          case LOAD_CURRENT_USER_FAILURE:
          return {
            ...state,
            currentUser: undefined,
          };

        default:
          return state;
      }
    }
  }