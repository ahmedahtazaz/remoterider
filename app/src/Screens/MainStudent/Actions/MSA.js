import {LOAD_PHOTO, LOAD_SLIDING_IMAGES, LOAD_RESERVATIONS, LOAD_CATEGORIES} from '../../../Commons/Constants'

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