import {LOAD_DATA, LOAD_SLIDING_IMAGES} from '../../../Commons/Constants'

export const loadDataAction = () => {
    return {
      type:`${LOAD_DATA}`,
    }
  };

  export const loadSlidingImagesAction = () => {
    return {
      type:`${LOAD_SLIDING_IMAGES}`,
    }
  };