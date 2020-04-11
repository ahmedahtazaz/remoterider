import {LOAD_PHOTO, LOAD_SLIDING_IMAGES, LOAD_SCHEDULED_LESSONS, LOAD_PENDING_LESSONS} from '../../../Commons/Constants'

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