import { LOAD_FEATURED_INSTRUCTORS, LOAD_SEARCH_RESULTS } from "../../../Commons/Constants";

export const loadFeaturedAction = () => {
    return {
      type:`${LOAD_FEATURED_INSTRUCTORS}`,
    }
  };

  export const loadSearchAction = (querry) => {
    return {
      type:`${LOAD_SEARCH_RESULTS}`,
      querry: querry,
    }
  };