import { LOAD_FEATURED_INSTRUCTORS } from "../../../Commons/Constants";

export const loadFeaturedAction = () => {
    return {
      type:`${LOAD_FEATURED_INSTRUCTORS}`,
    }
  };