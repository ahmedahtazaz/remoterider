import {LOAD_PHOTO, LOAD_SLIDING_IMAGES, LOAD_RESERVATIONS, LOAD_CATEGORIES, SET_MENU_VISIBILITY, SET_PROFILE_VISIBILITY, SET_STUDENT_FOR_DELIVERY} from '../../../Commons/Constants'

export const loadPhotoAction = () => {
    return {
      type:`${LOAD_PHOTO}`,
    }
  };

  export const loadSlidingImagesAction = () => {
    return {
      type:`${LOAD_SLIDING_IMAGES}`,
    }
  };

  export const loadReservationsAction = () => {
    return {
      type:`${LOAD_RESERVATIONS}`,
    }
  };

  export const loadCategoriesAction = () => {
    return {
      type:`${LOAD_CATEGORIES}`,
    }
  };

  export const menuPresedAction = (showmenu) => {
    return {
      type:`${SET_MENU_VISIBILITY}`,
      showmenu: showmenu,
    }
  };

  export const profilePressedAction = (showprofile) => {
    return {
      type:`${SET_PROFILE_VISIBILITY}`,
      showprofile: showprofile,
    }
  };

  export const setInstructorForDeliveryAction = (student, photo) => {
    return {
      type:`${SET_STUDENT_FOR_DELIVERY}`,
      student: student,
      studentPhoto: photo
    }
  };