import {LOAD_PHOTO, LOAD_SLIDING_IMAGES, LOAD_SCHEDULED_LESSONS, LOAD_PENDING_LESSONS, SET_MENU_VISIBILITY, SET_PROFILE_VISIBILITY} from '../../../Commons/Constants'

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

  export const loadScheduledLessonsAction = () => {
    return {
      type:`${LOAD_SCHEDULED_LESSONS}`,
    }
  };

  export const loadPendingLessonsAction = () => {
    return {
      type:`${LOAD_PENDING_LESSONS}`,
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